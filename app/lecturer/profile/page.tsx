// app/lecturer/profile/page.tsx
'use client'

import { useState } from 'react'
import Link from 'next/link'

interface LecturerProfile {
  // Personal Information
  title: string
  firstName: string
  lastName: string
  email: string
  employeeId: string
  phone: string
  dateOfBirth: string
  
  // Academic Information
  department: string
  position: string
  specialization: string[]
  qualification: string
  experience: string
  research: string[]
  
  // Contact & Office
  officeAddress: string
  officeHours: string
  campus: string
  building: string
  room: string
  
  // Profile Settings
  profilePicture: string
  bio: string
  linkedIn: string
  researchGate: string
  website: string
  orcid: string
  
  // Teaching Status
  employmentType: 'full-time' | 'part-time' | 'visiting' | 'adjunct'
  status: 'active' | 'sabbatical' | 'emeritus'
}

const mockProfile: LecturerProfile = {
  title: 'Dr.',
  firstName: 'Sarah',
  lastName: 'Johnson',
  email: 'sarah.johnson@university.edu',
  employeeId: 'FAC2019045',
  phone: '+1 (555) 234-5678',
  dateOfBirth: '1980-03-20',
  
  department: 'Computer Science',
  position: 'Associate Professor',
  specialization: ['Machine Learning', 'Artificial Intelligence', 'Data Science'],
  qualification: 'Ph.D. in Computer Science, Stanford University',
  experience: '8 years',
  research: ['Deep Learning', 'Natural Language Processing', 'Computer Vision'],
  
  officeAddress: 'Computer Science Building, Room 201B',
  officeHours: 'Monday & Wednesday 2:00-4:00 PM, Friday 10:00-12:00 PM',
  campus: 'Main Campus',
  building: 'Computer Science Building',
  room: '201B',
  
  profilePicture: '',
  bio: 'Dr. Sarah Johnson is an Associate Professor of Computer Science with expertise in machine learning and artificial intelligence. Her research focuses on developing innovative AI solutions for real-world problems.',
  linkedIn: 'https://linkedin.com/in/drsarahjohnson',
  researchGate: 'https://researchgate.net/profile/Sarah-Johnson',
  website: 'https://sarahjohnson.edu',
  orcid: 'https://orcid.org/0000-0000-0000-0000',
  
  employmentType: 'full-time',
  status: 'active'
}

const courses = [
  { code: 'CS101', name: 'Introduction to Programming', semester: 'Fall 2024', students: 45, type: 'Lecture' },
  { code: 'CS301', name: 'Machine Learning Fundamentals', semester: 'Fall 2024', students: 32, type: 'Lecture' },
  { code: 'CS499', name: 'Advanced AI Research', semester: 'Spring 2025', students: 8, type: 'Seminar' },
  { code: 'CS201', name: 'Data Structures & Algorithms', semester: 'Spring 2025', students: 38, type: 'Lecture' }
]

const publications = [
  {
    title: 'Deep Learning Approaches for Automated Essay Scoring',
    journal: 'IEEE Transactions on Learning Technologies',
    year: '2024',
    citations: 23,
    type: 'Journal Article'
  },
  {
    title: 'Enhancing Student Engagement through AI-Powered Learning Platforms',
    conference: 'International Conference on Educational Technology',
    year: '2024',
    citations: 12,
    type: 'Conference Paper'
  },
  {
    title: 'Machine Learning in Higher Education: A Comprehensive Review',
    journal: 'Computers & Education',
    year: '2023',
    citations: 45,
    type: 'Review Article'
  }
]

