import type { ReactNode } from 'react'
import { Home } from 'lucide-react'
import { RocketLaunchIcon, AcademicCapIcon, UsersIcon } from '@heroicons/react/24/outline'
import { DEFAULT_AUTHOR_KEY, getAuthorProfile, DEFAULT_AUTHOR_AVATAR_FALLBACK_URL } from '../../authors'
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

const TOPIC = "How to Find a Sales-Led Non-Technical Founder as CEO"
export const CATEGORY = "featured"
export const SLUG = "how-to-find-a-sales-led-non-technical-founder-to-be-your-ceo"
export const DATE_PUBLISHED = "2026-03-15"
export const DATE_MODIFIED = "2026-03-15"
export const DESCRIPTION = "Learn how technical founders can find, vet, and partner with a sales-led non technical founder ceo to lead go-to-market, revenue, and growth."
const HERO_IMAGE = "https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/article-images%2Fhero-f6d9235d-c4a4-4ceb-a3fd-c7e2c0db88e4.jpg?alt=media&token=c1d17f1d-f3a5-474b-829b-251b7e939861"
const HERO_IMAGE_ALT = "How to Find a Sales-Led Non-Technical Founder as CEO"
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
  { id: 1, question: "When should a technical founder look for a non-technical founder CEO?", answer: "Usually when the main bottleneck shifts from building the product to selling it, fundraising, or creating a repeatable go-to-market motion. If customer, investor, and partner work keeps pulling focus away from product execution, it may be time." },
  { id: 2, question: "Does a non-technical founder CEO need to understand the product deeply?", answer: "Yes, but they do not need to code. They need enough product fluency to explain the value clearly, understand trade-offs, avoid overpromising, and work well with the technical team." },
  { id: 3, question: "Where are the best places to find a non technical founder ceo?", answer: "Start with accelerator alumni groups, VC talent networks, angel and operator communities, startup Slack groups, curated founder events, and trusted introductions from people who know your market and stage." },
  { id: 4, question: "What is the best way to test whether a candidate can actually lead go-to-market?", answer: "Use a live working test. Ask them to refine positioning, run discovery calls, outline a simple pipeline plan, or lead a small set of partner or investor conversations. This shows how they think and communicate in real conditions." },
  { id: 5, question: "Should this person be hired like an executive or brought in as a co-founder?", answer: "If they are joining early and taking real startup risk across sales, hiring, fundraising, and company leadership, the discussion should usually be handled as a founder-level partnership rather than a standard executive hire." },
  { id: 6, question: "How should equity and control be handled?", answer: "Use meaningful equity with standard vesting, align on realistic milestones, and document who owns which decisions. Clear rules on product, revenue, operations, and board matters help protect trust as the company grows." },
]

export const summaryHighlights = {
  heading: "Key facts: How to Find a Sales-Led Non-Technical Founder as CEO",
  intro: "Learn how technical founders can find, vet, and partner with a sales-led non technical founder ceo to lead go-to-market, revenue, and growth.",
  items: [
    { label: "Why this move matters", description: "A strong product is not enough on its own. Many technical founders need a commercially focused leader to handle sales, fundraising, partnerships, and market execution." },
    { label: "What the CEO should own", description: "The non-technical CEO should own revenue, positioning, operations, and customer learning, while the technical founder stays focused on product, engineering, and delivery." },
    { label: "Where to look", description: "The best candidates usually come through founder ecosystems such as VC talent networks, accelerator communities, startup groups, and warm operator introductions rather than broad job boards." },
  ],
}

