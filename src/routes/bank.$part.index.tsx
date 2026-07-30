import { createFileRoute, Link, notFound, useParams } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ArrowRight, Lock, Search, Users } from "lucide-react";
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
import { FREE_LIMIT, getPart, topicsForPart, type PartId } from "@/lib/question-bank";

export const Route = createFileRoute("/bank/$part/")({
  head: ({ params }) => {
    const p = getPart(params.part);
    const title = p ? `${p.label} · ${p.name} — Question Bank` : "Question Bank";
    const desc = p
      ? `Browse ${p.questionCount}+ IELTS Speaking ${p.label} questions across ${p.topicCount} topics, ranked by exam frequency.`
      : "Browse IELTS speaking topics by part.";
    return {
      meta: [
        { title: `${title} · Cadence` },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: TopicExplorer,
});

function TopicExplorer() {
  const { part } = useParams({ from: "/bank/$part/" });
  const meta = getPart(part);
  if (!meta) throw notFound();
  const partId = meta.id as PartId;

  const tx = useTx();
  const isPro = useIsPro();
  const loading = useSkeleton();
  const topics = useMemo(() => topicsForPart(partId), [partId]);
  const groups = useMemo(
    () => Array.from(new Set(topics.map((t) => t.group))),
    [topics],
  );
  const [group, setGroup] = useState<string>("all");
  const [q, setQ] = useState("");

  const filtered = topics.filter(
    (t) =>
      (group === "all" || t.group === group) &&
      (q.trim() === "" || t.name.toLowerCase().includes(q.trim().toLowerCase())),
  );

  return (
    <BankSurface>
      <section className="space-y-4">
        <BankCrumb
          items={[
            { label: tx("Question Bank", "题库"), to: "/bank" },
            { label: meta.label },
          ]}
        />
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <span className="text-[10px] uppercase tracking-[0.2em] text-brand">{meta.label}</span>
            <h1 className="mt-2 font-display text-4xl sm:text-5xl tracking-tight">
              {tx(meta.name, meta.nameZh)}
            </h1>
            <p className="mt-2 max-w-lg text-sm text-muted-foreground">
              {tx(meta.tagline, meta.taglineZh)}
            </p>
          </div>
          <div className="flex gap-2">
            <Pill tone="outline">{meta.questionCount} {tx("questions", "题")}</Pill>
            <Pill tone="outline">{meta.topicCount} {tx("topics", "话题")}</Pill>
            <Pill tone="brand">{meta.duration}</Pill>
          </div>
        </div>
      </section>

      <section className="grid gap-8 lg:grid-cols-[210px_1fr]">
        {/* Left nav */}
        <aside className="lg:sticky lg:top-24 h-max space-y-4">
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder={tx("Search topics", "搜索话题")}
              className="w-full h-9 pl-8 pr-3 rounded-lg bg-card border border-border text-sm outline-none focus:border-brand/60 transition"
            />
          </div>
          <div className="flex lg:flex-col gap-1 overflow-x-auto">
            <GroupButton active={group === "all"} onClick={() => setGroup("all")}>
              {tx("All topics", "全部话题")}
              <span className="ml-auto text-[11px] tabular-nums opacity-60">{topics.length}</span>
            </GroupButton>
            {groups.map((g) => {
              const item = topics.find((t) => t.group === g)!;
              return (
                <GroupButton key={g} active={group === g} onClick={() => setGroup(g)}>
                  {tx(g, item.groupZh)}
                  <span className="ml-auto text-[11px] tabular-nums opacity-60">
                    {topics.filter((t) => t.group === g).length}
                  </span>
                </GroupButton>
              );
            })}
          </div>
          {!isPro && (
            <div className="rounded-xl border border-gold/30 bg-gold/8 p-4">
              <div className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-gold">
                <Lock className="w-3 h-3" /> {tx("Free plan", "免费版")}
              </div>
              <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
                {tx(
                  `${FREE_LIMIT} questions unlocked per topic.`,
                  `每个话题解锁 ${FREE_LIMIT} 题。`,
                )}
              </p>
              <Link
                to="/pricing"
                className="mt-3 inline-flex w-full h-8 items-center justify-center rounded-lg bg-gold text-[#1b1405] text-xs font-semibold hover:brightness-110 transition"
              >
                {tx("Unlock full bank", "解锁完整题库")}
              </Link>
            </div>
          )}
        </aside>

        {/* Topic cards */}
        {loading ? (
          <SkeletonGrid rows={6} className="sm:grid-cols-2" />
        ) : (
          <div className="grid gap-4 sm:grid-cols-2">
            {filtered.map((t, i) => (
              <Link
                key={t.id}
                to="/bank/$part/$topic"
                params={{ part: partId, topic: t.id }}
                style={{ animationDelay: `${Math.min(i, 8) * 45}ms` }}
                className="qb-card qb-rise group p-5 flex flex-col"
              >
                <div className="flex items-start justify-between">
                  <span className="w-10 h-10 rounded-xl bg-muted grid place-items-center text-lg">
                    {t.emoji}
                  </span>
                  {t.recentExam === "high" && <Pill tone="brand">{tx("Recent: High", "近期高频")}</Pill>}
                </div>
                <h3 className="mt-4 font-display text-2xl leading-tight">{tx(t.name, t.nameZh)}</h3>
                <p className="mt-1.5 text-xs text-muted-foreground leading-relaxed line-clamp-2">
                  {tx(t.blurb, t.blurbZh)}
                </p>
                <dl className="mt-4 space-y-2 text-xs">
                  <Row label={tx("Questions", "题量")}>
                    <span className="tabular-nums">
                      {isPro ? `${questionCountFor(partId, t.id)}` : `${FREE_LIMIT} / ${questionCountFor(partId, t.id)}`}
                    </span>
                  </Row>
                  <Row label={tx("Frequency", "出现频率")}>
                    <Stars value={t.frequency} />
                  </Row>
                  <Row label={tx("Difficulty", "难度")}>
                    <span>{t.difficulty}</span>
                  </Row>
                  <Row label={tx("Practised", "练习人数")}>
                    <span className="inline-flex items-center gap-1 tabular-nums">
                      <Users className="w-3 h-3" /> {t.studentsPracticed}
                    </span>
                  </Row>
                </dl>
                <span className="mt-5 pt-4 border-t border-border inline-flex items-center justify-between text-xs font-medium">
                  {tx("View Questions", "查看题目")}
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                </span>
              </Link>
            ))}
          </div>
        )}
      </section>
    </BankSurface>
  );
}

function questionCountFor(part: PartId, topic: string) {
  // cheap deterministic count used only for display in the grid
  let h = 2166136261;
  const s = part + topic;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return 24 + (Math.abs(h) % 15);
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between">
      <dt className="text-muted-foreground">{label}</dt>
      <dd className="text-foreground">{children}</dd>
    </div>
  );
}

function GroupButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 shrink-0 h-8 px-3 rounded-lg text-xs transition-colors ${
        active
          ? "bg-brand/12 text-brand border border-brand/30"
          : "text-muted-foreground hover:bg-muted border border-transparent"
      }`}
    >
      {children}
    </button>
  );
}
