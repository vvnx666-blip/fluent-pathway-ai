import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  NotebookPen,
  BookOpen,
  Layers,
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  type LucideIcon,
} from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { useI18n, type Lang } from "@/lib/i18n";

export const Route = createFileRoute("/review")({
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
  component: ReviewPage,
});

type MistakeRow = { wrong: string; right: string; tag_en: string; tag_zh: string; note_en: string; note_zh: string };
const mistakes: MistakeRow[] = [
  { wrong: "I very like it", right: "I like it a lot", tag_en: "Grammar", tag_zh: "语法", note_en: "'Very' does not modify verbs — use 'a lot'.", note_zh: "very 不能修饰动词，应用 a lot。" },
  { wrong: "In nowadays society", right: "In today's society", tag_en: "Collocation", tag_zh: "搭配", note_en: "'Nowadays' is an adverb, not an adjective.", note_zh: "nowadays 是副词，不能作定语。" },
  { wrong: "More better", right: "Much better", tag_en: "Grammar", tag_zh: "语法", note_en: "Don't double comparatives.", note_zh: "比较级不能重复叠加。" },
  { wrong: "Discuss about", right: "Discuss", tag_en: "Preposition", tag_zh: "介词", note_en: "'Discuss' is transitive.", note_zh: "discuss 是及物动词，后面不加 about。" },
  { wrong: "Peoples are", right: "People are", tag_en: "Grammar", tag_zh: "语法", note_en: "'People' is already plural.", note_zh: "people 本身即为复数。" },
];

type VocabRow = { word: string; pos: string; en: string; zh: string; example: string };
const vocab: VocabRow[] = [
  { word: "quintessential", pos: "adj", en: "representing the most perfect example", zh: "典型的；最完美的", example: "It's the quintessential summer song." },
  { word: "to grapple with", pos: "phr", en: "to struggle to deal with", zh: "努力应对", example: "Students grapple with complex ideas." },
  { word: "nuanced", pos: "adj", en: "showing subtle differences", zh: "有细微差别的", example: "A nuanced argument avoids extremes." },
  { word: "burgeoning", pos: "adj", en: "rapidly growing or developing", zh: "迅速发展的", example: "A burgeoning tech industry." },
  { word: "to hinge on", pos: "phr", en: "to depend entirely on", zh: "取决于", example: "Success hinges on preparation." },
];

type Card = { front: string; back_en: string; back_zh: string; example: string };
const flashcards: Card[] = vocab.map((v) => ({
  front: v.word,
  back_en: `(${v.pos}) ${v.en}`,
  back_zh: `(${v.pos}) ${v.zh}`,
  example: v.example,
}));

function ReviewPage() {
  const { t } = useI18n();
  const [tab, setTab] = useState<"mistakes" | "vocab" | "cards">("mistakes");

  return (
    <AppShell crumb={t("reviewPage.crumb")}>
      <div>
        <p className="text-sm text-muted-foreground">{t("reviewPage.eyebrow")}</p>
        <h1 className="font-display text-4xl tracking-tight">
          {t("reviewPage.headline")}
        </h1>
      </div>

      <section className="grid gap-4 md:grid-cols-3">
        <StatCard icon={NotebookPen} label={t("shell.mistakes")} value="42" sub="8 due today" onClick={() => setTab("mistakes")} active={tab === "mistakes"} />
        <StatCard icon={BookOpen} label={t("shell.vocabulary")} value="128" sub="12 new this week" onClick={() => setTab("vocab")} active={tab === "vocab"} />
        <StatCard icon={Layers} label={t("shell.flashcards")} value={String(flashcards.length)} sub="due for review" accent onClick={() => setTab("cards")} active={tab === "cards"} />
      </section>

      <div className="inline-flex items-center gap-1 h-9 p-1 rounded-lg border border-border bg-card text-sm">
        <TabBtn active={tab === "mistakes"} onClick={() => setTab("mistakes")}>{t("reviewPage.tab.mistakes")}</TabBtn>
        <TabBtn active={tab === "vocab"} onClick={() => setTab("vocab")}>{t("reviewPage.tab.vocab")}</TabBtn>
        <TabBtn active={tab === "cards"} onClick={() => setTab("cards")}>{t("reviewPage.tab.cards")}</TabBtn>
      </div>

      {tab === "mistakes" && <MistakesPanel />}
      {tab === "vocab" && <VocabPanel />}
      {tab === "cards" && <CardsPanel />}
    </AppShell>
  );
}

