// app/lecturer/students/page.tsx - ENHANCED WITH GLASSMORPHISM & VECTOR ICONS
'use client'

import { useState } from 'react'

// --- Interfaces (Unchanged) ---
interface Student {
  id: string
  name: string
  email: string
  studentId: string
  avatar: string
  year: string
  major: string
  gpa: number
  enrolledCourses: {
    code: string
    name: string
    semester: string
    grade?: string
    attendance: number
  }[]
  contactInfo: {
    phone?: string
    address?: string
    emergencyContact?: string
  }
  academicStatus: 'good-standing' | 'probation' | 'honors'
  lastActive: string
  totalCredits: number
  communicationPreference: 'email' | 'message' | 'appointment'
  specialNeeds?: string[]
  notes?: string
  queryHistory: number
  appointmentHistory: number
  responseRate: number
  parentalAccess: boolean
}

// --- Mock Data (Unchanged) ---
const mockStudents: Student[] = [
  {
    id: '1',
    name: 'Alice Johnson',
    email: 'alice.johnson@student.edu',
    studentId: 'STU001',
    avatar: '👩‍🎓',
    year: 'Sophomore',
    major: 'Computer Science',
    gpa: 3.8,
    enrolledCourses: [
      { code: 'CS101', name: 'Introduction to Programming', semester: 'Fall 2025', grade: 'A-', attendance: 95 },
      { code: 'MATH202', name: 'Calculus II', semester: 'Fall 2025', attendance: 88 },
      { code: 'ENG110', name: 'Academic Writing', semester: 'Fall 2025', grade: 'B+', attendance: 92 }
    ],
    contactInfo: {
      phone: '+1 (555) 111-2222',
      address: 'Dorm Building A, Room 204',
      emergencyContact: 'Parent: +1 (555) 333-4444'
    },
    academicStatus: 'good-standing',
    lastActive: '2025-07-27 10:30',
    totalCredits: 45,
    communicationPreference: 'email',
    specialNeeds: ['Extended test time'],
    notes: 'Excellent programming skills, very engaged in class discussions',
    queryHistory: 8,
    appointmentHistory: 3,
    responseRate: 95,
    parentalAccess: false
  },
  {
    id: '2',
    name: 'Bob Smith',
    email: 'bob.smith@student.edu',
    studentId: 'STU002',
    avatar: '👨‍🎓',
    year: 'Junior',
    major: 'Computer Science',
    gpa: 3.2,
    enrolledCourses: [
      { code: 'CS101', name: 'Introduction to Programming', semester: 'Fall 2025', attendance: 78 },
      { code: 'CS201', name: 'Data Structures', semester: 'Fall 2025', grade: 'B', attendance: 85 }
    ],
    contactInfo: {
      phone: '+1 (555) 222-3333',
      address: 'Off-campus: 123 Student St, Apt 2B'
    },
    academicStatus: 'good-standing',
    lastActive: '2025-07-26 15:45',
    totalCredits: 78,
    communicationPreference: 'message',
    notes: 'Shows improvement in recent assignments, participates actively',
    queryHistory: 12,
    appointmentHistory: 7,
    responseRate: 87,
    parentalAccess: true
  },
  {
    id: '3',
    name: 'Carol Davis',
    email: 'carol.davis@student.edu',
    studentId: 'STU003',
    avatar: '👩‍🎓',
    year: 'Freshman',
    major: 'Mathematics',
    gpa: 4.0,
    enrolledCourses: [
      { code: 'MATH202', name: 'Calculus II', semester: 'Fall 2025', grade: 'A', attendance: 98 },
      { code: 'ENG110', name: 'Academic Writing', semester: 'Fall 2025', grade: 'A', attendance: 95 }
    ],
    contactInfo: {
      phone: '+1 (555) 444-5555',
      address: 'Dorm Building C, Room 301',
      emergencyContact: 'Guardian: +1 (555) 666-7777'
    },
    academicStatus: 'honors',
    lastActive: '2025-07-27 09:15',
    totalCredits: 15,
    communicationPreference: 'appointment',
    specialNeeds: ['Quiet testing environment'],
    notes: 'Outstanding academic performance, natural leadership qualities',
    queryHistory: 5,
    appointmentHistory: 2,
    responseRate: 100,
    parentalAccess: false
  },
  {
    id: '4',
    name: 'David Wilson',
    email: 'david.wilson@student.edu',
    studentId: 'STU004',
    avatar: '👨‍🎓',
    year: 'Senior',
    major: 'Physics',
    gpa: 2.8,
    enrolledCourses: [
      { code: 'PHYS101', name: 'General Physics I', semester: 'Fall 2025', grade: 'C+', attendance: 65 },
      { code: 'MATH202', name: 'Calculus II', semester: 'Fall 2025', attendance: 70 }
    ],
    contactInfo: {
      phone: '+1 (555) 555-6666',
      address: 'Off-campus: 456 College Ave'
    },
    academicStatus: 'probation',
    lastActive: '2025-07-25 14:20',
    totalCredits: 95,
    communicationPreference: 'email',
    specialNeeds: ['Academic support services'],
    notes: 'Needs additional support, consider tutoring referral',
    queryHistory: 15,
    appointmentHistory: 10,
    responseRate: 72,
    parentalAccess: true
  }
]

