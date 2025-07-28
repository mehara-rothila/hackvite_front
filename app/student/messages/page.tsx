// app/student/messages/page.tsx - ENHANCED WITH DASHBOARD STYLES
'use client'

import { useState } from 'react'
import Link from 'next/link'

interface Message {
  id: string
  lecturer: string
  lecturerAvatar: string
  subject: string
  lastMessage: string
  lastMessageTime: string
  unreadCount: number
  isRead: boolean
  course: string
  messageType: 'academic' | 'administrative' | 'general'
  priority: 'low' | 'medium' | 'high'
}

interface MessageThread {
  id: string
  messages: {
    id: string
    sender: 'student' | 'lecturer'
    senderName: string
    content: string
    timestamp: string
    attachments?: {
      name: string
      url: string
      type: string
    }[]
  }[]
}

const mockMessages: Message[] = [
  {
    id: '1',
    lecturer: 'Dr. Sarah Johnson',
    lecturerAvatar: '👩‍🏫',
    subject: 'Assignment 3 Feedback',
    lastMessage: 'Great work on the algorithm implementation! Just a few minor suggestions...',
    lastMessageTime: '2025-07-26 14:30',
    unreadCount: 2,
    isRead: false,
    course: 'CS101',
    messageType: 'academic',
    priority: 'medium'
  },
  {
    id: '2',
    lecturer: 'Prof. Michael Chen',
    lecturerAvatar: '👨‍🏫',
    subject: 'Office Hours Reschedule',
    lastMessage: 'I need to reschedule our Thursday meeting to Friday at 2 PM. Does that work for you?',
    lastMessageTime: '2025-07-26 11:15',
    unreadCount: 1,
    isRead: false,
    course: 'MATH202',
    messageType: 'administrative',
    priority: 'high'
  },
  {
    id: '3',
    lecturer: 'Dr. Sarah Johnson',
    lecturerAvatar: '👩‍🏫',
    subject: 'Lab Materials Available',
    lastMessage: 'The lab materials for Week 5 are now available in the resource section.',
    lastMessageTime: '2025-07-25 16:45',
    unreadCount: 0,
    isRead: true,
    course: 'CS101',
    messageType: 'general',
    priority: 'low'
  },
  {
    id: '4',
    lecturer: 'Dr. Emily Roberts',
    lecturerAvatar: '👩‍💼',
    subject: 'Essay Draft Review',
    lastMessage: 'I\'ve reviewed your essay draft. Overall structure is good, but...',
    lastMessageTime: '2025-07-25 09:20',
    unreadCount: 0,
    isRead: true,
    course: 'ENG110',
    messageType: 'academic',
    priority: 'medium'
  },
  {
    id: '5',
    lecturer: 'Prof. Michael Chen',
    lecturerAvatar: '👨‍🏫',
    subject: 'Midterm Exam Information',
    lastMessage: 'The midterm exam will cover chapters 1-6. Make sure to review the practice problems.',
    lastMessageTime: '2025-07-24 13:10',
    unreadCount: 0,
    isRead: true,
    course: 'MATH202',
    messageType: 'academic',
    priority: 'high'
  }
]

const mockThreads: Record<string, MessageThread> = {
  '1': {
    id: '1',
    messages: [
      {
        id: '1',
        sender: 'student',
        senderName: 'You',
        content: 'Hi Dr. Johnson, I submitted Assignment 3 yesterday. Could you let me know when you\'ll have feedback available?',
        timestamp: '2025-07-25 10:30',
      },
      {
        id: '2',
        sender: 'lecturer',
        senderName: 'Dr. Sarah Johnson',
        content: 'Hi! I\'ve reviewed your assignment and overall it\'s excellent work. Your algorithm implementation is very clean and efficient.',
        timestamp: '2025-07-26 09:15',
      },
      {
        id: '3',
        sender: 'lecturer',
        senderName: 'Dr. Sarah Johnson',
        content: 'Great work on the algorithm implementation! Just a few minor suggestions: consider adding more comments and maybe optimize the sorting function a bit more.',
        timestamp: '2025-07-26 14:30',
        attachments: [
          { name: 'assignment3_feedback.pdf', url: '#', type: 'pdf' }
        ]
      }
    ]
  }
}

const lecturers = ['All', 'Dr. Sarah Johnson', 'Prof. Michael Chen', 'Dr. Emily Roberts']
const messageTypes = ['All', 'Academic', 'Administrative', 'General']
const priorities = ['All', 'High', 'Medium', 'Low']

