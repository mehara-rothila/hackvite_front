// app/student/courses/page.tsx
'use client'

import { useState } from 'react'
import Link from 'next/link'

interface EnrolledCourse {
  id: string
  code: string
  name: string
  description: string
  lecturer: {
    id: string
    name: string
    email: string
    avatar: string
    office: string
    officeHours: string[]
  }
  department: string
  credits: number
  semester: string
  schedule: {
    days: string[]
    time: string
    location: string
  }
  progress: {
    attendance: number
    assignments: { completed: number; total: number }
    quizzes: { completed: number; total: number }
    exams: { completed: number; total: number }
    currentGrade: string
    gradingBreakdown: {
      assignments: number
      quizzes: number
      exams: number
      participation: number
    }
  }
  upcomingEvents: {
    type: 'assignment' | 'quiz' | 'exam' | 'lecture'
    title: string
    date: string
    description: string
  }[]
  recentActivity: {
    type: 'grade' | 'announcement' | 'resource' | 'message'
    title: string
    description: string
    date: string
    read: boolean
  }[]
  resources: number
  announcements: number
  unreadMessages: number
  syllabus?: string
  status: 'enrolled' | 'completed' | 'dropped'
  enrollmentDate: string
  nextClass: string
}

const mockEnrolledCourses: EnrolledCourse[] = [
  {
    id: '1',
    code: 'CS101',
    name: 'Introduction to Programming',
    description: 'Fundamental concepts of programming using modern programming languages.',
    lecturer: {
      id: 'lec1',
      name: 'Dr. Sarah Johnson',
      email: 'sarah.johnson@university.edu',
      avatar: '👩‍🏫',
      office: 'CS Building, Room 201B',
      officeHours: ['Monday 2:00-4:00 PM', 'Wednesday 2:00-4:00 PM']
    },
    department: 'Computer Science',
    credits: 3,
    semester: 'Fall 2025',
    schedule: {
      days: ['Monday', 'Wednesday', 'Friday'],
      time: '10:00 AM - 11:00 AM',
      location: 'CS Building, Room 101'
    },
    progress: {
      attendance: 92,
      assignments: { completed: 6, total: 8 },
      quizzes: { completed: 4, total: 5 },
      exams: { completed: 1, total: 2 },
      currentGrade: 'A-',
      gradingBreakdown: {
        assignments: 40,
        quizzes: 20,
        exams: 30,
        participation: 10
      }
    },
    upcomingEvents: [
      {
        type: 'assignment',
        title: 'Assignment 7: Recursion Problems',
        date: '2025-07-30',
        description: 'Complete recursive algorithm implementations'
      },
      {
        type: 'exam',
        title: 'Midterm Exam',
        date: '2025-08-05',
        description: 'Covers chapters 1-6, bring calculator'
      },
      {
        type: 'lecture',
        title: 'Advanced Data Structures',
        date: '2025-07-29',
        description: 'Trees and graph implementations'
      }
    ],
    recentActivity: [
      {
        type: 'grade',
        title: 'Assignment 6 Graded',
        description: 'Received grade: A (95/100)',
        date: '2025-07-26',
        read: false
      },
      {
        type: 'announcement',
        title: 'Office Hours Change',
        description: 'Wednesday office hours moved to 3-5 PM',
        date: '2025-07-25',
        read: true
      }
    ],
    resources: 23,
    announcements: 8,
    unreadMessages: 2,
    syllabus: 'cs101_syllabus.pdf',
    status: 'enrolled',
    enrollmentDate: '2025-08-20',
    nextClass: '2025-07-29 10:00'
  },
  {
    id: '2',
    code: 'MATH202',
    name: 'Calculus II',
    description: 'Integral calculus, techniques of integration, applications of integrals.',
    lecturer: {
      id: 'lec2',
      name: 'Prof. Michael Chen',
      email: 'michael.chen@university.edu',
      avatar: '👨‍🏫',
      office: 'Math Building, Room 301A',
      officeHours: ['Tuesday 10:00-12:00 PM', 'Thursday 10:00-12:00 PM']
    },
    department: 'Mathematics',
    credits: 4,
    semester: 'Fall 2025',
    schedule: {
      days: ['Monday', 'Wednesday', 'Friday'],
      time: '11:00 AM - 12:00 PM',
      location: 'Math Building, Room 201'
    },
    progress: {
      attendance: 88,
      assignments: { completed: 8, total: 10 },
      quizzes: { completed: 5, total: 6 },
      exams: { completed: 1, total: 2 },
      currentGrade: 'B+',
      gradingBreakdown: {
        assignments: 30,
        quizzes: 25,
        exams: 40,
        participation: 5
      }
    },
    upcomingEvents: [
      {
        type: 'quiz',
        title: 'Quiz 6: Integration Techniques',
        date: '2025-07-31',
        description: 'Covers integration by parts and substitution'
      },
      {
        type: 'assignment',
        title: 'Problem Set 9',
        date: '2025-08-02',
        description: 'Applications of definite integrals'
      }
    ],
    recentActivity: [
      {
        type: 'grade',
        title: 'Quiz 5 Results',
        description: 'Received grade: B+ (87/100)',
        date: '2025-07-26',
        read: false
      },
      {
        type: 'resource',
        title: 'Practice Problems Added',
        description: 'New integration practice problems uploaded',
        date: '2025-07-24',
        read: true
      }
    ],
    resources: 18,
    announcements: 12,
    unreadMessages: 1,
    syllabus: 'math202_syllabus.pdf',
    status: 'enrolled',
    enrollmentDate: '2025-08-20',
    nextClass: '2025-07-29 11:00'
  },
  {
    id: '3',
    code: 'ENG110',
    name: 'Academic Writing',
    description: 'Development of critical thinking and writing skills for academic contexts.',
    lecturer: {
      id: 'lec3',
      name: 'Dr. Emily Roberts',
      email: 'emily.roberts@university.edu',
      avatar: '👩‍💼',
      office: 'Humanities Building, Room 105C',
      officeHours: ['Monday 9:00-11:00 AM', 'Friday 1:00-3:00 PM']
    },
    department: 'English',
    credits: 3,
    semester: 'Fall 2025',
    schedule: {
      days: ['Tuesday', 'Thursday'],
      time: '9:00 AM - 10:30 AM',
      location: 'Humanities Building, Room 201'
    },
    progress: {
      attendance: 95,
      assignments: { completed: 4, total: 6 },
      quizzes: { completed: 3, total: 4 },
      exams: { completed: 0, total: 1 },
      currentGrade: 'A',
      gradingBreakdown: {
        assignments: 50,
        quizzes: 20,
        exams: 25,
        participation: 5
      }
    },
    upcomingEvents: [
      {
        type: 'assignment',
        title: 'Research Paper Draft',
        date: '2025-08-01',
        description: 'Submit first draft of research paper'
      },
      {
        type: 'lecture',
        title: 'Citation Styles Workshop',
        date: '2025-07-30',
        description: 'APA and MLA citation formatting'
      }
    ],
    recentActivity: [
      {
        type: 'grade',
        title: 'Essay 3 Feedback',
        description: 'Received grade: A- with detailed comments',
        date: '2025-07-25',
        read: true
      },
      {
        type: 'message',
        title: 'New Message from Dr. Roberts',
        description: 'Regarding your research topic selection',
        date: '2025-07-24',
        read: false
      }
    ],
    resources: 15,
    announcements: 6,
    unreadMessages: 1,
    syllabus: 'eng110_syllabus.pdf',
    status: 'enrolled',
    enrollmentDate: '2025-08-20',
    nextClass: '2025-07-30 09:00'
  }
]

