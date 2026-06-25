"use client";

import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";

const TILE = {
  sm: "h-11 w-11 rounded-xl",
  md: "h-14 w-14 rounded-2xl",
  lg: "h-16 w-16 rounded-2xl",
} as const;

const GLYPH = {
  sm: "h-5 w-5",
  md: "h-6 w-6",
  lg: "h-7 w-7",
} as const;

export default function AnimatedIcon({
  icon: Icon,
  size = "md",
  delay = 0,
  className = "",
}: {
  icon: LucideIcon;
  size?: keyof typeof TILE;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={`relative grid ${TILE[size]} place-items-center bg-gradient-to-br from-neon-cyan to-neon-blue text-white shadow-[0_12px_30px_-8px_rgba(69,67,217,0.65)] ring-1 ring-white/25 ${className}`}
      animate={{ y: [0, -5, 0] }}
      transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut", delay }}
      whileHover={{ scale: 1.1, rotate: -5 }}
    >
      {/* glossy top highlight → 3D feel */}
      <span className="pointer-events-none absolute inset-x-1 top-1 h-1/2 rounded-[inherit] bg-gradient-to-b from-white/45 to-transparent opacity-70" />
      {/* pulsing aura */}
      <motion.span
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-[inherit] ring-2 ring-neon-cyan/40"
        animate={{ opacity: [0.15, 0.6, 0.15], scale: [1, 1.14, 1] }}
        transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut", delay }}
      />
      <Icon className={`relative ${GLYPH[size]} drop-shadow-[0_2px_3px_rgba(0,0,0,0.25)]`} strokeWidth={2} />
    </motion.div>
  );
}
