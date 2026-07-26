import type { ReactNode } from 'react'
import { Home } from 'lucide-react'
import { DEFAULT_AUTHOR_KEY, getAuthorProfile, DEFAULT_AUTHOR_AVATAR_FALLBACK_URL } from '../../authors'
import { ArticleFAQ } from '../../../components/articles/ArticleFAQ'
import ArticleCompanyCTA from '../../../components/articles/ArticleCompanyCTA'
import { ArticleHeroHeader } from '../../../components/articles/ArticleHeroHeader'
import { ArticleImageBlock } from '../../../components/articles/ArticleImageBlock'
import { ArticleFooterNav } from '../../../components/articles/ArticleFooterNav'
import ArticleTocPlaceholder from '../../../components/articles/ArticleTocPlaceholder'
import { ArticleReferences } from '../../../components/articles/ArticleReferences'
import ArticleDisclaimer from '../../../components/articles/ArticleDisclaimer'
import QuoteBlock from '../../../components/articles/QuoteBlock'
import AudienceGrid from '../../../components/articles/AudienceGrid'
import { ArticleStepList } from '../../../components/articles/ArticleStepList'
import { ArticleResourceCTA } from '../../../components/articles/ArticleResourceCTA'

export const useCustomHeader = true

const TOPIC = 'Invest in Business Startups Before You Commit'
export const CATEGORY = 'featured'
export const SLUG = 'invest-in-business-startups-before-you-commit'
export const DATE_PUBLISHED = '2026-07-15'
export const DATE_MODIFIED = '2026-07-15'
export const DESCRIPTION = 'Invest in business startups with a disciplined review of team, market, evidence and valuation.'
const HERO_IMAGE = 'https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Fhero-e0c9e564-2307-4457-8728-32dba9f6de85.jpg?alt=media&token=508f7364-448a-4d95-b25c-7122d20de479'
const HERO_IMAGE_ALT = 'Founder and investor reviewing startup financials and market notes at a small table'
export const FEATURED_FOCUS = 'funding'

const AUTHOR_PROFILE = getAuthorProfile(DEFAULT_AUTHOR_KEY)
const AUTHOR = AUTHOR_PROFILE?.name ?? 'Dr Sam Donegan'
const AUTHOR_ROLE = AUTHOR_PROFILE?.role ?? AUTHOR_PROFILE?.credentials ?? 'Founder'
const AUTHOR_BIO = AUTHOR_PROFILE?.bio ?? ''
const AUTHOR_AVATAR = AUTHOR_PROFILE?.avatarUrl ?? DEFAULT_AUTHOR_AVATAR_FALLBACK_URL

interface FAQ {
  id: number
  question: string
  answer: ReactNode
}

type AuthorDetails = {
  name: string
  role: string
  bio: string
  avatarUrl: string
}

function AuthorBio({ author }: { author: AuthorDetails }) {
  const initials = author.name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('')

  return (
    <section className='rounded-3xl border border-slate-200 bg-slate-50 px-6 py-6'>
      <div className='flex flex-col gap-4 sm:flex-row sm:items-center'>
        <div
          role='img'
          aria-label={author.name}
          className='flex h-20 w-20 items-center justify-center rounded-full bg-slate-200 bg-cover bg-center text-lg font-semibold text-slate-700'
          style={author.avatarUrl ? { backgroundImage: `url(${author.avatarUrl})` } : undefined}
        >
          {author.avatarUrl ? null : initials}
        </div>
        <div>
          <p className='text-lg font-semibold text-slate-900'>{author.name}</p>
          <p className='text-sm font-medium uppercase tracking-[0.18em] text-slate-500'>{author.role}</p>
        </div>
      </div>
      {author.bio ? <p className='mt-4 text-base leading-7 text-slate-700'>{author.bio}</p> : null}
    </section>
  )
}

export const faqItems: FAQ[] = [
  { id: 1, question: 'How should you assess startup founders before investing?', answer: 'Assess whether the founders understand the problem and can make sound decisions while building. Clear answers should link the customer, the problem and the next practical step.' },
  { id: 2, question: 'What early customer evidence should investors look for?', answer: 'Look for evidence that founders have tested assumptions with customers and learned from those conversations. Customer interest or early use is stronger when linked to a clear problem and product value.' },
  { id: 3, question: 'Why is a large market estimate not enough?', answer: 'A large market estimate does not show who will adopt first or why. A credible market case connects the initial customer segment to a practical path for broader growth.' },
  { id: 4, question: 'When should an investor seek independent advice?', answer: 'Seek independent legal, tax and financial advice where appropriate to your circumstances before acting. Early-stage investing involves substantial uncertainty, and no valuation approach removes it.' },
]

