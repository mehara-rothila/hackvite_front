// app/lecturer/dashboard/page.tsx
'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { AuthService } from '../../../lib/auth'
import { LecturerUser } from '../../../types'

export default function LecturerDashboard() {
  const [user, setUser] = useState<LecturerUser | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const currentUser = AuthService.getCurrentUser()
    
    if (!currentUser) {
      router.push('/login')
      return
    }
    
    if (currentUser.role !== 'lecturer') {
      router.push('/student/dashboard')
      return
    }
    
    setUser(currentUser as LecturerUser)
    setLoading(false)
  }, [router])

  const handleLogout = () => {
    AuthService.logout()
    router.push('/')
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-600"></div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Header */}
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/" className="flex items-center">
                <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">E</span>
                </div>
                <span className="ml-3 text-xl font-bold text-gray-900">EduLink Pro</span>
              </Link>
              <div className="ml-8">
                <span className="text-sm text-gray-600">Lecturer Portal</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-700">
                Welcome, <span className="font-medium">{user.title} {user.lastName}</span>
              </div>
              <button
                onClick={handleLogout}
                className="text-sm text-gray-600 hover:text-red-600 transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome back, {user.title} {user.lastName}! 👨‍🏫
          </h1>
          <p className="text-gray-600 mt-2">
            {user.department} • {user.university}
            {user.specialization && ` • ${user.specialization}`}
          </p>
          {user.officeLocation && (
            <p className="text-sm text-gray-500 mt-1">
              📍 Office: {user.officeLocation}
            </p>
          )}
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                  <span className="text-red-600 text-lg">📥</span>
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Pending Queries</p>
                <p className="text-2xl font-semibold text-gray-900">12</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-green-600 text-lg">📅</span>
                </div>
              </div>
              <div className="ml-4">
                {/* FIX: Replaced ' with ' to avoid unescaped entity error. */}
                <p className="text-sm font-medium text-gray-500">Today's Appointments</p>
                <p className="text-2xl font-semibold text-gray-900">4</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 text-lg">👥</span>
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Students Advised</p>
                <p className="text-2xl font-semibold text-gray-900">87</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                  <span className="text-purple-600 text-lg">📊</span>
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Response Rate</p>
                <p className="text-2xl font-semibold text-gray-900">94%</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Student Queries */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow">
              <div className="px-6 py-4 border-b border-gray-200">
                <div className="flex justify-between items-center">
                  <h2 className="text-lg font-medium text-gray-900">Recent Student Queries</h2>
                  <span className="px-2 py-1 text-xs bg-red-100 text-red-800 rounded-full">12 pending</span>
                </div>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {[
                    { 
                      student: 'Alice Johnson', 
                      subject: 'Project Proposal Feedback', 
                      course: 'CS 401',
                      time: '30 mins ago', 
                      priority: 'high',
                      unread: true 
                    },
                    { 
                      student: 'Mark Chen', 
                      subject: 'Assignment Extension Request', 
                      course: 'CS 301',
                      time: '2 hours ago', 
                      priority: 'medium',
                      unread: true 
                    },
                    { 
                      student: 'Sarah Williams', 
                      subject: 'Clarification on Lecture Material', 
                      course: 'CS 201',
                      time: '5 hours ago', 
                      priority: 'low',
                      unread: false 
                    }
                  ].map((query, index) => (
                    <div key={index} className={`flex items-start space-x-3 p-4 rounded-lg cursor-pointer transition-colors ${
                      query.unread ? 'bg-blue-50 hover:bg-blue-100 border border-blue-200' : 'hover:bg-gray-50'
                    }`}>
                      <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                        <span className="text-sm font-medium text-gray-600">
                          {query.student.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <p className={`text-sm ${query.unread ? 'font-semibold text-gray-900' : 'font-medium text-gray-700'}`}>
                              {query.student}
                            </p>
                            <span className="text-xs text-gray-500">• {query.course}</span>
                            <span className={`px-2 py-1 text-xs rounded-full ${
                              query.priority === 'high' ? 'bg-red-100 text-red-800' :
                              query.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-gray-100 text-gray-800'
                            }`}>
                              {query.priority}
                            </span>
                          </div>
                          <p className="text-xs text-gray-500">{query.time}</p>
                        </div>
                        <p className={`text-sm ${query.unread ? 'text-gray-900' : 'text-gray-600'} truncate mt-1`}>
                          {query.subject}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4">
                  <Link 
                    href="/lecturer/queries" 
                    className="text-sm text-purple-600 hover:text-purple-700 font-medium"
                  >
                    View all queries →
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions & Schedule */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-medium text-gray-900">Quick Actions</h2>
              </div>
              <div className="p-6 space-y-3">
                <Link 
                  href="/lecturer/announcements/new"
                  className="flex items-center p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
                >
                  <span className="text-blue-600 text-lg mr-3">📢</span>
                  <span className="text-sm font-medium text-blue-700">Create Announcement</span>
                </Link>
                
                <Link 
                  href="/lecturer/office-hours"
                  className="flex items-center p-3 bg-green-50 rounded-lg hover:bg-green-100 transition-colors"
                >
                  <span className="text-green-600 text-lg mr-3">🕐</span>
                  <span className="text-sm font-medium text-green-700">Manage Office Hours</span>
                </Link>
                
                <Link 
                  href="/lecturer/analytics"
                  className="flex items-center p-3 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors"
                >
                  <span className="text-purple-600 text-lg mr-3">📊</span>
                  <span className="text-sm font-medium text-purple-700">View Analytics</span>
                </Link>
                
                <Link 
                  href="/lecturer/students"
                  className="flex items-center p-3 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors"
                >
                  <span className="text-orange-600 text-lg mr-3">👥</span>
                  <span className="text-sm font-medium text-orange-700">Manage Students</span>
                </Link>
              </div>
            </div>

            {/* Today's Schedule */}
            <div className="bg-white rounded-lg shadow">
              <div className="px-6 py-4 border-b border-gray-200">
                {/* FIX: Replaced ' with ' to avoid unescaped entity error. */}
                <h2 className="text-lg font-medium text-gray-900">Today's Schedule</h2>
              </div>
              <div className="p-6">
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <div>
                      <p className="text-sm font-medium text-gray-900">Office Hours</p>
                      <p className="text-xs text-gray-600">10:00 AM - 12:00 PM</p>
                    </div>
                    <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">Active</span>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                    <div>
                      <p className="text-sm font-medium text-gray-900">Meeting with Tom</p>
                      <p className="text-xs text-gray-600">2:00 PM - 2:30 PM</p>
                    </div>
                    <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">Upcoming</span>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                    <div>
                      <p className="text-sm font-medium text-gray-900">CS 401 Lecture</p>
                      <p className="text-xs text-gray-600">3:00 PM - 4:30 PM</p>
                    </div>
                    <span className="px-2 py-1 text-xs bg-yellow-100 text-yellow-800 rounded-full">Scheduled</span>
                  </div>
                </div>
                
                <div className="mt-4">
                  <Link 
                    href="/lecturer/appointments" 
                    className="text-sm text-purple-600 hover:text-purple-700 font-medium"
                  >
                    View full schedule →
                  </Link>
                </div>
              </div>
            </div>

            {/* Weekly Insights */}
            <div className="bg-white rounded-lg shadow">
              <div className="px-6 py-4 border-b border-gray-200">
                {/* FIX: Replaced ' with ' to avoid unescaped entity error. */}
                <h2 className="text-lg font-medium text-gray-900">This Week's Insights</h2>
              </div>
              <div className="p-6">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Messages Received</span>
                    <span className="text-sm font-medium text-gray-900">23</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Average Response Time</span>
                    <span className="text-sm font-medium text-gray-900">2.3 hours</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Appointments Completed</span>
                    <span className="text-sm font-medium text-gray-900">18</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Student Satisfaction</span>
                    <span className="text-sm font-medium text-green-600">4.8/5.0</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Navigation for Mobile */}
        <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
          <div className="grid grid-cols-4 py-2">
            <Link href="/lecturer/dashboard" className="flex flex-col items-center py-2 text-purple-600">
              <span className="text-lg">🏠</span>
              <span className="text-xs">Home</span>
            </Link>
            <Link href="/lecturer/queries" className="flex flex-col items-center py-2 text-gray-600">
              <span className="text-lg">📥</span>
              <span className="text-xs">Queries</span>
            </Link>
            <Link href="/lecturer/appointments" className="flex flex-col items-center py-2 text-gray-600">
              <span className="text-lg">📅</span>
              <span className="text-xs">Schedule</span>
            </Link>
            <Link href="/lecturer/analytics" className="flex flex-col items-center py-2 text-gray-600">
              <span className="text-lg">📊</span>
              <span className="text-xs">Analytics</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}