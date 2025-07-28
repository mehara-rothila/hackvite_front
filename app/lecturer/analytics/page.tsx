// app/lecturer/analytics/page.tsx
'use client'

import { useState } from 'react'
import Link from 'next/link'

interface AnalyticsData {
  overview: {
    totalStudents: number
    totalQueries: number
    avgResponseTime: number // in hours
    satisfactionRating: number
    courseCompletionRate: number
    officeHoursUtilization: number
  }
  queryAnalytics: {
    byCategory: { category: string; count: number; percentage: number }[]
    byPriority: { priority: string; count: number; percentage: number }[]
    trendData: { date: string; queries: number; resolved: number }[]
    commonTopics: { topic: string; count: number; avgResolutionTime: number }[]
  }
  studentEngagement: {
    attendanceRates: { course: string; rate: number; trend: 'up' | 'down' | 'stable' }[]
    participationScores: { course: string; score: number; improvement: number }[]
    resourceUsage: { resource: string; downloads: number; engagement: number }[]
  }
  communicationStats: {
    responseTimeBreakdown: { timeRange: string; count: number; percentage: number }[]
    messageVolume: { date: string; sent: number; received: number }[]
    appointmentStats: { type: string; booked: number; completed: number; noShows: number }[]
  }
  performanceInsights: {
    topPerformingCourses: { course: string; avgGrade: number; satisfaction: number }[]
    improvementAreas: { area: string; currentScore: number; targetScore: number; priority: 'high' | 'medium' | 'low' }[]
    studentFeedback: { course: string; rating: number; comments: number; lastUpdated: string }[]
  }
}

const mockAnalytics: AnalyticsData = {
  overview: {
    totalStudents: 89,
    totalQueries: 156,
    avgResponseTime: 4.2,
    satisfactionRating: 4.6,
    courseCompletionRate: 92,
    officeHoursUtilization: 78
  },
  queryAnalytics: {
    byCategory: [
      { category: 'Academic', count: 68, percentage: 44 },
      { category: 'Technical', count: 34, percentage: 22 },
      { category: 'Administrative', count: 28, percentage: 18 },
      { category: 'Appointment', count: 16, percentage: 10 },
      { category: 'Course-related', count: 10, percentage: 6 }
    ],
    byPriority: [
      { priority: 'High', count: 31, percentage: 20 },
      { priority: 'Medium', count: 87, percentage: 56 },
      { priority: 'Low', count: 38, percentage: 24 }
    ],
    trendData: [
      { date: '2025-07-21', queries: 12, resolved: 10 },
      { date: '2025-07-22', queries: 8, resolved: 8 },
      { date: '2025-07-23', queries: 15, resolved: 13 },
      { date: '2025-07-24', queries: 10, resolved: 9 },
      { date: '2025-07-25', queries: 14, resolved: 12 },
      { date: '2025-07-26', queries: 18, resolved: 15 },
      { date: '2025-07-27', queries: 9, resolved: 7 }
    ],
    commonTopics: [
      { topic: 'Assignment Clarification', count: 23, avgResolutionTime: 2.1 },
      { topic: 'Technical Issues', count: 18, avgResolutionTime: 6.4 },
      { topic: 'Grade Inquiry', count: 15, avgResolutionTime: 1.8 },
      { topic: 'Office Hours', count: 12, avgResolutionTime: 0.5 },
      { topic: 'Course Materials', count: 11, avgResolutionTime: 3.2 }
    ]
  },
  studentEngagement: {
    attendanceRates: [
      { course: 'CS101', rate: 92, trend: 'up' },
      { course: 'CS201', rate: 88, trend: 'stable' },
      { course: 'CS401', rate: 0, trend: 'stable' }
    ],
    participationScores: [
      { course: 'CS101', score: 85, improvement: 5 },
      { course: 'CS201', score: 78, improvement: -2 },
      { course: 'CS401', score: 0, improvement: 0 }
    ],
    resourceUsage: [
      { resource: 'Lecture Slides', downloads: 234, engagement: 89 },
      { resource: 'Practice Problems', downloads: 198, engagement: 76 },
      { resource: 'Lab Materials', downloads: 156, engagement: 92 },
      { resource: 'Sample Exams', downloads: 167, engagement: 88 },
      { resource: 'Reading Lists', downloads: 89, engagement: 54 }
    ]
  },
  communicationStats: {
    responseTimeBreakdown: [
      { timeRange: '< 1 hour', count: 45, percentage: 29 },
      { timeRange: '1-4 hours', count: 62, percentage: 40 },
      { timeRange: '4-12 hours', count: 32, percentage: 21 },
      { timeRange: '12-24 hours', count: 12, percentage: 8 },
      { timeRange: '> 24 hours', count: 5, percentage: 3 }
    ],
    messageVolume: [
      { date: '2025-07-21', sent: 15, received: 23 },
      { date: '2025-07-22', sent: 12, received: 18 },
      { date: '2025-07-23', sent: 18, received: 25 },
      { date: '2025-07-24', sent: 14, received: 19 },
      { date: '2025-07-25', sent: 22, received: 28 },
      { date: '2025-07-26', sent: 19, received: 24 },
      { date: '2025-07-27', sent: 8, received: 12 }
    ],
    appointmentStats: [
      { type: 'Office Hours', booked: 34, completed: 31, noShows: 3 },
      { type: 'Consultation', booked: 18, completed: 16, noShows: 2 },
      { type: 'Project Discussion', booked: 12, completed: 11, noShows: 1 }
    ]
  },
  performanceInsights: {
    topPerformingCourses: [
      { course: 'CS101', avgGrade: 3.4, satisfaction: 4.6 },
      { course: 'CS201', avgGrade: 3.1, satisfaction: 4.3 }
    ],
    improvementAreas: [
      { area: 'Response Time', currentScore: 4.2, targetScore: 3.0, priority: 'medium' },
      { area: 'Resource Engagement', currentScore: 76, targetScore: 85, priority: 'high' },
      { area: 'Office Hours Usage', currentScore: 78, targetScore: 85, priority: 'low' }
    ],
    studentFeedback: [
      { course: 'CS101', rating: 4.6, comments: 23, lastUpdated: '2025-07-25' },
      { course: 'CS201', rating: 4.3, comments: 15, lastUpdated: '2025-07-24' }
    ]
  }
}

