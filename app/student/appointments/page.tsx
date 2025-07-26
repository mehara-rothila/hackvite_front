// app/student/appointments/page.tsx
'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

interface Appointment {
  id: string
  lecturer: string
  lecturerEmail: string
  subject: string
  description: string
  date: string
  time: string
  duration: number // minutes
  location: string
  type: 'office-hours' | 'consultation' | 'project-discussion' | 'exam-review'
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed'
  meetingLink?: string
  notes?: string
  bookedAt: string
}

interface TimeSlot {
  id: string
  lecturer: string
  date: string
  time: string
  duration: number
  available: boolean
  location: string
  type: string
}

const mockAppointments: Appointment[] = [
  {
    id: '1',
    lecturer: 'Dr. Sarah Johnson',
    lecturerEmail: 'sarah.johnson@university.edu',
    subject: 'Assignment 3 Discussion',
    description: 'Need help understanding the sorting algorithm requirements',
    date: '2025-07-28',
    time: '14:00',
    duration: 30,
    location: 'Office 201B',
    type: 'office-hours',
    status: 'confirmed',
    notes: 'Bring your code and any specific questions',
    bookedAt: '2025-07-26 10:30'
  },
  {
    id: '2',
    lecturer: 'Prof. Michael Chen',
    lecturerEmail: 'michael.chen@university.edu',
    subject: 'Calculus Review Session',
    description: 'Review derivatives and integration techniques',
    date: '2025-07-29',
    time: '10:00',
    duration: 45,
    location: 'Office 301A',
    type: 'consultation',
    status: 'pending',
    bookedAt: '2025-07-26 15:20'
  },
  {
    id: '3',
    lecturer: 'Dr. Sarah Johnson',
    lecturerEmail: 'sarah.johnson@university.edu',
    subject: 'Project Proposal Review',
    description: 'Final project proposal discussion and feedback',
    date: '2025-07-25',
    time: '16:00',
    duration: 30,
    location: 'Office 201B',
    type: 'project-discussion',
    status: 'completed',
    notes: 'Great proposal! Make sure to include the testing plan.',
    bookedAt: '2025-07-23 09:15'
  }
]

const mockAvailableSlots: TimeSlot[] = [
  {
    id: 'slot1',
    lecturer: 'Dr. Sarah Johnson',
    date: '2025-07-29',
    time: '09:00',
    duration: 30,
    available: true,
    location: 'Office 201B',
    type: 'office-hours'
  },
  {
    id: 'slot2',
    lecturer: 'Dr. Sarah Johnson',
    date: '2025-07-29',
    time: '09:30',
    duration: 30,
    available: true,
    location: 'Office 201B',
    type: 'office-hours'
  },
  {
    id: 'slot3',
    lecturer: 'Prof. Michael Chen',
    date: '2025-07-30',
    time: '14:00',
    duration: 45,
    available: true,
    location: 'Office 301A',
    type: 'consultation'
  },
  {
    id: 'slot4',
    lecturer: 'Dr. Emily Roberts',
    date: '2025-07-30',
    time: '11:00',
    duration: 30,
    available: true,
    location: 'Office 105C',
    type: 'office-hours'
  }
]

const lecturers = ['All', 'Dr. Sarah Johnson', 'Prof. Michael Chen', 'Dr. Emily Roberts']
const appointmentTypes = ['All', 'Office Hours', 'Consultation', 'Project Discussion', 'Exam Review']
const statusFilters = ['All', 'Pending', 'Confirmed', 'Cancelled', 'Completed']

