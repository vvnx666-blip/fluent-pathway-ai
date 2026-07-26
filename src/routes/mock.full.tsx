import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  GraduationCap,
  Play,
  Clock,
  Mic,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Shuffle,
  Square,
  Plane,
  Cpu,
  Leaf,
  Briefcase,
  Film,
  Utensils,
  BookOpen,
  Heart,
  type LucideIcon,
} from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { useI18n, type Lang } from "@/lib/i18n";

export const Route = createFileRoute("/mock/full")({
  head: () => ({
    meta: [
      { title: "Full Mock Test · Cadence IELTS" },
      {
        name: "description",
        content:
          "Full IELTS speaking mock test with an AI examiner — real timing, real pressure, instant band feedback.",
      },
      { property: "og:title", content: "Full Mock — Cadence" },
      { property: "og:description", content: "Simulate the full IELTS speaking test with an AI examiner." },
    ],
  }),
  component: FullMockPage,
});

type Topic = { id: string; icon: LucideIcon; en: string; zh: string; sample: { en: string; zh: string } };

const topics: Topic[] = [
  { id: "travel", icon: Plane, en: "Travel & journeys", zh: "旅行与出行", sample: { en: "Describe a memorable trip you've taken.", zh: "描述一段令你难忘的旅行。" } },
  { id: "tech", icon: Cpu, en: "Technology & society", zh: "科技与社会", sample: { en: "How has technology changed the way we learn?", zh: "科技如何改变了我们学习的方式？" } },
  { id: "env", icon: Leaf, en: "Environment", zh: "环境议题", sample: { en: "What can individuals do to protect the environment?", zh: "个人可以做什么来保护环境？" } },
  { id: "work", icon: Briefcase, en: "Work & study", zh: "工作与学习", sample: { en: "Talk about a skill you'd like to learn.", zh: "谈谈一项你想学习的技能。" } },
  { id: "media", icon: Film, en: "Media & entertainment", zh: "媒体与娱乐", sample: { en: "Describe a film that left an impression on you.", zh: "描述一部令你印象深刻的电影。" } },
  { id: "food", icon: Utensils, en: "Food & culture", zh: "饮食与文化", sample: { en: "Describe a traditional dish from your country.", zh: "描述一道你家乡的传统菜。" } },
  { id: "edu", icon: BookOpen, en: "Education", zh: "教育", sample: { en: "Should schools focus more on creativity or exams?", zh: "学校应更注重创造力还是考试？" } },
  { id: "health", icon: Heart, en: "Health & lifestyle", zh: "健康与生活方式", sample: { en: "How do you keep a healthy lifestyle?", zh: "你如何保持健康的生活方式？" } },
];

const history = [
  { date: "Feb 24", band: 6.5, dur: "13:42" },
  { date: "Feb 19", band: 6.0, dur: "14:08" },
  { date: "Feb 12", band: 6.0, dur: "12:55" },
];

function label(lang: Lang, topic: Topic) {
  return lang === "zh" ? topic.zh : topic.en;
}
function sample(lang: Lang, topic: Topic) {
  return lang === "zh" ? topic.sample.zh : topic.sample.en;
}

