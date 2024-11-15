"use client";

import AuthContextProvider, { useAuth } from "@/contexts/AuthContext";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { CircularProgress } from "@nextui-org/react";
import Link from "next/link";
import { SiSimplelogin } from "react-icons/si";

export default function Layout({ children }) {
  return (
    <main
      className="bg-white bg-cover bg-center bg-no-repeat min-h-screen"
      style={{
        backgroundImage: "url('https://t3.ftcdn.net/jpg/08/23/92/08/360_F_823920886_InzsGpeqsz1cc6shifivPc2xklr0RNzG.jpg')",
      }}
    >
      <Header />
      <AuthContextProvider>
        <UserChecking>
          <section className="min-h-screen">{children}</section>
        </UserChecking>
      </AuthContextProvider>
      <Footer />
    </main>
  );
}

function UserChecking({ children }) {
  const { user, isLoading } = useAuth();
  if (isLoading) {
    return (
      <div className="h-screen w-full flex justify-center items-center">
        <CircularProgress />
      </div>
    );
  }
  if (!user) {
    return (
      <div className="h-screen w-full flex flex-col gap-3 justify-center items-center animate-fadeIn">
        <h1 className="text-solid text-red-600 animate-bounce">You are not logged in! Please login.</h1>
        <Link href={"/login"}>
          <button className="text-green-800 bg-gradient-to-r from-red-500 via-yellow-500 to-blue-500 px-4 py-2 text-sm rounded-xl animate-pulse">
          <SiSimplelogin className="text-center text-3xl"/> Login
          </button>
        </Link>
      </div>
    );
    
  }
  return <>{children}</>;
}
