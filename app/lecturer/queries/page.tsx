// app/lecturer/queries/page.tsx
'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { AuthService } from '../../../lib/auth'
import { LecturerUser } from '../../../types'
import './lecturer-queries.css'

interface Query {
  id: string
  studentName: string
  studentId: string
  subject: string
  content: string
  courseCode: string
  courseName: string
  timestamp: string
  priority: 'low' | 'medium' | 'high' | 'urgent'
  status: 'pending' | 'in-progress' | 'resolved' | 'escalated'
  responseTime?: string
  category: 'academic' | 'technical' | 'administrative' | 'personal'
  tags: string[]
  attachments: number
  studentYear: string
  lastActivity: string
}

// Mock queries data
const mockQueries: Query[] = [
  {
    id: 'query-001',
    studentName: 'Alice Johnson',
    studentId: 'S123456',
    subject: 'Assignment 3 Algorithm Complexity',
    content: 'I\'m struggling with understanding the time complexity analysis for the sorting algorithms in Assignment 3. Could you provide some guidance on how to approach the Big O analysis?',
    courseCode: 'CS401',
    courseName: 'Advanced Algorithms',
    timestamp: '2024-01-15T09:30:00Z',
    priority: 'high',
    status: 'pending',
    category: 'academic',
    tags: ['assignment', 'algorithms', 'complexity'],
    attachments: 2,
    studentYear: '4th',
    lastActivity: '2024-01-15T09:30:00Z'
  },
  {
    id: 'query-002',
    studentName: 'Mark Chen',
    studentId: 'S789012',
    subject: 'Project Extension Request',
    content: 'Due to unexpected family circumstances, I need to request a 3-day extension for the software engineering project. I have completed 80% of the work and can provide documentation.',
    courseCode: 'CS350',
    courseName: 'Software Engineering',
    timestamp: '2024-01-14T16:45:00Z',
    priority: 'medium',
    status: 'in-progress',
    category: 'administrative',
    tags: ['extension', 'project', 'deadline'],
    attachments: 1,
    studentYear: '3rd',
    lastActivity: '2024-01-15T08:20:00Z'
  },
  {
    id: 'query-003',
    studentName: 'Sarah Williams',
    studentId: 'S345678',
    subject: 'Clarification on Exam Format',
    content: 'Could you clarify the format of the upcoming midterm exam? Will it include coding questions, and are we allowed to use any reference materials?',
    courseCode: 'CS201',
    courseName: 'Data Structures',
    timestamp: '2024-01-14T11:20:00Z',
    priority: 'medium',
    status: 'resolved',
    responseTime: '2 hours',
    category: 'academic',
    tags: ['exam', 'format', 'midterm'],
    attachments: 0,
    studentYear: '2nd',
    lastActivity: '2024-01-14T13:30:00Z'
  },
  {
    id: 'query-004',
    studentName: 'David Rodriguez',
    studentId: 'S567890',
    subject: 'Research Opportunity Inquiry',
    content: 'I\'m interested in undergraduate research opportunities in machine learning. Could we schedule a meeting to discuss potential projects and requirements?',
    courseCode: 'CS499',
    courseName: 'Independent Study',
    timestamp: '2024-01-13T14:15:00Z',
    priority: 'low',
    status: 'pending',
    category: 'academic',
    tags: ['research', 'machine-learning', 'meeting'],
    attachments: 1,
    studentYear: '4th',
    lastActivity: '2024-01-13T14:15:00Z'
  },
  {
    id: 'query-005',
    studentName: 'Emily Brown',
    studentId: 'S234567',
    subject: 'Technical Issue with Lab Environment',
    content: 'I\'m experiencing issues accessing the lab servers for the database project. The connection keeps timing out when I try to connect from home.',
    courseCode: 'CS340',
    courseName: 'Database Systems',
    timestamp: '2024-01-13T10:30:00Z',
    priority: 'urgent',
    status: 'escalated',
    category: 'technical',
    tags: ['lab', 'server', 'connection', 'database'],
    attachments: 3,
    studentYear: '3rd',
    lastActivity: '2024-01-13T15:45:00Z'
  },
  {
    id: 'query-006',
    studentName: 'Michael Kim',
    studentId: 'S678901',
    subject: 'Grade Review Request',
    content: 'I would like to request a review of my grade for the recent programming assignment. I believe there may have been an error in the grading of the documentation section.',
    courseCode: 'CS250',
    courseName: 'Programming Languages',
    timestamp: '2024-01-12T15:20:00Z',
    priority: 'medium',
    status: 'in-progress',
    category: 'administrative',
    tags: ['grade', 'review', 'assignment'],
    attachments: 2,
    studentYear: '2nd',
    lastActivity: '2024-01-13T09:10:00Z'
  }
]

