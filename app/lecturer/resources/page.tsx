// app/lecturer/resources/page.tsx
'use client'

import { useState } from 'react'
import Link from 'next/link'

interface Resource {
  id: string
  title: string
  description: string
  filename: string
  fileSize: string
  fileType: string
  course: string
  category: 'lecture-notes' | 'assignments' | 'readings' | 'labs' | 'exams' | 'supplementary'
  uploadedAt: string
  lastModified: string
  downloadCount: number
  version: number
  isPublic: boolean
  tags: string[]
  url: string
}

const mockResources: Resource[] = [
  {
    id: '1',
    title: 'Introduction to Programming - Week 1',
    description: 'Basic concepts of programming, variables, and data types',
    filename: 'CS101_Week1_Notes.pdf',
    fileSize: '2.4 MB',
    fileType: 'pdf',
    course: 'CS101',
    category: 'lecture-notes',
    uploadedAt: '2025-07-20',
    lastModified: '2025-07-22',
    downloadCount: 45,
    version: 2,
    isPublic: true,
    tags: ['variables', 'data-types', 'basics'],
    url: '#'
  },
  {
    id: '2',
    title: 'Assignment 1: Hello World Program',
    description: 'First programming assignment covering basic syntax and output',
    filename: 'CS101_Assignment1.pdf',
    fileSize: '1.2 MB',
    fileType: 'pdf',
    course: 'CS101',
    category: 'assignments',
    uploadedAt: '2025-07-18',
    lastModified: '2025-07-18',
    downloadCount: 67,
    version: 1,
    isPublic: true,
    tags: ['assignment', 'hello-world', 'syntax'],
    url: '#'
  },
  {
    id: '3',
    title: 'Lab 2: Control Structures',
    description: 'Hands-on practice with if statements, loops, and conditionals',
    filename: 'CS101_Lab2_Instructions.docx',
    fileSize: '856 KB',
    fileType: 'docx',
    course: 'CS101',
    category: 'labs',
    uploadedAt: '2025-07-25',
    lastModified: '2025-07-25',
    downloadCount: 23,
    version: 1,
    isPublic: true,
    tags: ['loops', 'if-statements', 'control'],
    url: '#'
  },
  {
    id: '4',
    title: 'Midterm Exam Study Guide',
    description: 'Comprehensive study guide covering chapters 1-5',
    filename: 'CS101_Midterm_StudyGuide.pdf',
    fileSize: '3.1 MB',
    fileType: 'pdf',
    course: 'CS101',
    category: 'exams',
    uploadedAt: '2025-07-24',
    lastModified: '2025-07-24',
    downloadCount: 89,
    version: 1,
    isPublic: false,
    tags: ['midterm', 'study-guide', 'chapters-1-5'],
    url: '#'
  }
]

const categories = ['lecture-notes', 'assignments', 'readings', 'labs', 'exams', 'supplementary']
const courses = ['CS101', 'CS201', 'MATH202', 'ENG110']

