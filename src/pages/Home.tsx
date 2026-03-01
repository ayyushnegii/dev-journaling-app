import React, { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../components/AuthContext'

export default function Home() {
  const { user } = useAuth()

  return (
    <div className="space-y-24">
      {/* Hero Section */}
      <section className="text-center py-20 px-4">
        <div className="inline-block px-4 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-950/30 text-indigo-600 dark:text-indigo-400 text-sm font-bold tracking-tight mb-8">
          Welcome back, {user?.email?.split('@')[0]}
        </div>
        
        <h1 className="text-6xl md:text-8xl font-black mb-8 leading-[1.1] tracking-tighter">
          Today's vision.<br />
          <span className="text-indigo-600">Tomorrow's growth.</span>
        </h1>
        
        <p className="max-w-xl mx-auto text-xl text-slate-500 dark:text-slate-400 mb-12 font-medium">
          Capture your technical decisions, architecture diagrams, and daily discoveries in a minimal, distraction-free environment.
        </p>
        
        <div className="flex flex-wrap justify-center gap-6">
          <Link
            to="/journal"
            className="bg-indigo-600 text-white px-10 py-5 rounded-3xl text-lg font-bold shadow-2xl shadow-indigo-500/20 hover:bg-indigo-700 hover:-translate-y-1 transition-all active:scale-95"
          >
            Start Journaling
          </Link>
          <Link
            to="/calendar"
            className="bg-[var(--background)] dark:bg-slate-800 text-slate-900 dark:text-white px-10 py-5 rounded-3xl text-lg font-bold border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 hover:-translate-y-1 transition-all active:scale-95 shadow-sm"
          >
            View History
          </Link>
        </div>
      </section>

      {/* Stats/Features Grid */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <FeatureCard 
          icon={<svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M11 4a2 2 0 114 0v1a2 2 0 01-2 2 3 3 0 01-3 3 3 3 0 01-3-3 2 2 0 01-2-2V4a2 2 0 114 0v1a2 2 0 012 2v-1z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 8a2 2 0 00-2-2H7a2 2 0 00-2 2v11m16-11v.01M21 16v.01M21 20v.01M17 20v.01M13 20v.01" /></svg>}
          title="Block Editor"
          description="A powerful Notion-like editor supporting code snippets, headers, and media."
        />
        <FeatureCard 
          icon={<svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>}
          title="AI Topics"
          description="Automatic scanning of your notes to extract key topics and trends."
        />
        <FeatureCard 
          icon={<svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" /></svg>}
          title="Mindmap"
          description="Visualize the connections between everything you've ever learned."
        />
      </section>
    </div>
  )
}

function FeatureCard({ icon, title, description }: { icon: ReactNode, title: string, description: string }) {
  return (
    <div className="group p-10 rounded-[40px] bg-[var(--background)] dark:bg-slate-900/20 border border-slate-100 dark:border-slate-800/50 hover:border-indigo-500 transition-all hover:shadow-2xl hover:shadow-indigo-500/5 cursor-default">
      <div className="w-16 h-16 rounded-2xl bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-10 group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <h3 className="text-2xl font-black mb-4 group-hover:text-indigo-600 transition-colors uppercase tracking-tight">{title}</h3>
      <p className="text-slate-500 dark:text-slate-400 font-medium leading-relaxed">{description}</p>
    </div>
  )
}
