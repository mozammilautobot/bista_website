"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  Search,
  PenLine,
  Wrench,
  Rocket,
  TrendingUp,
  type LucideIcon,
} from "lucide-react";

const VW = 440;
const VH = 520;

type Step = {
  n: string;
  title: string;
  icon: LucideIcon;
  color: string;
  x: number;
  y: number;
};

const LEFT = 122;
const RIGHT = 318;

const STEPS: Step[] = [
  { n: "01", title: "Discover", icon: Search, color: "#7bd3cf", x: LEFT, y: 56 },
  { n: "02", title: "Design", icon: PenLine, color: "#ab9cee", x: RIGHT, y: 158 },
  { n: "03", title: "Build", icon: Wrench, color: "#ffbd45", x: LEFT, y: 260 },
  { n: "04", title: "Deploy", icon: Rocket, color: "#ff8045", x: RIGHT, y: 362 },
  { n: "05", title: "Optimize", icon: TrendingUp, color: "#7172da", x: LEFT, y: 464 },
];

function snakePath(pts: { x: number; y: number }[]) {
  let d = `M ${pts[0].x} ${pts[0].y}`;
  for (let i = 1; i < pts.length; i++) {
    const a = pts[i - 1];
    const b = pts[i];
    const midY = (a.y + b.y) / 2;
    d += ` C ${a.x} ${midY}, ${b.x} ${midY}, ${b.x} ${b.y}`;
  }
  return d;
}

const PATH_D = snakePath(STEPS);

const SIGNALS = [
  { begin: 0, color: "#7bd3cf" },
  { begin: 1.6, color: "#ab9cee" },
  { begin: 3.2, color: "#ffbd45" },
];

export default function DeploymentSnake() {
  const reduced = useReducedMotion();

  return (
    <div className="relative aspect-[11/13] w-full select-none overflow-hidden text-fg">
      <svg
        className="absolute inset-0 h-full w-full text-fg"
        viewBox={`0 0 ${VW} ${VH}`}
        fill="none"
        aria-hidden
      >
        <defs>
          <filter id="ds-glow" x="-120%" y="-120%" width="340%" height="340%">
            <feGaussianBlur stdDeviation="6" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <linearGradient id="ds-snake-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#7bd3cf" />
            <stop offset="35%" stopColor="#ab9cee" />
            <stop offset="70%" stopColor="#ff8045" />
            <stop offset="100%" stopColor="#7172da" />
          </linearGradient>
        </defs>

        {/* soft underlay of the snake path */}
        <path
          d={PATH_D}
          stroke="url(#ds-snake-grad)"
          strokeWidth={12}
          strokeLinecap="round"
          fill="none"
          opacity={0.16}
          filter="url(#ds-glow)"
        />

        {/* the snake path itself */}
        <path
          id="ds-snake"
          d={PATH_D}
          stroke="url(#ds-snake-grad)"
          strokeWidth={2.2}
          strokeLinecap="round"
          fill="none"
          opacity={0.9}
        />

        {/* dashed energy overlay drifting along the path */}
        <path
          d={PATH_D}
          stroke="currentColor"
          strokeWidth={1.3}
          strokeLinecap="round"
          fill="none"
          opacity={0.22}
          strokeDasharray="2 16"
        >
          {!reduced && (
            <animate
              attributeName="stroke-dashoffset"
              values="0;-36"
              dur="1.4s"
              repeatCount="indefinite"
            />
          )}
        </path>

        {/* anchor halos beneath each node badge */}
        {STEPS.map((s) => (
          <circle
            key={`anchor-${s.n}`}
            cx={s.x}
            cy={s.y}
            r={18}
            fill={s.color}
            opacity={0.22}
            filter="url(#ds-glow)"
          />
        ))}

        {/* traveling signals running 01 -> 05 */}
        {!reduced &&
          SIGNALS.map((sig, i) => (
            <g key={`sig-${i}`} filter="url(#ds-glow)">
              <circle r={8} fill={sig.color} opacity={0.4} />
              <circle r={3.4} fill={sig.color} stroke="#ffffff" strokeWidth={0.7} />
              <animateMotion
                dur="5.2s"
                begin={`${sig.begin}s`}
                repeatCount="indefinite"
                rotate="auto"
                keyPoints="0;1"
                keyTimes="0;1"
                calcMode="spline"
                keySplines="0.45 0 0.25 1"
              >
                <mpath href="#ds-snake" />
              </animateMotion>
              <animate
                attributeName="opacity"
                dur="5.2s"
                begin={`${sig.begin}s`}
                repeatCount="indefinite"
                values="0;1;1;0"
                keyTimes="0;0.08;0.9;1"
              />
            </g>
          ))}
      </svg>

      {/* step nodes */}
      {STEPS.map((s, i) => (
        <div
          key={`node-${s.n}`}
          className="absolute"
          style={{
            left: `${(s.x / VW) * 100}%`,
            top: `${(s.y / VH) * 100}%`,
            transform: "translate(-50%, -50%)",
            width: "42%",
          }}
        >
          <div className="relative rounded-2xl p-2">
            <div className="relative flex items-center gap-2">
              <span
                className="relative grid h-7 w-7 shrink-0 place-items-center rounded-lg"
                style={{
                  background: `linear-gradient(150deg, ${s.color}40, ${s.color}1f)`,
                  border: `1px solid ${s.color}80`,
                  color: s.color,
                  boxShadow: `0 8px 18px -10px ${s.color}99`,
                }}
              >
                {!reduced && (
                  <motion.span
                    aria-hidden
                    className="pointer-events-none absolute inset-0 rounded-lg"
                    style={{ boxShadow: `0 0 0 1px ${s.color}80` }}
                    animate={{ opacity: [0.2, 0.7, 0.2], scale: [1, 1.18, 1] }}
                    transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut", delay: i * 0.35 }}
                  />
                )}
                <s.icon className="relative h-3.5 w-3.5" strokeWidth={1.5} />
              </span>
              <span
                className="font-display text-[10px] font-semibold tracking-[0.25em]"
                style={{ color: s.color }}
              >
                {s.n}
              </span>
            </div>
            <h3 className="relative mt-1 font-display text-[12px] font-semibold leading-tight text-fg">
              {s.title}
            </h3>
          </div>
        </div>
      ))}

      {/* status chip */}
      <div className="pointer-events-none absolute bottom-2 left-1/2 flex -translate-x-1/2 items-center gap-1.5 rounded-full border border-fg/10 bg-fg/[0.05] px-3 py-1 text-[10px] font-medium text-fg/70 backdrop-blur-sm">
        <span className="h-1.5 w-1.5 animate-pulseGlow rounded-full bg-[#7bd3cf]" />
      </div>
    </div>
  );
}
