// app/courses/[id]/messages/page.tsx
'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'

interface CourseMessage {
  id: string
  sender: {
    id: string
    name: string
    role: 'student' | 'lecturer'
    avatar: string
  }
  recipient: {
    id: string
    name: string
    role: 'student' | 'lecturer'
    avatar: string
  }
  subject: string
  content: string
  timestamp: string
  isRead: boolean
  priority: 'normal' | 'high' | 'urgent'
  category: 'general' | 'assignment' | 'exam' | 'lab' | 'project'
  attachments?: {
    name: string
    url: string
    type: string
    size: string
  }[]
  replies?: CourseMessage[]
}

interface CourseInfo {
  id: string
  code: string
  name: string
  lecturer: {
    id: string
    name: string
    avatar: string
  }
}

const mockCourseInfo: Record<string, CourseInfo> = {
  '1': {
    id: '1',
    code: 'CS101',
    name: 'Introduction to Programming',
    lecturer: {
      id: 'lec1',
      name: 'Dr. Sarah Johnson',
      avatar: '👩‍🏫'
    }
  },
  '2': {
    id: '2',
    code: 'CS201',
    name: 'Data Structures and Algorithms',
    lecturer: {
      id: 'lec2',
      name: 'Prof. Michael Chen',
      avatar: '👨‍🏫'
    }
  }
}

const mockCourseMessages: Record<string, CourseMessage[]> = {
  '1': [
    {
      id: '1',
      sender: {
        id: 'student1',
        name: 'Alice Johnson',
        role: 'student',
        avatar: '👩‍🎓'
      },
      recipient: {
        id: 'lec1',
        name: 'Dr. Sarah Johnson',
        role: 'lecturer',
        avatar: '👩‍🏫'
      },
      subject: 'Question about Assignment 3 grading criteria',
      content: 'Hi Professor Johnson, I wanted to clarify the grading criteria for Assignment 3. Specifically, how much weight is given to code efficiency versus correctness? Also, are there any style guidelines we should follow?',
      timestamp: '2025-07-28 14:30',
      isRead: false,
      priority: 'normal',
      category: 'assignment'
    },
    {
      id: '2',
      sender: {
        id: 'lec1',
        name: 'Dr. Sarah Johnson',
        role: 'lecturer',
        avatar: '👩‍🏫'
      },
      recipient: {
        id: 'class',
        name: 'CS101 Class',
        role: 'student',
        avatar: '👥'
      },
      subject: 'Important: Midterm Exam Schedule Change',
      content: 'Dear students, due to a scheduling conflict with the main auditorium, our midterm exam has been moved from Tuesday, August 5th to Thursday, August 7th at the same time (2:00 PM). The location remains Main Hall, Room 200. Please update your calendars accordingly.',
      timestamp: '2025-07-28 09:15',
      isRead: true,
      priority: 'urgent',
      category: 'exam'
    },
    {
      id: '3',
      sender: {
        id: 'student2',
        name: 'Bob Smith',
        role: 'student',
        avatar: '👨‍🎓'
      },
      recipient: {
        id: 'lec1',
        name: 'Dr. Sarah Johnson',
        role: 'lecturer',
        avatar: '👩‍🏫'
      },
      subject: 'Lab 5 submission issue',
      content: 'Professor, I\'m having trouble submitting Lab 5 through the course portal. The upload keeps failing. I have the completed assignment ready - is there an alternative way to submit it?',
      timestamp: '2025-07-27 16:45',
      isRead: true,
      priority: 'high',
      category: 'lab',
      attachments: [
        {
          name: 'lab5_error_screenshot.png',
          url: '#',
          type: 'image',
          size: '234 KB'
        }
      ]
    },
    {
      id: '4',
      sender: {
        id: 'student3',
        name: 'Carol Davis',
        role: 'student',
        avatar: '👩‍🎓'
      },
      recipient: {
        id: 'lec1',
        name: 'Dr. Sarah Johnson',
        role: 'lecturer',
        avatar: '👩‍🏫'
      },
      subject: 'Request for project topic approval',
      content: 'Hi Professor, I would like to propose implementing a simple text-based adventure game for my final project. It would demonstrate object-oriented programming concepts, file I/O, and user interaction. Would this be an appropriate project scope?',
      timestamp: '2025-07-26 11:20',
      isRead: true,
      priority: 'normal',
      category: 'project'
    },
    {
      id: '5',
      sender: {
        id: 'lec1',
        name: 'Dr. Sarah Johnson',
        role: 'lecturer',
        avatar: '👩‍🏫'
      },
      recipient: {
        id: 'class',
        name: 'CS101 Class',
        role: 'student',
        avatar: '👥'
      },
      subject: 'Office Hours Update - This Week Only',
      content: 'Hello everyone, due to a faculty meeting, my Wednesday office hours (2-4 PM) will be moved to 3-5 PM this week only. Monday office hours remain unchanged. Please plan accordingly if you need to visit.',
      timestamp: '2025-07-25 08:30',
      isRead: true,
      priority: 'normal',
      category: 'general'
    }
  ],
  '2': [
    {
      id: '1',
      sender: {
        id: 'student4',
        name: 'David Wilson',
        role: 'student',
        avatar: '👨‍🎓'
      },
      recipient: {
        id: 'lec2',
        name: 'Prof. Michael Chen',
        role: 'lecturer',
        avatar: '👨‍🏫'
      },
      subject: 'Binary tree implementation question',
      content: 'Professor Chen, I\'m working on the binary search tree assignment and having trouble with the deletion method when dealing with nodes that have two children. Could you provide some guidance on the algorithm approach?',
      timestamp: '2025-07-27 19:20',
      isRead: false,
      priority: 'normal',
      category: 'assignment'
    },
    {
      id: '2',
      sender: {
        id: 'lec2',
        name: 'Prof. Michael Chen',
        role: 'lecturer',
        avatar: '👨‍🏫'
      },
      recipient: {
        id: 'class',
        name: 'CS201 Class',
        role: 'student',
        avatar: '👥'
      },
      subject: 'Project proposals deadline reminder',
      content: 'This is a friendly reminder that project proposals are due this Tuesday, August 6th by 11:59 PM. Please submit a 2-page document outlining your chosen algorithm, implementation plan, and expected challenges.',
      timestamp: '2025-07-26 14:00',
      isRead: true,
      priority: 'high',
      category: 'project'
    }
  ]
}

