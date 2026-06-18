"use client";

import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";

const STEPS = [
  { n: "01", title: "Discover", desc: "Understand the business process, data, and goals.", icon: "🔍" },
  { n: "02", title: "Design", desc: "Architect the AI workflow and agent topology.", icon: "✏️" },
  { n: "03", title: "Build", desc: "Develop, train and harden the AI solution.", icon: "🛠️" },
  { n: "04", title: "Deploy", desc: "Integrate securely with your existing systems.", icon: "🚀" },
  { n: "05", title: "Optimize", desc: "Continuous learning, monitoring and improvement.", icon: "📈" },
];

export default function HowItWorks() {
  return (
    <section id="how" className="section">
      <SectionHeading
        eyebrow="How It Works"
        title={
          <>
            From idea to <span className="text-gradient">deployed AI</span> in five steps
          </>
        }
        subtitle="A proven delivery framework that de-risks AI adoption and ships measurable value fast."
      />

      <div className="relative mt-16">
        <div className="absolute left-0 right-0 top-7 hidden h-px bg-gradient-to-r from-transparent via-neon-cyan/40 to-transparent lg:block" />
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
          {STEPS.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.1}>
              <div className="relative text-center">
                <div className="relative mx-auto grid h-14 w-14 place-items-center rounded-2xl glass-strong text-2xl shadow-glow">
                  {s.icon}
                  <motion.span
                    className="absolute inset-0 rounded-2xl border border-neon-cyan/40"
                    animate={{ opacity: [0.2, 0.7, 0.2] }}
                    transition={{ duration: 2.4, repeat: Infinity, delay: i * 0.3 }}
                  />
                </div>
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
    </section>
  );
}
