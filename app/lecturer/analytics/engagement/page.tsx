// app/lecturer/analytics/engagement/page.tsx
'use client'

import { useState } from 'react'
import Link from 'next/link'

interface EngagementMetrics {
  overview: {
    totalStudents: number
    activeStudents: number
    avgEngagementScore: number
    highEngagementStudents: number
    atRiskStudents: number
    engagementTrend: 'up' | 'down' | 'stable'
  }
  attendanceAnalytics: {
    overall: {
      averageAttendance: number
      trend: 'up' | 'down' | 'stable'
      consistentAttendees: number
      irregularAttendees: number
    }
    byCourse: {
      course: string
      attendance: number
      trend: 'up' | 'down' | 'stable'
      sessions: { date: string; present: number; total: number }[]
    }[]
    byTimeSlot: {
      timeSlot: string
      attendance: number
      studentCount: number
    }[]
    patterns: {
      bestDay: string
      worstDay: string
      peakTime: string
      dropoffTime: string
    }
  }
  participationMetrics: {
    overallScore: number
    trend: 'up' | 'down' | 'stable'
    breakdown: {
      questionsAsked: { average: number; total: number; topStudents: string[] }
      discussionContributions: { average: number; total: number; topStudents: string[] }
      voluntaryResponses: { average: number; total: number; topStudents: string[] }
      groupParticipation: { average: number; total: number; topStudents: string[] }
    }
    byCourse: {
      course: string
      score: number
      improvement: number
      activities: { type: string; score: number; count: number }[]
    }[]
  }
  digitalEngagement: {
    platformUsage: {
      totalLogins: number
      averageSessionTime: number
      dailyActiveUsers: number
      weeklyActiveUsers: number
      peakUsageHours: string[]
    }
    resourceInteraction: {
      totalDownloads: number
      averageDownloadsPerStudent: number
      mostAccessedResources: {
        name: string
        downloads: number
        category: string
        engagementScore: number
      }[]
      leastAccessedResources: {
        name: string
        downloads: number
        category: string
        reason: string
      }[]
    }
    assignmentEngagement: {
      submissionRate: number
      onTimeSubmissions: number
      qualityScore: number
      revisionRate: number
      helpRequestsPerAssignment: number
    }
    communicationPatterns: {
      messagesExchanged: number
      responseRate: number
      initiatedConversations: number
      officeHoursBookings: number
      averageResponseTime: number
    }
  }
  individualStudentInsights: {
    highPerformers: {
      id: string
      name: string
      engagementScore: number
      strengths: string[]
      contributions: number
    }[]
    needsAttention: {
      id: string
      name: string
      engagementScore: number
      concerns: string[]
      lastActivity: string
      recommendedActions: string[]
    }[]
    mostImproved: {
      id: string
      name: string
      previousScore: number
      currentScore: number
      improvement: number
      areas: string[]
    }[]
  }
  engagementDrivers: {
    positiveFactors: {
      factor: string
      impact: number
      description: string
    }[]
    negativeFactors: {
      factor: string
      impact: number
      description: string
    }[]
    recommendations: {
      category: string
      suggestion: string
      expectedImpact: 'high' | 'medium' | 'low'
      effort: 'high' | 'medium' | 'low'
    }[]
  }
  timeBasedAnalysis: {
    weeklyTrends: {
      week: string
      attendance: number
      participation: number
      digitalActivity: number
      assignments: number
    }[]
    seasonalPatterns: {
      period: string
      avgEngagement: number
      factors: string[]
    }[]
    criticalPeriods: {
      period: string
      type: 'exam' | 'assignment' | 'holiday' | 'break'
      engagementDrop: number
      recoveryTime: string
    }[]
  }
}

