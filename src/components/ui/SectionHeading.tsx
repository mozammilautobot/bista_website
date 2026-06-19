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
          ? "mx-auto max-w-4xl text-center"
          : "max-w-4xl text-left"
      }
    >
      <span className="eyebrow">
        <span className="h-1.5 w-1.5 rounded-full bg-neon-cyan animate-pulseGlow" />
        {eyebrow}
      </span>
      <h2 className="font-display text-3xl font-bold leading-[1.08] tracking-[-0.02em] sm:text-4xl md:text-5xl lg:text-[3.25rem]">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-5 text-base leading-relaxed text-fg/70 sm:text-lg md:text-xl">
          {subtitle}
        </p>
      )}
    </Reveal>
  );
}
