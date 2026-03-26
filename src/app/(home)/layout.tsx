import Footer from "@/components/footer/Footer";
import Navbar from "@/components/header/Navbar";

export default function HomeLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-[#f8fafc] dark:bg-[#030712] text-[#0f172a] dark:text-[#f1f5f9] transition-colors duration-500">
      {/* Background Glows */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
         <div className="absolute top-[-5%] left-[-5%] w-[45%] h-[45%] bg-indigo-500/15 dark:bg-indigo-600/10 blur-[130px] rounded-full animate-pulse-slow" />
      </div>

      <Navbar />
      <main className="flex-grow pt-20 relative z-0">
        {children}
      </main>
      <Footer />
    </div>
  );
}