export default function CourseMessagesPage() {
  const params = useParams()
  const courseId = params.id as string
  
  const [course, setCourse] = useState<CourseInfo | null>(null)
  const [messages, setMessages] = useState<CourseMessage[]>([])
  const [showCompose, setShowCompose] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [priorityFilter, setPriorityFilter] = useState('all')
  const [showOnlyUnread, setShowOnlyUnread] = useState(false)

  const [newMessage, setNewMessage] = useState({
    recipient: 'lecturer',
    subject: '',
    content: '',
    priority: 'normal' as const,
    category: 'general' as const
  })

  useEffect(() => {
    const courseInfo = mockCourseInfo[courseId]
    const courseMessages = mockCourseMessages[courseId] || []
    setCourse(courseInfo || null)
    setMessages(courseMessages)
  }, [courseId])

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    
    const message: CourseMessage = {
      id: Date.now().toString(),
      sender: {
        id: 'current-user',
        name: 'You',
        role: 'student',
        avatar: '👤'
      },
      recipient: newMessage.recipient === 'lecturer' 
        ? { ...(course?.lecturer || { id: '', name: '', avatar: '' }), role: 'lecturer' as const }
        : {
            id: 'class',
            name: `${course?.code} Class`,
            role: 'student' as const,
            avatar: '👥'
          },
      subject: newMessage.subject,
      content: newMessage.content,
      timestamp: new Date().toLocaleString(),
      isRead: true,
      priority: newMessage.priority,
      category: newMessage.category
    }

    setMessages([message, ...messages])
    setNewMessage({
      recipient: 'lecturer',
      subject: '',
      content: '',
      priority: 'normal',
      category: 'general'
    })
    setShowCompose(false)
  }

  const handleMarkAsRead = (messageId: string) => {
    setMessages(messages.map(msg => 
      msg.id === messageId ? { ...msg, isRead: true } : msg
    ))
  }

  const filteredMessages = messages.filter(message => {
    const matchesSearch = message.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         message.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         message.sender.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = categoryFilter === 'all' || message.category === categoryFilter
    const matchesPriority = priorityFilter === 'all' || message.priority === priorityFilter
    const matchesRead = !showOnlyUnread || !message.isRead
    
    return matchesSearch && matchesCategory && matchesPriority && matchesRead
  })

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'bg-red-100 text-red-800'
      case 'high': return 'bg-orange-100 text-orange-800'
      case 'normal': return 'bg-blue-100 text-blue-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'assignment': return 'bg-green-100 text-green-800'
      case 'exam': return 'bg-purple-100 text-purple-800'
      case 'lab': return 'bg-yellow-100 text-yellow-800'
      case 'project': return 'bg-indigo-100 text-indigo-800'
      case 'general': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getTimeAgo = (timestamp: string) => {
    const now = new Date()
    const time = new Date(timestamp)
    const diff = now.getTime() - time.getTime()
    const hours = Math.floor(diff / (1000 * 60 * 60))
    const days = Math.floor(hours / 24)

    if (days > 0) return `${days} day${days > 1 ? 's' : ''} ago`
    if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} ago`
    return 'Just now'
  }

  if (!course) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Course Not Found</h2>
            <p className="text-gray-600 mb-6">The course you&apos;re looking for doesn&apos;t exist or you don&apos;t have permission to view it.</p>
            <Link href="/courses" className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
              Back to Courses
            </Link>
          </div>
        </div>
      </div>
    )
  }

  const unreadCount = messages.filter(m => !m.isRead).length

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumb */}
        <div className="mb-6">
          <nav className="text-sm text-gray-500">
            <Link href="/courses" className="hover:text-blue-600">Courses</Link>
            <span className="mx-2">/</span>
            <Link href={`/courses/${course.id}`} className="hover:text-blue-600">{course.code}</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-900">Messages</span>
          </nav>
        </div>

        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{course.code} Messages</h1>
              <p className="text-gray-600">Course-specific communications for {course.name}</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <div className="text-2xl font-bold text-blue-600">{messages.length}</div>
                <div className="text-sm text-gray-600">Total Messages</div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-red-600">{unreadCount}</div>
                <div className="text-sm text-gray-600">Unread</div>
              </div>
              <button
                onClick={() => setShowCompose(true)}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
              >
                ✉️ New Message
              </button>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center gap-4">
            <input
              type="text"
              placeholder="Search messages..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 flex-1"
            />
            
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Categories</option>
              <option value="general">General</option>
              <option value="assignment">Assignment</option>
              <option value="exam">Exam</option>
              <option value="lab">Lab</option>
              <option value="project">Project</option>
            </select>

            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Priorities</option>
              <option value="urgent">Urgent</option>
              <option value="high">High</option>
              <option value="normal">Normal</option>
            </select>

            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={showOnlyUnread}
                onChange={(e) => setShowOnlyUnread(e.target.checked)}
                className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <span className="text-sm text-gray-700">Unread only</span>
            </label>
          </div>
        </div>

        {/* Messages List */}
        <div className="space-y-4">
          {filteredMessages.length === 0 ? (
            <div className="bg-white rounded-lg shadow-sm p-8 text-center">
              <div className="text-4xl mb-4">📭</div>
              <div className="text-gray-500 mb-4">No messages found</div>
              <div className="text-sm text-gray-400">
                {showOnlyUnread 
                  ? "You&apos;re all caught up! No unread messages in this course." 
                  : "Try adjusting your search or filter criteria"
                }
              </div>
            </div>
          ) : (
            filteredMessages.map((message) => (
              <div
                key={message.id}
                className={`bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow border-l-4 ${
                  !message.isRead 
                    ? 'border-l-blue-500 bg-blue-50' 
                    : message.priority === 'urgent' 
                      ? 'border-l-red-500' 
                      : 'border-l-gray-200'
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className="text-3xl mt-1">{message.sender.avatar}</div>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      {!message.isRead && <span className="w-2 h-2 bg-blue-500 rounded-full"></span>}
                      
                      <h3 className={`font-semibold ${!message.isRead ? 'text-blue-900' : 'text-gray-900'}`}>
                        {message.subject}
                      </h3>
                      
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(message.category)}`}>
                        {message.category}
                      </span>
                      
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(message.priority)}`}>
                        {message.priority}
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                      <span>From: <span className="font-medium">{message.sender.name}</span></span>
                      <span>To: <span className="font-medium">{message.recipient.name}</span></span>
                      <span>{getTimeAgo(message.timestamp)}</span>
                    </div>
                    
                    <p className="text-gray-700 mb-3">{message.content}</p>
                    
                    {message.attachments && message.attachments.length > 0 && (
                      <div className="mb-3">
                        <div className="text-sm font-medium text-gray-700 mb-2">Attachments:</div>
                        <div className="space-y-1">
                          {message.attachments.map((attachment, idx) => (
                            <div key={idx} className="flex items-center gap-2 p-2 bg-gray-50 rounded text-sm">
                              <span>📎</span>
                              <span className="font-medium">{attachment.name}</span>
                              <span className="text-gray-500">({attachment.size})</span>
                              <button className="text-blue-600 hover:text-blue-800 ml-auto">Download</button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex flex-col gap-2">
                    <button
                      onClick={() => alert('Reply functionality would be implemented here')}
                      className="bg-blue-50 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-100 text-sm"
                    >
                      💬 Reply
                    </button>
                    
                    {!message.isRead && (
                      <button
                        onClick={() => handleMarkAsRead(message.id)}
                        className="bg-gray-50 text-gray-600 px-4 py-2 rounded-lg hover:bg-gray-100 text-sm"
                      >
                        Mark as Read
                      </button>
                    )}
                    
                    <button className="bg-red-50 text-red-600 px-4 py-2 rounded-lg hover:bg-red-100 text-sm">
                      🗑️ Delete
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Compose Message Modal */}
        {showCompose && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg p-6 w-full max-w-3xl max-h-[90vh] overflow-y-auto">
              <h2 className="text-2xl font-bold mb-6">New Message - {course.code}</h2>
              
              <form onSubmit={handleSendMessage} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">To</label>
                    <select
                      value={newMessage.recipient}
                      onChange={(e) => setNewMessage({...newMessage, recipient: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="lecturer">{course.lecturer.name} (Instructor)</option>
                      <option value="class">Entire Class</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                    <select
                      value={newMessage.category}
                      onChange={(e) => setNewMessage({...newMessage, category: e.target.value as typeof newMessage.category})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="general">General</option>
                      <option value="assignment">Assignment</option>
                      <option value="exam">Exam</option>
                      <option value="lab">Lab</option>
                      <option value="project">Project</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                    <select
                      value={newMessage.priority}
                      onChange={(e) => setNewMessage({...newMessage, priority: e.target.value as typeof newMessage.priority})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="normal">Normal</option>
                      <option value="high">High</option>
                      <option value="urgent">Urgent</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                  <input
                    type="text"
                    required
                    value={newMessage.subject}
                    onChange={(e) => setNewMessage({...newMessage, subject: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter message subject..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                  <textarea
                    required
                    value={newMessage.content}
                    onChange={(e) => setNewMessage({...newMessage, content: e.target.value})}
                    rows={6}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="Type your message..."
                  />
                </div>

                <div className="flex justify-between items-center">
                  <button
                    type="button"
                    className="text-sm text-gray-600 hover:text-gray-900 flex items-center gap-1"
                  >
                    📎 Attach File
                  </button>
                  
                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => setShowCompose(false)}
                      className="px-6 py-2 text-gray-600 hover:text-gray-900"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
                    >
                      Send Message
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow-sm p-6 mt-6">
          <h3 className="font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="flex flex-wrap gap-3">
            <Link
              href={`/courses/${course.id}`}
              className="bg-blue-50 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-100"
            >
              🏠 Back to Course
            </Link>
            <Link
              href="/student/queries?new=true"
              className="bg-green-50 text-green-600 px-4 py-2 rounded-lg hover:bg-green-100"
            >
              ❓ Ask Question
            </Link>
            <Link
              href={`/student/appointments?lecturer=${course.lecturer.id}`}
              className="bg-purple-50 text-purple-600 px-4 py-2 rounded-lg hover:bg-purple-100"
            >
              📅 Book Appointment
            </Link>
            <button className="bg-gray-50 text-gray-600 px-4 py-2 rounded-lg hover:bg-gray-100">
              📧 Export Messages
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
