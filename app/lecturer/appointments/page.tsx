// app/lecturer/appointments/page.tsx
'use client'

import { useState } from 'react'
import Link from 'next/link'

interface Appointment {
  id: string
  student: string
  studentEmail: string
  studentAvatar: string
  subject: string
  description: string
  date: string
  time: string
  duration: number // minutes
  location: string
  type: 'office-hours' | 'consultation' | 'project-discussion' | 'exam-review'
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed'
  bookedAt: string
  notes?: string
  course: string
}

interface TimeSlot {
  id: string
  date: string
  time: string
  duration: number
  location: string
  type: string
  isAvailable: boolean
  isRecurring: boolean
  recurringPattern?: 'weekly' | 'biweekly' | 'monthly'
}

const mockAppointments: Appointment[] = [
  {
    id: '1',
    student: 'Alice Johnson',
    studentEmail: 'alice.johnson@university.edu',
    studentAvatar: '👩‍🎓',
    subject: 'Assignment 3 Discussion',
    description: 'Need help understanding the sorting algorithm requirements and implementation details',
    date: '2025-07-28',
    time: '14:00',
    duration: 30,
    location: 'Office 201B',
    type: 'office-hours',
    status: 'confirmed',
    bookedAt: '2025-07-26 10:30',
    course: 'CS101',
    notes: 'Student seems confused about time complexity'
  },
  {
    id: '2',
    student: 'Bob Smith',
    studentEmail: 'bob.smith@university.edu',
    studentAvatar: '👨‍🎓',
    subject: 'Final Project Proposal',
    description: 'Want to discuss my final project idea and get approval for the topic',
    date: '2025-07-29',
    time: '10:00',
    duration: 45,
    location: 'Office 201B',
    type: 'project-discussion',
    status: 'pending',
    bookedAt: '2025-07-26 15:20',
    course: 'CS101'
  },
  {
    id: '3',
    student: 'Carol Davis',
    studentEmail: 'carol.davis@university.edu',
    studentAvatar: '👩‍🎓',
    subject: 'Midterm Preparation',
    description: 'Review key concepts and practice problems for the upcoming midterm exam',
    date: '2025-07-30',
    time: '16:00',
    duration: 30,
    location: 'Office 201B',
    type: 'exam-review',
    status: 'confirmed',
    bookedAt: '2025-07-25 12:45',
    course: 'CS101'
  },
  {
    id: '4',
    student: 'David Wilson',
    studentEmail: 'david.wilson@university.edu',
    studentAvatar: '👨‍🎓',
    subject: 'Research Opportunities',
    description: 'Interested in discussing potential research opportunities and requirements',
    date: '2025-07-25',
    time: '15:00',
    duration: 60,
    location: 'Office 201B',
    type: 'consultation',
    status: 'completed',
    bookedAt: '2025-07-23 09:15',
    course: 'CS101',
    notes: 'Excellent student, recommended for advanced research track'
  }
]

const mockTimeSlots: TimeSlot[] = [
  {
    id: 'slot1',
    date: '2025-07-29',
    time: '09:00',
    duration: 30,
    location: 'Office 201B',
    type: 'office-hours',
    isAvailable: true,
    isRecurring: true,
    recurringPattern: 'weekly'
  },
  {
    id: 'slot2',
    date: '2025-07-29',
    time: '09:30',
    duration: 30,
    location: 'Office 201B',
    type: 'office-hours',
    isAvailable: true,
    isRecurring: true,
    recurringPattern: 'weekly'
  },
  {
    id: 'slot3',
    date: '2025-07-30',
    time: '14:00',
    duration: 45,
    location: 'Office 201B',
    type: 'consultation',
    isAvailable: true,
    isRecurring: false
  }
]

const statusFilters = ['All', 'Pending', 'Confirmed', 'Cancelled', 'Completed']
const typeFilters = ['All', 'Office Hours', 'Consultation', 'Project Discussion', 'Exam Review']
const courses = ['All', 'CS101', 'CS201', 'MATH202']