export default function LecturerProfilePage() {
  const [profile, setProfile] = useState<LecturerProfile>(mockProfile)
  const [activeTab, setActiveTab] = useState('personal')
  const [isEditing, setIsEditing] = useState(false)
  const [hasChanges, setHasChanges] = useState(false)

  const handleInputChange = (field: keyof LecturerProfile, value: string | string[]) => {
    setProfile(prev => ({ ...prev, [field]: value }))
    setHasChanges(true)
  }

  const handleSpecializationChange = (index: number, value: string) => {
    const newSpecs = [...profile.specialization]
    newSpecs[index] = value
    handleInputChange('specialization', newSpecs)
  }

  const addSpecialization = () => {
    handleInputChange('specialization', [...profile.specialization, ''])
  }

  const removeSpecialization = (index: number) => {
    const newSpecs = profile.specialization.filter((_, i) => i !== index)
    handleInputChange('specialization', newSpecs)
  }

  const handleResearchChange = (index: number, value: string) => {
    const newResearch = [...profile.research]
    newResearch[index] = value
    handleInputChange('research', newResearch)
  }

  const addResearch = () => {
    handleInputChange('research', [...profile.research, ''])
  }

  const removeResearch = (index: number) => {
    const newResearch = profile.research.filter((_, i) => i !== index)
    handleInputChange('research', newResearch)
  }

  const handleSave = () => {
    console.log('Saving profile:', profile)
    setIsEditing(false)
    setHasChanges(false)
    alert('Profile updated successfully!')
  }

  const handleCancel = () => {
    setProfile(mockProfile)
    setIsEditing(false)
    setHasChanges(false)
  }

  const tabs = [
    { id: 'personal', name: 'Personal Info', icon: '👤' },
    { id: 'academic', name: 'Academic Info', icon: '🎓' },
    { id: 'office', name: 'Office & Contact', icon: '🏢' },
    { id: 'research', name: 'Research Links', icon: '🔗' },
    { id: 'teaching', name: 'Teaching & Publications', icon: '📚' }
  ]

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">My Profile</h1>
              <p className="text-gray-600">Manage your academic and professional information</p>
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
              <h2 className="text-2xl font-bold text-gray-900">
                {profile.title} {profile.firstName} {profile.lastName}
              </h2>
              <p className="text-gray-600">{profile.position} • {profile.department}</p>
              <p className="text-sm text-gray-500">Employee ID: {profile.employeeId}</p>
              <div className="flex flex-wrap gap-2 mt-3">
                {profile.specialization.slice(0, 3).map((spec, index) => (
                  <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                    {spec}
                  </span>
                ))}
                {profile.specialization.length > 3 && (
                  <span className="px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-full">
                    +{profile.specialization.length - 3} more
                  </span>
                )}
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-purple-600">{courses.length}</div>
              <div className="text-sm text-gray-500">Active Courses</div>
              <div className="text-lg font-semibold text-green-600 mt-2">
                {courses.reduce((sum, course) => sum + course.students, 0)}
              </div>
              <div className="text-sm text-gray-500">Total Students</div>
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
                    <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                    <select
                      value={profile.title}
                      onChange={(e) => handleInputChange('title', e.target.value)}
                      disabled={!isEditing}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50"
                    >
                      <option value="Dr.">Dr.</option>
                      <option value="Prof.">Prof.</option>
                      <option value="Mr.">Mr.</option>
                      <option value="Ms.">Ms.</option>
                      <option value="Mrs.">Mrs.</option>
                    </select>
                  </div>
                  <div></div>
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
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
                  <textarea
                    rows={4}
                    value={profile.bio}
                    onChange={(e) => handleInputChange('bio', e.target.value)}
                    disabled={!isEditing}
                    placeholder="Tell us about your academic background and interests..."
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
                    <label className="block text-sm font-medium text-gray-700 mb-1">Employee ID</label>
                    <input
                      type="text"
                      value={profile.employeeId}
                      disabled
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Position</label>
                    <select
                      value={profile.position}
                      onChange={(e) => handleInputChange('position', e.target.value)}
                      disabled={!isEditing}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50"
                    >
                      <option value="Professor">Professor</option>
                      <option value="Associate Professor">Associate Professor</option>
                      <option value="Assistant Professor">Assistant Professor</option>
                      <option value="Lecturer">Lecturer</option>
                      <option value="Senior Lecturer">Senior Lecturer</option>
                      <option value="Adjunct Professor">Adjunct Professor</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
                    <input
                      type="text"
                      value={profile.department}
                      onChange={(e) => handleInputChange('department', e.target.value)}
                      disabled={!isEditing}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Years of Experience</label>
                    <input
                      type="text"
                      value={profile.experience}
                      onChange={(e) => handleInputChange('experience', e.target.value)}
                      disabled={!isEditing}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Highest Qualification</label>
                    <input
                      type="text"
                      value={profile.qualification}
                      onChange={(e) => handleInputChange('qualification', e.target.value)}
                      disabled={!isEditing}
                      placeholder="e.g., Ph.D. in Computer Science, Stanford University"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Employment Type</label>
                    <select
                      value={profile.employmentType}
                      onChange={(e) => handleInputChange('employmentType', e.target.value as LecturerProfile['employmentType'])}
                      disabled={!isEditing}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50"
                    >
                      <option value="full-time">Full-time</option>
                      <option value="part-time">Part-time</option>
                      <option value="visiting">Visiting</option>
                      <option value="adjunct">Adjunct</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                    <select
                      value={profile.status}
                      onChange={(e) => handleInputChange('status', e.target.value as LecturerProfile['status'])}
                      disabled={!isEditing}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50"
                    >
                      <option value="active">Active</option>
                      <option value="sabbatical">On Sabbatical</option>
                      <option value="emeritus">Emeritus</option>
                    </select>
                  </div>
                </div>

                {/* Specializations */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">Areas of Specialization</label>
                  <div className="space-y-2">
                    {profile.specialization.map((spec, index) => (
                      <div key={index} className="flex gap-2">
                        <input
                          type="text"
                          value={spec}
                          onChange={(e) => handleSpecializationChange(index, e.target.value)}
                          disabled={!isEditing}
                          placeholder="Enter specialization area"
                          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50"
                        />
                        {isEditing && (
                          <button
                            onClick={() => removeSpecialization(index)}
                            className="bg-red-50 text-red-600 px-3 py-2 rounded-lg hover:bg-red-100"
                          >
                            ❌
                          </button>
                        )}
                      </div>
                    ))}
                    {isEditing && (
                      <button
                        onClick={addSpecialization}
                        className="bg-blue-50 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-100 transition-colors"
                      >
                        ➕ Add Specialization
                      </button>
                    )}
                  </div>
                </div>

                {/* Research Areas */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">Research Interests</label>
                  <div className="space-y-2">
                    {profile.research.map((research, index) => (
                      <div key={index} className="flex gap-2">
                        <input
                          type="text"
                          value={research}
                          onChange={(e) => handleResearchChange(index, e.target.value)}
                          disabled={!isEditing}
                          placeholder="Enter research area"
                          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50"
                        />
                        {isEditing && (
                          <button
                            onClick={() => removeResearch(index)}
                            className="bg-red-50 text-red-600 px-3 py-2 rounded-lg hover:bg-red-100"
                          >
                            ❌
                          </button>
                        )}
                      </div>
                    ))}
                    {isEditing && (
                      <button
                        onClick={addResearch}
                        className="bg-green-50 text-green-600 px-4 py-2 rounded-lg hover:bg-green-100 transition-colors"
                      >
                        ➕ Add Research Area
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Office & Contact Tab */}
            {activeTab === 'office' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900">Office & Contact Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Campus</label>
                    <input
                      type="text"
                      value={profile.campus}
                      onChange={(e) => handleInputChange('campus', e.target.value)}
                      disabled={!isEditing}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Building</label>
                    <input
                      type="text"
                      value={profile.building}
                      onChange={(e) => handleInputChange('building', e.target.value)}
                      disabled={!isEditing}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Room Number</label>
                    <input
                      type="text"
                      value={profile.room}
                      onChange={(e) => handleInputChange('room', e.target.value)}
                      disabled={!isEditing}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50"
                    />
                  </div>
                  <div></div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Office Address</label>
                    <input
                      type="text"
                      value={profile.officeAddress}
                      onChange={(e) => handleInputChange('officeAddress', e.target.value)}
                      disabled={!isEditing}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Office Hours</label>
                    <textarea
                      rows={3}
                      value={profile.officeHours}
                      onChange={(e) => handleInputChange('officeHours', e.target.value)}
                      disabled={!isEditing}
                      placeholder="e.g., Monday & Wednesday 2:00-4:00 PM, Friday 10:00-12:00 PM"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Research Links Tab */}
            {activeTab === 'research' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900">Research & Professional Links</h3>
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
                    <label className="block text-sm font-medium text-gray-700 mb-1">ResearchGate Profile</label>
                    <input
                      type="url"
                      value={profile.researchGate}
                      onChange={(e) => handleInputChange('researchGate', e.target.value)}
                      disabled={!isEditing}
                      placeholder="https://researchgate.net/profile/yourname"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Personal Website</label>
                    <input
                      type="url"
                      value={profile.website}
                      onChange={(e) => handleInputChange('website', e.target.value)}
                      disabled={!isEditing}
                      placeholder="https://yourwebsite.edu"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">ORCID</label>
                    <input
                      type="url"
                      value={profile.orcid}
                      onChange={(e) => handleInputChange('orcid', e.target.value)}
                      disabled={!isEditing}
                      placeholder="https://orcid.org/0000-0000-0000-0000"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50"
                    />
                  </div>
                </div>
                
                {(profile.linkedIn || profile.researchGate || profile.website || profile.orcid) && (
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
                      {profile.researchGate && (
                        <a
                          href={profile.researchGate}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 bg-green-50 text-green-600 px-4 py-2 rounded-lg hover:bg-green-100 transition-colors"
                        >
                          🔬 ResearchGate
                        </a>
                      )}
                      {profile.website && (
                        <a
                          href={profile.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 bg-purple-50 text-purple-600 px-4 py-2 rounded-lg hover:bg-purple-100 transition-colors"
                        >
                          🌐 Website
                        </a>
                      )}
                      {profile.orcid && (
                        <a
                          href={profile.orcid}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 bg-orange-50 text-orange-600 px-4 py-2 rounded-lg hover:bg-orange-100 transition-colors"
                        >
                          🆔 ORCID
                        </a>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Teaching & Publications Tab */}
            {activeTab === 'teaching' && (
              <div className="space-y-8">
                {/* Current Courses */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Current Courses</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">{courses.length}</div>
                      <div className="text-sm text-blue-800">Active Courses</div>
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">
                        {courses.reduce((sum, course) => sum + course.students, 0)}
                      </div>
                      <div className="text-sm text-green-800">Total Students</div>
                    </div>
                    <div className="bg-purple-50 p-4 rounded-lg">
                      <div className="text-2xl font-bold text-purple-600">
                        {Math.round(courses.reduce((sum, course) => sum + course.students, 0) / courses.length)}
                      </div>
                      <div className="text-sm text-purple-800">Avg. Class Size</div>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    {courses.map((course, index) => (
                      <div key={index} className="bg-gray-50 p-4 rounded-lg">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-semibold text-gray-900">{course.code}: {course.name}</h4>
                            <p className="text-sm text-gray-600">{course.semester} • {course.type}</p>
                          </div>
                          <div className="text-right">
                            <div className="text-lg font-semibold text-blue-600">{course.students}</div>
                            <div className="text-sm text-gray-500">students</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recent Publications */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Publications</h3>
                  <div className="space-y-4">
                    {publications.map((pub, index) => (
                      <div key={index} className="bg-white border border-gray-200 p-4 rounded-lg">
                        <h4 className="font-semibold text-gray-900 mb-2">{pub.title}</h4>
                        <div className="text-sm text-gray-600 mb-2">
                          {pub.journal && <span>{pub.journal}</span>}
                          {pub.conference && <span>{pub.conference}</span>}
                          <span> • {pub.year}</span>
                        </div>
                        <div className="flex gap-4 text-sm">
                          <span className={`px-2 py-1 rounded text-xs ${
                            pub.type === 'Journal Article' ? 'bg-blue-100 text-blue-800' :
                            pub.type === 'Conference Paper' ? 'bg-green-100 text-green-800' :
                            'bg-purple-100 text-purple-800'
                          }`}>
                            {pub.type}
                          </span>
                          <span className="text-gray-500">{pub.citations} citations</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link
            href="/lecturer/settings"
            className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow text-center"
          >
            <div className="text-2xl mb-2">⚙️</div>
            <div className="font-medium text-gray-900">Account Settings</div>
            <div className="text-sm text-gray-600">Privacy, notifications, and preferences</div>
          </Link>
          
          <Link
            href="/lecturer/queries"
            className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow text-center"
          >
            <div className="text-2xl mb-2">❓</div>
            <div className="font-medium text-gray-900">Student Queries</div>
            <div className="text-sm text-gray-600">Manage student questions</div>
          </Link>
          
          <Link
            href="/lecturer/appointments"
            className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow text-center"
          >
            <div className="text-2xl mb-2">📅</div>
            <div className="font-medium text-gray-900">Appointments</div>
            <div className="text-sm text-gray-600">Manage office hours and meetings</div>
          </Link>
        </div>
      </div>
    </div>
  )
}
