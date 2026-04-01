"use client"
import React, { useState, useMemo } from 'react';
import GoogleSignIn from './GoogleSignIn';
import axios, { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, ShieldCheck, Info, CheckCircle2, XCircle } from 'lucide-react';
import Swal from 'sweetalert2';

const SignUpForm = () => {
    const router = useRouter();
    const [step, setStep] = useState(1); // 1: Registration, 2: Verification
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [verificationCode, setVerificationCode] = useState("");
    const [formError, setFormError] = useState("");
    const [acceptTerms, setAcceptTerms] = useState(false);
    const [loading, setLoading] = useState(false);
    
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    // --- PASSWORD VALIDATION LOGIC ---
    const passwordRequirements = useMemo(() => {
        const pw = formData.password;
        return [
            { label: "8+ Characters", met: pw.length >= 8 },
            { label: "Uppercase (A-Z)", met: /[A-Z]/.test(pw) },
            { label: "Lowercase (a-z)", met: /[a-z]/.test(pw) },
            { label: "Number (0-9)", met: /[0-9]/.test(pw) },
            { label: "Special (@#$!)", met: /[^A-Za-z0-9]/.test(pw) },
        ];
    }, [formData.password]);

    const passwordStrength = useMemo(() => {
        return passwordRequirements.filter(req => req.met).length;
    }, [passwordRequirements]);

    const strengthLabel = ["Very Weak", "Weak", "Fair", "Good", "Strong"];
    const strengthColor = ["bg-red-600", "bg-red-400", "bg-orange-400", "bg-yellow-400", "bg-green-500"];

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormError(""); 
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // --- STEP 1: HANDLE SIGNUP ---
    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (passwordStrength < 5) {
            setFormError("Password should meet all security requirements.");
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            setFormError("Confirm password does not match!");
            return;
        }

        if (!acceptTerms) {
            setFormError("You must accept the Terms and Conditions.");
            return;
        }

        setLoading(true);
        try {
            const payload = {
                name: `${formData.firstName} ${formData.lastName}`,
                email: formData.email,
                password: formData.password,
                photoImg: ''
            };

            const { data } = await axios.post("http://localhost:5000/api/v1/auth/register", payload);

            if (data.success) {
                Swal.fire({
                    icon: 'success',
                    title: 'Code Sent!',
                    text: `We've sent a 6-digit code to ${formData.email}`,
                    confirmButtonColor: '#7C3AED'
                });
                setStep(2);
            }
        } catch (error) {
            const err = error as AxiosError<{ message: string }>;
            setFormError(err.response?.data?.message || "Registration failed");
        } finally {
            setLoading(false);
        }
    };

    // --- STEP 2: HANDLE VERIFICATION ---
    const handleVerify = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const { data } = await axios.post("http://localhost:5000/api/v1/auth/verify-email", { 
                email: formData.email, 
                code: verificationCode 
            });

            if (data.success) {
                await Swal.fire({
                    icon: 'success',
                    title: 'Account Verified!',
                    text: 'You can now log in to your account.',
                    confirmButtonColor: '#7C3AED'
                });
                router.push("/login");
            }
        } catch (error) {
            setFormError("Invalid or expired verification code.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-lg w-full mx-auto p-8 rounded-3xl bg-white/40 dark:bg-indigo-950/40 backdrop-blur-xl border border-white/20 shadow-2xl transition-all duration-500">
            <div className="text-center mb-6">
                <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                    {step === 1 ? "Create Account" : "Verify Email"}
                </h2>
                <p className="text-sm mt-2 opacity-70">
                    {step === 1 ? "Join the REWEB digital ecosystem" : `Enter the code sent to ${formData.email}`}
                </p>
            </div>

            {/* Error Message Alert */}
            {formError && (
                <div className="mb-4 p-3 bg-red-100 border-l-4 border-red-500 text-red-700 text-sm flex items-start gap-2 rounded animate-shake">
                    <Info size={18} className="mt-0.5 shrink-0" /> 
                    <span>{formError}</span>
                </div>
            )}

            {step === 1 ? (
                /* --- REGISTRATION FORM --- */
                <form onSubmit={handleSignup} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input type="text" name="firstName" value={formData.firstName} required placeholder='First Name' className="w-full px-4 py-3 rounded-xl bg-white/50 dark:bg-indigo-900/50 border border-indigo-200 dark:border-indigo-800 outline-none focus:ring-2 focus:ring-purple-500 transition-all" onChange={handleChange} />
                    <input type="text" name="lastName" value={formData.lastName} required placeholder='Last Name' className="w-full px-4 py-3 rounded-xl bg-white/50 dark:bg-indigo-900/50 border border-indigo-200 dark:border-indigo-800 outline-none focus:ring-2 focus:ring-purple-500 transition-all" onChange={handleChange} />
                    
                    <div className="md:col-span-2">
                        <input type="email" name="email" value={formData.email} required placeholder='Email Address' className="w-full px-4 py-3 rounded-xl bg-white/50 dark:bg-indigo-900/50 border border-indigo-200 dark:border-indigo-800 outline-none focus:ring-2 focus:ring-purple-500 transition-all" onChange={handleChange} />
                    </div>

                    {/* Password Field */}
                    <div className="md:col-span-2 relative">
                        <input type={showPassword ? "text" : "password"} name="password" value={formData.password} required placeholder='Password' className="w-full px-4 py-3 rounded-xl bg-white/50 dark:bg-indigo-900/50 border border-indigo-200 dark:border-indigo-800 outline-none focus:ring-2 focus:ring-purple-500 transition-all" onChange={handleChange} />
                        <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-purple-600">
                            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                    </div>

                    {/* Password Strength Checklist */}
                    {formData.password && (
                        <div className="md:col-span-2 px-1">
                            <div className="flex gap-1 h-1.5 mb-2">
                                {[...Array(5)].map((_, i) => (
                                    <div key={i} className={`flex-1 rounded-full transition-all duration-500 ${i < passwordStrength ? strengthColor[passwordStrength - 1] : 'bg-gray-200 dark:bg-gray-700'}`} />
                                ))}
                            </div>
                            <div className="grid grid-cols-2 gap-y-1">
                                {passwordRequirements.map((req, index) => (
                                    <div key={index} className={`flex items-center gap-1.5 text-[10px] ${req.met ? 'text-green-500 font-medium' : 'text-gray-400'}`}>
                                        {req.met ? <CheckCircle2 size={12} /> : <XCircle size={12} />}
                                        {req.label}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Confirm Password Field */}
                    <div className="md:col-span-2 relative">
                        <input type={showConfirmPassword ? "text" : "password"} name="confirmPassword" value={formData.confirmPassword} required placeholder='Confirm Password' className="w-full px-4 py-3 rounded-xl bg-white/50 dark:bg-indigo-900/50 border border-indigo-200 dark:border-indigo-800 outline-none focus:ring-2 focus:ring-purple-500 transition-all" onChange={handleChange} />
                        <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-purple-600">
                            {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                    </div>

                    {/* Terms */}
                    <div className="md:col-span-2 flex items-center gap-2 px-1">
                        <input type="checkbox" id="terms" checked={acceptTerms} onChange={(e) => setAcceptTerms(e.target.checked)} className="rounded text-purple-600 focus:ring-purple-500 w-4 h-4 cursor-pointer" />
                        <label htmlFor="terms" className="text-xs opacity-70 cursor-pointer select-none">
                            I agree to the <span className="text-purple-600 font-bold hover:underline">Terms of Service</span>
                        </label>
                    </div>

                    <button type="submit" disabled={loading} className="md:col-span-2 w-full py-4 mt-2 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold shadow-lg transform active:scale-95 transition-all hover:opacity-90 disabled:opacity-50">
                        {loading ? "Creating Account..." : "Create Account"}
                    </button>
                </form>
            ) : (
                /* --- VERIFICATION FORM --- */
                <form onSubmit={handleVerify} className="space-y-6">
                    <div className="flex justify-center py-4">
                        <div className="p-4 bg-purple-100 dark:bg-purple-900/30 rounded-full animate-pulse">
                            <ShieldCheck size={48} className="text-purple-600" />
                        </div>
                    </div>
                    <div>
                        <label className="block text-center text-sm font-semibold mb-4">Enter Verification Code</label>
                        <input 
                            type="text" maxLength={6} placeholder="0 0 0 0 0 0"
                            className="w-full text-center text-3xl tracking-[0.5em] font-bold px-4 py-4 rounded-xl bg-white/50 dark:bg-indigo-900/50 border border-indigo-200 outline-none focus:ring-2 focus:ring-pink-500"
                            value={verificationCode} onChange={(e) => setVerificationCode(e.target.value)}
                        />
                    </div>
                    <button type="submit" disabled={loading} className="w-full py-4 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold shadow-lg transform active:scale-95 transition-all">
                        {loading ? "Verifying..." : "Verify & Activate"}
                    </button>
                    <button type="button" onClick={() => setStep(1)} className="w-full text-sm opacity-60 hover:underline">
                        Entered the wrong email? Go back
                    </button>
                </form>
            )}

            {step === 1 && (
                <div className="mt-6">
                    <div className="relative mb-6">
                        <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-indigo-200 dark:border-indigo-800"></span></div>
                        <div className="relative flex justify-center text-xs uppercase"><span className="bg-white dark:bg-[#1e1b4b] px-2 text-indigo-500">Or continue with</span></div>
                    </div>
                    <GoogleSignIn text="Sign up with Google" />
                    <p className="text-center mt-6 text-sm">
                        Already have an account? <a href="/login" className="text-indigo-600 font-bold hover:underline">Log in</a>
                    </p>
                </div>
            )}
        </div>
    );
};

export default SignUpForm;