// app/lecturer/announcements/page.tsx - ENHANCED WITH GLASSMORPHISM & VECTOR ICONS
'use client'

import { useState } from 'react'

// --- Interfaces (Unchanged) ---
interface Announcement {
  id: string
  title: string
  content: string
  type: 'general' | 'urgent' | 'course' | 'schedule' | 'system'
  priority: 'low' | 'medium' | 'high'
  targetAudience: 'all' | 'course-specific' | 'year-specific'
  course?: string
  yearLevel?: string
  createdAt: string
  updatedAt: string
  publishedAt?: string
  expiresAt?: string
  status: 'draft' | 'published' | 'expired'
  readCount: number
  attachments?: {
    name: string
    url: string
    type: string
  }[]
  pinned: boolean
}

// --- Mock Data (Unchanged) ---
const mockAnnouncements: Announcement[] = [
  {
    id: '1',
    title: 'Mid-term Exam Schedule Released',
    content: 'The mid-term examination schedule for CS101 has been released. Please check the course portal for your exam slots. Make sure to arrive 15 minutes early and bring your student ID.',
    type: 'course',
    priority: 'high',
    targetAudience: 'course-specific',
    course: 'CS101',
    createdAt: '2025-07-25',
    updatedAt: '2025-07-25',
    publishedAt: '2025-07-25',
    expiresAt: '2025-08-15',
    status: 'published',
    readCount: 45,
    pinned: true,
    attachments: [
      { name: 'exam_schedule.pdf', url: '#', type: 'pdf' }
    ]
  },
  {
    id: '2',
    title: 'Office Hours Change This Week',
    content: 'Due to a faculty meeting, my office hours on Thursday will be moved from 2-4 PM to 10-12 PM. Friday office hours remain unchanged.',
    type: 'schedule',
    priority: 'medium',
    targetAudience: 'all',
    createdAt: '2025-07-24',
    updatedAt: '2025-07-24',
    publishedAt: '2025-07-24',
    status: 'published',
    readCount: 23,
    pinned: false
  },
  {
    id: '3',
    title: 'New Assignment Guidelines',
    content: 'I have updated the assignment submission guidelines. Please review the new formatting requirements and deadline policies.',
    type: 'course',
    priority: 'medium',
    targetAudience: 'course-specific',
    course: 'CS101',
    createdAt: '2025-07-23',
    updatedAt: '2025-07-23',
    status: 'draft',
    readCount: 0,
    pinned: false
  }
]

// --- Constants (Unchanged) ---
const announcementTypes = ['general', 'urgent', 'course', 'schedule', 'system']
const priorities = ['low', 'medium', 'high']
const audiences = ['all', 'course-specific', 'year-specific']
const statusFilters = ['all', 'draft', 'published', 'expired']

