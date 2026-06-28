"use client";

import { motion, useReducedMotion } from "framer-motion";

/**
 * phenom.com-style ambient background: a clean canvas with soft pastel gradient
 * blobs and thin flowing curved lines that gently drift across the page.
 *
 * `variant="page"`  → faint, full-page layer (mounted once behind everything)
 * `variant="hero"`  → richer blobs + lines for the hero section
 */
export default function PhenomFlow({
  variant = "page",
  className = "",
}: {
  variant?: "page" | "hero" | "dark";
  className?: string;
}) {
  const hero = variant === "hero";
  const dark = variant === "dark";
  const lineOpacity = dark ? 0.78 : hero ? 0.62 : 0.5;
  const reduceMotion = useReducedMotion();

  const lines = [
    {
      d: "M-120 220 C 280 60, 640 360, 1040 180 S 1640 120 1880 300",
      width: dark ? 4.5 : hero ? 3 : 2.5,
      opacity: lineOpacity,
      float: [0, 26, 0],
      floatDuration: 17,
    },
    {
      d: "M-120 520 C 320 360, 680 660, 1080 460 S 1660 420 1900 600",
      width: dark ? 3.5 : hero ? 2.5 : 2,
      opacity: lineOpacity * 0.8,
      float: [0, -22, 0],
      floatDuration: 21,
    },
    {
      d: "M-120 760 C 360 640, 720 900, 1120 720 S 1680 700 1920 840",
      width: dark ? 2.75 : hero ? 2 : 1.5,
      opacity: lineOpacity * 0.6,
      float: [0, 18, 0],
      floatDuration: 24,
    },
  ];

  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      aria-hidden
    >
      {/* soft pastel gradient blobs (gold left, teal→lavender right) */}
      <motion.div
        className={`absolute rounded-full blur-3xl ${
          hero ? "-left-40 top-10 h-[36rem] w-[36rem]" : "-left-56 top-1/3 h-[30rem] w-[30rem]"
        }`}
        style={{
          background:
            "radial-gradient(circle, rgba(255,189,69,0.22), rgba(255,128,69,0.12), transparent 68%)",
        }}
        animate={{ x: [0, 40, 0], y: [0, 24, 0], scale: [1, 1.08, 1] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className={`absolute rounded-full blur-3xl ${
          hero ? "-right-40 bottom-0 h-[36rem] w-[36rem]" : "-right-56 bottom-1/4 h-[30rem] w-[30rem]"
        }`}
        style={{
          background:
            "radial-gradient(circle, rgba(123,211,207,0.22), rgba(171,156,238,0.16), transparent 68%)",
        }}
        animate={{ x: [0, -36, 0], y: [0, -28, 0], scale: [1.06, 1, 1.06] }}
        transition={{ duration: 21, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* flowing pastel lines (the phenom signature) */}
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 1440 900"
        preserveAspectRatio="none"
        fill="none"
      >
        <defs>
          <linearGradient
            id="phenomFlowGrad"
            x1="0"
            y1="0"
            x2="1"
            y2="0"
            spreadMethod="repeat"
          >
            <stop offset="0%" stopColor="#ff8045" />
            <stop offset="20%" stopColor="#f5905e" />
            <stop offset="40%" stopColor="#7bd3cf" />
            <stop offset="60%" stopColor="#ab9cee" />
            <stop offset="80%" stopColor="#ffbd45" />
            <stop offset="100%" stopColor="#ff8045" />
            <animateTransform
              attributeName="gradientTransform"
              type="translate"
              from="0 0"
              to="1 0"
              dur="8s"
              repeatCount="indefinite"
            />
          </linearGradient>
        </defs>

        {lines.map((line, i) => (
          <motion.path
            key={i}
            d={line.d}
            stroke="url(#phenomFlowGrad)"
            strokeWidth={line.width}
            strokeLinecap="round"
            style={{ opacity: line.opacity }}
            initial={
              reduceMotion ? { pathLength: 1, y: 0 } : { pathLength: 0, y: 0 }
            }
            whileInView={
              reduceMotion
                ? { pathLength: 1, y: 0 }
                : { pathLength: 1, y: line.float }
            }
            viewport={{ once: false, amount: 0.35 }}
            transition={
              reduceMotion
                ? { duration: 0 }
                : {
                    pathLength: {
                      duration: 1.7,
                      ease: [0.45, 0, 0.2, 1],
                      delay: i * 0.22,
                    },
                    y: {
                      duration: line.floatDuration,
                      repeat: Infinity,
                      ease: "easeInOut",
                    },
                  }
            }
          />
        ))}
      </svg>
    </div>
  );
}
