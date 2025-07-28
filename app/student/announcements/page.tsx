// app/student/announcements/page.tsx - ENHANCED WITH DASHBOARD STYLES
'use client'

import { useState } from 'react'
import Link from 'next/link'

interface Announcement {
  id: string
  title: string
  content: string
  type: 'general' | 'urgent' | 'course' | 'schedule' | 'system'
  priority: 'low' | 'medium' | 'high'
  targetAudience: 'all' | 'course-specific' | 'year-specific'
  course?: string
  yearLevel?: string
  lecturer: string
  lecturerAvatar?: string
  createdAt: string
  publishedAt: string
  expiresAt?: string
  pinned: boolean
  read: boolean
  attachments?: {
    name: string
    url: string
    type: string
  }[]
}

// Mock data - in real app this would come from API based on student's courses
const mockAnnouncements: Announcement[] = [
  {
    id: '1',
    title: 'Mid-term Exam Schedule Released',
    content: 'The mid-term examination schedule for CS101 has been released. Please check the course portal for your exam slots. Make sure to arrive 15 minutes early and bring your student ID. The exam will cover chapters 1-6 from the textbook and all lab exercises completed so far.',
    type: 'course',
    priority: 'high',
    targetAudience: 'course-specific',
    course: 'CS101',
    lecturer: 'Dr. Sarah Johnson',
    lecturerAvatar: '👩‍🏫',
    createdAt: '2025-07-25',
    publishedAt: '2025-07-25',
    expiresAt: '2025-08-15',
    pinned: true,
    read: false,
    attachments: [
      { name: 'exam_schedule.pdf', url: '#', type: 'pdf' },
      { name: 'exam_guidelines.pdf', url: '#', type: 'pdf' }
    ]
  },
  {
    id: '2',
    title: '🚨 System Maintenance Tonight',
    content: 'The university portal will be undergoing scheduled maintenance tonight from 11 PM to 3 AM. During this time, you may experience difficulty accessing course materials and submitting assignments. Please plan accordingly.',
    type: 'urgent',
    priority: 'high',
    targetAudience: 'all',
    lecturer: 'IT Support Team',
    lecturerAvatar: '🔧',
    createdAt: '2025-07-26',
    publishedAt: '2025-07-26',
    expiresAt: '2025-07-27',
    pinned: true,
    read: true
  },
  {
    id: '3',
    title: 'Office Hours Change This Week',
    content: 'Due to a faculty meeting, my office hours on Thursday will be moved from 2-4 PM to 10-12 PM. Friday office hours remain unchanged (3-5 PM). You can still book appointments through the EduLink system.',
    type: 'schedule',
    priority: 'medium',
    targetAudience: 'all',
    lecturer: 'Dr. Sarah Johnson',
    lecturerAvatar: '👩‍🏫',
    createdAt: '2025-07-24',
    publishedAt: '2025-07-24',
    pinned: false,
    read: true
  },
  {
    id: '4',
    title: 'New Study Group Session',
    content: 'I\'m organizing an optional study group session for MATH202 this Saturday from 2-4 PM in Room 301. We\'ll review calculus concepts and work through practice problems. No need to register, just show up!',
    type: 'course',
    priority: 'low',
    targetAudience: 'course-specific',
    course: 'MATH202',
    lecturer: 'Prof. Michael Chen',
    lecturerAvatar: '👨‍🏫',
    createdAt: '2025-07-23',
    publishedAt: '2025-07-23',
    pinned: false,
    read: false
  },
  {
    id: '5',
    title: 'Library Extended Hours During Finals',
    content: 'Good news! The university library will be extending its hours during finals week. We\'ll be open 24/7 from Monday to Friday. Additional study spaces and computers will also be available.',
    type: 'general',
    priority: 'medium',
    targetAudience: 'all',
    lecturer: 'Library Administration',
    lecturerAvatar: '📚',
    createdAt: '2025-07-22',
    publishedAt: '2025-07-22',
    pinned: false,
    read: true
  }
]

const typeFilters = ['all', 'general', 'urgent', 'course', 'schedule', 'system']
const priorityFilters = ['all', 'high', 'medium', 'low']
const readFilters = ['all', 'unread', 'read']

