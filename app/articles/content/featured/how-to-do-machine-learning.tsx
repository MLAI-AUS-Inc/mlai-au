/**
 * ARTICLE TEMPLATE - React Router v7
 *
 * THIS FILE IS PLACED AT: app/articles/content/{category}/{slug}.tsx
 * All relative imports below are calculated from that location.
 */
import type { ReactNode } from 'react'
import { Home } from 'lucide-react'
import { RocketLaunchIcon, AcademicCapIcon, UsersIcon } from '@heroicons/react/24/outline'

import { ArticleFAQ } from '../../../components/articles/ArticleFAQ'
import ArticleCompanyCTA from '../../../components/articles/ArticleCompanyCTA'
import AuthorBio from '../../../components/AuthorBio'
import { ArticleHeroHeader } from '../../../components/articles/ArticleHeroHeader'
import { ArticleImageBlock } from '../../../components/articles/ArticleImageBlock'
import { ArticleFooterNav } from '../../../components/articles/ArticleFooterNav'
import { QuoteBlock } from '../../../components/articles/QuoteBlock'
import { ArticleTocPlaceholder } from '../../../components/articles/ArticleTocPlaceholder'
import { AudienceGrid } from '../../../components/articles/AudienceGrid'
import { ArticleResourceCTA } from '../../../components/articles/ArticleResourceCTA'
import { ArticleStepList } from '../../../components/articles/ArticleStepList'
import { ArticleCallout } from '../../../components/articles/ArticleCallout'
import { MLAITemplateResourceCTA } from '../../../components/articles/MLAITemplateResourceCTA'
import { ArticleReferences } from '../../../components/articles/ArticleReferences'
import { ArticleDisclaimer } from '../../../components/articles/ArticleDisclaimer'
import { getDefaultArticleAuthorDetails } from '../../authors'

/** ========== INPUTS (replace all placeholders) ========== */
export const useCustomHeader = true

const TOPIC = 'How To Do Machine Learning'
export const CATEGORY = 'learn-ai' // e.g. 'ai'
export const SLUG = 'how-to-do-machine-learning'
const AUTHOR_PROFILE = getDefaultArticleAuthorDetails()
const AUTHOR = AUTHOR_PROFILE.name ?? 'Dr Sam Donegan'
const AUTHOR_ROLE = AUTHOR_PROFILE.role ?? AUTHOR_PROFILE.credentials ?? 'Founder'
const AUTHOR_BIO = AUTHOR_PROFILE.bio ?? ''
const AUTHOR_AVATAR =
  AUTHOR_PROFILE.avatarUrl ??
  'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=256&q=80'
const DATE_PUBLISHED = '2026-01-23'
const DATE_MODIFIED = '2026-01-23'
const DESCRIPTION = 'A practical Australian roadmap to start machine learning in 2026: prerequisites, first projects, scikit-learn demo, evaluation, and ethics.'
const HERO_IMAGE = "https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Fhero-9928d844-a3c2-4380-a60e-aa5b53db545c.jpg?alt=media&token=205cf271-80e5-42ed-a1f6-e98573826a71"
const HERO_IMAGE_ALT = 'Developer experimenting with machine learning code in Python on a laptop'
const FEATURED_FOCUS = 'ai' // 'startups' | 'ai' | 'product' | 'funding'

/** ===== FAQ ===== */
interface FAQ {
  id: number
  question: string
  answer: ReactNode
}

