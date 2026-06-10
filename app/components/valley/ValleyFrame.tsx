import { Link, useLocation } from "react-router";
import type { ReactNode } from "react";

type Props = {
  title?: string;
  back?: { href: string; label?: string };
  children: ReactNode;
  hideNav?: boolean;
  rightAction?: ReactNode;
};

export function ValleyFrame({ title, back, children, hideNav, rightAction }: Props) {
  const location = useLocation();
  const tab = location.pathname;

  return (
    <div className="min-h-screen w-full" style={{ background: "#f3eee4" }}>
      {/* Phone-frame on desktop, full-bleed on mobile */}
      <div className="mx-auto flex min-h-screen max-w-[440px] flex-col bg-[#f9f7f2] shadow-[0_10px_60px_-20px_rgba(11,11,11,0.18)] md:my-6 md:min-h-[calc(100vh-3rem)] md:rounded-[28px] md:border md:border-[#e6dfd0]">
        <header className="sticky top-0 z-10 flex items-center justify-between border-b border-[#ece5d4] bg-[#f9f7f2]/95 px-5 py-3 backdrop-blur md:rounded-t-[28px]">
          <div className="flex items-center gap-3 min-w-0">
            {back ? (
              <Link
                to={back.href}
                className="-ml-2 flex h-9 w-9 items-center justify-center rounded-full text-[#0b0b0b] hover:bg-[#ece5d4]"
                aria-label={back.label ?? "Back"}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
              </Link>
            ) : (
              <ValleyMark />
            )}
            <div className="min-w-0">
              <div className="truncate text-[15px] font-semibold tracking-tight text-[#0b0b0b]">
                {title ?? "Valley"}
              </div>
              {!back ? (
                <div className="text-[11px] uppercase tracking-[0.14em] text-[#727171]">
                  Founder workspace
                </div>
              ) : null}
            </div>
          </div>
          <div className="flex items-center gap-2">{rightAction}</div>
        </header>

        <main className="flex-1 px-5 pb-28 pt-5">{children}</main>

        {hideNav ? null : (
          <nav className="sticky bottom-0 z-10 grid grid-cols-3 border-t border-[#ece5d4] bg-[#f9f7f2]/95 backdrop-blur md:rounded-b-[28px]">
            <NavItem to="/valley" active={tab === "/valley"} label="Home" icon={<HomeIcon />} />
            <NavItem
              to="/valley/update/new"
              active={tab.startsWith("/valley/update")}
              label="Update"
              icon={<PlusIcon />}
              accent
            />
            <NavItem
              to="/valley/profile"
              active={tab === "/valley/profile"}
              label="Profile"
              icon={<UserIcon />}
            />
          </nav>
        )}
      </div>
    </div>
  );
}

function NavItem({
  to,
  active,
  label,
  icon,
  accent,
}: {
  to: string;
  active: boolean;
  label: string;
  icon: ReactNode;
  accent?: boolean;
}) {
  return (
    <Link
      to={to}
      className="flex flex-col items-center justify-center gap-1 py-3 text-[11px] tracking-wide"
      style={{ color: active ? "#008080" : "#727171" }}
    >
      <span
        className="flex h-9 w-9 items-center justify-center rounded-full"
        style={{
          background: accent
            ? active
              ? "#008080"
              : "#0b0b0b"
            : active
            ? "rgba(0,128,128,0.12)"
            : "transparent",
          color: accent ? "#f9f7f2" : "currentColor",
        }}
      >
        {icon}
      </span>
      <span>{label}</span>
    </Link>
  );
}

export function ValleyMark() {
  return (
    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#008080] text-[#f9f7f2]">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 6l8 14L20 6" />
      </svg>
    </div>
  );
}

function HomeIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 11l9-8 9 8" />
      <path d="M5 10v10a1 1 0 0 0 1 1h4v-6h4v6h4a1 1 0 0 0 1-1V10" />
    </svg>
  );
}
function PlusIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  );
}
function UserIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21c0-4 4-7 8-7s8 3 8 7" />
    </svg>
  );
}
