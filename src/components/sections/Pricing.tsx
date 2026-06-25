"use client";

import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";

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
    name: "Standard",
    price: "$25",
    period: "/mo",
    features: ["Up to 1,000 pages/mo", "Basic analytics", "Email support"],
    cta: "Get Started",
    href: "#contact",
  },
  {
    name: "Premium",
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
    name: "Gold",
    price: "$99",
    period: "/mo",
    features: [
      "Unlimited documents",
      "Full API access",
      "Custom integrations",
      "Dedicated support",
      "SLA guarantee",
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

export default function Pricing() {
  return (
    <section id="pricing" className="relative section">
      <div className="pointer-events-none absolute left-1/2 top-10 h-72 w-72 -translate-x-1/2 rounded-full bg-neon-blue/10 blur-[120px]" />
      <SectionHeading
        eyebrow="Pricing"
        title={
          <>
            Simple, <span className="text-gradient">transparent pricing</span>
          </>
        }
        subtitle="Choose the plan that fits your document processing needs."
      />

      <div className="mt-14 grid gap-6 lg:grid-cols-4">
        {PLANS.map((plan, i) => (
          <motion.div
            key={plan.name}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            whileHover={{ y: -10 }}
            className={`relative flex flex-col rounded-[1.75rem] p-8 ${
              plan.popular
                ? "bg-gradient-to-b from-neon-cyan/[0.12] to-neon-blue/[0.06] ring-2 ring-neon-cyan/50 shadow-glow lg:-mt-4 lg:mb-0"
                : "glass"
            }`}
          >
            {plan.popular && (
              <>
                <motion.span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 rounded-3xl ring-2 ring-neon-cyan/50"
                  animate={{ opacity: [0.35, 0.9, 0.35], boxShadow: [
                    "0 0 0px rgba(69,67,217,0)",
                    "0 0 36px -6px rgba(69,67,217,0.55)",
                    "0 0 0px rgba(69,67,217,0)",
                  ] }}
                  transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
                />
                <span className="absolute -top-3 left-1/2 z-10 -translate-x-1/2 rounded-full bg-gradient-to-r from-neon-cyan to-neon-blue px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-ink-950">
                  Most Purchased
                </span>
              </>
            )}

            <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-fg/70">
              {plan.name}
            </h3>

            <div className="mt-4 flex items-end gap-1">
              <span className="font-display text-4xl font-bold text-fg">
                {plan.price}
              </span>
              {plan.period && (
                <span className="mb-1 text-sm text-fg/45">{plan.period}</span>
              )}
            </div>

            <ul className="mt-7 flex-1 space-y-3.5">
              {plan.features.map((f) => (
                <li key={f} className="flex items-center gap-2.5 text-sm text-fg/70">
                  <span className="text-neon-cyan">
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
          </motion.div>
        ))}
      </div>
    </section>
  );
}
