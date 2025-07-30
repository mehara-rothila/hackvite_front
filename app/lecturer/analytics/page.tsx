// app/lecturer/analytics/page.tsx - ENHANCED WITH GLASSMORPHISM & VECTOR ICONS
'use client'

import { useState } from 'react'
import Link from 'next/link'
import React from 'react'

// --- Interfaces (Unchanged) ---
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

// --- Mock Data (Unchanged) ---
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

const TABS: { key: ActiveTab; label: string; icon: React.ReactNode }[] = [
  { key: 'overview', label: 'Overview', icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M4 4h4v4H4zm6 0h4v4h-4zm6 0h4v4h-4zM4 10h4v4H4zm6 0h4v4h-4zm6 0h4v4h-4zM4 16h4v4H4zm6 1h4v2h-4zm6-1h4v4h-4z"/></svg> },
  { key: 'queries', label: 'Query Analytics', icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg> },
  { key: 'engagement', label: 'Student Engagement', icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/></svg> },
  { key: 'communication', label: 'Communication', icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 9h12v2H6V9zm8 5H6v-2h8v2zm4-6H6V6h12v2z"/></svg> },
  { key: 'insights', label: 'Performance Insights', icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm4.25-4.5l1.42 1.42-4.24 4.24-1.42-1.42z"/></svg> }
];

export default function LecturerAnalyticsPage() {
  const [analytics] = useState<AnalyticsData>(mockAnalytics)
  const [timeRange, setTimeRange] = useState('Last 7 days')
  const [selectedCourse, setSelectedCourse] = useState('All Courses')
  const [activeTab, setActiveTab] = useState<ActiveTab>('overview')

  const getTrendIcon = (trend: 'up' | 'down' | 'stable') => {
    switch (trend) {
      case 'up': return <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
      case 'down': return <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17l5-5m0 0l-5-5m5 5H6" /></svg>
      case 'stable': return <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 17l-5-5m0 0l5-5m-5 5h12" /></svg>
    }
  }

  const getPriorityColor = (priority: 'high' | 'medium' | 'low') => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800'
      case 'medium': return 'bg-orange-100 text-orange-800'
      case 'low': return 'bg-green-100 text-green-800'
    }
  }

  const getPerformanceColor = (score: number, max: number = 5) => {
    const percentage = (score / max) * 100
    if (percentage >= 80) return 'text-green-500'
    if (percentage >= 60) return 'text-blue-500'
    if (percentage >= 40) return 'text-orange-500'
    return 'text-red-500'
  }

  const formatTime = (hours: number) => {
    if (hours < 1) return `${Math.round(hours * 60)}m`
    return `${hours.toFixed(1)}h`
  }

  return (
    <>
      {/* --- START: Global Styles & Animations --- */}
      <style jsx global>{`
        /* All the animations from the login page */
        @keyframes mesh-drift-1 { 0%, 100% { transform: rotate(0deg) scale(1) translate(0, 0); } 33% { transform: rotate(120deg) scale(1.1) translate(20px, -20px); } 66% { transform: rotate(240deg) scale(0.9) translate(-20px, 20px); } }
        .animate-mesh-drift-1 { animation: mesh-drift-1 40s ease-in-out infinite; }
        @keyframes mesh-drift-2 { 0%, 100% { transform: rotate(0deg) scale(1) translate(0, 0); } 25% { transform: rotate(90deg) scale(1.2) translate(-30px, 10px); } 50% { transform: rotate(180deg) scale(0.8) translate(10px, -30px); } 75% { transform: rotate(270deg) scale(1.1) translate(20px, 20px); } }
        .animate-mesh-drift-2 { animation: mesh-drift-2 50s ease-in-out infinite; }
        @keyframes mesh-drift-3 { 0%, 100% { transform: rotate(0deg) scale(1) translate(0, 0); } 50% { transform: rotate(180deg) scale(1.3) translate(-10px, 10px); } }
        .animate-mesh-drift-3 { animation: mesh-drift-3 35s ease-in-out infinite; }
        @keyframes mesh-drift-4 { 0%, 100% { transform: rotate(0deg) scale(1) translate(0, 0); } 25% { transform: rotate(90deg) scale(1.1) translate(15px, -15px); } 50% { transform: rotate(180deg) scale(0.9) translate(-15px, -15px); } 75% { transform: rotate(270deg) scale(1.05) translate(-15px, 15px); } }
        .animate-mesh-drift-4 { animation: mesh-drift-4 45s ease-in-out infinite; }
        @keyframes equation-float-1 { 0%, 100% { transform: translateY(0px) translateX(0px) rotate(0deg); opacity: 0.8; } 25% { transform: translateY(-30px) translateX(20px) rotate(5deg); opacity: 1; } 50% { transform: translateY(-15px) translateX(40px) rotate(-3deg); opacity: 0.7; } 75% { transform: translateY(-25px) translateX(10px) rotate(7deg); opacity: 0.9; } }
        .animate-equation-float-1 { animation: equation-float-1 12s ease-in-out infinite; }
        @keyframes equation-float-2 { 0%, 100% { transform: translateY(0px) translateX(0px) rotate(0deg); opacity: 0.8; } 33% { transform: translateY(-40px) translateX(-30px) rotate(-8deg); opacity: 1; } 66% { transform: translateY(-20px) translateX(-15px) rotate(5deg); opacity: 0.7; } }
        .animate-equation-float-2 { animation: equation-float-2 15s ease-in-out infinite; }
        @keyframes equation-float-3 { 0%, 100% { transform: translateY(0px) translateX(0px) rotate(0deg); opacity: 0.8; } 50% { transform: translateY(-35px) translateX(25px) rotate(-10deg); opacity: 1; } }
        .animate-equation-float-3 { animation: equation-float-3 10s ease-in-out infinite; }
        @keyframes equation-float-4 { 0%, 100% { transform: translateY(0px) translateX(0px) rotate(0deg); opacity: 0.8; } 20% { transform: translateY(-25px) translateX(15px) rotate(4deg); opacity: 1; } 40% { transform: translateY(-45px) translateX(-10px) rotate(-6deg); opacity: 0.7; } 60% { transform: translateY(-30px) translateX(30px) rotate(8deg); opacity: 0.9; } 80% { transform: translateY(-15px) translateX(-20px) rotate(-3deg); opacity: 0.8; } }
        .animate-equation-float-4 { animation: equation-float-4 18s ease-in-out infinite; }
        @keyframes particle-drift-1 { 0%, 100% { transform: translateY(0px) translateX(0px) rotate(0deg); opacity: 0.6; } 25% { transform: translateY(-120px) translateX(80px) rotate(90deg); opacity: 0.9; } 50% { transform: translateY(-80px) translateX(160px) rotate(180deg); opacity: 0.7; } 75% { transform: translateY(-200px) translateX(40px) rotate(270deg); opacity: 1; } }
        .animate-particle-drift-1 { animation: particle-drift-1 15s ease-in-out infinite; }
        @keyframes particle-drift-2 { 0%, 100% { transform: translateY(0px) translateX(0px) rotate(0deg); opacity: 0.5; } 33% { transform: translateY(-100px) translateX(-60px) rotate(120deg); opacity: 0.8; } 66% { transform: translateY(-160px) translateX(120px) rotate(240deg); opacity: 0.6; } }
        .animate-particle-drift-2 { animation: particle-drift-2 18s ease-in-out infinite; }
        @keyframes particle-drift-3 { 0%, 100% { transform: translateY(0px) translateX(0px) rotate(0deg); opacity: 0.7; } 50% { transform: translateY(-250px) translateX(-40px) rotate(180deg); opacity: 0.3; } }
        .animate-particle-drift-3 { animation: particle-drift-3 22s ease-in-out infinite; }
        @keyframes particle-drift-4 { 0%, 100% { transform: translateY(0px) translateX(0px) rotate(0deg); opacity: 0.8; } 25% { transform: translateY(-80px) translateX(100px) rotate(90deg); opacity: 0.4; } 75% { transform: translateY(-180px) translateX(-80px) rotate(270deg); opacity: 0.9; } }
        .animate-particle-drift-4 { animation: particle-drift-4 20s ease-in-out infinite; }
        @keyframes glass-float-1 { 0%, 100% { transform: translate(0, 0) rotate(0deg) scale(1); } 25% { transform: translate(30px, -50px) rotate(90deg) scale(1.1); } 50% { transform: translate(-20px, -30px) rotate(180deg) scale(0.9); } 75% { transform: translate(-40px, 40px) rotate(270deg) scale(1.05); } }
        .animate-glass-float-1 { animation: glass-float-1 45s ease-in-out infinite; }
        @keyframes glass-float-2 { 0%, 100% { transform: translate(0, 0) rotate(0deg) scale(1); } 33% { transform: translate(-60px, 40px) rotate(120deg) scale(1.2); } 66% { transform: translate(40px, -60px) rotate(240deg) scale(0.8); } }
        .animate-glass-float-2 { animation: glass-float-2 55s ease-in-out infinite; }
        @keyframes glass-float-3 { 0%, 100% { transform: translate(0, 0) rotate(0deg) scale(1); } 20% { transform: translate(40px, -20px) rotate(72deg) scale(1.1); } 40% { transform: translate(-30px, -40px) rotate(144deg) scale(0.9); } 60% { transform: translate(-50px, 30px) rotate(216deg) scale(1.15); } 80% { transform: translate(20px, 50px) rotate(288deg) scale(0.95); } }
        .animate-glass-float-3 { animation: glass-float-3 60s ease-in-out infinite; }
        @keyframes glass-float-4 { 0%, 100% { transform: translate(0, 0) rotate(0deg) scale(1); } 50% { transform: translate(-30px, -30px) rotate(180deg) scale(1.3); } }
        .animate-glass-float-4 { animation: glass-float-4 42s ease-in-out infinite; }
        @keyframes bubble-drift-1 { 0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.7; } 25% { transform: translate(60px, -80px) scale(1.2); opacity: 0.9; } 50% { transform: translate(-40px, -60px) scale(0.8); opacity: 0.5; } 75% { transform: translate(-80px, 40px) scale(1.1); opacity: 0.8; } }
        .animate-bubble-drift-1 { animation: bubble-drift-1 30s ease-in-out infinite; }
        @keyframes bubble-drift-2 { 0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.6; } 33% { transform: translate(-70px, 60px) scale(1.3); opacity: 1; } 66% { transform: translate(50px, -50px) scale(0.7); opacity: 0.4; } }
        .animate-bubble-drift-2 { animation: bubble-drift-2 38s ease-in-out infinite; }
        @keyframes bubble-drift-3 { 0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.8; } 50% { transform: translate(30px, 70px) scale(1.4); opacity: 0.3; } }
        .animate-bubble-drift-3 { animation: bubble-drift-3 25s ease-in-out infinite; }
        @keyframes aurora-glow { 0%, 100% { opacity: 0.6; transform: scale(1) rotate(0deg); } 25% { opacity: 0.8; transform: scale(1.05) rotate(90deg); } 50% { opacity: 0.4; transform: scale(0.95) rotate(180deg); } 75% { opacity: 0.9; transform: scale(1.1) rotate(270deg); } }
        .animate-aurora-glow { animation: aurora-glow 8s ease-in-out infinite; }
        @keyframes glass-fade-in { 0% { opacity: 0; transform: translateY(30px) scale(0.95); } 100% { opacity: 1; transform: translateY(0) scale(1); } }
        .animate-glass-fade-in { animation: glass-fade-in 1.2s ease-out forwards; }
        @keyframes slide-up-delayed { 0% { opacity: 0; transform: translateY(40px); } 100% { opacity: 1; transform: translateY(0); } }
        .animate-slide-up-delayed { animation: slide-up-delayed 0.8s ease-out 0.2s forwards; opacity: 0; }
        .animate-slide-up-delayed-2 { animation: slide-up-delayed 0.8s ease-out 0.4s forwards; opacity: 0; }
        .animate-slide-up-delayed-3 { animation: slide-up-delayed 0.8s ease-out 0.6s forwards; opacity: 0; }
        .animate-slide-up-delayed-4 { animation: slide-up-delayed 0.8s ease-out 0.8s forwards; opacity: 0; }
        .animate-slide-up-delayed-5 { animation: slide-up-delayed 0.8s ease-out 1.0s forwards; opacity: 0; }
        .animate-slide-up-delayed-6 { animation: slide-up-delayed 0.8s ease-out 1.2s forwards; opacity: 0; }
        .animate-slide-up-delayed-7 { animation: slide-up-delayed 0.8s ease-out 1.4s forwards; opacity: 0; }
        .animate-slide-up-delayed-8 { animation: slide-up-delayed 0.8s ease-out 1.6s forwards; opacity: 0; }
        .animate-slide-up-delayed-9 { animation: slide-up-delayed 0.8s ease-out 1.8s forwards; opacity: 0; }
        .floating-icon { animation: float 6s ease-in-out infinite; }
        .floating-icon-reverse { animation: float-reverse 7s ease-in-out infinite; }
        .floating-icon-slow { animation: float 10s ease-in-out infinite; }
        @keyframes float { 0% { transform: translateY(0) rotate(0deg); } 50% { transform: translateY(-15px) rotate(5deg); } 100% { transform: translateY(0) rotate(0deg); } }
        @keyframes float-reverse { 0% { transform: translateY(0) rotate(0deg); } 50% { transform: translateY(15px) rotate(-5deg); } 100% { transform: translateY(0) rotate(0deg); } }
        
        /* Enhanced Glassmorphism Card Styles */
        .glass-card { 
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.5)); 
          backdrop-filter: blur(40px) saturate(120%); 
          border: 1px solid rgba(255, 255, 255, 0.9); 
          box-shadow: 
            0 12px 40px rgba(31, 38, 135, 0.2), 
            0 0 0 1px rgba(255, 255, 255, 0.6) inset, 
            0 4px 16px rgba(255, 255, 255, 0.8) inset;
        }
        .glass-stat-card { 
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.85), rgba(255, 255, 255, 0.4)); 
          backdrop-filter: blur(32px) saturate(110%); 
          border: 1px solid rgba(255, 255, 255, 0.85); 
          box-shadow: 
            0 8px 32px rgba(31, 38, 135, 0.15), 
            0 0 0 1px rgba(255, 255, 255, 0.5) inset,
            0 2px 12px rgba(255, 255, 255, 0.9) inset; 
        }
        .glass-activity-card { 
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.3)); 
          backdrop-filter: blur(28px) saturate(105%); 
          border: 1px solid rgba(255, 255, 255, 0.75); 
          box-shadow: 
            0 6px 24px rgba(31, 38, 135, 0.12), 
            0 0 0 1px rgba(255, 255, 255, 0.4) inset,
            0 1px 8px rgba(255, 255, 255, 0.7) inset; 
        }
        .glass-sidebar-card { 
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.88), rgba(255, 255, 255, 0.45)); 
          backdrop-filter: blur(36px) saturate(115%); 
          border: 1px solid rgba(255, 255, 255, 0.9); 
          box-shadow: 
            0 10px 36px rgba(31, 38, 135, 0.18), 
            0 0 0 1px rgba(255, 255, 255, 0.55) inset,
            0 3px 14px rgba(255, 255, 255, 0.85) inset; 
        }
        .glass-premium-card {
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.92), rgba(255, 255, 255, 0.55)); 
          backdrop-filter: blur(44px) saturate(125%); 
          border: 1px solid rgba(255, 255, 255, 0.95); 
          box-shadow: 
            0 16px 48px rgba(31, 38, 135, 0.25), 
            0 0 0 1px rgba(255, 255, 255, 0.7) inset,
            0 6px 20px rgba(255, 255, 255, 0.95) inset,
            0 0 60px rgba(59, 130, 246, 0.1); 
        }
        .text-clean-shadow { filter: drop-shadow(0 2px 4px rgba(59, 130, 246, 0.2)); }
      `}</style>
      {/* --- END: Global Styles & Animations --- */}

      <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
        
        {/* --- START: Multi-Layered Animated Background --- */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0">
          {/* Layer 1: Floating Symbols */}
          <div className="absolute top-[7%] left-[13%] text-purple-500 text-9xl opacity-75 floating-icon">∑</div>
          <div className="absolute top-[33%] right-[17%] text-blue-500 text-8xl opacity-70 floating-icon-reverse">π</div>
          <div className="absolute top-[61%] left-[27%] text-green-500 text-8xl opacity-75 floating-icon-slow">∞</div>
          <div className="absolute top-[19%] right-[38%] text-red-500 text-7xl opacity-65 floating-icon">⚛</div>
          <div className="absolute bottom-[31%] left-[8%] text-indigo-500 text-8xl opacity-70 floating-icon-reverse">∫</div>
          <div className="absolute bottom-[12%] right-[42%] text-teal-500 text-9xl opacity-75 floating-icon">≈</div>
          <div className="absolute bottom-[47%] right-[9%] text-pink-500 text-8xl opacity-65 floating-icon-slow">±</div>
          <div className="absolute top-[23%] left-[54%] text-fuchsia-500 text-8xl opacity-70 floating-icon">Δ</div>
          <div className="absolute top-[44%] left-[38%] text-emerald-500 text-7xl opacity-65 floating-icon-slow">λ</div>
          <div className="absolute top-[81%] left-[67%] text-cyan-500 text-9xl opacity-70 floating-icon-reverse">θ</div>
          <div className="absolute top-[29%] left-[83%] text-rose-500 text-8xl opacity-65 floating-icon">α</div>
          <div className="absolute bottom-[63%] left-[6%] text-amber-500 text-9xl opacity-70 floating-icon-slow">β</div>
          <div className="absolute bottom-[19%] left-[71%] text-purple-500 text-8xl opacity-65 floating-icon-reverse">μ</div>
          <div className="absolute bottom-[28%] left-[32%] text-blue-500 text-7xl opacity-70 floating-icon">ω</div>
          <div className="absolute top-[52%] left-[18%] text-sky-500 text-8xl opacity-60 floating-icon-slow">γ</div>
          <div className="absolute top-[37%] right-[29%] text-lime-500 text-9xl opacity-55 floating-icon">σ</div>
          <div className="absolute bottom-[42%] right-[37%] text-orange-500 text-8xl opacity-50 floating-icon-reverse">δ</div>
          <div className="absolute top-[73%] right-[13%] text-violet-500 text-8xl opacity-60 floating-icon-slow">ρ</div>
          
          {/* Layer 2: Drifting Gradient Meshes */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-100/40 via-purple-100/35 to-pink-100/40 animate-mesh-drift-1" />
          <div className="absolute inset-0 bg-gradient-to-tr from-emerald-100/35 via-violet-100/30 to-orange-100/35 animate-mesh-drift-2" />
          <div className="absolute inset-0 bg-gradient-to-bl from-cyan-100/40 via-purple-100/25 to-rose-100/40 animate-mesh-drift-3" />
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-100/30 via-transparent to-green-100/30 animate-mesh-drift-4" />

          {/* Layer 3: Floating Equations */}
          <div className="absolute top-1/4 left-1/6 text-4xl font-bold text-blue-600/70 animate-equation-float-1">∫ e⁻ˣ² dx = √π/2</div>
          <div className="absolute top-1/3 right-1/5 text-3xl font-bold text-emerald-600/70 animate-equation-float-2">∑ 1/n² = π²/6</div>
          <div className="absolute bottom-1/4 left-1/5 text-3xl font-bold text-pink-600/70 animate-equation-float-3">E = mc²</div>
          <div className="absolute top-1/2 right-1/6 text-3xl font-bold text-purple-600/70 animate-equation-float-4">a² + b² = c²</div>
          
          {/* Layer 4: Drifting Knowledge Particles */}
          {[...Array(60)].map((_, i) => (
            <div
              key={i}
              className={`absolute w-2 h-2 rounded-full animate-particle-drift-${(i % 4) + 1} shadow-md`}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 12}s`,
                animationDuration: `${6 + Math.random() * 10}s`,
                background: `radial-gradient(circle, ${['rgba(59, 130, 246, 0.7)', 'rgba(16, 185, 129, 0.7)', 'rgba(168, 85, 247, 0.7)', 'rgba(245, 158, 11, 0.7)', 'rgba(236, 72, 153, 0.7)'][i % 5]}, rgba(255,255,255,0.2))`
              }}
            />
          ))}

          {/* Layer 5: Floating Glass Orbs & Bubbles */}
          <div className="absolute top-16 left-16 w-80 h-80 bg-gradient-to-br from-blue-200/30 to-cyan-200/20 rounded-full backdrop-blur-sm border border-blue-300/40 animate-glass-float-1 shadow-lg" />
          <div className="absolute top-32 right-24 w-96 h-96 bg-gradient-to-br from-purple-200/25 to-pink-200/15 rounded-full backdrop-blur-sm border border-purple-300/30 animate-glass-float-2 shadow-lg" />
          <div className="absolute bottom-24 left-32 w-72 h-72 bg-gradient-to-br from-emerald-200/25 to-teal-200/15 rounded-full backdrop-blur-sm border border-emerald-300/25 animate-glass-float-3 shadow-lg" />
          <div className="absolute top-1/4 left-1/5 w-56 h-56 bg-gradient-to-br from-rose-200/20 to-pink-200/10 rounded-full backdrop-blur-sm border border-rose-300/25 animate-bubble-drift-1 shadow-md" />
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-gradient-to-br from-indigo-200/22 to-blue-200/12 rounded-full backdrop-blur-sm border border-indigo-300/30 animate-bubble-drift-2 shadow-md" />
        </div>
        {/* --- END: Multi-Layered Animated Background --- */}

        <div className="relative z-20 min-h-screen p-4 sm:p-6">
          <div className="max-w-screen-2xl mx-auto">
            
            {/* Header */}
            <div className="mb-6 animate-glass-fade-in">
              <div className="relative group">
                <div className="absolute -inset-2 bg-gradient-to-r from-blue-300/20 via-purple-300/30 to-pink-300/20 rounded-2xl blur-xl opacity-60 group-hover:opacity-80 transition-all duration-1000 animate-aurora-glow" />
                <div className="relative glass-premium-card rounded-2xl p-5">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white shadow-lg">
                      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" /></svg>
                    </div>
                    <div>
                      <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent text-clean-shadow">
                        Teaching Analytics
                      </h1>
                      <p className="text-gray-600 text-sm font-medium">Insights into your teaching performance and student engagement</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Controls */}
            <div className="glass-sidebar-card rounded-2xl p-4 mb-6 animate-slide-up-delayed">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div className="flex flex-col sm:flex-row gap-4">
                  <select value={timeRange} onChange={(e) => setTimeRange(e.target.value)} className="glass-activity-card px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 border-none font-semibold text-gray-700">
                    {timeRanges.map(range => <option key={range} value={range}>{range}</option>)}
                  </select>
                  <select value={selectedCourse} onChange={(e) => setSelectedCourse(e.target.value)} className="glass-activity-card px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 border-none font-semibold text-gray-700">
                    {courses.map(course => <option key={course} value={course}>{course}</option>)}
                  </select>
                </div>
                <Link href="/lecturer/analytics/reports" className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-300 font-semibold shadow-md">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/></svg>
                  Detailed Reports
                </Link>
              </div>
            </div>

            {/* Overview Stats */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
              {[
                { value: analytics.overview.totalStudents, label: "Total Students", icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/></svg>, color: "indigo", bgColor: "from-indigo-500 to-indigo-600", delay: "animate-slide-up-delayed-2" },
                { value: analytics.overview.totalQueries, label: "Total Queries", icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg>, color: "blue", bgColor: "from-blue-500 to-blue-600", delay: "animate-slide-up-delayed-3" },
                { value: formatTime(analytics.overview.avgResponseTime), label: "Avg Response", icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm-1-13h2v6h-2zm4.25-4.5l1.42 1.42-4.24 4.24-1.42-1.42z"/></svg>, color: "purple", bgColor: "from-purple-500 to-purple-600", delay: "animate-slide-up-delayed-4" },
                { value: `${analytics.overview.satisfactionRating.toFixed(1)}/5`, label: "Satisfaction", icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>, color: "green", bgColor: "from-green-500 to-green-600", delay: "animate-slide-up-delayed-5" },
                { value: `${analytics.overview.courseCompletionRate}%`, label: "Completion", icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>, color: "orange", bgColor: "from-orange-500 to-yellow-500", delay: "animate-slide-up-delayed-6" },
                { value: `${analytics.overview.officeHoursUtilization}%`, label: "Office Hours", icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"/></svg>, color: "red", bgColor: "from-red-500 to-pink-500", delay: "animate-slide-up-delayed-7" }
              ].map((stat) => (
                <div key={stat.label} className={`group ${stat.delay}`}>
                  <div className="relative overflow-hidden rounded-xl transition-all duration-500 hover:scale-105 hover:-translate-y-1">
                    <div className={`absolute -inset-1 bg-gradient-to-r ${stat.bgColor} rounded-xl blur-md opacity-20 group-hover:opacity-40 transition-all duration-500`} />
                    <div className="relative glass-stat-card rounded-xl group-hover:shadow-xl transition-all duration-500">
                      <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-white/10 opacity-0 group-hover:opacity-100 transition-all duration-500" />
                      <div className="relative p-3">
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 bg-gradient-to-br ${stat.bgColor} rounded-lg flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                            {stat.icon}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className={`text-xl font-bold text-${stat.color}-600`}>{stat.value}</div>
                            <div className="text-xs text-gray-600 font-semibold leading-tight truncate">{stat.label}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Tabs */}
            <div className="glass-premium-card rounded-2xl mb-6 p-2 animate-slide-up-delayed-8">
              <nav className="flex flex-wrap justify-center gap-2">
                {TABS.map(tab => (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key)}
                    className={`px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-2 transition-all duration-300 ${
                      activeTab === tab.key
                        ? 'bg-white/50 text-blue-700 shadow-md'
                        : 'text-gray-600 hover:bg-white/20 hover:text-gray-900'
                    }`}
                  >
                    {tab.icon}
                    {tab.label}
                  </button>
                ))}
              </nav>
            </div>

            {/* Tab Content */}
            <div key={activeTab} className="space-y-6 animate-glass-fade-in">
              {/* Overview Tab */}
              {activeTab === 'overview' && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="glass-card rounded-2xl p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Insights</h3>
                    <div className="space-y-4">
                      <div className="p-4 bg-green-500/10 rounded-lg border border-green-500/20">
                        <div className="font-semibold text-green-800">Excellent Response Time</div>
                        <p className="text-sm text-green-700">Your average response time of {formatTime(analytics.overview.avgResponseTime)} is 23% better than last month.</p>
                      </div>
                      <div className="p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
                        <div className="font-semibold text-blue-800">High Student Satisfaction</div>
                        <p className="text-sm text-blue-700">Students rate your teaching {analytics.overview.satisfactionRating}/5.0 on average.</p>
                      </div>
                      <div className="p-4 bg-orange-500/10 rounded-lg border border-orange-500/20">
                        <div className="font-semibold text-orange-800">Room for Office Hours Growth</div>
                        <p className="text-sm text-orange-700">Only {analytics.overview.officeHoursUtilization}% of your office hours slots are being used.</p>
                      </div>
                    </div>
                  </div>
                  <div className="glass-card rounded-2xl p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Top Performing Courses</h3>
                    <div className="space-y-3">
                      {analytics.performanceInsights.topPerformingCourses.map((course, idx) => (
                        <div key={idx} className="glass-activity-card p-4 rounded-lg">
                          <div className="flex justify-between items-center mb-2">
                            <span className="font-semibold text-gray-800">{course.course}</span>
                            <span className={`text-lg font-bold ${getPerformanceColor(course.satisfaction)}`}>{course.satisfaction.toFixed(1)}/5.0</span>
                          </div>
                          <p className="text-sm text-gray-600">Average Grade: {course.avgGrade.toFixed(1)} • Student Satisfaction: {course.satisfaction.toFixed(1)}/5.0</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Query Analytics Tab */}
              {activeTab === 'queries' && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="glass-card rounded-2xl p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Queries by Category</h3>
                    <div className="space-y-3">
                      {analytics.queryAnalytics.byCategory.map((item, idx) => (
                        <div key={idx}>
                          <div className="flex items-center justify-between text-sm mb-1">
                            <span className="font-medium text-gray-700">{item.category}</span>
                            <span className="font-semibold text-gray-800">{item.count} ({item.percentage}%)</span>
                          </div>
                          <div className="w-full bg-gray-200/50 rounded-full h-2.5"><div className="bg-gradient-to-r from-blue-400 to-blue-600 h-2.5 rounded-full" style={{width: `${item.percentage}%`}}></div></div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="glass-card rounded-2xl p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Common Query Topics</h3>
                    <div className="space-y-3">
                      {analytics.queryAnalytics.commonTopics.map((topic, idx) => (
                        <div key={idx} className="glass-activity-card p-3 rounded-lg">
                          <div className="flex justify-between items-center mb-1">
                            <span className="font-semibold text-sm text-gray-800">{topic.topic}</span>
                            <span className="text-sm text-gray-600">{topic.count} queries</span>
                          </div>
                          <p className="text-xs text-gray-500">Avg resolution: {formatTime(topic.avgResolutionTime)}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Student Engagement Tab */}
              {activeTab === 'engagement' && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="glass-card rounded-2xl p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Attendance Rates</h3>
                    <div className="space-y-4">
                      {analytics.studentEngagement.attendanceRates.map((course, idx) => (
                        <div key={idx} className="glass-activity-card p-3 rounded-lg">
                          <div className="flex justify-between items-center mb-2">
                            <span className="font-semibold text-gray-800">{course.course}</span>
                            <div className="flex items-center gap-2">
                              <span className={`font-bold text-lg ${getPerformanceColor(course.rate, 100)}`}>{course.rate}%</span>
                              {getTrendIcon(course.trend)}
                            </div>
                          </div>
                          <div className="w-full bg-gray-200/50 rounded-full h-2.5"><div className="bg-gradient-to-r from-purple-400 to-purple-600 h-2.5 rounded-full" style={{width: `${course.rate}%`}}></div></div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="glass-card rounded-2xl p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Participation Scores</h3>
                    <div className="space-y-4">
                      {analytics.studentEngagement.participationScores.map((course, idx) => (
                        <div key={idx} className="glass-activity-card p-3 rounded-lg">
                          <div className="flex justify-between items-center mb-2">
                            <span className="font-semibold text-gray-800">{course.course}</span>
                            <div className="flex items-center gap-2">
                              <span className={`font-bold text-lg ${getPerformanceColor(course.score, 100)}`}>{course.score}%</span>
                              {course.improvement !== 0 && <span className={`text-sm font-semibold ${course.improvement > 0 ? 'text-green-600' : 'text-red-600'}`}>{course.improvement > 0 ? '+' : ''}{course.improvement}%</span>}
                            </div>
                          </div>
                          <div className="w-full bg-gray-200/50 rounded-full h-2.5"><div className="bg-gradient-to-r from-green-400 to-green-600 h-2.5 rounded-full" style={{width: `${course.score}%`}}></div></div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Communication Tab */}
              {activeTab === 'communication' && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="glass-card rounded-2xl p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Message Volume (Last 7 Days)</h3>
                    <div className="space-y-2">
                      {analytics.communicationStats.messageVolume.map((day, idx) => (
                        <div key={idx} className="flex items-center justify-between text-sm p-2 glass-activity-card rounded-md">
                          <span className="font-medium text-gray-700">{new Date(day.date).toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' })}</span>
                          <div className="flex gap-4">
                            <span className="font-semibold text-blue-600">Sent: {day.sent}</span>
                            <span className="font-semibold text-green-600">Received: {day.received}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="glass-card rounded-2xl p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Appointment Statistics</h3>
                    <div className="space-y-3">
                      {analytics.communicationStats.appointmentStats.map((stat, idx) => (
                        <div key={idx} className="glass-activity-card p-4 rounded-lg">
                          <div className="font-semibold text-gray-800 mb-2">{stat.type}</div>
                          <div className="grid grid-cols-3 gap-2 text-sm">
                            <div className="text-center"><div className="font-bold text-2xl text-blue-600">{stat.booked}</div><div className="text-xs text-gray-600">Booked</div></div>
                            <div className="text-center"><div className="font-bold text-2xl text-green-600">{stat.completed}</div><div className="text-xs text-gray-600">Completed</div></div>
                            <div className="text-center"><div className="font-bold text-2xl text-red-600">{stat.noShows}</div><div className="text-xs text-gray-600">No-shows</div></div>
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
                  <div className="glass-card rounded-2xl p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Improvement Areas</h3>
                    <div className="space-y-3">
                      {analytics.performanceInsights.improvementAreas.map((area, idx) => (
                        <div key={idx} className="glass-activity-card p-4 rounded-lg">
                          <div className="flex justify-between items-center mb-2">
                            <span className="font-semibold text-gray-800">{area.area}</span>
                            <span className={`px-2 py-1 rounded-full text-xs font-bold ${getPriorityColor(area.priority)}`}>{area.priority}</span>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">Current: {area.currentScore} → Target: {area.targetScore}</p>
                          <div className="w-full bg-gray-200/50 rounded-full h-2.5"><div className="bg-gradient-to-r from-orange-400 to-orange-600 h-2.5 rounded-full" style={{width: `${(area.currentScore / area.targetScore) * 100}%`}}></div></div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="glass-card rounded-2xl p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Student Feedback Summary</h3>
                    <div className="space-y-3">
                      {analytics.performanceInsights.studentFeedback.map((feedback, idx) => (
                        <div key={idx} className="glass-activity-card p-4 rounded-lg">
                          <div className="flex justify-between items-center mb-2">
                            <span className="font-semibold text-gray-800">{feedback.course}</span>
                            <span className={`text-lg font-bold ${getPerformanceColor(feedback.rating)}`}>{feedback.rating.toFixed(1)}/5.0</span>
                          </div>
                          <p className="text-sm text-gray-600">{feedback.comments} comments • Last updated: {new Date(feedback.lastUpdated).toLocaleDateString()}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
