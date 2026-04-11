import type { ReactNode } from 'react'
import { Home } from 'lucide-react'
import { AcademicCapIcon, RocketLaunchIcon, UsersIcon } from '@heroicons/react/24/outline'
import { DEFAULT_AUTHOR_KEY, getAuthorProfile, DEFAULT_AUTHOR_AVATAR_FALLBACK_URL } from '~/articles/authors'
import { ArticleFAQ } from '../../../components/articles/ArticleFAQ'
import ArticleCompanyCTA from '../../../components/articles/ArticleCompanyCTA'
import AuthorBio from '../../../components/AuthorBio'
import { ArticleHeroHeader } from '../../../components/articles/ArticleHeroHeader'
import { ArticleImageBlock } from '../../../components/articles/ArticleImageBlock'
import { ArticleFooterNav } from '../../../components/articles/ArticleFooterNav'
import QuoteBlock from '../../../components/articles/QuoteBlock'
import ArticleTocPlaceholder from '../../../components/articles/ArticleTocPlaceholder'
import AudienceGrid from '../../../components/articles/AudienceGrid'
import { ArticleResourceCTA } from '../../../components/articles/ArticleResourceCTA'
import { ArticleStepList } from '../../../components/articles/ArticleStepList'
import MLAITemplateResourceCTA from '../../../components/articles/MLAITemplateResourceCTA'
import { ArticleReferences } from '../../../components/articles/ArticleReferences'
import ArticleDisclaimer from '../../../components/articles/ArticleDisclaimer'

export const useCustomHeader = true

const TOPIC = "How to Startup"
export const CATEGORY = "featured"
export const SLUG = "how-to-startup-a-practical-guide-for-first-time-founders"
export const DATE_PUBLISHED = "2026-04-05"
export const DATE_MODIFIED = "2026-04-05"
export const DESCRIPTION = "Learn how to startup with a practical sequence: validate customer demand, choose the right team, plan lean, and handle Australian registration and money basics."
const HERO_IMAGE = "https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Fhero-85569f30-d263-436f-8592-5bf00e6247cb.jpg?alt=media&token=c98809c7-6e60-40b8-bf89-1cbe6844e7a0"
const HERO_IMAGE_ALT = "How to Startup"
export const FEATURED_FOCUS = "startups"

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

export const faqItems: FAQ[] = [
  { id: 1, question: "What should founders do first when starting a startup?", answer: "Start by checking whether you are solving a real problem for a defined customer. The article separates the process into validation first, planning second, and formal setup after that." },
  { id: 2, question: "Why is customer validation more important than early branding or scale plans?", answer: "Customer validation helps founders learn whether people actually want the solution before committing major time or money. That reduces waste and makes later product, branding, and growth decisions more grounded." },
  { id: 3, question: "How should co-founders divide work early on?", answer: "Founders should agree on complementary roles, decision rights, time commitment, and near-term goals before pressure builds. Clear working norms make coordination easier when the business is still small and uncertain." },
  { id: 4, question: "What belongs in a lean startup plan?", answer: "A lean plan should define who the business serves, what problem it solves, what it sells, how revenue may work, and which assumptions need testing first. It should be simple enough to update as evidence changes." },
  { id: 5, question: "When do Australian founders need to think about structure and registration?", answer: "Founders need to work out when they are in business and choose a suitable structure early enough to operate properly. The grounded sections note common structures such as sole trader, partnership, company, and trust." },
  { id: 6, question: "Why separate business finances from personal finances early?", answer: "Clear financial separation makes it easier to track income, spending, assets, and obligations from the start. It also reduces friction when invoicing, reporting, and meeting tax or super requirements later." },
]

export const summaryHighlights = {
  heading: "Key facts: How to Startup",
  intro: "Learn how to startup with a practical sequence: validate customer demand, choose the right team, plan lean, and handle Australian registration and money basics.",
  items: [
    { label: "Is it true that 90% of startups fail?", description: "This article does not verify a single failure-rate figure. It shows that early startup outcomes depend heavily on customer demand, team quality, and keeping spending low while testing assumptions." },
    { label: "What is the 80/20 rule for startups?", description: "The grounded guidance here points to focusing on the few early decisions that matter most: solve a real problem, define roles, plan simply, and avoid waste. It does not present a formal 80/20 formula." },
    { label: "Is $5000 enough to start a business?", description: "The article does not set a minimum startup budget. It emphasises spending as little money as possible at the start and using lean validation to avoid building or buying too much too early." },
  ],
}

