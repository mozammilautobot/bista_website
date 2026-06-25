"use client";

import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import PhenomFlow from "@/components/ui/PhenomFlow";

const QUOTES = [
  {
    quote:
      "Before automation, several of our processes were manual, time-consuming, and prone to human error. Partnering with Bista Automation transformed these challenges into opportunities for efficiency and accuracy.",
    name: "Jessica",
    role: "RVL Brands",
    before: "1 days",
    after: "10 min",
    metric: "avg. processing time",
  },
  {
    quote:
      "Thanks to the ingenious solution delivered by Bista, a significant milestone has been reached in our operations - the automation of Purchase Order to ERP Sales Order conversion for a major customer. This achievement has set the stage for an ongoing project aimed at extending this automation to cover all customer Purchase Orders.",
    name: "Glen",
    role: "InnoFoods",
    before: "2 days",
    after: "25 min",
    metric: "avg. processing time",
  },
  {
    quote:
      "We want to appreciate every member of your team for their support and dedication to this project thus far. Even as we round off the final bits of the project, the team has demonstrated good character towards our requests and need for fixes when required. As we work towards final completion of this project, be rest assured that we are committed to giving you all the support you need.",
    name: "Segun Babalola",
    role: "Leadway Pensure",
    before: "45 hrs",
    after: "2 hrs",
    metric: "Weekly manual work",
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="band band-black">
      <PhenomFlow variant="dark" />
      <div className="section relative z-10">
      <SectionHeading
        align="left"
        tone="dark"
        eyebrow="Testimonials"
        title={
          <>
            What our customers are{" "}
            <span className="text-gradient-pastel">saying</span>
          </>
        }
      />

      <div className="mt-14 grid gap-6 lg:grid-cols-3">
        {QUOTES.map((q, i) => (
          <Reveal key={q.name} delay={i * 0.1}>
            <motion.div
              whileHover={{ y: -8 }}
              transition={{ type: "spring", stiffness: 300, damping: 22 }}
              className="group relative flex h-full flex-col overflow-hidden rounded-[1.75rem] glass p-8 transition-[box-shadow,border-color] duration-500 hover:border-white/20"
            >
              {/* hover wash */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-neon-cyan/0 to-neon-blue/0 opacity-0 transition-opacity duration-500 group-hover:from-neon-cyan/[0.06] group-hover:to-neon-blue/[0.04] group-hover:opacity-100" />
              {/* animated top accent */}
              <span className="pointer-events-none absolute left-0 top-0 h-1 w-0 bg-gradient-to-r from-neon-cyan to-neon-blue transition-all duration-500 group-hover:w-full" />
              {/* oversized decorative quote */}
              <span className="pointer-events-none absolute -right-1 -top-8 select-none font-display text-[7rem] leading-none text-neon-cyan/[0.06] transition-all duration-500 group-hover:-top-5 group-hover:text-neon-cyan/[0.13]">
                &rdquo;
              </span>

              <div className="relative text-3xl leading-none text-neon-cyan/60">&ldquo;</div>
              <p className="relative mt-2 flex-1 text-sm leading-relaxed text-fg/75">
                {q.quote}
              </p>

              <div className="relative mt-5 flex items-center gap-3 rounded-2xl bg-fg/[0.03] p-3 ring-1 ring-transparent transition-all duration-500 group-hover:bg-neon-cyan/[0.05] group-hover:ring-neon-cyan/20">
                <div className="text-center">
                  <div className="text-[10px] uppercase text-fg/40">Before</div>
                  <div className="font-display font-bold text-fg/70">{q.before}</div>
                </div>
                <motion.div
                  aria-hidden
                  className="text-neon-cyan"
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
                >
                  →
                </motion.div>
                <div className="text-center">
                  <div className="text-[10px] uppercase text-neon-cyan/80">After</div>
                  <div className="font-display font-bold text-fg">{q.after}</div>
                </div>
                <div className="ml-auto text-right text-[11px] text-fg/45">
                  {q.metric}
                </div>
              </div>

              <div className="relative mt-5 flex items-center gap-3">
                <span className="relative grid h-10 w-10 shrink-0 place-items-center rounded-full bg-gradient-to-br from-neon-cyan to-neon-blue font-display text-sm font-bold text-ink-950 transition-transform duration-500 group-hover:scale-110">
                  {q.name.charAt(0)}
                  <span className="pointer-events-none absolute inset-0 rounded-full bg-neon-cyan/40 opacity-0 blur-md transition-opacity duration-500 group-hover:opacity-100" />
                </span>
                <div>
                  <div className="text-sm font-semibold">{q.name}</div>
                  <div className="text-xs text-fg/45">{q.role}</div>
                </div>
              </div>
            </motion.div>
          </Reveal>
        ))}
      </div>
      </div>
    </section>
  );
}
