// lib/api.ts
const API_BASE_URL = 'http://localhost:8765/api'

// API Response type
interface ApiResponse<T> {
  success: boolean
  message: string
  data?: T
  error?: string
  timestamp: string
}

// Auth response types
interface AuthResponse {
  accessToken: string
  refreshToken: string
  tokenType: string
  expiresIn: number
  user: {
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
  message: string
  timestamp: string
}

// Request types
interface LoginRequest {
  email: string
  password: string
  rememberMe?: boolean
}

interface RegisterStudentRequest {
  email: string
  password: string
  firstName: string
  lastName: string
  department: string
  studentId?: string
  year?: string
  major?: string
}

interface RegisterLecturerRequest {
  email: string
  password: string
  firstName: string
  lastName: string
  department: string
  employeeId?: string
  office?: string
  phone?: string
}

// Token management
export const tokenManager = {
  getToken: () => localStorage.getItem('edulink_token'),
  setToken: (token: string) => localStorage.setItem('edulink_token', token),
  getRefreshToken: () => localStorage.getItem('edulink_refresh_token'),
  setRefreshToken: (token: string) => localStorage.setItem('edulink_refresh_token', token),
  clearTokens: () => {
    localStorage.removeItem('edulink_token')
    localStorage.removeItem('edulink_refresh_token')
    localStorage.removeItem('edulink_user')
  }
}

// API helper function
async function apiCall<T>(endpoint: string, options: RequestInit = {}): Promise<ApiResponse<T>> {
  const token = tokenManager.getToken()
  
  const config: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
    ...options,
  }

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, config)
    const data = await response.json()
    
    if (!response.ok) {
      throw new Error(data.error || data.message || 'API request failed')
    }
    
    return data
  } catch (error) {
    console.error('API Error:', error)
    throw error
  }
}

// Auth API functions
export const authAPI = {
  // Login
  login: async (credentials: LoginRequest): Promise<AuthResponse> => {
    const response = await apiCall<AuthResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    })
    
    if (response.success && response.data) {
      // Store tokens and user data
      tokenManager.setToken(response.data.accessToken)
      tokenManager.setRefreshToken(response.data.refreshToken)
      localStorage.setItem('edulink_user', JSON.stringify(response.data.user))
      return response.data
    }
    
    throw new Error(response.error || 'Login failed')
  },

  // Register student
  registerStudent: async (userData: RegisterStudentRequest): Promise<AuthResponse> => {
    const response = await apiCall<AuthResponse>('/auth/register/student', {
      method: 'POST',
      body: JSON.stringify(userData),
    })
    
    if (response.success && response.data) {
      // Store user data (no tokens for registration)
      localStorage.setItem('edulink_user', JSON.stringify(response.data.user))
      return response.data
    }
    
    throw new Error(response.error || 'Registration failed')
  },

  // Register lecturer
  registerLecturer: async (userData: RegisterLecturerRequest): Promise<AuthResponse> => {
    const response = await apiCall<AuthResponse>('/auth/register/lecturer', {
      method: 'POST',
      body: JSON.stringify(userData),
    })
    
    if (response.success && response.data) {
      // Store user data (no tokens for registration)
      localStorage.setItem('edulink_user', JSON.stringify(response.data.user))
      return response.data
    }
    
    throw new Error(response.error || 'Registration failed')
  },

  // Get profile
  getProfile: async () => {
    const response = await apiCall<any>('/auth/profile')
    if (response.success && response.data) {
      localStorage.setItem('edulink_user', JSON.stringify(response.data))
      return response.data
    }
    throw new Error(response.error || 'Failed to get profile')
  },

  // Refresh token
  refreshToken: async (): Promise<AuthResponse> => {
    const refreshToken = tokenManager.getRefreshToken()
    if (!refreshToken) throw new Error('No refresh token available')
    
    const response = await apiCall<AuthResponse>('/auth/refresh', {
      method: 'POST',
      body: JSON.stringify({ refreshToken }),
    })
    
    if (response.success && response.data) {
      tokenManager.setToken(response.data.accessToken)
      return response.data
    }
    
    throw new Error(response.error || 'Token refresh failed')
  },

  // Logout
  logout: async () => {
    try {
      await apiCall('/auth/logout', { method: 'POST' })
    } catch (error) {
      console.error('Logout API error:', error)
    } finally {
      tokenManager.clearTokens()
    }
  }
}