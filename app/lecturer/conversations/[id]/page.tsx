// app/lecturer/conversations/[id]/page.tsx
'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'

interface ConversationMessage {
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
  isRead: boolean
}

interface ConversationDetails {
  id: string
  student: string
  studentEmail: string
  studentAvatar: string
  subject: string
  course: string
  status: 'active' | 'resolved' | 'archived'
  priority: 'low' | 'medium' | 'high'
  messageType: 'academic' | 'administrative' | 'general'
  startedAt: string
  lastUpdated: string
  totalMessages: number
  messages: ConversationMessage[]
  studentInfo?: {
    year: string
    gpa: string
    previousInteractions: number
  }
}

// Mock conversation data
const mockConversationDetails: Record<string, ConversationDetails> = {
  '1': {
    id: '1',
    student: 'Alice Johnson',
    studentEmail: 'alice.johnson@university.edu',
    studentAvatar: '👩‍🎓',
    subject: 'Assignment 3 Implementation Help',
    course: 'CS101',
    status: 'active',
    priority: 'medium',
    messageType: 'academic',
    startedAt: '2025-07-24 10:30',
    lastUpdated: '2025-07-26 16:30',
    totalMessages: 8,
    studentInfo: {
      year: '2nd Year',
      gpa: '3.7',
      previousInteractions: 12
    },
    messages: [
      {
        id: '1',
        sender: 'student',
        senderName: 'Alice Johnson',
        content: 'Hi Dr. Johnson, I\'m working on Assignment 3 and I\'m having trouble understanding the sorting algorithm requirements. Could you help me understand what approach I should take?',
        timestamp: '2025-07-24 10:30',
        isRead: true
      },
      {
        id: '2',
        sender: 'lecturer',
        senderName: 'You',
        content: 'Hi Alice! I\'d be happy to help. For Assignment 3, you can choose between implementing either quicksort or mergesort. The key requirements are:\n\n1. Implement the algorithm efficiently\n2. Include proper documentation\n3. Analyze the time complexity\n4. Test with different data sizes\n\nWhich algorithm are you leaning towards?',
        timestamp: '2025-07-24 14:15',
        isRead: true
      },
      {
        id: '3',
        sender: 'student',
        senderName: 'Alice Johnson',
        content: 'Thank you! I think I\'ll go with mergesort since we covered it more extensively in class. Could you clarify what you mean by "analyze the time complexity"? Do you want the mathematical analysis or empirical testing?',
        timestamp: '2025-07-24 16:45',
        isRead: true
      },
      {
        id: '4',
        sender: 'lecturer',
        senderName: 'You',
        content: 'Great choice! For the time complexity analysis, I want both:\n\n1. Mathematical analysis: Explain why mergesort is O(n log n) in all cases\n2. Empirical testing: Run your implementation with different input sizes and create a graph showing how execution time scales\n\nThis will help you understand the practical implications of the theoretical complexity.',
        timestamp: '2025-07-25 09:20',
        isRead: true
      },
      {
        id: '5',
        sender: 'student',
        senderName: 'Alice Johnson',
        content: 'That makes sense! I\'ll work on both parts. One more question - for the empirical testing, what input sizes would you recommend? And should I test with random data or specific patterns?',
        timestamp: '2025-07-25 11:30',
        isRead: true
      },
      {
        id: '6',
        sender: 'lecturer',
        senderName: 'You',
        content: 'For input sizes, try: 100, 500, 1000, 5000, 10000, 50000 elements. Test with:\n1. Random data\n2. Already sorted data  \n3. Reverse sorted data\n4. Data with many duplicates\n\nThis will show how the algorithm performs in different scenarios. The sorted/reverse sorted cases are particularly interesting for understanding merge sort\'s stability.',
        timestamp: '2025-07-25 13:45',
        attachments: [
          { name: 'testing_guidelines.pdf', url: '#', type: 'pdf' }
        ],
        isRead: true
      },
      {
        id: '7',
        sender: 'student',
        senderName: 'Alice Johnson',
        content: 'Perfect! This gives me a clear roadmap. I\'ll start implementing and testing today. Should I submit the code and analysis as separate files or combine them?',
        timestamp: '2025-07-26 14:20',
        isRead: true
      },
      {
        id: '8',
        sender: 'lecturer',
        senderName: 'You',
        content: 'Submit them as separate files:\n- mergesort.py (your implementation)\n- analysis.pdf (your written analysis with graphs)\n- test_results.xlsx (raw data from your tests)\n\nThis makes it easier for me to review each component. Good luck with the implementation!',
        timestamp: '2025-07-26 15:10',
        isRead: true
      },
      {
        id: '9',
        sender: 'student',
        senderName: 'Alice Johnson',
        content: 'Thank you for the detailed explanation! I think I understand the algorithm now and have a clear plan for the analysis. I really appreciate your help!',
        timestamp: '2025-07-26 16:30',
        isRead: false
      }
    ]
  },
  '2': {
    id: '2',
    student: 'Bob Smith', 
    studentEmail: 'bob.smith@university.edu',
    studentAvatar: '👨‍🎓',
    subject: 'Final Project Proposal Discussion',
    course: 'CS101',
    status: 'active',
    priority: 'high',
    messageType: 'academic',
    startedAt: '2025-07-20 09:15',
    lastUpdated: '2025-07-26 14:45',
    totalMessages: 12,
    studentInfo: {
      year: '3rd Year',
      gpa: '3.9',
      previousInteractions: 8
    },
    messages: [
      {
        id: '1',
        sender: 'student',
        senderName: 'Bob Smith',
        content: 'Hi Dr. Johnson, I wanted to discuss my final project proposal. I\'m thinking of building a web application that uses machine learning to recommend study materials based on student performance.',
        timestamp: '2025-07-20 09:15',
        isRead: true
      },
      {
        id: '2',
        sender: 'lecturer',
        senderName: 'You',
        content: 'That sounds like an interesting project, Bob! The concept has good potential. Can you provide more details about:\n1. What type of ML algorithm you\'re considering\n2. What data you plan to use for training\n3. How you\'ll measure student performance\n4. The scope of the web application',
        timestamp: '2025-07-20 11:30',
        isRead: true
      },
      {
        id: '3',
        sender: 'student',
        senderName: 'Bob Smith',
        content: 'I\'ve updated my proposal based on your feedback. Could you review it again? I\'ve addressed the data sources and included a more detailed technical approach.',
        timestamp: '2025-07-26 14:45',
        attachments: [
          { name: 'updated_project_proposal.pdf', url: '#', type: 'pdf' }
        ],
        isRead: false
      }
    ]
  }
}

