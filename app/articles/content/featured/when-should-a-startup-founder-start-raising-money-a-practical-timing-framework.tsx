import type { ReactNode } from 'react'
import { Link } from 'react-router'
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

const TOPIC = "When Should a Startup Founder Start Raising Money? A Practical Timing Framework"
export const CATEGORY = "featured"
export const SLUG = "when-should-a-startup-founder-start-raising-money-a-practical-timing-framework"
export const DATE_PUBLISHED = "2026-03-14"
export const DATE_MODIFIED = "2026-03-14"
export const DESCRIPTION = "Learn when to start raising money as a startup founder, what signals show you're ready, and how to avoid raising too early or too late."
const HERO_IMAGE = "https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/article-images%2Fhero-284a7f62-2ccc-4f6f-97a1-66e1a8efa23f.jpg?alt=media&token=6668f82f-c2cb-4741-88fd-bd2e1fd860ec"
const HERO_IMAGE_ALT = "Startup founder planning fundraising timing with runway chart, investor calendar, and growth milestones"
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
  { id: 1, question: "When should a startup founder start raising money?", answer: "Usually when the business can show enough evidence that something is working and funding will help it reach a clear next stage. That often means proven customer pain, early traction, and a defined use of funds." },
  { id: 2, question: "Is it a mistake to raise money too early?", answer: "It can be. If the product direction is still unclear or customer demand is mostly theoretical, fundraising may add dilution and pressure before the business has reduced enough risk." },
  { id: 3, question: "How do I know if I am ready to raise?", answer: "A practical test is whether you can explain what the round will fund, what milestone it should unlock, and how long the money should last. If that story is clear and backed by evidence, timing is stronger." },
  { id: 4, question: "What if my startup still has runway left?", answer: "That is often the best time to prepare and begin targeted conversations. Starting before cash becomes urgent gives you more control, more time to refine the story, and better odds of running a thoughtful process." },
  { id: 5, question: "Should every startup raise venture capital?", answer: "No. Sometimes the smarter move is to keep learning through revenue, pilots, grants, consulting income, or design partners. If those paths can reach the next proof point more cheaply, waiting may be better." },
]

export const summaryHighlights = {
  heading: "Key facts: When Should a Startup Founder Start Raising Money? A Practical Timing Framework",
  intro: "Learn when to start raising money as a startup founder, what signals show you're ready, and how to avoid raising too early or too late.",
  items: [
    { label: "Core rule", description: "Start raising when capital will accelerate progress you have already validated, not when you still need money to figure out the basics." },
    { label: "What investors want to see", description: "Clear proof of a real problem, a credible solution, signs of market pull, and a specific next milestone that funding will unlock." },
    { label: "Readiness signals", description: "Momentum matters more than perfection. Useful signals include repeat usage, paying pilots, retention, technical proof, and a believable 12 to 18 month plan." },
  ],
}

