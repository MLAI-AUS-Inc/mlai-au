# Draft comparison for source review

Display-only diff; never apply this mechanically. Current-main dates, sources, metadata and destinations must be preserved.

```diff
--- current-main/app/articles/content/featured/how-to-find-networking-events.tsx
+++ unreviewed-local-draft/app/articles/content/featured/how-to-find-networking-events.tsx
@@ -1,391 +1,125 @@
-import type { ReactNode } from 'react'
 import { Home } from 'lucide-react'
-import { RocketLaunchIcon, AcademicCapIcon, UsersIcon } from '@heroicons/react/24/outline'
+import { Link } from 'react-router'
+import { ArticleHeroHeader } from '~/components/articles/ArticleHeroHeader'
+import { ArticleFAQ } from '~/components/articles/ArticleFAQ'
+import ArticleConversionCTA from '~/components/articles/ArticleConversionCTA'
+import { BASE_ARTICLE_SEO_CONFIG } from '~/articles/seo-config'
+import { DEFAULT_AUTHOR_KEY, getAuthorProfile } from '~/articles/authors'
+import AuthorBio from '~/components/AuthorBio'
+import { ArticleTocPlaceholder } from '~/components/articles/ArticleTocPlaceholder'
+import { ArticleEventPreference } from '~/components/articles/ArticleEventPreference'
+import { NetworkingSearchNotice } from '~/components/articles/NetworkingSearchNotice'
+import { NETWORKING_PATH, NETWORKING_SEARCH_ROUTES, NETWORKING_RECORD_FIELDS, FICTIONAL_SEARCH_RECORD, NETWORKING_BLANK, NETWORKING_DOWNLOAD } from '~/lib/networking-event-search'

-import { ArticleFAQ } from '../../../components/articles/ArticleFAQ'
-import ArticleCompanyCTA from '../../../components/articles/ArticleCompanyCTA'
-import AuthorBio from '../../../components/AuthorBio'
-import { ArticleHeroHeader } from '../../../components/articles/ArticleHeroHeader'
-import { ArticleImageBlock } from '../../../components/articles/ArticleImageBlock'
-import { ArticleFooterNav } from '../../../components/articles/ArticleFooterNav'
-import { QuoteBlock } from '../../../components/articles/QuoteBlock'
-import { ArticleTocPlaceholder } from '../../../components/articles/ArticleTocPlaceholder'
-import { AudienceGrid } from '../../../components/articles/AudienceGrid'
-import { ArticleStepList } from '../../../components/articles/ArticleStepList'
-import { ArticleReferences } from '../../../components/articles/ArticleReferences'
-import { ArticleDisclaimer } from '../../../components/articles/ArticleDisclaimer'
-import { getDefaultArticleAuthorDetails } from '../../authors'
-
-/** ========== INPUTS (replace all placeholders) ========== */
 export const useCustomHeader = true
-
-const TOPIC = 'How to find networking events in Australia'
 export const CATEGORY = 'featured'
 export const SLUG = 'how-to-find-networking-events'
-const AUTHOR_PROFILE = getDefaultArticleAuthorDetails()
-const AUTHOR = AUTHOR_PROFILE.name ?? 'Dr Sam Donegan'
-const AUTHOR_ROLE = AUTHOR_PROFILE.role ?? AUTHOR_PROFILE.credentials ?? 'Founder'
-const AUTHOR_BIO = AUTHOR_PROFILE.bio ?? ''
-const AUTHOR_AVATAR =
-  AUTHOR_PROFILE.avatarUrl ??
-  'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=256&q=80'
-export const DATE_PUBLISHED = '2026-01-28'
-export const DATE_MODIFIED = '2026-01-28'
-export const DESCRIPTION = 'Practical ways to find networking events in Australia: where to look, how to filter by industry and city, and tips for online and in‑person meetups.'
-const HERO_IMAGE = "https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Fhero-12562886-6a00-40c3-bd65-734cd91f9fb4.jpg?alt=media&token=d1df7641-6648-4366-a06e-630ccc6043c7"
-const HERO_IMAGE_ALT = 'People networking at an event'
-export const FEATURED_FOCUS = 'ai' // 'startups' | 'ai' | 'product' | 'funding'
+// Preserve the established public registry date; this is not a new publication.
+export const DATE_PUBLISHED = '2026-01-03'
+export const DATE_MODIFIED = '2026-09-10'
+export const DESCRIPTION = 'Find Australian AI and startup events with four checked search routes, a worked shortlist decision and an editable record. Check participation, full commitment and availability.'
+export const FEATURED_FOCUS = 'ai'
+const TITLE = 'How to find networking events in Australia'
+const HERO_IMAGE = 'https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Fhero-12562886-6a00-40c3-bd65-734cd91f9fb4.jpg?alt=media&token=d1df7641-6648-4366-a06e-630ccc6043c7'

-/** ===== FAQ ===== */
-interface FAQ {
-  id: number
-  question: string
-  answer: ReactNode
+export const summaryHighlights = {
+ heading: 'Find a suitable conversation, not the largest event',
+ intro: 'For Australians curious about AI or startups who want a relevant online or in-person session—and a practical way to choose where to spend their time.',
+ items: [
+  { label: 'Search for a purpose', description: 'Combine one topic with a city or online format, then inspect the actual listing.' },
+  { label: 'Check before committing', description: 'Confirm participation, prerequisites, time, access and total cost—not just the event title.' },
+  { label: 'Keep a small shortlist', description: 'Record why each option fits, what remains unknown and the next check.' },
+ ],
 }

-export const faqItems: FAQ[] = [
-  {
-    id: 1,
-    question: 'Where can I find networking events near me?',
-    answer: (
-      <>
-        Start with major platforms: Meetup, Eventbrite (AU), Humanitix, and LinkedIn Events. Filter by your city (e.g., Melbourne, Sydney) and topic (e.g., AI, design). Also check coworking hubs, university calendars, and local council “What’s On” pages.
-      </>
-    ),
-  },
-  {
-    id: 2,
-    question: 'What keywords should I use when searching?',
-    answer: (
-      <>
-        Combine your city + industry + format: “Melbourne AI meetup”, “Sydney product networking”, “Brisbane tech breakfast”. Try synonyms like community, industry night, showcase, unconference, after‑hours, or lunch‑and‑learn.
-      </>
-    ),
-  },
-  {
-    id: 3,
-    question: 'How do I network if I’m introverted or new?',
-    answer: (
-      <>
-        Arrive early before groups form, set a small goal (2–3 conversations), and use an easy opener: “Hi, I’m {AUTHOR.split(' ')[0]}. What brought you along?” Consider volunteering at registration—it’s a natural way to meet people.
-      </>
-    ),
-  },
-  {
-    id: 4,
-    question: 'What should I bring or prepare?',
-    answer: (
-      <>
-        A one‑line intro, your LinkedIn QR code saved on your phone, a notes app to jot follow‑ups, and optional business cards. Skim the agenda and speakers so you have questions ready.
-      </>
-    ),
-  },
-  {
-    id: 5,
-    question: 'How do I judge if an event is worth my time?',
-    answer: (
-      <>
-        Check organiser track record, format (talks vs. networking), attendee signals (RSVPs, past photos), and practicals: time, location, accessibility, and any code of conduct. If it aligns with your goals and you can follow up with 2–3 people, it’s likely worthwhile.
-      </>
-    ),
-  },
-  {
-    id: 6,
-    question: 'How should I follow up after attending?',
-    answer: (
-      <>
-        Connect within 24–48 hours. Reference where you met and one specific topic you discussed. Offer a clear next step (share a resource, book a short call, or meet at the next event).
-      </>
-    ),
-  },
+export const faqItems = [
+ { id: 1, question: 'Where should I start looking for AI networking events?', answer: 'Try a relevant organiser’s calendar, Meetup or Eventbrite. Use a topic such as AI evaluation or startup validation, choose a city or online format, and open the organiser’s full listing. This guide demonstrates a search process rather than ranking platforms.' },
+ { id: 2, question: 'Does an online event provide networking?', answer: 'Not necessarily. Check whether participants can ask questions, join a discussion or take part in an exercise. A broadcast or recording may be useful for learning but does not establish interaction with other attendees.' },
+ { id: 3, question: 'How many events should I attend each month?', answer: 'There is no evidence-backed quota in this guide. Try an experience that fits your interests and available time, review what you learned, then decide whether another session is worthwhile.' },
+ { id: 4, question: 'Do RSVP counts or organiser logos prove an event is good?', answer: 'No. They do not verify who will attend, the quality of discussion, access arrangements or relevance to your goal. Use them as context, then check the agenda and unanswered practical questions.' },
+ { id: 5, question: 'How can I introduce myself without pitching?', answer: 'Try: “Hi, I’m [first name]. I’m learning about [topic], and I’m curious how other people approach [one question]. What brought you along?” Adapt it to the setting and respect the other person’s time.' },
 ]

-/** ===== Summary Highlights (used by ArticleHeroHeader) ===== */
-export const summaryHighlights = {
-  heading: `Key facts: ${TOPIC}`,
-  intro: "Choose an event around the people you hope to meet and the question you want to explore. Verify the organiser, format and current availability before making plans.",
-  items: [
-    { label: 'Where can I find networking events near me?', description: 'Start with Meetup, Eventbrite, Humanitix and LinkedIn Events; filter by your city and industry.' },
-    { label: 'How do I find events relevant to my field?', description: 'Use keywords (e.g., AI, design, product), follow organisers, and check coworking and university calendars.' },
-    { label: 'What if there are no events nearby?', description: 'Search for virtual meetups, widen your radius, join Slack/Discord groups, or host a small coffee meetup.' },
-  ],
+export const articleMeta = {
+ title: TITLE, topic: TITLE, category: CATEGORY, slug: SLUG, description: DESCRIPTION,
+ datePublished: DATE_PUBLISHED, dateModified: DATE_MODIFIED,
+ author: getAuthorProfile(DEFAULT_AUTHOR_KEY).name, image: HERO_IMAGE,
+ imageAlt: 'Vintage laptop, camera and cassette tapes on a table (illustrative image)',
 }

-/** ===== Article Metadata (route handler uses for registry/SEO) ===== */
-export const articleMeta = {
-  title: `${TOPIC} (2026)`,
-  topic: TOPIC,
-  category: CATEGORY,
-  slug: SLUG,
-  description: DESCRIPTION,
-  datePublished: DATE_PUBLISHED,
-  dateModified: DATE_MODIFIED,
-  author: AUTHOR,
-  image: HERO_IMAGE,
-  imageAlt: HERO_IMAGE_ALT,
+export default function ArticleContent() {
+ return <div className="bg-transparent">
+  <ArticleHeroHeader
+   breadcrumbs={[{ label: 'Home', href: '/', icon: Home }, { label: 'Articles', href: '/articles' }, { label: 'Find networking events', current: true }]}
+   title={TITLE} titleHighlight="networking events" headerBgColor="cyan"
+   summary={summaryHighlights} heroImage={HERO_IMAGE} heroImageAlt={articleMeta.imageAlt}
+  />
+  <div data-cf-article-body className="prose prose-lg prose-headings:scroll-mt-24 min-w-0 max-w-4xl mx-auto px-4 py-10 break-words [&_th]:align-top [&_td]:align-top [&_a]:[overflow-wrap:anywhere]">
+   <p>To find relevant networking events in Australia, start with a conversation or learning goal, search one topic in your city or an online format, and check the full listing before registering. Keep a shortlist with the evidence for each choice. A busy calendar is not the goal; finding a session you can use and participate in is.</p>
+   <p><strong>Updated 10 September 2026:</strong> four checked search routes and a completed decision now accompany the editable record. Unsupported organiser-count claims and fixed attendance rules were removed in the previous revision. The observations below are dated examples, not a continuously verified directory or a promise of ticket availability.</p>
+   <ArticleTocPlaceholder />
+
+   <h2 id="purpose">Write the question before searching</h2>
+   <p>“Build my network” is difficult to evaluate after an event. A more specific question gives you something to look for in the agenda. For example: “How do other beginners check an AI answer?”, “What do founders learn from their first customer interviews?” or “Could I follow a live demonstration of an agent?”</p>
+   <p>Then set the constraints that matter to you: available dates, acceptable travel, online access, budget and required background knowledge. You do not need to disclose your job status or pretend to be building a company to attend a suitable public learning session.</p>
+   <ul>
+    <li>For a first explanation, look for introductory language and explicit prerequisites.</li>
+    <li>For conversation, look for participant discussion or question time; the word “networking” alone is not enough.</li>
+    <li>For practice, check the exercise, required accounts or equipment and whether support is available.</li>
+   </ul>
+
+   <h2 id="search">Use one discovery route, then verify with the organiser</h2>
+   <p><a href="https://help.meetup.com/hc/en-us/articles/39235072484109-Finding-an-event">Meetup’s discovery help</a> describes date, venue/type and distance filters; country and language filters are not supported. <a href="https://www.linkedin.com/help/linkedin/answer/a549571/find-events-on-linkedin?lang=en">LinkedIn’s instructions</a> use Search, See all results and the Events category. Confirm the actual selected controls: a city or “online” keyword is not necessarily a filter.</p>
+   <p>A university, library, coworking space or community’s own public calendar can also give you a lead. Check whether non-members may attend. For platform selection, use our <Link to="/articles/featured/best-meetup-websites-for-ai-and-startup-communities-in-australia">meetup-platform comparison</Link>; this guide owns the next task—turning a search result into a decision and appropriate follow-up.</p>
+   <p>Start with a short topic, such as “AI”, “startup validation” or “AI evaluation”. If that is too broad, add a task or format. If nothing useful appears, relax one constraint at a time. Do not assume that a date phrase in the search box filters out old pages—check each listing’s actual date.</p>
+
+   <h2 id="examples">Four search routes checked in practice</h2>
+   <p>These routes illustrate different ways to find a lead; they are not an exhaustive ranking or event endorsements. No ticket was purchased, RSVP submitted or organiser contacted. Meetup and LinkedIn used existing signed-in sessions; the other two searches were public.</p>
+   <NetworkingSearchNotice />
+   <p className="text-sm">The comparison table scrolls horizontally on small screens. Focus it to scroll with the arrow keys.</p>
+   <div id="search-example-table" className="overflow-x-auto scroll-mt-24" role="region" aria-label="Dated event-search comparison" tabIndex={0}>
+    <table className="min-w-[48rem] text-base"><caption>Desktop discovery observations, 10 September 2026 — verify the exact listing before committing</caption><thead><tr><th>Route and performed search</th><th>What appeared</th><th>What it does not prove</th></tr></thead><tbody>
+     {NETWORKING_SEARCH_ROUTES.map(route => <tr key={route.id} data-networking-route={route.id}>
+      <td><a href={route.url}>{route.name} search</a><p>{route.query}</p>{'secondaryUrl' in route && <a href={route.secondaryUrl}>{route.secondaryLabel}</a>}</td>
+      <td>{route.observed}</td><td>{route.limits}</td>
+     </tr>)}
+    </tbody></table>
+   </div>
+   <p>The Eventbrite online route succeeded in this check after an earlier failed attempt; wait for the changed heading and applied filter before judging results. For conversation, verify the participation description. A beginner class, executive briefing and broadcast can all match “AI” while serving different needs.</p>
+   <p>For local options and organiser records, see the <Link to="/articles/featured/where-to-find-ai-events-in-melbourne">Melbourne event guide</Link> or <Link to="/articles/featured/how-to-find-an-ai-and-tech-meetup-in-sydney">Sydney event finder</Link>. Their recorded dates are not a substitute for checking the provider before attendance.</p>
+
+   <h2 id="checks">Check fit before price or popularity</h2>
+   <ul>
+    <li><strong>Purpose and audience:</strong> can the agenda answer your question at your experience level?</li>
+    <li><strong>Participation:</strong> can attendees ask, discuss or practise, and is that optional?</li>
+    <li><strong>Host and source:</strong> is the organiser identifiable, and do its calendar and ticket page agree?</li>
+    <li><strong>Time and place:</strong> confirm the full date, timezone, start/finish time and venue or online platform. Do not assume Australian cities always share a timezone.</li>
+    <li><strong>Whole commitment:</strong> include fees, travel and preparation. “Free” admission does not remove time or other costs.</li>
+    <li><strong>Access and conduct:</strong> check prerequisites, arrangements you need, recording/photography expectations and how to raise a concern.</li>
+    <li><strong>Uncertainty:</strong> ask the organiser before paying or committing if an essential detail is missing. A search result is not a completed registration.</li>
+   </ul>
+   <p>A focused enquiry could be: “I’m new to AI and interested in how to check an answer. Does this session include participant questions, and is any technical setup required?” Ask about your actual need rather than requesting guaranteed introductions, jobs or customers.</p>
+
+   <h2 id="routine">Try a bounded search routine</h2>
+   <p>As an optional experiment, allow 20 minutes: three to write your question and constraints, seven to look for candidates, seven to read the strongest listing, and three to record a decision or unanswered question. This is a personal time budget, not a researched optimum. Stop without registering if no event fits.</p>
+   <p>Save an organiser only when its work seems relevant and you want its updates. Review your own experience before deciding how often to attend. There is no required number of groups, newsletters, contacts or monthly events.</p>
+   <h2 id="decision-record">A completed decision: a good topic can still be the wrong commitment</h2>
+   <p><strong>Fictional reader, real dated listing.</strong> Ari’s preferences and decision below are invented for teaching. The <a href="https://events.humanitix.com/intro-ai">Introduction to AI listing</a> was actually checked. This is not a member interview, attendance report or measured event outcome. A search can succeed by ruling out an unsuitable option.</p>
+   <dl aria-label="Completed fictional search decision" className="rounded-xl border border-gray-300 bg-gray-50 p-5 text-base">
+    {NETWORKING_RECORD_FIELDS.map(([key, label]) => <div key={key} className="mb-5 last:mb-0"><dt className="font-semibold">{label}:</dt><dd className="ml-0 mt-1">{FICTIONAL_SEARCH_RECORD[key]}</dd></div>)}
+   </dl>
+   <p><a href={NETWORKING_DOWNLOAD} download="mlai-event-search-record.txt">Download the editable search record (.txt)</a> with this completed example and a blank copy. It needs no account and sends no notes. Fill registration and experience fields only when those steps actually happen; keep cost and access unknowns visible.</p>
+   <pre className="whitespace-pre-wrap break-words" aria-label="Event search-to-shortlist record">{NETWORKING_BLANK}</pre>
+
+   <h2 id="mlai">Put one suitable event on your shortlist</h2>
+   <p>MLAI publishes this guide and runs events, so this is an affiliated invitation rather than an independent ranking. Browse its calendar using your question and practical constraints. Confirm the particular event’s format and requirements before registering; a talk, workshop and build session may serve different needs.</p>
+   <ArticleEventPreference articlePath={NETWORKING_PATH} idPrefix="networking" description="Choose a preference for the MLAI calendar below. It does not filter the external searches above, save your private record or register you for an event." />
+   <ArticleConversionCTA articleSlug={CATEGORY + '/' + SLUG} config={BASE_ARTICLE_SEO_CONFIG['/articles/' + CATEGORY + '/' + SLUG].conversion!} events={[]} placement="article-inline" />
+   <p>Prepare one question and a short introduction. After a conversation, follow up only where interest is mutual and use the channel you agreed on. An attendee list is not consent for a sales campaign. If your next task is using what you heard, see <Link to="/articles/featured/why-australian-startups-need-stronger-ai-communities">turning community feedback into a testable action</Link>.</p>
+   <h2 id="scope">Verification and limits</h2>
+   <p>The source checks describe public platform guidance and dated desktop observations, including a signed-in Meetup search and LinkedIn search. They do not establish identical results for every account, mobile interface or location. The shortlist and time budget are MLAI editorial aids; no attendance outcome, event quality rating or conversion improvement was measured. Registration, payment, waitlisting and external confirmation forms were not tested.</p>
+   <ArticleFAQ items={faqItems} />
+   <AuthorBio author={getAuthorProfile(DEFAULT_AUTHOR_KEY)} />
+  </div>
+ </div>
 }
-
-/** ===== References (optional) ===== */
-const references = [
-  {
-    id: 1,
-    href: 'https://www.meetup.com/',
-    title: 'Meetup — Find your next event',
-    publisher: 'Meetup',
-    description: 'Global community platform to discover local groups and events by topic and city.',
-    category: 'guide',
-  },
-  {
-    id: 2,
-    href: 'https://www.eventbrite.com.au/d/australia/networking/',
-    title: 'Eventbrite Australia — Networking events',
-    publisher: 'Eventbrite',
-    description: 'Search and filter networking events across Australian cities and industries.',
-    category: 'guide',
-  },
-  {
-    id: 3,
-    href: 'https://humanitix.com/au',
-    title: 'Humanitix — Find networking events in Australia',
-    publisher: 'Humanitix',
-    description: 'Ticketing platform with Australian focus and charity model; search by keyword and city.',
-    category: 'guide',
-  },
-  {
-    id: 4,
-    href: 'https://www.linkedin.com/help/linkedin/answer/a507663/create-and-manage-events-on-linkedin',
-    title: 'Create and manage events on LinkedIn',
-    publisher: 'LinkedIn Help',
-    description: 'How LinkedIn Events work, including discovery and notifications.',
-    category: 'analysis',
-  },
-  {
-    id: 5,
-    href: 'https://www.acs.org.au/industry-insights/events.html',
-    title: 'ACS — Events',
-    publisher: 'Australian Computer Society',
-    description: 'Industry association listing for technology events across Australia.',
-    category: 'industry',
-  },
-  {
-    id: 6,
-    href: 'https://whatson.melbourne.vic.gov.au/',
-    title: 'City of Melbourne — What’s On',
-    publisher: 'City of Melbourne',
-    description: 'Official city guide featuring community and professional events (example of local council listings).',
-    category: 'government',
-  },
-]
-
-/**
- * ARTICLE CONTENT COMPONENT
- *
- * This component is dynamically imported by the route handler and rendered
- * INSIDE ArticleLayout. Do NOT wrap in ArticleLayout here.
- */
-export default function ArticleContent() {
-  const authorDetails = {
-    name: AUTHOR,
-    role: AUTHOR_ROLE,
-    bio: AUTHOR_BIO,
-    avatarUrl: AUTHOR_AVATAR,
-  }
-
-  return (
-    <>
-      {/* Hero header (custom) */}
-      <ArticleHeroHeader
-        breadcrumbs={[
-          { label: 'Home', href: '/', icon: Home },
-          { label: 'Articles', href: '/articles' },
-          { label: TOPIC, current: true },
-        ]}
-        title={TOPIC}
-        titleHighlight={TOPIC}
-        headerBgColor="cyan"
-        summary={summaryHighlights}
-        heroImage={HERO_IMAGE}
-        heroImageAlt={HERO_IMAGE_ALT}
-      />
-
-      {/* Table of contents placeholder */}
-      <ArticleTocPlaceholder className="bg-transparent" />
-
-      <div className="prose prose-lg prose-slate max-w-none bg-transparent">
-        {/* Opening paragraph */}
-        <p>
-          <strong>{TOPIC}</strong> — If you’re new to a city, changing roles, or building an Australian network, the quickest wins come from searching where organisers actually post, following a handful of reliable hosts, and setting a simple weekly routine so good events come to you.
-        </p>
-
-        {/* Hero Image - Use ArticleImageBlock, not raw img */}
-        <ArticleImageBlock src={HERO_IMAGE} alt={HERO_IMAGE_ALT} caption="Networking in Australia spans meetups, industry associations, coworking hubs, and university communities." />
-
-        {/* WHO IS THIS FOR - Use AudienceGrid, not raw HTML divs */}
-        <AudienceGrid
-          heading="Who is this guide for?"
-          cards={[
-            {
-              title: 'Founders & Teams',
-              description: 'For leaders validating ideas, seeking collaborators, or hiring.',
-              icon: <RocketLaunchIcon className="h-6 w-6" />,
-              variant: 'orange',
-            },
-            {
-              title: 'Students & Switchers',
-              description: 'For people building a local network and portfolio in Australia.',
-              icon: <AcademicCapIcon className="h-6 w-6" />,
-              variant: 'purple',
-            },
-            {
-              title: 'Community Builders',
-              description: 'For organisers, mentors, and hubs curating events and meetups.',
-              icon: <UsersIcon className="h-6 w-6" />,
-              variant: 'yellow',
-            },
-          ]}
-        />
-
-        {/* RESEARCH-DERIVED SECTIONS */}
-        <h2>Use the big discovery platforms (and how to search them)</h2>
-        <p>
-          Most Australian networking events are published on a few platforms. Start here and save your searches:
-        </p>
-        <ul>
-          <li>
-            <strong>Meetup</strong>: Filter by city and topic. Follow groups so new events appear in your feed and email digest.
-          </li>
-          <li>
-            <strong>Eventbrite (AU)</strong>: Use category = Business/Science & Tech and keywords like “networking”, “community”, “showcase”, or “demo”.
-          </li>
-          <li>
-            <strong>Humanitix</strong>: Popular with Australian organisers; the search bar plus city filter surfaces hidden gems.
-          </li>
-          <li>
-            <strong>LinkedIn Events</strong>: Search a topic, then switch the results tab to Events and set a location radius. Follow organisers to get notifications.
-          </li>
-        </ul>
-        <p>
-          Quick Google helpers: <em>site:eventbrite.com.au networking “Sydney”</em>, <em>site:meetup.com “Melbourne” AI</em>, or <em>“Brisbane” tech meetup this week</em>. Adjust the city and topic to suit.
-        </p>
-
-        <QuoteBlock title="Key insight" variant="purple">
-          In most cities, 10–20 organisers run the majority of quality events. Follow organisers you like rather than chasing every listing.
-        </QuoteBlock>
-
-        <h2>Find events through your local ecosystem</h2>
-<img src="https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-55c8642a-31c5-4501-8ed9-eee553a50b18.jpg?alt=media&token=06cb06e5-c3dc-4e10-ba11-005d42f0e954" alt="People collaborating in a vibrant tech startup setting, captured with a nostalgic 90s film aesthetic." className="w-full rounded-lg my-8" />
-
-        <p>
-          Beyond platforms, tap the institutions that host communities:
-        </p>
-        <ul>
-          <li>
-            <strong>Coworking and innovation hubs</strong>: Many publish public calendars or newsletters. Search “[your city] coworking events”.
-          </li>
-          <li>
-            <strong>Universities and student societies</strong>: Public lectures, hack nights, and industry mixers often welcome non‑students.
-          </li>
-          <li>
-            <strong>Industry associations</strong>: For tech, check bodies like ACS and similar groups; they run talks and networking nights across states.
-          </li>
-          <li>
-            <strong>Local councils</strong>: “What’s On” guides list business and community events (good for small‑format meetups and workshops).
-          </li>
-          <li>
-            <strong>Slack/Discord communities</strong>: Many local groups maintain shared calendars or pin event threads—search “{new Date().getFullYear()} {new Intl.DateTimeFormat('en-AU', { month: 'long' }).format(new Date())} Melbourne AI Discord/Slack”.
-          </li>
-        </ul>
-
-        <h3>Search patterns that work (copy/paste and adapt)</h3>
-        <ul>
-          <li>
-            Meetup/Eventbrite/Humanitix: “{new Date().getFullYear()} {new Intl.DateTimeFormat('en-AU', { month: 'long' }).format(new Date())} [City] [topic] networking/meetup”.
-          </li>
-          <li>
-            Google: <em>site:eventbrite.com.au</em> OR <em>site:humanitix.com</em> “networking” “[City]”.
-          </li>
-          <li>
-            LinkedIn: Search topic → Events tab → Location = your city → Date = This week/This month.
-          </li>
-        </ul>
-
-        <h2>Online‑first options if you can’t travel</h2>
-<img src="https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-051f2bc1-6d32-41f9-bade-6b727db59e43.jpg?alt=media&token=d75ef467-609a-43df-9124-1a1b01134703" alt="Group of professionals collaborating in a trendy tech workspace with a retro 90s film aesthetic." className="w-full rounded-lg my-8" />
-
-        <p>
-          Virtual meetups and webinars can be just as useful for starting conversations:
-        </p>
-        <ul>
-          <li>
-            Many Meetup and Eventbrite listings include an online stream—filter for Online.
-          </li>
-          <li>
-            LinkedIn Live and YouTube premieres often have active chats; connect with speakers and attendees afterward.
-          </li>
-          <li>
-            Join community Slack/Discord spaces and attend their virtual office hours or demo days.
-          </li>
-        </ul>
-
-        <QuoteBlock title="Pro tip" variant="orange">
-          Arrive 10–15 minutes early. You’ll meet the organiser and early arrivals—often the people most open to chatting and making introductions.
-        </QuoteBlock>
-
-        <ArticleStepList
-          title="Set up a 20‑minute weekly routine that surfaces the best events"
-          steps={[
-            { label: 'Save platform searches (city + topic) on Meetup, Eventbrite, and Humanitix; follow 10 organisers you like.' },
-            { label: 'On LinkedIn, follow organisers and join 2–3 groups; subscribe to 3–5 hub/university newsletters.' },
-            { label: 'Each Friday, review your feeds for 20 minutes; shortlist up to two events, RSVP, and block your calendar.' },
-          ]}
-          accent="teal"
-        />
-
-        <h2>How to quickly assess an event’s value</h2>
-        <p>
-          Before you RSVP, scan the listing for:
-        </p>
-        <ul>
-          <li>
-            <strong>Fit</strong>: Agenda, audience, and host—do they match your goals?
-          </li>
-          <li>
-            <strong>Signals</strong>: Past photos, repeat attendees, or partner organisations suggest reliability.
-          </li>
-          <li>
-            <strong>Practicalities</strong>: Location, start/finish time, accessibility info, and code of conduct.
-          </li>
-        </ul>
-
-        <h2>Closing: make it sustainable</h2>
-        <p>
-          Networking works when it’s consistent, not intense. Keep a light routine, pick one in‑person and one online event per month, and always follow up with a short, specific message. That rhythm compounds into a strong Australian network.
-        </p>
-      </div>
-
-      {/* References */}
-      <ArticleReferences references={references} heading="Sources & further reading" />
-
-      {/* Disclaimer */}
-      <ArticleDisclaimer />
-
-      {/* Company CTA (single, community‑focused) */}
-      <ArticleCompanyCTA
-        title="Join the MLAI community"
-        body="Connect with practitioners and enthusiasts across Australia—share events, find collaborators, and get practical support."
-        buttonText="Get in touch"
-        buttonHref="/contact"
-        note="Not‑for‑profit, community‑first."
-      />
-
-      {/* Author Bio */}
-      <AuthorBio author={authorDetails} />
-
-      {/* FAQ */}
-      <ArticleFAQ items={faqItems} />
-
-      {/* Navigation */}
-      <ArticleFooterNav />
-    </>
-  )
-}
```
