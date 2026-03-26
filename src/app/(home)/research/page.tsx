import React from 'react';
import { 
  Search, Microscope, BarChart4, FileText, Share2, Filter, 
  ExternalLink, TrendingUp, Award, BookOpen, Clock
} from 'lucide-react';

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
                  className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white dark:bg-indigo-950/20 border border-indigo-100 dark:border-indigo-900/40 outline-none focus:ring-2 ring-purple-500/20 transition-all text-sm"
                />
              </div>
              <button className="flex items-center gap-2 px-5 py-4 rounded-2xl bg-white dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900/40 font-bold text-xs uppercase tracking-wider">
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

        {/* RIGHT COLUMN: Sidebar (Huge Info) */}
        <aside className="w-full lg:w-80 space-y-8">
          {/* Lab Stats */}
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

          {/* Featured Researchers */}
          <div className="p-8 rounded-[2.5rem] bg-white/40 dark:bg-white/5 border border-indigo-100/50 dark:border-indigo-900/20">
            <h4 className="font-black uppercase tracking-widest text-[10px] text-slate-400 mb-6 flex items-center gap-2">
              <Award size={14}/> Top Investigators
            </h4>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500" />
                <div>
                  <div className="text-xs font-bold">Dr. Aris Thorne</div>
                  <div className="text-[10px] text-slate-500 italic">Neural Architectures</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-pink-500 to-rose-500" />
                <div>
                  <div className="text-xs font-bold">Elena Vance</div>
                  <div className="text-[10px] text-slate-500 italic">Market Strategies</div>
                </div>
              </div>
            </div>
          </div>
        </aside>

      </div>
    </div>
  );
}