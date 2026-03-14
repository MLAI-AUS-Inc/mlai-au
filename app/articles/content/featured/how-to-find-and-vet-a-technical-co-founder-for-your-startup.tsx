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

const TOPIC = "How to Find and Vet a Technical Co-Founder for Your Startup"
export const CATEGORY = "featured"
export const SLUG = "how-to-find-and-vet-a-technical-co-founder-for-your-startup"
export const DATE_PUBLISHED = "2026-03-14"
export const DATE_MODIFIED = "2026-03-14"
export const DESCRIPTION = "Struggling to find a technical co-founder for your startup? Learn where to look, how to pitch them, and how to thoroughly vet potential partners."
const HERO_IMAGE = ""
const HERO_IMAGE_ALT = "How to Find and Vet a Technical Co-Founder for Your Startup"
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
  { id: 1, question: "What is the best way to find a technical cofounder?", answer: "Start with warm networks first, including former colleagues, founder communities, advisors, investors, and university or industry contacts. Then expand into meetups, hackathons, and focused online platforms such as cofounder matching communities. The goal is not just reach. It is finding someone you can trust and evaluate over time." },
  { id: 2, question: "How do I attract a technical cofounder if I cannot code?", answer: "Bring evidence that the business is worth building. That can include customer interviews, a clear problem statement, landing page tests, pre-sales, or strong domain expertise. Technical candidates want to see that you can create demand and carry your side of the company." },
  { id: 3, question: "What should I say when pitching a technical cofounder?", answer: "Focus on the customer problem, the market opportunity, and why now is the right time. Be specific about what you bring, such as sales ability, industry knowledge, access to users, or funding. Discuss ownership and expectations early so the conversation feels clear and fair." },
  { id: 4, question: "How can a non-technical founder vet a technical cofounder?", answer: "Use a trusted technical advisor to review their thinking on architecture, testing, security, deployment, and trade-offs. Also pay attention to communication, reliability, and how well you work together on a small trial project. Technical skill matters, but alignment and decision-making matter just as much." },
  { id: 5, question: "Should I rush to lock in a technical cofounder before building anything?", answer: "Usually no. A rushed match can create bigger problems later if ownership, pace, or goals do not align. It is often better to validate the problem, narrow the product scope, and build enough momentum to make the partnership decision with more confidence." },
  { id: 6, question: "What if I cannot find the right technical cofounder quickly?", answer: "You can still move forward by validating user demand, refining the MVP, and using a trusted product team or studio to build a prototype or first version. That approach can help you learn faster while keeping your long-term cofounder decision open." },
]

export const summaryHighlights = {
  heading: "Key facts: How to Find and Vet a Technical Co-Founder for Your Startup",
  intro: "Struggling to find a technical co-founder for your startup? Learn where to look, how to pitch them, and how to thoroughly vet potential partners.",
  items: [
    { label: "Start with proof", description: "A technical cofounder is more likely to engage when you can show customer pain, early demand signals, interviews, or simple pre-launch validation rather than only an idea." },
    { label: "Search in high-trust places", description: "Warm introductions, founder communities, meetups, hackathons, and targeted online platforms usually produce stronger conversations than broad cold outreach alone." },
    { label: "Pitch a partnership, not a task list", description: "Lead with the problem, market timing, and your own contribution to the business so the role feels like a shared mission instead of unpaid contract work." },
  ],
}

