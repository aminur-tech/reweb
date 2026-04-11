"use client";

import React from 'react';
import { 
  Search, BarChart4, FileText, Share2, Filter, 
  ExternalLink, TrendingUp, Award, BookOpen, Clock,
  Loader, ArrowRight, Zap, ShieldCheck, X
} from 'lucide-react';
import { toast } from 'sonner';
import { api } from '@/lib/api';

const researchPapers = [
  {
    title: "AI Impact on Modern SaaS Architecture: A Performance Benchmarking Analysis",
    author: "Dr. Aris Thorne",
    category: "Technical Research",
    date: "March 2026",
    doi: "10.1038/s41586-024",
    status: "Peer-Reviewed",
    abstract: "This study provides a deep dive into how neural integration affects server-side rendering (SSR) and total blocking time (TBT) in high-traffic Next.js environments.",
    tags: ["AI", "Performance", "Next.js"],
    stats: { reads: "1.2k", citations: "45", downloads: "340" }
  },
  {
    title: "Market Transition: Theoretical R&D to Agile Production Pipelines",
    author: "Elena Vance",
    category: "Business Strategy",
    date: "Feb 2026",
    doi: "10.1145/3313831",
    status: "Whitepaper",
    abstract: "Analyzing the friction points when moving from theoretical research to web deployment, focusing on budget allocation and team synergy.",
    tags: ["Strategy", "Scalability", "Workflow"],
    stats: { reads: "890", citations: "12", downloads: "115" }
  }
];