export const articleMeta = {
  title: "How to Find a Sales-Led Non-Technical Founder as CEO",
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

export default function ArticleContent() {
  const authorDetails = {
    name: AUTHOR,
    role: AUTHOR_ROLE,
    bio: AUTHOR_BIO,
    avatarUrl: AUTHOR_AVATAR,
  }

  return (
    <>
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
        <p><strong>{TOPIC}</strong> — {"A great product does not automatically become a great company. Many early-stage startups are built by deeply technical founders who are excellent at spotting a real problem, shipping software, and improving the product quickly. That strength is often what gets the business off the ground. But once the product is live, the next challenge changes. Those jobs require a different operating rhythm from product building, and many founder-CEOs feel that gap as soon as customer conversations become more commercial than technical."}</p>
        <p>{"This is where the idea of a non technical founder CEO becomes practical, not political. Some technical founders realise they are more effective as a CTO, chief product leader, or technical visionary than as the person carrying revenue, fundraising, partnerships, and go-to-market execution. Bringing in a sales-led or commercially strong non-technical CEO can give the business the missing engine it needs to survive and scale. The right person does not replace the technical founder's value."}</p>
        <p>{"A safer workflow is to break the work into narrow tasks, review the output in version control, and let the agent handle scaffolding, repetitive implementation, and test assistance."}</p>
        <ArticleImageBlock
          src={HERO_IMAGE}
          alt={HERO_IMAGE_ALT}
          caption="Learn how technical founders can find, vet, and partner with a sales-led non technical founder ceo to lead go-to-market, revenue, and growth."
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
          {"A strong product is not enough on its own. Many technical founders need a commercially focused leader to handle sales, fundraising, partnerships, and market execution."}
        </QuoteBlock>
          <h2>{"Defining the Sales-Led CEO Role"}</h2>
          <p>{"A non technical founder CEO should not try to act like the head of engineering. Their main job is to create commercial momentum for the company. In an AI startup, this role matters even more because buyers often do not purchase technology for its own sake. The CEO needs to turn technical capability into a clear problem, a clear promise, and a clear reason to buy now."}</p>
          <p>{"The CTO or technical co-founder should own product architecture, engineering quality, technical delivery, and the product roadmap. The CEO should own revenue, positioning, company operations, and market learning from real customer conversations. A good non technical founder CEO does not need to code, but they do need enough fluency to understand trade-offs, ask useful questions, and avoid overpromising. That balance reduces co-founder tension because each leader knows where they lead and where they support. The technical team can focus on building the right product, while the CEO focuses on proving that the market wants it and will pay for it."}</p>
          <p>{"In practice, teams get better results when they keep the scope narrow, review changes in small increments, and treat the agent as a fast contributor instead of an unchecked decision-maker."}</p>
          <p>{"Clear acceptance criteria, version-control review, and quick feedback loops matter more than raw generation speed because they make the MVP easier to test, fix, and evolve."}</p>
          <ArticleImageBlock
            src="https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/article-images%2Finline-2e134eec-dc24-49e0-8614-5174ed5a78bc.jpg?alt=media&token=1187190a-25aa-4f7f-90c5-2ac0d8989a76"
            alt="Defining the Sales-Led CEO Role"
            caption="Defining the Sales-Led CEO Role"
            width={1200}
            height={800}
          />
          <h2>{"Where to Find Your Commercial Co-Founder"}</h2>
          <p>{"If you want a strong non technical founder CEO, standard hiring channels are rarely enough. The best co-founder candidates are usually not browsing job boards or replying to generic recruiter messages. They are already leading sales, partnerships, customer growth, or go to market functions inside startups and scaleups."}</p>
          <p>{"Treat the process more like business development than recruitment. Before you start reaching out, write a simple candidate brief that explains the problem you solve, the stage of the company, what has already been built, what traction exists, and what the commercial founder would truly own. High-calibre candidates will quickly test whether they are being invited to help shape the company or just carry revenue pressure for a technical team."}</p>
          <p>{"It also helps to widen your view of what a future CEO can look like. Many great commercial co-founders do not currently hold a CEO title. They may be a VP of Sales, Head of Growth, enterprise partnerships lead, or a commercial operator who helped a startup move from founder-led selling into a repeatable revenue motion."}</p>
          <ArticleImageBlock
            src="https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/article-images%2Finline-ac3dabd8-e10a-40b6-a46c-fdd721b5e35e.jpg?alt=media&token=2e9475b9-9ea6-43d0-9201-64d6371f092f"
            alt="Where to Find Your Commercial Co-Founder"
            caption="Where to Find Your Commercial Co-Founder"
            width={1200}
            height={800}
          />
          <h3>{"Start with founder ecosystems, not broad recruitment channels"}</h3>
          <p>{"The highest-yield places to search are accelerator alumni groups, VC talent networks, angel communities, startup Slack groups, curated founder events, and warm introductions from operators you already trust. These channels work better because people in them already understand startup risk, uneven compensation, and the reality of building in uncertainty. They are far more likely to seriously consider a co-founder path than someone coming from a standard executive search process."}</p>
          <p>{"When you ask for introductions, be specific. Do not say you are looking for a non technical founder CEO in broad terms. Instead, describe the market, customer type, stage, and the kind of commercial experience you want, such as enterprise sales, category creation, channel partnerships, or early go to market design. Specific asks make it easier for investors, advisors, and second-time founders to think of real people rather than sending weak referrals."}</p>
          <h3>{"Target operators who have already built revenue in messy environments"}</h3>
          <p>{"Look closely at senior commercial leaders from companies that have recently scaled, especially those who worked through the awkward stage between early traction and repeatable growth. Former GTM leaders, commercial directors, and enterprise sales builders from startup environments often make better co-founder candidates than polished executives from large corporates."}</p>
          <p>{"The key signal is not prestige. That profile is often a better fit for a technical founder than someone whose experience depends on brand, budget, and a large existing team."}</p>

        <ArticleResourceCTA
          eyebrow="Free guide"
          title={"Get the non technical founder ceo checklist"}
          description="Use this article as a working guide: shortlist candidates, validate traction, and structure your next conversations."
          buttonLabel="Download now"
          buttonHref="/articles"
          accent="purple"
        />

        <ArticleStepList
          title="Practical next steps"
          steps={[
            "Defining the Sales-Led CEO Role",
            "Where to Find Your Commercial Co-Founder",
            "Vetting for Go-To-Market and Leadership Execution",
            "Structuring the Partnership and Equity",
            "Unlocking Your Startup's Commercial Potential",
          ]}
          accent="indigo"
        />
          <h2>{"Vetting for Go-To-Market and Leadership Execution"}</h2>
          <p>{"A strong non technical founder CEO should make your product easier to understand, not harder. Listen for whether they can describe the customer problem, the business value, and the trade-offs without hiding behind vague startup language. If they cannot turn your technical vision into a clear story, they will struggle in sales calls, fundraising meetings, hiring conversations, and board updates. It is a core operating skill."}</p>
          <p>{"You should also pressure test what kind of commercial experience they really have. Ask for specifics such as deal size, sales cycle length, number of founder-led calls, conversion rates, and what they personally changed to improve results. The goal is to find evidence that they can create demand from ambiguity, not just manage a system that already worked."}</p>
          <p>{"A careful vetting process should include a live working test, not just references and chemistry. For example, ask them to refine your positioning, run customer discovery interviews, draft a simple pipeline plan, or lead a small set of investor and partner conversations. This shows how they think, how fast they learn the product, and whether they can align with engineering reality. It also gives your team a chance to see their communication style before titles and equity make changes difficult."}</p>
          <p>{"Ask what happened when targets were missed, when product timelines slipped, or when customer requests conflicted with the roadmap. Strong non-technical leaders usually show pattern recognition, calm decision-making, and respect for technical constraints while still pushing for market progress. If the candidate consistently needs a polished product, a large team, or a clear script to perform, they may not be the right partner for a technical founder building from zero."}</p>
          <h2>{"Structuring the Partnership and Equity"}</h2>
          <p>{"If you are a non technical founder bringing in a CEO, treat the conversation as a founder-level partnership discussion, not a late hiring negotiation. A real co-founder CEO who will carry fundraising, hiring, sales, and market credibility usually expects meaningful equity because they are taking startup risk with you."}</p>
          <p>{"Cash compensation still matters, but salary should match the company reality rather than founder wishful thinking. These measures should be realistic and visible to both founders. Good KPIs do not turn a CEO into a short-term operator."}</p>
          <p>{"A technical founder may want to protect architecture quality or roadmap discipline, while a non technical founder CEO may push for speed, customer commitments, or investor optics. Write down decision-making rules early. For example, specify which choices require joint approval, which belong to the CEO, which remain with the product or technical lead, and when the board becomes involved."}</p>
          <p>{"If the CEO will hold a board seat, define how many seats exist, who appoints them, what requires a formal vote, and how deadlocks will be handled. For a non technical founder CEO, the goal is not to win every protection for yourself. The goal is to build a structure that attracts a strong operator, preserves trust, and gives the company the best chance to grow without founder conflict becoming the main risk."}</p>
          <h2>{"Unlocking Your Startup's Commercial Potential"}</h2>
          <p>{"A strong non technical founder CEO can be the commercial engine that turns a clever product into a real business. That does not reduce the value of the technical founder. It sharpens it. Many technical teams stall not because the product is weak, but because no one is driving customer discovery, partnerships, pricing, hiring, and investor conversations with enough focus."}</p>
          <p>{"Define the kind of commercial leader your startup needs now, not the vague ideal you might need in five years. Look for someone who can sell, build trust, learn the product deeply, and make hard trade-offs with you. Start talking to candidates through your network, startup communities, advisors, and customers. The right partnership gives you space to keep building exceptional technology while the business side gains momentum, clarity, and accountability."}</p>
          <p>{"The best choice is usually the tool that helps your team ship, review, and iterate with confidence rather than the one that promises the most automation."}</p>
          <p>{"A short, focused MVP sprint will usually tell you more than feature comparisons alone, because you can see how the agent behaves under real product constraints."}</p>

        <QuoteBlock title="Keep moving forward" variant="orange">
          {"The best candidates usually come through founder ecosystems such as VC talent networks, accelerator communities, startup groups, and warm operator introductions rather than broad job boards."}
        </QuoteBlock>

        <MLAITemplateResourceCTA />

      <ArticleReferences
        references={[
          {id: 1, href: "https://www.linkedin.com/pulse/building-tech-business-non-tech-founder-my-advice-roei-samuel", title: "Building a Tech Business as a Non-Tech Founder: My Advice.", publisher: "linkedin.com", description: "Authoritative reference supporting Building a Tech Business as a Non-Tech Founder: My Advice..", category: "guide"},
          {id: 2, href: "https://www.startups.com/questions/3203/is-it-essential-for-a-non-technical-founder-to-spend-time-being-more-technical", title: "Question: Is it essential for a non-tech founder to spend time becoming more technical in order to manage both the non-tech and tech team more effectively?  | Startups.com", publisher: "startups.com", description: "Authoritative reference supporting Question: Is it essential for a non-tech founder to spend time becoming more technical in order to manage both the non-tech and tech team more effectively?  | Startups.com.", category: "guide"},
          {id: 3, href: "https://newsletter.pragmaticengineer.com/p/non-technical-ceo", title: "Working with a non-technical CEO - by Paulo Andr\u00e9", publisher: "newsletter.pragmaticengineer.com", description: "Authoritative reference supporting Working with a non-technical CEO - by Paulo Andr\u00e9.", category: "guide"},
          {id: 4, href: "https://jetrockets.com/blog/a-non-technical-founder-s-guide-to-building-a-tech-startup-from-idea-to-development", title: "Tech Startup Guide for Non-Tech Founders - JetRockets", publisher: "jetrockets.com", description: "Authoritative reference supporting Tech Startup Guide for Non-Tech Founders - JetRockets.", category: "guide"},
          {id: 5, href: "https://www.onstartups.com/tabid/3339/bid/104056/A-Tech-Founder-s-Guide-To-Picking-A-Non-Tech-Founder.aspx", title: "A Tech Founder's Guide To Picking A Non-Tech Founder", publisher: "onstartups.com", description: "Authoritative reference supporting A Tech Founder's Guide To Picking A Non-Tech Founder.", category: "guide"},
          {id: 6, href: "https://www.linkedin.com/pulse/technology-strategy-non-technical-founders-executives-dylan-hall", title: "Technology Strategy for Non-Technical Founders & Executives", publisher: "linkedin.com", description: "Authoritative reference supporting Technology Strategy for Non-Technical Founders & Executives.", category: "guide"},
          {id: 7, href: "https://www.linkedin.com/pulse/lost-tech-conversations-non-technical-ceos-guide-speaking-engineering-b9idc", title: "Lost in Tech Conversations? A Non-Technical CEO's Guide to Speaking Engineering", publisher: "linkedin.com", description: "Authoritative reference supporting Lost in Tech Conversations? A Non-Technical CEO's Guide to Speaking Engineering.", category: "guide"},
          {id: 8, href: "https://www.groovehq.com/blog/non-technical-founder", title: "8 Things Every Non-Technical Founder Should Know How to Do", publisher: "groovehq.com", description: "Authoritative reference supporting 8 Things Every Non-Technical Founder Should Know How to Do.", category: "guide"},
          {id: 9, href: "https://www.techfornontechies.co/blog/256-top-mistakes-non-technical-founders-make-how-to-avoid-them", title: "\n      \n        Top mistakes non-technical founders make & how to avoid them\n      \n    ", publisher: "techfornontechies.co", description: "Authoritative reference supporting \n      \n        Top mistakes non-technical founders make & how to avoid them\n      \n    .", category: "guide"},
          {id: 10, href: "https://www.theanna.io/non-technical-founder", title: "Non-Technical Founder Guide: Start a Startup Without Coding | Theanna", publisher: "theanna.io", description: "Authoritative reference supporting Non-Technical Founder Guide: Start a Startup Without Coding | Theanna.", category: "guide"},
        ]}
        heading="Sources & further reading"
      />

        <ArticleDisclaimer />

        <div className="my-12 not-prose">
          <ArticleCompanyCTA
            title="Need a clearer founder partnership plan?"
            body="Use a simple framework to define the CEO role, test candidates, and set decision rights before you commit to equity or titles."
            buttonText="Get the founder planning resource"
            buttonHref="/resources"
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
