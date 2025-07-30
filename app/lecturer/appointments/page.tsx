// app/lecturer/availability/page.tsx - ENHANCED WITH GLASSMORPHISM & VECTOR ICONS
'use client'

import { useState } from 'react'

// --- Interfaces (Unchanged) ---
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

// --- Mock Data (Unchanged) ---
const mockAvailability: AvailabilitySlot[] = [
  { id: '1', day: 'Monday', startTime: '14:00', endTime: '16:00', type: 'office-hours', location: 'Office 201B', maxBookings: 4, currentBookings: 2, isRecurring: true, recurringPattern: 'weekly', notes: 'General office hours for all courses', isActive: true },
  { id: '2', day: 'Wednesday', startTime: '14:00', endTime: '16:00', type: 'office-hours', location: 'Office 201B', maxBookings: 4, currentBookings: 3, isRecurring: true, recurringPattern: 'weekly', notes: 'General office hours for all courses', isActive: true },
  { id: '3', day: 'Tuesday', startTime: '10:00', endTime: '12:00', type: 'consultation', location: 'Office 201B', maxBookings: 3, currentBookings: 1, isRecurring: true, recurringPattern: 'weekly', notes: 'Project consultations - by appointment only', course: 'CS101', isActive: true },
  { id: '4', day: 'Friday', startTime: '09:00', endTime: '11:00', type: 'blocked', location: 'Conference Room A', maxBookings: 0, currentBookings: 0, isRecurring: true, recurringPattern: 'weekly', notes: 'Faculty meeting', isActive: true }
]

const mockUnavailable: UnavailablePeriod[] = [
  { id: '1', title: 'Academic Conference', startDate: '2025-08-15', endDate: '2025-08-17', reason: 'Attending AI Education Conference', type: 'conference' },
  { id: '2', title: 'Summer Break', startDate: '2025-12-20', endDate: '2025-01-05', reason: 'University winter break', type: 'vacation' }
]

