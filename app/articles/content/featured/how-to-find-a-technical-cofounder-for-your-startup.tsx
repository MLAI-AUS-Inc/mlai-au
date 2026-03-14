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

const TOPIC = "How to Find a Technical Cofounder for Your Startup"
export const CATEGORY = "featured"
export const SLUG = "how-to-find-a-technical-cofounder-for-your-startup"
export const DATE_PUBLISHED = "2026-03-14"
export const DATE_MODIFIED = "2026-03-14"
export const DESCRIPTION = "Looking for a technical cofounder? Learn where to find tech talent, how to pitch your startup vision, and when to consider alternative product studio models."
const HERO_IMAGE = ""
const HERO_IMAGE_ALT = "How to Find a Technical Cofounder for Your Startup"
export const FEATURED_FOCUS = "product"

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
  { id: 1, question: "What makes a good technical cofounder?", answer: "A good technical cofounder combines solid product-building ability with business judgement. They should be able to ship, explain trade-offs clearly, handle pressure, and work through disagreement without becoming defensive." },
  { id: 2, question: "Where should I look for a technical cofounder first?", answer: "Start with people you already trust, such as former colleagues, university peers, and warm introductions. After that, use founder communities, YC Co-Founder Matching, Indie Hackers, GitHub, startup Slack groups, meetups, and hackathons." },
  { id: 3, question: "How do I attract strong technical talent if I cannot build the product myself?", answer: "Show evidence that the problem is real and that you are already reducing business risk. Useful signals include customer interviews, repeated pain points, waitlist growth, pilot conversations, letters of intent, pre-sales, and clear ownership of sales, marketing, and operations." },
  { id: 4, question: "Should I give equity to someone just to get the MVP built?", answer: "Usually no. A cofounder relationship is a long-term company decision, not a quick outsourcing fix. If the fit is weak, you may create bigger problems around ownership, accountability, and direction later." },
  { id: 5, question: "What can I do if I cannot find the right technical cofounder yet?", answer: "Keep validating the market while using alternatives such as no-code tools, manual workflows, lightweight app builders, or an agency or product studio. That lets you learn, gain traction, and become more attractive to future technical partners." },
  { id: 6, question: "When does it make sense to work with a product studio like MLAI?", answer: "It can make sense when you need technical judgement and delivery speed but are not ready to make a permanent cofounder decision. This is especially relevant when the product has higher technical complexity or includes data or AI." },
]

export const summaryHighlights = {
  heading: "Key facts: How to Find a Technical Cofounder for Your Startup",
  intro: "Looking for a technical cofounder? Learn where to find tech talent, how to pitch your startup vision, and when to consider alternative product studio models.",
  items: [
    { label: "Know the role", description: "A technical cofounder is more than a coder. You need someone who can make product trade-offs, handle uncertainty, and help shape the company." },
    { label: "Prioritise fit over pedigree", description: "Early-stage startups usually benefit more from broad full-stack ability, clear communication, and shared working style than from narrow specialist expertise." },
    { label: "Start with trusted networks", description: "Former colleagues, friends, university contacts, and warm introductions are often the best path because trust and working history matter in founder relationships." },
  ],
}

