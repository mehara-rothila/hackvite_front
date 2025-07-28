// app/messages/new/page.tsx
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

interface Lecturer {
  id: string
  name: string
  email: string
  avatar: string
  department: string
  courses: string[]
  officeLocation: string
  availability: string
}

interface Student {
  id: string
  name: string
  email: string
  avatar: string
  studentId: string
  courses: string[]
  year: string
}

interface Course {
  id: string
  code: string
  name: string
  lecturer: string
}

// Mock data
const mockLecturers: Lecturer[] = [
  {
    id: '1',
    name: 'Dr. Sarah Johnson',
    email: 'sarah.johnson@university.edu',
    avatar: '👩‍🏫',
    department: 'Computer Science',
    courses: ['CS101', 'CS201', 'CS301'],
    officeLocation: 'Office 201B',
    availability: 'Mon-Wed 2-4 PM'
  },
  {
    id: '2',
    name: 'Prof. Michael Chen',
    email: 'michael.chen@university.edu',
    avatar: '👨‍🏫',
    department: 'Mathematics',
    courses: ['MATH202', 'MATH301', 'STAT101'],
    officeLocation: 'Office 301A',
    availability: 'Tue-Thu 10-12 PM'
  },
  {
    id: '3',
    name: 'Dr. Emily Roberts',
    email: 'emily.roberts@university.edu',
    avatar: '👩‍💼',
    department: 'English',
    courses: ['ENG110', 'ENG210', 'LIT301'],
    officeLocation: 'Office 105C',
    availability: 'Mon-Fri 9-11 AM'
  }
]

const mockStudents: Student[] = [
  {
    id: '1',
    name: 'Alice Johnson',
    email: 'alice.johnson@student.edu',
    avatar: '👩‍🎓',
    studentId: 'STU001',
    courses: ['CS101', 'MATH202', 'ENG110'],
    year: 'Sophomore'
  },
  {
    id: '2',
    name: 'Bob Smith',
    email: 'bob.smith@student.edu',
    avatar: '👨‍🎓',
    studentId: 'STU002',
    courses: ['CS101', 'CS201'],
    year: 'Junior'
  },
  {
    id: '3',
    name: 'Carol Davis',
    email: 'carol.davis@student.edu',
    avatar: '👩‍🎓',
    studentId: 'STU003',
    courses: ['MATH202', 'ENG110'],
    year: 'Freshman'
  }
]

const mockCourses: Course[] = [
  { id: '1', code: 'CS101', name: 'Introduction to Programming', lecturer: 'Dr. Sarah Johnson' },
  { id: '2', code: 'CS201', name: 'Data Structures', lecturer: 'Dr. Sarah Johnson' },
  { id: '3', code: 'MATH202', name: 'Calculus II', lecturer: 'Prof. Michael Chen' },
  { id: '4', code: 'ENG110', name: 'Academic Writing', lecturer: 'Dr. Emily Roberts' }
]

