# NEO Soccer Note - MVP Mock Application

サッカー選手のための包括的なパフォーマンス管理アプリケーションのモックバージョンです。

## 🚀 技術スタック

- **フロントエンド**: Next.js 15 (App Router)
- **UIライブラリ**: Chakra UI v2
- **言語**: TypeScript
- **デプロイ**: Vercel
- **スタイリング**: Emotion (Chakra UI内蔵)

## 📊 アプリケーション概要

NEO Soccer Noteは、サッカー選手が自分のパフォーマンスを総合的に管理・分析できるプラットフォームです。技術・戦術・フィジカル・メンタル・メディカルの各側面を統合的に追跡し、成長をサポートします。

## 🎯 主要機能とページ構成

### 1. **Home** - ダッシュボード
**概要**: 全体のパフォーマンス概況とAI分析

**主要機能**:
- KPI指標の表示（進行パス、デュエル勝率、睡眠効率、ACWR）
- AIアラート（疲労蓄積、睡眠不足、未入力データ）
- 次のアクション提案（練習メニュー、栄養補給、回復セッション）
- 週間計画の表示

**データ構造**:
```typescript
interface KPI {
  label: string
  value: string
  subtext: string
  trend: 'up' | 'down' | 'neutral'
}
```

---

### 2. **Stats** - 統計・動画管理
**概要**: セッション履歴管理と詳細スタッツ登録

**主要機能**:
- **セッション履歴**: 最新6件の試合・練習記録表示
- **セッション登録**: 3タブ構成のモーダル
  - 基本情報: 種別、日付、対戦相手、出場時間
  - 詳細スタッツ: 攻撃・守備・総合評価の数値入力
  - 動画管理: Veo/Hudlからの動画取り込み、ハイライト生成
- **外部サービス連携**: VeoとHudlからのデータ自動取り込み

**データ構造**:
```typescript
interface Session {
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

interface MatchStats {
  goals: number
  assists: number
  shots: number
  passAccuracy: number
  duelsWon: number
  // ... その他20項目以上
}
```

---

### 3. **Lifelog** - ライフログ管理
**概要**: 日常生活の健康・栄養・運動データ管理

**主要機能**:
- **栄養管理**: 食事記録とPFCマクロ計算
- **睡眠記録**: 睡眠時間、質、深度睡眠データ
- **運動データ**: 心拍数、消費カロリー、運動時間
- **データ連携**: Oura Ring、Apple Health、Garmin等との同期

**データ構造**:
```typescript
interface FoodEntry {
  mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack'
  protein: number  // g
  fat: number      // g
  carbs: number    // g
  calories: number
}

interface SleepEntry {
  bedTime: string
  wakeTime: string
  duration: number    // minutes
  quality: number     // 1-10
  deepSleep?: number  // minutes
  source: 'manual' | 'oura' | 'apple_health'
}
```

---

### 4. **Medical** - メディカル管理 ⭐ 新機能
**概要**: 怪我の履歴、スクリーニング、リハビリ計画の総合管理

**主要機能**:
- **既往歴・ケガ履歴**: 部位別の怪我記録、重症度、治療経過
- **スクリーニング**: 可動域・筋力測定、FMSスコア、左右差分析
- **リハビリ計画**: フェーズ別回復プログラム、許可動作、運動制限
- **クリニック/検査連携**: 血液検査、体組成、遺伝子検査結果の取り込み

**データ構造**:
```typescript
interface MedicalHistory {
  bodyPart: string
  injuryType: string
  severity: 'mild' | 'moderate' | 'severe'
  treatment: string
  returnCriteria: string
  currentStage: string
}

interface Screening {
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
```

---

### 5. **Note** - ノート・タスク管理
**概要**: カレンダー形式のノート管理とタスク追跡

**主要機能**:
- **機能的カレンダー**: 日付クリックでノート編集、月表示
- **自由記述ノート**: 試合・練習・一般カテゴリ別のメモ
- **タスク管理**: チェックリスト形式、完了時自動削除
- **ノートプレビュー**: カレンダー上でのノート概要表示

**データ構造**:
```typescript
interface Note {
  date: string
  title: string
  content: string
  type: 'match' | 'training' | 'general'
  createdAt: string
  updatedAt: string
}

interface Task {
  title: string
  deadline: string
  priority: 'high' | 'medium' | 'low'
  completed: boolean
  category: string
}
```

---

### 6. **Buddy** - AI相談・サマリ機能 ⭐ 大幅改善
**概要**: AI相談チャットとセッションサマリ管理

**主要機能**:
- **ロール別相談**: コーチ(技術/戦術)、フィジカル、栄養、メディカル、メンタル
- **チャット機能**: リアルタイム会話、専門分野別アドバイス
- **サマリ生成**: 会話内容からToDo・重要ポイントを自動抽出
- **サマリ掲示板**: 過去の相談履歴、アクションアイテム管理

**データ構造**:
```typescript
interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
  timestamp: string
}

interface ChatSummary {
  title: string
  todos: string[]
  keyPoints: string[]
  createdAt: string
}
```

**改善内容**:
- ❌ 根拠リンク機能を削除
- ✅ サマリ生成ボタンをチャット下部に追加
- ✅ 7日ミニプランを削除し、サマリ掲示板に置き換え
- ✅ ToDoと重要ポイントの分類表示

---

### 7. **Support** - サポート・パスポート管理 ⭐ 大幅改善
**概要**: データ出力とパスポートファイル管理

