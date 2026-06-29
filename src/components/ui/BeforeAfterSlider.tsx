"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const BEFORE = [
  "Manual data entry",
  "Scattered PDFs, invoices & forms",
  "Slow, manual approvals",
  "Copy-paste between systems",
  "Frequent human errors",
  "Disconnected, siloed tools",
];

const AFTER = [
  "Automated data extraction",
  "Documents in, clean data out",
  "Instant straight-through processing",
  "Auto-synced to your systems",
  "99% accuracy, zero rekeying",
  "One connected AI workflow",
];

function DocIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <path
        d="M7 3.5h6.5L19 9v10.5a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1v-15a1 1 0 0 1 1-1Z"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <path d="M13 3.5V9h5.5" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M9 13h6M9 16.5h4"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

function Pill({ label, after }: { label: string; after?: boolean }) {
  return (
    <div
      className={`flex shrink-0 items-center gap-2.5 rounded-2xl border px-4 py-3 text-sm font-medium shadow-sm ${
        after
          ? "border-neon-cyan/30 bg-neon-cyan/[0.08] text-neon-blue dark:text-neon-violet"
          : "border-fg/10 bg-white/85 text-ink-900/70 dark:border-white/15 dark:bg-white/[0.10] dark:text-fg/85"
      }`}
    >
      <span
        className={`grid h-7 w-7 shrink-0 place-items-center rounded-lg ${
          after
            ? "bg-neon-cyan/15 text-neon-cyan"
            : "bg-ink-900/[0.06] text-ink-900/50 dark:bg-white/15 dark:text-fg/70"
        }`}
      >
        <DocIcon className="h-4 w-4" />
      </span>
      <span className="whitespace-nowrap">{label}</span>
    </div>
  );
}

function Row({
  items,
  after,
  reverse,
  duration,
}: {
  items: string[];
  after?: boolean;
  reverse?: boolean;
  duration: number;
}) {
  const loop = [...items, ...items];
  return (
    <div
      className={`flex w-max gap-3 animate-marquee ${
        reverse ? "[animation-direction:reverse]" : ""
      }`}
      style={{ animationDuration: `${duration}s` }}
    >
      {loop.map((label, i) => (
        <Pill key={`${label}-${i}`} label={label} after={after} />
      ))}
    </div>
  );
}

export default function BeforeAfterSlider() {
  const [pos, setPos] = useState(46);
  const wrapRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const updateFromX = useCallback((clientX: number) => {
    const el = wrapRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    let p = ((clientX - rect.left) / rect.width) * 100;
    p = Math.max(12, Math.min(88, p));
    setPos(p);
  }, []);

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      if (dragging.current) updateFromX(e.clientX);
    };
    const onUp = () => {
      dragging.current = false;
    };
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };
  }, [updateFromX]);

  return (
    <div className="w-full">
      <h3 className="mb-5 text-center font-display text-xl font-bold tracking-tight text-fg sm:text-2xl">
        Experience Bista AI
      </h3>

      <div
        ref={wrapRef}
        className="relative h-[300px] touch-none select-none overflow-hidden rounded-3xl border border-fg/10 bg-white/40 mask-fade-x dark:border-white/10 dark:bg-white/[0.02]"
      >
        {/* Subtle indigo wash on the automated (after) side */}
        <div
          className="pointer-events-none absolute inset-y-0 right-0 bg-neon-cyan/[0.05]"
          style={{ left: `${pos}%` }}
        />

        {/* BEFORE — manual / messy (left of divider) */}
        <div
          className="absolute inset-0 flex flex-col justify-center gap-3"
          style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
        >
          <Row items={BEFORE} reverse duration={42} />
          <Row items={[...BEFORE].reverse()} reverse duration={48} />
        </div>

        {/* AFTER — automated / streamlined (right of divider) */}
        <div
          className="absolute inset-0 flex flex-col justify-center gap-3"
          style={{ clipPath: `inset(0 0 0 ${pos}%)` }}
        >
          <Row items={AFTER} after reverse duration={20} />
          <Row items={[...AFTER].reverse()} after reverse duration={24} />
        </div>

        {/* Divider + draggable handle */}
        <div
          className="absolute inset-y-0 z-20 w-[2px] bg-neon-cyan"
          style={{ left: `${pos}%` }}
        >
          <div
            role="slider"
            aria-label="Before and after automation"
            aria-valuenow={Math.round(pos)}
            aria-valuemin={12}
            aria-valuemax={88}
            tabIndex={0}
            onPointerDown={(e) => {
              dragging.current = true;
              (e.currentTarget as HTMLElement).setPointerCapture?.(e.pointerId);
            }}
            onKeyDown={(e) => {
              if (e.key === "ArrowLeft") setPos((p) => Math.max(12, p - 3));
              if (e.key === "ArrowRight") setPos((p) => Math.min(88, p + 3));
            }}
            className="absolute left-1/2 top-3 flex -translate-x-1/2 cursor-ew-resize items-center gap-1 rounded-full border border-fg/10 bg-white px-2 py-1 text-[11px] font-semibold text-ink-900/70 shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-neon-cyan/60 dark:border-white/15 dark:bg-ink-900 dark:text-fg/80"
          >
            <span className="px-1">Before</span>
            <span className="grid h-7 w-7 place-items-center rounded-full bg-[#14141e] text-white">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path
                  d="M9 8l-4 4 4 4M15 8l4 4-4 4"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <span className="px-1 text-neon-blue dark:text-neon-violet">After</span>
          </div>

          <div className="absolute bottom-2 left-1/2 h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-neon-cyan shadow-[0_0_0_4px_rgba(69,67,217,0.18)]" />
        </div>
      </div>
    </div>
  );
}
