
// app/lecturer/queries/page.tsx - ENHANCED WITH GLASSMORPHISM & VECTOR ICONS
'use client'

import { useState } from 'react'
import Link from 'next/link'

interface Query {
  id: string
  student: string
  studentEmail: string
  title: string
  description: string
  category: 'Academic' | 'Technical' | 'Administrative' | 'Appointment' | 'Course-related'
  priority: 'low' | 'medium' | 'high'
  status: 'pending' | 'in-progress' | 'resolved'
  course: string
  submittedAt: string
  lastUpdated: string
  responseCount: number
  readByLecturer: boolean
}

const mockQueries: Query[] = [
  {
    id: '1',
    student: 'Alice Johnson',
    studentEmail: 'alice.johnson@university.edu',
    title: 'Question about Assignment 3 requirements',
    description: 'I\'m having trouble understanding the requirements for Assignment 3, specifically the part about implementing the sorting algorithm. Could you clarify what approach you\'d like us to take?',
    category: 'Academic',
    priority: 'high',
    status: 'pending',
    course: 'CS101',
    submittedAt: '2025-07-26 09:30',
    lastUpdated: '2025-07-26 09:30',
    responseCount: 0,
    readByLecturer: false
  },
  {
    id: '2',
    student: 'Bob Smith',
    studentEmail: 'bob.smith@university.edu',
    title: 'Cannot access lab materials',
    description: 'The link to the lab materials in the course portal seems to be broken. I\'ve tried multiple browsers but still can\'t access the files for Lab 4.',
    category: 'Technical',
    priority: 'medium',
    status: 'in-progress',
    course: 'CS101',
    submittedAt: '2025-07-26 11:15',
    lastUpdated: '2025-07-26 14:20',
    responseCount: 2,
    readByLecturer: true
  },
  {
    id: '3',
    student: 'Carol Davis',
    studentEmail: 'carol.davis@university.edu',
    title: 'Office hours availability next week',
    description: 'Will you be available for office hours during exam week? I wanted to schedule some time to discuss the final project requirements.',
    category: 'Administrative',
    priority: 'low',
    status: 'resolved',
    course: 'CS101',
    submittedAt: '2025-07-25 14:20',
    lastUpdated: '2025-07-26 08:15',
    responseCount: 3,
    readByLecturer: true
  },
  {
    id: '4',
    student: 'David Wilson',
    studentEmail: 'david.wilson@university.edu',
    title: 'Clarification on midterm topics',
    description: 'Could you please clarify which chapters will be covered in the midterm exam? The syllabus mentions chapters 1-5, but I wanted to confirm if chapter 6 is included.',
    category: 'Academic',
    priority: 'high',
    status: 'pending',
    course: 'CS101',
    submittedAt: '2025-07-26 16:45',
    lastUpdated: '2025-07-26 16:45',
    responseCount: 0,
    readByLecturer: false
  },
  {
    id: '5',
    student: 'Emma Brown',
    studentEmail: 'emma.brown@university.edu',
    title: 'Request for assignment extension',
    description: 'Due to a family emergency, I won\'t be able to submit Assignment 2 by the deadline. Would it be possible to get a 2-day extension?',
    category: 'Administrative',
    priority: 'medium',
    status: 'in-progress',
    course: 'CS101',
    submittedAt: '2025-07-25 19:30',
    lastUpdated: '2025-07-26 10:15',
    responseCount: 1,
    readByLecturer: true
  }
]

const categories = ['All', 'Academic', 'Technical', 'Administrative', 'Appointment', 'Course-related']
const priorities = ['All', 'High', 'Medium', 'Low']
const statuses = ['All', 'In Progress', 'Pending', 'Resolved']
const courses = ['All', 'CS101', 'CS201', 'MATH202']

