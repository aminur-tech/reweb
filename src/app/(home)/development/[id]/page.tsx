// app/projects/[id]/page.tsx
import React from 'react';
import { Layout, Database, Globe, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default async function ProjectDetails({ params }: { params: { id: string } }) {
  // Fetch project data based on params.id from your API
  const res = await fetch(`http://localhost:5000/api/v1/projects/${params.id}`);
  const project = await res.json();
  console.log(project)

  return (
    <div className="min-h-screen py-20 px-6 max-w-4xl mx-auto">
      <Link href="/development" className="inline-flex items-center gap-2 text-slate-500 hover:text-indigo-600 mb-10 transition">
        <ArrowLeft size={20} /> Back to Projects
      </Link>

      <h1 className="text-5xl font-black mb-6 dark:text-white">Project Title</h1>
      <div className="flex gap-4 mb-10">
        <span className="px-4 py-1.5 bg-indigo-600 text-white rounded-full text-xs font-bold uppercase">Web Development</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        <div className="md:col-span-2 space-y-8">
          <div className="prose dark:prose-invert max-w-none">
            <h2 className="text-2xl font-bold">About this project</h2>
            <p className="text-slate-500 leading-loose">Detailed project description goes here...</p>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-slate-50 dark:bg-slate-900 p-6 rounded-[2rem] border dark:border-slate-800">
            <h3 className="font-bold mb-4">Project Links</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-sm font-medium"><Globe size={16}/> <a href="#" className="hover:text-indigo-600">Live Demo</a></li>
              <li className="flex items-center gap-3 text-sm font-medium"><Layout size={16}/> <a href="#" className="hover:text-indigo-600">Frontend Repo</a></li>
              <li className="flex items-center gap-3 text-sm font-medium"><Database size={16}/> <a href="#" className="hover:text-indigo-600">Backend Repo</a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}