const yearFilters = ['All', 'Freshman', 'Sophomore', 'Junior', 'Senior']
const statusFilters = ['All', 'Good Standing', 'Honors', 'Probation']
const courseFilters = ['All', 'CS101', 'CS201', 'MATH202', 'ENG110', 'PHYS101']
const sortOptions = ['Name A-Z', 'Name Z-A', 'GPA High-Low', 'GPA Low-High', 'Student ID', 'Last Active']

export default function LecturerStudentsPage() {
  const [students, setStudents] = useState<Student[]>(mockStudents)
  const [searchTerm, setSearchTerm] = useState('')
  const [yearFilter, setYearFilter] = useState('All')
  const [statusFilter, setStatusFilter] = useState('All')
  const [courseFilter, setCourseFilter] = useState('All')
  const [sortBy, setSortBy] = useState('Name A-Z')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null)
  const [showNotesModal, setShowNotesModal] = useState(false)
  const [editingNotes, setEditingNotes] = useState('')

  // Filter and sort students (Unchanged logic)
  const filteredStudents = students
    .filter(student => {
      const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           student.studentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           student.major.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesYear = yearFilter === 'All' || student.year === yearFilter
      const matchesStatus = statusFilter === 'All' || 
                           student.academicStatus === statusFilter.toLowerCase().replace(' ', '-')
      const matchesCourse = courseFilter === 'All' || 
                           student.enrolledCourses.some(course => course.code === courseFilter)
      
      return matchesSearch && matchesYear && matchesStatus && matchesCourse
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'Name A-Z': return a.name.localeCompare(b.name)
        case 'Name Z-A': return b.name.localeCompare(a.name)
        case 'GPA High-Low': return b.gpa - a.gpa
        case 'GPA Low-High': return a.gpa - b.gpa
        case 'Student ID': return a.studentId.localeCompare(b.studentId)
        case 'Last Active': return new Date(b.lastActive).getTime() - new Date(a.lastActive).getTime()
        default: return 0
      }
    })

  // Helper functions (Unchanged logic)
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'good-standing': return 'bg-green-100 text-green-800 border-green-200'
      case 'honors': return 'bg-purple-100 text-purple-800 border-purple-200'
      case 'probation': return 'bg-red-100 text-red-800 border-red-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getGPAColor = (gpa: number) => {
    if (gpa >= 3.7) return 'text-green-600'
    if (gpa >= 3.0) return 'text-blue-600'
    if (gpa >= 2.5) return 'text-orange-600'
    return 'text-red-600'
  }

  const handleContactStudent = (student: Student, method: 'message' | 'email' | 'appointment') => {
    switch (method) {
      case 'message':
        window.location.href = `/messages/new?recipient=${student.id}&type=student`
        break
      case 'email':
        window.location.href = `mailto:${student.email}`
        break
      case 'appointment':
        window.location.href = `/lecturer/appointments?student=${student.id}`
        break
    }
  }

  const handleUpdateNotes = (studentId: string, notes: string) => {
    setStudents(students.map(s => 
      s.id === studentId ? { ...s, notes } : s
    ))
    setShowNotesModal(false)
    setEditingNotes('')
  }

  const getAttendanceColor = (attendance: number) => {
    if (attendance >= 90) return 'text-green-600'
    if (attendance >= 80) return 'text-blue-600'
    if (attendance >= 70) return 'text-orange-600'
    return 'text-red-600'
  }

  const quickStats = [
    { label: 'Total Students', value: students.length, color: 'blue' },
    { label: 'Good Standing', value: students.filter(s => s.academicStatus === 'good-standing').length, color: 'green' },
    { label: 'Honors', value: students.filter(s => s.academicStatus === 'honors').length, color: 'purple' },
    { label: 'On Probation', value: students.filter(s => s.academicStatus === 'probation').length, color: 'red' },
    { label: 'Average GPA', value: (students.reduce((sum, s) => sum + s.gpa, 0) / students.length).toFixed(2), color: 'orange' },
    { label: 'Total Enrollments', value: students.reduce((sum, s) => sum + s.enrolledCourses.length, 0), color: 'cyan' },
  ]
  
  return (
    <>
      {/* --- START: Global Styles & Animations (Copied from Dashboards) --- */}
      <style jsx global>{`
        /* All the animations from the login page */
        @keyframes mesh-drift-1 { 0%, 100% { transform: rotate(0deg) scale(1) translate(0, 0); } 33% { transform: rotate(120deg) scale(1.1) translate(20px, -20px); } 66% { transform: rotate(240deg) scale(0.9) translate(-20px, 20px); } }
        .animate-mesh-drift-1 { animation: mesh-drift-1 40s ease-in-out infinite; }
        @keyframes mesh-drift-2 { 0%, 100% { transform: rotate(0deg) scale(1) translate(0, 0); } 25% { transform: rotate(90deg) scale(1.2) translate(-30px, 10px); } 50% { transform: rotate(180deg) scale(0.8) translate(10px, -30px); } 75% { transform: rotate(270deg) scale(1.1) translate(20px, 20px); } }
        .animate-mesh-drift-2 { animation: mesh-drift-2 50s ease-in-out infinite; }
        @keyframes mesh-drift-3 { 0%, 100% { transform: rotate(0deg) scale(1) translate(0, 0); } 50% { transform: rotate(180deg) scale(1.3) translate(-10px, 10px); } }
        .animate-mesh-drift-3 { animation: mesh-drift-3 35s ease-in-out infinite; }
        @keyframes equation-float-1 { 0%, 100% { transform: translateY(0px) translateX(0px) rotate(0deg); opacity: 0.8; } 25% { transform: translateY(-30px) translateX(20px) rotate(5deg); opacity: 1; } 50% { transform: translateY(-15px) translateX(40px) rotate(-3deg); opacity: 0.7; } 75% { transform: translateY(-25px) translateX(10px) rotate(7deg); opacity: 0.9; } }
        .animate-equation-float-1 { animation: equation-float-1 12s ease-in-out infinite; }
        @keyframes particle-drift-1 { 0%, 100% { transform: translateY(0px) translateX(0px) rotate(0deg); opacity: 0.6; } 25% { transform: translateY(-120px) translateX(80px) rotate(90deg); opacity: 0.9; } 50% { transform: translateY(-80px) translateX(160px) rotate(180deg); opacity: 0.7; } 75% { transform: translateY(-200px) translateX(40px) rotate(270deg); opacity: 1; } }
        .animate-particle-drift-1 { animation: particle-drift-1 15s ease-in-out infinite; }
        @keyframes glass-float-1 { 0%, 100% { transform: translate(0, 0) rotate(0deg) scale(1); } 25% { transform: translate(30px, -50px) rotate(90deg) scale(1.1); } 50% { transform: translate(-20px, -30px) rotate(180deg) scale(0.9); } 75% { transform: translate(-40px, 40px) rotate(270deg) scale(1.05); } }
        .animate-glass-float-1 { animation: glass-float-1 45s ease-in-out infinite; }
        @keyframes aurora-glow { 0%, 100% { opacity: 0.6; transform: scale(1) rotate(0deg); } 25% { opacity: 0.8; transform: scale(1.05) rotate(90deg); } 50% { opacity: 0.4; transform: scale(0.95) rotate(180deg); } 75% { opacity: 0.9; transform: scale(1.1) rotate(270deg); } }
        .animate-aurora-glow { animation: aurora-glow 8s ease-in-out infinite; }
        @keyframes glass-fade-in { 0% { opacity: 0; transform: translateY(30px) scale(0.95); } 100% { opacity: 1; transform: translateY(0) scale(1); } }
        .animate-glass-fade-in { animation: glass-fade-in 1.2s ease-out forwards; }
        @keyframes slide-up-delayed { 0% { opacity: 0; transform: translateY(40px); } 100% { opacity: 1; transform: translateY(0); } }
        .animate-slide-up-delayed { animation: slide-up-delayed 0.8s ease-out 0.2s forwards; opacity: 0; }
        .animate-slide-up-delayed-2 { animation: slide-up-delayed 0.8s ease-out 0.4s forwards; opacity: 0; }
        .animate-slide-up-delayed-3 { animation: slide-up-delayed 0.8s ease-out 0.6s forwards; opacity: 0; }
        .animate-slide-up-delayed-4 { animation: slide-up-delayed 0.8s ease-out 0.8s forwards; opacity: 0; }
        @keyframes float-up { 0% { transform: translateY(20px); opacity: 0; } 100% { transform: translateY(0); opacity: 1; } }
        .animate-float-up { animation: float-up 0.7s ease-out forwards; }
        
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
        select, input[type="text"] {
          -webkit-appearance: none;
          -moz-appearance: none;
          appearance: none;
        }
      `}</style>
      {/* --- END: Global Styles & Animations --- */}
      
      <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
        
        {/* --- START: Multi-Layered Animated Background (Copied from Dashboards) --- */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0">
          <div className="absolute top-[7%] left-[13%] text-purple-500 text-9xl opacity-75">∑</div>
          <div className="absolute top-[33%] right-[17%] text-blue-500 text-8xl opacity-70">π</div>
          <div className="absolute top-[61%] left-[27%] text-green-500 text-8xl opacity-75">∞</div>
          <div className="absolute inset-0 bg-gradient-to-br from-blue-100/40 via-purple-100/35 to-pink-100/40 animate-mesh-drift-1" />
          <div className="absolute inset-0 bg-gradient-to-tr from-emerald-100/35 via-violet-100/30 to-orange-100/35 animate-mesh-drift-2" />
          <div className="absolute inset-0 bg-gradient-to-bl from-cyan-100/40 via-purple-100/25 to-rose-100/40 animate-mesh-drift-3" />
          <div className="absolute top-1/4 left-1/6 text-4xl font-bold text-blue-600/70 animate-equation-float-1">∫ e⁻ˣ² dx = √π/2</div>
          {[...Array(60)].map((_, i) => (
            <div key={i} className={`absolute w-2 h-2 rounded-full animate-particle-drift-${(i % 4) + 1} shadow-md`}
              style={{
                left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%`, animationDelay: `${Math.random() * 12}s`,
                animationDuration: `${6 + Math.random() * 10}s`,
                background: `radial-gradient(circle, ${['rgba(59, 130, 246, 0.7)', 'rgba(16, 185, 129, 0.7)', 'rgba(168, 85, 247, 0.7)'][i % 3]}, rgba(255,255,255,0.2))`
              }} /> ))}
          <div className="absolute top-16 left-16 w-80 h-80 bg-gradient-to-br from-blue-200/30 to-cyan-200/20 rounded-full backdrop-blur-sm border border-blue-300/40 animate-glass-float-1 shadow-lg" />
        </div>
        {/* --- END: Multi-Layered Animated Background --- */}

        <div className="relative z-20 p-6">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="mb-8 animate-glass-fade-in">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent text-clean-shadow mb-2">Student Directory</h1>
              <p className="text-gray-600 text-lg">View, manage, and engage with your students.</p>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8 animate-slide-up-delayed">
              {quickStats.map((stat) => (
                <div key={stat.label} className="glass-stat-card p-4 rounded-xl text-center hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                  <div className={`text-4xl font-bold text-${stat.color}-600`}>{stat.value}</div>
                  <div className="text-sm text-gray-700 font-semibold">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Filters and Controls */}
            <div className="glass-premium-card rounded-2xl p-6 mb-8 animate-slide-up-delayed-2">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search students, ID, email, major..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-white/40 border border-gray-300/50 rounded-lg focus:ring-2 focus:ring-blue-400/50 backdrop-blur-sm transition-all text-gray-800 placeholder-gray-500"
                    />
                    <svg className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                  </div>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 lg:flex gap-2">
                  {[
                    { state: yearFilter, setState: setYearFilter, options: yearFilters },
                    { state: statusFilter, setState: setStatusFilter, options: statusFilters },
                    { state: courseFilter, setState: setCourseFilter, options: courseFilters },
                    { state: sortBy, setState: setSortBy, options: sortOptions },
                  ].map((filter, i) => (
                    <div key={i} className="relative">
                      <select
                        value={filter.state}
                        onChange={(e) => filter.setState(e.target.value)}
                        className="w-full px-4 py-2 pr-8 bg-white/40 border border-gray-300/50 rounded-lg focus:ring-2 focus:ring-blue-400/50 backdrop-blur-sm transition-all text-gray-800"
                      >
                        {filter.options.map(option => <option key={option} value={option}>{option}</option>)}
                      </select>
                       <svg className="w-4 h-4 text-gray-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                    </div>
                  ))}
                </div>
                <div className="flex-shrink-0 flex gap-2 p-1 bg-black/5 rounded-lg">
                  <button onClick={() => setViewMode('grid')} className={`px-3 py-1.5 rounded-md text-sm font-semibold flex items-center gap-2 transition-all ${viewMode === 'grid' ? 'bg-white shadow' : 'text-gray-600 hover:bg-white/50'}`}>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>
                    Grid
                  </button>
                  <button onClick={() => setViewMode('list')} className={`px-3 py-1.5 rounded-md text-sm font-semibold flex items-center gap-2 transition-all ${viewMode === 'list' ? 'bg-white shadow' : 'text-gray-600 hover:bg-white/50'}`}>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" /></svg>
                    List
                  </button>
                </div>
              </div>
            </div>

            {/* Results Info */}
            <div className="mb-4 animate-slide-up-delayed-3">
              <p className="text-gray-600">
                Showing {filteredStudents.length} of {students.length} students
              </p>
            </div>

            {/* Students Display */}
            {filteredStudents.length === 0 ? (
              <div className="glass-premium-card rounded-2xl p-8 text-center animate-slide-up-delayed-4">
                <div className="text-6xl mb-4">🤷</div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">No Students Found</h3>
                <p className="text-gray-600">Try adjusting your search or filter criteria.</p>
              </div>
            ) : (
              <div className={viewMode === 'grid' 
                ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-slide-up-delayed-4' 
                : 'space-y-4 animate-slide-up-delayed-4'
              }>
                {filteredStudents.map((student) => (
                  <div key={student.id} className="glass-premium-card rounded-2xl group transition-all duration-300 hover:scale-[1.03] hover:shadow-2xl">
                    {viewMode === 'grid' ? (
                      /* Grid View */
                      <div className="p-6">
                        <div className="text-center mb-4">
                          <span className="text-5xl mb-2 block">{student.avatar}</span>
                          <h3 className="text-xl font-bold text-gray-900">{student.name}</h3>
                          <p className="text-sm text-gray-600">{student.studentId} • {student.year}</p>
                          <div className="flex items-center justify-center gap-2 mt-2">
                            <span className={`px-2 py-0.5 rounded-full text-xs font-semibold border ${getStatusColor(student.academicStatus)}`}>
                              {student.academicStatus.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                            </span>
                            <span className={`font-bold text-sm ${getGPAColor(student.gpa)}`}>
                              GPA: {student.gpa.toFixed(1)}
                            </span>
                          </div>
                        </div>
                        <div className="border-t border-white/20 pt-4 space-y-2 text-sm">
                          <div className="flex justify-between"><span className="font-medium text-gray-700">Courses:</span><span className="text-gray-600 font-semibold">{student.enrolledCourses.map(course => course.code).join(', ')}</span></div>
                          <div className="flex justify-between"><span className="font-medium text-gray-700">Total Credits:</span><span className="text-gray-600 font-semibold">{student.totalCredits}</span></div>
                          <div className="flex justify-between"><span className="font-medium text-gray-700">Response Rate:</span><span className={`font-semibold ${student.responseRate >= 80 ? 'text-green-600' : 'text-red-600'}`}>{student.responseRate}%</span></div>
                        </div>
                        <div className="mt-4 pt-4 border-t border-white/20 flex flex-col gap-2">
                          <button onClick={() => handleContactStudent(student, 'message')} className="w-full bg-blue-500/80 text-white px-4 py-2 rounded-lg hover:bg-blue-600/90 transition-colors flex items-center justify-center gap-2">
                             <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z" clipRule="evenodd" /></svg> Message
                          </button>
                          <button onClick={() => setSelectedStudent(student)} className="w-full bg-white/50 px-4 py-2 rounded-lg hover:bg-white/80 transition-colors text-sm font-semibold">
                            View Full Profile
                          </button>
                        </div>
                      </div>
                    ) : (
                      /* List View */
                      <div className="p-4 flex items-center gap-4">
                        <span className="text-4xl">{student.avatar}</span>
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-1">
                            <h3 className="text-lg font-bold text-gray-900">{student.name}</h3>
                            <span className={`px-2 py-0.5 rounded-full text-xs font-semibold border ${getStatusColor(student.academicStatus)}`}>{student.academicStatus.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}</span>
                            <span className={`font-bold text-sm ${getGPAColor(student.gpa)}`}>GPA: {student.gpa.toFixed(1)}</span>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">{student.year} • {student.major} • {student.enrolledCourses.length} Courses</p>
                          {student.notes && <div className="p-2 bg-yellow-400/20 rounded text-xs text-yellow-800 border border-yellow-400/30"><strong>Note:</strong> {student.notes}</div>}
                        </div>
                        <div className="flex flex-col sm:flex-row gap-2">
                          <button onClick={() => handleContactStudent(student, 'message')} className="bg-blue-500/80 text-white px-3 py-1.5 rounded-lg hover:bg-blue-600/90 text-sm flex items-center gap-1.5 justify-center">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z" clipRule="evenodd" /></svg>
                          </button>
                           <button onClick={() => setSelectedStudent(student)} className="bg-white/50 px-3 py-1.5 rounded-lg hover:bg-white/80 text-sm font-semibold flex items-center gap-1.5 justify-center">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M10 12a2 2 0 100-4 2 2 0 000 4z" /><path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" /></svg>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
            
            {/* --- MODALS --- */}
            {selectedStudent && (
              <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-float-up">
                {showNotesModal ? (
                  /* Notes Edit Modal */
                  <div className="glass-premium-card rounded-2xl p-6 w-full max-w-2xl">
                    <h2 className="text-2xl font-bold mb-4 text-gray-900">Edit Notes for {selectedStudent.name}</h2>
                    <textarea
                      rows={6}
                      value={editingNotes}
                      onChange={(e) => setEditingNotes(e.target.value)}
                      className="w-full px-4 py-2 bg-white/40 border border-gray-300/50 rounded-lg focus:ring-2 focus:ring-blue-400/50 backdrop-blur-sm transition-all text-gray-800 placeholder-gray-500"
                      placeholder="Add notes about this student's performance, behavior, special considerations, etc."
                    />
                    <div className="flex gap-4 mt-4">
                      <button onClick={() => handleUpdateNotes(selectedStudent.id, editingNotes)} className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">Save Notes</button>
                      <button onClick={() => setShowNotesModal(false)} className="bg-white/50 px-6 py-2 rounded-lg hover:bg-white/80 transition-colors text-gray-800">Cancel</button>
                    </div>
                  </div>
                ) : (
                  /* Student Profile Modal */
                  <div className="glass-premium-card rounded-2xl p-6 w-full max-w-5xl max-h-[90vh] overflow-y-auto">
                    <div className="flex justify-between items-start mb-6">
                      <h2 className="text-2xl font-bold text-gray-900">{selectedStudent.name} - Profile</h2>
                      <button onClick={() => setSelectedStudent(null)} className="text-gray-500 hover:text-gray-800 transition-colors text-2xl">×</button>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                      {/* Left Column */}
                      <div className="lg:col-span-1 space-y-4">
                        <div className="text-center">
                          <span className="text-7xl mb-4 block">{selectedStudent.avatar}</span>
                          <h3 className="text-2xl font-bold">{selectedStudent.name}</h3>
                          <p className="text-gray-600">{selectedStudent.studentId}</p>
                          <p className="text-gray-600">{selectedStudent.year} • {selectedStudent.major}</p>
                          <div className="mt-2 flex items-center justify-center gap-2">
                            <span className={`px-3 py-1 rounded-full text-sm font-semibold border ${getStatusColor(selectedStudent.academicStatus)}`}>
                              {selectedStudent.academicStatus.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                            </span>
                            <div className={`text-2xl font-bold ${getGPAColor(selectedStudent.gpa)}`}>GPA: {selectedStudent.gpa.toFixed(2)}</div>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <button onClick={() => handleContactStudent(selectedStudent, 'message')} className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center justify-center gap-2">
                             <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z" clipRule="evenodd" /></svg> Send Message
                          </button>
                          <button onClick={() => { setEditingNotes(selectedStudent.notes || ''); setShowNotesModal(true); }} className="w-full bg-yellow-400/80 text-yellow-900 px-4 py-2 rounded-lg hover:bg-yellow-400 flex items-center justify-center gap-2">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" /></svg> Edit Notes
                          </button>
                        </div>
                        <div className="glass-activity-card p-4 rounded-xl">
                          <h4 className="font-semibold text-gray-900 mb-2">Contact Info</h4>
                          <div className="space-y-1 text-sm text-gray-700">
                             <div><span className="font-semibold">Email:</span> {selectedStudent.email}</div>
                             {selectedStudent.contactInfo.phone && <div><span className="font-semibold">Phone:</span> {selectedStudent.contactInfo.phone}</div>}
                             {selectedStudent.contactInfo.address && <div><span className="font-semibold">Address:</span> {selectedStudent.contactInfo.address}</div>}
                             {selectedStudent.contactInfo.emergencyContact && <div><span className="font-semibold">Emergency:</span> {selectedStudent.contactInfo.emergencyContact}</div>}
                             <div><span className="font-semibold">Prefers:</span> {selectedStudent.communicationPreference}</div>
                          </div>
                        </div>
                      </div>
                      {/* Right Column */}
                      <div className="lg:col-span-2 space-y-6">
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2">Enrolled Courses</h4>
                          <div className="space-y-2">
                            {selectedStudent.enrolledCourses.map((course, idx) => (
                              <div key={idx} className="p-3 glass-activity-card rounded-xl">
                                <div className="flex justify-between items-start">
                                  <div>
                                    <div className="font-bold text-gray-800">{course.code} - {course.name}</div>
                                    <div className="text-sm text-gray-600">{course.semester}</div>
                                  </div>
                                  <div className="text-right">
                                    {course.grade ? <div className="font-bold text-blue-600">Grade: {course.grade}</div> : <div className="text-sm text-gray-500">In Progress</div>}
                                    <div className={`text-sm ${getAttendanceColor(course.attendance)}`}>Attendance: {course.attendance}%</div>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                        {selectedStudent.specialNeeds && selectedStudent.specialNeeds.length > 0 && (
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-2">Special Accommodations</h4>
                            <div className="flex flex-wrap gap-2">
                              {selectedStudent.specialNeeds.map((need, idx) => <span key={idx} className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm border border-orange-200">{need}</span>)}
                            </div>
                          </div>
                        )}
                        {selectedStudent.notes && (
                           <div>
                            <h4 className="font-semibold text-gray-900 mb-2">Instructor Notes</h4>
                            <div className="p-4 bg-yellow-400/20 rounded-xl border border-yellow-400/30">
                              <p className="text-yellow-900">{selectedStudent.notes}</p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
