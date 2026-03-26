"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  ExternalLink,
  Loader2,
  Layout,
  Database,
  ArrowRight,
  Globe,
  Code2
} from "lucide-react";
import Link from "next/link";

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
}

const DevProjects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  const PAGE_CATEGORY = "Web Development";
  const API_URL = "http://localhost:5000/api/v1/projects";

  useEffect(() => {
    const fetchDevProjects = async () => {
      try {
        const { data } = await axios.get(API_URL);
        if (data.success) {
          const filtered = data.data.filter(
            (p: Project) => p.category === PAGE_CATEGORY
          );
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
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="animate-spin text-indigo-500" size={40} />
      </div>
    );

  return (
    <section className="py-20 max-w-7xl mx-auto px-6">
      {/* Header Section */}
      <div className="mb-16 text-center">
        <h2 className="text-5xl font-black dark:text-white mb-4 tracking-tight">
          Development <span className="text-indigo-600">Portfolio</span>
        </h2>
        <p className="text-slate-500 max-w-2xl mx-auto text-lg">
          A collection of high-performance web applications built with the MERN stack and modern cloud architecture.
        </p>
      </div>

      {projects.length === 0 ? (
        <div className="text-center py-20 border-2 border-dashed rounded-[3rem] border-slate-200 dark:border-slate-800">
          <Code2 size={48} className="mx-auto text-slate-300 mb-4" />
          <p className="text-slate-400">No projects uploaded in this category yet.</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {projects.map((project) => (
            <div
              key={project._id}
              className="group relative bg-white dark:bg-slate-900 border dark:border-slate-800 rounded-[2.5rem] overflow-hidden hover:border-indigo-500/50 transition-all duration-500 shadow-sm hover:shadow-2xl flex flex-col"
            >
              {/* --- IMAGE PREVIEW (MICROLINK FREE) --- */}
              <div className="relative h-60 w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
                <img
                  src={
                    project.image || 
                    `https://api.microlink.io/?url=${encodeURIComponent(project.liveLink)}&screenshot=true&meta=false&embed=screenshot.url`
                  }
                  alt={project.title}
                  className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-700 ease-in-out"
                  loading="lazy"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1200&auto=format&fit=crop";
                  }}
                />
                
                {/* Tech Badges on Image */}
                <div className="absolute bottom-4 left-4 flex gap-2">
                   <span className="px-3 py-1 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md text-[10px] font-black uppercase rounded-full shadow-sm text-indigo-600">
                     {project.category}
                   </span>
                </div>

                {/* Hover Overlay Icon */}
                <div className="absolute inset-0 bg-indigo-900/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[3px]">
                   <Globe className="text-white animate-bounce" size={32} />
                </div>
              </div>

              {/* --- CARD CONTENT --- */}
              <div className="p-8 flex flex-col justify-between flex-1">
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-2xl font-bold dark:text-white group-hover:text-indigo-500 transition-colors leading-tight">
                      {project.title}
                    </h3>
                    <div className="flex gap-3 text-slate-400">
                      {project.frontendRepo && (
                        <a href={project.frontendRepo} target="_blank" className="hover:text-indigo-500 transition-transform hover:-translate-y-1">
                          <Layout size={20} />
                        </a>
                      )}
                      {project.backendRepo && (
                        <a href={project.backendRepo} target="_blank" className="hover:text-indigo-500 transition-transform hover:-translate-y-1">
                          <Database size={20} />
                        </a>
                      )}
                    </div>
                  </div>

                  <p className="text-slate-500 text-sm line-clamp-3 mb-8 leading-relaxed">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-8">
                    {project.technologies?.slice(0, 4).map((tech, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-[10px] font-bold rounded-lg"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* --- FOOTER ACTIONS --- */}
                <div className="flex items-center gap-4 pt-6 border-t dark:border-slate-800">
                  <Link
                    href={`/development/${project._id}`}
                    className="flex-1 flex items-center justify-center gap-2 px-6 py-3.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-2xl text-xs font-black hover:bg-indigo-600 hover:text-white dark:hover:bg-indigo-600 dark:hover:text-white transition-all duration-300 active:scale-95"
                  >
                    DETAILS <ArrowRight size={14} />
                  </Link>

                  {project.liveLink && (
                    <a
                      href={project.liveLink}
                      target="_blank"
                      className="p-3.5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-2xl hover:bg-indigo-50 dark:hover:bg-indigo-500/20 hover:text-indigo-600 transition-all duration-300"
                    >
                      <ExternalLink size={20} />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default DevProjects;