"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import { useSpotlight, SpotlightOverlay } from "@/components/ui/SpotlightCard";

const POSTS: {
  category: string;
  title: string;
  read: string;
  image: string;
}[] = [
  {
    category: "AI Agents",
    title: "Designing multi-agent systems that actually ship value",
    read: "7 min read",
    image: "/images/blog/blog-ai-agents.png",
  },
  {
    category: "Agentic Automation",
    title: "When to use a single agent vs. an orchestrated crew",
    read: "5 min read",
    image: "/images/blog/blog-agentic-automation.png",
  },
  {
    category: "Document AI",
    title: "Beyond OCR: extracting meaning from messy enterprise docs",
    read: "6 min read",
    image: "/images/blog/blog-document-ai.png",
  },
  {
    category: "RAG",
    title: "Retrieval pipelines that don't hallucinate in production",
    read: "8 min read",
    image: "/images/blog/blog-rag.png",
  },
  {
    category: "Enterprise AI",
    title: "A pragmatic security checklist for deploying LLMs",
    read: "9 min read",
    image: "/images/blog/blog-enterprise-ai.png",
  },
  {
    category: "Workflow Automation",
    title: "Mapping a business process before you automate it",
    read: "4 min read",
    image: "/images/blog/blog-workflow.png",
  },
];

function PostCard({ post }: { post: (typeof POSTS)[number] }) {
  const sp = useSpotlight<HTMLAnchorElement>();

  return (
    <a
      {...sp.spotlightProps}
      data-card
      href="#"
      className="group relative flex w-[290px] shrink-0 snap-start flex-col overflow-hidden rounded-2xl border border-fg/[0.06] bg-white shadow-[0_1px_2px_rgba(20,24,60,0.04),0_18px_48px_-32px_rgba(20,24,60,0.22)] hover:shadow-[0_1px_2px_rgba(20,24,60,0.05),0_24px_56px_-30px_rgba(69,67,217,0.28)] dark:border-white/10 dark:bg-white/[0.04] dark:backdrop-blur-xl dark:shadow-none dark:hover:border-white/20 sm:w-[330px]"
    >
      <div className="relative aspect-[3/2] overflow-hidden bg-fg/[0.04] dark:bg-white/[0.03]">
        <img
          src={post.image}
          alt={post.title}
          loading="lazy"
          decoding="async"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).style.display = "none";
          }}
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-950/35 via-transparent to-transparent" />
        <span className="absolute left-3 top-3 rounded-full bg-ink-950/55 px-2.5 py-1 text-[11px] font-medium text-white/90 backdrop-blur">
          {post.category}
        </span>
      </div>
      <div className="relative z-[3] flex flex-1 flex-col p-5">
        <h3 className="font-display text-[15px] font-semibold leading-snug tracking-[-0.01em] text-fg transition-colors group-hover:text-neon-blue dark:group-hover:text-neon-violet">
          {post.title}
        </h3>
        <div className="mt-auto flex items-center justify-between pt-4 text-[13px] text-fg/55">
          <span>{post.read}</span>
          <span className="inline-flex items-center gap-1 text-neon-blue dark:text-neon-violet">
            Read
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </span>
        </div>
      </div>

      <SpotlightOverlay active={sp.active} />
    </a>
  );
}

export default function Blog() {
  const scrollerRef = useRef<HTMLDivElement>(null);

  const scrollByCards = (dir: number) => {
    const el = scrollerRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-card]");
    const amount = card ? card.offsetWidth + 20 : el.clientWidth * 0.85;
    el.scrollBy({ left: dir * amount, behavior: "smooth" });
  };

  return (
    <section id="insights" className="section">
      <SectionHeading
        eyebrow="Blog / Insights"
        title={
          <>
            Ideas on <span className="text-gradient">applied AI</span> & automation
          </>
        }
        subtitle="Practical, engineering-led perspectives — the kind that help you ship, not hype."
      />

      <div className="mx-auto mt-10 max-w-7xl">
        <div className="mb-4 flex items-center justify-end gap-2">
          <button
            type="button"
            onClick={() => scrollByCards(-1)}
            aria-label="Previous insights"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-fg/10 bg-bg/70 text-fg/70 backdrop-blur transition-colors hover:border-fg/20 hover:text-fg"
          >
            <ChevronLeft className="h-4 w-4" strokeWidth={1.75} aria-hidden />
          </button>
          <button
            type="button"
            onClick={() => scrollByCards(1)}
            aria-label="Next insights"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-fg/10 bg-bg/70 text-fg/70 backdrop-blur transition-colors hover:border-fg/20 hover:text-fg"
          >
            <ChevronRight className="h-4 w-4" strokeWidth={1.75} aria-hidden />
          </button>
        </div>

        <div
          ref={scrollerRef}
          className="-mx-4 flex snap-x snap-mandatory gap-5 overflow-x-auto px-4 pb-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {POSTS.map((p) => (
            <PostCard key={p.title} post={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
