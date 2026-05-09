import React from 'react';
import Link from 'next/link';
import { MousePointer2, Microscope, ArrowUpRight, ChevronRight } from 'lucide-react';

const services = [
  {
    title: "Web Development",
    description: "Crafting high-performance, scalable web applications with modern architectures. We focus on clean code, responsive design, and seamless user experiences using the latest tech stacks.",
    icon: <MousePointer2 className="w-6 h-6" />,
    tags: ["Full-Stack", "Next.js", "E-commerce", "SaaS"],
    href: "/development" 
  },
  {
    title: "Technical Research",
    description: "Deep-dive analysis and data-driven insights to power your digital strategy. We bridge the gap between complex technical requirements and actionable business solutions.",
    icon: <Microscope className="w-6 h-6" />,
    tags: ["Data Analysis", "Market Research", "Case Studies", "Feasibility"],
    href: "/research" 
  }
];

const Services = () => {
  return (
    <section className="py-24 px-6 bg-[#fbfcfe] dark:bg-[#030711] transition-colors duration-300">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="mb-16 text-center md:text-left">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4 italic tracking-tight">
            Our Services
          </h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl text-lg">
            We combine engineering excellence with rigorous research to build 
            digital products that stand the test of time.
          </p>
        </div>

        {/* Bento-style Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <div 
              key={index}
              className="group relative p-8 rounded-[2.5rem] border border-slate-200/60 dark:border-white/5 
                         bg-white/80 dark:bg-white/[0.02] backdrop-blur-xl
                         hover:border-indigo-500/50 dark:hover:border-indigo-500/30
                         hover:shadow-2xl hover:shadow-indigo-500/10
                         transition-all duration-500 overflow-hidden flex flex-col justify-between"
            >
              {/* Animated Mesh Gradient Accent */}
              <div className="absolute -right-16 -top-16 w-48 h-48 bg-gradient-to-br from-purple-600/20 to-indigo-600/20 blur-[60px] rounded-full group-hover:scale-125 transition-transform duration-700" />

              <div className="relative z-10">
                {/* Icon Container with subtle glass effect */}
                <div className="w-14 h-14 flex items-center justify-center rounded-2xl 
                                bg-white dark:bg-white/5 shadow-sm border border-slate-100 dark:border-white/10
                                text-indigo-600 dark:text-indigo-400 mb-8 group-hover:scale-110 transition-transform duration-500">
                  {service.icon}
                </div>

                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 flex items-center group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  {service.title}
                  <ArrowUpRight className="ml-2 w-5 h-5 opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
                </h3>

                <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-8">
                  {service.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-12">
                  {service.tags.map((tag, i) => (
                    <span 
                      key={i} 
                      className="px-3 py-1.5 text-[10px] uppercase tracking-widest font-bold rounded-lg 
                                 bg-slate-100/50 dark:bg-white/[0.03] text-slate-500 dark:text-slate-500 
                                 border border-slate-200/50 dark:border-white/5"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Navigation Button */}
              <div className="relative z-10">
                <Link 
                  href={service.href}
                  className="inline-flex items-center justify-center gap-2 w-full py-4 px-6 rounded-2xl
                             bg-slate-950 dark:bg-white text-white dark:text-slate-950 font-bold
                             hover:bg-indigo-600 dark:hover:bg-indigo-500 hover:text-white dark:hover:text-white
                             transition-all duration-300 group/btn shadow-lg shadow-indigo-500/5"
                >
                  View Details
                  <ChevronRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;