"use client";
import Link from 'next/link';
import { MoveLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center px-4 bg-white dark:bg-slate-950 transition-colors duration-300">
      
      {/* Decorative Glow for Dark Mode */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-red-500/10 blur-[100px] dark:block hidden rounded-full" />

      {/* Editorial Typography with Red Accent */}
      <h1 className="text-[10rem] md:text-[13rem] font-black text-red-600/10 dark:text-red-500/5 tracking-tighter leading-none select-none absolute transition-colors">
        404
      </h1>
      
      <div className="relative z-10 space-y-4">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white tracking-tight transition-colors">
          Oops! Page not found.
        </h2>
        <p className="text-slate-500 dark:text-slate-400 max-w-sm mx-auto text-lg transition-colors">
          The link you followed might be broken, or the page may have been removed.
        </p>

        {/* Premium Red Action Button */}
        <div className="pt-6">
          <Link 
            href="/"
            className="inline-flex items-center gap-3 group px-10 py-4 bg-red-600 dark:bg-red-700 text-white rounded-full font-semibold transition-all hover:bg-red-700 dark:hover:bg-red-600 hover:shadow-[0_0_20px_rgba(220,38,38,0.3)] active:scale-95"
          >
            <MoveLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}