// lib/auth.ts
import { User, StudentUser, LecturerUser, LoginFormData } from '../types'

// Constants
export const AUTH_STORAGE_KEY = 'edulink_user'
export const SESSION_STORAGE_KEY = 'edulink_session'

// Mock authentication utilities
export class AuthService {
  // Check if user is authenticated
  static isAuthenticated(): boolean {
    if (typeof window === 'undefined') return false
    
    const userData = localStorage.getItem(AUTH_STORAGE_KEY)
    if (!userData) return false
    
    try {
      const user = JSON.parse(userData)
      return user.isAuthenticated === true
    } catch {
      return false
    }
  }

  // Get current user from localStorage
  static getCurrentUser(): User | null {
    if (typeof window === 'undefined') return null
    
    const userData = localStorage.getItem(AUTH_STORAGE_KEY)
    if (!userData) return null
    
    try {
      const user = JSON.parse(userData)
      return user.isAuthenticated ? user : null
    } catch {
      return null
    }
  }

  // Mock login function
  static async login(formData: LoginFormData): Promise<{ success: boolean; user?: User; error?: string }> {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (!formData.email || !formData.password) {
          resolve({ success: false, error: 'Email and password are required' })
          return
        }

        // Mock authentication logic
        const isStudent = formData.email.includes('student') || formData.email.includes('s.')
        const role = isStudent ? 'student' : 'lecturer'
        
        const mockUser: User = {
          id: Math.random().toString(36).substr(2, 9),
          email: formData.email,
          role: role as 'student' | 'lecturer',
          name: formData.email.split('@')[0],
          firstName: formData.email.split('@')[0].split('.')[0] || 'User',
          lastName: formData.email.split('@')[0].split('.')[1] || 'Name',
          isAuthenticated: true,
          registeredAt: new Date().toISOString()
        }

        // Store user data
        localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(mockUser))
        
        if (formData.remember) {
          localStorage.setItem(SESSION_STORAGE_KEY, 'persistent')
        }

        resolve({ success: true, user: mockUser })
      }, 1000)
    })
  }

  // Mock registration for students
  static async registerStudent(formData: any): Promise<{ success: boolean; user?: StudentUser; error?: string }> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const mockUser: StudentUser = {
          id: Math.random().toString(36).substr(2, 9),
          email: formData.email,
          role: 'student',
          name: `${formData.firstName} ${formData.lastName}`,
          firstName: formData.firstName,
          lastName: formData.lastName,
          studentId: formData.studentId,
          university: formData.university,
          department: formData.department,
          yearOfStudy: formData.yearOfStudy,
          isAuthenticated: true,
          registeredAt: new Date().toISOString()
        }

        localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(mockUser))
        resolve({ success: true, user: mockUser })
      }, 1500)
    })
  }

  // Mock registration for lecturers
  static async registerLecturer(formData: any): Promise<{ success: boolean; user?: LecturerUser; error?: string }> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const mockUser: LecturerUser = {
          id: Math.random().toString(36).substr(2, 9),
          email: formData.email,
          role: 'lecturer',
          name: `${formData.title} ${formData.firstName} ${formData.lastName}`,
          firstName: formData.firstName,
          lastName: formData.lastName,
          title: formData.title,
          employeeId: formData.employeeId,
          university: formData.university,
          department: formData.department,
          specialization: formData.specialization,
          officeLocation: formData.officeLocation,
          phoneNumber: formData.phoneNumber,
          isAuthenticated: true,
          registeredAt: new Date().toISOString()
        }

        localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(mockUser))
        resolve({ success: true, user: mockUser })
      }, 1500)
    })
  }

  // Logout function
  static logout(): void {
    if (typeof window === 'undefined') return
    
    localStorage.removeItem(AUTH_STORAGE_KEY)
    localStorage.removeItem(SESSION_STORAGE_KEY)
    
    // Clear other app-related data
    localStorage.removeItem('edulink_conversations')
    localStorage.removeItem('edulink_appointments')
    localStorage.removeItem('edulink_notifications')
  }

  // Update user profile
  static updateUser(updates: Partial<User>): User | null {
    const currentUser = this.getCurrentUser()
    if (!currentUser) return null

    const updatedUser = { ...currentUser, ...updates }
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(updatedUser))
    return updatedUser
  }

  // Check if user has specific role
  static hasRole(role: 'student' | 'lecturer'): boolean {
    const user = this.getCurrentUser()
    return user?.role === role
  }

  // Get user role
  static getUserRole(): 'student' | 'lecturer' | null {
    const user = this.getCurrentUser()
    return user?.role || null
  }

  // Get user's full name with title (for lecturers)
  static getDisplayName(): string {
    const user = this.getCurrentUser()
    if (!user) return 'Guest'
    
    if (user.role === 'lecturer') {
      const lecturerUser = user as LecturerUser
      return lecturerUser.title ? `${lecturerUser.title} ${lecturerUser.name}` : lecturerUser.name
    }
    
    return user.name
  }

  // Validate session
  static validateSession(): boolean {
    if (!this.isAuthenticated()) return false
    
    const sessionType = localStorage.getItem(SESSION_STORAGE_KEY)
    if (sessionType === 'persistent') return true
    
    // For non-persistent sessions, you could add additional validation
    // like checking session expiry, etc.
    return true
  }

  // Mock password reset
  static async requestPasswordReset(email: string): Promise<{ success: boolean; message: string }> {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (!email || !email.includes('@')) {
          resolve({ success: false, message: 'Please enter a valid email address' })
          return
        }
        
        resolve({ 
          success: true, 
          message: 'If an account with this email exists, you will receive a password reset link shortly.' 
        })
      }, 1000)
    })
  }

  // Mock email verification
  static async verifyEmail(token: string): Promise<{ success: boolean; message: string }> {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (!token) {
          resolve({ success: false, message: 'Invalid verification token' })
          return
        }
        
        resolve({ success: true, message: 'Email verified successfully!' })
      }, 1000)
    })
  }
}

