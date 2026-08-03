import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Lock, Sparkles, TriangleAlert } from "lucide-react";
import { PaperShell, PriceTag } from "@/components/speaking-lab-ui";
import { writeOnboarding } from "@/lib/onboarding";

export const Route = createFileRoute("/report")({
  head: () => ({
    meta: [
      { title: "Your AI Speaking Report · Speaking Lab" },
      {
        name: "description",
        content:
          "See your overall band and four-criteria scores from the AI examiner, then unlock the detailed report with corrections and improved sentences.",
      },
      { property: "og:title", content: "Your IELTS Speaking AI report" },
      {
        property: "og:description",
        content: "Overall band, fluency, lexical resource, grammar and pronunciation — analysed by AI.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ReportPage,
});

const PHASES = [
  "Loading...",
  "Analyzing your responses...",
  "AI is evaluating fluency, vocabulary, grammar, and pronunciation...",
  "Finding your strengths and weaknesses...",
  "Generating your personalized report...",
];

function ReportPage() {
  const [analysing, setAnalysing] = useState(true);
  return (
    <PaperShell>{analysing ? <Analysing onDone={() => setAnalysing(false)} /> : <Report />}</PaperShell>
  );
}

/* ----------------------------- Screen five ------------------------------ */

function Analysing({ onDone }: { onDone: () => void }) {
  const [i, setI] = useState(0);
  useEffect(() => {
    const step = setInterval(() => setI((v) => Math.min(v + 1, PHASES.length - 1)), 2500);
    const end = setTimeout(onDone, 14000);
    return () => {
      clearInterval(step);
      clearTimeout(end);
    };
  }, [onDone]);

  return (
    <div className="text-center">
      <div className="relative h-8">
        {PHASES.map((p, idx) => (
          <p
            key={p}
            className="absolute inset-x-0 text-base sm:text-lg text-foreground/80 transition-opacity duration-700"
            style={{ opacity: idx === i ? 1 : 0 }}
          >
            {p}
          </p>
        ))}
      </div>

      <div className="mx-auto mt-10 h-px w-full max-w-md overflow-hidden bg-border">
        <div
          className="relative h-px bg-brand transition-[width] duration-[2500ms] ease-linear"
          style={{ width: `${((i + 1) / PHASES.length) * 100}%` }}
        >
          <span className="sl-sweep absolute inset-y-0 -left-8 w-8 bg-gradient-to-r from-transparent via-white/80 to-transparent" />
        </div>
      </div>
    </div>
  );
}

/* ------------------------------ Screen six ------------------------------ */

const CRITERIA: [string, string][] = [
  ["Fluency & Coherence", "6.5"],
  ["Lexical Resource", "6.0"],
  ["Grammatical Range", "6.5"],
  ["Pronunciation", "7.0"],
];

function Report() {
  const navigate = useNavigate();
  const [unlocked, setUnlocked] = useState(false);
  const [modal, setModal] = useState(false);

  return (
    <div className="sl-up sl-glass relative px-7 py-10 sm:px-10">
      {!unlocked && (
        <button
          onClick={() => setModal(true)}
          className="absolute right-5 top-5 text-[11px] text-muted-foreground hover:text-foreground transition"
        >
          Save & continue without unlocking
        </button>
      )}

      <p className="text-[11px] uppercase tracking-[0.24em] text-muted-foreground">Overall Band</p>
      <p className="font-display text-6xl leading-none mt-2">7.0</p>

      <table className="mt-8 w-full text-sm">
        <tbody>
          {CRITERIA.map(([k, v]) => (
            <tr key={k} className="border-t border-border">
              <td className="py-3 text-muted-foreground">{k}</td>
              <td className="py-3 text-right font-medium tabular-nums">{v}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="my-8 h-px bg-border" />

      {unlocked ? (
        <div className="sl-wipe space-y-5">
          <div className="flex items-center gap-2 text-brand text-xs uppercase tracking-[0.2em]">
            <Sparkles className="h-3.5 w-3.5" /> Detailed report
          </div>
          <Section
            title="Words & phrases to remember"
            items={["a considerable amount of", "off the beaten track", "to put it into perspective"]}
          />
          <Section
            title="Mistake sentences with corrections"
            items={[
              "“I very like travel” → “I really enjoy travelling.”",
              "“Last year I go to Japan” → “Last year I went to Japan.”",
            ]}
          />
          <Section
            title="Sentence-by-sentence improvement examples"
            items={[
              "“It was good.” → “It was genuinely memorable, mostly because of the people I met.”",
            ]}
          />
        </div>
      ) : (
        <div>
          <div className="space-y-3 blur-[6px] select-none pointer-events-none">
            {[
              "Words & phrases to remember",
              "Mistake sentences with corrections",
              "Sentence-by-sentence improvement examples",
            ].map((t) => (
              <div key={t}>
                <p className="text-sm font-medium">{t}</p>
                <div className="mt-2 h-2.5 w-11/12 rounded-full bg-foreground/15" />
                <div className="mt-1.5 h-2.5 w-8/12 rounded-full bg-foreground/10" />
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-sm text-foreground">Your detailed AI report is ready.</p>
              <div className="mt-2">
                <PriceTag original="¥9.9" now="¥4.5" note="(first-time offer)" tone="gold" />
              </div>
            </div>
            <button
              onClick={() => {
                setUnlocked(true);
                writeOnboarding({ reportUnlocked: true });
              }}
              className="sl-press inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background"
            >
              <Lock className="h-3.5 w-3.5" /> Unlock Full Report
            </button>
          </div>
        </div>
      )}

      <div className="mt-9 text-center">
        <button
          onClick={() => {
            writeOnboarding({ done: true });
            navigate({ to: "/" });
          }}
          className="text-xs text-muted-foreground hover:text-foreground transition"
        >
          Continue to Speaking Lab →
        </button>
      </div>

      {modal && (
        <div className="absolute inset-0 z-10 flex items-center justify-center rounded-[1.25rem] bg-background/40 backdrop-blur-[2px] px-6">
          <div className="sl-up sl-glass w-full max-w-sm px-7 py-8 text-center">
            <TriangleAlert className="mx-auto h-6 w-6 text-gold" />
            <p className="mt-4 text-sm">Your report will still be saved.</p>
            <p className="text-sm text-muted-foreground">You can unlock it anytime later.</p>
            <div className="mt-6 flex gap-3">
              <button
                onClick={() => {
                  setModal(false);
                  setUnlocked(true);
                  writeOnboarding({ reportUnlocked: true });
                }}
                className="sl-press flex-1 rounded-full bg-foreground px-4 py-2.5 text-sm text-background"
              >
                Unlock Now
              </button>
              <button
                onClick={() => {
                  setModal(false);
                  writeOnboarding({ done: true });
                  navigate({ to: "/" });
                }}
                className="sl-press flex-1 rounded-full border border-border px-4 py-2.5 text-sm"
              >
                Maybe Later
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Section({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <p className="text-sm font-medium">{title}</p>
      <ul className="mt-2 space-y-1.5 text-sm text-muted-foreground">
        {items.map((i) => (
          <li key={i}>· {i}</li>
        ))}
      </ul>
    </div>
  );
}
