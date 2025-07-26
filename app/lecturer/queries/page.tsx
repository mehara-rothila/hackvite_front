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
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center">
        <div className="loading-spinner w-32 h-32"></div>
      </div>
    )
  }

  if (!user) return null

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Educational Background - SAME AS LOGIN */}
      <div className="absolute inset-0 z-0">
        {/* Dynamic mouse-following gradient */}
        <div
          className="absolute inset-0 opacity-20 transition-all duration-700 ease-out"
          style={{
            background: `radial-gradient(800px circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(59, 130, 246, 0.15) 0%, rgba(168, 85, 247, 0.1) 25%, transparent 50%)`
          }}
        />

        {/* Light colorful gradient meshes */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-100/30 via-purple-100/25 to-pink-100/30 animate-mesh-drift-1" />
        <div className="absolute inset-0 bg-gradient-to-tr from-emerald-100/25 via-violet-100/20 to-orange-100/25 animate-mesh-drift-2" />
        <div className="absolute inset-0 bg-gradient-to-bl from-cyan-100/30 via-purple-100/15 to-rose-100/30 animate-mesh-drift-3" />
        <div className="absolute inset-0 bg-gradient-to-r from-yellow-100/20 via-transparent to-green-100/20 animate-mesh-drift-4" />
      </div>

      {/* Educational Equations - Academic/Query Management Context */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/8 left-1/12 text-2xl font-bold text-purple-500/60 animate-equation-float-1">
          Q(s,a) = R(s,a) + γΣP(s&apos;|s,a)V(s&apos;)
        </div>
        <div className="absolute top-1/4 right-1/8 text-xl font-bold text-blue-500/60 animate-equation-float-2">
          Response_Time = (Total_Time / Queries_Count)
        </div>
        <div className="absolute bottom-1/4 left-1/8 text-2xl font-bold text-emerald-500/60 animate-equation-float-3">
          Priority = Urgency × Impact
        </div>
        <div className="absolute top-1/2 right-1/12 text-xl font-bold text-pink-500/60 animate-equation-float-4">
          Satisfaction = Quality / Response_Time
        </div>
        <div className="absolute bottom-1/3 right-1/6 text-2xl font-bold text-orange-500/60 animate-equation-float-1">
          Load_Balance = Queries / Faculty
        </div>
        <div className="absolute top-2/3 left-1/6 text-xl font-bold text-cyan-500/60 animate-equation-float-2">
          Efficiency = Resolved / (Resolved + Pending)
        </div>

        {/* Knowledge Particles - Reduced opacity for dashboard */}
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-2 h-2 rounded-full animate-particle-drift-${(i % 4) + 1} shadow-sm`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 8}s`,
              animationDuration: `${8 + Math.random() * 4}s`,
              background: `radial-gradient(circle, ${['rgba(59, 130, 246, 0.6)', 'rgba(147, 51, 234, 0.6)', 'rgba(236, 72, 153, 0.6)', 'rgba(16, 185, 129, 0.6)', 'rgba(245, 158, 11, 0.6)', 'rgba(239, 68, 68, 0.6)'][i % 6]}, rgba(255,255,255,0.2))`
            }}
          />
        ))}
      </div>

      {/* Floating Glass Orbs - More subtle for dashboard */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-16 left-16 w-60 h-60 bg-gradient-to-br from-purple-200/20 to-indigo-200/15 rounded-full backdrop-blur-sm border border-purple-300/30 animate-glass-float-1 shadow-lg" />
        <div className="absolute top-32 right-24 w-80 h-80 bg-gradient-to-br from-blue-200/15 to-cyan-200/10 rounded-full backdrop-blur-sm border border-blue-300/20 animate-glass-float-2 shadow-lg" />
        <div className="absolute bottom-24 left-32 w-70 h-70 bg-gradient-to-br from-emerald-200/15 to-teal-200/10 rounded-full backdrop-blur-sm border border-emerald-300/20 animate-glass-float-3 shadow-lg" />
        <div className="absolute bottom-16 right-16 w-50 h-50 bg-gradient-to-br from-pink-200/15 to-rose-200/10 rounded-full backdrop-blur-sm border border-pink-300/20 animate-glass-float-4 shadow-lg" />

        <div className="absolute top-1/4 left-1/5 w-40 h-40 bg-gradient-to-br from-violet-200/15 to-purple-200/10 rounded-full backdrop-blur-sm border border-violet-300/20 animate-bubble-drift-1 shadow-md" />
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-gradient-to-br from-indigo-200/15 to-blue-200/10 rounded-full backdrop-blur-sm border border-indigo-300/20 animate-bubble-drift-2 shadow-md" />
        <div className="absolute top-3/5 right-1/5 w-36 h-36 bg-gradient-to-br from-orange-200/15 to-yellow-200/10 rounded-full backdrop-blur-sm border border-orange-300/15 animate-bubble-drift-3 shadow-md" />
      </div>

      {/* Navigation Header */}
      <nav className="relative z-30 glass-nav">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/lecturer/dashboard" className="flex items-center">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-purple-700 rounded-lg flex items-center justify-center backdrop-blur-sm">
                  <span className="text-white font-bold text-sm">E</span>
                </div>
                <span className="ml-3 text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">EduLink Pro</span>
              </Link>
              <div className="ml-8">
                <span className="text-sm text-gray-600 font-medium">Query Management</span>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-700">
                <span className="font-semibold">{user.title} {user.lastName}</span>
              </div>
              <button
                onClick={handleLogout}
                className="text-sm text-gray-600 hover:text-red-600 transition-colors font-medium"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="relative z-20 max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="mb-8 animate-glass-fade-in">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Student Queries
              </h1>
              <p className="text-gray-600 mt-1 font-medium">
                {pendingCount} pending • {urgentCount} urgent • {todayCount} today
              </p>
            </div>
            <div className="flex space-x-3">
              <button className="glass-button-primary text-white px-6 py-3 rounded-xl font-semibold">
                Create Announcement
              </button>
              <button className="glass-button-secondary px-6 py-3 rounded-xl font-semibold">
                Export Data
              </button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6 animate-slide-up-delayed">
          <div className="stats-card rounded-2xl p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-100 to-orange-200 rounded-xl flex items-center justify-center backdrop-blur-sm">
                <span className="text-orange-600 text-2xl">📥</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-bold text-gray-500">Pending</p>
                <p className="text-3xl font-bold text-gray-900">{pendingCount}</p>
              </div>
            </div>
          </div>

          <div className="stats-card rounded-2xl p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-gradient-to-br from-red-100 to-red-200 rounded-xl flex items-center justify-center backdrop-blur-sm">
                <span className="text-red-600 text-2xl">🚨</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-bold text-gray-500">Urgent</p>
                <p className="text-3xl font-bold text-gray-900">{urgentCount}</p>
              </div>
            </div>
          </div>

          <div className="stats-card rounded-2xl p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl flex items-center justify-center backdrop-blur-sm">
                <span className="text-blue-600 text-2xl">📊</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-bold text-gray-500">Today</p>
                <p className="text-3xl font-bold text-gray-900">{todayCount}</p>
              </div>
            </div>
          </div>

          <div className="stats-card rounded-2xl p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-gradient-to-br from-green-100 to-green-200 rounded-xl flex items-center justify-center backdrop-blur-sm">
                <span className="text-green-600 text-2xl">⏱️</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-bold text-gray-500">Avg Response</p>
                <p className="text-3xl font-bold text-gray-900">2.3h</p>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filter Bar */}
        <div className="search-container rounded-2xl p-6 mb-6 animate-slide-up-delayed-2">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search Input */}
            <div className="flex-1">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search queries, students, courses, or tags..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="glass-input w-full pl-12 pr-4 py-3 rounded-xl focus:outline-none text-gray-700 font-medium placeholder-gray-500"
                />
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center">
                  <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Filters */}
            <div className="flex gap-3">
              <select
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value)}
                className="glass-input px-4 py-3 rounded-xl focus:outline-none font-medium text-gray-700"
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
                className="glass-input px-4 py-3 rounded-xl focus:outline-none font-medium text-gray-700"
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
                className="glass-input px-4 py-3 rounded-xl focus:outline-none font-medium text-gray-700"
              >
                <option value="priority">Priority</option>
                <option value="recent">Most Recent</option>
                <option value="student">Student Name</option>
                <option value="course">Course</option>
              </select>
            </div>
          </div>

          {/* Quick Filters */}
          <div className="flex flex-wrap gap-3 mt-6">
            <button
              onClick={() => setSelectedFilter('pending')}
              className={`filter-pill px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                selectedFilter === 'pending' ? 'active' : ''
              }`}
            >
              Pending ({pendingCount})
            </button>
            <button
              onClick={() => { setSelectedFilter('all'); setSelectedCategory('all'); setSortBy('priority'); }}
              className="filter-pill px-4 py-2 rounded-full text-sm font-semibold transition-all bg-gradient-to-r from-red-100 to-red-200 text-red-800 hover:from-red-200 hover:to-red-300"
            >
              Urgent ({urgentCount})
            </button>
            <button
              onClick={() => setSelectedCategory('technical')}
              className={`filter-pill px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                selectedCategory === 'technical' ? 'active' : ''
              }`}
            >
              Technical Issues
            </button>
          </div>
        </div>

        {/* Bulk Actions */}
        {selectedQueries.length > 0 && (
          <div className="bulk-actions rounded-2xl p-4 mb-6 animate-slide-up-delayed-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <span className="text-sm font-bold text-blue-900">
                  {selectedQueries.length} queries selected
                </span>
              </div>
              <div className="flex space-x-3">
                <button
                  onClick={() => handleBulkAction('mark-progress')}
                  className="glass-button-primary text-white px-4 py-2 rounded-lg text-sm font-semibold"
                >
                  Mark In Progress
                </button>
                <button
                  onClick={() => handleBulkAction('assign-priority')}
                  className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:from-yellow-600 hover:to-yellow-700 transition-all"
                >
                  Set Priority
                </button>
                <button
                  onClick={() => handleBulkAction('archive')}
                  className="glass-button-secondary px-4 py-2 rounded-lg text-sm font-semibold"
                >
                  Archive
                </button>
                <button
                  onClick={() => setSelectedQueries([])}
                  className="text-gray-600 hover:text-gray-800 px-3 py-2 font-medium"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Queries List */}
        <div className="glass-container rounded-2xl animate-slide-up-delayed-4">
          {/* Table Header */}
          <div className="px-6 py-4 border-b border-white/30">
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={selectedQueries.length === filteredQueries.length && filteredQueries.length > 0}
                onChange={handleSelectAll}
                className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
              />
              <span className="ml-3 text-sm font-bold text-gray-700">
                Select All ({filteredQueries.length})
              </span>
            </div>
          </div>

          {filteredQueries.length === 0 ? (
            <div className="text-center py-16">
              <div className="empty-state w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">No queries found</h3>
              <p className="text-gray-600 font-medium">
                {searchQuery ? 'Try adjusting your search or filter criteria' : 'No student queries match your current filters'}
              </p>
            </div>
          ) : (
            <div className="divide-y divide-white/20">
              {filteredQueries.map((query) => (
                <div key={query.id} className="query-item p-6">
                  <div className="flex items-start space-x-4">
                    <input
                      type="checkbox"
                      checked={selectedQueries.includes(query.id)}
                      onChange={() => handleSelectQuery(query.id)}
                      className="mt-1 h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                    />

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-3">
                            <h3 className="text-lg font-bold text-gray-900">
                              {query.subject}
                            </h3>
                            <span className={`px-3 py-1 text-xs rounded-full font-semibold ${getPriorityBadgeClass(query.priority)}`}>
                              {query.priority}
                            </span>
                            <span className={`px-3 py-1 text-xs rounded-full font-semibold ${getStatusBadgeClass(query.status)}`}>
                              {query.status}
                            </span>
                            <span className={`px-3 py-1 text-xs rounded-full font-semibold ${getCategoryBadgeClass(query.category)}`}>
                              {query.category}
                            </span>
                          </div>

                          <div className="flex items-center space-x-4 text-sm text-gray-600 mb-4">
                            <span className="font-bold">{query.studentName}</span>
                            <span>•</span>
                            <span className="font-medium">{query.studentId}</span>
                            <span>•</span>
                            <span className="font-medium">{query.courseCode} - {query.courseName}</span>
                            <span>•</span>
                            <span className="font-medium">{query.studentYear} Year</span>
                          </div>

                          <p className="text-gray-700 mb-4 line-clamp-2 font-medium">
                            {query.content}
                          </p>

                          <div className="flex items-center space-x-4 text-sm">
                            <div className="flex flex-wrap gap-2">
                              {query.tags.map((tag, index) => (
                                <span key={index} className="query-tag px-3 py-1 rounded-full text-xs font-semibold">
                                  #{tag}
                                </span>
                              ))}
                            </div>
                            {query.attachments > 0 && (
                              <div className="flex items-center text-gray-500 font-medium">
                                <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                                </svg>
                                {query.attachments} attachment{query.attachments !== 1 ? 's' : ''}
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="flex-shrink-0 flex flex-col items-end space-y-3">
                          <span className="text-xs text-gray-500 font-medium">
                            {formatTimestamp(query.timestamp)}
                          </span>
                          {query.responseTime && (
                            <span className="text-xs text-green-700 bg-green-100/80 backdrop-blur-sm px-3 py-1 rounded-full font-semibold">
                              Responded in {query.responseTime}
                            </span>
                          )}
                          <div className="flex space-x-2">
                            <Link
                              href={`/lecturer/queries/${query.id}`}
                              className="glass-button-primary text-white px-4 py-2 rounded-lg text-sm font-semibold"
                            >
                              View Details
                            </Link>
                            <button className="glass-button-secondary px-4 py-2 rounded-lg text-sm font-semibold">
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
          <div className="mt-6 text-center text-sm text-gray-600 font-medium animate-slide-up-delayed-5">
            Showing {filteredQueries.length} of {queries.length} queries
            {searchQuery && ` for "${searchQuery}"`}
          </div>
        )}
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="md:hidden mobile-nav fixed bottom-0 left-0 right-0 z-40">
        <div className="grid grid-cols-4 py-2">
          <Link href="/lecturer/dashboard" className="flex flex-col items-center py-2 text-gray-600">
            <span className="text-lg">🏠</span>
            <span className="text-xs font-medium">Home</span>
          </Link>
          <Link href="/lecturer/queries" className="flex flex-col items-center py-2 text-purple-600">
            <div className="relative">
              <span className="text-lg">📥</span>
              {pendingCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center font-bold">
                  {pendingCount > 9 ? '9+' : pendingCount}
                </span>
              )}
            </div>
            <span className="text-xs font-medium">Queries</span>
          </Link>
          <Link href="/lecturer/appointments" className="flex flex-col items-center py-2 text-gray-600">
            <span className="text-lg">📅</span>
            <span className="text-xs font-medium">Schedule</span>
          </Link>
          <Link href="/lecturer/analytics" className="flex flex-col items-center py-2 text-gray-600">
            <span className="text-lg">📊</span>
            <span className="text-xs font-medium">Analytics</span>
          </Link>
        </div>
      </div>
    </div>
  )
}
