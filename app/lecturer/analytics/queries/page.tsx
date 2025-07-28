// app/lecturer/analytics/queries/page.tsx
'use client'

import { useState } from 'react'
import Link from 'next/link'

interface QueryAnalytics {
  overview: {
    totalQueries: number
    resolvedQueries: number
    avgResolutionTime: number // in hours
    resolutionRate: number // percentage
    studentSatisfaction: number // out of 5
    peakHours: string[]
  }
  byCategory: {
    category: string
    count: number
    percentage: number
    avgResolutionTime: number
    satisfactionScore: number
    trend: 'up' | 'down' | 'stable'
  }[]
  byPriority: {
    priority: 'high' | 'medium' | 'low'
    count: number
    percentage: number
    avgResolutionTime: number
    escalationRate: number
  }[]
  byCourse: {
    course: string
    queries: number
    resolutionRate: number
    avgResponseTime: number
    commonTopics: string[]
  }[]
  timeAnalysis: {
    daily: { date: string; submitted: number; resolved: number; responseTime: number }[]
    hourly: { hour: number; count: number; avgResponseTime: number }[]
    monthly: { month: string; queries: number; satisfaction: number }[]
  }
  topicTrends: {
    topic: string
    count: number
    growth: number // percentage change
    complexity: 'low' | 'medium' | 'high'
    avgResolutionTime: number
    studentSuccess: number // percentage who understood the answer
  }[]
  studentEngagement: {
    followUpRate: number // percentage of students who follow up
    clarificationRequests: number
    satisfactionByTopic: { topic: string; rating: number; responses: number }[]
    repeatedQuestions: { question: string; count: number; lastAsked: string }[]
  }
  improvement: {
    suggestions: {
      area: string
      currentScore: number
      targetScore: number
      impact: 'high' | 'medium' | 'low'
      recommendation: string
    }[]
    benchmarks: {
      metric: string
      yourScore: number
      departmentAvg: number
      topPerformer: number
    }[]
  }
}

