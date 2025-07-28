// app/lecturer/messages/page.tsx
'use client'

import { useState } from 'react'
import Link from 'next/link'

interface Message {
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
    student: 'Alice Johnson',
    studentEmail: 'alice.johnson@university.edu',
    studentAvatar: '👩‍🎓',
    subject: 'Assignment 3 Question',
    lastMessage: 'Thank you for the clarification! I understand the requirements much better now.',
    lastMessageTime: '2025-07-26 15:45',
    unreadCount: 1,
    isRead: false,
    course: 'CS101',
    messageType: 'academic',
    priority: 'medium',
    status: 'active'
  },
  {
    id: '2',
    student: 'Bob Smith',
    studentEmail: 'bob.smith@university.edu',
    studentAvatar: '👨‍🎓',
    subject: 'Office Hours Request',
    lastMessage: 'Could I schedule some extra office hours to discuss my final project?',
    lastMessageTime: '2025-07-26 14:20',
    unreadCount: 2,
    isRead: false,
    course: 'CS101',
    messageType: 'administrative',
    priority: 'high',
    status: 'active'
  },
  {
    id: '3',
    student: 'Carol Davis',
    studentEmail: 'carol.davis@university.edu',
    studentAvatar: '👩‍🎓',
    subject: 'Lab Material Clarification',
    lastMessage: 'Perfect, that explains everything. Thank you!',
    lastMessageTime: '2025-07-26 11:30',
    unreadCount: 0,
    isRead: true,
    course: 'CS101',
    messageType: 'general',
    priority: 'low',
    status: 'resolved'
  },
  {
    id: '4',
    student: 'David Wilson',
    studentEmail: 'david.wilson@university.edu',
    studentAvatar: '👨‍🎓',
    subject: 'Midterm Study Group',
    lastMessage: 'Would you be willing to facilitate a study group session before the midterm?',
    lastMessageTime: '2025-07-25 16:15',
    unreadCount: 1,
    isRead: false,
    course: 'CS101',
    messageType: 'academic',
    priority: 'medium',
    status: 'active'
  },
  {
    id: '5',
    student: 'Emma Brown',
    studentEmail: 'emma.brown@university.edu',
    studentAvatar: '👩‍🎓',
    subject: 'Grade Inquiry',
    lastMessage: 'I received the updated grade. Thank you for the quick response!',
    lastMessageTime: '2025-07-25 09:45',
    unreadCount: 0,
    isRead: true,
    course: 'CS101',
    messageType: 'administrative',
    priority: 'medium',
    status: 'resolved'
  }
]

const mockThreads: Record<string, MessageThread> = {
  '1': {
    id: '1',
    messages: [
      {
        id: '1',
        sender: 'student',
        senderName: 'Alice Johnson',
        content: 'Hi Dr. Johnson, I\'m working on Assignment 3 and I\'m a bit confused about the sorting algorithm requirements. Could you clarify what approach you\'d like us to take?',
        timestamp: '2025-07-25 14:30',
      },
      {
        id: '2',
        sender: 'lecturer',
        senderName: 'You',
        content: 'Hi Alice! For Assignment 3, you can choose between quicksort or mergesort. The key is to implement it efficiently and include proper documentation. Focus on the time complexity analysis.',
        timestamp: '2025-07-26 09:15',
      },
      {
        id: '3',
        sender: 'student',
        senderName: 'Alice Johnson',
        content: 'Thank you for the clarification! I understand the requirements much better now. I\'ll go with mergesort and make sure to document the complexity analysis properly.',
        timestamp: '2025-07-26 15:45',
      }
    ]
  }
}

const courses = ['All', 'CS101', 'CS201', 'MATH202']
const priorities = ['All', 'High', 'Medium', 'Low']
const statusFilters = ['All', 'Active', 'Resolved', 'Archived']

