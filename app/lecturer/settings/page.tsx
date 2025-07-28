// app/lecturer/settings/page.tsx
'use client'

import { useState } from 'react'
import Link from 'next/link'

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

export default function LecturerSettingsPage() {
  const [activeTab, setActiveTab] = useState('notifications')
  const [notifications, setNotifications] = useState<NotificationSettings>(mockNotifications)
  const [privacy, setPrivacy] = useState<PrivacySettings>(mockPrivacy)
  const [preferences, setPreferences] = useState<PreferenceSettings>(mockPreferences)
  const [security, setSecurity] = useState<SecuritySettings>(mockSecurity)
  const [teaching, setTeaching] = useState<TeachingSettings>(mockTeaching)
  const [hasChanges, setHasChanges] = useState(false)

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
    alert('Settings saved successfully!')
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
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Account Settings</h1>
              <p className="text-gray-600">Manage your account preferences, teaching settings, and privacy</p>
            </div>
            <div className="flex gap-3">
              {hasChanges && (
                <div className="flex gap-2">
                  <button
                    onClick={handleSaveSettings}
                    className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
                  >
                    💾 Save Changes
                  </button>
                  <button
                    onClick={handleResetToDefaults}
                    className="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-400 transition-colors"
                  >
                    🔄 Reset to Defaults
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Settings Cards */}
        <div className="bg-white rounded-lg shadow-sm mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`border-b-2 py-4 px-2 text-sm font-medium flex items-center gap-2 ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
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
                      <div key={key} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div>
                          <div className="font-medium text-gray-900">
                            {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                          </div>
                          <div className="text-sm text-gray-600">
                            {key === 'newQueries' && 'Receive email notifications when students submit new queries'}
                            {key === 'queryUpdates' && 'Get notified when queries are updated or resolved'}
                            {key === 'appointmentRequests' && 'Notifications for new appointment booking requests'}
                            {key === 'appointmentChanges' && 'Alerts when appointments are rescheduled or cancelled'}
                            {key === 'newMessages' && 'Email alerts for new messages from students'}
                            {key === 'systemUpdates' && 'Important system maintenance and platform updates'}
                            {key === 'resourceComments' && 'Notifications when students comment on your resources'}
                            {key === 'studentRegistrations' && 'Alerts when new students enroll in your courses'}
                          </div>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={value}
                            onChange={(e) => handleNotificationChange('email', key, e.target.checked)}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Browser Notifications</h3>
                  <div className="space-y-4">
                    {Object.entries(notifications.browser).map(([key, value]) => (
                      <div key={key} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div>
                          <div className="font-medium text-gray-900">
                            {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                          </div>
                          <div className="text-sm text-gray-600">
                            Show browser popup notifications when you&apos;re online
                          </div>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={value}
                            onChange={(e) => handleNotificationChange('browser', key, e.target.checked)}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Mobile Notifications</h3>
                  <div className="space-y-4">
                    {Object.entries(notifications.mobile).map(([key, value]) => (
                      <div key={key} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div>
                          <div className="font-medium text-gray-900">
                            {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                          </div>
                          <div className="text-sm text-gray-600">
                            Push notifications to your mobile device
                          </div>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={value}
                            onChange={(e) => handleNotificationChange('mobile', key, e.target.checked)}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Privacy Tab */}
            {activeTab === 'privacy' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900">Privacy Settings</h3>
                
                <div className="space-y-6">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <div className="font-medium text-gray-900">Profile Visibility</div>
                        <div className="text-sm text-gray-600">Who can see your profile and research information</div>
                      </div>
                    </div>
                    <select
                      value={privacy.profileVisibility}
                      onChange={(e) => handlePrivacyChange('profileVisibility', e.target.value as PrivacySettings['profileVisibility'])}
                      className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="public">Public - Anyone can see your profile</option>
                      <option value="university">University Only - Only university members</option>
                      <option value="department">Department Only - Only department members</option>
                      <option value="private">Private - Only you can see your profile</option>
                    </select>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <div className="font-medium text-gray-900">Show Office Hours</div>
                      <div className="text-sm text-gray-600">Display your office hours publicly to students</div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={privacy.showOfficeHours}
                        onChange={(e) => handlePrivacyChange('showOfficeHours', e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <div className="font-medium text-gray-900">Allow Student Messages</div>
                      <div className="text-sm text-gray-600">Allow students to send you direct messages</div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={privacy.allowStudentMessages}
                        onChange={(e) => handlePrivacyChange('allowStudentMessages', e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <div className="font-medium text-gray-900">Share Research Information</div>
                      <div className="text-sm text-gray-600">Show your research interests and publications</div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={privacy.shareResearchInfo}
                        onChange={(e) => handlePrivacyChange('shareResearchInfo', e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <div className="font-medium text-gray-900">Show Contact Information</div>
                      <div className="text-sm text-gray-600">Allow students to see your email and phone number</div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={privacy.showContactInfo}
                        onChange={(e) => handlePrivacyChange('showContactInfo', e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <div className="font-medium text-gray-900">Allow Calendar Access</div>
                      <div className="text-sm text-gray-600">Let students see your availability for scheduling</div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={privacy.allowCalendarAccess}
                        onChange={(e) => handlePrivacyChange('allowCalendarAccess', e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <div className="font-medium text-gray-900">Auto-Accept Appointments</div>
                      <div className="text-sm text-gray-600">Automatically approve appointment requests within office hours</div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={privacy.autoAcceptAppointments}
                        onChange={(e) => handlePrivacyChange('autoAcceptAppointments', e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
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
                    <select
                      value={preferences.language}
                      onChange={(e) => handlePreferenceChange('language', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="en">English</option>
                      <option value="es">Español</option>
                      <option value="fr">Français</option>
                      <option value="de">Deutsch</option>
                      <option value="zh">中文</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Timezone</label>
                    <select
                      value={preferences.timezone}
                      onChange={(e) => handlePreferenceChange('timezone', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="America/New_York">Eastern Time (ET)</option>
                      <option value="America/Chicago">Central Time (CT)</option>
                      <option value="America/Denver">Mountain Time (MT)</option>
                      <option value="America/Los_Angeles">Pacific Time (PT)</option>
                      <option value="UTC">UTC</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Date Format</label>
                    <select
                      value={preferences.dateFormat}
                      onChange={(e) => handlePreferenceChange('dateFormat', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                      <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                      <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Time Format</label>
                    <select
                      value={preferences.timeFormat}
                      onChange={(e) => handlePreferenceChange('timeFormat', e.target.value as PreferenceSettings['timeFormat'])}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="12h">12-hour (AM/PM)</option>
                      <option value="24h">24-hour</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Theme</label>
                    <select
                      value={preferences.theme}
                      onChange={(e) => handlePreferenceChange('theme', e.target.value as PreferenceSettings['theme'])}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="light">Light</option>
                      <option value="dark">Dark</option>
                      <option value="auto">Auto (System)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Dashboard Layout</label>
                    <select
                      value={preferences.dashboardLayout}
                      onChange={(e) => handlePreferenceChange('dashboardLayout', e.target.value as PreferenceSettings['dashboardLayout'])}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="grid">Grid View</option>
                      <option value="list">List View</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Auto-save Interval (minutes)</label>
                    <select
                      value={preferences.autoSaveInterval}
                      onChange={(e) => handlePreferenceChange('autoSaveInterval', parseInt(e.target.value))}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    >
                      <option value={1}>1 minute</option>
                      <option value={5}>5 minutes</option>
                      <option value={10}>10 minutes</option>
                      <option value={15}>15 minutes</option>
                      <option value={30}>30 minutes</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Default Query Priority</label>
                    <select
                      value={preferences.defaultQueryPriority}
                      onChange={(e) => handlePreferenceChange('defaultQueryPriority', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Max Appointments Per Day</label>
                    <select
                      value={preferences.maxAppointmentsPerDay}
                      onChange={(e) => handlePreferenceChange('maxAppointmentsPerDay', parseInt(e.target.value))}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    >
                      <option value={4}>4 appointments</option>
                      <option value={6}>6 appointments</option>
                      <option value={8}>8 appointments</option>
                      <option value={10}>10 appointments</option>
                      <option value={12}>12 appointments</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Default Appointment Duration (minutes)</label>
                    <select
                      value={preferences.appointmentDuration}
                      onChange={(e) => handlePreferenceChange('appointmentDuration', parseInt(e.target.value))}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    >
                      <option value={15}>15 minutes</option>
                      <option value={30}>30 minutes</option>
                      <option value={45}>45 minutes</option>
                      <option value={60}>60 minutes</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* Teaching Settings Tab */}
            {activeTab === 'teaching' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900">Teaching Preferences</h3>
                
                <div className="space-y-6">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Maximum Students Per Course</label>
                    <select
                      value={teaching.maxStudentsPerCourse}
                      onChange={(e) => handleTeachingChange('maxStudentsPerCourse', parseInt(e.target.value))}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    >
                      <option value={25}>25 students</option>
                      <option value={30}>30 students</option>
                      <option value={40}>40 students</option>
                      <option value={50}>50 students</option>
                      <option value={75}>75 students</option>
                      <option value={100}>100 students</option>
                    </select>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <div className="font-medium text-gray-900">Allow Anonymous Queries</div>
                      <div className="text-sm text-gray-600">Let students submit queries without revealing their identity</div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={teaching.allowAnonymousQueries}
                        onChange={(e) => handleTeachingChange('allowAnonymousQueries', e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <div className="font-medium text-gray-900">Auto-Response Enabled</div>
                      <div className="text-sm text-gray-600">Send automatic acknowledgment when queries are received</div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={teaching.autoResponseEnabled}
                        onChange={(e) => handleTeachingChange('autoResponseEnabled', e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <div className="font-medium text-gray-900">Grading Notifications</div>
                      <div className="text-sm text-gray-600">Notify students when grades are posted or updated</div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={teaching.gradingNotifications}
                        onChange={(e) => handleTeachingChange('gradingNotifications', e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <div className="font-medium text-gray-900">Attendance Tracking</div>
                      <div className="text-sm text-gray-600">Track and monitor student attendance in your courses</div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={teaching.attendanceTracking}
                        onChange={(e) => handleTeachingChange('attendanceTracking', e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <div className="font-medium text-gray-900">Course Feedback Enabled</div>
                      <div className="text-sm text-gray-600">Allow students to provide feedback on your courses</div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={teaching.courseFeedbackEnabled}
                        onChange={(e) => handleTeachingChange('courseFeedbackEnabled', e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                </div>
              </div>
            )}

            {/* Security Tab */}
            {activeTab === 'security' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900">Security Settings</h3>
                
                <div className="space-y-6">
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <div className="font-medium text-gray-900">Two-Factor Authentication</div>
                      <div className="text-sm text-gray-600">Add an extra layer of security to your account</div>
                    </div>
                    <div className="flex items-center gap-3">
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={security.twoFactorEnabled}
                          onChange={(e) => handleSecurityChange('twoFactorEnabled', e.target.checked)}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                      {security.twoFactorEnabled && (
                        <button className="bg-blue-50 text-blue-600 px-3 py-1 rounded text-sm hover:bg-blue-100">
                          Configure
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <div className="font-medium text-gray-900">Session Timeout</div>
                        <div className="text-sm text-gray-600">Automatically log out after period of inactivity</div>
                      </div>
                    </div>
                    <select
                      value={security.sessionTimeout}
                      onChange={(e) => handleSecurityChange('sessionTimeout', parseInt(e.target.value))}
                      className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    >
                      <option value={30}>30 minutes</option>
                      <option value={60}>1 hour</option>
                      <option value={120}>2 hours</option>
                      <option value={240}>4 hours</option>
                      <option value={480}>8 hours</option>
                      <option value={0}>Never</option>
                    </select>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <div className="font-medium text-gray-900">Login Notifications</div>
                      <div className="text-sm text-gray-600">Get notified when someone logs into your account</div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={security.loginNotifications}
                        onChange={(e) => handleSecurityChange('loginNotifications', e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <div className="font-medium text-gray-900">Device Management</div>
                      <div className="text-sm text-gray-600">Manage and monitor your connected devices</div>
                    </div>
                    <div className="flex items-center gap-3">
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={security.deviceManagement}
                          onChange={(e) => handleSecurityChange('deviceManagement', e.target.checked)}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                      <button className="bg-gray-100 text-gray-600 px-3 py-1 rounded text-sm hover:bg-gray-200">
                        View Devices
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <div className="font-medium text-gray-900">Admin Access Logs</div>
                      <div className="text-sm text-gray-600">Keep detailed logs of administrative activities</div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={security.adminAccessLogs}
                        onChange={(e) => handleSecurityChange('adminAccessLogs', e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>

                  <div className="border-t pt-6">
                    <h4 className="text-md font-semibold text-gray-900 mb-4">Password & Recovery</h4>
                    <div className="space-y-3">
                      <button className="w-full bg-blue-50 text-blue-600 px-4 py-3 rounded-lg hover:bg-blue-100 transition-colors text-left">
                        🔑 Change Password
                      </button>
                      <button className="w-full bg-gray-50 text-gray-700 px-4 py-3 rounded-lg hover:bg-gray-100 transition-colors text-left">
                        📧 Update Recovery Email
                      </button>
                      <button className="w-full bg-gray-50 text-gray-700 px-4 py-3 rounded-lg hover:bg-gray-100 transition-colors text-left">
                        📱 Update Recovery Phone
                      </button>
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
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-medium text-blue-900 mb-2">Export Your Data</h4>
                    <p className="text-sm text-blue-800 mb-3">Download a copy of your academic data, course materials, and student interactions</p>
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                      📁 Request Data Export
                    </button>
                  </div>

                  <div className="p-4 bg-green-50 rounded-lg">
                    <h4 className="font-medium text-green-900 mb-2">Backup Course Materials</h4>
                    <p className="text-sm text-green-800 mb-3">Create a backup of all your course resources and materials</p>
                    <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
                      💾 Backup Materials
                    </button>
                  </div>

                  <div className="p-4 bg-yellow-50 rounded-lg">
                    <h4 className="font-medium text-yellow-900 mb-2">Sabbatical Mode</h4>
                    <p className="text-sm text-yellow-800 mb-3">Temporarily disable your account during sabbatical leave</p>
                    <button className="bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700 transition-colors">
                      🏖️ Enable Sabbatical Mode
                    </button>
                  </div>

                  <div className="p-4 bg-red-50 rounded-lg">
                    <h4 className="font-medium text-red-900 mb-2">Delete Account</h4>
                    <p className="text-sm text-red-800 mb-3">Permanently delete your account and all associated data. This action cannot be undone.</p>
                    <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors">
                      🗑️ Delete Account
                    </button>
                  </div>

                  <div className="border-t pt-6">
                    <h4 className="text-md font-semibold text-gray-900 mb-4">Account Information</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div className="p-3 bg-gray-50 rounded">
                        <div className="font-medium text-gray-700">Account Created</div>
                        <div className="text-gray-600">January 15, 2019</div>
                      </div>
                      <div className="p-3 bg-gray-50 rounded">
                        <div className="font-medium text-gray-700">Last Login</div>
                        <div className="text-gray-600">Today at 8:45 AM</div>
                      </div>
                      <div className="p-3 bg-gray-50 rounded">
                        <div className="font-medium text-gray-700">Account Type</div>
                        <div className="text-gray-600">Faculty - Associate Professor</div>
                      </div>
                      <div className="p-3 bg-gray-50 rounded">
                        <div className="font-medium text-gray-700">Data Usage</div>
                        <div className="text-gray-600">2.4 GB</div>
                      </div>
                      <div className="p-3 bg-gray-50 rounded">
                        <div className="font-medium text-gray-700">Active Courses</div>
                        <div className="text-gray-600">4 courses</div>
                      </div>
                      <div className="p-3 bg-gray-50 rounded">
                        <div className="font-medium text-gray-700">Total Students</div>
                        <div className="text-gray-600">157 students</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Quick Links */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link
            href="/lecturer/profile"
            className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow text-center"
          >
            <div className="text-2xl mb-2">👤</div>
            <div className="font-medium text-gray-900">Edit Profile</div>
            <div className="text-sm text-gray-600">Update your academic information</div>
          </Link>
          
          <Link
            href="/lecturer/dashboard"
            className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow text-center"
          >
            <div className="text-2xl mb-2">🏠</div>
            <div className="font-medium text-gray-900">Dashboard</div>
            <div className="text-sm text-gray-600">Return to your dashboard</div>
          </Link>
          
          <button
            onClick={() => alert('Help and support system would be implemented here')}
            className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow text-center"
          >
            <div className="text-2xl mb-2">❓</div>
            <div className="font-medium text-gray-900">Help & Support</div>
            <div className="text-sm text-gray-600">Get help with your settings</div>
          </button>
        </div>

        {hasChanges && (
          <div className="fixed bottom-6 right-6 bg-blue-600 text-white px-6 py-3 rounded-lg shadow-lg">
            <div className="flex items-center gap-3">
              <span>You have unsaved changes</span>
              <button
                onClick={handleSaveSettings}
                className="bg-white text-blue-600 px-4 py-1 rounded hover:bg-blue-50 transition-colors"
              >
                Save Now
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
