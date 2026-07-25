import { createFileRoute } from "@tanstack/react-router";
import { Mic, ArrowUpRight, Sparkles } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { useI18n, type Lang } from "@/lib/i18n";

export const Route = createFileRoute("/practice")({
  head: () => ({
    meta: [
      { title: "Speaking Practice · Cadence IELTS" },
      {
        name: "description",
        content:
          "Drill IELTS Part 1, 2, and 3 by topic with an AI coach. Get corrections, better phrasings, and band-level feedback in real time.",
      },
      { property: "og:title", content: "Speaking Practice — Cadence" },
      { property: "og:description", content: "Targeted IELTS speaking drills by part and topic." },
    ],
  }),
  component: PracticePage,
});

type Topic = { en: string; zh: string; part: string; qs: number; level: "Easy" | "Medium" | "Hard" };
const topics: Topic[] = [
  { en: "Hometown & travel", zh: "家乡与旅行", part: "Part 1", qs: 24, level: "Easy" },
  { en: "Work & study", zh: "工作与学习", part: "Part 1", qs: 30, level: "Easy" },
  { en: "A memorable journey", zh: "一段难忘的旅行", part: "Part 2", qs: 8, level: "Medium" },
  { en: "A skill you'd like to learn", zh: "一项你想学的技能", part: "Part 2", qs: 6, level: "Medium" },
  { en: "Technology & society", zh: "科技与社会", part: "Part 3", qs: 18, level: "Hard" },
  { en: "Environment & policy", zh: "环境与政策", part: "Part 3", qs: 14, level: "Hard" },
];

function tLabel(lang: Lang, tp: Topic) {
  return lang === "zh" ? tp.zh : tp.en;
}

function PracticePage() {
  const { t, lang } = useI18n();
  return (
    <AppShell crumb={t("practice.crumb")}>
      <div>
        <p className="text-sm text-muted-foreground">{t("practice.eyebrow")}</p>
        <h1 className="font-display text-4xl tracking-tight">{t("practice.headline")}</h1>
      </div>

      <section className="rounded-2xl border border-border bg-brand-soft/50 p-6 flex flex-col md:flex-row md:items-center gap-4">
        <div className="w-12 h-12 rounded-xl bg-foreground text-background grid place-items-center">
          <Mic className="w-5 h-5" />
        </div>
        <div className="flex-1">
          <h2 className="font-display text-2xl">{t("practice.quickDrill")}</h2>
          <p className="text-sm text-muted-foreground">{t("practice.quickDrillDesc")}</p>
        </div>
        <button className="inline-flex items-center gap-2 h-10 px-4 rounded-lg bg-foreground text-background text-sm font-medium">
          <Sparkles className="w-4 h-4" /> {t("practice.start")}
        </button>
      </section>

      <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {topics.map((tp) => (
          <button
            key={tp.en}
            className="group text-left rounded-2xl border border-border bg-card p-5 hover:border-foreground/30 transition"
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase tracking-wider text-muted-foreground px-1.5 py-0.5 border border-border rounded">
                {tp.part}
              </span>
              <span
                className={`text-[10px] uppercase tracking-wider ${
                  tp.level === "Hard" ? "text-brand" : "text-muted-foreground"
                }`}
              >
                {tp.level}
              </span>
            </div>
            <h3 className="mt-4 font-display text-xl">{tLabel(lang, tp)}</h3>
            <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
              <span>
                {tp.qs} {t("practice.prompts")}
              </span>
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </div>
          </button>
        ))}
      </section>
    </AppShell>
  );
}
