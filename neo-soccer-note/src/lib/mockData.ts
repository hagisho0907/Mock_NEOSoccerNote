// Mock data for NEO Soccer Note application

export interface Player {
  id: string
  name: string
  birthDate: string
  position: string
  team: string
  number: number
}

export interface Session {
  id: string
  type: 'match' | 'training' | 'self_training'
  date: string
  opponent?: string
  venue: string
  formation: string
  playTime: number
  position: string
  rating?: number
}

export interface Event {
  id: string
  sessionId: string
  type: 'pass' | 'shot' | 'duel' | 'press' | 'intercept' | 'cross'
  time: string
  result: boolean
  details?: string
}

export interface Task {
  id: string
  title: string
  deadline: string
  priority: 'high' | 'medium' | 'low'
  completed: boolean
  category: string
}

export interface KPI {
  label: string
  value: string
  subtext: string
  trend: 'up' | 'down' | 'neutral'
}

export interface ChatMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: string
  references?: string[]
}

// Mock Data
export const mockPlayer: Player = {
  id: '1',
  name: '田中 太郎',
  birthDate: '2005-04-15',
  position: 'MF',
  team: 'FC Neo United U18',
  number: 10
}

export const mockKPIs: KPI[] = [
  { label: '進行パス', value: '12本', subtext: '+3 vs 平均', trend: 'up' },
  { label: 'デュエル勝率', value: '61%', subtext: '-4% vs 先週', trend: 'down' },
  { label: '睡眠効率', value: '90%', subtext: '+5%', trend: 'up' },
  { label: 'ACWR', value: '1.45', subtext: '⚠ 急増 注意', trend: 'down' },
]

export const mockSessions: Session[] = [
  {
    id: '1',
    type: 'match',
    date: '2024-09-15',
    opponent: 'Seaside U18',
    venue: '市営グラウンド',
    formation: '4-3-3',
    playTime: 75,
    position: 'LWG → CM',
    rating: 7.5
  },
  {
    id: '2',
    type: 'training',
    date: '2024-09-14',
    venue: 'クラブハウス',
    formation: '4-3-3',
    playTime: 90,
    position: 'CM',
  }
]

export const mockTasks: Task[] = [
  {
    id: '1',
    title: '敵陣プレスの開始合図を決める',
    deadline: '2024-09-20',
    priority: 'high',
    completed: false,
    category: 'tactical'
  },
  {
    id: '2',
    title: '左足アウトでの縦突破 20回',
    deadline: '2024-09-21',
    priority: 'medium',
    completed: false,
    category: 'technical'
  },
  {
    id: '3',
    title: '試合振り返りを記入',
    deadline: '2024-09-18',
    priority: 'high',
    completed: true,
    category: 'analysis'
  }
]

export const mockChatMessages: ChatMessage[] = [
  {
    id: '1',
    role: 'assistant',
    content: '直近の動画(02:14〜)を確認。高位置奪取から3秒でフィニッシュまで到達できています。再現のための2ドリルを提案します。',
    timestamp: '2024-09-17 14:30',
    references: ['event#124', 'video#15']
  },
  {
    id: '2',
    role: 'user',
    content: '今日30分でできるメニューに調整して。',
    timestamp: '2024-09-17 14:32'
  },
  {
    id: '3',
    role: 'assistant',
    content: 'OK。10分: 圧縮→スイッチ合図練習、20分: ハーフスペース侵入→受け手の角度作り。',
    timestamp: '2024-09-17 14:33',
    references: ['event#124', 'sleep_score']
  }
]

export const mockWeeklyPlan = [
  'Mon: 技術(20) + 走(10)',
  'Tue: 走(20) + 栄養: 炭水化物前日 4g/kg',
  'Wed: 休養 + 睡眠: 就床23:00',
  'Thu: 戦術(30) 位置間の距離管理',
  'Fri: セットプレー(20) + 反復(10)',
  'Sat: 試合',
  'Sun: 回復(20) + 振り返り'
]

export const mockAlerts = [
  'ACWR が 1.45（推奨: 0.8–1.3）— 回復セッションを挿入',
  '睡眠 2日連続 6h未満 — 就床時刻前倒しを提案',
  'スタッツ未入力: 練習(9/14), 自主練(9/16)'
]

export const mockNextActions = [
  '10分：敵陣プレス→ショートカウンターの再現ドリル(2セット)',
  '30分：ハム主導の加速ドリル + RPE 5 で調整',
  '食事：練習60分前に炭水化物 40g 補給'
]

// Integration Settings
export interface Integration {
  id: string
  name: string
  type: 'video' | 'wearable' | 'smartphone' | 'medical'
  status: 'connected' | 'disconnected' | 'pending'
  lastSync?: string
  accountInfo?: string
}

export const mockIntegrations: Integration[] = [
  {
    id: '1',
    name: 'Veo Camera',
    type: 'video',
    status: 'connected',
    lastSync: '2024-09-17 14:30',
    accountInfo: 'team.neosoccer@veo.co'
  },
  {
    id: '2',
    name: 'Hudl',
    type: 'video',
    status: 'disconnected'
  },
  {
    id: '3',
    name: 'Oura Ring',
    type: 'wearable',
    status: 'connected',
    lastSync: '2024-09-17 06:00',
    accountInfo: 'tanaka.taro@email.com'
  },
  {
    id: '4',
    name: 'Garmin',
    type: 'wearable',
    status: 'disconnected'
  },
  {
    id: '5',
    name: 'WHOOP',
    type: 'wearable',
    status: 'pending',
    accountInfo: 'tanaka.taro@email.com'
  },
  {
    id: '6',
    name: 'Apple Health',
    type: 'smartphone',
    status: 'connected',
    lastSync: '2024-09-17 15:45'
  },
  {
    id: '7',
    name: 'Google Fit',
    type: 'smartphone',
    status: 'disconnected'
  },
  {
    id: '8',
    name: '田中クリニック',
    type: 'medical',
    status: 'connected',
    accountInfo: '患者ID: P2024-0892',
    lastSync: '2024-09-10 10:30'
  },
  {
    id: '9',
    name: 'Genesis Healthcare',
    type: 'medical',
    status: 'disconnected'
  },
  {
    id: '10',
    name: 'DeNA MYCODE',
    type: 'medical',
    status: 'pending',
    accountInfo: 'sample.kit.sent'
  }
]