const mockQueryAnalytics: QueryAnalytics = {
  overview: {
    totalQueries: 156,
    resolvedQueries: 143,
    avgResolutionTime: 4.2,
    resolutionRate: 91.7,
    studentSatisfaction: 4.6,
    peakHours: ['10-11 AM', '2-3 PM', '7-8 PM']
  },
  byCategory: [
    {
      category: 'Academic',
      count: 68,
      percentage: 44,
      avgResolutionTime: 3.8,
      satisfactionScore: 4.7,
      trend: 'up'
    },
    {
      category: 'Technical',
      count: 34,
      percentage: 22,
      avgResolutionTime: 6.4,
      satisfactionScore: 4.3,
      trend: 'down'
    },
    {
      category: 'Administrative',
      count: 28,
      percentage: 18,
      avgResolutionTime: 2.1,
      satisfactionScore: 4.8,
      trend: 'stable'
    },
    {
      category: 'Appointment',
      count: 16,
      percentage: 10,
      avgResolutionTime: 0.5,
      satisfactionScore: 4.9,
      trend: 'up'
    },
    {
      category: 'Course-related',
      count: 10,
      percentage: 6,
      avgResolutionTime: 5.2,
      satisfactionScore: 4.4,
      trend: 'stable'
    }
  ],
  byPriority: [
    {
      priority: 'high',
      count: 31,
      percentage: 20,
      avgResolutionTime: 2.1,
      escalationRate: 12.9
    },
    {
      priority: 'medium',
      count: 87,
      percentage: 56,
      avgResolutionTime: 4.8,
      escalationRate: 5.7
    },
    {
      priority: 'low',
      count: 38,
      percentage: 24,
      avgResolutionTime: 8.2,
      escalationRate: 2.6
    }
  ],
  byCourse: [
    {
      course: 'CS101',
      queries: 102,
      resolutionRate: 94.1,
      avgResponseTime: 3.8,
      commonTopics: ['Assignment Help', 'Grading Questions', 'Technical Issues']
    },
    {
      course: 'CS201',
      queries: 41,
      resolutionRate: 87.8,
      avgResponseTime: 5.2,
      commonTopics: ['Algorithm Complexity', 'Data Structure Implementation', 'Project Guidance']
    },
    {
      course: 'CS401',
      queries: 13,
      resolutionRate: 92.3,
      avgResponseTime: 4.1,
      commonTopics: ['Software Design', 'Testing Strategies', 'Documentation']
    }
  ],
  timeAnalysis: {
    daily: [
      { date: '2025-07-21', submitted: 12, resolved: 10, responseTime: 3.8 },
      { date: '2025-07-22', submitted: 8, resolved: 8, responseTime: 2.1 },
      { date: '2025-07-23', submitted: 15, resolved: 13, responseTime: 5.2 },
      { date: '2025-07-24', submitted: 10, resolved: 9, responseTime: 4.3 },
      { date: '2025-07-25', submitted: 14, resolved: 12, responseTime: 3.9 },
      { date: '2025-07-26', submitted: 18, resolved: 15, responseTime: 4.8 },
      { date: '2025-07-27', submitted: 9, resolved: 7, responseTime: 3.2 }
    ],
    hourly: [
      { hour: 8, count: 5, avgResponseTime: 2.1 },
      { hour: 9, count: 8, avgResponseTime: 3.4 },
      { hour: 10, count: 15, avgResponseTime: 4.2 },
      { hour: 11, count: 12, avgResponseTime: 3.8 },
      { hour: 12, count: 7, avgResponseTime: 5.1 },
      { hour: 13, count: 6, avgResponseTime: 4.8 },
      { hour: 14, count: 14, avgResponseTime: 4.1 },
      { hour: 15, count: 11, avgResponseTime: 3.9 },
      { hour: 16, count: 9, avgResponseTime: 4.6 },
      { hour: 17, count: 8, avgResponseTime: 5.2 },
      { hour: 18, count: 6, avgResponseTime: 6.1 },
      { hour: 19, count: 12, avgResponseTime: 4.3 },
      { hour: 20, count: 9, avgResponseTime: 5.8 },
      { hour: 21, count: 4, avgResponseTime: 7.2 }
    ],
    monthly: [
      { month: 'May 2025', queries: 134, satisfaction: 4.4 },
      { month: 'June 2025', queries: 142, satisfaction: 4.5 },
      { month: 'July 2025', queries: 156, satisfaction: 4.6 }
    ]
  },
  topicTrends: [
    {
      topic: 'Assignment Clarification',
      count: 23,
      growth: 15.2,
      complexity: 'medium',
      avgResolutionTime: 2.8,
      studentSuccess: 94.2
    },
    {
      topic: 'Technical Issues',
      count: 18,
      growth: -8.5,
      complexity: 'high',
      avgResolutionTime: 6.4,
      studentSuccess: 87.3
    },
    {
      topic: 'Grade Inquiry',
      count: 15,
      growth: 3.2,
      complexity: 'low',
      avgResolutionTime: 1.8,
      studentSuccess: 98.1
    },
    {
      topic: 'Office Hours',
      count: 12,
      growth: 25.8,
      complexity: 'low',
      avgResolutionTime: 0.5,
      studentSuccess: 99.2
    },
    {
      topic: 'Course Materials',
      count: 11,
      growth: -12.3,
      complexity: 'medium',
      avgResolutionTime: 3.2,
      studentSuccess: 91.8
    }
  ],
  studentEngagement: {
    followUpRate: 23.4,
    clarificationRequests: 28,
    satisfactionByTopic: [
      { topic: 'Assignment Help', rating: 4.8, responses: 45 },
      { topic: 'Technical Support', rating: 4.2, responses: 23 },
      { topic: 'Grade Questions', rating: 4.9, responses: 18 },
      { topic: 'Course Content', rating: 4.6, responses: 31 }
    ],
    repeatedQuestions: [
      { question: 'How to submit assignments late?', count: 8, lastAsked: '2025-07-26' },
      { question: 'Office hours location change?', count: 6, lastAsked: '2025-07-25' },
      { question: 'Midterm exam format?', count: 5, lastAsked: '2025-07-24' }
    ]
  },
  improvement: {
    suggestions: [
      {
        area: 'Technical Query Resolution',
        currentScore: 6.4,
        targetScore: 4.0,
        impact: 'high',
        recommendation: 'Create FAQ section for common technical issues and consider video tutorials'
      },
      {
        area: 'Evening Response Time',
        currentScore: 8.2,
        targetScore: 6.0,
        impact: 'medium',
        recommendation: 'Set up automated responses for common queries during off-hours'
      },
      {
        area: 'Student Follow-up Rate',
        currentScore: 23.4,
        targetScore: 15.0,
        impact: 'low',
        recommendation: 'Provide more comprehensive initial responses to reduce follow-up needs'
      }
    ],
    benchmarks: [
      { metric: 'Average Response Time', yourScore: 4.2, departmentAvg: 5.8, topPerformer: 3.1 },
      { metric: 'Resolution Rate', yourScore: 91.7, departmentAvg: 87.3, topPerformer: 95.2 },
      { metric: 'Student Satisfaction', yourScore: 4.6, departmentAvg: 4.2, topPerformer: 4.8 },
      { metric: 'Query Volume', yourScore: 156, departmentAvg: 189, topPerformer: 134 }
    ]
  }
}

