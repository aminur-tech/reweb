"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Microscope, Code2, Rocket, Globe } from 'lucide-react';

const stats = [
  {
    id: 1,
    label: 'Research Papers',
    value: '42+',
    icon: <Microscope className="text-white" size={24} />,
    description: 'Published analytical studies in modern web technologies.'
  },
  {
    id: 2,
    label: 'Enterprise Solutions',
    value: '120+',
    icon: <Code2 className="text-white" size={24} />,
    description: 'High-performance applications built with precision.'
  },
  {
    id: 3,
    label: 'Global Reach',
    value: '25',
    icon: <Globe className="text-white" size={24} />,
    description: 'Countries served with localized digital research.'
  },
  {
    id: 4,
    label: 'Launch Velocity',
    value: '98%',
    icon: <Rocket className="text-white" size={24} />,
    description: 'On-time delivery rate for complex R&D milestones.'
  },
];

const Achievements = () => {
  return (
    <section className="py-24 bg-slate-50 dark:bg-slate-950 transition-colors duration-300 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative">
        
        {/* Subtle Background Glow for Dark Mode */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-[120px] dark:block hidden" />

        {/* Header */}
        <div className="text-center mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-sm font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent uppercase tracking-[0.2em] mb-4"
          >
            Empirical Results
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight"
          >
            Advancing the Web through <br /> 
            <span className="text-slate-400 dark:text-slate-500 font-medium">Research & Development.</span>
          </motion.p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <motion.div 
              key={stat.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative p-8 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 backdrop-blur-xl transition-all hover:border-purple-500/50"
            >
              {/* Icon with Your Specified Gradient */}
              <div className="mb-6 inline-flex p-4 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 shadow-lg shadow-indigo-500/30 group-hover:rotate-6 transition-transform">
                {stat.icon}
              </div>

              <div className="text-4xl font-black text-slate-900 dark:text-white mb-2 tracking-tighter">
                {stat.value}
              </div>
              
              <div className="text-lg font-bold text-slate-800 dark:text-slate-200 mb-3">
                {stat.label}
              </div>
              
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
                {stat.description}
              </p>

              {/* Decorative Hover Gradient Bar */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-1 bg-gradient-to-r from-purple-600 to-indigo-600 transition-all duration-300 group-hover:w-1/2 rounded-t-full" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Achievements;