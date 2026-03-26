import React from 'react';
import { 
  ShieldCheck, 
  Layout, 
  Search, 
  Layers, 
  BarChart, 
  Zap, 
  Globe 
} from 'lucide-react';

const functionalData = [
  {
    category: "Core Engine",
    items: [
      { title: "Smart Auth", desc: "Social login & role-based RBAC security.", icon: <ShieldCheck className="w-5 h-5" /> },
      { title: "Dynamic Landing", desc: "High-conversion Hero & 8+ modular sections.", icon: <Layout className="w-5 h-5" /> },
    ]
  },
  {
    category: "Marketplace Logic",
    items: [
      { title: "Service Grid", desc: "Skeleton loading & metadata-rich service cards.", icon: <Layers className="w-5 h-5" /> },
      { title: "Advanced Explore", desc: "Multi-parameter filtering, sorting & pagination.", icon: <Search className="w-5 h-5" /> },
    ]
  },
  {
    category: "User Experience",
    items: [
      { title: "Project Detail", desc: "Deep-dive specs, reviews & related services.", icon: <Globe className="w-5 h-5" /> },
      { title: "Intelligence Hub", desc: "AI Chatbots, generators & recommendation engines.", icon: <Zap className="w-5 h-5" /> },
    ]
  },
  {
    category: "Management",
    items: [
      { title: "Role Dashboards", desc: "Analytics & payment tracking for Admin/Clients.", icon: <BarChart className="w-5 h-5" /> },
    ]
  }
];

export default function FunctionalHighlights() {
  return (
    <section id="features" className="py-24 px-6 max-w-7xl mx-auto">
      <div className="mb-16">
        <h2 className="text-4xl font-bold tracking-tight mb-4">
          Functional <span className="text-indigo-600 dark:text-indigo-400">Architecture</span>
        </h2>
        <div className="h-1 w-20 bg-gradient-to-r from-indigo-500 to-pink-500 rounded-full" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {functionalData.map((group, idx) => (
          <div key={idx} className="space-y-6">
            <h3 className="text-sm font-bold uppercase tracking-widest text-indigo-900/40 dark:text-indigo-100/40">
              {group.category}
            </h3>
            
            <div className="space-y-4">
              {group.items.map((item, itemIdx) => (
                <div 
                  key={itemIdx}
                  className="p-5 rounded-2xl bg-white/20 dark:bg-white/5 backdrop-blur-sm border border-white/30 dark:border-white/10 hover:bg-white/40 dark:hover:bg-white/10 transition-all group"
                >
                  <div className="flex items-start gap-4">
                    <div className="mt-1 p-2 rounded-lg bg-indigo-500 text-white shadow-lg shadow-indigo-500/30 group-hover:scale-110 transition-transform">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="font-bold text-indigo-950 dark:text-white mb-1">
                        {item.title}
                      </h4>
                      <p className="text-sm text-indigo-900/60 dark:text-indigo-200/50 leading-snug">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}