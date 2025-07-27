// app/messages/search/page.tsx
'use client'

import { useState } from 'react'
import Link from 'next/link'

interface SearchResult {
  id: string
  type: 'message' | 'conversation' | 'attachment'
  conversationId: string
  sender: string
  senderAvatar: string
  recipient: string
  subject: string
  content: string
  messageType: 'academic' | 'administrative' | 'general'
  priority: 'low' | 'medium' | 'high'
  date: string
  course?: string
  matchType: 'subject' | 'content' | 'sender' | 'attachment'
  snippet: string
  attachments?: {
    name: string
    type: string
    url: string
  }[]
  read: boolean
}

interface SavedSearch {
  id: string
  name: string
  query: string
  filters: {
    sender?: string
    course?: string
    dateRange?: { start: string; end: string }
    messageType?: string
    priority?: string
  }
  createdAt: string
  lastUsed: string
  resultCount: number
}

const mockSearchResults: SearchResult[] = [
  {
    id: '1',
    type: 'message',
    conversationId: 'conv_1',
    sender: 'Dr. Sarah Johnson',
    senderAvatar: '👩‍🏫',
    recipient: 'You',
    subject: 'Assignment 3 Feedback Available',
    content: 'Hi! I have reviewed your assignment and the algorithm implementation is excellent. Great work on optimizing the sorting function...',
    messageType: 'academic',
    priority: 'medium',
    date: '2025-07-26 14:30',
    course: 'CS101',
    matchType: 'content',
    snippet: '...algorithm implementation is excellent. Great work on optimizing the sorting function...',
    read: true
  },
  {
    id: '2',
    type: 'message',
    conversationId: 'conv_2',
    sender: 'Prof. Michael Chen',
    senderAvatar: '👨‍🏫',
    recipient: 'You',
    subject: 'Office Hours Reschedule Request',
    content: 'I need to reschedule our Thursday meeting to Friday at 2 PM due to a conference call. Please let me know if this works for you.',
    messageType: 'administrative',
    priority: 'high',
    date: '2025-07-26 11:15',
    course: 'MATH202',
    matchType: 'subject',
    snippet: '...reschedule our Thursday meeting to Friday at 2 PM...',
    read: false
  },
  {
    id: '3',
    type: 'attachment',
    conversationId: 'conv_3',
    sender: 'Dr. Sarah Johnson',
    senderAvatar: '👩‍🏫',
    recipient: 'You',
    subject: 'Lab Materials and Guidelines',
    content: 'Please find attached the lab materials for this week along with the updated guidelines.',
    messageType: 'academic',
    priority: 'low',
    date: '2025-07-25 16:45',
    course: 'CS101',
    matchType: 'attachment',
    snippet: '...attached the lab materials for this week...',
    attachments: [
      { name: 'lab_week5_materials.pdf', type: 'pdf', url: '#' },
      { name: 'guidelines_updated.docx', type: 'docx', url: '#' }
    ],
    read: true
  },
  {
    id: '4',
    type: 'conversation',
    conversationId: 'conv_4',
    sender: 'Dr. Emily Roberts',
    senderAvatar: '👩‍💼',
    recipient: 'You',
    subject: 'Essay Draft Discussion Thread',
    content: 'Multiple messages about essay improvements and writing techniques. Latest: Your introduction paragraph shows significant improvement...',
    messageType: 'academic',
    priority: 'medium',
    date: '2025-07-25 09:20',
    course: 'ENG110',
    matchType: 'content',
    snippet: '...introduction paragraph shows significant improvement in structure and clarity...',
    read: true
  }
]

const mockSavedSearches: SavedSearch[] = [
  {
    id: '1',
    name: 'CS101 Assignment Feedback',
    query: 'assignment feedback',
    filters: { course: 'CS101', messageType: 'academic' },
    createdAt: '2025-07-20',
    lastUsed: '2025-07-26',
    resultCount: 8
  },
  {
    id: '2',
    name: 'High Priority Messages',
    query: '',
    filters: { priority: 'high' },
    createdAt: '2025-07-18',
    lastUsed: '2025-07-25',
    resultCount: 12
  },
  {
    id: '3',
    name: 'This Week Messages',
    query: '',
    filters: { dateRange: { start: '2025-07-21', end: '2025-07-27' } },
    createdAt: '2025-07-21',
    lastUsed: '2025-07-27',
    resultCount: 23
  }
]

