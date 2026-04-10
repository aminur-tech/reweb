"use client";

import React, { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { useSession } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";
import { 
    User, 
    Clock, 
    Edit3, 
    Trash2, 
    X, 
    Upload, 
    FileText, 
    Paperclip,
    AlertCircle
} from "lucide-react";
import { toast } from "sonner";

type Task = {
    _id: string;
    title: string;
    description: string;
    category: string;
    status: string;
    attachments: string[];
    collaborator?: {
        name: string;
        email: string;
    };
    createdAt: string;
};

const statusColor = (status: string) => {
    switch (status) {
        case "pending": return "bg-amber-100 text-amber-700 border-amber-200";
        case "assigned": return "bg-blue-100 text-blue-700 border-blue-200";
        case "accepted": return "bg-emerald-100 text-emerald-700 border-emerald-200";
        case "completed": return "bg-purple-100 text-purple-700 border-purple-200";
        case "rejected": return "bg-red-100 text-red-700 border-red-200";
        default: return "bg-slate-100 text-slate-700 border-slate-200";
    }
};

const MyTask = () => {
    const { data: session } = useSession();
    const [tasks, setTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState(true);

    // Edit States
    const [editingTask, setEditingTask] = useState<Task | null>(null);
    const [editTitle, setEditTitle] = useState("");
    const [editDescription, setEditDescription] = useState("");
    const [editFiles, setEditFiles] = useState<File[]>([]);
    const [updating, setUpdating] = useState(false);

    // Fetch tasks
    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const token = session?.accessToken;
                const res = await api.get("/api/v1/tasks/my", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setTasks(res.data);
            } catch (error) {
                console.error("Fetch tasks error:", error);
                toast.error("Failed to load tasks");
            } finally {
                setLoading(false);
            }
        };

        if (session?.accessToken) fetchTasks();
    }, [session]);

    // Delete Task
    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this task?")) return;

        try {
            const token = session?.accessToken;
            await api.delete(`/api/v1/tasks/my/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setTasks((prev) => prev.filter((task) => task._id !== id));
            toast.success("Task deleted successfully");
        } catch (error) {
            toast.error("Delete failed");
        }
    };

    // Open Edit Modal
    const handleEditOpen = (task: Task) => {
        setEditingTask(task);
        setEditTitle(task.title);
        setEditDescription(task.description);
        setEditFiles([]);
    };

    // Update Task (Using FormData for Files)
    const handleUpdate = async () => {
        if (!editingTask) return;
        setUpdating(true);

        try {
            const token = session?.accessToken;
            const formData = new FormData();
            formData.append("title", editTitle);
            formData.append("description", editDescription);
            editFiles.forEach((file) => formData.append("files", file));

            const res = await api.patch(
                `/api/v1/tasks/my/${editingTask._id}`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            setTasks((prev) =>
                prev.map((t) => (t._id === editingTask._id ? res.data.data : t))
            );

            toast.success("Task updated successfully!");
            setEditingTask(null);
        } catch (error) {
            console.error("Update failed:", error);
            toast.error("Failed to update task");
        } finally {
            setUpdating(false);
        }
    };

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
        </div>
    );

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-[#030712] p-4 lg:p-8">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="mb-10">
                    <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">
                        Task <span className="text-indigo-600">Inventory</span>
                    </h1>
                    <p className="text-slate-500 dark:text-slate-400 mt-2 font-medium">
                        Manage your active requests and project updates.
                    </p>
                </div>

                {tasks.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-20 bg-white dark:bg-slate-900 border border-dashed border-slate-200 dark:border-slate-800 rounded-3xl">
                        <FileText size={48} className="text-slate-300 mb-4" />
                        <p className="text-slate-500 font-medium">No tasks found in your history.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {tasks.map((task) => (
                            <motion.div
                                key={task._id}
                                layoutId={task._id}
                                className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[2rem] p-6 shadow-sm hover:shadow-xl hover:shadow-indigo-500/5 transition-all group"
                            >
                                <div className="flex justify-between items-start gap-4 mb-4">
                                    <div>
                                        <span className="text-[10px] uppercase tracking-widest font-black text-indigo-500 mb-1 block">
                                            {task.category}
                                        </span>
                                        <h2 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 transition-colors">
                                            {task.title}
                                        </h2>
                                    </div>
                                    <span className={`px-4 py-1.5 text-[10px] font-black uppercase tracking-tighter rounded-full border ${statusColor(task.status)}`}>
                                        {task.status}
                                    </span>
                                </div>

                                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-6 line-clamp-3">
                                    {task.description}
                                </p>

                                <div className="flex flex-wrap gap-4 items-center justify-between pt-6 border-t border-slate-100 dark:border-slate-800">
                                    <div className="flex items-center gap-4">
                                        <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium">
                                            <Clock size={14} />
                                            {new Date(task.createdAt).toLocaleDateString()}
                                        </div>
                                        {task.collaborator && (
                                            <div className="flex items-center gap-1.5 text-xs text-indigo-500 font-bold bg-indigo-50 dark:bg-indigo-500/10 px-2 py-1 rounded-lg">
                                                <User size={14} />
                                                {task.collaborator.name}
                                            </div>
                                        )}
                                    </div>

                                    <div className="flex gap-2">
                                        <button 
                                            onClick={() => handleEditOpen(task)}
                                            className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-500/10 rounded-xl transition-all"
                                        >
                                            <Edit3 size={18} />
                                        </button>
                                        <button 
                                            onClick={() => handleDelete(task._id)}
                                            className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-xl transition-all"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>

            {/* MODAL ANIMATION */}
            <AnimatePresence>
                {editingTask && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <motion.div 
                            initial={{ opacity: 0 }} 
                            animate={{ opacity: 1 }} 
                            exit={{ opacity: 0 }}
                            onClick={() => setEditingTask(null)}
                            className="absolute inset-0 bg-slate-900/60 backdrop-blur-md"
                        />
                        <motion.div 
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            className="relative bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[2.5rem] w-full max-w-xl shadow-2xl overflow-hidden"
                        >
                            <div className="p-8 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
                                <div>
                                    <h2 className="text-2xl font-black text-slate-900 dark:text-white">Update <span className="text-indigo-600">Task</span></h2>
                                    <p className="text-slate-500 text-xs mt-1 font-medium">Modify your requirements or add files.</p>
                                </div>
                                <button onClick={() => setEditingTask(null)} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full text-slate-400 transition-colors">
                                    <X size={24}/>
                                </button>
                            </div>

                            <div className="p-8 space-y-6">
                                <div>
                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 block">Project Title</label>
                                    <input
                                        value={editTitle}
                                        onChange={(e) => setEditTitle(e.target.value)}
                                        className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-2xl px-5 py-3 focus:ring-2 focus:ring-indigo-500 outline-none text-slate-900 dark:text-white font-medium transition-all"
                                    />
                                </div>

                                <div>
                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 block">Task Description</label>
                                    <textarea
                                        rows={4}
                                        value={editDescription}
                                        onChange={(e) => setEditDescription(e.target.value)}
                                        className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-2xl px-5 py-3 focus:ring-2 focus:ring-indigo-500 outline-none text-slate-900 dark:text-white transition-all resize-none leading-relaxed"
                                    />
                                </div>

                                <div>
                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 block">Upload New Files</label>
                                    <div className="relative group">
                                        <div className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-2xl group-hover:border-indigo-500 group-hover:bg-indigo-500/5 transition-all cursor-pointer">
                                            <Upload size={24} className="text-slate-400 group-hover:text-indigo-500 mb-2" />
                                            <p className="text-xs font-bold text-slate-500">{editFiles.length > 0 ? `${editFiles.length} files staged` : "Drag or click to add files"}</p>
                                        </div>
                                        <input
                                            type="file"
                                            multiple
                                            onChange={(e) => e.target.files && setEditFiles(Array.from(e.target.files))}
                                            className="absolute inset-0 opacity-0 cursor-pointer"
                                        />
                                    </div>
                                    {editFiles.length > 0 && (
                                        <div className="mt-3 flex flex-wrap gap-2">
                                            {editFiles.map((f, i) => (
                                                <div key={i} className="flex items-center gap-1.5 bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 px-3 py-1 rounded-full text-[10px] font-bold">
                                                    <Paperclip size={10} /> {f.name}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="p-8 bg-slate-50 dark:bg-slate-800/30 flex flex-col sm:flex-row justify-between items-center gap-4">
                                <div className="flex items-center gap-2 text-amber-600 bg-amber-50 dark:bg-amber-500/10 px-4 py-2 rounded-xl">
                                    <AlertCircle size={16} />
                                    <span className="text-[10px] font-bold uppercase tracking-tight">Requires Admin Review</span>
                                </div>
                                <div className="flex gap-4 w-full sm:w-auto">
                                    <button
                                        onClick={() => setEditingTask(null)}
                                        className="flex-1 sm:flex-none px-6 py-3 text-sm font-black text-slate-500 hover:text-slate-800 transition-colors"
                                    >
                                        DISCARD
                                    </button>
                                    <button
                                        onClick={handleUpdate}
                                        disabled={updating}
                                        className="flex-1 sm:flex-none px-10 py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-black text-sm shadow-xl shadow-indigo-500/20 active:scale-95 transition-all disabled:opacity-50"
                                    >
                                        {updating ? "SYNCING..." : "SAVE CHANGES"}
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default MyTask;