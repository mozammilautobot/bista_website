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
      <h2 className="font-display text-2xl font-bold leading-[1.12] tracking-[-0.02em] sm:text-3xl md:text-4xl lg:text-[2.5rem]">
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
