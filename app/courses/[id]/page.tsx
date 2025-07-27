// app/courses/[id]/page.tsx
'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'

interface CourseDetail {
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
  enrollment: {
    current: number
    capacity: number
    waitlist: number
  }
  syllabus: string
  status: 'active' | 'upcoming' | 'completed'
  announcements: {
    id: string
    title: string
    content: string
    date: string
    priority: 'normal' | 'important' | 'urgent'
  }[]
  resources: {
    id: string
    name: string
    type: 'pdf' | 'video' | 'link' | 'document'
    size?: string
    uploadDate: string
    category: 'lecture' | 'assignment' | 'reading' | 'lab'
  }[]
  assignments: {
    id: string
    title: string
    dueDate: string
    status: 'upcoming' | 'active' | 'submitted' | 'graded'
    grade?: string
    description: string
  }[]
  upcomingEvents: {
    id: string
    type: 'lecture' | 'assignment' | 'exam' | 'lab'
    title: string
    date: string
    time?: string
    location?: string
  }[]
  grades: {
    overall: string
    breakdown: {
      assignments: { completed: number; total: number; average: number }
      quizzes: { completed: number; total: number; average: number }
      exams: { completed: number; total: number; average: number }
    }
  }
}

const mockCourseDetails: Record<string, CourseDetail> = {
  '1': {
    id: '1',
    code: 'CS101',
    name: 'Introduction to Programming',
    description: 'Fundamental concepts of programming using modern programming languages. Topics include variables, functions, control structures, data types, and basic algorithms.',
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
    enrollment: {
      current: 65,
      capacity: 70,
      waitlist: 8
    },
    syllabus: 'cs101_syllabus.pdf',
    status: 'active',
    announcements: [
      {
        id: '1',
        title: 'Assignment 3 Due Date Extended',
        content: 'Due to technical issues reported by several students, Assignment 3 deadline has been extended to Friday, August 2nd at 11:59 PM.',
        date: '2025-07-28',
        priority: 'important'
      },
      {
        id: '2',
        title: 'Midterm Exam Information',
        content: 'The midterm exam will cover chapters 1-6. Please bring a calculator and photo ID. Review session scheduled for Thursday at 6 PM in Room 105.',
        date: '2025-07-26',
        priority: 'urgent'
      },
      {
        id: '3',
        title: 'Office Hours Change',
        content: 'This week only, Wednesday office hours will be moved from 2-4 PM to 3-5 PM due to a faculty meeting.',
        date: '2025-07-25',
        priority: 'normal'
      }
    ],
    resources: [
      {
        id: '1',
        name: 'Chapter 4 - Functions and Procedures',
        type: 'pdf',
        size: '2.3 MB',
        uploadDate: '2025-07-26',
        category: 'lecture'
      },
      {
        id: '2',
        name: 'Assignment 3 - Recursion Problems',
        type: 'pdf',
        size: '856 KB',
        uploadDate: '2025-07-24',
        category: 'assignment'
      },
      {
        id: '3',
        name: 'Programming Tutorial: Debugging Techniques',
        type: 'video',
        uploadDate: '2025-07-23',
        category: 'lecture'
      },
      {
        id: '4',
        name: 'Lab 5 - Algorithm Implementation',
        type: 'document',
        size: '1.2 MB',
        uploadDate: '2025-07-22',
        category: 'lab'
      },
      {
        id: '5',
        name: 'Recommended Reading: Clean Code Chapter 3',
        type: 'link',
        uploadDate: '2025-07-20',
        category: 'reading'
      }
    ],
    assignments: [
      {
        id: '1',
        title: 'Assignment 3: Recursive Algorithms',
        dueDate: '2025-08-02',
        status: 'active',
        description: 'Implement recursive solutions for factorial, fibonacci, and binary search problems.'
      },
      {
        id: '2',
        title: 'Assignment 2: Control Structures',
        dueDate: '2025-07-25',
        status: 'graded',
        grade: 'A-',
        description: 'Create programs using loops, conditionals, and switch statements.'
      },
      {
        id: '3',
        title: 'Assignment 1: Variables and Data Types',
        dueDate: '2025-07-18',
        status: 'graded',
        grade: 'B+',
        description: 'Basic programming exercises with different data types and variables.'
      }
    ],
    upcomingEvents: [
      {
        id: '1',
        type: 'lecture',
        title: 'Advanced Recursion Concepts',
        date: '2025-07-29',
        time: '10:00 AM',
        location: 'CS Building, Room 101'
      },
      {
        id: '2',
        type: 'assignment',
        title: 'Assignment 3 Due',
        date: '2025-08-02',
        time: '11:59 PM'
      },
      {
        id: '3',
        type: 'exam',
        title: 'Midterm Exam',
        date: '2025-08-05',
        time: '2:00 PM',
        location: 'Main Hall, Room 200'
      },
      {
        id: '4',
        type: 'lab',
        title: 'Lab 6: File Handling',
        date: '2025-08-01',
        time: '1:00 PM',
        location: 'CS Lab 2'
      }
    ],
    grades: {
      overall: 'A-',
      breakdown: {
        assignments: { completed: 2, total: 3, average: 88.5 },
        quizzes: { completed: 4, total: 5, average: 92.3 },
        exams: { completed: 0, total: 2, average: 0 }
      }
    }
  },
  '2': {
    id: '2',
    code: 'CS201',
    name: 'Data Structures and Algorithms',
    description: 'Advanced programming concepts including data structures, algorithm analysis, and software design principles.',
    lecturer: {
      id: 'lec2',
      name: 'Prof. Michael Chen',
      email: 'michael.chen@university.edu',
      avatar: '👨‍🏫',
      office: 'CS Building, Room 301A',
      officeHours: ['Tuesday 10:00-12:00 PM', 'Thursday 10:00-12:00 PM']
    },
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
    syllabus: 'cs201_syllabus.pdf',
    status: 'active',
    announcements: [
      {
        id: '1',
        title: 'Project Proposals Due Next Week',
        content: 'Final project proposals are due Tuesday, August 6th. Please submit a 2-page outline of your chosen algorithm implementation.',
        date: '2025-07-27',
        priority: 'important'
      }
    ],
    resources: [
      {
        id: '1',
        name: 'Binary Trees and BST Implementation',
        type: 'pdf',
        size: '3.1 MB',
        uploadDate: '2025-07-25',
        category: 'lecture'
      },
      {
        id: '2',
        name: 'Project Guidelines and Rubric',
        type: 'document',
        size: '1.8 MB',
        uploadDate: '2025-07-24',
        category: 'assignment'
      }
    ],
    assignments: [
      {
        id: '1',
        title: 'Project Proposal',
        dueDate: '2025-08-06',
        status: 'upcoming',
        description: 'Submit a detailed proposal for your final project implementation.'
      },
      {
        id: '2',
        title: 'Homework 4: Graph Algorithms',
        dueDate: '2025-07-30',
        status: 'active',
        description: 'Implement BFS and DFS traversal algorithms.'
      }
    ],
    upcomingEvents: [
      {
        id: '1',
        type: 'lecture',
        title: 'Graph Theory Fundamentals',
        date: '2025-07-30',
        time: '2:00 PM',
        location: 'CS Building, Room 205'
      },
      {
        id: '2',
        type: 'assignment',
        title: 'Project Proposal Due',
        date: '2025-08-06',
        time: '11:59 PM'
      }
    ],
    grades: {
      overall: 'B+',
      breakdown: {
        assignments: { completed: 3, total: 4, average: 85.7 },
        quizzes: { completed: 2, total: 3, average: 88.0 },
        exams: { completed: 1, total: 2, average: 82.0 }
      }
    }
  }
}

