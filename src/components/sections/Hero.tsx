"use client";

import { motion, useReducedMotion } from "framer-motion";
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
  const reduce = useReducedMotion();

  return (
    <section
      id="top"
      className="relative flex min-h-[88vh] flex-col overflow-hidden pt-32 sm:pt-36"
    >
      <PhenomFlow variant="hero" />

      <div className="section relative z-10 grid w-full flex-1 items-center gap-10 py-0.5 lg:grid-cols-[1.35fr_1fr] lg:gap-14 xl:gap-20 2xl:max-w-[1600px] min-[1920px]:max-w-[1800px] min-[2200px]:max-w-[2000px] min-[2560px]:max-w-[2250px] min-[3440px]:max-w-[2600px]">
        <div>
          <motion.span
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9 }}
            className="eyebrow"
          >
            <span className="h-1 w-1 shrink-0 rounded-full bg-neon-cyan animate-pulseGlow" />
            <span>Low-Code Implementation • No Training Required</span>
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.05 }}
            className="font-display text-[clamp(1.5rem,7vw,2.15rem)] font-medium leading-[1.05] tracking-[-0.035em] sm:text-5xl md:text-[3.75rem] lg:text-[4.25rem]"
          >
            <span className="block">AI Powered</span>
            <RotatingText
              words={ROTATING_WORDS}
              className="text-gradient-pastel"
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

          <div className="mt-10 grid max-w-lg grid-cols-2 gap-x-5 gap-y-6 xs:gap-x-8 sm:grid-cols-4">
            {STATS.map((s, i) => {
              const fill = `${s.bar}%`;
              return (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.6, delay: 0.35 + i * 0.08 }}
                  className="group relative isolate"
                >
                  <motion.div
                    initial="rest"
                    animate="rest"
                    whileHover={reduce ? undefined : "hover"}
                      variants={{ rest: { y: 0, scale: 1 }, hover: { y: -5, scale: 1.03 } }}
                      transition={{ type: "spring", stiffness: 280, damping: 18 }}
                      className="relative cursor-default"
                    >
                      {!reduce && (
                        <motion.div
                          aria-hidden
                          className="pointer-events-none absolute -inset-3 -z-10 rounded-2xl blur-xl"
                          style={{
                            background:
                              "radial-gradient(60% 60% at 32% 30%, rgba(171,156,238,0.30), rgba(123,211,207,0.18) 55%, transparent 75%)",
                          }}
                          initial={{ opacity: 0.2, scale: 0.9 }}
                          animate={{ opacity: [0.2, 0.5, 0.2], scale: [0.9, 1.05, 0.9] }}
                          transition={{
                            duration: 4.6,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: i * 0.65,
                          }}
                        />
                      )}

                      <div
                        aria-hidden
                        className="pointer-events-none absolute -inset-3 -z-10 rounded-2xl bg-neon-violet/25 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
                      />

                      <div className="pointer-events-none absolute -inset-1 -z-10 overflow-hidden rounded-2xl">
                        {!reduce && (
                          <motion.span
                            aria-hidden
                            className="absolute inset-y-0 -left-1/2 w-1/2 -skew-x-[20deg]"
                            style={{
                              background:
                                "linear-gradient(90deg, transparent, rgba(255,255,255,0.12), transparent)",
                            }}
                            animate={{ x: ["0%", "320%"] }}
                            transition={{
                              duration: 3.2,
                              repeat: Infinity,
                              repeatDelay: 2.4,
                              ease: "easeInOut",
                              delay: 1 + i * 0.4,
                            }}
                          />
                        )}
                      </div>

                      <motion.div
                        variants={
                          reduce ? undefined : { rest: { scale: 1 }, hover: { scale: 1.08 } }
                        }
                        transition={{ type: "spring", stiffness: 320, damping: 14 }}
                        className="font-display text-3xl font-semibold tracking-tight text-fg sm:text-4xl"
                      >
                        <Counter to={s.value} />
                        <span className="text-gradient-pastel">{s.suffix}</span>
                      </motion.div>

                      <div className="mt-1.5 text-sm text-fg/50 transition-colors duration-300 group-hover:text-fg/70">
                        {s.label}
                      </div>

                      <div className="relative mt-3 h-1 w-full overflow-hidden rounded-full bg-fg/10">
                        <motion.div
                          className="relative h-full rounded-full"
                          style={{
                            width: fill,
                            background:
                              "linear-gradient(90deg, #ff8045 0%, #7bd3cf 50%, #ab9cee 100%)",
                            transformOrigin: "left center",
                          }}
                          initial={{ scaleX: reduce ? 1 : 0 }}
                          animate={{ scaleX: 1 }}
                          transition={{
                            duration: 1.2,
                            delay: 0.4 + i * 0.1,
                            ease: "easeOut",
                          }}
                        >
                          {!reduce && (
                            <motion.span
                              aria-hidden
                              className="absolute inset-y-0 left-0 w-1/3 rounded-full"
                              style={{
                                background:
                                  "linear-gradient(90deg, transparent, rgba(255,255,255,0.7), transparent)",
                              }}
                              animate={{ x: ["-120%", "420%"] }}
                              transition={{
                                duration: 2.4,
                                repeat: Infinity,
                                ease: "easeInOut",
                                delay: 1.1 + i * 0.3,
                                repeatDelay: 1.3,
                              }}
                            />
                          )}
                        </motion.div>
                      </div>
                    </motion.div>
                </motion.div>
              );
            })}
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
