"use client";
import { useState } from 'react';
import Link from "next/link";
import LogoutButton from "./LogoutButton";
import AuthContextProvider from "@/contexts/AuthContext";
import { RiAccountPinBoxFill } from "react-icons/ri";
import HeaderClientButtons from "./HeaderClientButtons";
import { TbHomeSearch } from "react-icons/tb";
import { HiMenu, HiX } from "react-icons/hi";
import AdminButton from './AdminButton';
 // Import icons for menu toggle

export default function Header() {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const menuList = [
    {
      name: "Home",
      link: "/",
    },
    {
      name: "About",
      link: "/about-us",
    },
    {
      name: "Contact",
      link: "/contact-us",
    },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-gradient-to-r from-red-600 to-green-600 p-4 bg-opacity-65 backdrop-blur-2xl py-3 px-4 md:py-4 md:px-16 border-b flex items-center justify-between">
      <Link href={"/"}>
        <img className="h-8 md:h-10 hover:bg-green-400" src="/logo.png" alt="Logo" />
      </Link>

      {/* Desktop Menu */}
      <div className="hidden md:flex gap-2 items-center font-semibold">
        {menuList.map((item) => (
          <Link href={item.link} key={item.name}>
            <button className="text-sm px-4 py-2 rounded-lg hover:bg-red-300">
              {item.name}
            </button>
          </Link>
        ))}
      </div>

      {/* Mobile Menu Toggle Button */}
      <button
        className="md:hidden text-2xl text-red-900"
        onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
      >
        {isMobileMenuOpen ? <HiX /> : <HiMenu />}
      </button>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="absolute top-16 left-0 w-full bg-gradient-to-r from-red-400 to-green-500 p-4 md:hidden">
          <ul className="flex flex-col gap-2 items-center font-semibold">
            {menuList.map((item) => (
              <li key={Math.random()}>
                <Link href={item.link}>
                  <button className="text-sm px-4 py-2 rounded-lg hover:bg-red-300">
                    {item.name}
                  </button>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Action Icons */}
      <div className="flex items-center gap-1 text-2xl text-red-900">
        <AuthContextProvider>
          <AdminButton />
        </AuthContextProvider>
        <Link href={`/search`}>
          <button
            title="Search Products"
            className="h-8 w-8 flex justify-center items-center rounded-full hover:bg-red-300"
          >
            <TbHomeSearch />
          </button>
        </Link>
        <AuthContextProvider>
          <HeaderClientButtons />
        </AuthContextProvider>
        <Link href={`/account`}>
          <button
            title="My Account"
            className="h-8 w-8 flex justify-center items-center rounded-full hover:bg-red-300"
          >
            <RiAccountPinBoxFill />
          </button>
        </Link>
        <AuthContextProvider>
          <LogoutButton />
        </AuthContextProvider>
      </div>
    </nav>
  );
}
