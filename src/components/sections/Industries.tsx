"use client";

import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";

const INDUSTRIES = [
  { name: "ERP", icon: "🈺" },
  { name: "Logistics", icon: "🚚" },
  { name: "Shipping", icon: "🚢" },
  { name: "Manufacturing", icon: "🏭" },
  { name: "Banking", icon: "🏦" },
  { name: "Insurance", icon: "🛡️" },
  { name: "Retail", icon: "🛍️" },
  { name: "Legal", icon: "⚖️" },
];

export default function Industries() {
  return (
    <section id="industries" className="section">
      <SectionHeading
        eyebrow="Industries"
        title={
          <>
            Trusted across <span className="text-gradient">regulated, document-heavy</span>{" "}
            industries
          </>
        }
        subtitle="Domain-tuned AI that understands the vocabulary, compliance and edge cases of your sector."
      />

      <div className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {INDUSTRIES.map((ind, i) => (
          <Reveal key={ind.name} delay={i * 0.05}>
            <motion.div
              whileHover={{ y: -6, rotate: -1 }}
              className="group relative flex items-center gap-4 overflow-hidden rounded-2xl glass p-5 transition-shadow hover:shadow-glow"
            >
              <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-fg/5 text-2xl ring-1 ring-fg/10 transition-transform group-hover:scale-110">
                {ind.icon}
              </div>
              <span className="font-display font-semibold">{ind.name}</span>
              <div className="pointer-events-none absolute -right-6 -top-6 h-20 w-20 rounded-full bg-neon-cyan/10 blur-xl opacity-0 transition-opacity group-hover:opacity-100" />
            </motion.div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
