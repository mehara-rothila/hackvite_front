// app/lecturer/students/page.tsx
'use client'

import { useState } from 'react'
import Link from 'next/link'

interface Student {
  id: string
  name: string
  email: string
  studentId: string
  avatar: string
  year: string
  major: string
  gpa: number
  enrolledCourses: {
    code: string
    name: string
    semester: string
    grade?: string
    attendance: number
  }[]
  contactInfo: {
    phone?: string
    address?: string
    emergencyContact?: string
  }
  academicStatus: 'good-standing' | 'probation' | 'honors'
  lastActive: string
  totalCredits: number
  communicationPreference: 'email' | 'message' | 'appointment'
  specialNeeds?: string[]
  notes?: string
  queryHistory: number
  appointmentHistory: number
  responseRate: number
  parentalAccess: boolean
}

const mockStudents: Student[] = [
  {
    id: '1',
    name: 'Alice Johnson',
    email: 'alice.johnson@student.edu',
    studentId: 'STU001',
    avatar: '👩‍🎓',
    year: 'Sophomore',
    major: 'Computer Science',
    gpa: 3.8,
    enrolledCourses: [
      { code: 'CS101', name: 'Introduction to Programming', semester: 'Fall 2025', grade: 'A-', attendance: 95 },
      { code: 'MATH202', name: 'Calculus II', semester: 'Fall 2025', attendance: 88 },
      { code: 'ENG110', name: 'Academic Writing', semester: 'Fall 2025', grade: 'B+', attendance: 92 }
    ],
    contactInfo: {
      phone: '+1 (555) 111-2222',
      address: 'Dorm Building A, Room 204',
      emergencyContact: 'Parent: +1 (555) 333-4444'
    },
    academicStatus: 'good-standing',
    lastActive: '2025-07-27 10:30',
    totalCredits: 45,
    communicationPreference: 'email',
    specialNeeds: ['Extended test time'],
    notes: 'Excellent programming skills, very engaged in class discussions',
    queryHistory: 8,
    appointmentHistory: 3,
    responseRate: 95,
    parentalAccess: false
  },
  {
    id: '2',
    name: 'Bob Smith',
    email: 'bob.smith@student.edu',
    studentId: 'STU002',
    avatar: '👨‍🎓',
    year: 'Junior',
    major: 'Computer Science',
    gpa: 3.2,
    enrolledCourses: [
      { code: 'CS101', name: 'Introduction to Programming', semester: 'Fall 2025', attendance: 78 },
      { code: 'CS201', name: 'Data Structures', semester: 'Fall 2025', grade: 'B', attendance: 85 }
    ],
    contactInfo: {
      phone: '+1 (555) 222-3333',
      address: 'Off-campus: 123 Student St, Apt 2B'
    },
    academicStatus: 'good-standing',
    lastActive: '2025-07-26 15:45',
    totalCredits: 78,
    communicationPreference: 'message',
    notes: 'Shows improvement in recent assignments, participates actively',
    queryHistory: 12,
    appointmentHistory: 7,
    responseRate: 87,
    parentalAccess: true
  },
  {
    id: '3',
    name: 'Carol Davis',
    email: 'carol.davis@student.edu',
    studentId: 'STU003',
    avatar: '👩‍🎓',
    year: 'Freshman',
    major: 'Mathematics',
    gpa: 4.0,
    enrolledCourses: [
      { code: 'MATH202', name: 'Calculus II', semester: 'Fall 2025', grade: 'A', attendance: 98 },
      { code: 'ENG110', name: 'Academic Writing', semester: 'Fall 2025', grade: 'A', attendance: 95 }
    ],
    contactInfo: {
      phone: '+1 (555) 444-5555',
      address: 'Dorm Building C, Room 301',
      emergencyContact: 'Guardian: +1 (555) 666-7777'
    },
    academicStatus: 'honors',
    lastActive: '2025-07-27 09:15',
    totalCredits: 15,
    communicationPreference: 'appointment',
    specialNeeds: ['Quiet testing environment'],
    notes: 'Outstanding academic performance, natural leadership qualities',
    queryHistory: 5,
    appointmentHistory: 2,
    responseRate: 100,
    parentalAccess: false
  },
  {
    id: '4',
    name: 'David Wilson',
    email: 'david.wilson@student.edu',
    studentId: 'STU004',
    avatar: '👨‍🎓',
    year: 'Senior',
    major: 'Physics',
    gpa: 2.8,
    enrolledCourses: [
      { code: 'PHYS101', name: 'General Physics I', semester: 'Fall 2025', grade: 'C+', attendance: 65 },
      { code: 'MATH202', name: 'Calculus II', semester: 'Fall 2025', attendance: 70 }
    ],
    contactInfo: {
      phone: '+1 (555) 555-6666',
      address: 'Off-campus: 456 College Ave'
    },
    academicStatus: 'probation',
    lastActive: '2025-07-25 14:20',
    totalCredits: 95,
    communicationPreference: 'email',
    specialNeeds: ['Academic support services'],
    notes: 'Needs additional support, consider tutoring referral',
    queryHistory: 15,
    appointmentHistory: 10,
    responseRate: 72,
    parentalAccess: true
  }
]

