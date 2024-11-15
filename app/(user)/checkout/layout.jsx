"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useUser } from "@/lib/firestore/user/read";
import { CircularProgress } from "@nextui-org/react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion"; // For animations
import { useEffect } from 'react';

export default function Layout({ children }) {
  const searchParams = useSearchParams();
  const type = searchParams.get("type");
  const productId = searchParams.get("productId");

  const { user } = useAuth();
  const { data, error, isLoading } = useUser({ uid: user?.uid });

  // Loading screen with sleek spinner and fade effect
  if (isLoading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          backgroundColor: '#1e1e1e', // Dark background for luxury feel
          color: '#f5f5f5' // Soft white text
        }}
      >
        <CircularProgress
          style={{ color: '#d4af37', scale: '2' }} // Larger golden spinner
        />
      </motion.div>
    );
  }

  // Error state with a nice visual
  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          backgroundColor: '#1e1e1e',
          color: '#ff4d4d', // Red for error
          fontFamily: 'Poppins, sans-serif',
          textShadow: '1px 1px 5px rgba(0, 0, 0, 0.7)',
        }}
      >
        <h2 style={{ fontSize: '2.5rem', fontWeight: '700' }}>
          An error occurred: {error}
        </h2>
      </motion.div>
    );
  }

  // Empty cart message with animation and rich typography
  if (type === "cart" && (!data?.carts || data?.carts?.length === 0)) {
    return (
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.5, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          backgroundColor: 'red',
          color: '#d4af37',
          fontFamily: 'Poppins, sans-serif',
          backgroundImage: 'url("https://png.pngtree.com/thumb_back/fw800/background/20231007/pngtree-online-shopping-cart-courses-orders-sales-an-empty-cart-illustration-image_13546947.png")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
        
      >
        <h2
          style={{
            fontSize: '2.5rem',
            fontWeight: '700',
            textShadow: '2px 2px 10px rgba(0, 0, 0, 0.8)',
          }}
        >
          Your Cart is Empty
        </h2>
      </motion.div>
    );
  }

  // "Buy now" without product selected
  if (type === "buynow" && !productId) {
    return (
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.5, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          backgroundColor: '#282828',
          color: '#ffcc00', // Vibrant gold color
          fontFamily: 'Poppins, sans-serif',
        }}
      >
        <h2
          style={{
            fontSize: '2.5rem',
            fontWeight: '700',
            textShadow: '2px 2px 10px rgba(0, 0, 0, 0.8)',
          }}
        >
          Product Not Found!
        </h2>
      </motion.div>
    );
  }

  // Main children content with fade-in animation
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      transition={{ duration: 0.5 }}
      style={{
        backgroundColor: '#f5f5f5', // Light background for main content
        minHeight: '100vh',
        color: '#333', // Dark text for readability
        padding: '2rem', // Spacious padding for content
        fontFamily: 'Poppins, sans-serif',
      }}
    >
      {children}
    </motion.div>
  );
}