**主要機能**:
- **パスポート生成**: PDF形式でのデータ集約、共有リンク作成
- **過去のパスポート管理**: 履歴表示、表示・ダウンロード機能
- **データ署名**: ブロックチェーンベースの改ざん検知機能

**データ構造**:
```typescript
interface PassportFile {
  fileName: string
  generatedDate: string
  fileSize: string
  status: 'ready' | 'generating' | 'expired'
  downloadUrl?: string
}
```

**改善内容**:
- ❌ 共有スコープ/権限セクションを削除
- ❌ 相手先テンプレート選択を削除
- ✅ 過去のパスポートファイル管理機能を追加
- ✅ 3列から2列レイアウトに変更

---

### 8. **Settings** - 設定・連携管理
**概要**: 外部サービス連携とアカウント設定

**主要機能**:
- **動画サービス**: Veo Camera、Hudl
- **ウェアラブル**: Oura Ring、Garmin、WHOOP
- **スマートフォンアプリ**: Apple Health、Google Fit
- **医療機関**: クリニック連携、検査結果自動取り込み

---

## 🗄️ データ構造とアーキテクチャ

### モックデータ管理
すべてのデータは `/src/lib/mockData.ts` で一元管理されています。

**主要なデータカテゴリ**:
- プレイヤー情報とKPI
- セッション・試合データ
- ライフログ（栄養・睡眠・運動）
- メディカル情報（新規追加）
- ノート・タスク
- チャット・サマリ（新規追加）
- パスポートファイル（新規追加）
- 外部サービス連携設定

### サービスレイヤー
`/src/services/api.ts` にて将来のAPI統合に備えた抽象化レイヤーを実装。

## 🎨 UI/UXの特徴

### デザインシステム
- **コンポーネントライブラリ**: Chakra UI v2を採用
- **カスタムコンポーネント**: 再利用可能なCardコンポーネント
- **レスポンシブデザイン**: モバイル・タブレット・デスクトップ対応
- **テーマ**: ブランドカラーベースの統一されたデザイン

### インタラクション
- **モーダルベースワークフロー**: 複雡なデータ入力の簡素化
- **リアルタイムフィードバック**: ローディング状態、トースト通知
- **直感的ナビゲーション**: タブベースの画面切り替え

## 🔧 開発・デプロイ

### ローカル開発
```bash
npm install
npm run dev
```

### ビルド・デプロイ
```bash
npm run build
# Vercelに自動デプロイ
```

### TypeScript設定
- 厳格な型チェック
- ESLint統合
- 未使用変数・import警告

## 📈 実装された改善項目

### パフォーマンス最適化
- Next.js 15のTurbopack使用
- 静的サイト生成 (SSG)
- コンポーネントの遅延読み込み

### ユーザビリティ改善
- ✅ タスク管理UIの改善（チェックボックス形式）
- ✅ カレンダー機能の実装
- ✅ サマリ機能の追加
- ✅ ファイル管理機能の強化

### データ管理改善
- ✅ Medical関連のデータ構造追加
- ✅ Chat Summaryデータ構造追加
- ✅ Passport Fileデータ構造追加
- ✅ TypeScript型安全性の向上

## 🚀 今後の拡張可能性

### API統合準備
- サービスレイヤーによる抽象化完了
- 実際のバックエンドAPIとの統合準備済み

### 追加機能候補
- リアルタイム通知システム
- ソーシャル機能（チームメイトとの共有）
- 高度な分析・予測機能
- オフライン機能対応

## 📊 プロジェクト統計

### ファイル構成
```
src/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # ルートレイアウト
│   └── page.tsx           # メインページ
├── components/             # UIコンポーネント
│   ├── Layout.tsx         # レイアウトコンポーネント
│   ├── Card.tsx          # 再利用可能カード
│   └── pages/            # 8つのページコンポーネント
│       ├── HomePage.tsx
│       ├── StatsPage.tsx
│       ├── LifelogPage.tsx
│       ├── MedicalPage.tsx    # 新規追加
│       ├── NotePage.tsx
│       ├── BuddyPage.tsx
│       ├── SupportPage.tsx
│       └── SettingsPage.tsx
├── lib/                   # ユーティリティ
│   └── mockData.ts       # 統合モックデータ
├── providers/             # Context Providers
│   └── ChakraProvider.tsx
└── services/              # API サービス層
    └── api.ts            # 将来のAPI統合準備
```

### データ型定義
- **総インターフェース数**: 25+
- **モックデータエントリ**: 100+
- **TypeScript型安全性**: 100%

## 🏆 MVP要件達成状況

### 完了機能
- ✅ セッション基本入力・履歴管理
- ✅ 詳細スタッツ登録（20項目以上）
- ✅ 動画メタ管理・ハイライト生成
- ✅ 課題・ノート・タスク管理
- ✅ AIアクション提案・相談機能
- ✅ パスポート生成・ファイル管理
- ✅ 外部サービス連携設定
- ✅ メディカル管理（新規）
- ✅ ライフログ管理

### 改善された機能
- 🔄 タスク管理（チェックリスト形式）
- 🔄 カレンダー（機能的日付選択）
- 🔄 チャット（サマリ生成機能）
- 🔄 ファイル管理（過去履歴・操作）

---

## 📄 ライセンス

このプロジェクトはMVPモックとして開発されており、実際のデータ連携機能は実装されていません。デモンストレーション目的でのみ使用してください。

---

**開発期間**: 2024年9月  
**最終更新**: 2024年9月18日  
**バージョン**: MVP v1.0  
**デプロイURL**: [Vercelにデプロイ済み]