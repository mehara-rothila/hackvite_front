// app/lecturer/settings/page.tsx - ENHANCED WITH GLASSMORPHISM & VECTOR ICONS
'use client'

import { useState } from 'react'
import Link from 'next/link'

// --- Interfaces (Unchanged) ---
interface NotificationSettings {
  email: {
    newQueries: boolean
    queryUpdates: boolean
    appointmentRequests: boolean
    appointmentChanges: boolean
    newMessages: boolean
    systemUpdates: boolean
    resourceComments: boolean
    studentRegistrations: boolean
  }
  browser: {
    newQueries: boolean
    appointmentRequests: boolean
    newMessages: boolean
    urgentQueries: boolean
  }
  mobile: {
    newQueries: boolean
    appointmentRequests: boolean
    newMessages: boolean
    urgentQueries: boolean
  }
}

interface PrivacySettings {
  profileVisibility: 'public' | 'university' | 'department' | 'private'
  showOfficeHours: boolean
  allowStudentMessages: boolean
  shareResearchInfo: boolean
  showContactInfo: boolean
  allowCalendarAccess: boolean
  autoAcceptAppointments: boolean
}

interface PreferenceSettings {
  language: string
  timezone: string
  dateFormat: string
  timeFormat: '12h' | '24h'
  theme: 'light' | 'dark' | 'auto'
  dashboardLayout: 'grid' | 'list'
  autoSaveInterval: number
  defaultQueryPriority: string
  maxAppointmentsPerDay: number
  appointmentDuration: number
}

interface SecuritySettings {
  twoFactorEnabled: boolean
  sessionTimeout: number
  loginNotifications: boolean
  deviceManagement: boolean
  adminAccessLogs: boolean
}

interface TeachingSettings {
  maxStudentsPerCourse: number
  allowAnonymousQueries: boolean
  autoResponseEnabled: boolean
  gradingNotifications: boolean
  attendanceTracking: boolean
  courseFeedbackEnabled: boolean
}

// --- Mock Data (Unchanged) ---
const mockNotifications: NotificationSettings = {
  email: {
    newQueries: true,
    queryUpdates: true,
    appointmentRequests: true,
    appointmentChanges: true,
    newMessages: true,
    systemUpdates: true,
    resourceComments: false,
    studentRegistrations: false
  },
  browser: {
    newQueries: true,
    appointmentRequests: true,
    newMessages: true,
    urgentQueries: true
  },
  mobile: {
    newQueries: false,
    appointmentRequests: true,
    newMessages: false,
    urgentQueries: true
  }
}

const mockPrivacy: PrivacySettings = {
  profileVisibility: 'university',
  showOfficeHours: true,
  allowStudentMessages: true,
  shareResearchInfo: true,
  showContactInfo: true,
  allowCalendarAccess: false,
  autoAcceptAppointments: false
}

const mockPreferences: PreferenceSettings = {
  language: 'en',
  timezone: 'America/New_York',
  dateFormat: 'MM/DD/YYYY',
  timeFormat: '12h',
  theme: 'light',
  dashboardLayout: 'grid',
  autoSaveInterval: 5,
  defaultQueryPriority: 'medium',
  maxAppointmentsPerDay: 8,
  appointmentDuration: 30
}

const mockSecurity: SecuritySettings = {
  twoFactorEnabled: true,
  sessionTimeout: 120,
  loginNotifications: true,
  deviceManagement: true,
  adminAccessLogs: true
}

const mockTeaching: TeachingSettings = {
  maxStudentsPerCourse: 50,
  allowAnonymousQueries: false,
  autoResponseEnabled: true,
  gradingNotifications: true,
  attendanceTracking: false,
  courseFeedbackEnabled: true
}

