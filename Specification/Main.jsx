import React, { useState } from "react";

// NEO Soccer Note – 改善版モック（5ページ）
// Tailwindベース。トップのタブで Home / Stats / Note / Buddy / Support を切替。
// 目的：MVP要件を満たす配置と情報設計を示す静的モックアップ。

export default function AppMock() {
  const TABS = ["Home", "Stats", "Note", "Buddy", "Support"] as const;
  const [tab, setTab] = useState<typeof TABS[number]>("Home");

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white text-slate-900">
      {/* Header */}
      <header className="sticky top-0 z-20 backdrop-blur bg-white/70 border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-emerald-500" />
            <h1 className="font-semibold">NEO Soccer Note</h1>
            <span className="ml-2 text-xs px-2 py-1 rounded-full bg-slate-100 text-slate-500">MVP Mock</span>
          </div>
          <nav className="flex gap-2">
            {TABS.map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`px-3 py-1.5 rounded-full text-sm transition-all ${
                  tab === t
                    ? "bg-emerald-500 text-white shadow"
                    : "hover:bg-slate-100 text-slate-700"
                }`}
              >
                {t}
              </button>
            ))}
          </nav>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-6">
        {tab === "Home" && <HomePage />}
        {tab === "Stats" && <StatsPage />}
        {tab === "Note" && <NotePage />}
        {tab === "Buddy" && <BuddyPage />}
        {tab === "Support" && <SupportPage />}
      </main>
    </div>
  );
}

function Card({ children, title, right }: { children: React.ReactNode; title: string; right?: React.ReactNode }) {
  return (
    <section className="bg-white rounded-2xl shadow-sm border border-slate-200 p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold text-slate-800">{title}</h3>
        {right}
      </div>
      {children}
    </section>
  );
}

// ---------------- Home ----------------
function HomePage() {
  return (
    <div className="grid gap-4">
      {/* KPI Strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "進行パス", value: "12本", sub: "+3 vs 平均" },
          { label: "デュエル勝率", value: "61%", sub: "-4% vs 先週" },
          { label: "睡眠効率", value: "90%", sub: "+5%" },
          { label: "ACWR", value: "1.45", sub: "⚠ 急増 注意" },
        ].map((k) => (
          <div key={k.label} className="bg-white rounded-2xl p-4 border border-slate-200">
            <div className="text-xs text-slate-500">{k.label}</div>
            <div className="text-2xl font-bold">{k.value}</div>
            <div className="text-xs text-slate-500 mt-1">{k.sub}</div>
          </div>
        ))}
      </div>

      {/* Alerts & Next Actions */}
      <div className="grid md:grid-cols-3 gap-4">
        <Card title="アラート">
          <ul className="text-sm leading-6">
            <li>• ACWR が 1.45（推奨: 0.8–1.3）— 回復セッションを挿入</li>
            <li>• 睡眠 <span className="font-medium">2日連続 6h未満</span> — 就床時刻前倒しを提案</li>
            <li>• スタッツ未入力: 練習(9/14), 自主練(9/16)</li>
          </ul>
        </Card>
        <Card title="次アクション" right={<span className="text-xs text-emerald-700">今日1つ/今週3つ</span>}>
          <ol className="text-sm list-decimal ml-4 space-y-1">
            <li>10分：敵陣プレス→ショートカウンターの再現ドリル(2セット)</li>
            <li>30分：ハム主導の加速ドリル + RPE 5 で調整</li>
            <li>食事：練習60分前に炭水化物 40g 補給</li>
          </ol>
        </Card>
        <Card title="最新動画">
          <div className="aspect-video rounded-xl bg-slate-100 grid place-items-center text-slate-500">動画プレビュー</div>
          <div className="flex items-center justify-between mt-2 text-xs text-slate-500">
            <span>vs Seaside U18 (9/15) — 02:14〜 プレス→得点</span>
            <button className="px-2 py-1 rounded bg-slate-900 text-white text-xs">ハイライト生成</button>
          </div>
        </Card>
      </div>
    </div>
  );
}

