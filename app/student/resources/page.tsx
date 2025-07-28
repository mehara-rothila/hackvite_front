// app/student/resources/page.tsx - ENHANCED WITH DASHBOARD STYLES
'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

// --- Interfaces (Unchanged) ---
interface Resource {
  id: string
  title: string
  description: string
  filename: string
  fileSize: string
  fileType: string
  course: string
  lecturer: string
  category: 'lecture-notes' | 'assignments' | 'readings' | 'labs' | 'exams' | 'supplementary'
  uploadedAt: string
  lastModified: string
  downloadCount: number
  version: number
  tags: string[]
  url: string
  isNew?: boolean
}

// --- Mock Data (Unchanged) ---
const mockResources: Resource[] = [
  { id: '1', title: 'Introduction to Programming - Week 1', description: 'Basic concepts of programming, variables, and data types', filename: 'CS101_Week1_Notes.pdf', fileSize: '2.4 MB', fileType: 'pdf', course: 'CS101', lecturer: 'Dr. Sarah Johnson', category: 'lecture-notes', uploadedAt: '2025-07-20', lastModified: '2025-07-22', downloadCount: 45, version: 2, tags: ['variables', 'data-types', 'basics'], url: '#', isNew: true },
  { id: '2', title: 'Assignment 1: Hello World Program', description: 'First programming assignment covering basic syntax and output', filename: 'CS101_Assignment1.pdf', fileSize: '1.2 MB', fileType: 'pdf', course: 'CS101', lecturer: 'Dr. Sarah Johnson', category: 'assignments', uploadedAt: '2025-07-18', lastModified: '2025-07-18', downloadCount: 67, version: 1, tags: ['assignment', 'hello-world', 'syntax'], url: '#' },
  { id: '3', title: 'Lab 2: Control Structures', description: 'Hands-on practice with if statements, loops, and conditionals', filename: 'CS101_Lab2_Instructions.docx', fileSize: '856 KB', fileType: 'docx', course: 'CS101', lecturer: 'Dr. Sarah Johnson', category: 'labs', uploadedAt: '2025-07-25', lastModified: '2025-07-25', downloadCount: 23, version: 1, tags: ['loops', 'if-statements', 'control'], url: '#', isNew: true },
  { id: '4', title: 'Calculus II - Derivatives Review', description: 'Comprehensive review of derivative rules and applications', filename: 'MATH202_Derivatives_Review.pdf', fileSize: '4.2 MB', fileType: 'pdf', course: 'MATH202', lecturer: 'Prof. Michael Chen', category: 'lecture-notes', uploadedAt: '2025-07-23', lastModified: '2025-07-23', downloadCount: 34, version: 1, tags: ['derivatives', 'calculus', 'review'], url: '#' },
  { id: '5', title: 'Problem Set 3: Integration Techniques', description: 'Practice problems for integration by parts and substitution', filename: 'MATH202_ProblemSet3.pdf', fileSize: '1.8 MB', fileType: 'pdf', course: 'MATH202', lecturer: 'Prof. Michael Chen', category: 'assignments', uploadedAt: '2025-07-21', lastModified: '2025-07-21', downloadCount: 28, version: 1, tags: ['integration', 'problem-set', 'techniques'], url: '#' },
  { id: '6', title: 'Academic Writing Guidelines', description: 'Style guide for academic essays and research papers', filename: 'ENG110_Writing_Guidelines.pdf', fileSize: '2.1 MB', fileType: 'pdf', course: 'ENG110', lecturer: 'Dr. Emily Roberts', category: 'readings', uploadedAt: '2025-07-19', lastModified: '2025-07-19', downloadCount: 52, version: 1, tags: ['writing', 'guidelines', 'academic'], url: '#' }
]

const categories = ['lecture-notes', 'assignments', 'readings', 'labs', 'exams', 'supplementary']
const courses = ['CS101', 'MATH202', 'ENG110']

