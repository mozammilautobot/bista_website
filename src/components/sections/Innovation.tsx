"use client";

import { motion } from "framer-motion";
import {
  BrainCircuit,
  Waves,
  LayoutDashboard,
  Globe,
  type LucideIcon,
} from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import NetworkBackground from "@/components/ui/NetworkBackground";

const FEATURES: { title: string; desc: string; icon: LucideIcon }[] = [
  { title: "Neural Networks", desc: "Deep models tuned to your domain data.", icon: BrainCircuit },
  { title: "Floating Data Streams", desc: "Real-time pipelines feeding live agents.", icon: Waves },
  { title: "Holographic Dashboards", desc: "See every agent decision as it happens.", icon: LayoutDashboard },
  { title: "Global AI Activity", desc: "Agents operating across regions, 24/7.", icon: Globe },
];

export default function Innovation() {
  return (
    <section id="innovation" className="relative overflow-hidden">
      <div className="absolute inset-0 bg-aurora" />
      <NetworkBackground className="opacity-40" density={0.00006} />
      <div className="section relative z-10">
        <SectionHeading
          eyebrow="AI Innovation"
          title={
            <>
              Where <span className="text-gradient-violet">futurism</span> meets function
            </>
          }
          subtitle="A live look at the intelligent fabric powering everything we build."
        />

        <div className="mt-10 grid items-center gap-10 lg:grid-cols-[0.85fr_1.15fr]">
          <Reveal>
            <div className="relative mx-auto flex aspect-square max-w-[300px] items-center justify-center">
              {/* rotating conic glow */}
              <motion.div
                aria-hidden
                className="absolute inset-0 rounded-full bg-[conic-gradient(from_0deg,transparent,rgba(34,197,94,0.28),transparent_55%)] blur-2xl"
                animate={{ rotate: 360 }}
                transition={{ duration: 16, repeat: Infinity, ease: "linear" }}
              />
              {/* pulsing halo rings */}
              <motion.div
                aria-hidden
                className="absolute h-[88%] w-[88%] rounded-full border border-neon-cyan/25"
                animate={{ scale: [1, 1.08, 1], opacity: [0.55, 0.2, 0.55] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.div
                aria-hidden
                className="absolute h-[72%] w-[72%] rounded-full border border-neon-violet/20"
                animate={{ scale: [1.05, 1, 1.05], opacity: [0.4, 0.6, 0.4] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              />
              {/* floating globe */}
              <motion.img
                src="/images/innovation-globe.png"
                alt="Global, always-on Bista AI activity across regions"
                className="relative w-[82%] drop-shadow-[0_12px_40px_rgba(34,197,94,0.25)]"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                loading="lazy"
              />
              {/* orbiting node */}
              <motion.div
                aria-hidden
                className="absolute h-full w-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 11, repeat: Infinity, ease: "linear" }}
              >
                <span className="absolute left-1/2 top-1 h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-neon-cyan shadow-[0_0_14px_rgba(34,197,94,0.9)]" />
              </motion.div>
              <motion.div
                aria-hidden
                className="absolute h-full w-full"
                animate={{ rotate: -360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              >
                <span className="absolute bottom-2 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-neon-violet shadow-[0_0_12px_rgba(16,185,129,0.9)]" />
              </motion.div>
            </div>
          </Reveal>

          <div className="grid gap-3 sm:grid-cols-2">
            {FEATURES.map((f, i) => (
              <Reveal key={f.title} delay={i * 0.08}>
                <div className="group h-full rounded-2xl glass p-4 transition-shadow hover:shadow-glow-violet">
                  <div className="grid h-9 w-9 place-items-center rounded-xl bg-neon-cyan/10 text-neon-blue ring-1 ring-neon-cyan/20">
                    <f.icon className="h-4 w-4" strokeWidth={1.75} />
                  </div>
                  <h3 className="mt-2.5 font-display text-sm font-semibold">{f.title}</h3>
                  <p className="mt-1 text-[13px] leading-snug text-fg/55">{f.desc}</p>
                </div>
              </Reveal>
            ))}

            <Reveal delay={0.3} className="sm:col-span-2">
              <HoloDashboard />
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

function HoloDashboard() {
  const bars = [40, 65, 52, 80, 60, 92, 70];
  return (
    <div className="relative overflow-hidden rounded-2xl glass-strong p-5">
      <div className="mb-3 flex items-center justify-between">
        <span className="text-sm font-medium text-fg/75">Live agent throughput</span>
        <span className="flex items-center gap-1.5 text-xs text-emerald-300">
          <span className="h-1.5 w-1.5 animate-pulseGlow rounded-full bg-emerald-300" />
          streaming
        </span>
      </div>
      <div className="flex h-24 items-end gap-2">
        {bars.map((h, i) => (
          <motion.div
            key={i}
            className="flex-1 rounded-t-md bg-gradient-to-t from-neon-blue/40 to-neon-cyan"
            animate={{ height: [`${h}%`, `${Math.max(20, h - 25)}%`, `${h}%`] }}
            transition={{ duration: 2.4, repeat: Infinity, delay: i * 0.18 }}
          />
        ))}
      </div>
      <div className="mt-3 grid grid-cols-3 gap-2.5 text-center">
        {[
          { k: "Tasks/min", v: "1,284" },
          { k: "Active agents", v: "37" },
          { k: "Accuracy", v: "99.2%" },
        ].map((s) => (
          <div key={s.k} className="rounded-xl bg-fg/5 p-2">
            <div className="font-display text-base font-bold text-fg">{s.v}</div>
            <div className="text-[10px] text-fg/45">{s.k}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
