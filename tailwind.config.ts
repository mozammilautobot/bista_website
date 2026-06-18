import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Theme-aware foreground (flips between light/dark). Supports opacity,
        // e.g. text-fg/60, border-fg/10, bg-fg/[0.04].
        fg: "rgb(var(--fg) / <alpha-value>)",
        // Page background + sunken surface (e.g. footer).
        canvas: "rgb(var(--bg) / <alpha-value>)",
        sunken: "rgb(var(--sunken) / <alpha-value>)",
        ink: {
          950: "#02030a",
          900: "#050816",
          800: "#0a0f2c",
          700: "#111634",
        },
        neon: {
          DEFAULT: "#38bdf8",
          cyan: "#22d3ee",
          blue: "#4f7cff",
          violet: "#8b5cf6",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "var(--font-sans)", "sans-serif"],
      },
      boxShadow: {
        glow: "0 0 40px -10px rgba(56,189,248,0.55)",
        "glow-violet": "0 0 40px -8px rgba(139,92,246,0.55)",
      },
      backgroundImage: {
        "grid-faint":
          "linear-gradient(to right, var(--grid-line) 1px, transparent 1px), linear-gradient(to bottom, var(--grid-line) 1px, transparent 1px)",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "200% 0" },
          "100%": { backgroundPosition: "-200% 0" },
        },
        pulseGlow: {
          "0%, 100%": { opacity: "0.6" },
          "50%": { opacity: "1" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        spinSlow: {
          to: { transform: "rotate(360deg)" },
        },
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        shimmer: "shimmer 3s linear infinite",
        pulseGlow: "pulseGlow 3s ease-in-out infinite",
        marquee: "marquee 30s linear infinite",
        spinSlow: "spinSlow 28s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
