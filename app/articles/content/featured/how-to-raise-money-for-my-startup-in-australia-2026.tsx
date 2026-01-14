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
import { ArticleStepList } from '../../../components/articles/ArticleStepList'
import { getAuthorProfile } from '../../authors'

/** ========== INPUTS (replace all placeholders) ========== */
export const useCustomHeader = true

const TOPIC = 'How to raise money for my startup in Australia (2026 guide)'
const CATEGORY = 'featured' // e.g. 'ai'
const SLUG = 'how-to-raise-money-for-my-startup-in-australia-2026'
const DATE_PUBLISHED = '2025-01-10'
const DATE_MODIFIED = '2025-01-10'
const DESCRIPTION = 'A 2026-ready roadmap for Australian founders to raise capital, covering grants, angels, VC, revenue finance, and due diligence.'
const HERO_IMAGE = "https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Fhero-00fbdc1f-4a2c-473f-a965-743fa8a2e728.jpg?alt=media&token=0451eb99-10d0-446d-a95d-01e22f54c831"
const HERO_IMAGE_ALT = 'Founders reviewing funding documents in an Australian coworking space'
const FEATURED_FOCUS = 'funding' // 'startups' | 'ai' | 'product' | 'funding'

/** ===== FAQ ===== */
interface FAQ {
  id: number
  question: string
  answer: ReactNode
}

export const faqItems: FAQ[] = [
  {
    id: 1,
    question: 'What is the best first funding option for an early-stage startup in Australia?',
    answer:
      'Start with customer revenue and small non-dilutive options (e.g. R&D Tax Incentive eligibility checks, state-based innovation vouchers, or Export Market Development Grants if you are already selling overseas). These are typically faster and cheaper than equity, and they help you prove traction before approaching angels or VCs.',
  },
  {
    id: 2,
    question: 'How long do Australian grants usually take to pay out?',
    answer:
      'Most competitive federal grants (e.g. Industry Growth Program streams) have assessment cycles of 6–12 weeks after closing, with milestone-based payments once contracts are signed. Refundable tax offsets like the R&D Tax Incentive are claimed in the company tax return, so cash arrives after lodgement and ATO processing. Always check the current guidelines on business.gov.au for timing and evidence requirements.',
  },
  {
    id: 3,
    question: 'Are SAFE notes standard in Australia?',
    answer:
      'Yes. An Australian Law Firm (AUSSAFE) style note or the Y Combinator-style SAFE adapted for Australian law is common for pre-seed/seed. Most local angels and syndicates will use capped or uncapped SAFEs with MFN and pro-rata. Ensure the governing law, valuation cap, and discount are explicit, and get legal review before signing.',
  },
  {
    id: 4,
    question: 'Do I need ESIC status before talking to investors?',
    answer:
      'Early Stage Innovation Company (ESIC) eligibility is not mandatory, but it is attractive to Australian angels because it can provide tax offsets and CGT exemptions. If you think you qualify, prepare an ESIC self-assessment (or obtain an ATO ruling) so investors know where you stand.',
  },
  {
    id: 5,
    question: 'Can I raise from overseas investors while based in Australia?',
    answer:
      'Yes, but be clear on foreign investment rules (FIRB can apply for sensitive sectors), currency terms, and whether your constitution or shareholders agreement needs updates. Many Australian startups keep an Australian holding company and add a US Delaware subsidiary later if needed for specific funds.',
  },
  {
    id: 6,
    question: 'What documents do Australian investors expect in 2026?',
    answer:
      'Typical seed data rooms include: a concise deck (problem, solution, traction, market), a one-page financial model with runway/ask, cap table, constitution/shareholders agreement, IP assignments, privacy and AI-use statements (if applicable), and evidence of pilots or revenue. Keep them dated “as at <month/year>” and update after any material change.',
  },
]

