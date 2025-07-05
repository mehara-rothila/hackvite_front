// types/index.ts

export interface User {
  id: string
  email: string
  name: string
  firstName: string
  lastName: string
  role: 'student' | 'lecturer'
  isAuthenticated: boolean
  registeredAt: string
}

export interface StudentUser extends User {
  role: 'student'
  studentId: string
  university: string
  department: string
  yearOfStudy: string
}

export interface LecturerUser extends User {
  role: 'lecturer'
  title: string
  employeeId: string
  university: string
  department: string
  specialization?: string
  officeLocation?: string
  phoneNumber?: string
}

export interface LoginFormData {
  email: string
  password: string
  remember: boolean
}

export interface StudentRegistrationData {
  firstName: string
  lastName: string
  email: string
  password: string
  confirmPassword: string
  studentId: string
  university: string
  department: string
  yearOfStudy: string
  agreeToTerms: boolean
}

export interface LecturerRegistrationData {
  firstName: string
  lastName: string
  email: string
  password: string
  confirmPassword: string
  employeeId: string
  university: string
  department: string
  title: string
  specialization?: string
  officeLocation?: string
  phoneNumber?: string
  agreeToTerms: boolean
}

export interface AuthState {
  user: User | null
  isAuthenticated: boolean
  loading: boolean
}

// Conversation types
export interface Message {
  id: string
  senderId: string
  receiverId: string
  content: string
  timestamp: string
  type: 'text' | 'file' | 'image'
  status: 'sent' | 'delivered' | 'read'
  attachments?: Attachment[]
}

export interface Attachment {
  id: string
  name: string
  type: string
  size: number
  url: string
}

export interface Conversation {
  id: string
  participants: User[]
  lastMessage?: Message
  unreadCount: number
  createdAt: string
  updatedAt: string
  subject?: string
  courseId?: string
}

// Appointment types
export interface Appointment {
  id: string
  studentId: string
  lecturerId: string
  title: string
  description?: string
  startTime: string
  endTime: string
  status: 'scheduled' | 'confirmed' | 'cancelled' | 'completed'
  meetingType: 'in-person' | 'virtual'
  location?: string
  meetingLink?: string
  createdAt: string
  updatedAt: string
}

export interface TimeSlot {
  start: string
  end: string
  available: boolean
}

export interface AvailabilitySchedule {
  lecturerId: string
  date: string
  timeSlots: TimeSlot[]
}

// Course types
export interface Course {
  id: string
  name: string
  code: string
  description?: string
  lecturerId: string
  semester: string
  year: number
  enrolledStudents: string[]
  createdAt: string
  updatedAt: string
}

// Resource types
export interface Resource {
  id: string
  title: string
  description?: string
  type: 'document' | 'video' | 'link' | 'assignment'
  fileUrl?: string
  externalUrl?: string
  courseId?: string
  uploadedBy: string
  uploadedAt: string
  tags: string[]
  isPublic: boolean
}

// Notification types
export interface Notification {
  id: string
  userId: string
  title: string
  message: string
  type: 'message' | 'appointment' | 'announcement' | 'reminder' | 'system'
  isRead: boolean
  actionUrl?: string
  createdAt: string
}

// Analytics types
export interface AnalyticsData {
  totalMessages: number
  totalAppointments: number
  averageResponseTime: number
  engagementRate: number
  topCourses: Array<{
    courseId: string
    courseName: string
    messageCount: number
  }>
  monthlyActivity: Array<{
    month: string
    messages: number
    appointments: number
  }>
}

// AI Bot types
export interface BotMessage {
  id: string
  content: string
  type: 'text' | 'suggestion' | 'action'
  timestamp: string
  isBot: boolean
  suggestions?: string[]
  actions?: Array<{
    label: string
    action: string
    data?: any
  }>
}

export interface BotConversation {
  id: string
  userId: string
  messages: BotMessage[]
  context: Record<string, any>
  createdAt: string
  updatedAt: string
}

// Settings types
export interface UserSettings {
  userId: string
  notifications: {
    email: boolean
    push: boolean
    desktop: boolean
    messageAlerts: boolean
    appointmentReminders: boolean
    announcementUpdates: boolean
  }
  privacy: {
    profileVisibility: 'public' | 'university' | 'private'
    showOnlineStatus: boolean
    allowDirectMessages: boolean
  }
  preferences: {
    language: string
    timezone: string
    theme: 'light' | 'dark' | 'auto'
    dateFormat: string
    timeFormat: '12h' | '24h'
  }
}

// Form validation types
export interface ValidationError {
  field: string
  message: string
}

export interface FormState<T> {
  data: T
  errors: Record<keyof T, string>
  loading: boolean
  touched: Record<keyof T, boolean>
}

// API Response types
export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  message?: string
  errors?: ValidationError[]
}

// Search types
export interface SearchResult {
  id: string
  type: 'conversation' | 'resource' | 'user' | 'course'
  title: string
  description?: string
  relevance: number
  metadata: Record<string, any>
}

export interface SearchFilters {
  type?: string[]
  dateRange?: {
    start: string
    end: string
  }
  course?: string
  author?: string
  tags?: string[]
}

// Dashboard types
export interface DashboardStats {
  student: {
    activeConversations: number
    upcomingAppointments: number
    unreadMessages: number
    coursesEnrolled: number
    recentActivity: Array<{
      type: string
      description: string
      timestamp: string
    }>
  }
  lecturer: {
    pendingQueries: number
    todayAppointments: number
    studentsAdvised: number
    responseRate: number
    recentActivity: Array<{
      type: string
      description: string
      timestamp: string
    }>
  }
}