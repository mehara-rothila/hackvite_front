// app/student/settings/page.tsx - ENHANCED WITH DASHBOARD STYLES
'use client'

import { useState } from 'react'
import Link from 'next/link'

// --- Interfaces (Unchanged) ---
interface NotificationSettings {
  email: {
    announcements: boolean
    queryResponses: boolean
    appointmentReminders: boolean
    appointmentChanges: boolean
    newMessages: boolean
    resourceUpdates: boolean
    systemUpdates: boolean
  }
  browser: {
    announcements: boolean
    queryResponses: boolean
    appointmentReminders: boolean
    newMessages: boolean
  }
  mobile: {
    announcements: boolean
    queryResponses: boolean
    appointmentReminders: boolean
    newMessages: boolean
  }
}

interface PrivacySettings {
  profileVisibility: 'public' | 'university' | 'private'
  showOnlineStatus: boolean
  allowDirectMessages: boolean
  shareAcademicInfo: boolean
  showContactInfo: boolean
  allowCalendarSharing: boolean
}

interface PreferenceSettings {
  language: string
  timezone: string
  dateFormat: string
  timeFormat: '12h' | '24h'
  theme: 'light' | 'dark' | 'auto'
  dashboardLayout: 'grid' | 'list'
  autoSaveInterval: number
  defaultQueryCategory: string
}

interface SecuritySettings {
  twoFactorEnabled: boolean
  sessionTimeout: number
  loginNotifications: boolean
  deviceManagement: boolean
}

// --- Mock Data (Unchanged) ---
const mockNotifications: NotificationSettings = {
  email: { announcements: true, queryResponses: true, appointmentReminders: true, appointmentChanges: true, newMessages: true, resourceUpdates: false, systemUpdates: true },
  browser: { announcements: true, queryResponses: true, appointmentReminders: true, newMessages: true },
  mobile: { announcements: false, queryResponses: true, appointmentReminders: true, newMessages: false }
}
const mockPrivacy: PrivacySettings = { profileVisibility: 'university', showOnlineStatus: true, allowDirectMessages: true, shareAcademicInfo: false, showContactInfo: false, allowCalendarSharing: true }
const mockPreferences: PreferenceSettings = { language: 'en', timezone: 'America/New_York', dateFormat: 'MM/DD/YYYY', timeFormat: '12h', theme: 'light', dashboardLayout: 'grid', autoSaveInterval: 5, defaultQueryCategory: 'Academic' }
const mockSecurity: SecuritySettings = { twoFactorEnabled: false, sessionTimeout: 60, loginNotifications: true, deviceManagement: true }

