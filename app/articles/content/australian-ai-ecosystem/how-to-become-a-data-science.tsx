/**
 * ARTICLE TEMPLATE - React Router v7
 *
 * THIS FILE IS PLACED AT: app/articles/content/{category}/{slug}.tsx
 * All relative imports below are calculated from that location.
 */
import type { ReactNode } from 'react'
import { Link } from 'react-router'
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
import { getDefaultArticleAuthorDetails } from '../../authors'

/** ========== INPUTS (replace all placeholders) ========== */
export const useCustomHeader = true

const TOPIC = 'How to become a data scientist in Australia'
const CATEGORY = 'australian-ai-ecosystem'
const SLUG = 'how-to-become-a-data-science'
const AUTHOR_PROFILE = getDefaultArticleAuthorDetails()
const AUTHOR = AUTHOR_PROFILE.name ?? 'Dr Sam Donegan'
const AUTHOR_ROLE = AUTHOR_PROFILE.role ?? AUTHOR_PROFILE.credentials ?? 'Founder'
const AUTHOR_BIO = AUTHOR_PROFILE.bio ?? ''
const AUTHOR_AVATAR =
  AUTHOR_PROFILE.avatarUrl ??
  'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=256&q=80'
const DATE_PUBLISHED = '2026-01-21'
const DATE_MODIFIED = '2026-01-21'
const DESCRIPTION = 'A practical Australian pathway to become a data scientist in 2026: skills, education, portfolio, and where to find entry-level roles.'
const HERO_IMAGE = "https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Fhero-cfae1b03-07ed-47d9-9d44-08e21792ee10.jpg?alt=media&token=fbcf162c-9774-45f3-89b7-77c0e8d236e0"
const HERO_IMAGE_ALT = 'Data scientist working in a Python notebook with charts and data tables'
const FEATURED_FOCUS = 'ai' // 'startups' | 'ai' | 'product' | 'funding'

/** ===== FAQ ===== */
interface FAQ {
  id: number
  question: string
  answer: ReactNode
}

export const faqItems: FAQ[] = [
  {
    id: 1,
    question: 'How do I become a data scientist in Australia with no experience?',
    answer:
      'Start with Python, SQL and statistics fundamentals, then build 3–5 small projects using Australian open datasets (e.g., data.gov.au). Publish clean notebooks and READMEs on GitHub, practise SQL/case interviews, and apply for analyst/junior roles while seeking internships or volunteer projects. As at 2026, many teams hire on demonstrated skills rather than titles.'
  },
  {
    id: 2,
    question: 'Do I need a degree or a master\'s?',
    answer: (
      <>
        A degree helps for competitive or research-heavy roles, but it is <em>not</em> mandatory for many junior positions. Portfolios, internships, and evidence of real work often carry more weight. If you pursue study, compare Australian options (e.g., CS, stats, data science) against your goals and budget.
      </>
    )
  },
  {
    id: 3,
    question: 'How long does it take to become job-ready?',
    answer:
      'Typical pathways: 6–12 months of focused self-study/bootcamp for career switchers; 2–4 years via a Bachelor; 1–2 years for a Master\'s. Timelines vary based on prior experience, time available, and the quality of your portfolio (as at 2026).'
  },
  {
    id: 4,
    question: 'Which skills should I learn first?',
    answer: (
      <>
        Python (pandas, NumPy, scikit-learn), SQL, exploratory data analysis, basic statistics (probability, sampling, testing), and data storytelling. Add cloud basics (AWS/GCP/Azure), version control (Git), and documentation.
      </>
    )
  },
  {
    id: 5,
    question: 'Are data scientists in demand in Australia?',
    answer:
      'Demand varies by sector and state. Banking, health, government, energy, and consulting remain consistent employers. Check live job boards (e.g., Seek, LinkedIn) and industry salary guides for the latest signals (as at 2026).'
  },
  {
    id: 6,
    question: 'How much can a data scientist earn in Australia?',
    answer:
      'Compensation varies by seniority, location, and sector. Consult current Australian salary guides (e.g., Hays, Michael Page) and live listings for up-to-date figures (as at 2026).'
  },
  {
    id: 7,
    question: 'What\'s the difference between a data analyst and a data scientist?',
    answer:
      'Analysts focus on descriptive/diagnostic analytics (SQL, dashboards, reporting). Data scientists add predictive modelling, experimentation, and production considerations. Early-career roles often blend both.'
  },
  {
    id: 8,
    question: 'Can I switch from another field (e.g., biology, finance, marketing)?',
    answer:
      'Yes. Leverage your domain knowledge for projects (e.g., finance risk models, marketing uplift), then showcase results, assumptions, and limitations. Many Australian teams value domain-context plus core data skills.'
  }
]

