import { useState } from "react";
import {
  CheckCircle2,
  Sparkles,
  Play,
  Plane,
  Cpu,
  Leaf,
  Briefcase,
  Film,
  Utensils,
  BookOpen,
  Heart,
  type LucideIcon,
} from "lucide-react";
import { useI18n, type Lang } from "@/lib/i18n";

type PartId = "p1" | "p2" | "p3";
type Part = {
  id: PartId;
  label: string;
  en: { title: string; desc: string; dur: string };
  zh: { title: string; desc: string; dur: string };
};

const parts: Part[] = [
  {
    id: "p1",
    label: "Part 1",
    en: { title: "Warm-up Q&A", desc: "Everyday topics, short answers.", dur: "~ 4–5 min" },
    zh: { title: "日常话题问答热身", desc: "日常话题，简短回答。", dur: "预计 4–5 分钟" },
  },
  {
    id: "p2",
    label: "Part 2",
    en: { title: "Long turn", desc: "1-min prep + 2-min monologue.", dur: "~ 3–4 min" },
    zh: { title: "长篇独白", desc: "1 分钟准备 + 2 分钟独白。", dur: "预计 3–4 分钟" },
  },
  {
    id: "p3",
    label: "Part 3",
    en: { title: "Discussion", desc: "Abstract, in-depth follow-ups.", dur: "~ 4–5 min" },
    zh: { title: "抽象话题延伸讨论", desc: "抽象、深入的追问。", dur: "预计 4–5 分钟" },
  },
];

type Topic = { id: string; icon: LucideIcon; en: string; zh: string; qs: number };
const topics: Topic[] = [
  { id: "travel", icon: Plane, en: "Travel", zh: "旅行", qs: 8 },
  { id: "tech", icon: Cpu, en: "Technology", zh: "科技", qs: 7 },
  { id: "env", icon: Leaf, en: "Environment", zh: "环境", qs: 6 },
  { id: "work", icon: Briefcase, en: "Work & Study", zh: "工作与学习", qs: 9 },
  { id: "media", icon: Film, en: "Media", zh: "媒体", qs: 5 },
  { id: "food", icon: Utensils, en: "Food", zh: "饮食", qs: 6 },
  { id: "edu", icon: BookOpen, en: "Education", zh: "教育", qs: 7 },
  { id: "health", icon: Heart, en: "Health", zh: "健康", qs: 5 },
];

const QUOTA_LEFT = 3; // mock monthly quota

function tx(lang: Lang, en: string, zh: string) {
  return lang === "zh" ? zh : en;
}

