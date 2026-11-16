import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/react";
import clsx from "clsx";
import {
  ArrowRight,
  CalendarClock,
  CheckCircle2,
  ChevronDown,
  ClipboardList,
  Coins,
  Mail,
  MapPin,
  Video,
  type LucideIcon,
} from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";
import { Link } from "react-router";
import type { Route } from "./+types/mentors";

// Public links only: this page never carries or forwards an invite token.
export const CHAT_MENTORING_URL = "https://chat.mlai.au/mentoring";
export const MENTOR_INTEREST_MAILTO =
  "mailto:hi@mlai.au?subject=Mentoring%20at%20MLAI";

const SECTION_ITEMS = [
  { id: "hero", label: "Mentor at MLAI" },
  { id: "mentoring-20-seconds", label: "Mentoring in 20 seconds" },
  { id: "how-it-works", label: "How it works" },
  { id: "you-control", label: "What you control" },
  { id: "founders-bring", label: "What founders bring" },
  { id: "roo-points", label: "Roo Points" },
  { id: "got-an-invite", label: "Got an invite?" },
  { id: "no-invite", label: "No invite yet" },
  { id: "faq", label: "FAQ" },
] as const;

const QUICK_FACTS: Array<{
  icon: LucideIcon;
  title: string;
  body: string;
  className: string;
  iconClassName: string;
}> = [
  {
    icon: ClipboardList,
    title: "Founders send a brief first",
    body: "Every request arrives with the founder's stage, biggest struggle and the outcome they want, so you know what the session is for before you say yes.",
    className:
      "border-[var(--brutalist-mint)]/45 bg-[var(--brutalist-mint)]/20 text-[var(--brutalist-black)]",
    iconClassName: "bg-white/45 text-[var(--brutalist-black)]",
  },
  {
    icon: CheckCircle2,
    title: "You accept or decline each one",
    body: "Nothing is booked until you accept. Declining is fine and costs nobody anything.",
    className: "border-[var(--brutalist-blue)]/45 bg-[var(--brutalist-blue)] text-white",
    iconClassName: "bg-white/16 text-white",
  },
  {
    icon: Video,
    title: "Video or the MLAI space",
    body: "Meet on video, with the Google Meet link made for you, or in person at the MLAI space. You pick which.",
    className:
      "border-[var(--brutalist-purple)]/45 bg-[var(--brutalist-purple)]/16 text-[var(--brutalist-black)]",
    iconClassName: "bg-[var(--brutalist-purple)]/18 text-[var(--brutalist-purple)]",
  },
];

const MENTOR_STEPS = [
  "You get an invite by email from MLAI.",
  "Click Accept Invite and sign in to MLAI Chat with that email address.",
  "Fill in a short profile: headline, bio, topics and weekly hours.",
  "MLAI reviews it and switches your profile on.",
  "Founders request a time and send a brief.",
  "You accept or decline. A request you leave unanswered expires after 48 hours.",
  "Meet. For video sessions the Google Meet link is made for you when you accept.",
];

const CONTROLS: Array<{ icon: LucideIcon; title: string; body: string }> = [
  {
    icon: CalendarClock,
    title: "Your weekly hours",
    body: "Set windows for each weekday in your own timezone. Founders only see times inside them.",
  },
  {
    icon: ClipboardList,
    title: "Session length",
    body: "Anywhere from 30 to 60 minutes.",
  },
  {
    icon: Coins,
    title: "Your price in Roo Points",
    body: "New mentors start at 30 Roo Points for 30 minutes. MLAI can adjust it with you.",
  },
  {
    icon: MapPin,
    title: "Video or the MLAI space",
    body: "Choose one location for your sessions. Founders don't choose; they see where you meet.",
  },
  {
    icon: CalendarClock,
    title: "Away dates",
    body: "Block out holidays and busy weeks so nobody can book them.",
  },
  {
    icon: Video,
    title: "Your calendar",
    body: "Optionally connect your Google Calendar so times you're already busy are skipped.",
  },
];

const BRIEF_FIELDS = [
  ["Stage", "Where the startup is today."],
  ["Biggest struggle", "The one thing they're stuck on."],
  ["Outcome wanted", "What a useful session looks like to them."],
  ["Link (optional)", "A deck, site or doc to look at first."],
] as const;

const POINTS_LIMITS = ["Not money", "Not tradable", "No cash value", "Non-transferable"];

