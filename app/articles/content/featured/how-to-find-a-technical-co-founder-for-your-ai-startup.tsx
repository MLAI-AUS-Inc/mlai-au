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

const TOPIC = "How to Find a Technical Co-Founder for Your AI Startup"
export const CATEGORY = "featured"
export const SLUG = "how-to-find-a-technical-co-founder-for-your-ai-startup"
export const DATE_PUBLISHED = "2026-03-13"
export const DATE_MODIFIED = "2026-03-13"
export const DESCRIPTION = "Struggling to build your startup? Learn how to find a technical co-founder, what developers actually look for, and where to network in the AI community."
const HERO_IMAGE = ""
const HERO_IMAGE_ALT = "How to Find a Technical Co-Founder for Your AI Startup"
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
  { id: 1, question: "How do I find a technical cofounder if I cannot code?", answer: "Start by making yourself valuable in other ways. Validate the problem with customer interviews, prepare simple wireframes, and show how you can reach early users. Then begin with your warm network before expanding into founder platforms, meetups, hackathons, and AI communities." },
  { id: 2, question: "What do technical co-founders usually want to see before joining?", answer: "They usually want signs that the problem is real and that the business side is in capable hands. That includes domain expertise, proof of customer demand, a clear target user, and some thought about distribution or early revenue." },
  { id: 3, question: "Should I use founder matching platforms to find a technical cofounder?", answer: "Yes, but they work best when paired with a strong profile and a specific message. Instead of posting that you need a builder, explain the customer problem, what has already been validated, and what kind of technical partner you want." },
  { id: 4, question: "What if I cannot find a technical co-founder right away?", answer: "Do not wait in place. Build a narrow MVP with no-code or low-code tools, or hire a freelancer or agency for an early version. Traction and learning can make you more attractive to a future technical partner." },
  { id: 5, question: "Is it better to search online or in person?", answer: "Both help, but in-person communities often create stronger trust. Online spaces widen your reach, while meetups, startup events, and AI groups let people get to know how you think, communicate, and follow through." },
]

export const summaryHighlights = {
  heading: "Key facts: How to Find a Technical Co-Founder for Your AI Startup",
  intro: "Struggling to build your startup? Learn how to find a technical co-founder, what developers actually look for, and where to network in the AI community.",
  items: [
    { label: "Lead with proof, not just an idea", description: "Technical co-founders hear plenty of pitches. What gets attention is customer interviews, clear problem insight, early validation, and a realistic route to first users or revenue." },
    { label: "Show why you are worth partnering with", description: "Strong non-technical founders bring domain expertise, buyer access, and commercial ability. The goal is to look like a true business partner, not someone outsourcing product work for equity." },
    { label: "Start with trusted relationships", description: "Your warm network is often the fastest way to find credible leads. Friends, former colleagues, classmates, and past collaborators can offer better-fit introductions than cold outreach alone." },
  ],
}

