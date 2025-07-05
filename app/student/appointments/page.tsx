// app/student/appointments/page.tsx
'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { AuthService } from '../../../lib/auth'
import { StudentUser } from '../../../types'

interface Appointment {
  id: string
  lecturerName: string
  lecturerTitle: string
  courseCode: string
  courseName: string
  date: string
  startTime: string
  endTime: string
  duration: number
  type: 'in-person' | 'virtual'
  location?: string
  meetingLink?: string
  status: 'scheduled' | 'confirmed' | 'cancelled' | 'completed'
  purpose: string
  notes?: string
  canReschedule: boolean
  canCancel: boolean
  reminderSent: boolean
  createdAt: string
}

interface OfficeHours {
  id: string
  lecturerName: string
  lecturerTitle: string
  courseCode: string
  dayOfWeek: string
  startTime: string
  endTime: string
  location: string
  type: 'in-person' | 'virtual' | 'hybrid'
  availableSlots: string[]
  isAvailable: boolean
}

export default function StudentAppointments() {
  const [user, setUser] = useState<StudentUser | null>(null)
  const [loading, setLoading] = useState(true)
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [officeHours, setOfficeHours] = useState<OfficeHours[]>([])
  const [selectedTab, setSelectedTab] = useState<'upcoming' | 'past' | 'office-hours'>('upcoming')
  const [selectedFilter, setSelectedFilter] = useState('all')
  const [showCalendarView, setShowCalendarView] = useState(false)
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [showBookingModal, setShowBookingModal] = useState(false)
  const [selectedOfficeHour, setSelectedOfficeHour] = useState<OfficeHours | null>(null)
  
  const router = useRouter()

  // Mock appointments data
  const mockAppointments: Appointment[] = [
    {
      id: 'apt-001',
      lecturerName: 'Dr. Sarah Johnson',
      lecturerTitle: 'Dr.',
      courseCode: 'CS401',
      courseName: 'Advanced Algorithms',
      date: '2024-01-16',
      startTime: '14:00',
      endTime: '14:30',
      duration: 30,
      type: 'virtual',
      meetingLink: 'https://zoom.us/j/123456789',
      status: 'confirmed',
      purpose: 'Assignment feedback discussion',
      notes: 'Please bring your assignment draft and specific questions.',
      canReschedule: true,
      canCancel: true,
      reminderSent: false,
      createdAt: '2024-01-14T10:00:00Z'
    },
    {
      id: 'apt-002',
      lecturerName: 'Prof. Michael Chen',
      lecturerTitle: 'Prof.',
      courseCode: 'CS350',
      courseName: 'Software Engineering',
      date: '2024-01-18',
      startTime: '10:00',
      endTime: '10:45',
      duration: 45,
      type: 'in-person',
      location: 'Building A, Room 301',
      status: 'scheduled',
      purpose: 'Project proposal review',
      canReschedule: true,
      canCancel: true,
      reminderSent: false,
      createdAt: '2024-01-15T09:00:00Z'
    },
    {
      id: 'apt-003',
      lecturerName: 'Dr. Emily Rodriguez',
      lecturerTitle: 'Dr.',
      courseCode: 'CS201',
      courseName: 'Data Structures',
      date: '2024-01-12',
      startTime: '15:30',
      endTime: '16:00',
      duration: 30,
      type: 'virtual',
      meetingLink: 'https://teams.microsoft.com/l/meetup-join/...',
      status: 'completed',
      purpose: 'Exam preparation guidance',
      notes: 'Covered key topics for midterm exam.',
      canReschedule: false,
      canCancel: false,
      reminderSent: true,
      createdAt: '2024-01-10T14:00:00Z'
    },
    {
      id: 'apt-004',
      lecturerName: 'Prof. David Wilson',
      lecturerTitle: 'Prof.',
      courseCode: 'CS490',
      courseName: 'Senior Capstone',
      date: '2024-01-08',
      startTime: '11:00',
      endTime: '11:30',
      duration: 30,
      type: 'in-person',
      location: 'Building B, Room 205',
      status: 'cancelled',
      purpose: 'Career guidance session',
      notes: 'Cancelled due to scheduling conflict.',
      canReschedule: false,
      canCancel: false,
      reminderSent: false,
      createdAt: '2024-01-05T16:00:00Z'
    }
  ]

  // Mock office hours data
  const mockOfficeHours: OfficeHours[] = [
    {
      id: 'oh-001',
      lecturerName: 'Dr. Sarah Johnson',
      lecturerTitle: 'Dr.',
      courseCode: 'CS401',
      dayOfWeek: 'Monday',
      startTime: '14:00',
      endTime: '16:00',
      location: 'Building A, Room 303',
      type: 'hybrid',
      availableSlots: ['14:00', '14:30', '15:00', '15:30'],
      isAvailable: true
    },
    {
      id: 'oh-002',
      lecturerName: 'Prof. Michael Chen',
      lecturerTitle: 'Prof.',
      courseCode: 'CS350',
      dayOfWeek: 'Wednesday',
      startTime: '10:00',
      endTime: '12:00',
      location: 'Building A, Room 301',
      type: 'in-person',
      availableSlots: ['10:00', '10:30', '11:00', '11:30'],
      isAvailable: true
    },
    {
      id: 'oh-003',
      lecturerName: 'Dr. Emily Rodriguez',
      lecturerTitle: 'Dr.',
      courseCode: 'CS201',
      dayOfWeek: 'Tuesday',
      startTime: '13:00',
      endTime: '15:00',
      location: 'Virtual (Zoom)',
      type: 'virtual',
      availableSlots: ['13:00', '13:30', '14:00', '14:30'],
      isAvailable: true
    },
    {
      id: 'oh-004',
      lecturerName: 'Prof. David Wilson',
      lecturerTitle: 'Prof.',
      courseCode: 'CS490',
      dayOfWeek: 'Friday',
      startTime: '09:00',
      endTime: '11:00',
      location: 'Building B, Room 205',
      type: 'in-person',
      availableSlots: ['09:00', '09:30', '10:00', '10:30'],
      isAvailable: false
    }
  ]

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
  }, [router])

  const handleLogout = () => {
    AuthService.logout()
    router.push('/')
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

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'virtual': return '💻'
      case 'in-person': return '🏢'
      case 'hybrid': return '🔄'
      default: return '📅'
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
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

  const formatTime = (timeString: string) => {
    const [hours, minutes] = timeString.split(':')
    const time = new Date()
    time.setHours(parseInt(hours), parseInt(minutes))
    return time.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    })
  }

  const filteredAppointments = appointments.filter(apt => {
    const now = new Date()
    const aptDate = new Date(apt.date)
    
    if (selectedTab === 'upcoming') {
      return aptDate >= now && apt.status !== 'cancelled' && apt.status !== 'completed'
    } else if (selectedTab === 'past') {
      return aptDate < now || apt.status === 'cancelled' || apt.status === 'completed'
    }
    return true
  }).filter(apt => {
    if (selectedFilter === 'all') return true
    return apt.status === selectedFilter
  })

  const upcomingCount = appointments.filter(apt => {
    const now = new Date()
    const aptDate = new Date(apt.date)
    return aptDate >= now && apt.status !== 'cancelled' && apt.status !== 'completed'
  }).length

  const handleReschedule = (appointmentId: string) => {
    // Mock reschedule functionality
    alert(`Reschedule appointment ${appointmentId} - This feature will be implemented soon!`)
  }

  const handleCancel = (appointmentId: string) => {
    // Mock cancel functionality
    if (confirm('Are you sure you want to cancel this appointment?')) {
      setAppointments(prev => 
        prev.map(apt => 
          apt.id === appointmentId 
            ? { ...apt, status: 'cancelled' as const }
            : apt
        )
      )
    }
  }

  const handleBookOfficeHours = (officeHour: OfficeHours) => {
    setSelectedOfficeHour(officeHour)
    setShowBookingModal(true)
  }

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
              <h1 className="text-3xl font-bold text-gray-900">My Appointments</h1>
              <p className="text-gray-600 mt-1">
                {upcomingCount} upcoming appointments scheduled
              </p>
            </div>
            <div className="flex space-x-3">
              <Link
                href="/student/appointments/book"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                Book Appointment
              </Link>
              <button
                onClick={() => setShowCalendarView(!showCalendarView)}
                className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors"
              >
                {showCalendarView ? 'List View' : 'Calendar View'}
              </button>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-blue-600 text-lg">📅</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Upcoming</p>
                <p className="text-2xl font-semibold text-gray-900">{upcomingCount}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-green-600 text-lg">✅</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Completed</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {appointments.filter(apt => apt.status === 'completed').length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                <span className="text-orange-600 text-lg">🕐</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Office Hours</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {officeHours.filter(oh => oh.isAvailable).length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                <span className="text-purple-600 text-lg">⏱️</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">This Week</p>
                <p className="text-2xl font-semibold text-gray-900">3</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-6">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => setSelectedTab('upcoming')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  selectedTab === 'upcoming'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Upcoming ({upcomingCount})
              </button>
              <button
                onClick={() => setSelectedTab('past')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  selectedTab === 'past'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Past Appointments
              </button>
              <button
                onClick={() => setSelectedTab('office-hours')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  selectedTab === 'office-hours'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Office Hours
              </button>
            </nav>
          </div>
        </div>

        {/* Filters */}
        {selectedTab !== 'office-hours' && (
          <div className="mb-6">
            <div className="flex space-x-2">
              <select
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Status</option>
                <option value="scheduled">Scheduled</option>
                <option value="confirmed">Confirmed</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
          </div>
        )}

        {/* Content */}
        {selectedTab === 'office-hours' ? (
          // Office Hours List
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Available Office Hours</h3>
            </div>
            
            {officeHours.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🕐</span>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No office hours available</h3>
                <p className="text-gray-600">Check back later for updated office hours.</p>
              </div>
            ) : (
              <div className="divide-y divide-gray-200">
                {officeHours.map((officeHour) => (
                  <div key={officeHour.id} className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h4 className="text-lg font-medium text-gray-900">
                            {officeHour.lecturerTitle} {officeHour.lecturerName}
                          </h4>
                          <span className="text-sm text-gray-500">•</span>
                          <span className="text-sm text-gray-600">{officeHour.courseCode}</span>
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            officeHour.isAvailable ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                          }`}>
                            {officeHour.isAvailable ? 'Available' : 'Unavailable'}
                          </span>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                          <div className="flex items-center">
                            <span className="text-lg mr-2">📅</span>
                            <span>{officeHour.dayOfWeek}s</span>
                          </div>
                          <div className="flex items-center">
                            <span className="text-lg mr-2">⏰</span>
                            <span>{formatTime(officeHour.startTime)} - {formatTime(officeHour.endTime)}</span>
                          </div>
                          <div className="flex items-center">
                            <span className="text-lg mr-2">{getTypeIcon(officeHour.type)}</span>
                            <span>{officeHour.location}</span>
                          </div>
                        </div>
                        
                        {officeHour.isAvailable && officeHour.availableSlots.length > 0 && (
                          <div className="mt-3">
                            <p className="text-sm text-gray-600 mb-2">Available time slots:</p>
                            <div className="flex flex-wrap gap-2">
                              {officeHour.availableSlots.map((slot, index) => (
                                <span key={index} className="bg-blue-50 text-blue-700 px-2 py-1 rounded text-xs">
                                  {formatTime(slot)}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                      
                      <div className="flex-shrink-0 ml-4">
                        {officeHour.isAvailable ? (
                          <button
                            onClick={() => handleBookOfficeHours(officeHour)}
                            className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition-colors"
                          >
                            Book Slot
                          </button>
                        ) : (
                          <button
                            disabled
                            className="bg-gray-300 text-gray-500 px-4 py-2 rounded-lg text-sm cursor-not-allowed"
                          >
                            Unavailable
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          // Appointments List
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            {filteredAppointments.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">📅</span>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No {selectedTab} appointments
                </h3>
                <p className="text-gray-600 mb-4">
                  {selectedTab === 'upcoming' 
                    ? 'Schedule your first appointment with a lecturer' 
                    : 'No past appointments to display'}
                </p>
                {selectedTab === 'upcoming' && (
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
                  <div key={appointment.id} className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h4 className="text-lg font-medium text-gray-900">
                            {appointment.lecturerTitle} {appointment.lecturerName}
                          </h4>
                          <span className="text-sm text-gray-500">•</span>
                          <span className="text-sm text-gray-600">{appointment.courseCode}</span>
                          <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(appointment.status)}`}>
                            {appointment.status}
                          </span>
                        </div>
                        
                        <h5 className="text-md font-medium text-gray-800 mb-3">{appointment.purpose}</h5>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600 mb-3">
                          <div className="flex items-center">
                            <span className="text-lg mr-2">📅</span>
                            <span>{formatDate(appointment.date)}</span>
                          </div>
                          <div className="flex items-center">
                            <span className="text-lg mr-2">⏰</span>
                            <span>{formatTime(appointment.startTime)} - {formatTime(appointment.endTime)}</span>
                          </div>
                          <div className="flex items-center">
                            <span className="text-lg mr-2">{getTypeIcon(appointment.type)}</span>
                            <span>{appointment.location || appointment.meetingLink}</span>
                          </div>
                        </div>
                        
                        {appointment.notes && (
                          <div className="bg-gray-50 rounded-lg p-3 text-sm text-gray-700">
                            <p className="font-medium mb-1">Notes:</p>
                            <p>{appointment.notes}</p>
                          </div>
                        )}
                        
                        {appointment.meetingLink && appointment.status === 'confirmed' && (
                          <div className="mt-3">
                            <a
                              href={appointment.meetingLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                            >
                              Join Meeting →
                            </a>
                          </div>
                        )}
                      </div>
                      
                      <div className="flex-shrink-0 ml-4">
                        <div className="flex space-x-2">
                          {appointment.canReschedule && (
                            <button
                              onClick={() => handleReschedule(appointment.id)}
                              className="border border-gray-300 text-gray-700 px-3 py-1 rounded text-sm hover:bg-gray-50 transition-colors"
                            >
                              Reschedule
                            </button>
                          )}
                          {appointment.canCancel && (
                            <button
                              onClick={() => handleCancel(appointment.id)}
                              className="border border-red-300 text-red-700 px-3 py-1 rounded text-sm hover:bg-red-50 transition-colors"
                            >
                              Cancel
                            </button>
                          )}
                          {appointment.status === 'confirmed' && (
                            <button className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700 transition-colors">
                              Mark Complete
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Booking Modal */}
      {showBookingModal && selectedOfficeHour && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Book Office Hours with {selectedOfficeHour.lecturerTitle} {selectedOfficeHour.lecturerName}
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Select Time Slot
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                  {selectedOfficeHour.availableSlots.map((slot, index) => (
                    <option key={index} value={slot}>
                      {selectedOfficeHour.dayOfWeek} at {formatTime(slot)}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Purpose of Visit
                </label>
                <textarea
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={3}
                  placeholder="Briefly describe what you'd like to discuss..."
                />
              </div>
            </div>
            
            <div className="flex space-x-3 mt-6">
              <button
                onClick={() => {
                  setShowBookingModal(false)
                  setSelectedOfficeHour(null)
                }}
                className="flex-1 border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  // Mock booking
                  alert('Office hours booked successfully!')
                  setShowBookingModal(false)
                  setSelectedOfficeHour(null)
                }}
                className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Book Appointment
              </button>
            </div>
          </div>
        </div>
      )}

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
            <div className="relative">
              <span className="text-lg">📅</span>
              {upcomingCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  {upcomingCount}
                </span>
              )}
            </div>
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