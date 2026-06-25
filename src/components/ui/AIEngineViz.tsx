"use client";

import { motion, useReducedMotion } from "framer-motion";

const VW = 400;
const VH = 500;
const CORE = { x: 200, y: 212 };

type Flow = { id: string; d: string; color: string };

const INPUTS: Flow[] = [
  { id: "in1", d: "M -10 92 C 64 92, 108 150, 156 192", color: "#ff8045" },
  { id: "in2", d: "M -10 200 C 60 200, 110 204, 156 210", color: "#7bd3cf" },
  { id: "in3", d: "M -10 308 C 66 308, 112 270, 158 230", color: "#ab9cee" },
];

const OUTPUTS: Flow[] = [
  { id: "out1", d: "M 244 192 C 300 146, 332 116, 410 100", color: "#ffbd45" },
  { id: "out2", d: "M 244 210 C 322 210, 352 206, 410 198", color: "#7172da" },
  { id: "out3", d: "M 244 230 C 300 280, 332 308, 410 320", color: "#7bd3cf" },
];

const STEPS = [
  { x: 78, color: "#ff8045" },
  { x: 158, color: "#7bd3cf" },
  { x: 242, color: "#ab9cee" },
  { x: 322, color: "#ffbd45" },
];
const STEP_Y = 392;

const PARTICLES = [
  { x: 16, y: 16, s: 5, color: "#ffbd45", delay: 0 },
  { x: 84, y: 12, s: 4, color: "#7bd3cf", delay: 0.8 },
  { x: 90, y: 58, s: 6, color: "#ab9cee", delay: 1.6 },
  { x: 8, y: 52, s: 4, color: "#ff8045", delay: 0.4 },
  { x: 50, y: 6, s: 4, color: "#7172da", delay: 1.2 },
  { x: 78, y: 86, s: 5, color: "#7bd3cf", delay: 2.0 },
];

const hexPoints = (cx: number, cy: number, r: number) =>
  Array.from({ length: 6 }, (_, i) => {
    const a = (Math.PI / 3) * i;
    return `${(cx + r * Math.cos(a)).toFixed(1)},${(cy + r * Math.sin(a)).toFixed(1)}`;
  }).join(" ");

