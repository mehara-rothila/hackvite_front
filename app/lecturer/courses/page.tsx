// app/lecturer/courses/page.tsx - ENHANCED WITH GLASSMORPHISM & VECTOR ICONS
'use client'

import { useState } from 'react'
import Link from 'next/link'

// --- Interfaces (Unchanged) ---
interface Course {
  id: string
  code: string
  name: string
  description: string
  department: string
  credits: number
  semester: string
  schedule: {
    days: string[]
    time: string
    location: string
  }
  enrollment: {
    current: number
    capacity: number
    waitlist: number
  }
  stats: {
    pendingQueries: number
    upcomingAppointments: number
    announcements: number
    resources: number
    averageGrade: number
    attendanceRate: number
  }
  nextClass: string
  syllabus: string
  status: 'active' | 'upcoming' | 'completed'
  recentActivity: {
    type: 'submission' | 'query' | 'message' | 'grade'
    student: string
    title: string
    timestamp: string
  }[]
}

// --- Mock Data (Unchanged) ---
const mockCourses: Course[] = [
  { id: '1', code: 'CS101', name: 'Introduction to Programming', description: 'Fundamental concepts of programming using modern programming languages. Covers variables, functions, control structures, and basic algorithms.', department: 'Computer Science', credits: 3, semester: 'Fall 2025', schedule: { days: ['Monday', 'Wednesday', 'Friday'], time: '10:00 AM - 11:00 AM', location: 'CS Building, Room 101' }, enrollment: { current: 65, capacity: 70, waitlist: 8 }, stats: { pendingQueries: 4, upcomingAppointments: 7, announcements: 12, resources: 23, averageGrade: 3.4, attendanceRate: 92 }, nextClass: '2025-07-29 10:00', syllabus: 'cs101_syllabus.pdf', status: 'active', recentActivity: [ { type: 'query', student: 'Alice Johnson', title: 'Question about Assignment 3', timestamp: '2 hours ago' }, { type: 'submission', student: 'Bob Smith', title: 'Submitted Lab 4', timestamp: '3 hours ago' }, { type: 'message', student: 'Carol Davis', title: 'Office hours question', timestamp: '5 hours ago' } ] },
  { id: '2', code: 'CS201', name: 'Data Structures and Algorithms', description: 'Advanced programming concepts including data structures, algorithm analysis, and software design principles.', department: 'Computer Science', credits: 4, semester: 'Fall 2025', schedule: { days: ['Tuesday', 'Thursday'], time: '2:00 PM - 3:30 PM', location: 'CS Building, Room 205' }, enrollment: { current: 24, capacity: 30, waitlist: 2 }, stats: { pendingQueries: 2, upcomingAppointments: 3, announcements: 8, resources: 18, averageGrade: 3.1, attendanceRate: 88 }, nextClass: '2025-07-30 14:00', syllabus: 'cs201_syllabus.pdf', status: 'active', recentActivity: [ { type: 'grade', student: 'David Wilson', title: 'Midterm exam graded', timestamp: '1 day ago' }, { type: 'submission', student: 'Emma Brown', title: 'Submitted Project Proposal', timestamp: '1 day ago' } ] },
  { id: '3', code: 'CS401', name: 'Software Engineering', description: 'Principles and practices of large-scale software development including project management, testing, and documentation.', department: 'Computer Science', credits: 3, semester: 'Spring 2026', schedule: { days: ['Monday', 'Wednesday'], time: '1:00 PM - 2:30 PM', location: 'CS Building, Room 301' }, enrollment: { current: 0, capacity: 25, waitlist: 0 }, stats: { pendingQueries: 0, upcomingAppointments: 0, announcements: 1, resources: 0, averageGrade: 0, attendanceRate: 0 }, nextClass: '2026-01-15 13:00', syllabus: 'cs401_syllabus.pdf', status: 'upcoming', recentActivity: [] }
]

