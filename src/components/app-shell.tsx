import { Link, useRouterState } from "@tanstack/react-router";
import {
  Mic,
  BookOpen,
  Layers,
  Flame,
  NotebookPen,
  GraduationCap,
  Home,
  Headphones,
  RotateCcw,
  Settings,
  Search,
  ChevronRight,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import type { ReactNode } from "react";

const nav: { label: string; icon: LucideIcon; href: string }[] = [
  { label: "Home", icon: Home, href: "/" },
  { label: "Mock Test", icon: GraduationCap, href: "/mock" },
  { label: "Speaking Practice", icon: Mic, href: "/practice" },
  { label: "Review", icon: RotateCcw, href: "/review" },
  { label: "Question Bank", icon: Headphones, href: "/bank" },
];

const reviewItems = [
  { label: "Mistakes", icon: NotebookPen, count: 42, href: "/review" },
  { label: "Vocabulary", icon: BookOpen, count: 128, href: "/review" },
  { label: "Flashcards", icon: Layers, count: 24, href: "/review" },
];

function Sidebar() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
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
        {nav.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.label}
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
          Review Center
        </p>
        {reviewItems.map((item) => (
          <Link
            key={item.label}
            to={item.href}
            className="flex items-center gap-2.5 h-8 px-2 rounded-md text-sm text-muted-foreground hover:bg-sidebar-accent hover:text-foreground transition-colors"
          >
            <item.icon className="w-4 h-4" />
            <span>{item.label}</span>
            <span className="ml-auto text-[11px] text-muted-foreground/70 tabular-nums">
              {item.count}
            </span>
          </Link>
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

function Topbar({ crumb }: { crumb: string }) {
  return (
    <header className="flex items-center justify-between px-8 pt-6 pb-4">
      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        <span>Workspace</span>
        <ChevronRight className="w-3 h-3" />
        <span className="text-foreground">{crumb}</span>
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
