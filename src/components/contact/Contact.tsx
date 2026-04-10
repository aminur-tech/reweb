"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  Send, 
  Loader2, 
  Mail, 
  User, 
  MessageSquare, 
  CheckCircle2, 
  XCircle, 
  RefreshCcw,
  X, 
  Database,
  Terminal
} from 'lucide-react';

interface ContactProps {
  mode?: string | null;
}

const Contact = ({ mode }: ContactProps) => {
  const [formData, setFormData] = useState({ name: '', email: '', service: 'Web Development', message: '' });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const services = ["Web Development", "Deep-Tech Research", "API Ecosystem", "Full Stack Solution"];

  useEffect(() => {
    if (mode) {
      const mapping: Record<string, string> = {
        dev: "Web Development",
        research: "Deep-Tech Research",
        seo: "Full Stack Solution",
      };

      if (mapping[mode]) {
        setFormData((prev) => ({ ...prev, service: mapping[mode] }));
      }
    }
  }, [mode]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post('http://localhost:5000/api/v1/contact/send-email', formData);
      if (res.data.success) {
        setStatus('success');
        setFormData({ name: '', email: '', service: 'Web Development', message: '' });
      } else {
        setStatus('error');
      }
    } catch (err) {
      setStatus('error');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => setStatus('idle');

  return (
    <section className="py-24 px-6 max-w-7xl mx-auto min-h-screen flex flex-col justify-center  transition-colors duration-500 selection:bg-cyan-500/30">
      <div className="lg:col-span-7 relative group max-w-2xl mx-auto w-full">
        
        {/* Responsive Glow: More visible in dark mode, subtle in light */}
        <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 via-blue-600 to-violet-600 rounded-[2rem] blur-xl opacity-10 dark:opacity-5 group-hover:opacity-20 dark:group-hover:opacity-15 transition duration-1000"></div>
        
        <div className="relative bg-white dark:bg-[#0c0c0c] rounded-[2rem] border border-slate-200 dark:border-white/5 overflow-hidden shadow-xl dark:shadow-2xl transition-colors duration-500">
          
          {/* --- STATUS OVERLAYS --- */}
          {status === 'success' && (
            <div className="absolute inset-0 z-20 bg-white/95 dark:bg-[#0c0c0c]/95 backdrop-blur-md flex flex-col items-center justify-center text-center p-8 animate-in fade-in zoom-in duration-300">
              <div className="w-20 h-20 bg-cyan-500/10 border border-cyan-500/20 rounded-full flex items-center justify-center mb-6">
                <CheckCircle2 size={40} className="text-cyan-600 dark:text-cyan-400" />
              </div>
              <h3 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tighter mb-2">Uplink Established</h3>
              <p className="text-slate-500 dark:text-slate-400 text-sm font-mono uppercase tracking-widest mb-8">Data packet received. Response sequence initiated.</p>
              <button onClick={resetForm} className="px-8 py-3 bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] text-slate-900 dark:text-white hover:bg-slate-200 dark:hover:bg-white/10 transition-all">New Transmission</button>
            </div>
          )}

          {/* --- MAIN FORM --- */}
          <form onSubmit={handleSubmit} className="p-8 md:p-12 space-y-8">
            <div className="flex justify-between items-start mb-4">
               <div>
                  <h2 className="text-slate-900 dark:text-white text-3xl font-black uppercase tracking-tighter leading-none">Contact Systems</h2>
                  <p className="text-cyan-600 dark:text-cyan-500/50 text-[10px] font-mono uppercase tracking-[0.3em] mt-2">Mode: {formData.service}</p>
               </div>
               <Terminal className="text-slate-400 dark:text-slate-700" size={24} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] ml-1">Requester Identity</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-600" size={16} />
                  <input
                    type="text"
                    placeholder="Name"
                    required
                    className="w-full bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/5 pl-12 pr-4 py-4 rounded-xl text-sm text-slate-900 dark:text-white focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/20 outline-none transition-all placeholder:text-slate-400 dark:placeholder:text-slate-700"
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] ml-1">Digital Terminal</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-600" size={16} />
                  <input
                    type="email"
                    placeholder="Email Address"
                    required
                    className="w-full bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/5 pl-12 pr-4 py-4 rounded-xl text-sm text-slate-900 dark:text-white focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/20 outline-none transition-all placeholder:text-slate-400 dark:placeholder:text-slate-700"
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] ml-1">Select Protocol</label>
              <div className="flex flex-wrap gap-2">
                {services.map((service) => (
                  <button
                    key={service}
                    type="button"
                    onClick={() => setFormData({ ...formData, service })}
                    className={`px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all border ${
                      formData.service === service 
                      ? 'bg-cyan-500 dark:bg-cyan-500/10 border-cyan-500 text-white dark:text-cyan-400 shadow-md dark:shadow-[0_0_20px_rgba(6,182,212,0.1)]' 
                      : 'bg-white dark:bg-white/5 border-slate-200 dark:border-white/5 text-slate-500 hover:border-cyan-200 dark:hover:border-white/20'
                    }`}
                  >
                    {service}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] ml-1">Mission Brief</label>
              <div className="relative">
                <MessageSquare className="absolute left-4 top-5 text-slate-400 dark:text-slate-600" size={16} />
                <textarea
                  placeholder="Describe the research objectives or technical requirements..."
                  rows={4}
                  required
                  className="w-full bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/5 pl-12 pr-4 py-4 rounded-xl text-sm text-slate-900 dark:text-white focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/20 outline-none transition-all placeholder:text-slate-400 dark:placeholder:text-slate-700 resize-none"
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                />
              </div>
            </div>

            <button
              disabled={loading}
              className="group relative w-full flex items-center justify-center gap-3 px-8 py-5 bg-slate-900 dark:bg-white text-white dark:text-black text-[11px] font-black uppercase tracking-[0.3em] rounded-xl overflow-hidden transition-all hover:bg-cyan-600 dark:hover:bg-cyan-400 disabled:opacity-50"
            >
              {loading ? (
                <Loader2 className="animate-spin" size={18} />
              ) : (
                <>Initiate Transmission <Send size={14} /></>
              )}
            </button>
            
            <div className="flex items-center justify-center gap-6 opacity-20">
               <div className="h-[1px] flex-1 bg-slate-900/20 dark:bg-white/20" />
               <Database size={16} className="text-slate-900 dark:text-white" />
               <div className="h-[1px] flex-1 bg-slate-900/20 dark:bg-white/20" />
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;