export const summaryHighlights = {
  heading: `Key facts: ${TOPIC}`,
  intro:
    'Practical 2026 view for Australian founders: local grants first, transparent cap tables, ESIC where possible, and clear data governance for AI-enabled products.',
  items: [
    {
      label: 'What are the main ways to fund a startup in Australia?',
      description: 'Combine non-dilutive options (R&D Tax Incentive, EMDG, state vouchers) with angels/syndicates for speed, then VC or revenue finance when you have traction.',
    },
    {
      label: 'How much traction do Australian investors expect in 2026?',
      description: 'Seed investors typically want proof of problem–solution fit, pilots converting to paid, and a path to AU$50k+ MRR with manageable churn inside 18–24 months.',
    },
    {
      label: 'Should I use a lawyer for my term sheet or SAFE?',
      description: 'Yes—local legal review helps align on valuation cap, discount, information rights, and ESIC/tax implications before you sign.',
    },
  ],
}

const breadcrumbs = [
  { label: 'Home', href: '/', icon: Home },
  { label: 'Articles', href: '/articles' },
  { label: TOPIC, current: true },
]

export default function ArticlePage() {
  const authorDetails = getAuthorProfile('samDonegan')

  return (
    <article className="bg-transparent">
      <ArticleHeroHeader
        breadcrumbs={breadcrumbs}
        title={TOPIC}
        headerBgColor="cyan"
        summary={summaryHighlights}
        heroImage={HERO_IMAGE}
        heroImageAlt={HERO_IMAGE_ALT}
      />

      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-10">
        <div className="mb-10">
          <ArticleTocPlaceholder />
        </div>

        <div className="prose prose-lg prose-indigo max-w-none text-gray-700">
          <p>
            <strong>{TOPIC}</strong> – Australian venture funding tightened through 2024, but founders who paired early revenue with targeted grants and clean governance were still closing rounds in 8–14 weeks. This guide shows the 2026-ready pathways, documents, and milestones local investors and grant assessors actually expect.
          </p>

          <ArticleImageBlock src={HERO_IMAGE} alt={HERO_IMAGE_ALT} />

          {/* SECTION PATTERN: Research-Derived H2 */}
          <h2>Map your funding options in Australia (2026 overview)</h2>
          <p>
            Australian founders typically combine three capital types: (1) non-dilutive sources like the R&D Tax Incentive, Export Market Development Grants (EMDG), and state innovation vouchers; (2) equity from angels, syndicates, and early-stage VCs using SAFEs or priced rounds; and (3) debt or revenue-based finance for post-revenue teams. Start with the cheapest capital you qualify for, then layer equity when you can evidence repeatable demand and responsible operations.
          </p>

          {/* SECTION PATTERN: Callout Box */}
          <QuoteBlock variant="orange" title="Start with the cheapest capital" icon="💡">
            Sequence matters: prove customer pull with grants and revenue first, then negotiate equity with better leverage and less dilution.
          </QuoteBlock>

          {/* SECTION PATTERN: Additional H2s (generate 3-6 more based on research) */}
          <h2>Validate the right capital type: grants, equity, debt, and revenue finance</h2>
          <img src="https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-671ca2aa-27c3-437a-899f-dd4c881ec7d2.jpg?alt=media&token=4e75791c-075e-4aa5-a9e4-fbd3e2b1522f" alt="Group of diverse entrepreneurs collaborate in a 90s-inspired tech startup environment, discussing funding options." className="w-full rounded-lg my-8" />

          <p>
            Non-dilutive programs reduce risk and signal credibility. As at 2026, the Industry Growth Program and state-based innovation funds support MVP build and commercialisation for priority sectors. Angels and syndicates are best for speed and advice at pre-seed/seed; they usually want evidence of problem–solution fit and a clear plan to reach AU$1–3m ARR within 18–24 months. Venture debt and revenue-based finance become realistic once you have predictable monthly revenue and low churn.
          </p>

          <h3>Government and grant pathways (as at 2026)</h3>
          <p>
            Check business.gov.au for current guidelines. The R&D Tax Incentive remains the most accessible program for eligible R&D spend, but you must document hypotheses, experiments, and nexus to new knowledge. The Export Market Development Grant supports eligible overseas marketing, while state vouchers (e.g. LaunchVic, Advance Queensland) can offset pilot costs. Most programs require an ABN, compliant bookkeeping, and clear milestones.
          </p>

          <h3>Private capital: angels, syndicates, and VC</h3>
          <p>
            Angels often move fastest and may offer smaller tickets (AU$25k–$250k) with industry expertise. Syndicates (e.g. community angel groups) pool tickets to meet a target round size. Seed VCs expect a validated wedge—repeatable sales motion, pilot-to-paid conversion, and a founder-friendly cap table. If using SAFEs, align on valuation cap, discount, and information rights, and keep a rolling cap table to avoid stacking too many notes.
          </p>

          <h3>Alternatives: loans and revenue-based finance</h3>
          <p>
            Venture debt and RBF providers usually look for 8–12 months of revenue history, gross margins that support repayments, and clear visibility on churn. Avoid taking debt for speculative R&D; use it to extend runway on proven revenue or to finance working capital. Always compare effective APR and covenant requirements to equity dilution.
          </p>

          <h2>Prepare investor-ready essentials (governance, ESIC, data)</h2>
          <img src="https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-ecc283dd-8a63-4d9e-8c39-1b0d03eb7d66.jpg?alt=media&token=2fc2e7a0-9bcc-46cb-a48e-5c97b8f91cc0" alt="Tech-savvy professionals in a vibrant 90s film aesthetic brainstorm for investor-ready essentials." className="w-full rounded-lg my-8" />

          <p>
            Clean governance reduces friction. Maintain signed IP assignments, a clear constitution/shareholders agreement, and a single source of truth for your cap table. If you qualify for ESIC, document it—many Australian angels prefer ESIC-eligible companies for tax reasons. For AI-enabled products, include a short model-use statement covering data sources, evaluation, privacy, and human-in-the-loop controls aligned to OAIC privacy principles.
          </p>

          <h2>Where to meet investors and assess fit in 2026</h2>
          <p>
            Prioritise warm introductions via customers, alumni, or founders in your sector. National programs (e.g. Startmate, Antler) and university accelerators still host demo days. Sector events—MedTech, ClimateTech, Cyber—attract specialist funds. Keep a shortlist by thesis, cheque size, and stage. Track interactions in a lightweight CRM and share monthly updates to build trust before you open the round.
          </p>

          <h2>How much to raise and the milestones to anchor on</h2>
          <p>
            Typical 2026 pre-seed rounds in Australia are AU$500k–$1.5m; seed ranges AU$1.5m–$4m. Set the amount based on 18 months of runway to reach the next evidence line—e.g. AU$50k+ MRR with sub-5% monthly churn, or 3–5 enterprise pilots converting to annual contracts. Anchor your ask on milestones, not just time.
          </p>

          <h2>Due diligence and compliance: privacy, AI safety, and directors’ duties</h2>
          <p>
            Investors will check corporate records, financial controls, tax compliance, privacy notices, data storage locations, and cyber practices. If you use AI models, explain data retention, fine-tuning datasets, and evaluation. Directors must meet duties under the Corporations Act; keep board minutes and related-party disclosures tidy. When in doubt, seek advice from an Australian lawyer or accountant familiar with startups.
          </p>

          {/* SECTION PATTERN: Persona Grid using AudienceGrid */}
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

          {/* SECTION PATTERN: Conclusion/Summary */}
          <h2>Turn investor interest into signed terms</h2>
          <p>
            Run a time-boxed raise (6–10 weeks), share concise updates, and keep one source of truth for metrics and documents. Use soft commits to build momentum, keep diligence responses dated, and avoid over-committing equity before you confirm your lead. Close with a clear use-of-funds plan and a path to the next evidence line.
          </p>

          <ArticleStepList
            title="Your Next Steps"
            accent="indigo"
            className="not-prose"
            steps={[
              'List your next 3 evidence milestones (e.g. pilots, MRR, security review) and size the raise to fund them.',
              'Prepare a dated data room: deck, financial model, cap table, ESIC notes, privacy and AI-use statements.',
              'Book 10–15 investor or grant conversations in one 4-week window and track outcomes in a simple CRM.',
            ]}
          />

          <div className="my-12 not-prose">
            <ArticleCompanyCTA
              title={`Need help with ${TOPIC}?`}
              body="Get practical recommendations based on your goals, time, and experience level."
              buttonText="Get recommendations"
              buttonHref="#"
              note="You can filter by topic, format (online/in‑person), and experience level."
            />
          </div>
        </div>

        <AuthorBio author={authorDetails} />

        <div className="mt-12">
          <ArticleFAQ items={faqItems} />
        </div>

        <ArticleFooterNav backHref="/articles" topHref="#" />
      </div>
    </article>
  )
}
