// app/student/queries/page.tsx
'use client'

import { useState } from 'react'
import Link from 'next/link'

interface Query {
  id: string
  title: string
  category: string
  status: 'pending' | 'in-progress' | 'resolved'
  priority: 'low' | 'medium' | 'high'
  lecturer: string
  course: string
  submittedAt: string
  lastUpdated: string
  description: string
}

const mockQueries: Query[] = [
  {
    id: '1',
    title: 'Question about Assignment 2 deadline',
    category: 'Academic',
    status: 'resolved',
    priority: 'medium',
    lecturer: 'Dr. Sarah Johnson',
    course: 'CS101',
    submittedAt: '2025-07-24',
    lastUpdated: '2025-07-25',
    description: 'Can I get an extension for the assignment due to technical issues?'
  },
  {
    id: '2', 
    title: 'Login issues with course portal',
    category: 'Technical',
    status: 'in-progress',
    priority: 'high',
    lecturer: 'IT Support',
    course: 'General',
    submittedAt: '2025-07-25',
    lastUpdated: '2025-07-26',
    description: 'Cannot access the course portal since yesterday'
  },
  {
    id: '3',
    title: 'Office hours availability next week',
    category: 'Administrative', 
    status: 'pending',
    priority: 'low',
    lecturer: 'Prof. Michael Chen',
    course: 'MATH202',
    submittedAt: '2025-07-26',
    lastUpdated: '2025-07-26',
    description: 'Will you be available for office hours during exam week?'
  }
]

const categories = ['All', 'Academic', 'Technical', 'Administrative', 'Appointment', 'Course-related']
const statusFilters = ['All', 'Pending', 'In Progress', 'Resolved']
const priorityFilters = ['All', 'Low', 'Medium', 'High']

