"use client";

import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import NetworkBackground from "@/components/ui/NetworkBackground";

const FEATURES = [
  { title: "Neural Networks", desc: "Deep models tuned to your domain data.", icon: "🧠" },
  { title: "Floating Data Streams", desc: "Real-time pipelines feeding live agents.", icon: "🌊" },
  { title: "Holographic Dashboards", desc: "See every agent decision as it happens.", icon: "📡" },
  { title: "Global AI Activity", desc: "Agents operating across regions, 24/7.", icon: "🌍" },
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

        <div className="mt-14 grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <Globe />
          </Reveal>

          <div className="grid gap-4 sm:grid-cols-2">
            {FEATURES.map((f, i) => (
              <Reveal key={f.title} delay={i * 0.08}>
                <div className="group h-full rounded-3xl glass p-6 transition-shadow hover:shadow-glow-violet">
                  <div className="text-2xl">{f.icon}</div>
                  <h3 className="mt-3 font-display text-base font-semibold">{f.title}</h3>
                  <p className="mt-1.5 text-sm text-fg/55">{f.desc}</p>
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

function Globe() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-md">
      <div className="absolute inset-0 grid place-items-center">
        <div className="relative h-72 w-72 rounded-full">
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-neon-blue/20 via-transparent to-neon-violet/20 blur-md" />
          <div className="absolute inset-0 overflow-hidden rounded-full border border-neon-cyan/30">
            <motion.div
              className="absolute inset-0"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(transparent 0 22px, rgba(56,189,248,0.18) 22px 23px), repeating-linear-gradient(90deg, transparent 0 22px, rgba(56,189,248,0.12) 22px 23px)",
              }}
              animate={{ backgroundPositionX: ["0px", "46px"] }}
              transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
            />
            <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_30%_30%,rgba(34,211,238,0.25),transparent_55%)]" />
          </div>

          {/* orbit rings */}
          {[0, 60, 120].map((deg, i) => (
            <div
              key={deg}
              className="absolute inset-0 animate-spinSlow rounded-full border border-fg/10"
              style={{ transform: `rotate(${deg}deg) scaleY(0.32)`, animationDuration: `${18 + i * 6}s` }}
            />
          ))}

          {/* activity pings */}
          {[
            { x: 30, y: 35 },
            { x: 68, y: 42 },
            { x: 50, y: 64 },
            { x: 78, y: 70 },
            { x: 22, y: 60 },
          ].map((p, i) => (
            <span
              key={i}
              className="absolute h-2 w-2 rounded-full bg-neon-cyan shadow-glow"
              style={{ left: `${p.x}%`, top: `${p.y}%` }}
            >
              <motion.span
                className="absolute inset-0 rounded-full bg-neon-cyan"
                animate={{ scale: [1, 3], opacity: [0.7, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: i * 0.4 }}
              />
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function HoloDashboard() {
  const bars = [40, 65, 52, 80, 60, 92, 70];
  return (
    <div className="relative overflow-hidden rounded-3xl glass-strong p-6">
      <div className="mb-4 flex items-center justify-between">
        <span className="text-sm font-medium text-fg/75">Live agent throughput</span>
        <span className="flex items-center gap-1.5 text-xs text-emerald-300">
          <span className="h-1.5 w-1.5 animate-pulseGlow rounded-full bg-emerald-300" />
          streaming
        </span>
      </div>
      <div className="flex h-32 items-end gap-2">
        {bars.map((h, i) => (
          <motion.div
            key={i}
            className="flex-1 rounded-t-md bg-gradient-to-t from-neon-blue/40 to-neon-cyan"
            animate={{ height: [`${h}%`, `${Math.max(20, h - 25)}%`, `${h}%`] }}
            transition={{ duration: 2.4, repeat: Infinity, delay: i * 0.18 }}
          />
        ))}
      </div>
      <div className="mt-4 grid grid-cols-3 gap-3 text-center">
        {[
          { k: "Tasks/min", v: "1,284" },
          { k: "Active agents", v: "37" },
          { k: "Accuracy", v: "99.2%" },
        ].map((s) => (
          <div key={s.k} className="rounded-xl bg-fg/5 p-2.5">
            <div className="font-display text-lg font-bold text-fg">{s.v}</div>
            <div className="text-[10px] text-fg/45">{s.k}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
