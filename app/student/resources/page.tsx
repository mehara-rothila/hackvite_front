// app/student/resources/page.tsx
'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

interface Resource {
  id: string
  title: string
  description: string
  filename: string
  fileSize: string
  fileType: string
  course: string
  lecturer: string
  category: 'lecture-notes' | 'assignments' | 'readings' | 'labs' | 'exams' | 'supplementary'
  uploadedAt: string
  lastModified: string
  downloadCount: number
  version: number
  tags: string[]
  url: string
  isNew?: boolean
}

// Mock data - in real app would come from API based on student's enrolled courses
const mockResources: Resource[] = [
  {
    id: '1',
    title: 'Introduction to Programming - Week 1',
    description: 'Basic concepts of programming, variables, and data types',
    filename: 'CS101_Week1_Notes.pdf',
    fileSize: '2.4 MB',
    fileType: 'pdf',
    course: 'CS101',
    lecturer: 'Dr. Sarah Johnson',
    category: 'lecture-notes',
    uploadedAt: '2025-07-20',
    lastModified: '2025-07-22',
    downloadCount: 45,
    version: 2,
    tags: ['variables', 'data-types', 'basics'],
    url: '#',
    isNew: true
  },
  {
    id: '2',
    title: 'Assignment 1: Hello World Program',
    description: 'First programming assignment covering basic syntax and output',
    filename: 'CS101_Assignment1.pdf',
    fileSize: '1.2 MB',
    fileType: 'pdf',
    course: 'CS101',
    lecturer: 'Dr. Sarah Johnson',
    category: 'assignments',
    uploadedAt: '2025-07-18',
    lastModified: '2025-07-18',
    downloadCount: 67,
    version: 1,
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
    lecturer: 'Dr. Sarah Johnson',
    category: 'labs',
    uploadedAt: '2025-07-25',
    lastModified: '2025-07-25',
    downloadCount: 23,
    version: 1,
    tags: ['loops', 'if-statements', 'control'],
    url: '#',
    isNew: true
  },
  {
    id: '4',
    title: 'Calculus II - Derivatives Review',
    description: 'Comprehensive review of derivative rules and applications',
    filename: 'MATH202_Derivatives_Review.pdf',
    fileSize: '4.2 MB',
    fileType: 'pdf',
    course: 'MATH202',
    lecturer: 'Prof. Michael Chen',
    category: 'lecture-notes',
    uploadedAt: '2025-07-23',
    lastModified: '2025-07-23',
    downloadCount: 34,
    version: 1,
    tags: ['derivatives', 'calculus', 'review'],
    url: '#'
  },
  {
    id: '5',
    title: 'Problem Set 3: Integration Techniques',
    description: 'Practice problems for integration by parts and substitution',
    filename: 'MATH202_ProblemSet3.pdf',
    fileSize: '1.8 MB',
    fileType: 'pdf',
    course: 'MATH202',
    lecturer: 'Prof. Michael Chen',
    category: 'assignments',
    uploadedAt: '2025-07-21',
    lastModified: '2025-07-21',
    downloadCount: 28,
    version: 1,
    tags: ['integration', 'problem-set', 'techniques'],
    url: '#'
  },
  {
    id: '6',
    title: 'Academic Writing Guidelines',
    description: 'Style guide for academic essays and research papers',
    filename: 'ENG110_Writing_Guidelines.pdf',
    fileSize: '2.1 MB',
    fileType: 'pdf',
    course: 'ENG110',
    lecturer: 'Dr. Emily Roberts',
    category: 'readings',
    uploadedAt: '2025-07-19',
    lastModified: '2025-07-19',
    downloadCount: 52,
    version: 1,
    tags: ['writing', 'guidelines', 'academic'],
    url: '#'
  }
]

const categories = ['lecture-notes', 'assignments', 'readings', 'labs', 'exams', 'supplementary']
const courses = ['CS101', 'MATH202', 'ENG110']

