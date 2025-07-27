// app/courses/[id]/students/page.tsx
'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'

interface CourseStudent {
  id: string
  name: string
  email: string
  studentId: string
  avatar: string
  year: string
  major: string
  gpa: number
  enrollmentDate: string
  attendance: number
  participationScore: number
  currentGrade: string
  assignments: {
    submitted: number
    total: number
    averageScore: number
  }
  lastActivity: string
  contactPreference: 'email' | 'message' | 'appointment'
  status: 'active' | 'inactive' | 'withdrawn'
  notes?: string
  specialNeeds?: string[]
  guardianContact?: string
}

interface CourseInfo {
  id: string
  code: string
  name: string
  lecturer: string
  semester: string
  totalEnrollment: number
  capacity: number
}

const mockCourseInfo: Record<string, CourseInfo> = {
  '1': {
    id: '1',
    code: 'CS101',
    name: 'Introduction to Programming',
    lecturer: 'Dr. Sarah Johnson',
    semester: 'Fall 2025',
    totalEnrollment: 65,
    capacity: 70
  },
  '2': {
    id: '2',
    code: 'CS201',
    name: 'Data Structures and Algorithms',
    lecturer: 'Prof. Michael Chen',
    semester: 'Fall 2025',
    totalEnrollment: 24,
    capacity: 30
  }
}

const mockStudents: Record<string, CourseStudent[]> = {
  '1': [
    {
      id: '1',
      name: 'Alice Johnson',
      email: 'alice.johnson@student.edu',
      studentId: 'STU001',
      avatar: '👩‍🎓',
      year: 'Sophomore',
      major: 'Computer Science',
      gpa: 3.8,
      enrollmentDate: '2025-07-15',
      attendance: 95,
      participationScore: 92,
      currentGrade: 'A-',
      assignments: { submitted: 8, total: 8, averageScore: 88.5 },
      lastActivity: '2025-07-27 14:30',
      contactPreference: 'email',
      status: 'active',
      notes: 'Excellent programming skills, very engaged in class',
      specialNeeds: ['Extended test time']
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
      enrollmentDate: '2025-07-16',
      attendance: 78,
      participationScore: 75,
      currentGrade: 'B-',
      assignments: { submitted: 7, total: 8, averageScore: 76.2 },
      lastActivity: '2025-07-26 09:15',
      contactPreference: 'message',
      status: 'active',
      notes: 'Needs encouragement, improving steadily'
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
      enrollmentDate: '2025-07-14',
      attendance: 98,
      participationScore: 96,
      currentGrade: 'A',
      assignments: { submitted: 8, total: 8, averageScore: 95.8 },
      lastActivity: '2025-07-27 16:45',
      contactPreference: 'appointment',
      status: 'active',
      specialNeeds: ['Quiet testing environment'],
      notes: 'Outstanding performance, natural leader'
    },
    {
      id: '4',
      name: 'David Wilson',
      email: 'david.wilson@student.edu',
      studentId: 'STU004',
      avatar: '👨‍🎓',
      year: 'Sophomore',
      major: 'Computer Science',
      gpa: 2.8,
      enrollmentDate: '2025-07-18',
      attendance: 65,
      participationScore: 58,
      currentGrade: 'D+',
      assignments: { submitted: 5, total: 8, averageScore: 62.4 },
      lastActivity: '2025-07-24 11:20',
      contactPreference: 'email',
      status: 'active',
      notes: 'At risk - needs additional support and tutoring',
      guardianContact: 'parent@email.com'
    }
  ],
  '2': [
    {
      id: '5',
      name: 'Emma Brown',
      email: 'emma.brown@student.edu',
      studentId: 'STU005',
      avatar: '👩‍🎓',
      year: 'Junior',
      major: 'Computer Science',
      gpa: 3.6,
      enrollmentDate: '2025-07-20',
      attendance: 88,
      participationScore: 85,
      currentGrade: 'B+',
      assignments: { submitted: 4, total: 4, averageScore: 84.2 },
      lastActivity: '2025-07-27 13:10',
      contactPreference: 'message',
      status: 'active'
    },
    {
      id: '6',
      name: 'Frank Miller',
      email: 'frank.miller@student.edu',
      studentId: 'STU006',
      avatar: '👨‍🎓',
      year: 'Senior',
      major: 'Computer Science',
      gpa: 3.9,
      enrollmentDate: '2025-07-19',
      attendance: 92,
      participationScore: 94,
      currentGrade: 'A-',
      assignments: { submitted: 4, total: 4, averageScore: 91.5 },
      lastActivity: '2025-07-27 15:30',
      contactPreference: 'email',
      status: 'active',
      notes: 'Advanced student, mentor potential'
    }
  ]
}

