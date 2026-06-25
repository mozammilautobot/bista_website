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
        // phenom.com indigo ramp. Names kept (cyan/blue/violet) so existing
        // utility usages across sections re-skin to indigo without per-file edits.
        neon: {
          DEFAULT: "#4543d9",
          cyan: "#4543d9", // primary indigo (accent dots, suffixes, eyebrow)
          blue: "#1f2aac", // deep indigo (gradient end, links, hover)
          violet: "#7172da", // light indigo secondary
        },
        brand: {
          DEFAULT: "#4543d9",
          50: "#eef0fc",
          100: "#ceddfb",
          400: "#7172da",
          500: "#4543d9",
          600: "#2f2fc4",
          700: "#1f2aac",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "var(--font-sans)", "sans-serif"],
      },
      boxShadow: {
        glow: "0 0 40px -10px rgba(69,67,217,0.5)",
        "glow-violet": "0 0 40px -8px rgba(113,114,218,0.5)",
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