// ---------------- Stats ----------------
function StatsPage() {
  return (
    <div className="grid md:grid-cols-3 gap-4">
      <Card title="セッション登録">
        <form className="grid grid-cols-2 gap-3 text-sm">
          <label className="grid gap-1 col-span-1">
            <span>種別</span>
            <select className="input">
              <option>試合</option>
              <option>練習</option>
              <option>自主練</option>
            </select>
          </label>
          <label className="grid gap-1 col-span-1">
            <span>日付</span>
            <input type="date" className="input" />
          </label>
          <label className="grid gap-1 col-span-2">
            <span>対戦相手 / 会場</span>
            <input placeholder="例: FC North @ 市営G" className="input" />
          </label>
          <label className="grid gap-1">
            <span>出場(分)</span>
            <input type="number" placeholder="75" className="input" />
          </label>
          <label className="grid gap-1">
            <span>フォーメーション</span>
            <input placeholder="4-3-3" className="input" />
          </label>
          <label className="grid gap-1 col-span-2">
            <span>ポジション履歴</span>
            <input placeholder="0-30 LWG / 30-90 CM" className="input" />
          </label>
          <div className="col-span-2 flex gap-2">
            <button className="btn-primary">保存</button>
            <button className="btn-ghost">動画を添付</button>
          </div>
        </form>
      </Card>
      <Card title="イベントタグ(最小)" right={<span className="text-xs text-slate-500">xGは座標あり時</span>}>
        <div className="grid grid-cols-2 gap-2 text-sm">
          {[
            "パス(進行)",
            "クロス",
            "シュート(部位/枠内)",
            "デュエル",
            "プレス",
            "インターセプト",
          ].map((t) => (
            <button key={t} className="px-2 py-2 rounded border hover:bg-slate-50 text-left">{t}</button>
          ))}
        </div>
        <div className="mt-3 p-2 rounded bg-slate-50 text-xs text-slate-600">+ 座標入力でシュートマップ/ヒートマップを強化</div>
      </Card>
      <Card title="ハイライト自動生成">
        <div className="text-sm space-y-2">
          <div className="flex items-center justify-between">
            <span>高位置奪取→ショートカウンター→シュート</span>
            <button className="btn-primary">生成</button>
          </div>
          <div className="flex items-center justify-between">
            <span>左ハーフスペース侵入→スルーパス</span>
            <button className="btn-ghost">生成</button>
          </div>
        </div>
      </Card>
    </div>
  );
}

// ---------------- Note ----------------
function NotePage() {
  return (
    <div className="grid md:grid-cols-3 gap-4">
      <Card title="週カレンダー(例)">
        <div className="grid grid-cols-7 gap-2 text-xs">
          {["月","火","水","木","金","土","日"].map((d) => (
            <div key={d} className="p-2 rounded border border-slate-200 min-h-[80px]">
              <div className="text-slate-500 mb-1">{d}</div>
              <div className="text-slate-700">• 夕方 練習</div>
              <div className="text-emerald-700">• 目標: プレス開始位置</div>
            </div>
          ))}
        </div>
      </Card>
      <Card title="課題/タスク">
        <ul className="text-sm space-y-2">
          <li className="flex items-center justify-between"><span>敵陣プレスの開始合図を決める</span><span className="px-2 py-1 bg-slate-100 rounded text-xs">期限 9/20</span></li>
          <li className="flex items-center justify-between"><span>左足アウトでの縦突破 20回</span><span className="px-2 py-1 bg-slate-100 rounded text-xs">期限 9/21</span></li>
          <li className="flex items-center justify-between"><span>試合振り返りを記入</span><span className="px-2 py-1 bg-slate-100 rounded text-xs">期限 9/18</span></li>
        </ul>
        <div className="mt-3 flex gap-2">
          <button className="btn-primary">追加</button>
          <button className="btn-ghost">テンプレ</button>
        </div>
      </Card>
      <Card title="振り返りテンプレ(5行)">
        <div className="space-y-2 text-sm">
          {[
            "① 目標",
            "② 実行",
            "③ 結果",
            "④ 気づき",
            "⑤ 次アクション",
          ].map((l) => (
            <input key={l} placeholder={l} className="input" />
          ))}
          <button className="btn-primary">保存</button>
        </div>
      </Card>
    </div>
  );
}

