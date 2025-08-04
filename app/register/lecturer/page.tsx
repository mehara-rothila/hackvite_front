// app/register/lecturer/page.tsx
'use client'

import { useState, useEffect, FormEvent } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { authAPI } from '@/lib/api'

export default function LecturerRegisterPage() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const router = useRouter()

  // Form state
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [lecturerId, setLecturerId] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

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

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    if (password !== confirmPassword) {
      setError('Passwords do not match.')
      setIsLoading(false)
      return
    }

    try {
      // Extract first and last name from full name
      const nameParts = fullName.trim().split(' ')
      const firstName = nameParts[0] || ''
      const lastName = nameParts.slice(1).join(' ') || ''

      // Call real backend API
      const authResponse = await authAPI.registerLecturer({
        email: email,
        password: password,
        firstName: firstName,
        lastName: lastName,
        department: 'General', // You might want to add a department field
        employeeId: lecturerId,
        office: '', // You might want to add office field
        phone: '' // You might want to add phone field
      })

      // Registration successful - redirect to dashboard
      router.push('/lecturer/dashboard')

    } catch (error) {
      console.error('Registration error:', error)
      setError(error instanceof Error ? error.message : 'Registration failed. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }


  return (
    <>
      {/* --- START: Global Styles & Animations --- */}
      <style jsx global>{`
        /* Base Animations from other pages */
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

        /* Styles for Register Form */
        .glass-container-register {
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.4));
          backdrop-filter: blur(40px) saturate(150%);
          border: 1px solid rgba(255, 255, 255, 0.9);
          box-shadow: 0 16px 48px rgba(31, 38, 135, 0.25);
        }
        @keyframes text-glow {
          0%, 100% { text-shadow: 0 0 10px rgba(168, 85, 247, 0.2), 0 0 20px rgba(59, 130, 246, 0.2); }
          50% { text-shadow: 0 0 20px rgba(168, 85, 247, 0.4), 0 0 40px rgba(59, 130, 246, 0.4); }
        }
        .animate-text-glow {
          animation: text-glow 4s ease-in-out infinite;
        }
        @keyframes line-glow {
          0%, 100% { opacity: 0.6; transform: scaleX(1); }
          50% { opacity: 1; transform: scaleX(1.05); }
        }
        .animate-line-glow {
          animation: line-glow 3s ease-in-out infinite;
        }
        .form-input {
          background: rgba(255, 255, 255, 0.6);
          border: 1px solid rgba(255, 255, 255, 0.7);
          backdrop-filter: blur(5px);
          transition: all 0.3s ease;
        }
        .form-input:focus {
          background: rgba(255, 255, 255, 0.8);
          box-shadow: 0 0 0 2px rgba(168, 85, 247, 0.5);
          border-color: rgba(168, 85, 247, 0.7);
        }
        .submit-button {
          transition: all 0.3s ease;
        }
        .submit-button:hover {
          box-shadow: 0 10px 20px rgba(168, 85, 247, 0.3), 0 6px 6px rgba(59, 130, 246, 0.2);
          transform: translateY(-2px);
        }
        .submit-button:active {
          transform: translateY(0);
          box-shadow: 0 5px 10px rgba(168, 85, 247, 0.2);
        }
      `}</style>
      {/* --- END: Global Styles & Animations --- */}

      <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
        {/* --- START: Multi-Layered Animated Background --- */}
        <div className="absolute inset-0 z-0">
          <div
            className="absolute inset-0 opacity-30 transition-all duration-700 ease-out"
            style={{
              background: `radial-gradient(800px circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(168, 85, 247, 0.2) 0%, rgba(59, 130, 246, 0.15) 25%, transparent 50%)`
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-blue-100/40 via-purple-100/35 to-pink-100/40 animate-mesh-drift-1" />
          <div className="absolute inset-0 bg-gradient-to-tr from-emerald-100/35 via-violet-100/30 to-orange-100/35 animate-mesh-drift-2" />
          <div className="absolute inset-0 bg-gradient-to-bl from-cyan-100/40 via-purple-100/25 to-rose-100/40 animate-mesh-drift-3" />
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-100/30 via-transparent to-green-100/30 animate-mesh-drift-4" />
          <div className="absolute top-1/6 left-1/8 text-3xl font-bold text-blue-600/80 animate-equation-float-1">f(x) = ax + b</div>
          <div className="absolute top-1/4 right-1/6 text-2xl font-bold text-emerald-600/80 animate-equation-float-2">∂f/∂x = lim(h→0) [f(x+h)-f(x)]/h</div>
          <div className="absolute bottom-1/5 left-1/6 text-3xl font-bold text-pink-600/80 animate-equation-float-3">P(A∩B) = P(A)×P(B)</div>
          {/* FIX: Replaced ' with &apos; to avoid React's unescaped entities error. */}
          <div className="absolute top-1/2 right-1/8 text-2xl font-bold text-purple-600/80 animate-equation-float-4">∫ f&apos;(x)dx = f(x) + C</div>
          {[...Array(25)].map((_, i) => (
            <div key={i} className={`absolute w-3 h-3 rounded-full animate-particle-drift-${(i % 4) + 1} shadow-md`} style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%`, animationDelay: `${Math.random() * 8}s`, animationDuration: `${6 + Math.random() * 4}s`, background: `radial-gradient(circle, ${['rgba(59, 130, 246, 0.8)', 'rgba(16, 185, 129, 0.8)', 'rgba(239, 68, 68, 0.8)', 'rgba(168, 85, 247, 0.8)', 'rgba(245, 158, 11, 0.8)', 'rgba(236, 72, 153, 0.8)'][i % 6]}, rgba(255,255,255,0.3))` }} />
          ))}
          <div className="absolute top-16 left-16 w-80 h-80 bg-gradient-to-br from-blue-200/30 to-cyan-200/20 rounded-full backdrop-blur-sm border border-blue-300/40 animate-glass-float-1 shadow-lg" />
          <div className="absolute top-32 right-24 w-96 h-96 bg-gradient-to-br from-purple-200/25 to-pink-200/15 rounded-full backdrop-blur-sm border border-purple-300/30 animate-glass-float-2 shadow-lg" />
          <div className="absolute bottom-24 left-32 w-88 h-88 bg-gradient-to-br from-emerald-200/25 to-teal-200/15 rounded-full backdrop-blur-sm border border-emerald-300/25 animate-glass-float-3 shadow-lg" />
          <div className="absolute bottom-16 right-16 w-72 h-72 bg-gradient-to-br from-orange-200/25 to-yellow-200/15 rounded-full backdrop-blur-sm border border-orange-300/30 animate-glass-float-4 shadow-lg" />
          <div className="absolute top-1/4 left-1/5 w-56 h-56 bg-gradient-to-br from-rose-200/20 to-pink-200/10 rounded-full backdrop-blur-sm border border-rose-300/25 animate-bubble-drift-1 shadow-md" />
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-gradient-to-br from-indigo-200/22 to-blue-200/12 rounded-full backdrop-blur-sm border border-indigo-300/30 animate-bubble-drift-2 shadow-md" />
        </div>
        {/* --- END: Multi-Layered Animated Background --- */}

        {/* Main Content */}
        <div className="relative z-30 min-h-screen flex items-center justify-center py-12 px-4">
          <div className="max-w-md w-full">

            {/* Glass Container */}
            <div className="relative group">
              <div className="absolute -inset-4 bg-gradient-to-r from-purple-300/30 via-blue-300/40 to-pink-300/30 rounded-3xl blur-xl opacity-60 group-hover:opacity-80 transition-all duration-1000 animate-aurora-glow" />
              <div className="relative glass-container-register rounded-3xl overflow-hidden">
                <div className="relative p-8">

                  {/* Header */}
                  <div className="text-center mb-8 animate-glass-fade-in">
                    <div className="inline-block p-3 bg-gradient-to-br from-purple-400 to-purple-600 rounded-xl mb-4 shadow-lg">
                       <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                        </svg>
                    </div>
                    <h2 className="text-3xl font-bold text-gray-800 mb-2 animate-slide-up-delayed">
                      Create Your Lecturer Account
                    </h2>
                    <div className="mt-2 h-px w-24 mx-auto bg-gradient-to-r from-transparent via-purple-400/60 to-transparent animate-line-glow" />
                    <p className="mt-4 text-gray-600 animate-slide-up-delayed-2">
                      Shape the future of education.
                    </p>
                  </div>

                  {/* Registration Form */}
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="animate-slide-up-delayed-3">
                      <label htmlFor="fullName" className="block text-sm font-semibold text-gray-600 mb-1">Full Name</label>
                      <input
                        id="fullName"
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="w-full px-4 py-3 rounded-lg form-input placeholder-gray-500 text-gray-800"
                        placeholder="e.g., Dr. Alex Smith"
                        required
                      />
                    </div>
                    <div className="animate-slide-up-delayed-4">
                      <label htmlFor="email" className="block text-sm font-semibold text-gray-600 mb-1">Email Address</label>
                      <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-3 rounded-lg form-input placeholder-gray-500 text-gray-800"
                        placeholder="you@university.edu"
                        required
                      />
                    </div>
                    <div className="animate-slide-up-delayed-5">
                      <label htmlFor="lecturerId" className="block text-sm font-semibold text-gray-600 mb-1">Lecturer / Staff ID</label>
                      <input
                        id="lecturerId"
                        type="text"
                        value={lecturerId}
                        onChange={(e) => setLecturerId(e.target.value)}
                        className="w-full px-4 py-3 rounded-lg form-input placeholder-gray-500 text-gray-800"
                        placeholder="Your unique staff ID"
                        required
                      />
                    </div>
                    <div className="animate-slide-up-delayed-6">
                      <label htmlFor="password" className="block text-sm font-semibold text-gray-600 mb-1">Password</label>
                      <input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-4 py-3 rounded-lg form-input placeholder-gray-500 text-gray-800"
                        placeholder="••••••••"
                        required
                      />
                    </div>
                    <div className="animate-slide-up-delayed-7">
                      <label htmlFor="confirmPassword" className="block text-sm font-semibold text-gray-600 mb-1">Confirm Password</label>
                      <input
                        id="confirmPassword"
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full px-4 py-3 rounded-lg form-input placeholder-gray-500 text-gray-800"
                        placeholder="••••••••"
                        required
                      />
                    </div>

                    {error && <p className="text-red-500 text-sm font-semibold text-center bg-red-500/10 p-2 rounded-lg">{error}</p>}

                    <div className="pt-4 animate-slide-up-delayed-7">
                      <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-gradient-to-r from-purple-500 to-blue-600 text-white font-bold py-3 px-4 rounded-lg submit-button disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
                      >
                        {isLoading ? (
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                        ) : (
                          'Create Account'
                        )}
                      </button>
                    </div>
                  </form>

                  <div className="mt-8 text-center animate-slide-up-delayed-7">
                    <p className="text-gray-600">
                      Already have an account?{' '}
                      <Link href="/login" className="text-purple-600 hover:text-purple-700 font-bold transition-colors duration-300 hover:underline">
                        Sign in
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 text-center animate-slide-up-delayed-7">
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
    </>
  )
}
