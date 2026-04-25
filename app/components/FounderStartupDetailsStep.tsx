import {
  BuildingOffice2Icon,
  GlobeAltIcon,
  IdentificationIcon,
  MapPinIcon,
  SparklesIcon,
  TagIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";
import type { ChangeEvent, ReactNode } from "react";

type StartupDetailsDefaults = {
  companyName?: string | null;
  domain?: string | null;
  location?: string | null;
  abn?: string | null;
  brandName?: string | null;
  companyContext?: string | null;
  competitors?: string[];
  seedKeywords?: string[];
  founderNames?: string[];
  stage?: string | null;
  notes?: string | null;
};

export type StartupDetailsField =
  | "companyName"
  | "domain"
  | "location"
  | "abn"
  | "brandName"
  | "companyContext"
  | "competitors"
  | "seedKeywords"
  | "founderNames"
  | "stage"
  | "notes";

export type StartupDetailsFormValues = Record<StartupDetailsField, string>;

interface FounderStartupDetailsStepProps {
  defaults: StartupDetailsDefaults;
  compact?: boolean;
  values?: Partial<StartupDetailsFormValues>;
  onValueChange?: (field: StartupDetailsField, value: string) => void;
  autofilledFields?: StartupDetailsField[];
  afterBrandName?: ReactNode;
}

function listDefault(value?: string[] | null) {
  return (value ?? []).join("\n");
}

function FieldIcon({ children }: { children: ReactNode }) {
  return <div className="pointer-events-none absolute left-3.5 top-3.5 h-5 w-5 text-gray-400">{children}</div>;
}

export default function FounderStartupDetailsStep({
  defaults,
  compact = false,
  values,
  onValueChange,
  autofilledFields = [],
  afterBrandName,
}: FounderStartupDetailsStepProps) {
  const isControlled = Boolean(values);
  const autofilled = new Set(autofilledFields);
  const textValue = (field: StartupDetailsField, fallback: string) => (isControlled ? values?.[field] ?? "" : fallback);
  const inputProps = (field: StartupDetailsField, fallback: string) =>
    isControlled
      ? {
          value: textValue(field, fallback),
          onChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => onValueChange?.(field, event.target.value),
        }
      : { defaultValue: fallback };
  const hint = (field: StartupDetailsField) =>
    autofilled.has(field) ? <span className="ml-2 text-xs font-semibold text-emerald-600">Autofilled from website</span> : null;

  return (
    <div className="space-y-6">
      <div className="grid gap-4 lg:grid-cols-2">
        <label className="block">
          <span className="mb-2 block text-sm font-bold text-gray-700">Company name{hint("companyName")}</span>
          <div className="relative">
            <FieldIcon><BuildingOffice2Icon /></FieldIcon>
            <input
              name="companyName"
              required
              {...inputProps("companyName", defaults.companyName ?? "")}
              autoComplete="organization"
              placeholder="Acme AI"
              className="w-full rounded-xl border border-gray-200 py-3 pl-11 pr-4 text-sm font-medium text-gray-900 outline-none transition focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10"
            />
          </div>
        </label>

        <label className="block">
          <span className="mb-2 block text-sm font-bold text-gray-700">Website domain{hint("domain")}</span>
          <div className="relative">
            <FieldIcon><GlobeAltIcon /></FieldIcon>
            <input
              name="domain"
              required
              {...inputProps("domain", defaults.domain ?? "")}
              autoComplete="url"
              placeholder="example.com"
              className="w-full rounded-xl border border-gray-200 py-3 pl-11 pr-4 text-sm font-medium text-gray-900 outline-none transition focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10"
            />
          </div>
        </label>

        <label className="block">
          <span className="mb-2 block text-sm font-bold text-gray-700">Startup location{hint("location")}</span>
          <div className="relative">
            <FieldIcon><MapPinIcon /></FieldIcon>
            <input
              name="location"
              {...inputProps("location", defaults.location ?? "")}
              autoComplete="address-level2"
              placeholder="Melbourne, Australia"
              className="w-full rounded-xl border border-gray-200 py-3 pl-11 pr-4 text-sm font-medium text-gray-900 outline-none transition focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10"
            />
          </div>
        </label>

        <label className="block">
          <span className="mb-2 block text-sm font-bold text-gray-700">ABN{hint("abn")}</span>
          <div className="relative">
            <FieldIcon><IdentificationIcon /></FieldIcon>
            <input
              name="abn"
              {...inputProps("abn", defaults.abn ?? "")}
              autoComplete="off"
              inputMode="numeric"
              placeholder="51 824 753 556"
              className="w-full rounded-xl border border-gray-200 py-3 pl-11 pr-4 text-sm font-medium text-gray-900 outline-none transition focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10"
            />
          </div>
        </label>
      </div>

      <label className="block">
        <span className="mb-2 block text-sm font-bold text-gray-700">Brand name{hint("brandName")}</span>
        <div className="relative">
          <FieldIcon><SparklesIcon /></FieldIcon>
          <input
            name="brandName"
            {...inputProps("brandName", defaults.brandName ?? defaults.companyName ?? "")}
            placeholder="Public-facing brand"
            className="w-full rounded-xl border border-gray-200 py-3 pl-11 pr-4 text-sm font-medium text-gray-900 outline-none transition focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10"
          />
        </div>
      </label>

      {afterBrandName}

      <label className="block">
        <span className="mb-2 block text-sm font-bold text-gray-700">Company context{hint("companyContext")}</span>
        <textarea
          name="companyContext"
          required
          rows={compact ? 4 : 5}
          {...inputProps("companyContext", defaults.companyContext ?? defaults.notes ?? "")}
          placeholder="What you sell, who you help, why your product is different, and what buyers care about."
          className="w-full resize-y rounded-xl border border-gray-200 px-4 py-3 text-sm font-medium leading-6 text-gray-900 outline-none transition focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10"
        />
      </label>

      <div className="grid gap-4 lg:grid-cols-2">
        <label className="block">
          <span className="mb-2 block text-sm font-bold text-gray-700">Competitors{hint("competitors")}</span>
          <div className="relative">
            <FieldIcon><UserGroupIcon /></FieldIcon>
            <textarea
              name="competitors"
              rows={4}
              {...inputProps("competitors", listDefault(defaults.competitors))}
              placeholder="competitor.com&#10;another competitor"
              className="w-full resize-y rounded-xl border border-gray-200 py-3 pl-11 pr-4 text-sm font-medium leading-6 text-gray-900 outline-none transition focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10"
            />
          </div>
        </label>

        <label className="block">
          <span className="mb-2 block text-sm font-bold text-gray-700">Seed keywords{hint("seedKeywords")}</span>
          <div className="relative">
            <FieldIcon><TagIcon /></FieldIcon>
            <textarea
              name="seedKeywords"
              rows={4}
              {...inputProps("seedKeywords", listDefault(defaults.seedKeywords))}
              placeholder="investor updates&#10;startup reporting"
              className="w-full resize-y rounded-xl border border-gray-200 py-3 pl-11 pr-4 text-sm font-medium leading-6 text-gray-900 outline-none transition focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10"
            />
          </div>
        </label>
      </div>

      <div className="grid gap-4 lg:grid-cols-[1fr_180px]">
        <label className="block">
          <span className="mb-2 block text-sm font-bold text-gray-700">Founder names{hint("founderNames")}</span>
          <input
            name="founderNames"
            {...inputProps("founderNames", (defaults.founderNames ?? []).join(", "))}
            placeholder="Sam Donegan, Alex Founder"
            className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm font-medium text-gray-900 outline-none transition focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10"
          />
        </label>

        <label className="block">
          <span className="mb-2 block text-sm font-bold text-gray-700">Stage{hint("stage")}</span>
          <input
            name="stage"
            {...inputProps("stage", defaults.stage ?? "")}
            placeholder="Seed"
            className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm font-medium text-gray-900 outline-none transition focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10"
          />
        </label>
      </div>

      <label className="block">
        <span className="mb-2 block text-sm font-bold text-gray-700">Internal notes{hint("notes")}</span>
        <textarea
          name="notes"
          rows={3}
          {...inputProps("notes", defaults.notes ?? "")}
          placeholder="Anything the monthly update and marketing agents should remember."
          className="w-full resize-y rounded-xl border border-gray-200 px-4 py-3 text-sm font-medium leading-6 text-gray-900 outline-none transition focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10"
        />
      </label>
    </div>
  );
}
