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
  /** Kept for existing article data. The list does not show it. */
  category?: ReferenceCategory | string;
};

type ArticleReferencesProps = {
  references: ReferenceItem[];
  heading?: string;
  description?: string;
  headingId?: string;
  previewCount?: number;
};

const sanitizeHostname = (href: string) => {
  try {
    return new URL(href).hostname.replace(/^www\./, "");
  } catch {
    return "";
  }
};

const sameLabel = (left: string, right: string) =>
  left.replace(/^www\./i, "").toLowerCase() ===
  right.replace(/^www\./i, "").toLowerCase();

// Publisher, then the link's domain when it says something the publisher
// does not. Generated references often use the domain as the publisher, and
// showing it twice ("business.gov.au · business.gov.au") read as a glitch.
const referenceMetaLine = (reference: Pick<ReferenceItem, "href" | "publisher">) => {
  const publisher = reference.publisher?.trim() ?? "";
  const hostname = sanitizeHostname(reference.href);
  const parts = [publisher];
  if (hostname && !sameLabel(publisher, hostname)) {
    parts.push(hostname);
  }
  return parts.filter(Boolean).join(" · ");
};

// The list sits in the same outlined box as the table of contents: 32px
// radius, gray-300 border, transparent background, an uppercase label and
// indigo underlined links, with stock rem text sizes.
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
    const metaLine = referenceMetaLine(reference);

    return (
      // Inline citations can link to #<headingId>-<id>. The item sets its own
      // type size so wrapped titles do not take the article's prose-lg leading.
      <li key={reference.id} id={`${headingId}-${reference.id}`} className="flex gap-3 text-sm leading-6">
        <span className="w-8 flex-none text-sm leading-6 font-semibold tabular-nums text-gray-500">
          [{reference.id}]
        </span>
        <div className="min-w-0 flex-1">
          <a
            href={reference.href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm leading-6 font-medium text-indigo-700 underline underline-offset-4 break-words hover:text-indigo-800 transition-colors"
          >
            {reference.title}
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
          {metaLine ? (
            <p className="m-0 text-xs leading-5 text-gray-600">{metaLine}</p>
          ) : null}
          {reference.description ? (
            <p className="m-0 mt-1 text-sm leading-6 text-gray-700">{reference.description}</p>
          ) : null}
        </div>
      </li>
    );
  };

  return (
    <section
      aria-labelledby={headingId}
      data-cf-component-id="references"
      data-cf-component-type="references"
      data-cf-component-label="References"
      className="not-prose my-12 rounded-[32px] border border-gray-300 bg-transparent px-6 py-6 sm:px-8 sm:py-7 text-gray-900"
    >
      <h2
        id={headingId}
        className="m-0 text-xs font-semibold uppercase tracking-wide text-gray-700"
      >
        {heading}
      </h2>
      {description ? (
        <p className="m-0 mt-2 text-sm leading-6 text-gray-700">{description}</p>
      ) : null}

      <ol role="list" className="m-0 mt-4 list-none space-y-4 p-0">
        {previewReferences.map(renderReferenceItem)}
      </ol>

      {hasMore && (
        <details className="group mt-4 text-sm leading-6">
          <summary className="inline-flex cursor-pointer list-none items-center text-sm leading-6 font-medium text-indigo-700 underline underline-offset-4 transition-colors marker:content-[''] hover:text-indigo-800 focus:outline-none focus-visible:rounded-sm focus-visible:ring-2 focus-visible:ring-indigo-500/60 [&::-webkit-details-marker]:hidden">
            <span className="group-open:hidden">
              Show all {references.length} references ({remainingReferences.length} more)
            </span>
            <span className="hidden group-open:inline">Show fewer references</span>
          </summary>
          <ol role="list" className="m-0 mt-4 list-none space-y-4 p-0">
            {remainingReferences.map(renderReferenceItem)}
          </ol>
        </details>
      )}
    </section>
  );
}

export type { ReferenceItem };
