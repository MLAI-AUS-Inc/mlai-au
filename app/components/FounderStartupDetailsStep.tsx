import {
  BuildingOffice2Icon,
  CheckIcon,
  ChevronUpDownIcon,
  GlobeAltIcon,
  IdentificationIcon,
  LinkIcon,
  MapPinIcon,
  SparklesIcon,
  TagIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";
import { useEffect, useRef, useState, type ChangeEvent, type KeyboardEvent, type ReactNode } from "react";

type StartupDetailsDefaults = {
  companyName?: string | null;
  domain?: string | null;
  companyLinkedInUrl?: string | null;
  location?: string | null;
  abn?: string | null;
  brandName?: string | null;
  companyContext?: string | null;
  competitors?: string[];
  seedKeywords?: string[];
  founderNames?: string[];
  stage?: string | null;
  organizationKind?: string | null;
  notes?: string | null;
};

export type StartupDetailsField =
  | "companyName"
  | "domain"
  | "companyLinkedInUrl"
  | "location"
  | "abn"
  | "brandName"
  | "companyContext"
  | "competitors"
  | "seedKeywords"
  | "founderNames"
  | "stage"
  | "organizationKind"
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
  return <div className="pointer-events-none absolute left-3.5 top-3.5 h-5 w-5 text-[var(--vr-color-text-sub)]">{children}</div>;
}

const STARTUP_STAGE_OPTIONS = [
  "",
  "Idea",
  "Pre-seed",
  "Seed",
  "Series A",
  "Series B",
  "Series C+",
  "Growth",
  "Bootstrapped",
  "Not fundraising",
  "Other",
];

const ORGANIZATION_KIND_OPTIONS = ["", "For-profit", "Not-for-profit"];

type LookupState<T> = {
  configured: boolean;
  suggestions: T[];
  error?: string;
};

type LocationSuggestion = {
  id: string;
  label: string;
  city?: string;
  region?: string;
  country?: string;
  placeId?: string;
};

type AbnSuggestion = {
  abn: string;
  entityName?: string;
  businessName?: string;
  status?: string;
  state?: string;
  postcode?: string;
};

function createLookupSessionToken() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

function isNumericAbnQuery(value: string) {
  return /^[\d\s]+$/.test(value.trim());
}

function formatAbnLabel(option: AbnSuggestion) {
  const name = option.businessName || option.entityName;
  const location = [option.state, option.postcode].filter(Boolean).join(" ");
  return [name, option.abn, location].filter(Boolean).join(" · ");
}

function AutocompleteStatus({
  open,
  loading,
  query,
  configured,
  error,
  suggestionsLength,
  emptyLabel,
}: {
  open: boolean;
  loading: boolean;
  query: string;
  configured: boolean;
  error?: string;
  suggestionsLength: number;
  emptyLabel: string;
}) {
  if (!open || suggestionsLength > 0) return null;
  if (query.trim().length < 3) {
    return <div className="px-4 py-3 text-sm font-semibold text-gray-500">Type at least 3 characters.</div>;
  }
  if (loading) {
    return <div className="px-4 py-3 text-sm font-semibold text-gray-500">Searching...</div>;
  }
  if (!configured) {
    return <div className="px-4 py-3 text-sm font-semibold text-amber-700">Lookup is not configured yet.</div>;
  }
  if (error) {
    return <div className="px-4 py-3 text-sm font-semibold text-red-600">{error}</div>;
  }
  return <div className="px-4 py-3 text-sm font-semibold text-gray-500">{emptyLabel}</div>;
}

