import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/react";
import clsx from "clsx";
import {
  ArrowRight,
  Bot,
  ChevronDown,
  Clock3,
  Gift,
  MessageCircle,
  ShieldCheck,
  Sparkles,
  Users,
  Wallet,
  type LucideIcon,
} from "lucide-react";
import { useEffect, useState, type CSSProperties, type ReactNode } from "react";
import type { Route } from "./+types/roo";

const SLACK_INVITE_URL =
  "https://join.slack.com/t/mlai-aus/shared_invite/zt-36v55lk77-LbIvbAPH~9E83zEgXlXRSg";
const ROO_IMAGE_URL =
  "https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/Roo_MLAI.png?alt=media&token=10e962dd-6636-4dcc-9b49-9de4c62ebc82";
const ROO_AT_A_GLANCE_IMAGE_URL =
  "https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/Untitled%20design%20(12)%20(1).png?alt=media&token=95da4819-0802-49f2-8f4a-533b268ac2f9";
const ROO_POINTS_CARD_IMAGE_URL =
  "https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/Untitled%20design%20(10)%20(1).jpg?alt=media&token=16a8529b-4dde-4fb4-9eca-06f5fe1a21f9";

const SECTION_ITEMS = [
  { id: "hero", label: "Meet Roo" },
  { id: "roo-20-seconds", label: "Roo in 20 seconds" },
  { id: "roo-points", label: "What are Roo Points?" },
  { id: "how-it-works", label: "How it works" },
  { id: "first-points", label: "Get first points" },
  { id: "volunteer-work", label: "Volunteer work" },
  { id: "rewards", label: "Rewards" },
  { id: "slack-commands", label: "Slack commands" },
  { id: "pilot-rules", label: "Pilot rules" },
  { id: "faq", label: "FAQ" },
] as const;

const QUICK_FACTS: Array<{
  icon: LucideIcon;
  title: string;
  body: string;
  cardClassName: string;
  iconClassName: string;
  dotClassName: string;
  shadow: string;
  desktopClassName: string;
}> = [
  {
    icon: MessageCircle,
    title: "Roo lives in Slack",
    body: "Use Roo where the MLAI community already hangs out. Check points, view rewards, book coworking, and ask for perks without leaving Slack.",
    cardClassName:
      "border-[var(--brutalist-mint)]/45 bg-[var(--brutalist-mint)]/20 text-[var(--brutalist-black)]",
    iconClassName: "bg-white/45 text-[var(--brutalist-black)]",
    dotClassName: "bg-[var(--brutalist-mint)]/55",
    shadow:
      "0 0 0 1px rgba(0,255,215,0.28), 0 28px 70px rgba(0,255,215,0.12)",
    desktopClassName: "left-2 top-10 z-20 w-[16rem] xl:left-6 xl:top-10 xl:w-[18rem]",
  },
  {
    icon: Bot,
    title: "Roo handles the admin",
    body: "Roo helps members and the MLAI Team manage approvals, requests, and reward flows behind the scenes.",
    cardClassName:
      "border-[var(--brutalist-blue)]/45 bg-[var(--brutalist-blue)]/78 text-white",
    iconClassName: "bg-white/16 text-white",
    dotClassName: "bg-white/45",
    shadow:
      "0 0 0 1px rgba(53,55,220,0.24), 0 24px 64px rgba(53,55,220,0.18)",
    desktopClassName:
      "left-1/2 top-[13.5rem] z-30 w-[14rem] -translate-x-1/2 xl:top-[13.75rem] xl:w-[15rem]",
  },
  {
    icon: Sparkles,
    title: "More Roo skills are coming",
    body: "Today Roo is mostly about points, rewards, coworking, and requests. More MLAI helper skills are on the way.",
    cardClassName:
      "border-[var(--brutalist-purple)]/45 bg-[var(--brutalist-purple)]/16 text-[var(--brutalist-black)]",
    iconClassName: "bg-[var(--brutalist-purple)]/18 text-[var(--brutalist-purple)]",
    dotClassName: "bg-[var(--brutalist-purple)]/45",
    shadow:
      "0 0 0 1px rgba(75,13,179,0.24), 0 28px 70px rgba(75,13,179,0.12)",
    desktopClassName: "right-2 top-10 z-20 w-[16rem] xl:right-6 xl:top-10 xl:w-[18rem]",
  },
];

const POINTS_LIMITS = [
  "Not money",
  "Not tradable",
  "No cash value",
  "Non-transferable",
];

