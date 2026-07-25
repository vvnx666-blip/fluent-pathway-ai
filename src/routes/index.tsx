import { createFileRoute } from "@tanstack/react-router";
import {
  Mic,
  BookOpen,
  Layers,
  Target,
  ArrowUpRight,
  ArrowRight,
  Clock,
  NotebookPen,
  GraduationCap,
  RotateCcw,
  CheckCircle2,
  Circle,
  TrendingUp,
} from "lucide-react";
import { AppShell } from "@/components/app-shell";


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

/* ------------------------------- Sidebar ------------------------------- */

const nav = [
  { label: "Home", icon: Home, href: "/", active: true },
  { label: "Mock Test", icon: GraduationCap, href: "/mock" },
  { label: "Speaking Practice", icon: Mic, href: "/practice" },
  { label: "Review", icon: RotateCcw, href: "/review" },
  { label: "Question Bank", icon: Headphones, href: "/bank" },
];

const reviewItems = [
  { label: "Mistakes", icon: NotebookPen, count: 42 },
  { label: "Vocabulary", icon: BookOpen, count: 128 },
  { label: "Flashcards", icon: Layers, count: 24 },
];

function Sidebar() {
  return (
    <aside className="hidden lg:flex h-screen sticky top-0 w-64 shrink-0 flex-col border-r border-border bg-sidebar">
      <div className="px-5 py-5 flex items-center gap-2">
        <div className="w-7 h-7 rounded-md bg-foreground text-background grid place-items-center">
          <span className="font-display text-lg leading-none">C</span>
        </div>
        <div className="flex flex-col leading-tight">
          <span className="text-sm font-semibold tracking-tight">Cadence</span>
          <span className="text-[11px] text-muted-foreground">IELTS Speaking</span>
        </div>
      </div>

      <div className="px-3">
        <div className="flex items-center gap-2 px-2.5 h-8 rounded-md border border-border bg-background/60 text-muted-foreground text-xs">
          <Search className="w-3.5 h-3.5" />
          <span>Search</span>
          <span className="ml-auto text-[10px] px-1.5 py-0.5 rounded border border-border">⌘K</span>
        </div>
      </div>

      <nav className="mt-5 px-3 flex flex-col gap-0.5">
        <p className="text-[10px] uppercase tracking-wider text-muted-foreground px-2 mb-1.5">
          Workspace
        </p>
        {nav.map((item) => (
          <Link
            key={item.label}
            to={item.href as string}
            className={`group flex items-center gap-2.5 h-8 px-2 rounded-md text-sm transition-colors ${
              item.active
                ? "bg-sidebar-accent text-foreground font-medium"
                : "text-muted-foreground hover:bg-sidebar-accent hover:text-foreground"
            }`}
          >
            <item.icon className="w-4 h-4" />
            <span>{item.label}</span>
            {item.active && (
              <span className="ml-auto w-1.5 h-1.5 rounded-full bg-brand" />
            )}
          </Link>
        ))}
      </nav>

      <div className="mt-6 px-3 flex flex-col gap-0.5">
        <p className="text-[10px] uppercase tracking-wider text-muted-foreground px-2 mb-1.5">
          Review Center
        </p>
        {reviewItems.map((item) => (
          <button
            key={item.label}
            className="flex items-center gap-2.5 h-8 px-2 rounded-md text-sm text-muted-foreground hover:bg-sidebar-accent hover:text-foreground transition-colors"
          >
            <item.icon className="w-4 h-4" />
            <span>{item.label}</span>
            <span className="ml-auto text-[11px] text-muted-foreground/70 tabular-nums">
              {item.count}
            </span>
          </button>
        ))}
      </div>

      <div className="mt-auto p-3 space-y-2">
        <div className="rounded-lg border border-border bg-background p-3">
          <div className="flex items-center gap-2 text-xs font-medium">
            <Sparkles className="w-3.5 h-3.5 text-brand" />
            Free plan
          </div>
          <p className="text-[11px] text-muted-foreground mt-1 leading-relaxed">
            2 of 3 mock tests used this month.
          </p>
          <button className="mt-2 w-full h-7 rounded-md bg-foreground text-background text-xs font-medium hover:opacity-90 transition">
            Upgrade
          </button>
        </div>
        <button className="flex items-center gap-2 w-full h-8 px-2 rounded-md text-sm text-muted-foreground hover:bg-sidebar-accent hover:text-foreground">
          <Settings className="w-4 h-4" />
          Settings
        </button>
      </div>
    </aside>
  );
}

