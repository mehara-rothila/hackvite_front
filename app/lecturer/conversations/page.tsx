// app/lecturer/conversations/page.tsx - ENHANCED WITH GLASSMORPHISM & VECTOR ICONS
'use client'

import { useState } from 'react'
import Link from 'next/link'

// --- Interfaces (Unchanged) ---
interface Conversation {
  id: string
  student: string
  studentEmail: string
  studentAvatar: string // Kept for potential future use, but will be replaced by SVG
  subject: string
  lastMessage: string
  lastMessageTime: string
  unreadCount: number
  isRead: boolean
  course: string
  messageType: 'academic' | 'administrative' | 'general'
  priority: 'low' | 'medium' | 'high'
  status: 'active' | 'resolved' | 'archived'
  totalMessages: number
}

// --- Mock Data (Unchanged) ---
const mockConversations: Conversation[] = [
  { id: '1', student: 'Alice Johnson', studentEmail: 'alice.johnson@university.edu', studentAvatar: '👩‍🎓', subject: 'Assignment 3 Implementation Help', lastMessage: 'Thank you for the detailed explanation! I think I understand the algorithm now.', lastMessageTime: '2025-07-26 16:30', unreadCount: 1, isRead: false, course: 'CS101', messageType: 'academic', priority: 'medium', status: 'active', totalMessages: 8 },
  { id: '2', student: 'Bob Smith', studentEmail: 'bob.smith@university.edu', studentAvatar: '👨‍🎓', subject: 'Final Project Proposal Discussion', lastMessage: 'I\'ve updated my proposal based on your feedback. Could you review it again?', lastMessageTime: '2025-07-26 14:45', unreadCount: 2, isRead: false, course: 'CS101', messageType: 'academic', priority: 'high', status: 'active', totalMessages: 12 },
  { id: '3', student: 'Carol Davis', studentEmail: 'carol.davis@university.edu', studentAvatar: '👩‍🎓', subject: 'Lab Equipment Issue', lastMessage: 'Perfect! The new equipment is working fine now. Thank you!', lastMessageTime: '2025-07-26 11:20', unreadCount: 0, isRead: true, course: 'CS101', messageType: 'administrative', priority: 'low', status: 'resolved', totalMessages: 5 },
  { id: '4', student: 'David Wilson', studentEmail: 'david.wilson@university.edu', studentAvatar: '👨‍🎓', subject: 'Midterm Preparation Questions', lastMessage: 'These practice problems are exactly what I needed. Much appreciated!', lastMessageTime: '2025-07-25 18:30', unreadCount: 0, isRead: true, course: 'CS101', messageType: 'academic', priority: 'medium', status: 'resolved', totalMessages: 15 },
  { id: '5', student: 'Emma Brown', studentEmail: 'emma.brown@university.edu', studentAvatar: '👩‍🎓', subject: 'Research Opportunities', lastMessage: 'I\'m very interested in the machine learning research project. When can we discuss details?', lastMessageTime: '2025-07-25 15:10', unreadCount: 1, isRead: false, course: 'CS201', messageType: 'academic', priority: 'high', status: 'active', totalMessages: 6 },
  { id: '6', student: 'Frank Lee', studentEmail: 'frank.lee@university.edu', studentAvatar: '👨‍🎓', subject: 'Grade Inquiry', lastMessage: 'Thank you for explaining the grading criteria. I understand now.', lastMessageTime: '2025-07-24 10:15', unreadCount: 0, isRead: true, course: 'CS101', messageType: 'administrative', priority: 'low', status: 'resolved', totalMessages: 4 }
]

// --- Constants (Unchanged) ---
const courses = ['All', 'CS101', 'CS201', 'MATH202']
// const messageTypes = ['All', 'Academic', 'Administrative', 'General']
const priorities = ['All', 'High', 'Medium', 'Low']
const statusFilters = ['All', 'Active', 'Resolved', 'Archived']

