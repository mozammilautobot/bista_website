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
import AnimatedIcon from "@/components/ui/AnimatedIcon";

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
          <IndustriesMap />
        </Reveal>

        <div className="grid grid-cols-1 gap-4 xs:grid-cols-2">
          {INDUSTRIES.map((ind, i) => (
            <Reveal key={ind.name} delay={i * 0.05}>
              <motion.div
                whileHover={{ y: -6, rotate: -1 }}
                className="group relative flex items-center gap-4 overflow-hidden rounded-2xl glass p-4 transition-shadow hover:shadow-glow sm:p-5"
              >
                <AnimatedIcon icon={ind.icon} size="sm" delay={i * 0.15} className="shrink-0" />
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
