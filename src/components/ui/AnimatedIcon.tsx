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
  xs: "h-4 w-4",
  sm: "h-5 w-5",
  md: "h-[22px] w-[22px]",
  lg: "h-7 w-7",
} as const;

/**
 * Shared premium icon badge used across the whole site.
 *
 * Monochrome + theme-aware: it leans entirely on the `--fg` token, so it renders
 * as a crisp charcoal/ink glyph in a soft light container on light surfaces, and
 * automatically flips to a clean white glyph in a translucent-white container
 * inside `.band-black` / dark bands (where `--fg` is re-pointed to white). This
 * keeps icons high-contrast and legible everywhere with no per-section colors.
 */
export default function AnimatedIcon({
  icon: Icon,
  size = "md",
  delay = 0,
  float = true,
  strokeWidth = 1.9,
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
      className={`group/icon relative grid ${TILE[size]} place-items-center border border-fg/10 bg-fg/[0.05] text-fg shadow-[0_8px_24px_-14px_rgba(20,24,60,0.5)] backdrop-blur-sm transition-[background-color,border-color,box-shadow] duration-300 ease-out hover:border-fg/30 hover:bg-fg/[0.09] ${className}`}
      animate={animateFloat ? { y: [0, -4, 0] } : undefined}
      transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut", delay }}
      whileHover={reduce ? undefined : { scale: 1.08, rotate: -4 }}
      whileTap={{ scale: 0.95 }}
    >
      {/* soft monochrome halo — subtle on light, a clean glow on black; lifts on hover */}
      <span
        aria-hidden
        className="pointer-events-none absolute -inset-1.5 rounded-[inherit] bg-fg/10 opacity-0 blur-md transition-opacity duration-300 group-hover/icon:opacity-100"
      />
      {/* faint top sheen for a premium, dimensional finish */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-1 top-1 h-1/3 rounded-[inherit] bg-gradient-to-b from-fg/10 to-transparent opacity-60"
      />
      <Icon
        className={`relative ${GLYPH[size]} transition-transform duration-300 ease-out group-hover/icon:scale-110`}
        strokeWidth={strokeWidth}
      />
    </motion.div>
  );
}
