"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useAdmin } from "@/lib/firestore/admins/read";
import { SiApachekylin } from "react-icons/si";
import Link from "next/link";

export default function AdminButton() {
  const { user } = useAuth();
  const { data } = useAdmin({ email: user?.email });
  if (!data) {
    return <></>;
  }
  return (
    <Link href={"/admin"}>
      <button className="text-4xl text-yellow-400 font-semibold"><SiApachekylin /></button>
    </Link>
  );
}
