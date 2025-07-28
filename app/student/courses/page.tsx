// app/student/courses/page.tsx - ENHANCED WITH DASHBOARD STYLES
'use client'

import { useState } from 'react'
import Link from 'next/link'

// --- Interfaces (Unchanged) ---
interface EnrolledCourse {
  id: string
  code: string
  name: string
  description: string
  lecturer: { id: string; name: string; email: string; avatar: string; office: string; officeHours: string[] }
  department: string
  credits: number
  semester: string
  schedule: { days: string[]; time: string; location: string }
  progress: { attendance: number; assignments: { completed: number; total: number }; quizzes: { completed: number; total: number }; exams: { completed: number; total: number }; currentGrade: string; gradingBreakdown: { assignments: number; quizzes: number; exams: number; participation: number } }
  upcomingEvents: { type: 'assignment' | 'quiz' | 'exam' | 'lecture'; title: string; date: string; description: string }[]
  recentActivity: { type: 'grade' | 'announcement' | 'resource' | 'message'; title: string; description: string; date: string; read: boolean }[]
  resources: number
  announcements: number
  unreadMessages: number
  syllabus?: string
  status: 'enrolled' | 'completed' | 'dropped'
  enrollmentDate: string
  nextClass: string
}

// --- Mock Data (Unchanged) ---
const mockEnrolledCourses: EnrolledCourse[] = [
  { id: '1', code: 'CS101', name: 'Introduction to Programming', description: 'Fundamental concepts of programming using modern programming languages.', lecturer: { id: 'lec1', name: 'Dr. Sarah Johnson', email: 'sarah.johnson@university.edu', avatar: '👩‍🏫', office: 'CS Building, Room 201B', officeHours: ['Monday 2:00-4:00 PM', 'Wednesday 2:00-4:00 PM'] }, department: 'Computer Science', credits: 3, semester: 'Fall 2025', schedule: { days: ['Monday', 'Wednesday', 'Friday'], time: '10:00 AM - 11:00 AM', location: 'CS Building, Room 101' }, progress: { attendance: 92, assignments: { completed: 6, total: 8 }, quizzes: { completed: 4, total: 5 }, exams: { completed: 1, total: 2 }, currentGrade: 'A-', gradingBreakdown: { assignments: 40, quizzes: 20, exams: 30, participation: 10 } }, upcomingEvents: [ { type: 'assignment', title: 'Assignment 7: Recursion Problems', date: '2025-07-30', description: 'Complete recursive algorithm implementations' }, { type: 'exam', title: 'Midterm Exam', date: '2025-08-05', description: 'Covers chapters 1-6, bring calculator' }, { type: 'lecture', title: 'Advanced Data Structures', date: '2025-07-29', description: 'Trees and graph implementations' } ], recentActivity: [ { type: 'grade', title: 'Assignment 6 Graded', description: 'Received grade: A (95/100)', date: '2025-07-26', read: false }, { type: 'announcement', title: 'Office Hours Change', description: 'Wednesday office hours moved to 3-5 PM', date: '2025-07-25', read: true } ], resources: 23, announcements: 8, unreadMessages: 2, syllabus: 'cs101_syllabus.pdf', status: 'enrolled', enrollmentDate: '2025-08-20', nextClass: '2025-07-29 10:00' },
  { id: '2', code: 'MATH202', name: 'Calculus II', description: 'Integral calculus, techniques of integration, applications of integrals.', lecturer: { id: 'lec2', name: 'Prof. Michael Chen', email: 'michael.chen@university.edu', avatar: '👨‍🏫', office: 'Math Building, Room 301A', officeHours: ['Tuesday 10:00-12:00 PM', 'Thursday 10:00-12:00 PM'] }, department: 'Mathematics', credits: 4, semester: 'Fall 2025', schedule: { days: ['Monday', 'Wednesday', 'Friday'], time: '11:00 AM - 12:00 PM', location: 'Math Building, Room 201' }, progress: { attendance: 88, assignments: { completed: 8, total: 10 }, quizzes: { completed: 5, total: 6 }, exams: { completed: 1, total: 2 }, currentGrade: 'B+', gradingBreakdown: { assignments: 30, quizzes: 25, exams: 40, participation: 5 } }, upcomingEvents: [ { type: 'quiz', title: 'Quiz 6: Integration Techniques', date: '2025-07-31', description: 'Covers integration by parts and substitution' }, { type: 'assignment', title: 'Problem Set 9', date: '2025-08-02', description: 'Applications of definite integrals' } ], recentActivity: [ { type: 'grade', title: 'Quiz 5 Results', description: 'Received grade: B+ (87/100)', date: '2025-07-26', read: false }, { type: 'resource', title: 'Practice Problems Added', description: 'New integration practice problems uploaded', date: '2025-07-24', read: true } ], resources: 18, announcements: 12, unreadMessages: 1, syllabus: 'math202_syllabus.pdf', status: 'enrolled', enrollmentDate: '2025-08-20', nextClass: '2025-07-29 11:00' },
  { id: '3', code: 'ENG110', name: 'Academic Writing', description: 'Development of critical thinking and writing skills for academic contexts.', lecturer: { id: 'lec3', name: 'Dr. Emily Roberts', email: 'emily.roberts@university.edu', avatar: '👩‍💼', office: 'Humanities Building, Room 105C', officeHours: ['Monday 9:00-11:00 AM', 'Friday 1:00-3:00 PM'] }, department: 'English', credits: 3, semester: 'Fall 2025', schedule: { days: ['Tuesday', 'Thursday'], time: '9:00 AM - 10:30 AM', location: 'Humanities Building, Room 201' }, progress: { attendance: 95, assignments: { completed: 4, total: 6 }, quizzes: { completed: 3, total: 4 }, exams: { completed: 0, total: 1 }, currentGrade: 'A', gradingBreakdown: { assignments: 50, quizzes: 20, exams: 25, participation: 5 } }, upcomingEvents: [ { type: 'assignment', title: 'Research Paper Draft', date: '2025-08-01', description: 'Submit first draft of research paper' }, { type: 'lecture', title: 'Citation Styles Workshop', date: '2025-07-30', description: 'APA and MLA citation formatting' } ], recentActivity: [ { type: 'grade', title: 'Essay 3 Feedback', description: 'Received grade: A- with detailed comments', date: '2025-07-25', read: true }, { type: 'message', title: 'New Message from Dr. Roberts', description: 'Regarding your research topic selection', date: '2025-07-24', read: false } ], resources: 15, announcements: 6, unreadMessages: 1, syllabus: 'eng110_syllabus.pdf', status: 'enrolled', enrollmentDate: '2025-08-20', nextClass: '2025-07-30 09:00' }
]

