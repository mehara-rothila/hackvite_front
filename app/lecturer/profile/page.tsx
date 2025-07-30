
// app/lecturer/profile/page.tsx - ENHANCED WITH GLASSMORPHISM & VECTOR ICONS
'use client'

import { useState } from 'react'
import Link from 'next/link'

interface LecturerProfile {
  // Personal Information
  title: string
  firstName: string
  lastName: string
  email: string
  employeeId: string
  phone: string
  dateOfBirth: string
  
  // Academic Information
  department: string
  position: string
  specialization: string[]
  qualification: string
  experience: string
  research: string[]
  
  // Contact & Office
  officeAddress: string
  officeHours: string
  campus: string
  building: string
  room: string
  
  // Profile Settings
  profilePicture: string
  bio: string
  linkedIn: string
  researchGate: string
  website: string
  orcid: string
  
  // Teaching Status
  employmentType: 'full-time' | 'part-time' | 'visiting' | 'adjunct'
  status: 'active' | 'sabbatical' | 'emeritus'
}

const mockProfile: LecturerProfile = {
  title: 'Dr.',
  firstName: 'Sarah',
  lastName: 'Johnson',
  email: 'sarah.johnson@university.edu',
  employeeId: 'FAC2019045',
  phone: '+1 (555) 234-5678',
  dateOfBirth: '1980-03-20',
  
  department: 'Computer Science',
  position: 'Associate Professor',
  specialization: ['Machine Learning', 'Artificial Intelligence', 'Data Science'],
  qualification: 'Ph.D. in Computer Science, Stanford University',
  experience: '8 years',
  research: ['Deep Learning', 'Natural Language Processing', 'Computer Vision'],
  
  officeAddress: 'Computer Science Building, Room 201B',
  officeHours: 'Monday & Wednesday 2:00-4:00 PM, Friday 10:00-12:00 PM',
  campus: 'Main Campus',
  building: 'Computer Science Building',
  room: '201B',
  
  profilePicture: '',
  bio: 'Dr. Sarah Johnson is an Associate Professor of Computer Science with expertise in machine learning and artificial intelligence. Her research focuses on developing innovative AI solutions for real-world problems.',
  linkedIn: 'https://linkedin.com/in/drsarahjohnson',
  researchGate: 'https://researchgate.net/profile/Sarah-Johnson',
  website: 'https://sarahjohnson.edu',
  orcid: 'https://orcid.org/0000-0000-0000-0000',
  
  employmentType: 'full-time',
  status: 'active'
}

const courses = [
  { code: 'CS101', name: 'Introduction to Programming', semester: 'Fall 2024', students: 45, type: 'Lecture' },
  { code: 'CS301', name: 'Machine Learning Fundamentals', semester: 'Fall 2024', students: 32, type: 'Lecture' },
  { code: 'CS499', name: 'Advanced AI Research', semester: 'Spring 2025', students: 8, type: 'Seminar' },
  { code: 'CS201', name: 'Data Structures & Algorithms', semester: 'Spring 2025', students: 38, type: 'Lecture' }
]

const publications = [
  {
    title: 'Deep Learning Approaches for Automated Essay Scoring',
    journal: 'IEEE Transactions on Learning Technologies',
    year: '2024',
    citations: 23,
    type: 'Journal Article'
  },
  {
    title: 'Enhancing Student Engagement through AI-Powered Learning Platforms',
    conference: 'International Conference on Educational Technology',
    year: '2024',
    citations: 12,
    type: 'Conference Paper'
  },
  {
    title: 'Machine Learning in Higher Education: A Comprehensive Review',
    journal: 'Computers & Education',
    year: '2023',
    citations: 45,
    type: 'Review Article'
  }
]