export default function CourseDetailPage() {
  const params = useParams()
  const courseId = params.id as string
  
  const [course, setCourse] = useState<CourseDetail | null>(null)
  const [activeTab, setActiveTab] = useState<'overview' | 'announcements' | 'resources' | 'assignments' | 'grades'>('overview')

  useEffect(() => {
    const courseData = mockCourseDetails[courseId]
    setCourse(courseData || null)
  }, [courseId])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800'
      case 'upcoming': return 'bg-blue-100 text-blue-800'
      case 'completed': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'bg-red-100 text-red-800'
      case 'important': return 'bg-orange-100 text-orange-800'
      case 'normal': return 'bg-blue-100 text-blue-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getResourceIcon = (type: string) => {
    switch (type) {
      case 'pdf': return '📄'
      case 'video': return '🎥'
      case 'link': return '🔗'
      case 'document': return '📝'
      default: return '📁'
    }
  }

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'lecture': return '🎓'
      case 'assignment': return '📝'
      case 'exam': return '📊'
      case 'lab': return '🧪'
      default: return '📅'
    }
  }

  const getAssignmentStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming': return 'bg-blue-100 text-blue-800'
      case 'active': return 'bg-orange-100 text-orange-800'
      case 'submitted': return 'bg-purple-100 text-purple-800'
      case 'graded': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  if (!course) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Course Not Found</h2>
            <p className="text-gray-600 mb-6">The course you're looking for doesn't exist or you don't have permission to view it.</p>
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
            <span className="text-gray-900">{course.code} - {course.name}</span>
          </nav>
        </div>

        {/* Course Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <h1 className="text-3xl font-bold text-gray-900">{course.code}</h1>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(course.status)}`}>
                  {course.status.charAt(0).toUpperCase() + course.status.slice(1)}
                </span>
              </div>
              <h2 className="text-xl text-gray-700 mb-3">{course.name}</h2>
              <p className="text-gray-600 mb-4">{course.description}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <span className="font-medium text-gray-700">Department:</span><br />
                  <span className="text-gray-900">{course.department}</span>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Credits:</span><br />
                  <span className="text-gray-900">{course.credits}</span>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Semester:</span><br />
                  <span className="text-gray-900">{course.semester}</span>
                </div>
              </div>
            </div>

            <div className="lg:w-80">
              <div className="bg-blue-50 rounded-lg p-4">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-3xl">{course.lecturer.avatar}</span>
                  <div>
                    <h3 className="font-semibold text-gray-900">{course.lecturer.name}</h3>
                    <p className="text-sm text-gray-600">{course.lecturer.email}</p>
                  </div>
                </div>
                <div className="space-y-2 text-sm">
                  <div>📍 {course.lecturer.office}</div>
                  <div>
                    🕐 Office Hours:<br />
                    {course.lecturer.officeHours.map((hour, idx) => (
                      <div key={idx} className="ml-4">• {hour}</div>
                    ))}
                  </div>
                </div>
                <div className="mt-4 space-y-2">
                  <Link
                    href={`/messages/new?lecturer=${course.lecturer.id}&course=${course.code}`}
                    className="block w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-center"
                  >
                    💬 Message Instructor
                  </Link>
                  <Link
                    href={`/student/appointments?lecturer=${course.lecturer.id}`}
                    className="block w-full bg-gray-50 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-100 border text-center"
                  >
                    📅 Book Appointment
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Course Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="text-2xl font-bold text-blue-600">{course.enrollment.current}</div>
            <div className="text-sm text-gray-600">Enrolled Students</div>
            <div className="text-xs text-gray-500">of {course.enrollment.capacity} capacity</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="text-2xl font-bold text-green-600">{course.grades.overall}</div>
            <div className="text-sm text-gray-600">Your Grade</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="text-2xl font-bold text-purple-600">{course.upcomingEvents.length}</div>
            <div className="text-sm text-gray-600">Upcoming Events</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="text-2xl font-bold text-orange-600">{course.resources.length}</div>
            <div className="text-sm text-gray-600">Course Resources</div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-lg shadow-sm mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {[
                { key: 'overview', label: 'Overview', icon: '📊' },
                { key: 'announcements', label: 'Announcements', icon: '📢', count: course.announcements.length },
                { key: 'resources', label: 'Resources', icon: '📚', count: course.resources.length },
                { key: 'assignments', label: 'Assignments', icon: '📝', count: course.assignments.length },
                { key: 'grades', label: 'Grades', icon: '📈' }
              ].map(tab => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key as any)}
                  className={`py-4 px-2 text-sm font-medium border-b-2 flex items-center gap-2 ${
                    activeTab === tab.key
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <span>{tab.icon}</span>
                  {tab.label}
                  {tab.count && <span className="ml-1 bg-gray-200 text-gray-600 rounded-full px-2 py-1 text-xs">{tab.count}</span>}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        <div className="space-y-6">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold mb-4">Course Schedule</h3>
                <div className="space-y-3">
                  <div>
                    <span className="font-medium text-gray-700">Class Days:</span><br />
                    <span className="text-gray-900">{course.schedule.days.join(', ')}</span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Time:</span><br />
                    <span className="text-gray-900">{course.schedule.time}</span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Location:</span><br />
                    <span className="text-gray-900">{course.schedule.location}</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold mb-4">Upcoming Events</h3>
                <div className="space-y-3">
                  {course.upcomingEvents.slice(0, 4).map((event) => (
                    <div key={event.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <span className="text-2xl">{getEventIcon(event.type)}</span>
                      <div className="flex-1">
                        <div className="font-medium text-gray-900">{event.title}</div>
                        <div className="text-sm text-gray-600">
                          {new Date(event.date).toLocaleDateString()}
                          {event.time && ` at ${event.time}`}
                          {event.location && ` • ${event.location}`}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Announcements Tab */}
          {activeTab === 'announcements' && (
            <div className="space-y-4">
              {course.announcements.map((announcement) => (
                <div key={announcement.id} className="bg-white rounded-lg shadow-sm p-6">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-lg font-semibold text-gray-900">{announcement.title}</h3>
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(announcement.priority)}`}>
                        {announcement.priority}
                      </span>
                      <span className="text-sm text-gray-500">{new Date(announcement.date).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <p className="text-gray-700">{announcement.content}</p>
                </div>
              ))}
            </div>
          )}

          {/* Resources Tab */}
          {activeTab === 'resources' && (
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="space-y-3">
                {course.resources.map((resource) => (
                  <div key={resource.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{getResourceIcon(resource.type)}</span>
                      <div>
                        <div className="font-medium text-gray-900">{resource.name}</div>
                        <div className="text-sm text-gray-600">
                          {resource.category} • {new Date(resource.uploadDate).toLocaleDateString()}
                          {resource.size && ` • ${resource.size}`}
                        </div>
                      </div>
                    </div>
                    <button className="bg-blue-50 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-100">
                      Download
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Assignments Tab */}
          {activeTab === 'assignments' && (
            <div className="space-y-4">
              {course.assignments.map((assignment) => (
                <div key={assignment.id} className="bg-white rounded-lg shadow-sm p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900">{assignment.title}</h3>
                      <p className="text-gray-600 mt-1">{assignment.description}</p>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getAssignmentStatusColor(assignment.status)}`}>
                        {assignment.status.charAt(0).toUpperCase() + assignment.status.slice(1)}
                      </span>
                      {assignment.grade && (
                        <span className="font-bold text-lg text-green-600">{assignment.grade}</span>
                      )}
                    </div>
                  </div>
                  <div className="flex justify-between items-center text-sm text-gray-600">
                    <span>Due: {new Date(assignment.dueDate).toLocaleDateString()}</span>
                    {assignment.status === 'active' && (
                      <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">
                        Submit Assignment
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Grades Tab */}
          {activeTab === 'grades' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold mb-4">Overall Performance</h3>
                <div className="text-center mb-4">
                  <div className="text-4xl font-bold text-green-600">{course.grades.overall}</div>
                  <div className="text-gray-600">Current Grade</div>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Assignments</span>
                    <span>{course.grades.breakdown.assignments.average.toFixed(1)}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Quizzes</span>
                    <span>{course.grades.breakdown.quizzes.average.toFixed(1)}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Exams</span>
                    <span>{course.grades.breakdown.exams.completed > 0 ? `${course.grades.breakdown.exams.average.toFixed(1)}%` : 'Not yet taken'}</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold mb-4">Progress Breakdown</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Assignments</span>
                      <span>{course.grades.breakdown.assignments.completed}/{course.grades.breakdown.assignments.total}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full" 
                        style={{width: `${(course.grades.breakdown.assignments.completed / course.grades.breakdown.assignments.total) * 100}%`}}
                      ></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Quizzes</span>
                      <span>{course.grades.breakdown.quizzes.completed}/{course.grades.breakdown.quizzes.total}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-green-600 h-2 rounded-full" 
                        style={{width: `${(course.grades.breakdown.quizzes.completed / course.grades.breakdown.quizzes.total) * 100}%`}}
                      ></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Exams</span>
                      <span>{course.grades.breakdown.exams.completed}/{course.grades.breakdown.exams.total}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-purple-600 h-2 rounded-full" 
                        style={{width: `${course.grades.breakdown.exams.total > 0 ? (course.grades.breakdown.exams.completed / course.grades.breakdown.exams.total) * 100 : 0}%`}}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow-sm p-6 mt-6">
          <h3 className="font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="flex flex-wrap gap-3">
            <Link
              href={`/courses/${course.id}/messages`}
              className="bg-blue-50 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-100"
            >
              💬 Course Messages
            </Link>
            <Link
              href="/student/queries?new=true"
              className="bg-green-50 text-green-600 px-4 py-2 rounded-lg hover:bg-green-100"
            >
              ❓ Ask Question
            </Link>
            <Link
              href={`/student/appointments?lecturer=${course.lecturer.id}`}
              className="bg-purple-50 text-purple-600 px-4 py-2 rounded-lg hover:bg-purple-100"
            >
              📅 Book Appointment
            </Link>
            <button className="bg-gray-50 text-gray-600 px-4 py-2 rounded-lg hover:bg-gray-100">
              📄 Download Syllabus
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}