export default function StudentResourcesPage() {
  // --- State and Handlers (Unchanged) ---
  const searchParams = useSearchParams()
  const [resources, setResources] = useState<Resource[]>(mockResources)
  const [searchTerm, setSearchTerm] = useState('')
  const [courseFilter, setCourseFilter] = useState(searchParams?.get('course') || 'all')
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [showOnlyNew, setShowOnlyNew] = useState(false)
  const [selectedResource, setSelectedResource] = useState<Resource | null>(null)
  const [downloadedFiles, setDownloadedFiles] = useState<Set<string>>(new Set())

  useEffect(() => {
    if (searchParams?.get('course')) {
      setCourseFilter(searchParams.get('course') || 'all')
    }
  }, [searchParams])

  const handleDownload = (resource: Resource) => {
    setDownloadedFiles(prev => new Set([...prev, resource.id]))
    setResources(resources.map(r => r.id === resource.id ? { ...r, downloadCount: r.downloadCount + 1 } : r))
    window.open(resource.url, '_blank')
  }

  const handleViewDetails = (resource: Resource) => {
    setSelectedResource(resource)
  }

  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) || resource.description.toLowerCase().includes(searchTerm.toLowerCase()) || resource.lecturer.toLowerCase().includes(searchTerm.toLowerCase()) || resource.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesCourse = courseFilter === 'all' || resource.course === courseFilter
    const matchesCategory = categoryFilter === 'all' || resource.category === categoryFilter
    const matchesNew = !showOnlyNew || resource.isNew
    return matchesSearch && matchesCourse && matchesCategory && matchesNew
  })

  const resourcesByCourse = filteredResources.reduce((acc, resource) => {
    if (!acc[resource.course]) { acc[resource.course] = [] }
    acc[resource.course].push(resource)
    return acc
  }, {} as Record<string, Resource[]>)

  // --- Styling Helpers ---
  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'lecture-notes': return 'bg-blue-100 text-blue-800'
      case 'assignments': return 'bg-red-100 text-red-800'
      case 'readings': return 'bg-green-100 text-green-800'
      case 'labs': return 'bg-purple-100 text-purple-800'
      case 'exams': return 'bg-yellow-100 text-yellow-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }
  const getFileTypeIcon = (fileType: string) => {
    switch (fileType.toLowerCase()) {
      case 'pdf': return '📄'
      case 'docx': case 'doc': return '📝'
      case 'pptx': case 'ppt': return '📊'
      case 'xlsx': case 'xls': return '📈'
      case 'zip': case 'rar': return '📦'
      default: return '📎'
    }
  }
  const getCourseColor = (course: string) => {
    switch (course) {
      case 'CS101': return 'border-l-blue-500'
      case 'MATH202': return 'border-l-green-500'
      case 'ENG110': return 'border-l-purple-500'
      default: return 'border-l-gray-500'
    }
  }
  const newResourcesCount = resources.filter(r => r.isNew).length
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
                  <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent text-clean-shadow mb-1">Course Resources</h1>
                  <p className="text-gray-600">Access learning materials for your enrolled courses</p>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <div className="glass-stat-card p-4 rounded-xl animate-slide-up-delayed">
                <div className="text-3xl font-bold text-blue-600">{resources.length}</div>
                <div className="text-sm text-blue-800 font-semibold">Total Resources</div>
              </div>
              <div className="glass-stat-card p-4 rounded-xl animate-slide-up-delayed-2">
                <div className="text-3xl font-bold text-green-600">{newResourcesCount}</div>
                <div className="text-sm text-green-800 font-semibold">New This Week</div>
              </div>
              <div className="glass-stat-card p-4 rounded-xl animate-slide-up-delayed-3">
                <div className="text-3xl font-bold text-purple-600">{downloadedFiles.size}</div>
                <div className="text-sm text-purple-800 font-semibold">Downloaded</div>
              </div>
              <div className="glass-stat-card p-4 rounded-xl animate-slide-up-delayed-4">
                <div className="text-3xl font-bold text-orange-600">{courses.length}</div>
                <div className="text-sm text-orange-800 font-semibold">Enrolled Courses</div>
              </div>
            </div>

            {/* Filters */}
            <div className="glass-card rounded-2xl p-6 mb-6 animate-slide-up-delayed-2">
              <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                <div className="flex flex-col sm:flex-row gap-4 flex-1">
                  <input type="text" placeholder="Search resources..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className={glassInputStyles} />
                  <select value={courseFilter} onChange={(e) => setCourseFilter(e.target.value)} className={glassInputStyles}>
                    <option value="all">All Courses</option>
                    {courses.map(course => (<option key={course} value={course}>{course}</option>))}
                  </select>
                  <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)} className={glassInputStyles}>
                    <option value="all">All Categories</option>
                    {categories.map(category => (<option key={category} value={category}>{category.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}</option>))}
                  </select>
                  <label className="flex items-center gap-2 px-4 py-2 glass-activity-card rounded-lg cursor-pointer">
                    <input type="checkbox" checked={showOnlyNew} onChange={(e) => setShowOnlyNew(e.target.checked)} className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
                    <span className="text-sm text-gray-700 font-medium">New only</span>
                  </label>
                </div>
                <div className="flex gap-2">
                  {courses.map(course => (
                    <button key={course} onClick={() => setCourseFilter(course)} className={`px-3 py-2 rounded-lg text-sm font-semibold transition-all duration-300 transform hover:scale-105 ${courseFilter === course ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg' : 'glass-activity-card text-gray-700 hover:shadow-md'}`}>
                      {course}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Resources by Course */}
            {courseFilter === 'all' ? (
              <div className="space-y-8">
                {Object.entries(resourcesByCourse).map(([course, courseResources]) => (
                  <div key={course} className={`glass-card rounded-2xl border-l-4 ${getCourseColor(course)}`}>
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h2 className="text-xl font-semibold text-gray-900">{course}</h2>
                          <p className="text-sm text-gray-600">{courseResources.length} resources available</p>
                        </div>
                        <button onClick={() => setCourseFilter(course)} className="text-sm text-blue-600 hover:text-blue-800 font-semibold">View All →</button>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {courseResources.slice(0, 6).map((resource) => (
                          <div key={resource.id} className="glass-activity-card p-4 rounded-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300">
                            <div className="flex items-start gap-3 mb-3">
                              <span className="text-3xl">{getFileTypeIcon(resource.fileType)}</span>
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                  <h3 className="font-medium text-gray-900 text-sm line-clamp-1">{resource.title}</h3>
                                  {resource.isNew && <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>}
                                  {downloadedFiles.has(resource.id) && <span className="text-green-600 text-xs font-bold">✓</span>}
                                </div>
                                <span className={`px-2 py-1 rounded text-xs font-medium ${getCategoryColor(resource.category)}`}>{resource.category.replace('-', ' ')}</span>
                              </div>
                            </div>
                            <p className="text-xs text-gray-600 mb-3 line-clamp-2 h-8">{resource.description}</p>
                            <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                              <span>{resource.fileSize}</span>
                              <span>{resource.downloadCount} downloads</span>
                            </div>
                            <div className="flex gap-2">
                              <button onClick={() => handleDownload(resource)} className="flex-1 bg-blue-500 text-white px-3 py-2 rounded-md text-xs hover:bg-blue-600 shadow-sm transition-all transform hover:scale-105">📥 Download</button>
                              <button onClick={() => handleViewDetails(resource)} className="px-3 py-2 bg-white/80 text-gray-700 rounded-md text-xs hover:bg-white shadow-sm border border-gray-200 transition-all transform hover:scale-105">👁️ View</button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {filteredResources.length === 0 ? (
                  <div className="glass-card rounded-2xl p-12 text-center">
                    <div className="text-6xl mb-4">🔍</div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">No Resources Found</h3>
                    <p className="text-gray-600 mb-6">Try adjusting your search or filter criteria.</p>
                    <button onClick={() => { setSearchTerm(''); setCourseFilter('all'); setCategoryFilter('all'); setShowOnlyNew(false); }} className="bg-blue-500 text-white px-5 py-2.5 rounded-lg font-semibold hover:bg-blue-600 transition-colors shadow-md">Clear All Filters</button>
                  </div>
                ) : (
                  filteredResources.map((resource) => (
                    <div key={resource.id} className="glass-card rounded-2xl p-6 hover:shadow-xl transition-shadow">
                      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <span className="text-3xl">{getFileTypeIcon(resource.fileType)}</span>
                            <h3 className="text-lg font-semibold text-gray-900">{resource.title}</h3>
                            {resource.isNew && <span className="px-2 py-1 text-xs bg-red-100 text-red-700 rounded-full font-medium">New</span>}
                            {downloadedFiles.has(resource.id) && <span className="px-2 py-1 text-xs bg-green-100 text-green-700 rounded-full font-medium">Downloaded</span>}
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(resource.category)}`}>{resource.category.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}</span>
                          </div>
                          <p className="text-gray-600 mb-3">{resource.description}</p>
                          <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-500 mb-3">
                            <span><strong>Course:</strong> {resource.course}</span>
                            <span><strong>Lecturer:</strong> {resource.lecturer}</span>
                            <span><strong>File:</strong> {resource.filename}</span>
                            <span><strong>Size:</strong> {resource.fileSize}</span>
                            <span><strong>Downloads:</strong> {resource.downloadCount}</span>
                            <span><strong>Uploaded:</strong> {resource.uploadedAt}</span>
                          </div>
                          {resource.tags.length > 0 && (
                            <div className="flex gap-2 flex-wrap">
                              {resource.tags.map((tag, idx) => (<span key={idx} className="px-2 py-1 text-xs bg-gray-200/70 text-gray-700 rounded">#{tag}</span>))}
                            </div>
                          )}
                        </div>
                        <div className="flex flex-col gap-2 w-full lg:w-auto">
                          <button onClick={() => handleDownload(resource)} className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-2 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105 text-sm">📥 Download</button>
                          <button onClick={() => handleViewDetails(resource)} className="bg-white/80 text-gray-700 px-6 py-2 rounded-lg hover:bg-white shadow-sm border border-gray-200 transition-all transform hover:scale-105 text-sm">👁️ View Details</button>
                          <Link href={`/student/queries?subject=${encodeURIComponent(resource.title)}&lecturer=${encodeURIComponent(resource.lecturer)}`} className="bg-green-100/80 text-green-700 px-6 py-2 rounded-lg hover:bg-green-100 transition-colors text-sm text-center font-medium">❓ Ask Question</Link>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

            {/* Resource Detail Modal */}
            {selectedResource && (
              <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-glass-fade-in">
                <div className="glass-card rounded-2xl p-6 w-full max-w-3xl max-h-[90vh] overflow-y-auto">
                  <div className="flex justify-between items-start mb-6">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-4xl">{getFileTypeIcon(selectedResource.fileType)}</span>
                        <h2 className="text-2xl font-bold text-gray-900">{selectedResource.title}</h2>
                      </div>
                      <div className="flex flex-wrap gap-2 mb-4">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(selectedResource.category)}`}>{selectedResource.category.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}</span>
                        <span className="px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">{selectedResource.course}</span>
                        {selectedResource.isNew && <span className="px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800">New</span>}
                      </div>
                    </div>
                    <button onClick={() => setSelectedResource(null)} className="text-gray-400 hover:text-gray-600 text-3xl">×</button>
                  </div>
                  <div className="mb-6 p-4 glass-activity-card rounded-lg">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div><div className="font-medium text-gray-900">Lecturer</div><div className="text-gray-600">{selectedResource.lecturer}</div></div>
                      <div><div className="font-medium text-gray-900">File Size</div><div className="text-gray-600">{selectedResource.fileSize}</div></div>
                      <div><div className="font-medium text-gray-900">Downloads</div><div className="text-gray-600">{selectedResource.downloadCount}</div></div>
                      <div><div className="font-medium text-gray-900">Uploaded</div><div className="text-gray-600">{selectedResource.uploadedAt}</div></div>
                    </div>
                  </div>
                  <div className="mb-6"><h4 className="font-semibold text-gray-900 mb-2">Description</h4><p className="text-gray-700">{selectedResource.description}</p></div>
                  {selectedResource.tags.length > 0 && (
                    <div className="mb-6"><h4 className="font-semibold text-gray-900 mb-2">Tags</h4><div className="flex gap-2 flex-wrap">{selectedResource.tags.map((tag, idx) => (<span key={idx} className="px-3 py-1 text-sm bg-gray-200/70 text-gray-700 rounded-full">#{tag}</span>))}</div></div>
                  )}
                  <div className="flex gap-3 pt-4 border-t border-white/30">
                    <button onClick={() => handleDownload(selectedResource)} className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-2 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105">📥 Download</button>
                    <Link href={`/student/queries?subject=${encodeURIComponent(selectedResource.title)}&lecturer=${encodeURIComponent(selectedResource.lecturer)}`} className="bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-2 rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105">❓ Ask Question</Link>
                    <button onClick={() => setSelectedResource(null)} className="bg-white/70 text-gray-700 px-6 py-2 rounded-lg hover:bg-white/90 transition-colors shadow-sm border border-gray-300/50">Close</button>
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