const FAQ_ITEMS: Array<{ question: string; answer: ReactNode }> = [
  {
    question: "How much time does it take?",
    answer:
      "As much as you choose. You set your weekly hours and session length, and you accept or decline every request, so there is no minimum commitment.",
  },
  {
    question: "Does it cost me anything?",
    answer:
      "No. Mentoring is free for mentors. Founders spend Roo Points to book you, and you earn those points once the session is done.",
  },
  {
    question: "How do Roo Points work for mentors?",
    answer: (
      <>
        A request charges the founder nothing. Points are taken from the founder when you
        accept, and they are awarded to you when the session is marked complete (by you,
        or automatically 24 hours after it ends). Roo Points have no cash value.{" "}
        <Link to="/roo" className="font-semibold underline underline-offset-4">
          Read more about Roo Points
        </Link>
        .
      </>
    ),
  },
  {
    question: "Who can book me?",
    answer:
      "Members of the MLAI community signed in to MLAI Chat, with enough Roo Points for your price. They can only pick times inside the hours you set.",
  },
  {
    question: "What if I need to decline or cancel?",
    answer:
      "Decline any request and no points move. You or the founder can cancel an accepted session before it starts, and the founder gets their points back.",
  },
  {
    question: "Can I change my hours or take a break?",
    answer:
      "Yes. Change your weekly hours at any time and add away dates for holidays. Sessions you already accepted stay booked, so cancel those yourself if you can't make them.",
  },
  {
    question: "Who sees a founder's brief?",
    answer:
      "Only you and the founder. For video sessions the meeting link is also shown only to the two of you, and only once you accept.",
  },
  {
    question: "Can I mentor if I'm not in Melbourne?",
    answer:
      "Yes. Set your location to Video and mentor from anywhere. Your hours are in your own timezone.",
  },
];

type SectionCardProps = {
  id: string;
  title: string;
  description?: string;
  className?: string;
  descriptionClassName?: string;
  children: ReactNode;
};

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Mentor at MLAI | MLAI" },
    {
      name: "description",
      content:
        "Mentor founders in the MLAI community with short, focused sessions. Your topics, your hours, your call.",
    },
    { tagName: "link", rel: "canonical", href: "https://mlai.au/mentors" },
  ];
}

function SectionCard({
  id,
  title,
  description,
  className,
  descriptionClassName,
  children,
}: SectionCardProps) {
  return (
    <section
      id={id}
      className={clsx(
        "scroll-mt-28 rounded-[2rem] border p-6 shadow-[0_24px_70px_rgba(17,17,17,0.08)] sm:p-8 lg:p-10",
        className ?? "border-black/5 bg-white text-[var(--brutalist-black)]",
      )}
    >
      <div className="max-w-3xl">
        <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">{title}</h2>
        {description ? (
          <p
            className={clsx(
              "mt-4 text-base leading-8 sm:text-lg",
              descriptionClassName ?? "text-black/65",
            )}
          >
            {description}
          </p>
        ) : null}
      </div>
      <div className="mt-8">{children}</div>
    </section>
  );
}

const primaryButton =
  "inline-flex min-h-16 items-center justify-center rounded-full px-8 py-4 text-center text-lg font-semibold transition-transform duration-200 hover:scale-[1.02] hover:opacity-90";

