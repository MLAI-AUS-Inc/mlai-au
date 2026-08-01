import type { MetaFunction } from "react-router";

const PAGE_URL = "https://mlai.au/community";
const DESCRIPTION =
  "Join the MLAI community from MLAI Chat or Slack. Use the private web, desktop, iPhone, or Android app while approved public channels stay in sync.";
const SLACK_INVITE =
  "https://join.slack.com/t/mlai-aus/shared_invite/zt-3xsuoq3yb-_hah3nVNtga9pFQUvsxJeQ";
const WEB_APP_URL =
  import.meta.env.VITE_MLAI_CHAT_WEB_URL || "https://chat.mlai.au/";
const DESKTOP_RELEASE_URL =
  import.meta.env.VITE_MLAI_CHAT_DESKTOP_URL ||
  "https://github.com/MLAI-AUS-Inc/mlai-chat/releases/latest";
const IOS_APP_URL = import.meta.env.VITE_MLAI_CHAT_IOS_URL || "";
const ANDROID_APP_URL = import.meta.env.VITE_MLAI_CHAT_ANDROID_URL || "";

export const meta: MetaFunction = () => [
  { title: "MLAI Chat — one community, your choice of app or Slack | MLAI" },
  { name: "description", content: DESCRIPTION },
  { name: "robots", content: "index, follow, max-image-preview:large" },
  { property: "og:type", content: "website" },
  { property: "og:site_name", content: "MLAI" },
  { property: "og:url", content: PAGE_URL },
  { property: "og:title", content: "MLAI Chat — the MLAI community, beyond one app" },
  { property: "og:description", content: DESCRIPTION },
  { property: "og:image", content: "https://mlai.au/press-kit/roo-icon.png" },
  { property: "og:locale", content: "en_AU" },
  { name: "twitter:card", content: "summary" },
];

type ClientCardProps = {
  eyebrow: string;
  title: string;
  body: string;
  href?: string;
  action: string;
  tone: string;
  external?: boolean;
};

function ClientCard({
  eyebrow,
  title,
  body,
  href,
  action,
  tone,
  external = true,
}: ClientCardProps) {
  const className = `group flex min-h-[280px] flex-col justify-between rounded-[2rem] border border-black/10 p-7 shadow-[0_18px_50px_rgba(17,17,17,0.08)] ${tone}`;
  const content = (
    <>
      <div>
        <p className="text-xs font-black uppercase tracking-[0.28em] text-black/55">
          {eyebrow}
        </p>
        <h3 className="mt-5 text-3xl font-black tracking-[-0.045em] text-black">
          {title}
        </h3>
        <p className="mt-4 max-w-sm text-base font-medium leading-7 text-black/65">
          {body}
        </p>
      </div>
      <span className="mt-8 inline-flex min-h-12 w-fit items-center rounded-full bg-black px-5 py-3 text-sm font-black text-white transition-transform group-hover:translate-x-1">
        {action} <span aria-hidden="true" className="ml-2">→</span>
      </span>
    </>
  );

  if (!href) {
    return (
      <div aria-disabled="true" className={`${className} opacity-70`}>
        {content}
      </div>
    );
  }

  return (
    <a
      className={className}
      href={href}
      rel={external ? "noopener noreferrer" : undefined}
      target={external ? "_blank" : undefined}
    >
      {content}
    </a>
  );
}

const bridgeFacts = [
  {
    number: "01",
    title: "One canonical community",
    body: "MLAI Chat is the source of truth. Slack is an optional, operator-managed way into specifically approved public channels.",
  },
  {
    number: "02",
    title: "Clear source attribution",
    body: "Bridged messages identify their source and preserve the Slack workspace, channel, message, and user reference in signed metadata.",
  },
  {
    number: "03",
    title: "Private stays private",
    body: "Direct messages, private channels, secrets, bot chatter, and shared external Slack messages are outside the initial bridge.",
  },
  {
    number: "04",
    title: "Edits and deletion converge",
    body: "Where the platform permits it, replies, edits, and deletions are mirrored and processed through a retry-safe delivery queue.",
  },
];

