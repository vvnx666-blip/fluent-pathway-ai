import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  Mic,
  Layers,
  Target,
  ArrowUpRight,
  ArrowRight,
  NotebookPen,
  GraduationCap,
  RotateCcw,
  TrendingUp,
  Pencil,
  Minus,
  Plus,
  Check,
  type LucideIcon,
} from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dashboard · Cadence IELTS Speaking Coach" },
      {
        name: "description",
        content:
          "Your IELTS speaking dashboard: target band, daily training plan, and progress at a glance.",
      },
      { property: "og:title", content: "Cadence — IELTS Speaking AI Coach" },
      {
        property: "og:description",
        content:
          "Track your target band, follow a daily plan, and practice speaking with an AI examiner.",
      },
    ],
  }),
  component: Dashboard,
});

/* --------------------------- Hero / Target ----------------------------- */

function HeroCard() {
  const { t } = useI18n();
  const current = 6.5;
  const [target, setTarget] = useState(8.0);
  const [editing, setEditing] = useState(false);
  const progress = Math.max(0, Math.min(100, ((current - 5) / (target - 5)) * 100));

  const bump = (delta: number) =>
    setTarget((v) => Math.max(5, Math.min(9, Math.round((v + delta) * 2) / 2)));

  return (
    <section className="relative overflow-hidden rounded-2xl bg-foreground text-background p-8">
      <div className="absolute inset-0 opacity-[0.06] grid-bg pointer-events-none" />
      <div className="absolute -right-16 -top-16 w-72 h-72 rounded-full bg-brand/25 blur-3xl" />

      <div className="relative flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
        <div className="max-w-xl">
          <div className="flex items-center gap-2">
            <div className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-wider text-background/60">
              <Target className="w-3 h-3" /> {t("hero.targetBand")}
            </div>
            <button
              onClick={() => setEditing((v) => !v)}
              className="inline-flex items-center gap-1 text-[10px] uppercase tracking-wider text-background/60 hover:text-background border border-background/15 rounded-full h-5 px-2"
            >
              {editing ? <Check className="w-3 h-3" /> : <Pencil className="w-3 h-3" />}
              {editing ? t("hero.saveTarget") : t("hero.editTarget")}
            </button>
          </div>

          <div className="mt-3 flex items-end gap-3">
            <h1 className="font-display text-6xl md:text-7xl leading-[0.95]">
              Band <span className="text-brand tabular-nums">{target.toFixed(1)}</span>
              <span className="text-background/40">/ 9.0</span>
            </h1>
            {editing && (
              <div className="flex items-center gap-1 mb-3">
                <button
                  onClick={() => bump(-0.5)}
                  className="w-8 h-8 rounded-md border border-background/20 grid place-items-center hover:bg-background/10"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => bump(0.5)}
                  className="w-8 h-8 rounded-md border border-background/20 grid place-items-center hover:bg-background/10"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>

          <p className="mt-4 text-sm text-background/70 leading-relaxed">
            {t("hero.currentBand")}{" "}
            <span className="text-background font-medium">{current}</span> · {t("hero.copy")}
          </p>

          <div className="mt-6 flex flex-wrap gap-2">
            <button className="inline-flex items-center gap-2 h-10 px-4 rounded-lg bg-brand text-brand-foreground text-sm font-medium hover:brightness-105 transition">
              {t("hero.startPlan")} <ArrowRight className="w-4 h-4" />
            </button>
            <button className="inline-flex items-center gap-2 h-10 px-4 rounded-lg border border-background/15 text-sm font-medium hover:bg-background/5 transition">
              <Mic className="w-4 h-4" /> {t("hero.quickPractice")}
            </button>
          </div>
        </div>

        <div className="lg:w-80 shrink-0 space-y-4">
          <div>
            <div className="flex items-center justify-between text-xs text-background/60 mb-2">
              <span>{t("hero.progressToTarget")}</span>
              <span className="tabular-nums text-background">{Math.round(progress)}%</span>
            </div>
            <div className="h-1.5 rounded-full bg-background/10 overflow-hidden">
              <div className="h-full bg-brand rounded-full" style={{ width: `${progress}%` }} />
            </div>
            <div className="mt-1 flex justify-between text-[10px] text-background/40 tabular-nums">
              <span>5.0</span>
              <span>{current.toFixed(1)}</span>
              <span>{target.toFixed(1)}</span>
              <span>9.0</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <MiniStat label={t("hero.fluency")} value="6.5" trend="+0.5" />
            <MiniStat label={t("hero.lexical")} value="7.0" trend="+0.5" />
            <MiniStat label={t("hero.grammar")} value="6.0" trend="+0.0" flat />
            <MiniStat label={t("hero.pron")} value="6.5" trend="+0.5" />
          </div>
        </div>
      </div>
    </section>
  );
}

function MiniStat({
  label,
  value,
  trend,
  flat,
}: {
  label: string;
  value: string;
  trend: string;
  flat?: boolean;
}) {
  return (
    <div className="rounded-lg border border-background/10 bg-background/[0.03] p-3">
      <div className="text-[10px] uppercase tracking-wider text-background/50">{label}</div>
      <div className="mt-1 flex items-baseline justify-between">
        <span className="font-display text-2xl">{value}</span>
        <span className={`text-[10px] tabular-nums ${flat ? "text-background/40" : "text-brand"}`}>
          {trend}
        </span>
      </div>
    </div>
  );
}

/* --------------------------- Quick Actions ----------------------------- */

function QuickActions() {
  const { t } = useI18n();
  const items: {
    icon: LucideIcon;
    title: string;
    desc: string;
    href: string;
    accent?: boolean;
  }[] = [
    {
      icon: Mic,
      title: t("plan.quick.title"),
      desc: t("plan.quick.desc"),
      href: "/practice",
      accent: true,
    },
    {
      icon: Layers,
      title: t("plan.vocab.title"),
      desc: t("plan.vocab.desc"),
      href: "/review",
    },
    {
      icon: NotebookPen,
      title: t("plan.mistakes.title"),
      desc: t("plan.mistakes.desc"),
      href: "/review",
    },
    {
      icon: GraduationCap,
      title: t("plan.mock.title"),
      desc: t("plan.mock.desc"),
      href: "/mock",
    },
  ];

  return (
    <section className="rounded-2xl border border-border bg-card p-6">
      <div className="flex items-start justify-between mb-5">
        <div>
          <div className="text-[11px] uppercase tracking-wider text-muted-foreground">
            {t("plan.sub")}
          </div>
          <h2 className="mt-1.5 font-display text-2xl">{t("plan.title")}</h2>
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {items.map((it) => (
          <a
            key={it.title}
            href={it.href}
            className={`group flex items-center gap-4 p-4 rounded-xl border transition ${
              it.accent
                ? "bg-brand-soft border-brand/30 hover:border-brand/60"
                : "border-border hover:border-foreground/30 bg-background/40"
            }`}
          >
            <div
              className={`w-10 h-10 rounded-lg grid place-items-center shrink-0 ${
                it.accent ? "bg-foreground text-background" : "bg-muted text-foreground"
              }`}
            >
              <it.icon className="w-4 h-4" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-sm font-medium truncate">{it.title}</div>
              <div className="text-xs text-muted-foreground mt-0.5 truncate">{it.desc}</div>
            </div>
            <span className="inline-flex items-center gap-1 text-xs font-medium">
              {t("plan.cta")}
              <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}

/* ----------------------------- Progress -------------------------------- */

const weekData = [3, 5, 2, 6, 4, 7, 5];
const days = ["M", "T", "W", "T", "F", "S", "S"];

function ProgressCard() {
  const { t } = useI18n();
  const max = Math.max(...weekData);
  return (
    <section className="rounded-2xl border border-border bg-card p-6">
      <div className="flex items-start justify-between mb-5">
        <div>
          <div className="flex items-center gap-2 text-[11px] uppercase tracking-wider text-muted-foreground">
            <TrendingUp className="w-3 h-3" /> {t("progress.thisWeek")}
          </div>
          <h2 className="mt-1.5 font-display text-2xl">{t("progress.title")}</h2>
        </div>
        <span className="text-xs text-brand font-medium bg-brand-soft/60 px-2 py-1 rounded-md">
          +0.3 band
        </span>
      </div>

      <div className="flex items-end gap-2 h-32">
        {weekData.map((v, i) => (
          <div key={i} className="flex-1 flex flex-col items-center gap-2">
            <div className="w-full flex-1 flex items-end">
              <div
                className={`w-full rounded-md ${
                  i === weekData.length - 1 ? "bg-brand" : "bg-foreground/85"
                }`}
                style={{ height: `${(v / max) * 100}%` }}
              />
            </div>
            <span
              className={`text-[10px] ${
                i === weekData.length - 1 ? "text-foreground font-semibold" : "text-muted-foreground"
              }`}
            >
              {days[i]}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-5 grid grid-cols-3 gap-3">
        <Metric label={t("progress.minutes")} value="182" sub={t("progress.minutesSub")} />
        <Metric label={t("progress.sessions")} value="9" sub={t("progress.sessionsSub")} />
        <Metric label={t("progress.streak")} value="12" sub={t("progress.days")} />
      </div>
    </section>
  );
}

function Metric({ label, value, sub }: { label: string; value: string; sub: string }) {
  return (
    <div>
      <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{label}</div>
      <div className="mt-1 font-display text-2xl tabular-nums">{value}</div>
      <div className="text-[11px] text-muted-foreground">{sub}</div>
    </div>
  );
}

/* -------------------------- Review snapshot ---------------------------- */

const mistakes = [
  { wrong: "I very like it", right: "I like it a lot", tag: "Grammar" },
  { wrong: "In nowadays society", right: "In today's society", tag: "Collocation" },
  { wrong: "More better", right: "Much better", tag: "Grammar" },
];

const vocab = [
  { word: "quintessential", pos: "adj", gloss: "representing the most perfect example" },
  { word: "to grapple with", pos: "phr", gloss: "to struggle to deal with" },
  { word: "nuanced", pos: "adj", gloss: "showing subtle differences" },
];

function ReviewSnapshot() {
  const { t } = useI18n();
  return (
    <section className="grid gap-4 lg:grid-cols-2">
      <div className="rounded-2xl border border-border bg-card p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="text-[11px] uppercase tracking-wider text-muted-foreground">
              {t("review.mistakesTitle")}
            </div>
            <h3 className="mt-1 font-display text-xl">{t("review.mistakesSub")}</h3>
          </div>
          <a href="/review" className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1">
            {t("review.all")} 42 <ArrowRight className="w-3 h-3" />
          </a>
        </div>
        <ul className="space-y-3">
          {mistakes.map((m, i) => (
            <li key={i} className="flex items-start gap-3 py-2 border-b border-border last:border-0">
              <div className="flex-1 min-w-0 text-sm">
                <span className="line-through text-muted-foreground">{m.wrong}</span>
                <ArrowRight className="inline w-3 h-3 mx-1 text-muted-foreground" />
                <span className="font-medium">{m.right}</span>
              </div>
              <span className="text-[10px] uppercase tracking-wider text-muted-foreground px-1.5 py-0.5 rounded border border-border shrink-0">
                {m.tag}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div className="rounded-2xl border border-border bg-card p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="text-[11px] uppercase tracking-wider text-muted-foreground">
              {t("review.vocabTitle")}
            </div>
            <h3 className="mt-1 font-display text-xl">{t("review.vocabSub")}</h3>
          </div>
          <a href="/review" className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1">
            {t("review.flashcards")} <ArrowRight className="w-3 h-3" />
          </a>
        </div>
        <ul className="space-y-3">
          {vocab.map((v, i) => (
            <li key={i} className="flex items-baseline gap-3 py-2 border-b border-border last:border-0">
              <span className="font-medium">{v.word}</span>
              <span className="text-[10px] italic text-muted-foreground">{v.pos}</span>
              <span className="text-sm text-muted-foreground truncate">{v.gloss}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ------------------------------- Page ---------------------------------- */

function Dashboard() {
  const { t } = useI18n();
  return (
    <AppShell crumb={t("home.crumb")}>
      <div className="flex items-baseline justify-between">
        <div>
          <p className="text-sm text-muted-foreground">{t("home.greeting")}</p>
          <h1 className="font-display text-4xl tracking-tight">
            {t("home.headlineA")} <span className="text-brand">{t("home.headlineB")}</span>.
          </h1>
        </div>
      </div>

      <HeroCard />

      <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <QuickActions />
        <ProgressCard />
      </div>

      <ReviewSnapshot />
    </AppShell>
  );
}
