"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  UploadCloud,
  ScanText,
  FileSpreadsheet,
  Network,
  Check,
  type LucideIcon,
} from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import AnimatedIcon from "@/components/ui/AnimatedIcon";

const PIPELINE: { icon: LucideIcon; label: string }[] = [
  { icon: UploadCloud, label: "Upload Document" },
  { icon: ScanText, label: "AI Analysis" },
  { icon: FileSpreadsheet, label: "Structured Data" },
  { icon: Network, label: "ERP / CRM Integration" },
];

const EXTRACTED = [
  { key: "Vendor", value: "Skyline Logistics Pvt Ltd" },
  { key: "Invoice #", value: "INV-2026-04821" },
  { key: "Invoice Date", value: "12 Jun 2026" },
  { key: "GSTIN", value: "27AABCS1429R1ZX" },
  { key: "Line Items", value: "8 items detected" },
  { key: "Tax (18%)", value: "₹38,160" },
  { key: "Total Amount", value: "₹2,50,160" },
];

type Stage = "idle" | "uploading" | "analyzing" | "done";

export default function ProductShowcase() {
  return (
    <section id="product" className="relative section">
      <div className="pointer-events-none absolute left-1/2 top-24 h-72 w-72 -translate-x-1/2 rounded-full bg-neon-blue/10 blur-[120px]" />
      <SectionHeading
        eyebrow="Flagship Product"
        title={
          <>
            <span className="text-gradient">Bista Doc AI</span> — documents in, decisions
            out
          </>
        }
        subtitle="Drop in any invoice, contract or form. Bista Doc AI reads it, structures it, and pushes clean data straight into your systems."
      />

      <Reveal delay={0.05}>
        <div className="mx-auto mt-10 grid max-w-3xl grid-cols-2 gap-3 sm:grid-cols-4">
          {PIPELINE.map((step, i) => (
            <div key={step.label} className="relative">
              <div className="glass flex h-full flex-col items-center gap-3 rounded-2xl px-3 py-5 text-center">
                <AnimatedIcon icon={step.icon} size="md" delay={i * 0.28} />
                <span className="text-xs font-medium text-fg/70">{step.label}</span>
              </div>
              {i < PIPELINE.length - 1 && (
                <motion.span
                  aria-hidden
                  className="absolute -right-2 top-1/2 z-10 hidden text-neon-cyan sm:block"
                  style={{ y: "-50%" }}
                  animate={{ x: [0, 6, 0], opacity: [0.4, 1, 0.4] }}
                  transition={{
                    duration: 1.6,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: i * 0.25,
                  }}
                >
                  →
                </motion.span>
              )}
            </div>
          ))}
        </div>
      </Reveal>

      <div className="mx-auto mt-10 max-w-4xl">
        <Reveal delay={0.1}>
          <LiveDemo />
        </Reveal>
      </div>
    </section>
  );
}