export const articleMeta = {
  title: "How to Find a Technical Cofounder for Your Startup",
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
        <p><strong>{TOPIC}</strong> — {"Many founders start with a clear problem, a strong market insight, and real customer pain. What they do not have is the technical ability to design, build, and ship a product themselves. You may know exactly what should exist, but without the right engineering partner, progress turns into wireframes, notes, and half-finished plans. The result is often frustration, delays, and a growing fear that someone else will launch first."}</p>
        <p>{"The hard part is that a technical co-founder is not just a contractor who writes code. This person becomes a long-term decision-maker who shapes product direction, technical trade-offs, hiring standards, delivery speed, and company culture. In that sense, the search is closer to choosing a life partner than filling a role. You need alignment on vision, risk tolerance, pace, communication style, and what each of you is willing to carry when things get messy. In this guide, we will look at how to define the right technical profile, how to make your opportunity compelling, how to assess fit beyond raw coding skill, and when alternatives to a co-founder may be the smarter move."}</p>
        <ArticleImageBlock
          src={HERO_IMAGE}
          alt={HERO_IMAGE_ALT}
          caption="Looking for a technical cofounder? Learn where to find tech talent, how to pitch your startup vision, and when to consider alternative product studio models."
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
          {"A technical cofounder is more than a coder. You need someone who can make product trade-offs, handle uncertainty, and help shape the company."}
        </QuoteBlock>
          <h2>{"What to Look for in a Technical Partner"}</h2>
          <p>{"A strong technical cofounder is not just a senior developer who can ship code. In an early-stage company, they also need to think like a product builder and a business owner. That means they can translate a market problem into a practical roadmap, make trade-offs under pressure, and decide what should be built now versus later."}</p>
          <p>{"In the first stage, broad capability usually matters more than narrow specialisation. A technical cofounder does not need to be the world\u2019s best machine learning engineer, mobile engineer, and DevOps lead all at once, but they do need enough full-stack range to get a product live, gather feedback, and fix problems quickly. Early startups often need someone who can move between product architecture, backend logic, front-end experience, cloud setup, analytics, and security basics without creating unnecessary complexity."}</p>
          <p>{"The interpersonal side is just as important as the technical side. You are not only choosing someone to build with; you are choosing someone to make hard decisions with when money is tight, deadlines slip, or the product needs to change direction. Look for clear communication, honest disagreement, and the ability to explain technical choices in plain English. A strong technical partner should challenge weak ideas without becoming defensive or dismissive."}</p>
          <p>{"Run a short project together if possible, because working style is easier to judge in practice than in interviews. The best technical cofounder fit is usually someone whose goals, pace, and standards match yours, not simply the most impressive engineer on paper. Skills can be hired around over time."}</p>
          <h2>{"Where to Find Your Technical Co-Founder"}</h2>
          <p>{"The best place to start is usually much closer than founders expect. Your personal network, past co-workers, university contacts, and people you have already built trust with are often the strongest candidates. A technical co-founder is not just a developer who can write code. This person will help make product decisions, handle pressure, and stay committed when things are messy. That kind of partnership is easier to assess when you already know how they think, communicate, and follow through."}</p>
          <p>{"Former colleagues are especially valuable because you have seen them operate in real conditions. Even if they are not the right fit themselves, they can often introduce you to engineers in their circle who are looking for a bigger role."}</p>
          <p>{"Online platforms such as YC Co-Founder Matching, Indie Hackers, GitHub, startup Slack groups, and founder communities can help you meet people outside your immediate circle. Offline, hackathons, product meetups, startup events, and technical conferences are useful because you can see how people explain problems and collaborate in real time. The goal is to spend time in places where good technical people already show curiosity, initiative, and interest in building."}</p>
          <p>{"Be careful with generic cold-pitching. Sending broad messages like \u201cI have a great idea, want to join?\u201d usually attracts the wrong responses or no response at all. Strong technical candidates often avoid vague opportunities because they have many options. A better approach is to build genuine relationships in technical communities first. Over time, the right partnership is more likely to emerge from mutual respect than from a one-off pitch."}</p>
          <h3>{"Online channels that can work"}</h3>
          <p>{"Explain what market you are targeting, what validation you have, what skills you bring, and why now is the right time to build. Technical candidates want to know whether you can contribute more than an idea."}</p>
          <p>{"Look for signals of long-term fit. On founder matching platforms and community forums, pay attention to how someone talks about customers, trade-offs, and execution."}</p>
          <h3>{"Offline spaces with better signal"}</h3>
          <p>{"Hackathons, technical meetups, startup weekends, and niche industry events let you see how someone approaches ambiguity, problem solving, and teamwork. You are not just asking whether they are smart enough."}</p>
          <p>{"Go to events where the topic overlaps with the problem you want to solve, not just general startup networking nights. If you are building in AI, data, health, fintech, or logistics, targeted communities tend to produce better conversations than broad founder mixers. Follow up quickly after a good interaction. Momentum matters when testing whether there is real founder chemistry."}</p>

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
            "What to Look for in a Technical Partner",
            "Where to Find Your Technical Co-Founder",
            "Selling Your Vision: How to Pitch Top Tech Talent",
            "Alternatives When You Can't Find the Right Fit",
            "Take Action on Your Startup Idea",
          ]}
          accent="indigo"
        />
          <h2>{"Selling Your Vision: How to Pitch Top Tech Talent"}</h2>
          <p>{"Strong technical people do not join early startups because a founder says, \"I have an idea.\" They hear ideas all the time. What gets attention is proof that the problem is real and that someone is already moving the business forward. If you want a technical cofounder to take you seriously, show validation. Bring notes from customer interviews, examples of repeated pain points, early waitlist numbers, signed letters of intent, pilot discussions, or even small pre-sales. You are inviting them to help build a solution to a problem that real people have already confirmed."}</p>
          <p>{"You should also make your own contribution concrete. A good technical cofounder wants to know what you will own while they focus on building. Show your domain expertise, explain why you understand the market better than a random founder, and present simple wireframes or workflow sketches that clarify the product direction. Be honest that the wireframes are not the product, but use them to prove that you have thought through the customer journey. Then explain how you will handle the non-technical load: customer discovery, sales calls, partnerships, hiring, fundraising, operations, and marketing. The best pitch is not, \"Please build this for me.\" It is, \"I have reduced the business risk, I know the customer, and I will carry the commercial side so we can move faster together.\""}</p>
          <h2>{"Alternatives When You Can't Find the Right Fit"}</h2>
          <p>{"If you cannot find the right technical cofounder, the worst move is often to force the relationship. A cofounder is not just an early hire with equity. If you bring in someone only because you need code written quickly, you can lock yourself into years of tension around ownership, direction, and accountability. It is usually better to move a little slower than to give away a large share of the business to someone who is not a strong long-term fit."}</p>
          <p>{"For many startups, a V1 does not need perfect architecture or custom engineering. Landing pages, manual back-office processes, Airtable-style databases, workflow automation, and lightweight app builders can get you to customer interviews, pilots, and even early revenue. That traction makes future technical hiring easier because you are no longer selling only a vision. You are showing evidence."}</p>
          <p>{"Another option is to work with an agency or product studio that can act like a fractional CTO while also building the MVP. This can be a strong path when the product has real technical complexity, when data or AI is part of the offer, or when you need speed without making a permanent cofounder decision. For founders in Australia, a studio like MLAI can be useful when you need both technical judgement and delivery capacity, but you are not yet ready to commit to a full cofounder relationship. The key is to treat the engagement as a focused step toward traction, learning, and a stronger eventual team."}</p>
          <h2>{"Take Action on Your Startup Idea"}</h2>
          <p>{"A technical cofounder can be a major advantage, but not having one yet is not a reason to stop. Good founder partnerships usually take longer than people expect because they depend on trust, aligned incentives, and evidence that both people can handle pressure well. While you keep meeting potential partners, you can still make real progress. A clearer market signal will help you make better product decisions now, and it will also make your startup more compelling to any future technical partner."}</p>
          <p>{"The best next step is to focus on what you can control today. Build an audience around the problem, test your message, collect structured feedback, and aim for practical proof like pilot conversations, pre-sales, paid discovery, or a growing waitlist. Write down your product requirements in plain English so your vision becomes easier to build and easier to share. If you need immediate technical execution, especially for AI products, MLAI can help you scope the solution, validate the idea, and move toward a usable product without forcing an early cofounder decision."}</p>

        <QuoteBlock title="Keep moving forward" variant="orange">
          {"Former colleagues, friends, university contacts, and warm introductions are often the best path because trust and working history matter in founder relationships."}
        </QuoteBlock>

        <MLAITemplateResourceCTA />

      <ArticleReferences
        references={[
          {id: 1, href: "https://articles.sequoiacap.com/five-tips-for-technical-co-founders", title: "Five Tips for Technical Co-Founders", publisher: "articles.sequoiacap.com", description: "Authoritative reference supporting Five Tips for Technical Co-Founders.", category: "guide"},
          {id: 2, href: "https://www.linkedin.com/pulse/how-i-vet-technical-co-founder-matt-watson-msvwc", title: "How I Vet a Technical Co-Founder", publisher: "linkedin.com", description: "Authoritative reference supporting How I Vet a Technical Co-Founder.", category: "guide"},
          {id: 3, href: "https://www.dave-bailey.com/blog/technical-co-founder", title: "\n      \n        How to Recruit a Technical Co-founder for Your Startup\n      \n    ", publisher: "dave-bailey.com", description: "Authoritative reference supporting \n      \n        How to Recruit a Technical Co-founder for Your Startup\n      \n    .", category: "guide"},
          {id: 4, href: "https://plane.com/blog/what-to-look-for-in-a-technical-co-founder", title: "What to look for in a technical co-founder - Plane | Global payroll, HR & compliance", publisher: "plane.com", description: "Authoritative reference supporting What to look for in a technical co-founder - Plane | Global payroll, HR & compliance.", category: "guide"},
          {id: 5, href: "https://foundingjourney.com/how-to-find-a-technical-cofounder", title: "How to Find a Technical Co-Founder | Founding Journey", publisher: "foundingjourney.com", description: "Authoritative reference supporting How to Find a Technical Co-Founder | Founding Journey.", category: "guide"},
          {id: 6, href: "https://www.smartcompany.com.au/startupsmart/how-to-recruit-a-technical-co-founder/", title: "How to recruit a technical co-founder, according to Alan Jones - SmartCompany", publisher: "smartcompany.com.au", description: "Authoritative reference supporting How to recruit a technical co-founder, according to Alan Jones - SmartCompany.", category: "guide"},
          {id: 7, href: "https://news.ycombinator.com/item?id=38477057", title: "You do need a technical co-founder [video] | Hacker News", publisher: "news.ycombinator.com", description: "Authoritative reference supporting You do need a technical co-founder [video] | Hacker News.", category: "guide"},
          {id: 8, href: "https://www.masslight.com/posts/checklist-finding-technical-cofounder", title: "Checklist for Finding a Technical Co-Founder", publisher: "masslight.com", description: "Authoritative reference supporting Checklist for Finding a Technical Co-Founder.", category: "guide"},
          {id: 9, href: "https://www.groovehq.com/blog/technical-co-founder", title: "What I Did When I Couldn\u2019t Find a Technical Co-Founder", publisher: "groovehq.com", description: "Authoritative reference supporting What I Did When I Couldn\u2019t Find a Technical Co-Founder.", category: "guide"},
          {id: 10, href: "https://www.lithobyte.co/7-mistakes-people-make-trying-to-find-technical-co-founders/", title: "7 Mistakes People Make Trying to Find Technical Co-Founders \u2013 LithoByte", publisher: "lithobyte.co", description: "Authoritative reference supporting 7 Mistakes People Make Trying to Find Technical Co-Founders \u2013 LithoByte.", category: "guide"},
          {id: 11, href: "https://www.onstartups.com/5-common-mistakes-by-first-time-startup-founders-and-how-to-avoid-them", title: "5 common mistakes by first-time startup founders and how to avoid them", publisher: "onstartups.com", description: "Authoritative reference supporting 5 common mistakes by first-time startup founders and how to avoid them.", category: "guide"},
          {id: 12, href: "https://www.zeepalm.com/blog/checklist-to-hire-a-badass-tech-cofounder-for-your-early-stage-startup", title: "Zee Palm \u2014 We Keep Production Apps Alive", publisher: "zeepalm.com", description: "Authoritative reference supporting Zee Palm \u2014 We Keep Production Apps Alive.", category: "guide"},
        ]}
        heading="Sources & further reading"
      />

        <ArticleDisclaimer />

        <div className="my-12 not-prose">
          <ArticleCompanyCTA
            title="Need technical execution without rushing a cofounder decision?"
            body="If you have customer demand but no technical partner yet, MLAI can help you scope the product, validate the idea, and build toward a usable MVP with senior technical guidance."
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
