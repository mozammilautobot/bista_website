const COLUMNS = [
  {
    title: "Solutions",
    links: ["AI Powered Products","Document Processing", "Agentic AI", "Process Automation", "Excel Automation"],
  },
  {
    title: "Company",
    links: ["About", "Case Studies", "Insights", "Careers"],
  },
  {
    title: "Resources",
    links: ["Documentation", "ROI Calculator", "Security", "Contact"],
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-fg/10 bg-sunken">
      <div className="mx-auto grid w-full max-w-7xl gap-10 px-5 py-16 sm:px-8 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-2.5">
            <img src="/Bista.png" alt="Bista AI logo" className="h-9 w-9 object-contain" />
            <span className="font-display text-[30px] font-bold">
              Bista <span className="text-neon-cyan">AI</span>
            </span>
          </div>
          <p className="mt-4 max-w-xs text-sm text-fg/50">
            Autonomous AI agents, Intelligent Document Processing, and workflow
            automation for modern enterprises.
          </p>
          <a href="https://calendly.com/mozammilrizwan/agentic-automation" className="btn-primary mt-6 inline-flex px-5 py-2.5">
            Book a Demo
          </a>
        </div>

        {COLUMNS.map((col) => (
          <div key={col.title}>
            <h4 className="font-display text-sm font-semibold text-fg">{col.title}</h4>
            <ul className="mt-4 space-y-3">
              {col.links.map((l) => (
                <li key={l}>
                  <a href="#" className="text-sm text-fg/50 transition-colors hover:text-neon-cyan">
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-fg/5">
        <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-3 px-5 py-6 text-xs text-fg/40 sm:flex-row sm:px-8">
          <span>© {new Date().getFullYear()} Bista AI. All rights reserved.</span>
          <div className="flex gap-5">
            <a href="#" className="hover:text-fg/70">Privacy</a>
            <a href="#" className="hover:text-fg/70">Terms</a>
            <a href="#" className="hover:text-fg/70">Security</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
