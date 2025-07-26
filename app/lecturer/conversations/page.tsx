// app/lecturer/conversations/page.tsx
'use client'

import { useState } from 'react'
import Link from 'next/link'

interface Conversation {
  id: string
  student: string
  studentEmail: string
  studentAvatar: string
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

const mockConversations: Conversation[] = [
  {
    id: '1',
    student: 'Alice Johnson',
    studentEmail: 'alice.johnson@university.edu',
    studentAvatar: '👩‍🎓',
    subject: 'Assignment 3 Implementation Help',
    lastMessage: 'Thank you for the detailed explanation! I think I understand the algorithm now.',
    lastMessageTime: '2025-07-26 16:30',
    unreadCount: 1,
    isRead: false,
    course: 'CS101',
    messageType: 'academic',
    priority: 'medium',
    status: 'active',
    totalMessages: 8
  },
  {
    id: '2',
    student: 'Bob Smith',
    studentEmail: 'bob.smith@university.edu',
    studentAvatar: '👨‍🎓',
    subject: 'Final Project Proposal Discussion',
    lastMessage: 'I\'ve updated my proposal based on your feedback. Could you review it again?',
    lastMessageTime: '2025-07-26 14:45',
    unreadCount: 2,
    isRead: false,
    course: 'CS101',
    messageType: 'academic',
    priority: 'high',
    status: 'active',
    totalMessages: 12
  },
  {
    id: '3',
    student: 'Carol Davis',
    studentEmail: 'carol.davis@university.edu',
    studentAvatar: '👩‍🎓',
    subject: 'Lab Equipment Issue',
    lastMessage: 'Perfect! The new equipment is working fine now. Thank you!',
    lastMessageTime: '2025-07-26 11:20',
    unreadCount: 0,
    isRead: true,
    course: 'CS101',
    messageType: 'administrative',
    priority: 'low',
    status: 'resolved',
    totalMessages: 5
  },
  {
    id: '4',
    student: 'David Wilson',
    studentEmail: 'david.wilson@university.edu',
    studentAvatar: '👨‍🎓',
    subject: 'Midterm Preparation Questions',
    lastMessage: 'These practice problems are exactly what I needed. Much appreciated!',
    lastMessageTime: '2025-07-25 18:30',
    unreadCount: 0,
    isRead: true,
    course: 'CS101',
    messageType: 'academic',
    priority: 'medium',
    status: 'resolved',
    totalMessages: 15
  },
  {
    id: '5',
    student: 'Emma Brown',
    studentEmail: 'emma.brown@university.edu',
    studentAvatar: '👩‍🎓',
    subject: 'Research Opportunities',
    lastMessage: 'I\'m very interested in the machine learning research project. When can we discuss details?',
    lastMessageTime: '2025-07-25 15:10',
    unreadCount: 1,
    isRead: false,
    course: 'CS201',
    messageType: 'academic',
    priority: 'high',
    status: 'active',
    totalMessages: 6
  },
  {
    id: '6',
    student: 'Frank Lee',
    studentEmail: 'frank.lee@university.edu',
    studentAvatar: '👨‍🎓',
    subject: 'Grade Inquiry',
    lastMessage: 'Thank you for explaining the grading criteria. I understand now.',
    lastMessageTime: '2025-07-24 10:15',
    unreadCount: 0,
    isRead: true,
    course: 'CS101',
    messageType: 'administrative',
    priority: 'low',
    status: 'resolved',
    totalMessages: 4
  }
]

const courses = ['All', 'CS101', 'CS201', 'MATH202']
const messageTypes = ['All', 'Academic', 'Administrative', 'General']
const priorities = ['All', 'High', 'Medium', 'Low']
const statusFilters = ['All', 'Active', 'Resolved', 'Archived']

export default function LecturerConversationsPage() {
  const [conversations, setConversations] = useState<Conversation[]>(mockConversations)
  const [searchTerm, setSearchTerm] = useState('')
  const [courseFilter, setCourseFilter] = useState('All')
  const [typeFilter, setTypeFilter] = useState('All')
  const [priorityFilter, setPriorityFilter] = useState('All')
  const [statusFilter, setStatusFilter] = useState('All')
  const [showOnlyUnread, setShowOnlyUnread] = useState(false)

  const handleStatusChange = (conversationId: string, newStatus: Conversation['status']) => {
    setConversations(conversations.map(conv => 
      conv.id === conversationId 
        ? { ...conv, status: newStatus }
        : conv
    ))
  }

  const handlePriorityChange = (conversationId: string, newPriority: Conversation['priority']) => {
    setConversations(conversations.map(conv => 
      conv.id === conversationId 
        ? { ...conv, priority: newPriority }
        : conv
    ))
  }

  const handleMarkAsRead = (conversationId: string) => {
    setConversations(conversations.map(conv => 
      conv.id === conversationId 
        ? { ...conv, isRead: true, unreadCount: 0 }
        : conv
    ))
  }

  const handleMarkAllAsRead = () => {
    setConversations(conversations.map(conv => ({ ...conv, isRead: true, unreadCount: 0 })))
  }

  const handleArchiveConversation = (conversationId: string) => {
    if (confirm('Archive this conversation?')) {
      setConversations(conversations.map(conv => 
        conv.id === conversationId 
          ? { ...conv, status: 'archived' as const }
          : conv
      ))
    }
  }

  // Filter conversations
  const filteredConversations = conversations.filter(conversation => {
    const matchesSearch = conversation.student.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         conversation.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         conversation.lastMessage.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCourse = courseFilter === 'All' || conversation.course === courseFilter
    const matchesType = typeFilter === 'All' || conversation.messageType === typeFilter.toLowerCase()
    const matchesPriority = priorityFilter === 'All' || conversation.priority === priorityFilter.toLowerCase()
    const matchesStatus = statusFilter === 'All' || conversation.status === statusFilter.toLowerCase()
    const matchesRead = !showOnlyUnread || !conversation.isRead
    
    return matchesSearch && matchesCourse && matchesType && matchesPriority && matchesStatus && matchesRead
  })

  // Sort conversations by priority and read status
  const sortedConversations = filteredConversations.sort((a, b) => {
    // Unread first
    if (!a.isRead && b.isRead) return -1
    if (a.isRead && !b.isRead) return 1
    
    // Then by priority
    const priorityOrder = { high: 3, medium: 2, low: 1 }
    if (priorityOrder[a.priority] !== priorityOrder[b.priority]) {
      return priorityOrder[b.priority] - priorityOrder[a.priority]
    }
    
    // Finally by time
    return new Date(b.lastMessageTime).getTime() - new Date(a.lastMessageTime).getTime()
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-blue-100 text-blue-800'
      case 'resolved': return 'bg-green-100 text-green-800'
      case 'archived': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const unreadCount = conversations.filter(c => !c.isRead).length
  const activeCount = conversations.filter(c => c.status === 'active').length
  const highPriorityCount = conversations.filter(c => c.priority === 'high').length
  const totalStudents = new Set(conversations.map(c => c.student)).size

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Conversations</h1>
          <p className="text-gray-600">Manage ongoing conversations with your students</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="text-2xl font-bold text-blue-600">{conversations.length}</div>
            <div className="text-sm text-gray-600">Total Conversations</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="text-2xl font-bold text-red-600">{unreadCount}</div>
            <div className="text-sm text-gray-600">Unread</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="text-2xl font-bold text-orange-600">{activeCount}</div>
            <div className="text-sm text-gray-600">Active</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="text-2xl font-bold text-purple-600">{highPriorityCount}</div>
            <div className="text-sm text-gray-600">High Priority</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="text-2xl font-bold text-green-600">{totalStudents}</div>
            <div className="text-sm text-gray-600">Students</div>
          </div>
        </div>

        {/* Filters & Actions */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="flex flex-col sm:flex-row gap-4 flex-1">
              {/* Search */}
              <input
                type="text"
                placeholder="Search conversations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              
              {/* Filters */}
              <select
                value={courseFilter}
                onChange={(e) => setCourseFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                {courses.map(course => (
                  <option key={course} value={course}>{course}</option>
                ))}
              </select>

              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                {statusFilters.map(status => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>

              <select
                value={priorityFilter}
                onChange={(e) => setPriorityFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                {priorities.map(priority => (
                  <option key={priority} value={priority}>{priority}</option>
                ))}
              </select>

              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                {messageTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>

              <label className="flex items-center gap-2 px-4 py-2">
                <input
                  type="checkbox"
                  checked={showOnlyUnread}
                  onChange={(e) => setShowOnlyUnread(e.target.checked)}
                  className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <span className="text-sm text-gray-700">Unread only</span>
              </label>
            </div>

            {/* Actions */}
            <div className="flex gap-2">
              {unreadCount > 0 && (
                <button
                  onClick={handleMarkAllAsRead}
                  className="bg-blue-50 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-100 transition-colors"
                >
                  Mark All Read
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Conversations List */}
        <div className="space-y-3">
          {sortedConversations.length === 0 ? (
            <div className="bg-white rounded-lg shadow-sm p-8 text-center">
              <div className="text-gray-500 mb-4">No conversations found</div>
              <div className="text-sm text-gray-400">Try adjusting your filters or wait for students to start conversations</div>
            </div>
          ) : (
            sortedConversations.map((conversation) => (
              <div
                key={conversation.id}
                className={`bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow border-l-4 ${
                  !conversation.isRead 
                    ? 'border-l-blue-500 bg-blue-50' 
                    : conversation.priority === 'high'
                      ? 'border-l-red-500'
                      : 'border-l-gray-200'
                }`}
              >
                <div className="flex items-start gap-4">
                  <span className="text-3xl">{conversation.studentAvatar}</span>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      {!conversation.isRead && <span className="w-2 h-2 bg-blue-500 rounded-full"></span>}
                      <Link 
                        href={`/lecturer/conversations/${conversation.id}`}
                        onClick={() => handleMarkAsRead(conversation.id)}
                        className={`text-lg font-semibold hover:text-blue-600 ${!conversation.isRead ? 'text-blue-900' : 'text-gray-900'}`}
                      >
                        {conversation.subject}
                      </Link>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(conversation.status)}`}>
                        {conversation.status.charAt(0).toUpperCase() + conversation.status.slice(1)}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(conversation.priority)}`}>
                        {conversation.priority.charAt(0).toUpperCase() + conversation.priority.slice(1)}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(conversation.messageType)}`}>
                        {conversation.messageType.charAt(0).toUpperCase() + conversation.messageType.slice(1)}
                      </span>
                    </div>
                    
                    <div className="text-sm font-medium text-gray-700 mb-2">
                      {conversation.student} • {conversation.course} • {conversation.totalMessages} messages
                    </div>
                    
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">{conversation.lastMessage}</p>
                    
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>{conversation.lastMessageTime}</span>
                      {conversation.unreadCount > 0 && (
                        <span className="bg-blue-600 text-white px-2 py-1 rounded-full">
                          {conversation.unreadCount} new
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <Link
                      href={`/lecturer/conversations/${conversation.id}`}
                      onClick={() => handleMarkAsRead(conversation.id)}
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm text-center"
                    >
                      View Chat
                    </Link>

                    <select
                      value={conversation.priority}
                      onChange={(e) => handlePriorityChange(conversation.id, e.target.value as Conversation['priority'])}
                      className="text-xs px-2 py-1 border border-gray-300 rounded"
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                    </select>

                    <select
                      value={conversation.status}
                      onChange={(e) => handleStatusChange(conversation.id, e.target.value as Conversation['status'])}
                      className="text-xs px-2 py-1 border border-gray-300 rounded"
                    >
                      <option value="active">Active</option>
                      <option value="resolved">Resolved</option>
                      <option value="archived">Archived</option>
                    </select>

                    <Link
                      href={`mailto:${conversation.studentEmail}?subject=Re: ${conversation.subject}`}
                      className="bg-green-50 text-green-600 px-4 py-2 rounded-lg hover:bg-green-100 transition-colors text-sm text-center"
                    >
                      ✉️ Email
                    </Link>

                    {!conversation.isRead && (
                      <button
                        onClick={() => handleMarkAsRead(conversation.id)}
                        className="bg-gray-50 text-gray-600 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors text-sm"
                      >
                        Mark Read
                      </button>
                    )}

                    <button
                      onClick={() => handleArchiveConversation(conversation.id)}
                      className="bg-gray-50 text-gray-600 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors text-sm"
                    >
                      📁 Archive
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}