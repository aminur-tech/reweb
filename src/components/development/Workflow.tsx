"use client";
import React from "react";
import { motion } from "framer-motion";
import { 
  ClipboardCheck, 
  Layers, 
  Code2, 
  ShieldCheck, 
  Rocket 
} from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Requirement Analysis",
    description: "Deep dive into your goals, target audience, and project constraints to build a solid foundation.",
    icon: <ClipboardCheck size={24} />,
  },
  {
    number: "02",
    title: "Planning & Architecture",
    description: "Mapping out the technical stack, database schema, and user flow for maximum scalability.",
    icon: <Layers size={24} />,
  },
  {
    number: "03",
    title: "Design & Development",
    description: "Turning wireframes into interactive reality using modern frontend and backend technologies.",
    icon: <Code2 size={24} />,
  },
  {
    number: "04",
    title: "Testing & QA",
    description: "Rigorous performance audits, security testing, and bug squashing to ensure a flawless launch.",
    icon: <ShieldCheck size={24} />,
  },
  {
    number: "05",
    title: "Deployment & Maintenance",
    description: "Going live with optimized hosting and providing ongoing updates to keep your app ahead.",
    icon: <Rocket size={24} />,
  },
];

const Workflow = () => {
  return (
    <section className="py-24 max-w-5xl mx-auto px-6">
      <div className="text-center mb-20">
        <motion.span 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-indigo-500 font-bold tracking-widest uppercase text-sm"
        >
          Strategy
        </motion.span>
        <motion.h2 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-5xl font-black text-slate-900 dark:text-white mt-3"
        >
          Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">Workflow</span>
        </motion.h2>
        <p className="text-slate-500 dark:text-slate-400 mt-4 max-w-xl mx-auto font-medium">
          A systematic approach to turning complex ideas into high-performance digital products.
        </p>
      </div>

      <div className="relative">
        {/* Vertical Line for Desktop */}
        <div className="hidden md:block absolute left-[50%] top-0 bottom-0 w-0.5 bg-slate-100 dark:bg-slate-800" />

        <div className="space-y-12 md:space-y-0">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`relative flex flex-col md:flex-row items-center justify-between md:mb-24 last:mb-0 ${
                index % 2 === 0 ? "md:flex-row-reverse" : ""
              }`}
            >
              {/* Content Box */}
              <div className="w-full md:w-[45%]">
                <div className="p-8 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[2.5rem] shadow-sm hover:shadow-xl transition-shadow group">
                  <div className="flex items-center gap-4 mb-4">
                    <span className="text-4xl font-black text-slate-100 dark:text-slate-800 group-hover:text-indigo-500/20 transition-colors">
                      {step.number}
                    </span>
                    <h3 className="text-2xl font-bold dark:text-white">{step.title}</h3>
                  </div>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>

              {/* Icon / Center Node */}
              <div className="absolute left-[50%] translate-x-[-50%] hidden md:flex w-14 h-14 bg-white dark:bg-slate-900 border-4 border-slate-50 dark:border-slate-950 rounded-2xl items-center justify-center z-10 shadow-lg">
                <div className="text-indigo-500">
                  {step.icon}
                </div>
              </div>

              {/* Spacer for Desktop */}
              <div className="hidden md:block w-[45%]" />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Final CTA Visual */}
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        className="mt-20 p-1 text-center"
      >
        <div className="inline-block px-8 py-4 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-3xl text-white font-bold shadow-2xl shadow-purple-500/20">
          Ready to start your journey?
        </div>
      </motion.div>
    </section>
  );
};

export default Workflow;