function LocationAutocompleteField({
  value,
  fallback,
  onChange,
}: {
  value?: string;
  fallback: string;
  onChange?: (value: string) => void;
}) {
  const controlled = value !== undefined;
  const [localValue, setLocalValue] = useState(fallback);
  const query = controlled ? value ?? "" : localValue;
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [lookup, setLookup] = useState<LookupState<LocationSuggestion>>({ configured: true, suggestions: [] });
  const sessionToken = useRef(createLookupSessionToken());

  const setValue = (next: string) => {
    if (!controlled) setLocalValue(next);
    onChange?.(next);
  };

  useEffect(() => {
    if (!open || query.trim().length < 3) {
      setLookup((current) => ({ ...current, suggestions: [], error: undefined }));
      return;
    }
    const controller = new AbortController();
    const timer = window.setTimeout(async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams({ q: query.trim(), sessionToken: sessionToken.current });
        const response = await fetch(`/api/vibe-marketing/lookups/locations?${params.toString()}`, {
          signal: controller.signal,
        });
        const data = (await response.json()) as LookupState<LocationSuggestion>;
        setLookup({
          configured: Boolean(data.configured),
          suggestions: Array.isArray(data.suggestions) ? data.suggestions : [],
          error: data.error,
        });
        setActiveIndex(0);
      } catch (error) {
        if (!controller.signal.aborted) {
          setLookup({ configured: true, suggestions: [], error: "Location lookup is unavailable." });
        }
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }, 700);
    return () => {
      window.clearTimeout(timer);
      controller.abort();
    };
  }, [open, query]);

  const selectOption = (option: LocationSuggestion) => {
    setValue(option.label);
    setLookup((current) => ({ ...current, suggestions: [] }));
    setOpen(false);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (!open || lookup.suggestions.length === 0) return;
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActiveIndex((index) => (index + 1) % lookup.suggestions.length);
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex((index) => (index - 1 + lookup.suggestions.length) % lookup.suggestions.length);
    } else if (event.key === "Enter") {
      event.preventDefault();
      selectOption(lookup.suggestions[activeIndex]);
    } else if (event.key === "Escape") {
      setOpen(false);
    }
  };

  return (
    <div className="relative">
      <FieldIcon><MapPinIcon /></FieldIcon>
      <input
        name="location"
        value={query}
        onChange={(event) => {
          setValue(event.target.value);
          setOpen(true);
        }}
        onFocus={() => setOpen(true)}
        onBlur={() => window.setTimeout(() => setOpen(false), 120)}
        onKeyDown={handleKeyDown}
        autoComplete="address-level2"
        placeholder="Melbourne, Australia"
        className="w-full rounded-xl border border-gray-200 py-3 pl-11 pr-10 text-sm font-medium text-gray-900 outline-none transition focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10"
      />
      <ChevronUpDownIcon className="pointer-events-none absolute right-3.5 top-3.5 h-5 w-5 text-gray-400" />
      {open ? (
        <div className="absolute z-30 mt-2 w-full overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg">
          {lookup.suggestions.map((option, index) => (
            <button
              key={option.id}
              type="button"
              onMouseDown={(event) => event.preventDefault()}
              onClick={() => selectOption(option)}
              className={`flex w-full items-start justify-between gap-3 px-4 py-3 text-left text-sm transition ${
                index === activeIndex ? "bg-violet-50 text-violet-900" : "text-gray-800 hover:bg-gray-50"
              }`}
            >
              <span>
                <span className="block font-bold">{option.city || option.label}</span>
                <span className="mt-0.5 block text-xs font-semibold text-gray-500">{option.label}</span>
              </span>
              {query === option.label ? <CheckIcon className="h-5 w-5 flex-none text-violet-600" /> : null}
            </button>
          ))}
          <AutocompleteStatus
            open={open}
            loading={loading}
            query={query}
            configured={lookup.configured}
            error={lookup.error}
            suggestionsLength={lookup.suggestions.length}
            emptyLabel="No city matches found."
          />
        </div>
      ) : null}
    </div>
  );
}