export const summaryHighlights = {
  heading: `Key facts: ${TOPIC}`,
  intro:
    'Brief, factual overview referencing current Australian context (e.g. 2026 ecosystem norms, official guidance, privacy expectations, or common pathways).',
  items: [
    {
      label: 'Do I need a degree to be a data scientist in Australia?',
      description: 'Helpful but not mandatory; many juniors are hired on portfolios, internships, and demonstrable skills.',
    },
    {
      label: 'How long does it take to become a data scientist?',
      description: 'Roughly 6–12 months for focused switchers; 2–4 years via a degree. Timelines vary by background.',
    },
    {
      label: 'Which skills should I learn first?',
      description: 'Python, SQL, statistics, EDA, basic ML, Git, and clear communication; add cloud fundamentals.',
    },
  ],
}

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
        headerBgColor="cyan"
        summary={summaryHighlights}
        heroImage={HERO_IMAGE}
        heroImageAlt={HERO_IMAGE_ALT}
      />

      <div className="relative">
        <div className="lg:absolute lg:right-0 lg:top-0 lg:w-72">
          <ArticleTocPlaceholder />
        </div>

        <div className="prose prose-lg prose-indigo max-w-3xl px-4 py-10 sm:px-6 lg:px-8 text-gray-700 prose-headings:text-gray-900 hover:prose-a:text-[--brand-ink]">
          <p>
            <strong>{TOPIC}</strong> – If you typed “how to become a data science”, you almost certainly mean “data scientist”. In Australia (2026), hiring teams value clear, reproducible evidence of core skills over buzzwords. This guide maps a realistic, AU‑specific pathway, with links to official sources and practical next steps.
            {' '}<Link to="/articles" className="underline underline-offset-4">Explore more in our Australian AI Ecosystem series</Link>.
          </p>

          <ArticleImageBlock
            src={HERO_IMAGE}
            alt={HERO_IMAGE_ALT}
            width={1200}
            height={630}
            containerClassName="my-10"
          />

          <h2>What does a data scientist do in Australia?</h2>
          <p>
            Data scientists frame questions with stakeholders, source and clean data, run exploratory analysis, design and evaluate models, and communicate results so decisions improve. In smaller Australian teams, the role often overlaps with analyst and ML engineer tasks (SQL, dashboards, lightweight deployment). In regulated settings (e.g., finance, health, government), expect higher bars on privacy, model risk, and documentation.
          </p>
          <p>
            A practical litmus test: can you take a messy, real dataset and produce a defensible recommendation? If you can demonstrate that end‑to‑end, you are already competitive for many junior roles.
          </p>

          <ArticleResourceCTA
            eyebrow="Download"
            title={`Get the checklist for ${TOPIC}`}
            description="Practical template to apply the concepts immediately."
            buttonLabel="Download now"
            buttonHref="#"
            accent="purple"
          />

          <ArticleCallout
            title="Tip: Audit 10 job ads before you study"
            variant="brand"
            icon={<span className="text-xl">💡</span>}
          >
            Save 10 current Australian job ads (Seek, LinkedIn, APSJobs). Tally recurring skills, tools, and responsibilities. Let that spreadsheet guide your learning plan and portfolio themes.
          </ArticleCallout>

          <h2>Do you need a degree? Australian pathways compared</h2>
