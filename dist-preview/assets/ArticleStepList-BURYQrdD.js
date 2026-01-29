import { j as jsxRuntimeExports } from "./server-build-DGuowwjZ.js";
import { f as Link } from "./worker-entry-BTvr0DWh.js";
function ArticleCompanyCTA({
  title,
  body,
  buttonText,
  buttonHref,
  note,
  id,
  className = ""
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { id, className: `my-12 bg-transparent border border-gray-400 rounded-2xl p-8 text-center ${className}`, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-bold text-gray-900 mb-3", children: title }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-600 mb-6 max-w-2xl mx-auto", children: body }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Link,
      {
        to: buttonHref,
        className: "inline-block rounded-full bg-purple-600 px-8 py-3 text-sm font-semibold text-white shadow-sm hover:bg-purple-700 transition-colors",
        children: buttonText
      }
    ),
    note ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-gray-500 mt-4", children: note }) : null
  ] });
}
const ACCENT_CLASSNAMES = {
  teal: {
    container: "bg-transparent border-gray-400",
    bulletBg: "bg-[--brand]",
    bulletText: "text-[--accent]"
  },
  brand: {
    container: "bg-transparent border-gray-400",
    bulletBg: "bg-[--brand]",
    bulletText: "text-[--accent]"
  },
  indigo: {
    container: "bg-transparent border-gray-400",
    bulletBg: "bg-indigo-100",
    bulletText: "text-indigo-600"
  }
};
function ArticleStepList({
  title,
  steps,
  accent = "teal",
  className = ""
}) {
  const styles = ACCENT_CLASSNAMES[accent];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `mt-8 mb-8 rounded-3xl p-6 border ${styles.container} ${className}`, children: [
    title && /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-bold text-gray-900 mb-4", children: title }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-3", children: steps.map((step, idx) => {
      const label = typeof step === "string" ? step : step.label;
      return /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex gap-3 text-gray-700", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold ${styles.bulletBg} ${styles.bulletText}`, children: idx + 1 }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: label })
      ] }, idx);
    }) })
  ] });
}
export {
  ArticleStepList as A,
  ArticleCompanyCTA as a
};
