"use client";

import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import Counter from "@/components/ui/Counter";

const CASES = [
  {
    tag: "Finance",
    client: "Leadway Pensure",
    problem: "Manual banking reconcillation and validating funds.",
    solution: "Autonomous AI Agent for reconcillation and validation",
    metrics: [
      { label: "Reconcillation speed", value: 99, suffix: "%" },
      { label: "Manual reviews cut", value: 85, suffix: "%" },
      { label: "Compliance score", value: 92, suffix: "%" },
    ],
  },
  {
    tag: "Banking",
    client: "Branch International",
    problem: "Manual invoice processing across 5 Countries",
    solution: "AI Document Intelligence",
    metrics: [
      { label: "Accuracy", value: 90, suffix: "%" },
      { label: "Faster processing", value: 78, suffix: "%" },
      { label: "Cost reduction", value: 96, suffix: "%" },
    ],
  },
  {
    tag: "Shipping & Logistics",
    client: "MOL Maritime",
    problem: "Multiple Manual work",
    solution: "AI extraction + multi-agent workflow.",
    metrics: [
      { label: "Process automated", value: 81, suffix: "%" },
      { label: "Turnaround time", value: 70, suffix: "%" },
      { label: "Cost reduction", value: 64, suffix: "%" },
    ],
  },
];

export default function CaseStudies() {
  return (
    <section id="cases" className="section">
      <SectionHeading
        eyebrow="Case Studies"
        title={
          <>
            Real deployments, <span className="text-gradient">real numbers</span>
          </>
        }
        subtitle="Outcomes our clients measured after going live with Bista AI."
      />

      <div className="mt-9 grid gap-5 lg:grid-cols-3">
        {CASES.map((c, i) => (
          <Reveal key={c.client} delay={i * 0.1}>
            <motion.div
              whileHover={{ y: -8 }}
              transition={{ type: "spring", stiffness: 300, damping: 22 }}
              className="group relative flex h-full flex-col overflow-hidden rounded-3xl glass p-7 transition-shadow duration-500 hover:shadow-glow"
            >
              <motion.div
                aria-hidden
                className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-[conic-gradient(from_0deg,rgba(34,197,94,0.45),transparent_60%)] blur-md opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              />
              <div className="relative flex h-full flex-col">
              <div className="flex items-center justify-between">
                <span className="rounded-full border border-neon-cyan/30 bg-neon-cyan/10 px-3 py-1 text-[11px] font-medium text-neon-cyan">
                  {c.tag}
                </span>
              </div>
              <h3 className="mt-4 font-display text-lg font-semibold">{c.client}</h3>

              <div className="mt-4 space-y-3 text-sm">
                <div>
                  <div className="text-[11px] uppercase tracking-wider text-fg/40">
                    Problem
                  </div>
                  <p className="text-fg/70">{c.problem}</p>
                </div>
                <div>
                  <div className="text-[11px] uppercase tracking-wider text-fg/40">
                    Solution
                  </div>
                  <p className="text-fg/70">{c.solution}</p>
                </div>
              </div>

              <div className="mt-6 space-y-3.5 border-t border-fg/10 pt-5">
                {c.metrics.map((m) => (
                  <div key={m.label}>
                    <div className="mb-1.5 flex items-center justify-between text-sm">
                      <span className="text-fg/60">{m.label}</span>
                      <span className="font-display font-bold text-fg">
                        <Counter to={m.value} />
                        {m.suffix}
                      </span>
                    </div>
                    <div className="h-2 w-full overflow-hidden rounded-full bg-fg/10">
                      <motion.div
                        className="h-full rounded-full bg-gradient-to-r from-neon-cyan to-neon-blue"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${m.value}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.4, ease: "easeOut" }}
                      />
                    </div>
                  </div>
                ))}
              </div>
              </div>
            </motion.div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