const timeRanges = ['Last 7 days', 'Last 30 days', 'Last 3 months', 'This semester']
const courses = ['All Courses', 'CS101', 'CS201', 'CS401']

type ActiveTab = 'overview' | 'queries' | 'engagement' | 'communication' | 'insights';

const TABS: { key: ActiveTab; label: string; icon: string }[] = [
  { key: 'overview', label: 'Overview', icon: '📊' },
  { key: 'queries', label: 'Query Analytics', icon: '❓' },
  { key: 'engagement', label: 'Student Engagement', icon: '👥' },
  { key: 'communication', label: 'Communication', icon: '💬' },
  { key: 'insights', label: 'Performance Insights', icon: '🎯' }
];

export default function LecturerAnalyticsPage() {
  const [analytics] = useState<AnalyticsData>(mockAnalytics)
  const [timeRange, setTimeRange] = useState('Last 7 days')
  const [selectedCourse, setSelectedCourse] = useState('All Courses')
  const [activeTab, setActiveTab] = useState<ActiveTab>('overview')

  const getTrendIcon = (trend: 'up' | 'down' | 'stable') => {
    switch (trend) {
      case 'up': return '📈'
      case 'down': return '📉'
      case 'stable': return '➡️'
    }
  }

  const getPriorityColor = (priority: 'high' | 'medium' | 'low') => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800'
      case 'medium': return 'bg-yellow-100 text-yellow-800'
      case 'low': return 'bg-green-100 text-green-800'
    }
  }

  const getPerformanceColor = (score: number, max: number = 5) => {
    const percentage = (score / max) * 100
    if (percentage >= 80) return 'text-green-600'
    if (percentage >= 60) return 'text-blue-600'
    if (percentage >= 40) return 'text-orange-600'
    return 'text-red-600'
  }

  const formatTime = (hours: number) => {
    if (hours < 1) return `${Math.round(hours * 60)}m`
    return `${hours.toFixed(1)}h`
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Teaching Analytics</h1>
          <p className="text-gray-600">Insights into your teaching performance and student engagement</p>
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
                {timeRanges.map(range => (
                  <option key={range} value={range}>{range}</option>
                ))}
              </select>

              <select
                value={selectedCourse}
                onChange={(e) => setSelectedCourse(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                {courses.map(course => (
                  <option key={course} value={course}>{course}</option>
                ))}
              </select>
            </div>

            <div className="flex gap-2">
              <Link
                href="/lecturer/analytics/queries"
                className="bg-blue-50 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-100"
              >
                📊 Detailed Reports
              </Link>
            </div>
          </div>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="text-2xl font-bold text-blue-600">{analytics.overview.totalStudents}</div>
            <div className="text-sm text-gray-600">Total Students</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="text-2xl font-bold text-green-600">{analytics.overview.totalQueries}</div>
            <div className="text-sm text-gray-600">Total Queries</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="text-2xl font-bold text-purple-600">{formatTime(analytics.overview.avgResponseTime)}</div>
            <div className="text-sm text-gray-600">Avg Response Time</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className={`text-2xl font-bold ${getPerformanceColor(analytics.overview.satisfactionRating)}`}>
              {analytics.overview.satisfactionRating.toFixed(1)}
            </div>
            <div className="text-sm text-gray-600">Satisfaction Rating</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="text-2xl font-bold text-orange-600">{analytics.overview.courseCompletionRate}%</div>
            <div className="text-sm text-gray-600">Completion Rate</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="text-2xl font-bold text-red-600">{analytics.overview.officeHoursUtilization}%</div>
            <div className="text-sm text-gray-600">Office Hours Usage</div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-sm mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {TABS.map(tab => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`py-4 px-2 text-sm font-medium border-b-2 flex items-center gap-2 ${
                    activeTab === tab.key
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

        {/* Tab Content */}
        <div className="space-y-6">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold mb-4">Quick Insights</h3>
                <div className="space-y-4">
                  <div className="p-4 bg-green-50 rounded-lg">
                    <div className="font-medium text-green-900">Excellent Response Time</div>
                    <div className="text-sm text-green-700">Your average response time of {formatTime(analytics.overview.avgResponseTime)} is 23% better than last month</div>
                  </div>
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <div className="font-medium text-blue-900">High Student Satisfaction</div>
                    <div className="text-sm text-blue-700">Students rate your teaching {analytics.overview.satisfactionRating}/5.0 on average</div>
                  </div>
                  <div className="p-4 bg-orange-50 rounded-lg">
                    <div className="font-medium text-orange-900">Room for Office Hours Growth</div>
                    <div className="text-sm text-orange-700">Only {analytics.overview.officeHoursUtilization}% of your office hours slots are being used</div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold mb-4">Top Performance Areas</h3>
                <div className="space-y-3">
                  {analytics.performanceInsights.topPerformingCourses.map((course, idx) => (
                    <div key={idx} className="p-3 border rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium">{course.course}</span>
                        <span className={`text-lg font-bold ${getPerformanceColor(course.satisfaction)}`}>
                          {course.satisfaction.toFixed(1)}/5.0
                        </span>
                      </div>
                      <div className="text-sm text-gray-600">
                        Average Grade: {course.avgGrade.toFixed(1)} • Student Satisfaction: {course.satisfaction.toFixed(1)}/5.0
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Query Analytics Tab */}
          {activeTab === 'queries' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold mb-4">Queries by Category</h3>
                <div className="space-y-3">
                  {analytics.queryAnalytics.byCategory.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between">
                      <span className="text-sm text-gray-700">{item.category}</span>
                      <div className="flex items-center gap-2">
                        <div className="w-24 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full" 
                            style={{width: `${item.percentage}%`}}
                          ></div>
                        </div>
                        <span className="text-sm font-medium w-12">{item.count}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold mb-4">Common Query Topics</h3>
                <div className="space-y-3">
                  {analytics.queryAnalytics.commonTopics.map((topic, idx) => (
                    <div key={idx} className="p-3 border rounded-lg">
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-medium text-sm">{topic.topic}</span>
                        <span className="text-sm text-gray-600">{topic.count} queries</span>
                      </div>
                      <div className="text-xs text-gray-500">
                        Avg resolution: {formatTime(topic.avgResolutionTime)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold mb-4">Response Time Breakdown</h3>
                <div className="space-y-3">
                  {analytics.communicationStats.responseTimeBreakdown.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between">
                      <span className="text-sm text-gray-700">{item.timeRange}</span>
                      <div className="flex items-center gap-2">
                        <div className="w-24 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-green-600 h-2 rounded-full" 
                            style={{width: `${item.percentage}%`}}
                          ></div>
                        </div>
                        <span className="text-sm font-medium w-12">{item.count}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold mb-4">Query Trends (Last 7 Days)</h3>
                <div className="space-y-2">
                  {analytics.queryAnalytics.trendData.map((day, idx) => (
                    <div key={idx} className="flex items-center justify-between text-sm">
                      <span className="text-gray-700">{new Date(day.date).toLocaleDateString()}</span>
                      <div className="flex gap-4">
                        <span className="text-blue-600">📥 {day.queries}</span>
                        <span className="text-green-600">✅ {day.resolved}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Student Engagement Tab */}
          {activeTab === 'engagement' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold mb-4">Attendance Rates</h3>
                <div className="space-y-3">
                  {analytics.studentEngagement.attendanceRates.map((course, idx) => (
                    <div key={idx} className="p-3 border rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium">{course.course}</span>
                        <div className="flex items-center gap-2">
                          <span className={`font-bold ${getPerformanceColor(course.rate, 100)}`}>
                            {course.rate}%
                          </span>
                          <span>{getTrendIcon(course.trend)}</span>
                        </div>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full" 
                          style={{width: `${course.rate}%`}}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold mb-4">Participation Scores</h3>
                <div className="space-y-3">
                  {analytics.studentEngagement.participationScores.map((course, idx) => (
                    <div key={idx} className="p-3 border rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium">{course.course}</span>
                        <div className="flex items-center gap-2">
                          <span className={`font-bold ${getPerformanceColor(course.score, 100)}`}>
                            {course.score}%
                          </span>
                          {course.improvement !== 0 && (
                            <span className={`text-sm ${course.improvement > 0 ? 'text-green-600' : 'text-red-600'}`}>
                              {course.improvement > 0 ? '+' : ''}{course.improvement}%
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-purple-600 h-2 rounded-full" 
                          style={{width: `${course.score}%`}}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-2 bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold mb-4">Resource Usage Analytics</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {analytics.studentEngagement.resourceUsage.map((resource, idx) => (
                    <div key={idx} className="p-4 border rounded-lg">
                      <div className="font-medium text-gray-900 mb-2">{resource.resource}</div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Downloads:</span>
                          <span className="font-medium">{resource.downloads}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Engagement:</span>
                          <span className={`font-medium ${getPerformanceColor(resource.engagement, 100)}`}>
                            {resource.engagement}%
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-green-600 h-2 rounded-full" 
                            style={{width: `${resource.engagement}%`}}
                          ></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Communication Tab */}
          {activeTab === 'communication' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold mb-4">Message Volume (Last 7 Days)</h3>
                <div className="space-y-2">
                  {analytics.communicationStats.messageVolume.map((day, idx) => (
                    <div key={idx} className="flex items-center justify-between text-sm">
                      <span className="text-gray-700">{new Date(day.date).toLocaleDateString()}</span>
                      <div className="flex gap-4">
                        <span className="text-blue-600">Sent: {day.sent}</span>
                        <span className="text-green-600">Received: {day.received}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold mb-4">Appointment Statistics</h3>
                <div className="space-y-3">
                  {analytics.communicationStats.appointmentStats.map((stat, idx) => (
                    <div key={idx} className="p-3 border rounded-lg">
                      <div className="font-medium text-gray-900 mb-2">{stat.type}</div>
                      <div className="grid grid-cols-3 gap-2 text-sm">
                        <div className="text-center">
                          <div className="font-bold text-blue-600">{stat.booked}</div>
                          <div className="text-gray-600">Booked</div>
                        </div>
                        <div className="text-center">
                          <div className="font-bold text-green-600">{stat.completed}</div>
                          <div className="text-gray-600">Completed</div>
                        </div>
                        <div className="text-center">
                          <div className="font-bold text-red-600">{stat.noShows}</div>
                          <div className="text-gray-600">No-shows</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Performance Insights Tab */}
          {activeTab === 'insights' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold mb-4">Improvement Areas</h3>
                <div className="space-y-3">
                  {analytics.performanceInsights.improvementAreas.map((area, idx) => (
                    <div key={idx} className="p-4 border rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium">{area.area}</span>
                        <span className={`px-2 py-1 rounded text-xs ${getPriorityColor(area.priority)}`}>
                          {area.priority} priority
                        </span>
                      </div>
                      <div className="text-sm text-gray-600 mb-2">
                        Current: {area.currentScore} → Target: {area.targetScore}
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-orange-600 h-2 rounded-full" 
                          style={{width: `${(area.currentScore / area.targetScore) * 100}%`}}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold mb-4">Student Feedback Summary</h3>
                <div className="space-y-3">
                  {analytics.performanceInsights.studentFeedback.map((feedback, idx) => (
                    <div key={idx} className="p-4 border rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium">{feedback.course}</span>
                        <span className={`text-lg font-bold ${getPerformanceColor(feedback.rating)}`}>
                          {feedback.rating.toFixed(1)}/5.0
                        </span>
                      </div>
                      <div className="text-sm text-gray-600">
                        {feedback.comments} comments • Last updated: {new Date(feedback.lastUpdated).toLocaleDateString()}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-2 bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold mb-4">Recommendations</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <div className="font-medium text-blue-900 mb-2">📈 Increase Office Hours Promotion</div>
                    <div className="text-sm text-blue-700">Only 78% of your office hours are utilized. Consider sending reminders to students.</div>
                  </div>
                  <div className="p-4 bg-green-50 rounded-lg">
                    <div className="font-medium text-green-900 mb-2">🎯 Focus on Resource Engagement</div>
                    <div className="text-sm text-green-700">Some resources have low engagement. Consider interactive formats or quizzes.</div>
                  </div>
                  <div className="p-4 bg-purple-50 rounded-lg">
                    <div className="font-medium text-purple-900 mb-2">💬 Maintain Response Time</div>
                    <div className="text-sm text-purple-700">Your response time is excellent. Keep up the good work!</div>
                  </div>
                  <div className="p-4 bg-orange-50 rounded-lg">
                    <div className="font-medium text-orange-900 mb-2">👥 CS201 Needs Attention</div>
                    <div className="text-sm text-orange-700">Participation in CS201 dropped 2%. Consider additional engagement strategies.</div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
