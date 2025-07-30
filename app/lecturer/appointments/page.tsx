// app/lecturer/appointments/page.tsx - ENHANCED WITH GLASSMORPHISM & VECTOR ICONS
'use client'

import { useState } from 'react'
import Link from 'next/link'

interface Appointment {
  id: string
  student: string
  studentEmail: string
  studentAvatar: string
  subject: string
  description: string
  date: string
  time: string
  duration: number // minutes
  location: string
  type: 'office-hours' | 'consultation' | 'project-discussion' | 'exam-review'
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed'
  bookedAt: string
  notes?: string
  course: string
}

interface TimeSlot {
  id: string
  date: string
  time: string
  duration: number
  location: string
  type: string
  isAvailable: boolean
  isRecurring: boolean
  recurringPattern?: 'weekly' | 'biweekly' | 'monthly'
}

const mockAppointments: Appointment[] = [
  {
    id: '1',
    student: 'Alice Johnson',
    studentEmail: 'alice.johnson@university.edu',
    studentAvatar: '👩‍🎓',
    subject: 'Assignment 3 Discussion',
    description: 'Need help understanding the sorting algorithm requirements and implementation details',
    date: '2025-07-28',
    time: '14:00',
    duration: 30,
    location: 'Office 201B',
    type: 'office-hours',
    status: 'confirmed',
    bookedAt: '2025-07-26 10:30',
    course: 'CS101',
    notes: 'Student seems confused about time complexity'
  },
  {
    id: '2',
    student: 'Bob Smith',
    studentEmail: 'bob.smith@university.edu',
    studentAvatar: '👨‍🎓',
    subject: 'Final Project Proposal',
    description: 'Want to discuss my final project idea and get approval for the topic',
    date: '2025-07-29',
    time: '10:00',
    duration: 45,
    location: 'Office 201B',
    type: 'project-discussion',
    status: 'pending',
    bookedAt: '2025-07-26 15:20',
    course: 'CS101'
  },
  {
    id: '3',
    student: 'Carol Davis',
    studentEmail: 'carol.davis@university.edu',
    studentAvatar: '👩‍🎓',
    subject: 'Midterm Preparation',
    description: 'Review key concepts and practice problems for the upcoming midterm exam',
    date: '2025-07-30',
    time: '16:00',
    duration: 30,
    location: 'Office 201B',
    type: 'exam-review',
    status: 'confirmed',
    bookedAt: '2025-07-25 12:45',
    course: 'CS101'
  },
  {
    id: '4',
    student: 'David Wilson',
    studentEmail: 'david.wilson@university.edu',
    studentAvatar: '👨‍🎓',
    subject: 'Research Opportunities',
    description: 'Interested in discussing potential research opportunities and requirements',
    date: '2025-07-25',
    time: '15:00',
    duration: 60,
    location: 'Office 201B',
    type: 'consultation',
    status: 'completed',
    bookedAt: '2025-07-23 09:15',
    course: 'CS101',
    notes: 'Excellent student, recommended for advanced research track'
  }
]

const mockTimeSlots: TimeSlot[] = [
  {
    id: 'slot1',
    date: '2025-07-29',
    time: '09:00',
    duration: 30,
    location: 'Office 201B',
    type: 'office-hours',
    isAvailable: true,
    isRecurring: true,
    recurringPattern: 'weekly'
  },
  {
    id: 'slot2',
    date: '2025-07-29',
    time: '09:30',
    duration: 30,
    location: 'Office 201B',
    type: 'office-hours',
    isAvailable: true,
    isRecurring: true,
    recurringPattern: 'weekly'
  },
  {
    id: 'slot3',
    date: '2025-07-30',
    time: '14:00',
    duration: 45,
    location: 'Office 201B',
    type: 'consultation',
    isAvailable: true,
    isRecurring: false
  }
]

