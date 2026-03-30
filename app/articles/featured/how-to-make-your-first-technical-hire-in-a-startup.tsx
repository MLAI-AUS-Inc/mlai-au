import type { ReactNode } from 'react'
import { Home } from 'lucide-react'
import { AcademicCapIcon, RocketLaunchIcon, UsersIcon } from '@heroicons/react/24/outline'
import { DEFAULT_AUTHOR_KEY, getAuthorProfile, DEFAULT_AUTHOR_AVATAR_FALLBACK_URL } from '~/articles/authors'
import { ArticleFAQ } from '../../components/articles/ArticleFAQ'
import ArticleCompanyCTA from '../../components/articles/ArticleCompanyCTA'
import AuthorBio from '../../components/AuthorBio'
import { ArticleHeroHeader } from '../../components/articles/ArticleHeroHeader'
import { ArticleImageBlock } from '../../components/articles/ArticleImageBlock'
import { ArticleFooterNav } from '../../components/articles/ArticleFooterNav'
import QuoteBlock from '../../components/articles/QuoteBlock'
import ArticleTocPlaceholder from '../../components/articles/ArticleTocPlaceholder'
import AudienceGrid from '../../components/articles/AudienceGrid'
import { ArticleResourceCTA } from '../../components/articles/ArticleResourceCTA'
import { ArticleStepList } from '../../components/articles/ArticleStepList'
import MLAITemplateResourceCTA from '../../components/articles/MLAITemplateResourceCTA'
import { ArticleReferences } from '../../components/articles/ArticleReferences'
import ArticleDisclaimer from '../../components/articles/ArticleDisclaimer'

export const useCustomHeader = true

const TOPIC = "How to Make Your First Technical Hire in a Startup"
export const CATEGORY = "featured"
export const SLUG = "how-to-make-your-first-technical-hire-in-a-startup"
export const DATE_PUBLISHED = "2026-03-30"
export const DATE_MODIFIED = "2026-03-30"
export const DESCRIPTION = "Learn how to make your first technical hire in a startup by choosing the right timing, defining the role around outcomes, and running a focused hiring process."
const HERO_IMAGE = "https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Fhero-a585f5c2-1de7-4691-9bc5-316b04505d9b.jpg?alt=media&token=f276e8cc-2d13-4a94-a66e-5f51be0f6de9"
const HERO_IMAGE_ALT = "How to Make Your First Technical Hire in a Startup"
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
  { id: 1, question: "Should a founder hire a senior engineer or a more generalist builder first?", answer: "It depends on the startup's immediate need. If the main gap is hands-on product delivery, a strong builder may be the better first hire; if technical decisions and structure are becoming bottlenecks, a more senior profile may fit better." },
  { id: 2, question: "What mistakes do startups make when writing the first technical job description?", answer: "A common mistake is combining too many responsibilities into one role, such as architecture, delivery, DevOps, design, and people management. Clear ownership and realistic 90-day outcomes usually make the role easier to hire for and easier to succeed in." },
  { id: 3, question: "How transparent should founders be about compensation, equity, and startup risk?", answer: "Founders should be direct about salary, equity, runway, and the day-to-day realities of early-stage work. Clear expectations help candidates judge fit and reduce the chance of mismatch after joining." },
  { id: 4, question: "What should the first 90 days look like for a first technical hire?", answer: "The first 90 days should focus on a narrow set of business-critical outcomes rather than a long backlog. The new hire should also get direct access to customer context, product goals, and founder decisions so they can make informed trade-offs." },
]

export const summaryHighlights = {
  heading: "Key facts: How to Make Your First Technical Hire in a Startup",
  intro: "Learn how to make your first technical hire in a startup by choosing the right timing, defining the role around outcomes, and running a focused hiring process.",
  items: [
    { label: "When should a startup make its first technical hire?", description: "A first technical hire makes the most sense when product priorities are clearer than founder bandwidth. If the company is still changing its core problem or business model, waiting may be the better move." },
    { label: "What should the first technical role actually cover?", description: "The role should match the startup's main constraint, such as building an MVP, validating feasibility, or adding technical ownership. It should be defined by near-term outcomes and decision scope, not a broad title." },
    { label: "How should founders assess candidates without overbuilding the process?", description: "A lean process can test problem-solving, judgment, communication, and comfort with ambiguity. Structured conversations and a focused practical exercise usually give better signal than a long interview loop." },
  ],
}

