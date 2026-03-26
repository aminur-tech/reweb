"use client";

import React from "react";
import { motion, Variants } from "framer-motion";

const DevHero = () => {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <section className="relative overflow-hidden text-center py-32 bg-white dark:bg-slate-950">
      {/* Dynamic Background Glow - Updated to match Pink/Indigo theme */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full opacity-10 pointer-events-none">
        <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-r from-indigo-500 to-pink-500 blur-[140px] rounded-full" />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 container mx-auto px-6"
      >
        {/* Badge Animation - Soft Pink/Indigo border */}
        <motion.span 
          variants={itemVariants}
          className="inline-block px-4 py-1.5 mb-8 text-xs font-bold tracking-widest uppercase border border-pink-200 dark:border-pink-900/50 text-pink-600 dark:text-pink-400 bg-pink-50/50 dark:bg-pink-950/20 rounded-full"
        >
          ✨ Professional Web Development Services ✨
        </motion.span>

        {/* Main Title with your requested Gradient */}
        <motion.h1 
          variants={itemVariants}
          className="text-5xl md:text-7xl font-black tracking-tight text-slate-900 dark:text-white"
        >
          Professional <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
            Web Development
          </span>
        </motion.h1>

        {/* Description */}
        <motion.p 
          variants={itemVariants}
          className="mt-6 text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed"
        >
          We build high-performance, scalable web applications using modern technologies. 
          Your idea, our expertise, engineered to scale.
        </motion.p>

        {/* Interactive CTA Section */}
        <motion.div 
          variants={itemVariants}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-6"
        >
          {/* Your Custom Gradient Button */}
          <motion.button 
            whileHover={{ scale: 1.05, filter: "brightness(1.1)" }}
            whileTap={{ scale: 0.98 }}
            className="group relative flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white text-md font-bold rounded-full shadow-xl shadow-purple-500/20 overflow-hidden"
          >
            <span className="relative z-10">Explore our Product</span>
            <svg className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
            {/* Shimmer Effect */}
            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
          </motion.button>
          
          <button className="text-slate-600 dark:text-slate-400 font-bold hover:text-pink-500 dark:hover:text-pink-400 transition-colors flex items-center gap-2">
            View Case Studies
          </button>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default DevHero;