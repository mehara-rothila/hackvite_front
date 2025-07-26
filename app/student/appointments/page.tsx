// app/student/appointments/page.tsx
'use client'

import { useEffect, useState, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { AuthService } from '../../../lib/auth'
import { StudentUser } from '../../../types'

interface Appointment {
  id: string
  lecturerName: string
  lecturerTitle: string
  date: string
  time: string
  duration: number
  type: 'office-hours' | 'consultation' | 'thesis-meeting' | 'advisory'
  status: 'scheduled' | 'confirmed' | 'cancelled' | 'completed'
  location: string
  courseCode?: string
  description: string
  meetingLink?: string
  isOnline: boolean
  reminderSent: boolean
}

interface OfficeHour {
  id: string
  lecturerName: string
  lecturerTitle: string
  dayOfWeek: string
  startTime: string
  endTime: string
  location: string
  courseCode: string
  maxSlots: number
  bookedSlots: number
  isOnline: boolean
  meetingLink?: string
}

export default function StudentAppointments() {
  const [user, setUser] = useState<StudentUser | null>(null)
  const [loading, setLoading] = useState(true)
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [officeHours, setOfficeHours] = useState<OfficeHour[]>([])
  const [selectedView, setSelectedView] = useState<'upcoming' | 'past' | 'office-hours'>('upcoming')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedFilter, setSelectedFilter] = useState('all')
  const router = useRouter()

  // Move mock data to useMemo to prevent dependency issues
  const mockAppointments: Appointment[] = useMemo(() => [
    {
      id: 'apt-001',
      lecturerName: 'Dr. Sarah Johnson',
      lecturerTitle: 'Dr.',
      date: '2024-01-20',
      time: '14:30',
      duration: 30,
      type: 'office-hours',
      status: 'confirmed',
      location: 'Room 301, Building A',
      courseCode: 'CS401',
      description: 'Discuss assignment feedback and clarify algorithm complexity',
      isOnline: false,
      reminderSent: true
    },
    {
      id: 'apt-002',
      lecturerName: 'Prof. Michael Chen',
      lecturerTitle: 'Prof.',
      date: '2024-01-22',
      time: '10:00',
      duration: 45,
      type: 'consultation',
      status: 'scheduled',
      location: 'Online',
      courseCode: 'CS350',
      description: 'Project proposal review and guidance',
      meetingLink: 'https://zoom.us/j/123456789',
      isOnline: true,
      reminderSent: false
    },
    {
      id: 'apt-003',
      lecturerName: 'Dr. Emily Rodriguez',
      lecturerTitle: 'Dr.',
      date: '2024-01-18',
      time: '13:00',
      duration: 30,
      type: 'office-hours',
      status: 'completed',
      location: 'Room 205, Building B',
      courseCode: 'CS201',
      description: 'Exam preparation and study materials discussion',
      isOnline: false,
      reminderSent: true
    },
    {
      id: 'apt-004',
      lecturerName: 'Prof. David Wilson',
      lecturerTitle: 'Prof.',
      date: '2024-01-25',
      time: '15:30',
      duration: 60,
      type: 'thesis-meeting',
      status: 'scheduled',
      location: 'Room 401, Building A',
      description: 'Thesis progress review and next steps planning',
      isOnline: false,
      reminderSent: false
    }
  ], [])

  const mockOfficeHours: OfficeHour[] = useMemo(() => [
    {
      id: 'oh-001',
      lecturerName: 'Dr. Sarah Johnson',
      lecturerTitle: 'Dr.',
      dayOfWeek: 'Monday',
      startTime: '14:00',
      endTime: '16:00',
      location: 'Room 301, Building A',
      courseCode: 'CS401',
      maxSlots: 8,
      bookedSlots: 5,
      isOnline: false
    },
    {
      id: 'oh-002',
      lecturerName: 'Prof. Michael Chen',
      lecturerTitle: 'Prof.',
      dayOfWeek: 'Wednesday',
      startTime: '10:00',
      endTime: '12:00',
      location: 'Online',
      courseCode: 'CS350',
      maxSlots: 12,
      bookedSlots: 8,
      isOnline: true,
      meetingLink: 'https://zoom.us/j/987654321'
    },
    {
      id: 'oh-003',
      lecturerName: 'Dr. Emily Rodriguez',
      lecturerTitle: 'Dr.',
      dayOfWeek: 'Friday',
      startTime: '13:00',
      endTime: '15:00',
      location: 'Room 205, Building B',
      courseCode: 'CS201',
      maxSlots: 6,
      bookedSlots: 6,
      isOnline: false
    },
    {
      id: 'oh-004',
      lecturerName: 'Prof. Lisa Thompson',
      lecturerTitle: 'Prof.',
      dayOfWeek: 'Tuesday',
      startTime: '11:00',
      endTime: '13:00',
      location: 'Room 302, Building C',
      courseCode: 'CS499',
      maxSlots: 4,
      bookedSlots: 2,
      isOnline: false
    }
  ], [])

  useEffect(() => {
    const currentUser = AuthService.getCurrentUser()
    
    if (!currentUser || currentUser.role !== 'student') {
      router.push('/login')
      return
    }
    
    setUser(currentUser as StudentUser)
    setAppointments(mockAppointments)
    setOfficeHours(mockOfficeHours)
    setLoading(false)
  }, [router, mockAppointments, mockOfficeHours])

  const handleLogout = () => {
    AuthService.logout()
    router.push('/')
  }

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    const today = new Date()
    const tomorrow = new Date(today)
    tomorrow.setDate(tomorrow.getDate() + 1)
    
    if (date.toDateString() === today.toDateString()) {
      return 'Today'
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return 'Tomorrow'
    } else {
      return date.toLocaleDateString('en-US', { 
        weekday: 'long', 
        month: 'short', 
        day: 'numeric' 
      })
    }
  }

  const formatTime = (timeStr: string) => {
    const [hours, minutes] = timeStr.split(':')
    const date = new Date()
    date.setHours(parseInt(hours), parseInt(minutes))
    return date.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled': return 'bg-blue-100 text-blue-800'
      case 'confirmed': return 'bg-green-100 text-green-800'
      case 'cancelled': return 'bg-red-100 text-red-800'
      case 'completed': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'office-hours': return 'bg-purple-100 text-purple-800'
      case 'consultation': return 'bg-indigo-100 text-indigo-800'
      case 'thesis-meeting': return 'bg-amber-100 text-amber-800'
      case 'advisory': return 'bg-cyan-100 text-cyan-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const isUpcoming = (dateStr: string, timeStr: string) => {
    const appointmentDate = new Date(`${dateStr}T${timeStr}`)
    return appointmentDate > new Date()
  }

  const filteredAppointments = appointments
    .filter(apt => {
      const matchesSearch = apt.lecturerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          apt.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (apt.courseCode && apt.courseCode.toLowerCase().includes(searchQuery.toLowerCase()))
      
      const matchesFilter = selectedFilter === 'all' || apt.status === selectedFilter
      
      const matchesView = selectedView === 'upcoming' ? isUpcoming(apt.date, apt.time) : 
                         selectedView === 'past' ? !isUpcoming(apt.date, apt.time) : true
      
      return matchesSearch && matchesFilter && matchesView
    })
    .sort((a, b) => {
      const dateA = new Date(`${a.date}T${a.time}`)
      const dateB = new Date(`${b.date}T${b.time}`)
      return selectedView === 'upcoming' ? dateA.getTime() - dateB.getTime() : dateB.getTime() - dateA.getTime()
    })

  const filteredOfficeHours = officeHours.filter(oh => 
    oh.lecturerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    oh.courseCode.toLowerCase().includes(searchQuery.toLowerCase())
  )

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!user) return null

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Header */}
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/student/dashboard" className="flex items-center">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">E</span>
                </div>
                <span className="ml-3 text-xl font-bold text-gray-900">EduLink Pro</span>
              </Link>
              <div className="ml-8">
                <span className="text-sm text-gray-600">Appointments</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-700">
                <span className="font-medium">{user.firstName}</span>
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

      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Appointments</h1>
              <p className="text-gray-600 mt-1">
                Manage your meetings and office hours with lecturers
              </p>
            </div>
            <Link 
              href="/student/appointments/book"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Book Appointment
            </Link>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-blue-600 text-lg">📅</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Upcoming</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {appointments.filter(apt => isUpcoming(apt.date, apt.time)).length}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-green-600 text-lg">✅</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">This Month</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {appointments.filter(apt => new Date(apt.date).getMonth() === new Date().getMonth()).length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                <span className="text-purple-600 text-lg">🕐</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Available Slots</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {officeHours.reduce((sum, oh) => sum + (oh.maxSlots - oh.bookedSlots), 0)}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* View Toggle and Search */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            {/* View Toggle */}
            <div className="flex bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setSelectedView('upcoming')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  selectedView === 'upcoming' 
                    ? 'bg-white text-gray-900 shadow-sm' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Upcoming
              </button>
              <button
                onClick={() => setSelectedView('past')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  selectedView === 'past' 
                    ? 'bg-white text-gray-900 shadow-sm' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Past
              </button>
              <button
                onClick={() => setSelectedView('office-hours')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  selectedView === 'office-hours' 
                    ? 'bg-white text-gray-900 shadow-sm' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Office Hours
              </button>
            </div>

            {/* Search Input */}
            <div className="flex-1">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search by lecturer, course, or description..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                  <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Status Filter */}
            {selectedView !== 'office-hours' && (
              <select
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Status</option>
                <option value="scheduled">Scheduled</option>
                <option value="confirmed">Confirmed</option>
                <option value="cancelled">Cancelled</option>
                <option value="completed">Completed</option>
              </select>
            )}
          </div>
        </div>

        {/* Content Area */}
        {selectedView === 'office-hours' ? (
          // Office Hours View
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-900">Available Office Hours</h2>
            </div>
            {filteredOfficeHours.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No office hours found</h3>
                <p className="text-gray-600">
                  {searchQuery ? 'Try adjusting your search criteria' : 'No office hours are currently available'}
                </p>
              </div>
            ) : (
              <div className="divide-y divide-gray-200">
                {filteredOfficeHours.map((officeHour) => (
                  <div key={officeHour.id} className="p-6 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h3 className="text-lg font-medium text-gray-900">
                            {officeHour.lecturerTitle} {officeHour.lecturerName}
                          </h3>
                          <span className="px-2 py-1 text-xs bg-purple-100 text-purple-800 rounded-full">
                            {officeHour.courseCode}
                          </span>
                          {officeHour.isOnline && (
                            <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">
                              Online
                            </span>
                          )}
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <span>{officeHour.dayOfWeek}s</span>
                          <span>•</span>
                          <span>{formatTime(officeHour.startTime)} - {formatTime(officeHour.endTime)}</span>
                          <span>•</span>
                          <span>{officeHour.location}</span>
                        </div>
                        <div className="mt-2">
                          <div className="flex items-center space-x-2">
                            <div className="w-32 bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-blue-600 h-2 rounded-full" 
                                style={{ width: `${(officeHour.bookedSlots / officeHour.maxSlots) * 100}%` }}
                              ></div>
                            </div>
                            <span className="text-sm text-gray-600">
                              {officeHour.bookedSlots} / {officeHour.maxSlots} slots booked
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex-shrink-0 ml-4">
                        {officeHour.bookedSlots < officeHour.maxSlots ? (
                          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors">
                            Book Slot
                          </button>
                        ) : (
                          <span className="bg-gray-100 text-gray-500 px-4 py-2 rounded-lg font-medium">
                            Fully Booked
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          // Appointments View
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-900">
                {selectedView === 'upcoming' ? 'Upcoming Appointments' : 'Past Appointments'}
              </h2>
            </div>
            {filteredAppointments.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3a4 4 0 118 0v4M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V9a2 2 0 00-2-2h-2M8 7v2a2 2 0 002 2h4a2 2 0 002-2V7M8 7a2 2 0 112 2h4a2 2 0 112-2" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  {selectedView === 'upcoming' ? 'No upcoming appointments' : 'No past appointments'}
                </h3>
                <p className="text-gray-600 mb-4">
                  {searchQuery 
                    ? 'Try adjusting your search or filter criteria' 
                    : selectedView === 'upcoming' 
                      ? 'Book your first appointment with a lecturer'
                      : 'You haven\'t had any appointments yet'
                  }
                </p>
                {!searchQuery && selectedView === 'upcoming' && (
                  <Link 
                    href="/student/appointments/book"
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                  >
                    Book Your First Appointment
                  </Link>
                )}
              </div>
            ) : (
              <div className="divide-y divide-gray-200">
                {filteredAppointments.map((appointment) => (
                  <div key={appointment.id} className="p-6 hover:bg-gray-50 transition-colors">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-blue-700 font-semibold text-sm">
                          {appointment.lecturerTitle === 'Dr.' ? 'DR' : 'PR'}
                        </span>
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-1">
                              <h3 className="text-lg font-medium text-gray-900">
                                {appointment.lecturerTitle} {appointment.lecturerName}
                              </h3>
                              {appointment.courseCode && (
                                <span className="px-2 py-1 text-xs bg-gray-100 text-gray-800 rounded-full">
                                  {appointment.courseCode}
                                </span>
                              )}
                              <span className={`px-2 py-1 text-xs rounded-full ${getTypeColor(appointment.type)}`}>
                                {appointment.type.replace('-', ' ')}
                              </span>
                              <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(appointment.status)}`}>
                                {appointment.status}
                              </span>
                            </div>
                            
                            <div className="flex items-center space-x-4 text-sm text-gray-600 mb-2">
                              <span>{formatDate(appointment.date)}</span>
                              <span>•</span>
                              <span>{formatTime(appointment.time)}</span>
                              <span>•</span>
                              <span>{appointment.duration} min</span>
                              <span>•</span>
                              <span>{appointment.location}</span>
                            </div>
                            
                            <p className="text-gray-700 mb-2">{appointment.description}</p>
                            
                            {appointment.isOnline && appointment.meetingLink && (
                              <div className="mb-2">
                                <a 
                                  href={appointment.meetingLink} 
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                  className="text-blue-600 hover:text-blue-700 text-sm underline"
                                >
                                  Join Meeting
                                </a>
                              </div>
                            )}
                            
                            <div className="flex items-center space-x-4 text-xs text-gray-500">
                              {appointment.reminderSent && (
                                <span className="flex items-center">
                                  <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M10 2L3 7v11a1 1 0 001 1h3a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1h3a1 1 0 001-1V7l-7-5z"/>
                                  </svg>
                                  Reminder sent
                                </span>
                              )}
                            </div>
                          </div>
                          
                          <div className="flex-shrink-0 flex space-x-2 ml-4">
                            {isUpcoming(appointment.date, appointment.time) && appointment.status !== 'cancelled' && (
                              <>
                                <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                                  Reschedule
                                </button>
                                <button className="text-red-600 hover:text-red-700 text-sm font-medium">
                                  Cancel
                                </button>
                              </>
                            )}
                            {appointment.status === 'completed' && (
                              <button className="text-gray-600 hover:text-gray-700 text-sm font-medium">
                                View Notes
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Results Summary */}
        {(selectedView !== 'office-hours' ? filteredAppointments.length : filteredOfficeHours.length) > 0 && (
          <div className="mt-4 text-center text-sm text-gray-600">
            Showing {selectedView !== 'office-hours' ? filteredAppointments.length : filteredOfficeHours.length} result(s)
            {searchQuery && ` for "${searchQuery}"`}
          </div>
        )}
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
        <div className="grid grid-cols-4 py-2">
          <Link href="/student/dashboard" className="flex flex-col items-center py-2 text-gray-600">
            <span className="text-lg">🏠</span>
            <span className="text-xs">Home</span>
          </Link>
          <Link href="/student/conversations" className="flex flex-col items-center py-2 text-gray-600">
            <span className="text-lg">💬</span>
            <span className="text-xs">Messages</span>
          </Link>
          <Link href="/student/appointments" className="flex flex-col items-center py-2 text-blue-600">
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
  )
}