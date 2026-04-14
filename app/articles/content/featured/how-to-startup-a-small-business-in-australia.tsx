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

const TOPIC = "How to Startup a Small Business in Australia"
export const CATEGORY = "featured"
export const SLUG = "how-to-startup-a-small-business-in-australia"
export const DATE_PUBLISHED = "2026-04-14"
export const DATE_MODIFIED = "2026-04-14"
export const DESCRIPTION = "How to startup a small business in Australia with practical steps on planning, structure, registrations, tax setup, and early cash flow decisions."
const HERO_IMAGE = "https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Fhero-2d2c373c-c64a-4d3a-a019-e3728cab592c.jpg?alt=media&token=d110a9e5-c056-4040-915b-2f90bc4e18c1"
const HERO_IMAGE_ALT = "How to Startup a Small Business in Australia"
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
  { id: 1, question: "What should I do before registering a small business in Australia?", answer: "Start by defining the business clearly, checking who it serves, and testing whether the idea fits your time, skills, and setup. Government guidance places planning before registration so you do not lock in details too early." },
  { id: 2, question: "How do I choose the right business structure?", answer: "Match the structure to who owns the business, how you want to run it, and how much administration you can manage. The main options named in the grounded guidance are sole trader, partnership, company, and trust." },
  { id: 3, question: "Why does cash flow matter so early?", answer: "A business can look viable on paper and still struggle if bills fall due before revenue arrives. Early planning should cover startup costs, available capital, and when money is expected to come in and go out." },
  { id: 4, question: "When do tax and registration checks become important?", answer: "They matter once the business is real enough to start operating, earning income, or taking on obligations. The ATO guidance also stresses working out when your business starts for tax purposes." },
  { id: 5, question: "Should I keep business and personal money separate from the start?", answer: "Yes. The grounded guidance highlights separating business funds from personal use as a basic financial control that helps with cost management, record-keeping, and avoiding reporting problems later." },
]

export const summaryHighlights = {
  heading: "Key facts: How to Startup a Small Business in Australia",
  intro: "How to startup a small business in Australia with practical steps on planning, structure, registrations, tax setup, and early cash flow decisions.",
  items: [
    { label: "Is $10,000 enough to start a business?", description: "It can be enough for some low-cost service or home-based businesses, but not for every model. The key issue is whether it covers startup costs and early cash flow before income becomes steady." },
    { label: "What is the 1% rule in business?", description: "This article does not rely on a single universal \"1% rule\" because official startup guidance focuses on planning, costs, structure, and compliance. New businesses are better served by testing assumptions and tracking real numbers." },
    { label: "Is it true that 90% of startups fail?", description: "That figure is widely repeated, but this article does not verify it as a government-backed benchmark. The more useful focus is on reducing early mistakes through planning, structure choice, and finance setup." },
  ],
}

