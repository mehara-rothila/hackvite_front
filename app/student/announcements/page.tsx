// app/student/announcements/page.tsx
'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

interface Announcement {
  id: string
  title: string
  content: string
  type: 'general' | 'urgent' | 'course' | 'schedule' | 'system'
  priority: 'low' | 'medium' | 'high'
  targetAudience: 'all' | 'course-specific' | 'year-specific'
  course?: string
  yearLevel?: string
  lecturer: string
  lecturerAvatar?: string
  createdAt: string
  publishedAt: string
  expiresAt?: string
  pinned: boolean
  read: boolean
  attachments?: {
    name: string
    url: string
    type: string
  }[]
}

// Mock data - in real app this would come from API based on student's courses
const mockAnnouncements: Announcement[] = [
  {
    id: '1',
    title: 'Mid-term Exam Schedule Released',
    content: 'The mid-term examination schedule for CS101 has been released. Please check the course portal for your exam slots. Make sure to arrive 15 minutes early and bring your student ID. The exam will cover chapters 1-6 from the textbook and all lab exercises completed so far.',
    type: 'course',
    priority: 'high',
    targetAudience: 'course-specific',
    course: 'CS101',
    lecturer: 'Dr. Sarah Johnson',
    lecturerAvatar: '👩‍🏫',
    createdAt: '2025-07-25',
    publishedAt: '2025-07-25',
    expiresAt: '2025-08-15',
    pinned: true,
    read: false,
    attachments: [
      { name: 'exam_schedule.pdf', url: '#', type: 'pdf' },
      { name: 'exam_guidelines.pdf', url: '#', type: 'pdf' }
    ]
  },
  {
    id: '2',
    title: '🚨 System Maintenance Tonight',
    content: 'The university portal will be undergoing scheduled maintenance tonight from 11 PM to 3 AM. During this time, you may experience difficulty accessing course materials and submitting assignments. Please plan accordingly.',
    type: 'urgent',
    priority: 'high',
    targetAudience: 'all',
    lecturer: 'IT Support Team',
    lecturerAvatar: '🔧',
    createdAt: '2025-07-26',
    publishedAt: '2025-07-26',
    expiresAt: '2025-07-27',
    pinned: true,
    read: true
  },
  {
    id: '3',
    title: 'Office Hours Change This Week',
    content: 'Due to a faculty meeting, my office hours on Thursday will be moved from 2-4 PM to 10-12 PM. Friday office hours remain unchanged (3-5 PM). You can still book appointments through the EduLink system.',
    type: 'schedule',
    priority: 'medium',
    targetAudience: 'all',
    lecturer: 'Dr. Sarah Johnson',
    lecturerAvatar: '👩‍🏫',
    createdAt: '2025-07-24',
    publishedAt: '2025-07-24',
    pinned: false,
    read: true
  },
  {
    id: '4',
    title: 'New Study Group Session',
    content: 'I\'m organizing an optional study group session for MATH202 this Saturday from 2-4 PM in Room 301. We\'ll review calculus concepts and work through practice problems. No need to register, just show up!',
    type: 'course',
    priority: 'low',
    targetAudience: 'course-specific',
    course: 'MATH202',
    lecturer: 'Prof. Michael Chen',
    lecturerAvatar: '👨‍🏫',
    createdAt: '2025-07-23',
    publishedAt: '2025-07-23',
    pinned: false,
    read: false
  },
  {
    id: '5',
    title: 'Library Extended Hours During Finals',
    content: 'Good news! The university library will be extending its hours during finals week. We\'ll be open 24/7 from Monday to Friday. Additional study spaces and computers will also be available.',
    type: 'general',
    priority: 'medium',
    targetAudience: 'all',
    lecturer: 'Library Administration',
    lecturerAvatar: '📚',
    createdAt: '2025-07-22',
    publishedAt: '2025-07-22',
    pinned: false,
    read: true
  }
]

const typeFilters = ['all', 'general', 'urgent', 'course', 'schedule', 'system']
const priorityFilters = ['all', 'high', 'medium', 'low']
const readFilters = ['all', 'unread', 'read']