export default function LecturerConversationsPage() {
  const [conversations, setConversations] = useState<Conversation[]>(mockConversations)
  const [searchTerm, setSearchTerm] = useState('')
  const [courseFilter, setCourseFilter] = useState('All')
  const [typeFilter] = useState('All')
  const [priorityFilter, setPriorityFilter] = useState('All')
  const [statusFilter, setStatusFilter] = useState('All')
  const [showOnlyUnread, setShowOnlyUnread] = useState(false)

  // --- Event Handlers (Functionality Unchanged) ---
  // const handleStatusChange = (conversationId: string, newStatus: Conversation['status']) => { setConversations(conversations.map(conv => conv.id === conversationId ? { ...conv, status: newStatus } : conv)) }
  // const handlePriorityChange = (conversationId: string, newPriority: Conversation['priority']) => { setConversations(conversations.map(conv => conv.id === conversationId ? { ...conv, priority: newPriority } : conv)) }
  const handleMarkAsRead = (conversationId: string) => { setConversations(conversations.map(conv => conv.id === conversationId ? { ...conv, isRead: true, unreadCount: 0 } : conv)) }
  const handleMarkAllAsRead = () => { setConversations(conversations.map(conv => ({ ...conv, isRead: true, unreadCount: 0 }))) }
  const handleArchiveConversation = (conversationId: string) => { if (confirm('Archive this conversation?')) { setConversations(conversations.map(conv => conv.id === conversationId ? { ...conv, status: 'archived' as const } : conv)) } }

  // --- Filtering & Sorting Logic (Unchanged) ---
  const filteredConversations = conversations.filter(conversation => {
    const matchesSearch = conversation.student.toLowerCase().includes(searchTerm.toLowerCase()) || conversation.subject.toLowerCase().includes(searchTerm.toLowerCase()) || conversation.lastMessage.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCourse = courseFilter === 'All' || conversation.course === courseFilter
    const matchesType = typeFilter === 'All' || conversation.messageType === typeFilter.toLowerCase()
    const matchesPriority = priorityFilter === 'All' || conversation.priority === priorityFilter.toLowerCase()
    const matchesStatus = statusFilter === 'All' || conversation.status === statusFilter.toLowerCase()
    const matchesRead = !showOnlyUnread || !conversation.isRead
    return matchesSearch && matchesCourse && matchesType && matchesPriority && matchesStatus && matchesRead
  })

  const sortedConversations = filteredConversations.sort((a, b) => {
    if (!a.isRead && b.isRead) return -1
    if (a.isRead && !b.isRead) return 1
    const priorityOrder = { high: 3, medium: 2, low: 1 }
    if (priorityOrder[a.priority] !== priorityOrder[b.priority]) { return priorityOrder[b.priority] - priorityOrder[a.priority] }
    return new Date(b.lastMessageTime).getTime() - new Date(a.lastMessageTime).getTime()
  })

  // --- Derived State (Unchanged) ---
  const unreadCount = conversations.filter(c => !c.isRead).length
  const activeCount = conversations.filter(c => c.status === 'active').length
  const highPriorityCount = conversations.filter(c => c.priority === 'high').length
  const totalStudents = new Set(conversations.map(c => c.student)).size

  // --- Helper Functions for Styling ---
  const getTagColor = (type: 'type' | 'priority' | 'status', value: string) => {
    const colors = {
      type: { academic: 'bg-blue-500/20 text-blue-700', administrative: 'bg-purple-500/20 text-purple-700', general: 'bg-green-500/20 text-green-700', default: 'bg-gray-500/20 text-gray-700' },
      priority: { high: 'bg-red-500/20 text-red-700', medium: 'bg-orange-500/20 text-orange-700', low: 'bg-green-500/20 text-green-700', default: 'bg-gray-500/20 text-gray-700' },
      status: { active: 'bg-blue-500/20 text-blue-700', resolved: 'bg-green-500/20 text-green-700', archived: 'bg-gray-500/20 text-gray-700', default: 'bg-gray-500/20 text-gray-700' }
    }
    return colors[type][value] || colors[type].default
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
                      <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 9h12v2H6V9zm8 5H6v-2h8v2zm4-6H6V6h12v2z"/></svg>
                    </div>
                    <div>
                      <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent text-clean-shadow">
                        Conversations
                      </h1>
                      <p className="text-gray-600 text-sm font-medium">Manage ongoing conversations with your students</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
              {[
                { value: conversations.length, label: "Total", icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z"/></svg>, color: "blue", bgColor: "from-blue-500 to-blue-600", delay: "animate-slide-up-delayed" },
                { value: unreadCount, label: "Unread", icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>, color: "red", bgColor: "from-red-500 to-orange-500", delay: "animate-slide-up-delayed-2" },
                { value: activeCount, label: "Active", icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>, color: "orange", bgColor: "from-orange-500 to-yellow-500", delay: "animate-slide-up-delayed-3" },
                { value: highPriorityCount, label: "High Priority", icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>, color: "purple", bgColor: "from-purple-500 to-purple-600", delay: "animate-slide-up-delayed-4" },
                { value: totalStudents, label: "Students", icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/></svg>, color: "green", bgColor: "from-green-500 to-green-600", delay: "animate-slide-up-delayed-5" }
              ].map((stat) => (
                <div key={stat.label} className={`group ${stat.delay}`}>
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

            {/* Filters & Actions */}
            <div className="glass-sidebar-card rounded-2xl p-4 mb-6 animate-slide-up-delayed-6">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div className="flex flex-wrap gap-2">
                  <input type="text" placeholder="Search..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="glass-activity-card px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 border-none font-semibold text-gray-700 placeholder-gray-500 flex-grow" />
                  <select value={courseFilter} onChange={(e) => setCourseFilter(e.target.value)} className="glass-activity-card px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 border-none font-semibold text-gray-700">{courses.map(c => <option key={c} value={c}>{c}</option>)}</select>
                  <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="glass-activity-card px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 border-none font-semibold text-gray-700">{statusFilters.map(s => <option key={s} value={s}>{s}</option>)}</select>
                  <select value={priorityFilter} onChange={(e) => setPriorityFilter(e.target.value)} className="glass-activity-card px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 border-none font-semibold text-gray-700">{priorities.map(p => <option key={p} value={p}>{p}</option>)}</select>
                  <label className="flex items-center gap-2 px-4 py-2 glass-activity-card rounded-lg cursor-pointer"><input type="checkbox" checked={showOnlyUnread} onChange={(e) => setShowOnlyUnread(e.target.checked)} className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded bg-transparent" /><span className="text-sm font-semibold text-gray-700">Unread only</span></label>
                </div>
                {unreadCount > 0 && <button onClick={handleMarkAllAsRead} className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-300 font-semibold shadow-md"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>Mark All Read</button>}
              </div>
            </div>

            {/* Conversations List */}
            <div className="space-y-4 animate-slide-up-delayed-7">
              {sortedConversations.length === 0 ? (
                <div className="glass-card rounded-2xl p-8 text-center"><h3 className="text-xl font-bold text-gray-700 mb-2">No Conversations Found</h3><p className="text-gray-500">Try adjusting your filters or wait for students to start conversations.</p></div>
              ) : (
                sortedConversations.map((conv) => (
                  <div key={conv.id} className={`relative group transition-all duration-300 ${!conv.isRead ? 'scale-[1.02]' : ''}`}>
                    {!conv.isRead && <div className="absolute -inset-2 bg-gradient-to-r from-blue-300/20 via-purple-300/30 to-pink-300/20 rounded-2xl blur-xl opacity-60 group-hover:opacity-80 transition-all duration-1000 animate-aurora-glow" />}
                    <div className={`${!conv.isRead ? 'glass-premium-card' : 'glass-card'} rounded-2xl p-5 transition-all duration-300 group-hover:shadow-2xl`}>
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white shadow-lg flex-shrink-0"><svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg></div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-2 mb-1">
                            <Link href={`/lecturer/conversations/${conv.id}`} onClick={() => handleMarkAsRead(conv.id)} className={`font-bold text-lg truncate hover:text-blue-600 ${!conv.isRead ? 'text-blue-800' : 'text-gray-900'}`}>{conv.subject}</Link>
                            {conv.unreadCount > 0 && <span className="bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded-full animate-pulse">{conv.unreadCount} new</span>}
                          </div>
                          <div className="text-sm font-medium text-gray-700 mb-2">{conv.student} • {conv.course} • {conv.totalMessages} messages</div>
                          <p className="text-sm text-gray-600 mb-3 line-clamp-1">{conv.lastMessage}</p>
                          <div className="flex flex-wrap items-center gap-2">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTagColor('status', conv.status)}`}>{conv.status}</span>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTagColor('priority', conv.priority)}`}>{conv.priority}</span>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTagColor('type', conv.messageType)}`}>{conv.messageType}</span>
                          </div>
                        </div>
                        <div className="flex flex-col sm:flex-row lg:flex-col gap-2 flex-shrink-0">
                          <Link href={`/lecturer/conversations/${conv.id}`} onClick={() => handleMarkAsRead(conv.id)} className="flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors duration-300 bg-blue-500/20 hover:bg-blue-500/40 text-blue-800">View</Link>
                          <button onClick={() => handleArchiveConversation(conv.id)} className="flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors duration-300 bg-gray-500/20 hover:bg-gray-500/40 text-gray-800">Archive</button>
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
