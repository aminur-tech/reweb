"use client";

import React, { useState } from "react";
import {
  Search, Code2, BarChart3, ShieldCheck, Zap, ArrowRight, CheckCircle2,
  Loader2, X
} from "lucide-react";
import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";


const solutions = [
  {
    id: "research",
    title: "Deep-Tech Research",
    description: "Systematic analysis of market trends and emerging technologies to ensure your platform stays ahead.",
    icon: <Search className="text-cyan-400" size={22} />,
    tags: ["Data Mining", "Feasibility"],
    probes: ["Market Analysis", "Competitor Audit", "Tech Stack ROI"],
    link: "/research"
  },
  {
    id: "dev",
    title: "Full-Stack Developer",
    description: "High-performance web applications built with the precision of a digital architect.",
    icon: <Code2 className="text-violet-400" size={22} />,
    tags: ["Next.js", "React.js", "TypeScript", "Node.js", "Tailwind CSS", "MongoDB", "Firebase", "Stripe", "Vercel"],
    probes: ["Custom SaaS", "E-commerce Engine", "API Ecosystem"],
    link: "/development"
  },
  {
    id: "seo",
    title: "Growth Engine",
    description: "Integrated optimization strategies bridging technical excellence and search visibility.",
    icon: <BarChart3 className="text-emerald-400" size={22} />,
    tags: ["Technical SEO", "Performance"],
    probes: ["Search Ranking", "Conversion Audit", "Speed Optimization"],
    link: "/seo"
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
  const router = useRouter();


  const openContactWithService = (serviceId: string) => {
    const service = solutions.find(s => s.id === serviceId);
    if (service) {
      setFormData({ ...formData, service: service.title });
      setIsModalOpen(true);
    }
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post("http://localhost:5000/api/v1/contact/send-email", formData);
      toast.success("Message sent successfully.");
      setIsModalOpen(false);
    } catch {
      toast.error("Uplink failure.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen bg-slate-50 dark:bg-[#030712] text-slate-900 dark:text-slate-100 transition-colors duration-500 overflow-hidden relative">

      {/* BACKGROUND DECORATION */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[500px] bg-violet-500/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 py-24 relative z-10">

        {/* HERO HEADER */}
        <div className="text-center mb-20 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-violet-500/20 bg-violet-500/5 text-violet-500 text-[10px] font-black uppercase tracking-[0.2em]">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-violet-500"></span>
            </span>
            System v4.0 Pro
          </div>

          <h1 className="text-5xl md:text-6xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-slate-900 to-slate-500 dark:from-white dark:to-slate-500">
            OUR <span className="text-violet-600">SERVICES</span>
          </h1>

          <p className="max-w-xl mx-auto text-sm md:text-base text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
            High-performance protocols designed for digital excellence.
            Select a module below to initiate integration.
          </p>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {solutions.map((item) => (
            <div
              key={item.id}
              onMouseEnter={() => setActiveMode(item.id)}
              onMouseLeave={() => setActiveMode(null)}
              className={`relative group p-4 rounded-2xl border transition-all duration-300 cursor-pointer ${activeMode === item.id
                  ? "bg-white dark:bg-slate-900 border-violet-500/40 shadow-xl shadow-violet-500/5 scale-[1.02]"
                  : "bg-white/50 dark:bg-slate-950 border-slate-200 dark:border-slate-800"
                }`}
            >
              {/* Decorative Glow */}
              <div className={`absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-violet-500/10 to-transparent blur-xl transition-opacity duration-500 ${activeMode === item.id ? "opacity-100" : "opacity-0"
                }`} />

              <div className="relative z-10">
                {/* HEADER: Icon and Title side-by-side */}
                <div className="flex items-center gap-3 mb-3">
                  <div className={`shrink-0 w-9 h-9 rounded-lg border flex items-center justify-center transition-all duration-300 ${activeMode === item.id
                      ? "bg-violet-600 border-violet-400 text-white shadow-md shadow-violet-600/20"
                      : "bg-slate-100 border-slate-200 dark:bg-slate-900 dark:border-slate-800 text-slate-600 dark:text-slate-400"
                    }`}>
                    {item.icon}
                  </div>

                  <h3 className="text-xs font-black tracking-tight leading-tight">
                    {item.title.toUpperCase()}
                  </h3>
                </div>

                {/* DESCRIPTION */}
                <p className={`text-[10px] leading-relaxed mb-4 line-clamp-2 transition-colors ${activeMode === item.id
                    ? "text-slate-600 dark:text-slate-300"
                    : "text-slate-500 dark:text-slate-500"
                  }`}>
                  {item.description}
                </p>

                {/* PROBES */}
                <div className="space-y-1.5 mb-4">
                  {item.probes.map((probe, i) => (
                    <div key={i} className="flex items-center gap-2 text-[8px] font-bold tracking-wider">
                      <CheckCircle2 size={10} className="text-violet-500 shrink-0" />
                      <span className="text-slate-600 dark:text-slate-400 uppercase truncate">
                        {probe}
                      </span>
                    </div>
                  ))}
                </div>

                {/* TAGS & BUTTON ROW */}
                <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2">
                  <div className="flex gap-1 overflow-hidden">
                    {item.tags.slice(0, 3).map((tag, i) => (
                      <span key={i} className="text-[7px] font-bold uppercase px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 whitespace-nowrap">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      router.push(item.link);
                    }}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-[8px] font-bold uppercase tracking-widest border border-slate-200 dark:border-slate-700 
                hover:bg-violet-600 hover:text-white transition-all duration-200"
                  >
                    Visit <ArrowRight size={10} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* FOOTER */}
        <div className="mt-24 pt-12 border-t border-slate-200 dark:border-slate-800 flex flex-wrap justify-between items-center gap-6">
          <div className="flex gap-4 flex-wrap">
            <span className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-500">
              <ShieldCheck size={14} className="text-violet-500" /> Protocol: Encrypted
            </span>
            <span className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-500">
              <Zap size={14} className="text-cyan-500" /> Speed: Optimized
            </span>
          </div>

          <button
            onClick={() => activeMode ? openContactWithService(activeMode) : setIsModalOpen(true)}
            className="px-8 py-4 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] bg-slate-900 text-white hover:bg-violet-600 dark:bg-white dark:text-slate-900 dark:hover:bg-violet-500 dark:hover:text-white transition-all shadow-xl shadow-black/10 active:scale-95"
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
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
              <input
                required
                type="email"
                placeholder="Digital Address (Email)"
                className="w-full p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:border-violet-500 focus:outline-none transition-colors text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-600"
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
              <textarea
                required
                rows={4}
                placeholder="Brief project mission details..."
                className="w-full p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:border-violet-500 focus:outline-none transition-colors text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-600"
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
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