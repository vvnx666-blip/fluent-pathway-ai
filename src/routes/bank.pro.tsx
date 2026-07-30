import { createFileRoute, Link } from "@tanstack/react-router";
import { Check, Crown, Sparkles } from "lucide-react";
import { BankSurface, Pill, useTx } from "@/components/question-bank-ui";
import { usePlan } from "@/lib/plan";

export const Route = createFileRoute("/bank/pro")({
  head: () => ({
    meta: [
      { title: "Unlock the Complete IELTS Speaking Database · Cadence" },
      {
        name: "description",
        content:
          "Go Pro for 2,800+ IELTS speaking questions, unlimited AI examiner practice, feedback reports and weekly question updates.",
      },
      { property: "og:title", content: "Unlock Your Complete IELTS Speaking Database" },
      {
        property: "og:description",
        content: "Pro membership: every question, unlimited AI practice, weekly updates.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: BankPaywall,
});

interface Tier {
  id: "free" | "monthly" | "yearly";
  name: string;
  price: string;
  cadence: string;
  cadenceZh: string;
  badge?: [string, string];
  features: [string, string][];
  extra?: [string, string][];
}

const TIERS: Tier[] = [
  {
    id: "free",
    name: "FREE",
    price: "¥0",
    cadence: "forever",
    cadenceZh: "永久",
    features: [
      ["5 questions per topic", "每个 Topic 5 题"],
      ["1 mock test per week", "每周 1 次模拟考试"],
      ["Basic AI scoring", "基础 AI 评分"],
    ],
  },
  {
    id: "monthly",
    name: "PRO MONTHLY",
    price: "¥59",
    cadence: "/ month",
    cadenceZh: "/ 月",
    badge: ["Recommended", "推荐"],
    features: [
      ["2800+ IELTS questions", "2800+ 雅思真题"],
      ["Every topic unlocked", "全部 Topic 解锁"],
      ["Unlimited focused drills", "无限专项训练"],
      ["AI Examiner practice", "AI 考官练习"],
      ["AI feedback report", "AI 反馈报告"],
      ["Mistake notebook", "错题本"],
      ["Learning history", "练习记录"],
      ["Weekly updates", "每周题库更新"],
    ],
  },
  {
    id: "yearly",
    name: "PRO YEARLY",
    price: "¥399",
    cadence: "/ year",
    cadenceZh: "/ 年",
    badge: ["Best Value", "最超值"],
    features: [["Everything in Pro Monthly", "包含 Pro 月卡全部权益"]],
    extra: [
      ["Priority access to new question packs", "优先获取最新题库"],
      ["Advanced prediction topics", "高级预测专题"],
      ["AI-built study plan", "AI 学习计划"],
    ],
  },
];

function BankPaywall() {
  const tx = useTx();
  const { plan, setPlan } = usePlan();

  return (
    <BankSurface>
      <section className="text-center max-w-2xl mx-auto qb-rise">
        <Pill tone="gold">
          <Crown className="w-3 h-3" /> {tx("Pro membership", "Pro 会员")}
        </Pill>
        <h1 className="mt-5 font-display text-4xl sm:text-6xl leading-[1.04] tracking-tight">
          {tx("Unlock Your Complete IELTS Speaking Database", "解锁完整雅思口语题库")}
        </h1>
        <p className="mt-5 text-sm sm:text-base text-muted-foreground leading-relaxed">
          {tx(
            "Every real question, every topic, unlimited AI examiner practice — and a weekly refresh from the latest exams.",
            "全部真题、全部话题、无限 AI 考官练习，并每周同步最新考情。",
          )}
        </p>
      </section>

      <section className="grid gap-5 lg:grid-cols-3 items-start">
        {TIERS.map((tier, i) => {
          const gold = tier.id === "yearly";
          const recommended = tier.id === "monthly";
          const current =
            (tier.id === "free" && plan.tier === "free") ||
            (tier.id === "monthly" && plan.id === "pro_month") ||
            (tier.id === "yearly" && plan.id === "pro_year");
          return (
            <div
              key={tier.id}
              style={{ animationDelay: `${i * 80}ms` }}
              className={`qb-rise relative rounded-2xl p-7 flex flex-col transition-all duration-300 hover:-translate-y-1 ${
                gold
                  ? "border-2 border-gold/60 bg-card shadow-[0_30px_80px_-40px_var(--color-gold)]"
                  : recommended
                  ? "border border-brand/50 bg-card shadow-[0_30px_80px_-45px_var(--color-brand)]"
                  : "border border-border bg-card"
              }`}
            >
              {tier.badge && (
                <span
                  className={`absolute -top-3 left-7 text-[10px] font-semibold uppercase tracking-[0.16em] px-3 py-1 rounded-full ${
                    gold ? "bg-gold text-[#1b1405]" : "bg-brand text-brand-foreground"
                  }`}
                >
                  {tx(tier.badge[0], tier.badge[1])}
                </span>
              )}
              <div className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                {tier.name}
              </div>
              <div className="mt-3 flex items-baseline gap-1.5">
                <span className="font-display text-5xl">{tier.price}</span>
                <span className="text-xs text-muted-foreground">
                  {tx(tier.cadence, tier.cadenceZh)}
                </span>
              </div>

              <ul className="mt-6 space-y-2.5 text-sm">
                {tier.features.map(([en, zh]) => (
                  <li key={en} className="flex items-start gap-2 text-muted-foreground">
                    <Check className={`w-3.5 h-3.5 mt-1 shrink-0 ${gold ? "text-gold" : "text-brand"}`} />
                    <span>{tx(en, zh)}</span>
                  </li>
                ))}
              </ul>

              {tier.extra && (
                <>
                  <div className="mt-5 text-[10px] uppercase tracking-wider text-gold">
                    {tx("Plus", "额外")}
                  </div>
                  <ul className="mt-2.5 space-y-2.5 text-sm">
                    {tier.extra.map(([en, zh]) => (
                      <li key={en} className="flex items-start gap-2 text-muted-foreground">
                        <Sparkles className="w-3.5 h-3.5 mt-1 shrink-0 text-gold" />
                        <span>{tx(en, zh)}</span>
                      </li>
                    ))}
                  </ul>
                </>
              )}

              <button
                disabled={current}
                onClick={() =>
                  setPlan(tier.id === "free" ? "free" : tier.id === "monthly" ? "pro_month" : "pro_year")
                }
                className={`mt-8 h-11 rounded-xl text-sm font-semibold transition disabled:opacity-50 disabled:cursor-default ${
                  gold
                    ? "bg-gold text-[#1b1405] hover:brightness-110"
                    : recommended
                    ? "bg-brand text-brand-foreground hover:brightness-110"
                    : "border border-border hover:border-foreground/40"
                }`}
              >
                {current
                  ? tx("Current plan", "当前套餐")
                  : tier.id === "free"
                  ? tx("Stay on Free", "保持免费版")
                  : tx("Start 7-Day Free Trial", "开启 7 天免费试用")}
              </button>
              <p className="mt-3 text-[11px] text-center text-muted-foreground">
                {tier.id === "free"
                  ? tx("No card required", "无需绑定支付方式")
                  : tx("Cancel anytime during the trial", "试用期内可随时取消")}
              </p>
            </div>
          );
        })}
      </section>

      <section className="text-center">
        <Link to="/pricing" className="text-xs text-muted-foreground hover:text-foreground transition">
          {tx("Compare all Cadence plans", "查看全部套餐对比")} →
        </Link>
      </section>
    </BankSurface>
  );
}