export const articleMeta = {
  title: "How to Find and Vet a Technical Co-Founder for Your Startup",
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
          { label: 'Articles', href: '/articles' },
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
        <p><strong>{TOPIC}</strong> — {"Many early founders hit the same wall. They have a strong idea, early customer pain points, and a clear sense that software could solve the problem, but they do not have the technical skill to build and ship it. That gap creates urgency. It also creates bad decisions. A lot of people start searching for a technical cofounder as if they are hiring a developer they cannot yet afford, when what they really need is an equal partner who will share risk, shape the product, and help lead the company."}</p>
        <p>{"That is why finding a technical cofounder is not just a recruiting task. It is a two-way sales process. The strongest approach is usually to do four things in order: validate the problem enough to sound credible, look in the right places, pitch the opportunity like a real partnership, and vet the fit before you commit. This guide follows that path so you can search with more realism and better odds."}</p>
        <ArticleImageBlock
          src={HERO_IMAGE}
          alt={HERO_IMAGE_ALT}
          caption="Struggling to find a technical co-founder for your startup? Learn where to look, how to pitch them, and how to thoroughly vet potential partners."
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
          {"A technical cofounder is more likely to engage when you can show customer pain, early demand signals, interviews, or simple pre-launch validation rather than only an idea."}
        </QuoteBlock>
          <h2>{"Validate Your Idea Before Searching"}</h2>
          <p>{"Before you start looking for a technical cofounder, make the opportunity easier to believe in. Strong technical people are pitched every week by founders with big visions, no evidence, and an equity-only offer. From their side, that usually looks like high risk and unclear upside. They are not only judging the idea. They are judging whether you can sell, learn fast, and move a business forward when the product does not exist yet. If your pitch is still just a concept, you will struggle to stand out against founders who already have signs of demand."}</p>
          <p>{"It means proving that a real customer problem exists and that people care enough to act. Run structured customer interviews. Build a simple landing page that explains the outcome, not the features. Each step reduces uncertainty and shows that you are not waiting for a developer to do all the hard work."}</p>
          <p>{"This matters because market proof is one of the strongest assets a non-technical founder can bring to the table. A technical cofounder wants to know that their time will go into a business with momentum, not just a speculative side project. If you can show clear user pain, repeatable demand signals, and evidence that people will pay, the conversation changes. You are no longer asking someone to gamble on your idea alone."}</p>
          <p>{"Strong technical people are pitched every week by founders with big visions, no evidence, and an equity-only offer. From their side, that usually looks like high risk and unclear upside. They are not only judging the idea."}</p>
          <h2>{"Tactical Channels to Find a Technical Co-Founder"}</h2>
          <p>{"The best place to start is usually closer than founders expect. Warm introductions through former colleagues, startup operators, investors, advisors, university peers, and founder communities give you a higher-trust starting point than cold outreach. That context matters because a technical cofounder is not just a developer for hire. You are looking for a long-term decision-maker who can share product, hiring, and execution risk with you."}</p>
          <p>{"Offline communities are useful because they let you observe people in motion. Hackathons, startup weekends, engineering meetups, and product-building events show how someone thinks, communicates, and collaborates when time is tight. You can often spot the people who naturally take ownership, simplify messy problems, and keep momentum when a build gets stuck. Even if you do not meet your future cofounder on the day, these events help you build a pipeline of credible technical contacts you can get to know over time."}</p>
          <p>{"Online channels expand your reach, especially if your local market is small or your product needs a niche skill set. Platforms such as YC Co-Founder Matching, AngelList, LinkedIn, and founder communities can help you meet experienced engineers outside your immediate network. To avoid wasting time, write a clear profile with the problem you are solving, the market insight you bring, your current traction, and what kind of technical partner you need."}</p>
          <p>{"Niche technical communities can be even stronger than broad startup platforms if you approach them with patience. The key is to engage authentically instead of treating every space like a recruitment board."}</p>
          <p>{"Warm introductions through former colleagues, startup operators, investors, advisors, university peers, and founder communities give you a higher-trust starting point than cold outreach. That context matters because a technical cofounder is not just a developer for hire."}</p>
          <h3>{"How to prioritise your search channels"}</h3>
          <p>{"Meetups and hackathons come next because you can see how people work and communicate."}</p>
          <p>{"Keep short notes on technical depth, product curiosity, speed of follow-up, and enthusiasm for the problem."}</p>

        <ArticleResourceCTA
          eyebrow="Free guide"
          title={"Get the technical cofounder checklist"}
          description="Use this article as a working guide: shortlist candidates, validate traction, and structure your next conversations."
          buttonLabel="Download now"
          buttonHref="/articles"
          accent="purple"
        />

        <ArticleStepList
          title="Practical next steps"
          steps={[
            "Validate Your Idea Before Searching",
            "Tactical Channels to Find a Technical Co-Founder",
            "How to Pitch a Technical Partner",
            "Vetting Their Skills and Alignment",
            "Taking the Next Steps Forward",
          ]}
          accent="indigo"
        />
          <h2>{"How to Pitch a Technical Partner"}</h2>
          <p>{"A strong pitch to a potential technical co-founder starts with the problem, not the feature list. Good technical people hear product ideas all the time, and most of them sound like a backlog instead of a business. Lead with why this problem matters, who feels the pain, and why now is the right time to solve it. Show that you understand the market well enough to spot a real gap, not just a clever app idea."}</p>
          <p>{"You also need to be clear about what you bring to the partnership. If you are asking someone to build with you, they need to know that you are not just outsourcing risk. A technical co-founder usually wants to see that you can carry your side of the company with the same seriousness they will carry product and engineering."}</p>
          <p>{"Equity should be discussed earlier than many founders expect, but with care and honesty. Avoid vague lines like 'we'll figure it out later' because that usually creates distrust. Early resentment over ownership can ruin a promising match, so fairness matters as much as enthusiasm."}</p>
          <p>{"In practice, a technical co-founder is not only choosing an idea; they are choosing a business partner. Treat the process like careful dating before proposing a long-term marriage."}</p>
          <p>{"Good technical people hear product ideas all the time, and most of them sound like a backlog instead of a business. Lead with why this problem matters, who feels the pain, and why now is the right time to solve it."}</p>
          <h2>{"Vetting Their Skills and Alignment"}</h2>
          <p>{"A strong technical cofounder should be able to build, but that alone is not enough. Ask them to look at how the candidate approaches architecture, testing, security, deployment, and trade-offs under time pressure. You are not trying to prove they are the best engineer in the world. You are trying to confirm they can make sound decisions for an early-stage product without creating avoidable risk."}</p>
          <p>{"Communication is just as important as technical depth. In early startups, this matters every week because product, sales, fundraising, and delivery all depend on shared understanding."}</p>
          <p>{"Talk openly about startup pace, appetite for risk, quality standards, hiring plans, equity expectations, and what success looks like in three to five years. You should also discuss harder topics early, such as runway pressure, side projects, relocation, and exit preferences. When a technical cofounder shares your direction and can challenge you constructively, you are far more likely to build a durable company instead of a short-lived partnership."}</p>
          <p>{"Ask them to look at how the candidate approaches architecture, testing, security, deployment, and trade-offs under time pressure. You are not trying to prove they are the best engineer in the world. You are trying to confirm they can make sound decisions for an early-stage product without creating avoidable risk. A strong technical cofounder should be able to build, but that alone is not enough."}</p>
          <h2>{"Taking the Next Steps Forward"}</h2>
          <p>{"Finding the right technical cofounder is one of the most important decisions in an early startup, so it should not be rushed. The goal is not just to find someone who can code."}</p>
          <p>{"If that search is dragging on, you still do not need to sit still. Many founders move forward by validating demand, narrowing the scope, and using a trusted product studio to build an MVP or prototype. That can be a practical path when you need momentum, user feedback, and a clearer product story before bringing on a permanent technical partner. For Australian founders building AI products, MLAI can help turn an idea into something testable without forcing a rushed cofounder decision. The most useful next step is simple: talk to users, define the smallest valuable version of the product, and start validating your idea today with the team you have now."}</p>
          <p>{"The goal is not just to find someone who can code. Finding the right technical cofounder is one of the most important decisions in an early startup, so it should not be rushed."}</p>

        <QuoteBlock title="Keep moving forward" variant="orange">
          {"Lead with the problem, market timing, and your own contribution to the business so the role feels like a shared mission instead of unpaid contract work."}
        </QuoteBlock>

        <MLAITemplateResourceCTA />

      <ArticleReferences
        references={[
          {id: 1, href: "https://articles.sequoiacap.com/five-tips-for-technical-co-founders", title: "Five Tips for Technical Co-Founders", publisher: "articles.sequoiacap.com", description: "Authoritative reference supporting Five Tips for Technical Co-Founders.", category: "guide"},
          {id: 2, href: "https://www.linkedin.com/pulse/how-i-vet-technical-co-founder-matt-watson-msvwc", title: "How I Vet a Technical Co-Founder", publisher: "linkedin.com", description: "Authoritative reference supporting How I Vet a Technical Co-Founder.", category: "guide"},
          {id: 3, href: "https://www.linkedin.com/pulse/do-you-really-need-technical-co-founder-what-should-i-jonathan-morgan-dkxzc", title: "Do you really need a technical co-founder? And what should I be looking for?", publisher: "linkedin.com", description: "Authoritative reference supporting Do you really need a technical co-founder? And what should I be looking for?.", category: "guide"},
          {id: 4, href: "https://www.masslight.com/posts/checklist-finding-technical-cofounder", title: "Checklist for Finding a Technical Co-Founder", publisher: "masslight.com", description: "Authoritative reference supporting Checklist for Finding a Technical Co-Founder.", category: "guide"},
          {id: 5, href: "https://plane.com/blog/what-to-look-for-in-a-technical-co-founder", title: "What to look for in a technical co-founder - Plane | Global payroll, HR & compliance", publisher: "plane.com", description: "Authoritative reference supporting What to look for in a technical co-founder - Plane | Global payroll, HR & compliance.", category: "guide"},
          {id: 6, href: "https://fireart.studio/blog/finding-a-technical-co-founder-tips-and-strategies/", title: "How To Find a Technical Co-Founder | Fireart", publisher: "fireart.studio", description: "Authoritative reference supporting How To Find a Technical Co-Founder | Fireart.", category: "guide"},
          {id: 7, href: "https://www.groovehq.com/blog/technical-co-founder", title: "What I Did When I Couldn\u2019t Find a Technical Co-Founder", publisher: "groovehq.com", description: "Authoritative reference supporting What I Did When I Couldn\u2019t Find a Technical Co-Founder.", category: "guide"},
          {id: 8, href: "https://www.dave-bailey.com/blog/technical-co-founder", title: "\n      \n        How to Recruit a Technical Co-founder for Your Startup\n      \n    ", publisher: "dave-bailey.com", description: "Authoritative reference supporting \n      \n        How to Recruit a Technical Co-founder for Your Startup\n      \n    .", category: "guide"},
          {id: 9, href: "https://www.lithobyte.co/7-mistakes-people-make-trying-to-find-technical-co-founders/", title: "7 Mistakes People Make Trying to Find Technical Co-Founders \u2013 LithoByte", publisher: "lithobyte.co", description: "Authoritative reference supporting 7 Mistakes People Make Trying to Find Technical Co-Founders \u2013 LithoByte.", category: "guide"},
          {id: 10, href: "https://foundingjourney.com/how-to-find-a-technical-cofounder", title: "How to Find a Technical Co-Founder | Founding Journey", publisher: "foundingjourney.com", description: "Authoritative reference supporting How to Find a Technical Co-Founder | Founding Journey.", category: "guide"},
          {id: 11, href: "https://www.smartcompany.com.au/startupsmart/how-to-recruit-a-technical-co-founder/", title: "How to recruit a technical co-founder, according to Alan Jones - SmartCompany", publisher: "smartcompany.com.au", description: "Authoritative reference supporting How to recruit a technical co-founder, according to Alan Jones - SmartCompany.", category: "guide"},
        ]}
        heading="Sources & further reading"
      />

        <ArticleDisclaimer />

        <div className="my-12 not-prose">
          <ArticleCompanyCTA
            title="Need momentum before you find the right technical cofounder?"
            body="If your startup idea is validated but the cofounder search is slow, MLAI can help you scope and build a testable MVP so you can learn from real users without forcing a rushed partnership decision."
            buttonText="Talk to MLAI"
            buttonHref="/contact"
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
