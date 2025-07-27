// app/messages/archive/page.tsx
'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

interface ArchivedMessage {
  id: string
  subject: string
  content: string
  recipientType?: 'lecturer' | 'student'
  recipient?: {
    id: string
    name: string
    email: string
    avatar: string
  }
  sender?: {
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
  originalDate: string
  archivedAt: string
  senderRole: 'student' | 'lecturer'
  status: 'sent' | 'received' | 'draft'
  threadId?: string
  messageCount: number
  lastActivity: string
  tags: string[]
  archiveReason?: string
  size: number // in characters
  estimatedReadTime: number
  isStarred: boolean
  hasUnreadReplies: boolean
}

const mockArchivedMessages: ArchivedMessage[] = [
  {
    id: 'arch_1',
    subject: 'Final Project Proposal - Game Development',
    content: 'Dear Dr. Johnson,\n\nI am submitting my final project proposal for CS101. I would like to develop a simple educational game that teaches programming concepts to beginners.\n\nThe game will include:\n- Interactive coding challenges\n- Visual programming elements\n- Progressive difficulty levels\n- Score tracking and achievements\n\nThis project will demonstrate object-oriented programming, event handling, and user interface design principles we have learned throughout the semester.\n\nI estimate the project will take approximately 40 hours to complete and will be implemented using Python and Pygame.\n\nI look forward to your feedback and approval.\n\nBest regards,\nAlice Johnson',
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
      { name: 'project_proposal.pdf', size: '2.1 MB', type: 'pdf' },
      { name: 'wireframes.png', size: '856 KB', type: 'image' }
    ],
    originalDate: '2025-06-15 14:30',
    archivedAt: '2025-07-20 09:15',
    senderRole: 'student',
    status: 'sent',
    threadId: 'thread_final_proj',
    messageCount: 4,
    lastActivity: '2025-06-18 16:20',
    tags: ['final-project', 'proposal', 'game-development'],
    archiveReason: 'Project completed',
    size: 789,
    estimatedReadTime: 3,
    isStarred: true,
    hasUnreadReplies: false
  },
  {
    id: 'arch_2',
    subject: 'Study Group Session Notes - Midterm Preparation',
    content: 'Hi everyone,\n\nThank you for a productive study group session today. Here are the key points we covered:\n\n1. Recursion algorithms - practice problems 1-5\n2. Data structure comparisons - arrays vs linked lists\n3. Time complexity analysis - Big O notation examples\n4. Common debugging techniques\n\nAction items:\n- Carol: Prepare examples for next session\n- Bob: Research additional practice problems\n- Emma: Create summary notes for sharing\n\nNext session: Thursday 6 PM in Library Room 204\n\nLet me know if you have any questions!\n\nBest,\nAlice',
    recipientType: 'student',
    recipient: {
      id: 'study_group',
      name: 'CS101 Study Group',
      email: 'group@students.edu',
      avatar: '👥'
    },
    course: 'CS101',
    messageType: 'academic',
    priority: 'medium',
    attachments: [
      { name: 'session_notes.docx', size: '345 KB', type: 'document' }
    ],
    originalDate: '2025-06-10 19:30',
    archivedAt: '2025-07-15 11:00',
    senderRole: 'student',
    status: 'sent',
    threadId: 'thread_study_group',
    messageCount: 8,
    lastActivity: '2025-06-12 20:15',
    tags: ['study-group', 'midterm', 'notes'],
    archiveReason: 'Exam completed',
    size: 623,
    estimatedReadTime: 3,
    isStarred: false,
    hasUnreadReplies: false
  },
  {
    id: 'arch_3',
    subject: 'Request for Assignment Extension',
    content: 'Dear Professor Chen,\n\nI am writing to request a 48-hour extension for Assignment 4 due to unexpected family circumstances that required my immediate attention this weekend.\n\nI have completed approximately 70% of the assignment and can provide a progress update if needed. I understand this is not ideal timing, but the situation was unavoidable.\n\nI am committed to maintaining the quality of my work and would not request this extension unless absolutely necessary.\n\nThank you for your understanding.\n\nRespectfully,\nAlice Johnson',
    recipientType: 'lecturer',
    recipient: {
      id: 'lec2',
      name: 'Prof. Michael Chen',
      email: 'michael.chen@university.edu',
      avatar: '👨‍🏫'
    },
    course: 'CS201',
    messageType: 'administrative',
    priority: 'high',
    attachments: [],
    originalDate: '2025-06-08 22:45',
    archivedAt: '2025-07-10 14:30',
    senderRole: 'student',
    status: 'sent',
    threadId: 'thread_extension',
    messageCount: 3,
    lastActivity: '2025-06-09 08:20',
    tags: ['extension', 'assignment', 'personal'],
    archiveReason: 'Request resolved',
    size: 567,
    estimatedReadTime: 2,
    isStarred: false,
    hasUnreadReplies: false
  },
  {
    id: 'arch_4',
    subject: 'Thank You - Excellent CS101 Course',
    content: 'Dear Dr. Johnson,\n\nAs the CS101 course comes to an end, I wanted to express my sincere gratitude for an exceptional learning experience.\n\nYour teaching style, particularly the hands-on coding exercises and real-world examples, made complex programming concepts accessible and engaging. The office hours you provided were invaluable for clarifying difficult topics.\n\nKey highlights that made this course outstanding:\n- Interactive problem-solving sessions\n- Practical programming projects\n- Timely and constructive feedback\n- Encouraging learning environment\n- Excellent use of technology in teaching\n\nThis course has solidified my interest in computer science and provided a strong foundation for advanced courses.\n\nThank you for your dedication to student success.\n\nWith appreciation,\nAlice Johnson',
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
    originalDate: '2025-06-20 16:00',
    archivedAt: '2025-07-25 10:45',
    senderRole: 'student',
    status: 'sent',
    threadId: 'thread_appreciation',
    messageCount: 2,
    lastActivity: '2025-06-21 09:30',
    tags: ['appreciation', 'course-feedback', 'thank-you'],
    archiveReason: 'Semester ended',
    size: 892,
    estimatedReadTime: 4,
    isStarred: true,
    hasUnreadReplies: false
  },
  {
    id: 'arch_5',
    subject: 'Lab Partner Coordination - Project Timeline',
    content: 'Hi Bob,\n\nFollowing up on our discussion about the CS201 lab project, here is the proposed timeline:\n\nWeek 1: Research and design phase\n- Literature review (Alice)\n- Algorithm selection (Bob)\n- Architecture planning (Both)\n\nWeek 2: Implementation phase\n- Core functionality (Alice)\n- User interface (Bob)\n- Testing framework (Both)\n\nWeek 3: Testing and documentation\n- Unit testing (Alice)\n- Integration testing (Bob)\n- Documentation (Both)\n\nDeadline: Friday, June 15th at 11:59 PM\n\nLet me know if this timeline works for you or if you would like to suggest any modifications.\n\nBest,\nAlice',
    recipientType: 'student',
    recipient: {
      id: 'stu2',
      name: 'Bob Smith',
      email: 'bob.smith@student.edu',
      avatar: '👨‍🎓'
    },
    course: 'CS201',
    messageType: 'academic',
    priority: 'medium',
    attachments: [
      { name: 'project_timeline.pdf', size: '234 KB', type: 'pdf' }
    ],
    originalDate: '2025-05-28 11:20',
    archivedAt: '2025-07-18 13:15',
    senderRole: 'student',
    status: 'sent',
    threadId: 'thread_lab_partner',
    messageCount: 12,
    lastActivity: '2025-06-16 14:00',
    tags: ['lab-project', 'collaboration', 'timeline'],
    archiveReason: 'Project completed',
    size: 745,
    estimatedReadTime: 3,
    isStarred: false,
    hasUnreadReplies: false
  },
  {
    id: 'arch_6',
    subject: 'Career Advice Request - Summer Internships',
    content: 'Dear Dr. Johnson,\n\nI hope this message finds you well. I am reaching out to seek your advice regarding summer internship opportunities in software development.\n\nAs I prepare for my junior year, I would value your insights on:\n\n1. Companies that offer meaningful internship experiences for CS students\n2. Skills I should focus on developing to be competitive\n3. The application timeline for summer 2026 positions\n4. Whether you would be willing to serve as a reference\n\nI have maintained a 3.8 GPA and have completed projects in Java, Python, and web development. I am particularly interested in roles that involve problem-solving and working with data.\n\nI would be grateful for any guidance you can provide or if you could recommend someone else who might offer career insights.\n\nThank you for your time and mentorship.\n\nBest regards,\nAlice Johnson',
    recipientType: 'lecturer',
    recipient: {
      id: 'lec1',
      name: 'Dr. Sarah Johnson',
      email: 'sarah.johnson@university.edu',
      avatar: '👩‍🏫'
    },
    course: 'CS101',
    messageType: 'general',
    priority: 'medium',
    attachments: [
      { name: 'resume_draft.pdf', size: '187 KB', type: 'pdf' }
    ],
    originalDate: '2025-05-15 14:45',
    archivedAt: '2025-07-22 16:00',
    senderRole: 'student',
    status: 'sent',
    threadId: 'thread_career_advice',
    messageCount: 5,
    lastActivity: '2025-05-18 10:30',
    tags: ['career-advice', 'internships', 'mentorship'],
    archiveReason: 'Advice received',
    size: 1024,
    estimatedReadTime: 4,
    isStarred: true,
    hasUnreadReplies: false
  }
]

