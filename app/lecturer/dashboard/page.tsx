// app/lecturer/dashboard/page.tsx
'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

interface LecturerStats {
  totalQueries: number
  pendingQueries: number
  totalStudents: number
  upcomingAppointments: number
  publishedAnnouncements: number
  avgResponseTime: string
}

interface PendingQuery {
  id: string
  student: string
  title: string
  category: string
  priority: 'low' | 'medium' | 'high'
  course: string
  submittedAt: string
  urgencyScore: number
}

interface UpcomingAppointment {
  id: string
  student: string
  subject: string
  date: string
  time: string
  location: string
  type: 'office-hours' | 'consultation' | 'meeting'
}

interface RecentActivity {
  id: string
  type: 'query' | 'appointment' | 'message' | 'announcement'
  student?: string
  title: string
  description: string
  timestamp: string
  course?: string
}

// Mock data - in real app would come from API
const mockStats: LecturerStats = {
  totalQueries: 24,
  pendingQueries: 6,
  totalStudents: 89,
  upcomingAppointments: 3,
  publishedAnnouncements: 8,
  avgResponseTime: '4.2 hours'
}

const mockPendingQueries: PendingQuery[] = [
  {
    id: '1',
    student: 'Alice Johnson',
    title: 'Question about Assignment 3 requirements',
    category: 'Academic',
    priority: 'high',
    course: 'CS101',
    submittedAt: '2025-07-26 09:30 AM',
    urgencyScore: 8
  },
  {
    id: '2',
    student: 'Bob Smith',
    title: 'Cannot access lab materials',
    category: 'Technical',
    priority: 'medium',
    course: 'CS101',
    submittedAt: '2025-07-26 11:15 AM',
    urgencyScore: 6
  },
  {
    id: '3',
    student: 'Carol Davis',
    title: 'Office hours availability',
    category: 'Administrative',
    priority: 'low',
    course: 'General',
    submittedAt: '2025-07-26 02:20 PM',
    urgencyScore: 3
  }
]

const mockUpcomingAppointments: UpcomingAppointment[] = [
  {
    id: '1',
    student: 'David Wilson',
    subject: 'Project guidance',
    date: '2025-07-27',
    time: '2:00 PM',
    location: 'Office 201B',
    type: 'consultation'
  },
  {
    id: '2',
    student: 'Emma Brown',
    subject: 'Midterm preparation',
    date: '2025-07-27',
    time: '3:30 PM',
    location: 'Office 201B',
    type: 'office-hours'
  },
  {
    id: '3',
    student: 'Frank Lee',
    subject: 'Research discussion',
    date: '2025-07-28',
    time: '10:00 AM',
    location: 'Conference Room A',
    type: 'meeting'
  }
]

const mockRecentActivity: RecentActivity[] = [
  {
    id: '1',
    type: 'query',
    student: 'Alice Johnson',
    title: 'New high-priority query submitted',
    description: 'Student needs help with Assignment 3 requirements',
    timestamp: '30 minutes ago',
    course: 'CS101'
  },
  {
    id: '2',
    type: 'appointment',
    student: 'David Wilson',
    title: 'Appointment booked',
    description: 'Student scheduled consultation for tomorrow',
    timestamp: '2 hours ago'
  },
  {
    id: '3',
    type: 'message',
    student: 'Sarah Kim',
    title: 'New message received',
    description: 'Follow-up question about lab assignment',
    timestamp: '4 hours ago',
    course: 'CS101'
  },
  {
    id: '4',
    type: 'announcement',
    title: 'Announcement published',
    description: 'Mid-term exam schedule announcement went live',
    timestamp: '1 day ago',
    course: 'CS101'
  }
]

