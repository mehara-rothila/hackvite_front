// app/edubot/page.tsx
'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'

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
  icon: string
  action: string
}

const quickActions: QuickAction[] = [
  { id: '1', text: 'Assignment deadlines', icon: '📅', action: 'assignment_deadlines' },
  { id: '2', text: 'Office hours', icon: '🕐', action: 'office_hours' },
  { id: '3', text: 'Course materials', icon: '📚', action: 'course_materials' },
  { id: '4', text: 'Exam information', icon: '📝', action: 'exam_info' },
  { id: '5', text: 'Technical support', icon: '🔧', action: 'tech_support' },
  { id: '6', text: 'Grading policy', icon: '📊', action: 'grading_policy' }
]

const commonQuestions = [
  "What are the office hours for Dr. Sarah Johnson?",
  "When is the next assignment due for CS101?",
  "How do I submit my assignment?",
  "What's the grading policy for this course?",
  "Where can I find course materials?",
  "How do I book an appointment with my lecturer?"
]

// Mock responses with realistic AI behavior
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
  }
  else if (message.includes('assignment') && (message.includes('deadline') || message.includes('due'))) {
    content = "Here are the upcoming assignment deadlines:\n\n📋 **CS101 - Introduction to Programming:**\n• Assignment 3: July 30, 2025 (11:59 PM)\n• Lab Report 4: August 2, 2025 (5:00 PM)\n\n📋 **MATH202 - Calculus II:**\n• Problem Set 5: August 1, 2025 (11:59 PM)\n• Midterm Project: August 5, 2025 (11:59 PM)\n\nRemember to submit through the course portal before the deadline!"
    suggestions = ["View course resources", "Ask about extensions", "Check submission format"]
    relatedLinks = [
      { text: "Course Resources", url: "/student/resources", type: "resource" },
      { text: "Submit Query about Assignment", url: "/student/queries", type: "query" }
    ]
  }
  else if (message.includes('grading') || message.includes('grade')) {
    content = "Here's the grading policy information:\n\n📊 **CS101 Grading Breakdown:**\n• Assignments: 40%\n• Labs: 20%\n• Midterm Exam: 20%\n• Final Project: 20%\n\n📊 **MATH202 Grading Breakdown:**\n• Problem Sets: 30%\n• Quizzes: 20%\n• Midterm: 25%\n• Final Exam: 25%\n\nGrades are updated weekly. Late submissions have a 10% penalty per day."
    suggestions = ["Check my grades", "Late submission policy", "Grade appeal process"]
  }
  else if (message.includes('submit') || message.includes('submission')) {
    content = "Here's how to submit your assignments:\n\n📤 **Submission Process:**\n1. Go to Course Resources section\n2. Find your course (CS101, MATH202, etc.)\n3. Click on the assignment link\n4. Upload your file (PDF preferred)\n5. Add any comments if needed\n6. Click 'Submit'\n\n⚠️ **Important:**\n• Submit before the deadline\n• Check file format requirements\n• Keep a backup copy\n• You'll receive a confirmation email"
    suggestions = ["View submission formats", "Check deadline", "Technical help"]
    relatedLinks = [
      { text: "Course Resources", url: "/student/resources", type: "resource" },
      { text: "Technical Support Query", url: "/student/queries", type: "query" }
    ]
  }
  else if (message.includes('course material') || message.includes('materials') || message.includes('resources')) {
    content = "You can find all course materials in the Resources section:\n\n📚 **Available Resources:**\n• Lecture notes and slides\n• Assignment instructions\n• Lab materials\n• Reading materials\n• Example codes and solutions\n• Study guides\n\nMaterials are organized by course and updated regularly by your lecturers."
    suggestions = ["Browse resources", "Search specific topic", "Download materials"]
    relatedLinks = [
      { text: "View All Resources", url: "/student/resources", type: "resource" }
    ]
  }
  else if (message.includes('exam') || message.includes('test') || message.includes('midterm') || message.includes('final')) {
    content = "Here's exam information for your courses:\n\n📝 **Upcoming Exams:**\n\n**CS101 Midterm:**\n• Date: August 8, 2025\n• Time: 2:00-4:00 PM\n• Location: Hall A\n• Covers: Chapters 1-6\n\n**MATH202 Quiz:**\n• Date: July 30, 2025\n• Time: During class\n• Covers: Integration techniques\n\nStudy materials and practice exams are available in the resources section!"
    suggestions = ["View study materials", "Book review session", "Exam format"]
    relatedLinks = [
      { text: "Study Materials", url: "/student/resources", type: "resource" },
      { text: "Book Review Session", url: "/student/appointments", type: "appointment" }
    ]
  }
  else if (message.includes('appointment') || message.includes('book') || message.includes('schedule')) {
    content = "To book an appointment with your lecturer:\n\n📅 **Appointment Booking:**\n1. Go to 'Appointments' section\n2. Select your lecturer\n3. Choose available time slot\n4. Fill in appointment details\n5. Submit request\n\nYour lecturer will confirm within 24 hours. You can also check their office hours for drop-in visits!"
    suggestions = ["Book now", "View office hours", "Check my appointments"]
    relatedLinks = [
      { text: "Book Appointment", url: "/student/appointments", type: "appointment" }
    ]
  }
  else if (message.includes('technical') || message.includes('problem') || message.includes('issue') || message.includes('help')) {
    content = "For technical support:\n\n🔧 **Common Solutions:**\n• Clear browser cache and cookies\n• Try a different browser\n• Check internet connection\n• Disable browser extensions\n\n**Still having issues?**\nSubmit a technical support query with details about:\n• What you were trying to do\n• Error messages you see\n• Browser and device type\n\nOur IT team responds within 2 hours during business hours."
    suggestions = ["Submit tech query", "Browser troubleshooting", "Contact IT directly"]
    relatedLinks = [
      { text: "Submit Technical Query", url: "/student/queries", type: "query" }
    ]
  }
  else if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
    content = "Hello! 👋 I'm EduBot, your AI assistant for academic support.\n\nI can help you with:\n• Assignment deadlines and submission\n• Office hours and appointments\n• Course materials and resources\n• Exam information\n• Technical support\n• General academic questions\n\nWhat would you like to know today?"
    suggestions = ["Show assignment deadlines", "Find office hours", "View course materials"]
  }
  else {
    // Generic helpful response
    content = "I understand you're asking about: \"" + userMessage + "\"\n\nI'm here to help! I can assist you with:\n\n📚 **Academic Support:**\n• Assignment deadlines and requirements\n• Course materials and resources\n• Exam schedules and study materials\n\n👥 **Communication:**\n• Lecturer office hours\n• Booking appointments\n• Submitting queries\n\n🔧 **Technical Help:**\n• Platform navigation\n• Submission processes\n• Troubleshooting\n\nCould you be more specific about what you need help with?"
    suggestions = ["Assignment help", "Contact lecturer", "Technical support"]
    relatedLinks = [
      { text: "Submit Detailed Query", url: "/student/queries", type: "query" },
      { text: "Browse Resources", url: "/student/resources", type: "resource" }
    ]
  }

  return {
    id: Date.now().toString(),
    content,
    sender: 'bot',
    timestamp: new Date().toLocaleString(),
    type: 'text',
    suggestions,
    relatedLinks
  }
}

