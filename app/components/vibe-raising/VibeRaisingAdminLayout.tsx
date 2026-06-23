import { useState, type ReactNode } from "react";
import { Form, NavLink } from "react-router";
import {
  ArrowLeftOnRectangleIcon,
  CheckCircleIcon,
  DocumentTextIcon,
  Squares2X2Icon,
} from "@heroicons/react/24/outline";
import type { User } from "~/types/user";
import { generateAvatarUrl, getInitials } from "~/lib/avatar";

const ADMIN_NAVIGATION = [
  { name: "Overview", href: "/founder-tools/admin", icon: Squares2X2Icon, exact: true },
  { name: "Updates", href: "/founder-tools/admin/updates", icon: DocumentTextIcon },
  { name: "Review", href: "/founder-tools/admin/review", icon: CheckCircleIcon, badge: "review" },
];

function classNames(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function AdminLogo({ compact = false, tone = "light" }: { compact?: boolean; tone?: "light" | "dark" }) {
  const isDark = tone === "dark";
  return (
    <div className="min-w-0 leading-none">
      <p className={classNames("[font-family:var(--vr-font-title)] font-black uppercase tracking-normal", compact ? "text-2xl" : "text-4xl", isDark ? "text-slate-950" : "text-white")}>
        MLAI
      </p>
      {!compact ? (
        <p className="mt-1 truncate [font-family:var(--vr-font-title)] text-sm font-black uppercase tracking-normal text-[var(--vr-palette-mint)]">
          Vibe Raising
        </p>
      ) : null}
    </div>
  );
}

export default function VibeRaisingAdminLayout({
  children,
  user,
  reviewCount,
}: {
  children: ReactNode;
  user: User;
  reviewCount: number;
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const avatarUrl = user.avatar_url || generateAvatarUrl(getInitials(user.full_name || "Admin"));
  const fullName = user.full_name || "Admin User";

  return (
    <div className="vr-scope min-h-screen bg-[var(--vr-palette-warm-white)] [font-family:var(--vr-font-body)] text-slate-950">
      <aside
        className={classNames(
          "fixed inset-y-0 left-0 z-40 hidden flex-col bg-[var(--vr-palette-black)] px-4 py-8 text-white shadow-2xl shadow-black/20 transition-all duration-300 ease-in-out lg:flex",
          isExpanded ? "w-64" : "w-20",
        )}
        onMouseEnter={() => setIsExpanded(true)}
        onMouseLeave={() => setIsExpanded(false)}
      >
        <div className={classNames("flex items-center", isExpanded ? "min-h-16 justify-start px-1" : "h-12 justify-center overflow-hidden")}>
          <AdminLogo compact={!isExpanded} />
        </div>

        <nav className="mt-10 flex flex-1 flex-col gap-2">
          {ADMIN_NAVIGATION.map((item) => (
            <NavLink
              key={item.name}
              to={item.href}
              end={item.exact}
              title={isExpanded ? undefined : item.name}
              aria-label={isExpanded ? undefined : item.name}
              className={({ isActive }) => classNames(
                "group flex min-h-12 items-center overflow-hidden rounded-lg px-3 py-3 text-sm font-extrabold transition",
                isExpanded ? "justify-start" : "justify-center",
                isActive
                  ? "bg-[var(--vr-palette-mint)] text-[var(--vr-palette-black)] shadow-lg shadow-[rgba(0,255,215,0.18)]"
                  : "text-white/82 hover:bg-white/10 hover:text-white",
              )}
            >
              <item.icon className="h-5 w-5 flex-shrink-0" />
              <span className={classNames("whitespace-nowrap transition-all duration-200", isExpanded ? "ml-3 w-auto opacity-100" : "ml-0 w-0 opacity-0")}>{item.name}</span>
              {item.badge === "review" && reviewCount > 0 ? (
                <span className={classNames(
                  "ml-auto rounded-full bg-[rgba(0,255,215,0.16)] px-2 py-1 text-xs font-black text-[var(--vr-palette-mint)] ring-1 ring-[rgba(0,255,215,0.22)] transition-opacity duration-200",
                  isExpanded ? "opacity-100" : "hidden opacity-0",
                )}>
                  {reviewCount}
                </span>
              ) : null}
            </NavLink>
          ))}
        </nav>

        <Form action="/founder-tools/logout" method="post">
          <button
            className={classNames(
              "flex min-h-12 w-full items-center overflow-hidden rounded-lg px-3 py-3 text-sm font-bold text-white/82 transition hover:bg-white/10 hover:text-white",
              isExpanded ? "justify-start" : "justify-center",
            )}
            type="submit"
            title={isExpanded ? undefined : "Log out"}
            aria-label={isExpanded ? undefined : "Log out"}
          >
            <ArrowLeftOnRectangleIcon className="h-5 w-5 flex-shrink-0" />
            <span className={classNames("whitespace-nowrap transition-all duration-200", isExpanded ? "ml-3 w-auto opacity-100" : "ml-0 w-0 opacity-0")}>Log out</span>
          </button>
        </Form>
      </aside>

      <div className={classNames("transition-all duration-300 ease-in-out lg:pl-20", isExpanded && "lg:pl-64")}>
        <header className="sticky top-0 z-30 border-b border-black/5 bg-white/92 px-4 py-4 shadow-sm backdrop-blur sm:px-6 lg:px-10">
          <div className="flex items-center justify-between gap-4">
            <div className="lg:hidden">
              <AdminLogo tone="dark" />
            </div>
            <div className="hidden lg:block" aria-hidden="true" />
            <div className="ml-auto flex min-w-0 items-center gap-3">
              <img src={avatarUrl} alt="" className="h-10 w-10 rounded-full object-cover ring-1 ring-black/10" />
              <div className="min-w-0">
                <p className="truncate text-sm font-black text-slate-950">{fullName}</p>
                <p className="truncate text-xs font-medium text-slate-500">Platform Admin</p>
              </div>
            </div>
          </div>

          <nav className="mt-4 flex gap-2 overflow-x-auto pb-1 lg:hidden" aria-label="Admin navigation">
            {ADMIN_NAVIGATION.map((item) => (
              <NavLink
                key={item.name}
                to={item.href}
                end={item.exact}
                className={({ isActive }) => classNames(
                  "inline-flex flex-shrink-0 items-center gap-2 rounded-lg px-3 py-2 text-sm font-extrabold ring-1 transition",
                  isActive
                    ? "bg-[var(--vr-palette-mint)] text-[var(--vr-palette-black)] ring-transparent"
                    : "bg-white text-slate-700 ring-slate-200",
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.name}
                {item.badge === "review" && reviewCount > 0 ? <span className="rounded-full bg-white/70 px-1.5 text-xs">{reviewCount}</span> : null}
              </NavLink>
            ))}
          </nav>
        </header>

        <main className="px-4 py-8 sm:px-6 lg:px-10">
          {children}
        </main>
      </div>
    </div>
  );
}