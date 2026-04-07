import Link from 'next/link';
import React from 'react';

const Logo = () => {
  return (
    <Link href="/" className="group flex items-center gap-3 no-underline">
      {/* ICON CONTAINER */}
      <div className="relative">
        {/* Outer Glow Effect */}
        <div className="absolute inset-0 bg-gradient-to-tr from-violet-600 to-pink-500 rounded-xl blur-md opacity-20 group-hover:opacity-40 transition-opacity duration-500" />
        
        {/* The Box */}
        <div className="relative w-10 h-10 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-center overflow-hidden shadow-sm">
          {/* Subtle Internal Gradient Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          
          <img 
            src="/logo.png" 
            alt="logo" 
            className="w-14 h-14 object-contain z-10 transition-transform duration-500 group-hover:scale-110" 
          />
        </div>
      </div>

      {/* TEXT LOGO */}
      <div className="flex flex-col items-start leading-none">
        <span className="text-xl font-black tracking-tighter text-slate-900 dark:text-white flex items-center gap-0.5">
          REWEV
          <span className="flex h-1.5 w-1.5 rounded-full bg-gradient-to-r from-violet-600 to-pink-500 animate-pulse" />
        </span>
        <span className="text-[8px] font-bold uppercase tracking-[0.3em] text-slate-400 dark:text-slate-500 mt-0.5 ml-0.5">
          Intelligence
        </span>
      </div>
    </Link>
  );
};

export default Logo;