export default function EduBotPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hello! 👋 I'm EduBot, your AI assistant. I'm here to help you with academic questions, course information, and university services.\n\nHow can I assist you today?",
      sender: 'bot',
      timestamp: new Date().toLocaleString(),
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

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: text,
      sender: 'user',
      timestamp: new Date().toLocaleString(),
      type: 'text'
    }

    setMessages(prev => [...prev, userMessage])
    setInputMessage('')
    setIsTyping(true)

    // Simulate AI thinking time
    setTimeout(() => {
      const botResponse = generateBotResponse(text)
      setMessages(prev => [...prev, botResponse])
      setIsTyping(false)
    }, 1000 + Math.random() * 1000) // 1-2 seconds delay
  }

  const handleQuickAction = (action: string) => {
    const actionMessages: Record<string, string> = {
      'assignment_deadlines': 'What are the upcoming assignment deadlines?',
      'office_hours': 'What are the office hours for my lecturers?',
      'course_materials': 'Where can I find course materials?',
      'exam_info': 'When are the upcoming exams?',
      'tech_support': 'I need technical support help',
      'grading_policy': 'What is the grading policy?'
    }
    
    const message = actionMessages[action]
    if (message) {
      handleSendMessage(message)
    }
  }

  const handleSuggestionClick = (suggestion: string) => {
    handleSendMessage(suggestion)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <span className="text-white text-xl">🤖</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">EduBot</h1>
                <p className="text-sm text-gray-600">Your AI Academic Assistant</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-400 rounded-full"></span>
              <span className="text-sm text-gray-600">Online</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Quick Actions Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
              <h3 className="font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-2">
                {quickActions.map((action) => (
                  <button
                    key={action.id}
                    onClick={() => handleQuickAction(action.action)}
                    className="w-full text-left p-3 rounded-lg bg-gray-50 hover:bg-blue-50 hover:text-blue-700 transition-colors flex items-center gap-3"
                  >
                    <span className="text-lg">{action.icon}</span>
                    <span className="text-sm font-medium">{action.text}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-4">
              <h3 className="font-semibold text-gray-900 mb-4">Common Questions</h3>
              <div className="space-y-2">
                {commonQuestions.slice(0, 4).map((question, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSendMessage(question)}
                    className="w-full text-left p-2 text-xs text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"
                  >
                    "{question}"
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Chat Interface */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-sm h-[600px] flex flex-col">
              {/* Chat Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-xs lg:max-w-md ${
                      message.sender === 'user'
                        ? 'bg-blue-600 text-white rounded-lg rounded-br-sm'
                        : 'bg-gray-100 text-gray-900 rounded-lg rounded-bl-sm'
                    } px-4 py-2`}>
                      {message.sender === 'bot' && (
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-lg">🤖</span>
                          <span className="text-xs font-medium">EduBot</span>
                        </div>
                      )}
                      
                      <div className="text-sm whitespace-pre-line">
                        {message.content}
                      </div>
                      
                      {message.suggestions && message.suggestions.length > 0 && (
                        <div className="mt-3 space-y-1">
                          {message.suggestions.map((suggestion, idx) => (
                            <button
                              key={idx}
                              onClick={() => handleSuggestionClick(suggestion)}
                              className="block w-full text-left text-xs bg-white bg-opacity-20 hover:bg-opacity-30 px-2 py-1 rounded transition-colors"
                            >
                              💡 {suggestion}
                            </button>
                          ))}
                        </div>
                      )}

                      {message.relatedLinks && message.relatedLinks.length > 0 && (
                        <div className="mt-3 space-y-1">
                          {message.relatedLinks.map((link, idx) => (
                            <Link
                              key={idx}
                              href={link.url}
                              className="block text-xs text-blue-300 hover:text-blue-100 underline"
                            >
                              🔗 {link.text}
                            </Link>
                          ))}
                        </div>
                      )}
                      
                      <div className={`text-xs mt-1 ${
                        message.sender === 'user' ? 'text-blue-100' : 'text-gray-500'
                      }`}>
                        {message.timestamp}
                      </div>
                    </div>
                  </div>
                ))}

                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-gray-100 text-gray-900 rounded-lg rounded-bl-sm px-4 py-2 max-w-xs">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-lg">🤖</span>
                        <span className="text-xs font-medium">EduBot</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                        <span className="text-xs text-gray-500 ml-2">Thinking...</span>
                      </div>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <div className="border-t p-4">
                <div className="flex gap-2">
                  <textarea
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ask me anything about your courses, assignments, or university services..."
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    rows={2}
                    disabled={isTyping}
                  />
                  <button
                    onClick={() => handleSendMessage()}
                    disabled={!inputMessage.trim() || isTyping}
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    Send
                  </button>
                </div>
                
                <div className="mt-2 text-xs text-gray-500">
                  Press Enter to send, Shift+Enter for new line
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Help Section */}
        <div className="mt-6 bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">What can EduBot help you with?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-blue-50 rounded-lg">
              <h3 className="font-medium text-blue-900 mb-2">📚 Academic Support</h3>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Assignment deadlines & requirements</li>
                <li>• Course materials & resources</li>
                <li>• Exam schedules & study guides</li>
                <li>• Grading policies & criteria</li>
              </ul>
            </div>
            
            <div className="p-4 bg-green-50 rounded-lg">
              <h3 className="font-medium text-green-900 mb-2">👥 Communication</h3>
              <ul className="text-sm text-green-800 space-y-1">
                <li>• Lecturer office hours</li>
                <li>• Booking appointments</li>
                <li>• Submitting queries</li>
                <li>• Contact information</li>
              </ul>
            </div>
            
            <div className="p-4 bg-purple-50 rounded-lg">
              <h3 className="font-medium text-purple-900 mb-2">🔧 Technical Help</h3>
              <ul className="text-sm text-purple-800 space-y-1">
                <li>• Platform navigation</li>
                <li>• Submission processes</li>
                <li>• Troubleshooting issues</li>
                <li>• Account management</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}