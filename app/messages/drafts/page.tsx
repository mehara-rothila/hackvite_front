// app/messages/drafts/page.tsx
'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

interface DraftMessage {
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
  savedAt: string
  lastModified: string
  senderRole: 'student' | 'lecturer'
  autoSaved: boolean
  characterCount: number
  estimatedReadTime: number
  tags: string[]
}

const mockDrafts: DraftMessage[] = [
  {
    id: '1',
    subject: 'Question about Assignment 3 Requirements',
    content: 'Dear Dr. Johnson,\n\nI hope this message finds you well. I have been working on Assignment 3 and have a few questions about the requirements:\n\n1. For the recursive implementation, should we handle edge cases like negative inputs?\n2. Are we allowed to use built-in sorting functions, or should we implement our own?\n3. What is the expected time complexity for the solution?\n\nI have been following the lecture notes and textbook, but these specific details were not clear to me. I would appreciate any clarification you can provide.\n\nThank you for your time and assistance.\n\nBest regards,\nAlice Johnson',
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
    attachments: [],
    savedAt: '2025-07-27 14:30',
    lastModified: '2025-07-27 16:45',
    senderRole: 'student',
    autoSaved: true,
    characterCount: 687,
    estimatedReadTime: 3,
    tags: ['assignment', 'question', 'cs101']
  },
  {
    id: '2',
    subject: 'Office Hours Scheduling Request',
    content: 'Hello Professor Chen,\n\nI would like to schedule a meeting during your office hours to discuss my progress in CS201. I am particularly struggling with understanding binary search trees and would benefit from some additional explanation.\n\nWould Tuesday at 11:00 AM work for you? If not, I am flexible with timing this week.\n\nThank you,\nBob Smith',
    recipientType: 'lecturer',
    recipient: {
      id: 'lec2',
      name: 'Prof. Michael Chen',
      email: 'michael.chen@university.edu',
      avatar: '👨‍🏫'
    },
    course: 'CS201',
    messageType: 'administrative',
    priority: 'low',
    attachments: [],
    savedAt: '2025-07-26 09:15',
    lastModified: '2025-07-26 09:15',
    senderRole: 'student',
    autoSaved: false,
    characterCount: 456,
    estimatedReadTime: 2,
    tags: ['office-hours', 'meeting', 'help']
  },
  {
    id: '3',
    subject: 'Course Feedback and Suggestions',
    content: 'Dear Dr. Johnson,\n\nI wanted to provide some feedback on the CS101 course structure. Overall, I am really enjoying the class and appreciate your teaching style. The interactive coding sessions are particularly helpful.\n\nA few suggestions that might enhance the learning experience:\n- More practice problems with solutions\n- Recorded lectures for review\n- Group programming projects\n\nI understand these might not be feasible this semester, but thought I would share my thoughts.\n\nThank you for creating such an engaging learning environment.',
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
    attachments: [
      { name: 'course_suggestions.pdf', size: '234 KB', type: 'pdf' }
    ],
    savedAt: '2025-07-25 20:22',
    lastModified: '2025-07-26 08:30',
    senderRole: 'student',
    autoSaved: false,
    characterCount: 743,
    estimatedReadTime: 3,
    tags: ['feedback', 'suggestions', 'course-improvement']
  },
  {
    id: '4',
    subject: 'Lab Report Submission Extension Request',
    content: 'Professor Chen,\n\nI am writing to request a 24-hour extension for the Lab 4 report submission. Due to unexpected family circumstances, I was unable to complete the final analysis section on time.\n\nI have completed about 80% of the report and can provide a draft if needed. I understand that extensions are typically not granted, but I hope you can consider my situation.\n\nI am committed to maintaining high standards in my work and would not request this unless absolutely necessary.',
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
    attachments: [
      { name: 'lab4_draft.docx', size: '1.2 MB', type: 'document' }
    ],
    savedAt: '2025-07-28 07:45',
    lastModified: '2025-07-28 08:15',
    senderRole: 'student',
    autoSaved: true,
    characterCount: 562,
    estimatedReadTime: 2,
    tags: ['extension', 'lab-report', 'urgent']
  },
  {
    id: '5',
    subject: 'Study Group Formation',
    content: 'Hi Carol,\n\nI hope you are doing well in CS101. I noticed from class discussions that you have a strong grasp of the programming concepts we have been learning.\n\nWould you be interested in forming a study group for the upcoming midterm? I think collaborating with a few other students would be beneficial for all of us.\n\nLet me know if you are interested, and we can discuss scheduling and format.\n\nBest,\nAlice',
    recipientType: 'student',
    recipient: {
      id: 'stu3',
      name: 'Carol Davis',
      email: 'carol.davis@student.edu',
      avatar: '👩‍🎓'
    },
    course: 'CS101',
    messageType: 'academic',
    priority: 'medium',
    attachments: [],
    savedAt: '2025-07-27 11:20',
    lastModified: '2025-07-27 13:45',
    senderRole: 'student',
    autoSaved: false,
    characterCount: 398,
    estimatedReadTime: 2,
    tags: ['study-group', 'collaboration', 'midterm']
  }
]

