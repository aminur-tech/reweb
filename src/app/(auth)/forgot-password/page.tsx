"use client"
import React, { useState } from 'react';
import axios, { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { Loader2, Mail, Lock, ShieldCheck, ArrowLeft, CheckCircle2, Eye, EyeOff } from 'lucide-react';
import Swal from 'sweetalert2';
import { api } from '@/lib/api';

const ForgotPassword = () => {
    const [step, setStep] = useState(1); // 1: Email, 2: OTP, 3: New Password
    const [email, setEmail] = useState("");
    const [code, setCode] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    
    // UI States for password visibility
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    // Step 1: Request OTP
    const handleRequestCode = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await api.post("/api/v1/auth/forgot-password", { email });
            setStep(2);
            Swal.fire("Sent!", "Check your email for the reset code.", "success");
        } catch (err) {
            const axiosError = err as AxiosError<{ message: string }>;
            Swal.fire("Error", axiosError.response?.data?.message || "User not found", "error");
        } finally { setLoading(false); }
    };

    // Step 2: Verify OTP
    const handleVerifyOtp = (e: React.FormEvent) => {
        e.preventDefault();
        if (code.length !== 6) {
            return Swal.fire("Wait", "Please enter a valid 6-digit code.", "warning");
        }
        setStep(3);
    };

    // Step 3: Final Reset
    const handleReset = async (e: React.FormEvent) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            return Swal.fire("Error", "Passwords do not match!", "error");
        }

        setLoading(true);
        try {
            await api.post("/api/v1/auth/reset-password", { 
                email, 
                code, 
                newPassword 
            });
            await Swal.fire("Success!", "Password updated successfully.", "success");
            router.push("/login");
        } catch (err) {
            const axiosError = err as AxiosError<{ message: string }>;
            Swal.fire("Error", axiosError.response?.data?.message || "Invalid or expired code", "error");
            setStep(2); 
        } finally { setLoading(false); }
    };

    return (
        <div className="max-w-md w-full mx-auto p-8 rounded-3xl bg-white/40 dark:bg-indigo-950/40 backdrop-blur-xl border border-white/20 shadow-2xl transition-all">
            <div className="text-center mb-8">
                <div className="inline-flex p-3 rounded-full bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 mb-4">
                    {step === 1 && <Mail size={28} />}
                    {step === 2 && <ShieldCheck size={28} />}
                    {step === 3 && <Lock size={28} />}
                </div>
                <h2 className="text-2xl font-bold">
                    {step === 1 && "Forgot Password"}
                    {step === 2 && "Verify OTP"}
                    {step === 3 && "Set New Password"}
                </h2>
                <p className="text-sm opacity-60 mt-2">
                    {step === 1 && "Enter your email to receive a reset code."}
                    {step === 2 && `Enter the 6-digit code sent to ${email}`}
                    {step === 3 && "Create a strong new password for your account."}
                </p>
            </div>

            {/* STEP 1: EMAIL */}
            {step === 1 && (
                <form onSubmit={handleRequestCode} className="space-y-4">
                    <input 
                        type="email" required placeholder="Email Address" 
                        className="w-full px-4 py-3 rounded-xl bg-white/50 dark:bg-indigo-900/50 border border-indigo-100 dark:border-indigo-800 outline-none focus:ring-2 focus:ring-indigo-500"
                        value={email} onChange={(e) => setEmail(e.target.value)}
                    />
                    <button disabled={loading} className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold shadow-lg transition-all">
                        {loading ? <Loader2 className="animate-spin mx-auto"/> : "Send Reset Code"}
                    </button>
                </form>
            )}

            {/* STEP 2: OTP VERIFICATION */}
            {step === 2 && (
                <form onSubmit={handleVerifyOtp} className="space-y-4 animate-in slide-in-from-right-4">
                    <input 
                        type="text" required placeholder="000000" maxLength={6}
                        className="w-full px-4 py-4 rounded-xl bg-white/50 dark:bg-indigo-900/50 border-2 border-indigo-500 outline-none text-center text-3xl font-bold tracking-[0.5em]"
                        value={code} onChange={(e) => setCode(e.target.value)}
                    />
                    <button className="w-full py-3 bg-indigo-600 text-white rounded-xl font-bold flex justify-center items-center gap-2">
                        Verify Code <CheckCircle2 size={18} />
                    </button>
                    <button type="button" onClick={() => setStep(1)} className="w-full text-xs text-gray-500 flex justify-center items-center gap-1">
                        <ArrowLeft size={12} /> Change Email
                    </button>
                </form>
            )}

            {/* STEP 3: NEW PASSWORD */}
            {step === 3 && (
                <form onSubmit={handleReset} className="space-y-4 animate-in slide-in-from-right-4">
                    {/* New Password Field */}
                    <div className="relative">
                        <input 
                            type={showNewPassword ? "text" : "password"} 
                            required 
                            placeholder="New Password" 
                            className="w-full px-4 py-3 rounded-xl bg-white/50 dark:bg-indigo-900/50 border border-indigo-100 dark:border-indigo-800 outline-none focus:ring-2 focus:ring-indigo-500"
                            value={newPassword} 
                            onChange={(e) => setNewPassword(e.target.value)}
                        />
                        <button 
                            type="button"
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-indigo-500"
                            onClick={() => setShowNewPassword(!showNewPassword)}
                        >
                            {showNewPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                    </div>

                    {/* Confirm Password Field */}
                    <div className="relative">
                        <input 
                            type={showConfirmPassword ? "text" : "password"} 
                            required 
                            placeholder="Confirm New Password" 
                            className="w-full px-4 py-3 rounded-xl bg-white/50 dark:bg-indigo-900/50 border border-indigo-100 dark:border-indigo-800 outline-none focus:ring-2 focus:ring-indigo-500"
                            value={confirmPassword} 
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                        <button 
                            type="button"
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-indigo-500"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        >
                            {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                    </div>

                    <button disabled={loading} className="w-full py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl font-bold shadow-lg transition-all">
                        {loading ? <Loader2 className="animate-spin mx-auto"/> : "Update Password"}
                    </button>
                </form>
            )}
        </div>
    );
};

export default ForgotPassword;