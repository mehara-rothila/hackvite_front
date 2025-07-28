// app/student/queries/[id]/page.tsx - ENHANCED WITH DASHBOARD STYLES
'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'

// --- Interfaces (Unchanged) ---
interface QueryMessage {
  id: string
  sender: 'student' | 'lecturer'
  senderName: string
  message: string
  timestamp: string
  attachments?: { name: string; url: string; type: string }[]
}

interface QueryDetails {
  id: string
  title: string
  category: string
  status: 'pending' | 'in-progress' | 'resolved'
  priority: 'low' | 'medium' | 'high'
  lecturer: string
  course: string
  submittedAt: string
  lastUpdated: string
  description: string
  messages: QueryMessage[]
  statusHistory: { status: string; timestamp: string; changedBy: string; note?: string }[]
}

// --- Mock Data (Unchanged) ---
const mockQueryDetails: Record<string, QueryDetails> = {
  '1': { id: '1', title: 'Question about Assignment 2 deadline', category: 'Academic', status: 'resolved', priority: 'medium', lecturer: 'Dr. Sarah Johnson', course: 'CS101', submittedAt: '2025-07-24', lastUpdated: '2025-07-25', description: 'Can I get an extension for the assignment due to technical issues? My laptop crashed and I lost some work.', messages: [ { id: '1', sender: 'student', senderName: 'You', message: 'Can I get an extension for the assignment due to technical issues? My laptop crashed and I lost some work.', timestamp: '2025-07-24 10:30 AM', attachments: [{ name: 'error_screenshot.png', url: '#', type: 'image' }] }, { id: '2', sender: 'lecturer', senderName: 'Dr. Sarah Johnson', message: 'Hi! I understand technical issues can be frustrating. Can you provide more details about what happened and when? Also, do you have any backup of your work?', timestamp: '2025-07-24 2:15 PM' }, { id: '3', sender: 'student', senderName: 'You', message: 'The crash happened yesterday evening around 8 PM. I had completed about 60% of the assignment. I do have some backup from 2 days ago, but it\'s missing the recent work.', timestamp: '2025-07-24 4:45 PM' }, { id: '4', sender: 'lecturer', senderName: 'Dr. Sarah Johnson', message: 'Thank you for the details. Given the circumstances, I\'ll grant you a 3-day extension. Please submit by Friday 5 PM. Make sure to backup your work regularly!', timestamp: '2025-07-25 9:00 AM' }, { id: '5', sender: 'student', senderName: 'You', message: 'Thank you so much! I really appreciate the extension. I\'ll definitely be more careful with backups going forward.', timestamp: '2025-07-25 11:30 AM' } ], statusHistory: [ { status: 'pending', timestamp: '2025-07-24 10:30 AM', changedBy: 'System', note: 'Query submitted' }, { status: 'in-progress', timestamp: '2025-07-24 2:15 PM', changedBy: 'Dr. Sarah Johnson', note: 'Reviewing request' }, { status: 'resolved', timestamp: '2025-07-25 9:00 AM', changedBy: 'Dr. Sarah Johnson', note: 'Extension granted' } ] },
  '2': { id: '2', title: 'Login issues with course portal', category: 'Technical', status: 'in-progress', priority: 'high', lecturer: 'IT Support', course: 'General', submittedAt: '2025-07-25', lastUpdated: '2025-07-26', description: 'Cannot access the course portal since yesterday. Getting error message when trying to log in.', messages: [ { id: '1', sender: 'student', senderName: 'You', message: 'Cannot access the course portal since yesterday. Getting error message when trying to log in.', timestamp: '2025-07-25 9:15 AM' }, { id: '2', sender: 'lecturer', senderName: 'IT Support Team', message: 'We\'re investigating this issue. Several students have reported similar problems. Can you tell us which browser you\'re using and if you\'ve tried clearing your cache?', timestamp: '2025-07-25 11:30 AM' }, { id: '3', sender: 'student', senderName: 'You', message: 'I\'m using Chrome. I tried clearing cache and cookies but still getting the same error.', timestamp: '2025-07-25 1:20 PM' } ], statusHistory: [ { status: 'pending', timestamp: '2025-07-25 9:15 AM', changedBy: 'System', note: 'Query submitted' }, { status: 'in-progress', timestamp: '2025-07-25 11:30 AM', changedBy: 'IT Support', note: 'Under investigation' } ] }
}

