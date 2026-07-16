import type { Route } from "./+types/founder-tools.index";
import { Link, useLoaderData, useNavigate, useOutletContext, useRouteLoaderData } from "react-router";
import {
  ArrowRightIcon,
  BuildingOffice2Icon,
  ChartBarSquareIcon,
  CheckBadgeIcon,
  CircleStackIcon,
  DocumentTextIcon,
  GlobeAltIcon,
  IdentificationIcon,
  MapPinIcon,
  MegaphoneIcon,
  PencilSquareIcon,
} from "@heroicons/react/24/outline";

import { getEnv } from "~/lib/env.server";
import {
  getActiveVibeRaisingCompany,
  getVibeRaisingMonthlyUpdates,
} from "~/lib/vibe-raising";
import type { VibeRaisingCompany } from "~/types/vibe-raising";
import type { loader as founderToolsRootLoader } from "./vibe-raising-app";

function detailValue(value: string | null | undefined) {
  return String(value ?? "").trim() || "-";
}

function companyInitials(company: VibeRaisingCompany | null) {
  const name = company?.name ?? "Company";
  const parts = name.trim().split(/\s+/).filter(Boolean);
  return parts.slice(0, 2).map((part) => part[0]?.toUpperCase()).join("") || "CO";
}

export async function loader({ request, context }: Route.LoaderArgs) {
  const env = getEnv(context);
  let hasMonthlyUpdates = false;
  try {
    const monthlyUpdates = await getVibeRaisingMonthlyUpdates(env, request);
    hasMonthlyUpdates = monthlyUpdates.length > 0;
  } catch (error: any) {
    if (error?.response?.status !== 401) throw error;
  }

  return {
    hasMonthlyUpdates,
  };
}

