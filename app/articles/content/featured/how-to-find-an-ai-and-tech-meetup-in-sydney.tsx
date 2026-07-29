import type { ReactNode } from "react";
import { Home } from "lucide-react";
import { Link } from "react-router";

import { ArticleFAQ } from "~/components/articles/ArticleFAQ";
import { ArticleHeroHeader } from "~/components/articles/ArticleHeroHeader";
import { ArticleReferences } from "~/components/articles/ArticleReferences";
import SydneyEventFitFinder from "~/components/articles/SydneyEventFitFinder";
import {
  SYDNEY_AI_TECH_EVENTS,
  SYDNEY_EVENT_DATASET_OWNER,
  SYDNEY_EVENT_DATASET_REVIEW_CADENCE,
  SYDNEY_EVENT_DATASET_VERIFIED_AT,
} from "~/lib/sydney-ai-tech-events";

export const useCustomHeader = true;

const TOPIC = "Sydney AI and Tech Meetups: A Verified 2026 Event Finder";
export const CATEGORY = "featured";
export const SLUG = "how-to-find-an-ai-and-tech-meetup-in-sydney";
export const DATE_PUBLISHED = "2026-06-16";
export const DATE_MODIFIED = "2026-07-29";
export const DESCRIPTION =
  "Compare eight Sydney AI and tech communities by audience, recent activity, cost and format, then build a shortlist with MLAI’s event-fit worksheet.";
const HERO_IMAGE =
  "https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Fhero-46210747-b902-4e9d-8ffa-f3df1058658b.jpg?alt=media&token=2ecc04f5-87e3-4795-aba4-d59f1905b8e5";
const HERO_IMAGE_ALT =
  "Sydney technology meetup attendees discussing AI projects around laptops";
export const FEATURED_FOCUS = "community";

interface FAQ {
  id: number;
  question: string;
  answer: ReactNode;
}

export const faqItems: FAQ[] = [
  {
    id: 1,
    question: "Where can I find AI meetups in Sydney?",
    answer:
      "Start with the organiser pages in this dated directory. As at 29 July 2026, Cursor Sydney, Proof to Production and AI Week Sydney had future dates visible. Sydney AI Meetup, SydJS, GDG Sydney, Sydney AI Developers and the Power BI & Fabric group showed recent activity but no later date verified by MLAI.",
  },
  {
    id: 2,
    question: "How do I tell whether a Sydney meetup is still active?",
    answer:
      "A future event on the organiser’s own page is the strongest public signal. A recent event history or stated cadence is useful but does not prove another event is scheduled. Recheck the page and cancellation notices on the day you travel.",
  },
  {
    id: 3,
    question: "Are these Sydney AI and tech events free?",
    answer:
      "Terms vary. The reviewed Proof to Production event was A$25, the latest Sydney AI Meetup seminar was free, and AI Week contains a mix of paid and free activities. Several organiser pages did not state a price, so confirm before registering.",
  },
  {
    id: 4,
    question: "Which Sydney tech meetup is best for beginners?",
    answer:
      "Choose by audience and agenda rather than group size. Proof to Production says no technical background is required, while the Power BI & Fabric group welcomes beginners. Technical talks may still suit learners if the agenda and assumed knowledge are clear.",
  },
  {
    id: 5,
    question: "Can I attend a Sydney AI event online?",
    answer:
      "Some communities use online or hybrid formats. The latest reviewed Sydney AI Meetup event was on Zoom, Sydney AI Developers lists virtual activity, and AI Week’s main conference advertises streaming. Check the specific event because formats can change.",
  },
  {
    id: 6,
    question: "How can an organiser correct or add a listing?",
    answer:
      "Send MLAI the organiser URL, next event date, audience, cost, format and access information through the contact page. MLAI reviews this directory monthly but will not publish a future-date claim without a public source.",
  },
];