export const articleMeta = {
  title: "When Should a Startup Founder Start Raising Money? A Practical Timing Framework",
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
        <p><strong>{TOPIC}</strong> — {"Many founders ask when they should start raising money as if there is a correct month, stage, or company age. In reality, there is no universal fundraising clock. A better question is what your startup has already proven, what momentum is visible today, and what capital would help you do next. Investors usually respond better to evidence than to ambition alone. If money would only buy more time to figure out the basics, it may be too early to raise."}</p>
        <p>{"That is why fundraising is best treated as a tool, not a milestone badge. Raising too soon can distract founders, dilute ownership early, and create pressure before the business has found a clear direction. Raising at the right time can help you move faster because the business already has signs of validation and a believable next step. In the rest of this article, we will break timing into a practical framework: readiness signals, milestone quality, runway and cash pressure, investor fit, and what founders should do before they start pitching. The goal is not to chase funding for its own sake, but to know when capital can genuinely accelerate progress."}</p>
        <ArticleImageBlock
          src={HERO_IMAGE}
          alt={HERO_IMAGE_ALT}
          caption="Learn when to start raising money as a startup founder, what signals show you're ready, and how to avoid raising too early or too late."
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
          {"Start raising when capital will accelerate progress you have already validated, not when you still need money to figure out the basics."}
        </QuoteBlock>
          <h2>{"Start raising when you can prove the problem, solution, and why now"}</h2>
          <p>{"A good fundraising moment usually starts with proof, not just belief. Investors rarely back an idea because it sounds interesting on its own."}</p>
          <p>{"You also need to show why this startup matters now. If you cannot explain why the market is ready, investors may see the business as too early, even if the idea is good. The clearest fundraising story links current proof to the next milestone that capital will unlock. For example, the round might fund product build-out after early validation, help convert pilots into paying customers, or support a first hire that speeds customer delivery. When the money has a clear job and the market pull is visible, raising becomes far easier to justify."}</p>
          <p>{"Investors rarely back an idea because it sounds interesting on its own. A good fundraising moment usually starts with proof, not just belief. If you cannot explain why the market is ready, investors may see the business as too early, even if the idea is good. The clearest fundraising story links current proof to the next milestone that capital will unlock. For example, the round might fund product build-out after early validation, help convert pilots into paying customers, or support a first hire that speeds customer delivery. When the money has a clear job and the market pull is visible, raising becomes far easier to justify."}</p>
          <ArticleImageBlock
            src="https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/article-images%2Finline-cf69b594-65bc-4b6f-8ba4-b8f8b41fe9a9.jpg?alt=media&token=8561f43f-e436-4545-86f3-06407428e485"
            alt="Start raising when you can prove the problem, solution, and why now"
            caption="Start raising when you can prove the problem, solution, and why now"
            width={1200}
            height={800}
          />
                <div className="mt-4">
                  <p className="text-sm font-semibold text-gray-700">Related reading</p>
                  <ul className="mt-2 list-disc pl-5 text-sm text-gray-600">
                  <li><Link to="/resources">{"/resources"}</Link></li>
                  <li><Link to="/community">{"/community"}</Link></li>
                  </ul>
                </div>
          <h2>{"The clearest signals you're ready to raise"}</h2>
          <p>{"The best time to raise is usually when your startup can show momentum, not when everything feels finished. Investors rarely expect a complete business. They want to see that something important is starting to work and that more capital could help you move faster."}</p>
          <p>{"A useful test is this: can you explain what the next round will fund, what milestone it should unlock, and how long the money should last? If the answer is clear, fundraising becomes easier to justify. Strong timing usually means you can connect today's evidence to a believable 12 to 18 month plan. In other words, you are not just asking for money to survive. You are asking for money to reach a specific next stage."}</p>
          <ArticleImageBlock
            src="https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/article-images%2Finline-0db507be-f7d7-4f65-81bc-fbf2831f89e3.jpg?alt=media&token=03938572-9af9-4d07-8ecb-a0b8026581e2"
            alt="The clearest signals you're ready to raise"
            caption="The clearest signals you're ready to raise"
            width={1200}
            height={800}
          />
                <div className="mt-4">
                  <p className="text-sm font-semibold text-gray-700">Related reading</p>
                  <ul className="mt-2 list-disc pl-5 text-sm text-gray-600">
                  <li><Link to="/resources">{"/resources"}</Link></li>
                  <li><Link to="/events">{"/events"}</Link></li>
                  </ul>
                </div>
          <h3>{"Operational signs that the business is working"}</h3>
          <p>{"One strong signal is repeatability. For a software startup, that may look like steady user growth, good activation, or customers coming back without heavy prompting."}</p>
          <p>{"A small number of paying customers who renew, expand, or refer others may tell a better story than a larger top-line number with weak retention. A signed pilot with a credible partner, a successful proof of concept, or a working prototype that removes key technical risk can all make fundraising timing more favourable. These markers show that the company is reducing uncertainty, which is what investors look for."}</p>
          <h3>{"Story signs that investors can believe the next step"}</h3>
          <p>{"Another signal is narrative clarity. You should be able to say where the company is now, what has been proven, what still needs to be proven, and why this raise is the right size for that gap. That is much stronger than saying you want capital for growth without defining the path. Investors back progress they can picture."}</p>
          <p>{"Founders should also check whether they have enough runway left to run a real process. If you wait until cash is nearly gone, even good signals lose power because the raise starts to look urgent rather than strategic. Starting while you still have time lets you build relationships, test your story, and learn from feedback. Communities such as MLAI events and startup resources can also help founders sharpen that story before they are under pressure."}</p>

        <ArticleResourceCTA
          eyebrow="Free guide"
          title={"Get the when to start raising money as a startup founder checklist"}
          description="Use this article as a working guide: shortlist candidates, validate traction, and structure your next conversations."
          buttonLabel="Download now"
          buttonHref="/articles"
          accent="purple"
        />

        <ArticleStepList
          title="Practical next steps"
          steps={[
            "Start raising when you can prove the problem, solution, and why now",
            "The clearest signals you're ready to raise",
            "When raising is too early, too late, or simply the wrong move",
            "How to prepare before you formally start the raise",
            "A simple decision rule: raise for acceleration, not validation alone",
          ]}
          accent="indigo"
        />
          <h2>{"When raising is too early, too late, or simply the wrong move"}</h2>
          <p>{"Raising too early usually means you are trying to fund uncertainty that you have not yet reduced. The same is true when your use of funds is vague. If the real issue is that you still do not know what to build, fundraising can become an expensive way to delay hard product decisions."}</p>
          <p>{"Raising too late creates a different kind of risk. When runway is short, founders often enter investor conversations with urgency instead of strategy. That changes the tone of the process. Instead of choosing investors carefully, you may feel pressure to accept poor terms, stretch your story, or spend all your time chasing quick wins. Investors can usually sense when a company is fundraising from weakness rather than momentum. The best time to start is often before you desperately need the money, while you still have enough runway to run a thoughtful process."}</p>
          <p>{"Sometimes the right answer is not to raise at all, at least not yet. It can also create signalling risk: if you announce a raise too early or struggle to close one, the market may read that as a sign of weakness. For many founders, the better question is not only 'can we raise?' but 'what is the cheapest and clearest way to reach the next proof point?' If you can answer that without investors, waiting may be the smarter move."}</p>
                <div className="mt-4">
                  <p className="text-sm font-semibold text-gray-700">Related reading</p>
                  <ul className="mt-2 list-disc pl-5 text-sm text-gray-600">
                  <li><Link to="/resources">{"/resources"}</Link></li>
                  <li><Link to="/community">{"/community"}</Link></li>
                  </ul>
                </div>
          <h3>{"Signs you may be too early"}</h3>
          <p>{"You are likely too early if customer interest is mostly theoretical, the product direction keeps changing, or you cannot explain exactly how new capital will change the business in the next 12 to 18 months. Another warning sign is using fundraising as a substitute for customer discovery. Money helps you scale what is working."}</p>
          <h3>{"Signs waiting may be the better move"}</h3>
          <p>{"Holding off can make sense when you still have low-cost ways to learn, such as selling a pilot, applying for grants, or using your network to secure early design partners. These options can improve traction before you dilute ownership. They also give you a stronger story if you decide to raise later."}</p>
          <h2>{"How to prepare before you formally start the raise"}</h2>
          <p>{"The best time to prepare for fundraising is usually well before you urgently need the cash. A raise often takes longer than founders expect because it includes outreach, first meetings, follow-up questions, partner discussions, and due diligence. If you wait until runway is tight, your choices shrink and the pressure shows up in the process. A better approach is to start building the case for investment months in advance, while the business still has enough time to keep executing."}</p>
          <p>{"Investors want to understand the problem, why your solution matters, who needs it, what traction you have so far, how large the market can become, why this team is suited to win, and exactly what the new capital will help you achieve. Keep that story concise and consistent across your deck, data room, and conversations. If the story changes every time you tell it, investors may assume the strategy is still unclear."}</p>
          <p>{"That means a realistic view of runway, revenue or usage trends, key operating metrics, and the milestones you expect the raise to fund. It also helps to be ready for practical questions about burn, hiring plans, and founder compensation. A sensible founder salary plan can signal discipline because it shows you are thinking about sustainability, not just survival. Investors do not expect perfection, but they do expect founders to understand the financial shape of the business."}</p>
          <p>{"Finally, start building investor familiarity before you ask for money. Share thoughtful updates as you hit milestones, even if you are not yet fundraising. That gives investors time to see progress and lowers the friction when the round opens. For Australian founders, this kind of steady visibility can come from startup communities, industry events, and peer networks where trust builds over time rather than in a single pitch."}</p>
                <div className="mt-4">
                  <p className="text-sm font-semibold text-gray-700">Related reading</p>
                  <ul className="mt-2 list-disc pl-5 text-sm text-gray-600">
                  <li><Link to="/events">{"/events"}</Link></li>
                  <li><Link to="/resources">{"/resources"}</Link></li>
                  <li><Link to="/community">{"/community"}</Link></li>
                  </ul>
                </div>
          <h2>{"A simple decision rule: raise for acceleration, not validation alone"}</h2>
          <p>{"A useful rule is simple: raise money when capital will speed up something that is already working, not when you still need investors to prove the basics. If you have clear customer demand, a repeatable way to win users or revenue, and a believable plan for what extra cash will unlock, fundraising can make sense."}</p>
          <p>{"That means the best next step is often an honest check on four things: milestones, runway, story, and target list. Then tighten your fundraising narrative around traction, use of funds, and the next value-creating milestone. If the case is strong, begin warm, focused conversations before things feel urgent. Good fundraising starts before panic, but great fundraising starts after learning."}</p>
          <p>{"If you have clear customer demand, a repeatable way to win users or revenue, and a believable plan for what extra cash will unlock, fundraising can make sense. A useful rule is simple: raise money when capital will speed up something that is already working, not when you still need investors to prove the basics."}</p>
                <div className="mt-4">
                  <p className="text-sm font-semibold text-gray-700">Related reading</p>
                  <ul className="mt-2 list-disc pl-5 text-sm text-gray-600">
                  <li><Link to="/resources">{"/resources"}</Link></li>
                  <li><Link to="/events">{"/events"}</Link></li>
                  <li><Link to="/community">{"/community"}</Link></li>
                  </ul>
                </div>

        <QuoteBlock title="Keep moving forward" variant="orange">
          {"Momentum matters more than perfection. Useful signals include repeat usage, paying pilots, retention, technical proof, and a believable 12 to 18 month plan."}
        </QuoteBlock>

        <MLAITemplateResourceCTA />

      <ArticleReferences
        references={[
          {id: 1, href: "https://legalvision.com.au/im-a-startup-founder-when-should-i-start-paying-myself-a-salary/", title: "I'm a Startup Founder. When Should I Start Paying Myself a Salary?", publisher: "legalvision.com.au", description: "Authoritative reference supporting I'm a Startup Founder. When Should I Start Paying Myself a Salary?.", category: "guide"},
          {id: 2, href: "https://launchvic.org/insights/the-biggest-mistakes-founders-make-when-fundraising/", title: "Biggest Fundraising Mistakes Founders Make | Investor Insights | LaunchVic", publisher: "launchvic.org", description: "Authoritative reference supporting Biggest Fundraising Mistakes Founders Make | Investor Insights | LaunchVic.", category: "guide"},
          {id: 3, href: "https://www.startupdaily.net/advice/a-step-by-step-guide-for-founders-to-raise-capital/", title: "A step-by-step guide for founders to raise capital - Startup Daily", publisher: "startupdaily.net", description: "Authoritative reference supporting A step-by-step guide for founders to raise capital - Startup Daily.", category: "guide"},
          {id: 4, href: "https://launchvic.org/insights/watch-when-is-the-right-time-for-a-founder-to-raise/", title: "How to Connect With Investors | Investor Insights | LaunchVic", publisher: "launchvic.org", description: "Authoritative reference supporting How to Connect With Investors | Investor Insights | LaunchVic.", category: "guide"},
          {id: 5, href: "https://focusedforbusiness.com/when-is-the-right-time-to-raise-startup-investment/", title: "When Is the Right Time to Raise Investment?", publisher: "focusedforbusiness.com", description: "Authoritative reference supporting When Is the Right Time to Raise Investment?.", category: "guide"},
          {id: 6, href: "https://www.forumvc.com/thought-pieces/best-time-to-raise-startup-funding", title: "Best Time for Startups to Raise Capital Successfully", publisher: "forumvc.com", description: "Authoritative reference supporting Best Time for Startups to Raise Capital Successfully.", category: "guide"},
          {id: 7, href: "https://about.crunchbase.com/blog/when-to-raise-money-startup", title: "5 Tips to Help You Decide Whether Now is the Right Time to Raise Money for Your Startup", publisher: "about.crunchbase.com", description: "Authoritative reference supporting 5 Tips to Help You Decide Whether Now is the Right Time to Raise Money for Your Startup.", category: "guide"},
          {id: 8, href: "https://www.myzeller.com/au/blog/funding-your-startup", title: "How to Raise Funds for your Startup", publisher: "myzeller.com", description: "Authoritative reference supporting How to Raise Funds for your Startup.", category: "guide"},
          {id: 9, href: "https://www.linkedin.com/pulse/when-should-founders-fundraise-roelof-vuurboom", title: "When should founders fundraise?", publisher: "linkedin.com", description: "Authoritative reference supporting When should founders fundraise?.", category: "guide"},
          {id: 10, href: "https://andybudd.com/archives/2024/12/what-startup-founders-get-wrong-when-raising-money-and-how-to-fix-it", title: "What Startup Founders Get Wrong When Raising Money (and How to Fix It) | Andy Budd", publisher: "andybudd.com", description: "Authoritative reference supporting What Startup Founders Get Wrong When Raising Money (and How to Fix It) | Andy Budd.", category: "guide"},
          {id: 11, href: "https://www.airwallex.com/au/blog/startup-fundraising-2024", title: "The art of startup fundraising: Your guide to raising capital in 2024", publisher: "airwallex.com", description: "Authoritative reference supporting The art of startup fundraising: Your guide to raising capital in 2024.", category: "guide"},
        ]}
        heading="Sources & further reading"
      />

        <ArticleDisclaimer />

        <div className="my-12 not-prose">
          <ArticleCompanyCTA
            title="Get fundraising-ready before the pressure hits"
            body="Use MLAI resources, events, and community connections to sharpen your story, test your milestones, and prepare for investor conversations with more confidence."
            buttonText="Explore founder resources"
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
