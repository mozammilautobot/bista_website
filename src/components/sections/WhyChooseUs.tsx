"use client";

import {
  BrainCircuit,
  ShieldCheck,
  Zap,
  Puzzle,
  Layers,
  TrendingUp,
  type LucideIcon,
} from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import { useSpotlight, SpotlightOverlay } from "@/components/ui/SpotlightCard";

type Reason = {
  title: string;
  category: string;
  desc: string;
  icon: LucideIcon;
  image: string;
};

const REASONS: Reason[] = [
  {
    title: "AI Automation Expert",
    category: "Expertise",
    desc: "A team that ships AI products daily — not a generalist agency dabbling in ML.",
    icon: BrainCircuit,
    image: "/images/why/why-expertise.jpg",
  },
  {
    title: "Enterprise Security",
    category: "Security",
    desc: "SOC2-aligned practices, data isolation and on-prem or VPC deployment options.",
    icon: ShieldCheck,
    image: "/images/why/why-security.jpg",
  },
  {
    title: "Rapid Deployment",
    category: "Speed",
    desc: "Production pilots in weeks, not quarters, with reusable accelerators.",
    icon: Zap,
    image: "/images/why/why-speed.jpg",
  },
  {
    title: "Custom Development",
    category: "Bespoke",
    desc: "Solutions shaped to your workflows and systems — never one-size-fits-all.",
    icon: Puzzle,
    image: "/images/why/why-custom.jpg",
  },
  {
    title: "Scalable Architecture",
    category: "Architecture",
    desc: "Cloud-native, event-driven systems that scale from pilot to millions of docs.",
    icon: Layers,
    image: "/images/why/why-scale.jpg",
  },
  {
    title: "ROI Focused",
    category: "Outcomes",
    desc: "We commit to measurable outcomes and track value from day one.",
    icon: TrendingUp,
    image: "/images/why/why-roi.jpg",
  },
];

function CardImage({
  src,
  alt,
  Icon,
}: {
  src: string;
  alt: string;
  Icon: LucideIcon;
}) {
  return (
    <div className="relative aspect-[3/2] w-full overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#7172da]/15 via-[#7bd3cf]/10 to-[#ab9cee]/15">
        <div className="absolute -right-6 -top-6 h-20 w-20 rounded-full bg-white/30 blur-2xl" />
        <Icon
          aria-hidden
          strokeWidth={1.25}
          className="absolute bottom-2.5 right-2.5 h-9 w-9 text-fg/[0.10]"
        />
      </div>
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        onError={(e) => {
          e.currentTarget.style.display = "none";
        }}
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
      />
    </div>
  );
}

function ReasonCard({ reason, index }: { reason: Reason; index: number }) {
  const sp = useSpotlight<HTMLElement>();
  const Icon = reason.icon;

  return (
    <Reveal delay={index * 0.07} className="h-full">
      <article
        {...sp.spotlightProps}
        className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-fg/[0.06] bg-white shadow-[0_1px_2px_rgba(20,24,60,0.04),0_18px_48px_-32px_rgba(20,24,60,0.22)] hover:shadow-[0_1px_2px_rgba(20,24,60,0.05),0_24px_56px_-30px_rgba(69,67,217,0.28)] dark:border-white/10 dark:bg-white/[0.04] dark:backdrop-blur-xl dark:shadow-none dark:hover:border-white/20"
      >
        <CardImage src={reason.image} alt={`${reason.title} illustration`} Icon={Icon} />

        <div className="relative z-[3] flex flex-1 flex-col p-4">
          <div className="flex items-center gap-1.5 text-fg/60">
            <Icon className="h-3.5 w-3.5" strokeWidth={1.5} aria-hidden />
            <span className="text-[11px] font-semibold uppercase tracking-[0.16em]">
              {reason.category}
            </span>
          </div>

          <h3 className="mt-1.5 font-display text-[15px] font-semibold tracking-[-0.02em] text-fg">
            {reason.title}
          </h3>

          <p className="mt-1 text-[13px] leading-relaxed text-fg/60">{reason.desc}</p>
        </div>

        <SpotlightOverlay active={sp.active} />
      </article>
    </Reveal>
  );
}

export default function WhyChooseUs() {
  return (
    <section id="why" className="relative section">
      <div className="pointer-events-none absolute right-0 top-1/3 h-72 w-72 rounded-full bg-neon-violet/10 blur-[120px]" />
      <SectionHeading
        eyebrow="Why Choose Bista AI?"
        title={
          <>
            Built like a <span className="text-gradient">product company</span>, delivered
            like a partner
          </>
        }
      />

      <div className="mx-auto mt-10 grid max-w-6xl gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {REASONS.map((r, i) => (
          <ReasonCard key={r.title} reason={r} index={i} />
        ))}
      </div>
    </section>
  );
}
