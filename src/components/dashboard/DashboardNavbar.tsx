"use client";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ChevronDown, LogOut, Menu, Moon, Settings, Sparkles, Sun, User, Bell, CheckCircle, Trash2 } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import { useTheme } from "next-themes";
import { useEffect, useRef, useState } from "react";
import { useSocket } from "../hooks/useSocket";
import { api } from "@/lib/api";
import { formatDistanceToNow } from "date-fns"; 

interface INotification {
  _id?: string;
  message: string;
  taskId: string;
  isRead?: boolean;
  createdAt: string;
}

const DashboardNavbar = ({ onMenuClick }: { onMenuClick: () => void }) => {
  const { data: session } = useSession();
  const { resolvedTheme, setTheme } = useTheme();
  const socket = useSocket();

  // State Management
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [notifications, setNotifications] = useState<INotification[]>([]);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // 1. Fetch Historical Notifications
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const token = session?.accessToken;
        if (!token) return;

        const res = await api.get("/api/v1/tasks/notifications", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setNotifications(res.data.data);
      } catch (error) {
        console.error("Error fetching notifications", error);
      }
    };

    if (session?.accessToken) {
      fetchNotifications();
    }
  }, [session?.accessToken]);

//Setup Audio for Notifications
  useEffect(() => {
  audioRef.current = new Audio("/notification.mp3");
}, []);

  //  Real-time Socket Listener
  useEffect(() => {
    if (!socket) return;

    const handleNewNotification = (data: INotification) => {
      const newNotif = {
        ...data,
        createdAt: data.createdAt || new Date().toISOString()
      };

      setNotifications((prev) => [newNotif, ...prev]);

      // 🔊 Play sound safely
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.play().catch(() => {
          // Prevent browser autoplay error
          console.log("Sound blocked until user interaction");
        });
      }
    };

    socket.on("notification", handleNewNotification);

    return () => {
      socket.off("notification", handleNewNotification);
    };
  }, [socket]);

  // 3. Mark as Read & Clear logic
  const clearNotifications = async () => {
    try {
      const token = session?.accessToken;

      await api.patch("/api/v1/tasks/notifications/read", {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setNotifications([]);
      setIsNotifOpen(false);
    } catch (error) {
      console.error("Failed to clear notifications", error);
    }
  };

  // Click Outside Handler
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setIsNotifOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <header className="flex items-center justify-between px-4 md:px-8 py-4 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-100 dark:border-gray-800 sticky top-0 z-40">
      <div className="flex items-center gap-4">
        <button onClick={onMenuClick} className="lg:hidden p-2 text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 rounded-lg">
          <Menu size={20} />
        </button>

        <h1 className="text-sm md:text-lg font-bold text-gray-800 dark:text-gray-100 flex items-center gap-2">
          <Sparkles className="text-indigo-500 w-4 h-4 md:w-5 md:h-5" />
          <span className="hidden sm:inline text-gray-400 font-medium">Dashboard /</span>
          <span className="text-indigo-600 dark:text-indigo-400 capitalize">{session?.user?.name?.split(" ")[0]}</span>
        </h1>
      </div>

      <div className="flex items-center gap-3 md:gap-5">
        {/* Theme Toggle */}
        <button onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")} className="p-2.5 rounded-xl bg-gray-100 dark:bg-gray-800 hover:scale-105 transition-all active:scale-95">
          {resolvedTheme === "dark" ? <Sun size={18} className="text-yellow-400" /> : <Moon size={18} />}
        </button>

        {/* --- Notification Bell --- */}
        <div className="relative" ref={notifRef}>
          <button
            onClick={() => setIsNotifOpen(!isNotifOpen)}
            className="p-2.5 rounded-xl bg-gray-100 dark:bg-gray-800 transition-all relative hover:bg-gray-200 dark:hover:bg-gray-700 active:scale-95"
          >
            <Bell size={18} className={unreadCount > 0 ? "text-indigo-500 animate-pulse" : ""} />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white ring-2 ring-white dark:ring-gray-900">
                {unreadCount > 9 ? '9+' : unreadCount}
              </span>
            )}
          </button>

          <AnimatePresence>
            {isNotifOpen && (
              <motion.div
                initial={{ opacity: 0, y: 15, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 15, scale: 0.95 }}
                className="absolute right-0 mt-3 w-80 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-3xl shadow-2xl p-2 z-50 ring-1 ring-black/5"
              >
                <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center">
                  <span className="font-bold text-sm">Notifications</span>
                  {notifications.length > 0 && (
                    <button
                      onClick={clearNotifications}
                      className="text-[10px] uppercase tracking-wider font-bold text-red-500 flex items-center gap-1 hover:underline"
                    >
                      <Trash2 size={12} /> Clear All
                    </button>
                  )}
                </div>

                <div className="max-h-[350px] overflow-y-auto p-2 space-y-2 scrollbar-hide">
                  {notifications.length === 0 ? (
                    <div className="py-10 text-center">
                      <div className="w-12 h-12 bg-gray-50 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-3">
                        <CheckCircle className="text-gray-300 dark:text-gray-600" size={24} />
                      </div>
                      <p className="text-xs text-gray-500">No new notifications</p>
                    </div>
                  ) : (
                    notifications.map((n, i) => (
                      <Link
                        key={n._id || i}
                        href={`/dashboard/tasks/${n.taskId}`}
                        onClick={() => setIsNotifOpen(false)}
                        className="block p-3 rounded-2xl bg-gray-50 dark:bg-gray-800/50 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-all border border-transparent hover:border-indigo-100 dark:hover:border-indigo-800"
                      >
                        <p className="text-xs font-medium text-gray-800 dark:text-gray-200 line-clamp-2 leading-relaxed">
                          {n.message}
                        </p>
                        <span className="text-[10px] text-gray-400 mt-2 block font-medium">
                          {n.createdAt ? formatDistanceToNow(new Date(n.createdAt), { addSuffix: true }) : "Just now"}
                        </span>
                      </Link>
                    ))
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* User Profile Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center gap-3 p-1 pr-3 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-all border border-transparent hover:border-gray-200 dark:hover:border-gray-700 active:scale-95"
          >
            <div className="w-10 h-10 rounded-full overflow-hidden bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold shadow-md ring-2 ring-indigo-500/20">
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

          <AnimatePresence>
            {isDropdownOpen && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                className="absolute right-0 mt-3 w-64 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-3xl shadow-2xl p-2 overflow-hidden z-50 ring-1 ring-black/5"
              >
                <div className="px-4 py-4 mb-2 bg-gray-50 dark:bg-gray-800/50 rounded-2xl">
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-tighter mb-1">Authenticated As</p>
                  <p className="text-xs font-bold text-gray-900 dark:text-white truncate">{session?.user?.email}</p>
                </div>

                <div className="space-y-1">
                  <DropdownLink href="/dashboard/profile" icon={<User size={16} />} label="My Profile" />
                  <DropdownLink href="/dashboard/settings" icon={<Settings size={16} />} label="Account Settings" />
                </div>

                <div className="my-2 border-t border-gray-100 dark:border-gray-800" />

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

const DropdownLink = ({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) => (
  <Link
    href={href}
    className="flex items-center gap-3 px-4 py-3 text-sm font-bold text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-2xl transition-all"
  >
    <span className="text-indigo-500">{icon}</span>
    {label}
  </Link>
);

export default DashboardNavbar;