export default function QueryDetailsPage() {
  // --- State and Handlers (Unchanged) ---
  const params = useParams()
  const queryId = params.id as string
  const [query, setQuery] = useState<QueryDetails | null>(null)
  const [newMessage, setNewMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    const queryData = mockQueryDetails[queryId]
    setQuery(queryData || null)
  }, [queryId])

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newMessage.trim() || !query) return
    setIsSubmitting(true)
    setTimeout(() => {
      const message: QueryMessage = { id: Date.now().toString(), sender: 'student', senderName: 'You', message: newMessage, timestamp: new Date().toLocaleString() }
      setQuery({ ...query, messages: [...query.messages, message], lastUpdated: new Date().toISOString().split('T')[0] })
      setNewMessage('')
      setIsSubmitting(false)
    }, 1000)
  }

  // --- Styling Helpers ---
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'in-progress': return 'bg-blue-100 text-blue-800'
      case 'resolved': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800'
      case 'medium': return 'bg-orange-100 text-orange-800'
      case 'low': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }
  const glassInputStyles = "w-full px-4 py-2 border rounded-lg transition-all duration-300 focus:ring-2 focus:ring-blue-500 bg-white/60 border-gray-300/70 focus:bg-white/80 disabled:bg-gray-500/10 disabled:border-transparent disabled:cursor-default"

  if (!query) {
    return (
      <div className="min-h-screen bg-gray-50 p-6 flex items-center justify-center">
        <div className="max-w-4xl mx-auto">
          <div className="glass-card rounded-2xl p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Query Not Found</h2>
            <p className="text-gray-600 mb-6">The query you're looking for doesn't exist or you don't have permission to view it.</p>
            <Link href="/student/queries" className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-2 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105 font-semibold">
              Back to Queries
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      {/* --- START: Global Styles & Animations (Copied from Dashboard) --- */}
      <style jsx global>{`
        /* All the animations from the login page */
        @keyframes mesh-drift-1 { 0%, 100% { transform: rotate(0deg) scale(1) translate(0, 0); } 33% { transform: rotate(120deg) scale(1.1) translate(20px, -20px); } 66% { transform: rotate(240deg) scale(0.9) translate(-20px, 20px); } }
        .animate-mesh-drift-1 { animation: mesh-drift-1 40s ease-in-out infinite; }
        @keyframes mesh-drift-2 { 0%, 100% { transform: rotate(0deg) scale(1) translate(0, 0); } 25% { transform: rotate(90deg) scale(1.2) translate(-30px, 10px); } 50% { transform: rotate(180deg) scale(0.8) translate(10px, -30px); } 75% { transform: rotate(270deg) scale(1.1) translate(20px, 20px); } }
        .animate-mesh-drift-2 { animation: mesh-drift-2 50s ease-in-out infinite; }
        @keyframes mesh-drift-3 { 0%, 100% { transform: rotate(0deg) scale(1) translate(0, 0); } 50% { transform: rotate(180deg) scale(1.3) translate(-10px, 10px); } }
        .animate-mesh-drift-3 { animation: mesh-drift-3 35s ease-in-out infinite; }
        @keyframes mesh-drift-4 { 0%, 100% { transform: rotate(0deg) scale(1) translate(0, 0); } 25% { transform: rotate(90deg) scale(1.1) translate(15px, -15px); } 50% { transform: rotate(180deg) scale(0.9) translate(-15px, -15px); } 75% { transform: rotate(270deg) scale(1.05) translate(-15px, 15px); } }
        .animate-mesh-drift-4 { animation: mesh-drift-4 45s ease-in-out infinite; }
        @keyframes equation-float-1 { 0%, 100% { transform: translateY(0px) translateX(0px) rotate(0deg); opacity: 0.8; } 25% { transform: translateY(-30px) translateX(20px) rotate(5deg); opacity: 1; } 50% { transform: translateY(-15px) translateX(40px) rotate(-3deg); opacity: 0.7; } 75% { transform: translateY(-25px) translateX(10px) rotate(7deg); opacity: 0.9; } }
        .animate-equation-float-1 { animation: equation-float-1 12s ease-in-out infinite; }
        @keyframes equation-float-2 { 0%, 100% { transform: translateY(0px) translateX(0px) rotate(0deg); opacity: 0.8; } 33% { transform: translateY(-40px) translateX(-30px) rotate(-8deg); opacity: 1; } 66% { transform: translateY(-20px) translateX(-15px) rotate(5deg); opacity: 0.7; } }
        .animate-equation-float-2 { animation: equation-float-2 15s ease-in-out infinite; }
        @keyframes equation-float-3 { 0%, 100% { transform: translateY(0px) translateX(0px) rotate(0deg); opacity: 0.8; } 50% { transform: translateY(-35px) translateX(25px) rotate(-10deg); opacity: 1; } }
        .animate-equation-float-3 { animation: equation-float-3 10s ease-in-out infinite; }
        @keyframes equation-float-4 { 0%, 100% { transform: translateY(0px) translateX(0px) rotate(0deg); opacity: 0.8; } 20% { transform: translateY(-25px) translateX(15px) rotate(4deg); opacity: 1; } 40% { transform: translateY(-45px) translateX(-10px) rotate(-6deg); opacity: 0.7; } 60% { transform: translateY(-30px) translateX(30px) rotate(8deg); opacity: 0.9; } 80% { transform: translateY(-15px) translateX(-20px) rotate(-3deg); opacity: 0.8; } }
        .animate-equation-float-4 { animation: equation-float-4 18s ease-in-out infinite; }
        @keyframes particle-drift-1 { 0%, 100% { transform: translateY(0px) translateX(0px) rotate(0deg); opacity: 0.6; } 25% { transform: translateY(-120px) translateX(80px) rotate(90deg); opacity: 0.9; } 50% { transform: translateY(-80px) translateX(160px) rotate(180deg); opacity: 0.7; } 75% { transform: translateY(-200px) translateX(40px) rotate(270deg); opacity: 1; } }
        .animate-particle-drift-1 { animation: particle-drift-1 15s ease-in-out infinite; }
        @keyframes particle-drift-2 { 0%, 100% { transform: translateY(0px) translateX(0px) rotate(0deg); opacity: 0.5; } 33% { transform: translateY(-100px) translateX(-60px) rotate(120deg); opacity: 0.8; } 66% { transform: translateY(-160px) translateX(120px) rotate(240deg); opacity: 0.6; } }
        .animate-particle-drift-2 { animation: particle-drift-2 18s ease-in-out infinite; }
        @keyframes particle-drift-3 { 0%, 100% { transform: translateY(0px) translateX(0px) rotate(0deg); opacity: 0.7; } 50% { transform: translateY(-250px) translateX(-40px) rotate(180deg); opacity: 0.3; } }
        .animate-particle-drift-3 { animation: particle-drift-3 22s ease-in-out infinite; }
        @keyframes particle-drift-4 { 0%, 100% { transform: translateY(0px) translateX(0px) rotate(0deg); opacity: 0.8; } 25% { transform: translateY(-80px) translateX(100px) rotate(90deg); opacity: 0.4; } 75% { transform: translateY(-180px) translateX(-80px) rotate(270deg); opacity: 0.9; } }
        .animate-particle-drift-4 { animation: particle-drift-4 20s ease-in-out infinite; }
        @keyframes glass-float-1 { 0%, 100% { transform: translate(0, 0) rotate(0deg) scale(1); } 25% { transform: translate(30px, -50px) rotate(90deg) scale(1.1); } 50% { transform: translate(-20px, -30px) rotate(180deg) scale(0.9); } 75% { transform: translate(-40px, 40px) rotate(270deg) scale(1.05); } }
        .animate-glass-float-1 { animation: glass-float-1 45s ease-in-out infinite; }
        @keyframes glass-float-2 { 0%, 100% { transform: translate(0, 0) rotate(0deg) scale(1); } 33% { transform: translate(-60px, 40px) rotate(120deg) scale(1.2); } 66% { transform: translate(40px, -60px) rotate(240deg) scale(0.8); } }
        .animate-glass-float-2 { animation: glass-float-2 55s ease-in-out infinite; }
        @keyframes glass-float-3 { 0%, 100% { transform: translate(0, 0) rotate(0deg) scale(1); } 20% { transform: translate(40px, -20px) rotate(72deg) scale(1.1); } 40% { transform: translate(-30px, -40px) rotate(144deg) scale(0.9); } 60% { transform: translate(-50px, 30px) rotate(216deg) scale(1.15); } 80% { transform: translate(20px, 50px) rotate(288deg) scale(0.95); } }
        .animate-glass-float-3 { animation: glass-float-3 60s ease-in-out infinite; }
        @keyframes glass-float-4 { 0%, 100% { transform: translate(0, 0) rotate(0deg) scale(1); } 50% { transform: translate(-30px, -30px) rotate(180deg) scale(1.3); } }
        .animate-glass-float-4 { animation: glass-float-4 42s ease-in-out infinite; }
        @keyframes bubble-drift-1 { 0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.7; } 25% { transform: translate(60px, -80px) scale(1.2); opacity: 0.9; } 50% { transform: translate(-40px, -60px) scale(0.8); opacity: 0.5; } 75% { transform: translate(-80px, 40px) scale(1.1); opacity: 0.8; } }
        .animate-bubble-drift-1 { animation: bubble-drift-1 30s ease-in-out infinite; }
        @keyframes bubble-drift-2 { 0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.6; } 33% { transform: translate(-70px, 60px) scale(1.3); opacity: 1; } 66% { transform: translate(50px, -50px) scale(0.7); opacity: 0.4; } }
        .animate-bubble-drift-2 { animation: bubble-drift-2 38s ease-in-out infinite; }
        @keyframes bubble-drift-3 { 0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.8; } 50% { transform: translate(30px, 70px) scale(1.4); opacity: 0.3; } }
        .animate-bubble-drift-3 { animation: bubble-drift-3 25s ease-in-out infinite; }
        @keyframes aurora-glow { 0%, 100% { opacity: 0.6; transform: scale(1) rotate(0deg); } 25% { opacity: 0.8; transform: scale(1.05) rotate(90deg); } 50% { opacity: 0.4; transform: scale(0.95) rotate(180deg); } 75% { opacity: 0.9; transform: scale(1.1) rotate(270deg); } }
        .animate-aurora-glow { animation: aurora-glow 8s ease-in-out infinite; }
        @keyframes glass-fade-in { 0% { opacity: 0; transform: translateY(30px) scale(0.95); } 100% { opacity: 1; transform: translateY(0) scale(1); } }
        .animate-glass-fade-in { animation: glass-fade-in 0.8s ease-out forwards; }
        @keyframes slide-up-delayed { 0% { opacity: 0; transform: translateY(40px); } 100% { opacity: 1; transform: translateY(0); } }
        .animate-slide-up-delayed { animation: slide-up-delayed 0.8s ease-out 0.2s forwards; opacity: 0; }
        .animate-slide-up-delayed-2 { animation: slide-up-delayed 0.8s ease-out 0.4s forwards; opacity: 0; }
        .animate-slide-up-delayed-3 { animation: slide-up-delayed 0.8s ease-out 0.6s forwards; opacity: 0; }
        
        /* Enhanced Glassmorphism Card Styles */
        .glass-card { background: linear-gradient(135deg, rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.4)); backdrop-filter: blur(32px); border: 1px solid rgba(255, 255, 255, 0.9); box-shadow: 0 8px 32px rgba(31, 38, 135, 0.15), 0 0 0 1px rgba(255, 255, 255, 0.5) inset, 0 2px 8px rgba(255, 255, 255, 0.7) inset; }
        .glass-stat-card { background: linear-gradient(135deg, rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 0.3)); backdrop-filter: blur(24px); border: 1px solid rgba(255, 255, 255, 0.8); box-shadow: 0 6px 24px rgba(31, 38, 135, 0.1), 0 0 0 1px rgba(255, 255, 255, 0.4) inset; }
        .glass-activity-card { background: linear-gradient(135deg, rgba(255, 255, 255, 0.6), rgba(255, 255, 255, 0.2)); backdrop-filter: blur(20px); border: 1px solid rgba(255, 255, 255, 0.7); box-shadow: 0 4px 16px rgba(31, 38, 135, 0.08), 0 0 0 1px rgba(255, 255, 255, 0.3) inset; }
        .text-clean-shadow { filter: drop-shadow(0 2px 4px rgba(59, 130, 246, 0.2)); }
      `}</style>
      {/* --- END: Global Styles & Animations --- */}

      <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
        
        {/* --- START: Multi-Layered Animated Background (Copied from Dashboard) --- */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0">
          {/* Layer 1: Floating Symbols */}
          <div className="absolute top-[7%] left-[13%] text-purple-500 text-9xl opacity-75 floating-icon">∑</div>
          <div className="absolute top-[33%] right-[17%] text-blue-500 text-8xl opacity-70 floating-icon-reverse">π</div>
          <div className="absolute top-[61%] left-[27%] text-green-500 text-8xl opacity-75 floating-icon-slow">∞</div>
          <div className="absolute top-[19%] right-[38%] text-red-500 text-7xl opacity-65 floating-icon">⚛</div>
          <div className="absolute bottom-[31%] left-[8%] text-indigo-500 text-8xl opacity-70 floating-icon-reverse">∫</div>
          <div className="absolute bottom-[12%] right-[42%] text-teal-500 text-9xl opacity-75 floating-icon">≈</div>
          <div className="absolute bottom-[47%] right-[9%] text-pink-500 text-8xl opacity-65 floating-icon-slow">±</div>
          <div className="absolute top-[23%] left-[54%] text-fuchsia-500 text-8xl opacity-70 floating-icon">Δ</div>
          <div className="absolute top-[44%] left-[38%] text-emerald-500 text-7xl opacity-65 floating-icon-slow">λ</div>
          <div className="absolute top-[81%] left-[67%] text-cyan-500 text-9xl opacity-70 floating-icon-reverse">θ</div>
          <div className="absolute top-[29%] left-[83%] text-rose-500 text-8xl opacity-65 floating-icon">α</div>
          <div className="absolute bottom-[63%] left-[6%] text-amber-500 text-9xl opacity-70 floating-icon-slow">β</div>
          <div className="absolute bottom-[19%] left-[71%] text-purple-500 text-8xl opacity-65 floating-icon-reverse">μ</div>
          <div className="absolute bottom-[28%] left-[32%] text-blue-500 text-7xl opacity-70 floating-icon">ω</div>
          <div className="absolute top-[52%] left-[18%] text-sky-500 text-8xl opacity-60 floating-icon-slow">γ</div>
          <div className="absolute top-[37%] right-[29%] text-lime-500 text-9xl opacity-55 floating-icon">σ</div>
          <div className="absolute bottom-[42%] right-[37%] text-orange-500 text-8xl opacity-50 floating-icon-reverse">δ</div>
          <div className="absolute top-[73%] right-[13%] text-violet-500 text-8xl opacity-60 floating-icon-slow">ρ</div>
          
          {/* Layer 2: Drifting Gradient Meshes */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-100/40 via-purple-100/35 to-pink-100/40 animate-mesh-drift-1" />
          <div className="absolute inset-0 bg-gradient-to-tr from-emerald-100/35 via-violet-100/30 to-orange-100/35 animate-mesh-drift-2" />
          <div className="absolute inset-0 bg-gradient-to-bl from-cyan-100/40 via-purple-100/25 to-rose-100/40 animate-mesh-drift-3" />
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-100/30 via-transparent to-green-100/30 animate-mesh-drift-4" />

          {/* Layer 3: Floating Equations */}
          <div className="absolute top-1/4 left-1/6 text-4xl font-bold text-blue-600/70 animate-equation-float-1">∫ e⁻ˣ² dx = √π/2</div>
          <div className="absolute top-1/3 right-1/5 text-3xl font-bold text-emerald-600/70 animate-equation-float-2">∑ 1/n² = π²/6</div>
          <div className="absolute bottom-1/4 left-1/5 text-3xl font-bold text-pink-600/70 animate-equation-float-3">E = mc²</div>
          <div className="absolute top-1/2 right-1/6 text-3xl font-bold text-purple-600/70 animate-equation-float-4">a² + b² = c²</div>
          
          {/* Layer 4: Drifting Knowledge Particles */}
          {[...Array(60)].map((_, i) => (
            <div
              key={i}
              className={`absolute w-2 h-2 rounded-full animate-particle-drift-${(i % 4) + 1} shadow-md`}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 12}s`,
                animationDuration: `${6 + Math.random() * 10}s`,
                background: `radial-gradient(circle, ${['rgba(59, 130, 246, 0.7)', 'rgba(16, 185, 129, 0.7)', 'rgba(168, 85, 247, 0.7)', 'rgba(245, 158, 11, 0.7)', 'rgba(236, 72, 153, 0.7)'][i % 5]}, rgba(255,255,255,0.2))`
              }}
            />
          ))}

          {/* Layer 5: Floating Glass Orbs & Bubbles */}
          <div className="absolute top-16 left-16 w-80 h-80 bg-gradient-to-br from-blue-200/30 to-cyan-200/20 rounded-full backdrop-blur-sm border border-blue-300/40 animate-glass-float-1 shadow-lg" />
          <div className="absolute top-32 right-24 w-96 h-96 bg-gradient-to-br from-purple-200/25 to-pink-200/15 rounded-full backdrop-blur-sm border border-purple-300/30 animate-glass-float-2 shadow-lg" />
          <div className="absolute bottom-24 left-32 w-72 h-72 bg-gradient-to-br from-emerald-200/25 to-teal-200/15 rounded-full backdrop-blur-sm border border-emerald-300/25 animate-glass-float-3 shadow-lg" />
          <div className="absolute top-1/4 left-1/5 w-56 h-56 bg-gradient-to-br from-rose-200/20 to-pink-200/10 rounded-full backdrop-blur-sm border border-rose-300/25 animate-bubble-drift-1 shadow-md" />
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-gradient-to-br from-indigo-200/22 to-blue-200/12 rounded-full backdrop-blur-sm border border-indigo-300/30 animate-bubble-drift-2 shadow-md" />
        </div>
        {/* --- END: Multi-Layered Animated Background --- */}

        <div className="relative z-20 min-h-screen p-4 sm:p-6">
          <div className="max-w-4xl mx-auto">
            {/* Breadcrumb */}
            <div className="mb-6 animate-glass-fade-in">
              <nav className="text-sm text-gray-500 font-medium">
                <Link href="/student/queries" className="hover:text-blue-600 transition-colors">My Queries</Link>
                <span className="mx-2">/</span>
                <span className="text-gray-900">{query.title}</span>
              </nav>
            </div>

            {/* Query Header */}
            <div className="glass-card rounded-2xl p-6 mb-6 animate-slide-up-delayed">
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 mb-4">
                <div className="flex-1">
                  <h1 className="text-2xl font-bold text-gray-900 mb-2">{query.title}</h1>
                  <div className="flex flex-wrap gap-2 mb-3">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(query.status)}`}>{query.status.charAt(0).toUpperCase() + query.status.slice(1).replace('-', ' ')}</span>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getPriorityColor(query.priority)}`}>{query.priority.charAt(0).toUpperCase() + query.priority.slice(1)} Priority</span>
                    <span className="px-3 py-1 rounded-full text-sm font-medium bg-gray-200/70 text-gray-800">{query.category}</span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                    <div><strong>Course:</strong> <span className="font-medium text-gray-900">{query.course}</span></div>
                    <div><strong>Lecturer:</strong> <span className="font-medium text-gray-900">{query.lecturer}</span></div>
                    <div><strong>Submitted:</strong> <span className="font-medium text-gray-900">{query.submittedAt}</span></div>
                  </div>
                </div>
                <div className="flex gap-2 flex-shrink-0">
                  <Link href="/student/queries" className="bg-white/80 text-gray-700 px-4 py-2 rounded-lg hover:bg-white shadow-sm border border-gray-200 transition-all transform hover:scale-105 text-sm font-medium">← Back</Link>
                  {query.status !== 'resolved' && (<button className="bg-red-100/80 text-red-700 px-4 py-2 rounded-lg hover:bg-red-100 transition-colors text-sm font-medium">Close Query</button>)}
                </div>
              </div>
              <div className="border-t border-white/30 pt-4">
                <h3 className="font-medium text-gray-900 mb-2">Original Query</h3>
                <p className="text-gray-700">{query.description}</p>
              </div>
            </div>

            {/* Status History */}
            <div className="glass-card rounded-2xl p-6 mb-6 animate-slide-up-delayed-2">
              <h3 className="font-semibold text-gray-900 mb-4">Status History</h3>
              <div className="space-y-3">
                {query.statusHistory.map((entry, index) => (
                  <div key={index} className="flex items-center gap-4 p-3 glass-activity-card rounded-lg">
                    <div className={`w-3 h-3 rounded-full ${getStatusColor(entry.status).replace('bg-', 'bg-').replace('text-gray-800', 'bg-gray-400').replace('text-yellow-800', 'bg-yellow-500').replace('text-blue-800', 'bg-blue-500').replace('text-green-800', 'bg-green-500')}`}></div>
                    <div className="flex-1">
                      <div className="font-medium text-gray-900">Status changed to <span className="font-bold">{entry.status.replace('-', ' ')}</span></div>
                      <div className="text-sm text-gray-600">by {entry.changedBy} on {entry.timestamp}{entry.note && <span className="ml-2">• {entry.note}</span>}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Conversation Thread */}
            <div className="glass-card rounded-2xl p-6 mb-6 animate-slide-up-delayed-3">
              <h3 className="font-semibold text-gray-900 mb-4">Conversation</h3>
              <div className="space-y-4 mb-6">
                {query.messages.map((message) => (
                  <div key={message.id} className={`flex ${message.sender === 'student' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-3xl rounded-lg p-4 shadow-sm ${message.sender === 'student' ? 'bg-gradient-to-br from-blue-500 to-purple-600 text-white' : 'glass-activity-card text-gray-900'}`}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-sm">{message.senderName}</span>
                        <span className={`text-xs ${message.sender === 'student' ? 'text-blue-100' : 'text-gray-500'}`}>{message.timestamp}</span>
                      </div>
                      <p className="text-sm leading-relaxed">{message.message}</p>
                      {message.attachments && message.attachments.length > 0 && (
                        <div className="mt-3 space-y-2">
                          {message.attachments.map((attachment, idx) => (
                            <div key={idx} className={`flex items-center gap-2 p-2 rounded ${message.sender === 'student' ? 'bg-black/10' : 'bg-gray-200/50'}`}>
                              <span className="text-xs">📎</span>
                              <a href={attachment.url} className="text-xs underline hover:no-underline">{attachment.name}</a>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {query.status !== 'resolved' && (
                <form onSubmit={handleSendMessage} className="border-t border-white/30 pt-4">
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Add a follow-up message</label>
                    <textarea value={newMessage} onChange={(e) => setNewMessage(e.target.value)} rows={3} className={glassInputStyles} placeholder="Type your message..." disabled={isSubmitting} />
                  </div>
                  <div className="flex justify-between items-center">
                    <button type="button" className="text-sm text-gray-600 hover:text-gray-900 flex items-center gap-1 font-medium">📎 Attach File</button>
                    <div className="flex gap-2">
                      <button type="button" onClick={() => setNewMessage('')} className="px-4 py-2 text-gray-600 hover:text-gray-900 font-medium">Cancel</button>
                      <button type="submit" disabled={!newMessage.trim() || isSubmitting} className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-2 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105 font-semibold disabled:from-gray-400 disabled:to-gray-500 disabled:scale-100 disabled:cursor-not-allowed">
                        {isSubmitting ? 'Sending...' : 'Send Message'}
                      </button>
                    </div>
                  </div>
                </form>
              )}

              {query.status === 'resolved' && (
                <div className="border-t border-white/30 pt-4">
                  <div className="glass-activity-card bg-green-500/10 border border-green-500/20 rounded-lg p-4">
                    <div className="flex items-center gap-2">
                      <span className="text-green-600 text-xl">✓</span>
                      <span className="font-medium text-green-800">This query has been resolved</span>
                    </div>
                    <p className="text-sm text-green-700 mt-1">If you need further assistance, please submit a new query.</p>
                  </div>
                </div>
              )}
            </div>

            {/* Quick Actions */}
            <div className="glass-card rounded-2xl p-6 animate-slide-up-delayed-3">
              <h3 className="font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="flex flex-wrap gap-3">
                <Link href="/student/queries" className="bg-blue-100/70 text-blue-700 px-4 py-2 rounded-lg hover:bg-blue-100 transition-colors font-medium">View All Queries</Link>
                <Link href="/student/queries?new=true" className="bg-green-100/70 text-green-700 px-4 py-2 rounded-lg hover:bg-green-100 transition-colors font-medium">Submit New Query</Link>
                {query.lecturer !== 'IT Support' && (<Link href={`/student/appointments?lecturer=${encodeURIComponent(query.lecturer)}`} className="bg-purple-100/70 text-purple-700 px-4 py-2 rounded-lg hover:bg-purple-100 transition-colors font-medium">Book Appointment with {query.lecturer}</Link>)}
                <button className="bg-gray-200/70 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors font-medium">Print Query</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}