import type { ReactNode } from 'react'
import { Home } from 'lucide-react'
import { RocketLaunchIcon, AcademicCapIcon, UsersIcon } from '@heroicons/react/24/outline'
import { Link } from 'react-router'

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

const TOPIC = "How Much Do Data Scientists Make?'"
export const CATEGORY = 'ai-careers-australia'
export const SLUG = 'how-much-do-data-scientists-make'
const AUTHOR_PROFILE = getDefaultArticleAuthorDetails()
const AUTHOR = AUTHOR_PROFILE.name ?? 'Dr Sam Donegan'
const AUTHOR_ROLE = AUTHOR_PROFILE.role ?? AUTHOR_PROFILE.credentials ?? 'Founder'
const AUTHOR_BIO = AUTHOR_PROFILE.bio ?? ''
const AUTHOR_AVATAR =
  AUTHOR_PROFILE.avatarUrl ??
  'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=256&q=80'
const DATE_PUBLISHED = '2026-01-24'
const DATE_MODIFIED = '2026-01-24'
const DESCRIPTION = '2026 salary ranges for data scientists in Australia — entry to principal, by city and industry, skills that lift pay, and fair negotiation tips.'
const HERO_IMAGE = "https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Fhero-efc07de1-b4f1-46b2-8245-211ce8e1dd64.jpg?alt=media&token=ad15ab6a-efa7-4176-ba33-9908ed9a2d2e"
const HERO_IMAGE_ALT = 'Data scientist reviewing charts on a laptop in an Australian office'
const FEATURED_FOCUS = 'ai'

/** ===== FAQ ===== */
interface FAQ {
  id: number
  question: string
  answer: ReactNode
}

export const faqItems: FAQ[] = [
  {
    id: 1,
    question: 'What is the average data scientist salary in Australia in 2026?',
    answer:
      'Most full‑time base salaries cluster around $110k–$150k, with higher totals where bonuses or equity apply. Ranges vary by city, industry and seniority; always compare base + super vs total package and check current postings.'
  },
  {
    id: 2,
    question: 'How much do junior data scientists earn?',
    answer:
      'Graduate/entry roles commonly sit around $80k–$110k base (plus 12% super as at 2026). Internships and graduate programs can be lower and may include rotations.'
  },
  {
    id: 3,
    question: 'Do data scientists earn more in Sydney than Melbourne?',
    answer:
      'Generally yes, reflecting cost‑of‑living and finance/consulting demand in Sydney. A 5–10% uplift is common, but remote/hybrid policies can compress location gaps.'
  },
  {
    id: 4,
    question: 'Which industries pay the most in Australia?',
    answer:
      'Finance, product‑led tech (incl. AI), mining/resources and strategy consulting tend to pay more. Public sector roles can be competitive on total value when considering 15.4% super and stability.'
  },
  {
    id: 5,
    question: 'What skills increase a data scientist’s pay?',
    answer:
      'Production ML, cloud (AWS/GCP/Azure), data engineering (Spark/DBT), experiment design, domain expertise (e.g., risk/health), and GenAI/LLM evaluation and safety.'
  },
  {
    id: 6,
    question: 'Is contracting better paid than permanent roles?',
    answer:
      'Senior contractors often see $800–$1,300+ per day, but with no paid leave. Once you account for holidays and gaps, total compensation can be similar; it depends on risk tolerance and pipeline.'
  },
  {
    id: 7,
    question: 'How does superannuation affect offers?',
    answer:
      'As at 2026, employer super is 12%. Some offers show base + super; others quote a total package. For fair comparisons, convert all offers to the same basis.'
  },
  {
    id: 8,
    question: 'Can I negotiate salary in Australia?',
    answer:
      'Yes. Bring evidence (role impact, market data, published bands), ask about the pay band and progression criteria, and negotiate total compensation (super, bonus, ESOP, allowances).'
  }
]

export const summaryHighlights = {
  heading: `Key facts: ${TOPIC}`,
  intro:
    'Brief, factual overview referencing current Australian context (e.g. 2026 ecosystem norms, official guidance, privacy expectations, or common pathways).',
  items: [
    {
      label: 'What is the average data scientist salary in Australia?',
      description: 'Around $110k–$150k base in 2026, with higher totals where bonuses/equity apply.'
    },
    {
      label: 'How much do junior data scientists earn?',
      description: 'Typically $80k–$110k base + 12% super (as at 2026), varying by city and sector.'
    },
    {
      label: 'Which cities pay the most for data scientists?',
      description: 'Usually Sydney > Melbourne > Brisbane/Perth, though remote/hybrid can narrow gaps.'
    }
  ]
}