export default function StudentMessagesPage() {
  const [messages, setMessages] = useState<Message[]>(mockMessages)
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null)
  const [selectedThread, setSelectedThread] = useState<MessageThread | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [lecturerFilter, setLecturerFilter] = useState('All')
  const [typeFilter, setTypeFilter] = useState('All')
  const [priorityFilter, setPriorityFilter] = useState('All')
  const [showOnlyUnread, setShowOnlyUnread] = useState(false)
  const [replyText, setReplyText] = useState('')

  const handleViewMessage = (message: Message) => {
    setSelectedMessage(message)
    setSelectedThread(mockThreads[message.id] || null)
    if (!message.isRead) {
      setMessages(messages.map(m => m.id === message.id ? { ...m, isRead: true, unreadCount: 0 } : m))
    }
  }

  const handleSendReply = (e: React.FormEvent) => {
    e.preventDefault()
    if (!replyText.trim() || !selectedThread) return
    const newMessage = {
      id: Date.now().toString(),
      sender: 'student' as const,
      senderName: 'You',
      content: replyText,
      timestamp: new Date().toLocaleString()
    }
    setSelectedThread({ ...selectedThread, messages: [...selectedThread.messages, newMessage] })
    setReplyText('')
  }

  const handleMarkAllAsRead = () => {
    setMessages(messages.map(m => ({ ...m, isRead: true, unreadCount: 0 })))
  }

  const filteredMessages = messages.filter(message => {
    const matchesSearch = message.subject.toLowerCase().includes(searchTerm.toLowerCase()) || message.lecturer.toLowerCase().includes(searchTerm.toLowerCase()) || message.lastMessage.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesLecturer = lecturerFilter === 'All' || message.lecturer === lecturerFilter
    const matchesType = typeFilter === 'All' || message.messageType === typeFilter.toLowerCase()
    const matchesPriority = priorityFilter === 'All' || message.priority === priorityFilter.toLowerCase()
    const matchesRead = !showOnlyUnread || !message.isRead
    return matchesSearch && matchesLecturer && matchesType && matchesPriority && matchesRead
  })

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'academic': return 'bg-blue-100 text-blue-800'
      case 'administrative': return 'bg-purple-100 text-purple-800'
      case 'general': return 'bg-green-100 text-green-800'
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

  const unreadCount = messages.filter(m => !m.isRead).length
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
                    <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center text-white text-2xl font-bold shadow-lg">💬</div>
                    <div>
                      <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent text-clean-shadow mb-1">Messages</h1>
                      <p className="text-gray-600">Communicate with your lecturers and stay updated</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <div className="glass-stat-card p-4 rounded-xl animate-slide-up-delayed"><div className="text-3xl font-bold text-blue-600">{messages.length}</div><div className="text-sm text-blue-800 font-semibold">Total Messages</div></div>
              <div className="glass-stat-card p-4 rounded-xl animate-slide-up-delayed-2"><div className="text-3xl font-bold text-red-600">{unreadCount}</div><div className="text-sm text-red-800 font-semibold">Unread</div></div>
              <div className="glass-stat-card p-4 rounded-xl animate-slide-up-delayed-3"><div className="text-3xl font-bold text-green-600">{new Set(messages.map(m => m.lecturer)).size}</div><div className="text-sm text-green-800 font-semibold">Lecturers</div></div>
              <div className="glass-stat-card p-4 rounded-xl animate-slide-up-delayed-4"><div className="text-3xl font-bold text-purple-600">{messages.filter(m => m.priority === 'high').length}</div><div className="text-sm text-purple-800 font-semibold">High Priority</div></div>
            </div>

            {/* Navigation Links */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              {[
                { href: "/messages/new", icon: "✉️", title: "Compose Message", desc: "Start new conversation" },
                { href: "/messages/search", icon: "🔍", title: "Search Messages", desc: "Find conversations" },
                { href: "/student/lecturers", icon: "👩‍🏫", title: "Find Lecturers", desc: "Browse faculty directory" },
                { href: "/messages/drafts", icon: "📄", title: "Draft Messages", desc: "Continue writing" }
              ].map((item, index) => (
                <Link key={item.title} href={item.href} className={`glass-activity-card p-4 rounded-xl hover:shadow-xl hover:scale-[1.02] transition-all duration-300 group animate-slide-up-delayed-${index + 1}`}>
                  <div className="text-center">
                    <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">{item.icon}</div>
                    <div className="font-semibold text-gray-900">{item.title}</div>
                    <div className="text-sm text-gray-600">{item.desc}</div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Main Content */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Messages List */}
              <div className="lg:col-span-2">
                <div className="glass-card rounded-2xl p-6 mb-6">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                    <div className="flex flex-col sm:flex-row gap-4 flex-1">
                      <input type="text" placeholder="Search messages..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className={glassInputStyles} />
                      <select value={lecturerFilter} onChange={(e) => setLecturerFilter(e.target.value)} className={glassInputStyles}>{lecturers.map(lecturer => (<option key={lecturer} value={lecturer}>{lecturer}</option>))}</select>
                      <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)} className={glassInputStyles}>{messageTypes.map(type => (<option key={type} value={type}>{type}</option>))}</select>
                      <label className="flex items-center gap-2 px-4 py-2 glass-activity-card rounded-lg cursor-pointer"><input type="checkbox" checked={showOnlyUnread} onChange={(e) => setShowOnlyUnread(e.target.checked)} className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" /><span className="text-sm text-gray-700 font-medium">Unread only</span></label>
                    </div>
                    <div className="flex gap-2">
                      <Link href="/messages/new" className="px-4 py-2 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg">✉️ Compose</Link>
                      {unreadCount > 0 && (<button onClick={handleMarkAllAsRead} className="px-4 py-2 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 glass-activity-card text-gray-700 hover:shadow-md">Mark All Read</button>)}
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  {filteredMessages.length === 0 ? (
                    <div className="glass-card rounded-2xl p-12 text-center"><div className="text-6xl mb-4">📪</div><h3 className="text-xl font-semibold text-gray-900 mb-2">No Messages Found</h3><p className="text-gray-600 mb-6">Try adjusting your filters or send a new message.</p><Link href="/messages/new" className="bg-blue-500 text-white px-5 py-2.5 rounded-lg font-semibold hover:bg-blue-600 transition-colors shadow-md">Send Your First Message</Link></div>
                  ) : (
                    filteredMessages.map((message) => (
                      <div key={message.id} onClick={() => handleViewMessage(message)} className={`glass-activity-card rounded-lg p-4 hover:shadow-xl hover:scale-[1.01] transition-all duration-300 cursor-pointer border-l-4 ${!message.isRead ? 'border-blue-500' : 'border-transparent'}`}>
                        <div className="flex items-start gap-4">
                          <span className="text-3xl mt-1">{message.lecturerAvatar}</span>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1 flex-wrap">
                              {!message.isRead && <span className="w-2.5 h-2.5 bg-blue-500 rounded-full animate-pulse"></span>}
                              <h3 className={`font-semibold ${!message.isRead ? 'text-gray-900' : 'text-gray-800'}`}>{message.subject}</h3>
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(message.messageType)}`}>{message.messageType.charAt(0).toUpperCase() + message.messageType.slice(1)}</span>
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(message.priority)}`}>{message.priority.charAt(0).toUpperCase() + message.priority.slice(1)}</span>
                            </div>
                            <div className="text-sm font-medium text-gray-700 mb-1">{message.lecturer} • {message.course}</div>
                            <p className="text-sm text-gray-600 mb-2 line-clamp-2">{message.lastMessage}</p>
                            <div className="flex items-center justify-between text-xs text-gray-500">
                              <span>{message.lastMessageTime}</span>
                              {message.unreadCount > 0 && (<span className="bg-blue-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">{message.unreadCount} new</span>)}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Message Thread Viewer */}
              <div className="glass-card rounded-2xl overflow-hidden">
                {selectedMessage && selectedThread ? (
                  <div className="h-[700px] flex flex-col">
                    <div className="p-4 border-b border-white/30"><div className="flex items-center gap-3 mb-2"><span className="text-2xl">{selectedMessage.lecturerAvatar}</span><div><h3 className="font-semibold text-gray-900">{selectedMessage.subject}</h3><p className="text-sm text-gray-600">{selectedMessage.lecturer} • {selectedMessage.course}</p></div></div></div>
                    <div className="flex-1 overflow-y-auto p-4 space-y-4">
                      {selectedThread.messages.map((msg) => (
                        <div key={msg.id} className={`flex items-end gap-2 ${msg.sender === 'student' ? 'justify-end' : 'justify-start'}`}>
                          <div className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl ${msg.sender === 'student' ? 'bg-gradient-to-br from-blue-500 to-purple-600 text-white rounded-br-none' : 'glass-activity-card text-gray-800 rounded-bl-none'}`}>
                            <p className="text-sm">{msg.content}</p>
                            {msg.attachments && msg.attachments.length > 0 && (<div className="mt-2 space-y-1 border-t border-black/10 pt-2">{msg.attachments.map((attachment, idx) => (<div key={idx} className="text-xs opacity-90 flex items-center gap-1">📎 {attachment.name}</div>))}</div>)}
                            <div className="text-xs opacity-75 mt-2 text-right">{msg.timestamp}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="p-4 border-t border-white/30">
                      <form onSubmit={handleSendReply} className="space-y-3">
                        <textarea value={replyText} onChange={(e) => setReplyText(e.target.value)} rows={3} className={`${glassInputStyles} focus:bg-white`} placeholder="Type your reply..." />
                        <div className="flex justify-between items-center">
                          <button type="button" className="text-sm text-gray-600 hover:text-blue-600 font-semibold">📎 Attach File</button>
                          <button type="submit" disabled={!replyText.trim()} className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105 font-semibold disabled:opacity-50 disabled:cursor-not-allowed">Send Reply</button>
                        </div>
                      </form>
                    </div>
                  </div>
                ) : (
                  <div className="p-8 text-center text-gray-500 flex flex-col items-center justify-center h-full">
                    <div className="text-6xl mb-4">💬</div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Select a message</h3>
                    <p className="text-gray-600 mb-6">Choose a conversation from the list to view it here.</p>
                    <Link href="/messages/new" className="bg-blue-500 text-white px-5 py-2.5 rounded-lg font-semibold hover:bg-blue-600 transition-colors shadow-md">✉️ Compose New Message</Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}