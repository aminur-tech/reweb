"use client";
import React, { useEffect, useState } from "react";
import {
  Loader2,
  ArrowRight,
  Globe,
  Code2,
  Star,
  Layers
} from "lucide-react";
import Link from "next/link";
import { api } from "@/lib/api";

interface Project {
  _id: string;
  title: string;
  description: string;
  category: string;
  liveLink: string;
  frontendRepo: string;
  backendRepo: string;
  technologies: string[];
  image?: string;
  averageRating?: number;
}

const BrowserPreview = ({ project }: { project: Project }) => {
  const screenshotUrl = project.image || 
    `https://api.microlink.io/?url=${encodeURIComponent(project.liveLink)}&screenshot=true&meta=false&embed=screenshot.url`;

  return (
    // Reduced height from h-56 to h-44
    <div className="relative group/preview h-44 w-full p-2 bg-slate-50 dark:bg-[#0a0a0a]">
      <div className="relative h-full w-full rounded-lg border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm overflow-hidden transition-all duration-500 group-hover/preview:-translate-y-1 group-hover/preview:shadow-xl">
        
        {/* Browser Header - Slimmer */}
        <div className="flex items-center justify-between px-2 py-1 border-b border-slate-100 dark:border-zinc-800 bg-slate-50/50 dark:bg-zinc-800/50">
          <div className="flex gap-1">
            <div className="w-1.5 h-1.5 rounded-full bg-red-400/80" />
            <div className="w-1.5 h-1.5 rounded-full bg-amber-400/80" />
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400/80" />
          </div>
        </div>

        <div className="relative h-full w-full bg-slate-100 dark:bg-zinc-800">
          <img
            src={screenshotUrl}
            alt={project.title}
            className="w-full h-full object-cover object-top transition-transform duration-700 group-hover/preview:scale-105"
            loading="lazy"
            onError={(e) => {
              (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1200";
            }}
          />
        </div>
      </div>
    </div>
  );
};

const DevProjects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  const PAGE_CATEGORY = "Web Development";

  useEffect(() => {
    const fetchDevProjects = async () => {
      try {
        const { data } = await api.get("/api/v1/projects");
        if (data.success) {
          const filtered = data.data.filter((p: Project) => p.category === PAGE_CATEGORY);
          setProjects(filtered);
        }
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDevProjects();
  }, []);

  if (loading)
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] gap-4 font-mono">
        <Loader2 className="animate-spin text-indigo-500" size={32} />
        <span className="text-[10px] uppercase tracking-widest text-slate-400">Loading...</span>
      </div>
    );

  return (
    <section className="py-16 bg-slate-50 dark:bg-[#050505] min-h-screen font-sans">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header - More Compact */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 px-2 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-[9px] font-black tracking-widest border border-indigo-100 dark:border-indigo-500/20 uppercase mb-4">
            <Layers size={10} /> Systems_Directory
          </div>
          <h2 className="text-4xl font-black dark:text-white mb-3 tracking-tighter">
            Web <span className="text-indigo-600">Architecture.</span>
          </h2>
          <p className="text-slate-500 dark:text-zinc-400 max-w-xl text-sm leading-relaxed">
            High-performance applications built with scalable infrastructure.
          </p>
        </div>

        {projects.length === 0 ? (
          <div className="text-center py-20 border-2 border-dashed rounded-3xl border-slate-200 dark:border-zinc-900">
            <Code2 size={40} className="mx-auto text-slate-300 dark:text-zinc-800 mb-4" />
            <p className="text-slate-400 font-mono text-xs">No_Data_Found</p>
          </div>
        ) : (
          // Changed lg:grid-cols-3 to lg:grid-cols-4 for smaller cards
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {projects.map((project) => (
              <div
                key={project._id}
                className="group flex flex-col bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-[1.5rem] overflow-hidden transition-all duration-300 hover:border-indigo-500/40"
              >
                <BrowserPreview project={project} />

                {/* Reduced padding from p-8 to p-5 */}
                <div className="p-5 flex flex-col flex-1">
                  <div className="flex justify-between items-start mb-2">
                    {/* Reduced font size from text-2xl to text-lg */}
                    <h3 className="text-lg font-bold dark:text-white tracking-tight leading-tight">
                      {project.title}
                    </h3>
                    <div className="flex items-center gap-0.5 text-amber-500 font-mono text-[10px] font-bold">
                      <Star size={12} fill="currentColor" /> {project.averageRating || "0.0"}
                    </div>
                  </div>

                  {/* Reduced text-sm to text-xs */}
                  <p className="text-slate-500 dark:text-zinc-400 text-xs line-clamp-2 mb-4 leading-relaxed">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {project.technologies?.slice(0, 2).map((tech, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 bg-slate-100 dark:bg-zinc-800/50 text-slate-600 dark:text-zinc-300 text-[9px] font-bold rounded-md border border-slate-200/50 dark:border-zinc-700/50"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Action Footer - Compact */}
                  <div className="mt-auto flex items-center gap-2 pt-4 border-t border-slate-100 dark:border-zinc-800">
                    <Link
                      href={`/development/${project._id}`}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-indigo-600 hover:text-white dark:hover:bg-indigo-500 dark:hover:text-white transition-all active:scale-95"
                    >
                      Analyze <ArrowRight size={12} />
                    </Link>

                    <a
                      href={project.liveLink}
                      target="_blank"
                      className="p-2.5 bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 rounded-xl hover:bg-indigo-600 hover:text-white transition-all"
                    >
                      <Globe size={16} />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default DevProjects;