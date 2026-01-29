import { j as jsxRuntimeExports } from "./server-build-DGuowwjZ.js";
const ACCENT_STYLES = {
  purple: {
    background: "bg-[#2b0f70]",
    overlay: "bg-[radial-gradient(circle_at_20%_15%,rgba(0,255,215,0.16),transparent_32%),radial-gradient(circle_at_80%_5%,rgba(255,61,0,0.14),transparent_30%)]",
    button: "bg-white text-black focus-visible:ring-offset-[#2b0f70]"
  },
  cyan: {
    background: "bg-[#0d9488]",
    overlay: "bg-[radial-gradient(circle_at_20%_15%,rgba(255,255,255,0.2),transparent_32%),radial-gradient(circle_at_80%_5%,rgba(0,0,0,0.12),transparent_30%)]",
    button: "bg-white text-black focus-visible:ring-offset-[#0d9488]"
  },
  orange: {
    background: "bg-[#ff3d00]",
    overlay: "bg-[radial-gradient(circle_at_20%_15%,rgba(255,255,255,0.2),transparent_32%),radial-gradient(circle_at_80%_5%,rgba(0,0,0,0.12),transparent_30%)]",
    button: "bg-white text-black focus-visible:ring-offset-[#ff3d00]"
  }
};
const DEFAULT_PREVIEW_CARDS = [
  {
    title: "Experiment Card",
    subtitle: "Preview",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xl", children: "🗒️" }),
    color: "bg-[#ff3d00]",
    textColor: "text-white",
    rotationClass: "rotate-[-6deg]"
  },
  {
    title: "Decision Log",
    subtitle: "Preview",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xl", children: "🧠" }),
    color: "bg-[#00ffd7]",
    textColor: "text-black",
    rotationClass: "rotate-[7deg]"
  }
];
function ArticleResourceCTA({
  eyebrow = "Free download",
  title,
  description,
  buttonLabel,
  buttonHref,
  accent = "purple",
  previewCards = DEFAULT_PREVIEW_CARDS
}) {
  const styles = ACCENT_STYLES[accent];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "my-12 relative overflow-hidden rounded-[36px] p-8 sm:p-12 shadow-[0_25px_80px_-30px_rgba(0,0,0,0.55)] not-prose", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `absolute inset-0 ${styles.background}` }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `absolute inset-0 ${styles.overlay}` }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10 grid items-center gap-10 lg:grid-cols-[1.4fr_1fr]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5 text-white", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-extrabold uppercase tracking-[0.2em] text-white", children: eyebrow }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-3xl sm:text-4xl font-black leading-tight", children: title }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/90 leading-relaxed text-lg max-w-xl", children: description }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pt-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "a",
          {
            href: buttonHref,
            className: `inline-flex items-center justify-center rounded-full px-7 sm:px-8 py-3.5 text-lg font-black shadow-[0_16px_40px_-18px_rgba(0,0,0,0.7)] transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/60 focus-visible:ring-offset-2 ${styles.button}`,
            children: buttonLabel
          }
        ) })
      ] }),
      previewCards && previewCards.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative flex items-end justify-center gap-6 lg:justify-end", children: previewCards.map((card, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: `relative w-36 sm:w-44 md:w-48 aspect-[2/3] rounded-2xl ${card.color ?? "bg-white"} ${card.textColor ?? "text-black"} shadow-[0_28px_70px_-20px_rgba(0,0,0,0.78)] ${card.rotationClass ?? ""} transition-transform duration-300 hover:-translate-y-1`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 rounded-2xl border border-white/20" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex h-full flex-col items-center justify-center gap-3 text-center px-4", children: [
              card.icon && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `h-10 w-10 rounded-full border-2 border-current flex items-center justify-center`, children: card.icon }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg font-bold leading-tight", children: card.title }),
              card.subtitle && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold opacity-80", children: card.subtitle })
            ] })
          ]
        },
        card.title + idx
      )) })
    ] })
  ] });
}
export {
  ArticleResourceCTA as A
};
