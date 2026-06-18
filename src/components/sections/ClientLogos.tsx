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
      // Increased the gap slightly more to accommodate the larger logo sizes
      className="flex shrink-0 items-center gap-12 md:gap-16 pr-12 md:pr-16"
    >
      {LOGOS.map((logo) => (
        <li key={logo.file} className="flex items-center justify-center">
          <img
            src={`/logos/${logo.file}`}
            alt={`${logo.name} logo`}
            loading="lazy"
            // Increased height to h-16 (mobile) and h-20 (desktop) to make them bigger. 
            // object-contain ensures the raw aspect ratio is preserved without cutting.
            className="h-16 md:h-20 w-auto object-contain transition-transform duration-300 hover:-translate-y-0.5"
          />
        </li>
      ))}
    </ul>
  );
}

export default function ClientLogos() {
  return (
    <div className="relative z-10 w-full border-t border-fg/10 bg-fg/[0.02] py-8 backdrop-blur-sm">
      <p className="mb-5 text-center text-xl font-large uppercase tracking-[0.25em] text-fg/40">
        Our Happy Clients
      </p>
      <div className="group mask-fade-x relative overflow-hidden">
        <div className="flex w-max animate-marquee group-hover:[animation-play-state:paused]">
          <LogoRow />
          <LogoRow ariaHidden />
        </div>
      </div>
    </div>
  );
}