const mockEngagementData: EngagementMetrics = {
  overview: {
    totalStudents: 89,
    activeStudents: 76,
    avgEngagementScore: 78.5,
    highEngagementStudents: 23,
    atRiskStudents: 8,
    engagementTrend: 'up'
  },
  attendanceAnalytics: {
    overall: {
      averageAttendance: 85.2,
      trend: 'stable',
      consistentAttendees: 67,
      irregularAttendees: 22
    },
    byCourse: [
      {
        course: 'CS101',
        attendance: 88.5,
        trend: 'up',
        sessions: [
          { date: '2025-07-21', present: 58, total: 65 },
          { date: '2025-07-23', present: 60, total: 65 },
          { date: '2025-07-25', present: 62, total: 65 }
        ]
      },
      {
        course: 'CS201',
        attendance: 82.1,
        trend: 'stable',
        sessions: [
          { date: '2025-07-22', present: 20, total: 24 },
          { date: '2025-07-24', present: 19, total: 24 },
          { date: '2025-07-26', present: 21, total: 24 }
        ]
      }
    ],
    byTimeSlot: [
      { timeSlot: '8:00 AM', attendance: 72.3, studentCount: 15 },
      { timeSlot: '10:00 AM', attendance: 88.9, studentCount: 45 },
      { timeSlot: '2:00 PM', attendance: 85.1, studentCount: 29 },
      { timeSlot: '4:00 PM', attendance: 79.2, studentCount: 12 }
    ],
    patterns: {
      bestDay: 'Wednesday',
      worstDay: 'Friday',
      peakTime: '10:00 AM',
      dropoffTime: '4:00 PM'
    }
  },
  participationMetrics: {
    overallScore: 73.8,
    trend: 'up',
    breakdown: {
      questionsAsked: { average: 2.3, total: 156, topStudents: ['Alice Johnson', 'Bob Smith', 'Carol Davis'] },
      discussionContributions: { average: 4.1, total: 278, topStudents: ['Carol Davis', 'Emma Brown', 'Alice Johnson'] },
      voluntaryResponses: { average: 1.8, total: 122, topStudents: ['Alice Johnson', 'Frank Miller', 'Carol Davis'] },
      groupParticipation: { average: 3.5, total: 238, topStudents: ['Carol Davis', 'Alice Johnson', 'Bob Smith'] }
    },
    byCourse: [
      {
        course: 'CS101',
        score: 76.2,
        improvement: 5,
        activities: [
          { type: 'Questions', score: 78, count: 89 },
          { type: 'Discussions', score: 74, count: 156 },
          { type: 'Presentations', score: 82, count: 23 }
        ]
      },
      {
        course: 'CS201',
        score: 69.1,
        improvement: -2,
        activities: [
          { type: 'Questions', score: 71, count: 67 },
          { type: 'Discussions', score: 68, count: 122 },
          { type: 'Lab Work', score: 73, count: 45 }
        ]
      }
    ]
  },
  digitalEngagement: {
    platformUsage: {
      totalLogins: 2834,
      averageSessionTime: 18.5,
      dailyActiveUsers: 67,
      weeklyActiveUsers: 84,
      peakUsageHours: ['9:00 AM', '2:00 PM', '8:00 PM']
    },
    resourceInteraction: {
      totalDownloads: 1456,
      averageDownloadsPerStudent: 16.4,
      mostAccessedResources: [
        { name: 'Chapter 4 Slides', downloads: 78, category: 'lecture', engagementScore: 92 },
        { name: 'Assignment 3 Template', downloads: 65, category: 'assignment', engagementScore: 88 },
        { name: 'Lab Exercise 5', downloads: 59, category: 'lab', engagementScore: 85 }
      ],
      leastAccessedResources: [
        { name: 'Supplemental Reading 2', downloads: 12, category: 'reading', reason: 'Optional material' },
        { name: 'Archived Lecture 2023', downloads: 8, category: 'reference', reason: 'Outdated content' }
      ]
    },
    assignmentEngagement: {
      submissionRate: 92.1,
      onTimeSubmissions: 78.3,
      qualityScore: 82.7,
      revisionRate: 34.2,
      helpRequestsPerAssignment: 4.8
    },
    communicationPatterns: {
      messagesExchanged: 342,
      responseRate: 87.3,
      initiatedConversations: 156,
      officeHoursBookings: 89,
      averageResponseTime: 4.2
    }
  },
  individualStudentInsights: {
    highPerformers: [
      {
        id: '1',
        name: 'Carol Davis',
        engagementScore: 96.5,
        strengths: ['Consistent attendance', 'Active participation', 'Peer mentoring'],
        contributions: 34
      },
      {
        id: '2',
        name: 'Alice Johnson',
        engagementScore: 93.2,
        strengths: ['Question asking', 'Resource utilization', 'Quality submissions'],
        contributions: 28
      },
      {
        id: '3',
        name: 'Frank Miller',
        engagementScore: 91.8,
        strengths: ['Discussion leadership', 'Technical insights', 'Collaboration'],
        contributions: 25
      }
    ],
    needsAttention: [
      {
        id: '4',
        name: 'David Wilson',
        engagementScore: 42.1,
        concerns: ['Poor attendance', 'Low participation', 'Missing assignments'],
        lastActivity: '2025-07-24',
        recommendedActions: ['Schedule 1-on-1 meeting', 'Provide study group referral', 'Check for external challenges']
      },
      {
        id: '5',
        name: 'Sarah Lee',
        engagementScore: 51.3,
        concerns: ['Declining participation', 'Late submissions', 'Reduced digital activity'],
        lastActivity: '2025-07-26',
        recommendedActions: ['Follow up on recent changes', 'Offer flexible deadlines', 'Connect with academic advisor']
      }
    ],
    mostImproved: [
      {
        id: '6',
        name: 'Bob Smith',
        previousScore: 62.4,
        currentScore: 78.9,
        improvement: 16.5,
        areas: ['Attendance', 'Assignment quality', 'Peer interaction']
      },
      {
        id: '7',
        name: 'Emma Brown',
        previousScore: 69.1,
        currentScore: 83.7,
        improvement: 14.6,
        areas: ['Participation', 'Resource usage', 'Communication']
      }
    ]
  },
  engagementDrivers: {
    positiveFactors: [
      { factor: 'Interactive Lectures', impact: 23, description: 'Students respond well to Q&A sessions and demonstrations' },
      { factor: 'Timely Feedback', impact: 19, description: 'Quick response to questions increases participation' },
      { factor: 'Group Activities', impact: 17, description: 'Collaborative work boosts engagement levels' },
      { factor: 'Real-world Examples', impact: 15, description: 'Practical applications maintain interest' }
    ],
    negativeFactors: [
      { factor: 'Technical Difficulties', impact: -18, description: 'Platform issues reduce participation' },
      { factor: 'Assignment Overload', impact: -14, description: 'Too many concurrent deadlines cause stress' },
      { factor: 'Lack of Variety', impact: -12, description: 'Repetitive activities reduce interest' }
    ],
    recommendations: [
      {
        category: 'Attendance',
        suggestion: 'Implement attendance incentives and flexible make-up policies',
        expectedImpact: 'medium',
        effort: 'low'
      },
      {
        category: 'Participation',
        suggestion: 'Introduce gamification elements and participation rewards',
        expectedImpact: 'high',
        effort: 'medium'
      },
      {
        category: 'Digital Engagement',
        suggestion: 'Create interactive online content and discussion forums',
        expectedImpact: 'high',
        effort: 'high'
      },
      {
        category: 'Support',
        suggestion: 'Establish peer mentoring program for struggling students',
        expectedImpact: 'medium',
        effort: 'medium'
      }
    ]
  },
  timeBasedAnalysis: {
    weeklyTrends: [
      { week: 'Week 1', attendance: 92, participation: 68, digitalActivity: 74, assignments: 95 },
      { week: 'Week 2', attendance: 88, participation: 72, digitalActivity: 78, assignments: 89 },
      { week: 'Week 3', attendance: 85, participation: 75, digitalActivity: 81, assignments: 84 },
      { week: 'Week 4', attendance: 83, participation: 74, digitalActivity: 79, assignments: 92 }
    ],
    seasonalPatterns: [
      { period: 'Start of Semester', avgEngagement: 89.2, factors: ['High motivation', 'New content', 'Goal setting'] },
      { period: 'Mid-Semester', avgEngagement: 76.8, factors: ['Routine establishment', 'Increased workload', 'Initial challenges'] },
      { period: 'Pre-Exam', avgEngagement: 68.4, factors: ['Stress increase', 'Focus shift to studying', 'Reduced exploration'] }
    ],
    criticalPeriods: [
      { period: 'Midterm Week', type: 'exam', engagementDrop: 22, recoveryTime: '1 week' },
      { period: 'Assignment Rush', type: 'assignment', engagementDrop: 15, recoveryTime: '3 days' },
      { period: 'Spring Break', type: 'break', engagementDrop: 45, recoveryTime: '1 week' }
    ]
  }
}

