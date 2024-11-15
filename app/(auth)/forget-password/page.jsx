"use client";

import { useAuth } from "@/contexts/AuthContext";
import { auth } from "@/lib/firebase";
import { sendPasswordResetEmail } from "firebase/auth";
import { Button } from "@nextui-org/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { GiEntryDoor } from "react-icons/gi";
import { GiThink } from "react-icons/gi";

export default function Page() {
  const { user } = useAuth();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState({});

  const handleData = (key, value) => {
    setData({
      ...data,
      [key]: value,
    });
  };

  const handleSendEmail = async () => {
    setIsLoading(true);
    try {
      await sendPasswordResetEmail(auth, data?.email);
      toast.success("Reset Link has been sent to your email!");
    } catch (error) {
      toast.error(error?.message);
    }
    setIsLoading(false);
  };

  return (
    <main
      className="w-full flex justify-center items-center min-h-screen p-10"
      style={{
        backgroundImage:
          "url('https://cdn.pixabay.com/photo/2015/12/11/15/00/online-shopping-1088257_1280.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      <section className="flex flex-col gap-3 bg-gradient-to-b from-red-500 via-yellow-500 to-green-500 bg-opacity-10 md:p-10 p-5 rounded-xl shadow-lg md:min-w-[440px] w-full">
        <div className="flex justify-center mb-4">
          <img className="h-12" src="/logo.png" alt="Logo" />
        </div>
        <div className="flex flex-col gap-3">
          <h1 className="font-bold text-xl text-center text-green-800">Forgot Password</h1>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendEmail();
            }}
            className="flex flex-col gap-3"
          >
            <input
              placeholder="Enter Your Email"
              type="email"
              name="user-email"
              id="user-email"
              value={data?.email}
              onChange={(e) => {
                handleData("email", e.target.value);
              }}
              className="px-3 py-2 rounded-xl border focus:outline-none w-full"
            />

            <Button
              isLoading={isLoading}
              isDisabled={isLoading}
              type="submit"
              className="mt-4 bg-red-600 text-green-800"
            >
              Send Reset Link <GiThink />
            </Button>
          </form>
          <div className="flex justify-between mt-3">
            <Link href={`/login`}>
              <button className="font-semibold text-sm text-red-700">
              <GiEntryDoor className="text-2xl" />Sign In
              </button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
