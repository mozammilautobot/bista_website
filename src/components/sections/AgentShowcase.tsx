"use client";

import { motion } from "framer-motion";
import { Search, Mail, MessageSquare, Cog, type LucideIcon } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import PhenomFlow from "@/components/ui/PhenomFlow";
import AnimatedIcon from "@/components/ui/AnimatedIcon";

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
    name: "Customer Support",
    icon: MessageSquare,
    accent: "from-neon-violet/20 to-neon-cyan/10",
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
    <section id="agents" className="band band-black">
      <PhenomFlow variant="dark" />
      <div className="section relative z-10">
      <SectionHeading
        eyebrow="Agentic AI"
        tone="dark"
        title={
          <>
            A connected workforce of <span className="text-gradient">AI agents</span>
          </>
        }
        subtitle="Specialised autonomous agents that communicate, delegate, and complete real business tasks — working together around the clock."
      />

      <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {AGENTS.map((agent, i) => (
          <Reveal key={agent.name} delay={i * 0.08}>
            <motion.div
              whileHover={{ y: -8 }}
              className="group relative h-full overflow-hidden rounded-[1.75rem] glass p-7 transition-shadow duration-300 hover:shadow-glow"
            >
              <div
                className={`pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-gradient-to-br ${agent.accent} blur-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100`}
              />
              <AnimatedIcon icon={agent.icon} size="md" delay={i * 0.2} />
              <h3 className="relative mt-5 font-display text-lg font-semibold">
                {agent.name}
              </h3>
              <ul className="relative mt-4 space-y-2.5">
                {agent.points.map((p) => (
                  <li
                    key={p}
                    className="flex items-center gap-2 text-sm text-fg/70 transition-colors group-hover:text-fg/90"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-[#7bd3cf]" />
                    {p}
                  </li>
                ))}
              </ul>
              <div className="relative mt-6 h-px w-full bg-gradient-to-r from-transparent via-fg/15 to-transparent" />
              <div className="relative mt-4 flex items-center gap-2 text-xs font-medium text-[#7bd3cf]">
                <span className="h-1.5 w-1.5 animate-pulseGlow rounded-full bg-[#7bd3cf] shadow-[0_0_8px_rgba(123,211,207,0.9)]" />
                Active · Autonomous
              </div>
            </motion.div>
          </Reveal>
        ))}
      </div>
      </div>
    </section>
  );
}
