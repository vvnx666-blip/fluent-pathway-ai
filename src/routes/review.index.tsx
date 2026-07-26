import { createFileRoute, Link } from "@tanstack/react-router";
import { NotebookPen, BookOpen, Layers, ArrowUpRight, type LucideIcon } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/review/")({
  head: () => ({
    meta: [
      { title: "Review Center · Cadence IELTS" },
      {
        name: "description",
        content:
          "Your mistakes notebook, vocabulary notebook, and spaced-repetition flashcards — all in one place.",
      },
      { property: "og:title", content: "Review Center — Cadence" },
      { property: "og:description", content: "Mistakes, vocabulary, and flashcards for IELTS speaking." },
    ],
  }),
  component: ReviewHub,
});

function ReviewHub() {
  const { t, lang } = useI18n();
  const tx = (en: string, zh: string) => (lang === "zh" ? zh : en);

  return (
    <AppShell crumb={t("reviewPage.crumb")}>
      <div>
        <p className="text-sm text-muted-foreground">{t("reviewPage.eyebrow")}</p>
        <h1 className="font-display text-4xl tracking-tight">{t("reviewPage.headline")}</h1>
      </div>

      <section className="grid gap-4 md:grid-cols-3">
        <HubCard
          to="/review/mistakes"
          icon={NotebookPen}
          label={t("shell.mistakes")}
          value="42"
          sub={tx("8 due today", "今日待复习 8 条")}
          desc={tx("Corrections from recent sessions.", "近期练习中的修正。")}
        />
        <HubCard
          to="/review/vocabulary"
          icon={BookOpen}
          label={t("shell.vocabulary")}
          value="128"
          sub={tx("12 new this week", "本周新增 12 个")}
          desc={tx("Words and phrases you've saved.", "你收藏的词汇与搭配。")}
        />
        <HubCard
          to="/review/flashcards"
          icon={Layers}
          label={t("shell.flashcards")}
          value="24"
          sub={tx("due for review", "待复习")}
          desc={tx("Flip cards, rate, and schedule with SM-2.", "翻卡评级，按 SM-2 安排复习。")}
          accent
        />
      </section>
    </AppShell>
  );
}

function HubCard({
  to,
  icon: Icon,
  label,
  value,
  sub,
  desc,
  accent,
}: {
  to: string;
  icon: LucideIcon;
  label: string;
  value: string;
  sub: string;
  desc: string;
  accent?: boolean;
}) {
  return (
    <Link
      to={to}
      className={`group text-left rounded-2xl border p-5 transition ${
        accent
          ? "bg-brand-soft border-brand/30 hover:border-brand/60"
          : "bg-card border-border hover:border-foreground/30"
      }`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-[11px] uppercase tracking-wider text-muted-foreground">
          <Icon className="w-3.5 h-3.5" /> {label}
        </div>
        <ArrowUpRight className="w-4 h-4 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
      </div>
      <div className="mt-3 font-display text-4xl tabular-nums">{value}</div>
      <div className="mt-1 text-xs text-muted-foreground">{sub}</div>
      <p className="mt-3 text-xs text-muted-foreground leading-relaxed">{desc}</p>
    </Link>
  );
}
