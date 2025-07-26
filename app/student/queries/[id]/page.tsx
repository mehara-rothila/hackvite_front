// app/student/queries/[id]/page.tsx
'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'

interface QueryMessage {
  id: string
  sender: 'student' | 'lecturer'
  senderName: string
  message: string
  timestamp: string
  attachments?: {
    name: string
    url: string
    type: string
  }[]
}

interface QueryDetails {
  id: string
  title: string
  category: string
  status: 'pending' | 'in-progress' | 'resolved'
  priority: 'low' | 'medium' | 'high'
  lecturer: string
  course: string
  submittedAt: string
  lastUpdated: string
  description: string
  messages: QueryMessage[]
  statusHistory: {
    status: string
    timestamp: string
    changedBy: string
    note?: string
  }[]
}

// Mock data - in real app this would come from API
const mockQueryDetails: Record<string, QueryDetails> = {
  '1': {
    id: '1',
    title: 'Question about Assignment 2 deadline',
    category: 'Academic',
    status: 'resolved',
    priority: 'medium',
    lecturer: 'Dr. Sarah Johnson',
    course: 'CS101',
    submittedAt: '2025-07-24',
    lastUpdated: '2025-07-25',
    description: 'Can I get an extension for the assignment due to technical issues? My laptop crashed and I lost some work.',
    messages: [
      {
        id: '1',
        sender: 'student',
        senderName: 'You',
        message: 'Can I get an extension for the assignment due to technical issues? My laptop crashed and I lost some work.',
        timestamp: '2025-07-24 10:30 AM',
        attachments: [
          { name: 'error_screenshot.png', url: '#', type: 'image' }
        ]
      },
      {
        id: '2',
        sender: 'lecturer',
        senderName: 'Dr. Sarah Johnson',
        message: 'Hi! I understand technical issues can be frustrating. Can you provide more details about what happened and when? Also, do you have any backup of your work?',
        timestamp: '2025-07-24 2:15 PM'
      },
      {
        id: '3',
        sender: 'student', 
        senderName: 'You',
        message: 'The crash happened yesterday evening around 8 PM. I had completed about 60% of the assignment. I do have some backup from 2 days ago, but it\'s missing the recent work.',
        timestamp: '2025-07-24 4:45 PM'
      },
      {
        id: '4',
        sender: 'lecturer',
        senderName: 'Dr. Sarah Johnson', 
        message: 'Thank you for the details. Given the circumstances, I\'ll grant you a 3-day extension. Please submit by Friday 5 PM. Make sure to backup your work regularly!',
        timestamp: '2025-07-25 9:00 AM'
      },
      {
        id: '5',
        sender: 'student',
        senderName: 'You',
        message: 'Thank you so much! I really appreciate the extension. I\'ll definitely be more careful with backups going forward.',
        timestamp: '2025-07-25 11:30 AM'
      }
    ],
    statusHistory: [
      { status: 'pending', timestamp: '2025-07-24 10:30 AM', changedBy: 'System', note: 'Query submitted' },
      { status: 'in-progress', timestamp: '2025-07-24 2:15 PM', changedBy: 'Dr. Sarah Johnson', note: 'Reviewing request' },
      { status: 'resolved', timestamp: '2025-07-25 9:00 AM', changedBy: 'Dr. Sarah Johnson', note: 'Extension granted' }
    ]
  },
  '2': {
    id: '2',
    title: 'Login issues with course portal',
    category: 'Technical',
    status: 'in-progress',
    priority: 'high',
    lecturer: 'IT Support',
    course: 'General',
    submittedAt: '2025-07-25',
    lastUpdated: '2025-07-26',
    description: 'Cannot access the course portal since yesterday. Getting error message when trying to log in.',
    messages: [
      {
        id: '1',
        sender: 'student',
        senderName: 'You',
        message: 'Cannot access the course portal since yesterday. Getting error message when trying to log in.',
        timestamp: '2025-07-25 9:15 AM'
      },
      {
        id: '2',
        sender: 'lecturer',
        senderName: 'IT Support Team',
        message: 'We\'re investigating this issue. Several students have reported similar problems. Can you tell us which browser you\'re using and if you\'ve tried clearing your cache?',
        timestamp: '2025-07-25 11:30 AM'
      },
      {
        id: '3',
        sender: 'student',
        senderName: 'You',
        message: 'I\'m using Chrome. I tried clearing cache and cookies but still getting the same error.',
        timestamp: '2025-07-25 1:20 PM'
      }
    ],
    statusHistory: [
      { status: 'pending', timestamp: '2025-07-25 9:15 AM', changedBy: 'System', note: 'Query submitted' },
      { status: 'in-progress', timestamp: '2025-07-25 11:30 AM', changedBy: 'IT Support', note: 'Under investigation' }
    ]
  }
}

