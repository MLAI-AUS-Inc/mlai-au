/*
 * ARTICLE TEMPLATE - React Router v7
 *
 * THIS FILE IS PLACED AT: app/articles/content/{category}/{slug}.tsx
 * All relative imports below are calculated from that location.
 */
import type { ReactNode } from 'react'
import { Home } from 'lucide-react'
import { RocketLaunchIcon, AcademicCapIcon, UsersIcon } from '@heroicons/react/24/outline'

import { ArticleFAQ } from '~/components/articles/ArticleFAQ'
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

const TOPIC = 'How to get a data science job in Australia'
export const CATEGORY = 'ai-careers-australia' // e.g. 'ai'
export const SLUG = 'how-to-get-data-science-job'
const AUTHOR_PROFILE = getDefaultArticleAuthorDetails()
const AUTHOR = AUTHOR_PROFILE.name ?? 'Dr Sam Donegan'
const AUTHOR_ROLE = AUTHOR_PROFILE.role ?? AUTHOR_PROFILE.credentials ?? 'Founder'
const AUTHOR_BIO = AUTHOR_PROFILE.bio ?? ''
const AUTHOR_AVATAR =
  AUTHOR_PROFILE.avatarUrl ??
  'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=256&q=80'
export const DATE_PUBLISHED = '2026-01-24'
export const DATE_MODIFIED = '2026-01-24'
export const DESCRIPTION = 'Practical, Australia-focused steps to land your first or next data science role in 2026: skills, portfolio, interviews and where to look.'
const HERO_IMAGE = "https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Fhero-8cebc51f-5bc8-46f4-8676-bd361214e6b3.jpg?alt=media&token=273d8b6c-afd5-411f-89e9-fa04b4413f6d"
const HERO_IMAGE_ALT = 'Data scientist reviewing charts and code on a laptop'
export const FEATURED_FOCUS = 'ai' // 'startups' | 'ai' | 'product' | 'funding'

/** ===== FAQ ===== */
interface FAQ {
  id: number
  question: string
  answer: ReactNode
}

export const faqItems: FAQ[] = [
  { id: 1, question: 'Do I need a master\'s or PhD to become a data scientist in Australia?', answer: 'Not necessarily. Many Australian employers hire candidates with a bachelor\'s in STEM (or equivalent skills) plus a strong portfolio. Research-heavy roles (e.g., advanced modelling, R&D) may prefer a master\'s/PhD.' },
  { id: 2, question: 'Is data science in demand in Australia in 2026?', answer: <>Yes, demand remains steady across finance, health, retail and government. Check Jobs and Skills Australia and current job boards for up-to-date outlooks and vacancies.</> },
  { id: 3, question: 'How do I get a data science job with no experience?', answer: 'Build 2–3 applied projects with public datasets, complete an internship/placement, contribute to open source, and target junior or analyst roles to get a first foothold.' },
  { id: 4, question: 'Which skills matter most: Python, SQL, or cloud?', answer: 'For entry roles: SQL (advanced querying), Python (pandas, scikit-learn), statistics/EDA and clear communication. Cloud familiarity (AWS/Azure/GCP) helps but deep expertise isn\'t required for most junior roles.' },
  { id: 5, question: 'What are common entry pathways in Australia?', answer: 'Data/BI Analyst, Graduate Data roles, Analyst roles in risk/marketing/ops, or Analytics Engineer. Lateral moves from software engineering or business analytics are common.' },
  { id: 6, question: 'How should I structure a data science resume for ATS?', answer: 'Keep it to 1–2 pages. Mirror keywords from the job ad, foreground project outcomes (metrics), list core tools (Python, SQL, cloud) and link to a repo/case study.' },
  { id: 7, question: 'Do I need a personal website, or is GitHub enough?', answer: 'A clean GitHub with readable READMEs and one short case study can be sufficient. A simple site helps, but clarity and impact matter more than design.' },
  { id: 8, question: 'Where should I apply in Australia?', answer: <>SEEK, LinkedIn, APS Jobs (government), university grad programs, and community channels. Tailor each application to the selection criteria.</> },
]

