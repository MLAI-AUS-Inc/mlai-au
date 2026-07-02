import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { BuildingOffice2Icon, CheckIcon, ChevronDownIcon, Cog6ToothIcon, PlusIcon } from "@heroicons/react/24/outline";
import { Link, useLocation, useSubmit } from "react-router";

import { safeCompanySwitchPath } from "~/routes/founder-tools.switch-company";
import type { VibeRaisingCompany } from "~/types/vibe-raising";

function classNames(...classes: (string | undefined | boolean)[]) {
    return classes.filter(Boolean).join(" ");
}

function CompanyFavicon({ company, sizeClass = "h-5 w-5" }: { company: VibeRaisingCompany; sizeClass?: string }) {
    if (!company.domain) {
        return <BuildingOffice2Icon className={classNames(sizeClass, "shrink-0 text-[var(--vr-color-text-sub)]")} aria-hidden="true" />;
    }
    return (
        <img
            src={`https://www.google.com/s2/favicons?domain=${company.domain}&sz=64`}
            alt=""
            aria-hidden="true"
            className={classNames(sizeClass, "shrink-0 rounded")}
        />
    );
}

/**
 * Header dropdown showing which company the founder is working in, with
 * one-click switching between their startups. Switching stays on the current
 * page (revalidated for the new company) — detail pages pinned to the old
 * company fall back to their section root via safeCompanySwitchPath.
 */
export default function CompanySwitcher({
    companies,
    activeCompanyId,
}: {
    companies: VibeRaisingCompany[];
    activeCompanyId: string | null;
}) {
    const location = useLocation();
    const submit = useSubmit();

    if (!companies.length) return null;

    const activeCompany = companies.find((company) => company.id === activeCompanyId) ?? companies[0];

    const switchTo = (companyId: string) => {
        submit(
            { companyId, returnTo: safeCompanySwitchPath(location.pathname) },
            { method: "post", action: "/founder-tools/switch-company" },
        );
    };

    return (
        <Menu as="div" className="relative min-w-0">
            <Menu.Button
                className="flex min-w-0 max-w-[11rem] items-center gap-2 rounded-full border border-[rgba(15,23,42,0.12)] bg-white/85 px-3 py-1.5 text-sm font-black text-[var(--vr-color-text)] shadow-sm transition hover:bg-white sm:max-w-[16rem]"
                title={`Active company: ${activeCompany.name}`}
            >
                <CompanyFavicon company={activeCompany} />
                <span className="truncate">{activeCompany.name}</span>
                <ChevronDownIcon className="h-4 w-4 shrink-0 text-[var(--vr-color-text-sub)]" aria-hidden="true" />
            </Menu.Button>
            <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
            >
                <Menu.Items className="absolute left-0 z-50 mt-2 w-72 origin-top-left rounded-xl bg-[var(--vr-color-card,#fff)] py-2 shadow-lg ring-1 ring-[rgba(11,11,11,0.08)] focus:outline-none">
                    <p className="px-4 pb-1 pt-1 text-[11px] font-black uppercase tracking-[0.12em] text-[var(--vr-color-text-sub)]">
                        Your companies
                    </p>
                    {companies.map((company) => {
                        const isActive = company.id === activeCompany.id;
                        return (
                            <Menu.Item key={company.id} disabled={isActive}>
                                {({ focus }) => (
                                    <button
                                        type="button"
                                        onClick={() => switchTo(company.id)}
                                        disabled={isActive}
                                        className={classNames(
                                            focus && !isActive && "bg-[rgba(0,255,215,0.14)]",
                                            "flex w-full items-center gap-3 px-4 py-2 text-left",
                                            isActive ? "cursor-default" : "cursor-pointer",
                                        )}
                                    >
                                        <CompanyFavicon company={company} sizeClass="h-6 w-6" />
                                        <span className="min-w-0 flex-1">
                                            <span className="block truncate text-sm font-black text-[var(--vr-color-text)]">{company.name}</span>
                                            {company.domain ? (
                                                <span className="block truncate text-xs font-semibold text-[var(--vr-color-text-sub)]">{company.domain}</span>
                                            ) : null}
                                        </span>
                                        {isActive ? <CheckIcon className="h-4 w-4 shrink-0 text-[var(--vr-color-primary)]" aria-hidden="true" /> : null}
                                    </button>
                                )}
                            </Menu.Item>
                        );
                    })}
                    <div className="my-2 border-t border-[rgba(11,11,11,0.08)]" />
                    <Menu.Item>
                        {({ focus }) => (
                            <Link
                                to="/founder-tools/company-setup?new=true"
                                className={classNames(
                                    focus && "bg-[rgba(0,255,215,0.14)]",
                                    "flex items-center gap-3 px-4 py-2 text-sm font-black text-[var(--vr-color-text)]",
                                )}
                            >
                                <PlusIcon className="h-5 w-5 shrink-0 text-[var(--vr-color-text-sub)]" aria-hidden="true" />
                                Register new company
                            </Link>
                        )}
                    </Menu.Item>
                    <Menu.Item>
                        {({ focus }) => (
                            <Link
                                to="/founder-tools/companies"
                                className={classNames(
                                    focus && "bg-[rgba(0,255,215,0.14)]",
                                    "flex items-center gap-3 px-4 py-2 text-sm font-black text-[var(--vr-color-text)]",
                                )}
                            >
                                <Cog6ToothIcon className="h-5 w-5 shrink-0 text-[var(--vr-color-text-sub)]" aria-hidden="true" />
                                Manage companies
                            </Link>
                        )}
                    </Menu.Item>
                </Menu.Items>
            </Transition>
        </Menu>
    );
}
