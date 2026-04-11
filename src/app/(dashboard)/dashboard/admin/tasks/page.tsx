"use client";

import React, { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { useSession } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";
import { 
    FileText, MoreVertical, Trash2, ExternalLink, 
    AlertCircle, CheckCircle2, XCircle, Eye, Send, PackageCheck,
    Download, Layout
} from "lucide-react";
import { toast } from "sonner";

// Updated Task Interface to match your Schema
interface Task {
    _id: string;
    title: string;
    category: string;
    status: "pending" | "assigned" | "accepted" | "rejected" | "completed" | "delivered";
    requirementInfo: string;         // Initial text from client
    clientAttachments: string[];     // Initial files from client
    workInfo?: string;               // Completion text from collaborator
    workAttachments?: string[];      // Completion files from collaborator
}

const ManageTask = () => {
    const { data: session } = useSession();
    const [tasks, setTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeMenu, setActiveMenu] = useState<string | null>(null);
    const [viewTask, setViewTask] = useState<Task | null>(null);

    const fetchTasks = async () => {
        try {
            const res = await api.get<Task[]>("/api/v1/tasks", {
                headers: { Authorization: `Bearer ${session?.accessToken}` }
            });
            setTasks(res.data);
        } catch (error) {
            toast.error("Failed to fetch tasks");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (session?.accessToken) fetchTasks();
    }, [session]);

    const handleUpdateStatus = async (id: string, newStatus: Task["status"]) => {
        try {
            await api.patch(`/api/v1/tasks/status/${id}`, { status: newStatus }, {
                headers: { Authorization: `Bearer ${session?.accessToken}` }
            });
            setTasks(tasks.map(t => t._id === id ? { ...t, status: newStatus } : t));
            toast.success(`Task status: ${newStatus}`);
            setActiveMenu(null);
        } catch (error) {
            toast.error("Update failed");
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Delete this task? This action cannot be undone.")) return;
        try {
            await api.delete(`/api/v1/tasks/${id}`, {
                headers: { Authorization: `Bearer ${session?.accessToken}` }
            });
            setTasks(tasks.filter(t => t._id !== id));
            toast.success("Task deleted");
        } catch (error) {
            toast.error("Delete failed");
        }
    };

    if (loading) return <div className="p-20 text-center text-slate-400">Loading Admin Dashboard...</div>;

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-[#030712] p-6 lg:p-12">
            <div className="max-w-6xl mx-auto">
                <header className="mb-12">
                    <h1 className="text-4xl font-black text-slate-900 dark:text-white">
                        Admin <span className="text-indigo-600">Workspace</span>
                    </h1>
                </header>

                <div className="space-y-4">
                    {tasks.map((task) => (
                        <div key={task._id} className="bg-white dark:bg-[#0B0F1A] border border-slate-200 dark:border-slate-800 rounded-3xl p-5 flex items-center justify-between shadow-sm">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-500/10 flex items-center justify-center text-indigo-600">
                                    <Layout size={20} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-slate-900 dark:text-white">{task.title}</h3>
                                    <span className="text-[10px] font-black uppercase text-indigo-500 tracking-tighter">{task.status}</span>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <button 
                                    onClick={() => setViewTask(task)}
                                    className="px-4 py-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl text-xs font-bold hover:scale-105 transition-transform flex items-center gap-2"
                                >
                                    <Eye size={14} /> Review Work
                                </button>
                                
                                <button onClick={() => handleDelete(task._id)} className="p-2 text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-500/10 rounded-xl">
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* --- MODAL FOR ADMIN REVIEW --- */}
                <AnimatePresence>
                    {viewTask && (
                        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md">
                            <motion.div 
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="bg-white dark:bg-[#0B0F1A] w-full max-w-2xl rounded-[2.5rem] shadow-2xl border dark:border-slate-800 overflow-hidden"
                            >
                                <div className="p-8 max-h-[85vh] overflow-y-auto">
                                    <div className="flex justify-between mb-8">
                                        <h2 className="text-2xl font-black dark:text-white">Reviewing Task</h2>
                                        <button onClick={() => setViewTask(null)} className="p-2 bg-slate-100 dark:bg-slate-800 rounded-full"><XCircle /></button>
                                    </div>

                                    {/* Section 1: Client Data */}
                                    <div className="mb-8 p-6 bg-slate-50 dark:bg-slate-900/50 rounded-3xl border border-slate-100 dark:border-slate-800">
                                        <h4 className="text-[10px] font-black uppercase text-slate-400 mb-3 flex items-center gap-2">
                                            <FileText size={14} /> Client Requirements
                                        </h4>
                                        <p className="text-sm text-slate-700 dark:text-slate-300 mb-4">{viewTask.requirementInfo}</p>
                                        <div className="flex flex-wrap gap-2">
                                            {viewTask.clientAttachments.map((file, i) => (
                                                <a key={i} href={file} target="_blank" className="text-[10px] font-bold text-indigo-600 bg-white dark:bg-slate-800 px-3 py-1.5 rounded-lg border flex items-center gap-2">
                                                    <Download size={12} /> Requirement_{i+1}
                                                </a>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Section 2: Collaborator Work */}
                                    <div className="mb-8 p-6 bg-indigo-500/5 rounded-3xl border border-indigo-500/10">
                                        <h4 className="text-[10px] font-black uppercase text-indigo-500 mb-3 flex items-center gap-2">
                                            <Send size={14} /> Collaborator Submission
                                        </h4>
                                        <p className="text-sm text-slate-700 dark:text-slate-300 mb-4 italic">
                                            &quot;{viewTask.workInfo || "No submission notes provided."}&quot;
                                        </p>
                                        <div className="flex flex-wrap gap-2">
                                            {viewTask.workAttachments?.map((file, i) => (
                                                <a key={i} href={file} target="_blank" className="text-[10px] font-bold text-white bg-indigo-600 px-3 py-1.5 rounded-lg flex items-center gap-2 hover:bg-indigo-700 transition-colors">
                                                    <PackageCheck size={12} /> View Final Asset_{i+1}
                                                </a>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Admin Actions */}
                                    <div className="grid grid-cols-2 gap-3 pt-6 border-t dark:border-slate-800">
                                        <button 
                                            onClick={() => handleUpdateStatus(viewTask._id, "delivered")}
                                            className="py-4 bg-indigo-600 text-white rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-indigo-700 transition-all flex items-center justify-center gap-2"
                                        >
                                            <PackageCheck size={16} /> Deliver to Client
                                        </button>
                                        <button 
                                            onClick={() => handleUpdateStatus(viewTask._id, "rejected")}
                                            className="py-4 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-white rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-rose-500 hover:text-white transition-all flex items-center justify-center gap-2"
                                        >
                                            <XCircle size={16} /> Send Back (Reject)
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default ManageTask;