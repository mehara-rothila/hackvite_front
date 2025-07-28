// app/lecturer/analytics/response-times/page.tsx
'use client'

import { useState } from 'react'
import Link from 'next/link'

interface ResponseTimeAnalytics {
  overview: {
    avgResponseTime: number // in hours
    medianResponseTime: number
    quickestResponse: number // in minutes
    slowestResponse: number // in hours
    totalQueries: number
    within1Hour: number
    within4Hours: number
    within24Hours: number
    over24Hours: number
  }
  byTimeOfDay: {
    hour: number
    avgResponseTime: number
    queryCount: number
    satisfaction: number
  }[]
  byDayOfWeek: {
    day: string
    avgResponseTime: number
    queryCount: number
    peakHours: string[]
  }[]
  byPriority: {
    priority: 'high' | 'medium' | 'low'
    avgResponseTime: number
    targetTime: number
    meetingTarget: number // percentage
    queryCount: number
  }[]
  byCategory: {
    category: string
    avgResponseTime: number
    medianTime: number
    complexity: 'low' | 'medium' | 'high'
    queryCount: number
    trend: 'improving' | 'stable' | 'declining'
  }[]
  byCourse: {
    course: string
    avgResponseTime: number
    queryVolume: number
    quickestCategory: string
    slowestCategory: string
    studentSatisfaction: number
  }[]
  timeDistribution: {
    range: string
    count: number
    percentage: number
    satisfaction: number
    typical: string[]
  }[]
  trends: {
    daily: { date: string; avgTime: number; queries: number }[]
    weekly: { week: string; avgTime: number; improvement: number }[]
    monthly: { month: string; avgTime: number; target: number }[]
  }
  factors: {
    factor: string
    impact: 'positive' | 'negative' | 'neutral'
    description: string
    recommendation: string
  }[]
  goals: {
    current: number
    target: number
    timeframe: string
    progress: number // percentage
    onTrack: boolean
  }
  benchmarks: {
    metric: string
    yourTime: number
    departmentAvg: number
    industryBest: number
    unit: string
  }[]
}