// --- Constants (Unchanged) ---
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

  const [newSlot, setNewSlot] = useState<Partial<AvailabilitySlot>>({ day: 'Monday', startTime: '14:00', endTime: '16:00', type: 'office-hours', location: 'Office 201B', maxBookings: 4, isRecurring: true, recurringPattern: 'weekly', isActive: true })
  const [newUnavailable, setNewUnavailable] = useState<Partial<UnavailablePeriod>>({ title: '', startDate: '', endDate: '', reason: '', type: 'vacation' })

  // --- Event Handlers (Functionality Unchanged) ---
  const handleAddSlot = (e: React.FormEvent) => {
    e.preventDefault()
    const slot: AvailabilitySlot = { id: Date.now().toString(), day: newSlot.day!, startTime: newSlot.startTime!, endTime: newSlot.endTime!, type: newSlot.type!, location: newSlot.location!, maxBookings: newSlot.maxBookings!, currentBookings: 0, isRecurring: newSlot.isRecurring!, recurringPattern: newSlot.recurringPattern, notes: newSlot.notes, course: newSlot.course, isActive: true }
    setAvailability([...availability, slot].sort((a, b) => daysOfWeek.indexOf(a.day) - daysOfWeek.indexOf(b.day)))
    setNewSlot({ day: 'Monday', startTime: '14:00', endTime: '16:00', type: 'office-hours', location: 'Office 201B', maxBookings: 4, isRecurring: true, recurringPattern: 'weekly', isActive: true })
    setShowAddSlotModal(false)
  }

  const handleAddUnavailable = (e: React.FormEvent) => {
    e.preventDefault()
    const period: UnavailablePeriod = { id: Date.now().toString(), title: newUnavailable.title!, startDate: newUnavailable.startDate!, endDate: newUnavailable.endDate!, reason: newUnavailable.reason!, type: newUnavailable.type! }
    setUnavailablePeriods([...unavailablePeriods, period])
    setNewUnavailable({ title: '', startDate: '', endDate: '', reason: '', type: 'vacation' })
    setShowUnavailableModal(false)
  }

  const handleToggleSlot = (slotId: string) => { setAvailability(availability.map(slot => slot.id === slotId ? { ...slot, isActive: !slot.isActive } : slot)) }
  const handleDeleteSlot = (slotId: string) => { if (confirm('Delete this availability slot?')) { setAvailability(availability.filter(slot => slot.id !== slotId)) } }
  const handleDeleteUnavailable = (periodId: string) => { if (confirm('Delete this unavailable period?')) { setUnavailablePeriods(unavailablePeriods.filter(period => period.id !== periodId)) } }

  // --- Filtering & Derived State (Unchanged) ---
  const filteredSlots = (selectedDay === 'All' ? availability : availability.filter(slot => slot.day === selectedDay)).sort((a, b) => daysOfWeek.indexOf(a.day) - daysOfWeek.indexOf(b.day))
  const totalSlots = availability.length
  const activeSlots = availability.filter(slot => slot.isActive).length
  const totalBookings = availability.reduce((sum, slot) => sum + slot.currentBookings, 0)
  const maxCapacity = availability.reduce((sum, slot) => sum + slot.maxBookings, 0)

  // --- Helper Functions for Styling ---
  const getTagColor = (type: 'slot' | 'unavailable', value: string) => {
    const colors = {
      slot: { 'office-hours': 'bg-blue-500/20 text-blue-700', consultation: 'bg-green-500/20 text-green-700', open: 'bg-purple-500/20 text-purple-700', blocked: 'bg-red-500/20 text-red-700', default: 'bg-gray-500/20 text-gray-700' },
      unavailable: { vacation: 'bg-blue-500/20 text-blue-700', conference: 'bg-purple-500/20 text-purple-700', meeting: 'bg-yellow-500/20 text-yellow-700', sick: 'bg-red-500/20 text-red-700', default: 'bg-gray-500/20 text-gray-700' }
    }
    return colors[type][value] || colors[type].default
  }

  return (
    <>
      {/* --- START: Global Styles & Animations --- */}
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
        .animate-slide-up-delayed-5 { animation: slide-up-delayed 0.8s ease-out 1.0s forwards; opacity: 0; }
        .animate-slide-up-delayed-6 { animation: slide-up-delayed 0.8s ease-out 1.2s forwards; opacity: 0; }
        .animate-slide-up-delayed-7 { animation: slide-up-delayed 0.8s ease-out 1.4s forwards; opacity: 0; }
        .animate-slide-up-delayed-8 { animation: slide-up-delayed 0.8s ease-out 1.6s forwards; opacity: 0; }
        .animate-slide-up-delayed-9 { animation: slide-up-delayed 0.8s ease-out 1.8s forwards; opacity: 0; }
        .floating-icon { animation: float 6s ease-in-out infinite; }
        .floating-icon-reverse { animation: float-reverse 7s ease-in-out infinite; }
        .floating-icon-slow { animation: float 10s ease-in-out infinite; }
        @keyframes float { 0% { transform: translateY(0) rotate(0deg); } 50% { transform: translateY(-15px) rotate(5deg); } 100% { transform: translateY(0) rotate(0deg); } }
        @keyframes float-reverse { 0% { transform: translateY(0) rotate(0deg); } 50% { transform: translateY(15px) rotate(-5deg); } 100% { transform: translateY(0) rotate(0deg); } }
        
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
        .glass-sidebar-card { 
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.88), rgba(255, 255, 255, 0.45)); 
          backdrop-filter: blur(36px) saturate(115%); 
          border: 1px solid rgba(255, 255, 255, 0.9); 
          box-shadow: 
            0 10px 36px rgba(31, 38, 135, 0.18), 
            0 0 0 1px rgba(255, 255, 255, 0.55) inset,
            0 3px 14px rgba(255, 255, 255, 0.85) inset; 
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
        
        {/* --- START: Multi-Layered Animated Background --- */}
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
          <div className="max-w-7xl mx-auto">
            
            {/* Header */}
            <div className="mb-6 animate-glass-fade-in">
              <div className="relative group">
                <div className="absolute -inset-2 bg-gradient-to-r from-blue-300/20 via-purple-300/30 to-pink-300/20 rounded-2xl blur-xl opacity-60 group-hover:opacity-80 transition-all duration-1000 animate-aurora-glow" />
                <div className="relative glass-premium-card rounded-2xl p-5">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white shadow-lg">
                      <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"/></svg>
                    </div>
                    <div>
                      <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent text-clean-shadow">
                        Availability Management
                      </h1>
                      <p className="text-gray-600 text-sm font-medium">Set your office hours and manage your availability for student appointments</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              {[
                { value: activeSlots, label: "Active Slots", sublabel: `of ${totalSlots} total`, icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>, color: "blue", bgColor: "from-blue-500 to-blue-600", delay: "animate-slide-up-delayed" },
                { value: totalBookings, label: "Bookings", sublabel: `of ${maxCapacity} capacity`, icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/></svg>, color: "green", bgColor: "from-green-500 to-green-600", delay: "animate-slide-up-delayed-2" },
                { value: unavailablePeriods.length, label: "Blocked Periods", icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm4.25-4.5l1.42 1.42-4.24 4.24-1.42-1.42z"/></svg>, color: "purple", bgColor: "from-purple-500 to-purple-600", delay: "animate-slide-up-delayed-3" },
                { value: `${maxCapacity > 0 ? Math.round((totalBookings / maxCapacity) * 100) : 0}%`, label: "Utilization", icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055zM20.488 9H15V3.512A9.025 9.025 0 0120.488 9z"/></svg>, color: "orange", bgColor: "from-orange-500 to-yellow-500", delay: "animate-slide-up-delayed-4" }
              ].map((stat) => (
                <div key={stat.label} className={`group ${stat.delay}`}>
                  <div className="relative overflow-hidden rounded-xl transition-all duration-500 hover:scale-105 hover:-translate-y-1">
                    <div className={`absolute -inset-1 bg-gradient-to-r ${stat.bgColor} rounded-xl blur-md opacity-20 group-hover:opacity-40 transition-all duration-500`} />
                    <div className="relative glass-stat-card rounded-xl group-hover:shadow-xl transition-all duration-500 p-3">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 bg-gradient-to-br ${stat.bgColor} rounded-lg flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>{stat.icon}</div>
                        <div className="flex-1 min-w-0">
                          <div className={`text-xl font-bold text-${stat.color}-600`}>{stat.value}</div>
                          <div className="text-xs text-gray-600 font-semibold leading-tight truncate">{stat.label}</div>
                          {stat.sublabel && <div className="text-xs text-gray-500 leading-tight truncate">{stat.sublabel}</div>}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Controls */}
            <div className="glass-sidebar-card rounded-2xl p-4 mb-6 animate-slide-up-delayed-5">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <select value={selectedDay} onChange={(e) => setSelectedDay(e.target.value)} className="glass-activity-card px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 border-none font-semibold text-gray-700">
                  <option value="All">All Days</option>
                  {daysOfWeek.map(day => <option key={day} value={day}>{day}</option>)}
                </select>
                <div className="flex gap-2">
                  <button onClick={() => setShowAddSlotModal(true)} className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-300 font-semibold shadow-md">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z"/></svg>
                    Add Time Slot
                  </button>
                  <button onClick={() => setShowUnavailableModal(true)} className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-300 font-semibold shadow-md">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11H7v-2h10v2z"/></svg>
                    Block Period
                  </button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Available Time Slots */}
              <div className="glass-card rounded-2xl p-6 animate-slide-up-delayed-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Weekly Schedule</h2>
                {filteredSlots.length === 0 ? (
                  <div className="text-center py-8 text-gray-500"><div className="text-4xl mb-4">📅</div><div>No availability slots found</div></div>
                ) : (
                  <div className="space-y-4">
                    {filteredSlots.map((slot) => (
                      <div key={slot.id} className="glass-activity-card rounded-lg p-4">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="font-bold text-lg text-gray-900">{slot.day}</h3>
                            <div className="flex items-center gap-2 mt-1">
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTagColor('slot', slot.type)}`}>{slot.type.replace('-', ' ')}</span>
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${slot.isActive ? 'bg-green-500/20 text-green-700' : 'bg-gray-500/20 text-gray-700'}`}>{slot.isActive ? 'Active' : 'Inactive'}</span>
                            </div>
                          </div>
                          <div className="flex flex-col gap-2">
                            <button onClick={() => handleToggleSlot(slot.id)} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors duration-300 bg-white/20 hover:bg-white/40 text-gray-800">{slot.isActive ? 'Disable' : 'Enable'}</button>
                            <button onClick={() => handleDeleteSlot(slot.id)} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors duration-300 bg-red-500/20 hover:bg-red-500/40 text-red-800">Delete</button>
                          </div>
                        </div>
                        <div className="text-sm text-gray-600 space-y-2 mt-3 border-t border-white/20 pt-3">
                          <div className="flex items-center gap-2"><svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm-1-13h2v6h-2zm4.25-4.5l1.42 1.42-4.24 4.24-1.42-1.42z"/></svg> {slot.startTime} - {slot.endTime}</div>
                          <div className="flex items-center gap-2"><svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg> {slot.location}</div>
                          <div>
                            <div className="flex items-center gap-2 mb-1"><svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/></svg> Bookings: {slot.currentBookings}/{slot.maxBookings}</div>
                            <div className="w-full bg-gray-200/50 rounded-full h-2"><div className="bg-gradient-to-r from-blue-400 to-blue-600 h-2 rounded-full" style={{width: `${(slot.currentBookings / slot.maxBookings) * 100}%`}}></div></div>
                          </div>
                          {slot.notes && <div className="flex items-start gap-2"><svg className="w-4 h-4 mt-0.5" fill="currentColor" viewBox="0 0 24 24"><path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/></svg> {slot.notes}</div>}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Unavailable Periods */}
              <div className="glass-card rounded-2xl p-6 animate-slide-up-delayed-7">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Blocked Periods</h2>
                {unavailablePeriods.length === 0 ? (
                  <div className="text-center py-8 text-gray-500"><div className="text-4xl mb-4">🚫</div><div>No blocked periods</div></div>
                ) : (
                  <div className="space-y-3">
                    {unavailablePeriods.map((period) => (
                      <div key={period.id} className="glass-activity-card rounded-lg p-4">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="font-semibold text-gray-900">{period.title}</h3>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTagColor('unavailable', period.type)}`}>{period.type}</span>
                          </div>
                          <button onClick={() => handleDeleteUnavailable(period.id)} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors duration-300 bg-red-500/20 hover:bg-red-500/40 text-red-800">Delete</button>
                        </div>
                        <div className="text-sm text-gray-600 space-y-1 border-t border-white/20 pt-2 mt-2">
                          <div>From: {new Date(period.startDate).toLocaleDateString()} To: {new Date(period.endDate).toLocaleDateString()}</div>
                          <div>Reason: {period.reason}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Modals */}
            {showAddSlotModal && (
              <div className="fixed inset-0 bg-black/50 backdrop-blur-md flex items-center justify-center z-50 p-4 animate-glass-fade-in">
                <div className="glass-premium-card rounded-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Add Availability Slot</h2>
                  <form onSubmit={handleAddSlot} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div><label className="block text-sm font-medium text-gray-700 mb-1">Day</label><select value={newSlot.day} onChange={(e) => setNewSlot({...newSlot, day: e.target.value as AvailabilitySlot['day']})} className="w-full glass-activity-card px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 border-none font-semibold text-gray-700">{daysOfWeek.map(day => <option key={day} value={day}>{day}</option>)}</select></div>
                      <div><label className="block text-sm font-medium text-gray-700 mb-1">Type</label><select value={newSlot.type} onChange={(e) => setNewSlot({...newSlot, type: e.target.value as AvailabilitySlot['type']})} className="w-full glass-activity-card px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 border-none font-semibold text-gray-700">{slotTypes.map(type => <option key={type} value={type}>{type.replace('-', ' ')}</option>)}</select></div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div><label className="block text-sm font-medium text-gray-700 mb-1">Start Time</label><input type="time" value={newSlot.startTime} onChange={(e) => setNewSlot({...newSlot, startTime: e.target.value})} className="w-full glass-activity-card px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 border-none font-semibold text-gray-700" /></div>
                      <div><label className="block text-sm font-medium text-gray-700 mb-1">End Time</label><input type="time" value={newSlot.endTime} onChange={(e) => setNewSlot({...newSlot, endTime: e.target.value})} className="w-full glass-activity-card px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 border-none font-semibold text-gray-700" /></div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div><label className="block text-sm font-medium text-gray-700 mb-1">Location</label><select value={newSlot.location} onChange={(e) => setNewSlot({...newSlot, location: e.target.value})} className="w-full glass-activity-card px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 border-none font-semibold text-gray-700">{locations.map(location => <option key={location} value={location}>{location}</option>)}</select></div>
                      <div><label className="block text-sm font-medium text-gray-700 mb-1">Max Bookings</label><input type="number" min="1" max="10" value={newSlot.maxBookings} onChange={(e) => setNewSlot({...newSlot, maxBookings: parseInt(e.target.value)})} className="w-full glass-activity-card px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 border-none font-semibold text-gray-700" /></div>
                    </div>
                    <div><label className="block text-sm font-medium text-gray-700 mb-1">Notes (Optional)</label><textarea value={newSlot.notes || ''} onChange={(e) => setNewSlot({...newSlot, notes: e.target.value})} className="w-full glass-activity-card px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 border-none font-semibold text-gray-700" rows={3} /></div>
                    <div className="flex items-center gap-2"><input type="checkbox" id="recurring" checked={newSlot.isRecurring} onChange={(e) => setNewSlot({...newSlot, isRecurring: e.target.checked})} className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" /><label htmlFor="recurring" className="text-sm font-medium text-gray-700">Recurring weekly</label></div>
                    <div className="flex gap-4 pt-4"><button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors shadow-md">Add Slot</button><button type="button" onClick={() => setShowAddSlotModal(false)} className="bg-white/20 text-gray-800 px-6 py-2 rounded-lg hover:bg-white/40 transition-colors">Cancel</button></div>
                  </form>
                </div>
              </div>
            )}
            {showUnavailableModal && (
              <div className="fixed inset-0 bg-black/50 backdrop-blur-md flex items-center justify-center z-50 p-4 animate-glass-fade-in">
                <div className="glass-premium-card rounded-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Block Period</h2>
                  <form onSubmit={handleAddUnavailable} className="space-y-4">
                    <div><label className="block text-sm font-medium text-gray-700 mb-1">Title</label><input type="text" required value={newUnavailable.title} onChange={(e) => setNewUnavailable({...newUnavailable, title: e.target.value})} className="w-full glass-activity-card px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 border-none font-semibold text-gray-700" placeholder="e.g., Summer Vacation" /></div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div><label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label><input type="date" required value={newUnavailable.startDate} onChange={(e) => setNewUnavailable({...newUnavailable, startDate: e.target.value})} className="w-full glass-activity-card px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 border-none font-semibold text-gray-700" /></div>
                      <div><label className="block text-sm font-medium text-gray-700 mb-1">End Date</label><input type="date" required value={newUnavailable.endDate} onChange={(e) => setNewUnavailable({...newUnavailable, endDate: e.target.value})} className="w-full glass-activity-card px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 border-none font-semibold text-gray-700" /></div>
                    </div>
                    <div><label className="block text-sm font-medium text-gray-700 mb-1">Type</label><select value={newUnavailable.type} onChange={(e) => setNewUnavailable({...newUnavailable, type: e.target.value as UnavailablePeriod['type']})} className="w-full glass-activity-card px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 border-none font-semibold text-gray-700">{unavailableTypes.map(type => <option key={type} value={type}>{type.charAt(0).toUpperCase() + type.slice(1)}</option>)}</select></div>
                    <div><label className="block text-sm font-medium text-gray-700 mb-1">Reason</label><textarea required value={newUnavailable.reason} onChange={(e) => setNewUnavailable({...newUnavailable, reason: e.target.value})} className="w-full glass-activity-card px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 border-none font-semibold text-gray-700" rows={3} /></div>
                    <div className="flex gap-4 pt-4"><button type="submit" className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors shadow-md">Block Period</button><button type="button" onClick={() => setShowUnavailableModal(false)} className="bg-white/20 text-gray-800 px-6 py-2 rounded-lg hover:bg-white/40 transition-colors">Cancel</button></div>
                  </form>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}