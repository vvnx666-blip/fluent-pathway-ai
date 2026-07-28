import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { MessagesSquare, Mic, Sparkles, ArrowUpRight, Coffee, Plane, Briefcase, Utensils, ShoppingBag, HeartPulse } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/conversation")({
  head: () => ({
    meta: [
      { title: "Conversation Practice · Cadence" },
      {
        name: "description",
        content: "Everyday English conversation practice with an AI partner. Real scenarios, instant corrections, native-style pronunciation.",
      },
      { property: "og:title", content: "Conversation Practice — Cadence" },
      { property: "og:description", content: "Everyday English conversation with an AI partner." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ConversationPage,
});

type Scenario = { en: string; zh: string; desc_en: string; desc_zh: string; icon: React.ComponentType<{ className?: string }>; level: "Easy" | "Medium" | "Hard" };
const scenarios: Scenario[] = [
  { en: "Coffee shop chat", zh: "咖啡店闲聊", desc_en: "Ordering, small talk, asking for the WiFi.", desc_zh: "点单、闲聊、问 WiFi。", icon: Coffee, level: "Easy" },
  { en: "At the airport", zh: "机场对话", desc_en: "Check-in, security, boarding announcements.", desc_zh: "值机、安检、登机广播。", icon: Plane, level: "Easy" },
  { en: "Job interview", zh: "求职面试", desc_en: "Introducing yourself, answering behavioral questions.", desc_zh: "自我介绍、行为面试问答。", icon: Briefcase, level: "Hard" },
  { en: "Restaurant date", zh: "餐厅约会", desc_en: "Ordering, complimenting, keeping the flow.", desc_zh: "点菜、赞美、延续话题。", icon: Utensils, level: "Medium" },
  { en: "Shopping in the city", zh: "都市购物", desc_en: "Bargaining, returns, size and fit.", desc_zh: "砍价、退换、尺码。", icon: ShoppingBag, level: "Easy" },
  { en: "Doctor's appointment", zh: "看医生", desc_en: "Describing symptoms, understanding advice.", desc_zh: "描述症状、听懂建议。", icon: HeartPulse, level: "Medium" },
];

function ConversationPage() {
  const { t, lang } = useI18n();
  const tx = (en: string, zh: string) => (lang === "zh" ? zh : en);
  const [picked, setPicked] = useState<string | null>(null);

  return (
    <AppShell crumb={tx("Conversation", "对话练习")}>
      <div>
        <p className="text-sm text-muted-foreground">{tx("Everyday English", "日常英语")}</p>
        <h1 className="font-display text-4xl tracking-tight">
          {tx("Talk like a local, today.", "像本地人一样开口。")}
        </h1>
        <p className="mt-2 text-sm text-muted-foreground max-w-2xl">
          {tx(
            "Pick a real-life scenario and have a natural back-and-forth with your AI partner. Pronunciation and phrasing mistakes go straight to your notebook — with the correct pronunciation to listen back.",
            "选一个真实场景，与 AI 搭档自然对话。发音与表达上的问题会自动进入错题本，并可以听到正确发音。",
          )}
        </p>
      </div>

      <section className="rounded-2xl border border-border bg-brand-soft/50 p-6 flex flex-col md:flex-row md:items-center gap-4">
        <div className="w-12 h-12 rounded-xl bg-foreground text-background grid place-items-center">
          <MessagesSquare className="w-5 h-5" />
        </div>
        <div className="flex-1">
          <h2 className="font-display text-2xl">{tx("Free chat with AI", "自由对话")}</h2>
          <p className="text-sm text-muted-foreground">
            {tx("No topic — just start talking. Corrections in real time.", "无主题——直接开口，实时纠错。")}
          </p>
        </div>
        <button className="inline-flex items-center gap-2 h-10 px-4 rounded-lg bg-foreground text-background text-sm font-medium">
          <Mic className="w-4 h-4" /> {tx("Start", "开始")}
        </button>
      </section>

      <section>
        <div className="flex items-baseline justify-between mb-4">
          <h2 className="font-display text-2xl">{tx("Scenarios", "情景对话")}</h2>
          <span className="text-xs text-muted-foreground">{tx("Pick one to start", "选择一个开始")}</span>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {scenarios.map((sc) => {
            const label = lang === "zh" ? sc.zh : sc.en;
            const active = picked === label;
            return (
              <button
                key={sc.en}
                onClick={() => setPicked(label)}
                className={`group text-left rounded-2xl border p-5 transition ${
                  active
                    ? "border-foreground bg-card"
                    : "border-border bg-card hover:border-foreground/30"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-lg bg-muted grid place-items-center">
                    <sc.icon className="w-4 h-4" />
                  </div>
                  <span
                    className={`text-[10px] uppercase tracking-wider ${
                      sc.level === "Hard" ? "text-brand" : "text-muted-foreground"
                    }`}
                  >
                    {sc.level}
                  </span>
                </div>
                <h3 className="mt-4 font-display text-xl">{label}</h3>
                <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                  {lang === "zh" ? sc.desc_zh : sc.desc_en}
                </p>
                <div className="mt-4 inline-flex items-center gap-1 text-xs font-medium">
                  {tx("Start chat", "开始对话")}
                  <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </div>
              </button>
            );
          })}
        </div>
      </section>

      <section className="rounded-2xl border border-border bg-card p-6 flex items-start gap-4">
        <Sparkles className="w-5 h-5 text-brand shrink-0 mt-0.5" />
        <div className="text-sm text-muted-foreground leading-relaxed">
          {tx(
            "Every mispronounced word is added to your Mistakes notebook with a listen button for the correct pronunciation.",
            "每一个发音错误都会自动加入错题本，并附上「正确发音」的播放按钮。",
          )}
        </div>
      </section>
    </AppShell>
  );
}
