// app/edubot/page.tsx
'use client'

import { useEffect, useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { AuthService } from '../../lib/auth'
import { User } from '../../types'
import './edubot.css'

interface BotAction {
  label: string
  action: string
  data?: Record<string, unknown>
}

interface BotMessage {
  id: string
  content: string
  type: 'text' | 'suggestion' | 'action' | 'thinking'
  timestamp: string
  isBot: boolean
  suggestions?: string[]
  actions?: BotAction[]
  isTyping?: boolean
}

interface QuickActionData {
  id: string
  title: string
  description: string
  prompt: string
  icon: string
  category: string
}

interface CategoryData {
  id: string
  name: string
  icon: string
}

// FIX: Replaced the incorrect interface extension with a type alias using Omit.
type MockUser = Omit<User, 'firstName'> & {
  firstName?: string;
};

// Mock data
const mockQuickActions: QuickActionData[] = [
  { id: 'study-help', title: 'Study Help', description: 'Get help with specific subjects', icon: '📚', category: 'academic', prompt: 'I need help studying for my exams.' },
  { id: 'assignment-guidance', title: 'Assignment Guide', description: 'Guidance on assignments', icon: '📝', category: 'academic', prompt: 'I need help with my assignment.' },
  { id: 'schedule-help', title: 'Schedule', description: 'Time management help', icon: '📅', category: 'productivity', prompt: 'Help me create a study schedule.' },
  { id: 'exam-prep', title: 'Exam Prep', description: 'Strategies for exams', icon: '📊', category: 'academic', prompt: 'How do I prepare for exams?' },
  { id: 'research-help', title: 'Research', description: 'Help with research methods', icon: '🔍', category: 'academic', prompt: 'Help me with research for my project.' },
  { id: 'coding-help', title: 'Coding Help', description: 'Programming concepts', icon: '💻', category: 'technical', prompt: 'I need help with my code.' },
  { id: 'career-guidance', title: 'Career Guide', description: 'Advice on career paths', icon: '🎯', category: 'career', prompt: 'Give me career guidance.' },
  { id: 'stress-management', title: 'Stress Relief', description: 'Tips for managing stress', icon: '🧘', category: 'wellness', prompt: 'I am feeling stressed.' }
]

const mockCategories: CategoryData[] = [
  { id: 'all', name: 'All', icon: '🌟' },
  { id: 'academic', name: 'Academic', icon: '📚' },
  { id: 'technical', name: 'Technical', icon: '💻' },
  { id: 'productivity', name: 'Productivity', icon: '⚡' },
  { id: 'career', name: 'Career', icon: '🎯' },
  { id: 'wellness', name: 'Wellness', icon: '🧘' }
]

const botResponses = {
  greeting: "I am EduBot, your AI learning assistant. How can I assist you today?",
  'study-help': "Great! Effective study strategies include Active Recall and Spaced Repetition. Try summarizing key concepts in your own words after reading a chapter. What subject are you studying?",
  'assignment-guidance': "I can help with that! First, let's break down the requirements. What is the main objective of your assignment, and what is the deadline? I can help you create a structured approach.",
  'schedule-help': "Excellent! Time management is crucial for academic success. Let's start by identifying your peak productivity hours and current commitments. When do you feel most focused - morning or evening?",
  'exam-prep': "Let's get you ready for success! A good exam preparation strategy includes reviewing notes systematically, practicing with past papers, and maintaining a healthy routine. Which exam are you preparing for?",
  'research-help': "Research can be exciting! Start with defining your research question clearly, then identify credible sources. I can help you develop a research methodology. What's your research topic?",
  'coding-help': "Programming can be challenging but rewarding! What specific coding concept or language are you working with? I can help break down complex problems into manageable steps.",
  'career-guidance': "Career planning is important! Let's explore your interests, strengths, and goals. What field or industry interests you most? I can provide guidance on skills and pathways.",
  'stress-management': "It's completely normal to feel stressed during your studies. Let's work on some strategies like time management, deep breathing, and breaking tasks into smaller goals. What's causing you the most stress?",
  default: "That's an interesting question! I'm here to help with studying, assignments, research, and academic planning. Could you ask me something more specific about your educational needs?"
}

export default function EdubotPage() {
  const [user, setUser] = useState<MockUser | null>(null)
  const [loading, setLoading] = useState(true)
  const [messages, setMessages] = useState<BotMessage[]>([])
  const [inputMessage, setInputMessage] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [showQuickActions, setShowQuickActions] = useState(true)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100
      })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  useEffect(() => {
    const currentUser = AuthService.getCurrentUser()
    if (!currentUser) {
      router.push('/login')
      return
    }

    setUser(currentUser as MockUser)
    
    const welcomeMessage: BotMessage = {
      id: 'welcome-msg',
      content: `Hello ${currentUser.name.split(' ')[0]}! 👋\n${botResponses.greeting}\n\nI can help you with:\n• Study strategies and techniques\n• Assignment planning and guidance\n• Research methodology\n• Time management and scheduling\n• Exam preparation\n• Academic stress management\n\nWhat would you like to work on today?`,
      type: 'text',
      timestamp: new Date().toISOString(),
      isBot: true,
      suggestions: ['Study tips', 'Assignment help', 'Time management', 'Exam preparation']
    }

    setMessages([welcomeMessage])
    setLoading(false)
  }, [router])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const simulateBotResponse = (userMessage: string): BotMessage => {
    const lowerMessage = userMessage.toLowerCase()
    let responseContent = botResponses.default
    let suggestions: string[] = []
    let actions: BotAction[] = []

    if (lowerMessage.includes('study') || lowerMessage.includes('learn')) {
      responseContent = botResponses['study-help']
      suggestions = ['Create study schedule', 'Note-taking tips', 'Memory techniques', 'Study groups']
      actions = [
        { label: 'Create My Study Plan', action: 'create-study-plan' },
        { label: 'Find Study Resources', action: 'find-resources' }
      ]
    } else if (lowerMessage.includes('assignment') || lowerMessage.includes('project')) {
      responseContent = botResponses['assignment-guidance']
      suggestions = ['Research tips', 'Writing guidelines', 'Citation help', 'Proofreading checklist']
      actions = [
        { label: 'Start Assignment Planner', action: 'assignment-planner' }
      ]
    } else if (lowerMessage.includes('schedule') || lowerMessage.includes('time') || lowerMessage.includes('manage')) {
      responseContent = botResponses['schedule-help']
      suggestions = ['Daily schedule', 'Weekly planner', 'Priority matrix', 'Break planning']
    } else if (lowerMessage.includes('exam') || lowerMessage.includes('test') || lowerMessage.includes('prep')) {
      responseContent = botResponses['exam-prep']
      suggestions = ['Practice tests', 'Memory aids', 'Manage exam anxiety', 'Review schedule']
    } else if (lowerMessage.includes('research')) {
      responseContent = botResponses['research-help']
      suggestions = ['Source evaluation', 'Research methods', 'Citation styles', 'Data collection']
    } else if (lowerMessage.includes('code') || lowerMessage.includes('programming') || lowerMessage.includes('algorithm')) {
      responseContent = botResponses['coding-help']
      suggestions = ['Debug strategies', 'Code review', 'Best practices', 'Learning resources']
    } else if (lowerMessage.includes('career') || lowerMessage.includes('job') || lowerMessage.includes('future')) {
      responseContent = botResponses['career-guidance']
      suggestions = ['Skill development', 'Industry trends', 'Networking tips', 'Portfolio building']
    } else if (lowerMessage.includes('stress') || lowerMessage.includes('anxiety') || lowerMessage.includes('overwhelm')) {
      responseContent = botResponses['stress-management']
      suggestions = ['Breathing exercises', 'Task prioritization', 'Break strategies', 'Support resources']
    }

    return {
      id: `bot-msg-${Date.now()}`,
      content: responseContent,
      type: 'text',
      timestamp: new Date().toISOString(),
      isBot: true,
      suggestions,
      actions
    }
  }

  const handleSendMessage = async (messageText?: string) => {
    const currentMessage = (messageText || inputMessage).trim()
    if (!currentMessage) return

    const userMessage: BotMessage = {
      id: `user-msg-${Date.now()}`,
      content: currentMessage,
      type: 'text',
      timestamp: new Date().toISOString(),
      isBot: false
    }

    setMessages(prev => [...prev, userMessage])
    setInputMessage('')
    if (showQuickActions) setShowQuickActions(false)

    const typingMessage: BotMessage = {
      id: 'typing-indicator',
      content: '',
      type: 'thinking',
      timestamp: new Date().toISOString(),
      isBot: true,
      isTyping: true
    }

    setMessages(prev => [...prev, typingMessage])
    setIsTyping(true)

    setTimeout(() => {
      setMessages(prev => prev.filter(msg => msg.id !== 'typing-indicator'))
      setIsTyping(false)
      const botResponse = simulateBotResponse(userMessage.content)
      setMessages(prev => [...prev, botResponse])
    }, 1500 + Math.random() * 1000)
  }

  const handleQuickAction = (prompt: string) => {
    handleSendMessage(prompt)
  }

  const handleSuggestionClick = (suggestion: string) => {
    setInputMessage(suggestion)
    inputRef.current?.focus()
  }

  const handleActionClick = (action: BotAction) => {
    const actionMessage: BotMessage = {
      id: `action-msg-${Date.now()}`,
      content: `Great! I'm setting up the "${action.label}" feature for you. This will be available in a future update with personalized planning tools and interactive features!`,
      type: 'action',
      timestamp: new Date().toISOString(),
      isBot: true
    }
    setMessages(prev => [...prev, actionMessage])
  }

  const filteredQuickActions = selectedCategory === 'all'
    ? mockQuickActions
    : mockQuickActions.filter(action => action.category === selectedCategory)

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 flex items-center justify-center">
        <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-pulse">
          Waking up EduBot...
        </div>
      </div>
    )
  }

  if (!user) return null

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Enhanced Mathematical Background */}
      <div className="absolute inset-0">
        {/* Dynamic mouse-following gradient */}
        <div
          className="absolute inset-0 opacity-30 transition-all duration-700 ease-out"
          style={{
            background: `radial-gradient(800px circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(59, 130, 246, 0.2) 0%, rgba(168, 85, 247, 0.15) 25%, transparent 50%)`
          }}
        />

        {/* Animated gradient meshes */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-100/40 via-purple-100/35 to-pink-100/40 animate-mesh-drift-1" />
        <div className="absolute inset-0 bg-gradient-to-tr from-emerald-100/35 via-violet-100/30 to-orange-100/35 animate-mesh-drift-2" />
        <div className="absolute inset-0 bg-gradient-to-bl from-cyan-100/40 via-purple-100/25 to-rose-100/40 animate-mesh-drift-3" />

        {/* Mathematical Equations Background - Zoom Responsive */}
        <div className="absolute top-1/6 left-1/8 font-bold text-blue-600/70 animate-equation-float-1 equation-bg-large">
          ∫₀^∞ e^(-x²) dx = √π/2
        </div>
        <div className="absolute top-1/4 right-1/6 font-bold text-emerald-600/70 animate-equation-float-2 equation-bg-medium">
          ∑ᵢ₌₁^∞ 1/n² = π²/6
        </div>
        <div className="absolute bottom-1/4 left-1/6 font-bold text-pink-600/70 animate-equation-float-3 equation-bg-medium">
          E = mc² = ħω
        </div>
        <div className="absolute top-1/2 right-1/8 font-bold text-purple-600/70 animate-equation-float-4 equation-bg-medium">
          π = 4∑(-1)ⁿ/(2n+1)
        </div>
        <div className="absolute bottom-1/3 right-1/4 font-bold text-orange-600/70 animate-equation-float-1 equation-bg-medium">
          lim(x→0) sin(x)/x = 1
        </div>
        <div className="absolute top-2/3 left-1/4 font-bold text-cyan-600/70 animate-equation-float-2 equation-bg-small">
          a² + b² = c²
        </div>

        {/* Floating Knowledge Particles - Zoom Responsive */}
        {[...Array(40)].map((_, i) => (
          <div
            key={i}
            className={`absolute rounded-full animate-particle-drift-${(i % 4) + 1} shadow-md`}
            style={{
              width: `clamp(8px, 1vw, 12px)`,
              height: `clamp(8px, 1vw, 12px)`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 8}s`,
              animationDuration: `${6 + Math.random() * 4}s`,
              background: `radial-gradient(circle, ${['rgba(59, 130, 246, 0.8)', 'rgba(16, 185, 129, 0.8)', 'rgba(239, 68, 68, 0.8)', 'rgba(168, 85, 247, 0.8)', 'rgba(245, 158, 11, 0.8)', 'rgba(236, 72, 153, 0.8)'][i % 6]}, rgba(255,255,255,0.3))`
            }}
          />
        ))}
      </div>

      {/* Compact Chat Interface - Zoom Responsive */}
      <div className="relative z-20 min-h-screen flex items-center justify-center p-2 sm:p-4">
        <div className="chat-container flex flex-col w-full">
          
          {/* Glass Container with Enhanced Styling */}
          <div className="relative group h-full">
            {/* Outer glow effect */}
            <div className="absolute -inset-4 bg-gradient-to-r from-blue-300/30 via-purple-300/40 to-pink-300/30 rounded-3xl blur-xl opacity-60 group-hover:opacity-80 transition-all duration-1000 animate-aurora-glow" />

            {/* Main glass panel */}
            <div className="relative bg-white/60 backdrop-blur-xl rounded-3xl border border-white/80 shadow-2xl overflow-hidden h-full flex flex-col animate-glass-fade-in">
              
              {/* Inner glass effects */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-blue-50/20 to-purple-50/20 rounded-3xl" />
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-100/20 via-transparent to-purple-100/20 rounded-3xl" />

              {/* Header */}
              <header className="chat-header relative p-6 flex-shrink-0">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Link 
                      href={user.role === 'student' ? '/student/dashboard' : '/lecturer/dashboard'}
                      className="back-button"
                    >
                      <svg className="w-6 h-6" style={{ width: `clamp(1rem, 2.5vw, 1.5rem)`, height: `clamp(1rem, 2.5vw, 1.5rem)` }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    </Link>
                    <div className="bot-avatar rounded-full flex items-center justify-center text-white font-bold">
                      🤖
                    </div>
                    <div>
                      <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-text-glow">
                        EduBot AI Assistant
                      </h1>
                      <p className="text-sm text-gray-600 flex items-center gap-2">
                        <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                        Online & Ready to Help
                      </p>
                    </div>
                  </div>
                  <button 
                    onClick={() => setShowQuickActions(!showQuickActions)}
                    className="header-button"
                    aria-label="Toggle quick actions"
                  >
                    <svg className="w-6 h-6" style={{ width: `clamp(1rem, 2.5vw, 1.5rem)`, height: `clamp(1rem, 2.5vw, 1.5rem)` }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                  </button>
                </div>
              </header>

              {/* Quick Actions Panel - More Compact */}
              {showQuickActions && (
                <div className="quick-actions-panel quick-actions-compact relative px-6 py-4 flex-shrink-0">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg font-semibold text-gray-800">Quick Actions</h3>
                    <button 
                      onClick={() => setShowQuickActions(false)}
                      className="text-gray-500 hover:text-gray-700 p-1"
                    >
                      <svg className="w-4 h-4" style={{ width: `clamp(0.875rem, 2vw, 1.25rem)`, height: `clamp(0.875rem, 2vw, 1.25rem)` }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                  
                  {/* Category Filter - More Compact */}
                  <div className="flex flex-wrap gap-1 mb-3">
                    {mockCategories.map((category) => (
                      <button
                        key={category.id}
                        onClick={() => setSelectedCategory(category.id)}
                        className={`category-button text-xs px-2 py-1 ${selectedCategory === category.id ? 'active' : ''}`}
                      >
                        {category.icon} {category.name}
                      </button>
                    ))}
                  </div>

                  {/* Quick Action Cards - More Compact Grid */}
                  <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
                    {filteredQuickActions.map((action, index) => (
                      <button
                        key={action.id}
                        onClick={() => handleQuickAction(action.prompt)}
                        className="quick-action-card animate-fade-in-delayed p-2"
                        style={{ animationDelay: `${index * 50}ms` }}
                      >
                        <div className="text-lg sm:text-xl mb-1" style={{ fontSize: `clamp(0.875rem, 2.5vw, 1.25rem)` }}>{action.icon}</div>
                        <h4 className="font-semibold text-gray-800 text-xs leading-tight">{action.title}</h4>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Messages Area - Expanded and Always Visible */}
              <main className="messages-area messages-area-expanded relative flex-1 overflow-y-auto p-4 space-y-4 min-h-0 bg-white/20 backdrop-blur-sm rounded-2xl mx-4 mb-4">
                {!showQuickActions && (
                  <button 
                    onClick={() => setShowQuickActions(true)}
                    className="mb-4 px-3 py-2 bg-purple-100 hover:bg-purple-200 text-purple-700 rounded-lg text-sm font-medium transition-all duration-200"
                  >
                    Show Quick Actions
                  </button>
                )}
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div key={message.id} className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}>
                      <div className={`max-w-[80%] p-4 rounded-2xl ${
                        message.isBot 
                          ? 'bot-message animate-message-slide-left' 
                          : 'user-message animate-message-slide-right'
                      }`}>
                        {message.isTyping ? (
                          <div className="typing-indicator">
                            <div className="typing-dot animate-typing-pulse"></div>
                            <div className="typing-dot animate-typing-pulse"></div>
                            <div className="typing-dot animate-typing-pulse"></div>
                            <span className="text-sm text-gray-600 ml-2">EduBot is thinking...</span>
                          </div>
                        ) : (
                          <>
                            <div className="whitespace-pre-wrap">{message.content}</div>
                            
                            {message.suggestions && message.suggestions.length > 0 && (
                              <div className="flex flex-wrap gap-2 mt-3">
                                {message.suggestions.map((suggestion, index) => (
                                  <button
                                    key={index}
                                    onClick={() => handleSuggestionClick(suggestion)}
                                    className="suggestion-pill animate-suggestion-pop"
                                    style={{ animationDelay: `${index * 100}ms` }}
                                  >
                                    {suggestion}
                                  </button>
                                ))}
                              </div>
                            )}

                            {message.actions && message.actions.length > 0 && (
                              <div className="space-y-2 mt-3">
                                {message.actions.map((action, index) => (
                                  <button
                                    key={index}
                                    onClick={() => handleActionClick(action)}
                                    className="action-button"
                                  >
                                    {action.label}
                                  </button>
                                ))}
                              </div>
                            )}

                            <div className="text-right text-xs mt-2 opacity-70">
                              {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                <div ref={messagesEndRef} />
              </main>

              {/* Input Area */}
              <footer className="input-container relative p-4 flex-shrink-0">
                <div className="flex items-center gap-3">
                  <div className="input-field-container flex-1 relative">
                    <input
                      ref={inputRef}
                      type="text"
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && handleSendMessage()}
                      placeholder="Ask me anything about studying, assignments, or research..."
                      className="message-input"
                      disabled={isTyping}
                    />
                  </div>
                  <button
                    onClick={() => handleSendMessage()}
                    disabled={!inputMessage.trim() || isTyping}
                    className="send-button"
                    aria-label="Send message"
                  >
                    <svg className="w-6 h-6" style={{ width: `clamp(1rem, 2.5vw, 1.5rem)`, height: `clamp(1rem, 2.5vw, 1.5rem)` }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                  </button>
                </div>
              </footer>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}