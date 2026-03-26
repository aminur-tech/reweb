import React from 'react';
import { MessageSquare, PenTool, Sparkles, BarChart3, Bot } from 'lucide-react';

const aiModules = [
  {
    title: "AI Support Chatbot",
    desc: "24/7 instant assistance for project inquiries and technical troubleshooting.",
    icon: <MessageSquare className="w-6 h-6 text-indigo-400" />,
    gradient: "from-indigo-500/20 to-transparent",
  },
  {
    title: "AI Content Generator",
    desc: "Automatically generate technical project descriptions and research summaries.",
    icon: <PenTool className="w-6 h-6 text-purple-400" />,
    gradient: "from-purple-500/20 to-transparent",
  },
  {
    title: "Smart Recommendations",
    desc: "Personalized service suggestions based on your research goals and stack.",
    icon: <Sparkles className="w-6 h-6 text-pink-400" />,
    gradient: "from-pink-500/20 to-transparent",
  },
  {
    title: "Review Summarization",
    desc: "Distill complex client feedback into actionable development tasks instantly.",
    icon: <BarChart3 className="w-6 h-6 text-blue-400" />,
    gradient: "from-blue-500/20 to-transparent",
  },
];

export default function AIFeatures() {
  return (
    <section id="ai" className="py-24 px-6 relative overflow-hidden">
      {/* Section Header */}
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-600 dark:text-indigo-400 text-xs font-bold uppercase tracking-widest mb-4">
          <Bot className="w-4 h-4" />
          Intelligent Automation
        </div>
        <h2 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight">
          AI-Powered <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">Core Intelligence</span>
        </h2>
        <p className="max-w-2xl mx-auto text-indigo-900/60 dark:text-indigo-200/60 text-lg">
          Leveraging state-of-the-art neural networks to streamline the bridge between research and production.
        </p>
      </div>

      {/* Feature Grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {aiModules.map((item, idx) => (
          <div 
            key={idx}
            className={`group relative overflow-hidden p-8 rounded-[2rem] border border-white/20 dark:border-white/10 bg-white/30 dark:bg-indigo-950/20 backdrop-blur-md transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl hover:shadow-purple-500/10`}
          >
            {/* Inner Glow Effect */}
            <div className={`absolute -right-10 -top-10 w-40 h-40 bg-gradient-to-br ${item.gradient} blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700`} />
            
            <div className="relative z-10">
              <div className="mb-6 inline-flex p-4 rounded-2xl bg-white dark:bg-indigo-900/40 shadow-inner border border-indigo-100 dark:border-indigo-800 transition-transform group-hover:rotate-6">
                {item.icon}
              </div>
              <h3 className="text-2xl font-bold mb-3 text-indigo-950 dark:text-white">
                {item.title}
              </h3>
              <p className="text-indigo-900/70 dark:text-indigo-100/60 leading-relaxed font-medium">
                {item.desc}
              </p>
            </div>

            {/* Bottom Accent Line */}
            <div className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-indigo-500 to-pink-500 transition-all duration-500 group-hover:w-full" />
          </div>
        ))}
      </div>
    </section>
  );
}