export default function StudentAnnouncementsPage() {
  const [announcements, setAnnouncements] = useState<Announcement[]>(mockAnnouncements)
  const [searchTerm, setSearchTerm] = useState('')
  const [typeFilter, setTypeFilter] = useState('all')
  const [priorityFilter, setPriorityFilter] = useState('all')
  const [readFilter, setReadFilter] = useState('all')
  const [selectedAnnouncement, setSelectedAnnouncement] = useState<Announcement | null>(null)

  // Mark announcement as read when viewed
  const handleViewAnnouncement = (announcement: Announcement) => {
    if (!announcement.read) {
      setAnnouncements(announcements.map(a => 
        a.id === announcement.id ? { ...a, read: true } : a
      ))
    }
    setSelectedAnnouncement(announcement)
  }

  const handleMarkAsRead = (id: string) => {
    setAnnouncements(announcements.map(a => 
      a.id === id ? { ...a, read: true } : a
    ))
  }

  const handleMarkAllAsRead = () => {
    setAnnouncements(announcements.map(a => ({ ...a, read: true })))
  }

  // Filter announcements
  const filteredAnnouncements = announcements.filter(announcement => {
    const matchesSearch = announcement.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         announcement.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         announcement.lecturer.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = typeFilter === 'all' || announcement.type === typeFilter
    const matchesPriority = priorityFilter === 'all' || announcement.priority === priorityFilter
    const matchesRead = readFilter === 'all' || 
                       (readFilter === 'read' && announcement.read) ||
                       (readFilter === 'unread' && !announcement.read)
    
    return matchesSearch && matchesType && matchesPriority && matchesRead
  })

  // Sort announcements (pinned first, then by date)
  const sortedAnnouncements = filteredAnnouncements.sort((a, b) => {
    if (a.pinned && !b.pinned) return -1
    if (!a.pinned && b.pinned) return 1
    return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  })

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'urgent': return 'bg-red-100 text-red-800'
      case 'course': return 'bg-blue-100 text-blue-800'
      case 'schedule': return 'bg-purple-100 text-purple-800'
      case 'system': return 'bg-gray-200 text-gray-800'
      default: return 'bg-green-100 text-green-800'
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

  const unreadCount = announcements.filter(a => !a.read).length
  const glassInputStyles = "w-full px-4 py-2 border rounded-lg transition-all duration-300 focus:ring-2 focus:ring-blue-500 bg-white/60 border-gray-300/70 focus:bg-white/80 text-gray-800"

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
        .animate-slide-up-delayed-4 { animation: slide-up-delayed 0.8s ease-out 0.8s forwards; opacity: 0; }
        
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
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="mb-8 animate-glass-fade-in">
              <div className="relative group">
                <div className="absolute -inset-2 bg-gradient-to-r from-blue-300/20 via-purple-300/30 to-pink-300/20 rounded-2xl blur-xl opacity-60 group-hover:opacity-80 transition-all duration-1000 animate-aurora-glow" />
                <div className="relative glass-card rounded-2xl p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-teal-600 rounded-xl flex items-center justify-center text-white text-2xl font-bold shadow-lg">📢</div>
                    <div>
                      <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent text-clean-shadow mb-1">Announcements</h1>
                      <p className="text-gray-600">Stay updated with the latest news and information</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <div className="glass-stat-card p-4 rounded-xl animate-slide-up-delayed">
                <div className="text-3xl font-bold text-blue-600">{announcements.length}</div>
                <div className="text-sm text-blue-800 font-semibold">Total Announcements</div>
              </div>
              <div className="glass-stat-card p-4 rounded-xl animate-slide-up-delayed-2">
                <div className="text-3xl font-bold text-red-600">{unreadCount}</div>
                <div className="text-sm text-red-800 font-semibold">Unread</div>
              </div>
              <div className="glass-stat-card p-4 rounded-xl animate-slide-up-delayed-3">
                <div className="text-3xl font-bold text-yellow-600">{announcements.filter(a => a.pinned).length}</div>
                <div className="text-sm text-yellow-800 font-semibold">Pinned</div>
              </div>
              <div className="glass-stat-card p-4 rounded-xl animate-slide-up-delayed-4">
                <div className="text-3xl font-bold text-purple-600">{announcements.filter(a => a.priority === 'high').length}</div>
                <div className="text-sm text-purple-800 font-semibold">High Priority</div>
              </div>
            </div>

            {/* Filters & Actions */}
            <div className="glass-card rounded-2xl p-6 mb-6 animate-slide-up-delayed-2">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div className="flex flex-col sm:flex-row gap-4 flex-1">
                  <input type="text" placeholder="Search announcements..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className={glassInputStyles} />
                  <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)} className={glassInputStyles}>
                    {typeFilters.map(type => (<option key={type} value={type}>{type === 'all' ? 'All Types' : type.charAt(0).toUpperCase() + type.slice(1)}</option>))}
                  </select>
                  <select value={priorityFilter} onChange={(e) => setPriorityFilter(e.target.value)} className={glassInputStyles}>
                    {priorityFilters.map(priority => (<option key={priority} value={priority}>{priority === 'all' ? 'All Priorities' : priority.charAt(0).toUpperCase() + priority.slice(1)}</option>))}
                  </select>
                  <select value={readFilter} onChange={(e) => setReadFilter(e.target.value)} className={glassInputStyles}>
                    {readFilters.map(filter => (<option key={filter} value={filter}>{filter === 'all' ? 'All' : filter.charAt(0).toUpperCase() + filter.slice(1)}</option>))}
                  </select>
                </div>
                <div className="flex gap-2">
                  {unreadCount > 0 && (
                    <button onClick={handleMarkAllAsRead} className="px-4 py-2 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg">
                      Mark All as Read
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Announcements List */}
            <div className="space-y-4">
              {sortedAnnouncements.length === 0 ? (
                <div className="glass-card rounded-2xl p-12 text-center">
                  <div className="text-6xl mb-4">🧐</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">No Announcements Found</h3>
                  <p className="text-gray-600">Try adjusting your search or filter criteria.</p>
                </div>
              ) : (
                sortedAnnouncements.map((announcement) => (
                  <div
                    key={announcement.id}
                    className={`glass-activity-card rounded-lg p-6 hover:shadow-xl hover:scale-[1.01] transition-all duration-300 cursor-pointer border-l-4 ${
                      !announcement.read ? 'border-blue-500' : announcement.pinned ? 'border-yellow-500' : 'border-transparent'
                    }`}
                    onClick={() => handleViewAnnouncement(announcement)}
                  >
                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3 flex-wrap">
                          {announcement.pinned && <span className="text-yellow-500 text-xl">📌</span>}
                          {!announcement.read && <span className="w-2.5 h-2.5 bg-blue-500 rounded-full animate-pulse"></span>}
                          <h3 className={`text-lg font-semibold ${!announcement.read ? 'text-gray-900' : 'text-gray-800'}`}>{announcement.title}</h3>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(announcement.type)}`}>{announcement.type.charAt(0).toUpperCase() + announcement.type.slice(1)}</span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(announcement.priority)}`}>{announcement.priority.charAt(0).toUpperCase() + announcement.priority.slice(1)}</span>
                        </div>
                        <div className="flex items-center gap-3 mb-3">
                          <span className="text-2xl">{announcement.lecturerAvatar}</span>
                          <div>
                            <div className="font-medium text-gray-900">{announcement.lecturer}</div>
                            <div className="text-sm text-gray-600">
                              {announcement.publishedAt}
                              {announcement.course && <span className="ml-2">• {announcement.course}</span>}
                              {announcement.expiresAt && (<span className="ml-2 text-orange-600 font-medium">• Expires {announcement.expiresAt}</span>)}
                            </div>
                          </div>
                        </div>
                        <p className="text-gray-700 mb-3 line-clamp-3">{announcement.content}</p>
                        {announcement.attachments && announcement.attachments.length > 0 && (
                          <div className="flex gap-2 mb-3 flex-wrap">
                            {announcement.attachments.map((attachment, idx) => (
                              <span key={idx} className="text-xs bg-gray-200/70 text-gray-700 px-2 py-1 rounded flex items-center gap-1">📎 {attachment.name}</span>
                            ))}
                          </div>
                        )}
                      </div>
                      <div className="flex flex-col gap-2 w-full lg:w-auto">
                        <button onClick={(e) => { e.stopPropagation(); handleViewAnnouncement(announcement); }} className="bg-white/80 text-gray-700 px-4 py-2 rounded-lg hover:bg-white shadow-sm border border-gray-200 transition-all transform hover:scale-105 text-sm font-semibold">View Details</button>
                        {!announcement.read && (<button onClick={(e) => { e.stopPropagation(); handleMarkAsRead(announcement.id); }} className="bg-white/50 text-gray-600 px-4 py-2 rounded-lg hover:bg-white/70 transition-colors text-sm font-semibold">Mark as Read</button>)}
                        {announcement.course && (<Link href={`/student/resources?course=${encodeURIComponent(announcement.course)}`} className="bg-green-100/80 text-green-700 px-4 py-2 rounded-lg hover:bg-green-100 transition-colors text-sm text-center font-medium" onClick={(e) => e.stopPropagation()}>Course Resources</Link>)}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Announcement Detail Modal */}
            {selectedAnnouncement && (
              <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-glass-fade-in">
                <div className="glass-card rounded-2xl p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
                  <div className="flex justify-between items-start mb-6">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        {selectedAnnouncement.pinned && <span className="text-yellow-500 text-2xl">📌</span>}
                        <h2 className="text-2xl font-bold text-gray-900">{selectedAnnouncement.title}</h2>
                      </div>
                      <div className="flex flex-wrap gap-2 mb-4">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getTypeColor(selectedAnnouncement.type)}`}>{selectedAnnouncement.type.charAt(0).toUpperCase() + selectedAnnouncement.type.slice(1)}</span>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getPriorityColor(selectedAnnouncement.priority)}`}>{selectedAnnouncement.priority.charAt(0).toUpperCase() + selectedAnnouncement.priority.slice(1)} Priority</span>
                        {selectedAnnouncement.course && (<span className="px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">{selectedAnnouncement.course}</span>)}
                      </div>
                    </div>
                    <button onClick={() => setSelectedAnnouncement(null)} className="text-gray-400 hover:text-gray-600 text-3xl">×</button>
                  </div>
                  <div className="flex items-center gap-3 mb-6 p-4 glass-activity-card rounded-lg">
                    <span className="text-3xl">{selectedAnnouncement.lecturerAvatar}</span>
                    <div>
                      <div className="font-semibold text-gray-900">{selectedAnnouncement.lecturer}</div>
                      <div className="text-sm text-gray-600">
                        Published on {selectedAnnouncement.publishedAt}
                        {selectedAnnouncement.expiresAt && (<span className="ml-2 text-orange-600 font-medium">• Expires {selectedAnnouncement.expiresAt}</span>)}
                      </div>
                    </div>
                  </div>
                  <div className="prose max-w-none mb-6">
                    <p className="text-gray-700 leading-relaxed whitespace-pre-line">{selectedAnnouncement.content}</p>
                  </div>
                  {selectedAnnouncement.attachments && selectedAnnouncement.attachments.length > 0 && (
                    <div className="mb-6">
                      <h4 className="font-semibold text-gray-900 mb-3">Attachments</h4>
                      <div className="space-y-2">
                        {selectedAnnouncement.attachments.map((attachment, idx) => (
                          <a key={idx} href={attachment.url} className="flex items-center gap-3 p-3 glass-activity-card rounded-lg hover:shadow-md transition-all duration-300">
                            <span className="text-blue-600 text-xl">📎</span>
                            <span className="font-medium text-gray-900">{attachment.name}</span>
                            <span className="text-sm text-gray-500">({attachment.type.toUpperCase()})</span>
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                  <div className="flex flex-wrap gap-3 pt-4 border-t border-white/30">
                    <button onClick={() => setSelectedAnnouncement(null)} className="bg-white/70 text-gray-700 px-6 py-2 rounded-lg hover:bg-white/90 transition-colors shadow-sm border border-gray-300/50 font-semibold">Close</button>
                    {selectedAnnouncement.course && (<Link href={`/student/resources?course=${encodeURIComponent(selectedAnnouncement.course)}`} className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-2 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105 font-semibold">View Course Resources</Link>)}
                    <Link href={`/student/appointments?lecturer=${encodeURIComponent(selectedAnnouncement.lecturer)}`} className="bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-2 rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105 font-semibold">Book Appointment</Link>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}