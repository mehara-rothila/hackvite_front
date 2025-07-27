// app/login/page.tsx
'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    remember: false
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    // Mock authentication from your original logic
    setTimeout(() => {
      if (formData.email && formData.password) {
        const isStudent = formData.email.includes('student') || formData.email.includes('s.')
        const role = isStudent ? 'student' : 'lecturer'

        // Store mock user data
        localStorage.setItem('edulink_user', JSON.stringify({
          id: Math.random().toString(36).substr(2, 9),
          email: formData.email,
          role: role,
          name: formData.email.split('@')[0],
          isAuthenticated: true
        }))

        // Redirect based on role
        if (role === 'student') {
          router.push('/student/dashboard')
        } else {
          router.push('/lecturer/dashboard')
        }
      } else {
        setError('Please fill in all fields')
      }
      setLoading(false)
    }, 1000)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  return (
    <>
      <style jsx>{`
        /* All the animations from the original file */
        @keyframes mesh-drift-1 {
          0%, 100% { transform: rotate(0deg) scale(1) translate(0, 0); }
          33% { transform: rotate(120deg) scale(1.1) translate(20px, -20px); }
          66% { transform: rotate(240deg) scale(0.9) translate(-20px, 20px); }
        }
        .animate-mesh-drift-1 {
          animation: mesh-drift-1 40s ease-in-out infinite;
        }

        @keyframes mesh-drift-2 {
          0%, 100% { transform: rotate(0deg) scale(1) translate(0, 0); }
          25% { transform: rotate(90deg) scale(1.2) translate(-30px, 10px); }
          50% { transform: rotate(180deg) scale(0.8) translate(10px, -30px); }
          75% { transform: rotate(270deg) scale(1.1) translate(20px, 20px); }
        }
        .animate-mesh-drift-2 {
          animation: mesh-drift-2 50s ease-in-out infinite;
        }

        @keyframes mesh-drift-3 {
          0%, 100% { transform: rotate(0deg) scale(1) translate(0, 0); }
          50% { transform: rotate(180deg) scale(1.3) translate(-10px, 10px); }
        }
        .animate-mesh-drift-3 {
          animation: mesh-drift-3 35s ease-in-out infinite;
        }

        @keyframes mesh-drift-4 {
          0%, 100% { transform: rotate(0deg) scale(1) translate(0, 0); }
          25% { transform: rotate(90deg) scale(1.1) translate(15px, -15px); }
          50% { transform: rotate(180deg) scale(0.9) translate(-15px, -15px); }
          75% { transform: rotate(270deg) scale(1.05) translate(-15px, 15px); }
        }
        .animate-mesh-drift-4 {
          animation: mesh-drift-4 45s ease-in-out infinite;
        }

        @keyframes equation-float-1 {
          0%, 100% { transform: translateY(0px) translateX(0px) rotate(0deg); opacity: 0.8; }
          25% { transform: translateY(-30px) translateX(20px) rotate(5deg); opacity: 1; }
          50% { transform: translateY(-15px) translateX(40px) rotate(-3deg); opacity: 0.7; }
          75% { transform: translateY(-25px) translateX(10px) rotate(7deg); opacity: 0.9; }
        }
        .animate-equation-float-1 {
          animation: equation-float-1 12s ease-in-out infinite;
        }

        @keyframes equation-float-2 {
          0%, 100% { transform: translateY(0px) translateX(0px) rotate(0deg); opacity: 0.8; }
          33% { transform: translateY(-40px) translateX(-30px) rotate(-8deg); opacity: 1; }
          66% { transform: translateY(-20px) translateX(-15px) rotate(5deg); opacity: 0.7; }
        }
        .animate-equation-float-2 {
          animation: equation-float-2 15s ease-in-out infinite;
        }

        @keyframes equation-float-3 {
          0%, 100% { transform: translateY(0px) translateX(0px) rotate(0deg); opacity: 0.8; }
          50% { transform: translateY(-35px) translateX(25px) rotate(-10deg); opacity: 1; }
        }
        .animate-equation-float-3 {
          animation: equation-float-3 10s ease-in-out infinite;
        }

        @keyframes equation-float-4 {
          0%, 100% { transform: translateY(0px) translateX(0px) rotate(0deg); opacity: 0.8; }
          20% { transform: translateY(-25px) translateX(15px) rotate(4deg); opacity: 1; }
          40% { transform: translateY(-45px) translateX(-10px) rotate(-6deg); opacity: 0.7; }
          60% { transform: translateY(-30px) translateX(30px) rotate(8deg); opacity: 0.9; }
          80% { transform: translateY(-15px) translateX(-20px) rotate(-3deg); opacity: 0.8; }
        }
        .animate-equation-float-4 {
          animation: equation-float-4 18s ease-in-out infinite;
        }

        @keyframes particle-drift-1 {
          0%, 100% { transform: translateY(0px) translateX(0px) rotate(0deg); opacity: 0.6; }
          25% { transform: translateY(-120px) translateX(80px) rotate(90deg); opacity: 0.9; }
          50% { transform: translateY(-80px) translateX(160px) rotate(180deg); opacity: 0.7; }
          75% { transform: translateY(-200px) translateX(40px) rotate(270deg); opacity: 1; }
        }
        .animate-particle-drift-1 {
          animation: particle-drift-1 15s ease-in-out infinite;
        }

        @keyframes particle-drift-2 {
          0%, 100% { transform: translateY(0px) translateX(0px) rotate(0deg); opacity: 0.5; }
          33% { transform: translateY(-100px) translateX(-60px) rotate(120deg); opacity: 0.8; }
          66% { transform: translateY(-160px) translateX(120px) rotate(240deg); opacity: 0.6; }
        }
        .animate-particle-drift-2 {
          animation: particle-drift-2 18s ease-in-out infinite;
        }

        @keyframes particle-drift-3 {
          0%, 100% { transform: translateY(0px) translateX(0px) rotate(0deg); opacity: 0.7; }
          50% { transform: translateY(-250px) translateX(-40px) rotate(180deg); opacity: 0.3; }
        }
        .animate-particle-drift-3 {
          animation: particle-drift-3 22s ease-in-out infinite;
        }

        @keyframes particle-drift-4 {
          0%, 100% { transform: translateY(0px) translateX(0px) rotate(0deg); opacity: 0.8; }
          25% { transform: translateY(-80px) translateX(100px) rotate(90deg); opacity: 0.4; }
          75% { transform: translateY(-180px) translateX(-80px) rotate(270deg); opacity: 0.9; }
        }
        .animate-particle-drift-4 {
          animation: particle-drift-4 20s ease-in-out infinite;
        }

        @keyframes glass-float-1 {
          0%, 100% { transform: translate(0, 0) rotate(0deg) scale(1); }
          25% { transform: translate(30px, -50px) rotate(90deg) scale(1.1); }
          50% { transform: translate(-20px, -30px) rotate(180deg) scale(0.9); }
          75% { transform: translate(-40px, 40px) rotate(270deg) scale(1.05); }
        }
        .animate-glass-float-1 {
          animation: glass-float-1 45s ease-in-out infinite;
        }

        @keyframes glass-float-2 {
          0%, 100% { transform: translate(0, 0) rotate(0deg) scale(1); }
          33% { transform: translate(-60px, 40px) rotate(120deg) scale(1.2); }
          66% { transform: translate(40px, -60px) rotate(240deg) scale(0.8); }
        }
        .animate-glass-float-2 {
          animation: glass-float-2 55s ease-in-out infinite;
        }

        @keyframes glass-float-3 {
          0%, 100% { transform: translate(0, 0) rotate(0deg) scale(1); }
          20% { transform: translate(40px, -20px) rotate(72deg) scale(1.1); }
          40% { transform: translate(-30px, -40px) rotate(144deg) scale(0.9); }
          60% { transform: translate(-50px, 30px) rotate(216deg) scale(1.15); }
          80% { transform: translate(20px, 50px) rotate(288deg) scale(0.95); }
        }
        .animate-glass-float-3 {
          animation: glass-float-3 60s ease-in-out infinite;
        }

        @keyframes glass-float-4 {
          0%, 100% { transform: translate(0, 0) rotate(0deg) scale(1); }
          50% { transform: translate(-30px, -30px) rotate(180deg) scale(1.3); }
        }
        .animate-glass-float-4 {
          animation: glass-float-4 42s ease-in-out infinite;
        }

        @keyframes bubble-drift-1 {
          0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.7; }
          25% { transform: translate(60px, -80px) scale(1.2); opacity: 0.9; }
          50% { transform: translate(-40px, -60px) scale(0.8); opacity: 0.5; }
          75% { transform: translate(-80px, 40px) scale(1.1); opacity: 0.8; }
        }
        .animate-bubble-drift-1 {
          animation: bubble-drift-1 30s ease-in-out infinite;
        }

        @keyframes bubble-drift-2 {
          0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.6; }
          33% { transform: translate(-70px, 60px) scale(1.3); opacity: 1; }
          66% { transform: translate(50px, -50px) scale(0.7); opacity: 0.4; }
        }
        .animate-bubble-drift-2 {
          animation: bubble-drift-2 38s ease-in-out infinite;
        }

        @keyframes bubble-drift-3 {
          0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.8; }
          50% { transform: translate(30px, 70px) scale(1.4); opacity: 0.3; }
        }
        .animate-bubble-drift-3 {
          animation: bubble-drift-3 25s ease-in-out infinite;
        }

        @keyframes aurora-glow {
          0%, 100% { opacity: 0.6; transform: scale(1) rotate(0deg); }
          25% { opacity: 0.8; transform: scale(1.05) rotate(90deg); }
          50% { opacity: 0.4; transform: scale(0.95) rotate(180deg); }
          75% { opacity: 0.9; transform: scale(1.1) rotate(270deg); }
        }
        .animate-aurora-glow {
          animation: aurora-glow 8s ease-in-out infinite;
        }

        @keyframes glass-fade-in {
          0% { opacity: 0; transform: translateY(30px) scale(0.95); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
        .animate-glass-fade-in {
          animation: glass-fade-in 1.2s ease-out forwards;
        }

        .text-clean-shadow {
          filter: drop-shadow(0 2px 4px rgba(59, 130, 246, 0.2));
        }

        .line-static-glow {
          box-shadow: 0 0 15px rgba(168, 85, 247, 0.7); 
          width: 10rem; 
          opacity: 0.8;
        }

        @keyframes slide-up-delayed {
          0% { opacity: 0; transform: translateY(40px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-slide-up-delayed {
          animation: slide-up-delayed 0.8s ease-out 0.2s forwards;
          opacity: 0;
        }
        .animate-slide-up-delayed-2 {
          animation: slide-up-delayed 0.8s ease-out 0.4s forwards;
          opacity: 0;
        }
        .animate-slide-up-delayed-3 {
          animation: slide-up-delayed 0.8s ease-out 0.6s forwards;
          opacity: 0;
        }
        .animate-slide-up-delayed-4 {
          animation: slide-up-delayed 0.8s ease-out 0.8s forwards;
          opacity: 0;
        }
        .animate-slide-up-delayed-5 {
          animation: slide-up-delayed 0.8s ease-out 1.0s forwards;
          opacity: 0;
        }
        .animate-slide-up-delayed-6 {
          animation: slide-up-delayed 0.8s ease-out 1.2s forwards;
          opacity: 0;
        }
        .animate-slide-up-delayed-7 {
          animation: slide-up-delayed 0.8s ease-out 1.4s forwards;
          opacity: 0;
        }
        .animate-slide-up-delayed-8 {
          animation: slide-up-delayed 0.8s ease-out 1.6s forwards;
          opacity: 0;
        }
        .animate-slide-up-delayed-9 {
          animation: slide-up-delayed 0.8s ease-out 1.8s forwards;
          opacity: 0;
        }

        /* Static Enhanced Effects */
        .input-focus-effect {
          box-shadow: 0 0 20px rgba(59, 130, 246, 0.15), inset 0 0 20px rgba(255, 255, 255, 0.1);
        }

        .button-static-shadow {
          box-shadow: 0 20px 40px rgba(59, 130, 246, 0.3);
        }

        /* Enhanced Glassmorphism */
        .backdrop-blur-xl {
          backdrop-filter: blur(24px);
        }

        .backdrop-blur-lg {
          backdrop-filter: blur(16px);
        }

        .backdrop-blur-sm {
          backdrop-filter: blur(8px);
        }

        /* Custom Glass Effects */
        .glass-card {
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.4));
          backdrop-filter: blur(32px);
          border: 1px solid rgba(255, 255, 255, 0.9);
          box-shadow: 
            0 8px 32px rgba(31, 38, 135, 0.15),
            0 0 0 1px rgba(255, 255, 255, 0.5) inset,
            0 2px 8px rgba(255, 255, 255, 0.7) inset;
        }

        .glass-input {
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.6), rgba(255, 255, 255, 0.3));
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.7);
          box-shadow: 
            0 4px 16px rgba(31, 38, 135, 0.1),
            0 0 0 1px rgba(255, 255, 255, 0.3) inset;
        }

        .glass-button {
          background: linear-gradient(135deg, 
            rgba(59, 130, 246, 0.9), 
            rgba(168, 85, 247, 0.9), 
            rgba(236, 72, 153, 0.9)
          );
          backdrop-filter: blur(16px);
          box-shadow: 
            0 20px 40px rgba(59, 130, 246, 0.3),
            0 0 0 1px rgba(255, 255, 255, 0.2) inset,
            0 2px 4px rgba(255, 255, 255, 0.4) inset;
        }

        .demo-card {
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 0.5));
          backdrop-filter: blur(24px);
          border: 1px solid rgba(255, 255, 255, 0.8);
          box-shadow: 
            0 6px 24px rgba(31, 38, 135, 0.1),
            0 0 0 1px rgba(255, 255, 255, 0.4) inset;
        }
      `}</style>

      <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
        {/* Light Colorful Educational Background */}
        <div className="absolute inset-0">
          {/* Static gradient background - no mouse interaction */}
          <div className="absolute inset-0 opacity-30 bg-gradient-to-br from-blue-200/20 via-purple-200/15 to-pink-200/20" />

          {/* Light colorful gradient meshes */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-100/40 via-purple-100/35 to-pink-100/40 animate-mesh-drift-1" />
          <div className="absolute inset-0 bg-gradient-to-tr from-emerald-100/35 via-violet-100/30 to-orange-100/35 animate-mesh-drift-2" />
          <div className="absolute inset-0 bg-gradient-to-bl from-cyan-100/40 via-purple-100/25 to-rose-100/40 animate-mesh-drift-3" />
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-100/30 via-transparent to-green-100/30 animate-mesh-drift-4" />
        </div>

        {/* Clean Educational Background - 6 Large Mathematical Equations */}
        <div className="absolute inset-0">
          {/* 6 Large Mathematical Equations Only */}
          <div className="absolute top-1/4 left-1/6 text-4xl font-bold text-blue-600/80 animate-equation-float-1">
            ∫₀^∞ e^(-x²) dx = √π/2
          </div>
          <div className="absolute top-1/3 right-1/5 text-3xl font-bold text-emerald-600/80 animate-equation-float-2">
            ∑ᵢ₌₁^∞ 1/n² = π²/6
          </div>
          <div className="absolute bottom-1/4 left-1/5 text-3xl font-bold text-pink-600/80 animate-equation-float-3">
            E = mc² = ħω
          </div>
          <div className="absolute top-1/2 right-1/6 text-3xl font-bold text-purple-600/80 animate-equation-float-4">
            π = 4∑(-1)ⁿ/(2n+1)
          </div>
          <div className="absolute bottom-1/3 right-1/4 text-3xl font-bold text-orange-600/80 animate-equation-float-1">
            lim(x→0) sin(x)/x = 1
          </div>
          <div className="absolute top-2/3 left-1/4 text-3xl font-bold text-cyan-600/80 animate-equation-float-2">
            a² + b² = c²
          </div>

          {/* Floating Knowledge Particles - Bright colors */}
          {[...Array(80)].map((_, i) => (
            <div
              key={i}
              className={`absolute w-3 h-3 rounded-full animate-particle-drift-${(i % 4) + 1} shadow-md`}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 12}s`,
                animationDuration: `${4 + Math.random() * 8}s`,
                background: `radial-gradient(circle, ${['rgba(59, 130, 246, 0.8)', 'rgba(16, 185, 129, 0.8)', 'rgba(239, 68, 68, 0.8)', 'rgba(168, 85, 247, 0.8)', 'rgba(245, 158, 11, 0.8)', 'rgba(236, 72, 153, 0.8)', 'rgba(34, 197, 94, 0.8)', 'rgba(249, 115, 22, 0.8)', 'rgba(217, 70, 239, 0.8)', 'rgba(6, 182, 212, 0.8)'][i % 10]}, rgba(255,255,255,0.3))`
              }}
            />
          ))}
        </div>

        {/* Light Floating Glass Orbs */}
        <div className="absolute inset-0">
          {/* Large colorful glass orbs - adapted for light background */}
          <div className="absolute top-16 left-16 w-80 h-80 bg-gradient-to-br from-blue-200/30 to-cyan-200/20 rounded-full backdrop-blur-sm border border-blue-300/40 animate-glass-float-1 shadow-lg" />
          <div className="absolute top-32 right-24 w-96 h-96 bg-gradient-to-br from-purple-200/25 to-pink-200/15 rounded-full backdrop-blur-sm border border-purple-300/30 animate-glass-float-2 shadow-lg" />
          <div className="absolute bottom-24 left-32 w-88 h-88 bg-gradient-to-br from-emerald-200/25 to-teal-200/15 rounded-full backdrop-blur-sm border border-emerald-300/25 animate-glass-float-3 shadow-lg" />
          <div className="absolute bottom-16 right-16 w-72 h-72 bg-gradient-to-br from-orange-200/25 to-yellow-200/15 rounded-full backdrop-blur-sm border border-orange-300/30 animate-glass-float-4 shadow-lg" />

          {/* Medium colorful bubbles */}
          <div className="absolute top-1/4 left-1/5 w-56 h-56 bg-gradient-to-br from-rose-200/20 to-pink-200/10 rounded-full backdrop-blur-sm border border-rose-300/25 animate-bubble-drift-1 shadow-md" />
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-gradient-to-br from-indigo-200/22 to-blue-200/12 rounded-full backdrop-blur-sm border border-indigo-300/30 animate-bubble-drift-2 shadow-md" />
          <div className="absolute top-3/5 right-1/5 w-48 h-48 bg-gradient-to-br from-green-200/20 to-emerald-200/10 rounded-full backdrop-blur-sm border border-green-300/20 animate-bubble-drift-3 shadow-md" />
        </div>

        {/* Main Content */}
        <div className="relative z-20 min-h-screen flex items-center justify-center p-4">
          <div className="w-full max-w-lg">

            {/* Enhanced Glass Container */}
            <div className="relative group">
              {/* Enhanced outer glow */}
              <div className="absolute -inset-6 bg-gradient-to-r from-blue-300/40 via-purple-300/50 to-pink-300/40 rounded-[2rem] blur-2xl opacity-60 group-hover:opacity-80 transition-all duration-1000 animate-aurora-glow" />
              
              {/* Secondary glow layer */}
              <div className="absolute -inset-3 bg-gradient-to-r from-white/60 via-blue-100/40 to-purple-100/40 rounded-[1.5rem] blur-xl opacity-40 group-hover:opacity-60 transition-all duration-500" />

              {/* Enhanced Glass Panel */}
              <div className="relative glass-card rounded-[1.5rem] overflow-hidden group-hover:shadow-2xl transition-all duration-500">

                {/* Enhanced inner glass layers */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-blue-50/10 to-purple-50/15 rounded-[1.5rem]" />
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-100/15 via-transparent to-purple-100/15 rounded-[1.5rem]" />
                <div className="absolute inset-0 bg-gradient-to-bl from-transparent via-white/10 to-transparent rounded-[1.5rem]" />

                {/* Content */}
                <div className="relative p-12">

                  {/* Enhanced Header */}
                  <div className="text-center mb-12 animate-glass-fade-in">
                    {/* Logo with enhanced styling */}
                    <div className="mb-10">
                      <h1 className="text-6xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent text-clean-shadow">
                        EduLink Pro
                      </h1>
                      <div className="mt-4 h-px w-40 mx-auto bg-gradient-to-r from-transparent via-purple-400/70 to-transparent line-static-glow rounded-full" />
                    </div>

                    <h2 className="text-4xl font-semibold text-gray-800 mb-4 animate-slide-up-delayed drop-shadow-sm">
                      Welcome Back
                    </h2>

                    <p className="text-gray-600 text-xl animate-slide-up-delayed-2 drop-shadow-sm">
                      Sign in to continue your educational journey
                    </p>
                  </div>

                  {/* Enhanced Form */}
                  <form className="space-y-10" onSubmit={handleSubmit}>
                    {/* Enhanced Error Message */}
                    {error && (
                      <div className="relative overflow-hidden rounded-2xl animate-slide-up-delayed">
                        <div className="absolute inset-0 bg-gradient-to-r from-red-100/90 to-red-50/80 backdrop-blur-lg border border-red-300/70 shadow-lg" />
                        <div className="relative p-5 text-red-700">
                          <div className="flex items-center">
                            <svg className="w-6 h-6 mr-4 text-red-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                            <span className="font-semibold">{error}</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Enhanced Email Field */}
                    <div className="group animate-slide-up-delayed-3">
                      <label className="flex items-center text-sm font-bold text-gray-700 mb-4 group-focus-within:text-blue-600 transition-all duration-500">
                        <svg className="w-5 h-5 mr-3 text-gray-500 group-focus-within:text-blue-500 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                        </svg>
                        Email Address
                      </label>
                      <div className="relative">
                        <div className="absolute inset-0 glass-input rounded-2xl group-focus-within:border-blue-400/80 group-focus-within:shadow-lg group-focus-within:input-focus-effect transition-all duration-500" />
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-50/20 to-purple-50/20 rounded-2xl opacity-0 group-focus-within:opacity-100 transition-all duration-500" />

                        <input
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          name="email"
                          required
                          className="relative w-full px-7 py-5 bg-transparent text-gray-700 font-semibold placeholder-gray-500 focus:outline-none text-lg"
                          placeholder="Enter your email"
                        />
                      </div>
                      <p className="text-sm text-gray-500 mt-3 ml-3 flex items-center">
                        <svg className="w-4 h-4 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Use "student@university.edu" for student access or "prof@university.edu" for lecturer access
                      </p>
                    </div>

                    {/* Enhanced Password Field */}
                    <div className="group animate-slide-up-delayed-4">
                      <label className="flex items-center text-sm font-bold text-gray-700 mb-4 group-focus-within:text-blue-600 transition-all duration-500">
                        <svg className="w-5 h-5 mr-3 text-gray-500 group-focus-within:text-blue-500 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                        Password
                      </label>
                      <div className="relative">
                        <div className="absolute inset-0 glass-input rounded-2xl group-focus-within:border-blue-400/80 group-focus-within:shadow-lg group-focus-within:input-focus-effect transition-all duration-500" />
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-50/20 to-purple-50/20 rounded-2xl opacity-0 group-focus-within:opacity-100 transition-all duration-500" />

                        <input
                          type="password"
                          value={formData.password}
                          onChange={handleChange}
                          name="password"
                          required
                          className="relative w-full px-7 py-5 bg-transparent text-gray-700 font-semibold placeholder-gray-500 focus:outline-none text-lg"
                          placeholder="Enter your password"
                        />
                      </div>
                    </div>

                    {/* Enhanced Remember & Forgot */}
                    <div className="flex items-center justify-between animate-slide-up-delayed-5">
                      <label className="flex items-center cursor-pointer group">
                        <input
                          type="checkbox"
                          checked={formData.remember}
                          onChange={handleChange}
                          name="remember"
                          className="sr-only"
                        />
                        <div className="relative">
                          <div className={`w-7 h-7 rounded-xl border-2 transition-all duration-300 shadow-sm ${formData.remember ? 'border-blue-500 bg-blue-100 shadow-blue-200' : 'border-gray-300 bg-white/70 group-hover:border-gray-400 group-hover:shadow-md'}`}>
                            {formData.remember && (
                              <svg className="w-5 h-5 text-blue-600 absolute top-0.5 left-0.5" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                            )}
                          </div>
                        </div>
                        <span className="ml-4 text-gray-700 font-semibold group-hover:text-gray-800 transition-colors duration-300">
                          Remember me
                        </span>
                      </label>

                      <Link href="/forgot-password" className="flex items-center text-blue-600 hover:text-blue-700 transition-colors duration-300 hover:underline font-semibold">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Forgot password?
                      </Link>
                    </div>

                    {/* Enhanced Login Button */}
                    <div className="animate-slide-up-delayed-6">
                      <button
                        type="submit"
                        disabled={loading}
                        className="relative w-full group overflow-hidden rounded-2xl button-static-shadow hover:shadow-2xl transition-all duration-500"
                      >
                        <div className="absolute inset-0 glass-button group-hover:shadow-2xl transition-all duration-500" />
                        <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-white/10 opacity-0 group-hover:opacity-100 transition-all duration-500" />
                        <div className="absolute -inset-1 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 blur-lg opacity-50 group-hover:opacity-70 transition-all duration-500" />

                        <div className="relative py-5 px-8 text-white font-bold text-xl group-hover:scale-[1.02] transition-transform duration-300 flex items-center justify-center">
                          {loading ? (
                            <>
                              <svg className="w-6 h-6 mr-3 animate-spin" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                <path className="opacity-75" fill="currentColor" d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                              </svg>
                              Signing in...
                            </>
                          ) : (
                            <>
                              <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                              </svg>
                              Sign In
                              <svg className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                              </svg>
                            </>
                          )}
                        </div>
                      </button>
                    </div>
                  </form>

                  {/* Enhanced Demo Section */}
                  <div className="mt-12 animate-slide-up-delayed-7">
                    <div className="relative overflow-hidden rounded-2xl group">
                      <div className="absolute inset-0 demo-card group-hover:shadow-lg transition-all duration-500" />
                      <div className="relative p-8">
                        <h3 className="text-lg font-bold text-gray-700 mb-6 flex items-center">
                          <svg className="w-6 h-6 mr-3 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                          </svg>
                          Demo Accounts
                        </h3>
                        <div className="space-y-4">
                          <div className="group flex justify-between items-center p-5 bg-white/60 backdrop-blur-lg rounded-xl border border-gray-200/50 hover:bg-white/80 hover:shadow-md transition-all duration-300">
                            <div className="flex items-center">
                              <svg className="w-5 h-5 mr-3 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                              </svg>
                              <span className="text-gray-700 font-semibold"><strong className="text-gray-800">Student:</strong> student@university.edu</span>
                            </div>
                            <span className="text-emerald-600 font-bold text-sm px-3 py-1 bg-emerald-50 rounded-lg">any password</span>
                          </div>
                          <div className="group flex justify-between items-center p-5 bg-white/60 backdrop-blur-lg rounded-xl border border-gray-200/50 hover:bg-white/80 hover:shadow-md transition-all duration-300">
                            <div className="flex items-center">
                              <svg className="w-5 h-5 mr-3 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                              </svg>
                              <span className="text-gray-700 font-semibold"><strong className="text-gray-800">Lecturer:</strong> prof@university.edu</span>
                            </div>
                            <span className="text-emerald-600 font-bold text-sm px-3 py-1 bg-emerald-50 rounded-lg">any password</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Enhanced Sign Up Link */}
                  <div className="mt-10 text-center animate-slide-up-delayed-8">
                    <p className="text-gray-600 font-medium text-lg">
                      Don&apos;t have an account?{' '}
                      <Link href="/register" className="inline-flex items-center text-blue-600 hover:text-blue-700 font-bold transition-colors duration-300 hover:underline cursor-pointer group">
                        Sign up for free
                        <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Enhanced Back to Home */}
            <div className="mt-10 text-center animate-slide-up-delayed-9">
              <Link href="/" className="inline-flex items-center text-gray-500 hover:text-gray-700 transition-colors duration-300 cursor-pointer group font-medium text-lg">
                <svg className="w-5 h-5 mr-3 group-hover:-translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Back to home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}