export default function LecturerDashboard() {
  const [stats, setStats] = useState<LecturerStats>(mockStats)
  const [pendingQueries, setPendingQueries] = useState<PendingQuery[]>(mockPendingQueries)
  const [upcomingAppointments, setUpcomingAppointments] = useState<UpcomingAppointment[]>(mockUpcomingAppointments)
  const [recentActivity, setRecentActivity] = useState<RecentActivity[]>(mockRecentActivity)
  const [currentTime, setCurrentTime] = useState<string>('')

  useEffect(() => {
    // Update current time
    setCurrentTime(new Date().toLocaleString())
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleString())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 border-l-red-500'
      case 'medium': return 'bg-orange-100 text-orange-800 border-l-orange-500'
      case 'low': return 'bg-green-100 text-green-800 border-l-green-500'
      default: return 'bg-gray-100 text-gray-800 border-l-gray-500'
    }
  }

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'query': return '❓'
      case 'appointment': return '📅'
      case 'message': return '💬'
      case 'announcement': return '📢'
      default: return '📄'
    }
  }

  const getAppointmentTypeColor = (type: string) => {
    switch (type) {
      case 'consultation': return 'bg-blue-100 text-blue-800'
      case 'office-hours': return 'bg-green-100 text-green-800'
      case 'meeting': return 'bg-purple-100 text-purple-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back, Dr. Johnson!</h1>
              <p className="text-gray-600">Here's an overview of your teaching activities</p>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-500">Current time</div>
              <div className="text-lg font-medium text-gray-900">{currentTime}</div>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-4 mb-8">
          <Link href="/lecturer/queries" className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow group">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-red-600">{stats.pendingQueries}</div>
                <div className="text-sm text-gray-600">Pending Queries</div>
                <div className="text-xs text-gray-500 mt-1">Need Response</div>
              </div>
              <div className="text-2xl group-hover:scale-110 transition-transform">⚠️</div>
            </div>
          </Link>

          <Link href="/lecturer/queries" className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow group">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-blue-600">{stats.totalQueries}</div>
                <div className="text-sm text-gray-600">Total Queries</div>
                <div className="text-xs text-gray-500 mt-1">All time</div>
              </div>
              <div className="text-2xl group-hover:scale-110 transition-transform">❓</div>
            </div>
          </Link>

          <Link href="/lecturer/appointments" className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow group">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-purple-600">{stats.upcomingAppointments}</div>
                <div className="text-sm text-gray-600">Appointments</div>
                <div className="text-xs text-gray-500 mt-1">This week</div>
              </div>
              <div className="text-2xl group-hover:scale-110 transition-transform">📅</div>
            </div>
          </Link>

          <Link href="/lecturer/announcements" className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow group">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-green-600">{stats.publishedAnnouncements}</div>
                <div className="text-sm text-gray-600">Announcements</div>
                <div className="text-xs text-gray-500 mt-1">Published</div>
              </div>
              <div className="text-2xl group-hover:scale-110 transition-transform">📢</div>
            </div>
          </Link>

          <Link href="/lecturer/messages" className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow group">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-indigo-600">{stats.totalStudents}</div>
                <div className="text-sm text-gray-600">Students</div>
                <div className="text-xs text-gray-500 mt-1">Total enrolled</div>
              </div>
              <div className="text-2xl group-hover:scale-110 transition-transform">👥</div>
            </div>
          </Link>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-yellow-600">{stats.avgResponseTime}</div>
                <div className="text-sm text-gray-600">Avg Response</div>
                <div className="text-xs text-gray-500 mt-1">This month</div>
              </div>
              <div className="text-2xl">⏱️</div>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Pending Queries - High Priority */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">Pending Queries</h2>
                  <p className="text-sm text-gray-500">Queries requiring your response</p>
                </div>
                <Link href="/lecturer/queries" className="text-sm text-blue-600 hover:text-blue-800">
                  View All
                </Link>
              </div>

              <div className="space-y-4">
                {pendingQueries.map((query) => (
                  <div
                    key={query.id}
                    className={`p-4 rounded-lg border-l-4 ${getPriorityColor(query.priority)}`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-medium text-gray-900">{query.title}</h3>
                          <span className={`px-2 py-1 text-xs rounded ${getPriorityColor(query.priority).replace('border-l-', 'bg-').replace('border-l-', '')}`}>
                            {query.priority.charAt(0).toUpperCase() + query.priority.slice(1)}
                          </span>
                        </div>
                        <div className="text-sm text-gray-600 mb-2">
                          <span className="font-medium">{query.student}</span> • {query.course} • {query.category}
                        </div>
                        <div className="text-xs text-gray-500">{query.submittedAt}</div>
                      </div>
                      <div className="flex gap-2">
                        <Link
                          href={`/lecturer/queries/${query.id}`}
                          className="bg-blue-50 text-blue-600 px-3 py-1 rounded text-sm hover:bg-blue-100"
                        >
                          Respond
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {pendingQueries.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <div className="text-4xl mb-4">✅</div>
                  <div>All caught up! No pending queries.</div>
                </div>
              )}
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <Link
                  href="/lecturer/announcements"
                  className="block w-full bg-green-600 text-white px-4 py-3 rounded-lg hover:bg-green-700 transition-colors text-center"
                >
                  📢 Create Announcement
                </Link>
                <Link
                  href="/lecturer/queries"
                  className="block w-full bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 transition-colors text-center"
                >
                  ❓ Review Queries
                </Link>
                <Link
                  href="/lecturer/appointments"
                  className="block w-full bg-purple-600 text-white px-4 py-3 rounded-lg hover:bg-purple-700 transition-colors text-center"
                >
                  📅 Manage Schedule
                </Link>
                <Link
                  href="/lecturer/resources"
                  className="block w-full bg-indigo-600 text-white px-4 py-3 rounded-lg hover:bg-indigo-700 transition-colors text-center"
                >
                  📚 Upload Resources
                </Link>
              </div>
            </div>

            {/* Upcoming Appointments */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Today's Schedule</h3>
                <Link href="/lecturer/appointments" className="text-sm text-blue-600 hover:text-blue-800">
                  View All
                </Link>
              </div>

              {upcomingAppointments.length > 0 ? (
                <div className="space-y-3">
                  {upcomingAppointments.slice(0, 3).map((appointment) => (
                    <div key={appointment.id} className="p-3 bg-purple-50 rounded-lg">
                      <div className="flex items-center gap-2 mb-1">
                        <div className="font-medium text-gray-900">{appointment.time}</div>
                        <span className={`px-2 py-1 text-xs rounded ${getAppointmentTypeColor(appointment.type)}`}>
                          {appointment.type.replace('-', ' ')}
                        </span>
                      </div>
                      <div className="text-sm text-gray-600">{appointment.student}</div>
                      <div className="text-sm text-gray-600">{appointment.subject}</div>
                      <div className="text-xs text-gray-500 mt-1">📍 {appointment.location}</div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6 text-gray-500">
                  <div className="text-3xl mb-2">📅</div>
                  <div className="text-sm">No appointments today</div>
                </div>
              )}
            </div>

            {/* Course Overview */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">My Courses</h3>
              <div className="space-y-3">
                <Link
                  href="/lecturer/resources?course=CS101"
                  className="block p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
                >
                  <div className="font-medium text-blue-900">CS101</div>
                  <div className="text-sm text-blue-600">65 students • 4 pending queries</div>
                </Link>
                <Link
                  href="/lecturer/resources?course=CS201"
                  className="block p-3 bg-green-50 rounded-lg hover:bg-green-100 transition-colors"
                >
                  <div className="font-medium text-green-900">CS201</div>
                  <div className="text-sm text-green-600">24 students • 2 pending queries</div>
                </Link>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
              <div className="space-y-3">
                {recentActivity.slice(0, 4).map((activity) => (
                  <div key={activity.id} className="flex items-start gap-3 p-2">
                    <span className="text-lg">{getActivityIcon(activity.type)}</span>
                    <div className="flex-1">
                      <div className="font-medium text-gray-900 text-sm">{activity.title}</div>
                      <div className="text-xs text-gray-600">{activity.description}</div>
                      <div className="text-xs text-gray-500 mt-1">{activity.timestamp}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Teaching Analytics Section */}
        <div className="mt-8">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Teaching Overview</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">92%</div>
                <div className="text-sm text-gray-600">Query Resolution Rate</div>
                <div className="text-xs text-gray-500 mt-1">This month</div>
              </div>
              
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">4.8</div>
                <div className="text-sm text-gray-600">Average Rating</div>
                <div className="text-xs text-gray-500 mt-1">Student feedback</div>
              </div>
              
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600 mb-2">156</div>
                <div className="text-sm text-gray-600">Office Hours Attended</div>
                <div className="text-xs text-gray-500 mt-1">This semester</div>
              </div>
              
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-600 mb-2">85%</div>
                <div className="text-sm text-gray-600">Student Engagement</div>
                <div className="text-xs text-gray-500 mt-1">Above average</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}