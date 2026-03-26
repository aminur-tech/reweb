"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { 
  Plus, Pencil, Trash2, Loader2, X, 
  Code2, Cpu, Globe, Database, Smartphone, 
  Layout, Server, Zap, Search
} from "lucide-react";
import { useAdmin } from "../hooks/useAdmin";

const API_URL = "http://localhost:5000/api/v1/techstack";

const TECH_SUGGESTIONS = [
  { title: "React.js", icon: "Layout", desc: "UI Library" },
  { title: "Next.js", icon: "Zap", desc: "React Framework" },
  { title: "Node.js", icon: "Server", desc: "JS Runtime" },
  { title: "TypeScript", icon: "Code2", desc: "Typed JS" },
  { title: "JavaScript", icon: "Code2", desc: "Programming Language" },
  { title: "MongoDB", icon: "Database", desc: "NoSQL DB" },
  {title: "mongoose", icon: "Database", desc: "MongoDB ODM"},
  { title: "Tailwind CSS", icon: "Globe", desc: "CSS Framework" },
  { title: "Express.js", icon: "Cpu", desc: "Backend Framework" },
  { title: "Redux", icon: "Zap", desc: "State Management" },
];

const IconRenderer = ({ name, size = 24 }: { name: string, size?: number }) => {
  const icons: Record<string, React.ElementType> = { Layout, Zap, Server, Code2, Database, Globe, Cpu, Smartphone };
  const IconTag = icons[name] || Code2;
  return <IconTag size={size} />;
};

interface Tech {
  _id: string;
  title: string;
  description: string;
  sector: string;
  icon: string;
  createdAt: string; // Used for sorting
}

