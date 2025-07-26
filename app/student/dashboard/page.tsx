// app/student/dashboard/page.tsx
'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

interface DashboardStats {
  totalQueries: number
  pendingQueries: number
  unreadAnnouncements: number
  upcomingAppointments: number
  unreadMessages: number
}

interface RecentActivity {
  id: string
  type: 'query' | 'announcement' | 'appointment' | 'message'
  title: string
  description: string
  timestamp: string
  priority?: 'low' | 'medium' | 'high'
  read?: boolean
}

interface UpcomingAppointment {
  id: string
  lecturer: string
  subject: string
  date: string
  time: string
  location: string
  status: 'confirmed' | 'pending'
}

// Mock data - in real app would come from API
const mockStats: DashboardStats = {
  totalQueries: 8,
  pendingQueries: 2,
  unreadAnnouncements: 3,
  upcomingAppointments: 1,
  unreadMessages: 5
}

const mockRecentActivity: RecentActivity[] = [
  {
    id: '1',
    type: 'announcement',
    title: 'Mid-term Exam Schedule Released',
    description: 'Dr. Sarah Johnson posted an important announcement about CS101 exams',
    timestamp: '2 hours ago',
    priority: 'high',
    read: false
  },
  {
    id: '2',
    type: 'query',
    title: 'Assignment Extension Request',
    description: 'Your query about assignment deadline has been approved',
    timestamp: '5 hours ago',
    read: true
  },
  {
    id: '3',
    type: 'message',
    title: 'New message from Dr. Sarah Johnson',
    description: 'Regarding your question about the lab assignment',
    timestamp: '1 day ago',
    read: false
  },
  {
    id: '4',
    type: 'appointment',
    title: 'Appointment Confirmed',
    description: 'Your office hours meeting with Prof. Michael Chen is confirmed',
    timestamp: '2 days ago',
    read: true
  }
]

const mockUpcomingAppointments: UpcomingAppointment[] = [
  {
    id: '1',
    lecturer: 'Prof. Michael Chen',
    subject: 'Calculus II Questions',
    date: '2025-07-28',
    time: '2:00 PM',
    location: 'Office 301B',
    status: 'confirmed'
  }
]

