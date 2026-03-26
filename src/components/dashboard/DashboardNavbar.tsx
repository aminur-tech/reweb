"use client";

import React, { useState, useRef, useEffect } from "react";
import { signOut, useSession } from "next-auth/react";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Sun, Moon, LogOut, User, 
  Settings, PieChart, ChevronDown, Sparkles 
} from "lucide-react";
import Link from "next/link";

const DashboardNavbar = () => {
  const { data: session } = useSession();
  const { resolvedTheme, setTheme } = useTheme();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="flex items-center justify-between px-8 py-4 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-100 dark:border-gray-800 sticky top-0 z-40">
      {/* Left Section */}
      <div className="flex items-center gap-3">
        <h1 className="text-lg font-bold text-gray-800 dark:text-gray-100 flex items-center gap-2">
          <Sparkles className="text-indigo-500 w-5 h-5" />
          Welcome, <span className="text-indigo-600 dark:text-indigo-400 capitalize">{session?.user?.name?.split(" ")[0]}</span>
        </h1>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-5">
        {/* Theme Toggle */}
        <button
          onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
          className="p-2.5 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:text-indigo-500 transition-all duration-300"
          title="Toggle Theme"
        >
          <Sun size={18} className="hidden dark:block text-yellow-400" />
          <Moon size={18} className="block dark:hidden" />
        </button>

        {/* User Profile Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center gap-3 p-1 pr-3 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-all border border-transparent hover:border-gray-200 dark:hover:border-gray-700"
          >
            {/* Image or First Letter */}
            <div className="w-10 h-10 rounded-full overflow-hidden bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold shadow-md">
              {session?.user?.image ? (
                <img src={session.user.image} alt="Avatar" className="w-full h-full object-cover" />
              ) : (
                <span className="text-lg">{session?.user?.name?.charAt(0).toUpperCase()}</span>
              )}
            </div>
            
            <div className="hidden md:flex flex-col items-start leading-tight">
              <span className="text-sm font-bold text-gray-900 dark:text-white">{session?.user?.name}</span>
              <span className="text-[10px] uppercase tracking-widest text-indigo-500 font-black">
                {session?.user?.role || "Member"}
              </span>
            </div>
            <ChevronDown size={14} className={`text-gray-400 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} />
          </button>

          {/* Dropdown Menu */}
          <AnimatePresence>
            {isDropdownOpen && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                className="absolute right-0 mt-3 w-64 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-3xl shadow-2xl p-2 overflow-hidden ring-1 ring-black/5"
              >
                {/* Header Profile Info */}
                <div className="px-4 py-4 mb-2 bg-gray-50 dark:bg-gray-800/50 rounded-2xl">
                  <p className="text-xs font-black text-gray-400 uppercase tracking-tighter mb-1">Authenticated As</p>
                  <p className="text-sm font-bold text-gray-900 dark:text-white truncate">{session?.user?.email}</p>
                </div>

                {/* Professional Routes */}
                <div className="space-y-1">
                  <DropdownLink href="/dashboard/profile" icon={<User size={16} />} label="My Profile" />
                  <DropdownLink href="/dashboard/analytics" icon={<PieChart size={16} />} label="AI Insights Chart" />
                  <DropdownLink href="/dashboard/settings" icon={<Settings size={16} />} label="Account Settings" />
                </div>

                <div className="my-2 border-t border-gray-100 dark:border-gray-800" />

                {/* Logout Button */}
                <button
                  onClick={() => signOut()}
                  className="w-full flex items-center gap-3 px-4 py-3 text-sm font-bold text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-2xl transition-colors"
                >
                  <LogOut size={16} />
                  <span>Sign Out</span>
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
};

// Helper Component for Links
const DropdownLink = ({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) => (
  <Link
    href={href}
    className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-indigo-50 dark:hover:bg-indigo-500/10 hover:text-indigo-600 dark:hover:text-indigo-400 rounded-2xl transition-all"
  >
    {icon}
    <span>{label}</span>
  </Link>
);

export default DashboardNavbar;