const references = [
  {
    id: 1,
    href: 'https://studyonline.rmit.edu.au/blog/data-scientist-salary-australia',
    title: 'A data scientist\'s salary in Australia — what you need to know',
    publisher: 'RMIT University',
    description: 'Overview of data scientist roles and salary context in Australia (general guidance).',
    category: 'guide'
  },
  {
    id: 2,
    href: 'https://www.curtin.edu.au/news/advice/what-does-a-data-scientist-do/',
    title: 'What does a data scientist do?',
    publisher: 'Curtin University',
    description: 'Role description and skill pathways relevant to pay progression.',
    category: 'guide'
  },
  {
    id: 3,
    href: 'https://www.hays.com.au/salary-guide',
    title: 'Hays Salary Guide (Australia) 2025–2026',
    publisher: 'Hays',
    description: 'Live Australian salary insights across tech and analytics; useful for range calibration (as at 2026).',
    category: 'industry'
  },
  {
    id: 4,
    href: 'https://www.seek.com.au/data-scientist-jobs',
    title: 'Data scientist jobs in Australia',
    publisher: 'SEEK',
    description: 'Scan current job ads to compare salary bands by city and sector.',
    category: 'watchlist'
  }
]

export default function ArticlePage() {
  const breadcrumbs = [
    { label: 'Home', href: '/', icon: Home },
    { label: 'Articles', href: '/articles' },
    { label: TOPIC, current: true }
  ]

  const authorDetails = {
    name: AUTHOR,
    role: AUTHOR_ROLE,
    bio: AUTHOR_BIO,
    avatarUrl: AUTHOR_AVATAR
  }

  return (
    <div className='bg-white'>
      <ArticleHeroHeader
        breadcrumbs={breadcrumbs}
        title={`${TOPIC} (2026)`}
        titleHighlight={TOPIC}
        headerBgColor='purple'
        summary={summaryHighlights}
        heroImage={HERO_IMAGE}
        heroImageAlt={HERO_IMAGE_ALT}
      />

      <div className='relative'>
        <div className='lg:absolute lg:right-0 lg:top-0 lg:w-72'>
          <ArticleTocPlaceholder />
        </div>

        <div className='prose prose-lg prose-indigo max-w-3xl px-4 py-10 sm:px-6 lg:px-8 text-gray-700 prose-headings:text-gray-900 hover:prose-a:text-[--brand-ink]'>
          <p>
            <strong>{TOPIC}</strong> Short answer: in 2026, many full‑time data scientist roles in Australia land around $110k–$150k base, with higher totals where bonuses or equity apply. The longer answer depends on experience, city, industry and whether you ship production ML. This guide explains how offers are structured locally and how to compare \u201cplus super\u201d vs \u201ctotal package\u201d. For broader role pathways, explore our{' '}
            <Link to='/articles' className='underline underline-offset-4 text-[--brand-ink]'>AI Career Pathways</Link>.
          </p>

          <ArticleImageBlock
            src={HERO_IMAGE}
            alt={HERO_IMAGE_ALT}
            width={1200}
            height={630}
            containerClassName='my-10'
          />

          <h2>Data scientist salary ranges in Australia (2026): a quick map</h2>
          <p>Ranges vary across employers and sectors. As a practical calibration as at 2026:</p>
          <ul>
            <li><strong>Graduate/Entry:</strong> ~$80k–$110k base (+ 12% super).</li>
            <li><strong>Mid‑level:</strong> ~$110k–$140k base; often broader scope across experimentation and stakeholder ownership.</li>
            <li><strong>Senior:</strong> ~$140k–$190k base; end‑to‑end product impact, modelling depth, and mentoring.</li>
            <li><strong>Principal/Lead:</strong> ~$180k–$250k+ base; org‑level impact, technical direction, and cross‑team leadership.</li>
          </ul>
          <p>Some sectors (finance, product‑led tech, resources) stack bonuses/equity on top. Public sector salary bands can be lower on base yet competitive on total value when 15.4% super, stability and flexible work are considered. Always convert offers to a comparable basis (base + super vs package) before deciding.</p>

          <ArticleResourceCTA
            eyebrow='Download'
            title={`Get the checklist for ${TOPIC}`}
            description='A one‑page worksheet to calibrate your range and compare offers on a like‑for‑like basis.'
            buttonLabel='Download now'
            buttonHref='#'
            accent='purple'
          />

          <ArticleCallout
            title='Compare like‑for‑like'
            variant='brand'
            icon={<span className='text-xl'>💡</span>}
          >
            Some ads quote base + super, others a total package. Super is 12% as at 2026. Convert both offers to total cash (base + super + guaranteed bonus) before comparing.
          </ArticleCallout>

          <h2>Experience bands: what moves you from junior to senior pay</h2>
<img src="https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-e2270f17-828e-47a9-a111-f080b47c2785.jpg?alt=media&token=97375866-e772-4f89-8a0b-2725068a123f" alt="Colorful 90s film aesthetic showcasing a diverse tech team collaborating in a vibrant startup environment." className="w-full rounded-lg my-8" />

          <p>Employers typically anchor salary to demonstrated impact, not just years served. Signals that move candidates up a band include:</p>
          <ul>
            <li><strong>Evidence of shipped impact:</strong> Models or analyses that changed a product, risk decision or customer outcome.</li>
            <li><strong>Production alignment:</strong> Comfort with data engineering basics (versioned datasets, CI/CD for ML, monitoring).</li>
            <li><strong>Experiment design:</strong> Designing and analysing A/B tests or quasi‑experiments with valid inference.</li>
            <li><strong>Stakeholder ownership:</strong> Partnering with product/ops and communicating trade‑offs.</li>
            <li><strong>Mentoring and scope growth:</strong> Coaching others and lifting team standards.</li>
          </ul>

          <ArticleStepList
            title='Practical steps to calibrate your range'
            steps={[
              'Scan 20–30 current AU job ads in your city and sector; note quoted bands and responsibilities.',
              'Map your evidence (projects, metrics moved, shipped features) to the bands above.',
              'Convert offers to base + super; decide a target, a walk‑away, and 2–3 trade items (bonus, WFH, ESOP).'
            ]}
            accent='indigo'
          />

          <QuoteBlock title='Evidence beats adjectives' variant='purple'>
            “Pay tends to follow demonstrated business impact and repeatable delivery. Bring specific examples and numbers; it’s stronger than generic ‘passion’ claims.”
          </QuoteBlock>

          <h2>Location check: Sydney, Melbourne, Brisbane, Perth</h2>
<img src="https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-ebbe453e-d4f3-4edd-818c-49fc7ee44d3b.jpg?alt=media&token=f1edef9c-d88a-4708-85c1-9ae93ad6e529" alt="Group of diverse individuals collaborating in a vibrant tech startup, capturing a retro 90s film aesthetic in Sydney." className="w-full rounded-lg my-8" />

          <p>Sydney often pays the highest (finance, consulting, high cost‑of‑living). Melbourne is close behind, with strong product and research roles. Brisbane and Perth show healthy demand in resources, health and government. Remote/hybrid can compress the gap, but on‑site expectations for secure data or regulated environments still matter.</p>

          <h2>Industry premiums in 2026</h2>
          <p><strong>Finance</strong> rewards risk, pricing and fraud expertise, often with bonuses. <strong>Product‑led tech</strong> values experimentation and ML at scale; equity can be meaningful. <strong>Mining/resources</strong> pay well for optimisation and forecasting in operational contexts. <strong>Consulting</strong> can be high total comp with travel and utilisation targets. <strong>Public sector</strong> offers stability and high super, with clearer bands.</p>

          <h2>Skill premiums: tools and responsibilities that lift pay</h2>
          <ul>
            <li><strong>Python, SQL</strong> and a modern notebook/IDE workflow.</li>
            <li><strong>Cloud (AWS/GCP/Azure)</strong> and data pipelines (Spark, DBT, orchestration).</li>
            <li><strong>ML Ops</strong> (model versioning, deployment, monitoring, drift detection).</li>
            <li><strong>GenAI/LLMs</strong> with evaluation, safety and responsible‑AI practices.</li>
            <li><strong>Experimentation</strong> and causal inference skills for product decisions.</li>
            <li><strong>Domain knowledge</strong> in finance, health, energy, or government policy.</li>
          </ul>

          <h2>Data analyst vs data scientist vs ML engineer — pay differences</h2>
          <p>Titles vary by employer. In general in Australia: data analysts focus on BI and decision support; data scientists blend statistical modelling with product/problem ownership; ML engineers push models into robust production systems. ML engineering and senior product‑facing DS roles can command higher bands due to reliability, scale and impact requirements.</p>

          <h2>Total compensation: super, bonuses, equity and contracting</h2>
          <p>Compare <em>total</em> value, not just base:</p>
          <ul>
            <li><strong>Superannuation:</strong> 12% employer contribution as at 2026 (public sector often 15.4%).</li>
            <li><strong>Bonuses:</strong> Common in finance/consulting; usually performance‑linked and not guaranteed.</li>
            <li><strong>Equity (ESOP):</strong> More common in product‑led tech; assess vesting, strike price and dilution.</li>
            <li><strong>Contracting:</strong> Senior day rates of ~$800–$1,300+ are common; factor in unpaid leave, GST, insurance and gaps between engagements.</li>
          </ul>

          <h2>Negotiating fairly in Australia</h2>
          <p>Ask about the band for the role and progression criteria. Bring evidence of impact, published bands (where available) and comparable ads. If base is fixed, consider trading for signing bonus, additional leave, WFH support, training budget or clearer promotion timelines. Keep it respectful and data‑driven.</p>

          <AudienceGrid
            heading='Who this helps'
            cards={[
              {
                title: 'Founders & Teams',
                description: 'Benchmark roles and plan fair, competitive bands.',
                icon: <RocketLaunchIcon className='h-6 w-6' />,
                variant: 'orange'
              },
              {
                title: 'Students & Switchers',
                description: 'Calibrate expectations and focus on skills that move the needle.',
                icon: <AcademicCapIcon className='h-6 w-6' />,
                variant: 'purple'
              },
              {
                title: 'Community Builders',
                description: 'Share up‑to‑date guidance across meetups and study groups.',
                icon: <UsersIcon className='h-6 w-6' />,
                variant: 'yellow'
              }
            ]}
          />

          <MLAITemplateResourceCTA />

          <h2>Ready to benchmark your offer? A simple plan</h2>
          <p>Use the checklist above to gather 3–5 comparable ads in your city and sector, convert each to base + super, and place your evidence against the band descriptions. Decide your target and red lines before you start the conversation.</p>

          <div className='mt-8 bg-gray-50 rounded-xl p-6 border border-gray-100'>
            <h3 className='text-lg font-bold text-gray-900 mb-4'>Your Next Steps</h3>
            <ul className='space-y-3'>
              <li className='flex gap-3 text-gray-700'>
                <span className='flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-xs font-bold text-indigo-600'>1</span>
                <span>Download the checklist mentioned above.</span>
              </li>
              <li className='flex gap-3 text-gray-700'>
                <span className='flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-xs font-bold text-indigo-600'>2</span>
                <span>Collect 20–30 recent AU job ads and convert them to a like‑for‑like basis.</span>
              </li>
              <li className='flex gap-3 text-gray-700'>
                <span className='flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-xs font-bold text-indigo-600'>3</span>
                <span>Draft a negotiation plan (target, walk‑away, trades) and practise with a mentor.</span>
              </li>
            </ul>
          </div>

          <ArticleCompanyCTA
            title={`Need help with ${TOPIC}?`}
            body={`MLAI is a not‑for‑profit community for Australia's AI builders and learners. Connect with the community for practical guidance and support.`}
            buttonText='Connect with the MLAI community'
            buttonHref='/contact'
            note='Friendly, community‑first support — no hard sell.'
          />
        </div>
      </div>

      <div className='max-w-3xl mx-auto px-4 sm:px-6 lg:px-8'>
        <ArticleDisclaimer className='mt-8' />

        <ArticleReferences references={references} />

        <ArticleFAQ items={faqItems} />

        <AuthorBio author={authorDetails} />

        <ArticleFooterNav backHref='/articles' topHref='#' />
      </div>
    </div>
  )
}