export default function EngagementAnalyticsPage() {
  const [analytics] = useState<EngagementMetrics>(mockEngagementData)
  const [timeRange, setTimeRange] = useState('Last 30 days')
  const [selectedCourse, setSelectedCourse] = useState('All Courses')
  const [activeTab, setActiveTab] = useState<'overview' | 'attendance' | 'participation' | 'digital' | 'insights' | 'trends'>('overview')

  const getStatusColor = (value: number, thresholds: { good: number; warning: number }) => {
    if (value >= thresholds.good) return 'text-green-600'
    if (value >= thresholds.warning) return 'text-orange-600'
    return 'text-red-600'
  }

  const getTrendIcon = (trend: 'up' | 'down' | 'stable') => {
    switch (trend) {
      case 'up': return '📈'
      case 'down': return '📉'
      case 'stable': return '➡️'
    }
  }

  const getImpactColor = (impact: 'high' | 'medium' | 'low') => {
    switch (impact) {
      case 'high': return 'bg-green-100 text-green-800'
      case 'medium': return 'bg-yellow-100 text-yellow-800'
      case 'low': return 'bg-gray-100 text-gray-800'
    }
  }

  const getEngagementColor = (score: number) => {
    if (score >= 80) return 'text-green-600'
    if (score >= 60) return 'text-orange-600'
    return 'text-red-600'
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumb */}
        <div className="mb-6">
          <nav className="text-sm text-gray-500">
            <Link href="/lecturer/analytics" className="hover:text-blue-600">Analytics</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-900">Student Engagement</span>
          </nav>
        </div>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Student Engagement Analytics</h1>
          <p className="text-gray-600">Comprehensive insights into student participation and involvement</p>
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
                <option value="This semester">This semester</option>
                <option value="All time">All time</option>
              </select>

              <select
                value={selectedCourse}
                onChange={(e) => setSelectedCourse(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="All Courses">All Courses</option>
                <option value="CS101">CS101</option>
                <option value="CS201">CS201</option>
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
            <div className="text-2xl font-bold text-blue-600">{analytics.overview.totalStudents}</div>
            <div className="text-sm text-gray-600">Total Students</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="text-2xl font-bold text-green-600">{analytics.overview.activeStudents}</div>
            <div className="text-sm text-gray-600">Active Students</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className={`text-2xl font-bold ${getEngagementColor(analytics.overview.avgEngagementScore)}`}>
              {analytics.overview.avgEngagementScore.toFixed(1)}%
            </div>
            <div className="text-sm text-gray-600">Avg Engagement</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="text-2xl font-bold text-purple-600">{analytics.overview.highEngagementStudents}</div>
            <div className="text-sm text-gray-600">High Engagement</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="text-2xl font-bold text-red-600">{analytics.overview.atRiskStudents}</div>
            <div className="text-sm text-gray-600">At Risk</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="text-2xl font-bold text-orange-600">
              {getTrendIcon(analytics.overview.engagementTrend)}
            </div>
            <div className="text-sm text-gray-600">Trend</div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-lg shadow-sm mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {[
                { key: 'overview', label: 'Overview', icon: '📊' },
                { key: 'attendance', label: 'Attendance', icon: '✅' },
                { key: 'participation', label: 'Participation', icon: '🙋' },
                { key: 'digital', label: 'Digital Activity', icon: '💻' },
                { key: 'insights', label: 'Student Insights', icon: '👥' },
                { key: 'trends', label: 'Time Trends', icon: '📈' }
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
                <h3 className="text-lg font-semibold mb-4">Engagement Summary</h3>
                <div className="space-y-4">
                  <div className="p-4 bg-green-50 rounded-lg">
                    <div className="font-medium text-green-900">High Engagement Students</div>
                    <div className="text-2xl font-bold text-green-600">{analytics.overview.highEngagementStudents}</div>
                    <div className="text-sm text-green-700">
                      {((analytics.overview.highEngagementStudents / analytics.overview.totalStudents) * 100).toFixed(1)}% of class
                    </div>
                  </div>
                  <div className="p-4 bg-red-50 rounded-lg">
                    <div className="font-medium text-red-900">Students Needing Attention</div>
                    <div className="text-2xl font-bold text-red-600">{analytics.overview.atRiskStudents}</div>
                    <div className="text-sm text-red-700">
                      {((analytics.overview.atRiskStudents / analytics.overview.totalStudents) * 100).toFixed(1)}% of class
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold mb-4">Key Metrics</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Average Attendance</span>
                    <span className={`font-bold ${getStatusColor(analytics.attendanceAnalytics.overall.averageAttendance, { good: 85, warning: 75 })}`}>
                      {analytics.attendanceAnalytics.overall.averageAttendance.toFixed(1)}%
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Participation Score</span>
                    <span className={`font-bold ${getStatusColor(analytics.participationMetrics.overallScore, { good: 80, warning: 70 })}`}>
                      {analytics.participationMetrics.overallScore.toFixed(1)}%
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Assignment Submission Rate</span>
                    <span className={`font-bold ${getStatusColor(analytics.digitalEngagement.assignmentEngagement.submissionRate, { good: 90, warning: 80 })}`}>
                      {analytics.digitalEngagement.assignmentEngagement.submissionRate.toFixed(1)}%
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Communication Response Rate</span>
                    <span className={`font-bold ${getStatusColor(analytics.digitalEngagement.communicationPatterns.responseRate, { good: 85, warning: 75 })}`}>
                      {analytics.digitalEngagement.communicationPatterns.responseRate.toFixed(1)}%
                    </span>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-2 bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold mb-4">Engagement Drivers</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium text-green-900 mb-3">Positive Factors</h4>
                    <div className="space-y-2">
                      {analytics.engagementDrivers.positiveFactors.map((factor, idx) => (
                        <div key={idx} className="p-3 bg-green-50 rounded-lg">
                          <div className="font-medium text-green-800">{factor.factor}</div>
                          <div className="text-sm text-green-700">Impact: +{factor.impact}%</div>
                          <div className="text-xs text-green-600">{factor.description}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium text-red-900 mb-3">Areas for Improvement</h4>
                    <div className="space-y-2">
                      {analytics.engagementDrivers.negativeFactors.map((factor, idx) => (
                        <div key={idx} className="p-3 bg-red-50 rounded-lg">
                          <div className="font-medium text-red-800">{factor.factor}</div>
                          <div className="text-sm text-red-700">Impact: {factor.impact}%</div>
                          <div className="text-xs text-red-600">{factor.description}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Attendance Tab */}
          {activeTab === 'attendance' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold mb-4">Attendance by Course</h3>
                <div className="space-y-4">
                  {analytics.attendanceAnalytics.byCourse.map((course, idx) => (
                    <div key={idx} className="p-4 border rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium">{course.course}</span>
                        <div className="flex items-center gap-2">
                          <span className={`font-bold ${getStatusColor(course.attendance, { good: 85, warning: 75 })}`}>
                            {course.attendance.toFixed(1)}%
                          </span>
                          <span>{getTrendIcon(course.trend)}</span>
                        </div>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full" 
                          style={{width: `${course.attendance}%`}}
                        ></div>
                      </div>
                      <div className="text-sm text-gray-600">
                        Recent sessions: {course.sessions.map(s => `${s.present}/${s.total}`).join(', ')}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold mb-4">Attendance by Time Slot</h3>
                <div className="space-y-3">
                  {analytics.attendanceAnalytics.byTimeSlot.map((slot, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <div className="font-medium">{slot.timeSlot}</div>
                        <div className="text-sm text-gray-600">{slot.studentCount} students</div>
                      </div>
                      <div className={`text-lg font-bold ${getStatusColor(slot.attendance, { good: 85, warning: 75 })}`}>
                        {slot.attendance.toFixed(1)}%
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold mb-4">Attendance Patterns</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 bg-green-50 rounded-lg">
                    <div className="font-medium text-green-900">Best Day</div>
                    <div className="text-xl font-bold text-green-600">{analytics.attendanceAnalytics.patterns.bestDay}</div>
                  </div>
                  <div className="p-3 bg-red-50 rounded-lg">
                    <div className="font-medium text-red-900">Challenging Day</div>
                    <div className="text-xl font-bold text-red-600">{analytics.attendanceAnalytics.patterns.worstDay}</div>
                  </div>
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <div className="font-medium text-blue-900">Peak Time</div>
                    <div className="text-xl font-bold text-blue-600">{analytics.attendanceAnalytics.patterns.peakTime}</div>
                  </div>
                  <div className="p-3 bg-orange-50 rounded-lg">
                    <div className="font-medium text-orange-900">Low Time</div>
                    <div className="text-xl font-bold text-orange-600">{analytics.attendanceAnalytics.patterns.dropoffTime}</div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold mb-4">Attendance Distribution</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Consistent Attendees (90%+)</span>
                    <span className="font-bold text-green-600">{analytics.attendanceAnalytics.overall.consistentAttendees}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Irregular Attendees (&lt;75%)</span>
                    <span className="font-bold text-orange-600">{analytics.attendanceAnalytics.overall.irregularAttendees}</span>
                  </div>
                  <div className="mt-4 w-full bg-gray-200 rounded-full h-4">
                    <div className="bg-gradient-to-r from-green-500 via-yellow-500 to-red-500 h-4 rounded-full"></div>
                  </div>
                  <div className="flex justify-between text-xs text-gray-600">
                    <span>High</span>
                    <span>Medium</span>
                    <span>Low</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Participation Tab */}
          {activeTab === 'participation' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold mb-4">Participation Breakdown</h3>
                <div className="space-y-4">
                  <div className="p-4 border rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">Questions Asked</span>
                      <span className="text-lg font-bold text-blue-600">{analytics.participationMetrics.breakdown.questionsAsked.average.toFixed(1)}</span>
                    </div>
                    <div className="text-sm text-gray-600">
                      Total: {analytics.participationMetrics.breakdown.questionsAsked.total} questions
                    </div>
                    <div className="text-xs text-gray-500">
                      Top contributors: {analytics.participationMetrics.breakdown.questionsAsked.topStudents.join(', ')}
                    </div>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">Discussion Contributions</span>
                      <span className="text-lg font-bold text-green-600">{analytics.participationMetrics.breakdown.discussionContributions.average.toFixed(1)}</span>
                    </div>
                    <div className="text-sm text-gray-600">
                      Total: {analytics.participationMetrics.breakdown.discussionContributions.total} contributions
                    </div>
                    <div className="text-xs text-gray-500">
                      Top contributors: {analytics.participationMetrics.breakdown.discussionContributions.topStudents.join(', ')}
                    </div>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">Voluntary Responses</span>
                      <span className="text-lg font-bold text-purple-600">{analytics.participationMetrics.breakdown.voluntaryResponses.average.toFixed(1)}</span>
                    </div>
                    <div className="text-sm text-gray-600">
                      Total: {analytics.participationMetrics.breakdown.voluntaryResponses.total} responses
                    </div>
                    <div className="text-xs text-gray-500">
                      Top contributors: {analytics.participationMetrics.breakdown.voluntaryResponses.topStudents.join(', ')}
                    </div>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">Group Participation</span>
                      <span className="text-lg font-bold text-orange-600">{analytics.participationMetrics.breakdown.groupParticipation.average.toFixed(1)}</span>
                    </div>
                    <div className="text-sm text-gray-600">
                      Total: {analytics.participationMetrics.breakdown.groupParticipation.total} activities
                    </div>
                    <div className="text-xs text-gray-500">
                      Top contributors: {analytics.participationMetrics.breakdown.groupParticipation.topStudents.join(', ')}
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold mb-4">Participation by Course</h3>
                <div className="space-y-4">
                  {analytics.participationMetrics.byCourse.map((course, idx) => (
                    <div key={idx} className="p-4 border rounded-lg">
                      <div className="flex justify-between items-center mb-3">
                        <span className="font-medium">{course.course}</span>
                        <div className="flex items-center gap-2">
                          <span className={`font-bold ${getStatusColor(course.score, { good: 80, warning: 70 })}`}>
                            {course.score.toFixed(1)}%
                          </span>
                          {course.improvement !== 0 && (
                            <span className={`text-sm ${course.improvement > 0 ? 'text-green-600' : 'text-red-600'}`}>
                              {course.improvement > 0 ? '+' : ''}{course.improvement}%
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
                        <div 
                          className="bg-purple-600 h-2 rounded-full" 
                          style={{width: `${course.score}%`}}
                        ></div>
                      </div>
                      <div className="space-y-1">
                        {course.activities.map((activity, actIdx) => (
                          <div key={actIdx} className="flex justify-between text-sm">
                            <span className="text-gray-600">{activity.type}</span>
                            <span className="text-gray-900">{activity.score}% ({activity.count})</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Digital Activity Tab */}
          {activeTab === 'digital' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold mb-4">Platform Usage</h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <div className="font-medium text-blue-900">Total Logins</div>
                      <div className="text-2xl font-bold text-blue-600">{analytics.digitalEngagement.platformUsage.totalLogins}</div>
                    </div>
                    <div className="p-3 bg-green-50 rounded-lg">
                      <div className="font-medium text-green-900">Avg Session Time</div>
                      <div className="text-2xl font-bold text-green-600">{analytics.digitalEngagement.platformUsage.averageSessionTime}m</div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-3 bg-purple-50 rounded-lg">
                      <div className="font-medium text-purple-900">Daily Active</div>
                      <div className="text-2xl font-bold text-purple-600">{analytics.digitalEngagement.platformUsage.dailyActiveUsers}</div>
                    </div>
                    <div className="p-3 bg-orange-50 rounded-lg">
                      <div className="font-medium text-orange-900">Weekly Active</div>
                      <div className="text-2xl font-bold text-orange-600">{analytics.digitalEngagement.platformUsage.weeklyActiveUsers}</div>
                    </div>
                  </div>
                  <div>
                    <div className="font-medium text-gray-700 mb-2">Peak Usage Hours</div>
                    <div className="flex flex-wrap gap-2">
                      {analytics.digitalEngagement.platformUsage.peakUsageHours.map(hour => (
                        <span key={hour} className="px-3 py-1 bg-cyan-100 text-cyan-800 rounded-full text-sm">
                          {hour}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold mb-4">Resource Interaction</h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-3 bg-indigo-50 rounded-lg">
                      <div className="font-medium text-indigo-900">Total Downloads</div>
                      <div className="text-2xl font-bold text-indigo-600">{analytics.digitalEngagement.resourceInteraction.totalDownloads}</div>
                    </div>
                    <div className="p-3 bg-teal-50 rounded-lg">
                      <div className="font-medium text-teal-900">Avg per Student</div>
                      <div className="text-2xl font-bold text-teal-600">{analytics.digitalEngagement.resourceInteraction.averageDownloadsPerStudent.toFixed(1)}</div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Most Accessed Resources</h4>
                    <div className="space-y-2">
                      {analytics.digitalEngagement.resourceInteraction.mostAccessedResources.map((resource, idx) => (
                        <div key={idx} className="p-2 bg-green-50 rounded-lg">
                          <div className="flex justify-between">
                            <span className="font-medium text-green-900">{resource.name}</span>
                            <span className="text-green-600">{resource.downloads} downloads</span>
                          </div>
                          <div className="text-sm text-green-700">
                            {resource.category} • {resource.engagementScore}% engagement
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold mb-4">Assignment Engagement</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Submission Rate</span>
                    <span className={`font-bold ${getStatusColor(analytics.digitalEngagement.assignmentEngagement.submissionRate, { good: 90, warning: 80 })}`}>
                      {analytics.digitalEngagement.assignmentEngagement.submissionRate.toFixed(1)}%
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">On-Time Submissions</span>
                    <span className={`font-bold ${getStatusColor(analytics.digitalEngagement.assignmentEngagement.onTimeSubmissions, { good: 85, warning: 75 })}`}>
                      {analytics.digitalEngagement.assignmentEngagement.onTimeSubmissions.toFixed(1)}%
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Quality Score</span>
                    <span className={`font-bold ${getStatusColor(analytics.digitalEngagement.assignmentEngagement.qualityScore, { good: 80, warning: 70 })}`}>
                      {analytics.digitalEngagement.assignmentEngagement.qualityScore.toFixed(1)}%
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Revision Rate</span>
                    <span className="font-bold text-blue-600">
                      {analytics.digitalEngagement.assignmentEngagement.revisionRate.toFixed(1)}%
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Help Requests/Assignment</span>
                    <span className="font-bold text-purple-600">
                      {analytics.digitalEngagement.assignmentEngagement.helpRequestsPerAssignment.toFixed(1)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold mb-4">Communication Patterns</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Messages Exchanged</span>
                    <span className="font-bold text-blue-600">{analytics.digitalEngagement.communicationPatterns.messagesExchanged}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Response Rate</span>
                    <span className={`font-bold ${getStatusColor(analytics.digitalEngagement.communicationPatterns.responseRate, { good: 85, warning: 75 })}`}>
                      {analytics.digitalEngagement.communicationPatterns.responseRate.toFixed(1)}%
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Student-Initiated</span>
                    <span className="font-bold text-green-600">{analytics.digitalEngagement.communicationPatterns.initiatedConversations}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Office Hours Bookings</span>
                    <span className="font-bold text-purple-600">{analytics.digitalEngagement.communicationPatterns.officeHoursBookings}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Avg Response Time</span>
                    <span className="font-bold text-orange-600">{analytics.digitalEngagement.communicationPatterns.averageResponseTime.toFixed(1)}h</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Student Insights Tab */}
          {activeTab === 'insights' && (
            <div className="grid grid-cols-1 gap-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h3 className="text-lg font-semibold mb-4 text-green-900">🌟 High Performers</h3>
                  <div className="space-y-3">
                    {analytics.individualStudentInsights.highPerformers.map((student, idx) => (
                      <div key={idx} className="p-3 bg-green-50 rounded-lg">
                        <div className="font-medium text-green-900">{student.name}</div>
                        <div className="text-lg font-bold text-green-600">{student.engagementScore.toFixed(1)}%</div>
                        <div className="text-sm text-green-700">
                          {student.contributions} total contributions
                        </div>
                        <div className="text-xs text-green-600 mt-1">
                          Strengths: {student.strengths.join(', ')}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h3 className="text-lg font-semibold mb-4 text-red-900">⚠️ Needs Attention</h3>
                  <div className="space-y-3">
                    {analytics.individualStudentInsights.needsAttention.map((student, idx) => (
                      <div key={idx} className="p-3 bg-red-50 rounded-lg">
                        <div className="font-medium text-red-900">{student.name}</div>
                        <div className="text-lg font-bold text-red-600">{student.engagementScore.toFixed(1)}%</div>
                        <div className="text-sm text-red-700">
                          Last active: {new Date(student.lastActivity).toLocaleDateString()}
                        </div>
                        <div className="text-xs text-red-600 mt-1">
                          Concerns: {student.concerns.join(', ')}
                        </div>
                        <div className="text-xs text-red-800 mt-2">
                          Actions: {student.recommendedActions.slice(0, 2).join(', ')}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h3 className="text-lg font-semibold mb-4 text-blue-900">📈 Most Improved</h3>
                  <div className="space-y-3">
                    {analytics.individualStudentInsights.mostImproved.map((student, idx) => (
                      <div key={idx} className="p-3 bg-blue-50 rounded-lg">
                        <div className="font-medium text-blue-900">{student.name}</div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-blue-700">{student.previousScore.toFixed(1)}%</span>
                          <span className="text-blue-600">→</span>
                          <span className="text-lg font-bold text-blue-600">{student.currentScore.toFixed(1)}%</span>
                        </div>
                        <div className="text-sm text-blue-700">
                          +{student.improvement.toFixed(1)}% improvement
                        </div>
                        <div className="text-xs text-blue-600 mt-1">
                          Areas: {student.areas.join(', ')}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold mb-4">💡 Recommended Actions</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {analytics.engagementDrivers.recommendations.map((rec, idx) => (
                    <div key={idx} className="p-4 border rounded-lg">
                      <div className="flex justify-between items-start mb-2">
                        <div className="font-medium text-gray-900">{rec.category}</div>
                        <div className="flex gap-2">
                          <span className={`px-2 py-1 rounded text-xs ${getImpactColor(rec.expectedImpact)}`}>
                            {rec.expectedImpact} impact
                          </span>
                          <span className={`px-2 py-1 rounded text-xs ${getImpactColor(rec.effort)}`}>
                            {rec.effort} effort
                          </span>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600">{rec.suggestion}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Time Trends Tab */}
          {activeTab === 'trends' && (
            <div className="grid grid-cols-1 gap-6">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold mb-4">Weekly Engagement Trends</h3>
                <div className="space-y-4">
                  {analytics.timeBasedAnalysis.weeklyTrends.map((week, idx) => (
                    <div key={idx} className="p-4 border rounded-lg">
                      <div className="flex justify-between items-center mb-3">
                        <span className="font-medium text-gray-900">{week.week}</span>
                        <span className="text-sm text-gray-600">
                          Overall: {((week.attendance + week.participation + week.digitalActivity + week.assignments) / 4).toFixed(1)}%
                        </span>
                      </div>
                      <div className="grid grid-cols-4 gap-4">
                        <div className="text-center">
                          <div className="text-sm text-gray-600">Attendance</div>
                          <div className={`text-lg font-bold ${getStatusColor(week.attendance, { good: 85, warning: 75 })}`}>
                            {week.attendance}%
                          </div>
                        </div>
                        <div className="text-center">
                          <div className="text-sm text-gray-600">Participation</div>
                          <div className={`text-lg font-bold ${getStatusColor(week.participation, { good: 80, warning: 70 })}`}>
                            {week.participation}%
                          </div>
                        </div>
                        <div className="text-center">
                          <div className="text-sm text-gray-600">Digital Activity</div>
                          <div className={`text-lg font-bold ${getStatusColor(week.digitalActivity, { good: 80, warning: 70 })}`}>
                            {week.digitalActivity}%
                          </div>
                        </div>
                        <div className="text-center">
                          <div className="text-sm text-gray-600">Assignments</div>
                          <div className={`text-lg font-bold ${getStatusColor(week.assignments, { good: 90, warning: 80 })}`}>
                            {week.assignments}%
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h3 className="text-lg font-semibold mb-4">Seasonal Patterns</h3>
                  <div className="space-y-3">
                    {analytics.timeBasedAnalysis.seasonalPatterns.map((pattern, idx) => (
                      <div key={idx} className="p-3 border rounded-lg">
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-medium">{pattern.period}</span>
                          <span className={`font-bold ${getEngagementColor(pattern.avgEngagement)}`}>
                            {pattern.avgEngagement.toFixed(1)}%
                          </span>
                        </div>
                        <div className="text-sm text-gray-600">
                          Factors: {pattern.factors.join(', ')}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h3 className="text-lg font-semibold mb-4">Critical Periods</h3>
                  <div className="space-y-3">
                    {analytics.timeBasedAnalysis.criticalPeriods.map((period, idx) => (
                      <div key={idx} className="p-3 bg-orange-50 rounded-lg">
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-medium text-orange-900">{period.period}</span>
                          <span className="text-sm px-2 py-1 bg-orange-200 text-orange-800 rounded">
                            {period.type}
                          </span>
                        </div>
                        <div className="text-sm text-orange-700">
                          Engagement drop: {period.engagementDrop}%
                        </div>
                        <div className="text-sm text-orange-600">
                          Recovery time: {period.recoveryTime}
                        </div>
                      </div>
                    ))}
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