"use client";

import React, { useState, useEffect } from "react";
import DashboardNavbar from "@/components/dashboard/DashboardNavbar";
import Sidebar from "@/components/dashboard/Sidebar";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  // Responsive check
  useEffect(() => {
    const checkRes = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      if (mobile) setSidebarOpen(false); // Close by default on mobile
      else setSidebarOpen(true);        // Open by default on desktop
    };
    checkRes();
    window.addEventListener("resize", checkRes);
    return () => window.removeEventListener("resize", checkRes);
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-500">
      <Sidebar 
        open={sidebarOpen} 
        setOpen={setSidebarOpen} 
        isMobile={isMobile} 
        closeSidebar={() => isMobile && setSidebarOpen(false)} 
      />
      
      <div className="flex-1 flex flex-col min-w-0">
        <DashboardNavbar onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
        <main className="p-4 md:p-6 flex-1 overflow-x-hidden">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;