export const summaryHighlights = {
  heading: `Key facts: ${TOPIC}`,
  intro:
    'Brief, factual overview referencing current Australian context (e.g. 2026 ecosystem norms, official guidance, privacy expectations, or common pathways).',
  items: [
    {
      label: 'How do I get a data science job with no experience?',
      description: 'Build 2–3 applied projects, pursue internships/grad programs, and target analyst roles first; show Python/SQL and business impact.',
    },
    {
      label: 'What qualifications do you need to be a data scientist in Australia?',
      description: 'Often a STEM bachelor or equivalent skills; master’s/PhD helps for research-heavy roles but isn’t required for most jobs.',
    },
    {
      label: 'Is data science in demand in Australia?',
      description: 'Yes, steady across finance, health, retail and government; always verify current outlook via Jobs and Skills Australia and job ads.',
    },
  ],
}

const references = [
  {
    id: 1,
    href: 'https://www.open.edu.au/advice/careers/it-computer-science/data-scientist',
    title: 'How to become a Data Scientist',
    publisher: 'Open Universities Australia',
    description: 'Overview of the data scientist role and study pathways for Australians.',
    category: 'guide',
  },
  {
    id: 2,
    href: 'https://studyonline.unsw.edu.au/blog/data-science-degree-jobs',
    title: 'What jobs can you get with a Data Science degree?',
    publisher: 'UNSW Online',
    description: 'Career outcomes and roles related to data science studies in Australia.',
    category: 'analysis',
  },
  {
    id: 3,
    href: 'https://www.apsjobs.gov.au/',
    title: 'APS Jobs (Australian Public Service)',
    publisher: 'Australian Government',
    description: 'Official Australian government job portal, including data/analytics roles.',
    category: 'government',
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

      <div className="relative">
        <div className="lg:absolute lg:right-0 lg:top-0 lg:w-72">
          <ArticleTocPlaceholder />
        </div>

        <div className="prose prose-lg prose-indigo max-w-3xl px-4 py-10 sm:px-6 lg:px-8 text-gray-700 prose-headings:text-gray-900 hover:prose-a:text-[--brand-ink]">
          {/* 
            ⚠️ IMPORTANT: CONTENT STRUCTURE INSTRUCTIONS

            The sections below are EXAMPLES ONLY showing component usage patterns.

            DO NOT copy these section headings literally.

            Your actual article sections MUST be derived from:
            1. Research context (competitor H2/H3 patterns)
            2. PAA questions from SERP data
            3. Unique angles identified in research gaps
            4. User search intent and journey

            Generate 4-8 unique H2 sections based on research.
          */}

          <p>
            <strong>{TOPIC}</strong> – If you\'re aiming for your first (or next) role, Australian hiring in 2026 still centres on demonstrable skills, clear project outcomes, and the ability to communicate with stakeholders. This guide distils what top-ranking career pages emphasise (skills, pathways, and roles) and answers People‑Also‑Ask queries with an Australian lens.
          </p>

          <ArticleImageBlock
            src={HERO_IMAGE}
            alt={HERO_IMAGE_ALT}
            width={1200}
            height={630}
            containerClassName="my-10"
          />

          {/* SECTION: Skills & tools expected */}
          <h2>What Australian hiring managers expect in 2026: skills and tools</h2>
          <p>
            Core signals are consistent across job ads and university/career guides: strong <em>SQL</em> (joins, CTEs, window functions), practical <em>Python</em> (pandas, NumPy, scikit‑learn; optionally PyTorch/TensorFlow), and confidence with <em>statistics/experimentation</em> (EDA, significance, bias). Pair these with version control (Git), basic containerisation (Docker), and at least a familiar grasp of one cloud (AWS/Azure/GCP). Visualisation (Power BI/Tableau/Altair) and crisp business communication round it out.
          </p>
          <p>
            For most junior roles, depth beats breadth. Show you can take a messy dataset, ask a useful question, create a clean pipeline, test a model/baseline, and present trade‑offs in plain English.
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
            title="Proof beats promises: ship small, show outcomes"
            variant="brand"
            icon={<span className="text-xl">💡</span>}
          >
            Recruiters skim for evidence. Link to one repo per project with a short README, a clear evaluation section, and a 3–5 slide summary. Pin these to your profile.
          </ArticleCallout>

          {/* SECTION: Pathways */}
          <h2>Degree, bootcamp or recognition of prior learning (RPL)?</h2>
<img src="https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-be259ff7-7a78-40fd-b64a-016fada964dc.jpg?alt=media&token=ebd69211-5479-4759-a90a-be1784624a8a" alt="A vibrant 90s film aesthetic scene of diverse professionals collaborating in a tech startup environment." className="w-full rounded-lg my-8" />

          <p>
            Australian pathways vary by employer. A STEM bachelor\'s remains common, but many teams will consider candidates who demonstrate equivalent capability through RPL, micro‑credentials, or bootcamps—especially when backed by solid projects. Research‑heavy roles or certain government labs may prefer a master\'s/PhD.
          </p>
          <h3>If you\'re a student</h3>
          <p>
            Prioritise internships, capstone projects with industry partners, and contributing to university research groups. Apply early for graduate programs (closing dates are often months in advance).
          </p>
          <h3>If you\'re a career switcher</h3>
          <p>
            Leverage adjacent experience—analytics, software, ops, finance, marketing—into a data or BI analyst role first. Use scoped projects to de‑risk the transition and show transferable impact.
          </p>

          {/* SECTION: Portfolio */}
          <h2>Build a job‑ready portfolio with Australian datasets</h2>
<img src="https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-fa1e8de6-475c-43f2-a616-1c0f4bdcd9f1.jpg?alt=media&token=1175a8e4-7280-4345-a1b1-e30c81af888f" alt="Creative team collaborating in a tech startup, surrounded by laptops and Australian datasets in a vibrant, 90s film style." className="w-full rounded-lg my-8" />

          <p>
            Stand out with projects that reflect real decisions an Australian organisation might make. Keep them small, reproducible, and results‑focused:
          </p>
          <ul>
            <li><strong>ABS/ATO open data:</strong> trend analysis with clear policy or business implications.</li>
            <li><strong>AEMO electricity data:</strong> forecasting or anomaly detection with an energy‑sector angle.</li>
            <li><strong>Bureau of Meteorology (licensing‑aware):</strong> weather‑linked demand modelling; respect data terms of use.</li>
            <li><strong>Transport NSW/VicRoads open data:</strong> travel time or safety analyses with a simple dashboard.</li>
          </ul>
          <p>
            Each project should include a short problem statement, data sourcing/cleaning notes, a baseline, evaluation metrics, and a conclusion tied to a decision.
          </p>

          <ArticleStepList
            title="Practical steps"
            steps={[
              'Pick a target role (Data/BI Analyst vs Data Scientist) and extract the top 8–10 keywords from 5 job ads.',
              'Ship 2–3 small projects using public AU datasets; document setup, decisions and metrics.',
              'Polish your resume/LinkedIn around outcomes and those keywords; link to one case study.',
              'Apply weekly to a focused list (grad schemes, analyst roles, internships) and track responses.',
              { label: 'Rehearse interviews: SQL drills, EDA walk‑throughs, and a 5‑minute project story.' },
            ]}
            accent="indigo"
          />

          <QuoteBlock title="What makes applications stick" variant="purple">
            “Specific outcomes beat tool lists. ‘Reduced churn by 4.3% using uplift modelling’ signals more value than ‘used Python and scikit‑learn.’”
          </QuoteBlock>

          {/* SECTION: Where to find roles */}
          <h2>Where to find roles in Australia (and how to target them)</h2>
          <p>
            Start with SEEK and LinkedIn for the broad market; use alerts for keywords (Data Analyst, Data Scientist, ML Engineer, Analytics). For public sector roles and internships, check APS Jobs and university career portals. In addition, look for local meetups or community posts where short‑term contracts and collaborations surface.
          </p>
          <ul>
            <li><strong>SEEK/LinkedIn:</strong> set refined alerts; mirror selection criteria in your resume.</li>
            <li><strong>APS Jobs:</strong> align with role capabilities and address criteria directly.</li>
            <li><strong>Graduate programs:</strong> apply early; expect assessments and case studies.</li>
            <li><strong>Community:</strong> portfolios and short gigs often start via meetups and open‑source contributions.</li>
          </ul>

          {/* SECTION: Interviews */}
          <h2>Inside the Australian interview loop: what to expect</h2>
          <p>
            Typical sequences: a recruiter screen, technical assessment (SQL and/or a small take‑home), a walkthrough of your project, and a stakeholder interview. Some teams skip the take‑home and run live EDA or case discussions. Practice speaking to trade‑offs, data quality issues, and how you validated the result.
          </p>
          <ul>
            <li><strong>SQL:</strong> joins, window functions, manipulation of realistic tables.</li>
            <li><strong>EDA/modelling:</strong> baselines, feature leakage checks, simple metrics.</li>
            <li><strong>Communication:</strong> structure your narrative (context → approach → result → impact → next steps).</li>
          </ul>

          {/* SECTION: Compliance & logistics */}
          <h2>Logistics: right to work, clearance, and salary research</h2>
          <p>
            Ensure you can evidence Australian work rights; some government/defence roles require background checks or security clearances. Salary bands vary by city, sector, and role seniority—use multiple sources (recent ads, salary guides) and note that figures can change; see our <a href="/articles/featured/how-much-do-data-scientists-make">data scientist salary guide</a> for detailed ranges as at 2026.
          </p>

          <AudienceGrid
            heading="Who this helps"
            cards={[
              {
                title: 'Founders & Teams',
                description: 'For leaders validating ideas, seeking funding, or managing teams.',
                icon: <RocketLaunchIcon className="h-6 w-6" />,
                variant: 'orange',
              },
              {
                title: 'Students & Switchers',
                description: 'For those building portfolios, learning new skills, or changing careers.',
                icon: <AcademicCapIcon className="h-6 w-6" />,
                variant: 'purple',
              },
              {
                title: 'Community Builders',
                description: 'For workshop facilitators, mentors, and ecosystem supporters.',
                icon: <UsersIcon className="h-6 w-6" />,
                variant: 'yellow',
              },
            ]}
          />

          <MLAITemplateResourceCTA />

          {/* SECTION: Closing */}
          <h2>Land the interview: a simple 30‑day Australian plan</h2>
          <p>
            Week 1: pick a target role, scrape common keywords, and outline two projects. Week 2: ship Project 1 (README + slides). Week 3: polish resume/LinkedIn, rehearse a 5‑minute project walkthrough, and apply to 10 focused roles. Week 4: ship Project 2 and complete 3 mock interviews. Iterate based on responses.
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
            title={`Need help with ${TOPIC}?`}
            body="Get practical recommendations based on your goals, time, and experience level."
            buttonText="Get recommendations"
            buttonHref="/contact"
            note="You can filter by topic, format (online/in-person), and experience level."
          />
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <ArticleDisclaimer className="mt-8" />

        <ArticleReferences references={references} />

        <ArticleFAQ items={faqItems} />

        <AuthorBio author={authorDetails} />

        <ArticleFooterNav backHref="/articles" topHref="#" />
      </div>
    </div>
  )
}