export default function LecturerQueries() {
  const [user, setUser] = useState<LecturerUser | null>(null)
  const [loading, setLoading] = useState(true)
  const [queries, setQueries] = useState<Query[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedFilter, setSelectedFilter] = useState('pending')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [sortBy, setSortBy] = useState('priority')
  const [selectedQueries, setSelectedQueries] = useState<string[]>([])
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const router = useRouter()

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100
      })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  useEffect(() => {
    const currentUser = AuthService.getCurrentUser()

    if (!currentUser || currentUser.role !== 'lecturer') {
      router.push('/login')
      return
    }

    setUser(currentUser as LecturerUser)
    setQueries(mockQueries)
    setLoading(false)
  }, [router])

  const handleLogout = () => {
    AuthService.logout()
    router.push('/')
  }

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60)

    if (diffInHours < 1) {
      return 'Just now'
    } else if (diffInHours < 24) {
      return `${Math.floor(diffInHours)}h ago`
    } else if (diffInHours < 48) {
      return 'Yesterday'
    } else {
      return date.toLocaleDateString()
    }
  }

  const getPriorityBadgeClass = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'badge-urgent'
      case 'high': return 'badge-high'
      case 'medium': return 'badge-medium'
      case 'low': return 'badge-low'
      default: return 'badge-low'
    }
  }

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'pending': return 'badge-pending'
      case 'in-progress': return 'badge-in-progress'
      case 'resolved': return 'badge-resolved'
      case 'escalated': return 'badge-escalated'
      default: return 'badge-pending'
    }
  }

  const getCategoryBadgeClass = (category: string) => {
    switch (category) {
      case 'academic': return 'badge-academic'
      case 'technical': return 'badge-technical'
      case 'administrative': return 'badge-administrative'
      case 'personal': return 'badge-personal'
      default: return 'badge-academic'
    }
  }

  const filteredQueries = queries
    .filter(query => {
      const matchesSearch = query.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            query.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            query.courseCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            query.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            query.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))

      const matchesFilter = selectedFilter === 'all' || query.status === selectedFilter
      const matchesCategory = selectedCategory === 'all' || query.category === selectedCategory

      return matchesSearch && matchesFilter && matchesCategory
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'priority':
          const priorityOrder = { urgent: 4, high: 3, medium: 2, low: 1 }
          return priorityOrder[b.priority] - priorityOrder[a.priority]
        case 'recent':
          return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
        case 'student':
          return a.studentName.localeCompare(b.studentName)
        case 'course':
          return a.courseCode.localeCompare(b.courseCode)
        default:
          return 0
      }
    })

  const handleBulkAction = (action: string) => {
    console.log(`Performing ${action} on queries:`, selectedQueries)
    setSelectedQueries([])
  }

  const handleSelectQuery = (queryId: string) => {
    setSelectedQueries(prev =>
      prev.includes(queryId)
        ? prev.filter(id => id !== queryId)
        : [...prev, queryId]
    )
  }

  const handleSelectAll = () => {
    if (selectedQueries.length === filteredQueries.length) {
      setSelectedQueries([])
    } else {
      setSelectedQueries(filteredQueries.map(q => q.id))
    }
  }

  const pendingCount = queries.filter(q => q.status === 'pending').length
  const urgentCount = queries.filter(q => q.priority === 'urgent').length
  const todayCount = queries.filter(q => {
    const today = new Date().toDateString()
    return new Date(q.timestamp).toDateString() === today
  }).length

  if (loading) {
    return (
      <div className="page-container">
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          minHeight: '100vh' 
        }}>
          <div className="loading-spinner" style={{ width: '8rem', height: '8rem' }}></div>
        </div>
      </div>
    )
  }

  if (!user) return null

  return (
    <div className="page-container">
      {/* Educational Background - SAME AS LOGIN */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        {/* Dynamic mouse-following gradient */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            opacity: 0.2,
            transition: 'all 0.7s ease-out',
            background: `radial-gradient(800px circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(59, 130, 246, 0.15) 0%, rgba(168, 85, 247, 0.1) 25%, transparent 50%)`
          }}
        />

        {/* Light colorful gradient meshes */}
        <div className="animate-mesh-drift-1" style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(135deg, rgba(147, 197, 253, 0.3) 0%, rgba(196, 181, 253, 0.25) 50%, rgba(251, 207, 232, 0.3) 100%)'
        }} />
        <div className="animate-mesh-drift-2" style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(45deg, rgba(52, 211, 153, 0.25) 0%, rgba(196, 181, 253, 0.2) 50%, rgba(254, 215, 170, 0.25) 100%)'
        }} />
        <div className="animate-mesh-drift-3" style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(225deg, rgba(165, 243, 252, 0.3) 0%, rgba(196, 181, 253, 0.15) 50%, rgba(251, 207, 232, 0.3) 100%)'
        }} />
        <div className="animate-mesh-drift-4" style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(90deg, rgba(254, 240, 138, 0.2) 0%, transparent 50%, rgba(134, 239, 172, 0.2) 100%)'
        }} />
      </div>

      {/* Educational Equations - Academic/Query Management Context */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        <div className="animate-equation-float-1" style={{
          position: 'absolute',
          top: '12.5%',
          left: '8.33%',
          fontSize: '1.5rem',
          fontWeight: 700,
          color: 'rgba(147, 51, 234, 0.6)'
        }}>
          Q(s,a) = R(s,a) + γΣP(s&apos;|s,a)V(s&apos;)
        </div>
        <div className="animate-equation-float-2" style={{
          position: 'absolute',
          top: '25%',
          right: '12.5%',
          fontSize: '1.25rem',
          fontWeight: 700,
          color: 'rgba(59, 130, 246, 0.6)'
        }}>
          Response_Time = Total_Time / Queries_Count
        </div>
        <div className="animate-equation-float-3" style={{
          position: 'absolute',
          bottom: '25%',
          left: '12.5%',
          fontSize: '1.5rem',
          fontWeight: 700,
          color: 'rgba(16, 185, 129, 0.6)'
        }}>
          Priority = Urgency × Impact
        </div>
        <div className="animate-equation-float-4" style={{
          position: 'absolute',
          top: '50%',
          right: '8.33%',
          fontSize: '1.25rem',
          fontWeight: 700,
          color: 'rgba(236, 72, 153, 0.6)'
        }}>
          Satisfaction = Quality / Response_Time
        </div>
        <div className="animate-equation-float-1" style={{
          position: 'absolute',
          bottom: '33.33%',
          right: '16.67%',
          fontSize: '1.5rem',
          fontWeight: 700,
          color: 'rgba(245, 158, 11, 0.6)'
        }}>
          Load_Balance = Queries / Faculty
        </div>
        <div className="animate-equation-float-2" style={{
          position: 'absolute',
          top: '66.67%',
          left: '16.67%',
          fontSize: '1.25rem',
          fontWeight: 700,
          color: 'rgba(34, 211, 238, 0.6)'
        }}>
          Efficiency = Resolved / (Resolved + Pending)
        </div>

        {/* Knowledge Particles - Reduced opacity for dashboard */}
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className={`animate-particle-drift-${(i % 4) + 1}`}
            style={{
              position: 'absolute',
              width: '0.5rem',
              height: '0.5rem',
              borderRadius: '50%',
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 8}s`,
              animationDuration: `${8 + Math.random() * 4}s`,
              background: `radial-gradient(circle, ${['rgba(59, 130, 246, 0.6)', 'rgba(147, 51, 234, 0.6)', 'rgba(236, 72, 153, 0.6)', 'rgba(16, 185, 129, 0.6)', 'rgba(245, 158, 11, 0.6)', 'rgba(239, 68, 68, 0.6)'][i % 6]}, rgba(255,255,255,0.2))`,
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
            }}
          />
        ))}
      </div>

      {/* Floating Glass Orbs - More subtle for dashboard */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        <div className="animate-glass-float-1" style={{
          position: 'absolute',
          top: '4rem',
          left: '4rem',
          width: '15rem',
          height: '15rem',
          background: 'linear-gradient(135deg, rgba(196, 181, 253, 0.2) 0%, rgba(99, 102, 241, 0.15) 100%)',
          borderRadius: '50%',
          backdropFilter: 'blur(8px)',
          border: '1px solid rgba(147, 51, 234, 0.3)',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
        }} />
        <div className="animate-glass-float-2" style={{
          position: 'absolute',
          top: '8rem',
          right: '6rem',
          width: '20rem',
          height: '20rem',
          background: 'linear-gradient(135deg, rgba(147, 197, 253, 0.15) 0%, rgba(34, 211, 238, 0.1) 100%)',
          borderRadius: '50%',
          backdropFilter: 'blur(8px)',
          border: '1px solid rgba(59, 130, 246, 0.2)',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
        }} />
        <div className="animate-glass-float-3" style={{
          position: 'absolute',
          bottom: '6rem',
          left: '8rem',
          width: '17.5rem',
          height: '17.5rem',
          background: 'linear-gradient(135deg, rgba(52, 211, 153, 0.15) 0%, rgba(20, 184, 166, 0.1) 100%)',
          borderRadius: '50%',
          backdropFilter: 'blur(8px)',
          border: '1px solid rgba(16, 185, 129, 0.2)',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
        }} />
        <div className="animate-glass-float-4" style={{
          position: 'absolute',
          bottom: '4rem',
          right: '4rem',
          width: '12.5rem',
          height: '12.5rem',
          background: 'linear-gradient(135deg, rgba(251, 207, 232, 0.15) 0%, rgba(244, 114, 182, 0.1) 100%)',
          borderRadius: '50%',
          backdropFilter: 'blur(8px)',
          border: '1px solid rgba(236, 72, 153, 0.2)',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
        }} />

        <div className="animate-bubble-drift-1" style={{
          position: 'absolute',
          top: '25%',
          left: '20%',
          width: '10rem',
          height: '10rem',
          background: 'linear-gradient(135deg, rgba(196, 181, 253, 0.15) 0%, rgba(147, 51, 234, 0.1) 100%)',
          borderRadius: '50%',
          backdropFilter: 'blur(8px)',
          border: '1px solid rgba(139, 92, 246, 0.2)',
          boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)'
        }} />
        <div className="animate-bubble-drift-2" style={{
          position: 'absolute',
          bottom: '25%',
          right: '25%',
          width: '12rem',
          height: '12rem',
          background: 'linear-gradient(135deg, rgba(224, 231, 255, 0.15) 0%, rgba(59, 130, 246, 0.1) 100%)',
          borderRadius: '50%',
          backdropFilter: 'blur(8px)',
          border: '1px solid rgba(99, 102, 241, 0.2)',
          boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)'
        }} />
        <div className="animate-bubble-drift-3" style={{
          position: 'absolute',
          top: '60%',
          right: '20%',
          width: '9rem',
          height: '9rem',
          background: 'linear-gradient(135deg, rgba(254, 215, 170, 0.15) 0%, rgba(251, 191, 36, 0.1) 100%)',
          borderRadius: '50%',
          backdropFilter: 'blur(8px)',
          border: '1px solid rgba(245, 158, 11, 0.15)',
          boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)'
        }} />
      </div>

      {/* Navigation Header */}
      <nav className="glass-nav">
        {/* FIX: Replaced inline styles with a className and a <style jsx> block */}
        <div className="nav-container">
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            height: '4rem' 
          }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Link href="/lecturer/dashboard" className="nav-brand">
                <div className="nav-logo">
                  <span style={{ color: 'white', fontWeight: 700, fontSize: '0.875rem' }}>E</span>
                </div>
                <span className="nav-title">EduLink Pro</span>
              </Link>
              <div className="nav-subtitle">
                <span>Query Management</span>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div className="nav-user">
                <span>{user.title} {user.lastName}</span>
              </div>
              <button onClick={handleLogout} className="nav-logout">
                Logout
              </button>
            </div>
          </div>
        </div>
        <style jsx>{`
          .nav-container {
            max-width: 80rem;
            margin: 0 auto;
            padding: 0 1rem;
          }
          @media (min-width: 640px) {
            .nav-container {
              padding: 0 1.5rem;
            }
          }
          @media (min-width: 1024px) {
            .nav-container {
              padding: 0 2rem;
            }
          }
        `}</style>
      </nav>

      {/* Main Content */}
      <div className="main-content">
        {/* Header Section */}
        <div className="page-header animate-glass-fade-in">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <h1 className="page-title">
                Student Queries
              </h1>
              <p className="page-subtitle">
                {pendingCount} pending • {urgentCount} urgent • {todayCount} today
              </p>
            </div>
            <div className="page-actions">
              <button className="glass-button-primary">
                Create Announcement
              </button>
              <button className="glass-button-secondary">
                Export Data
              </button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="stats-grid animate-slide-up-delayed">
          <div className="stats-card">
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div className="stats-icon" style={{ 
                background: 'linear-gradient(135deg, rgba(254, 215, 170, 1) 0%, rgba(254, 243, 199, 1) 100%)' 
              }}>
                <span style={{ color: '#ea580c' }}>📥</span>
              </div>
              <div className="stats-content">
                <p className="stats-label">Pending</p>
                <p className="stats-value">{pendingCount}</p>
              </div>
            </div>
          </div>

          <div className="stats-card">
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div className="stats-icon" style={{ 
                background: 'linear-gradient(135deg, rgba(254, 202, 202, 1) 0%, rgba(254, 226, 226, 1) 100%)' 
              }}>
                <span style={{ color: '#dc2626' }}>🚨</span>
              </div>
              <div className="stats-content">
                <p className="stats-label">Urgent</p>
                <p className="stats-value">{urgentCount}</p>
              </div>
            </div>
          </div>

          <div className="stats-card">
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div className="stats-icon" style={{ 
                background: 'linear-gradient(135deg, rgba(147, 197, 253, 1) 0%, rgba(219, 234, 254, 1) 100%)' 
              }}>
                <span style={{ color: '#2563eb' }}>📊</span>
              </div>
              <div className="stats-content">
                <p className="stats-label">Today</p>
                <p className="stats-value">{todayCount}</p>
              </div>
            </div>
          </div>

          <div className="stats-card">
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div className="stats-icon" style={{ 
                background: 'linear-gradient(135deg, rgba(134, 239, 172, 1) 0%, rgba(220, 252, 231, 1) 100%)' 
              }}>
                <span style={{ color: '#16a34a' }}>⏱️</span>
              </div>
              <div className="stats-content">
                <p className="stats-label">Avg Response</p>
                <p className="stats-value">2.3h</p>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filter Bar */}
        <div className="search-container animate-slide-up-delayed-2">
          <div className="search-filters">
            {/* Search Input */}
            <div className="search-input-container">
              <div style={{ position: 'relative' }}>
                <input
                  type="text"
                  placeholder="Search queries, students, courses, or tags..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="glass-input search-input"
                />
                <div style={{
                  position: 'absolute',
                  top: '50%',
                  left: '1rem',
                  transform: 'translateY(-50%)'
                }}>
                  <svg className="search-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Filters */}
            <div className="filter-selects">
              <select
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value)}
                className="glass-input"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending ({queries.filter(q => q.status === 'pending').length})</option>
                <option value="in-progress">In Progress ({queries.filter(q => q.status === 'in-progress').length})</option>
                <option value="resolved">Resolved ({queries.filter(q => q.status === 'resolved').length})</option>
                <option value="escalated">Escalated ({queries.filter(q => q.status === 'escalated').length})</option>
              </select>

              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="glass-input"
              >
                <option value="all">All Categories</option>
                <option value="academic">Academic</option>
                <option value="technical">Technical</option>
                <option value="administrative">Administrative</option>
                <option value="personal">Personal</option>
              </select>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="glass-input"
              >
                <option value="priority">Priority</option>
                <option value="recent">Most Recent</option>
                <option value="student">Student Name</option>
                <option value="course">Course</option>
              </select>
            </div>
          </div>

          {/* Quick Filters */}
          <div className="filter-pills">
            <button
              onClick={() => setSelectedFilter('pending')}
              className={`filter-pill ${selectedFilter === 'pending' ? 'active' : ''}`}
            >
              Pending ({pendingCount})
            </button>
            <button
              onClick={() => { setSelectedFilter('all'); setSelectedCategory('all'); setSortBy('priority'); }}
              className="filter-pill"
              style={{ 
                background: 'linear-gradient(135deg, rgba(254, 202, 202, 0.8) 0%, rgba(254, 226, 226, 0.8) 100%)',
                color: '#991b1b'
              }}
            >
              Urgent ({urgentCount})
            </button>
            <button
              onClick={() => setSelectedCategory('technical')}
              className={`filter-pill ${selectedCategory === 'technical' ? 'active' : ''}`}
            >
              Technical Issues
            </button>
          </div>
        </div>

        {/* Bulk Actions */}
        {selectedQueries.length > 0 && (
          <div className="bulk-actions animate-slide-up-delayed-3">
            <div className="bulk-actions-content">
              <div className="bulk-actions-info">
                {selectedQueries.length} queries selected
              </div>
              <div className="bulk-actions-buttons">
                <button
                  onClick={() => handleBulkAction('mark-progress')}
                  className="glass-button-primary"
                  style={{ padding: '0.5rem 1rem', fontSize: '0.875rem' }}
                >
                  Mark In Progress
                </button>
                <button
                  onClick={() => handleBulkAction('assign-priority')}
                  className="glass-button-primary"
                  style={{ 
                    background: 'linear-gradient(135deg, #eab308, #ca8a04)',
                    padding: '0.5rem 1rem', 
                    fontSize: '0.875rem' 
                  }}
                >
                  Set Priority
                </button>
                <button
                  onClick={() => handleBulkAction('archive')}
                  className="glass-button-secondary"
                  style={{ padding: '0.5rem 1rem', fontSize: '0.875rem' }}
                >
                  Archive
                </button>
                <button
                  onClick={() => setSelectedQueries([])}
                  style={{
                    color: '#6b7280',
                    padding: '0.5rem 0.75rem',
                    fontWeight: 500,
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer'
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Queries List */}
        <div className="glass-container animate-slide-up-delayed-4">
          {/* Table Header */}
          <div style={{ 
            padding: '1.5rem', 
            borderBottom: '1px solid rgba(255, 255, 255, 0.3)' 
          }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <input
                type="checkbox"
                checked={selectedQueries.length === filteredQueries.length && filteredQueries.length > 0}
                onChange={handleSelectAll}
                style={{
                  width: '1rem',
                  height: '1rem',
                  accentColor: '#7c3aed',
                  borderRadius: '0.25rem'
                }}
              />
              <span style={{ 
                marginLeft: '0.75rem',
                fontSize: '0.875rem',
                fontWeight: 700,
                color: '#374151'
              }}>
                Select All ({filteredQueries.length})
              </span>
            </div>
          </div>

          {filteredQueries.length === 0 ? (
            <div className="empty-state">
              <div className="empty-state-icon">
                <svg style={{ width: '2.5rem', height: '2.5rem', color: '#9ca3af' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h3 className="empty-state-title">No queries found</h3>
              <p className="empty-state-description">
                {searchQuery ? 'Try adjusting your search or filter criteria' : 'No student queries match your current filters'}
              </p>
            </div>
          ) : (
            <div style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.2)' }}>
              {filteredQueries.map((query) => (
                <div key={query.id} className="query-item">
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                    <input
                      type="checkbox"
                      checked={selectedQueries.includes(query.id)}
                      onChange={() => handleSelectQuery(query.id)}
                      style={{
                        marginTop: '0.25rem',
                        width: '1rem',
                        height: '1rem',
                        accentColor: '#7c3aed',
                        borderRadius: '0.25rem'
                      }}
                    />

                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                        <div style={{ flex: 1 }}>
                          <div className="query-header">
                            <h3 className="query-title">
                              {query.subject}
                            </h3>
                            <span className={getPriorityBadgeClass(query.priority)}>
                              {query.priority}
                            </span>
                            <span className={getStatusBadgeClass(query.status)}>
                              {query.status}
                            </span>
                            <span className={getCategoryBadgeClass(query.category)}>
                              {query.category}
                            </span>
                          </div>

                          <div className="query-meta">
                            <span className="query-meta-item">{query.studentName}</span>
                            <span>•</span>
                            <span className="query-meta-item">{query.studentId}</span>
                            <span>•</span>
                            <span className="query-meta-item">{query.courseCode} - {query.courseName}</span>
                            <span>•</span>
                            <span className="query-meta-item">{query.studentYear} Year</span>
                          </div>

                          <p className="query-content">
                            {query.content}
                          </p>

                          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', fontSize: '0.875rem' }}>
                            <div className="query-tags">
                              {query.tags.map((tag, index) => (
                                <span key={index} className="query-tag">
                                  #{tag}
                                </span>
                              ))}
                            </div>
                            {query.attachments > 0 && (
                              <div className="query-attachments">
                                <svg style={{ width: '1rem', height: '1rem', marginRight: '0.25rem' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                                </svg>
                                {query.attachments} attachment{query.attachments !== 1 ? 's' : ''}
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="query-actions">
                          <span className="query-timestamp">
                            {formatTimestamp(query.timestamp)}
                          </span>
                          {query.responseTime && (
                            <span className="query-response-time">
                              Responded in {query.responseTime}
                            </span>
                          )}
                          <div className="query-buttons">
                            <Link
                              href={`/lecturer/queries/${query.id}`}
                              className="glass-button-primary"
                              style={{ padding: '0.5rem 1rem', fontSize: '0.875rem' }}
                            >
                              View Details
                            </Link>
                            <button className="glass-button-secondary" style={{ padding: '0.5rem 1rem', fontSize: '0.875rem' }}>
                              Quick Reply
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Results Summary */}
        {filteredQueries.length > 0 && (
          <div className="results-summary animate-slide-up-delayed-5">
            Showing {filteredQueries.length} of {queries.length} queries
            {searchQuery && ` for "${searchQuery}"`}
          </div>
        )}
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="mobile-nav" style={{ display: 'block' }}>
        <style jsx>{`
          @media (min-width: 768px) {
            .mobile-nav {
              display: none !important;
            }
          }
        `}</style>
        <div className="mobile-nav-grid">
          <Link href="/lecturer/dashboard" className="mobile-nav-item">
            <div className="mobile-nav-icon">🏠</div>
            <span className="mobile-nav-label">Home</span>
          </Link>
          <Link href="/lecturer/queries" className="mobile-nav-item active">
            <div className="mobile-nav-icon">
              📥
              {pendingCount > 0 && (
                <span className="mobile-nav-badge">
                  {pendingCount > 9 ? '9+' : pendingCount}
                </span>
              )}
            </div>
            <span className="mobile-nav-label">Queries</span>
          </Link>
          <Link href="/lecturer/appointments" className="mobile-nav-item">
            <div className="mobile-nav-icon">📅</div>
            <span className="mobile-nav-label">Schedule</span>
          </Link>
          <Link href="/lecturer/analytics" className="mobile-nav-item">
            <div className="mobile-nav-icon">📊</div>
            <span className="mobile-nav-label">Analytics</span>
          </Link>
        </div>
      </div>
    </div>
  )
}