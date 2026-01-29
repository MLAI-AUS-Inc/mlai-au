import { j as jsxRuntimeExports, F as ForwardRef$2, A as ArticleDisclaimer } from "./server-build-DGuowwjZ.js";
import { A as ArticleHeroHeader, a as ArticleTocPlaceholder, b as ArticleImageBlock, Q as QuoteBlock, c as ArticleFAQ, d as AuthorBio, e as ArticleFooterNav } from "./ArticleTocPlaceholder-Do4c2OpE.js";
import { A as ArticleStepList, a as ArticleCompanyCTA } from "./ArticleStepList-BURYQrdD.js";
import { A as AudienceGrid, F as ForwardRef } from "./AudienceGrid-Cv0i5y2N.js";
import { A as ArticleResourceCTA } from "./ArticleResourceCTA-PGgKzCy1.js";
import { A as ArticleCallout, M as MLAITemplateResourceCTA } from "./MLAITemplateResourceCTA-BdznCDV4.js";
import { A as ArticleReferences } from "./ArticleReferences-HQ7rjtnV.js";
import { g as getDefaultArticleAuthorDetails } from "./authors-DzySQTZP.js";
import { H as House } from "./house-C2Qzo5EV.js";
import { F as ForwardRef$1 } from "./AcademicCapIcon-CU_w7ImP.js";
import "./worker-entry-BTvr0DWh.js";
import "node:events";
import "node:stream";
import "util";
import "stream";
import "path";
import "node:net";
import "url";
import "crypto";
import "assert";
import "zlib";
import "events";
import "node:path";
import "node:url";
const useCustomHeader = true;
const TOPIC = "How To Do Machine Learning";
const CATEGORY = "learn-ai";
const SLUG = "how-to-do-machine-learning";
const AUTHOR_PROFILE = getDefaultArticleAuthorDetails();
const AUTHOR = AUTHOR_PROFILE.name ?? "Dr Sam Donegan";
const AUTHOR_ROLE = AUTHOR_PROFILE.role ?? AUTHOR_PROFILE.credentials ?? "Founder";
const AUTHOR_BIO = AUTHOR_PROFILE.bio ?? "";
const AUTHOR_AVATAR = AUTHOR_PROFILE.avatarUrl ?? "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=256&q=80";
const HERO_IMAGE = "https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Fhero-9928d844-a3c2-4380-a60e-aa5b53db545c.jpg?alt=media&token=205cf271-80e5-42ed-a1f6-e98573826a71";
const HERO_IMAGE_ALT = "Developer experimenting with machine learning code in Python on a laptop";
const faqItems = [
  // ≥6 items; AU context; evidence-forward; answers can be strings or JSX.
  {
    id: 1,
    question: "How do I start learning machine learning?",
    answer: /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: "Start small and ship something end-to-end. A proven path: (1) learn Python basics and NumPy/Pandas, (2) study supervised learning with scikit-learn, (3) build one portfolio project using a public dataset, and (4) learn evaluation (accuracy vs F1) before adding complexity. Free, credible starters include Google's ML Crash Course and Kaggle Learn." })
  },
  {
    id: 2,
    question: "Do I need maths for ML? Which topics matter most?",
    answer: /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      "You need practical maths, not a maths degree. Focus on: linear algebra (vectors, dot product), probability (distributions, Bayes intuition), and calculus concepts (gradients) to understand optimisation. Learn just-in-time while you code; ",
      /* @__PURE__ */ jsxRuntimeExports.jsx("em", { children: "hands-on practice" }),
      " makes the maths stick."
    ] })
  },
  {
    id: 3,
    question: "Which language should I learn first for ML?",
    answer: "Python is the dominant choice for beginners (vast ecosystem: scikit-learn, pandas, NumPy, PyTorch). R is strong for statistics/visualisation. For most roles and projects, Python first is the pragmatic route."
  },
  {
    id: 4,
    question: "How long does it take to become job-ready?",
    answer: "With 5–8 hours/week, expect 3–6 months to build a solid foundation and a small portfolio. Deeper specialisation (e.g., deep learning or MLOps) takes longer. Focus on demonstrable projects, not just watching tutorials."
  },
  {
    id: 5,
    question: "Can I learn ML without coding?",
    answer: /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: "No‑code tools can teach concepts and help prototype, but practical ML roles typically require coding (usually Python). Use no‑code to explore, then move to code to unlock control, reproducibility, and employability." })
  },
  {
    id: 6,
    question: "What privacy rules apply in Australia when learning with data?",
    answer: /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      "If you handle personal information, follow the Australian Privacy Principles (APPs) administered by the OAIC. Prefer open datasets or synthetic/anonymous data for learning. See: ",
      /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "https://www.oaic.gov.au/privacy/australian-privacy-principles", target: "_blank", rel: "noreferrer", children: "OAIC — Australian Privacy Principles" }),
      "."
    ] })
  }
];
const summaryHighlights = {
  heading: `Key facts: ${TOPIC}`,
  intro: "As at 2026 in Australia: start with Python and scikit‑learn, learn evaluation beyond accuracy, and use open datasets or synthetic data to respect privacy (APPs).",
  items: [
    {
      label: "How do I start learning machine learning?",
      description: "Begin with Python, NumPy/Pandas, then scikit‑learn. Build one end‑to‑end project and learn evaluation (precision/recall, F1) before adding complexity."
    },
    {
      label: "Do I need coding to learn ML?",
      description: "Yes—Python is the pragmatic choice for most roles. No‑code tools help you explore, but coding unlocks control and employability."
    },
    {
      label: "How long does it take to learn ML?",
      description: "With 5–8 hrs/week, expect 3–6 months for a solid foundation and a portfolio project; deeper specialisation takes longer."
    }
  ]
};
const references = [
  {
    id: 1,
    href: "https://developers.google.com/machine-learning/crash-course",
    title: "Machine Learning Crash Course",
    publisher: "Google Developers",
    description: "Free, hands-on introduction to ML concepts with videos and exercises.",
    category: "guide"
  },
  {
    id: 2,
    href: "https://scikit-learn.org/stable/user_guide.html",
    title: "User Guide — scikit‑learn",
    publisher: "scikit‑learn",
    description: "Official documentation for classic ML in Python: APIs, tutorials, and examples.",
    category: "guide"
  },
  {
    id: 3,
    href: "https://www.oaic.gov.au/privacy/australian-privacy-principles",
    title: "Australian Privacy Principles (APPs)",
    publisher: "OAIC (Australia)",
    description: "Legal principles for handling personal information in Australia.",
    category: "government"
  },
  {
    id: 4,
    href: "https://www.kaggle.com/learn",
    title: "Kaggle Learn Micro-Courses",
    publisher: "Kaggle",
    description: "Short, practical notebooks on Python, Pandas, and ML with exercises.",
    category: "guide"
  }
];
function ArticlePage() {
  const breadcrumbs = [
    { label: "Home", href: "/", icon: House },
    { label: "Articles", href: "/articles" },
    { label: TOPIC, current: true }
  ];
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
        breadcrumbs,
        title: `${TOPIC} (2026)`,
        titleHighlight: TOPIC,
        headerBgColor: "purple",
        summary: summaryHighlights,
        heroImage: HERO_IMAGE,
        heroImageAlt: HERO_IMAGE_ALT
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "lg:absolute lg:right-0 lg:top-0 lg:w-72", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArticleTocPlaceholder, {}) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "prose prose-lg prose-indigo max-w-3xl px-4 py-10 sm:px-6 lg:px-8 text-gray-700 prose-headings:text-gray-900 hover:prose-a:text-[--brand-ink]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: TOPIC }),
          " — If you can write basic Python and read a confusion matrix, you can build useful models quickly. This guide distils top tutorials (Google Crash Course, scikit‑learn docs) into an Australian, practice‑first path you can follow over weeks, not years."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          ArticleImageBlock,
          {
            src: HERO_IMAGE,
            alt: HERO_IMAGE_ALT,
            width: 1200,
            height: 630,
            containerClassName: "my-10"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "A beginner’s roadmap that fits busy schedules" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Most high‑ranking guides cluster around the same core: Python → data handling → supervised learning → evaluation → a small project. Here’s a lean version that prioritises hands‑on practice." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Weeks 1–2:" }),
            " Python refresh (functions, lists, dicts), then NumPy and Pandas for arrays and DataFrames."
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Weeks 3–4:" }),
            " Supervised learning with scikit‑learn (train/test split, pipelines, regression and classification)."
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Weeks 5–6:" }),
            " Evaluation beyond accuracy (precision, recall, F1, confusion matrix). Learn cross‑validation."
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Weeks 7–8:" }),
            " Portfolio project: pick a public dataset, state a question, ship a reproducible notebook and README."
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          ArticleResourceCTA,
          {
            eyebrow: "Download",
            title: `Get the checklist for ${TOPIC}`,
            description: "Practical template to apply the concepts immediately.",
            buttonLabel: "Download now",
            buttonHref: "/resources",
            accent: "purple"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ArticleCallout, { title: "Tip: learn by shipping", variant: "brand", icon: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xl", children: "💡" }), children: "Treat each topic as a mini deliverable. A tidy notebook and a short README teach you far more than passive watching." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "Prerequisites: Python and the maths you actually need" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: "https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-9fbfdf69-df9d-42ec-87f2-11aba007c35a.jpg?alt=media&token=62d18657-9391-425c-801b-9832983a4d73", alt: "Group of diverse individuals collaborating in a tech startup, vintage 90s film aesthetic enhances the retro vibe.", className: "w-full rounded-lg my-8" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "You don’t need advanced calculus to start. The most useful skills early on are practical: writing clean Python, manipulating arrays and tables, and understanding basic probability and linear algebra." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: "Python skills to check off" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Functions, list/dict comprehensions, and importing packages" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "NumPy (arrays, broadcasting) and Pandas (indexing, joins, groupby)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Matplotlib/Seaborn for quick exploratory charts" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          ArticleStepList,
          {
            title: "Practical steps",
            steps: [
              "Refresh Python and install a scientific stack (NumPy, Pandas, Matplotlib, scikit‑learn).",
              "Complete Google’s ML Crash Course classification lesson.",
              "Rebuild the example from scratch without looking to test recall."
            ],
            accent: "indigo"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(QuoteBlock, { title: "Evidence or expert insight", variant: "purple", children: "“Beginners who focus on end‑to‑end projects (data → model → evaluation → README) progress faster than those who only memorise algorithms.”" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "Hands‑on: your first model in scikit‑learn" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: "https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-84852793-d791-40d2-aaac-4fda3ae9fef2.jpg?alt=media&token=e82c9afe-3b06-4d2c-b7b8-4dd50d633265", alt: "Tech enthusiasts collaborate in a vibrant 90s film aesthetic startup environment, ready to learn scikit-learn.", className: "w-full rounded-lg my-8" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
          "Classic ML in Python is approachable thanks to ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("code", { children: "Pipeline" }),
          "s and sensible defaults. This example trains a simple classifier on the Iris dataset."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("pre", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("code", { children: `# python
from sklearn.datasets import load_iris
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.pipeline import Pipeline
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score, f1_score

X, y = load_iris(return_X_y=True)
X_tr, X_te, y_tr, y_te = train_test_split(
    X, y, test_size=0.2, random_state=42, stratify=y
)

model = Pipeline([
    ('scale', StandardScaler()),
    ('clf', LogisticRegression(max_iter=1000)),
])

model.fit(X_tr, y_tr)
y_pred = model.predict(X_te)
print('accuracy:', accuracy_score(y_te, y_pred))
print('f1 (weighted):', f1_score(y_te, y_pred, average='weighted'))
` }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
          "Swap algorithms (",
          /* @__PURE__ */ jsxRuntimeExports.jsx("code", { children: "LogisticRegression" }),
          " → ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("code", { children: "RandomForestClassifier" }),
          ", ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("code", { children: "SVC" }),
          ") and compare metrics. Keep code in a reproducible notebook."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "Evaluate properly: accuracy isn’t enough" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Many tutorials default to accuracy. In imbalanced datasets, accuracy can be misleading. Prefer precision/recall and F1; use stratified splits and cross‑validation." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: "When to prefer F1 over accuracy" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Imbalanced classes:" }),
            " e.g., fraud detection, medical screening."
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Asymmetric costs:" }),
            " a false negative may be riskier than a false positive."
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Model selection:" }),
            " tune thresholds from precision‑recall curves."
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "Projects that prove your skills (portfolio‑friendly)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Pick scoped, real‑world problems. Aim for a crisp README with problem statement, data source, method, metrics, and what you’d try next." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Tabular:" }),
            " predict house prices or energy usage; evaluate with MAE/RMSE."
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Classification:" }),
            " classify customer churn; report precision, recall, F1, confusion matrix."
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "NLP (light):" }),
            " sentiment on product reviews using bag‑of‑words or TF‑IDF + linear model."
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Time series:" }),
            " forecast demand with simple baselines before advanced methods."
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "Australian context: data, privacy, and job signals" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Use open datasets (ABS, Kaggle) and avoid personal data. If you do handle personal information, follow the Australian Privacy Principles (APPs) from the OAIC. Document your assumptions and any risk mitigations in your project README." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Local job ads (as at 2026) frequently mention Python, scikit‑learn, SQL, and clear communication of trade‑offs. A tidy repo with tests or simple CI is a differentiator." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(MLAITemplateResourceCTA, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "From reading to doing: make the first 4 weeks count" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Commit to small, repeatable wins. Block two focused sessions per week, keep notes, and share progress with a mentor or peer. The goal isn’t a perfect model; it’s a reproducible process you can iterate." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 bg-gray-50 rounded-xl p-6 border border-gray-100", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-bold text-gray-900 mb-4", children: "Your Next Steps" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "space-y-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex gap-3 text-gray-700", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-xs font-bold text-indigo-600", children: "1" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Download the checklist mentioned above." })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex gap-3 text-gray-700", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-xs font-bold text-indigo-600", children: "2" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Draft your initial goals based on the template." })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex gap-3 text-gray-700", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-xs font-bold text-indigo-600", children: "3" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Discuss with your team or mentor." })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          AudienceGrid,
          {
            heading: "Who this helps",
            cards: [
              {
                title: "Founders & Teams",
                description: "Validate data ideas and build a responsible first pilot.",
                icon: /* @__PURE__ */ jsxRuntimeExports.jsx(ForwardRef, { className: "h-6 w-6" }),
                variant: "orange"
              },
              {
                title: "Students & Switchers",
                description: "Structure your learning and ship portfolio projects.",
                icon: /* @__PURE__ */ jsxRuntimeExports.jsx(ForwardRef$1, { className: "h-6 w-6" }),
                variant: "purple"
              },
              {
                title: "Community Builders",
                description: "Use safe datasets and clear evaluation to teach newcomers.",
                icon: /* @__PURE__ */ jsxRuntimeExports.jsx(ForwardRef$2, { className: "h-6 w-6" }),
                variant: "yellow"
              }
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          ArticleCompanyCTA,
          {
            title: `Need help with ${TOPIC}?`,
            body: "MLAI is a not‑for‑profit community in Australia. Join to connect with peers and find practical support.",
            buttonText: "Get recommendations",
            buttonHref: "/contact",
            note: "We’ll point you to community resources and upcoming activities."
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-3xl mx-auto px-4 sm:px-6 lg:px-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(ArticleDisclaimer, { className: "mt-8" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ArticleReferences, { references }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ArticleFAQ, { items: faqItems }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(AuthorBio, { author: authorDetails }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ArticleFooterNav, { backHref: "/articles", topHref: "#" })
    ] })
  ] });
}
export {
  CATEGORY,
  SLUG,
  ArticlePage as default,
  faqItems,
  summaryHighlights,
  useCustomHeader
};
