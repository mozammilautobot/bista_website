"use client";

import { useId, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Search, Mail, MessageSquare, Cog, Plus, type LucideIcon } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";

type Agent = {
  name: string;
  category: string;
  icon: LucideIcon;
  description: string;
  points: string[];
  image: string;
};

const AGENTS: Agent[] = [
  {
    name: "AI Research Agent",
    category: "Research",
    icon: Search,
    description: "Company research, market intelligence and lead discovery — automated.",
    points: ["Company Research", "Market Intelligence", "Lead Discovery"],
    image: "/images/agents/agent-research.jpg",
  },
  {
    name: "AI SDR Agent",
    category: "Outreach",
    icon: Mail,
    description: "Personalised outreach, follow-ups and meeting booking that runs itself.",
    points: ["Personalized Outreach", "Automated Follow-ups", "Meeting Booking"],
    image: "/images/agents/agent-sdr.jpg",
  },
  {
    name: "AI Customer Support Agent",
    category: "Support",
    icon: MessageSquare,
    description: "Round-the-clock answers, ticket resolution and smart escalation.",
    points: ["24/7 Support", "Ticket Resolution", "Smart Escalation"],
    image: "/images/agents/agent-support.jpg",
  },
  {
    name: "AI Operations Agent",
    category: "Operations",
    icon: Cog,
    description: "Workflow automation, task orchestration and live system monitoring.",
    points: ["Workflow Automation", "Task Orchestration", "System Monitoring"],
    image: "/images/agents/agent-operations.jpg",
  },
];

function AgentCard({ agent, index }: { agent: Agent; index: number }) {
  const reduce = useReducedMotion();
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const Icon = agent.icon;

  return (
    <Reveal delay={index * 0.08} className="h-full">
      <motion.div
        whileHover={reduce ? undefined : { y: -4 }}
        transition={{ type: "spring", stiffness: 300, damping: 24 }}
        className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-fg/[0.06] bg-white p-4 shadow-[0_1px_2px_rgba(20,24,60,0.04),0_18px_48px_-32px_rgba(20,24,60,0.22)] transition-shadow duration-300 hover:shadow-[0_1px_2px_rgba(20,24,60,0.05),0_24px_56px_-30px_rgba(69,67,217,0.28)]"
      >
        <div className="flex items-center gap-1.5 text-fg/55">
          <Icon className="h-3.5 w-3.5" strokeWidth={1.5} aria-hidden />
          <span className="text-[11px] font-semibold uppercase tracking-[0.16em]">
            {agent.category}
          </span>
        </div>

        <h3 className="mt-1.5 font-display text-[15px] font-semibold tracking-[-0.02em] text-fg">
          {agent.name}
        </h3>
        <p className="mt-1 text-[13px] leading-relaxed text-fg/55">
          {agent.description}
        </p>

        <AnimatePresence initial={false}>
          {open && (
            <motion.ul
              id={panelId}
              initial={reduce ? false : { height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
              transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
              className="mt-3 space-y-1.5 overflow-hidden"
            >
              {agent.points.map((p) => (
                <li key={p} className="flex items-center gap-2 text-[13px] text-fg/70">
                  <span className="h-1.5 w-1.5 rounded-full bg-neon-cyan" />
                  {p}
                </li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>

        <div className="relative mt-3 flex flex-1 items-end">
          <div className="relative w-full overflow-hidden rounded-xl bg-fg/[0.02]">
            <img
              src={agent.image}
              alt={`${agent.name} illustration`}
              loading="lazy"
              decoding="async"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).style.display = "none";
              }}
              className="aspect-[3/2] w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-950/30 via-transparent to-transparent" />
          </div>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls={panelId}
            aria-label={
              open
                ? `Hide ${agent.name} capabilities`
                : `Show ${agent.name} capabilities`
            }
            className="absolute bottom-3 right-3 grid h-8 w-8 place-items-center rounded-full bg-fg text-canvas shadow-[0_8px_20px_-8px_rgba(20,24,60,0.6)] transition-transform duration-300 hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon-cyan/60 focus-visible:ring-offset-2 focus-visible:ring-offset-white active:scale-95"
          >
            <motion.span
              animate={{ rotate: open ? 45 : 0 }}
              transition={{ duration: reduce ? 0 : 0.25, ease: "easeOut" }}
              className="grid place-items-center"
            >
              <Plus className="h-4 w-4" strokeWidth={2} aria-hidden />
            </motion.span>
          </button>
        </div>
      </motion.div>
    </Reveal>
  );
}

export default function AgentShowcase() {
  return (
    <section id="agents" className="band bg-fg/[0.02]">
      <div className="section relative z-10">
        <SectionHeading
          eyebrow="Agentic AI"
          title={
            <>
              A connected workforce of <span className="text-gradient">AI agents</span>
            </>
          }
          subtitle="Specialised autonomous agents that communicate, delegate, and complete real business tasks — working together around the clock."
        />

        <div className="mx-auto mt-10 grid max-w-7xl gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {AGENTS.map((agent, i) => (
            <AgentCard key={agent.name} agent={agent} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