export default function LecturerMessagesPage() {
  const [messages, setMessages] = useState<Message[]>(mockMessages)
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null)
  const [selectedThread, setSelectedThread] = useState<MessageThread | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [courseFilter, setCourseFilter] = useState('All')
  const [typeFilter] = useState('All')
  const [priorityFilter, setPriorityFilter] = useState('All')
  const [statusFilter, setStatusFilter] = useState('All')
  const [showOnlyUnread, setShowOnlyUnread] = useState(false)
  const [replyText, setReplyText] = useState('')

  const handleViewMessage = (message: Message) => {
    setSelectedMessage(message)
    setSelectedThread(mockThreads[message.id] || null)
    
    // Mark as read
    if (!message.isRead) {
      setMessages(messages.map(m => 
        m.id === message.id 
          ? { ...m, isRead: true, unreadCount: 0 }
          : m
      ))
    }
  }

  const handleSendReply = (e: React.FormEvent) => {
    e.preventDefault()
    if (!replyText.trim() || !selectedThread) return

    const newMessage = {
      id: Date.now().toString(),
      sender: 'lecturer' as const,
      senderName: 'You',
      content: replyText,
      timestamp: new Date().toLocaleString()
    }

    setSelectedThread({
      ...selectedThread,
      messages: [...selectedThread.messages, newMessage]
    })

    setReplyText('')
  }

  const handleStatusChange = (messageId: string, newStatus: Message['status']) => {
    setMessages(messages.map(m => 
      m.id === messageId 
        ? { ...m, status: newStatus }
        : m
    ))
  }

  const handlePriorityChange = (messageId: string, newPriority: Message['priority']) => {
    setMessages(messages.map(m => 
      m.id === messageId 
        ? { ...m, priority: newPriority }
        : m
    ))
  }

  const handleMarkAllAsRead = () => {
    setMessages(messages.map(m => ({ ...m, isRead: true, unreadCount: 0 })))
  }

  const handleArchiveMessage = (messageId: string) => {
    if (confirm('Archive this message thread?')) {
      setMessages(messages.map(m => 
        m.id === messageId 
          ? { ...m, status: 'archived' as const }
          : m
      ))
    }
  }

  // Filter messages
  const filteredMessages = messages.filter(message => {
    const matchesSearch = message.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         message.student.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         message.lastMessage.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCourse = courseFilter === 'All' || message.course === courseFilter
    const matchesType = typeFilter === 'All' || message.messageType === typeFilter.toLowerCase()
    const matchesPriority = priorityFilter === 'All' || message.priority === priorityFilter.toLowerCase()
    const matchesStatus = statusFilter === 'All' || message.status === statusFilter.toLowerCase()
    const matchesRead = !showOnlyUnread || !message.isRead
    
    return matchesSearch && matchesCourse && matchesType && matchesPriority && matchesStatus && matchesRead
  })

  // Sort messages by priority and read status
  const sortedMessages = filteredMessages.sort((a, b) => {
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

  const unreadCount = messages.filter(m => !m.isRead).length
  const activeCount = messages.filter(m => m.status === 'active').length
  const highPriorityCount = messages.filter(m => m.priority === 'high').length

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Messages</h1>
          <p className="text-gray-600">Communicate with your students and manage inquiries</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="text-2xl font-bold text-blue-600">{messages.length}</div>
            <div className="text-sm text-gray-600">Total Messages</div>
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
            <div className="text-2xl font-bold text-green-600">
              {new Set(messages.map(m => m.student)).size}
            </div>
            <div className="text-sm text-gray-600">Students</div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Messages List */}
          <div className="lg:col-span-2">
            {/* Filters & Actions */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div className="flex flex-col sm:flex-row gap-4 flex-1">
                  {/* Search */}
                  <input
                    type="text"
                    placeholder="Search messages..."
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

            {/* Messages List */}
            <div className="space-y-3">
              {sortedMessages.length === 0 ? (
                <div className="bg-white rounded-lg shadow-sm p-8 text-center">
                  <div className="text-gray-500 mb-4">No messages found</div>
                  <div className="text-sm text-gray-400">Try adjusting your filters</div>
                </div>
              ) : (
                sortedMessages.map((message) => (
                  <div
                    key={message.id}
                    onClick={() => handleViewMessage(message)}
                    className={`bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow cursor-pointer border-l-4 ${
                      !message.isRead 
                        ? 'border-l-blue-500 bg-blue-50' 
                        : message.priority === 'high'
                          ? 'border-l-red-500'
                          : 'border-l-gray-200'
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <span className="text-3xl">{message.studentAvatar}</span>
                      
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          {!message.isRead && <span className="w-2 h-2 bg-blue-500 rounded-full"></span>}
                          <h3 className={`font-semibold ${!message.isRead ? 'text-blue-900' : 'text-gray-900'}`}>
                            {message.subject}
                          </h3>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(message.status)}`}>
                            {message.status.charAt(0).toUpperCase() + message.status.slice(1)}
                          </span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(message.priority)}`}>
                            {message.priority.charAt(0).toUpperCase() + message.priority.slice(1)}
                          </span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(message.messageType)}`}>
                            {message.messageType.charAt(0).toUpperCase() + message.messageType.slice(1)}
                          </span>
                        </div>
                        
                        <div className="text-sm font-medium text-gray-700 mb-1">
                          {message.student} • {message.course}
                        </div>
                        
                        <p className="text-sm text-gray-600 mb-2 line-clamp-2">{message.lastMessage}</p>
                        
                        <div className="flex items-center justify-between text-xs text-gray-500">
                          <span>{message.lastMessageTime}</span>
                          {message.unreadCount > 0 && (
                            <span className="bg-blue-600 text-white px-2 py-1 rounded-full">
                              {message.unreadCount} new
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="flex flex-col gap-2">
                        <select
                          value={message.priority}
                          onChange={(e) => {
                            e.stopPropagation()
                            handlePriorityChange(message.id, e.target.value as Message['priority'])
                          }}
                          className="text-xs px-2 py-1 border border-gray-300 rounded"
                        >
                          <option value="low">Low</option>
                          <option value="medium">Medium</option>
                          <option value="high">High</option>
                        </select>

                        <select
                          value={message.status}
                          onChange={(e) => {
                            e.stopPropagation()
                            handleStatusChange(message.id, e.target.value as Message['status'])
                          }}
                          className="text-xs px-2 py-1 border border-gray-300 rounded"
                        >
                          <option value="active">Active</option>
                          <option value="resolved">Resolved</option>
                          <option value="archived">Archived</option>
                        </select>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Message Thread Viewer */}
          <div className="bg-white rounded-lg shadow-sm">
            {selectedMessage && selectedThread ? (
              <div className="h-[600px] flex flex-col">
                {/* Thread Header */}
                <div className="p-4 border-b">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{selectedMessage.studentAvatar}</span>
                      <div>
                        <h3 className="font-semibold text-gray-900">{selectedMessage.subject}</h3>
                        <p className="text-sm text-gray-600">{selectedMessage.student} • {selectedMessage.course}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Link
                        href={`mailto:${selectedMessage.studentEmail}?subject=Re: ${selectedMessage.subject}`}
                        className="text-sm text-blue-600 hover:text-blue-800"
                      >
                        ✉️ Email
                      </Link>
                      <button
                        onClick={() => handleArchiveMessage(selectedMessage.id)}
                        className="text-sm text-gray-600 hover:text-gray-800"
                      >
                        📁 Archive
                      </button>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <span className={`px-2 py-1 rounded text-xs ${getStatusColor(selectedMessage.status)}`}>
                      {selectedMessage.status}
                    </span>
                    <span className={`px-2 py-1 rounded text-xs ${getPriorityColor(selectedMessage.priority)}`}>
                      {selectedMessage.priority} priority
                    </span>
                  </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {selectedThread.messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex ${msg.sender === 'lecturer' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                        msg.sender === 'lecturer'
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-900'
                      }`}>
                        <div className="text-xs opacity-75 mb-1">{msg.senderName}</div>
                        <p className="text-sm">{msg.content}</p>
                        {msg.attachments && msg.attachments.length > 0 && (
                          <div className="mt-2 space-y-1">
                            {msg.attachments.map((attachment, idx) => (
                              <div key={idx} className="text-xs opacity-75">
                                📎 {attachment.name}
                              </div>
                            ))}
                          </div>
                        )}
                        <div className="text-xs opacity-75 mt-1">{msg.timestamp}</div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Reply Form */}
                <div className="p-4 border-t">
                  <form onSubmit={handleSendReply} className="space-y-3">
                    <textarea
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Type your reply..."
                    />
                    <div className="flex justify-between">
                      <button
                        type="button"
                        className="text-sm text-gray-600 hover:text-gray-900"
                      >
                        📎 Attach File
                      </button>
                      <button
                        type="submit"
                        disabled={!replyText.trim()}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Send Reply
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            ) : (
              <div className="p-8 text-center text-gray-500">
                <div className="text-4xl mb-4">💬</div>
                <div>Select a message to view the conversation</div>
                <div className="text-sm text-gray-400 mt-2">
                  Use filters to find specific messages or students
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
