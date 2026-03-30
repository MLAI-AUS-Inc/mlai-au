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

const TOPIC = "How to Make Your First Technical Hire in a Startup"
export const CATEGORY = "featured"
export const SLUG = "how-to-make-your-first-technical-hire-in-a-startup"
export const DATE_PUBLISHED = "2026-03-30"
export const DATE_MODIFIED = "2026-03-30"
export const DESCRIPTION = "Learn how to make your first technical hire in a startup by judging timing, defining the right role, running a lean process, and setting clear 90-day priorities."
const HERO_IMAGE = "https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Fhero-9c6056d8-8b73-4037-97dc-ea92e74f3d55.jpg?alt=media&token=1d1dfcea-abaf-4558-977a-8f72a32981ed"
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
  { id: 1, question: "What is the biggest mistake founders make with a first technical hire?", answer: "A common mistake is hiring before the business has enough product or customer clarity. That can lead to wasted build cycles, unclear priorities, and a role that is hard for the new hire to succeed in." },
  { id: 2, question: "Should the first technical hire be a builder or a leader?", answer: "It depends on the main bottleneck. If the startup needs to ship and learn quickly, a hands-on builder may fit best; if founders are stuck making every technical decision, ownership and leadership may matter more." },
  { id: 3, question: "How long should the hiring process be for an early startup technical role?", answer: "The process should stay short but structured. A focused interview, a practical discussion about real work, and a final alignment check can test fit without creating enough friction for strong candidates to drop out." },
  { id: 4, question: "What should founders make clear in the offer?", answer: "Founders should explain the mission, the product problem, the role's scope, and what the hire will own early. Candidates also need a realistic view of pace, ambiguity, and how success will be judged." },
  { id: 5, question: "What should the first 90 days look like for a new technical hire?", answer: "The first 90 days should center on a small set of real business and product priorities, not a vague brief to build everything. Clear decision boundaries, regular founder check-ins, and customer-linked goals help the hire create early leverage." },
]

