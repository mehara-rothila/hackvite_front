// app/lecturer/availability/page.tsx
'use client'

import { useState } from 'react'

interface AvailabilitySlot {
  id: string
  day: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday'
  startTime: string
  endTime: string
  type: 'office-hours' | 'consultation' | 'open' | 'blocked'
  location: string
  maxBookings: number
  currentBookings: number
  isRecurring: boolean
  recurringPattern?: 'weekly' | 'biweekly' | 'monthly'
  notes?: string
  course?: string
  isActive: boolean
}

interface UnavailablePeriod {
  id: string
  title: string
  startDate: string
  endDate: string
  reason: string
  type: 'vacation' | 'conference' | 'meeting' | 'sick' | 'other'
}

const mockAvailability: AvailabilitySlot[] = [
  {
    id: '1',
    day: 'Monday',
    startTime: '14:00',
    endTime: '16:00',
    type: 'office-hours',
    location: 'Office 201B',
    maxBookings: 4,
    currentBookings: 2,
    isRecurring: true,
    recurringPattern: 'weekly',
    notes: 'General office hours for all courses',
    isActive: true
  },
  {
    id: '2',
    day: 'Wednesday',
    startTime: '14:00',
    endTime: '16:00',
    type: 'office-hours',
    location: 'Office 201B',
    maxBookings: 4,
    currentBookings: 3,
    isRecurring: true,
    recurringPattern: 'weekly',
    notes: 'General office hours for all courses',
    isActive: true
  },
  {
    id: '3',
    day: 'Tuesday',
    startTime: '10:00',
    endTime: '12:00',
    type: 'consultation',
    location: 'Office 201B',
    maxBookings: 3,
    currentBookings: 1,
    isRecurring: true,
    recurringPattern: 'weekly',
    notes: 'Project consultations - by appointment only',
    course: 'CS101',
    isActive: true
  },
  {
    id: '4',
    day: 'Friday',
    startTime: '09:00',
    endTime: '11:00',
    type: 'blocked',
    location: 'Conference Room A',
    maxBookings: 0,
    currentBookings: 0,
    isRecurring: true,
    recurringPattern: 'weekly',
    notes: 'Faculty meeting',
    isActive: true
  }
]

const mockUnavailable: UnavailablePeriod[] = [
  {
    id: '1',
    title: 'Academic Conference',
    startDate: '2025-08-15',
    endDate: '2025-08-17',
    reason: 'Attending AI Education Conference',
    type: 'conference'
  },
  {
    id: '2',
    title: 'Summer Break',
    startDate: '2025-12-20',
    endDate: '2025-01-05',
    reason: 'University winter break',
    type: 'vacation'
  }
]

const daysOfWeek: AvailabilitySlot['day'][] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
const slotTypes: AvailabilitySlot['type'][] = ['office-hours', 'consultation', 'open', 'blocked']
const locations = ['Office 201B', 'Conference Room A', 'Library Study Room', 'Online (Zoom)']
const unavailableTypes: UnavailablePeriod['type'][] = ['vacation', 'conference', 'meeting', 'sick', 'other'];


