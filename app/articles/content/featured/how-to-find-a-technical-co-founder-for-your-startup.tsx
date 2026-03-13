import type { ReactNode } from 'react'
import { Home } from 'lucide-react'
import { RocketLaunchIcon, AcademicCapIcon, UsersIcon } from '@heroicons/react/24/solid'
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

const TOPIC = "How to Find a Technical Co-Founder for Your Startup"
export const CATEGORY = "featured"
export const SLUG = "how-to-find-a-technical-co-founder-for-your-startup"
export const DATE_PUBLISHED = "2026-03-13"
export const DATE_MODIFIED = "2026-03-13"
export const DESCRIPTION = "Struggling to build your startup? Learn how to find a technical co-founder, pitch your vision, and partner with the right tech talent in Australia."
const HERO_IMAGE = ""
const HERO_IMAGE_ALT = "How to Find a Technical Co-Founder for Your Startup"
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
  { id: 1, question: "What is the best way to find a technical cofounder?", answer: "Start with your existing network because trust matters most in a co-founder relationship. Reach out to former coworkers, friends, university peers, and people you have already built with, then expand into founder-matching platforms, builder communities, and local startup events." },
  { id: 2, question: "Do I really need a technical cofounder?", answer: "Not always. If you only need a prototype, landing page, or basic first version, a freelancer, agency, or adviser may be enough for now. A technical co-founder makes more sense when technology is central to the business and the role requires long-term product and engineering leadership." },
  { id: 3, question: "How do I attract a strong technical cofounder if I cannot code?", answer: "Bring more than an idea. Show customer research, market insight, wireframes, waitlists, early revenue signals, or letters of intent. Technical candidates want to see that you can create momentum on the business side and that you respect engineering as a founding function." },
  { id: 4, question: "What should I say when pitching my startup to an engineer?", answer: "Explain the problem, who it affects, what you have validated so far, and why now is a good time to build. Keep the pitch collaborative and avoid dictating tools or solutions too early. Focus on the opportunity and the evidence, not just the concept." },
  { id: 5, question: "How do I know if someone should be a cofounder or just an early hire?", answer: "A co-founder should shape core product and technical decisions, share risk, and help define the company direction. If the role is mainly to execute a scoped build without broad ownership, it may be better framed as a founding engineer or contractor role." },
  { id: 6, question: "Should I split equity equally with a technical cofounder?", answer: "Not by default. Equity should reflect risk, timing, expected contribution, and long-term responsibility. It is usually smarter to test the working relationship first and document vesting before making permanent ownership decisions." },
]

export const summaryHighlights = {
  heading: "Key facts: How to Find a Technical Co-Founder for Your Startup",
  intro: "Struggling to build your startup? Learn how to find a technical co-founder, pitch your vision, and partner with the right tech talent in Australia.",
  items: [
    { label: "Start with role clarity", description: "Define whether you need a true technical co-founder, a founding engineer, or short-term build support. The right search depends on your product complexity, stage, and how much technical ownership the role needs." },
    { label: "Search where trust already exists", description: "Begin with people who already know your work, then expand into founder platforms, online builder communities, and local tech groups. In Australia, AI-focused communities can be especially useful for meeting motivated technical builders." },
    { label: "Lead with evidence, not just ideas", description: "Engineers are more likely to engage when you show customer interviews, wireframes, waitlists, early traction, or clear market insight. A strong pitch shows you are already doing the hard business-side work." },
  ],
}

