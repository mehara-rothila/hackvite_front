// app/lecturer/conversations/[id]/page.tsx - ENHANCED WITH GLASSMORPHISM & VECTOR ICONS
'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'

interface ConversationMessage {
  id: string
  sender: 'student' | 'lecturer'
  senderName: string
  content: string
  timestamp: string
  attachments?: {
    name: string
    url: string
    type: string
  }[]
  isRead: boolean
}

interface ConversationDetails {
  id: string
  student: string
  studentEmail: string
  studentAvatar: string
  subject: string
  course: string
  status: 'active' | 'resolved' | 'archived'
  priority: 'low' | 'medium' | 'high'
  messageType: 'academic' | 'administrative' | 'general'
  startedAt: string
  lastUpdated: string
  totalMessages: number
  messages: ConversationMessage[]
  studentInfo?: {
    year: string
    gpa: string
    previousInteractions: number
  }
}

// Mock conversation data
const mockConversationDetails: Record<string, ConversationDetails> = {
  '1': {
    id: '1',
    student: 'Alice Johnson',
    studentEmail: 'alice.johnson@university.edu',
    studentAvatar: '👩‍🎓',
    subject: 'Assignment 3 Implementation Help',
    course: 'CS101',
    status: 'active',
    priority: 'medium',
    messageType: 'academic',
    startedAt: '2025-07-24 10:30',
    lastUpdated: '2025-07-26 16:30',
    totalMessages: 8,
    studentInfo: {
      year: '2nd Year',
      gpa: '3.7',
      previousInteractions: 12
    },
    messages: [
      {
        id: '1',
        sender: 'student',
        senderName: 'Alice Johnson',
        content: 'Hi Dr. Johnson, I\'m working on Assignment 3 and I\'m having trouble understanding the sorting algorithm requirements. Could you help me understand what approach I should take?',
        timestamp: '2025-07-24 10:30',
        isRead: true
      },
      {
        id: '2',
        sender: 'lecturer',
        senderName: 'You',
        content: 'Hi Alice! I\'d be happy to help. For Assignment 3, you can choose between implementing either quicksort or mergesort. The key requirements are:\n\n1. Implement the algorithm efficiently\n2. Include proper documentation\n3. Analyze the time complexity\n4. Test with different data sizes\n\nWhich algorithm are you leaning towards?',
        timestamp: '2025-07-24 14:15',
        isRead: true
      },
      {
        id: '3',
        sender: 'student',
        senderName: 'Alice Johnson',
        content: 'Thank you! I think I\'ll go with mergesort since we covered it more extensively in class. Could you clarify what you mean by "analyze the time complexity"? Do you want the mathematical analysis or empirical testing?',
        timestamp: '2025-07-24 16:45',
        isRead: true
      },
      {
        id: '4',
        sender: 'lecturer',
        senderName: 'You',
        content: 'Great choice! For the time complexity analysis, I want both:\n\n1. Mathematical analysis: Explain why mergesort is O(n log n) in all cases\n2. Empirical testing: Run your implementation with different input sizes and create a graph showing how execution time scales\n\nThis will help you understand the practical implications of the theoretical complexity.',
        timestamp: '2025-07-25 09:20',
        isRead: true
      },
      {
        id: '5',
        sender: 'student',
        senderName: 'Alice Johnson',
        content: 'That makes sense! I\'ll work on both parts. One more question - for the empirical testing, what input sizes would you recommend? And should I test with random data or specific patterns?',
        timestamp: '2025-07-25 11:30',
        isRead: true
      },
      {
        id: '6',
        sender: 'lecturer',
        senderName: 'You',
        content: 'For input sizes, try: 100, 500, 1000, 5000, 10000, 50000 elements. Test with:\n1. Random data\n2. Already sorted data  \n3. Reverse sorted data\n4. Data with many duplicates\n\nThis will show how the algorithm performs in different scenarios. The sorted/reverse sorted cases are particularly interesting for understanding merge sort\'s stability.',
        timestamp: '2025-07-25 13:45',
        attachments: [
          { name: 'testing_guidelines.pdf', url: '#', type: 'pdf' }
        ],
        isRead: true
      },
      {
        id: '7',
        sender: 'student',
        senderName: 'Alice Johnson',
        content: 'Perfect! This gives me a clear roadmap. I\'ll start implementing and testing today. Should I submit the code and analysis as separate files or combine them?',
        timestamp: '2025-07-26 14:20',
        isRead: true
      },
      {
        id: '8',
        sender: 'lecturer',
        senderName: 'You',
        content: 'Submit them as separate files:\n- mergesort.py (your implementation)\n- analysis.pdf (your written analysis with graphs)\n- test_results.xlsx (raw data from your tests)\n\nThis makes it easier for me to review each component. Good luck with the implementation!',
        timestamp: '2025-07-26 15:10',
        isRead: true
      },
      {
        id: '9',
        sender: 'student',
        senderName: 'Alice Johnson',
        content: 'Thank you for the detailed explanation! I think I understand the algorithm now and have a clear plan for the analysis. I really appreciate your help!',
        timestamp: '2025-07-26 16:30',
        isRead: false
      }
    ]
  },
  '2': {
    id: '2',
    student: 'Bob Smith', 
    studentEmail: 'bob.smith@university.edu',
    studentAvatar: '👨‍🎓',
    subject: 'Final Project Proposal Discussion',
    course: 'CS101',
    status: 'active',
    priority: 'high',
    messageType: 'academic',
    startedAt: '2025-07-20 09:15',
    lastUpdated: '2025-07-26 14:45',
    totalMessages: 12,
    studentInfo: {
      year: '3rd Year',
      gpa: '3.9',
      previousInteractions: 8
    },
    messages: [
      {
        id: '1',
        sender: 'student',
        senderName: 'Bob Smith',
        content: 'Hi Dr. Johnson, I wanted to discuss my final project proposal. I\'m thinking of building a web application that uses machine learning to recommend study materials based on student performance.',
        timestamp: '2025-07-20 09:15',
        isRead: true
      },
      {
        id: '2',
        sender: 'lecturer',
        senderName: 'You',
        content: 'That sounds like an interesting project, Bob! The concept has good potential. Can you provide more details about:\n1. What type of ML algorithm you\'re considering\n2. What data you plan to use for training\n3. How you\'ll measure student performance\n4. The scope of the web application',
        timestamp: '2025-07-20 11:30',
        isRead: true
      },
      {
        id: '3',
        sender: 'student',
        senderName: 'Bob Smith',
        content: 'I\'ve updated my proposal based on your feedback. Could you review it again? I\'ve addressed the data sources and included a more detailed technical approach.',
        timestamp: '2025-07-26 14:45',
        attachments: [
          { name: 'updated_project_proposal.pdf', url: '#', type: 'pdf' }
        ],
        isRead: false
      }
    ]
  }
}