/* ------------------------------- Header -------------------------------- */

function Topbar() {
  return (
    <header className="flex items-center justify-between px-8 pt-6 pb-4">
      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        <span>Workspace</span>
        <ChevronRight className="w-3 h-3" />
        <span className="text-foreground">Home</span>
      </div>
      <div className="flex items-center gap-3">
        <div className="hidden sm:flex items-center gap-1.5 text-xs px-2.5 h-7 rounded-full border border-border bg-card">
          <Flame className="w-3.5 h-3.5 text-brand" />
          <span className="font-medium">12-day streak</span>
        </div>
        <div className="w-8 h-8 rounded-full bg-foreground text-background grid place-items-center text-xs font-medium">
          LY
        </div>
      </div>
    </header>
  );
}

/* --------------------------- Hero / Target ----------------------------- */

function HeroCard() {
  const current = 6.5;
  const target = 8.0;
  const progress = ((current - 5) / (target - 5)) * 100;

  return (
    <section className="relative overflow-hidden rounded-2xl bg-foreground text-background p-8">
      <div className="absolute inset-0 opacity-[0.06] grid-bg pointer-events-none" />
      <div className="absolute -right-16 -top-16 w-72 h-72 rounded-full bg-brand/25 blur-3xl" />

      <div className="relative flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
        <div className="max-w-xl">
          <div className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-wider text-background/60">
            <Target className="w-3 h-3" /> Target band
          </div>
          <h1 className="mt-3 font-display text-6xl md:text-7xl leading-[0.95]">
            Band <span className="text-brand">{target.toFixed(1)}</span>
            <span className="text-background/40">/ 9.0</span>
          </h1>
          <p className="mt-4 text-sm text-background/70 leading-relaxed">
            You're at <span className="text-background font-medium">{current}</span> — {" "}
            <span className="text-brand">1.5 bands</span> to close. Keep 45 minutes a day
            and you'll hit target by <span className="text-background">Mar 14</span>.
          </p>

          <div className="mt-6 flex flex-wrap gap-2">
            <button className="inline-flex items-center gap-2 h-10 px-4 rounded-lg bg-brand text-brand-foreground text-sm font-medium hover:brightness-105 transition">
              Start today's plan <ArrowRight className="w-4 h-4" />
            </button>
            <button className="inline-flex items-center gap-2 h-10 px-4 rounded-lg border border-background/15 text-sm font-medium hover:bg-background/5 transition">
              <Mic className="w-4 h-4" /> Quick practice
            </button>
          </div>
        </div>

        <div className="lg:w-80 shrink-0 space-y-4">
          <div>
            <div className="flex items-center justify-between text-xs text-background/60 mb-2">
              <span>Progress to target</span>
              <span className="tabular-nums text-background">{Math.round(progress)}%</span>
            </div>
            <div className="h-1.5 rounded-full bg-background/10 overflow-hidden">
              <div
                className="h-full bg-brand rounded-full"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="mt-1 flex justify-between text-[10px] text-background/40 tabular-nums">
              <span>5.0</span>
              <span>6.5</span>
              <span>8.0</span>
              <span>9.0</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <MiniStat label="Fluency" value="6.5" trend="+0.5" />
            <MiniStat label="Lexical" value="7.0" trend="+0.5" />
            <MiniStat label="Grammar" value="6.0" trend="+0.0" flat />
            <MiniStat label="Pronun." value="6.5" trend="+0.5" />
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
        <span
          className={`text-[10px] tabular-nums ${
            flat ? "text-background/40" : "text-brand"
          }`}
        >
          {trend}
        </span>
      </div>
    </div>
  );
}

/* ------------------------------ Daily Plan ----------------------------- */

const plan = [
  {
    id: 1,
    title: "Warm-up: Part 1 — Hometown",
    meta: "5 questions · 6 min",
    icon: Mic,
    done: true,
    tag: "Speaking",
  },
  {
    id: 2,
    title: "Cue card: A skill you'd like to learn",
    meta: "Part 2 · 3 min",
    icon: NotebookPen,
    done: true,
    tag: "Part 2",
  },
  {
    id: 3,
    title: "Mock test — Full simulation",
    meta: "AI examiner · ~14 min",
    icon: GraduationCap,
    done: false,
    tag: "Mock",
    accent: true,
  },
  {
    id: 4,
    title: "Review 8 new vocabulary items",
    meta: "Flashcards · 4 min",
    icon: Layers,
    done: false,
    tag: "Review",
  },
  {
    id: 5,
    title: "Fix 3 mistakes from yesterday",
    meta: "Notebook · 5 min",
    icon: RotateCcw,
    done: false,
    tag: "Review",
  },
];

