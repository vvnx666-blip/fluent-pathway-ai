import { createFileRoute } from "@tanstack/react-router";
import { GraduationCap, Play, Clock, Mic, ArrowRight, CheckCircle2 } from "lucide-react";
import { AppShell } from "@/components/app-shell";

export const Route = createFileRoute("/mock")({
  head: () => ({
    meta: [
      { title: "Mock Test · Cadence IELTS" },
      { name: "description", content: "Full IELTS speaking mock test with an AI examiner — real timing, real pressure, instant band feedback." },
      { property: "og:title", content: "Mock Test — Cadence" },
      { property: "og:description", content: "Simulate the full IELTS speaking test with an AI examiner." },
    ],
  }),
  component: MockPage,
});

const parts = [
  { part: "Part 1", title: "Interview", meta: "4–5 min · Familiar topics", qs: 12 },
  { part: "Part 2", title: "Long turn", meta: "3–4 min · Cue card + 1 min prep", qs: 1 },
  { part: "Part 3", title: "Discussion", meta: "4–5 min · Abstract questions", qs: 6 },
];

const history = [
  { date: "Feb 24", band: 6.5, dur: "13:42" },
  { date: "Feb 19", band: 6.0, dur: "14:08" },
  { date: "Feb 12", band: 6.0, dur: "12:55" },
];

function MockPage() {
  return (
    <AppShell crumb="Mock Test">
      <div>
        <p className="text-sm text-muted-foreground">Simulation</p>
        <h1 className="font-display text-4xl tracking-tight">
          Full <span className="text-brand">14-minute</span> mock test.
        </h1>
      </div>

      <section className="relative overflow-hidden rounded-2xl bg-foreground text-background p-8">
        <div className="absolute -right-16 -top-16 w-72 h-72 rounded-full bg-brand/25 blur-3xl" />
        <div className="relative flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-wider text-background/60">
              <GraduationCap className="w-3 h-3" /> AI Examiner
            </div>
            <h2 className="mt-3 font-display text-5xl leading-[1]">Ready when you are.</h2>
            <p className="mt-4 text-sm text-background/70 leading-relaxed">
              Three parts, back-to-back, with band scores across fluency, lexical resource,
              grammar, and pronunciation. Recorded so you can review every answer.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              <button className="inline-flex items-center gap-2 h-10 px-4 rounded-lg bg-brand text-brand-foreground text-sm font-medium">
                <Play className="w-4 h-4" /> Start mock test
              </button>
              <button className="inline-flex items-center gap-2 h-10 px-4 rounded-lg border border-background/15 text-sm font-medium hover:bg-background/5">
                <Mic className="w-4 h-4" /> Mic check
              </button>
            </div>
          </div>
          <div className="lg:w-72 grid grid-cols-2 gap-3">
            <div className="rounded-lg border border-background/10 bg-background/[0.03] p-3">
              <div className="text-[10px] uppercase tracking-wider text-background/50">Last band</div>
              <div className="font-display text-3xl mt-1">6.5</div>
            </div>
            <div className="rounded-lg border border-background/10 bg-background/[0.03] p-3">
              <div className="text-[10px] uppercase tracking-wider text-background/50">Tests done</div>
              <div className="font-display text-3xl mt-1">7</div>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {parts.map((p, i) => (
          <div key={p.part} className="rounded-2xl border border-border bg-card p-5">
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase tracking-wider text-muted-foreground">{p.part}</span>
              <span className="w-6 h-6 rounded-full bg-muted grid place-items-center text-xs">{i + 1}</span>
            </div>
            <h3 className="mt-3 font-display text-2xl">{p.title}</h3>
            <p className="text-sm text-muted-foreground mt-1">{p.meta}</p>
            <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
              <span>{p.qs} questions</span>
              <Clock className="w-3.5 h-3.5" />
            </div>
          </div>
        ))}
      </section>

      <section className="rounded-2xl border border-border bg-card p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-display text-xl">Recent attempts</h3>
          <button className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1">
            All history <ArrowRight className="w-3 h-3" />
          </button>
        </div>
        <ul className="divide-y divide-border">
          {history.map((h) => (
            <li key={h.date} className="flex items-center gap-4 py-3">
              <CheckCircle2 className="w-4 h-4 text-brand" />
              <div className="flex-1">
                <div className="text-sm font-medium">{h.date}</div>
                <div className="text-xs text-muted-foreground">{h.dur}</div>
              </div>
              <span className="font-display text-2xl tabular-nums">{h.band.toFixed(1)}</span>
              <ArrowRight className="w-4 h-4 text-muted-foreground" />
            </li>
          ))}
        </ul>
      </section>
    </AppShell>
  );
}
