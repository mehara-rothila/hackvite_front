// app/student/dashboard/page.tsx
'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { AuthService } from '../../../lib/auth'
import { StudentUser } from '../../../types'

export default function StudentDashboard() {
  const [user, setUser] = useState<StudentUser | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const currentUser = AuthService.getCurrentUser()
    
    if (!currentUser) {
      router.push('/login')
      return
    }
    
    if (currentUser.role !== 'student') {
      router.push('/lecturer/dashboard')
      return
    }
    
    setUser(currentUser as StudentUser)
    setLoading(false)
  }, [router])

  const handleLogout = () => {
    AuthService.logout()
    router.push('/')
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
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
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">E</span>
                </div>
                <span className="ml-3 text-xl font-bold text-gray-900">EduLink Pro</span>
              </Link>
              <div className="ml-8">
                <span className="text-sm text-gray-600">Student Portal</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-700">
                Welcome, <span className="font-medium">{user.firstName}</span>
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
            Welcome back, {user.firstName}! 👋
          </h1>
          <p className="text-gray-600 mt-2">
            {user.department} • {user.yearOfStudy}{user.yearOfStudy === '1' ? 'st' : user.yearOfStudy === '2' ? 'nd' : user.yearOfStudy === '3' ? 'rd' : 'th'} Year • {user.university}
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 text-lg">💬</span>
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Active Conversations</p>
                <p className="text-2xl font-semibold text-gray-900">3</p>
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
                <p className="text-sm font-medium text-gray-500">Upcoming Appointments</p>
                <p className="text-2xl font-semibold text-gray-900">2</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                  <span className="text-orange-600 text-lg">📚</span>
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Enrolled Courses</p>
                <p className="text-2xl font-semibold text-gray-900">5</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                  <span className="text-purple-600 text-lg">🔔</span>
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Unread Messages</p>
                <p className="text-2xl font-semibold text-gray-900">7</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Messages */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-medium text-gray-900">Recent Messages</h2>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {[
                    { name: 'Prof. Sarah Johnson', subject: 'Assignment Feedback', time: '2 hours ago', unread: true },
                    { name: 'Dr. Michael Chen', subject: 'Office Hours Reminder', time: '5 hours ago', unread: true },
                    { name: 'Prof. Emily Davis', subject: 'Project Discussion', time: '1 day ago', unread: false }
                  ].map((message, index) => (
                    <div key={index} className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg cursor-pointer">
                      <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                        <span className="text-sm font-medium text-gray-600">
                          {message.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className={`text-sm ${message.unread ? 'font-semibold text-gray-900' : 'font-medium text-gray-700'}`}>
                            {message.name}
                          </p>
                          <p className="text-xs text-gray-500">{message.time}</p>
                        </div>
                        <p className={`text-sm ${message.unread ? 'text-gray-900' : 'text-gray-600'} truncate`}>
                          {message.subject}
                        </p>
                        {message.unread && (
                          <div className="w-2 h-2 bg-blue-600 rounded-full mt-1"></div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4">
                  <Link 
                    href="/student/conversations" 
                    className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                  >
                    View all conversations →
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions & Upcoming */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-medium text-gray-900">Quick Actions</h2>
              </div>
              <div className="p-6 space-y-3">
                <Link 
                  href="/student/conversations/new"
                  className="flex items-center p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
                >
                  <span className="text-blue-600 text-lg mr-3">💬</span>
                  <span className="text-sm font-medium text-blue-700">Start New Conversation</span>
                </Link>
                
                <Link 
                  href="/student/appointments/book"
                  className="flex items-center p-3 bg-green-50 rounded-lg hover:bg-green-100 transition-colors"
                >
                  <span className="text-green-600 text-lg mr-3">📅</span>
                  <span className="text-sm font-medium text-green-700">Book Appointment</span>
                </Link>
                
                <Link 
                  href="/edubot"
                  className="flex items-center p-3 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors"
                >
                  <span className="text-purple-600 text-lg mr-3">🤖</span>
                  <span className="text-sm font-medium text-purple-700">Ask EduBot</span>
                </Link>
                
                <Link 
                  href="/student/resources"
                  className="flex items-center p-3 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors"
                >
                  <span className="text-orange-600 text-lg mr-3">📁</span>
                  <span className="text-sm font-medium text-orange-700">Browse Resources</span>
                </Link>
              </div>
            </div>

            {/* Upcoming Appointments */}
            <div className="bg-white rounded-lg shadow">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-medium text-gray-900">Upcoming Appointments</h2>
              </div>
              <div className="p-6">
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="text-sm font-medium text-gray-900">Dr. Wilson</p>
                      <p className="text-xs text-gray-600">Tomorrow, 2:00 PM</p>
                    </div>
                    <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">Confirmed</span>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="text-sm font-medium text-gray-900">Prof. Martinez</p>
                      <p className="text-xs text-gray-600">Friday, 10:00 AM</p>
                    </div>
                    <span className="px-2 py-1 text-xs bg-yellow-100 text-yellow-800 rounded-full">Pending</span>
                  </div>
                </div>
                
                <div className="mt-4">
                  <Link 
                    href="/student/appointments" 
                    className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                  >
                    View all appointments →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Navigation for Mobile */}
        <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
          <div className="grid grid-cols-4 py-2">
            <Link href="/student/dashboard" className="flex flex-col items-center py-2 text-blue-600">
              <span className="text-lg">🏠</span>
              <span className="text-xs">Home</span>
            </Link>
            <Link href="/student/conversations" className="flex flex-col items-center py-2 text-gray-600">
              <span className="text-lg">💬</span>
              <span className="text-xs">Messages</span>
            </Link>
            <Link href="/student/appointments" className="flex flex-col items-center py-2 text-gray-600">
              <span className="text-lg">📅</span>
              <span className="text-xs">Appointments</span>
            </Link>
            <Link href="/edubot" className="flex flex-col items-center py-2 text-gray-600">
              <span className="text-lg">🤖</span>
              <span className="text-xs">EduBot</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}