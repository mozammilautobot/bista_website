"use client";

import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";

const AGENTS = [
  {
    name: "AI Research Agent",
    icon: "🔎",
    accent: "from-neon-cyan/20 to-neon-blue/10",
    points: ["Company Research", "Market Intelligence", "Lead Discovery"],
  },
  {
    name: "AI SDR Agent",
    icon: "📨",
    accent: "from-neon-blue/20 to-neon-violet/10",
    points: ["Personalized Outreach", "Automated Follow-ups", "Meeting Booking"],
  },
  {
    name: "AI Customer Support Agent",
    icon: "💬",
    accent: "from-emerald-400/20 to-neon-cyan/10",
    points: ["24/7 Support", "Ticket Resolution", "Smart Escalation"],
  },
  {
    name: "AI Operations Agent",
    icon: "⚙️",
    accent: "from-neon-violet/20 to-fuchsia-400/10",
    points: ["Workflow Automation", "Task Orchestration", "System Monitoring"],
  },
];

export default function AgentShowcase() {
  return (
    <section id="agents" className="section">
      <SectionHeading
        eyebrow="Agentic AI"
        title={
          <>
            A connected workforce of <span className="text-gradient">AI agents</span>
          </>
        }
        subtitle="Specialised autonomous agents that communicate, delegate, and complete real business tasks — working together around the clock."
      />

      <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {AGENTS.map((agent, i) => (
          <Reveal key={agent.name} delay={i * 0.08}>
            <motion.div
              whileHover={{ y: -8 }}
              className="group relative h-full overflow-hidden rounded-3xl glass p-6 transition-shadow duration-300 hover:shadow-glow"
            >
              <div
                className={`pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-gradient-to-br ${agent.accent} blur-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100`}
              />
              <div className="relative grid h-12 w-12 place-items-center rounded-2xl bg-fg/5 text-2xl ring-1 ring-fg/10">
                {agent.icon}
              </div>
              <h3 className="relative mt-5 font-display text-lg font-semibold">
                {agent.name}
              </h3>
              <ul className="relative mt-4 space-y-2.5">
                {agent.points.map((p) => (
                  <li
                    key={p}
                    className="flex items-center gap-2 text-sm text-fg/60 transition-colors group-hover:text-fg/80"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-neon-cyan" />
                    {p}
                  </li>
                ))}
              </ul>
              <div className="relative mt-6 h-px w-full bg-gradient-to-r from-transparent via-fg/15 to-transparent" />
              <div className="relative mt-4 flex items-center gap-2 text-xs text-neon-cyan/80">
                <span className="h-1.5 w-1.5 animate-pulseGlow rounded-full bg-neon-cyan" />
                Active · Autonomous
              </div>
            </motion.div>
          </Reveal>
        ))}
      </div>

      <AgentMesh />
    </section>
  );
}

function AgentMesh() {
  const nodes = [
    { x: 12, y: 30, label: "Research" },
    { x: 18, y: 80, label: "Development" },
    { x: 82, y: 15, label: "Support" },
    { x: 88, y: 65, label: "Ops" },
    { x: 50, y: 48, label: "Orchestrator" },
  ];
  const edges = [
    [4, 0],
    [4, 1],
    [4, 2],
    [4, 3],
    [0, 2],
    [1, 3],
  ];

  return (
    <Reveal delay={0.1}>
      <div className="relative mt-14 overflow-hidden rounded-3xl glass p-6 sm:p-8">
        <div className="mb-5 flex items-center justify-between">
          <p className="text-sl font-large text-fg/70">
            Agent-to-Agent communication
          </p>
          <span className="text-xl text-fg/40">live mesh</span>
        </div>
        <div className="relative h-56 w-full sm:h-64">
          <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            {edges.map(([a, b], i) => (
              <line
                key={i}
                x1={nodes[a].x}
                y1={nodes[a].y}
                x2={nodes[b].x}
                y2={nodes[b].y}
                stroke="rgba(56,189,248,0.35)"
                strokeWidth="0.4"
              />
            ))}
            {edges.map(([a, b], i) => (
              <circle key={`p-${i}`} r="0.9" fill="#22d3ee">
                <animateMotion
                  dur={`${2.2 + (i % 3) * 0.6}s`}
                  repeatCount="indefinite"
                  path={`M${nodes[a].x},${nodes[a].y} L${nodes[b].x},${nodes[b].y}`}
                />
              </circle>
            ))}
          </svg>
          {nodes.map((n) => (
            <div
              key={n.label}
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${n.x}%`, top: `${n.y}%` }}
            >
              <div
                className={`flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[18px] font-large ${
                  n.label === "Orchestrator"
                    ? "bg-gradient-to-r from-neon-cyan to-neon-blue text-ink-950 shadow-glow"
                    : "glass-strong text-fg/80"
                }`}
              >
                <span className="h-1.5 w-1.5 rounded-full bg-current opacity-70" />
                {n.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Reveal>
  );
}
