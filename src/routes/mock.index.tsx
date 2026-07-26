import { createFileRoute, Link } from "@tanstack/react-router";
import { GraduationCap, Sparkles, ArrowUpRight, Clock, Target } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/mock/")({
  head: () => ({
    meta: [
      { title: "Mock Test · Cadence IELTS" },
      {
        name: "description",
        content:
          "Choose between a full 14-minute IELTS speaking mock test or focused topic drills.",
      },
      { property: "og:title", content: "Mock Test — Cadence" },
      { property: "og:description", content: "Full mock or targeted topic drill." },
    ],
  }),
  component: MockHub,
});

function MockHub() {
  const { t, lang } = useI18n();
  const tx = (en: string, zh: string) => (lang === "zh" ? zh : en);

  return (
    <AppShell crumb={t("mock.crumb")}>
      <div>
        <p className="text-sm text-muted-foreground">{t("mock.eyebrow")}</p>
        <h1 className="font-display text-4xl tracking-tight">
          {tx("Choose your session.", "选择训练方式。")}
        </h1>
      </div>

      <section className="grid gap-4 md:grid-cols-2">
        <HubCard
          to="/mock/full"
          icon={GraduationCap}
          eyebrow={tx("Full Mock", "全真模考")}
          title={tx("14-minute AI examiner", "14 分钟 AI 考官")}
          desc={tx(
            "Part 1, 2 and 3 back-to-back. Band scores for fluency, lexical resource, grammar and pronunciation.",
            "Part 1、2、3 连贯进行，覆盖流利度、词汇、语法与发音四项评分。",
          )}
          meta={[
            { icon: Clock, label: tx("~ 14 minutes", "约 14 分钟") },
            { icon: Target, label: tx("Full band report", "完整分数报告") },
          ]}
          accent
        />
        <HubCard
          to="/mock/drill"
          icon={Sparkles}
          eyebrow={tx("Topic Drill", "专题训练")}
          title={tx("One Part, one theme", "单 Part 单主题")}
          desc={tx(
            "Pick a Part and a topic. Practice unlimited, or turn on AI grading for detailed feedback.",
            "选一个 Part 与话题：可无限练习，或开启 AI 评分获得详细反馈。",
          )}
          meta={[
            { icon: Clock, label: tx("~ 3–5 minutes", "约 3–5 分钟") },
            { icon: Sparkles, label: tx("Optional AI grade", "可选 AI 评分") },
          ]}
        />
      </section>
    </AppShell>
  );
}

function HubCard({
  to,
  icon: Icon,
  eyebrow,
  title,
  desc,
  meta,
  accent,
}: {
  to: string;
  icon: React.ComponentType<{ className?: string }>;
  eyebrow: string;
  title: string;
  desc: string;
  meta: { icon: React.ComponentType<{ className?: string }>; label: string }[];
  accent?: boolean;
}) {
  return (
    <Link
      to={to}
      className={`group relative overflow-hidden rounded-2xl border p-6 transition ${
        accent
          ? "bg-foreground text-background border-transparent hover:brightness-110"
          : "bg-card border-border hover:border-foreground/30"
      }`}
    >
      {accent && (
        <div className="absolute -right-16 -top-16 w-56 h-56 rounded-full bg-brand/30 blur-3xl pointer-events-none" />
      )}
      <div className="relative">
        <div className="flex items-start justify-between">
          <div
            className={`w-11 h-11 rounded-lg grid place-items-center ${
              accent ? "bg-brand text-brand-foreground" : "bg-muted text-foreground"
            }`}
          >
            <Icon className="w-5 h-5" />
          </div>
          <ArrowUpRight
            className={`w-4 h-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 ${
              accent ? "text-background/70" : "text-muted-foreground"
            }`}
          />
        </div>
        <div
          className={`mt-5 text-[11px] uppercase tracking-wider ${
            accent ? "text-background/60" : "text-muted-foreground"
          }`}
        >
          {eyebrow}
        </div>
        <div className="mt-1.5 font-display text-2xl leading-tight">{title}</div>
        <p
          className={`mt-2 text-sm leading-relaxed ${
            accent ? "text-background/70" : "text-muted-foreground"
          }`}
        >
          {desc}
        </p>
        <div className="mt-5 flex flex-wrap gap-x-4 gap-y-1.5">
          {meta.map((m, i) => (
            <span
              key={i}
              className={`inline-flex items-center gap-1.5 text-[11px] ${
                accent ? "text-background/60" : "text-muted-foreground"
              }`}
            >
              <m.icon className="w-3 h-3" /> {m.label}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}
