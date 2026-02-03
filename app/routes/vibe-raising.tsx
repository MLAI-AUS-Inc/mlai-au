import { useState } from "react";
import { Link } from "react-router";
import type { Route } from "./+types/vibe-raising";

const PAGE_TITLE = 'Vibe Raising: Unlock Capital with Monthly Founder Updates.';
const PAGE_DESCRIPTION =
    'Regular, authentic updates are crucial for keeping investors engaged and informed about your progress.';

export function meta({ }: Route.MetaArgs) {
    return [
        { title: 'Vibe Raising | MLAI Community' },
        { name: "description", content: PAGE_DESCRIPTION },
        { tagName: "link", rel: "canonical", href: "https://www.mlai.au/vibe-raising" },
    ];
}

export async function loader({ }: Route.LoaderArgs) {
    return {};
}

export default function VibeRaisingPage({ }: Route.ComponentProps) {
    const [activeTab, setActiveTab] = useState<'investors' | 'founders'>('investors');

    return (
        <main className="bg-[var(--brutalist-beige)]">
            {/* Hero Section */}
            <div className="pt-2 lg:pt-3">
                <div className="max-w-6xl mx-auto px-4 lg:px-6">
                    <section className="bg-[var(--brutalist-mint)] rounded-xl p-8 lg:p-12">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-zinc-900 tracking-tight">
                            {PAGE_TITLE}
                        </h1>
                    </section>
                </div>
            </div>

            {/* Tab Navigation */}
            <div className="mt-8">
                <div className="max-w-6xl mx-auto px-4 lg:px-6">
                    <div className="flex gap-1">
                        <button
                            onClick={() => setActiveTab('investors')}
                            className={`px-8 py-4 font-bold transition-all rounded-t-xl ${activeTab === 'investors'
                                ? 'bg-[#ff3d00] text-white relative z-10'
                                : 'bg-white text-zinc-700 hover:bg-zinc-100'
                                }`}
                        >
                            For Investors
                        </button>
                        <button
                            onClick={() => setActiveTab('founders')}
                            className={`px-8 py-4 font-bold transition-all rounded-t-xl ${activeTab === 'founders'
                                ? 'bg-[#4b0db3] text-white relative z-10'
                                : 'bg-white text-zinc-700 hover:bg-zinc-100'
                                }`}
                        >
                            For Founders
                        </button>
                    </div>
                </div>
            </div>

            {/* Tab Content Container */}
            <div className="max-w-6xl mx-auto px-4 lg:px-6">
                <div className="bg-white rounded-b-xl rounded-tr-xl p-8">
                    {/* Investors Tab Content */}
                    {activeTab === 'investors' && (
                        <div>
                            {/* Two-Column Layout: Key Facts + Image */}
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
                                {/* Left Column: Key Facts */}
                                <div className="bg-[#ff3d00] rounded-xl p-8 text-white">
                                    <h2 className="text-2xl font-bold mb-6">FOR INVESTORS: WHY VIBE RAISING MATTERS</h2>

                                    <p className="text-base leading-relaxed mb-6">
                                        Stay informed about your portfolio companies with consistent, high-quality monthly updates.
                                    </p>

                                    <div className="space-y-6">
                                        <div className="flex gap-3">
                                            <span className="text-2xl flex-shrink-0">•</span>
                                            <div>
                                                <p className="font-bold mb-2">How do I track my portfolio companies?</p>
                                                <p className="text-sm leading-relaxed opacity-95">
                                                    Get standardized updates across all your investments, making it easy to monitor progress and identify opportunities to help.
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex gap-3">
                                            <span className="text-2xl flex-shrink-0">•</span>
                                            <div>
                                                <p className="font-bold mb-2">Where can I find active fundraising startups?</p>
                                                <p className="text-sm leading-relaxed opacity-95">
                                                    Access vetted startups that are actively fundraising. Founders who maintain regular updates demonstrate transparency and strong execution.
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex gap-3">
                                            <span className="text-2xl flex-shrink-0">•</span>
                                            <div>
                                                <p className="font-bold mb-2">How do I discover high-quality deal flow?</p>
                                                <p className="text-sm leading-relaxed opacity-95">
                                                    Surface active, funded-ready startups with live metrics and growth signals you won't find elsewhere.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Right Column: Image */}
                                <div className="bg-zinc-100 rounded-xl overflow-hidden">
                                    <img
                                        src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=800&h=600&fit=crop"
                                        alt="Founders discussing business strategy"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            </div>

                            {/* How the Loop Works */}
                            <div className="mb-12">
                                <h2 className="text-3xl font-bold text-zinc-900 mb-8">How the Loop Works:</h2>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <div className="bg-[#ff3d00] rounded-xl p-6 text-white">
                                        <div className="text-3xl mb-4">📤</div>
                                        <h3 className="text-xl font-bold mb-3">Founders share</h3>
                                        <p className="text-sm">
                                            Regular updates keep profiles fresh and momentum visible.
                                        </p>
                                    </div>
                                    <div className="bg-[#4b0db3] rounded-xl p-6 text-white">
                                        <div className="text-3xl mb-4">🔍</div>
                                        <h3 className="text-xl font-bold mb-3">Investors discover</h3>
                                        <p className="text-sm">
                                            Relevant, timely information about startups that match your thesis.
                                        </p>
                                    </div>
                                    <div className="bg-[#FFF500] rounded-xl p-6">
                                        <div className="text-3xl mb-4">✨</div>
                                        <h3 className="text-xl font-bold mb-3 text-zinc-900">Vibe Raising connects</h3>
                                        <p className="text-sm text-zinc-700">
                                            Unique data enables smarter, more meaningful introductions.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* The Problem & Solution */}
                            <div className="mb-12">
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                    <div className="bg-[var(--brutalist-beige)] rounded-xl p-8">
                                        <p className="text-[#4b0db3] font-bold text-sm uppercase mb-3">THE PROBLEM</p>
                                        <h3 className="text-2xl font-bold text-zinc-900 mb-4">
                                            Australia has incredible startups, but discovering them is hard.
                                        </h3>
                                        <p className="text-zinc-600">
                                            Existing directories go stale. Opportunities get missed. The ecosystem lacks a living, breathing source of truth.
                                        </p>
                                    </div>
                                    <div className="bg-[var(--brutalist-mint)] rounded-xl p-8">
                                        <p className="text-zinc-700 font-bold text-sm uppercase mb-3">OUR SOLUTION</p>
                                        <h3 className="text-2xl font-bold text-zinc-900 mb-4">
                                            Vibe Raising makes freshness the core feature.
                                        </h3>
                                        <p className="text-zinc-700">
                                            Not an afterthought. Regular founder updates create a self-sustaining loop that keeps our directory perpetually current.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* For Investors & VCs */}
                            <div>
                                <h2 className="text-3xl font-bold text-zinc-900 mb-8">For Investors & VCs:</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                    <div className="bg-[#3537dc] rounded-xl p-6 text-white">
                                        <div className="text-3xl mb-4">📊</div>
                                        <h3 className="text-xl font-bold mb-3">Exclusive data</h3>
                                        <p className="text-sm">
                                            Access insights you won't find elsewhere—live metrics and growth signals.
                                        </p>
                                    </div>
                                    <div className="bg-[#ff3d00] rounded-xl p-6 text-white">
                                        <div className="text-3xl mb-4">⏱️</div>
                                        <h3 className="text-xl font-bold mb-3">Save hours sourcing</h3>
                                        <p className="text-sm">
                                            No more stale directories. Surface active, funded-ready startups.
                                        </p>
                                    </div>
                                    <div className="bg-[var(--brutalist-mint)] rounded-xl p-6">
                                        <div className="text-3xl mb-4">📈</div>
                                        <h3 className="text-xl font-bold mb-3 text-zinc-900">Better matching</h3>
                                        <p className="text-sm text-zinc-700">
                                            Intelligent matching between investor preferences and startup trajectories.
                                        </p>
                                    </div>
                                    <div className="bg-[#FFF500] rounded-xl p-6">
                                        <div className="text-3xl mb-4">🚀</div>
                                        <h3 className="text-xl font-bold mb-3 text-zinc-900">Early access</h3>
                                        <p className="text-sm text-zinc-700">
                                            See emerging startups before they hit the mainstream radar.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Investor Call to Action */}
                            <div className="mt-12 bg-[#3537dc] rounded-xl p-8 text-center">
                                <h3 className="text-3xl font-bold text-white mb-4">
                                    Interested in Accessing Our Deal Flow?
                                </h3>
                                <p className="text-white text-lg mb-6 max-w-2xl mx-auto">
                                    Get in touch to learn more about how you can discover high-quality startups through Vibe Raising.
                                </p>
                                <a
                                    href="mailto:hi@mlai.au?subject=Investor Interest in Vibe Raising"
                                    className="inline-block px-8 py-4 bg-white text-[#3537dc] font-bold rounded-lg hover:bg-zinc-100 transition text-lg"
                                >
                                    Email Us at hi@mlai.au
                                </a>
                            </div>
                        </div>
                    )}

                    {/* Founders Tab Content */}
                    {activeTab === 'founders' && (
                        <div>
                            {/* How the Loop Works */}
                            <div className="mb-12">
                                <h2 className="text-3xl font-bold text-zinc-900 mb-8">How the Loop Works:</h2>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <div className="bg-[#ff3d00] rounded-xl p-6 text-white">
                                        <div className="text-3xl mb-4">📤</div>
                                        <h3 className="text-xl font-bold mb-3">Founders share</h3>
                                        <p className="text-sm">
                                            Regular updates keep profiles fresh and momentum visible.
                                        </p>
                                    </div>
                                    <div className="bg-[#4b0db3] rounded-xl p-6 text-white">
                                        <div className="text-3xl mb-4">🔍</div>
                                        <h3 className="text-xl font-bold mb-3">Investors discover</h3>
                                        <p className="text-sm">
                                            Relevant, timely information about startups that match your thesis.
                                        </p>
                                    </div>
                                    <div className="bg-[#FFF500] rounded-xl p-6">
                                        <div className="text-3xl mb-4">✨</div>
                                        <h3 className="text-xl font-bold mb-3 text-zinc-900">Vibe Raising connects</h3>
                                        <p className="text-sm text-zinc-700">
                                            Unique data enables smarter, more meaningful introductions.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* The Problem & Solution */}
                            <div className="mb-12">
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                    <div className="bg-[var(--brutalist-beige)] rounded-xl p-8">
                                        <p className="text-[#4b0db3] font-bold text-sm uppercase mb-3">THE PROBLEM</p>
                                        <h3 className="text-2xl font-bold text-zinc-900 mb-4">
                                            Australia has incredible startups, but discovering them is hard.
                                        </h3>
                                        <p className="text-zinc-600">
                                            Existing directories go stale. Opportunities get missed. The ecosystem lacks a living, breathing source of truth.
                                        </p>
                                    </div>
                                    <div className="bg-[var(--brutalist-mint)] rounded-xl p-8">
                                        <p className="text-zinc-700 font-bold text-sm uppercase mb-3">OUR SOLUTION</p>
                                        <h3 className="text-2xl font-bold text-zinc-900 mb-4">
                                            Vibe Raising makes freshness the core feature.
                                        </h3>
                                        <p className="text-zinc-700">
                                            Not an afterthought. Regular founder updates create a self-sustaining loop that keeps our directory perpetually current.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* For Founders Section */}
                            <div>

                                <h2 className="text-3xl font-bold text-zinc-900 mb-8">How It Works</h2>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                                    <div className="bg-[var(--brutalist-beige)] rounded-xl p-6">
                                        <div className="text-3xl font-bold text-[#ff3d00] mb-3">1</div>
                                        <h3 className="text-xl font-bold text-zinc-900 mb-3">Create Your Update</h3>
                                        <p className="text-zinc-700">
                                            Use our streamlined template to quickly document your monthly progress, metrics, wins, and challenges. No more wrestling with formatting or wondering what to include.
                                        </p>
                                    </div>

                                    <div className="bg-[var(--brutalist-beige)] rounded-xl p-6">
                                        <div className="text-3xl font-bold text-[#4b0db3] mb-3">2</div>
                                        <h3 className="text-xl font-bold text-zinc-900 mb-3">Publish to Your Network</h3>
                                        <p className="text-zinc-700">
                                            Share your update with existing investors through our platform. They receive a professional, well-formatted report that keeps them engaged and informed.
                                        </p>
                                    </div>

                                    <div className="bg-[var(--brutalist-beige)] rounded-xl p-6">
                                        <div className="text-3xl font-bold text-[#3537dc] mb-3">3</div>
                                        <h3 className="text-xl font-bold text-zinc-900 mb-3">Get Introductions</h3>
                                        <p className="text-zinc-700">
                                            When you're raising capital, we connect you with warm introductions to relevant investors who match your stage, industry, and geography.
                                        </p>
                                    </div>
                                </div>

                                {/* Why We're Building This */}
                                <div className="bg-[var(--brutalist-mint)] rounded-xl p-8 mb-12">
                                    <h2 className="text-3xl font-bold text-zinc-900 mb-6">Why We're Building This</h2>
                                    <div className="prose prose-zinc max-w-none">
                                        <p className="text-zinc-700 mb-4 text-lg">
                                            We've seen too many founders struggle with the same challenges:
                                        </p>
                                        <ul className="space-y-3 text-zinc-700">
                                            <li className="flex gap-3">
                                                <span className="text-[#ff3d00] font-bold">→</span>
                                                <span><strong>Investor updates get deprioritized</strong> when founders are busy building product and serving customers</span>
                                            </li>
                                            <li className="flex gap-3">
                                                <span className="text-[#ff3d00] font-bold">→</span>
                                                <span><strong>Cold outreach to investors is painful</strong> and has incredibly low conversion rates</span>
                                            </li>
                                            <li className="flex gap-3">
                                                <span className="text-[#ff3d00] font-bold">→</span>
                                                <span><strong>Existing investors lose track of progress</strong> and can't help when they don't know what's happening</span>
                                            </li>
                                            <li className="flex gap-3">
                                                <span className="text-[#ff3d00] font-bold">→</span>
                                                <span><strong>The best investor relationships</strong> come from warm introductions, but they're hard to come by</span>
                                            </li>
                                        </ul>
                                        <p className="text-zinc-700 mt-6 text-lg">
                                            Vibe Raising solves these problems by making it easy to maintain regular communication with your investor network while opening doors to new capital when you need it.
                                        </p>
                                    </div>
                                </div>

                                {/* Benefits Section */}
                                <div className="mb-12">
                                    <h2 className="text-3xl font-bold text-zinc-900 mb-6">The Benefits of Publishing Through Our Platform</h2>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="bg-[var(--brutalist-beige)] rounded-xl p-6">
                                            <h3 className="text-xl font-bold text-zinc-900 mb-3 flex items-center gap-2">
                                                <span className="text-2xl">📈</span>
                                                Build Investor Confidence
                                            </h3>
                                            <p className="text-zinc-700">
                                                Consistent, transparent updates demonstrate professionalism and build trust. Investors are more likely to double down or make introductions when they're actively engaged with your journey.
                                            </p>
                                        </div>

                                        <div className="bg-[var(--brutalist-beige)] rounded-xl p-6">
                                            <h3 className="text-xl font-bold text-zinc-900 mb-3 flex items-center gap-2">
                                                <span className="text-2xl">🤝</span>
                                                Access Warm Introductions
                                            </h3>
                                            <p className="text-zinc-700">
                                                When you're ready to raise, we leverage your track record of updates to connect you with investors who have funded similar companies. Warm intros convert at 10-20x the rate of cold outreach.
                                            </p>
                                        </div>

                                        <div className="bg-[var(--brutalist-beige)] rounded-xl p-6">
                                            <h3 className="text-xl font-bold text-zinc-900 mb-3 flex items-center gap-2">
                                                <span className="text-2xl">⚡</span>
                                                Save Time Every Month
                                            </h3>
                                            <p className="text-zinc-700">
                                                Our structured templates and automation cut your reporting time from hours to minutes. Spend less time writing emails and more time building your business.
                                            </p>
                                        </div>

                                        <div className="bg-[var(--brutalist-beige)] rounded-xl p-6">
                                            <h3 className="text-xl font-bold text-zinc-900 mb-3 flex items-center gap-2">
                                                <span className="text-2xl">🌏</span>
                                                Connect Globally
                                            </h3>
                                            <p className="text-zinc-700">
                                                Access investors across Australia and internationally. We work with angels, VCs, and family offices who actively invest in early-stage companies across multiple sectors.
                                            </p>
                                        </div>

                                        <div className="bg-[var(--brutalist-beige)] rounded-xl p-6">
                                            <h3 className="text-xl font-bold text-zinc-900 mb-3 flex items-center gap-2">
                                                <span className="text-2xl">💡</span>
                                                Get Valuable Feedback
                                            </h3>
                                            <p className="text-zinc-700">
                                                Regular updates create opportunities for investors to provide advice, make introductions to customers, and help you navigate challenges they've seen before.
                                            </p>
                                        </div>

                                        <div className="bg-[var(--brutalist-beige)] rounded-xl p-6">
                                            <h3 className="text-xl font-bold text-zinc-900 mb-3 flex items-center gap-2">
                                                <span className="text-2xl">🎯</span>
                                                Track Your Progress
                                            </h3>
                                            <p className="text-zinc-700">
                                                Looking back at your monthly updates gives you a clear view of your startup's trajectory. See how far you've come and spot trends you might have missed.
                                            </p>
                                        </div>
                                    </div>
                                </div>


                            </div>
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
}
