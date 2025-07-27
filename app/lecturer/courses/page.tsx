// app/lecturer/courses/page.tsx
'use client'

import { useState } from 'react'
import Link from 'next/link'

interface Course {
  id: string
  code: string
  name: string
  description: string
  department: string
  credits: number
  semester: string
  schedule: {
    days: string[]
    time: string
    location: string
  }
  enrollment: {
    current: number
    capacity: number
    waitlist: number
  }
  stats: {
    pendingQueries: number
    upcomingAppointments: number
    announcements: number
    resources: number
    averageGrade: number
    attendanceRate: number
  }
  nextClass: string
  syllabus: string
  status: 'active' | 'upcoming' | 'completed'
  recentActivity: {
    type: 'submission' | 'query' | 'message' | 'grade'
    student: string
    title: string
    timestamp: string
  }[]
}

const mockCourses: Course[] = [
  {
    id: '1',
    code: 'CS101',
    name: 'Introduction to Programming',
    description: 'Fundamental concepts of programming using modern programming languages. Covers variables, functions, control structures, and basic algorithms.',
    department: 'Computer Science',
    credits: 3,
    semester: 'Fall 2025',
    schedule: {
      days: ['Monday', 'Wednesday', 'Friday'],
      time: '10:00 AM - 11:00 AM',
      location: 'CS Building, Room 101'
    },
    enrollment: {
      current: 65,
      capacity: 70,
      waitlist: 8
    },
    stats: {
      pendingQueries: 4,
      upcomingAppointments: 7,
      announcements: 12,
      resources: 23,
      averageGrade: 3.4,
      attendanceRate: 92
    },
    nextClass: '2025-07-29 10:00',
    syllabus: 'cs101_syllabus.pdf',
    status: 'active',
    recentActivity: [
      {
        type: 'query',
        student: 'Alice Johnson',
        title: 'Question about Assignment 3',
        timestamp: '2 hours ago'
      },
      {
        type: 'submission',
        student: 'Bob Smith',
        title: 'Submitted Lab 4',
        timestamp: '3 hours ago'
      },
      {
        type: 'message',
        student: 'Carol Davis',
        title: 'Office hours question',
        timestamp: '5 hours ago'
      }
    ]
  },
  {
    id: '2',
    code: 'CS201',
    name: 'Data Structures and Algorithms',
    description: 'Advanced programming concepts including data structures, algorithm analysis, and software design principles.',
    department: 'Computer Science',
    credits: 4,
    semester: 'Fall 2025',
    schedule: {
      days: ['Tuesday', 'Thursday'],
      time: '2:00 PM - 3:30 PM',
      location: 'CS Building, Room 205'
    },
    enrollment: {
      current: 24,
      capacity: 30,
      waitlist: 2
    },
    stats: {
      pendingQueries: 2,
      upcomingAppointments: 3,
      announcements: 8,
      resources: 18,
      averageGrade: 3.1,
      attendanceRate: 88
    },
    nextClass: '2025-07-30 14:00',
    syllabus: 'cs201_syllabus.pdf',
    status: 'active',
    recentActivity: [
      {
        type: 'grade',
        student: 'David Wilson',
        title: 'Midterm exam graded',
        timestamp: '1 day ago'
      },
      {
        type: 'submission',
        student: 'Emma Brown',
        title: 'Submitted Project Proposal',
        timestamp: '1 day ago'
      }
    ]
  },
  {
    id: '3',
    code: 'CS401',
    name: 'Software Engineering',
    description: 'Principles and practices of large-scale software development including project management, testing, and documentation.',
    department: 'Computer Science',
    credits: 3,
    semester: 'Spring 2026',
    schedule: {
      days: ['Monday', 'Wednesday'],
      time: '1:00 PM - 2:30 PM',
      location: 'CS Building, Room 301'
    },
    enrollment: {
      current: 0,
      capacity: 25,
      waitlist: 0
    },
    stats: {
      pendingQueries: 0,
      upcomingAppointments: 0,
      announcements: 1,
      resources: 0,
      averageGrade: 0,
      attendanceRate: 0
    },
    nextClass: '2026-01-15 13:00',
    syllabus: 'cs401_syllabus.pdf',
    status: 'upcoming',
    recentActivity: []
  }
]

const semesters = ['All', 'Fall 2025', 'Spring 2026', 'Summer 2025']
const statuses = ['All', 'Active', 'Upcoming', 'Completed']
const departments = ['All', 'Computer Science', 'Mathematics', 'Physics']

