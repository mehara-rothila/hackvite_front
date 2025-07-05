// app/student/conversations/page.tsx
'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { AuthService } from '../../../lib/auth'
import { StudentUser } from '../../../types'

interface Conversation {
  id: string
  lecturerName: string
  lecturerTitle: string
  subject: string
  lastMessage: string
  timestamp: string
  unreadCount: number
  isOnline: boolean
  courseCode: string
  courseName: string
  priority: 'low' | 'medium' | 'high'
  status: 'active' | 'archived' | 'resolved'
  avatar: string
}

export default function StudentConversations() {
  const [user, setUser] = useState<StudentUser | null>(null)
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedFilter, setSelectedFilter] = useState('all')
  const [sortBy, setSortBy] = useState('recent')
  const [conversations, setConversations] = useState<Conversation[]>([])
  const [showFilters, setShowFilters] = useState(false)
  const router = useRouter()

  // Mock conversation data
  const mockConversations: Conversation[] = [
    {
      id: 'conv-001',
      lecturerName: 'Dr. Sarah Johnson',
      lecturerTitle: 'Dr.',
      subject: 'Assignment 3 Feedback Request',
      lastMessage: 'I\'ve reviewed your submission. Could we discuss the algorithm complexity section?',
      timestamp: '2024-01-15T10:30:00Z',
      unreadCount: 2,
      isOnline: true,
      courseCode: 'CS401',
      courseName: 'Advanced Algorithms',
      priority: 'high',
      status: 'active',
      avatar: 'SJ'
    },
    {
      id: 'conv-002',
      lecturerName: 'Prof. Michael Chen',
      lecturerTitle: 'Prof.',
      subject: 'Project Proposal Discussion',
      lastMessage: 'Your project idea looks promising. Let\'s schedule a meeting to discuss the scope.',
      timestamp: '2024-01-14T15:45:00Z',
      unreadCount: 0,
      isOnline: false,
      courseCode: 'CS350',
      courseName: 'Software Engineering',
      priority: 'medium',
      status: 'active',
      avatar: 'MC'
    },
    {
      id: 'conv-003',
      lecturerName: 'Dr. Emily Rodriguez',
      lecturerTitle: 'Dr.',
      subject: 'Exam Preparation Questions',
      lastMessage: 'Here are some additional practice problems for the upcoming exam.',
      timestamp: '2024-01-13T09:15:00Z',
      unreadCount: 1,
      isOnline: true,
      courseCode: 'CS201',
      courseName: 'Data Structures',
      priority: 'medium',
      status: 'active',
      avatar: 'ER'
    },
    {
      id: 'conv-004',
      lecturerName: 'Prof. David Wilson',
      lecturerTitle: 'Prof.',
      subject: 'Internship Recommendation',
      lastMessage: 'I\'d be happy to write a recommendation letter for your internship application.',
      timestamp: '2024-01-12T14:20:00Z',
      unreadCount: 0,
      isOnline: false,
      courseCode: 'CS490',
      courseName: 'Senior Capstone',
      priority: 'low',
      status: 'resolved',
      avatar: 'DW'
    },
    {
      id: 'conv-005',
      lecturerName: 'Dr. Lisa Thompson',
      lecturerTitle: 'Dr.',
      subject: 'Research Opportunities',
      lastMessage: 'I have some undergraduate research positions available. Are you interested?',
      timestamp: '2024-01-11T11:30:00Z',
      unreadCount: 3,
      isOnline: true,
      courseCode: 'CS499',
      courseName: 'Independent Study',
      priority: 'high',
      status: 'active',
      avatar: 'LT'
    },
    {
      id: 'conv-006',
      lecturerName: 'Prof. James Martinez',
      lecturerTitle: 'Prof.',
      subject: 'Course Registration Help',
      lastMessage: 'Thank you for helping me understand the prerequisites.',
      timestamp: '2024-01-10T16:45:00Z',
      unreadCount: 0,
      isOnline: false,
      courseCode: 'ADVS100',
      courseName: 'Academic Advising',
      priority: 'low',
      status: 'resolved',
      avatar: 'JM'
    }
  ]

  useEffect(() => {
    const currentUser = AuthService.getCurrentUser()
    
    if (!currentUser || currentUser.role !== 'student') {
      router.push('/login')
      return
    }
    
    setUser(currentUser as StudentUser)
    setConversations(mockConversations)
    setLoading(false)
  }, [router, mockConversations]) // FIX: Added missing dependency

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
      case 'high': return 'bg-red-100 text-red-800'
      case 'medium': return 'bg-yellow-100 text-yellow-800'
      case 'low': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-blue-100 text-blue-800'
      case 'resolved': return 'bg-green-100 text-green-800'
      case 'archived': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const filteredConversations = conversations
    .filter(conv => {
      const matchesSearch = conv.lecturerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          conv.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          conv.courseCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          conv.courseName.toLowerCase().includes(searchQuery.toLowerCase())
      
      const matchesFilter = selectedFilter === 'all' || 
                           (selectedFilter === 'unread' && conv.unreadCount > 0) ||
                           (selectedFilter === 'active' && conv.status === 'active') ||
                           (selectedFilter === 'resolved' && conv.status === 'resolved') ||
                           (selectedFilter === 'high-priority' && conv.priority === 'high')
      
      return matchesSearch && matchesFilter
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'recent':
          return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
        case 'unread':
          return b.unreadCount - a.unreadCount
        case 'priority':
          const priorityOrder = { high: 3, medium: 2, low: 1 }
          return priorityOrder[b.priority] - priorityOrder[a.priority]
        case 'name':
          return a.lecturerName.localeCompare(b.lecturerName)
        default:
          return 0
      }
    })

  const totalUnread = conversations.reduce((sum, conv) => sum + conv.unreadCount, 0)
  const activeConversations = conversations.filter(conv => conv.status === 'active').length

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
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
              <Link href="/student/dashboard" className="flex items-center">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">E</span>
                </div>
                <span className="ml-3 text-xl font-bold text-gray-900">EduLink Pro</span>
              </Link>
              <div className="ml-8">
                <span className="text-sm text-gray-600">Messages</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-700">
                <span className="font-medium">{user.firstName}</span>
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
              <h1 className="text-3xl font-bold text-gray-900">Messages</h1>
              <p className="text-gray-600 mt-1">
                {totalUnread > 0 ? `${totalUnread} unread messages` : 'All caught up!'} • {activeConversations} active conversations
              </p>
            </div>
            <Link 
              href="/student/conversations/new"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              New Message
            </Link>
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
                  placeholder="Search conversations, lecturers, or courses..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                  <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    <svg className="h-5 w-5 text-gray-400 hover:text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </div>
            </div>

            {/* Filter Dropdown */}
            <div className="flex gap-2">
              <select
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Messages</option>
                <option value="unread">Unread ({conversations.filter(c => c.unreadCount > 0).length})</option>
                <option value="active">Active ({conversations.filter(c => c.status === 'active').length})</option>
                <option value="resolved">Resolved ({conversations.filter(c => c.status === 'resolved').length})</option>
                <option value="high-priority">High Priority ({conversations.filter(c => c.priority === 'high').length})</option>
              </select>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="recent">Most Recent</option>
                <option value="unread">Unread First</option>
                <option value="priority">Priority</option>
                <option value="name">Lecturer Name</option>
              </select>

              <button
                onClick={() => setShowFilters(!showFilters)}
                className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors md:hidden"
              >
                <svg className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
                </svg>
              </button>
            </div>
          </div>

          {/* Quick Filter Chips */}
          <div className="flex flex-wrap gap-2 mt-4">
            <button
              onClick={() => setSelectedFilter('unread')}
              className={`px-3 py-1 rounded-full text-sm transition-colors ${
                selectedFilter === 'unread' 
                  ? 'bg-blue-100 text-blue-800' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Unread ({conversations.filter(c => c.unreadCount > 0).length})
            </button>
            <button
              onClick={() => setSelectedFilter('high-priority')}
              className={`px-3 py-1 rounded-full text-sm transition-colors ${
                selectedFilter === 'high-priority' 
                  ? 'bg-red-100 text-red-800' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              High Priority ({conversations.filter(c => c.priority === 'high').length})
            </button>
            <button
              onClick={() => setSelectedFilter('all')}
              className={`px-3 py-1 rounded-full text-sm transition-colors ${
                selectedFilter === 'all' 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              All Messages
            </button>
          </div>
        </div>

        {/* Conversations List */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          {filteredConversations.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {searchQuery ? 'No conversations found' : 'No conversations yet'}
              </h3>
              <p className="text-gray-600 mb-4">
                {searchQuery 
                  ? 'Try adjusting your search or filter criteria' 
                  : 'Start a conversation with your lecturers to get help with your studies'
                }
              </p>
              {!searchQuery && (
                <Link 
                  href="/student/conversations/new"
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                >
                  Start Your First Conversation
                </Link>
              )}
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {filteredConversations.map((conversation) => (
                <Link
                  key={conversation.id}
                  href={`/student/conversations/${conversation.id}`}
                  className="block hover:bg-gray-50 transition-colors"
                >
                  <div className="p-6">
                    <div className="flex items-start space-x-4">
                      {/* Avatar */}
                      <div className="relative flex-shrink-0">
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                          <span className="text-blue-700 font-semibold text-sm">
                            {conversation.avatar}
                          </span>
                        </div>
                        {conversation.isOnline && (
                          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                        )}
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-1">
                              <h3 className={`text-lg font-medium ${conversation.unreadCount > 0 ? 'text-gray-900' : 'text-gray-700'}`}>
                                {conversation.lecturerTitle} {conversation.lecturerName}
                              </h3>
                              <span className="text-sm text-gray-500">•</span>
                              <span className="text-sm text-gray-500">{conversation.courseCode}</span>
                              <span className={`px-2 py-1 text-xs rounded-full ${getPriorityColor(conversation.priority)}`}>
                                {conversation.priority}
                              </span>
                              <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(conversation.status)}`}>
                                {conversation.status}
                              </span>
                            </div>
                            <h4 className={`text-sm ${conversation.unreadCount > 0 ? 'font-semibold text-gray-900' : 'font-medium text-gray-600'} mb-2`}>
                              {conversation.subject}
                            </h4>
                            <p className={`text-sm ${conversation.unreadCount > 0 ? 'text-gray-900' : 'text-gray-600'} truncate`}>
                              {conversation.lastMessage}
                            </p>
                            <p className="text-xs text-gray-500 mt-1">
                              {conversation.courseName}
                            </p>
                          </div>

                          {/* Metadata */}
                          <div className="flex-shrink-0 flex flex-col items-end space-y-2">
                            <span className="text-xs text-gray-500">
                              {formatTimestamp(conversation.timestamp)}
                            </span>
                            {conversation.unreadCount > 0 && (
                              <span className="bg-blue-600 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center">
                                {conversation.unreadCount > 9 ? '9+' : conversation.unreadCount}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Results Summary */}
        {filteredConversations.length > 0 && (
          <div className="mt-4 text-center text-sm text-gray-600">
            Showing {filteredConversations.length} of {conversations.length} conversations
            {searchQuery && ` for "${searchQuery}"`}
          </div>
        )}
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
        <div className="grid grid-cols-4 py-2">
          <Link href="/student/dashboard" className="flex flex-col items-center py-2 text-gray-600">
            <span className="text-lg">🏠</span>
            <span className="text-xs">Home</span>
          </Link>
          <Link href="/student/conversations" className="flex flex-col items-center py-2 text-blue-600">
            <div className="relative">
              <span className="text-lg">💬</span>
              {totalUnread > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  {totalUnread > 9 ? '9+' : totalUnread}
                </span>
              )}
            </div>
            <span className="text-xs">Messages</span>
          </Link>
          <Link href="/student/appointments" className="flex flex-col items-center py-2 text-gray-600">
            <span className="text-lg">📅</span>
            <span className="text-xs">Appointments</span>
          </Link>
          <Link href="/edubot" className="flex flex-col items-center py-2 text-gray-600">
            <span className="text-lg">🤖</span>
            <span className="text-xs">EduBot</span>
          </Link>
        </div>
      </div>
    </div>
  )
}