const semesterFilters = ['All', 'Fall 2025', 'Spring 2026', 'Summer 2025']
const statusFilters = ['All', 'Enrolled', 'Completed', 'Dropped']
const sortOptions = ['Course Code', 'Course Name', 'Next Class', 'Grade', 'Credits']

export default function StudentCoursesPage() {
  // --- State and Handlers (Unchanged) ---
  const [courses, setCourses] = useState<EnrolledCourse[]>(mockEnrolledCourses)
  const [searchTerm, setSearchTerm] = useState('')
  const [semesterFilter, setSemesterFilter] = useState('All')
  const [statusFilter, setStatusFilter] = useState('All')
  const [sortBy, setSortBy] = useState('Course Code')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [selectedCourse, setSelectedCourse] = useState<EnrolledCourse | null>(null)

  const filteredCourses = courses
    .filter(course => {
      const matchesSearch = course.code.toLowerCase().includes(searchTerm.toLowerCase()) || course.name.toLowerCase().includes(searchTerm.toLowerCase()) || course.lecturer.name.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesSemester = semesterFilter === 'All' || course.semester === semesterFilter
      const matchesStatus = statusFilter === 'All' || course.status === statusFilter.toLowerCase()
      return matchesSearch && matchesSemester && matchesStatus
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'Course Code': return a.code.localeCompare(b.code)
        case 'Course Name': return a.name.localeCompare(b.name)
        case 'Next Class': return new Date(a.nextClass).getTime() - new Date(b.nextClass).getTime()
        case 'Grade': return a.progress.currentGrade.localeCompare(b.progress.currentGrade)
        case 'Credits': return b.credits - a.credits
        default: return 0
      }
    })

  // --- Styling Helpers ---
  const getGradeColor = (grade: string) => {
    if (grade.startsWith('A')) return 'text-green-600'
    if (grade.startsWith('B')) return 'text-blue-600'
    if (grade.startsWith('C')) return 'text-orange-600'
    return 'text-red-600'
  }
  const getAttendanceColor = (attendance: number) => {
    if (attendance >= 90) return 'text-green-600'
    if (attendance >= 80) return 'text-blue-600'
    if (attendance >= 70) return 'text-orange-600'
    return 'text-red-600'
  }
  const getProgressPercentage = (completed: number, total: number) => total > 0 ? Math.round((completed / total) * 100) : 0
  const getNextEventType = (type: string) => {
    switch (type) {
      case 'assignment': return '📝'
      case 'quiz': return '❓'
      case 'exam': return '📊'
      case 'lecture': return '🎓'
      default: return '📅'
    }
  }
  const getDaysUntilEvent = (date: string) => {
    const diffTime = new Date(date).getTime() - new Date().getTime()
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  }
  const totalCredits = courses.reduce((sum, course) => sum + course.credits, 0)
  const averageGrade = courses.length > 0 ? courses.reduce((sum, course) => { const gradePoints = course.progress.currentGrade.startsWith('A') ? 4.0 : course.progress.currentGrade.startsWith('B') ? 3.0 : course.progress.currentGrade.startsWith('C') ? 2.0 : 1.0; return sum + gradePoints }, 0) / courses.length : 0
  const glassInputStyles = "px-4 py-2 border rounded-lg transition-all duration-300 focus:ring-2 focus:ring-blue-500 bg-white/60 border-gray-300/70 focus:bg-white/80"

  return (
    <>
      {/* --- START: Global Styles & Animations (Copied from Dashboard) --- */}
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
        .animate-glass-fade-in { animation: glass-fade-in 0.8s ease-out forwards; }
        @keyframes slide-up-delayed { 0% { opacity: 0; transform: translateY(40px); } 100% { opacity: 1; transform: translateY(0); } }
        .animate-slide-up-delayed { animation: slide-up-delayed 0.8s ease-out 0.2s forwards; opacity: 0; }
        .animate-slide-up-delayed-2 { animation: slide-up-delayed 0.8s ease-out 0.4s forwards; opacity: 0; }
        .animate-slide-up-delayed-3 { animation: slide-up-delayed 0.8s ease-out 0.6s forwards; opacity: 0; }
        .animate-slide-up-delayed-4 { animation: slide-up-delayed 0.8s ease-out 0.8s forwards; opacity: 0; }
        
        /* Enhanced Glassmorphism Card Styles */
        .glass-card { background: linear-gradient(135deg, rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.4)); backdrop-filter: blur(32px); border: 1px solid rgba(255, 255, 255, 0.9); box-shadow: 0 8px 32px rgba(31, 38, 135, 0.15), 0 0 0 1px rgba(255, 255, 255, 0.5) inset, 0 2px 8px rgba(255, 255, 255, 0.7) inset; }
        .glass-stat-card { background: linear-gradient(135deg, rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 0.3)); backdrop-filter: blur(24px); border: 1px solid rgba(255, 255, 255, 0.8); box-shadow: 0 6px 24px rgba(31, 38, 135, 0.1), 0 0 0 1px rgba(255, 255, 255, 0.4) inset; }
        .glass-activity-card { background: linear-gradient(135deg, rgba(255, 255, 255, 0.6), rgba(255, 255, 255, 0.2)); backdrop-filter: blur(20px); border: 1px solid rgba(255, 255, 255, 0.7); box-shadow: 0 4px 16px rgba(31, 38, 135, 0.08), 0 0 0 1px rgba(255, 255, 255, 0.3) inset; }
        .text-clean-shadow { filter: drop-shadow(0 2px 4px rgba(59, 130, 246, 0.2)); }
      `}</style>
      {/* --- END: Global Styles & Animations --- */}

      <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
        
        {/* --- START: Multi-Layered Animated Background (Copied from Dashboard) --- */}
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
            <div className="mb-8 animate-glass-fade-in">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white text-2xl font-bold shadow-lg">📚</div>
                <div>
                  <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent text-clean-shadow mb-1">My Courses</h1>
                  <p className="text-gray-600">View and manage your enrolled courses</p>
                </div>
              </div>
            </div>

            {/* Academic Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
              <div className="glass-stat-card p-4 rounded-xl animate-slide-up-delayed"><div className="text-3xl font-bold text-blue-600">{courses.length}</div><div className="text-sm text-blue-800 font-semibold">Enrolled Courses</div></div>
              <div className="glass-stat-card p-4 rounded-xl animate-slide-up-delayed-2"><div className="text-3xl font-bold text-green-600">{totalCredits}</div><div className="text-sm text-green-800 font-semibold">Total Credits</div></div>
              <div className="glass-stat-card p-4 rounded-xl animate-slide-up-delayed-3"><div className="text-3xl font-bold text-purple-600">{averageGrade.toFixed(1)}</div><div className="text-sm text-purple-800 font-semibold">Average GPA</div></div>
              <div className="glass-stat-card p-4 rounded-xl animate-slide-up-delayed-4"><div className="text-3xl font-bold text-orange-600">{courses.reduce((sum, c) => sum + c.unreadMessages, 0)}</div><div className="text-sm text-orange-800 font-semibold">Unread Messages</div></div>
              <div className="glass-stat-card p-4 rounded-xl animate-slide-up-delayed-4"><div className="text-3xl font-bold text-red-600">{courses.reduce((sum, c) => sum + c.upcomingEvents.length, 0)}</div><div className="text-sm text-red-800 font-semibold">Upcoming Events</div></div>
            </div>

            {/* Filters and Controls */}
            <div className="glass-card rounded-2xl p-6 mb-6 animate-slide-up-delayed-2">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div className="flex flex-col sm:flex-row gap-4 flex-1">
                  <input type="text" placeholder="Search courses, code, lecturer..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className={`${glassInputStyles} flex-1`} />
                  <select value={semesterFilter} onChange={(e) => setSemesterFilter(e.target.value)} className={glassInputStyles}>{semesterFilters.map(semester => (<option key={semester} value={semester}>{semester}</option>))}</select>
                  <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className={glassInputStyles}>{statusFilters.map(status => (<option key={status} value={status}>{status}</option>))}</select>
                  <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className={glassInputStyles}>{sortOptions.map(option => (<option key={option} value={option}>{option}</option>))}</select>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => setViewMode('grid')} className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 ${viewMode === 'grid' ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg' : 'glass-activity-card text-gray-700'}`}>🔲 Grid</button>
                  <button onClick={() => setViewMode('list')} className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 ${viewMode === 'list' ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg' : 'glass-activity-card text-gray-700'}`}>📄 List</button>
                </div>
              </div>
            </div>

            {/* Courses Display */}
            {filteredCourses.length === 0 ? (
              <div className="glass-card rounded-2xl p-12 text-center animate-slide-up-delayed-2">
                <div className="text-6xl mb-4">📚</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No Courses Found</h3>
                <p className="text-gray-600 mb-6">Try adjusting your filters or browse available courses.</p>
                <Link href="/courses" className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-2.5 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105 font-semibold">Browse Available Courses</Link>
              </div>
            ) : (
              <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-6'}>
                {filteredCourses.map((course) => (
                  <div key={course.id} className="glass-card rounded-2xl hover:shadow-xl transition-shadow duration-300">
                    {viewMode === 'grid' ? (
                      /* Grid View */
                      <div className="p-6">
                        <div className="mb-4">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="text-lg font-semibold text-gray-900">{course.code}</h3>
                            <span className={`font-bold text-lg ${getGradeColor(course.progress.currentGrade)}`}>{course.progress.currentGrade}</span>
                          </div>
                          <h4 className="text-md text-gray-700 mb-2">{course.name}</h4>
                          <div className="flex items-center gap-2 mb-2"><span className="text-sm text-gray-600">{course.credits} credits • {course.semester}</span></div>
                        </div>
                        <div className="space-y-3 text-sm">
                          <div>
                            <div className="font-medium text-gray-700">Lecturer:</div>
                            <div className="flex items-center gap-2"><span>{course.lecturer.avatar}</span><Link href={`/student/lecturers?lecturer=${course.lecturer.id}`} className="text-blue-600 hover:text-blue-800">{course.lecturer.name}</Link></div>
                          </div>
                          {course.upcomingEvents.length > 0 && (
                            <div>
                              <div className="font-medium text-gray-700">Next Event:</div>
                              <div className="p-2 glass-activity-card rounded text-xs">
                                <div className="flex items-center gap-1"><span className="text-lg">{getNextEventType(course.upcomingEvents[0].type)}</span><span className="font-medium">{course.upcomingEvents[0].title}</span></div>
                                <div className="text-gray-600">{new Date(course.upcomingEvents[0].date).toLocaleDateString()} <span className="text-orange-600 ml-1">({getDaysUntilEvent(course.upcomingEvents[0].date)} days)</span></div>
                              </div>
                            </div>
                          )}
                          <div className="flex justify-between text-xs"><span>📋 {course.resources} resources</span><span>📢 {course.announcements} announcements</span><span>💬 {course.unreadMessages} unread</span></div>
                        </div>
                        <div className="mt-4 pt-4 border-t border-white/30 space-y-2">
                          <Link href={`/courses/${course.id}`} className="block w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105 text-center font-semibold">📚 Enter Course</Link>
                        </div>
                      </div>
                    ) : (
                      /* List View */
                      <div className="p-6">
                        <div className="flex items-start gap-4">
                          <div className="text-3xl mt-1">{course.lecturer.avatar}</div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                              <div>
                                <h3 className="text-lg font-semibold text-gray-900">{course.code} - {course.name}</h3>
                                <p className="text-sm text-gray-600">{course.lecturer.name} • {course.department} • {course.credits} credits</p>
                              </div>
                              <span className={`font-bold text-2xl ${getGradeColor(course.progress.currentGrade)}`}>{course.progress.currentGrade}</span>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm mb-4">
                              <div><span className="font-medium text-gray-700">Schedule:</span><br /><span className="text-gray-600">{course.schedule.days.join(', ')}<br />{course.schedule.time}</span></div>
                              <div><span className="font-medium text-gray-700">Progress:</span><br /><span className="text-gray-600">Assignments: {course.progress.assignments.completed}/{course.progress.assignments.total}<br />Attendance: <span className={getAttendanceColor(course.progress.attendance)}>{course.progress.attendance}%</span></span></div>
                              <div><span className="font-medium text-gray-700">Next Class:</span><br /><span className="text-gray-600">{new Date(course.nextClass).toLocaleDateString()}<br />{new Date(course.nextClass).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span></div>
                              <div><span className="font-medium text-gray-700">Activity:</span><br /><span className="text-gray-600">📋 {course.resources} resources<br />💬 {course.unreadMessages} unread</span></div>
                            </div>
                          </div>
                          <div className="flex flex-col gap-2">
                            <Link href={`/courses/${course.id}`} className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105 text-sm text-center font-semibold">📚 Enter Course</Link>
                            <button onClick={() => setSelectedCourse(course)} className="bg-white/80 text-gray-700 px-4 py-2 rounded-lg hover:bg-white shadow-sm border border-gray-200 transition-all transform hover:scale-105 text-sm font-medium">📊 Details</button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Course Detail Modal */}
            {selectedCourse && (
              <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-glass-fade-in">
                <div className="glass-card rounded-2xl p-6 w-full max-w-5xl max-h-[90vh] overflow-y-auto">
                  <div className="flex justify-between items-start mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">{selectedCourse.code} - Course Details</h2>
                    <button onClick={() => setSelectedCourse(null)} className="text-gray-500 hover:text-gray-700 text-3xl">×</button>
                  </div>
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 space-y-6">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Academic Progress</h4>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="p-4 glass-activity-card rounded-lg"><div className="font-medium text-gray-900">Current Grade</div><div className={`text-3xl font-bold ${getGradeColor(selectedCourse.progress.currentGrade)}`}>{selectedCourse.progress.currentGrade}</div></div>
                          <div className="p-4 glass-activity-card rounded-lg"><div className="font-medium text-gray-900">Attendance</div><div className={`text-3xl font-bold ${getAttendanceColor(selectedCourse.progress.attendance)}`}>{selectedCourse.progress.attendance}%</div></div>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Assignment Progress</h4>
                        <div className="space-y-3">
                          <div><div className="flex justify-between text-sm"><span>Assignments</span><span>{selectedCourse.progress.assignments.completed}/{selectedCourse.progress.assignments.total}</span></div><div className="w-full bg-gray-200 rounded-full h-2"><div className="bg-blue-600 h-2 rounded-full" style={{width: `${getProgressPercentage(selectedCourse.progress.assignments.completed, selectedCourse.progress.assignments.total)}%`}}></div></div></div>
                          <div><div className="flex justify-between text-sm"><span>Quizzes</span><span>{selectedCourse.progress.quizzes.completed}/{selectedCourse.progress.quizzes.total}</span></div><div className="w-full bg-gray-200 rounded-full h-2"><div className="bg-green-600 h-2 rounded-full" style={{width: `${getProgressPercentage(selectedCourse.progress.quizzes.completed, selectedCourse.progress.quizzes.total)}%`}}></div></div></div>
                          <div><div className="flex justify-between text-sm"><span>Exams</span><span>{selectedCourse.progress.exams.completed}/{selectedCourse.progress.exams.total}</span></div><div className="w-full bg-gray-200 rounded-full h-2"><div className="bg-purple-600 h-2 rounded-full" style={{width: `${getProgressPercentage(selectedCourse.progress.exams.completed, selectedCourse.progress.exams.total)}%`}}></div></div></div>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Upcoming Events</h4>
                        <div className="space-y-2">
                          {selectedCourse.upcomingEvents.map((event, idx) => (
                            <div key={idx} className="p-3 glass-activity-card rounded-lg">
                              <div className="flex items-center gap-2 mb-1"><span className="text-lg">{getNextEventType(event.type)}</span><span className="font-medium">{event.title}</span><span className="text-sm text-orange-600 ml-auto">{getDaysUntilEvent(event.date)} days away</span></div>
                              <div className="text-sm text-gray-600">{event.description}</div>
                              <div className="text-sm text-gray-500">{new Date(event.date).toLocaleDateString()}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="lg:col-span-1 space-y-6">
                      <div className="text-center glass-activity-card p-4 rounded-lg">
                        <span className="text-4xl mb-4 block">{selectedCourse.lecturer.avatar}</span>
                        <h3 className="text-lg font-semibold">{selectedCourse.lecturer.name}</h3>
                        <p className="text-gray-600">{selectedCourse.department}</p>
                        <p className="text-sm text-gray-500">{selectedCourse.lecturer.office}</p>
                      </div>
                      <div className="space-y-4">
                        <Link href={`/courses/${selectedCourse.id}`} className="block w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105 text-center font-semibold">📚 Enter Course</Link>
                        <Link href={`/messages/new?lecturer=${selectedCourse.lecturer.id}&course=${selectedCourse.code}`} className="block w-full bg-white/80 text-gray-700 px-4 py-2 rounded-lg hover:bg-white shadow-sm border border-gray-200 transition-all transform hover:scale-105 text-center font-medium">💬 Message Lecturer</Link>
                        <Link href={`/student/appointments?lecturer=${selectedCourse.lecturer.id}`} className="block w-full bg-green-100/80 text-green-700 px-4 py-2 rounded-lg hover:bg-green-100 transition-colors text-center font-medium">📅 Book Appointment</Link>
                      </div>
                      <div className="glass-activity-card p-4 rounded-lg">
                        <h4 className="font-semibold text-gray-900 mb-2">Office Hours</h4>
                        <div className="space-y-1 text-sm">{selectedCourse.lecturer.officeHours.map((hour, idx) => (<div key={idx} className="text-gray-600">📅 {hour}</div>))}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}