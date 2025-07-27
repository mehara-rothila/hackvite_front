// app/notifications/page.tsx
'use client'

import { useState } from 'react'
import Link from 'next/link'

interface Notification {
  id: string
  type: 'query' | 'appointment' | 'announcement' | 'grade' | 'message' | 'system' | 'reminder'
  title: string
  description: string
  timestamp: string
  isRead: boolean
  priority: 'low' | 'medium' | 'high'
  actionUrl?: string
  actionLabel?: string
  sender?: string
  course?: string
  category: 'academic' | 'administrative' | 'social' | 'system'
  relatedId?: string
  expiresAt?: string
}

const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'query',
    title: 'New Student Query',
    description: 'Alice Johnson submitted a high-priority question about Assignment 3 requirements',
    timestamp: '2025-07-27 14:30',
    isRead: false,
    priority: 'high',
    actionUrl: '/lecturer/queries/1',
    actionLabel: 'Respond to Query',
    sender: 'Alice Johnson',
    course: 'CS101',
    category: 'academic',
    relatedId: '1'
  },
  {
    id: '2',
    type: 'appointment',
    title: 'Appointment Booked',
    description: 'David Wilson booked a consultation session for tomorrow at 2:00 PM',
    timestamp: '2025-07-27 12:15',
    isRead: false,
    priority: 'medium',
    actionUrl: '/lecturer/appointments',
    actionLabel: 'View Appointment',
    sender: 'David Wilson',
    course: 'CS101',
    category: 'administrative',
    relatedId: '2'
  },
  {
    id: '3',
    type: 'message',
    title: 'New Message',
    description: 'Emma Brown sent you a message regarding office hours availability',
    timestamp: '2025-07-27 11:45',
    isRead: false,
    priority: 'low',
    actionUrl: '/lecturer/messages',
    actionLabel: 'Reply to Message',
    sender: 'Emma Brown',
    course: 'CS201',
    category: 'academic',
    relatedId: '3'
  },
  {
    id: '4',
    type: 'system',
    title: 'Course Enrollment Update',
    description: '3 new students enrolled in CS101. Current enrollment: 68/70',
    timestamp: '2025-07-27 10:20',
    isRead: true,
    priority: 'medium',
    actionUrl: '/lecturer/courses',
    actionLabel: 'View Course Details',
    course: 'CS101',
    category: 'administrative',
    relatedId: '4'
  },
  {
    id: '5',
    type: 'reminder',
    title: 'Upcoming Class Reminder',
    description: 'CS101 lecture scheduled for tomorrow at 10:00 AM in Room 101',
    timestamp: '2025-07-27 09:00',
    isRead: true,
    priority: 'medium',
    actionUrl: '/lecturer/courses/1',
    actionLabel: 'View Course',
    course: 'CS101',
    category: 'academic',
    relatedId: '5'
  },
  {
    id: '6',
    type: 'grade',
    title: 'Assignment Grading Complete',
    description: 'All submissions for Assignment 2 have been graded and released to students',
    timestamp: '2025-07-26 16:30',
    isRead: true,
    priority: 'low',
    actionUrl: '/lecturer/courses/1',
    actionLabel: 'View Grades',
    course: 'CS101',
    category: 'academic',
    relatedId: '6'
  },
  {
    id: '7',
    type: 'announcement',
    title: 'System Maintenance',
    description: 'EduLink Pro will undergo scheduled maintenance tonight from 11 PM to 1 AM',
    timestamp: '2025-07-26 14:00',
    isRead: true,
    priority: 'medium',
    category: 'system',
    relatedId: '7',
    expiresAt: '2025-07-28 01:00'
  },
  {
    id: '8',
    type: 'appointment',
    title: 'Appointment Cancelled',
    description: 'Sarah Kim cancelled her appointment scheduled for today at 3:00 PM',
    timestamp: '2025-07-26 13:15',
    isRead: true,
    priority: 'low',
    actionUrl: '/lecturer/appointments',
    actionLabel: 'View Schedule',
    sender: 'Sarah Kim',
    course: 'CS201',
    category: 'administrative',
    relatedId: '8'
  }
]