export function TopicDrill() {
  const { lang } = useI18n();
  const [part, setPart] = useState<PartId | null>(null);
  const [topic, setTopic] = useState<string | null>(null);
  const [aiOn, setAiOn] = useState(false);
  const [showQuotaModal, setShowQuotaModal] = useState(false);

  const outOfQuota = QUOTA_LEFT === 0;
  const ready = !!part && !!topic;

  const toggleAi = () => {
    if (!aiOn && outOfQuota) {
      setShowQuotaModal(true);
      return;
    }
    setAiOn((v) => !v);
  };

  const ctaLabel = !ready
    ? tx(lang, "Pick a part and topic first", "请先选择 Part 和话题")
    : aiOn
      ? tx(lang, "Start drill (uses 1 AI grade)", "开始专题训练（消耗 1 次评分额度）")
      : tx(lang, "Start topic drill", "开始专题训练");

  return (
    <section className="relative overflow-hidden rounded-2xl bg-foreground text-background p-8">
      <div className="absolute -left-16 -bottom-16 w-72 h-72 rounded-full bg-brand/20 blur-3xl" />
      <div className="relative">
        <div className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-wider text-background/60">
          <Sparkles className="w-3 h-3" /> TOPIC PRACTICE
        </div>
        <h2 className="mt-2 font-display text-4xl leading-[1]">
          {tx(lang, "Topic drill", "专题训练")}
        </h2>
        <p className="mt-2 text-sm text-background/60">
          {tx(lang, "Pick one Part and go deep.", "选一个 Part，单项突破")}
        </p>

        {/* Step 1 — Part */}
        <div className="mt-6">
          <div className="text-[10px] uppercase tracking-wider text-background/50 mb-2">
            {tx(lang, "Step 1 · Choose a Part", "第 1 步 · 选择 Part")}
          </div>
          <div className="grid gap-3 md:grid-cols-3">
            {parts.map((p) => {
              const active = part === p.id;
              const info = lang === "zh" ? p.zh : p.en;
              return (
                <button
                  key={p.id}
                  onClick={() => {
                    setPart(p.id);
                    setTopic(null);
                  }}
                  className={`text-left rounded-xl border p-4 transition ${
                    active
                      ? "border-brand bg-background/[0.06]"
                      : "border-background/15 bg-background/[0.03] hover:border-background/30"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] uppercase tracking-wider text-background/60">
                      {p.label}
                    </span>
                    {active && <CheckCircle2 className="w-4 h-4 text-brand" />}
                  </div>
                  <div className="mt-2 font-display text-xl leading-tight">{info.title}</div>
                  <div className="mt-1 text-xs text-background/60">{info.desc}</div>
                  <div className="mt-3 text-[11px] text-background/50">{info.dur}</div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Step 2 — Topic */}
        {part && (
          <div className="mt-6 animate-in fade-in slide-in-from-top-2 duration-300">
            <div className="text-[10px] uppercase tracking-wider text-background/50 mb-2">
              {tx(lang, "Step 2 · Choose a topic", "第 2 步 · 选择一个话题")}
            </div>
            <div className="grid gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {topics.map((tp) => {
                const active = topic === tp.id;
                return (
                  <button
                    key={tp.id}
                    onClick={() => setTopic(tp.id)}
                    className={`flex items-center gap-2 rounded-lg border p-3 text-left transition ${
                      active
                        ? "border-brand bg-background/[0.06]"
                        : "border-background/15 bg-background/[0.03] hover:border-background/30"
                    }`}
                  >
                    <div
                      className={`w-8 h-8 rounded-md grid place-items-center shrink-0 ${
                        active ? "bg-brand text-brand-foreground" : "bg-background/10"
                      }`}
                    >
                      <tp.icon className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-sm font-medium truncate">{tx(lang, tp.en, tp.zh)}</div>
                      <div className="text-[11px] text-background/50">
                        {tp.qs} {tx(lang, "questions", "题")}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Step 3 — AI grading toggle */}
        {part && topic && (
          <div className="mt-6 animate-in fade-in slide-in-from-top-2 duration-300">
            <div className="text-[10px] uppercase tracking-wider text-background/50 mb-2">
              {tx(lang, "Step 3 · AI grading", "第 3 步 · AI 评分")}
            </div>
            <div className="rounded-xl border border-background/15 bg-background/[0.03] p-4 flex items-center justify-between gap-4">
              <div>
                <div className="text-sm font-medium">
                  {tx(lang, "AI professional grading", "AI 专业评分")}
                </div>
                <div className="text-[11px] text-background/60 mt-0.5">
                  {aiOn
                    ? tx(
                        lang,
                        `Uses 1 grading credit · ${QUOTA_LEFT} left this month`,
                        `本次将消耗 1 次评分额度 · 本月剩余 ${QUOTA_LEFT} 次`,
                      )
                    : tx(lang, "Not graded · unlimited practice", "不计分，可无限练习")}
                </div>
              </div>
              <button
                onClick={toggleAi}
                aria-pressed={aiOn}
                className={`relative h-6 w-11 rounded-full transition ${
                  aiOn ? "bg-brand" : "bg-background/20"
                }`}
              >
                <span
                  className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-background transition ${
                    aiOn ? "translate-x-5" : ""
                  }`}
                />
              </button>
            </div>
          </div>
        )}

        {/* CTA */}
        <div className="mt-6 flex items-center justify-between gap-3">
          <div className="text-[11px] text-background/50">
            {ready
              ? aiOn
                ? tx(lang, "Ready. AI grading on.", "已就绪，AI 评分已开启。")
                : tx(lang, "Ready. Free practice mode.", "已就绪，无限练习模式。")
              : tx(lang, "Complete steps 1 and 2 to continue.", "完成第 1、2 步后继续。")}
          </div>
          <button
            disabled={!ready}
            className="inline-flex items-center gap-2 h-11 px-5 rounded-lg bg-brand text-brand-foreground text-sm font-medium disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <Play className="w-4 h-4" />
            {ctaLabel}
          </button>
        </div>
      </div>

      {/* Out-of-quota modal */}
      {showQuotaModal && (
        <div
          className="fixed inset-0 z-50 grid place-items-center bg-black/60 p-4"
          onClick={() => setShowQuotaModal(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-sm rounded-2xl bg-background text-foreground p-6 border border-border"
          >
            <div className="font-display text-xl">
              {tx(lang, "You've used all AI grades this month", "本月评分次数已用完")}
            </div>
            <p className="mt-1.5 text-xs text-muted-foreground">
              {tx(
                lang,
                "Buy one grade, or upgrade for more.",
                "单独购买这次评分，或升级订阅解锁更多次数。",
              )}
            </p>
            <div className="mt-4 flex flex-col gap-2">
              <button
                onClick={() => setShowQuotaModal(false)}
                className="h-10 rounded-lg bg-foreground text-background text-sm font-medium"
              >
                {tx(lang, "¥4.9 · Buy 1 grade", "¥4.9 单独购买这次评分")}
              </button>
              <button
                onClick={() => setShowQuotaModal(false)}
                className="h-10 rounded-lg border border-border text-sm font-medium hover:bg-accent"
              >
                {tx(lang, "Upgrade subscription", "升级订阅解锁更多次数")}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
