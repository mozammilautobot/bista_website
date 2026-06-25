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
import PhenomFlow from "@/components/ui/PhenomFlow";
import AIEngineViz from "@/components/ui/AIEngineViz";

const FEATURES: { title: string; desc: string; icon: LucideIcon }[] = [
  { title: "Own Developed Model", desc: "Deep models tuned to your domain data.", icon: BrainCircuit },
  { title: "Floating Data Streams", desc: "Real-time pipelines feeding live agents.", icon: Waves },
  { title: "Customizable Dashboards", desc: "See every agent decision as it happens.", icon: LayoutDashboard },
  { title: "Global AI Activity", desc: "Agents operating across regions, 24/7.", icon: Globe },
];

export default function Innovation() {
  return (
    <section id="innovation" className="relative overflow-hidden">
      <PhenomFlow variant="page" />
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
            <div className="relative mx-auto w-full max-w-[440px]">
              {/* rotating pastel glow behind the video (phenom hero feel) */}
              <motion.div
                aria-hidden
                className="pointer-events-none absolute -inset-4 rounded-[2.25rem] bg-[conic-gradient(from_0deg,#ff8045,#7bd3cf,#ab9cee,#4543d9,#ff8045)] opacity-40 blur-2xl"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              />
              <motion.div
                className="relative overflow-hidden rounded-[1.85rem] ring-1 ring-white/15 shadow-[0_34px_90px_-32px_rgba(69,67,217,0.55)]"
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              >
                <AIEngineViz />
                {/* subtle veil for depth */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-950/25 via-transparent to-transparent" />
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
        <span className="flex items-center gap-1.5 text-xs text-neon-cyan">
          <span className="h-1.5 w-1.5 animate-pulseGlow rounded-full bg-neon-cyan" />
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