function LiveDemo() {
  const [stage, setStage] = useState<Stage>("idle");
  const [progress, setProgress] = useState(0);
  const [revealed, setRevealed] = useState(0);
  const timers = useRef<number[]>([]);

  const clearTimers = () => {
    timers.current.forEach((t) => window.clearTimeout(t));
    timers.current = [];
  };

  useEffect(() => () => clearTimers(), []);

  const run = () => {
    clearTimers();
    setStage("uploading");
    setProgress(0);
    setRevealed(0);

    const interval = window.setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          window.clearInterval(interval);
          return 100;
        }
        return p + 4;
      });
    }, 30);
    timers.current.push(interval);

    timers.current.push(
      window.setTimeout(() => setStage("analyzing"), 900),
    );
    timers.current.push(
      window.setTimeout(() => {
        setStage("done");
        EXTRACTED.forEach((_, i) => {
          timers.current.push(
            window.setTimeout(() => setRevealed(i + 1), i * 320),
          );
        });
      }, 2200),
    );
  };

  const reset = () => {
    clearTimers();
    setStage("idle");
    setProgress(0);
    setRevealed(0);
  };

  return (
    <div className="grid gap-5 lg:grid-cols-2">
      {/* Left: document */}
      <div className="relative overflow-hidden rounded-3xl glass p-5">
        <div className="mb-3 flex items-center justify-between">
          <span className="text-sm font-medium text-fg/70">Sample invoice</span>
          <span className="rounded-full border border-fg/10 bg-fg/5 px-2.5 py-1 text-[11px] text-fg/50">
            invoice_skyline.pdf
          </span>
        </div>

        <div className="relative mx-auto aspect-[1/1.15] w-full max-w-[220px] rounded-2xl bg-white/90 p-4 text-ink-900 shadow-2xl">
          <div className="flex items-center justify-between border-b border-ink-900/10 pb-3">
            <div>
              <div className="text-[13px] font-bold">Skyline Logistics</div>
              <div className="text-[9px] text-ink-900/50">GSTIN 27AABCS1429R1ZX</div>
            </div>
            <div className="text-right text-[9px] text-ink-900/60">
              <div className="font-semibold">INVOICE</div>
              <div>INV-2026-04821</div>
            </div>
          </div>
          <div className="mt-3 space-y-1.5">
            {[70, 90, 55, 80, 60, 95].map((w, i) => (
              <div key={i} className="flex items-center justify-between">
                <div
                  className="h-2 rounded-full bg-ink-900/10"
                  style={{ width: `${w}%` }}
                />
                <div className="ml-2 h-2 w-8 rounded-full bg-ink-900/10" />
              </div>
            ))}
          </div>
          <div className="mt-4 flex justify-end border-t border-ink-900/10 pt-2 text-[10px] font-bold">
            Total ₹2,50,160
          </div>

          {/* scanning overlay */}
          <AnimatePresence>
            {(stage === "uploading" || stage === "analyzing") && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 overflow-hidden rounded-2xl"
              >
                <motion.div
                  initial={{ y: "-20%" }}
                  animate={{ y: "120%" }}
                  transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
                  className="h-16 w-full bg-gradient-to-b from-transparent via-neon-cyan/40 to-transparent"
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="mt-5 flex items-center gap-3">
          {stage === "idle" || stage === "done" ? (
            <button onClick={stage === "done" ? reset : run} className="btn-primary w-full">
              {stage === "done" ? "Run again" : "Process sample invoice"}
            </button>
          ) : (
            <div className="w-full">
              <div className="mb-2 flex justify-between text-xs text-fg/60">
                <span>{stage === "uploading" ? "Uploading…" : "AI analysing…"}</span>
                <span>{Math.min(progress, 100)}%</span>
              </div>
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-fg/10">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-neon-cyan to-neon-blue transition-all"
                  style={{ width: `${Math.min(progress, 100)}%` }}
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Right: extracted data */}
      <div className="relative overflow-hidden rounded-3xl glass p-5">
        <div className="mb-3 flex items-center justify-between">
          <span className="text-sm font-medium text-fg/70">Structured output</span>
          <span
            className={`flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] ${
              stage === "done"
                ? "bg-neon-cyan/15 text-neon-cyan"
                : "border border-fg/10 bg-fg/5 text-fg/50"
            }`}
          >
            <span
              className={`h-1.5 w-1.5 rounded-full ${
                stage === "done" ? "bg-neon-cyan" : "bg-fg/40 animate-pulseGlow"
              }`}
            />
            {stage === "done" ? "99.4% confidence" : "awaiting input"}
          </span>
        </div>

        {stage === "idle" && (
          <div className="grid h-[240px] place-items-center text-center">
            <div className="text-fg/40">
              <AnimatedIcon
                icon={FileSpreadsheet}
                size="lg"
                className="mx-auto mb-4"
              />
              <p className="text-sm">
                Click <span className="text-neon-cyan">Process sample invoice</span> to
                see live extraction.
              </p>
            </div>
          </div>
        )}

        {stage !== "idle" && (
          <div className="space-y-2.5">
            {EXTRACTED.map((row, i) => (
              <motion.div
                key={row.key}
                initial={{ opacity: 0, x: 16 }}
                animate={
                  i < revealed ? { opacity: 1, x: 0 } : { opacity: 0.25, x: 0 }
                }
                transition={{ duration: 0.4 }}
                className="flex items-center justify-between rounded-xl border border-fg/5 bg-fg/[0.03] px-4 py-2.5"
              >
                <span className="text-xs text-fg/50">{row.key}</span>
                <span className="text-sm font-medium text-fg">
                  {i < revealed ? (
                    row.value
                  ) : (
                    <span className="inline-block h-3 w-24 animate-pulse rounded bg-fg/10" />
                  )}
                </span>
              </motion.div>
            ))}
            {stage === "done" && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 flex items-center gap-2 rounded-xl border border-neon-cyan/20 bg-neon-cyan/10 px-4 py-3 text-sm text-neon-blue"
              >
                <Check className="h-4 w-4 shrink-0" strokeWidth={2.5} /> Pushed to ERP/CRM — entry created in 1.8s
              </motion.div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
