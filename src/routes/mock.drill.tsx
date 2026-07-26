import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { TopicDrill } from "@/components/topic-drill";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/mock/drill")({
  head: () => ({
    meta: [
      { title: "Topic Drill · Cadence IELTS" },
      {
        name: "description",
        content:
          "Pick a Part and a topic, then drill it with or without AI grading — targeted IELTS speaking practice.",
      },
      { property: "og:title", content: "Topic Drill — Cadence" },
      { property: "og:description", content: "One Part, one theme. Deep focused drills." },
    ],
  }),
  component: DrillPage,
});

function DrillPage() {
  const { t, lang } = useI18n();
  return (
    <AppShell crumb={`${t("mock.crumb")} · ${lang === "zh" ? "专题训练" : "Topic Drill"}`}>
      <div>
        <Link
          to="/mock"
          className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="w-3 h-3" /> {lang === "zh" ? "返回模拟考试" : "Back to Mock Test"}
        </Link>
        <p className="mt-3 text-sm text-muted-foreground">
          {lang === "zh" ? "针对性训练" : "Targeted drill"}
        </p>
        <h1 className="font-display text-4xl tracking-tight">
          {lang === "zh" ? "选一个 Part，单项突破。" : "Pick one Part. Go deep."}
        </h1>
      </div>

      <TopicDrill />
    </AppShell>
  );
}
