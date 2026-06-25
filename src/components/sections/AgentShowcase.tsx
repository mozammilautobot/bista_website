"use client";

import { motion } from "framer-motion";
import { Search, Mail, MessageSquare, Cog, type LucideIcon } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";

const AGENTS: {
  name: string;
  icon: LucideIcon;
  accent: string;
  points: string[];
}[] = [
  {
    name: "AI Research Agent",
    icon: Search,
    accent: "from-neon-cyan/20 to-neon-blue/10",
    points: ["Company Research", "Market Intelligence", "Lead Discovery"],
  },
  {
    name: "AI SDR Agent",
    icon: Mail,
    accent: "from-neon-blue/20 to-neon-violet/10",
    points: ["Personalized Outreach", "Automated Follow-ups", "Meeting Booking"],
  },
  {
    name: "AI Customer Support Agent",
    icon: MessageSquare,
    accent: "from-emerald-400/20 to-neon-cyan/10",
    points: ["24/7 Support", "Ticket Resolution", "Smart Escalation"],
  },
  {
    name: "AI Operations Agent",
    icon: Cog,
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

      <div className="mt-9 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {AGENTS.map((agent, i) => (
          <Reveal key={agent.name} delay={i * 0.08}>
            <motion.div
              whileHover={{ y: -8 }}
              className="group relative h-full overflow-hidden rounded-3xl glass p-6 transition-shadow duration-300 hover:shadow-glow"
            >
              <div
                className={`pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-gradient-to-br ${agent.accent} blur-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100`}
              />
              {/* glossy sheen sweep */}
              <span className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-white/25 to-transparent opacity-0 transition-all duration-700 ease-out group-hover:left-[120%] group-hover:opacity-100" />
              <div className="relative grid h-12 w-12 place-items-center rounded-2xl bg-neon-cyan/10 text-neon-blue ring-1 ring-neon-cyan/20">
                <agent.icon className="h-6 w-6" strokeWidth={1.75} />
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

    </section>
  );
}
