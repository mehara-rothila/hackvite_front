// app/lecturer/announcements/page.tsx
'use client'

import { useState } from 'react'

interface Announcement {
  id: string
  title: string
  content: string
  type: 'general' | 'urgent' | 'course' | 'schedule' | 'system'
  priority: 'low' | 'medium' | 'high'
  targetAudience: 'all' | 'course-specific' | 'year-specific'
  course?: string
  yearLevel?: string
  createdAt: string
  updatedAt: string
  publishedAt?: string
  expiresAt?: string
  status: 'draft' | 'published' | 'expired'
  readCount: number
  attachments?: {
    name: string
    url: string
    type: string
  }[]
  pinned: boolean
}

const mockAnnouncements: Announcement[] = [
  {
    id: '1',
    title: 'Mid-term Exam Schedule Released',
    content: 'The mid-term examination schedule for CS101 has been released. Please check the course portal for your exam slots. Make sure to arrive 15 minutes early and bring your student ID.',
    type: 'course',
    priority: 'high',
    targetAudience: 'course-specific',
    course: 'CS101',
    createdAt: '2025-07-25',
    updatedAt: '2025-07-25',
    publishedAt: '2025-07-25',
    expiresAt: '2025-08-15',
    status: 'published',
    readCount: 45,
    pinned: true,
    attachments: [
      { name: 'exam_schedule.pdf', url: '#', type: 'pdf' }
    ]
  },
  {
    id: '2',
    title: 'Office Hours Change This Week',
    content: 'Due to a faculty meeting, my office hours on Thursday will be moved from 2-4 PM to 10-12 PM. Friday office hours remain unchanged.',
    type: 'schedule',
    priority: 'medium',
    targetAudience: 'all',
    createdAt: '2025-07-24',
    updatedAt: '2025-07-24',
    publishedAt: '2025-07-24',
    status: 'published',
    readCount: 23,
    pinned: false
  },
  {
    id: '3',
    title: 'New Assignment Guidelines',
    content: 'I have updated the assignment submission guidelines. Please review the new formatting requirements and deadline policies.',
    type: 'course',
    priority: 'medium',
    targetAudience: 'course-specific',
    course: 'CS101',
    createdAt: '2025-07-23',
    updatedAt: '2025-07-23',
    status: 'draft',
    readCount: 0,
    pinned: false
  }
]

const announcementTypes = ['general', 'urgent', 'course', 'schedule', 'system']
const priorities = ['low', 'medium', 'high']
const audiences = ['all', 'course-specific', 'year-specific']
const statusFilters = ['all', 'draft', 'published', 'expired']