export default function QueryDetailsPage() {
  const params = useParams()
  const queryId = params.id as string
  
  const [query, setQuery] = useState<QueryDetails | null>(null)
  const [newMessage, setNewMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    // In real app, fetch query details from API
    const queryData = mockQueryDetails[queryId]
    setQuery(queryData || null)
  }, [queryId])

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newMessage.trim() || !query) return

    setIsSubmitting(true)
    
    // Simulate API call
    setTimeout(() => {
      const message: QueryMessage = {
        id: Date.now().toString(),
        sender: 'student',
        senderName: 'You',
        message: newMessage,
        timestamp: new Date().toLocaleString()
      }
      
      setQuery({
        ...query,
        messages: [...query.messages, message],
        lastUpdated: new Date().toISOString().split('T')[0]
      })
      
      setNewMessage('')
      setIsSubmitting(false)
    }, 1000)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'in-progress': return 'bg-blue-100 text-blue-800'
      case 'resolved': return 'bg-green-100 text-green-800'
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

  if (!query) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Query Not Found</h2>
            <p className="text-gray-600 mb-6">The query you're looking for doesn't exist or you don't have permission to view it.</p>
            <Link href="/student/queries" className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
              Back to Queries
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Breadcrumb */}
        <div className="mb-6">
          <nav className="text-sm text-gray-500">
            <Link href="/student/queries" className="hover:text-blue-600">My Queries</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-900">{query.title}</span>
          </nav>
        </div>

        {/* Query Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 mb-4">
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">{query.title}</h1>
              <div className="flex flex-wrap gap-2 mb-3">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(query.status)}`}>
                  {query.status.charAt(0).toUpperCase() + query.status.slice(1).replace('-', ' ')}
                </span>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getPriorityColor(query.priority)}`}>
                  {query.priority.charAt(0).toUpperCase() + query.priority.slice(1)} Priority
                </span>
                <span className="px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800">
                  {query.category}
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                <div>Course: <span className="font-medium text-gray-900">{query.course}</span></div>
                <div>Lecturer: <span className="font-medium text-gray-900">{query.lecturer}</span></div>
                <div>Submitted: <span className="font-medium text-gray-900">{query.submittedAt}</span></div>
              </div>
            </div>
            
            <div className="flex gap-2">
              <Link
                href="/student/queries"
                className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors"
              >
                ← Back to Queries
              </Link>
              {query.status !== 'resolved' && (
                <button className="bg-red-50 text-red-600 px-4 py-2 rounded-lg hover:bg-red-100 transition-colors">
                  Close Query
                </button>
              )}
            </div>
          </div>

          {/* Original Description */}
          <div className="border-t pt-4">
            <h3 className="font-medium text-gray-900 mb-2">Original Query</h3>
            <p className="text-gray-700">{query.description}</p>
          </div>
        </div>

        {/* Status History */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h3 className="font-semibold text-gray-900 mb-4">Status History</h3>
          <div className="space-y-3">
            {query.statusHistory.map((entry, index) => (
              <div key={index} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                <div className={`w-3 h-3 rounded-full ${getStatusColor(entry.status).replace('bg-', 'bg-').replace('text-', '')}`}></div>
                <div className="flex-1">
                  <div className="font-medium text-gray-900">
                    Status changed to {entry.status.replace('-', ' ')}
                  </div>
                  <div className="text-sm text-gray-600">
                    by {entry.changedBy} on {entry.timestamp}
                    {entry.note && <span className="ml-2">• {entry.note}</span>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Conversation Thread */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h3 className="font-semibold text-gray-900 mb-4">Conversation</h3>
          
          <div className="space-y-4 mb-6">
            {query.messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'student' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-3xl ${message.sender === 'student' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-900'} rounded-lg p-4`}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-sm">
                      {message.senderName}
                    </span>
                    <span className={`text-xs ${message.sender === 'student' ? 'text-blue-100' : 'text-gray-500'}`}>
                      {message.timestamp}
                    </span>
                  </div>
                  
                  <p className="text-sm leading-relaxed">{message.message}</p>
                  
                  {message.attachments && message.attachments.length > 0 && (
                    <div className="mt-3 space-y-2">
                      {message.attachments.map((attachment, idx) => (
                        <div key={idx} className="flex items-center gap-2 p-2 bg-black bg-opacity-10 rounded">
                          <span className="text-xs">📎</span>
                          <a
                            href={attachment.url}
                            className="text-xs underline hover:no-underline"
                          >
                            {attachment.name}
                          </a>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* New Message Form - Only show if not resolved */}
          {query.status !== 'resolved' && (
            <form onSubmit={handleSendMessage} className="border-t pt-4">
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Add a follow-up message
                </label>
                <textarea
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Type your message..."
                  disabled={isSubmitting}
                />
              </div>
              
              <div className="flex justify-between items-center">
                <div className="flex gap-2">
                  <button
                    type="button"
                    className="text-sm text-gray-600 hover:text-gray-900 flex items-center gap-1"
                  >
                    📎 Attach File
                  </button>
                </div>
                
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setNewMessage('')}
                    className="px-4 py-2 text-gray-600 hover:text-gray-900"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={!newMessage.trim() || isSubmitting}
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </button>
                </div>
              </div>
            </form>
          )}

          {query.status === 'resolved' && (
            <div className="border-t pt-4">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-center gap-2">
                  <span className="text-green-600">✓</span>
                  <span className="font-medium text-green-800">This query has been resolved</span>
                </div>
                <p className="text-sm text-green-700 mt-1">
                  If you need further assistance, please submit a new query.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/student/queries"
              className="bg-blue-50 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-100 transition-colors"
            >
              View All Queries
            </Link>
            <Link
              href="/student/queries?new=true"
              className="bg-green-50 text-green-600 px-4 py-2 rounded-lg hover:bg-green-100 transition-colors"
            >
              Submit New Query
            </Link>
            {query.lecturer !== 'IT Support' && (
              <Link
                href={`/student/appointments?lecturer=${encodeURIComponent(query.lecturer)}`}
                className="bg-purple-50 text-purple-600 px-4 py-2 rounded-lg hover:bg-purple-100 transition-colors"
              >
                Book Appointment with {query.lecturer}
              </Link>
            )}
            <button className="bg-gray-50 text-gray-600 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors">
              Print Query
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}