export default function StudentAnnouncementsPage() {
  const [announcements, setAnnouncements] = useState<Announcement[]>(mockAnnouncements)
  const [searchTerm, setSearchTerm] = useState('')
  const [typeFilter, setTypeFilter] = useState('all')
  const [priorityFilter, setPriorityFilter] = useState('all')
  const [readFilter, setReadFilter] = useState('all')
  const [selectedAnnouncement, setSelectedAnnouncement] = useState<Announcement | null>(null)

  // Mark announcement as read when viewed
  const handleViewAnnouncement = (announcement: Announcement) => {
    if (!announcement.read) {
      setAnnouncements(announcements.map(a => 
        a.id === announcement.id ? { ...a, read: true } : a
      ))
    }
    setSelectedAnnouncement(announcement)
  }

  const handleMarkAsRead = (id: string) => {
    setAnnouncements(announcements.map(a => 
      a.id === id ? { ...a, read: true } : a
    ))
  }

  const handleMarkAllAsRead = () => {
    setAnnouncements(announcements.map(a => ({ ...a, read: true })))
  }

  // Filter announcements
  const filteredAnnouncements = announcements.filter(announcement => {
    const matchesSearch = announcement.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         announcement.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         announcement.lecturer.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = typeFilter === 'all' || announcement.type === typeFilter
    const matchesPriority = priorityFilter === 'all' || announcement.priority === priorityFilter
    const matchesRead = readFilter === 'all' || 
                       (readFilter === 'read' && announcement.read) ||
                       (readFilter === 'unread' && !announcement.read)
    
    return matchesSearch && matchesType && matchesPriority && matchesRead
  })

  // Sort announcements (pinned first, then by date)
  const sortedAnnouncements = filteredAnnouncements.sort((a, b) => {
    if (a.pinned && !b.pinned) return -1
    if (!a.pinned && b.pinned) return 1
    return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
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

  const unreadCount = announcements.filter(a => !a.read).length

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Announcements</h1>
          <p className="text-gray-600">Stay updated with the latest news and information from your lecturers</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="text-2xl font-bold text-blue-600">{announcements.length}</div>
            <div className="text-sm text-gray-600">Total Announcements</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="text-2xl font-bold text-red-600">{unreadCount}</div>
            <div className="text-sm text-gray-600">Unread</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="text-2xl font-bold text-yellow-600">
              {announcements.filter(a => a.pinned).length}
            </div>
            <div className="text-sm text-gray-600">Pinned</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="text-2xl font-bold text-purple-600">
              {announcements.filter(a => a.priority === 'high').length}
            </div>
            <div className="text-sm text-gray-600">High Priority</div>
          </div>
        </div>

        {/* Filters & Actions */}
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
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                {typeFilters.map(type => (
                  <option key={type} value={type}>
                    {type === 'all' ? 'All Types' : type.charAt(0).toUpperCase() + type.slice(1)}
                  </option>
                ))}
              </select>

              <select
                value={priorityFilter}
                onChange={(e) => setPriorityFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                {priorityFilters.map(priority => (
                  <option key={priority} value={priority}>
                    {priority === 'all' ? 'All Priorities' : priority.charAt(0).toUpperCase() + priority.slice(1)}
                  </option>
                ))}
              </select>

              <select
                value={readFilter}
                onChange={(e) => setReadFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                {readFilters.map(filter => (
                  <option key={filter} value={filter}>
                    {filter === 'all' ? 'All' : filter.charAt(0).toUpperCase() + filter.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            {/* Actions */}
            <div className="flex gap-2">
              {unreadCount > 0 && (
                <button
                  onClick={handleMarkAllAsRead}
                  className="bg-blue-50 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-100 transition-colors"
                >
                  Mark All as Read
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Announcements List */}
        <div className="space-y-4">
          {sortedAnnouncements.length === 0 ? (
            <div className="bg-white rounded-lg shadow-sm p-8 text-center">
              <div className="text-gray-500 mb-4">No announcements found matching your filters</div>
              <div className="text-sm text-gray-400">Try adjusting your search or filter criteria</div>
            </div>
          ) : (
            sortedAnnouncements.map((announcement) => (
              <div
                key={announcement.id}
                className={`bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow cursor-pointer border-l-4 ${
                  !announcement.read 
                    ? 'border-l-blue-500 bg-blue-50' 
                    : announcement.pinned 
                      ? 'border-l-yellow-500' 
                      : 'border-l-gray-200'
                }`}
                onClick={() => handleViewAnnouncement(announcement)}
              >
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      {announcement.pinned && <span className="text-yellow-500">📌</span>}
                      {!announcement.read && <span className="w-2 h-2 bg-blue-500 rounded-full"></span>}
                      
                      <h3 className={`text-lg font-semibold ${!announcement.read ? 'text-blue-900' : 'text-gray-900'}`}>
                        {announcement.title}
                      </h3>
                      
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(announcement.type)}`}>
                        {announcement.type.charAt(0).toUpperCase() + announcement.type.slice(1)}
                      </span>
                      
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(announcement.priority)}`}>
                        {announcement.priority.charAt(0).toUpperCase() + announcement.priority.slice(1)}
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-2xl">{announcement.lecturerAvatar}</span>
                      <div>
                        <div className="font-medium text-gray-900">{announcement.lecturer}</div>
                        <div className="text-sm text-gray-500">
                          {announcement.publishedAt}
                          {announcement.course && <span className="ml-2">• {announcement.course}</span>}
                          {announcement.expiresAt && (
                            <span className="ml-2 text-orange-600">• Expires {announcement.expiresAt}</span>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <p className="text-gray-600 mb-3 line-clamp-3">{announcement.content}</p>
                    
                    {announcement.attachments && announcement.attachments.length > 0 && (
                      <div className="flex gap-2 mb-3">
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
                      onClick={(e) => {
                        e.stopPropagation()
                        handleViewAnnouncement(announcement)
                      }}
                      className="bg-blue-50 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-100 transition-colors text-sm"
                    >
                      View Details
                    </button>
                    
                    {!announcement.read && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          handleMarkAsRead(announcement.id)
                        }}
                        className="bg-gray-50 text-gray-600 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors text-sm"
                      >
                        Mark as Read
                      </button>
                    )}

                    {announcement.course && (
                      <Link
                        href={`/student/resources?course=${encodeURIComponent(announcement.course)}`}
                        className="bg-green-50 text-green-600 px-4 py-2 rounded-lg hover:bg-green-100 transition-colors text-sm text-center"
                        onClick={(e) => e.stopPropagation()}
                      >
                        Course Resources
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Announcement Detail Modal */}
        {selectedAnnouncement && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-start mb-6">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    {selectedAnnouncement.pinned && <span className="text-yellow-500">📌</span>}
                    <h2 className="text-2xl font-bold text-gray-900">{selectedAnnouncement.title}</h2>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getTypeColor(selectedAnnouncement.type)}`}>
                      {selectedAnnouncement.type.charAt(0).toUpperCase() + selectedAnnouncement.type.slice(1)}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getPriorityColor(selectedAnnouncement.priority)}`}>
                      {selectedAnnouncement.priority.charAt(0).toUpperCase() + selectedAnnouncement.priority.slice(1)} Priority
                    </span>
                    {selectedAnnouncement.course && (
                      <span className="px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                        {selectedAnnouncement.course}
                      </span>
                    )}
                  </div>
                </div>
                <button
                  onClick={() => setSelectedAnnouncement(null)}
                  className="text-gray-400 hover:text-gray-600 text-2xl"
                >
                  ×
                </button>
              </div>

              <div className="flex items-center gap-3 mb-6 p-4 bg-gray-50 rounded-lg">
                <span className="text-3xl">{selectedAnnouncement.lecturerAvatar}</span>
                <div>
                  <div className="font-semibold text-gray-900">{selectedAnnouncement.lecturer}</div>
                  <div className="text-sm text-gray-600">
                    Published on {selectedAnnouncement.publishedAt}
                    {selectedAnnouncement.expiresAt && (
                      <span className="ml-2 text-orange-600">• Expires {selectedAnnouncement.expiresAt}</span>
                    )}
                  </div>
                </div>
              </div>

              <div className="prose max-w-none mb-6">
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                  {selectedAnnouncement.content}
                </p>
              </div>

              {selectedAnnouncement.attachments && selectedAnnouncement.attachments.length > 0 && (
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-3">Attachments</h4>
                  <div className="space-y-2">
                    {selectedAnnouncement.attachments.map((attachment, idx) => (
                      <a
                        key={idx}
                        href={attachment.url}
                        className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                      >
                        <span className="text-blue-600">📎</span>
                        <span className="font-medium text-gray-900">{attachment.name}</span>
                        <span className="text-sm text-gray-500">({attachment.type.toUpperCase()})</span>
                      </a>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex gap-3 pt-4 border-t">
                <button
                  onClick={() => setSelectedAnnouncement(null)}
                  className="bg-gray-100 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-200"
                >
                  Close
                </button>
                {selectedAnnouncement.course && (
                  <Link
                    href={`/student/resources?course=${encodeURIComponent(selectedAnnouncement.course)}`}
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
                  >
                    View Course Resources
                  </Link>
                )}
                <Link
                  href={`/student/appointments?lecturer=${encodeURIComponent(selectedAnnouncement.lecturer)}`}
                  className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700"
                >
                  Book Appointment
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}