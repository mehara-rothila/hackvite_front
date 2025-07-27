// app/student/profile/page.tsx
'use client'

import { useState } from 'react'
import Link from 'next/link'

interface StudentProfile {
  // Personal Information
  firstName: string
  lastName: string
  email: string
  studentId: string
  phone: string
  dateOfBirth: string
  gender: string
  
  // Academic Information
  program: string
  year: string
  gpa: string
  major: string
  minor: string
  expectedGraduation: string
  
  // Contact & Address
  address: string
  city: string
  country: string
  postalCode: string
  emergencyContact: string
  emergencyPhone: string
  
  // Profile Settings
  profilePicture: string
  bio: string
  linkedIn: string
  github: string
  portfolio: string
  
  // Academic Status
  enrollmentStatus: 'full-time' | 'part-time' | 'exchange'
  academicStanding: 'good' | 'probation' | 'honors'
}

const mockProfile: StudentProfile = {
  firstName: 'Alex',
  lastName: 'Johnson',
  email: 'alex.johnson@university.edu',
  studentId: 'STU2025001',
  phone: '+1 (555) 123-4567',
  dateOfBirth: '2003-05-15',
  gender: 'prefer-not-to-say',
  
  program: 'Bachelor of Computer Science',
  year: '2nd Year',
  gpa: '3.75',
  major: 'Computer Science',
  minor: 'Mathematics',
  expectedGraduation: '2027-05',
  
  address: '123 University Avenue',
  city: 'University City',
  country: 'United States',
  postalCode: '12345',
  emergencyContact: 'Sarah Johnson (Mother)',
  emergencyPhone: '+1 (555) 987-6543',
  
  profilePicture: '',
  bio: 'Passionate computer science student interested in AI and machine learning. Love problem-solving and building innovative solutions.',
  linkedIn: 'https://linkedin.com/in/alexjohnson',
  github: 'https://github.com/alexjohnson',
  portfolio: 'https://alexjohnson.dev',
  
  enrollmentStatus: 'full-time',
  academicStanding: 'good'
}

const courses = [
  { code: 'CS101', name: 'Introduction to Programming', credits: 3, grade: 'A-', semester: 'Fall 2024' },
  { code: 'MATH202', name: 'Calculus II', credits: 4, grade: 'B+', semester: 'Fall 2024' },
  { code: 'ENG110', name: 'Academic Writing', credits: 3, grade: 'A', semester: 'Fall 2024' },
  { code: 'CS201', name: 'Data Structures', credits: 3, grade: 'A', semester: 'Spring 2025' },
  { code: 'MATH301', name: 'Linear Algebra', credits: 3, grade: 'B', semester: 'Spring 2025' }
]

