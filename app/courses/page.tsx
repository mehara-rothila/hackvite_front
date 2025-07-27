// app/courses/page.tsx
'use client'

import { useState } from 'react'
import Link from 'next/link'

interface Course {
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
  }
  department: string
  credits: number
  semester: string
  schedule: {
    days: string[]
    time: string
    location: string
  }
  enrollmentInfo: {
    enrolled: number
    capacity: number
    waitlist: number
  }
  prerequisites: string[]
  syllabus?: string
  resources: number
  announcements: number
  lastActivity: string
  status: 'active' | 'archived' | 'upcoming'
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  tags: string[]
  rating: number
  reviews: number
}

const mockCourses: Course[] = [
  {
    id: '1',
    code: 'CS101',
    name: 'Introduction to Programming',
    description: 'Fundamental concepts of programming using modern programming languages. Covers variables, control structures, functions, and basic data structures.',
    lecturer: {
      id: 'lec1',
      name: 'Dr. Sarah Johnson',
      email: 'sarah.johnson@university.edu',
      avatar: '👩‍🏫',
      office: 'CS Building, Room 201B'
    },
    department: 'Computer Science',
    credits: 3,
    semester: 'Fall 2025',
    schedule: {
      days: ['Monday', 'Wednesday', 'Friday'],
      time: '10:00 AM - 11:00 AM',
      location: 'CS Building, Room 101'
    },
    enrollmentInfo: {
      enrolled: 45,
      capacity: 50,
      waitlist: 3
    },
    prerequisites: [],
    syllabus: 'cs101_syllabus.pdf',
    resources: 23,
    announcements: 8,
    lastActivity: '2025-07-27 09:30',
    status: 'active',
    difficulty: 'beginner',
    tags: ['Programming', 'Fundamentals', 'Coding'],
    rating: 4.7,
    reviews: 42
  },
  {
    id: '2',
    code: 'CS201',
    name: 'Data Structures',
    description: 'Advanced data structures including arrays, linked lists, stacks, queues, trees, and graphs. Algorithm analysis and implementation.',
    lecturer: {
      id: 'lec1',
      name: 'Dr. Sarah Johnson',
      email: 'sarah.johnson@university.edu',
      avatar: '👩‍🏫',
      office: 'CS Building, Room 201B'
    },
    department: 'Computer Science',
    credits: 4,
    semester: 'Fall 2025',
    schedule: {
      days: ['Tuesday', 'Thursday'],
      time: '2:00 PM - 3:30 PM',
      location: 'CS Building, Room 102'
    },
    enrollmentInfo: {
      enrolled: 32,
      capacity: 35,
      waitlist: 8
    },
    prerequisites: ['CS101'],
    syllabus: 'cs201_syllabus.pdf',
    resources: 31,
    announcements: 5,
    lastActivity: '2025-07-26 16:45',
    status: 'active',
    difficulty: 'intermediate',
    tags: ['Data Structures', 'Algorithms', 'Advanced'],
    rating: 4.5,
    reviews: 28
  },
  {
    id: '3',
    code: 'MATH202',
    name: 'Calculus II',
    description: 'Integral calculus, techniques of integration, applications of integrals, infinite sequences and series.',
    lecturer: {
      id: 'lec2',
      name: 'Prof. Michael Chen',
      email: 'michael.chen@university.edu',
      avatar: '👨‍🏫',
      office: 'Math Building, Room 301A'
    },
    department: 'Mathematics',
    credits: 4,
    semester: 'Fall 2025',
    schedule: {
      days: ['Monday', 'Wednesday', 'Friday'],
      time: '11:00 AM - 12:00 PM',
      location: 'Math Building, Room 201'
    },
    enrollmentInfo: {
      enrolled: 67,
      capacity: 70,
      waitlist: 5
    },
    prerequisites: ['MATH201'],
    syllabus: 'math202_syllabus.pdf',
    resources: 18,
    announcements: 12,
    lastActivity: '2025-07-27 11:20',
    status: 'active',
    difficulty: 'intermediate',
    tags: ['Mathematics', 'Calculus', 'Integration'],
    rating: 4.3,
    reviews: 56
  },
  {
    id: '4',
    code: 'ENG110',
    name: 'Academic Writing',
    description: 'Development of critical thinking and writing skills for academic and professional contexts. Essay structure, research methods, and citation styles.',
    lecturer: {
      id: 'lec3',
      name: 'Dr. Emily Roberts',
      email: 'emily.roberts@university.edu',
      avatar: '👩‍💼',
      office: 'Humanities Building, Room 105C'
    },
    department: 'English',
    credits: 3,
    semester: 'Fall 2025',
    schedule: {
      days: ['Tuesday', 'Thursday'],
      time: '9:00 AM - 10:30 AM',
      location: 'Humanities Building, Room 201'
    },
    enrollmentInfo: {
      enrolled: 28,
      capacity: 30,
      waitlist: 0
    },
    prerequisites: [],
    syllabus: 'eng110_syllabus.pdf',
    resources: 15,
    announcements: 6,
    lastActivity: '2025-07-26 14:15',
    status: 'active',
    difficulty: 'beginner',
    tags: ['Writing', 'Academic', 'Communication'],
    rating: 4.8,
    reviews: 35
  },
  {
    id: '5',
    code: 'PHYS101',
    name: 'General Physics I',
    description: 'Introduction to mechanics, waves, and thermodynamics. Laboratory component included.',
    lecturer: {
      id: 'lec4',
      name: 'Dr. Robert Williams',
      email: 'robert.williams@university.edu',
      avatar: '👨‍🔬',
      office: 'Physics Building, Room 401'
    },
    department: 'Physics',
    credits: 4,
    semester: 'Spring 2026',
    schedule: {
      days: ['Monday', 'Wednesday', 'Friday'],
      time: '1:00 PM - 2:00 PM',
      location: 'Physics Building, Room 101'
    },
    enrollmentInfo: {
      enrolled: 0,
      capacity: 40,
      waitlist: 0
    },
    prerequisites: ['MATH201'],
    syllabus: 'phys101_syllabus.pdf',
    resources: 8,
    announcements: 2,
    lastActivity: '2025-07-20 10:00',
    status: 'upcoming',
    difficulty: 'intermediate',
    tags: ['Physics', 'Mechanics', 'Laboratory'],
    rating: 4.6,
    reviews: 23
  }
]

