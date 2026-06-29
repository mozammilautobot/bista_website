"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import Reveal from "./Reveal";

export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
  tone = "light",
}: {
  eyebrow: string;
  title: React.ReactNode;
  subtitle?: string;
  align?: "center" | "left";
  tone?: "light" | "dark";
}) {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const inView = useInView(headingRef, { amount: 0.4 });
  // Re-mount the gradient title each time the heading scrolls into view so the
  // rainbow "reveal" sweep replays on navigate/return (phenom-style).
  const [revealKey, setRevealKey] = useState(0);
  useEffect(() => {
    if (inView) setRevealKey((k) => k + 1);
  }, [inView]);

  return (
    <Reveal
      className={
        align === "center"
          ? "mx-auto w-full max-w-6xl text-center"
          : "w-full max-w-6xl text-left"
      }
    >
      <span className="eyebrow">
        <span className="h-1.5 w-1.5 rounded-full bg-neon-cyan animate-pulseGlow" />
        {eyebrow}
      </span>
      <h2
        ref={headingRef}
        className="font-display text-[1.85rem] font-medium leading-[1.08] tracking-[-0.03em] xs:text-[2.1rem] sm:text-4xl md:text-[2.5rem] lg:text-[2.6rem] xl:whitespace-nowrap"
      >
        <span key={revealKey} style={{ display: "contents" }}>
          {title}
        </span>
      </h2>
      {subtitle && (
        <p
          className={`mt-5 max-w-2xl text-base leading-relaxed sm:text-lg ${
            tone === "dark" ? "text-white/60" : "text-fg/60"
          } ${align === "center" ? "mx-auto" : ""}`}
        >
          {subtitle}
        </p>
      )}
    </Reveal>
  );
}
