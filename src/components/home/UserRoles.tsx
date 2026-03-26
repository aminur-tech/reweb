import React from 'react';
import { ShieldAlert, UserCircle, Users2, CheckCircle2 } from 'lucide-react';

const roles = [
  {
    title: "Administrator",
    subtitle: "System Governance",
    icon: <ShieldAlert className="w-8 h-8 text-rose-500" />,
    color: "border-rose-500/20 bg-rose-500/5",
    features: ["Full System Control", "User & Project Management", "Financial Analytics", "Global Configurations"],
  },
  {
    title: "Client",
    subtitle: "Service Requester",
    icon: <UserCircle className="w-8 h-8 text-indigo-500" />,
    color: "border-indigo-500/20 bg-indigo-500/5",
    features: ["Submit Project Requests", "Real-time Progress Tracking", "Secure Payments", "Peer Reviews"],
  },
  {
    title: "Team Collaborator",
    subtitle: "Technical Execution",
    icon: <Users2 className="w-8 h-8 text-purple-500" />,
    color: "border-purple-500/20 bg-purple-500/5",
    features: ["Execute Research & Dev", "Internal Collaboration", "Milestone Updates", "Final Deliverables"],
  },
];

export default function UserRoles() {
  return (
    <section id="roles" className="py-24 px-6 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-sm font-black uppercase tracking-[0.3em] text-purple-500 mb-4">
          Permissions
        </h2>
        <h3 className="text-4xl font-bold text-slate-900 dark:text-white">
          Role-Based <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-indigo-600">Responsibilities</span>
        </h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {roles.map((role, idx) => (
          <div 
            key={idx}
            className={`group relative p-8 rounded-[2.5rem] border ${role.color} backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-indigo-500/10`}
          >
            {/* Header */}
            <div className="flex flex-col items-center text-center mb-8">
              <div className="mb-4 p-4 rounded-2xl bg-white dark:bg-slate-900 shadow-xl group-hover:scale-110 transition-transform duration-500">
                {role.icon}
              </div>
              <h4 className="text-2xl font-bold text-slate-900 dark:text-white">
                {role.title}
              </h4>
              <span className="text-xs font-bold uppercase tracking-widest text-slate-400 mt-1">
                {role.subtitle}
              </span>
            </div>

            {/* Feature List */}
            <ul className="space-y-4">
              {role.features.map((feature, fIdx) => (
                <li key={fIdx} className="flex items-center gap-3 text-sm text-slate-600 dark:text-indigo-200/70 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-indigo-500 flex-shrink-0" />
                  {feature}
                </li>
              ))}
            </ul>

            {/* Decorative Role ID */}
            <div className="absolute top-6 right-8 text-4xl font-black text-slate-500/5 select-none group-hover:text-indigo-500/10 transition-colors">
              0{idx + 1}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}