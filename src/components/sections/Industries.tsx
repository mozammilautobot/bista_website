"use client";

import {
  Building2,
  Truck,
  Ship,
  Factory,
  Landmark,
  ShieldCheck,
  ShoppingBag,
  Scale,
  type LucideIcon,
} from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import IndustriesMap from "@/components/ui/IndustriesMap";
import { useSpotlight, SpotlightOverlay } from "@/components/ui/SpotlightCard";

const INDUSTRIES: { name: string; icon: LucideIcon; image: string; blurb: string }[] = [
  { name: "ERP", icon: Building2, image: "/images/industries/erp.jpg", blurb: "Connected systems and records, kept clean and in sync." },
  { name: "Logistics", icon: Truck, image: "/images/industries/logistics.jpg", blurb: "Faster fulfilment with automated docs and tracking." },
  { name: "Shipping", icon: Ship, image: "/images/industries/shipping.jpg", blurb: "Bills of lading and customs paperwork, handled in seconds." },
  { name: "Manufacturing", icon: Factory, image: "/images/industries/manufacturing.jpg", blurb: "Shop-floor data and orders flowing without the friction." },
  { name: "Banking", icon: Landmark, image: "/images/industries/banking.jpg", blurb: "Reconciliation and compliance, audited and automated." },
  { name: "Insurance", icon: ShieldCheck, image: "/images/industries/insurance.jpg", blurb: "Claims and policy intake processed end to end." },
  { name: "Retail", icon: ShoppingBag, image: "/images/industries/retail.jpg", blurb: "Invoices, catalogues and returns, reconciled automatically." },
  { name: "Legal", icon: Scale, image: "/images/industries/legal.jpg", blurb: "Contracts read, clauses extracted, risks surfaced." },
];

function IndustryCard({
  ind,
  hidden,
}: {
  ind: (typeof INDUSTRIES)[number];
  hidden: boolean;
}) {
  const sp = useSpotlight<HTMLElement>();

  return (
    <article
      {...sp.spotlightProps}
      aria-hidden={hidden}
      className="group/card relative flex w-[250px] shrink-0 flex-col overflow-hidden rounded-2xl border border-fg/[0.06] bg-white shadow-[0_1px_2px_rgba(20,24,60,0.04),0_18px_48px_-32px_rgba(20,24,60,0.22)] dark:border-white/10 dark:bg-white/[0.04] dark:backdrop-blur-xl dark:shadow-none sm:w-[270px]"
    >
      <div className="relative aspect-[3/2] overflow-hidden bg-fg/[0.04] dark:bg-white/[0.03]">
        <img
          src={ind.image}
          alt={`${ind.name} industry`}
          loading="lazy"
          decoding="async"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).style.display = "none";
          }}
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover/card:scale-105 motion-reduce:transition-none"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-950/45 via-transparent to-transparent" />
        <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-ink-950/55 px-2.5 py-1 text-[11px] font-medium text-white/90 backdrop-blur">
          <ind.icon className="h-3.5 w-3.5" strokeWidth={1.75} aria-hidden />
          {ind.name}
        </span>
      </div>
      <div className="relative z-[3] flex flex-1 flex-col p-5">
        <h4 className="font-display text-[15px] font-semibold tracking-[-0.01em] text-fg">
          {ind.name}
        </h4>
        <p className="mt-1 text-[13px] leading-relaxed text-fg/60">{ind.blurb}</p>
      </div>

      <SpotlightOverlay active={sp.active} />
    </article>
  );
}

export default function Industries() {
  return (
    <section id="industries" className="section">
      <SectionHeading
        eyebrow="Industries"
        title={
          <>
            Trusted Across <span className="text-gradient">Regulated, </span> Document-Heavy
            <span className="text-gradient"> Industries</span>
          </>
        }
        subtitle="Domain-tuned AI that understands the vocabulary, compliance and edge cases of your sector."
      />

      <div className="mt-14 grid items-center gap-10 lg:grid-cols-2 lg:gap-12">
        <Reveal className="w-full">
          <div className="mx-auto w-full max-w-[440px] lg:max-w-[520px]">
            <IndustriesMap />
          </div>
        </Reveal>

        <div className="w-full">
          <h3 className="mb-4 font-display text-lg font-semibold tracking-[-0.02em] text-fg sm:text-xl">
            Explore by industry
          </h3>

          <div className="group relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,rgba(0,0,0,1)_6%,rgba(0,0,0,1)_94%,transparent)]">
            <div className="flex w-max gap-5 animate-marquee group-hover:[animation-play-state:paused] motion-reduce:animate-none">
              {[...INDUSTRIES, ...INDUSTRIES].map((ind, i) => (
                <IndustryCard
                  key={`${ind.name}-${i}`}
                  ind={ind}
                  hidden={i >= INDUSTRIES.length}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
