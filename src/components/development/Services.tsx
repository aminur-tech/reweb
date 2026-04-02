"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { Plus, Pencil, Trash2, Loader2, X, LayoutGrid, Tag } from "lucide-react";
import { useAdmin } from "../hooks/useAdmin";
import { toast } from "sonner";

const API_URL = "https://re-web-server.vercel.app/api/v1/services";

interface Service {
  _id: string;
  title: string;
  description: string;
  category: string;
}

const Services = () => {
  const { isAdmin, token } = useAdmin();
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Filtering Logic
  const [activeCategory, setActiveCategory] = useState("Web Development");
  const categories = ["Web Development", "Web Design", "SEO", "Maintenance"];

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({ title: "", description: "", category: "Web Development" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchServices = async () => {
    try {
      const { data } = await axios.get(API_URL);
      setServices(data.data);
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchServices(); }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      if (editingId) {
        const { data } = await axios.patch(`${API_URL}/${editingId}`, formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setServices(services.map(s => s._id === editingId ? data.data : s));
      } else {
        const { data } = await axios.post(API_URL, formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setServices([...services, data.data]);
      }
      closeModal();
    } catch (err) {
      toast.error("Action failed.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this service?")) return;
    try {
      await axios.delete(`${API_URL}/${id}`, { headers: { Authorization: `Bearer ${token}` } });
      setServices(services.filter((s) => s._id !== id));
    } catch (err) { toast.error("Delete failed"); }
  };

  const openEditModal = (service: Service) => {
    setEditingId(service._id);
    setFormData({ title: service.title, description: service.description, category: service.category });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingId(null);
    setFormData({ title: "", description: "", category: "Web Development" });
  };

  // Filtered List
  const filteredServices = services.filter(s => s.category === activeCategory);

  if (loading) return <div className="flex justify-center py-40"><Loader2 className="animate-spin text-indigo-500" /></div>;

  return (
    <section className="max-w-6xl mx-auto px-6 py-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
        <div>
          <h2 className="text-5xl font-black text-slate-900 dark:text-white tracking-tight mb-4">
            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">Expertise</span>
          </h2>
          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2 rounded-full text-sm font-bold transition-all ${
                  activeCategory === cat 
                  ? "bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white shadow-lg" 
                  : "bg-slate-100 dark:bg-slate-800 text-slate-500 hover:bg-slate-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
        
        {isAdmin && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-6 py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-2xl font-bold shadow-xl"
          >
            <Plus size={18} /> Add Service
          </motion.button>
        )}
      </div>

      {/* Grid filtered by category */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        <AnimatePresence mode="popLayout">
          {filteredServices.length > 0 ? (
            filteredServices.map((service) => (
              <motion.div
                layout
                key={service._id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="group p-8 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[2.5rem] relative shadow-sm hover:shadow-2xl transition-all"
              >
                <div className="mb-6 w-12 h-12 bg-indigo-50 dark:bg-indigo-500/10 rounded-2xl flex items-center justify-center text-indigo-600">
                  <LayoutGrid size={24} />
                </div>
                <h3 className="text-2xl font-bold dark:text-white mb-3">{service.title}</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{service.description}</p>
                
                {isAdmin && (
                  <div className="absolute top-6 right-6 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => openEditModal(service)} className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg hover:text-indigo-500"><Pencil size={16}/></button>
                    <button onClick={() => handleDelete(service._id)} className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg hover:text-red-500"><Trash2 size={16}/></button>
                  </div>
                )}
              </motion.div>
            ))
          ) : (
            <div className="col-span-full py-20 text-center text-slate-400">No services found in this category.</div>
          )}
        </AnimatePresence>
      </div>

      {/* --- MODAL --- */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={closeModal} className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm" />
            <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }} className="relative bg-white dark:bg-slate-900 w-full max-w-lg p-10 rounded-[3rem] shadow-2xl border border-slate-200 dark:border-slate-800">
              <button onClick={closeModal} className="absolute top-8 right-8 text-slate-400 hover:text-white"><X size={24} /></button>
              <h3 className="text-3xl font-black mb-6 dark:text-white">{editingId ? "Update" : "Create"} Service</h3>
              
              <form onSubmit={handleSubmit} className="space-y-5">
                <input required placeholder="Service Title" value={formData.title} className="w-full px-6 py-4 rounded-2xl bg-slate-100 dark:bg-slate-800 outline-none focus:ring-2 focus:ring-purple-500 dark:text-white" onChange={(e) => setFormData({...formData, title: e.target.value})} />
                
                <select 
                  value={formData.category} 
                  className="w-full px-6 py-4 rounded-2xl bg-slate-100 dark:bg-slate-800 outline-none focus:ring-2 focus:ring-purple-500 dark:text-white appearance-none"
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                >
                  {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                </select>

                <textarea required placeholder="Description" rows={4} value={formData.description} className="w-full px-6 py-4 rounded-2xl bg-slate-100 dark:bg-slate-800 outline-none focus:ring-2 focus:ring-purple-500 dark:text-white" onChange={(e) => setFormData({...formData, description: e.target.value})} />
                
                <button disabled={isSubmitting} className="w-full py-5 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white rounded-2xl font-black text-md shadow-lg flex justify-center items-center gap-3 transition-transform active:scale-95">
                  {isSubmitting ? <Loader2 className="animate-spin" /> : editingId ? "Save Changes" : "Post Service"}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Services;