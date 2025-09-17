// API service layer for future backend integration

import { 
  Player, 
  Session, 
  Task, 
  KPI, 
  ChatMessage,
  mockPlayer,
  mockKPIs,
  mockSessions,
  mockTasks,
  mockChatMessages,
  mockAlerts,
  mockNextActions,
  mockWeeklyPlan
} from '@/lib/mockData'

// Base API configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '/api'

// Generic API client
class ApiClient {
  private baseUrl: string

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl
  }

  async request<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`
    
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
      ...options,
    })

    if (!response.ok) {
      throw new Error(`API request failed: ${response.statusText}`)
    }

    return response.json()
  }

  async get<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint)
  }

  async post<T>(endpoint: string, data: unknown): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    })
  }

  async put<T>(endpoint: string, data: unknown): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
    })
  }

  async delete<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'DELETE',
    })
  }
}

const apiClient = new ApiClient(API_BASE_URL)

// Service classes for different entities

export class PlayerService {
  static async getProfile(): Promise<Player> {
    // TODO: Replace with actual API call
    return new Promise((resolve) => {
      setTimeout(() => resolve(mockPlayer), 500)
    })
  }

  static async updateProfile(player: Partial<Player>): Promise<Player> {
    // TODO: Replace with actual API call
    return new Promise((resolve) => {
      setTimeout(() => resolve({ ...mockPlayer, ...player }), 500)
    })
  }
}

export class SessionService {
  static async getSessions(): Promise<Session[]> {
    // TODO: Replace with actual API call
    return new Promise((resolve) => {
      setTimeout(() => resolve(mockSessions), 500)
    })
  }

  static async createSession(session: Omit<Session, 'id'>): Promise<Session> {
    // TODO: Replace with actual API call
    return new Promise((resolve) => {
      setTimeout(() => resolve({ ...session, id: Date.now().toString() }), 500)
    })
  }

  static async updateSession(_id: string, session: Partial<Session>): Promise<Session> {
    // TODO: Replace with actual API call
    const existingSession = mockSessions[0]
    return new Promise((resolve) => {
      setTimeout(() => resolve({ ...existingSession, ...session }), 500)
    })
  }

  static async deleteSession(_id: string): Promise<void> {
    // TODO: Replace with actual API call
    return new Promise((resolve) => {
      setTimeout(() => resolve(), 500)
    })
  }
}

export class KPIService {
  static async getKPIs(): Promise<KPI[]> {
    // TODO: Replace with actual API call
    return new Promise((resolve) => {
      setTimeout(() => resolve(mockKPIs), 500)
    })
  }

  static async getAlerts(): Promise<string[]> {
    // TODO: Replace with actual API call
    return new Promise((resolve) => {
      setTimeout(() => resolve(mockAlerts), 500)
    })
  }

  static async getNextActions(): Promise<string[]> {
    // TODO: Replace with actual API call
    return new Promise((resolve) => {
      setTimeout(() => resolve(mockNextActions), 500)
    })
  }
}

export class TaskService {
  static async getTasks(): Promise<Task[]> {
    // TODO: Replace with actual API call
    return new Promise((resolve) => {
      setTimeout(() => resolve(mockTasks), 500)
    })
  }

  static async createTask(task: Omit<Task, 'id'>): Promise<Task> {
    // TODO: Replace with actual API call
    return new Promise((resolve) => {
      setTimeout(() => resolve({ ...task, id: Date.now().toString() }), 500)
    })
  }

  static async updateTask(_id: string, task: Partial<Task>): Promise<Task> {
    // TODO: Replace with actual API call
    const existingTask = mockTasks[0]
    return new Promise((resolve) => {
      setTimeout(() => resolve({ ...existingTask, ...task }), 500)
    })
  }

  static async deleteTask(_id: string): Promise<void> {
    // TODO: Replace with actual API call
    return new Promise((resolve) => {
      setTimeout(() => resolve(), 500)
    })
  }
}

export class ChatService {
  static async getMessages(): Promise<ChatMessage[]> {
    // TODO: Replace with actual API call
    return new Promise((resolve) => {
      setTimeout(() => resolve(mockChatMessages), 500)
    })
  }

  static async sendMessage(content: string, _role: string): Promise<ChatMessage> {
    // TODO: Replace with actual API call
    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content,
      timestamp: new Date().toISOString()
    }
    
    return new Promise((resolve) => {
      setTimeout(() => resolve(newMessage), 500)
    })
  }

  static async getWeeklyPlan(): Promise<string[]> {
    // TODO: Replace with actual API call
    return new Promise((resolve) => {
      setTimeout(() => resolve(mockWeeklyPlan), 500)
    })
  }
}

export class PassportService {
  static async generatePassport(template: string): Promise<string> {
    // TODO: Replace with actual API call
    return new Promise((resolve) => {
      setTimeout(() => resolve(`passport-${template}-${Date.now()}.pdf`), 1000)
    })
  }

  static async createShareLink(_options: unknown): Promise<string> {
    // TODO: Replace with actual API call
    return new Promise((resolve) => {
      setTimeout(() => resolve(`https://share.neosoccernote.com/${Date.now()}`), 500)
    })
  }

  static async signData(): Promise<string> {
    // TODO: Replace with actual API call
    return new Promise((resolve) => {
      setTimeout(() => resolve(`signature-${Date.now()}`), 1000)
    })
  }
}

// Export the API client for direct use if needed
export { apiClient }