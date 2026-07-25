import { createFileRoute } from "@tanstack/react-router";
import { Mic, ArrowUpRight, Sparkles } from "lucide-react";
import { AppShell } from "@/components/app-shell";

export const Route = createFileRoute("/practice")({
  head: () => ({
    meta: [
      { title: "Speaking Practice · Cadence IELTS" },
      { name: "description", content: "Drill IELTS Part 1, 2, and 3 by topic with an AI coach. Get corrections, better phrasings, and band-level feedback in real time." },
      { property: "og:title", content: "Speaking Practice — Cadence" },
      { property: "og:description", content: "Targeted IELTS speaking drills by part and topic." },
    ],
  }),
  component: PracticePage,
});

const topics = [
  { title: "Hometown & travel", part: "Part 1", qs: 24, level: "Easy" },
  { title: "Work & study", part: "Part 1", qs: 30, level: "Easy" },
  { title: "A memorable journey", part: "Part 2", qs: 8, level: "Medium" },
  { title: "A skill you'd like to learn", part: "Part 2", qs: 6, level: "Medium" },
  { title: "Technology & society", part: "Part 3", qs: 18, level: "Hard" },
  { title: "Environment & policy", part: "Part 3", qs: 14, level: "Hard" },
];

function PracticePage() {
  return (
    <AppShell crumb="Speaking Practice">
      <div>
        <p className="text-sm text-muted-foreground">Drill by part & topic</p>
        <h1 className="font-display text-4xl tracking-tight">
          Practice with <span className="text-brand">live feedback</span>.
        </h1>
      </div>

      <section className="rounded-2xl border border-border bg-brand-soft/50 p-6 flex flex-col md:flex-row md:items-center gap-4">
        <div className="w-12 h-12 rounded-xl bg-foreground text-background grid place-items-center">
          <Mic className="w-5 h-5" />
        </div>
        <div className="flex-1">
          <h2 className="font-display text-2xl">Quick 3-minute drill</h2>
          <p className="text-sm text-muted-foreground">A random Part 1 set to warm up. No pressure.</p>
        </div>
        <button className="inline-flex items-center gap-2 h-10 px-4 rounded-lg bg-foreground text-background text-sm font-medium">
          <Sparkles className="w-4 h-4" /> Start
        </button>
      </section>

      <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {topics.map((t) => (
          <button
            key={t.title}
            className="group text-left rounded-2xl border border-border bg-card p-5 hover:border-foreground/30 transition"
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase tracking-wider text-muted-foreground px-1.5 py-0.5 border border-border rounded">
                {t.part}
              </span>
              <span className={`text-[10px] uppercase tracking-wider ${
                t.level === "Hard" ? "text-brand" : "text-muted-foreground"
              }`}>{t.level}</span>
            </div>
            <h3 className="mt-4 font-display text-xl">{t.title}</h3>
            <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
              <span>{t.qs} prompts</span>
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </div>
          </button>
        ))}
      </section>
    </AppShell>
  );
}
