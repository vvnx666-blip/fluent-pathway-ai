import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, ArrowRight, RotateCcw } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/review/flashcards")({
  head: () => ({
    meta: [
      { title: "Flashcards · Cadence IELTS" },
      {
        name: "description",
        content: "Spaced-repetition flashcards for your saved IELTS vocabulary.",
      },
      { property: "og:title", content: "Flashcards — Cadence" },
      { property: "og:description", content: "SM-2 spaced repetition for IELTS speaking vocab." },
    ],
  }),
  component: FlashcardsPage,
});

type Card = { front: string; back_en: string; back_zh: string; example: string };
const flashcards: Card[] = [
  { front: "quintessential", back_en: "(adj) representing the most perfect example", back_zh: "(adj) 典型的；最完美的", example: "It's the quintessential summer song." },
  { front: "to grapple with", back_en: "(phr) to struggle to deal with", back_zh: "(phr) 努力应对", example: "Students grapple with complex ideas." },
  { front: "nuanced", back_en: "(adj) showing subtle differences", back_zh: "(adj) 有细微差别的", example: "A nuanced argument avoids extremes." },
  { front: "burgeoning", back_en: "(adj) rapidly growing or developing", back_zh: "(adj) 迅速发展的", example: "A burgeoning tech industry." },
  { front: "to hinge on", back_en: "(phr) to depend entirely on", back_zh: "(phr) 取决于", example: "Success hinges on preparation." },
];

function FlashcardsPage() {
  const { t, lang } = useI18n();
  const [i, setI] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const card = flashcards[i];
  const next = () => { setFlipped(false); setI((v) => (v + 1) % flashcards.length); };
  const prev = () => { setFlipped(false); setI((v) => (v - 1 + flashcards.length) % flashcards.length); };

  return (
    <AppShell crumb={`${t("reviewPage.crumb")} · ${t("shell.flashcards")}`}>
      <div>
        <Link to="/review" className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground">
          <ArrowLeft className="w-3 h-3" /> {lang === "zh" ? "返回复习中心" : "Back to Review Center"}
        </Link>
        <p className="mt-3 text-sm text-muted-foreground">{t("reviewPage.cardsTitle")}</p>
        <h1 className="font-display text-4xl tracking-tight">{t("reviewPage.cardsSub")}</h1>
      </div>

      <section className="rounded-2xl border border-border bg-card p-6">
        <div className="mb-4 flex items-center justify-end">
          <div className="text-xs text-muted-foreground tabular-nums">
            {i + 1} {t("reviewPage.of")} {flashcards.length}
          </div>
        </div>

        <button
          onClick={() => setFlipped((v) => !v)}
          className="relative w-full aspect-[16/7] rounded-2xl border border-border bg-background grid place-items-center text-center px-6 hover:border-foreground/30 transition"
        >
          {!flipped ? (
            <div>
              <div className="font-display text-4xl">{card.front}</div>
              <div className="mt-3 text-xs text-muted-foreground">{t("reviewPage.flip")}</div>
            </div>
          ) : (
            <div>
              <div className="text-lg">{lang === "zh" ? card.back_zh : card.back_en}</div>
              <div className="mt-2 text-sm text-muted-foreground italic">"{card.example}"</div>
            </div>
          )}
        </button>

        <div className="mt-5 flex items-center gap-2">
          <button onClick={prev} className="h-9 px-3 rounded-md border border-border text-sm hover:bg-accent inline-flex items-center gap-1">
            <ArrowLeft className="w-3.5 h-3.5" /> {t("reviewPage.prev")}
          </button>
          <div className="flex-1 grid grid-cols-3 gap-2">
            <RateBtn onClick={next} tone="soft">{t("reviewPage.again")}</RateBtn>
            <RateBtn onClick={next} tone="mid">{t("reviewPage.good")}</RateBtn>
            <RateBtn onClick={next} tone="brand">{t("reviewPage.easy")}</RateBtn>
          </div>
          <button onClick={next} className="h-9 px-3 rounded-md border border-border text-sm hover:bg-accent inline-flex items-center gap-1">
            {t("reviewPage.next")} <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="mt-5 flex items-center gap-3 text-xs text-muted-foreground">
          <RotateCcw className="w-3.5 h-3.5" /> Spaced repetition · SM-2
        </div>
      </section>
    </AppShell>
  );
}

function RateBtn({ children, onClick, tone }: { children: React.ReactNode; onClick: () => void; tone: "soft" | "mid" | "brand" }) {
  const cls =
    tone === "brand"
      ? "bg-brand text-brand-foreground hover:brightness-105"
      : tone === "mid"
      ? "bg-foreground text-background hover:opacity-90"
      : "bg-muted text-foreground hover:bg-accent";
  return (
    <button onClick={onClick} className={`h-9 rounded-md text-sm font-medium transition ${cls}`}>
      {children}
    </button>
  );
}