export default function LecturerAnalyticsQueriesPage() {
  const [analytics] = useState<QueryAnalytics>(mockQueryAnalytics)
  const [timeRange, setTimeRange] = useState('Last 30 days')
  const [selectedCourse, setSelectedCourse] = useState('All Courses')
  const [activeSection, setActiveSection] = useState<'overview' | 'trends' | 'engagement' | 'improvement'>('overview')

  const getTrendIcon = (trend: 'up' | 'down' | 'stable') => {
    switch (trend) {
      case 'up': return '📈'
      case 'down': return '📉'
      case 'stable': return '➡️'
    }
  }

  const getTrendColor = (trend: 'up' | 'down' | 'stable') => {
    switch (trend) {
      case 'up': return 'text-green-600'
      case 'down': return 'text-red-600'
      case 'stable': return 'text-gray-600'
    }
  }

  const getComplexityColor = (complexity: 'low' | 'medium' | 'high') => {
    switch (complexity) {
      case 'low': return 'bg-green-100 text-green-800'
      case 'medium': return 'bg-yellow-100 text-yellow-800'
      case 'high': return 'bg-red-100 text-red-800'
    }
  }

  const getPerformanceColor = (score: number, target: number) => {
    const percentage = (score / target) * 100
    if (percentage <= 110) return 'text-green-600'
    if (percentage <= 150) return 'text-orange-600'
    return 'text-red-600'
  }

  const getBenchmarkColor = (your: number, dept: number, top: number) => {
    if (your >= top * 0.95) return 'text-green-600'
    if (your >= dept) return 'text-blue-600'
    return 'text-orange-600'
  }

  const formatTime = (hours: number) => {
    if (hours < 1) return `${Math.round(hours * 60)}m`
    return `${hours.toFixed(1)}h`
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumb */}
        <div className="mb-6">
          <nav className="text-sm text-gray-500">
            <Link href="/lecturer/analytics" className="hover:text-blue-600">Analytics</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-900">Query Analytics</span>
          </nav>
        </div>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Query Analytics Deep Dive</h1>
          <p className="text-gray-600">Detailed analysis of student queries and your response patterns</p>
        </div>

        {/* Controls */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="Last 7 days">Last 7 days</option>
                <option value="Last 30 days">Last 30 days</option>
                <option value="Last 3 months">Last 3 months</option>
                <option value="This semester">This semester</option>
              </select>

              <select
                value={selectedCourse}
                onChange={(e) => setSelectedCourse(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="All Courses">All Courses</option>
                <option value="CS101">CS101</option>
                <option value="CS201">CS201</option>
                <option value="CS401">CS401</option>
              </select>
            </div>

            <div className="flex gap-2">
              <Link
                href="/lecturer/analytics"
                className="bg-gray-50 text-gray-600 px-4 py-2 rounded-lg hover:bg-gray-100"
              >
                ← Back to Analytics
              </Link>
              <button className="bg-blue-50 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-100">
                📊 Export Report
              </button>
            </div>
          </div>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="text-2xl font-bold text-blue-600">{analytics.overview.totalQueries}</div>
            <div className="text-sm text-gray-600">Total Queries</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="text-2xl font-bold text-green-600">{analytics.overview.resolutionRate.toFixed(1)}%</div>
            <div className="text-sm text-gray-600">Resolution Rate</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="text-2xl font-bold text-purple-600">{formatTime(analytics.overview.avgResolutionTime)}</div>
            <div className="text-sm text-gray-600">Avg Resolution Time</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="text-2xl font-bold text-orange-600">{analytics.overview.studentSatisfaction.toFixed(1)}/5</div>
            <div className="text-sm text-gray-600">Satisfaction Score</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="text-2xl font-bold text-red-600">{analytics.studentEngagement.followUpRate.toFixed(1)}%</div>
            <div className="text-sm text-gray-600">Follow-up Rate</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="text-2xl font-bold text-indigo-600">{analytics.overview.peakHours.length}</div>
            <div className="text-sm text-gray-600">Peak Hours</div>
          </div>
        </div>

        {/* Section Tabs */}
        <div className="bg-white rounded-lg shadow-sm mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {[
                { key: 'overview', label: 'Overview & Breakdown', icon: '📊' },
                { key: 'trends', label: 'Topic Trends', icon: '📈' },
                { key: 'engagement', label: 'Student Engagement', icon: '👥' },
                { key: 'improvement', label: 'Improvement Areas', icon: '🎯' }
              ].map(tab => (
                <button
                  key={tab.key}
                  onClick={() => setActiveSection(tab.key as 'overview' | 'trends' | 'engagement' | 'improvement')}
                  className={`py-4 px-2 text-sm font-medium border-b-2 flex items-center gap-2 ${
                    activeSection === tab.key
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <span>{tab.icon}</span>
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Section Content */}
        <div className="space-y-6">
          {/* Overview Section */}
          {activeSection === 'overview' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold mb-4">Queries by Category</h3>
                <div className="space-y-3">
                  {analytics.byCategory.map((category, idx) => (
                    <div key={idx} className="p-3 border rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium">{category.category}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium">{category.count}</span>
                          <span className={getTrendColor(category.trend)}>{getTrendIcon(category.trend)}</span>
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-2 text-xs">
                        <div>
                          <div className="text-gray-500">Avg Time</div>
                          <div className="font-medium">{formatTime(category.avgResolutionTime)}</div>
                        </div>
                        <div>
                          <div className="text-gray-500">Satisfaction</div>
                          <div className="font-medium">{category.satisfactionScore.toFixed(1)}/5</div>
                        </div>
                        <div>
                          <div className="text-gray-500">Share</div>
                          <div className="font-medium">{category.percentage}%</div>
                        </div>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full" 
                          style={{width: `${category.percentage}%`}}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold mb-4">Priority Analysis</h3>
                <div className="space-y-4">
                  {analytics.byPriority.map((priority, idx) => (
                    <div key={idx} className="p-4 border rounded-lg">
                      <div className="flex justify-between items-center mb-3">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                          priority.priority === 'high' ? 'bg-red-100 text-red-800' :
                          priority.priority === 'medium' ? 'bg-orange-100 text-orange-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                          {priority.priority.charAt(0).toUpperCase() + priority.priority.slice(1)} Priority
                        </span>
                        <span className="text-lg font-bold">{priority.count}</span>
                      </div>
                      <div className="grid grid-cols-3 gap-3 text-sm">
                        <div>
                          <div className="text-gray-500">Avg Resolution</div>
                          <div className="font-medium">{formatTime(priority.avgResolutionTime)}</div>
                        </div>
                        <div>
                          <div className="text-gray-500">Share</div>
                          <div className="font-medium">{priority.percentage}%</div>
                        </div>
                        <div>
                          <div className="text-gray-500">Escalation</div>
                          <div className="font-medium">{priority.escalationRate}%</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-2 bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold mb-4">Course Breakdown</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {analytics.byCourse.map((course, idx) => (
                    <div key={idx} className="p-4 border rounded-lg">
                      <h4 className="font-semibold text-lg mb-2">{course.course}</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Total Queries:</span>
                          <span className="font-medium">{course.queries}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Resolution Rate:</span>
                          <span className="font-medium">{course.resolutionRate}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Avg Response:</span>
                          <span className="font-medium">{formatTime(course.avgResponseTime)}</span>
                        </div>
                      </div>
                      <div className="mt-3">
                        <div className="text-xs text-gray-500 mb-1">Common Topics:</div>
                        <div className="flex flex-wrap gap-1">
                          {course.commonTopics.map((topic, topicIdx) => (
                            <span key={topicIdx} className="px-2 py-1 bg-blue-50 text-blue-700 rounded text-xs">
                              {topic}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Trends Section */}
          {activeSection === 'trends' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold mb-4">Topic Trends</h3>
                <div className="space-y-3">
                  {analytics.topicTrends.map((topic, idx) => (
                    <div key={idx} className="p-4 border rounded-lg">
                      <div className="flex justify-between items-start mb-2">
                        <span className="font-medium">{topic.topic}</span>
                        <div className="flex items-center gap-2">
                          <span className={`px-2 py-1 rounded text-xs font-medium ${getComplexityColor(topic.complexity)}`}>
                            {topic.complexity}
                          </span>
                          <span className={`text-sm font-medium ${topic.growth > 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {topic.growth > 0 ? '+' : ''}{topic.growth.toFixed(1)}%
                          </span>
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-2 text-xs">
                        <div>
                          <div className="text-gray-500">Count</div>
                          <div className="font-medium">{topic.count}</div>
                        </div>
                        <div>
                          <div className="text-gray-500">Resolution</div>
                          <div className="font-medium">{formatTime(topic.avgResolutionTime)}</div>
                        </div>
                        <div>
                          <div className="text-gray-500">Success Rate</div>
                          <div className="font-medium">{topic.studentSuccess.toFixed(1)}%</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold mb-4">Hourly Distribution</h3>
                <div className="space-y-2">
                  {analytics.timeAnalysis.hourly
                    .filter(hour => hour.count > 0)
                    .sort((a, b) => b.count - a.count)
                    .slice(0, 8)
                    .map((hour, idx) => (
                    <div key={idx} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                      <span className="text-sm font-medium">
                        {hour.hour}:00 - {hour.hour + 1}:00
                      </span>
                      <div className="flex items-center gap-3">
                        <span className="text-sm">{hour.count} queries</span>
                        <span className="text-xs text-gray-500">{formatTime(hour.avgResponseTime)}</span>
                        <div className="w-16 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full" 
                            style={{width: `${(hour.count / Math.max(...analytics.timeAnalysis.hourly.map(h => h.count))) * 100}%`}}
                          ></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-2 bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold mb-4">Daily Query Volume (Last 7 Days)</h3>
                <div className="space-y-3">
                  {analytics.timeAnalysis.daily.map((day, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 border rounded-lg">
                      <span className="font-medium">{new Date(day.date).toLocaleDateString()}</span>
                      <div className="flex items-center gap-6 text-sm">
                        <div className="text-blue-600">📥 {day.submitted} submitted</div>
                        <div className="text-green-600">✅ {day.resolved} resolved</div>
                        <div className="text-purple-600">⏱️ {formatTime(day.responseTime)}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Engagement Section */}
          {activeSection === 'engagement' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold mb-4">Student Satisfaction by Topic</h3>
                <div className="space-y-3">
                  {analytics.studentEngagement.satisfactionByTopic.map((item, idx) => (
                    <div key={idx} className="p-3 border rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium">{item.topic}</span>
                        <span className="text-lg font-bold text-green-600">{item.rating.toFixed(1)}/5</span>
                      </div>
                      <div className="flex justify-between text-sm text-gray-600">
                        <span>{item.responses} responses</span>
                        <div className="w-24 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-green-600 h-2 rounded-full" 
                            style={{width: `${(item.rating / 5) * 100}%`}}
                          ></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold mb-4">Frequently Repeated Questions</h3>
                <div className="space-y-3">
                  {analytics.studentEngagement.repeatedQuestions.map((item, idx) => (
                    <div key={idx} className="p-3 border rounded-lg">
                      <div className="font-medium text-gray-900 mb-1">{item.question}</div>
                      <div className="flex justify-between text-sm text-gray-600">
                        <span>Asked {item.count} times</span>
                        <span>Last: {new Date(item.lastAsked).toLocaleDateString()}</span>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-4 p-3 bg-yellow-50 rounded-lg">
                  <div className="text-sm font-medium text-yellow-800">💡 Suggestion</div>
                  <div className="text-sm text-yellow-700">Consider creating FAQ entries for these repeated questions to reduce query volume.</div>
                </div>
              </div>

              <div className="lg:col-span-2 bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold mb-4">Engagement Metrics</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-3xl font-bold text-blue-600">{analytics.studentEngagement.followUpRate.toFixed(1)}%</div>
                    <div className="text-sm text-blue-800">Follow-up Rate</div>
                    <div className="text-xs text-blue-600 mt-1">Students who ask follow-up questions</div>
                  </div>
                  <div className="text-center p-4 bg-orange-50 rounded-lg">
                    <div className="text-3xl font-bold text-orange-600">{analytics.studentEngagement.clarificationRequests}</div>
                    <div className="text-sm text-orange-800">Clarification Requests</div>
                    <div className="text-xs text-orange-600 mt-1">This month</div>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-3xl font-bold text-green-600">{analytics.overview.studentSatisfaction.toFixed(1)}/5</div>
                    <div className="text-sm text-green-800">Overall Satisfaction</div>
                    <div className="text-xs text-green-600 mt-1">Average rating</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Improvement Section */}
          {activeSection === 'improvement' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold mb-4">Improvement Recommendations</h3>
                <div className="space-y-4">
                  {analytics.improvement.suggestions.map((suggestion, idx) => (
                    <div key={idx} className="p-4 border rounded-lg">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-medium">{suggestion.area}</h4>
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          suggestion.impact === 'high' ? 'bg-red-100 text-red-800' :
                          suggestion.impact === 'medium' ? 'bg-orange-100 text-orange-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                          {suggestion.impact} impact
                        </span>
                      </div>
                      <div className="text-sm text-gray-600 mb-3">{suggestion.recommendation}</div>
                      <div className="flex justify-between items-center text-xs">
                        <span>Current: <span className={getPerformanceColor(suggestion.currentScore, suggestion.targetScore)}>{suggestion.currentScore}</span></span>
                        <span>Target: <span className="font-medium">{suggestion.targetScore}</span></span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                        <div 
                          className={`h-2 rounded-full ${suggestion.currentScore <= suggestion.targetScore ? 'bg-green-600' : 'bg-orange-600'}`}
                          style={{width: `${Math.min((suggestion.targetScore / suggestion.currentScore) * 100, 100)}%`}}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold mb-4">Performance Benchmarks</h3>
                <div className="space-y-4">
                  {analytics.improvement.benchmarks.map((benchmark, idx) => (
                    <div key={idx} className="p-4 border rounded-lg">
                      <h4 className="font-medium mb-3">{benchmark.metric}</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Your Score</span>
                          <span className={`font-bold ${getBenchmarkColor(benchmark.yourScore, benchmark.departmentAvg, benchmark.topPerformer)}`}>
                            {benchmark.yourScore}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">Department Avg</span>
                          <span className="text-gray-600">{benchmark.departmentAvg}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">Top Performer</span>
                          <span className="text-gray-600">{benchmark.topPerformer}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                          <div 
                            className={`h-2 rounded-full ${getBenchmarkColor(benchmark.yourScore, benchmark.departmentAvg, benchmark.topPerformer).includes('green') ? 'bg-green-600' : getBenchmarkColor(benchmark.yourScore, benchmark.departmentAvg, benchmark.topPerformer).includes('blue') ? 'bg-blue-600' : 'bg-orange-600'}`}
                            style={{width: `${(benchmark.yourScore / benchmark.topPerformer) * 100}%`}}
                          ></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