export const faqItems: FAQ[] = [
  // ≥6 items; AU context; evidence-forward; answers can be strings or JSX.
  {
    id: 1,
    question: 'How do I start learning machine learning?',
    answer: (
      <>
        Start small and ship something end-to-end. A proven path: (1) learn Python basics and NumPy/Pandas, (2) study supervised learning with scikit-learn, (3) build one portfolio project using a public dataset, and (4) learn evaluation (accuracy vs F1) before adding complexity. Free, credible starters include Google's ML Crash Course and Kaggle Learn.
      </>
    ),
  },
  {
    id: 2,
    question: 'Do I need maths for ML? Which topics matter most?',
    answer: (
      <>
        You need practical maths, not a maths degree. Focus on: linear algebra (vectors, dot product), probability (distributions, Bayes intuition), and calculus concepts (gradients) to understand optimisation. Learn just-in-time while you code; <em>hands-on practice</em> makes the maths stick.
      </>
    ),
  },
  {
    id: 3,
    question: 'Which language should I learn first for ML?',
    answer:
      'Python is the dominant choice for beginners (vast ecosystem: scikit-learn, pandas, NumPy, PyTorch). R is strong for statistics/visualisation. For most roles and projects, Python first is the pragmatic route.'
  },
  {
    id: 4,
    question: 'How long does it take to become job-ready?',
    answer:
      'With 5–8 hours/week, expect 3–6 months to build a solid foundation and a small portfolio. Deeper specialisation (e.g., deep learning or MLOps) takes longer. Focus on demonstrable projects, not just watching tutorials.'
  },
  {
    id: 5,
    question: 'Can I learn ML without coding?',
    answer: (
      <>
        No‑code tools can teach concepts and help prototype, but practical ML roles typically require coding (usually Python). Use no‑code to explore, then move to code to unlock control, reproducibility, and employability.
      </>
    ),
  },
  {
    id: 6,
    question: 'What privacy rules apply in Australia when learning with data?',
    answer: (
      <>
        If you handle personal information, follow the Australian Privacy Principles (APPs) administered by the OAIC. Prefer open datasets or synthetic/anonymous data for learning. See: <a href="https://www.oaic.gov.au/privacy/australian-privacy-principles" target="_blank" rel="noreferrer">OAIC — Australian Privacy Principles</a>.
      </>
    ),
  },
]

export const summaryHighlights = {
  heading: `Key facts: ${TOPIC}`,
  intro:
    'As at 2026 in Australia: start with Python and scikit‑learn, learn evaluation beyond accuracy, and use open datasets or synthetic data to respect privacy (APPs).',
  items: [
    {
      label: 'How do I start learning machine learning?',
      description: 'Begin with Python, NumPy/Pandas, then scikit‑learn. Build one end‑to‑end project and learn evaluation (precision/recall, F1) before adding complexity.',
    },
    {
      label: 'Do I need coding to learn ML?',
      description: 'Yes—Python is the pragmatic choice for most roles. No‑code tools help you explore, but coding unlocks control and employability.',
    },
    {
      label: 'How long does it take to learn ML?',
      description: 'With 5–8 hrs/week, expect 3–6 months for a solid foundation and a portfolio project; deeper specialisation takes longer.',
    },
  ],
}

const references = [
  {
    id: 1,
    href: 'https://developers.google.com/machine-learning/crash-course',
    title: 'Machine Learning Crash Course',
    publisher: 'Google Developers',
    description: 'Free, hands-on introduction to ML concepts with videos and exercises.',
    category: 'guide',
  },
  {
    id: 2,
    href: 'https://scikit-learn.org/stable/user_guide.html',
    title: 'User Guide — scikit‑learn',
    publisher: 'scikit‑learn',
    description: 'Official documentation for classic ML in Python: APIs, tutorials, and examples.',
    category: 'guide',
  },
  {
    id: 3,
    href: 'https://www.oaic.gov.au/privacy/australian-privacy-principles',
    title: 'Australian Privacy Principles (APPs)',
    publisher: 'OAIC (Australia)',
    description: 'Legal principles for handling personal information in Australia.',
    category: 'government',
  },
  {
    id: 4,
    href: 'https://www.kaggle.com/learn',
    title: 'Kaggle Learn Micro-Courses',
    publisher: 'Kaggle',
    description: 'Short, practical notebooks on Python, Pandas, and ML with exercises.',
    category: 'guide',
  },
]

