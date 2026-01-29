import { a as reactExports } from "./worker-entry-BTvr0DWh.js";
import { j as jsxRuntimeExports, c as clsx } from "./server-build-DGuowwjZ.js";
function RocketLaunchIcon({
  title,
  titleId,
  ...props
}, svgRef) {
  return /* @__PURE__ */ reactExports.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: svgRef,
    "aria-labelledby": titleId
  }, props), title ? /* @__PURE__ */ reactExports.createElement("title", {
    id: titleId
  }, title) : null, /* @__PURE__ */ reactExports.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M15.59 14.37a6 6 0 0 1-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 0 0 6.16-12.12A14.98 14.98 0 0 0 9.631 8.41m5.96 5.96a14.926 14.926 0 0 1-5.841 2.58m-.119-8.54a6 6 0 0 0-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 0 0-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 0 1-2.448-2.448 14.9 14.9 0 0 1 .06-.312m-2.24 2.39a4.493 4.493 0 0 0-1.757 4.306 4.493 4.493 0 0 0 4.306-1.758M16.5 9a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z"
  }));
}
const ForwardRef = /* @__PURE__ */ reactExports.forwardRef(RocketLaunchIcon);
const variantStyles = {
  orange: {
    bg: "bg-[#ff3d00]",
    text: "text-white",
    iconBg: "bg-white/15",
    desc: "text-white/90"
  },
  purple: {
    bg: "bg-[#4b1bd1]",
    text: "text-white",
    iconBg: "bg-white/15",
    desc: "text-white/90"
  },
  yellow: {
    bg: "bg-[#ffe900]",
    text: "text-black",
    iconBg: "bg-black/10",
    desc: "text-black/80"
  }
};
function AudienceGrid({ heading, cards, className }) {
  if (!cards || cards.length === 0) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: clsx("not-prose", className), children: [
    heading ? /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-3xl sm:text-4xl font-bold mb-6", children: heading }) : null,
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-4 sm:gap-6 md:grid-cols-3", children: cards.map((card, idx) => {
      const styles = variantStyles[card.variant ?? "orange"];
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: clsx(
            "rounded-[22px] p-6 sm:p-7 transition-transform duration-200 hover:-translate-y-1",
            styles.bg,
            styles.text
          ),
          children: [
            card.icon ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: clsx("mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg", styles.iconBg), children: card.icon }) : null,
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xl font-bold mb-2", children: card.title }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: clsx("text-sm leading-relaxed", styles.desc), children: card.description })
          ]
        },
        `${card.title}-${idx}`
      );
    }) })
  ] });
}
export {
  AudienceGrid as A,
  ForwardRef as F
};
