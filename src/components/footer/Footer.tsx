import React from 'react';
import Link from 'next/link';
import { Github, Linkedin, Twitter, Mail, ShieldCheck, Globe, Cpu } from 'lucide-react';
import Logo from '../logo/Logo';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-white dark:bg-[#030712] border-t border-slate-200 dark:border-slate-800 transition-colors duration-500 overflow-hidden">
      {/* Subtle Background Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-64 bg-violet-500/5 blur-[120px] pointer-events-none" />

      <div className="w-full md:w-11/12 mx-auto px-6 pt-20 pb-10 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-12 mb-16">
          
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-6">
            <Logo/>
            
            <p className="text-slate-500 dark:text-slate-400 text-xs leading-relaxed max-w-sm">
              Architecting the next generation of digital infrastructure. 
              High-performance engineering meeting neural-inspired design 
              for global-scale automation.
            </p>

            <div className="flex items-center gap-4 pt-2">
              {[
                { Icon: Linkedin, href: "#" },
                { Icon: Twitter, href: "#" },
                { Icon: Github, href: "#" },
                { Icon: Mail, href: "#" }
              ].map(({ Icon, href }, idx) => (
                <Link 
                  key={idx} 
                  href={href} 
                  className="p-2 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-400 hover:text-violet-500 hover:border-violet-500/50 transition-all duration-300"
                >
                  <Icon size={16} />
                </Link>
              ))}
            </div>
          </div>

          {/* Nav Columns */}
          {[
            {
              title: "Solutions",
              links: ["Market Intelligence", "Full-Stack Ops", "Neural Integration", "Security Audit"]
            },
            {
              title: "Infrastructure",
              links: ["Documentation", "API Status", "Open Source", "System Health"]
            },
            {
              title: "Company",
              links: ["About Protocol", "Research Lab", "Privacy", "Legal"]
            }
          ].map((col, idx) => (
            <div key={idx} className="space-y-6">
              <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-900 dark:text-slate-100">
                {col.title}
              </h4>
              <ul className="space-y-3">
                {col.links.map((link, i) => (
                  <li key={i}>
                    <Link href="#" className="text-xs text-slate-500 dark:text-slate-400 hover:text-violet-500 dark:hover:text-violet-400 transition-colors">
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

      

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <ShieldCheck size={14} className="text-violet-500" />
            <p className="text-[10px] font-medium text-slate-500 dark:text-slate-500 uppercase tracking-wider">
              © {currentYear} REWEV Intelligence Group. All protocols observed.
            </p>
          </div>
          
          <div className="flex gap-8 items-center">
             <Link href="#" className="text-[10px] font-bold uppercase tracking-widest text-slate-400 hover:text-violet-500 transition-colors">
               Terms
             </Link>
             <Link href="#" className="text-[10px] font-bold uppercase tracking-widest text-slate-400 hover:text-violet-500 transition-colors">
               Privacy
             </Link>
             <div className="px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-500 text-[9px] font-black uppercase tracking-widest">
               Pro System
             </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;