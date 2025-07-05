// app/lecturer/queries/page.tsx
'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { AuthService } from '../../../lib/auth'
import { LecturerUser } from '../../../types'

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

// Mock queries data (moved outside component to prevent re-creation on render)
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
  const router = useRouter()

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

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'bg-red-500 text-white'
      case 'high': return 'bg-red-100 text-red-800'
      case 'medium': return 'bg-yellow-100 text-yellow-800'
      case 'low': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-orange-100 text-orange-800'
      case 'in-progress': return 'bg-blue-100 text-blue-800'
      case 'resolved': return 'bg-green-100 text-green-800'
      case 'escalated': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'academic': return 'bg-purple-100 text-purple-800'
      case 'technical': return 'bg-indigo-100 text-indigo-800'
      case 'administrative': return 'bg-blue-100 text-blue-800'
      case 'personal': return 'bg-pink-100 text-pink-800'
      default: return 'bg-gray-100 text-gray-800'
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
    // Mock bulk action handling
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
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-600"></div>
      </div>
    )
  }

  if (!user) return null

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Header */}
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/lecturer/dashboard" className="flex items-center">
                <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">E</span>
                </div>
                <span className="ml-3 text-xl font-bold text-gray-900">EduLink Pro</span>
              </Link>
              <div className="ml-8">
                <span className="text-sm text-gray-600">Query Management</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-700">
                <span className="font-medium">{user.title} {user.lastName}</span>
              </div>
              <button
                onClick={handleLogout}
                className="text-sm text-gray-600 hover:text-red-600 transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Student Queries</h1>
              <p className="text-gray-600 mt-1">
                {pendingCount} pending • {urgentCount} urgent • {todayCount} today
              </p>
            </div>
            <div className="flex space-x-3">
              <button className="bg-purple-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-purple-700 transition-colors">
                Create Announcement
              </button>
              <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors">
                Export Data
              </button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                <span className="text-orange-600 text-lg">📥</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Pending</p>
                <p className="text-2xl font-semibold text-gray-900">{pendingCount}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                <span className="text-red-600 text-lg">🚨</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Urgent</p>
                <p className="text-2xl font-semibold text-gray-900">{urgentCount}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-blue-600 text-lg">📊</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Today</p>
                <p className="text-2xl font-semibold text-gray-900">{todayCount}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-green-600 text-lg">⏱️</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Avg Response</p>
                <p className="text-2xl font-semibold text-gray-900">2.3h</p>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filter Bar */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search Input */}
            <div className="flex-1">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search queries, students, courses, or tags..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                  <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Filters */}
            <div className="flex gap-2">
              <select
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
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
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
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
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="priority">Priority</option>
                <option value="recent">Most Recent</option>
                <option value="student">Student Name</option>
                <option value="course">Course</option>
              </select>
            </div>
          </div>

          {/* Quick Filters */}
          <div className="flex flex-wrap gap-2 mt-4">
            <button
              onClick={() => setSelectedFilter('pending')}
              className={`px-3 py-1 rounded-full text-sm transition-colors ${
                selectedFilter === 'pending' 
                  ? 'bg-orange-100 text-orange-800' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Pending ({pendingCount})
            </button>
            <button
              onClick={() => { setSelectedFilter('all'); setSelectedCategory('all'); setSortBy('priority'); }}
              className="px-3 py-1 rounded-full text-sm bg-red-100 text-red-800 hover:bg-red-200 transition-colors"
            >
              Urgent ({urgentCount})
            </button>
            <button
              onClick={() => setSelectedCategory('technical')}
              className={`px-3 py-1 rounded-full text-sm transition-colors ${
                selectedCategory === 'technical' 
                  ? 'bg-indigo-100 text-indigo-800' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Technical Issues
            </button>
          </div>
        </div>

        {/* Bulk Actions */}
        {selectedQueries.length > 0 && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <span className="text-sm font-medium text-blue-900">
                  {selectedQueries.length} queries selected
                </span>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleBulkAction('mark-progress')}
                  className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition-colors"
                >
                  Mark In Progress
                </button>
                <button
                  onClick={() => handleBulkAction('assign-priority')}
                  className="bg-yellow-600 text-white px-3 py-1 rounded text-sm hover:bg-yellow-700 transition-colors"
                >
                  Set Priority
                </button>
                <button
                  onClick={() => handleBulkAction('archive')}
                  className="bg-gray-600 text-white px-3 py-1 rounded text-sm hover:bg-gray-700 transition-colors"
                >
                  Archive
                </button>
                <button
                  onClick={() => setSelectedQueries([])}
                  className="text-gray-600 hover:text-gray-800 px-2 py-1"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Queries List */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          {/* Table Header */}
          <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={selectedQueries.length === filteredQueries.length && filteredQueries.length > 0}
                onChange={handleSelectAll}
                className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
              />
              <span className="ml-3 text-sm font-medium text-gray-700">
                Select All ({filteredQueries.length})
              </span>
            </div>
          </div>

          {filteredQueries.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No queries found</h3>
              <p className="text-gray-600">
                {searchQuery ? 'Try adjusting your search or filter criteria' : 'No student queries match your current filters'}
              </p>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {filteredQueries.map((query) => (
                <div key={query.id} className="p-6 hover:bg-gray-50 transition-colors">
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
                          <div className="flex items-center space-x-2 mb-2">
                            <h3 className="text-lg font-medium text-gray-900">
                              {query.subject}
                            </h3>
                            <span className={`px-2 py-1 text-xs rounded-full ${getPriorityColor(query.priority)}`}>
                              {query.priority}
                            </span>
                            <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(query.status)}`}>
                              {query.status}
                            </span>
                            <span className={`px-2 py-1 text-xs rounded-full ${getCategoryColor(query.category)}`}>
                              {query.category}
                            </span>
                          </div>
                          
                          <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                            <span className="font-medium">{query.studentName}</span>
                            <span>•</span>
                            <span>{query.studentId}</span>
                            <span>•</span>
                            <span>{query.courseCode} - {query.courseName}</span>
                            <span>•</span>
                            <span>{query.studentYear} Year</span>
                          </div>
                          
                          <p className="text-gray-700 mb-3 line-clamp-2">
                            {query.content}
                          </p>
                          
                          <div className="flex items-center space-x-4 text-sm">
                            <div className="flex flex-wrap gap-1">
                              {query.tags.map((tag, index) => (
                                <span key={index} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                                  #{tag}
                                </span>
                              ))}
                            </div>
                            {query.attachments > 0 && (
                              <div className="flex items-center text-gray-500">
                                <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                                </svg>
                                {query.attachments} attachment{query.attachments !== 1 ? 's' : ''}
                              </div>
                            )}
                          </div>
                        </div>
                        
                        <div className="flex-shrink-0 flex flex-col items-end space-y-2">
                          <span className="text-xs text-gray-500">
                            {formatTimestamp(query.timestamp)}
                          </span>
                          {query.responseTime && (
                            <span className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded">
                              Responded in {query.responseTime}
                            </span>
                          )}
                          <div className="flex space-x-2">
                            <Link
                              href={`/lecturer/queries/${query.id}`}
                              className="bg-purple-600 text-white px-3 py-1 rounded text-sm hover:bg-purple-700 transition-colors"
                            >
                              View Details
                            </Link>
                            <button className="border border-gray-300 text-gray-700 px-3 py-1 rounded text-sm hover:bg-gray-50 transition-colors">
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
          <div className="mt-4 text-center text-sm text-gray-600">
            Showing {filteredQueries.length} of {queries.length} queries
            {searchQuery && ` for "${searchQuery}"`}
          </div>
        )}
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
        <div className="grid grid-cols-4 py-2">
          <Link href="/lecturer/dashboard" className="flex flex-col items-center py-2 text-gray-600">
            <span className="text-lg">🏠</span>
            <span className="text-xs">Home</span>
          </Link>
          <Link href="/lecturer/queries" className="flex flex-col items-center py-2 text-purple-600">
            <div className="relative">
              <span className="text-lg">📥</span>
              {pendingCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  {pendingCount > 9 ? '9+' : pendingCount}
                </span>
              )}
            </div>
            <span className="text-xs">Queries</span>
          </Link>
          <Link href="/lecturer/appointments" className="flex flex-col items-center py-2 text-gray-600">
            <span className="text-lg">📅</span>
            <span className="text-xs">Schedule</span>
          </Link>
          <Link href="/lecturer/analytics" className="flex flex-col items-center py-2 text-gray-600">
            <span className="text-lg">📊</span>
            <span className="text-xs">Analytics</span>
          </Link>
        </div>
      </div>
    </div>
  )
}