export default function NewMessagePage() {
  const router = useRouter()
  const [userRole] = useState<'student' | 'lecturer'>('student') // Would come from auth context
  
  const [formData, setFormData] = useState({
    recipientType: 'lecturer' as 'lecturer' | 'student',
    recipient: '',
    course: '',
    subject: '',
    content: '',
    priority: 'medium' as 'low' | 'medium' | 'high',
    messageType: 'general' as 'academic' | 'administrative' | 'general',
    attachments: [] as File[]
  })

  const [searchTerm, setSearchTerm] = useState('')
  const [showRecipientList, setShowRecipientList] = useState(false)
  const [isDraftSaved, setIsDraftSaved] = useState(false)

  // Filter recipients based on search
  const getFilteredRecipients = () => {
    if (formData.recipientType === 'lecturer') {
      return mockLecturers.filter(lecturer => 
        lecturer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lecturer.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lecturer.courses.some(course => course.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    } else {
      return mockStudents.filter(student =>
        student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.studentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.courses.some(course => course.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    }
  }

  const handleRecipientSelect = (recipientId: string, recipientName: string) => {
    setFormData({ ...formData, recipient: recipientId })
    setSearchTerm(recipientName)
    setShowRecipientList(false)
  }

  const handleFileAttachment = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files)
      setFormData({ ...formData, attachments: [...formData.attachments, ...newFiles] })
    }
  }

  const removeAttachment = (index: number) => {
    const newAttachments = formData.attachments.filter((_, i) => i !== index)
    setFormData({ ...formData, attachments: newAttachments })
  }

  const handleSaveDraft = () => {
    // Save to drafts (localStorage for now)
    const drafts = JSON.parse(localStorage.getItem('messageDrafts') || '[]')
    const draft = {
      id: Date.now().toString(),
      ...formData,
      savedAt: new Date().toISOString(),
      senderRole: userRole
    }
    drafts.push(draft)
    localStorage.setItem('messageDrafts', JSON.stringify(drafts))
    setIsDraftSaved(true)
    setTimeout(() => setIsDraftSaved(false), 3000)
  }

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validation
    if (!formData.recipient || !formData.subject || !formData.content) {
      alert('Please fill in all required fields')
      return
    }

    // In real app, this would send via API
    const newMessage = {
      id: Date.now().toString(),
      ...formData,
      sentAt: new Date().toISOString(),
      senderRole: userRole,
      status: 'sent'
    }

    // Store in sent messages
    const sentMessages = JSON.parse(localStorage.getItem('sentMessages') || '[]')
    sentMessages.push(newMessage)
    localStorage.setItem('sentMessages', JSON.stringify(sentMessages))

    alert('Message sent successfully!')
    
    // Navigate back to messages
    router.push(userRole === 'student' ? '/student/messages' : '/lecturer/messages')
  }

  const filteredRecipients = getFilteredRecipients()
  const selectedRecipient = formData.recipientType === 'lecturer' 
    ? mockLecturers.find(l => l.id === formData.recipient)
    : mockStudents.find(s => s.id === formData.recipient)

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <button 
              onClick={() => router.back()}
              className="text-blue-600 hover:text-blue-800"
            >
              ← Back
            </button>
            <h1 className="text-3xl font-bold text-gray-900">Compose New Message</h1>
          </div>
          <p className="text-gray-600">Send a message to lecturers or students</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="text-2xl font-bold text-blue-600">{mockLecturers.length}</div>
            <div className="text-sm text-gray-600">Available Lecturers</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="text-2xl font-bold text-green-600">{mockStudents.length}</div>
            <div className="text-sm text-gray-600">Students</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="text-2xl font-bold text-purple-600">{mockCourses.length}</div>
            <div className="text-sm text-gray-600">Courses</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="text-2xl font-bold text-orange-600">
              {JSON.parse(localStorage.getItem('messageDrafts') || '[]').length}
            </div>
            <div className="text-sm text-gray-600">Saved Drafts</div>
          </div>
        </div>

        {/* Main Form */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <form onSubmit={handleSendMessage} className="space-y-6">
            {/* Recipient Type Toggle */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Send To:</label>
              <div className="flex gap-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    value="lecturer"
                    checked={formData.recipientType === 'lecturer'}
                    onChange={(e) => setFormData({ 
                      ...formData, 
                      recipientType: e.target.value as 'lecturer',
                      recipient: '' 
                    })}
                    className="mr-2"
                  />
                  👩‍🏫 Lecturers
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    value="student"
                    checked={formData.recipientType === 'student'}
                    onChange={(e) => setFormData({ 
                      ...formData, 
                      recipientType: e.target.value as 'student',
                      recipient: '' 
                    })}
                    className="mr-2"
                  />
                  👨‍🎓 Students
                </label>
              </div>
            </div>

            {/* Recipient Search */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Select {formData.recipientType === 'lecturer' ? 'Lecturer' : 'Student'} *
              </label>
              <input
                type="text"
                required
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value)
                  setShowRecipientList(true)
                }}
                onFocus={() => setShowRecipientList(true)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder={`Search for ${formData.recipientType}s...`}
              />
              
              {showRecipientList && filteredRecipients.length > 0 && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                  {filteredRecipients.map((recipient) => (
                    <div
                      key={recipient.id}
                      onClick={() => handleRecipientSelect(recipient.id, recipient.name)}
                      className="p-3 hover:bg-gray-50 cursor-pointer border-b last:border-b-0"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{recipient.avatar}</span>
                        <div>
                          <div className="font-medium">{recipient.name}</div>
                          <div className="text-sm text-gray-600">
                            {formData.recipientType === 'lecturer' 
                              ? `${(recipient as Lecturer).department} • ${(recipient as Lecturer).courses.join(', ')}`
                              : `${(recipient as Student).studentId} • ${(recipient as Student).courses.join(', ')}`
                            }
                          </div>
                          {formData.recipientType === 'lecturer' && (
                            <div className="text-xs text-gray-500">
                              📍 {(recipient as Lecturer).officeLocation} • {(recipient as Lecturer).availability}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Selected Recipient Info */}
            {selectedRecipient && (
              <div className="p-4 bg-blue-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{selectedRecipient.avatar}</span>
                  <div>
                    <div className="font-medium text-blue-900">{selectedRecipient.name}</div>
                    <div className="text-sm text-blue-700">
                      {formData.recipientType === 'lecturer' 
                        ? `${(selectedRecipient as Lecturer).department} • ${(selectedRecipient as Lecturer).email}`
                        : `${(selectedRecipient as Student).studentId} • ${(selectedRecipient as Student).email}`
                      }
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Course Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Related Course</label>
              <select
                value={formData.course}
                onChange={(e) => setFormData({ ...formData, course: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select a course (optional)</option>
                {mockCourses.map(course => (
                  <option key={course.id} value={course.code}>
                    {course.code} - {course.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Message Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Message Type</label>
                <select
                  value={formData.messageType}
                  onChange={(e) => setFormData({ ...formData, messageType: e.target.value as 'academic' | 'administrative' | 'general' })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="general">General</option>
                  <option value="academic">Academic</option>
                  <option value="administrative">Administrative</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                <select
                  value={formData.priority}
                  onChange={(e) => setFormData({ ...formData, priority: e.target.value as 'low' | 'medium' | 'high' })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
            </div>

            {/* Subject */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Subject *</label>
              <input
                type="text"
                required
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Enter message subject"
              />
            </div>

            {/* Message Content */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Message *</label>
              <textarea
                required
                rows={8}
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Type your message here..."
              />
              <div className="text-right text-sm text-gray-500 mt-1">
                {formData.content.length} characters
              </div>
            </div>

            {/* File Attachments */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Attachments</label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
                <input
                  type="file"
                  multiple
                  onChange={handleFileAttachment}
                  className="hidden"
                  id="file-upload"
                />
                <label htmlFor="file-upload" className="cursor-pointer">
                  <div className="text-center">
                    <div className="text-gray-400 mb-2">📎</div>
                    <div className="text-sm text-gray-600">
                      Click to attach files or drag and drop
                    </div>
                  </div>
                </label>
                
                {formData.attachments.length > 0 && (
                  <div className="mt-4 space-y-2">
                    {formData.attachments.map((file, index) => (
                      <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                        <span className="text-sm text-gray-700">{file.name}</span>
                        <button
                          type="button"
                          onClick={() => removeAttachment(index)}
                          className="text-red-600 hover:text-red-800"
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                ✉️ Send Message
              </button>
              
              <button
                type="button"
                onClick={handleSaveDraft}
                className="bg-gray-50 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors border border-gray-300"
              >
                💾 Save Draft
                {isDraftSaved && <span className="ml-2 text-green-600">✓ Saved!</span>}
              </button>
              
              <Link
                href="/messages/drafts"
                className="bg-yellow-50 text-yellow-700 px-6 py-3 rounded-lg hover:bg-yellow-100 transition-colors border border-yellow-300 text-center"
              >
                📄 View Drafts
              </Link>
              
              <button
                type="button"
                onClick={() => router.back()}
                className="bg-red-50 text-red-700 px-6 py-3 rounded-lg hover:bg-red-100 transition-colors border border-red-300"
              >
                ❌ Cancel
              </button>
            </div>
          </form>
        </div>

        {/* Quick Actions Sidebar */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link href="/messages/search" className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <div className="text-center">
              <div className="text-2xl mb-2">🔍</div>
              <div className="font-medium text-gray-900">Search Messages</div>
              <div className="text-sm text-gray-600">Find past conversations</div>
            </div>
          </Link>
          
          <Link href="/messages/drafts" className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <div className="text-center">
              <div className="text-2xl mb-2">📄</div>
              <div className="font-medium text-gray-900">Draft Messages</div>
              <div className="text-sm text-gray-600">Continue writing</div>
            </div>
          </Link>
          
          <Link href="/contacts" className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <div className="text-center">
              <div className="text-2xl mb-2">📇</div>
              <div className="font-medium text-gray-900">Contact Directory</div>
              <div className="text-sm text-gray-600">Browse all contacts</div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}