function TabBtn({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className={`h-7 px-3 rounded-md transition ${
        active ? "bg-foreground text-background font-medium" : "text-muted-foreground hover:text-foreground"
      }`}
    >
      {children}
    </button>
  );
}

function MistakesPanel() {
  const { t, lang } = useI18n();
  return (
    <section className="rounded-2xl border border-border bg-card p-6">
      <div className="mb-4">
        <div className="text-[11px] uppercase tracking-wider text-muted-foreground">{t("reviewPage.mistakesTitle")}</div>
        <h3 className="mt-1 font-display text-xl">{t("reviewPage.mistakesSub")}</h3>
      </div>
      <ul className="divide-y divide-border">
        {mistakes.map((m, i) => (
          <li key={i} className="py-4 flex items-start gap-4">
            <div className="flex-1 min-w-0">
              <div className="text-sm">
                <span className="line-through text-muted-foreground">{m.wrong}</span>
                <ArrowRight className="inline w-3 h-3 mx-1.5 text-muted-foreground" />
                <span className="font-medium">{m.right}</span>
              </div>
              <div className="mt-1 text-xs text-muted-foreground">
                {lang === "zh" ? m.note_zh : m.note_en}
              </div>
            </div>
            <span className="text-[10px] uppercase tracking-wider text-muted-foreground px-1.5 py-0.5 rounded border border-border shrink-0">
              {lang === "zh" ? m.tag_zh : m.tag_en}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}

function VocabPanel() {
  const { t, lang } = useI18n();
  return (
    <section className="rounded-2xl border border-border bg-card p-6">
      <div className="mb-4">
        <div className="text-[11px] uppercase tracking-wider text-muted-foreground">{t("reviewPage.vocabTitle")}</div>
        <h3 className="mt-1 font-display text-xl">{t("reviewPage.vocabSub")}</h3>
      </div>
      <ul className="divide-y divide-border">
        {vocab.map((v, i) => (
          <li key={i} className="py-4">
            <div className="flex items-baseline gap-3">
              <span className="font-display text-lg">{v.word}</span>
              <span className="text-[10px] italic text-muted-foreground">{v.pos}</span>
              <span className="text-sm text-muted-foreground">{lang === "zh" ? v.zh : v.en}</span>
            </div>
            <div className="mt-1 text-xs text-muted-foreground italic">"{v.example}"</div>
          </li>
        ))}
      </ul>
    </section>
  );
}

function CardsPanel() {
  const { t, lang } = useI18n();
  const [i, setI] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const card = flashcards[i];
  const next = () => { setFlipped(false); setI((v) => (v + 1) % flashcards.length); };
  const prev = () => { setFlipped(false); setI((v) => (v - 1 + flashcards.length) % flashcards.length); };

  return (
    <section className="rounded-2xl border border-border bg-card p-6">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <div className="text-[11px] uppercase tracking-wider text-muted-foreground">{t("reviewPage.cardsTitle")}</div>
          <h3 className="mt-1 font-display text-xl">{t("reviewPage.cardsSub")}</h3>
        </div>
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

function StatCard({
  icon: Icon,
  label,
  value,
  sub,
  accent,
  active,
  onClick,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
  sub: string;
  accent?: boolean;
  active?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`text-left rounded-2xl border p-5 transition ${
        active
          ? "border-foreground/40 bg-background"
          : accent
          ? "bg-brand-soft border-brand/30 hover:border-brand/60"
          : "bg-card border-border hover:border-foreground/30"
      }`}
    >
      <div className="flex items-center gap-2 text-[11px] uppercase tracking-wider text-muted-foreground">
        <Icon className="w-3.5 h-3.5" /> {label}
      </div>
      <div className="mt-3 font-display text-4xl tabular-nums">{value}</div>
      <div className="mt-1 text-xs text-muted-foreground">{sub}</div>
    </button>
  );
}
