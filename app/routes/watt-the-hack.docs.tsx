import { NavLink, Outlet } from "react-router";

const BACKDROP_URL =
  "https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/watt-the-hack%2FChatGPT%20Image%20May%2021%2C%202026%2C%2010_33_57%20PM%20(1).png?alt=media&token=d14521c8-c549-434c-bb27-643ab95189ad";

const DOCS_SECTIONS: { to: string; label: string; end?: boolean }[] = [
  { to: "/watt-the-hack/docs", label: "Overview", end: true },
  { to: "/watt-the-hack/docs/base44-pitching", label: "Base44 Pitching" },
  { to: "/watt-the-hack/docs/grid-guardian", label: "Grid Guardian" },
  { to: "/watt-the-hack/docs/smart-home", label: "Smart Home" },
];

export default function DocsLayout() {
  return (
    <div
      className="relative min-h-full"
      style={{
        backgroundImage: `url("${BACKDROP_URL}")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="min-h-full bg-canvas/70 backdrop-blur-md">
        <div className="mx-auto w-full max-w-5xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
          <nav className="mb-6 flex flex-wrap items-center gap-1.5 rounded-2xl border border-line/70 bg-surface/90 p-2 shadow-sm backdrop-blur">
            <span className="px-2 text-[10px] font-bold uppercase tracking-[0.14em] text-muted">Docs</span>
            {DOCS_SECTIONS.map((section) => (
              <NavLink
                key={section.to}
                to={section.to}
                end={section.end}
                className={({ isActive }) =>
                  `rounded-xl px-3.5 py-2 text-sm font-semibold transition-colors ${
                    isActive
                      ? "bg-emerald-600 text-white shadow-sm"
                      : "text-muted hover:bg-subtle hover:text-ink"
                  }`
                }
              >
                {section.label}
              </NavLink>
            ))}
          </nav>
          <Outlet />
        </div>
      </div>
    </div>
  );
}
