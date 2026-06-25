"use client";

import { useEffect, useRef, useState } from "react";

export default function Counter({
  to,
  duration = 1800,
  decimals = 0,
}: {
  to: number;
  duration?: number;
  decimals?: number;
}) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const [value, setValue] = useState(0);
  const doneRef = useRef(false);

  useEffect(() => {
    const node = ref.current;

    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
      doneRef.current = true;
      setValue(to);
      return;
    }

    let raf = 0;

    const run = () => {
      if (doneRef.current) return;
      cancelAnimationFrame(raf);
      const start = performance.now();
      const tick = (now: number) => {
        const p = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        if (p < 1) {
          setValue(to * eased);
          raf = requestAnimationFrame(tick);
        } else {
          setValue(to);
          doneRef.current = true;
        }
      };
      raf = requestAnimationFrame(tick);
    };

    if (!node || typeof IntersectionObserver === "undefined") {
      run();
      return () => cancelAnimationFrame(raf);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          run();
          observer.disconnect();
        }
      },
      { rootMargin: "60px" }
    );

    observer.observe(node);

    const fallback = window.setTimeout(() => {
      const rect = node.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight;
      if (rect.top < vh && rect.bottom > 0) {
        run();
        observer.disconnect();
      }
    }, 250);

    return () => {
      observer.disconnect();
      window.clearTimeout(fallback);
      cancelAnimationFrame(raf);
    };
  }, [to, duration]);

  return (
    <span ref={ref}>
      {value.toLocaleString("en-US", {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      })}
    </span>
  );
}
