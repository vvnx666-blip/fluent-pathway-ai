import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Gift, Mail } from "lucide-react";
import {
  CircleOption,
  PaperShell,
  Pill,
  Sheet,
  useTypewriter,
} from "@/components/speaking-lab-ui";
import { writeOnboarding } from "@/lib/onboarding";

export const Route = createFileRoute("/welcome")({
  head: () => ({
    meta: [
      { title: "Begin · Speaking Lab IELTS Onboarding" },
      {
        name: "description",
        content:
          "A quiet, paper-inspired onboarding: set your target IELTS Speaking band, your exam date, and unlock a free mock test.",
      },
      { property: "og:title", content: "Speaking Lab — Begin your IELTS journey" },
      {
        property: "og:description",
        content: "Answer three short questions and unlock your free IELTS Speaking mock test.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Welcome,
});

type Step = "q1" | "q2" | "band" | "auth" | "exam" | "planning" | "gift";

function Welcome() {
  const [step, setStep] = useState<Step>("q1");
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const pick = (key: string, value: string, next: Step) => {
    setAnswers((a) => ({ ...a, [key]: value }));
    writeOnboarding({ [key]: value } as never);
    setTimeout(() => setStep(next), 520);
  };

  return (
    <PaperShell>
      {step === "q1" && <Opening answers={answers} pick={pick} />}
      {step === "q2" && <Question2 answers={answers} pick={pick} />}
      {step === "band" && <BandStep answers={answers} pick={pick} />}
      {step === "auth" && <AuthStep onDone={() => setStep("exam")} />}
      {step === "exam" && <ExamStep answers={answers} pick={pick} />}
      {step === "planning" && <PlanningMoment onDone={() => setStep("gift")} />}
      {step === "gift" && <GiftStep />}
    </PaperShell>
  );
}

type PickFn = (key: string, value: string, next: Step) => void;

/* ------------------------------ Screen one ------------------------------ */

function Opening({ answers, pick }: { answers: Record<string, string>; pick: PickFn }) {
  const { out, done } = useTypewriter([
    "IELTS Speaking Preparation",
    "Hello.",
    "Are you ready to achieve your target IELTS Speaking score?",
  ]);

  return (
    <div className="sl-drop sl-glass px-8 py-14 sm:px-12">
      <p className="text-[11px] uppercase tracking-[0.28em] text-muted-foreground min-h-5">
        {out[0]}
      </p>
      <p className="mt-10 font-display text-4xl min-h-11">{out[1]}</p>
      <p className="mt-4 font-display text-3xl sm:text-4xl leading-[1.15] min-h-20">{out[2]}</p>

      {done && (
        <div className="mt-10 space-y-1">
          <CircleOption
            label="Yes"
            selected={answers.ready === "yes"}
            onClick={() => pick("ready", "yes", "q2")}
          />
          <CircleOption
            label="Not yet"
            delay={120}
            selected={answers.ready === "not-yet"}
            onClick={() => pick("ready", "not-yet", "q2")}
          />
        </div>
      )}
    </div>
  );
}

function Question2({ answers, pick }: { answers: Record<string, string>; pick: PickFn }) {
  const { out, done } = useTypewriter(["Have you taken the IELTS Speaking test before?"], 34, 200);
  return (
    <Sheet flipKey="q2">
      <p className="font-display text-3xl sm:text-4xl leading-[1.15] min-h-20">{out[0]}</p>
      {done && (
        <div className="mt-10 space-y-1">
          <CircleOption
            label="Yes"
            selected={answers.tested === "yes"}
            onClick={() => pick("tested", "yes", "band")}
          />
          <CircleOption
            label="No"
            delay={120}
            selected={answers.tested === "no"}
            onClick={() => pick("tested", "no", "band")}
          />
        </div>
      )}
    </Sheet>
  );
}

const BANDS = ["6.0", "6.5", "7.0", "7.5", "8.0+"];

function BandStep({ answers, pick }: { answers: Record<string, string>; pick: PickFn }) {
  const { out, done } = useTypewriter(["What's your target Speaking Band?"], 34, 200);
  return (
    <Sheet flipKey="band">
      <p className="font-display text-3xl sm:text-4xl leading-[1.15] min-h-14">{out[0]}</p>
      {done && (
        <div className="mt-10 flex flex-wrap gap-3">
          {BANDS.map((b, i) => (
            <Pill
              key={b}
              delay={i * 70}
              selected={answers.targetBand === b}
              onClick={() => pick("targetBand", b, "auth")}
            >
              {b}
            </Pill>
          ))}
        </div>
      )}
    </Sheet>
  );
}

/* ------------------------------ Screen two ------------------------------ */

function AuthStep({ onDone }: { onDone: () => void }) {
  const [email, setEmail] = useState(false);
  const inChina =
    typeof navigator !== "undefined" && /zh-CN|zh-Hans/i.test(navigator.language || "");

  const providers = inChina
    ? ["Continue with Google", "Continue with WeChat", "Continue with Apple"]
    : ["Continue with Google", "Continue with Apple"];

  return (
    <div className="sl-up sl-glass mx-auto max-w-[420px] px-8 py-12">
      <h1 className="font-display text-3xl text-center">Continue your journey.</h1>

      <div className="mt-9 flex flex-col gap-3">
        {providers.map((p) => (
          <button
            key={p}
            onClick={onDone}
            className="sl-press flex items-center gap-3 rounded-full border border-border bg-background/70 px-5 py-3 text-sm hover:border-brand/50"
          >
            <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-secondary text-[11px] font-semibold">
              {p.includes("Google") ? "G" : p.includes("WeChat") ? "微" : ""}
            </span>
            {p}
          </button>
        ))}

        <div className="my-1 h-px bg-border" />

        <button
          onClick={() => setEmail(true)}
          className="sl-press flex items-center gap-3 rounded-full border border-border bg-background/70 px-5 py-3 text-sm hover:border-brand/50"
        >
          <Mail className="h-4 w-4" />
          Continue with Email
        </button>

        {email && (
          <div className="sl-up flex flex-col gap-3 pt-1">
            <input
              placeholder="Email"
              className="rounded-xl border border-border bg-background/80 px-4 py-3 text-sm outline-none focus:border-brand"
            />
            <input
              placeholder="Verification code"
              className="rounded-xl border border-border bg-background/80 px-4 py-3 text-sm outline-none focus:border-brand"
            />
            <input
              placeholder="Invitation code (optional)"
              className="rounded-xl border border-border bg-background/80 px-4 py-3 text-sm outline-none focus:border-brand"
            />
            <button
              onClick={onDone}
              className="sl-press rounded-full bg-foreground px-5 py-3 text-sm font-medium text-background"
            >
              Continue
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

/* ----------------------------- Screen three ----------------------------- */

const WINDOWS = ["Within 2 weeks", "Within 1 month", "Within 2 months", "More than 2 months"];

function ExamStep({ answers, pick }: { answers: Record<string, string>; pick: PickFn }) {
  return (
    <div className="sl-up sl-glass px-8 py-12 sm:px-12">
      <p className="font-display text-3xl sm:text-4xl">📅 When is your IELTS exam?</p>
      <div className="mt-9 flex flex-col items-start gap-3">
        {WINDOWS.map((w, i) => (
          <Pill
            key={w}
            delay={i * 70}
            selected={answers.examWindow === w}
            onClick={() => pick("examWindow", w, "planning")}
          >
            {w}
          </Pill>
        ))}
      </div>
    </div>
  );
}

function PlanningMoment({ onDone }: { onDone: () => void }) {
  useEffect(() => {
    const t = setTimeout(onDone, 1200);
    return () => clearTimeout(t);
  }, [onDone]);
  return (
    <p className="sl-up text-center font-display text-3xl sm:text-4xl">
      Your personalized study plan is ready.
    </p>
  );
}

/* ------------------------------ Screen four ----------------------------- */

function GiftStep() {
  const navigate = useNavigate();
  const particles = Array.from({ length: 18 }, (_, i) => {
    const angle = (i / 18) * Math.PI * 2;
    return {
      dx: `${Math.cos(angle) * (70 + (i % 4) * 22)}px`,
      dy: `${Math.sin(angle) * (70 + (i % 3) * 26)}px`,
      gold: i % 2 === 0,
      delay: i * 22,
    };
  });

  return (
    <div className="sl-up text-center">
      <div className="relative mx-auto h-24 w-24">
        {particles.map((p, i) => (
          <span
            key={i}
            className="sl-burst absolute left-1/2 top-1/2 h-1.5 w-1.5 rounded-full"
            style={
              {
                "--dx": p.dx,
                "--dy": p.dy,
                animationDelay: `${p.delay}ms`,
                backgroundColor: p.gold ? "var(--gold)" : "var(--brand)",
              } as React.CSSProperties
            }
          />
        ))}
        <Gift
          className="relative h-24 w-24 text-brand"
          style={{ animation: "sl-drop 0.7s cubic-bezier(0.2,1.4,0.3,1) both" }}
          strokeWidth={1.1}
        />
      </div>

      <p className="mt-8 text-sm uppercase tracking-[0.24em] text-muted-foreground">
        You've unlocked
      </p>
      <h1 className="mt-3 font-display text-4xl sm:text-5xl leading-tight">
        1 Free IELTS Speaking Mock Test
      </h1>

      <button
        onClick={() => {
          writeOnboarding({ done: true });
          navigate({ to: "/report" });
        }}
        className="sl-press sl-glow mt-10 rounded-full bg-foreground px-8 py-4 text-sm font-medium text-background"
      >
        Start My Mock Test
      </button>
    </div>
  );
}
