import { ChevronRightIcon } from "@heroicons/react/20/solid";

type ReferenceCategory =
  | "government"
  | "guide"
  | "analysis"
  | "industry"
  | "watchlist";

type ReferenceItem = {
  id: number;
  href: string;
  title: string;
  publisher: string;
  description?: string;
  category?: ReferenceCategory | string;
};

type ArticleReferencesProps = {
  references: ReferenceItem[];
  heading?: string;
  description?: string;
  headingId?: string;
  previewCount?: number;
};

const categoryStyles: Record<string, { indicator: string; badge: string; label: string }> = {
  government: {
    indicator: "bg-green-100 text-green-500",
    badge: "bg-green-50 text-green-700 ring-green-600/15",
    label: "Government",
  },
  guide: {
    indicator: "bg-indigo-100 text-indigo-500",
    badge: "bg-indigo-50 text-indigo-700 ring-indigo-600/15",
    label: "Guide",
  },
  analysis: {
    indicator: "bg-sky-100 text-sky-500",
    badge: "bg-sky-50 text-sky-700 ring-sky-600/15",
    label: "Analysis",
  },
  industry: {
    indicator: "bg-amber-100 text-amber-500",
    badge: "bg-amber-50 text-amber-700 ring-amber-600/15",
    label: "Industry",
  },
  watchlist: {
    indicator: "bg-rose-100 text-rose-500",
    badge: "bg-rose-50 text-rose-700 ring-rose-600/15",
    label: "Watchlist",
  },
};

const defaultIndicator = "bg-gray-100 text-gray-400";
const defaultBadge = "bg-gray-50 text-gray-600 ring-gray-500/10";

const sanitizeHostname = (href: string) => {
  try {
    return new URL(href).hostname.replace(/^www\./, "");
  } catch (error) {
    return href;
  }
};

export function ArticleReferences({
  references,
  heading = "References",
  description,
  headingId = "references-heading",
  previewCount = 3,
}: ArticleReferencesProps) {
  if (!references?.length) {
    return null;
  }

  const previewReferences = references.slice(0, previewCount);
  const remainingReferences = references.slice(previewCount);
  const hasMore = remainingReferences.length > 0;

  const renderReferenceItem = (reference: ReferenceItem) => {
    const variant = reference.category
      ? categoryStyles[reference.category]
      : undefined;
    const badgeLabel = variant?.label ?? sanitizeHostname(reference.href);
    const metaParts = [
      reference.publisher,
      reference.description || sanitizeHostname(reference.href),
    ].filter(Boolean) as string[];
    const metaLine = metaParts.join(" • ");

    return (
      <li
        key={reference.id}
        className="relative flex items-center gap-1.5 px-2 py-0 my-0 sm:gap-2 sm:px-2.5"
      >
        <div className="min-w-0 flex-auto my-1">
          <div className="flex min-w-0 items-center gap-1.5">
            <div
              className={`flex-none rounded-full p-0.5 ${variant?.indicator ?? defaultIndicator
                }`}
            >
              <span className="block size-[5px] rounded-full bg-current" />
            </div>
            <div className="min-w-0 flex-auto">
              <h3 className="min-w-0 my-2">
                <a
                  href={reference.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex min-w-0 items-center gap-1 text-[12px] font-semibold leading-tight text-slate-900"
                >
                  <span className="flex-none font-mono text-[9px] text-slate-500">
                    [{reference.id}]
                  </span>
                  <span className="truncate">{reference.title}</span>
                  <span className="absolute inset-0" />
                </a>
              </h3>
              {metaLine ? (
                <p className="text-[10px] leading-tight text-slate-500">{metaLine}</p>
              ) : null}
            </div>
          </div>
        </div>

        <div
          className={`flex-none self-center rounded-full px-2 py-1 text-[9px] font-medium ring-1 ring-inset ${variant?.badge ?? defaultBadge
            }`}
        >
          {badgeLabel}
        </div>

        <ChevronRightIcon
          aria-hidden="true"
          className="hidden size-3 flex-none text-gray-300 sm:block"
        />
      </li>
    );
  };

  return (
    <section aria-labelledby={headingId} className="mt-2">
      <div className="flex items-center justify-between gap-3 px-1 pb-0.5">
        <div className="flex flex-col">
          <h2 id={headingId} className="text-sm font-semibold text-slate-900">
            {heading}
          </h2>
          {description ? (
            <p className="text-[11px] text-slate-600">{description}</p>
          ) : null}
        </div>
      </div>

      <div className="rounded-md border border-gray-100 bg-white">
        <ul role="list" className="divide-y divide-gray-200">
          {previewReferences.map(renderReferenceItem)}
        </ul>

        {hasMore && (
          <details className="group border-t border-gray-100">
            <summary className="flex cursor-pointer items-center justify-center gap-1.5 px-2 py-0.5 text-[10px] font-medium text-slate-700 transition marker:content-[''] hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/60">
              <span className="group-open:hidden">
                Show all {references.length} references ({remainingReferences.length} more)
              </span>
              <span className="hidden group-open:inline">Show less</span>
              <ChevronRightIcon
                aria-hidden="true"
                className="size-3 transition-transform group-open:-rotate-90"
              />
            </summary>
            <ul role="list" className="divide-y divide-gray-200 border-t border-gray-200">
              {remainingReferences.map(renderReferenceItem)}
            </ul>
          </details>
        )}
      </div>
    </section>
  );
}

export type { ReferenceItem };
