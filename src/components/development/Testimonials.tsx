"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion, Variants } from "framer-motion";
import { Quote, Star, Terminal, Activity } from "lucide-react";

interface Review {
  userName: string;
  comment: string;
  rating: number;
  email?: string;
}

interface Project {
  category: string;
  reviews: Review[];
  title: string;
}

const Testimonials = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const { data } = await axios.get("https://re-web-server.vercel.app/api/v1/projects");
        if (data.success) {
          const devReviews = data.data
            .filter((p: Project) => p.category === "Web Development")
            .flatMap((p: Project) => p.reviews);
          setReviews(devReviews);
        }
      } catch (error) {
        console.error("Error loading reviews:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchReviews();
  }, []);

  // Animation variants for the container
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  // Animation variants for individual cards
  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" as const },
    },
  };

  if (loading || reviews.length === 0) return null;

  return (
    <section className="py-24 bg-gray-50 dark:bg-gray-900 transition-colors duration-500 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col items-center text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-[10px] font-black tracking-widest uppercase border border-indigo-100 dark:border-indigo-500/20 mb-4">
            <Activity size={12} className="animate-pulse" /> Feedback_Pulse
          </div>
          <h2 className="text-4xl md:text-5xl font-black dark:text-white tracking-tighter">
            System <span className="text-indigo-600">Feedback.</span>
          </h2>
        </motion.div>

        {/* Testimonial Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {reviews.map((rev, i) => {
            // Get first letter of username
            const firstLetter = rev.userName?.charAt(0).toUpperCase() || "U";
            
            return (
              <motion.div 
                key={i} 
                variants={itemVariants}
                whileHover={{ y: -5 }}
                className="relative group p-8 bg-white dark:bg-zinc-900/50 border border-gray-200 dark:border-zinc-800 rounded-[2rem] hover:border-indigo-500/40 transition-all duration-300 shadow-sm hover:shadow-xl"
              >
                {/* Decorative Quote Icon */}
                <Quote className="absolute top-6 right-8 text-gray-100 dark:text-zinc-800 group-hover:text-indigo-500/10 transition-colors" size={48} />

                <div className="relative z-10">
                  {/* Rating Stars */}
                  <div className="flex gap-1 mb-5">
                    {[...Array(5)].map((_, idx) => (
                      <Star 
                        key={idx} 
                        size={14} 
                        className={`${idx < rev.rating ? "text-amber-500 fill-amber-500" : "text-gray-200 dark:text-zinc-700"}`} 
                      />
                    ))}
                  </div>

                  {/* Comment */}
                  <p className="text-gray-600 dark:text-zinc-400 text-sm leading-relaxed mb-8 italic font-medium">
                    &quot;{rev.comment}&quot;
                  </p>

                  {/* User Info */}
                  <div className="flex items-center gap-3 pt-6 border-t border-gray-100 dark:border-zinc-800">
                    {/* Dynamic Avatar (First Letter) */}
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-lg font-black shadow-lg shadow-indigo-500/20 group-hover:scale-110 transition-transform duration-300">
                      {firstLetter}
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-bold dark:text-white mb-0.5">
                        {rev.userName}
                      </h4>
                      <p className="flex items-center gap-1.5 text-[10px] font-mono text-indigo-500 dark:text-indigo-400 uppercase tracking-widest font-bold">
                        <Terminal size={10} /> Verified_Client
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Bottom Metrics Bar */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="mt-16 flex justify-center"
        >
          <div className="flex items-center gap-8 px-10 py-5 bg-gray-900 dark:bg-zinc-900 border border-zinc-800 rounded-3xl shadow-2xl">
             <div className="text-center">
                <p className="text-[9px] text-zinc-500 uppercase font-black tracking-[0.2em] mb-1">Reliability</p>
                <p className="text-xl font-black text-white font-mono">100%</p>
             </div>
             <div className="w-px h-10 bg-zinc-800" />
             <div className="text-center">
                <p className="text-[9px] text-zinc-500 uppercase font-black tracking-[0.2em] mb-1">Avg_Score</p>
                <p className="text-xl font-black text-indigo-400 font-mono">4.9/5</p>
             </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;