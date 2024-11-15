"use client"; // Add this if Navbar uses client-side features

import Link from 'next/link';
import { FcHome } from "react-icons/fc";
import { FaBackward } from "react-icons/fa";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 flex justify-between items-center p-5 bg-gradient-to-r from-green-400 to-red-500 shadow-lg">
      <Link href="/" className="flex items-center text-white text-2xl space-x-1">
        <FcHome />
        <FaBackward />
      </Link>
      <div className="flex-grow">
        <marquee className="text-gradient-to-r from-green-400 to-red-500">This is a company about</marquee>
      </div>
      <Link href="/about-us" className="text-white">About Us</Link>
      <Link href="/contact-us" className="text-white">Contact Us</Link>
    </nav>
  );
}
