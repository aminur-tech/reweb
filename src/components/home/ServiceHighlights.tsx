import React from 'react';
import { Database, Code2, LineChart, Globe, ArrowUpRight, Star } from 'lucide-react';

const topServices = [
  {
    id: 1,
    title: "Full-Stack AI Integration",
    category: "Development",
    price: "$2,400",
    rating: 4.9,
    icon: <Code2 className="w-6 h-6 text-indigo-500" />,
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=400",
  },
  {
    id: 2,
    title: "Market Research & Analysis",
    category: "Research",
    price: "$1,800",
    rating: 4.8,
    icon: <LineChart className="w-6 h-6 text-purple-500" />,
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=400",
  },
  {
    id: 3,
    title: "SaaS Ecosystem Architecture",
    category: "Web Architecture",
    price: "$3,500",
    rating: 5.0,
    icon: <Globe className="w-6 h-6 text-pink-500" />,
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc48?auto=format&fit=crop&q=80&w=400",
  },
  {
    id: 4,
    title: "Data Mining & Visualization",
    category: "Research",
    price: "$1,200",
    rating: 4.7,
    icon: <Database className="w-6 h-6 text-blue-500" />,
    image: "https://images.unsplash.com/photo-1551288049-bbbda536339a?auto=format&fit=crop&q=80&w=400",
  },
];

export default function ServiceHighlights() {
  return (
    <section id="services" className="py-24 px-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <div>
          <h2 className="text-sm font-bold tracking-[0.2em] uppercase text-indigo-600 dark:text-indigo-400 mb-2">
            Marketplace
          </h2>
          <h3 className="text-4xl font-bold text-slate-900 dark:text-white">
            Top Service <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-pink-500">Solutions</span>
          </h3>
        </div>
        <button className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-bold hover:gap-3 transition-all">
          View All Services <ArrowUpRight className="w-5 h-5" />
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {topServices.map((service) => (
          <div 
            key={service.id} 
            className="group relative rounded-[2rem] bg-white/40 dark:bg-indigo-950/40 backdrop-blur-xl border border-white/20 dark:border-white/10 overflow-hidden hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-500"
          >
            {/* Image Container */}
            <div className="relative h-48 overflow-hidden">
              <img 
                src={service.image} 
                alt={service.title} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
              />
              <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-white/80 dark:bg-black/50 backdrop-blur-md text-[10px] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-300">
                {service.category}
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              <div className="flex justify-between items-start mb-3">
                <div className="p-2 rounded-xl bg-indigo-50 dark:bg-indigo-900/30">
                  {service.icon}
                </div>
                <div className="flex items-center gap-1 text-sm font-bold text-amber-500">
                  <Star className="w-4 h-4 fill-current" /> {service.rating}
                </div>
              </div>

              <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-2 line-clamp-1">
                {service.title}
              </h4>
              
              <div className="flex items-center justify-between mt-6">
                <div>
                  <p className="text-[10px] uppercase font-bold text-slate-400">Starting at</p>
                  <p className="text-xl font-black text-indigo-600 dark:text-indigo-400">{service.price}</p>
                </div>
                <button className="p-3 rounded-2xl bg-indigo-600 text-white opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 shadow-lg shadow-indigo-500/40">
                  <ArrowUpRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}