const mockResponseTimeAnalytics: ResponseTimeAnalytics = {
  overview: {
    avgResponseTime: 4.2,
    medianResponseTime: 3.1,
    quickestResponse: 8,
    slowestResponse: 18.5,
    totalQueries: 156,
    within1Hour: 45,
    within4Hours: 87,
    within24Hours: 142,
    over24Hours: 14
  },
  byTimeOfDay: [
    { hour: 8, avgResponseTime: 2.1, queryCount: 8, satisfaction: 4.9 },
    { hour: 9, avgResponseTime: 1.8, queryCount: 12, satisfaction: 4.8 },
    { hour: 10, avgResponseTime: 2.4, queryCount: 15, satisfaction: 4.7 },
    { hour: 11, avgResponseTime: 3.2, queryCount: 11, satisfaction: 4.6 },
    { hour: 12, avgResponseTime: 5.8, queryCount: 6, satisfaction: 4.2 },
    { hour: 13, avgResponseTime: 6.2, queryCount: 4, satisfaction: 4.1 },
    { hour: 14, avgResponseTime: 3.8, queryCount: 14, satisfaction: 4.5 },
    { hour: 15, avgResponseTime: 4.1, queryCount: 12, satisfaction: 4.4 },
    { hour: 16, avgResponseTime: 5.2, queryCount: 9, satisfaction: 4.3 },
    { hour: 17, avgResponseTime: 7.1, queryCount: 7, satisfaction: 4.0 },
    { hour: 18, avgResponseTime: 8.4, queryCount: 5, satisfaction: 3.8 },
    { hour: 19, avgResponseTime: 6.8, queryCount: 8, satisfaction: 4.1 },
    { hour: 20, avgResponseTime: 9.2, queryCount: 6, satisfaction: 3.7 },
    { hour: 21, avgResponseTime: 12.1, queryCount: 3, satisfaction: 3.5 }
  ],
  byDayOfWeek: [
    { day: 'Monday', avgResponseTime: 3.8, queryCount: 28, peakHours: ['10 AM', '2 PM'] },
    { day: 'Tuesday', avgResponseTime: 4.1, queryCount: 24, peakHours: ['9 AM', '3 PM'] },
    { day: 'Wednesday', avgResponseTime: 3.9, queryCount: 26, peakHours: ['10 AM', '2 PM'] },
    { day: 'Thursday', avgResponseTime: 4.5, queryCount: 22, peakHours: ['11 AM', '4 PM'] },
    { day: 'Friday', avgResponseTime: 5.2, queryCount: 18, peakHours: ['9 AM', '1 PM'] },
    { day: 'Saturday', avgResponseTime: 8.1, queryCount: 8, peakHours: ['11 AM'] },
    { day: 'Sunday', avgResponseTime: 12.3, queryCount: 4, peakHours: ['2 PM'] }
  ],
  byPriority: [
    { priority: 'high', avgResponseTime: 1.8, targetTime: 2.0, meetingTarget: 89.2, queryCount: 31 },
    { priority: 'medium', avgResponseTime: 4.6, targetTime: 6.0, meetingTarget: 76.3, queryCount: 87 },
    { priority: 'low', avgResponseTime: 8.1, targetTime: 12.0, meetingTarget: 82.1, queryCount: 38 }
  ],
  byCategory: [
    { category: 'Academic', avgResponseTime: 3.8, medianTime: 2.9, complexity: 'medium', queryCount: 68, trend: 'improving' },
    { category: 'Technical', avgResponseTime: 6.4, medianTime: 5.1, complexity: 'high', queryCount: 34, trend: 'stable' },
    { category: 'Administrative', avgResponseTime: 2.1, medianTime: 1.8, complexity: 'low', queryCount: 28, trend: 'improving' },
    { category: 'Appointment', avgResponseTime: 0.8, medianTime: 0.5, complexity: 'low', queryCount: 16, trend: 'stable' },
    { category: 'Course-related', avgResponseTime: 5.2, medianTime: 4.6, complexity: 'medium', queryCount: 10, trend: 'declining' }
  ],
  byCourse: [
    { course: 'CS101', avgResponseTime: 3.8, queryVolume: 102, quickestCategory: 'Administrative', slowestCategory: 'Technical', studentSatisfaction: 4.6 },
    { course: 'CS201', avgResponseTime: 5.2, queryVolume: 41, quickestCategory: 'Appointment', slowestCategory: 'Academic', studentSatisfaction: 4.3 },
    { course: 'CS401', avgResponseTime: 4.1, queryVolume: 13, quickestCategory: 'Administrative', slowestCategory: 'Technical', studentSatisfaction: 4.5 }
  ],
  timeDistribution: [
    { range: '< 1 hour', count: 45, percentage: 28.8, satisfaction: 4.9, typical: ['Appointment scheduling', 'Quick clarifications'] },
    { range: '1-4 hours', count: 42, percentage: 26.9, satisfaction: 4.6, typical: ['Assignment questions', 'Grade inquiries'] },
    { range: '4-12 hours', count: 35, percentage: 22.4, satisfaction: 4.3, typical: ['Technical issues', 'Complex academic topics'] },
    { range: '12-24 hours', count: 20, percentage: 12.8, satisfaction: 4.0, typical: ['Project guidance', 'Research questions'] },
    { range: '> 24 hours', count: 14, percentage: 9.0, satisfaction: 3.2, typical: ['Complex technical problems', 'Policy interpretations'] }
  ],
  trends: {
    daily: [
      { date: '2025-07-21', avgTime: 4.8, queries: 12 },
      { date: '2025-07-22', avgTime: 3.2, queries: 8 },
      { date: '2025-07-23', avgTime: 5.1, queries: 15 },
      { date: '2025-07-24', avgTime: 3.9, queries: 10 },
      { date: '2025-07-25', avgTime: 4.2, queries: 14 },
      { date: '2025-07-26', avgTime: 4.6, queries: 18 },
      { date: '2025-07-27', avgTime: 3.8, queries: 9 }
    ],
    weekly: [
      { week: 'Week of Jul 7', avgTime: 5.2, improvement: -8.5 },
      { week: 'Week of Jul 14', avgTime: 4.8, improvement: -7.7 },
      { week: 'Week of Jul 21', avgTime: 4.2, improvement: -12.5 }
    ],
    monthly: [
      { month: 'May 2025', avgTime: 5.8, target: 5.0 },
      { month: 'June 2025', avgTime: 4.9, target: 4.5 },
      { month: 'July 2025', avgTime: 4.2, target: 4.0 }
    ]
  },
  factors: [
    {
      factor: 'Time of Day',
      impact: 'negative',
      description: 'Response times increase significantly after 5 PM and on weekends',
      recommendation: 'Set up automated responses for after-hours queries or establish specific response windows'
    },
    {
      factor: 'Query Complexity',
      impact: 'negative',
      description: 'Technical queries take 3x longer to resolve than administrative ones',
      recommendation: 'Create technical FAQ resources and consider peer-to-peer help forums'
    },
    {
      factor: 'Course Load',
      impact: 'neutral',
      description: 'CS101 has higher volume but maintains good response times',
      recommendation: 'Continue current approach for high-volume courses'
    },
    {
      factor: 'Priority System',
      impact: 'positive',
      description: 'High-priority queries consistently meet response time targets',
      recommendation: 'Educate students on appropriate priority usage'
    }
  ],
  goals: {
    current: 4.2,
    target: 3.5,
    timeframe: 'End of semester',
    progress: 68.2,
    onTrack: true
  },
  benchmarks: [
    { metric: 'Average Response Time', yourTime: 4.2, departmentAvg: 5.8, industryBest: 3.1, unit: 'hours' },
    { metric: 'Queries within 1 Hour', yourTime: 28.8, departmentAvg: 22.1, industryBest: 35.2, unit: '%' },
    { metric: 'Queries within 24 Hours', yourTime: 91.0, departmentAvg: 84.3, industryBest: 96.8, unit: '%' },
    { metric: 'Weekend Response Time', yourTime: 10.2, departmentAvg: 14.6, industryBest: 8.5, unit: 'hours' }
  ]
}