<img src="https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-1b88a997-ab31-4295-9567-3b03cd30ff60.jpg?alt=media&token=6107cbcc-471a-4835-9f46-d298a6e19b33" alt="Group of diverse individuals collaborating in a tech startup, capturing a vibrant 90s film aesthetic." className="w-full rounded-lg my-8" />

          <p>
            Degrees help for research‑heavy roles, but many junior hires come via portfolios, internships, and analyst roles. Compare effort, cost, and your timeline: a Bachelor/Master builds theory and signalling; bootcamps and micro‑credentials compress practice; self‑study can work if you ship quality projects and get feedback. As at 2026, employers still prioritise demonstrable skills and clear communication.
          </p>
          <h3>Degrees (Bachelor/Master)</h3>
          <p>
            Pros: stronger theory, access to labs and internships, alumni networks. Cons: time and cost. If you choose this route, favour courses with applied units (SQL, Python, ML ops) and capstones with real data.
          </p>
          <h3>Bootcamps and micro‑credentials</h3>
          <p>
            Pros: focused practice and career support. Cons: outcomes vary—vet instructors and graduate portfolios. Look for structured interview prep, project feedback, and Australian employer connections.
          </p>
          <h3>Self‑study + project‑led learning</h3>
          <p>
            Build a clear plan: Python/SQL fundamentals, 3–5 scoped projects on Australian open data, and weekly code reviews. Consider micro‑credentials to validate gaps (e.g., cloud or statistics). Your GitHub becomes your transcript.
          </p>

          <ArticleStepList
            title="Your pathway in phases (6–12 months)"
            steps={[
              'Decide your route (degree, bootcamp, or self‑study) and set a realistic weekly schedule.',
              'Learn the core stack: Python (pandas, NumPy, scikit‑learn), SQL, statistics, Git.',
              'Ship 3–5 projects using AU datasets (data.gov.au, ABS); write clear READMEs and tests.',
              'Practise interviews: SQL drills, case studies; seek code reviews and peer feedback.',
              'Apply to junior/analyst roles and internships; tailor your CV to outcomes and link your work.',
            ]}
            accent="indigo"
          />

          <QuoteBlock title="Hiring signal in 2026" variant="purple">
            “Hiring managers hire proof, not promise. A tiny, well‑explained project that solves a real problem beats a long list of ‘familiar with’ bullet points.”
          </QuoteBlock>

          <h2>Core skills and tools employers list in 2026 job ads</h2>