export default function LecturerAnnouncementsPage() {
  const [announcements, setAnnouncements] = useState<Announcement[]>(mockAnnouncements)
  const [showNewForm, setShowNewForm] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [typeFilter, setTypeFilter] = useState('all')

  const [newAnnouncement, setNewAnnouncement] = useState({
    title: '',
    content: '',
    type: 'general' as 'general' | 'urgent' | 'course' | 'schedule' | 'system',
    priority: 'medium' as 'low' | 'medium' | 'high',
    targetAudience: 'all' as 'all' | 'course-specific' | 'year-specific',
    course: '',
    yearLevel: '',
    expiresAt: '',
    pinned: false
  })

  // --- Event Handlers (Functionality Unchanged) ---
  const handleSubmitAnnouncement = (e: React.FormEvent) => {
    e.preventDefault()
    const announcement: Announcement = {
      id: Date.now().toString(),
      ...newAnnouncement,
      createdAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0],
      publishedAt: new Date().toISOString().split('T')[0],
      status: 'published',
      readCount: 0
    }
    setAnnouncements([announcement, ...announcements])
    setNewAnnouncement({ title: '', content: '', type: 'general', priority: 'medium', targetAudience: 'all', course: '', yearLevel: '', expiresAt: '', pinned: false })
    setShowNewForm(false)
  }

  const handleDeleteAnnouncement = (id: string) => {
    if (confirm('Are you sure you want to delete this announcement?')) {
      setAnnouncements(announcements.filter(a => a.id !== id))
    }
  }

  const handleTogglePin = (id: string) => {
    setAnnouncements(announcements.map(a => a.id === id ? { ...a, pinned: !a.pinned } : a))
  }

  const handleToggleStatus = (id: string) => {
    setAnnouncements(announcements.map(a => a.id === id ? { ...a, status: a.status === 'published' ? 'draft' : 'published', publishedAt: a.status === 'draft' ? new Date().toISOString().split('T')[0] : a.publishedAt } : a))
  }

  // --- Filtering Logic (Unchanged) ---
  const filteredAnnouncements = announcements.filter(announcement => {
    const matchesSearch = announcement.title.toLowerCase().includes(searchTerm.toLowerCase()) || announcement.content.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || announcement.status === statusFilter
    const matchesType = typeFilter === 'all' || announcement.type === typeFilter
    return matchesSearch && matchesStatus && matchesType
  })

  // --- Helper Functions for Styling ---
  const getTagColor = (type: 'type' | 'priority' | 'status', value: string) => {
    const colors = {
      type: { urgent: 'bg-red-500/20 text-red-700', course: 'bg-blue-500/20 text-blue-700', schedule: 'bg-purple-500/20 text-purple-700', system: 'bg-gray-500/20 text-gray-700', default: 'bg-green-500/20 text-green-700' },
      priority: { high: 'bg-red-500/20 text-red-700', medium: 'bg-orange-500/20 text-orange-700', low: 'bg-green-500/20 text-green-700', default: 'bg-gray-500/20 text-gray-700' },
      status: { published: 'bg-green-500/20 text-green-700', draft: 'bg-yellow-500/20 text-yellow-700', expired: 'bg-gray-500/20 text-gray-700', default: 'bg-gray-500/20 text-gray-700' }
    }
    return colors[type][value] || colors[type].default
  }

  const getAttachmentIcon = (type: string) => {
    if (type.includes('pdf')) return <svg className="w-4 h-4 text-red-600" fill="currentColor" viewBox="0 0 24 24"><path d="M20 2H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM9.5 14.5v-2H11v.5h2v-1h-2v-.5H9.5v-2h3c.83 0 1.5.67 1.5 1.5v1c0 .83-.67 1.5-1.5 1.5h-3zm-1-4H6v-1h2.5v1zM18 15h-2v-1.5h-1.5v-1H18V15zm-2-3h-2v-1h2v1z"/></svg>
    return <svg className="w-4 h-4 text-gray-600" fill="currentColor" viewBox="0 0 24 24"><path d="M6 2c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6H6zm7 7V3.5L18.5 9H13z"/></svg>
  }

  return (
    <>
      {/* --- START: Global Styles & Animations --- */}
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
        .animate-glass-fade-in { animation: glass-fade-in 1.2s ease-out forwards; }
        @keyframes slide-up-delayed { 0% { opacity: 0; transform: translateY(40px); } 100% { opacity: 1; transform: translateY(0); } }
        .animate-slide-up-delayed { animation: slide-up-delayed 0.8s ease-out 0.2s forwards; opacity: 0; }
        .animate-slide-up-delayed-2 { animation: slide-up-delayed 0.8s ease-out 0.4s forwards; opacity: 0; }
        .animate-slide-up-delayed-3 { animation: slide-up-delayed 0.8s ease-out 0.6s forwards; opacity: 0; }
        .animate-slide-up-delayed-4 { animation: slide-up-delayed 0.8s ease-out 0.8s forwards; opacity: 0; }
        .animate-slide-up-delayed-5 { animation: slide-up-delayed 0.8s ease-out 1.0s forwards; opacity: 0; }
        .animate-slide-up-delayed-6 { animation: slide-up-delayed 0.8s ease-out 1.2s forwards; opacity: 0; }
        .animate-slide-up-delayed-7 { animation: slide-up-delayed 0.8s ease-out 1.4s forwards; opacity: 0; }
        .animate-slide-up-delayed-8 { animation: slide-up-delayed 0.8s ease-out 1.6s forwards; opacity: 0; }
        .animate-slide-up-delayed-9 { animation: slide-up-delayed 0.8s ease-out 1.8s forwards; opacity: 0; }
        .floating-icon { animation: float 6s ease-in-out infinite; }
        .floating-icon-reverse { animation: float-reverse 7s ease-in-out infinite; }
        .floating-icon-slow { animation: float 10s ease-in-out infinite; }
        @keyframes float { 0% { transform: translateY(0) rotate(0deg); } 50% { transform: translateY(-15px) rotate(5deg); } 100% { transform: translateY(0) rotate(0deg); } }
        @keyframes float-reverse { 0% { transform: translateY(0) rotate(0deg); } 50% { transform: translateY(15px) rotate(-5deg); } 100% { transform: translateY(0) rotate(0deg); } }
        
        /* Enhanced Glassmorphism Card Styles */
        .glass-card { 
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.5)); 
          backdrop-filter: blur(40px) saturate(120%); 
          border: 1px solid rgba(255, 255, 255, 0.9); 
          box-shadow: 
            0 12px 40px rgba(31, 38, 135, 0.2), 
            0 0 0 1px rgba(255, 255, 255, 0.6) inset, 
            0 4px 16px rgba(255, 255, 255, 0.8) inset;
        }
        .glass-stat-card { 
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.85), rgba(255, 255, 255, 0.4)); 
          backdrop-filter: blur(32px) saturate(110%); 
          border: 1px solid rgba(255, 255, 255, 0.85); 
          box-shadow: 
            0 8px 32px rgba(31, 38, 135, 0.15), 
            0 0 0 1px rgba(255, 255, 255, 0.5) inset,
            0 2px 12px rgba(255, 255, 255, 0.9) inset; 
        }
        .glass-activity-card { 
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.3)); 
          backdrop-filter: blur(28px) saturate(105%); 
          border: 1px solid rgba(255, 255, 255, 0.75); 
          box-shadow: 
            0 6px 24px rgba(31, 38, 135, 0.12), 
            0 0 0 1px rgba(255, 255, 255, 0.4) inset,
            0 1px 8px rgba(255, 255, 255, 0.7) inset; 
        }
        .glass-sidebar-card { 
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.88), rgba(255, 255, 255, 0.45)); 
          backdrop-filter: blur(36px) saturate(115%); 
          border: 1px solid rgba(255, 255, 255, 0.9); 
          box-shadow: 
            0 10px 36px rgba(31, 38, 135, 0.18), 
            0 0 0 1px rgba(255, 255, 255, 0.55) inset,
            0 3px 14px rgba(255, 255, 255, 0.85) inset; 
        }
        .glass-premium-card {
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.92), rgba(255, 255, 255, 0.55)); 
          backdrop-filter: blur(44px) saturate(125%); 
          border: 1px solid rgba(255, 255, 255, 0.95); 
          box-shadow: 
            0 16px 48px rgba(31, 38, 135, 0.25), 
            0 0 0 1px rgba(255, 255, 255, 0.7) inset,
            0 6px 20px rgba(255, 255, 255, 0.95) inset,
            0 0 60px rgba(59, 130, 246, 0.1); 
        }
        .text-clean-shadow { filter: drop-shadow(0 2px 4px rgba(59, 130, 246, 0.2)); }
      `}</style>
      {/* --- END: Global Styles & Animations --- */}

      <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
        
        {/* --- START: Multi-Layered Animated Background --- */}
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
          <div className="max-w-7xl mx-auto">
            
            {/* Header */}
            <div className="mb-6 animate-glass-fade-in">
              <div className="relative group">
                <div className="absolute -inset-2 bg-gradient-to-r from-blue-300/20 via-purple-300/30 to-pink-300/20 rounded-2xl blur-xl opacity-60 group-hover:opacity-80 transition-all duration-1000 animate-aurora-glow" />
                <div className="relative glass-premium-card rounded-2xl p-5">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white shadow-lg">
                      <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M20 2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14l4 4V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z"/></svg>
                    </div>
                    <div>
                      <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent text-clean-shadow">
                        Announcements
                      </h1>
                      <p className="text-gray-600 text-sm font-medium">Create and manage announcements for your students</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Actions Bar */}
            <div className="glass-sidebar-card rounded-2xl p-4 mb-6 animate-slide-up-delayed">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div className="flex flex-col sm:flex-row gap-4 flex-1">
                  <input type="text" placeholder="Search announcements..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="glass-activity-card px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 border-none font-semibold text-gray-700 placeholder-gray-500 w-full lg:w-auto" />
                  <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="glass-activity-card px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 border-none font-semibold text-gray-700">
                    <option value="all">All Status</option>
                    {statusFilters.slice(1).map(status => <option key={status} value={status}>{status.charAt(0).toUpperCase() + status.slice(1)}</option>)}
                  </select>
                  <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)} className="glass-activity-card px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 border-none font-semibold text-gray-700">
                    <option value="all">All Types</option>
                    {announcementTypes.map(type => <option key={type} value={type}>{type.charAt(0).toUpperCase() + type.slice(1)}</option>)}
                  </select>
                </div>
                <button onClick={() => setShowNewForm(true)} className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-300 font-semibold shadow-md">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z"/></svg>
                  New Announcement
                </button>
              </div>
            </div>

            {/* New Announcement Form Modal */}
            {showNewForm && (
              <div className="fixed inset-0 bg-black/50 backdrop-blur-md flex items-center justify-center z-50 p-4 animate-glass-fade-in">
                <div className="glass-premium-card rounded-2xl p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Create New Announcement</h2>
                  <form onSubmit={handleSubmitAnnouncement} className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                      <input type="text" required value={newAnnouncement.title} onChange={(e) => setNewAnnouncement({...newAnnouncement, title: e.target.value})} className="w-full glass-activity-card px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 border-none font-semibold text-gray-700 placeholder-gray-500" placeholder="Announcement title" />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                        <select value={newAnnouncement.type} onChange={(e) => setNewAnnouncement({...newAnnouncement, type: e.target.value as typeof newAnnouncement.type})} className="w-full glass-activity-card px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 border-none font-semibold text-gray-700">
                          {announcementTypes.map(type => <option key={type} value={type}>{type.charAt(0).toUpperCase() + type.slice(1)}</option>)}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                        <select value={newAnnouncement.priority} onChange={(e) => setNewAnnouncement({...newAnnouncement, priority: e.target.value as typeof newAnnouncement.priority})} className="w-full glass-activity-card px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 border-none font-semibold text-gray-700">
                          {priorities.map(priority => <option key={priority} value={priority}>{priority.charAt(0).toUpperCase() + priority.slice(1)}</option>)}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Target Audience</label>
                        <select value={newAnnouncement.targetAudience} onChange={(e) => setNewAnnouncement({...newAnnouncement, targetAudience: e.target.value as typeof newAnnouncement.targetAudience})} className="w-full glass-activity-card px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 border-none font-semibold text-gray-700">
                          {audiences.map(audience => <option key={audience} value={audience}>{audience.charAt(0).toUpperCase() + audience.slice(1).replace('-', ' ')}</option>)}
                        </select>
                      </div>
                    </div>
                    {newAnnouncement.targetAudience === 'course-specific' && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Course</label>
                        <input type="text" value={newAnnouncement.course} onChange={(e) => setNewAnnouncement({...newAnnouncement, course: e.target.value})} className="w-full glass-activity-card px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 border-none font-semibold text-gray-700 placeholder-gray-500" placeholder="e.g., CS101, MATH202" />
                      </div>
                    )}
                    {newAnnouncement.targetAudience === 'year-specific' && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Year Level</label>
                        <select value={newAnnouncement.yearLevel} onChange={(e) => setNewAnnouncement({...newAnnouncement, yearLevel: e.target.value})} className="w-full glass-activity-card px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 border-none font-semibold text-gray-700">
                          <option value="">Select Year</option>
                          <option value="1st Year">1st Year</option>
                          <option value="2nd Year">2nd Year</option>
                          <option value="3rd Year">3rd Year</option>
                          <option value="4th Year">4th Year</option>
                        </select>
                      </div>
                    )}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
                      <textarea required rows={6} value={newAnnouncement.content} onChange={(e) => setNewAnnouncement({...newAnnouncement, content: e.target.value})} className="w-full glass-activity-card px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 border-none font-semibold text-gray-700 placeholder-gray-500" placeholder="Announcement content..." />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Expires At (Optional)</label>
                        <input type="date" value={newAnnouncement.expiresAt} onChange={(e) => setNewAnnouncement({...newAnnouncement, expiresAt: e.target.value})} className="w-full glass-activity-card px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 border-none font-semibold text-gray-700" />
                      </div>
                      <div className="flex items-center gap-2 pt-6">
                        <input type="checkbox" id="pinned" checked={newAnnouncement.pinned} onChange={(e) => setNewAnnouncement({...newAnnouncement, pinned: e.target.checked})} className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
                        <label htmlFor="pinned" className="text-sm font-medium text-gray-700">Pin this announcement</label>
                      </div>
                    </div>
                    <div className="flex gap-4 pt-4">
                      <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors shadow-md">Publish Announcement</button>
                      <button type="button" onClick={() => setShowNewForm(false)} className="bg-white/20 text-gray-800 px-6 py-2 rounded-lg hover:bg-white/40 transition-colors">Cancel</button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            {/* Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              {[
                { value: announcements.length, label: "Total", icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z"/></svg>, color: "blue", bgColor: "from-blue-500 to-blue-600", delay: "animate-slide-up-delayed-2" },
                { value: announcements.filter(a => a.status === 'published').length, label: "Published", icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>, color: "green", bgColor: "from-green-500 to-green-600", delay: "animate-slide-up-delayed-3" },
                { value: announcements.filter(a => a.status === 'draft').length, label: "Drafts", icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34a.9959.9959 0 00-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>, color: "yellow", bgColor: "from-yellow-500 to-orange-500", delay: "animate-slide-up-delayed-4" },
                { value: announcements.filter(a => a.pinned).length, label: "Pinned", icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M16 9V4h1V2H7v2h1v5l-2 2v2h5.2v7h1.6v-7H18v-2l-2-2z"/></svg>, color: "purple", bgColor: "from-purple-500 to-purple-600", delay: "animate-slide-up-delayed-5" }
              ].map((stat, index) => (
                <div key={index} className={`group ${stat.delay}`}>
                  <div className="relative overflow-hidden rounded-xl transition-all duration-500 hover:scale-105 hover:-translate-y-1">
                    <div className={`absolute -inset-1 bg-gradient-to-r ${stat.bgColor} rounded-xl blur-md opacity-20 group-hover:opacity-40 transition-all duration-500`} />
                    <div className="relative glass-stat-card rounded-xl group-hover:shadow-xl transition-all duration-500 p-3">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 bg-gradient-to-br ${stat.bgColor} rounded-lg flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>{stat.icon}</div>
                        <div className="flex-1 min-w-0">
                          <div className={`text-xl font-bold text-${stat.color}-600`}>{stat.value}</div>
                          <div className="text-xs text-gray-600 font-semibold leading-tight truncate">{stat.label}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Announcements List */}
            <div className="space-y-4 animate-slide-up-delayed-6">
              {filteredAnnouncements.length === 0 ? (
                <div className="glass-card rounded-2xl p-8 text-center">
                  <h3 className="text-xl font-bold text-gray-700 mb-2">No Announcements Found</h3>
                  <p className="text-gray-500 mb-4">Try adjusting your filters or create a new announcement.</p>
                  <button onClick={() => setShowNewForm(true)} className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-300 font-semibold shadow-md">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z"/></svg>
                    Create Your First Announcement
                  </button>
                </div>
              ) : (
                filteredAnnouncements.map((announcement) => (
                  <div key={announcement.id} className={`relative group transition-all duration-300 ${announcement.pinned ? 'scale-[1.02]' : ''}`}>
                    {announcement.pinned && <div className="absolute -inset-2 bg-gradient-to-r from-purple-300/20 via-blue-300/30 to-pink-300/20 rounded-2xl blur-xl opacity-60 group-hover:opacity-80 transition-all duration-1000 animate-aurora-glow" />}
                    <div className={`${announcement.pinned ? 'glass-premium-card' : 'glass-card'} rounded-2xl p-5 transition-all duration-300 group-hover:shadow-2xl`}>
                      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            {announcement.pinned && <svg className="w-5 h-5 text-purple-500" fill="currentColor" viewBox="0 0 24 24"><path d="M16 9V4h1V2H7v2h1v5l-2 2v2h5.2v7h1.6v-7H18v-2l-2-2z"/></svg>}
                            <h3 className="text-lg font-semibold text-gray-900">{announcement.title}</h3>
                          </div>
                          <div className="flex flex-wrap items-center gap-2 mb-3">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTagColor('status', announcement.status)}`}>{announcement.status}</span>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTagColor('type', announcement.type)}`}>{announcement.type}</span>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTagColor('priority', announcement.priority)}`}>{announcement.priority}</span>
                          </div>
                          <p className="text-gray-600 mb-3 line-clamp-3">{announcement.content}</p>
                          <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-gray-500">
                            <span>Audience: <span className="font-medium text-gray-700">{announcement.targetAudience.replace('-', ' ')}</span></span>
                            {announcement.course && <span>Course: <span className="font-medium text-gray-700">{announcement.course}</span></span>}
                            {announcement.status === 'published' && <span>Read by: <span className="font-medium text-gray-700">{announcement.readCount} students</span></span>}
                          </div>
                          {announcement.attachments && announcement.attachments.length > 0 && (
                            <div className="mt-3 flex gap-2">
                              {announcement.attachments.map((attachment, idx) => (
                                <span key={idx} className="text-xs glass-activity-card px-2 py-1 rounded-md flex items-center gap-1.5 font-medium text-gray-700">
                                  {getAttachmentIcon(attachment.type)} {attachment.name}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                        <div className="flex flex-row lg:flex-col gap-2 flex-wrap">
                          <button onClick={() => handleToggleStatus(announcement.id)} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors duration-300 bg-white/20 hover:bg-white/40 text-gray-800">{announcement.status === 'published' ? 'Unpublish' : 'Publish'}</button>
                          <button onClick={() => handleTogglePin(announcement.id)} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors duration-300 bg-white/20 hover:bg-white/40 text-gray-800">{announcement.pinned ? 'Unpin' : 'Pin'}</button>
                          <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors duration-300 bg-blue-500/20 hover:bg-blue-500/40 text-blue-800">Edit</button>
                          <button onClick={() => handleDeleteAnnouncement(announcement.id)} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors duration-300 bg-red-500/20 hover:bg-red-500/40 text-red-800">Delete</button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}