export default function AIEngineViz() {
  const reduced = useReducedMotion();
  const spin = (dur: number, dir: 1 | -1) =>
    reduced
      ? undefined
      : ({
          animate: { rotate: 360 * dir },
          transition: { duration: dur, repeat: Infinity, ease: "linear" as const },
          style: { transformBox: "fill-box" as const, transformOrigin: "center" as const },
        } as const);

  return (
    <div className="relative aspect-[4/5] w-full select-none overflow-hidden bg-gradient-to-br from-[#0a0f2c] via-[#111634] to-[#1f2aac]">
      <div
        aria-hidden
        className="pointer-events-none absolute -left-16 top-8 h-56 w-56 rounded-full blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(113,114,218,0.45), transparent 70%)" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-16 bottom-6 h-56 w-56 rounded-full blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(123,211,207,0.4), transparent 70%)" }}
      />

      {PARTICLES.map((p, i) => (
        <motion.span
          key={`sp-${i}`}
          aria-hidden
          className="pointer-events-none absolute rounded-full"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.s,
            height: p.s,
            background: p.color,
            boxShadow: `0 0 10px 2px ${p.color}aa`,
          }}
          animate={reduced ? undefined : { y: [0, -14, 0], opacity: [0.3, 0.9, 0.3] }}
          transition={{ duration: 5 + i, repeat: Infinity, ease: "easeInOut", delay: p.delay }}
        />
      ))}

      <svg className="absolute inset-0 h-full w-full" viewBox={`0 0 ${VW} ${VH}`} fill="none" aria-hidden>
        <defs>
          <filter id="ae-glow" x="-150%" y="-150%" width="400%" height="400%">
            <feGaussianBlur stdDeviation="4" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="ae-core-glow" x="-150%" y="-150%" width="400%" height="400%">
            <feGaussianBlur stdDeviation="10" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <radialGradient id="ae-core-fill" cx="50%" cy="42%" r="65%">
            <stop offset="0%" stopColor="#ab9cee" />
            <stop offset="55%" stopColor="#4543d9" />
            <stop offset="100%" stopColor="#1f2aac" />
          </radialGradient>
          <linearGradient id="ae-rail" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#7172da" />
            <stop offset="100%" stopColor="#7bd3cf" />
          </linearGradient>
          <linearGradient id="ae-meter" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#4543d9" />
            <stop offset="55%" stopColor="#7172da" />
            <stop offset="100%" stopColor="#7bd3cf" />
          </linearGradient>
        </defs>

        {/* input + output rails */}
        {[...INPUTS, ...OUTPUTS].map((f) => (
          <path
            key={`rail-${f.id}`}
            id={`ae-${f.id}`}
            d={f.d}
            stroke="url(#ae-rail)"
            strokeWidth={1.6}
            strokeLinecap="round"
            opacity={0.3}
          />
        ))}

        {/* circuit trace running along each rail */}
        {!reduced &&
          [...INPUTS, ...OUTPUTS].map((f, i) => (
            <path
              key={`trace-${f.id}`}
              d={f.d}
              stroke={f.color}
              strokeWidth={2}
              strokeLinecap="round"
              fill="none"
              pathLength={1}
              strokeDasharray="0.3 0.7"
            >
              <animate
                attributeName="stroke-dashoffset"
                from="1"
                to="0"
                dur="2.8s"
                begin={`${i * 0.3}s`}
                repeatCount="indefinite"
              />
              <animate
                attributeName="opacity"
                values="0;0.8;0"
                dur="2.8s"
                begin={`${i * 0.3}s`}
                repeatCount="indefinite"
              />
            </path>
          ))}

        {/* raw work tokens streaming IN (squares) */}
        {INPUTS.map((f, i) =>
          reduced ? (
            <rect key={`tin-${f.id}`} x={-4} y={f.id === "in1" ? 88 : f.id === "in2" ? 196 : 304} width={8} height={8} rx={2} fill={f.color} />
          ) : (
            <g key={`tin-${f.id}`} filter="url(#ae-glow)">
              <rect x={-4} y={-4} width={8} height={8} rx={2} fill={f.color} stroke="#ffffff" strokeWidth={0.6}>
                <animateMotion dur={`${3 + i * 0.5}s`} begin={`${i * 0.6}s`} repeatCount="indefinite" rotate="auto" keyPoints="0;1" keyTimes="0;1" calcMode="spline" keySplines="0.4 0 0.3 1">
                  <mpath href={`#ae-${f.id}`} />
                </animateMotion>
                <animate attributeName="opacity" dur={`${3 + i * 0.5}s`} begin={`${i * 0.6}s`} repeatCount="indefinite" values="0;1;1;0" keyTimes="0;0.12;0.78;1" />
              </rect>
            </g>
          )
        )}

        {/* automated outputs streaming OUT (diamonds/dots) */}
        {OUTPUTS.map((f, i) =>
          reduced ? (
            <circle key={`tout-${f.id}`} cx={406} cy={f.id === "out1" ? 100 : f.id === "out2" ? 198 : 320} r={4} fill={f.color} />
          ) : (
            <g key={`tout-${f.id}`} filter="url(#ae-glow)">
              <circle r={4.4} fill={f.color} opacity={0.45} />
              <circle r={2.4} fill="#ffffff" />
              <animateMotion dur={`${3.2 + i * 0.4}s`} begin={`${1.2 + i * 0.5}s`} repeatCount="indefinite" keyPoints="0;1" keyTimes="0;1" calcMode="spline" keySplines="0.4 0 0.3 1">
                <mpath href={`#ae-${f.id}`} />
              </animateMotion>
              <animate attributeName="opacity" dur={`${3.2 + i * 0.4}s`} begin={`${1.2 + i * 0.5}s`} repeatCount="indefinite" values="0;1;1;0" keyTimes="0;0.14;0.8;1" />
            </g>
          )
        )}

        {/* ENGINE CORE */}
        <g filter="url(#ae-core-glow)">
          {!reduced && (
            <circle cx={CORE.x} cy={CORE.y} r={66} fill="none" stroke="#7bd3cf" strokeWidth={1.4} opacity={0.5}>
              <animate attributeName="r" values="66;82;66" dur="4s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.5;0;0.5" dur="4s" repeatCount="indefinite" />
            </circle>
          )}

          {/* outer gear ring (slow CW) */}
          <motion.g {...spin(26, 1)}>
            <circle cx={CORE.x} cy={CORE.y} r={60} fill="none" stroke="#7172da" strokeWidth={7} strokeDasharray="5 11" opacity={0.7} />
          </motion.g>
          {/* inner gear ring (faster CCW) */}
          <motion.g {...spin(16, -1)}>
            <circle cx={CORE.x} cy={CORE.y} r={50} fill="none" stroke="#7bd3cf" strokeWidth={5} strokeDasharray="4 9" opacity={0.6} />
          </motion.g>

          {/* hex chip plate */}
          <polygon points={hexPoints(CORE.x, CORE.y, 40)} fill="url(#ae-core-fill)" stroke="#ffffff" strokeWidth={1} opacity={0.96}>
            {!reduced && <animate attributeName="opacity" values="0.85;1;0.85" dur="3s" repeatCount="indefinite" />}
          </polygon>

          {/* chip pins */}
          {[-22, 0, 22].map((dx) => (
            <g key={`pin-${dx}`}>
              <rect x={CORE.x + dx - 2.5} y={CORE.y - 44} width={5} height={7} rx={1.5} fill="#7bd3cf" opacity={0.85} />
              <rect x={CORE.x + dx - 2.5} y={CORE.y + 37} width={5} height={7} rx={1.5} fill="#7bd3cf" opacity={0.85} />
            </g>
          ))}

          {/* inner processor glyph */}
          <g transform={`translate(${CORE.x} ${CORE.y})`} stroke="#ffffff" strokeWidth={1.4} strokeLinecap="round" fill="none" opacity={0.95}>
            <rect x={-13} y={-13} width={26} height={26} rx={5} />
            <rect x={-5} y={-5} width={10} height={10} rx={2} fill="#ffffff" opacity={0.9} stroke="none">
              {!reduced && <animate attributeName="opacity" values="0.55;1;0.55" dur="1.8s" repeatCount="indefinite" />}
            </rect>
            <path d="M -13 -5 L -19 -5 M -13 5 L -19 5 M 13 -5 L 19 -5 M 13 5 L 19 5" />
            <path d="M -5 -13 L -5 -19 M 5 -13 L 5 -19 M -5 13 L -5 19 M 5 13 L 5 19" />
          </g>
        </g>

        {/* WORKFLOW STEP PIPELINE */}
        <line x1={STEPS[0].x} y1={STEP_Y} x2={STEPS[STEPS.length - 1].x} y2={STEP_Y} stroke="#7172da" strokeWidth={2} opacity={0.35} strokeLinecap="round" />
        {STEPS.map((s, i) => (
          <g key={`step-${i}`}>
            <circle cx={s.x} cy={STEP_Y} r={11} fill={s.color} opacity={0.16} />
            <circle cx={s.x} cy={STEP_Y} r={6.5} fill={s.color} stroke="#ffffff" strokeWidth={0.8}>
              {!reduced && (
                <animate
                  attributeName="opacity"
                  values="0.4;1;0.4"
                  dur={`${STEPS.length * 0.7}s`}
                  begin={`${i * 0.7}s`}
                  repeatCount="indefinite"
                  keyTimes="0;0.18;1"
                />
              )}
            </circle>
          </g>
        ))}

        {/* THROUGHPUT METER */}
        <rect x={64} y={448} width={272} height={12} rx={6} fill="#ffffff" opacity={0.1} />
        <rect x={64} y={448} width={reduced ? 190 : 0} height={12} rx={6} fill="url(#ae-meter)">
          {!reduced && (
            <animate attributeName="width" values="0;272;272" keyTimes="0;0.82;1" dur="3.4s" repeatCount="indefinite" />
          )}
        </rect>
      </svg>

      {/* status chip */}
      <div className="pointer-events-none absolute bottom-3 left-1/2 flex -translate-x-1/2 items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-[11px] font-medium text-white/85 ring-1 ring-white/15 backdrop-blur-md">
        <span className="h-1.5 w-1.5 animate-pulseGlow rounded-full bg-neon-cyan" />
        automation engine · live
      </div>
    </div>
  );
}
