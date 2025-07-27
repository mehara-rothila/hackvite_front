// app/student/lecturers/page.tsx
'use client'

import { useState } from 'react'
import Link from 'next/link'

interface Lecturer {
  id: string
  name: string
  title: string
  email: string
  phone?: string
  avatar: string
  department: string
  specialization: string[]
  courses: {
    code: string
    name: string
    semester: string
  }[]
  officeLocation: string
  officeHours: string[]
  biography: string
  researchInterests: string[]
  publications: number
  yearsExperience: number
  rating: number
  responseTime: string
  availability: 'available' | 'busy' | 'away'
  lastActive: string
  preferredContactMethod: 'email' | 'appointment' | 'message'
}

const mockLecturers: Lecturer[] = [
  {
    id: '1',
    name: 'Dr. Sarah Johnson',
    title: 'Professor',
    email: 'sarah.johnson@university.edu',
    phone: '+1 (555) 123-4567',
    avatar: '👩‍🏫',
    department: 'Computer Science',
    specialization: ['Algorithms', 'Data Structures', 'Machine Learning'],
    courses: [
      { code: 'CS101', name: 'Introduction to Programming', semester: 'Fall 2025' },
      { code: 'CS201', name: 'Data Structures', semester: 'Spring 2025' },
      { code: 'CS301', name: 'Algorithms', semester: 'Fall 2025' }
    ],
    officeLocation: 'Computer Science Building, Room 201B',
    officeHours: ['Monday 2:00-4:00 PM', 'Wednesday 2:00-4:00 PM', 'Friday 10:00-12:00 PM'],
    biography: 'Dr. Johnson is a professor of Computer Science with over 15 years of experience in algorithms and machine learning research.',
    researchInterests: ['Machine Learning', 'Artificial Intelligence', 'Algorithm Optimization', 'Data Mining'],
    publications: 45,
    yearsExperience: 15,
    rating: 4.8,
    responseTime: 'Usually responds within 2 hours',
    availability: 'available',
    lastActive: '2025-07-27 10:30',
    preferredContactMethod: 'message'
  },
  {
    id: '2',
    name: 'Prof. Michael Chen',
    title: 'Associate Professor',
    email: 'michael.chen@university.edu',
    phone: '+1 (555) 234-5678',
    avatar: '👨‍🏫',
    department: 'Mathematics',
    specialization: ['Calculus', 'Statistics', 'Mathematical Modeling'],
    courses: [
      { code: 'MATH202', name: 'Calculus II', semester: 'Fall 2025' },
      { code: 'MATH301', name: 'Advanced Statistics', semester: 'Spring 2025' },
      { code: 'STAT101', name: 'Introduction to Statistics', semester: 'Fall 2025' }
    ],
    officeLocation: 'Mathematics Building, Room 301A',
    officeHours: ['Tuesday 10:00-12:00 PM', 'Thursday 10:00-12:00 PM', 'Friday 2:00-4:00 PM'],
    biography: 'Professor Chen specializes in applied mathematics and statistical modeling with applications in engineering and sciences.',
    researchInterests: ['Statistical Modeling', 'Applied Mathematics', 'Probability Theory', 'Data Analysis'],
    publications: 32,
    yearsExperience: 12,
    rating: 4.6,
    responseTime: 'Usually responds within 4 hours',
    availability: 'busy',
    lastActive: '2025-07-27 09:15',
    preferredContactMethod: 'appointment'
  },
  {
    id: '3',
    name: 'Dr. Emily Roberts',
    title: 'Assistant Professor',
    email: 'emily.roberts@university.edu',
    phone: '+1 (555) 345-6789',
    avatar: '👩‍💼',
    department: 'English',
    specialization: ['Academic Writing', 'Literature', 'Communication'],
    courses: [
      { code: 'ENG110', name: 'Academic Writing', semester: 'Fall 2025' },
      { code: 'ENG210', name: 'Advanced Composition', semester: 'Spring 2025' },
      { code: 'LIT301', name: 'Modern Literature', semester: 'Fall 2025' }
    ],
    officeLocation: 'Humanities Building, Room 105C',
    officeHours: ['Monday 9:00-11:00 AM', 'Wednesday 9:00-11:00 AM', 'Friday 1:00-3:00 PM'],
    biography: 'Dr. Roberts focuses on academic writing instruction and contemporary literature analysis.',
    researchInterests: ['Academic Writing Pedagogy', 'Contemporary Literature', 'Digital Humanities', 'Writing Assessment'],
    publications: 18,
    yearsExperience: 8,
    rating: 4.9,
    responseTime: 'Usually responds within 1 hour',
    availability: 'available',
    lastActive: '2025-07-27 11:45',
    preferredContactMethod: 'email'
  },
  {
    id: '4',
    name: 'Dr. Robert Williams',
    title: 'Professor',
    email: 'robert.williams@university.edu',
    avatar: '👨‍🔬',
    department: 'Physics',
    specialization: ['Quantum Physics', 'Thermodynamics', 'Research Methods'],
    courses: [
      { code: 'PHYS101', name: 'General Physics I', semester: 'Fall 2025' },
      { code: 'PHYS201', name: 'Quantum Mechanics', semester: 'Spring 2025' }
    ],
    officeLocation: 'Physics Building, Room 401',
    officeHours: ['Tuesday 1:00-3:00 PM', 'Thursday 1:00-3:00 PM'],
    biography: 'Dr. Williams is a renowned physicist specializing in quantum mechanics and theoretical physics.',
    researchInterests: ['Quantum Computing', 'Theoretical Physics', 'Particle Physics'],
    publications: 67,
    yearsExperience: 20,
    rating: 4.7,
    responseTime: 'Usually responds within 6 hours',
    availability: 'away',
    lastActive: '2025-07-26 16:30',
    preferredContactMethod: 'appointment'
  }
]

