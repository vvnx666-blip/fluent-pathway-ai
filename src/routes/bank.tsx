import { createFileRoute } from "@tanstack/react-router";
import { Headphones, Search, Bookmark, Play } from "lucide-react";
import { AppShell } from "@/components/app-shell";

export const Route = createFileRoute("/bank")({
  head: () => ({
    meta: [
      { title: "Question Bank · Cadence IELTS" },
      { name: "description", content: "Browse a curated bank of IELTS speaking questions across Part 1, 2, and 3 — filter by topic and difficulty." },
      { property: "og:title", content: "Question Bank — Cadence" },
      { property: "og:description", content: "Curated IELTS speaking questions to drill any time." },
    ],
  }),
  component: BankPage,
});

const filters = ["All", "Part 1", "Part 2", "Part 3", "Trending"];

const questions = [
  { q: "Describe a place you like to visit on weekends.", part: "Part 2", topic: "Places", saved: true },
  { q: "Do you think people read less than they used to?", part: "Part 3", topic: "Reading" },
  { q: "What kind of music do you enjoy?", part: "Part 1", topic: "Music", saved: true },
  { q: "How has technology changed the way we work?", part: "Part 3", topic: "Technology" },
  { q: "Describe a person who inspired you.", part: "Part 2", topic: "People" },
  { q: "Do you prefer eating at home or out?", part: "Part 1", topic: "Food" },
  { q: "Should governments fund public transport more?", part: "Part 3", topic: "Society" },
  { q: "Tell me about a hobby you picked up recently.", part: "Part 1", topic: "Hobbies" },
];

function BankPage() {
  return (
    <AppShell crumb="Question Bank">
      <div>
        <p className="text-sm text-muted-foreground">Question Bank</p>
        <h1 className="font-display text-4xl tracking-tight">
          <span className="text-brand">2,400+</span> curated prompts.
        </h1>
      </div>

      <section className="flex flex-col md:flex-row md:items-center gap-3">
        <div className="flex items-center gap-2 flex-1 h-11 px-3 rounded-lg border border-border bg-card">
          <Search className="w-4 h-4 text-muted-foreground" />
          <input
            placeholder="Search questions, topics, or keywords…"
            className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
          />
        </div>
        <div className="flex items-center gap-1.5 overflow-x-auto">
          {filters.map((f, i) => (
            <button
              key={f}
              className={`h-9 px-3 rounded-md text-xs font-medium border transition whitespace-nowrap ${
                i === 0
                  ? "bg-foreground text-background border-foreground"
                  : "border-border text-muted-foreground hover:text-foreground"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </section>

      <section className="rounded-2xl border border-border bg-card divide-y divide-border">
        {questions.map((item, i) => (
          <div key={i} className="group flex items-center gap-4 p-4 hover:bg-accent transition">
            <div className="w-9 h-9 rounded-md bg-muted grid place-items-center shrink-0">
              <Headphones className="w-4 h-4" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-sm font-medium truncate">{item.q}</div>
              <div className="text-xs text-muted-foreground mt-0.5 flex items-center gap-2">
                <span>{item.part}</span>
                <span>·</span>
                <span>{item.topic}</span>
              </div>
            </div>
            <button className="w-8 h-8 rounded-md hover:bg-background grid place-items-center">
              <Bookmark className={`w-4 h-4 ${item.saved ? "fill-brand text-brand" : "text-muted-foreground"}`} />
            </button>
            <button className="hidden sm:inline-flex items-center gap-1.5 h-8 px-3 rounded-md bg-foreground text-background text-xs font-medium">
              <Play className="w-3.5 h-3.5" /> Practice
            </button>
          </div>
        ))}
      </section>
    </AppShell>
  );
}
