import React from 'react';
import { UserPlus, FileSearch, CheckCircle, CreditCard, ArrowRight } from 'lucide-react';

const steps = [
  {
    title: "Registration",
    desc: "Secure Auth & Role Assignment",
    icon: <UserPlus className="w-6 h-6" />,
    color: "bg-blue-500",
  },
  {
    title: "Project Request",
    desc: "Detail Submission & AI Review",
    icon: <FileSearch className="w-6 h-6" />,
    color: "bg-indigo-500",
  },
  {
    title: "Execution",
    desc: "Task Assignment & Milestones",
    icon: <CheckCircle className="w-6 h-6" />,
    color: "bg-purple-500",
  },
  {
    title: "Settlement",
    desc: "Final Delivery & Secure Payment",
    icon: <CreditCard className="w-6 h-6" />,
    color: "bg-pink-500",
  },
];

export default function WorkflowDiagrams() {
  return (
    <section id="workflow" className="py-24 px-6 max-w-7xl mx-auto overflow-hidden">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold tracking-tight mb-4">
          Operational <span className="text-indigo-600 dark:text-indigo-400">Workflows</span>
        </h2>
        <p className="text-indigo-900/60 dark:text-indigo-200/50">A seamless journey from concept to high-fidelity delivery.</p>
      </div>

      <div className="relative">
        {/* The Connection Line (Desktop) */}
        <div className="absolute top-1/2 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-20 hidden lg:block -translate-y-12" />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 relative z-10">
          {steps.map((step, idx) => (
            <div key={idx} className="group flex flex-col items-center">
              {/* Icon Step Circle */}
              <div className={`relative mb-8 flex items-center justify-center w-20 h-20 rounded-3xl ${step.color} text-white shadow-2xl shadow-indigo-500/20 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}>
                {step.icon}
                
                {/* Step Number Badge */}
                <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-white dark:bg-slate-900 border-2 border-indigo-500 flex items-center justify-center text-xs font-black text-indigo-600">
                  {idx + 1}
                </div>
              </div>

              {/* Card Content */}
              <div className="w-full p-6 rounded-3xl bg-white/40 dark:bg-white/5 backdrop-blur-xl border border-white/20 dark:border-white/10 text-center transition-all group-hover:bg-white/60 dark:group-hover:bg-white/10">
                <h3 className="text-xl font-bold text-indigo-950 dark:text-white mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-indigo-900/60 dark:text-indigo-200/60 leading-relaxed font-medium">
                  {step.desc}
                </p>
              </div>

              {/* Arrow for Mobile/Tablet */}
              {idx !== steps.length - 1 && (
                <div className="lg:hidden mt-8 text-indigo-400 animate-bounce">
                   <ArrowRight className="rotate-90 md:rotate-0" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}