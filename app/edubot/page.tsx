// app/edubot/page.tsx - ENHANCED WITH GLASSMORPHISM & VECTOR ICONS
'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import React from 'react'

// --- Interfaces (Unchanged) ---
interface Message {
  id: string
  content: string
  sender: 'user' | 'bot'
  timestamp: string
  type?: 'text' | 'quick-reply' | 'suggestion'
  suggestions?: string[]
  relatedLinks?: {
    text: string
    url: string
    type: 'query' | 'appointment' | 'resource' | 'announcement'
  }[]
}

interface QuickAction {
  id: string
  text: string
  icon: React.ReactNode
  action: string
}

// --- Data and Logic (Unchanged) ---
const quickActions: QuickAction[] = [
  { id: '1', text: 'Assignment deadlines', icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" /></svg>, action: 'assignment_deadlines' },
  { id: '2', text: 'Office hours', icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" /></svg>, action: 'office_hours' },
  { id: '3', text: 'Course materials', icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" /></svg>, action: 'course_materials' },
  { id: '4', text: 'Exam information', icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" /></svg>, action: 'exam_info' },
  { id: '5', text: 'Technical support', icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01-.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" /></svg>, action: 'tech_support' },
  { id: '6', text: 'Grading policy', icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z" /><path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z" /></svg>, action: 'grading_policy' }
]

const commonQuestions = [
  "What are the office hours for Dr. Sarah Johnson?",
  "When is the next assignment due for CS101?",
  "How do I submit my assignment?",
  "What's the grading policy for this course?",
  "Where can I find course materials?",
  "How do I book an appointment with my lecturer?"
]

const generateBotResponse = (userMessage: string): Message => {
  const message = userMessage.toLowerCase()
  let content = ""
  let suggestions: string[] = []
  let relatedLinks: Message['relatedLinks'] = []
  if (message.includes('office hours') || message.includes('office hour')) {
    content = "Office hours for your lecturers are:\n\n📅 **Dr. Sarah Johnson (CS101):**\n• Monday & Wednesday: 2:00-4:00 PM\n• Friday: 10:00-12:00 PM\n• Location: Office 201B\n\n📅 **Prof. Michael Chen (MATH202):**\n• Tuesday & Thursday: 1:00-3:00 PM\n• Location: Office 301A\n\nYou can book appointments through the appointment system for guaranteed time slots!"
    suggestions = ["Book an appointment", "View all lecturers", "Check availability"]
    relatedLinks = [
      { text: "Book Appointment", url: "/student/appointments", type: "appointment" },
      { text: "Message Lecturer", url: "/student/messages", type: "query" }
    ]
  } else if (message.includes('assignment') && (message.includes('deadline') || message.includes('due'))) {
    content = "Here are the upcoming assignment deadlines:\n\n📋 **CS101 - Introduction to Programming:**\n• Assignment 3: July 30, 2025 (11:59 PM)\n• Lab Report 4: August 2, 2025 (5:00 PM)\n\n📋 **MATH202 - Calculus II:**\n• Problem Set 5: August 1, 2025 (11:59 PM)\n• Midterm Project: August 5, 2025 (11:59 PM)\n\nRemember to submit through the course portal before the deadline!"
    suggestions = ["View course resources", "Ask about extensions", "Check submission format"]
    relatedLinks = [
      { text: "Course Resources", url: "/student/resources", type: "resource" },
      { text: "Submit Query about Assignment", url: "/student/queries", type: "query" }
    ]
  } else if (message.includes('grading') || message.includes('grade')) {
    content = "Here's the grading policy information:\n\n📊 **CS101 Grading Breakdown:**\n• Assignments: 40%\n• Labs: 20%\n• Midterm Exam: 20%\n• Final Project: 20%\n\n📊 **MATH202 Grading Breakdown:**\n• Problem Sets: 30%\n• Quizzes: 20%\n• Midterm: 25%\n• Final Exam: 25%\n\nGrades are updated weekly. Late submissions have a 10% penalty per day."
    suggestions = ["Check my grades", "Late submission policy", "Grade appeal process"]
  } else if (message.includes('submit') || message.includes('submission')) {
    content = "Here's how to submit your assignments:\n\n📤 **Submission Process:**\n1. Go to Course Resources section\n2. Find your course (CS101, MATH202, etc.)\n3. Click on the assignment link\n4. Upload your file (PDF preferred)\n5. Add any comments if needed\n6. Click 'Submit'\n\n⚠️ **Important:**\n• Submit before the deadline\n• Check file format requirements\n• Keep a backup copy\n• You'll receive a confirmation email"
    suggestions = ["View submission formats", "Check deadline", "Technical help"]
    relatedLinks = [
      { text: "Course Resources", url: "/student/resources", type: "resource" },
      { text: "Technical Support Query", url: "/student/queries", type: "query" }
    ]
  } else if (message.includes('course material') || message.includes('materials') || message.includes('resources')) {
    content = "You can find all course materials in the Resources section:\n\n📚 **Available Resources:**\n• Lecture notes and slides\n• Assignment instructions\n• Lab materials\n• Reading materials\n• Example codes and solutions\n• Study guides\n\nMaterials are organized by course and updated regularly by your lecturers."
    suggestions = ["Browse resources", "Search specific topic", "Download materials"]
    relatedLinks = [
      { text: "View All Resources", url: "/student/resources", type: "resource" }
    ]
  } else if (message.includes('exam') || message.includes('test') || message.includes('midterm') || message.includes('final')) {
    content = "Here's exam information for your courses:\n\n📝 **Upcoming Exams:**\n\n**CS101 Midterm:**\n• Date: August 8, 2025\n• Time: 2:00-4:00 PM\n• Location: Hall A\n• Covers: Chapters 1-6\n\n**MATH202 Quiz:**\n• Date: July 30, 2025\n• Time: During class\n• Covers: Integration techniques\n\nStudy materials and practice exams are available in the resources section!"
    suggestions = ["View study materials", "Book review session", "Exam format"]
    relatedLinks = [
      { text: "Study Materials", url: "/student/resources", type: "resource" },
      { text: "Book Review Session", url: "/student/appointments", type: "appointment" }
    ]
  } else if (message.includes('appointment') || message.includes('book') || message.includes('schedule')) {
    content = "To book an appointment with your lecturer:\n\n📅 **Appointment Booking:**\n1. Go to 'Appointments' section\n2. Select your lecturer\n3. Choose available time slot\n4. Fill in appointment details\n5. Submit request\n\nYour lecturer will confirm within 24 hours. You can also check their office hours for drop-in visits!"
    suggestions = ["Book now", "View office hours", "Check my appointments"]
    relatedLinks = [
      { text: "Book Appointment", url: "/student/appointments", type: "appointment" }
    ]
  } else if (message.includes('technical') || message.includes('problem') || message.includes('issue') || message.includes('help')) {
    content = "For technical support:\n\n🔧 **Common Solutions:**\n• Clear browser cache and cookies\n• Try a different browser\n• Check internet connection\n• Disable browser extensions\n\n**Still having issues?**\nSubmit a technical support query with details about:\n• What you were trying to do\n• Error messages you see\n• Browser and device type\n\nOur IT team responds within 2 hours during business hours."
    suggestions = ["Submit tech query", "Browser troubleshooting", "Contact IT directly"]
    relatedLinks = [
      { text: "Submit Technical Query", url: "/student/queries", type: "query" }
    ]
  } else if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
    content = "Hello! 👋 I'm EduBot, your AI assistant for academic support.\n\nI can help you with:\n• Assignment deadlines and submission\n• Office hours and appointments\n• Course materials and resources\n• Exam information\n• Technical support\n• General academic questions\n\nWhat would you like to know today?"
    suggestions = ["Show assignment deadlines", "Find office hours", "View course materials"]
  } else {
    content = "I understand you&apos;re asking about: &quot;" + userMessage + "&quot;\n\nI'm here to help! I can assist you with:\n\n📚 **Academic Support:**\n• Assignment deadlines and requirements\n• Course materials and resources\n• Exam schedules and study materials\n\n👥 **Communication:**\n• Lecturer office hours\n• Booking appointments\n• Submitting queries\n\n🔧 **Technical Help:**\n• Platform navigation\n• Submission processes\n• Troubleshooting\n\nCould you be more specific about what you need help with?"
    suggestions = ["Assignment help", "Contact lecturer", "Technical support"]
    relatedLinks = [
      { text: "Submit Detailed Query", url: "/student/queries", type: "query" },
      { text: "Browse Resources", url: "/student/resources", type: "resource" }
    ]
  }
  return { id: Date.now().toString(), content, sender: 'bot', timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), type: 'text', suggestions, relatedLinks }
}

export default function EduBotPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hello! 👋 I'm EduBot, your AI assistant. I'm here to help you with academic questions, course information, and university services.\n\nHow can I assist you today?",
      sender: 'bot',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      type: 'text',
      suggestions: ["Show my courses", "Assignment deadlines", "Office hours", "Course materials"]
    }
  ])
  const [inputMessage, setInputMessage] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async (messageText?: string) => {
    const text = messageText || inputMessage.trim()
    if (!text) return
    const userMessage: Message = { id: Date.now().toString(), content: text, sender: 'user', timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), type: 'text' }
    setMessages(prev => [...prev, userMessage])
    setInputMessage('')
    setIsTyping(true)
    setTimeout(() => {
      const botResponse = generateBotResponse(text)
      setMessages(prev => [...prev, botResponse])
      setIsTyping(false)
    }, 1000 + Math.random() * 1000)
  }

  const handleQuickAction = (action: string) => {
    const actionMessages: Record<string, string> = { 'assignment_deadlines': 'What are the upcoming assignment deadlines?', 'office_hours': 'What are the office hours for my lecturers?', 'course_materials': 'Where can I find course materials?', 'exam_info': 'When are the upcoming exams?', 'tech_support': 'I need technical support help', 'grading_policy': 'What is the grading policy?' }
    const message = actionMessages[action]
    if (message) { handleSendMessage(message) }
  }

  const handleSuggestionClick = (suggestion: string) => { handleSendMessage(suggestion) }
  const handleKeyPress = (e: React.KeyboardEvent) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSendMessage() } }

  return (
    <>
      {/* --- START: Global Styles & Animations (Copied from Dashboards) --- */}
      <style jsx global>{`
        /* All the animations from the login page */
        @keyframes mesh-drift-1 { 0%, 100% { transform: rotate(0deg) scale(1) translate(0, 0); } 33% { transform: rotate(120deg) scale(1.1) translate(20px, -20px); } 66% { transform: rotate(240deg) scale(0.9) translate(-20px, 20px); } }
        .animate-mesh-drift-1 { animation: mesh-drift-1 40s ease-in-out infinite; }
        @keyframes mesh-drift-2 { 0%, 100% { transform: rotate(0deg) scale(1) translate(0, 0); } 25% { transform: rotate(90deg) scale(1.2) translate(-30px, 10px); } 50% { transform: rotate(180deg) scale(0.8) translate(10px, -30px); } 75% { transform: rotate(270deg) scale(1.1) translate(20px, 20px); } }
        .animate-mesh-drift-2 { animation: mesh-drift-2 50s ease-in-out infinite; }
        @keyframes aurora-glow { 0%, 100% { opacity: 0.6; transform: scale(1) rotate(0deg); } 25% { opacity: 0.8; transform: scale(1.05) rotate(90deg); } 50% { opacity: 0.4; transform: scale(0.95) rotate(180deg); } 75% { opacity: 0.9; transform: scale(1.1) rotate(270deg); } }
        .animate-aurora-glow { animation: aurora-glow 8s ease-in-out infinite; }
        @keyframes glass-fade-in { 0% { opacity: 0; transform: translateY(30px) scale(0.95); } 100% { opacity: 1; transform: translateY(0) scale(1); } }
        .animate-glass-fade-in { animation: glass-fade-in 1.2s ease-out forwards; }
        @keyframes slide-up-delayed { 0% { opacity: 0; transform: translateY(40px); } 100% { opacity: 1; transform: translateY(0); } }
        .animate-slide-up-delayed { animation: slide-up-delayed 0.8s ease-out 0.2s forwards; opacity: 0; }
        .animate-slide-up-delayed-2 { animation: slide-up-delayed 0.8s ease-out 0.4s forwards; opacity: 0; }
        .animate-slide-up-delayed-3 { animation: slide-up-delayed 0.8s ease-out 0.6s forwards; opacity: 0; }
        
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
        {/* --- START: Multi-Layered Animated Background (Copied from Dashboards) --- */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0">
          <div className="absolute top-[7%] left-[13%] text-purple-500 text-9xl opacity-75">∑</div>
          <div className="absolute top-[33%] right-[17%] text-blue-500 text-8xl opacity-70">π</div>
          <div className="absolute top-[61%] left-[27%] text-green-500 text-8xl opacity-75">∞</div>
          <div className="absolute inset-0 bg-gradient-to-br from-blue-100/40 via-purple-100/35 to-pink-100/40 animate-mesh-drift-1" />
          <div className="absolute inset-0 bg-gradient-to-tr from-emerald-100/35 via-violet-100/30 to-orange-100/35 animate-mesh-drift-2" />
        </div>
        {/* --- END: Multi-Layered Animated Background --- */}

        <div className="relative z-20 min-h-screen flex flex-col">
          {/* Header */}
          <header className="p-4">
            <div className="max-w-7xl mx-auto">
              <div className="relative group animate-glass-fade-in">
                <div className="absolute -inset-2 bg-gradient-to-r from-blue-300/20 via-purple-300/30 to-pink-300/20 rounded-2xl blur-xl opacity-60 group-hover:opacity-80 transition-all duration-1000 animate-aurora-glow" />
                <div className="relative glass-premium-card rounded-2xl p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white shadow-lg">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>
                      </div>
                      <div>
                        <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent text-clean-shadow">EduBot</h1>
                        <p className="text-sm text-gray-600 font-medium">Your AI Academic Assistant</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 glass-card rounded-full px-3 py-1 text-sm font-semibold">
                      <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                      <span className="text-gray-700">Online</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </header>

          <main className="flex-1 max-w-7xl mx-auto p-4 w-full">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-full">
              {/* Sidebar */}
              <aside className="lg:col-span-1 space-y-6 animate-slide-up-delayed">
                <div className="glass-sidebar-card rounded-2xl p-4">
                  <h3 className="font-bold text-gray-900 mb-4 text-lg">Quick Actions</h3>
                  <div className="space-y-2">
                    {quickActions.map((action) => (
                      <button key={action.id} onClick={() => handleQuickAction(action.action)} className="w-full text-left p-3 rounded-lg bg-white/30 hover:bg-white/60 hover:shadow-md transition-all flex items-center gap-3 group">
                        <div className="w-8 h-8 flex items-center justify-center bg-blue-100 text-blue-600 rounded-lg group-hover:scale-110 transition-transform">{action.icon}</div>
                        <span className="text-sm font-semibold text-gray-800">{action.text}</span>
                      </button>
                    ))}
                  </div>
                </div>
                <div className="glass-sidebar-card rounded-2xl p-4">
                  <h3 className="font-bold text-gray-900 mb-4 text-lg">Common Questions</h3>
                  <div className="space-y-2">
                    {commonQuestions.slice(0, 4).map((question, idx) => (
                      <button key={idx} onClick={() => handleSendMessage(question)} className="w-full text-left p-2 text-xs text-gray-700 hover:text-blue-700 hover:bg-white/50 rounded transition-colors">
                        &quot;{question}&quot;
                      </button>
                    ))}
                  </div>
                </div>
              </aside>

              {/* Chat Interface */}
              <div className="lg:col-span-3 flex flex-col animate-slide-up-delayed-2">
                <div className="glass-premium-card rounded-2xl flex flex-col flex-1 h-[75vh]">
                  {/* Chat Messages */}
                  <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {messages.map((message) => (
                      <div key={message.id} className={`flex items-end gap-2 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                        {message.sender === 'bot' && <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white flex-shrink-0"> <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M10 2a6 6 0 00-6 6v3.586l-1.707 1.707A1 1 0 003 15h14a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" /></svg></div>}
                        <div className={`max-w-lg rounded-2xl px-4 py-3 ${ message.sender === 'user' ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-br-none' : 'bg-white/50 backdrop-blur-sm border border-white/50 text-gray-900 rounded-bl-none' }`}>
                          <div className="text-sm whitespace-pre-wrap" dangerouslySetInnerHTML={{ __html: message.content.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }}></div>
                          {message.suggestions && message.suggestions.length > 0 && (
                            <div className="mt-3 flex flex-wrap gap-2">
                              {message.suggestions.map((suggestion, idx) => (
                                <button key={idx} onClick={() => handleSuggestionClick(suggestion)} className="text-xs backdrop-blur-lg bg-black/10 hover:bg-black/20 px-2.5 py-1 rounded-full transition-colors">
                                  {suggestion}
                                </button>
                              ))}
                            </div>
                          )}
                           {message.relatedLinks && message.relatedLinks.length > 0 && (
                            <div className="mt-3 border-t border-black/10 pt-2 space-y-1">
                              {message.relatedLinks.map((link, idx) => (
                                <Link key={idx} href={link.url} className="block text-xs font-semibold text-blue-600 hover:text-blue-800 underline">
                                  🔗 {link.text}
                                </Link>
                              ))}
                            </div>
                          )}
                          <div className={`text-xs mt-2 opacity-70 ${message.sender === 'user' ? 'text-right' : 'text-left'}`}>{message.timestamp}</div>
                        </div>
                      </div>
                    ))}
                    {isTyping && (
                      <div className="flex items-end gap-2 justify-start">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white flex-shrink-0"> <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M10 2a6 6 0 00-6 6v3.586l-1.707 1.707A1 1 0 003 15h14a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" /></svg></div>
                        <div className="bg-white/50 backdrop-blur-sm border border-white/50 rounded-2xl rounded-bl-none px-4 py-3">
                          <div className="flex items-center gap-1.5">
                            <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                            <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                            <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                          </div>
                        </div>
                      </div>
                    )}
                    <div ref={messagesEndRef} />
                  </div>
                  {/* Input Area */}
                  <div className="border-t border-white/20 p-4">
                    <div className="relative">
                      <textarea
                        value={inputMessage}
                        onChange={(e) => setInputMessage(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Ask me anything..."
                        className="w-full px-4 py-3 pr-20 bg-white/40 border border-gray-300/50 rounded-lg focus:ring-2 focus:ring-blue-400/50 backdrop-blur-sm transition-all text-gray-800 placeholder-gray-500 resize-none"
                        rows={1}
                        disabled={isTyping}
                      />
                      <button onClick={() => handleSendMessage()} disabled={!inputMessage.trim() || isTyping} className="absolute right-2 top-1/2 -translate-y-1/2 bg-gradient-to-r from-blue-500 to-purple-600 text-white p-2 rounded-lg hover:from-blue-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md hover:shadow-lg transform hover:scale-105">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  )
}