export const summaryHighlights = {
  heading: 'Key facts: Invest in Business Startups Before You Commit',
  intro: 'Invest in business startups with a disciplined review of team, market, evidence and valuation.',
  items: [
    { label: 'What should you assess before investing in an early-stage startup?', description: 'Assess the founders’ ability to execute, the customer problem, market opportunity, available traction and valuation together. A prototype, pitch or single metric alone does not prove an investable business.' },
    { label: 'How should you assess a startup’s valuation?', description: 'Treat early-stage valuation as a judgement rather than a precise formula, then connect it to comparable context and the milestone the new capital is intended to fund.' },
    { label: 'When should you decline a startup investment?', description: 'Decline an opportunity when you cannot understand or accept its risks. A decision should rest on a connected case across the team, problem, market, evidence and valuation.' },
  ],
}

export const articleMeta = {
  title: 'Invest in Business Startups Before You Commit',
  topic: TOPIC,
  category: CATEGORY,
  slug: SLUG,
  description: DESCRIPTION,
  datePublished: DATE_PUBLISHED,
  dateModified: DATE_MODIFIED,
  author: AUTHOR,
  image: HERO_IMAGE,
  imageAlt: HERO_IMAGE_ALT,
  featuredFocus: FEATURED_FOCUS,
}

const faqSchemaItems = [
  { question: 'What should you assess before investing in an early-stage startup?', answer: 'Assess the founders’ ability to execute, the customer problem, market opportunity, available traction and valuation together. A prototype, pitch or single metric alone does not prove an investable business.' },
  { question: 'How should you assess a startup’s valuation?', answer: 'Treat early-stage valuation as a judgement rather than a precise formula, then connect it to comparable context and the milestone the new capital is intended to fund.' },
  { question: 'When should you decline a startup investment?', answer: 'Decline an opportunity when you cannot understand or accept its risks. A decision should rest on a connected case across the team, problem, market, evidence and valuation.' },
  { question: 'How should you assess startup founders before investing?', answer: 'Assess whether the founders understand the problem and can make sound decisions while building. Clear answers should link the customer, the problem and the next practical step.' },
  { question: 'What early customer evidence should investors look for?', answer: 'Look for evidence that founders have tested assumptions with customers and learned from those conversations. Customer interest or early use is stronger when linked to a clear problem and product value.' },
  { question: 'Why is a large market estimate not enough?', answer: 'A large market estimate does not show who will adopt first or why. A credible market case connects the initial customer segment to a practical path for broader growth.' },
  { question: 'When should an investor seek independent advice?', answer: 'Seek independent legal, tax and financial advice where appropriate to your circumstances before acting. Early-stage investing involves substantial uncertainty, and no valuation approach removes it.' },
]

const faqStructuredData = faqSchemaItems.length
  ? JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqSchemaItems.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: { '@type': 'Answer', text: item.answer },
      })),
    })
  : null

function ContentFactoryInspectorBridge() {
  return null
}