export default function FounderToolsIndex() {
  const { hasMonthlyUpdates } = useLoaderData<typeof loader>();
  const rootData = useRouteLoaderData<typeof founderToolsRootLoader>("founder-tools-root");
  const user = rootData?.appUser;
  const navigate = useNavigate();
  const { triggerAnnouncement } = useOutletContext<{ triggerAnnouncement: (cb?: () => void) => void }>();
  if (!user) return null;
  const activeCompany = getActiveVibeRaisingCompany(user);
  const isVerifiedCompany = Boolean(activeCompany?.abrVerifiedAt && activeCompany?.acn);
  const details = [
    { label: "Website", value: detailValue(activeCompany?.domain), icon: GlobeAltIcon },
    { label: "Location", value: detailValue(activeCompany?.location), icon: MapPinIcon },
    { label: "ABN", value: detailValue(activeCompany?.abn), icon: IdentificationIcon },
    { label: "ACN", value: detailValue(activeCompany?.acn), icon: IdentificationIcon },
    {
      label: "Status",
      value: isVerifiedCompany
        ? "Verified registered company"
        : activeCompany?.registered
          ? "Set up"
          : "Incomplete",
      icon: CheckBadgeIcon,
    },
  ];
  const productLinks = [
    {
      label: "Vibe Raising",
      href: "/founder-tools/updates",
      icon: DocumentTextIcon,
      accent: "bg-[#4b0db3] text-white ring-[#4b0db3]",
    },
    {
      label: "Vibe Marketing",
      href: "/founder-tools/marketing",
      icon: MegaphoneIcon,
      accent: "bg-[#00ffd7] text-[#1a1a1a] ring-[#00ffd7]",
    },
    {
      label: "Data Sources",
      href: "/founder-tools/data-sources",
      icon: CircleStackIcon,
      accent: "bg-[#fefc22] text-[#1a1a1a] ring-[#fefc22]",
    },
    {
      label: "Company Settings",
      href: "/founder-tools/company-setup",
      icon: PencilSquareIcon,
      accent: "bg-[#ff3c00] text-white ring-[#ff3c00]",
    },
  ];
  const productCardClass =
    "ft-dashboard__product-card group rounded-2xl border p-5 text-left transition";
  const openFirstVibeRaisingUpdate = () => {
    triggerAnnouncement(() => navigate("/founder-tools/updates/create"));
  };

  return (
    <>
      <style>{`
        .ft-dashboard { background: #f5f0e6; color: #1a1a1a; font-family: 'Roboto', system-ui, sans-serif; }
        .ft-dashboard :is(h1, h2) { font-family: 'Oswald', 'Arial Narrow', sans-serif; font-weight: 700; letter-spacing: -0.01em; line-height: 0.95; text-transform: uppercase; }
        .ft-dashboard__surface { border-color: #d7cfbf !important; background: #fff !important; box-shadow: none !important; }
        .ft-dashboard__hero-bar { position: relative; height: 6rem; overflow: hidden; background: #1a1a1a; }
        .ft-dashboard__hero-mark { position: absolute; display: block; border-radius: 999px; }
        .ft-dashboard__hero-mark--mint { top: -3.5rem; right: 4rem; width: 11rem; height: 11rem; background: #00ffd7; }
        .ft-dashboard__hero-mark--orange { right: 1.5rem; bottom: 1.25rem; width: 2rem; height: 2rem; background: #ff3c00; }
        .ft-dashboard__avatar { border: 2px solid #1a1a1a; background: #1a1a1a; box-shadow: none !important; }
        .ft-dashboard__eyebrow { color: #4b0db3; font-family: 'Oswald', 'Arial Narrow', sans-serif; font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase; }
        .ft-dashboard__company-name { color: #1a1a1a; font-size: clamp(2rem, 4vw, 3rem); }
        .ft-dashboard__email { color: #5c554c; }
        .ft-dashboard__secondary-action { border-color: #1a1a1a !important; background: #f5f0e6 !important; color: #1a1a1a !important; box-shadow: none !important; }
        .ft-dashboard__secondary-action:hover { background: #00ffd7 !important; }
        .ft-dashboard__detail { border-color: #d7cfbf !important; background: #f5f0e6 !important; }
        .ft-dashboard__detail-label { color: #5c554c !important; font-family: 'Oswald', 'Arial Narrow', sans-serif; font-weight: 700; letter-spacing: 0.06em; }
        .ft-dashboard__detail-value { color: #1a1a1a !important; }
        .ft-dashboard__product-card { border-color: #d7cfbf !important; background: #fff !important; box-shadow: none !important; }
        .ft-dashboard__product-card:hover { border-color: #1a1a1a !important; background: #1a1a1a !important; transform: translateY(-0.2rem); }
        .ft-dashboard__product-title { color: #1a1a1a !important; }
        .ft-dashboard__product-card:hover .ft-dashboard__product-title, .ft-dashboard__product-card:hover .ft-dashboard__product-arrow { color: #f5f0e6 !important; }
        .ft-dashboard__active-icon { background: #fefc22 !important; color: #1a1a1a !important; box-shadow: none !important; }
        .ft-dashboard__primary-action { background: #ff3c00 !important; color: #fff !important; box-shadow: none !important; }
        .ft-dashboard__primary-action:hover { background: #1a1a1a !important; }
      `}</style>
      <div className="ft-dashboard min-h-screen px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl space-y-6">
        <section className="ft-dashboard__surface overflow-hidden rounded-2xl border">
          <div className="ft-dashboard__hero-bar" aria-hidden="true"><span className="ft-dashboard__hero-mark ft-dashboard__hero-mark--mint" /><span className="ft-dashboard__hero-mark ft-dashboard__hero-mark--orange" /></div>
          <div className="p-6 sm:p-8">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
              <div className="flex min-w-0 gap-4">
                <div className="ft-dashboard__avatar flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-2xl text-xl font-black text-white">
                  {activeCompany?.domain ? (
                    <img
                      src={`https://www.google.com/s2/favicons?domain=${activeCompany.domain}&sz=128`}
                      alt={activeCompany.name}
                      className="h-10 w-10 rounded"
                    />
                  ) : (
                    companyInitials(activeCompany)
                  )}
                </div>
                <div className="min-w-0">
                  <p className="ft-dashboard__eyebrow text-sm">Founder Tools</p>
                  <h1 className="ft-dashboard__company-name mt-1 truncate">
                    {activeCompany?.name || user.companyName || "Your company"}
                  </h1>
                  <p className="ft-dashboard__email mt-2 text-sm font-semibold">{user.email}</p>
                </div>
              </div>
              <Link
                to="/founder-tools/company-setup"
                className="ft-dashboard__secondary-action inline-flex items-center justify-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-black transition"
              >
                <PencilSquareIcon className="h-4 w-4" />
                Edit setup
              </Link>
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
              {details.map((detail) => {
                const Icon = detail.icon;
                return (
                  <div key={detail.label} className="ft-dashboard__detail rounded-xl border p-4">
                    <div className="ft-dashboard__detail-label flex items-center gap-2 text-xs uppercase">
                      <Icon className="h-4 w-4" />
                      {detail.label}
                    </div>
                    <p className="ft-dashboard__detail-value mt-3 truncate text-sm font-black">{detail.value}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="grid gap-4 lg:grid-cols-4">
          {productLinks.map((item) => {
            const Icon = item.icon;
            const cardContent = (
              <>
                <div className="flex items-start justify-between gap-4">
                  <span className={`flex h-11 w-11 items-center justify-center rounded-xl ring-1 ${item.accent}`}>
                    <Icon className="h-5 w-5" />
                  </span>
                  <ArrowRightIcon className="ft-dashboard__product-arrow h-5 w-5 text-gray-300 transition group-hover:translate-x-0.5" />
                </div>
                <h2 className="ft-dashboard__product-title mt-5 text-xl">{item.label}</h2>
              </>
            );

            if (item.href === "/founder-tools/updates" && !hasMonthlyUpdates) {
              return (
                <button
                  key={item.href}
                  type="button"
                  onClick={openFirstVibeRaisingUpdate}
                  className={productCardClass}
                >
                  {cardContent}
                </button>
              );
            }

            return (
              <Link
                key={item.href}
                to={item.href}
                className={productCardClass}
              >
                {cardContent}
              </Link>
            );
          })}
        </section>

        <section className="ft-dashboard__surface rounded-2xl border p-5 sm:p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <span className="ft-dashboard__active-icon flex h-10 w-10 items-center justify-center rounded-xl ring-1 ring-[#fefc22]">
                <ChartBarSquareIcon className="h-5 w-5" />
              </span>
              <div>
                <h2 className="text-lg text-[#1a1a1a]">Active company</h2>
                <p className="mt-1 text-sm font-semibold text-[#5c554c]">{activeCompany?.name || user.companyName}</p>
              </div>
            </div>
            <Link
              to="/founder-tools/companies"
              className="ft-dashboard__primary-action inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-black transition"
            >
              <BuildingOffice2Icon className="h-4 w-4" />
              Manage companies
            </Link>
          </div>
        </section>
      </div>
      </div>
    </>
  );
}
