"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";

const inr = (n: number) =>
  "₹" +
  Math.round(n).toLocaleString("en-IN", { maximumFractionDigits: 0 });

function Slider({
  label,
  value,
  min,
  max,
  step,
  onChange,
  format,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (v: number) => void;
  format: (v: number) => string;
}) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <label className="text-sm text-fg/60">{label}</label>
        <span className="font-display text-sm font-semibold text-neon-cyan">
          {format(value)}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-fg/10 accent-neon-cyan"
      />
    </div>
  );
}

export default function RoiCalculator() {
  const [docs, setDocs] = useState(10000);
  const [minutes, setMinutes] = useState(3);
  const [hourly, setHourly] = useState(400);
  const [automation, setAutomation] = useState(75);

  const { currentCost, savings, annualSavings, hoursSaved } = useMemo(() => {
    const hoursPerMonth = (docs * minutes) / 60;
    const currentCost = hoursPerMonth * hourly;
    const savings = currentCost * (automation / 100);
    return {
      currentCost,
      savings,
      annualSavings: savings * 12,
      hoursSaved: hoursPerMonth * (automation / 100),
    };
  }, [docs, minutes, hourly, automation]);

  return (
    <section id="roi" className="relative section">
      <div className="pointer-events-none absolute left-1/2 top-10 h-72 w-72 -translate-x-1/2 rounded-full bg-neon-cyan/10 blur-[120px]" />
      <SectionHeading
        eyebrow="ROI Calculator"
        title={
          <>
            See your savings <span className="text-gradient">in real time</span> 
          </>
        }
        subtitle="Adjust the sliders to your current document volume and watch the impact update instantly."
      />

      <Reveal delay={0.05}>
        <div className="mt-12 grid gap-6 rounded-3xl glass p-6 sm:p-8 lg:grid-cols-2">
          <div className="space-y-7">
            <Slider
              label="Monthly documents"
              value={docs}
              min={500}
              max={100000}
              step={500}
              onChange={setDocs}
              format={(v) => v.toLocaleString("en-IN")}
            />
            <Slider
              label="Manual effort per document"
              value={minutes}
              min={1}
              max={20}
              step={1}
              onChange={setMinutes}
              format={(v) => `${v} min`}
            />
            <Slider
              label="Fully-loaded cost / hour"
              value={hourly}
              min={100}
              max={2000}
              step={50}
              onChange={setHourly}
              format={inr}
            />
            <Slider
              label="Automation rate with Bista AI"
              value={automation}
              min={40}
              max={95}
              step={5}
              onChange={setAutomation}
              format={(v) => `${v}%`}
            />
          </div>

          <div className="grid grid-rows-2 gap-4">
            <div className="grid grid-cols-2 gap-4">
              <Metric label="Current monthly cost" value={inr(currentCost)} muted />
              <Metric label="Hours saved / month" value={`${Math.round(hoursSaved).toLocaleString("en-IN")}h`} muted />
            </div>
            <motion.div
              key={Math.round(savings)}
              initial={{ scale: 0.98, opacity: 0.6 }}
              animate={{ scale: 1, opacity: 1 }}
              className="relative flex flex-col justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-neon-cyan/15 to-neon-blue/10 p-6 ring-1 ring-neon-cyan/30"
            >
              <div className="text-xs uppercase tracking-wider text-neon-cyan/90">
                Potential savings / month
              </div>
              <div className="mt-1 font-display text-4xl font-bold text-fg sm:text-5xl">
                {inr(savings)}
              </div>
              <div className="mt-2 text-sm text-fg/60">
                ≈ <span className="font-semibold text-fg">{inr(annualSavings)}</span> per
                year
              </div>
              <a href="#contact" className="btn-primary mt-5 w-fit">
                Get a tailored ROI report
              </a>
            </motion.div>
          </div>
        </div>
      </Reveal>
      <p className="mt-4 text-center text-xs text-fg/35">
        Illustrative estimate. Actual results depend on document complexity and process scope.
      </p>
    </section>
  );
}

function Metric({
  label,
  value,
  muted,
}: {
  label: string;
  value: string;
  muted?: boolean;
}) {
  return (
    <div
      className={`flex flex-col justify-center rounded-2xl p-5 ${
        muted ? "glass" : ""
      }`}
    >
      <div className="text-xs text-fg/45">{label}</div>
      <div className="mt-1 font-display text-2xl font-bold text-fg">{value}</div>
    </div>
  );
}
