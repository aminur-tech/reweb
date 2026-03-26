"use client";

import React, { useState } from "react";
import { Save, Globe, Github, Layers, Tag, ChevronDown } from "lucide-react";

export interface ProjectFormData {
  title: string;
  description: string;
  category: string;
  liveLink: string;
  frontendRepo: string;
  backendRepo: string;
  technologies: string | string[];
}

interface ProjectFormProps {
  initialData?: ProjectFormData;
  onSubmit: (data: ProjectFormData) => void;
  loading: boolean;
}

const ProjectForm = ({ initialData, onSubmit, loading }: ProjectFormProps) => {
  const [formData, setFormData] = useState(initialData || {
    title: "",
    description: "",
    category: "",
    liveLink: "",
    frontendRepo: "",
    backendRepo: "",
    technologies: "", // Will be converted to array on submit
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const dataToSend = {
      ...formData,
      technologies: typeof formData.technologies === 'string'
        ? formData.technologies.split(",").map((t: string) => t.trim())
        : formData.technologies
    };
    onSubmit(dataToSend);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border dark:border-slate-800 shadow-2xl space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Title */}
        <div className="md:col-span-1">
          <label className="text-xs font-black uppercase text-slate-400 ml-2">Project Title</label>
          <input
            required
            className="w-full mt-1 px-6 py-4 rounded-2xl bg-slate-100 dark:bg-slate-800 outline-none focus:ring-2 focus:ring-indigo-500"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          />
        </div>

        {/* Category Dropdown */}
        <div className="md:col-span-1">
          <label className="text-xs font-black uppercase text-slate-400 ml-2 flex items-center gap-1 mb-1">
            <Tag size={12} /> Category
          </label>
          <div className="relative group">
            <select
              required
              className="w-full px-6 py-4 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 outline-none focus:ring-2 focus:ring-indigo-500 appearance-none cursor-pointer transition-all duration-300"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            >
              <option value="" disabled>Select a category</option>
              <option value="Web Development">Web Development</option>
              <option value="Web Design">Web Design</option>
              <option value="Research">Research</option>
              <option value="AI/ML">AI & Machine Learning</option>
            </select>

            {/* Custom Arrow Icon */}
            <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 group-hover:text-indigo-500 transition-colors">
              <ChevronDown size={18} />
            </div>
          </div>
        </div>

        {/* Links */}
        <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-4">
          <InputField label="Live Link" icon={<Globe size={16} />} value={formData.liveLink} onChange={(v) => setFormData({ ...formData, liveLink: v })} />
          <InputField label="Frontend Repo" icon={<Github size={16} />} value={formData.frontendRepo} onChange={(v) => setFormData({ ...formData, frontendRepo: v })} />
          <InputField label="Backend Repo" icon={<Layers size={16} />} value={formData.backendRepo} onChange={(v) => setFormData({ ...formData, backendRepo: v })} />
        </div>

        {/* Technologies */}
        <div className="md:col-span-2">
          <label className="text-xs font-black uppercase text-slate-400 ml-2">Technologies (comma separated)</label>
          <input
            placeholder="React, Next.js, TypeScript, Node.js"
            className="w-full mt-1 px-6 py-4 rounded-2xl bg-slate-100 dark:bg-slate-800 outline-none focus:ring-2 focus:ring-indigo-500"
            value={formData.technologies}
            onChange={(e) => setFormData({ ...formData, technologies: e.target.value })}
          />
        </div>

        {/* Description */}
        <div className="md:col-span-2">
          <label className="text-xs font-black uppercase text-slate-400 ml-2">Description</label>
          <textarea
            rows={4}
            required
            className="w-full mt-1 px-6 py-4 rounded-2xl bg-slate-100 dark:bg-slate-800 outline-none focus:ring-2 focus:ring-indigo-500"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          />
        </div>
      </div>

      <button disabled={loading} className="w-full py-5 bg-gradient-to-r from-indigo-600 to-pink-600 text-white rounded-2xl font-black hover:opacity-90 disabled:opacity-50 flex items-center justify-center gap-2">
        <Save size={20} /> {loading ? "Saving..." : "Save Project"}
      </button>
    </form>
  );
};

interface InputFieldProps {
  label: string;
  icon: React.ReactNode;
  value: string;
  onChange: (value: string) => void;
}

const InputField = ({ label, icon, value, onChange }: InputFieldProps) => (
  <div>
    <label className="text-[10px] font-black uppercase text-slate-400 ml-2 flex items-center gap-1">{icon} {label}</label>
    <input
      className="w-full mt-1 px-4 py-3 rounded-xl bg-slate-100 dark:bg-slate-800 outline-none text-sm"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  </div>
);

export default ProjectForm;