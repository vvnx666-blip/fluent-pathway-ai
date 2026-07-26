import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/review/mistakes")({
  head: () => ({
    meta: [
      { title: "Mistakes Notebook · Cadence IELTS" },
      {
        name: "description",
        content: "Corrections from your recent IELTS speaking sessions, tagged and explained.",
      },
      { property: "og:title", content: "Mistakes Notebook — Cadence" },
      { property: "og:description", content: "Fix what to fix next." },
    ],
  }),
  component: MistakesPage,
});

type MistakeRow = { wrong: string; right: string; tag_en: string; tag_zh: string; note_en: string; note_zh: string };
const mistakes: MistakeRow[] = [
  { wrong: "I very like it", right: "I like it a lot", tag_en: "Grammar", tag_zh: "语法", note_en: "'Very' does not modify verbs — use 'a lot'.", note_zh: "very 不能修饰动词，应用 a lot。" },
  { wrong: "In nowadays society", right: "In today's society", tag_en: "Collocation", tag_zh: "搭配", note_en: "'Nowadays' is an adverb, not an adjective.", note_zh: "nowadays 是副词，不能作定语。" },
  { wrong: "More better", right: "Much better", tag_en: "Grammar", tag_zh: "语法", note_en: "Don't double comparatives.", note_zh: "比较级不能重复叠加。" },
  { wrong: "Discuss about", right: "Discuss", tag_en: "Preposition", tag_zh: "介词", note_en: "'Discuss' is transitive.", note_zh: "discuss 是及物动词，后面不加 about。" },
  { wrong: "Peoples are", right: "People are", tag_en: "Grammar", tag_zh: "语法", note_en: "'People' is already plural.", note_zh: "people 本身即为复数。" },
];

function MistakesPage() {
  const { t, lang } = useI18n();
  return (
    <AppShell crumb={`${t("reviewPage.crumb")} · ${t("shell.mistakes")}`}>
      <div>
        <Link to="/review" className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground">
          <ArrowLeft className="w-3 h-3" /> {lang === "zh" ? "返回复习中心" : "Back to Review Center"}
        </Link>
        <p className="mt-3 text-sm text-muted-foreground">{t("reviewPage.mistakesTitle")}</p>
        <h1 className="font-display text-4xl tracking-tight">{t("reviewPage.mistakesSub")}</h1>
      </div>

      <section className="rounded-2xl border border-border bg-card p-6">
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
    </AppShell>
  );
}