export default function ArticlePage() {
  const breadcrumbs = [
    { label: 'Home', href: '/', icon: Home },
    { label: 'Articles', href: '/articles' },
    { label: TOPIC, current: true },
  ]

  const authorDetails = {
    name: AUTHOR,
    role: AUTHOR_ROLE,
    bio: AUTHOR_BIO,
    avatarUrl: AUTHOR_AVATAR,
  }

  return (
    <div className="bg-white">
      <ArticleHeroHeader
        breadcrumbs={breadcrumbs}
        title={`${TOPIC} (2026)`}
        titleHighlight={TOPIC}
        headerBgColor="purple"
        summary={summaryHighlights}
        heroImage={HERO_IMAGE}
        heroImageAlt={HERO_IMAGE_ALT}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <ArticleTocPlaceholder />

        <div className="prose prose-lg max-w-none text-gray-700 prose-headings:text-gray-900 hover:prose-a:text-[--brand]">
          <p>
            <strong>{TOPIC}</strong> — If you can write basic Python and read a confusion matrix, you can build useful models quickly. This guide distils top tutorials (Google Crash Course, scikit‑learn docs) into an Australian, practice‑first path you can follow over weeks, not years.
          </p>

          <ArticleImageBlock
            src={HERO_IMAGE}
            alt={HERO_IMAGE_ALT}
            width={1200}
            height={630}
            containerClassName="my-10"
          />

          {/* SECTION: Beginner roadmap */}
          <h2>A beginner’s roadmap that fits busy schedules</h2>
          <p>
            Most high‑ranking guides cluster around the same core: Python → data handling → supervised learning → evaluation → a small project. Here’s a lean version that prioritises hands‑on practice.
          </p>
          <ul>
            <li><strong>Weeks 1–2:</strong> Python refresh (functions, lists, dicts), then NumPy and Pandas for arrays and DataFrames.</li>
            <li><strong>Weeks 3–4:</strong> Supervised learning with scikit‑learn (train/test split, pipelines, regression and classification).</li>
            <li><strong>Weeks 5–6:</strong> Evaluation beyond accuracy (precision, recall, F1, confusion matrix). Learn cross‑validation.</li>
            <li><strong>Weeks 7–8:</strong> Portfolio project: pick a public dataset, state a question, ship a reproducible notebook and README.</li>
          </ul>

          <ArticleResourceCTA
            eyebrow="Download"
            title={`Get the checklist for ${TOPIC}`}
            description="Practical template to apply the concepts immediately."
            buttonLabel="Download now"
            buttonHref="/resources"
            accent="purple"
          />

          <ArticleCallout title="Tip: learn by shipping" variant="brand" icon={<span className="text-xl">💡</span>}>
            Treat each topic as a mini deliverable. A tidy notebook and a short README teach you far more than passive watching.
          </ArticleCallout>

          {/* SECTION: Prerequisites */}
          <h2>Prerequisites: Python and the maths you actually need</h2>
          <img src="https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-9fbfdf69-df9d-42ec-87f2-11aba007c35a.jpg?alt=media&token=62d18657-9391-425c-801b-9832983a4d73" alt="Group of diverse individuals collaborating in a tech startup, vintage 90s film aesthetic enhances the retro vibe." className="w-full rounded-lg my-8" />

          <p>
            You don’t need advanced calculus to start. The most useful skills early on are practical: writing clean Python, manipulating arrays and tables, and understanding basic probability and linear algebra.
          </p>
          <h3>Python skills to check off</h3>
          <ul>
            <li>Functions, list/dict comprehensions, and importing packages</li>
            <li>NumPy (arrays, broadcasting) and Pandas (indexing, joins, groupby)</li>
            <li>Matplotlib/Seaborn for quick exploratory charts</li>
          </ul>

          <ArticleStepList
            title="Practical steps"
            steps={[
              'Refresh Python and install a scientific stack (NumPy, Pandas, Matplotlib, scikit‑learn).',
              'Complete Google’s ML Crash Course classification lesson.',
              'Rebuild the example from scratch without looking to test recall.',
            ]}
            accent="indigo"
          />

          <QuoteBlock title="Evidence or expert insight" variant="purple">
            “Beginners who focus on end‑to‑end projects (data → model → evaluation → README) progress faster than those who only memorise algorithms.”
          </QuoteBlock>

          {/* SECTION: First hands-on model */}
          <h2>Hands‑on: your first model in scikit‑learn</h2>
          <img src="https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-84852793-d791-40d2-aaac-4fda3ae9fef2.jpg?alt=media&token=e82c9afe-3b06-4d2c-b7b8-4dd50d633265" alt="Tech enthusiasts collaborate in a vibrant 90s film aesthetic startup environment, ready to learn scikit-learn." className="w-full rounded-lg my-8" />

          <p>
            Classic ML in Python is approachable thanks to <code>Pipeline</code>s and sensible defaults. This example trains a simple classifier on the Iris dataset.
          </p>
          <pre>
            <code>
              {`# python
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
`}
            </code>
          </pre>
          <p>
            Swap algorithms (<code>LogisticRegression</code> → <code>RandomForestClassifier</code>, <code>SVC</code>) and compare metrics. Keep code in a reproducible notebook.
          </p>

          {/* SECTION: Evaluation */}
          <h2>Evaluate properly: accuracy isn’t enough</h2>
          <p>
            Many tutorials default to accuracy. In imbalanced datasets, accuracy can be misleading. Prefer precision/recall and F1; use stratified splits and cross‑validation.
          </p>
          <h3>When to prefer F1 over accuracy</h3>
          <ul>
            <li><strong>Imbalanced classes:</strong> e.g., fraud detection, medical screening.</li>
            <li><strong>Asymmetric costs:</strong> a false negative may be riskier than a false positive.</li>
            <li><strong>Model selection:</strong> tune thresholds from precision‑recall curves.</li>
          </ul>

          {/* SECTION: Projects */}
          <h2>Projects that prove your skills (portfolio‑friendly)</h2>
          <p>
            Pick scoped, real‑world problems. Aim for a crisp README with problem statement, data source, method, metrics, and what you’d try next.
          </p>
          <ul>
            <li><strong>Tabular:</strong> predict house prices or energy usage; evaluate with MAE/RMSE.</li>
            <li><strong>Classification:</strong> classify customer churn; report precision, recall, F1, confusion matrix.</li>
            <li><strong>NLP (light):</strong> sentiment on product reviews using bag‑of‑words or TF‑IDF + linear model.</li>
            <li><strong>Time series:</strong> forecast demand with simple baselines before advanced methods.</li>
          </ul>

          {/* SECTION: Australian context */}
          <h2>Australian context: data, privacy, and job signals</h2>
          <p>
            Use open datasets (ABS, Kaggle) and avoid personal data. If you do handle personal information, follow the Australian Privacy Principles (APPs) from the OAIC. Document your assumptions and any risk mitigations in your project README.
          </p>
          <p>
            Local job ads (as at 2026) frequently mention Python, scikit‑learn, SQL, and clear communication of trade‑offs. A tidy repo with tests or simple CI is a differentiator.
          </p>

          <MLAITemplateResourceCTA />

          {/* SECTION: Closing */}
          <h2>From reading to doing: make the first 4 weeks count</h2>
          <p>
            Commit to small, repeatable wins. Block two focused sessions per week, keep notes, and share progress with a mentor or peer. The goal isn’t a perfect model; it’s a reproducible process you can iterate.
          </p>

          <div className="mt-8 bg-gray-50 rounded-xl p-6 border border-gray-100">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Your Next Steps</h3>
            <ul className="space-y-3">
              <li className="flex gap-3 text-gray-700">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-xs font-bold text-indigo-600">1</span>
                <span>Download the checklist mentioned above.</span>
              </li>
              <li className="flex gap-3 text-gray-700">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-xs font-bold text-indigo-600">2</span>
                <span>Draft your initial goals based on the template.</span>
              </li>
              <li className="flex gap-3 text-gray-700">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-xs font-bold text-indigo-600">3</span>
                <span>Discuss with your team or mentor.</span>
              </li>
            </ul>
          </div>

          <AudienceGrid
            heading="Who this helps"
            cards={[
              {
                title: 'Founders & Teams',
                description: 'Validate data ideas and build a responsible first pilot.',
                icon: <RocketLaunchIcon className="h-6 w-6" />,
                variant: 'orange',
              },
              {
                title: 'Students & Switchers',
                description: 'Structure your learning and ship portfolio projects.',
                icon: <AcademicCapIcon className="h-6 w-6" />,
                variant: 'purple',
              },
              {
                title: 'Community Builders',
                description: 'Use safe datasets and clear evaluation to teach newcomers.',
                icon: <UsersIcon className="h-6 w-6" />,
                variant: 'yellow',
              },
            ]}
          />

          <ArticleCompanyCTA
            title={`Need help with ${TOPIC}?`}
            body="MLAI is a not‑for‑profit community in Australia. Join to connect with peers and find practical support."
            buttonText="Get recommendations"
            buttonHref="/contact"
            note="We’ll point you to community resources and upcoming activities."
          />
        </div>
        <ArticleDisclaimer className="mt-8" />

        <ArticleReferences references={references} />

        <ArticleFAQ items={faqItems} />

        <AuthorBio author={authorDetails} />

        <ArticleFooterNav backHref="/articles" topHref="#" />
      </div>
    </div>
  )
}