export const summaryHighlights = {
  heading: "Key facts: How to Make Your First Technical Hire in a Startup",
  intro: "Learn how to make your first technical hire in a startup by judging timing, defining the right role, running a lean process, and setting clear 90-day priorities.",
  items: [
    { label: "When is a startup ready for its first technical hire?", description: "A startup is usually ready when it can name the customer problem, target user, and near-term product priority. Repeated customer requests and a clear MVP roadmap are stronger signals than general urgency to build." },
    { label: "What role should you hire first?", description: "The first role should match the main business bottleneck, such as hands-on product building or technical ownership. A clear scope based on outcomes is more useful than a broad list of tools or titles." },
    { label: "How should founders assess candidates?", description: "A lean process should test technical judgment, ownership, communication, and comfort with ambiguity. Structured interviews and practical work discussions give better early-stage signals than a long, generic hiring loop." },
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
  { question: "When is a startup ready for its first technical hire?", answer: "A startup is usually ready when it can name the customer problem, target user, and near-term product priority. Repeated customer requests and a clear MVP roadmap are stronger signals than general urgency to build." },
  { question: "What role should you hire first?", answer: "The first role should match the main business bottleneck, such as hands-on product building or technical ownership. A clear scope based on outcomes is more useful than a broad list of tools or titles." },
  { question: "How should founders assess candidates?", answer: "A lean process should test technical judgment, ownership, communication, and comfort with ambiguity. Structured interviews and practical work discussions give better early-stage signals than a long, generic hiring loop." },
  { question: "What is the biggest mistake founders make with a first technical hire?", answer: "A common mistake is hiring before the business has enough product or customer clarity. That can lead to wasted build cycles, unclear priorities, and a role that is hard for the new hire to succeed in." },
  { question: "Should the first technical hire be a builder or a leader?", answer: "It depends on the main bottleneck. If the startup needs to ship and learn quickly, a hands-on builder may fit best; if founders are stuck making every technical decision, ownership and leadership may matter more." },
  { question: "How long should the hiring process be for an early startup technical role?", answer: "The process should stay short but structured. A focused interview, a practical discussion about real work, and a final alignment check can test fit without creating enough friction for strong candidates to drop out." },
  { question: "What should founders make clear in the offer?", answer: "Founders should explain the mission, the product problem, the role's scope, and what the hire will own early. Candidates also need a realistic view of pace, ambiguity, and how success will be judged." },
  { question: "What should the first 90 days look like for a new technical hire?", answer: "The first 90 days should center on a small set of real business and product priorities, not a vague brief to build everything. Clear decision boundaries, regular founder check-ins, and customer-linked goals help the hire create early leverage." },
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
        <p><strong>{TOPIC}</strong> — {"Your first technical hire can shape far more than your product roadmap. In an early startup, that person often influences what gets built first, how quickly the team learns, and how much time founders spend turning ideas into working software. Several startup hiring guides make the same point in different ways: early hires have an outsized effect on momentum, while a poor fit can slow the company and push it off course."}</p>
        <p>{"That is why the first question is not only who to hire, but whether the business is ready for that hire to succeed. MIT Sloan warns that founders are often too eager to hire engineers and start building before they have enough clarity on the business model or customer problem. Metaview similarly frames startup hiring as something that should follow strategy and stage, not just urgency. Stripe also notes that founders carry much of the recruiting burden early on, which makes role timing and role definition especially important. In practice, the best first technical hire usually comes when the startup has enough focus for that person to solve real problems instead of building a product that is still searching for a business."}</p>
        <ArticleImageBlock
          src={HERO_IMAGE}
          alt={HERO_IMAGE_ALT}
          caption="Learn how to make your first technical hire in a startup by judging timing, defining the right role, running a lean process, and setting clear 90-day priorities."
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
          {"A startup is usually ready when it can name the customer problem, target user, and near-term product priority. Repeated customer requests and a clear MVP roadmap are stronger signals than general urgency to build."}
        </QuoteBlock>
          <h2>{"Decide whether the business is ready for a technical hire"}</h2>
          <p>{"A first technical hire works best when the startup already knows what problem it is solving, who the user is, and what needs to be built next. MIT Sloan warns that founders can hire engineers too early and end up building a product before the business model is clear. If your roadmap changes every week because the core offer is still uncertain, the issue is usually strategy, not missing engineering capacity."}</p>
          <p>{"Stone & Chalk describes the moment to hire as the point where leadership becomes a bottleneck and progress slows. For a technical role, that bottleneck should be specific: you know the near-term product priority, customers keep asking for similar capabilities, and the team can describe an MVP roadmap in plain language. Stripe also frames early hiring around business and product planning, which supports a simple rule: hire when there is enough validated demand and roadmap clarity for someone technical to make steady progress, not just start exploring."}</p>
          <p>{"If the startup is not ready, founders should keep narrowing the scope before adding technical headcount. That can mean testing demand, tightening the target user definition, and choosing one immediate product goal. The aim is not to delay forever. It is to make sure the first engineer or technical leader joins a company that can point them at a real priority."}</p>
          <p>{"If the startup is ready, the role should connect to a clear business outcome rather than a vague hope that 'tech will fix it.' A good sign is that the company can explain why this hire matters now, what they should deliver in the next phase, and how that work supports the product roadmap. That gives the new hire context, reduces wasted build cycles, and lowers the risk of paying for capability before the business knows how to use it."}</p>
          <ul>
            <li>{"The team has a near-term product or MVP priority."}</li>
            <li>{"Founders are blocked by delivery, not by unresolved strategy."}</li>
          </ul>
          <ArticleImageBlock
            src="https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-7f18abdc-6dfb-408a-924f-436e220ace76.jpg?alt=media&token=fb6052ef-9675-4719-add0-4122a8726134"
            alt="Founder\u2019s notebook beside whiteboard roadmap and coffee, planning product needs before first technical hire"
            caption="Decide whether the business is ready for a technical hire"
            width={1200}
            height={800}
          />
          <h3>{"Simple readiness signals"}</h3>
          <p>{"Look for a small set of signals instead of waiting for perfect certainty. Repeated customer requests, a defined target user, and a near-term MVP plan are stronger signals than general excitement about building. When those pieces are in place, a technical hire is more likely to accelerate the business instead of adding cost and confusion."}</p>
          <h2>{"Choose the role you actually need first"}</h2>
          <p>{"Before you write a job title, map the company you are building and the stage you are in. Early startup hiring works best when the role comes from a real business bottleneck, not from a default plan to hire \"a software engineer\" because it feels like the next step. If you are still proving the product, your first technical hire may need to help ship and learn fast. If progress is slowing because every technical decision still sits with a founder, the bigger need may be ownership and leadership rather than more hands on coding alone."}</p>
          <p>{"This is why founders should define the hire around outcomes, scope, and trade-offs. Ask what this person must help the company do in the next phase: build the first version faster, create technical direction, or strengthen a part of the stack that is blocking delivery. A shorter role brief with clear goals is usually more useful than a long list of tools. It helps you avoid mixing several jobs into one and makes it easier to tell candidates what success will look like."}</p>
          <ul>
            <li>{"Start with the company stage and the main bottleneck."}</li>
            <li>{"Decide whether you need product building, technical ownership, or deeper specialist support first."}</li>
          </ul>
          <ArticleImageBlock
            src="https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-144739ea-9e01-45e5-b7ae-418297a3808e.jpg?alt=media&token=05504463-fd1b-4a84-90c4-3ab0a7c5ec77"
            alt="Startup office whiteboard mapping team roles beside"
            caption="Choose the role you actually need first"
            width={1200}
            height={800}
          />
          <h3>{"Match the hire to the gap"}</h3>
          <p>{"One role may be mainly about hands-on product building: turning ideas into working features and helping the startup move quickly. Another may be about technical leadership: setting direction, making decisions without the founder being the bottleneck, and helping the team scale."}</p>
          <p>{"If you try to hire one person to be a senior leader, full-stack builder, platform expert, and future team manager all at once, the role becomes vague and hard to fill. A clearer role attracts better-fit candidates and gives your startup a better chance of making a hire that matches the next stage of growth."}</p>

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
            "The team has a near-term product or MVP priority.",
            "Founders are blocked by delivery, not by unresolved strategy.",
          ]}
          accent="indigo"
        />
          <h2>{"Run a lean hiring process that tests startup fit"}</h2>
          <p>{"In an early startup, a lean hiring process should test how someone works, not just what is on their CV. The first technical hire will face changing priorities, incomplete information, and work that crosses role boundaries. That is why founders should look for problem solving, ownership, and comfort with ambiguity alongside core technical ability. Both Metaview and Stripe frame early hiring as a high-stakes founder task where speed matters, but where the wrong hire can slow the company down and damage momentum."}</p>
          <p>{"A practical way to do this is to keep the process short and structured. Start with a focused interview that checks motivation, communication, and how the candidate thinks about startup work. Then move to a practical discussion about real work, such as how they would approach a product problem, a technical trade-off, or a messy project with limited context. This gives you a clearer signal on startup fit without building a long process that strong candidates may abandon."}</p>
          <p>{"Structured interviews help founders compare candidates on the same criteria instead of relying on instinct alone. A practical work conversation is usually more useful than broad theory because early hires need to execute in the real environment of the company. The final alignment check matters because one of the biggest risks in startup hiring is mismatch: a candidate may be technically strong but still struggle with ownership, shifting priorities, or close collaboration with founders."}</p>
          <p>{"If you keep the process compact, be clear about what each stage is testing. One stage should test technical judgment. One should test whether they want the reality of early startup work, not just the title or upside. That balance helps reduce hiring risk while still respecting the speed an early team needs."}</p>
          <ul>
            <li>{"Use a structured first interview to assess motivation, communication, and understanding of startup work."}</li>
          </ul>
          <h2>{"Make the offer around mission, scope, and early leverage"}</h2>
          <p>{"A strong early-stage offer is not just about title or pay. Your first technical hire needs to see why the company matters, what problem the product is solving, and why this role is important right now. Sources on early startup hiring stress that first hires have an outsized effect on the company, so founders should explain the mission in a direct way and connect the role to near-term company progress. In practice, that means showing how this person will help ship product, shape technical decisions, and influence how the team works as the startup grows."}</p>
          <p>{"Startup candidates need a clear picture of pace, ambiguity, and the fact that early teams often work without much structure. Rather than hiding that, founders should explain what ownership the hire will have, what decisions they can make without waiting for approval, and what success looks like in the first stretch of the job."}</p>
          <ul>
            <li>{"Explain the company mission and the product problem in plain language."}</li>
            <li>{"Describe the role's scope, including what the hire will own early."}</li>
            <li>{"Set expectations for decision rights and early measures of success."}</li>
          </ul>
          <ArticleImageBlock
            src="https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-b994ae7e-9564-496f-897b-1234fa80d641.jpg?alt=media&token=3b48264b-c9bc-4cc8-b779-b31523aa832a"
            alt="Make the offer around mission, scope, and early leverage"
            caption="Make the offer around mission, scope, and early leverage"
            width={1200}
            height={800}
          />
          <h2>{"Set your first technical hire up for a strong first 90 days"}</h2>
          <p>{"The first 90 days should start with a clear business problem, not a loose brief to \u201cbuild the product.\u201d MIT Sloan warns that founders often hire engineers too early and end up building before the business model is clear. A better start is to give your first technical hire a small set of real priorities: what customer problem matters most, what product outcomes matter now, and which decisions they can make on their own. That gives them enough room to move fast without guessing what the founders want."}</p>
          <p>{"Keep those first months close to customers and close to founder communication. Stripe\u2019s guidance on early startup hiring stresses that founders carry much of the operating load early on, so regular check-ins matter. Stone & Chalk also frames early leadership hires around removing founder bottlenecks, which means the handoff must be deliberate. If the onboarding is working, your first technical hire will not only ship work faster but also help the startup make better product decisions."}</p>
          <ArticleImageBlock
            src="https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-a0869140-0c18-4d22-aa39-077dfa0e209b.jpg?alt=media&token=6689a1e1-b5b6-48e2-b636-0a2c58049db4"
            alt="Set your first technical hire up for a strong first 90 days"
            caption="Set your first technical hire up for a strong first 90 days"
            width={1200}
            height={800}
          />

        <QuoteBlock title="Keep moving forward" variant="orange">
          {"A lean process should test technical judgment, ownership, communication, and comfort with ambiguity. Structured interviews and practical work discussions give better early-stage signals than a long, generic hiring loop."}
        </QuoteBlock>

        <MLAITemplateResourceCTA />

      <ArticleReferences
        references={[
          {id: 1, href: "https://mitsloan.mit.edu/ideas-made-to-matter/startup-tactics-how-and-when-to-hire-technical-talent", title: "Startup tactics: How and when to hire technical talent | MIT Sloan", publisher: "mitsloan.mit.edu", description: "Authoritative reference supporting Startup tactics: How and when to hire technical talent | MIT Sloan.", category: "guide"},
          {id: 2, href: "https://www.myhatchpad.com/insight/what-i-learned-making-the-first-few-technical-hires-for-our-seed-startup/", title: "Practical Tips for Early Stage Startup Hiring", publisher: "myhatchpad.com", description: "Authoritative reference supporting Practical Tips for Early Stage Startup Hiring.", category: "guide"},
          {id: 3, href: "https://flyerone.vc/post/7-mistakes-startups-make-when-hiring-first-employees", title: "7 mistakes startups make when hiring first employees", publisher: "flyerone.vc", description: "Authoritative reference supporting 7 mistakes startups make when hiring first employees.", category: "guide"},
          {id: 4, href: "https://www.startupgrind.com/blog/how-to-make-the-perfect-first-hire/", title: "How to Make The Perfect First Hire | Startup Grind", publisher: "startupgrind.com", description: "Authoritative reference supporting How to Make The Perfect First Hire | Startup Grind.", category: "guide"},
          {id: 5, href: "https://www.metaview.ai/resources/blog/how-to-hire-for-a-startup", title: "How to hire for a startup: A founder\u2019s guide to building a high-performing team | Metaview Blog", publisher: "metaview.ai", description: "Authoritative reference supporting How to hire for a startup: A founder\u2019s guide to building a high-performing team | Metaview Blog.", category: "guide"},
          {id: 6, href: "https://stripe.com/resources/more/how-to-hire-the-first-employees-for-your-startup-a-guide-for-founders", title: "How to recruit the first employees for your startup | Stripe", publisher: "stripe.com", description: "Authoritative reference supporting How to recruit the first employees for your startup | Stripe.", category: "guide"},
          {id: 7, href: "https://www.stoneandchalk.com.au/articles/how-to-hire-your-startups-first-senior-leader", title: "How to hire your startup\u2019s first senior leader | Stone & Chalk", publisher: "stoneandchalk.com.au", description: "Authoritative reference supporting How to hire your startup\u2019s first senior leader | Stone & Chalk.", category: "guide"},
          {id: 8, href: "https://www.linkedin.com/posts/larissa-pearce-recruitment_the-first-20-hires-in-a-startup-will-define-activity-7437104070823325696-AN1f", title: "Early Stage Hiring Mistakes: Founders' Hardest Lessons | Larissa Pearce posted on the topic | LinkedIn", publisher: "linkedin.com", description: "Authoritative reference supporting Early Stage Hiring Mistakes: Founders' Hardest Lessons | Larissa Pearce posted on the topic | LinkedIn.", category: "guide"},
          {id: 9, href: "https://posthog.com/founders/first-ops-hire", title: "Making your first startup ops hire \u2013 what founders should look for - PostHog", publisher: "posthog.com", description: "Authoritative reference supporting Making your first startup ops hire \u2013 what founders should look for - PostHog.", category: "guide"},
          {id: 10, href: "https://www.hc-resource.com/copy-of-posts/the-top-5-mistakes-startups-make-when-hiring-their-first-employees", title: "The Top 5 Mistakes Startups Make When Hiring Their First Employees | HC-Resource", publisher: "hc-resource.com", description: "Authoritative reference supporting The Top 5 Mistakes Startups Make When Hiring Their First Employees | HC-Resource.", category: "guide"},
          {id: 11, href: "https://www.cloudkettle.com/blog/new-hire-checklist-for-startups/", title: "The New Hire Checklist for Startups", publisher: "cloudkettle.com", description: "Authoritative reference supporting The New Hire Checklist for Startups.", category: "guide"},
        ]}
        heading="Sources & further reading"
      />

        <ArticleDisclaimer />

        <div className="my-12 not-prose">
          <ArticleCompanyCTA
            title="Need a clearer startup hiring plan?"
            body="Use practical founder resources to tighten your role brief, hiring process, and early priorities before you make a high-stakes technical hire."
            buttonText="Explore startup resources"
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
