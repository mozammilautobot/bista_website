import Reveal from "./Reveal";

export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
  tone = "light",
}: {
  eyebrow: string;
  title: React.ReactNode;
  subtitle?: string;
  align?: "center" | "left";
  tone?: "light" | "dark";
}) {
  return (
    <Reveal
      className={
        align === "center"
          ? "mx-auto w-full max-w-6xl text-center"
          : "w-full max-w-6xl text-left"
      }
    >
      <span className="eyebrow">
        <span className="h-1.5 w-1.5 rounded-full bg-neon-cyan animate-pulseGlow" />
        {eyebrow}
      </span>
      <h2 className="font-display text-[1.85rem] font-medium leading-[1.08] tracking-[-0.03em] xs:text-[2.1rem] sm:text-4xl md:text-[2.5rem] lg:text-[2.6rem] xl:whitespace-nowrap">
        {title}
      </h2>
      {subtitle && (
        <p
          className={`mt-5 max-w-2xl text-base leading-relaxed sm:text-lg ${
            tone === "dark" ? "text-white/60" : "text-fg/60"
          } ${align === "center" ? "mx-auto" : ""}`}
        >
          {subtitle}
        </p>
      )}
    </Reveal>
  );
}