export default function StudentDashboard() {
  const [stats, setStats] = useState<DashboardStats>(mockStats)
  const [recentActivity, setRecentActivity] = useState<RecentActivity[]>(mockRecentActivity)
  const [upcomingAppointments, setUpcomingAppointments] = useState<UpcomingAppointment[]>(mockUpcomingAppointments)
  const [currentTime, setCurrentTime] = useState<string>('')

  useEffect(() => {
    // Update current time
    setCurrentTime(new Date().toLocaleString())
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleString())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'query': return '❓'
      case 'announcement': return '📢'
      case 'appointment': return '📅'
      case 'message': return '💬'
      default: return '📄'
    }
  }

  const getActivityColor = (type: string, priority?: string) => {
    if (priority === 'high') return 'bg-red-50 border-l-red-500'
    
    switch (type) {
      case 'query': return 'bg-blue-50 border-l-blue-500'
      case 'announcement': return 'bg-green-50 border-l-green-500'
      case 'appointment': return 'bg-purple-50 border-l-purple-500'
      case 'message': return 'bg-yellow-50 border-l-yellow-500'
      default: return 'bg-gray-50 border-l-gray-500'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back, Student!</h1>
              <p className="text-gray-600">Here's what's happening with your studies today</p>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-500">Current time</div>
              <div className="text-lg font-medium text-gray-900">{currentTime}</div>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
          <Link href="/student/queries" className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow group">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-blue-600">{stats.totalQueries}</div>
                <div className="text-sm text-gray-600">Total Queries</div>
                {stats.pendingQueries > 0 && (
                  <div className="text-xs text-orange-600 mt-1">{stats.pendingQueries} pending</div>
                )}
              </div>
              <div className="text-2xl group-hover:scale-110 transition-transform">❓</div>
            </div>
          </Link>

          <Link href="/student/announcements" className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow group">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-green-600">{stats.unreadAnnouncements}</div>
                <div className="text-sm text-gray-600">New Announcements</div>
              </div>
              <div className="text-2xl group-hover:scale-110 transition-transform">📢</div>
            </div>
          </Link>

          <Link href="/student/appointments" className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow group">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-purple-600">{stats.upcomingAppointments}</div>
                <div className="text-sm text-gray-600">Appointments</div>
              </div>
              <div className="text-2xl group-hover:scale-110 transition-transform">📅</div>
            </div>
          </Link>

          <Link href="/student/conversations" className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow group">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-yellow-600">{stats.unreadMessages}</div>
                <div className="text-sm text-gray-600">Unread Messages</div>
              </div>
              <div className="text-2xl group-hover:scale-110 transition-transform">💬</div>
            </div>
          </Link>

          <Link href="/student/resources" className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow group">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-indigo-600">24</div>
                <div className="text-sm text-gray-600">Course Resources</div>
              </div>
              <div className="text-2xl group-hover:scale-110 transition-transform">📚</div>
            </div>
          </Link>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Activity */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Recent Activity</h2>
                <Link href="/student/queries" className="text-sm text-blue-600 hover:text-blue-800">
                  View All
                </Link>
              </div>

              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <div
                    key={activity.id}
                    className={`p-4 rounded-lg border-l-4 ${getActivityColor(activity.type, activity.priority)} ${
                      !activity.read ? 'font-medium' : ''
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <span className="text-xl">{getActivityIcon(activity.type)}</span>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-medium text-gray-900">{activity.title}</h3>
                          {!activity.read && <span className="w-2 h-2 bg-blue-500 rounded-full"></span>}
                          {activity.priority === 'high' && (
                            <span className="px-2 py-1 text-xs bg-red-100 text-red-700 rounded">High Priority</span>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{activity.description}</p>
                        <div className="text-xs text-gray-500">{activity.timestamp}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {recentActivity.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <div className="text-4xl mb-4">📭</div>
                  <div>No recent activity</div>
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
                  href="/student/queries"
                  className="block w-full bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 transition-colors text-center"
                >
                  ❓ Submit New Query
                </Link>
                <Link
                  href="/student/appointments"
                  className="block w-full bg-purple-600 text-white px-4 py-3 rounded-lg hover:bg-purple-700 transition-colors text-center"
                >
                  📅 Book Appointment
                </Link>
                <Link
                  href="/edubot"
                  className="block w-full bg-green-600 text-white px-4 py-3 rounded-lg hover:bg-green-700 transition-colors text-center"
                >
                  🤖 Ask EduBot
                </Link>
                <Link
                  href="/student/conversations"
                  className="block w-full bg-yellow-600 text-white px-4 py-3 rounded-lg hover:bg-yellow-700 transition-colors text-center"
                >
                  💬 New Message
                </Link>
              </div>
            </div>

            {/* Upcoming Appointments */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Upcoming Appointments</h3>
                <Link href="/student/appointments" className="text-sm text-blue-600 hover:text-blue-800">
                  View All
                </Link>
              </div>

              {upcomingAppointments.length > 0 ? (
                <div className="space-y-3">
                  {upcomingAppointments.map((appointment) => (
                    <div key={appointment.id} className="p-3 bg-purple-50 rounded-lg">
                      <div className="font-medium text-gray-900">{appointment.subject}</div>
                      <div className="text-sm text-gray-600">{appointment.lecturer}</div>
                      <div className="text-sm text-gray-500 mt-1">
                        📅 {appointment.date} at {appointment.time}
                      </div>
                      <div className="text-sm text-gray-500">📍 {appointment.location}</div>
                      <div className="mt-2">
                        <span className={`px-2 py-1 text-xs rounded ${
                          appointment.status === 'confirmed' 
                            ? 'bg-green-100 text-green-700' 
                            : 'bg-yellow-100 text-yellow-700'
                        }`}>
                          {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6 text-gray-500">
                  <div className="text-3xl mb-2">📅</div>
                  <div className="text-sm">No upcoming appointments</div>
                  <Link
                    href="/student/appointments"
                    className="text-sm text-blue-600 hover:text-blue-800 mt-2 inline-block"
                  >
                    Book an appointment
                  </Link>
                </div>
              )}
            </div>

            {/* Course Quick Access */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">My Courses</h3>
              <div className="space-y-2">
                <Link
                  href="/student/resources?course=CS101"
                  className="block p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
                >
                  <div className="font-medium text-blue-900">CS101</div>
                  <div className="text-sm text-blue-600">Introduction to Programming</div>
                </Link>
                <Link
                  href="/student/resources?course=MATH202"
                  className="block p-3 bg-green-50 rounded-lg hover:bg-green-100 transition-colors"
                >
                  <div className="font-medium text-green-900">MATH202</div>
                  <div className="text-sm text-green-600">Calculus II</div>
                </Link>
                <Link
                  href="/student/resources?course=ENG110"
                  className="block p-3 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors"
                >
                  <div className="font-medium text-purple-900">ENG110</div>
                  <div className="text-sm text-purple-600">Academic Writing</div>
                </Link>
              </div>
            </div>

            {/* Help & Support */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Need Help?</h3>
              <div className="space-y-3">
                <Link
                  href="/edubot"
                  className="block p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <span>🤖</span>
                    <div>
                      <div className="font-medium text-gray-900">Ask EduBot</div>
                      <div className="text-sm text-gray-600">Get instant answers</div>
                    </div>
                  </div>
                </Link>
                <Link
                  href="/student/queries"
                  className="block p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <span>❓</span>
                    <div>
                      <div className="font-medium text-gray-900">Submit Query</div>
                      <div className="text-sm text-gray-600">Get help from lecturers</div>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}