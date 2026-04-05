"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { motion, Variants } from 'framer-motion';
import { ArrowRight, Globe, Code, Cpu } from 'lucide-react';

export default function HeroSection() {
  const router = useRouter();
  const { data: session, status } = useSession();

  const handleGetStarted = () => {
    if (status === "authenticated") {
      router.push('/achievements');
    } else {
      router.push('/login');
    }
  };

  const handleExplore = () => {
    router.push('/services');
  };

  // Animation Variants
  const containerVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.8, ease: "easeOut", staggerChildren: 0.2 } 
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.section 
      id="hero"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="relative flex flex-col items-center justify-center text-center py-24 px-6 overflow-hidden"
    >
      
      {/* Top Badge */}
      <motion.div 
        variants={itemVariants}
        className="mb-8 flex items-center gap-2 px-4 py-1.5 rounded-full border border-indigo-200 dark:border-indigo-800 bg-white/30 dark:bg-indigo-950/30 backdrop-blur-md transition-all duration-300 hover:border-indigo-400"
      >
        <span className="flex h-2 w-2 rounded-full bg-indigo-500 animate-pulse" />
        <span className="text-sm font-medium text-indigo-700 dark:text-indigo-300">
          AI-Powered Digital Ecosystem Now Live
        </span>
      </motion.div>

      {/* Main Heading with Gradient Text */}
      <motion.h1 
        variants={itemVariants}
        className="max-w-5xl text-5xl md:text-7xl font-extrabold tracking-tight mb-6 leading-[1.1]"
      >
        Integrated Research & <br />
        <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
          Web Development
        </span>
      </motion.h1>

      {/* Subtext */}
      <motion.p 
        variants={itemVariants}
        className="max-w-2xl text-lg md:text-xl text-indigo-900/70 dark:text-indigo-200/70 mb-10 leading-relaxed"
      >
        Scale your ideas with a professional team of researchers and developers. 
        Streamlined project management meets intelligent automation.
      </motion.p>

      {/* CTA Buttons */}
      <motion.div 
        variants={itemVariants}
        className="flex flex-col sm:flex-row items-center gap-4"
      >
        <button 
          onClick={handleGetStarted}
          className="group relative px-8 py-4 bg-indigo-600 text-white rounded-2xl font-bold shadow-xl shadow-indigo-500/20 transition-all hover:bg-indigo-500 hover:scale-105 active:scale-95 flex items-center gap-2"
        >
          Get Started
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </button>
        
        <button 
          onClick={handleExplore}
          className="px-8 py-4 bg-white/10 dark:bg-white/5 backdrop-blur-xl border border-indigo-200 dark:border-white/10 text-indigo-900 dark:text-white rounded-2xl font-bold transition-all hover:bg-white/20 dark:hover:bg-white/10 hover:border-indigo-400"
        >
          Explore Services
        </button>
      </motion.div>

      {/* Feature Pills */}
      <motion.div 
        variants={itemVariants}
        className="mt-16 grid grid-cols-2 md:grid-cols-3 gap-6 opacity-60 grayscale hover:grayscale-0 transition-all duration-700"
      >
        <div className="flex items-center gap-2 font-semibold">
          <Globe className="w-5 h-5 text-indigo-500" /> Web Development
        </div>
        <div className="flex items-center gap-2 font-semibold">
          <Cpu className="w-5 h-5 text-purple-500" /> AI Integration
        </div>
        <div className="flex items-center gap-2 font-semibold hidden md:flex">
          <Code className="w-5 h-5 text-pink-500" /> Research Data
        </div>
      </motion.div>
    </motion.section>
  );
}