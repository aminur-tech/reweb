"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  Users,
  Settings,
  FolderKanban,
  ShieldCheck,
  ChevronLeft,
  Sparkles,
  UserCircle,
  Briefcase,
  Brain
} from "lucide-react";
import { useAdmin } from "../hooks/useAdmin";
import Logo from "../logo/Logo";


interface SidebarProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isMobile: boolean;
  closeSidebar: () => void;
}

const Sidebar = ({ open, setOpen, isMobile, closeSidebar }: SidebarProps) => {
  const { isAdmin, user, isLoading } = useAdmin();
  const pathname = usePathname();

  const role = user?.role;

  // Active link helper
  const isActive = (path: string) => pathname === path;

  return (
    <aside
      className={`fixed lg:sticky top-0 bg-white dark:bg-[#030712] border-r border-slate-200 dark:border-slate-800 h-screen transition-all duration-500 ease-in-out flex flex-col z-50 lg:z-40 ${open
        ? "w-72 translate-x-0"
        : isMobile
          ? "w-0 -translate-x-full border-none overflow-hidden"
          : "w-24 translate-x-0"
        }`}
    >
      {/* Collapse Toggle */}
      <button
        onClick={() => setOpen(!open)}
        className="absolute -right-0 top-9 w-6 h-6 bg-indigo-600 text-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform z-50"
      >
        <ChevronLeft size={14} className={`transition-transform duration-500 ${!open ? "rotate-180" : ""}`} />
      </button>

      {/* Logo Section */}
      <div className="p-6 mb-4">
        <Logo/>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 px-4 space-y-2 overflow-y-auto no-scrollbar">
        <p className={`text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4 ml-2 ${!open && "text-center ml-0"}`}>
          {open ? "Main Menu" : "•••"}
        </p>

        <SidebarItem
          href="/dashboard"
          icon={<LayoutDashboard size={20} />}
          label="Dashboard"
          open={open}
          active={isActive("/dashboard")}
          onClick={closeSidebar}
        />

        {/* Admin Section */}
        {!isLoading && isAdmin && (
          <>
            <div className="my-4 border-t border-slate-100 dark:border-slate-800" />

            <p className={`text-[10px] font-bold text-indigo-500 uppercase tracking-widest mb-4 ml-2 ${!open && "text-center ml-0"}`}>
              {open ? "Admin Panel" : "Adm"}
            </p>

            <SidebarItem
              href="/dashboard/admin/tasks"
              icon={<ShieldCheck size={20} />}
              label="Manage Tasks"
              open={open}
              active={pathname.startsWith("/dashboard/admin/tasks")}
              onClick={closeSidebar}
            />

            <SidebarItem
              href="/dashboard/admin/assign"
              icon={<Users size={20} />}
              label="Assign Task"
              open={open}
              active={pathname.startsWith("/dashboard/admin/assign")}
              onClick={closeSidebar}
            />

            <SidebarItem
              href="/dashboard/admin/projects"
              icon={<FolderKanban size={20} />}
              label="Projects"
              open={open}
              active={pathname.startsWith("/dashboard/admin/projects")}
              onClick={closeSidebar}
            />
          </>
        )}

        {/* Client Section */}
        {role === "client" && (
          <>
            <div className="my-4 border-t border-slate-100 dark:border-slate-800" />

            <p className={`text-[10px] font-bold text-green-500 uppercase tracking-widest mb-4 ml-2 ${!open && "text-center ml-0"}`}>
              {open ? "Client Panel" : "Cli"}
            </p>

            <SidebarItem
              href="/dashboard/client/provide-task"
              icon={<UserCircle size={20} />}
              label="Provide Task"
              open={open}
              active={pathname.startsWith("/dashboard/client/provide-task")}
              onClick={closeSidebar}
            />

            <SidebarItem
              href="/dashboard/client/my-tasks"
              icon={<Briefcase size={20} />}
              label="My Tasks"
              open={open}
              active={pathname.startsWith("/dashboard/client/my-tasks")}
              onClick={closeSidebar}
            />
          </>
        )}

        {/* Collaborator Section */}
        {role === "collaborator" && (
          <>
            <div className="my-4 border-t border-slate-100 dark:border-slate-800" />

            <p className={`text-[10px] font-bold text-purple-500 uppercase tracking-widest mb-4 ml-2 ${!open && "text-center ml-0"}`}>
              {open ? "Workspace" : "Col"}
            </p>

            <SidebarItem
              href="/dashboard/collaborator/tasks"
              icon={<Briefcase size={20} />}
              label="Assigned Tasks"
              open={open}
              active={pathname.startsWith("/dashboard/collaborator/tasks")}
              onClick={closeSidebar}
            />
          </>
        )}
        {/* profile */}
        <SidebarItem
          href="/dashboard/profile"
          icon={<Users size={20} />}
          label="Profile"
          open={open}
          active={isActive("/dashboard/profile")}
          onClick={closeSidebar}
        />

        <SidebarItem
          href="/dashboard/ai-charts"
          icon={<Brain size={20} />}
          label="AI Charts"
          open={open}
          active={isActive("/dashboard/ai-charts")}
          onClick={closeSidebar}
        />
      </nav>

      {/* Bottom Section */}
      <div className="p-4 border-t border-slate-100 dark:border-slate-800">
        <SidebarItem
          href="/dashboard/settings"
          icon={<Settings size={20} />}
          label="Settings"
          open={open}
          active={isActive("/dashboard/settings")}
          onClick={closeSidebar}
        />
      </div>
    </aside>
  );
};

// --- Sub-component for Sidebar Items ---
interface SidebarItemProps {
  href: string;
  icon: React.ReactNode;
  label: string;
  open: boolean;
  active: boolean;
  onClick?: () => void;
}

const SidebarItem = ({ href, icon, label, open, active, onClick }: SidebarItemProps) => {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`group relative flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all duration-300 ${active
        ? "bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 shadow-sm"
        : "text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:text-slate-900 dark:hover:text-white"
        }`}
    >
      <div className={`transition-transform duration-300 ${active ? "scale-110" : "group-hover:scale-110"}`}>
        {icon}
      </div>

      <AnimatePresence>
        {open && (
          <motion.span
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            className="text-sm font-bold whitespace-nowrap"
          >
            {label}
          </motion.span>
        )}
      </AnimatePresence>

      {/* Active Indicator Pin */}
      {active && (
        <motion.div
          layoutId="active-pill"
          className="absolute left-0 w-1 h-6 bg-indigo-600 rounded-r-full"
        />
      )}
    </Link>
  );
};

export default Sidebar;