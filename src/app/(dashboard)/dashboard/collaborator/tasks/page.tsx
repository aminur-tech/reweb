"use client";

import React, { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { useSession } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";
import { 
    CheckCircle, XCircle, Upload, FileCode, 
    Clock, Send, Check, X, Link as LinkIcon, File as FileIcon 
} from "lucide-react";
import { toast } from "sonner";

interface Task {
    _id: string;
    title: string;
    category: string;
    status: "pending" | "assigned" | "accepted" | "rejected" | "completed" | "delivered";
}

interface SubmitModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (text: string, files: FileList | null) => void;
    loading: boolean;
}

// --- SUBMIT MODAL COMPONENT ---
const SubmitModal = ({ isOpen, onClose, onSubmit, loading }: SubmitModalProps) => {
    const [submissionText, setSubmissionText] = useState("");
    const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div 
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="bg-white dark:bg-[#0B0F1A] w-full max-w-lg rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden"
            >
                <div className="p-8">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-black dark:text-white flex items-center gap-2">
                            <Send className="text-indigo-500" size={24} /> Submit Work
                        </h2>
                        <button onClick={onClose} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors">
                            <X size={20} className="text-slate-500" />
                        </button>
                    </div>

                    <div className="mb-6">
                        <label className="flex items-center gap-2 text-sm font-bold text-slate-400 uppercase tracking-widest mb-3">
                            <LinkIcon size={14} /> Links or Comments
                        </label>
                        <textarea 
                            value={submissionText}
                            onChange={(e) => setSubmissionText(e.target.value)}
                            placeholder="Paste your GitHub link, Google Drive, or final notes here..."
                            className="w-full h-32 p-4 bg-slate-50 dark:bg-[#020617] border border-slate-200 dark:border-slate-800 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none resize-none dark:text-slate-200 transition-all"
                        />
                    </div>

                    <div className="mb-8">
                        <label className="flex items-center gap-2 text-sm font-bold text-slate-400 uppercase tracking-widest mb-3">
                            <Upload size={14} /> Local Attachments
                        </label>
                        <label className="flex flex-col items-center justify-center w-full h-24 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-2xl cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all group">
                            <div className="flex items-center gap-3">
                                <FileIcon size={20} className="text-indigo-500 group-hover:scale-110 transition-transform" />
                                <span className="text-sm font-semibold text-slate-500">
                                    {selectedFiles ? `${selectedFiles.length} files selected` : "Browse local files"}
                                </span>
                            </div>
                            <input type="file" multiple className="hidden" onChange={(e) => setSelectedFiles(e.target.files)} />
                        </label>
                    </div>

                    <button 
                        disabled={loading}
                        onClick={() => onSubmit(submissionText, selectedFiles)}
                        className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-black text-lg transition-all shadow-lg shadow-indigo-500/20 flex items-center justify-center gap-3 disabled:opacity-50"
                    >
                        {loading ? <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin" /> : <>Confirm Submission <Send size={20} /></>}
                    </button>
                </div>
            </motion.div>
        </div>
    );
};