// ---------------- Buddy ----------------
function BuddyPage() {
  return (
    <div className="grid md:grid-cols-3 gap-4">
      <Card title="ロール選択" right={<span className="text-xs text-slate-500">根拠リンクON</span>}>
        <div className="flex flex-wrap gap-2">
          {["コーチ(技術/戦術)", "フィジカル", "栄養", "メディカル", "メンタル"].map((r) => (
            <button key={r} className="px-3 py-1.5 rounded-full border hover:bg-slate-50 text-sm">{r}</button>
          ))}
        </div>
      </Card>
      <Card title="チャット">
        <div className="h-64 overflow-auto rounded border border-slate-200 p-3 bg-slate-50 text-sm space-y-3">
          <div>
            <div className="text-slate-500 text-xs">Buddy</div>
            <div className="bg-white rounded-xl border p-2 mt-1">直近の動画(02:14〜)を確認。高位置奪取から3秒でフィニッシュまで到達できています。再現のための2ドリルを提案します。</div>
          </div>
          <div>
            <div className="text-slate-500 text-xs">You</div>
            <div className="bg-emerald-50 rounded-xl border border-emerald-200 p-2 mt-1">今日30分でできるメニューに調整して。</div>
          </div>
          <div>
            <div className="text-slate-500 text-xs">Buddy</div>
            <div className="bg-white rounded-xl border p-2 mt-1">OK。10分: 圧縮→スイッチ合図練習、20分: ハーフスペース侵入→受け手の角度作り。根拠: <a className="underline" href="#">イベント#124</a> / <a className="underline" href="#">睡眠スコア</a></div>
          </div>
        </div>
        <div className="mt-2 flex gap-2">
          <input className="input flex-1" placeholder="質問を書く…" />
          <button className="btn-primary">送信</button>
        </div>
      </Card>
      <Card title="7日ミニプラン">
        <ul className="text-sm leading-7">
          <li>Mon: 技術(20) + 走(10)</li>
          <li>Tue: 走(20) + 栄養: 炭水化物前日 4g/kg</li>
          <li>Wed: 休養 + 睡眠: 就床23:00</li>
          <li>Thu: 戦術(30) 位置間の距離管理</li>
          <li>Fri: セットプレー(20) + 反復(10)</li>
          <li>Sat: 試合</li>
          <li>Sun: 回復(20) + 振り返り</li>
        </ul>
      </Card>
    </div>
  );
}

// ---------------- Support ----------------
function SupportPage() {
  return (
    <div className="grid md:grid-cols-3 gap-4">
      <Card title="パスポート生成">
        <div className="text-sm">相手別テンプレート:</div>
        <div className="flex gap-2 mt-2">
          {["スカウト", "学校", "スポンサー"].map((t) => (
            <button key={t} className="px-3 py-1.5 rounded-full border hover:bg-slate-50 text-sm">{t}</button>
          ))}
        </div>
        <div className="mt-3 flex gap-2">
          <button className="btn-primary">PDF生成</button>
          <button className="btn-ghost">共有リンク作成</button>
        </div>
      </Card>
      <Card title="共有スコープ/権限">
        <div className="text-sm space-y-2">
          <label className="flex items-center gap-2"><input type="checkbox"/> 閲覧期限: 7日</label>
          <label className="flex items-center gap-2"><input type="checkbox"/> ダウンロード禁止</label>
          <label className="flex items-center gap-2"><input type="checkbox"/> 個人情報マスク</label>
        </div>
      </Card>
      <Card title="データ署名/改ざん検知">
        <div className="text-sm space-y-2">
          <div>スナップショット署名: <span className="px-2 py-0.5 rounded bg-slate-100 text-xs">未署名</span></div>
          <button className="btn-primary">署名する</button>
          <div className="text-xs text-slate-500">署名時にタイムスタンプとハッシュを保存（ブロックチェーンPoC）。</div>
        </div>
      </Card>
    </div>
  );
}

// ----- util styles -----
function className(...args){return args.filter(Boolean).join(" ");}

// Tailwind-like utility aliases
const base = "rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500";
const input = `${base} px-3 py-2 bg-white`;
const btnPrimary = "px-3 py-2 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 active:scale-[.98]";
const btnGhost = "px-3 py-2 rounded-lg border border-slate-300 hover:bg-slate-50";

// expose classes via global (for readability in JSX)
// @ts-ignore
if (typeof window !== 'undefined') {
  // @ts-ignore
  window.__styles = { input, btnPrimary, btnGhost };
}

// style helpers on global scope
// (In this canvas preview environment, we alias CSS classes via global to make JSX cleaner.)

// eslint-disable-next-line
const InputShim = () => null;
