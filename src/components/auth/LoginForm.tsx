"use client"
import React, { useState } from 'react';
import GoogleSignIn from './GoogleSignIn';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { Eye, EyeOff, AlertCircle, Loader2, ShieldCheck, ArrowLeft } from 'lucide-react';
import axios, { AxiosError } from 'axios';

const LoginForm = () => {
    const router = useRouter();
    
    // Auth States
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [verificationCode, setVerificationCode] = useState("");
    
    // UI States
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [isNeedsVerification, setIsNeedsVerification] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        // Scenario A: User is submitting the Verification Code
        if (isNeedsVerification) {
            try {
                const res = await axios.post("https://re-web-server.vercel.app/api/v1/auth/verify-email", {
                    email,
                    code: verificationCode
                });

                if (res.data.success) {
                    // Once verified, automatically try to log them in with original password
                    const loginRes = await signIn("credentials", {
                        email,
                        password,
                        redirect: false,
                    });
                    
                    if (!loginRes?.error) {
                        router.push("/");
                        router.refresh();
                    }
                }
            } catch (err) {
                const axiosError = err as AxiosError<{ message: string }>;
                setError(axiosError.response?.data?.message || "Invalid verification code");
            } finally {
                setLoading(false);
            }
            return;
        }

        // Scenario B: Normal Login Attempt
        const res = await signIn("credentials", {
            email,
            password,
            redirect: false,
        });

        if (res?.error) {
            if (res.error.toLowerCase().includes("verify")) {
                setError("Verify your email to continue. We've sent a code!");
                setIsNeedsVerification(true); // Switch UI to verification mode
            } else {
                setError("Invalid email or password.");
            }
        } else {
            router.push("/");
            router.refresh();
        }
        setLoading(false);
    };

    return (
        <div className="max-w-md w-full mx-auto p-8 rounded-3xl bg-white/40 dark:bg-indigo-950/40 backdrop-blur-xl border border-white/20 shadow-2xl transition-all duration-500">
            <div className="text-center mb-8">
                <h2 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-pink-600 bg-clip-text text-transparent">
                    {isNeedsVerification ? "Verify Account" : "Welcome Back"}
                </h2>
                <p className="text-sm mt-2 opacity-70">
                    {isNeedsVerification ? `Enter the code sent to ${email}` : "Log in to your REWEB account"}
                </p>
            </div>

            {error && (
                <div className="mb-6 p-4 rounded-xl flex items-center gap-3 text-sm border-l-4 bg-red-100 border-red-500 text-red-800 animate-in fade-in slide-in-from-top-1">
                    <AlertCircle size={18} className="shrink-0" />
                    <p>{error}</p>
                </div>
            )}

            <form className="space-y-5" onSubmit={handleSubmit}>
                {/* Email remains visible but disabled during verification */}
                <div>
                    <label className="block text-sm font-semibold mb-2 ml-1">Email Address</label>
                    <input
                        required
                        disabled={isNeedsVerification || loading}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        type="email"
                        placeholder='user@gmail.com'
                        className="w-full px-4 py-3 rounded-xl bg-white/50 dark:bg-indigo-900/50 border border-indigo-200 dark:border-indigo-800 outline-none transition-all disabled:opacity-60"
                    />
                </div>

                {!isNeedsVerification ? (
                    // PASSWORD INPUT (Login Mode)
                    <div className="relative animate-in fade-in slide-in-from-right-4">
                        <label className="block text-sm font-semibold mb-2 ml-1">Password</label>
                        <div className="relative">
                            <input
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                type={showPassword ? "text" : "password"}
                                placeholder="••••••••"
                                className="w-full px-4 py-3 rounded-xl bg-white/50 dark:bg-indigo-900/50 border border-indigo-200 dark:border-indigo-800 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-indigo-600"
                            >
                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>
                    </div>
                ) : (
                    // CODE INPUT (Verification Mode)
                    <div className="animate-in fade-in slide-in-from-left-4">
                        <label className="block text-sm font-semibold mb-2 ml-1 text-indigo-600 dark:text-indigo-400 flex items-center gap-2">
                            <ShieldCheck size={16} /> Verification Code
                        </label>
                        <input
                            required
                            autoFocus
                            value={verificationCode}
                            onChange={(e) => setVerificationCode(e.target.value)}
                            type="text"
                            placeholder="123456"
                            maxLength={6}
                            className="w-full px-4 py-3 rounded-xl bg-indigo-50 dark:bg-indigo-900/80 border-2 border-indigo-500 outline-none text-center text-2xl tracking-[0.5em] font-bold"
                        />
                        <button 
                            type="button" 
                            onClick={() => setIsNeedsVerification(false)}
                            className="mt-3 text-xs flex items-center gap-1 text-gray-500 hover:text-indigo-600 transition-colors"
                        >
                            <ArrowLeft size={12} /> Back to password
                        </button>
                    </div>
                )}

                {!isNeedsVerification && (
                    <div className="flex justify-end">
                        <a href="/forgot-password" className="text-xs text-indigo-600 hover:underline">
                            Forgot Password?
                        </a>
                    </div>
                )}

                <button 
                    disabled={loading}
                    className="w-full py-4 px-4 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold shadow-lg transform active:scale-95 transition-all disabled:opacity-50 flex justify-center items-center gap-2"
                >
                    {loading ? <Loader2 className="animate-spin" size={20} /> : (isNeedsVerification ? "Verify & Login" : "Sign In")}
                </button>
            </form>

            {!isNeedsVerification && (
                <>
                    <div className="relative my-8">
                        <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-indigo-200 dark:border-indigo-800"></span></div>
                        <div className="relative flex justify-center text-xs uppercase"><span className="bg-transparent px-2 text-indigo-500 font-medium">Or</span></div>
                    </div>
                    <GoogleSignIn text="Login with Google" />
                    <p className="text-center mt-8 text-sm">
                        Don&apos;t have an account?{" "}
                        <a href="/signup" className="text-purple-600 dark:text-purple-400 font-bold hover:underline">
                            Sign up
                        </a>
                    </p>
                </>
            )}
        </div>
    );
};

export default LoginForm;