const departments = ['All', 'Computer Science', 'Mathematics', 'English', 'Physics', 'Chemistry', 'Biology']
const availabilityFilters = ['All', 'Available', 'Busy', 'Away']
const sortOptions = ['Name A-Z', 'Name Z-A', 'Rating High-Low', 'Department', 'Response Time']

export default function StudentLecturersPage() {
  const [lecturers, setLecturers] = useState<Lecturer[]>(mockLecturers)
  const [searchTerm, setSearchTerm] = useState('')
  const [departmentFilter, setDepartmentFilter] = useState('All')
  const [availabilityFilter, setAvailabilityFilter] = useState('All')
  const [sortBy, setSortBy] = useState('Name A-Z')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [selectedLecturer, setSelectedLecturer] = useState<Lecturer | null>(null)
  const [showContactModal, setShowContactModal] = useState(false)

  // Filter and sort lecturers
  const filteredLecturers = lecturers
    .filter(lecturer => {
      const matchesSearch = lecturer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           lecturer.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           lecturer.specialization.some(spec => spec.toLowerCase().includes(searchTerm.toLowerCase())) ||
                           lecturer.courses.some(course => 
                             course.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
                             course.name.toLowerCase().includes(searchTerm.toLowerCase())
                           )
      const matchesDepartment = departmentFilter === 'All' || lecturer.department === departmentFilter
      const matchesAvailability = availabilityFilter === 'All' || lecturer.availability === availabilityFilter.toLowerCase()
      
      return matchesSearch && matchesDepartment && matchesAvailability
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'Name A-Z': return a.name.localeCompare(b.name)
        case 'Name Z-A': return b.name.localeCompare(a.name)
        case 'Rating High-Low': return b.rating - a.rating
        case 'Department': return a.department.localeCompare(b.department)
        case 'Response Time': return a.responseTime.localeCompare(b.responseTime)
        default: return 0
      }
    })

  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case 'available': return 'bg-green-100 text-green-800'
      case 'busy': return 'bg-yellow-100 text-yellow-800'
      case 'away': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getContactMethodIcon = (method: string) => {
    switch (method) {
      case 'email': return '✉️'
      case 'message': return '💬'
      case 'appointment': return '📅'
      default: return '📞'
    }
  }

  const handleContactLecturer = (lecturer: Lecturer, method: 'message' | 'email' | 'appointment') => {
    switch (method) {
      case 'message':
        // Navigate to compose message with lecturer pre-selected
        window.location.href = `/messages/new?recipient=${lecturer.id}&type=lecturer`
        break
      case 'email':
        window.location.href = `mailto:${lecturer.email}`
        break
      case 'appointment':
        window.location.href = `/student/appointments?lecturer=${lecturer.id}`
        break
    }
  }

  const renderRatingStars = (rating: number) => {
    return '⭐'.repeat(Math.floor(rating)) + (rating % 1 >= 0.5 ? '⭐' : '')
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Lecturer Directory</h1>
          <p className="text-gray-600">Find and connect with your lecturers</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="text-2xl font-bold text-blue-600">{lecturers.length}</div>
            <div className="text-sm text-gray-600">Total Lecturers</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="text-2xl font-bold text-green-600">
              {lecturers.filter(l => l.availability === 'available').length}
            </div>
            <div className="text-sm text-gray-600">Available Now</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="text-2xl font-bold text-purple-600">
              {new Set(lecturers.map(l => l.department)).size}
            </div>
            <div className="text-sm text-gray-600">Departments</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="text-2xl font-bold text-orange-600">
              {lecturers.reduce((total, l) => total + l.courses.length, 0)}
            </div>
            <div className="text-sm text-gray-600">Total Courses</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="text-2xl font-bold text-red-600">
              {(lecturers.reduce((sum, l) => sum + l.rating, 0) / lecturers.length).toFixed(1)}
            </div>
            <div className="text-sm text-gray-600">Avg Rating</div>
          </div>
        </div>

        {/* Filters and Controls */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="flex flex-col sm:flex-row gap-4 flex-1">
              {/* Search */}
              <input
                type="text"
                placeholder="Search lecturers, departments, courses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 flex-1"
              />
              
              {/* Department Filter */}
              <select
                value={departmentFilter}
                onChange={(e) => setDepartmentFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                {departments.map(dept => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>

              {/* Availability Filter */}
              <select
                value={availabilityFilter}
                onChange={(e) => setAvailabilityFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                {availabilityFilters.map(status => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>

              {/* Sort */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                {sortOptions.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>

            {/* View Mode Toggle */}
            <div className="flex gap-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`px-4 py-2 rounded-lg ${viewMode === 'grid' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-200 text-gray-700'}`}
              >
                🔲 Grid
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`px-4 py-2 rounded-lg ${viewMode === 'list' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-200 text-gray-700'}`}
              >
                📄 List
              </button>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Link href="/messages/new?type=lecturer" className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow group">
            <div className="text-center">
              <div className="text-2xl mb-2 group-hover:scale-110 transition-transform">💬</div>
              <div className="font-medium text-gray-900">Send Message</div>
              <div className="text-sm text-gray-600">Start a conversation</div>
            </div>
          </Link>
          
          <Link href="/student/appointments" className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow group">
            <div className="text-center">
              <div className="text-2xl mb-2 group-hover:scale-110 transition-transform">📅</div>
              <div className="font-medium text-gray-900">Book Appointment</div>
              <div className="text-sm text-gray-600">Schedule office hours</div>
            </div>
          </Link>
          
          <Link href="/student/courses" className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow group">
            <div className="text-center">
              <div className="text-2xl mb-2 group-hover:scale-110 transition-transform">📚</div>
              <div className="font-medium text-gray-900">My Courses</div>
              <div className="text-sm text-gray-600">View enrolled courses</div>
            </div>
          </Link>
          
          <Link href="/contacts" className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow group">
            <div className="text-center">
              <div className="text-2xl mb-2 group-hover:scale-110 transition-transform">📇</div>
              <div className="font-medium text-gray-900">All Contacts</div>
              <div className="text-sm text-gray-600">Directory & favorites</div>
            </div>
          </Link>
        </div>

        {/* Results Info */}
        <div className="mb-4">
          <p className="text-gray-600">
            Showing {filteredLecturers.length} of {lecturers.length} lecturers
          </p>
        </div>

        {/* Lecturers Display */}
        {filteredLecturers.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <div className="text-4xl mb-4">🔍</div>
            <div className="text-gray-500 mb-4">No lecturers found</div>
            <div className="text-sm text-gray-400">Try adjusting your search criteria</div>
          </div>
        ) : (
          <div className={viewMode === 'grid' 
            ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' 
            : 'space-y-4'
          }>
            {filteredLecturers.map((lecturer) => (
              <div key={lecturer.id} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
                {viewMode === 'grid' ? (
                  /* Grid View */
                  <div className="p-6">
                    <div className="text-center mb-4">
                      <span className="text-4xl mb-2 block">{lecturer.avatar}</span>
                      <h3 className="text-lg font-semibold text-gray-900">{lecturer.name}</h3>
                      <p className="text-sm text-gray-600">{lecturer.title} • {lecturer.department}</p>
                      <div className="flex items-center justify-center gap-2 mt-1">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getAvailabilityColor(lecturer.availability)}`}>
                          {lecturer.availability.charAt(0).toUpperCase() + lecturer.availability.slice(1)}
                        </span>
                        <span className="text-sm text-yellow-600">
                          {renderRatingStars(lecturer.rating)} {lecturer.rating}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-3 text-sm">
                      <div>
                        <div className="font-medium text-gray-700">Specialization:</div>
                        <div className="text-gray-600">{lecturer.specialization.join(', ')}</div>
                      </div>
                      
                      <div>
                        <div className="font-medium text-gray-700">Courses:</div>
                        <div className="text-gray-600">
                          {lecturer.courses.map(course => course.code).join(', ')}
                        </div>
                      </div>

                      <div>
                        <div className="font-medium text-gray-700">Office:</div>
                        <div className="text-gray-600">{lecturer.officeLocation}</div>
                      </div>

                      <div>
                        <div className="font-medium text-gray-700">Response Time:</div>
                        <div className="text-gray-600">{lecturer.responseTime}</div>
                      </div>
                    </div>

                    <div className="mt-4 pt-4 border-t space-y-2">
                      <button
                        onClick={() => handleContactLecturer(lecturer, 'message')}
                        className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        💬 Send Message
                      </button>
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          onClick={() => handleContactLecturer(lecturer, 'email')}
                          className="bg-gray-50 text-gray-700 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors text-sm"
                        >
                          ✉️ Email
                        </button>
                        <button
                          onClick={() => handleContactLecturer(lecturer, 'appointment')}
                          className="bg-green-50 text-green-700 px-3 py-2 rounded-lg hover:bg-green-100 transition-colors text-sm"
                        >
                          📅 Appointment
                        </button>
                      </div>
                      <button
                        onClick={() => setSelectedLecturer(lecturer)}
                        className="w-full bg-purple-50 text-purple-700 px-4 py-2 rounded-lg hover:bg-purple-100 transition-colors text-sm"
                      >
                        👤 View Profile
                      </button>
                    </div>
                  </div>
                ) : (
                  /* List View */
                  <div className="p-6">
                    <div className="flex items-start gap-4">
                      <span className="text-3xl">{lecturer.avatar}</span>
                      
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-semibold text-gray-900">{lecturer.name}</h3>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getAvailabilityColor(lecturer.availability)}`}>
                            {lecturer.availability.charAt(0).toUpperCase() + lecturer.availability.slice(1)}
                          </span>
                          <span className="text-sm text-yellow-600">
                            {renderRatingStars(lecturer.rating)} {lecturer.rating}
                          </span>
                        </div>
                        
                        <p className="text-sm text-gray-600 mb-2">{lecturer.title} • {lecturer.department}</p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm mb-3">
                          <div>
                            <span className="font-medium text-gray-700">Specialization:</span><br />
                            <span className="text-gray-600">{lecturer.specialization.join(', ')}</span>
                          </div>
                          <div>
                            <span className="font-medium text-gray-700">Courses:</span><br />
                            <span className="text-gray-600">{lecturer.courses.map(c => c.code).join(', ')}</span>
                          </div>
                          <div>
                            <span className="font-medium text-gray-700">Office:</span><br />
                            <span className="text-gray-600">{lecturer.officeLocation}</span>
                          </div>
                        </div>

                        <p className="text-sm text-gray-600 mb-3">{lecturer.responseTime}</p>
                      </div>
                      
                      <div className="flex flex-col gap-2">
                        <button
                          onClick={() => handleContactLecturer(lecturer, 'message')}
                          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm"
                        >
                          💬 Message
                        </button>
                        <button
                          onClick={() => handleContactLecturer(lecturer, 'email')}
                          className="bg-gray-50 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors text-sm"
                        >
                          ✉️ Email
                        </button>
                        <button
                          onClick={() => handleContactLecturer(lecturer, 'appointment')}
                          className="bg-green-50 text-green-700 px-4 py-2 rounded-lg hover:bg-green-100 transition-colors text-sm"
                        >
                          📅 Appointment
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Lecturer Profile Modal */}
        {selectedLecturer && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-2xl font-bold">{selectedLecturer.name} - Profile</h2>
                <button
                  onClick={() => setSelectedLecturer(null)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-1">
                  <div className="text-center mb-6">
                    <span className="text-6xl mb-4 block">{selectedLecturer.avatar}</span>
                    <h3 className="text-xl font-semibold">{selectedLecturer.name}</h3>
                    <p className="text-gray-600">{selectedLecturer.title}</p>
                    <p className="text-gray-600">{selectedLecturer.department}</p>
                    <div className="mt-2">
                      <span className="text-yellow-600">
                        {renderRatingStars(selectedLecturer.rating)} {selectedLecturer.rating}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <button
                      onClick={() => handleContactLecturer(selectedLecturer, 'message')}
                      className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                    >
                      💬 Send Message
                    </button>
                    <button
                      onClick={() => handleContactLecturer(selectedLecturer, 'email')}
                      className="w-full bg-gray-50 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-100 border"
                    >
                      ✉️ Send Email
                    </button>
                    <button
                      onClick={() => handleContactLecturer(selectedLecturer, 'appointment')}
                      className="w-full bg-green-50 text-green-700 px-4 py-2 rounded-lg hover:bg-green-100 border"
                    >
                      📅 Book Appointment
                    </button>
                  </div>
                </div>

                <div className="lg:col-span-2">
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Contact Information</h4>
                      <div className="space-y-1 text-sm">
                        <div>📧 {selectedLecturer.email}</div>
                        {selectedLecturer.phone && <div>📞 {selectedLecturer.phone}</div>}
                        <div>📍 {selectedLecturer.officeLocation}</div>
                        <div>⏰ {selectedLecturer.responseTime}</div>
                        <div>💬 Prefers: {getContactMethodIcon(selectedLecturer.preferredContactMethod)} {selectedLecturer.preferredContactMethod}</div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Biography</h4>
                      <p className="text-gray-600 text-sm">{selectedLecturer.biography}</p>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Specialization</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedLecturer.specialization.map((spec, idx) => (
                          <span key={idx} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                            {spec}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Current Courses</h4>
                      <div className="space-y-2">
                        {selectedLecturer.courses.map((course, idx) => (
                          <div key={idx} className="p-3 bg-gray-50 rounded-lg">
                            <div className="font-medium">{course.code} - {course.name}</div>
                            <div className="text-sm text-gray-600">{course.semester}</div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Office Hours</h4>
                      <div className="space-y-1">
                        {selectedLecturer.officeHours.map((hour, idx) => (
                          <div key={idx} className="text-sm text-gray-600">📅 {hour}</div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Research Interests</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedLecturer.researchInterests.map((interest, idx) => (
                          <span key={idx} className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                            {interest}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-3 bg-purple-50 rounded-lg">
                        <div className="font-medium text-purple-900">Publications</div>
                        <div className="text-2xl font-bold text-purple-600">{selectedLecturer.publications}</div>
                      </div>
                      <div className="p-3 bg-orange-50 rounded-lg">
                        <div className="font-medium text-orange-900">Experience</div>
                        <div className="text-2xl font-bold text-orange-600">{selectedLecturer.yearsExperience} years</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}