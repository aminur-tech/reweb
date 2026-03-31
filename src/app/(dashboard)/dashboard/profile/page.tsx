"use client";

import React, { useState } from 'react';
import { useSession } from "next-auth/react";
import { Camera, Save, User, Loader2 } from "lucide-react";
import { toast } from 'sonner';

const ProfilePage = () => {
    const { data: session, update } = useSession();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: session?.user?.name || "",
        image: session?.user?.image || ""
    });

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            // Replace with your actual API call
            const response = await fetch('/api/user/update-profile', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                // Update the NextAuth session locally
                await update({ ...session, user: { ...session?.user, ...formData } });
                toast.success("Profile updated successfully!");
            }
        } catch (error) {
            console.error("Update failed", error);
            toast.error("Failed to update profile.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto mt-10 p-8 bg-white dark:bg-gray-900 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-800">
            <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Edit Profile</h2>
            
            <form onSubmit={handleUpdate} className="space-y-6">
                {/* Avatar Upload Preview */}
                <div className="flex flex-col items-center gap-4">
                    <div className="relative group">
                        <div className="w-32 h-32 rounded-full overflow-hidden ring-4 ring-indigo-500/20 group-hover:ring-indigo-500/50 transition-all">
                            {formData.image ? (
                                <img src={formData.image} alt="Profile" className="w-full h-full object-cover" />
                            ) : (
                                <div className="w-full h-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                                    <User size={48} className="text-gray-400" />
                                </div>
                            )}
                        </div>
                        <label className="absolute bottom-0 right-0 p-2 bg-indigo-600 rounded-full text-white cursor-pointer hover:bg-indigo-700 transition-colors shadow-lg">
                            <Camera size={20} />
                            <input 
                                type="text" 
                                placeholder="Image URL" 
                                className="hidden" 
                                onChange={(e) => setFormData({...formData, image: e.target.value})}
                            />
                        </label>
                    </div>
                    <p className="text-xs text-gray-500">Click the camera to update image URL</p>
                </div>

                {/* Form Fields */}
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Full Name</label>
                        <input
                            type="text"
                            value={formData.name}
                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-transparent focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                            placeholder="Your Name"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Profile Image URL</label>
                        <input
                            type="text"
                            value={formData.image}
                            onChange={(e) => setFormData({...formData, image: e.target.value})}
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-transparent focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                            placeholder="https://example.com/photo.jpg"
                        />
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-2xl flex items-center justify-center gap-2 transition-all disabled:opacity-50"
                >
                    {loading ? <Loader2 className="animate-spin" /> : <Save size={20} />}
                    Save Changes
                </button>
            </form>
        </div>
    );
};

export default ProfilePage;