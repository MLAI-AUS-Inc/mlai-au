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

const TOPIC = "How to Raise Your First Million for Your Startup in Australia"
export const CATEGORY = "featured"
export const SLUG = "how-to-raise-your-first-million-for-your-startup-in-australia"
export const DATE_PUBLISHED = "2026-03-30"
export const DATE_MODIFIED = "2026-03-30"
export const DESCRIPTION = "Learn how to raise your first $1 million for your startup in Australia with a practical plan for milestones, documents, funding sources, and investor process."
const HERO_IMAGE = "https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Fhero-e1aac441-b782-44ec-8c83-9d3713e47c99.jpg?alt=media&token=db0a6d13-0a3c-4594-9fd5-9afe3cd4fa32"
const HERO_IMAGE_ALT = "Startup founders in Australia reviewing a $1M funding pitch deck with an investor at a cafe table"
export const FEATURED_FOCUS = "funding"

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
  { id: 1, question: "Do I need to raise the full $1 million in one round?", answer: "Not always. The grounded guidance shows founders should start with milestones and runway, then decide whether a full $1 million raise makes sense now or whether a staged path is more credible." },
  { id: 2, question: "Is venture capital the main path for Australian founders raising a first million?", answer: "No. The article supports a mix-first approach, where founders consider self-funding, structured friends and family money, grants, accelerators, loans, crowdfunding, and only then later venture capital if it matches the stage." },
  { id: 3, question: "What are the biggest preparation mistakes before fundraising?", answer: "Messy registry records, unclear ownership, undocumented early funding, and inconsistent investor materials can all slow or damage a raise. Investors want the company admin and deal basics to be organised before serious discussions." },
  { id: 4, question: "How should I approach investors once I start raising?", answer: "Run the raise as a structured process, not broad untailored outreach. Build a funding plan, identify target investors that match your stage and model, use early meetings to refine the story, and prepare term and document work before diligence." },
  { id: 5, question: "What makes a good first round beyond just getting the money?", answer: "A good round funds the next milestone without creating avoidable cap table, paperwork, or relationship problems. The close should be workable after the money lands, not something that creates cleanup work immediately." },
]

export const summaryHighlights = {
  heading: "Key facts: How to Raise Your First Million for Your Startup in Australia",
  intro: "Learn how to raise your first $1 million for your startup in Australia with a practical plan for milestones, documents, funding sources, and investor process.",
  items: [
    { label: "Why does a first $1 million raise need a clear milestone plan?", description: "In Australia, investors usually expect a well-defined case for why the business needs the money now. The raise should map to product, hiring, market validation, and enough runway to reach the next proof point." },
    { label: "What should founders prepare before investor outreach starts?", description: "Founders should clean up company records, confirm the cap table, document any early funding properly, and prepare a consistent pitch narrative, financial plan, and basic deal materials. This reduces delays during diligence." },
    { label: "Which funding sources can help build a first $1 million round?", description: "A first million does not always come from one investor or one source. Founders may combine bootstrapping, friends and family, grants, accelerators, loans, crowdfunding, angel funding, or later-stage venture capital depending on fit." },
  ],
}

