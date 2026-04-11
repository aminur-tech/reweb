"use client";

import React from "react";
import { motion } from "framer-motion";

const Loading = () => {
  return (
    <div className="fixed inset-0 z-[1000] flex flex-col items-center justify-center bg-white/80 dark:bg-[#030712]/80 backdrop-blur-xl">
      <div className="relative flex items-center justify-center">
        
        {/* Pro-Level Outer Ring */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "linear" }}
          className="w-28 h-28 rounded-full border-[2px] border-transparent border-t-indigo-500 border-r-pink-500/20"
        />

        {/* Inner Counter-Rotating Ring */}
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ repeat: Infinity, duration: 2.5, ease: "linear" }}
          className="absolute w-20 h-20 rounded-full border-[2px] border-transparent border-b-pink-500 border-l-indigo-500/20"
        />

        {/* Center Logo Image */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ 
            scale: [0.9, 1.05, 0.9], 
            opacity: 1 
          }}
          transition={{ 
            scale: { repeat: Infinity, duration: 2, ease: "easeInOut" },
            opacity: { duration: 0.5 }
          }}
          className="absolute flex items-center justify-center"
        >
          <div className="relative w-14 h-14 flex items-center justify-center">
            {/* Subtle glow behind logo */}
            <div className="absolute inset-0 bg-indigo-500/20 blur-xl rounded-full animate-pulse" />
            
            {/* Your Actual Logo Image */}
            <img 
              src="/logo.png" 
              alt="Loading Logo" 
              className="relative w-full h-full object-contain pointer-events-none"

            />
          </div>
        </motion.div>
      </div>

      {/* Typography Section */}
      <div className="mt-12 flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center gap-2"
        >
          <h2 className="text-sm font-black uppercase tracking-[0.4em] text-slate-900 dark:text-white">
            Initializing <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-pink-500">System</span>
          </h2>
          
          {/* Animated Scanning Line */}
          <div className="relative w-48 h-[1px] bg-slate-200 dark:bg-slate-800 overflow-hidden">
            <motion.div 
              animate={{ x: ["-100%", "100%"] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
              className="absolute inset-0 bg-gradient-to-r from-transparent via-pink-500 to-transparent w-1/2"
            />
          </div>
        </motion.div>

        <motion.p 
          animate={{ opacity: [0.3, 0.7, 0.3] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="mt-4 text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest"
        >
          Securing Data Uplink...
        </motion.p>
      </div>

      {/* Bottom Status Indicators */}
      <div className="absolute bottom-12 flex gap-4">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            animate={{ 
              scale: [1, 1.5, 1],
              opacity: [0.3, 1, 0.3] 
            }}
            transition={{ 
              repeat: Infinity, 
              duration: 1, 
              delay: i * 0.2 
            }}
            className="w-1 h-1 rounded-full bg-indigo-500"
          />
        ))}
      </div>
    </div>
  );
};

export default Loading;