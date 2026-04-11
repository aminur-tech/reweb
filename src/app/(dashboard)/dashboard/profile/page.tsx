"use client";
import React, { useRef, useState } from "react";
import { useSession } from "next-auth/react";
import { Camera, Loader2, User, Mail, CheckCircle2 } from "lucide-react";
import { api } from "@/lib/api";

const ProfilePage = () => {
  const { data: session, update } = useSession();

  const fileInputRef = useRef<HTMLInputElement>(null);

  const [name, setName] = useState(session?.user?.name || "");
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState(session?.user?.image || "");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // 📸 Image Select
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (!selected) return;

    setFile(selected);
    setPreview(URL.createObjectURL(selected));
  };

  // 🚀 Update Profile
  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);

    try {
      const formData = new FormData();
      formData.append("name", name);

      if (file) {
        formData.append("image", file);
      }

      const res = await api.patch(
        "/api/v1/auth/update-profile",
        formData,
        {
          headers: {
            Authorization: `Bearer ${session?.accessToken}`,
          },
        }
      );

      if (res.data.success) {
        await update({
          user: {
            name: res.data.data.name,
            image: res.data.data.image,
          },
        });
        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000);
      }
    } catch (error) {
      console.error(error);
      // In a real app, use a toast library like react-hot-toast here
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f8fafc] dark:bg-[#0f172a] p-6">
      {/* Background Decor */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] rounded-full bg-indigo-500/10 blur-[120px]" />
        <div className="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] rounded-full bg-purple-500/10 blur-[120px]" />
      </div>

      <div className="relative w-full max-w-md">
        <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-gray-100 dark:border-gray-800 overflow-hidden">
          
          {/* Header/Cover Area */}
          <div className="h-32 bg-gradient-to-r from-indigo-600 to-violet-600 relative">
            <div className="absolute -bottom-12 left-1/2 -translate-x-1/2">
              <div 
                onClick={() => fileInputRef.current?.click()}
                className="relative group cursor-pointer"
              >
                <div className="w-32 h-32 rounded-3xl overflow-hidden border-4 border-white dark:border-gray-900 shadow-xl transition-transform duration-300 group-hover:scale-[1.02]">
                  <img
                    src={preview || "/default.png"}
                    alt="profile"
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Modern Overlay */}
                <div className="absolute inset-0 bg-gray-900/40 rounded-3xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 backdrop-blur-[2px]">
                  <Camera className="text-white w-8 h-8" />
                </div>
                <input
                  type="file"
                  hidden
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept="image/*"
                />
              </div>
            </div>
          </div>

          <div className="pt-16 p-8 pb-10">
            {/* Title Section */}
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">
                Account Settings
              </h2>
              <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
                Manage your public profile information
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleUpdate} className="space-y-5">
              
              <div className="space-y-2">
                <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider ml-1">
                  Full Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                    className="w-full pl-11 pr-4 py-3.5 bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-2xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all dark:text-white"
                  />
                </div>
              </div>

              {/* Read-only Email (Good for Pro UI) */}
              <div className="space-y-2 opacity-60">
                <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider ml-1">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="email"
                    disabled
                    value={session?.user?.email || "user@example.com"}
                    className="w-full pl-11 pr-4 py-3.5 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl cursor-not-allowed dark:text-gray-400"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                disabled={loading}
                className={`w-full py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all duration-300 shadow-lg shadow-indigo-200 dark:shadow-none
                  ${success 
                    ? "bg-emerald-500 text-white" 
                    : "bg-indigo-600 hover:bg-indigo-700 text-white active:scale-[0.98]"
                  } 
                  disabled:opacity-70 disabled:cursor-not-allowed mt-4`}
              >
                {loading ? (
                  <Loader2 className="animate-spin" size={20} />
                ) : success ? (
                  <CheckCircle2 size={20} />
                ) : null}
                
                {loading ? "Saving Changes..." : success ? "Profile Updated!" : "Save Changes"}
              </button>
            </form>
          </div>
        </div>
        
        {/* Footer Link */}
        <p className="text-center mt-8 text-sm text-gray-400">
          Need help? <span className="text-indigo-500 cursor-pointer hover:underline">Contact Support</span>
        </p>
      </div>
    </div>
  );
};

export default ProfilePage;