"use client";

import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";

const ROWS = [
  {
    feature: "Pricing",
    others: "High cost per page or document",
    bista: "Cost per page & on-premise unlimited model",
  },
  {
    feature: "Deployment",
    others: "Cloud only — rigid",
    bista: "Cloud & on-premises",
  },
  {
    feature: "Customization",
    others: "Limited",
    bista: "Self-configurable with add-on customization",
  },
  {
    feature: "Integration",
    others: "Complex setup",
    bista: "Developer-friendly integration",
  },
  {
    feature: "Speed to Go-Live",
    others: "Weeks / Months",
    bista: "Days",
  },
  {
    feature: "Scalability",
    others: "Add-on cost",
    bista: "Built-in elasticity",
  },
];

function CrossIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0" fill="none" aria-hidden>
      <path
        d="m6 6 12 12M18 6 6 18"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0" fill="none" aria-hidden>
      <path
        d="m5 12.5 4.5 4.5L19 7"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function Comparison() {
  return (
    <section id="comparison" className="relative section">
      <div className="pointer-events-none absolute right-1/4 top-10 h-72 w-72 rounded-full bg-neon-violet/10 blur-[120px]" />
      <SectionHeading
        eyebrow="Why Bista Doc AI"
        title={
          <>
            Why choose <span className="text-gradient">Bista Doc AI</span> over legacy
            IDP vendors
          </>
        }
        subtitle="Lower cost. Faster deployment. Smarter integration."
      />

      <Reveal delay={0.05}>
        <div className="mx-auto mt-12 max-w-5xl overflow-hidden rounded-3xl glass">
          {/* Header row */}
          <div className="grid grid-cols-[1.1fr_1fr_1.2fr] items-stretch">
            <div className="px-5 py-5 text-xs font-semibold uppercase tracking-[0.15em] text-fg/55 sm:px-7 sm:text-sm">
              Feature
            </div>
            <div className="px-5 py-5 text-center text-xs font-semibold uppercase tracking-[0.15em] text-fg/55 sm:px-7 sm:text-sm">
              Other Platforms
            </div>
            <div className="relative px-5 py-5 text-center text-xs font-semibold uppercase tracking-[0.15em] text-ink-950 sm:px-7 sm:text-sm">
              <div className="absolute inset-0 bg-gradient-to-b from-neon-cyan to-neon-blue" />
              <span className="relative flex items-center justify-center gap-2">
                <img
                  src="/Bista.png"
                  alt=""
                  className="h-4 w-4 object-contain"
                />
                Bista Doc AI
              </span>
            </div>
          </div>

          {/* Rows */}
          {ROWS.map((row, i) => (
            <motion.div
              key={row.feature}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45, delay: i * 0.05 }}
              className="grid grid-cols-[1.1fr_1fr_1.2fr] items-stretch border-t border-fg/10"
            >
              <div className="flex items-center px-5 py-4 text-sm font-semibold text-fg sm:px-7">
                {row.feature}
              </div>
              <div className="flex items-center justify-center gap-2 px-5 py-4 text-center text-sm text-fg/55 sm:px-7">
                <span className="text-fg/30">
                  <CrossIcon />
                </span>
                <span>{row.others}</span>
              </div>
              <div className="relative flex items-center justify-center gap-2 px-5 py-4 text-center text-sm font-medium text-fg sm:px-7">
                <div className="absolute inset-0 bg-neon-cyan/[0.07]" />
                <span className="relative text-neon-cyan">
                  <CheckIcon />
                </span>
                <span className="relative">{row.bista}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </Reveal>

      <Reveal delay={0.1}>
        <div className="mt-8 flex justify-center">
          <a href="#contact" className="btn-primary">
            See the difference live
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none">
              <path
                d="M5 12h14m-6-6 6 6-6 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </div>
      </Reveal>
    </section>
  );
}