const Skills = () => {
  const { isAdmin, token } = useAdmin();
  const [techs, setTechs] = useState<Tech[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [formData, setFormData] = useState({ 
    title: "", 
    description: "", 
    sector: "Development",
    icon: "Code2"
  });

  const fetchTechs = async () => {
    try {
      const { data } = await axios.get(API_URL);
      // Sort by createdAt ASC so new items are at the end
      const sorted = data.data.sort((a: Tech, b: Tech) => 
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      );
      setTechs(sorted);
    } catch (err) { console.error(err); } 
    finally { setLoading(false); }
  };

  useEffect(() => { fetchTechs(); }, []);

  const handleSuggestionClick = (item: typeof TECH_SUGGESTIONS[0]) => {
    setFormData({ ...formData, title: item.title, description: item.desc, icon: item.icon });
    setShowSuggestions(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axios.patch(`${API_URL}/${editingId}`, formData, {
          headers: { Authorization: `Bearer ${token}` }
        });
      } else {
        await axios.post(API_URL, formData, {
          headers: { Authorization: `Bearer ${token}` }
        });
      }
      fetchTechs(); // Refetch ensures correct order
      closeModal();
    } catch (err) { alert("Action failed"); }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this tech?")) return;
    await axios.delete(`${API_URL}/${id}`, { headers: { Authorization: `Bearer ${token}` } });
    setTechs(techs.filter(t => t._id !== id));
  };

  const openEdit = (tech: Tech) => {
    setEditingId(tech._id);
    setFormData({ title: tech.title, description: tech.description, sector: tech.sector, icon: tech.icon || "Code2" });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingId(null);
    setFormData({ title: "", description: "", sector: "Development", icon: "Code2" });
  };

  const devTechs = techs.filter(t => t.sector === "Development");

  if (loading) return <div className="py-20 text-center"><Loader2 className="animate-spin inline text-indigo-500" /></div>;

  return (
    <section className="py-24 max-w-6xl mx-auto px-6">
      <div className="flex justify-between items-end mb-16">
        <div>
          <h2 className="text-5xl font-black text-slate-900 dark:text-white">
            Tech <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">Stack</span>
          </h2>
          <p className="text-slate-500 mt-2 font-medium">Professional web development technologies.</p>
        </div>
        {isAdmin && (
          <button onClick={() => setIsModalOpen(true)} className="flex items-center gap-2 px-6 py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-2xl font-bold shadow-lg transition-all active:scale-95">
            <Plus size={20} /> Add Tech
          </button>
        )}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
        <AnimatePresence mode="popLayout">
          {devTechs.map((tech) => (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              key={tech._id}
              className="group relative p-8 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[2.5rem] text-center hover:border-indigo-500 transition-all shadow-sm hover:shadow-2xl hover:shadow-indigo-500/5"
            >
              <div className="mb-4 flex justify-center text-indigo-500 transition-transform group-hover:scale-110">
                <IconRenderer name={tech.icon} size={38} />
              </div>
              <h3 className="font-bold text-lg dark:text-white leading-tight">{tech.title}</h3>
              
              {/* Added Small Description */}
              <p className="text-[11px] uppercase tracking-wider font-bold text-slate-400 mt-1 dark:text-slate-500">
                {tech.description || "Tech Tool"}
              </p>
              
              {isAdmin && (
                <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-all transform translate-y-1 group-hover:translate-y-0">
                  <button onClick={() => openEdit(tech)} className="p-2 bg-slate-50 dark:bg-slate-800 rounded-xl hover:text-indigo-500 shadow-sm"><Pencil size={14}/></button>
                  <button onClick={() => handleDelete(tech._id)} className="p-2 bg-slate-50 dark:bg-slate-800 rounded-xl hover:text-red-500 shadow-sm"><Trash2 size={14}/></button>
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* MODAL */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={closeModal} className="absolute inset-0 bg-slate-900/70 backdrop-blur-md" />
            <motion.div initial={{ scale: 0.9, y: 30 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 30 }} className="relative bg-white dark:bg-slate-900 w-full max-w-md p-10 rounded-[3rem] shadow-2xl border dark:border-slate-800">
              <button onClick={closeModal} className="absolute top-8 right-8 text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"><X size={24} /></button>
              <h3 className="text-3xl font-black mb-8 dark:text-white">{editingId ? "Edit Tech" : "New Tech"}</h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="relative">
                  <label className="text-[10px] font-black text-slate-400 ml-2 uppercase tracking-widest">Tech Title</label>
                  <div className="relative">
                    <input 
                      required 
                      autoComplete="off"
                      placeholder="React.js" 
                      value={formData.title} 
                      className="w-full px-6 py-4 mt-1 rounded-2xl bg-slate-100 dark:bg-slate-800 dark:text-white outline-none focus:ring-2 focus:ring-indigo-500 transition-all" 
                      onFocus={() => setShowSuggestions(true)}
                      onChange={(e) => setFormData({...formData, title: e.target.value})} 
                    />
                    <Search className="absolute right-5 top-5 text-slate-400" size={18} />
                  </div>

                  <AnimatePresence>
                    {showSuggestions && (
                      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="absolute z-10 w-full mt-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-2xl max-h-48 overflow-y-auto">
                        {TECH_SUGGESTIONS.filter(i => i.title.toLowerCase().includes(formData.title.toLowerCase())).map((item) => (
                          <div key={item.title} onClick={() => handleSuggestionClick(item)} className="px-6 py-3 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 cursor-pointer flex items-center gap-3 transition-colors">
                            <div className="text-indigo-500"><IconRenderer name={item.icon} size={16} /></div>
                            <span className="dark:text-white font-bold text-sm">{item.title}</span>
                          </div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <div>
                  <label className="text-[10px] font-black text-slate-400 ml-2 uppercase tracking-widest">Description (Small)</label>
                  <input 
                    placeholder="Short description..." 
                    value={formData.description} 
                    className="w-full px-6 py-4 mt-1 rounded-2xl bg-slate-100 dark:bg-slate-800 dark:text-white outline-none focus:ring-2 focus:ring-indigo-500 transition-all" 
                    onChange={(e) => setFormData({...formData, description: e.target.value})} 
                  />
                </div>

                <button className="w-full py-5 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white rounded-2xl font-black text-lg shadow-xl shadow-indigo-500/20 active:scale-95 transition-all">
                  {editingId ? "Update Skill" : "Publish to Stack"}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Skills;