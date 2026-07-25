import { createFileRoute } from "@tanstack/react-router";
import { NotebookPen, BookOpen, Layers, ArrowRight, RotateCcw } from "lucide-react";
import { AppShell } from "@/components/app-shell";

export const Route = createFileRoute("/review")({
  head: () => ({
    meta: [
      { title: "Review Center · Cadence IELTS" },
      { name: "description", content: "Your mistakes notebook, vocabulary notebook, and spaced-repetition flashcards — all in one place." },
      { property: "og:title", content: "Review Center — Cadence" },
      { property: "og:description", content: "Mistakes, vocabulary, and flashcards for IELTS speaking." },
    ],
  }),
  component: ReviewPage,
});

const mistakes = [
  { wrong: "I very like it", right: "I like it a lot", tag: "Grammar" },
  { wrong: "In nowadays society", right: "In today's society", tag: "Collocation" },
  { wrong: "More better", right: "Much better", tag: "Grammar" },
  { wrong: "Discuss about", right: "Discuss", tag: "Preposition" },
  { wrong: "Peoples are", right: "People are", tag: "Grammar" },
];

const vocab = [
  { word: "quintessential", pos: "adj", gloss: "representing the most perfect example" },
  { word: "to grapple with", pos: "phr", gloss: "to struggle to deal with" },
  { word: "nuanced", pos: "adj", gloss: "showing subtle differences" },
  { word: "burgeoning", pos: "adj", gloss: "rapidly growing or developing" },
  { word: "to hinge on", pos: "phr", gloss: "to depend entirely on" },
];

function ReviewPage() {
  return (
    <AppShell crumb="Review">
      <div>
        <p className="text-sm text-muted-foreground">Review Center</p>
        <h1 className="font-display text-4xl tracking-tight">
          What to <span className="text-brand">fix next</span>.
        </h1>
      </div>

      <section className="grid gap-4 md:grid-cols-3">
        <StatCard icon={NotebookPen} label="Mistakes" value="42" sub="8 due today" />
        <StatCard icon={BookOpen} label="Vocabulary" value="128" sub="12 new this week" />
        <StatCard icon={Layers} label="Flashcards" value="24" sub="due for review" accent />
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-2xl border border-border bg-card p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="text-[11px] uppercase tracking-wider text-muted-foreground">
                Mistakes notebook
              </div>
              <h3 className="mt-1 font-display text-xl">Recent corrections</h3>
            </div>
            <button className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1">
              All 42 <ArrowRight className="w-3 h-3" />
            </button>
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
                Vocabulary notebook
              </div>
              <h3 className="mt-1 font-display text-xl">Recently added</h3>
            </div>
            <button className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1">
              Flashcards <ArrowRight className="w-3 h-3" />
            </button>
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

      <section className="rounded-2xl bg-foreground text-background p-6 flex items-center gap-4">
        <div className="w-11 h-11 rounded-xl bg-brand text-brand-foreground grid place-items-center">
          <RotateCcw className="w-5 h-5" />
        </div>
        <div className="flex-1">
          <h3 className="font-display text-2xl">24 flashcards ready</h3>
          <p className="text-sm text-background/70">Spaced repetition · ~6 minutes</p>
        </div>
        <button className="h-10 px-4 rounded-lg bg-brand text-brand-foreground text-sm font-medium">
          Start session
        </button>
      </section>
    </AppShell>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
  sub,
  accent,
}: {
  icon: typeof NotebookPen;
  label: string;
  value: string;
  sub: string;
  accent?: boolean;
}) {
  return (
    <div className={`rounded-2xl border p-5 ${accent ? "bg-brand-soft border-brand/30" : "bg-card border-border"}`}>
      <div className="flex items-center gap-2 text-[11px] uppercase tracking-wider text-muted-foreground">
        <Icon className="w-3.5 h-3.5" /> {label}
      </div>
      <div className="mt-3 font-display text-4xl tabular-nums">{value}</div>
      <div className="mt-1 text-xs text-muted-foreground">{sub}</div>
    </div>
  );
}
