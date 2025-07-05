'use client'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import './styles.css'

export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [email, setEmail] = useState('')

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = e.clientX / window.innerWidth
      const y = e.clientY / window.innerHeight
      
      document.documentElement.style.setProperty('--mouse-x', `${e.clientX}px`)
      document.documentElement.style.setProperty('--mouse-y', `${e.clientY}px`)
      document.documentElement.style.setProperty('--mouse-x-percent', `${x * 100}%`)
      document.documentElement.style.setProperty('--mouse-y-percent', `${y * 100}%`)
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  // Enhanced particle system with multiple types
  const floatingParticles = Array.from({ length: 40 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    animationDelay: Math.random() * 20,
    size: Math.random() * 4 + 2,
    type: 'standard'
  }))

  const glowParticles = Array.from({ length: 15 }, (_, i) => ({
    id: i + 100,
    left: Math.random() * 100,
    animationDelay: Math.random() * 25,
    size: Math.random() * 8 + 4,
    type: 'glow'
  }))

  const morphingOrbs = Array.from({ length: 5 }, (_, i) => ({
    id: i + 200,
    left: Math.random() * 100,
    top: Math.random() * 100,
    animationDelay: Math.random() * 30,
    size: Math.random() * 200 + 100,
  }))

  const features = [
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
          <path d="M13 8H7"/>
          <path d="M17 12H7"/>
        </svg>
      ),
      title: 'Smart Messaging',
      desc: 'Real-time communication with intelligent categorization, file sharing, and conversation threading.',
      gradient: 'feature-gradient-1'
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="18" height="10" rx="2" ry="2"/>
          <circle cx="7" cy="8" r="1"/>
          <path d="M9 8h8"/>
          <path d="M9 12h6"/>
          <path d="M12 16l2 2 4-4"/>
        </svg>
      ),
      title: 'AI Assistant',
      desc: 'EduBot provides instant answers, suggests responses, and offers personalized learning recommendations.',
      gradient: 'feature-gradient-2'
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
          <line x1="16" y1="2" x2="16" y2="6"/>
          <line x1="8" y1="2" x2="8" y2="6"/>
          <line x1="3" y1="10" x2="21" y2="10"/>
          <path d="M8 14h.01"/>
          <path d="M12 14h.01"/>
          <path d="M16 14h.01"/>
          <path d="M8 18h.01"/>
          <path d="M12 18h.01"/>
        </svg>
      ),
      title: 'Smart Scheduling',
      desc: 'Intelligent appointment booking with automatic conflict detection and calendar integration.',
      gradient: 'feature-gradient-3'
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="18" y1="20" x2="18" y2="10"/>
          <line x1="12" y1="20" x2="12" y2="4"/>
          <line x1="6" y1="20" x2="6" y2="14"/>
          <circle cx="18" cy="7" r="3"/>
          <circle cx="6" cy="11" r="3"/>
          <circle cx="12" cy="1" r="3"/>
        </svg>
      ),
      title: 'Analytics & Insights',
      desc: 'Comprehensive dashboards showing engagement metrics, response times, and learning patterns.',
      gradient: 'feature-gradient-4'
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
          <polyline points="14,2 14,8 20,8"/>
          <line x1="16" y1="13" x2="8" y2="13"/>
          <line x1="16" y1="17" x2="8" y2="17"/>
          <polyline points="10,9 9,9 8,9"/>
        </svg>
      ),
      title: 'Resource Management',
      desc: 'Centralized library for course materials, assignments, and collaborative document sharing.',
      gradient: 'feature-gradient-5'
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
          <line x1="8" y1="21" x2="16" y2="21"/>
          <line x1="12" y1="17" x2="12" y2="21"/>
          <circle cx="12" cy="10" r="2"/>
          <path d="M8 10h.01"/>
          <path d="M16 10h.01"/>
        </svg>
      ),
      title: 'Mobile-First Design',
      desc: 'Progressive Web App with offline capabilities, ensuring access anywhere, anytime.',
      gradient: 'feature-gradient-6'
    }
  ]

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Newsletter signup:', email)
    setEmail('')
  }

  return (
    <div className="main-container">
      {/* Enhanced Animated Background */}
      <div className="animated-background"></div>
      
      {/* Noise Texture Overlay */}
      <div className="noise-overlay"></div>
      
      {/* Wave Background Layers */}
      <div className="wave-layers">
        <div className="wave-layer wave-1"></div>
        <div className="wave-layer wave-2"></div>
        <div className="wave-layer wave-3"></div>
      </div>

      {/* Morphing Gradient Orbs */}
      <div className="morphing-orbs">
        {morphingOrbs.map((orb) => (
          <div
            key={orb.id}
            className="morphing-orb"
            style={{
              left: `${orb.left}%`,
              top: `${orb.top}%`,
              width: `${orb.size}px`,
              height: `${orb.size}px`,
              animationDelay: `${orb.animationDelay}s`,
            }}
          />
        ))}
      </div>
      
      {/* Enhanced Floating Particles */}
      <div className="particles-container">
        {floatingParticles.map((particle) => (
          <div
            key={particle.id}
            className={`particle particle-${particle.type}`}
            style={{
              left: `${particle.left}%`,
              animationDelay: `${particle.animationDelay}s`,
              animationDuration: `${15 + Math.random() * 10}s`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
            }}
          />
        ))}
        {glowParticles.map((particle) => (
          <div
            key={particle.id}
            className={`particle particle-${particle.type}`}
            style={{
              left: `${particle.left}%`,
              animationDelay: `${particle.animationDelay}s`,
              animationDuration: `${20 + Math.random() * 15}s`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
            }}
          />
        ))}
      </div>

      {/* Enhanced Geometric Shapes with Parallax */}
      <div className="geometric-shapes">
        <div className="shape-layer layer-1">
          <div className="shape shape-1" style={{ animationDuration: '20s' }}></div>
          <div className="shape shape-2" style={{ animationDuration: '25s' }}></div>
          <div className="shape shape-3" style={{ animationDuration: '30s' }}></div>
        </div>
        <div className="shape-layer layer-2">
          <div className="shape shape-4" style={{ animationDuration: '35s' }}></div>
          <div className="shape shape-5" style={{ animationDuration: '40s' }}></div>
        </div>
        <div className="shape-layer layer-3">
          <div className="shape shape-6" style={{ animationDuration: '45s' }}></div>
          <div className="shape shape-7" style={{ animationDuration: '22s' }}></div>
          <div className="shape shape-8" style={{ animationDuration: '28s' }}></div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="navbar">
        <div className="nav-container">
          <div className="logo-container">
            <div className="logo-icon">
              <span>E</span>
            </div>
            <span className="logo-text">EduLink Pro</span>
          </div>
          
          <div className="desktop-nav nav-links">
            <Link href="#features" className="nav-link">Features</Link>
            <Link href="#pricing" className="nav-link">Pricing</Link>
            <Link href="#about" className="nav-link">About</Link>
            <Link href="#contact" className="nav-link">Contact</Link>
            <Link href="/login" className="btn btn-primary">Get Started</Link>
          </div>
          
          <button 
            className="mobile-only mobile-menu-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                    d={mobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </button>
        </div>
        
        {mobileMenuOpen && (
          <div className="mobile-nav">
            <div className="mobile-nav-content">
              <Link href="#features" className="mobile-nav-link">Features</Link>
              <Link href="#pricing" className="mobile-nav-link">Pricing</Link>
              <Link href="#about" className="mobile-nav-link">About</Link>
              <Link href="#contact" className="mobile-nav-link">Contact</Link>
              <div className="mobile-cta">
                <Link href="/login" className="btn btn-primary" style={{ width: '100%' }}>Get Started</Link>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title">
              Revolutionize Educational <span className="highlight">Communication</span>
            </h1>
            <p className="hero-subtitle">
              EduLink Pro revolutionizes educational communication with AI-powered insights, 
              seamless messaging, smart scheduling, and collaborative learning tools.
            </p>
            <div className="hero-buttons">
              <Link href="/register" className="btn btn-hero-primary">
                Start Free Trial
              </Link>
              <Link href="#features" className="btn btn-hero-secondary">
                Explore Features
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
            {features.map((feature, index) => (
              <div key={index} className={`feature-card ${feature.gradient}`}>
                <div className="feature-icon-svg">{feature.icon}</div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-desc">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-number">10,000+</div>
              <div className="stat-label">Active Students</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">500+</div>
              <div className="stat-label">Lecturers</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">98%</div>
              <div className="stat-label">Satisfaction Rate</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">24/7</div>
              <div className="stat-label">AI Support</div>
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
              Start Free Trial 🚀
            </Link>
          </div>
        </div>
      </section>

      {/* Enhanced Mobile Responsive Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            {/* Main Footer Content */}
            <div className="footer-main">
              <div className="footer-sections">
                {/* Company Info */}
                <div className="footer-section footer-brand">
                  <div className="footer-logo">
                    <div className="logo-icon">
                      <span>E</span>
                    </div>
                    <span className="logo-text">EduLink Pro</span>
                  </div>
                  <p className="footer-desc">
                    Revolutionizing educational communication with AI-powered insights, 
                    seamless messaging, and smart collaboration tools.
                  </p>
                  <div className="social-links">
                    <a href="#" className="social-link" aria-label="Facebook">
                      <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                      </svg>
                    </a>
                    <a href="#" className="social-link" aria-label="Twitter">
                      <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                      </svg>
                    </a>
                    <a href="#" className="social-link" aria-label="LinkedIn">
                      <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                    </a>
                    <a href="#" className="social-link" aria-label="Instagram">
                      <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                      </svg>
                    </a>
                  </div>
                </div>

                {/* Product Links */}
                <div className="footer-section">
                  <h4 className="footer-title">Product</h4>
                  <ul className="footer-links">
                    <li><a href="#features" className="footer-link">Features</a></li>
                    <li><a href="#pricing" className="footer-link">Pricing</a></li>
                    <li><a href="#integrations" className="footer-link">Integrations</a></li>
                    <li><a href="#api" className="footer-link">API</a></li>
                    <li><a href="#mobile" className="footer-link">Mobile App</a></li>
                    <li><a href="#security" className="footer-link">Security</a></li>
                  </ul>
                </div>

                {/* Solutions */}
                <div className="footer-section">
                  <h4 className="footer-title">Solutions</h4>
                  <ul className="footer-links">
                    <li><a href="#students" className="footer-link">For Students</a></li>
                    <li><a href="#lecturers" className="footer-link">For Lecturers</a></li>
                    <li><a href="#institutions" className="footer-link">For Institutions</a></li>
                    <li><a href="#administrators" className="footer-link">For Administrators</a></li>
                    <li><a href="#enterprise" className="footer-link">Enterprise</a></li>
                    <li><a href="#case-studies" className="footer-link">Case Studies</a></li>
                  </ul>
                </div>

                {/* Resources */}
                <div className="footer-section">
                  <h4 className="footer-title">Resources</h4>
                  <ul className="footer-links">
                    <li><a href="#blog" className="footer-link">Blog</a></li>
                    <li><a href="#help" className="footer-link">Help Center</a></li>
                    <li><a href="#guides" className="footer-link">User Guides</a></li>
                    <li><a href="#webinars" className="footer-link">Webinars</a></li>
                    <li><a href="#community" className="footer-link">Community</a></li>
                    <li><a href="#status" className="footer-link">System Status</a></li>
                  </ul>
                </div>

                {/* Newsletter */}
                <div className="footer-section newsletter-section">
                  <h4 className="footer-title">Stay Updated</h4>
                  <p className="newsletter-desc">
                    Get the latest updates on new features, educational insights, and platform improvements.
                  </p>
                  <form className="newsletter-form" onSubmit={handleNewsletterSubmit}>
                    <div className="newsletter-input-group">
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        className="newsletter-input"
                        required
                      />
                      <button type="submit" className="newsletter-btn">
                        Subscribe
                      </button>
                    </div>
                  </form>
                  <p className="newsletter-privacy">
                    We respect your privacy. Unsubscribe anytime.
                  </p>
                </div>
              </div>
            </div>

            {/* Footer Bottom */}
            <div className="footer-bottom">
              <div className="footer-bottom-content">
                <div className="footer-legal">
                  <p className="footer-copy">
                    © 2025 EduLink Pro. All rights reserved.
                  </p>
                  <div className="footer-legal-links">
                    <a href="#privacy" className="footer-legal-link">Privacy Policy</a>
                    <a href="#terms" className="footer-legal-link">Terms of Service</a>
                    <a href="#cookies" className="footer-legal-link">Cookie Policy</a>
                    <a href="#gdpr" className="footer-legal-link">GDPR</a>
                  </div>
                </div>
                <div className="footer-badges">
                  <div className="security-badges">
                    <div className="badge">
                      <span className="badge-text">🔒 SOC 2 Certified</span>
                    </div>
                    <div className="badge">
                      <span className="badge-text">🛡️ GDPR Compliant</span>
                    </div>
                    <div className="badge">
                      <span className="badge-text">✅ ISO 27001</span>
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