export default function LecturerAnnouncementsPage() {
  const [announcements, setAnnouncements] = useState<Announcement[]>(mockAnnouncements)
  const [showNewForm, setShowNewForm] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [typeFilter, setTypeFilter] = useState('all')

  // New announcement form state
  const [newAnnouncement, setNewAnnouncement] = useState({
    title: '',
    content: '',
    type: 'general' as const,
    priority: 'medium' as const,
    targetAudience: 'all' as const,
    course: '',
    yearLevel: '',
    expiresAt: '',
    pinned: false
  })

  const handleSubmitAnnouncement = (e: React.FormEvent) => {
    e.preventDefault()
    
    const announcement: Announcement = {
      id: Date.now().toString(),
      ...newAnnouncement,
      createdAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0],
      publishedAt: new Date().toISOString().split('T')[0],
      status: 'published',
      readCount: 0
    }
    
    setAnnouncements([announcement, ...announcements])
    setNewAnnouncement({
      title: '',
      content: '',
      type: 'general',
      priority: 'medium',
      targetAudience: 'all',
      course: '',
      yearLevel: '',
      expiresAt: '',
      pinned: false
    })
    setShowNewForm(false)
  }

  const handleDeleteAnnouncement = (id: string) => {
    if (confirm('Are you sure you want to delete this announcement?')) {
      setAnnouncements(announcements.filter(a => a.id !== id))
    }
  }

  const handleTogglePin = (id: string) => {
    setAnnouncements(announcements.map(a => 
      a.id === id ? { ...a, pinned: !a.pinned } : a
    ))
  }

  const handleToggleStatus = (id: string) => {
    setAnnouncements(announcements.map(a => 
      a.id === id ? { 
        ...a, 
        status: a.status === 'published' ? 'draft' : 'published',
        publishedAt: a.status === 'draft' ? new Date().toISOString().split('T')[0] : a.publishedAt
      } : a
    ))
  }

  // Filter announcements
  const filteredAnnouncements = announcements.filter(announcement => {
    const matchesSearch = announcement.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         announcement.content.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || announcement.status === statusFilter
    const matchesType = typeFilter === 'all' || announcement.type === typeFilter
    
    return matchesSearch && matchesStatus && matchesType
  })

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'urgent': return 'bg-red-100 text-red-800'
      case 'course': return 'bg-blue-100 text-blue-800'
      case 'schedule': return 'bg-purple-100 text-purple-800'
      case 'system': return 'bg-gray-100 text-gray-800'
      default: return 'bg-green-100 text-green-800'
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
      case 'published': return 'bg-green-100 text-green-800'
      case 'draft': return 'bg-yellow-100 text-yellow-800'
      case 'expired': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Announcements</h1>
          <p className="text-gray-600">Create and manage announcements for your students</p>
        </div>

        {/* Actions Bar */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="flex flex-col sm:flex-row gap-4 flex-1">
              {/* Search */}
              <input
                type="text"
                placeholder="Search announcements..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              
              {/* Filters */}
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Status</option>
                {statusFilters.slice(1).map(status => (
                  <option key={status} value={status}>
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </option>
                ))}
              </select>

              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Types</option>
                {announcementTypes.map(type => (
                  <option key={type} value={type}>
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            {/* New Announcement Button */}
            <button
              onClick={() => setShowNewForm(true)}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              + New Announcement
            </button>
          </div>
        </div>

        {/* New Announcement Form Modal */}
        {showNewForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
              <h2 className="text-2xl font-bold mb-6">Create New Announcement</h2>
              
              <form onSubmit={handleSubmitAnnouncement} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                  <input
                    type="text"
                    required
                    value={newAnnouncement.title}
                    onChange={(e) => setNewAnnouncement({...newAnnouncement, title: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="Announcement title"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                    <select
                      value={newAnnouncement.type}
                      onChange={(e) => setNewAnnouncement({...newAnnouncement, type: e.target.value as typeof newAnnouncement.type})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    >
                      {announcementTypes.map(type => (
                        <option key={type} value={type}>
                          {type.charAt(0).toUpperCase() + type.slice(1)}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                    <select
                      value={newAnnouncement.priority}
                      onChange={(e) => setNewAnnouncement({...newAnnouncement, priority: e.target.value as typeof newAnnouncement.priority})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    >
                      {priorities.map(priority => (
                        <option key={priority} value={priority}>
                          {priority.charAt(0).toUpperCase() + priority.slice(1)}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Target Audience</label>
                    <select
                      value={newAnnouncement.targetAudience}
                      onChange={(e) => setNewAnnouncement({...newAnnouncement, targetAudience: e.target.value as typeof newAnnouncement.targetAudience})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    >
                      {audiences.map(audience => (
                        <option key={audience} value={audience}>
                          {audience.charAt(0).toUpperCase() + audience.slice(1).replace('-', ' ')}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {newAnnouncement.targetAudience === 'course-specific' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Course</label>
                    <input
                      type="text"
                      value={newAnnouncement.course}
                      onChange={(e) => setNewAnnouncement({...newAnnouncement, course: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="e.g., CS101, MATH202"
                    />
                  </div>
                )}

                {newAnnouncement.targetAudience === 'year-specific' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Year Level</label>
                    <select
                      value={newAnnouncement.yearLevel}
                      onChange={(e) => setNewAnnouncement({...newAnnouncement, yearLevel: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select Year</option>
                      <option value="1st Year">1st Year</option>
                      <option value="2nd Year">2nd Year</option>
                      <option value="3rd Year">3rd Year</option>
                      <option value="4th Year">4th Year</option>
                    </select>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
                  <textarea
                    required
                    rows={6}
                    value={newAnnouncement.content}
                    onChange={(e) => setNewAnnouncement({...newAnnouncement, content: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="Announcement content..."
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Expires At (Optional)</label>
                    <input
                      type="date"
                      value={newAnnouncement.expiresAt}
                      onChange={(e) => setNewAnnouncement({...newAnnouncement, expiresAt: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div className="flex items-center gap-2 pt-6">
                    <input
                      type="checkbox"
                      id="pinned"
                      checked={newAnnouncement.pinned}
                      onChange={(e) => setNewAnnouncement({...newAnnouncement, pinned: e.target.checked})}
                      className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="pinned" className="text-sm font-medium text-gray-700">
                      Pin this announcement
                    </label>
                  </div>
                </div>

                <div className="flex gap-4 pt-4">
                  <button
                    type="submit"
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
                  >
                    Publish Announcement
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowNewForm(false)}
                    className="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-400"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="text-2xl font-bold text-blue-600">{announcements.length}</div>
            <div className="text-sm text-gray-600">Total Announcements</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="text-2xl font-bold text-green-600">
              {announcements.filter(a => a.status === 'published').length}
            </div>
            <div className="text-sm text-gray-600">Published</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="text-2xl font-bold text-yellow-600">
              {announcements.filter(a => a.status === 'draft').length}
            </div>
            <div className="text-sm text-gray-600">Drafts</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="text-2xl font-bold text-purple-600">
              {announcements.filter(a => a.pinned).length}
            </div>
            <div className="text-sm text-gray-600">Pinned</div>
          </div>
        </div>

        {/* Announcements List */}
        <div className="space-y-4">
          {filteredAnnouncements.length === 0 ? (
            <div className="bg-white rounded-lg shadow-sm p-8 text-center">
              <div className="text-gray-500 mb-4">No announcements found</div>
              <button
                onClick={() => setShowNewForm(true)}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
              >
                Create Your First Announcement
              </button>
            </div>
          ) : (
            filteredAnnouncements.map((announcement) => (
              <div key={announcement.id} className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      {announcement.pinned && <span className="text-yellow-500">📌</span>}
                      <h3 className="text-lg font-semibold text-gray-900">{announcement.title}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(announcement.status)}`}>
                        {announcement.status.charAt(0).toUpperCase() + announcement.status.slice(1)}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(announcement.type)}`}>
                        {announcement.type.charAt(0).toUpperCase() + announcement.type.slice(1)}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(announcement.priority)}`}>
                        {announcement.priority.charAt(0).toUpperCase() + announcement.priority.slice(1)}
                      </span>
                    </div>
                    
                    <p className="text-gray-600 mb-3 line-clamp-3">{announcement.content}</p>
                    
                    <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                      <span>Audience: <span className="font-medium">{announcement.targetAudience.replace('-', ' ')}</span></span>
                      {announcement.course && <span>Course: <span className="font-medium">{announcement.course}</span></span>}
                      {announcement.yearLevel && <span>Year: <span className="font-medium">{announcement.yearLevel}</span></span>}
                      <span>Created: <span className="font-medium">{announcement.createdAt}</span></span>
                      {announcement.status === 'published' && (
                        <span>Read by: <span className="font-medium">{announcement.readCount} students</span></span>
                      )}
                      {announcement.expiresAt && (
                        <span>Expires: <span className="font-medium">{announcement.expiresAt}</span></span>
                      )}
                    </div>

                    {announcement.attachments && announcement.attachments.length > 0 && (
                      <div className="mt-3 flex gap-2">
                        {announcement.attachments.map((attachment, idx) => (
                          <span key={idx} className="text-xs bg-gray-100 px-2 py-1 rounded flex items-center gap-1">
                            📎 {attachment.name}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  
                  <div className="flex flex-col gap-2">
                    <button
                      onClick={() => handleToggleStatus(announcement.id)}
                      className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                        announcement.status === 'published' 
                          ? 'bg-yellow-50 text-yellow-600 hover:bg-yellow-100' 
                          : 'bg-green-50 text-green-600 hover:bg-green-100'
                      }`}
                    >
                      {announcement.status === 'published' ? 'Unpublish' : 'Publish'}
                    </button>
                    
                    <button
                      onClick={() => handleTogglePin(announcement.id)}
                      className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                        announcement.pinned 
                          ? 'bg-yellow-50 text-yellow-600 hover:bg-yellow-100' 
                          : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      {announcement.pinned ? 'Unpin' : 'Pin'}
                    </button>
                    
                    <button className="bg-blue-50 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-100 transition-colors text-sm">
                      Edit
                    </button>
                    
                    <button
                      onClick={() => handleDeleteAnnouncement(announcement.id)}
                      className="bg-red-50 text-red-600 px-4 py-2 rounded-lg hover:bg-red-100 transition-colors text-sm"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
