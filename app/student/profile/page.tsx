// app/student/profile/page.tsx - LINTING ERRORS FIXED
'use client'

import { useState } from 'react'
import Link from 'next/link'

// --- Interfaces (Unchanged) ---
interface StudentProfile {
  firstName: string
  lastName: string
  email: string
  studentId: string
  phone: string
  dateOfBirth: string
  gender: string
  program: string
  year: string
  gpa: string
  major: string
  minor: string
  expectedGraduation: string
  address: string
  city: string
  country: string
  postalCode: string
  emergencyContact: string
  emergencyPhone: string
  profilePicture: string
  bio: string
  linkedIn: string
  github: string
  portfolio: string
  enrollmentStatus: 'full-time' | 'part-time' | 'exchange'
  academicStanding: 'good' | 'probation' | 'honors'
}

// --- Mock Data (Unchanged) ---
const mockProfile: StudentProfile = {
  firstName: 'Alex',
  lastName: 'Johnson',
  email: 'alex.johnson@university.edu',
  studentId: 'STU2025001',
  phone: '+1 (555) 123-4567',
  dateOfBirth: '2003-05-15',
  gender: 'prefer-not-to-say',
  program: 'Bachelor of Computer Science',
  year: '2nd Year',
  gpa: '3.75',
  major: 'Computer Science',
  minor: 'Mathematics',
  expectedGraduation: '2027-05',
  address: '123 University Avenue',
  city: 'University City',
  country: 'United States',
  postalCode: '12345',
  emergencyContact: 'Sarah Johnson (Mother)',
  emergencyPhone: '+1 (555) 987-6543',
  profilePicture: '',
  bio: 'Passionate computer science student interested in AI and machine learning. Love problem-solving and building innovative solutions.',
  linkedIn: 'https://linkedin.com/in/alexjohnson',
  github: 'https://github.com/alexjohnson',
  portfolio: 'https://alexjohnson.dev',
  enrollmentStatus: 'full-time',
  academicStanding: 'good'
}

const courses = [
  { code: 'CS101', name: 'Introduction to Programming', credits: 3, grade: 'A-', semester: 'Fall 2024' },
  { code: 'MATH202', name: 'Calculus II', credits: 4, grade: 'B+', semester: 'Fall 2024' },
  { code: 'ENG110', name: 'Academic Writing', credits: 3, grade: 'A', semester: 'Fall 2024' },
  { code: 'CS201', name: 'Data Structures', credits: 3, grade: 'A', semester: 'Spring 2025' },
  { code: 'MATH301', name: 'Linear Algebra', credits: 3, grade: 'B', semester: 'Spring 2025' }
]

