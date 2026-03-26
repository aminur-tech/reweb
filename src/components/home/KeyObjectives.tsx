import React from 'react';
import { Network, Users, LayoutPanelLeft, Cpu } from 'lucide-react';

const objectives = [
  {
    title: "Digitize Workflows",
    desc: "Transforming traditional R&D into a fluid, digital-first experience.",
    icon: <Network className="w-7 h-7" />,
    color: "from-blue-500 to-indigo-500",
  },
  {
    title: "Real-time Synergy",
    desc: "Enabling instantaneous collaboration between clients and talent.",
    icon: <Users className="w-7 h-7" />,
    color: "from-indigo-500 to-purple-500",
  },
  {
    title: "Role-Based Clarity",
    desc: "Tailored dashboards designed for specific user responsibilities.",
    icon: <LayoutPanelLeft className="w-7 h-7" />,
    color: "from-purple-500 to-pink-500",
  },
  {
    title: "AI Integration",
    desc: "Augmenting human expertise with intelligent, AI-powered automation.",
    icon: <Cpu className="w-7 h-7" />,
    color: "from-pink-500 to-rose-500",
  },
];

export default function KeyObjectives() {
  return (
    <section id="objectives" className="py-24 px-6 relative">
      {/* Background Decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-1 bg-gradient-to-r from-transparent via-indigo-500/20 to-transparent hidden lg:block" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold tracking-tight mb-4">
            Our Core <span className="text-indigo-600 dark:text-indigo-400">Objectives</span>
          </h2>
          <p className="text-indigo-900/60 dark:text-indigo-200/50">Building the future of research and development, one milestone at a time.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {objectives.map((obj, idx) => (
            <div key={idx} className="group relative flex flex-col items-center text-center">
              {/* Icon Circle */}
              <div className={`relative mb-6 flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br ${obj.color} text-white shadow-xl shadow-indigo-500/20 group-hover:scale-110 transition-transform duration-500`}>
                {obj.icon}
                {/* Pulse Ring */}
                <div className="absolute inset-0 rounded-full bg-inherit animate-ping opacity-20 group-hover:opacity-40" />
              </div>

              {/* Text Content */}
              <div className="p-6 rounded-3xl bg-white/30 dark:bg-white/5 backdrop-blur-xl border border-white/40 dark:border-white/10 group-hover:border-indigo-500/30 transition-colors duration-300 shadow-sm">
                <h3 className="text-xl font-bold mb-3 text-indigo-950 dark:text-white">
                  {obj.title}
                </h3>
                <p className="text-sm leading-relaxed text-indigo-900/60 dark:text-indigo-200/60">
                  {obj.desc}
                </p>
              </div>
              
              {/* Connector for Mobile/Tablet */}
              {idx !== objectives.length - 1 && (
                <div className="w-px h-8 bg-indigo-500/20 lg:hidden mt-4" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}