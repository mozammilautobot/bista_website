"use client";

import { motion } from "framer-motion";
import Counter from "@/components/ui/Counter";
import Reveal from "@/components/ui/Reveal";
import PhenomFlow from "@/components/ui/PhenomFlow";

const RESULTS = [
  { value: 20, suffix: "K+", label: "Manual hours saved every year" },
  { value: 98, suffix: "%", label: "Document extraction accuracy" },
  { value: 85, suffix: "%", label: "Faster end-to-end processing" },
  { value: 100, suffix: "+", label: "Enterprises running on Bista AI" },
];

export default function ResultsBand() {
  return (
    <section id="results" className="band band-black">
      <PhenomFlow variant="dark" />

      <div className="section relative z-10">
        <Reveal className="max-w-3xl">
          <span className="eyebrow">
            <span className="h-1.5 w-1.5 rounded-full bg-neon-violet animate-pulseGlow" />
            By the numbers
          </span>
          <h2 className="font-display text-[2rem] font-medium leading-[1.05] tracking-[-0.03em] sm:text-[2.6rem] md:text-5xl lg:text-[3.25rem]">
            Results that{" "}
            <span className="text-gradient-pastel">speak volumes</span>
          </h2>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/55">
            Real outcomes measured across live deployments — the kind of numbers
            that move a P&amp;L, not a slide deck.
          </p>
        </Reveal>

        <div className="mt-16 grid grid-cols-2 gap-x-8 gap-y-12 lg:grid-cols-4">
          {RESULTS.map((r, i) => (
            <motion.div
              key={r.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="relative"
            >
              <div className="font-display text-5xl font-semibold tracking-[-0.04em] text-white sm:text-6xl lg:text-[4.25rem]">
                <Counter to={r.value} />
                <span className="text-gradient-pastel">{r.suffix}</span>
              </div>
              <div className="mt-3 max-w-[14rem] text-sm leading-relaxed text-white/55">
                {r.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