// --- Constants (Unchanged) ---
const semesters = ['All', 'Fall 2025', 'Spring 2026', 'Summer 2025']
const statuses = ['All', 'Active', 'Upcoming', 'Completed']
const departments = ['All', 'Computer Science', 'Mathematics', 'Physics']

export default function LecturerCoursesPage() {
  const [courses] = useState<Course[]>(mockCourses)
  const [searchTerm, setSearchTerm] = useState('')
  const [semesterFilter, setSemesterFilter] = useState('All')
  const [statusFilter, setStatusFilter] = useState('All')
  const [departmentFilter, setDepartmentFilter] = useState('All')
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null)

  // --- Filtering & Derived State (Unchanged) ---
  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.code.toLowerCase().includes(searchTerm.toLowerCase()) || course.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesSemester = semesterFilter === 'All' || course.semester === semesterFilter
    const matchesStatus = statusFilter === 'All' || course.status === statusFilter.toLowerCase()
    const matchesDepartment = departmentFilter === 'All' || course.department === departmentFilter
    return matchesSearch && matchesSemester && matchesStatus && matchesDepartment
  })
  const totalStudents = courses.reduce((sum, course) => sum + course.enrollment.current, 0)
  const activeCourses = courses.filter(course => course.status === 'active').length
  const totalPendingQueries = courses.reduce((sum, course) => sum + course.stats.pendingQueries, 0)
  const avgEnrollmentRate = courses.length > 0 ? Math.round(courses.reduce((sum, course) => sum + (course.enrollment.current / course.enrollment.capacity) * 100, 0) / courses.length) : 0

  // --- Helper Functions for Styling ---
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500/20 text-green-700'
      case 'upcoming': return 'bg-blue-500/20 text-blue-700'
      case 'completed': return 'bg-gray-500/20 text-gray-700'
      default: return 'bg-gray-500/20 text-gray-700'
    }
  }
  const getGradeColor = (grade: number) => {
    if (grade >= 3.5) return 'text-green-500'
    if (grade >= 3.0) return 'text-blue-500'
    if (grade >= 2.5) return 'text-orange-500'
    return 'text-red-500'
  }
  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'submission': return <svg className="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 24 24"><path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/></svg>
      case 'query': return <svg className="w-4 h-4 text-orange-500" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg>
      case 'message': return <svg className="w-4 h-4 text-purple-500" fill="currentColor" viewBox="0 0 24 24"><path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 9h12v2H6V9zm8 5H6v-2h8v2zm4-6H6V6h12v2z"/></svg>
      case 'grade': return <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 24 24"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"/></svg>
      default: return <svg className="w-4 h-4 text-gray-500" fill="currentColor" viewBox="0 0 24 24"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"/></svg>
    }
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
          <div className="max-w-7xl mx-auto">
            
            {/* Header */}
            <div className="mb-6 animate-glass-fade-in">
              <div className="relative group">
                <div className="absolute -inset-2 bg-gradient-to-r from-blue-300/20 via-purple-300/30 to-pink-300/20 rounded-2xl blur-xl opacity-60 group-hover:opacity-80 transition-all duration-1000 animate-aurora-glow" />
                <div className="relative glass-premium-card rounded-2xl p-5">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white shadow-lg">
                      <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82zM12 3L1 9l11 6 9-4.909V17h2V9L12 3z"/></svg>
                    </div>
                    <div>
                      <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent text-clean-shadow">
                        My Courses
                      </h1>
                      <p className="text-gray-600 text-sm font-medium">Manage your teaching courses and track student progress</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
              {[
                { value: courses.length, label: "Total Courses", icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z"/></svg>, color: "blue", bgColor: "from-blue-500 to-blue-600", delay: "animate-slide-up-delayed" },
                { value: activeCourses, label: "Active Courses", icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>, color: "green", bgColor: "from-green-500 to-green-600", delay: "animate-slide-up-delayed-2" },
                { value: totalStudents, label: "Total Students", icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/></svg>, color: "purple", bgColor: "from-purple-500 to-purple-600", delay: "animate-slide-up-delayed-3" },
                { value: totalPendingQueries, label: "Pending Queries", icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg>, color: "orange", bgColor: "from-orange-500 to-yellow-500", delay: "animate-slide-up-delayed-4" },
                { value: `${avgEnrollmentRate}%`, label: "Avg Enrollment", icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055zM20.488 9H15V3.512A9.025 9.025 0 0120.488 9z"/></svg>, color: "red", bgColor: "from-red-500 to-pink-500", delay: "animate-slide-up-delayed-5" }
              ].map((stat) => (
                <div key={stat.label} className={`group ${stat.delay}`}>
                  <div className="relative overflow-hidden rounded-xl transition-all duration-500 hover:scale-105 hover:-translate-y-1">
                    <div className={`absolute -inset-1 bg-gradient-to-r ${stat.bgColor} rounded-xl blur-md opacity-20 group-hover:opacity-40 transition-all duration-500`} />
                    <div className="relative glass-stat-card rounded-xl group-hover:shadow-xl transition-all duration-500 p-3">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 bg-gradient-to-br ${stat.bgColor} rounded-lg flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>{stat.icon}</div>
                        <div className="flex-1 min-w-0">
                          <div className={`text-xl font-bold text-${stat.color}-600`}>{stat.value}</div>
                          <div className="text-xs text-gray-600 font-semibold leading-tight truncate">{stat.label}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Filters */}
            <div className="glass-sidebar-card rounded-2xl p-4 mb-6 animate-slide-up-delayed-6">
              <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                <input type="text" placeholder="Search courses..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="glass-activity-card px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 border-none font-semibold text-gray-700 placeholder-gray-500 flex-1" />
                <select value={semesterFilter} onChange={(e) => setSemesterFilter(e.target.value)} className="glass-activity-card px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 border-none font-semibold text-gray-700">{semesters.map(s => <option key={s} value={s}>{s}</option>)}</select>
                <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="glass-activity-card px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 border-none font-semibold text-gray-700">{statuses.map(s => <option key={s} value={s}>{s}</option>)}</select>
                <select value={departmentFilter} onChange={(e) => setDepartmentFilter(e.target.value)} className="glass-activity-card px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 border-none font-semibold text-gray-700">{departments.map(d => <option key={d} value={d}>{d}</option>)}</select>
              </div>
            </div>

            {/* Courses Grid */}
            {filteredCourses.length === 0 ? (
              <div className="glass-card rounded-2xl p-8 text-center animate-slide-up-delayed-7"><div className="text-4xl mb-4">📚</div><h3 className="text-xl font-bold text-gray-700 mb-2">No Courses Found</h3><p className="text-gray-500">Check your filters or contact an administrator to assign courses.</p></div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredCourses.map((course, index) => (
                  <div key={course.id} className={`relative group transition-all duration-500 animate-slide-up-delayed-${7 + index}`}>
                    <div className={`absolute -inset-2 bg-gradient-to-r from-blue-300/10 via-purple-300/10 to-pink-300/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-80 transition-all duration-1000 ${course.status === 'active' ? 'animate-aurora-glow' : ''}`} />
                    <div className="relative glass-card rounded-2xl p-5 h-full flex flex-col">
                      <div className="flex-grow">
                        <div className="flex items-center justify-between mb-4">
                          <div>
                            <h3 className="text-lg font-bold text-gray-900">{course.code}</h3>
                            <h4 className="text-md font-semibold text-gray-700">{course.name}</h4>
                          </div>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(course.status)}`}>{course.status}</span>
                        </div>
                        <div className="space-y-3 mb-4">
                          <div className="text-sm text-gray-600">
                            <div className="font-semibold text-gray-800">Enrollment: {course.enrollment.current}/{course.enrollment.capacity}</div>
                            <div className="w-full bg-gray-200/50 rounded-full h-2 mt-1"><div className="bg-gradient-to-r from-blue-400 to-blue-600 h-2 rounded-full" style={{width: `${(course.enrollment.current / course.enrollment.capacity) * 100}%`}}></div></div>
                          </div>
                          <div className="grid grid-cols-2 gap-2 text-xs text-gray-500">
                            <span className="flex items-center gap-1.5">📝 {course.stats.pendingQueries} queries</span>
                            <span className="flex items-center gap-1.5">📅 {course.stats.upcomingAppointments} appointments</span>
                            <span className="flex items-center gap-1.5">📢 {course.stats.announcements} announcements</span>
                            <span className="flex items-center gap-1.5">📚 {course.stats.resources} resources</span>
                          </div>
                        </div>
                        {course.status === 'active' && course.recentActivity.length > 0 && (
                          <div>
                            <div className="font-semibold text-gray-800 text-sm mb-2">Recent Activity:</div>
                            <div className="space-y-2">
                              {course.recentActivity.slice(0, 2).map((activity, idx) => (
                                <div key={idx} className="text-xs glass-activity-card p-2 rounded-lg">
                                  <div className="flex items-center gap-2"><div className="flex-shrink-0">{getActivityIcon(activity.type)}</div><span className="font-medium text-gray-800">{activity.student}</span><span className="text-gray-500 ml-auto">{activity.timestamp}</span></div>
                                  <div className="text-gray-600 pl-6">{activity.title}</div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                      <div className="mt-4 pt-4 border-t border-white/30 space-y-2">
                        <Link href={`/courses/${course.id}`} className="block w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all duration-300 text-center font-semibold">Enter Course</Link>
                        <div className="grid grid-cols-2 gap-2">
                          <Link href={`/lecturer/queries?course=${course.code}`} className="bg-white/20 text-gray-800 px-3 py-2 rounded-lg hover:bg-white/40 transition-colors text-sm text-center font-medium">Queries ({course.stats.pendingQueries})</Link>
                          <button onClick={() => setSelectedCourse(course)} className="bg-white/20 text-gray-800 px-3 py-2 rounded-lg hover:bg-white/40 transition-colors text-sm text-center font-medium">Details</button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Course Detail Modal */}
            {selectedCourse && (
              <div className="fixed inset-0 bg-black/50 backdrop-blur-md flex items-center justify-center z-50 p-4 animate-glass-fade-in">
                <div className="glass-premium-card rounded-2xl p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
                  <div className="flex justify-between items-start mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">{selectedCourse.code} - Course Details</h2>
                    <button onClick={() => setSelectedCourse(null)} className="text-gray-500 hover:text-gray-700">×</button>
                  </div>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div><h4 className="font-semibold text-gray-900 mb-2">Course Information</h4><div className="space-y-2 text-sm text-gray-700"><div><strong>Name:</strong> {selectedCourse.name}</div><div><strong>Department:</strong> {selectedCourse.department}</div><div><strong>Credits:</strong> {selectedCourse.credits}</div><div><strong>Semester:</strong> {selectedCourse.semester}</div><div><strong>Description:</strong> {selectedCourse.description}</div></div></div>
                      <div><h4 className="font-semibold text-gray-900 mb-2">Schedule</h4><div className="space-y-1 text-sm text-gray-700"><div><strong>Days:</strong> {selectedCourse.schedule.days.join(', ')}</div><div><strong>Time:</strong> {selectedCourse.schedule.time}</div><div><strong>Location:</strong> {selectedCourse.schedule.location}</div><div><strong>Next Class:</strong> {new Date(selectedCourse.nextClass).toLocaleString()}</div></div></div>
                      <div><h4 className="font-semibold text-gray-900 mb-2">Enrollment</h4><div className="space-y-2"><div className="flex justify-between text-sm"><span>Current: {selectedCourse.enrollment.current}</span><span>Capacity: {selectedCourse.enrollment.capacity}</span><span>Waitlist: {selectedCourse.enrollment.waitlist}</span></div><div className="w-full bg-gray-200/50 rounded-full h-3"><div className="bg-gradient-to-r from-blue-400 to-blue-600 h-3 rounded-full" style={{width: `${(selectedCourse.enrollment.current / selectedCourse.enrollment.capacity) * 100}%`}}></div></div><div className="text-xs text-gray-500">{Math.round((selectedCourse.enrollment.current / selectedCourse.enrollment.capacity) * 100)}% filled</div></div></div>
                    </div>
                    <div className="space-y-4">
                      <div><h4 className="font-semibold text-gray-900 mb-2">Course Statistics</h4><div className="grid grid-cols-2 gap-3">
                        <div className="p-3 glass-activity-card rounded-lg"><div className={`text-2xl font-bold text-orange-500`}>{selectedCourse.stats.pendingQueries}</div><div className="text-sm text-gray-700">Pending Queries</div></div>
                        <div className="p-3 glass-activity-card rounded-lg"><div className={`text-2xl font-bold text-purple-500`}>{selectedCourse.stats.upcomingAppointments}</div><div className="text-sm text-gray-700">Appointments</div></div>
                        <div className="p-3 glass-activity-card rounded-lg"><div className={`text-2xl font-bold text-blue-500`}>{selectedCourse.stats.announcements}</div><div className="text-sm text-gray-700">Announcements</div></div>
                        <div className="p-3 glass-activity-card rounded-lg"><div className={`text-2xl font-bold text-green-500`}>{selectedCourse.stats.resources}</div><div className="text-sm text-gray-700">Resources</div></div>
                      </div></div>
                      <div><h4 className="font-semibold text-gray-900 mb-2">Performance Metrics</h4><div className="space-y-3"><div><div className="flex justify-between text-sm"><span>Average Grade</span><span className={`font-bold ${getGradeColor(selectedCourse.stats.averageGrade)}`}>{selectedCourse.stats.averageGrade > 0 ? selectedCourse.stats.averageGrade.toFixed(1) : 'N/A'}</span></div></div><div><div className="flex justify-between text-sm"><span>Attendance Rate</span><span className="font-bold text-green-500">{selectedCourse.stats.attendanceRate > 0 ? `${selectedCourse.stats.attendanceRate}%` : 'N/A'}</span></div>{selectedCourse.stats.attendanceRate > 0 && (<div className="w-full bg-gray-200/50 rounded-full h-2 mt-1"><div className="bg-gradient-to-r from-green-400 to-green-600 h-2 rounded-full" style={{width: `${selectedCourse.stats.attendanceRate}%`}}></div></div>)}</div></div></div>
                      {selectedCourse.recentActivity.length > 0 && (<div><h4 className="font-semibold text-gray-900 mb-2">Recent Activity</h4><div className="space-y-2">{selectedCourse.recentActivity.map((activity, idx) => (<div key={idx} className="p-3 glass-activity-card rounded-lg"><div className="flex items-center gap-2 mb-1">{getActivityIcon(activity.type)}<span className="font-medium text-sm">{activity.student}</span><span className="text-xs text-gray-500 ml-auto">{activity.timestamp}</span></div><div className="text-sm text-gray-600">{activity.title}</div></div>))}</div></div>)}
                    </div>
                  </div>
                  <div className="mt-6 pt-4 border-t border-white/30"><div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                    <Link href={`/courses/${selectedCourse.id}`} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-center font-semibold">Enter Course</Link>
                    <Link href={`/lecturer/queries?course=${selectedCourse.code}`} className="bg-white/20 text-gray-800 px-4 py-2 rounded-lg hover:bg-white/40 text-center font-medium">View Queries</Link>
                    <Link href={`/lecturer/announcements?course=${selectedCourse.code}`} className="bg-white/20 text-gray-800 px-4 py-2 rounded-lg hover:bg-white/40 text-center font-medium">Announcements</Link>
                    <Link href={`/lecturer/analytics?course=${selectedCourse.code}`} className="bg-white/20 text-gray-800 px-4 py-2 rounded-lg hover:bg-white/40 text-center font-medium">Analytics</Link>
                  </div></div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}