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
  // Stats Page Data
  { label: 'パス成功率', value: '78.6%', subtext: 'vs Seaside戦', trend: 'up' },
  { label: 'デュエル勝率', value: '61.5%', subtext: '8/13勝', trend: 'neutral' },
  { label: 'シュート精度', value: '50.0%', subtext: '2/4本成功', trend: 'down' },
  { label: '平均評価', value: '7.5', subtext: '前回試合', trend: 'up' },
  
  // Lifelog Page Data
  { label: '睡眠効率', value: '8.0h', subtext: '品質8/10点', trend: 'up' },
  { label: '日間PFC', value: '96g', subtext: 'プロテイン摂取', trend: 'up' },
  { label: '運動強度', value: '145bpm', subtext: '平均心拍数', trend: 'neutral' },
  { label: '消費カロリー', value: '540kcal', subtext: '今日の運動', trend: 'up' },
  
  // Medical Page Data
  { label: 'FMSスコア', value: '16/21', subtext: '可動域評価', trend: 'down' },
  { label: '筋力バランス', value: '5%差', subtext: 'ハム左右差', trend: 'down' },
  { label: '可動域状況', value: '5°差', subtext: '肩関節左右', trend: 'neutral' },
  { label: 'リスク要因', value: '2件', subtext: '要注意項目', trend: 'down' },
  
  // Session Data
  { label: '週間活動', value: '5回', subtext: '試合2 練習3', trend: 'up' },
  { label: '連続日数', value: '4日', subtext: '活動継続中', trend: 'up' },
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
  },
  {
    id: '3',
    type: 'match',
    date: '2024-09-12',
    opponent: 'FC Thunder',
    venue: '総合運動公園',
    formation: '4-2-3-1',
    playTime: 90,
    position: 'CAM',
    rating: 8.2
  },
  {
    id: '4',
    type: 'self_training',
    date: '2024-09-11',
    venue: '近所の公園',
    formation: '',
    playTime: 60,
    position: '個人練習',
    rating: 6.5
  },
  {
    id: '5',
    type: 'match',
    date: '2024-09-08',
    opponent: 'Green Valley FC',
    venue: 'ホーム',
    formation: '4-3-3',
    playTime: 45,
    position: 'LWG',
    rating: 6.8
  },
  {
    id: '6',
    type: 'training',
    date: '2024-09-07',
    venue: 'クラブハウス',
    formation: '4-3-3',
    playTime: 120,
    position: 'MF',
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

// Note Data
export interface Note {
  id: string
  date: string
  title: string
  content: string
  type: 'match' | 'training' | 'general'
  createdAt: string
  updatedAt: string
}

export const mockNotes: Note[] = [
  {
    id: '1',
    date: '2024-09-15',
    title: 'vs Seaside U18 - 試合メモ',
    content: '前半15分のゴールシーンが良かった。左サイドから中央へのカットインでDF2人を振り切ってシュート。\n\n改善点：\n- プレスのタイミングがまだ甘い\n- パスの精度を上げる必要あり',
    type: 'match',
    createdAt: '2024-09-15T20:30:00',
    updatedAt: '2024-09-15T20:30:00'
  },
  {
    id: '2',
    date: '2024-09-14',
    title: '練習メモ - ドリブル練習',
    content: 'コーンドリブル練習を重点的に実施。\n- 1対1の際の仕掛けるタイミング\n- ボールタッチの回数を減らす\n- 相手の重心を見極める',
    type: 'training',
    createdAt: '2024-09-14T18:00:00',
    updatedAt: '2024-09-14T18:00:00'
  },
  {
    id: '3',
    date: '2024-09-12',
    title: 'FC Thunder戦 - 戦術分析',
    content: '相手チームの4-2-3-1に対して、我々の4-3-3がうまく機能した。\n\nキーポイント：\n- サイドバックの上がりタイミング\n- 中盤の3人の連携\n- カウンターアタックの速度',
    type: 'match',
    createdAt: '2024-09-12T21:15:00',
    updatedAt: '2024-09-12T21:15:00'
  }
]

// Medical Data
export interface MedicalHistory {
  id: string
  bodyPart: string
  injuryType: string
  occurredDate: string
  severity: 'mild' | 'moderate' | 'severe'
  treatment: string
  returnCriteria: string
  currentStage: string
}

export interface Screening {
  id: string
  date: string
  rangeOfMotion: {
    shoulder: { left: number; right: number }
    hip: { left: number; right: number }
    ankle: { left: number; right: number }
  }
  strength: {
    hamstring: { left: number; right: number }
    quadriceps: { left: number; right: number }
    glutes: { left: number; right: number }
  }
  fmsScore: number
  knownRisks: string[]
}

export interface RehabPlan {
  id: string
  phase: 'acute' | 'subacute' | 'return_to_play'
  allowedMovements: string[]
  exerciseLimit: string
  homeExerciseVideos: string[]
  startDate: string
  targetDate: string
}

export interface LabResult {
  id: string
  type: 'blood' | 'body_composition' | 'genetic'
  source: string
  date: string
  results: Record<string, string | number>
}

export const mockMedicalHistory: MedicalHistory[] = [
  {
    id: '1',
    bodyPart: '右膝',
    injuryType: '内側側副靭帯損傷',
    occurredDate: '2024-08-15',
    severity: 'moderate',
    treatment: '保存療法、理学療法',
    returnCriteria: '痛みなし、可動域制限なし、筋力90%以上',
    currentStage: 'フェーズ3: 競技復帰準備'
  },
  {
    id: '2',
    bodyPart: '左足首',
    injuryType: '外側靭帯捻挫',
    occurredDate: '2024-06-20',
    severity: 'mild',
    treatment: 'RICE療法、テーピング',
    returnCriteria: '腫脹なし、バランス感覚正常',
    currentStage: '競技復帰済み'
  }
]

export const mockScreening: Screening[] = [
  {
    id: '1',
    date: '2024-09-15',
    rangeOfMotion: {
      shoulder: { left: 180, right: 175 },
      hip: { left: 120, right: 115 },
      ankle: { left: 45, right: 40 }
    },
    strength: {
      hamstring: { left: 85, right: 80 },
      quadriceps: { left: 90, right: 88 },
      glutes: { left: 88, right: 85 }
    },
    fmsScore: 16,
    knownRisks: ['右膝可動域制限', '左右筋力差']
  }
]

export const mockRehabPlan: RehabPlan[] = [
  {
    id: '1',
    phase: 'return_to_play',
    allowedMovements: ['ジョギング', '軽い方向転換', 'ボールタッチ'],
    exerciseLimit: '心拍数150bpm以下、痛み0レベル',
    homeExerciseVideos: ['膝安定化エクササイズ', 'バランストレーニング'],
    startDate: '2024-09-10',
    targetDate: '2024-10-01'
  }
]

export const mockLabResults: LabResult[] = [
  {
    id: '1',
    type: 'blood',
    source: '田中クリニック',
    date: '2024-09-10',
    results: {
      hemoglobin: 14.8,
      hematocrit: 44.2,
      iron: 120,
      vitamin_d: 32
    }
  },
  {
    id: '2',
    type: 'body_composition',
    source: 'InBody測定',
    date: '2024-09-12',
    results: {
      body_fat: 8.5,
      muscle_mass: 62.3,
      bone_mass: 3.2,
      bmr: 1850
    }
  }
]

export const mockChatMessages: ChatMessage[] = [
  {
    id: '1',
    role: 'assistant',
    content: '直近の動画(02:14〜)を確認。高位置奪取から3秒でフィニッシュまで到達できています。再現のための2ドリルを提案します。',
    timestamp: '2024-09-17 14:30'
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
    timestamp: '2024-09-17 14:33'
  }
]

// Chat Summary Data
export interface ChatSummary {
  id: string
  date: string
  title: string
  todos: string[]
  keyPoints: string[]
  createdAt: string
}

// Passport Data
export interface PassportFile {
  id: string
  fileName: string
  generatedDate: string
  fileSize: string
  status: 'ready' | 'generating' | 'expired'
  downloadUrl?: string
  expiresAt?: string
}

export const mockPassportFiles: PassportFile[] = [
  {
    id: '1',
    fileName: 'サッカーパスポート_2024年9月.pdf',
    generatedDate: '2024-09-17',
    fileSize: '2.4MB',
    status: 'ready',
    downloadUrl: '/downloads/passport-202409.pdf'
  },
  {
    id: '2', 
    fileName: 'サッカーパスポート_2024年8月.pdf',
    generatedDate: '2024-08-31',
    fileSize: '2.1MB',
    status: 'ready',
    downloadUrl: '/downloads/passport-202408.pdf'
  },
  {
    id: '3',
    fileName: 'サッカーパスポート_2024年7月.pdf',
    generatedDate: '2024-07-30',
    fileSize: '1.9MB', 
    status: 'ready',
    downloadUrl: '/downloads/passport-202407.pdf'
  },
  {
    id: '4',
    fileName: 'サッカーパスポート_2024年6月.pdf',
    generatedDate: '2024-06-28',
    fileSize: '2.2MB',
    status: 'ready',
    downloadUrl: '/downloads/passport-202406.pdf'
  }
]

export const mockChatSummaries: ChatSummary[] = [
  {
    id: '1',
    date: '2024-09-17',
    title: '練習メニュー最適化セッション',
    todos: [
      '圧縮→スイッチ合図練習 (10分)',
      'ハーフスペース侵入練習 (20分)',
      '受け手の角度作り意識'
    ],
    keyPoints: [
      '高位置奪取から3秒でフィニッシュまで到達可能',
      '時間制約に合わせたメニュー調整が効果的',
      '技術と戦術の組み合わせが重要'
    ],
    createdAt: '2024-09-17 14:35'
  },
  {
    id: '2',
    date: '2024-09-16',
    title: 'コンディション管理相談',
    todos: [
      '睡眠時間を7時間以上確保',
      '練習前のウォームアップ強化',
      '栄養補給タイミング見直し'
    ],
    keyPoints: [
      'ACWR値が高めで疲労蓄積の兆候',
      '睡眠の質向上が最優先',
      '回復セッションの追加を検討'
    ],
    createdAt: '2024-09-16 19:20'
  },
  {
    id: '3',
    date: '2024-09-15',
    title: '試合分析とフィードバック',
    todos: [
      'サイドチェンジのタイミング改善',
      'プレス回避の練習',
      '1vs1の仕掛けパターン増加'
    ],
    keyPoints: [
      '前半のゴールシーンは理想的',
      'プレスのタイミングに課題',
      'パス精度の向上が必要'
    ],
    createdAt: '2024-09-15 21:00'
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

// Tab Summary Data
export interface TabSummary {
  stats: {
    latestSession: string
    weeklyActivity: string
    latestRating: number
    videoStatus: string
  }
  lifelog: {
    sleepScore: string
    nutrition: string
    exercise: string
    deviceStatus: string
  }
  medical: {
    rehabStatus: string
    latestScreening: string
    risks: string
    nextCheckup: string
  }
  note: {
    todayMemo: string
    pendingTasks: number
    recentNote: string
    urgentDeadlines: number
  }
  buddy: {
    lastConsultation: string
    generatedTodos: number
    keyAdvice: string
    nextRecommendedArea: string
  }
}

export const mockTabSummary: TabSummary = {
  stats: {
    latestSession: "vs Seaside U18",
    weeklyActivity: "試合2回 練習3回",
    latestRating: 7.5,
    videoStatus: "動画3本 新着"
  },
  lifelog: {
    sleepScore: "8h 品質90%",
    nutrition: "P25g F18g C55g",
    exercise: "540kcal",
    deviceStatus: "Oura 同期済み"
  },
  medical: {
    rehabStatus: "右膝: フェーズ3 復帰準備中",
    latestScreening: "FMS: 16/21",
    risks: "筋力左右差",
    nextCheckup: "10/1"
  },
  note: {
    todayMemo: "戦術練習ポイント確認",
    pendingTasks: 3,
    recentNote: "vs Seaside戦分析",
    urgentDeadlines: 2
  },
  buddy: {
    lastConsultation: "練習メニュー最適化",
    generatedTodos: 3,
    keyAdvice: "技術と戦術の組み合わせ重要",
    nextRecommendedArea: "フィジカル"
  }
}

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

// Lifelog Data
export interface FoodEntry {
  id: string
  date: string
  mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack'
  name: string
  protein: number // g
  fat: number // g
  carbs: number // g
  calories: number
  time: string
}

export interface SleepEntry {
  id: string
  date: string
  bedTime: string
  wakeTime: string
  duration: number // minutes
  quality: number // 1-10
  deepSleep?: number // minutes
  remSleep?: number // minutes
  source: 'manual' | 'oura' | 'apple_health' | 'garmin'
}

export interface ExerciseEntry {
  id: string
  date: string
  type: string
  duration: number // minutes
  calories: number
  heartRate?: {
    average: number
    max: number
  }
  source: 'manual' | 'apple_health' | 'garmin' | 'whoop'
  startTime: string
}

export const mockFoodEntries: FoodEntry[] = [
  {
    id: '1',
    date: '2024-09-17',
    mealType: 'breakfast',
    name: 'オートミール + バナナ + プロテイン',
    protein: 25,
    fat: 8,
    carbs: 45,
    calories: 340,
    time: '07:30'
  },
  {
    id: '2',
    date: '2024-09-17',
    mealType: 'lunch',
    name: '鶏胸肉サラダ + 玄米',
    protein: 35,
    fat: 12,
    carbs: 50,
    calories: 420,
    time: '12:30'
  },
  {
    id: '3',
    date: '2024-09-17',
    mealType: 'snack',
    name: 'ナッツとドライフルーツ',
    protein: 6,
    fat: 15,
    carbs: 20,
    calories: 220,
    time: '15:00'
  },
  {
    id: '4',
    date: '2024-09-17',
    mealType: 'dinner',
    name: '鮭の塩焼き + 野菜炒め + ご飯',
    protein: 30,
    fat: 18,
    carbs: 55,
    calories: 480,
    time: '19:00'
  }
]

export const mockSleepEntries: SleepEntry[] = [
  {
    id: '1',
    date: '2024-09-17',
    bedTime: '23:00',
    wakeTime: '07:00',
    duration: 480,
    quality: 8,
    deepSleep: 120,
    remSleep: 90,
    source: 'oura'
  },
  {
    id: '2',
    date: '2024-09-16',
    bedTime: '23:30',
    wakeTime: '06:45',
    duration: 435,
    quality: 6,
    deepSleep: 95,
    remSleep: 85,
    source: 'oura'
  },
  {
    id: '3',
    date: '2024-09-15',
    bedTime: '22:45',
    wakeTime: '07:15',
    duration: 510,
    quality: 9,
    deepSleep: 140,
    remSleep: 110,
    source: 'oura'
  }
]

export const mockExerciseEntries: ExerciseEntry[] = [
  {
    id: '1',
    date: '2024-09-17',
    type: 'サッカー練習',
    duration: 90,
    calories: 540,
    heartRate: {
      average: 145,
      max: 178
    },
    source: 'garmin',
    startTime: '16:00'
  },
  {
    id: '2',
    date: '2024-09-17',
    type: 'ランニング',
    duration: 30,
    calories: 280,
    heartRate: {
      average: 155,
      max: 170
    },
    source: 'apple_health',
    startTime: '07:00'
  },
  {
    id: '3',
    date: '2024-09-16',
    type: '筋力トレーニング',
    duration: 45,
    calories: 210,
    heartRate: {
      average: 125,
      max: 150
    },
    source: 'manual',
    startTime: '18:30'
  }
]

// Video and Match Stats
export interface VideoClip {
  id: string
  sessionId: string
  title: string
  duration: number // seconds
  thumbnailUrl: string
  videoUrl: string
  source: 'veo' | 'hudl' | 'manual'
  tags: string[]
  startTime: string
  endTime: string
}

export interface MatchStats {
  id: string
  sessionId: string
  goals: number
  assists: number
  shots: number
  shotsOnTarget: number
  passes: number
  passAccuracy: number
  crosses: number
  crossAccuracy: number
  duelsWon: number
  duelsTotal: number
  pressures: number
  intercepts: number
  tackles: number
  fouls: number
  yellowCards: number
  redCards: number
  minutesPlayed: number
  playerRating: number
}

export const mockVideoClips: VideoClip[] = [
  {
    id: '1',
    sessionId: '1',
    title: 'vs Seaside U18 - フルマッチ',
    duration: 5400, // 90 minutes
    thumbnailUrl: '/videos/thumb1.jpg',
    videoUrl: '/videos/match1.mp4',
    source: 'veo',
    tags: ['試合', 'フルマッチ'],
    startTime: '00:00',
    endTime: '90:00'
  },
  {
    id: '2',
    sessionId: '1', 
    title: 'ゴールシーン - 前半15分',
    duration: 30,
    thumbnailUrl: '/videos/thumb2.jpg',
    videoUrl: '/videos/goal1.mp4',
    source: 'veo',
    tags: ['ゴール', 'ハイライト'],
    startTime: '14:45',
    endTime: '15:15'
  },
  {
    id: '3',
    sessionId: '1',
    title: 'アシストシーン - 後半33分',
    duration: 25,
    thumbnailUrl: '/videos/thumb3.jpg', 
    videoUrl: '/videos/assist1.mp4',
    source: 'veo',
    tags: ['アシスト', 'パス'],
    startTime: '78:10',
    endTime: '78:35'
  },
  {
    id: '4',
    sessionId: '2',
    title: '練習ハイライト',
    duration: 180,
    thumbnailUrl: '/videos/thumb4.jpg',
    videoUrl: '/videos/training1.mp4', 
    source: 'hudl',
    tags: ['練習', 'ドリル'],
    startTime: '00:00',
    endTime: '03:00'
  }
]

export const mockMatchStats: MatchStats[] = [
  {
    id: '1',
    sessionId: '1',
    goals: 1,
    assists: 1,
    shots: 4,
    shotsOnTarget: 2,
    passes: 42,
    passAccuracy: 78.6,
    crosses: 6,
    crossAccuracy: 33.3,
    duelsWon: 8,
    duelsTotal: 13,
    pressures: 15,
    intercepts: 3,
    tackles: 4,
    fouls: 2,
    yellowCards: 0,
    redCards: 0,
    minutesPlayed: 75,
    playerRating: 7.5
  }
]