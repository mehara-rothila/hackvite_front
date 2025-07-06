// app/lecturer/dashboard/page.tsx
'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { AuthService } from '../../../lib/auth'
import { LecturerUser } from '../../../types'
import './lecturer-dashboard.css'

// Type definitions for dashboard data
interface DashboardStat {
  value: number | string
  label: string
  icon: string
  color: string
}

interface RecentQuery {
  student: string
  subject: string
  course: string
  time: string
  priority: string
  unread: boolean
}

interface QuickAction {
  label: string
  icon: string
  color: string
  href: string
}

interface ScheduleItem {
  title: string
  time: string
  status: string
  color: string
}

interface WeeklyInsight {
  label: string
  value: string
  highlight?: boolean
}

export default function LecturerDashboard() {
  const [user, setUser] = useState<LecturerUser | null>(null)
  const [loading, setLoading] = useState(true)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const router = useRouter()

  // Get mock data from CSS custom properties
  const getDataFromCSS = (property: string): Record<string, unknown> => {
    try {
      const cssData = getComputedStyle(document.documentElement).getPropertyValue(property)
      return JSON.parse(cssData.replace(/\\'/g, "'"))
    } catch {
      return {}
    }
  }

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ 
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100
      })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  useEffect(() => {
    const currentUser = AuthService.getCurrentUser()
    
    if (!currentUser) {
      router.push('/login')
      return
    }
    
    if (currentUser.role !== 'lecturer') {
      router.push('/student/dashboard')
      return
    }
    
    setUser(currentUser as LecturerUser)
    setLoading(false)
  }, [router])

  const handleLogout = () => {
    AuthService.logout()
    router.push('/')
  }

  // Get data from CSS with proper typing
  const dashboardStats = getDataFromCSS('--dashboard-stats') as Record<string, DashboardStat>
  const recentQueries = getDataFromCSS('--recent-queries') as Record<string, RecentQuery>
  const quickActions = getDataFromCSS('--quick-actions') as Record<string, QuickAction>
  const scheduleItems = getDataFromCSS('--schedule-items') as Record<string, ScheduleItem>
  const weeklyInsights = getDataFromCSS('--weekly-insights') as Record<string, WeeklyInsight>

  const statsArray = Object.entries(dashboardStats).map(([key, data]) => ({
    key,
    ...data
  }))

  const queriesArray = Object.entries(recentQueries).map(([key, data]) => ({
    key,
    ...data
  }))

  const actionsArray = Object.entries(quickActions).map(([key, data]) => ({
    key,
    ...data
  }))

  const scheduleArray = Object.entries(scheduleItems).map(([key, data]) => ({
    key,
    ...data
  }))

  const insightsArray = Object.entries(weeklyInsights).map(([key, data]) => ({
    key,
    ...data
  }))

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center relative overflow-hidden mock-data-container">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-100/40 via-blue-100/35 to-emerald-100/40 animate-mesh-drift-1" />
          <div className="absolute inset-0 bg-gradient-to-tr from-blue-100/35 via-purple-100/30 to-orange-100/35 animate-mesh-drift-2" />
        </div>
        <div className="relative z-10">
          <div className="loading-spinner w-16 h-16 mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Loading Dashboard...</p>
        </div>
      </div>
    )
  }

  if (!user) return null

  return (
    <div className="lecturer-dashboard-container mock-data-container">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0 opacity-20 transition-all duration-700 ease-out"
          style={{
            background: `radial-gradient(800px circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(147, 51, 234, 0.2) 0%, rgba(59, 130, 246, 0.15) 25%, transparent 50%)`
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-purple-100/40 via-blue-100/35 to-emerald-100/40 animate-mesh-drift-1" />
        <div className="absolute inset-0 bg-gradient-to-tr from-blue-100/35 via-purple-100/30 to-orange-100/35 animate-mesh-drift-2" />
        <div className="absolute inset-0 bg-gradient-to-bl from-emerald-100/40 via-blue-100/25 to-purple-100/40 animate-mesh-drift-3" />
        <div className="absolute inset-0 bg-gradient-to-r from-orange-100/30 via-transparent to-purple-100/30 animate-mesh-drift-4" />
      </div>

      {/* Academic Equations & Particles */}
      <div className="absolute inset-0 z-0 academic-equation-1 academic-equation-2 academic-equation-3 academic-equation-4 academic-equation-5 academic-equation-6">
        <div className="academic-particles">
          {[...Array(16)].map((_, i) => (
            <div key={i} className="academic-particle" />
          ))}
        </div>
      </div>

      {/* Glass Orbs */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-16 left-16 w-80 h-80 bg-gradient-to-br from-purple-200/20 to-blue-200/15 rounded-full backdrop-blur-sm border border-purple-300/30 animate-glass-float-1 shadow-lg" />
        <div className="absolute top-32 right-24 w-96 h-96 bg-gradient-to-br from-blue-200/20 to-emerald-200/15 rounded-full backdrop-blur-sm border border-blue-300/30 animate-glass-float-2 shadow-lg" />
        <div className="absolute bottom-24 left-32 w-88 h-88 bg-gradient-to-br from-emerald-200/20 to-purple-200/15 rounded-full backdrop-blur-sm border border-emerald-300/25 animate-glass-float-3 shadow-lg" />
      </div>

      {/* Navigation Header */}
      <nav className="lecturer-nav">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/" className="flex items-center">
                <div className="w-8 h-8 logo rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">E</span>
                </div>
                <span className="ml-3 text-xl font-bold text-gray-900">EduLink Pro</span>
              </Link>
              <div className="ml-8">
                <span className="text-sm text-gray-600 font-medium">Lecturer Portal</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-700 font-medium">
                Welcome, <span className="font-bold">{user.title} {user.lastName}</span>
              </div>
              <button
                onClick={handleLogout}
                className="logout-btn text-sm text-gray-600"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="lecturer-main-content max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        
        {/* Welcome Section */}
        <div className="lecturer-welcome mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Welcome back, {user.title} {user.lastName}! 👨‍🏫
          </h1>
          <p className="text-gray-600 text-lg font-medium">
            {user.department} • {user.university}
            {user.specialization && ` • ${user.specialization}`}
          </p>
          {user.officeLocation && (
            <p className="text-sm text-gray-500 mt-2 font-medium">
              📍 Office: {user.officeLocation}
            </p>
          )}
        </div>

        {/* Quick Stats */}
        <div className="stats-grid">
          {statsArray.map((stat) => (
            <div key={stat.key} className="stat-card">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className={`stat-icon ${stat.color}`}>
                    <span>{stat.icon}</span>
                  </div>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-bold text-gray-600">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Main Dashboard Grid */}
        <div className="dashboard-grid">
          
          {/* Recent Student Queries */}
          <div className="glass-card">
            <div className="glass-card-header">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-bold text-gray-900">Recent Student Queries</h2>
                <span className="px-3 py-1 text-xs bg-red-100 text-red-800 rounded-full font-bold">
                  {dashboardStats.pendingQueries?.value || 12} pending
                </span>
              </div>
            </div>
            <div className="glass-card-content">
              <div className="space-y-4">
                {queriesArray.map((query) => (
                  <div 
                    key={query.key} 
                    className={`query-item flex items-start space-x-3 ${query.unread ? 'unread' : 'read'}`}
                  >
                    <div className="query-avatar">
                      <span>
                        {query.student.split(' ').map((n: string) => n[0]).join('')}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center space-x-2">
                          <p className={`text-sm font-bold ${query.unread ? 'text-gray-900' : 'text-gray-700'}`}>
                            {query.student}
                          </p>
                          <span className="text-xs text-gray-500 font-medium">• {query.course}</span>
                          <span className={`priority-badge ${query.priority}`}>
                            {query.priority}
                          </span>
                        </div>
                        <p className="text-xs text-gray-500 font-medium">{query.time}</p>
                      </div>
                      <p className={`text-sm ${query.unread ? 'text-gray-900' : 'text-gray-600'} font-medium truncate`}>
                        {query.subject}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6">
                <Link href="/lecturer/queries" className="view-all-link">
                  View all queries →
                </Link>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            
            {/* Quick Actions */}
            <div className="glass-card">
              <div className="glass-card-header">
                <h2 className="text-lg font-bold text-gray-900">Quick Actions</h2>
              </div>
              <div className="glass-card-content space-y-3">
                {actionsArray.map((action) => (
                  <Link 
                    key={action.key}
                    href={action.href}
                    className={`quick-action ${action.color}`}
                  >
                    <span className="text-lg mr-3">{action.icon}</span>
                    <span className="text-sm font-bold">{action.label}</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Today Schedule */}
            <div className="glass-card">
              <div className="glass-card-header">
                <h2 className="text-lg font-bold text-gray-900">Today Schedule</h2>
              </div>
              <div className="glass-card-content">
                <div className="space-y-3">
                  {scheduleArray.map((item) => (
                    <div key={item.key} className={`schedule-item ${item.color}`}>
                      <div>
                        <p className="text-sm font-bold text-gray-900">{item.title}</p>
                        <p className="text-xs text-gray-600 font-medium">{item.time}</p>
                      </div>
                      <span className={`status-badge ${item.status.toLowerCase()}`}>
                        {item.status}
                      </span>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6">
                  <Link href="/lecturer/appointments" className="view-all-link">
                    View full schedule →
                  </Link>
                </div>
              </div>
            </div>

            {/* Weekly Insights */}
            <div className="glass-card">
              <div className="glass-card-header">
                <h2 className="text-lg font-bold text-gray-900">This Week Insights</h2>
              </div>
              <div className="glass-card-content">
                <div className="space-y-3">
                  {insightsArray.map((insight) => (
                    <div key={insight.key} className="insight-item">
                      <span className="text-sm text-gray-600 font-medium">{insight.label}</span>
                      <span className={`text-sm font-bold ${insight.highlight ? 'insight-value highlight' : 'text-gray-900'}`}>
                        {insight.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Navigation for Mobile */}
        <div className="md:hidden fixed bottom-0 left-0 right-0 mobile-nav">
          <div className="grid grid-cols-4 py-2">
            <Link href="/lecturer/dashboard" className="mobile-nav-item active">
              <span className="text-lg">🏠</span>
              <span className="text-xs font-medium">Home</span>
            </Link>
            <Link href="/lecturer/queries" className="mobile-nav-item">
              <span className="text-lg">📥</span>
              <span className="text-xs font-medium">Queries</span>
            </Link>
            <Link href="/lecturer/appointments" className="mobile-nav-item">
              <span className="text-lg">📅</span>
              <span className="text-xs font-medium">Schedule</span>
            </Link>
            <Link href="/lecturer/analytics" className="mobile-nav-item">
              <span className="text-lg">📊</span>
              <span className="text-xs font-medium">Analytics</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}