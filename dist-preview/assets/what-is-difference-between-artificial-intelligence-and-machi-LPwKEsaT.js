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
const TOPIC = "AI vs machine learning: what’s the difference?";
const AUTHOR_PROFILE = getDefaultArticleAuthorDetails();
const AUTHOR = AUTHOR_PROFILE.name ?? "Dr Sam Donegan";
const AUTHOR_ROLE = AUTHOR_PROFILE.role ?? "Founder";
const AUTHOR_BIO = AUTHOR_PROFILE.bio ?? "";
const AUTHOR_AVATAR = AUTHOR_PROFILE.avatarUrl ?? "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=256&q=80";
const HERO_IMAGE = "https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Fhero-1a746f7d-0ce2-4f98-b0d9-16a036119f36.jpg?alt=media&token=cc356090-a73b-4c8d-a5ae-9a4706ca9c05";
const HERO_IMAGE_ALT = "Abstract network nodes and connections representing AI and machine learning";
const faqItems = [
  { id: 1, question: "Is AI the same as machine learning?", answer: "No. Machine learning (ML) is a subset of artificial intelligence (AI). AI is the broader goal of building systems that perform tasks we associate with intelligence (reasoning, planning, perception, language). ML is one family of techniques used to achieve that goal by learning patterns from data." },
  { id: 2, question: "Is ChatGPT AI or machine learning?", answer: /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    "ChatGPT is an AI application powered by machine learning—specifically deep learning. It is a large language model (LLM) trained on large text datasets and refined with techniques like reinforcement learning from human feedback (RLHF). It sits in the ",
    /* @__PURE__ */ jsxRuntimeExports.jsx("em", { children: "deep learning" }),
    " subset of ML."
  ] }) },
  { id: 3, question: "Can you build AI without machine learning?", answer: /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    "Yes. Rule-based systems, search/planning agents, and constraint solvers are ",
    /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "AI without ML" }),
    ". They use explicit logic and heuristics instead of learned parameters. Modern products often blend rules and ML."
  ] }) },
  { id: 4, question: "Which should I learn first in Australia—AI or ML?", answer: /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: "Start with ML fundamentals (Python, data handling, statistics, supervised/unsupervised learning). Then add deep learning and LLMs. Complement this with AI concepts (search, planning, prompt engineering, evaluation). Local context: explore CSIRO and the National AI Centre resources, and university short courses. As at 2026, employers value practical projects over theory alone." }) },
  { id: 5, question: "How much data do I need for ML?", answer: /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: "It depends on the task and model. For classical ML (e.g., tree-based models), hundreds to thousands of rows can be useful. Deep learning generally needs much more data and compute. If data is limited, consider transfer learning or smaller models. Always run a simple baseline first." }) },
  { id: 6, question: "Do I need a GPU to learn ML?", answer: /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: "Not initially. You can learn ML with CPUs on a laptop using small datasets. For deep learning or LLM fine-tuning, consider cloud notebooks (free tiers/credits) or managed platforms without upfront hardware costs." }) },
  { id: 7, question: "Where can I find trustworthy guidance in Australia?", answer: /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    "Check: • ",
    /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "https://bioinformatics.csiro.au/blog/difference-between-ai-ml-dl/", target: "_blank", rel: "noreferrer", children: "CSIRO on AI vs ML vs DL" }),
    " • ",
    /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "https://industry.gov.au/", target: "_blank", rel: "noreferrer", children: "Australian Government AI guidance (as available)" }),
    " • ",
    /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "https://oaic.gov.au/", target: "_blank", rel: "noreferrer", children: "OAIC privacy guidance" }),
    ". Also review provider docs (AWS, Microsoft Azure) for clear definitions."
  ] }) }
];
const summaryHighlights = {
  heading: `Key facts: ${TOPIC}`,
  intro: "Brief, factual overview referencing current Australian context (e.g. 2026 ecosystem norms, official guidance, privacy expectations, or common pathways).",
  items: [
    {
      label: "Is machine learning a subset of AI?",
      description: "Yes. ML is a set of techniques within AI that learn patterns from data; AI also includes rules, search, and planning."
    },
    {
      label: "Can you have AI without machine learning?",
      description: "Yes. Rule-based systems, search and planning agents are AI without ML—often cheaper and easier to govern."
    },
    {
      label: "How is deep learning different from ML?",
      description: "Deep learning uses multi-layer neural networks; it’s a subset of ML that typically needs more data/compute."
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
          " – If you’re wondering “what is difference between artificial intelligence and machine learning?”, here’s the short version and how it plays out in real projects and careers across Australia."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ArticleImageBlock, { src: HERO_IMAGE, alt: HERO_IMAGE_ALT, width: 1200, height: 630 }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "AI and machine learning: the relationship in one sentence" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
          "Machine learning (",
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "ML" }),
          ") is a subset of artificial intelligence (",
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "AI" }),
          "). AI is the overall goal—systems that perform tasks requiring intelligence. ML is one way to achieve that goal by learning patterns from data. All ML is AI, but not all AI uses ML."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          ArticleResourceCTA,
          {
            title: `Download the ${TOPIC} checklist`,
            description: "Access a structured template to apply the steps in this guide.",
            buttonLabel: "Get the checklist",
            buttonHref: "#",
            accent: "purple"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          ArticleCallout,
          {
            title: "Quick glossary (30 seconds)",
            variant: "brand",
            icon: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xl", children: "💡" }),
            className: "not-prose",
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "mt-2 list-disc pl-5 text-gray-800", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "AI:" }),
                " The field and goal: reasoning, planning, perception, language, action."
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "ML:" }),
                " Techniques that learn from data (supervised, unsupervised, reinforcement)."
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Deep learning (DL):" }),
                " ML using multi‑layer neural networks."
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "LLMs:" }),
                " Large language models (a deep learning family) that power chat and code assistants."
              ] })
            ] })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "The AI → ML → deep learning stack (and where LLMs sit)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: "https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-f5fc57b2-7984-42c6-9b93-d74c1e660f45.jpg?alt=media&token=ab7a7a79-8601-45d9-879a-2c700f4abac5", alt: "Group of tech enthusiasts collaborating in a trendy startup space, embodying the 90s film aesthetic.", className: "w-full rounded-lg my-8" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
          "A helpful mental model is a set of nested circles: AI (outer), ML (inside AI), and deep learning (inside ML). LLMs such as GPT‑class models are a ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("em", { children: "deep learning" }),
          " technique trained on large corpora; they’re used to build AI applications like chatbots, coding tools, and document assistants."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Non‑ML AI still matters: search and planning (e.g., route finding), constraint solvers (rostering), and rule engines (eligibility checks) can be sufficient, cheaper, and easier to govern in many Australian contexts." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "How they work: rules, search and learning" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: "https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-26774910-2413-4b85-8ba5-a57ae6a552b2.jpg?alt=media&token=38711d1b-f356-4247-a5f9-94595e4b9132", alt: "People collaborating in a retro tech startup environment, capturing a 90s film aesthetic.", className: "w-full rounded-lg my-8" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Rules/symbolic AI:" }),
            " Human‑written logic (if/then), ontologies, and knowledge bases. Great for clear, stable policies and compliance."
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Search/planning:" }),
            " Explore possible actions to achieve a goal (e.g., path finding). Useful for logistics and scheduling."
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Machine learning:" }),
            " Models learn parameters from data; classical ML handles tabular data well, while deep learning excels in images, audio, and language."
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          ArticleStepList,
          {
            title: "Practical steps: deciding if your problem needs ML",
            steps: [
              { label: "Write the outcome, constraints, and decision boundary in plain English." },
              { label: "Try a rules baseline. If clear, stable logic covers 80% of cases, start there." },
              { label: "If the task is pattern‑heavy or ambiguous, shortlist ML options (classical vs deep learning)." },
              { label: "Estimate data quality/quantity and compute; plan an evaluation metric." },
              { label: "Pilot, compare to the baseline, and keep the simpler approach if performance is similar." }
            ],
            accent: "indigo"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(QuoteBlock, { title: "Expert insight", variant: "purple", children: "“Start with the simplest thing that could work. In many teams, a solid rules baseline plus targeted ML where it truly adds value wins on cost, governance, and delivery speed.”" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "Examples you’ll recognise in Australia" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: "AI without ML (rules/search/planning)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Eligibility checks for concessions (rules aligned to legislation)." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Route optimisation for deliveries in metro areas (search/planning)." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Timetabling/rostering with constraints (constraint solving)." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: "ML‑powered systems (learning from data)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Document classification and data extraction (invoices, forms)." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Vision models for safety monitoring on worksites." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Language models supporting customer service triage and drafting." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "Career pathways in Australia: roles, skills and tools" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Data analyst → ML practitioner:" }),
            " Python, SQL, feature engineering, tree‑based models, evaluation."
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "ML engineer:" }),
            " Model training, feature stores, deployment, monitoring; CI/CD and MLOps."
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "AI engineer / Applied AI:" }),
            " Integrates LLMs, retrieval, prompt engineering, guardrails, evaluation."
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Data scientist:" }),
            " Experiment design, statistics, causal reasoning, communication."
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Product manager (AI):" }),
            " Problem framing, risk/benefit trade‑offs, measurement, rollout."
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Governance/ethics:" }),
            " Risk assessment, privacy impact assessments, model documentation."
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
          "As at 2026, Australian employers value demonstrable projects, responsible‑AI awareness, and practical evaluation over tool hype. Portfolios showing a simple baseline ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("em", { children: "and" }),
          " an ML upgrade are compelling."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "PAA quick answers: ChatGPT, “AI without ML”, and what to learn" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Is ML a subset of AI?" }),
            " Yes—ML is a set of techniques within AI."
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Can AI exist without ML?" }),
            " Yes—rules, search, and planning agents are AI without ML."
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "How is deep learning different from ML?" }),
            " Deep learning uses multi‑layer neural networks; it’s a subset of ML and often needs more data/compute. See the CSIRO explainer: ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "https://bioinformatics.csiro.au/blog/difference-between-ai-ml-dl/", target: "_blank", rel: "noreferrer", children: "AI vs ML vs DL" }),
            "."
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Which should I learn first?" }),
            " Start with ML fundamentals, then move into deep learning/LLMs and AI evaluation."
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "Privacy and responsible use in Australia (as at 2026)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Privacy:" }),
            " Follow OAIC guidance under the Privacy Act; conduct privacy impact assessments for sensitive use cases."
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Ethics:" }),
            " The Australian AI Ethics Principles emphasise fairness, privacy, reliability, transparency, and accountability."
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Governance:" }),
            " Document data sources, evaluation methods, and limitations; prefer interpretable baselines where risk is high."
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "Build momentum: a small project to test your understanding" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Take one problem and implement two versions: a rules baseline and an ML model. Compare outcomes, costs, and governance implications. This clarity helps you choose the right tool for the next project—and builds a strong portfolio piece." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 bg-gray-50 rounded-xl p-6 border border-gray-100 not-prose", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-bold text-gray-900 mb-4", children: "Your Next Steps" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "space-y-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex gap-3 text-gray-700", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[--soft] text-xs font-bold text-[--brand]", children: "1" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Download the checklist mentioned above." })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex gap-3 text-gray-700", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[--soft] text-xs font-bold text-[--brand]", children: "2" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Draft a simple rules baseline for a real problem you care about." })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex gap-3 text-gray-700", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[--soft] text-xs font-bold text-[--brand]", children: "3" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Train a small ML model and compare results—keep the simpler approach if it wins." })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(MLAITemplateResourceCTA, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "my-12 not-prose", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          ArticleCompanyCTA,
          {
            title: `Need help with ${TOPIC}?`,
            body: "Get practical recommendations based on your goals, time, and experience level.",
            buttonText: "Get recommendations",
            buttonHref: "https://mlai.au/contact",
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