export default function ArchivedMessagesPage() {
  const router = useRouter()
  const [archivedMessages, setArchivedMessages] = useState<ArchivedMessage[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')
  const [typeFilter, setTypeFilter] = useState('All')
  const [priorityFilter, setPriorityFilter] = useState('All')
  const [courseFilter, setCourseFilter] = useState('All')
  const [starredFilter, setStarredFilter] = useState('All')
  const [sortBy, setSortBy] = useState('Archive Date')
  const [selectedMessages, setSelectedMessages] = useState<string[]>([])
  const [selectedMessage, setSelectedMessage] = useState<ArchivedMessage | null>(null)
  const [showDetails, setShowDetails] = useState(false)

  useEffect(() => {
    // In real app, load from localStorage or API
    const savedArchive = localStorage.getItem('archivedMessages')
    if (savedArchive) {
      setArchivedMessages(JSON.parse(savedArchive))
    } else {
      setArchivedMessages(mockArchivedMessages)
      localStorage.setItem('archivedMessages', JSON.stringify(mockArchivedMessages))
    }
  }, [])

  const filteredMessages = archivedMessages
    .filter(message => {
      const matchesSearch = message.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           message.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           (message.recipient?.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
                           (message.sender?.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
                           message.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      const matchesStatus = statusFilter === 'All' || message.status === statusFilter.toLowerCase()
      const matchesType = typeFilter === 'All' || message.messageType === typeFilter.toLowerCase()
      const matchesPriority = priorityFilter === 'All' || message.priority === priorityFilter.toLowerCase()
      const matchesCourse = courseFilter === 'All' || message.course === courseFilter
      const matchesStarred = starredFilter === 'All' || 
                            (starredFilter === 'Starred' && message.isStarred) ||
                            (starredFilter === 'Unstarred' && !message.isStarred)
      
      return matchesSearch && matchesStatus && matchesType && matchesPriority && matchesCourse && matchesStarred
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'Archive Date': return new Date(b.archivedAt).getTime() - new Date(a.archivedAt).getTime()
        case 'Original Date': return new Date(b.originalDate).getTime() - new Date(a.originalDate).getTime()
        case 'Subject A-Z': return a.subject.localeCompare(b.subject)
        case 'Subject Z-A': return b.subject.localeCompare(a.subject)
        case 'Sender': return (a.recipient?.name || a.sender?.name || '').localeCompare(b.recipient?.name || b.sender?.name || '')
        case 'Size': return b.size - a.size
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
      case 'received': return 'bg-green-100 text-green-800'
      case 'draft': return 'bg-yellow-100 text-yellow-800'
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

  const handleRestoreMessages = (messageIds: string[]) => {
    const messagesToRestore = archivedMessages.filter(m => messageIds.includes(m.id))
    
    // Restore to appropriate inbox based on status
    messagesToRestore.forEach(message => {
      if (message.status === 'sent') {
        const sentMessages = JSON.parse(localStorage.getItem('sentMessages') || '[]')
        sentMessages.push(message)
        localStorage.setItem('sentMessages', JSON.stringify(sentMessages))
      } else if (message.status === 'draft') {
        const drafts = JSON.parse(localStorage.getItem('messageDrafts') || '[]')
        drafts.push(message)
        localStorage.setItem('messageDrafts', JSON.stringify(drafts))
      }
      // For received messages, would restore to inbox
    })
    
    // Remove from archive
    const updatedArchive = archivedMessages.filter(m => !messageIds.includes(m.id))
    setArchivedMessages(updatedArchive)
    localStorage.setItem('archivedMessages', JSON.stringify(updatedArchive))
    setSelectedMessages([])
    
    alert(`${messageIds.length} message(s) restored successfully!`)
  }

  const handleDeletePermanently = (messageIds: string[]) => {
    if (window.confirm(`Are you sure you want to permanently delete ${messageIds.length} message(s)? This action cannot be undone.`)) {
      const updatedArchive = archivedMessages.filter(m => !messageIds.includes(m.id))
      setArchivedMessages(updatedArchive)
      localStorage.setItem('archivedMessages', JSON.stringify(updatedArchive))
      setSelectedMessages([])
      alert(`${messageIds.length} message(s) permanently deleted.`)
    }
  }

  const handleToggleStar = (messageId: string) => {
    const updatedMessages = archivedMessages.map(m => 
      m.id === messageId ? { ...m, isStarred: !m.isStarred } : m
    )
    setArchivedMessages(updatedMessages)
    localStorage.setItem('archivedMessages', JSON.stringify(updatedMessages))
  }

  const getUniqueValues = (key: keyof ArchivedMessage) => {
    const values = archivedMessages.map(m => m[key]).filter(Boolean)
    return [...new Set(values)].sort()
  }

  const getArchiveStats = () => {
    const totalSize = archivedMessages.reduce((sum, m) => sum + m.size, 0)
    const totalReadTime = archivedMessages.reduce((sum, m) => sum + m.estimatedReadTime, 0)
    const oldestMessage = archivedMessages.reduce((oldest, m) => 
      new Date(m.originalDate) < new Date(oldest.originalDate) ? m : oldest
    , archivedMessages[0])
    
    return { totalSize, totalReadTime, oldestMessage }
  }

  const stats = archivedMessages.length > 0 ? getArchiveStats() : null

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <Link href="/messages" className="text-blue-600 hover:text-blue-800">
              ← Back to Messages
            </Link>
            <h1 className="text-3xl font-bold text-gray-900">Archived Messages</h1>
          </div>
          <p className="text-gray-600">View and manage your archived conversations</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="text-2xl font-bold text-blue-600">{archivedMessages.length}</div>
            <div className="text-sm text-gray-600">Total Archived</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="text-2xl font-bold text-yellow-600">
              {archivedMessages.filter(m => m.isStarred).length}
            </div>
            <div className="text-sm text-gray-600">Starred</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="text-2xl font-bold text-green-600">
              {archivedMessages.filter(m => m.attachments.length > 0).length}
            </div>
            <div className="text-sm text-gray-600">With Attachments</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="text-2xl font-bold text-purple-600">
              {archivedMessages.reduce((sum, m) => sum + m.messageCount, 0)}
            </div>
            <div className="text-sm text-gray-600">Total Messages</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="text-2xl font-bold text-orange-600">
              {stats ? Math.round(stats.totalSize / 1000) : 0}K
            </div>
            <div className="text-sm text-gray-600">Total Characters</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="text-2xl font-bold text-red-600">
              {stats ? stats.totalReadTime : 0}
            </div>
            <div className="text-sm text-gray-600">Total Read Time (min)</div>
          </div>
        </div>

        {/* Filters and Controls */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="flex flex-col sm:flex-row gap-4 flex-1">
              <input
                type="text"
                placeholder="Search archived messages, contacts, content..."
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
                <option value="Received">Received</option>
                <option value="Draft">Draft</option>
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
                value={starredFilter}
                onChange={(e) => setStarredFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="All">All Messages</option>
                <option value="Starred">Starred Only</option>
                <option value="Unstarred">Unstarred Only</option>
              </select>

              <select
                value={courseFilter}
                onChange={(e) => setCourseFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="All">All Courses</option>
                {getUniqueValues('course').map(course => (
                  <option key={course} value={course}>{course}</option>
                ))}
              </select>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="Archive Date">Archive Date</option>
                <option value="Original Date">Original Date</option>
                <option value="Subject A-Z">Subject A-Z</option>
                <option value="Subject Z-A">Subject Z-A</option>
                <option value="Sender">Sender</option>
                <option value="Size">Size</option>
                <option value="Priority">Priority</option>
              </select>
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
                  onClick={() => handleRestoreMessages(selectedMessages)}
                  className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 text-sm"
                >
                  ↩️ Restore Selected
                </button>
                <button
                  onClick={() => handleDeletePermanently(selectedMessages)}
                  className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 text-sm"
                >
                  🗑️ Delete Permanently
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
          <Link href="/messages/sent" className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow group">
            <div className="text-center">
              <div className="text-2xl mb-2 group-hover:scale-110 transition-transform">📤</div>
              <div className="font-medium text-gray-900">Sent Messages</div>
              <div className="text-sm text-gray-600">View sent items</div>
            </div>
          </Link>
          
          <Link href="/messages/drafts" className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow group">
            <div className="text-center">
              <div className="text-2xl mb-2 group-hover:scale-110 transition-transform">📝</div>
              <div className="font-medium text-gray-900">Draft Messages</div>
              <div className="text-sm text-gray-600">Continue editing</div>
            </div>
          </Link>
          
          <button
            onClick={() => {
              if (window.confirm('Are you sure you want to clear all archived messages? This action cannot be undone.')) {
                setArchivedMessages([])
                localStorage.removeItem('archivedMessages')
                alert('Archive cleared successfully!')
              }
            }}
            className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow group"
          >
            <div className="text-center">
              <div className="text-2xl mb-2 group-hover:scale-110 transition-transform">🧹</div>
              <div className="font-medium text-gray-900">Clear Archive</div>
              <div className="text-sm text-gray-600">Remove all messages</div>
            </div>
          </button>
          
          <button
            onClick={() => {
              const data = JSON.stringify(archivedMessages, null, 2)
              const blob = new Blob([data], { type: 'application/json' })
              const url = URL.createObjectURL(blob)
              const a = document.createElement('a')
              a.href = url
              a.download = 'archived_messages.json'
              a.click()
            }}
            className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow group"
          >
            <div className="text-center">
              <div className="text-2xl mb-2 group-hover:scale-110 transition-transform">💾</div>
              <div className="font-medium text-gray-900">Export Archive</div>
              <div className="text-sm text-gray-600">Backup as JSON</div>
            </div>
          </button>
        </div>

        {/* Archive Summary */}
        {stats && (
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h3 className="text-lg font-semibold mb-4">Archive Summary</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-blue-50 rounded-lg">
                <div className="font-medium text-blue-900">Storage Used</div>
                <div className="text-2xl font-bold text-blue-600">{Math.round(stats.totalSize / 1000)}K</div>
                <div className="text-sm text-blue-700">characters stored</div>
              </div>
              <div className="p-4 bg-green-50 rounded-lg">
                <div className="font-medium text-green-900">Total Content</div>
                <div className="text-2xl font-bold text-green-600">{stats.totalReadTime}</div>
                <div className="text-sm text-green-700">minutes of reading</div>
              </div>
              <div className="p-4 bg-purple-50 rounded-lg">
                <div className="font-medium text-purple-900">Oldest Message</div>
                <div className="text-lg font-bold text-purple-600">
                  {stats.oldestMessage ? new Date(stats.oldestMessage.originalDate).toLocaleDateString() : 'N/A'}
                </div>
                <div className="text-sm text-purple-700">
                  {stats.oldestMessage ? stats.oldestMessage.subject.substring(0, 30) + '...' : ''}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Results Info */}
        <div className="mb-4">
          <div className="flex items-center justify-between">
            <p className="text-gray-600">
              Showing {filteredMessages.length} of {archivedMessages.length} archived messages
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
            <div className="text-4xl mb-4">📂</div>
            <div className="text-gray-500 mb-4">No archived messages found</div>
            <div className="text-sm text-gray-400 mb-6">
              {archivedMessages.length === 0 
                ? "You haven't archived any messages yet" 
                : "Try adjusting your search criteria"
              }
            </div>
            <Link
              href="/messages"
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
            >
              Go to Messages
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
                    
                    <button
                      onClick={() => handleToggleStar(message.id)}
                      className={`text-xl ${message.isStarred ? 'text-yellow-500' : 'text-gray-300'} hover:text-yellow-500`}
                    >
                      ⭐
                    </button>
                    
                    <span className="text-3xl">
                      {message.recipient?.avatar || message.sender?.avatar || '📧'}
                    </span>
                    
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">{message.subject}</h3>
                          <p className="text-sm text-gray-600">
                            {message.status === 'sent' ? 'To: ' : 'From: '}
                            {message.recipient?.name || message.sender?.name}
                            {message.course && <span className="ml-2">• {message.course}</span>}
                          </p>
                        </div>
                        <div className="flex items-center gap-2 ml-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(message.status)}`}>
                            {message.status}
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
                        <p className="line-clamp-2">
                          {message.content.substring(0, 150)}
                          {message.content.length > 150 && '...'}
                        </p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-6 gap-4 text-sm mb-3">
                        <div>
                          <span className="font-medium text-gray-700">Original:</span><br />
                          <span className="text-gray-600">{new Date(message.originalDate).toLocaleDateString()}</span>
                        </div>
                        <div>
                          <span className="font-medium text-gray-700">Archived:</span><br />
                          <span className="text-gray-600">{new Date(message.archivedAt).toLocaleDateString()}</span>
                        </div>
                        <div>
                          <span className="font-medium text-gray-700">Messages:</span><br />
                          <span className="text-gray-600">{message.messageCount}</span>
                        </div>
                        <div>
                          <span className="font-medium text-gray-700">Size:</span><br />
                          <span className="text-gray-600">{Math.round(message.size / 100) / 10}K</span>
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

                      {message.archiveReason && (
                        <div className="p-2 bg-blue-50 rounded text-sm mb-3">
                          <span className="font-medium text-blue-800">Archive reason: </span>
                          <span className="text-blue-700">{message.archiveReason}</span>
                        </div>
                      )}

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
                        onClick={() => handleRestoreMessages([message.id])}
                        className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors text-sm"
                      >
                        ↩️ Restore
                      </button>
                      <button
                        onClick={() => handleToggleStar(message.id)}
                        className={`px-4 py-2 rounded-lg transition-colors text-sm ${
                          message.isStarred 
                            ? 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200' 
                            : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        ⭐ {message.isStarred ? 'Unstar' : 'Star'}
                      </button>
                      <button
                        onClick={() => handleDeletePermanently([message.id])}
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
                <h2 className="text-2xl font-bold">Archived Message Details</h2>
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
                    <span className="font-medium text-gray-700">{selectedMessage.status === 'sent' ? 'To:' : 'From:'}</span>
                    <div className="text-gray-900">
                      {selectedMessage.recipient?.name || selectedMessage.sender?.name}
                    </div>
                    <div className="text-sm text-gray-600">
                      {selectedMessage.recipient?.email || selectedMessage.sender?.email}
                    </div>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Course:</span>
                    <div className="text-gray-900">{selectedMessage.course || 'None'}</div>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Original Date:</span>
                    <div className="text-gray-900">{new Date(selectedMessage.originalDate).toLocaleString()}</div>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Archived:</span>
                    <div className="text-gray-900">{new Date(selectedMessage.archivedAt).toLocaleString()}</div>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Status:</span>
                    <span className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedMessage.status)}`}>
                      {selectedMessage.status}
                    </span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Thread:</span>
                    <div className="text-gray-900">{selectedMessage.messageCount} messages</div>
                  </div>
                </div>

                {selectedMessage.archiveReason && (
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <span className="font-medium text-blue-800">Archive Reason: </span>
                    <span className="text-blue-700">{selectedMessage.archiveReason}</span>
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
                      handleRestoreMessages([selectedMessage.id])
                    }}
                    className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700"
                  >
                    ↩️ Restore Message
                  </button>
                  <button
                    onClick={() => handleToggleStar(selectedMessage.id)}
                    className={`px-6 py-2 rounded-lg ${
                      selectedMessage.isStarred 
                        ? 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200' 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    ⭐ {selectedMessage.isStarred ? 'Unstar' : 'Star'}
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