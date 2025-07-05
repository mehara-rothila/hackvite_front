// app/student/conversations/[id]/page.tsx
'use client'

import { useEffect, useState, useRef, useMemo } from 'react'
import { useRouter, useParams } from 'next/navigation'
import Link from 'next/link'
import { AuthService } from '../../../../lib/auth'
import { StudentUser } from '../../../../types'

interface Message {
  id: string
  senderId: string
  senderName: string
  senderRole: 'student' | 'lecturer'
  content: string
  timestamp: string
  type: 'text' | 'file' | 'image'
  status: 'sent' | 'delivered' | 'read'
  attachments?: Attachment[]
  isEdited?: boolean
  replyTo?: string
}

interface Attachment {
  id: string
  name: string
  type: string
  size: number
  url: string
}

interface ConversationDetails {
  id: string
  lecturerName: string
  lecturerTitle: string
  subject: string
  courseCode: string
  courseName: string
  isOnline: boolean
  lastSeen: string
  avatar: string
  status: 'active' | 'archived' | 'resolved'
}

export default function ConversationDetail() {
  const [user, setUser] = useState<StudentUser | null>(null)
  const [loading, setLoading] = useState(true)
  const [conversation, setConversation] = useState<ConversationDetails | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)
  const [selectedFiles, setSelectedFiles] = useState<File[]>([])
  const [isDragging, setIsDragging] = useState(false)
  const [replyingTo, setReplyingTo] = useState<Message | null>(null)
  
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  
  const router = useRouter()
  const params = useParams()
  const conversationId = params.id as string

  // Move mock data to useMemo to prevent re-creation
  const mockConversation: ConversationDetails = useMemo(() => ({
    id: conversationId,
    lecturerName: 'Dr. Sarah Johnson',
    lecturerTitle: 'Dr.',
    subject: 'Assignment 3 Feedback Request',
    courseCode: 'CS401',
    courseName: 'Advanced Algorithms',
    isOnline: true,
    lastSeen: '2024-01-15T10:30:00Z',
    avatar: 'SJ',
    status: 'active'
  }), [conversationId])

  const mockMessages: Message[] = useMemo(() => [
    {
      id: 'msg-001',
      senderId: 'student-123',
      senderName: 'John Doe',
      senderRole: 'student',
      content: 'Hello Dr. Johnson, I hope you\'re doing well. I have a question about Assignment 3, specifically regarding the algorithm complexity analysis.',
      timestamp: '2024-01-15T08:30:00Z',
      type: 'text',
      status: 'read'
    },
    {
      id: 'msg-002',
      senderId: 'lecturer-456',
      senderName: 'Dr. Sarah Johnson',
      senderRole: 'lecturer',
      content: 'Hello John! I\'m doing well, thank you for asking. I\'d be happy to help you with the complexity analysis. What specific part are you struggling with?',
      timestamp: '2024-01-15T09:15:00Z',
      type: 'text',
      status: 'read'
    },
    {
      id: 'msg-003',
      senderId: 'student-123',
      senderName: 'John Doe',
      senderRole: 'student',
      content: 'I\'m having trouble understanding how to calculate the time complexity for the merge sort implementation. I understand the concept of divide and conquer, but I\'m not sure how to express it mathematically.',
      timestamp: '2024-01-15T09:45:00Z',
      type: 'text',
      status: 'read'
    },
    {
      id: 'msg-004',
      senderId: 'lecturer-456',
      senderName: 'Dr. Sarah Johnson',
      senderRole: 'lecturer',
      content: 'Great question! For merge sort, we use the master theorem. The recurrence relation is T(n) = 2T(n/2) + O(n). Let me attach a detailed explanation document that walks through the mathematical proof.',
      timestamp: '2024-01-15T10:00:00Z',
      type: 'text',
      status: 'read',
      attachments: [{
        id: 'att-001',
        name: 'merge_sort_complexity_analysis.pdf',
        type: 'application/pdf',
        size: 245760,
        url: '/files/merge_sort_complexity_analysis.pdf'
      }]
    },
    {
      id: 'msg-005',
      senderId: 'student-123',
      senderName: 'John Doe',
      senderRole: 'student',
      content: 'Thank you so much for the document! This is exactly what I needed. I have one more question - should I include the space complexity analysis as well?',
      timestamp: '2024-01-15T10:30:00Z',
      type: 'text',
      status: 'delivered'
    }
  ], [])

  useEffect(() => {
    const currentUser = AuthService.getCurrentUser()
    
    if (!currentUser || currentUser.role !== 'student') {
      router.push('/login')
      return
    }
    
    setUser(currentUser as StudentUser)
    setConversation(mockConversation)
    setMessages(mockMessages)
    setLoading(false)
  }, [router, conversationId, mockConversation, mockMessages])

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    // Auto-resize textarea
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px'
    }
  }, [newMessage])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleSendMessage = () => {
    if (!newMessage.trim() && selectedFiles.length === 0) return

    const newMsg: Message = {
      id: `msg-${Date.now()}`,
      senderId: user?.id || 'student-123',
      senderName: user?.name || 'John Doe',
      senderRole: 'student',
      content: newMessage.trim(),
      timestamp: new Date().toISOString(),
      type: selectedFiles.length > 0 ? 'file' : 'text',
      status: 'sent',
      attachments: selectedFiles.map((file, index) => ({
        id: `att-${Date.now()}-${index}`,
        name: file.name,
        type: file.type,
        size: file.size,
        url: URL.createObjectURL(file)
      })),
      replyTo: replyingTo?.id
    }

    setMessages(prev => [...prev, newMsg])
    setNewMessage('')
    setSelectedFiles([])
    setReplyingTo(null)

    // Simulate lecturer typing and response
    setTimeout(() => {
      setIsTyping(true)
      setTimeout(() => {
        setIsTyping(false)
        const lecturerResponse: Message = {
          id: `msg-${Date.now() + 1}`,
          senderId: 'lecturer-456',
          senderName: 'Dr. Sarah Johnson',
          senderRole: 'lecturer',
          content: 'Thank you for your question! I\'ll review this and get back to you shortly.',
          timestamp: new Date().toISOString(),
          type: 'text',
          status: 'sent'
        }
        setMessages(prev => [...prev, lecturerResponse])
      }, 2000)
    }, 1000)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    setSelectedFiles(prev => [...prev, ...files])
  }

  const removeFile = (index: number) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index))
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const files = Array.from(e.dataTransfer.files)
    setSelectedFiles(prev => [...prev, ...files])
  }

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp)
    const now = new Date()
    const isToday = date.toDateString() === now.toDateString()
    
    if (isToday) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    } else {
      return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const getFileIcon = (type: string) => {
    if (type.includes('pdf')) return '📄'
    if (type.includes('image')) return '🖼️'
    if (type.includes('video')) return '🎥'
    if (type.includes('audio')) return '🎵'
    if (type.includes('zip') || type.includes('rar')) return '📦'
    return '📎'
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!user || !conversation) return null

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link 
              href="/student/conversations" 
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </Link>
            
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-700 font-semibold text-sm">{conversation.avatar}</span>
                </div>
                {conversation.isOnline && (
                  <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                )}
              </div>
              
              <div>
                <h1 className="text-lg font-semibold text-gray-900">
                  {conversation.lecturerTitle} {conversation.lecturerName}
                </h1>
                <p className="text-sm text-gray-600">
                  {conversation.courseCode} • {conversation.isOnline ? 'Online' : `Last seen ${formatTimestamp(conversation.lastSeen)}`}
                </p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </button>
            <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            </button>
            <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Conversation Subject */}
      <div className="bg-blue-50 border-b border-blue-200 px-4 py-3">
        <div className="flex items-center space-x-2">
          <h2 className="text-sm font-medium text-blue-900">{conversation.subject}</h2>
          <span className="text-sm text-blue-700">• {conversation.courseName}</span>
        </div>
      </div>

      {/* Messages Area */}
      <div 
        className="flex-1 overflow-y-auto p-4 space-y-4"
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {isDragging && (
          <div className="fixed inset-0 bg-blue-500 bg-opacity-20 border-4 border-dashed border-blue-500 flex items-center justify-center z-50">
            <div className="text-center">
              <div className="text-6xl mb-4">📎</div>
              <p className="text-xl font-semibold text-blue-700">Drop files here to attach</p>
            </div>
          </div>
        )}

        {messages.map((message) => (
          <div key={message.id} className={`flex ${message.senderRole === 'student' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
              message.senderRole === 'student' 
                ? 'bg-blue-600 text-white' 
                : 'bg-white border border-gray-200 text-gray-900'
            }`}>
              {message.replyTo && (
                <div className="mb-2 p-2 bg-black bg-opacity-10 rounded text-sm opacity-75">
                  <p className="text-xs">Replying to:</p>
                  <p className="truncate">
                    {messages.find(m => m.id === message.replyTo)?.content || 'Message'}
                  </p>
                </div>
              )}
              
              <p className="text-sm leading-relaxed">{message.content}</p>
              
              {message.attachments && message.attachments.length > 0 && (
                <div className="mt-3 space-y-2">
                  {message.attachments.map((attachment) => (
                    <div key={attachment.id} className={`flex items-center p-2 rounded ${
                      message.senderRole === 'student' ? 'bg-blue-500' : 'bg-gray-100'
                    }`}>
                      <span className="text-lg mr-2">{getFileIcon(attachment.type)}</span>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{attachment.name}</p>
                        <p className="text-xs opacity-75">{formatFileSize(attachment.size)}</p>
                      </div>
                      <button className="ml-2 text-xs underline hover:no-underline">
                        Download
                      </button>
                    </div>
                  ))}
                </div>
              )}
              
              <div className="flex items-center justify-between mt-2">
                <p className="text-xs opacity-75">{formatTimestamp(message.timestamp)}</p>
                {message.senderRole === 'student' && (
                  <div className="flex items-center space-x-1">
                    {message.status === 'sent' && <span className="text-xs">✓</span>}
                    {message.status === 'delivered' && <span className="text-xs">✓✓</span>}
                    {message.status === 'read' && <span className="text-xs text-blue-200">✓✓</span>}
                  </div>
                )}
              </div>
              
              <div className="flex items-center space-x-2 mt-1">
                <button 
                  onClick={() => setReplyingTo(message)}
                  className="text-xs opacity-75 hover:opacity-100 underline"
                >
                  Reply
                </button>
                {message.senderRole === 'student' && (
                  <button className="text-xs opacity-75 hover:opacity-100 underline">
                    Edit
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-white border border-gray-200 text-gray-900 max-w-xs px-4 py-2 rounded-lg">
              <div className="flex items-center space-x-1">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
                <span className="text-sm text-gray-500 ml-2">{conversation.lecturerName} is typing...</span>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Reply Preview */}
      {replyingTo && (
        <div className="bg-gray-100 border-t border-gray-200 px-4 py-2">
          <div className="flex items-center justify-between">
            <div className="flex-1 min-w-0">
              <p className="text-xs text-gray-600">Replying to {replyingTo.senderName}:</p>
              <p className="text-sm text-gray-900 truncate">{replyingTo.content}</p>
            </div>
            <button 
              onClick={() => setReplyingTo(null)}
              className="ml-2 text-gray-500 hover:text-gray-700"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* File Preview */}
      {selectedFiles.length > 0 && (
        <div className="bg-gray-100 border-t border-gray-200 px-4 py-2">
          <div className="flex flex-wrap gap-2">
            {selectedFiles.map((file, index) => (
              <div key={index} className="flex items-center bg-white border border-gray-300 rounded-lg p-2">
                <span className="text-lg mr-2">{getFileIcon(file.type)}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{file.name}</p>
                  <p className="text-xs text-gray-500">{formatFileSize(file.size)}</p>
                </div>
                <button 
                  onClick={() => removeFile(index)}
                  className="ml-2 text-red-500 hover:text-red-700"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Message Input */}
      <div className="bg-white border-t border-gray-200 p-4">
        <div className="flex items-end space-x-3">
          <div className="flex space-x-2">
            <button 
              onClick={() => fileInputRef.current?.click()}
              className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
              </svg>
            </button>
            
            <button 
              onClick={() => setShowEmojiPicker(!showEmojiPicker)}
              className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
            >
              <span className="text-lg">😊</span>
            </button>
          </div>
          
          <div className="flex-1">
            <textarea
              ref={textareaRef}
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none max-h-32"
              rows={1}
            />
          </div>
          
          <button 
            onClick={handleSendMessage}
            disabled={!newMessage.trim() && selectedFiles.length === 0}
            className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </div>
        
        <input
          ref={fileInputRef}
          type="file"
          multiple
          className="hidden"
          onChange={handleFileSelect}
          accept="*/*"
        />
      </div>
    </div>
  )
}