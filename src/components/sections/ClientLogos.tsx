const LOGOS: { file: string; name: string }[] = [
  { file: "Aabaco.jpg", name: "Aabaco" },
  { file: "Bookpal.png", name: "BookPal" },
  { file: "Branch.jpg", name: "Branch" },
  { file: "Dectris.png", name: "Dectris" },
  { file: "Firearms.jpg", name: "Firearms" },
  { file: "FluentBio.jpg", name: "Fluent BioSciences" },
  { file: "Flybar.png", name: "Flybar" },
  { file: "FRC.jpg", name: "FRC" },
  { file: "HarvestValley.png", name: "Harvest Valley" },
  { file: "Innofoods.png", name: "Innofoods" },
  { file: "Leadway.png", name: "Leadway" },
  { file: "LunadaBaytiles.jpg", name: "Lunada Bay Tiles" },
  { file: "MOL.png", name: "MOL" },
  { file: "OTBB.png", name: "OTBB" },
  { file: "pcp.png", name: "PCP" },
  { file: "PointSpring.jpg", name: "Point Spring" },
  { file: "QuickMinerals.jpg", name: "Quick Minerals" },
  { file: "RVLBrands.png", name: "RVL Brands" },
  { file: "Sepro.jpg", name: "Sepro" },
  { file: "SND.png", name: "SND" },
  { file: "Viaphoton.png", name: "Viaphoton" },
  { file: "ZBS.jpg", name: "ZBS" },
];

function LogoRow({ ariaHidden = false }: { ariaHidden?: boolean }) {
  return (
    <ul
      aria-hidden={ariaHidden || undefined}
      className="flex shrink-0 items-center gap-5 pr-5 md:gap-6 md:pr-6"
    >
      {LOGOS.map((logo) => (
        <li key={logo.file} className="flex items-center justify-center">
          {/* Uniform white chip neutralizes the varied screenshot backgrounds so
              every logo sits on one clean, consistent surface. */}
          <div className="group/chip flex h-16 w-36 items-center justify-center rounded-2xl bg-white px-5 shadow-sm ring-1 ring-black/[0.06] transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-md hover:ring-neon-cyan/30 md:h-20 md:w-44">
            <img
              src={`/logos/${logo.file}`}
              alt={`${logo.name} logo`}
              loading="lazy"
              className="max-h-10 w-auto object-contain opacity-95 transition-all duration-300 ease-out group-hover/chip:scale-105 group-hover/chip:opacity-100 md:max-h-12"
            />
          </div>
        </li>
      ))}
    </ul>
  );
}

export default function ClientLogos() {
  return (
    <div className="relative z-10 w-full border-t border-fg/10 bg-fg/[0.02] py-8 backdrop-blur-sm">
      <p className="mb-5 text-center text-xm font-large uppercase tracking-[0.25em] text-fg/40">
        Trusted by leading brands across industries
      </p>
      <div className="group mask-fade-x relative overflow-hidden">
        <div
          className="flex w-max animate-marquee group-hover:[animation-play-state:paused]"
          style={{ animationDuration: "30s" }}
        >
          <LogoRow />
          <LogoRow ariaHidden />
        </div>
      </div>
    </div>
  );
}