export default function CourseStudentsPage() {
  const params = useParams()
  const courseId = params.id as string
  
  const [course, setCourse] = useState<CourseInfo | null>(null)
  const [students, setStudents] = useState<CourseStudent[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')
  const [gradeFilter, setGradeFilter] = useState('All')
  const [sortBy, setSortBy] = useState('Name A-Z')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list')
  const [selectedStudent, setSelectedStudent] = useState<CourseStudent | null>(null)
  const [showNotesModal, setShowNotesModal] = useState(false)
  const [editingNotes, setEditingNotes] = useState('')

  useEffect(() => {
    const courseData = mockCourseInfo[courseId]
    const studentsData = mockStudents[courseId] || []
    setCourse(courseData || null)
    setStudents(studentsData)
  }, [courseId])

  // Filters and sorting
  const filteredStudents = students
    .filter(student => {
      const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           student.studentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           student.email.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesStatus = statusFilter === 'All' || student.status === statusFilter.toLowerCase()
      const matchesGrade = gradeFilter === 'All' || student.currentGrade.charAt(0) === gradeFilter
      
      return matchesSearch && matchesStatus && matchesGrade
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'Name A-Z': return a.name.localeCompare(b.name)
        case 'Name Z-A': return b.name.localeCompare(a.name)
        case 'Grade High-Low': return getGradeValue(b.currentGrade) - getGradeValue(a.currentGrade)
        case 'Grade Low-High': return getGradeValue(a.currentGrade) - getGradeValue(b.currentGrade)
        case 'Attendance': return b.attendance - a.attendance
        case 'Participation': return b.participationScore - a.participationScore
        default: return 0
      }
    })

  const getGradeValue = (grade: string) => {
    const gradeMap: Record<string, number> = {
      'A+': 4.3, 'A': 4.0, 'A-': 3.7,
      'B+': 3.3, 'B': 3.0, 'B-': 2.7,
      'C+': 2.3, 'C': 2.0, 'C-': 1.7,
      'D+': 1.3, 'D': 1.0, 'D-': 0.7,
      'F': 0.0
    }
    return gradeMap[grade] || 0
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800'
      case 'inactive': return 'bg-yellow-100 text-yellow-800'
      case 'withdrawn': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getGradeColor = (grade: string) => {
    if (['A+', 'A', 'A-'].includes(grade)) return 'text-green-600'
    if (['B+', 'B', 'B-'].includes(grade)) return 'text-blue-600'
    if (['C+', 'C', 'C-'].includes(grade)) return 'text-orange-600'
    return 'text-red-600'
  }

  const getAttendanceColor = (attendance: number) => {
    if (attendance >= 90) return 'text-green-600'
    if (attendance >= 80) return 'text-blue-600'
    if (attendance >= 70) return 'text-orange-600'
    return 'text-red-600'
  }

  const handleContactStudent = (student: CourseStudent, method: 'message' | 'email') => {
    switch (method) {
      case 'message':
        window.location.href = `/messages/new?recipient=${student.id}&type=student&course=${courseId}`
        break
      case 'email':
        window.location.href = `mailto:${student.email}`
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

  if (!course) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Course Not Found</h2>
            <Link href="/courses" className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
              Back to Courses
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumb */}
        <div className="mb-6">
          <nav className="text-sm text-gray-500">
            <Link href="/courses" className="hover:text-blue-600">Courses</Link>
            <span className="mx-2">/</span>
            <Link href={`/courses/${courseId}`} className="hover:text-blue-600">{course.code}</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-900">Students</span>
          </nav>
        </div>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{course.code} - Student Roster</h1>
          <p className="text-gray-600">{course.name} • {course.semester}</p>
        </div>

        {/* Course Stats */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="text-2xl font-bold text-blue-600">{students.length}</div>
            <div className="text-sm text-gray-600">Enrolled Students</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="text-2xl font-bold text-green-600">
              {students.filter(s => s.status === 'active').length}
            </div>
            <div className="text-sm text-gray-600">Active</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="text-2xl font-bold text-purple-600">
              {students.length > 0 ? (students.reduce((sum, s) => sum + s.attendance, 0) / students.length).toFixed(0) : 0}%
            </div>
            <div className="text-sm text-gray-600">Avg Attendance</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="text-2xl font-bold text-orange-600">
              {students.length > 0 ? (students.reduce((sum, s) => sum + s.participationScore, 0) / students.length).toFixed(0) : 0}%
            </div>
            <div className="text-sm text-gray-600">Avg Participation</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="text-2xl font-bold text-cyan-600">
              {students.reduce((sum, s) => sum + s.assignments.submitted, 0)}
            </div>
            <div className="text-sm text-gray-600">Total Submissions</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="text-2xl font-bold text-red-600">
              {students.filter(s => ['D+', 'D', 'D-', 'F'].includes(s.currentGrade)).length}
            </div>
            <div className="text-sm text-gray-600">At Risk</div>
          </div>
        </div>

        {/* Filters and Controls */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="flex flex-col sm:flex-row gap-4 flex-1">
              <input
                type="text"
                placeholder="Search students..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 flex-1"
              />
              
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="All">All Status</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
                <option value="Withdrawn">Withdrawn</option>
              </select>

              <select
                value={gradeFilter}
                onChange={(e) => setGradeFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="All">All Grades</option>
                <option value="A">A Grades</option>
                <option value="B">B Grades</option>
                <option value="C">C Grades</option>
                <option value="D">D Grades</option>
                <option value="F">F Grades</option>
              </select>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="Name A-Z">Name A-Z</option>
                <option value="Name Z-A">Name Z-A</option>
                <option value="Grade High-Low">Grade High-Low</option>
                <option value="Grade Low-High">Grade Low-High</option>
                <option value="Attendance">Attendance</option>
                <option value="Participation">Participation</option>
              </select>
            </div>

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
          <Link href={`/messages/new?type=course&course=${courseId}`} className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow group">
            <div className="text-center">
              <div className="text-2xl mb-2 group-hover:scale-110 transition-transform">📢</div>
              <div className="font-medium text-gray-900">Send Announcement</div>
              <div className="text-sm text-gray-600">To all students</div>
            </div>
          </Link>
          
          <Link href="/lecturer/analytics" className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow group">
            <div className="text-center">
              <div className="text-2xl mb-2 group-hover:scale-110 transition-transform">📊</div>
              <div className="font-medium text-gray-900">Class Analytics</div>
              <div className="text-sm text-gray-600">Performance insights</div>
            </div>
          </Link>
          
          <button className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow group">
            <div className="text-center">
              <div className="text-2xl mb-2 group-hover:scale-110 transition-transform">📋</div>
              <div className="font-medium text-gray-900">Export Roster</div>
              <div className="text-sm text-gray-600">Download CSV</div>
            </div>
          </button>
          
          <Link href={`/courses/${courseId}/resources`} className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow group">
            <div className="text-center">
              <div className="text-2xl mb-2 group-hover:scale-110 transition-transform">📚</div>
              <div className="font-medium text-gray-900">Course Resources</div>
              <div className="text-sm text-gray-600">Manage materials</div>
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
                      <div className="flex items-center justify-center gap-2 mt-1">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(student.status)}`}>
                          {student.status}
                        </span>
                        <span className={`font-bold ${getGradeColor(student.currentGrade)}`}>
                          {student.currentGrade}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-3 text-sm">
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <div className="font-medium text-gray-700">Attendance:</div>
                          <div className={`${getAttendanceColor(student.attendance)}`}>
                            {student.attendance}%
                          </div>
                        </div>
                        <div>
                          <div className="font-medium text-gray-700">Participation:</div>
                          <div className={`${getAttendanceColor(student.participationScore)}`}>
                            {student.participationScore}%
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <div className="font-medium text-gray-700">Assignments:</div>
                        <div className="text-gray-600">
                          {student.assignments.submitted}/{student.assignments.total} submitted
                          ({student.assignments.averageScore.toFixed(1)}% avg)
                        </div>
                      </div>

                      <div>
                        <div className="font-medium text-gray-700">Last Activity:</div>
                        <div className="text-gray-600">
                          {new Date(student.lastActivity).toLocaleDateString()}
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
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(student.status)}`}>
                            {student.status}
                          </span>
                          <span className={`font-bold ${getGradeColor(student.currentGrade)}`}>
                            Grade: {student.currentGrade}
                          </span>
                        </div>
                        
                        <p className="text-sm text-gray-600 mb-2">{student.year} • {student.major}</p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 text-sm mb-3">
                          <div>
                            <span className="font-medium text-gray-700">Attendance:</span><br />
                            <span className={`${getAttendanceColor(student.attendance)}`}>
                              {student.attendance}%
                            </span>
                          </div>
                          <div>
                            <span className="font-medium text-gray-700">Participation:</span><br />
                            <span className={`${getAttendanceColor(student.participationScore)}`}>
                              {student.participationScore}%
                            </span>
                          </div>
                          <div>
                            <span className="font-medium text-gray-700">Assignments:</span><br />
                            <span className="text-gray-600">
                              {student.assignments.submitted}/{student.assignments.total}
                            </span>
                          </div>
                          <div>
                            <span className="font-medium text-gray-700">Avg Score:</span><br />
                            <span className="text-gray-600">
                              {student.assignments.averageScore.toFixed(1)}%
                            </span>
                          </div>
                          <div>
                            <span className="font-medium text-gray-700">Last Active:</span><br />
                            <span className="text-gray-600">
                              {new Date(student.lastActivity).toLocaleDateString()}
                            </span>
                          </div>
                        </div>

                        {student.notes && (
                          <div className="p-2 bg-yellow-50 rounded text-sm">
                            <span className="font-medium text-yellow-800">Notes: </span>
                            <span className="text-yellow-700">{student.notes}</span>
                          </div>
                        )}

                        {student.specialNeeds && student.specialNeeds.length > 0 && (
                          <div className="flex flex-wrap gap-1 mt-2">
                            {student.specialNeeds.map((need, idx) => (
                              <span key={idx} className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
                                {need}
                              </span>
                            ))}
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

        {/* Notes Edit Modal */}
        {showNotesModal && selectedStudent && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
              <h2 className="text-2xl font-bold mb-4">Edit Notes for {selectedStudent.name}</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Course Notes</label>
                  <textarea
                    rows={6}
                    value={editingNotes}
                    onChange={(e) => setEditingNotes(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="Add notes about this student's performance in this course..."
                  />
                </div>

                <div className="flex gap-4">
                  <button
                    onClick={() => selectedStudent && handleUpdateNotes(selectedStudent.id, editingNotes)}
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