export const articleMeta = {
  title: "How to Startup a Small Business in Australia",
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
  { question: "Is $10,000 enough to start a business?", answer: "It can be enough for some low-cost service or home-based businesses, but not for every model. The key issue is whether it covers startup costs and early cash flow before income becomes steady." },
  { question: "What is the 1% rule in business?", answer: "This article does not rely on a single universal \"1% rule\" because official startup guidance focuses on planning, costs, structure, and compliance. New businesses are better served by testing assumptions and tracking real numbers." },
  { question: "Is it true that 90% of startups fail?", answer: "That figure is widely repeated, but this article does not verify it as a government-backed benchmark. The more useful focus is on reducing early mistakes through planning, structure choice, and finance setup." },
  { question: "What should I do before registering a small business in Australia?", answer: "Start by defining the business clearly, checking who it serves, and testing whether the idea fits your time, skills, and setup. Government guidance places planning before registration so you do not lock in details too early." },
  { question: "How do I choose the right business structure?", answer: "Match the structure to who owns the business, how you want to run it, and how much administration you can manage. The main options named in the grounded guidance are sole trader, partnership, company, and trust." },
  { question: "Why does cash flow matter so early?", answer: "A business can look viable on paper and still struggle if bills fall due before revenue arrives. Early planning should cover startup costs, available capital, and when money is expected to come in and go out." },
  { question: "When do tax and registration checks become important?", answer: "They matter once the business is real enough to start operating, earning income, or taking on obligations. The ATO guidance also stresses working out when your business starts for tax purposes." },
  { question: "Should I keep business and personal money separate from the start?", answer: "Yes. The grounded guidance highlights separating business funds from personal use as a basic financial control that helps with cost management, record-keeping, and avoiding reporting problems later." },
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
        <p><strong>{TOPIC}</strong> — {"Starting a small business can be rewarding, but Australian government guidance is clear that it is also a big commitment. Business.gov.au says starting a business takes hard work and commitment, and the What\u2019s Next government page describes it as exciting but not easy. That framing matters because the real work starts before opening day. You need to check what you are getting into, make key decisions early, and prepare for ongoing obligations rather than treating setup as a quick form-filling exercise."}</p>
        <p>{"Business.gov.au groups the process into stages such as before you start, define your business, plan your business, register your business, organise your finances, and then get customers. The ATO also places attention on the start of the process, including whether you are actually in business yet, what your business structure means for tax obligations, and what registration steps you may need. Together, those sources show that starting well is not one decision. It is a sequence of linked decisions about your business idea, structure, registrations, and money management."}</p>
        <p>{"It focuses on the steps before and around launch in Australia: checking readiness, defining the business, planning the basics, handling registration, and setting up finances in a sensible way. Instead, it uses the same broad flow reflected in government guidance and keeps the focus on the choices that shape whether a small business is ready to operate properly from day one."}</p>
        <ArticleImageBlock
          src={HERO_IMAGE}
          alt={HERO_IMAGE_ALT}
          caption="How to startup a small business in Australia with practical steps on planning, structure, registrations, tax setup, and early cash flow decisions."
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
          {"It can be enough for some low-cost service or home-based businesses, but not for every model. The key issue is whether it covers startup costs and early cash flow before income becomes steady."}
        </QuoteBlock>
          <h2>{"Start by defining the business and testing the basics"}</h2>
          <p>{"Before you spend money on registration, branding, or tools, get clear on the business itself. Business.gov.au frames this early stage around defining your business and planning it, which is a useful order to follow. If you cannot describe the customer need clearly, it is hard to judge whether the idea is a real business or just an interesting hobby."}</p>
          <p>{"Both Business.gov.au and the ATO stress the importance of checking what you need to decide before you start and working out whether you are actually in business. Ask whether you have the time, skills, and energy to run the work consistently, and whether you are ready for the money, tax, and registration decisions that come with operating as a business."}</p>
          <ArticleImageBlock
            src="https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-1676fce0-85da-4b39-8869-ff7e4af1f660.jpg?alt=media&token=66329c9a-85d1-4d3f-9cc6-55559e18ef85"
            alt="Hand beside a notebook outlining a business idea with rough notes, calculator and coffee on a cluttered desk"
            caption="Start by defining the business and testing the basics"
            width={1200}
            height={800}
          />
          <h3>{"Check whether the setup fits your real situation"}</h3>
          <p>{"The NSW Small Business Commissioner lists home business, start-up costs, business structure basics, and planning tools as core starting topics, which shows how closely these decisions connect. A small business that looks simple on paper can become difficult if it needs more space, equipment, or fixed costs than you can manage early on."}</p>
          <p>{"If you are thinking about starting from home, treat that as a business model choice, not just a cheaper option. A home-based setup may suit some service or online businesses, but it still needs to match your location, routine, and way of working. At this stage, the goal is not to build a perfect plan. It is to pressure-test the basics so you can refine the idea, start small with clearer expectations, or stop before you commit money to the wrong setup."}</p>
          <h2>{"Choose the right business structure before you register"}</h2>
          <p>{"Your business structure is one of the first decisions to make before you register. The Australian Taxation Office places this step early because the structure affects your key tax and registration obligations from the start. The common options are sole trader, partnership, company, and trust. The NSW Small Business Commissioner also treats business structure as a basic starting point, which is a good sign that this choice should come before rushing into names, registrations, or launch tasks."}</p>
          <p>{"This choice also shapes how the business is run day to day. It influences who owns the business, how decisions are made, and how much administration you are likely to take on. A simple setup may suit a small operation run by one person, while a business with multiple owners or stronger growth plans may need a structure that better matches those goals. If you are unsure, keep the decision practical: think about who is involved, how you want to manage the business, and what level of ongoing paperwork and compliance you can realistically handle."}</p>
          <ul>
            <li>{"Sole trader, partnership, company, and trust are the main structure types named in the ATO guidance."}</li>
            <li>{"The structure affects tax, super, and registration obligations."}</li>
          </ul>
          <ArticleImageBlock
            src="https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-ee124443-dc33-4529-9c8f-79119e34467c.jpg?alt=media&token=17c059e3-c6f4-4401-974b-a5dcd5b62c72"
            alt="Choose the right business structure before you register"
            caption="Choose the right business structure before you register"
            width={1200}
            height={800}
          />
          <h3>{"How to choose a structure that fits"}</h3>
          <p>{"If you are starting alone and want a simpler arrangement, one option may feel more manageable than a structure designed for more formal ownership or governance. If you are starting with other people, expect the ownership and management side to matter more from day one. The ATO guidance on business structures focuses on key obligations, so this is not just a legal label. It changes what you need to do after the business starts."}</p>
          <p>{"If you expect the business to stay small, a lower-admin structure may be enough for now. If you plan to bring in other owners, formalise decision-making, or build for growth, choosing with that in mind can save rework later. Pick one that matches your ownership arrangement, your appetite for administration, and the obligations you are ready to manage from the beginning."}</p>

        <ArticleResourceCTA
          eyebrow="Free guide"
          title={"Get the how to startup a small business checklist"}
          description="Use this article as a working guide: shortlist candidates, validate traction, and structure your next conversations."
          buttonLabel="Download now"
          buttonHref="/articles"
          accent="purple"
        />

        <ArticleStepList
          title="Practical next steps"
          steps={[
            "Sole trader, partnership, company, and trust are the main structure types named in the ATO guidance.",
            "The structure affects tax, super, and registration obligations.",
          ]}
          accent="indigo"
        />
          <h2>{"Build a simple plan around costs, cash flow, and operations"}</h2>
          <p>{"At this stage, your business plan does not need to be long or formal. It does need to be clear. Official startup guidance from business.gov.au and the NSW Small Business Commissioner points new owners toward a basic plan that explains what you will offer, who you will sell to, and how the business will run. In practical terms, that means writing down your product or service, your target customer, your likely sales channels, and the key tasks needed to deliver the work. A simple plan is often more useful than a polished document full of guesses, because it gives you something you can test and update as you learn."}</p>
          <p>{"Your numbers also need to be realistic from the start. Government guidance for new businesses repeatedly highlights startup costs, sufficient capital, and good financial management. Before you launch, estimate the main costs required to get open and keep operating in the first period of trade. Then compare those costs with the money you already have access to. This is where cash flow matters: a business can look promising on paper and still struggle if money comes in later than bills are due. Build your first plan around what must be paid, when it must be paid, and how much breathing room you have if costs rise."}</p>
          <p>{"It also helps to set up simple operating rules early. The What's Next small business guidance stresses not using business funds for personal use and managing costs carefully. Business.gov.au also places organising your finances alongside planning, registration, and getting customers, which shows that operations and money are linked from day one. A lean operating plan can include who handles admin, how you track expenses, when you review cash coming in and out, and what basic tools or systems you need to run the business consistently. The goal is not complexity. It is to make sure your day-one setup supports steady decisions instead of avoidable financial pressure."}</p>
          <ul>
            <li>{"List startup costs and compare them with the capital you can access."}</li>
            <li>{"Keep business money separate from personal money from the beginning."}</li>
          </ul>
          <h2>{"Complete the essential registrations and tax setup"}</h2>
          <p>{"Once you have defined the business and done the core planning work, the next stage is registration and tax setup. That ordering matters. The business.gov.au starting guide separates these steps, with registration coming after you define and plan the business. In practice, this helps you avoid registering too early, before you are clear on what you are running, how it will operate, and which business structure fits."}</p>
          <p>{"It says you need to work out whether you are in business and when your business starts for tax purposes. That timing affects what you need to consider before trading. A simple way to think about it is this: once the business is real enough to start operating, earning, or taking on obligations, you should be checking your registration and tax position rather than leaving it until later."}</p>
          <p>{"The ATO points readers to different key tax obligations for a sole trader, partnership, company, or trust. That means there is no single registration checklist that fits every new business. Before you launch, confirm which registrations apply to you and what tax and super obligations come with your chosen setup."}</p>
          <p>{"First, confirm that you are in business and identify your start date for tax purposes. Next, match your business structure to the registrations and obligations that follow from it. Then make sure your tax, super, and registration settings are in place before you begin trading, invoicing, or using business money and assets in ways that could create reporting issues."}</p>
          <ArticleImageBlock
            src="https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-b12ec829-6e0c-47db-8767-0d071833aba3.jpg?alt=media&token=f091b12e-3228-4304-a9b7-60fb685a62a0"
            alt="Complete the essential registrations and tax setup"
            caption="Complete the essential registrations and tax setup"
            width={1200}
            height={800}
          />
          <h2>{"Launch with a focused first-month action plan"}</h2>
          <p>{"A good way to start is to follow the order used in the main Australian government guidance. Begin by checking the basics before you start, then define what the business will do, who it serves, and how it will operate. After that, turn the idea into a simple plan. Business.gov.au presents these early steps before registration for a reason: they help you make clearer decisions later instead of rushing into setup work that does not fit your business."}</p>
          <p>{"Once the idea and plan are clear, move into the core setup tasks that support trading. Choose the business structure that matches your situation, because the ATO notes that structure affects your key tax obligations. Then organise your finances before money starts moving through the business. Government guidance for small business also stresses sound financial management, including having enough capital, managing costs, and keeping business funds separate from personal use. That makes the first month less about doing everything and more about covering the setup areas that protect you from avoidable problems."}</p>
          <p>{"The final step is to use official Australian resources as your launch check. Review the registration, tax, and structure information on business.gov.au and the ATO before you commit to trading. If something is still unclear, the government small business support resources and training options can help you close that gap early. In practice, your first month can stay simple: define the business, make a workable plan, choose the right structure, organise finances, and then complete the registrations you need. That is a focused starting point, and it is usually stronger than trying to perfect every part of the business before you begin."}</p>
          <ul>
            <li>{"Define the business before you register it."}</li>
            <li>{"Write a simple plan before you spend heavily."}</li>
            <li>{"Choose a structure with its tax obligations in mind."}</li>
          </ul>
          <ArticleImageBlock
            src="https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-9a6d0f7f-68b6-4634-8365-d50dadaf9298.jpg?alt=media&token=81eb2f31-6f4a-48ef-ade5-d140deddd8f3"
            alt="Launch with a focused first-month action plan"
            caption="Launch with a focused first-month action plan"
            width={1200}
            height={800}
          />

        <QuoteBlock title="Keep moving forward" variant="orange">
          {"That figure is widely repeated, but this article does not verify it as a government-backed benchmark. The more useful focus is on reducing early mistakes through planning, structure choice, and finance setup."}
        </QuoteBlock>

        <MLAITemplateResourceCTA />

      <ArticleReferences
        references={[
          {id: 1, href: "https://whatsnext.dewr.gov.au/take-next-step/starting-small-business", title: "Starting a small business | What's Next", publisher: "whatsnext.dewr.gov.au", description: "Authoritative reference supporting Starting a small business | What's Next.", category: "guide"},
          {id: 2, href: "https://www.nationwidesuper.com.au/how-to-start-a-small-business-in-australia-your-6-step-guide", title: "Start a Small Business in Australia: Your 6-Step How To Guide | Nationwide Super", publisher: "nationwidesuper.com.au", description: "Authoritative reference supporting Start a Small Business in Australia: Your 6-Step How To Guide | Nationwide Super.", category: "guide"},
          {id: 3, href: "https://www.ato.gov.au/businesses-and-organisations/starting-registering-or-closing-a-business/starting-your-own-business", title: "Ready for business | Australian Taxation Office", publisher: "ato.gov.au", description: "Authoritative reference supporting Ready for business | Australian Taxation Office.", category: "guide"},
          {id: 4, href: "https://business.gov.au/planning/business-plans/develop-your-business-plan", title: "Develop your business plan | business.gov.au", publisher: "business.gov.au", description: "Authoritative reference supporting Develop your business plan | business.gov.au.", category: "guide"},
          {id: 5, href: "https://www.boq.com.au/business/small-business/business-knowledge-hub/opening-a-small-business/the-top-ten-things-to-tick-off-when-starting-a-small-business", title: "The top 10 things to tick off when starting a small business | BOQ", publisher: "boq.com.au", description: "Authoritative reference supporting The top 10 things to tick off when starting a small business | BOQ.", category: "guide"},
          {id: 6, href: "https://lawpath.com.au/blog/how-to-start-a-small-business-from-home", title: "How to Start a Small Business from Home (2026 Update)", publisher: "lawpath.com.au", description: "Authoritative reference supporting How to Start a Small Business from Home (2026 Update).", category: "guide"},
          {id: 7, href: "https://workflowmax.com/blog/8-steps-for-building-a-small-business-strategic-plan", title: "8 steps for building a small business strategic plan", publisher: "workflowmax.com", description: "Authoritative reference supporting 8 steps for building a small business strategic plan.", category: "guide"},
          {id: 8, href: "https://stripe.com/au/resources/more/strategy-for-startups-a-guide-to-creating-a-winning-business-plan", title: "Strategy for startups: Creating a winning startup strategy | Stripe", publisher: "stripe.com", description: "Authoritative reference supporting Strategy for startups: Creating a winning startup strategy | Stripe.", category: "guide"},
          {id: 9, href: "https://www.jpmorgan.com/insights/business-planning/10-step-guide-to-starting-your-startup-business", title: "10-Step Guide to Starting Your Startup Business", publisher: "jpmorgan.com", description: "Authoritative reference supporting 10-Step Guide to Starting Your Startup Business.", category: "guide"},
          {id: 10, href: "https://business.gov.au/guide/starting", title: "Guide to starting a business | business.gov.au", publisher: "business.gov.au", description: "Authoritative reference supporting Guide to starting a business | business.gov.au.", category: "guide"},
          {id: 11, href: "https://accrumelb.com.au/blog/strategic-planning-for-small-businesses-where-to-start/", title: "Strategic Planning for Small Businesses - Where to start - Accru Melbourne", publisher: "accrumelb.com.au", description: "Authoritative reference supporting Strategic Planning for Small Businesses - Where to start - Accru Melbourne.", category: "guide"},
        ]}
        heading="Sources & further reading"
      />

        <ArticleDisclaimer />

        <div className="my-12 not-prose">
          <ArticleCompanyCTA
            title="Get your startup checklist in order"
            body="Use a simple checklist to map your first steps: define the business, choose a structure, estimate costs, organise finances, and confirm registrations before launch."
            buttonText="View startup resources"
            buttonHref="/practical-ai-learning-beginners-builders"
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
