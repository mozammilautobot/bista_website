"use client";

import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";

const TECH = [
  "Google Gemini",
  "Microsoft Azure",
  "Claude",
  "Amazon Web Services",
  "Play Wright",
  "LangChain",
  "CrewAI",
  "AutoGen",
  "FastAPI",
  "Docker",
  "Kubernetes",
  "Vector Databases",
];

export default function TechStack() {
  return (
    <section id="tech" className="section">
      <SectionHeading
        eyebrow="Technology Stack"
        title={
          <>
            Engineered on a <span className="text-gradient">best-in-class AI stack</span>
          </>
        }
        subtitle="We pick the right model and infrastructure for the job — and stay cloud and vendor flexible."
      />

      <div className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {TECH.map((t, i) => (
          <Reveal key={t} delay={i * 0.04}>
            <motion.div
              animate={{ y: [0, -7, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: (i % 6) * 0.35 }}
              whileHover={{ y: -12, scale: 1.05 }}
              className="group relative flex items-center justify-center gap-3 overflow-hidden rounded-2xl glass px-4 py-6 text-center"
            >
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-neon-cyan/0 to-neon-blue/0 opacity-0 transition-opacity duration-500 group-hover:from-neon-cyan/10 group-hover:to-neon-blue/[0.06] group-hover:opacity-100" />
              <span className="relative h-2 w-2 rounded-full bg-neon-cyan shadow-glow transition-transform group-hover:scale-150" />
              <span className="relative text-sm font-medium text-fg/75 transition-colors group-hover:text-fg">
                {t}
              </span>
            </motion.div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
