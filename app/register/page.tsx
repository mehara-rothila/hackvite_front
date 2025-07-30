// app/register/page.tsx
'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

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
    router.push(`/register/${role}`)
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

        /* New Styles for Register Page */
        .glass-container-register {
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.4));
          backdrop-filter: blur(40px) saturate(150%);
          border: 1px solid rgba(255, 255, 255, 0.9);
          box-shadow: 0 16px 48px rgba(31, 38, 135, 0.25);
        }
        .glass-card-student, .glass-card-lecturer {
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 0.3));
          backdrop-filter: blur(20px) saturate(120%);
          border: 1px solid rgba(255, 255, 255, 0.7);
          box-shadow: 0 8px 32px rgba(31, 38, 135, 0.1);
          transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
        }
        .glass-card-student:hover {
          transform: translateY(-10px) scale(1.03);
          box-shadow: 0 20px 40px rgba(59, 130, 246, 0.2), 0 0 0 2px rgba(59, 130, 246, 0.5);
        }
        .glass-card-lecturer:hover {
          transform: translateY(-10px) scale(1.03);
          box-shadow: 0 20px 40px rgba(168, 85, 247, 0.2), 0 0 0 2px rgba(168, 85, 247, 0.5);
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
        .icon-student, .icon-lecturer {
          transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
        }
        .group:hover .icon-student, .group:hover .icon-lecturer {
          transform: translateY(-8px) scale(1.1) rotate(5deg);
          box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
        }
        .feature-item {
          transition: transform 0.3s ease-out;
        }
        .group:hover .feature-item {
          transform: translateX(5px);
        }
        .group:hover .feature-item:nth-child(1) { transition-delay: 0.05s; }
        .group:hover .feature-item:nth-child(2) { transition-delay: 0.1s; }
        .group:hover .feature-item:nth-child(3) { transition-delay: 0.15s; }
        .group:hover .feature-item:nth-child(4) { transition-delay: 0.2s; }
      `}</style>
      {/* --- END: Global Styles & Animations --- */}

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
            {/* FIX: Replaced ' with &apos; to avoid React's unescaped entities error. */}
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
                        onClick={() => handleRoleSelect('student')}
                        className="group relative glass-card-student rounded-2xl p-8 text-left focus:outline-none focus:ring-4 focus:ring-blue-500/50"
                      >
                        {/* Selection indicator */}
                        <div className="absolute top-6 right-6">
                          <div className="w-8 h-8 rounded-full border-2 border-blue-300 group-hover:border-blue-500 transition-all duration-300 flex items-center justify-center">
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
                        onClick={() => handleRoleSelect('lecturer')}
                        className="group relative glass-card-lecturer rounded-2xl p-8 text-left focus:outline-none focus:ring-4 focus:ring-purple-500/50"
                      >
                        {/* Selection indicator */}
                        <div className="absolute top-6 right-6">
                          <div className="w-8 h-8 rounded-full border-2 border-purple-300 group-hover:border-purple-500 transition-all duration-300 flex items-center justify-center">
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
    </>
  )
}