export default function ResearchPage() {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [formData, setFormData] = React.useState({ name: '', email: '', message: '', service: 'General Research Inquiry' });
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  // Function to handle opening contact modal
  const openContact = (serviceName?: string) => {
    setFormData(prev => ({ ...prev, service: serviceName || 'General Research Inquiry' }));
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await api.post("/api/v1/contact/send-email", formData);
      toast.success("Message sent successfully.");
      setIsModalOpen(false);
      setFormData({ name: '', email: '', message: '', service: 'General Research Inquiry' });
    } catch {
      toast.error("Uplink failure.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#fbfcfe] dark:bg-[#030711] pt-24 pb-20 px-6">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12">
        
        {/* LEFT COLUMN: Main Feed */}
        <div className="flex-1 space-y-12">
          
          {/* Advanced Header */}
          <div className="border-b border-indigo-100/50 dark:border-indigo-900/20 pb-10">
            <div className="flex items-center gap-2 text-purple-600 dark:text-purple-400 font-black text-xs uppercase tracking-widest mb-4">
              <BookOpen size={14} /> Open Access Repository
            </div>
            <h1 className="text-5xl font-black text-slate-900 dark:text-white mb-6">
              Scientific <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600">Publications</span>
            </h1>
            
            <div className="flex flex-wrap gap-4 items-center">
              <div className="relative flex-1 min-w-[300px]">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input 
                  type="text" 
                  placeholder="Filter by title, DOI, or keyword..." 
                  className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white dark:bg-indigo-950/20 border border-indigo-100 dark:border-indigo-900/40 outline-none focus:ring-2 ring-purple-500/20 transition-all text-sm text-slate-900 dark:text-white"
                />
              </div>
              <button className="flex items-center gap-2 px-5 py-4 rounded-2xl bg-white dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900/40 font-bold text-xs uppercase tracking-wider text-slate-900 dark:text-white">
                <Filter size={16} /> Advanced Filters
              </button>
            </div>
          </div>

          {/* Research List */}
          <div className="space-y-6">
            {researchPapers.map((paper, idx) => (
              <div key={idx} className="group p-8 rounded-[2.5rem] bg-white/40 dark:bg-white/5 border border-indigo-100/50 dark:border-indigo-900/20 backdrop-blur-xl transition-all hover:bg-white/60 dark:hover:bg-indigo-900/10">
                <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-6">
                  <div className="flex items-center gap-3">
                    <span className="px-3 py-1 rounded-md bg-purple-500 text-white text-[10px] font-black uppercase">
                      {paper.status}
                    </span>
                    <span className="text-xs font-mono text-slate-400">DOI: {paper.doi}</span>
                  </div>
                  <div className="flex items-center gap-4 text-slate-400 text-xs font-bold">
                    <span className="flex items-center gap-1"><Clock size={14}/> {paper.date}</span>
                    <span className="flex items-center gap-1"><TrendingUp size={14}/> {paper.stats.reads} views</span>
                  </div>
                </div>

                <h3 className="text-2xl font-bold mb-2 text-slate-900 dark:text-white group-hover:text-purple-500 transition-colors">
                  {paper.title}
                </h3>
                <p className="text-sm font-bold text-indigo-600 dark:text-indigo-400 mb-4">
                  Lead Author: {paper.author}
                </p>
                <p className="text-sm text-slate-500 dark:text-indigo-200/60 mb-6 leading-relaxed line-clamp-2 italic">
                  &quot;{paper.abstract}&quot;
                </p>

                <div className="flex flex-wrap items-center justify-between gap-6 pt-6 border-t border-indigo-100/30">
                  <div className="flex gap-2">
                    {paper.tags.map(tag => (
                      <span key={tag} className="px-3 py-1 rounded-lg bg-slate-100 dark:bg-white/5 text-[10px] font-bold text-slate-500">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center gap-4">
                    <button className="p-2 text-slate-400 hover:text-indigo-500 transition-colors"><Share2 size={18}/></button>
                    <button className="px-6 py-2.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl text-xs font-black uppercase tracking-wider flex items-center gap-2">
                      Full Paper <ExternalLink size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT COLUMN: Sidebar */}
        <aside className="w-full lg:w-80 space-y-8">
          <div className="p-8 rounded-[2.5rem] bg-indigo-600 text-white shadow-xl shadow-indigo-500/20">
            <h4 className="font-black uppercase tracking-widest text-[10px] opacity-70 mb-6">Lab Performance</h4>
            <div className="space-y-6">
              <div>
                <div className="text-3xl font-black">128</div>
                <div className="text-xs opacity-70">Total Publications</div>
              </div>
              <div>
                <div className="text-3xl font-black">4.8k</div>
                <div className="text-xs opacity-70">Citations Gained</div>
              </div>
              <div>
                <div className="text-3xl font-black">12</div>
                <div className="text-xs opacity-70">Active Researches</div>
              </div>
            </div>
          </div>

          <div className="p-8 rounded-[2.5rem] bg-white/40 dark:bg-white/5 border border-indigo-100/50 dark:border-indigo-900/20">
            <h4 className="font-black uppercase tracking-widest text-[10px] text-slate-400 mb-6 flex items-center gap-2">
              <Award size={14}/> Top Investigators
            </h4>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500" />
                <div>
                  <div className="text-xs font-bold text-slate-900 dark:text-white">Dr. Aris Thorne</div>
                  <div className="text-[10px] text-slate-500 italic">Neural Architectures</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-pink-500 to-rose-500" />
                <div>
                  <div className="text-xs font-bold text-slate-900 dark:text-white">Elena Vance</div>
                  <div className="text-[10px] text-slate-500 italic">Market Strategies</div>
                </div>
              </div>
            </div>
          </div>
        </aside>
      </div>

      {/* Footer / CTA Section */}
      <div className="max-w-7xl mx-auto mt-24 pt-12 border-t border-slate-200 dark:border-slate-800 flex flex-wrap justify-between items-center gap-6">
        <div className="flex gap-4 flex-wrap">
          <span className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-500">
            <ShieldCheck size={14} className="text-violet-500" /> Protocol: Encrypted
          </span>
          <span className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-500">
            <Zap size={14} className="text-cyan-500" /> Speed: Optimized
          </span>
        </div>

        <button
          onClick={() => openContact()}
          className="px-8 py-4 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] bg-slate-900 text-white hover:bg-violet-600 dark:bg-white dark:text-slate-900 dark:hover:bg-violet-500 dark:hover:text-white transition-all shadow-xl shadow-black/10 active:scale-95"
        >
          Initiate Contact
        </button>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm" onClick={() => setIsModalOpen(false)} />

          <div className="relative w-full max-w-xl p-10 rounded-[2.5rem] border bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-3xl">
            <button onClick={() => setIsModalOpen(false)} className="absolute top-8 right-8 text-slate-400 hover:text-violet-500 transition-colors">
              <X size={24} />
            </button>

            <h2 className="text-3xl font-black mb-1 text-slate-900 dark:text-white uppercase tracking-tighter">Connect</h2>
            <p className="text-xs font-mono text-violet-500 mb-8 tracking-[0.3em] uppercase">{formData.service}</p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                required
                placeholder="Identified Name"
                value={formData.name}
                className="w-full p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:border-violet-500 focus:outline-none transition-colors text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-600"
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
              <input
                required
                type="email"
                placeholder="Digital Address (Email)"
                value={formData.email}
                className="w-full p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:border-violet-500 focus:outline-none transition-colors text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-600"
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
              <textarea
                required
                rows={4}
                placeholder="Brief project mission details..."
                value={formData.message}
                className="w-full p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:border-violet-500 focus:outline-none transition-colors text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-600"
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              />

              <button 
                disabled={isSubmitting}
                className="w-full py-5 bg-violet-600 hover:bg-violet-500 text-white rounded-xl flex justify-center items-center gap-3 text-xs font-bold uppercase tracking-widest transition shadow-lg shadow-violet-600/20 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? <Loader className="animate-spin" size={18} /> : <>Transmit Request <ArrowRight size={16} /></>}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}