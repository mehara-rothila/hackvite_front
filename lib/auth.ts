// lib/auth.ts
import { tokenManager } from './api'

export interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  role: string
  department: string
  avatar?: string
  studentId?: string
  employeeId?: string
  year?: string
  major?: string
  office?: string
  phone?: string
  isActive: boolean
  lastLogin: string
  createdAt: string
}

// Check if user is authenticated
export function isAuthenticated(): boolean {
  if (typeof window === 'undefined') return false
  
  const token = tokenManager.getToken()
  const user = getCurrentUser()
  
  return !!(token && user)
}

// Get current user from localStorage
export function getCurrentUser(): User | null {
  if (typeof window === 'undefined') return null
  
  try {
    const userStr = localStorage.getItem('edulink_user')
    return userStr ? JSON.parse(userStr) : null
  } catch (error) {
    console.error('Error parsing user data:', error)
    return null
  }
}

// Get user role
export function getUserRole(): string | null {
  const user = getCurrentUser()
  return user?.role?.toLowerCase() || null
}

// Check if user has specific role
export function hasRole(role: string): boolean {
  const userRole = getUserRole()
  return userRole === role.toLowerCase()
}

// Logout user
export function logout() {
  tokenManager.clearTokens()
  // Redirect to login page
  if (typeof window !== 'undefined') {
    window.location.href = '/login'
  }
}