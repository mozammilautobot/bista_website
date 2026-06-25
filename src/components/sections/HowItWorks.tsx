"use client";

import { motion } from "framer-motion";
import { Search, PenLine, Wrench, Rocket, TrendingUp, type LucideIcon } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import AnimatedIcon from "@/components/ui/AnimatedIcon";
import PhenomFlow from "@/components/ui/PhenomFlow";

const STEPS: { n: string; title: string; desc: string; icon: LucideIcon }[] = [
  { n: "01", title: "Discover", desc: "Understand the business process, data, and goals.", icon: Search },
  { n: "02", title: "Design", desc: "Architect the AI workflow and agent topology.", icon: PenLine },
  { n: "03", title: "Build", desc: "Develop, train and harden the AI solution.", icon: Wrench },
  { n: "04", title: "Deploy", desc: "Integrate securely with your existing systems.", icon: Rocket },
  { n: "05", title: "Optimize", desc: "Continuous learning, monitoring and improvement.", icon: TrendingUp },
];

export default function HowItWorks() {
  return (
    <section id="how" className="band band-black">
      <PhenomFlow variant="dark" />
      <div className="section relative z-10">
      <SectionHeading
        eyebrow="How It Works"
        tone="dark"
        title={
          <>
            From idea to <span className="text-gradient">deployed AI</span> in five steps
          </>
        }
        subtitle="A proven delivery framework that de-risks AI adoption and ships measurable value fast."
      />

      <div className="relative mt-10">
        <div className="absolute left-0 right-0 top-7 hidden h-px bg-gradient-to-r from-transparent via-neon-cyan/40 to-transparent lg:block" />
        {/* energy pulse traveling along the timeline */}
        <motion.span
          aria-hidden
          className="absolute top-7 hidden h-2.5 w-2.5 -translate-y-1/2 rounded-full bg-neon-cyan shadow-[0_0_14px_rgba(69,67,217,0.9)] lg:block"
          animate={{ left: ["1%", "99%"], opacity: [0, 1, 1, 0] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", times: [0, 0.1, 0.9, 1] }}
        />
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
          {STEPS.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.1}>
              <div className="relative text-center">
                <AnimatedIcon icon={s.icon} size="md" delay={i * 0.18} className="mx-auto" />
                <div className="mt-4 font-display text-xs font-semibold tracking-[0.3em] text-neon-cyan">
                  {s.n}
                </div>
                <h3 className="mt-1 font-display text-lg font-semibold">{s.title}</h3>
                <p className="mt-2 text-sm text-fg/55">{s.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
      </div>
    </section>
  );
}
