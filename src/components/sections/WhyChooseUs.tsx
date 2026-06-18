"use client";

import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";

const REASONS = [
  { title: "AI Automation Expert", desc: "A team that builds AI products daily — not a generalist agency dabbling in ML.", icon: "🧠" },
  { title: "Enterprise Security", desc: "SOC2-aligned practices, data isolation, on-prem & VPC deployment options.", icon: "🔒" },
  { title: "Rapid Deployment", desc: "Production pilots in weeks, not quarters, with reusable accelerators.", icon: "⚡" },
  { title: "Custom Development", desc: "Solutions shaped to your workflows and systems — never one-size-fits-all.", icon: "🧩" },
  { title: "Scalable Architecture", desc: "Cloud-native, event-driven systems that scale from pilot to millions of docs.", icon: "📐" },
  { title: "ROI Focused", desc: "We commit to measurable outcomes and track value from day one.", icon: "💰" },
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

      <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {REASONS.map((r, i) => (
          <Reveal key={r.title} delay={i * 0.07}>
            <motion.div
              whileHover={{ y: -6 }}
              className="group relative h-full overflow-hidden rounded-3xl glass p-7 transition-shadow hover:shadow-glow-violet"
            >
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-fg/10 to-fg/[0.02] text-2xl ring-1 ring-fg/10">
                {r.icon}
              </div>
              <h3 className="mt-5 font-display text-lg font-semibold">{r.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-fg/55">{r.desc}</p>
            </motion.div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