export default function MessageDraftsPage() {
  const router = useRouter()
  const [drafts, setDrafts] = useState<DraftMessage[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [typeFilter, setTypeFilter] = useState('All')
  const [priorityFilter, setPriorityFilter] = useState('All')
  const [courseFilter, setCourseFilter] = useState('All')
  const [sortBy, setSortBy] = useState('Last Modified')
  const [selectedDrafts, setSelectedDrafts] = useState<string[]>([])
  const [selectedDraft, setSelectedDraft] = useState<DraftMessage | null>(null)
  const [showPreview, setShowPreview] = useState(false)

  useEffect(() => {
    // In real app, load from localStorage or API
    const savedDrafts = localStorage.getItem('messageDrafts')
    if (savedDrafts) {
      setDrafts(JSON.parse(savedDrafts))
    } else {
      setDrafts(mockDrafts)
      localStorage.setItem('messageDrafts', JSON.stringify(mockDrafts))
    }
  }, [])

  const filteredDrafts = drafts
    .filter(draft => {
      const matchesSearch = draft.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           draft.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           draft.recipient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           draft.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      const matchesType = typeFilter === 'All' || draft.messageType === typeFilter.toLowerCase()
      const matchesPriority = priorityFilter === 'All' || draft.priority === priorityFilter.toLowerCase()
      const matchesCourse = courseFilter === 'All' || draft.course === courseFilter
      
      return matchesSearch && matchesType && matchesPriority && matchesCourse
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'Subject A-Z': return a.subject.localeCompare(b.subject)
        case 'Subject Z-A': return b.subject.localeCompare(a.subject)
        case 'Last Modified': return new Date(b.lastModified).getTime() - new Date(a.lastModified).getTime()
        case 'Oldest First': return new Date(a.savedAt).getTime() - new Date(b.savedAt).getTime()
        case 'Priority': return getPriorityValue(b.priority) - getPriorityValue(a.priority)
        case 'Recipient': return a.recipient.name.localeCompare(b.recipient.name)
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

  const handleSelectDraft = (draftId: string) => {
    setSelectedDrafts(prev => 
      prev.includes(draftId) 
        ? prev.filter(id => id !== draftId)
        : [...prev, draftId]
    )
  }

  const handleSelectAll = () => {
    setSelectedDrafts(
      selectedDrafts.length === filteredDrafts.length 
        ? [] 
        : filteredDrafts.map(d => d.id)
    )
  }

  const handleContinueEditing = (draft: DraftMessage) => {
    // Navigate to compose page with draft data
    const params = new URLSearchParams({
      draft: draft.id,
      recipient: draft.recipient.id,
      type: draft.recipientType,
      course: draft.course || '',
      subject: draft.subject,
      content: draft.content,
      priority: draft.priority,
      messageType: draft.messageType
    })
    router.push(`/messages/new?${params.toString()}`)
  }

  const handleDeleteDrafts = (draftIds: string[]) => {
    const updatedDrafts = drafts.filter(d => !draftIds.includes(d.id))
    setDrafts(updatedDrafts)
    localStorage.setItem('messageDrafts', JSON.stringify(updatedDrafts))
    setSelectedDrafts([])
  }

  const handleSendDraft = (draft: DraftMessage) => {
    // Convert draft to sent message
    const sentMessage = {
      ...draft,
      sentAt: new Date().toISOString(),
      status: 'sent'
    }
    
    // Add to sent messages
    const sentMessages = JSON.parse(localStorage.getItem('sentMessages') || '[]')
    sentMessages.push(sentMessage)
    localStorage.setItem('sentMessages', JSON.stringify(sentMessages))
    
    // Remove from drafts
    handleDeleteDrafts([draft.id])
    
    alert('Message sent successfully!')
  }

  const getUniqueValues = (key: keyof DraftMessage) => {
    const values = drafts.map(d => d[key]).filter(Boolean)
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
            <h1 className="text-3xl font-bold text-gray-900">Draft Messages</h1>
          </div>
          <p className="text-gray-600">Continue editing your saved message drafts</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="text-2xl font-bold text-blue-600">{drafts.length}</div>
            <div className="text-sm text-gray-600">Total Drafts</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="text-2xl font-bold text-green-600">
              {drafts.filter(d => d.autoSaved).length}
            </div>
            <div className="text-sm text-gray-600">Auto-saved</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="text-2xl font-bold text-red-600">
              {drafts.filter(d => d.priority === 'high').length}
            </div>
            <div className="text-sm text-gray-600">High Priority</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="text-2xl font-bold text-purple-600">
              {drafts.filter(d => d.attachments.length > 0).length}
            </div>
            <div className="text-sm text-gray-600">With Attachments</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="text-2xl font-bold text-orange-600">
              {drafts.reduce((sum, d) => sum + d.characterCount, 0)}
            </div>
            <div className="text-sm text-gray-600">Total Characters</div>
          </div>
        </div>

        {/* Filters and Controls */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="flex flex-col sm:flex-row gap-4 flex-1">
              <input
                type="text"
                placeholder="Search drafts, recipients, content..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 flex-1"
              />
              
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
                <option value="Last Modified">Last Modified</option>
                <option value="Subject A-Z">Subject A-Z</option>
                <option value="Subject Z-A">Subject Z-A</option>
                <option value="Oldest First">Oldest First</option>
                <option value="Priority">Priority</option>
                <option value="Recipient">Recipient</option>
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
        {selectedDrafts.length > 0 && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <div className="flex items-center justify-between">
              <span className="text-blue-800">
                {selectedDrafts.length} draft(s) selected
              </span>
              <div className="flex gap-2">
                <button
                  onClick={() => handleDeleteDrafts(selectedDrafts)}
                  className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 text-sm"
                >
                  🗑️ Delete Selected
                </button>
                <button
                  onClick={() => setSelectedDrafts([])}
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
              <div className="text-sm text-gray-600">Start fresh</div>
            </div>
          </Link>
          
          <Link href="/messages/sent" className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow group">
            <div className="text-center">
              <div className="text-2xl mb-2 group-hover:scale-110 transition-transform">📤</div>
              <div className="font-medium text-gray-900">Sent Messages</div>
              <div className="text-sm text-gray-600">View sent items</div>
            </div>
          </Link>
          
          <Link href="/messages/search" className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow group">
            <div className="text-center">
              <div className="text-2xl mb-2 group-hover:scale-110 transition-transform">🔍</div>
              <div className="font-medium text-gray-900">Search Messages</div>
              <div className="text-sm text-gray-600">Find conversations</div>
            </div>
          </Link>
          
          <button
            onClick={() => {
              const data = JSON.stringify(drafts, null, 2)
              const blob = new Blob([data], { type: 'application/json' })
              const url = URL.createObjectURL(blob)
              const a = document.createElement('a')
              a.href = url
              a.download = 'message_drafts.json'
              a.click()
            }}
            className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow group"
          >
            <div className="text-center">
              <div className="text-2xl mb-2 group-hover:scale-110 transition-transform">💾</div>
              <div className="font-medium text-gray-900">Backup Drafts</div>
              <div className="text-sm text-gray-600">Export as JSON</div>
            </div>
          </button>
        </div>

        {/* Results Info */}
        <div className="mb-4">
          <div className="flex items-center justify-between">
            <p className="text-gray-600">
              Showing {filteredDrafts.length} of {drafts.length} drafts
            </p>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={selectedDrafts.length === filteredDrafts.length && filteredDrafts.length > 0}
                onChange={handleSelectAll}
                className="rounded"
              />
              <span className="text-sm text-gray-600">Select all</span>
            </div>
          </div>
        </div>

        {/* Drafts List */}
        {filteredDrafts.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <div className="text-4xl mb-4">📝</div>
            <div className="text-gray-500 mb-4">No drafts found</div>
            <div className="text-sm text-gray-400 mb-6">
              {drafts.length === 0 
                ? "You haven't saved any message drafts yet" 
                : "Try adjusting your search criteria"
              }
            </div>
            <Link
              href="/messages/new"
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
            >
              Create New Message
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredDrafts.map((draft) => (
              <div key={draft.id} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <div className="p-6">
                  <div className="flex items-start gap-4">
                    <input
                      type="checkbox"
                      checked={selectedDrafts.includes(draft.id)}
                      onChange={() => handleSelectDraft(draft.id)}
                      className="mt-1 rounded"
                    />
                    
                    <span className="text-3xl">{draft.recipient.avatar}</span>
                    
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">{draft.subject}</h3>
                          <p className="text-sm text-gray-600">
                            To: {draft.recipient.name} ({draft.recipient.email})
                            {draft.course && <span className="ml-2">• {draft.course}</span>}
                          </p>
                        </div>
                        <div className="flex items-center gap-2 ml-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(draft.priority)}`}>
                            {draft.priority}
                          </span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getMessageTypeColor(draft.messageType)}`}>
                            {draft.messageType}
                          </span>
                          {draft.autoSaved && (
                            <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                              Auto-saved
                            </span>
                          )}
                        </div>
                      </div>
                      
                      <div className="text-gray-700 mb-3">
                        <p className="line-clamp-3">
                          {draft.content.substring(0, 200)}
                          {draft.content.length > 200 && '...'}
                        </p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 text-sm mb-3">
                        <div>
                          <span className="font-medium text-gray-700">Saved:</span><br />
                          <span className="text-gray-600">{new Date(draft.savedAt).toLocaleDateString()}</span>
                        </div>
                        <div>
                          <span className="font-medium text-gray-700">Modified:</span><br />
                          <span className="text-gray-600">{new Date(draft.lastModified).toLocaleDateString()}</span>
                        </div>
                        <div>
                          <span className="font-medium text-gray-700">Length:</span><br />
                          <span className="text-gray-600">{draft.characterCount} chars</span>
                        </div>
                        <div>
                          <span className="font-medium text-gray-700">Read Time:</span><br />
                          <span className="text-gray-600">{draft.estimatedReadTime} min</span>
                        </div>
                        <div>
                          <span className="font-medium text-gray-700">Attachments:</span><br />
                          <span className="text-gray-600">{draft.attachments.length}</span>
                        </div>
                      </div>

                      {draft.attachments.length > 0 && (
                        <div className="mb-3">
                          <div className="text-sm font-medium text-gray-700 mb-1">Attachments:</div>
                          <div className="flex flex-wrap gap-2">
                            {draft.attachments.map((attachment, idx) => (
                              <span key={idx} className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
                                📎 {attachment.name} ({attachment.size})
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {draft.tags.length > 0 && (
                        <div className="mb-3">
                          <div className="flex flex-wrap gap-1">
                            {draft.tags.map(tag => (
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
                        onClick={() => handleContinueEditing(draft)}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm"
                      >
                        ✏️ Continue Editing
                      </button>
                      <button
                        onClick={() => {
                          setSelectedDraft(draft)
                          setShowPreview(true)
                        }}
                        className="bg-gray-50 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors text-sm"
                      >
                        👁️ Preview
                      </button>
                      <button
                        onClick={() => handleSendDraft(draft)}
                        className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors text-sm"
                      >
                        📤 Send Now
                      </button>
                      <button
                        onClick={() => handleDeleteDrafts([draft.id])}
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

        {/* Preview Modal */}
        {showPreview && selectedDraft && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-2xl font-bold">Draft Preview</h2>
                <button
                  onClick={() => setShowPreview(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>
              
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
                  <div>
                    <span className="font-medium text-gray-700">To:</span>
                    <div className="text-gray-900">{selectedDraft.recipient.name}</div>
                    <div className="text-sm text-gray-600">{selectedDraft.recipient.email}</div>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Course:</span>
                    <div className="text-gray-900">{selectedDraft.course || 'None'}</div>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Priority:</span>
                    <span className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(selectedDraft.priority)}`}>
                      {selectedDraft.priority}
                    </span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Type:</span>
                    <span className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${getMessageTypeColor(selectedDraft.messageType)}`}>
                      {selectedDraft.messageType}
                    </span>
                  </div>
                </div>

                <div>
                  <div className="font-medium text-gray-700 mb-2">Subject:</div>
                  <div className="text-lg font-semibold">{selectedDraft.subject}</div>
                </div>

                <div>
                  <div className="font-medium text-gray-700 mb-2">Message:</div>
                  <div className="p-4 border rounded-lg bg-white whitespace-pre-wrap">
                    {selectedDraft.content}
                  </div>
                </div>

                {selectedDraft.attachments.length > 0 && (
                  <div>
                    <div className="font-medium text-gray-700 mb-2">Attachments:</div>
                    <div className="space-y-2">
                      {selectedDraft.attachments.map((attachment, idx) => (
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
                      setShowPreview(false)
                      handleContinueEditing(selectedDraft)
                    }}
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
                  >
                    ✏️ Continue Editing
                  </button>
                  <button
                    onClick={() => {
                      setShowPreview(false)
                      handleSendDraft(selectedDraft)
                    }}
                    className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700"
                  >
                    📤 Send Message
                  </button>
                  <button
                    onClick={() => setShowPreview(false)}
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
