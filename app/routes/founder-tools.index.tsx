import type { Route } from "./+types/founder-tools.index";
import { Link, redirect, useLoaderData, useNavigate, useOutletContext } from "react-router";
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
  getOptionalVibeRaisingContext,
  getVibeRaisingLoginHref,
} from "~/lib/vibe-raising";
import type { VibeRaisingCompany } from "~/types/vibe-raising";

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
  const vibeContext = await getOptionalVibeRaisingContext(env, request);

  if (!vibeContext.authUser) {
    throw redirect(getVibeRaisingLoginHref(request));
  }

  if (!vibeContext.appUser || !vibeContext.appUser.companyRegistered) {
    throw redirect("/founder-tools/company-setup");
  }

  const monthlyUpdates = await getVibeRaisingMonthlyUpdates(env, request);

  return {
    user: vibeContext.appUser,
    activeCompany: getActiveVibeRaisingCompany(vibeContext.appUser),
    hasMonthlyUpdates: monthlyUpdates.length > 0,
  };
}

export default function FounderToolsIndex() {
  const { user, activeCompany, hasMonthlyUpdates } = useLoaderData<typeof loader>();
  const navigate = useNavigate();
  const { triggerAnnouncement } = useOutletContext<{ triggerAnnouncement: (cb?: () => void) => void }>();
  const details = [
    { label: "Website", value: detailValue(activeCompany?.domain), icon: GlobeAltIcon },
    { label: "Location", value: detailValue(activeCompany?.location), icon: MapPinIcon },
    { label: "ABN", value: detailValue(activeCompany?.abn), icon: IdentificationIcon },
    { label: "Status", value: activeCompany?.registered ? "Set up" : "Incomplete", icon: CheckBadgeIcon },
  ];
  const productLinks = [
    {
      label: "Vibe Raising",
      href: "/founder-tools/updates",
      icon: DocumentTextIcon,
      accent: "bg-violet-50 text-violet-700 ring-violet-100",
    },
    {
      label: "Vibe Marketing",
      href: "/founder-tools/marketing",
      icon: MegaphoneIcon,
      accent: "bg-teal-50 text-teal-700 ring-teal-100",
    },
    {
      label: "Data Sources",
      href: "/founder-tools/data-sources",
      icon: CircleStackIcon,
      accent: "bg-sky-50 text-sky-700 ring-sky-100",
    },
    {
      label: "Company Settings",
      href: "/founder-tools/company-setup",
      icon: PencilSquareIcon,
      accent: "bg-slate-50 text-slate-700 ring-slate-100",
    },
  ];
  const productCardClass =
    "group rounded-2xl border border-gray-200 bg-white p-5 text-left shadow-sm transition hover:-translate-y-0.5 hover:border-gray-300 hover:shadow-md";
  const openFirstVibeRaisingUpdate = () => {
    triggerAnnouncement(() => navigate("/founder-tools/updates/create"));
  };

  return (
    <div className="min-h-screen bg-[#fbfaf8] px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-6">
        <section className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
          <div className="h-24 bg-gradient-to-r from-violet-600 via-teal-500 to-cyan-400" />
          <div className="p-6 sm:p-8">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
              <div className="flex min-w-0 gap-4">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-gray-950 text-xl font-black text-white shadow-sm">
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
                  <p className="text-sm font-black text-violet-700">Founder Tools</p>
                  <h1 className="mt-1 truncate text-3xl font-black tracking-normal text-gray-950">
                    {activeCompany?.name || user.companyName || "Your company"}
                  </h1>
                  <p className="mt-2 text-sm font-semibold text-gray-500">{user.email}</p>
                </div>
              </div>
              <Link
                to="/founder-tools/company-setup"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-black text-gray-700 shadow-sm transition hover:bg-gray-50"
              >
                <PencilSquareIcon className="h-4 w-4" />
                Edit setup
              </Link>
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
              {details.map((detail) => {
                const Icon = detail.icon;
                return (
                  <div key={detail.label} className="rounded-xl border border-gray-200 bg-gray-50/60 p-4">
                    <div className="flex items-center gap-2 text-xs font-black uppercase text-gray-400">
                      <Icon className="h-4 w-4" />
                      {detail.label}
                    </div>
                    <p className="mt-3 truncate text-sm font-black text-gray-950">{detail.value}</p>
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
                  <ArrowRightIcon className="h-5 w-5 text-gray-300 transition group-hover:translate-x-0.5 group-hover:text-gray-600" />
                </div>
                <p className="mt-5 text-base font-black text-gray-950">{item.label}</p>
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

        <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-50 text-gray-500 ring-1 ring-gray-100">
                <ChartBarSquareIcon className="h-5 w-5" />
              </span>
              <div>
                <p className="text-sm font-black text-gray-950">Active company</p>
                <p className="mt-1 text-sm font-semibold text-gray-500">{activeCompany?.name || user.companyName}</p>
              </div>
            </div>
            <Link
              to="/founder-tools/companies"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-gray-950 px-4 py-2.5 text-sm font-black text-white shadow-sm transition hover:bg-black"
            >
              <BuildingOffice2Icon className="h-4 w-4" />
              Manage companies
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
