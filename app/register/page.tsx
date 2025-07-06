// app/register/page.tsx
'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import './register.css' // Import the new CSS file

export default function RegisterPage() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const router = useRouter()

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

  const handleRoleSelect = (role: 'student' | 'lecturer') => {
    console.log('Role selected:', role) // Debug log
    router.push(`/register/${role}`)
  }

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Light Colorful Educational Background */}
      <div className="absolute inset-0 z-0">
        {/* Dynamic mouse-following gradient */}
        <div
          className="absolute inset-0 opacity-30 transition-all duration-700 ease-out"
          style={{
            background: `radial-gradient(800px circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(59, 130, 246, 0.2) 0%, rgba(168, 85, 247, 0.15) 25%, transparent 50%)`
          }}
        />

        {/* Light colorful gradient meshes */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-100/40 via-purple-100/35 to-pink-100/40 animate-mesh-drift-1" />
        <div className="absolute inset-0 bg-gradient-to-tr from-emerald-100/35 via-violet-100/30 to-orange-100/35 animate-mesh-drift-2" />
        <div className="absolute inset-0 bg-gradient-to-bl from-cyan-100/40 via-purple-100/25 to-rose-100/40 animate-mesh-drift-3" />
        <div className="absolute inset-0 bg-gradient-to-r from-yellow-100/30 via-transparent to-green-100/30 animate-mesh-drift-4" />
      </div>

      {/* Educational Background - Registration Context */}
      <div className="absolute inset-0 z-0">
        {/* Educational Equations - Registration/Learning Theme */}
        <div className="absolute top-1/6 left-1/8 text-3xl font-bold text-blue-600/80 animate-equation-float-1">
          f(x) = ax + b
        </div>
        <div className="absolute top-1/4 right-1/6 text-2xl font-bold text-emerald-600/80 animate-equation-float-2">
          ∂f/∂x = lim(h→0) [f(x+h)-f(x)]/h
        </div>
        <div className="absolute bottom-1/5 left-1/6 text-3xl font-bold text-pink-600/80 animate-equation-float-3">
          P(A∩B) = P(A)×P(B)
        </div>
        <div className="absolute top-1/2 right-1/8 text-2xl font-bold text-purple-600/80 animate-equation-float-4">
          ∫ f&apos;(x)dx = f(x) + C
        </div>
        <div className="absolute bottom-1/3 right-1/5 text-3xl font-bold text-orange-600/80 animate-equation-float-1">
          y = mx + c
        </div>
        <div className="absolute top-2/3 left-1/5 text-2xl font-bold text-cyan-600/80 animate-equation-float-2">
          Σ(xi - μ)² / N = σ²
        </div>
        <div className="absolute top-3/4 right-1/3 text-3xl font-bold text-rose-600/80 animate-equation-float-3">
          log(ab) = log(a) + log(b)
        </div>

        {/* Floating Knowledge Particles */}
        {[...Array(25)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-3 h-3 rounded-full animate-particle-drift-${(i % 4) + 1} shadow-md`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 8}s`,
              animationDuration: `${6 + Math.random() * 4}s`,
              background: `radial-gradient(circle, ${['rgba(59, 130, 246, 0.8)', 'rgba(16, 185, 129, 0.8)', 'rgba(239, 68, 68, 0.8)', 'rgba(168, 85, 247, 0.8)', 'rgba(245, 158, 11, 0.8)', 'rgba(236, 72, 153, 0.8)'][i % 6]}, rgba(255,255,255,0.3))`
            }}
          />
        ))}
      </div>

      {/* Light Floating Glass Orbs */}
      <div className="absolute inset-0 z-0">
        {/* Large colorful glass orbs */}
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
      <div className="relative z-30 min-h-screen flex items-center justify-center py-12 px-4">
        <div className="max-w-4xl w-full">

          {/* Glass Container */}
          <div className="relative group">
            {/* Colorful outer glow */}
            <div className="absolute -inset-6 bg-gradient-to-r from-blue-300/30 via-purple-300/40 to-pink-300/30 rounded-3xl blur-xl opacity-60 group-hover:opacity-80 transition-all duration-1000 animate-aurora-glow" />

            {/* Glass Panel */}
            <div className="relative glass-container-register rounded-3xl overflow-hidden">

              {/* Inner glass effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-blue-50/20 to-purple-50/20 rounded-3xl" />
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-100/20 via-transparent to-purple-100/20 rounded-3xl" />

              {/* Content */}
              <div className="relative p-10">

                {/* Header */}
                <div className="text-center mb-12 animate-glass-fade-in">
                  <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-text-glow mb-4">
                    EduLink Pro
                  </h1>

                  <h2 className="text-4xl font-bold text-gray-800 mb-4 animate-slide-up-delayed">
                    Join EduLink Pro
                  </h2>

                  <div className="mt-4 h-px w-40 mx-auto bg-gradient-to-r from-transparent via-purple-400/60 to-transparent animate-line-glow" />

                  <p className="mt-6 text-xl text-gray-600 animate-slide-up-delayed-2">
                    Choose your role to get started with your educational journey
                  </p>
                </div>

                {/* Role Selection Section */}
                <div className="animate-slide-up-delayed-3">
                  <div className="text-center mb-10">
                    <h3 className="text-2xl font-bold text-gray-800 mb-3">
                      I am a…
                    </h3>
                    <p className="text-gray-600 text-lg">
                      Select your role to customize your experience
                    </p>
                  </div>

                  {/* Role Cards */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">

                    {/* Student Card */}
                    <button
                      onClick={(e) => {
                        e.preventDefault()
                        console.log('Student card clicked!')
                        handleRoleSelect('student')
                      }}
                      onMouseDown={() => console.log('Student card mouse down')}
                      onMouseEnter={() => console.log('Student card mouse enter')}
                      className="group relative glass-card-student rounded-2xl p-8 text-left focus:outline-none focus:ring-4 focus:ring-blue-500/50"
                    >
                      {/* Selection indicator */}
                      <div className="absolute top-6 right-6">
                        <div className="w-8 h-8 rounded-full border-3 border-blue-300 group-hover:border-blue-500 transition-all duration-300 flex items-center justify-center">
                          <div className="w-3 h-3 bg-blue-500 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
                        </div>
                      </div>

                      {/* Icon */}
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl flex items-center justify-center mb-6 group-hover:shadow-lg transition-all duration-300 icon-student">
                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                        </svg>
                      </div>

                      {/* Content */}
                      <h3 className="text-2xl font-bold text-gray-800 mb-4">Student</h3>
                      <p className="text-gray-600 mb-6 text-lg leading-relaxed">
                        Access courses, communicate with lecturers, schedule appointments, and get AI-powered learning assistance.
                      </p>

                      {/* Features */}
                      <div className="space-y-3">
                        <div className="flex items-center text-gray-600 feature-item">
                          <div className="w-3 h-3 bg-gradient-to-r from-emerald-400 to-emerald-600 rounded-full mr-3 shadow-sm"></div>
                          <span className="font-semibold">Message lecturers directly</span>
                        </div>
                        <div className="flex items-center text-gray-600 feature-item">
                          <div className="w-3 h-3 bg-gradient-to-r from-emerald-400 to-emerald-600 rounded-full mr-3 shadow-sm"></div>
                          <span className="font-semibold">Book office hours</span>
                        </div>
                        <div className="flex items-center text-gray-600 feature-item">
                          <div className="w-3 h-3 bg-gradient-to-r from-emerald-400 to-emerald-600 rounded-full mr-3 shadow-sm"></div>
                          <span className="font-semibold">AI learning assistant</span>
                        </div>
                        <div className="flex items-center text-gray-600 feature-item">
                          <div className="w-3 h-3 bg-gradient-to-r from-emerald-400 to-emerald-600 rounded-full mr-3 shadow-sm"></div>
                          <span className="font-semibold">Resource library access</span>
                        </div>
                      </div>
                    </button>

                    {/* Lecturer Card */}
                    <button
                      onClick={(e) => {
                        e.preventDefault()
                        console.log('Lecturer card clicked!')
                        handleRoleSelect('lecturer')
                      }}
                      onMouseDown={() => console.log('Lecturer card mouse down')}
                      onMouseEnter={() => console.log('Lecturer card mouse enter')}
                      className="group relative glass-card-lecturer rounded-2xl p-8 text-left focus:outline-none focus:ring-4 focus:ring-purple-500/50"
                    >
                      {/* Selection indicator */}
                      <div className="absolute top-6 right-6">
                        <div className="w-8 h-8 rounded-full border-3 border-purple-300 group-hover:border-purple-500 transition-all duration-300 flex items-center justify-center">
                          <div className="w-3 h-3 bg-purple-500 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
                        </div>
                      </div>

                      {/* Icon */}
                      <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-purple-600 rounded-xl flex items-center justify-center mb-6 group-hover:shadow-lg transition-all duration-300 icon-lecturer">
                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                        </svg>
                      </div>

                      {/* Content */}
                      <h3 className="text-2xl font-bold text-gray-800 mb-4">Lecturer</h3>
                      <p className="text-gray-600 mb-6 text-lg leading-relaxed">
                        Manage student communications, track engagement, schedule office hours, and broadcast announcements.
                      </p>

                      {/* Features */}
                      <div className="space-y-3">
                        <div className="flex items-center text-gray-600 feature-item">
                          <div className="w-3 h-3 bg-gradient-to-r from-emerald-400 to-emerald-600 rounded-full mr-3 shadow-sm"></div>
                          <span className="font-semibold">Manage student queries</span>
                        </div>
                        <div className="flex items-center text-gray-600 feature-item">
                          <div className="w-3 h-3 bg-gradient-to-r from-emerald-400 to-emerald-600 rounded-full mr-3 shadow-sm"></div>
                          <span className="font-semibold">Analytics dashboard</span>
                        </div>
                        <div className="flex items-center text-gray-600 feature-item">
                          <div className="w-3 h-3 bg-gradient-to-r from-emerald-400 to-emerald-600 rounded-full mr-3 shadow-sm"></div>
                          <span className="font-semibold">Office hours management</span>
                        </div>
                        <div className="flex items-center text-gray-600 feature-item">
                          <div className="w-3 h-3 bg-gradient-to-r from-emerald-400 to-emerald-600 rounded-full mr-3 shadow-sm"></div>
                          <span className="font-semibold">Broadcast announcements</span>
                        </div>
                      </div>
                    </button>
                  </div>

                  {/* Additional Info */}
                  <div className="animate-slide-up-delayed-5">
                    <div className="relative overflow-hidden rounded-2xl mb-8">
                      <div className="absolute inset-0 bg-white/50 backdrop-blur-lg border border-gray-200/60 shadow-sm" />
                      <div className="relative p-6">
                        <div className="flex items-start">
                          <div className="flex-shrink-0">
                            <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-500 rounded-xl flex items-center justify-center">
                              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                            </div>
                          </div>
                          <div className="ml-4">
                            <h4 className="text-lg font-bold text-gray-800 mb-2">Not sure which role to choose?</h4>
                            <p className="text-gray-600 leading-relaxed">
                              You can always change your role later in your account settings. Choose the role that best describes your primary use case.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Sign In Link */}
                    <div className="text-center">
                      <p className="text-gray-600 text-lg">
                        Already have an account?{' '}
                        <Link href="/login" className="text-blue-600 hover:text-blue-700 font-bold transition-colors duration-300 hover:underline cursor-pointer">
                          Sign in here
                        </Link>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Back to Home */}
          <div className="mt-8 text-center animate-slide-up-delayed-5">
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
  )
}
