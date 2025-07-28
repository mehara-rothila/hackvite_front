// app/messages/sent/page.tsx
'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

interface SentMessage {
  id: string
  subject: string
  content: string
  recipientType: 'lecturer' | 'student'
  recipient: {
    id: string
    name: string
    email: string
    avatar: string
  }
  course?: string
  messageType: 'academic' | 'administrative' | 'general'
  priority: 'low' | 'medium' | 'high'
  attachments: {
    name: string
    size: string
    type: string
  }[]
  sentAt: string
  senderRole: 'student' | 'lecturer'
  status: 'sent' | 'delivered' | 'read' | 'replied'
  readAt?: string
  repliedAt?: string
  characterCount: number
  estimatedReadTime: number
  tags: string[]
  threadId?: string
  replyCount: number
  deliveryConfirmation: boolean
}

const mockSentMessages: SentMessage[] = [
  {
    id: '1',
    subject: 'Assignment 2 Submission',
    content: 'Dear Dr. Johnson,\n\nI have completed Assignment 2 and have submitted it through the course portal. The assignment covers the topics we discussed in class regarding control structures and basic algorithms.\n\nI found the recursive problems particularly challenging but rewarding. I implemented the solution using the approach you suggested during office hours.\n\nThank you for your guidance throughout this assignment.\n\nBest regards,\nAlice Johnson',
    recipientType: 'lecturer',
    recipient: {
      id: 'lec1',
      name: 'Dr. Sarah Johnson',
      email: 'sarah.johnson@university.edu',
      avatar: '👩‍🏫'
    },
    course: 'CS101',
    messageType: 'academic',
    priority: 'medium',
    attachments: [
      { name: 'assignment2_johnson.zip', size: '2.3 MB', type: 'archive' }
    ],
    sentAt: '2025-07-27 15:30',
    senderRole: 'student',
    status: 'read',
    readAt: '2025-07-27 16:45',
    characterCount: 534,
    estimatedReadTime: 2,
    tags: ['assignment', 'submission', 'cs101'],
    threadId: 'thread_1',
    replyCount: 1,
    deliveryConfirmation: true
  },
  {
    id: '2',
    subject: 'Thank you for the study group recommendation',
    content: 'Hi Carol,\n\nThank you so much for accepting my invitation to form a study group. I think this will be really beneficial for all of us as we prepare for the midterm exam.\n\nI have spoken with Bob and Emma, and they are also interested in joining. Would you be available to meet this Thursday at 6 PM in the library study room 204?\n\nWe can discuss our study schedule and divide up the topics to review.\n\nLooking forward to working together!\n\nBest,\nAlice',
    recipientType: 'student',
    recipient: {
      id: 'stu3',
      name: 'Carol Davis',
      email: 'carol.davis@student.edu',
      avatar: '👩‍🎓'
    },
    course: 'CS101',
    messageType: 'academic',
    priority: 'low',
    attachments: [],
    sentAt: '2025-07-26 14:20',
    senderRole: 'student',
    status: 'replied',
    readAt: '2025-07-26 15:10',
    repliedAt: '2025-07-26 16:30',
    characterCount: 567,
    estimatedReadTime: 2,
    tags: ['study-group', 'collaboration', 'midterm'],
    threadId: 'thread_2',
    replyCount: 2,
    deliveryConfirmation: true
  },
  {
    id: '3',
    subject: 'Office Hours Appointment Request',
    content: 'Dear Professor Chen,\n\nI hope this message finds you well. I would like to schedule an appointment during your office hours to discuss my progress in CS201, particularly with data structures and algorithm analysis.\n\nI am available any day this week except Wednesday. Would Tuesday at 11:00 AM or Friday at 2:00 PM work for you?\n\nI have specific questions about binary search trees and would appreciate some additional guidance on the upcoming project.\n\nThank you for your time and consideration.\n\nBest regards,\nAlice Johnson',
    recipientType: 'lecturer',
    recipient: {
      id: 'lec2',
      name: 'Prof. Michael Chen',
      email: 'michael.chen@university.edu',
      avatar: '👨‍🏫'
    },
    course: 'CS201',
    messageType: 'administrative',
    priority: 'medium',
    attachments: [],
    sentAt: '2025-07-25 10:15',
    senderRole: 'student',
    status: 'read',
    readAt: '2025-07-25 11:30',
    characterCount: 678,
    estimatedReadTime: 3,
    tags: ['office-hours', 'appointment', 'cs201'],
    threadId: 'thread_3',
    replyCount: 1,
    deliveryConfirmation: true
  },
  {
    id: '4',
    subject: 'Question about Final Project Requirements',
    content: 'Dear Dr. Johnson,\n\nI am working on selecting a topic for the final project and wanted to clarify a few requirements:\n\n1. Can we work in teams of 3, or is the maximum team size 2?\n2. Is it acceptable to use external libraries for GUI development?\n3. What is the expected length for the project documentation?\n\nI am considering developing a simple game application that demonstrates object-oriented programming principles we have learned in class.\n\nI look forward to your response.\n\nThank you,\nAlice Johnson',
    recipientType: 'lecturer',
    recipient: {
      id: 'lec1',
      name: 'Dr. Sarah Johnson',
      email: 'sarah.johnson@university.edu',
      avatar: '👩‍🏫'
    },
    course: 'CS101',
    messageType: 'academic',
    priority: 'high',
    attachments: [
      { name: 'project_proposal_draft.pdf', size: '456 KB', type: 'pdf' }
    ],
    sentAt: '2025-07-24 09:45',
    senderRole: 'student',
    status: 'delivered',
    characterCount: 612,
    estimatedReadTime: 3,
    tags: ['final-project', 'requirements', 'clarification'],
    threadId: 'thread_4',
    replyCount: 0,
    deliveryConfirmation: true
  },
  {
    id: '5',
    subject: 'Lab Report Feedback Request',
    content: 'Professor Chen,\n\nI have submitted Lab Report 3 and would appreciate any feedback you might have on my analysis methodology. This is my first time conducting this type of algorithm performance analysis, and I want to ensure I am on the right track.\n\nSpecifically, I am unsure about:\n- Whether my test case selection is comprehensive enough\n- If my complexity analysis methodology is correct\n- How to better present the performance comparison results\n\nI understand you are very busy, but any brief feedback would be greatly appreciated.\n\nThank you for your time.\n\nBest regards,\nAlice Johnson',
    recipientType: 'lecturer',
    recipient: {
      id: 'lec2',
      name: 'Prof. Michael Chen',
      email: 'michael.chen@university.edu',
      avatar: '👨‍🏫'
    },
    course: 'CS201',
    messageType: 'academic',
    priority: 'low',
    attachments: [],
    sentAt: '2025-07-23 16:20',
    senderRole: 'student',
    status: 'read',
    readAt: '2025-07-24 08:15',
    characterCount: 724,
    estimatedReadTime: 3,
    tags: ['lab-report', 'feedback', 'guidance'],
    threadId: 'thread_5',
    replyCount: 1,
    deliveryConfirmation: true
  },
  {
    id: '6',
    subject: 'Course Evaluation Feedback',
    content: 'Dear Dr. Johnson,\n\nAs we approach the end of the semester, I wanted to share some feedback about CS101. Overall, I have really enjoyed the course and feel that I have learned a tremendous amount.\n\nWhat I particularly appreciated:\n- The hands-on coding exercises during lectures\n- The step-by-step breakdown of complex concepts\n- Your availability during office hours\n- The real-world programming examples\n\nSuggestions for future semesters:\n- Perhaps more group programming exercises\n- Additional practice problems with solutions\n- Maybe some guest speakers from the industry\n\nThank you for making this such a positive learning experience!\n\nBest regards,\nAlice Johnson',
    recipientType: 'lecturer',
    recipient: {
      id: 'lec1',
      name: 'Dr. Sarah Johnson',
      email: 'sarah.johnson@university.edu',
      avatar: '👩‍🏫'
    },
    course: 'CS101',
    messageType: 'general',
    priority: 'low',
    attachments: [],
    sentAt: '2025-07-22 13:55',
    senderRole: 'student',
    status: 'read',
    readAt: '2025-07-22 15:20',
    characterCount: 893,
    estimatedReadTime: 4,
    tags: ['feedback', 'course-evaluation', 'appreciation'],
    threadId: 'thread_6',
    replyCount: 1,
    deliveryConfirmation: true
  }
]

