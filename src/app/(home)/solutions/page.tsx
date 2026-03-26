import React from 'react';
import { Lightbulb, Rocket, BarChart, ShieldCheck, ArrowRight } from 'lucide-react';

const solutionBundles = [
  {
    title: "SaaS Launchpad",
    description: "Complete market research combined with a high-performance MVP development cycle.",
    features: ["Competitor Analysis", "UI/UX Framework", "Core Feature Dev", "Deployment Strategy"],
    icon: <Rocket className="w-6 h-6 text-indigo-500" />,
    tag: "Most Popular"
  },
  {
    title: "Enterprise Digital Shift",
    description: "Modernizing legacy systems with deep technical research and scalable architecture.",
    features: ["System Audits", "Data Migration Plan", "Cloud Integration", "Staff Training"],
    icon: <ShieldCheck className="w-6 h-6 text-purple-500" />,
    tag: "High Scale"
  },
  {
    title: "AI-Driven Insights",
    description: "Integrating custom neural networks into your existing business workflow.",
    features: ["Data Mining", "Model Selection", "API Integration", "Performance Monitoring"],
    icon: <Lightbulb className="w-6 h-6 text-pink-500" />,
    tag: "AI Powered"
  }
];

export default function Solutions() {
  return (
    <div className="py-20 px-6 max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="text-center mb-20">
        <h2 className="text-sm font-black uppercase tracking-[0.3em] text-indigo-500 mb-4">
          Expert Strategies
        </h2>
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          Tailored <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500">Industry Solutions</span>
        </h1>
        <p className="max-w-2xl mx-auto text-slate-600 dark:text-indigo-200/60 text-lg">
          We combine rigorous academic research with elite engineering to solve your most complex digital challenges.
        </p>
      </div>

      {/* Solutions Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {solutionBundles.map((sol, idx) => (
          <div key={idx} className="group relative p-8 rounded-[2.5rem] bg-white/40 dark:bg-white/5 border border-indigo-100/50 dark:border-indigo-900/20 backdrop-blur-xl hover:border-indigo-500 transition-all duration-500">
            {sol.tag && (
              <span className="absolute top-6 right-8 text-[10px] font-bold uppercase tracking-widest px-3 py-1 bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400 rounded-full">
                {sol.tag}
              </span>
            )}
            
            <div className="mb-6 p-4 w-fit rounded-2xl bg-white dark:bg-slate-900 shadow-xl group-hover:scale-110 transition-transform">
              {sol.icon}
            </div>

            <h3 className="text-2xl font-bold mb-4">{sol.title}</h3>
            <p className="text-slate-500 dark:text-indigo-200/50 mb-8 text-sm leading-relaxed">
              {sol.description}
            </p>

            <ul className="space-y-4 mb-10">
              {sol.features.map((feat, fidx) => (
                <li key={fidx} className="flex items-center gap-3 text-sm font-medium">
                  <div className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                  {feat}
                </li>
              ))}
            </ul>

            <button className="w-full py-4 rounded-2xl border border-indigo-200 dark:border-indigo-800 font-bold text-sm flex items-center justify-center gap-2 group-hover:bg-indigo-600 group-hover:text-white group-hover:border-transparent transition-all">
              Request Consultation <ArrowRight size={16} />
            </button>
          </div>
        ))}
      </div>

      {/* Trust Section */}
      <div className="mt-32 p-12 rounded-[3rem] bg-gradient-to-br from-indigo-600/10 to-purple-600/10 border border-white/20 text-center">
        <h2 className="text-3xl font-bold mb-4">Don&apos;t see a fit?</h2>
        <p className="text-slate-600 dark:text-indigo-200/60 mb-8">We offer custom-architected solutions for unique research-heavy requirements.</p>
        <button className="px-10 py-4 bg-indigo-600 text-white rounded-2xl font-bold shadow-xl shadow-indigo-500/20 hover:scale-105 transition-all">
          Build a Custom Solution
        </button>
      </div>
    </div>
  );
}