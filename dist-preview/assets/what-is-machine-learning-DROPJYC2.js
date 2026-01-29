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
const TOPIC = "What is machine learning?";
const CATEGORY = "learn-ai-australia";
const SLUG = "what-is-machine-learning";
const AUTHOR_PROFILE = getDefaultArticleAuthorDetails();
const AUTHOR = AUTHOR_PROFILE.name ?? "Dr Sam Donegan";
const AUTHOR_ROLE = AUTHOR_PROFILE.role ?? "Founder";
const AUTHOR_BIO = AUTHOR_PROFILE.bio ?? "";
const AUTHOR_AVATAR = AUTHOR_PROFILE.avatarUrl ?? "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=256&q=80";
const DATE_PUBLISHED = "2026-01-19";
const DATE_MODIFIED = "2026-01-19";
const DESCRIPTION = "Plain‑English guide to machine learning: how it works, key types, examples, risks, and how to begin in Australia (2026).";
const HERO_IMAGE = "https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Fhero-150b6b2a-5bd3-466b-a1c0-2fcf9943e0d2.jpg?alt=media&token=932800b0-6893-4c22-b272-df8ef2ce06f4";
const HERO_IMAGE_ALT = "Abstract network of nodes and connections representing machine learning models";
const FEATURED_FOCUS = "ai";
const faqItems = [
  // ≥6 items; AU context; evidence-forward; answers can be strings or JSX.
  {
    id: 1,
    question: "Is machine learning the same as AI?",
    answer: "No. Machine learning (ML) is a subset of AI focused on systems that learn patterns from data instead of following hand‑coded rules. Deep learning and today's generative models are approaches within ML."
  },
  {
    id: 2,
    question: "What are the main types of machine learning?",
    answer: /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Supervised:" }),
          " learn from labelled examples (e.g., spam vs not‑spam)."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Unsupervised:" }),
          " find structure in unlabelled data (e.g., customer clustering)."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Reinforcement:" }),
          " learn via trial and reward (e.g., game‑playing agents)."
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2", children: "Variants you\\'ll see include self‑supervised learning and transfer learning." })
    ] })
  },
  {
    id: 3,
    question: "Do I need advanced maths to start?",
    answer: "You can begin with Python, basic statistics, and scikit‑learn. Over time, linear algebra and calculus help you reason about optimisation and model behaviour—useful for deeper roles."
  },
  {
    id: 4,
    question: "How is ML regulated or guided in Australia?",
    answer: /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "As at 2026, privacy and fairness expectations are shaped by the Privacy Act 1988 and guidance from the Office of the Australian Information Commissioner (OAIC). See the OAIC\\'s resources for privacy and AI:" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("a", { className: "underline text-[--brand-ink]", href: "https://www.oaic.gov.au/", target: "_blank", rel: "noreferrer", children: "oaic.gov.au" }),
        ". Also review Australian AI ethics guidance on",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("a", { className: "underline text-[--brand-ink]", href: "https://www.industry.gov.au/", target: "_blank", rel: "noreferrer", children: "industry.gov.au" }),
        "."
      ] })
    ] })
  },
  {
    id: 5,
    question: "Where can I find beginner‑friendly datasets (including Australian sources)?",
    answer: /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
      "Try",
      " ",
      /* @__PURE__ */ jsxRuntimeExports.jsx("a", { className: "underline text-[--brand-ink]", href: "https://www.kaggle.com/datasets", target: "_blank", rel: "noreferrer", children: "Kaggle Datasets" }),
      ",",
      " ",
      /* @__PURE__ */ jsxRuntimeExports.jsx("a", { className: "underline text-[--brand-ink]", href: "https://archive.ics.uci.edu/", target: "_blank", rel: "noreferrer", children: "UCI ML Repository" }),
      ", and Australian open data on",
      " ",
      /* @__PURE__ */ jsxRuntimeExports.jsx("a", { className: "underline text-[--brand-ink]", href: "https://data.gov.au/", target: "_blank", rel: "noreferrer", children: "data.gov.au" }),
      "."
    ] }) })
  },
  {
    id: 6,
    question: "What is overfitting and how do I avoid it?",
    answer: "Overfitting occurs when a model memorises training data but performs poorly on new data. Mitigate with a proper train/validation/test split, cross‑validation, simpler models, regularisation, and early stopping."
  },
  { id: 7, question: "Which tools should I learn first?", answer: "Python, NumPy, pandas, scikit‑learn, and Jupyter notebooks. Add PyTorch or TensorFlow once you are comfortable with fundamentals." }
];
const summaryHighlights = {
  heading: `Key facts: ${TOPIC}`,
  intro: "Snapshot for Australia (2026): ML is widely embedded in consumer apps and public services; privacy is guided by the Privacy Act; most beginners start with Python and scikit‑learn before exploring deep learning.",
  items: [
    {
      label: "Is machine learning part of AI or different?",
      description: "Machine learning is a subset of AI: systems learn patterns from data rather than following fixed rules."
    },
    {
      label: "What are the main types of machine learning?",
      description: "Supervised, unsupervised, and reinforcement learning (with self‑supervised/transfer as variants)."
    },
    {
      label: "Where is machine learning used day to day?",
      description: "Recommendations, spam/phishing filters, speech‑to‑text, fraud detection, maps/traffic, and medical triage tools."
    }
  ]
};
const meta = {
  title: TOPIC,
  slug: SLUG,
  category: CATEGORY,
  description: DESCRIPTION,
  datePublished: DATE_PUBLISHED,
  dateModified: DATE_MODIFIED,
  featuredFocus: FEATURED_FOCUS
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
          " – Machine learning shows up when your phone transcribes speech, a map updates travel time, or a bank flags a suspicious transaction. In 2026, Australians interact with ML daily—often invisibly. This guide explains how ML works, the main learning paradigms, practical examples, key risks, and a simple pathway to get started responsibly."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ArticleImageBlock, { src: HERO_IMAGE, alt: HERO_IMAGE_ALT, width: 1200, height: 630 }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "Machine learning in one sentence (and how it differs from AI)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Machine learning is a way of building systems that learn patterns from data to make predictions or decisions with minimal explicit rules. It sits inside the broader field of artificial intelligence. Deep learning is a family of ML techniques using neural networks; generative AI (e.g., text or image generation) is a capability typically powered by deep learning models." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "How machine learning works: data, features, and training" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "img",
          {
            src: "https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-88f286e1-d28c-4b24-a86c-6b49f65774c6.jpg?alt=media&token=c114e32e-be0f-43e9-9a83-6fbc591107e3",
            alt: "People collaborating in a tech startup, blending retro 90s vibes with modern machine learning discussions.",
            className: "w-full rounded-lg my-8"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Most ML projects follow a repeatable loop: define the problem, gather and prepare data, select a baseline model, train on historical examples, evaluate on unseen data, then iterate. For a tabular task (say, predicting whether an email is spam), you would create features (e.g., word counts), split your data into train/validation/test sets, train a simple model (like logistic regression), measure performance (accuracy, precision/recall, ROC‑AUC), and use error analysis to guide the next change." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Good hygiene matters: keep a hold‑out test set for final checks; prefer cross‑validation when data is limited; document assumptions and risks alongside metrics. This helps future you—and anyone reviewing your work—understand trade‑offs." }),
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
            title: "Start simple: a strong baseline beats fragile complexity",
            variant: "brand",
            icon: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xl", children: "💡" }),
            className: "not-prose",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-gray-800", children: "Try a shallow model first (logistic regression, decision tree). If a complex model only wins by a hair and is hard to explain, prefer the simpler option—especially when privacy and safety reviews are required." })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "The main learning paradigms: supervised, unsupervised, reinforcement" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "img",
          {
            src: "https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-0c82f8b2-7802-493e-add4-d91948cc56cb.jpg?alt=media&token=9a2f5a83-305d-4b0e-9474-577daae238d7",
            alt: "People collaborating in a tech startup, embodying 90s film aesthetics, illustrating learning paradigms in AI.",
            className: "w-full rounded-lg my-8"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Supervised learning maps inputs to known labels (e.g., classify phishing emails). Unsupervised learning finds patterns without labels (e.g., cluster customers by behaviour). Reinforcement learning trains an agent to act via rewards (e.g., recommendation ranking through simulated feedback). Variants such as self‑supervised and transfer learning help when labels are scarce or you want to reuse a pre‑trained model for a new task." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          ArticleStepList,
          {
            title: "Practical steps",
            steps: [
              { label: "Frame a narrow, testable question with a clear metric (e.g., recall ≥ 90%)." },
              { label: "Create a clean train/validation/test split; keep the test set untouched." },
              { label: "Train a simple baseline; record results and errors." },
              { label: "Iterate features and models; compare fairly with the same split." },
              { label: "Document risks (bias, privacy) alongside performance." }
            ],
            accent: "indigo"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(QuoteBlock, { title: "Expert insight", variant: "purple", children: "“Strong fundamentals—clean data, clear metrics, and honest evaluation—compound faster than chasing the newest model.”" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "Everyday examples you already use" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Common ML‑powered experiences include email spam and phishing detection, speech‑to‑text on phones, maps and traffic estimates, personalised recommendations, fraud alerts from banks, and assistive tools in word processors. In the public sector, ML increasingly supports triage and queueing, with privacy and fairness safeguards expected under Australian guidance." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "Key risks and limits: bias, overfitting, and privacy" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Models reflect their data. Bias can emerge when training data under‑represents groups; overfitting occurs when a model memorises patterns that don’t generalise; data drift slowly degrades performance as the world changes. In Australia, practitioners should assess privacy impacts and align with the Privacy Act 1988 and OAIC guidance (as at 2026). When in doubt, limit data collection, minimise retention, and explain model behaviour to stakeholders." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
          "Useful starting points: ",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("a", { className: "underline text-[--brand-ink]", href: "https://www.oaic.gov.au/", target: "_blank", rel: "noreferrer", children: "OAIC" }),
          " ",
          "privacy resources and high‑level AI guidance on ",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("a", { className: "underline text-[--brand-ink]", href: "https://www.industry.gov.au/", target: "_blank", rel: "noreferrer", children: "industry.gov.au" }),
          "."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ArticleCallout, { title: "Check consent before you train", variant: "warning", children: "Always confirm you have a lawful basis to use data, especially for personal or sensitive information. When sharing a project publicly, avoid uploading raw personal data." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "ML vs deep learning vs generative AI (quick comparison)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Think of ML as the umbrella. Deep learning is an ML approach using neural networks with many layers, well‑suited to images, audio, and text. Generative AI refers to models that create new content (text, images, code). Many practical problems—especially with tabular data—are still best solved with classic ML (trees, linear models) because they are efficient, robust, and easier to explain." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "Getting started in Australia: a simple, ethical pathway" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
          "Start with Python, pandas, and scikit‑learn; pick a small, meaningful dataset (e.g., an open dataset from",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("a", { className: "underline text-[--brand-ink]", href: "https://data.gov.au/", target: "_blank", rel: "noreferrer", children: "data.gov.au" }),
          ") and frame a binary classification or regression task. Define a metric that matches the impact (for safety or fraud, recall and precision matter more than raw accuracy). Keep notes on what you tried, what worked, and why."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "When you’re ready, share your notebook and short write‑up. If you want feedback or peers, the MLAI community is a not‑for‑profit home for Australian practitioners and the AI‑curious." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "Choose a small problem and ship a baseline this week" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Pick one dataset, set a success metric, and train a baseline today. Evaluate honestly, write down risks, and iterate once. That single loop teaches more than weeks of passive learning—and positions you to contribute to real projects." }),
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
            note: "We’re a not‑for‑profit community based in North Melbourne."
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
  AUTHOR,
  AUTHOR_AVATAR,
  AUTHOR_BIO,
  AUTHOR_ROLE,
  CATEGORY,
  DATE_MODIFIED,
  DATE_PUBLISHED,
  DESCRIPTION,
  FEATURED_FOCUS,
  HERO_IMAGE,
  HERO_IMAGE_ALT,
  SLUG,
  TOPIC,
  ArticlePage as default,
  faqItems,
  meta,
  summaryHighlights,
  useCustomHeader
};