export const summaryHighlights = {
  heading: "A dated shortlist, not a scraped popularity ranking",
  intro:
    "Eight organiser pages were checked on 29 July 2026. Future dates are separated from groups with only recent activity.",
  items: [
    {
      label: "Three future dates verified",
      description:
        "Cursor Sydney, Proof to Production and AI Week Sydney had an upcoming date or program visible.",
    },
    {
      label: "Five groups require a date check",
      description:
        "They showed recent or recurring activity, but MLAI did not find a later public date during the review.",
    },
    {
      label: "Build a goal-based shortlist",
      description:
        "Use the interactive worksheet to compare audience, format, cost evidence and activity.",
    },
  ],
};

export const articleMeta = {
  title: TOPIC,
  topic: TOPIC,
  category: CATEGORY,
  slug: SLUG,
  description: DESCRIPTION,
  datePublished: DATE_PUBLISHED,
  dateModified: DATE_MODIFIED,
  image: HERO_IMAGE,
  imageAlt: HERO_IMAGE_ALT,
  featuredFocus: FEATURED_FOCUS,
};

const REFERENCES = [
  {
    id: 1,
    href: "https://cursorsydney.com/events/2026-08-meetup/",
    title: "Cursor Sydney #7",
    publisher: "Cursor Sydney",
    description:
      "Organiser page for the 12 August 2026 in-person meetup at Atlassian.",
    category: "industry",
  },
  {
    id: 2,
    href: "https://www.meetup.com/en-au/proof-to-production-australia/events/314330717/",
    title: "AI on Tap — Proof to Production Australia",
    publisher: "Proof to Production Australia",
    description:
      "Organiser listing for the paid 6 August 2026 Sydney event.",
    category: "industry",
  },
  {
    id: 3,
    href: "https://aiweek.com.au/",
    title: "AI Week Sydney 2026",
    publisher: "AI Week Sydney",
    description:
      "Official program hub for events scheduled from 6 to 13 December 2026.",
    category: "industry",
  },
  {
    id: 4,
    href: "https://sydneyaimeetup.org/",
    title: "Sydney AI Meetup",
    publisher: "Sydney AI Meetup",
    description:
      "Official group site showing monthly seminars, symposia and recent event activity.",
    category: "industry",
  },
  {
    id: 5,
    href: "https://sydjs.com/",
    title: "SydJS",
    publisher: "SydJS",
    description:
      "Official community site with the group’s 2026 JavaScript and AI-related event history.",
    category: "industry",
  },
  {
    id: 6,
    href: "https://gdg.community.dev/events/details/google-gdg-sydney-presents-gdg-sydney-meetup-june-2026/",
    title: "GDG Sydney Meetup — June 2026",
    publisher: "Google Developer Group Sydney",
    description:
      "Official event page used to verify the group’s recent Sydney activity.",
    category: "industry",
  },
  {
    id: 7,
    href: "https://www.meetup.com/en-au/sydney-ai-tech-talks/",
    title: "Sydney AI Developers Group",
    publisher: "Sydney AI Developers Group",
    description:
      "Organiser page describing the technical focus, event history and recent activity.",
    category: "industry",
  },
  {
    id: 8,
    href: "https://www.meetup.com/en-au/microsoft-power-bi-fabric-user-group-sydney/",
    title: "Microsoft Power BI & Fabric User Group Sydney",
    publisher: "Power BI & Fabric User Group Sydney",
    description:
      "Organiser page used to verify audience and recent North Sydney activity.",
    category: "industry",
  },
  {
    id: 9,
    href: "https://www.meetup.com/en-au/pydata-sydney/",
    title: "PyData Sydney",
    publisher: "PyData Sydney",
    description:
      "A counterexample reviewed and excluded because its page said the group was parked and showed no upcoming events.",
    category: "watchlist",
  },
];

function formatVerifiedDate(date: string) {
  return new Intl.DateTimeFormat("en-AU", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Australia/Sydney",
  }).format(new Date(`${date}T12:00:00+10:00`));
}