// Utility functions for role-based access
export const requireAuth = (): User | null => {
  return AuthService.getCurrentUser()
}

export const requireStudent = (): StudentUser | null => {
  const user = AuthService.getCurrentUser()
  return user?.role === 'student' ? (user as StudentUser) : null
}

export const requireLecturer = (): LecturerUser | null => {
  const user = AuthService.getCurrentUser()
  return user?.role === 'lecturer' ? (user as LecturerUser) : null
}

// Hook-like functions for authentication state
export const useAuth = () => {
  const user = AuthService.getCurrentUser()
  const isAuthenticated = AuthService.isAuthenticated()
  
  return {
    user,
    isAuthenticated,
    isStudent: user?.role === 'student',
    isLecturer: user?.role === 'lecturer',
    login: AuthService.login,
    logout: AuthService.logout,
    updateUser: AuthService.updateUser
  }
}

// Route protection helpers
export const redirectIfAuthenticated = (router: any) => {
  if (AuthService.isAuthenticated()) {
    const user = AuthService.getCurrentUser()
    if (user?.role === 'student') {
      router.push('/student/dashboard')
    } else if (user?.role === 'lecturer') {
      router.push('/lecturer/dashboard')
    }
  }
}

export const redirectIfNotAuthenticated = (router: any) => {
  if (!AuthService.isAuthenticated()) {
    router.push('/login')
  }
}

// Demo data helpers
export const getDemoCredentials = () => {
  return {
    student: {
      email: 'student@university.edu',
      password: 'demo123',
      description: 'Student account demo'
    },
    lecturer: {
      email: 'prof@university.edu',
      password: 'demo123',
      description: 'Lecturer account demo'
    }
  }
}

// Initialize demo users (for development)
export const initializeDemoUsers = () => {
  if (typeof window === 'undefined') return
  
  const demoStudent: StudentUser = {
    id: 'demo-student-001',
    email: 'student@university.edu',
    role: 'student',
    name: 'John Doe',
    firstName: 'John',
    lastName: 'Doe',
    studentId: 'S123456',
    university: 'University of Technology',
    department: 'Computer Science',
    yearOfStudy: '3',
    isAuthenticated: false,
    registeredAt: new Date().toISOString()
  }

  const demoLecturer: LecturerUser = {
    id: 'demo-lecturer-001',
    email: 'prof@university.edu',
    role: 'lecturer',
    name: 'Dr. Jane Smith',
    firstName: 'Jane',
    lastName: 'Smith',
    title: 'Dr.',
    employeeId: 'EMP789012',
    university: 'University of Technology',
    department: 'Computer Science',
    specialization: 'Machine Learning',
    officeLocation: 'Building A, Room 301',
    phoneNumber: '+1 (555) 123-4567',
    isAuthenticated: false,
    registeredAt: new Date().toISOString()
  }

  // Store demo users for reference (not logged in)
  localStorage.setItem('demo_student', JSON.stringify(demoStudent))
  localStorage.setItem('demo_lecturer', JSON.stringify(demoLecturer))
}