import { createFileRoute, Link, notFound, useParams } from "@tanstack/react-router";
import { useMemo } from "react";
import { CheckCircle2, Clock, Lock, Sparkles, Users } from "lucide-react";
import {
  BankCrumb,
  BankSurface,
  Pill,
  SkeletonGrid,
  Stars,
  useIsPro,
  useSkeleton,
  useTx,
} from "@/components/question-bank-ui";
import {
  FREE_LIMIT,
  getPart,
  getTopic,
  isCompleted,
  questionsFor,
  type PartId,
} from "@/lib/question-bank";

export const Route = createFileRoute("/bank/$part/$topic/")({
  head: ({ params }) => {
    const p = getPart(params.part);
    const t = p ? getTopic(p.id, params.topic) : undefined;
    const title = t && p ? `${t.name} — ${p.label} Questions` : "Topic — Question Bank";
    const desc = t
      ? `Every ${t.name} IELTS speaking question, ranked by exam frequency and difficulty, with AI examiner practice.`
      : "IELTS speaking topic questions.";
    return {
      meta: [
        { title: `${title} · Cadence` },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: TopicDetail,
});

function TopicDetail() {
  const { part, topic } = useParams({ from: "/bank/$part/$topic/" });
  const meta = getPart(part);
  const topicMeta = meta ? getTopic(meta.id, topic) : undefined;
  if (!meta || !topicMeta) throw notFound();
  const partId = meta.id as PartId;

  const tx = useTx();
  const isPro = useIsPro();
  const loading = useSkeleton();
  const questions = useMemo(() => questionsFor(partId, topic), [partId, topic]);
  const unlocked = isPro ? questions.length : Math.min(FREE_LIMIT, questions.length);
  const lockedCount = questions.length - unlocked;

  return (
    <BankSurface>
      <section className="space-y-5">
        <BankCrumb
          items={[
            { label: tx("Question Bank", "题库"), to: "/bank" },
            { label: meta.label, to: "/bank/$part", params: { part: partId } },
            { label: topicMeta.name },
          ]}
        />
        <div className="flex flex-wrap items-start justify-between gap-6">
          <div className="min-w-0">
            <div className="flex items-center gap-3">
              <span className="w-12 h-12 rounded-2xl bg-muted grid place-items-center text-2xl">
                {topicMeta.emoji}
              </span>
              <div>
                <h1 className="font-display text-4xl sm:text-5xl tracking-tight leading-none">
                  {tx(topicMeta.name, topicMeta.nameZh)}
                </h1>
                <div className="mt-2 flex flex-wrap gap-2">
                  <Pill tone="outline">{questions.length} {tx("questions", "题")}</Pill>
                  {topicMeta.recentExam === "high" && (
                    <Pill tone="brand">{tx("High frequency topic", "高频话题")}</Pill>
                  )}
                  <Pill tone="muted">
                    {tx("Last updated", "更新于")} {topicMeta.updated}
                  </Pill>
                </div>
              </div>
            </div>
            <p className="mt-4 max-w-xl text-sm text-muted-foreground leading-relaxed">
              {tx(topicMeta.blurb, topicMeta.blurbZh)}
            </p>
          </div>

          <div className="grid grid-cols-3 gap-3 min-w-[300px]">
            <MetricCard label={tx("Exam frequency", "考试频率")}>
              <Stars value={topicMeta.frequency} />
            </MetricCard>
            <MetricCard label={tx("Difficulty", "难度")}>
              <span className="text-sm font-medium">{topicMeta.difficulty}</span>
            </MetricCard>
            <MetricCard label={tx("Practised", "练习人数")}>
              <span className="inline-flex items-center gap-1 text-sm font-medium tabular-nums">
                <Users className="w-3.5 h-3.5 text-brand" />
                {topicMeta.studentsPracticed}
              </span>
            </MetricCard>
          </div>
        </div>

        {!isPro && (
          <div className="rounded-xl border border-gold/30 bg-gold/8 px-5 py-4 flex flex-wrap items-center justify-between gap-4">
            <div className="text-sm">
              <span className="text-gold font-medium">
                {tx("Available", "可用")} {unlocked} / {questions.length}
              </span>
              <span className="ml-2 text-muted-foreground text-xs">
                {tx(
                  `${lockedCount} more questions are locked on the Free plan.`,
                  `免费版还有 ${lockedCount} 题未解锁。`,
                )}
              </span>
            </div>
            <Link
              to="/bank/pro"
              className="inline-flex items-center h-9 px-4 rounded-lg bg-gold text-[#1b1405] text-xs font-semibold hover:brightness-110 transition"
            >
              {tx("Unlock Full Question Bank", "解锁完整题库")}
            </Link>
          </div>
        )}
      </section>

      <section className="space-y-3">
        <h2 className="font-display text-2xl tracking-tight">
          {tx("Question list", "题目列表")}
        </h2>
        {loading ? (
          <SkeletonGrid rows={5} />
        ) : (
          <ol className="space-y-3">
            {questions.map((q, i) => {
              const locked = i >= unlocked;
              const done = !locked && isCompleted(q.id);
              const body = (
                <>
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <div className="text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                        Question {String(i + 1).padStart(2, "0")} · {q.subTopic}
                      </div>
                      <p
                        className={`mt-1.5 text-base sm:text-lg leading-snug ${
                          locked ? "blur-[5px] select-none" : ""
                        }`}
                      >
                        {q.question}
                      </p>
                    </div>
                    {locked ? (
                      <Lock className="w-4 h-4 text-gold shrink-0 mt-1" />
                    ) : done ? (
                      <span className="inline-flex items-center gap-1 text-[11px] text-brand shrink-0">
                        <CheckCircle2 className="w-3.5 h-3.5" /> {tx("Completed", "已完成")}
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-[11px] text-muted-foreground shrink-0">
                        <Clock className="w-3.5 h-3.5" /> {tx("Not practised", "未练习")}
                      </span>
                    )}
                  </div>
                  <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-[11px] text-muted-foreground">
                    <span className="tabular-nums">
                      {tx("Appeared", "出现")} {q.appearances} {tx("times", "次")}
                    </span>
                    <Stars value={q.frequency} />
                    <span>{q.difficulty}</span>
                    <span className="ml-auto inline-flex items-center gap-1 text-foreground font-medium">
                      {locked ? (
                        <>
                          <Lock className="w-3 h-3 text-gold" /> {tx("Unlock to practise", "解锁后练习")}
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-3 h-3 text-brand" /> {tx("Start Practice", "开始练习")}
                        </>
                      )}
                    </span>
                  </div>
                </>
              );

              return (
                <li key={q.id} style={{ animationDelay: `${Math.min(i, 8) * 40}ms` }} className="qb-rise">
                  {locked ? (
                    <Link to="/bank/pro" className="qb-card block p-5 relative">
                      {body}
                    </Link>
                  ) : (
                    <Link
                      to="/bank/$part/$topic/$questionId"
                      params={{ part: partId, topic, questionId: q.id }}
                      className="qb-card block p-5"
                    >
                      {body}
                    </Link>
                  )}
                </li>
              );
            })}
          </ol>
        )}

        {!isPro && lockedCount > 0 && (
          <div className="qb-card p-8 text-center border-gold/30">
            <Lock className="w-5 h-5 text-gold mx-auto" />
            <h3 className="mt-3 font-display text-2xl">
              🔒 {lockedCount} {tx("More Questions", "道题目待解锁")}
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              {tx(
                "Pro members get every question in this topic, plus unlimited AI examiner practice.",
                "Pro 会员可解锁本话题全部题目，并享受无限 AI 考官练习。",
              )}
            </p>
            <Link
              to="/bank/pro"
              className="mt-5 inline-flex items-center h-10 px-6 rounded-xl bg-gold text-[#1b1405] text-sm font-semibold hover:brightness-110 transition"
            >
              {tx("Unlock Full Question Bank", "解锁完整题库")}
            </Link>
          </div>
        )}
      </section>
    </BankSurface>
  );
}

function MetricCard({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="qb-card p-4">
      <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{label}</div>
      <div className="mt-2">{children}</div>
    </div>
  );
}
