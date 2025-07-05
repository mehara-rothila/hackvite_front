// app/register/page.tsx
'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function RegisterPage() {
  // FIX: Removed unused 'selectedRole' state. It was set but never read.
  const router = useRouter()

  const handleRoleSelect = (role: 'student' | 'lecturer') => {
    // Navigate to role-specific registration
    router.push(`/register/${role}`)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <Link href="/" className="inline-flex items-center mb-6">
            <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-xl">E</span>
            </div>
            <span className="ml-3 text-2xl font-bold text-gray-900">EduLink Pro</span>
          </Link>
          <h2 className="text-3xl font-bold text-gray-900">
            Join EduLink Pro
          </h2>
          <p className="mt-2 text-lg text-gray-600">
            Choose your role to get started with your educational journey
          </p>
        </div>

        {/* Role Selection */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              I am a...
            </h3>
            <p className="text-gray-600">
              Select your role to customize your experience
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Student Option */}
            <button
              onClick={() => handleRoleSelect('student')}
              className="group relative p-8 border-2 border-gray-200 rounded-xl hover:border-blue-500 hover:shadow-lg transition-all duration-200 text-left focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              <div className="absolute top-4 right-4">
                <div className="w-6 h-6 rounded-full border-2 border-gray-300 group-hover:border-blue-500 transition-colors"></div>
              </div>
              
              <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-blue-200 transition-colors">
                <span className="text-3xl">🎓</span>
              </div>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Student</h3>
              <p className="text-gray-600 mb-4">
                Access courses, communicate with lecturers, schedule appointments, and get AI-powered learning assistance.
              </p>
              
              <div className="space-y-2">
                <div className="flex items-center text-sm text-gray-500">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  Message lecturers directly
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  Book office hours
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  AI learning assistant
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  Resource library access
                </div>
              </div>
            </button>

            {/* Lecturer Option */}
            <button
              onClick={() => handleRoleSelect('lecturer')}
              className="group relative p-8 border-2 border-gray-200 rounded-xl hover:border-purple-500 hover:shadow-lg transition-all duration-200 text-left focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
            >
              <div className="absolute top-4 right-4">
                <div className="w-6 h-6 rounded-full border-2 border-gray-300 group-hover:border-purple-500 transition-colors"></div>
              </div>
              
              <div className="w-16 h-16 bg-purple-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-purple-200 transition-colors">
                <span className="text-3xl">👨‍🏫</span>
              </div>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Lecturer</h3>
              <p className="text-gray-600 mb-4">
                Manage student communications, track engagement, schedule office hours, and broadcast announcements.
              </p>
              
              <div className="space-y-2">
                <div className="flex items-center text-sm text-gray-500">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  Manage student queries
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  Analytics dashboard
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  Office hours management
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  Broadcast announcements
                </div>
              </div>
            </button>
          </div>

          {/* Additional Info */}
          <div className="mt-8 p-4 bg-gray-50 rounded-lg">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <span className="text-blue-600 text-xl">💡</span>
              </div>
              <div className="ml-3">
                <h4 className="text-sm font-medium text-gray-900">Not sure which role to choose?</h4>
                <p className="text-sm text-gray-600 mt-1">
                  You can always change your role later in your account settings. Choose the role that best describes your primary use case.
                </p>
              </div>
            </div>
          </div>

          {/* Sign In Link */}
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <Link href="/login" className="text-blue-600 hover:text-blue-700 font-medium">
                Sign in here
              </Link>
            </p>
          </div>
        </div>

        {/* Back to Home */}
        <div className="text-center">
          <Link href="/" className="text-sm text-gray-500 hover:text-gray-700">
            ← Back to home
          </Link>
        </div>
      </div>
    </div>
  )
}