function FullMockPage() {
  const { t, lang } = useI18n();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [running, setRunning] = useState(false);
  const selected = topics.find((tp) => tp.id === selectedId) ?? null;

  const pickRandom = () => {
    const pool = topics.filter((tp) => tp.id !== selectedId);
    const next = pool[Math.floor(Math.random() * pool.length)];
    setSelectedId(next.id);
  };

  return (
    <AppShell crumb={`${t("mock.crumb")} · ${lang === "zh" ? "全真模考" : "Full Mock"}`}>
      <div>
        <Link
          to="/mock"
          className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="w-3 h-3" /> {lang === "zh" ? "返回模拟考试" : "Back to Mock Test"}
        </Link>
        <p className="mt-3 text-sm text-muted-foreground">{t("mock.eyebrow")}</p>
        <h1 className="font-display text-4xl tracking-tight">
          <span className="text-brand">{t("mock.headline")}</span>
        </h1>
      </div>

      <section className="relative overflow-hidden rounded-2xl bg-foreground text-background p-8">
        <div className="absolute -right-16 -top-16 w-72 h-72 rounded-full bg-brand/25 blur-3xl" />
        <div className="relative flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-wider text-background/60">
              <GraduationCap className="w-3 h-3" /> {t("mock.aiExaminer")}
            </div>
            <h2 className="mt-3 font-display text-5xl leading-[1]">
              {running ? t("mock.recording") : t("mock.ready")}
            </h2>
            <p className="mt-4 text-sm text-background/70 leading-relaxed">{t("mock.copy")}</p>

            <div className="mt-5 rounded-xl border border-background/15 bg-background/[0.04] p-4">
              <div className="text-[10px] uppercase tracking-wider text-background/50">
                {t("mock.selected")}
              </div>
              {selected ? (
                <>
                  <div className="mt-1 font-display text-2xl">{label(lang, selected)}</div>
                  <div className="mt-1 text-xs text-background/60">{sample(lang, selected)}</div>
                </>
              ) : (
                <div className="mt-1 text-sm text-background/50">{t("mock.noneSelected")}</div>
              )}
            </div>

            <div className="mt-5 flex flex-wrap gap-2">
              {!running ? (
                <button
                  onClick={() => selected && setRunning(true)}
                  disabled={!selected}
                  className="inline-flex items-center gap-2 h-10 px-4 rounded-lg bg-brand text-brand-foreground text-sm font-medium disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <Play className="w-4 h-4" /> {t("mock.start")}
                </button>
              ) : (
                <button
                  onClick={() => setRunning(false)}
                  className="inline-flex items-center gap-2 h-10 px-4 rounded-lg bg-brand text-brand-foreground text-sm font-medium"
                >
                  <Square className="w-4 h-4" /> {t("mock.stop")}
                </button>
              )}
              <button
                onClick={pickRandom}
                className="inline-flex items-center gap-2 h-10 px-4 rounded-lg border border-background/15 text-sm font-medium hover:bg-background/5"
              >
                <Shuffle className="w-4 h-4" /> {t("mock.random")}
              </button>
              <button className="inline-flex items-center gap-2 h-10 px-4 rounded-lg border border-background/15 text-sm font-medium hover:bg-background/5">
                <Mic className="w-4 h-4" /> Mic check
              </button>
            </div>
          </div>

          <div className="lg:w-56 grid grid-cols-2 gap-3">
            <div className="rounded-lg border border-background/10 bg-background/[0.03] p-3">
              <div className="text-[10px] uppercase tracking-wider text-background/50">
                {t("mock.lastBand")}
              </div>
              <div className="font-display text-3xl mt-1">6.5</div>
            </div>
            <div className="rounded-lg border border-background/10 bg-background/[0.03] p-3">
              <div className="text-[10px] uppercase tracking-wider text-background/50">
                {t("mock.testsDone")}
              </div>
              <div className="font-display text-3xl mt-1">7</div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="flex items-end justify-between mb-4">
          <div>
            <div className="text-[11px] uppercase tracking-wider text-muted-foreground">
              {t("mock.topicsSub")}
            </div>
            <h3 className="mt-1 font-display text-2xl">{t("mock.topics")}</h3>
          </div>
          <button
            onClick={pickRandom}
            className="hidden sm:inline-flex items-center gap-1.5 h-8 px-3 rounded-md border border-border text-xs font-medium hover:bg-accent"
          >
            <Shuffle className="w-3.5 h-3.5" /> {t("mock.random")}
          </button>
        </div>
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
          {topics.map((tp) => {
            const active = tp.id === selectedId;
            return (
              <button
                key={tp.id}
                onClick={() => setSelectedId(tp.id)}
                className={`group text-left rounded-2xl border p-4 transition ${
                  active
                    ? "border-brand bg-brand-soft/60"
                    : "border-border bg-card hover:border-foreground/30"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div
                    className={`w-9 h-9 rounded-md grid place-items-center ${
                      active ? "bg-foreground text-background" : "bg-muted text-foreground"
                    }`}
                  >
                    <tp.icon className="w-4 h-4" />
                  </div>
                  {active && <CheckCircle2 className="w-4 h-4 text-brand" />}
                </div>
                <div className="mt-3 font-display text-lg leading-tight">{label(lang, tp)}</div>
                <div className="mt-1 text-xs text-muted-foreground line-clamp-2">
                  {sample(lang, tp)}
                </div>
              </button>
            );
          })}
        </div>
      </section>

      <section className="rounded-2xl border border-border bg-card p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-display text-xl">{t("mock.recent")}</h3>
          <button className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1">
            {t("mock.allHistory")} <ArrowRight className="w-3 h-3" />
          </button>
        </div>
        <ul className="divide-y divide-border">
          {history.map((h) => (
            <li key={h.date} className="flex items-center gap-4 py-3">
              <CheckCircle2 className="w-4 h-4 text-brand" />
              <div className="flex-1">
                <div className="text-sm font-medium">{h.date}</div>
                <div className="text-xs text-muted-foreground flex items-center gap-1">
                  <Clock className="w-3 h-3" /> {h.dur}
                </div>
              </div>
              <span className="font-display text-2xl tabular-nums">{h.band.toFixed(1)}</span>
              <ArrowRight className="w-4 h-4 text-muted-foreground" />
            </li>
          ))}
        </ul>
      </section>
    </AppShell>
  );
}
