import { useEffect, useRef, useState, type KeyboardEvent, type ReactNode } from "react";

import type { VibeMarketingAbnSuggestion } from "~/lib/vibe-marketing";

type LookupResponse = {
  configured?: boolean;
  suggestions?: VibeMarketingAbnSuggestion[];
  error?: string;
};

function isNumericAbnQuery(value: string) {
  return /^[\d\s]+$/.test(value.trim());
}

function suggestionLabel(option: VibeMarketingAbnSuggestion) {
  const location = [option.state, option.postcode].filter(Boolean).join(" ");
  return [option.abn, option.entityTypeName, location].filter(Boolean).join(" · ");
}

/**
 * ABN field with type-ahead against the ABR lookup. Typing an ABN or business name
 * shows matching companies; selecting one commits the ABN (+ ACN) and reports the full
 * suggestion via `onSelect` so the parent can fill the company name. The committed ABN
 * and ACN are submitted via hidden inputs (`abn`, `acn`).
 */
export default function AbnAutocomplete({
  value,
  onChange,
  onSelect,
  disabled,
  placeholder = "Search ABN or business name",
  inputClassName,
  leadingIcon,
}: {
  value: string;
  onChange: (abn: string) => void;
  onSelect?: (suggestion: VibeMarketingAbnSuggestion) => void;
  disabled?: boolean;
  placeholder?: string;
  inputClassName?: string;
  leadingIcon?: ReactNode;
}) {
  const [displayValue, setDisplayValue] = useState(value);
  const [acn, setAcn] = useState("");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [lookup, setLookup] = useState<LookupResponse>({ configured: true, suggestions: [] });

  // Keep the visible text in sync when the value is set externally (e.g. autofill),
  // but never stomp what the user is actively typing.
  useEffect(() => {
    if (!open) setDisplayValue(value);
  }, [value, open]);

  useEffect(() => {
    const query = displayValue.trim();
    if (!open || query.length < 3) {
      setLookup((current) => ({ ...current, suggestions: [], error: undefined }));
      return;
    }
    const controller = new AbortController();
    const timer = window.setTimeout(async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams({ q: query });
        const response = await fetch(`/api/vibe-marketing/lookups/abns?${params.toString()}`, {
          signal: controller.signal,
        });
        const data = (await response.json()) as LookupResponse;
        setLookup({
          configured: data.configured ?? true,
          suggestions: Array.isArray(data.suggestions) ? data.suggestions : [],
          error: data.error,
        });
        setActiveIndex(0);
      } catch {
        if (!controller.signal.aborted) {
          setLookup({ configured: true, suggestions: [], error: "ABN lookup is unavailable." });
        }
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }, 600);
    return () => {
      window.clearTimeout(timer);
      controller.abort();
    };
  }, [displayValue, open]);

  const selectOption = (option: VibeMarketingAbnSuggestion) => {
    onChange(option.abn);
    setAcn(option.acn ?? "");
    setDisplayValue(option.abn);
    setLookup((current) => ({ ...current, suggestions: [] }));
    setOpen(false);
    onSelect?.(option);
  };

  const handleType = (next: string) => {
    setDisplayValue(next);
    setAcn(""); // a manually edited ABN is no longer tied to a selected company's ACN
    if (isNumericAbnQuery(next)) onChange(next);
    setOpen(true);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    const suggestions = lookup.suggestions ?? [];
    if (!open || suggestions.length === 0) return;
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActiveIndex((index) => (index + 1) % suggestions.length);
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex((index) => (index - 1 + suggestions.length) % suggestions.length);
    } else if (event.key === "Enter") {
      event.preventDefault();
      selectOption(suggestions[activeIndex]);
    } else if (event.key === "Escape") {
      setOpen(false);
    }
  };

  const suggestions = lookup.suggestions ?? [];

  return (
    <div className="relative">
      <input type="hidden" name="abn" value={value} />
      <input type="hidden" name="acn" value={acn} />
      {leadingIcon}
      <input
        value={displayValue}
        onChange={(event) => handleType(event.target.value)}
        onFocus={() => setOpen(true)}
        onBlur={() => window.setTimeout(() => setOpen(false), 120)}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        autoComplete="off"
        placeholder={placeholder}
        className={inputClassName}
      />
      {open && (suggestions.length > 0 || loading || lookup.error || lookup.configured === false) ? (
        <div className="absolute z-30 mt-2 w-full overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg">
          {suggestions.map((option, index) => (
            <button
              key={`${option.abn}-${index}`}
              type="button"
              onMouseDown={(event) => event.preventDefault()}
              onClick={() => selectOption(option)}
              className={`flex w-full flex-col items-start gap-0.5 px-4 py-3 text-left text-sm transition ${
                index === activeIndex ? "bg-violet-50 text-violet-900" : "text-gray-800 hover:bg-gray-50"
              }`}
            >
              <span className="font-bold">{option.entityName || option.businessName || option.abn}</span>
              <span className="text-xs font-semibold text-gray-500">{suggestionLabel(option)}</span>
            </button>
          ))}
          {(loading || lookup.error || lookup.configured === false) ? (
            <div className="px-4 py-2.5 text-xs font-semibold text-gray-500">
              {loading
                ? "Searching the business register…"
                : lookup.configured === false
                  ? "Business lookup isn't configured — type your ABN manually."
                  : lookup.error}
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