export default function ArticleContent() {
  return (
    <>
      <ArticleHeroHeader
        breadcrumbs={[
          { label: "Home", href: "/", icon: Home },
          { label: "Articles", href: "/articles" },
          { label: TOPIC, current: true },
        ]}
        title={TOPIC}
        titleHighlight="Verified 2026 Event Finder"
        headerBgColor="cyan"
        summary={summaryHighlights}
        heroImage={HERO_IMAGE}
        heroImageAlt={HERO_IMAGE_ALT}
      />

      <div className="prose prose-lg prose-slate max-w-none bg-transparent">
        <p className="lead">
          <strong>The short answer:</strong> check the event date before you
          choose the brand. On 29 July 2026, MLAI found future Sydney dates for
          Cursor Sydney, Proof to Production and AI Week Sydney. Five other
          relevant communities showed recent activity, but no later public date
          was verified. That difference matters: a large member count or long
          archive does not mean a meetup is running next week.
        </p>
        <p>
          This finder compares audiences, topics, cadence, cost evidence,
          format and venue information from organiser-controlled pages. Use it
          to discover a room, then recheck the source before paying or
          travelling. MLAI does not run or endorse the third-party events
          listed here.
        </p>

        <aside className="not-prose my-8 rounded-[24px] border border-amber-300 bg-amber-50 p-5 text-sm leading-6 text-amber-950">
          <p className="font-black">Time-sensitive directory</p>
          <p className="mt-1">
            Last checked {formatVerifiedDate(SYDNEY_EVENT_DATASET_VERIFIED_AT)}.
            “Recent recurring” means there was recent activity or an explicit
            cadence, not that a future event is confirmed. Always open the
            organiser link again on the day.
          </p>
        </aside>

        <h2>Eight Sydney AI and tech communities checked in July 2026</h2>
        <p>
          The activity label is deliberately conservative. Only a future date
          visible during MLAI’s review receives “upcoming”. Other rows can
          still be useful, but you need to wait for or find the organiser’s
          next announcement.
        </p>

        <div className="not-prose my-8 overflow-x-auto rounded-[24px] border border-gray-300 bg-white">
          <table className="min-w-[1120px] border-collapse text-left text-sm">
            <caption className="border-b border-gray-200 bg-gray-950 px-5 py-4 text-left text-base font-black text-white">
              Sydney AI and tech event directory · verified{" "}
              {formatVerifiedDate(SYDNEY_EVENT_DATASET_VERIFIED_AT)}
            </caption>
            <thead className="bg-[#f8f3e8] text-xs uppercase tracking-[0.08em] text-gray-700">
              <tr>
                <th className="px-4 py-3">Community</th>
                <th className="px-4 py-3">Audience and topic</th>
                <th className="px-4 py-3">Activity</th>
                <th className="px-4 py-3">Cost</th>
                <th className="px-4 py-3">Format / place</th>
                <th className="px-4 py-3">Access information</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 align-top text-gray-800">
              {SYDNEY_AI_TECH_EVENTS.map((event) => (
                <tr key={event.name}>
                  <td className="w-44 px-4 py-4">
                    <a
                      href={event.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-black text-[#4b1bd1] underline decoration-2 underline-offset-4"
                    >
                      {event.name}
                    </a>
                    <p className="mt-2 text-xs capitalize text-gray-600">
                      {event.kind}
                    </p>
                  </td>
                  <td className="w-64 px-4 py-4">
                    <p className="font-bold">{event.audience}</p>
                    <p className="mt-2 text-xs leading-5 text-gray-600">
                      {event.topics}
                    </p>
                  </td>
                  <td className="w-60 px-4 py-4">
                    <span
                      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-black ${
                        event.activityStatus === "upcoming"
                          ? "bg-green-100 text-green-900"
                          : "bg-amber-100 text-amber-950"
                      }`}
                    >
                      {event.activityStatus === "upcoming"
                        ? "Upcoming"
                        : "Check next date"}
                    </span>
                    <p className="mt-2 leading-5">
                      {event.nextOrLatestActivity}
                    </p>
                    <p className="mt-2 text-xs text-gray-600">
                      {event.cadence}
                    </p>
                  </td>
                  <td className="w-44 px-4 py-4">{event.cost}</td>
                  <td className="w-52 px-4 py-4">
                    <p className="font-bold capitalize">
                      {event.formats.join(" + ")}
                    </p>
                    <p className="mt-2 text-xs leading-5 text-gray-600">
                      {event.venueOrPlatform}
                    </p>
                  </td>
                  <td className="w-60 px-4 py-4 text-xs leading-5">
                    {event.accessibility}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p>
          Price and accessibility are not guessed. “Not stated” is more useful
          than filling a gap with an assumption. If cost, venue access, captioning
          or sensory conditions affect whether you can attend, contact the
          organiser before registering.
        </p>

        <SydneyEventFitFinder />

        <h2>How to choose a meetup by the job you need done</h2>
        <h3>If you want to build AI or software</h3>
        <p>
          Start with an agenda that names the tools, technical level and
          speakers. Cursor Sydney, Sydney AI Developers, Sydney AI Meetup, GDG
          Sydney and SydJS each offer a different technical doorway. A research
          seminar, web-development talk and product demo are not interchangeable,
          even when all three mention AI.
        </p>

        <h3>If you are applying AI inside a business</h3>
        <p>
          Look for operators discussing deployment decisions, team adoption,
          customer value and measurable outcomes. Proof to Production is
          positioned for business leaders and founders without requiring a
          technical background. The Power BI & Fabric group is more specific
          to analytics and Microsoft’s data ecosystem.
        </p>

        <h3>If you want collaborators, customers or career connections</h3>
        <p>
          Read the audience description and format, not just the talk title.
          Structured introductions, demos and discussion time can matter more
          than a large RSVP count. Go to learn and contribute first; treating
          every conversation as a sales lead usually weakens the relationship.
        </p>

        <h2>How MLAI checks whether a group is active</h2>
        <ol>
          <li>
            <strong>Find an organiser-controlled page.</strong> Aggregated
            search results can be stale or can confuse cities with the same
            name.
          </li>
          <li>
            <strong>Look for a future date.</strong> This is the strongest
            public signal that someone can register now.
          </li>
          <li>
            <strong>Separate history from availability.</strong> Past events
            and a stated monthly cadence show a community has operated, but
            they do not create a future booking.
          </li>
          <li>
            <strong>Check practical details.</strong> A useful listing exposes
            the audience, agenda, place or platform, price and registration
            path. Missing access information remains marked missing.
          </li>
          <li>
            <strong>Remove explicitly inactive groups.</strong> PyData Sydney,
            for example, was not included because its reviewed page said the
            group was parked and showed no upcoming event.
          </li>
          <li>
            <strong>Recheck before travel.</strong> Venue changes,
            cancellations and waitlists can appear after a directory review.
          </li>
        </ol>

        <h2>Turn one RSVP into a useful community connection</h2>
        <ol>
          <li>
            Write a 20-second introduction: what you are working on, who it is
            for and what you hope to learn.
          </li>
          <li>
            Prepare one question that can produce a specific answer, such as
            “What failed when you first moved this workflow into production?”
          </li>
          <li>
            Arrive early enough to understand the room and follow the
            organiser’s code of conduct.
          </li>
          <li>
            Speak with two or three relevant people rather than collecting as
            many contacts as possible.
          </li>
          <li>
            Send a short follow-up within a day, referring to the actual
            conversation and one useful next step.
          </li>
          <li>
            Decide after two events whether the group fits. One unusual agenda
            is not always representative of the community.
          </li>
        </ol>

        <aside className="not-prose my-10 rounded-[28px] border-2 border-gray-950 bg-[#00ffd7] p-6 shadow-[6px_6px_0_#111827] sm:p-8">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-[#4b1bd1]">
            Meet the Australian AI community
          </p>
          <h2 className="mt-3 text-2xl font-black text-gray-950">
            Check MLAI’s in-person and online events
          </h2>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-gray-800">
            If a Sydney date does not fit, join an MLAI online event or find
            the next in-person gathering. Event pages publish the audience,
            format and registration details available for each session.
          </p>
          <Link
            to="/events"
            className="mt-5 inline-flex rounded-full bg-gray-950 px-5 py-3 text-sm font-black text-white no-underline transition hover:bg-[#4b1bd1] focus:outline-none focus-visible:ring-4 focus-visible:ring-purple-200"
          >
            Explore MLAI events
          </Link>
        </aside>

        <h2>Send a correction or suggest a Sydney group</h2>
        <p>
          Organisers and attendees can{" "}
          <Link to="/contact">send MLAI a directory correction</Link>. Include
          the organiser-controlled URL, next event date, intended audience,
          cost, venue or online format, and any published accessibility contact
          or adjustments. MLAI will verify the source before changing the
          activity label.
        </p>

        <aside className="not-prose my-10 rounded-[28px] bg-gray-950 p-6 text-white sm:p-8">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-[#00ffd7]">
            Method, changelog, limitations and disclosure
          </p>
          <h2 className="mt-3 text-2xl font-black">
            A maintained discovery aid with an explicit reporting gap
          </h2>
          <ul className="mt-4 space-y-3 text-sm leading-6 text-gray-200">
            <li>
              <strong className="text-white">Inclusion rule:</strong> a Sydney
              or Sydney-accessible AI, machine-learning, software, web, data or
              applied-AI community with public organiser evidence and either a
              future event or recent recurring activity.
            </li>
            <li>
              <strong className="text-white">Activity rule:</strong> only a
              visible date after 29 July 2026 receives “upcoming”. Event
              history alone receives “recent recurring” and a warning to check
              the next date.
            </li>
            <li>
              <strong className="text-white">Maintenance:</strong>{" "}
              {SYDNEY_EVENT_DATASET_OWNER} owns the dataset and reviews it{" "}
              {SYDNEY_EVENT_DATASET_REVIEW_CADENCE.toLowerCase()}. The current
              dataset was checked on{" "}
              {formatVerifiedDate(SYDNEY_EVENT_DATASET_VERIFIED_AT)}.
            </li>
            <li>
              <strong className="text-white">Exclusions:</strong> groups with no
              relevant subject, no attributable organiser source, or an
              explicit inactive/parked status are not listed. Sponsorship,
              membership count and past attendance do not buy placement.
            </li>
            <li>
              <strong className="text-white">Limitations:</strong> MLAI did not
              independently verify venue accessibility, attendee experience,
              ticket availability or last-minute changes. Unpublished details
              are labelled “not stated”, not inferred.
            </li>
            <li>
              <strong className="text-white">Original asset:</strong> MLAI
              created the typed eight-group dataset, future-date confidence
              labels and goal/format/cost event-fit worksheet for this page.
              Worksheet choices stay in the browser.
            </li>
            <li>
              <strong className="text-white">Changelog:</strong> this revision
              removes irrelevant search-query terms, generic networking filler,
              unrelated references, the separate FAQ schema and an article-only
              CTA. It adds organiser sources, a correction route, freshness
              ownership and an Events-first conversion path.
            </li>
            <li>
              <strong className="text-white">Current editorial gate:</strong>{" "}
              MLAI has not yet interviewed six listed organisers or attended
              or obtained attributable first-hand reports for three groups. Do
              not mark this article final or score it 80+ until those reporting
              gates are completed and the findings are incorporated.
            </li>
            <li>
              <strong className="text-white">AI assistance:</strong> AI tools
              assisted source discovery, drafting and code generation.
              Time-sensitive claims were checked against the linked organiser
              pages; missing first-hand evidence is disclosed rather than
              simulated.
            </li>
          </ul>
        </aside>

        <ArticleReferences
          references={[...REFERENCES]}
          heading="Sydney organiser sources"
          description="Primary organiser pages checked for the 29 July 2026 revision."
          previewCount={5}
        />

        <div className="mt-12">
          <ArticleFAQ
            items={faqItems}
            heading="Sydney AI and tech meetup questions"
          />
        </div>
      </div>
    </>
  );
}
