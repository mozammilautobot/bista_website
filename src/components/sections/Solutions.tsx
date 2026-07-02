"use client";

import { FileText, Bot, RefreshCw, Rocket, type LucideIcon } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import { useSpotlight, SpotlightOverlay } from "@/components/ui/SpotlightCard";

type Solution = {
  title: string;
  category: string;
  icon: LucideIcon;
  description: string;
  image: string;
};

const SOLUTIONS: Solution[] = [
  {
    title: "Intelligent Document Processing",
    category: "Documents",
    icon: FileText,
    description:
      "OCR, Classification and Data extraction that turn PDFs, Invoices and Forms into clean, Structured data.",
    image: "/images/solutions/solution-idp.jpg",
  },
  {
    title: "Business Process Automation",
    category: "Automation",
    icon: RefreshCw,
    description:
      "ERP, CRM, HR, Finance, Banking and Excel workflows automated to remove manual handoffs across teams.",
    image: "/images/solutions/solution-automation.jpg",
  },
  {
    title: "Agentic AI Solutions",
    category: "Autonomous Agents",
    icon: Bot,
    description:
      "Multi-agent systems, AI assistants and RAG that take on repetitive knowledge work end to end.",
    image: "/images/solutions/solution-agentic.jpg",
  },
  
  {
    title: "AI Product Development",
    category: "Engineering",
    icon: Rocket,
    description:
      "Custom AI SaaS, API platforms and MLOps — taken from idea to production-grade deployment.",
    image: "/images/solutions/solution-product.jpg",
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

function SolutionCard({ solution, index }: { solution: Solution; index: number }) {
  const sp = useSpotlight<HTMLElement>();
  const Icon = solution.icon;

  return (
    <Reveal delay={index * 0.08} className="h-full">
      <article
        {...sp.spotlightProps}
        className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-fg/[0.06] bg-white shadow-[0_1px_2px_rgba(20,24,60,0.04),0_18px_48px_-32px_rgba(20,24,60,0.22)] hover:shadow-[0_1px_2px_rgba(20,24,60,0.05),0_24px_56px_-30px_rgba(69,67,217,0.28)] dark:border-white/10 dark:bg-white/[0.04] dark:backdrop-blur-xl dark:shadow-none dark:hover:border-white/20"
      >
        <CardImage src={solution.image} alt={`${solution.title} illustration`} Icon={Icon} />

        <div className="relative z-[3] flex flex-1 flex-col p-4">
          <div className="flex items-center gap-1.5 text-fg/60">
            <Icon className="h-3.5 w-3.5" strokeWidth={1.5} aria-hidden />
            <span className="text-[11px] font-semibold uppercase tracking-[0.16em]">
              {solution.category}
            </span>
          </div>

          <h3 className="mt-1.5 font-display text-[15px] font-semibold tracking-[-0.02em] text-fg">
            {solution.title}
          </h3>

          <p className="mt-1 text-[13px] leading-relaxed text-fg/60">
            {solution.description}
          </p>
        </div>

        <SpotlightOverlay active={sp.active} />
      </article>
    </Reveal>
  );
}

export default function Solutions() {
  return (
    <section id="solutions" className="relative section">
      <SectionHeading
        eyebrow="Solutions"
        title={
          <>
            We Solve <span className="text-gradient">Business Problems</span>, Not Just
            <span className="text-gradient"> Ship Models</span>
          </>
        }
        subtitle="Every engagement starts from a measurable business outcome — cost saved, hours returned, revenue unlocked."
      />

      <div className="mx-auto mt-10 grid max-w-7xl gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {SOLUTIONS.map((s, i) => (
          <SolutionCard key={s.title} solution={s} index={i} />
        ))}
      </div>
    </section>
  );
}
