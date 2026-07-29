import { Link } from "@tanstack/react-router";
import { X, Check, Sparkles, ArrowRight } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { PLANS, usePlan, type PlanDef } from "@/lib/plan";

type QuotaKind = "mock" | "drill" | "analysis";

export function Paywall({
  open,
  onClose,
  quota,
}: {
  open: boolean;
  onClose: () => void;
  quota: QuotaKind;
}) {
  const { lang } = useI18n();
  const { plan, setPlan } = usePlan();
  const tx = (en: string, zh: string) => (lang === "zh" ? zh : en);
  if (!open) return null;

  const title: Record<QuotaKind, [string, string]> = {
    mock: ["You've used your mock quota", "本周模考次数已用完"],
    drill: ["You've used your drill quota", "本周专题训练次数已用完"],
    analysis: ["You've used your analysis quota", "本周专项分析次数已用完"],
  };

  // Anchor: sum of singles ~ (mock 29.9 + drill 9.9*3 + analysis 9.9*3) ≈ example
  const singleTotal = 29.9 * 4 + 9.9 * 15 + 9.9 * 10; // rough anchor
  const proPrice = 79;
  const saved = Math.round((1 - proPrice / singleTotal) * 100);

  // Pick 2 options: weekly + pro_month (or upgrade only if user already sub)
  const options: PlanDef[] = plan.tier === "pro"
    ? PLANS.filter((p) => p.id === "pro_year")
    : plan.tier === "sub"
    ? PLANS.filter((p) => p.id === "pro_month" || p.id === "pro_year")
    : PLANS.filter((p) => p.id === "weekly" || p.id === "pro_month");

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-foreground/60 backdrop-blur-sm p-4">
      <div className="relative w-full max-w-2xl rounded-2xl bg-card border border-border shadow-2xl overflow-hidden">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 w-8 h-8 rounded-md grid place-items-center hover:bg-muted text-muted-foreground"
        >
          <X className="w-4 h-4" />
        </button>
        <div className="px-8 pt-8 pb-4">
          <div className="text-[11px] uppercase tracking-wider text-muted-foreground">
            {tx("Unlock more", "升级解锁")}
          </div>
          <h2 className="mt-1 font-display text-3xl">{tx(title[quota][0], title[quota][1])}</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            {tx(
              `Pro Monthly bundles mocks, drills and analyses. Buying them one-by-one would cost about ¥${singleTotal.toFixed(0)} — the bundle saves ${saved}%.`,
              `Pro 月卡打包模考 + 专题 + 分析，单独购买约 ¥${singleTotal.toFixed(0)}，套餐省 ${saved}%。`,
            )}
          </p>
        </div>

        <div className="px-8 pb-8 grid gap-4 sm:grid-cols-2">
          {options.map((p) => (
            <div
              key={p.id}
              className={`relative rounded-xl p-5 flex flex-col gap-3 ${
                p.highlight
                  ? "border-2 border-foreground bg-background"
                  : "border border-border bg-background"
              }`}
            >
              {p.highlight && (
                <span className="absolute -top-2.5 left-4 text-[10px] uppercase tracking-wider bg-foreground text-background px-2 py-0.5 rounded-full">
                  {tx("Most picked", "最多人选")}
                </span>
              )}
              <div>
                <div className="text-xs text-muted-foreground">{tx(p.name, p.nameZh)}</div>
                <div className="mt-1 flex items-baseline gap-1">
                  <span className="font-display text-3xl">{p.price}</span>
                  <span className="text-xs text-muted-foreground">{tx(p.cadence, p.cadenceZh)}</span>
                </div>
              </div>
              <ul className="text-xs text-muted-foreground space-y-1.5">
                {(lang === "zh" ? p.featuresZh : p.features).map((f) => (
                  <li key={f} className="flex items-start gap-1.5">
                    <Check className="w-3 h-3 mt-0.5 text-brand shrink-0" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <button
                onClick={() => {
                  setPlan(p.id);
                  onClose();
                }}
                className={`mt-auto h-9 rounded-md text-sm font-medium flex items-center justify-center gap-1.5 ${
                  p.highlight
                    ? "bg-foreground text-background hover:opacity-90"
                    : "border border-border hover:border-foreground/40"
                }`}
              >
                {tx("Simulate this plan", "模拟此套餐")} <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>

        <div className="px-8 py-4 border-t border-border bg-muted/40 flex items-center justify-between text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1.5">
            <Sparkles className="w-3 h-3" />
            {tx("Need more chat minutes?", "需要更多陪练时间？")}
          </span>
          <Link to="/pricing" onClick={onClose} className="text-foreground font-medium hover:underline">
            {tx("See all plans", "查看全部套餐")} →
          </Link>
        </div>
      </div>
    </div>
  );
}
