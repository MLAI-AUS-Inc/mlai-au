import { j as jsxRuntimeExports } from "./server-build-DGuowwjZ.js";
import { f as Link } from "./worker-entry-BTvr0DWh.js";
const VARIANT_STYLES = {
  info: {
    border: "border-teal-500",
    background: "bg-teal-50/60",
    title: "text-gray-900",
    text: "text-gray-800"
  },
  success: {
    border: "border-emerald-500",
    background: "bg-emerald-50/70",
    title: "text-gray-900",
    text: "text-gray-800"
  },
  warning: {
    border: "border-amber-500",
    background: "bg-amber-50/70",
    title: "text-gray-900",
    text: "text-gray-800"
  },
  brand: {
    border: "border-[--brand]",
    background: "bg-[--soft]",
    title: "text-gray-900",
    text: "text-gray-800"
  }
};
function ArticleCallout({
  title,
  icon,
  variant = "info",
  children,
  className = ""
}) {
  const styles = VARIANT_STYLES[variant];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `my-8 border-l-4 ${styles.border} ${styles.background} pl-6 py-4 pr-4 rounded-r-lg ${className}`, children: [
    title && /* @__PURE__ */ jsxRuntimeExports.jsxs("h4", { className: `font-semibold ${styles.title} flex items-center gap-2`, children: [
      icon ?? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xl", children: "💡" }),
      title
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `mt-1 ${styles.text}`, children })
  ] });
}
function MLAITemplateResourceCTA({ className = "" }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: `my-8 rounded-lg border-l-4 border-[#1028E0] bg-[#1028E0]/5 p-6 ${className}`, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start space-x-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-8 w-8 items-center justify-center rounded-lg bg-[#1028E0]", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-semibold text-white", children: "📝" }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mb-2 text-lg font-semibold text-[#1028E0]", children: "Free MLAI Template Resource" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-4 text-gray-700", children: "Download our comprehensive template and checklist to structure your approach systematically. Created by the MLAI community for Australian startups and teams." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Link,
        {
          to: "/resources",
          className: "inline-block rounded-lg bg-[#1028E0] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#1020C2] focus:outline-none focus:ring-2 focus:ring-blue-500",
          children: "Access free templates"
        }
      )
    ] })
  ] }) });
}
export {
  ArticleCallout as A,
  MLAITemplateResourceCTA as M
};