function DailyPlan() {
  const doneCount = plan.filter((p) => p.done).length;
  return (
    <section className="rounded-2xl border border-border bg-card p-6">
      <div className="flex items-start justify-between mb-5">
        <div>
          <div className="flex items-center gap-2 text-[11px] uppercase tracking-wider text-muted-foreground">
            <Clock className="w-3 h-3" /> Today · Tue, Feb 27
          </div>
          <h2 className="mt-1.5 font-display text-2xl">Daily training plan</h2>
        </div>
        <div className="text-right">
          <div className="text-xs text-muted-foreground">Completed</div>
          <div className="font-display text-2xl tabular-nums">
            {doneCount}<span className="text-muted-foreground text-lg">/{plan.length}</span>
          </div>
        </div>
      </div>

      <div className="divide-y divide-border">
        {plan.map((item) => (
          <div
            key={item.id}
            className={`group flex items-center gap-4 py-3 -mx-2 px-2 rounded-md hover:bg-accent transition-colors cursor-pointer ${
              item.accent ? "" : ""
            }`}
          >
            <button className="shrink-0">
              {item.done ? (
                <CheckCircle2 className="w-5 h-5 text-brand fill-brand/15" />
              ) : (
                <Circle className="w-5 h-5 text-muted-foreground/40 group-hover:text-foreground transition" />
              )}
            </button>
            <div
              className={`w-9 h-9 rounded-md grid place-items-center shrink-0 ${
                item.accent
                  ? "bg-brand text-brand-foreground"
                  : "bg-muted text-foreground"
              }`}
            >
              <item.icon className="w-4 h-4" />
            </div>
            <div className="min-w-0 flex-1">
              <div
                className={`text-sm font-medium truncate ${
                  item.done ? "text-muted-foreground line-through" : ""
                }`}
              >
                {item.title}
              </div>
              <div className="text-xs text-muted-foreground mt-0.5">{item.meta}</div>
            </div>
            <span className="hidden sm:inline text-[10px] uppercase tracking-wider text-muted-foreground px-2 py-0.5 rounded border border-border">
              {item.tag}
            </span>
            <ArrowUpRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition" />
          </div>
        ))}
      </div>

      <button className="mt-5 w-full h-10 rounded-lg border border-border text-sm font-medium hover:bg-accent transition flex items-center justify-center gap-2">
        Continue where you left off <ArrowRight className="w-4 h-4" />
      </button>
    </section>
  );
}

/* ----------------------------- Progress -------------------------------- */

const weekData = [3, 5, 2, 6, 4, 7, 5];
const days = ["M", "T", "W", "T", "F", "S", "S"];

