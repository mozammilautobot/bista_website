"use client";

import { motion } from "framer-motion";
import NetworkBackground from "@/components/ui/NetworkBackground";
import Counter from "@/components/ui/Counter";
import ClientLogos from "@/components/sections/ClientLogos";

const STATS = [
  { value: 98, suffix: "%", label: "Accuracy" },
  { value: 85, suffix: "%", label: "Time Saved" },
  { value: 3, suffix: "X", label: "Productivity" },
  { value: 100, suffix: "+", label: "Customers" },
];

export default function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-screen flex-col overflow-hidden bg-aurora pt-28"
    >
      <div className="absolute inset-0 bg-grid-faint bg-[size:46px_46px] [mask-image:radial-gradient(ellipse_at_center,#000_80%,transparent_75%)]" />
      <NetworkBackground className="opacity-70" />
      <div className="pointer-events-none absolute -left-40 top-20 h-96 w-96 rounded-full bg-neon-blue/20 blur-[120px]" />
      <div className="pointer-events-none absolute -right-40 bottom-10 h-96 w-96 rounded-full bg-neon-violet/20 blur-[120px]" />

      <div className="section relative z-10 grid flex-1 items-center gap-4 py-0.5 lg:grid-cols-[1.5fr_1.3fr]">
        <div>
          <motion.span
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9 }}
            className="eyebrow"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-neon-cyan animate-pulseGlow" />
            Autonomous AI • Intelligent Document Processing
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.05 }}
            className="font-display text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl md:text-6xl"
          >
            Autonomous <span className="text-gradient glow-text">AI Agents</span> &
            Intelligent Document Processing for Modern Enterprises
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="mt-6 max-w-xl text-base leading-relaxed text-fg/65 sm:text-lg"
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

          <div className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {STATS.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.35 + i * 0.08 }}
                className="glass rounded-3xl p-4"
              >
                <div className="font-display text-2xl font-bold text-fg sm:text-3xl">
                  <Counter to={s.value} />
                  <span className="text-neon-cyan">{s.suffix}</span>
                </div>
                <div className="mt-1 text-xs text-fg/55">{s.label}</div>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative mx-auto hidden w-full max-w-none lg:block lg:-mt-40 xl:-mr-10"
        >
          <div className="relative h-auto w-full overflow-hidden rounded-3xl">
            <video
              className="block h-auto w-full"
              src="/Recording.mp4"
              autoPlay
              loop
              muted
              playsInline
            />
          </div>
        </motion.div>
      </div>

      <ClientLogos />
    </section>
  );
}