export const articleMeta = {
  title: "How to Find a Technical Co-Founder for Your Startup",
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
    <article className="bg-transparent">
      <ArticleHeroHeader
        breadcrumbs={[
          { label: 'Home', href: '/', icon: Home },
          { label: 'Articles', href: '/articles' },
          { label: TOPIC, current: true },
        ]}
        title={TOPIC}
        titleHighlight={TOPIC}
        headerBgColor="purple"
        summary={summaryHighlights}
        heroImage={HERO_IMAGE}
        heroImageAlt={HERO_IMAGE_ALT}
      />

      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-10">
        <div className="mb-10">
          <ArticleTocPlaceholder />
        </div>

        <div className="prose prose-lg prose-indigo max-w-none text-gray-700 prose-headings:text-gray-900 hover:prose-a:text-[--brand-ink]">
        <p><strong>{TOPIC}</strong> — {"Finding a technical co-founder is hard because you are not just hiring a skill set. You are asking someone to bet their time, reputation, and often income on an uncertain idea. Plenty of founders learn this the slow way. An idea can sound exciting in a pitch, but building a real product takes months of engineering work, product decisions, customer feedback, and repeated trade-offs. Good technical people know that execution is the expensive part, so they are careful about what they join."}</p>
        <ArticleImageBlock
          src={HERO_IMAGE}
          alt={HERO_IMAGE_ALT}
          caption="Struggling to build your startup? Learn how to find a technical co-founder, pitch your vision, and partner with the right tech talent in Australia."
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
          {"Define whether you need a true technical co-founder, a founding engineer, or short-term build support. The right search depends on your product complexity, stage, and how much technical ownership the role needs."}
        </QuoteBlock>
      <section className="mx-auto max-w-4xl mt-10" id="define-technical-need">
        <h2 className="text-3xl font-semibold">{"Define What You Actually Need Before Searching"}</h2>
        <p className="text-base leading-7">{"Many non-technical founders say they need a technical cofounder when they really mean they need someone to build version one. A true technical cofounder should help shape the product, challenge weak assumptions, make trade-offs on speed versus quality, and think about how the technology supports the business. If you only need a landing page, basic mobile app, or prototype to test demand, a freelance developer, small studio, or technical adviser may be enough for the next stage."}</p>
        <p className="text-base leading-7">{"A strategic technical partner thinks about architecture, hiring, security, product scope, data choices, and what can break as you grow. When you start your search with a fuzzy job description, you attract the wrong people. Before you talk to candidates, write down what must be built in the next 6 to 12 months, what technical decisions matter most, and whether this person needs to lead technology long term or simply help you reach proof of concept."}</p>
        <h3>{"Match the role to the product and stage"}</h3>
        <p className="text-base leading-7">{"Start with the product itself. A marketplace, content site, or workflow tool built on well-known frameworks is very different from a startup that depends on computer vision, custom model training, real-time infrastructure, or regulated data handling. If the core value of the company comes from hard technical innovation, you likely need a cofounder who can own deep technical decisions from day one. If the product is mostly a smart business model with standard software needs, you may not need a full CTO-level partner yet."}</p>
        <p className="text-base leading-7">{"Then look at compensation honestly. A founding engineer who joins to build early product may expect a mix of salary and meaningful equity, especially if they are not a full business cofounder. A strategic CTO-style cofounder usually takes more ownership and more risk, so equity expectations are often higher and salary may be lower at the start. If you cannot explain why this role deserves cofounder status, you may be hiring too early or defining the role too loosely."}</p>
      </section>
      <section className="mx-auto max-w-4xl mt-10" id="where-to-look">
        <h2 className="text-3xl font-semibold">{"Top Channels to Find Technical Co-Founders"}</h2>
        <p className="text-base leading-7">{"Friends, family, former coworkers, university peers, and people you have already built projects with are often the best starting points when you want to find a technical cofounder. These people already know how you think, how you work, and whether you follow through. That matters because a cofounder relationship is not just a hiring decision. It is a long-term partnership built on trust, speed, and honest communication."}</p>
        <p className="text-base leading-7">{"When you reach out to your existing network, be specific. Do not send a vague note saying you are looking for a technical person. Explain the problem you want to solve, who it helps, what progress you have already made, and why now is the right time to build. Ask for direct introductions to engineers, product builders, or technical operators who may want to start something."}</p>
        <h3>{"Use founder matching platforms and builder communities"}</h3>
        <p className="text-base leading-7">{"If your immediate network does not produce strong leads, move to online communities built for startup conversations. Platforms like CoFoundersLab can help you meet people who are actively exploring new ventures. Indie Hackers is also useful because you can learn how people think, what they are building, and whether they have the mindset to test ideas in the real world."}</p>
        <p className="text-base leading-7">{"Create a short profile or post that explains your idea, your target customer, what you have validated so far, and what kind of technical partner you need."}</p>
        <h3>{"Show up in local communities where technical people already gather"}</h3>
        <p className="text-base leading-7">{"Local tech communities are one of the most underrated ways to find a technical cofounder. Meetups, hack nights, startup events, accelerator gatherings, and industry communities give you the chance to meet builders in a more natural setting. Instead of trying to persuade someone in a single message, you can build credibility over multiple conversations. You also get to see how people think, what they care about, and whether they are excited by the kind of problem you want to solve."}</p>
        <p className="text-base leading-7">{"For AI founders in Australia, this matters even more. That makes it easier to meet technical people who are not just capable, but genuinely motivated by the space. If you want to find a technical cofounder, do not only search online. Join the rooms, events, and communities where strong technical builders are already investing their time."}</p>
      </section>

        <ArticleResourceCTA
          eyebrow="Free guide"
          title={"Get the find technical cofounder checklist"}
          description="Use this article as a working guide: shortlist candidates, validate traction, and structure your next conversations."
          buttonLabel="Download now"
          buttonHref="/articles"
          accent="purple"
        />

        <ArticleStepList
          title="Practical next steps"
          steps={[
            "Define What You Actually Need Before Searching",
            "Top Channels to Find Technical Co-Founders",
            "How to Pitch Your Idea to an Engineer",
            "Vetting Your Co-Founder and Building Alignment",
            "Take the First Step Toward Finding Your Tech Partner",
          ]}
          accent="indigo"
        />
      <section className="mx-auto max-w-4xl mt-10" id="pitching-engineers">
        <h2 className="text-3xl font-semibold">{"How to Pitch Your Idea to an Engineer"}</h2>
        <p className="text-base leading-7">{"Many technical people hear the same weak pitch again and again: \u201cI have the idea, you build it.\u201d That framing usually fails because it treats engineering like outsourced labour instead of a core founding role. If you want a strong technical cofounder, show that you understand what they are risking."}</p>
        <p className="text-base leading-7">{"It is proof that you have done the hard work on the business side. These signals tell an engineer that you are not just dreaming about a startup. You are already testing demand."}</p>
        <p className="text-base leading-7">{"Non-technical founders often lose good candidates by insisting on specific tools, features, or timelines before the product is validated. Strong technical cofounders want ownership, not tickets. If your pitch sounds collaborative, evidence-based, and respectful of their expertise, you are far more likely to attract someone who wants to build with you rather than just code for you."}</p>
        <p className="text-base leading-7">{"If you want a strong technical cofounder, show that you understand what they are risking. Many technical people hear the same weak pitch again and again: \u201cI have the idea, you build it.\u201d That framing usually fails because it treats engineering like outsourced labour instead of a core founding role. These signals tell an engineer that you are not just dreaming about a startup. You are already testing demand. It is proof that you have done the hard work on the business side."}</p>
      </section>
      <section className="mx-auto max-w-4xl mt-10" id="vetting-alignment">
        <h2 className="text-3xl font-semibold">{"Vetting Your Co-Founder and Building Alignment"}</h2>
        <p className="text-base leading-7">{"A strong technical co-founder fit is proven in the work, not in a few good chats. Before you lock in titles, equity, or a company structure, run a small trial project together."}</p>
        <p className="text-base leading-7">{"Use this test period to look beyond technical skill. Pay attention to how you make decisions, how often you communicate, and what happens when you disagree. A good co-founder relationship needs mutual respect across different strengths. The non-technical founder should trust technical judgment on architecture and delivery. The technical founder should respect customer insight, sales effort, and market learning."}</p>
        <p className="text-base leading-7">{"Before you lock in titles, equity, or a company structure, run a small trial project together. A strong technical co-founder fit is proven in the work, not in a few good chats. Pay attention to how you make decisions, how often you communicate, and what happens when you disagree."}</p>
        <h3>{"What to test during a trial project"}</h3>
        <p className="text-base leading-7">{"Reliability matters as much as brilliance. Many founder matches fail because one person is consistently late, vague, or defensive."}</p>
        <p className="text-base leading-7">{"You should also test pace and standards. Some founders move fast and accept rough edges."}</p>
        <h3>{"Agree on expectations before you formalise anything"}</h3>
        <p className="text-base leading-7">{"Be honest about side jobs, family constraints, and whether this is a serious startup attempt or still an experiment."}</p>
        <p className="text-base leading-7">{"It may feel formal, but good documentation protects both people and gives the partnership a stronger foundation."}</p>
      </section>
      <section className="mx-auto max-w-4xl mt-10" id="conclusion">
        <h2 className="text-3xl font-semibold">{"Take the First Step Toward Finding Your Tech Partner"}</h2>
        <p className="text-base leading-7">{"Finding a technical co-founder is rarely a search problem alone. It is usually a partnership problem. Good technical founders are looking for more than an interesting idea. They want to know whether you can define a real problem, speak to customers, make decisions, and keep moving when things get messy. It is evidence. Show that you understand the market, have tested your assumptions, and are willing to do the non-technical work that helps a product survive. Trust builds when people can see steady progress and clear thinking."}</p>
        <p className="text-base leading-7">{"So do not pause your startup until the perfect partner appears. Start now. Each step makes you a stronger business partner and gives future collaborators something real to join. If you want to meet people in the right setting, join MLAI and become part of the Australian AI community. It is a practical place to connect, learn, and collaborate with people who care about building useful AI products. One conversation, event, or project could be the start of the partnership you need."}</p>
      </section>

        <QuoteBlock title="Keep moving forward" variant="orange">
          {"Engineers are more likely to engage when you show customer interviews, wireframes, waitlists, early traction, or clear market insight. A strong pitch shows you are already doing the hard business-side work."}
        </QuoteBlock>

        <MLAITemplateResourceCTA />

      <ArticleReferences
        references={[
          {id: 1, href: "https://www.masslight.com/posts/checklist-finding-technical-cofounder", title: "Checklist for Finding a Technical Co-Founder", publisher: "masslight.com", description: "Authoritative reference supporting Checklist for Finding a Technical Co-Founder.", category: "guide"},
          {id: 2, href: "https://www.linkedin.com/posts/timhe2000_why-you-cant-find-a-technical-cofounder-activity-7328446023708659713-dePB", title: "Why you can't find a tech cofounder: 13 reasons | Tim He posted on the topic | LinkedIn", publisher: "linkedin.com", description: "Authoritative reference supporting Why you can't find a tech cofounder: 13 reasons | Tim He posted on the topic | LinkedIn.", category: "guide"},
          {id: 3, href: "https://www.lithobyte.co/7-mistakes-people-make-trying-to-find-technical-co-founders/", title: "7 Mistakes People Make Trying to Find Technical Co-Founders \u2013 LithoByte", publisher: "lithobyte.co", description: "Authoritative reference supporting 7 Mistakes People Make Trying to Find Technical Co-Founders \u2013 LithoByte.", category: "guide"},
          {id: 4, href: "https://www.indiehackers.com/post/how-do-you-find-a-technical-co-founder-93b39e501b", title: "How do you find a 'Technical Co-Founder'? - Indie Hackers", publisher: "indiehackers.com", description: "Authoritative reference supporting How do you find a 'Technical Co-Founder'? - Indie Hackers.", category: "guide"},
          {id: 5, href: "https://www.groovehq.com/blog/technical-co-founder", title: "What I Did When I Couldn\u2019t Find a Technical Co-Founder", publisher: "groovehq.com", description: "Authoritative reference supporting What I Did When I Couldn\u2019t Find a Technical Co-Founder.", category: "guide"},
          {id: 6, href: "https://cofounderslab.com/", title: "The Startup CommunityStart. Grow. Fund.", publisher: "cofounderslab.com", description: "Authoritative reference supporting The Startup CommunityStart. Grow. Fund..", category: "guide"},
          {id: 7, href: "https://www.linkedin.com/posts/josephpcaprara_how-do-i-find-a-technical-cofounder-for-my-activity-7371594520813002752-OePp", title: "Finding a technical cofounder: 2 paths and how to meet them | Joe Caprara posted on the topic | LinkedIn", publisher: "linkedin.com", description: "Authoritative reference supporting Finding a technical cofounder: 2 paths and how to meet them | Joe Caprara posted on the topic | LinkedIn.", category: "guide"},
          {id: 8, href: "https://www.linkedin.com/posts/troymunson_heres-how-you-find-a-technical-co-founder-activity-7248342422693306368-BIee", title: "Here's how you find a technical co-founder for your idea: \n\n\nFriends & Family \n\u2192 This one is obvious. Shoot anyone/everyone you can a text/call. \n\nCoworkers \n\u2192 Reach out to the engineers at your\u2026 | Troy Munson", publisher: "linkedin.com", description: "Authoritative reference supporting Here's how you find a technical co-founder for your idea: \n\n\nFriends & Family \n\u2192 This one is obvious. Shoot anyone/everyone you can a text/call. \n\nCoworkers \n\u2192 Reach out to the engineers at your\u2026 | Troy Munson.", category: "guide"},
          {id: 9, href: "https://www.ycombinator.com/cofounder-matching", title: "Y Combinator Co-Founder Matching Platform - find a co-founder through YC | Y Combinator", publisher: "ycombinator.com", description: "Authoritative reference supporting Y Combinator Co-Founder Matching Platform - find a co-founder through YC | Y Combinator.", category: "guide"},
        ]}
        heading="Sources & further reading"
      />

        <ArticleDisclaimer />

        <div className="my-12 not-prose">
          <ArticleCompanyCTA
            title="Meet technical builders in the right environment"
            body="If you want to find a technical cofounder, do not rely only on cold outreach. Join MLAI to connect with Australia\u2019s AI community, learn from active builders, and build real relationships that can lead to stronger startup partnerships."
            buttonText="Join MLAI"
            buttonHref="/australian-ai-ecosystem"
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
