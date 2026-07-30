import { Link, useRouterState } from "@tanstack/react-router";
import {
  Mic,
  BookOpen,
  Layers,
  Flame,
  NotebookPen,
  GraduationCap,
  Home,
  RotateCcw,
  Settings,
  ChevronRight,
  Sparkles,
  MessagesSquare,
  AudioLines,
  type LucideIcon,
} from "lucide-react";
import type { ReactNode } from "react";
import { LangToggle, useI18n } from "@/lib/i18n";
import { ModeSwitcher, useMode } from "@/lib/mode";
import { usePlan } from "@/lib/plan";

function Sidebar() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const { t, lang } = useI18n();
  const { mode } = useMode();
  const tx = (en: string, zh: string) => (lang === "zh" ? zh : en);

  const nav =
    mode === "ielts"
      ? [
          { label: t("nav.home"), icon: Home as LucideIcon, href: "/" },
          { label: tx("IELTS Practice", "雅思专项训练"), icon: Mic as LucideIcon, href: "/practice" },
          { label: tx("Mock Test", "模拟考试"), icon: GraduationCap as LucideIcon, href: "/mock" },
          { label: tx("Question Bank", "真题题库"), icon: Library as LucideIcon, href: "/bank" },
          { label: t("nav.review"), icon: RotateCcw as LucideIcon, href: "/review" },
        ]
      : [
          { label: t("nav.home"), icon: Home as LucideIcon, href: "/" },
          { label: tx("Conversation", "对话练习"), icon: MessagesSquare as LucideIcon, href: "/conversation" },
          { label: tx("Pronunciation", "发音纠正"), icon: AudioLines as LucideIcon, href: "/review/mistakes" },
          { label: t("nav.review"), icon: RotateCcw as LucideIcon, href: "/review" },
        ];

  const reviewItems: { key: "shell.mistakes" | "shell.vocabulary" | "shell.flashcards"; icon: LucideIcon; count: number; href: string }[] = [
    { key: "shell.mistakes", icon: NotebookPen, count: 42, href: "/review/mistakes" },
    { key: "shell.vocabulary", icon: BookOpen, count: 128, href: "/review/vocabulary" },
    { key: "shell.flashcards", icon: Layers, count: 24, href: "/review/flashcards" },
  ];

  return (
    <aside className="hidden lg:flex h-screen sticky top-0 w-64 shrink-0 flex-col border-r border-border bg-sidebar">
      <div className="px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-md bg-foreground text-background grid place-items-center">
            <span className="font-display text-lg leading-none">C</span>
          </div>
          <div className="flex flex-col leading-tight">
            <span className="text-sm font-semibold tracking-tight">Cadence</span>
            <span className="text-[11px] text-muted-foreground">
              {mode === "ielts" ? tx("IELTS Speaking", "雅思口语") : tx("Everyday English", "日常口语")}
            </span>
          </div>
        </div>
      </div>

      <div className="px-4 pb-2">
        <LangToggle />
      </div>

      <div className="px-4 pb-1 pt-2">
        <ModeSwitcher />
      </div>

      <nav className="mt-4 px-3 flex flex-col gap-0.5">
        <p className="text-[10px] uppercase tracking-wider text-muted-foreground px-2 mb-1.5">
          {t("shell.workspace")}
        </p>
        {nav.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              to={item.href}
              className={`group flex items-center gap-2.5 h-8 px-2 rounded-md text-sm transition-colors ${
                active
                  ? "bg-sidebar-accent text-foreground font-medium"
                  : "text-muted-foreground hover:bg-sidebar-accent hover:text-foreground"
              }`}
            >
              <item.icon className="w-4 h-4" />
              <span>{item.label}</span>
              {active && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-brand" />}
            </Link>
          );
        })}
      </nav>

      <div className="mt-6 px-3 flex flex-col gap-0.5">
        <p className="text-[10px] uppercase tracking-wider text-muted-foreground px-2 mb-1.5">
          {t("shell.reviewCenter")}
        </p>
        {reviewItems.map((item) => (
          <Link
            key={item.key}
            to={item.href}
            className="flex items-center gap-2.5 h-8 px-2 rounded-md text-sm text-muted-foreground hover:bg-sidebar-accent hover:text-foreground transition-colors"
          >
            <item.icon className="w-4 h-4" />
            <span>{t(item.key)}</span>
            <span className="ml-auto text-[11px] text-muted-foreground/70 tabular-nums">
              {item.count}
            </span>
          </Link>
        ))}
      </div>

      <PlanCard />
    </aside>
  );
}

function PlanCard() {
  const { t, lang } = useI18n();
  const { plan } = usePlan();
  const tx = (en: string, zh: string) => (lang === "zh" ? zh : en);
  const isPro = plan.tier === "pro";
  const isPaid = plan.tier !== "free";
  return (
    <div className="mt-auto p-3 space-y-2">
      <div
        className={`relative overflow-hidden rounded-lg border p-3 ${
          isPro
            ? "bg-foreground text-background border-transparent"
            : isPaid
            ? "bg-brand-soft border-brand/30"
            : "bg-background border-border"
        }`}
      >
        {isPro && <div className="absolute -right-8 -top-8 w-24 h-24 rounded-full bg-brand/30 blur-2xl pointer-events-none" />}
        <div className="relative">
          <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider opacity-70">
            <Sparkles className="w-3 h-3" />
            {tx("Current plan", "当前套餐")}
          </div>
          <div className="mt-0.5 text-sm font-semibold">
            {lang === "zh" ? plan.nameZh : plan.name}
          </div>
          <div className={`text-[11px] mt-0.5 ${isPro ? "text-background/60" : "text-muted-foreground"}`}>
            {plan.price} · {tx(plan.cadence, plan.cadenceZh)}
          </div>
          <Link
            to="/pricing"
            className={`mt-2 inline-flex w-full h-7 items-center justify-center rounded-md text-xs font-medium transition ${
              isPro
                ? "bg-brand text-brand-foreground hover:brightness-105"
                : "bg-foreground text-background hover:opacity-90"
            }`}
          >
            {isPaid ? tx("Switch plan", "切换套餐") : t("shell.upgrade")}
          </Link>
        </div>
      </div>
      <button className="flex items-center gap-2 w-full h-8 px-2 rounded-md text-sm text-muted-foreground hover:bg-sidebar-accent hover:text-foreground">
        <Settings className="w-4 h-4" />
        {t("shell.settings")}
      </button>
    </div>
  );
}

function Topbar({ crumb }: { crumb: string }) {
  const { t } = useI18n();
  return (
    <header className="flex items-center justify-between px-8 pt-6 pb-4">
      <div className="flex items-center gap-3">
        <LangToggle className="lg:hidden" />
        <div className="hidden lg:flex items-center gap-2 text-xs text-muted-foreground">
          <span>{t("shell.workspace")}</span>
          <ChevronRight className="w-3 h-3" />
          <span className="text-foreground">{crumb}</span>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <div className="hidden sm:flex items-center gap-1.5 text-xs px-2.5 h-7 rounded-full border border-border bg-card">
          <Flame className="w-3.5 h-3.5 text-brand" />
          <span className="font-medium">{t("shell.streak")}</span>
        </div>
        <div className="w-8 h-8 rounded-full bg-foreground text-background grid place-items-center text-xs font-medium">
          LY
        </div>
      </div>
    </header>
  );
}

export function AppShell({ crumb, children }: { crumb: string; children: ReactNode }) {
  return (
    <div className="min-h-screen flex bg-background text-foreground">
      <Sidebar />
      <main className="flex-1 min-w-0">
        <Topbar crumb={crumb} />
        <div className="px-8 pb-16 space-y-6 max-w-[1400px]">{children}</div>
      </main>
    </div>
  );
}
