"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  Landmark,
  Ship,
  Factory,
  ShoppingBag,
  Home,
  Database,
  ShieldCheck,
  BrainCircuit,
  type LucideIcon,
} from "lucide-react";

const VW = 1000;
const VH = 700;
const HUB = { x: 500, y: 350 };

type Node = {
  id: string;
  name: string;
  icon: LucideIcon;
  color: string;
  x: number;
  y: number;
};

const NODES: Node[] = [
  { id: "finance", name: "Finance", icon: Landmark, color: "#ff8045", x: 220, y: 150 },
  { id: "insurance", name: "Insurance", icon: ShieldCheck, color: "#ab9cee", x: 500, y: 108 },
  { id: "shipping", name: "Shipping", icon: Ship, color: "#7bd3cf", x: 780, y: 150 },
  { id: "manufacturing", name: "Manufacturing", icon: Factory, color: "#7bd3cf", x: 170, y: 378 },
  { id: "retail", name: "Retail", icon: ShoppingBag, color: "#ffbd45", x: 838, y: 360 },
  { id: "operations", name: "Operations", icon: Database, color: "#4543d9", x: 322, y: 566 },
  { id: "realestate", name: "Real Estate", icon: Home, color: "#ff8045", x: 666, y: 560 },
];

function connectorPath(n: Node) {
  const dx = n.x - HUB.x;
  const dy = n.y - HUB.y;
  const c1x = HUB.x + dx * 0.45;
  const c1y = HUB.y;
  const c2x = n.x - dx * 0.12;
  const c2y = n.y - dy * 0.45;
  return `M ${HUB.x} ${HUB.y} C ${c1x} ${c1y}, ${c2x} ${c2y}, ${n.x} ${n.y}`;
}

function bezierPoint(n: Node, t: number) {
  const c1x = HUB.x + (n.x - HUB.x) * 0.45;
  const c1y = HUB.y;
  const c2x = n.x - (n.x - HUB.x) * 0.12;
  const c2y = n.y - (n.y - HUB.y) * 0.45;
  const u = 1 - t;
  const x =
    u * u * u * HUB.x + 3 * u * u * t * c1x + 3 * u * t * t * c2x + t * t * t * n.x;
  const y =
    u * u * u * HUB.y + 3 * u * u * t * c1y + 3 * u * t * t * c2y + t * t * t * n.y;
  return { x, y };
}

const DECOR = [
  { x: 12, y: 30, w: 46, h: 16, rounded: true, color: "#ff8045", delay: 0 },
  { x: 90, y: 32, w: 44, h: 16, rounded: true, color: "#7bd3cf", delay: 0.6 },
  { x: 13, y: 44, w: 26, h: 26, rounded: false, color: "#7bd3cf", delay: 1.1 },
  { x: 90, y: 47, w: 26, h: 26, rounded: false, color: "#4543d9", delay: 0.3 },
  { x: 28, y: 74, w: 24, h: 24, rounded: false, color: "#ff8045", delay: 0.9 },
  { x: 11, y: 72, w: 48, h: 16, rounded: true, color: "#ab9cee", delay: 1.4 },
  { x: 90, y: 74, w: 46, h: 16, rounded: true, color: "#ffbd45", delay: 0.5 },
];