export default function LecturerConversationDetailPage() {
  const params = useParams()
  const conversationId = params.id as string
  
  const [conversation, setConversation] = useState<ConversationDetails | null>(null)
  const [newMessage, setNewMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // In real app, fetch conversation details from API
    const conversationData = mockConversationDetails[conversationId]
    setConversation(conversationData || null)
  }, [conversationId])

  useEffect(() => {
    scrollToBottom()
  }, [conversation?.messages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newMessage.trim() || !conversation) return

    setIsSubmitting(true)
    
    // Simulate API call
    setTimeout(() => {
      const message: ConversationMessage = {
        id: Date.now().toString(),
        sender: 'lecturer',
        senderName: 'You',
        content: newMessage,
        timestamp: new Date().toLocaleString(),
        isRead: true
      }
      
      setConversation({
        ...conversation,
        messages: [...conversation.messages, message],
        lastUpdated: new Date().toLocaleString(),
        totalMessages: conversation.totalMessages + 1
      })
      
      setNewMessage('')
      setIsSubmitting(false)
    }, 1000)
  }

  const handleStatusChange = (newStatus: ConversationDetails['status']) => {
    if (conversation) {
      setConversation({
        ...conversation,
        status: newStatus
      })
    }
  }

  const handlePriorityChange = (newPriority: ConversationDetails['priority']) => {
    if (conversation) {
      setConversation({
        ...conversation,
        priority: newPriority
      })
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'resolved': return 'bg-green-100 text-green-800 border-green-200'
      case 'archived': return 'bg-gray-100 text-gray-800 border-gray-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200'
      case 'medium': return 'bg-orange-100 text-orange-800 border-orange-200'
      case 'low': return 'bg-green-100 text-green-800 border-green-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getAttachmentIcon = (type: string) => {
    if (type.includes('pdf')) return '📄'
    if (type.includes('image') || type.includes('png') || type.includes('jpg')) return '🖼️'
    if (type.includes('zip') || type.includes('rar')) return '📦'
    if (type.includes('doc')) return '📝'
    if (type.includes('xls')) return '📊'
    return '📎'
  }

  if (!conversation) {
    return (
      <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center p-6">
        <div className="glass-card rounded-2xl p-8 text-center max-w-lg mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Conversation Not Found</h2>
          <p className="text-gray-600 mb-6">The conversation you're looking for doesn't exist or you don't have permission to view it.</p>
          <Link href="/lecturer/conversations" className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 font-semibold shadow-md transition-colors">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M10 19l-7-7 7-7 1.41 1.41L5.83 12l5.58 5.59z"/></svg>
            Back to Conversations
          </Link>
        </div>
      </div>
    )
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
          <div className="max-w-6xl mx-auto">
            {/* Breadcrumb */}
            <div className="mb-6 animate-glass-fade-in">
              <nav className="text-sm text-gray-500 glass-activity-card rounded-lg px-4 py-2 inline-block">
                <Link href="/lecturer/conversations" className="hover:text-blue-600 font-medium">Conversations</Link>
                <span className="mx-2">/</span>
                <span className="text-gray-800 font-semibold">{conversation.subject}</span>
              </nav>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              {/* Student Information Sidebar */}
              <div className="lg:col-span-1 space-y-6">
                <div className="glass-sidebar-card rounded-2xl p-6 animate-slide-up-delayed">
                  <div className="flex flex-col items-center text-center mb-4">
                    <span className="text-5xl mb-2">{conversation.studentAvatar}</span>
                    <div>
                      <h3 className="font-bold text-lg text-gray-900">{conversation.student}</h3>
                      <p className="text-sm text-gray-600">{conversation.course}</p>
                    </div>
                  </div>

                  {conversation.studentInfo && (
                    <div className="space-y-3 text-sm border-t border-white/30 pt-4">
                      <div className="flex justify-between"><span className="font-medium text-gray-700">Year:</span><span className="text-gray-800 font-semibold">{conversation.studentInfo.year}</span></div>
                      <div className="flex justify-between"><span className="font-medium text-gray-700">GPA:</span><span className="text-gray-800 font-semibold">{conversation.studentInfo.gpa}</span></div>
                      <div className="flex justify-between"><span className="font-medium text-gray-700">Interactions:</span><span className="text-gray-800 font-semibold">{conversation.studentInfo.previousInteractions}</span></div>
                    </div>
                  )}

                  <div className="mt-6 space-y-2 border-t border-white/30 pt-4">
                    <Link href={`mailto:${conversation.studentEmail}?subject=Re: ${conversation.subject}`} className="flex items-center justify-center gap-2 w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-center text-sm font-semibold shadow-md">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>
                      Send Email
                    </Link>
                    <Link href={`/lecturer/queries?student=${encodeURIComponent(conversation.student)}`} className="flex items-center justify-center gap-2 w-full bg-white/50 text-gray-800 px-4 py-2 rounded-lg hover:bg-white/80 transition-colors text-center text-sm font-semibold">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/></svg>
                      View Queries
                    </Link>
                  </div>
                </div>

                <div className="glass-sidebar-card rounded-2xl p-6 animate-slide-up-delayed-2">
                  <h4 className="font-bold text-gray-900 mb-4">Conversation Settings</h4>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                      <select value={conversation.status} onChange={(e) => handleStatusChange(e.target.value as ConversationDetails['status'])} className="w-full px-3 py-2 text-sm rounded-lg glass-input">
                        <option value="active">Active</option>
                        <option value="resolved">Resolved</option>
                        <option value="archived">Archived</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                      <select value={conversation.priority} onChange={(e) => handlePriorityChange(e.target.value as ConversationDetails['priority'])} className="w-full px-3 py-2 text-sm rounded-lg glass-input">
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                      </select>
                    </div>
                    <div className="text-xs text-gray-600 border-t border-white/30 pt-3 space-y-1">
                      <div><strong>Started:</strong> {conversation.startedAt}</div>
                      <div><strong>Last updated:</strong> {conversation.lastUpdated}</div>
                      <div><strong>Total messages:</strong> {conversation.totalMessages}</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Conversation Thread */}
              <div className="lg:col-span-3">
                <div className="glass-premium-card rounded-2xl flex flex-col h-full animate-slide-up-delayed-3">
                  {/* Conversation Header */}
                  <div className="p-6 border-b border-white/40">
                    <div className="flex items-center justify-between mb-2">
                      <h1 className="text-2xl font-bold text-gray-900">{conversation.subject}</h1>
                    </div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className={`px-3 py-1 rounded-full text-sm font-bold border ${getStatusColor(conversation.status)}`}>
                        {conversation.status.charAt(0).toUpperCase() + conversation.status.slice(1)}
                      </span>
                      <span className={`px-3 py-1 rounded-full text-sm font-bold border ${getPriorityColor(conversation.priority)}`}>
                        {conversation.priority.charAt(0).toUpperCase() + conversation.priority.slice(1)}
                      </span>
                    </div>
                  </div>

                  {/* Messages */}
                  <div className="flex-grow h-[500px] overflow-y-auto p-6">
                    <div className="space-y-6">
                      {conversation.messages.map((message) => (
                        <div key={message.id} className={`flex gap-3 ${message.sender === 'lecturer' ? 'justify-end' : 'justify-start'}`}>
                          {message.sender === 'student' && <span className="text-3xl mt-1">{conversation.studentAvatar}</span>}
                          <div className={`max-w-2xl ${
                            message.sender === 'lecturer'
                              ? 'bg-gradient-to-br from-blue-500 to-purple-600 text-white rounded-2xl rounded-br-sm shadow-lg'
                              : 'glass-activity-card text-gray-900 rounded-2xl rounded-bl-sm'
                          } px-4 py-3`}>
                            <div className={`text-xs mb-1 font-semibold ${message.sender === 'lecturer' ? 'text-blue-100' : 'text-gray-600'}`}>
                              {message.senderName}
                            </div>
                            <div className="text-sm whitespace-pre-line leading-relaxed">{message.content}</div>
                            {message.attachments && message.attachments.length > 0 && (
                              <div className="mt-3 space-y-2">
                                {message.attachments.map((attachment, idx) => (
                                  <a key={idx} href={attachment.url} className={`p-2 rounded-lg flex items-center gap-2 transition-colors ${message.sender === 'lecturer' ? 'bg-black/20 hover:bg-black/30' : 'bg-black/5 hover:bg-black/10'}`}>
                                    <span className="text-lg">{getAttachmentIcon(attachment.type)}</span>
                                    <span className={`text-xs font-medium ${message.sender === 'lecturer' ? 'text-blue-100' : 'text-gray-700'}`}>{attachment.name}</span>
                                  </a>
                                ))}
                              </div>
                            )}
                            <div className={`text-xs mt-2 text-right ${message.sender === 'lecturer' ? 'text-blue-200' : 'text-gray-500'}`}>
                              {message.timestamp}
                              {!message.isRead && message.sender === 'student' && <span className="ml-2 text-orange-400 font-bold animate-pulse">• New</span>}
                            </div>
                          </div>
                          {message.sender === 'lecturer' && <span className="text-3xl mt-1">🎓</span>}
                        </div>
                      ))}
                      <div ref={messagesEndRef} />
                    </div>
                  </div>

                  {/* Reply Form */}
                  {conversation.status !== 'archived' && (
                    <div className="p-6 border-t border-white/40">
                      <form onSubmit={handleSendMessage} className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Reply to {conversation.student}</label>
                          <textarea value={newMessage} onChange={(e) => setNewMessage(e.target.value)} rows={4} className="w-full px-4 py-3 rounded-lg glass-input" placeholder="Type your response..." disabled={isSubmitting} />
                        </div>
                        <div className="flex justify-between items-center">
                          <div className="flex gap-4">
                            <button type="button" className="text-sm text-gray-600 hover:text-blue-600 flex items-center gap-1 font-medium transition-colors">
                              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M16.5 6v11.5c0 2.21-1.79 4-4 4s-4-1.79-4-4V5c0-1.38 1.12-2.5 2.5-2.5s2.5 1.12 2.5 2.5v10.5c0 .55-.45 1-1 1s-1-.45-1-1V6H10v9.5c0 1.38 1.12 2.5 2.5 2.5s2.5-1.12 2.5-2.5V5c0-2.21-1.79-4-4-4S7 2.79 7 5v12.5c0 3.04 2.46 5.5 5.5 5.5s5.5-2.46 5.5-5.5V6h-1.5z"/></svg>
                              Attach File
                            </button>
                            <button type="button" className="text-sm text-gray-600 hover:text-blue-600 flex items-center gap-1 font-medium transition-colors">
                              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm-1 13h-2v-2h2v2zm0-4h-2v-2h2v2zm-2-4V3.5L18.5 9H11V5z"/></svg>
                              Add Template
                            </button>
                          </div>
                          <div className="flex gap-2">
                            <button type="button" onClick={() => setNewMessage('')} className="px-4 py-2 text-gray-700 font-semibold hover:bg-white/30 rounded-lg transition-colors">Cancel</button>
                            <button type="submit" disabled={!newMessage.trim() || isSubmitting} className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed font-semibold shadow-md transition-colors">
                              {isSubmitting ? 'Sending...' : 'Send Reply'}
                            </button>
                          </div>
                        </div>
                      </form>
                    </div>
                  )}

                  {conversation.status === 'archived' && (
                    <div className="p-6 border-t border-white/40">
                      <div className="glass-activity-card p-4 rounded-lg">
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">📁</span>
                          <div>
                            <span className="font-bold text-gray-800">This conversation has been archived</span>
                            <p className="text-sm text-gray-600 mt-1">To continue the conversation, change the status to "Active" in the sidebar.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}