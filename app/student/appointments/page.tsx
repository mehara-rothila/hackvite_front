// app/student/appointments/page.tsx - FIXED WITH SUSPENSE
'use client'

import { useState, useEffect, Suspense } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

// --- Interfaces (Unchanged) ---
interface Appointment {
  id: string
  lecturer: string
  lecturerEmail: string
  subject: string
  description: string
  date: string
  time: string
  duration: number // minutes
  location: string
  type: 'office-hours' | 'consultation' | 'project-discussion' | 'exam-review'
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed'
  meetingLink?: string
  notes?: string
  bookedAt: string
}

interface TimeSlot {
  id: string
  lecturer: string
  date: string
  time: string
  duration: number
  available: boolean
  location: string
  type: 'office-hours' | 'consultation' | 'project-discussion' | 'exam-review'
}

// --- Mock Data (Unchanged) ---
const mockAppointments: Appointment[] = [
  {
    id: '1',
    lecturer: 'Dr. Sarah Johnson',
    lecturerEmail: 'sarah.johnson@university.edu',
    subject: 'Assignment 3 Discussion',
    description: 'Need help understanding the sorting algorithm requirements',
    date: '2025-07-28',
    time: '14:00',
    duration: 30,
    location: 'Office 201B',
    type: 'office-hours',
    status: 'confirmed',
    notes: 'Bring your code and any specific questions',
    bookedAt: '2025-07-26 10:30'
  },
  {
    id: '2',
    lecturer: 'Prof. Michael Chen',
    lecturerEmail: 'michael.chen@university.edu',
    subject: 'Calculus Review Session',
    description: 'Review derivatives and integration techniques',
    date: '2025-07-29',
    time: '10:00',
    duration: 45,
    location: 'Office 301A',
    type: 'consultation',
    status: 'pending',
    bookedAt: '2025-07-26 15:20'
  },
  {
    id: '3',
    lecturer: 'Dr. Sarah Johnson',
    lecturerEmail: 'sarah.johnson@university.edu',
    subject: 'Project Proposal Review',
    description: 'Final project proposal discussion and feedback',
    date: '2025-07-25',
    time: '16:00',
    duration: 30,
    location: 'Office 201B',
    type: 'project-discussion',
    status: 'completed',
    notes: 'Great proposal! Make sure to include the testing plan.',
    bookedAt: '2025-07-23 09:15'
  }
]

const mockAvailableSlots: TimeSlot[] = [
  { id: 'slot1', lecturer: 'Dr. Sarah Johnson', date: '2025-07-29', time: '09:00', duration: 30, available: true, location: 'Office 201B', type: 'office-hours' },
  { id: 'slot2', lecturer: 'Dr. Sarah Johnson', date: '2025-07-29', time: '09:30', duration: 30, available: true, location: 'Office 201B', type: 'office-hours' },
  { id: 'slot3', lecturer: 'Prof. Michael Chen', date: '2025-07-30', time: '14:00', duration: 45, available: true, location: 'Office 301A', type: 'consultation' },
  { id: 'slot4', lecturer: 'Dr. Emily Roberts', date: '2025-07-30', time: '11:00', duration: 30, available: true, location: 'Office 105C', type: 'office-hours' }
]

const lecturers = ['All', 'Dr. Sarah Johnson', 'Prof. Michael Chen', 'Dr. Emily Roberts']
const appointmentTypes = ['All', 'Office Hours', 'Consultation', 'Project Discussion', 'Exam Review']
const statusFilters = ['All', 'Pending', 'Confirmed', 'Cancelled', 'Completed']

