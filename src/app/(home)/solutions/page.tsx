"use client";

import React, { useState } from "react";
import {
  Search, Code2, BarChart3, ShieldCheck, Zap, ArrowRight, CheckCircle2,
  Loader2, X
} from "lucide-react";
import axios from "axios";
import { toast } from "sonner";

const solutions = [
  {
    id: "research",
    title: "Deep-Tech Research",
    description: "Systematic analysis of market trends and emerging technologies to ensure your platform stays ahead.",
    icon: <Search className="text-cyan-400" size={22} />,
    tags: ["Data Mining", "Feasibility"],
    probes: ["Market Analysis", "Competitor Audit", "Tech Stack ROI"]
  },
  {
    id: "dev",
    title: "Full-Stack Developer",
    description: "High-performance web applications built with the precision of a digital architect.",
    icon: <Code2 className="text-violet-400" size={22} />,
    tags: ["Next.js", "Scalable Architecture"],
    probes: ["Custom SaaS", "E-commerce Engine", "API Ecosystem"]
  },
  {
    id: "seo",
    title: "Growth Engine",
    description: "Integrated optimization strategies bridging technical excellence and search visibility.",
    icon: <BarChart3 className="text-emerald-400" size={22} />,
    tags: ["Technical SEO", "Performance"],
    probes: ["Search Ranking", "Conversion Audit", "Speed Optimization"]
  }
];

const Solutions = () => {
  const [activeMode, setActiveMode] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    service: "Web Development",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const openContactWithService = (id: string) => {
    const mapping: Record<string, string> = {
      dev: "Web Development",
      seo: "Reach & SEO",
      research: "Full Stack Solution",
    };
    setFormData(prev => ({ ...prev, service: mapping[id] || prev.service }));
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post("https://re-web-server.vercel.app/api/v1/contact/send-email", formData);
      toast.success("Message sent successfully.");
      setIsModalOpen(false);
    } catch {
      toast.error("Uplink failure.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen bg-slate-50 dark:bg-[#030712] text-slate-900 dark:text-slate-100 transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-6 py-24">

        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {solutions.map((item) => (
            <div
              key={item.id}
              onMouseEnter={() => setActiveMode(item.id)}
              onMouseLeave={() => setActiveMode(null)}
              onClick={() => openContactWithService(item.id)}
              className={`relative group p-8 rounded-[2rem] border transition-all duration-500 cursor-pointer ${
                activeMode === item.id
                  ? "bg-white dark:bg-slate-900 border-violet-500/50 shadow-2xl shadow-violet-500/10"
                  : "bg-white/50 dark:bg-slate-950 border-slate-200 dark:border-slate-800"
              }`}
            >
              <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-violet-500/10 to-transparent blur-2xl transition-opacity duration-500 ${
                activeMode === item.id ? "opacity-100" : "opacity-0"
              }`} />

              <div className="relative z-10">
                <div className={`mb-8 w-14 h-14 rounded-2xl border flex items-center justify-center transition-all duration-300 ${
                  activeMode === item.id
                    ? "bg-violet-600 border-violet-400 text-white shadow-lg shadow-violet-600/20"
                    : "bg-slate-100 border-slate-200 dark:bg-slate-900 dark:border-slate-800 text-slate-600 dark:text-slate-400"
                }`}>
                  {item.icon}
                </div>

                <h3 className="text-xl font-black mb-3 tracking-tight">
                  {item.title.toUpperCase()}
                </h3>

                <p className={`text-sm leading-relaxed mb-8 transition-colors ${
                  activeMode === item.id
                    ? "text-slate-600 dark:text-slate-300"
                    : "text-slate-500 dark:text-slate-500"
                }`}>
                  {item.description}
                </p>

                {/* PROBES: Static, always visible, no hover effect */}
                <div className="space-y-3 mb-10">
                  {item.probes.map((probe, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 text-[10px] font-bold tracking-widest"
                    >
                      <CheckCircle2 size={12} className="text-violet-500 shrink-0" />
                      <span className="text-slate-600 dark:text-slate-400 uppercase">
                        {probe}
                      </span>
                    </div>
                  ))}
                </div>

                {/* TAGS */}
                <div className="flex flex-wrap gap-2 pt-6 border-t border-slate-100 dark:border-slate-800">
                  {item.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="text-[9px] font-black uppercase tracking-tighter px-3 py-1 rounded-md border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50 text-slate-500 dark:text-slate-400"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* FOOTER */}
        <div className="mt-24 pt-12 border-t border-slate-200 dark:border-slate-800 flex flex-wrap justify-between items-center gap-6">
          <div className="flex gap-4 flex-wrap">
            <span className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-500">
              <ShieldCheck size={14} className="text-violet-500"/> Protocol: Encrypted
            </span>
            <span className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-500">
              <Zap size={14} className="text-cyan-500"/> Speed: Optimized
            </span>
          </div>

          <button
            onClick={() => activeMode ? openContactWithService(activeMode) : setIsModalOpen(true)}
            className="px-8 py-4 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] bg-slate-900 text-white hover:bg-violet-600 dark:bg-white dark:text-slate-900 dark:hover:bg-violet-500 dark:hover:text-white transition-all shadow-xl shadow-black/10"
          >
            Initiate Contact
          </button>
        </div>
      </div>

      {/* MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm" onClick={() => setIsModalOpen(false)} />

          <div className="relative w-full max-w-xl p-10 rounded-[2.5rem] border bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-3xl">
            <button onClick={() => setIsModalOpen(false)} className="absolute top-8 right-8 text-slate-400 hover:text-violet-500 transition-colors">
              <X size={24} />
            </button>

            <h2 className="text-3xl font-black mb-1 text-slate-900 dark:text-white">CONNECT</h2>
            <p className="text-xs font-mono text-violet-500 mb-8 tracking-[0.3em] uppercase">{formData.service}</p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                required
                placeholder="Identified Name"
                className="w-full p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:border-violet-500 focus:outline-none transition-colors text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-600"
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
              <input
                required
                type="email"
                placeholder="Digital Address (Email)"
                className="w-full p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:border-violet-500 focus:outline-none transition-colors text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-600"
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
              <textarea
                required
                rows={4}
                placeholder="Brief project mission details..."
                className="w-full p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:border-violet-500 focus:outline-none transition-colors text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-600"
                onChange={(e) => setFormData({...formData, message: e.target.value})}
              />

              <button className="w-full py-5 bg-violet-600 hover:bg-violet-500 text-white rounded-xl flex justify-center items-center gap-3 text-xs font-bold uppercase tracking-widest transition shadow-lg shadow-violet-600/20">
                {loading ? <Loader2 className="animate-spin" size={18} /> : <>Transmit Request <ArrowRight size={16} /></>}
              </button>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};

export default Solutions;