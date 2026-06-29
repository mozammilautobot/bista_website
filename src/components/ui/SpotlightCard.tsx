"use client";

import {
  useCallback,
  useRef,
  useState,
  type CSSProperties,
  type MouseEvent,
} from "react";
import { useReducedMotion } from "framer-motion";

/**
 * Cursor-following "spotlight + 3D tilt" hover effect, shared across every card
 * so the interaction feels consistent and premium.
 *
 * `useSpotlight` does everything from a single mousemove handler, writing to
 * CSS custom properties on the host element WITHOUT re-rendering per move:
 *   --mx / --my : pointer position (for the radial glow + border highlight)
 *   --rx / --ry : the 3D tilt angles derived from the pointer vs. card center
 *   --lift      : the hover-lift translateY (folded into the tilt transform)
 *
 * The host element gets a compound transform applied via `spotlightProps.style`:
 *   perspective(...) rotateX(--rx) rotateY(--ry) translateY(--lift)
 * `perspective()` lives inside the transform so no extra wrapper element is
 * needed. A single re-render happens on enter/leave to fade the glow and to
 * swap the transition (snappy while following, smooth easing back on leave).
 *
 * Composition: the lift that used to be a framer-motion `whileHover={{ y }}` is
 * now folded into this transform (so the card no longer needs to be a motion
 * element for the lift). Independent animations — image `group-hover:scale`,
 * marquee track translateX, entrance reveals on a parent wrapper, inner
 * motion.* elements — all still compose because they live on other elements.
 *
 * Respects `prefers-reduced-motion`: tilt + follow + glow are all disabled.
 */
export function useSpotlight<T extends HTMLElement = HTMLElement>({
  maxTilt = 7,
  lift = 6,
  perspective = 900,
}: { maxTilt?: number; lift?: number; perspective?: number } = {}) {
  const ref = useRef<T>(null);
  const [active, setActive] = useState(false);
  const reduce = useReducedMotion();

  const onMouseMove = useCallback(
    (e: MouseEvent<T>) => {
      if (reduce) return;
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      // Normalised 0..1 position inside the card.
      const px = x / rect.width;
      const py = y / rect.height;
      el.style.setProperty("--mx", `${x}px`);
      el.style.setProperty("--my", `${y}px`);
      // Top → tilt back (positive rotateX), bottom → tilt forward.
      el.style.setProperty("--rx", `${(0.5 - py) * 2 * maxTilt}deg`);
      el.style.setProperty("--ry", `${(px - 0.5) * 2 * maxTilt}deg`);
    },
    [reduce, maxTilt],
  );

  const onMouseEnter = useCallback(() => {
    if (reduce) return;
    const el = ref.current;
    if (el) el.style.setProperty("--lift", `-${lift}px`);
    setActive(true);
  }, [reduce, lift]);

  const onMouseLeave = useCallback(() => {
    const el = ref.current;
    if (el) {
      // Ease everything back to neutral.
      el.style.setProperty("--rx", "0deg");
      el.style.setProperty("--ry", "0deg");
      el.style.setProperty("--lift", "0px");
    }
    setActive(false);
  }, []);

  const style: CSSProperties = {
    transform: `perspective(${perspective}px) rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg)) translateY(var(--lift, 0px))`,
    transformStyle: "preserve-3d",
    transition: active
      ? "transform 0.12s ease-out, box-shadow 0.3s ease, border-color 0.3s ease"
      : "transform 0.5s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.3s ease, border-color 0.3s ease",
    willChange: "transform",
  };

  return {
    ref,
    active: reduce ? false : active,
    spotlightProps: { ref, onMouseMove, onMouseEnter, onMouseLeave, style },
  };
}

/**
 * The cursor-following colour glow was removed per design feedback — only the
 * subtle 3D tilt (from `useSpotlight`) remains. Kept as a no-op so existing call
 * sites (`<SpotlightOverlay active={...} />`) stay valid without churn.
 */
export function SpotlightOverlay(_props: {
  active: boolean;
  className?: string;
}) {
  return null;
}

/**
 * Convenience wrapper for plain (non-framer-motion) cards. Renders a relative,
 * rounded host with the spotlight + tilt baked in. For cards that already have
 * their own markup, prefer the `useSpotlight` hook + `<SpotlightOverlay />`.
 */
export default function SpotlightCard({
  children,
  className = "",
  maxTilt,
  lift,
}: {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number;
  lift?: number;
}) {
  const sp = useSpotlight<HTMLDivElement>({ maxTilt, lift });
  return (
    <div {...sp.spotlightProps} className={`relative ${className}`}>
      {children}
      <SpotlightOverlay active={sp.active} />
    </div>
  );
}
