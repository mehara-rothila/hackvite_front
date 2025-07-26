// app/lecturer/queries/page.tsx
'use client'

import { useState } from 'react'
import Link from 'next/link'

interface Query {
  id: string
  student: string
  studentEmail: string
  title: string
  description: string
  category: 'Academic' | 'Technical' | 'Administrative' | 'Appointment' | 'Course-related'
  priority: 'low' | 'medium' | 'high'
  status: 'pending' | 'in-progress' | 'resolved'
  course: string
  submittedAt: string
  lastUpdated: string
  responseCount: number
  readByLecturer: boolean
}

const mockQueries: Query[] = [
  {
    id: '1',
    student: 'Alice Johnson',
    studentEmail: 'alice.johnson@university.edu',
    title: 'Question about Assignment 3 requirements',
    description: 'I\'m having trouble understanding the requirements for Assignment 3, specifically the part about implementing the sorting algorithm. Could you clarify what approach you\'d like us to take?',
    category: 'Academic',
    priority: 'high',
    status: 'pending',
    course: 'CS101',
    submittedAt: '2025-07-26 09:30',
    lastUpdated: '2025-07-26 09:30',
    responseCount: 0,
    readByLecturer: false
  },
  {
    id: '2',
    student: 'Bob Smith',
    studentEmail: 'bob.smith@university.edu',
    title: 'Cannot access lab materials',
    description: 'The link to the lab materials in the course portal seems to be broken. I\'ve tried multiple browsers but still can\'t access the files for Lab 4.',
    category: 'Technical',
    priority: 'medium',
    status: 'in-progress',
    course: 'CS101',
    submittedAt: '2025-07-26 11:15',
    lastUpdated: '2025-07-26 14:20',
    responseCount: 2,
    readByLecturer: true
  },
  {
    id: '3',
    student: 'Carol Davis',
    studentEmail: 'carol.davis@university.edu',
    title: 'Office hours availability next week',
    description: 'Will you be available for office hours during exam week? I wanted to schedule some time to discuss the final project requirements.',
    category: 'Administrative',
    priority: 'low',
    status: 'resolved',
    course: 'CS101',
    submittedAt: '2025-07-25 14:20',
    lastUpdated: '2025-07-26 08:15',
    responseCount: 3,
    readByLecturer: true
  },
  {
    id: '4',
    student: 'David Wilson',
    studentEmail: 'david.wilson@university.edu',
    title: 'Clarification on midterm topics',
    description: 'Could you please clarify which chapters will be covered in the midterm exam? The syllabus mentions chapters 1-5, but I wanted to confirm if chapter 6 is included.',
    category: 'Academic',
    priority: 'high',
    status: 'pending',
    course: 'CS101',
    submittedAt: '2025-07-26 16:45',
    lastUpdated: '2025-07-26 16:45',
    responseCount: 0,
    readByLecturer: false
  },
  {
    id: '5',
    student: 'Emma Brown',
    studentEmail: 'emma.brown@university.edu',
    title: 'Request for assignment extension',
    description: 'Due to a family emergency, I won\'t be able to submit Assignment 2 by the deadline. Would it be possible to get a 2-day extension?',
    category: 'Administrative',
    priority: 'medium',
    status: 'in-progress',
    course: 'CS101',
    submittedAt: '2025-07-25 19:30',
    lastUpdated: '2025-07-26 10:15',
    responseCount: 1,
    readByLecturer: true
  }
]

const categories = ['All', 'Academic', 'Technical', 'Administrative', 'Appointment', 'Course-related']
const priorities = ['All', 'High', 'Medium', 'Low']
const statuses = ['All', 'Pending', 'In Progress', 'Resolved']
const courses = ['All', 'CS101', 'CS201', 'MATH202']

