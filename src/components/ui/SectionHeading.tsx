import Reveal from "./Reveal";

export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
}: {
  eyebrow: string;
  title: React.ReactNode;
  subtitle?: string;
  align?: "center" | "left";
}) {
  return (
    <Reveal
      className={
        align === "center"
          ? "mx-auto max-w-5xl text-center"
          : "max-w-5xl text-left"
      }
    >
      <span className="eyebrow">
        <span className="h-1.5 w-1.5 rounded-full bg-neon-cyan animate-pulseGlow" />
        {eyebrow}
      </span>
      <h2 className="font-display text-xl font-bold leading-[1.12] tracking-[-0.02em] sm:text-2xl md:text-3xl lg:text-4xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-sm leading-relaxed text-fg/70 sm:text-base md:text-lg">
          {subtitle}
        </p>
      )}
    </Reveal>
  );
}
