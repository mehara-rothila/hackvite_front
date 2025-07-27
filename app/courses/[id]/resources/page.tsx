// app/courses/[id]/resources/page.tsx
'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'

interface CourseResource {
  id: string
  name: string
  description?: string
  type: 'pdf' | 'video' | 'link' | 'document' | 'image' | 'audio' | 'archive'
  category: 'lecture' | 'assignment' | 'reading' | 'lab' | 'exam' | 'reference' | 'supplemental'
  size?: string
  uploadDate: string
  lastModified: string
  downloadCount: number
  uploader: {
    name: string
    role: 'lecturer' | 'ta' | 'admin'
  }
  tags: string[]
  isRequired: boolean
  weekNumber?: number
  dueDate?: string
  version: string
  url?: string
  permissions: {
    canDownload: boolean
    canView: boolean
    requiresAuth: boolean
  }
  associatedAssignment?: string
}

interface CourseInfo {
  id: string
  code: string
  name: string
  lecturer: string
  semester: string
  userRole: 'student' | 'lecturer' | 'ta'
}

const mockCourseInfo: Record<string, CourseInfo> = {
  '1': {
    id: '1',
    code: 'CS101',
    name: 'Introduction to Programming',
    lecturer: 'Dr. Sarah Johnson',
    semester: 'Fall 2025',
    userRole: 'student'
  },
  '2': {
    id: '2',
    code: 'CS201',
    name: 'Data Structures and Algorithms',
    lecturer: 'Prof. Michael Chen',
    semester: 'Fall 2025',
    userRole: 'student'
  }
}

const mockResources: Record<string, CourseResource[]> = {
  '1': [
    {
      id: '1',
      name: 'Chapter 1-3: Programming Fundamentals',
      description: 'Introduction to variables, data types, and basic control structures',
      type: 'pdf',
      category: 'lecture',
      size: '4.2 MB',
      uploadDate: '2025-07-15',
      lastModified: '2025-07-20',
      downloadCount: 156,
      uploader: { name: 'Dr. Sarah Johnson', role: 'lecturer' },
      tags: ['fundamentals', 'variables', 'data-types'],
      isRequired: true,
      weekNumber: 1,
      version: '1.2',
      permissions: { canDownload: true, canView: true, requiresAuth: false }
    },
    {
      id: '2',
      name: 'Assignment 1: Hello World Program',
      description: 'Create your first program with proper syntax and output formatting',
      type: 'pdf',
      category: 'assignment',
      size: '856 KB',
      uploadDate: '2025-07-18',
      lastModified: '2025-07-18',
      downloadCount: 142,
      uploader: { name: 'Dr. Sarah Johnson', role: 'lecturer' },
      tags: ['assignment', 'hello-world', 'syntax'],
      isRequired: true,
      weekNumber: 1,
      dueDate: '2025-07-25',
      version: '1.0',
      associatedAssignment: 'Assignment 1',
      permissions: { canDownload: true, canView: true, requiresAuth: false }
    },
    {
      id: '3',
      name: 'Programming Environment Setup Guide',
      description: 'Step-by-step guide to install and configure development tools',
      type: 'video',
      category: 'reference',
      uploadDate: '2025-07-16',
      lastModified: '2025-07-16',
      downloadCount: 98,
      uploader: { name: 'Teaching Assistant', role: 'ta' },
      tags: ['setup', 'ide', 'environment'],
      isRequired: true,
      weekNumber: 1,
      version: '1.0',
      permissions: { canDownload: false, canView: true, requiresAuth: false }
    },
    {
      id: '4',
      name: 'Lab 2: Control Structures Practice',
      description: 'Hands-on exercises for loops, conditionals, and decision making',
      type: 'document',
      category: 'lab',
      size: '1.8 MB',
      uploadDate: '2025-07-22',
      lastModified: '2025-07-23',
      downloadCount: 67,
      uploader: { name: 'Dr. Sarah Johnson', role: 'lecturer' },
      tags: ['lab', 'loops', 'conditionals'],
      isRequired: true,
      weekNumber: 2,
      version: '1.1',
      permissions: { canDownload: true, canView: true, requiresAuth: false }
    },
    {
      id: '5',
      name: 'Supplemental Reading: Clean Code Chapter 2',
      description: 'Additional reading on meaningful names and code organization',
      type: 'link',
      category: 'supplemental',
      uploadDate: '2025-07-20',
      lastModified: '2025-07-20',
      downloadCount: 34,
      uploader: { name: 'Dr. Sarah Johnson', role: 'lecturer' },
      tags: ['reading', 'clean-code', 'best-practices'],
      isRequired: false,
      weekNumber: 2,
      version: '1.0',
      url: 'https://example.com/clean-code-chapter-2',
      permissions: { canDownload: false, canView: true, requiresAuth: true }
    },
    {
      id: '6',
      name: 'Midterm Exam Study Guide',
      description: 'Comprehensive review guide for chapters 1-6 with practice problems',
      type: 'pdf',
      category: 'exam',
      size: '2.1 MB',
      uploadDate: '2025-07-26',
      lastModified: '2025-07-27',
      downloadCount: 89,
      uploader: { name: 'Dr. Sarah Johnson', role: 'lecturer' },
      tags: ['exam', 'study-guide', 'review'],
      isRequired: true,
      weekNumber: 4,
      version: '1.1',
      permissions: { canDownload: true, canView: true, requiresAuth: false }
    },
    {
      id: '7',
      name: 'Sample Code: Recursive Functions',
      description: 'Working examples of factorial, fibonacci, and tree traversal',
      type: 'archive',
      category: 'reference',
      size: '856 KB',
      uploadDate: '2025-07-25',
      lastModified: '2025-07-25',
      downloadCount: 78,
      uploader: { name: 'Teaching Assistant', role: 'ta' },
      tags: ['code', 'recursion', 'examples'],
      isRequired: false,
      weekNumber: 3,
      version: '1.0',
      permissions: { canDownload: true, canView: true, requiresAuth: false }
    }
  ],
  '2': [
    {
      id: '8',
      name: 'Data Structures Overview',
      description: 'Comprehensive guide to arrays, linked lists, stacks, and queues',
      type: 'pdf',
      category: 'lecture',
      size: '6.8 MB',
      uploadDate: '2025-07-20',
      lastModified: '2025-07-22',
      downloadCount: 45,
      uploader: { name: 'Prof. Michael Chen', role: 'lecturer' },
      tags: ['data-structures', 'arrays', 'linked-lists'],
      isRequired: true,
      weekNumber: 1,
      version: '2.0',
      permissions: { canDownload: true, canView: true, requiresAuth: false }
    },
    {
      id: '9',
      name: 'Algorithm Analysis Techniques',
      description: 'Big O notation, time complexity, and space complexity analysis',
      type: 'video',
      category: 'lecture',
      uploadDate: '2025-07-24',
      lastModified: '2025-07-24',
      downloadCount: 38,
      uploader: { name: 'Prof. Michael Chen', role: 'lecturer' },
      tags: ['algorithms', 'big-o', 'complexity'],
      isRequired: true,
      weekNumber: 2,
      version: '1.0',
      permissions: { canDownload: false, canView: true, requiresAuth: false }
    }
  ]
}

