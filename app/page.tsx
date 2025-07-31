'use client'
import Link from 'next/link'
import { useState, useEffect } from 'react'

export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [email, setEmail] = useState('')

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Newsletter signup:', email)
    setEmail('')
  }

  return (
    <>
      <style jsx global>{`
        /* EduLink Pro - Complete Styling System */

        /* ===== RESET & BASE STYLES ===== */
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          line-height: 1.6;
          color: #374151;
          overflow-x: hidden;
        }

        /* ===== MAIN CONTAINER ===== */
        .main-container {
          min-height: 100vh;
          position: relative;
          background: linear-gradient(135deg, #EBF8FF 0%, #F3E8FF 50%, #FDF2F8 100%);
          overflow-x: hidden;
        }

        /* ===== ALL ANIMATION KEYFRAMES ===== */

        /* Mesh drift animations */
        @keyframes mesh-drift-1 {
          0%, 100% { transform: rotate(0deg) scale(1) translate(0, 0); }
          33% { transform: rotate(120deg) scale(1.1) translate(20px, -20px); }
          66% { transform: rotate(240deg) scale(0.9) translate(-20px, 20px); }
        }

        @keyframes mesh-drift-2 {
          0%, 100% { transform: rotate(0deg) scale(1) translate(0, 0); }
          25% { transform: rotate(90deg) scale(1.2) translate(-30px, 10px); }
          50% { transform: rotate(180deg) scale(0.8) translate(10px, -30px); }
          75% { transform: rotate(270deg) scale(1.1) translate(20px, 20px); }
        }

        @keyframes mesh-drift-3 {
          0%, 100% { transform: rotate(0deg) scale(1) translate(0, 0); }
          50% { transform: rotate(180deg) scale(1.3) translate(-10px, 10px); }
        }

        @keyframes mesh-drift-4 {
          0%, 100% { transform: rotate(0deg) scale(1) translate(0, 0); }
          25% { transform: rotate(90deg) scale(1.1) translate(15px, -15px); }
          50% { transform: rotate(180deg) scale(0.9) translate(-15px, -15px); }
          75% { transform: rotate(270deg) scale(1.05) translate(-15px, 15px); }
        }

        /* Equation float animations */
        @keyframes equation-float-1 {
          0%, 100% { transform: translateY(0px) translateX(0px) rotate(0deg); opacity: 0.8; }
          25% { transform: translateY(-30px) translateX(20px) rotate(5deg); opacity: 1; }
          50% { transform: translateY(-15px) translateX(40px) rotate(-3deg); opacity: 0.7; }
          75% { transform: translateY(-25px) translateX(10px) rotate(7deg); opacity: 0.9; }
        }

        @keyframes equation-float-2 {
          0%, 100% { transform: translateY(0px) translateX(0px) rotate(0deg); opacity: 0.8; }
          33% { transform: translateY(-40px) translateX(-30px) rotate(-8deg); opacity: 1; }
          66% { transform: translateY(-20px) translateX(-15px) rotate(5deg); opacity: 0.7; }
        }

        @keyframes equation-float-3 {
          0%, 100% { transform: translateY(0px) translateX(0px) rotate(0deg); opacity: 0.8; }
          50% { transform: translateY(-35px) translateX(25px) rotate(-10deg); opacity: 1; }
        }

        @keyframes equation-float-4 {
          0%, 100% { transform: translateY(0px) translateX(0px) rotate(0deg); opacity: 0.8; }
          20% { transform: translateY(-25px) translateX(15px) rotate(4deg); opacity: 1; }
          40% { transform: translateY(-45px) translateX(-10px) rotate(-6deg); opacity: 0.7; }
          60% { transform: translateY(-30px) translateX(30px) rotate(8deg); opacity: 0.9; }
          80% { transform: translateY(-15px) translateX(-20px) rotate(-3deg); opacity: 0.8; }
        }

        /* Particle drift animations */
        @keyframes particle-drift-1 {
          0%, 100% { transform: translateY(0px) translateX(0px) rotate(0deg); opacity: 0.6; }
          25% { transform: translateY(-120px) translateX(80px) rotate(90deg); opacity: 0.9; }
          50% { transform: translateY(-80px) translateX(160px) rotate(180deg); opacity: 0.7; }
          75% { transform: translateY(-200px) translateX(40px) rotate(270deg); opacity: 1; }
        }

        @keyframes particle-drift-2 {
          0%, 100% { transform: translateY(0px) translateX(0px) rotate(0deg); opacity: 0.5; }
          33% { transform: translateY(-100px) translateX(-60px) rotate(120deg); opacity: 0.8; }
          66% { transform: translateY(-160px) translateX(120px) rotate(240deg); opacity: 0.6; }
        }

        @keyframes particle-drift-3 {
          0%, 100% { transform: translateY(0px) translateX(0px) rotate(0deg); opacity: 0.7; }
          50% { transform: translateY(-250px) translateX(-40px) rotate(180deg); opacity: 0.3; }
        }

        @keyframes particle-drift-4 {
          0%, 100% { transform: translateY(0px) translateX(0px) rotate(0deg); opacity: 0.8; }
          25% { transform: translateY(-80px) translateX(100px) rotate(90deg); opacity: 0.4; }
          75% { transform: translateY(-180px) translateX(-80px) rotate(270deg); opacity: 0.9; }
        }

        /* Glass float animations */
        @keyframes glass-float-1 {
          0%, 100% { transform: translate(0, 0) rotate(0deg) scale(1); }
          25% { transform: translate(30px, -50px) rotate(90deg) scale(1.1); }
          50% { transform: translate(-20px, -30px) rotate(180deg) scale(0.9); }
          75% { transform: translate(-40px, 40px) rotate(270deg) scale(1.05); }
        }

        @keyframes glass-float-2 {
          0%, 100% { transform: translate(0, 0) rotate(0deg) scale(1); }
          33% { transform: translate(-60px, 40px) rotate(120deg) scale(1.2); }
          66% { transform: translate(40px, -60px) rotate(240deg) scale(0.8); }
        }

        @keyframes glass-float-3 {
          0%, 100% { transform: translate(0, 0) rotate(0deg) scale(1); }
          20% { transform: translate(40px, -20px) rotate(72deg) scale(1.1); }
          40% { transform: translate(-30px, -40px) rotate(144deg) scale(0.9); }
          60% { transform: translate(-50px, 30px) rotate(216deg) scale(1.15); }
          80% { transform: translate(20px, 50px) rotate(288deg) scale(0.95); }
        }

        @keyframes glass-float-4 {
          0%, 100% { transform: translate(0, 0) rotate(0deg) scale(1); }
          50% { transform: translate(-30px, -30px) rotate(180deg) scale(1.3); }
        }

        @keyframes bubble-drift-1 {
          0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.7; }
          25% { transform: translate(60px, -80px) scale(1.2); opacity: 0.9; }
          50% { transform: translate(-40px, -60px) scale(0.8); opacity: 0.5; }
          75% { transform: translate(-80px, 40px) scale(1.1); opacity: 0.8; }
        }

        @keyframes bubble-drift-2 {
          0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.6; }
          33% { transform: translate(-70px, 60px) scale(1.3); opacity: 1; }
          66% { transform: translate(50px, -50px) scale(0.7); opacity: 0.4; }
        }

        @keyframes bubble-drift-3 {
          0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.8; }
          50% { transform: translate(30px, 70px) scale(1.4); opacity: 0.3; }
        }

        @keyframes text-glow {
          0%, 100% { 
            filter: drop-shadow(0 0 10px rgba(59, 130, 246, 0.5)) drop-shadow(0 0 20px rgba(168, 85, 247, 0.3));
          }
          50% { 
            filter: drop-shadow(0 0 15px rgba(59, 130, 246, 0.8)) drop-shadow(0 0 30px rgba(168, 85, 247, 0.5));
          }
        }

        /* Floating icon animations */
        @keyframes float { 
          0% { transform: translateY(0) rotate(0deg); } 
          50% { transform: translateY(-15px) rotate(5deg); } 
          100% { transform: translateY(0) rotate(0deg); } 
        }
        @keyframes float-reverse { 
          0% { transform: translateY(0) rotate(0deg); } 
          50% { transform: translateY(15px) rotate(-5deg); } 
          100% { transform: translateY(0) rotate(0deg); } 
        }

        .floating-icon { animation: float 6s ease-in-out infinite; }
        .floating-icon-reverse { animation: float-reverse 7s ease-in-out infinite; }
        .floating-icon-slow { animation: float 10s ease-in-out infinite; }

        .animate-mesh-drift-1 { animation: mesh-drift-1 20s ease-in-out infinite; }
        .animate-mesh-drift-2 { animation: mesh-drift-2 25s ease-in-out infinite; }
        .animate-mesh-drift-3 { animation: mesh-drift-3 18s ease-in-out infinite; }
        .animate-mesh-drift-4 { animation: mesh-drift-4 22s ease-in-out infinite; }

        .animate-equation-float-1 { animation: equation-float-1 12s ease-in-out infinite; }
        .animate-equation-float-2 { animation: equation-float-2 15s ease-in-out infinite; }
        .animate-equation-float-3 { animation: equation-float-3 10s ease-in-out infinite; }
        .animate-equation-float-4 { animation: equation-float-4 18s ease-in-out infinite; }

        .animate-particle-drift-1 { animation: particle-drift-1 10s ease-in-out infinite; }
        .animate-particle-drift-2 { animation: particle-drift-2 12s ease-in-out infinite; }
        .animate-particle-drift-3 { animation: particle-drift-3 8s ease-in-out infinite; }
        .animate-particle-drift-4 { animation: particle-drift-4 14s ease-in-out infinite; }

        .animate-glass-float-1 { animation: glass-float-1 20s ease-in-out infinite; }
        .animate-glass-float-2 { animation: glass-float-2 25s ease-in-out infinite; }
        .animate-glass-float-3 { animation: glass-float-3 18s ease-in-out infinite; }
        .animate-glass-float-4 { animation: glass-float-4 22s ease-in-out infinite; }

        .animate-bubble-drift-1 { animation: bubble-drift-1 15s ease-in-out infinite; }
        .animate-bubble-drift-2 { animation: bubble-drift-2 18s ease-in-out infinite; }
        .animate-bubble-drift-3 { animation: bubble-drift-3 12s ease-in-out infinite; }

        /* Enhanced Glassmorphism utilities */
        .backdrop-blur-xl {
          backdrop-filter: blur(24px);
        }

        .backdrop-blur-lg {
          backdrop-filter: blur(16px);
        }

        .backdrop-blur-sm {
          backdrop-filter: blur(8px);
        }

        /* ===== NAVBAR STYLES ===== */
        .navbar {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 1000;
          backdrop-filter: blur(20px);
          background: rgba(255, 255, 255, 0.8);
          border-bottom: 1px solid rgba(255, 255, 255, 0.2);
          box-shadow: 0 4px 24px rgba(0, 0, 0, 0.1);
        }

        .nav-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 1rem 2rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .logo-container {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .logo-icon {
          width: 2.5rem;
          height: 2.5rem;
          background: linear-gradient(135deg, #3B82F6, #8B5CF6);
          border-radius: 0.75rem;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
          color: white;
          font-size: 1.25rem;
          box-shadow: 0 4px 20px rgba(59, 130, 246, 0.3);
        }

        .logo-text {
          font-size: 1.5rem;
          font-weight: bold;
          background: linear-gradient(135deg, #3B82F6, #8B5CF6);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .nav-links {
          display: flex;
          align-items: center;
          gap: 2rem;
        }

        .nav-link {
          color: #374151;
          text-decoration: none;
          font-weight: 500;
          transition: all 0.3s ease;
          position: relative;
        }

        .nav-link:hover {
          color: #3B82F6;
        }

        .nav-link::after {
          content: '';
          position: absolute;
          bottom: -4px;
          left: 0;
          width: 0;
          height: 2px;
          background: linear-gradient(135deg, #3B82F6, #8B5CF6);
          transition: width 0.3s ease;
        }

        .nav-link:hover::after {
          width: 100%;
        }

        .mobile-menu-btn {
          display: none;
          background: none;
          border: none;
          font-size: 1.5rem;
          color: #374151;
          cursor: pointer;
          width: 2rem;
          height: 2rem;
        }

        .mobile-nav {
          position: absolute;
          top: 100%;
          left: 0;
          right: 0;
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(255, 255, 255, 0.2);
          box-shadow: 0 4px 24px rgba(0, 0, 0, 0.1);
        }

        .mobile-nav-content {
          padding: 1rem 2rem;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .mobile-nav-link {
          color: #374151;
          text-decoration: none;
          font-weight: 500;
          padding: 0.75rem 0;
          border-bottom: 1px solid rgba(229, 231, 235, 0.5);
          transition: color 0.3s ease;
        }

        .mobile-nav-link:hover {
          color: #3B82F6;
        }

        .mobile-cta {
          margin-top: 1rem;
        }

        /* ===== BUTTON STYLES ===== */
        .btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 0.75rem 1.5rem;
          border-radius: 0.75rem;
          font-weight: 600;
          text-decoration: none;
          transition: all 0.3s ease;
          border: none;
          cursor: pointer;
          font-size: 0.95rem;
          position: relative;
          overflow: hidden;
        }

        .btn-primary {
          background: linear-gradient(135deg, #3B82F6, #8B5CF6);
          color: white;
          box-shadow: 0 4px 20px rgba(59, 130, 246, 0.3);
        }

        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 25px rgba(59, 130, 246, 0.4);
        }

        .btn-hero-primary {
          background: linear-gradient(135deg, #3B82F6, #8B5CF6, #EC4899);
          color: white;
          padding: 1rem 2rem;
          font-size: 1.1rem;
          border-radius: 1rem;
          box-shadow: 0 8px 30px rgba(59, 130, 246, 0.4);
        }

        .btn-hero-primary:hover {
          transform: translateY(-3px);
          box-shadow: 0 12px 35px rgba(59, 130, 246, 0.5);
        }

        .btn-hero-secondary {
          background: rgba(255, 255, 255, 0.8);
          color: #374151;
          padding: 1rem 2rem;
          font-size: 1.1rem;
          border-radius: 1rem;
          border: 2px solid rgba(59, 130, 246, 0.2);
          backdrop-filter: blur(10px);
        }

        .btn-hero-secondary:hover {
          background: rgba(255, 255, 255, 0.9);
          border-color: rgba(59, 130, 246, 0.4);
          transform: translateY(-2px);
        }

        .btn-cta {
          background: linear-gradient(135deg, #3B82F6, #8B5CF6, #EC4899);
          color: white;
          padding: 1.25rem 2.5rem;
          font-size: 1.2rem;
          border-radius: 1rem;
          box-shadow: 0 8px 30px rgba(59, 130, 246, 0.4);
        }

        .btn-cta:hover {
          transform: translateY(-3px);
          box-shadow: 0 12px 35px rgba(59, 130, 246, 0.5);
        }

        /* ===== HERO SECTION ===== */
        .hero-section {
          min-height: 100vh;
          display: flex;
          align-items: center;
          position: relative;
          z-index: 100;
          padding-top: 5rem;
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 2rem;
        }

        .hero-content {
          text-align: center;
          max-width: 800px;
          margin: 0 auto;
        }

        .hero-title {
          font-size: 4rem;
          font-weight: 800;
          color: #1F2937;
          margin-bottom: 1.5rem;
          line-height: 1.1;
          position: relative;
        }

        .hero-title .highlight {
          background: linear-gradient(135deg, #3B82F6, #8B5CF6, #EC4899);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: text-glow 3s ease-in-out infinite;
        }

        .hero-subtitle {
          font-size: 1.25rem;
          color: #6B7280;
          margin-bottom: 2.5rem;
          line-height: 1.6;
          max-width: 600px;
          margin-left: auto;
          margin-right: auto;
        }

        .hero-buttons {
          display: flex;
          gap: 1.5rem;
          justify-content: center;
          flex-wrap: wrap;
        }

        /* ===== FEATURES SECTION ===== */
        .features-section {
          padding: 8rem 0;
          position: relative;
          z-index: 100;
          background: rgba(255, 255, 255, 0.5);
          backdrop-filter: blur(10px);
        }

        .section-header {
          text-align: center;
          margin-bottom: 4rem;
        }

        .section-title {
          font-size: 3rem;
          font-weight: 800;
          color: #1F2937;
          margin-bottom: 1rem;
        }

        .section-subtitle {
          font-size: 1.2rem;
          color: #6B7280;
          max-width: 600px;
          margin: 0 auto;
        }

        .features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          gap: 2rem;
          margin-top: 3rem;
        }

        .feature-card {
          padding: 2.5rem;
          border-radius: 1.5rem;
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.3);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }

        .feature-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
        }

        .feature-gradient-1 { background: linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(147, 197, 253, 0.05)); }
        .feature-gradient-2 { background: linear-gradient(135deg, rgba(168, 85, 247, 0.1), rgba(196, 181, 253, 0.05)); }
        .feature-gradient-3 { background: linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(110, 231, 183, 0.05)); }
        .feature-gradient-4 { background: linear-gradient(135deg, rgba(245, 158, 11, 0.1), rgba(251, 191, 36, 0.05)); }
        .feature-gradient-5 { background: linear-gradient(135deg, rgba(239, 68, 68, 0.1), rgba(252, 165, 165, 0.05)); }
        .feature-gradient-6 { background: linear-gradient(135deg, rgba(6, 182, 212, 0.1), rgba(103, 232, 249, 0.05)); }

        .feature-icon-svg {
          width: 3rem;
          height: 3rem;
          margin-bottom: 1.5rem;
          border-radius: 0.75rem;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
        }

        /* SVG Icon Styles */
        .icon-messaging {
          background: linear-gradient(135deg, #3B82F6, #1E40AF);
        }

        .icon-messaging::before {
          content: '';
          position: absolute;
          width: 1.5rem;
          height: 1.5rem;
          background: white;
          clip-path: polygon(20% 0%, 80% 0%, 100% 40%, 80% 100%, 20% 100%, 0% 40%);
        }

        .icon-ai {
          background: linear-gradient(135deg, #8B5CF6, #7C3AED);
        }

        .icon-ai::before {
          content: '';
          position: absolute;
          width: 1.5rem;
          height: 1.5rem;
          background: white;
          border-radius: 50%;
          box-shadow: inset 0.25rem 0.25rem 0 rgba(139, 92, 246, 0.8);
        }

        .icon-calendar {
          background: linear-gradient(135deg, #10B981, #059669);
        }

        .icon-calendar::before {
          content: '';
          position: absolute;
          width: 1.2rem;
          height: 1.2rem;
          background: white;
          border-radius: 0.2rem;
          border: 2px solid rgba(16, 185, 129, 0.8);
        }

        .icon-analytics {
          background: linear-gradient(135deg, #F59E0B, #D97706);
        }

        .icon-analytics::before {
          content: '';
          position: absolute;
          width: 1.5rem;
          height: 1.5rem;
          background: white;
          clip-path: polygon(0 100%, 25% 60%, 50% 80%, 75% 40%, 100% 60%, 100% 100%);
        }

        .icon-resources {
          background: linear-gradient(135deg, #EF4444, #DC2626);
        }

        .icon-resources::before {
          content: '';
          position: absolute;
          width: 1.2rem;
          height: 1.5rem;
          background: white;
          border-radius: 0.2rem 0.2rem 0 0;
          border-bottom: 0.3rem solid rgba(239, 68, 68, 0.8);
        }

        .icon-mobile {
          background: linear-gradient(135deg, #06B6D4, #0891B2);
        }

        .icon-mobile::before {
          content: '';
          position: absolute;
          width: 0.8rem;
          height: 1.4rem;
          background: white;
          border-radius: 0.15rem;
          border: 2px solid rgba(6, 182, 212, 0.8);
        }

        .feature-title {
          font-size: 1.5rem;
          font-weight: 700;
          color: #1F2937;
          margin-bottom: 1rem;
        }

        .feature-desc {
          color: #6B7280;
          line-height: 1.6;
          font-size: 1rem;
        }

        /* ===== STATS SECTION ===== */
        .stats-section {
          padding: 6rem 0;
          position: relative;
          z-index: 100;
          background: rgba(255, 255, 255, 0.3);
          backdrop-filter: blur(20px);
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 3rem;
        }

        .stat-item {
          text-align: center;
          padding: 2rem;
          border-radius: 1rem;
          background: rgba(255, 255, 255, 0.6);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.3);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
        }

        .stat-number {
          display: block;
          font-size: 3rem;
          font-weight: 800;
          background: linear-gradient(135deg, #3B82F6, #8B5CF6);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 0.5rem;
        }

        .stat-label {
          color: #6B7280;
          font-weight: 600;
          font-size: 1.1rem;
        }

        /* ===== CTA SECTION ===== */
        .cta-section {
          padding: 8rem 0;
          position: relative;
          z-index: 100;
          background: linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(168, 85, 247, 0.1));
          backdrop-filter: blur(20px);
        }

        .cta-pattern {
          position: absolute;
          inset: 0;
          background-image: radial-gradient(circle at 1px 1px, rgba(59, 130, 246, 0.2) 1px, transparent 0);
          background-size: 20px 20px;
          opacity: 0.3;
        }

        .cta-content {
          text-align: center;
          position: relative;
          z-index: 1;
        }

        .cta-title {
          font-size: 3rem;
          font-weight: 800;
          color: #1F2937;
          margin-bottom: 1.5rem;
        }

        .cta-subtitle {
          font-size: 1.3rem;
          color: #6B7280;
          margin-bottom: 2.5rem;
          max-width: 600px;
          margin-left: auto;
          margin-right: auto;
        }

        /* ===== FOOTER ===== */
        .footer {
          background: rgba(255, 255, 255, 0.8);
          backdrop-filter: blur(20px);
          border-top: 1px solid rgba(255, 255, 255, 0.2);
          position: relative;
          z-index: 100;
        }

        .footer-content {
          padding: 4rem 0 2rem;
        }

        .footer-sections {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr 1fr 1.5fr;
          gap: 3rem;
        }

        .footer-brand {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .footer-logo {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 1rem;
        }

        .footer-desc {
          color: #6B7280;
          line-height: 1.6;
          margin-bottom: 1.5rem;
        }

        .social-links {
          display: flex;
          gap: 1rem;
        }

        .social-link {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 2.5rem;
          height: 2.5rem;
          border-radius: 0.5rem;
          background: rgba(255, 255, 255, 0.8);
          border: 1px solid rgba(59, 130, 246, 0.2);
          transition: all 0.3s ease;
          text-decoration: none;
        }

        .social-link:hover {
          background: rgba(59, 130, 246, 0.1);
          border-color: rgba(59, 130, 246, 0.4);
          transform: translateY(-2px);
        }

        .social-icon {
          width: 1.2rem;
          height: 1.2rem;
          background: #6B7280;
        }

        .facebook-icon {
          clip-path: polygon(0 0, 60% 0, 60% 35%, 85% 35%, 85% 65%, 60% 65%, 60% 100%, 25% 100%, 25% 65%, 0 65%);
        }

        .twitter-icon {
          clip-path: polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%);
        }

        .linkedin-icon {
          clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
        }

        .instagram-icon {
          clip-path: circle(40% at 50% 50%);
        }

        .footer-section {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .footer-title {
          font-weight: 700;
          color: #1F2937;
          margin-bottom: 0.5rem;
        }

        .footer-links {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .footer-link {
          color: #6B7280;
          text-decoration: none;
          transition: color 0.3s ease;
        }

        .footer-link:hover {
          color: #3B82F6;
        }

        .newsletter-section {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .newsletter-desc {
          color: #6B7280;
          font-size: 0.9rem;
          line-height: 1.5;
        }

        .newsletter-form {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .newsletter-input-group {
          display: flex;
          gap: 0.5rem;
        }

        .newsletter-input {
          flex: 1;
          padding: 0.75rem;
          border: 1px solid rgba(209, 213, 219, 0.5);
          border-radius: 0.5rem;
          background: rgba(255, 255, 255, 0.8);
          color: #374151;
          backdrop-filter: blur(10px);
          transition: all 0.3s ease;
        }

        .newsletter-input:focus {
          outline: none;
          border-color: #3B82F6;
          background: rgba(255, 255, 255, 0.9);
        }

        .newsletter-btn {
          padding: 0.75rem 1.5rem;
          background: linear-gradient(135deg, #3B82F6, #8B5CF6);
          color: white;
          border: none;
          border-radius: 0.5rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          white-space: nowrap;
        }

        .newsletter-btn:hover {
          transform: translateY(-1px);
          box-shadow: 0 4px 15px rgba(59, 130, 246, 0.3);
        }

        .newsletter-privacy {
          font-size: 0.8rem;
          color: #9CA3AF;
        }

        .footer-bottom {
          border-top: 1px solid rgba(229, 231, 235, 0.5);
          padding: 2rem 0;
        }

        .footer-bottom-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 1rem;
        }

        .footer-legal {
          display: flex;
          align-items: center;
          gap: 2rem;
          flex-wrap: wrap;
        }

        .footer-copy {
          color: #6B7280;
          font-size: 0.9rem;
        }

        .footer-legal-links {
          display: flex;
          gap: 1.5rem;
        }

        .footer-legal-link {
          color: #6B7280;
          text-decoration: none;
          font-size: 0.9rem;
          transition: color 0.3s ease;
        }

        .footer-legal-link:hover {
          color: #3B82F6;
        }

        .footer-badges {
          display: flex;
          gap: 1rem;
        }

        .security-badges {
          display: flex;
          gap: 0.75rem;
        }

        .badge {
          padding: 0.5rem 1rem;
          background: rgba(255, 255, 255, 0.8);
          border: 1px solid rgba(16, 185, 129, 0.2);
          border-radius: 0.5rem;
          backdrop-filter: blur(10px);
        }

        .badge-text {
          font-size: 0.8rem;
          color: #059669;
          font-weight: 600;
        }

        /* ===== RESPONSIVE STYLES ===== */
        @media (max-width: 768px) {
          .desktop-nav {
            display: none;
          }
          
          .mobile-menu-btn {
            display: block;
          }
          
          .mobile-only {
            display: block;
          }
          
          .hero-title {
            font-size: 2.5rem;
          }
          
          .hero-subtitle {
            font-size: 1.1rem;
          }
          
          .hero-buttons {
            flex-direction: column;
            align-items: center;
          }
          
          .section-title {
            font-size: 2rem;
          }
          
          .features-grid {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }
          
          .stats-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 1.5rem;
          }
          
          .cta-title {
            font-size: 2rem;
          }
          
          .footer-sections {
            grid-template-columns: 1fr;
            gap: 2rem;
          }
          
          .footer-bottom-content {
            flex-direction: column;
            text-align: center;
          }
          
          .newsletter-input-group {
            flex-direction: column;
          }
        }

        @media (max-width: 480px) {
          .container {
            padding: 0 1rem;
          }
          
          .nav-container {
            padding: 1rem;
          }
          
          .hero-title {
            font-size: 2rem;
          }
          
          .section-title {
            font-size: 1.75rem;
          }
          
          .stat-number {
            font-size: 2rem;
          }
          
          .stats-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
      
      <div className="main-container">
        {/* --- START: Multi-Layered Stylish Animated Background --- */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0">
          
          {/* Static beautiful gradient */}
          <div
            className="absolute inset-0 opacity-40"
            style={{
              background: `radial-gradient(800px circle at 50% 50%, rgba(59, 130, 246, 0.3) 0%, rgba(168, 85, 247, 0.25) 25%, transparent 50%)`
            }}
          />

          {/* Layer 1: Floating Mathematical Symbols */}
          <div className="absolute top-[7%] left-[13%] text-purple-500 text-9xl opacity-75 floating-icon">∑</div>
          <div className="absolute top-[33%] right-[17%] text-blue-500 text-8xl opacity-70 floating-icon-reverse">π</div>
          <div className="absolute top-[61%] left-[27%] text-green-500 text-8xl opacity-75 floating-icon-slow">∞</div>
          <div className="absolute top-[19%] right-[38%] text-red-500 text-7xl opacity-65 floating-icon">⚛</div>
          <div className="absolute bottom-[31%] left-[8%] text-indigo-500 text-8xl opacity-70 floating-icon-reverse">∫</div>
          <div className="absolute bottom-[12%] right-[42%] text-teal-500 text-9xl opacity-75 floating-icon">≈</div>
          <div className="absolute bottom-[47%] right-[9%] text-pink-500 text-8xl opacity-65 floating-icon-slow">±</div>
          <div className="absolute top-[23%] left-[54%] text-fuchsia-500 text-8xl opacity-70 floating-icon">Δ</div>
          <div className="absolute top-[44%] left-[38%] text-emerald-500 text-7xl opacity-65 floating-icon-slow">λ</div>
          <div className="absolute top-[81%] left-[67%] text-cyan-500 text-9xl opacity-70 floating-icon-reverse">θ</div>
          <div className="absolute top-[29%] left-[83%] text-rose-500 text-8xl opacity-65 floating-icon">α</div>
          <div className="absolute bottom-[63%] left-[6%] text-amber-500 text-9xl opacity-70 floating-icon-slow">β</div>
          <div className="absolute bottom-[19%] left-[71%] text-purple-500 text-8xl opacity-65 floating-icon-reverse">μ</div>
          <div className="absolute bottom-[28%] left-[32%] text-blue-500 text-7xl opacity-70 floating-icon">ω</div>
          <div className="absolute top-[52%] left-[18%] text-sky-500 text-8xl opacity-60 floating-icon-slow">γ</div>
          <div className="absolute top-[37%] right-[29%] text-lime-500 text-9xl opacity-55 floating-icon">σ</div>
          <div className="absolute bottom-[42%] right-[37%] text-orange-500 text-8xl opacity-50 floating-icon-reverse">δ</div>
          <div className="absolute top-[73%] right-[13%] text-violet-500 text-8xl opacity-60 floating-icon-slow">ρ</div>
          
          {/* Layer 2: Drifting Gradient Meshes */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-100/40 via-purple-100/35 to-pink-100/40 animate-mesh-drift-1" />
          <div className="absolute inset-0 bg-gradient-to-tr from-emerald-100/35 via-violet-100/30 to-orange-100/35 animate-mesh-drift-2" />
          <div className="absolute inset-0 bg-gradient-to-bl from-cyan-100/40 via-purple-100/25 to-rose-100/40 animate-mesh-drift-3" />
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-100/30 via-transparent to-green-100/30 animate-mesh-drift-4" />

          {/* Layer 3: Floating Equations */}
          <div className="absolute top-1/4 left-1/6 text-4xl font-bold text-blue-600/70 animate-equation-float-1">∫ e⁻ˣ² dx = √π/2</div>
          <div className="absolute top-1/3 right-1/5 text-3xl font-bold text-emerald-600/70 animate-equation-float-2">∑ 1/n² = π²/6</div>
          <div className="absolute bottom-1/4 left-1/5 text-3xl font-bold text-pink-600/70 animate-equation-float-3">E = mc²</div>
          <div className="absolute top-1/2 right-1/6 text-3xl font-bold text-purple-600/70 animate-equation-float-4">a² + b² = c²</div>
          
          {/* Layer 4: Drifting Knowledge Particles */}
          {[...Array(60)].map((_, i) => (
            <div
              key={i}
              className={`absolute w-2 h-2 rounded-full animate-particle-drift-${(i % 4) + 1} shadow-md`}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 12}s`,
                animationDuration: `${6 + Math.random() * 10}s`,
                background: `radial-gradient(circle, ${['rgba(59, 130, 246, 0.7)', 'rgba(16, 185, 129, 0.7)', 'rgba(168, 85, 247, 0.7)', 'rgba(245, 158, 11, 0.7)', 'rgba(236, 72, 153, 0.7)'][i % 5]}, rgba(255,255,255,0.2))`
              }}
            />
          ))}

          {/* Layer 5: Floating Glass Orbs & Bubbles */}
          <div className="absolute top-16 left-16 w-80 h-80 bg-gradient-to-br from-blue-200/30 to-cyan-200/20 rounded-full backdrop-blur-sm border border-blue-300/40 animate-glass-float-1 shadow-lg" />
          <div className="absolute top-32 right-24 w-96 h-96 bg-gradient-to-br from-purple-200/25 to-pink-200/15 rounded-full backdrop-blur-sm border border-purple-300/30 animate-glass-float-2 shadow-lg" />
          <div className="absolute bottom-24 left-32 w-72 h-72 bg-gradient-to-br from-emerald-200/25 to-teal-200/15 rounded-full backdrop-blur-sm border border-emerald-300/25 animate-glass-float-3 shadow-lg" />
          <div className="absolute top-1/4 left-1/5 w-56 h-56 bg-gradient-to-br from-rose-200/20 to-pink-200/10 rounded-full backdrop-blur-sm border border-rose-300/25 animate-bubble-drift-1 shadow-md" />
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-gradient-to-br from-indigo-200/22 to-blue-200/12 rounded-full backdrop-blur-sm border border-indigo-300/30 animate-bubble-drift-2 shadow-md" />
        </div>
        {/* --- END: Multi-Layered Stylish Animated Background --- */}

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
    </>
  )
}