const yearFilters = ['All', 'Freshman', 'Sophomore', 'Junior', 'Senior']
const statusFilters = ['All', 'Good Standing', 'Honors', 'Probation']
const courseFilters = ['All', 'CS101', 'CS201', 'MATH202', 'ENG110', 'PHYS101']
const sortOptions = ['Name A-Z', 'Name Z-A', 'GPA High-Low', 'GPA Low-High', 'Student ID', 'Last Active']

export default function LecturerStudentsPage() {
  const [students, setStudents] = useState<Student[]>(mockStudents)
  const [searchTerm, setSearchTerm] = useState('')
  const [yearFilter, setYearFilter] = useState('All')
  const [statusFilter, setStatusFilter] = useState('All')
  const [courseFilter, setCourseFilter] = useState('All')
  const [sortBy, setSortBy] = useState('Name A-Z')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list')
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null)
  const [showNotesModal, setShowNotesModal] = useState(false)
  const [editingNotes, setEditingNotes] = useState('')

  // Filter and sort students
  const filteredStudents = students
    .filter(student => {
      const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           student.studentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           student.major.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesYear = yearFilter === 'All' || student.year === yearFilter
      const matchesStatus = statusFilter === 'All' || 
                           student.academicStatus === statusFilter.toLowerCase().replace(' ', '-')
      const matchesCourse = courseFilter === 'All' || 
                           student.enrolledCourses.some(course => course.code === courseFilter)
      
      return matchesSearch && matchesYear && matchesStatus && matchesCourse
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'Name A-Z': return a.name.localeCompare(b.name)
        case 'Name Z-A': return b.name.localeCompare(a.name)
        case 'GPA High-Low': return b.gpa - a.gpa
        case 'GPA Low-High': return a.gpa - b.gpa
        case 'Student ID': return a.studentId.localeCompare(b.studentId)
        case 'Last Active': return new Date(b.lastActive).getTime() - new Date(a.lastActive).getTime()
        default: return 0
      }
    })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'good-standing': return 'bg-green-100 text-green-800'
      case 'honors': return 'bg-purple-100 text-purple-800'
      case 'probation': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getGPAColor = (gpa: number) => {
    if (gpa >= 3.7) return 'text-green-600'
    if (gpa >= 3.0) return 'text-blue-600'
    if (gpa >= 2.5) return 'text-orange-600'
    return 'text-red-600'
  }

  const handleContactStudent = (student: Student, method: 'message' | 'email' | 'appointment') => {
    switch (method) {
      case 'message':
        window.location.href = `/messages/new?recipient=${student.id}&type=student`
        break
      case 'email':
        window.location.href = `mailto:${student.email}`
        break
      case 'appointment':
        window.location.href = `/lecturer/appointments?student=${student.id}`
        break
    }
  }

  const handleUpdateNotes = (studentId: string, notes: string) => {
    setStudents(students.map(s => 
      s.id === studentId ? { ...s, notes } : s
    ))
    setShowNotesModal(false)
    setEditingNotes('')
  }

  const getAttendanceColor = (attendance: number) => {
    if (attendance >= 90) return 'text-green-600'
    if (attendance >= 80) return 'text-blue-600'
    if (attendance >= 70) return 'text-orange-600'
    return 'text-red-600'
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Student Directory</h1>
          <p className="text-gray-600">View and manage your students</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="text-2xl font-bold text-blue-600">{students.length}</div>
            <div className="text-sm text-gray-600">Total Students</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="text-2xl font-bold text-green-600">
              {students.filter(s => s.academicStatus === 'good-standing').length}
            </div>
            <div className="text-sm text-gray-600">Good Standing</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="text-2xl font-bold text-purple-600">
              {students.filter(s => s.academicStatus === 'honors').length}
            </div>
            <div className="text-sm text-gray-600">Honors</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="text-2xl font-bold text-red-600">
              {students.filter(s => s.academicStatus === 'probation').length}
            </div>
            <div className="text-sm text-gray-600">On Probation</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="text-2xl font-bold text-orange-600">
              {(students.reduce((sum, s) => sum + s.gpa, 0) / students.length).toFixed(2)}
            </div>
            <div className="text-sm text-gray-600">Average GPA</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="text-2xl font-bold text-cyan-600">
              {students.reduce((sum, s) => sum + s.enrolledCourses.length, 0)}
            </div>
            <div className="text-sm text-gray-600">Total Enrollments</div>
          </div>
        </div>

        {/* Filters and Controls */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="flex flex-col sm:flex-row gap-4 flex-1">
              {/* Search */}
              <input
                type="text"
                placeholder="Search students, ID, email, major..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 flex-1"
              />
              
              {/* Year Filter */}
              <select
                value={yearFilter}
                onChange={(e) => setYearFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                {yearFilters.map(year => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>

              {/* Status Filter */}
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                {statusFilters.map(status => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>

              {/* Course Filter */}
              <select
                value={courseFilter}
                onChange={(e) => setCourseFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                {courseFilters.map(course => (
                  <option key={course} value={course}>{course}</option>
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
          <Link href="/messages/new?type=student" className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow group">
            <div className="text-center">
              <div className="text-2xl mb-2 group-hover:scale-110 transition-transform">💬</div>
              <div className="font-medium text-gray-900">Send Message</div>
              <div className="text-sm text-gray-600">Contact students</div>
            </div>
          </Link>
          
          <Link href="/lecturer/announcements" className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow group">
            <div className="text-center">
              <div className="text-2xl mb-2 group-hover:scale-110 transition-transform">📢</div>
              <div className="font-medium text-gray-900">Send Announcement</div>
              <div className="text-sm text-gray-600">Broadcast to class</div>
            </div>
          </Link>
          
          <Link href="/lecturer/analytics" className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow group">
            <div className="text-center">
              <div className="text-2xl mb-2 group-hover:scale-110 transition-transform">📊</div>
              <div className="font-medium text-gray-900">Student Analytics</div>
              <div className="text-sm text-gray-600">Performance insights</div>
            </div>
          </Link>
          
          <Link href="/lecturer/courses" className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow group">
            <div className="text-center">
              <div className="text-2xl mb-2 group-hover:scale-110 transition-transform">📚</div>
              <div className="font-medium text-gray-900">Course Management</div>
              <div className="text-sm text-gray-600">Manage enrollments</div>
            </div>
          </Link>
        </div>

        {/* Results Info */}
        <div className="mb-4">
          <p className="text-gray-600">
            Showing {filteredStudents.length} of {students.length} students
          </p>
        </div>

        {/* Students Display */}
        {filteredStudents.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <div className="text-4xl mb-4">🔍</div>
            <div className="text-gray-500 mb-4">No students found</div>
            <div className="text-sm text-gray-400">Try adjusting your search criteria</div>
          </div>
        ) : (
          <div className={viewMode === 'grid' 
            ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' 
            : 'space-y-4'
          }>
            {filteredStudents.map((student) => (
              <div key={student.id} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
                {viewMode === 'grid' ? (
                  /* Grid View */
                  <div className="p-6">
                    <div className="text-center mb-4">
                      <span className="text-4xl mb-2 block">{student.avatar}</span>
                      <h3 className="text-lg font-semibold text-gray-900">{student.name}</h3>
                      <p className="text-sm text-gray-600">{student.studentId} • {student.year}</p>
                      <p className="text-sm text-gray-600">{student.major}</p>
                      <div className="flex items-center justify-center gap-2 mt-1">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(student.academicStatus)}`}>
                          {student.academicStatus.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                        </span>
                        <span className={`font-bold ${getGPAColor(student.gpa)}`}>
                          GPA: {student.gpa.toFixed(1)}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-3 text-sm">
                      <div>
                        <div className="font-medium text-gray-700">Enrolled Courses:</div>
                        <div className="text-gray-600">
                          {student.enrolledCourses.map(course => course.code).join(', ')}
                        </div>
                      </div>
                      
                      <div>
                        <div className="font-medium text-gray-700">Total Credits:</div>
                        <div className="text-gray-600">{student.totalCredits}</div>
                      </div>

                      <div>
                        <div className="font-medium text-gray-700">Communication:</div>
                        <div className="text-gray-600">{student.queryHistory} queries, {student.appointmentHistory} appointments</div>
                      </div>

                      <div>
                        <div className="font-medium text-gray-700">Response Rate:</div>
                        <div className={`${student.responseRate >= 80 ? 'text-green-600' : 'text-red-600'}`}>
                          {student.responseRate}%
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 pt-4 border-t space-y-2">
                      <button
                        onClick={() => handleContactStudent(student, 'message')}
                        className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        💬 Send Message
                      </button>
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          onClick={() => handleContactStudent(student, 'email')}
                          className="bg-gray-50 text-gray-700 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors text-sm"
                        >
                          ✉️ Email
                        </button>
                        <button
                          onClick={() => {
                            setSelectedStudent(student)
                            setEditingNotes(student.notes || '')
                            setShowNotesModal(true)
                          }}
                          className="bg-yellow-50 text-yellow-700 px-3 py-2 rounded-lg hover:bg-yellow-100 transition-colors text-sm"
                        >
                          📝 Notes
                        </button>
                      </div>
                      <button
                        onClick={() => setSelectedStudent(student)}
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
                      <span className="text-3xl">{student.avatar}</span>
                      
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-semibold text-gray-900">{student.name}</h3>
                          <span className="text-sm text-gray-600">{student.studentId}</span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(student.academicStatus)}`}>
                            {student.academicStatus.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                          </span>
                          <span className={`font-bold ${getGPAColor(student.gpa)}`}>
                            GPA: {student.gpa.toFixed(1)}
                          </span>
                        </div>
                        
                        <p className="text-sm text-gray-600 mb-2">{student.year} • {student.major} • {student.totalCredits} credits</p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm mb-3">
                          <div>
                            <span className="font-medium text-gray-700">Courses:</span><br />
                            <span className="text-gray-600">{student.enrolledCourses.map(c => c.code).join(', ')}</span>
                          </div>
                          <div>
                            <span className="font-medium text-gray-700">Communication:</span><br />
                            <span className="text-gray-600">{student.queryHistory} queries, {student.appointmentHistory} appts</span>
                          </div>
                          <div>
                            <span className="font-medium text-gray-700">Response Rate:</span><br />
                            <span className={`${student.responseRate >= 80 ? 'text-green-600' : 'text-red-600'}`}>
                              {student.responseRate}%
                            </span>
                          </div>
                          <div>
                            <span className="font-medium text-gray-700">Last Active:</span><br />
                            <span className="text-gray-600">{new Date(student.lastActive).toLocaleDateString()}</span>
                          </div>
                        </div>

                        {student.notes && (
                          <div className="p-2 bg-yellow-50 rounded text-sm">
                            <span className="font-medium text-yellow-800">Notes: </span>
                            <span className="text-yellow-700">{student.notes}</span>
                          </div>
                        )}
                      </div>
                      
                      <div className="flex flex-col gap-2">
                        <button
                          onClick={() => handleContactStudent(student, 'message')}
                          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm"
                        >
                          💬 Message
                        </button>
                        <button
                          onClick={() => handleContactStudent(student, 'email')}
                          className="bg-gray-50 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors text-sm"
                        >
                          ✉️ Email
                        </button>
                        <button
                          onClick={() => {
                            setSelectedStudent(student)
                            setEditingNotes(student.notes || '')
                            setShowNotesModal(true)
                          }}
                          className="bg-yellow-50 text-yellow-700 px-4 py-2 rounded-lg hover:bg-yellow-100 transition-colors text-sm"
                        >
                          📝 Notes
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Student Profile Modal */}
        {selectedStudent && !showNotesModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg p-6 w-full max-w-5xl max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-2xl font-bold">{selectedStudent.name} - Student Profile</h2>
                <button
                  onClick={() => setSelectedStudent(null)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-1">
                  <div className="text-center mb-6">
                    <span className="text-6xl mb-4 block">{selectedStudent.avatar}</span>
                    <h3 className="text-xl font-semibold">{selectedStudent.name}</h3>
                    <p className="text-gray-600">{selectedStudent.studentId}</p>
                    <p className="text-gray-600">{selectedStudent.year} • {selectedStudent.major}</p>
                    <div className="mt-2">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(selectedStudent.academicStatus)}`}>
                        {selectedStudent.academicStatus.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                      </span>
                    </div>
                    <div className={`text-2xl font-bold mt-2 ${getGPAColor(selectedStudent.gpa)}`}>
                      GPA: {selectedStudent.gpa.toFixed(2)}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <button
                      onClick={() => handleContactStudent(selectedStudent, 'message')}
                      className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                    >
                      💬 Send Message
                    </button>
                    <button
                      onClick={() => handleContactStudent(selectedStudent, 'email')}
                      className="w-full bg-gray-50 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-100 border"
                    >
                      ✉️ Send Email
                    </button>
                    <button
                      onClick={() => {
                        setEditingNotes(selectedStudent.notes || '')
                        setShowNotesModal(true)
                      }}
                      className="w-full bg-yellow-50 text-yellow-700 px-4 py-2 rounded-lg hover:bg-yellow-100 border"
                    >
                      📝 Edit Notes
                    </button>
                  </div>
                </div>

                <div className="lg:col-span-2">
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Contact Information</h4>
                      <div className="space-y-1 text-sm">
                        <div>📧 {selectedStudent.email}</div>
                        {selectedStudent.contactInfo.phone && <div>📞 {selectedStudent.contactInfo.phone}</div>}
                        {selectedStudent.contactInfo.address && <div>📍 {selectedStudent.contactInfo.address}</div>}
                        {selectedStudent.contactInfo.emergencyContact && <div>🚨 {selectedStudent.contactInfo.emergencyContact}</div>}
                        <div>💬 Prefers: {selectedStudent.communicationPreference}</div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Academic Overview</h4>
                      <div className="grid grid-cols-3 gap-4">
                        <div className="p-3 bg-blue-50 rounded-lg">
                          <div className="font-medium text-blue-900">Total Credits</div>
                          <div className="text-2xl font-bold text-blue-600">{selectedStudent.totalCredits}</div>
                        </div>
                        <div className="p-3 bg-green-50 rounded-lg">
                          <div className="font-medium text-green-900">Response Rate</div>
                          <div className="text-2xl font-bold text-green-600">{selectedStudent.responseRate}%</div>
                        </div>
                        <div className="p-3 bg-purple-50 rounded-lg">
                          <div className="font-medium text-purple-900">Communications</div>
                          <div className="text-2xl font-bold text-purple-600">{selectedStudent.queryHistory + selectedStudent.appointmentHistory}</div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Enrolled Courses</h4>
                      <div className="space-y-3">
                        {selectedStudent.enrolledCourses.map((course, idx) => (
                          <div key={idx} className="p-4 bg-gray-50 rounded-lg">
                            <div className="flex justify-between items-start">
                              <div>
                                <div className="font-medium">{course.code} - {course.name}</div>
                                <div className="text-sm text-gray-600">{course.semester}</div>
                              </div>
                              <div className="text-right">
                                {course.grade && (
                                  <div className="font-medium text-blue-600">Grade: {course.grade}</div>
                                )}
                                <div className={`text-sm ${getAttendanceColor(course.attendance)}`}>
                                  Attendance: {course.attendance}%
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {selectedStudent.specialNeeds && selectedStudent.specialNeeds.length > 0 && (
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Special Accommodations</h4>
                        <div className="flex flex-wrap gap-2">
                          {selectedStudent.specialNeeds.map((need, idx) => (
                            <span key={idx} className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm">
                              {need}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {selectedStudent.notes && (
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Instructor Notes</h4>
                        <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                          <p className="text-gray-700">{selectedStudent.notes}</p>
                        </div>
                      </div>
                    )}

                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Communication History</h4>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="p-3 bg-blue-50 rounded-lg">
                          <div className="font-medium text-blue-900">Queries Submitted</div>
                          <div className="text-xl font-bold text-blue-600">{selectedStudent.queryHistory}</div>
                        </div>
                        <div className="p-3 bg-green-50 rounded-lg">
                          <div className="font-medium text-green-900">Appointments Booked</div>
                          <div className="text-xl font-bold text-green-600">{selectedStudent.appointmentHistory}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Notes Edit Modal */}
        {showNotesModal && selectedStudent && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
              <h2 className="text-2xl font-bold mb-4">Edit Notes for {selectedStudent.name}</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Instructor Notes</label>
                  <textarea
                    rows={6}
                    value={editingNotes}
                    onChange={(e) => setEditingNotes(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="Add notes about this student's performance, behavior, special considerations, etc."
                  />
                </div>

                <div className="flex gap-4">
                  <button
                    onClick={() => handleUpdateNotes(selectedStudent.id, editingNotes)}
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
                  >
                    Save Notes
                  </button>
                  <button
                    onClick={() => setShowNotesModal(false)}
                    className="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-400"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}