export default function SentMessagesPage() {
  const router = useRouter()
  const [sentMessages, setSentMessages] = useState<SentMessage[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')
  const [typeFilter, setTypeFilter] = useState('All')
  const [priorityFilter, setPriorityFilter] = useState('All')
  const [courseFilter, setCourseFilter] = useState('All')
  const [sortBy, setSortBy] = useState('Most Recent')
  const [selectedMessages, setSelectedMessages] = useState<string[]>([])
  const [selectedMessage, setSelectedMessage] = useState<SentMessage | null>(null)
  const [showDetails, setShowDetails] = useState(false)

  useEffect(() => {
    // In real app, load from localStorage or API
    const savedSent = localStorage.getItem('sentMessages')
    if (savedSent) {
      setSentMessages(JSON.parse(savedSent))
    } else {
      setSentMessages(mockSentMessages)
      localStorage.setItem('sentMessages', JSON.stringify(mockSentMessages))
    }
  }, [])

  const filteredMessages = sentMessages
    .filter(message => {
      const matchesSearch = message.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           message.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           message.recipient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           message.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      const matchesStatus = statusFilter === 'All' || message.status === statusFilter.toLowerCase()
      const matchesType = typeFilter === 'All' || message.messageType === typeFilter.toLowerCase()
      const matchesPriority = priorityFilter === 'All' || message.priority === priorityFilter.toLowerCase()
      const matchesCourse = courseFilter === 'All' || message.course === courseFilter
      
      return matchesSearch && matchesStatus && matchesType && matchesPriority && matchesCourse
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'Most Recent': return new Date(b.sentAt).getTime() - new Date(a.sentAt).getTime()
        case 'Oldest First': return new Date(a.sentAt).getTime() - new Date(b.sentAt).getTime()
        case 'Subject A-Z': return a.subject.localeCompare(b.subject)
        case 'Subject Z-A': return b.subject.localeCompare(a.subject)
        case 'Recipient': return a.recipient.name.localeCompare(b.recipient.name)
        case 'Status': return a.status.localeCompare(b.status)
        case 'Priority': return getPriorityValue(b.priority) - getPriorityValue(a.priority)
        default: return 0
      }
    })

  const getPriorityValue = (priority: string) => {
    switch (priority) {
      case 'high': return 3
      case 'medium': return 2
      case 'low': return 1
      default: return 0
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'sent': return 'bg-blue-100 text-blue-800'
      case 'delivered': return 'bg-green-100 text-green-800'
      case 'read': return 'bg-purple-100 text-purple-800'
      case 'replied': return 'bg-orange-100 text-orange-800'
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

  const getMessageTypeColor = (type: string) => {
    switch (type) {
      case 'academic': return 'bg-blue-100 text-blue-800'
      case 'administrative': return 'bg-purple-100 text-purple-800'
      case 'general': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'sent': return '📤'
      case 'delivered': return '✅'
      case 'read': return '👁️'
      case 'replied': return '↩️'
      default: return '📧'
    }
  }

  const handleSelectMessage = (messageId: string) => {
    setSelectedMessages(prev => 
      prev.includes(messageId) 
        ? prev.filter(id => id !== messageId)
        : [...prev, messageId]
    )
  }

  const handleSelectAll = () => {
    setSelectedMessages(
      selectedMessages.length === filteredMessages.length 
        ? [] 
        : filteredMessages.map(m => m.id)
    )
  }

  const handleArchiveMessages = (messageIds: string[]) => {
    // In real app, move to archive
    const archivedMessages = sentMessages.filter(m => messageIds.includes(m.id))
    const existingArchive = JSON.parse(localStorage.getItem('archivedMessages') || '[]')
    localStorage.setItem('archivedMessages', JSON.stringify([...existingArchive, ...archivedMessages]))
    
    const updatedMessages = sentMessages.filter(m => !messageIds.includes(m.id))
    setSentMessages(updatedMessages)
    localStorage.setItem('sentMessages', JSON.stringify(updatedMessages))
    setSelectedMessages([])
    
    alert(`${messageIds.length} message(s) archived successfully!`)
  }

  const handleDeleteMessages = (messageIds: string[]) => {
    const updatedMessages = sentMessages.filter(m => !messageIds.includes(m.id))
    setSentMessages(updatedMessages)
    localStorage.setItem('sentMessages', JSON.stringify(updatedMessages))
    setSelectedMessages([])
  }

  const handleReplyToMessage = (message: SentMessage) => {
    const params = new URLSearchParams({
      recipient: message.recipient.id,
      type: message.recipientType,
      course: message.course || '',
      subject: `Re: ${message.subject}`,
      replyTo: message.id
    })
    router.push(`/messages/new?${params.toString()}`)
  }

  const getUniqueValues = (key: keyof SentMessage) => {
    const values = sentMessages.map(m => m[key]).filter(Boolean)
    return [...new Set(values)].sort()
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <Link href="/messages" className="text-blue-600 hover:text-blue-800">
              ← Back to Messages
            </Link>
            <h1 className="text-3xl font-bold text-gray-900">Sent Messages</h1>
          </div>
          <p className="text-gray-600">View and manage your sent messages</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="text-2xl font-bold text-blue-600">{sentMessages.length}</div>
            <div className="text-sm text-gray-600">Total Sent</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="text-2xl font-bold text-purple-600">
              {sentMessages.filter(m => m.status === 'read').length}
            </div>
            <div className="text-sm text-gray-600">Read</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="text-2xl font-bold text-orange-600">
              {sentMessages.filter(m => m.status === 'replied').length}
            </div>
            <div className="text-sm text-gray-600">Replied</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="text-2xl font-bold text-green-600">
              {sentMessages.filter(m => m.attachments.length > 0).length}
            </div>
            <div className="text-sm text-gray-600">With Attachments</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="text-2xl font-bold text-red-600">
              {sentMessages.filter(m => m.priority === 'high').length}
            </div>
            <div className="text-sm text-gray-600">High Priority</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="text-2xl font-bold text-cyan-600">
              {sentMessages.reduce((sum, m) => sum + m.replyCount, 0)}
            </div>
            <div className="text-sm text-gray-600">Total Replies</div>
          </div>
        </div>

        {/* Filters and Controls */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="flex flex-col sm:flex-row gap-4 flex-1">
              <input
                type="text"
                placeholder="Search sent messages, recipients, content..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 flex-1"
              />
              
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="All">All Status</option>
                <option value="Sent">Sent</option>
                <option value="Delivered">Delivered</option>
                <option value="Read">Read</option>
                <option value="Replied">Replied</option>
              </select>

              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="All">All Types</option>
                <option value="Academic">Academic</option>
                <option value="Administrative">Administrative</option>
                <option value="General">General</option>
              </select>

              <select
                value={priorityFilter}
                onChange={(e) => setPriorityFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="All">All Priorities</option>
                <option value="High">High Priority</option>
                <option value="Medium">Medium Priority</option>
                <option value="Low">Low Priority</option>
              </select>

              <select
                value={courseFilter}
                onChange={(e) => setCourseFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="All">All Courses</option>
                {(getUniqueValues('course') as string[]).map(course => (
                  <option key={course} value={course}>{course}</option>
                ))}
              </select>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="Most Recent">Most Recent</option>
                <option value="Oldest First">Oldest First</option>
                <option value="Subject A-Z">Subject A-Z</option>
                <option value="Subject Z-A">Subject Z-A</option>
                <option value="Recipient">Recipient</option>
                <option value="Status">Status</option>
                <option value="Priority">Priority</option>
              </select>
            </div>

            <div className="flex gap-2">
              <Link
                href="/messages/new"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                ✏️ New Message
              </Link>
            </div>
          </div>
        </div>

        {/* Bulk Actions */}
        {selectedMessages.length > 0 && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <div className="flex items-center justify-between">
              <span className="text-blue-800">
                {selectedMessages.length} message(s) selected
              </span>
              <div className="flex gap-2">
                <button
                  onClick={() => handleArchiveMessages(selectedMessages)}
                  className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 text-sm"
                >
                  📂 Archive Selected
                </button>
                <button
                  onClick={() => handleDeleteMessages(selectedMessages)}
                  className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 text-sm"
                >
                  🗑️ Delete Selected
                </button>
                <button
                  onClick={() => setSelectedMessages([])}
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 text-sm"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Link href="/messages/new" className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow group">
            <div className="text-center">
              <div className="text-2xl mb-2 group-hover:scale-110 transition-transform">✏️</div>
              <div className="font-medium text-gray-900">New Message</div>
              <div className="text-sm text-gray-600">Compose message</div>
            </div>
          </Link>
          
          <Link href="/messages/drafts" className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow group">
            <div className="text-center">
              <div className="text-2xl mb-2 group-hover:scale-110 transition-transform">📝</div>
              <div className="font-medium text-gray-900">Draft Messages</div>
              <div className="text-sm text-gray-600">Continue editing</div>
            </div>
          </Link>
          
          <Link href="/messages/archive" className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow group">
            <div className="text-center">
              <div className="text-2xl mb-2 group-hover:scale-110 transition-transform">📂</div>
              <div className="font-medium text-gray-900">Archived Messages</div>
              <div className="text-sm text-gray-600">View archive</div>
            </div>
          </Link>
          
          <button
            onClick={() => {
              const data = JSON.stringify(sentMessages, null, 2)
              const blob = new Blob([data], { type: 'application/json' })
              const url = URL.createObjectURL(blob)
              const a = document.createElement('a')
              a.href = url
              a.download = 'sent_messages.json'
              a.click()
            }}
            className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow group"
          >
            <div className="text-center">
              <div className="text-2xl mb-2 group-hover:scale-110 transition-transform">💾</div>
              <div className="font-medium text-gray-900">Export Messages</div>
              <div className="text-sm text-gray-600">Backup as JSON</div>
            </div>
          </button>
        </div>

        {/* Results Info */}
        <div className="mb-4">
          <div className="flex items-center justify-between">
            <p className="text-gray-600">
              Showing {filteredMessages.length} of {sentMessages.length} sent messages
            </p>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={selectedMessages.length === filteredMessages.length && filteredMessages.length > 0}
                onChange={handleSelectAll}
                className="rounded"
              />
              <span className="text-sm text-gray-600">Select all</span>
            </div>
          </div>
        </div>

        {/* Messages List */}
        {filteredMessages.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <div className="text-4xl mb-4">📤</div>
            <div className="text-gray-500 mb-4">No sent messages found</div>
            <div className="text-sm text-gray-400 mb-6">
              {sentMessages.length === 0 
                ? "You haven't sent any messages yet" 
                : "Try adjusting your search criteria"
              }
            </div>
            <Link
              href="/messages/new"
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
            >
              Send Your First Message
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredMessages.map((message) => (
              <div key={message.id} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <div className="p-6">
                  <div className="flex items-start gap-4">
                    <input
                      type="checkbox"
                      checked={selectedMessages.includes(message.id)}
                      onChange={() => handleSelectMessage(message.id)}
                      className="mt-1 rounded"
                    />
                    
                    <span className="text-3xl">{message.recipient.avatar}</span>
                    
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">{message.subject}</h3>
                          <p className="text-sm text-gray-600">
                            To: {message.recipient.name} ({message.recipient.email})
                            {message.course && <span className="ml-2">• {message.course}</span>}
                          </p>
                        </div>
                        <div className="flex items-center gap-2 ml-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(message.status)}`}>
                            {getStatusIcon(message.status)} {message.status}
                          </span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(message.priority)}`}>
                            {message.priority}
                          </span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getMessageTypeColor(message.messageType)}`}>
                            {message.messageType}
                          </span>
                        </div>
                      </div>
                      
                      <div className="text-gray-700 mb-3">
                        <p className="line-clamp-3">
                          {message.content.substring(0, 200)}
                          {message.content.length > 200 && '...'}
                        </p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-6 gap-4 text-sm mb-3">
                        <div>
                          <span className="font-medium text-gray-700">Sent:</span><br />
                          <span className="text-gray-600">{new Date(message.sentAt).toLocaleDateString()}</span>
                        </div>
                        <div>
                          <span className="font-medium text-gray-700">Read:</span><br />
                          <span className="text-gray-600">
                            {message.readAt ? new Date(message.readAt).toLocaleDateString() : 'Not read'}
                          </span>
                        </div>
                        <div>
                          <span className="font-medium text-gray-700">Replies:</span><br />
                          <span className="text-gray-600">{message.replyCount}</span>
                        </div>
                        <div>
                          <span className="font-medium text-gray-700">Length:</span><br />
                          <span className="text-gray-600">{message.characterCount} chars</span>
                        </div>
                        <div>
                          <span className="font-medium text-gray-700">Read Time:</span><br />
                          <span className="text-gray-600">{message.estimatedReadTime} min</span>
                        </div>
                        <div>
                          <span className="font-medium text-gray-700">Attachments:</span><br />
                          <span className="text-gray-600">{message.attachments.length}</span>
                        </div>
                      </div>

                      {message.attachments.length > 0 && (
                        <div className="mb-3">
                          <div className="text-sm font-medium text-gray-700 mb-1">Attachments:</div>
                          <div className="flex flex-wrap gap-2">
                            {message.attachments.map((attachment, idx) => (
                              <span key={idx} className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
                                📎 {attachment.name} ({attachment.size})
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {message.tags.length > 0 && (
                        <div className="mb-3">
                          <div className="flex flex-wrap gap-1">
                            {message.tags.map(tag => (
                              <span key={tag} className="px-2 py-1 bg-blue-100 text-blue-600 rounded text-xs">
                                #{tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {message.repliedAt && (
                        <div className="p-2 bg-green-50 rounded text-sm">
                          <span className="font-medium text-green-800">✅ Replied: </span>
                          <span className="text-green-700">{new Date(message.repliedAt).toLocaleDateString()}</span>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex flex-col gap-2">
                      <button
                        onClick={() => {
                          setSelectedMessage(message)
                          setShowDetails(true)
                        }}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm"
                      >
                        👁️ View Details
                      </button>
                      <button
                        onClick={() => handleReplyToMessage(message)}
                        className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors text-sm"
                      >
                        ↩️ Reply
                      </button>
                      <button
                        onClick={() => handleArchiveMessages([message.id])}
                        className="bg-purple-50 text-purple-700 px-4 py-2 rounded-lg hover:bg-purple-100 transition-colors text-sm"
                      >
                        📂 Archive
                      </button>
                      <button
                        onClick={() => handleDeleteMessages([message.id])}
                        className="bg-red-50 text-red-700 px-4 py-2 rounded-lg hover:bg-red-100 transition-colors text-sm"
                      >
                        🗑️ Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Message Details Modal */}
        {showDetails && selectedMessage && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-2xl font-bold">Message Details</h2>
                <button
                  onClick={() => setShowDetails(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>
              
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
                  <div>
                    <span className="font-medium text-gray-700">To:</span>
                    <div className="text-gray-900">{selectedMessage.recipient.name}</div>
                    <div className="text-sm text-gray-600">{selectedMessage.recipient.email}</div>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Course:</span>
                    <div className="text-gray-900">{selectedMessage.course || 'None'}</div>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Sent:</span>
                    <div className="text-gray-900">{new Date(selectedMessage.sentAt).toLocaleString()}</div>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Status:</span>
                    <span className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedMessage.status)}`}>
                      {getStatusIcon(selectedMessage.status)} {selectedMessage.status}
                    </span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Priority:</span>
                    <span className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(selectedMessage.priority)}`}>
                      {selectedMessage.priority}
                    </span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Type:</span>
                    <span className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${getMessageTypeColor(selectedMessage.messageType)}`}>
                      {selectedMessage.messageType}
                    </span>
                  </div>
                </div>

                {selectedMessage.readAt && (
                  <div className="p-3 bg-green-50 rounded-lg">
                    <span className="font-medium text-green-800">📖 Read on: </span>
                    <span className="text-green-700">{new Date(selectedMessage.readAt).toLocaleString()}</span>
                  </div>
                )}

                {selectedMessage.repliedAt && (
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <span className="font-medium text-blue-800">↩️ Replied on: </span>
                    <span className="text-blue-700">{new Date(selectedMessage.repliedAt).toLocaleString()}</span>
                    <div className="text-sm text-blue-600 mt-1">
                      Total replies in thread: {selectedMessage.replyCount}
                    </div>
                  </div>
                )}

                <div>
                  <div className="font-medium text-gray-700 mb-2">Subject:</div>
                  <div className="text-lg font-semibold">{selectedMessage.subject}</div>
                </div>

                <div>
                  <div className="font-medium text-gray-700 mb-2">Message:</div>
                  <div className="p-4 border rounded-lg bg-white whitespace-pre-wrap">
                    {selectedMessage.content}
                  </div>
                </div>

                {selectedMessage.attachments.length > 0 && (
                  <div>
                    <div className="font-medium text-gray-700 mb-2">Attachments:</div>
                    <div className="space-y-2">
                      {selectedMessage.attachments.map((attachment, idx) => (
                        <div key={idx} className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                          <span>📎</span>
                          <span className="font-medium">{attachment.name}</span>
                          <span className="text-sm text-gray-600">({attachment.size})</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex gap-4 pt-4">
                  <button
                    onClick={() => {
                      setShowDetails(false)
                      handleReplyToMessage(selectedMessage)
                    }}
                    className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700"
                  >
                    ↩️ Reply
                  </button>
                  <button
                    onClick={() => {
                      setShowDetails(false)
                      handleArchiveMessages([selectedMessage.id])
                    }}
                    className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700"
                  >
                    📂 Archive
                  </button>
                  <button
                    onClick={() => setShowDetails(false)}
                    className="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-400"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