// --- MAIN PAGE COMPONENT ---
const CollaboratorTasks = () => {
    const { data: session } = useSession();
    const [tasks, setTasks] = useState<Task[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [activeTaskId, setActiveTaskId] = useState<string | null>(null);
    const [submitting, setSubmitting] = useState(false);

    const fetchMyWork = async () => {
        try {
            const res = await api.get<Task[]>("/api/v1/tasks/collaborator/my-assignments", {
                headers: { Authorization: `Bearer ${session?.accessToken}` }
            });
            setTasks(res.data);
        } catch (error) { toast.error("Failed to load tasks"); }
    };

    const handleAction = async (id: string, status: Task["status"]) => {
        try {
            await api.patch(`/api/v1/tasks/collaborator/status/${id}`, { status }, {
                headers: { Authorization: `Bearer ${session?.accessToken}` }
            });
            toast.success(`Task ${status}`);
            fetchMyWork();
        } catch (error) { toast.error("Action failed"); }
    };

    const handleFinalSubmit = async (text: string, files: FileList | null) => {
        if (!activeTaskId) return;
        setSubmitting(true);
        const formData = new FormData();
        formData.append("workInfo", text);
        if (files) Array.from(files).forEach(file => formData.append("files", file));

        try {
            await api.post(`/api/v1/tasks/collaborator/submit/${activeTaskId}`, formData, {
                headers: { 
                    Authorization: `Bearer ${session?.accessToken}`,
                }
            });
            toast.success("Job submitted successfully!");
            setIsModalOpen(false);
            fetchMyWork();
        } catch (error) { toast.error("Submission failed"); }
        finally { setSubmitting(false); }
    };

    useEffect(() => { if (session) fetchMyWork(); }, [session]);

    return (
        <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#030712] p-6 lg:p-12 transition-colors duration-500">
            <AnimatePresence>
                {isModalOpen && (
                    <SubmitModal 
                        isOpen={isModalOpen} 
                        loading={submitting} 
                        onClose={() => setIsModalOpen(false)} 
                        onSubmit={handleFinalSubmit} 
                    />
                )}
            </AnimatePresence>

            <div className="max-w-5xl mx-auto">
                <header className="mb-12">
                    <h1 className="text-4xl font-black dark:text-white tracking-tight">
                        Collaborator <span className="text-indigo-600">Workspace</span>
                    </h1>
                    <p className="text-slate-500 mt-2 font-medium">Accept assignments and deliver your high-quality work.</p>
                </header>

                <div className="grid gap-6">
                    {tasks.map((task: Task) => (
                        <motion.div 
                            layout initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                            key={task._id}
                            className="bg-white dark:bg-[#0B0F1A] border border-slate-200 dark:border-slate-800 rounded-[2.5rem] p-8 shadow-sm group hover:border-indigo-500/30 transition-all"
                        >
                            <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-8">
                                <div className="flex gap-6">
                                    <div className="w-14 h-14 bg-indigo-500/10 rounded-[1.2rem] flex items-center justify-center text-indigo-600 border border-indigo-500/20">
                                        <FileCode size={28} />
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-bold dark:text-white group-hover:text-indigo-500 transition-colors">{task.title}</h3>
                                        <div className="flex items-center gap-4 mt-2">
                                            <span className="text-sm font-bold text-slate-400 uppercase tracking-widest">{task.category}</span>
                                            <span className="w-1 h-1 bg-slate-300 rounded-full" />
                                            <div className="flex items-center gap-2 text-xs font-black uppercase text-indigo-500 bg-indigo-500/5 px-3 py-1 rounded-full">
                                                <Clock size={12} /> {task.status}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-wrap items-center gap-4">
                                    {task.status === "assigned" && (
                                        <>
                                            <button onClick={() => handleAction(task._id, "accepted")} className="flex-1 lg:flex-none flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-4 rounded-2xl font-black transition-all shadow-lg shadow-emerald-500/20"><CheckCircle size={20} /> Accept</button>
                                            <button onClick={() => handleAction(task._id, "rejected")} className="flex-1 lg:flex-none flex items-center justify-center gap-2 bg-rose-500/10 text-rose-500 hover:bg-rose-500 hover:text-white px-8 py-4 rounded-2xl font-black transition-all"><XCircle size={20} /> Reject</button>
                                        </>
                                    )}

                                    {task.status === "accepted" && (
                                        <button 
                                            onClick={() => { setActiveTaskId(task._id); setIsModalOpen(true); }}
                                            className="w-full lg:w-auto flex items-center justify-center gap-3 bg-indigo-600 hover:bg-indigo-700 text-white px-10 py-4 rounded-2xl font-black transition-all shadow-xl shadow-indigo-500/25"
                                        >
                                            <Send size={20} /> Submit Completion
                                        </button>
                                    )}

                                    {task.status === "completed" && (
                                        <div className="flex items-center gap-3 text-emerald-500 font-black bg-emerald-500/10 px-8 py-4 rounded-2xl border border-emerald-500/20">
                                            <Check size={24} strokeWidth={3} /> Job Delivered
                                        </div>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    ))}

                    {tasks.length === 0 && (
                        <div className="text-center py-20 bg-slate-50 dark:bg-[#0B0F1A] rounded-[3rem] border border-dashed border-slate-200 dark:border-slate-800">
                            <Clock size={48} className="mx-auto text-slate-300 mb-4" />
                            <p className="text-slate-500 font-bold">No tasks assigned to you yet.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CollaboratorTasks;