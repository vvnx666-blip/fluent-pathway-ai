import { useEffect, useState, type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { Star, ChevronRight, Crown, Sparkles } from "lucide-react";
import { usePlan } from "@/lib/plan";
import { useI18n } from "@/lib/i18n";
import { BANK_TOTALS } from "@/lib/question-bank";

export function useTx() {
  const { lang } = useI18n();
  return (en: string, zh: string) => (lang === "zh" ? zh : en);
}

export function useIsPro() {
  const { plan } = usePlan();
  return plan.tier === "pro";
}

/** Small skeleton gate so every page has a real loading choreography. */
export function useSkeleton(ms = 420) {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const id = setTimeout(() => setLoading(false), ms);
    return () => clearTimeout(id);
  }, [ms]);
  return loading;
}

export function Stars({ value, className = "" }: { value: number; className?: string }) {
  return (
    <span className={`inline-flex items-center gap-0.5 ${className}`} aria-label={`${value} of 5`}>
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          className={`w-3 h-3 ${i < value ? "fill-gold text-gold" : "text-muted-foreground/35"}`}
        />
      ))}
    </span>
  );
}

export function Pill({
  children,
  tone = "muted",
}: {
  children: ReactNode;
  tone?: "muted" | "brand" | "gold" | "outline";
}) {
  const tones = {
    muted: "bg-muted text-muted-foreground border-transparent",
    brand: "bg-brand/12 text-brand border-brand/30",
    gold: "bg-gold/12 text-gold border-gold/30",
    outline: "border-border text-muted-foreground",
  } as const;
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] uppercase tracking-wider ${tones[tone]}`}
    >
      {children}
    </span>
  );
}

export function BankCrumb({
  items,
}: {
  items: { label: string; to?: string; params?: Record<string, string> }[];
}) {
  return (
    <nav className="flex items-center gap-1.5 text-xs text-muted-foreground flex-wrap">
      {items.map((it, i) => (
        <span key={i} className="inline-flex items-center gap-1.5">
          {i > 0 && <ChevronRight className="w-3 h-3 opacity-50" />}
          {it.to ? (
            <Link
              to={it.to}
              params={it.params as never}
              className="hover:text-foreground transition-colors"
            >
              {it.label}
            </Link>
          ) : (
            <span className="text-foreground">{it.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}

/** Dark premium surface wrapper used by every Question Bank page. */
export function BankSurface({ children }: { children: ReactNode }) {
  const tx = useTx();
  const isPro = useIsPro();
  return (
    <div className="qb-dark min-h-screen">
      <div className="qb-halo">
        <header className="border-b border-border/70 backdrop-blur-xl sticky top-0 z-30 bg-background/70">
          <div className="mx-auto max-w-[1240px] px-6 lg:px-10 h-16 flex items-center justify-between gap-4">
            <Link to="/bank" className="flex items-center gap-3 min-w-0">
              <span className="w-9 h-9 rounded-xl bg-brand/15 border border-brand/30 grid place-items-center shrink-0">
                <Sparkles className="w-4 h-4 text-brand" />
              </span>
              <span className="flex flex-col leading-tight min-w-0">
                <span className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                  IELTS Speaking
                </span>
                <span className="text-sm font-semibold tracking-tight truncate">Question Bank</span>
              </span>
            </Link>

            <div className="hidden md:flex items-center gap-6 text-[11px] text-muted-foreground">
              <HeaderStat label={tx("Questions", "题库总量")} value={`${BANK_TOTALS.questions.toLocaleString()}+`} />
              <HeaderStat label={tx("Exam coverage", "真题覆盖")} value={`${BANK_TOTALS.coverage}%`} />
              <HeaderStat label={tx("Updated", "更新频率")} value={tx("Weekly", "每周")} />
            </div>

            <div className="flex items-center gap-2 shrink-0">
              {isPro ? (
                <span className="inline-flex items-center gap-1.5 h-8 px-3 rounded-full border border-gold/40 bg-gold/10 text-gold text-xs font-medium">
                  <Crown className="w-3.5 h-3.5" /> Pro Member
                </span>
              ) : (
                <>
                  <span className="hidden sm:inline-flex items-center h-8 px-3 rounded-full border border-border text-xs text-muted-foreground">
                    Free User
                  </span>
                  <Link
                    to="/bank/pro"
                    className="inline-flex items-center h-8 px-3 rounded-full bg-brand text-brand-foreground text-xs font-semibold hover:brightness-110 transition"
                  >
                    {tx("Go Pro", "升级 Pro")}
                  </Link>
                </>
              )}
            </div>
          </div>
        </header>

        <main className="mx-auto max-w-[1240px] px-6 lg:px-10 py-10 space-y-12">{children}</main>

        <footer className="border-t border-border/70">
          <div className="mx-auto max-w-[1240px] px-6 lg:px-10 py-6 flex items-center justify-between text-[11px] text-muted-foreground">
            <span>Cadence · IELTS Speaking Question Bank</span>
            <Link to="/" className="hover:text-foreground transition-colors">
              {tx("Back to dashboard", "返回工作台")} →
            </Link>
          </div>
        </footer>
      </div>
    </div>
  );
}

function HeaderStat({ label, value }: { label: string; value: string }) {
  return (
    <span className="flex flex-col leading-tight">
      <span className="text-[9px] uppercase tracking-[0.16em] opacity-70">{label}</span>
      <span className="text-foreground text-xs font-medium tabular-nums">{value}</span>
    </span>
  );
}

export function SkeletonGrid({ rows = 3, className = "" }: { rows?: number; className?: string }) {
  return (
    <div className={`grid gap-4 ${className}`}>
      {Array.from({ length: rows }, (_, i) => (
        <div key={i} className="qb-skeleton h-28 w-full" />
      ))}
    </div>
  );
}