export default function MentorsPage({}: Route.ComponentProps) {
  const [activeId, setActiveId] = useState<string>(SECTION_ITEMS[0].id);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        }
      },
      { rootMargin: "-20% 0px -65% 0px" },
    );
    for (const section of SECTION_ITEMS) {
      const element = document.getElementById(section.id);
      if (element) observer.observe(element);
    }
    return () => observer.disconnect();
  }, []);

  function scrollToSection(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <main className="bg-[var(--brutalist-beige)] pb-16 pt-20 lg:pt-2">
      <div className="px-4 lg:px-6">
        <section
          id="hero"
          className="scroll-mt-24 relative overflow-hidden rounded-[2rem] bg-[var(--brutalist-black)] text-white shadow-[0_36px_100px_rgba(17,17,17,0.18)] sm:rounded-[2.75rem]"
        >
          <div className="absolute -left-24 -top-20 h-64 w-64 rounded-full bg-[var(--brutalist-mint)]/20 blur-3xl" />
          <div className="absolute right-0 top-12 h-72 w-72 rounded-full bg-[var(--brutalist-purple)]/25 blur-3xl" />
          <div className="absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-[var(--brutalist-blue)]/20 blur-3xl" />

          <div className="relative mx-auto max-w-7xl px-6 py-8 sm:px-10 sm:py-12 lg:px-12 lg:py-14">
            <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(300px,0.95fr)] lg:gap-12">
              <div className="max-w-2xl">
                <div className="inline-flex rounded-full border border-white/12 bg-white/8 px-5 py-2.5 text-sm uppercase tracking-[0.35em] text-white/80 backdrop-blur">
                  MLAI Mentoring
                </div>
                <h1
                  className="mt-8 text-[clamp(3.5rem,10vw,7rem)] leading-[0.92] tracking-tight text-white"
                  style={{ fontFamily: "'Oswald', sans-serif" }}
                >
                  Mentor at MLAI
                </h1>
                <p className="mt-6 max-w-2xl text-2xl font-semibold leading-tight text-white sm:text-3xl">
                  Give founders in the MLAI community short, focused sessions on what
                  they're stuck on. Your topics, your hours, your call.
                </p>
                <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                  <a
                    href={CHAT_MENTORING_URL}
                    className={clsx(primaryButton, "bg-[var(--brutalist-mint)] text-[var(--brutalist-black)]")}
                  >
                    Got an invite? Open MLAI Chat
                  </a>
                  <button
                    type="button"
                    onClick={() => scrollToSection("how-it-works")}
                    className={clsx(primaryButton, "bg-[var(--brutalist-yellow)] text-[var(--brutalist-black)]")}
                  >
                    See how it works
                    <ArrowRight className="ml-3 h-5 w-5" />
                  </button>
                </div>
              </div>

              <div className="grid gap-4">
                <div className="rounded-[1.75rem] bg-[var(--brutalist-mint)] p-6 text-[var(--brutalist-black)] shadow-[0_16px_40px_rgba(0,255,215,0.2)] lg:rotate-[3deg]">
                  <p className="text-xs font-semibold uppercase tracking-[0.35em] text-black/55">
                    New request
                  </p>
                  <p className="mt-3 text-2xl font-semibold leading-tight">
                    "We have 40 pilot users and no idea how to price."
                  </p>
                  <p className="mt-3 text-sm leading-6 text-black/70">
                    Stage: pre-seed. Outcome wanted: a pricing test to run this month.
                  </p>
                </div>
                <div className="rounded-[1.75rem] bg-[var(--brutalist-blue)] p-6 text-white shadow-[0_16px_40px_rgba(53,55,220,0.22)] lg:-rotate-[2deg]">
                  <p className="text-5xl font-bold leading-none">30 min</p>
                  <p className="mt-3 text-lg">on video, Meet link made for you</p>
                </div>
                <div className="rounded-[1.75rem] bg-[var(--brutalist-yellow)] p-6 text-[var(--brutalist-black)] shadow-[0_16px_40px_rgba(254,252,34,0.2)] lg:rotate-[1deg]">
                  <div className="flex flex-wrap gap-3">
                    <span className="rounded-full bg-[var(--brutalist-black)] px-5 py-2 text-base font-semibold text-white">
                      Accept
                    </span>
                    <span className="rounded-full border border-black/20 px-5 py-2 text-base font-semibold">
                      Decline
                    </span>
                  </div>
                  <p className="mt-4 text-base text-black/72">Every request is your call.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <div className="mx-auto mt-6 max-w-7xl px-4 lg:mt-8 lg:px-6">
        <div className="lg:hidden sticky top-16 z-30 mb-6 rounded-[1.5rem] border border-black/10 bg-[var(--brutalist-beige)]/90 p-2 backdrop-blur">
          <Disclosure>
            {({ open, close }) => (
              <>
                <DisclosureButton className="flex w-full items-center justify-between rounded-[1.15rem] bg-[var(--brutalist-black)] px-4 py-3 text-left text-sm font-medium text-white">
                  <span>Jump to section</span>
                  <ChevronDown className={clsx("h-4 w-4 transition-transform", open && "rotate-180")} />
                </DisclosureButton>
                <DisclosurePanel className="mt-2 rounded-[1.15rem] border border-black/10 bg-white p-2">
                  <ul className="space-y-1">
                    {SECTION_ITEMS.map((section) => (
                      <li key={section.id}>
                        <button
                          type="button"
                          onClick={() => {
                            scrollToSection(section.id);
                            close();
                          }}
                          className={clsx(
                            "block w-full rounded-xl px-3 py-2 text-left text-sm transition-colors",
                            activeId === section.id
                              ? "bg-[var(--brutalist-purple)] text-white"
                              : "text-black/70 hover:bg-black/5",
                          )}
                        >
                          {section.label}
                        </button>
                      </li>
                    ))}
                  </ul>
                </DisclosurePanel>
              </>
            )}
          </Disclosure>
        </div>

        <div className="grid items-start gap-8 xl:grid-cols-[minmax(0,1fr)_240px]">
          <div className="space-y-6">
            <SectionCard
              id="mentoring-20-seconds"
              title="Mentoring in 20 seconds"
              description="MLAI mentoring is short, booked sessions between experienced people and founders in the community, run through MLAI Chat."
              className="border-black/6 bg-[linear-gradient(180deg,var(--brutalist-beige)_0%,var(--brutalist-beige-dark)_100%)] text-[var(--brutalist-black)]"
            >
              <div className="grid gap-4 md:grid-cols-3">
                {QUICK_FACTS.map((fact) => {
                  const Icon = fact.icon;
                  return (
                    <article
                      key={fact.title}
                      className={clsx("rounded-[1.8rem] border p-6", fact.className)}
                    >
                      <div className={clsx("flex h-11 w-11 items-center justify-center rounded-2xl", fact.iconClassName)}>
                        <Icon className="h-5 w-5" />
                      </div>
                      <h3 className="mt-5 text-2xl font-semibold leading-tight tracking-tight">
                        {fact.title}
                      </h3>
                      <p className="mt-4 text-base leading-7 opacity-85">{fact.body}</p>
                    </article>
                  );
                })}
              </div>
            </SectionCard>

            <SectionCard
              id="how-it-works"
              title="How it works for mentors"
              description="From invite to first session in seven steps."
              className="border-black/6 bg-[var(--brutalist-black)] text-white"
              descriptionClassName="text-white/70"
            >
              <ol className="space-y-4">
                {MENTOR_STEPS.map((step, index) => (
                  <li key={step} className="flex gap-4">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--brutalist-mint)] text-base font-bold text-[var(--brutalist-black)]">
                      {index + 1}
                    </span>
                    <p className="pt-1.5 text-base leading-7 text-white/80 sm:text-lg">{step}</p>
                  </li>
                ))}
              </ol>
            </SectionCard>

            <SectionCard
              id="you-control"
              title="What you control"
              description="You decide how much mentoring fits around your work, and you can change it whenever you like."
            >
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {CONTROLS.map((item) => {
                  const Icon = item.icon;
                  return (
                    <article
                      key={item.title}
                      className="rounded-[1.5rem] border border-black/8 bg-[var(--brutalist-beige)] p-5"
                    >
                      <Icon className="h-5 w-5 text-[var(--brutalist-purple)]" />
                      <h3 className="mt-3 text-lg font-semibold">{item.title}</h3>
                      <p className="mt-2 text-base leading-7 text-black/70">{item.body}</p>
                    </article>
                  );
                })}
              </div>
            </SectionCard>

            <SectionCard
              id="founders-bring"
              title="What founders bring"
              description="Every request comes with a short brief, so you can tell at a glance whether you're the right person to help."
            >
              <dl className="grid gap-4 sm:grid-cols-2">
                {BRIEF_FIELDS.map(([label, body]) => (
                  <div key={label} className="rounded-[1.5rem] bg-[var(--brutalist-mint)]/20 p-5">
                    <dt className="text-lg font-semibold">{label}</dt>
                    <dd className="mt-2 text-base leading-7 text-black/70">{body}</dd>
                  </div>
                ))}
              </dl>
            </SectionCard>

            <SectionCard
              id="roo-points"
              title="Roo Points"
              description="Founders book you with Roo Points, MLAI's contribution points. They are not money."
              className="border-black/6 bg-[var(--brutalist-yellow)] text-[var(--brutalist-black)]"
              descriptionClassName="text-black/70"
            >
              <div className="flex flex-wrap gap-2">
                {POINTS_LIMITS.map((limit) => (
                  <span key={limit} className="rounded-full bg-black/10 px-4 py-2 text-sm font-semibold">
                    {limit}
                  </span>
                ))}
              </div>
              <p className="mt-6 max-w-3xl text-base leading-8 text-black/75 sm:text-lg">
                A request costs the founder nothing. Points move when you accept, and they
                land with you once the session is complete. You can spend them on
                coworking, events and merch like any other Roo Points.
              </p>
              <Link
                to="/roo"
                className="mt-6 inline-flex items-center rounded-full bg-[var(--brutalist-black)] px-6 py-3 text-base font-semibold text-white hover:opacity-90"
              >
                Meet Roo
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </SectionCard>

            <SectionCard
              id="got-an-invite"
              title="Got an invite?"
              description="Open the email from MLAI and press Accept Invite. Sign in with the address the invite was sent to."
              className="border-black/6 bg-[var(--brutalist-mint)] text-[var(--brutalist-black)]"
              descriptionClassName="text-black/75"
            >
              <p className="max-w-3xl text-base leading-8 text-black/75">
                Invites work for 14 days and only for the email address they were sent to.
                If yours has expired, reply to the invite email and we'll send a new one.
              </p>
              <a
                href={CHAT_MENTORING_URL}
                className="mt-6 inline-flex items-center rounded-full bg-[var(--brutalist-black)] px-6 py-3 text-base font-semibold text-white hover:opacity-90"
              >
                Open MLAI Chat
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </SectionCard>

            <SectionCard
              id="no-invite"
              title="Want to mentor but have no invite?"
              description="Mentoring is invite only for now. If you'd like to help founders, tell us a little about yourself and what you could mentor on."
            >
              <div className="flex flex-col gap-4 sm:flex-row">
                <a
                  href={MENTOR_INTEREST_MAILTO}
                  className="inline-flex items-center justify-center rounded-full bg-[var(--brutalist-purple)] px-6 py-3 text-base font-semibold text-white hover:opacity-90"
                >
                  <Mail className="mr-2 h-4 w-4" />
                  Tell us about yourself
                </a>
              </div>
              <div className="mt-8 rounded-[1.5rem] border border-black/8 bg-[var(--brutalist-beige)] p-5">
                <h3 className="text-lg font-semibold">Looking for a mentor instead?</h3>
                <p className="mt-2 text-base leading-7 text-black/70">
                  Founders can browse mentors and request a session in MLAI Chat.
                </p>
                <a
                  href={CHAT_MENTORING_URL}
                  className="mt-4 inline-flex items-center text-base font-semibold underline underline-offset-4"
                >
                  Find a mentor in MLAI Chat
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </div>
            </SectionCard>

            <SectionCard id="faq" title="FAQ">
              <div className="space-y-3">
                {FAQ_ITEMS.map((item, index) => (
                  <Disclosure key={item.question} defaultOpen={index === 0}>
                    {({ open }) => (
                      <div className="overflow-hidden rounded-[1.4rem] border border-black/8 bg-[var(--brutalist-beige)] text-[var(--brutalist-black)]">
                        <DisclosureButton className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left">
                          <span className="text-lg font-semibold">{item.question}</span>
                          <ChevronDown
                            className={clsx(
                              "h-5 w-5 shrink-0 text-black/55 transition-transform",
                              open && "rotate-180",
                            )}
                          />
                        </DisclosureButton>
                        <DisclosurePanel className="border-t border-black/8 px-5 py-5 text-base leading-7 text-black/70">
                          {item.answer}
                        </DisclosurePanel>
                      </div>
                    )}
                  </Disclosure>
                ))}
              </div>
            </SectionCard>
          </div>

          <aside className="hidden xl:block xl:sticky xl:top-24">
            <nav
              aria-label="Mentor page sections"
              className="rounded-[2rem] border border-black/6 bg-white px-5 py-6 shadow-[0_20px_55px_rgba(17,17,17,0.08)]"
            >
              <p className="px-3 text-xs font-semibold uppercase tracking-[0.35em] text-[var(--brutalist-purple)]">
                Jump to
              </p>
              <ul className="mt-4 space-y-1.5">
                {SECTION_ITEMS.map((section) => (
                  <li key={section.id}>
                    <button
                      type="button"
                      onClick={() => scrollToSection(section.id)}
                      className={clsx(
                        "block w-full rounded-full px-4 py-2.5 text-left text-[15px] leading-5 transition-colors",
                        activeId === section.id
                          ? "bg-[var(--brutalist-black)] text-white"
                          : "text-black/68 hover:bg-[var(--brutalist-beige)]",
                      )}
                    >
                      {section.label}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>
        </div>
      </div>
    </main>
  );
}
