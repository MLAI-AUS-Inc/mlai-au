import type { MetaFunction } from "react-router";
import { Container } from "~/components/ui/Container";

const LAST_UPDATED = "16 December 2025"; // Update this manually when you change the Terms

export const meta: MetaFunction = () => {
    return [
        { title: "MLAI Terms of Service" },
        {
            name: "description",
            content:
                "MLAI Terms of Service governing use of MLAI services, including Google/Gmail connections and AI-generated summaries.",
        },
        {
            name: "keywords",
            content:
                "terms of service, MLAI, Gmail integration, Google OAuth, AI summaries, retention, data deletion",
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
                            MLAI Terms of Service
                        </h1>

                        <div className="mt-16 mb-24 space-y-7 text-base text-zinc-600 dark:text-gray-900">
                            <h2 className="text-xl font-semibold leading-7 text-gray-900">
                                Last updated: {LAST_UPDATED}
                            </h2>

                            <p className="mt-4 text-base leading-7 text-zinc-600">
                                These Terms of Service (“Terms”) govern your access to and use of the MLAI
                                websites, applications, and services (collectively, the “Services”) provided
                                by MLAI Aus Inc (“MLAI”, “we”, “our”, or “us”).
                            </p>

                            <p className="mt-4 text-base leading-7 text-zinc-600">
                                By accessing or using the Services, you agree to be bound by these Terms. If
                                you do not agree, do not use the Services.
                            </p>

                            <h2 className="mt-8 text-xl font-semibold leading-7 text-gray-900">
                                1. The Services
                            </h2>
                            <p className="mt-4 text-base leading-7 text-zinc-600">
                                MLAI provides community, educational, and software-based tools, which may
                                include AI-powered features. Some features allow you to connect third-party
                                accounts (such as Google/Gmail) so that MLAI can process your data to
                                deliver user-requested outputs, such as summaries and reports.
                            </p>

                            <h2 className="mt-8 text-xl font-semibold leading-7 text-gray-900">
                                2. Eligibility and Accounts
                            </h2>
                            <ul className="mt-4 list-disc pl-5 space-y-2 text-base leading-7 text-zinc-600">
                                <li>You must be able to form a legally binding contract to use the Services.</li>
                                <li>
                                    You are responsible for maintaining the confidentiality of your account
                                    credentials and for all activity under your account.
                                </li>
                                <li>
                                    You agree to provide accurate, current, and complete information and keep
                                    it updated.
                                </li>
                            </ul>

                            <h2 className="mt-8 text-xl font-semibold leading-7 text-gray-900">
                                3. Google/Gmail Connection (OAuth) and Email Analysis
                            </h2>
                            <p className="mt-4 text-base leading-7 text-zinc-600">
                                If you choose to connect your Google account, you authorize MLAI to access
                                the Google data you explicitly grant through the Google consent screen (for
                                example, Gmail data) for the purpose of providing the feature you requested
                                (for example, generating a monthly update).
                            </p>

                            <h3 className="mt-6 text-lg font-semibold leading-7 text-gray-900">
                                3.1 What you are authorising
                            </h3>
                            <p className="mt-4 text-base leading-7 text-zinc-600">
                                Depending on the feature you enable, MLAI may access Gmail data such as
                                email metadata (e.g., sender, recipient, subject, date) and/or email content
                                (e.g., body text). The exact permissions are shown on the Google consent
                                screen at the time you connect.
                            </p>

                            <h3 className="mt-6 text-lg font-semibold leading-7 text-gray-900">
                                3.2 What we do with Gmail data
                            </h3>
                            <ul className="mt-4 list-disc pl-5 space-y-2 text-base leading-7 text-zinc-600">
                                <li>
                                    We use Gmail data to provide the user-facing feature you requested, such
                                    as generating summaries, insights, and reports about your startup
                                    activity.
                                </li>
                                <li>
                                    We may process Gmail data using automated systems, including AI models, to
                                    produce the requested outputs.
                                </li>
                                <li>
                                    We may store tokens required to maintain your connection (including
                                    refresh tokens) and may store limited derived outputs (e.g., a generated
                                    monthly report) associated with your account.
                                </li>
                            </ul>

                            <h3 className="mt-6 text-lg font-semibold leading-7 text-gray-900">
                                3.3 Google API data use commitments
                            </h3>
                            <p className="mt-4 text-base leading-7 text-zinc-600">
                                When you connect Google services, we will handle Google user data in
                                accordance with our Privacy Policy and applicable Google requirements. In
                                particular:
                            </p>
                            <ul className="mt-4 list-disc pl-5 space-y-2 text-base leading-7 text-zinc-600">
                                <li>We do not sell Gmail data.</li>
                                <li>
                                    We do not use Gmail data to train or improve generalized AI/ML models
                                    (outside of providing the requested feature and personalizing your
                                    experience).
                                </li>
                                <li>
                                    We limit access to Gmail data to what is necessary to provide the feature
                                    you request.
                                </li>
                            </ul>

                            <h3 className="mt-6 text-lg font-semibold leading-7 text-gray-900">
                                3.4 What we store (email content vs derived summaries)
                            </h3>
                            <p className="mt-4 text-base leading-7 text-zinc-600">
                                Our goal is to minimise the data we store.
                            </p>
                            <ul className="mt-4 list-disc pl-5 space-y-2 text-base leading-7 text-zinc-600">
                                <li>
                                    <strong>Raw Gmail content:</strong> We do not permanently store your Gmail
                                    email content (including message bodies). Any Gmail data accessed via your
                                    connection is processed transiently for the requested feature and then
                                    disposed of.
                                </li>
                                <li>
                                    <strong>Derived outputs:</strong> We may store derived outputs (for example,
                                    a monthly summary/report, insights, action items, or aggregated metrics)
                                    associated with your account so you can view them later.
                                </li>
                                <li>
                                    <strong>Connection data:</strong> We may store OAuth connection tokens
                                    (including refresh tokens) and basic account identifiers (such as the email
                                    address associated with the connected Google account) to keep the
                                    integration working.
                                </li>
                            </ul>

                            <h3 className="mt-6 text-lg font-semibold leading-7 text-gray-900">
                                3.5 Data retention (retention window)
                            </h3>
                            <ul className="mt-4 list-disc pl-5 space-y-2 text-base leading-7 text-zinc-600">
                                <li>
                                    <strong>Gmail data accessed via your connection:</strong> We do not store
                                    your Gmail data and will dispose of any data gained from your Gmail
                                    connection within <strong>24 hours</strong>.
                                </li>
                                <li>
                                    <strong>Derived outputs (e.g., monthly reports):</strong> We retain derived
                                    outputs only for as long as necessary to provide the Services to you (for
                                    example, while your account remains active, or until you delete them).
                                </li>
                                <li>
                                    <strong>OAuth tokens:</strong> We retain refresh tokens while your Gmail
                                    connection is active so we can generate recurring updates. If you
                                    disconnect Google/Gmail or delete your account, we will delete or
                                    invalidate stored tokens within a reasonable time.
                                </li>
                            </ul>

                            <h3 className="mt-6 text-lg font-semibold leading-7 text-gray-900">
                                3.6 Disconnecting, deleting data, and revoking access
                            </h3>
                            <p className="mt-4 text-base leading-7 text-zinc-600">
                                You can disconnect your Google account from MLAI in your account settings
                                (if available) and you can also revoke MLAI’s access at any time in your
                                Google Account permissions page. After you disconnect or revoke access,
                                some features may stop working.
                            </p>
                            <p className="mt-4 text-base leading-7 text-zinc-600">
                                If you want MLAI to delete data associated with your Gmail connection or AI
                                outputs, you can:
                            </p>
                            <ul className="mt-4 list-disc pl-5 space-y-2 text-base leading-7 text-zinc-600">
                                <li>
                                    Use the <strong>Settings</strong> area (if available) to disconnect Google/Gmail
                                    and/or delete your generated reports.
                                </li>
                                <li>
                                    Email us at <strong>hi@mlai.au</strong> with your request (please include the
                                    Google email address you connected, and your MLAI account email if
                                    different).
                                </li>
                            </ul>
                            <p className="mt-4 text-base leading-7 text-zinc-600">
                                We will action deletion requests within a reasonable time and, where
                                applicable, confirm once completed.
                            </p>

                            <h2 className="mt-8 text-xl font-semibold leading-7 text-gray-900">
                                4. Your Responsibilities
                            </h2>
                            <ul className="mt-4 list-disc pl-5 space-y-2 text-base leading-7 text-zinc-600">
                                <li>You may only connect accounts and data that you own or are authorized to use.</li>
                                <li>
                                    You are responsible for ensuring that your use of the Services complies
                                    with applicable laws, regulations, and contractual obligations (including
                                    confidentiality obligations to third parties).
                                </li>
                                <li>You are responsible for reviewing outputs before relying on them for important decisions.</li>
                            </ul>

                            <h2 className="mt-8 text-xl font-semibold leading-7 text-gray-900">
                                5. Acceptable Use
                            </h2>
                            <p className="mt-4 text-base leading-7 text-zinc-600">
                                You agree not to misuse the Services. You must not, and must not attempt to:
                            </p>
                            <ul className="mt-4 list-disc pl-5 space-y-2 text-base leading-7 text-zinc-600">
                                <li>Access or use the Services in a way that violates any law or infringes the rights of others.</li>
                                <li>Attempt to gain unauthorized access to any accounts, systems, or networks.</li>
                                <li>
                                    Reverse engineer, decompile, or attempt to extract the source code of the
                                    Services except to the extent permitted by law.
                                </li>
                                <li>Upload or transmit malware or interfere with the operation or security of the Services.</li>
                            </ul>

                            <h2 className="mt-8 text-xl font-semibold leading-7 text-gray-900">
                                6. AI Outputs and Disclaimers
                            </h2>
                            <p className="mt-4 text-base leading-7 text-zinc-600">
                                The Services may produce outputs generated by AI. AI-generated outputs may
                                be inaccurate, incomplete, or misleading and should not be treated as
                                professional advice (including legal, financial, tax, medical, or security
                                advice). You are solely responsible for how you use any outputs.
                            </p>

                            <h2 className="mt-8 text-xl font-semibold leading-7 text-gray-900">
                                7. Intellectual Property
                            </h2>
                            <p className="mt-4 text-base leading-7 text-zinc-600">
                                We and our licensors own all rights, title, and interest in and to the
                                Services, including all intellectual property rights. You retain ownership
                                of your content. You grant MLAI a limited license to process your content
                                solely to provide and operate the Services.
                            </p>

                            <h2 className="mt-8 text-xl font-semibold leading-7 text-gray-900">
                                8. Third-Party Services
                            </h2>
                            <p className="mt-4 text-base leading-7 text-zinc-600">
                                The Services may integrate with third-party services (such as Google).
                                Third-party services are governed by their own terms and policies. MLAI is
                                not responsible for third-party services.
                            </p>

                            <h2 className="mt-8 text-xl font-semibold leading-7 text-gray-900">
                                9. Suspension and Termination
                            </h2>
                            <p className="mt-4 text-base leading-7 text-zinc-600">
                                We may suspend or terminate your access to the Services if we reasonably
                                believe you have violated these Terms, pose a risk to the Services, or where
                                required by law. You may stop using the Services at any time and may revoke
                                connected account access as described above.
                            </p>

                            <h2 className="mt-8 text-xl font-semibold leading-7 text-gray-900">
                                10. Disclaimer of Warranties
                            </h2>
                            <p className="mt-4 text-base leading-7 text-zinc-600">
                                To the maximum extent permitted by law, the Services are provided on an “as
                                is” and “as available” basis. We disclaim all warranties, express or
                                implied, including implied warranties of merchantability, fitness for a
                                particular purpose, and non-infringement.
                            </p>

                            <h2 className="mt-8 text-xl font-semibold leading-7 text-gray-900">
                                11. Limitation of Liability
                            </h2>
                            <p className="mt-4 text-base leading-7 text-zinc-600">
                                To the maximum extent permitted by law, MLAI will not be liable for any
                                indirect, incidental, special, consequential, or punitive damages, or any
                                loss of profits, revenue, data, or goodwill arising from or related to your
                                use of the Services.
                            </p>

                            <h2 className="mt-8 text-xl font-semibold leading-7 text-gray-900">
                                12. Indemnity
                            </h2>
                            <p className="mt-4 text-base leading-7 text-zinc-600">
                                You agree to indemnify and hold harmless MLAI from and against any claims,
                                liabilities, damages, losses, and expenses arising out of or related to
                                your use of the Services, your content, or your violation of these Terms.
                            </p>

                            <h2 className="mt-8 text-xl font-semibold leading-7 text-gray-900">
                                13. Privacy
                            </h2>
                            <p className="mt-4 text-base leading-7 text-zinc-600">
                                Our Privacy Policy explains how we collect, use, and protect personal
                                information. By using the Services, you agree to our Privacy Policy.
                            </p>

                            <h2 className="mt-8 text-xl font-semibold leading-7 text-gray-900">
                                14. Changes to These Terms
                            </h2>
                            <p className="mt-4 text-base leading-7 text-zinc-600">
                                We may update these Terms from time to time. We will post the updated Terms
                                on this page and update the “Last updated” date. Your continued use of the
                                Services after changes become effective constitutes acceptance of the
                                updated Terms.
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