type ActiveSection = 'overview' | 'patterns' | 'breakdown' | 'improvement';

const TABS: { key: ActiveSection; label: string; icon: string }[] = [
  { key: 'overview', label: 'Time Distribution', icon: '⏱️' },
  { key: 'patterns', label: 'Time Patterns', icon: '📅' },
  { key: 'breakdown', label: 'Category Breakdown', icon: '📊' },
  { key: 'improvement', label: 'Improvement Areas', icon: '🎯' }
];

export default function LecturerAnalyticsResponseTimesPage() {
  const [analytics] = useState<ResponseTimeAnalytics>(mockResponseTimeAnalytics)
  const [timeRange, setTimeRange] = useState('Last 30 days')
  const [selectedCourse, setSelectedCourse] = useState('All Courses')
  const [activeSection, setActiveSection] = useState<ActiveSection>('overview')

  const formatTime = (hours: number) => {
    if (hours < 1) return `${Math.round(hours * 60)}m`
    return `${hours.toFixed(1)}h`
  }

  const getPerformanceColor = (current: number, target: number) => {
    if (current <= target) return 'text-green-600'
    if (current <= target * 1.2) return 'text-orange-600'
    return 'text-red-600'
  }

  const getTrendColor = (trend: 'improving' | 'stable' | 'declining') => {
    switch (trend) {
      case 'improving': return 'text-green-600'
      case 'stable': return 'text-blue-600'
      case 'declining': return 'text-red-600'
    }
  }

  const getTrendIcon = (trend: 'improving' | 'stable' | 'declining') => {
    switch (trend) {
      case 'improving': return '📈'
      case 'stable': return '➡️'
      case 'declining': return '📉'
    }
  }

  const getComplexityColor = (complexity: 'low' | 'medium' | 'high') => {
    switch (complexity) {
      case 'low': return 'bg-green-100 text-green-800'
      case 'medium': return 'bg-yellow-100 text-yellow-800'
      case 'high': return 'bg-red-100 text-red-800'
    }
  }

  const getImpactColor = (impact: 'positive' | 'negative' | 'neutral') => {
    switch (impact) {
      case 'positive': return 'text-green-600'
      case 'negative': return 'text-red-600'
      case 'neutral': return 'text-gray-600'
    }
  }

  const getBenchmarkColor = (your: number, dept: number, best: number, isTime: boolean = true) => {
    if (isTime) {
      if (your <= best * 1.1) return 'text-green-600'
      if (your <= dept) return 'text-blue-600'
      return 'text-orange-600'
    } else {
      if (your >= best * 0.9) return 'text-green-600'
      if (your >= dept) return 'text-blue-600'
      return 'text-orange-600'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumb */}
        <div className="mb-6">
          <nav className="text-sm text-gray-500">
            <Link href="/lecturer/analytics" className="hover:text-blue-600">Analytics</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-900">Response Time Analysis</span>
          </nav>
        </div>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Response Time Analytics</h1>
          <p className="text-gray-600">Detailed analysis of your query response patterns and performance</p>
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
            <div className="text-2xl font-bold text-blue-600">{formatTime(analytics.overview.avgResponseTime)}</div>
            <div className="text-sm text-gray-600">Average Response</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="text-2xl font-bold text-green-600">{formatTime(analytics.overview.medianResponseTime)}</div>
            <div className="text-sm text-gray-600">Median Response</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="text-2xl font-bold text-purple-600">{analytics.overview.within1Hour}</div>
            <div className="text-sm text-gray-600">Within 1 Hour</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="text-2xl font-bold text-orange-600">{analytics.overview.within24Hours}</div>
            <div className="text-sm text-gray-600">Within 24 Hours</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="text-2xl font-bold text-emerald-600">{analytics.overview.quickestResponse}m</div>
            <div className="text-sm text-gray-600">Quickest Response</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="text-2xl font-bold text-red-600">{formatTime(analytics.overview.slowestResponse)}</div>
            <div className="text-sm text-gray-600">Slowest Response</div>
          </div>
        </div>

        {/* Goal Progress */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Response Time Goal Progress</h3>
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${analytics.goals.onTrack ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
              {analytics.goals.onTrack ? 'On Track' : 'Behind Schedule'}
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{formatTime(analytics.goals.current)}</div>
              <div className="text-sm text-gray-600">Current Average</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{formatTime(analytics.goals.target)}</div>
              <div className="text-sm text-gray-600">Target Average</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">{analytics.goals.progress.toFixed(1)}%</div>
              <div className="text-sm text-gray-600">Progress</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">{analytics.goals.timeframe}</div>
              <div className="text-sm text-gray-600">Deadline</div>
            </div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3 mt-4">
            <div 
              className={`h-3 rounded-full ${analytics.goals.onTrack ? 'bg-green-600' : 'bg-orange-600'}`}
              style={{width: `${Math.min(analytics.goals.progress, 100)}%`}}
            ></div>
          </div>
        </div>

        {/* Section Tabs */}
        <div className="bg-white rounded-lg shadow-sm mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {TABS.map(tab => (
                <button
                  key={tab.key}
                  onClick={() => setActiveSection(tab.key)}
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
                <h3 className="text-lg font-semibold mb-4">Response Time Distribution</h3>
                <div className="space-y-4">
                  {analytics.timeDistribution.map((range, idx) => (
                    <div key={idx} className="p-4 border rounded-lg">
                      <div className="flex justify-between items-center mb-3">
                        <span className="font-medium">{range.range}</span>
                        <div className="flex items-center gap-3">
                          <span className="text-lg font-bold">{range.count}</span>
                          <span className="text-sm text-gray-600">({range.percentage}%)</span>
                        </div>
                      </div>
                      <div className="mb-3">
                        <div className="flex justify-between text-sm mb-1">
                          <span>Satisfaction: {range.satisfaction}/5</span>
                          <span></span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full" 
                            style={{width: `${range.percentage}%`}}
                          ></div>
                        </div>
                      </div>
                      <div className="text-xs text-gray-600">
                        <span className="font-medium">Typical queries:</span> {range.typical.join(', ')}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold mb-4">Priority Performance</h3>
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
                        <span className="text-lg font-bold">{priority.queryCount} queries</span>
                      </div>
                      <div className="grid grid-cols-3 gap-3 text-sm">
                        <div>
                          <div className="text-gray-500">Avg Time</div>
                          <div className={`font-bold ${getPerformanceColor(priority.avgResponseTime, priority.targetTime)}`}>
                            {formatTime(priority.avgResponseTime)}
                          </div>
                        </div>
                        <div>
                          <div className="text-gray-500">Target</div>
                          <div className="font-medium">{formatTime(priority.targetTime)}</div>
                        </div>
                        <div>
                          <div className="text-gray-500">Meeting Target</div>
                          <div className="font-medium">{priority.meetingTarget.toFixed(1)}%</div>
                        </div>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                        <div 
                          className={`h-2 rounded-full ${priority.avgResponseTime <= priority.targetTime ? 'bg-green-600' : 'bg-orange-600'}`}
                          style={{width: `${Math.min(priority.meetingTarget, 100)}%`}}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-2 bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold mb-4">Weekly Trends</h3>
                <div className="space-y-3">
                  {analytics.trends.weekly.map((week, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 border rounded-lg">
                      <span className="font-medium">{week.week}</span>
                      <div className="flex items-center gap-6">
                        <div className="text-sm">
                          <span className="text-gray-500">Avg: </span>
                          <span className="font-bold">{formatTime(week.avgTime)}</span>
                        </div>
                        <div className={`text-sm font-medium ${week.improvement < 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {week.improvement < 0 ? '↓' : '↑'} {Math.abs(week.improvement).toFixed(1)}%
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Patterns Section */}
          {activeSection === 'patterns' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold mb-4">Response Times by Hour</h3>
                <div className="space-y-2">
                  {analytics.byTimeOfDay
                    .filter(hour => hour.queryCount > 0)
                    .sort((a, b) => a.hour - b.hour)
                    .map((hour, idx) => (
                    <div key={idx} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                      <span className="text-sm font-medium">
                        {hour.hour}:00 - {hour.hour + 1}:00
                      </span>
                      <div className="flex items-center gap-4">
                        <span className="text-sm">{formatTime(hour.avgResponseTime)}</span>
                        <span className="text-xs text-gray-500">{hour.queryCount} queries</span>
                        <span className="text-xs text-green-600">{hour.satisfaction}/5 ★</span>
                        <div className="w-16 bg-gray-200 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full ${hour.avgResponseTime <= 4 ? 'bg-green-600' : hour.avgResponseTime <= 8 ? 'bg-orange-600' : 'bg-red-600'}`}
                            style={{width: `${Math.min((hour.avgResponseTime / 12) * 100, 100)}%`}}
                          ></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold mb-4">Response Times by Day</h3>
                <div className="space-y-3">
                  {analytics.byDayOfWeek.map((day, idx) => (
                    <div key={idx} className="p-3 border rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium">{day.day}</span>
                        <div className="flex items-center gap-3">
                          <span className="font-bold">{formatTime(day.avgResponseTime)}</span>
                          <span className="text-sm text-gray-600">{day.queryCount} queries</span>
                        </div>
                      </div>
                      <div className="text-xs text-gray-600">
                        <span className="font-medium">Peak hours:</span> {day.peakHours.join(', ')}
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                        <div 
                          className={`h-2 rounded-full ${day.avgResponseTime <= 5 ? 'bg-green-600' : day.avgResponseTime <= 10 ? 'bg-orange-600' : 'bg-red-600'}`}
                          style={{width: `${Math.min((day.avgResponseTime / 15) * 100, 100)}%`}}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-2 bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold mb-4">Daily Trend (Last 7 Days)</h3>
                <div className="space-y-3">
                  {analytics.trends.daily.map((day, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 border rounded-lg">
                      <span className="font-medium">{new Date(day.date).toLocaleDateString()}</span>
                      <div className="flex items-center gap-6">
                        <div className="text-sm">
                          <span className="text-gray-500">Avg: </span>
                          <span className="font-bold">{formatTime(day.avgTime)}</span>
                        </div>
                        <div className="text-sm text-blue-600">{day.queries} queries</div>
                        <div className="w-24 bg-gray-200 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full ${day.avgTime <= 4 ? 'bg-green-600' : day.avgTime <= 6 ? 'bg-orange-600' : 'bg-red-600'}`}
                            style={{width: `${Math.min((day.avgTime / 8) * 100, 100)}%`}}
                          ></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Breakdown Section */}
          {activeSection === 'breakdown' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold mb-4">Response Times by Category</h3>
                <div className="space-y-3">
                  {analytics.byCategory.map((category, idx) => (
                    <div key={idx} className="p-4 border rounded-lg">
                      <div className="flex justify-between items-center mb-3">
                        <span className="font-medium">{category.category}</span>
                        <div className="flex items-center gap-2">
                          <span className={`px-2 py-1 rounded text-xs font-medium ${getComplexityColor(category.complexity)}`}>
                            {category.complexity}
                          </span>
                          <span className={getTrendColor(category.trend)}>{getTrendIcon(category.trend)}</span>
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-2 text-sm mb-2">
                        <div>
                          <div className="text-gray-500">Avg Time</div>
                          <div className="font-bold">{formatTime(category.avgResponseTime)}</div>
                        </div>
                        <div>
                          <div className="text-gray-500">Median</div>
                          <div className="font-medium">{formatTime(category.medianTime)}</div>
                        </div>
                        <div>
                          <div className="text-gray-500">Count</div>
                          <div className="font-medium">{category.queryCount}</div>
                        </div>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${category.avgResponseTime <= 3 ? 'bg-green-600' : category.avgResponseTime <= 6 ? 'bg-orange-600' : 'bg-red-600'}`}
                          style={{width: `${Math.min((category.avgResponseTime / 10) * 100, 100)}%`}}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold mb-4">Course Performance</h3>
                <div className="space-y-4">
                  {analytics.byCourse.map((course, idx) => (
                    <div key={idx} className="p-4 border rounded-lg">
                      <div className="flex justify-between items-center mb-3">
                        <h4 className="font-semibold">{course.course}</h4>
                        <span className="text-lg font-bold">{formatTime(course.avgResponseTime)}</span>
                      </div>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Query Volume:</span>
                          <span className="font-medium">{course.queryVolume}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Satisfaction:</span>
                          <span className="font-medium">{course.studentSatisfaction}/5</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Quickest:</span>
                          <span className="text-green-600">{course.quickestCategory}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Slowest:</span>
                          <span className="text-red-600">{course.slowestCategory}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-2 bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold mb-4">Monthly Progress Toward Goals</h3>
                <div className="space-y-4">
                  {analytics.trends.monthly.map((month, idx) => (
                    <div key={idx} className="p-4 border rounded-lg">
                      <div className="flex justify-between items-center mb-3">
                        <span className="font-medium">{month.month}</span>
                        <div className="flex items-center gap-4">
                          <span className="text-sm">
                            <span className="text-gray-500">Actual: </span>
                            <span className={`font-bold ${getPerformanceColor(month.avgTime, month.target)}`}>
                              {formatTime(month.avgTime)}
                            </span>
                          </span>
                          <span className="text-sm">
                            <span className="text-gray-500">Target: </span>
                            <span className="font-medium">{formatTime(month.target)}</span>
                          </span>
                        </div>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div 
                          className={`h-3 rounded-full ${month.avgTime <= month.target ? 'bg-green-600' : 'bg-orange-600'}`}
                          style={{width: `${Math.min((month.target / month.avgTime) * 100, 100)}%`}}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Improvement Section */}
          {activeSection === 'improvement' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold mb-4">Performance Factors</h3>
                <div className="space-y-4">
                  {analytics.factors.map((factor, idx) => (
                    <div key={idx} className="p-4 border rounded-lg">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-medium">{factor.factor}</h4>
                        <span className={`text-sm font-medium ${getImpactColor(factor.impact)}`}>
                          {factor.impact}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{factor.description}</p>
                      <div className="text-sm font-medium text-blue-700">
                        💡 {factor.recommendation}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold mb-4">Benchmark Comparison</h3>
                <div className="space-y-4">
                  {analytics.benchmarks.map((benchmark, idx) => (
                    <div key={idx} className="p-4 border rounded-lg">
                      <h4 className="font-medium mb-3">{benchmark.metric}</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Your Score</span>
                          <span className={`font-bold ${getBenchmarkColor(benchmark.yourTime, benchmark.departmentAvg, benchmark.industryBest, benchmark.metric.includes('Time'))}`}>
                            {benchmark.yourTime}{benchmark.unit}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">Department Avg</span>
                          <span className="text-gray-600">{benchmark.departmentAvg}{benchmark.unit}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">Industry Best</span>
                          <span className="text-gray-600">{benchmark.industryBest}{benchmark.unit}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                          <div 
                            className={`h-2 rounded-full ${getBenchmarkColor(benchmark.yourTime, benchmark.departmentAvg, benchmark.industryBest, benchmark.metric.includes('Time')).includes('green') ? 'bg-green-600' : getBenchmarkColor(benchmark.yourTime, benchmark.departmentAvg, benchmark.industryBest, benchmark.metric.includes('Time')).includes('blue') ? 'bg-blue-600' : 'bg-orange-600'}`}
                            style={{width: `${benchmark.metric.includes('Time') ? Math.min((benchmark.industryBest / benchmark.yourTime) * 100, 100) : Math.min((benchmark.yourTime / benchmark.industryBest) * 100, 100)}%`}}
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