export default function StudentSettingsPage() {
  // --- State and Handlers (Unchanged) ---
  const [activeTab, setActiveTab] = useState('notifications')
  const [notifications, setNotifications] = useState<NotificationSettings>(mockNotifications)
  const [privacy, setPrivacy] = useState<PrivacySettings>(mockPrivacy)
  const [preferences, setPreferences] = useState<PreferenceSettings>(mockPreferences)
  const [security, setSecurity] = useState<SecuritySettings>(mockSecurity)
  const [hasChanges, setHasChanges] = useState(false)

  const handleNotificationChange = (category: keyof NotificationSettings, setting: string, value: boolean) => {
    setNotifications(prev => ({ ...prev, [category]: { ...prev[category], [setting]: value } }))
    setHasChanges(true)
  }
  const handlePrivacyChange = (setting: keyof PrivacySettings, value: any) => {
    setPrivacy(prev => ({ ...prev, [setting]: value }))
    setHasChanges(true)
  }
  const handlePreferenceChange = (setting: keyof PreferenceSettings, value: any) => {
    setPreferences(prev => ({ ...prev, [setting]: value }))
    setHasChanges(true)
  }
  const handleSecurityChange = (setting: keyof SecuritySettings, value: any) => {
    setSecurity(prev => ({ ...prev, [setting]: value }))
    setHasChanges(true)
  }
  const handleSaveSettings = () => {
    console.log('Saving settings:', { notifications, privacy, preferences, security })
    setHasChanges(false)
    alert('Settings saved successfully!')
  }
  const handleResetToDefaults = () => {
    if (confirm('Are you sure you want to reset all settings to defaults? This cannot be undone.')) {
      setNotifications(mockNotifications)
      setPrivacy(mockPrivacy)
      setPreferences(mockPreferences)
      setSecurity(mockSecurity)
      setHasChanges(true)
    }
  }

  const tabs = [
    { id: 'notifications', name: 'Notifications', icon: '🔔' },
    { id: 'privacy', name: 'Privacy', icon: '🔒' },
    { id: 'preferences', name: 'Preferences', icon: '⚙️' },
    { id: 'security', name: 'Security', icon: '🛡️' },
    { id: 'account', name: 'Account', icon: '👤' }
  ]

  const selectStyles = "w-full px-4 py-2 border rounded-lg transition-all duration-300 focus:ring-2 focus:ring-blue-500 bg-white/60 border-gray-300/70 focus:bg-white/80"

  return (
    <>
      {/* --- START: Global Styles & Animations (Copied from Dashboard) --- */}
      <style jsx global>{`
        /* All the animations from the login page */
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
        .animate-glass-fade-in { animation: glass-fade-in 0.8s ease-out forwards; }
        @keyframes slide-up-delayed { 0% { opacity: 0; transform: translateY(40px); } 100% { opacity: 1; transform: translateY(0); } }
        .animate-slide-up-delayed { animation: slide-up-delayed 0.8s ease-out 0.2s forwards; opacity: 0; }
        .animate-slide-up-delayed-2 { animation: slide-up-delayed 0.8s ease-out 0.4s forwards; opacity: 0; }
        .animate-slide-up-delayed-3 { animation: slide-up-delayed 0.8s ease-out 0.6s forwards; opacity: 0; }
        
        /* Enhanced Glassmorphism Card Styles */
        .glass-card { background: linear-gradient(135deg, rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.4)); backdrop-filter: blur(32px); border: 1px solid rgba(255, 255, 255, 0.9); box-shadow: 0 8px 32px rgba(31, 38, 135, 0.15), 0 0 0 1px rgba(255, 255, 255, 0.5) inset, 0 2px 8px rgba(255, 255, 255, 0.7) inset; }
        .glass-stat-card { background: linear-gradient(135deg, rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 0.3)); backdrop-filter: blur(24px); border: 1px solid rgba(255, 255, 255, 0.8); box-shadow: 0 6px 24px rgba(31, 38, 135, 0.1), 0 0 0 1px rgba(255, 255, 255, 0.4) inset; }
        .glass-activity-card { background: linear-gradient(135deg, rgba(255, 255, 255, 0.6), rgba(255, 255, 255, 0.2)); backdrop-filter: blur(20px); border: 1px solid rgba(255, 255, 255, 0.7); box-shadow: 0 4px 16px rgba(31, 38, 135, 0.08), 0 0 0 1px rgba(255, 255, 255, 0.3) inset; }
        .glass-sidebar-card { background: linear-gradient(135deg, rgba(255, 255, 255, 0.75), rgba(255, 255, 255, 0.35)); backdrop-filter: blur(28px); border: 1px solid rgba(255, 255, 255, 0.85); box-shadow: 0 6px 20px rgba(31, 38, 135, 0.12), 0 0 0 1px rgba(255, 255, 255, 0.45) inset; }
        .text-clean-shadow { filter: drop-shadow(0 2px 4px rgba(59, 130, 246, 0.2)); }
      `}</style>
      {/* --- END: Global Styles & Animations --- */}

      <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
        
        {/* --- START: Multi-Layered Animated Background (Copied from Dashboard) --- */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0">
          {/* Layer 1: Floating Symbols */}
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
        {/* --- END: Multi-Layered Animated Background --- */}

        <div className="relative z-20 min-h-screen p-4 sm:p-6">
          <div className="max-w-5xl mx-auto">
            {/* Header */}
            <div className="mb-8 animate-glass-fade-in">
              <div className="flex justify-between items-start">
                <div>
                  <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent text-clean-shadow mb-2">Account Settings</h1>
                  <p className="text-gray-600">Manage your account preferences and privacy settings</p>
                </div>
                <div className="flex gap-3">
                  {hasChanges && (
                    <div className="flex gap-2">
                      <button
                        onClick={handleSaveSettings}
                        className="inline-flex items-center gap-2 bg-gradient-to-r from-green-500 to-green-600 text-white px-5 py-2 rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105"
                      >
                        💾 Save Changes
                      </button>
                      <button
                        onClick={handleResetToDefaults}
                        className="bg-white/70 text-gray-700 px-5 py-2 rounded-lg hover:bg-white/90 transition-colors shadow-sm border border-gray-300/50"
                      >
                        🔄 Reset
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Enhanced Settings Card */}
            <div className="glass-card rounded-2xl mb-6 animate-slide-up-delayed">
              <div className="border-b border-white/30">
                <nav className="flex space-x-4 px-6 overflow-x-auto">
                  {tabs.map(tab => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex-shrink-0 border-b-2 py-4 px-2 text-sm font-medium flex items-center gap-2 transition-all duration-300 ${
                        activeTab === tab.id
                          ? 'border-blue-500 text-blue-600'
                          : 'border-transparent text-gray-500 hover:text-gray-800'
                      }`}
                    >
                      <span>{tab.icon}</span>
                      {tab.name}
                    </button>
                  ))}
                </nav>
              </div>

              <div className="p-6">
                {/* Notifications Tab */}
                {activeTab === 'notifications' && (
                  <div className="space-y-8">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Email Notifications</h3>
                      <div className="space-y-4">
                        {Object.entries(notifications.email).map(([key, value]) => (
                          <div key={key} className="flex items-center justify-between p-4 glass-activity-card rounded-lg">
                            <div>
                              <div className="font-medium text-gray-900">{key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</div>
                              <div className="text-sm text-gray-600">
                                {key === 'announcements' && 'Receive email notifications for new announcements'}
                                {key === 'queryResponses' && 'Get notified when lecturers respond to your queries'}
                                {key === 'appointmentReminders' && 'Reminders for upcoming appointments'}
                                {key === 'appointmentChanges' && 'Notifications when appointments are modified or cancelled'}
                                {key === 'newMessages' && 'Email alerts for new messages from lecturers'}
                                {key === 'resourceUpdates' && 'Notifications when new course resources are uploaded'}
                                {key === 'systemUpdates' && 'Important system maintenance and update notifications'}
                              </div>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input type="checkbox" checked={value} onChange={(e) => handleNotificationChange('email', key, e.target.checked)} className="sr-only peer" />
                              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                    {/* Other notification sections follow the same pattern */}
                  </div>
                )}

                {/* Privacy Tab */}
                {activeTab === 'privacy' && (
                  <div className="space-y-6">
                    <h3 className="text-lg font-semibold text-gray-900">Privacy Settings</h3>
                    <div className="space-y-6">
                      <div className="p-4 glass-activity-card rounded-lg">
                        <label className="font-medium text-gray-900">Profile Visibility</label>
                        <p className="text-sm text-gray-600 mb-2">Who can see your profile information</p>
                        <select value={privacy.profileVisibility} onChange={(e) => handlePrivacyChange('profileVisibility', e.target.value)} className={selectStyles}>
                          <option value="public">Public - Anyone can see your profile</option>
                          <option value="university">University Only - Only university members</option>
                          <option value="private">Private - Only you can see your profile</option>
                        </select>
                      </div>
                      {[
                        { key: 'showOnlineStatus', label: 'Show Online Status', desc: "Let others see when you're online" },
                        { key: 'allowDirectMessages', label: 'Allow Direct Messages', desc: 'Allow lecturers to send you direct messages' },
                        { key: 'shareAcademicInfo', label: 'Share Academic Information', desc: 'Show your GPA and courses to other students' },
                        { key: 'showContactInfo', label: 'Show Contact Information', desc: 'Allow others to see your email and phone number' },
                        { key: 'allowCalendarSharing', label: 'Allow Calendar Sharing', desc: 'Let lecturers see your availability for appointments' },
                      ].map(item => (
                        <div key={item.key} className="flex items-center justify-between p-4 glass-activity-card rounded-lg">
                          <div>
                            <div className="font-medium text-gray-900">{item.label}</div>
                            <div className="text-sm text-gray-600">{item.desc}</div>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" checked={privacy[item.key as keyof PrivacySettings] as boolean} onChange={(e) => handlePrivacyChange(item.key as keyof PrivacySettings, e.target.checked)} className="sr-only peer" />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Preferences Tab */}
                {activeTab === 'preferences' && (
                  <div className="space-y-6">
                    <h3 className="text-lg font-semibold text-gray-900">General Preferences</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Language</label>
                        <select value={preferences.language} onChange={(e) => handlePreferenceChange('language', e.target.value)} className={selectStyles}>
                          <option value="en">English</option>
                          <option value="es">Español</option>
                          <option value="fr">Français</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Timezone</label>
                        <select value={preferences.timezone} onChange={(e) => handlePreferenceChange('timezone', e.target.value)} className={selectStyles}>
                          <option value="America/New_York">Eastern Time (ET)</option>
                          <option value="America/Chicago">Central Time (CT)</option>
                          <option value="America/Los_Angeles">Pacific Time (PT)</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Theme</label>
                        <select value={preferences.theme} onChange={(e) => handlePreferenceChange('theme', e.target.value)} className={selectStyles}>
                          <option value="light">Light</option>
                          <option value="dark">Dark</option>
                          <option value="auto">Auto (System)</option>
                        </select>
                      </div>
                      {/* Add other preference selects here similarly */}
                    </div>
                  </div>
                )}

                {/* Security Tab */}
                {activeTab === 'security' && (
                  <div className="space-y-6">
                    <h3 className="text-lg font-semibold text-gray-900">Security Settings</h3>
                    <div className="space-y-6">
                      <div className="flex items-center justify-between p-4 glass-activity-card rounded-lg">
                        <div>
                          <div className="font-medium text-gray-900">Two-Factor Authentication</div>
                          <div className="text-sm text-gray-600">Add an extra layer of security to your account</div>
                        </div>
                        <div className="flex items-center gap-3">
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" checked={security.twoFactorEnabled} onChange={(e) => handleSecurityChange('twoFactorEnabled', e.target.checked)} className="sr-only peer" />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                          </label>
                          {security.twoFactorEnabled && (<button className="bg-blue-100/70 text-blue-700 px-3 py-1 rounded text-sm hover:bg-blue-100 font-medium">Configure</button>)}
                        </div>
                      </div>
                      {/* Other security settings */}
                      <div className="border-t border-white/30 pt-6">
                        <h4 className="text-md font-semibold text-gray-900 mb-4">Password & Recovery</h4>
                        <div className="space-y-3">
                          <button className="w-full glass-activity-card p-3 rounded-lg hover:shadow-md transition-all text-left font-medium text-gray-800">🔑 Change Password</button>
                          <button className="w-full glass-activity-card p-3 rounded-lg hover:shadow-md transition-all text-left font-medium text-gray-800">📧 Update Recovery Email</button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Account Tab */}
                {activeTab === 'account' && (
                  <div className="space-y-6">
                    <h3 className="text-lg font-semibold text-gray-900">Account Management</h3>
                    <div className="space-y-6">
                      <div className="p-4 glass-activity-card rounded-lg bg-blue-500/10">
                        <h4 className="font-medium text-blue-900 mb-2">Export Your Data</h4>
                        <p className="text-sm text-blue-800 mb-3">Download a copy of your personal data and activity</p>
                        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors shadow-sm">📁 Request Data Export</button>
                      </div>
                      <div className="p-4 glass-activity-card rounded-lg bg-yellow-500/10">
                        <h4 className="font-medium text-yellow-900 mb-2">Deactivate Account</h4>
                        <p className="text-sm text-yellow-800 mb-3">Temporarily disable your account. You can reactivate it anytime.</p>
                        <button className="bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700 transition-colors shadow-sm">⏸️ Deactivate Account</button>
                      </div>
                      <div className="p-4 glass-activity-card rounded-lg bg-red-500/10">
                        <h4 className="font-medium text-red-900 mb-2">Delete Account</h4>
                        <p className="text-sm text-red-800 mb-3">Permanently delete your account and all associated data. This action cannot be undone.</p>
                        <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors shadow-sm">🗑️ Delete Account</button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Enhanced Quick Links */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-slide-up-delayed-2">
              <Link href="/student/profile" className="block group">
                <div className="glass-sidebar-card rounded-2xl p-6 text-center transition-all duration-300 hover:scale-105 hover:shadow-xl">
                  <div className="text-4xl mb-2">👤</div>
                  <div className="font-medium text-gray-900">Edit Profile</div>
                  <div className="text-sm text-gray-600">Update your personal information</div>
                </div>
              </Link>
              <Link href="/student/dashboard" className="block group">
                <div className="glass-sidebar-card rounded-2xl p-6 text-center transition-all duration-300 hover:scale-105 hover:shadow-xl">
                  <div className="text-4xl mb-2">🏠</div>
                  <div className="font-medium text-gray-900">Dashboard</div>
                  <div className="text-sm text-gray-600">Return to your dashboard</div>
                </div>
              </Link>
              <button onClick={() => alert('Help and support system would be implemented here')} className="block group w-full">
                <div className="glass-sidebar-card rounded-2xl p-6 text-center transition-all duration-300 hover:scale-105 hover:shadow-xl h-full">
                  <div className="text-4xl mb-2">❓</div>
                  <div className="font-medium text-gray-900">Help & Support</div>
                  <div className="text-sm text-gray-600">Get help with your settings</div>
                </div>
              </button>
            </div>

            {/* Enhanced Unsaved Changes Banner */}
            {hasChanges && (
              <div className="fixed bottom-6 right-6 glass-card bg-blue-500/20 p-3 rounded-lg shadow-lg animate-glass-fade-in">
                <div className="flex items-center gap-4">
                  <span className="font-medium text-gray-800">You have unsaved changes</span>
                  <button
                    onClick={handleSaveSettings}
                    className="bg-white text-blue-600 px-4 py-1.5 rounded-md hover:bg-blue-50 transition-colors font-semibold shadow"
                  >
                    Save Now
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}