function AbnAutocompleteField({
  value,
  fallback,
  onChange,
}: {
  value?: string;
  fallback: string;
  onChange?: (value: string) => void;
}) {
  const controlled = value !== undefined;
  const [selectedValue, setSelectedValue] = useState(fallback);
  const committedValue = controlled ? value ?? "" : selectedValue;
  const [displayValue, setDisplayValue] = useState(committedValue);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [lookup, setLookup] = useState<LookupState<AbnSuggestion>>({ configured: true, suggestions: [] });

  useEffect(() => {
    if (!open) setDisplayValue(committedValue);
  }, [committedValue, open]);

  const commitValue = (next: string) => {
    if (!controlled) setSelectedValue(next);
    onChange?.(next);
  };

  useEffect(() => {
    if (!open || displayValue.trim().length < 3) {
      setLookup((current) => ({ ...current, suggestions: [], error: undefined }));
      return;
    }
    const controller = new AbortController();
    const timer = window.setTimeout(async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams({ q: displayValue.trim() });
        const response = await fetch(`/api/vibe-marketing/lookups/abns?${params.toString()}`, {
          signal: controller.signal,
        });
        const data = (await response.json()) as LookupState<AbnSuggestion>;
        setLookup({
          configured: Boolean(data.configured),
          suggestions: Array.isArray(data.suggestions) ? data.suggestions : [],
          error: data.error,
        });
        setActiveIndex(0);
      } catch (error) {
        if (!controller.signal.aborted) {
          setLookup({ configured: true, suggestions: [], error: "ABN lookup is unavailable." });
        }
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }, 700);
    return () => {
      window.clearTimeout(timer);
      controller.abort();
    };
  }, [displayValue, open]);

  const selectOption = (option: AbnSuggestion) => {
    commitValue(option.abn);
    setDisplayValue(option.abn);
    setLookup((current) => ({ ...current, suggestions: [] }));
    setOpen(false);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (!open || lookup.suggestions.length === 0) return;
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActiveIndex((index) => (index + 1) % lookup.suggestions.length);
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex((index) => (index - 1 + lookup.suggestions.length) % lookup.suggestions.length);
    } else if (event.key === "Enter") {
      event.preventDefault();
      selectOption(lookup.suggestions[activeIndex]);
    } else if (event.key === "Escape") {
      setOpen(false);
    }
  };

  return (
    <div className="relative">
      <input type="hidden" name="abn" value={committedValue} />
      <FieldIcon><IdentificationIcon /></FieldIcon>
      <input
        value={displayValue}
        onChange={(event) => {
          const next = event.target.value;
          setDisplayValue(next);
          if (isNumericAbnQuery(next)) {
            commitValue(next);
          }
          setOpen(true);
        }}
        onFocus={() => setOpen(true)}
        onBlur={() => window.setTimeout(() => setOpen(false), 120)}
        onKeyDown={handleKeyDown}
        autoComplete="off"
        placeholder="Search ABN or business name"
        className="w-full rounded-xl border border-gray-200 py-3 pl-11 pr-10 text-sm font-medium text-gray-900 outline-none transition focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10"
      />
      <ChevronUpDownIcon className="pointer-events-none absolute right-3.5 top-3.5 h-5 w-5 text-gray-400" />
      {open ? (
        <div className="absolute z-30 mt-2 w-full overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg">
          {lookup.suggestions.map((option, index) => (
            <button
              key={option.abn}
              type="button"
              onMouseDown={(event) => event.preventDefault()}
              onClick={() => selectOption(option)}
              className={`flex w-full items-start justify-between gap-3 px-4 py-3 text-left text-sm transition ${
                index === activeIndex ? "bg-violet-50 text-violet-900" : "text-gray-800 hover:bg-gray-50"
              }`}
            >
              <span>
                <span className="block font-bold">{option.businessName || option.entityName || option.abn}</span>
                <span className="mt-0.5 block text-xs font-semibold text-gray-500">{formatAbnLabel(option)}</span>
              </span>
              {committedValue === option.abn ? <CheckIcon className="h-5 w-5 flex-none text-violet-600" /> : null}
            </button>
          ))}
          <AutocompleteStatus
            open={open}
            loading={loading}
            query={displayValue}
            configured={lookup.configured}
            error={lookup.error}
            suggestionsLength={lookup.suggestions.length}
            emptyLabel="No ABN matches found."
          />
        </div>
      ) : null}
    </div>
  );
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
    autofilled.has(field) ? <span className="ml-2 text-xs font-semibold text-[var(--vr-color-primary)]">Autofilled from website</span> : null;

  return (
    <div className="space-y-6">
      <div className="grid gap-4 lg:grid-cols-2">
        <label className="block">
          <span className="mb-2 block text-sm font-bold text-[var(--vr-color-text-mid)]">Company name{hint("companyName")}</span>
          <div className="relative">
            <FieldIcon><BuildingOffice2Icon /></FieldIcon>
            <input
              name="companyName"
              required
              {...inputProps("companyName", defaults.companyName ?? "")}
              autoComplete="organization"
              placeholder="Acme AI"
              className="w-full rounded-xl border border-[var(--vr-color-border)] py-3 pl-11 pr-4 text-sm font-medium text-[var(--vr-color-text)] outline-none transition focus:border-[var(--vr-color-primary)] focus:ring-4 focus:ring-[rgba(0,128,128,0.10)]"
            />
          </div>
        </label>

        <label className="block">
          <span className="mb-2 block text-sm font-bold text-[var(--vr-color-text-mid)]">Website domain{hint("domain")}</span>
          <div className="relative">
            <FieldIcon><GlobeAltIcon /></FieldIcon>
            <input
              name="domain"
              required
              {...inputProps("domain", defaults.domain ?? "")}
              autoComplete="url"
              placeholder="example.com"
              className="w-full rounded-xl border border-[var(--vr-color-border)] py-3 pl-11 pr-4 text-sm font-medium text-[var(--vr-color-text)] outline-none transition focus:border-[var(--vr-color-primary)] focus:ring-4 focus:ring-[rgba(0,128,128,0.10)]"
            />
          </div>
        </label>

        <label className="block lg:col-span-2">
          <span className="mb-2 block text-sm font-bold text-[var(--vr-color-text-mid)]">Company LinkedIn URL{hint("companyLinkedInUrl")}</span>
          <div className="relative">
            <FieldIcon><LinkIcon /></FieldIcon>
            <input
              name="companyLinkedInUrl"
              {...inputProps("companyLinkedInUrl", defaults.companyLinkedInUrl ?? "")}
              autoComplete="url"
              placeholder="https://www.linkedin.com/company/acme"
              className="w-full rounded-xl border border-[var(--vr-color-border)] py-3 pl-11 pr-4 text-sm font-medium text-[var(--vr-color-text)] outline-none transition focus:border-[var(--vr-color-primary)] focus:ring-4 focus:ring-[rgba(0,128,128,0.10)]"
            />
          </div>
        </label>

        <label className="block">
          <span className="mb-2 block text-sm font-bold text-[var(--vr-color-text-mid)]">Startup location{hint("location")}</span>
          <LocationAutocompleteField
            value={isControlled ? textValue("location", defaults.location ?? "") : undefined}
            fallback={defaults.location ?? ""}
            onChange={(next) => onValueChange?.("location", next)}
          />
        </label>

        <label className="block">
          <span className="mb-2 block text-sm font-bold text-[var(--vr-color-text-mid)]">ABN{hint("abn")}</span>
          <AbnAutocompleteField
            value={isControlled ? textValue("abn", defaults.abn ?? "") : undefined}
            fallback={defaults.abn ?? ""}
            onChange={(next) => onValueChange?.("abn", next)}
          />
        </label>
      </div>

      <label className="block">
        <span className="mb-2 block text-sm font-bold text-[var(--vr-color-text-mid)]">Brand name{hint("brandName")}</span>
        <div className="relative">
          <FieldIcon><SparklesIcon /></FieldIcon>
          <input
            name="brandName"
            {...inputProps("brandName", defaults.brandName ?? defaults.companyName ?? "")}
            placeholder="Public-facing brand"
            className="w-full rounded-xl border border-[var(--vr-color-border)] py-3 pl-11 pr-4 text-sm font-medium text-[var(--vr-color-text)] outline-none transition focus:border-[var(--vr-color-primary)] focus:ring-4 focus:ring-[rgba(0,128,128,0.10)]"
          />
        </div>
      </label>

      {afterBrandName}

      <label className="block">
        <span className="mb-2 block text-sm font-bold text-[var(--vr-color-text-mid)]">Company context{hint("companyContext")}</span>
        <textarea
          name="companyContext"
          required
          rows={compact ? 4 : 5}
          {...inputProps("companyContext", defaults.companyContext ?? defaults.notes ?? "")}
          placeholder="What you sell, who you help, why your product is different, and what buyers care about."
          className="w-full resize-y rounded-xl border border-[var(--vr-color-border)] px-4 py-3 text-sm font-medium leading-6 text-[var(--vr-color-text)] outline-none transition focus:border-[var(--vr-color-primary)] focus:ring-4 focus:ring-[rgba(0,128,128,0.10)]"
        />
      </label>

      {afterBrandName}

      <div className="grid gap-4 lg:grid-cols-2">
        <label className="block">
          <span className="mb-2 block text-sm font-bold text-[var(--vr-color-text-mid)]">Competitors{hint("competitors")}</span>
          <div className="relative">
            <FieldIcon><UserGroupIcon /></FieldIcon>
            <textarea
              name="competitors"
              rows={4}
              {...inputProps("competitors", listDefault(defaults.competitors))}
              placeholder="competitor.com&#10;another competitor"
              className="w-full resize-y rounded-xl border border-[var(--vr-color-border)] py-3 pl-11 pr-4 text-sm font-medium leading-6 text-[var(--vr-color-text)] outline-none transition focus:border-[var(--vr-color-primary)] focus:ring-4 focus:ring-[rgba(0,128,128,0.10)]"
            />
          </div>
        </label>

        <label className="block">
          <span className="mb-2 block text-sm font-bold text-[var(--vr-color-text-mid)]">Seed keywords{hint("seedKeywords")}</span>
          <div className="relative">
            <FieldIcon><TagIcon /></FieldIcon>
            <textarea
              name="seedKeywords"
              rows={4}
              {...inputProps("seedKeywords", listDefault(defaults.seedKeywords))}
              placeholder="investor updates&#10;startup reporting"
              className="w-full resize-y rounded-xl border border-[var(--vr-color-border)] py-3 pl-11 pr-4 text-sm font-medium leading-6 text-[var(--vr-color-text)] outline-none transition focus:border-[var(--vr-color-primary)] focus:ring-4 focus:ring-[rgba(0,128,128,0.10)]"
            />
          </div>
        </label>
      </div>

      <div className="grid gap-4 lg:grid-cols-[1fr_220px_220px]">
        <label className="block">
          <span className="mb-2 block text-sm font-bold text-[var(--vr-color-text-mid)]">Founder names{hint("founderNames")}</span>
          <input
            name="founderNames"
            {...inputProps("founderNames", (defaults.founderNames ?? []).join(", "))}
            placeholder="Sam Donegan, Alex Founder"
            className="w-full rounded-xl border border-[var(--vr-color-border)] px-4 py-3 text-sm font-medium text-[var(--vr-color-text)] outline-none transition focus:border-[var(--vr-color-primary)] focus:ring-4 focus:ring-[rgba(0,128,128,0.10)]"
          />
        </label>

        <label className="block">
          <span className="mb-2 block text-sm font-bold text-[var(--vr-color-text-mid)]">Stage{hint("stage")}</span>
          <select
            name="stage"
            {...(isControlled
              ? {
                  value: textValue("stage", defaults.stage ?? ""),
                  onChange: (event: ChangeEvent<HTMLSelectElement>) => onValueChange?.("stage", event.target.value),
                }
              : { defaultValue: defaults.stage ?? "" })}
            className="w-full rounded-xl border border-[var(--vr-color-border)] px-4 py-3 text-sm font-medium text-[var(--vr-color-text)] outline-none transition focus:border-[var(--vr-color-primary)] focus:ring-4 focus:ring-[rgba(0,128,128,0.10)]"
          >
            {STARTUP_STAGE_OPTIONS.map((option) => (
              <option key={option || "blank"} value={option}>
                {option || "Select stage"}
              </option>
            ))}
          </select>
        </label>

        <label className="block">
          <span className="mb-2 block text-sm font-bold text-[var(--vr-color-text-mid)]">Organization type{hint("organizationKind")}</span>
          <select
            name="organizationKind"
            {...(isControlled
              ? {
                  value: textValue("organizationKind", defaults.organizationKind ?? ""),
                  onChange: (event: ChangeEvent<HTMLSelectElement>) => onValueChange?.("organizationKind", event.target.value),
                }
              : { defaultValue: defaults.organizationKind ?? "" })}
            className="w-full rounded-xl border border-[var(--vr-color-border)] px-4 py-3 text-sm font-medium text-[var(--vr-color-text)] outline-none transition focus:border-[var(--vr-color-primary)] focus:ring-4 focus:ring-[rgba(0,128,128,0.10)]"
          >
            {ORGANIZATION_KIND_OPTIONS.map((option) => (
              <option key={option || "blank"} value={option}>
                {option || "Select type"}
              </option>
            ))}
          </select>
        </label>
      </div>

      <label className="block">
        <span className="mb-2 block text-sm font-bold text-[var(--vr-color-text-mid)]">Internal notes{hint("notes")}</span>
        <textarea
          name="notes"
          rows={3}
          {...inputProps("notes", defaults.notes ?? "")}
          placeholder="Anything the monthly update and marketing agents should remember."
          className="w-full resize-y rounded-xl border border-[var(--vr-color-border)] px-4 py-3 text-sm font-medium leading-6 text-[var(--vr-color-text)] outline-none transition focus:border-[var(--vr-color-primary)] focus:ring-4 focus:ring-[rgba(0,128,128,0.10)]"
        />
      </label>
    </div>
  );
}
