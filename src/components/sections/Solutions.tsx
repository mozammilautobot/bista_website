"use client";

import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";

const SOLUTIONS = [
  {
    title: "Intelligent Document Processing",
    problem: "Teams drowning in PDFs, invoices & forms.",
    icon: "📄",
    points: ["OCR & Classification", "Data Extraction", "Invoice Processing", "KYC Verification"],
  },
  {
    title: "Agentic AI Solutions",
    problem: "Repetitive knowledge work that scales poorly.",
    icon: "🤖",
    points: ["Autonomous Agents", "Multi-Agent Systems", "AI Assistants", "Tool Use & RAG"],
  },
  {
    title: "Business Process Automation",
    problem: "Manual handoffs across departments.",
    icon: "🔄",
    points: ["HR Automation", "Finance Automation", "Email Automation", "Excel Automation"],
  },
  {
    title: "AI Product Development",
    problem: "Ideas stuck without AI engineering muscle.",
    icon: "🚀",
    points: ["Custom AI SaaS", "API Platforms", "Enterprise AI", "MLOps & Deployment"],
  },
];

export default function Solutions() {
  return (
    <section id="solutions" className="relative section">
      <SectionHeading
        eyebrow="Solutions"
        title={
          <>
            We solve <span className="text-gradient">business problems</span>, not just
            ship models
          </>
        }
        subtitle="Every engagement starts from a measurable business outcome — cost saved, hours returned, revenue unlocked."
      />

      <div className="mt-14 grid gap-5 md:grid-cols-2">
        {SOLUTIONS.map((s, i) => (
          <Reveal key={s.title} delay={i * 0.08}>
            <motion.div
              whileHover={{ y: -6 }}
              className="group relative h-full overflow-hidden rounded-3xl glass p-7"
            >
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-neon-cyan/0 to-neon-blue/0 opacity-0 transition-opacity duration-500 group-hover:from-neon-cyan/[0.06] group-hover:to-neon-blue/[0.04] group-hover:opacity-100" />
              <div className="relative flex items-start justify-between">
                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-fg/5 text-2xl ring-1 ring-fg/10">
                  {s.icon}
                </div>
                <span className="rounded-full border border-fg/10 bg-fg/5 px-3 py-1 text-[11px] text-fg/50">
                  Problem → Outcome
                </span>
              </div>
              <h3 className="relative mt-5 font-display text-xl font-semibold">
                {s.title}
              </h3>
              <p className="relative mt-2 text-sm text-fg/50">{s.problem}</p>
              <div className="relative mt-5 flex flex-wrap gap-2">
                {s.points.map((p) => (
                  <span
                    key={p}
                    className="rounded-full border border-fg/10 bg-fg/[0.03] px-3 py-1.5 text-xs text-fg/70 transition-colors group-hover:border-neon-cyan/40 group-hover:text-fg"
                  >
                    {p}
                  </span>
                ))}
              </div>
            </motion.div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
