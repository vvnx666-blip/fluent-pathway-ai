import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Volume2 } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/review/mistakes")({
  head: () => ({
    meta: [
      { title: "Mistakes Notebook · Cadence" },
      {
        name: "description",
        content: "Grammar, phrasing, and pronunciation corrections from your speaking sessions — with a listen button for the right pronunciation.",
      },
      { property: "og:title", content: "Mistakes Notebook — Cadence" },
      { property: "og:description", content: "Fix grammar, phrasing, and pronunciation." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: MistakesPage,
});

type MistakeKind = "language" | "pronunciation";
type MistakeRow = {
  kind: MistakeKind;
  wrong: string;
  right: string;
  tag_en: string;
  tag_zh: string;
  note_en: string;
  note_zh: string;
  ipa?: string;
  speak?: string;
};

const rows: MistakeRow[] = [
  { kind: "language", wrong: "I very like it", right: "I like it a lot", tag_en: "Grammar", tag_zh: "语法", note_en: "'Very' does not modify verbs — use 'a lot'.", note_zh: "very 不能修饰动词，应用 a lot。" },
  { kind: "language", wrong: "In nowadays society", right: "In today's society", tag_en: "Collocation", tag_zh: "搭配", note_en: "'Nowadays' is an adverb, not an adjective.", note_zh: "nowadays 是副词，不能作定语。" },
  { kind: "language", wrong: "More better", right: "Much better", tag_en: "Grammar", tag_zh: "语法", note_en: "Don't double comparatives.", note_zh: "比较级不能重复叠加。" },
  { kind: "pronunciation", wrong: "com-fort-a-ble  /ˌkɒmˈfɔːtəbəl/", right: "comfortable  /ˈkʌmftəbəl/", tag_en: "Stress", tag_zh: "重音", note_en: "3 syllables, stress on the first — 'KUMF-tuh-bul'.", note_zh: "读三个音节，重音在第一个：KUMF-tuh-bul。", ipa: "/ˈkʌmftəbəl/", speak: "comfortable" },
  { kind: "pronunciation", wrong: "clothes  /kloʊðɪz/", right: "clothes  /kloʊðz/", tag_en: "Ending", tag_zh: "尾音", note_en: "One syllable — do not add an extra 'iz'.", note_zh: "只有一个音节，不要多念一个 'iz'。", ipa: "/kloʊðz/", speak: "clothes" },
  { kind: "pronunciation", wrong: "focus  /ˈfoʊkəs/ → /ˈfɒkəs/", right: "focus  /ˈfoʊkəs/", tag_en: "Vowel", tag_zh: "元音", note_en: "The 'o' is a long 'oh', not short 'ah'.", note_zh: "'o' 是长音 'oh'，不是短促的 'ah'。", ipa: "/ˈfoʊkəs/", speak: "focus" },
  { kind: "pronunciation", wrong: "vegetable  /ˈvedʒɪˌteɪbəl/", right: "vegetable  /ˈvedʒtəbəl/", tag_en: "Reduction", tag_zh: "弱读", note_en: "3 syllables in natural speech — 'VEJ-tuh-bul'.", note_zh: "自然口语只念三个音节：VEJ-tuh-bul。", ipa: "/ˈvedʒtəbəl/", speak: "vegetable" },
];

function speak(word: string) {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
  const u = new SpeechSynthesisUtterance(word);
  u.lang = "en-US";
  u.rate = 0.92;
  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(u);
}

function MistakesPage() {
  const { t, lang } = useI18n();
  const tx = (en: string, zh: string) => (lang === "zh" ? zh : en);

  const language = rows.filter((r) => r.kind === "language");
  const pron = rows.filter((r) => r.kind === "pronunciation");

  return (
    <AppShell crumb={`${t("reviewPage.crumb")} · ${t("shell.mistakes")}`}>
      <div>
        <Link to="/review" className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground">
          <ArrowLeft className="w-3 h-3" /> {tx("Back to Review Center", "返回复习中心")}
        </Link>
        <p className="mt-3 text-sm text-muted-foreground">{t("reviewPage.mistakesTitle")}</p>
        <h1 className="font-display text-4xl tracking-tight">{t("reviewPage.mistakesSub")}</h1>
      </div>

      <section className="rounded-2xl border border-border bg-card p-6">
        <div className="flex items-baseline justify-between mb-4">
          <h2 className="font-display text-xl">{tx("Pronunciation & accent", "发音与口音")}</h2>
          <span className="text-xs text-muted-foreground">
            {tx("Tap ▶ to hear the correct pronunciation", "点击 ▶ 收听正确发音")}
          </span>
        </div>
        <ul className="divide-y divide-border">
          {pron.map((m, i) => (
            <li key={i} className="py-4 flex items-start gap-4">
              <button
                onClick={() => m.speak && speak(m.speak)}
                aria-label={tx(`Play ${m.speak}`, `播放 ${m.speak}`)}
                className="w-9 h-9 shrink-0 rounded-full bg-foreground text-background grid place-items-center hover:brightness-110 transition"
              >
                <Volume2 className="w-4 h-4" />
              </button>
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

      <section className="rounded-2xl border border-border bg-card p-6">
        <h2 className="font-display text-xl mb-4">{tx("Grammar & phrasing", "语法与表达")}</h2>
        <ul className="divide-y divide-border">
          {language.map((m, i) => (
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
    </AppShell>
  );
}
