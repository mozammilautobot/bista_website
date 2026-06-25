"use client";

import { motion } from "framer-motion";
import NetworkBackground from "@/components/ui/NetworkBackground";
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
      className="relative flex min-h-screen flex-col overflow-hidden bg-aurora pt-28"
    >
      <div className="absolute inset-0 bg-grid-faint bg-[size:46px_46px] [mask-image:radial-gradient(ellipse_at_center,#000_80%,transparent_75%)]" />
      <NetworkBackground className="opacity-[0.35]" />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -left-40 top-20 h-96 w-96 rounded-full bg-neon-cyan/15 blur-[120px]"
        animate={{ x: [0, 60, 0], y: [0, 30, 0], scale: [1, 1.15, 1] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -right-40 bottom-10 h-96 w-96 rounded-full bg-neon-violet/15 blur-[120px]"
        animate={{ x: [0, -50, 0], y: [0, -40, 0], scale: [1.1, 1, 1.1] }}
        transition={{ duration: 19, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="section relative z-10 grid flex-1 items-center gap-4 py-0.5 lg:grid-cols-[1.5fr_1.3fr]">
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
            className="font-display text-[1.7rem] font-bold leading-[1.12] tracking-[-0.02em] xs:text-4xl sm:text-5xl md:text-6xl"
          >
            <span className="block">AI Powered</span>
            <RotatingText
              words={ROTATING_WORDS}
              className="h-1.05 w-1.05 text-gradient glow-text"
            />
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="mt-6 max-w-xl text-base leading-relaxed text-fg/70 sm:text-lg"
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

          <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {STATS.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.35 + i * 0.08 }}
                whileHover={{ y: -6, scale: 1.03 }}
                className="group relative overflow-hidden rounded-3xl glass p-4 transition-shadow duration-300 hover:shadow-glow"
              >
                {/* hover sheen sweep */}
                <span className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 transition-all duration-700 ease-out group-hover:left-[140%] group-hover:opacity-100" />
                {/* corner glow */}
                <span className="pointer-events-none absolute -right-6 -top-6 h-16 w-16 rounded-full bg-neon-cyan/25 blur-xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                <div className="relative origin-left font-display text-2xl font-bold text-fg transition-transform duration-300 group-hover:scale-110 sm:text-3xl">
                  <Counter to={s.value} />
                  <span className="text-neon-cyan">{s.suffix}</span>
                </div>
                <div className="relative mt-1 text-xs text-fg/55">{s.label}</div>

                {/* animated fill meter */}
                <div className="relative mt-3 h-1 w-full overflow-hidden rounded-full bg-fg/10">
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-neon-cyan to-neon-blue"
                    initial={{ width: 0 }}
                    animate={{ width: `${s.bar}%` }}
                    transition={{ duration: 1.4, ease: "easeOut", delay: 0.5 + i * 0.12 }}
                  >
                    <span className="block h-full w-full animate-shimmer bg-[linear-gradient(110deg,transparent,rgba(255,255,255,0.6),transparent)] bg-[length:200%_100%]" />
                  </motion.div>
                </div>
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
