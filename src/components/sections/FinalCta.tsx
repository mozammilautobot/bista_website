"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import NetworkBackground from "@/components/ui/NetworkBackground";
import Reveal from "@/components/ui/Reveal";

export default function FinalCta() {
  const [sent, setSent] = useState(false);

  return (
    <section id="contact" className="relative overflow-hidden py-28">
      <div className="absolute inset-0 bg-aurora" />
      <NetworkBackground className="opacity-50" density={0.00007} />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-neon-blue/20 blur-[140px]" />

      <div className="section relative z-10">
        <div className="mx-auto max-w-5xl overflow-hidden rounded-[2rem] glass-strong p-8 shadow-glow sm:p-12">
          <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
            <Reveal>
              <span className="eyebrow">
                <span className="h-1.5 w-1.5 rounded-full bg-neon-cyan animate-pulseGlow" />
                Let&apos;s build
              </span>
              <h2 className="font-display text-3xl font-bold leading-tight tracking-tight sm:text-4xl md:text-5xl">
                Ready to transform your business with{" "}
                <span className="text-gradient">Bista AI</span>?
              </h2>
              <p className="mt-4 max-w-md text-fg/60">
                Book a 30-minute demo and we&apos;ll show you a live document and agent
                workflow tailored to your use case.
              </p>
              <div className="mt-7 flex flex-wrap gap-4">
                <a href="https://calendly.com/mozammilrizwan/agentic-automation" className="btn-primary">
                  Schedule Demo
                </a>
                <a href="https://calendly.com/mozammilrizwan/agentic-automation" className="btn-ghost">
                  Talk to an AI Expert
                </a>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <motion.form
                onSubmit={(e) => {
                  e.preventDefault();
                  setSent(true);
                }}
                className="rounded-3xl border border-fg/10 bg-fg/[0.03] p-6 backdrop-blur-xl"
              >
                {sent ? (
                  <div className="grid h-64 place-items-center text-center">
                    <div>
                      <div className="mx-auto mb-3 grid h-14 w-14 place-items-center rounded-full bg-emerald-400/15 text-2xl text-emerald-300">
                        ✓
                      </div>
                      <h3 className="font-display text-lg font-semibold">Request received</h3>
                      <p className="mt-1 text-sm text-fg/55">
                        An AI specialist will reach out within one business day.
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <Field label="Work email" type="email" placeholder="you@company.com" />
                    <Field label="Company" placeholder="Acme Inc." />
                    <div>
                      <label className="mb-1.5 block text-xs text-fg/55">
                        What do you want to automate?
                      </label>
                      <select className="w-full rounded-xl border border-fg/10 bg-fg/[0.04] px-4 py-3 text-sm text-fg outline-none focus:border-neon-cyan/60">
                        <option>Document processing (Bista Doc AI)</option>
                        <option>AI agents (research / SDR / support)</option>
                        <option>Business process automation</option>
                        <option>Custom AI product</option>
                        <option>Excel Automation</option>
                      </select>
                    </div>
                    <button type="submit" className="btn-primary w-full">
                      Book a Demo
                    </button>
                    <p className="text-center text-[11px] text-fg/35">
                      No spam. We respond within one business day.
                    </p>
                  </div>
                )}
              </motion.form>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  type = "text",
  placeholder,
}: {
  label: string;
  type?: string;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-xs text-fg/55">{label}</label>
      <input
        type={type}
        required
        placeholder={placeholder}
        className="w-full rounded-xl border border-fg/10 bg-fg/[0.04] px-4 py-3 text-sm text-fg placeholder:text-fg/30 outline-none focus:border-neon-cyan/60"
      />
    </div>
  );
}
