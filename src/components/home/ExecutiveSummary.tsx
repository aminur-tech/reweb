import React from 'react';
import { LayoutDashboard, Zap, ShieldCheck, Cpu } from 'lucide-react';

const features = [
  {
    title: "Centralized Management",
    description: "A unified system to manage research workflows and web development sprints in one place.",
    icon: <LayoutDashboard className="w-6 h-6 text-indigo-500" />,
  },
  {
    title: "Operational Efficiency",
    description: "Automated task assignment and progress tracking to reduce delivery overhead by 40%.",
    icon: <Zap className="w-6 h-6 text-purple-500" />,
  },
  {
    title: "Transparent Synergy",
    description: "Real-time collaboration tools that ensure clients and developers stay perfectly aligned.",
    icon: <ShieldCheck className="w-6 h-6 text-pink-500" />,
  },
  {
    title: "AI-Driven Insights",
    description: "Intelligent automation and AI-powered research summarization for faster decision making.",
    icon: <Cpu className="w-6 h-6 text-indigo-400" />,
  },
];

export default function ExecutiveSummary() {
  return (
    <section id="summary" className="py-24 px-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row items-end justify-between mb-12 gap-4">
        <div className="max-w-2xl">
          <h2 className="text-sm font-bold tracking-widest uppercase text-indigo-600 dark:text-indigo-400 mb-3">
            01. Executive Summary
          </h2>
          <h3 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6">
            A Scalable Digital Ecosystem for <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-600">
              High-Impact Delivery.
            </span>
          </h3>
          <p className="text-lg text-slate-600 dark:text-indigo-200/70">
            REWEB streamlines the friction between complex research requirements and 
            technical execution, providing a seamless bridge for client-team collaboration.
          </p>
        </div>
      </div>

      {/* Feature Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((feature, index) => (
          <div 
            key={index}
            className="group p-8 rounded-3xl bg-white/40 dark:bg-white/5 backdrop-blur-xl border border-white/20 dark:border-white/10 hover:border-indigo-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-indigo-500/10"
          >
            <div className="mb-5 p-3 w-fit rounded-2xl bg-white dark:bg-indigo-900/50 shadow-sm group-hover:scale-110 transition-transform">
              {feature.icon}
            </div>
            <h4 className="text-xl font-bold mb-3 text-slate-900 dark:text-white">
              {feature.title}
            </h4>
            <p className="text-sm leading-relaxed text-slate-600 dark:text-indigo-200/60">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}