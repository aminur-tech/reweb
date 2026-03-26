"use client"
import React, { useState } from 'react';
import GoogleSignIn from './GoogleSignIn';
import axios, { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';

const SignUpForm = () => {
    const router = useRouter();
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const payload = {
                name: `${formData.firstName} ${formData.lastName}`,
                email: formData.email,
                password: formData.password,
            };

            const { data } = await axios.post(
                "http://localhost:5000/api/v1/auth/register",
                payload
            );

            if (data.success) {
                router.push("/login");
            }
        } catch (error) {
            const err = error as AxiosError;
            console.error(err.response?.data);
        }
    };
    return (
        <div className="max-w-lg w-full mx-auto p-8 rounded-3xl bg-white/40 dark:bg-indigo-950/40 backdrop-blur-xl border border-white/20 shadow-2xl">
            <div className="text-center mb-8">
                <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                    Create your REWEB Account
                </h2>
                <p className="text-sm mt-2 opacity-70">Join our scalable digital ecosystem</p>
            </div>

            <form onSubmit={handleSignup} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-1">
                    <label className="block text-sm font-semibold mb-2 ml-1">First Name</label>
                    <input
                        type="text"
                        name="firstName"
                        placeholder='Your First Name'
                        className="w-full px-4 py-3 rounded-xl bg-white/50 dark:bg-indigo-900/50 border border-indigo-200 dark:border-indigo-800 focus:ring-2 focus:ring-pink-500 outline-none transition-all"
                        onChange={handleChange}
                    />
                </div>
                <div className="md:col-span-1">
                    <label className="block text-sm font-semibold mb-2 ml-1">Last Name</label>
                    <input
                        type="text"
                        name="lastName"
                        placeholder='Your Last Name'
                        className="w-full px-4 py-3 rounded-xl bg-white/50 dark:bg-indigo-900/50 border border-indigo-200 dark:border-indigo-800 focus:ring-2 focus:ring-pink-500 outline-none transition-all"
                        onChange={handleChange}
                    />
                </div>
                <div className="md:col-span-2">
                    <label className="block text-sm font-semibold mb-2 ml-1">Email</label>
                    <input
                        type="email"
                        name="email"
                        placeholder='Your Email'
                        className="w-full px-4 py-3 rounded-xl bg-white/50 dark:bg-indigo-900/50 border border-indigo-200 dark:border-indigo-800 focus:ring-2 focus:ring-pink-500 outline-none transition-all"
                        onChange={handleChange}
                    />
                </div>
                <div className="md:col-span-2">
                    <label className="block text-sm font-semibold mb-2 ml-1">Password</label>
                    <input
                        type="password"
                        name="password"
                        placeholder='Your Password'
                        className="w-full px-4 py-3 rounded-xl bg-white/50 dark:bg-indigo-900/50 border border-indigo-200 dark:border-indigo-800 focus:ring-2 focus:ring-pink-500 outline-none transition-all"
                        onChange={handleChange}
                    />
                </div>

                <button className="md:col-span-2 w-full py-3 mt-2 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold shadow-lg transform hover:scale-[1.01] transition-all">
                    Get Started
                </button>
            </form>

            <div className="relative my-6">
                <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-indigo-200 dark:border-indigo-800"></span></div>
                <div className="relative flex justify-center text-xs uppercase"><span className="bg-transparent px-2 text-indigo-500">Or sign up with</span></div>
            </div>

            <GoogleSignIn text="Sign up with Google" />

            <p className="text-center mt-6 text-sm">
                Already have an account? <a href="/login" className="text-indigo-600 dark:text-indigo-400 font-bold hover:underline">Log in</a>
            </p>
        </div>
    );
};

export default SignUpForm;