import type { Route } from "./+types/esafety.resources";
import { useLoaderData, redirect } from "react-router";
import { getCurrentUser } from "~/lib/auth";
import { getEnv } from "~/lib/env.server";
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/20/solid";
import ReactMarkdown from "react-markdown";

export async function loader({ request, context }: Route.LoaderArgs) {
    const env = getEnv(context);
    const user = await getCurrentUser(env, request);
    if (!user) return redirect("/platform/login");
    return { user };
}

interface Challenge {
    title: string;
    image: string;
    content: string;
}

const challenges: Challenge[] = [
    {
        title: "Women in the Spotlight",
        image: "https://mlai.au/hackathon/width_550.webp",
        content: `### 1) What’s the problem?
Everyone should expect to have safe and positive experiences online. But many women face online abuse simply because they have an active online presence as part of their working life. 

Examples of online abuse include:

- **Impersonation accounts**: A fake social media account set up to humiliate a person.
- **Trolling**: Deliberately provoking an argument or emotional reaction from someone.
- **Doxing**: Sharing someone’s personal details online without their consent.
- **Deepfakes**: Creating a fake nude of someone and posting it online.
- **Defamatory comments**: Someone has posted comments intended to harm another person’s reputation.

### 2) Why is this a problem?

- **Devastating Impacts**: Online abuse can affect a victim’s wellbeing, mental health, confidence, relationships and sense of safety.
- **Self-Censorship**: It can lead to women taking a step back from public conversations or self-censoring out of fear for their privacy and safety.
- **Escalation**: Online abuse can quickly intensify in scale and nature, and can feel deeply personal.

### 3) How do we know it’s a real problem?

- **1 in 3** women surveyed by eSafety experienced online abuse in a work context.
- **76%** of those surveyed believe authorities won’t take the incident seriously until there is physical danger.
- **25%** of women surveyed were hesitant to move into a role that required an online public or media presence.

> *Source: eSafety’s ‘Women in the Spotlight’ research report.*

### Where could teams start?

Check out eSafety’s ‘Technology, gendered violence and Safety by Design’ guideline for guiding principles and examples of existing solutions.

[View Implementation Guides →](https://www.esafety.gov.au/industry/safety-by-design/implementation-guides)`
    },
    {
        title: "‘Manosphere’ communities",
        image: "https://mlai.au/hackathon/width_550%20(1).webp",
        content: `### What’s the problem?

While online communities can be a source of connection, acceptance, and support, they can also be places where abuse and negativity are common and normalised. 

**Harmful online communities include ‘manospheres’** - a term coined to represent a spectrum of online spaces which propagate sexist, misogynistic and violence-supporting attitudes. These communities, often bound by a sense of entitlement over women’s bodies and a desire to prevent their autonomy, include:
- Involuntary Celibates (incels)
- Men’s Right’s Activists
- Pickup Artists
- Men Going Their Own Way

### Why is it a problem?

Manosphere communities normalise harmful gender norms and misogynistic attitudes, which can escalate into real-world consequences. These spaces often:
- Objectify women
- Promote rigid masculine ideals
- Condone violence against women
- Encourage backlash against gender equality

**Impact**: Exposure to such content can shape young men’s beliefs and behaviours, reinforcing entitlement over women’s bodies and fostering attitudes that support violence. The content is often packaged as aspirational ‘self-improvement,’ making harmful ideas appear attractive and legitimate.

### How do we know it’s a real problem?

The eSafety Commissioner’s research into the online experiences of young men and boys found that:

- **Normalised Negativity**: Young men see online communities as places where abuse and negativity are common, noting that sexism, racism and transphobia can flourish.
- **Narrow Ideals**: Some young men criticise the messages of male empowerment influencers for promoting a narrow ideal of what it means to be a man.
- **Pressure to Conform**: Young men described feeling pressure to conform to rigid masculine ideals and noted that aggression and discrimination are often seen as ‘expected’ parts of being online.
- **Algorithmic Amplification**: Survey participants were critically aware that recommender systems push influencer content, increasing exposure to harmful ideas.

### Where could teams start?

Check out eSafety’s ‘Technology, gendered violence and Safety by Design’ guideline for guiding principles and examples of existing solutions.

[View Implementation Guides →](https://www.esafety.gov.au/industry/safety-by-design/implementation-guides)`
    },
    {
        title: "Early Detection of Online Grooming in Long-Form Conversations",
        image: "https://mlai.au/hackathon/width_550%20(2).webp",
        content: `### Problem

Online grooming often begins with harmless-looking conversations and only becomes detectable after many messages. Traditional moderation tools rely on short message windows and struggle to understand long-term intent. 

**The Challenge**: Companies need a way to identify grooming patterns early, across extended chats, without incurring huge compute costs.

### Why is this a problem?

Most existing moderation systems rely on running large language models over long chat histories, which is **extremely expensive and impractical** to do continuously in real time. 

This leads to dangerous gaps where grooming goes unnoticed, creating both safety risks for users and regulatory or reputational consequences for platforms. Human moderators can help, but manual review doesn’t scale and typically only identifies grooming once it has already escalated.

### How do we know it’s a real problem?

Recent figures highlight an alarming increase in online grooming and related exploitation:

- **456,000+ reports** of online enticement received by NCMEC in 2024 alone (through Oct 5).
- **89% surge** in online grooming crimes in the UK over the past six years (NSPCC data).
- **36 million+ reports** of suspected online child sexual abuse logged EU-wide in 2023.

### Where could teams start?

Some suggestions:

- **Context Compression**: Build a lightweight pipeline that turns long chats into structured summaries or feature vectors.
- **Heuristics Engine**: Design rules that capture early-stage grooming markers (power imbalance, boundary-testing, personal info probing).
- **Small Models**: Train or fine-tune a small model that flags risky conversational trajectories without needing full transcripts.
- **Sliding Window**: Implement a sliding-window approach that accumulates risk scores over time.
- **UX/Ops**: Create alerting flows that escalate risk gradually instead of all-or-nothing triggers.

### What does “good” look like?

- **Early Detection**: Detects early-stage grooming at least 30–50% earlier than naive single-message classifiers.
- **Efficiency**: Reduces token usage or compute cost by 50–90% vs full-history LLM scans.
- **Precision**: Maintains acceptable precision (low false positives) to avoid alert fatigue.
- **Real-time**: Works in real-time or near-real-time (ideally sub-second but no longer than 2 seconds).
- **Explainability**: Clear explanation of risk signals or reasoning.

### Competitors & benchmarks

- Existing safety APIs (OpenAI, Google, Modclub, Hive) detect grooming but mostly per-message or short-context.
- Academic models exist but often don’t scale or handle real-world messy chat data.
- LLM-only solutions perform well but cost too much for continuous monitoring.
- **Gap**: Practical, cost-efficient early detection over long multi-turn chats.

*See also: [Nature Article](https://www.nature.com/articles/s41598-024-83003-4) and [Frontiers Article](https://www.frontiersin.org/journals/pediatrics/articles/10.3389/fped.2025.1591828/full)*

### Market & users

- Platforms with minors (gaming, social, education, chat apps) benefit immediately.
- Tens of millions of daily conversations across these platforms need automated safeguards.
- Strong business value: reduced safety incidents, regulatory compliance, brand protection.

### Data & resources you’ll provide

- Synthetic chat transcripts simulating grooming escalation.
- JSON schema for message streams and example expected outputs (risk scores, flags).
- Paxmod API docs

**Contact**: Alan Agon: alan@paxmod.com`
    }
];

