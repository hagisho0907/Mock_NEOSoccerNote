// API service layer for future backend integration

import { 
  Player, 
  Session, 
  Task, 
  KPI, 
  ChatMessage,
  Integration,
  FoodEntry,
  SleepEntry,
  ExerciseEntry,
  mockPlayer,
  mockKPIs,
  mockSessions,
  mockTasks,
  mockChatMessages,
  mockAlerts,
  mockNextActions,
  mockWeeklyPlan,
  mockIntegrations,
  mockFoodEntries,
  mockSleepEntries,
  mockExerciseEntries
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

export class IntegrationService {
  static async getIntegrations(): Promise<Integration[]> {
    // TODO: Replace with actual API call
    return new Promise((resolve) => {
      setTimeout(() => resolve(mockIntegrations), 500)
    })
  }

  static async connectIntegration(id: string, _credentials: unknown): Promise<Integration> {
    // TODO: Replace with actual API call
    const integration = mockIntegrations.find(i => i.id === id)
    if (!integration) {
      throw new Error('Integration not found')
    }
    
    return new Promise((resolve) => {
      setTimeout(() => resolve({
        ...integration,
        status: 'connected',
        lastSync: new Date().toISOString(),
        accountInfo: 'user@example.com'
      }), 2000)
    })
  }

  static async disconnectIntegration(_id: string): Promise<void> {
    // TODO: Replace with actual API call
    return new Promise((resolve) => {
      setTimeout(() => resolve(), 500)
    })
  }

  static async syncIntegration(id: string): Promise<Integration> {
    // TODO: Replace with actual API call
    const integration = mockIntegrations.find(i => i.id === id)
    if (!integration) {
      throw new Error('Integration not found')
    }
    
    return new Promise((resolve) => {
      setTimeout(() => resolve({
        ...integration,
        lastSync: new Date().toISOString()
      }), 1000)
    })
  }

  static async updateIntegrationSettings(id: string, _settings: unknown): Promise<Integration> {
    // TODO: Replace with actual API call
    const integration = mockIntegrations.find(i => i.id === id)
    if (!integration) {
      throw new Error('Integration not found')
    }
    
    return new Promise((resolve) => {
      setTimeout(() => resolve(integration), 500)
    })
  }
}

export class LifelogService {
  // Food Entry Services
  static async getFoodEntries(date?: string): Promise<FoodEntry[]> {
    // TODO: Replace with actual API call
    return new Promise((resolve) => {
      const entries = date 
        ? mockFoodEntries.filter(entry => entry.date === date)
        : mockFoodEntries
      setTimeout(() => resolve(entries), 500)
    })
  }

  static async createFoodEntry(entry: Omit<FoodEntry, 'id'>): Promise<FoodEntry> {
    // TODO: Replace with actual API call
    return new Promise((resolve) => {
      setTimeout(() => resolve({ ...entry, id: Date.now().toString() }), 500)
    })
  }

  static async updateFoodEntry(id: string, entry: Partial<FoodEntry>): Promise<FoodEntry> {
    // TODO: Replace with actual API call
    const existingEntry = mockFoodEntries.find(e => e.id === id) || mockFoodEntries[0]
    return new Promise((resolve) => {
      setTimeout(() => resolve({ ...existingEntry, ...entry }), 500)
    })
  }

  static async deleteFoodEntry(_id: string): Promise<void> {
    // TODO: Replace with actual API call
    return new Promise((resolve) => {
      setTimeout(() => resolve(), 500)
    })
  }

  // Sleep Entry Services
  static async getSleepEntries(date?: string): Promise<SleepEntry[]> {
    // TODO: Replace with actual API call
    return new Promise((resolve) => {
      const entries = date 
        ? mockSleepEntries.filter(entry => entry.date === date)
        : mockSleepEntries
      setTimeout(() => resolve(entries), 500)
    })
  }

  static async createSleepEntry(entry: Omit<SleepEntry, 'id'>): Promise<SleepEntry> {
    // TODO: Replace with actual API call
    return new Promise((resolve) => {
      setTimeout(() => resolve({ ...entry, id: Date.now().toString() }), 500)
    })
  }

  static async updateSleepEntry(id: string, entry: Partial<SleepEntry>): Promise<SleepEntry> {
    // TODO: Replace with actual API call
    const existingEntry = mockSleepEntries.find(e => e.id === id) || mockSleepEntries[0]
    return new Promise((resolve) => {
      setTimeout(() => resolve({ ...existingEntry, ...entry }), 500)
    })
  }

  static async deleteSleepEntry(_id: string): Promise<void> {
    // TODO: Replace with actual API call
    return new Promise((resolve) => {
      setTimeout(() => resolve(), 500)
    })
  }

  // Exercise Entry Services
  static async getExerciseEntries(date?: string): Promise<ExerciseEntry[]> {
    // TODO: Replace with actual API call
    return new Promise((resolve) => {
      const entries = date 
        ? mockExerciseEntries.filter(entry => entry.date === date)
        : mockExerciseEntries
      setTimeout(() => resolve(entries), 500)
    })
  }

  static async createExerciseEntry(entry: Omit<ExerciseEntry, 'id'>): Promise<ExerciseEntry> {
    // TODO: Replace with actual API call
    return new Promise((resolve) => {
      setTimeout(() => resolve({ ...entry, id: Date.now().toString() }), 500)
    })
  }

  static async updateExerciseEntry(id: string, entry: Partial<ExerciseEntry>): Promise<ExerciseEntry> {
    // TODO: Replace with actual API call
    const existingEntry = mockExerciseEntries.find(e => e.id === id) || mockExerciseEntries[0]
    return new Promise((resolve) => {
      setTimeout(() => resolve({ ...existingEntry, ...entry }), 500)
    })
  }

  static async deleteExerciseEntry(_id: string): Promise<void> {
    // TODO: Replace with actual API call
    return new Promise((resolve) => {
      setTimeout(() => resolve(), 500)
    })
  }

  // Analytics Services
  static async getNutritionAnalytics(startDate: string, endDate: string): Promise<{
    averageCalories: number
    averageProtein: number
    averageFat: number
    averageCarbs: number
    dailyTrends: Array<{
      date: string
      calories: number
      protein: number
      fat: number
      carbs: number
    }>
  }> {
    // TODO: Replace with actual API call
    return new Promise((resolve) => {
      setTimeout(() => resolve({
        averageCalories: 1460,
        averageProtein: 96,
        averageFat: 53,
        averageCarbs: 170,
        dailyTrends: [
          { date: '2024-09-17', calories: 1460, protein: 96, fat: 53, carbs: 170 },
          { date: '2024-09-16', calories: 1520, protein: 102, fat: 58, carbs: 165 },
          { date: '2024-09-15', calories: 1380, protein: 89, fat: 48, carbs: 175 },
        ]
      }), 1000)
    })
  }

  static async getSleepAnalytics(startDate: string, endDate: string): Promise<{
    averageDuration: number
    averageQuality: number
    averageDeepSleep: number
    averageRemSleep: number
    sleepTrends: Array<{
      date: string
      duration: number
      quality: number
    }>
  }> {
    // TODO: Replace with actual API call
    return new Promise((resolve) => {
      setTimeout(() => resolve({
        averageDuration: 475,
        averageQuality: 7.7,
        averageDeepSleep: 118,
        averageRemSleep: 95,
        sleepTrends: [
          { date: '2024-09-17', duration: 480, quality: 8 },
          { date: '2024-09-16', duration: 435, quality: 6 },
          { date: '2024-09-15', duration: 510, quality: 9 },
        ]
      }), 1000)
    })
  }
}

// Export the API client for direct use if needed
export { apiClient }