const semesterFilters = ['All', 'Fall 2025', 'Spring 2026', 'Summer 2025']
const statusFilters = ['All', 'Enrolled', 'Completed', 'Dropped']
const sortOptions = ['Course Code', 'Course Name', 'Next Class', 'Grade', 'Credits']

export default function StudentCoursesPage() {
  const [courses, setCourses] = useState<EnrolledCourse[]>(mockEnrolledCourses)
  const [searchTerm, setSearchTerm] = useState('')
  const [semesterFilter, setSemesterFilter] = useState('All')
  const [statusFilter, setStatusFilter] = useState('All')
  const [sortBy, setSortBy] = useState('Course Code')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [selectedCourse, setSelectedCourse] = useState<EnrolledCourse | null>(null)

  // Filter and sort courses
  const filteredCourses = courses
    .filter(course => {
      const matchesSearch = course.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           course.lecturer.name.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesSemester = semesterFilter === 'All' || course.semester === semesterFilter
      const matchesStatus = statusFilter === 'All' || course.status === statusFilter.toLowerCase()
      
      return matchesSearch && matchesSemester && matchesStatus
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'Course Code': return a.code.localeCompare(b.code)
        case 'Course Name': return a.name.localeCompare(b.name)
        case 'Next Class': return new Date(a.nextClass).getTime() - new Date(b.nextClass).getTime()
        case 'Grade': return a.progress.currentGrade.localeCompare(b.progress.currentGrade)
        case 'Credits': return b.credits - a.credits
        default: return 0
      }
    })

  const getGradeColor = (grade: string) => {
    if (grade.startsWith('A')) return 'text-green-600'
    if (grade.startsWith('B')) return 'text-blue-600'
    if (grade.startsWith('C')) return 'text-orange-600'
    return 'text-red-600'
  }

  const getAttendanceColor = (attendance: number) => {
    if (attendance >= 90) return 'text-green-600'
    if (attendance >= 80) return 'text-blue-600'
    if (attendance >= 70) return 'text-orange-600'
    return 'text-red-600'
  }

  const getProgressPercentage = (completed: number, total: number) => {
    return total > 0 ? Math.round((completed / total) * 100) : 0
  }

  const getNextEventType = (type: string) => {
    switch (type) {
      case 'assignment': return '📝'
      case 'quiz': return '❓'
      case 'exam': return '📊'
      case 'lecture': return '🎓'
      default: return '📅'
    }
  }

  const getDaysUntilEvent = (date: string) => {
    const today = new Date()
    const eventDate = new Date(date)
    const diffTime = eventDate.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  const totalCredits = courses.reduce((sum, course) => sum + course.credits, 0)
  const averageGrade = courses.length > 0 ? 
    courses.reduce((sum, course) => {
      const gradePoints = course.progress.currentGrade.startsWith('A') ? 4.0 :
                         course.progress.currentGrade.startsWith('B') ? 3.0 :
                         course.progress.currentGrade.startsWith('C') ? 2.0 : 1.0
      return sum + gradePoints
    }, 0) / courses.length : 0

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Courses</h1>
          <p className="text-gray-600">View and manage your enrolled courses</p>
        </div>

        {/* Academic Overview */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="text-2xl font-bold text-blue-600">{courses.length}</div>
            <div className="text-sm text-gray-600">Enrolled Courses</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="text-2xl font-bold text-green-600">{totalCredits}</div>
            <div className="text-sm text-gray-600">Total Credits</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="text-2xl font-bold text-purple-600">{averageGrade.toFixed(1)}</div>
            <div className="text-sm text-gray-600">Average GPA</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="text-2xl font-bold text-orange-600">
              {courses.reduce((sum, c) => sum + c.unreadMessages, 0)}
            </div>
            <div className="text-sm text-gray-600">Unread Messages</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="text-2xl font-bold text-red-600">
              {courses.reduce((sum, c) => sum + c.upcomingEvents.length, 0)}
            </div>
            <div className="text-sm text-gray-600">Upcoming Events</div>
          </div>
        </div>

        {/* Filters and Controls */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="flex flex-col sm:flex-row gap-4 flex-1">
              {/* Search */}
              <input
                type="text"
                placeholder="Search courses, code, lecturer..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 flex-1"
              />
              
              {/* Semester Filter */}
              <select
                value={semesterFilter}
                onChange={(e) => setSemesterFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                {semesterFilters.map(semester => (
                  <option key={semester} value={semester}>{semester}</option>
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
          <Link href="/courses" className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow group">
            <div className="text-center">
              <div className="text-2xl mb-2 group-hover:scale-110 transition-transform">🔍</div>
              <div className="font-medium text-gray-900">Browse Courses</div>
              <div className="text-sm text-gray-600">Find new courses</div>
            </div>
          </Link>
          
          <Link href="/student/resources" className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow group">
            <div className="text-center">
              <div className="text-2xl mb-2 group-hover:scale-110 transition-transform">📚</div>
              <div className="font-medium text-gray-900">Course Resources</div>
              <div className="text-sm text-gray-600">Materials & downloads</div>
            </div>
          </Link>
          
          <Link href="/student/announcements" className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow group">
            <div className="text-center">
              <div className="text-2xl mb-2 group-hover:scale-110 transition-transform">📢</div>
              <div className="font-medium text-gray-900">Announcements</div>
              <div className="text-sm text-gray-600">Latest updates</div>
            </div>
          </Link>
          
          <Link href="/student/messages" className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow group">
            <div className="text-center">
              <div className="text-2xl mb-2 group-hover:scale-110 transition-transform">💬</div>
              <div className="font-medium text-gray-900">Course Messages</div>
              <div className="text-sm text-gray-600">Communicate with lecturers</div>
            </div>
          </Link>
        </div>

        {/* Courses Display */}
        {filteredCourses.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <div className="text-4xl mb-4">📚</div>
            <div className="text-gray-500 mb-4">No courses found</div>
            <Link
              href="/courses"
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
            >
              Browse Available Courses
            </Link>
          </div>
        ) : (
          <div className={viewMode === 'grid' 
            ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' 
            : 'space-y-6'
          }>
            {filteredCourses.map((course) => (
              <div key={course.id} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
                {viewMode === 'grid' ? (
                  /* Grid View */
                  <div className="p-6">
                    <div className="mb-4">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">{course.code}</h3>
                        <span className={`font-bold text-lg ${getGradeColor(course.progress.currentGrade)}`}>
                          {course.progress.currentGrade}
                        </span>
                      </div>
                      <h4 className="text-md text-gray-700 mb-2">{course.name}</h4>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-sm text-gray-600">{course.credits} credits • {course.semester}</span>
                      </div>
                    </div>

                    <div className="space-y-3 text-sm">
                      <div>
                        <div className="font-medium text-gray-700">Lecturer:</div>
                        <div className="flex items-center gap-2">
                          <span>{course.lecturer.avatar}</span>
                          <Link 
                            href={`/student/lecturers?lecturer=${course.lecturer.id}`}
                            className="text-blue-600 hover:text-blue-800"
                          >
                            {course.lecturer.name}
                          </Link>
                        </div>
                      </div>
                      
                      <div>
                        <div className="font-medium text-gray-700">Next Class:</div>
                        <div className="text-gray-600">
                          {new Date(course.nextClass).toLocaleDateString()} at {new Date(course.nextClass).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                        </div>
                      </div>

                      <div>
                        <div className="font-medium text-gray-700">Progress:</div>
                        <div className="space-y-1">
                          <div className="flex justify-between">
                            <span>Assignments:</span>
                            <span className="text-blue-600">{course.progress.assignments.completed}/{course.progress.assignments.total}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Attendance:</span>
                            <span className={getAttendanceColor(course.progress.attendance)}>{course.progress.attendance}%</span>
                          </div>
                        </div>
                      </div>

                      {course.upcomingEvents.length > 0 && (
                        <div>
                          <div className="font-medium text-gray-700">Next Event:</div>
                          <div className="p-2 bg-blue-50 rounded text-xs">
                            <div className="flex items-center gap-1">
                              {getNextEventType(course.upcomingEvents[0].type)}
                              <span className="font-medium">{course.upcomingEvents[0].title}</span>
                            </div>
                            <div className="text-gray-600">
                              {new Date(course.upcomingEvents[0].date).toLocaleDateString()} 
                              <span className="text-orange-600 ml-1">
                                ({getDaysUntilEvent(course.upcomingEvents[0].date)} days)
                              </span>
                            </div>
                          </div>
                        </div>
                      )}

                      <div className="flex justify-between text-xs">
                        <span>📋 {course.resources} resources</span>
                        <span>📢 {course.announcements} announcements</span>
                        <span>💬 {course.unreadMessages} unread</span>
                      </div>
                    </div>

                    <div className="mt-4 pt-4 border-t space-y-2">
                      <Link
                        href={`/courses/${course.id}`}
                        className="block w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-center"
                      >
                        📚 Enter Course
                      </Link>
                      <div className="grid grid-cols-2 gap-2">
                        <Link
                          href={`/courses/${course.id}/messages`}
                          className="bg-gray-50 text-gray-700 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors text-sm text-center"
                        >
                          💬 Messages
                        </Link>
                        <Link
                          href={`/courses/${course.id}/resources`}
                          className="bg-green-50 text-green-700 px-3 py-2 rounded-lg hover:bg-green-100 transition-colors text-sm text-center"
                        >
                          📋 Resources
                        </Link>
                      </div>
                    </div>
                  </div>
                ) : (
                  /* List View */
                  <div className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="text-2xl">{course.lecturer.avatar}</div>
                      
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900">{course.code} - {course.name}</h3>
                            <p className="text-sm text-gray-600">{course.lecturer.name} • {course.department} • {course.credits} credits</p>
                          </div>
                          <span className={`font-bold text-2xl ${getGradeColor(course.progress.currentGrade)}`}>
                            {course.progress.currentGrade}
                          </span>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm mb-4">
                          <div>
                            <span className="font-medium text-gray-700">Schedule:</span><br />
                            <span className="text-gray-600">
                              {course.schedule.days.join(', ')}<br />
                              {course.schedule.time}
                            </span>
                          </div>
                          <div>
                            <span className="font-medium text-gray-700">Progress:</span><br />
                            <span className="text-gray-600">
                              Assignments: {course.progress.assignments.completed}/{course.progress.assignments.total}<br />
                              Attendance: <span className={getAttendanceColor(course.progress.attendance)}>{course.progress.attendance}%</span>
                            </span>
                          </div>
                          <div>
                            <span className="font-medium text-gray-700">Next Class:</span><br />
                            <span className="text-gray-600">
                              {new Date(course.nextClass).toLocaleDateString()}<br />
                              {new Date(course.nextClass).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                            </span>
                          </div>
                          <div>
                            <span className="font-medium text-gray-700">Activity:</span><br />
                            <span className="text-gray-600">
                              📋 {course.resources} resources<br />
                              💬 {course.unreadMessages} unread messages
                            </span>
                          </div>
                        </div>

                        {course.upcomingEvents.length > 0 && (
                          <div className="mb-4">
                            <span className="font-medium text-gray-700 text-sm">Upcoming Events:</span>
                            <div className="mt-1 space-y-1">
                              {course.upcomingEvents.slice(0, 2).map((event, idx) => (
                                <div key={idx} className="p-2 bg-blue-50 rounded text-xs">
                                  <div className="flex items-center gap-1">
                                    {getNextEventType(event.type)}
                                    <span className="font-medium">{event.title}</span>
                                    <span className="text-orange-600 ml-auto">
                                      {getDaysUntilEvent(event.date)} days
                                    </span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {course.recentActivity.some(a => !a.read) && (
                          <div className="mb-4">
                            <span className="font-medium text-gray-700 text-sm">Recent Activity:</span>
                            <div className="mt-1 space-y-1">
                              {course.recentActivity.filter(a => !a.read).slice(0, 2).map((activity, idx) => (
                                <div key={idx} className="p-2 bg-yellow-50 rounded text-xs">
                                  <div className="flex items-center gap-1">
                                    <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                                    <span className="font-medium">{activity.title}</span>
                                  </div>
                                  <div className="text-gray-600 ml-3">{activity.description}</div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                      
                      <div className="flex flex-col gap-2">
                        <Link
                          href={`/courses/${course.id}`}
                          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm text-center"
                        >
                          📚 Enter Course
                        </Link>
                        <Link
                          href={`/courses/${course.id}/messages`}
                          className="bg-gray-50 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors text-sm text-center"
                        >
                          💬 Messages
                        </Link>
                        <Link
                          href={`/courses/${course.id}/resources`}
                          className="bg-green-50 text-green-700 px-4 py-2 rounded-lg hover:bg-green-100 transition-colors text-sm text-center"
                        >
                          📋 Resources
                        </Link>
                        <button
                          onClick={() => setSelectedCourse(course)}
                          className="bg-purple-50 text-purple-700 px-4 py-2 rounded-lg hover:bg-purple-100 transition-colors text-sm"
                        >
                          📊 Details
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Course Detail Modal */}
        {selectedCourse && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg p-6 w-full max-w-5xl max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-2xl font-bold">{selectedCourse.code} - Course Details</h2>
                <button
                  onClick={() => setSelectedCourse(null)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Academic Progress</h4>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 bg-green-50 rounded-lg">
                          <div className="font-medium text-green-900">Current Grade</div>
                          <div className={`text-3xl font-bold ${getGradeColor(selectedCourse.progress.currentGrade)}`}>
                            {selectedCourse.progress.currentGrade}
                          </div>
                        </div>
                        <div className="p-4 bg-blue-50 rounded-lg">
                          <div className="font-medium text-blue-900">Attendance</div>
                          <div className={`text-3xl font-bold ${getAttendanceColor(selectedCourse.progress.attendance)}`}>
                            {selectedCourse.progress.attendance}%
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Assignment Progress</h4>
                      <div className="space-y-3">
                        <div>
                          <div className="flex justify-between text-sm">
                            <span>Assignments</span>
                            <span>{selectedCourse.progress.assignments.completed}/{selectedCourse.progress.assignments.total}</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-blue-600 h-2 rounded-full" 
                              style={{width: `${getProgressPercentage(selectedCourse.progress.assignments.completed, selectedCourse.progress.assignments.total)}%`}}
                            ></div>
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between text-sm">
                            <span>Quizzes</span>
                            <span>{selectedCourse.progress.quizzes.completed}/{selectedCourse.progress.quizzes.total}</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-green-600 h-2 rounded-full" 
                              style={{width: `${getProgressPercentage(selectedCourse.progress.quizzes.completed, selectedCourse.progress.quizzes.total)}%`}}
                            ></div>
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between text-sm">
                            <span>Exams</span>
                            <span>{selectedCourse.progress.exams.completed}/{selectedCourse.progress.exams.total}</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-purple-600 h-2 rounded-full" 
                              style={{width: `${getProgressPercentage(selectedCourse.progress.exams.completed, selectedCourse.progress.exams.total)}%`}}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Grade Breakdown</h4>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="p-3 bg-gray-50 rounded">
                          <div className="text-sm text-gray-600">Assignments</div>
                          <div className="font-bold">{selectedCourse.progress.gradingBreakdown.assignments}%</div>
                        </div>
                        <div className="p-3 bg-gray-50 rounded">
                          <div className="text-sm text-gray-600">Quizzes</div>
                          <div className="font-bold">{selectedCourse.progress.gradingBreakdown.quizzes}%</div>
                        </div>
                        <div className="p-3 bg-gray-50 rounded">
                          <div className="text-sm text-gray-600">Exams</div>
                          <div className="font-bold">{selectedCourse.progress.gradingBreakdown.exams}%</div>
                        </div>
                        <div className="p-3 bg-gray-50 rounded">
                          <div className="text-sm text-gray-600">Participation</div>
                          <div className="font-bold">{selectedCourse.progress.gradingBreakdown.participation}%</div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Upcoming Events</h4>
                      <div className="space-y-2">
                        {selectedCourse.upcomingEvents.map((event, idx) => (
                          <div key={idx} className="p-3 bg-blue-50 rounded-lg">
                            <div className="flex items-center gap-2 mb-1">
                              {getNextEventType(event.type)}
                              <span className="font-medium">{event.title}</span>
                              <span className="text-sm text-orange-600 ml-auto">
                                {getDaysUntilEvent(event.date)} days away
                              </span>
                            </div>
                            <div className="text-sm text-gray-600">{event.description}</div>
                            <div className="text-sm text-gray-500">{new Date(event.date).toLocaleDateString()}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-1">
                  <div className="space-y-6">
                    <div className="text-center">
                      <span className="text-4xl mb-4 block">{selectedCourse.lecturer.avatar}</span>
                      <h3 className="text-lg font-semibold">{selectedCourse.lecturer.name}</h3>
                      <p className="text-gray-600">{selectedCourse.department}</p>
                      <p className="text-sm text-gray-500">{selectedCourse.lecturer.office}</p>
                    </div>

                    <div className="space-y-4">
                      <Link
                        href={`/courses/${selectedCourse.id}`}
                        className="block w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-center"
                      >
                        📚 Enter Course
                      </Link>
                      <Link
                        href={`/messages/new?lecturer=${selectedCourse.lecturer.id}&course=${selectedCourse.code}`}
                        className="block w-full bg-gray-50 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-100 border text-center"
                      >
                        💬 Message Lecturer
                      </Link>
                      <Link
                        href={`/student/appointments?lecturer=${selectedCourse.lecturer.id}`}
                        className="block w-full bg-green-50 text-green-700 px-4 py-2 rounded-lg hover:bg-green-100 border text-center"
                      >
                        📅 Book Appointment
                      </Link>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Office Hours</h4>
                      <div className="space-y-1 text-sm">
                        {selectedCourse.lecturer.officeHours.map((hour, idx) => (
                          <div key={idx} className="text-gray-600">📅 {hour}</div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Course Info</h4>
                      <div className="space-y-2 text-sm">
                        <div>Credits: {selectedCourse.credits}</div>
                        <div>Semester: {selectedCourse.semester}</div>
                        <div>Enrolled: {selectedCourse.enrollmentDate}</div>
                        <div>Resources: {selectedCourse.resources}</div>
                        <div>Announcements: {selectedCourse.announcements}</div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Schedule</h4>
                      <div className="space-y-1 text-sm">
                        <div>📅 {selectedCourse.schedule.days.join(', ')}</div>
                        <div>⏰ {selectedCourse.schedule.time}</div>
                        <div>📍 {selectedCourse.schedule.location}</div>
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