export default function StudentAppointmentsPage() {
  const searchParams = useSearchParams()
  const [appointments, setAppointments] = useState<Appointment[]>(mockAppointments)
  const [availableSlots, setAvailableSlots] = useState<TimeSlot[]>(mockAvailableSlots)
  const [showBookingForm, setShowBookingForm] = useState(false)
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null)
  const [lecturerFilter, setLecturerFilter] = useState(searchParams?.get('lecturer') || 'All')
  const [statusFilter, setStatusFilter] = useState('All')
  const [typeFilter, setTypeFilter] = useState('All')

  // Booking form state
  const [bookingForm, setBookingForm] = useState({
    subject: '',
    description: '',
    type: 'office-hours' as const
  })

  useEffect(() => {
    // Set lecturer filter from URL parameter
    if (searchParams?.get('lecturer')) {
      setLecturerFilter(searchParams.get('lecturer') || 'All')
    }
  }, [searchParams])

  const handleBookAppointment = (slot: TimeSlot) => {
    setSelectedSlot(slot)
    setBookingForm({
      subject: '',
      description: '',
      type: slot.type as any
    })
    setShowBookingForm(true)
  }

  const handleSubmitBooking = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!selectedSlot) return

    const newAppointment: Appointment = {
      id: Date.now().toString(),
      lecturer: selectedSlot.lecturer,
      lecturerEmail: `${selectedSlot.lecturer.toLowerCase().replace(/\s+/g, '.')}@university.edu`,
      subject: bookingForm.subject,
      description: bookingForm.description,
      date: selectedSlot.date,
      time: selectedSlot.time,
      duration: selectedSlot.duration,
      location: selectedSlot.location,
      type: bookingForm.type,
      status: 'pending',
      bookedAt: new Date().toLocaleString()
    }

    setAppointments([newAppointment, ...appointments])
    
    // Remove the booked slot from available slots
    setAvailableSlots(availableSlots.filter(slot => slot.id !== selectedSlot.id))
    
    setShowBookingForm(false)
    setSelectedSlot(null)
    setBookingForm({
      subject: '',
      description: '',
      type: 'office-hours'
    })
  }

  const handleCancelAppointment = (appointmentId: string) => {
    if (confirm('Are you sure you want to cancel this appointment?')) {
      setAppointments(appointments.map(apt => 
        apt.id === appointmentId 
          ? { ...apt, status: 'cancelled' as const }
          : apt
      ))
    }
  }

  const handleRescheduleAppointment = (appointmentId: string) => {
    // In a real app, this would open a reschedule dialog
    alert('Reschedule functionality would be implemented here')
  }

  // Filter appointments
  const filteredAppointments = appointments.filter(appointment => {
    const matchesLecturer = lecturerFilter === 'All' || appointment.lecturer === lecturerFilter
    const matchesStatus = statusFilter === 'All' || appointment.status === statusFilter.toLowerCase()
    const matchesType = typeFilter === 'All' || 
                       appointment.type === typeFilter.toLowerCase().replace(' ', '-')
    
    return matchesLecturer && matchesStatus && matchesType
  })

  // Filter available slots
  const filteredSlots = availableSlots.filter(slot => {
    const matchesLecturer = lecturerFilter === 'All' || slot.lecturer === lecturerFilter
    return matchesLecturer && slot.available
  })

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

  const upcomingAppointments = appointments.filter(apt => 
    (apt.status === 'confirmed' || apt.status === 'pending') && 
    new Date(`${apt.date} ${apt.time}`) > new Date()
  )

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Appointments</h1>
          <p className="text-gray-600">Book and manage your appointments with lecturers</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="text-2xl font-bold text-blue-600">{upcomingAppointments.length}</div>
            <div className="text-sm text-gray-600">Upcoming</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="text-2xl font-bold text-yellow-600">
              {appointments.filter(apt => apt.status === 'pending').length}
            </div>
            <div className="text-sm text-gray-600">Pending Confirmation</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="text-2xl font-bold text-green-600">
              {appointments.filter(apt => apt.status === 'completed').length}
            </div>
            <div className="text-sm text-gray-600">Completed</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="text-2xl font-bold text-purple-600">{availableSlots.length}</div>
            <div className="text-sm text-gray-600">Available Slots</div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-sm mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              <button className="border-b-2 border-blue-500 text-blue-600 py-4 px-2 text-sm font-medium">
                My Appointments
              </button>
              <button 
                onClick={() => setShowBookingForm(true)}
                className="border-b-2 border-transparent text-gray-500 hover:text-gray-700 py-4 px-2 text-sm font-medium"
              >
                Book New Appointment
              </button>
            </nav>
          </div>

          {/* Filters */}
          <div className="p-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <select
                value={lecturerFilter}
                onChange={(e) => setLecturerFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                {lecturers.map(lecturer => (
                  <option key={lecturer} value={lecturer}>{lecturer}</option>
                ))}
              </select>

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
                {appointmentTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
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
              <button
                onClick={() => setShowBookingForm(true)}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
              >
                Book Your First Appointment
              </button>
            </div>
          ) : (
            filteredAppointments.map((appointment) => (
              <div key={appointment.id} className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">{appointment.subject}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(appointment.status)}`}>
                        {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(appointment.type)}`}>
                        {appointment.type.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                      </span>
                    </div>
                    
                    <div className="text-gray-600 mb-3">{appointment.description}</div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-gray-500">
                      <div>
                        <span className="font-medium">Lecturer:</span><br />
                        {appointment.lecturer}
                      </div>
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
                    </div>

                    {appointment.notes && (
                      <div className="mt-3 p-3 bg-blue-50 rounded-lg">
                        <div className="text-sm font-medium text-blue-900">Notes:</div>
                        <div className="text-sm text-blue-800">{appointment.notes}</div>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex flex-col gap-2">
                    {appointment.status === 'confirmed' && new Date(`${appointment.date} ${appointment.time}`) > new Date() && (
                      <>
                        <button
                          onClick={() => handleRescheduleAppointment(appointment.id)}
                          className="bg-blue-50 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-100 transition-colors text-sm"
                        >
                          📅 Reschedule
                        </button>
                        <button
                          onClick={() => handleCancelAppointment(appointment.id)}
                          className="bg-red-50 text-red-600 px-4 py-2 rounded-lg hover:bg-red-100 transition-colors text-sm"
                        >
                          ❌ Cancel
                        </button>
                      </>
                    )}
                    
                    {appointment.status === 'pending' && (
                      <div className="text-xs text-gray-500 text-center">
                        Waiting for lecturer confirmation
                      </div>
                    )}

                    <Link
                      href={`mailto:${appointment.lecturerEmail}?subject=Re: ${appointment.subject}`}
                      className="bg-green-50 text-green-600 px-4 py-2 rounded-lg hover:bg-green-100 transition-colors text-sm text-center"
                    >
                      ✉️ Email Lecturer
                    </Link>

                    {appointment.meetingLink && (
                      <a
                        href={appointment.meetingLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-purple-50 text-purple-600 px-4 py-2 rounded-lg hover:bg-purple-100 transition-colors text-sm text-center"
                      >
                        🎥 Join Meeting
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Booking Form Modal */}
        {showBookingForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
              <h2 className="text-2xl font-bold mb-6">Book New Appointment</h2>

              {!selectedSlot ? (
                // Available Slots List
                <div>
                  <h3 className="text-lg font-semibold mb-4">Available Time Slots</h3>
                  <div className="space-y-3 mb-6">
                    {filteredSlots.map((slot) => (
                      <div key={slot.id} className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-medium text-gray-900">{slot.lecturer}</div>
                            <div className="text-sm text-gray-600">
                              {slot.date} at {slot.time} ({slot.duration} minutes)
                            </div>
                            <div className="text-sm text-gray-500">{slot.location}</div>
                            <span className={`inline-block mt-1 px-2 py-1 rounded text-xs ${getTypeColor(slot.type)}`}>
                              {slot.type.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                            </span>
                          </div>
                          <button
                            onClick={() => handleBookAppointment(slot)}
                            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                          >
                            Book This Slot
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {filteredSlots.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                      <div className="text-4xl mb-4">📅</div>
                      <div>No available slots found</div>
                      <div className="text-sm text-gray-400 mt-2">Try adjusting your lecturer filter</div>
                    </div>
                  )}
                </div>
              ) : (
                // Booking Form
                <form onSubmit={handleSubmitBooking} className="space-y-6">
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h3 className="font-medium text-blue-900">Selected Time Slot</h3>
                    <div className="text-sm text-blue-800">
                      {selectedSlot.lecturer} - {selectedSlot.date} at {selectedSlot.time} ({selectedSlot.duration} minutes)
                    </div>
                    <div className="text-sm text-blue-600">{selectedSlot.location}</div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                    <input
                      type="text"
                      required
                      value={bookingForm.subject}
                      onChange={(e) => setBookingForm({...bookingForm, subject: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="Brief subject for your appointment"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <textarea
                      rows={4}
                      value={bookingForm.description}
                      onChange={(e) => setBookingForm({...bookingForm, description: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="Please describe what you'd like to discuss during this appointment"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Appointment Type</label>
                    <select
                      value={bookingForm.type}
                      onChange={(e) => setBookingForm({...bookingForm, type: e.target.value as any})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="office-hours">Office Hours</option>
                      <option value="consultation">Consultation</option>
                      <option value="project-discussion">Project Discussion</option>
                      <option value="exam-review">Exam Review</option>
                    </select>
                  </div>

                  <div className="flex gap-4 pt-4">
                    <button
                      type="submit"
                      className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
                    >
                      Book Appointment
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedSlot(null)
                        setShowBookingForm(false)
                      }}
                      className="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-400"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={() => setSelectedSlot(null)}
                      className="bg-gray-100 text-gray-600 px-6 py-2 rounded-lg hover:bg-gray-200"
                    >
                      ← Back to Slots
                    </button>
                  </div>
                </form>
              )}

              {!selectedSlot && (
                <div className="flex justify-end pt-4 border-t">
                  <button
                    onClick={() => setShowBookingForm(false)}
                    className="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-400"
                  >
                    Close
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}