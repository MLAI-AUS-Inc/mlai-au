import type { Route } from "./+types/innovate-connect-alliance.docs";
import { redirect } from "react-router";

import {
    innovateConnectAllianceContact,
    innovateConnectAllianceFaq,
    innovateConnectAllianceOverview,
    innovateConnectAllianceSections,
    innovateConnectAllianceTimeline,
} from "~/data/innovate-connect-alliance-docs";
import { getCurrentUser } from "~/lib/auth";
import { getEnv } from "~/lib/env.server";

export async function loader({ request, context }: Route.LoaderArgs) {
    const env = getEnv(context);
    const user = await getCurrentUser(env, request);

    if (!user) {
        return redirect("/platform/login?app=innovate-connect-alliance&next=/innovate-connect-alliance/docs");
    }

    return { user };
}

export default function InnovateConnectAllianceDocsPage() {
    return (
        <div className="px-4 py-8 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-6xl space-y-8">
                <section className="rounded-2xl border border-[#8ef4d4]/20 bg-gradient-to-r from-[#1a0e2e] to-[#10333a] px-6 py-8">
                    <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#8ef4d4]/70">
                        {innovateConnectAllianceOverview.eyebrow}
                    </p>
                    <h1 className="mt-3 text-3xl font-black tracking-tight text-white sm:text-4xl">
                        {innovateConnectAllianceOverview.title}
                    </h1>
                    <p className="mt-4 max-w-4xl text-base leading-7 text-white/70">
                        {innovateConnectAllianceOverview.summary}
                    </p>
                </section>

                <section className="rounded-2xl border border-white/10 bg-[#1a0e2e]/80 p-6">
                    <h2 className="text-2xl font-semibold text-white">Timeline</h2>
                    <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                        {innovateConnectAllianceTimeline.map((item) => (
                            <div key={item.label} className="rounded-xl bg-white/5 p-4">
                                <p className="text-xs uppercase tracking-[0.2em] text-[#8ef4d4]/70">
                                    {item.date}
                                </p>
                                <p className="mt-2 text-lg font-semibold text-white">{item.label}</p>
                                <p className="mt-2 text-sm leading-6 text-white/60">{item.detail}</p>
                            </div>
                        ))}
                    </div>
                </section>

                <div className="grid gap-6 lg:grid-cols-2">
                    {innovateConnectAllianceSections.map((section) => (
                        <section
                            key={section.id}
                            id={section.id}
                            className="rounded-2xl border border-white/10 bg-[#1a0e2e]/80 p-6"
                        >
                            <h2 className="text-2xl font-semibold text-white">{section.title}</h2>
                            <p className="mt-3 text-sm leading-6 text-white/65">
                                {section.description}
                            </p>
                            {section.bullets && (
                                <ul className="mt-4 space-y-3">
                                    {section.bullets.map((bullet) => (
                                        <li key={bullet} className="flex gap-3 text-sm text-white/75">
                                            <span className="mt-2 h-2 w-2 rounded-full bg-[#8ef4d4]" />
                                            <span>{bullet}</span>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </section>
                    ))}
                </div>

                <section className="rounded-2xl border border-white/10 bg-[#1a0e2e]/80 p-6">
                    <h2 className="text-2xl font-semibold text-white">FAQ</h2>
                    <div className="mt-5 space-y-4">
                        {innovateConnectAllianceFaq.map((item) => (
                            <div key={item.question} className="rounded-xl bg-white/5 p-4">
                                <p className="text-base font-semibold text-white">{item.question}</p>
                                <p className="mt-2 text-sm leading-6 text-white/65">{item.answer}</p>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="rounded-2xl border border-white/10 bg-[#1a0e2e]/80 p-6">
                    <h2 className="text-2xl font-semibold text-white">Contact</h2>
                    <p className="mt-3 text-sm leading-6 text-white/65">
                        {innovateConnectAllianceContact.message}
                    </p>
                    <a
                        href={`mailto:${innovateConnectAllianceContact.email}`}
                        className="mt-4 inline-flex text-sm font-semibold text-[#8ef4d4] hover:text-[#8ef4d4]/80"
                    >
                        {innovateConnectAllianceContact.email}
                    </a>
                </section>
            </div>
        </div>
    );
}