export default function StudentProfilePage() {
  const [profile, setProfile] = useState<StudentProfile>(mockProfile)
  const [activeTab, setActiveTab] = useState('personal')
  const [isEditing, setIsEditing] = useState(false)
  const [hasChanges, setHasChanges] = useState(false)
  const [modalMessage, setModalMessage] = useState<string | null>(null);


  const handleInputChange = (field: keyof StudentProfile, value: string | boolean) => {
    setProfile(prev => ({ ...prev, [field]: value }))
    setHasChanges(true)
  }

  const handleSave = () => {
    console.log('Saving profile:', profile)
    setIsEditing(false)
    setHasChanges(false)
    setModalMessage('Profile updated successfully!');
  }

  const handleCancel = () => {
    setProfile(mockProfile)
    setIsEditing(false)
    setHasChanges(false)
  }

  const calculateCurrentGPA = () => {
    const gradePoints = { 'A': 4.0, 'A-': 3.7, 'B+': 3.3, 'B': 3.0, 'B-': 2.7, 'C+': 2.3, 'C': 2.0, 'C-': 1.7, 'D': 1.0, 'F': 0.0 }
    const completedCourses = courses.filter(course => course.grade)
    const totalPoints = completedCourses.reduce((sum, course) => sum + (gradePoints[course.grade as keyof typeof gradePoints] * course.credits), 0)
    const totalCredits = completedCourses.reduce((sum, course) => sum + course.credits, 0)
    return totalCredits > 0 ? (totalPoints / totalCredits).toFixed(2) : '0.00'
  }

  const tabs = [
    { id: 'personal', name: 'Personal Info', icon: '👤' },
    { id: 'academic', name: 'Academic Info', icon: '🎓' },
    { id: 'contact', name: 'Contact & Address', icon: '📍' },
    { id: 'social', name: 'Social Links', icon: '🔗' },
    { id: 'courses', name: 'Course History', icon: '📚' }
  ]

  // --- Helper for input styling ---
  const inputStyles = "w-full px-4 py-2 border rounded-lg transition-all duration-300 focus:ring-2 focus:ring-blue-500"
  const enabledInputStyles = "bg-white/60 border-gray-300/70 focus:bg-white/80"
  const disabledInputStyles = "bg-gray-500/10 border-transparent cursor-default"

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
        
        /* Enhanced Glassmorphism Card Styles */
        .glass-card { background: linear-gradient(135deg, rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.4)); backdrop-filter: blur(32px); border: 1px solid rgba(255, 255, 255, 0.9); box-shadow: 0 8px 32px rgba(31, 38, 135, 0.15), 0 0 0 1px rgba(255, 255, 255, 0.5) inset, 0 2px 8px rgba(255, 255, 255, 0.7) inset; }
        .glass-stat-card { background: linear-gradient(135deg, rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 0.3)); backdrop-filter: blur(24px); border: 1px solid rgba(255, 255, 255, 0.8); box-shadow: 0 6px 24px rgba(31, 38, 135, 0.1), 0 0 0 1px rgba(255, 255, 255, 0.4) inset; }
        .glass-activity-card { background: linear-gradient(135deg, rgba(255, 255, 255, 0.6), rgba(255, 255, 255, 0.2)); backdrop-filter: blur(20px); border: 1px solid rgba(255, 255, 255, 0.7); box-shadow: 0 4px 16px rgba(31, 38, 135, 0.08), 0 0 0 1px rgba(255, 255, 255, 0.3) inset; }
        .glass-sidebar-card { background: linear-gradient(135deg, rgba(255, 255, 255, 0.75), rgba(255, 255, 255, 0.35)); backdrop-filter: blur(28px); border: 1px solid rgba(255, 255, 255, 0.85); box-shadow: 0 6px 20px rgba(31, 38, 135, 0.12), 0 0 0 1px rgba(255, 255, 255, 0.45) inset; }
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
          <div className="max-w-5xl mx-auto">
            {/* Header */}
            <div className="mb-8 animate-glass-fade-in">
              <div className="flex justify-between items-start">
                <div>
                  <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent text-clean-shadow mb-2">My Profile</h1>
                  <p className="text-gray-600">Manage your personal and academic information</p>
                </div>
                <div className="flex gap-3">
                  {!isEditing ? (
                    <button
                      onClick={() => setIsEditing(true)}
                      className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-5 py-2 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105"
                    >
                      ✏️ Edit Profile
                    </button>
                  ) : (
                    <div className="flex gap-2">
                      <button
                        onClick={handleSave}
                        disabled={!hasChanges}
                        className="inline-flex items-center gap-2 bg-gradient-to-r from-green-500 to-green-600 text-white px-5 py-2 rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105 disabled:from-gray-400 disabled:to-gray-500 disabled:scale-100 disabled:cursor-not-allowed"
                      >
                        💾 Save Changes
                      </button>
                      <button
                        onClick={handleCancel}
                        className="bg-white/70 text-gray-700 px-5 py-2 rounded-lg hover:bg-white/90 transition-colors shadow-sm border border-gray-300/50"
                      >
                        ❌ Cancel
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Enhanced Profile Summary Card */}
            <div className="relative group mb-6 animate-slide-up-delayed">
              <div className="absolute -inset-2 bg-gradient-to-r from-blue-300/20 via-purple-300/30 to-pink-300/20 rounded-2xl blur-xl opacity-60 group-hover:opacity-80 transition-all duration-1000 animate-aurora-glow" />
              <div className="relative glass-card rounded-2xl p-6">
                <div className="flex items-center gap-6">
                  <div className="w-24 h-24 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-4xl text-white font-bold shadow-lg">
                    {profile.firstName.charAt(0)}{profile.lastName.charAt(0)}
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-gray-900">{profile.firstName} {profile.lastName}</h2>
                    <p className="text-gray-600">{profile.program} • {profile.year}</p>
                    <p className="text-sm text-gray-500">Student ID: {profile.studentId}</p>
                    <div className="flex gap-4 mt-2">
                      <span className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full font-medium">
                        {profile.enrollmentStatus.charAt(0).toUpperCase() + profile.enrollmentStatus.slice(1).replace('-', ' ')}
                      </span>
                      <span className={`px-3 py-1 text-sm rounded-full font-medium ${
                        profile.academicStanding === 'honors' ? 'bg-purple-100 text-purple-800' :
                        profile.academicStanding === 'good' ? 'bg-green-100 text-green-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {profile.academicStanding.charAt(0).toUpperCase() + profile.academicStanding.slice(1)} Standing
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-4xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">{calculateCurrentGPA()}</div>
                    <div className="text-sm text-gray-500 font-semibold">Current GPA</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Enhanced Tabs */}
            <div className="glass-card rounded-2xl mb-6 animate-slide-up-delayed-2">
              <div className="border-b border-white/30">
                <nav className="flex space-x-4 px-6 overflow-x-auto">
                  {tabs.map(tab => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`relative border-b-2 py-4 px-2 text-sm font-medium flex items-center gap-2 transition-all duration-300 ${
                        activeTab === tab.id
                          ? 'border-blue-500 text-blue-600'
                          : 'border-transparent text-gray-500 hover:text-gray-800'
                      }`}
                    >
                      <span>{tab.icon}</span>
                      {tab.name}
                    </button>
                  ))}
                </nav>
              </div>

              <div className="p-6">
                {/* Personal Information Tab */}
                {activeTab === 'personal' && (
                  <div className="space-y-6">
                    <h3 className="text-lg font-semibold text-gray-900">Personal Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                        <input type="text" value={profile.firstName} onChange={(e) => handleInputChange('firstName', e.target.value)} disabled={!isEditing} className={`${inputStyles} ${isEditing ? enabledInputStyles : disabledInputStyles}`} />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                        <input type="text" value={profile.lastName} onChange={(e) => handleInputChange('lastName', e.target.value)} disabled={!isEditing} className={`${inputStyles} ${isEditing ? enabledInputStyles : disabledInputStyles}`} />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <input type="email" value={profile.email} onChange={(e) => handleInputChange('email', e.target.value)} disabled={!isEditing} className={`${inputStyles} ${isEditing ? enabledInputStyles : disabledInputStyles}`} />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                        <input type="tel" value={profile.phone} onChange={(e) => handleInputChange('phone', e.target.value)} disabled={!isEditing} className={`${inputStyles} ${isEditing ? enabledInputStyles : disabledInputStyles}`} />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
                        <input type="date" value={profile.dateOfBirth} onChange={(e) => handleInputChange('dateOfBirth', e.target.value)} disabled={!isEditing} className={`${inputStyles} ${isEditing ? enabledInputStyles : disabledInputStyles}`} />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                        <select value={profile.gender} onChange={(e) => handleInputChange('gender', e.target.value)} disabled={!isEditing} className={`${inputStyles} ${isEditing ? enabledInputStyles : disabledInputStyles}`}>
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                          <option value="other">Other</option>
                          <option value="prefer-not-to-say">Prefer not to say</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
                      <textarea rows={4} value={profile.bio} onChange={(e) => handleInputChange('bio', e.target.value)} disabled={!isEditing} placeholder="Tell us about yourself..." className={`${inputStyles} ${isEditing ? enabledInputStyles : disabledInputStyles}`} />
                    </div>
                  </div>
                )}

                {/* Academic Information Tab */}
                {activeTab === 'academic' && (
                  <div className="space-y-6">
                    <h3 className="text-lg font-semibold text-gray-900">Academic Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Student ID</label>
                        <input type="text" value={profile.studentId} disabled className={`${inputStyles} ${disabledInputStyles}`} />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Academic Year</label>
                        <select value={profile.year} onChange={(e) => handleInputChange('year', e.target.value)} disabled={!isEditing} className={`${inputStyles} ${isEditing ? enabledInputStyles : disabledInputStyles}`}>
                          <option value="1st Year">1st Year</option>
                          <option value="2nd Year">2nd Year</option>
                          <option value="3rd Year">3rd Year</option>
                          <option value="4th Year">4th Year</option>
                          <option value="5th Year">5th Year</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Program</label>
                        <input type="text" value={profile.program} onChange={(e) => handleInputChange('program', e.target.value)} disabled={!isEditing} className={`${inputStyles} ${isEditing ? enabledInputStyles : disabledInputStyles}`} />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Major</label>
                        <input type="text" value={profile.major} onChange={(e) => handleInputChange('major', e.target.value)} disabled={!isEditing} className={`${inputStyles} ${isEditing ? enabledInputStyles : disabledInputStyles}`} />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Minor</label>
                        <input type="text" value={profile.minor} onChange={(e) => handleInputChange('minor', e.target.value)} disabled={!isEditing} className={`${inputStyles} ${isEditing ? enabledInputStyles : disabledInputStyles}`} />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Expected Graduation</label>
                        <input type="month" value={profile.expectedGraduation} onChange={(e) => handleInputChange('expectedGraduation', e.target.value)} disabled={!isEditing} className={`${inputStyles} ${isEditing ? enabledInputStyles : disabledInputStyles}`} />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Enrollment Status</label>
                        {/* FIX: Replaced 'any' with a specific type assertion */}
                        <select value={profile.enrollmentStatus} onChange={(e) => handleInputChange('enrollmentStatus', e.target.value as StudentProfile['enrollmentStatus'])} disabled={!isEditing} className={`${inputStyles} ${isEditing ? enabledInputStyles : disabledInputStyles}`}>
                          <option value="full-time">Full-time</option>
                          <option value="part-time">Part-time</option>
                          <option value="exchange">Exchange Student</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Academic Standing</label>
                        {/* FIX: Replaced 'any' with a specific type assertion */}
                        <select value={profile.academicStanding} onChange={(e) => handleInputChange('academicStanding', e.target.value as StudentProfile['academicStanding'])} disabled className={`${inputStyles} ${disabledInputStyles}`}>
                          <option value="good">Good Standing</option>
                          <option value="probation">Academic Probation</option>
                          <option value="honors">Honors</option>
                        </select>
                      </div>
                    </div>
                  </div>
                )}

                {/* Contact & Address Tab */}
                {activeTab === 'contact' && (
                  <div className="space-y-6">
                    <h3 className="text-lg font-semibold text-gray-900">Contact & Address Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                        <input type="text" value={profile.address} onChange={(e) => handleInputChange('address', e.target.value)} disabled={!isEditing} className={`${inputStyles} ${isEditing ? enabledInputStyles : disabledInputStyles}`} />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                        <input type="text" value={profile.city} onChange={(e) => handleInputChange('city', e.target.value)} disabled={!isEditing} className={`${inputStyles} ${isEditing ? enabledInputStyles : disabledInputStyles}`} />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
                        <input type="text" value={profile.country} onChange={(e) => handleInputChange('country', e.target.value)} disabled={!isEditing} className={`${inputStyles} ${isEditing ? enabledInputStyles : disabledInputStyles}`} />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Postal Code</label>
                        <input type="text" value={profile.postalCode} onChange={(e) => handleInputChange('postalCode', e.target.value)} disabled={!isEditing} className={`${inputStyles} ${isEditing ? enabledInputStyles : disabledInputStyles}`} />
                      </div>
                    </div>
                    <div className="border-t border-white/30 pt-6">
                      <h4 className="text-md font-semibold text-gray-900 mb-4">Emergency Contact</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Emergency Contact Name</label>
                          <input type="text" value={profile.emergencyContact} onChange={(e) => handleInputChange('emergencyContact', e.target.value)} disabled={!isEditing} className={`${inputStyles} ${isEditing ? enabledInputStyles : disabledInputStyles}`} />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Emergency Contact Phone</label>
                          <input type="tel" value={profile.emergencyPhone} onChange={(e) => handleInputChange('emergencyPhone', e.target.value)} disabled={!isEditing} className={`${inputStyles} ${isEditing ? enabledInputStyles : disabledInputStyles}`} />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Social Links Tab */}
                {activeTab === 'social' && (
                  <div className="space-y-6">
                    <h3 className="text-lg font-semibold text-gray-900">Social Links & Portfolio</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">LinkedIn Profile</label>
                        <input type="url" value={profile.linkedIn} onChange={(e) => handleInputChange('linkedIn', e.target.value)} disabled={!isEditing} placeholder="https://linkedin.com/in/yourusername" className={`${inputStyles} ${isEditing ? enabledInputStyles : disabledInputStyles}`} />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">GitHub Profile</label>
                        <input type="url" value={profile.github} onChange={(e) => handleInputChange('github', e.target.value)} disabled={!isEditing} placeholder="https://github.com/yourusername" className={`${inputStyles} ${isEditing ? enabledInputStyles : disabledInputStyles}`} />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Portfolio Website</label>
                        <input type="url" value={profile.portfolio} onChange={(e) => handleInputChange('portfolio', e.target.value)} disabled={!isEditing} placeholder="https://yourportfolio.com" className={`${inputStyles} ${isEditing ? enabledInputStyles : disabledInputStyles}`} />
                      </div>
                    </div>
                    {(profile.linkedIn || profile.github || profile.portfolio) && (
                      <div className="border-t border-white/30 pt-6">
                        <h4 className="text-md font-semibold text-gray-900 mb-4">Quick Links</h4>
                        <div className="flex flex-wrap gap-3">
                          {profile.linkedIn && (<a href={profile.linkedIn} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-blue-100/70 text-blue-700 px-4 py-2 rounded-lg hover:bg-blue-100 transition-colors font-medium">💼 LinkedIn</a>)}
                          {profile.github && (<a href={profile.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-gray-200/70 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors font-medium">🐙 GitHub</a>)}
                          {profile.portfolio && (<a href={profile.portfolio} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-purple-100/70 text-purple-700 px-4 py-2 rounded-lg hover:bg-purple-100 transition-colors font-medium">🌐 Portfolio</a>)}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Course History Tab */}
                {activeTab === 'courses' && (
                  <div className="space-y-6">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-semibold text-gray-900">Course History</h3>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-blue-600">{calculateCurrentGPA()}</div>
                        <div className="text-sm text-gray-500">Cumulative GPA</div>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                      <div className="glass-stat-card p-4 rounded-xl text-center">
                        <div className="text-3xl font-bold text-blue-600">{courses.length}</div>
                        <div className="text-sm text-blue-800 font-semibold">Total Courses</div>
                      </div>
                      <div className="glass-stat-card p-4 rounded-xl text-center">
                        <div className="text-3xl font-bold text-green-600">{courses.reduce((sum, course) => sum + course.credits, 0)}</div>
                        <div className="text-sm text-green-800 font-semibold">Total Credits</div>
                      </div>
                      <div className="glass-stat-card p-4 rounded-xl text-center">
                        <div className="text-3xl font-bold text-purple-600">{courses.filter(course => ['A', 'A-', 'B+'].includes(course.grade)).length}</div>
                        <div className="text-sm text-purple-800 font-semibold">High Grades</div>
                      </div>
                    </div>
                    <div className="space-y-3">
                      {courses.map((course, index) => (
                        <div key={index} className="glass-activity-card p-4 rounded-lg">
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="font-semibold text-gray-900">{course.code}: {course.name}</h4>
                              <p className="text-sm text-gray-600">{course.semester}</p>
                            </div>
                            <div className="text-right">
                              <div className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                                course.grade.startsWith('A') ? 'bg-green-100 text-green-800' :
                                course.grade.startsWith('B') ? 'bg-blue-100 text-blue-800' :
                                course.grade.startsWith('C') ? 'bg-yellow-100 text-yellow-800' :
                                'bg-red-100 text-red-800'
                              }`}>{course.grade}</div>
                              <div className="text-sm text-gray-500 mt-1">{course.credits} credits</div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Enhanced Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-slide-up-delayed-3">
              <Link href="/student/settings" className="block group">
                <div className="glass-sidebar-card rounded-2xl p-6 text-center transition-all duration-300 hover:scale-105 hover:shadow-xl">
                  <div className="text-4xl mb-2">⚙️</div>
                  <div className="font-medium text-gray-900">Account Settings</div>
                  <div className="text-sm text-gray-600">Privacy, notifications, and preferences</div>
                </div>
              </Link>
              <Link href="/student/queries" className="block group">
                <div className="glass-sidebar-card rounded-2xl p-6 text-center transition-all duration-300 hover:scale-105 hover:shadow-xl">
                  <div className="text-4xl mb-2">❓</div>
                  <div className="font-medium text-gray-900">Academic Support</div>
                  <div className="text-sm text-gray-600">Get help with your studies</div>
                </div>
              </Link>
              <Link href="/student/appointments" className="block group">
                <div className="glass-sidebar-card rounded-2xl p-6 text-center transition-all duration-300 hover:scale-105 hover:shadow-xl">
                  <div className="text-4xl mb-2">📅</div>
                  <div className="font-medium text-gray-900">Book Appointment</div>
                  <div className="text-sm text-gray-600">Schedule time with lecturers</div>
                </div>
              </Link>
            </div>
          </div>
        </div>

        {/* Modal for Alerts */}
        {modalMessage && (
            <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center animate-glass-fade-in">
                <div className="glass-card rounded-2xl p-6 w-full max-w-sm text-center">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Notification</h3>
                    <p className="text-gray-600 mb-6">{modalMessage}</p>
                    <div className="flex justify-center">
                        <button
                            onClick={() => setModalMessage(null)}
                            className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-5 py-2 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-md hover:shadow-lg"
                        >
                            OK
                        </button>
                    </div>
                </div>
            </div>
        )}
      </div>
    </>
  )
}
