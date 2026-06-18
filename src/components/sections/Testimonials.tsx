"use client";

import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";

const LOGOS = [
  ,
];

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
    <section id="testimonials" className="section">
      <SectionHeading
        eyebrow="Testimonials"
        title={
          <>
            What our  <span className="text-gradient">Partners Say About Us</span> 
          </>
        }
      />

      <div className="relative mt-12 overflow-hidden mask-fade-x">
        <div className="flex w-max animate-marquee gap-4">
          {[...LOGOS, ...LOGOS].map((logo, i) => (
            <div
              key={i}
              className="flex items-center gap-2 whitespace-nowrap rounded-2xl glass px-6 py-3 text-sm font-semibold text-fg/55"
            >
              <span className="h-2 w-2 rounded-full bg-neon-cyan/70" />
              {logo}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-12 grid gap-5 lg:grid-cols-3">
        {QUOTES.map((q, i) => (
          <Reveal key={q.name} delay={i * 0.1}>
            <motion.div
              whileHover={{ y: -6 }}
              className="flex h-full flex-col rounded-3xl glass p-7"
            >
              <div className="text-3xl leading-none text-neon-cyan/60">&ldquo;</div>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-fg/75">
                {q.quote}
              </p>

              <div className="mt-5 flex items-center gap-3 rounded-2xl bg-fg/[0.03] p-3">
                <div className="text-center">
                  <div className="text-[10px] uppercase text-fg/40">Before</div>
                  <div className="font-display font-bold text-fg/70">{q.before}</div>
                </div>
                <div className="text-neon-cyan">→</div>
                <div className="text-center">
                  <div className="text-[10px] uppercase text-neon-cyan/80">After</div>
                  <div className="font-display font-bold text-fg">{q.after}</div>
                </div>
                <div className="ml-auto text-right text-[11px] text-fg/45">
                  {q.metric}
                </div>
              </div>

              <div className="mt-5 flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br from-neon-cyan to-neon-blue font-display text-sm font-bold text-ink-950">
                  {q.name.charAt(0)}
                </div>
                <div>
                  <div className="text-sm font-semibold">{q.name}</div>
                  <div className="text-xs text-fg/45">{q.role}</div>
                </div>
              </div>
            </motion.div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
