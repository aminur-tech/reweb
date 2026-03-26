import React from 'react';
import { 
  Network, 
  Database, 
  Cpu, 
  Globe, 
  Zap, 
  RefreshCcw, 
  ShieldCheck 
} from 'lucide-react';

const ecosystemNodes = [
  { 
    title: "Data Intelligence", 
    desc: "Proprietary research translated into actionable code.", 
    icon: <Database className="w-5 h-5" />,
    pos: "top-[-10%] left-[10%]" 
  },
  { 
    title: "Neural Engine", 
    desc: "AI-driven automation managing project lifecycles.", 
    icon: <Cpu className="w-5 h-5" />,
    pos: "top-[15%] right-[-5%]" 
  },
  { 
    title: "Global Delivery", 
    desc: "Scalable infrastructure for international deployment.", 
    icon: <Globe className="w-5 h-5" />,
    pos: "bottom-[10%] left-[-5%]" 
  },
  { 
    title: "Security Shield", 
    desc: "Enterprise-grade encryption for all service data.", 
    icon: <ShieldCheck className="w-5 h-5" />,
    pos: "bottom-[-5%] right-[15%]" 
  }
];

const Ecosystem = () => {
  return (
    <section id="ecosystem" className="relative py-32 px-6 overflow-hidden bg-[#fbfcfe] dark:bg-[#030711]">
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        
        {/* Header Section */}
        <div className="text-center mb-24 z-10">
          <h2 className="text-sm font-black uppercase tracking-[0.4em] text-indigo-500 mb-6">
            The REWEB Architecture
          </h2>
          <h1 className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white mb-8">
            An Integrated <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500">
              Digital Ecosystem
            </span>
          </h1>
          <p className="max-w-2xl mx-auto text-slate-600 dark:text-indigo-200/50 text-lg font-medium">
            Where research-grade insights meet high-fidelity engineering in a 
            closed-loop system optimized for speed and reliability.
          </p>
        </div>

        {/* The Visual Map */}
        <div className="relative w-full max-w-4xl h-[500px] flex items-center justify-center">
          
          {/* Animated Background Rings */}
          <div className="absolute inset-0 flex items-center justify-center opacity-20">
            <div className="w-[300px] h-[300px] border border-indigo-500 rounded-full animate-ping duration-[4000ms]" />
            <div className="absolute w-[500px] h-[500px] border border-purple-500 rounded-full animate-pulse" />
          </div>

          {/* Central Hub */}
          <div className="relative z-20 group cursor-default">
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-[2.5rem] bg-gradient-to-tr from-indigo-600 to-purple-600 flex flex-col items-center justify-center text-white shadow-2xl shadow-indigo-500/40 rotate-12 group-hover:rotate-0 transition-transform duration-700">
              <Network size={48} className="-rotate-12 group-hover:rotate-0 transition-transform duration-700" />
              <span className="mt-2 text-[10px] font-black uppercase tracking-tighter">Core Hub</span>
            </div>
            
            {/* Pulsing Glow beneath hub */}
            <div className="absolute inset-0 bg-indigo-500/50 blur-[60px] rounded-full -z-10 animate-pulse" />
          </div>

          {/* Orbiting Nodes */}
          {ecosystemNodes.map((node, idx) => (
            <div 
              key={idx} 
              className={`absolute ${node.pos} w-64 p-6 rounded-3xl bg-white/60 dark:bg-white/5 backdrop-blur-xl border border-indigo-100/50 dark:border-indigo-900/30 hover:border-indigo-500 transition-all duration-500 group`}
            >
              <div className="flex items-center gap-4 mb-3">
                <div className="p-2 rounded-xl bg-indigo-500 text-white shadow-lg group-hover:scale-110 transition-transform">
                  {node.icon}
                </div>
                <h4 className="font-black text-sm text-slate-900 dark:text-white uppercase tracking-wider">
                  {node.title}
                </h4>
              </div>
              <p className="text-xs text-slate-500 dark:text-indigo-200/50 leading-relaxed">
                {node.desc}
              </p>
            </div>
          ))}

          {/* Connection Lines (Desktop Only via pseudo-elements or SVGs) */}
          <svg className="absolute inset-0 w-full h-full -z-10 pointer-events-none opacity-30">
            <line x1="20%" y1="10%" x2="50%" y2="50%" stroke="currentColor" className="text-indigo-500" strokeWidth="1" strokeDasharray="4 4" />
            <line x1="80%" y1="20%" x2="50%" y2="50%" stroke="currentColor" className="text-purple-500" strokeWidth="1" strokeDasharray="4 4" />
            <line x1="15%" y1="85%" x2="50%" y2="50%" stroke="currentColor" className="text-pink-500" strokeWidth="1" strokeDasharray="4 4" />
            <line x1="75%" y1="90%" x2="50%" y2="50%" stroke="currentColor" className="text-indigo-500" strokeWidth="1" strokeDasharray="4 4" />
          </svg>
        </div>

        {/* Feature Stats Row */}
        <div className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
          <Stat icon={<Zap />} val="99.9%" label="System Uptime" />
          <Stat icon={<RefreshCcw />} val="24/7" label="AI Monitoring" />
          <Stat icon={<Database />} val="500TB+" label="Research Data" />
          <Stat icon={<ShieldCheck />} val="L3" label="Security Protocol" />
        </div>
      </div>
    </section>
  );
};

const Stat = ({ icon, val, label }: { icon: React.ReactNode, val: string, label: string }) => (
  <div className="flex flex-col items-center">
    <div className="text-indigo-500 mb-2">{icon}</div>
    <div className="text-3xl font-black text-slate-900 dark:text-white">{val}</div>
    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">{label}</div>
  </div>
);

export default Ecosystem;