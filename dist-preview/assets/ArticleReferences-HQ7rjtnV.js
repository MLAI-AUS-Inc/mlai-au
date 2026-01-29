import { j as jsxRuntimeExports } from "./server-build-DGuowwjZ.js";
import { a as reactExports } from "./worker-entry-BTvr0DWh.js";
function ChevronRightIcon({
  title,
  titleId,
  ...props
}, svgRef) {
  return /* @__PURE__ */ reactExports.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: svgRef,
    "aria-labelledby": titleId
  }, props), title ? /* @__PURE__ */ reactExports.createElement("title", {
    id: titleId
  }, title) : null, /* @__PURE__ */ reactExports.createElement("path", {
    fillRule: "evenodd",
    d: "M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z",
    clipRule: "evenodd"
  }));
}
const ForwardRef = /* @__PURE__ */ reactExports.forwardRef(ChevronRightIcon);
const categoryStyles = {
  government: {
    indicator: "bg-green-100 text-green-500",
    badge: "bg-green-50 text-green-700 ring-green-600/15",
    label: "Government"
  },
  guide: {
    indicator: "bg-indigo-100 text-indigo-500",
    badge: "bg-indigo-50 text-indigo-700 ring-indigo-600/15",
    label: "Guide"
  },
  analysis: {
    indicator: "bg-sky-100 text-sky-500",
    badge: "bg-sky-50 text-sky-700 ring-sky-600/15",
    label: "Analysis"
  },
  industry: {
    indicator: "bg-amber-100 text-amber-500",
    badge: "bg-amber-50 text-amber-700 ring-amber-600/15",
    label: "Industry"
  },
  watchlist: {
    indicator: "bg-rose-100 text-rose-500",
    badge: "bg-rose-50 text-rose-700 ring-rose-600/15",
    label: "Watchlist"
  }
};
const defaultIndicator = "bg-gray-100 text-gray-400";
const defaultBadge = "bg-gray-50 text-gray-600 ring-gray-500/10";
const sanitizeHostname = (href) => {
  try {
    return new URL(href).hostname.replace(/^www\./, "");
  } catch (error) {
    return href;
  }
};
function ArticleReferences({
  references,
  heading = "References",
  description,
  headingId = "references-heading",
  previewCount = 3
}) {
  if (!references?.length) {
    return null;
  }
  const previewReferences = references.slice(0, previewCount);
  const remainingReferences = references.slice(previewCount);
  const hasMore = remainingReferences.length > 0;
  const renderReferenceItem = (reference) => {
    const variant = reference.category ? categoryStyles[reference.category] : void 0;
    const badgeLabel = variant?.label ?? sanitizeHostname(reference.href);
    const metaParts = [
      reference.publisher,
      reference.description || sanitizeHostname(reference.href)
    ].filter(Boolean);
    const metaLine = metaParts.join(" • ");
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "li",
      {
        className: "relative flex items-center gap-1.5 px-2 py-0 my-0 sm:gap-2 sm:px-2.5",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-w-0 flex-auto my-1", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex min-w-0 items-center gap-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: `flex-none rounded-full p-0.5 ${variant?.indicator ?? defaultIndicator}`,
                children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block size-[5px] rounded-full bg-current" })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-auto", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "min-w-0 my-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "a",
                {
                  href: reference.href,
                  target: "_blank",
                  rel: "noopener noreferrer",
                  className: "flex min-w-0 items-center gap-1 text-[12px] font-semibold leading-tight text-slate-900",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex-none font-mono text-[9px] text-slate-500", children: [
                      "[",
                      reference.id,
                      "]"
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate", children: reference.title }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute inset-0" })
                  ]
                }
              ) }),
              metaLine ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] leading-tight text-slate-500", children: metaLine }) : null
            ] })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: `flex-none self-center rounded-full px-2 py-1 text-[9px] font-medium ring-1 ring-inset ${variant?.badge ?? defaultBadge}`,
              children: badgeLabel
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            ForwardRef,
            {
              "aria-hidden": "true",
              className: "hidden size-3 flex-none text-gray-300 sm:block"
            }
          )
        ]
      },
      reference.id
    );
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { "aria-labelledby": headingId, className: "mt-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-between gap-3 px-1 pb-0.5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { id: headingId, className: "text-sm font-semibold text-slate-900", children: heading }),
      description ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-slate-600", children: description }) : null
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-md border border-gray-100 bg-white", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { role: "list", className: "divide-y divide-gray-200", children: previewReferences.map(renderReferenceItem) }),
      hasMore && /* @__PURE__ */ jsxRuntimeExports.jsxs("details", { className: "group border-t border-gray-100", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("summary", { className: "flex cursor-pointer items-center justify-center gap-1.5 px-2 py-0.5 text-[10px] font-medium text-slate-700 transition marker:content-[''] hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/60", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "group-open:hidden", children: [
            "Show all ",
            references.length,
            " references (",
            remainingReferences.length,
            " more)"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden group-open:inline", children: "Show less" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            ForwardRef,
            {
              "aria-hidden": "true",
              className: "size-3 transition-transform group-open:-rotate-90"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { role: "list", className: "divide-y divide-gray-200 border-t border-gray-200", children: remainingReferences.map(renderReferenceItem) })
      ] })
    ] })
  ] });
}
export {
  ArticleReferences as A
};