export default function LecturerProfilePage() {
  const [profile, setProfile] = useState<LecturerProfile>(mockProfile)
  const [activeTab, setActiveTab] = useState('personal')
  const [isEditing, setIsEditing] = useState(false)
  const [hasChanges, setHasChanges] = useState(false)

  const handleInputChange = (field: keyof LecturerProfile, value: string | string[]) => {
    setProfile(prev => ({ ...prev, [field]: value }))
    setHasChanges(true)
  }

  const handleSpecializationChange = (index: number, value: string) => {
    const newSpecs = [...profile.specialization]
    newSpecs[index] = value
    handleInputChange('specialization', newSpecs)
  }

  const addSpecialization = () => {
    handleInputChange('specialization', [...profile.specialization, ''])
  }

  const removeSpecialization = (index: number) => {
    const newSpecs = profile.specialization.filter((_, i) => i !== index)
    handleInputChange('specialization', newSpecs)
  }

  const handleResearchChange = (index: number, value: string) => {
    const newResearch = [...profile.research]
    newResearch[index] = value
    handleInputChange('research', newResearch)
  }

  const addResearch = () => {
    handleInputChange('research', [...profile.research, ''])
  }

  const removeResearch = (index: number) => {
    const newResearch = profile.research.filter((_, i) => i !== index)
    handleInputChange('research', newResearch)
  }

  const handleSave = () => {
    console.log('Saving profile:', profile)
    setIsEditing(false)
    setHasChanges(false)
    alert('Profile updated successfully!')
  }

  const handleCancel = () => {
    setProfile(mockProfile)
    setIsEditing(false)
    setHasChanges(false)
  }

  const tabs = [
    { id: 'personal', name: 'Personal Info', icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg> },
    { id: 'academic', name: 'Academic Info', icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82zM12 3L1 9l11 6 9-4.909V17h2V9L12 3z"/></svg> },
    { id: 'office', name: 'Office & Contact', icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 7V3H2v18h20V7H12zM6 19H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V9h2v2zm0-4H4V5h2v2zm4 12H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V9h2v2zm0-4H8V5h2v2zm10 12h-8v-2h2v-2h-2v-2h2v-2h-2V9h8v10zm-2-8h-2v2h2v-2zm0 4h-2v2h2v-2z"/></svg> },
    { id: 'research', name: 'Research Links', icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z"/></svg> },
    { id: 'teaching', name: 'Teaching & Publications', icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 4h5v8l-2.5-1.5L6 12V4z"/></svg> }
  ]

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
        .glass-input {
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 0.2));
          backdrop-filter: blur(10px) saturate(100%);
          border: 1px solid rgba(255, 255, 255, 0.5);
          box-shadow: 0 2px 8px rgba(31, 38, 135, 0.05), 0 0 0 1px rgba(255, 255, 255, 0.3) inset;
          color: #374151; /* text-gray-700 */
        }
        .glass-input::placeholder {
          color: #6b7280; /* text-gray-500 */
        }
        .glass-input:focus {
          outline: none;
          box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.5), 0 2px 8px rgba(31, 38, 135, 0.1);
        }
        .glass-input:disabled {
          background: linear-gradient(135deg, rgba(230, 230, 230, 0.5), rgba(230, 230, 230, 0.2));
          cursor: not-allowed;
        }
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
          <div className="max-w-5xl mx-auto">
            {/* Header */}
            <div className="mb-8 animate-glass-fade-in">
              <div className="relative group">
                <div className="absolute -inset-2 bg-gradient-to-r from-blue-300/20 via-purple-300/30 to-pink-300/20 rounded-2xl blur-xl opacity-60 group-hover:opacity-80 transition-all duration-1000 animate-aurora-glow" />
                <div className="relative glass-premium-card rounded-2xl p-5">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white shadow-lg">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                      </div>
                      <div>
                        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent text-clean-shadow">
                          My Profile
                        </h1>
                        <p className="text-gray-600 text-sm font-medium">Manage your academic and professional information</p>
                      </div>
                    </div>
                    <div className="flex gap-3 self-end sm:self-center">
                      {!isEditing ? (
                        <button onClick={() => setIsEditing(true)} className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-semibold shadow-md">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>
                          Edit Profile
                        </button>
                      ) : (
                        <div className="flex gap-2">
                          <button onClick={handleSave} disabled={!hasChanges} className="inline-flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-semibold shadow-md">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V7l-4-4zm-5 16c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm3-10H5V5h10v4z"/></svg>
                            Save
                          </button>
                          <button onClick={handleCancel} className="inline-flex items-center gap-2 bg-white/50 text-gray-800 px-4 py-2 rounded-lg hover:bg-white/80 transition-colors font-semibold">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>
                            Cancel
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Profile Summary Card */}
            <div className="glass-premium-card rounded-2xl p-6 mb-6 animate-slide-up-delayed">
              <div className="flex items-center gap-6">
                <div className="w-24 h-24 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-4xl text-white font-bold shadow-lg">
                  {profile.firstName.charAt(0)}{profile.lastName.charAt(0)}
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-gray-900">{profile.title} {profile.firstName} {profile.lastName}</h2>
                  <p className="text-gray-600 font-medium">{profile.position} • {profile.department}</p>
                  <p className="text-sm text-gray-500">Employee ID: {profile.employeeId}</p>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {profile.specialization.slice(0, 3).map((spec, index) => (
                      <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full font-semibold border border-blue-200">{spec}</span>
                    ))}
                    {profile.specialization.length > 3 && <span className="px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-full font-semibold border border-gray-200">+{profile.specialization.length - 3} more</span>}
                  </div>
                </div>
                <div className="text-right space-y-2">
                  <div className="glass-stat-card p-3 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">{courses.length}</div>
                    <div className="text-xs text-gray-600 font-semibold">Active Courses</div>
                  </div>
                  <div className="glass-stat-card p-3 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">{courses.reduce((sum, course) => sum + course.students, 0)}</div>
                    <div className="text-xs text-gray-600 font-semibold">Total Students</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="glass-premium-card rounded-2xl mb-6 p-2 animate-slide-up-delayed-2">
              <nav className="flex flex-wrap justify-center gap-2">
                {tabs.map(tab => (
                  <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-2 transition-all duration-300 ${activeTab === tab.id ? 'bg-white/50 text-blue-700 shadow-md' : 'text-gray-600 hover:bg-white/20 hover:text-gray-900'}`}>
                    {tab.icon} {tab.name}
                  </button>
                ))}
              </nav>
            </div>
            
            <div className="glass-card rounded-2xl p-6 animate-slide-up-delayed-3">
              {/* Personal Information Tab */}
              {activeTab === 'personal' && (
                <div className="space-y-6 animate-glass-fade-in">
                  <h3 className="text-lg font-bold text-gray-900">Personal Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                      <select value={profile.title} onChange={(e) => handleInputChange('title', e.target.value)} disabled={!isEditing} className="w-full px-4 py-2 rounded-lg glass-input">
                        <option value="Dr.">Dr.</option>
                        <option value="Prof.">Prof.</option>
                        <option value="Mr.">Mr.</option>
                        <option value="Ms.">Ms.</option>
                        <option value="Mrs.">Mrs.</option>
                      </select>
                    </div>
                    <div></div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                      <input type="text" value={profile.firstName} onChange={(e) => handleInputChange('firstName', e.target.value)} disabled={!isEditing} className="w-full px-4 py-2 rounded-lg glass-input" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                      <input type="text" value={profile.lastName} onChange={(e) => handleInputChange('lastName', e.target.value)} disabled={!isEditing} className="w-full px-4 py-2 rounded-lg glass-input" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                      <input type="email" value={profile.email} onChange={(e) => handleInputChange('email', e.target.value)} disabled={!isEditing} className="w-full px-4 py-2 rounded-lg glass-input" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                      <input type="tel" value={profile.phone} onChange={(e) => handleInputChange('phone', e.target.value)} disabled={!isEditing} className="w-full px-4 py-2 rounded-lg glass-input" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
                      <input type="date" value={profile.dateOfBirth} onChange={(e) => handleInputChange('dateOfBirth', e.target.value)} disabled={!isEditing} className="w-full px-4 py-2 rounded-lg glass-input" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
                    <textarea rows={4} value={profile.bio} onChange={(e) => handleInputChange('bio', e.target.value)} disabled={!isEditing} placeholder="Tell us about your academic background and interests..." className="w-full px-4 py-2 rounded-lg glass-input" />
                  </div>
                </div>
              )}

              {/* Academic Information Tab */}
              {activeTab === 'academic' && (
                <div className="space-y-6 animate-glass-fade-in">
                  <h3 className="text-lg font-bold text-gray-900">Academic Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Employee ID</label>
                      <input type="text" value={profile.employeeId} disabled className="w-full px-4 py-2 rounded-lg glass-input" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Position</label>
                      <select value={profile.position} onChange={(e) => handleInputChange('position', e.target.value)} disabled={!isEditing} className="w-full px-4 py-2 rounded-lg glass-input">
                        <option value="Professor">Professor</option>
                        <option value="Associate Professor">Associate Professor</option>
                        <option value="Assistant Professor">Assistant Professor</option>
                        <option value="Lecturer">Lecturer</option>
                        <option value="Senior Lecturer">Senior Lecturer</option>
                        <option value="Adjunct Professor">Adjunct Professor</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
                      <input type="text" value={profile.department} onChange={(e) => handleInputChange('department', e.target.value)} disabled={!isEditing} className="w-full px-4 py-2 rounded-lg glass-input" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Years of Experience</label>
                      <input type="text" value={profile.experience} onChange={(e) => handleInputChange('experience', e.target.value)} disabled={!isEditing} className="w-full px-4 py-2 rounded-lg glass-input" />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Highest Qualification</label>
                      <input type="text" value={profile.qualification} onChange={(e) => handleInputChange('qualification', e.target.value)} disabled={!isEditing} placeholder="e.g., Ph.D. in Computer Science, Stanford University" className="w-full px-4 py-2 rounded-lg glass-input" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Employment Type</label>
                      <select value={profile.employmentType} onChange={(e) => handleInputChange('employmentType', e.target.value as LecturerProfile['employmentType'])} disabled={!isEditing} className="w-full px-4 py-2 rounded-lg glass-input">
                        <option value="full-time">Full-time</option>
                        <option value="part-time">Part-time</option>
                        <option value="visiting">Visiting</option>
                        <option value="adjunct">Adjunct</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                      <select value={profile.status} onChange={(e) => handleInputChange('status', e.target.value as LecturerProfile['status'])} disabled={!isEditing} className="w-full px-4 py-2 rounded-lg glass-input">
                        <option value="active">Active</option>
                        <option value="sabbatical">On Sabbatical</option>
                        <option value="emeritus">Emeritus</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">Areas of Specialization</label>
                    <div className="space-y-2">
                      {profile.specialization.map((spec, index) => (
                        <div key={index} className="flex gap-2">
                          <input type="text" value={spec} onChange={(e) => handleSpecializationChange(index, e.target.value)} disabled={!isEditing} placeholder="Enter specialization area" className="flex-1 px-4 py-2 rounded-lg glass-input" />
                          {isEditing && <button onClick={() => removeSpecialization(index)} className="bg-red-500/80 text-white px-3 py-2 rounded-lg hover:bg-red-600 font-bold">×</button>}
                        </div>
                      ))}
                      {isEditing && <button onClick={addSpecialization} className="bg-blue-500/80 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors font-semibold">➕ Add Specialization</button>}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">Research Interests</label>
                    <div className="space-y-2">
                      {profile.research.map((research, index) => (
                        <div key={index} className="flex gap-2">
                          <input type="text" value={research} onChange={(e) => handleResearchChange(index, e.target.value)} disabled={!isEditing} placeholder="Enter research area" className="flex-1 px-4 py-2 rounded-lg glass-input" />
                          {isEditing && <button onClick={() => removeResearch(index)} className="bg-red-500/80 text-white px-3 py-2 rounded-lg hover:bg-red-600 font-bold">×</button>}
                        </div>
                      ))}
                      {isEditing && <button onClick={addResearch} className="bg-green-500/80 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors font-semibold">➕ Add Research Area</button>}
                    </div>
                  </div>
                </div>
              )}

              {/* Office & Contact Tab */}
              {activeTab === 'office' && (
                <div className="space-y-6 animate-glass-fade-in">
                  <h3 className="text-lg font-bold text-gray-900">Office & Contact Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Campus</label>
                      <input type="text" value={profile.campus} onChange={(e) => handleInputChange('campus', e.target.value)} disabled={!isEditing} className="w-full px-4 py-2 rounded-lg glass-input" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Building</label>
                      <input type="text" value={profile.building} onChange={(e) => handleInputChange('building', e.target.value)} disabled={!isEditing} className="w-full px-4 py-2 rounded-lg glass-input" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Room Number</label>
                      <input type="text" value={profile.room} onChange={(e) => handleInputChange('room', e.target.value)} disabled={!isEditing} className="w-full px-4 py-2 rounded-lg glass-input" />
                    </div>
                    <div></div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Office Address</label>
                      <input type="text" value={profile.officeAddress} onChange={(e) => handleInputChange('officeAddress', e.target.value)} disabled={!isEditing} className="w-full px-4 py-2 rounded-lg glass-input" />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Office Hours</label>
                      <textarea rows={3} value={profile.officeHours} onChange={(e) => handleInputChange('officeHours', e.target.value)} disabled={!isEditing} placeholder="e.g., Monday & Wednesday 2:00-4:00 PM" className="w-full px-4 py-2 rounded-lg glass-input" />
                    </div>
                  </div>
                </div>
              )}

              {/* Research Links Tab */}
              {activeTab === 'research' && (
                <div className="space-y-6 animate-glass-fade-in">
                  <h3 className="text-lg font-bold text-gray-900">Research & Professional Links</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">LinkedIn Profile</label>
                      <input type="url" value={profile.linkedIn} onChange={(e) => handleInputChange('linkedIn', e.target.value)} disabled={!isEditing} placeholder="https://linkedin.com/in/yourusername" className="w-full px-4 py-2 rounded-lg glass-input" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">ResearchGate Profile</label>
                      <input type="url" value={profile.researchGate} onChange={(e) => handleInputChange('researchGate', e.target.value)} disabled={!isEditing} placeholder="https://researchgate.net/profile/yourname" className="w-full px-4 py-2 rounded-lg glass-input" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Personal Website</label>
                      <input type="url" value={profile.website} onChange={(e) => handleInputChange('website', e.target.value)} disabled={!isEditing} placeholder="https://yourwebsite.edu" className="w-full px-4 py-2 rounded-lg glass-input" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">ORCID</label>
                      <input type="url" value={profile.orcid} onChange={(e) => handleInputChange('orcid', e.target.value)} disabled={!isEditing} placeholder="https://orcid.org/0000-0000-0000-0000" className="w-full px-4 py-2 rounded-lg glass-input" />
                    </div>
                  </div>
                  {(profile.linkedIn || profile.researchGate || profile.website || profile.orcid) && (
                    <div className="border-t border-white/30 pt-6">
                      <h4 className="text-md font-bold text-gray-900 mb-4">Quick Links</h4>
                      <div className="flex flex-wrap gap-3">
                        {profile.linkedIn && <a href={profile.linkedIn} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors font-semibold shadow-md">💼 LinkedIn</a>}
                        {profile.researchGate && <a href={profile.researchGate} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors font-semibold shadow-md">🔬 ResearchGate</a>}
                        {profile.website && <a href={profile.website} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 transition-colors font-semibold shadow-md">🌐 Website</a>}
                        {profile.orcid && <a href={profile.orcid} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors font-semibold shadow-md">🆔 ORCID</a>}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Teaching & Publications Tab */}
              {activeTab === 'teaching' && (
                <div className="space-y-8 animate-glass-fade-in">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Current Courses</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                      <div className="glass-activity-card p-4 rounded-lg text-center"><div className="text-3xl font-bold text-blue-600">{courses.length}</div><div className="text-sm text-blue-800 font-semibold">Active Courses</div></div>
                      <div className="glass-activity-card p-4 rounded-lg text-center"><div className="text-3xl font-bold text-green-600">{courses.reduce((sum, course) => sum + course.students, 0)}</div><div className="text-sm text-green-800 font-semibold">Total Students</div></div>
                      <div className="glass-activity-card p-4 rounded-lg text-center"><div className="text-3xl font-bold text-purple-600">{Math.round(courses.reduce((sum, course) => sum + course.students, 0) / courses.length)}</div><div className="text-sm text-purple-800 font-semibold">Avg. Class Size</div></div>
                    </div>
                    <div className="space-y-3">
                      {courses.map((course, index) => (
                        <div key={index} className="glass-activity-card p-4 rounded-lg">
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="font-bold text-gray-900">{course.code}: {course.name}</h4>
                              <p className="text-sm text-gray-600">{course.semester} • {course.type}</p>
                            </div>
                            <div className="text-right">
                              <div className="text-lg font-bold text-blue-600">{course.students}</div>
                              <div className="text-sm text-gray-500">students</div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Recent Publications</h3>
                    <div className="space-y-4">
                      {publications.map((pub, index) => (
                        <div key={index} className="glass-activity-card p-4 rounded-lg">
                          <h4 className="font-bold text-gray-900 mb-2">{pub.title}</h4>
                          <div className="text-sm text-gray-600 mb-2">
                            {pub.journal && <span>{pub.journal}</span>}
                            {pub.conference && <span>{pub.conference}</span>}
                            <span> • {pub.year}</span>
                          </div>
                          <div className="flex gap-4 text-sm">
                            <span className={`px-2 py-1 rounded-full text-xs font-semibold border ${pub.type === 'Journal Article' ? 'bg-blue-100 text-blue-800 border-blue-200' : pub.type === 'Conference Paper' ? 'bg-green-100 text-green-800 border-green-200' : 'bg-purple-100 text-purple-800 border-purple-200'}`}>{pub.type}</span>
                            <span className="text-gray-500 font-medium">{pub.citations} citations</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 animate-slide-up-delayed-4">
            <Link href="/lecturer/settings" className="group glass-card p-4 rounded-2xl hover:shadow-2xl transition-all duration-300 text-center">
              <div className="text-4xl mb-2 group-hover:scale-110 transition-transform">⚙️</div>
              <div className="font-bold text-gray-900">Account Settings</div>
              <div className="text-sm text-gray-600">Privacy, notifications, and preferences</div>
            </Link>
            <Link href="/lecturer/queries" className="group glass-card p-4 rounded-2xl hover:shadow-2xl transition-all duration-300 text-center">
              <div className="text-4xl mb-2 group-hover:scale-110 transition-transform">❓</div>
              <div className="font-bold text-gray-900">Student Queries</div>
              <div className="text-sm text-gray-600">Manage student questions</div>
            </Link>
            <Link href="/lecturer/appointments" className="group glass-card p-4 rounded-2xl hover:shadow-2xl transition-all duration-300 text-center">
              <div className="text-4xl mb-2 group-hover:scale-110 transition-transform">📅</div>
              <div className="font-bold text-gray-900">Appointments</div>
              <div className="text-sm text-gray-600">Manage office hours and meetings</div>
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}