const departments = ['All', 'Computer Science', 'Mathematics', 'English', 'Physics', 'Chemistry', 'Biology']
const semesters = ['All', 'Fall 2025', 'Spring 2026', 'Summer 2025']
const difficulties = ['All', 'Beginner', 'Intermediate', 'Advanced']
const statusFilters = ['All', 'Active', 'Upcoming', 'Archived']
const sortOptions = ['Course Code', 'Course Name', 'Department', 'Credits', 'Rating', 'Enrollment']

export default function CourseDirectoryPage() {
  const [courses, setCourses] = useState<Course[]>(mockCourses)
  const [searchTerm, setSearchTerm] = useState('')
  const [departmentFilter, setDepartmentFilter] = useState('All')
  const [semesterFilter, setSemesterFilter] = useState('All')
  const [difficultyFilter, setDifficultyFilter] = useState('All')
  const [statusFilter, setStatusFilter] = useState('All')
  const [sortBy, setSortBy] = useState('Course Code')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null)

  // Filter and sort courses
  const filteredCourses = courses
    .filter(course => {
      const matchesSearch = course.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           course.lecturer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           course.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      const matchesDepartment = departmentFilter === 'All' || course.department === departmentFilter
      const matchesSemester = semesterFilter === 'All' || course.semester === semesterFilter
      const matchesDifficulty = difficultyFilter === 'All' || course.difficulty === difficultyFilter.toLowerCase()
      const matchesStatus = statusFilter === 'All' || course.status === statusFilter.toLowerCase()
      
      return matchesSearch && matchesDepartment && matchesSemester && matchesDifficulty && matchesStatus
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'Course Code': return a.code.localeCompare(b.code)
        case 'Course Name': return a.name.localeCompare(b.name)
        case 'Department': return a.department.localeCompare(b.department)
        case 'Credits': return b.credits - a.credits
        case 'Rating': return b.rating - a.rating
        case 'Enrollment': return b.enrollmentInfo.enrolled - a.enrollmentInfo.enrolled
        default: return 0
      }
    })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800'
      case 'upcoming': return 'bg-blue-100 text-blue-800'
      case 'archived': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-800'
      case 'intermediate': return 'bg-yellow-100 text-yellow-800'
      case 'advanced': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getEnrollmentStatus = (course: Course) => {
    const { enrolled, capacity, waitlist } = course.enrollmentInfo
    const percentage = (enrolled / capacity) * 100
    
    if (percentage >= 95) return { status: 'full', color: 'text-red-600' }
    if (percentage >= 85) return { status: 'almost-full', color: 'text-orange-600' }
    if (percentage >= 50) return { status: 'filling', color: 'text-blue-600' }
    return { status: 'open', color: 'text-green-600' }
  }

  const renderRatingStars = (rating: number) => {
    return '⭐'.repeat(Math.floor(rating)) + (rating % 1 >= 0.5 ? '⭐' : '')
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Course Directory</h1>
          <p className="text-gray-600">Explore all available courses across departments</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="text-2xl font-bold text-blue-600">{courses.length}</div>
            <div className="text-sm text-gray-600">Total Courses</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="text-2xl font-bold text-green-600">
              {courses.filter(c => c.status === 'active').length}
            </div>
            <div className="text-sm text-gray-600">Active Courses</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="text-2xl font-bold text-purple-600">
              {new Set(courses.map(c => c.department)).size}
            </div>
            <div className="text-sm text-gray-600">Departments</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="text-2xl font-bold text-orange-600">
              {courses.reduce((sum, c) => sum + c.enrollmentInfo.enrolled, 0)}
            </div>
            <div className="text-sm text-gray-600">Total Students</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="text-2xl font-bold text-red-600">
              {(courses.reduce((sum, c) => sum + c.rating, 0) / courses.length).toFixed(1)}
            </div>
            <div className="text-sm text-gray-600">Avg Rating</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="text-2xl font-bold text-cyan-600">
              {courses.reduce((sum, c) => sum + c.credits, 0)}
            </div>
            <div className="text-sm text-gray-600">Total Credits</div>
          </div>
        </div>

        {/* Filters and Controls */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="flex flex-col sm:flex-row gap-4 flex-1">
              {/* Search */}
              <input
                type="text"
                placeholder="Search courses, code, lecturer, description..."
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

              {/* Semester Filter */}
              <select
                value={semesterFilter}
                onChange={(e) => setSemesterFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                {semesters.map(semester => (
                  <option key={semester} value={semester}>{semester}</option>
                ))}
              </select>

              {/* Difficulty Filter */}
              <select
                value={difficultyFilter}
                onChange={(e) => setDifficultyFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                {difficulties.map(difficulty => (
                  <option key={difficulty} value={difficulty}>{difficulty}</option>
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

        {/* Quick Access */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Link href="/student/courses" className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow group">
            <div className="text-center">
              <div className="text-2xl mb-2 group-hover:scale-110 transition-transform">📚</div>
              <div className="font-medium text-gray-900">My Courses</div>
              <div className="text-sm text-gray-600">View enrolled courses</div>
            </div>
          </Link>
          
          <Link href="/lecturer/courses" className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow group">
            <div className="text-center">
              <div className="text-2xl mb-2 group-hover:scale-110 transition-transform">👨‍🏫</div>
              <div className="font-medium text-gray-900">Teaching Courses</div>
              <div className="text-sm text-gray-600">Manage your courses</div>
            </div>
          </Link>
          
          <Link href="/student/lecturers" className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow group">
            <div className="text-center">
              <div className="text-2xl mb-2 group-hover:scale-110 transition-transform">👩‍🏫</div>
              <div className="font-medium text-gray-900">Find Lecturers</div>
              <div className="text-sm text-gray-600">Browse faculty</div>
            </div>
          </Link>
          
          <Link href="/student/resources" className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow group">
            <div className="text-center">
              <div className="text-2xl mb-2 group-hover:scale-110 transition-transform">📋</div>
              <div className="font-medium text-gray-900">Course Resources</div>
              <div className="text-sm text-gray-600">Materials & downloads</div>
            </div>
          </Link>
        </div>

        {/* Results Info */}
        <div className="mb-4">
          <p className="text-gray-600">
            Showing {filteredCourses.length} of {courses.length} courses
          </p>
        </div>

        {/* Courses Display */}
        {filteredCourses.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <div className="text-4xl mb-4">🔍</div>
            <div className="text-gray-500 mb-4">No courses found</div>
            <div className="text-sm text-gray-400">Try adjusting your search criteria</div>
          </div>
        ) : (
          <div className={viewMode === 'grid' 
            ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' 
            : 'space-y-4'
          }>
            {filteredCourses.map((course) => (
              <div key={course.id} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
                {viewMode === 'grid' ? (
                  /* Grid View */
                  <div className="p-6">
                    <div className="mb-4">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">{course.code}</h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(course.status)}`}>
                          {course.status.charAt(0).toUpperCase() + course.status.slice(1)}
                        </span>
                      </div>
                      <h4 className="text-md text-gray-700 mb-2">{course.name}</h4>
                      <div className="flex items-center gap-2 mb-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(course.difficulty)}`}>
                          {course.difficulty.charAt(0).toUpperCase() + course.difficulty.slice(1)}
                        </span>
                        <span className="text-sm text-yellow-600">
                          {renderRatingStars(course.rating)} {course.rating}
                        </span>
                        <span className="text-xs text-gray-500">({course.reviews} reviews)</span>
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
                        <div className="font-medium text-gray-700">Department:</div>
                        <div className="text-gray-600">{course.department}</div>
                      </div>

                      <div>
                        <div className="font-medium text-gray-700">Schedule:</div>
                        <div className="text-gray-600">
                          {course.schedule.days.join(', ')}<br />
                          {course.schedule.time}<br />
                          📍 {course.schedule.location}
                        </div>
                      </div>

                      <div>
                        <div className="font-medium text-gray-700">Enrollment:</div>
                        <div className={`${getEnrollmentStatus(course).color}`}>
                          {course.enrollmentInfo.enrolled}/{course.enrollmentInfo.capacity} students
                          {course.enrollmentInfo.waitlist > 0 && (
                            <span className="text-orange-600"> • {course.enrollmentInfo.waitlist} waitlisted</span>
                          )}
                        </div>
                      </div>

                      <div>
                        <div className="font-medium text-gray-700">Credits & Semester:</div>
                        <div className="text-gray-600">{course.credits} credits • {course.semester}</div>
                      </div>
                    </div>

                    <div className="mt-4 pt-4 border-t space-y-2">
                      <Link
                        href={`/courses/${course.id}`}
                        className="block w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-center"
                      >
                        📚 View Course
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
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-semibold text-gray-900">{course.code}</h3>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(course.status)}`}>
                            {course.status.charAt(0).toUpperCase() + course.status.slice(1)}
                          </span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(course.difficulty)}`}>
                            {course.difficulty.charAt(0).toUpperCase() + course.difficulty.slice(1)}
                          </span>
                          <span className="text-sm text-yellow-600">
                            {renderRatingStars(course.rating)} {course.rating}
                          </span>
                        </div>
                        
                        <h4 className="text-md text-gray-700 mb-2">{course.name}</h4>
                        <p className="text-sm text-gray-600 mb-3">{course.description}</p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm mb-3">
                          <div>
                            <span className="font-medium text-gray-700">Lecturer:</span><br />
                            <Link 
                              href={`/student/lecturers?lecturer=${course.lecturer.id}`}
                              className="text-blue-600 hover:text-blue-800"
                            >
                              {course.lecturer.name}
                            </Link>
                          </div>
                          <div>
                            <span className="font-medium text-gray-700">Schedule:</span><br />
                            <span className="text-gray-600">{course.schedule.days.join(', ')} • {course.schedule.time}</span>
                          </div>
                          <div>
                            <span className="font-medium text-gray-700">Enrollment:</span><br />
                            <span className={`${getEnrollmentStatus(course).color}`}>
                              {course.enrollmentInfo.enrolled}/{course.enrollmentInfo.capacity}
                            </span>
                          </div>
                          <div>
                            <span className="font-medium text-gray-700">Credits:</span><br />
                            <span className="text-gray-600">{course.credits} • {course.semester}</span>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-2 mb-3">
                          {course.tags.map((tag, idx) => (
                            <span key={idx} className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
                              {tag}
                            </span>
                          ))}
                        </div>

                        {course.prerequisites.length > 0 && (
                          <div className="text-sm text-orange-600 mb-2">
                            Prerequisites: {course.prerequisites.join(', ')}
                          </div>
                        )}
                      </div>
                      
                      <div className="flex flex-col gap-2">
                        <Link
                          href={`/courses/${course.id}`}
                          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm text-center"
                        >
                          📚 View Course
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
            <div className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-2xl font-bold">{selectedCourse.code} - {selectedCourse.name}</h2>
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
                      <h4 className="font-semibold text-gray-900 mb-2">Description</h4>
                      <p className="text-gray-600">{selectedCourse.description}</p>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Schedule & Location</h4>
                      <div className="space-y-1 text-sm">
                        <div>📅 {selectedCourse.schedule.days.join(', ')}</div>
                        <div>⏰ {selectedCourse.schedule.time}</div>
                        <div>📍 {selectedCourse.schedule.location}</div>
                      </div>
                    </div>

                    {selectedCourse.prerequisites.length > 0 && (
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Prerequisites</h4>
                        <div className="flex flex-wrap gap-2">
                          {selectedCourse.prerequisites.map((prereq, idx) => (
                            <span key={idx} className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm">
                              {prereq}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Tags</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedCourse.tags.map((tag, idx) => (
                          <span key={idx} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                            {tag}
                          </span>
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

                    <div className="space-y-3">
                      <div className="p-3 bg-gray-50 rounded-lg">
                        <div className="font-medium text-gray-900">Course Details</div>
                        <div className="text-sm text-gray-600 space-y-1">
                          <div>Credits: {selectedCourse.credits}</div>
                          <div>Semester: {selectedCourse.semester}</div>
                          <div>Department: {selectedCourse.department}</div>
                          <div>Difficulty: {selectedCourse.difficulty}</div>
                        </div>
                      </div>

                      <div className="p-3 bg-blue-50 rounded-lg">
                        <div className="font-medium text-blue-900">Enrollment</div>
                        <div className="text-sm text-blue-800 space-y-1">
                          <div>Enrolled: {selectedCourse.enrollmentInfo.enrolled}/{selectedCourse.enrollmentInfo.capacity}</div>
                          <div>Waitlist: {selectedCourse.enrollmentInfo.waitlist}</div>
                          <div>Availability: {selectedCourse.enrollmentInfo.capacity - selectedCourse.enrollmentInfo.enrolled} spots</div>
                        </div>
                      </div>

                      <div className="p-3 bg-yellow-50 rounded-lg">
                        <div className="font-medium text-yellow-900">Rating & Activity</div>
                        <div className="text-sm text-yellow-800 space-y-1">
                          <div>Rating: {selectedCourse.rating}/5 ({selectedCourse.reviews} reviews)</div>
                          <div>Resources: {selectedCourse.resources}</div>
                          <div>Announcements: {selectedCourse.announcements}</div>
                        </div>
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