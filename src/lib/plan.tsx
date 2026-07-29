import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

export type PlanId =
  | "free"
  | "single_analysis"
  | "single_mock"
  | "weekly"
  | "sprint7"
  | "pro_month"
  | "pro_year"
  | "daily_weekly"
  | "daily_month"
  | "daily_unlimited";

export type PlanTrack = "ielts" | "daily";
export type PlanTier = "free" | "single" | "sub" | "pro";

export interface PlanQuotas {
  mock: number; // remaining
  mockTotal: number;
  drill: number;
  drillTotal: number;
  analysis: number;
  analysisTotal: number;
  practiceMinutes: number; // ielts side: fixed small chat minutes/week
  practiceMinutesTotal: number;
  dailyMinutes: number; // conversation track minutes
  dailyMinutesTotal: number;
  fullUnlock: boolean; // detail page full unlock (words/sentences)
  proAnalytics: boolean; // /review/track
  drillTopicOpen: boolean; // topic selector open
}

export interface PlanDef {
  id: PlanId;
  track: PlanTrack;
  tier: PlanTier;
  name: string;
  nameZh: string;
  price: string;
  cadence: string;
  cadenceZh: string;
  tagline: string;
  taglineZh: string;
  highlight?: boolean;
  features: string[];
  featuresZh: string[];
  quotas: PlanQuotas;
}

const Q = (o: Partial<PlanQuotas>): PlanQuotas => ({
  mock: 0, mockTotal: 0,
  drill: 0, drillTotal: 0,
  analysis: 0, analysisTotal: 0,
  practiceMinutes: 0, practiceMinutesTotal: 0,
  dailyMinutes: 0, dailyMinutesTotal: 0,
  fullUnlock: false,
  proAnalytics: false,
  drillTopicOpen: false,
  ...o,
});

