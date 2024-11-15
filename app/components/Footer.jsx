// app/components/Footer.jsx
"use client";

import React, { useEffect, useState } from 'react';
import { Mail, MapPin, Phone, Instagram, Facebook } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { MdArrowUpward } from "react-icons/md";
import { GiChart } from "react-icons/gi";
import Chatbot from './ScratchCodeVerifier';
import { SiGooglegemini } from "react-icons/si"; // Make sure you have a Chatbot component to import

export default function Footer() {
  const [showScrollToTop, setShowScrollToTop] = useState(false);
  const [showChatbot, setShowChatbot] = useState(false);
  const [isFooterVisible, setIsFooterVisible] = useState(true);

  // Scroll event listener for showing the "Scroll to Top" button
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollToTop(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll to top handler
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative flex flex-col gap-3 w-full bg-gradient-to-r from-green-600 to-red-600 border-t p-5 md:p-10">
      <div className="border-b w-full flex flex-col md:flex-row md:justify-between gap-3">
        <div className="flex">
          <img className="h-8" src="/logo.png" alt="Logo" />
        </div>
        <div className="flex-1 flex flex-col md:flex-row justify-end gap-4">
          <div className="flex gap-2 items-center">
            <Phone size={12} className="text-white" />
            <h2 className="text-sm text-white">+91 9896201957</h2>
          </div>
          <div className="flex gap-2 items-center">
            <Mail size={12} className="text-white" />
            <a href="mailto:himanshulakshay1327@gmail.com" className="text-sm text-white">
              himanshulakshay1327@gmail.com
            </a>
          </div>
          <div className="flex gap-2 items-center">
            <MapPin size={12} className="text-white" />
            <a href="https://www.google.com/maps?q=H 178,Guru fateh town,kharar,mohali" target="_blank" rel="noopener noreferrer" className="text-sm text-white hover:text-gray-600">
              CHANDIGARH
            </a>
          </div>
        </div>
      </div>
      <div className="flex justify-center w-full gap-4">
        <a href="https://www.instagram.com/goldiesupplement.co/profilecard/?igsh=bzcycjV4YTd0NHh6" target="_blank" rel="noopener noreferrer">
          <Instagram size={24} className="text-white" />
        </a>
        <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
          <Facebook size={24} className="text-white" />
        </a>
        <a href="https://wa.me/919896201957" target="_blank" rel="noopener noreferrer">
          <FaWhatsapp size={24} className="text-white" />
        </a>
      </div>
      <div className="flex justify-center w-full">
        <h3 className="text-xs text-white">
          <marquee behavior="scroll" direction="left">himanshulakshay1327@gmail.com</marquee>
          © 2024. All rights reserved by Goldyy Supplements
        </h3>
      </div>

      {/* Scroll to Top Button */}
      {showScrollToTop && (
        <button 
          onClick={handleScrollToTop}
          className="fixed bottom-10 right-10 bg-white text-green-600 p-2 rounded-full shadow-lg hover:bg-gray-200 transition-colors duration-300"
          title="Scroll to Top"
        >
          <MdArrowUpward size={20} />
        </button>
      )}

      {/* Test Running Badge with Chart Icon */}
      <div className="absolute top-4 right-4 bg-green-400 text-white p-1 rounded-full shadow-lg flex items-center space-x-1">
        
        <a href="https://powered-fitness-website.vercel.app/" target="_blank" rel="noopener noreferrer">
          <GiChart  size={24} className="text-white" />
        </a>
        
        <span className="text-xs font-semibold">ZYM</span>
      </div>

      {/* Chatbot Button */}
      {isFooterVisible && (
        <button 
          onClick={() => setShowChatbot(prev => !prev)}
          className="fixed bottom-10 right-24 bg-gradient-to-b from-red-600 via-yellow-400 to-green-600 text-red-600 p-2 rounded-full shadow-lg hover:bg-green-700 transition-colors duration-300"
          title="Chat with us"
        >
          <SiGooglegemini />
        </button>
      )}

      {/* Chatbot Component */}
      {showChatbot && <Chatbot onClose={() => setShowChatbot(false)} />}
    </footer>
  );
}