export const articleMeta = {
  title: "How to Raise Your First Million for Your Startup in Australia",
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
  { question: "Why does a first $1 million raise need a clear milestone plan?", answer: "In Australia, investors usually expect a well-defined case for why the business needs the money now. The raise should map to product, hiring, market validation, and enough runway to reach the next proof point." },
  { question: "What should founders prepare before investor outreach starts?", answer: "Founders should clean up company records, confirm the cap table, document any early funding properly, and prepare a consistent pitch narrative, financial plan, and basic deal materials. This reduces delays during diligence." },
  { question: "Which funding sources can help build a first $1 million round?", answer: "A first million does not always come from one investor or one source. Founders may combine bootstrapping, friends and family, grants, accelerators, loans, crowdfunding, angel funding, or later-stage venture capital depending on fit." },
  { question: "Do I need to raise the full $1 million in one round?", answer: "Not always. The grounded guidance shows founders should start with milestones and runway, then decide whether a full $1 million raise makes sense now or whether a staged path is more credible." },
  { question: "Is venture capital the main path for Australian founders raising a first million?", answer: "No. The article supports a mix-first approach, where founders consider self-funding, structured friends and family money, grants, accelerators, loans, crowdfunding, and only then later venture capital if it matches the stage." },
  { question: "What are the biggest preparation mistakes before fundraising?", answer: "Messy registry records, unclear ownership, undocumented early funding, and inconsistent investor materials can all slow or damage a raise. Investors want the company admin and deal basics to be organised before serious discussions." },
  { question: "How should I approach investors once I start raising?", answer: "Run the raise as a structured process, not broad untailored outreach. Build a funding plan, identify target investors that match your stage and model, use early meetings to refine the story, and prepare term and document work before diligence." },
  { question: "What makes a good first round beyond just getting the money?", answer: "A good round funds the next milestone without creating avoidable cap table, paperwork, or relationship problems. The close should be workable after the money lands, not something that creates cleanup work immediately." },
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
        <p><strong>{TOPIC}</strong> — {"For many Australian founders, a first $1 million raise is not a simple milestone. It sits inside a funding market that is still smaller and younger than places such as Silicon Valley, so the process can feel more competitive and less forgiving. That means investors usually expect stronger preparation, clearer stage fit, and a more thought-through plan before they engage seriously."}</p>
        <p>{"The amount should connect to what the business needs to achieve next, such as building product, testing the market, hiring key people, and creating enough runway to reach the next proof point. In practice, that means founders should work backwards from business maturity and evidence, then shape the raise around those milestones instead of chasing a round number on its own."}</p>
        <ArticleImageBlock
          src={HERO_IMAGE}
          alt={HERO_IMAGE_ALT}
          caption="Learn how to raise your first $1 million for your startup in Australia with a practical plan for milestones, documents, funding sources, and investor process."
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
          {"In Australia, investors usually expect a well-defined case for why the business needs the money now. The raise should map to product, hiring, market validation, and enough runway to reach the next proof point."}
        </QuoteBlock>
          <h2>{"Start by proving why you need $1 million"}</h2>
          <p>{"Do not start with the round size. Start with the next set of business milestones and the time needed to reach them. The sources describe funding as something that should match your stage, goals, and development needs, not a number chosen in isolation. For an early startup, that usually means defining what the capital will unlock in product development, market research, staffing, and operational growth."}</p>
          <p>{"A practical way to test the amount is to map spend into a few clear buckets: product work, team costs, go-to-market activity, and core operating expenses. Then ask whether that plan gives you enough runway to reach the milestones that matter for your current stage. This also helps you decide if a full $1 million raise is right now, or whether a staged path makes more sense through bootstrapping, friends and family, grants, angel funding, loans, crowdfunding, or later venture capital. The right answer depends on where the company is today and what kind of progress the next capital should buy."}</p>
          <ArticleImageBlock
            src="https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-ab57afbe-152a-497b-afcf-ed6d37fe4e04.jpg?alt=media&token=689f8009-591c-47ea-9235-c965fac5574e"
            alt="Start by proving why you need $1 million"
            caption="Start by proving why you need $1 million"
            width={1200}
            height={800}
          />
          <h2>{"Get your company and documents investor-ready"}</h2>
          <p>{"Before you start outreach, make sure the company records are tidy. In Australia, founders can lose time in diligence if the registry, ownership records, or shareholder paperwork are messy. Investors want a business that looks organised before they spend time on calls and review."}</p>
          <p>{"You should also be clear internally on your cap table and decision-making position. That means knowing the current ownership split, what early promises have been made, and who needs to approve a deal. If there has been any early money from friends or family, do not leave it as a vague handshake arrangement. Put the terms in writing so everyone understands whether the money is a loan, equity, or another structure. Clear written terms reduce confusion later and make investor conversations easier."}</p>
          <p>{"Once the company records are in order, prepare the core materials investors expect to review. Source guidance for Australian founders points to having a pitch narrative ready, along with a business plan, a financial plan, and basic terms sheet fundamentals. These materials do not need to be bloated. They need to be consistent. Your story about the problem, growth plan, and funding need should match the numbers and match the ownership position shown in your records."}</p>
          <p>{"The goal is not to look perfect. The goal is to remove avoidable friction. When your registry is clean, your shareholders agreement is current, your cap table is understood, and any early funding is documented properly, investors can focus on the opportunity instead of admin problems. That is a much stronger place to begin a first major raise."}</p>
          <ArticleImageBlock
            src="https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-c0b98c6c-2956-4a2f-b13b-130f2e614e5f.jpg?alt=media&token=e1e0f565-00e9-410e-9cff-35416ec0eaa9"
            alt="Get your company and documents investor-ready"
            caption="Get your company and documents investor-ready"
            width={1200}
            height={800}
          />

        <ArticleResourceCTA
          eyebrow="Free guide"
          title={"Get the how-to-raise your first million for your startup (australia 2026) checklist"}
          description="Use this article as a working guide: shortlist candidates, validate traction, and structure your next conversations."
          buttonLabel="Download now"
          buttonHref="/articles"
          accent="purple"
        />

        <ArticleStepList
          title="Practical next steps"
          steps={[
            "Bootstrapping helps preserve ownership in the earliest stage.",
            "Friends and family funding should have clear written terms.",
            "Government grants can add non-repayable support.",
            "Accelerators may offer mentoring, networks, and seed capital.",
          ]}
          accent="indigo"
        />
          <h2>{"Choose the right funding mix for an Australian founder"}</h2>
          <p>{"Many Australian founders do not need to jump straight to venture capital. A better starting point is to match the funding source to the stage of the business. Bootstrapping can be the first layer because it lets you build with your own funds while keeping ownership. That can be useful when you are still proving demand, refining the product, or trying to reach early revenue before a larger raise."}</p>
          <p>{"After that, founders can add other sources in a deliberate way instead of treating all capital as the same. Friends and family money can help early, but only if the terms are clearly written down from the start. Government grants can extend runway without dilution because they are non-repayable. Accelerators and incubators can also make sense when you need a small amount of seed capital plus mentoring and network access. The common theme is fit: choose funding that supports your next milestone without adding pressure your business cannot yet carry."}</p>
          <ul>
            <li>{"Bootstrapping helps preserve ownership in the earliest stage."}</li>
            <li>{"Friends and family funding should have clear written terms."}</li>
            <li>{"Government grants can add non-repayable support."}</li>
            <li>{"Accelerators may offer mentoring, networks, and seed capital."}</li>
          </ul>
          <h3>{"Match the source to the risk"}</h3>
          <p>{"Debt and broad public fundraising need more caution. Bank loans may suit a business with clearer revenue and a realistic path to repayments, but they are not a simple substitute for equity in a high-risk startup. Crowdfunding can also work in some cases, yet it should be chosen because it fits the product and audience, not just because it is available. In practice, a sensible mix often starts with founder capital, adds grants or a structured friends-and-family round if needed, and uses accelerators, loans, or crowdfunding only when they match the company\u2019s stage, risk, and cash profile."}</p>
          <h2>{"Run the raise as a process, not a series of random pitches"}</h2>
          <p>{"Stripe\u2019s startup funding guide stresses building a funding plan around your stage, goals, and likely sources of capital, rather than chasing every possible option at once. Cake Equity makes a similar point from an Australian founder\u2019s view: by the time you are actively raising, you should already have your funding strategy, business plan, pitch deck, and target investors identified."}</p>
          <p>{"That structure helps you match each conversation to the right investor. A founder raising an early round should not use the same outreach for every contact or assume all capital is interchangeable. Your business model, maturity, and traction should shape who you speak to first."}</p>
          <p>{"Once interest appears, the process shifts from pitching to execution. This is where many founders lose momentum by improvising. Cake Equity highlights practical steps such as preparing a term sheet and reviewing or updating the shareholders agreement, while newer 2026-focused guidance points to the value of clean records and organised equity information before diligence starts. The main lesson is simple: do the negotiation and document work as part of the raise, not after the verbal yes."}</p>
          <ul>
            <li>{"Start with a funding plan tied to stage and round goals."}</li>
            <li>{"Build a focused investor list instead of broad untailored outreach."}</li>
            <li>{"Use early meetings to refine the narrative and common answers."}</li>
            <li>{"Prepare term and document work before diligence begins."}</li>
          </ul>
          <ArticleImageBlock
            src="https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-ab68d117-c8d6-4962-9e48-b40f67e9dabf.jpg?alt=media&token=27160432-4753-47b7-93d7-a22577580fb1"
            alt="Run the raise as a process, not a series of random pitches"
            caption="Run the raise as a process, not a series of random pitches"
            width={1200}
            height={800}
          />
          <h2>{"Focus on a close you can live with after the money lands"}</h2>
          <p>{"It should carry the company to a clear next milestone without leaving behind avoidable problems in ownership, paperwork, or investor relationships. The Australian fundraising guides in these sources point to the same idea: think about the big picture before you sign, match the funding source to your stage, and put clear terms in writing. A good round is not just enough capital. It is capital you can use with confidence once the round closes."}</p>
          <p>{"A practical way to finish this process is to keep the sequence simple. First, justify the amount you need based on the milestone you are trying to reach. Next, make the company ready by tidying the registry, preparing the key documents, and making sure the terms are clear. Then choose the mix of funding sources that fits your stage, whether that includes self-funding, friends and family, grants, accelerators, or investors. Finally, run a disciplined process and aim for a close that improves your readiness for the next raise, rather than creating fresh cleanup work right after this one ends."}</p>
          <ArticleImageBlock
            src="https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-a55f7023-80b5-4b45-8d73-176905449f02.jpg?alt=media&token=02572deb-6c98-4b8e-b928-31f91799eb1c"
            alt="Focus on a close you can live with after the money lands"
            caption="Focus on a close you can live with after the money lands"
            width={1200}
            height={800}
          />

        <QuoteBlock title="Keep moving forward" variant="orange">
          {"A first million does not always come from one investor or one source. Founders may combine bootstrapping, friends and family, grants, accelerators, loans, crowdfunding, angel funding, or later-stage venture capital depending on fit."}
        </QuoteBlock>

        <MLAITemplateResourceCTA />

      <ArticleReferences
        references={[
          {id: 1, href: "https://www.cakeequity.com/guides/capital-raise-australia", title: "Raising Capital in Australia: A Founder's Checklist", publisher: "cakeequity.com", description: "Authoritative reference supporting Raising Capital in Australia: A Founder's Checklist.", category: "guide"},
          {id: 2, href: "https://www.cakeequity.com/blog/how-to-prepare-for-a-successful-fundraise-in-2026", title: "10 Ways Startups Can Prepare for a Successful Fundraise in 2026", publisher: "cakeequity.com", description: "Authoritative reference supporting 10 Ways Startups Can Prepare for a Successful Fundraise in 2026.", category: "guide"},
          {id: 3, href: "https://stripe.com/au/resources/more/small-business-startup-capital-101-how-to-fund-your-early-days", title: "Small business startup capital: A guide | Stripe", publisher: "stripe.com", description: "Authoritative reference supporting Small business startup capital: A guide | Stripe.", category: "guide"},
          {id: 4, href: "https://stripe.com/au/resources/more/how-to-raise-capital-for-your-startup-a-guide-to-funding-stages-and-sources", title: "How to raise capital for your startup | Stripe", publisher: "stripe.com", description: "Authoritative reference supporting How to raise capital for your startup | Stripe.", category: "guide"},
          {id: 5, href: "https://www.australianinvestmentnetwork.com/business-funding", title: "How to Get Business Funding to Launch a New Business in Australia or Globally", publisher: "australianinvestmentnetwork.com", description: "Authoritative reference supporting How to Get Business Funding to Launch a New Business in Australia or Globally.", category: "guide"},
          {id: 6, href: "https://www.myzeller.com/au/blog/funding-your-startup", title: "How to Raise Funds for your Startup", publisher: "myzeller.com", description: "Authoritative reference supporting How to Raise Funds for your Startup.", category: "guide"},
          {id: 7, href: "https://www.stoneandchalk.com.au/articles/fund-your-early-startup-guide-to-pick-the-right-option", title: "Fund your early startup: Guide to pick the right option | Stone & Chalk", publisher: "stoneandchalk.com.au", description: "Authoritative reference supporting Fund your early startup: Guide to pick the right option | Stone & Chalk.", category: "guide"},
          {id: 8, href: "https://www.startupdaily.net/advice/a-step-by-step-guide-for-founders-to-raise-capital/", title: "A step-by-step guide for founders to raise capital - Startup Daily", publisher: "startupdaily.net", description: "Authoritative reference supporting A step-by-step guide for founders to raise capital - Startup Daily.", category: "guide"},
          {id: 9, href: "https://digitaloneagency.com.au/raising-money-for-your-business-in-2026/", title: "Raising Money For Your Business In 2026 | Digital One Agency", publisher: "digitaloneagency.com.au", description: "Authoritative reference supporting Raising Money For Your Business In 2026 | Digital One Agency.", category: "guide"},
          {id: 10, href: "https://dillonclyne.com.au/blog/preparing-for-2026-capital-raising-in-a-changing-market/", title: "\u00bb Preparing for 2026: Capital Raising in a Changing Market", publisher: "dillonclyne.com.au", description: "Authoritative reference supporting \u00bb Preparing for 2026: Capital Raising in a Changing Market.", category: "guide"},
        ]}
        heading="Sources & further reading"
      />

        <ArticleDisclaimer />

        <div className="my-12 not-prose">
          <ArticleCompanyCTA
            title="Need a clearer fundraising plan?"
            body="Use our startup and AI business resources to tighten your pitch, funding story, and next-step plan before you start investor outreach."
            buttonText="Explore founder resources"
            buttonHref="/ai-startup-building-pitching"
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