const statusFilters = ['All', 'Pending', 'Confirmed', 'Cancelled', 'Completed']
const typeFilters = ['All', 'Office Hours', 'Consultation', 'Project Discussion', 'Exam Review']
const courses = ['All', 'CS101', 'CS201', 'MATH202']

export default function LecturerAppointmentsPage() {
  const [appointments, setAppointments] = useState<Appointment[]>(mockAppointments)
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>(mockTimeSlots)
  const [currentView, setCurrentView] = useState<'appointments' | 'availability'>('appointments')
  const [statusFilter, setStatusFilter] = useState('All')
  const [typeFilter, setTypeFilter] = useState('All')
  const [courseFilter, setCourseFilter] = useState('All')
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0])
  const [showAddSlotModal, setShowAddSlotModal] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')

  // Add time slot form state
  const [newSlot, setNewSlot] = useState({
    date: '',
    time: '',
    duration: 30,
    location: 'Office 201B',
    type: 'office-hours',
    isRecurring: false,
    recurringPattern: 'weekly' as 'weekly' | 'biweekly' | 'monthly'
  })

  const handleStatusChange = (appointmentId: string, newStatus: Appointment['status']) => {
    setAppointments(appointments.map(apt => 
      apt.id === appointmentId 
        ? { ...apt, status: newStatus }
        : apt
    ))
  }

  const handleAddNotes = (appointmentId: string, notes: string) => {
    setAppointments(appointments.map(apt => 
      apt.id === appointmentId 
        ? { ...apt, notes }
        : apt
    ))
  }

  const handleRescheduleAppointment = () => {
    // In real app, this would open a reschedule modal
    alert('Reschedule functionality would be implemented here')
  }

  const handleAddTimeSlot = (e: React.FormEvent) => {
    e.preventDefault()
    
    const slot: TimeSlot = {
      id: Date.now().toString(),
      ...newSlot,
      isAvailable: true
    }
    
    setTimeSlots([...timeSlots, slot])
    setNewSlot({
      date: '',
      time: '',
      duration: 30,
      location: 'Office 201B',
      type: 'office-hours',
      isRecurring: false,
      recurringPattern: 'weekly'
    })
    setShowAddSlotModal(false)
  }

  const handleDeleteTimeSlot = (slotId: string) => {
    if (confirm('Delete this time slot?')) {
      setTimeSlots(timeSlots.filter(slot => slot.id !== slotId))
    }
  }

  const handleToggleSlotAvailability = (slotId: string) => {
    setTimeSlots(timeSlots.map(slot => 
      slot.id === slotId 
        ? { ...slot, isAvailable: !slot.isAvailable }
        : slot
    ))
  }

  // Filter appointments
  const filteredAppointments = appointments.filter(appointment => {
    const matchesSearch = appointment.student.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         appointment.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         appointment.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'All' || appointment.status === statusFilter.toLowerCase()
    const matchesType = typeFilter === 'All' || 
                       appointment.type === typeFilter.toLowerCase().replace(/ /g, '-')
    const matchesCourse = courseFilter === 'All' || appointment.course === courseFilter
    
    return matchesSearch && matchesStatus && matchesType && matchesCourse
  })

  // Filter time slots by date
  const filteredTimeSlots = timeSlots.filter(slot => 
    !selectedDate || slot.date === selectedDate
  )

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'confirmed': return 'bg-green-100 text-green-800 border-green-200'
      case 'cancelled': return 'bg-red-100 text-red-800 border-red-200'
      case 'completed': return 'bg-blue-100 text-blue-800 border-blue-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'office-hours': return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'consultation': return 'bg-purple-100 text-purple-800 border-purple-200'
      case 'project-discussion': return 'bg-green-100 text-green-800 border-green-200'
      case 'exam-review': return 'bg-orange-100 text-orange-800 border-orange-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const todayAppointments = appointments.filter(apt => 
    apt.date === new Date().toISOString().split('T')[0] && 
    (apt.status === 'confirmed' || apt.status === 'pending')
  )

  const upcomingAppointments = appointments.filter(apt => 
    new Date(`${apt.date} ${apt.time}`) > new Date() && 
    (apt.status === 'confirmed' || apt.status === 'pending')
  )

  const pendingCount = appointments.filter(apt => apt.status === 'pending').length

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
        .glass-input {
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 0.2));
          backdrop-filter: blur(10px) saturate(100%);
          border: 1px solid rgba(255, 255, 255, 0.5);
          box-shadow: 0 2px 8px rgba(31, 38, 135, 0.05), 0 0 0 1px rgba(255, 255, 255, 0.3) inset;
          color: #374151; /* text-gray-700 */
        }
        .glass-input::placeholder {
          color: #6b7280; /* text-gray-500 */
        }
        .glass-input:focus {
          outline: none;
          box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.5), 0 2px 8px rgba(31, 38, 135, 0.1);
        }
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
            <div className="mb-8 animate-glass-fade-in">
              <div className="relative group">
                <div className="absolute -inset-2 bg-gradient-to-r from-blue-300/20 via-purple-300/30 to-pink-300/20 rounded-2xl blur-xl opacity-60 group-hover:opacity-80 transition-all duration-1000 animate-aurora-glow" />
                <div className="relative glass-premium-card rounded-2xl p-5">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white shadow-lg">
                      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                    </div>
                    <div>
                      <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent text-clean-shadow">
                        Appointment Management
                      </h1>
                      <p className="text-gray-600 text-sm font-medium">Manage your appointments and availability for students</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-6">
              {[
                { value: todayAppointments.length, label: "Today", icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"/></svg>, color: "blue", bgColor: "from-blue-500 to-blue-600", delay: "animate-slide-up-delayed" },
                { value: upcomingAppointments.length, label: "Upcoming", icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17 12h-5v5h5v-5zM16 1v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-1V1h-2zm3 18H5V8h14v11z"/></svg>, color: "green", bgColor: "from-green-500 to-green-600", delay: "animate-slide-up-delayed-2" },
                { value: pendingCount, label: "Pending", icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zM12 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0-5c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/></svg>, color: "yellow", bgColor: "from-yellow-500 to-orange-500", delay: "animate-slide-up-delayed-3" },
                { value: timeSlots.filter(s => s.isAvailable).length, label: "Available Slots", icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>, color: "purple", bgColor: "from-purple-500 to-purple-600", delay: "animate-slide-up-delayed-4" },
                { value: appointments.length, label: "Total", icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z"/></svg>, color: "orange", bgColor: "from-orange-500 to-red-500", delay: "animate-slide-up-delayed-5" }
              ].map((stat) => (
                <div key={stat.label} className={`group ${stat.delay}`}>
                  <div className="relative overflow-hidden rounded-xl transition-all duration-500 hover:scale-105 hover:-translate-y-1">
                    <div className={`absolute -inset-1 bg-gradient-to-r ${stat.bgColor} rounded-xl blur-md opacity-20 group-hover:opacity-40 transition-all duration-500`} />
                    <div className="relative glass-stat-card rounded-xl group-hover:shadow-xl transition-all duration-500 p-3">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 bg-gradient-to-br ${stat.bgColor} rounded-lg flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                          {stat.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className={`text-xl font-bold text-${stat.color}-600`}>{stat.value}</div>
                          <div className="text-xs text-gray-600 font-semibold leading-tight truncate">{stat.label}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Tabs */}
            <div className="glass-premium-card rounded-2xl mb-6 p-2 animate-slide-up-delayed-6">
              <nav className="flex flex-wrap justify-center gap-2">
                <button 
                  onClick={() => setCurrentView('appointments')}
                  className={`px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-2 transition-all duration-300 ${
                    currentView === 'appointments' 
                      ? 'bg-white/50 text-blue-700 shadow-md' 
                      : 'text-gray-600 hover:bg-white/20 hover:text-gray-900'
                  }`}
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/></svg>
                  Appointments ({appointments.length})
                </button>
                <button 
                  onClick={() => setCurrentView('availability')}
                  className={`py-4 px-2 rounded-lg text-sm font-semibold flex items-center gap-2 transition-all duration-300 ${
                    currentView === 'availability' 
                      ? 'bg-white/50 text-blue-700 shadow-md' 
                      : 'text-gray-600 hover:bg-white/20 hover:text-gray-900'
                  }`}
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
                  Manage Availability
                </button>
              </nav>
            </div>

            {/* Appointments View */}
            {currentView === 'appointments' && (
              <div className="animate-glass-fade-in">
                {/* Filters */}
                <div className="glass-sidebar-card rounded-2xl p-4 mb-6 animate-slide-up-delayed-7">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <input
                      type="text"
                      placeholder="Search appointments..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="glass-input px-4 py-2 rounded-lg w-full"
                    />
                    <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="glass-input px-4 py-2 rounded-lg w-full">
                      {statusFilters.map(status => <option key={status} value={status}>{status}</option>)}
                    </select>
                    <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)} className="glass-input px-4 py-2 rounded-lg w-full">
                      {typeFilters.map(type => <option key={type} value={type}>{type}</option>)}
                    </select>
                    <select value={courseFilter} onChange={(e) => setCourseFilter(e.target.value)} className="glass-input px-4 py-2 rounded-lg w-full">
                      {courses.map(course => <option key={course} value={course}>{course}</option>)}
                    </select>
                  </div>
                </div>

                {/* Appointments List */}
                <div className="space-y-4 animate-slide-up-delayed-8">
                  {filteredAppointments.length === 0 ? (
                    <div className="glass-card rounded-2xl p-8 text-center">
                      <div className="text-gray-500 mb-4 text-lg">No appointments found</div>
                      <div className="text-sm text-gray-400">Try adjusting your filters or check your availability settings.</div>
                    </div>
                  ) : (
                    filteredAppointments.map((appointment) => (
                      <div key={appointment.id} className="glass-premium-card rounded-2xl p-6 transition-all duration-300 hover:shadow-2xl hover:scale-[1.01]">
                        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                          <div className="flex-1">
                            <div className="flex items-center gap-4 mb-3">
                              <span className="text-4xl">{appointment.studentAvatar}</span>
                              <div>
                                <h3 className="text-lg font-bold text-gray-900">{appointment.subject}</h3>
                                <p className="text-sm text-gray-600 font-medium">{appointment.student} • {appointment.course}</p>
                              </div>
                            </div>
                            <div className="flex flex-wrap gap-2 mb-4">
                              <span className={`px-2 py-1 rounded-full text-xs font-bold border ${getStatusColor(appointment.status)}`}>
                                {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                              </span>
                              <span className={`px-2 py-1 rounded-full text-xs font-bold border ${getTypeColor(appointment.type)}`}>
                                {appointment.type.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                              </span>
                            </div>
                            
                            <p className="text-gray-700 mb-4 glass-activity-card p-3 rounded-lg">{appointment.description}</p>
                            
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600 mb-4">
                              <div className="flex items-center gap-2"><svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg><div><span className="font-medium text-gray-800">Date & Time</span><br />{appointment.date} at {appointment.time}</div></div>
                              <div className="flex items-center gap-2"><svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg><div><span className="font-medium text-gray-800">Duration</span><br />{appointment.duration} min</div></div>
                              <div className="flex items-center gap-2"><svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg><div><span className="font-medium text-gray-800">Location</span><br />{appointment.location}</div></div>
                              <div className="flex items-center gap-2"><svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg><div><span className="font-medium text-gray-800">Booked</span><br />{appointment.bookedAt}</div></div>
                            </div>

                            {appointment.notes && (
                              <div className="p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
                                <div className="text-sm font-semibold text-blue-900">Your Notes:</div>
                                <div className="text-sm text-blue-800">{appointment.notes}</div>
                              </div>
                            )}
                          </div>
                          
                          <div className="flex flex-col gap-2 w-full lg:w-48">
                            {appointment.status === 'pending' && (
                              <>
                                <button onClick={() => handleStatusChange(appointment.id, 'confirmed')} className="flex items-center justify-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors text-sm font-semibold shadow-md">✓ Confirm</button>
                                <button onClick={() => handleStatusChange(appointment.id, 'cancelled')} className="flex items-center justify-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors text-sm font-semibold shadow-md">✗ Decline</button>
                              </>
                            )}
                            {appointment.status === 'confirmed' && new Date(`${appointment.date} ${appointment.time}`) > new Date() && (
                              <>
                                <button onClick={handleRescheduleAppointment} className="flex items-center justify-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors text-sm font-semibold shadow-md">📅 Reschedule</button>
                                <button onClick={() => handleStatusChange(appointment.id, 'cancelled')} className="flex items-center justify-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors text-sm font-semibold shadow-md">❌ Cancel</button>
                              </>
                            )}
                            {appointment.status === 'confirmed' && new Date(`${appointment.date} ${appointment.time}`) <= new Date() && (
                              <button onClick={() => handleStatusChange(appointment.id, 'completed')} className="flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-semibold shadow-md">✓ Mark Complete</button>
                            )}
                            <Link href={`mailto:${appointment.studentEmail}?subject=Re: ${appointment.subject}`} className="flex items-center justify-center gap-2 bg-white/50 text-gray-800 px-4 py-2 rounded-lg hover:bg-white/80 transition-colors text-sm font-semibold text-center">✉️ Email Student</Link>
                            <button onClick={() => { const notes = prompt('Add notes for this appointment:', appointment.notes || ''); if (notes !== null) handleAddNotes(appointment.id, notes) }} className="flex items-center justify-center gap-2 bg-yellow-400/80 text-yellow-900 px-4 py-2 rounded-lg hover:bg-yellow-400 transition-colors text-sm font-semibold">📝 Add Notes</button>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}

            {/* Availability Management View */}
            {currentView === 'availability' && (
              <div className="animate-glass-fade-in">
                {/* Date Selector and Add Button */}
                <div className="glass-sidebar-card rounded-2xl p-4 mb-6 animate-slide-up-delayed-7">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <label className="text-sm font-medium text-gray-700">View Date:</label>
                      <input type="date" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} className="glass-input px-4 py-2 rounded-lg" />
                    </div>
                    <button onClick={() => setShowAddSlotModal(true)} className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-300 font-semibold shadow-md">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg>
                      Add Time Slot
                    </button>
                  </div>
                </div>

                {/* Time Slots List */}
                <div className="space-y-3 animate-slide-up-delayed-8">
                  {filteredTimeSlots.length === 0 ? (
                    <div className="glass-card rounded-2xl p-8 text-center">
                      <div className="text-gray-500 mb-4 text-lg">No time slots for selected date</div>
                      <button onClick={() => setShowAddSlotModal(true)} className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 font-semibold">Add Your First Time Slot</button>
                    </div>
                  ) : (
                    filteredTimeSlots.map((slot) => (
                      <div key={slot.id} className="glass-activity-card rounded-lg p-4 transition-all duration-300 hover:shadow-lg hover:scale-[1.02]">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div>
                              <div className="font-bold text-gray-900 text-lg">{slot.time}</div>
                              <div className="text-sm text-gray-600">{slot.duration} minutes • {slot.location}</div>
                            </div>
                            <span className={`px-2 py-1 rounded-full text-xs font-bold border ${getTypeColor(slot.type.replace(/ /g, '-'))}`}>{slot.type.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}</span>
                            {slot.isRecurring && <span className="px-2 py-1 rounded-full text-xs font-bold border bg-purple-100 text-purple-800 border-purple-200">Recurring ({slot.recurringPattern})</span>}
                            <span className={`px-2 py-1 rounded-full text-xs font-bold border ${slot.isAvailable ? 'bg-green-100 text-green-800 border-green-200' : 'bg-red-100 text-red-800 border-red-200'}`}>{slot.isAvailable ? 'Available' : 'Blocked'}</span>
                          </div>
                          <div className="flex gap-2">
                            <button onClick={() => handleToggleSlotAvailability(slot.id)} className={`px-3 py-1 rounded text-sm font-semibold transition-colors ${slot.isAvailable ? 'bg-red-500/80 text-white hover:bg-red-600' : 'bg-green-500/80 text-white hover:bg-green-600'}`}>{slot.isAvailable ? 'Block' : 'Unblock'}</button>
                            <button onClick={() => handleDeleteTimeSlot(slot.id)} className="bg-white/50 text-gray-700 px-3 py-1 rounded text-sm hover:bg-white/80 transition-colors">Delete</button>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}

            {/* Add Time Slot Modal */}
            {showAddSlotModal && (
              <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-glass-fade-in">
                <div className="glass-premium-card rounded-2xl p-6 w-full max-w-2xl">
                  <h2 className="text-2xl font-bold mb-6 text-gray-900">Add New Time Slot</h2>
                  <form onSubmit={handleAddTimeSlot} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                        <input type="date" required value={newSlot.date} onChange={(e) => setNewSlot({...newSlot, date: e.target.value})} className="w-full px-4 py-2 rounded-lg glass-input" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
                        <input type="time" required value={newSlot.time} onChange={(e) => setNewSlot({...newSlot, time: e.target.value})} className="w-full px-4 py-2 rounded-lg glass-input" />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Duration (minutes)</label>
                        <select value={newSlot.duration} onChange={(e) => setNewSlot({...newSlot, duration: parseInt(e.target.value)})} className="w-full px-4 py-2 rounded-lg glass-input">
                          <option value={15}>15 minutes</option>
                          <option value={30}>30 minutes</option>
                          <option value={45}>45 minutes</option>
                          <option value={60}>60 minutes</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                        <select value={newSlot.type} onChange={(e) => setNewSlot({...newSlot, type: e.target.value})} className="w-full px-4 py-2 rounded-lg glass-input">
                          <option value="office-hours">Office Hours</option>
                          <option value="consultation">Consultation</option>
                          <option value="project-discussion">Project Discussion</option>
                          <option value="exam-review">Exam Review</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                      <input type="text" required value={newSlot.location} onChange={(e) => setNewSlot({...newSlot, location: e.target.value})} className="w-full px-4 py-2 rounded-lg glass-input" placeholder="e.g., Office 201B" />
                    </div>
                    <div className="flex items-center gap-2">
                      <input type="checkbox" id="isRecurring" checked={newSlot.isRecurring} onChange={(e) => setNewSlot({...newSlot, isRecurring: e.target.checked})} className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
                      <label htmlFor="isRecurring" className="text-sm font-medium text-gray-700">Make this a recurring slot</label>
                    </div>
                    {newSlot.isRecurring && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Recurring Pattern</label>
                        <select value={newSlot.recurringPattern} onChange={(e) => setNewSlot({...newSlot, recurringPattern: e.target.value as 'weekly' | 'biweekly' | 'monthly'})} className="w-full px-4 py-2 rounded-lg glass-input">
                          <option value="weekly">Weekly</option>
                          <option value="biweekly">Bi-weekly</option>
                          <option value="monthly">Monthly</option>
                        </select>
                      </div>
                    )}
                    <div className="flex gap-4 pt-4">
                      <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 font-semibold shadow-md transition-colors">Add Time Slot</button>
                      <button type="button" onClick={() => setShowAddSlotModal(false)} className="bg-white/50 text-gray-800 px-6 py-2 rounded-lg hover:bg-white/80 font-semibold transition-colors">Cancel</button>
                    </div>
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