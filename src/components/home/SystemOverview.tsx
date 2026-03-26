import React from 'react';
import { 
  Lock, 
  Search, 
  Briefcase, 
  MessageSquare, 
  CreditCard, 
  Zap, 
  LayoutDashboard, 
  ShieldCheck 
} from 'lucide-react';

const modules = [
  { title: "Auth Engine", icon: <Lock />, desc: "Secure RBAC & Social integration." },
  { title: "Service Explorer", icon: <Search />, desc: "Advanced filtering & discovery." },
  { title: "Project Core", icon: <Briefcase />, desc: "End-to-end task management." },
  { title: "Unity Comms", icon: <MessageSquare />, desc: "Real-time team-client chat." },
  { title: "Secure Pay", icon: <CreditCard />, desc: "Automated invoicing & escrow." },
  { title: "AI Neural Hub", icon: <Zap />, desc: "Intelligent workflow automation." },
  { title: "Smart Dash", icon: <LayoutDashboard />, desc: "Role-specific data visualization." },
  { title: "Admin Shield", icon: <ShieldCheck />, desc: "Complete ecosystem governance." },
];

export default function SystemOverview() {
  return (
    <section id="system" className="py-24 px-6 max-w-7xl mx-auto relative">
      {/* Section Header */}
      <div className="flex flex-col items-center text-center mb-16">
        <h2 className="text-sm font-black uppercase tracking-[0.3em] text-indigo-500 mb-4">
          The Architecture
        </h2>
        <h3 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6">
          A Scalable <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600">Digital Ecosystem</span>
        </h3>
        <p className="max-w-2xl text-slate-600 dark:text-indigo-200/60 text-lg leading-relaxed">
          REWEB integrates marketplace dynamics with professional project management 
          to deliver a seamless service experience from request to final delivery.
        </p>
      </div>

      {/* Module Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {modules.map((module, idx) => (
          <div 
            key={idx}
            className="group relative p-6 rounded-2xl bg-white/30 dark:bg-indigo-950/20 backdrop-blur-md border border-indigo-100/50 dark:border-indigo-800/50 hover:border-indigo-500 transition-all duration-300 overflow-hidden"
          >
            {/* Background Accent */}
            <div className="absolute -right-4 -bottom-4 text-indigo-500/5 group-hover:text-indigo-500/10 transition-colors transform group-hover:scale-150 duration-700">
               {React.cloneElement(module.icon as React.ReactElement<{ size: number }>, { size: 80 })}
            </div>

            <div className="relative z-10">
              <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-indigo-600 text-white mb-4 shadow-lg shadow-indigo-500/20 group-hover:rotate-12 transition-transform">
                {module.icon}
              </div>
              <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                {module.title}
              </h4>
              <p className="text-sm text-slate-500 dark:text-indigo-200/50 font-medium">
                {module.desc}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Decorative "Nature" Indicator */}
      <div className="mt-12 flex flex-wrap justify-center gap-8 opacity-50">
         <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-tighter italic">
           <div className="w-1.5 h-1.5 rounded-full bg-indigo-500" /> Fully Responsive
         </span>
         <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-tighter italic">
           <div className="w-1.5 h-1.5 rounded-full bg-purple-500" /> Mode Sensitive
         </span>
         <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-tighter italic">
           <div className="w-1.5 h-1.5 rounded-full bg-pink-500" /> Clean Architecture
         </span>
      </div>
    </section>
  );
}