// app/student/messages/page.tsx
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
  const [showComposeModal, setShowComposeModal] = useState(false)
  const [replyText, setReplyText] = useState('')

  // Compose form state
  const [composeForm, setComposeForm] = useState({
    lecturer: '',
    subject: '',
    content: '',
    course: '',
    priority: 'medium' as const
  })

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
      sender: 'student' as const,
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

  const handleComposeMessage = (e: React.FormEvent) => {
    e.preventDefault()
    
    const newMessage: Message = {
      id: Date.now().toString(),
      lecturer: composeForm.lecturer,
      lecturerAvatar: '👨‍🏫',
      subject: composeForm.subject,
      lastMessage: composeForm.content.substring(0, 50) + '...',
      lastMessageTime: new Date().toLocaleString(),
      unreadCount: 0,
      isRead: true,
      course: composeForm.course,
      messageType: 'general',
      priority: composeForm.priority
    }

    setMessages([newMessage, ...messages])
    setComposeForm({
      lecturer: '',
      subject: '',
      content: '',
      course: '',
      priority: 'medium'
    })
    setShowComposeModal(false)
  }

  const handleMarkAllAsRead = () => {
    setMessages(messages.map(m => ({ ...m, isRead: true, unreadCount: 0 })))
  }

  // Filter messages
  const filteredMessages = messages.filter(message => {
    const matchesSearch = message.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         message.lecturer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         message.lastMessage.toLowerCase().includes(searchTerm.toLowerCase())
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

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Messages</h1>
          <p className="text-gray-600">Communicate with your lecturers and stay updated</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="text-2xl font-bold text-blue-600">{messages.length}</div>
            <div className="text-sm text-gray-600">Total Messages</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="text-2xl font-bold text-red-600">{unreadCount}</div>
            <div className="text-sm text-gray-600">Unread</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="text-2xl font-bold text-green-600">
              {new Set(messages.map(m => m.lecturer)).size}
            </div>
            <div className="text-sm text-gray-600">Lecturers</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="text-2xl font-bold text-purple-600">
              {messages.filter(m => m.priority === 'high').length}
            </div>
            <div className="text-sm text-gray-600">High Priority</div>
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
                    value={lecturerFilter}
                    onChange={(e) => setLecturerFilter(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    {lecturers.map(lecturer => (
                      <option key={lecturer} value={lecturer}>{lecturer}</option>
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
                  <button
                    onClick={() => setShowComposeModal(true)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    ✉️ Compose
                  </button>
                  {unreadCount > 0 && (
                    <button
                      onClick={handleMarkAllAsRead}
                      className="bg-gray-50 text-gray-600 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      Mark All Read
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Messages List */}
            <div className="space-y-3">
              {filteredMessages.length === 0 ? (
                <div className="bg-white rounded-lg shadow-sm p-8 text-center">
                  <div className="text-gray-500 mb-4">No messages found</div>
                  <button
                    onClick={() => setShowComposeModal(true)}
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
                  >
                    Send Your First Message
                  </button>
                </div>
              ) : (
                filteredMessages.map((message) => (
                  <div
                    key={message.id}
                    onClick={() => handleViewMessage(message)}
                    className={`bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow cursor-pointer border-l-4 ${
                      !message.isRead 
                        ? 'border-l-blue-500 bg-blue-50' 
                        : 'border-l-gray-200'
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <span className="text-3xl">{message.lecturerAvatar}</span>
                      
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          {!message.isRead && <span className="w-2 h-2 bg-blue-500 rounded-full"></span>}
                          <h3 className={`font-semibold ${!message.isRead ? 'text-blue-900' : 'text-gray-900'}`}>
                            {message.subject}
                          </h3>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(message.messageType)}`}>
                            {message.messageType.charAt(0).toUpperCase() + message.messageType.slice(1)}
                          </span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(message.priority)}`}>
                            {message.priority.charAt(0).toUpperCase() + message.priority.slice(1)}
                          </span>
                        </div>
                        
                        <div className="text-sm font-medium text-gray-700 mb-1">
                          {message.lecturer} • {message.course}
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
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-2xl">{selectedMessage.lecturerAvatar}</span>
                    <div>
                      <h3 className="font-semibold text-gray-900">{selectedMessage.subject}</h3>
                      <p className="text-sm text-gray-600">{selectedMessage.lecturer} • {selectedMessage.course}</p>
                    </div>
                  </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {selectedThread.messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex ${msg.sender === 'student' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                        msg.sender === 'student'
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
              </div>
            )}
          </div>
        </div>

        {/* Compose Message Modal */}
        {showComposeModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
              <h2 className="text-2xl font-bold mb-6">Compose New Message</h2>
              
              <form onSubmit={handleComposeMessage} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Lecturer</label>
                    <select
                      required
                      value={composeForm.lecturer}
                      onChange={(e) => setComposeForm({...composeForm, lecturer: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select lecturer</option>
                      <option value="Dr. Sarah Johnson">Dr. Sarah Johnson</option>
                      <option value="Prof. Michael Chen">Prof. Michael Chen</option>
                      <option value="Dr. Emily Roberts">Dr. Emily Roberts</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Course</label>
                    <select
                      required
                      value={composeForm.course}
                      onChange={(e) => setComposeForm({...composeForm, course: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select course</option>
                      <option value="CS101">CS101</option>
                      <option value="MATH202">MATH202</option>
                      <option value="ENG110">ENG110</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                  <input
                    type="text"
                    required
                    value={composeForm.subject}
                    onChange={(e) => setComposeForm({...composeForm, subject: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="Message subject"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                  <textarea
                    required
                    rows={5}
                    value={composeForm.content}
                    onChange={(e) => setComposeForm({...composeForm, content: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="Type your message..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                  <select
                    value={composeForm.priority}
                    onChange={(e) => setComposeForm({...composeForm, priority: e.target.value as any})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>

                <div className="flex gap-4 pt-4">
                  <button
                    type="submit"
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
                  >
                    Send Message
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowComposeModal(false)}
                    className="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-400"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}