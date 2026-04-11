"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { 
  Plus, Edit, Trash2, Star, Loader2, X, 
  ExternalLink, Github, Layout, Database 
} from "lucide-react";
import { toast } from "sonner";
import { useAdmin } from "@/components/hooks/useAdmin";
import ProjectForm, { ProjectFormData } from "@/components/dashboard/ProjectForm";
import { motion, AnimatePresence } from "framer-motion";

interface Project extends ProjectFormData {
  _id: string;
  averageRating: number;
}

const ProjectsDashboard = () => {
  const { isAdmin, token, isLoading: authLoading } = useAdmin();
  const [projects, setProjects] = useState<Project[]>([]);
  const [fetching, setFetching] = useState(true);
  const [filter, setFilter] = useState("All");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const API_URL = "https://re-web-server.vercel.app/api/v1/projects";
  const api = axios.create({
    baseURL: API_URL,
    headers: { Authorization: `Bearer ${token}` }
  });

  const categories = ["All", "Web Development", "Web Design", "Research", "AI/ML"];

  const fetchProjects = async () => {
    try {
      const { data } = await axios.get(API_URL);
      if (data.success) setProjects(data.data);
    } catch (error) {
      toast.error("Failed to load projects");
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => { fetchProjects(); }, []);

  const filteredProjects = filter === "All" 
    ? projects 
    : projects.filter(p => p.category === filter);

  const handleOpenEdit = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };

  const handleSubmit = async (formData: ProjectFormData) => {
    setIsSubmitting(true);
    try {
      const response = selectedProject 
        ? await api.patch(`/${selectedProject._id}`, formData)
        : await api.post("/create", formData);
      
      if (response.data.success) {
        toast.success(selectedProject ? "Project updated!" : "Project added!");
        handleCloseModal();
        fetchProjects();
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message || "Operation failed");
      } else {
        toast.error("An unexpected error occurred");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure?")) return;
    try {
      await api.delete(`/${id}`);
      toast.success("Project deleted");
      setProjects(prev => prev.filter(p => p._id !== id));
    } catch (error: unknown) {
      toast.error("Delete failed");
    }
  };

  if (authLoading || fetching) return <div className="flex justify-center p-20"><Loader2 className="animate-spin text-indigo-500" /></div>;
  if (!isAdmin) return <div className="p-20 text-center text-red-500 font-bold">Unauthorized Access</div>;

  return (
    <div className="p-8 relative">
      {/* Header & Filter Bar */}
      <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-6 mb-10">
        <div>
          <h1 className="text-3xl font-black dark:text-white">Project Inventory</h1>
          <p className="text-slate-500 text-sm">Review and manage your engineering portfolio</p>
        </div>
        
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex bg-slate-100 dark:bg-slate-800 p-1.5 rounded-2xl border dark:border-slate-700 overflow-x-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                  filter === cat 
                    ? "bg-white dark:bg-slate-700 text-indigo-600 shadow-sm" 
                    : "text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <button onClick={() => setIsModalOpen(true)} className="flex items-center gap-2 px-6 py-3.5 bg-indigo-600 text-white rounded-2xl font-bold hover:bg-indigo-700 transition shadow-lg shadow-indigo-500/20">
            <Plus size={18} /> Add Project
          </button>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project) => (
            <motion.div 
              layout initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9 }}
              key={project._id} 
              className="bg-white dark:bg-slate-900 border dark:border-slate-800 rounded-[2.5rem] p-6 hover:shadow-2xl transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-start mb-4">
                  <span className="px-3 py-1 bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 text-[10px] font-black uppercase rounded-full tracking-wider">
                    {project.category}
                  </span>
                  <div className="flex items-center gap-1 text-yellow-500 font-bold text-sm">
                    <Star size={14} className="fill-yellow-500" /> {project.averageRating?.toFixed(1) || "0.0"}
                  </div>
                </div>
                
                <h3 className="text-xl font-bold dark:text-white mb-2">{project.title}</h3>
                <p className="text-slate-500 text-sm line-clamp-2 mb-6">{project.description}</p>
                
                {/* Repo Links with Icons */}
                <div className="flex gap-4 mb-8">
                  {project.frontendRepo && (
                    <a href={project.frontendRepo} target="_blank" className="flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-indigo-500 transition">
                      <Layout size={14} /> Frontend
                    </a>
                  )}
                  {project.backendRepo && (
                    <a href={project.backendRepo} target="_blank" className="flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-indigo-500 transition">
                      <Database size={14} /> Backend
                    </a>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between pt-5 border-t dark:border-slate-800">
                <div className="flex gap-2">
                  <button onClick={() => handleOpenEdit(project)} className="p-2 text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-500/10 rounded-xl transition">
                    <Edit size={18} />
                  </button>
                  <button onClick={() => handleDelete(project._id)} className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-xl transition">
                    <Trash2 size={18} />
                  </button>
                </div>

                {project.liveLink && (
                  <a href={project.liveLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-5 py-2.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-2xl text-xs font-black hover:opacity-80 transition">
                    Live <ExternalLink size={14} />
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Modal - Unified */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={handleCloseModal} className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" />
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto no-scrollbar bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-2xl">
              <div className="sticky top-0 z-10 flex justify-between items-center p-6 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b dark:border-slate-800">
                <h2 className="text-2xl font-black dark:text-white">{selectedProject ? "Edit Project" : "New Project"}</h2>
                <button onClick={handleCloseModal} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition"><X size={24} className="text-slate-500" /></button>
              </div>
              <div className="p-8">
                <ProjectForm initialData={selectedProject ?? undefined} onSubmit={handleSubmit} loading={isSubmitting} />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProjectsDashboard;