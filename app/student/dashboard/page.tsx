// app/student/dashboard/page.tsx - LINTING ERRORS FIXED
'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

// --- Interfaces ---
interface DashboardStats {
  totalQueries: number
  pendingQueries: number
  unreadAnnouncements: number
  upcomingAppointments: number
  unreadMessages: number
  enrolledCourses: number
}

interface RecentActivity {
  id: string
  type: 'query' | 'announcement' | 'appointment' | 'message'
  title: string
  description: string
  timestamp: string
  priority?: 'low' | 'medium' | 'high'
  read?: boolean
}

interface UpcomingAppointment {
  id: string
  lecturer: string
  subject: string
  date: string
  time: string
  location: string
  status: 'confirmed' | 'pending'
}

// --- Mock Data (Original data preserved) ---
const mockStats: DashboardStats = {
  totalQueries: 8,
  pendingQueries: 2,
  unreadAnnouncements: 3,
  upcomingAppointments: 1,
  unreadMessages: 5,
  enrolledCourses: 3
}

const mockRecentActivity: RecentActivity[] = [
  {
    id: '1',
    type: 'announcement',
    title: 'Mid-term Exam Schedule Released',
    description: 'Dr. Sarah Johnson posted an important announcement about CS101 exams',
    timestamp: '2 hours ago',
    priority: 'high',
    read: false
  },
  {
    id: '2',
    type: 'query',
    title: 'Assignment Extension Request',
    description: 'Your query about assignment deadline has been approved',
    timestamp: '5 hours ago',
    read: true
  },
  {
    id: '3',
    type: 'message',
    title: 'New message from Dr. Sarah Johnson',
    description: 'Regarding your question about the lab assignment',
    timestamp: '1 day ago',
    read: false
  },
  {
    id: '4',
    type: 'appointment',
    title: 'Appointment Confirmed',
    description: 'Your office hours meeting with Prof. Michael Chen is confirmed',
    timestamp: '2 days ago',
    read: true
  }
]

const mockUpcomingAppointments: UpcomingAppointment[] = [
  {
    id: '1',
    lecturer: 'Prof. Michael Chen',
    subject: 'Calculus II Questions',
    date: '2025-07-28',
    time: '2:00 PM',
    location: 'Office 301B',
    status: 'confirmed'
  }
]

export default function StudentDashboard() {
  // FIX: Removed unused state setters (setStats, setRecentActivity, setUpcomingAppointments)
  // The state is initialized with mock data and never updated, so the setters are not needed.
  const [stats] = useState<DashboardStats>(mockStats)
  const [recentActivity] = useState<RecentActivity[]>(mockRecentActivity)
  const [upcomingAppointments] = useState<UpcomingAppointment[]>(mockUpcomingAppointments)
  const [currentTime, setCurrentTime] = useState<string>('')

  useEffect(() => {
    // Function to format time
    const updateTime = () => {
      setCurrentTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    };
    
    updateTime(); // Set initial time
    const timer = setInterval(updateTime, 1000);

    return () => clearInterval(timer);
  }, [])

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'query': return '❓'
      case 'announcement': return '📢'
      case 'appointment': return '📅'
      case 'message': return '💬'
      default: return '📄'
    }
  }

  const getActivityColor = (type: string, priority?: string) => {
    if (priority === 'high') return 'border-l-red-400/60'
    
    switch (type) {
      case 'query': return 'border-l-blue-400/60'
      case 'announcement': return 'border-l-green-400/60'
      case 'appointment': return 'border-l-purple-400/60'
      case 'message': return 'border-l-yellow-400/60'
      default: return 'border-l-gray-400/60'
    }
  }

  return (
    <>
      {/* --- START: Global Styles & Animations (Unchanged) --- */}
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
        .glass-card { background: linear-gradient(135deg, rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.4)); backdrop-filter: blur(32px); border: 1px solid rgba(255, 255, 255, 0.9); box-shadow: 0 8px 32px rgba(31, 38, 135, 0.15), 0 0 0 1px rgba(255, 255, 255, 0.5) inset, 0 2px 8px rgba(255, 255, 255, 0.7) inset; }
        .glass-stat-card { background: linear-gradient(135deg, rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 0.3)); backdrop-filter: blur(24px); border: 1px solid rgba(255, 255, 255, 0.8); box-shadow: 0 6px 24px rgba(31, 38, 135, 0.1), 0 0 0 1px rgba(255, 255, 255, 0.4) inset; }
        .glass-activity-card { background: linear-gradient(135deg, rgba(255, 255, 255, 0.6), rgba(255, 255, 255, 0.2)); backdrop-filter: blur(20px); border: 1px solid rgba(255, 255, 255, 0.7); box-shadow: 0 4px 16px rgba(31, 38, 135, 0.08), 0 0 0 1px rgba(255, 255, 255, 0.3) inset; }
        .glass-sidebar-card { background: linear-gradient(135deg, rgba(255, 255, 255, 0.75), rgba(255, 255, 255, 0.35)); backdrop-filter: blur(28px); border: 1px solid rgba(255, 255, 255, 0.85); box-shadow: 0 6px 20px rgba(31, 38, 135, 0.12), 0 0 0 1px rgba(255, 255, 255, 0.45) inset; }
        .text-clean-shadow { filter: drop-shadow(0 2px 4px rgba(59, 130, 246, 0.2)); }
      `}</style>
      {/* --- END: Global Styles & Animations --- */}

      <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
        
        {/* --- START: Multi-Layered Animated Background (Unchanged) --- */}
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

        {/* --- START: Main Dashboard Content --- */}
        <div className="relative z-20 min-h-screen p-4 sm:p-6">
          <div className="max-w-screen-2xl mx-auto">
            
            {/* Header (Unchanged) */}
            <div className="mb-6 animate-glass-fade-in">
              <div className="relative group">
                <div className="absolute -inset-2 bg-gradient-to-r from-blue-300/20 via-purple-300/30 to-pink-300/20 rounded-2xl blur-xl opacity-60 group-hover:opacity-80 transition-all duration-1000 animate-aurora-glow" />
                <div className="relative glass-card rounded-2xl overflow-hidden">
                  <div className="p-5">
                    <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4">
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                          👨‍🎓
                        </div>
                        <div>
                          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent text-clean-shadow">
                            Welcome back, Student!
                          </h1>
                          {/* FIX: Replaced ' with &apos; to fix react/no-unescaped-entities error */}
                          <p className="text-gray-600 text-sm font-medium">Here&apos;s what&apos;s happening with your studies today.</p>
                        </div>
                      </div>
                      <div className="glass-activity-card rounded-xl p-3 text-center min-w-[180px]">
                        <div className="text-xs text-gray-500 font-semibold uppercase tracking-wide">{new Date().toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })}</div>
                        <div className="text-2xl font-bold text-gray-900">{currentTime}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Stats Grid (Unchanged) */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
              {[
                { href: "/student/queries", value: stats.totalQueries, label: "Queries", icon: "❓", color: "blue", bgColor: "from-blue-500 to-blue-600", pending: stats.pendingQueries, delay: "animate-slide-up-delayed" },
                { href: "/student/announcements", value: stats.unreadAnnouncements, label: "Announcements", icon: "📢", color: "green", bgColor: "from-green-500 to-green-600", delay: "animate-slide-up-delayed-2" },
                { href: "/student/appointments", value: stats.upcomingAppointments, label: "Appointments", icon: "📅", color: "purple", bgColor: "from-purple-500 to-purple-600", delay: "animate-slide-up-delayed-3" },
                { href: "/student/messages", value: stats.unreadMessages, label: "Messages", icon: "💬", color: "yellow", bgColor: "from-yellow-500 to-orange-500", delay: "animate-slide-up-delayed-4" },
                { href: "/student/courses", value: stats.enrolledCourses, label: "Courses", icon: "📚", color: "indigo", bgColor: "from-indigo-500 to-indigo-600", delay: "animate-slide-up-delayed-5" },
                { href: "/student/resources", value: 24, label: "Resources", icon: "📋", color: "red", bgColor: "from-red-500 to-red-600", delay: "animate-slide-up-delayed-6" }
              ].map((stat) => (
                <Link key={stat.label} href={stat.href} className={`group ${stat.delay}`}>
                  <div className="relative overflow-hidden rounded-xl transition-all duration-500 hover:scale-105 hover:-translate-y-1">
                    <div className={`absolute -inset-1 bg-gradient-to-r ${stat.bgColor} rounded-xl blur-md opacity-20 group-hover:opacity-40 transition-all duration-500`} />
                    <div className="relative glass-stat-card rounded-xl group-hover:shadow-xl transition-all duration-500">
                      <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-white/10 opacity-0 group-hover:opacity-100 transition-all duration-500" />
                      <div className="relative p-3">
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 bg-gradient-to-br ${stat.bgColor} rounded-lg flex items-center justify-center text-white text-xl shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                            {stat.icon}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className={`text-xl font-bold text-${stat.color}-600`}>{stat.value}</div>
                            <div className="text-xs text-gray-600 font-semibold leading-tight truncate">{stat.label}</div>
                            {stat.pending && stat.pending > 0 && (<div className="text-xs text-orange-600 font-bold">{stat.pending} pending</div>)}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* --- START: RE-ORDERED LAYOUT SECTION --- */}
            <div className="flex flex-col gap-6">

              {/* Grid container for all the smaller cards (MOVED UP) */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
                
                {/* Quick Actions */}
                <div className="animate-slide-up-delayed-7">
                  <div className="relative group h-full">
                    <div className="absolute -inset-1 bg-gradient-to-r from-blue-300/40 via-purple-300/30 to-pink-300/40 rounded-xl blur-md opacity-50 group-hover:opacity-70 transition-all duration-500" />
                    <div className="relative glass-sidebar-card rounded-xl p-3 h-full">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-6 h-6 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center text-white text-xs shadow-lg">⚡</div>
                        <h3 className="text-sm font-bold text-gray-900">Quick Actions</h3>
                      </div>
                      <div className="grid grid-cols-1 gap-2">
                        {[
                          { href: "/student/queries", text: "New Query", icon: "❓", color: "from-blue-500 to-blue-600" },
                          { href: "/student/appointments", text: "Book Meeting", icon: "📅", color: "from-purple-500 to-purple-600" },
                          { href: "/edubot", text: "Ask EduBot", icon: "🤖", color: "from-green-500 to-green-600" },
                          { href: "/messages/new", text: "Send Message", icon: "💬", color: "from-yellow-500 to-orange-500" }
                        ].map((action) => (
                          <Link key={action.text} href={action.href} className="block group">
                            <div className={`relative overflow-hidden rounded-lg transition-all duration-300 hover:scale-105 bg-gradient-to-r ${action.color} p-2 text-white text-xs font-semibold group-hover:shadow-lg`}>
                              <div className="flex items-center gap-2">
                                <span className="text-sm">{action.icon}</span>
                                <span>{action.text}</span>
                                <svg className="w-3 h-3 ml-auto group-hover:translate-x-0.5 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                              </div>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Navigation */}
                <div className="animate-slide-up-delayed-8">
                  <div className="glass-sidebar-card rounded-xl p-3 h-full">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-6 h-6 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-lg flex items-center justify-center text-white text-xs shadow-lg">🧭</div>
                      <h3 className="text-sm font-bold text-gray-900">Navigation</h3>
                    </div>
                    <div className="grid grid-cols-1 gap-2">
                      {[
                        { href: "/student/courses", icon: "📚", title: "My Courses", color: "blue" },
                        { href: "/student/lecturers", icon: "👩‍🏫", title: "Find Lecturers", color: "green" },
                        { href: "/courses", icon: "🔍", title: "Browse Courses", color: "purple" },
                        { href: "/messages/search", icon: "🔍", title: "Search Messages", color: "orange" }
                      ].map((nav) => (
                        <Link key={nav.title} href={nav.href} className="block group">
                          <div className={`p-2 bg-${nav.color}-50 rounded-lg hover:bg-${nav.color}-100 transition-all duration-300 group-hover:shadow-sm border border-${nav.color}-100`}>
                            <div className="flex items-center gap-2">
                              <div className={`w-5 h-5 bg-${nav.color}-200 rounded flex items-center justify-center text-xs`}>{nav.icon}</div>
                              <span className={`font-semibold text-xs text-${nav.color}-900`}>{nav.title}</span>
                              <svg className={`w-3 h-3 text-${nav.color}-400 ml-auto group-hover:translate-x-0.5 transition-transform duration-300`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Upcoming Appointments */}
                <div className="animate-slide-up-delayed-9">
                  <div className="glass-sidebar-card rounded-xl p-3 h-full">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center text-white text-xs shadow-lg">📅</div>
                        <h3 className="text-sm font-bold text-gray-900">Upcoming</h3>
                      </div>
                      <Link href="/student/appointments" className="text-xs text-blue-600 hover:text-blue-800 font-semibold">View All</Link>
                    </div>
                    {upcomingAppointments.length > 0 ? (
                      <div className="space-y-2">
                        {upcomingAppointments.map((appt) => (
                          <div key={appt.id} className="glass-activity-card p-3 rounded-lg hover:shadow-sm transition-all duration-300">
                            <div className="flex items-start gap-2">
                              <div className="w-6 h-6 bg-purple-100 rounded-lg flex items-center justify-center text-purple-600 text-xs font-semibold shadow-sm flex-shrink-0">📝</div>
                              <div className="flex-1 min-w-0">
                                <h4 className="font-semibold text-xs text-gray-900 mb-1 truncate">{appt.subject}</h4>
                                <p className="text-xs text-gray-600 mb-1 truncate">{appt.lecturer}</p>
                                <div className="space-y-0.5">
                                  <div className="flex items-center gap-1 text-xs text-gray-500">
                                    <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                                    <span>{appt.date} at {appt.time}</span>
                                  </div>
                                  <div className="flex items-center gap-1 text-xs text-gray-500">
                                    <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                                    <span className="truncate">{appt.location}</span>
                                  </div>
                                </div>
                                <div className="mt-2">
                                  <span className={`inline-flex items-center gap-1 px-2 py-0.5 text-xs rounded-full font-semibold ${appt.status === 'confirmed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                                    {appt.status === 'confirmed' ? '✅' : '⏳'} {appt.status}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-4">
                        <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-2"><span className="text-lg">📅</span></div>
                        <h4 className="text-xs font-semibold text-gray-900 mb-1">No Appointments</h4>
                        <Link href="/student/appointments" className="inline-flex items-center gap-1 px-2 py-1 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors duration-300 text-xs font-semibold">Book Now</Link>
                      </div>
                    )}
                  </div>
                </div>

                {/* My Courses */}
                <div className="animate-slide-up-delayed-8">
                  <div className="glass-sidebar-card rounded-xl p-3 h-full">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-6 h-6 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-lg flex items-center justify-center text-white text-xs shadow-lg">📚</div>
                      <h3 className="text-sm font-bold text-gray-900">My Courses</h3>
                    </div>
                    <div className="space-y-2">
                      {[
                        { href: "/courses/1", code: "CS101", name: "Intro Programming", color: "blue", progress: 85 },
                        { href: "/courses/3", code: "MATH202", name: "Calculus II", color: "green", progress: 60 },
                        { href: "/courses/4", code: "ENG110", name: "Academic Writing", color: "purple", progress: 92 }
                      ].map((course) => (
                        <Link key={course.code} href={course.href} className="block group">
                          <div className={`p-2 bg-${course.color}-50 rounded-lg hover:bg-${course.color}-100 transition-all duration-300 group-hover:shadow-sm border border-${course.color}-100`}>
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center gap-2">
                                <div className={`w-6 h-6 bg-${course.color}-200 rounded flex items-center justify-center font-bold text-${course.color}-800 text-xs`}>{course.code.slice(0, 2)}</div>
                                <div className="flex-1 min-w-0">
                                  <div className={`font-semibold text-xs text-${course.color}-900`}>{course.code}</div>
                                  <div className={`text-xs text-${course.color}-600 leading-tight truncate`}>{course.name}</div>
                                </div>
                              </div>
                              <svg className={`w-3 h-3 text-${course.color}-400 group-hover:translate-x-0.5 transition-transform duration-300`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                            </div>
                            <div className="space-y-1">
                              <div className="flex justify-between items-center">
                                <span className={`text-xs font-medium text-${course.color}-600`}>Progress</span>
                                <span className={`text-xs font-bold text-${course.color}-700`}>{course.progress}%</span>
                              </div>
                              <div className={`w-full bg-${course.color}-200 rounded-full h-1.5`}>
                                <div className={`bg-gradient-to-r from-${course.color}-500 to-${course.color}-600 h-1.5 rounded-full`} style={{ width: `${course.progress}%` }}></div>
                              </div>
                            </div>
                          </div>
                        </Link>
                      ))}
                      <div className="pt-2 border-t border-gray-200/50">
                        <Link href="/student/courses" className="flex items-center justify-center gap-1 w-full p-2 bg-gradient-to-r from-indigo-500 to-blue-600 text-white rounded-lg hover:from-indigo-600 hover:to-blue-700 transition-all duration-300 text-xs font-semibold group">
                          View All Courses
                          <svg className="w-3 h-3 group-hover:translate-x-0.5 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Help & Support */}
                <div className="animate-slide-up-delayed-9">
                  <div className="glass-sidebar-card rounded-xl p-3 h-full">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-6 h-6 bg-gradient-to-br from-emerald-500 to-green-600 rounded-lg flex items-center justify-center text-white text-xs shadow-lg">🆘</div>
                      <h3 className="text-sm font-bold text-gray-900">Need Help?</h3>
                    </div>
                    <div className="space-y-2">
                      {[
                        { href: "/edubot", icon: "🤖", title: "Ask EduBot", desc: "AI answers", color: "emerald" },
                        { href: "/student/queries", icon: "❓", title: "Submit Query", desc: "Lecturer help", color: "blue" },
                        { href: "/student/lecturers", icon: "👩‍🏫", title: "Contact Lecturer", desc: "Faculty directory", color: "purple" }
                      ].map((help) => (
                        <Link key={help.title} href={help.href} className="block group">
                          <div className="glass-activity-card p-2 rounded-lg hover:shadow-sm transition-all duration-300 group-hover:scale-105 border border-gray-100">
                            <div className="flex items-center gap-2">
                              <div className={`w-6 h-6 bg-${help.color}-100 rounded-lg flex items-center justify-center text-sm shadow-sm`}>{help.icon}</div>
                              <div className="flex-1 min-w-0">
                                <div className="font-semibold text-xs text-gray-900">{help.title}</div>
                                <div className="text-xs text-gray-600 truncate">{help.desc}</div>
                              </div>
                              <svg className="w-3 h-3 text-gray-400 group-hover:translate-x-0.5 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>

              </div>

              {/* Recent Activity Section (MOVED DOWN) */}
              <div className="animate-slide-up-delayed-7">
                <div className="relative group h-full">
                  <div className="absolute -inset-1 bg-gradient-to-r from-blue-200/30 via-purple-200/20 to-pink-200/30 rounded-2xl blur-lg opacity-50 group-hover:opacity-70 transition-all duration-500" />
                  <div className="relative glass-card rounded-2xl overflow-hidden h-full">
                    <div className="p-5">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white text-xl shadow-lg">📊</div>
                          <div>
                            <h2 className="text-lg font-bold text-gray-900">Recent Activity</h2>
                            <p className="text-xs text-gray-500">Latest updates</p>
                          </div>
                        </div>
                        <Link href="/student/queries" className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-300 text-sm font-semibold shadow-md">
                          View All
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                        </Link>
                      </div>
                      <div className="space-y-3">
                        {recentActivity.map((activity) => (
                          <div key={activity.id} className="relative group">
                            <div className={`glass-activity-card rounded-lg border-l-4 ${getActivityColor(activity.type, activity.priority)} p-3 group-hover:shadow-md group-hover:scale-[1.01] transition-all duration-300`}>
                              <div className="flex items-start gap-3">
                                <div className="w-8 h-8 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center text-lg shadow-sm flex-shrink-0">{getActivityIcon(activity.type)}</div>
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center justify-between gap-2 mb-1">
                                    <h3 className={`font-semibold text-sm ${!activity.read ? 'text-gray-800' : 'text-gray-700'} truncate`}>{activity.title}</h3>
                                    <div className="flex items-center gap-2 flex-shrink-0">
                                      {!activity.read && (<span className="text-xs bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded-full font-semibold animate-pulse">NEW</span>)}
                                      {activity.priority === 'high' && (<span className="px-2 py-0.5 text-xs bg-red-100 text-red-700 rounded-full font-bold border border-red-200">🔥 HIGH</span>)}
                                    </div>
                                  </div>
                                  <p className="text-xs text-gray-600 mb-1 leading-relaxed">{activity.description}</p>
                                  <div className="flex items-center gap-1 text-xs text-gray-500">
                                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                    <span className="font-medium">{activity.timestamp}</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
            {/* --- END: RE-ORDERED LAYOUT SECTION --- */}

          </div>
        </div>
        {/* --- END: Main Dashboard Content --- */}
      </div>
    </>
  )
}
