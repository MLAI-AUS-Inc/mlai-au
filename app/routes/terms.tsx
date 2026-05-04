import type { MetaFunction } from "react-router";
import { Container } from "~/components/ui/Container";

const LAST_UPDATED = "4 May 2026";

export const meta: MetaFunction = () => {
    return [
        { title: "MLAI Vibe Raising Terms of Service" },
        {
            name: "description",
            content:
                "Terms of Service for MLAI services, including MLAI Vibe Raising, Google/Gmail connections, AI-generated monthly updates, retention, and data deletion.",
        },
        {
            name: "keywords",
            content:
                "terms of service, MLAI Vibe Raising, Gmail integration, Google OAuth, AI summaries, retention, data deletion",
        },
    ];
};

export default function TermsOfService() {
    return (
        <>
            <Container className="bg-white pt-32">
                <div className="grid grid-cols-1 gap-y-16 lg:grid-cols-1 lg:grid-rows-[auto_1fr] lg:gap-y-12">
                    <div className="lg:order-first lg:row-span-2">
                        <h1 className="text-4xl pt-12 font-bold tracking-tight text-[#3b82f6] sm:text-5xl dark:text-[#3b82f6]">
                            MLAI Vibe Raising Terms of Service
                        </h1>

                        <div className="mt-16 mb-24 space-y-7 text-base text-zinc-600 dark:text-gray-900">
                            <h2 className="text-xl font-semibold leading-7 text-gray-900">
                                Last updated: {LAST_UPDATED}
                            </h2>

                            <p className="mt-4 text-base leading-7 text-zinc-600">
                                These Terms of Service ("Terms") govern your access to and use
                                of MLAI websites, applications, and services, including MLAI
                                Vibe Raising (collectively, the "Services") provided by MLAI
                                Aus Inc ("MLAI", "we", "our", or "us").
                            </p>

                            <p className="mt-4 text-base leading-7 text-zinc-600">
                                By accessing or using the Services, you agree to be bound by
                                these Terms. If you do not agree, do not use the Services.
                            </p>

                            <h2 className="mt-8 text-xl font-semibold leading-7 text-gray-900">
                                1. The Services
                            </h2>
                            <p className="mt-4 text-base leading-7 text-zinc-600">
                                MLAI provides community, educational, and software-based tools.
                                MLAI Vibe Raising helps founders draft monthly startup and
                                investor updates from information the founder chooses to enter,
                                upload, generate, or connect. Some features allow you to
                                connect third-party accounts, including Google and Gmail, so
                                MLAI can process relevant context for user-requested summaries,
                                drafts, metrics, asks, risks, and follow-ups.
                            </p>

                            <h2 className="mt-8 text-xl font-semibold leading-7 text-gray-900">
                                2. Eligibility and Accounts
                            </h2>
                            <ul className="mt-4 list-disc pl-5 space-y-2 text-base leading-7 text-zinc-600">
                                <li>You must be able to form a legally binding contract to use the Services.</li>
                                <li>You are responsible for maintaining the confidentiality of your account credentials and for all activity under your account.</li>
                                <li>You agree to provide accurate, current, and complete information and keep it updated.</li>
                            </ul>

                            <h2 className="mt-8 text-xl font-semibold leading-7 text-gray-900">
                                3. Google/Gmail Connection (OAuth) and Email Analysis
                            </h2>
                            <p className="mt-4 text-base leading-7 text-zinc-600">
                                Gmail connection is optional. If you choose to connect your
                                Google account, you authorize MLAI to access the Google user
                                data you explicitly grant through the Google consent screen for
                                the purpose of providing the MLAI Vibe Raising feature you
                                requested, such as drafting a monthly founder or investor
                                update from relevant email context.
                            </p>

                            <h3 className="mt-6 text-lg font-semibold leading-7 text-gray-900">
                                3.1 What you are authorizing
                            </h3>
                            <p className="mt-4 text-base leading-7 text-zinc-600">
                                Depending on the feature you enable, MLAI may access Gmail data
                                such as message and thread identifiers, labels, headers, dates,
                                sender and recipient fields, subjects, snippets, body text,
                                cleaned or extracted text, attachment metadata, and attachment
                                content when processed for the requested update workflow. The
                                exact permissions are shown on the Google consent screen before
                                you grant access.
                            </p>

                            <h3 className="mt-6 text-lg font-semibold leading-7 text-gray-900">
                                3.2 What we do with Gmail data
                            </h3>
                            <ul className="mt-4 list-disc pl-5 space-y-2 text-base leading-7 text-zinc-600">
                                <li>We use Gmail data only to provide or improve the user-facing MLAI Vibe Raising workflow you requested.</li>
                                <li>We use Gmail context to identify relevant update signals such as investor feedback, customer conversations, milestones, risks, asks, metrics, and follow-ups.</li>
                                <li>We may process Gmail data using automated systems and AI models to produce requested drafts, summaries, extracted facts, and related outputs.</li>
                                <li>We may store OAuth tokens, connected account identifiers, selected message or thread artifacts, and derived outputs while needed to provide the Services.</li>
                            </ul>

                            <h3 className="mt-6 text-lg font-semibold leading-7 text-gray-900">
                                3.3 Google API data use commitments
                            </h3>
                            <p className="mt-4 text-base leading-7 text-zinc-600">
                                MLAI's use and transfer of information received from Google
                                APIs will adhere to the Google API Services User Data Policy,
                                including the Limited Use requirements. In particular:
                            </p>
                            <ul className="mt-4 list-disc pl-5 space-y-2 text-base leading-7 text-zinc-600">
                                <li>We do not sell Google user data or Gmail data.</li>
                                <li>We do not use Google user data or Gmail data for advertising, retargeting, credit-worthiness, lending, data broker, or information reseller purposes.</li>
                                <li>We do not use Google Workspace API data to create, train, or improve generalized AI or machine learning models.</li>
                                <li>We limit access, transfer, and human review of Google user data to what is permitted by our Privacy Policy, your consent, applicable law, security needs, and Google policy.</li>
                            </ul>

                            <h3 className="mt-6 text-lg font-semibold leading-7 text-gray-900">
                                3.4 What we store
                            </h3>
                            <p className="mt-4 text-base leading-7 text-zinc-600">
                                Our goal is to minimize the Google user data we store while
                                still providing the MLAI Vibe Raising workflow you requested.
                                We may store:
                            </p>
                            <ul className="mt-4 list-disc pl-5 space-y-2 text-base leading-7 text-zinc-600">
                                <li><strong>Connection data:</strong> OAuth tokens, refresh tokens, and basic account identifiers, such as the connected Google account email address, while your connection is active.</li>
                                <li><strong>Selected Gmail artifacts:</strong> message and thread metadata, extracted or cleaned text, attachment information, relevance signals, and source context needed to generate, display, troubleshoot, and improve the requested update workflow.</li>
                                <li><strong>Derived outputs:</strong> monthly update drafts, summaries, insights, events, metrics, asks, follow-ups, and other outputs associated with your account.</li>
                            </ul>

                            <h3 className="mt-6 text-lg font-semibold leading-7 text-gray-900">
                                3.5 Data retention
                            </h3>
                            <ul className="mt-4 list-disc pl-5 space-y-2 text-base leading-7 text-zinc-600">
                                <li><strong>OAuth tokens:</strong> We retain tokens while your Gmail connection is active. If you disconnect Google/Gmail, revoke access, or delete your account, we will delete or invalidate stored tokens within a reasonable time.</li>
                                <li><strong>Gmail artifacts and source context:</strong> We retain selected artifacts only while needed to provide, display, troubleshoot, secure, and improve the user-facing update workflow, unless you request deletion or a longer period is required or permitted by law.</li>
                                <li><strong>Derived outputs:</strong> We retain generated drafts and reports while your account remains active or until you delete them or request deletion, subject to legal, security, and operational requirements.</li>
                            </ul>

                            <h3 className="mt-6 text-lg font-semibold leading-7 text-gray-900">
                                3.6 Disconnecting, deleting data, and revoking access
                            </h3>
                            <p className="mt-4 text-base leading-7 text-zinc-600">
                                You can disconnect your Google account from MLAI in account
                                settings where available, revoke MLAI's access at any time in
                                your Google Account permissions page, or email hi@mlai.au.
                                After you disconnect or revoke access, Gmail-powered features
                                may stop working.
                            </p>
                            <p className="mt-4 text-base leading-7 text-zinc-600">
                                If you want MLAI to delete data associated with your Gmail
                                connection, generated updates, or AI outputs, you can use the
                                settings area where available or email hi@mlai.au with your
                                request. Please include the Google email address you connected
                                and your MLAI account email if different. We will action
                                deletion requests within a reasonable time and confirm where
                                applicable.
                            </p>

                            <h2 className="mt-8 text-xl font-semibold leading-7 text-gray-900">
                                4. Your Responsibilities
                            </h2>
                            <ul className="mt-4 list-disc pl-5 space-y-2 text-base leading-7 text-zinc-600">
                                <li>You may only connect accounts and data that you own or are authorized to use.</li>
                                <li>You are responsible for ensuring that your use of the Services complies with applicable laws, regulations, confidentiality obligations, and contracts with third parties.</li>
                                <li>You are responsible for reviewing any generated update, summary, metric, ask, or other output before relying on it or sharing it with investors or other recipients.</li>
                            </ul>

                            <h2 className="mt-8 text-xl font-semibold leading-7 text-gray-900">
                                5. Acceptable Use
                            </h2>
                            <p className="mt-4 text-base leading-7 text-zinc-600">
                                You agree not to misuse the Services. You must not, and must
                                not attempt to:
                            </p>
                            <ul className="mt-4 list-disc pl-5 space-y-2 text-base leading-7 text-zinc-600">
                                <li>Access or use the Services in a way that violates any law or infringes the rights of others.</li>
                                <li>Connect accounts, emails, files, or other data that you are not authorized to use.</li>
                                <li>Attempt to gain unauthorized access to any accounts, systems, or networks.</li>
                                <li>Reverse engineer, decompile, or attempt to extract the source code of the Services except to the extent permitted by law.</li>
                                <li>Upload or transmit malware or interfere with the operation or security of the Services.</li>
                                <li>Use the Services to send spam, deceptive communications, unlawful content, or unsolicited commercial mail.</li>
                            </ul>

                            <h2 className="mt-8 text-xl font-semibold leading-7 text-gray-900">
                                6. AI Outputs and Disclaimers
                            </h2>
                            <p className="mt-4 text-base leading-7 text-zinc-600">
                                The Services may produce outputs generated by automated systems
                                or AI models. AI-generated outputs may be inaccurate,
                                incomplete, outdated, or misleading. You must review outputs
                                before relying on them. Outputs are not professional advice,
                                including legal, financial, tax, investment, medical, or
                                security advice.
                            </p>

                            <h2 className="mt-8 text-xl font-semibold leading-7 text-gray-900">
                                7. Intellectual Property
                            </h2>
                            <p className="mt-4 text-base leading-7 text-zinc-600">
                                We and our licensors own all rights, title, and interest in and
                                to the Services, including all intellectual property rights. You
                                retain ownership of your content. You grant MLAI a limited
                                license to process your content solely to provide, operate,
                                secure, support, and improve the Services in accordance with
                                these Terms and our Privacy Policy.
                            </p>

                            <h2 className="mt-8 text-xl font-semibold leading-7 text-gray-900">
                                8. Third-Party Services
                            </h2>
                            <p className="mt-4 text-base leading-7 text-zinc-600">
                                The Services may integrate with third-party services, including
                                Google. Third-party services are governed by their own terms and
                                policies. MLAI is not responsible for third-party services.
                                Your use of Google services remains subject to Google's terms
                                and policies.
                            </p>

                            <h2 className="mt-8 text-xl font-semibold leading-7 text-gray-900">
                                9. Suspension and Termination
                            </h2>
                            <p className="mt-4 text-base leading-7 text-zinc-600">
                                We may suspend or terminate your access to the Services if we
                                reasonably believe you have violated these Terms, pose a risk to
                                the Services, or where required by law. You may stop using the
                                Services at any time and may revoke connected account access as
                                described above.
                            </p>

                            <h2 className="mt-8 text-xl font-semibold leading-7 text-gray-900">
                                10. Disclaimer of Warranties
                            </h2>
                            <p className="mt-4 text-base leading-7 text-zinc-600">
                                To the maximum extent permitted by law, the Services are
                                provided on an "as is" and "as available" basis. We disclaim all
                                warranties, express or implied, including implied warranties of
                                merchantability, fitness for a particular purpose, and
                                non-infringement.
                            </p>

                            <h2 className="mt-8 text-xl font-semibold leading-7 text-gray-900">
                                11. Limitation of Liability
                            </h2>
                            <p className="mt-4 text-base leading-7 text-zinc-600">
                                To the maximum extent permitted by law, MLAI will not be liable
                                for any indirect, incidental, special, consequential, or punitive
                                damages, or any loss of profits, revenue, data, goodwill, or
                                business opportunity arising from or related to your use of the
                                Services.
                            </p>

                            <h2 className="mt-8 text-xl font-semibold leading-7 text-gray-900">
                                12. Indemnity
                            </h2>
                            <p className="mt-4 text-base leading-7 text-zinc-600">
                                You agree to indemnify and hold harmless MLAI from and against
                                any claims, liabilities, damages, losses, and expenses arising
                                out of or related to your use of the Services, your content,
                                connected accounts or data, or your violation of these Terms.
                            </p>

                            <h2 className="mt-8 text-xl font-semibold leading-7 text-gray-900">
                                13. Privacy
                            </h2>
                            <p className="mt-4 text-base leading-7 text-zinc-600">
                                Our <a href="/privacy" className="font-semibold text-[#3b82f6] underline">Privacy Policy</a>{" "}
                                explains how we collect, use, protect, retain, and delete
                                personal information, including Google user data and Gmail data.
                                By using the Services, you acknowledge our Privacy Policy.
                            </p>

                            <h2 className="mt-8 text-xl font-semibold leading-7 text-gray-900">
                                14. Changes to These Terms
                            </h2>
                            <p className="mt-4 text-base leading-7 text-zinc-600">
                                We may update these Terms from time to time. We will post the
                                updated Terms on this page and update the "Last updated" date.
                                Your continued use of the Services after changes become
                                effective constitutes acceptance of the updated Terms.
                            </p>

                            <h2 className="mt-8 text-xl font-semibold leading-7 text-gray-900">
                                15. Contact Us
                            </h2>
                            <p className="mt-4 text-base leading-7 text-zinc-600">
                                If you have questions about these Terms, contact us at:
                            </p>

                            <div className="mt-4 bg-gray-50 p-6 rounded-lg">
                                <p className="mb-2 text-base leading-7 text-zinc-600">
                                    <strong>MLAI Aus Inc</strong>
                                </p>
                                <p className="mb-2 text-base leading-7 text-zinc-600">Email: hi@mlai.au</p>
                                <p className="text-base leading-7 text-zinc-600">Website: https://mlai.au</p>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </>
    );
}