export default function LecturerQueriesPage() {
  const [queries, setQueries] = useState<Query[]>(mockQueries)
  const [searchTerm, setSearchTerm] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('All')
  const [priorityFilter, setPriorityFilter] = useState('All')
  const [statusFilter, setStatusFilter] = useState('All')
  const [courseFilter, setCourseFilter] = useState('All')
  const [showOnlyUnread, setShowOnlyUnread] = useState(false)

  const handleStatusChange = (queryId: string, newStatus: Query['status']) => {
    setQueries(queries.map(query => 
      query.id === queryId 
        ? { ...query, status: newStatus, lastUpdated: new Date().toLocaleString() }
        : query
    ))
  }

  const handleMarkAsRead = (queryId: string) => {
    setQueries(queries.map(query => 
      query.id === queryId 
        ? { ...query, readByLecturer: true }
        : query
    ))
  }

  const handleMarkAllAsRead = () => {
    setQueries(queries.map(query => ({ ...query, readByLecturer: true })))
  }

  const handleDeleteQuery = (queryId: string) => {
    if (confirm('Are you sure you want to delete this query?')) {
      setQueries(queries.filter(query => query.id !== queryId))
    }
  }

  // Filter queries
  const filteredQueries = queries.filter(query => {
    const matchesSearch = query.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         query.student.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         query.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = categoryFilter === 'All' || query.category === categoryFilter
    const matchesPriority = priorityFilter === 'All' || query.priority === priorityFilter.toLowerCase()
    const matchesStatus = statusFilter === 'All' || query.status === statusFilter.toLowerCase().replace(' ', '-')
    const matchesCourse = courseFilter === 'All' || query.course === courseFilter
    const matchesRead = !showOnlyUnread || !query.readByLecturer
    
    return matchesSearch && matchesCategory && matchesPriority && matchesStatus && matchesCourse && matchesRead
  })

  // Sort queries by priority and date
  const sortedQueries = filteredQueries.sort((a, b) => {
    if (!a.readByLecturer && b.readByLecturer) return -1
    if (a.readByLecturer && !b.readByLecturer) return 1
    const priorityOrder = { high: 3, medium: 2, low: 1 }
    if (priorityOrder[a.priority] !== priorityOrder[b.priority]) {
      return priorityOrder[b.priority] - priorityOrder[a.priority]
    }
    return new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime()
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-red-100 text-red-800 border-red-200'
      case 'in-progress': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'resolved': return 'bg-green-100 text-green-800 border-green-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200'
      case 'medium': return 'bg-orange-100 text-orange-800 border-orange-200'
      case 'low': return 'bg-green-100 text-green-800 border-green-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Academic': return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'Technical': return 'bg-purple-100 text-purple-800 border-purple-200'
      case 'Administrative': return 'bg-gray-100 text-gray-800 border-gray-200'
      case 'Appointment': return 'bg-indigo-100 text-indigo-800 border-indigo-200'
      case 'Course-related': return 'bg-green-100 text-green-800 border-green-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const unreadCount = queries.filter(q => !q.readByLecturer).length
  const pendingCount = queries.filter(q => q.status === 'pending').length
  const highPriorityCount = queries.filter(q => q.priority === 'high').length

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
        .glass-input {
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 0.2));
          backdrop-filter: blur(10px) saturate(100%);
          border: 1px solid rgba(255, 255, 255, 0.5);
          box-shadow: 0 2px 8px rgba(31, 38, 135, 0.05), 0 0 0 1px rgba(255, 255, 255, 0.3) inset;
          color: #374151; /* text-gray-700 */
        }
        .glass-input::placeholder {
          color: #6b7280; /* text-gray-500 */
        }
        .glass-input:focus {
          outline: none;
          box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.5), 0 2px 8px rgba(31, 38, 135, 0.1);
        }
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
            <div className="mb-8 animate-glass-fade-in">
              <div className="relative group">
                <div className="absolute -inset-2 bg-gradient-to-r from-blue-300/20 via-purple-300/30 to-pink-300/20 rounded-2xl blur-xl opacity-60 group-hover:opacity-80 transition-all duration-1000 animate-aurora-glow" />
                <div className="relative glass-premium-card rounded-2xl p-5">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white shadow-lg">
                      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.79 4 4s-1.79 4-4 4-4-1.79-4-4c0-1.193.5-2.278 1.285-3.071L7 10m0 0l-5 5m5-5l5-5m-5 5v6m-5-4h10" /></svg>
                    </div>
                    <div>
                      <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent text-clean-shadow">
                        Student Queries
                      </h1>
                      <p className="text-gray-600 text-sm font-medium">Manage and respond to student questions and requests</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              {[
                { value: queries.length, label: "Total Queries", icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z"/></svg>, color: "blue", bgColor: "from-blue-500 to-blue-600", delay: "animate-slide-up-delayed" },
                { value: pendingCount, label: "Pending", icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zM12 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0-5c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/></svg>, color: "red", bgColor: "from-red-500 to-orange-500", delay: "animate-slide-up-delayed-2" },
                { value: unreadCount, label: "Unread", icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-4H6v-2h12v2zm0-4H6V6h12v2z"/></svg>, color: "orange", bgColor: "from-orange-500 to-yellow-500", delay: "animate-slide-up-delayed-3" },
                { value: highPriorityCount, label: "High Priority", icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>, color: "purple", bgColor: "from-purple-500 to-pink-500", delay: "animate-slide-up-delayed-4" }
              ].map((stat) => (
                <div key={stat.label} className={`group ${stat.delay}`}>
                  <div className="relative overflow-hidden rounded-xl transition-all duration-500 hover:scale-105 hover:-translate-y-1">
                    <div className={`absolute -inset-1 bg-gradient-to-r ${stat.bgColor} rounded-xl blur-md opacity-20 group-hover:opacity-40 transition-all duration-500`} />
                    <div className="relative glass-stat-card rounded-xl group-hover:shadow-xl transition-all duration-500 p-3">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 bg-gradient-to-br ${stat.bgColor} rounded-lg flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                          {stat.icon}
                        </div>
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
            <div className="glass-sidebar-card rounded-2xl p-4 mb-6 animate-slide-up-delayed-5">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7 gap-4 items-center">
                <input type="text" placeholder="Search queries..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="glass-input px-4 py-2 rounded-lg w-full xl:col-span-2" />
                <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="glass-input px-4 py-2 rounded-lg w-full">{statuses.map(status => <option key={status} value={status}>{status}</option>)}</select>
                <select value={priorityFilter} onChange={(e) => setPriorityFilter(e.target.value)} className="glass-input px-4 py-2 rounded-lg w-full">{priorities.map(priority => <option key={priority} value={priority}>{priority}</option>)}</select>
                <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)} className="glass-input px-4 py-2 rounded-lg w-full">{categories.map(category => <option key={category} value={category}>{category}</option>)}</select>
                <select value={courseFilter} onChange={(e) => setCourseFilter(e.target.value)} className="glass-input px-4 py-2 rounded-lg w-full">{courses.map(course => <option key={course} value={course}>{course}</option>)}</select>
                <label className="flex items-center gap-2 px-4 py-2 glass-input rounded-lg cursor-pointer">
                  <input type="checkbox" checked={showOnlyUnread} onChange={(e) => setShowOnlyUnread(e.target.checked)} className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
                  <span className="text-sm text-gray-700 font-medium">Unread</span>
                </label>
              </div>
              {unreadCount > 0 && (
                <div className="mt-4 text-right">
                  <button onClick={handleMarkAllAsRead} className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors font-semibold shadow-md text-sm">Mark All as Read</button>
                </div>
              )}
            </div>

            {/* Queries List */}
            <div className="space-y-4 animate-slide-up-delayed-6">
              {sortedQueries.length === 0 ? (
                <div className="glass-card rounded-2xl p-8 text-center">
                  <div className="text-gray-500 mb-4 text-lg">No queries found</div>
                  <div className="text-sm text-gray-400">Try adjusting your search or filter criteria.</div>
                </div>
              ) : (
                sortedQueries.map((query) => (
                  <div key={query.id} className={`glass-premium-card rounded-2xl p-6 transition-all duration-300 hover:shadow-2xl hover:scale-[1.01] border-l-4 ${!query.readByLecturer ? 'border-blue-500' : query.priority === 'high' ? 'border-red-500' : 'border-transparent'}`}>
                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          {!query.readByLecturer && <span className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></span>}
                          <h3 className={`text-lg font-bold ${!query.readByLecturer ? 'text-blue-900' : 'text-gray-900'}`}>{query.title}</h3>
                        </div>
                        <div className="flex flex-wrap gap-2 mb-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-bold border ${getStatusColor(query.status)}`}>{query.status.charAt(0).toUpperCase() + query.status.slice(1).replace('-', ' ')}</span>
                          <span className={`px-2 py-1 rounded-full text-xs font-bold border ${getPriorityColor(query.priority)}`}>{query.priority.charAt(0).toUpperCase() + query.priority.slice(1)} Priority</span>
                          <span className={`px-2 py-1 rounded-full text-xs font-bold border ${getCategoryColor(query.category)}`}>{query.category}</span>
                        </div>
                        <div className="flex items-center gap-3 mb-3 glass-activity-card p-3 rounded-lg">
                          <div>
                            <div className="font-bold text-gray-900">{query.student}</div>
                            <div className="text-sm text-gray-600">{query.studentEmail}</div>
                          </div>
                          <div className="text-sm text-gray-600">Course: <span className="font-bold text-gray-800">{query.course}</span></div>
                        </div>
                        <p className="text-gray-700 mb-4 line-clamp-2">{query.description}</p>
                        <div className="flex flex-wrap gap-4 text-xs text-gray-500">
                          <span>Submitted: <span className="font-semibold text-gray-700">{query.submittedAt}</span></span>
                          <span>Last Updated: <span className="font-semibold text-gray-700">{query.lastUpdated}</span></span>
                          <span>Responses: <span className="font-semibold text-gray-700">{query.responseCount}</span></span>
                        </div>
                      </div>
                      <div className="flex flex-col gap-2 w-full lg:w-48">
                        <Link href={`/lecturer/queries/${query.id}`} onClick={() => handleMarkAsRead(query.id)} className="flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-semibold shadow-md">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 9h12v2H6V9zm8 5H6v-2h8v2zm4-6H6V6h12v2z"/></svg>
                          {query.responseCount === 0 ? 'Respond' : 'View'}
                        </Link>
                        <select value={query.status} onChange={(e) => handleStatusChange(query.id, e.target.value as Query['status'])} className="px-4 py-2 text-sm rounded-lg glass-input">
                          <option value="pending">Pending</option>
                          <option value="in-progress">In Progress</option>
                          <option value="resolved">Resolved</option>
                        </select>
                        <Link href={`mailto:${query.studentEmail}?subject=Re: ${query.title}&body=Dear ${query.student},%0D%0A%0D%0A`} className="flex items-center justify-center gap-2 bg-white/50 text-gray-800 px-4 py-2 rounded-lg hover:bg-white/80 transition-colors text-sm font-semibold text-center">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>
                          Email Student
                        </Link>
                        {!query.readByLecturer && <button onClick={() => handleMarkAsRead(query.id)} className="flex items-center justify-center gap-2 bg-white/50 text-gray-800 px-4 py-2 rounded-lg hover:bg-white/80 transition-colors text-sm font-semibold">✓ Mark as Read</button>}
                        <button onClick={() => handleDeleteQuery(query.id)} className="flex items-center justify-center gap-2 bg-red-500/80 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors text-sm font-semibold">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/></svg>
                          Delete
                        </button>
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

