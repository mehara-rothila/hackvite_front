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
      {/* Enhanced Background Layers */}
      <div className="animated-background"></div>
      <div className="noise-overlay"></div>
      
      {/* Wave Background Layers */}
      <div className="wave-layers">
        <div className="wave-layer wave-1"></div>
        <div className="wave-layer wave-2"></div>
        <div className="wave-layer wave-3"></div>
      </div>
      
      {/* Morphing Gradient Orbs */}
      <div className="morphing-orbs">
        <div className="morphing-orb orb-1"></div>
        <div className="morphing-orb orb-2"></div>
        <div className="morphing-orb orb-3"></div>
        <div className="morphing-orb orb-4"></div>
        <div className="morphing-orb orb-5"></div>
      </div>
      
      {/* Enhanced Particle System */}
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
      
      {/* Enhanced Geometric Shapes */}
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
            <div className="logo-text">EduLink Pro</div>
          </div>
          
          <div className="desktop-nav nav-links">
            <Link href="#features" className="nav-link">Features</Link>
            <Link href="#about" className="nav-link">About</Link>
            <Link href="#pricing" className="nav-link">Pricing</Link>
            <Link href="#contact" className="nav-link">Contact</Link>
            <Link href="#login" className="btn btn-primary">Login</Link>
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
                <Link href="#login" className="btn btn-primary" style={{width: '100%'}}>Login</Link>
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
              <Link href="#signup" className="btn btn-hero-primary">
                Start Free Trial 🚀
              </Link>
              <Link href="#demo" className="btn btn-hero-secondary">
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
            <Link href="#signup" className="btn btn-cta">
              Start Free Trial 🚀
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
                    © 2024 EduLink Pro. All rights reserved.
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
                      <span className="badge-text">🔒 SSL Secured</span>
                    </div>
                    <div className="badge">
                      <span className="badge-text">🛡️ GDPR Compliant</span>
                    </div>
                    <div className="badge">
                      <span className="badge-text">✅ SOC 2 Type II</span>
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
