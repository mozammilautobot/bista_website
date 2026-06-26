"use client";

import { motion } from "framer-motion";
import { FileText, Bot, RefreshCw, Rocket, type LucideIcon } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import AnimatedIcon from "@/components/ui/AnimatedIcon";

const SOLUTIONS: {
  title: string;
  problem: string;
  icon: LucideIcon;
  points: string[];
}[] = [
  {
    title: "Intelligent Document Processing",
    problem: "Teams drowning in PDFs, invoices & forms.",
    icon: FileText,
    points: ["OCR & Classification", "Data Extraction", "Invoice Processing", "KYC Verification"],
  },
  {
    title: "Agentic AI Solutions",
    problem: "Repetitive knowledge work that scales poorly.",
    icon: Bot,
    points: ["Autonomous Agents", "Multi-Agent Systems", "AI Assistants", "Tool Use & RAG"],
  },
  {
    title: "Business Process Automation",
    problem: "Manual handoffs across departments.",
    icon: RefreshCw,
    points: ["HR Automation", "Finance Automation", "Email Automation", "Excel Automation"],
  },
  {
    title: "AI Product Development",
    problem: "Ideas stuck without AI engineering muscle.",
    icon: Rocket,
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

      <div className="mt-14 grid gap-6 md:grid-cols-2">
        {SOLUTIONS.map((s, i) => (
          <Reveal key={s.title} delay={i * 0.08}>
            <motion.div
              whileHover={{ y: -6 }}
              className="group relative h-full overflow-hidden rounded-[1.75rem] glass p-8 sm:p-9"
            >
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-neon-cyan/0 to-neon-blue/0 opacity-0 transition-opacity duration-500 group-hover:from-neon-cyan/[0.06] group-hover:to-neon-blue/[0.04] group-hover:opacity-100" />
              <s.icon
                aria-hidden
                className="pointer-events-none absolute -bottom-7 -right-7 h-40 w-40 text-fg/[0.04] transition-all duration-500 ease-out group-hover:-bottom-3 group-hover:-right-3 group-hover:rotate-6 group-hover:scale-110 group-hover:text-fg/[0.10]"
                strokeWidth={1}
              />
              <div className="relative flex items-start justify-between">
                <AnimatedIcon icon={s.icon} size="md" delay={i * 0.15} />
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
