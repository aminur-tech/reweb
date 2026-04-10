"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid,
    Tooltip, ResponsiveContainer, Cell, PieChart, Pie
} from "recharts";
import {
    LayoutDashboard, CheckCircle2, Clock,
    XCircle, UserPlus, Briefcase, Layers,
    TrendingUp, Activity
} from "lucide-react";
import { api } from "@/lib/api";
import { useSession } from "next-auth/react";
import { toast } from "sonner";

// --- Types ---
interface StatusStat {
    name: string;
    value: number;
    color: string;
}

interface CategoryStat {
    category: string;
    count: number;
}
interface StatusStatRaw {
    name: string;
    value: number;
}

const DashboardOverview = () => {
    const { data: session } = useSession();
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState<StatusStat[]>([]);
    const [categories, setCategories] = useState<CategoryStat[]>([]);
    const [total, setTotal] = useState(0);

    const colorMap: Record<string, string> = {
        Pending: "#f59e0b",   // Amber
        Assigned: "#3b82f6",  // Blue
        Accepted: "#8b5cf6",  // Purple
        Completed: "#10b981", // Emerald
        Rejected: "#ef4444",  // Rose
    };

    const fetchAnalytics = async () => {
        try {
            const token = session?.accessToken;
            const res = await api.get("/api/v1/tasks/analytics", {
                headers: { Authorization: `Bearer ${token}` }
            });

            if (res.data.success) {
                const formattedStats = res.data.data.statusStats.map((s: StatusStatRaw) => ({
                    ...s,
                    color: colorMap[s.name] || "#64748b"
                }));
                setStats(formattedStats);
                setCategories(res.data.data.categoryStats);
                setTotal(res.data.data.total);
            }
        } catch (error) {
            toast.error("Failed to sync analytics");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (session?.accessToken) fetchAnalytics();
    }, [session]);

    if (loading) return (
        <div className="flex h-screen items-center justify-center bg-slate-50 dark:bg-[#030712]">
            <div className="flex flex-col items-center gap-4">
                <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
                <p className="text-slate-500 font-medium animate-pulse">Analyzing ReWeb Data...</p>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#030712] p-6 lg:p-10 transition-colors duration-500">
            <div className="max-w-7xl mx-auto">

                {/* --- HEADER SECTION --- */}
                <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                    >
                        <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-4">
                            <div className="p-2 bg-indigo-600 rounded-xl text-white">
                                <Activity size={28} />
                            </div>
                            Task <span className="text-indigo-600 font-outline-2">Analytics</span>
                        </h1>
                        <p className="text-slate-500 mt-2 font-medium">Overview of your system&apos;s operational health.</p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-white dark:bg-[#0B0F1A] border border-slate-200 dark:border-slate-800 px-6 py-3 rounded-2xl shadow-sm"
                    >
                        <span className="text-sm font-bold text-slate-400 uppercase tracking-widest">Total Projects</span>
                        <div className="text-3xl font-black text-indigo-600">{total}</div>
                    </motion.div>
                </header>

                {/* --- TOP BENTO STATS --- */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
                    {stats.map((stat, i) => (
                        <motion.div
                            key={stat.name}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="bg-white dark:bg-[#0B0F1A] p-6 rounded-[2rem] border border-slate-200 dark:border-slate-800 hover:border-indigo-500/30 transition-all shadow-sm group"
                        >
                            <div className="flex justify-between items-start mb-4">
                                <div
                                    className="p-3 rounded-2xl transition-colors"
                                    style={{ backgroundColor: `${stat.color}10`, color: stat.color }}
                                >
                                    {stat.name === "Pending" && <Clock size={20} />}
                                    {stat.name === "Completed" && <CheckCircle2 size={20} />}
                                    {stat.name === "Rejected" && <XCircle size={20} />}
                                    {stat.name === "Assigned" && <UserPlus size={20} />}
                                    {stat.name === "Accepted" && <TrendingUp size={20} />}
                                </div>
                                <span className="text-[10px] font-bold text-slate-400 group-hover:text-indigo-500 transition-colors uppercase">Status</span>
                            </div>
                            <div className="text-3xl font-black dark:text-white">{stat.value}</div>
                            <div className="text-xs font-bold text-slate-500 uppercase tracking-tighter mt-1">{stat.name}</div>
                        </motion.div>
                    ))}
                </div>

                {/* --- VISUALIZATION GRID --- */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Main Analytics Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="lg:col-span-2 bg-white dark:bg-[#0B0F1A] border border-slate-200 dark:border-slate-800 rounded-[3rem] p-8 lg:p-10 shadow-sm"
                    >
                        <h3 className="text-xl font-bold mb-8 flex items-center gap-3 dark:text-white">
                            <Layers className="text-indigo-500" /> Operational Flow
                        </h3>
                        <div className="h-[350px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={stats}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#33415510" />
                                    <XAxis
                                        dataKey="name"
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fill: '#94a3b8', fontSize: 12, fontWeight: 600 }}
                                        dy={15}
                                    />
                                    <YAxis hide />
                                    <Tooltip
                                        cursor={{ fill: 'rgba(99, 102, 241, 0.05)' }}
                                        contentStyle={{
                                            backgroundColor: '#0B0F1A',
                                            borderRadius: '16px',
                                            border: '1px solid #1e293b',
                                            color: '#fff'
                                        }}
                                        itemStyle={{ color: '#818cf8' }}
                                    />
                                    <Bar dataKey="value" radius={[12, 12, 12, 12]} barSize={50}>
                                        {stats.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </motion.div>

                    {/* Category List Card */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="bg-white dark:bg-[#0B0F1A] border border-slate-200 dark:border-slate-800 rounded-[3rem] p-8 lg:p-10 shadow-sm"
                    >
                        <h3 className="text-xl font-bold mb-8 flex items-center gap-3 dark:text-white">
                            <Briefcase className="text-indigo-500" /> Category Metrics
                        </h3>
                        <div className="space-y-7">
                            {categories.map((item, i) => (
                                <div key={i} className="group">
                                    <div className="flex justify-between items-end mb-2">
                                        <div>
                                            <span className="text-sm font-bold text-slate-400 uppercase tracking-widest block mb-1">Category</span>
                                            <span className="text-base font-bold dark:text-slate-200 group-hover:text-indigo-500 transition-colors">{item.category}</span>
                                        </div>
                                        <span className="text-xl font-black text-indigo-500">{item.count}</span>
                                    </div>
                                    <div className="w-full h-2.5 bg-slate-100 dark:bg-slate-800/50 rounded-full overflow-hidden border border-slate-200/10">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: `${(item.count / (total || 1)) * 100}%` }}
                                            transition={{ duration: 1, ease: "easeOut" }}
                                            className="h-full bg-gradient-to-r from-indigo-600 to-violet-500 rounded-full"
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>

                        {categories.length === 0 && (
                            <div className="flex flex-col items-center justify-center h-full py-10 opacity-40">
                                <Briefcase size={40} />
                                <p className="text-sm mt-2 font-medium">No category data yet</p>
                            </div>
                        )}
                    </motion.div>

                </div>
            </div>
        </div>
    );
};

export default DashboardOverview;