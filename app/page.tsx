'use client'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import './styles.css'

export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [email, setEmail] = useState('')
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 })

  // Mouse tracking for dynamic gradient
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

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Newsletter signup:', email)
    setEmail('')
  }

  return (
    <div className="main-container">
      {/* EXACT BACKGROUND COPY FROM LOGIN PAGE - BRIGHTER */}
      <div className="absolute inset-0" style={{ overflow: 'hidden' }}>
        {/* Dynamic mouse-following gradient */}
        <div
          className="absolute inset-0 opacity-40 transition-all duration-700 ease-out"
          style={{
            background: `radial-gradient(800px circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(59, 130, 246, 0.3) 0%, rgba(168, 85, 247, 0.25) 25%, transparent 50%)`
          }}
        />

        {/* Light colorful gradient meshes - BRIGHTER */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-100/60 via-purple-100/55 to-pink-100/60 animate-mesh-drift-1" />
        <div className="absolute inset-0 bg-gradient-to-tr from-emerald-100/55 via-violet-100/50 to-orange-100/55 animate-mesh-drift-2" />
        <div className="absolute inset-0 bg-gradient-to-bl from-cyan-100/60 via-purple-100/45 to-rose-100/60 animate-mesh-drift-3" />
        <div className="absolute inset-0 bg-gradient-to-r from-yellow-100/50 via-transparent to-green-100/50 animate-mesh-drift-4" />
      </div>

      {/* Clean Educational Background - 6 Large Mathematical Equations - BRIGHTER */}
      <div className="absolute inset-0" style={{ overflow: 'hidden' }}>
        {/* 6 Large Mathematical Equations Only */}
        <div className="absolute top-1/4 left-1/6 text-4xl font-bold text-blue-600 animate-equation-float-1" style={{ opacity: 0.9, maxWidth: '100vw' }}>
          ∫₀^∞ e^(-x²) dx = √π/2
        </div>
        <div className="absolute top-1/3 right-1/5 text-3xl font-bold text-emerald-600 animate-equation-float-2" style={{ opacity: 0.9, maxWidth: '100vw' }}>
          ∑ᵢ₌₁^∞ 1/n² = π²/6
        </div>
        <div className="absolute bottom-1/4 left-1/5 text-3xl font-bold text-pink-600 animate-equation-float-3" style={{ opacity: 0.9, maxWidth: '100vw' }}>
          E = mc² = ħω
        </div>
        <div className="absolute top-1/2 right-1/6 text-3xl font-bold text-purple-600 animate-equation-float-4" style={{ opacity: 0.9, maxWidth: '100vw' }}>
          π = 4∑(-1)ⁿ/(2n+1)
        </div>
        <div className="absolute bottom-1/3 right-1/4 text-3xl font-bold text-orange-600 animate-equation-float-1" style={{ opacity: 0.9, maxWidth: '100vw' }}>
          lim(x→0) sin(x)/x = 1
        </div>
        <div className="absolute top-2/3 left-1/4 text-3xl font-bold text-cyan-600 animate-equation-float-2" style={{ opacity: 0.9, maxWidth: '100vw' }}>
          a² + b² = c²
        </div>

        {/* Floating Knowledge Particles - BRIGHTER */}
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-3 h-3 rounded-full animate-particle-drift-${(i % 4) + 1} shadow-md`}
            style={{
              left: `${5 + Math.random() * 90}%`,
              top: `${5 + Math.random() * 90}%`,
              animationDelay: `${Math.random() * 8}s`,
              animationDuration: `${6 + Math.random() * 4}s`,
              background: `radial-gradient(circle, ${['rgba(59, 130, 246, 0.9)', 'rgba(16, 185, 129, 0.9)', 'rgba(239, 68, 68, 0.9)', 'rgba(168, 85, 247, 0.9)', 'rgba(245, 158, 11, 0.9)', 'rgba(236, 72, 153, 0.9)'][i % 6]}, rgba(255,255,255,0.4))`,
              maxWidth: '100vw',
              maxHeight: '100vh'
            }}
          />
        ))}
      </div>

      {/* Light Floating Glass Orbs - BRIGHTER */}
      <div className="absolute inset-0" style={{ overflow: 'hidden' }}>
        {/* Large colorful glass orbs - BRIGHTER */}
        <div className="absolute top-16 left-16 w-80 h-80 bg-gradient-to-br from-blue-200/50 to-cyan-200/40 rounded-full backdrop-blur-sm border border-blue-300/60 animate-glass-float-1 shadow-lg" />
        <div className="absolute top-32 right-24 w-96 h-96 bg-gradient-to-br from-purple-200/45 to-pink-200/35 rounded-full backdrop-blur-sm border border-purple-300/50 animate-glass-float-2 shadow-lg" />
        <div className="absolute bottom-24 left-32 w-88 h-88 bg-gradient-to-br from-emerald-200/45 to-teal-200/35 rounded-full backdrop-blur-sm border border-emerald-300/45 animate-glass-float-3 shadow-lg" />
        <div className="absolute bottom-16 right-16 w-72 h-72 bg-gradient-to-br from-orange-200/45 to-yellow-200/35 rounded-full backdrop-blur-sm border border-orange-300/50 animate-glass-float-4 shadow-lg" />

        {/* Medium colorful bubbles - BRIGHTER */}
        <div className="absolute top-1/4 left-1/5 w-56 h-56 bg-gradient-to-br from-rose-200/40 to-pink-200/30 rounded-full backdrop-blur-sm border border-rose-300/45 animate-bubble-drift-1 shadow-md" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-gradient-to-br from-indigo-200/42 to-blue-200/32 rounded-full backdrop-blur-sm border border-indigo-300/50 animate-bubble-drift-2 shadow-md" />
        <div className="absolute top-3/5 right-1/5 w-48 h-48 bg-gradient-to-br from-green-200/40 to-emerald-200/30 rounded-full backdrop-blur-sm border border-green-300/40 animate-bubble-drift-3 shadow-md" />
      </div>

      {/* Navigation */}
      <nav className="navbar">
        <div className="nav-container">
          <div className="logo-container">
            <div className="logo-icon">
              <span>E</span>
            </div>
            <div className="logo-text">EduLink Pro</div>
          </div>
          
          <div className="desktop-nav nav-links">
            <Link href="#features" className="nav-link">Features</Link>
            <Link href="#about" className="nav-link">About</Link>
            <Link href="#pricing" className="nav-link">Pricing</Link>
            <Link href="#contact" className="nav-link">Contact</Link>
            <Link href="/login" className="btn btn-primary">Login</Link>
          </div>
          
          <button 
            className="mobile-only mobile-menu-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
        
        {mobileMenuOpen && (
          <div className="mobile-nav">
            <div className="mobile-nav-content">
              <Link href="#features" className="mobile-nav-link">Features</Link>
              <Link href="#about" className="mobile-nav-link">About</Link>
              <Link href="#pricing" className="mobile-nav-link">Pricing</Link>
              <Link href="#contact" className="mobile-nav-link">Contact</Link>
              <div className="mobile-cta">
                <Link href="/login" className="btn btn-primary" style={{width: '100%'}}>Login</Link>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title" data-text="Transform Educational Communication">
              Transform Educational <span className="highlight">Communication</span>
            </h1>
            <p className="hero-subtitle">
              EduLink Pro revolutionizes educational communication with AI-powered insights, 
              seamless messaging, smart scheduling, and collaborative learning tools.
            </p>
            <div className="hero-buttons">
              <Link href="/register" className="btn btn-hero-primary">
                <svg style={{ width: '1.25rem', height: '1.25rem', marginRight: '0.5rem' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Start Free Trial
              </Link>
              <Link href="#demo" className="btn btn-hero-secondary">
                <svg style={{ width: '1.25rem', height: '1.25rem', marginRight: '0.5rem' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1.01M15 10h1.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Watch Demo
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="features-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Powerful Features</h2>
            <p className="section-subtitle">
              Powerful features designed to enhance communication and learning outcomes
            </p>
          </div>
          
          <div className="features-grid">
            <div className="feature-card feature-gradient-1">
              <div className="feature-icon-svg icon-messaging"></div>
              <h3 className="feature-title">Smart Messaging</h3>
              <p className="feature-desc">
                Real-time communication with intelligent categorization, file sharing, and conversation threading.
              </p>
            </div>
            
            <div className="feature-card feature-gradient-2">
              <div className="feature-icon-svg icon-ai"></div>
              <h3 className="feature-title">AI-Powered Assistant</h3>
              <p className="feature-desc">
                EduBot provides instant answers, suggests responses, and offers personalized learning recommendations.
              </p>
            </div>
            
            <div className="feature-card feature-gradient-3">
              <div className="feature-icon-svg icon-calendar"></div>
              <h3 className="feature-title">Smart Scheduling</h3>
              <p className="feature-desc">
                Intelligent appointment booking with automatic conflict detection and calendar integration.
              </p>
            </div>
            
            <div className="feature-card feature-gradient-4">
              <div className="feature-icon-svg icon-analytics"></div>
              <h3 className="feature-title">Advanced Analytics</h3>
              <p className="feature-desc">
                Comprehensive dashboards showing engagement metrics, response times, and learning patterns.
              </p>
            </div>
            
            <div className="feature-card feature-gradient-5">
              <div className="feature-icon-svg icon-resources"></div>
              <h3 className="feature-title">Resource Hub</h3>
              <p className="feature-desc">
                Centralized library for course materials, assignments, and collaborative document sharing.
              </p>
            </div>
            
            <div className="feature-card feature-gradient-6">
              <div className="feature-icon-svg icon-mobile"></div>
              <h3 className="feature-title">Mobile First</h3>
              <p className="feature-desc">
                Progressive Web App with offline capabilities, ensuring access anywhere, anytime.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-item">
              <span className="stat-number">50K+</span>
              <span className="stat-label">Active Users</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">1M+</span>
              <span className="stat-label">Messages Sent</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">99.9%</span>
              <span className="stat-label">Uptime</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">500+</span>
              <span className="stat-label">Universities</span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-pattern"></div>
        <div className="container">
          <div className="cta-content">
            <h2 className="cta-title">Ready to Transform Your Educational Experience?</h2>
            <p className="cta-subtitle">
              Join thousands of students and lecturers who are already using EduLink Pro.
            </p>
            <Link href="/register" className="btn btn-cta">
              <svg style={{ width: '1.25rem', height: '1.25rem', marginRight: '0.5rem' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Start Free Trial
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-main">
              <div className="footer-sections">
                <div className="footer-brand">
                  <div className="footer-logo">
                    <div className="logo-icon">
                      <span>E</span>
                    </div>
                    <div className="logo-text">EduLink Pro</div>
                  </div>
                  <p className="footer-desc">
                    Revolutionizing educational communication with AI-powered insights and seamless collaboration tools.
                  </p>
                  <div className="social-links">
                    <a href="#" className="social-link">
                      <div className="social-icon facebook-icon"></div>
                    </a>
                    <a href="#" className="social-link">
                      <div className="social-icon twitter-icon"></div>
                    </a>
                    <a href="#" className="social-link">
                      <div className="social-icon linkedin-icon"></div>
                    </a>
                    <a href="#" className="social-link">
                      <div className="social-icon instagram-icon"></div>
                    </a>
                  </div>
                </div>
                
                <div className="footer-section">
                  <h4 className="footer-title">Product</h4>
                  <ul className="footer-links">
                    <li><a href="#" className="footer-link">Features</a></li>
                    <li><a href="#" className="footer-link">Pricing</a></li>
                    <li><a href="#" className="footer-link">API</a></li>
                    <li><a href="#" className="footer-link">Integrations</a></li>
                  </ul>
                </div>
                
                <div className="footer-section">
                  <h4 className="footer-title">Company</h4>
                  <ul className="footer-links">
                    <li><a href="#" className="footer-link">About</a></li>
                    <li><a href="#" className="footer-link">Blog</a></li>
                    <li><a href="#" className="footer-link">Careers</a></li>
                    <li><a href="#" className="footer-link">Contact</a></li>
                  </ul>
                </div>
                
                <div className="footer-section">
                  <h4 className="footer-title">Support</h4>
                  <ul className="footer-links">
                    <li><a href="#" className="footer-link">Help Center</a></li>
                    <li><a href="#" className="footer-link">Documentation</a></li>
                    <li><a href="#" className="footer-link">Community</a></li>
                    <li><a href="#" className="footer-link">Status</a></li>
                  </ul>
                </div>
                
                <div className="newsletter-section">
                  <h4 className="footer-title">Stay Updated</h4>
                  <p className="newsletter-desc">
                    Get the latest updates and educational insights delivered to your inbox.
                  </p>
                  <form className="newsletter-form" onSubmit={handleNewsletterSubmit}>
                    <div className="newsletter-input-group">
                      <input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="newsletter-input"
                        required
                      />
                      <button type="submit" className="newsletter-btn">
                        <svg style={{ width: '1rem', height: '1rem', marginRight: '0.25rem' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                        </svg>
                        Subscribe
                      </button>
                    </div>
                  </form>
                  <p className="newsletter-privacy">
                    We respect your privacy. Unsubscribe at any time.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="footer-bottom">
              <div className="footer-bottom-content">
                <div className="footer-legal">
                  <p className="footer-copy">
                    © 2025 EduLink Pro. All rights reserved.
                  </p>
                  <div className="footer-legal-links">
                    <a href="#" className="footer-legal-link">Privacy Policy</a>
                    <a href="#" className="footer-legal-link">Terms of Service</a>
                    <a href="#" className="footer-legal-link">Cookie Policy</a>
                  </div>
                </div>
                
                <div className="footer-badges">
                  <div className="security-badges">
                    <div className="badge">
                      <span className="badge-text">
                        <svg style={{ width: '0.875rem', height: '0.875rem', marginRight: '0.25rem', display: 'inline' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                        SSL Secured
                      </span>
                    </div>
                    <div className="badge">
                      <span className="badge-text">
                        <svg style={{ width: '0.875rem', height: '0.875rem', marginRight: '0.25rem', display: 'inline' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                        GDPR Compliant
                      </span>
                    </div>
                    <div className="badge">
                      <span className="badge-text">
                        <svg style={{ width: '0.875rem', height: '0.875rem', marginRight: '0.25rem', display: 'inline' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        SOC 2 Type II
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}