const FIRST_POINTS_ACTIONS = [
  {
    points: "+2",
    title: "Introduce yourself in #_start-here",
    body: "Share who you are, what you are building or learning, and how you would like to get involved.",
  },
  {
    points: "+1",
    title: "Support founders in #link-love",
    body: "Like, comment, repost, or otherwise amplify meaningfully, then confirm in-thread so the help is visible.",
  },
  {
    points: "+10",
    title: "Share your monthly startup update",
    body: "One meaningful update per month keeps the community loop active and helps people see where they can help.",
  },
  {
    points: "Varies",
    title: "Volunteer at an event or on a task",
    body: "Points vary by task, time, and responsibility. Organised work is the main path to earning bigger amounts.",
  },
];

const VOLUNTEER_TASKS = [
  "Event setup and pack-down",
  "Registration and front desk support",
  "Helping run workshops",
  "Giving talks",
  "Writing docs, tutorials, grants, or research deliverables",
];

const APPROVAL_STEPS = [
  "A lead or MLAI Team member posts or assigns the task.",
  "You do the work.",
  "You tag @Roo and the relevant MLAI Team member.",
  "You ask for X points for Y.",
  "They approve it.",
  "Roo logs the award.",
];

const REWARD_GROUPS = [
  {
    title: "Coworking",
    className: "bg-[var(--brutalist-yellow)] text-[var(--brutalist-black)]",
    items: [["4 points", "1 hot-desk day"]],
  },
  {
    title: "Advice and support",
    className: "bg-[var(--brutalist-blue)] text-white",
    items: [
      ["12 points", "30 min office hours"],
      ["24 points", "60-90 min deep dive mentoring"],
    ],
  },
  {
    title: "Events",
    className: "bg-[var(--brutalist-orange)] text-white",
    items: [
      ["12 points", "Free community event ticket"],
      ["30 points", "50% off paid workshop"],
      ["48 points", "Free workshop ticket"],
    ],
  },
  {
    title: "Merch",
    className: "bg-[var(--brutalist-mint)] text-[var(--brutalist-black)]",
    items: [
      ["1 point", "Sticker"],
      ["5 points", "Sunglasses"],
      ["7 points", "Mug"],
      ["12 points", "T-shirt"],
    ],
  },
];

const SLACK_COMMANDS = [
  "@Roo points",
  "@Roo points earn",
  "@Roo points rewards",
  "@Roo coworking book today",
  "@Roo coworking cancel",
];

const FAQ_ITEMS: Array<{ question: string; answer: ReactNode }> = [
  {
    question: "What's the difference between Roo and Roo Points?",
    answer: (
      <>
        <code>Roo</code> is the MLAI helper in Slack. <code>Roo Points</code> are the
        contribution points Roo helps track, award, and redeem.
      </>
    ),
  },
  {
    question: "Are Roo Points money?",
    answer: (
      <>
        No. Roo Points are an internal thank-you system for MLAI. They are not money,
        not tradable, and have no cash value.
      </>
    ),
  },
  {
    question: "Can I transfer or sell points?",
    answer: (
      <>
        No. Roo Points are non-transferable and stay attached to the member who earned
        them.
      </>
    ),
  },
  {
    question: "What's the fastest way to earn my first points?",
    answer: (
      <>
        Start with <code>#_start-here</code> for a quick +2, then support founders in
        {" "}
        <code>#link-love</code> in a real way. A few meaningful actions can get you to
        your first reward quickly.
      </>
    ),
  },
  {
    question: "How do I claim points after volunteering?",
    answer: (
      <>
        Tag <code>@Roo</code> and the relevant MLAI Team member in Slack, ask for{" "}
        <code>X points for Y</code>, and include a short summary or link when relevant.
      </>
    ),
  },
  {
    question: "Who approves my points?",
    answer: (
      <>
        Organised work is approved by an MLAI Team member or the relevant lead for that
        task.
      </>
    ),
  },
  {
    question: "What's the difference between spendable balance and lifetime points?",
    answer: (
      <>
        Spendable balance is what you can use right now. Lifetime points track your
        total contribution history over time.
      </>
    ),
  },
  {
    question: "Can Roo Points help me progress in MLAI?",
    answer: (
      <>
        Yes. Your lifetime Roo Points history can help MLAI notice trust, consistency,
        and follow-through over time. That can support opportunities like hosting
        events, joining the MLAI Team, or being considered for paid work when relevant
        roles exist, but points do not automatically guarantee any of those outcomes.
      </>
    ),
  },
  {
    question: "What happens if a reward is unavailable?",
    answer: (
      <>
        Some rewards are capacity-limited. Roo can offer a waitlist or the next best
        option when something is full or temporarily unavailable.
      </>
    ),
  },
  {
    question: "Can points be removed?",
    answer: (
      <>
        Yes. Clear gaming, spam, or mistaken awards can be denied or reversed, and the
        pilot keeps a log of changes.
      </>
    ),
  },
  {
    question: "Where do I give feedback?",
    answer: (
      <>
        Share feedback with the MLAI Team in Slack. Roo is a pilot, so feedback helps
        shape what changes next.
      </>
    ),
  },
];

