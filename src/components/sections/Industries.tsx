"use client";

import { motion } from "framer-motion";
import {
  Building2,
  Truck,
  Ship,
  Factory,
  Landmark,
  ShieldCheck,
  ShoppingBag,
  Scale,
  type LucideIcon,
} from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import IndustriesMap from "@/components/ui/IndustriesMap";

const INDUSTRIES: { name: string; icon: LucideIcon }[] = [
  { name: "ERP", icon: Building2 },
  { name: "Logistics", icon: Truck },
  { name: "Shipping", icon: Ship },
  { name: "Manufacturing", icon: Factory },
  { name: "Banking", icon: Landmark },
  { name: "Insurance", icon: ShieldCheck },
  { name: "Retail", icon: ShoppingBag },
  { name: "Legal", icon: Scale },
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

      <div className="mt-14 grid items-center gap-10 lg:grid-cols-2">
        <Reveal>
          <div className="overflow-hidden rounded-3xl border border-fg/10 bg-white p-4 shadow-sm sm:p-6">
            <IndustriesMap />
          </div>
        </Reveal>

        <div className="grid grid-cols-1 gap-4 xs:grid-cols-2">
          {INDUSTRIES.map((ind, i) => (
            <Reveal key={ind.name} delay={i * 0.05}>
              <motion.div
                whileHover={{ y: -6, rotate: -1 }}
                className="group relative flex items-center gap-4 overflow-hidden rounded-2xl glass p-4 transition-shadow hover:shadow-glow sm:p-5"
              >
                <div className="relative grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-neon-cyan/10 text-neon-blue ring-1 ring-neon-cyan/20 transition-transform group-hover:scale-110 sm:h-12 sm:w-12">
                  <motion.span
                    aria-hidden
                    className="pointer-events-none absolute inset-0 rounded-xl ring-2 ring-neon-cyan/30"
                    animate={{ opacity: [0.15, 0.6, 0.15], scale: [1, 1.18, 1] }}
                    transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut", delay: i * 0.15 }}
                  />
                  <ind.icon className="relative h-6 w-6" strokeWidth={1.75} />
                </div>
                <span className="font-display font-semibold">{ind.name}</span>
                <div className="pointer-events-none absolute -right-6 -top-6 h-20 w-20 rounded-full bg-neon-cyan/10 blur-xl opacity-0 transition-opacity group-hover:opacity-100" />
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
