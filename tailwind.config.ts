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
      screens: {
        xs: "475px",
        "3xl": "1920px",
      },
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
        // Sprouts.ai-style green ramp. Names kept (cyan/blue/violet) so existing
        // utility usages across sections re-skin to green without per-file edits.
        neon: {
          DEFAULT: "#22c55e",
          cyan: "#22c55e", // primary vivid green (accent dots, suffixes, eyebrow)
          blue: "#16a34a", // deeper green (gradient end, links)
          violet: "#10b981", // emerald/teal secondary
        },
        brand: {
          DEFAULT: "#16a34a",
          50: "#f0fdf4",
          100: "#dcfce7",
          400: "#4ade80",
          500: "#22c55e",
          600: "#16a34a",
          700: "#15803d",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "var(--font-sans)", "sans-serif"],
      },
      boxShadow: {
        glow: "0 0 40px -10px rgba(34,197,94,0.5)",
        "glow-violet": "0 0 40px -8px rgba(16,185,129,0.5)",
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