export const articleMeta = {
  title: "How to Startup",
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
  { question: "Is it true that 90% of startups fail?", answer: "This article does not verify a single failure-rate figure. It shows that early startup outcomes depend heavily on customer demand, team quality, and keeping spending low while testing assumptions." },
  { question: "What is the 80/20 rule for startups?", answer: "The grounded guidance here points to focusing on the few early decisions that matter most: solve a real problem, define roles, plan simply, and avoid waste. It does not present a formal 80/20 formula." },
  { question: "Is $5000 enough to start a business?", answer: "The article does not set a minimum startup budget. It emphasises spending as little money as possible at the start and using lean validation to avoid building or buying too much too early." },
  { question: "What should founders do first when starting a startup?", answer: "Start by checking whether you are solving a real problem for a defined customer. The article separates the process into validation first, planning second, and formal setup after that." },
  { question: "Why is customer validation more important than early branding or scale plans?", answer: "Customer validation helps founders learn whether people actually want the solution before committing major time or money. That reduces waste and makes later product, branding, and growth decisions more grounded." },
  { question: "How should co-founders divide work early on?", answer: "Founders should agree on complementary roles, decision rights, time commitment, and near-term goals before pressure builds. Clear working norms make coordination easier when the business is still small and uncertain." },
  { question: "What belongs in a lean startup plan?", answer: "A lean plan should define who the business serves, what problem it solves, what it sells, how revenue may work, and which assumptions need testing first. It should be simple enough to update as evidence changes." },
  { question: "When do Australian founders need to think about structure and registration?", answer: "Founders need to work out when they are in business and choose a suitable structure early enough to operate properly. The grounded sections note common structures such as sole trader, partnership, company, and trust." },
  { question: "Why separate business finances from personal finances early?", answer: "Clear financial separation makes it easier to track income, spending, assets, and obligations from the start. It also reduces friction when invoicing, reporting, and meeting tax or super requirements later." },
]

const faqStructuredData = faqSchemaItems.length
  ? JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqSchemaItems.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: item.answer,
        },
      })),
    })
  : null

