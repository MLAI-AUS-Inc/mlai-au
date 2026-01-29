import { j as jsxRuntimeExports, F as ForwardRef$2 } from "./server-build-DGuowwjZ.js";
import { f as Link } from "./worker-entry-BTvr0DWh.js";
import { A as ArticleHeroHeader, a as ArticleTocPlaceholder, b as ArticleImageBlock, Q as QuoteBlock, d as AuthorBio, c as ArticleFAQ, e as ArticleFooterNav } from "./ArticleTocPlaceholder-Do4c2OpE.js";
import { A as ArticleStepList, a as ArticleCompanyCTA } from "./ArticleStepList-BURYQrdD.js";
import { A as AudienceGrid, F as ForwardRef } from "./AudienceGrid-Cv0i5y2N.js";
import { A as ArticleResourceCTA } from "./ArticleResourceCTA-PGgKzCy1.js";
import { A as ArticleCallout, M as MLAITemplateResourceCTA } from "./MLAITemplateResourceCTA-BdznCDV4.js";
import { g as getDefaultArticleAuthorDetails } from "./authors-DzySQTZP.js";
import { H as House } from "./house-C2Qzo5EV.js";
import { F as ForwardRef$1 } from "./AcademicCapIcon-CU_w7ImP.js";
import "util";
import "stream";
import "path";
import "node:net";
import "node:stream";
import "node:events";
import "url";
import "crypto";
import "assert";
import "zlib";
import "events";
import "node:path";
import "node:url";
const useCustomHeader = true;
const TOPIC = "How can I learn artificial intelligence?";
const AUTHOR_PROFILE = getDefaultArticleAuthorDetails();
const AUTHOR = AUTHOR_PROFILE.name ?? "Dr Sam Donegan";
const AUTHOR_ROLE = AUTHOR_PROFILE.role ?? "Founder";
const AUTHOR_BIO = AUTHOR_PROFILE.bio ?? "";
const AUTHOR_AVATAR = AUTHOR_PROFILE.avatarUrl ?? "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=256&q=80";
const HERO_IMAGE = "https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Fhero-1049bac6-f2d7-498f-980d-6509040136eb.jpg?alt=media&token=af776564-016c-4863-9467-a5ad38e5f5c6";
const HERO_IMAGE_ALT = "Abstract teal circuit pattern representing an AI learning path";
const faqItems = [
  {
    id: 1,
    question: "Can I learn AI without knowing how to code?",
    answer: "Yes, you can learn concepts, prompt engineering, and use low/no‑code tools. For technical roles (ML engineer/data scientist), basic Python is expected. Start with notebooks (Google Colab, Jupyter) and learn just‑in‑time."
  },
  {
    id: 2,
    question: "What maths do I need for AI?",
    answer: "Start with data literacy and statistics (mean, variance, distributions), then light linear algebra (vectors/matrices) and probability. You can learn these alongside projects; you don’t need a full calculus refresher to begin."
  },
  {
    id: 3,
    question: "What kind of laptop do I need in 2026?",
    answer: "A recent CPU with 8–16 GB RAM is fine for learning and classic ML. Use cloud notebooks/GPUs when needed. Free tiers and quotas change frequently (as at 2026), so check provider terms before relying on them."
  },
  {
    id: 4,
    question: "How long does it take to learn AI?",
    answer: "With 5–7 hours/week, many learners cover fundamentals in 6–8 weeks and build a small portfolio in 3–6 months. Timelines vary by background, goals, and study intensity."
  },
  {
    id: 5,
    question: "Are certificates worth it in Australia?",
    answer: "Short courses and micro‑credentials can help structure learning and signal progress, but portfolios and demonstrated projects matter most to many employers. Focus on real, reviewable work and clear documentation."
  },
  {
    id: 6,
    question: "What about privacy and Responsible AI in Australia?",
    answer: /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      "Use privacy by design: minimise data, avoid sensitive/identifiable data, and document limitations. For current guidance, refer to the Office of the Australian Information Commissioner (OAIC) and your organisation’s policies (as at 2026). See",
      " ",
      /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "https://www.oaic.gov.au", target: "_blank", rel: "noopener noreferrer", children: "oaic.gov.au" }),
      "."
    ] })
  },
  {
    id: 7,
    question: "Do I have to learn deep learning before using generative AI?",
    answer: "No. Start with fundamentals (data, evaluation, prompt safety). Learn deep learning when your projects require it. Understanding limitations and evaluation often matters more than training large models from scratch."
  }
];
const summaryHighlights = {
  heading: `Key facts: ${TOPIC}`,
  intro: "Brief, factual overview referencing current Australian context (e.g. 2026 ecosystem norms, official guidance, privacy expectations, or common pathways).",
  items: [
    {
      label: "What should I learn first for AI?",
      description: "Start with Python, notebooks, and data literacy (Pandas), then core ML/GenAI concepts and simple evaluation."
    },
    {
      label: "Do I need maths or coding?",
      description: "Not to start. For technical roles, learn basic Python plus statistics/linear algebra alongside projects."
    },
    {
      label: "How long does it take?",
      description: "With 5–7 hrs/week: 6–8 weeks for fundamentals; 3–6 months for a small portfolio. Timelines vary."
    }
  ]
};
function ArticlePage() {
  const authorDetails = {
    name: AUTHOR,
    role: AUTHOR_ROLE,
    bio: AUTHOR_BIO,
    avatarUrl: AUTHOR_AVATAR
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      ArticleHeroHeader,
      {
        breadcrumbs: [
          { label: "Home", href: "/", icon: House },
          { label: "Articles", href: "/articles" },
          { label: TOPIC, current: true }
        ],
        title: TOPIC,
        titleHighlight: "(2026)",
        headerBgColor: "cyan",
        summary: summaryHighlights,
        heroImage: HERO_IMAGE,
        heroImageAlt: HERO_IMAGE_ALT
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 sm:px-6 lg:px-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(ArticleTocPlaceholder, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ArticleCallout, { variant: "info", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-gray-800", children: [
        "This guide is part of our broader series on ",
        TOPIC,
        ". Prefer to jump ahead?",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/articles", className: "font-semibold text-[--brand] underline-offset-4 hover:underline", children: "Browse related articles →" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        AudienceGrid,
        {
          cards: [
            {
              title: "Founders & Teams",
              description: "For leaders validating ideas, seeking funding, or managing teams.",
              icon: /* @__PURE__ */ jsxRuntimeExports.jsx(ForwardRef, { className: "h-6 w-6" }),
              variant: "orange"
            },
            {
              title: "Students & Switchers",
              description: "For those building portfolios, learning new skills, or changing careers.",
              icon: /* @__PURE__ */ jsxRuntimeExports.jsx(ForwardRef$1, { className: "h-6 w-6" }),
              variant: "purple"
            },
            {
              title: "Community Builders",
              description: "For workshop facilitators, mentors, and ecosystem supporters.",
              icon: /* @__PURE__ */ jsxRuntimeExports.jsx(ForwardRef$2, { className: "h-6 w-6" }),
              variant: "yellow"
            }
          ],
          className: "my-10"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "prose prose-lg max-w-none text-gray-700 prose-headings:text-gray-900 hover:prose-a:text-[--brand]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: TOPIC }),
          " — You don’t need a PhD to start. In Australia (2026), most people progress fastest by learning basic Python and data literacy, building a small project in a domain they care about, sharing results, and practising Responsible AI habits from day one."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ArticleImageBlock, { src: HERO_IMAGE, alt: HERO_IMAGE_ALT, width: 1200, height: 630 }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "What should I learn first for AI?" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Focus on practical foundations you can apply immediately:" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Python + notebooks:" }),
            " Jupyter or Google Colab for quick experiments."
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Data literacy:" }),
            " loading, cleaning, and exploring data with Pandas/NumPy; plotting basics."
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Core ML ideas:" }),
            " train/test split, evaluation (accuracy, precision/recall), overfitting, iteration."
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "GenAI basics:" }),
            " prompt writing, safety, hallucination checks, and simple evaluation."
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
          "Keep a mental model of the loop: ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("em", { children: "problem → data → model/tool → evaluate → improve" }),
          ". This is the same for classic ML and generative AI."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          ArticleResourceCTA,
          {
            title: `Download the ${TOPIC} checklist`,
            description: "Access a structured template to apply the steps in this guide.",
            buttonLabel: "Get the checklist",
            buttonHref: "/resources",
            accent: "purple"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          ArticleCallout,
          {
            title: "Pick a problem you genuinely care about",
            variant: "brand",
            icon: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xl", children: "💡" }),
            className: "not-prose",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-gray-800", children: "You’ll learn faster if your practice project matters to you (e.g., summarising policy PDFs, analysing sports stats, or batching admin tasks). Make the dataset small so you can iterate quickly." })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "Do I need maths or coding to learn AI?" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: "https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-af337c0c-b67e-4790-bb6c-77f76de5fa02.jpg?alt=media&token=06faa127-111b-44dc-8750-fed1bbde6dcf", alt: "Group of diverse individuals collaborating in a retro tech startup environment with vintage 90s film aesthetic.", className: "w-full rounded-lg my-8" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "You can start without both, but the more technical your goal, the more you’ll rely on them. For non‑technical roles (e.g., product or operations), focus on data literacy, evaluation, and safe tool use. For technical roles, learn Python and a little linear algebra and statistics alongside projects." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: "If you don’t code yet" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Spend two weeks with Python basics (variables, lists, functions) and notebooks. Learn just enough Pandas to load a CSV and make a chart. Automate one boring task." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: "If you’re comfortable coding" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Add scikit‑learn for classic ML and try a tiny end‑to‑end workflow. For GenAI, learn prompt patterns, retrieval‑augmented generation (RAG) basics, and simple evals." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          ArticleStepList,
          {
            title: "Practical steps",
            steps: [
              { label: "Define a clear goal (what should the model or tool help you decide/do?)" },
              { label: "Choose one stack: Python + notebooks + Pandas + scikit‑learn (starter) or a GenAI SDK" },
              { label: "Find a small dataset (public or synthetic); write your first baseline" },
              { label: "Evaluate, document trade‑offs, and share results (README + screenshots)" },
              { label: "Ask for feedback from a local community; iterate once more" }
            ],
            accent: "indigo"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(QuoteBlock, { title: "Expert insight", variant: "purple", children: "“The fastest learners keep projects small, measure results honestly, and share progress for feedback. Ship something imperfect, then improve it.”" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "Choose your path: self‑paced vs Australian qualifications" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: "https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-031434c3-6229-4046-a050-4bdf000b7c7b.jpg?alt=media&token=cd22c3a9-a966-41a8-a318-869a9be1d29f", alt: "People in a tech startup collaborate, embodying the exploration of self-paced vs Australian qualifications. 90s film aesthetic.", className: "w-full rounded-lg my-8" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "You have three common routes in Australia (as at 2026):" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Self‑paced online:" }),
            " global providers (e.g., vendor academies, MOOCs) for flexible fundamentals and applied projects."
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Australian micro‑credentials:" }),
            " short, stackable courses from universities and TAFE for structured learning and assessment."
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Formal degrees/grad certs:" }),
            " deeper theory and signals for research‑heavy roles; longer timelines and higher cost."
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: "How to decide" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Time and budget:" }),
            " start self‑paced if you need flexibility; add a micro‑credential if you want assessed work."
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Portfolio needs:" }),
            " pick options with project work, code reviews, and peer feedback."
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Recognition:" }),
            " check whether the program offers a statement of attainment or credit pathways."
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "Build a project portfolio (even without a GPU)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "You can learn a lot without training big models. Use small datasets and pre‑trained models, and rely on cloud notebooks for bursts of compute. For data, try public sources (e.g., data.gov.au, ABS) or create synthetic data when privacy is a concern." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Classic ML:" }),
            " tabular datasets + scikit‑learn; aim for explainability and evaluation."
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "GenAI:" }),
            " summarise documents, build a FAQ bot with RAG, or prototype a content workflow. Track quality, cost, and safety."
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Reproducibility:" }),
            " package your work with a README, environment file, and example inputs/outputs."
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "Responsible and private by default: Australian expectations" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Australia’s privacy and safety expectations emphasise data minimisation, transparency, and accountability. Treat personal or sensitive data with care, prefer public or synthetic datasets, and document known limitations. Check current OAIC guidance and your organisation’s policies (as at 2026)." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "How long does it take — and what does it cost?" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Timelines and costs vary widely. A common pattern is 6–8 weeks for fundamentals (5–7 hrs/week), 3–6 months to complete 2–3 portfolio projects, and 6–12 months to be competitive for junior technical roles. Self‑paced options can be low‑cost; assessed micro‑credentials and degrees cost more but may offer recognition." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "Connect locally: meetups and communities in Australia" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Learning accelerates when you share progress and get feedback. Look for Australian AI meetups, university clubs, hack days, and online groups. If you’re AI‑curious or already building, you’re welcome in the MLAI community." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "Turn learning into momentum" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Keep your loop small: plan → build → evaluate → share → improve. Pick problems that matter, protect privacy, and ask for feedback early. Consistency beats intensity." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 bg-gray-50 rounded-xl p-6 border border-gray-100 not-prose", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-bold text-gray-900 mb-4", children: "Your Next Steps" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "space-y-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex gap-3 text-gray-700", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[--soft] text-xs font-bold text-[--brand]", children: "1" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Download the checklist mentioned above." })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex gap-3 text-gray-700", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[--soft] text-xs font-bold text-[--brand]", children: "2" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Draft your initial goals based on the template." })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex gap-3 text-gray-700", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[--soft] text-xs font-bold text-[--brand]", children: "3" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Discuss with your team or mentor." })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(MLAITemplateResourceCTA, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "my-12 not-prose", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          ArticleCompanyCTA,
          {
            title: `Need help with ${TOPIC}?`,
            body: "Join the MLAI community to collaborate with fellow AI practitioners in Australia.",
            buttonText: "Get recommendations",
            buttonHref: "/contact",
            note: "You can filter by topic, format (online/in‑person), and experience level."
          }
        ) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(AuthorBio, { author: authorDetails }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-12", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArticleFAQ, { items: faqItems }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ArticleFooterNav, { backHref: "/articles", topHref: "#" })
    ] })
  ] });
}
export {
  ArticlePage as default,
  faqItems,
  summaryHighlights,
  useCustomHeader
};
