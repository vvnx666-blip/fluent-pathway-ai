import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/review/vocabulary")({
  head: () => ({
    meta: [
      { title: "Vocabulary Notebook · Cadence IELTS" },
      {
        name: "description",
        content: "Words and phrases you've saved from your IELTS speaking practice.",
      },
      { property: "og:title", content: "Vocabulary Notebook — Cadence" },
      { property: "og:description", content: "Your saved IELTS vocabulary." },
    ],
  }),
  component: VocabPage,
});

type VocabRow = { word: string; pos: string; en: string; zh: string; example: string };
const vocab: VocabRow[] = [
  { word: "quintessential", pos: "adj", en: "representing the most perfect example", zh: "典型的；最完美的", example: "It's the quintessential summer song." },
  { word: "to grapple with", pos: "phr", en: "to struggle to deal with", zh: "努力应对", example: "Students grapple with complex ideas." },
  { word: "nuanced", pos: "adj", en: "showing subtle differences", zh: "有细微差别的", example: "A nuanced argument avoids extremes." },
  { word: "burgeoning", pos: "adj", en: "rapidly growing or developing", zh: "迅速发展的", example: "A burgeoning tech industry." },
  { word: "to hinge on", pos: "phr", en: "to depend entirely on", zh: "取决于", example: "Success hinges on preparation." },
];

function VocabPage() {
  const { t, lang } = useI18n();
  return (
    <AppShell crumb={`${t("reviewPage.crumb")} · ${t("shell.vocabulary")}`}>
      <div>
        <Link to="/review" className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground">
          <ArrowLeft className="w-3 h-3" /> {lang === "zh" ? "返回复习中心" : "Back to Review Center"}
        </Link>
        <p className="mt-3 text-sm text-muted-foreground">{t("reviewPage.vocabTitle")}</p>
        <h1 className="font-display text-4xl tracking-tight">{t("reviewPage.vocabSub")}</h1>
      </div>

      <section className="rounded-2xl border border-border bg-card p-6">
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
    </AppShell>
  );
}