<img src="https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-9820c594-854c-4167-aa7a-6cf7ba4caaec.jpg?alt=media&token=5c101b9e-8e5c-4038-a818-4946c3d10a4f" alt="People collaborating in a vibrant tech startup, embodying 90s film aesthetics and modern creativity." className="w-full rounded-lg my-8" />

          <p>
            Core: Python (pandas, NumPy, scikit‑learn), SQL, exploratory analysis, statistics (sampling, testing, bias), and data storytelling. Often requested: Jupyter, Git, cloud basics (AWS/GCP/Azure), dashboards (e.g., Plotly/Power BI), and ML practices (validation, leakage checks, feature importance). Alternatives appear too (R, PySpark, dbt) depending on stack.
          </p>
          <p>
            For production‑leaning roles, learn containerisation basics, simple APIs, and monitoring. For analyst‑leaning roles, strengthen SQL window functions, dimensional modelling, and communication.
          </p>

          <AudienceGrid
            heading="Who this helps"
            cards={[
              {
                title: 'Beginners & switchers',
                description: 'A clear plan to go from zero to portfolio and first role.',
                icon: <RocketLaunchIcon className="h-6 w-6" />,
                variant: 'orange',
              },
              {
                title: 'Students & learners',
                description: 'Turn coursework into projects that employers can assess quickly.',
                icon: <AcademicCapIcon className="h-6 w-6" />,
                variant: 'purple',
              },
              {
                title: 'Community builders & mentors',
                description: 'Use the steps to run study circles and peer reviews.',
                icon: <UsersIcon className="h-6 w-6" />,
                variant: 'yellow',
              },
            ]}
          />

          <MLAITemplateResourceCTA />

          <h2>Get experience without experience: build and show your work</h2>
          <p>
            Use Australian open data (e.g., ABS, data.gov.au, state portals) and frame problems as business questions: “Which customers are likely to churn?”, “Where should we target inspections?”. Keep scope tight (one dataset, one model, one decision), write a crisp README, and include limitations and next steps.
          </p>
          <h3>What a strong portfolio looks like</h3>
          <p>
            - Reproducible: environment file, clear instructions, and seeded randomness.
            <br />- Measured: baselines, validation, and error analysis (not just accuracy).
            <br />- Communicated: short executive summary plus notebook detail.
            <br />- Ethical: documented data sources, privacy considerations, and bias checks.
          </p>

          <h2>Entry‑level titles and where to apply in Australia</h2>
          <p>
            Look for titles like Junior Data Scientist, Data Analyst, BI Analyst, Graduate Data Scientist, or Junior ML Engineer. Search on Seek and LinkedIn; check APSJobs for government roles; scan graduate programs (banks, telcos, consulting); and explore university labs/centres for research assistant roles. Tailor applications to outcomes and link directly to relevant projects.
          </p>

          <h2>How long does it take? Realistic timelines</h2>
          <p>
            As a guide (2026): 6–12 months of focused, project‑led learning can be enough for junior roles if you already have adjacent experience (e.g., software, analytics). A Bachelor typically takes 3–4 years; a Master’s 1–2 years. Progress is uneven—feedback loops and community support usually speed things up.
          </p>

          <h2>Ethics, privacy, and responsible AI in Australia</h2>
          <p>
            If you work with personal information, understand Australian privacy law (Privacy Act 1988 (Cth) and OAIC guidance). Document data sources, apply de‑identification where needed, and record assumptions and risks. As at 2026, broader AI policy settings continue to evolve—check official updates and your organisation’s governance requirements.
          </p>

          <h2>Choose a pathway and plug into community</h2>
          <p>
            Pick the route that fits your time and budget, then commit to a steady cadence: learn, build, review, apply. Community matters—study circles, code reviews, and meetups keep momentum and improve your work.
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

          <ArticleCompanyCTA
            title={`Join the community for ${TOPIC}`}
            body="Join the MLAI community to collaborate with fellow AI practitioners in Australia."
            buttonText="Join the MLAI community"
            buttonHref="/contact"
            note="Response within 2 business days."
          />
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <ArticleReferences
          heading="Sources"
          description="Curated references for further reading (as at 2026)."
          headingId="references"
          references={[
            {
              id: 1,
              href: 'https://www.oaic.gov.au/privacy/the-privacy-act',
              title: 'The Privacy Act 1988 (Cth) — Overview',
              publisher: 'OAIC',
              category: 'government',
              description: 'Australian privacy law and guidance relevant to handling personal information.'
            },
            {
              id: 2,
              href: 'https://data.gov.au/',
              title: 'data.gov.au — Open Government Data',
              publisher: 'Australian Government',
              category: 'government',
              description: 'Open datasets for Australian, state, and local projects.'
            },
            {
              id: 3,
              href: 'https://www.hays.com.au/salary-guide',
              title: 'Hays Salary Guide — Australia',
              publisher: 'Hays',
              category: 'industry',
              description: 'Yearly salary ranges and demand signals across roles (check latest edition).'
            },
            {
              id: 4,
              href: 'https://www.seek.com.au/data-scientist-jobs',
              title: 'Seek — Data Scientist jobs in Australia',
              publisher: 'Seek',
              category: 'analysis',
              description: 'Live job listings to audit skill demand and titles.'
            },
            {
              id: 5,
              href: 'https://seas.harvard.edu/news/how-become-data-scientist',
              title: 'How to Become a Data Scientist',
              publisher: 'Harvard John A. Paulson School of Engineering and Applied Sciences',
              category: 'guide',
              description: 'Global overview of skills and pathways.'
            },
            {
              id: 6,
              href: 'https://studyonline.unsw.edu.au/blog/how-to-become-a-data-scientist',
              title: 'How to Become a Data Scientist',
              publisher: 'UNSW Online',
              category: 'guide',
              description: 'Australian university perspective on skills and study options.'
            },
          ]}
        />

        <ArticleFAQ items={faqItems} />

        <AuthorBio author={authorDetails} />

        <ArticleFooterNav backHref="/articles" topHref="#" />
      </div>
    </div>
  )
}