// --- Component ---
export default function LecturerSettingsPage() {
  const [activeTab, setActiveTab] = useState('notifications')
  const [notifications, setNotifications] = useState<NotificationSettings>(mockNotifications)
  const [privacy, setPrivacy] = useState<PrivacySettings>(mockPrivacy)
  const [preferences, setPreferences] = useState<PreferenceSettings>(mockPreferences)
  const [security, setSecurity] = useState<SecuritySettings>(mockSecurity)
  const [teaching, setTeaching] = useState<TeachingSettings>(mockTeaching)
  const [hasChanges, setHasChanges] = useState(false)

  // --- Handlers (Unchanged) ---
  const handleNotificationChange = (category: keyof NotificationSettings, setting: string, value: boolean) => {
    setNotifications(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [setting]: value
      }
    }))
    setHasChanges(true)
  }

  const handlePrivacyChange = (setting: keyof PrivacySettings, value: PrivacySettings[keyof PrivacySettings]) => {
    setPrivacy(prev => ({ ...prev, [setting]: value }))
    setHasChanges(true)
  }

  const handlePreferenceChange = (setting: keyof PreferenceSettings, value: PreferenceSettings[keyof PreferenceSettings]) => {
    setPreferences(prev => ({ ...prev, [setting]: value }))
    setHasChanges(true)
  }

  const handleSecurityChange = (setting: keyof SecuritySettings, value: SecuritySettings[keyof SecuritySettings]) => {
    setSecurity(prev => ({ ...prev, [setting]: value }))
    setHasChanges(true)
  }

  const handleTeachingChange = (setting: keyof TeachingSettings, value: TeachingSettings[keyof TeachingSettings]) => {
    setTeaching(prev => ({ ...prev, [setting]: value }))
    setHasChanges(true)
  }

  const handleSaveSettings = () => {
    console.log('Saving settings:', { notifications, privacy, preferences, security, teaching })
    setHasChanges(false)
    alert('Settings saved successfully!') // In a real app, this would be a toast notification
  }

  const handleResetToDefaults = () => {
    if (confirm('Are you sure you want to reset all settings to defaults? This cannot be undone.')) {
      setNotifications(mockNotifications)
      setPrivacy(mockPrivacy)
      setPreferences(mockPreferences)
      setSecurity(mockSecurity)
      setTeaching(mockTeaching)
      setHasChanges(true)
    }
  }

  const tabs = [
    { id: 'notifications', name: 'Notifications', icon: '🔔' },
    { id: 'privacy', name: 'Privacy', icon: '🔒' },
    { id: 'preferences', name: 'Preferences', icon: '⚙️' },
    { id: 'teaching', name: 'Teaching', icon: '🎓' },
    { id: 'security', name: 'Security', icon: '🛡️' },
    { id: 'account', name: 'Account', icon: '👤' }
  ]

  return (
    <>
      {/* --- START: Global Styles & Animations (Copied from Dashboards) --- */}
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
        .animate-glass-fade-in { animation: glass-fade-in 1.2s ease-out forwards; }
        @keyframes slide-up-delayed { 0% { opacity: 0; transform: translateY(40px); } 100% { opacity: 1; transform: translateY(0); } }
        .animate-slide-up-delayed { animation: slide-up-delayed 0.8s ease-out 0.2s forwards; opacity: 0; }
        .animate-slide-up-delayed-2 { animation: slide-up-delayed 0.8s ease-out 0.4s forwards; opacity: 0; }
        .animate-slide-up-delayed-3 { animation: slide-up-delayed 0.8s ease-out 0.6s forwards; opacity: 0; }
        .animate-slide-up-delayed-4 { animation: slide-up-delayed 0.8s ease-out 0.8s forwards; opacity: 0; }
        @keyframes float-up { 0% { transform: translateY(20px); opacity: 0; } 100% { transform: translateY(0); opacity: 1; } }
        .animate-float-up { animation: float-up 0.7s ease-out forwards; }
        
        /* Enhanced Glassmorphism Card Styles */
        .glass-card { 
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.5)); 
          backdrop-filter: blur(40px) saturate(120%); 
          border: 1px solid rgba(255, 255, 255, 0.9); 
          box-shadow: 
            0 12px 40px rgba(31, 38, 135, 0.2), 
            0 0 0 1px rgba(255, 255, 255, 0.6) inset, 
            0 4px 16px rgba(255, 255, 255, 0.8) inset;
        }
        .glass-stat-card { 
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.85), rgba(255, 255, 255, 0.4)); 
          backdrop-filter: blur(32px) saturate(110%); 
          border: 1px solid rgba(255, 255, 255, 0.85); 
          box-shadow: 
            0 8px 32px rgba(31, 38, 135, 0.15), 
            0 0 0 1px rgba(255, 255, 255, 0.5) inset,
            0 2px 12px rgba(255, 255, 255, 0.9) inset; 
        }
        .glass-activity-card { 
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.3)); 
          backdrop-filter: blur(28px) saturate(105%); 
          border: 1px solid rgba(255, 255, 255, 0.75); 
          box-shadow: 
            0 6px 24px rgba(31, 38, 135, 0.12), 
            0 0 0 1px rgba(255, 255, 255, 0.4) inset,
            0 1px 8px rgba(255, 255, 255, 0.7) inset; 
        }
        .glass-premium-card {
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.92), rgba(255, 255, 255, 0.55)); 
          backdrop-filter: blur(44px) saturate(125%); 
          border: 1px solid rgba(255, 255, 255, 0.95); 
          box-shadow: 
            0 16px 48px rgba(31, 38, 135, 0.25), 
            0 0 0 1px rgba(255, 255, 255, 0.7) inset,
            0 6px 20px rgba(255, 255, 255, 0.95) inset,
            0 0 60px rgba(59, 130, 246, 0.1); 
        }
        .text-clean-shadow { filter: drop-shadow(0 2px 4px rgba(59, 130, 246, 0.2)); }
      `}</style>
      {/* --- END: Global Styles & Animations --- */}

      <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
        
        {/* --- START: Multi-Layered Animated Background (Copied from Dashboards) --- */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0">
          <div className="absolute top-[7%] left-[13%] text-purple-500 text-9xl opacity-75">∑</div>
          <div className="absolute top-[33%] right-[17%] text-blue-500 text-8xl opacity-70">π</div>
          <div className="absolute top-[61%] left-[27%] text-green-500 text-8xl opacity-75">∞</div>
          <div className="absolute top-[19%] right-[38%] text-red-500 text-7xl opacity-65">⚛</div>
          <div className="absolute bottom-[31%] left-[8%] text-indigo-500 text-8xl opacity-70">∫</div>
          <div className="absolute bottom-[12%] right-[42%] text-teal-500 text-9xl opacity-75">≈</div>
          <div className="absolute bottom-[47%] right-[9%] text-pink-500 text-8xl opacity-65">±</div>
          <div className="absolute inset-0 bg-gradient-to-br from-blue-100/40 via-purple-100/35 to-pink-100/40 animate-mesh-drift-1" />
          <div className="absolute inset-0 bg-gradient-to-tr from-emerald-100/35 via-violet-100/30 to-orange-100/35 animate-mesh-drift-2" />
          <div className="absolute inset-0 bg-gradient-to-bl from-cyan-100/40 via-purple-100/25 to-rose-100/40 animate-mesh-drift-3" />
          <div className="absolute top-1/4 left-1/6 text-4xl font-bold text-blue-600/70 animate-equation-float-1">∫ e⁻ˣ² dx = √π/2</div>
          <div className="absolute top-1/3 right-1/5 text-3xl font-bold text-emerald-600/70 animate-equation-float-2">∑ 1/n² = π²/6</div>
          <div className="absolute bottom-1/4 left-1/5 text-3xl font-bold text-pink-600/70 animate-equation-float-3">E = mc²</div>
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
          <div className="absolute top-16 left-16 w-80 h-80 bg-gradient-to-br from-blue-200/30 to-cyan-200/20 rounded-full backdrop-blur-sm border border-blue-300/40 animate-glass-float-1 shadow-lg" />
          <div className="absolute top-32 right-24 w-96 h-96 bg-gradient-to-br from-purple-200/25 to-pink-200/15 rounded-full backdrop-blur-sm border border-purple-300/30 animate-glass-float-2 shadow-lg" />
        </div>
        {/* --- END: Multi-Layered Animated Background --- */}

        <div className="relative z-20 p-6">
          <div className="max-w-5xl mx-auto">
            {/* Header */}
            <div className="mb-8 animate-glass-fade-in">
              <div className="relative group">
                <div className="absolute -inset-2 bg-gradient-to-r from-blue-300/20 via-purple-300/30 to-pink-300/20 rounded-2xl blur-xl opacity-60 group-hover:opacity-80 transition-all duration-1000 animate-aurora-glow" />
                <div className="relative glass-premium-card rounded-2xl p-6">
                  <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                    <div>
                      <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent text-clean-shadow mb-2">Account Settings</h1>
                      <p className="text-gray-600">Manage your account preferences, teaching settings, and privacy</p>
                    </div>
                    {hasChanges && (
                      <div className="flex-shrink-0 flex flex-col sm:flex-row gap-3">
                        <button
                          onClick={handleSaveSettings}
                          className="flex items-center justify-center gap-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-5 py-2 rounded-lg hover:from-green-600 hover:to-emerald-700 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                        >
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                          Save Changes
                        </button>
                        <button
                          onClick={handleResetToDefaults}
                          className="flex items-center justify-center gap-2 bg-white/60 text-gray-700 px-5 py-2 rounded-lg hover:bg-white/90 transition-all shadow-sm hover:shadow-md border border-gray-300/50"
                        >
                           <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M4 2a1 1 0 00-1 1v2.101a7.002 7.002 0 0011.601 2.566 1 1 0 10-1.885.666A5.002 5.002 0 015.999 7H9a1 1 0 100-2H4V2zm12 2.101a7.002 7.002 0 00-11.601-2.566 1 1 0 001.885-.666A5.002 5.002 0 0114.001 7H11a1 1 0 100 2h5V3a1 1 0 00-1-1v.101zM10 18a7.002 7.002 0 006.75-9.998 1 1 0 10-1.5-1.332A5.002 5.002 0 0110 15a5.002 5.002 0 01-4.25-2.002 1 1 0 10-1.5 1.332A7.002 7.002 0 0010 18z" clipRule="evenodd" /></svg>
                          Reset
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Settings Card */}
            <div className="glass-premium-card rounded-2xl animate-slide-up-delayed">
              <div className="border-b border-white/20">
                <nav className="flex space-x-2 sm:space-x-4 px-4 sm:px-6 overflow-x-auto">
                  {tabs.map(tab => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`relative py-4 px-3 text-sm font-medium flex items-center gap-2 whitespace-nowrap transition-all duration-300 ${
                        activeTab === tab.id
                          ? 'text-gray-900'
                          : 'text-gray-600 hover:text-gray-900'
                      }`}
                    >
                      <span className="text-lg">{tab.icon}</span>
                      {tab.name}
                      {activeTab === tab.id && (
                        <span className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-t-full"></span>
                      )}
                    </button>
                  ))}
                </nav>
              </div>

              <div className="p-6">
                {/* Notifications Tab */}
                {activeTab === 'notifications' && (
                  <div className="space-y-8 animate-float-up">
                    {[
                      { title: 'Email Notifications', category: 'email', items: notifications.email },
                      { title: 'Browser Notifications', category: 'browser', items: notifications.browser },
                      { title: 'Mobile Notifications', category: 'mobile', items: notifications.mobile }
                    ].map(section => (
                      <div key={section.title}>
                        <h3 className="text-lg font-bold text-gray-900 mb-4 text-clean-shadow">{section.title}</h3>
                        <div className="space-y-3">
                          {Object.entries(section.items).map(([key, value]) => (
                            <div key={key} className="flex items-center justify-between p-4 glass-activity-card rounded-xl transition-all hover:scale-[1.02] hover:shadow-lg">
                              <div>
                                <div className="font-semibold text-gray-900">
                                  {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                                </div>
                                <div className="text-sm text-gray-600 max-w-md">
                                  {section.category === 'email' && (
                                    <>
                                      {key === 'newQueries' && 'Receive email notifications when students submit new queries'}
                                      {key === 'queryUpdates' && 'Get notified when queries are updated or resolved'}
                                      {key === 'appointmentRequests' && 'Notifications for new appointment booking requests'}
                                      {key === 'appointmentChanges' && 'Alerts when appointments are rescheduled or cancelled'}
                                      {key === 'newMessages' && 'Email alerts for new messages from students'}
                                      {key === 'systemUpdates' && 'Important system maintenance and platform updates'}
                                      {key === 'resourceComments' && 'Notifications when students comment on your resources'}
                                      {key === 'studentRegistrations' && 'Alerts when new students enroll in your courses'}
                                    </>
                                  )}
                                  {section.category === 'browser' && 'Show browser popup notifications when you\'re online'}
                                  {section.category === 'mobile' && 'Push notifications to your mobile device'}
                                </div>
                              </div>
                              <label className="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" checked={value} onChange={(e) => handleNotificationChange(section.category as keyof NotificationSettings, key, e.target.checked)} className="sr-only peer" />
                                <div className="w-11 h-6 bg-gray-200/50 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300/50 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Privacy Tab */}
                {activeTab === 'privacy' && (
                  <div className="space-y-6 animate-float-up">
                    <h3 className="text-lg font-bold text-gray-900 text-clean-shadow">Privacy Settings</h3>
                    <div className="space-y-4">
                      <div className="p-4 glass-activity-card rounded-xl">
                          <label className="font-semibold text-gray-900 block mb-2">Profile Visibility</label>
                          <p className="text-sm text-gray-600 mb-3">Who can see your profile and research information</p>
                          <select
                            value={privacy.profileVisibility}
                            onChange={(e) => handlePrivacyChange('profileVisibility', e.target.value as PrivacySettings['profileVisibility'])}
                            className="w-full mt-2 px-4 py-2 bg-white/40 border border-gray-300/50 rounded-lg focus:ring-2 focus:ring-blue-400/50 backdrop-blur-sm transition-all text-gray-800"
                          >
                            <option value="public">Public - Anyone can see your profile</option>
                            <option value="university">University Only - Only university members</option>
                            <option value="department">Department Only - Only department members</option>
                            <option value="private">Private - Only you can see your profile</option>
                          </select>
                      </div>

                      {[
                        { key: 'showOfficeHours', label: 'Show Office Hours', desc: 'Display your office hours publicly to students' },
                        { key: 'allowStudentMessages', label: 'Allow Student Messages', desc: 'Allow students to send you direct messages' },
                        { key: 'shareResearchInfo', label: 'Share Research Information', desc: 'Show your research interests and publications' },
                        { key: 'showContactInfo', label: 'Show Contact Information', desc: 'Allow students to see your email and phone number' },
                        { key: 'allowCalendarAccess', label: 'Allow Calendar Access', desc: 'Let students see your availability for scheduling' },
                        { key: 'autoAcceptAppointments', label: 'Auto-Accept Appointments', desc: 'Automatically approve appointment requests within office hours' }
                      ].map(item => (
                        <div key={item.key} className="flex items-center justify-between p-4 glass-activity-card rounded-xl transition-all hover:scale-[1.02] hover:shadow-lg">
                          <div>
                            <div className="font-semibold text-gray-900">{item.label}</div>
                            <div className="text-sm text-gray-600">{item.desc}</div>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" checked={privacy[item.key as keyof PrivacySettings] as boolean} onChange={(e) => handlePrivacyChange(item.key as keyof PrivacySettings, e.target.checked)} className="sr-only peer" />
                            <div className="w-11 h-6 bg-gray-200/50 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300/50 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Preferences Tab */}
                {activeTab === 'preferences' && (
                  <div className="space-y-6 animate-float-up">
                    <h3 className="text-lg font-bold text-gray-900 text-clean-shadow">General Preferences</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {[
                        { key: 'language', label: 'Language', options: [{v: 'en', l: 'English'}, {v: 'es', l: 'Español'}, {v: 'fr', l: 'Français'}] },
                        { key: 'timezone', label: 'Timezone', options: [{v: 'America/New_York', l: 'Eastern Time (ET)'}, {v: 'America/Chicago', l: 'Central Time (CT)'}, {v: 'America/Los_Angeles', l: 'Pacific Time (PT)'}] },
                        { key: 'dateFormat', label: 'Date Format', options: [{v: 'MM/DD/YYYY', l: 'MM/DD/YYYY'}, {v: 'DD/MM/YYYY', l: 'DD/MM/YYYY'}, {v: 'YYYY-MM-DD', l: 'YYYY-MM-DD'}] },
                        { key: 'timeFormat', label: 'Time Format', options: [{v: '12h', l: '12-hour (AM/PM)'}, {v: '24h', l: '24-hour'}] },
                        { key: 'theme', label: 'Theme', options: [{v: 'light', l: 'Light'}, {v: 'dark', l: 'Dark'}, {v: 'auto', l: 'Auto (System)'}] },
                        { key: 'dashboardLayout', label: 'Dashboard Layout', options: [{v: 'grid', l: 'Grid View'}, {v: 'list', l: 'List View'}] },
                        { key: 'autoSaveInterval', label: 'Auto-save Interval (minutes)', options: [{v: 1, l: '1 minute'}, {v: 5, l: '5 minutes'}, {v: 10, l: '10 minutes'}] },
                        { key: 'defaultQueryPriority', label: 'Default Query Priority', options: [{v: 'low', l: 'Low'}, {v: 'medium', l: 'Medium'}, {v: 'high', l: 'High'}] },
                        { key: 'maxAppointmentsPerDay', label: 'Max Appointments Per Day', options: [{v: 4, l: '4 appointments'}, {v: 8, l: '8 appointments'}, {v: 12, l: '12 appointments'}] },
                        { key: 'appointmentDuration', label: 'Default Appointment Duration (minutes)', options: [{v: 15, l: '15 minutes'}, {v: 30, l: '30 minutes'}, {v: 60, l: '60 minutes'}] },
                      ].map(item => (
                        <div key={item.key}>
                          <label className="block text-sm font-medium text-gray-700 mb-2">{item.label}</label>
                          <select
                            value={preferences[item.key as keyof PreferenceSettings] as string | number}
                            onChange={(e) => handlePreferenceChange(item.key as keyof PreferenceSettings, typeof preferences[item.key as keyof PreferenceSettings] === 'number' ? parseInt(e.target.value) : e.target.value)}
                            className="w-full px-4 py-2 bg-white/40 border border-gray-300/50 rounded-lg focus:ring-2 focus:ring-blue-400/50 backdrop-blur-sm transition-all text-gray-800"
                          >
                            {item.options.map(opt => <option key={opt.v} value={opt.v}>{opt.l}</option>)}
                          </select>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Teaching Settings Tab */}
                {activeTab === 'teaching' && (
                   <div className="space-y-6 animate-float-up">
                    <h3 className="text-lg font-bold text-gray-900 text-clean-shadow">Teaching Preferences</h3>
                    <div className="space-y-4">
                      <div className="p-4 glass-activity-card rounded-xl">
                          <label className="font-semibold text-gray-900 block mb-2">Maximum Students Per Course</label>
                          <select
                            value={teaching.maxStudentsPerCourse}
                            onChange={(e) => handleTeachingChange('maxStudentsPerCourse', parseInt(e.target.value))}
                            className="w-full mt-2 px-4 py-2 bg-white/40 border border-gray-300/50 rounded-lg focus:ring-2 focus:ring-blue-400/50 backdrop-blur-sm transition-all text-gray-800"
                          >
                            {[25, 30, 40, 50, 75, 100].map(v => <option key={v} value={v}>{v} students</option>)}
                          </select>
                      </div>

                      {[
                        { key: 'allowAnonymousQueries', label: 'Allow Anonymous Queries', desc: 'Let students submit queries without revealing their identity' },
                        { key: 'autoResponseEnabled', label: 'Auto-Response Enabled', desc: 'Send automatic acknowledgment when queries are received' },
                        { key: 'gradingNotifications', label: 'Grading Notifications', desc: 'Notify students when grades are posted or updated' },
                        { key: 'attendanceTracking', label: 'Attendance Tracking', desc: 'Track and monitor student attendance in your courses' },
                        { key: 'courseFeedbackEnabled', label: 'Course Feedback Enabled', desc: 'Allow students to provide feedback on your courses' }
                      ].map(item => (
                        <div key={item.key} className="flex items-center justify-between p-4 glass-activity-card rounded-xl transition-all hover:scale-[1.02] hover:shadow-lg">
                          <div>
                            <div className="font-semibold text-gray-900">{item.label}</div>
                            <div className="text-sm text-gray-600">{item.desc}</div>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" checked={teaching[item.key as keyof TeachingSettings] as boolean} onChange={(e) => handleTeachingChange(item.key as keyof TeachingSettings, e.target.checked)} className="sr-only peer" />
                            <div className="w-11 h-6 bg-gray-200/50 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300/50 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Security Tab */}
                {activeTab === 'security' && (
                  <div className="space-y-6 animate-float-up">
                    <h3 className="text-lg font-bold text-gray-900 text-clean-shadow">Security Settings</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 glass-activity-card rounded-xl">
                        <div>
                          <div className="font-semibold text-gray-900">Two-Factor Authentication</div>
                          <div className="text-sm text-gray-600">Add an extra layer of security to your account</div>
                        </div>
                        <div className="flex items-center gap-3">
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" checked={security.twoFactorEnabled} onChange={(e) => handleSecurityChange('twoFactorEnabled', e.target.checked)} className="sr-only peer" />
                            <div className="w-11 h-6 bg-gray-200/50 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300/50 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                          </label>
                          {security.twoFactorEnabled && <button className="bg-blue-500/80 text-white px-3 py-1 rounded text-sm hover:bg-blue-600/90 backdrop-blur-sm">Configure</button>}
                        </div>
                      </div>

                       <div className="p-4 glass-activity-card rounded-xl">
                          <label className="font-semibold text-gray-900 block mb-2">Session Timeout</label>
                          <p className="text-sm text-gray-600 mb-3">Automatically log out after a period of inactivity</p>
                          <select
                            value={security.sessionTimeout}
                            onChange={(e) => handleSecurityChange('sessionTimeout', parseInt(e.target.value))}
                            className="w-full mt-2 px-4 py-2 bg-white/40 border border-gray-300/50 rounded-lg focus:ring-2 focus:ring-blue-400/50 backdrop-blur-sm transition-all text-gray-800"
                          >
                            <option value={30}>30 minutes</option>
                            <option value={60}>1 hour</option>
                            <option value={120}>2 hours</option>
                            <option value={0}>Never</option>
                          </select>
                      </div>

                      <div className="flex items-center justify-between p-4 glass-activity-card rounded-xl">
                        <div>
                          <div className="font-semibold text-gray-900">Login Notifications</div>
                          <div className="text-sm text-gray-600">Get notified when someone logs into your account</div>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" checked={security.loginNotifications} onChange={(e) => handleSecurityChange('loginNotifications', e.target.checked)} className="sr-only peer" />
                          <div className="w-11 h-6 bg-gray-200/50 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300/50 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                      </div>

                      <div className="border-t border-white/20 pt-6">
                        <h4 className="text-md font-bold text-gray-900 mb-4">Password & Recovery</h4>
                        <div className="space-y-3">
                          <button className="w-full text-left flex items-center gap-3 p-3 glass-activity-card rounded-xl hover:scale-105 transition-transform">
                            <span className="text-xl">🔑</span> <span className="font-semibold text-gray-800">Change Password</span>
                          </button>
                           <button className="w-full text-left flex items-center gap-3 p-3 glass-activity-card rounded-xl hover:scale-105 transition-transform">
                            <span className="text-xl">📧</span> <span className="font-semibold text-gray-800">Update Recovery Email</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Account Tab */}
                {activeTab === 'account' && (
                  <div className="space-y-6 animate-float-up">
                    <h3 className="text-lg font-bold text-gray-900 text-clean-shadow">Account Management</h3>
                    <div className="space-y-4">
                      {[
                        { title: 'Export Your Data', desc: 'Download a copy of your academic data, course materials, and student interactions', button: 'Request Data Export', icon: '📁', color: 'blue' },
                        { title: 'Sabbatical Mode', desc: 'Temporarily disable your account during sabbatical leave', button: 'Enable Sabbatical Mode', icon: '🏖️', color: 'yellow' },
                        { title: 'Delete Account', desc: 'Permanently delete your account and all associated data. This action cannot be undone.', button: 'Delete Account', icon: '🗑️', color: 'red' },
                      ].map(item => (
                        <div key={item.title} className={`p-4 bg-gradient-to-br from-${item.color}-500/20 to-transparent rounded-2xl border border-${item.color}-500/20`}>
                          <h4 className={`font-bold text-${item.color}-800 mb-1 text-lg`}>{item.icon} {item.title}</h4>
                          <p className={`text-sm text-${item.color}-700 mb-3`}>{item.desc}</p>
                          <button className={`bg-${item.color}-600 text-white px-4 py-2 rounded-lg hover:bg-${item.color}-700 transition-colors shadow-md`}>
                            {item.button}
                          </button>
                        </div>
                      ))}
                      <div className="border-t border-white/20 pt-6">
                        <h4 className="text-md font-bold text-gray-900 mb-4">Account Information</h4>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                          {[
                            { label: 'Account Created', value: 'January 15, 2019' },
                            { label: 'Last Login', value: 'Today at 8:45 AM' },
                            { label: 'Account Type', value: 'Faculty - Associate Professor' },
                            { label: 'Data Usage', value: '2.4 GB' },
                            { label: 'Active Courses', value: '4' },
                            { label: 'Total Students', value: '157' },
                          ].map(info => (
                            <div key={info.label} className="p-3 glass-activity-card rounded-xl text-center">
                              <div className="font-semibold text-gray-800">{info.label}</div>
                              <div className="text-gray-600 font-bold text-base">{info.value}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Quick Links */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 animate-slide-up-delayed-2">
              {[
                { href: "/lecturer/profile", icon: '👤', title: 'Edit Profile', desc: 'Update your academic information' },
                { href: "/lecturer/dashboard", icon: '🏠', title: 'Dashboard', desc: 'Return to your main dashboard' },
                { href: "/help", icon: '❓', title: 'Help & Support', desc: 'Get help with your settings' },
              ].map(link => (
                <Link key={link.title} href={link.href}>
                  <div className="glass-stat-card rounded-xl p-4 text-center group hover:scale-105 hover:shadow-xl transition-all duration-300 h-full">
                    <div className="text-4xl mb-2 group-hover:scale-110 transition-transform">{link.icon}</div>
                    <div className="font-bold text-gray-900">{link.title}</div>
                    <div className="text-sm text-gray-600">{link.desc}</div>
                  </div>
                </Link>
              ))}
            </div>

            {hasChanges && (
              <div className="fixed bottom-6 right-6 glass-card rounded-lg shadow-2xl z-50 animate-float-up">
                <div className="p-4">
                  <div className="flex items-center gap-4">
                    <span className="font-semibold text-gray-800">You have unsaved changes</span>
                    <button
                      onClick={handleSaveSettings}
                      className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all shadow-md"
                    >
                      Save Now
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}