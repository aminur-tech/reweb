"use client";

import React, { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { useSession } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";
import {
    User, Clock, Trash2, X, FileText,
    Download, CheckCircle2, Star, MessageSquare, Package, 
    LayoutGrid, Inbox, ChevronRight
} from "lucide-react";
import { toast } from "sonner";

interface Task {
    _id: string;
    title: string;
    category: string;
    status: "pending" | "assigned" | "accepted" | "rejected" | "completed" | "delivered";
    requirementInfo: string;
    clientAttachments: string[];
    workAttachments?: string[];
    workInfo?: string;
    collaborator?: {
        name: string;
        email: string;
    };
    createdAt: string;
}

const statusColor = (status: Task["status"]) => {
    switch (status) {
        case "pending": return "bg-amber-50 text-amber-600 border-amber-100 dark:bg-amber-500/10 dark:border-amber-500/20";
        case "assigned": return "bg-blue-50 text-blue-600 border-blue-100 dark:bg-blue-500/10 dark:border-blue-500/20";
        case "delivered": return "bg-emerald-50 text-emerald-600 border-emerald-100 shadow-sm shadow-emerald-100/50 dark:bg-emerald-500/10 dark:border-emerald-500/20";
        case "completed": return "bg-purple-50 text-purple-600 border-purple-100 dark:bg-purple-500/10 dark:border-purple-500/20";
        case "rejected": return "bg-rose-50 text-rose-600 border-rose-100 dark:bg-rose-500/10 dark:border-rose-500/20";
        default: return "bg-slate-50 text-slate-600 border-slate-100 dark:bg-slate-800 dark:border-slate-700";
    }
};

const MyTask = () => {
    const { data: session } = useSession();
    const [tasks, setTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState(true);
    const [viewDelivery, setViewDelivery] = useState<Task | null>(null);
    const [rating, setRating] = useState(0);
    const [feedback, setFeedback] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const fetchTasks = async () => {
        try {
            const res = await api.get<Task[]>("/api/v1/tasks/my", {
                headers: { Authorization: `Bearer ${session?.accessToken}` },
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

    const handleDelete = async (id: string) => {
        toast.info("Hold to delete would be better, but we'll confirm for now", {
            action: {
                label: "Confirm Delete",
                onClick: async () => {
                    try {
                        await api.delete(`/api/v1/tasks/my/${id}`, {
                            headers: { Authorization: `Bearer ${session?.accessToken}` },
                        });
                        setTasks((prev) => prev.filter((t) => t._id !== id));
                        toast.success("Task removed successfully");
                    } catch (error) {
                        toast.error("Delete failed");
                    }
                }
            }
        });
    };

    const submitFeedback = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!viewDelivery?._id || !rating) {
            toast.error(rating ? "Something went wrong" : "Please select a star rating");
            return;
        }

        setIsSubmitting(true);
        try {
            await api.post(
                `/api/v1/tasks/client/feedback/${viewDelivery._id}`,
                { rating, feedback },
                { headers: { Authorization: `Bearer ${session?.accessToken}` } }
            );

            toast.success("Feedback submitted! Project closed.");
            setViewDelivery(null);
            setRating(0);
            setFeedback("");
            fetchTasks();
        } catch (err) {
            toast.error("Failed to submit feedback");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center bg-white dark:bg-[#030712]">
            <div className="flex flex-col items-center gap-4">
                <div className="w-12 h-12 border-4 border-indigo-600/20 border-t-indigo-600 rounded-full animate-spin" />
                <p className="text-sm font-medium text-slate-500 animate-pulse">Syncing your workspace...</p>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#030712] text-slate-900 dark:text-slate-100 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 py-12 lg:px-8">
                {/* Header */}
                <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <div className="p-2 bg-indigo-600 rounded-xl">
                                <LayoutGrid size={20} className="text-white" />
                            </div>
                            <span className="text-sm font-bold text-indigo-600 tracking-tight">Client Dashboard</span>
                        </div>
                        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
                            My <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">Projects</span>
                        </h1>
                    </div>
                    <div className="flex items-center gap-3 bg-white dark:bg-slate-900 p-1.5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
                        <div className="px-4 py-2 text-sm font-semibold border-r dark:border-slate-800">
                            {tasks.length} {tasks.length === 1 ? 'Task' : 'Tasks'}
                        </div>
                        <button className="px-4 py-2 text-sm font-bold text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-500/10 rounded-xl transition-colors">
                            Recent First
                        </button>
                    </div>
                </header>

                {tasks.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-24 text-center bg-white dark:bg-slate-900/50 rounded-[3rem] border-2 border-dashed border-slate-200 dark:border-slate-800">
                        <div className="p-6 bg-slate-100 dark:bg-slate-800 rounded-full mb-6">
                            <Inbox size={40} className="text-slate-400" />
                        </div>
                        <h3 className="text-xl font-bold mb-2">No projects found</h3>
                        <p className="text-slate-500 max-w-sm">You haven&apos;t posted any tasks yet. Create your first project to get started!</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-8">
                        {tasks.map((task) => (
                            <motion.div
                                layout
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                key={task._id}
                                className="group relative bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[2.5rem] p-8 hover:shadow-2xl hover:shadow-indigo-500/5 transition-all duration-300"
                            >
                                <div className="flex justify-between items-start mb-6">
                                    <div className="space-y-1">
                                        <span className="text-[10px] uppercase font-black text-indigo-500 tracking-[0.2em]">{task.category}</span>
                                        <h2 className="text-2xl font-bold dark:text-white leading-tight group-hover:text-indigo-600 transition-colors">
                                            {task.title}
                                        </h2>
                                    </div>
                                    <span className={`px-4 py-1.5 text-[10px] font-black uppercase rounded-full border ${statusColor(task.status)}`}>
                                        {task.status}
                                    </span>
                                </div>

                                <p className="text-slate-500 dark:text-slate-400 text-sm mb-8 line-clamp-2 leading-relaxed">
                                    {task.requirementInfo}
                                </p>

                                <div className="flex items-center justify-between pt-6 border-t border-slate-100 dark:border-slate-800">
                                    <div className="flex gap-6">
                                        <div className="flex items-center gap-2 text-[11px] text-slate-400 font-bold uppercase">
                                            <Clock size={14} className="text-slate-300" /> 
                                            {new Date(task.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                                        </div>
                                        {task.collaborator && (
                                            <div className="flex items-center gap-2 text-[11px] text-indigo-500 font-bold uppercase">
                                                <div className="w-5 h-5 rounded-full bg-indigo-100 dark:bg-indigo-500/20 flex items-center justify-center">
                                                    <User size={10} />
                                                </div>
                                                {task.collaborator.name}
                                            </div>
                                        )}
                                    </div>

                                    <div className="flex items-center gap-2">
                                        {task.status === "delivered" ? (
                                            <button
                                                onClick={() => setViewDelivery(task)}
                                                className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-[11px] font-black rounded-2xl shadow-lg shadow-indigo-200 dark:shadow-none transition-all hover:-translate-y-0.5 flex items-center gap-2 uppercase tracking-wider"
                                            >
                                                View Work <ChevronRight size={14} />
                                            </button>
                                        ) : (
                                            <button 
                                                onClick={() => handleDelete(task._id)} 
                                                className="p-3 text-slate-300 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-500/10 rounded-2xl transition-all"
                                            >
                                                <Trash2 size={20} />
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>

            {/* --- DELIVERY REVIEW MODAL --- */}
            <AnimatePresence>
                {viewDelivery && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setViewDelivery(null)}
                            className="absolute inset-0 bg-slate-900/40 backdrop-blur-xl"
                        />
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 40 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 40 }}
                            className="relative bg-white dark:bg-slate-900 border border-white/20 dark:border-slate-800 rounded-[3rem] w-full max-w-2xl shadow-[0_32px_64px_-12px_rgba(0,0,0,0.2)] overflow-hidden"
                        >
                            <div className="px-8 py-6 border-b dark:border-slate-800 flex justify-between items-center bg-slate-50/50 dark:bg-slate-800/30">
                                <div className="flex items-center gap-4">
                                    <div className="p-3 bg-emerald-500 text-white rounded-2xl">
                                        <CheckCircle2 size={24} />
                                    </div>
                                    <div>
                                        <h2 className="text-xl font-black dark:text-white leading-none">View Work and add your feedback</h2>
                                        <p className="text-xs text-slate-500 mt-1 uppercase font-bold tracking-widest">Final Submission</p>
                                    </div>
                                </div>
                                <button onClick={() => setViewDelivery(null)} className="p-3 hover:bg-white dark:hover:bg-slate-800 rounded-2xl transition-colors border border-transparent hover:border-slate-200 dark:hover:border-slate-700">
                                    <X size={20} />
                                </button>
                            </div>

                            <div className="p-8 space-y-8 max-h-[70vh] overflow-y-auto custom-scrollbar">
                                <section>
                                    <label className="text-[10px] font-black uppercase text-slate-400 mb-3 block tracking-widest">Note from Developer</label>
                                    <div className="relative p-6 bg-indigo-50/30 dark:bg-indigo-500/5 rounded-3xl border border-indigo-100/50 dark:border-indigo-500/10 leading-relaxed text-slate-700 dark:text-slate-300 italic text-sm">
                                        &quot;{viewDelivery.workInfo || "No additional notes provided."}&quot;
                                    </div>
                                </section>

                                <section>
                                    <label className="text-[10px] font-black uppercase text-slate-400 mb-4 block tracking-widest">Final Assets</label>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        {viewDelivery.workAttachments?.map((url, i) => (
                                            <a
                                                key={i} href={url} target="_blank"
                                                className="flex items-center justify-between p-5 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-3xl hover:border-indigo-500 hover:shadow-lg hover:shadow-indigo-500/10 transition-all group"
                                            >
                                                <div className="flex items-center gap-4">
                                                    <div className="p-3 bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 rounded-2xl group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                                                        <FileText size={18} />
                                                    </div>
                                                    <div className="flex flex-col">
                                                        <span className="text-xs font-black dark:text-white uppercase tracking-tighter">Download</span>
                                                        <span className="text-[10px] text-slate-400">Asset #{i + 1}</span>
                                                    </div>
                                                </div>
                                                <Download size={18} className="text-slate-300 group-hover:text-indigo-600 transition-colors" />
                                            </a>
                                        ))}
                                    </div>
                                </section>

                                <form onSubmit={submitFeedback} className="pt-8 border-t dark:border-slate-800">
                                    <label className="text-[10px] font-black uppercase text-slate-400 mb-4 block tracking-widest">Quality Rating</label>
                                    <div className="flex gap-3 mb-8">
                                        {[1, 2, 3, 4, 5].map((s) => (
                                            <button 
                                                type="button"
                                                key={s} 
                                                onClick={() => setRating(s)}
                                                className={`p-3 rounded-2xl transition-all duration-300 ${rating >= s ? 'bg-amber-400 text-white scale-110' : 'bg-slate-100 dark:bg-slate-800 text-slate-300'}`}
                                            >
                                                <Star size={24} fill={rating >= s ? "currentColor" : "none"} />
                                            </button>
                                        ))}
                                    </div>

                                    <textarea
                                        value={feedback}
                                        onChange={(e) => setFeedback(e.target.value)}
                                        placeholder="Tell us about your experience..."
                                        className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-[2rem] p-6 text-sm focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all h-32 resize-none"
                                    />

                                    <button 
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="w-full mt-6 py-5 bg-slate-900 dark:bg-indigo-600 text-white font-black rounded-[2rem] hover:opacity-90 active:scale-[0.98] transition-all flex items-center justify-center gap-3 uppercase text-xs tracking-[0.2em]"
                                    >
                                        {isSubmitting ? "Processing..." : (
                                            <>
                                                <MessageSquare size={16} /> Send Feedback
                                            </>
                                        )}
                                    </button>
                                </form>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default MyTask;