const senders = ['All', 'Dr. Sarah Johnson', 'Prof. Michael Chen', 'Dr. Emily Roberts']
const courses = ['All', 'CS101', 'CS201', 'MATH202', 'ENG110']
const messageTypes = ['All', 'Academic', 'Administrative', 'General']
const priorities = ['All', 'High', 'Medium', 'Low']
const sortOptions = ['Relevance', 'Date (Newest)', 'Date (Oldest)', 'Sender A-Z']

export default function MessageSearchPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [searchResults, setSearchResults] = useState<SearchResult[]>([])
  const [savedSearches, setSavedSearches] = useState<SavedSearch[]>(mockSavedSearches)
  const [isSearching, setIsSearching] = useState(false)
  const [hasSearched, setHasSearched] = useState(false)
  
  // Filters
  const [senderFilter, setSenderFilter] = useState('All')
  const [courseFilter, setCourseFilter] = useState('All')
  const [messageTypeFilter, setMessageTypeFilter] = useState('All')
  const [priorityFilter, setPriorityFilter] = useState('All')
  const [dateRange, setDateRange] = useState({ start: '', end: '' })
  const [sortBy, setSortBy] = useState('Relevance')
  const [showAttachmentsOnly, setShowAttachmentsOnly] = useState(false)
  const [showUnreadOnly, setShowUnreadOnly] = useState(false)

  // Advanced search
  const [showAdvancedSearch, setShowAdvancedSearch] = useState(false)
  const [exactPhrase, setExactPhrase] = useState('')
  const [excludeWords, setExcludeWords] = useState('')
  const [fromSender, setFromSender] = useState('')

  // Save search modal
  const [showSaveSearchModal, setShowSaveSearchModal] = useState(false)
  const [saveSearchName, setSaveSearchName] = useState('')

  const handleSearch = () => {
    if (!searchTerm.trim() && !hasActiveFilters()) return
    
    setIsSearching(true)
    setHasSearched(true)

    // Simulate API call
    setTimeout(() => {
      let results = [...mockSearchResults]
      
      // Apply search term
      if (searchTerm.trim()) {
        results = results.filter(result =>
          result.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
          result.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
          result.sender.toLowerCase().includes(searchTerm.toLowerCase()) ||
          result.attachments?.some(att => att.name.toLowerCase().includes(searchTerm.toLowerCase()))
        )
      }
      
      // Apply filters
      if (senderFilter !== 'All') {
        results = results.filter(r => r.sender === senderFilter)
      }
      if (courseFilter !== 'All') {
        results = results.filter(r => r.course === courseFilter)
      }
      if (messageTypeFilter !== 'All') {
        results = results.filter(r => r.messageType === messageTypeFilter.toLowerCase())
      }
      if (priorityFilter !== 'All') {
        results = results.filter(r => r.priority === priorityFilter.toLowerCase())
      }
      if (showAttachmentsOnly) {
        results = results.filter(r => r.attachments && r.attachments.length > 0)
      }
      if (showUnreadOnly) {
        results = results.filter(r => !r.read)
      }
      if (dateRange.start) {
        results = results.filter(r => new Date(r.date) >= new Date(dateRange.start))
      }
      if (dateRange.end) {
        results = results.filter(r => new Date(r.date) <= new Date(dateRange.end))
      }

      // Sort results
      results.sort((a, b) => {
        switch (sortBy) {
          case 'Date (Newest)': return new Date(b.date).getTime() - new Date(a.date).getTime()
          case 'Date (Oldest)': return new Date(a.date).getTime() - new Date(b.date).getTime()
          case 'Sender A-Z': return a.sender.localeCompare(b.sender)
          default: return 0 // Relevance - would be calculated by backend
        }
      })
      
      setSearchResults(results)
      setIsSearching(false)
    }, 1000)
  }

  const hasActiveFilters = () => {
    return senderFilter !== 'All' || courseFilter !== 'All' || messageTypeFilter !== 'All' || 
           priorityFilter !== 'All' || showAttachmentsOnly || showUnreadOnly || 
           dateRange.start || dateRange.end
  }

  const clearAllFilters = () => {
    setSenderFilter('All')
    setCourseFilter('All')
    setMessageTypeFilter('All')
    setPriorityFilter('All')
    setDateRange({ start: '', end: '' })
    setShowAttachmentsOnly(false)
    setShowUnreadOnly(false)
    setExactPhrase('')
    setExcludeWords('')
    setFromSender('')
  }

  const handleSaveSearch = () => {
    if (!saveSearchName.trim()) return
    
    const newSavedSearch: SavedSearch = {
      id: Date.now().toString(),
      name: saveSearchName,
      query: searchTerm,
      filters: {
        sender: senderFilter !== 'All' ? senderFilter : undefined,
        course: courseFilter !== 'All' ? courseFilter : undefined,
        messageType: messageTypeFilter !== 'All' ? messageTypeFilter : undefined,
        priority: priorityFilter !== 'All' ? priorityFilter : undefined,
        dateRange: dateRange.start || dateRange.end ? dateRange : undefined
      },
      createdAt: new Date().toISOString().split('T')[0],
      lastUsed: new Date().toISOString().split('T')[0],
      resultCount: searchResults.length
    }
    
    setSavedSearches([newSavedSearch, ...savedSearches])
    setSaveSearchName('')
    setShowSaveSearchModal(false)
  }

  const loadSavedSearch = (saved: SavedSearch) => {
    setSearchTerm(saved.query)
    setSenderFilter(saved.filters.sender || 'All')
    setCourseFilter(saved.filters.course || 'All')
    setMessageTypeFilter(saved.filters.messageType || 'All')
    setPriorityFilter(saved.filters.priority || 'All')
    setDateRange(saved.filters.dateRange || { start: '', end: '' })
    
    // Update last used
    setSavedSearches(savedSearches.map(s => 
      s.id === saved.id 
        ? { ...s, lastUsed: new Date().toISOString().split('T')[0] }
        : s
    ))
    
    handleSearch()
  }

  const getMatchTypeIcon = (type: string) => {
    switch (type) {
      case 'subject': return '📝'
      case 'content': return '💬'
      case 'sender': return '👤'
      case 'attachment': return '📎'
      default: return '🔍'
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'academic': return 'bg-blue-100 text-blue-800'
      case 'administrative': return 'bg-purple-100 text-purple-800'
      case 'general': return 'bg-green-100 text-green-800'
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
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Search Messages</h1>
          <p className="text-gray-600">Find messages, conversations, and attachments across all your communications</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="text-2xl font-bold text-blue-600">{mockSearchResults.length}</div>
            <div className="text-sm text-gray-600">Total Messages</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="text-2xl font-bold text-green-600">{savedSearches.length}</div>
            <div className="text-sm text-gray-600">Saved Searches</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="text-2xl font-bold text-purple-600">
              {mockSearchResults.filter(r => r.attachments && r.attachments.length > 0).length}
            </div>
            <div className="text-sm text-gray-600">With Attachments</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="text-2xl font-bold text-orange-600">
              {hasSearched ? searchResults.length : 0}
            </div>
            <div className="text-sm text-gray-600">Search Results</div>
          </div>
        </div>

        {/* Main Search */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="space-y-4">
            {/* Primary Search Bar */}
            <div className="flex gap-4">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-lg"
                placeholder="Search messages, subjects, content, or attachments..."
              />
              <button
                onClick={handleSearch}
                disabled={isSearching}
                className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50 font-medium"
              >
                {isSearching ? 'Searching...' : '🔍 Search'}
              </button>
            </div>

            {/* Advanced Search Toggle */}
            <div className="flex justify-between items-center">
              <button
                onClick={() => setShowAdvancedSearch(!showAdvancedSearch)}
                className="text-blue-600 hover:text-blue-800 text-sm"
              >
                {showAdvancedSearch ? '▼' : '▶'} Advanced Search Options
              </button>
              
              {hasActiveFilters() && (
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">Active filters</span>
                  <button
                    onClick={clearAllFilters}
                    className="text-sm text-red-600 hover:text-red-800"
                  >
                    Clear All
                  </button>
                </div>
              )}
            </div>

            {/* Advanced Search Options */}
            {showAdvancedSearch && (
              <div className="border-t pt-4 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Exact Phrase</label>
                    <input
                      type="text"
                      value={exactPhrase}
                      onChange={(e) => setExactPhrase(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="Exact phrase to find"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Exclude Words</label>
                    <input
                      type="text"
                      value={excludeWords}
                      onChange={(e) => setExcludeWords(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="Words to exclude"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">From Sender</label>
                    <input
                      type="text"
                      value={fromSender}
                      onChange={(e) => setFromSender(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="Sender name or email"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-6 gap-4 mb-4">
            <select
              value={senderFilter}
              onChange={(e) => setSenderFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              {senders.map(sender => (
                <option key={sender} value={sender}>👤 {sender}</option>
              ))}
            </select>

            <select
              value={courseFilter}
              onChange={(e) => setCourseFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              {courses.map(course => (
                <option key={course} value={course}>📚 {course}</option>
              ))}
            </select>

            <select
              value={messageTypeFilter}
              onChange={(e) => setMessageTypeFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              {messageTypes.map(type => (
                <option key={type} value={type}>📝 {type}</option>
              ))}
            </select>

            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              {priorities.map(priority => (
                <option key={priority} value={priority}>⚡ {priority}</option>
              ))}
            </select>

            <input
              type="date"
              value={dateRange.start}
              onChange={(e) => setDateRange({...dateRange, start: e.target.value})}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="From date"
            />

            <input
              type="date"
              value={dateRange.end}
              onChange={(e) => setDateRange({...dateRange, end: e.target.value})}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="To date"
            />
          </div>

          <div className="flex flex-wrap gap-4 items-center">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={showAttachmentsOnly}
                onChange={(e) => setShowAttachmentsOnly(e.target.checked)}
                className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <span className="text-sm text-gray-700">📎 With attachments only</span>
            </label>

            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={showUnreadOnly}
                onChange={(e) => setShowUnreadOnly(e.target.checked)}
                className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <span className="text-sm text-gray-700">✉️ Unread only</span>
            </label>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              {sortOptions.map(option => (
                <option key={option} value={option}>🔽 {option}</option>
              ))}
            </select>

            {hasSearched && (
              <button
                onClick={() => setShowSaveSearchModal(true)}
                className="bg-green-50 text-green-600 px-4 py-2 rounded-lg hover:bg-green-100 transition-colors text-sm"
              >
                💾 Save Search
              </button>
            )}
          </div>
        </div>

        {/* Saved Searches */}
        {savedSearches.length > 0 && (
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Saved Searches</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {savedSearches.map(saved => (
                <div
                  key={saved.id}
                  onClick={() => loadSavedSearch(saved)}
                  className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 cursor-pointer transition-colors"
                >
                  <div className="font-medium text-gray-900 mb-1">{saved.name}</div>
                  <div className="text-sm text-gray-600 mb-2">
                    {saved.query && `"${saved.query}"`}
                    {Object.keys(saved.filters).length > 0 && (
                      <span className="text-blue-600"> • {Object.keys(saved.filters).length} filters</span>
                    )}
                  </div>
                  <div className="text-xs text-gray-500">
                    {saved.resultCount} results • Last used {saved.lastUsed}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Search Results */}
        {hasSearched && (
          <div className="bg-white rounded-lg shadow-sm">
            <div className="p-6 border-b">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-900">
                  Search Results ({searchResults.length})
                </h3>
                {searchResults.length > 0 && (
                  <Link
                    href="/messages/new"
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm"
                  >
                    ✉️ Compose New
                  </Link>
                )}
              </div>
            </div>

            <div className="divide-y divide-gray-200">
              {searchResults.length === 0 ? (
                <div className="p-8 text-center">
                  <div className="text-4xl mb-4">🔍</div>
                  <div className="text-gray-500 mb-2">No messages found</div>
                  <div className="text-sm text-gray-400">Try adjusting your search terms or filters</div>
                </div>
              ) : (
                searchResults.map(result => (
                  <div key={result.id} className="p-6 hover:bg-gray-50 transition-colors">
                    <div className="flex items-start gap-4">
                      <span className="text-2xl">{result.senderAvatar}</span>
                      
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-lg">{getMatchTypeIcon(result.matchType)}</span>
                          {!result.read && <span className="w-2 h-2 bg-blue-500 rounded-full"></span>}
                          <Link
                            href={`/student/conversations/${result.conversationId}`}
                            className="font-semibold text-gray-900 hover:text-blue-600"
                          >
                            {result.subject}
                          </Link>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(result.messageType)}`}>
                            {result.messageType.charAt(0).toUpperCase() + result.messageType.slice(1)}
                          </span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(result.priority)}`}>
                            {result.priority.charAt(0).toUpperCase() + result.priority.slice(1)}
                          </span>
                        </div>
                        
                        <div className="text-sm text-gray-600 mb-2">
                          <span className="font-medium">{result.sender}</span>
                          {result.course && <span> • {result.course}</span>}
                          <span> • {new Date(result.date).toLocaleDateString()}</span>
                          <span> • Match in {result.matchType}</span>
                        </div>
                        
                        <p className="text-sm text-gray-700 mb-3">{result.snippet}</p>
                        
                        {result.attachments && result.attachments.length > 0 && (
                          <div className="flex flex-wrap gap-2 mb-2">
                            {result.attachments.map((attachment, idx) => (
                              <span key={idx} className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                                📎 {attachment.name}
                              </span>
                            ))}
                          </div>
                        )}
                        
                        <div className="flex gap-3 text-sm">
                          <Link
                            href={`/student/conversations/${result.conversationId}`}
                            className="text-blue-600 hover:text-blue-800"
                          >
                            💬 View Conversation
                          </Link>
                          <button className="text-gray-600 hover:text-gray-800">
                            🔖 Save
                          </button>
                          <button className="text-gray-600 hover:text-gray-800">
                            ↗️ Share
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* Save Search Modal */}
        {showSaveSearchModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
              <h2 className="text-xl font-bold mb-4">Save Search</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Search Name</label>
                  <input
                    type="text"
                    value={saveSearchName}
                    onChange={(e) => setSaveSearchName(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter a name for this search"
                    autoFocus
                  />
                </div>

                <div className="text-sm text-gray-600">
                  <div><strong>Query:</strong> {searchTerm || 'None'}</div>
                  <div><strong>Filters:</strong> {hasActiveFilters() ? 'Active' : 'None'}</div>
                  <div><strong>Results:</strong> {searchResults.length}</div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={handleSaveSearch}
                    disabled={!saveSearchName.trim()}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
                  >
                    💾 Save
                  </button>
                  <button
                    onClick={() => setShowSaveSearchModal(false)}
                    className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Quick Links */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-4">
          <Link href="/messages/new" className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow text-center">
            <div className="text-2xl mb-2">✉️</div>
            <div className="font-medium text-gray-900">Compose Message</div>
            <div className="text-sm text-gray-600">Start new conversation</div>
          </Link>
          
          <Link href="/messages/drafts" className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow text-center">
            <div className="text-2xl mb-2">📄</div>
            <div className="font-medium text-gray-900">Draft Messages</div>
            <div className="text-sm text-gray-600">Continue writing</div>
          </Link>
          
          <Link href="/student/messages" className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow text-center">
            <div className="text-2xl mb-2">📬</div>
            <div className="font-medium text-gray-900">All Messages</div>
            <div className="text-sm text-gray-600">View inbox</div>
          </Link>
          
          <Link href="/contacts" className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow text-center">
            <div className="text-2xl mb-2">📇</div>
            <div className="font-medium text-gray-900">Contacts</div>
            <div className="text-sm text-gray-600">Directory & favorites</div>
          </Link>
        </div>
      </div>
    </div>
  )
}