const notificationTypes = ['All', 'Query', 'Appointment', 'Message', 'Announcement', 'Grade', 'System', 'Reminder']
const priorities = ['All', 'High', 'Medium', 'Low']
const categories = ['All', 'Academic', 'Administrative', 'Social', 'System']
const courses = ['All', 'CS101', 'CS201', 'CS401']

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications)
  const [typeFilter, setTypeFilter] = useState('All')
  const [priorityFilter, setPriorityFilter] = useState('All')
  const [categoryFilter, setCategoryFilter] = useState('All')
  const [courseFilter, setCourseFilter] = useState('All')
  const [showOnlyUnread, setShowOnlyUnread] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')

  const handleMarkAsRead = (notificationId: string) => {
    setNotifications(notifications.map(notification => 
      notification.id === notificationId 
        ? { ...notification, isRead: true }
        : notification
    ))
  }

  const handleMarkAllAsRead = () => {
    setNotifications(notifications.map(notification => ({ ...notification, isRead: true })))
  }

  const handleDeleteNotification = (notificationId: string) => {
    if (confirm('Delete this notification?')) {
      setNotifications(notifications.filter(notification => notification.id !== notificationId))
    }
  }

  const handleDeleteAllRead = () => {
    if (confirm('Delete all read notifications?')) {
      setNotifications(notifications.filter(notification => !notification.isRead))
    }
  }

  // Filter notifications
  const filteredNotifications = notifications.filter(notification => {
    const matchesSearch = notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         notification.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (notification.sender && notification.sender.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesType = typeFilter === 'All' || notification.type === typeFilter.toLowerCase()
    const matchesPriority = priorityFilter === 'All' || notification.priority === priorityFilter.toLowerCase()
    const matchesCategory = categoryFilter === 'All' || notification.category === categoryFilter.toLowerCase()
    const matchesCourse = courseFilter === 'All' || notification.course === courseFilter
    const matchesRead = !showOnlyUnread || !notification.isRead
    
    return matchesSearch && matchesType && matchesPriority && matchesCategory && matchesCourse && matchesRead
  })

  // Sort notifications by timestamp (newest first) and read status
  const sortedNotifications = filteredNotifications.sort((a, b) => {
    // Unread notifications first
    if (!a.isRead && b.isRead) return -1
    if (a.isRead && !b.isRead) return 1
    
    // Then by priority
    const priorityOrder = { high: 3, medium: 2, low: 1 }
    if (priorityOrder[a.priority] !== priorityOrder[b.priority]) {
      return priorityOrder[b.priority] - priorityOrder[a.priority]
    }
    
    // Finally by timestamp (newest first)
    return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  })

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'query': return '❓'
      case 'appointment': return '📅'
      case 'message': return '💬'
      case 'announcement': return '📢'
      case 'grade': return '📊'
      case 'system': return '⚙️'
      case 'reminder': return '⏰'
      default: return '📄'
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

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'query': return 'bg-blue-100 text-blue-800'
      case 'appointment': return 'bg-purple-100 text-purple-800'
      case 'message': return 'bg-green-100 text-green-800'
      case 'announcement': return 'bg-yellow-100 text-yellow-800'
      case 'grade': return 'bg-indigo-100 text-indigo-800'
      case 'system': return 'bg-gray-100 text-gray-800'
      case 'reminder': return 'bg-pink-100 text-pink-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getTimeAgo = (timestamp: string) => {
    const now = new Date()
    const time = new Date(timestamp)
    const diff = now.getTime() - time.getTime()
    const minutes = Math.floor(diff / 60000)
    const hours = Math.floor(minutes / 60)
    const days = Math.floor(hours / 24)

    if (days > 0) return `${days} day${days > 1 ? 's' : ''} ago`
    if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} ago`
    if (minutes > 0) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`
    return 'Just now'
  }

  const unreadCount = notifications.filter(n => !n.isRead).length
  const highPriorityCount = notifications.filter(n => n.priority === 'high' && !n.isRead).length
  const todayCount = notifications.filter(n => 
    new Date(n.timestamp).toDateString() === new Date().toDateString()
  ).length

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Notifications</h1>
          <p className="text-gray-600">Stay updated with your latest activities and messages</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="text-2xl font-bold text-blue-600">{notifications.length}</div>
            <div className="text-sm text-gray-600">Total Notifications</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="text-2xl font-bold text-red-600">{unreadCount}</div>
            <div className="text-sm text-gray-600">Unread</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="text-2xl font-bold text-orange-600">{highPriorityCount}</div>
            <div className="text-sm text-gray-600">High Priority</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="text-2xl font-bold text-green-600">{todayCount}</div>
            <div className="text-sm text-gray-600">Today</div>
          </div>
        </div>

        {/* Filters & Actions */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="flex flex-col sm:flex-row gap-4 flex-1">
              {/* Search */}
              <input
                type="text"
                placeholder="Search notifications..."
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
                {notificationTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>

              <select
                value={priorityFilter}
                onChange={(e) => setPriorityFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                {priorities.map(priority => (
                  <option key={priority} value={priority}>{priority}</option>
                ))}
              </select>

              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>

              <select
                value={courseFilter}
                onChange={(e) => setCourseFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                {courses.map(course => (
                  <option key={course} value={course}>{course}</option>
                ))}
              </select>

              <label className="flex items-center gap-2 px-4 py-2">
                <input
                  type="checkbox"
                  checked={showOnlyUnread}
                  onChange={(e) => setShowOnlyUnread(e.target.checked)}
                  className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <span className="text-sm text-gray-700">Unread only</span>
              </label>
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
              <button
                onClick={handleDeleteAllRead}
                className="bg-gray-50 text-gray-600 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                Clear Read
              </button>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Link href="/lecturer/queries" className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow group">
            <div className="text-center">
              <div className="text-2xl mb-2 group-hover:scale-110 transition-transform">❓</div>
              <div className="font-medium text-gray-900">Student Queries</div>
              <div className="text-sm text-gray-600">
                {notifications.filter(n => n.type === 'query' && !n.isRead).length} unread
              </div>
            </div>
          </Link>
          
          <Link href="/lecturer/appointments" className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow group">
            <div className="text-center">
              <div className="text-2xl mb-2 group-hover:scale-110 transition-transform">📅</div>
              <div className="font-medium text-gray-900">Appointments</div>
              <div className="text-sm text-gray-600">
                {notifications.filter(n => n.type === 'appointment' && !n.isRead).length} updates
              </div>
            </div>
          </Link>
          
          <Link href="/lecturer/messages" className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow group">
            <div className="text-center">
              <div className="text-2xl mb-2 group-hover:scale-110 transition-transform">💬</div>
              <div className="font-medium text-gray-900">Messages</div>
              <div className="text-sm text-gray-600">
                {notifications.filter(n => n.type === 'message' && !n.isRead).length} unread
              </div>
            </div>
          </Link>
          
          <Link href="/lecturer/announcements" className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow group">
            <div className="text-center">
              <div className="text-2xl mb-2 group-hover:scale-110 transition-transform">📢</div>
              <div className="font-medium text-gray-900">Announcements</div>
              <div className="text-sm text-gray-600">Create new posts</div>
            </div>
          </Link>
        </div>

        {/* Notifications List */}
        <div className="space-y-3">
          {sortedNotifications.length === 0 ? (
            <div className="bg-white rounded-lg shadow-sm p-8 text-center">
              <div className="text-4xl mb-4">🔔</div>
              <div className="text-gray-500 mb-4">No notifications found</div>
              <div className="text-sm text-gray-400">
                {showOnlyUnread 
                  ? "You're all caught up! No unread notifications." 
                  : "Try adjusting your search or filter criteria"
                }
              </div>
            </div>
          ) : (
            sortedNotifications.map((notification) => (
              <div
                key={notification.id}
                className={`bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow border-l-4 ${
                  !notification.isRead 
                    ? 'border-l-blue-500 bg-blue-50' 
                    : notification.priority === 'high' 
                      ? 'border-l-red-500' 
                      : 'border-l-gray-200'
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className="text-2xl mt-1">
                    {getNotificationIcon(notification.type)}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      {!notification.isRead && <span className="w-2 h-2 bg-blue-500 rounded-full"></span>}
                      
                      <h3 className={`font-semibold ${!notification.isRead ? 'text-blue-900' : 'text-gray-900'}`}>
                        {notification.title}
                      </h3>
                      
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(notification.type)}`}>
                        {notification.type.charAt(0).toUpperCase() + notification.type.slice(1)}
                      </span>
                      
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(notification.priority)}`}>
                        {notification.priority.charAt(0).toUpperCase() + notification.priority.slice(1)}
                      </span>
                    </div>
                    
                    <p className="text-gray-600 mb-2">{notification.description}</p>
                    
                    <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-3">
                      <span>📅 {getTimeAgo(notification.timestamp)}</span>
                      {notification.sender && <span>👤 {notification.sender}</span>}
                      {notification.course && <span>📚 {notification.course}</span>}
                    </div>

                    {notification.expiresAt && new Date(notification.expiresAt) > new Date() && (
                      <div className="mb-3 p-2 bg-yellow-50 rounded text-sm text-yellow-800">
                        ⏰ Expires: {new Date(notification.expiresAt).toLocaleString()}
                      </div>
                    )}
                  </div>
                  
                  <div className="flex flex-col gap-2">
                    {notification.actionUrl && (
                      <Link
                        href={notification.actionUrl}
                        onClick={() => handleMarkAsRead(notification.id)}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm text-center"
                      >
                        {notification.actionLabel || 'View'}
                      </Link>
                    )}
                    
                    {!notification.isRead && (
                      <button
                        onClick={() => handleMarkAsRead(notification.id)}
                        className="bg-gray-50 text-gray-600 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors text-sm"
                      >
                        Mark as Read
                      </button>
                    )}
                    
                    <button
                      onClick={() => handleDeleteNotification(notification.id)}
                      className="bg-red-50 text-red-600 px-4 py-2 rounded-lg hover:bg-red-100 transition-colors text-sm"
                    >
                      🗑️ Delete
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Notification Settings Link */}
        <div className="mt-8 text-center">
          <Link
            href="/notifications/settings"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 text-sm"
          >
            ⚙️ Notification Settings
          </Link>
        </div>
      </div>
    </div>
  )
}