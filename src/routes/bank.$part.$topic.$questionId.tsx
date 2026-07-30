import { createFileRoute, Link, notFound, useParams } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  Bookmark,
  BookmarkCheck,
  CheckCircle2,
  Lightbulb,
  Mic,
  NotebookPen,
  Timer,
  Users,
} from "lucide-react";
import {
  BankCrumb,
  BankSurface,
  Pill,
  Stars,
  useIsPro,
  useTx,
} from "@/components/question-bank-ui";
import {
  getPart,
  getTopic,
  getQuestion,
  questionsFor,
  type PartId,
} from "@/lib/question-bank";

export const Route = createFileRoute("/bank/$part/$topic/$questionId")({
  head: ({ params }) => {
    const p = getPart(params.part);
    const q = p ? getQuestion(p.id, params.topic, params.questionId) : undefined;
    const title = q ? `${q.question} — IELTS ${p!.label}` : "Question — Question Bank";
    const desc = q
      ? `Practise "${q.question}" with an AI examiner. Frequency, difficulty and related follow-up questions included.`
      : "IELTS speaking question detail.";
    return {
      meta: [
        { title: `${title.slice(0, 58)} · Cadence` },
        { name: "description", content: desc.slice(0, 155) },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: QuestionDetail,
});

function QuestionDetail() {
  const { part, topic, questionId } = useParams({ from: "/bank/$part/$topic/$questionId" });
  const meta = getPart(part);
  const topicMeta = meta ? getTopic(meta.id, topic) : undefined;
  const question = meta ? getQuestion(meta.id, topic, questionId) : undefined;
  if (!meta || !topicMeta || !question) throw notFound();
  const partId = meta.id as PartId;

  const tx = useTx();
  const isPro = useIsPro();
  const [saved, setSaved] = useState(false);
  const [inMistakes, setInMistakes] = useState(false);

  const related = useMemo(
    () =>
      questionsFor(partId, topic)
        .filter((q) => q.id !== question.id && q.subTopic !== question.subTopic)
        .slice(0, 4),
    [partId, topic, question.id, question.subTopic],
  );

  return (
    <BankSurface>
      <section className="space-y-6">
        <BankCrumb
          items={[
            { label: tx("Question Bank", "题库"), to: "/bank" },
            { label: meta.label, to: "/bank/$part", params: { part: partId } },
            { label: topicMeta.name, to: "/bank/$part/$topic", params: { part: partId, topic } },
            { label: `Q${questionId.slice(-2)}` },
          ]}
        />

        <div className="grid gap-6 lg:grid-cols-[1fr_320px] items-start">
          <div className="qb-card p-8 qb-rise">
            <div className="flex flex-wrap gap-2">
              <Pill tone="brand">{meta.label}</Pill>
              <Pill tone="outline">{question.subTopic}</Pill>
              {question.predictionLevel === "high" && (
                <Pill tone="gold">{tx("Prediction: High", "预测：高")}</Pill>
              )}
            </div>
            <h1 className="mt-5 font-display text-3xl sm:text-[2.6rem] leading-[1.1] tracking-tight">
              {question.question}
            </h1>

            <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <Fact label={tx("Frequency", "频率")}>
                <Stars value={question.frequency} />
              </Fact>
              <Fact label={tx("Appeared", "出现次数")}>
                <span className="tabular-nums">{question.appearances} {tx("times", "次")}</span>
              </Fact>
              <Fact label={tx("Difficulty", "难度")}>{question.difficulty}</Fact>
              <Fact label={tx("Practised by", "练习人数")}>
                <span className="inline-flex items-center gap-1 tabular-nums">
                  <Users className="w-3 h-3" /> {question.practiceCount}
                </span>
              </Fact>
            </div>

            <div className="mt-6 rounded-xl border border-border bg-muted/50 p-5">
              <div className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-brand">
                <Lightbulb className="w-3 h-3" /> {tx("Examiner intent", "考官意图")}
              </div>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                {tx(
                  `Source: ${question.source}. Aim for a two-part answer — a direct response plus one specific example. Avoid listing; extend with a reason and a contrast.`,
                  `来源：${question.source}。建议采用"直接回答 + 一个具体例子"的双段结构，避免罗列，用理由和对比来延展。`,
                )}
              </p>
            </div>

            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                to="/mock/drill"
                className="inline-flex items-center gap-2 h-11 px-5 rounded-xl bg-brand text-brand-foreground text-sm font-semibold hover:brightness-110 transition"
              >
                <Mic className="w-4 h-4" /> {tx("Start AI Examiner", "开始 AI 考官练习")}
              </Link>
              <button
                onClick={() => setInMistakes((v) => !v)}
                className={`inline-flex items-center gap-2 h-11 px-5 rounded-xl border text-sm font-medium transition ${
                  inMistakes
                    ? "border-brand/50 text-brand bg-brand/10"
                    : "border-border hover:border-foreground/40"
                }`}
              >
                {inMistakes ? <CheckCircle2 className="w-4 h-4" /> : <NotebookPen className="w-4 h-4" />}
                {inMistakes
                  ? tx("In mistake book", "已加入错题本")
                  : tx("Add to Mistake Book", "加入错题本")}
              </button>
              <button
                onClick={() => setSaved((v) => !v)}
                aria-label={tx("Save question", "收藏题目")}
                className="inline-flex items-center justify-center w-11 h-11 rounded-xl border border-border hover:border-gold/50 transition"
              >
                {saved ? (
                  <BookmarkCheck className="w-4 h-4 text-gold" />
                ) : (
                  <Bookmark className="w-4 h-4 text-muted-foreground" />
                )}
              </button>
            </div>

            {!isPro && (
              <p className="mt-4 text-[11px] text-muted-foreground">
                {tx(
                  "Free plan: 1 AI examiner run per day. Pro unlocks unlimited practice and feedback reports.",
                  "免费版：每天 1 次 AI 考官练习。Pro 会员可无限练习并获得完整反馈报告。",
                )}
              </p>
            )}
          </div>

          {/* Sidebar */}
          <aside className="space-y-4">
            <div className="qb-card p-5">
              <div className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-muted-foreground">
                <Timer className="w-3 h-3" /> {tx("Suggested timing", "建议时长")}
              </div>
              <div className="mt-2 font-display text-3xl">
                {partId === "part2" ? "2:00" : "0:45"}
              </div>
              <p className="mt-1 text-xs text-muted-foreground">
                {partId === "part2"
                  ? tx("1 min prep · 2 min speaking", "1 分钟准备 · 2 分钟陈述")
                  : tx("Two to four sentences, extended.", "2–4 句，充分延展。")}
              </p>
            </div>

            <div className="qb-card p-5">
              <div className="text-[10px] uppercase tracking-wider text-muted-foreground">
                {tx("Follow-up questions", "追问")}
              </div>
              <ul className="mt-3 space-y-2.5 text-sm">
                {question.followUps.map((f) => (
                  <li key={f} className="flex gap-2 text-muted-foreground leading-snug">
                    <span className="text-brand">·</span>
                    {f}
                  </li>
                ))}
              </ul>
            </div>

            <div className="qb-card p-5">
              <div className="text-[10px] uppercase tracking-wider text-muted-foreground">
                {tx("Related questions", "相关题目")}
              </div>
              <div className="mt-3 space-y-2">
                {related.map((r) => (
                  <Link
                    key={r.id}
                    to="/bank/$part/$topic/$questionId"
                    params={{ part: partId, topic, questionId: r.id }}
                    className="block rounded-lg border border-border/70 px-3 py-2.5 text-xs leading-snug text-muted-foreground hover:text-foreground hover:border-brand/40 transition"
                  >
                    {r.question}
                  </Link>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </section>
    </BankSurface>
  );
}

function Fact({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="rounded-lg bg-muted/60 border border-border/60 px-3 py-2.5">
      <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{label}</div>
      <div className="mt-1 text-foreground">{children}</div>
    </div>
  );
}
