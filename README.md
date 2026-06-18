# Bista AI — Marketing Website

A futuristic, conversion-focused single-page site for an AI & Automation company, centered around **Bista Doc AI + AI Agents + Enterprise Automation**.

Built with **Next.js 14 (App Router)**, **TypeScript**, **Tailwind CSS**, and **Framer Motion**. All animations use CSS / Canvas / SVG / Framer Motion (no Three.js) for fast loads on every device.

## Highlights

- **Hero** with animated particle-network background, orbiting agent ring, animated stats counters, and clear CTAs.
- **AI Agent Showcase** with interactive hover cards and an animated agent-to-agent communication mesh.
- **Solutions** — business-problem framed cards.
- **Bista Doc AI live demo** — click *Process sample invoice* to watch a document get scanned and structured data extracted in real time.
- **How It Works** timeline, **Industries**, **Why Choose Us**, **Case Studies** with animated charts.
- **Technology stack** with glowing chips.
- **Interactive ROI Calculator** (₹) that updates live as you drag the sliders.
- **AI Innovation** section with an animated globe + holographic live-throughput dashboard.
- **Testimonials** (logo marquee + before/after metrics), **Blog/Insights**, and a **Final CTA** with a working demo-request form.

## Getting started

```bash
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

## Build for production

```bash
npm run build
npm start
```

## Project structure

```
src/
  app/
    layout.tsx        # root layout + metadata
    page.tsx          # composes all sections
    globals.css       # design system (glass, gradients, animations)
  components/
    Navbar.tsx
    Footer.tsx
    ui/               # shared primitives (NetworkBackground, Reveal, Counter, ...)
    sections/         # all 14 page sections
tailwind.config.ts    # theme tokens, keyframes, animations
```

## Customizing

- **Colors & glow**: `tailwind.config.ts` (`ink`, `neon` palettes, shadows).
- **Copy / data**: each section keeps its content in a local array at the top of the file.
- **Fonts**: loaded via Google Fonts `@import` in `globals.css` (Inter + Space Grotesk).