export default function StudentProfilePage() {
  const [profile, setProfile] = useState<StudentProfile>(mockProfile)
  const [activeTab, setActiveTab] = useState('personal')
  const [isEditing, setIsEditing] = useState(false)
  const [hasChanges, setHasChanges] = useState(false)

  const handleInputChange = (field: keyof StudentProfile, value: string) => {
    setProfile(prev => ({ ...prev, [field]: value }))
    setHasChanges(true)
  }

  const handleSave = () => {
    // In real app, save to API
    console.log('Saving profile:', profile)
    setIsEditing(false)
    setHasChanges(false)
    alert('Profile updated successfully!')
  }

  const handleCancel = () => {
    // Reset to original values
    setProfile(mockProfile)
    setIsEditing(false)
    setHasChanges(false)
  }

  const calculateCurrentGPA = () => {
    const gradePoints = { 'A': 4.0, 'A-': 3.7, 'B+': 3.3, 'B': 3.0, 'B-': 2.7, 'C+': 2.3, 'C': 2.0, 'C-': 1.7, 'D': 1.0, 'F': 0.0 }
    const completedCourses = courses.filter(course => course.grade)
    const totalPoints = completedCourses.reduce((sum, course) => sum + (gradePoints[course.grade as keyof typeof gradePoints] * course.credits), 0)
    const totalCredits = completedCourses.reduce((sum, course) => sum + course.credits, 0)
    return totalCredits > 0 ? (totalPoints / totalCredits).toFixed(2) : '0.00'
  }

  const tabs = [
    { id: 'personal', name: 'Personal Info', icon: '👤' },
    { id: 'academic', name: 'Academic Info', icon: '🎓' },
    { id: 'contact', name: 'Contact & Address', icon: '📍' },
    { id: 'social', name: 'Social Links', icon: '🔗' },
    { id: 'courses', name: 'Course History', icon: '📚' }
  ]

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">My Profile</h1>
              <p className="text-gray-600">Manage your personal and academic information</p>
            </div>
            <div className="flex gap-3">
              {!isEditing ? (
                <button
                  onClick={() => setIsEditing(true)}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  ✏️ Edit Profile
                </button>
              ) : (
                <div className="flex gap-2">
                  <button
                    onClick={handleSave}
                    disabled={!hasChanges}
                    className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors disabled:bg-gray-400"
                  >
                    💾 Save Changes
                  </button>
                  <button
                    onClick={handleCancel}
                    className="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-400 transition-colors"
                  >
                    ❌ Cancel
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Profile Summary Card */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center gap-6">
            <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center text-3xl text-blue-600">
              {profile.firstName.charAt(0)}{profile.lastName.charAt(0)}
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-900">{profile.firstName} {profile.lastName}</h2>
              <p className="text-gray-600">{profile.program} • {profile.year}</p>
              <p className="text-sm text-gray-500">Student ID: {profile.studentId}</p>
              <div className="flex gap-4 mt-2">
                <span className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full">
                  {profile.enrollmentStatus.charAt(0).toUpperCase() + profile.enrollmentStatus.slice(1).replace('-', ' ')}
                </span>
                <span className={`px-3 py-1 text-sm rounded-full ${
                  profile.academicStanding === 'honors' ? 'bg-purple-100 text-purple-800' :
                  profile.academicStanding === 'good' ? 'bg-green-100 text-green-800' :
                  'bg-yellow-100 text-yellow-800'
                }`}>
                  {profile.academicStanding.charAt(0).toUpperCase() + profile.academicStanding.slice(1)} Standing
                </span>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-blue-600">{calculateCurrentGPA()}</div>
              <div className="text-sm text-gray-500">Current GPA</div>
            </div>
          </div>
        </div>

        {/* Tabs */}
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
            {/* Personal Information Tab */}
            {activeTab === 'personal' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900">Personal Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                    <input
                      type="text"
                      value={profile.firstName}
                      onChange={(e) => handleInputChange('firstName', e.target.value)}
                      disabled={!isEditing}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                    <input
                      type="text"
                      value={profile.lastName}
                      onChange={(e) => handleInputChange('lastName', e.target.value)}
                      disabled={!isEditing}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input
                      type="email"
                      value={profile.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      disabled={!isEditing}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                    <input
                      type="tel"
                      value={profile.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      disabled={!isEditing}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
                    <input
                      type="date"
                      value={profile.dateOfBirth}
                      onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                      disabled={!isEditing}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                    <select
                      value={profile.gender}
                      onChange={(e) => handleInputChange('gender', e.target.value)}
                      disabled={!isEditing}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50"
                    >
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                      <option value="prefer-not-to-say">Prefer not to say</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
                  <textarea
                    rows={4}
                    value={profile.bio}
                    onChange={(e) => handleInputChange('bio', e.target.value)}
                    disabled={!isEditing}
                    placeholder="Tell us about yourself..."
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50"
                  />
                </div>
              </div>
            )}

            {/* Academic Information Tab */}
            {activeTab === 'academic' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900">Academic Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Student ID</label>
                    <input
                      type="text"
                      value={profile.studentId}
                      disabled
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Academic Year</label>
                    <select
                      value={profile.year}
                      onChange={(e) => handleInputChange('year', e.target.value)}
                      disabled={!isEditing}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50"
                    >
                      <option value="1st Year">1st Year</option>
                      <option value="2nd Year">2nd Year</option>
                      <option value="3rd Year">3rd Year</option>
                      <option value="4th Year">4th Year</option>
                      <option value="5th Year">5th Year</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Program</label>
                    <input
                      type="text"
                      value={profile.program}
                      onChange={(e) => handleInputChange('program', e.target.value)}
                      disabled={!isEditing}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Major</label>
                    <input
                      type="text"
                      value={profile.major}
                      onChange={(e) => handleInputChange('major', e.target.value)}
                      disabled={!isEditing}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Minor</label>
                    <input
                      type="text"
                      value={profile.minor}
                      onChange={(e) => handleInputChange('minor', e.target.value)}
                      disabled={!isEditing}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Expected Graduation</label>
                    <input
                      type="month"
                      value={profile.expectedGraduation}
                      onChange={(e) => handleInputChange('expectedGraduation', e.target.value)}
                      disabled={!isEditing}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Enrollment Status</label>
                    <select
                      value={profile.enrollmentStatus}
                      onChange={(e) => handleInputChange('enrollmentStatus', e.target.value as any)}
                      disabled={!isEditing}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50"
                    >
                      <option value="full-time">Full-time</option>
                      <option value="part-time">Part-time</option>
                      <option value="exchange">Exchange Student</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Academic Standing</label>
                    <select
                      value={profile.academicStanding}
                      onChange={(e) => handleInputChange('academicStanding', e.target.value as any)}
                      disabled
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50"
                    >
                      <option value="good">Good Standing</option>
                      <option value="probation">Academic Probation</option>
                      <option value="honors">Honors</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* Contact & Address Tab */}
            {activeTab === 'contact' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900">Contact & Address Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                    <input
                      type="text"
                      value={profile.address}
                      onChange={(e) => handleInputChange('address', e.target.value)}
                      disabled={!isEditing}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                    <input
                      type="text"
                      value={profile.city}
                      onChange={(e) => handleInputChange('city', e.target.value)}
                      disabled={!isEditing}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
                    <input
                      type="text"
                      value={profile.country}
                      onChange={(e) => handleInputChange('country', e.target.value)}
                      disabled={!isEditing}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Postal Code</label>
                    <input
                      type="text"
                      value={profile.postalCode}
                      onChange={(e) => handleInputChange('postalCode', e.target.value)}
                      disabled={!isEditing}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50"
                    />
                  </div>
                </div>
                
                <div className="border-t pt-6">
                  <h4 className="text-md font-semibold text-gray-900 mb-4">Emergency Contact</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Emergency Contact Name</label>
                      <input
                        type="text"
                        value={profile.emergencyContact}
                        onChange={(e) => handleInputChange('emergencyContact', e.target.value)}
                        disabled={!isEditing}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Emergency Contact Phone</label>
                      <input
                        type="tel"
                        value={profile.emergencyPhone}
                        onChange={(e) => handleInputChange('emergencyPhone', e.target.value)}
                        disabled={!isEditing}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Social Links Tab */}
            {activeTab === 'social' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900">Social Links & Portfolio</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">LinkedIn Profile</label>
                    <input
                      type="url"
                      value={profile.linkedIn}
                      onChange={(e) => handleInputChange('linkedIn', e.target.value)}
                      disabled={!isEditing}
                      placeholder="https://linkedin.com/in/yourusername"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">GitHub Profile</label>
                    <input
                      type="url"
                      value={profile.github}
                      onChange={(e) => handleInputChange('github', e.target.value)}
                      disabled={!isEditing}
                      placeholder="https://github.com/yourusername"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Portfolio Website</label>
                    <input
                      type="url"
                      value={profile.portfolio}
                      onChange={(e) => handleInputChange('portfolio', e.target.value)}
                      disabled={!isEditing}
                      placeholder="https://yourportfolio.com"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50"
                    />
                  </div>
                </div>
                
                {(profile.linkedIn || profile.github || profile.portfolio) && (
                  <div className="border-t pt-6">
                    <h4 className="text-md font-semibold text-gray-900 mb-4">Quick Links</h4>
                    <div className="flex flex-wrap gap-3">
                      {profile.linkedIn && (
                        <a
                          href={profile.linkedIn}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-100 transition-colors"
                        >
                          💼 LinkedIn
                        </a>
                      )}
                      {profile.github && (
                        <a
                          href={profile.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 bg-gray-50 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                        >
                          🐙 GitHub
                        </a>
                      )}
                      {profile.portfolio && (
                        <a
                          href={profile.portfolio}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 bg-purple-50 text-purple-600 px-4 py-2 rounded-lg hover:bg-purple-100 transition-colors"
                        >
                          🌐 Portfolio
                        </a>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Course History Tab */}
            {activeTab === 'courses' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-gray-900">Course History</h3>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-blue-600">{calculateCurrentGPA()}</div>
                    <div className="text-sm text-gray-500">Cumulative GPA</div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">{courses.length}</div>
                    <div className="text-sm text-blue-800">Total Courses</div>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">
                      {courses.reduce((sum, course) => sum + course.credits, 0)}
                    </div>
                    <div className="text-sm text-green-800">Total Credits</div>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">
                      {courses.filter(course => ['A', 'A-', 'B+'].includes(course.grade)).length}
                    </div>
                    <div className="text-sm text-purple-800">High Grades (A, A-, B+)</div>
                  </div>
                </div>

                <div className="space-y-3">
                  {courses.map((course, index) => (
                    <div key={index} className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-semibold text-gray-900">{course.code}: {course.name}</h4>
                          <p className="text-sm text-gray-600">{course.semester}</p>
                        </div>
                        <div className="text-right">
                          <div className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                            course.grade.startsWith('A') ? 'bg-green-100 text-green-800' :
                            course.grade.startsWith('B') ? 'bg-blue-100 text-blue-800' :
                            course.grade.startsWith('C') ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {course.grade}
                          </div>
                          <div className="text-sm text-gray-500 mt-1">{course.credits} credits</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link
            href="/student/settings"
            className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow text-center"
          >
            <div className="text-2xl mb-2">⚙️</div>
            <div className="font-medium text-gray-900">Account Settings</div>
            <div className="text-sm text-gray-600">Privacy, notifications, and preferences</div>
          </Link>
          
          <Link
            href="/student/queries"
            className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow text-center"
          >
            <div className="text-2xl mb-2">❓</div>
            <div className="font-medium text-gray-900">Academic Support</div>
            <div className="text-sm text-gray-600">Get help with your studies</div>
          </Link>
          
          <Link
            href="/student/appointments"
            className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow text-center"
          >
            <div className="text-2xl mb-2">📅</div>
            <div className="font-medium text-gray-900">Book Appointment</div>
            <div className="text-sm text-gray-600">Schedule time with lecturers</div>
          </Link>
        </div>
      </div>
    </div>
  )
}