export default function LecturerAvailabilityPage() {
  const [availability, setAvailability] = useState<AvailabilitySlot[]>(mockAvailability)
  const [unavailablePeriods, setUnavailablePeriods] = useState<UnavailablePeriod[]>(mockUnavailable)
  const [showAddSlotModal, setShowAddSlotModal] = useState(false)
  const [showUnavailableModal, setShowUnavailableModal] = useState(false)
  const [selectedDay, setSelectedDay] = useState<string>('All')

  const [newSlot, setNewSlot] = useState<Partial<AvailabilitySlot>>({
    day: 'Monday',
    startTime: '14:00',
    endTime: '16:00',
    type: 'office-hours',
    location: 'Office 201B',
    maxBookings: 4,
    isRecurring: true,
    recurringPattern: 'weekly',
    isActive: true
  })

  const [newUnavailable, setNewUnavailable] = useState<Partial<UnavailablePeriod>>({
    title: '',
    startDate: '',
    endDate: '',
    reason: '',
    type: 'vacation'
  })

  const handleAddSlot = (e: React.FormEvent) => {
    e.preventDefault()
    const slot: AvailabilitySlot = {
      id: Date.now().toString(),
      day: newSlot.day!,
      startTime: newSlot.startTime!,
      endTime: newSlot.endTime!,
      type: newSlot.type!,
      location: newSlot.location!,
      maxBookings: newSlot.maxBookings!,
      currentBookings: 0,
      isRecurring: newSlot.isRecurring!,
      recurringPattern: newSlot.recurringPattern,
      notes: newSlot.notes,
      course: newSlot.course,
      isActive: true
    }
    
    setAvailability([...availability, slot])
    setNewSlot({
      day: 'Monday',
      startTime: '14:00',
      endTime: '16:00',
      type: 'office-hours',
      location: 'Office 201B',
      maxBookings: 4,
      isRecurring: true,
      recurringPattern: 'weekly',
      isActive: true
    })
    setShowAddSlotModal(false)
  }

  const handleAddUnavailable = (e: React.FormEvent) => {
    e.preventDefault()
    const period: UnavailablePeriod = {
      id: Date.now().toString(),
      title: newUnavailable.title!,
      startDate: newUnavailable.startDate!,
      endDate: newUnavailable.endDate!,
      reason: newUnavailable.reason!,
      type: newUnavailable.type!
    }
    
    setUnavailablePeriods([...unavailablePeriods, period])
    setNewUnavailable({
      title: '',
      startDate: '',
      endDate: '',
      reason: '',
      type: 'vacation'
    })
    setShowUnavailableModal(false)
  }

  const handleToggleSlot = (slotId: string) => {
    setAvailability(availability.map(slot => 
      slot.id === slotId ? { ...slot, isActive: !slot.isActive } : slot
    ))
  }

  const handleDeleteSlot = (slotId: string) => {
    if (confirm('Delete this availability slot?')) {
      setAvailability(availability.filter(slot => slot.id !== slotId))
    }
  }

  const handleDeleteUnavailable = (periodId: string) => {
    if (confirm('Delete this unavailable period?')) {
      setUnavailablePeriods(unavailablePeriods.filter(period => period.id !== periodId))
    }
  }

  const filteredSlots = selectedDay === 'All' 
    ? availability 
    : availability.filter(slot => slot.day === selectedDay)

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'office-hours': return 'bg-blue-100 text-blue-800'
      case 'consultation': return 'bg-green-100 text-green-800'
      case 'open': return 'bg-purple-100 text-purple-800'
      case 'blocked': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getUnavailableTypeColor = (type: string) => {
    switch (type) {
      case 'vacation': return 'bg-blue-100 text-blue-800'
      case 'conference': return 'bg-purple-100 text-purple-800'
      case 'meeting': return 'bg-yellow-100 text-yellow-800'
      case 'sick': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const totalSlots = availability.length
  const activeSlots = availability.filter(slot => slot.isActive).length
  const totalBookings = availability.reduce((sum, slot) => sum + slot.currentBookings, 0)
  const maxCapacity = availability.reduce((sum, slot) => sum + slot.maxBookings, 0)

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Availability Management</h1>
          <p className="text-gray-600">Set your office hours and manage your availability for student appointments</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="text-2xl font-bold text-blue-600">{activeSlots}</div>
            <div className="text-sm text-gray-600">Active Slots</div>
            <div className="text-xs text-gray-500">of {totalSlots} total</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="text-2xl font-bold text-green-600">{totalBookings}</div>
            <div className="text-sm text-gray-600">Current Bookings</div>
            <div className="text-xs text-gray-500">of {maxCapacity} capacity</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="text-2xl font-bold text-purple-600">{unavailablePeriods.length}</div>
            <div className="text-sm text-gray-600">Blocked Periods</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="text-2xl font-bold text-orange-600">
              {maxCapacity > 0 ? Math.round((totalBookings / maxCapacity) * 100) : 0}%
            </div>
            <div className="text-sm text-gray-600">Utilization Rate</div>
          </div>
        </div>

        {/* Controls */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <select
                value={selectedDay}
                onChange={(e) => setSelectedDay(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="All">All Days</option>
                {daysOfWeek.map(day => (
                  <option key={day} value={day}>{day}</option>
                ))}
              </select>
            </div>
            
            <div className="flex gap-2">
              <button
                onClick={() => setShowAddSlotModal(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                + Add Time Slot
              </button>
              <button
                onClick={() => setShowUnavailableModal(true)}
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
              >
                + Block Period
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Available Time Slots */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-4">Weekly Schedule</h2>
            
            {filteredSlots.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <div className="text-4xl mb-4">📅</div>
                <div>No availability slots found</div>
                <button
                  onClick={() => setShowAddSlotModal(true)}
                  className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                >
                  Add Your First Slot
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                {filteredSlots.map((slot) => (
                  <div key={slot.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <h3 className="font-medium text-gray-900">{slot.day}</h3>
                        <span className={`px-2 py-1 rounded text-xs ${getTypeColor(slot.type)}`}>
                          {slot.type.replace('-', ' ')}
                        </span>
                        <span className={`px-2 py-1 rounded text-xs ${
                          slot.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                        }`}>
                          {slot.isActive ? 'Active' : 'Inactive'}
                        </span>
                      </div>
                      
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleToggleSlot(slot.id)}
                          className={`px-3 py-1 rounded text-sm ${
                            slot.isActive 
                              ? 'bg-gray-50 text-gray-600 hover:bg-gray-100' 
                              : 'bg-green-50 text-green-600 hover:bg-green-100'
                          }`}
                        >
                          {slot.isActive ? 'Disable' : 'Enable'}
                        </button>
                        <button
                          onClick={() => handleDeleteSlot(slot.id)}
                          className="bg-red-50 text-red-600 px-3 py-1 rounded text-sm hover:bg-red-100"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                    
                    <div className="text-sm text-gray-600 space-y-1">
                      <div>Time: {slot.startTime} - {slot.endTime}</div>
                      <div>Location: {slot.location}</div>
                      <div>
                        Bookings: {slot.currentBookings}/{slot.maxBookings}
                        <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                          <div 
                            className="bg-blue-600 h-2 rounded-full" 
                            style={{width: `${(slot.currentBookings / slot.maxBookings) * 100}%`}}
                          ></div>
                        </div>
                      </div>
                      {slot.course && <div>Course: {slot.course}</div>}
                      {slot.notes && <div>Notes: {slot.notes}</div>}
                      {slot.isRecurring && (
                        <div>Repeats: {slot.recurringPattern}</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Unavailable Periods */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-4">Blocked Periods</h2>
            
            {unavailablePeriods.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <div className="text-4xl mb-4">🚫</div>
                <div>No blocked periods</div>
              </div>
            ) : (
              <div className="space-y-3">
                {unavailablePeriods.map((period) => (
                  <div key={period.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium text-gray-900">{period.title}</h3>
                      <div className="flex gap-2">
                        <span className={`px-2 py-1 rounded text-xs ${getUnavailableTypeColor(period.type)}`}>
                          {period.type}
                        </span>
                        <button
                          onClick={() => handleDeleteUnavailable(period.id)}
                          className="bg-red-50 text-red-600 px-3 py-1 rounded text-sm hover:bg-red-100"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                    <div className="text-sm text-gray-600 space-y-1">
                      <div>From: {new Date(period.startDate).toLocaleDateString()}</div>
                      <div>To: {new Date(period.endDate).toLocaleDateString()}</div>
                      <div>Reason: {period.reason}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Add Slot Modal */}
        {showAddSlotModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
              <h2 className="text-2xl font-bold mb-6">Add Availability Slot</h2>
              
              <form onSubmit={handleAddSlot} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Day</label>
                    <select
                      value={newSlot.day}
                      onChange={(e) => setNewSlot({...newSlot, day: e.target.value as AvailabilitySlot['day']})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    >
                      {daysOfWeek.map(day => (
                        <option key={day} value={day}>{day}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                    <select
                      value={newSlot.type}
                      onChange={(e) => setNewSlot({...newSlot, type: e.target.value as AvailabilitySlot['type']})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    >
                      {slotTypes.map(type => (
                        <option key={type} value={type}>{type.replace('-', ' ')}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Start Time</label>
                    <input
                      type="time"
                      value={newSlot.startTime}
                      onChange={(e) => setNewSlot({...newSlot, startTime: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">End Time</label>
                    <input
                      type="time"
                      value={newSlot.endTime}
                      onChange={(e) => setNewSlot({...newSlot, endTime: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                    <select
                      value={newSlot.location}
                      onChange={(e) => setNewSlot({...newSlot, location: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    >
                      {locations.map(location => (
                        <option key={location} value={location}>{location}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Max Bookings</label>
                    <input
                      type="number"
                      min="1"
                      max="10"
                      value={newSlot.maxBookings}
                      onChange={(e) => setNewSlot({...newSlot, maxBookings: parseInt(e.target.value)})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Notes (Optional)</label>
                  <textarea
                    value={newSlot.notes || ''}
                    onChange={(e) => setNewSlot({...newSlot, notes: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    rows={3}
                  />
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={newSlot.isRecurring}
                    onChange={(e) => setNewSlot({...newSlot, isRecurring: e.target.checked})}
                    className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label className="text-sm font-medium text-gray-700">Recurring weekly</label>
                </div>

                <div className="flex gap-4 pt-4">
                  <button
                    type="submit"
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
                  >
                    Add Slot
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowAddSlotModal(false)}
                    className="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-400"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Add Unavailable Period Modal */}
        {showUnavailableModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
              <h2 className="text-2xl font-bold mb-6">Block Period</h2>
              
              <form onSubmit={handleAddUnavailable} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                  <input
                    type="text"
                    required
                    value={newUnavailable.title}
                    onChange={(e) => setNewUnavailable({...newUnavailable, title: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., Summer Vacation"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                    <input
                      type="date"
                      required
                      value={newUnavailable.startDate}
                      onChange={(e) => setNewUnavailable({...newUnavailable, startDate: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                    <input
                      type="date"
                      required
                      value={newUnavailable.endDate}
                      onChange={(e) => setNewUnavailable({...newUnavailable, endDate: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                  <select
                    value={newUnavailable.type}
                    onChange={(e) => setNewUnavailable({...newUnavailable, type: e.target.value as UnavailablePeriod['type']})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    {unavailableTypes.map(type => (
                      <option key={type} value={type}>{type.charAt(0).toUpperCase() + type.slice(1)}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Reason</label>
                  <textarea
                    required
                    value={newUnavailable.reason}
                    onChange={(e) => setNewUnavailable({...newUnavailable, reason: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    rows={3}
                  />
                </div>

                <div className="flex gap-4 pt-4">
                  <button
                    type="submit"
                    className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700"
                  >
                    Block Period
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowUnavailableModal(false)}
                    className="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-400"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
