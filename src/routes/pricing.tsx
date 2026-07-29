import { createFileRoute, Link } from "@tanstack/react-router";
import { Check, Sparkles, Crown, ArrowRight, Zap, Star } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { useI18n } from "@/lib/i18n";
import { PLANS, usePlan, type PlanDef, type PlanTrack } from "@/lib/plan";
import { useState } from "react";

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title: "Plans · Cadence" },
      { name: "description", content: "Choose an IELTS or daily English plan. Simulate any plan to preview the experience." },
      { property: "og:title", content: "Cadence — Plans & Pricing" },
      { property: "og:description", content: "Preview any Cadence plan in one click." },
    ],
  }),
  component: PricingPage,
});

function PricingPage() {
  const { lang } = useI18n();
  const tx = (en: string, zh: string) => (lang === "zh" ? zh : en);
  const [track, setTrack] = useState<PlanTrack>("ielts");
  const { planId, plan, setPlan } = usePlan();

  const shown = PLANS.filter((p) => p.track === track && p.tier !== "single");
  const singles = PLANS.filter((p) => p.track === "ielts" && p.tier === "single");

  return (
    <AppShell crumb={tx("Plans", "套餐")}>
      {/* Hero */}
      <section className="relative overflow-hidden rounded-3xl bg-foreground text-background p-10">
        <div className="absolute inset-0 opacity-[0.06] grid-bg pointer-events-none" />
        <div className="absolute -right-24 -top-24 w-96 h-96 rounded-full bg-brand/30 blur-3xl" />
        <div className="absolute -left-24 -bottom-24 w-96 h-96 rounded-full bg-brand/20 blur-3xl" />
        <div className="relative max-w-3xl">
          <div className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-wider text-background/60">
            <Sparkles className="w-3 h-3" /> {tx("Plans & preview", "套餐与预览")}
          </div>
          <h1 className="mt-3 font-display text-5xl md:text-6xl leading-[0.95]">
            {tx("Pick your ", "选择你的 ")}
            <span className="text-brand italic">{tx("cadence", "节奏")}</span>
            .
          </h1>
          <p className="mt-4 text-sm md:text-base text-background/70 leading-relaxed max-w-xl">
            {tx(
              "Simulate any plan to preview quotas, unlocks and the Pro-only Progress Tracker — no real payment required.",
              "点击「模拟此套餐」即可预览各套餐下的配额、解锁范围与 Pro 专属追踪页，无需实际付款。",
            )}
          </p>
          <div className="mt-6 inline-flex items-center gap-2 text-xs text-background/70">
            <span className="w-1.5 h-1.5 rounded-full bg-brand animate-pulse" />
            {tx("Currently simulating:", "当前模拟：")}
            <span className="text-background font-medium">{lang === "zh" ? plan.nameZh : plan.name}</span>
          </div>
        </div>
      </section>

      {/* Track tabs */}
      <div className="flex items-center justify-center">
        <div className="inline-flex p-1 rounded-full border border-border bg-card">
          {(["ielts", "daily"] as const).map((k) => (
            <button
              key={k}
              onClick={() => setTrack(k)}
              className={`h-9 px-5 rounded-full text-sm font-medium transition ${
                track === k ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {k === "ielts" ? tx("IELTS Prep", "雅思备考") : tx("Daily English", "日常口语")}
            </button>
          ))}
        </div>
      </div>

      {/* Plan cards */}
      <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {shown.map((p) => (
          <PlanCard
            key={p.id}
            plan={p}
            current={planId === p.id}
            onSelect={() => setPlan(p.id)}
          />
        ))}
      </section>

      {/* Single-shot IELTS */}
      {track === "ielts" && (
        <section className="rounded-2xl border border-border bg-card p-6">
          <div className="flex items-start justify-between mb-5 gap-4 flex-wrap">
            <div>
              <div className="text-[11px] uppercase tracking-wider text-muted-foreground">
                {tx("One-time unlocks", "单次解锁")}
              </div>
              <h2 className="mt-1 font-display text-2xl">
                {tx("Just this session", "只解锁这一次")}
              </h2>
              <p className="text-sm text-muted-foreground mt-1">
                {tx(
                  "Try Pro-quality feedback without committing to a subscription.",
                  "不订阅也能体验 Pro 级评分反馈。",
                )}
              </p>
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {singles.map((p) => (
              <PlanCard key={p.id} plan={p} current={planId === p.id} onSelect={() => setPlan(p.id)} compact />
            ))}
          </div>
        </section>
      )}

      {/* Top-ups */}
      <section className="rounded-2xl border border-dashed border-border p-6 bg-muted/30">
        <div className="flex items-start justify-between mb-4 gap-4 flex-wrap">
          <div>
            <div className="text-[11px] uppercase tracking-wider text-muted-foreground">
              {tx("Chat top-ups", "陪练加油包")}
            </div>
            <h2 className="mt-1 font-display text-2xl">
              {tx("Extra minutes, any time", "随时补充陪练时间")}
            </h2>
          </div>
        </div>
        <div className="grid gap-3 sm:grid-cols-3">
          {[
            { min: 10, price: "¥9.9" },
            { min: 30, price: "¥24.9" },
            { min: 60, price: "¥44.9" },
          ].map((t) => (
            <div key={t.min} className="rounded-xl bg-background border border-border p-4 flex items-center justify-between">
              <div>
                <div className="font-display text-xl">{t.min} min</div>
                <div className="text-xs text-muted-foreground">{tx("one-time", "一次性")}</div>
              </div>
              <div className="text-right">
                <div className="font-display text-lg">{t.price}</div>
                <button className="mt-1 text-[11px] text-muted-foreground hover:text-foreground">
                  {tx("Add", "购买")} →
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Comparison */}
      <section className="rounded-2xl border border-border bg-card overflow-hidden">
        <div className="px-6 py-5 border-b border-border">
          <h2 className="font-display text-2xl">{tx("What's inside each plan", "各套餐包含内容")}</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted/40 text-xs uppercase tracking-wider text-muted-foreground">
              <tr>
                <th className="text-left px-6 py-3 font-medium">{tx("Feature", "功能")}</th>
                <th className="px-3 py-3 font-medium">Free</th>
                <th className="px-3 py-3 font-medium">{tx("Weekly", "周卡")}</th>
                <th className="px-3 py-3 font-medium">{tx("Sprint 7", "7 天冲刺")}</th>
                <th className="px-3 py-3 font-medium">
                  <span className="inline-flex items-center gap-1"><Crown className="w-3 h-3 text-brand" /> Pro</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {[
                { label: tx("Full mocks", "完整模考"), vals: ["1×", "1×/wk", "5×/7d", "4×/mo"] },
                { label: tx("Topic drills", "专题训练"), vals: ["2×", "3×/wk", "10×/7d", "15×/mo"] },
                { label: tx("Targeted analysis", "专项分析"), vals: ["—", "2×/wk", "10×/7d", "10×/mo"] },
                { label: tx("AI chat", "陪练"), vals: ["3 min", "5 min", "15 min", "10 min/wk"] },
                { label: tx("Full words + sentences", "完整词与错句"), vals: ["—", "✓", "✓", "✓"] },
                { label: tx("Progress Tracker (Pro-only)", "复盘追踪页（Pro 专属）"), vals: ["—", "—", "—", "✓"] },
              ].map((row) => (
                <tr key={row.label}>
                  <td className="px-6 py-3 text-muted-foreground">{row.label}</td>
                  {row.vals.map((v, i) => (
                    <td key={i} className="px-3 py-3 text-center tabular-nums">
                      {v === "✓" ? <Check className="w-4 h-4 text-brand mx-auto" /> : v}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <div className="text-center text-xs text-muted-foreground pt-2">
        {tx("Two independent tracks. IELTS quotas and Daily chat minutes never overlap.", "两条独立轨道，雅思与日常口语的配额不互通。")}
      </div>
    </AppShell>
  );
}

function PlanCard({
  plan,
  current,
  onSelect,
  compact,
}: {
  plan: PlanDef;
  current: boolean;
  onSelect: () => void;
  compact?: boolean;
}) {
  const { lang } = useI18n();
  const tx = (en: string, zh: string) => (lang === "zh" ? zh : en);
  const feats = lang === "zh" ? plan.featuresZh : plan.features;
  const isDark = plan.highlight;
  const isPro = plan.tier === "pro";

  return (
    <div
      className={`relative rounded-2xl p-6 flex flex-col gap-4 transition ${
        isDark
          ? "bg-foreground text-background border border-foreground shadow-2xl"
          : "bg-card border border-border hover:border-foreground/30"
      } ${current ? "ring-2 ring-brand ring-offset-2 ring-offset-background" : ""}`}
    >
      {isDark && (
        <div className="absolute -right-16 -top-16 w-56 h-56 rounded-full bg-brand/25 blur-3xl pointer-events-none" />
      )}
      {plan.highlight && (
        <span className="absolute -top-2.5 left-6 text-[10px] uppercase tracking-wider bg-brand text-brand-foreground px-2 py-0.5 rounded-full inline-flex items-center gap-1">
          <Star className="w-2.5 h-2.5" /> {tx("Most picked", "最多人选")}
        </span>
      )}
      {current && (
        <span className="absolute top-3 right-3 text-[10px] uppercase tracking-wider bg-brand text-brand-foreground px-2 py-0.5 rounded-full">
          {tx("Simulating", "模拟中")}
        </span>
      )}

      <div className="relative">
        <div className="flex items-center gap-1.5">
          {isPro && <Crown className={`w-3.5 h-3.5 ${isDark ? "text-brand" : "text-foreground"}`} />}
          <span className={`text-[11px] uppercase tracking-wider ${isDark ? "text-background/60" : "text-muted-foreground"}`}>
            {tx(plan.name, plan.nameZh)}
          </span>
        </div>
        <div className="mt-3 flex items-baseline gap-1.5">
          <span className={`font-display ${compact ? "text-3xl" : "text-5xl"}`}>{plan.price}</span>
          <span className={`text-xs ${isDark ? "text-background/60" : "text-muted-foreground"}`}>
            {tx(plan.cadence, plan.cadenceZh)}
          </span>
        </div>
        <p className={`mt-2 text-xs leading-relaxed ${isDark ? "text-background/70" : "text-muted-foreground"}`}>
          {tx(plan.tagline, plan.taglineZh)}
        </p>
      </div>

      <ul className={`relative space-y-2 text-sm ${isDark ? "text-background/85" : "text-foreground/85"}`}>
        {feats.map((f) => (
          <li key={f} className="flex items-start gap-2">
            <Check className={`w-3.5 h-3.5 mt-0.5 shrink-0 ${isDark ? "text-brand" : "text-brand"}`} />
            <span className="leading-snug">{f}</span>
          </li>
        ))}
      </ul>

      <button
        onClick={onSelect}
        disabled={current}
        className={`relative mt-auto h-10 rounded-lg text-sm font-medium inline-flex items-center justify-center gap-1.5 transition ${
          current
            ? "bg-brand text-brand-foreground cursor-default"
            : isDark
            ? "bg-brand text-brand-foreground hover:brightness-105"
            : "bg-foreground text-background hover:opacity-90"
        }`}
      >
        {current ? (
          <><Check className="w-4 h-4" /> {tx("Currently active", "当前使用中")}</>
        ) : (
          <><Zap className="w-3.5 h-3.5" /> {tx("Simulate this plan", "模拟此套餐")}</>
        )}
      </button>
    </div>
  );
}