export default function StudentResourcesPage() {
  const searchParams = useSearchParams()
  const [resources, setResources] = useState<Resource[]>(mockResources)
  const [searchTerm, setSearchTerm] = useState('')
  const [courseFilter, setCourseFilter] = useState(searchParams?.get('course') || 'all')
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [showOnlyNew, setShowOnlyNew] = useState(false)
  const [selectedResource, setSelectedResource] = useState<Resource | null>(null)
  const [downloadedFiles, setDownloadedFiles] = useState<Set<string>>(new Set())

  useEffect(() => {
    // Set course filter from URL parameter
    if (searchParams?.get('course')) {
      setCourseFilter(searchParams.get('course') || 'all')
    }
  }, [searchParams])

  const handleDownload = (resource: Resource) => {
    // Simulate download
    setDownloadedFiles(prev => new Set([...prev, resource.id]))
    
    // Update download count
    setResources(resources.map(r => 
      r.id === resource.id 
        ? { ...r, downloadCount: r.downloadCount + 1 }
        : r
    ))

    // In real app, trigger actual download
    window.open(resource.url, '_blank')
  }

  const handleViewDetails = (resource: Resource) => {
    setSelectedResource(resource)
  }

  // Filter resources
  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.lecturer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesCourse = courseFilter === 'all' || resource.course === courseFilter
    const matchesCategory = categoryFilter === 'all' || resource.category === categoryFilter
    const matchesNew = !showOnlyNew || resource.isNew
    
    return matchesSearch && matchesCourse && matchesCategory && matchesNew
  })

  // Group resources by course
  const resourcesByCourse = filteredResources.reduce((acc, resource) => {
    if (!acc[resource.course]) {
      acc[resource.course] = []
    }
    acc[resource.course].push(resource)
    return acc
  }, {} as Record<string, Resource[]>)

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

  const getCourseColor = (course: string) => {
    switch (course) {
      case 'CS101': return 'bg-blue-50 border-l-blue-500'
      case 'MATH202': return 'bg-green-50 border-l-green-500'
      case 'ENG110': return 'bg-purple-50 border-l-purple-500'
      default: return 'bg-gray-50 border-l-gray-500'
    }
  }

  const newResourcesCount = resources.filter(r => r.isNew).length

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Course Resources</h1>
          <p className="text-gray-600">Access learning materials and resources for your enrolled courses</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="text-2xl font-bold text-blue-600">{resources.length}</div>
            <div className="text-sm text-gray-600">Total Resources</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="text-2xl font-bold text-green-600">{newResourcesCount}</div>
            <div className="text-sm text-gray-600">New This Week</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="text-2xl font-bold text-purple-600">{downloadedFiles.size}</div>
            <div className="text-sm text-gray-600">Downloaded</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="text-2xl font-bold text-orange-600">{courses.length}</div>
            <div className="text-sm text-gray-600">Enrolled Courses</div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center gap-4">
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

              <label className="flex items-center gap-2 px-4 py-2">
                <input
                  type="checkbox"
                  checked={showOnlyNew}
                  onChange={(e) => setShowOnlyNew(e.target.checked)}
                  className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <span className="text-sm text-gray-700">New only</span>
              </label>
            </div>

            {/* Quick Course Access */}
            <div className="flex gap-2">
              {courses.map(course => (
                <button
                  key={course}
                  onClick={() => setCourseFilter(course)}
                  className={`px-3 py-2 rounded-lg text-sm transition-colors ${
                    courseFilter === course 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {course}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Resources by Course */}
        {courseFilter === 'all' ? (
          // Show all courses grouped
          <div className="space-y-8">
            {Object.entries(resourcesByCourse).map(([course, courseResources]) => (
              <div key={course} className={`bg-white rounded-lg shadow-sm border-l-4 ${getCourseColor(course)}`}>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h2 className="text-xl font-semibold text-gray-900">{course}</h2>
                      <p className="text-sm text-gray-600">{courseResources.length} resources available</p>
                    </div>
                    <button
                      onClick={() => setCourseFilter(course)}
                      className="text-sm text-blue-600 hover:text-blue-800"
                    >
                      View All →
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {courseResources.slice(0, 6).map((resource) => (
                      <div key={resource.id} className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow cursor-pointer">
                        <div className="flex items-start gap-3 mb-3">
                          <span className="text-2xl">{getFileTypeIcon(resource.fileType)}</span>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="font-medium text-gray-900 text-sm">{resource.title}</h3>
                              {resource.isNew && <span className="w-2 h-2 bg-red-500 rounded-full"></span>}
                              {downloadedFiles.has(resource.id) && <span className="text-green-600 text-xs">✓</span>}
                            </div>
                            <span className={`px-2 py-1 rounded text-xs ${getCategoryColor(resource.category)}`}>
                              {resource.category.split('-').join(' ')}
                            </span>
                          </div>
                        </div>
                        
                        <p className="text-xs text-gray-600 mb-3 line-clamp-2">{resource.description}</p>
                        
                        <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                          <span>{resource.fileSize}</span>
                          <span>{resource.downloadCount} downloads</span>
                        </div>

                        <div className="flex gap-2">
                          <button
                            onClick={() => handleDownload(resource)}
                            className="flex-1 bg-blue-50 text-blue-600 px-3 py-2 rounded text-xs hover:bg-blue-100"
                          >
                            📥 Download
                          </button>
                          <button
                            onClick={() => handleViewDetails(resource)}
                            className="px-3 py-2 bg-gray-50 text-gray-600 rounded text-xs hover:bg-gray-100"
                          >
                            👁️ View
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          // Show specific course resources in detail
          <div className="space-y-4">
            {filteredResources.length === 0 ? (
              <div className="bg-white rounded-lg shadow-sm p-8 text-center">
                <div className="text-gray-500 mb-4">No resources found</div>
                <div className="text-sm text-gray-400">Try adjusting your search or filter criteria</div>
              </div>
            ) : (
              filteredResources.map((resource) => (
                <div key={resource.id} className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-2xl">{getFileTypeIcon(resource.fileType)}</span>
                        <h3 className="text-lg font-semibold text-gray-900">{resource.title}</h3>
                        {resource.isNew && (
                          <span className="px-2 py-1 text-xs bg-red-100 text-red-700 rounded-full">New</span>
                        )}
                        {downloadedFiles.has(resource.id) && (
                          <span className="px-2 py-1 text-xs bg-green-100 text-green-700 rounded-full">Downloaded</span>
                        )}
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(resource.category)}`}>
                          {resource.category.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                        </span>
                      </div>
                      
                      <p className="text-gray-600 mb-3">{resource.description}</p>
                      
                      <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-3">
                        <span>Course: <span className="font-medium">{resource.course}</span></span>
                        <span>Lecturer: <span className="font-medium">{resource.lecturer}</span></span>
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
                      <button
                        onClick={() => handleDownload(resource)}
                        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm"
                      >
                        📥 Download
                      </button>
                      
                      <button
                        onClick={() => handleViewDetails(resource)}
                        className="bg-gray-50 text-gray-600 px-6 py-2 rounded-lg hover:bg-gray-100 transition-colors text-sm"
                      >
                        👁️ View Details
                      </button>

                      <Link
                        href={`/student/queries?subject=${encodeURIComponent(resource.title)}&lecturer=${encodeURIComponent(resource.lecturer)}`}
                        className="bg-green-50 text-green-600 px-6 py-2 rounded-lg hover:bg-green-100 transition-colors text-sm text-center"
                      >
                        ❓ Ask Question
                      </Link>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Resource Detail Modal */}
        {selectedResource && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg p-6 w-full max-w-3xl max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-start mb-6">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-3xl">{getFileTypeIcon(selectedResource.fileType)}</span>
                    <h2 className="text-2xl font-bold text-gray-900">{selectedResource.title}</h2>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(selectedResource.category)}`}>
                      {selectedResource.category.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                    </span>
                    <span className="px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                      {selectedResource.course}
                    </span>
                    {selectedResource.isNew && (
                      <span className="px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800">
                        New
                      </span>
                    )}
                  </div>
                </div>
                <button
                  onClick={() => setSelectedResource(null)}
                  className="text-gray-400 hover:text-gray-600 text-2xl"
                >
                  ×
                </button>
              </div>

              <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <div className="font-medium text-gray-900">Lecturer</div>
                    <div className="text-gray-600">{selectedResource.lecturer}</div>
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">File Size</div>
                    <div className="text-gray-600">{selectedResource.fileSize}</div>
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">Downloads</div>
                    <div className="text-gray-600">{selectedResource.downloadCount}</div>
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">Uploaded</div>
                    <div className="text-gray-600">{selectedResource.uploadedAt}</div>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <h4 className="font-semibold text-gray-900 mb-2">Description</h4>
                <p className="text-gray-700">{selectedResource.description}</p>
              </div>

              {selectedResource.tags.length > 0 && (
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-2">Tags</h4>
                  <div className="flex gap-2 flex-wrap">
                    {selectedResource.tags.map((tag, idx) => (
                      <span key={idx} className="px-3 py-1 text-sm bg-gray-100 text-gray-600 rounded-full">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex gap-3 pt-4 border-t">
                <button
                  onClick={() => handleDownload(selectedResource)}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
                >
                  📥 Download {selectedResource.filename}
                </button>
                <Link
                  href={`/student/queries?subject=${encodeURIComponent(selectedResource.title)}&lecturer=${encodeURIComponent(selectedResource.lecturer)}`}
                  className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700"
                >
                  ❓ Ask Question About This
                </Link>
                <button
                  onClick={() => setSelectedResource(null)}
                  className="bg-gray-100 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-200"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}