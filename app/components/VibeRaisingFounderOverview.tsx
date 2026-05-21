import { format } from "date-fns";
import {
  ArrowRightIcon,
  CalendarIcon,
  CurrencyDollarIcon,
  ExclamationCircleIcon,
  QuestionMarkCircleIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";
import { clsx } from "clsx";
import { MONTHLY_UPDATE_STEPS } from "~/components/MonthlyUpdateStepper";
import ResponsibleInvestorsSection from "~/components/ResponsibleInvestorsSection";

const HERO_EXAMPLE_UPDATE = {
  id: "example-april-2026",
  date: "2026-05-01T00:00:00.000Z",
  month: "April 2026",
  metrics: {
    revenue: "AUD 7,738.72",
    monthlyCosts: "AUD 2,025.00",
  },
  highlights: [
    "Recognised AUD 7,738.72 in April revenue and kept sponsor momentum moving across community programs.",
    "Confirmed new event partnerships and locked in a stronger May calendar for investors to point at.",
  ].join("\n"),
  challenges: [
    "Coordinating a larger committee while most leads are still part-time created bottlenecks.",
  ].join("\n"),
  next30Days: [
    "Deliver May partner programming and convert the next wave of sponsorship conversations.",
  ].join("\n"),
  asks: [
    "Warm introductions to climate, energy, and education partners who can accelerate the next funding conversations.",
  ].join("\n"),
};

const HERO_EXAMPLE_USER = {
  fullName: "MLAI Team",
  companyName: "MLAI",
};

function splitItems(text: string): string[] {
  return text
    .split(/\n+/)
    .flatMap((line) => line.split(/(?<=\.)\s+/))
    .map((item) => item.trim())
    .filter(Boolean);
}

function limitPreviewItems(text: string, maxItems = 1, maxChars = 140) {
  return splitItems(text)
    .slice(0, maxItems)
    .map((item) =>
      item.length > maxChars ? `${item.slice(0, maxChars).trimEnd()}…` : item,
    );
}

function HeroMetricCard({
  label,
  value,
  icon: Icon,
}: {
  label: string;
  value: string;
  icon: typeof CurrencyDollarIcon;
}) {
  return (
    <div className="rounded-xl border-2 border-[var(--vr-color-primary)] bg-[rgba(0,255,215,0.12)] px-2 py-3 text-center shadow-sm ring-1 ring-[rgba(0,128,128,0.16)]">
      <div className="mb-1.5 flex justify-center">
        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[rgba(0,255,215,0.18)]">
          <Icon className="h-4 w-4 text-gray-400" />
        </div>
      </div>
      <p className="text-base font-extrabold leading-tight text-gray-900">{value}</p>
      <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-gray-600">
        {label}
      </p>
    </div>
  );
}

function HeroUpdateSection({
  icon: Icon,
  iconColorVar,
  label,
  items,
}: {
  icon: typeof SparklesIcon;
  iconColorVar: string;
  label: string;
  items: string[];
}) {
  if (items.length === 0) return null;

  return (
    <div className="vr-us-block">
      <div className="vr-us-heading">
        <span
          className="vr-us-heading-icon"
          style={{ color: `var(${iconColorVar})` }}
        >
          <Icon className="h-3.5 w-3.5" />
        </span>
        <span className="vr-us-heading-text">{label}</span>
      </div>
      <div className="vr-us-list">
        {items.map((item, index) => (
          <div className="vr-us-item" key={index}>
            <span className="vr-us-item-dot">•</span>
            <span className="vr-us-item-text">{item.trim()}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function VibeRaisingHeroExampleUpdatePreview() {
  const highlights = limitPreviewItems(HERO_EXAMPLE_UPDATE.highlights, 2, 110);
  const challenges = limitPreviewItems(HERO_EXAMPLE_UPDATE.challenges, 1, 120);
  const next30Days = limitPreviewItems(HERO_EXAMPLE_UPDATE.next30Days, 1, 120);
  const asks = limitPreviewItems(HERO_EXAMPLE_UPDATE.asks, 1, 130);

  return (
    <div className="vr-hero-preview-shell">
      <div className="vr-hero-preview-window vr-hero-preview-mobile">
        <div className="vr-hero-preview-topbar">
          <div className="vr-hero-preview-dots" aria-hidden="true">
            <span />
            <span />
            <span />
          </div>
          <div>
            <div className="vr-hero-preview-kicker">Example update</div>
          </div>
        </div>

        <div className="overflow-hidden bg-[var(--vr-color-card)]">
          <div className="vr-uch">
            <div className="vr-uch-bubble-1" />
            <div className="vr-uch-bubble-2" />
            <div className="vr-uch-main">
              <div className="vr-uch-emoji vr-uch-logo" aria-hidden="true">
                <img src="/vibe-raising/mlai-avatar.png" alt="" />
              </div>
              <div className="min-w-0">
                <div className="vr-uch-title-row">
                  <span className="vr-uch-title">{HERO_EXAMPLE_UPDATE.month}</span>
                  <span className="vr-current-chip">Current</span>
                </div>
                <div className="vr-uch-company">{HERO_EXAMPLE_USER.companyName}</div>
              </div>
            </div>
          </div>

          <div className="space-y-3 p-4">
            <div className="grid grid-cols-2 gap-2">
              <div className="rounded-lg border border-[var(--vr-color-border-md)] bg-white p-3">
                <p className="text-base font-black leading-tight text-[var(--vr-color-text)]">
                  {HERO_EXAMPLE_UPDATE.metrics.revenue}
                </p>
                <p className="mt-1 text-[10px] font-bold uppercase tracking-wide text-[var(--vr-color-text-sub)]">
                  Revenue
                </p>
              </div>
              <div className="rounded-lg border border-[var(--vr-color-border-md)] bg-white p-3">
                <p className="text-base font-black leading-tight text-[var(--vr-color-text)]">
                  {HERO_EXAMPLE_UPDATE.metrics.monthlyCosts}
                </p>
                <p className="mt-1 text-[10px] font-bold uppercase tracking-wide text-[var(--vr-color-text-sub)]">
                  Costs
                </p>
              </div>
            </div>

            <div className="rounded-lg border border-[var(--vr-color-border)] bg-white p-3">
              <div className="mb-2 flex items-center gap-2">
                <SparklesIcon className="h-4 w-4 text-[var(--vr-color-warning)]" />
                <span className="text-xs font-extrabold uppercase tracking-[0.08em] text-[var(--vr-color-text)]">
                  Key Highlights
                </span>
              </div>
              <ul className="space-y-1 text-sm leading-snug text-[var(--vr-color-text-mid)]">
                {highlights.map((highlight) => (
                  <li key={highlight} className="flex gap-2">
                    <span className="text-[var(--vr-color-text-sub)]">•</span>
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="vr-hero-preview-window vr-hero-preview-desktop">
        <div className="vr-hero-preview-topbar">
          <div className="vr-hero-preview-dots" aria-hidden="true">
            <span />
            <span />
            <span />
          </div>
          <div>
            <div className="vr-hero-preview-kicker">Example update</div>
          </div>
        </div>

        <div className="vr-update-card vr-hero-preview-card">
          <div className="vr-uch">
            <div className="vr-uch-bubble-1" />
            <div className="vr-uch-bubble-2" />
            <div className="vr-uch-glow" aria-hidden="true" />
            <div className="vr-uch-date">
              {format(new Date(HERO_EXAMPLE_UPDATE.date), "MMMM d, yyyy")}
            </div>
            <div className="vr-uch-main">
              <div className="vr-uch-emoji vr-uch-logo" aria-hidden="true">
                <img src="/vibe-raising/mlai-avatar.png" alt="" />
              </div>
              <div>
                <div className="vr-uch-title-row">
                  <span className="vr-uch-title">{HERO_EXAMPLE_UPDATE.month}</span>
                  <span className="vr-current-chip">Current</span>
                </div>
                <div className="vr-uch-company">{HERO_EXAMPLE_USER.companyName}</div>
              </div>
            </div>
          </div>

          <div className="vr-ucb vr-hero-preview-body">
            <div className="vr-hero-preview-metrics">
              <HeroMetricCard
                label="Revenue"
                value={HERO_EXAMPLE_UPDATE.metrics.revenue}
                icon={CurrencyDollarIcon}
              />
              <HeroMetricCard
                label="Costs"
                value={HERO_EXAMPLE_UPDATE.metrics.monthlyCosts}
                icon={CurrencyDollarIcon}
              />
            </div>

            <HeroUpdateSection
              icon={SparklesIcon}
              iconColorVar="--vr-color-warning"
              label="Key Highlights"
              items={highlights}
            />
            <HeroUpdateSection
              icon={ExclamationCircleIcon}
              iconColorVar="--vr-color-brand-orange"
              label="Challenges"
              items={challenges}
            />
            <HeroUpdateSection
              icon={CalendarIcon}
              iconColorVar="--vr-color-primary"
              label="Next 30 Days"
              items={next30Days}
            />
            <HeroUpdateSection
              icon={QuestionMarkCircleIcon}
              iconColorVar="--vr-color-primary"
              label="Ask from Investors"
              items={asks}
            />
          </div>

          <div className="vr-ucf">
            <div className="vr-ucf-left">
              <div className="vr-ucf-avatar">MT</div>
              <div>
                <div className="vr-ucf-name">{HERO_EXAMPLE_USER.companyName}</div>
                <div className="vr-ucf-company">Preview only · illustrative example</div>
              </div>
            </div>
            <div className="vr-hero-preview-actions" aria-hidden="true">
              <span className="vr-hero-preview-action is-secondary">Share Link</span>
              <span className="vr-hero-preview-action is-primary">
                Resend to Unopened
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function LandingDisplayHeading({
  number,
  label,
  accent = "var(--vr-color-primary)",
}: {
  number: string;
  label: string;
  accent?: string;
}) {
  return (
    <div className="leading-none tracking-tight" style={{ color: accent, fontFamily: "'Oswald', sans-serif" }}>
      <div
        style={{
          fontSize: "clamp(9rem, 25vw, 24rem)",
          fontWeight: 700,
          lineHeight: 0.78,
        }}
      >
        {number}
      </div>
      <div
        className="mt-4"
        style={{
          fontSize: "clamp(3.4rem, 8vw, 7rem)",
          fontWeight: 700,
          lineHeight: 0.86,
        }}
      >
        {label}
      </div>
    </div>
  );
}

const landingNumberSectionClassName =
  "mx-auto grid max-w-6xl gap-10 border-b border-[rgba(15,23,42,0.12)] py-12 lg:grid-cols-[minmax(0,0.78fr)_minmax(0,1.22fr)] lg:items-start lg:gap-16";

const landingNumberContentClassName =
  "w-full max-w-3xl space-y-5 lg:col-start-2 lg:justify-self-start";

export default function VibeRaisingFounderOverview({
  firstName,
  heading,
  showEyebrow = true,
  showInvestorConnectionSection = false,
  useNumberedSectionHeadings = false,
  bleedToShell = true,
  onCreateFirstUpdate,
}: {
  firstName: string;
  heading?: string;
  showEyebrow?: boolean;
  showInvestorConnectionSection?: boolean;
  useNumberedSectionHeadings?: boolean;
  bleedToShell?: boolean;
  onCreateFirstUpdate: () => void;
}) {
  return (
    <div className={clsx("vr-scope", bleedToShell && "-m-6 sm:-m-8 lg:-m-10")}>
      <div className="relative overflow-hidden">
        <img
          src="/hero-bg.jpg"
          alt=""
          className="absolute inset-0 h-full w-full object-cover object-top"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black/70" />

        <div className="relative z-10 mx-auto flex min-h-[60vh] max-w-7xl items-center px-6 pb-14 pt-24 sm:min-h-[calc(100vh-64px)] sm:py-16 lg:px-8 lg:py-20">
          <div className="grid w-full items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(360px,460px)] lg:gap-12">
            <div className="max-w-2xl text-center lg:text-left">
              {showEyebrow ? (
                <div className="mb-4 inline-flex rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-white/78 backdrop-blur-sm">
                  Founder overview
                </div>
              ) : null}
              <h1 className="mb-4 text-4xl font-extrabold tracking-tight text-white drop-shadow-lg sm:text-5xl lg:text-6xl">
                {heading ?? <>Let&apos;s get you ready to raise, {firstName}.</>}
              </h1>
              <p className="mx-auto mb-4 max-w-xl text-base leading-snug text-white/84 sm:text-lg lg:mx-0">
                Use monthly updates to build investor relationships before you raise.
              </p>
              <button
                onClick={onCreateFirstUpdate}
                className="hidden items-center gap-3 rounded-xl bg-[var(--vr-palette-mint)] px-8 py-4 font-bold text-[var(--vr-palette-black)] shadow-lg shadow-[rgba(0,255,215,0.18)] transition-all hover:bg-[var(--color-teal-500)] hover:shadow-xl active:scale-[0.98] lg:inline-flex"
              >
                Create Your First Update
                <ArrowRightIcon className="h-5 w-5" />
              </button>
            </div>

            <div className="lg:translate-y-20 lg:justify-self-end">
              <VibeRaisingHeroExampleUpdatePreview />
            </div>

            <div className="flex justify-center lg:hidden">
              <button
                onClick={onCreateFirstUpdate}
                className="inline-flex items-center gap-3 rounded-xl bg-[var(--vr-palette-mint)] px-8 py-4 font-bold text-[var(--vr-palette-black)] shadow-lg shadow-[rgba(0,255,215,0.18)] transition-all hover:bg-[var(--color-teal-500)] hover:shadow-xl active:scale-[0.98]"
              >
                Create Your First Update
                <ArrowRightIcon className="h-5 w-5" />
              </button>
            </div>
          </div>

          <a
            href="#responsible-investors"
            aria-label="Scroll down to explore the founder overview"
            className="group absolute bottom-6 left-1/2 inline-flex -translate-x-1/2 flex-col items-center gap-2 text-center text-white transition-opacity hover:opacity-80"
          >
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              className="hero-scroll-cue__arrow h-6 w-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="m6 9 6 6 6-6" />
            </svg>
          </a>
        </div>
      </div>

      <section id="responsible-investors">
        <ResponsibleInvestorsSection />
      </section>

      {showInvestorConnectionSection ? (
        <section className="px-6 pt-14">
          <div className={landingNumberSectionClassName}>
            <LandingDisplayHeading number="3" label="Updates" />
            <div className={landingNumberContentClassName}>
              <p className="text-sm font-extrabold uppercase tracking-[0.18em] text-[var(--vr-color-primary)]">
                Investor connection pathway
              </p>
              <h3 className="text-3xl font-black tracking-tight text-gray-950 sm:text-4xl">
                After 3 updates, MLAI connects you with momentum-ready investors.
              </h3>
              <p className="text-lg leading-8 text-gray-600">
                The goal is simple: show consistency, make your progress easy to understand,
                and meet investors when there is already trust in the room.
              </p>
              <p className="border-l-4 border-[var(--vr-color-primary)] pl-6 text-lg font-extrabold leading-8 text-[var(--vr-color-primary)]">
                Consistency is how trust gets built
              </p>
            </div>
          </div>
        </section>
      ) : null}

      <div className="px-6">
        {useNumberedSectionHeadings ? (
          <div className={landingNumberSectionClassName}>
            <LandingDisplayHeading number="4" label="Steps" accent="var(--brutalist-orange)" />
            <div className={landingNumberContentClassName}>
              <p className="text-sm font-extrabold uppercase tracking-[0.18em] text-[var(--brutalist-orange)]">
                How it works
              </p>
              <div className="relative mt-8 space-y-8">
                <div className="absolute bottom-10 left-7 top-7 w-px border-l border-dashed border-[rgba(255,61,0,0.45)]" aria-hidden />
                {MONTHLY_UPDATE_STEPS.map((item, index) => (
                  <div
                    key={item.key}
                    className="relative grid grid-cols-[3.5rem_1fr] items-start gap-5"
                  >
                    <span className="relative z-10 flex h-14 w-14 items-center justify-center rounded-full bg-[var(--brutalist-orange)] text-2xl font-black text-white shadow-[0_10px_22px_rgba(255,61,0,0.22)]">
                      {index + 1}
                    </span>
                    <div className="pt-1">
                      <h3 className="text-2xl font-black tracking-tight text-gray-950">{item.title}</h3>
                      <p className="mt-1 text-lg leading-7 text-gray-600">{item.helper}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <h2 className="mb-12 text-center text-2xl font-bold text-gray-900">
            How It Works
          </h2>
        )}
        {!useNumberedSectionHeadings ? (
          <div className="mx-auto max-w-5xl border-y border-[rgba(15,23,42,0.12)]">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 lg:divide-x lg:divide-[rgba(15,23,42,0.12)]">
              {MONTHLY_UPDATE_STEPS.map((item, index) => (
                <div
                  key={item.key}
                  className={clsx(
                    "px-5 py-8 text-center",
                    index < MONTHLY_UPDATE_STEPS.length - 1 && "border-b border-[rgba(15,23,42,0.12)] lg:border-b-0",
                  )}
                >
                  <span className="text-3xl font-extrabold text-[var(--vr-color-primary)]">
                    {index + 1}
                  </span>
                  <p className="mt-3 text-sm font-bold text-gray-900">
                    {item.title}
                  </p>
                  <p className="mt-2 text-xs text-gray-500">{item.helper}</p>
                </div>
              ))}
            </div>
          </div>
        ) : null}
      </div>

      <div className="mx-auto max-w-6xl px-6 pb-14">
        <div className={landingNumberSectionClassName}>
          {useNumberedSectionHeadings ? (
            <LandingDisplayHeading number="6" label="Months" accent="var(--brutalist-blue)" />
          ) : (
            <h2 className="text-2xl font-bold text-gray-900">Build Investor Relationships 6 Months in Advance</h2>
          )}
          {useNumberedSectionHeadings ? (
            <div className={landingNumberContentClassName}>
              <p className="text-sm font-extrabold uppercase tracking-[0.18em] text-[var(--brutalist-blue)]">
                Build relationships early
              </p>
              <h3 className="text-4xl font-black tracking-tight text-gray-950 sm:text-5xl">
                Start building investor relationships at least 6 months before you raise.
              </h3>
              <div className="space-y-5 text-lg leading-8 text-gray-600">
                <p>
                  Reaching out to investors only when you need capital is already too late.
                  Investors can smell desperation, and by then, you've already missed the window.
                </p>
              </div>
              <p className="border-l-4 border-[var(--brutalist-blue)] pl-6 text-lg font-extrabold leading-8 text-[var(--brutalist-blue)]">
                Start Investor Conversations Early
              </p>
            </div>
          ) : (
            <p className={`${landingNumberContentClassName} text-lg leading-relaxed text-gray-600`}>
              If you&apos;re reaching out to investors only when you need capital, it&apos;s already too late.
              Investors can smell desperation - and when that moment comes, you&apos;ve already messed up.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
