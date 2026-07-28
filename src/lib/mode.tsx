import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { GraduationCap, MessagesSquare } from "lucide-react";
import { useI18n } from "./i18n";

export type Mode = "ielts" | "daily";

const Ctx = createContext<{ mode: Mode; setMode: (m: Mode) => void }>({
  mode: "ielts",
  setMode: () => {},
});

export function ModeProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<Mode>("ielts");
  useEffect(() => {
    const saved = typeof window !== "undefined" ? (window.localStorage.getItem("mode") as Mode | null) : null;
    if (saved === "ielts" || saved === "daily") setMode(saved);
  }, []);
  useEffect(() => {
    if (typeof window !== "undefined") window.localStorage.setItem("mode", mode);
  }, [mode]);
  return <Ctx.Provider value={{ mode, setMode }}>{children}</Ctx.Provider>;
}

export function useMode() {
  return useContext(Ctx);
}

export function ModeSwitcher() {
  const { mode, setMode } = useMode();
  const { lang } = useI18n();
  const tx = (en: string, zh: string) => (lang === "zh" ? zh : en);
  const options: { key: Mode; icon: typeof GraduationCap; label: string; sub: string }[] = [
    {
      key: "ielts",
      icon: GraduationCap,
      label: tx("IELTS", "雅思"),
      sub: tx("Exam prep", "考试冲刺"),
    },
    {
      key: "daily",
      icon: MessagesSquare,
      label: tx("Daily", "日常"),
      sub: tx("Conversation", "口语对话"),
    },
  ];
  return (
    <div className="grid grid-cols-2 gap-1 p-1 rounded-xl border border-border bg-background">
      {options.map((opt) => {
        const active = mode === opt.key;
        return (
          <button
            key={opt.key}
            onClick={() => setMode(opt.key)}
            className={`flex flex-col items-start gap-0.5 rounded-lg px-2.5 py-2 text-left transition ${
              active
                ? "bg-foreground text-background"
                : "text-muted-foreground hover:text-foreground hover:bg-sidebar-accent"
            }`}
          >
            <div className="flex items-center gap-1.5">
              <opt.icon className="w-3.5 h-3.5" />
              <span className="text-xs font-semibold">{opt.label}</span>
            </div>
            <span className={`text-[10px] ${active ? "text-background/60" : "text-muted-foreground"}`}>
              {opt.sub}
            </span>
          </button>
        );
      })}
    </div>
  );
}