export const articleMeta = {
  title: "How to Find a Technical Co-Founder for Your AI Startup",
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
        <p><strong>{TOPIC}</strong> — {"A lot of founders hit the same wall early. But they cannot build the product themselves. You are facing a normal startup problem: turning strong domain insight into something a technical partner wants to help build."}</p>
        <ArticleImageBlock
          src={HERO_IMAGE}
          alt={HERO_IMAGE_ALT}
          caption="Struggling to build your startup? Learn how to find a technical co-founder, what developers actually look for, and where to network in the AI community."
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
          {"Technical co-founders hear plenty of pitches. What gets attention is customer interviews, clear problem insight, early validation, and a realistic route to first users or revenue."}
        </QuoteBlock>
      <section className="mx-auto max-w-4xl mt-10" id="sec_prep">
        <h2 className="text-3xl font-semibold">{"What Technical Co-Founders Actually Want"}</h2>
        <p className="text-base leading-7">{"Many non-technical founders start with the wrong pitch. They focus on the idea and the features they want built. Most strong technical co-founders do not need more ideas. They want to know whether this is a real problem, whether customers care, and whether the business side is in capable hands."}</p>
        <p className="text-base leading-7">{"A technical partner wants confidence that they are joining a team, not becoming a contractor with equity."}</p>
        <p className="text-base leading-7">{"Execution matters more than inspiration. If you can show that people have the problem today, that you have already spoken to likely users, and that you know how the product could reach its first customers, you become far more attractive as a partner. Good technical co-founders often pass on vague excitement, but they pay attention when a founder can clearly explain the customer, the pain point, and the path to early revenue or meaningful traction."}</p>
        <h3>{"What makes you attractive as a partner"}</h3>
        <p className="text-base leading-7">{"The strongest signal is not \"I have a great app idea.\" It is \"I understand this market better than most people, and I can open doors.\" If you have worked in the industry, built a network in the niche, or already have conversations with potential buyers, say that clearly. Domain expertise helps a technical co-founder trust that the product direction will come from real insight instead of guesswork."}</p>
        <p className="text-base leading-7">{"Commercial ability also matters. A technical co-founder is often taking on product and engineering risk, so they want the other founder to own demand generation. If you can show how the first 10 or 20 users might realistically arrive, you look much more like a founder and much less like someone outsourcing the hard part."}</p>
        <h3>{"What to prepare before the first serious conversation"}</h3>
        <p className="text-base leading-7">{"Before you ask someone to join, do basic validation work. Even 10 to 20 thoughtful interviews can make your pitch far stronger because they show effort, pattern recognition, and real market contact."}</p>
        <p className="text-base leading-7">{"You should also prepare lightweight artifacts that make the opportunity easier to assess. Wireframes or simple mockups help explain the user journey without pretending the product already exists. That is often the difference between an interesting chat and a serious follow-up."}</p>
      </section>
      <section className="mx-auto max-w-4xl mt-10" id="sec_network">
        <h2 className="text-3xl font-semibold">{"Start With Your Warm Network"}</h2>
        <p className="text-base leading-7">{"Before you post on founder matching sites or message strangers, start with people who already know you. A co-founder relationship is built on trust, speed, and honesty, so your warm network gives you a real advantage. Make a simple list of friends, family, ex-colleagues, former classmates, and people you have built things with before. Then reach out directly. Do not send a vague note saying you are looking for a technical cofounder. Say what problem you are working on, why now matters, what stage you are at, and what kind of builder you want to meet. People are much more likely to respond when they can picture the opportunity and the role."}</p>
        <p className="text-base leading-7">{"Your best leads are often engineers who have already seen how you think and work. That could be someone from a current job, a past startup, a university project, or a community group. Some may not want to join, but they might know a strong developer who is feeling stuck, wants a side project, or is actively looking for something more meaningful to build. Ask for warm introductions instead of generic advice. A useful question is: \"Who is the best technical person you know that might be open to an early-stage idea like this?\" Treat every intro seriously. Share a short brief, set up a real conversation, and focus on fit, motivation, and working style, not just coding ability."}</p>
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
            "What Technical Co-Founders Actually Want",
            "Start With Your Warm Network",
            "Leverage AI and Tech Communities",
            "Plan B: What If You Can't Find Someone?",
            "Your Next Steps to Finding a Tech Partner",
          ]}
          accent="indigo"
        />
      <section className="mx-auto max-w-4xl mt-10" id="sec_communities">
        <h2 className="text-3xl font-semibold">{"Leverage AI and Tech Communities"}</h2>
        <p className="text-base leading-7">{"A strong place to find a technical cofounder is inside communities where builders already spend time. General founder matching sites can help, but they work best when you show up with a clear problem, a realistic plan, and evidence that you are serious. Create a simple profile that explains what you are building, who it helps, what progress you have made, and what kind of technical partner you need. Communities like CoFoundersLab can widen your reach, while founder forums such as Indie Hackers can help you test your pitch in public and start conversations with people who like early-stage projects."}</p>
        <p className="text-base leading-7">{"Do not stop at online profiles. The best matches often happen after repeated contact in places where technical people learn, build, and meet peers. Go to local meetups, hackathons, startup events, and AI gatherings. In Australia, niche communities such as MLAI can be especially useful because they attract people who are genuinely interested in artificial intelligence, collaboration, and practical projects."}</p>
        <h3>{"Use online communities to start targeted conversations"}</h3>
        <p className="text-base leading-7">{"Instead of posting 'looking for a technical cofounder,' write a short note about the customer problem, your insight, the market, and what has already been validated."}</p>
        <p className="text-base leading-7">{"Focus on places where builders discuss real work, not just ideas. Founder matching platforms, startup communities, and technical discussion spaces let you spot people who ship projects, share thoughtful feedback, and care about your domain. Reach out to a small number of relevant people with a specific message rather than sending the same pitch to everyone."}</p>
        <h3>{"Show up in person where developers actually gather"}</h3>
        <p className="text-base leading-7">{"For AI founders, specialised groups matter. Even if you do not meet your cofounder on day one, these rooms can lead to warm introductions, collaborators for a small pilot, or the first technical advisor who later becomes a deeper partner."}</p>
      </section>
      <section className="mx-auto max-w-4xl mt-10" id="sec_plan_b">
        <h2 className="text-3xl font-semibold">{"Plan B: What If You Can't Find Someone?"}</h2>
        <p className="text-base leading-7">{"If you cannot find a technical co-founder right away, do not treat that as proof the idea is dead. A simple no-code or low-code version can help you test the problem, collect early users, and show that people care. You need evidence that the pain is real and that your approach is worth building further."}</p>
        <p className="text-base leading-7">{"This path also makes later co-founder conversations much stronger. That changes the discussion from 'join me and build this from scratch' to 'help me scale something that is already moving.' For many technical people, traction is more convincing than enthusiasm alone."}</p>
        <p className="text-base leading-7">{"This works best when the first release is narrow, the requirements are clear, and you stay closely involved in product decisions. If that early version gains traction, you may be able to attract a full-time technical co-founder later with a much stronger story."}</p>
        <p className="text-base leading-7">{"You will need to manage timelines, review quality, and make sure the codebase is documented well enough for someone else to take over later. Even basic technical literacy helps here, because it lets you ask better questions and avoid expensive misunderstandings."}</p>
        <p className="text-base leading-7">{"That is why learning some technical fundamentals yourself is often worth the effort, even if you never plan to become the main builder. You do not need to become a senior engineer. This makes you a better buyer of technical work and a better future partner for the right co-founder."}</p>
        <p className="text-base leading-7">{"Momentum attracts people. A founder who has tested assumptions, made trade-offs, and moved the idea forward is far more likely to eventually find a technical partner than a founder who waits for the perfect match before starting."}</p>
      </section>
      <section className="mx-auto max-w-4xl mt-10" id="sec_conclusion">
        <h2 className="text-3xl font-semibold">{"Your Next Steps to Finding a Tech Partner"}</h2>
        <p className="text-base leading-7">{"Finding a technical co-founder is rarely a quick search. It usually takes time, repeated conversations, and a clear reason for someone strong to join you. The best founders do not just ask, \"Can you build this?\" They show traction, customer insight, and a realistic view of the problem. If you are non-technical, your job is to become undeniably useful. That means talking to users, validating demand, shaping the offer, and proving you can help the business grow before a full product is built."}</p>
        <p className="text-base leading-7">{"Then start meeting people consistently in places where strong builders already gather. For Australian founders, that is where the MLAI community can help. Join an MLAI event, forum, or local discussion and start having real conversations with people working in AI and technology. You do not need to walk away with a co-founder on day one. You need to start showing up, listening well, and building trust with the kind of partner you would actually want to build a company with."}</p>
      </section>

        <QuoteBlock title="Keep moving forward" variant="orange">
          {"Your warm network is often the fastest way to find credible leads. Friends, former colleagues, classmates, and past collaborators can offer better-fit introductions than cold outreach alone."}
        </QuoteBlock>

        <MLAITemplateResourceCTA />

      <ArticleReferences
        references={[
          {id: 1, href: "https://www.lithobyte.co/7-mistakes-people-make-trying-to-find-technical-co-founders/", title: "7 Mistakes People Make Trying to Find Technical Co-Founders \u2013 LithoByte", publisher: "lithobyte.co", description: "Authoritative reference supporting 7 Mistakes People Make Trying to Find Technical Co-Founders \u2013 LithoByte.", category: "guide"},
          {id: 2, href: "https://www.linkedin.com/posts/josephpcaprara_how-do-i-find-a-technical-cofounder-for-my-activity-7371594520813002752-OePp", title: "Finding a technical cofounder: 2 paths and how to meet them | Joe Caprara posted on the topic | LinkedIn", publisher: "linkedin.com", description: "Authoritative reference supporting Finding a technical cofounder: 2 paths and how to meet them | Joe Caprara posted on the topic | LinkedIn.", category: "guide"},
          {id: 3, href: "https://www.indiehackers.com/post/how-do-you-find-a-technical-co-founder-93b39e501b", title: "How do you find a 'Technical Co-Founder'? - Indie Hackers", publisher: "indiehackers.com", description: "Authoritative reference supporting How do you find a 'Technical Co-Founder'? - Indie Hackers.", category: "guide"},
          {id: 4, href: "https://www.masslight.com/posts/checklist-finding-technical-cofounder", title: "Checklist for Finding a Technical Co-Founder", publisher: "masslight.com", description: "Authoritative reference supporting Checklist for Finding a Technical Co-Founder.", category: "guide"},
          {id: 5, href: "https://www.linkedin.com/posts/timhe2000_why-you-cant-find-a-technical-cofounder-activity-7328446023708659713-dePB", title: "Why you can't find a tech cofounder: 13 reasons | Tim He posted on the topic | LinkedIn", publisher: "linkedin.com", description: "Authoritative reference supporting Why you can't find a tech cofounder: 13 reasons | Tim He posted on the topic | LinkedIn.", category: "guide"},
          {id: 6, href: "https://altar.io/where-to-find-a-technical-co-founder-for-your-startup/", title: "Where to Find a Technical Co-Founder for Your Startup [With Case Studies]", publisher: "altar.io", description: "Authoritative reference supporting Where to Find a Technical Co-Founder for Your Startup [With Case Studies].", category: "guide"},
          {id: 7, href: "https://www.groovehq.com/blog/technical-co-founder", title: "What I Did When I Couldn\u2019t Find a Technical Co-Founder", publisher: "groovehq.com", description: "Authoritative reference supporting What I Did When I Couldn\u2019t Find a Technical Co-Founder.", category: "guide"},
          {id: 8, href: "https://foundingjourney.com/how-to-find-a-technical-cofounder", title: "How to Find a Technical Co-Founder | Founding Journey", publisher: "foundingjourney.com", description: "Authoritative reference supporting How to Find a Technical Co-Founder | Founding Journey.", category: "guide"},
          {id: 9, href: "https://www.linkedin.com/posts/troymunson_heres-how-you-find-a-technical-co-founder-activity-7248342422693306368-BIee", title: "Here's how you find a technical co-founder for your idea: \n\n\nFriends & Family \n\u2192 This one is obvious. Shoot anyone/everyone you can a text/call. \n\nCoworkers \n\u2192 Reach out to the engineers at your\u2026 | Troy Munson", publisher: "linkedin.com", description: "Authoritative reference supporting Here's how you find a technical co-founder for your idea: \n\n\nFriends & Family \n\u2192 This one is obvious. Shoot anyone/everyone you can a text/call. \n\nCoworkers \n\u2192 Reach out to the engineers at your\u2026 | Troy Munson.", category: "guide"},
          {id: 10, href: "https://www.ycombinator.com/cofounder-matching", title: "Y Combinator Co-Founder Matching Platform - find a co-founder through YC | Y Combinator", publisher: "ycombinator.com", description: "Authoritative reference supporting Y Combinator Co-Founder Matching Platform - find a co-founder through YC | Y Combinator.", category: "guide"},
          {id: 11, href: "https://www.antler.co/blog/how-to-find-a-co-founder-in-australia", title: "How To Find A Co-Founder In Australia | Antler", publisher: "antler.co", description: "Authoritative reference supporting How To Find A Co-Founder In Australia | Antler.", category: "guide"},
          {id: 12, href: "https://cofounderslab.com/", title: "The Startup CommunityStart. Grow. Fund.", publisher: "cofounderslab.com", description: "Authoritative reference supporting The Startup CommunityStart. Grow. Fund..", category: "guide"},
        ]}
        heading="Sources & further reading"
      />

        <ArticleDisclaimer />

        <div className="my-12 not-prose">
          <ArticleCompanyCTA
            title="Meet builders in the MLAI community"
            body="If you want to find a technical cofounder, start showing up where AI practitioners and startup-minded engineers already gather. Join MLAI events and discussions to meet people, test your pitch, and build real relationships over time."
            buttonText="Explore MLAI events"
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