function ProgressCard() {
  const max = Math.max(...weekData);
  return (
    <section className="rounded-2xl border border-border bg-card p-6">
      <div className="flex items-start justify-between mb-5">
        <div>
          <div className="flex items-center gap-2 text-[11px] uppercase tracking-wider text-muted-foreground">
            <TrendingUp className="w-3 h-3" /> This week
          </div>
          <h2 className="mt-1.5 font-display text-2xl">Progress</h2>
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
                i === weekData.length - 1
                  ? "text-foreground font-semibold"
                  : "text-muted-foreground"
              }`}
            >
              {days[i]}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-5 grid grid-cols-3 gap-3">
        <Metric label="Minutes" value="182" sub="this week" />
        <Metric label="Sessions" value="9" sub="4 mock · 5 drill" />
        <Metric label="Streak" value="12" sub="days" />
      </div>
    </section>
  );
}

function Metric({ label, value, sub }: { label: string; value: string; sub: string }) {
  return (
    <div>
      <div className="text-[10px] uppercase tracking-wider text-muted-foreground">
        {label}
      </div>
      <div className="mt-1 font-display text-2xl tabular-nums">{value}</div>
      <div className="text-[11px] text-muted-foreground">{sub}</div>
    </div>
  );
}

/* --------------------------- Feature cards ----------------------------- */

function FeatureCards() {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      <FeatureCard
        icon={GraduationCap}
        title="Mock Test"
        desc="Full 14-minute simulation with an AI examiner. Real timing, real pressure."
        cta="Start test"
        primary
      />
      <FeatureCard
        icon={Mic}
        title="Speaking Practice"
        desc="Drill Part 1, 2, or 3 by topic. Get corrections and better phrasings in real time."
        cta="Pick a topic"
      />
      <FeatureCard
        icon={RotateCcw}
        title="Review Center"
        desc="Mistakes, vocabulary, and spaced-repetition flashcards — all in one place."
        cta="Open review"
      />
    </div>
  );
}

function FeatureCard({
  icon: Icon,
  title,
  desc,
  cta,
  primary,
}: {
  icon: typeof Mic;
  title: string;
  desc: string;
  cta: string;
  primary?: boolean;
}) {
  return (
    <div
      className={`group relative rounded-2xl border p-5 flex flex-col overflow-hidden transition ${
        primary
          ? "bg-brand-soft border-brand/30 hover:border-brand/60"
          : "bg-card border-border hover:border-foreground/30"
      }`}
    >
      <div
        className={`w-9 h-9 rounded-md grid place-items-center mb-4 ${
          primary ? "bg-foreground text-background" : "bg-muted text-foreground"
        }`}
      >
        <Icon className="w-4 h-4" />
      </div>
      <h3 className="font-display text-xl">{title}</h3>
      <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed flex-1">
        {desc}
      </p>
      <div className="mt-4 flex items-center justify-between text-sm font-medium">
        <span>{cta}</span>
        <ArrowUpRight className="w-4 h-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
      </div>
    </div>
  );
}

/* -------------------------- Review snapshot ---------------------------- */

const mistakes = [
  { wrong: "I very like it", right: "I like it a lot", tag: "Grammar" },
  {
    wrong: "In nowadays society",
    right: "In today's society",
    tag: "Collocation",
  },
  { wrong: "More better", right: "Much better", tag: "Grammar" },
];

const vocab = [
  { word: "quintessential", pos: "adj", gloss: "representing the most perfect example" },
  { word: "to grapple with", pos: "phr", gloss: "to struggle to deal with" },
  { word: "nuanced", pos: "adj", gloss: "showing subtle differences" },
];

function ReviewSnapshot() {
  return (
    <section className="grid gap-4 lg:grid-cols-2">
      <div className="rounded-2xl border border-border bg-card p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="text-[11px] uppercase tracking-wider text-muted-foreground">
              Mistakes notebook
            </div>
            <h3 className="mt-1 font-display text-xl">Fix these next</h3>
          </div>
          <button className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1">
            All 42 <ArrowRight className="w-3 h-3" />
          </button>
        </div>
        <ul className="space-y-3">
          {mistakes.map((m, i) => (
            <li
              key={i}
              className="group flex items-start gap-3 py-2 border-b border-border last:border-0"
            >
              <div className="flex-1 min-w-0">
                <div className="text-sm">
                  <span className="line-through text-muted-foreground">{m.wrong}</span>{" "}
                  <ArrowRight className="inline w-3 h-3 mx-1 text-muted-foreground" />{" "}
                  <span className="font-medium text-foreground">{m.right}</span>
                </div>
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
              Vocabulary notebook
            </div>
            <h3 className="mt-1 font-display text-xl">New this week</h3>
          </div>
          <button className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1">
            Flashcards <ArrowRight className="w-3 h-3" />
          </button>
        </div>
        <ul className="space-y-3">
          {vocab.map((v, i) => (
            <li
              key={i}
              className="flex items-baseline gap-3 py-2 border-b border-border last:border-0"
            >
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
  return (
    <div className="min-h-screen flex bg-background text-foreground">
      <Sidebar />
      <main className="flex-1 min-w-0">
        <Topbar />
        <div className="px-8 pb-16 space-y-6 max-w-[1400px]">
          <div className="flex items-baseline justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Good morning, Lin</p>
              <h1 className="font-display text-4xl tracking-tight">
                Let's close the gap to <span className="text-brand">Band 8</span>.
              </h1>
            </div>
          </div>

          <HeroCard />

          <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
            <DailyPlan />
            <ProgressCard />
          </div>

          <FeatureCards />

          <ReviewSnapshot />
        </div>
      </main>
    </div>
  );
}
