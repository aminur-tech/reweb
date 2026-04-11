"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Menu, X, ChevronRight, Sun, Moon, 
  LayoutDashboard, Settings, LogOut, 
  User2, Brain, ChevronDown, Beaker, Terminal
} from "lucide-react";
import { useSession, signOut } from "next-auth/react";
import { useTheme } from "next-themes";
import Logo from "../logo/Logo";

// --- Custom NavLink Component ---
const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={`relative px-5 py-2 text-sm font-semibold transition-colors duration-300 rounded-full hover:bg-indigo-400/10 ${
        isActive ? "text-indigo-500 dark:text-pink-400 underline underline-offset-4 decoration-indigo-500 dark:decoration-pink-400 " : "text-slate-600 dark:text-slate-300 hover:text-pink-500"
      }`}
    >
      {children}
      {isActive && (
        <motion.div
          layoutId="nav-underline"
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-indigo-500 dark:bg-pink-500 rounded-full"
          transition={{ type: "spring", stiffness: 380, damping: 30 }}
        />
      )}
    </Link>
  );
};

const Navbar = () => {
  const { data: session, status } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();
  
  const dropdownRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdowns on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
      if (servicesRef.current && !servicesRef.current.contains(event.target as Node)) {
        setIsServicesOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { 
      name: "Services",  
      subLinks: [
        { name: "Research", href: "/research", icon: <Beaker size={16}/> },
        { name: "Development", href: "/development", icon: <Terminal size={16}/> }
      ] 
    },
    { name: "Ecosystem", href: "/ecosystem" },
    { name: "Achievements", href: "/achievements" },
    { name: session?.user ? "Dashboard" : "Login", href: session?.user ? "/dashboard" : "/login" }
  ];

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled
          ? "py-3 bg-white/70 dark:bg-[#030712]/70 backdrop-blur-xl border-b border-indigo-400/20 shadow-lg"
          : "py-5 bg-transparent"
      }`}
    >
      <div className="w-full md:w-11/12 mx-auto px-6">
        <div className="flex justify-between items-center">
          
          <Logo/>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              if (link.subLinks) {
                return (
                  <div 
                    key={link.name} 
                    className="relative group" 
                    onMouseEnter={() => setIsServicesOpen(true)}
                    onMouseLeave={() => setIsServicesOpen(false)}
                  >
                    <button
                      className={`flex items-center gap-1 px-5 py-2 text-sm font-semibold transition-colors duration-300 rounded-full hover:bg-indigo-400/10 text-slate-600 dark:text-slate-300 hover:text-pink-500`}
                    >
                      {link.name}
                      <ChevronDown size={14} className={`transition-transform duration-300 ${isServicesOpen ? "rotate-180" : ""}`} />
                    </button>

                    <AnimatePresence>
                      {isServicesOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          className="absolute left-0 mt-2 w-48 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl p-2 z-[70]"
                        >
                          {link.subLinks.map((sub) => (
                            <Link
                              key={sub.name}
                              href={sub.href}
                              className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-indigo-50 dark:hover:bg-indigo-500/10 rounded-xl transition-colors"
                            >
                              <span className="text-indigo-500">{sub.icon}</span>
                              {sub.name}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              }
              return (
                <NavLink key={link.name} href={link.href}>
                  {link.name}
                </NavLink>
              );
            })}
          </div>

          {/* Right Side */}
          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
              className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 hover:rotate-180 transition-transform duration-500"
            >
              <Sun size={18} className="text-yellow-400 hidden dark:block" />
              <Moon size={18} className="block dark:hidden text-slate-700" />
            </button>

            {status === "loading" ? null : session?.user ? (
              <div className="relative" ref={dropdownRef}>
                <button 
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="p-0.5 rounded-full bg-gradient-to-tr from-indigo-500 to-pink-500 hover:scale-105 transition-transform"
                >
                  <div className="w-10 h-10 rounded-full bg-white dark:bg-slate-900 flex items-center justify-center overflow-hidden">
                    {session.user.image ? (
                      <img src={session.user.image} alt="user" className="w-full h-full object-cover" />
                    ) : (
                      <span className="font-bold text-transparent bg-clip-text bg-gradient-to-tr from-indigo-500 to-pink-500">
                        {session.user.name?.charAt(0).toUpperCase()}
                      </span>
                    )}
                  </div>
                </button>

                <AnimatePresence>
                  {isProfileOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 15, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 15, scale: 0.95 }}
                      className="absolute right-0 mt-4 w-64 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl p-3 z-[60]"
                    >
                      <div className="px-4 py-3 border-b border-slate-100 dark:border-slate-800 mb-2">
                        <p className="text-sm font-bold dark:text-white text-slate-900">{session.user.name}</p>
                        <p className="text-xs text-slate-500 truncate">{session.user.email}</p>
                      </div>

                      <div className="space-y-1">
                        <DropdownItem href="/dashboard" icon={<LayoutDashboard size={16}/>} label="Dashboard" />
                        <DropdownItem href="/dashboard/ai-charts" icon={<Brain size={16}/>} label="AI Insights Chart" />
                        <DropdownItem href="/dashboard/profile" icon={<User2 size={16}/>} label="Profile" />
                        <DropdownItem href="/dashboard/settings" icon={<Settings size={16}/>} label="Account Settings" />
                      </div>

                      <button
                        onClick={() => signOut()}
                        className="w-full mt-2 flex items-center gap-3 px-4 py-3 text-sm font-bold text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-2xl transition-colors"
                      >
                        <LogOut size={16} /> Logout
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link href="/login" className="text-sm font-bold text-slate-600 dark:text-slate-300 hover:text-indigo-500">Sign In</Link>
                <Link href="/signup" className="px-6 py-2.5 bg-gradient-to-r from-indigo-500 to-pink-500 text-white text-sm font-bold rounded-full shadow-lg hover:shadow-indigo-500/20 transition-all">
                  Get Started
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            <button onClick={() => setIsOpen(!isOpen)} className="p-2 dark:text-white">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Content */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white dark:bg-[#030712] border-b border-indigo-400/20 overflow-hidden"
          >
            <div className="flex flex-col gap-2 p-6">
              {navLinks.map((link) => (
                <div key={link.name}>
                  {link.subLinks ? (
                    <>
                      <button
                        onClick={() => setIsServicesOpen(!isServicesOpen)}
                        className="w-full flex justify-between items-center px-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-900/50 text-slate-700 dark:text-slate-200 font-semibold"
                      >
                        {link.name}
                        <ChevronDown size={18} className={`transition-transform ${isServicesOpen ? "rotate-180" : ""}`} />
                      </button>
                      <AnimatePresence>
                        {isServicesOpen && (
                          <motion.div 
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden flex flex-col pl-4 mt-1 gap-1"
                          >
                            {link.subLinks.map((sub) => (
                              <Link
                                key={sub.name}
                                href={sub.href}
                                onClick={() => setIsOpen(false)}
                                className="flex items-center justify-between px-4 py-3 text-slate-500 dark:text-slate-400 font-medium hover:text-indigo-500"
                              >
                                {sub.name}
                                <ChevronRight size={14} />
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </>
                  ) : (
                    <Link
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className="flex justify-between items-center px-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-900/50 text-slate-700 dark:text-slate-200 font-semibold hover:text-indigo-500"
                    >
                      {link.name}
                      <ChevronRight size={18} className="opacity-50" />
                    </Link>
                  )}
                </div>
              ))}

              <hr className="my-2 border-slate-100 dark:border-slate-800" />
              {/* ... Rest of mobile auth actions remain same ... */}
              {status === "authenticated" ? (
                <div className="flex flex-col gap-2">
                  <Link href="/dashboard" onClick={() => setIsOpen(false)} className="flex items-center gap-3 px-4 py-3 text-sm font-bold text-indigo-500">
                    <LayoutDashboard size={18} /> Dashboard
                  </Link>
                  <button onClick={() => signOut()} className="flex items-center gap-3 px-4 py-3 text-sm font-bold text-red-500">
                    <LogOut size={18} /> Logout
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-4 pt-2">
                  <Link href="/login" onClick={() => setIsOpen(false)} className="flex items-center justify-center py-3 text-sm font-bold text-slate-600 dark:text-slate-300">
                    Sign In
                  </Link>
                  <Link href="/signup" onClick={() => setIsOpen(false)} className="flex items-center justify-center py-3 bg-gradient-to-r from-indigo-500 to-pink-500 text-white text-sm font-bold rounded-xl">
                    Get Started
                  </Link>
                </div>
              )}
              <button
                onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
                className="mt-4 flex items-center justify-center gap-2 py-3 w-full rounded-xl border border-slate-200 dark:border-slate-800 text-sm font-medium dark:text-white"
              >
                {resolvedTheme === "dark" ? <><Sun size={16} className="text-yellow-400" /> Light Mode</> : <><Moon size={16} className="text-slate-600" /> Dark Mode</>}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const DropdownItem = ({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) => (
  <Link 
    href={href} 
    className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-2xl transition-colors"
  >
    <span className="text-indigo-500">{icon}</span>
    {label}
  </Link>
);

export default Navbar;