export default function StudentQueriesPage() {
  const [queries, setQueries] = useState<Query[]>(mockQueries)
  const [showNewQueryForm, setShowNewQueryForm] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('All')
  const [statusFilter, setStatusFilter] = useState('All')
  const [priorityFilter, setPriorityFilter] = useState('All')

  // New query form state
  const [newQuery, setNewQuery] = useState({
    title: '',
    category: 'Academic',
    priority: 'medium' as const,
    course: '',
    lecturer: '',
    description: ''
  })

  const handleSubmitQuery = (e: React.FormEvent) => {
    e.preventDefault()
    
    const query: Query = {
      id: Date.now().toString(),
      ...newQuery,
      status: 'pending',
      submittedAt: new Date().toISOString().split('T')[0],
      lastUpdated: new Date().toISOString().split('T')[0]
    }
    
    setQueries([query, ...queries])
    setNewQuery({
      title: '',
      category: 'Academic', 
      priority: 'medium',
      course: '',
      lecturer: '',
      description: ''
    })
    setShowNewQueryForm(false)
  }

  // Filter queries
  const filteredQueries = queries.filter(query => {
    const matchesSearch = query.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         query.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = categoryFilter === 'All' || query.category === categoryFilter
    const matchesStatus = statusFilter === 'All' || query.status === statusFilter.toLowerCase().replace(' ', '-')
    const matchesPriority = priorityFilter === 'All' || query.priority === priorityFilter.toLowerCase()
    
    return matchesSearch && matchesCategory && matchesStatus && matchesPriority
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'in-progress': return 'bg-blue-100 text-blue-800'  
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

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Queries</h1>
          <p className="text-gray-600">Submit and track your questions and support requests</p>
        </div>

        {/* Actions Bar */}
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
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
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
                value={priorityFilter}
                onChange={(e) => setPriorityFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                {priorityFilters.map(priority => (
                  <option key={priority} value={priority}>{priority}</option>
                ))}
              </select>
            </div>

            {/* New Query Button */}
            <button
              onClick={() => setShowNewQueryForm(true)}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              + New Query
            </button>
          </div>
        </div>

        {/* New Query Form Modal */}
        {showNewQueryForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <h2 className="text-2xl font-bold mb-6">Submit New Query</h2>
              
              <form onSubmit={handleSubmitQuery} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                  <input
                    type="text"
                    required
                    value={newQuery.title}
                    onChange={(e) => setNewQuery({...newQuery, title: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="Brief title for your query"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                    <select
                      value={newQuery.category}
                      onChange={(e) => setNewQuery({...newQuery, category: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="Academic">Academic</option>
                      <option value="Technical">Technical</option>
                      <option value="Administrative">Administrative</option>
                      <option value="Appointment">Appointment</option>
                      <option value="Course-related">Course-related</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                    <select
                      value={newQuery.priority}
                      onChange={(e) => setNewQuery({...newQuery, priority: e.target.value as any})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Course</label>
                    <input
                      type="text"
                      value={newQuery.course}
                      onChange={(e) => setNewQuery({...newQuery, course: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="e.g., CS101"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Lecturer (Optional)</label>
                  <input
                    type="text"
                    value={newQuery.lecturer}
                    onChange={(e) => setNewQuery({...newQuery, lecturer: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="Specific lecturer name or leave blank for auto-assignment"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    required
                    rows={4}
                    value={newQuery.description}
                    onChange={(e) => setNewQuery({...newQuery, description: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="Detailed description of your query..."
                  />
                </div>

                <div className="flex gap-4 pt-4">
                  <button
                    type="submit"
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
                  >
                    Submit Query
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowNewQueryForm(false)}
                    className="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-400"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="text-2xl font-bold text-blue-600">{queries.length}</div>
            <div className="text-sm text-gray-600">Total Queries</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="text-2xl font-bold text-yellow-600">
              {queries.filter(q => q.status === 'pending').length}
            </div>
            <div className="text-sm text-gray-600">Pending</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="text-2xl font-bold text-blue-600">
              {queries.filter(q => q.status === 'in-progress').length}
            </div>
            <div className="text-sm text-gray-600">In Progress</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="text-2xl font-bold text-green-600">
              {queries.filter(q => q.status === 'resolved').length}
            </div>
            <div className="text-sm text-gray-600">Resolved</div>
          </div>
        </div>

        {/* Queries List */}
        <div className="space-y-4">
          {filteredQueries.length === 0 ? (
            <div className="bg-white rounded-lg shadow-sm p-8 text-center">
              <div className="text-gray-500 mb-4">No queries found matching your filters</div>
              <button
                onClick={() => setShowNewQueryForm(true)}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
              >
                Submit Your First Query
              </button>
            </div>
          ) : (
            filteredQueries.map((query) => (
              <div key={query.id} className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <Link 
                        href={`/student/queries/${query.id}`}
                        className="text-lg font-semibold text-gray-900 hover:text-blue-600"
                      >
                        {query.title}
                      </Link>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(query.status)}`}>
                        {query.status.charAt(0).toUpperCase() + query.status.slice(1).replace('-', ' ')}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(query.priority)}`}>
                        {query.priority.charAt(0).toUpperCase() + query.priority.slice(1)} Priority
                      </span>
                    </div>
                    
                    <p className="text-gray-600 mb-3 line-clamp-2">{query.description}</p>
                    
                    <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                      <span>Category: <span className="font-medium">{query.category}</span></span>
                      <span>Course: <span className="font-medium">{query.course}</span></span>
                      <span>Lecturer: <span className="font-medium">{query.lecturer}</span></span>
                      <span>Submitted: <span className="font-medium">{query.submittedAt}</span></span>
                      <span>Updated: <span className="font-medium">{query.lastUpdated}</span></span>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <Link
                      href={`/student/queries/${query.id}`}
                      className="bg-blue-50 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-100 transition-colors"
                    >
                      View Details
                    </Link>
                    {query.status === 'pending' && (
                      <button className="bg-gray-50 text-gray-600 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors">
                        Edit
                      </button>
                    )}
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