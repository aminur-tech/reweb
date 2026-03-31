"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSession, signIn } from "next-auth/react";
import { 
  Github, ExternalLink, Database, Star, Send, 
  ChevronLeft, Sparkles, Cpu, Maximize2, Terminal, 
  Layers, MessageSquare, Globe, ShieldAlert 
} from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import Link from "next/link";

interface Review {
  userName: string;
  rating: number;
  comment: string;
}

interface Project {
  _id: string;
  title: string;
  description: string;
  category: string;
  liveLink: string;
  frontendRepo: string;
  backendRepo?: string;
  technologies: string[];
  image?: string;
  averageRating?: number;
  reviews?: Review[];
}

export default function ProjectDetails() {
  const { id } = useParams();
  const router = useRouter();
  const { data: session } = useSession();

  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/v1/projects/${id}`);
        if (res.data.success) setProject(res.data.data);
      } catch (err) {
        toast.error("Failed to load project assets.");
      } finally {
        setLoading(false);
      }
    };
    fetchProject();
  }, [id]);

  const handleReviewSubmit = async () => {
    if (!session?.accessToken) return toast.error("Session missing. Please re-login.");
    if (rating === 0 || !comment.trim()) return toast.error("Rating and comment required.");

    setIsSubmitting(true);
    try {
      const res = await axios.post(
        `http://localhost:5000/api/v1/projects/${id}/review`,
        { rating, comment, userName: session.user?.name,image: session.user?.image},
        { headers: { Authorization: `Bearer ${session.accessToken}` } }
      );

      if (res.data.success) {
        setProject(res.data.data);
        setComment("");
        setRating(0);
        toast.success("Feedback transmitted successfully.");
      }
    } catch (err) {
      const msg = axios.isAxiosError(err) 
        ? err.response?.data?.message 
        : "Transmission interrupted.";
      toast.error(msg || "An unexpected error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#050505] flex items-center justify-center font-mono">
      <div className="text-indigo-600 dark:text-indigo-400 animate-pulse flex flex-col items-center gap-4">
        <Terminal size={32} />
        <span className="text-[10px] tracking-[0.3em] font-black uppercase">Initializing_System...</span>
      </div>
    </div>
  );

  if (!project) return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#050505] flex items-center justify-center font-mono">
      <div className="text-red-500 flex flex-col items-center gap-4">
        <ShieldAlert size={32} />
        <span className="text-[10px] tracking-[0.3em] font-black uppercase">Access_Denied: Project_Not_Found</span>
      </div>
    </div>
  );

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-[#050505] text-slate-900 dark:text-zinc-300 pb-24 transition-colors duration-500">
      {/* HERO SECTION */}
      <section className="relative pt-16 pb-20 px-6 border-b border-slate-200 dark:border-zinc-900 bg-white dark:bg-transparent overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <button onClick={() => router.back()} className="mb-12 flex items-center gap-2 text-[10px] font-black tracking-widest text-slate-400 hover:text-indigo-500 transition-all uppercase">
            <ChevronLeft size={14} /> Back to directory
          </button>

          <div className="flex flex-col lg:flex-row gap-16 items-start">
            <div className="w-full lg:w-5/12 space-y-8">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-[10px] font-black tracking-widest border border-indigo-100 dark:border-indigo-500/20 uppercase">
                  <Layers size={12} /> {project.category}
                </div>
                <h1 className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white tracking-tighter leading-none">
                  {project.title}<span className="text-indigo-500">.</span>
                </h1>
                <div className="flex items-center gap-2 font-mono text-xs text-yellow-500">
                   <Star size={14} fill="currentColor" /> {project.averageRating?.toFixed(1)} / 5.0
                </div>
                <p className="text-lg text-slate-600 dark:text-zinc-400 font-medium leading-relaxed">
                  {project.description}
                </p>
              </div>

              <div className="flex flex-wrap gap-4 pt-4">
                <a href={project.liveLink} target="_blank" rel="noopener noreferrer" className="px-8 py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl font-black text-xs uppercase tracking-widest flex items-center gap-3 hover:scale-[1.02] transition-all">
                  <Globe size={16} /> Live Protocol
                </a>
                <a href={project.frontendRepo} target="_blank" rel="noopener noreferrer" className="p-4 bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-xl hover:text-indigo-500 transition-all">
                  <Github size={20} />
                </a>
                {project.backendRepo && (
                  <a href={project.backendRepo} target="_blank" rel="noopener noreferrer" className="p-4 bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-xl hover:text-indigo-500 transition-all">
                    <Github size={20} />
                  </a>
                )}
              </div>
            </div>

            {/* PREVIEW WINDOW */}
            <div className="w-full lg:w-7/12">
              <div className="rounded-[2rem] border border-slate-200 dark:border-zinc-800 bg-white dark:bg-black overflow-hidden shadow-2xl">
                <div className="bg-slate-50 dark:bg-zinc-900/80 border-b border-slate-200 dark:border-zinc-800 px-6 py-4 flex items-center">
                  <div className="flex-1 bg-white dark:bg-black/40 border border-slate-200 dark:border-zinc-800 rounded-lg px-4 py-1.5 text-[10px] font-mono text-slate-400 truncate flex items-center gap-2">
                    <Globe size={12} /> {project?.liveLink}
                  </div>
                </div>
                <iframe src={project?.liveLink} className="w-full h-[450px] border-none" title={project?.title} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEEDBACK SECTION */}
      <section className="px-6 max-w-7xl mx-auto mt-24 grid lg:grid-cols-12 gap-16">
        <div className="lg:col-span-4 space-y-6">
          <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] flex items-center gap-2"><Cpu size={16}/> System_Stack</h3>
          <div className="flex flex-wrap gap-2">
            {project?.technologies?.map((t: string) => (
              <span key={t} className="px-4 py-2 bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-xl text-xs font-bold">{t}</span>
            ))}
          </div>
        </div>

        <div className="lg:col-span-8 space-y-8">
          <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] flex items-center gap-2"><MessageSquare size={16}/> Transmission_Logs</h3>
          
          {session ? (
            <div className="p-8 bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-3xl space-y-6">
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} size={24} onClick={() => setRating(s)} className={`cursor-pointer transition-all ${rating >= s ? "text-yellow-500 fill-yellow-500" : "text-slate-200 dark:text-zinc-800"}`} />
                ))}
              </div>
              <textarea value={comment} onChange={(e) => setComment(e.target.value)} placeholder="Log technical observations..." className="w-full bg-slate-50 dark:bg-black border border-slate-200 dark:border-zinc-800 rounded-2xl p-6 text-sm min-h-[120px] outline-none focus:ring-2 focus:ring-indigo-500/20" />
              <button onClick={handleReviewSubmit} disabled={isSubmitting} className="w-full py-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl text-xs font-black uppercase tracking-widest flex items-center justify-center gap-2 transition-all">
                {isSubmitting ? "Syncing..." : <><Send size={14} /> Submit Feedback</>}
              </button>
            </div>
          ) : (
            <div className="p-12 border-2 border-dashed border-slate-200 dark:border-zinc-800 rounded-3xl text-center">
              <ShieldAlert className="mx-auto text-slate-300 dark:text-zinc-700 mb-4" size={48} />
              <p className="text-sm text-slate-500 mb-6">Log in to contribute to project intelligence.</p>
             <Link href="/signup"><button  className="px-8 py-3 bg-indigo-600 text-white rounded-xl font-black text-[10px] uppercase tracking-widest">Authorize Access</button></Link >
            </div>
          )}

          {/* REVIEWS LIST */}
          <div className="space-y-4">
            {project?.reviews?.map((rev, i: number) => (
              <div key={i} className="p-6 bg-white dark:bg-zinc-900/50 border border-slate-200 dark:border-zinc-800 rounded-2xl">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-xs font-black text-indigo-500">@{rev.userName}</span>
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, idx) => <Star key={idx} size={10} className={`${idx < rev.rating ? "text-yellow-500 fill-yellow-500" : "text-zinc-800"}`} />)}
                  </div>
                </div>
                <p className="text-sm text-slate-600 dark:text-zinc-400">{rev.comment}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}