import { j as jsxRuntimeExports, I as ImageWithFallback, c as clsx } from "./server-build-DGuowwjZ.js";
import { f as Link } from "./worker-entry-BTvr0DWh.js";
function AuthorBio({ author, authors, className = "" }) {
  const authorList = authors ?? (author ? [author] : []);
  if (authorList.length === 0) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `not-prose mt-12 rounded-[28px] border border-gray-300 bg-[#f8f3e8] p-7 md:p-9 ${className}`, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "text-xl font-semibold text-black mb-6 flex items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { className: "w-5 h-5 text-black", fill: "none", viewBox: "0 0 24 24", strokeWidth: 1.5, stroke: "currentColor", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" }) }),
      "About the ",
      authorList.length > 1 ? "Authors" : "Author"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `grid gap-6 ${authorList.length > 1 ? "md:grid-cols-3" : "md:grid-cols-1 max-w-sm mx-auto"}`, children: authorList.map((person, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx(ComponentWrapper, { href: person.url, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col h-full items-center text-center p-4 rounded-xl border border-black/30 bg-white/40 backdrop-blur-[1px] transition-all hover:-translate-y-1 hover:border-black", children: [
      person.avatarUrl && /* @__PURE__ */ jsxRuntimeExports.jsx(
        "img",
        {
          src: person.avatarUrl,
          alt: person.name,
          className: "w-20 h-20 rounded-full object-cover ring-2 ring-gray-100 mb-4"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-semibold text-gray-900", children: person.name }),
      person.role && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-gray-700 font-medium mb-2", children: person.role }),
      person.bio && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-gray-700 leading-relaxed", children: person.bio })
    ] }) }, person.name + idx)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-6 text-xs text-gray-600 text-center", children: "AI-assisted drafting, human-edited and reviewed." })
  ] });
}
function ComponentWrapper({ href, children }) {
  if (href) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "a",
      {
        href,
        target: "_blank",
        rel: "noopener noreferrer",
        className: "block no-underline",
        children
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children });
}
function ArticleFAQ({
  items,
  anchorId = "faq",
  heading = "Frequently Asked Questions"
}) {
  if (!items || items.length === 0) {
    return null;
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { id: anchorId, className: "mt-10", children: heading }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 space-y-6", children: items.map((item, index) => {
      const question = item.question ?? item.q ?? `Question ${index + 1}`;
      const answer = item.answer ?? item.a ?? "";
      const key = question || `faq-${index}`;
      return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-base font-semibold text-gray-900", children: question }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-gray-700", children: answer })
      ] }, key);
    }) })
  ] });
}
function ArticleHeroHeader({
  breadcrumbs,
  title,
  titleHighlight,
  headerBgColor = "cyan",
  summary,
  heroImage,
  heroImageAlt = "Article hero image"
}) {
  const titleParts = titleHighlight ? title.replace(titleHighlight, `|||${titleHighlight}|||`).split("|||").filter(Boolean) : [title];
  const bgColorMap = {
    cyan: "bg-[#00ffd7]",
    purple: "bg-[#5b21b6]",
    blue: "bg-[#3537dc]",
    orange: "bg-[#ff3d00]"
  };
  const textColorMap = {
    cyan: "text-black",
    purple: "text-white",
    blue: "text-white",
    orange: "text-white"
  };
  const breadcrumbLinkColor = {
    cyan: "text-black/70 hover:text-black",
    purple: "text-white/70 hover:text-white",
    blue: "text-white/70 hover:text-white",
    orange: "text-white/70 hover:text-white"
  };
  const highlightColor = headerBgColor === "cyan" ? "text-[#ff3d00]" : "text-[#ff3d00]";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "not-prose mb-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `${bgColorMap[headerBgColor]} rounded-2xl px-6 py-8 sm:px-10 sm:py-12 lg:px-14 lg:py-16`, children: [
      breadcrumbs && breadcrumbs.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("nav", { "aria-label": "Breadcrumb", className: "mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("ol", { className: "flex items-center gap-2 text-sm font-medium", children: breadcrumbs.map((item, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-center gap-2", children: [
        index > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `${textColorMap[headerBgColor]} opacity-50`, children: "/" }),
        item.href && !item.current ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          Link,
          {
            to: item.href,
            className: `${breadcrumbLinkColor[headerBgColor]} transition-colors underline-offset-4 hover:underline flex items-center gap-1`,
            children: item.icon ? /* @__PURE__ */ jsxRuntimeExports.jsx(item.icon, { className: "h-4 w-4" }) : item.label
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `${textColorMap[headerBgColor]} ${item.current ? "font-semibold" : ""} flex items-center gap-1`, children: item.icon ? /* @__PURE__ */ jsxRuntimeExports.jsx(item.icon, { className: "h-4 w-4" }) : item.label })
      ] }, index)) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "h1",
        {
          className: `text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight tracking-tight ${textColorMap[headerBgColor]}`,
          style: { fontFamily: "'Georgia', 'Times New Roman', serif" },
          children: titleParts.map((part, index) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              className: part === titleHighlight ? highlightColor : "",
              children: part
            },
            index
          ))
        }
      )
    ] }),
    (summary || heroImage) && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4", children: [
      summary && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-[#ff3d00] rounded-2xl p-6 sm:p-8 text-white", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xs sm:text-sm font-bold uppercase tracking-wider mb-3", children: summary.heading }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm sm:text-base leading-relaxed mb-4 opacity-90", children: summary.intro }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-3", children: summary.items.map((item, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex gap-3 text-sm sm:text-base", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              "aria-hidden": true,
              className: "mt-1.5 h-2.5 w-2.5 flex-none rounded-full bg-black flex-shrink-0"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold m-0", children: item.label }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "m-0 mt-0.5 opacity-85 text-sm leading-snug", children: item.description })
          ] })
        ] }, index)) })
      ] }),
      heroImage && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-2xl overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        ImageWithFallback,
        {
          src: heroImage,
          alt: heroImageAlt,
          width: 800,
          height: 500,
          className: "w-full h-full object-cover min-h-[280px]"
        }
      ) })
    ] })
  ] });
}
function ArticleImageBlock({
  src,
  alt,
  width = 1200,
  height = 800,
  containerClassName = "",
  imageClassName = ""
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `my-12 max-w-3xl mx-auto ${containerClassName}`, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
    ImageWithFallback,
    {
      src,
      alt,
      width,
      height,
      className: `w-full rounded-3xl shadow-2xl ring-1 ring-gray-900/10 ${imageClassName}`
    }
  ) });
}
function ArticleFooterNav({
  backHref = "/articles",
  backLabel = "← Back to Articles",
  topHref = "#",
  className = ""
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `mt-12 pt-6 border-t border-gray-100 text-sm text-gray-500 flex justify-between ${className}`, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: backHref, className: "hover:text-[--brand-ink] underline-offset-4 hover:underline", children: backLabel }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: topHref, className: "hover:text-[--brand-ink] underline-offset-4 hover:underline", children: "Top of page ↑" })
  ] });
}
function QuoteBlock({
  title,
  icon,
  variant = "purple",
  children,
  className
}) {
  const variants = {
    purple: {
      bg: "bg-[#4b1bd1]",
      text: "text-white",
      accent: "text-white"
    },
    orange: {
      bg: "bg-[#ff3d00]",
      text: "text-white",
      accent: "text-white"
    }
  };
  const palette = variants[variant];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: clsx(
        "not-prose rounded-[28px] px-6 sm:px-8 py-6 sm:py-7",
        palette.bg,
        palette.text,
        className
      ),
      children: [
        (title || icon) && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-3", children: [
          icon ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xl", children: icon }) : null,
          title ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: clsx("text-base font-semibold leading-none", palette.accent), children: title }) : null
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-base leading-relaxed font-normal", children })
      ]
    }
  );
}
function ArticleTocPlaceholder({ className, noMargin }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      "data-article-toc-placeholder": true,
      className: clsx(
        "not-prose rounded-[32px] border border-gray-300 bg-transparent px-8 py-7 text-gray-900",
        noMargin ? null : "my-12",
        className
      )
    }
  );
}
export {
  ArticleHeroHeader as A,
  QuoteBlock as Q,
  ArticleTocPlaceholder as a,
  ArticleImageBlock as b,
  ArticleFAQ as c,
  AuthorBio as d,
  ArticleFooterNav as e
};