export default function LecturerCoursesPage() {
  const [courses, setCourses] = useState<Course[]>(mockCourses)
  const [searchTerm, setSearchTerm] = useState('')
  const [semesterFilter, setSemesterFilter] = useState('All')
  const [statusFilter, setStatusFilter] = useState('All')
  const [departmentFilter, setDepartmentFilter] = useState('All')
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null)

  // Filter courses
  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesSemester = semesterFilter === 'All' || course.semester === semesterFilter
    const matchesStatus = statusFilter === 'All' || course.status === statusFilter.toLowerCase()
    const matchesDepartment = departmentFilter === 'All' || course.department === departmentFilter
    
    return matchesSearch && matchesSemester && matchesStatus && matchesDepartment
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800'
      case 'upcoming': return 'bg-blue-100 text-blue-800'
      case 'completed': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getGradeColor = (grade: number) => {
    if (grade >= 3.5) return 'text-green-600'
    if (grade >= 3.0) return 'text-blue-600'
    if (grade >= 2.5) return 'text-orange-600'
    return 'text-red-600'
  }

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'submission': return '📝'
      case 'query': return '❓'
      case 'message': return '💬'
      case 'grade': return '📊'
      default: return '📄'
    }
  }

  const totalStudents = courses.reduce((sum, course) => sum + course.enrollment.current, 0)
  const activeCourses = courses.filter(course => course.status === 'active').length
  const totalPendingQueries = courses.reduce((sum, course) => sum + course.stats.pendingQueries, 0)
  const avgEnrollmentRate = courses.length > 0 
    ? Math.round(courses.reduce((sum, course) => 
        sum + (course.enrollment.current / course.enrollment.capacity) * 100, 0) / courses.length)
    : 0

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Courses</h1>
          <p className="text-gray-600">Manage your teaching courses and track student progress</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="text-2xl font-bold text-blue-600">{courses.length}</div>
            <div className="text-sm text-gray-600">Total Courses</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="text-2xl font-bold text-green-600">{activeCourses}</div>
            <div className="text-sm text-gray-600">Active Courses</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="text-2xl font-bold text-purple-600">{totalStudents}</div>
            <div className="text-sm text-gray-600">Total Students</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="text-2xl font-bold text-orange-600">{totalPendingQueries}</div>
            <div className="text-sm text-gray-600">Pending Queries</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="text-2xl font-bold text-red-600">{avgEnrollmentRate}%</div>
            <div className="text-sm text-gray-600">Avg Enrollment</div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center gap-4">
            <input
              type="text"
              placeholder="Search courses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 flex-1"
            />
            
            <select
              value={semesterFilter}
              onChange={(e) => setSemesterFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              {semesters.map(semester => (
                <option key={semester} value={semester}>{semester}</option>
              ))}
            </select>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              {statuses.map(status => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>

            <select
              value={departmentFilter}
              onChange={(e) => setDepartmentFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              {departments.map(dept => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Link href="/lecturer/announcements" className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow group">
            <div className="text-center">
              <div className="text-2xl mb-2 group-hover:scale-110 transition-transform">📢</div>
              <div className="font-medium text-gray-900">Create Announcement</div>
              <div className="text-sm text-gray-600">Post course updates</div>
            </div>
          </Link>
          
          <Link href="/lecturer/resources" className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow group">
            <div className="text-center">
              <div className="text-2xl mb-2 group-hover:scale-110 transition-transform">📚</div>
              <div className="font-medium text-gray-900">Upload Resources</div>
              <div className="text-sm text-gray-600">Course materials</div>
            </div>
          </Link>
          
          <Link href="/lecturer/queries" className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow group">
            <div className="text-center">
              <div className="text-2xl mb-2 group-hover:scale-110 transition-transform">❓</div>
              <div className="font-medium text-gray-900">Review Queries</div>
              <div className="text-sm text-gray-600">Student questions</div>
            </div>
          </Link>
          
          <Link href="/lecturer/analytics" className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow group">
            <div className="text-center">
              <div className="text-2xl mb-2 group-hover:scale-110 transition-transform">📊</div>
              <div className="font-medium text-gray-900">View Analytics</div>
              <div className="text-sm text-gray-600">Course insights</div>
            </div>
          </Link>
        </div>

        {/* Courses Grid */}
        {filteredCourses.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <div className="text-4xl mb-4">📚</div>
            <div className="text-gray-500 mb-4">No courses found</div>
            <div className="text-sm text-gray-400">Check your filters or contact admin to assign courses</div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredCourses.map((course) => (
              <div key={course.id} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{course.code}</h3>
                      <h4 className="text-md text-gray-700">{course.name}</h4>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(course.status)}`}>
                      {course.status.charAt(0).toUpperCase() + course.status.slice(1)}
                    </span>
                  </div>

                  <div className="space-y-3 mb-4">
                    <div className="text-sm text-gray-600">
                      <div className="font-medium">Schedule:</div>
                      <div>{course.schedule.days.join(', ')} • {course.schedule.time}</div>
                      <div>{course.schedule.location}</div>
                    </div>

                    <div className="text-sm text-gray-600">
                      <div className="font-medium">Enrollment:</div>
                      <div className="flex items-center gap-2">
                        <span>{course.enrollment.current}/{course.enrollment.capacity} students</span>
                        {course.enrollment.waitlist > 0 && (
                          <span className="text-orange-600">({course.enrollment.waitlist} waitlist)</span>
                        )}
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                        <div 
                          className="bg-blue-600 h-2 rounded-full" 
                          style={{width: `${(course.enrollment.current / course.enrollment.capacity) * 100}%`}}
                        ></div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <div className="font-medium text-gray-700">Avg Grade:</div>
                        <div className={`font-bold ${getGradeColor(course.stats.averageGrade)}`}>
                          {course.stats.averageGrade > 0 ? course.stats.averageGrade.toFixed(1) : 'N/A'}
                        </div>
                      </div>
                      <div>
                        <div className="font-medium text-gray-700">Attendance:</div>
                        <div className="font-bold text-green-600">
                          {course.stats.attendanceRate > 0 ? `${course.stats.attendanceRate}%` : 'N/A'}
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-xs text-gray-500">
                      <span>📝 {course.stats.pendingQueries} queries</span>
                      <span>📅 {course.stats.upcomingAppointments} appointments</span>
                      <span>📢 {course.stats.announcements} announcements</span>
                      <span>📚 {course.stats.resources} resources</span>
                    </div>

                    {course.status === 'active' && course.recentActivity.length > 0 && (
                      <div>
                        <div className="font-medium text-gray-700 text-sm mb-2">Recent Activity:</div>
                        <div className="space-y-1">
                          {course.recentActivity.slice(0, 2).map((activity, idx) => (
                            <div key={idx} className="text-xs bg-blue-50 p-2 rounded">
                              <div className="flex items-center gap-1">
                                {getActivityIcon(activity.type)}
                                <span className="font-medium">{activity.student}</span>
                              </div>
                              <div className="text-gray-600">{activity.title}</div>
                              <div className="text-gray-500">{activity.timestamp}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Link
                      href={`/courses/${course.id}`}
                      className="block w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-center"
                    >
                      📚 Enter Course
                    </Link>
                    
                    <div className="grid grid-cols-2 gap-2">
                      <Link
                        href={`/lecturer/queries?course=${course.code}`}
                        className="bg-red-50 text-red-700 px-3 py-2 rounded-lg hover:bg-red-100 transition-colors text-sm text-center"
                      >
                        ❓ Queries ({course.stats.pendingQueries})
                      </Link>
                      <Link
                        href={`/lecturer/messages?course=${course.code}`}
                        className="bg-green-50 text-green-700 px-3 py-2 rounded-lg hover:bg-green-100 transition-colors text-sm text-center"
                      >
                        💬 Messages
                      </Link>
                    </div>

                    <button
                      onClick={() => setSelectedCourse(course)}
                      className="w-full bg-gray-50 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors text-sm"
                    >
                      📊 View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Course Detail Modal */}
        {selectedCourse && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-2xl font-bold">{selectedCourse.code} - Course Details</h2>
                <button
                  onClick={() => setSelectedCourse(null)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Course Information</h4>
                      <div className="space-y-2 text-sm">
                        <div>Name: {selectedCourse.name}</div>
                        <div>Department: {selectedCourse.department}</div>
                        <div>Credits: {selectedCourse.credits}</div>
                        <div>Semester: {selectedCourse.semester}</div>
                        <div>Description: {selectedCourse.description}</div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Schedule</h4>
                      <div className="space-y-1 text-sm">
                        <div>Days: {selectedCourse.schedule.days.join(', ')}</div>
                        <div>Time: {selectedCourse.schedule.time}</div>
                        <div>Location: {selectedCourse.schedule.location}</div>
                        <div>Next Class: {new Date(selectedCourse.nextClass).toLocaleString()}</div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Enrollment</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Current: {selectedCourse.enrollment.current}</span>
                          <span>Capacity: {selectedCourse.enrollment.capacity}</span>
                          <span>Waitlist: {selectedCourse.enrollment.waitlist}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-3">
                          <div 
                            className="bg-blue-600 h-3 rounded-full" 
                            style={{width: `${(selectedCourse.enrollment.current / selectedCourse.enrollment.capacity) * 100}%`}}
                          ></div>
                        </div>
                        <div className="text-xs text-gray-500">
                          {Math.round((selectedCourse.enrollment.current / selectedCourse.enrollment.capacity) * 100)}% filled
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Course Statistics</h4>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="p-3 bg-blue-50 rounded">
                          <div className="text-2xl font-bold text-blue-600">{selectedCourse.stats.pendingQueries}</div>
                          <div className="text-sm text-blue-800">Pending Queries</div>
                        </div>
                        <div className="p-3 bg-green-50 rounded">
                          <div className="text-2xl font-bold text-green-600">{selectedCourse.stats.upcomingAppointments}</div>
                          <div className="text-sm text-green-800">Appointments</div>
                        </div>
                        <div className="p-3 bg-purple-50 rounded">
                          <div className="text-2xl font-bold text-purple-600">{selectedCourse.stats.announcements}</div>
                          <div className="text-sm text-purple-800">Announcements</div>
                        </div>
                        <div className="p-3 bg-orange-50 rounded">
                          <div className="text-2xl font-bold text-orange-600">{selectedCourse.stats.resources}</div>
                          <div className="text-sm text-orange-800">Resources</div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Performance Metrics</h4>
                      <div className="space-y-3">
                        <div>
                          <div className="flex justify-between text-sm">
                            <span>Average Grade</span>
                            <span className={`font-bold ${getGradeColor(selectedCourse.stats.averageGrade)}`}>
                              {selectedCourse.stats.averageGrade > 0 ? selectedCourse.stats.averageGrade.toFixed(1) : 'N/A'}
                            </span>
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between text-sm">
                            <span>Attendance Rate</span>
                            <span className="font-bold text-green-600">
                              {selectedCourse.stats.attendanceRate > 0 ? `${selectedCourse.stats.attendanceRate}%` : 'N/A'}
                            </span>
                          </div>
                          {selectedCourse.stats.attendanceRate > 0 && (
                            <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                              <div 
                                className="bg-green-600 h-2 rounded-full" 
                                style={{width: `${selectedCourse.stats.attendanceRate}%`}}
                              ></div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {selectedCourse.recentActivity.length > 0 && (
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Recent Activity</h4>
                        <div className="space-y-2">
                          {selectedCourse.recentActivity.map((activity, idx) => (
                            <div key={idx} className="p-3 bg-gray-50 rounded">
                              <div className="flex items-center gap-2 mb-1">
                                {getActivityIcon(activity.type)}
                                <span className="font-medium text-sm">{activity.student}</span>
                                <span className="text-xs text-gray-500 ml-auto">{activity.timestamp}</span>
                              </div>
                              <div className="text-sm text-gray-600">{activity.title}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                  <Link
                    href={`/courses/${selectedCourse.id}`}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-center"
                  >
                    📚 Enter Course
                  </Link>
                  <Link
                    href={`/lecturer/queries?course=${selectedCourse.code}`}
                    className="bg-red-50 text-red-700 px-4 py-2 rounded-lg hover:bg-red-100 border text-center"
                  >
                    ❓ View Queries
                  </Link>
                  <Link
                    href={`/lecturer/announcements?course=${selectedCourse.code}`}
                    className="bg-green-50 text-green-700 px-4 py-2 rounded-lg hover:bg-green-100 border text-center"
                  >
                    📢 Announcements
                  </Link>
                  <Link
                    href={`/lecturer/analytics?course=${selectedCourse.code}`}
                    className="bg-purple-50 text-purple-700 px-4 py-2 rounded-lg hover:bg-purple-100 border text-center"
                  >
                    📊 Analytics
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}