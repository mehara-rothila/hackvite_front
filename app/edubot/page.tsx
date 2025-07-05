// app/edubot/page.tsx
'use client'

import { useEffect, useState, useRef, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { AuthService } from '../../lib/auth'
import { User } from '../../types'

// FIX: Defined a specific type for bot actions to replace `any`.
interface BotAction {
  label: string
  action: string
  data?: Record<string, unknown> // Use Record<string, unknown> as a safer alternative to any
}

interface BotMessage {
  id: string
  content: string
  type: 'text' | 'suggestion' | 'action' | 'thinking'
  timestamp: string
  isBot: boolean
  suggestions?: string[]
  // FIX: Used the new BotAction type.
  actions?: BotAction[]
  isTyping?: boolean
}

interface QuickAction {
  id: string
  title: string
  description: string
  icon: string
  category: string
  prompt: string
}

export default function EdubotPage() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [messages, setMessages] = useState<BotMessage[]>([])
  const [inputMessage, setInputMessage] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [showQuickActions, setShowQuickActions] = useState(true)
  // FIX: Removed unused 'conversationContext' and 'setConversationContext' state.

  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  // Quick action templates
  const quickActions: QuickAction[] = [
    {
      id: 'study-help',
      title: 'Study Help',
      description: 'Get help with specific subjects or topics',
      icon: '📚',
      category: 'academic',
      prompt: 'I need help studying for my exams. Can you provide study strategies and tips?'
    },
    {
      id: 'assignment-guidance',
      title: 'Assignment Guidance',
      description: 'Get guidance on assignments and projects',
      icon: '📝',
      category: 'academic',
      prompt: 'I need help understanding my assignment requirements and how to approach it.'
    },
    {
      id: 'schedule-help',
      title: 'Schedule Management',
      description: 'Help with time management and scheduling',
      icon: '📅',
      category: 'productivity',
      prompt: 'Help me create an effective study schedule and manage my time better.'
    },
    {
      id: 'exam-prep',
      title: 'Exam Preparation',
      description: 'Strategies for effective exam preparation',
      icon: '📊',
      category: 'academic',
      prompt: 'What are the best strategies for preparing for upcoming exams?'
    },
    {
      id: 'research-help',
      title: 'Research Assistance',
      description: 'Help with research methods and resources',
      icon: '🔍',
      category: 'academic',
      prompt: 'I need help with research methodology and finding reliable sources for my project.'
    },
    {
      id: 'coding-help',
      title: 'Programming Help',
      description: 'Get help with coding and programming concepts',
      icon: '💻',
      category: 'technical',
      prompt: 'I need help understanding programming concepts and debugging my code.'
    },
    {
      id: 'career-guidance',
      title: 'Career Guidance',
      description: 'Advice on career paths and opportunities',
      icon: '🎯',
      category: 'career',
      prompt: 'I would like guidance on career paths and opportunities in my field of study.'
    },
    {
      id: 'stress-management',
      title: 'Stress Management',
      description: 'Tips for managing academic stress',
      icon: '🧘',
      category: 'wellness',
      prompt: 'I\'m feeling overwhelmed with my studies. Can you help me manage stress and anxiety?'
    }
  ]

  // Predefined bot responses for different scenarios
  const botResponses = {
    greeting: "Hello! I'm EduBot, your AI learning assistant. I'm here to help you with your studies, assignments, career guidance, and much more. How can I assist you today?",
    
    'study-help': "I'd be happy to help you with your studies! Here are some effective study strategies:\n\n📚 **Active Learning Techniques:**\n• Use the Pomodoro Technique (25 min study + 5 min break)\n• Create mind maps and visual summaries\n• Practice active recall instead of just re-reading\n• Teach concepts to others or explain them out loud\n\n📝 **Note-Taking Tips:**\n• Use the Cornell Note-Taking System\n• Review and summarize notes within 24 hours\n• Create flashcards for key concepts\n\nWhat specific subject are you studying? I can provide more targeted advice!",
    
    'assignment-guidance': "Let me help you approach your assignment systematically! Here's a step-by-step framework:\n\n📋 **Assignment Analysis:**\n1. Read requirements carefully and highlight key terms\n2. Identify the assignment type (essay, report, project, etc.)\n3. Note the deadline and create a timeline\n4. Understand the grading criteria\n\n🎯 **Planning Phase:**\n• Break the assignment into smaller tasks\n• Research and gather relevant sources\n• Create an outline or structure\n• Set mini-deadlines for each section\n\nWhat type of assignment are you working on? I can provide more specific guidance!",
    
    'schedule-help': "Great choice! Effective time management is crucial for academic success. Here's how to create a winning study schedule:\n\n⏰ **Time Audit:**\n• Track your current activities for a week\n• Identify your most productive hours\n• Note when you typically lose focus\n\n📅 **Schedule Creation:**\n• Use time-blocking for specific subjects\n• Include breaks and buffer time\n• Plan both daily and weekly reviews\n• Set aside time for unexpected tasks\n\n🎯 **Prioritization:**\n• Use the Eisenhower Matrix (urgent vs important)\n• Focus on high-impact activities first\n• Balance different subjects throughout the week\n\nWould you like help creating a specific schedule for this week?",
    
    'exam-prep': "Excellent! Let me share proven exam preparation strategies:\n\n📚 **4-Week Exam Prep Plan:**\n\n**Week 4 (Start):**\n• Gather all study materials\n• Create a study schedule\n• Review course outline and past exams\n\n**Week 3:**\n• Active reading and note-taking\n• Create mind maps and summaries\n• Form study groups\n\n**Week 2:**\n• Practice tests and past papers\n• Identify weak areas\n• Focus on problem areas\n\n**Week 1:**\n• Final review and memorization\n• Light practice questions\n• Prepare mentally and physically\n\n🧠 **Memory Techniques:**\n• Spaced repetition\n• Mnemonics and acronyms\n• Visual associations\n\nWhat subject are you preparing for? I can provide subject-specific strategies!"
  }

  // FIX: Added missing dependency `botResponses.greeting`.
  // Wrapped in useCallback to stabilize the function reference for the dependency array.
  const greeting = useCallback(() => botResponses.greeting, [botResponses.greeting]);

  useEffect(() => {
    const currentUser = AuthService.getCurrentUser()
    
    if (!currentUser) {
      router.push('/login')
      return
    }
    
    setUser(currentUser)
    
    // Initialize with welcome message
    const welcomeMessage: BotMessage = {
      id: 'welcome-msg',
      content: `Hello ${currentUser.firstName}! 👋 ${greeting()}`,
      type: 'text',
      timestamp: new Date().toISOString(),
      isBot: true,
      suggestions: ['Study tips', 'Assignment help', 'Time management', 'Exam preparation']
    }
    
    setMessages([welcomeMessage])
    setLoading(false)
  }, [router, greeting])

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const simulateBotResponse = (userMessage: string): BotMessage => {
    const lowerMessage = userMessage.toLowerCase()
    
    // Determine response based on user input
    let responseContent = "I understand you're asking about that topic. Let me help you with some guidance and suggestions."
    let suggestions: string[] = []
    // FIX: Used the specific BotAction type instead of `any[]`.
    let actions: BotAction[] = []

    if (lowerMessage.includes('study') || lowerMessage.includes('learn')) {
      responseContent = botResponses['study-help']
      suggestions = ['Create study schedule', 'Note-taking tips', 'Memory techniques', 'Study groups']
      actions = [
        { label: 'Create Study Plan', action: 'create-study-plan', data: { type: 'study-plan' }},
        { label: 'Find Study Resources', action: 'find-resources', data: { type: 'resources' }}
      ]
    } else if (lowerMessage.includes('assignment') || lowerMessage.includes('project')) {
      responseContent = botResponses['assignment-guidance']
      suggestions = ['Research tips', 'Writing guidelines', 'Citation help', 'Time planning']
      actions = [
        { label: 'Assignment Planner', action: 'assignment-planner', data: { type: 'planner' }},
        { label: 'Find Resources', action: 'research-help', data: { type: 'research' }}
      ]
    } else if (lowerMessage.includes('schedule') || lowerMessage.includes('time') || lowerMessage.includes('manage')) {
      responseContent = botResponses['schedule-help']
      suggestions = ['Daily schedule', 'Weekly planner', 'Priority matrix', 'Break reminders']
      actions = [
        { label: 'Create Schedule', action: 'create-schedule', data: { type: 'schedule' }},
        { label: 'Time Tracker', action: 'time-tracker', data: { type: 'tracker' }}
      ]
    } else if (lowerMessage.includes('exam') || lowerMessage.includes('test') || lowerMessage.includes('prep')) {
      responseContent = botResponses['exam-prep']
      suggestions = ['Practice tests', 'Study techniques', 'Memory aids', 'Exam anxiety']
      actions = [
        { label: 'Exam Schedule', action: 'exam-schedule', data: { type: 'exam-plan' }},
        { label: 'Practice Questions', action: 'practice-questions', data: { type: 'practice' }}
      ]
    } else if (lowerMessage.includes('code') || lowerMessage.includes('program') || lowerMessage.includes('debug')) {
      responseContent = "I can help you with programming! Here are some coding tips:\n\n💻 **Debugging Strategies:**\n• Read error messages carefully\n• Use console.log() or print statements\n• Break down complex problems\n• Check syntax and indentation\n\n📚 **Learning Resources:**\n• Practice with coding challenges\n• Read documentation thoroughly\n• Join coding communities\n• Work on small projects\n\nWhat programming language are you working with?"
      suggestions = ['Debugging help', 'Code review', 'Best practices', 'Learning resources']
    } else if (lowerMessage.includes('stress') || lowerMessage.includes('anxiety') || lowerMessage.includes('overwhelm')) {
      responseContent = "I understand academic stress can be challenging. Here are some strategies to help:\n\n🧘 **Stress Management:**\n• Practice deep breathing exercises\n• Take regular breaks during study\n• Maintain a healthy sleep schedule\n• Exercise regularly, even just walking\n\n💪 **Coping Strategies:**\n• Break large tasks into smaller ones\n• Focus on what you can control\n• Reach out to friends, family, or counselors\n• Celebrate small victories\n\nRemember, it's okay to ask for help. Your mental health is important!"
      suggestions = ['Relaxation techniques', 'Study breaks', 'Support resources', 'Healthy habits']
    } else if (lowerMessage.includes('career') || lowerMessage.includes('job') || lowerMessage.includes('future')) {
      responseContent = "Career planning is exciting! Let me help you explore your options:\n\n🎯 **Career Exploration:**\n• Identify your interests and strengths\n• Research industry trends and opportunities\n• Network with professionals in your field\n• Gain practical experience through internships\n\n📈 **Skill Development:**\n• Focus on both technical and soft skills\n• Stay updated with industry technologies\n• Build a portfolio of your work\n• Develop communication and leadership skills\n\nWhat field are you interested in? I can provide more specific guidance!"
      suggestions = ['Industry insights', 'Skill requirements', 'Networking tips', 'Portfolio building']
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

    // Add user message
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

    // Show typing indicator
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

    // Simulate bot thinking time
    setTimeout(() => {
      setMessages(prev => prev.filter(msg => msg.id !== 'typing-indicator'))
      setIsTyping(false)

      // Generate bot response
      const botResponse = simulateBotResponse(userMessage.content)
      setMessages(prev => [...prev, botResponse])
    }, 1500 + Math.random() * 1000) // 1.5-2.5 seconds
  }

  const handleQuickAction = (action: QuickAction) => {
    setInputMessage(action.prompt)
    setShowQuickActions(false)
    // Auto-send the message
    setTimeout(() => {
      handleSendMessage()
    }, 100)
  }

  const handleSuggestionClick = (suggestion: string) => {
    setInputMessage(suggestion)
    inputRef.current?.focus()
  }

  // FIX: Used the specific BotAction type instead of `any`.
  const handleActionClick = (action: BotAction) => {
    // Mock action handling
    const actionMessage: BotMessage = {
      id: `action-msg-${Date.now()}`,
      content: `Great! I'm setting up ${action.label.toLowerCase()} for you. This feature will be available soon!`,
      type: 'action',
      timestamp: new Date().toISOString(),
      isBot: true
    }
    setMessages(prev => [...prev, actionMessage])
  }

  const filteredQuickActions = selectedCategory === 'all' 
    ? quickActions 
    : quickActions.filter(action => action.category === selectedCategory)

  const categories = [
    { id: 'all', name: 'All', icon: '🌟' },
    { id: 'academic', name: 'Academic', icon: '📚' },
    { id: 'technical', name: 'Technical', icon: '💻' },
    { id: 'productivity', name: 'Productivity', icon: '⚡' },
    { id: 'career', name: 'Career', icon: '🎯' },
    { id: 'wellness', name: 'Wellness', icon: '🧘' }
  ]

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-600"></div>
      </div>
    )
  }

  if (!user) return null

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link 
              href={user.role === 'student' ? '/student/dashboard' : '/lecturer/dashboard'} 
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </Link>
            
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">🤖</span>
              </div>
              
              <div>
                <h1 className="text-lg font-semibold text-gray-900">EduBot AI Assistant</h1>
                <p className="text-sm text-gray-600">Your personal learning companion</p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <button 
              onClick={() => setShowQuickActions(!showQuickActions)}
              className="p-2 text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </button>
            <button className="p-2 text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Quick Actions Sidebar */}
      {showQuickActions && (
        <div className="bg-white border-b border-gray-200 p-4">
          <div className="mb-4">
            <h3 className="text-sm font-medium text-gray-700 mb-3">Quick Actions</h3>
            <div className="flex flex-wrap gap-2 mb-4">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-3 py-1 rounded-full text-sm transition-colors ${
                    selectedCategory === category.id
                      ? 'bg-purple-100 text-purple-800'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category.icon} {category.name}
                </button>
              ))}
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
            {filteredQuickActions.map((action) => (
              <button
                key={action.id}
                onClick={() => handleQuickAction(action)}
                className="text-left p-3 border border-gray-200 rounded-lg hover:shadow-md hover:border-purple-300 transition-all"
              >
                <div className="flex items-center space-x-2 mb-2">
                  <span className="text-lg">{action.icon}</span>
                  <h4 className="font-medium text-gray-900 text-sm">{action.title}</h4>
                </div>
                <p className="text-xs text-gray-600">{action.description}</p>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div key={message.id} className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}>
            <div className={`max-w-xs lg:max-w-2xl ${
              message.isBot ? 'bg-white border border-gray-200' : 'bg-purple-600 text-white'
            } rounded-lg px-4 py-3`}>
              {message.isTyping ? (
                <div className="flex items-center space-x-2">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                  <span className="text-sm text-gray-500">EduBot is thinking...</span>
                </div>
              ) : (
                <>
                  <div className="whitespace-pre-line text-sm leading-relaxed">
                    {message.content}
                  </div>
                  
                  {message.suggestions && message.suggestions.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {message.suggestions.map((suggestion, index) => (
                        <button
                          key={index}
                          onClick={() => handleSuggestionClick(suggestion)}
                          className="bg-purple-50 text-purple-700 px-3 py-1 rounded-full text-xs hover:bg-purple-100 transition-colors"
                        >
                          {suggestion}
                        </button>
                      ))}
                    </div>
                  )}
                  
                  {message.actions && message.actions.length > 0 && (
                    <div className="mt-3 space-y-2">
                      {message.actions.map((action, index) => (
                        <button
                          key={index}
                          onClick={() => handleActionClick(action)}
                          className="block w-full bg-purple-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-purple-700 transition-colors"
                        >
                          {action.label}
                        </button>
                      ))}
                    </div>
                  )}
                  
                  <div className="mt-2">
                    <p className="text-xs opacity-75">
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

      {/* Input Area */}
      <div className="bg-white border-t border-gray-200 p-4">
        <div className="flex items-center space-x-3">
          <div className="flex-1 relative">
            <input
              ref={inputRef}
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Ask me anything about your studies..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              disabled={isTyping}
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xs text-gray-400">
              Press Enter to send
            </div>
          </div>
          
          <button 
            onClick={handleSendMessage}
            disabled={!inputMessage.trim() || isTyping}
            className="bg-purple-600 text-white p-3 rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </div>
        
        <div className="mt-2 text-xs text-gray-500 text-center">
          EduBot can help with studies, assignments, time management, career guidance, and more!
        </div>
      </div>
    </div>
  )
}