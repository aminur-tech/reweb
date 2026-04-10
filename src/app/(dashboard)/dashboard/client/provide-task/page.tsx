"use client";
import React, { useState, useCallback } from "react";
import { motion } from "framer-motion";
import {
    Upload,
    Send,
    X,
    Paperclip,
    Info,
    Code2,
    Search,
    CheckCircle2
} from "lucide-react";
import { toast } from "sonner";
// Import your custom axios instance
import { api } from "@/lib/api";
import { useSession } from "next-auth/react";

const ProvideTask = () => {
    const { data: session } = useSession();
    const [files, setFiles] = useState<File[]>([]);
    const [isDragging, setIsDragging] = useState(false);
    const [loading, setLoading] = useState(false);
    const [taskData, setTaskData] = useState({
        title: "",
        description: "",
        category: "web-development"
    });

    const onDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        if (e.dataTransfer.files) {
            const uploadedFiles = Array.from(e.dataTransfer.files);
            setFiles((prev) => [...prev, ...uploadedFiles]);
        }
    }, []);

    const removeFile = (index: number) => {
        setFiles(files.filter((_, i) => i !== index));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!taskData.title.trim() || !taskData.description.trim()) {
            return toast.error("Please fill in all required fields.");
        }

        setLoading(true);

        try {
            const formData = new FormData();

            // existing fields
            formData.append("title", taskData.title);
            formData.append("description", taskData.description);
            formData.append("category", taskData.category);

            // ✅ NEW: auto from session
            formData.append("clientName", session?.user?.name || "");
            formData.append("clientEmail", session?.user?.email || "");
            formData.append("clientImage", session?.user?.image || "");

            // optional (if you want company & address later from DB or default)
            formData.append("companyName", "N/A");
            formData.append("address", "N/A");

            // ✅ added by (better to use id/email)
            formData.append("addedBy", session?.user?.email || "");

            // files
            files.forEach((file) => {
                formData.append("files", file);
            });

            // token
            const token = session?.accessToken;

            const response = await api.post("/api/v1/tasks", formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.data) {
                toast.success("Task submitted successfully!", {
                    description: "Our team will review your requirements shortly.",
                    icon: <CheckCircle2 className="text-green-500" />,
                });

                // reset
                setFiles([]);
                setTaskData({
                    title: "",
                    description: "",
                    category: "web-development",
                });
            }
        } catch (error: unknown) {
            let errorMessage = "Something went wrong.";

            if (error && typeof error === "object" && "response" in error) {
                const axiosError = error as {
                    response?: { data?: { message?: string } };
                };
                errorMessage = axiosError.response?.data?.message || errorMessage;
            } else if (error instanceof Error) {
                errorMessage = error.message;
            }

            toast.error("Submission Failed", { description: errorMessage });
            console.error("Submission Error:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-[#030712] p-4 lg:p-8">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-4xl mx-auto"
            >
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white">
                        Submit New <span className="text-indigo-600">Task</span>
                    </h1>
                    <p className="text-slate-500 dark:text-slate-400 mt-2 font-medium">
                        Fill in the details. Our expert collaborators will bring your ideas to life.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 lg:p-8 backdrop-blur-xl shadow-sm">
                        <div className="grid grid-cols-1 gap-8">

                            {/* Category Selector */}
                            <div>
                                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-4 uppercase tracking-wider">
                                    Select Category
                                </label>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {[
                                        { id: "web-development", label: "Web Development", icon: <Code2 size={20} />, desc: "SaaS, Landing Pages, & Apps" },
                                        { id: "research", label: "Research", icon: <Search size={20} />, desc: "Analysis & Documentation" }
                                    ].map((cat) => (
                                        <div
                                            key={cat.id}
                                            onClick={() => setTaskData({ ...taskData, category: cat.id })}
                                            className={`relative cursor-pointer p-4 rounded-2xl border-2 transition-all duration-300 ${taskData.category === cat.id
                                                ? "border-indigo-600 bg-indigo-50/50 dark:bg-indigo-500/10"
                                                : "border-slate-100 dark:border-slate-800 hover:border-slate-200 dark:hover:border-slate-700"
                                                }`}
                                        >
                                            <div className="flex items-center gap-3 mb-1">
                                                <div className={`${taskData.category === cat.id ? "text-indigo-600" : "text-slate-400"}`}>
                                                    {cat.icon}
                                                </div>
                                                <span className="font-bold text-slate-900 dark:text-white">{cat.label}</span>
                                                {taskData.category === cat.id && (
                                                    <CheckCircle2 size={16} className="ml-auto text-indigo-600" />
                                                )}
                                            </div>
                                            <p className="text-xs text-slate-500 dark:text-slate-400">{cat.desc}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Title */}
                            <div>
                                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2 uppercase tracking-wider">
                                    Project Title
                                </label>
                                <input
                                    type="text"
                                    placeholder="Enter a descriptive title"
                                    className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500 outline-none transition-all dark:text-white font-medium"
                                    value={taskData.title}
                                    onChange={(e) => setTaskData({ ...taskData, title: e.target.value })}
                                    required
                                />
                            </div>

                            {/* Description */}
                            <div>
                                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2 uppercase tracking-wider">
                                    Detailed Requirements or provide a link to a document (Google Docs, Notion, etc.)
                                </label>
                                <textarea
                                    rows={5}
                                    placeholder="Provide context, goals, and technical requirements..."
                                    className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500 outline-none transition-all dark:text-white resize-none"
                                    value={taskData.description}
                                    onChange={(e) => setTaskData({ ...taskData, description: e.target.value })}
                                    required
                                />
                            </div>

                            {/* Upload Zone */}
                            <div>
                                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2 uppercase tracking-wider">
                                    Project Files
                                </label>
                                <div
                                    onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                                    onDragLeave={() => setIsDragging(false)}
                                    onDrop={onDrop}
                                    className={`relative border-2 border-dashed rounded-2xl p-10 transition-all flex flex-col items-center justify-center gap-3 ${isDragging
                                        ? "border-indigo-500 bg-indigo-50/50 dark:bg-indigo-500/10"
                                        : "border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700"
                                        }`}
                                >
                                    <div className="p-4 bg-indigo-100 dark:bg-indigo-500/20 rounded-full text-indigo-600 dark:text-indigo-400 pointer-events-none">
                                        <Upload size={32} />
                                    </div>
                                    <div className="text-center pointer-events-none">
                                        <p className="text-slate-700 dark:text-slate-200 font-bold">Upload from computer</p>
                                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Drag files here or click to browse</p>
                                    </div>
                                    <input
                                        type="file"
                                        multiple
                                        className="absolute inset-0 opacity-0 cursor-pointer"
                                        onChange={(e) => {
                                            if (e.target.files) setFiles(prev => [...prev, ...Array.from(e.target.files!)])
                                        }}
                                    />
                                </div>

                                {/* File List */}
                                {files.length > 0 && (
                                    <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                                        {files.map((file, index) => (
                                            <div key={index} className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700 group">
                                                <div className="flex items-center gap-3 overflow-hidden">
                                                    <Paperclip size={16} className="text-indigo-500 shrink-0" />
                                                    <span className="text-sm font-medium dark:text-slate-200 truncate">{file.name}</span>
                                                </div>
                                                <button
                                                    type="button"
                                                    onClick={() => removeFile(index)}
                                                    className="text-slate-400 hover:text-red-500 transition-colors ml-2"
                                                >
                                                    <X size={18} />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Footer Action */}
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-3xl shadow-sm">
                        <div className="flex items-center gap-3 text-slate-500 dark:text-slate-400 text-sm font-medium">
                            <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg">
                                <Info size={18} className="text-indigo-600" />
                            </div>
                            <span>Admins will contact you after review.</span>
                        </div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white px-10 py-4 rounded-2xl font-black transition-all shadow-lg shadow-indigo-500/25 active:scale-95"
                        >
                            {loading ? "Processing..." : (
                                <>
                                    <Send size={18} />
                                    Post Task
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </motion.div>
        </div>
    );
};

export default ProvideTask;