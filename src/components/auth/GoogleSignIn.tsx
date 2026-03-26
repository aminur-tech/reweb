"use client";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import React from "react";
import { FcGoogle } from "react-icons/fc";

const GoogleSignIn = ({ text }: { text: string }) => {
  const searchParams = useSearchParams();

  // 👉 Get callbackUrl from query OR fallback
  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";

  return (
    <button
      onClick={() => signIn("google", { callbackUrl })}
      className="w-full flex items-center justify-center gap-3 bg-white/50 dark:bg-white/10 backdrop-blur-md border border-indigo-200 dark:border-indigo-800 py-3 px-4 rounded-xl hover:bg-white/80 dark:hover:bg-white/20 transition-all duration-300 shadow-sm"
    >
      <FcGoogle className="text-2xl" />
      <span className="font-medium">{text}</span>
    </button>
  );
};

export default GoogleSignIn;