export default function ArticleContent() {
  const authorDetails = {
    name: AUTHOR,
    role: AUTHOR_ROLE,
    bio: AUTHOR_BIO,
    avatarUrl: AUTHOR_AVATAR,
  }

  return (
    <>
      {faqStructuredData ? (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqStructuredData }} />
      ) : null}
      <ArticleHeroHeader
        breadcrumbs={[
          { label: 'Home', href: '/', icon: Home },
          { label: 'Articles', href: "/articles" },
          { label: TOPIC, current: true },
        ]}
        title={TOPIC}
        titleHighlight={TOPIC}
        headerBgColor="cyan"
        summary={summaryHighlights}
        heroImage={HERO_IMAGE}
        heroImageAlt={HERO_IMAGE_ALT}
      />

      <ArticleTocPlaceholder className="bg-transparent" />

      <div className="prose prose-lg prose-slate max-w-none bg-transparent">
        <p><strong>{TOPIC}</strong> — {"If you are asking how to startup, the useful answer is usually less glamorous than startup culture makes it sound. A startup does not begin with hype, pitch decks, or a perfect origin story. It begins by working on a real problem, with people who can build and learn quickly, and by testing whether customers actually care. Paul Graham reduces this to three basics: good people, something customers want, and spending as little money as possible."}</p>
        <p>{"It also helps to separate the early stages instead of treating everything as one big launch. First, you validate the problem and the customer need. Then you plan how the business will work and how you will reach customers. After that, you handle the formal setup, including registration, finances, and tax obligations. Australian government guidance follows a similar flow, moving from defining and planning the business to registering it, organising finances, and getting customers."}</p>
        <p>{"In practice, how to Startup Without Getting Lost in Startup Hype works best when the section stays specific about what changes first, why it matters, and how the reader can apply the idea without filler."}</p>
        <ArticleImageBlock
          src={HERO_IMAGE}
          alt={HERO_IMAGE_ALT}
          caption="Learn how to startup with a practical sequence: validate customer demand, choose the right team, plan lean, and handle Australian registration and money basics."
          width={1600}
          height={1067}
        />

        <AudienceGrid
          heading="Who is this guide for?"
          cards={[
            {
              title: 'Founders & Builders',
              description: 'For operators validating demand, pitching a vision, and moving before momentum stalls.',
              icon: <RocketLaunchIcon className="h-6 w-6" />,
              variant: 'orange',
            },
            {
              title: 'Students & Switchers',
              description: 'For readers learning how strong technical partners evaluate traction, skills, and fit.',
              icon: <AcademicCapIcon className="h-6 w-6" />,
              variant: 'purple',
            },
            {
              title: 'Community Builders',
              description: 'For connectors, mentors, and organisers helping founders meet collaborators in the right rooms.',
              icon: <UsersIcon className="h-6 w-6" />,
              variant: 'yellow',
            },
          ]}
        />

        <QuoteBlock title="Key insight" variant="purple">
          {"This article does not verify a single failure-rate figure. It shows that early startup outcomes depend heavily on customer demand, team quality, and keeping spending low while testing assumptions."}
        </QuoteBlock>
          <h2>{"Start With a Problem Customers Already Feel"}</h2>
          <p>{"A startup is stronger when it begins with a real customer need instead of a broad vision of what might be popular later. Paul Graham puts this at the centre of starting a startup: make something customers actually want. If the answer is unclear, the business can end up built around the founder\u2019s enthusiasm rather than the customer\u2019s urgency."}</p>
          <p>{"This is why the early stage should focus on validation before heavy building. The business.gov.au guide frames starting a business around what you need to check, decide, and do before you start, and it includes getting customers as a core part of the journey. When the same pain point keeps coming up, the founder has a firmer base for deciding what to build first."}</p>
          <p>{"Starting with customer pain also helps control waste. Graham\u2019s essay links startup success not only to making something people want, but also to spending as little money as possible. Those ideas work together: lightweight validation can reduce the risk of pouring time and cash into features nobody values. A founder does not need a perfect product to learn something useful. Once that is clear, planning, branding, and growth decisions become much easier to make well."}</p>
          <p>{"Instead of asking, \"How big could this become?\" a better early question is, \"Whose problem am I solving right now?\" That mindset keeps the startup grounded in evidence rather than optimism alone. It also gives founders a clearer way to prioritise their next move: learn from customers first, then build only what supports that need."}</p>
          <ArticleImageBlock
            src="https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-e433f0bc-e484-4816-abbf-ba0e306d9ebb.jpg?alt=media&token=5dd855d7-f51a-4182-ad0b-a357cd450d2d"
            alt="Start With a Problem Customers Already Feel"
            caption="Start With a Problem Customers Already Feel"
            width={1200}
            height={800}
          />
          <h2>{"Choose Co-Founders, Skills, and Working Norms Carefully"}</h2>
          <p>{"A startup is heavily shaped by the people who begin it. Paul Graham puts this near the top of the list: successful startups need good people, alongside making something customers want and spending as little money as possible."}</p>
          <p>{"One founder may be better at building the product, while another is better at talking to customers, shaping strategy, or handling operations. Several startup guides also stress that early choices shape what comes next, which makes role clarity important from the start."}</p>
          <p>{"Fewer people can mean faster decisions, clearer accountability, and less coordination overhead when time and money are tight. That does not mean tiny teams always win, but it does mean early progress usually comes from alignment and trust more than headcount. When founders know who is leading which area and how they will work together, ordinary startup problems are easier to handle."}</p>
          <ArticleImageBlock
            src="https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-85b11eb5-f6c2-4f15-acf4-53278824fb0c.jpg?alt=media&token=8683348a-c7d2-4666-ac12-c9268b58de23"
            alt="Choose Co-Founders, Skills, and Working Norms Carefully"
            caption="Choose Co-Founders, Skills, and Working Norms Carefully"
            width={1200}
            height={800}
          />
          <h3>{"Set expectations before pressure builds"}</h3>
          <p>{"Team fit is not only about skills. Founders also need clear expectations before the company is under stress. Sources on startup strategy and team building point to the value of early clarity around roles, decisions, and vision. A practical discussion can cover who leads product decisions, who handles customer or market work, how much time each person can commit, and what near-term goals matter most."}</p>
          <p>{"The aim is to reduce avoidable friction so the founders can stay focused on building, learning, and responding to what the market needs."}</p>

        <ArticleResourceCTA
          eyebrow="Free guide"
          title={"Get the how to startup checklist"}
          description="Use this article as a working guide: shortlist candidates, validate traction, and structure your next conversations."
          buttonLabel="Download now"
          buttonHref="/articles"
          accent="purple"
        />

        <ArticleStepList
          title="Practical next steps"
          steps={[
            "Keep early costs low so the business has more room to learn and adapt.",
          ]}
          accent="indigo"
        />
          <h2>{"Turn the Idea Into a Lean Plan You Can Actually Run"}</h2>
          <p>{"A useful startup plan should help you make decisions, not just fill pages. Start by defining the business in simple terms: who you want to serve, what problem you are solving, and what you will sell. Business.gov.au frames this as defining and planning your business before you move into setup tasks, which is a good reminder that clarity comes first. Paul Graham makes the same point in a sharper way: startups need to make something customers actually want. That means your early plan should centre on demand, not on a long document full of guesses."}</p>
          <p>{"Write down the main assumptions behind your idea, how the business will earn revenue, what the first milestones look like, and what resources you need to reach them. A simple near-term plan is usually more useful than an elaborate business plan because it is easier to test and update. The same sources also point to a practical constraint: spend as little money as possible while you learn. Controlling costs gives you more time to talk to customers, adjust the offer, and improve the business before bigger commitments lock you in."}</p>
          <p>{"For turn the idea into a lean plan you can actually run, focus on Keep early costs low so the business has more room to learn and adapt."}</p>
          <ul>
            <li>{"Keep early costs low so the business has more room to learn and adapt."}</li>
          </ul>
          <h2>{"Handle Registration, Structure, and Money Early Enough"}</h2>
          <p>{"The Australian Taxation Office says founders need to work out whether they are in business and when the business starts for tax purposes. Around that point, you also need to decide which business structure fits your situation. The ATO highlights common structures such as sole trader, partnership, company, and trust, and notes that each comes with different tax obligations. business.gov.au also frames registration as a main early step, which is a good reminder that structure and registration are not side issues. They shape how you transact, report, and grow."}</p>
          <p>{"The next practical layer is getting your finances organised early enough that the business can operate cleanly. business.gov.au lists organising your finances as a core startup step, and the ATO warns against blurring business money and assets with private use. In simple terms, founders should aim to make it easy to see what the business earns, spends, and owns from the beginning. That makes day-to-day decisions easier and reduces friction when you need to register, meet tax and super obligations, or explain your numbers later. It is to build a startup that can invoice, pay, record, and report properly as it grows."}</p>
          <ul>
            <li>{"Decide when your project has become a real business activity."}</li>
            <li>{"Set up your finances so business money is clearly separated and trackable."}</li>
          </ul>
          <ArticleImageBlock
            src="https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-ab4899c7-215a-4ee0-a8b1-28e82899b653.jpg?alt=media&token=4a9ad94a-afdd-43ae-9293-8b09f3390546"
            alt="Founder\u2019s hands sorting ABN forms, business structure notes and startup budget receipts"
            caption="Handle Registration, Structure, and Money Early Enough"
            width={1200}
            height={800}
          />
          <h2>{"How to Startup With Momentum Instead of Overwhelm"}</h2>
          <p>{"A good startup usually does not begin with a perfect plan. The strongest pattern across the sources is simple: work with good people, make something customers actually want, and keep spending tight while you test your assumptions. That matters because most early ideas change once you start talking to customers and seeing how they respond in the real world."}</p>
          <p>{"The practical next move is to turn this into a short action sequence. Then get clear on founder roles, your basic business model, and how money will be managed. After that, complete the essential business setup work, including registration and tax readiness, so you can operate properly as you start getting customers. Momentum comes from doing a few important things in order, not trying to solve everything at once."}</p>
          <p>{"In practice, how to Startup With Momentum Instead of Overwhelm works best when the section stays specific about what changes first, why it matters, and how the reader can apply the idea without filler."}</p>
          <ArticleImageBlock
            src="https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-363e84f5-791e-4e08-989e-6209a5dde180.jpg?alt=media&token=cb1ea8ea-87e5-429a-bb70-dd3ba72b76cf"
            alt="How to Startup With Momentum Instead of Overwhelm"
            caption="How to Startup With Momentum Instead of Overwhelm"
            width={1200}
            height={800}
          />

        <QuoteBlock title="Keep moving forward" variant="orange">
          {"The article does not set a minimum startup budget. It emphasises spending as little money as possible at the start and using lean validation to avoid building or buying too much too early."}
        </QuoteBlock>

        <MLAITemplateResourceCTA />

      <ArticleReferences
        references={[
          {id: 1, href: "https://paulgraham.com/start.html", title: "How to Start a Startup", publisher: "paulgraham.com", description: "Authoritative reference supporting How to Start a Startup.", category: "guide"},
          {id: 2, href: "https://stripe.com/resources/more/how-to-start-a-startup-a-guide-for-entrepreneurs", title: "How to start a start-up | Stripe", publisher: "stripe.com", description: "Authoritative reference supporting How to start a start-up | Stripe.", category: "guide"},
          {id: 3, href: "https://stripe.com/au/resources/more/strategy-for-startups-a-guide-to-creating-a-winning-business-plan", title: "Strategy for startups: Creating a winning startup strategy | Stripe", publisher: "stripe.com", description: "Authoritative reference supporting Strategy for startups: Creating a winning startup strategy | Stripe.", category: "guide"},
          {id: 4, href: "https://www.ato.gov.au/businesses-and-organisations/starting-registering-or-closing-a-business/starting-your-own-business", title: "Ready for business | Australian Taxation Office", publisher: "ato.gov.au", description: "Authoritative reference supporting Ready for business | Australian Taxation Office.", category: "guide"},
          {id: 5, href: "https://whatsnext.dewr.gov.au/take-next-step/starting-small-business", title: "Starting a small business | What's Next", publisher: "whatsnext.dewr.gov.au", description: "Authoritative reference supporting Starting a small business | What's Next.", category: "guide"},
          {id: 6, href: "https://business.gov.au/guide/starting", title: "Guide to starting a business | business.gov.au", publisher: "business.gov.au", description: "Authoritative reference supporting Guide to starting a business | business.gov.au.", category: "guide"},
          {id: 7, href: "https://www.xero.com/au/guides/small-business-ideas/", title: "35 small business ideas for every skill and budget | Xero AU", publisher: "xero.com", description: "Authoritative reference supporting 35 small business ideas for every skill and budget | Xero AU.", category: "guide"},
          {id: 8, href: "https://www.liveplan.com/blog/managing/startup-growth-strategies?srsltid=AfmBOoq1B0PDyspHrk4MMwJ__hOrFIzAWAzGPzqyDlFC18FHlU-lBg9Z", title: "6 Tried and True Startup Growth Strategies | LivePlan", publisher: "liveplan.com", description: "Authoritative reference supporting 6 Tried and True Startup Growth Strategies | LivePlan.", category: "guide"},
          {id: 9, href: "https://www.jpmorgan.com/insights/business-planning/10-step-guide-to-starting-your-startup-business", title: "10-Step Guide to Starting Your Startup Business", publisher: "jpmorgan.com", description: "Authoritative reference supporting 10-Step Guide to Starting Your Startup Business.", category: "guide"},
          {id: 10, href: "https://www.australianinvestmentnetwork.com/start-your-own-business", title: "How to Launch a Start-up Business in Australia - Australian Angel Investment Network", publisher: "australianinvestmentnetwork.com", description: "Authoritative reference supporting How to Launch a Start-up Business in Australia - Australian Angel Investment Network.", category: "guide"},
        ]}
        heading="Sources & further reading"
      />

        <ArticleDisclaimer />

        <div className="my-12 not-prose">
          <ArticleCompanyCTA
            title="Need a practical next step?"
            body="Use the companion startup planning resources to turn this guide into a short action plan: validate the problem, define roles, map revenue assumptions, and prepare for registration and finance setup."
            buttonText="Explore startup resources"
            buttonHref="/articles"
          />
        </div>
      </div>

        <AuthorBio author={authorDetails} />

        <div className="mt-12">
          <ArticleFAQ items={faqItems} />
        </div>

        <ArticleFooterNav backHref="/articles" topHref="#" />
    </>
  )
}