export const PLANS: PlanDef[] = [
  {
    id: "free", track: "ielts", tier: "free",
    name: "Free", nameZh: "免费",
    price: "¥0", cadence: "forever", cadenceZh: "永久免费",
    tagline: "Try the examiner once.", taglineZh: "先体验一次官方风格评分。",
    features: ["1 full mock (one-time)", "2 topic drills · fixed topic per Part", "3 min AI chat / week", "3 words + 3 sentences preview"],
    featuresZh: ["1 次完整模考（一次性）", "2 次专题训练 · 每 Part 仅 1 个固定话题", "陪练 3 分钟 / 周", "词/错句仅显示 3 条预览"],
    quotas: Q({ mock: 1, mockTotal: 1, drill: 2, drillTotal: 2, practiceMinutes: 3, practiceMinutesTotal: 3 }),
  },
  {
    id: "single_analysis", track: "ielts", tier: "single",
    name: "Single · Analysis", nameZh: "单次 · 专项分析",
    price: "¥9.9", cadence: "one-time", cadenceZh: "单次",
    tagline: "Unlock one full report.", taglineZh: "解锁一份完整评分单。",
    features: ["1 targeted analysis", "Full words + sentences for that session"],
    featuresZh: ["1 次专项分析", "本次完整词与错句解锁"],
    quotas: Q({ analysis: 1, analysisTotal: 1, fullUnlock: true }),
  },
  {
    id: "single_mock", track: "ielts", tier: "single",
    name: "Single · Mock", nameZh: "单次 · 模考",
    price: "¥29.9", cadence: "one-time", cadenceZh: "单次",
    tagline: "One full 14-min mock, fully unlocked.", taglineZh: "一次完整 14 分钟模考，完整解锁。",
    features: ["1 full mock + 4-band report", "Complete review record", "Full words + sentences"],
    featuresZh: ["1 次完整模考 + 四项报告", "完整复盘记录", "完整词与错句"],
    quotas: Q({ mock: 1, mockTotal: 1, fullUnlock: true }),
  },
  {
    id: "weekly", track: "ielts", tier: "sub",
    name: "Weekly", nameZh: "周卡",
    price: "¥19.9", cadence: "/ week", cadenceZh: "/ 周",
    tagline: "Steady weekly rhythm.", taglineZh: "稳定的每周节奏。",
    features: ["1 mock · 3 drills · 2 analyses", "5 min AI chat / week", "Full unlock this week"],
    featuresZh: ["1 次模考 · 3 次专题 · 2 次分析", "陪练 5 分钟 / 周", "本周完整解锁"],
    quotas: Q({ mock: 1, mockTotal: 1, drill: 3, drillTotal: 3, analysis: 2, analysisTotal: 2, practiceMinutes: 5, practiceMinutesTotal: 5, fullUnlock: true, drillTopicOpen: true }),
  },
  {
    id: "sprint7", track: "ielts", tier: "sub",
    name: "7-Day Sprint", nameZh: "7 天冲刺",
    price: "¥69.9", cadence: "/ 7 days", cadenceZh: "/ 7 天",
    tagline: "Intense 7-day burst.", taglineZh: "考前 7 天集中冲刺。",
    features: ["5 mocks · 10 drills · 10 analyses", "15 min AI chat / week", "Full unlock"],
    featuresZh: ["5 次模考 · 10 次专题 · 10 次分析", "陪练 15 分钟 / 周", "完整解锁"],
    quotas: Q({ mock: 5, mockTotal: 5, drill: 10, drillTotal: 10, analysis: 10, analysisTotal: 10, practiceMinutes: 15, practiceMinutesTotal: 15, fullUnlock: true, drillTopicOpen: true }),
  },
  {
    id: "pro_month", track: "ielts", tier: "pro",
    name: "Pro Monthly", nameZh: "Pro 月卡",
    price: "¥79", cadence: "/ month", cadenceZh: "/ 月",
    tagline: "The complete IELTS coach.", taglineZh: "完整的雅思陪跑体系。",
    highlight: true,
    features: ["4 mocks · 15 drills · 10 analyses / month", "10 min AI chat / week", "Full unlock + Progress Tracker"],
    featuresZh: ["每月 4 次模考 · 15 次专题 · 10 次分析", "陪练 10 分钟 / 周", "完整解锁 + 复盘追踪页"],
    quotas: Q({ mock: 4, mockTotal: 4, drill: 15, drillTotal: 15, analysis: 10, analysisTotal: 10, practiceMinutes: 10, practiceMinutesTotal: 10, fullUnlock: true, proAnalytics: true, drillTopicOpen: true }),
  },
  {
    id: "pro_year", track: "ielts", tier: "pro",
    name: "Pro Annual", nameZh: "Pro 年卡",
    price: "¥699", cadence: "/ year", cadenceZh: "/ 年",
    tagline: "Best value · 26% off monthly.", taglineZh: "最超值 · 相比月卡省 26%。",
    features: ["Everything in Pro Monthly, monthly reset", "Yearly learning report"],
    featuresZh: ["含 Pro 月卡全部权益，按月重置", "专属年度学习报告"],
    quotas: Q({ mock: 4, mockTotal: 4, drill: 15, drillTotal: 15, analysis: 10, analysisTotal: 10, practiceMinutes: 10, practiceMinutesTotal: 10, fullUnlock: true, proAnalytics: true, drillTopicOpen: true }),
  },
  {
    id: "daily_weekly", track: "daily", tier: "sub",
    name: "Daily · Weekly", nameZh: "口语陪练 · 周卡",
    price: "¥19.9", cadence: "/ week", cadenceZh: "/ 周",
    tagline: "Warm-up week.", taglineZh: "热身一周。",
    features: ["40 min AI chat", "Full analysis"],
    featuresZh: ["40 分钟陪练", "完整分析"],
    quotas: Q({ dailyMinutes: 40, dailyMinutesTotal: 40, fullUnlock: true }),
  },
  {
    id: "daily_month", track: "daily", tier: "sub",
    name: "Daily · Monthly", nameZh: "口语陪练 · 月卡",
    price: "¥69.9", cadence: "/ month", cadenceZh: "/ 月",
    tagline: "Daily fluency habit.", taglineZh: "养成每日开口习惯。",
    highlight: true,
    features: ["150 min AI chat", "Full analysis"],
    featuresZh: ["150 分钟陪练", "完整分析"],
    quotas: Q({ dailyMinutes: 150, dailyMinutesTotal: 150, fullUnlock: true }),
  },
  {
    id: "daily_unlimited", track: "daily", tier: "pro",
    name: "Daily · Unlimited", nameZh: "口语陪练 · 畅聊月卡",
    price: "¥129", cadence: "/ month", cadenceZh: "/ 月",
    tagline: "Chat as much as you want.", taglineZh: "想聊就聊。",
    features: ["300 min AI chat", "Full analysis"],
    featuresZh: ["300 分钟陪练", "完整分析"],
    quotas: Q({ dailyMinutes: 300, dailyMinutesTotal: 300, fullUnlock: true }),
  },
];

export function getPlan(id: PlanId): PlanDef {
  return PLANS.find((p) => p.id === id) ?? PLANS[0];
}

interface PlanCtx {
  planId: PlanId;
  plan: PlanDef;
  setPlan: (id: PlanId) => void;
  quotas: PlanQuotas;
}

const Ctx = createContext<PlanCtx>({
  planId: "free",
  plan: PLANS[0],
  setPlan: () => {},
  quotas: PLANS[0].quotas,
});

export function PlanProvider({ children }: { children: ReactNode }) {
  const [planId, setPlanId] = useState<PlanId>("free");
  useEffect(() => {
    const saved = typeof window !== "undefined" ? (window.localStorage.getItem("planId") as PlanId | null) : null;
    if (saved && PLANS.find((p) => p.id === saved)) setPlanId(saved);
  }, []);
  useEffect(() => {
    if (typeof window !== "undefined") window.localStorage.setItem("planId", planId);
  }, [planId]);
  const value = useMemo<PlanCtx>(() => {
    const plan = getPlan(planId);
    return { planId, plan, setPlan: setPlanId, quotas: plan.quotas };
  }, [planId]);
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function usePlan() {
  return useContext(Ctx);
}