export default function CourseResourcesPage() {
  const params = useParams()
  const courseId = params.id as string
  
  const [course, setCourse] = useState<CourseInfo | null>(null)
  const [resources, setResources] = useState<CourseResource[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('All')
  const [typeFilter, setTypeFilter] = useState('All')
  const [weekFilter, setWeekFilter] = useState('All')
  const [requiredFilter, setRequiredFilter] = useState('All')
  const [sortBy, setSortBy] = useState('Upload Date')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list')
  const [selectedResource, setSelectedResource] = useState<CourseResource | null>(null)

  useEffect(() => {
    const courseData = mockCourseInfo[courseId]
    const resourcesData = mockResources[courseId] || []
    setCourse(courseData || null)
    setResources(resourcesData)
  }, [courseId])

  const filteredResources = resources
    .filter(resource => {
      const matchesSearch = resource.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           resource.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           resource.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      const matchesCategory = categoryFilter === 'All' || resource.category === categoryFilter.toLowerCase()
      const matchesType = typeFilter === 'All' || resource.type === typeFilter.toLowerCase()
      const matchesWeek = weekFilter === 'All' || resource.weekNumber?.toString() === weekFilter
      const matchesRequired = requiredFilter === 'All' || 
                             (requiredFilter === 'Required' && resource.isRequired) ||
                             (requiredFilter === 'Optional' && !resource.isRequired)
      
      return matchesSearch && matchesCategory && matchesType && matchesWeek && matchesRequired
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'Name A-Z': return a.name.localeCompare(b.name)
        case 'Name Z-A': return b.name.localeCompare(a.name)
        case 'Upload Date': return new Date(b.uploadDate).getTime() - new Date(a.uploadDate).getTime()
        case 'Size': return (parseFloat(b.size || '0') - parseFloat(a.size || '0'))
        case 'Downloads': return b.downloadCount - a.downloadCount
        case 'Week': return (a.weekNumber || 0) - (b.weekNumber || 0)
        default: return 0
      }
    })

  const getResourceIcon = (type: string) => {
    switch (type) {
      case 'pdf': return '📄'
      case 'video': return '🎥'
      case 'link': return '🔗'
      case 'document': return '📝'
      case 'image': return '🖼️'
      case 'audio': return '🎵'
      case 'archive': return '📦'
      default: return '📁'
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'lecture': return 'bg-blue-100 text-blue-800'
      case 'assignment': return 'bg-orange-100 text-orange-800'
      case 'lab': return 'bg-green-100 text-green-800'
      case 'exam': return 'bg-red-100 text-red-800'
      case 'reading': return 'bg-purple-100 text-purple-800'
      case 'reference': return 'bg-gray-100 text-gray-800'
      case 'supplemental': return 'bg-yellow-100 text-yellow-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const handleResourceAction = (resource: CourseResource, action: 'view' | 'download') => {
    if (action === 'download' && resource.permissions.canDownload) {
      // In real app, trigger download
      console.log(`Downloading: ${resource.name}`)
      // Update download count
      setResources(resources.map(r => 
        r.id === resource.id ? { ...r, downloadCount: r.downloadCount + 1 } : r
      ))
    } else if (action === 'view') {
      if (resource.url) {
        window.open(resource.url, '_blank')
      } else {
        setSelectedResource(resource)
      }
    }
  }

  const getUniqueWeeks = () => {
    const weeks = resources
      .map(r => r.weekNumber)
      .filter((week): week is number => week !== undefined)
      .filter((week, index, arr) => arr.indexOf(week) === index)
      .sort((a, b) => a - b)
    return weeks
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
            <span className="text-gray-900">Resources</span>
          </nav>
        </div>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{course.code} - Course Resources</h1>
          <p className="text-gray-600">{course.name} • {course.semester}</p>
        </div>

        {/* Resource Stats */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="text-2xl font-bold text-blue-600">{resources.length}</div>
            <div className="text-sm text-gray-600">Total Resources</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="text-2xl font-bold text-green-600">
              {resources.filter(r => r.isRequired).length}
            </div>
            <div className="text-sm text-gray-600">Required</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="text-2xl font-bold text-purple-600">
              {resources.filter(r => r.category === 'lecture').length}
            </div>
            <div className="text-sm text-gray-600">Lecture Materials</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="text-2xl font-bold text-orange-600">
              {resources.filter(r => r.category === 'assignment').length}
            </div>
            <div className="text-sm text-gray-600">Assignments</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="text-2xl font-bold text-cyan-600">
              {resources.reduce((sum, r) => sum + r.downloadCount, 0)}
            </div>
            <div className="text-sm text-gray-600">Total Downloads</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="text-2xl font-bold text-red-600">
              {Math.round(resources.reduce((sum, r) => sum + (parseFloat(r.size || '0')), 0))}
            </div>
            <div className="text-sm text-gray-600">Total MB</div>
          </div>
        </div>

        {/* Filters and Controls */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="flex flex-col sm:flex-row gap-4 flex-1">
              <input
                type="text"
                placeholder="Search resources, descriptions, tags..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 flex-1"
              />
              
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="All">All Categories</option>
                <option value="Lecture">Lectures</option>
                <option value="Assignment">Assignments</option>
                <option value="Lab">Labs</option>
                <option value="Exam">Exams</option>
                <option value="Reading">Readings</option>
                <option value="Reference">Reference</option>
                <option value="Supplemental">Supplemental</option>
              </select>

              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="All">All Types</option>
                <option value="Pdf">PDFs</option>
                <option value="Video">Videos</option>
                <option value="Document">Documents</option>
                <option value="Link">Links</option>
                <option value="Archive">Archives</option>
                <option value="Image">Images</option>
                <option value="Audio">Audio</option>
              </select>

              <select
                value={weekFilter}
                onChange={(e) => setWeekFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="All">All Weeks</option>
                {getUniqueWeeks().map(week => (
                  <option key={week} value={week.toString()}>Week {week}</option>
                ))}
              </select>

              <select
                value={requiredFilter}
                onChange={(e) => setRequiredFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="All">All Resources</option>
                <option value="Required">Required Only</option>
                <option value="Optional">Optional Only</option>
              </select>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="Upload Date">Upload Date</option>
                <option value="Name A-Z">Name A-Z</option>
                <option value="Name Z-A">Name Z-A</option>
                <option value="Downloads">Downloads</option>
                <option value="Size">Size</option>
                <option value="Week">Week</option>
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

        {/* Quick Actions for Lecturers */}
        {course.userRole === 'lecturer' && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <button className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow group">
              <div className="text-center">
                <div className="text-2xl mb-2 group-hover:scale-110 transition-transform">📤</div>
                <div className="font-medium text-gray-900">Upload Resource</div>
                <div className="text-sm text-gray-600">Add new materials</div>
              </div>
            </button>
            
            <button className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow group">
              <div className="text-center">
                <div className="text-2xl mb-2 group-hover:scale-110 transition-transform">📊</div>
                <div className="font-medium text-gray-900">Usage Analytics</div>
                <div className="text-sm text-gray-600">Download statistics</div>
              </div>
            </button>
            
            <button className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow group">
              <div className="text-center">
                <div className="text-2xl mb-2 group-hover:scale-110 transition-transform">🗂️</div>
                <div className="font-medium text-gray-900">Manage Categories</div>
                <div className="text-sm text-gray-600">Organize resources</div>
              </div>
            </button>
            
            <button className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow group">
              <div className="text-center">
                <div className="text-2xl mb-2 group-hover:scale-110 transition-transform">📋</div>
                <div className="font-medium text-gray-900">Bulk Actions</div>
                <div className="text-sm text-gray-600">Mass operations</div>
              </div>
            </button>
          </div>
        )}

        {/* Results Info */}
        <div className="mb-4">
          <p className="text-gray-600">
            Showing {filteredResources.length} of {resources.length} resources
          </p>
        </div>

        {/* Resources Display */}
        {filteredResources.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <div className="text-4xl mb-4">📚</div>
            <div className="text-gray-500 mb-4">No resources found</div>
            <div className="text-sm text-gray-400">Try adjusting your search criteria</div>
          </div>
        ) : (
          <div className={viewMode === 'grid' 
            ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' 
            : 'space-y-4'
          }>
            {filteredResources.map((resource) => (
              <div key={resource.id} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
                {viewMode === 'grid' ? (
                  /* Grid View */
                  <div className="p-6">
                    <div className="text-center mb-4">
                      <span className="text-4xl mb-3 block">{getResourceIcon(resource.type)}</span>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{resource.name}</h3>
                      {resource.description && (
                        <p className="text-sm text-gray-600 mb-3">{resource.description}</p>
                      )}
                      <div className="flex items-center justify-center gap-2 mb-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(resource.category)}`}>
                          {resource.category}
                        </span>
                        {resource.isRequired && (
                          <span className="px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                            Required
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="space-y-3 text-sm">
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <div className="font-medium text-gray-700">Week:</div>
                          <div className="text-gray-600">{resource.weekNumber || 'N/A'}</div>
                        </div>
                        <div>
                          <div className="font-medium text-gray-700">Downloads:</div>
                          <div className="text-gray-600">{resource.downloadCount}</div>
                        </div>
                      </div>
                      
                      {resource.size && (
                        <div>
                          <div className="font-medium text-gray-700">Size:</div>
                          <div className="text-gray-600">{resource.size}</div>
                        </div>
                      )}

                      <div>
                        <div className="font-medium text-gray-700">Uploaded:</div>
                        <div className="text-gray-600">{new Date(resource.uploadDate).toLocaleDateString()}</div>
                      </div>

                      <div>
                        <div className="font-medium text-gray-700">Tags:</div>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {resource.tags.slice(0, 3).map(tag => (
                            <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 pt-4 border-t space-y-2">
                      <button
                        onClick={() => handleResourceAction(resource, 'view')}
                        className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                        disabled={!resource.permissions.canView}
                      >
                        👁️ View
                      </button>
                      {resource.permissions.canDownload && (
                        <button
                          onClick={() => handleResourceAction(resource, 'download')}
                          className="w-full bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                        >
                          ⬇️ Download
                        </button>
                      )}
                    </div>
                  </div>
                ) : (
                  /* List View */
                  <div className="p-6">
                    <div className="flex items-start gap-4">
                      <span className="text-3xl">{getResourceIcon(resource.type)}</span>
                      
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900">{resource.name}</h3>
                            {resource.description && (
                              <p className="text-sm text-gray-600 mt-1">{resource.description}</p>
                            )}
                          </div>
                          <div className="flex gap-2 ml-4">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(resource.category)}`}>
                              {resource.category}
                            </span>
                            {resource.isRequired && (
                              <span className="px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                                Required
                              </span>
                            )}
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-6 gap-4 text-sm mb-3">
                          <div>
                            <span className="font-medium text-gray-700">Week:</span><br />
                            <span className="text-gray-600">{resource.weekNumber || 'N/A'}</span>
                          </div>
                          <div>
                            <span className="font-medium text-gray-700">Size:</span><br />
                            <span className="text-gray-600">{resource.size || 'N/A'}</span>
                          </div>
                          <div>
                            <span className="font-medium text-gray-700">Downloads:</span><br />
                            <span className="text-gray-600">{resource.downloadCount}</span>
                          </div>
                          <div>
                            <span className="font-medium text-gray-700">Uploaded:</span><br />
                            <span className="text-gray-600">{new Date(resource.uploadDate).toLocaleDateString()}</span>
                          </div>
                          <div>
                            <span className="font-medium text-gray-700">Version:</span><br />
                            <span className="text-gray-600">{resource.version}</span>
                          </div>
                          <div>
                            <span className="font-medium text-gray-700">Uploader:</span><br />
                            <span className="text-gray-600">{resource.uploader.name}</span>
                          </div>
                        </div>

                        {resource.dueDate && (
                          <div className="p-2 bg-orange-50 rounded text-sm mb-3">
                            <span className="font-medium text-orange-800">Due Date: </span>
                            <span className="text-orange-700">{new Date(resource.dueDate).toLocaleDateString()}</span>
                          </div>
                        )}

                        <div className="flex flex-wrap gap-1">
                          {resource.tags.map(tag => (
                            <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <div className="flex flex-col gap-2">
                        <button
                          onClick={() => handleResourceAction(resource, 'view')}
                          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm"
                          disabled={!resource.permissions.canView}
                        >
                          👁️ View
                        </button>
                        {resource.permissions.canDownload && (
                          <button
                            onClick={() => handleResourceAction(resource, 'download')}
                            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors text-sm"
                          >
                            ⬇️ Download
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Resource Preview Modal */}
        {selectedResource && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-2xl font-bold">{selectedResource.name}</h2>
                <button
                  onClick={() => setSelectedResource(null)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <div className="text-center p-8 bg-gray-50 rounded-lg">
                    <span className="text-6xl mb-4 block">{getResourceIcon(selectedResource.type)}</span>
                    <p className="text-gray-600">Resource preview not available</p>
                    <p className="text-sm text-gray-500 mt-2">Click download to access the full resource</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Resource Details</h3>
                    <div className="space-y-2 text-sm">
                      <div>
                        <span className="font-medium text-gray-700">Type:</span>
                        <span className="ml-2 text-gray-600">{selectedResource.type.toUpperCase()}</span>
                      </div>
                      <div>
                        <span className="font-medium text-gray-700">Category:</span>
                        <span className="ml-2 text-gray-600">{selectedResource.category}</span>
                      </div>
                      {selectedResource.size && (
                        <div>
                          <span className="font-medium text-gray-700">Size:</span>
                          <span className="ml-2 text-gray-600">{selectedResource.size}</span>
                        </div>
                      )}
                      <div>
                        <span className="font-medium text-gray-700">Version:</span>
                        <span className="ml-2 text-gray-600">{selectedResource.version}</span>
                      </div>
                      <div>
                        <span className="font-medium text-gray-700">Downloads:</span>
                        <span className="ml-2 text-gray-600">{selectedResource.downloadCount}</span>
                      </div>
                    </div>
                  </div>

                  {selectedResource.description && (
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">Description</h3>
                      <p className="text-sm text-gray-600">{selectedResource.description}</p>
                    </div>
                  )}

                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Tags</h3>
                    <div className="flex flex-wrap gap-1">
                      {selectedResource.tags.map(tag => (
                        <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    {selectedResource.permissions.canDownload && (
                      <button
                        onClick={() => handleResourceAction(selectedResource, 'download')}
                        className="w-full bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
                      >
                        ⬇️ Download Resource
                      </button>
                    )}
                    {selectedResource.url && (
                      <button
                        onClick={() => window.open(selectedResource.url, '_blank')}
                        className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                      >
                        🔗 Open Link
                      </button>
                    )}
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