export default function LecturerQueriesPage() {
  const [queries, setQueries] = useState<Query[]>(mockQueries)
  const [searchTerm, setSearchTerm] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('All')
  const [priorityFilter, setPriorityFilter] = useState('All')
  const [statusFilter, setStatusFilter] = useState('All')
  const [courseFilter, setCourseFilter] = useState('All')
  const [showOnlyUnread, setShowOnlyUnread] = useState(false)

  const handleStatusChange = (queryId: string, newStatus: Query['status']) => {
    setQueries(queries.map(query => 
      query.id === queryId 
        ? { ...query, status: newStatus, lastUpdated: new Date().toLocaleString() }
        : query
    ))
  }

  const handleMarkAsRead = (queryId: string) => {
    setQueries(queries.map(query => 
      query.id === queryId 
        ? { ...query, readByLecturer: true }
        : query
    ))
  }

  const handleMarkAllAsRead = () => {
    setQueries(queries.map(query => ({ ...query, readByLecturer: true })))
  }

  const handleDeleteQuery = (queryId: string) => {
    if (confirm('Are you sure you want to delete this query?')) {
      setQueries(queries.filter(query => query.id !== queryId))
    }
  }

  // Filter queries
  const filteredQueries = queries.filter(query => {
    const matchesSearch = query.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         query.student.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         query.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = categoryFilter === 'All' || query.category === categoryFilter
    const matchesPriority = priorityFilter === 'All' || query.priority === priorityFilter.toLowerCase()
    const matchesStatus = statusFilter === 'All' || query.status === statusFilter.toLowerCase().replace(' ', '-')
    const matchesCourse = courseFilter === 'All' || query.course === courseFilter
    const matchesRead = !showOnlyUnread || !query.readByLecturer
    
    return matchesSearch && matchesCategory && matchesPriority && matchesStatus && matchesCourse && matchesRead
  })

  // Sort queries by priority and date
  const sortedQueries = filteredQueries.sort((a, b) => {
    // First sort by read status (unread first)
    if (!a.readByLecturer && b.readByLecturer) return -1
    if (a.readByLecturer && !b.readByLecturer) return 1
    
    // Then by priority
    const priorityOrder = { high: 3, medium: 2, low: 1 }
    if (priorityOrder[a.priority] !== priorityOrder[b.priority]) {
      return priorityOrder[b.priority] - priorityOrder[a.priority]
    }
    
    // Finally by date (newest first)
    return new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime()
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-red-100 text-red-800'
      case 'in-progress': return 'bg-yellow-100 text-yellow-800'
      case 'resolved': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800'
      case 'medium': return 'bg-orange-100 text-orange-800'
      case 'low': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Academic': return 'bg-blue-100 text-blue-800'
      case 'Technical': return 'bg-purple-100 text-purple-800'
      case 'Administrative': return 'bg-gray-100 text-gray-800'
      case 'Appointment': return 'bg-indigo-100 text-indigo-800'
      case 'Course-related': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const unreadCount = queries.filter(q => !q.readByLecturer).length
  const pendingCount = queries.filter(q => q.status === 'pending').length
  const highPriorityCount = queries.filter(q => q.priority === 'high').length

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Student Queries</h1>
          <p className="text-gray-600">Manage and respond to student questions and requests</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="text-2xl font-bold text-blue-600">{queries.length}</div>
            <div className="text-sm text-gray-600">Total Queries</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="text-2xl font-bold text-red-600">{pendingCount}</div>
            <div className="text-sm text-gray-600">Pending Response</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="text-2xl font-bold text-orange-600">{unreadCount}</div>
            <div className="text-sm text-gray-600">Unread</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="text-2xl font-bold text-purple-600">{highPriorityCount}</div>
            <div className="text-sm text-gray-600">High Priority</div>
          </div>
        </div>

        {/* Filters & Actions */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="flex flex-col sm:flex-row gap-4 flex-1">
              {/* Search */}
              <input
                type="text"
                placeholder="Search queries..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              
              {/* Filters */}
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
                value={priorityFilter}
                onChange={(e) => setPriorityFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                {priorities.map(priority => (
                  <option key={priority} value={priority}>{priority}</option>
                ))}
              </select>

              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
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

              <label className="flex items-center gap-2 px-4 py-2">
                <input
                  type="checkbox"
                  checked={showOnlyUnread}
                  onChange={(e) => setShowOnlyUnread(e.target.checked)}
                  className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <span className="text-sm text-gray-700">Unread only</span>
              </label>
            </div>

            {/* Actions */}
            <div className="flex gap-2">
              {unreadCount > 0 && (
                <button
                  onClick={handleMarkAllAsRead}
                  className="bg-blue-50 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-100 transition-colors"
                >
                  Mark All as Read
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Queries List */}
        <div className="space-y-4">
          {sortedQueries.length === 0 ? (
            <div className="bg-white rounded-lg shadow-sm p-8 text-center">
              <div className="text-gray-500 mb-4">No queries found matching your filters</div>
              <div className="text-sm text-gray-400">Try adjusting your search or filter criteria</div>
            </div>
          ) : (
            sortedQueries.map((query) => (
              <div
                key={query.id}
                className={`bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow border-l-4 ${
                  !query.readByLecturer 
                    ? 'border-l-blue-500 bg-blue-50' 
                    : query.priority === 'high' 
                      ? 'border-l-red-500' 
                      : 'border-l-gray-200'
                }`}
              >
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      {!query.readByLecturer && <span className="w-2 h-2 bg-blue-500 rounded-full"></span>}
                      
                      <h3 className={`text-lg font-semibold ${!query.readByLecturer ? 'text-blue-900' : 'text-gray-900'}`}>
                        {query.title}
                      </h3>
                      
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(query.status)}`}>
                        {query.status.charAt(0).toUpperCase() + query.status.slice(1).replace('-', ' ')}
                      </span>
                      
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(query.priority)}`}>
                        {query.priority.charAt(0).toUpperCase() + query.priority.slice(1)} Priority
                      </span>

                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(query.category)}`}>
                        {query.category}
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-3 mb-3">
                      <div>
                        <div className="font-medium text-gray-900">{query.student}</div>
                        <div className="text-sm text-gray-500">{query.studentEmail}</div>
                      </div>
                      <div className="text-sm text-gray-500">
                        Course: <span className="font-medium">{query.course}</span>
                      </div>
                    </div>
                    
                    <p className="text-gray-600 mb-3 line-clamp-2">{query.description}</p>
                    
                    <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                      <span>Submitted: <span className="font-medium">{query.submittedAt}</span></span>
                      <span>Last Updated: <span className="font-medium">{query.lastUpdated}</span></span>
                      <span>Responses: <span className="font-medium">{query.responseCount}</span></span>
                    </div>
                  </div>
                  
                  <div className="flex flex-col gap-2">
                    <Link
                      href={`/lecturer/queries/${query.id}`}
                      onClick={() => handleMarkAsRead(query.id)}
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm text-center"
                    >
                      {query.responseCount === 0 ? 'Respond' : 'View Conversation'}
                    </Link>
                    
                    <select
                      value={query.status}
                      onChange={(e) => handleStatusChange(query.id, e.target.value as Query['status'])}
                      className="px-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="pending">Pending</option>
                      <option value="in-progress">In Progress</option>
                      <option value="resolved">Resolved</option>
                    </select>
                    
                    <Link
                      href={`mailto:${query.studentEmail}?subject=Re: ${query.title}&body=Dear ${query.student},%0D%0A%0D%0A`}
                      className="bg-green-50 text-green-600 px-4 py-2 rounded-lg hover:bg-green-100 transition-colors text-sm text-center"
                    >
                      ✉️ Email Student
                    </Link>

                    {!query.readByLecturer && (
                      <button
                        onClick={() => handleMarkAsRead(query.id)}
                        className="bg-gray-50 text-gray-600 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors text-sm"
                      >
                        Mark as Read
                      </button>
                    )}
                    
                    <button
                      onClick={() => handleDeleteQuery(query.id)}
                      className="bg-red-50 text-red-600 px-4 py-2 rounded-lg hover:bg-red-100 transition-colors text-sm"
                    >
                      🗑️ Delete
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}