"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { LucideIcon } from "lucide-react";

const TILE = {
  xs: "h-9 w-9 rounded-xl",
  sm: "h-11 w-11 rounded-xl",
  md: "h-12 w-12 rounded-2xl",
  lg: "h-16 w-16 rounded-2xl",
} as const;

const GLYPH = {
  xs: "h-[18px] w-[18px]",
  sm: "h-5 w-5",
  md: "h-[22px] w-[22px]",
  lg: "h-7 w-7",
} as const;

/**
 * Shared thin-line icon used across the whole site.
 *
 * Monochrome + theme-aware: it leans entirely on the `--fg` token, so it renders
 * as a crisp charcoal/ink glyph in a soft light container on light surfaces, and
 * automatically flips to a clean white glyph in a translucent-white container
 * inside `.band-black` / dark bands (where `--fg` is re-pointed to white). The
 * treatment mirrors the Agentic AI section: a minimal, low-contrast container and
 * a thin 1.5-stroke line glyph — Apple-like, no heavy gradient or 3D badge.
 */
export default function AnimatedIcon({
  icon: Icon,
  size = "md",
  delay = 0,
  float = true,
  strokeWidth = 1.5,
  className = "",
}: {
  icon: LucideIcon;
  size?: keyof typeof TILE;
  delay?: number;
  float?: boolean;
  strokeWidth?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const animateFloat = float && !reduce;

  return (
    <motion.div
      className={`group/icon relative grid ${TILE[size]} place-items-center border border-fg/[0.08] bg-fg/[0.03] text-fg/70 transition-[background-color,border-color,color] duration-300 ease-out hover:border-fg/20 hover:bg-fg/[0.06] hover:text-fg ${className}`}
      animate={animateFloat ? { y: [0, -4, 0] } : undefined}
      transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut", delay }}
      whileHover={reduce ? undefined : { scale: 1.04 }}
      whileTap={{ scale: 0.96 }}
    >
      <Icon
        aria-hidden
        className={`relative ${GLYPH[size]} transition-transform duration-300 ease-out group-hover/icon:scale-110`}
        strokeWidth={strokeWidth}
      />
    </motion.div>
  );
}