export const articleMeta = {
  title: "How to Make Your First Technical Hire in a Startup",
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
  { question: "When should a startup make its first technical hire?", answer: "A first technical hire makes the most sense when product priorities are clearer than founder bandwidth. If the company is still changing its core problem or business model, waiting may be the better move." },
  { question: "What should the first technical role actually cover?", answer: "The role should match the startup's main constraint, such as building an MVP, validating feasibility, or adding technical ownership. It should be defined by near-term outcomes and decision scope, not a broad title." },
  { question: "How should founders assess candidates without overbuilding the process?", answer: "A lean process can test problem-solving, judgment, communication, and comfort with ambiguity. Structured conversations and a focused practical exercise usually give better signal than a long interview loop." },
  { question: "Should a founder hire a senior engineer or a more generalist builder first?", answer: "It depends on the startup's immediate need. If the main gap is hands-on product delivery, a strong builder may be the better first hire; if technical decisions and structure are becoming bottlenecks, a more senior profile may fit better." },
  { question: "What mistakes do startups make when writing the first technical job description?", answer: "A common mistake is combining too many responsibilities into one role, such as architecture, delivery, DevOps, design, and people management. Clear ownership and realistic 90-day outcomes usually make the role easier to hire for and easier to succeed in." },
  { question: "How transparent should founders be about compensation, equity, and startup risk?", answer: "Founders should be direct about salary, equity, runway, and the day-to-day realities of early-stage work. Clear expectations help candidates judge fit and reduce the chance of mismatch after joining." },
  { question: "What should the first 90 days look like for a first technical hire?", answer: "The first 90 days should focus on a narrow set of business-critical outcomes rather than a long backlog. The new hire should also get direct access to customer context, product goals, and founder decisions so they can make informed trade-offs." },
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
        <p><strong>{TOPIC}</strong> — {"Your first technical hire is not just another recruiting milestone. It is an early design decision for the business. In a startup, one technical person can shape how the product gets built, how quickly the team can test ideas, and what standards become normal from day one. Several startup hiring guides make the same point in different ways: early hires have an outsized effect on company direction, momentum, and culture, which is why founders need to treat the role with care rather than as a simple capacity fix."}</p>
        <p>{"That is also why rushing to hire can backfire. MIT Sloan warns that founders are often too eager to bring in engineers and start building, which can lead to a product searching for a business model instead of the other way around. Broader startup hiring advice from Stripe and Metaview also suggests that founders should decide what the business actually needs at its current stage before filling critical roles. In practice, the goal is not to hire fast at any cost. It is to hire when the startup can give that first technical person a clear problem to solve, real ownership, and priorities that connect to the company\u2019s next milestones."}</p>
        <ArticleImageBlock
          src={HERO_IMAGE}
          alt={HERO_IMAGE_ALT}
          caption="Learn how to make your first technical hire in a startup by choosing the right timing, defining the role around outcomes, and running a focused hiring process."
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
          {"A first technical hire makes the most sense when product priorities are clearer than founder bandwidth. If the company is still changing its core problem or business model, waiting may be the better move."}
        </QuoteBlock>
          <h2>{"Decide whether you need to hire now or wait"}</h2>
          <p>{"A first technical hire usually makes more sense when the startup already has clearer product priorities than the founders have time to execute. The sources consistently point to a similar moment: you have a real business direction, some early product shape, and a growing gap between what needs to be built and what the founding team can realistically own. In that situation, hiring can add momentum because the new person is joining a clearer path, not guessing what the company should be."}</p>
          <p>{"The risk is hiring too early because coding feels like progress. MIT Sloan warns that founders can become overeager to hire engineers and end up building a product before the business model is settled. Startup hiring guidance from Metaview and Stripe also frames early hiring as something that should follow clearer strategy, not replace it. If you are still changing the target customer, redefining the core problem, or testing whether the business itself works, a permanent technical hire can lock you into work that may need to be undone."}</p>
          <ArticleImageBlock
            src="https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-24722b3c-217f-4b6f-8041-d9250e7cef44.jpg?alt=media&token=2678dadd-f094-4810-9125-7a65f98441f1"
            alt="Decide whether you need to hire now or wait"
            caption="Decide whether you need to hire now or wait"
            width={1200}
            height={800}
          />
          <h3>{"Signs you may be ready"}</h3>
          <p>{"You may be ready to hire now if the product roadmap is becoming clearer, customer needs are less speculative, and founder bandwidth is the main bottleneck. In plain terms, the question is not just \"Do we need software built?\" but \"Do we know what should be built next, and do we need someone to own it well?\" When the answer is yes, the first technical hire can provide focus, speed, and day-to-day technical ownership that founders can no longer cover alone."}</p>
          <h3>{"When waiting is the smarter move"}</h3>
          <p>{"If the team is still testing the core customer problem, exploring different business models, or making major changes to scope every few weeks, the immediate need may be temporary execution support rather than a long-term hire. That distinction matters: strategic technical ownership is different from short-term help with a prototype, an experiment, or a limited build. Founders who separate those needs are less likely to make an early hire that creates cost without enough clarity."}</p>
          <h2>{"Define the role around outcomes, not a generic job title"}</h2>
          <p>{"Your first technical hire should solve the startup's biggest current constraint, not fill a vague title because it sounds standard. At this stage, founders are usually balancing speed, limited budget, and a small team, so the role needs to match what the business needs right now. If the bottleneck is getting an MVP built, you may need a strong hands-on builder. If the product idea still needs technical validation, you may need someone who can test feasibility and make smart trade-offs early. If product demand is growing and delivery is becoming messy, the role may need more structure and technical leadership. The point is to start with the problem, then define the job."}</p>
          <p>{"This is also where many startups make the role too broad. A first technical hire cannot realistically be your architect, senior engineer, DevOps lead, product thinker, people manager, and designer all at once. Broad job descriptions can attract the wrong candidates or create mismatched expectations after hiring. A clearer brief is more useful: what will this person own, what decisions will they make, and what work will still stay with the founders? Early hires shape the company, so clarity matters more than trying to cover every possible gap in one position."}</p>
          <p>{"Good role design becomes much easier when you describe success in outcomes, especially for the first 90 days. Instead of saying you want a 'rockstar full-stack engineer,' say what needs to be true after they join. That might mean shipping the first production version of a core feature, improving the reliability of an early product, or helping the team choose a practical technical direction. Clear outcomes help candidates judge whether the role fits their strengths, and they help founders hire against real business goals rather than a generic startup job title."}</p>
          <ArticleImageBlock
            src="https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-b095d245-9399-46c2-996b-4dfbd64bcab5.jpg?alt=media&token=302eb3e9-01fe-48f7-a1d7-93d3b1634d21"
            alt="Define the role around outcomes, not a generic job title"
            caption="Define the role around outcomes, not a generic job title"
            width={1200}
            height={800}
          />

        <ArticleResourceCTA
          eyebrow="Free guide"
          title={"Get the how to make your first technical hire in a startup checklist"}
          description="Use this article as a working guide: shortlist candidates, validate traction, and structure your next conversations."
          buttonLabel="Download now"
          buttonHref="/articles"
          accent="purple"
        />

        <ArticleStepList
          title="Practical next steps"
          steps={[
            "Early technical hires influence product quality, delivery speed, and team habits.",
            "Founders can be tempted to hire builders before the business problem is clear.",
            "A strong first hire needs a real mandate, not just a vague instruction to build.",
          ]}
          accent="indigo"
        />
          <h2>{"Run a lean hiring process that tests startup fit"}</h2>
          <p>{"For a first technical hire, keep the process short but structured. Early startup hiring is usually handled by founders, so a long interview loop adds delay without giving much more signal. A better approach is to test a small set of things clearly: how the candidate solves problems, how they make decisions with limited information, how they communicate, and whether they are comfortable working in an early-stage environment where roles and priorities can change."}</p>
          <p>{"Start with a structured screening conversation about the role, the startup stage, and the kind of work the person would own. This helps candidates judge the startup honestly before they join, and it helps founders avoid hiring someone who wants a much more defined environment."}</p>
          <h3>{"What each stage should reveal"}</h3>
          <p>{"In an early startup, the job often includes shifting priorities, imperfect systems, and work that crosses formal role boundaries. A candidate who asks thoughtful questions about the business, product, and team can be easier to trust than someone focused only on title, stack, or process. Sources on early hires also stress the outsized impact of first employees, which makes attitude and fit especially important."}</p>
          <p>{"The practical step should stay close to real work and be narrow enough to review quickly. You are looking for evidence of judgment, clarity, and how the person handles trade-offs."}</p>
          <h2>{"Close the right candidate with clarity and realism"}</h2>
          <p>{"At the offer stage, strong technical candidates usually want a clear picture of what they are joining. For an early startup, that means explaining the mission in plain terms, the problem the company is trying to prove, and why this role matters right now. It also helps to be specific about scope: what the person will own, which decisions they can make without waiting on the founders, and what good performance will look like in the first stretch of the job. Startup hiring guidance consistently points back to clarity because early hires shape the company\u2019s direction, not just its output."}</p>
          <p>{"Realism matters as much as excitement. Founders should be transparent about salary, equity, runway constraints, and the everyday trade-offs of early-stage work. Candidates need to know whether they are joining a small team that is still building process, handling ambiguity, and moving quickly as priorities change."}</p>
          <p>{"Explain what the startup has already built, what it still needs to learn, and why this hire is pivotal to getting there. If the role is the first technical hire, say clearly whether the person is expected to build hands-on, shape early technical decisions, or help create the first version of engineering practice. Candidates who are a fit for startup life are often drawn to ownership and impact, but they still need enough structure to judge the opportunity properly."}</p>
          <ArticleImageBlock
            src="https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-4f6dbbed-c3d6-43d0-a73d-5423d47186b7.jpg?alt=media&token=e8548500-36c9-4c3a-9f84-f6f4491c9c4d"
            alt="Founder\u2019s hands outlining a startup offer to a candidate across a laptop, candid close-up in natural office"
            caption="Close the right candidate with clarity and realism"
            width={1200}
            height={800}
          />
          <h2>{"Set up the first technical hire to succeed in the first 90 days"}</h2>
          <p>{"The first 90 days should not look like a giant wish list. Early startup hiring works best when the role is tied to a small number of business-critical outcomes, because a first technical hire can easily get pulled into building too much too soon. Founders should start with a narrow plan: the most important product problem to solve, the business reason it matters now, and the tradeoffs that are already off the table. That gives the new hire a clear lane and helps the company avoid building a product before the business case is clear."}</p>
          <p>{"Momentum also depends on access. A first technical hire should hear customer problems directly, understand the product roadmap, and see how founders make decisions. That context helps them make better technical calls without waiting on constant translation. If the hire is reducing delivery risk, improving product direction, or helping the team learn faster, the role can expand with evidence. If not, founders can adjust priorities early instead of letting assumptions harden into a bigger problem."}</p>
          <ArticleImageBlock
            src="https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-c9184087-9f7c-4ecd-a872-7e52fc575587.jpg?alt=media&token=869cac49-5b99-41ad-ad44-98998b865527"
            alt="Startup founder and first technical hire mapping 90-day goals on a whiteboard in"
            caption="Set up the first technical hire to succeed in the first 90 days"
            width={1200}
            height={800}
          />

        <QuoteBlock title="Keep moving forward" variant="orange">
          {"A lean process can test problem-solving, judgment, communication, and comfort with ambiguity. Structured conversations and a focused practical exercise usually give better signal than a long interview loop."}
        </QuoteBlock>

        <MLAITemplateResourceCTA />

      <ArticleReferences
        references={[
          {id: 1, href: "https://mitsloan.mit.edu/ideas-made-to-matter/startup-tactics-how-and-when-to-hire-technical-talent", title: "Startup tactics: How and when to hire technical talent | MIT Sloan", publisher: "mitsloan.mit.edu", description: "Authoritative reference supporting Startup tactics: How and when to hire technical talent | MIT Sloan.", category: "guide"},
          {id: 2, href: "https://www.linkedin.com/posts/larissa-pearce-recruitment_the-first-20-hires-in-a-startup-will-define-activity-7437104070823325696-AN1f", title: "Early Stage Hiring Mistakes: Founders' Hardest Lessons | Larissa Pearce posted on the topic | LinkedIn", publisher: "linkedin.com", description: "Authoritative reference supporting Early Stage Hiring Mistakes: Founders' Hardest Lessons | Larissa Pearce posted on the topic | LinkedIn.", category: "guide"},
          {id: 3, href: "https://www.startupgrind.com/blog/how-to-make-the-perfect-first-hire/", title: "How to Make The Perfect First Hire | Startup Grind", publisher: "startupgrind.com", description: "Authoritative reference supporting How to Make The Perfect First Hire | Startup Grind.", category: "guide"},
          {id: 4, href: "https://www.metaview.ai/resources/blog/how-to-hire-for-a-startup", title: "How to hire for a startup: A founder\u2019s guide to building a high-performing team | Metaview Blog", publisher: "metaview.ai", description: "Authoritative reference supporting How to hire for a startup: A founder\u2019s guide to building a high-performing team | Metaview Blog.", category: "guide"},
          {id: 5, href: "https://flyerone.vc/post/7-mistakes-startups-make-when-hiring-first-employees", title: "7 mistakes startups make when hiring first employees", publisher: "flyerone.vc", description: "Authoritative reference supporting 7 mistakes startups make when hiring first employees.", category: "guide"},
          {id: 6, href: "https://useshiny.com/blog/startup-hiring-mistakes/", title: "Top Startup Hiring Mistakes to Avoid in 2025 - Shiny", publisher: "useshiny.com", description: "Authoritative reference supporting Top Startup Hiring Mistakes to Avoid in 2025 - Shiny.", category: "guide"},
          {id: 7, href: "https://www.myhatchpad.com/insight/what-i-learned-making-the-first-few-technical-hires-for-our-seed-startup/", title: "Practical Tips for Early Stage Startup Hiring", publisher: "myhatchpad.com", description: "Authoritative reference supporting Practical Tips for Early Stage Startup Hiring.", category: "guide"},
          {id: 8, href: "https://www.cloudkettle.com/blog/new-hire-checklist-for-startups/", title: "The New Hire Checklist for Startups", publisher: "cloudkettle.com", description: "Authoritative reference supporting The New Hire Checklist for Startups.", category: "guide"},
          {id: 9, href: "https://posthog.com/founders/first-ops-hire", title: "Making your first startup ops hire \u2013 what founders should look for - PostHog", publisher: "posthog.com", description: "Authoritative reference supporting Making your first startup ops hire \u2013 what founders should look for - PostHog.", category: "guide"},
          {id: 10, href: "https://stripe.com/resources/more/how-to-hire-the-first-employees-for-your-startup-a-guide-for-founders", title: "How to recruit the first employees for your startup | Stripe", publisher: "stripe.com", description: "Authoritative reference supporting How to recruit the first employees for your startup | Stripe.", category: "guide"},
          {id: 11, href: "https://www.stoneandchalk.com.au/articles/how-to-hire-your-startups-first-senior-leader", title: "How to hire your startup\u2019s first senior leader | Stone & Chalk", publisher: "stoneandchalk.com.au", description: "Authoritative reference supporting How to hire your startup\u2019s first senior leader | Stone & Chalk.", category: "guide"},
        ]}
        heading="Sources & further reading"
      />

        <ArticleDisclaimer />

        <div className="my-12 not-prose">
          <ArticleCompanyCTA
            title="Need support shaping your startup hiring plan?"
            body="Explore practical resources for startup building, AI learning, and partnerships that can help founders make clearer early-stage decisions."
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
