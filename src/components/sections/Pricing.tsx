"use client";

import { type CSSProperties } from "react";
import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import PhenomFlow from "@/components/ui/PhenomFlow";
import { useSpotlight, SpotlightOverlay } from "@/components/ui/SpotlightCard";

type Plan = {
  name: string;
  price: string;
  period?: string;
  features: string[];
  cta: string;
  href: string;
  popular?: boolean;
};

const PLANS: Plan[] = [
  {
    name: "Standard DOC AI Plan",
    price: "$25",
    period: "/mo",
    features: ["Up to 1,000 pages/mo", "Basic analytics", "Email support",],
    cta: "Get Started",
    href: "#contact",
  },
  {
    name: "Premium DOC AI Plan",
    price: "$49",
    period: "/mo",
    features: [
      "10,000 pages/mo",
      "API access",
      "Advanced analytics",
      "Integrations",
      "Priority support",
    ],
    cta: "Get Started",
    href: "#contact",
    popular: true,
  },
  {
    name: "Enterprise  AI Agent Plan",
    price: "Let's talk",
    features: [
      "BFSI AI Agent",
      "Bank Reconcillation AI Agent",
      "Business Process AI Agent",
      "HR Process AI Agent",
      "Data Migration",
      "Custom Integrations",  
    ],
    cta: "Contact Sales",
    href: "#contact",
  },
  {
    name: "Custom",
    price: "Let's talk",
    features: [
      "Multi AI Agents",
      "Volume pricing",
      "On-premise option",
      "Custom AI models",
      "24/7 support",
    ],
    cta: "Contact Sales",
    href: "#contact",
  },
];

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0" fill="none" aria-hidden>
      <path
        d="m5 12.5 4.5 4.5L19 7"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// Vivid rainbow border (magenta → violet → cyan) drawn as a masked ring so it
// wraps the rounded card edge without affecting the inner fill. Works in both
// light and dark mode.
const gradientBorderStyle: CSSProperties = {
  padding: 2,
  background:
    "linear-gradient(135deg, #ff3d9a 0%, #c026d3 28%, #7c3aed 55%, #4f46e5 75%, #22d3ee 100%)",
  WebkitMask:
    "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
  WebkitMaskComposite: "xor",
  maskComposite: "exclude",
};

function PlanCard({ plan, index }: { plan: Plan; index: number }) {
  const sp = useSpotlight<HTMLDivElement>({ lift: 10 });

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className={`relative h-full ${plan.popular ? "lg:-mt-4 lg:mb-0" : ""}`}
    >
      <div
        {...sp.spotlightProps}
        className={`group relative flex h-full flex-col rounded-[1.75rem] p-8 ${
          plan.popular
            ? "bg-gradient-to-b from-neon-cyan/[0.12] to-neon-blue/[0.06]"
            : "glass"
        }`}
      >
        {plan.popular && (
          <>
            {/* vivid rainbow gradient border */}
            <span
              aria-hidden
              className="pointer-events-none absolute inset-0 z-[2] rounded-[inherit]"
              style={gradientBorderStyle}
            />
            <span className="absolute -top-3 left-1/2 z-10 -translate-x-1/2 rounded-full bg-gradient-to-r from-[#c026d3] via-[#7c3aed] to-[#22d3ee] px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-white shadow-[0_6px_18px_-6px_rgba(124,58,237,0.6)]">
              Most Purchased
            </span>
          </>
        )}

        <div className="relative z-[3] flex flex-1 flex-col">
          <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-fg/70">
            {plan.name}
          </h3>

          <div className="mt-4 flex items-end gap-1">
            <span className="font-display text-4xl font-bold text-fg">
              {plan.price}
            </span>
            {plan.period && (
              <span className="mb-1 text-sm text-fg/50">{plan.period}</span>
            )}
          </div>

          <ul className="mt-7 flex-1 space-y-3.5">
            {plan.features.map((f) => (
              <li key={f} className="flex items-center gap-2.5 text-sm text-fg/70">
                <span className="inline-flex text-neon-cyan transition-transform duration-300 ease-out group-hover:scale-125">
                  <CheckIcon />
                </span>
                {f}
              </li>
            ))}
          </ul>

          <a
            href={plan.href}
            className={`mt-8 w-full ${plan.popular ? "btn-primary" : "btn-ghost"}`}
          >
            {plan.cta}
          </a>
        </div>

        <SpotlightOverlay active={sp.active} />
      </div>
    </motion.div>
  );
}

export default function Pricing() {
  return (
    <section id="pricing" className="relative section overflow-hidden">
      {/* Ambient flowing rainbow lines (matches the dark sections, tuned subtle for light) */}
      <PhenomFlow variant="page" className="opacity-70" />
      <div className="pointer-events-none absolute left-1/2 top-10 h-72 w-72 -translate-x-1/2 rounded-full bg-neon-blue/10 blur-[120px]" />

      <div className="relative z-10">
        <SectionHeading
          eyebrow="Pricing"
          title={
            <>
              Simple, <span className="text-gradient">transparent pricing</span>
            </>
          }
          subtitle="Choose the plan that fits your Automation & document processing needs."
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-4">
          {PLANS.map((plan, i) => (
            <PlanCard key={plan.name} plan={plan} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
