import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BookOpen,
  Bot,
  Flame,
  Target,
  TrendingUp,
  Zap,
} from "lucide-react";
import {
  BankSurface,
  Pill,
  SkeletonGrid,
  useIsPro,
  useSkeleton,
  useTx,
} from "@/components/question-bank-ui";
import { BANK_TOTALS, PARTS, WEAK_AREAS } from "@/lib/question-bank";

export const Route = createFileRoute("/bank/")({
  head: () => ({
    meta: [
      { title: "IELTS Speaking Question Bank · Cadence" },
      {
        name: "description",
        content:
          "2,800+ real IELTS speaking questions organised by part, topic, frequency and difficulty — with AI examiner practice.",
      },
      { property: "og:title", content: "IELTS Speaking Question Bank — Cadence" },
      {
        property: "og:description",
        content: "Master IELTS speaking with real exam questions, frequency data and AI practice.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: BankHome,
});

function BankHome() {
  const tx = useTx();
  const loading = useSkeleton();

  return (
    <BankSurface>
      {/* Hero */}
      <section className="qb-rise">
        <Pill tone="brand">
          <Zap className="w-3 h-3" /> {tx("Weekly updated", "每周更新")}
        </Pill>
        <h1 className="mt-5 font-display text-[2.75rem] sm:text-6xl leading-[1.02] tracking-tight max-w-3xl">
          {tx("Master IELTS Speaking with Real Exam Questions", "用真实考题攻克雅思口语")}
        </h1>
        <p className="mt-5 max-w-xl text-sm sm:text-base text-muted-foreground leading-relaxed">
          {tx(
            "Practice with thousands of IELTS speaking questions, organized by topic, frequency and difficulty.",
            "数千道雅思口语真题，按话题、出现频率与难度整理，配合 AI 考官即时练习。",
          )}
        </p>
        <div className="mt-7 flex flex-wrap gap-3">
          <Link
            to="/bank/$part"
            params={{ part: "part1" }}
            className="inline-flex items-center gap-2 h-11 px-5 rounded-xl bg-brand text-brand-foreground text-sm font-semibold hover:brightness-110 transition"
          >
            {tx("Explore the bank", "开始浏览题库")} <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            to="/bank/pro"
            className="inline-flex items-center gap-2 h-11 px-5 rounded-xl border border-border text-sm font-medium hover:border-gold/50 hover:text-gold transition"
          >
            {tx("Unlock full bank", "解锁完整题库")}
          </Link>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          <StatCard
            icon={BookOpen}
            eyebrow={tx("Question Database", "题库总量")}
            value="2800+"
            sub={tx("Real Questions", "真实考题")}
          />
          <StatCard
            icon={Flame}
            eyebrow={tx("High Frequency Topics", "高频话题")}
            value="120+"
            sub={tx("Topics", "话题分类")}
            tone="gold"
          />
          <StatCard
            icon={Bot}
            eyebrow={tx("AI Practice", "AI 专项训练")}
            value={tx("Unlimited", "无限次")}
            sub={tx("with Pro", "Pro 会员")}
          />
        </div>
      </section>

      {/* Parts */}
      <section className="space-y-5">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="font-display text-3xl tracking-tight">
              {tx("Three parts. One system.", "三个 Part，一套体系。")}
            </h2>
            <p className="mt-1.5 text-sm text-muted-foreground">
              {tx("Pick a part to browse its topic library.", "选择一个 Part，进入话题库。")}
            </p>
          </div>
        </div>

        {loading ? (
          <SkeletonGrid rows={3} className="md:grid-cols-3" />
        ) : (
          <div className="grid gap-4 md:grid-cols-3">
            {PARTS.map((p, i) => (
              <Link
                key={p.id}
                to="/bank/$part"
                params={{ part: p.id }}
                style={{ animationDelay: `${i * 70}ms` }}
                className="qb-card qb-rise group relative overflow-hidden p-6 flex flex-col"
              >
                <div className="absolute -right-14 -top-14 w-40 h-40 rounded-full bg-brand/10 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative flex flex-col h-full">
                  <span className="text-[10px] uppercase tracking-[0.2em] text-brand">{p.label}</span>
                  <h3 className="mt-2 font-display text-2xl leading-tight">
                    {tx(p.name, p.nameZh)}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                    {tx(p.tagline, p.taglineZh)}
                  </p>
                  <div className="mt-5 grid grid-cols-2 gap-3 text-xs">
                    <MiniStat label={tx("Questions", "题目")} value={`${p.questionCount}`} />
                    <MiniStat label={tx("Topics", "话题")} value={`${p.topicCount}`} />
                  </div>
                  <div className="mt-5 pt-4 border-t border-border flex items-center justify-between text-xs text-muted-foreground">
                    <span>{p.duration}</span>
                    <span className="inline-flex items-center gap-1 text-foreground font-medium">
                      {tx(`Explore ${p.label}`, `进入 ${p.label}`)}
                      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* Progress dashboard */}
      <ProgressDashboard />
    </BankSurface>
  );
}

function StatCard({
  icon: Icon,
  eyebrow,
  value,
  sub,
  tone = "brand",
}: {
  icon: React.ComponentType<{ className?: string }>;
  eyebrow: string;
  value: string;
  sub: string;
  tone?: "brand" | "gold";
}) {
  return (
    <div className="qb-card p-5">
      <div className="flex items-center gap-2 text-[11px] uppercase tracking-wider text-muted-foreground">
        <Icon className={`w-3.5 h-3.5 ${tone === "gold" ? "text-gold" : "text-brand"}`} />
        {eyebrow}
      </div>
      <div className="mt-3 font-display text-4xl tabular-nums">{value}</div>
      <div className="mt-1 text-xs text-muted-foreground">{sub}</div>
    </div>
  );
}

function MiniStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg bg-muted/60 border border-border/60 px-3 py-2">
      <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{label}</div>
      <div className="text-sm font-medium tabular-nums">{value}</div>
    </div>
  );
}

function ProgressDashboard() {
  const tx = useTx();
  const isPro = useIsPro();
  const qPct = Math.round((BANK_TOTALS.completed / BANK_TOTALS.questions) * 100);
  const tPct = Math.round((BANK_TOTALS.topicsMastered / BANK_TOTALS.topics) * 100);

  return (
    <section className="space-y-5">
      <div>
        <h2 className="font-display text-3xl tracking-tight">
          {tx("Your progress", "学习状态")}
        </h2>
        <p className="mt-1.5 text-sm text-muted-foreground">
          {tx("Where you stand across the full bank.", "你在整个题库中的进度。")}
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="qb-card p-6 lg:col-span-2 space-y-6">
          <ProgressRow
            icon={Target}
            label={tx("Questions completed", "已完成题目")}
            value={`${BANK_TOTALS.completed} / ${BANK_TOTALS.questions}`}
            pct={qPct}
          />
          <ProgressRow
            icon={TrendingUp}
            label={tx("Topics mastered", "已掌握话题")}
            value={`${BANK_TOTALS.topicsMastered} / ${BANK_TOTALS.topics}`}
            pct={tPct}
            tone="gold"
          />
          <div>
            <div className="text-[11px] uppercase tracking-wider text-muted-foreground">
              {tx("Weak areas", "薄弱环节")}
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {WEAK_AREAS.map((w) => (
                <Link
                  key={w.topicId}
                  to="/bank/$part/$topic"
                  params={{ part: w.part, topic: w.topicId }}
                  className="inline-flex items-center gap-2 rounded-full border border-destructive/30 bg-destructive/10 px-3 py-1 text-xs hover:border-destructive/60 transition"
                >
                  {w.name}
                  <span className="tabular-nums text-muted-foreground">{w.accuracy}%</span>
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="qb-card p-6 flex flex-col">
          <div className="text-[11px] uppercase tracking-wider text-muted-foreground">
            {tx("Recommended next", "推荐练习")}
          </div>
          <h3 className="mt-2 font-display text-2xl leading-tight">
            {tx("Environment · Part 3", "环境 · Part 3")}
          </h3>
          <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
            {tx(
              "Abstract discussion is your lowest band area. 12 high-frequency questions are waiting.",
              "抽象讨论是你目前最弱的一项，还有 12 道高频题待练。",
            )}
          </p>
          <Link
            to="/bank/$part/$topic"
            params={{ part: "part3", topic: "environment" }}
            className="mt-auto pt-5 inline-flex items-center justify-center gap-2 h-10 rounded-xl bg-brand text-brand-foreground text-sm font-semibold hover:brightness-110 transition"
          >
            {tx("Practice now", "立即练习")} <ArrowRight className="w-4 h-4" />
          </Link>
          {!isPro && (
            <p className="mt-3 text-[11px] text-muted-foreground text-center">
              {tx("Free plan: 5 questions per topic", "免费版：每个话题 5 题")}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}

function ProgressRow({
  icon: Icon,
  label,
  value,
  pct,
  tone = "brand",
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  pct: number;
  tone?: "brand" | "gold";
}) {
  return (
    <div>
      <div className="flex items-center justify-between text-sm">
        <span className="inline-flex items-center gap-2 text-muted-foreground">
          <Icon className={`w-4 h-4 ${tone === "gold" ? "text-gold" : "text-brand"}`} />
          {label}
        </span>
        <span className="tabular-nums font-medium">{value}</span>
      </div>
      <div className="mt-2 h-1.5 rounded-full bg-muted overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-700 ${tone === "gold" ? "bg-gold" : "bg-brand"}`}
          style={{ width: `${Math.max(pct, 2)}%` }}
        />
      </div>
    </div>
  );
}
