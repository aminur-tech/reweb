"use client";

import React, { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { useSession } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";
import { 
    UserPlus, 
    Briefcase, 
    Search, 
    ChevronRight, 
    CheckCircle2, 
    Users,
    LayoutGrid
} from "lucide-react";
import { toast } from "sonner";

type Task = {
    _id: string;
    title: string;
    category: string;
    status: string;
    clientName: string;
};

type Collaborator = {
    _id: string;
    name: string;
    email: string;
    role: string;
};

const AssignTask = () => {
    const { data: session } = useSession();
    const [tasks, setTasks] = useState<Task[]>([]);
    const [collaborators, setCollaborators] = useState<Collaborator[]>([]);
    const [loading, setLoading] = useState(true);
    
    // Selection States
    const [selectedTask, setSelectedTask] = useState<Task | null>(null);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = session?.accessToken;
                const [tasksRes, collabRes] = await Promise.all([
                    api.get("/api/v1/tasks/unassigned", { headers: { Authorization: `Bearer ${token}` } }),
                    api.get("/api/v1/auth/collaborators", { headers: { Authorization: `Bearer ${token}` } })
                ]);
                setTasks(tasksRes.data);
                setCollaborators(collabRes.data);
            } catch (error) {
                toast.error("Failed to load assignment data");
            } finally {
                setLoading(false);
            }
        };
        if (session?.accessToken) fetchData();
    }, [session]);

    const handleAssign = async (collaboratorId: string) => {
        if (!selectedTask) return;
        
        try {
            const token = session?.accessToken;
            await api.patch("/api/v1/tasks/assign", {
                projectId: selectedTask._id,
                collaboratorId
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });

            toast.success(`Task assigned to collaborator!`);
            setTasks(prev => prev.filter(t => t._id !== selectedTask._id));
            setSelectedTask(null);
        } catch (error) {
            toast.error("Assignment failed");
        }
    };

    if (loading) return <div className="p-10 text-center animate-pulse">Loading Workspace...</div>;

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-[#030712] p-4 lg:p-10">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
                
                {/* LEFT: Task List */}
                <div className="lg:col-span-7 space-y-6">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h1 className="text-3xl font-black text-slate-900 dark:text-white">Assign <span className="text-indigo-600">Work</span></h1>
                            <p className="text-slate-500 text-sm mt-1">Direct unassigned client requests to the right experts.</p>
                        </div>
                        <div className="bg-indigo-600/10 text-indigo-600 px-4 py-2 rounded-2xl flex items-center gap-2">
                            <Briefcase size={18} />
                            <span className="font-bold text-sm">{tasks.length} Pending</span>
                        </div>
                    </div>

                    <div className="grid gap-4">
                        {tasks.map((task) => (
                            <motion.div
                                key={task._id}
                                onClick={() => setSelectedTask(task)}
                                className={`cursor-pointer p-6 rounded-[2rem] border transition-all ${
                                    selectedTask?._id === task._id 
                                    ? "bg-white dark:bg-indigo-600/10 border-indigo-500 shadow-xl shadow-indigo-500/10" 
                                    : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-slate-300"
                                }`}
                            >
                                <div className="flex justify-between items-center">
                                    <div>
                                        <span className="text-[10px] font-black uppercase text-indigo-500 tracking-widest">{task.category}</span>
                                        <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-1">{task.title}</h3>
                                        <p className="text-xs text-slate-500 mt-1 flex items-center gap-1">
                                            <Users size={12}/> Client: {task.clientName}
                                        </p>
                                    </div>
                                    <ChevronRight className={selectedTask?._id === task._id ? "text-indigo-500" : "text-slate-300"} />
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* RIGHT: Collaborator Selection */}
                <div className="lg:col-span-5">
                    <AnimatePresence mode="wait">
                        {selectedTask ? (
                            <motion.div 
                                initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}
                                className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 p-8 sticky top-10"
                            >
                                <div className="mb-6">
                                    <h2 className="text-xl font-black text-slate-900 dark:text-white mb-2">Assigning Specialist</h2>
                                    <p className="text-slate-500 text-sm italic">&quot;{selectedTask.title}&quot;</p>
                                </div>

                                <div className="relative mb-6">
                                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                    <input 
                                        placeholder="Search specialists..."
                                        className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-2xl py-3 pl-12 pr-4 text-sm outline-none focus:ring-2 focus:ring-indigo-500"
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                    />
                                </div>

                                <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                                    {collaborators
                                        .filter(c => c.name.toLowerCase().includes(searchQuery.toLowerCase()))
                                        .map(collab => (
                                            <button
                                                key={collab._id}
                                                onClick={() => handleAssign(collab._id)}
                                                className="w-full group flex items-center justify-between p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 hover:bg-indigo-600 transition-all text-left"
                                            >
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-indigo-600 font-bold group-hover:bg-white/20 group-hover:text-white">
                                                        {collab.name[0]}
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-white">{collab.name}</p>
                                                        <p className="text-[10px] text-slate-500 group-hover:text-white/70">{collab.role}</p>
                                                    </div>
                                                </div>
                                                <UserPlus size={18} className="text-slate-400 group-hover:text-white" />
                                            </button>
                                        ))}
                                </div>
                            </motion.div>
                        ) : (
                            <div className="h-full min-h-[400px] border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-[2.5rem] flex flex-col items-center justify-center text-center p-10">
                                <LayoutGrid size={48} className="text-slate-200 dark:text-slate-800 mb-4" />
                                <h3 className="text-slate-400 font-bold">Select a task to start assignment</h3>
                            </div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
};

export default AssignTask;