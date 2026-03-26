"use client"
import React, { useState } from 'react';
import GoogleSignIn from './GoogleSignIn';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';

const LoginForm = () => {
    const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setError("");

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false, // ⚠️ important
    });

    if (res?.error) {
      setError("Invalid email or password");
    } else {
      router.push("/"); 
    }
  };
    return (
        <div className="max-w-md w-full mx-auto p-8 rounded-3xl bg-white/40 dark:bg-indigo-950/40 backdrop-blur-xl border border-white/20 shadow-2xl">
            <div className="text-center mb-8">
                <h2 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-pink-600 bg-clip-text text-transparent">
                    Welcome Back
                </h2>
                <p className="text-sm mt-2 opacity-70">Log in to your REWEB account</p>
            </div>

            <form className="space-y-5" onSubmit={handleSubmit} >
                <div>
                    <label className="block text-sm font-semibold mb-2 ml-1">Email Address</label>
                    <input
                    onChange={(e) => setEmail(e.target.value)}
                        type="email"
                        placeholder="name@company.com"
                        className="w-full px-4 py-3 rounded-xl bg-white/50 dark:bg-indigo-900/50 border border-indigo-200 dark:border-indigo-800 focus:ring-2 focus:ring-purple-500 outline-none transition-all"
                    />
                </div>
                <div>
                    <label className="block text-sm font-semibold mb-2 ml-1">Password</label>
                    <input
                    onChange={(e) => setPassword(e.target.value)}
                        type="password"
                        placeholder="••••••••"
                        className="w-full px-4 py-3 rounded-xl bg-white/50 dark:bg-indigo-900/50 border border-indigo-200 dark:border-indigo-800 focus:ring-2 focus:ring-purple-500 outline-none transition-all"
                    />
                </div>

                <button className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold shadow-lg transform hover:scale-[1.02] transition-all">
                    Sign In
                </button>
                {error && <p className="text-red-500">{error}</p>}
            </form>

            <div className="relative my-8">
                <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-indigo-200 dark:border-indigo-800"></span></div>
                <div className="relative flex justify-center text-xs uppercase"><span className="bg-transparent px-2 text-indigo-500">Or continue with</span></div>
            </div>

            <GoogleSignIn text="Login with Google" />

            <p className="text-center mt-6 text-sm">
                Don`&apos;`t have an account? <a href="/signup" className="text-purple-600 dark:text-purple-400 font-bold hover:underline">Sign up</a>
            </p>
        </div>
    );
};

export default LoginForm;