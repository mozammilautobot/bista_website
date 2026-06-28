"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Landmark, FileText, Ship, type LucideIcon } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import Counter from "@/components/ui/Counter";

type Metric = { label: string; value: number; suffix: string };

type CaseStudy = {
  tag: string;
  client: string;
  icon: LucideIcon;
  challenge: string;
  result: string;
  image: string;
  logo: string;
  logoName: string;
  logoDark?: boolean;
  hero: Metric;
  metrics: Metric[];
};

const CASES: CaseStudy[] = [
  {
    tag: "Finance",
    client: "Leadway Pensure",
    icon: Landmark,
    challenge: "Manual banking reconciliation and fund validation slowed every close.",
    result: "An autonomous AI agent now reconciles and validates funds end to end.",
    image: "/images/case-studies/case-finance.jpg",
    logo: "/images/case-studies/logos/leadway.png",
    logoName: "Leadway Pensure",
    logoDark: true,
    hero: { label: "Reconciliation speed", value: 99, suffix: "%" },
    metrics: [
      { label: "Manual reviews cut", value: 85, suffix: "%" },
      { label: "Compliance score", value: 92, suffix: "%" },
    ],
  },
  {
    tag: "Banking",
    client: "Branch International",
    icon: FileText,
    challenge: "Invoice processing was handled by hand across five countries.",
    result: "AI document intelligence extracts and routes every invoice automatically.",
    image: "/images/case-studies/case-banking.jpg",
    logo: "/images/case-studies/logos/branch.png",
    logoName: "Branch",
    hero: { label: "Cost reduction", value: 96, suffix: "%" },
    metrics: [
      { label: "Extraction accuracy", value: 90, suffix: "%" },
      { label: "Faster processing", value: 78, suffix: "%" },
    ],
  },
  {
    tag: "Shipping & Logistics",
    client: "MOL Maritime",
    icon: Ship,
    challenge: "Fragmented manual work stretched across documents and teams.",
    result: "AI extraction paired with a multi-agent workflow runs operations hands-free.",
    image: "/images/case-studies/case-logistics.jpg",
    logo: "/images/case-studies/logos/mol.png",
    logoName: "MOL",
    hero: { label: "Processes automated", value: 81, suffix: "%" },
    metrics: [
      { label: "Turnaround time", value: 70, suffix: "%" },
      { label: "Cost reduction", value: 64, suffix: "%" },
    ],
  },
];

function LogoBadge({
  src,
  name,
  dark,
}: {
  src: string;
  name: string;
  dark?: boolean;
}) {
  const [failed, setFailed] = useState(false);

  return (
    <div
      className={`absolute left-2.5 top-2.5 z-10 flex items-center rounded-xl px-2 py-1 shadow-[0_4px_14px_-6px_rgba(20,24,60,0.35)] backdrop-blur ${
        dark
          ? "bg-[#0b0b0f]/90 ring-1 ring-white/10"
          : "bg-white/90 ring-1 ring-fg/[0.06]"
      }`}
    >
      {failed ? (
        <span
          className={`font-display text-xs font-bold tracking-tight ${
            dark ? "text-white" : "text-fg"
          }`}
        >
          {name}
        </span>
      ) : (
        <img
          src={src}
          alt={`${name} logo`}
          loading="lazy"
          decoding="async"
          onError={() => setFailed(true)}
          className="h-7 w-auto max-w-[120px] object-contain"
        />
      )}
    </div>
  );
}

function CaseCard({ study, index }: { study: CaseStudy; index: number }) {
  const reduce = useReducedMotion();
  const Icon = study.icon;

  return (
    <Reveal delay={index * 0.08} className="h-full">
      <motion.article
        whileHover={reduce ? undefined : { y: -4 }}
        transition={{ type: "spring", stiffness: 300, damping: 24 }}
        className="group flex h-full flex-col overflow-hidden rounded-2xl border border-fg/[0.06] bg-white shadow-[0_1px_2px_rgba(20,24,60,0.04),0_18px_48px_-32px_rgba(20,24,60,0.22)] transition-shadow duration-300 hover:shadow-[0_1px_2px_rgba(20,24,60,0.05),0_24px_56px_-30px_rgba(69,67,217,0.28)]"
      >
        <div className="relative overflow-hidden bg-fg/[0.02]">
          <LogoBadge src={study.logo} name={study.logoName} dark={study.logoDark} />
          <img
            src={study.image}
            alt={`${study.client} ${study.tag} case study illustration`}
            loading="lazy"
            decoding="async"
            className="aspect-[3/2] w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
          />
        </div>

        <div className="flex flex-1 flex-col p-4">
          <div className="flex items-center gap-1.5 text-fg/55">
            <Icon className="h-3.5 w-3.5" strokeWidth={1.5} aria-hidden />
            <span className="text-[11px] font-semibold uppercase tracking-[0.16em]">
              {study.tag}
            </span>
          </div>

          <h3 className="mt-1.5 font-display text-[15px] font-semibold tracking-[-0.02em] text-fg">
            {study.client}
          </h3>

          <p className="mt-1 text-[13px] leading-relaxed text-fg/55">
            <span className="text-fg/70">{study.challenge}</span> {study.result}
          </p>

          <div className="mt-auto pt-4">
            <div className="border-t border-fg/[0.08] pt-3">
              <div className="font-display text-3xl font-semibold leading-none tracking-[-0.03em] text-fg">
                <span className="text-gradient">
                  <Counter to={study.hero.value} />
                  {study.hero.suffix}
                </span>
              </div>
              <div className="mt-1 text-[11px] font-medium text-fg/55">
                {study.hero.label}
              </div>
            </div>

            <dl className="mt-3 grid grid-cols-2 gap-2.5">
              {study.metrics.map((m) => (
                <div key={m.label}>
                  <dt className="text-[11px] leading-snug text-fg/50">{m.label}</dt>
                  <dd className="mt-0.5 font-display text-[15px] font-semibold text-fg">
                    <Counter to={m.value} />
                    {m.suffix}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </motion.article>
    </Reveal>
  );
}

export default function CaseStudies() {
  return (
    <section id="cases" className="section">
      <SectionHeading
        eyebrow="Case Studies"
        title={
          <>
            Real deployments, <span className="text-gradient">real numbers</span>
          </>
        }
        subtitle="Outcomes our clients measured after going live with Bista AI."
      />

      <div className="mx-auto mt-10 grid max-w-6xl gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {CASES.map((study, i) => (
          <CaseCard key={study.client} study={study} index={i} />
        ))}
      </div>
    </section>
  );
}
