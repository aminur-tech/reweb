"use client";

import React, { useState } from "react";
import { useTheme } from "next-themes";
import { 
  User, 
  Bell, 
  Lock, 
  Palette, 
  CreditCard, 
  ChevronRight,
  LogOut,
  Moon,
  Sun,
  Monitor
} from "lucide-react";
import { signOut } from "next-auth/react";
import ProfilePage from "../profile/page";


const Settings = () => {
  const [activeTab, setActiveTab] = useState("Profile");
  const { theme, setTheme } = useTheme();

  const menuItems = [
    { name: "Profile", icon: <User size={18} />, description: "Personal info and avatar" },
    { name: "Appearance", icon: <Palette size={18} />, description: "Theme and display settings" },
    { name: "Security", icon: <Lock size={18} />, description: "Password and 2FA" },
    { name: "Notifications", icon: <Bell size={18} />, description: "Email and push alerts" },
    { name: "Billing", icon: <CreditCard size={18} />, description: "Invoices and subscription" },
  ];

  return (
    <div className="min-h-screen bg-[#FDFDFF] dark:bg-[#0B0F1A] text-gray-900 dark:text-gray-100 p-4 md:p-8 transition-colors duration-300">
      <div className="max-w-6xl mx-auto">
        
        <header className="mb-10">
          <h1 className="text-3xl font-extrabold tracking-tight">Account Settings</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-2">
            Manage your digital identity and account preferences.
          </p>
        </header>

        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Sidebar */}
          <aside className="w-full lg:w-72 space-y-2">
            <nav className="space-y-1">
              {menuItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => setActiveTab(item.name)}
                  className={`w-full flex items-center justify-between p-3.5 rounded-xl transition-all duration-200 group ${
                    activeTab === item.name
                      ? "bg-indigo-600 text-white shadow-lg shadow-indigo-200 dark:shadow-none"
                      : "hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className={activeTab === item.name ? "text-white" : "text-gray-400 group-hover:text-indigo-500"}>
                      {item.icon}
                    </span>
                    <p className="text-sm font-semibold">{item.name}</p>
                  </div>
                  <ChevronRight size={16} className={activeTab === item.name ? "opacity-100" : "opacity-0 group-hover:opacity-100"} />
                </button>
              ))}
            </nav>

            <div className="pt-6 mt-6 border-t border-gray-100 dark:border-gray-800">
              <button 
                onClick={() => signOut()}
                className="w-full flex items-center gap-3 p-3.5 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-xl transition-colors font-semibold text-sm"
              >
                <LogOut size={18} />
                Sign Out
              </button>
            </div>
          </aside>

          {/* Content Area */}
          <main className="flex-1">
            <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-3xl shadow-sm overflow-hidden">
              
              {activeTab === "Profile" && (
                <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                  <ProfilePage />
                </div>
              )}

              {activeTab === "Appearance" && (
                <div className="p-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="p-3 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 rounded-2xl">
                       <Palette size={20} />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold">Appearance</h2>
                      <p className="text-sm text-gray-500">Customize how the platform looks for you</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[
                      { id: 'light', label: 'Light', icon: <Sun size={20} /> },
                      { id: 'dark', label: 'Dark', icon: <Moon size={20} /> },
                      { id: 'system', label: 'System', icon: <Monitor size={20} /> }
                    ].map((t) => (
                      <button
                        key={t.id}
                        onClick={() => setTheme(t.id)}
                        className={`flex flex-col items-center gap-3 p-6 rounded-2xl border-2 transition-all ${
                          theme === t.id 
                            ? "border-indigo-600 bg-indigo-50/50 dark:bg-indigo-900/10" 
                            : "border-gray-100 dark:border-gray-800 hover:border-indigo-200 dark:hover:border-gray-700"
                        }`}
                      >
                        <div className={`${theme === t.id ? "text-indigo-600" : "text-gray-400"}`}>
                          {t.icon}
                        </div>
                        <span className="font-semibold text-sm">{t.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Placeholder for other tabs */}
              {activeTab !== "Profile" && activeTab !== "Appearance" && (
                <div className="p-20 text-center text-gray-400">
                  <p className="text-lg font-medium">{activeTab} settings are coming soon.</p>
                </div>
              )}

            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Settings;