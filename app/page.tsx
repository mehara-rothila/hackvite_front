'use client'
import Link from 'next/link'
import { useState } from 'react'
import './styles.css'

export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [email, setEmail] = useState('')

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Newsletter signup:', email)
    setEmail('')
  }

  return (
    <div className="main-container">
      {/* Background Elements */}
      <div className="animated-background"></div>
      <div className="noise-overlay"></div>
      <div className="wave-layers">
        <div className="wave-layer wave-1"></div>
        <div className="wave-layer wave-2"></div>
        <div className="wave-layer wave-3"></div>
      </div>
      <div className="morphing-orbs">
        <div className="morphing-orb orb-1"></div>
        <div className="morphing-orb orb-2"></div>
        <div className="morphing-orb orb-3"></div>
        <div className="morphing-orb orb-4"></div>
        <div className="morphing-orb orb-5"></div>
      </div>
      <div className="particles-container">
        <div className="particle particle-standard p1"></div>
        <div className="particle particle-standard p2"></div>
        <div className="particle particle-standard p3"></div>
        <div className="particle particle-standard p4"></div>
        <div className="particle particle-standard p5"></div>
        <div className="particle particle-glow g1"></div>
        <div className="particle particle-glow g2"></div>
        <div className="particle particle-glow g3"></div>
      </div>
      <div className="geometric-shapes">
        <div className="shape-layer layer-1">
          <div className="shape shape-1"></div>
          <div className="shape shape-2"></div>
          <div className="shape shape-3"></div>
        </div>
        <div className="shape-layer layer-2">
          <div className="shape shape-4"></div>
          <div className="shape shape-5"></div>
        </div>
        <div className="shape-layer layer-3">
          <div className="shape shape-6"></div>
          <div className="shape shape-7"></div>
          <div className="shape shape-8"></div>
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
                <Link href="/login" className="btn btn-primary">Get Started</Link>
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
            <div className="feature-card feature-gradient-1">
              <div className="feature-icon-svg icon-messaging"></div>
              <h3 className="feature-title">Smart Messaging</h3>
              <p className="feature-desc">Real-time communication with intelligent categorization, file sharing, and conversation threading.</p>
            </div>
            <div className="feature-card feature-gradient-2">
              <div className="feature-icon-svg icon-ai"></div>
              <h3 className="feature-title">AI Assistant</h3>
              <p className="feature-desc">EduBot provides instant answers, suggests responses, and offers personalized learning recommendations.</p>
            </div>
            <div className="feature-card feature-gradient-3">
              <div className="feature-icon-svg icon-calendar"></div>
              <h3 className="feature-title">Smart Scheduling</h3>
              <p className="feature-desc">Intelligent appointment booking with automatic conflict detection and calendar integration.</p>
            </div>
            <div className="feature-card feature-gradient-4">
              <div className="feature-icon-svg icon-analytics"></div>
              <h3 className="feature-title">Analytics & Insights</h3>
              <p className="feature-desc">Comprehensive dashboards showing engagement metrics, response times, and learning patterns.</p>
            </div>
            <div className="feature-card feature-gradient-5">
              <div className="feature-icon-svg icon-resources"></div>
              <h3 className="feature-title">Resource Management</h3>
              <p className="feature-desc">Centralized library for course materials, assignments, and collaborative document sharing.</p>
            </div>
            <div className="feature-card feature-gradient-6">
              <div className="feature-icon-svg icon-mobile"></div>
              <h3 className="feature-title">Mobile-First Design</h3>
              <p className="feature-desc">Progressive Web App with offline capabilities, ensuring access anywhere, anytime.</p>
            </div>
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

      {/* Enhanced Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-main">
              <div className="footer-sections">
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
                      <div className="social-icon facebook-icon"></div>
                    </a>
                    <a href="#" className="social-link" aria-label="Twitter">
                      <div className="social-icon twitter-icon"></div>
                    </a>
                    <a href="#" className="social-link" aria-label="LinkedIn">
                      <div className="social-icon linkedin-icon"></div>
                    </a>
                    <a href="#" className="social-link" aria-label="Instagram">
                      <div className="social-icon instagram-icon"></div>
                    </a>
                  </div>
                </div>

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