export default function ArticleContent() {
  const authorDetails = { name: AUTHOR, role: AUTHOR_ROLE, bio: AUTHOR_BIO, avatarUrl: AUTHOR_AVATAR }

  return (
    <>
      {faqStructuredData ? <script type='application/ld+json' dangerouslySetInnerHTML={{ __html: faqStructuredData }} /> : null}
      <ContentFactoryInspectorBridge />
      <ArticleHeroHeader
        breadcrumbs={[
          { label: 'Home', href: '/', icon: Home },
          { label: 'Articles', href: '/articles' },
          { label: TOPIC, current: true },
        ]}
        title={TOPIC}
        titleHighlight={TOPIC}
        headerBgColor='cyan'
        summary={summaryHighlights}
        heroImage={HERO_IMAGE}
        heroImageAlt={HERO_IMAGE_ALT}
      />

      <ArticleTocPlaceholder className='bg-transparent' />

      <div className='prose prose-lg prose-slate max-w-none bg-transparent'>
        <div id='why-early-stage-review-needs-discipline' data-cf-component-id={'section:why-early-stage-review-needs-discipline'} data-cf-component-type={'section'} data-cf-component-label={'Start With Evidence, Not Pitch Momentum'} data-cf-source-section-id={'why-early-stage-review-needs-discipline'}>
          <p><strong>{TOPIC}</strong> — {'A prototype, business plan and confident pitch can show that a startup has begun to take shape. They do not, on their own, prove that the business is ready for investment. Early-stage investing involves substantial uncertainty, so the aim is not to find certainty.'}</p>
          <p>{'Start by separating the main parts of the investment case. Look at the founding team’s ability to execute, whether the product addresses a real problem, the market opportunity and any available traction. Early-stage investors often place significant weight on the team, but team quality should sit alongside product, market and customer evidence. Review these signals together rather than letting a polished pitch, a single metric or a proposed valuation decide the outcome.'}</p>
        </div>

        <div data-cf-component-id={'audience-grid:review-depth-by-investor'} data-cf-component-type={'audience-grid'} data-cf-component-label={'Choose the depth of your review'}>
          <AudienceGrid
            heading='Choose the depth of your review'
            cards={[
              { title: 'First-time angel investor', description: 'Slow down, document the assumptions behind the pitch and seek independent legal, tax and financial advice where appropriate before acting.', variant: 'purple' },
              { title: 'Operator or domain investor', description: 'Test customer, market and execution claims independently, even when the industry narrative or product problem feels familiar.', variant: 'purple' },
            ]}
          />
        </div>

        <div id='assess-the-founding-team' data-cf-component-id={'section:assess-the-founding-team'} data-cf-component-type={'section'} data-cf-component-label={'Assess Whether the Founders Can Execute'} data-cf-source-section-id={'assess-the-founding-team'}>
          <h2>{'Assess Whether the Founders Can Execute'}</h2>
          <p>{'At the earliest stage, the founding team is often the central underwriting question. A product may still be incomplete and market evidence may be limited, so assess whether the founders understand the problem well enough to make sound decisions as they build.'}</p>
          <p>{'Use conversations to test how the founders think, not just how they present. Clear answers should connect the problem, the customer and the next practical step. Strong credentials are useful context, but early-stage conviction should rest on demonstrated judgment, learning speed and ability to execute.'}</p>
          <div data-cf-component-id={'image:assess-the-founding-team'} data-cf-component-type={'image'} data-cf-component-label={'Image: Assess Whether the Founders Can Execute'} data-cf-source-section-id={'assess-the-founding-team'}>
            <ArticleImageBlock
              src='https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-0f9b6e4a-448f-46d8-8639-d5e1315b6f50.jpg?alt=media&token=74dbaafe-f94d-4de6-87cc-290c6a3b4bcc'
              alt='Founders sort customer feedback cards beside notes and coffee during a candid product-priority review'
              caption='Assess Whether the Founders Can Execute'
              width={1200}
              height={800}
            />
          </div>
          <QuoteBlock title='Key insight' variant='purple'>
            {'Strong credentials are useful context, but early-stage conviction should rest on demonstrated judgment, learning speed and ability to execute.'}
          </QuoteBlock>
        </div>

        <div className='mt-10' data-cf-component-id={'quote:execution-capacity-insight'} data-cf-component-type={'quote'} data-cf-component-label={'Key insight'}>
          <QuoteBlock title='Key insight' variant='orange'>
            {'At the earliest stages, you are underwriting a team’s capacity to execute, not a finished business.'}
          </QuoteBlock>
        </div>

        <div id='test-problem-market-and-traction' data-cf-component-id={'section:test-problem-market-and-traction'} data-cf-component-type={'section'} data-cf-component-label={'Test the Problem, Market and Early Customer Evidence'} data-cf-source-section-id={'test-problem-market-and-traction'}>
          <h2>{'Test the Problem, Market and Early Customer Evidence'}</h2>
          <p>{'A practical way to think about test the problem, market and early customer evidence is through Start with the customer problem and Connect early demand to a scalable market.'}</p>
          <p>{'In practice, test the Problem, Market and Early Customer Evidence works best when the section stays specific about what changes first, why it matters, and how the reader can apply the idea without filler.'}</p>
          <div data-cf-component-id={'image:test-problem-market-and-traction'} data-cf-component-type={'image'} data-cf-component-label={'Image: Test the Problem, Market and Early Customer Evidence'} data-cf-source-section-id={'test-problem-market-and-traction'}>
            <ArticleImageBlock
              src='https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-0c9f4344-3f46-48b7-8d99-912684987ff9.jpg?alt=media&token=84609ad2-ac35-4d82-9f06-520799e4fcf3'
              alt='Ultra close-up of diverse founders in a skeptical conversation about customer demand and market fit'
              caption='Test the Problem, Market and Early Customer Evidence'
              width={1200}
              height={800}
            />
          </div>
          <QuoteBlock title='' variant='purple'>
            {'A large market estimate does not replace a clear explanation of who will adopt the product first and why.'}
          </QuoteBlock>
          <h3>{'Start with the customer problem'}</h3>
          <p>{'A polished product, prototype or pitch is not enough on its own.'}</p>
          <p>{'Look for evidence that the team has tested its assumptions with customers and learned from those conversations. Early-stage investors assess whether the product solves a real problem, alongside the team’s ability to execute. The aim is not to expect certainty at an early stage. It is to understand how the founders know the problem is worth solving and how they are improving the product based on what they learn.'}</p>
          <h3>{'Connect early demand to a scalable market'}</h3>
          <p>{'Customer interest, early use or feedback can help inform the discussion, but should be linked to a clear explanation of the customer problem and the product’s value.'}</p>
          <p>{'Then test the logic for growth beyond the first niche. A market opportunity is more credible when the company can explain how an initial customer segment connects to a wider, scalable business. Large market estimates can be useful context, but they do not replace a practical account of early adoption. The market case should connect the problem, the product, the first customers and the path to reaching more customers.'}</p>
        </div>

        <div id='review-valuation-in-context' data-cf-component-id={'section:review-valuation-in-context'} data-cf-component-type={'section'} data-cf-component-label={'Review Valuation in Context of the Next Milestone'} data-cf-source-section-id={'review-valuation-in-context'}>
          <h2>{'Review Valuation in Context of the Next Milestone'}</h2>
          <p>{'Early-stage valuation is a judgement, not a precise formula. Young companies often have limited operating history and uncertain future cash flows, so a valuation can reflect the team, product, market potential, business model and other qualitative factors. A high valuation does not, by itself, show that a startup is a strong investment.'}</p>
          <p>{'Comparable companies or transactions can provide a useful benchmark, but the comparison needs context. Ask whether the businesses are at a similar stage, serve a similar market and have broadly comparable commercial conditions. Then connect the proposed valuation to the use of new capital. What milestone is the round intended to fund, and would reaching it strengthen the company’s position with customers or future investors? The answer matters more than a headline number alone.'}</p>
          <QuoteBlock title='Keep perspective' variant='purple'>
            {'Do not treat a high valuation as validation on its own. Assess the assumptions and milestones that would need to support it.'}
          </QuoteBlock>
        </div>

        <div id='run-a-staged-diligence-process' data-cf-component-id={'section:run-a-staged-diligence-process'} data-cf-component-type={'section'} data-cf-component-label={'Run a Staged Diligence Process Before Deciding'} data-cf-source-section-id={'run-a-staged-diligence-process'}>
          <h2>{'Run a Staged Diligence Process Before Deciding'}</h2>
          <p>{'Start with the pitch materials and a focused conversation with the founders. Use this first pass to identify the central claims: who the customer is, what problem the business solves, why the team can execute, how large the market may be, and how the company plans to use funding. Early-stage investors often place significant weight on the founding team, alongside the product, traction and market opportunity. It is to decide which claims need clearer evidence or sharper questions.'}</p>
          <p>{'Ask how the team understands the customer problem, what supports its market logic, what evidence of traction exists, and how the funding plan relates to the next business milestone.'}</p>
          <div data-cf-component-id={'image:run-a-staged-diligence-process'} data-cf-component-type={'image'} data-cf-component-label={'Image: Run a Staged Diligence Process Before Deciding'} data-cf-source-section-id={'run-a-staged-diligence-process'}>
            <ArticleImageBlock
              src='https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-e48e3a61-cde7-4da8-b12d-02ab4e5ae757.jpg?alt=media&token=8711ef8b-1d5b-4c71-9c3a-b7a113460c1e'
              alt='Investor desk with startup pitch deck, customer notes, and a handwritten diligence decision log'
              caption='Run a Staged Diligence Process Before Deciding'
              width={1200}
              height={800}
            />
          </div>
        </div>

        <div data-cf-component-id={'step-list:four-phase-review'} data-cf-component-type={'step-list'} data-cf-component-label={'A four-phase startup review'}>
          <ArticleStepList
            title='A four-phase startup review'
            steps={[
              'Capture the startup’s core claims from the pitch.',
              'Test the founders, customer problem and market with follow-up questions.',
              'Examine traction, valuation context and the intended use of capital.',
              'Record evidence and gaps, then proceed, pause or decline.',
            ]}
            accent='teal'
          />
        </div>

        <div id='make-a-deliberate-investment-decision' data-cf-component-id={'section:make-a-deliberate-investment-decision'} data-cf-component-type={'section'} data-cf-component-label={'Make a Deliberate Decision and Keep Learning'} data-cf-source-section-id={'make-a-deliberate-investment-decision'}>
          <h2>{'Make a Deliberate Decision and Keep Learning'}</h2>
          <p>{'A startup investment decision should rest on a connected case, not one exciting claim. Consider whether the founding team can execute, the product addresses a real problem, the market has room to grow, and the available early evidence supports the story. Then ask whether the valuation is reasonable in that context. Valuation approaches can use comparable companies, team and market factors, or expected future outcomes, but none removes uncertainty.'}</p>
          <p>{'Decline an opportunity when you cannot understand or accept the risks. Over time, this can sharpen a personal investment thesis and a repeatable diligence process. Seek independent legal, tax and financial advice where it is appropriate to your circumstances before acting.'}</p>
          <ul>
            <li>{'Proceed only when the team, problem, market, evidence and valuation case fit together.'}</li>
            <li>{'Use each review to improve your criteria and questions, rather than chase certainty or headline returns.'}</li>
          </ul>
          <div data-cf-component-id={'image:make-a-deliberate-investment-decision'} data-cf-component-type={'image'} data-cf-component-label={'Image: Make a Deliberate Decision and Keep Learning'} data-cf-source-section-id={'make-a-deliberate-investment-decision'}>
            <ArticleImageBlock
              src='https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-af8f1e09-a92e-494c-bb60-73c24beb8d11.jpg?alt=media&token=12298ae9-c139-4376-850e-c9a2a9f3b366'
              alt='Startup founders reviewing product metrics and market notes together in a candid office meeting'
              caption='Make a Deliberate Decision and Keep Learning'
              width={1200}
              height={800}
            />
          </div>
        </div>

        <div data-cf-component-id={'resource-cta'} data-cf-component-type={'resource-cta'} data-cf-component-label={'Get the resource'}>
          <ArticleResourceCTA
            eyebrow='Free checklist'
            title={'Startup Investment Diligence Checklist'}
            description='Use this checklist to assess a startup investment case systematically, identify questions that need evidence and make a deliberate decision.'
            buttonLabel='Download the PDF'
            buttonHref='https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fresources%2Finvest-in-business-startups-before-you-commit-checklist-1be8dc63.pdf?alt=media&token=545c6aac-9511-431f-a212-9e80b1e91825'
            accent='purple'
            previewCards={[
              { title: 'Five-part diligence', subtitle: 'PDF', color: 'bg-[#ff3d00]', textColor: 'text-white', rotationClass: 'rotate-[-6deg]' },
              { title: 'Decision checklist', subtitle: 'PDF', color: 'bg-[#00ffd7]', textColor: 'text-black', rotationClass: 'rotate-[7deg]' },
            ]}
          />
        </div>

        <ArticleReferences
          references={[
            { id: 1, href: 'https://www.svb.com/startup-insights/startup-strategy/what-investors-look-for-povs-from-the-other-side-of-the-table/', title: 'What Investors Look For & Questions They Will Ask', publisher: 'svb.com', description: 'Authoritative reference supporting What Investors Look For & Questions They Will Ask.', category: 'guide' },
            { id: 2, href: 'https://vivatech.com/news/investment-checklist-for-startups-what-investors-want-to-see', title: 'Startup Investment Checklist: A Guide to Securing Funding', publisher: 'vivatech.com', description: 'Authoritative reference supporting Startup Investment Checklist: A Guide to Securing Funding.', category: 'guide' },
            { id: 3, href: 'https://www.forumvc.com/thought-pieces/what-vcs-look-for-early-stage-investment', title: 'What VCs Look for in Early-Stage Startups: Key Criteria', publisher: 'forumvc.com', description: 'Authoritative reference supporting What VCs Look for in Early-Stage Startups: Key Criteria.', category: 'guide' },
            { id: 4, href: 'https://www.linkedin.com/posts/gregmoran_how-to-evaluate-a-startups-valuation-before-activity-7277084309407055873-KmLY', title: 'How to Evaluate a Startup’s Valuation Before You Invest 💡 Startup investing is about more than just numbers—it’s about making informed decisions based on the right frameworks. Here’s how to… | Greg Moran', publisher: 'linkedin.com', description: 'Authoritative reference supporting How to Evaluate a Startup’s Valuation Before You Invest 💡 Startup investing is about more than just numbers—it’s about making informed decisions based on the right frameworks. Here’s how to… | Greg Moran.', category: 'guide' },
            { id: 5, href: 'https://www.brex.com/journal/startup-valuation', title: 'How to do a startup valuation: 8 different methods', publisher: 'brex.com', description: 'Authoritative reference supporting How to do a startup valuation: 8 different methods.', category: 'guide' },
            { id: 6, href: 'https://sprintlaw.com.au/articles/startup-investment-in-australia-essential-legal-and-business-guide/', title: 'Startup Investment in Australia | Sprintlaw Australia', publisher: 'sprintlaw.com.au', description: 'Authoritative reference supporting Startup Investment in Australia | Sprintlaw Australia.', category: 'guide' },
            { id: 7, href: 'https://europe.republic.com/investors-site/guides/how-to-select-startups-to-invest-in/', title: 'How To Select Startups To Invest In - Republic Europe Investor Resources', publisher: 'europe.republic.com', description: 'Authoritative reference supporting How To Select Startups To Invest In - Republic Europe Investor Resources.', category: 'guide' },
            { id: 8, href: 'https://www.bentleys.com.au/resources/startup-funding-strategy-advising-australian-entrepreneurs-on-how-to-get-capital-growth/', title: 'Startup Funding Australia: Get Capital & Grow Your Business', publisher: 'bentleys.com.au', description: 'Authoritative reference supporting Startup Funding Australia: Get Capital & Grow Your Business.', category: 'guide' },
            { id: 9, href: 'https://sprintlaw.com.au/articles/small-business-investment-in-australia-essential-legal-guide/', title: 'Small Business Investment in Australia: Guide | Sprintlaw Australia', publisher: 'sprintlaw.com.au', description: 'Authoritative reference supporting Small Business Investment in Australia: Guide | Sprintlaw Australia.', category: 'guide' },
            { id: 10, href: 'https://aerion.com.au/blog/investing-in-startups-rewards-and-risks/', title: 'Investing in Startups: Rewards and Risks Guide', publisher: 'aerion.com.au', description: 'Authoritative reference supporting Investing in Startups: Rewards and Risks Guide.', category: 'guide' },
          ]}
          heading='Sources & further reading'
        />

        <ArticleDisclaimer />

        <div className='my-12 not-prose' data-cf-component-id={'cta'} data-cf-component-type={'company-cta'} data-cf-component-label={'Company CTA'}>
          <ArticleCompanyCTA
            title='Make decisions from connected evidence'
            body='Record the claims, supporting evidence and open questions before deciding whether the investment case is strong enough to proceed.'
            buttonText='Review the decision framework'
            buttonHref='#run-a-staged-diligence-process'
          />
        </div>
      </div>

      <div data-cf-component-id={'author-bio'} data-cf-component-type={'author-bio'} data-cf-component-label={'About the Author'}>
        <AuthorBio author={authorDetails} />
      </div>

      <div className='mt-12' data-cf-component-id={'faq'} data-cf-component-type={'faq'} data-cf-component-label={'FAQ'}>
        <ArticleFAQ items={faqItems} />
      </div>

      <ArticleFooterNav backHref='/articles' topHref='#' />
    </>
  )
}