type SectionCardProps = {
  id: string;
  title: string;
  description?: string;
  className?: string;
  titleClassName?: string;
  descriptionClassName?: string;
  children: ReactNode;
};

type QuickFactCardProps = {
  fact: (typeof QUICK_FACTS)[number];
  className?: string;
  style?: CSSProperties;
};

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Meet Roo | MLAI" },
    {
      name: "description",
      content:
        "Meet Roo, the MLAI Slack helper for getting involved, earning Roo Points, and unlocking community perks.",
    },
    { tagName: "link", rel: "canonical", href: "https://mlai.au/roo" },
  ];
}

function SectionCard({
  id,
  title,
  description,
  className,
  titleClassName,
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
        <h2
          className={clsx(
            "text-3xl font-semibold tracking-tight sm:text-4xl",
            titleClassName ?? "text-current",
          )}
        >
          {title}
        </h2>
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

function QuickFactCard({ fact, className, style }: QuickFactCardProps) {
  const Icon = fact.icon;

  return (
    <article
      className={clsx(
        "relative overflow-hidden rounded-[1.8rem] border p-5 backdrop-blur-md sm:p-6",
        fact.cardClassName,
        className,
      )}
      style={style}
    >
      <div className="flex items-start justify-between gap-4">
        <div
          className={clsx(
            "flex h-11 w-11 items-center justify-center rounded-2xl",
            fact.iconClassName,
          )}
        >
          <Icon className="h-5 w-5" />
        </div>
        <div className="grid grid-cols-3 gap-1.5">
          {Array.from({ length: 6 }).map((_, index) => (
            <span
              key={`${fact.title}-dot-${index}`}
              className={clsx("h-1.5 w-1.5 rounded-full", fact.dotClassName)}
            />
          ))}
        </div>
      </div>

      <h3 className="mt-5 text-[1.9rem] font-semibold leading-[1.05] tracking-tight">
        {fact.title}
      </h3>
      <p className="mt-4 text-base leading-7 opacity-85">{fact.body}</p>
    </article>
  );
}

export default function RooPage({}: Route.ComponentProps) {
  const [activeId, setActiveId] = useState<string>(SECTION_ITEMS[0].id);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
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
          <div className="absolute right-0 top-12 h-72 w-72 rounded-full bg-[var(--brutalist-orange)]/15 blur-3xl" />
          <div className="absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-[var(--brutalist-blue)]/20 blur-3xl" />

          <div className="relative mx-auto max-w-7xl px-6 py-8 sm:px-10 sm:py-12 lg:px-12 lg:py-14">
            <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1.02fr)_minmax(320px,0.98fr)] lg:gap-12">
              <div className="max-w-2xl">
                <div className="inline-flex rounded-full border border-white/12 bg-white/8 px-5 py-2.5 text-sm uppercase tracking-[0.35em] text-white/80 backdrop-blur">
                  Roo Rewards
                </div>

                <h1
                  className="mt-8 text-[clamp(4rem,11vw,7.5rem)] leading-[0.92] tracking-tight text-white"
                  style={{ fontFamily: "'Oswald', sans-serif" }}
                >
                  Meet Roo
                </h1>

                <p className="mt-6 max-w-2xl text-3xl font-semibold leading-tight text-white sm:text-4xl">
                  Your MLAI sidekick for getting involved, earning Roo Points, and
                  unlocking community perks.
                </p>

                <p className="mt-6 max-w-2xl text-lg leading-8 text-white/72 sm:text-xl">
                  Help the community, earn points for meaningful contributions, and spend
                  them on coworking, events, mentoring, merch, and more, all through
                  Slack.
                </p>

                <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                  <a
                    href={SLACK_INVITE_URL}
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="inline-flex min-h-16 items-center justify-center rounded-full bg-[var(--brutalist-orange)] px-8 py-4 text-center text-lg font-semibold text-white transition-transform duration-200 hover:scale-[1.02] hover:opacity-90"
                  >
                    Try @Roo points in Slack
                  </a>
                  <button
                    type="button"
                    onClick={() => scrollToSection("first-points")}
                    className="inline-flex min-h-16 items-center justify-center rounded-full bg-[var(--brutalist-yellow)] px-8 py-4 text-center text-lg font-semibold text-[var(--brutalist-black)] transition-transform duration-200 hover:scale-[1.02] hover:opacity-90"
                  >
                    See how to earn your first points
                    <ArrowRight className="ml-3 h-5 w-5" />
                  </button>
                </div>
              </div>

              <div>
                <div className="grid gap-4 lg:hidden">
                  <div className="rounded-[1.75rem] bg-[var(--brutalist-mint)] p-5 text-[var(--brutalist-black)] shadow-[0_16px_40px_rgba(0,255,215,0.2)]">
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-black/55">
                          Slack command
                        </p>
                        <div className="mt-3 inline-flex rounded-[1.25rem] bg-black/10 px-4 py-3 text-xl font-semibold">
                          <code>@Roo points</code>
                        </div>
                        <p className="mt-3 text-sm leading-6 text-black/70">
                          Start with the simplest command and let Roo guide the rest.
                        </p>
                      </div>
                      <div className="flex h-20 w-20 items-center justify-center rounded-[1.5rem] bg-white/35">
                        <img
                          src={ROO_IMAGE_URL}
                          alt="Roo mascot"
                          className="h-16 w-16 object-contain"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="rounded-[1.75rem] bg-[var(--brutalist-orange)] p-5 text-white shadow-[0_16px_40px_rgba(255,61,0,0.22)]">
                    <p className="text-5xl font-bold leading-none">+40</p>
                    <p className="mt-3 text-lg">for helping at an event</p>
                  </div>

                  <div className="rounded-[1.75rem] bg-[var(--brutalist-yellow)] p-5 text-[var(--brutalist-black)] shadow-[0_16px_40px_rgba(254,252,34,0.2)]">
                    <p className="text-xs font-semibold uppercase tracking-[0.35em] text-black/60">
                      Unlocked
                    </p>
                    <p className="mt-4 text-3xl font-semibold leading-tight">
                      Coworking day pass
                    </p>
                    <p className="mt-3 text-base text-black/72">
                      Redeem it with Roo Points when you are ready to drop in.
                    </p>
                  </div>
                </div>

                <div className="relative hidden min-h-[520px] lg:block">
                  <div className="absolute left-1/2 top-4 z-10 w-[330px] -translate-x-[12%] rotate-[8deg] rounded-[2rem] bg-[var(--brutalist-mint)] p-6 text-[var(--brutalist-black)] shadow-[0_16px_48px_rgba(0,255,215,0.22)]">
                    <p className="text-xs font-semibold uppercase tracking-[0.35em] text-black/55">
                      Slack command
                    </p>
                    <div className="mt-6 rounded-[1.4rem] bg-black/10 px-6 py-5 text-4xl font-semibold">
                      <code>@Roo points</code>
                    </div>
                    <p className="mt-5 text-lg text-black/70">Start here</p>
                  </div>

                  <div className="absolute left-1/2 top-44 z-20 w-[360px] -translate-x-[40%] -rotate-[10deg] rounded-[2rem] bg-[var(--brutalist-orange)] p-8 text-white shadow-[0_18px_56px_rgba(255,61,0,0.22)]">
                    <p className="text-7xl font-bold leading-none">+40</p>
                    <p className="mt-4 text-[2rem] font-medium leading-tight">
                      for helping at an event
                    </p>
                  </div>

                  <div className="absolute bottom-4 left-1/2 z-30 w-[360px] translate-x-[4%] -rotate-[8deg] rounded-[2rem] bg-[var(--brutalist-yellow)] p-8 text-[var(--brutalist-black)] shadow-[0_18px_56px_rgba(254,252,34,0.2)]">
                    <p className="text-xs font-semibold uppercase tracking-[0.35em] text-black/60">
                      Unlocked
                    </p>
                    <p className="mt-5 text-5xl font-semibold leading-none">
                      Coworking day pass
                    </p>
                    <p className="mt-5 text-2xl leading-tight text-black/74">
                      Redeem with Roo Points
                    </p>
                  </div>
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
                  <ChevronDown
                    className={clsx("h-4 w-4 transition-transform", open && "rotate-180")}
                  />
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
              id="roo-20-seconds"
              title="Roo in 20 seconds"
              description="Roo is the MLAI helper in Slack. Roo Points are the contribution system Roo helps manage."
              className="overflow-hidden border-black/6 bg-[linear-gradient(180deg,var(--brutalist-beige)_0%,var(--brutalist-beige-dark)_100%)] text-[var(--brutalist-black)]"
            >
              <div className="relative h-[32rem] sm:h-[33rem] md:h-[34rem] xl:h-[34.5rem]">
                <div className="pointer-events-none absolute inset-x-12 bottom-3 h-18 rounded-full bg-[var(--brutalist-mint)]/12 blur-3xl" />
                <div className="pointer-events-none absolute inset-x-20 bottom-4 h-16 rounded-full bg-[var(--brutalist-purple)]/10 blur-3xl" />
                <div className="pointer-events-none absolute left-1/2 bottom-[7.5rem] h-44 w-[16rem] -translate-x-1/2 rounded-full bg-[var(--brutalist-blue)]/20 blur-[88px] sm:bottom-[7.75rem] sm:h-48 sm:w-[18rem] md:bottom-[8rem] md:h-52 md:w-[20rem] xl:bottom-[8.25rem] xl:h-56 xl:w-[22rem]" />

                <div className="pointer-events-none absolute left-1/2 bottom-[13rem] z-10 -translate-x-1/2 sm:bottom-[13.25rem] md:bottom-[13.5rem] xl:bottom-[13.75rem]">
                  <img
                    src={ROO_AT_A_GLANCE_IMAGE_URL}
                    alt="Roo kangaroo wearing sunglasses"
                    className="h-[18rem] w-auto object-contain sm:h-[20rem] md:h-[21rem] xl:h-[22rem]"
                  />
                </div>

                <div className="absolute left-0 top-[0.25rem] z-20 w-full max-w-[11.5rem] sm:left-3 sm:top-[0.5rem] sm:max-w-[13rem] md:left-5 md:top-[0.75rem] md:max-w-[15.5rem] xl:max-w-[16.5rem]">
                  <QuickFactCard fact={QUICK_FACTS[0]} style={{ boxShadow: QUICK_FACTS[0].shadow }} />
                </div>
                <div className="absolute right-0 top-[0.25rem] z-20 w-full max-w-[11.5rem] sm:right-3 sm:top-[0.5rem] sm:max-w-[13rem] md:right-5 md:top-[0.75rem] md:max-w-[15.5rem] xl:max-w-[16.5rem]">
                  <QuickFactCard fact={QUICK_FACTS[2]} style={{ boxShadow: QUICK_FACTS[2].shadow }} />
                </div>
                <div className="absolute left-1/2 top-[12.5rem] z-30 w-[11.5rem] -translate-x-1/2 sm:top-[13rem] sm:w-[13rem] md:top-[13.5rem] md:w-[14rem] xl:top-[13.75rem] xl:w-[14.5rem]">
                  <QuickFactCard fact={QUICK_FACTS[1]} style={{ boxShadow: QUICK_FACTS[1].shadow }} />
                </div>
              </div>
            </SectionCard>

            <SectionCard
              id="roo-points"
              title="What are Roo Points?"
              description="Roo Points are MLAI's internal thank-you system for meaningful contributions. They are designed to recognise useful work and turn it into community perks."
            >
              <div className="rounded-[1.7rem] bg-[var(--brutalist-black)] p-6 text-white sm:p-7 lg:p-8">
                <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[var(--brutalist-mint)]">
                  Important limits
                </p>
                <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                  {POINTS_LIMITS.map((item) => (
                    <div
                      key={item}
                      className="rounded-[1.1rem] border border-white/10 bg-white/6 px-4 py-3 text-sm font-medium text-white/86"
                    >
                      {item}
                    </div>
                  ))}
                </div>

                <div className="mt-6 rounded-[1.35rem] border border-white/10 bg-white/6 p-5 sm:p-6">
                  <div className="flex items-start gap-3">
                    <Clock3 className="mt-1 h-5 w-5 shrink-0 text-[var(--brutalist-yellow)]" />
                    <div className="max-w-3xl">
                      <p className="text-lg font-semibold sm:text-xl">
                        About 1 Roo Point = 10 minutes of meaningful contribution
                      </p>
                      <p className="mt-2 text-sm leading-6 text-white/70 sm:text-base">
                        The AUD comparison is only a behind-the-scenes planning guide for
                        MLAI. It is not a public exchange rate and should not be treated
                        like one.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 grid gap-4 md:grid-cols-2">
                <div className="rounded-[1.5rem] border border-[var(--brutalist-mint)]/20 bg-[var(--brutalist-mint)] p-6 text-[var(--brutalist-black)]">
                  <div className="flex items-center gap-3">
                    <Wallet className="h-5 w-5 text-[var(--brutalist-black)]" />
                    <h3 className="text-xl font-semibold text-[var(--brutalist-black)]">
                      Spendable balance
                    </h3>
                  </div>
                  <p className="mt-3 text-base leading-7 text-black/72">
                    What you can use right now on coworking, event tickets, office hours,
                    merch, and other Roo-managed perks.
                  </p>
                </div>

                <div className="rounded-[1.5rem] border border-[var(--brutalist-blue)]/15 bg-[var(--brutalist-blue)] p-6 text-white">
                  <div className="flex items-center gap-3">
                    <ShieldCheck className="h-5 w-5 text-white" />
                    <h3 className="text-xl font-semibold text-white">
                      Lifetime points
                    </h3>
                  </div>
                  <p className="mt-3 text-base leading-7 text-white/78">
                    Your long-term contribution history. This running record helps MLAI
                    see who has been consistently helpful, reliable, and ready for more
                    responsibility over time.
                  </p>
                </div>
              </div>

              <div className="mt-4 rounded-[1.5rem] border border-black/8 bg-[var(--brutalist-yellow)] p-6 text-[var(--brutalist-black)]">
                <div className="flex items-start gap-3">
                  <Sparkles className="mt-1 h-5 w-5 shrink-0 text-[var(--brutalist-purple)]" />
                  <div className="max-w-4xl">
                    <h3 className="text-xl font-semibold tracking-tight">
                      How Roo Points help you progress
                    </h3>
                    <p className="mt-3 text-base leading-7 text-black/72">
                      Earned Roo Points, especially your lifetime points history, help
                      MLAI see trust, consistency, and contribution over time. That can
                      support opportunities to take on more responsibility, host your own
                      events, step into MLAI Team roles, and be considered for paid work
                      when relevant roles exist.
                    </p>
                    <p className="mt-4 text-sm leading-6 text-black/62">
                      Roo Points support these decisions, but they do not automatically
                      guarantee a role, event ownership, or paid work.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-4 overflow-hidden rounded-[1.5rem] border border-black/8 bg-[var(--brutalist-beige)]">
                <img
                  src={ROO_POINTS_CARD_IMAGE_URL}
                  alt="Roo Points community rewards illustration"
                  className="block h-auto w-full"
                />
              </div>
            </SectionCard>

            <SectionCard
              id="how-it-works"
              title="How it works"
              description="Help out. Get recognised. Spend your points. The loop should feel simple from day one."
              className="border-black/6 bg-[var(--brutalist-beige)] text-[var(--brutalist-black)]"
              descriptionClassName="text-black/68"
            >
              <div className="grid gap-4 lg:grid-cols-3">
                {[
                  {
                    step: "01",
                    title: "Help out",
                    body: "Post an intro, support founders, share an update, or volunteer for a task that helps the community move.",
                    cardClassName: "bg-[var(--brutalist-yellow)] text-[var(--brutalist-black)]",
                  },
                  {
                    step: "02",
                    title: "Get recognised",
                    body: "Some actions may be auto-recognised. For organised volunteering, tag @Roo and an MLAI Team member and ask for X points for doing Y.",
                    cardClassName: "bg-[var(--brutalist-black)] text-white",
                  },
                  {
                    step: "03",
                    title: "Spend your points",
                    body: "Use Roo in Slack to book coworking, redeem rewards, or request community perks when you are ready.",
                    cardClassName: "bg-[var(--brutalist-mint)] text-[var(--brutalist-black)]",
                  },
                ].map((item) => (
                  <div
                    key={item.step}
                    className={clsx("rounded-[1.6rem] p-6 shadow-[0_20px_50px_rgba(17,17,17,0.14)]", item.cardClassName)}
                  >
                    <div className="inline-flex rounded-full bg-black/10 px-3 py-1 text-sm font-semibold tracking-[0.25em]">
                      {item.step}
                    </div>
                    <h3 className="mt-5 text-2xl font-semibold tracking-tight">
                      {item.title}
                    </h3>
                    <p className="mt-4 text-base leading-7 opacity-80">{item.body}</p>
                  </div>
                ))}
              </div>
            </SectionCard>

            <SectionCard
              id="first-points"
              title="Get your first Roo Points fast"
              description="The fastest onboarding path is small, useful, visible contribution. Roo Points are supposed to reward momentum, not busywork."
              className="border-black/5 bg-[var(--brutalist-black)] text-white"
              descriptionClassName="text-white/72"
            >
              <div className="grid gap-4 lg:grid-cols-2">
                {FIRST_POINTS_ACTIONS.map((item, index) => (
                  <article
                    key={item.title}
                    className={clsx(
                      "rounded-[1.6rem] border p-6 shadow-[0_18px_48px_rgba(17,17,17,0.18)]",
                      index === 0
                        ? "border-[var(--brutalist-mint)]/25 bg-[var(--brutalist-mint)] text-[var(--brutalist-black)]"
                        : index === 1
                          ? "border-[var(--brutalist-blue)]/25 bg-[var(--brutalist-blue)] text-white"
                          : index === 2
                            ? "border-[var(--brutalist-orange)]/25 bg-[var(--brutalist-orange)] text-white"
                            : "border-[var(--brutalist-yellow)]/20 bg-[var(--brutalist-yellow)] text-[var(--brutalist-black)]",
                    )}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <h3 className="text-2xl font-semibold tracking-tight">{item.title}</h3>
                      <div className="rounded-full bg-white/10 px-4 py-1.5 text-sm font-semibold">
                        {item.points}
                      </div>
                    </div>
                    <p
                      className={clsx(
                        "mt-4 text-base leading-7",
                        index === 0 || index === 3 ? "text-black/72" : "text-white/78",
                      )}
                    >
                      {item.body}
                    </p>
                  </article>
                ))}
              </div>

              <div className="mt-6 rounded-[1.6rem] border border-[var(--brutalist-crimson)]/30 bg-[var(--brutalist-crimson)] p-6 text-white">
                <p className="text-xs font-semibold uppercase tracking-[0.35em] text-white/80">
                  First reward shortcut
                </p>
                <p className="mt-4 text-xl leading-8 text-white/90">
                  A quick example: your intro in <code>#_start-here</code> gets you +2.
                  A few meaningful founder boosts in <code>#link-love</code> can push you
                  to your first reward tier fast.
                </p>
              </div>
            </SectionCard>

            <SectionCard
              id="volunteer-work"
              title="Volunteer work is the main way to earn"
              description="Small actions help people get started. Organised volunteer work is where Roo Points become a serious community recognition system."
              className="border-black/6 bg-[var(--brutalist-beige)] text-[var(--brutalist-black)]"
              descriptionClassName="text-black/68"
            >
              <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
                <div className="rounded-[1.65rem] border border-black/6 bg-[var(--brutalist-beige-dark)] p-6 text-[var(--brutalist-black)]">
                  <div className="flex items-center gap-3">
                    <Users className="h-5 w-5 text-[var(--brutalist-purple)]" />
                    <h3 className="text-2xl font-semibold tracking-tight">
                      Typical volunteer work
                    </h3>
                  </div>
                  <div className="mt-5 flex flex-wrap gap-3">
                    {VOLUNTEER_TASKS.map((task) => (
                      <div
                        key={task}
                        className="rounded-full border border-black/8 bg-white/70 px-4 py-2 text-sm text-black/78"
                      >
                        {task}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-[1.65rem] border border-white/12 bg-[var(--brutalist-black)] p-6 text-white">
                  <div className="flex items-center gap-3">
                    <ShieldCheck className="h-5 w-5 text-[var(--brutalist-mint)]" />
                    <h3 className="text-2xl font-semibold tracking-tight">
                      How approval works
                    </h3>
                  </div>
                  <ol className="mt-5 space-y-4">
                    {APPROVAL_STEPS.map((step, index) => (
                      <li key={step} className="flex gap-4">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/10 text-sm font-semibold text-white">
                          {index + 1}
                        </div>
                        <p className="pt-1 text-base leading-7 text-white/78">{step}</p>
                      </li>
                    ))}
                  </ol>
                  <div className="mt-6 rounded-[1.3rem] border border-white/12 bg-white/6 p-4 text-sm leading-6 text-white/72">
                    Include a short summary or link when relevant. The goal is to keep
                    approvals clear without turning the process into paperwork.
                  </div>
                </div>
              </div>
            </SectionCard>

            <SectionCard
              id="rewards"
              title="What you can spend points on"
              description="Do useful work. Get useful stuff. Roo Points are meant to turn community contribution into practical perks."
            >
              <div className="grid gap-4 lg:grid-cols-2">
                {REWARD_GROUPS.map((group) => (
                  <article
                    key={group.title}
                    className={clsx(
                      "rounded-[1.65rem] p-6 shadow-[0_18px_48px_rgba(17,17,17,0.08)]",
                      group.className,
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <Gift className="h-5 w-5" />
                      <h3 className="text-2xl font-semibold tracking-tight">
                        {group.title}
                      </h3>
                    </div>
                    <div className="mt-5 space-y-3">
                      {group.items.map(([points, reward]) => (
                        <div
                          key={`${group.title}-${points}-${reward}`}
                          className="flex items-center justify-between gap-4 rounded-[1.2rem] bg-black/8 px-4 py-3"
                        >
                          <span className="font-semibold">{points}</span>
                          <span className="text-right opacity-80">{reward}</span>
                        </div>
                      ))}
                    </div>
                  </article>
                ))}
              </div>

              <div className="mt-6 rounded-[1.6rem] border border-black/8 bg-[var(--brutalist-beige)] p-6 text-[var(--brutalist-black)]">
                <p className="text-base leading-7 text-black/72">
                  Some rewards are capacity-limited. If something is unavailable, Roo can
                  offer a waitlist or the next best option.
                </p>
              </div>
            </SectionCard>

            <SectionCard
              id="slack-commands"
              title="How to use Roo in Slack"
              description="Keep the language simple. Commands work well, and plain English prompts can be enough to get moving."
              className="border-black/5 bg-[var(--brutalist-black)] text-white"
              descriptionClassName="text-white/72"
            >
              <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
                {SLACK_COMMANDS.map((command) => (
                  <div
                    key={command}
                    className="rounded-full border border-white/10 bg-white/6 px-5 py-4 text-white"
                  >
                    <code className="text-base font-semibold text-white">{command}</code>
                  </div>
                ))}
              </div>

              <div className="mt-6 rounded-[1.6rem] border border-[var(--brutalist-mint)]/20 bg-[var(--brutalist-mint)] p-6 text-[var(--brutalist-black)]">
                <div className="flex items-start gap-3">
                  <MessageCircle className="mt-1 h-5 w-5 shrink-0 text-[var(--brutalist-black)]" />
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.35em] text-black/65">
                      Plain-language example
                    </p>
                    <p className="mt-4 text-xl leading-8 text-black/86">
                      "@Roo can I buy a sticker with my points?"
                    </p>
                  </div>
                </div>
              </div>
            </SectionCard>

            <SectionCard
              id="pilot-rules"
              title="Fairness, limits, and pilot notes"
              description="This should feel welcoming, not legalistic. The point is to make the system understandable and fair while MLAI learns."
              className="border-black/6 bg-[var(--brutalist-beige)] text-[var(--brutalist-black)]"
              descriptionClassName="text-black/68"
            >
              <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
                <div className="rounded-[1.65rem] border border-black/6 bg-[var(--brutalist-beige-dark)] p-6 text-[var(--brutalist-black)]">
                  <div className="flex items-center gap-3">
                    <ShieldCheck className="h-5 w-5 text-[var(--brutalist-purple)]" />
                    <h3 className="text-2xl font-semibold tracking-tight">
                      Pilot rules
                    </h3>
                  </div>
                  <ul className="mt-5 space-y-4 text-base leading-7 text-black/72">
                    <li>This is a pilot, so values and rules may be adjusted as MLAI learns.</li>
                    <li>Some actions may be auto-recognised, while organised work is approved by the MLAI Team.</li>
                    <li>All changes are logged so the system stays accountable.</li>
                    <li>Clear gaming, spam, or low-effort abuse can be denied or reversed.</li>
                  </ul>
                </div>

                <div className="rounded-[1.65rem] bg-[var(--brutalist-mint)] p-6 text-[var(--brutalist-black)]">
                  <div className="flex items-center gap-3">
                    <Sparkles className="h-5 w-5" />
                    <h3 className="text-2xl font-semibold tracking-tight">
                      More Roo skills are coming
                    </h3>
                  </div>
                  <p className="mt-4 text-base leading-7 text-black/72">
                    Today the main Roo story is points, rewards, coworking, and requests.
                    Roo is expanding to help with more practical MLAI workflows over time,
                    but this page keeps the focus on what members can use right now.
                  </p>
                </div>
              </div>
            </SectionCard>

            <SectionCard
              id="faq"
              title="FAQ"
              description="Newcomers should leave with the system feeling obvious."
            >
              <div className="space-y-3">
                {FAQ_ITEMS.map((item, index) => (
                  <Disclosure key={item.question} defaultOpen={index === 0}>
                    {({ open }) => (
                      <div className="overflow-hidden rounded-[1.4rem] border border-black/8 bg-[var(--brutalist-beige)] text-[var(--brutalist-black)]">
                        <DisclosureButton className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left">
                          <span className="text-lg font-semibold text-[var(--brutalist-black)]">
                            {item.question}
                          </span>
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
              aria-label="Roo page sections"
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
