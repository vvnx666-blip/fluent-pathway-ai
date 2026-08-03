import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";

/* ------------------------------ Paper shell ----------------------------- */

export function PaperShell({ children }: { children: ReactNode }) {
  return (
    <div className="sl-paper min-h-screen flex flex-col items-center justify-center px-5 py-14 relative overflow-hidden">
      <div className="absolute inset-0 sl-grain opacity-60 pointer-events-none" />
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(900px_420px_at_50%_-10%,rgba(15,110,86,0.08),transparent_70%)]" />
      <div className="relative w-full max-w-xl">{children}</div>
    </div>
  );
}

/* ------------------------------ Typewriter ------------------------------ */

export function useTypewriter(lines: string[], speed = 40, pause = 600) {
  const [out, setOut] = useState<string[]>(() => lines.map(() => ""));
  const [done, setDone] = useState(false);
  const key = useMemo(() => lines.join("|"), [lines]);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    const parts = key.split("|");
    setOut(parts.map(() => ""));
    setDone(false);
    timers.current.forEach(clearTimeout);
    timers.current = [];

    let t = 200;
    parts.forEach((line, li) => {
      for (let i = 1; i <= line.length; i++) {
        t += speed;
        timers.current.push(
          setTimeout(() => {
            setOut((prev) => {
              const next = [...prev];
              next[li] = line.slice(0, i);
              return next;
            });
          }, t),
        );
      }
      t += pause;
    });
    timers.current.push(setTimeout(() => setDone(true), t));
    return () => timers.current.forEach(clearTimeout);
  }, [key, speed, pause]);

  return { out, done };
}

/* --------------------------- Circle option row -------------------------- */

export function CircleOption({
  label,
  selected,
  onClick,
  delay = 0,
}: {
  label: string;
  selected: boolean;
  onClick: () => void;
  delay?: number;
}) {
  return (
    <button
      onClick={onClick}
      style={{ animationDelay: `${delay}ms` }}
      className="sl-up sl-press group flex items-center gap-4 py-2.5 text-left w-full"
    >
      <span className="relative inline-flex h-8 w-8 shrink-0 items-center justify-center">
        <svg viewBox="0 0 32 32" className="h-8 w-8">
          <circle
            cx="16"
            cy="16"
            r="14"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.2"
            className="text-foreground/35 group-hover:text-brand transition-colors"
            strokeDasharray="1.5 3"
          />
          {selected && (
            <path
              d="M10 16.5 L14.5 21 L22.5 11"
              fill="none"
              stroke="var(--brand)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="sl-draw"
            />
          )}
        </svg>
      </span>
      <span className="text-lg tracking-tight group-hover:text-brand transition-colors">
        {label}
      </span>
    </button>
  );
}

/* ------------------------------ Pill button ----------------------------- */

export function Pill({
  children,
  onClick,
  selected,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  onClick?: () => void;
  selected?: boolean;
  delay?: number;
  className?: string;
}) {
  return (
    <button
      onClick={onClick}
      style={{ animationDelay: `${delay}ms` }}
      className={`sl-up sl-press sl-glass rounded-full px-6 py-3 text-base tracking-tight hover:-translate-y-0.5 ${
        selected ? "text-brand" : "text-foreground"
      } ${className}`}
    >
      {children}
    </button>
  );
}

/* ------------------------ Shared price presentation --------------------- */

export function PriceTag({
  original,
  now,
  note,
  tone = "ink",
}: {
  original: string;
  now: string;
  note?: string;
  tone?: "ink" | "gold";
}) {
  return (
    <div className="flex items-baseline gap-3">
      <span className="text-sm text-muted-foreground line-through decoration-1">{original}</span>
      <span
        className={`font-display text-3xl leading-none ${tone === "gold" ? "text-gold" : "text-foreground"}`}
      >
        {now}
      </span>
      {note && <span className="text-xs text-muted-foreground">{note}</span>}
    </div>
  );
}

/* --------------------------------- Misc --------------------------------- */

export function Sheet({ children, flipKey }: { children: ReactNode; flipKey: string | number }) {
  return (
    <div key={flipKey} className="sl-flip-in sl-glass px-8 py-12 sm:px-12 sm:py-14">
      {children}
    </div>
  );
}
