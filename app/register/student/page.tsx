// app/register/student/page.tsx
'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { authAPI } from '@/lib/api'
import './student-register.css'

export default function StudentRegisterPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    studentId: '',
    university: '',
    department: '',
    yearOfStudy: '',
    agreeToTerms: false
  })
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
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

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required'
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required'
    if (!formData.email.trim()) newErrors.email = 'Email is required'
    if (!formData.email.includes('@')) newErrors.email = 'Please enter a valid email'
    if (!formData.password) newErrors.password = 'Password is required'
    if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters'
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match'
    if (!formData.studentId.trim()) newErrors.studentId = 'Student ID is required'
    if (!formData.university.trim()) newErrors.university = 'University is required'
    if (!formData.department.trim()) newErrors.department = 'Department is required'
    if (!formData.yearOfStudy) newErrors.yearOfStudy = 'Year of study is required'
    if (!formData.agreeToTerms) newErrors.agreeToTerms = 'You must agree to the terms and conditions'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setLoading(true)

    try {
      // Call real backend API
      const authResponse = await authAPI.registerStudent({
        email: formData.email,
        password: formData.password,
        firstName: formData.firstName,
        lastName: formData.lastName,
        department: formData.department,
        studentId: formData.studentId,
        year: formData.yearOfStudy,
        major: formData.department // Using department as major for now
      })

      // Registration successful - redirect to dashboard
      router.push('/student/dashboard')

    } catch (error) {
      console.error('Registration error:', error)
      const errorMessage = error instanceof Error ? error.message : 'Registration failed. Please try again.'

      // Set specific field errors if possible
      if (errorMessage.toLowerCase().includes('email already exists')) {
        setErrors(prev => ({ ...prev, email: 'This email is already registered' }))
      } else {
        setErrors(prev => ({ ...prev, general: errorMessage }))
      }
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    const checked = (e.target as HTMLInputElement).checked

    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))

    // Clear errors on change
    if (errors[name] || errors.general) {
      const newErrors = { ...errors }
      delete newErrors[name]
      delete newErrors.general
      setErrors(newErrors)
    }
  }

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Light Colorful Educational Background - SAME AS LOGIN */}
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

      {/* Educational Background - Student/Learning Equations */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/6 text-4xl font-bold text-blue-600/80 animate-equation-float-1">
          f(x) = ax² + bx + c
        </div>
        <div className="absolute top-1/3 right-1/5 text-3xl font-bold text-emerald-600/80 animate-equation-float-2">
          sin²θ + cos²θ = 1
        </div>
        <div className="absolute bottom-1/4 left-1/5 text-3xl font-bold text-pink-600/80 animate-equation-float-3">
          dy/dx = lim(h→0) [f(x+h)-f(x)]/h
        </div>
        <div className="absolute top-1/2 right-1/6 text-3xl font-bold text-purple-600/80 animate-equation-float-4">
          ∑(i=1 to n) i = n(n+1)/2
        </div>
        <div className="absolute bottom-1/3 right-1/4 text-3xl font-bold text-orange-600/80 animate-equation-float-1">
          P(A|B) = P(A∩B)/P(B)
        </div>
        <div className="absolute top-2/3 left-1/4 text-3xl font-bold text-cyan-600/80 animate-equation-float-2">
          x = (-b ± √(b²-4ac))/2a
        </div>

        {/* Floating Knowledge Particles */}
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

      {/* Light Floating Glass Orbs - SAME AS LOGIN */}
      <div className="absolute inset-0">
        <div className="absolute top-16 left-16 w-80 h-80 bg-gradient-to-br from-blue-200/30 to-cyan-200/20 rounded-full backdrop-blur-sm border border-blue-300/40 animate-glass-float-1 shadow-lg" />
        <div className="absolute top-32 right-24 w-96 h-96 bg-gradient-to-br from-purple-200/25 to-pink-200/15 rounded-full backdrop-blur-sm border border-purple-300/30 animate-glass-float-2 shadow-lg" />
        <div className="absolute bottom-24 left-32 w-88 h-88 bg-gradient-to-br from-emerald-200/25 to-teal-200/15 rounded-full backdrop-blur-sm border border-emerald-300/25 animate-glass-float-3 shadow-lg" />
        <div className="absolute bottom-16 right-16 w-72 h-72 bg-gradient-to-br from-orange-200/25 to-yellow-200/15 rounded-full backdrop-blur-sm border border-orange-300/30 animate-glass-float-4 shadow-lg" />

        <div className="absolute top-1/4 left-1/5 w-56 h-56 bg-gradient-to-br from-rose-200/20 to-pink-200/10 rounded-full backdrop-blur-sm border border-rose-300/25 animate-bubble-drift-1 shadow-md" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-gradient-to-br from-indigo-200/22 to-blue-200/12 rounded-full backdrop-blur-sm border border-indigo-300/30 animate-bubble-drift-2 shadow-md" />
        <div className="absolute top-3/5 right-1/5 w-48 h-48 bg-gradient-to-br from-green-200/20 to-emerald-200/10 rounded-full backdrop-blur-sm border border-green-300/20 animate-bubble-drift-3 shadow-md" />
      </div>

      {/* Main Content - SAME STRUCTURE AS LOGIN */}
      <div className="relative z-20 min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-2xl">

          {/* Light Glass Container - SAME AS LOGIN */}
          <div className="relative group">
            {/* Colorful outer glow */}
            <div className="absolute -inset-4 bg-gradient-to-r from-blue-300/30 via-purple-300/40 to-pink-300/30 rounded-3xl blur-xl opacity-60 group-hover:opacity-80 transition-all duration-1000 animate-aurora-glow" />

            {/* Glass Panel */}
            <div className="relative bg-white/60 backdrop-blur-xl rounded-3xl border border-white/80 shadow-2xl overflow-hidden">

              {/* Inner glass effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-blue-50/20 to-purple-50/20 rounded-3xl" />
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-100/20 via-transparent to-purple-100/20 rounded-3xl" />

              {/* Content */}
              <div className="relative p-10">

                {/* Header - SAME STYLE AS LOGIN */}
                <div className="text-center mb-10 animate-glass-fade-in">
                  <div className="mb-8">
                    <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-text-glow">
                      EduLink Pro
                    </h1>
                    <div className="mt-3 h-px w-32 mx-auto bg-gradient-to-r from-transparent via-purple-400/60 to-transparent animate-line-glow" />
                  </div>

                  <div className="flex items-center justify-center mb-4">
                    <span className="text-3xl mr-3">🎓</span>
                    <h2 className="text-3xl font-medium text-gray-800 animate-slide-up-delayed">
                      Student Registration
                    </h2>
                  </div>

                  <p className="text-gray-600 text-lg animate-slide-up-delayed-2">
                    Create your student account to start connecting with your lecturers
                  </p>
                </div>

                {/* Form - USING SAME FIELD STRUCTURE AS LOGIN */}
                <form className="space-y-6" onSubmit={handleSubmit}>

                  {/* General Error Message */}
                  {errors.general && (
                    <div className="relative overflow-hidden rounded-2xl animate-slide-up-delayed">
                      <div className="absolute inset-0 bg-gradient-to-r from-red-100/90 to-red-50/80 backdrop-blur-lg border border-red-300/70 shadow-lg" />
                      <div className="relative p-5 text-red-700">
                        <div className="flex items-center">
                          <svg className="w-6 h-6 mr-4 text-red-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                          </svg>
                          <span className="font-semibold">{errors.general}</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Name Fields */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-slide-up-delayed-3">
                    <div className="group">
                      <label className="block text-sm font-bold text-gray-700 mb-3 group-focus-within:text-blue-600 transition-all duration-500">
                        First Name *
                      </label>
                      <div className="relative">
                        <div className="absolute inset-0 bg-white/40 backdrop-blur-lg rounded-2xl border border-gray-200/60 group-focus-within:border-blue-400/60 group-focus-within:bg-white/60 transition-all duration-500 shadow-sm" />
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-50/30 to-purple-50/30 rounded-2xl opacity-0 group-focus-within:opacity-100 transition-all duration-500" />

                        <input
                          type="text"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleChange}
                          className="relative w-full px-6 py-4 bg-transparent text-gray-700 font-semibold placeholder-gray-500 focus:outline-none text-lg"
                          placeholder="Enter first name"
                        />
                      </div>
                      {errors.firstName && <p className="text-red-600 text-sm mt-2 ml-2">{errors.firstName}</p>}
                    </div>

                    <div className="group">
                      <label className="block text-sm font-bold text-gray-700 mb-3 group-focus-within:text-blue-600 transition-all duration-500">
                        Last Name *
                      </label>
                      <div className="relative">
                        <div className="absolute inset-0 bg-white/40 backdrop-blur-lg rounded-2xl border border-gray-200/60 group-focus-within:border-blue-400/60 group-focus-within:bg-white/60 transition-all duration-500 shadow-sm" />
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-50/30 to-purple-50/30 rounded-2xl opacity-0 group-focus-within:opacity-100 transition-all duration-500" />

                        <input
                          type="text"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleChange}
                          className="relative w-full px-6 py-4 bg-transparent text-gray-700 font-semibold placeholder-gray-500 focus:outline-none text-lg"
                          placeholder="Enter last name"
                        />
                      </div>
                      {errors.lastName && <p className="text-red-600 text-sm mt-2 ml-2">{errors.lastName}</p>}
                    </div>
                  </div>

                  {/* Email Field - SAME AS LOGIN */}
                  <div className="group animate-slide-up-delayed-4">
                    <label className="block text-sm font-bold text-gray-700 mb-3 group-focus-within:text-blue-600 transition-all duration-500">
                      Email Address *
                    </label>
                    <div className="relative">
                      <div className="absolute inset-0 bg-white/40 backdrop-blur-lg rounded-2xl border border-gray-200/60 group-focus-within:border-blue-400/60 group-focus-within:bg-white/60 transition-all duration-500 shadow-sm" />
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-50/30 to-purple-50/30 rounded-2xl opacity-0 group-focus-within:opacity-100 transition-all duration-500" />

                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="relative w-full px-6 py-4 bg-transparent text-gray-700 font-semibold placeholder-gray-500 focus:outline-none text-lg"
                        placeholder="student@university.edu"
                      />
                    </div>
                    {errors.email && <p className="text-red-600 text-sm mt-2 ml-2">{errors.email}</p>}
                  </div>

                  {/* Password Fields */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-slide-up-delayed-5">
                    <div className="group">
                      <label className="block text-sm font-bold text-gray-700 mb-3 group-focus-within:text-blue-600 transition-all duration-500">
                        Password *
                      </label>
                      <div className="relative">
                        <div className="absolute inset-0 bg-white/40 backdrop-blur-lg rounded-2xl border border-gray-200/60 group-focus-within:border-blue-400/60 group-focus-within:bg-white/60 transition-all duration-500 shadow-sm" />
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-50/30 to-purple-50/30 rounded-2xl opacity-0 group-focus-within:opacity-100 transition-all duration-500" />

                        <input
                          type="password"
                          name="password"
                          value={formData.password}
                          onChange={handleChange}
                          className="relative w-full px-6 py-4 bg-transparent text-gray-700 font-semibold placeholder-gray-500 focus:outline-none text-lg"
                          placeholder="Create password"
                        />
                      </div>
                      {errors.password && <p className="text-red-600 text-sm mt-2 ml-2">{errors.password}</p>}
                    </div>

                    <div className="group">
                      <label className="block text-sm font-bold text-gray-700 mb-3 group-focus-within:text-blue-600 transition-all duration-500">
                        Confirm Password *
                      </label>
                      <div className="relative">
                        <div className="absolute inset-0 bg-white/40 backdrop-blur-lg rounded-2xl border border-gray-200/60 group-focus-within:border-blue-400/60 group-focus-within:bg-white/60 transition-all duration-500 shadow-sm" />
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-50/30 to-purple-50/30 rounded-2xl opacity-0 group-focus-within:opacity-100 transition-all duration-500" />

                        <input
                          type="password"
                          name="confirmPassword"
                          value={formData.confirmPassword}
                          onChange={handleChange}
                          className="relative w-full px-6 py-4 bg-transparent text-gray-700 font-semibold placeholder-gray-500 focus:outline-none text-lg"
                          placeholder="Confirm password"
                        />
                      </div>
                      {errors.confirmPassword && <p className="text-red-600 text-sm mt-2 ml-2">{errors.confirmPassword}</p>}
                    </div>
                  </div>

                  {/* Academic Info Section */}
                  <div className="animate-slide-up-delayed-6">
                    <div className="relative overflow-hidden rounded-2xl mb-6">
                      <div className="absolute inset-0 bg-white/40 backdrop-blur-lg border border-gray-200/50 shadow-sm" />
                      <div className="relative p-6">
                        <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                          <span className="text-2xl mr-3">📚</span>
                          Academic Information
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="group">
                            <label className="block text-sm font-bold text-gray-700 mb-2">Student ID *</label>
                            <div className="relative">
                              <div className="absolute inset-0 bg-white/40 backdrop-blur-lg rounded-xl border border-gray-200/60 group-focus-within:border-blue-400/60 transition-all duration-300" />
                              <input
                                type="text"
                                name="studentId"
                                value={formData.studentId}
                                onChange={handleChange}
                                className="relative w-full px-4 py-3 bg-transparent text-gray-700 font-semibold placeholder-gray-500 focus:outline-none"
                                placeholder="S123456"
                              />
                            </div>
                            {errors.studentId && <p className="text-red-600 text-sm mt-1">{errors.studentId}</p>}
                          </div>

                          <div className="group">
                            <label className="block text-sm font-bold text-gray-700 mb-2">Year of Study *</label>
                            <div className="relative">
                              <div className="absolute inset-0 bg-white/40 backdrop-blur-lg rounded-xl border border-gray-200/60 group-focus-within:border-blue-400/60 transition-all duration-300" />
                              <select
                                name="yearOfStudy"
                                value={formData.yearOfStudy}
                                onChange={handleChange}
                                className="relative w-full px-4 py-3 bg-transparent text-gray-700 font-semibold focus:outline-none appearance-none"
                              >
                                <option value="">Select year</option>
                                <option value="1">1st Year</option>
                                <option value="2">2nd Year</option>
                                <option value="3">3rd Year</option>
                                <option value="4">4th Year</option>
                                <option value="5">5th Year</option>
                                <option value="graduate">Graduate</option>
                                <option value="phd">PhD</option>
                              </select>
                            </div>
                            {errors.yearOfStudy && <p className="text-red-600 text-sm mt-1">{errors.yearOfStudy}</p>}
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                          <div className="group">
                            <label className="block text-sm font-bold text-gray-700 mb-2">University *</label>
                            <div className="relative">
                              <div className="absolute inset-0 bg-white/40 backdrop-blur-lg rounded-xl border border-gray-200/60 group-focus-within:border-blue-400/60 transition-all duration-300" />
                              <input
                                type="text"
                                name="university"
                                value={formData.university}
                                onChange={handleChange}
                                className="relative w-full px-4 py-3 bg-transparent text-gray-700 font-semibold placeholder-gray-500 focus:outline-none"
                                placeholder="University of Technology"
                              />
                            </div>
                            {errors.university && <p className="text-red-600 text-sm mt-1">{errors.university}</p>}
                          </div>

                          <div className="group">
                            <label className="block text-sm font-bold text-gray-700 mb-2">Department/Major *</label>
                            <div className="relative">
                              <div className="absolute inset-0 bg-white/40 backdrop-blur-lg rounded-xl border border-gray-200/60 group-focus-within:border-blue-400/60 transition-all duration-300" />
                              <input
                                type="text"
                                name="department"
                                value={formData.department}
                                onChange={handleChange}
                                className="relative w-full px-4 py-3 bg-transparent text-gray-700 font-semibold placeholder-gray-500 focus:outline-none"
                                placeholder="Computer Science"
                              />
                            </div>
                            {errors.department && <p className="text-red-600 text-sm mt-1">{errors.department}</p>}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Terms Checkbox - SAME STYLE AS LOGIN */}
                  <div className="animate-slide-up-delayed-7">
                    <label className="flex items-center cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={formData.agreeToTerms}
                        onChange={handleChange}
                        name="agreeToTerms"
                        className="sr-only"
                      />
                      <div className="relative">
                        <div className={`w-6 h-6 rounded-lg border-2 border-gray-300 bg-white/60 backdrop-blur-lg transition-all duration-300 shadow-sm ${formData.agreeToTerms ? 'border-blue-500 bg-blue-100' : 'group-hover:border-gray-400'}`}>
                          {formData.agreeToTerms && (
                            <svg className="w-4 h-4 text-blue-600 absolute top-0.5 left-0.5" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          )}
                        </div>
                      </div>
                      <span className="ml-3 text-gray-700 font-semibold group-hover:text-gray-800 transition-colors duration-300">
                        I agree to the{' '}
                        <Link href="/terms" className="text-blue-600 hover:text-blue-700 transition-colors duration-300 hover:underline">
                          Terms of Service
                        </Link>{' '}
                        and{' '}
                        <Link href="/privacy" className="text-blue-600 hover:text-blue-700 transition-colors duration-300 hover:underline">
                          Privacy Policy
                        </Link>
                      </span>
                    </label>
                    {errors.agreeToTerms && <p className="text-red-600 text-sm mt-2 ml-8">{errors.agreeToTerms}</p>}
                  </div>

                  {/* Submit Button - SAME STYLE AS LOGIN */}
                  <div className="animate-slide-up-delayed-8">
                    <button
                      type="submit"
                      disabled={loading}
                      className="relative w-full group overflow-hidden rounded-2xl"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 backdrop-blur-lg border border-blue-400/30 group-hover:from-blue-600 group-hover:via-purple-600 group-hover:to-pink-600 transition-all duration-500 shadow-lg" />
                      <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-white/5 opacity-0 group-hover:opacity-100 transition-all duration-500" />
                      <div className="absolute -inset-1 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 blur opacity-50 group-hover:opacity-70 transition-all duration-500" />

                      <div className="relative py-4 px-6 text-white font-bold text-lg group-hover:scale-[1.02] transition-transform duration-300">
                        {loading ? (
                          <div className="flex items-center justify-center">
                            <div className="w-6 h-6 border-2 border-white/50 border-t-white rounded-full animate-spin mr-3" />
                            Creating Account...
                          </div>
                        ) : (
                          <div className="flex items-center justify-center">
                            Create Student Account
                            <svg className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                          </div>
                        )}
                      </div>
                    </button>
                  </div>
                </form>

                {/* Footer Links - SAME STYLE AS LOGIN */}
                <div className="mt-8 text-center animate-slide-up-delayed-9">
                  <p className="text-gray-600 font-medium mb-3">
                    Want to register as a lecturer?{' '}
                    <Link href="/register/lecturer" className="text-blue-600 hover:text-blue-700 font-bold transition-colors duration-300 hover:underline cursor-pointer">
                      Switch to lecturer registration
                    </Link>
                  </p>
                  <p className="text-gray-600 font-medium">
                    Already have an account?{' '}
                    <Link href="/login" className="text-blue-600 hover:text-blue-700 font-bold transition-colors duration-300 hover:underline cursor-pointer">
                      Sign in here
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Back to Role Selection - SAME AS LOGIN */}
          <div className="mt-8 text-center animate-slide-up-delayed-9">
            <Link href="/register" className="inline-flex items-center text-gray-500 hover:text-gray-700 transition-colors duration-300 cursor-pointer group font-medium">
              <svg className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to role selection
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
