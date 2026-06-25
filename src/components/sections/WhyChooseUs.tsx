"use client";

import { motion } from "framer-motion";
import {
  BrainCircuit,
  ShieldCheck,
  Zap,
  Puzzle,
  Layers,
  TrendingUp,
  type LucideIcon,
} from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";

const REASONS: { title: string; desc: string; icon: LucideIcon }[] = [
  { title: "AI Automation Expert", desc: "A team that builds AI products daily — not a generalist agency dabbling in ML.", icon: BrainCircuit },
  { title: "Enterprise Security", desc: "SOC2-aligned practices, data isolation, on-prem & VPC deployment options.", icon: ShieldCheck },
  { title: "Rapid Deployment", desc: "Production pilots in weeks, not quarters, with reusable accelerators.", icon: Zap },
  { title: "Custom Development", desc: "Solutions shaped to your workflows and systems — never one-size-fits-all.", icon: Puzzle },
  { title: "Scalable Architecture", desc: "Cloud-native, event-driven systems that scale from pilot to millions of docs.", icon: Layers },
  { title: "ROI Focused", desc: "We commit to measurable outcomes and track value from day one.", icon: TrendingUp },
];

export default function WhyChooseUs() {
  return (
    <section id="why" className="relative section">
      <div className="pointer-events-none absolute right-0 top-1/3 h-72 w-72 rounded-full bg-neon-violet/10 blur-[120px]" />
      <SectionHeading
        eyebrow="Why Choose Bista AI?"
        title={
          <>
            Built like a <span className="text-gradient">product company</span>, delivered
            like a partner
          </>
        }
      />

      <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {REASONS.map((r, i) => (
          <Reveal key={r.title} delay={i * 0.07}>
            <motion.div
              whileHover={{ y: -6 }}
              className="group relative h-full overflow-hidden rounded-[1.75rem] glass p-8 transition-shadow hover:shadow-glow-violet"
            >
              <r.icon
                aria-hidden
                className="pointer-events-none absolute -bottom-7 -right-7 h-40 w-40 text-neon-violet/[0.04] transition-all duration-500 ease-out group-hover:-bottom-3 group-hover:-right-3 group-hover:-rotate-6 group-hover:scale-110 group-hover:text-neon-violet/[0.16]"
                strokeWidth={1}
              />
              <div className="relative grid h-12 w-12 place-items-center rounded-2xl bg-neon-cyan/10 text-neon-blue ring-1 ring-neon-cyan/20">
                <r.icon className="h-6 w-6" strokeWidth={1.75} />
              </div>
              <h3 className="relative mt-5 font-display text-lg font-semibold">{r.title}</h3>
              <p className="relative mt-2 text-sm leading-relaxed text-fg/55">{r.desc}</p>
            </motion.div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