export default function LecturerResourcesPage() {
  const [resources, setResources] = useState<Resource[]>(mockResources)
  const [showUploadForm, setShowUploadForm] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [courseFilter, setCourseFilter] = useState('all')
  const [categoryFilter, setCategoryFilter] = useState('all')

  // Upload form state
  const [newResource, setNewResource] = useState({
    title: '',
    description: '',
    course: 'CS101',
    category: 'lecture-notes' as const,
    isPublic: true,
    tags: '',
    file: null as File | null
  })

  const handleUpload = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!newResource.file) {
      alert('Please select a file to upload')
      return
    }

    const resource: Resource = {
      id: Date.now().toString(),
      title: newResource.title,
      description: newResource.description,
      filename: newResource.file.name,
      fileSize: formatFileSize(newResource.file.size),
      fileType: newResource.file.name.split('.').pop()?.toLowerCase() || 'unknown',
      course: newResource.course,
      category: newResource.category,
      uploadedAt: new Date().toISOString().split('T')[0],
      lastModified: new Date().toISOString().split('T')[0],
      downloadCount: 0,
      version: 1,
      isPublic: newResource.isPublic,
      tags: newResource.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
      url: '#'
    }
    
    setResources([resource, ...resources])
    setNewResource({
      title: '',
      description: '',
      course: 'CS101',
      category: 'lecture-notes',
      isPublic: true,
      tags: '',
      file: null
    })
    setShowUploadForm(false)
  }

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const handleDeleteResource = (id: string) => {
    if (confirm('Are you sure you want to delete this resource?')) {
      setResources(resources.filter(r => r.id !== id))
    }
  }

  const handleToggleVisibility = (id: string) => {
    setResources(resources.map(r => 
      r.id === id ? { ...r, isPublic: !r.isPublic } : r
    ))
  }

  // Filter resources
  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesCourse = courseFilter === 'all' || resource.course === courseFilter
    const matchesCategory = categoryFilter === 'all' || resource.category === categoryFilter
    
    return matchesSearch && matchesCourse && matchesCategory
  })

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'lecture-notes': return 'bg-blue-100 text-blue-800'
      case 'assignments': return 'bg-red-100 text-red-800'
      case 'readings': return 'bg-green-100 text-green-800'
      case 'labs': return 'bg-purple-100 text-purple-800'
      case 'exams': return 'bg-yellow-100 text-yellow-800'
      case 'supplementary': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getFileTypeIcon = (fileType: string) => {
    switch (fileType.toLowerCase()) {
      case 'pdf': return '📄'
      case 'docx': case 'doc': return '📝'
      case 'pptx': case 'ppt': return '📊'
      case 'xlsx': case 'xls': return '📈'
      case 'zip': case 'rar': return '📦'
      case 'txt': return '📃'
      default: return '📎'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Course Resources</h1>
          <p className="text-gray-600">Upload and manage learning materials for your courses</p>
        </div>

        {/* Actions Bar */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="flex flex-col sm:flex-row gap-4 flex-1">
              {/* Search */}
              <input
                type="text"
                placeholder="Search resources..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              
              {/* Filters */}
              <select
                value={courseFilter}
                onChange={(e) => setCourseFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Courses</option>
                {courses.map(course => (
                  <option key={course} value={course}>{course}</option>
                ))}
              </select>

              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Categories</option>
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                  </option>
                ))}
              </select>
            </div>

            {/* Upload Button */}
            <button
              onClick={() => setShowUploadForm(true)}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              📤 Upload Resource
            </button>
          </div>
        </div>

        {/* Upload Form Modal */}
        {showUploadForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <h2 className="text-2xl font-bold mb-6">Upload New Resource</h2>
              
              <form onSubmit={handleUpload} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                  <input
                    type="text"
                    required
                    value={newResource.title}
                    onChange={(e) => setNewResource({...newResource, title: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="Resource title"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    rows={3}
                    value={newResource.description}
                    onChange={(e) => setNewResource({...newResource, description: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="Brief description of the resource"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Course</label>
                    <select
                      value={newResource.course}
                      onChange={(e) => setNewResource({...newResource, course: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    >
                      {courses.map(course => (
                        <option key={course} value={course}>{course}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                    <select
                      value={newResource.category}
                      onChange={(e) => setNewResource({...newResource, category: e.target.value as any})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    >
                      {categories.map(category => (
                        <option key={category} value={category}>
                          {category.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tags (comma-separated)</label>
                  <input
                    type="text"
                    value={newResource.tags}
                    onChange={(e) => setNewResource({...newResource, tags: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., variables, loops, basics"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">File</label>
                  <input
                    type="file"
                    required
                    onChange={(e) => setNewResource({...newResource, file: e.target.files?.[0] || null})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    accept=".pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx,.txt,.zip,.rar"
                  />
                  <div className="text-xs text-gray-500 mt-1">
                    Supported formats: PDF, Word, PowerPoint, Excel, Text, ZIP
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="isPublic"
                    checked={newResource.isPublic}
                    onChange={(e) => setNewResource({...newResource, isPublic: e.target.checked})}
                    className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="isPublic" className="text-sm font-medium text-gray-700">
                    Make this resource publicly available to students
                  </label>
                </div>

                <div className="flex gap-4 pt-4">
                  <button
                    type="submit"
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
                  >
                    Upload Resource
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowUploadForm(false)}
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
            <div className="text-2xl font-bold text-blue-600">{resources.length}</div>
            <div className="text-sm text-gray-600">Total Resources</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="text-2xl font-bold text-green-600">
              {resources.filter(r => r.isPublic).length}
            </div>
            <div className="text-sm text-gray-600">Public Resources</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="text-2xl font-bold text-purple-600">
              {resources.reduce((sum, r) => sum + r.downloadCount, 0)}
            </div>
            <div className="text-sm text-gray-600">Total Downloads</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="text-2xl font-bold text-orange-600">
              {new Set(resources.map(r => r.course)).size}
            </div>
            <div className="text-sm text-gray-600">Courses</div>
          </div>
        </div>

        {/* Resources List */}
        <div className="space-y-4">
          {filteredResources.length === 0 ? (
            <div className="bg-white rounded-lg shadow-sm p-8 text-center">
              <div className="text-gray-500 mb-4">No resources found</div>
              <button
                onClick={() => setShowUploadForm(true)}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
              >
                Upload Your First Resource
              </button>
            </div>
          ) : (
            filteredResources.map((resource) => (
              <div key={resource.id} className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-2xl">{getFileTypeIcon(resource.fileType)}</span>
                      <h3 className="text-lg font-semibold text-gray-900">{resource.title}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(resource.category)}`}>
                        {resource.category.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        resource.isPublic ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {resource.isPublic ? 'Public' : 'Private'}
                      </span>
                    </div>
                    
                    <p className="text-gray-600 mb-3">{resource.description}</p>
                    
                    <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-3">
                      <span>Course: <span className="font-medium">{resource.course}</span></span>
                      <span>File: <span className="font-medium">{resource.filename}</span></span>
                      <span>Size: <span className="font-medium">{resource.fileSize}</span></span>
                      <span>Downloads: <span className="font-medium">{resource.downloadCount}</span></span>
                      <span>Uploaded: <span className="font-medium">{resource.uploadedAt}</span></span>
                    </div>

                    {resource.tags.length > 0 && (
                      <div className="flex gap-2 flex-wrap">
                        {resource.tags.map((tag, idx) => (
                          <span key={idx} className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded">
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  
                  <div className="flex flex-col gap-2">
                    <a
                      href={resource.url}
                      className="bg-blue-50 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-100 transition-colors text-sm text-center"
                    >
                      📥 Download
                    </a>
                    
                    <button
                      onClick={() => handleToggleVisibility(resource.id)}
                      className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                        resource.isPublic 
                          ? 'bg-orange-50 text-orange-600 hover:bg-orange-100' 
                          : 'bg-green-50 text-green-600 hover:bg-green-100'
                      }`}
                    >
                      {resource.isPublic ? '🔓 Make Private' : '🔒 Make Public'}
                    </button>
                    
                    <button className="bg-gray-50 text-gray-600 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors text-sm">
                      ✏️ Edit
                    </button>
                    
                    <button
                      onClick={() => handleDeleteResource(resource.id)}
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