export default function CommunityPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[var(--brutalist-beige)] text-[var(--brutalist-black)]">
      <section className="px-4 py-5 sm:px-6 sm:py-7 lg:px-8">
        <div className="relative mx-auto min-h-[720px] max-w-7xl overflow-hidden rounded-[2rem] bg-[#111] px-6 py-10 text-white shadow-[0_34px_100px_rgba(17,17,17,0.24)] sm:rounded-[3rem] sm:px-10 sm:py-14 lg:px-16 lg:py-16">
          <div className="absolute -left-24 top-16 h-72 w-72 rounded-full bg-[#42e8c7]/20 blur-3xl" />
          <div className="absolute right-0 top-0 h-96 w-96 rounded-full bg-[#fe3d00]/20 blur-3xl" />
          <div className="absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-[#5b45ff]/20 blur-3xl" />

          <div className="relative grid min-h-[600px] items-center gap-14 lg:grid-cols-[1.15fr_0.85fr]">
            <div>
              <div className="inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/8 px-4 py-2 text-xs font-black uppercase tracking-[0.26em] text-white/75">
                <span className="h-2 w-2 rounded-full bg-[#42e8c7]" />
                Private community pilot
              </div>
              <h1 className="mt-8 max-w-4xl text-6xl font-black leading-[0.88] tracking-[-0.075em] text-white sm:text-7xl lg:text-[7.4rem]">
                MLAI
                <span className="block font-normal text-white/45">Chat</span>
              </h1>
              <p className="mt-8 max-w-2xl text-xl font-medium leading-8 text-white/68 sm:text-2xl sm:leading-9">
                One MLAI community. Use our independent app on the web,
                desktop, iPhone, or Android — or stay in Slack while approved
                channels sync.
              </p>
              <div className="mt-10 flex flex-wrap gap-3">
                <a
                  className="inline-flex min-h-14 items-center justify-center rounded-full bg-[#42e8c7] px-7 py-4 text-base font-black text-black transition-transform hover:scale-[1.02]"
                  href={WEB_APP_URL}
                >
                  Open MLAI Chat
                </a>
                <a
                  className="inline-flex min-h-14 items-center justify-center rounded-full border border-white/18 bg-white/8 px-7 py-4 text-base font-black text-white transition-colors hover:bg-white/14"
                  href={SLACK_INVITE}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  Continue with Slack
                </a>
              </div>
              <p className="mt-5 text-sm font-semibold text-white/45">
                An MLAI invite or approved membership is required. Your private
                identity key stays on your device.
              </p>
            </div>

            <div className="relative mx-auto w-full max-w-md lg:mr-0">
              <div className="absolute -inset-6 rotate-3 rounded-[3rem] bg-[#42e8c7] opacity-80" />
              <div className="relative -rotate-2 rounded-[2.5rem] border border-white/10 bg-[#f7f2e8] p-7 text-black shadow-2xl sm:p-9">
                <img
                  alt="MLAI Roo"
                  className="mx-auto aspect-square w-44 rounded-full object-cover shadow-[0_16px_40px_rgba(0,0,0,0.18)] sm:w-52"
                  height={208}
                  src="/press-kit/roo-icon.png"
                  width={208}
                />
                <p className="mt-8 text-xs font-black uppercase tracking-[0.3em] text-black/45">
                  Your choice
                </p>
                <p className="mt-3 text-3xl font-black leading-tight tracking-[-0.04em]">
                  Same people. Same conversations. More ways to join in.
                </p>
                <div className="mt-7 grid grid-cols-2 gap-3 text-sm font-black">
                  {["Web", "Desktop", "iPhone", "Android"].map(
                    (platform) => (
                      <div
                        className="rounded-2xl bg-black/7 px-4 py-3"
                        key={platform}
                      >
                        {platform}
                      </div>
                    ),
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="max-w-3xl">
          <p className="text-xs font-black uppercase tracking-[0.3em] text-black/45">
            Pick your client
          </p>
          <h2 className="mt-5 text-4xl font-black tracking-[-0.055em] sm:text-6xl">
            Download it, open it, or keep using Slack.
          </h2>
          <p className="mt-5 text-lg font-medium leading-8 text-black/60">
            MLAI operates the relay and clients. The app does not require a
            Block, Square, Builderlab, or public Buzz account.
          </p>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2">
          <ClientCard
            action="Open web app"
            body="Use the private browser client at chat.mlai.au. Nothing to install."
            eyebrow="Browser"
            href={WEB_APP_URL}
            title="Web"
            tone="bg-[#42e8c7]"
          />
          <ClientCard
            action="Download latest release"
            body="Install the signed standalone MLAI Chat release for macOS, Windows, or Linux."
            eyebrow="Computer"
            href={DESKTOP_RELEASE_URL}
            title="Desktop"
            tone="bg-[#fefc22]"
          />
          <ClientCard
            action={IOS_APP_URL ? "Open App Store" : "App Store pilot pending"}
            body="A native iPhone app with device-keychain identity storage and secure deep links."
            eyebrow="Mobile"
            href={IOS_APP_URL || undefined}
            title="iPhone"
            tone="bg-[#ffded3]"
          />
          <ClientCard
            action={ANDROID_APP_URL ? "Open Google Play" : "Play pilot pending"}
            body="A native Android app with device-keystore identity storage and secure deep links."
            eyebrow="Mobile"
            href={ANDROID_APP_URL || undefined}
            title="Android"
            tone="bg-[#ded8ff]"
          />
        </div>
      </section>

      <section className="bg-[#111] px-4 py-20 text-white sm:px-6 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.3em] text-[#42e8c7]">
                How Slack sync works
              </p>
              <h2 className="mt-5 text-4xl font-black tracking-[-0.055em] sm:text-6xl">
                A bridge, not an identity shortcut.
              </h2>
              <p className="mt-6 text-lg font-medium leading-8 text-white/60">
                Slack is convenient, but it does not own your MLAI Chat
                identity. Account links are verified separately and can be
                revoked without changing your device key.
              </p>
            </div>
            <div className="grid gap-px overflow-hidden rounded-[2rem] bg-white/12 sm:grid-cols-2">
              {bridgeFacts.map((fact) => (
                <article className="bg-[#181818] p-7 sm:p-8" key={fact.number}>
                  <p className="text-sm font-black text-[#42e8c7]">{fact.number}</p>
                  <h3 className="mt-8 text-2xl font-black tracking-[-0.03em]">
                    {fact.title}
                  </h3>
                  <p className="mt-4 text-base font-medium leading-7 text-white/55">
                    {fact.body}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="mx-auto grid max-w-7xl gap-10 rounded-[2.5rem] bg-[#fe3d00] p-8 text-white sm:p-12 lg:grid-cols-[1fr_auto] lg:items-end lg:p-16">
          <div className="max-w-3xl">
            <p className="text-xs font-black uppercase tracking-[0.3em] text-white/65">
              Start where you are
            </p>
            <h2 className="mt-5 text-4xl font-black leading-tight tracking-[-0.055em] sm:text-6xl">
              You do not have to leave Slack to try MLAI Chat.
            </h2>
            <p className="mt-6 text-lg font-medium leading-8 text-white/75">
              Join with the client that works for you. During the pilot, bridge
              coverage can change by channel and may be paused by MLAI operators.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 lg:justify-end">
            <a
              className="inline-flex min-h-14 items-center rounded-full bg-white px-7 py-4 text-base font-black text-black"
              href={WEB_APP_URL}
            >
              Open MLAI Chat
            </a>
            <a
              className="inline-flex min-h-14 items-center rounded-full border border-white/30 px-7 py-4 text-base font-black text-white"
              href={SLACK_INVITE}
              rel="noopener noreferrer"
              target="_blank"
            >
              Join Slack
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