export default function EsafetyAppResources() {
    const { user } = useLoaderData<typeof loader>();

    return (
        <main className="mx-auto max-w-[90rem] px-4 sm:px-6 py-8">
            <div className="text-center mb-10">
                <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Resources & Challenges</h2>
                <p className="mt-4 text-lg leading-6 text-gray-500">
                    Explore the challenges and resources available for the hackathon.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column: Challenges (2/3) */}
                <div className="lg:col-span-2 space-y-6">
                    {challenges.map((challenge, index) => (
                        <Disclosure as="div" key={index} className="bg-white rounded-2xl shadow-sm ring-1 ring-gray-900/5 overflow-hidden transition-all duration-300 hover:shadow-md" defaultOpen={index === 0}>
                            {({ open }) => (
                                <>
                                    <DisclosureButton className="w-full text-left focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                                        <div className="relative h-48 sm:h-64 w-full overflow-hidden">
                                            <img
                                                src={challenge.image}
                                                alt={challenge.title}
                                                className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent flex items-end">
                                                <div className="p-6 sm:p-8 w-full flex justify-between items-end">
                                                    <h3 className="text-2xl sm:text-3xl font-bold text-white shadow-sm tracking-tight">{challenge.title}</h3>
                                                    <ChevronUpIcon
                                                        className={`${open ? 'rotate-180 transform' : ''
                                                            } h-8 w-8 text-white transition-transform duration-200`}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </DisclosureButton>
                                    <DisclosurePanel className="px-6 py-8 sm:px-8 text-gray-700 bg-white">
                                        <div className="prose prose-lg prose-indigo max-w-none 
                                            prose-headings:font-bold prose-headings:text-gray-900 prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-4
                                            prose-p:leading-relaxed prose-p:text-gray-600 prose-p:mb-4
                                            prose-li:text-gray-600 prose-li:my-1
                                            prose-strong:text-indigo-700 prose-strong:font-semibold
                                            prose-a:text-indigo-600 prose-a:no-underline hover:prose-a:underline
                                            prose-blockquote:border-l-4 prose-blockquote:border-indigo-500 prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:text-gray-500">
                                            <ReactMarkdown>{challenge.content}</ReactMarkdown>
                                        </div>
                                    </DisclosurePanel>
                                </>
                            )}
                        </Disclosure>
                    ))}
                </div>

                {/* Right Column: Scoring (1/3) */}
                <div className="space-y-6">
                    {/* Mini-Challenge Scoring Card */}
                    <a
                        href="https://www.kaggle.com/competitions/needle-in-the-hashtag/overview"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block bg-white rounded-2xl shadow-sm ring-1 ring-gray-900/5 p-6 sm:p-8 transition-all duration-300 hover:shadow-md hover:ring-1 hover:ring-indigo-500 group"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-xl font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">🎯 Mini-Challenge Scoring</h3>
                            <span className="text-gray-400 group-hover:text-indigo-500 transition-colors">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                </svg>
                            </span>
                        </div>
                        <div className="prose prose-sm prose-indigo text-gray-600">
                            <p>View the full scoring criteria and submission details on Kaggle.</p>
                            <ul className="mt-4 space-y-2">
                                <li>Needle in the Hashtag Competition</li>
                                <li>Leaderboard & Evaluation</li>
                                <li>Submission Format</li>
                            </ul>
                        </div>
                    </a>

                    {/* Grand Challenge Scoring Card */}
                    <div className="bg-white rounded-2xl shadow-sm ring-1 ring-gray-900/5 p-6 sm:p-8">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-xl font-bold text-gray-900">🏆 Grand Challenge Scoring</h3>
                            <span className="inline-flex items-center rounded-full bg-indigo-50 px-2.5 py-0.5 text-xs font-medium text-indigo-700 ring-1 ring-inset ring-indigo-700/10">
                                Total /50
                            </span>
                        </div>
                        <div className="space-y-5">
                            {[
                                { title: "Innovation", score: "/5", desc: "Does the solution provide a new or significantly improved approach to what's currently available?" },
                                { title: "Usefulness (User Needs)", score: "/10", desc: "Does it truly address the needs of the user? Does it solve a large problem?" },
                                { title: "Viability", score: "/10", desc: "Is it scalable, cost-effective, and easy to adopt?" },
                                { title: "Technical", score: "/10", desc: "Is what the team built technically complex? Is their future vision technically feasible?" },
                                { title: "Business", score: "/10", desc: "Does it have the potential to be implemented and possibly funded?" },
                                { title: "Sustainability", score: "/5", desc: "Will it minimise long-term environmental impact and stand the test of time?" }
                            ].map((item, i) => (
                                <div key={i} className="group">
                                    <div className="flex justify-between items-center mb-1">
                                        <h4 className="text-sm font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors">{item.title}</h4>
                                        <span className="text-xs font-bold text-gray-500 bg-gray-50 px-2 py-1 rounded-md border border-gray-100">{item.score}</span>
                                    </div>
                                    <p className="text-xs text-gray-500 leading-relaxed">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