export default function IndustriesMap() {
  const reduced = useReducedMotion();

  return (
    <div className="relative aspect-[10/7] w-full select-none">
      {/* faint floating pastel decorations */}
      {DECOR.map((d, i) => (
        <motion.span
          key={i}
          aria-hidden
          className="pointer-events-none absolute"
          style={{
            left: `${d.x}%`,
            top: `${d.y}%`,
            width: d.w,
            height: d.h,
            borderRadius: d.rounded ? 999 : d.w * 0.32,
            background: `linear-gradient(140deg, ${d.color}55, ${d.color}22)`,
            boxShadow: `0 6px 16px -6px ${d.color}55`,
          }}
          animate={reduced ? undefined : { y: [0, -10, 0], opacity: [0.5, 0.85, 0.5] }}
          transition={{ duration: 6 + i, repeat: Infinity, ease: "easeInOut", delay: d.delay }}
        />
      ))}

      {/* connector lines + traveling pulses */}
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox={`0 0 ${VW} ${VH}`}
        fill="none"
        aria-hidden
      >
        <defs>
          <filter id="im-glow" x="-120%" y="-120%" width="340%" height="340%">
            <feGaussianBlur stdDeviation="6" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {NODES.map((n) => (
          <path
            key={`line-${n.id}`}
            id={`im-conn-${n.id}`}
            d={connectorPath(n)}
            stroke="#4543d9"
            strokeWidth={2}
            strokeLinecap="round"
            opacity={0.28}
          />
        ))}

        {/* small static dots along each connector (like the reference) */}
        {NODES.flatMap((n) =>
          [0.34, 0.68].map((t, k) => {
            const p = bezierPoint(n, t);
            return (
              <circle
                key={`dot-${n.id}-${k}`}
                cx={p.x}
                cy={p.y}
                r={4}
                fill="#4543d9"
                opacity={0.55}
              />
            );
          })
        )}

        {/* traveling energy pulses: hub -> industry node */}
        {NODES.map((n, i) =>
          reduced ? (
            <circle key={`pulse-${n.id}`} cx={n.x} cy={n.y} r={4.5} fill={n.color} />
          ) : (
            <g key={`pulse-${n.id}`} filter="url(#im-glow)">
              <circle r={8} fill={n.color} opacity={0.4} />
              <circle r={3.5} fill={n.color} />
              <animateMotion
                dur="3.2s"
                begin={`${i * 0.42}s`}
                repeatCount="indefinite"
                rotate="auto"
                keyPoints="0;1"
                keyTimes="0;1"
                calcMode="spline"
                keySplines="0.45 0 0.25 1"
              >
                <mpath href={`#im-conn-${n.id}`} />
              </animateMotion>
              <animate
                attributeName="opacity"
                dur="3.2s"
                begin={`${i * 0.42}s`}
                repeatCount="indefinite"
                values="0;1;1;0"
                keyTimes="0;0.14;0.82;1"
              />
            </g>
          )
        )}
      </svg>

      {/* central hub */}
      <div
        className="absolute"
        style={{
          left: `${(HUB.x / VW) * 100}%`,
          top: `${(HUB.y / VH) * 100}%`,
          transform: "translate(-50%, -50%)",
        }}
      >
        <div className="relative grid h-24 w-24 place-items-center rounded-[28px] border border-white/60 bg-gradient-to-br from-neon-violet/35 via-neon-cyan/25 to-neon-blue/30 shadow-[0_18px_50px_-12px_rgba(69,67,217,0.6)] backdrop-blur-md sm:h-28 sm:w-28">
          <span className="pointer-events-none absolute inset-x-2 top-2 h-1/2 rounded-[22px] bg-gradient-to-b from-white/60 to-transparent opacity-70" />
          {!reduced && (
            <>
              <motion.span
                aria-hidden
                className="pointer-events-none absolute inset-0 rounded-[28px] ring-2 ring-neon-cyan/40"
                animate={{ opacity: [0.2, 0.55, 0.2], scale: [1, 1.12, 1] }}
                transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.span
                aria-hidden
                className="pointer-events-none absolute inset-0 rounded-[28px] ring ring-neon-violet/30"
                animate={{ opacity: [0, 0.4, 0], scale: [1, 1.35, 1.55] }}
                transition={{ duration: 3.2, repeat: Infinity, ease: "easeOut" }}
              />
            </>
          )}
          <div className="relative grid h-12 w-12 place-items-center rounded-full bg-gradient-to-br from-neon-violet to-neon-blue shadow-[0_8px_22px_-6px_rgba(31,42,172,0.8)] sm:h-14 sm:w-14">
            <span className="pointer-events-none absolute left-2 top-1.5 h-2.5 w-2.5 rounded-full bg-white/80 blur-[1px]" />
            <BrainCircuit
              className="relative h-7 w-7 text-white drop-shadow-[0_2px_6px_rgba(31,42,172,0.9)] sm:h-8 sm:w-8"
              strokeWidth={1.75}
            />
          </div>
        </div>
      </div>

      {/* industry nodes */}
      {NODES.map((n) => (
        <div
          key={`node-${n.id}`}
          className="absolute"
          style={{
            left: `${(n.x / VW) * 100}%`,
            top: `${(n.y / VH) * 100}%`,
            transform: "translate(-50%, -50%)",
          }}
        >
          <div
            className="relative grid h-12 w-12 place-items-center overflow-hidden rounded-2xl backdrop-blur-sm sm:h-16 sm:w-16"
            style={{
              background: `linear-gradient(150deg, ${n.color}33, ${n.color}14)`,
              border: `1px solid ${n.color}59`,
              boxShadow: `0 12px 30px -10px ${n.color}80`,
              color: n.color,
            }}
            title={n.name}
          >
            <span className="pointer-events-none absolute inset-x-1.5 top-1.5 h-1/2 rounded-2xl bg-gradient-to-b from-white/55 to-transparent opacity-70" />
            <n.icon className="relative h-6 w-6 sm:h-7 sm:w-7" strokeWidth={1.75} />
          </div>
        </div>
      ))}
    </div>
  );
}
