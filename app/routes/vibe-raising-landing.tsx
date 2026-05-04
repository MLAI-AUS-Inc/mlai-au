import { useCallback, useState } from "react";
import { useNavigate } from "react-router";
import {
  ArrowRightIcon,
  ChartBarIcon,
  DocumentTextIcon,
  EnvelopeIcon,
  ExclamationTriangleIcon,
  ShieldCheckIcon,
  SparklesIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";
import ResponsibleInvestorsSection from "~/components/ResponsibleInvestorsSection";
import VibeRaisingIntroPopup from "~/components/VibeRaisingIntroPopup";
import type { Route } from "./+types/vibe-raising-landing";

const PAGE_TITLE = "MLAI Vibe Raising";
const PAGE_DESCRIPTION =
  "MLAI Vibe Raising helps founders draft monthly investor updates, with an optional Gmail connection for relevant email context.";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "MLAI Vibe Raising | Monthly Founder Updates" },
    { name: "description", content: PAGE_DESCRIPTION },
    { property: "og:title", content: "MLAI Vibe Raising" },
    { property: "og:description", content: PAGE_DESCRIPTION },
    { name: "application-name", content: "MLAI Vibe Raising" },
    { tagName: "link", rel: "canonical", href: "https://mlai.au/vibe-raising" },
  ];
}

export async function loader({}: Route.LoaderArgs) {
  return {};
}

export default function VibeRaisingPage({}: Route.ComponentProps) {
  const navigate = useNavigate();
  const [showIntro, setShowIntro] = useState(false);

  const enterApp = useCallback(() => {
    navigate("/founder-tools/updates");
  }, [navigate]);

  return (
    <main className="bg-white text-gray-950">
      {showIntro ? (
        <VibeRaisingIntroPopup
          onDismiss={() => setShowIntro(false)}
          onComplete={enterApp}
          onSkip={enterApp}
        />
      ) : null}

      <section className="relative min-h-[86vh] overflow-hidden">
        <img
          src="/hero-bg.jpg"
          alt=""
          className="absolute inset-0 h-full w-full object-cover object-top"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/55 to-black/75" />

        <div className="relative z-10 mx-auto flex min-h-[86vh] max-w-6xl flex-col justify-center px-6 py-20 lg:px-8">
          <div className="max-w-3xl">
            <p className="mb-4 text-sm font-black uppercase tracking-[0.28em] text-white/70">
              Monthly founder updates by MLAI
            </p>
            <h1 className="text-5xl font-black tracking-tight text-white sm:text-6xl lg:text-7xl">
              {PAGE_TITLE}
            </h1>
            <p className="mt-6 max-w-2xl text-lg font-medium leading-8 text-white/78 sm:text-xl">
              Draft clear investor updates from your progress, metrics, asks, and
              optional Gmail context so investors can scan your momentum and act on it.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={() => setShowIntro(true)}
                className="inline-flex items-center justify-center gap-3 rounded-xl bg-white px-7 py-4 text-sm font-black text-gray-950 shadow-xl shadow-black/20 transition hover:bg-gray-100 active:scale-[0.98]"
              >
                Start your update
                <ArrowRightIcon className="h-5 w-5" />
              </button>
              <a
                href="#google-data"
                className="inline-flex items-center justify-center rounded-xl border border-white/25 bg-white/10 px-7 py-4 text-sm font-black text-white backdrop-blur-sm transition hover:bg-white/15"
              >
                How Gmail is used
              </a>
            </div>
          </div>
        </div>
      </section>

      <ResponsibleInvestorsSection />

      <section className="px-6 py-16">
        <div className="mx-auto grid max-w-6xl gap-5 md:grid-cols-3">
          {[
            {
              icon: SparklesIcon,
              title: "Founders draft",
              copy: "Regular updates turn wins, asks, challenges, and metrics into visible momentum.",
            },
            {
              icon: ChartBarIcon,
              title: "Signals compound",
              copy: "Investors can scan monthly metrics and context without stale directory noise.",
            },
            {
              icon: UserGroupIcon,
              title: "The right people help",
              copy: "Consistent transparency makes investor follow-up and introductions easier.",
            },
          ].map((item) => (
            <div key={item.title} className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
              <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-[rgba(0,255,215,0.12)] text-[var(--vr-color-primary)]">
                <item.icon className="h-6 w-6" />
              </div>
              <h2 className="text-xl font-black tracking-tight text-gray-950">{item.title}</h2>
              <p className="mt-3 text-sm leading-6 text-gray-600">{item.copy}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="google-data" className="px-6 pb-16">
        <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[1fr_1fr]">
          <div className="rounded-xl border border-gray-200 bg-gray-50 p-8 sm:p-10">
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-white text-[var(--vr-color-primary)] shadow-sm">
              <EnvelopeIcon className="h-6 w-6" />
            </div>
            <h2 className="text-3xl font-black tracking-tight text-gray-950">
              How MLAI Vibe Raising uses Gmail
            </h2>
            <p className="mt-5 text-base leading-7 text-gray-600">
              Founders can optionally connect Gmail when they want MLAI Vibe Raising
              to draft a monthly investor update from relevant email context. The app
              looks for useful update signals such as investor feedback, customer
              conversations, milestones, risks, asks, and follow-ups.
            </p>
          </div>

          <div className="rounded-xl border border-[rgba(0,255,215,0.24)] bg-white p-8 shadow-sm sm:p-10">
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-[rgba(0,255,215,0.12)] text-[var(--vr-color-primary)]">
              <ShieldCheckIcon className="h-6 w-6" />
            </div>
            <h2 className="text-2xl font-black tracking-tight text-gray-950">
              Google user data commitments
            </h2>
            <ul className="mt-6 space-y-4 text-sm font-semibold leading-6 text-gray-600">
              {[
                "Gmail connection is optional and initiated by the founder.",
                "Gmail data is used only to generate requested investor update drafts and summaries.",
                "Gmail data is not sold and is not used to train generalized AI or machine learning models.",
                "Raw Gmail content is processed transiently and deleted after processing.",
                "Generated drafts and OAuth tokens may be retained only as needed to provide the service.",
              ].map((item) => (
                <li key={item} className="flex gap-3">
                  <DocumentTextIcon className="mt-0.5 h-5 w-5 flex-shrink-0 text-[var(--vr-color-primary)]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="/privacy"
                className="inline-flex items-center justify-center rounded-xl bg-gray-950 px-5 py-3 text-sm font-black text-white transition hover:bg-black"
              >
                Privacy Policy
              </a>
              <a
                href="/terms"
                className="inline-flex items-center justify-center rounded-xl border border-gray-200 bg-white px-5 py-3 text-sm font-black text-gray-800 transition hover:bg-gray-50"
              >
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-6 pb-16">
        <div className="relative rounded-2xl border border-[rgba(242,114,63,0.24)] bg-white p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] sm:p-10">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
            <div className="rounded-lg bg-[rgba(242,114,63,0.12)] p-2">
              <ExclamationTriangleIcon className="h-7 w-7 text-[var(--vr-palette-coral)]" />
            </div>
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900">
                Don't Wait Until You Need Money
              </h2>
              <p className="text-lg leading-relaxed text-gray-600">
                The best founders build investor trust before the round starts.
                Send consistent updates, stay transparent about progress and challenges,
                and make it easy for the right investors to understand your momentum.
              </p>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 top-0 w-1.5 rounded-l-2xl bg-[var(--vr-palette-coral)]" />
        </div>
      </section>
    </main>
  );
}
