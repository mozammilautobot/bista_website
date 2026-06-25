"use client";

import { motion } from "framer-motion";
import PhenomFlow from "@/components/ui/PhenomFlow";
import Counter from "@/components/ui/Counter";
import ClientLogos from "@/components/sections/ClientLogos";
import RotatingText from "@/components/ui/RotatingText";
import BeforeAfterSlider from "@/components/ui/BeforeAfterSlider";

const ROTATING_WORDS = [
  "Document Processing",
  "Workflow Automation",
  "Excel Automation",
  "Modern Enterprises",
];

const STATS = [
  { value: 98, suffix: "%", label: "Accuracy", bar: 98 },
  { value: 85, suffix: "%", label: "Time Saved", bar: 85 },
  { value: 3, suffix: "X", label: "Productivity", bar: 72 },
  { value: 100, suffix: "+", label: "Customers", bar: 92 },
];

export default function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-screen flex-col overflow-hidden pt-28"
    >
      <PhenomFlow variant="hero" />

      <div className="section relative z-10 grid flex-1 items-center gap-12 py-0.5 lg:grid-cols-[1.4fr_1fr]">
        <div>
          <motion.span
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9 }}
            className="eyebrow"
          >
            <span className="h-1 w-1 rounded-full bg-neon-cyan animate-pulseGlow" />
             Low-Code Implementation • No Training Required
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.05 }}
            className="font-display text-[2.6rem] font-medium leading-[1.0] tracking-[-0.035em] xs:text-6xl sm:text-7xl md:text-[5.25rem] lg:text-[5.75rem]"
          >
            <span className="block">AI Powered</span>
            <RotatingText
              words={ROTATING_WORDS}
              className="h-1.05 w-1.05 text-gradient-pastel"
            />
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="mt-7 max-w-lg text-lg leading-relaxed text-fg/60"
          >
            We build AI-powered products, intelligent document processing solutions,
            AI agents, and workflow automation systems that reduce manual effort and
            accelerate business growth.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <a href="https://calendly.com/mozammilrizwan/agentic-automation" target="_blank" rel="noopener noreferrer" className="btn-primary">
              Book a Demo
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none">
                <path d="M5 12h14m-6-6 6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
            <a href="#solutions" className="btn-ghost">
              View Solutions
            </a>
          </motion.div>

          <div className="mt-14 grid max-w-lg grid-cols-2 gap-x-8 gap-y-8 sm:grid-cols-4">
            {STATS.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.35 + i * 0.08 }}
              >
                <div className="font-display text-3xl font-semibold tracking-tight text-fg sm:text-4xl">
                  <Counter to={s.value} />
                  <span className="text-gradient-pastel">{s.suffix}</span>
                </div>
                <div className="mt-1.5 text-sm text-fg/50">{s.label}</div>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative mx-auto mt-10 w-full max-w-xl lg:mt-0 lg:max-w-none"
        >
          <BeforeAfterSlider />
        </motion.div>
      </div>

      <ClientLogos />
    </section>
  );
}
