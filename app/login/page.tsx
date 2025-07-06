// app/login/page.tsx
'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import './login.css' // Import the new CSS file

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    remember: false
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
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
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Light Colorful Educational Background */}
      <div className="absolute inset-0">
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
        {[...Array(30)].map((_, i) => (
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

          {/* Light Glass Container */}
          <div className="relative group">
            {/* Colorful outer glow for light theme */}
            <div className="absolute -inset-4 bg-gradient-to-r from-blue-300/30 via-purple-300/40 to-pink-300/30 rounded-3xl blur-xl opacity-60 group-hover:opacity-80 transition-all duration-1000 animate-aurora-glow" />

            {/* Glass Panel adapted for light background */}
            <div className="relative bg-white/60 backdrop-blur-xl rounded-3xl border border-white/80 shadow-2xl overflow-hidden">

              {/* Inner glass effect for light theme */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-blue-50/20 to-purple-50/20 rounded-3xl" />
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-100/20 via-transparent to-purple-100/20 rounded-3xl" />

              {/* Content */}
              <div className="relative p-10">

                {/* Header with dark text for light background */}
                <div className="text-center mb-10 animate-glass-fade-in">
                  {/* Text Logo - Dark for light background */}
                  <div className="mb-8">
                    <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-text-glow">
                      EduLink Pro
                    </h1>
                    <div className="mt-3 h-px w-32 mx-auto bg-gradient-to-r from-transparent via-purple-400/60 to-transparent animate-line-glow" />
                  </div>

                  <h2 className="text-3xl font-medium text-gray-800 mb-3 animate-slide-up-delayed">
                    Welcome Back
                  </h2>

                  <p className="text-gray-600 text-lg animate-slide-up-delayed-2">
                    Sign in to continue your educational journey
                  </p>
                </div>

                {/* Form with light theme styling */}
                <form className="space-y-8" onSubmit={handleSubmit}>
                  {error && (
                    <div className="relative overflow-hidden rounded-2xl">
                      <div className="absolute inset-0 bg-red-100/80 backdrop-blur-lg border border-red-300/60" />
                      <div className="relative p-4 text-red-700">
                        <div className="flex items-center">
                          <svg className="w-5 h-5 mr-3 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                          </svg>
                          {error}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Email Field for light theme */}
                  <div className="group animate-slide-up-delayed-3">
                    <label className="block text-sm font-bold text-gray-700 mb-3 group-focus-within:text-blue-600 transition-all duration-500">
                      Email Address
                    </label>
                    <div className="relative">
                      {/* Light theme field background */}
                      <div className="absolute inset-0 bg-white/40 backdrop-blur-lg rounded-2xl border border-gray-200/60 group-focus-within:border-blue-400/60 group-focus-within:bg-white/60 transition-all duration-500 shadow-sm" />
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-50/30 to-purple-50/30 rounded-2xl opacity-0 group-focus-within:opacity-100 transition-all duration-500" />

                      <input
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        name="email"
                        required
                        className="relative w-full px-6 py-4 bg-transparent text-gray-700 font-semibold placeholder-gray-500 focus:outline-none text-lg"
                        placeholder="Enter your email"
                      />
                    </div>
                    {/* FIX: Escaped the double quotes */}
                    <p className="text-xs text-gray-500 mt-3 ml-2">
                      Use &quot;student@university.edu&quot; for student access or &quot;prof@university.edu&quot; for lecturer access
                    </p>
                  </div>

                  {/* Password Field for light theme */}
                  <div className="group animate-slide-up-delayed-4">
                    <label className="block text-sm font-bold text-gray-700 mb-3 group-focus-within:text-blue-600 transition-all duration-500">
                      Password
                    </label>
                    <div className="relative">
                      {/* Light theme field background */}
                      <div className="absolute inset-0 bg-white/40 backdrop-blur-lg rounded-2xl border border-gray-200/60 group-focus-within:border-blue-400/60 group-focus-within:bg-white/60 transition-all duration-500 shadow-sm" />
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-50/30 to-purple-50/30 rounded-2xl opacity-0 group-focus-within:opacity-100 transition-all duration-500" />

                      <input
                        type="password"
                        value={formData.password}
                        onChange={handleChange}
                        name="password"
                        required
                        className="relative w-full px-6 py-4 bg-transparent text-gray-700 font-semibold placeholder-gray-500 focus:outline-none text-lg"
                        placeholder="Enter your password"
                      />
                    </div>
                  </div>

                  {/* Remember & Forgot for light theme */}
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
                        <div className={`w-6 h-6 rounded-lg border-2 border-gray-300 bg-white/60 backdrop-blur-lg transition-all duration-300 shadow-sm ${formData.remember ? 'border-blue-500 bg-blue-100' : 'group-hover:border-gray-400'}`}>
                          {formData.remember && (
                            <svg className="w-4 h-4 text-blue-600 absolute top-0.5 left-0.5" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          )}
                        </div>
                      </div>
                      <span className="ml-3 text-gray-700 font-semibold group-hover:text-gray-800 transition-colors duration-300">
                        Remember me
                      </span>
                    </label>

                    <Link href="/forgot-password" className="text-blue-600 hover:text-blue-700 transition-colors duration-300 hover:underline font-semibold">
                      Forgot password?
                    </Link>
                  </div>

                  {/* Colorful Login Button for light theme */}
                  <div className="animate-slide-up-delayed-6">
                    <button
                      type="submit"
                      disabled={loading}
                      className="relative w-full group overflow-hidden rounded-2xl"
                    >
                      {/* Bright gradient button for light theme */}
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 backdrop-blur-lg border border-blue-400/30 group-hover:from-blue-600 group-hover:via-purple-600 group-hover:to-pink-600 transition-all duration-500 shadow-lg" />
                      <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-white/5 opacity-0 group-hover:opacity-100 transition-all duration-500" />
                      <div className="absolute -inset-1 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 blur opacity-50 group-hover:opacity-70 transition-all duration-500" />

                      <div className="relative py-4 px-6 text-white font-bold text-lg group-hover:scale-[1.02] transition-transform duration-300">
                        {loading ? (
                          <div className="flex items-center justify-center">
                            <div className="w-6 h-6 border-2 border-white/50 border-t-white rounded-full animate-spin mr-3" />
                            Signing in...
                          </div>
                        ) : (
                          <div className="flex items-center justify-center">
                            Sign In
                            <svg className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                          </div>
                        )}
                      </div>
                    </button>
                  </div>
                </form>

                {/* Demo Section for light theme */}
                <div className="mt-10 animate-slide-up-delayed-7">
                  <div className="relative overflow-hidden rounded-2xl">
                    <div className="absolute inset-0 bg-white/40 backdrop-blur-lg border border-gray-200/50 shadow-sm" />
                    <div className="relative p-6">
                      <h3 className="text-sm font-bold text-gray-700 mb-4 flex items-center">
                        <svg className="w-4 h-4 mr-2 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Demo Accounts
                      </h3>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center p-4 bg-white/50 backdrop-blur-lg rounded-xl border border-gray-200/40 hover:bg-white/70 transition-all duration-300 shadow-sm">
                          <span className="text-gray-700 font-semibold"><strong className="text-gray-800">Student:</strong> student@university.edu</span>
                          <span className="text-emerald-600 font-bold text-sm">any password</span>
                        </div>
                        <div className="flex justify-between items-center p-4 bg-white/50 backdrop-blur-lg rounded-xl border border-gray-200/40 hover:bg-white/70 transition-all duration-300 shadow-sm">
                          <span className="text-gray-700 font-semibold"><strong className="text-gray-800">Lecturer:</strong> prof@university.edu</span>
                          <span className="text-emerald-600 font-bold text-sm">any password</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Sign Up Link for light theme */}
                <div className="mt-8 text-center animate-slide-up-delayed-8">
                  <p className="text-gray-600 font-medium">
                    {/* FIX: Escaped the apostrophe */}
                    Don&apos;t have an account?{' '}
                    <Link href="/register" className="text-blue-600 hover:text-blue-700 font-bold transition-colors duration-300 hover:underline cursor-pointer">
                      Sign up for free
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Back to Home for light theme */}
          <div className="mt-8 text-center animate-slide-up-delayed-9">
            <Link href="/" className="inline-flex items-center text-gray-500 hover:text-gray-700 transition-colors duration-300 cursor-pointer group font-medium">
              <svg className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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