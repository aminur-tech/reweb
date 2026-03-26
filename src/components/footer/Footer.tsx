import React from 'react';
import Link from 'next/link';
import { Github, Linkedin, Twitter, Mail, Sparkles } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 dark:from-indigo-900 dark:via-purple-950 dark:to-pink-900 border-t border-indigo-200/30 dark:border-indigo-700/40">
      <div className="w-full md:w-11/12 mx-auto px-4 pt-16 pb-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12 mb-12">

          {/* Brand Column */}
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 bg-gradient-to-tr from-indigo-600 to-pink-500 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/30">
                <Sparkles className="text-white w-6 h-6" />
              </div>
              <span className="text-lg font-bold text-indigo-700 dark:text-indigo-200 tracking-wider uppercase">
                REWEV
              </span>
            </div>
            <p className="text-indigo-600 dark:text-indigo-300 max-w-xs text-sm leading-relaxed">
              Advancing digital frontiers through rigorous research and high-performance engineering. Our ecosystem connects global talent with intelligent automation.
            </p>
          </div>

          {/* Service Links */}
          <div>
            <h4 className="text-sm font-bold text-indigo-800 dark:text-indigo-200 uppercase tracking-widest mb-6">
              Services
            </h4>
            <ul className="space-y-4 text-sm">
              <li>
                <Link href="#" className="text-indigo-600 dark:text-indigo-300 hover:text-indigo-500 dark:hover:text-purple-400 transition-colors">
                  Market Analysis
                </Link>
              </li>
              <li>
                <Link href="#" className="text-indigo-600 dark:text-indigo-300 hover:text-indigo-500 dark:hover:text-purple-400 transition-colors">
                  Full-Stack Dev
                </Link>
              </li>
              <li>
                <Link href="#" className="text-indigo-600 dark:text-indigo-300 hover:text-indigo-500 dark:hover:text-purple-400 transition-colors">
                  AI Integration
                </Link>
              </li>
            </ul>
          </div>

          {/* Platform Links */}
          <div>
            <h4 className="text-sm font-bold text-indigo-800 dark:text-indigo-200 uppercase tracking-widest mb-6">
              Platform
            </h4>
            <ul className="space-y-4 text-sm">
              <li>
                <Link href="#" className="text-indigo-600 dark:text-indigo-300 hover:text-indigo-500 dark:hover:text-purple-400 transition-colors">
                  Client Portal
                </Link>
              </li>
              <li>
                <Link href="#" className="text-indigo-600 dark:text-indigo-300 hover:text-indigo-500 dark:hover:text-purple-400 transition-colors">
                  Documentation
                </Link>
              </li>
              <li>
                <Link href="#" className="text-indigo-600 dark:text-indigo-300 hover:text-indigo-500 dark:hover:text-purple-400 transition-colors">
                  API Status
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter / Contact */}
          <div className="col-span-2 lg:col-span-1">
            <h4 className="text-sm font-bold text-indigo-800 dark:text-indigo-200 uppercase tracking-widest mb-6">
              Stay Connected
            </h4>
            <div className="flex space-x-4">
              <Link
                href="#"
                className="p-2 bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 rounded-full text-white hover:scale-110 transition-transform"
              >
                <Linkedin size={18} />
              </Link>
              <Link
                href="#"
                className="p-2 bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 rounded-full text-white hover:scale-110 transition-transform"
              >
                <Twitter size={18} />
              </Link>
              <Link
                href="#"
                className="p-2 bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 rounded-full text-white hover:scale-110 transition-transform"
              >
                <Github size={18} />
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-indigo-200/30 dark:border-indigo-700/40 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-indigo-600 dark:text-indigo-300">
            © {currentYear} Integrated Research & Web Dev Service Platform. All rights reserved.
          </p>
          <div className="flex gap-6 text-xs text-indigo-600 dark:text-indigo-300">
            <Link href="#" className="hover:text-indigo-500 dark:hover:text-purple-400 transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:text-indigo-500 dark:hover:text-purple-400 transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;