export default function LecturerConversationDetailPage() {
  const params = useParams()
  const conversationId = params.id as string
  
  const [conversation, setConversation] = useState<ConversationDetails | null>(null)
  const [newMessage, setNewMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // In real app, fetch conversation details from API
    const conversationData = mockConversationDetails[conversationId]
    setConversation(conversationData || null)
  }, [conversationId])

  useEffect(() => {
    scrollToBottom()
  }, [conversation?.messages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newMessage.trim() || !conversation) return

    setIsSubmitting(true)
    
    // Simulate API call
    setTimeout(() => {
      const message: ConversationMessage = {
        id: Date.now().toString(),
        sender: 'lecturer',
        senderName: 'You',
        content: newMessage,
        timestamp: new Date().toLocaleString(),
        isRead: true
      }
      
      setConversation({
        ...conversation,
        messages: [...conversation.messages, message],
        lastUpdated: new Date().toLocaleString(),
        totalMessages: conversation.totalMessages + 1
      })
      
      setNewMessage('')
      setIsSubmitting(false)
    }, 1000)
  }

  const handleStatusChange = (newStatus: ConversationDetails['status']) => {
    if (conversation) {
      setConversation({
        ...conversation,
        status: newStatus
      })
    }
  }

  const handlePriorityChange = (newPriority: ConversationDetails['priority']) => {
    if (conversation) {
      setConversation({
        ...conversation,
        priority: newPriority
      })
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

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800'
      case 'medium': return 'bg-orange-100 text-orange-800'
      case 'low': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  if (!conversation) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Conversation Not Found</h2>
            <p className="text-gray-600 mb-6">The conversation you're looking for doesn't exist or you don't have permission to view it.</p>
            <Link href="/lecturer/conversations" className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
              Back to Conversations
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Breadcrumb */}
        <div className="mb-6">
          <nav className="text-sm text-gray-500">
            <Link href="/lecturer/conversations" className="hover:text-blue-600">Conversations</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-900">{conversation.subject}</span>
          </nav>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Student Information Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl">{conversation.studentAvatar}</span>
                <div>
                  <h3 className="font-semibold text-gray-900">{conversation.student}</h3>
                  <p className="text-sm text-gray-600">{conversation.course}</p>
                </div>
              </div>

              {conversation.studentInfo && (
                <div className="space-y-2 text-sm">
                  <div>
                    <span className="font-medium text-gray-700">Year:</span>
                    <span className="ml-2 text-gray-600">{conversation.studentInfo.year}</span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">GPA:</span>
                    <span className="ml-2 text-gray-600">{conversation.studentInfo.gpa}</span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Previous Interactions:</span>
                    <span className="ml-2 text-gray-600">{conversation.studentInfo.previousInteractions}</span>
                  </div>
                </div>
              )}

              <div className="mt-4 space-y-2">
                <Link
                  href={`mailto:${conversation.studentEmail}?subject=Re: ${conversation.subject}`}
                  className="block w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-center text-sm"
                >
                  ✉️ Send Email
                </Link>
                <Link
                  href={`/lecturer/queries?student=${encodeURIComponent(conversation.student)}`}
                  className="block w-full bg-green-50 text-green-600 px-4 py-2 rounded-lg hover:bg-green-100 transition-colors text-center text-sm"
                >
                  📋 View Queries
                </Link>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6">
              <h4 className="font-semibold text-gray-900 mb-4">Conversation Settings</h4>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <select
                    value={conversation.status}
                    onChange={(e) => handleStatusChange(e.target.value as ConversationDetails['status'])}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="active">Active</option>
                    <option value="resolved">Resolved</option>
                    <option value="archived">Archived</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                  <select
                    value={conversation.priority}
                    onChange={(e) => handlePriorityChange(e.target.value as ConversationDetails['priority'])}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>

                <div className="text-xs text-gray-500">
                  <div>Started: {conversation.startedAt}</div>
                  <div>Last updated: {conversation.lastUpdated}</div>
                  <div>Total messages: {conversation.totalMessages}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Conversation Thread */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-sm">
              {/* Conversation Header */}
              <div className="p-6 border-b">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900">{conversation.subject}</h1>
                    <p className="text-gray-600">{conversation.student} • {conversation.course}</p>
                  </div>
                  <div className="flex gap-2">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(conversation.status)}`}>
                      {conversation.status.charAt(0).toUpperCase() + conversation.status.slice(1)}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getPriorityColor(conversation.priority)}`}>
                      {conversation.priority.charAt(0).toUpperCase() + conversation.priority.slice(1)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div className="h-[500px] overflow-y-auto p-6">
                <div className="space-y-4">
                  {conversation.messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.sender === 'lecturer' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`max-w-2xl ${
                        message.sender === 'lecturer'
                          ? 'bg-blue-600 text-white rounded-lg rounded-br-sm'
                          : 'bg-gray-100 text-gray-900 rounded-lg rounded-bl-sm'
                      } px-4 py-3`}>
                        <div className={`text-xs mb-1 ${
                          message.sender === 'lecturer' ? 'text-blue-100' : 'text-gray-500'
                        }`}>
                          {message.senderName}
                        </div>
                        
                        <div className="text-sm whitespace-pre-line leading-relaxed">
                          {message.content}
                        </div>
                        
                        {message.attachments && message.attachments.length > 0 && (
                          <div className="mt-3 space-y-2">
                            {message.attachments.map((attachment, idx) => (
                              <div key={idx} className={`p-2 rounded ${
                                message.sender === 'lecturer' ? 'bg-blue-700' : 'bg-gray-200'
                              }`}>
                                <a
                                  href={attachment.url}
                                  className={`text-xs flex items-center gap-2 ${
                                    message.sender === 'lecturer' ? 'text-blue-100' : 'text-gray-700'
                                  }`}
                                >
                                  📎 {attachment.name}
                                </a>
                              </div>
                            ))}
                          </div>
                        )}
                        
                        <div className={`text-xs mt-2 ${
                          message.sender === 'lecturer' ? 'text-blue-100' : 'text-gray-500'
                        }`}>
                          {message.timestamp}
                          {!message.isRead && message.sender === 'student' && (
                            <span className="ml-2 text-orange-300">• New</span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>
              </div>

              {/* Reply Form */}
              {conversation.status !== 'archived' && (
                <div className="p-6 border-t">
                  <form onSubmit={handleSendMessage} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Reply to {conversation.student}
                      </label>
                      <textarea
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        rows={4}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Type your response..."
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
                        <button
                          type="button"
                          className="text-sm text-gray-600 hover:text-gray-900 flex items-center gap-1"
                        >
                          📝 Add Template
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
                          {isSubmitting ? 'Sending...' : 'Send Reply'}
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              )}

              {conversation.status === 'archived' && (
                <div className="p-6 border-t">
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center gap-2">
                      <span className="text-gray-600">📁</span>
                      <span className="font-medium text-gray-800">This conversation has been archived</span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">
                      To continue the conversation, change the status to "Active" in the sidebar.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}