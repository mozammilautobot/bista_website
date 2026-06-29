"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Quote, type LucideIcon, Factory, Boxes, ShieldCheck } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import PhenomFlow from "@/components/ui/PhenomFlow";

type Testimonial = {
  quote: string;
  name: string;
  role: string;
  before: string;
  after: string;
  metric: string;
  icon: LucideIcon;
  image: string;
  logo: string;
  logoDark?: boolean;
  logoBig?: boolean;
};

const QUOTES: Testimonial[] = [
  {
    quote:
      "Before automation, several of our processes were manual, time-consuming and error-prone. Partnering with Bista turned those challenges into efficiency and accuracy.",
    name: "Jessica",
    role: "RVL Brands",
    before: "1 day",
    after: "10 min",
    metric: "avg. processing time",
    icon: Boxes,
    image: "/images/testimonials/testimonial-rvl.png",
    logo: "/images/testimonials/logos/rvl.png",
    logoBig: true,
  },
  {
    quote:
      "Bista's solution reached a major milestone for us — automating Purchase Order to ERP Sales Order conversion for a key customer, with a clear path to extend it across every order.",
    name: "Glen",
    role: "InnoFoods",
    before: "2 days",
    after: "25 min",
    metric: "avg. processing time",
    icon: Factory,
    image: "/images/testimonials/testimonial-innofoods.png",
    logo: "/images/testimonials/logos/innofoods.png",
    logoDark: true,
  },
  {
    quote:
      "The team has shown great character and dedication throughout the project, responding to every request and fix. Be assured we are committed to giving you all the support you need.",
    name: "Segun Babalola",
    role: "Leadway Pensure",
    before: "45 hrs",
    after: "2 hrs",
    metric: "weekly manual work",
    icon: ShieldCheck,
    image: "/images/testimonials/testimonial-leadway.png",
    logo: "/images/testimonials/logos/leadway.png",
    logoDark: true,
    logoBig: true,
  },
];

function LogoBadge({
  src,
  name,
  dark,
  big,
}: {
  src: string;
  name: string;
  dark?: boolean;
  big?: boolean;
}) {
  const [failed, setFailed] = useState(false);

  return (
    <div
      className={`absolute left-3 top-3 z-10 flex items-center rounded-lg px-2 py-1 backdrop-blur ${
        dark
          ? "bg-black/55 ring-1 ring-white/15"
          : "bg-white/90 ring-1 ring-black/5"
      }`}
    >
      {failed ? (
        <span
          className={`font-display text-xs font-bold tracking-tight ${
            dark ? "text-white" : "text-ink-950"
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
          className={`w-auto object-contain ${
            big ? "h-10 max-w-[116px]" : "h-6 max-w-[104px]"
          }`}
        />
      )}
    </div>
  );
}

function CardImage({
  src,
  alt,
  Icon,
  logo,
  logoName,
  logoDark,
  logoBig,
}: {
  src: string;
  alt: string;
  Icon: LucideIcon;
  logo: string;
  logoName: string;
  logoDark?: boolean;
  logoBig?: boolean;
}) {
  return (
    <div className="relative aspect-[3/2] w-full overflow-hidden rounded-t-2xl">
      <div className="absolute inset-0 bg-gradient-to-br from-[#7172da]/30 via-[#1f2aac]/25 to-[#7bd3cf]/25">
        <div className="absolute -left-6 -top-6 h-20 w-20 rounded-full bg-[#7bd3cf]/25 blur-2xl" />
        <Icon
          aria-hidden
          strokeWidth={1.25}
          className="absolute bottom-2.5 right-2.5 h-9 w-9 text-white/15"
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
        className="absolute inset-0 h-full w-full scale-105 object-cover transition-transform duration-700 ease-out will-change-transform group-hover:scale-110 motion-reduce:scale-100 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
      <LogoBadge src={logo} name={logoName} dark={logoDark} big={logoBig} />
    </div>
  );
}

function TestimonialCard({ item, index }: { item: Testimonial; index: number }) {
  const reduce = useReducedMotion();
  const Icon = item.icon;

  return (
    <Reveal delay={index * 0.1} className="h-full">
      <motion.figure
        whileHover={reduce ? undefined : { y: -4 }}
        transition={{ type: "spring", stiffness: 300, damping: 22 }}
        className="group flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-xl transition-colors duration-500 hover:border-white/20"
      >
        <CardImage
          src={item.image}
          alt={`${item.role} workplace`}
          Icon={Icon}
          logo={item.logo}
          logoName={item.role}
          logoDark={item.logoDark}
          logoBig={item.logoBig}
        />

        <div className="flex flex-1 flex-col p-4">
          <Quote className="h-5 w-5 text-[#7bd3cf]" strokeWidth={1.5} aria-hidden />
          <blockquote className="mt-2 flex-1 text-[13px] leading-relaxed text-fg/75">
            {item.quote}
          </blockquote>

          <div className="mt-3 flex items-center gap-3 rounded-xl bg-white/[0.04] p-2 ring-1 ring-transparent transition-all duration-500 group-hover:bg-[#7bd3cf]/[0.08] group-hover:ring-[#7bd3cf]/25">
            <div className="text-center">
              <div className="text-[10px] uppercase tracking-wide text-fg/40">Before</div>
              <div className="font-display font-bold text-fg/70">{item.before}</div>
            </div>
            <motion.span
              aria-hidden
              className="text-[#7bd3cf]"
              animate={reduce ? undefined : { x: [0, 4, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            >
              →
            </motion.span>
            <div className="text-center">
              <div className="text-[10px] uppercase tracking-wide text-[#7bd3cf]">After</div>
              <div className="font-display font-bold text-fg">{item.after}</div>
            </div>
            <div className="ml-auto text-right text-[11px] text-fg/45">{item.metric}</div>
          </div>

          <figcaption className="mt-3 flex items-center gap-3">
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-gradient-to-br from-[#7bd3cf] to-[#ab9cee] font-display text-base font-bold text-ink-950 transition-transform duration-500 group-hover:scale-110">
              {item.name.charAt(0)}
            </span>
            <div>
              <div className="text-[15px] font-semibold text-fg">{item.name}</div>
              <div className="text-[13px] text-fg/45">{item.role}</div>
            </div>
          </figcaption>
        </div>
      </motion.figure>
    </Reveal>
  );
}

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

        <div className="mx-auto mt-10 grid max-w-6xl gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {QUOTES.map((q, i) => (
            <TestimonialCard key={q.name} item={q} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
