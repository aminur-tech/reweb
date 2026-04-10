"use client";

import React, { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { useSession } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";
import { 
    FileText, 
    MoreVertical, 
    Trash2, 
    ExternalLink, 
    AlertCircle,
    CheckCircle2,
    XCircle
} from "lucide-react";
import { toast } from "sonner";

type Task = {
    _id: string;
    title: string;
    category: string;
    status: string;
    attachments: string[];
};

const ManageTask = () => {
    const { data: session } = useSession();
    const [tasks, setTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeMenu, setActiveMenu] = useState<string | null>(null);

    const fetchTasks = async () => {
        try {
            const token = session?.accessToken;
            const res = await api.get("/api/v1/tasks", {
                headers: { Authorization: `Bearer ${token}` }
            });
            setTasks(res.data);
        } catch (error) {
            toast.error("Failed to load tasks");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (session?.accessToken) fetchTasks();
    }, [session]);

    const handleUpdateStatus = async (id: string, newStatus: string) => {
        try {
            const token = session?.accessToken;
            await api.patch(`/api/v1/tasks/status/${id}`, { status: newStatus }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setTasks(tasks.map(t => t._id === id ? { ...t, status: newStatus } : t));
            toast.success(`Task marked as ${newStatus}`);
            setActiveMenu(null);
        } catch (error) {
            toast.error("Status update failed");
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure?")) return;
        try {
            const token = session?.accessToken;
            await api.delete(`/api/v1/tasks/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setTasks(tasks.filter(t => t._id !== id));
            toast.success("Task deleted");
        } catch (error) {
            toast.error("Delete failed");
        }
    };

    const getStatusStyle = (status: string) => {
        switch (status) {
            case "accepted": return "bg-emerald-500/10 text-emerald-500 border-emerald-500/20";
            case "rejected": return "bg-rose-500/10 text-rose-500 border-rose-500/20";
            case "assigned": return "bg-blue-500/10 text-blue-500 border-blue-500/20";
            default: return "bg-amber-500/10 text-amber-500 border-amber-500/20";
        }
    };

    if (loading) return <div className="p-20 text-center animate-pulse text-slate-400 font-medium">Loading Tasks...</div>;

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-[#030712] p-6 lg:p-12">
            <div className="max-w-6xl mx-auto">
                <header className="flex justify-between items-end mb-12">
                    <div>
                        <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">
                            Manage <span className="text-indigo-600">Tasks</span>
                        </h1>
                        <p className="text-slate-500 mt-2">Control task status and team assignments.</p>
                    </div>
                </header>

                <div className="space-y-4">
                    {tasks.map((task, index) => (
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05 }}
                            key={task._id}
                            className="relative group bg-white dark:bg-[#0B0F1A] border border-slate-200 dark:border-slate-800 rounded-3xl p-5 hover:border-indigo-500/50 transition-all shadow-sm"
                        >
                            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                                {/* Left Side: Info */}
                                <div className="flex items-center gap-5">
                                    <div className="w-14 h-14 rounded-2xl bg-indigo-500/5 border border-indigo-500/10 flex items-center justify-center text-indigo-500">
                                        <FileText size={26} />
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className={`text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-lg border ${getStatusStyle(task.status)}`}>
                                                {task.status}
                                            </span>
                                        </div>
                                        <h3 className="text-lg font-bold text-slate-900 dark:text-white leading-tight">{task.title}</h3>
                                        <p className="text-sm text-slate-400">{task.category}</p>
                                    </div>
                                </div>

                                {/* Right Side: Actions */}
                                <div className="flex items-center gap-6">
                                    <div className="flex -space-x-3">
                                        {task.attachments?.map((url, i) => (
                                            <a key={i} href={url} target="_blank" className="w-9 h-9 rounded-xl border-4 border-white dark:border-[#0B0F1A] bg-slate-100 dark:bg-slate-800 flex items-center justify-center hover:scale-110 transition-transform">
                                                <ExternalLink size={14} className="text-indigo-500" />
                                            </a>
                                        ))}
                                    </div>

                                    <div className="relative">
                                        <button 
                                            onClick={() => setActiveMenu(activeMenu === task._id ? null : task._id)}
                                            className="p-3 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-2xl text-slate-400 transition-all"
                                        >
                                            <MoreVertical size={20} />
                                        </button>

                                        {/* Dropdown Menu */}
                                        <AnimatePresence>
                                            {activeMenu === task._id && (
                                                <>
                                                    <div className="fixed inset-0 z-10" onClick={() => setActiveMenu(null)} />
                                                    <motion.div 
                                                        initial={{ opacity: 0, scale: 0.95, y: 10 }}
                                                        animate={{ opacity: 1, scale: 1, y: 0 }}
                                                        exit={{ opacity: 0, scale: 0.95, y: 10 }}
                                                        className="absolute right-0 mt-2 w-48 bg-white dark:bg-[#161B26] border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl z-20 overflow-hidden"
                                                    >
                                                        <button 
                                                            onClick={() => handleUpdateStatus(task._id, "accepted")}
                                                            className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-emerald-500 hover:bg-emerald-500/5 transition-colors"
                                                        >
                                                            <CheckCircle2 size={16} /> Accept Task
                                                        </button>
                                                        <button 
                                                            onClick={() => handleUpdateStatus(task._id, "rejected")}
                                                            className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-rose-500 hover:bg-rose-500/5 transition-colors border-b border-slate-100 dark:border-slate-800"
                                                        >
                                                            <XCircle size={16} /> Reject Task
                                                        </button>
                                                        <button 
                                                            onClick={() => handleDelete(task._id)}
                                                            className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-slate-400 hover:bg-red-500/5 hover:text-red-500 transition-colors"
                                                        >
                                                            <Trash2 size={16} /> Delete
                                                        </button>
                                                    </motion.div>
                                                </>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {tasks.length === 0 && (
                    <div className="mt-20 text-center py-20 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-[2.5rem]">
                        <AlertCircle size={48} className="mx-auto text-slate-200 dark:text-slate-800 mb-4" />
                        <p className="text-slate-400 font-medium text-lg">Your workspace is empty.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ManageTask;