export default function LecturerAppointmentsPage() {
  const [appointments, setAppointments] = useState<Appointment[]>(mockAppointments)
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>(mockTimeSlots)
  const [currentView, setCurrentView] = useState<'appointments' | 'availability'>('appointments')
  const [statusFilter, setStatusFilter] = useState('All')
  const [typeFilter, setTypeFilter] = useState('All')
  const [courseFilter, setCourseFilter] = useState('All')
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0])
  const [showAddSlotModal, setShowAddSlotModal] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')

  // Add time slot form state
  const [newSlot, setNewSlot] = useState({
    date: '',
    time: '',
    duration: 30,
    location: 'Office 201B',
    type: 'office-hours',
    isRecurring: false,
    recurringPattern: 'weekly' as 'weekly' | 'biweekly' | 'monthly'
  })

  const handleStatusChange = (appointmentId: string, newStatus: Appointment['status']) => {
    setAppointments(appointments.map(apt => 
      apt.id === appointmentId 
        ? { ...apt, status: newStatus }
        : apt
    ))
  }

  const handleAddNotes = (appointmentId: string, notes: string) => {
    setAppointments(appointments.map(apt => 
      apt.id === appointmentId 
        ? { ...apt, notes }
        : apt
    ))
  }

  const handleRescheduleAppointment = () => {
    // In real app, this would open a reschedule modal
    alert('Reschedule functionality would be implemented here')
  }

  const handleAddTimeSlot = (e: React.FormEvent) => {
    e.preventDefault()
    
    const slot: TimeSlot = {
      id: Date.now().toString(),
      ...newSlot,
      isAvailable: true
    }
    
    setTimeSlots([...timeSlots, slot])
    setNewSlot({
      date: '',
      time: '',
      duration: 30,
      location: 'Office 201B',
      type: 'office-hours',
      isRecurring: false,
      recurringPattern: 'weekly'
    })
    setShowAddSlotModal(false)
  }

  const handleDeleteTimeSlot = (slotId: string) => {
    if (confirm('Delete this time slot?')) {
      setTimeSlots(timeSlots.filter(slot => slot.id !== slotId))
    }
  }

  const handleToggleSlotAvailability = (slotId: string) => {
    setTimeSlots(timeSlots.map(slot => 
      slot.id === slotId 
        ? { ...slot, isAvailable: !slot.isAvailable }
        : slot
    ))
  }

  // Filter appointments
  const filteredAppointments = appointments.filter(appointment => {
    const matchesSearch = appointment.student.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         appointment.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         appointment.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'All' || appointment.status === statusFilter.toLowerCase()
    const matchesType = typeFilter === 'All' || 
                       appointment.type === typeFilter.toLowerCase().replace(' ', '-')
    const matchesCourse = courseFilter === 'All' || appointment.course === courseFilter
    
    return matchesSearch && matchesStatus && matchesType && matchesCourse
  })

  // Filter time slots by date
  const filteredTimeSlots = timeSlots.filter(slot => 
    !selectedDate || slot.date === selectedDate
  )

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'confirmed': return 'bg-green-100 text-green-800'
      case 'cancelled': return 'bg-red-100 text-red-800'
      case 'completed': return 'bg-blue-100 text-blue-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'office-hours': return 'bg-blue-100 text-blue-800'
      case 'consultation': return 'bg-purple-100 text-purple-800'
      case 'project-discussion': return 'bg-green-100 text-green-800'
      case 'exam-review': return 'bg-orange-100 text-orange-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const todayAppointments = appointments.filter(apt => 
    apt.date === new Date().toISOString().split('T')[0] && 
    (apt.status === 'confirmed' || apt.status === 'pending')
  )

  const upcomingAppointments = appointments.filter(apt => 
    new Date(`${apt.date} ${apt.time}`) > new Date() && 
    (apt.status === 'confirmed' || apt.status === 'pending')
  )

  const pendingCount = appointments.filter(apt => apt.status === 'pending').length

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Appointment Management</h1>
          <p className="text-gray-600">Manage your appointments and availability for students</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="text-2xl font-bold text-blue-600">{todayAppointments.length}</div>
            <div className="text-sm text-gray-600">Today</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="text-2xl font-bold text-green-600">{upcomingAppointments.length}</div>
            <div className="text-sm text-gray-600">Upcoming</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="text-2xl font-bold text-yellow-600">{pendingCount}</div>
            <div className="text-sm text-gray-600">Pending Approval</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="text-2xl font-bold text-purple-600">{timeSlots.filter(s => s.isAvailable).length}</div>
            <div className="text-sm text-gray-600">Available Slots</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="text-2xl font-bold text-orange-600">{appointments.length}</div>
            <div className="text-sm text-gray-600">Total Appointments</div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-sm mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              <button 
                onClick={() => setCurrentView('appointments')}
                className={`py-4 px-2 text-sm font-medium border-b-2 ${
                  currentView === 'appointments' 
                    ? 'border-blue-500 text-blue-600' 
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Appointments ({appointments.length})
              </button>
              <button 
                onClick={() => setCurrentView('availability')}
                className={`py-4 px-2 text-sm font-medium border-b-2 ${
                  currentView === 'availability' 
                    ? 'border-blue-500 text-blue-600' 
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Manage Availability
              </button>
            </nav>
          </div>
        </div>

        {/* Appointments View */}
        {currentView === 'appointments' && (
          <>
            {/* Filters */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                <div className="flex flex-col sm:flex-row gap-4 flex-1">
                  <input
                    type="text"
                    placeholder="Search appointments..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                  
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    {statusFilters.map(status => (
                      <option key={status} value={status}>{status}</option>
                    ))}
                  </select>

                  <select
                    value={typeFilter}
                    onChange={(e) => setTypeFilter(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    {typeFilters.map(type => (
                      <option key={type} value={type}>{type}</option>
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
                </div>
              </div>
            </div>

            {/* Appointments List */}
            <div className="space-y-4">
              {filteredAppointments.length === 0 ? (
                <div className="bg-white rounded-lg shadow-sm p-8 text-center">
                  <div className="text-gray-500 mb-4">No appointments found</div>
                  <div className="text-sm text-gray-400">Students can book appointments through your available time slots</div>
                </div>
              ) : (
                filteredAppointments.map((appointment) => (
                  <div key={appointment.id} className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <span className="text-2xl">{appointment.studentAvatar}</span>
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900">{appointment.subject}</h3>
                            <p className="text-sm text-gray-600">{appointment.student} • {appointment.course}</p>
                          </div>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(appointment.status)}`}>
                            {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                          </span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(appointment.type)}`}>
                            {appointment.type.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                          </span>
                        </div>
                        
                        <p className="text-gray-600 mb-3">{appointment.description}</p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm text-gray-500 mb-3">
                          <div>
                            <span className="font-medium">Date & Time:</span><br />
                            {appointment.date} at {appointment.time}
                          </div>
                          <div>
                            <span className="font-medium">Duration:</span><br />
                            {appointment.duration} minutes
                          </div>
                          <div>
                            <span className="font-medium">Location:</span><br />
                            {appointment.location}
                          </div>
                          <div>
                            <span className="font-medium">Booked:</span><br />
                            {appointment.bookedAt}
                          </div>
                        </div>

                        {appointment.notes && (
                          <div className="p-3 bg-blue-50 rounded-lg">
                            <div className="text-sm font-medium text-blue-900">Your Notes:</div>
                            <div className="text-sm text-blue-800">{appointment.notes}</div>
                          </div>
                        )}
                      </div>
                      
                      <div className="flex flex-col gap-2">
                        {appointment.status === 'pending' && (
                          <>
                            <button
                              onClick={() => handleStatusChange(appointment.id, 'confirmed')}
                              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors text-sm"
                            >
                              ✓ Confirm
                            </button>
                            <button
                              onClick={() => handleStatusChange(appointment.id, 'cancelled')}
                              className="bg-red-50 text-red-600 px-4 py-2 rounded-lg hover:bg-red-100 transition-colors text-sm"
                            >
                              ✗ Decline
                            </button>
                          </>
                        )}
                        
                        {appointment.status === 'confirmed' && new Date(`${appointment.date} ${appointment.time}`) > new Date() && (
                          <>
                            <button
                              onClick={handleRescheduleAppointment}
                              className="bg-blue-50 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-100 transition-colors text-sm"
                            >
                              📅 Reschedule
                            </button>
                            <button
                              onClick={() => handleStatusChange(appointment.id, 'cancelled')}
                              className="bg-red-50 text-red-600 px-4 py-2 rounded-lg hover:bg-red-100 transition-colors text-sm"
                            >
                              ❌ Cancel
                            </button>
                          </>
                        )}

                        {appointment.status === 'confirmed' && new Date(`${appointment.date} ${appointment.time}`) <= new Date() && (
                          <button
                            onClick={() => handleStatusChange(appointment.id, 'completed')}
                            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm"
                          >
                            ✓ Mark Complete
                          </button>
                        )}

                        <Link
                          href={`mailto:${appointment.studentEmail}?subject=Re: ${appointment.subject}`}
                          className="bg-gray-50 text-gray-600 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors text-sm text-center"
                        >
                          ✉️ Email Student
                        </Link>

                        <button
                          onClick={() => {
                            const notes = prompt('Add notes for this appointment:', appointment.notes || '')
                            if (notes !== null) handleAddNotes(appointment.id, notes)
                          }}
                          className="bg-yellow-50 text-yellow-600 px-4 py-2 rounded-lg hover:bg-yellow-100 transition-colors text-sm"
                        >
                          📝 Add Notes
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </>
        )}

        {/* Availability Management View */}
        {currentView === 'availability' && (
          <>
            {/* Date Selector and Add Button */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div className="flex items-center gap-4">
                  <label className="text-sm font-medium text-gray-700">View Date:</label>
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <button
                  onClick={() => setShowAddSlotModal(true)}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  + Add Time Slot
                </button>
              </div>
            </div>

            {/* Time Slots List */}
            <div className="space-y-3">
              {filteredTimeSlots.length === 0 ? (
                <div className="bg-white rounded-lg shadow-sm p-8 text-center">
                  <div className="text-gray-500 mb-4">No time slots for selected date</div>
                  <button
                    onClick={() => setShowAddSlotModal(true)}
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
                  >
                    Add Your First Time Slot
                  </button>
                </div>
              ) : (
                filteredTimeSlots.map((slot) => (
                  <div key={slot.id} className="bg-white rounded-lg shadow-sm p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div>
                          <div className="font-medium text-gray-900">{slot.time}</div>
                          <div className="text-sm text-gray-600">
                            {slot.duration} minutes • {slot.location}
                          </div>
                        </div>
                        <span className={`px-2 py-1 rounded text-xs ${getTypeColor(slot.type)}`}>
                          {slot.type.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                        </span>
                        {slot.isRecurring && (
                          <span className="px-2 py-1 rounded text-xs bg-purple-100 text-purple-800">
                            Recurring ({slot.recurringPattern})
                          </span>
                        )}
                        <span className={`px-2 py-1 rounded text-xs ${
                          slot.isAvailable ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {slot.isAvailable ? 'Available' : 'Blocked'}
                        </span>
                      </div>
                      
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleToggleSlotAvailability(slot.id)}
                          className={`px-3 py-1 rounded text-sm ${
                            slot.isAvailable 
                              ? 'bg-red-50 text-red-600 hover:bg-red-100' 
                              : 'bg-green-50 text-green-600 hover:bg-green-100'
                          }`}
                        >
                          {slot.isAvailable ? 'Block' : 'Unblock'}
                        </button>
                        <button
                          onClick={() => handleDeleteTimeSlot(slot.id)}
                          className="bg-gray-50 text-gray-600 px-3 py-1 rounded text-sm hover:bg-gray-100"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </>
        )}

        {/* Add Time Slot Modal */}
        {showAddSlotModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
              <h2 className="text-2xl font-bold mb-6">Add New Time Slot</h2>
              
              <form onSubmit={handleAddTimeSlot} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                    <input
                      type="date"
                      required
                      value={newSlot.date}
                      onChange={(e) => setNewSlot({...newSlot, date: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
                    <input
                      type="time"
                      required
                      value={newSlot.time}
                      onChange={(e) => setNewSlot({...newSlot, time: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Duration (minutes)</label>
                    <select
                      value={newSlot.duration}
                      onChange={(e) => setNewSlot({...newSlot, duration: parseInt(e.target.value)})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    >
                      <option value={15}>15 minutes</option>
                      <option value={30}>30 minutes</option>
                      <option value={45}>45 minutes</option>
                      <option value={60}>60 minutes</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                    <select
                      value={newSlot.type}
                      onChange={(e) => setNewSlot({...newSlot, type: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="office-hours">Office Hours</option>
                      <option value="consultation">Consultation</option>
                      <option value="project-discussion">Project Discussion</option>
                      <option value="exam-review">Exam Review</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                  <input
                    type="text"
                    required
                    value={newSlot.location}
                    onChange={(e) => setNewSlot({...newSlot, location: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., Office 201B"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="isRecurring"
                    checked={newSlot.isRecurring}
                    onChange={(e) => setNewSlot({...newSlot, isRecurring: e.target.checked})}
                    className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="isRecurring" className="text-sm font-medium text-gray-700">
                    Make this a recurring slot
                  </label>
                </div>

                {newSlot.isRecurring && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Recurring Pattern</label>
                    <select
                      value={newSlot.recurringPattern}
                      onChange={(e) => setNewSlot({...newSlot, recurringPattern: e.target.value as 'weekly' | 'biweekly' | 'monthly'})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="weekly">Weekly</option>
                      <option value="biweekly">Bi-weekly</option>
                      <option value="monthly">Monthly</option>
                    </select>
                  </div>
                )}

                <div className="flex gap-4 pt-4">
                  <button
                    type="submit"
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
                  >
                    Add Time Slot
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowAddSlotModal(false)}
                    className="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-400"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