// Separate the component that uses useSearchParams
function AppointmentsContent() {
  const searchParams = useSearchParams()
  const [appointments, setAppointments] = useState<Appointment[]>(mockAppointments)
  const [availableSlots, setAvailableSlots] = useState<TimeSlot[]>(mockAvailableSlots)
  const [showBookingForm, setShowBookingForm] = useState(false)
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null)
  const [lecturerFilter, setLecturerFilter] = useState(searchParams?.get('lecturer') || 'All')
  const [statusFilter, setStatusFilter] = useState('All')
  const [typeFilter, setTypeFilter] = useState('All')
  const [modal, setModal] = useState<{ type: 'confirm' | 'alert'; message: string; onConfirm?: () => void; } | null>(null);

  const [bookingForm, setBookingForm] = useState({
    subject: '',
    description: '',
    type: 'office-hours' as Appointment['type']
  })

  useEffect(() => {
    if (searchParams?.get('lecturer')) {
      setLecturerFilter(searchParams.get('lecturer') || 'All')
    }
  }, [searchParams])

  const handleBookAppointment = (slot: TimeSlot) => {
    setSelectedSlot(slot)
    setBookingForm({
      subject: '',
      description: '',
      type: slot.type as Appointment['type']
    })
    setShowBookingForm(true)
  }

  const handleSubmitBooking = (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedSlot) return
    const newAppointment: Appointment = {
      id: Date.now().toString(),
      lecturer: selectedSlot.lecturer,
      lecturerEmail: `${selectedSlot.lecturer.toLowerCase().replace(/\s+/g, '.')}@university.edu`,
      subject: bookingForm.subject,
      description: bookingForm.description,
      date: selectedSlot.date,
      time: selectedSlot.time,
      duration: selectedSlot.duration,
      location: selectedSlot.location,
      type: bookingForm.type,
      status: 'pending',
      bookedAt: new Date().toLocaleString()
    }
    setAppointments([newAppointment, ...appointments])
    setAvailableSlots(availableSlots.filter(slot => slot.id !== selectedSlot.id))
    setShowBookingForm(false)
    setSelectedSlot(null)
    setBookingForm({ subject: '', description: '', type: 'office-hours' })
    setModal({ type: 'alert', message: 'Appointment booked successfully! It is now pending confirmation.' });
  }

  const handleCancelAppointment = (appointmentId: string) => {
    setModal({
        type: 'confirm',
        message: 'Are you sure you want to cancel this appointment?',
        onConfirm: () => {
            setAppointments(appointments.map(apt => apt.id === appointmentId ? { ...apt, status: 'cancelled' as const } : apt));
            setModal(null);
        }
    });
  }

  const handleRescheduleAppointment = () => {
    setModal({ type: 'alert', message: 'Reschedule functionality will be implemented in a future update.' });
  }

  const filteredAppointments = appointments.filter(appointment => {
    const matchesLecturer = lecturerFilter === 'All' || appointment.lecturer === lecturerFilter
    const matchesStatus = statusFilter === 'All' || appointment.status === statusFilter.toLowerCase()
    const matchesType = typeFilter === 'All' || appointment.type === typeFilter.toLowerCase().replace(' ', '-') as Appointment['type']
    return matchesLecturer && matchesStatus && matchesType
  })

  const filteredSlots = availableSlots.filter(slot => (lecturerFilter === 'All' || slot.lecturer === lecturerFilter) && slot.available)

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'confirmed': return 'bg-green-100 text-green-800'
      case 'cancelled': return 'bg-red-100 text-red-800'
      case 'completed': return 'bg-blue-100 text-blue-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'office-hours': return 'bg-blue-100 text-blue-800'
      case 'consultation': return 'bg-purple-100 text-purple-800'
      case 'project-discussion': return 'bg-green-100 text-green-800'
      case 'exam-review': return 'bg-orange-100 text-orange-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const upcomingAppointments = appointments.filter(apt => (apt.status === 'confirmed' || apt.status === 'pending') && new Date(`${apt.date} ${apt.time}`) > new Date())
  const glassInputStyles = "w-full px-4 py-2 border rounded-lg transition-all duration-300 focus:ring-2 focus:ring-blue-500 bg-white/60 border-gray-300/70 focus:bg-white/80 text-gray-800"

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
        .animate-slide-up-delayed-4 { animation: slide-up-delayed 0.8s ease-out 0.8s forwards; opacity: 0; }
        
        /* Enhanced Glassmorphism Card Styles */
        .glass-card { background: linear-gradient(135deg, rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.4)); backdrop-filter: blur(32px); border: 1px solid rgba(255, 255, 255, 0.9); box-shadow: 0 8px 32px rgba(31, 38, 135, 0.15), 0 0 0 1px rgba(255, 255, 255, 0.5) inset, 0 2px 8px rgba(255, 255, 255, 0.7) inset; }
        .glass-stat-card { background: linear-gradient(135deg, rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 0.3)); backdrop-filter: blur(24px); border: 1px solid rgba(255, 255, 255, 0.8); box-shadow: 0 6px 24px rgba(31, 38, 135, 0.1), 0 0 0 1px rgba(255, 255, 255, 0.4) inset; }
        .glass-activity-card { background: linear-gradient(135deg, rgba(255, 255, 255, 0.6), rgba(255, 255, 255, 0.2)); backdrop-filter: blur(20px); border: 1px solid rgba(255, 255, 255, 0.7); box-shadow: 0 4px 16px rgba(31, 38, 135, 0.08), 0 0 0 1px rgba(255, 255, 255, 0.3) inset; }
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
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="mb-8 animate-glass-fade-in">
              <div className="relative group">
                <div className="absolute -inset-2 bg-gradient-to-r from-blue-300/20 via-purple-300/30 to-pink-300/20 rounded-2xl blur-xl opacity-60 group-hover:opacity-80 transition-all duration-1000 animate-aurora-glow" />
                <div className="relative glass-card rounded-2xl p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center text-white text-2xl font-bold shadow-lg">📅</div>
                    <div>
                      <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent text-clean-shadow mb-1">My Appointments</h1>
                      <p className="text-gray-600">Book and manage your appointments with lecturers</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <div className="glass-stat-card p-4 rounded-xl animate-slide-up-delayed"><div className="text-3xl font-bold text-blue-600">{upcomingAppointments.length}</div><div className="text-sm text-blue-800 font-semibold">Upcoming</div></div>
              <div className="glass-stat-card p-4 rounded-xl animate-slide-up-delayed-2"><div className="text-3xl font-bold text-yellow-600">{appointments.filter(apt => apt.status === 'pending').length}</div><div className="text-sm text-yellow-800 font-semibold">Pending Confirmation</div></div>
              <div className="glass-stat-card p-4 rounded-xl animate-slide-up-delayed-3"><div className="text-3xl font-bold text-green-600">{appointments.filter(apt => apt.status === 'completed').length}</div><div className="text-sm text-green-800 font-semibold">Completed</div></div>
              <div className="glass-stat-card p-4 rounded-xl animate-slide-up-delayed-4"><div className="text-3xl font-bold text-purple-600">{availableSlots.length}</div><div className="text-sm text-purple-800 font-semibold">Available Slots</div></div>
            </div>

            {/* Filters */}
            <div className="glass-card rounded-2xl p-6 mb-6 animate-slide-up-delayed-2">
              <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                <div className="flex flex-col sm:flex-row gap-4 flex-1">
                  <select value={lecturerFilter} onChange={(e) => setLecturerFilter(e.target.value)} className={glassInputStyles}>{lecturers.map(lecturer => (<option key={lecturer} value={lecturer}>{lecturer}</option>))}</select>
                  <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className={glassInputStyles}>{statusFilters.map(status => (<option key={status} value={status}>{status}</option>))}</select>
                  <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)} className={glassInputStyles}>{appointmentTypes.map(type => (<option key={type} value={type}>{type}</option>))}</select>
                </div>
                <button onClick={() => setShowBookingForm(true)} className="px-4 py-2 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg">Book New Appointment</button>
              </div>
            </div>

            {/* Appointments List */}
            <div className="space-y-4">
              {filteredAppointments.length === 0 ? (
                <div className="glass-card rounded-2xl p-12 text-center">
                  <div className="text-6xl mb-4">🗓️</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">No Appointments Found</h3>
                  <p className="text-gray-600 mb-6">Try adjusting your filters or book a new appointment.</p>
                  <button onClick={() => setShowBookingForm(true)} className="bg-blue-500 text-white px-5 py-2.5 rounded-lg font-semibold hover:bg-blue-600 transition-colors shadow-md">Book Your First Appointment</button>
                </div>
              ) : (
                filteredAppointments.map((appointment) => (
                  <div key={appointment.id} className="glass-activity-card rounded-lg p-6 hover:shadow-xl hover:scale-[1.01] transition-all duration-300">
                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2 flex-wrap">
                          <h3 className="text-lg font-semibold text-gray-900">{appointment.subject}</h3>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(appointment.status)}`}>{appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}</span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(appointment.type)}`}>{appointment.type.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}</span>
                        </div>
                        <p className="text-gray-700 mb-4">{appointment.description}</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-gray-600">
                          <div><strong className="text-gray-800">Lecturer:</strong><br />{appointment.lecturer}</div>
                          <div><strong className="text-gray-800">Date & Time:</strong><br />{appointment.date} at {appointment.time}</div>
                          <div><strong className="text-gray-800">Duration:</strong><br />{appointment.duration} minutes</div>
                          <div><strong className="text-gray-800">Location:</strong><br />{appointment.location}</div>
                        </div>
                        {appointment.notes && (<div className="mt-4 p-3 bg-blue-500/10 rounded-lg"><div className="text-sm font-medium text-blue-900">Notes:</div><div className="text-sm text-blue-800">{appointment.notes}</div></div>)}
                      </div>
                      <div className="flex flex-col gap-2 w-full lg:w-auto flex-shrink-0">
                        {appointment.status === 'confirmed' && new Date(`${appointment.date} ${appointment.time}`) > new Date() && (
                          <>
                            <button onClick={() => handleRescheduleAppointment()} className="bg-blue-100/80 text-blue-700 px-4 py-2 rounded-lg hover:bg-blue-100 transition-colors text-sm font-medium">📅 Reschedule</button>
                            <button onClick={() => handleCancelAppointment(appointment.id)} className="bg-red-100/80 text-red-700 px-4 py-2 rounded-lg hover:bg-red-100 transition-colors text-sm font-medium">❌ Cancel</button>
                          </>
                        )}
                        {appointment.status === 'pending' && (<div className="text-xs text-yellow-700 font-semibold text-center p-2 bg-yellow-100/80 rounded-lg">Waiting for confirmation</div>)}
                        <Link href={`mailto:${appointment.lecturerEmail}?subject=Re: ${appointment.subject}`} className="bg-green-100/80 text-green-700 px-4 py-2 rounded-lg hover:bg-green-100 transition-colors text-sm text-center font-medium">✉️ Email Lecturer</Link>
                        {appointment.meetingLink && (<a href={appointment.meetingLink} target="_blank" rel="noopener noreferrer" className="bg-purple-100/80 text-purple-700 px-4 py-2 rounded-lg hover:bg-purple-100 transition-colors text-sm text-center font-medium">🎥 Join Meeting</a>)}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Booking Form Modal */}
            {showBookingForm && (
              <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-glass-fade-in">
                <div className="glass-card rounded-2xl p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
                  <h2 className="text-2xl font-bold mb-6 text-gray-900">Book New Appointment</h2>
                  {!selectedSlot ? (
                    <div>
                      <h3 className="text-lg font-semibold mb-4 text-gray-800">Available Time Slots</h3>
                      <div className="space-y-3 mb-6">
                        {filteredSlots.map((slot) => (
                          <div key={slot.id} className="glass-activity-card p-4 rounded-lg hover:shadow-md transition-shadow">
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                              <div>
                                <div className="font-medium text-gray-900">{slot.lecturer}</div>
                                <div className="text-sm text-gray-600">{slot.date} at {slot.time} ({slot.duration} mins)</div>
                                <div className="text-sm text-gray-500">{slot.location}</div>
                                <span className={`inline-block mt-1 px-2 py-1 rounded text-xs ${getTypeColor(slot.type)}`}>{slot.type.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}</span>
                              </div>
                              <button onClick={() => handleBookAppointment(slot)} className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-2 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105 font-semibold">Book This Slot</button>
                            </div>
                          </div>
                        ))}
                      </div>
                      {filteredSlots.length === 0 && (<div className="text-center py-8 text-gray-500"><div className="text-4xl mb-4">📅</div><div>No available slots found</div><div className="text-sm text-gray-400 mt-2">Try adjusting your lecturer filter</div></div>)}
                      <div className="flex justify-end pt-4 border-t border-white/30"><button onClick={() => setShowBookingForm(false)} className="bg-white/70 text-gray-700 px-6 py-2 rounded-lg hover:bg-white/90 transition-colors shadow-sm border border-gray-300/50 font-semibold">Close</button></div>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmitBooking} className="space-y-6">
                      <div className="p-4 bg-blue-500/10 rounded-lg border border-blue-500/20"><h3 className="font-medium text-blue-900">Selected Time Slot</h3><div className="text-sm text-blue-800">{selectedSlot.lecturer} - {selectedSlot.date} at {selectedSlot.time} ({selectedSlot.duration} minutes)</div><div className="text-sm text-blue-600">{selectedSlot.location}</div></div>
                      <div><label className="block text-sm font-medium text-gray-700 mb-1">Subject</label><input type="text" required value={bookingForm.subject} onChange={(e) => setBookingForm({...bookingForm, subject: e.target.value})} className={glassInputStyles} placeholder="Brief subject for your appointment" /></div>
                      <div><label className="block text-sm font-medium text-gray-700 mb-1">Description</label><textarea rows={4} value={bookingForm.description} onChange={(e) => setBookingForm({...bookingForm, description: e.target.value})} className={glassInputStyles} placeholder="Please describe what you'd like to discuss..." /></div>
                      <div><label className="block text-sm font-medium text-gray-700 mb-1">Appointment Type</label><select value={bookingForm.type} onChange={(e) => setBookingForm({...bookingForm, type: e.target.value as Appointment['type']})} className={glassInputStyles}><option value="office-hours">Office Hours</option><option value="consultation">Consultation</option><option value="project-discussion">Project Discussion</option><option value="exam-review">Exam Review</option></select></div>
                      <div className="flex flex-wrap gap-4 pt-4 border-t border-white/30">
                        <button type="submit" className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105 font-semibold">Confirm Booking</button>
                        <button type="button" onClick={() => setSelectedSlot(null)} className="bg-white/70 text-gray-700 px-6 py-2 rounded-lg hover:bg-white/90 transition-colors shadow-sm border border-gray-300/50 font-semibold">← Back to Slots</button>
                        <button type="button" onClick={() => { setSelectedSlot(null); setShowBookingForm(false); }} className="bg-red-100/80 text-red-700 px-6 py-2 rounded-lg hover:bg-red-100 transition-colors font-semibold ml-auto">Cancel</button>
                      </div>
                    </form>
                  )}
                </div>
              </div>
            )}

            {/* Modal for Alerts and Confirmations */}
            {modal && (
                <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center animate-glass-fade-in">
                    <div className="glass-card rounded-2xl p-6 w-full max-w-sm text-center">
                        <h3 className="text-lg font-bold text-gray-900 mb-4">{modal.type === 'confirm' ? 'Confirm Action' : 'Notification'}</h3>
                        <p className="text-gray-600 mb-6">{modal.message}</p>
                        <div className="flex justify-center gap-4">
                            {modal.type === 'confirm' && (
                                <button
                                    onClick={() => setModal(null)}
                                    className="bg-white/70 text-gray-700 px-5 py-2 rounded-lg hover:bg-white/90 transition-colors shadow-sm border border-gray-300/50"
                                >
                                    Cancel
                                </button>
                            )}
                            <button
                                onClick={() => {
                                    if (modal.onConfirm) modal.onConfirm();
                                    else setModal(null);
                                }}
                                className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-5 py-2 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-md hover:shadow-lg"
                            >
                                {modal.type === 'confirm' ? 'Confirm' : 'OK'}
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

// Loading component
function AppointmentsLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <div className="glass-card rounded-2xl p-8 text-center">
        <div className="text-4xl mb-4">📅</div>
        <div className="text-lg font-semibold text-gray-900 mb-2">Loading Appointments...</div>
        <div className="text-gray-600">Please wait while we fetch your data.</div>
      </div>
    </div>
  )
}

// Main page component with Suspense wrapper
export default function StudentAppointmentsPage() {
  return (
    <Suspense fallback={<AppointmentsLoading />}>
      <AppointmentsContent />
    </Suspense>
  )
}