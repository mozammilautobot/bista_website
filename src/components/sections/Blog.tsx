"use client";

import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";

const POSTS = [
  {
    category: "AI Agents",
    title: "Designing multi-agent systems that actually ship value",
    read: "7 min read",
    gradient: "from-neon-cyan/30 to-neon-blue/20",
  },
  {
    category: "Agentic Automation",
    title: "When to use a single agent vs. an orchestrated crew",
    read: "5 min read",
    gradient: "from-neon-blue/30 to-neon-violet/20",
  },
  {
    category: "Document AI",
    title: "Beyond OCR: extracting meaning from messy enterprise docs",
    read: "6 min read",
    gradient: "from-emerald-400/30 to-neon-cyan/20",
  },
  {
    category: "RAG",
    title: "Retrieval pipelines that don't hallucinate in production",
    read: "8 min read",
    gradient: "from-neon-violet/30 to-fuchsia-400/20",
  },
  {
    category: "Enterprise AI",
    title: "A pragmatic security checklist for deploying LLMs",
    read: "9 min read",
    gradient: "from-amber-400/30 to-neon-cyan/20",
  },
  {
    category: "Workflow Automation",
    title: "Mapping a business process before you automate it",
    read: "4 min read",
    gradient: "from-sky-400/30 to-neon-blue/20",
  },
];

export default function Blog() {
  return (
    <section id="insights" className="section">
      <SectionHeading
        eyebrow="Blog / Insights"
        title={
          <>
            Ideas on <span className="text-gradient">applied AI</span> & automation
          </>
        }
        subtitle="Practical, engineering-led perspectives — the kind that help you ship, not hype."
      />

      <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {POSTS.map((p, i) => (
          <Reveal key={p.title} delay={i * 0.07}>
            <motion.a
              href="#"
              whileHover={{ y: -6 }}
              className="group flex h-full flex-col overflow-hidden rounded-3xl glass"
            >
              <div className={`relative h-36 bg-gradient-to-br ${p.gradient}`}>
                <div className="absolute inset-0 bg-grid-faint bg-[size:24px_24px] opacity-40" />
                <span className="absolute left-4 top-4 rounded-full bg-ink-950/60 px-3 py-1 text-[11px] font-medium text-white/90 backdrop-blur">
                  {p.category}
                </span>
              </div>
              <div className="flex flex-1 flex-col p-6">
                <h3 className="font-display text-base font-semibold leading-snug transition-colors group-hover:text-neon-cyan">
                  {p.title}
                </h3>
                <div className="mt-auto flex items-center justify-between pt-5 text-xs text-fg/45">
                  <span>{p.read}</span>
                  <span className="inline-flex items-center gap-1 text-neon-cyan">
                    Read
                    <span className="transition-transform group-hover:translate-x-1">→</span>
                  </span>
                </div>
              </div>
            </motion.a>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
