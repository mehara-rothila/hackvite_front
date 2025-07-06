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

// Add these new interfaces to fix the any types
interface QuickActionData {
  id: string
  title: string
  description: string
  prompt: string
  icon: string
  category: string
  [key: string]: unknown
}

interface CategoryData {
  id: string
  name: string
  icon: string
  [key: string]: unknown
}

export default function EdubotPage() {
  const [user, setUser] = useState<User | null>(null)
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

  // Get mock data from CSS custom properties
  const getDataFromCSS = (property: string) => {
    try {
      const cssData = getComputedStyle(document.documentElement).getPropertyValue(property)
      return JSON.parse(cssData.replace(/\\n/g, '\n'))
    } catch {
      return {}
    }
  }

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
    
    setUser(currentUser)
    
    // Get greeting from CSS
    const botResponses = getDataFromCSS('--bot-responses')
    const greeting = botResponses.greeting || "Hello! I'm EduBot, your AI learning assistant."
    
    const welcomeMessage: BotMessage = {
      id: 'welcome-msg',
      content: `Hello ${currentUser.firstName || currentUser.name}! 👋 ${greeting}`,
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
    const botResponses = getDataFromCSS('--bot-responses')
    
    let responseContent = "I understand you're asking about that topic. Let me help you with some guidance and suggestions."
    let suggestions: string[] = []
    let actions: BotAction[] = []

    if (lowerMessage.includes('study') || lowerMessage.includes('learn')) {
      responseContent = botResponses['study-help'] || responseContent
      suggestions = ['Create study schedule', 'Note-taking tips', 'Memory techniques', 'Study groups']
      actions = [
        { label: 'Create Study Plan', action: 'create-study-plan' },
        { label: 'Find Study Resources', action: 'find-resources' }
      ]
    } else if (lowerMessage.includes('assignment') || lowerMessage.includes('project')) {
      responseContent = botResponses['assignment-guidance'] || responseContent
      suggestions = ['Research tips', 'Writing guidelines', 'Citation help', 'Time planning']
      actions = [
        { label: 'Assignment Planner', action: 'assignment-planner' },
        { label: 'Find Resources', action: 'research-help' }
      ]
    } else if (lowerMessage.includes('schedule') || lowerMessage.includes('time') || lowerMessage.includes('manage')) {
      responseContent = botResponses['schedule-help'] || responseContent
      suggestions = ['Daily schedule', 'Weekly planner', 'Priority matrix', 'Break reminders']
    } else if (lowerMessage.includes('exam') || lowerMessage.includes('test') || lowerMessage.includes('prep')) {
      responseContent = botResponses['exam-prep'] || responseContent
      suggestions = ['Practice tests', 'Study techniques', 'Memory aids', 'Exam anxiety']
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

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return

    const userMessage: BotMessage = {
      id: `user-msg-${Date.now()}`,
      content: inputMessage.trim(),
      type: 'text',
      timestamp: new Date().toISOString(),
      isBot: false
    }

    setMessages(prev => [...prev, userMessage])
    setInputMessage('')
    setShowQuickActions(false)

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
    setInputMessage(prompt)
    setShowQuickActions(false)
    setTimeout(() => handleSendMessage(), 100)
  }

  const handleSuggestionClick = (suggestion: string) => {
    setInputMessage(suggestion)
    inputRef.current?.focus()
  }

  const handleActionClick = (action: BotAction) => {
    const actionMessage: BotMessage = {
      id: `action-msg-${Date.now()}`,
      content: `Great! I'm setting up ${action.label.toLowerCase()} for you. This feature will be available soon!`,
      type: 'action',
      timestamp: new Date().toISOString(),
      isBot: true
    }
    setMessages(prev => [...prev, actionMessage])
  }

  // Quick actions and categories from CSS
  const quickActions = getDataFromCSS('--quick-actions')
  const categories = getDataFromCSS('--categories')
  
  const quickActionsArray = Object.entries(quickActions).map(([id, data]: [string, unknown]) => ({
    id,
    ...(data as Omit<QuickActionData, 'id'>)
  }))
  
  const categoriesArray = Object.entries(categories).map(([id, data]: [string, unknown]) => ({
    id,
    ...(data as Omit<CategoryData, 'id'>)
  }))

  const filteredQuickActions = selectedCategory === 'all' 
    ? quickActionsArray 
    : quickActionsArray.filter((action: QuickActionData) => action.category === selectedCategory)

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center relative overflow-hidden mock-data-container">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-100/40 via-purple-100/35 to-pink-100/40 animate-mesh-drift-1" />
          <div className="absolute inset-0 bg-gradient-to-tr from-emerald-100/35 via-violet-100/30 to-orange-100/35 animate-mesh-drift-2" />
        </div>
        <div className="relative z-10">
          <div className="loading-spinner w-16 h-16 mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Loading EduBot...</p>
        </div>
      </div>
    )
  }

  if (!user) return null

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 mock-data-container">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0 opacity-20 transition-all duration-700 ease-out"
          style={{
            background: `radial-gradient(800px circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(168, 85, 247, 0.2) 0%, rgba(59, 130, 246, 0.15) 25%, transparent 50%)`
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-blue-100/40 via-purple-100/35 to-pink-100/40 animate-mesh-drift-1" />
        <div className="absolute inset-0 bg-gradient-to-tr from-emerald-100/35 via-violet-100/30 to-orange-100/35 animate-mesh-drift-2" />
        <div className="absolute inset-0 bg-gradient-to-bl from-cyan-100/40 via-purple-100/25 to-rose-100/40 animate-mesh-drift-3" />
        <div className="absolute inset-0 bg-gradient-to-r from-yellow-100/30 via-transparent to-green-100/30 animate-mesh-drift-4" />
      </div>

      {/* AI Equations & Particles */}
      <div className="absolute inset-0 z-0 ai-equation-1 ai-equation-2 ai-equation-3 ai-equation-4 ai-equation-5 ai-equation-6">
        <div className="ai-particles">
          {[...Array(12)].map((_, i) => (
            <div key={i} className="ai-particle" />
          ))}
        </div>
      </div>

      {/* Glass Orbs */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-16 left-16 w-64 h-64 bg-gradient-to-br from-purple-200/20 to-blue-200/15 rounded-full backdrop-blur-sm border border-purple-300/30 animate-glass-float-1 shadow-lg" />
        <div className="absolute top-32 right-24 w-80 h-80 bg-gradient-to-br from-blue-200/20 to-cyan-200/15 rounded-full backdrop-blur-sm border border-blue-300/30 animate-glass-float-2 shadow-lg" />
        <div className="absolute bottom-24 left-32 w-72 h-72 bg-gradient-to-br from-emerald-200/20 to-teal-200/15 rounded-full backdrop-blur-sm border border-emerald-300/25 animate-glass-float-3 shadow-lg" />
      </div>

      {/* Chat Interface */}
      <div className="relative z-10 min-h-screen flex flex-col chat-container">
        
        {/* Header */}
        <div className="chat-header px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link 
                href={user.role === 'student' ? '/student/dashboard' : '/lecturer/dashboard'} 
                className="back-button"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </Link>
              
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bot-avatar rounded-xl flex items-center justify-center">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                
                <div>
                  <h1 className="text-lg font-bold text-gray-900">EduBot AI Assistant</h1>
                  <p className="text-sm text-gray-600">Your personal learning companion</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <button 
                onClick={() => setShowQuickActions(!showQuickActions)}
                className="header-button"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        {showQuickActions && (
          <div className="quick-actions-panel p-4">
            <h3 className="text-sm font-bold text-gray-700 mb-3">Quick Actions</h3>
            <div className="flex flex-wrap gap-2 mb-4">
              {categoriesArray.map((category: CategoryData) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`category-button px-3 py-2 rounded-full text-sm font-medium ${
                    selectedCategory === category.id ? 'active' : ''
                  }`}
                >
                  {category.icon} {category.name}
                </button>
              ))}
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {filteredQuickActions.map((action: QuickActionData, index: number) => (
                <button
                  key={action.id}
                  onClick={() => handleQuickAction(action.prompt)}
                  className="quick-action-card p-3 rounded-xl text-left animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="text-xl">{action.icon}</span>
                    <h4 className="font-bold text-gray-900 text-sm">{action.title}</h4>
                  </div>
                  <p className="text-xs text-gray-600 leading-relaxed">{action.description}</p>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 messages-area">
          {messages.map((message) => (
            <div key={message.id} className={`message-container flex ${message.isBot ? 'justify-start' : 'justify-end'}`}>
              <div className={message.isBot ? 'bot-message' : 'user-message'}>
                {message.isTyping ? (
                  <div className="typing-indicator flex items-center space-x-3">
                    <div className="typing-dots">
                      <div className="typing-dot"></div>
                      <div className="typing-dot"></div>
                      <div className="typing-dot"></div>
                    </div>
                    <span className="text-sm text-gray-500 font-medium">EduBot is thinking...</span>
                  </div>
                ) : (
                  <>
                    <div className="whitespace-pre-line text-sm leading-relaxed font-medium">
                      {message.content}
                    </div>
                    
                    {message.suggestions && message.suggestions.length > 0 && (
                      <div className="mt-4 flex flex-wrap gap-2">
                        {message.suggestions.map((suggestion, index) => (
                          <button
                            key={index}
                            onClick={() => handleSuggestionClick(suggestion)}
                            className="suggestion-pill"
                            style={{ animationDelay: `${index * 0.1}s` }}
                          >
                            {suggestion}
                          </button>
                        ))}
                      </div>
                    )}
                    
                    {message.actions && message.actions.length > 0 && (
                      <div className="mt-4 space-y-2">
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
                    
                    <div className="mt-3">
                      <p className="text-xs opacity-75 font-medium">
                        {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </>
                )}
              </div>
            </div>
          ))}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="input-container p-4">
          <div className="flex items-center space-x-3">
            <div className="flex-1 relative">
              <input
                ref={inputRef}
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && handleSendMessage()}
                placeholder="Ask me anything about your studies..."
                className="message-input"
                disabled={isTyping}
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xs text-gray-400 hidden sm:block">
                Press Enter to send
              </div>
            </div>
            
            <button 
              onClick={handleSendMessage}
              disabled={!inputMessage.trim() || isTyping}
              className="send-button"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
          </div>
          
          <div className="mt-3 text-xs text-gray-500 text-center font-medium">
            EduBot can help with studies, assignments, time management, career guidance, and more!
          </div>
        </div>
      </div>
    </div>
  )
}
