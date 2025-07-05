// app/page.tsx
'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'

export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    
    const handleScroll = () => setScrollY(window.scrollY)
    
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('scroll', handleScroll)
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  // Create floating elements
  const floatingElements = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    top: Math.random() * 100,
    delay: Math.random() * 5,
    duration: 3 + Math.random() * 4,
    size: 20 + Math.random() * 40,
  }))

  return (
    <>
      {/* CSS Animations */}
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes float {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-20px) rotate(180deg); }
          }
          
          @keyframes pulse {
            0%, 100% { opacity: 0.3; transform: scale(1); }
            50% { opacity: 0.8; transform: scale(1.1); }
          }
          
          @keyframes slideInUp {
            from { opacity: 0; transform: translateY(50px); }
            to { opacity: 1; transform: translateY(0); }
          }
          
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          
          @keyframes gradient {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
          
          @keyframes bubble {
            0% { transform: translateY(100vh) scale(0); opacity: 0; }
            50% { opacity: 1; }
            100% { transform: translateY(-100vh) scale(1); opacity: 0; }
          }
          
          .floating-animation {
            animation: float 6s ease-in-out infinite;
          }
          
          .pulse-animation {
            animation: pulse 4s ease-in-out infinite;
          }
          
          .slide-up {
            animation: slideInUp 0.8s ease-out forwards;
          }
          
          .fade-in {
            animation: fadeIn 1s ease-out forwards;
          }
          
          .gradient-bg {
            background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab, #667eea, #764ba2);
            background-size: 400% 400%;
            animation: gradient 15s ease infinite;
          }
          
          .bubble {
            animation: bubble 8s linear infinite;
          }
          
          .glassmorphism {
            background: rgba(255, 255, 255, 0.25);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.18);
          }
          
          .text-gradient {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
          }
          
          .hover-lift {
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          }
          
          .hover-lift:hover {
            transform: translateY(-8px);
            box-shadow: 0 25px 50px rgba(0, 0, 0, 0.15);
          }
          
          @media (min-width: 768px) {
            .md-flex { display: flex !important; }
            .md-hidden { display: none !important; }
            .md-block { display: block !important; }
          }
        `
      }} />

      <div style={{ minHeight: '100vh', position: 'relative', overflow: 'hidden' }}>
        {/* Animated Background */}
        <div 
          className="gradient-bg"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: -3,
            opacity: 0.1
          }}
        />

        {/* Mouse Follower Effect */}
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(99, 102, 241, 0.15), transparent 40%)`,
          zIndex: -2,
          pointerEvents: 'none',
          transition: 'background 0.3s ease'
        }} />

        {/* Floating Bubbles */}
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: -1,
          pointerEvents: 'none'
        }}>
          {floatingElements.map((element) => (
            <div
              key={element.id}
              className="bubble pulse-animation"
              style={{
                position: 'absolute',
                left: `${element.left}%`,
                top: `${element.top}%`,
                width: `${element.size}px`,
                height: `${element.size}px`,
                background: `linear-gradient(45deg, rgba(99, 102, 241, 0.3), rgba(139, 92, 246, 0.3))`,
                borderRadius: '50%',
                animationDelay: `${element.delay}s`,
                animationDuration: `${element.duration}s`,
                filter: 'blur(1px)'
              }}
            />
          ))}
        </div>

        {/* Geometric Shapes */}
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: -1,
          pointerEvents: 'none'
        }}>
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="floating-animation"
              style={{
                position: 'absolute',
                width: `${80 + i * 15}px`,
                height: `${80 + i * 15}px`,
                border: `2px solid rgba(${100 + i * 20}, ${120 + i * 15}, 255, 0.2)`,
                borderRadius: i % 3 === 0 ? '50%' : i % 3 === 1 ? '0' : '25%',
                top: `${5 + i * 12}%`,
                left: `${3 + i * 11}%`,
                animationDelay: `${i * 0.5}s`,
                transform: `rotate(${i * 45}deg)`
              }}
            />
          ))}
        </div>

        {/* Navigation */}
        <nav className="glassmorphism" style={{
          position: 'sticky',
          top: 0,
          zIndex: 50,
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
        }}>
          <div style={{
            maxWidth: '80rem',
            margin: '0 auto',
            padding: '0 1rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            height: '4rem'
          }}>
            {/* Logo */}
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div className="pulse-animation" style={{
                width: '2.5rem',
                height: '2.5rem',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                borderRadius: '0.75rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 8px 25px rgba(102, 126, 234, 0.5)'
              }}>
                <span style={{ color: 'white', fontWeight: 'bold', fontSize: '1rem' }}>E</span>
              </div>
              <span style={{ 
                marginLeft: '0.75rem', 
                fontSize: '1.5rem', 
                fontWeight: 'bold',
                background: 'linear-gradient(135deg, #1f2937 0%, #667eea 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>
                EduLink Pro
              </span>
            </div>

            {/* Desktop Navigation */}
            <div style={{ display: 'none', alignItems: 'center', gap: '1rem' }} className="md-flex">
              {['Features', 'About'].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="hover-lift"
                  style={{
                    color: '#6b7280',
                    padding: '0.75rem 1rem',
                    borderRadius: '0.5rem',
                    fontSize: '0.875rem',
                    fontWeight: '600',
                    textDecoration: 'none',
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = '#667eea'
                    e.currentTarget.style.background = 'rgba(102, 126, 234, 0.1)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = '#6b7280'
                    e.currentTarget.style.background = 'transparent'
                  }}
                >
                  {item}
                </a>
              ))}
              <Link
                href="/login"
                className="hover-lift"
                style={{
                  color: '#6b7280',
                  padding: '0.75rem 1rem',
                  borderRadius: '0.5rem',
                  fontSize: '0.875rem',
                  fontWeight: '600',
                  textDecoration: 'none'
                }}
              >
                Login
              </Link>
              <Link
                href="/register"
                className="hover-lift"
                style={{
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  color: 'white',
                  padding: '0.75rem 1.5rem',
                  borderRadius: '0.75rem',
                  fontSize: '0.875rem',
                  fontWeight: '600',
                  textDecoration: 'none',
                  boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)',
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                Get Started ✨
              </Link>
            </div>

            {/* Mobile menu button */}
            <div style={{ display: 'block' }} className="md-hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="hover-lift"
                style={{
                  color: '#6b7280',
                  padding: '0.5rem',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  borderRadius: '0.5rem'
                }}
              >
                <svg style={{ height: '1.5rem', width: '1.5rem' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="glassmorphism fade-in" style={{
              borderTop: '1px solid rgba(255, 255, 255, 0.2)'
            }}>
              <div style={{ padding: '1rem' }}>
                {['Features', 'About', 'Login'].map((item) => (
                  <a
                    key={item}
                    href={item === 'Login' ? '/login' : `#${item.toLowerCase()}`}
                    style={{
                      display: 'block',
                      color: '#6b7280',
                      padding: '0.75rem',
                      borderRadius: '0.5rem',
                      fontSize: '1rem',
                      fontWeight: '500',
                      textDecoration: 'none',
                      marginBottom: '0.5rem'
                    }}
                  >
                    {item}
                  </a>
                ))}
                <Link
                  href="/register"
                  style={{
                    display: 'block',
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    color: 'white',
                    padding: '0.75rem',
                    borderRadius: '0.5rem',
                    fontSize: '1rem',
                    fontWeight: '600',
                    textDecoration: 'none',
                    textAlign: 'center'
                  }}
                >
                  Get Started ✨
                </Link>
              </div>
            </div>
          )}
        </nav>

        {/* Hero Section */}
        <section style={{
          padding: '6rem 1rem',
          position: 'relative',
          textAlign: 'center',
          background: 'linear-gradient(135deg, rgba(240, 249, 255, 0.8) 0%, rgba(224, 242, 254, 0.8) 100%)'
        }}>
          <div style={{
            maxWidth: '80rem',
            margin: '0 auto'
          }}>
            <div className="slide-up" style={{ animationDelay: '0.2s' }}>
              <h1 style={{
                fontSize: 'clamp(2.5rem, 6vw, 5rem)',
                fontWeight: 'bold',
                marginBottom: '2rem',
                lineHeight: '1.1'
              }}>
                Bridge the Gap Between{' '}
                <span className="text-gradient">
                  Students & Lecturers
                </span>
              </h1>
            </div>
            
            <p className="slide-up" style={{
              fontSize: '1.25rem',
              color: '#6b7280',
              marginBottom: '3rem',
              maxWidth: '50rem',
              margin: '0 auto 3rem auto',
              animationDelay: '0.4s'
            }}>
              EduLink Pro revolutionizes educational communication with AI-powered insights, 
              seamless messaging, smart scheduling, and collaborative learning tools.
            </p>
            
            <div className="slide-up" style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
              justifyContent: 'center',
              alignItems: 'center',
              animationDelay: '0.6s'
            }}>
              <Link
                href="/register"
                className="hover-lift pulse-animation"
                style={{
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  color: 'white',
                  padding: '1.25rem 2.5rem',
                  borderRadius: '1rem',
                  fontSize: '1.25rem',
                  fontWeight: '700',
                  textDecoration: 'none',
                  boxShadow: '0 15px 35px rgba(102, 126, 234, 0.5)',
                  border: 'none',
                  cursor: 'pointer',
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                <span>Start Free Trial</span>
                <span style={{ marginLeft: '0.5rem', fontSize: '1.5rem' }}>🚀</span>
              </Link>
              
              <button className="glassmorphism hover-lift" style={{
                color: '#374151',
                padding: '1.25rem 2.5rem',
                borderRadius: '1rem',
                fontSize: '1.25rem',
                fontWeight: '600',
                border: '2px solid rgba(255, 255, 255, 0.3)',
                cursor: 'pointer',
                boxShadow: '0 8px 25px rgba(0, 0, 0, 0.1)'
              }}>
                <span>Watch Demo</span>
                <span style={{ marginLeft: '0.5rem', fontSize: '1.5rem' }}>🎥</span>
              </button>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" style={{
          padding: '6rem 1rem',
          position: 'relative'
        }}>
          <div className="glassmorphism" style={{
            maxWidth: '80rem',
            margin: '0 auto',
            padding: '4rem 2rem',
            borderRadius: '2rem'
          }}>
            <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
              <h2 className="slide-up text-gradient" style={{
                fontSize: 'clamp(2rem, 4vw, 3rem)',
                fontWeight: 'bold',
                marginBottom: '1rem'
              }}>
                Everything You Need for Modern Education
              </h2>
              <p className="slide-up" style={{
                fontSize: '1.25rem',
                color: '#6b7280',
                maxWidth: '42rem',
                margin: '0 auto',
                animationDelay: '0.2s'
              }}>
                Powerful features designed to enhance communication and learning outcomes
              </p>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
              gap: '2rem'
            }}>
              {[
                { emoji: '💬', title: 'Smart Messaging', desc: 'Real-time communication with intelligent categorization, file sharing, and conversation threading.', gradient: 'linear-gradient(135deg, #667eea, #764ba2)' },
                { emoji: '🤖', title: 'AI Assistant', desc: 'EduBot provides instant answers, suggests responses, and offers personalized learning recommendations.', gradient: 'linear-gradient(135deg, #f093fb, #f5576c)' },
                { emoji: '📅', title: 'Smart Scheduling', desc: 'Intelligent appointment booking with automatic conflict detection and calendar integration.', gradient: 'linear-gradient(135deg, #4facfe, #00f2fe)' },
                { emoji: '📊', title: 'Analytics & Insights', desc: 'Comprehensive dashboards showing engagement metrics, response times, and learning patterns.', gradient: 'linear-gradient(135deg, #43e97b, #38f9d7)' },
                { emoji: '📁', title: 'Resource Management', desc: 'Centralized library for course materials, assignments, and collaborative document sharing.', gradient: 'linear-gradient(135deg, #fa709a, #fee140)' },
                { emoji: '📱', title: 'Mobile-First Design', desc: 'Progressive Web App with offline capabilities, ensuring access anywhere, anytime.', gradient: 'linear-gradient(135deg, #a8edea, #fed6e3)' }
              ].map((feature, index) => (
                <div
                  key={index}
                  className="glassmorphism hover-lift slide-up"
                  style={{
                    padding: '2.5rem',
                    borderRadius: '1.5rem',
                    cursor: 'pointer',
                    position: 'relative',
                    overflow: 'hidden',
                    animationDelay: `${index * 0.1}s`,
                    border: '2px solid rgba(255, 255, 255, 0.2)'
                  }}
                >
                  <div style={{
                    position: 'absolute',
                    top: '-2px',
                    left: '-2px',
                    right: '-2px',
                    bottom: '-2px',
                    background: feature.gradient,
                    borderRadius: '1.5rem',
                    zIndex: -1,
                    opacity: 0.1
                  }} />
                  
                  <div style={{ fontSize: '4rem', marginBottom: '1.5rem' }}>{feature.emoji}</div>
                  <h3 style={{
                    fontSize: '1.5rem',
                    fontWeight: '700',
                    color: '#1f2937',
                    marginBottom: '1rem'
                  }}>
                    {feature.title}
                  </h3>
                  <p style={{ color: '#6b7280', lineHeight: '1.6', fontSize: '1rem' }}>
                    {feature.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="gradient-bg" style={{
          padding: '6rem 1rem',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{
            maxWidth: '80rem',
            margin: '0 auto',
            textAlign: 'center',
            position: 'relative'
          }}>
            <h2 className="slide-up" style={{
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontWeight: 'bold',
              color: 'white',
              marginBottom: '1.5rem',
              textShadow: '0 4px 8px rgba(0, 0, 0, 0.3)'
            }}>
              Ready to Transform Your Educational Experience?
            </h2>
            <p className="slide-up" style={{
              fontSize: '1.25rem',
              color: 'rgba(255, 255, 255, 0.9)',
              marginBottom: '3rem',
              maxWidth: '42rem',
              margin: '0 auto 3rem auto',
              animationDelay: '0.2s'
            }}>
              Join thousands of students and lecturers who are already using EduLink Pro.
            </p>
            <Link
              href="/register"
              className="glassmorphism hover-lift pulse-animation slide-up"
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                color: '#667eea',
                padding: '1.25rem 2.5rem',
                borderRadius: '1rem',
                fontSize: '1.25rem',
                fontWeight: '700',
                textDecoration: 'none',
                display: 'inline-block',
                boxShadow: '0 15px 35px rgba(0, 0, 0, 0.2)',
                animationDelay: '0.4s'
              }}
            >
              Start Free Trial 🌟
            </Link>
          </div>
        </section>

        {/* Footer */}
        <footer className="glassmorphism" style={{
          color: '#1f2937',
          padding: '3rem 1rem',
          position: 'relative',
          background: 'rgba(255, 255, 255, 0.9)'
        }}>
          <div style={{
            maxWidth: '80rem',
            margin: '0 auto',
            textAlign: 'center'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '1.5rem'
            }}>
              <div className="pulse-animation" style={{
                width: '2.5rem',
                height: '2.5rem',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                borderRadius: '0.75rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <span style={{ color: 'white', fontWeight: 'bold', fontSize: '1rem' }}>E</span>
              </div>
              <span style={{ 
                marginLeft: '0.75rem', 
                fontSize: '1.5rem', 
                fontWeight: 'bold',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>
                EduLink Pro
              </span>
            </div>
            <p style={{
              color: '#6b7280',
              marginBottom: '2rem',
              fontSize: '1.1rem'
            }}>
              Revolutionizing educational communication with AI-powered insights and seamless collaboration.
            </p>
            <p style={{ color: '#9ca3af' }}>
              &copy; 2024 EduLink Pro. All rights reserved.
            </p>
          </div>
        </footer>
      </div>
    </>
  )
}