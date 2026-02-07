import { CheckBadgeIcon, CheckCircleIcon, CloudArrowUpIcon, ExclamationTriangleIcon, InformationCircleIcon, LifebuoyIcon, LockClosedIcon, ServerIcon } from "@heroicons/react/20/solid";
import type { MetaFunction } from "react-router";

export const meta: MetaFunction = () => [
    { title: "How to Pitch Your Big Idea | MLAI" },
    { name: "description", content: "MLAI's guide to pitching your big idea. Learn how to communicate complex ideas effectively in a short timeframe." },
];

export default function HowToPitch() {
    return (
        <div className="overflow-auto bg-white py-24 sm:py-32">
            <div className="mx-auto max-w-2xl px-6 lg:max-w-7xl lg:px-8">
                <div className="max-w-4xl">
                    <p className="text-base/7 font-semibold text-indigo-600">How to guides</p>
                    <h1 className="mt-2 text-pretty text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
                        MLAI&apos;s Guide to Pitching Your Big Idea
                    </h1>
                    <p className="mt-6 text-balance text-xl/8 text-gray-700">
                        Communicate a complex idea effectively, in a short timeframe, to somebody that (you should assume), doesn&apos;t know anything about what you&apos;re talking about
                    </p>
                    <div className="mt-8 flex gap-x-4">
                        <img
                            alt=""
                            src="https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/committee-photos%2Fsam.png?alt=media&token=dd8f33f3-cc74-43cd-8a0f-ebc2e6fb07c3"
                            className="mt-1 size-10 flex-none rounded-full bg-gray-50"
                        />
                        <div className="text-sm/6">
                            <div className="font-semibold text-gray-900">Dr Sam Donegan</div>
                            <a href="https://www.linkedin.com/in/samueldonegan/" target="blank" className="text-indigo-600 underline">LinkedIn</a>
                        </div>
                    </div>
                </div>

                {/* Table of Contents Section */}
                <section className="mx-auto max-w-7xl px-6 lg:px-8 py-24 sm:py-32">
                    <h2 className="mt-2 text-pretty text-2xl font-semibold tracking-tight text-gray-900 sm:text-3xl">
                        Table of Contents
                    </h2>
                    <p className="mt-6 text-base/7 text-gray-900">
                        Use this guide to navigate through the sections of this pitch framework.
                    </p>
                    <ul className="mt-6 list-disc list-inside space-y-4 text-base/7 text-gray-900">
                        <li>
                            <a href="#overview" className="text-indigo-600 underline">Overview</a>
                        </li>
                        <li>
                            <a href="#tldr" className="text-indigo-600 underline">TLDR</a>
                        </li>
                        <li>
                            <a href="#what-is-a-pitch" className="text-indigo-600 underline">What is a pitch?</a>
                        </li>
                        <li>
                            <a href="#key-elements" className="text-indigo-600 underline">Key Elements of a Successful Pitch</a>
                        </li>
                        <li>
                            <span className="font-semibold">Steps for Crafting Your Pitch</span>
                            <ul className="ml-6 mt-4 list-disc list-inside space-y-2 text-base/7 text-gray-900">
                                <li>
                                    <a href="#step-1" className="text-indigo-600 underline">Step 1: Identifying and Presenting Your Challenge</a>
                                </li>
                                <li>
                                    <a href="#option-2" className="text-indigo-600 underline">Option 2: Utilizing Narrative to Illustrate the Challenge</a>
                                </li>
                                <li>
                                    <a href="#step-2" className="text-indigo-600 underline">Step 2: Articulating a Compelling Value Proposition</a>
                                </li>
                                <li>
                                    <a href="#step-3" className="text-indigo-600 underline">Step 3: Demonstrating Your Innovation with Effective Visualization</a>
                                </li>
                                <li>
                                    <a href="#step-4" className="text-indigo-600 underline">Step 4: Validating Your Idea with Tangible Evidence</a>
                                </li>
                                <li>
                                    <a href="#step-5" className="text-indigo-600 underline">Step 5: Concluding Your Pitch with a Decisive Call to Action</a>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <a href="#key-takeaways" className="text-indigo-600 underline">Key Takeaways</a>
                        </li>
                    </ul>
                </section>

                <section className="mt-20 max-w-4xl">
                    <h2 id='overview' className="text-pretty text-2xl font-semibold tracking-tight text-gray-900">Overview</h2>
                    <p className="mt-6 text-base/7 text-gray-600">
                        A lot of people are afraid when it comes to delivering a pitch. "Don&apos;t I need to be a thick-skinned, type A, salesperson, business shark in order to do that?"
                    </p>
                    <p className="mt-8 text-base/7 text-gray-600">
                        The answer is no. A pitch is just a way to <strong>communicate a complex idea</strong> effectively in a <strong>short timeframe</strong> to somebody that (you should assume), doesn&apos;t know anything about what you&apos;re talking about.
                    </p>
                    <p className="mt-8 text-base/7 text-gray-600">
                        Have you ever seen the movie &apos;Inception&apos;? Delivering a good pitch is basically <strong>incepting an idea into your audience&apos;s brains.</strong>
                    </p>
                    <p className="mt-8 text-base/7 text-gray-600">
                        This means delivering the information in a way that is concise, emotional, vulnerable and with a clear call-to-action. As a founder you need to convince a big group of people to take a specific action to help you fix the big ol&apos; problem you&apos;ve identified.
                    </p>
                    <p className="mt-8 text-base/7 text-gray-600">
                        <strong>Let&apos;s get incepting.</strong>
                    </p>
                </section>
            </div>
            {/* TLDR Section */}
            <section id='tldr' className="relative isolate overflow-visible bg-white py-24 sm:py-32">
                <div
                    aria-hidden="true"
                    className="absolute -top-80 left-[max(6rem,33%)] -z-10 transform-gpu blur-3xl sm:left-1/2 md:top-20 lg:ml-20 xl:top-3 xl:ml-56"
                >
                    <div
                        style={{
                            clipPath:
                                "polygon(63.1% 29.6%, 100% 17.2%, 76.7% 3.1%, 48.4% 0.1%, 44.6% 4.8%, 54.5% 25.4%, 59.8% 49.1%, 55.3% 57.9%, 44.5% 57.3%, 27.8% 48%, 35.1% 81.6%, 0% 97.8%, 39.3% 100%, 35.3% 81.5%, 97.2% 52.8%, 63.1% 29.6%)",
                        }}
                        className="aspect-[801/1036] w-[50.0625rem] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30"
                    />
                </div>
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-12 lg:gap-x-8">
                        <div className="lg:col-span-7">
                            <h2 className="mt-2 text-pretty text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
                                TLDR
                            </h2>
                            <p className="mt-6 text-base/7 text-gray-900">
                                This guide goes into a lot of detail about how to create an
                                effective pitch.
                            </p>
                            <p className="mt-6 text-base/7 text-gray-900">
                                You don&apos;t NEED to have a pitch deck (slides), in fact a lot of
                                very captivating pitches don&apos;t use a deck, but it can be a
                                useful tool as a visual aid for your audience and for you.
                            </p>
                            <p className="mt-6 text-base/7 text-gray-900">
                                For those that don&apos;t have a lot of time to read this guide,
                                we&apos;ve provided a draft pitch deck for you here. It has
                                instructions on what to put where, with a few examples on the
                                side.
                            </p>
                            <p className="mt-6 text-base/7 text-gray-900">Good Luck!</p>
                        </div>
                        <div className="lg:col-span-5 mt-8 lg:mt-0">
                            {/* PDF Viewer */}
                            <iframe
                                src="https://docs.google.com/presentation/d/e/2PACX-1vQWU1kTTTBvLqg8j6YdC_gRCGbx9le6NzHR5lLzpo2zXArzPYDGpD0xDLL2vlmLcdl8yxu-Q1sBcMbi/embed?start=true&loop=true&delayms=5000"
                                frameBorder="0"
                                width="100%"
                                height="400"
                                allowFullScreen
                                className="rounded-2xl"
                            ></iframe>
                        </div>
                    </div>
                </div>
            </section>



            {/* What is a Pitch Section */}
            <section id='what-is-a-pitch' className="mx-auto mt-24 max-w-7xl grid grid-cols-1 lg:grid-cols-12 lg:gap-x-8 lg:gap-y-16 px-6 lg:max-w-7xl lg:px-8">
                <div className="lg:col-span-7">
                    <h2 className="mt-2 mb-4 text-pretty text-2xl font-semibold tracking-tight text-gray-900 sm:text-3xl">
                        What is a pitch?
                    </h2>
                    <p className="mt-6 text-base/7 text-gray-900">
                        In essence, a pitch is a concise and compelling presentation that
                        aims to answer your audience&apos;s critical questions:
                    </p>
                    <ul
                        role="list"
                        className="mt-8 max-w-xl space-y-8 text-gray-600 list-none"
                    >
                        <li className="flex gap-x-3">
                            <ExclamationTriangleIcon
                                aria-hidden="true"
                                className="mt-1 h-5 w-5 flex-none text-indigo-600"
                            />
                            <span>
                                <strong className="font-semibold text-gray-900">
                                    What problem are you solving, and why should I care?
                                </strong>{" "}
                                Be sure to go deep into the problem. Make me, as an investor,
                                or as an audience member, FEEL the problem. Why is it a
                                problem? What impact is it having on the world? What impact
                                could it have on me? How big is this problem? What will happen
                                if it&apos;s not solved?
                            </span>
                        </li>
                        <li className="flex gap-x-3">
                            <CheckBadgeIcon
                                aria-hidden="true"
                                className="mt-1 h-5 w-5 flex-none text-indigo-600"
                            />
                            <span>
                                <strong className="font-semibold text-gray-900">
                                    How are you solving it that makes you stand out?
                                </strong>{" "}
                                What are you seeing that nobody else has seen yet? What
                                technology or innovation are you applying to this market that
                                hasn&apos;t been applied yet? You need to make it clear what the
                                connection is between your approach and the problem.
                            </span>
                        </li>
                        <li className="flex gap-x-3">
                            <LifebuoyIcon
                                aria-hidden="true"
                                className="mt-1 h-5 w-5 flex-none text-indigo-600"
                            />
                            <span>
                                <strong className="font-semibold text-gray-900">
                                    What can I do to help?
                                </strong>{" "}
                                 Make it simple. People want to help you, but you have to make
                                it easy for them. &quot;Scan this QR code&quot; or &quot;Sign up to this
                                newsletter&quot; or &quot;Talk to me if you know somebody that is XYZ&quot;
                                are great options.
                            </span>
                        </li>
                    </ul>
                    <p className="mt-6 text-base/7 text-gray-900">
                        An effective pitch is akin to a verbal snapshot of your proposal,
                        encapsulating its essence in an engaging manner. The best pitches
                        are persuasive without seeming forceful or desperate. They leverage
                        the presenter&apos;s passion and conviction to make a compelling case
                        for their innovation.
                    </p>
                </div>
                <div className="lg:col-span-5 mt-24 lg:mt-16">
                    {/* Video Example */}
                    <div
                        style={{
                            position: "relative",
                            paddingBottom: "56.25%",
                            height: 0,
                            borderRadius: "20px",
                        }}
                    >
                        <iframe
                            src="https://www.loom.com/embed/a96f41d2326743bc8067d06d503dd9db?sid=09847a74-7aed-4b0e-a4e6-e2ec5c9c128f"
                            frameBorder="0"
                            allowFullScreen
                            style={{
                                position: "absolute",
                                top: 0,
                                left: 0,
                                width: "100%",
                                height: "100%",
                                borderRadius: "20px",
                            }}
                        />
                    </div>
                    <p className="mt-6 text-base/7 text-gray-900 italic">
                        It&apos;s not the best pitch in the world, but this pitch for SupportSorted contains the essential elements.
                    </p>
                </div>

            </section>

            {/* Key Elements Section */}
            <section id='key-elements' className="mx-auto mt-24 max-w-7xl grid grid-cols-1 lg:grid-cols-12 lg:gap-x-8 lg:gap-y-16 px-6 lg:max-w-7xl lg:px-8">
                <div className="lg:col-span-7">
                    <h2 className="mt-2 mb-4 text-pretty text-2xl font-semibold tracking-tight text-gray-900 sm:text-3xl">
                        Key Elements of a Successful Pitch
                    </h2>
                    <p className="mt-6 text-base/7 text-gray-900">
                        A successful pitch captures the audience&apos;s attention, clearly
                        outlines the proposal, and concludes with a compelling call to
                        action. The art of pitching is about informing and entertaining –
                        conveying why your solution is the preferable choice for addressing
                        a specific challenge in a way that engages your audience.
                    </p>
                    <p className="mt-6 text-base/7 text-gray-900">
                        Contrary to popular belief, effective pitching is not an inherent
                        skill but a learned one. It involves developing people skills that
                        are similar to storytelling or initiating meaningful conversations.
                        With the right approach and practice, anyone can develop and hone
                        their pitching skills.
                    </p>
                    <p className="mt-6 text-base/7 text-gray-900">
                        In this pitch, note that of the 5-minute duration, most of the
                        time is dedicated to describing and emphasising the problem and
                        outlining the solution. Other sections, like market opportunity,
                        business model, etc., are lumped in at the end, ideally when
                        audience trust and interest have been captured.
                    </p>
                </div>
                <div className="lg:col-span-5 mt-8 lg:mt-0">
                    {/* Video Example */}
                    <div
                        style={{
                            position: "relative",
                            paddingBottom: "56.25%",
                            height: 0,
                            borderRadius: "20px",
                        }}
                    >
                        <iframe
                            src="https://www.youtube.com/embed/8yJnf-ISi9E"
                            frameBorder="0"
                            allowFullScreen
                            style={{
                                position: "absolute",
                                top: 0,
                                left: 0,
                                width: "100%",
                                height: "100%",
                                borderRadius: "20px",
                            }}
                        />
                    </div>
                    <p className="mt-6 text-base/7 text-gray-900 italic">
                        A hackathon pitch for a concept company CliMate.
                    </p>
                </div>
            </section>

            {/* Steps for Crafting Your Pitch */}
            <section id='step-1' className="mx-auto mt-24 max-w-7xl grid grid-cols-1 lg:grid-cols-12 lg:gap-x-8 lg:gap-y-16 px-6 lg:max-w-7xl lg:px-8">
                {/* Step 1 */}
                <div className="lg:col-span-7">
                    <h2 className="mt-2 mb-4 text-pretty text-2xl font-semibold tracking-tight text-gray-900 sm:text-3xl">
                        Steps for Crafting Your Pitch
                    </h2>
                    <h3 className="mt-8 text-xl font-semibold tracking-tight text-gray-900">
                        Step 1: Identifying and Presenting Your Challenge
                    </h3>
                    <p className="mt-6 text-base/7 text-gray-900">
                        First impressions in a pitch can be crucial. Think of the opening
                        moments of your pitch as the critical opportunity to engage your
                        listeners. Rather than a traditional introduction, your opening
                        remarks should immediately draw in your audience with their
                        relevance and urgency.
                    </p>
                    <p className="mt-6 text-base/7 text-gray-900">
                        An effective pitch begins by pinpointing a significant challenge or
                        an unaddressed need.
                    </p>
                    <p className="mt-6 text-base/7 text-gray-900">When identifying your challenge, consider:</p>
                    <ul className="mt-4 list-disc list-inside space-y-2">
                        <li className="mt-6 text-base/7 text-gray-900">What specific issue does your concept address?</li>
                        <li className="mt-6 text-base/7 text-gray-900">Who is most affected by this challenge?</li>
                        <li className="mt-6 text-base/7 text-gray-900">
                            Why is resolving this challenge crucial for your audience?
                        </li>
                    </ul>
                    <p className="mt-6 text-base/7 text-gray-900">
                        You have two primary options to introduce this challenge: a direct
                        statement or a narrative.
                    </p>

                    {/* Option 1 */}
                    <h4 className="mt-8 text-lg font-semibold tracking-tight text-gray-900">
                        Option 1: Constructing a Challenge Statement
                    </h4>
                    <p className="mt-6 text-base/7 text-gray-900">
                        A straightforward way to commence your pitch is with a brief
                        statement that encapsulates the challenge. This often involves the
                        P-A-S (Problem-Agitate-Solution) framework:
                    </p>
                    <ul className="mt-4 list-disc list-inside space-y-2">
                        <li className="mt-6 text-base/7 text-gray-900">
                            <strong>Problem</strong>: Clearly articulate the challenge using
                            language that resonates with your audience. For instance, if
                            addressing medical professionals, use appropriate medical
                            terminology.
                        </li>
                        <li className="mt-6 text-base/7 text-gray-900">
                            <strong>Agitate</strong>: Emphasise the severity and implications
                            of the challenge.
                        </li>
                        <li className="mt-6 text-base/7 text-gray-900">
                            <strong>Solution</strong>: Introduce your proposed solution,
                            illustrating how it addresses the problem and benefits the field.
                        </li>
                    </ul>
                    <p className="mt-6 text-base/7 text-gray-900 italic">
                        As as example, consider you’re proposing a new digital health record
                        system. A P-A-S based pitch might be:
                    </p>
                    <ul className="mt-4 list-disc list-inside space-y-2 italic">
                        <li className="mt-6 text-base/7 text-gray-900">
                            <strong>Problem:</strong> “Inefficient health record management
                            often leads to critical delays in patient care.”
                        </li>
                        <li className="mt-6 text-base/7 text-gray-900">
                            <strong>Agitate:</strong> “This not only increases the risk for
                            patients but also burdens healthcare workers with unnecessary
                            stress.”
                        </li>
                        <li className="mt-6 text-base/7 text-gray-900">
                            <strong>Solution:</strong> “Our new digital health record
                            system makes data management fast, ensuring timely
                            patient care.”
                        </li>
                    </ul>

                    {/* Action Step */}
                    <div className="mt-8 p-6 bg-gray-50 border-l-4 border-indigo-600">
                        <p className="text-lg font-semibold text-gray-900">
                            Action Step:
                        </p>
                        <p className="mt-6 text-base/7 text-gray-900">
                            Draft your opening lines using the P-A-S template, ensuring it is
                            directly relevant to your audience. Highlight your Problem,
                            Agitation, and Solution points for clarity.
                        </p>
                        <p className="mt-6 text-base/7 text-gray-900">Examples of P-A-S based openings:</p>
                        <ul className="mt-4 list-disc list-inside space-y-2 italic">
                            <li className="mt-6 text-base/7 text-gray-900">
                                “For decades, [user persona] have grappled with [specific
                                challenge]. Our [product/service] addresses this by
                                [solution].”
                            </li>
                            <li className="mt-6 text-base/7 text-gray-900">
                                “If the issue of [challenge] frustrates you, our
                                [solution] provides a way to [how it solves the problem].”
                            </li>
                            <li className="mt-6 text-base/7 text-gray-900">
                                “Navigating [issue] can be daunting. Our [solution]
                                simplifies this process, offering the most effective and
                                efficient outcomes.”
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="lg:col-span-5 mt-8 lg:mt-0">
                    {/* Video Example */}
                    <div
                        style={{
                            position: "relative",
                            paddingBottom: "56.25%",
                            height: 0,
                            borderRadius: "20px",
                        }}
                    >
                        <iframe
                            src="https://www.youtube.com/embed/XWRtG_PDRik?si=7hFmFvwWkKu_p7ML"
                            frameBorder="0"
                            allowFullScreen
                            style={{
                                position: "absolute",
                                top: 0,
                                left: 0,
                                width: "100%",
                                height: "100%",
                                borderRadius: "20px",
                            }}
                        />
                    </div>
                    <p className="mt-6 text-base/7 text-gray-900 italic">
                        For those that prefer video tutorials to written content
                    </p>
                </div>
            </section>

            {/* Option 2 */}
            <section id='option-2' className="mx-auto mt-24 max-w-7xl grid grid-cols-1 lg:grid-cols-12 lg:gap-x-8 lg:gap-y-16 px-6 lg:max-w-7xl lg:px-8">
                <div className="lg:col-span-7">
                    <h4 className="mt-8 text-lg font-semibold tracking-tight text-gray-900">
                        Option 2: Utilising Narrative to Illustrate the Challenge
                    </h4>
                    <p className="mt-6 text-base/7 text-gray-900">
                        If a direct statement isn&apos;t your preferred approach, consider using a narrative or anecdote. A compelling story can powerfully convey the real-world impact of a challenge and the need for a solution.
                    </p>
                    <p className="mt-6 text-base/7 text-gray-900">When crafting your story, ensure it:</p>
                    <ul className="mt-4 list-disc list-inside space-y-2">
                        <li className="text-base/7 text-gray-900">
                            <strong>Highlights the Challenge</strong>: Use the narrative to emphasise how your solution addresses a real-world challenge.{" "}
                            <em>For example, “As a nurse, I witnessed firsthand the challenges of medication errors due to outdated records, which led me to develop a new patient tracking system.”</em>
                        </li>
                        <li className="text-base/7 text-gray-900">
                            <strong>Stays Relevant and Concise</strong>: Keep your story focused and directly related to the challenge and your proposed solution. It should be succinct yet impactful, ideally told within two minutes.
                        </li>
                        <li className="text-base/7 text-gray-900">
                            <strong>Resonates with the Audience</strong>: The story should connect on a personal level, making the issue and its resolution relatable to your audience.
                        </li>
                    </ul>

                    {/* Pro Tip */}
                    <div className="mt-8 p-6 bg-gray-50 border-l-4 border-indigo-600">
                        <p className="text-lg font-semibold text-gray-900">
                            Pro Tip for a Strong Opening:
                        </p>
                        <p className="mt-4 text-base/7 text-gray-900">
                            As you introduce the challenge, remember to make a strong first impression. This involves confident body language and engaging presentation skills. Key points to remember include:
                        </p>
                        <ul className="mt-4 list-disc list-inside space-y-2">
                            <li className="text-base/7 text-gray-900">Making direct eye contact.</li>
                            <li className="text-base/7 text-gray-900">Using open hand gestures for emphasis.</li>
                            <li className="text-base/7 text-gray-900">Smiling genuinely to engage your audience.</li>
                            <li className="text-base/7 text-gray-900">Maintaining an upright, confident posture.</li>
                            <li className="text-base/7 text-gray-900">Ensuring your voice is clear and assertive.</li>
                        </ul>
                    </div>
                </div>
                <div className="lg:col-span-5 mt-8 lg:mt-0">
                    {/* Video Example */}
                    <div
                        style={{
                            position: "relative",
                            paddingBottom: "56.25%",
                            height: 0,
                            borderRadius: "20px",
                        }}
                    >
                        <iframe
                            src="https://www.youtube.com/embed/ae5MssJ8en4"
                            frameBorder="0"
                            allowFullScreen
                            style={{
                                position: "absolute",
                                top: 0,
                                left: 0,
                                width: "100%",
                                height: "100%",
                                borderRadius: "20px",
                            }}
                        />
                    </div>
                    <p className="mt-4 text-base/7 text-gray-900 italic">
                        Although a little cheesy, Scrub Daddy&apos;s pitch was high energy with a strong demonstration.
                    </p>
                </div>
            </section>

            {/* Step 2 */}
            <section id='step-2' className="mx-auto mt-24 max-w-7xl grid grid-cols-1 lg:grid-cols-12 lg:gap-x-8 lg:gap-y-16 px-6 lg:max-w-7xl lg:px-8">
                <div className="lg:col-span-7">
                    <h3 className="mt-8 text-xl font-semibold tracking-tight text-gray-900">
                        Step 2: Articulating a Compelling Value Proposition
                    </h3>
                    <p className="mt-6 text-base/7 text-gray-900">
                        The next critical component of your pitch is to present a clear and persuasive value proposition. This part of your pitch is pivotal; it&apos;s where you explain how your offering stands out and the specific benefits it brings. This is often referred to as the Unique Value Proposition (UVP).
                    </p>
                    <p className="mt-6 text-base/7 text-gray-900">
                        A UVP is a concise statement, typically one or two sentences, that clearly outlines what sets your solution apart from others, establishing it as the superior choice in the market.
                    </p>
                    <p className="mt-6 text-base/7 text-gray-900">
                        To craft your UVP, consider the following questions:
                    </p>
                    <ul className="mt-4 list-disc list-inside space-y-2">
                        <li className="text-base/7 text-gray-900">How does your solution add significant value?</li>
                        <li className="text-base/7 text-gray-900">In what ways is it superior to existing alternatives in the industry?</li>
                        <li className="text-base/7 text-gray-900">What specific problems does it alleviate or resolve?</li>
                        <li className="text-base/7 text-gray-900">What benefits will stakeholders, or the institution itself, gain from adopting your solution?</li>
                    </ul>
                    <p className="mt-6 italic text-base/7 text-gray-900">
                        Imagine you’re introducing a new telemedicine platform. The value proposition might be articulated as:
                    </p>
                    <p className="mt-4 italic text-base/7 text-gray-900">
                        “With our telemedicine platform, we bridge the gap between healthcare accessibility and busy lifestyles, offering patients convenient, high-quality medical consultations from anywhere.”
                    </p>
                    <p className="mt-4 italic text-base/7 text-gray-900">
                        In your pitch, seamlessly transition from identifying the problem to presenting your UVP. For instance:
                    </p>
                    <p className="mt-4 italic text-base/7 text-gray-900">
                        “Confronted with the challenge of long waiting times and limited access to specialists, we developed a telemedicine solution that offers quick, reliable, and expert healthcare consultations remotely, redefining patient convenience and care efficiency.”
                    </p>

                    {/* Action Step */}
                    <div className="mt-8 p-6 bg-gray-50 border-l-4 border-indigo-600">
                        <p className="text-lg font-semibold text-gray-900">
                            Action Step:
                        </p>
                        <p className="mt-4 text-base/7 text-gray-900">
                            Draft a compelling value proposition for your solution. Here are some templates to guide you:
                        </p>
                        <ul className="mt-4 list-disc list-inside space-y-2 italic text-base/7 text-gray-900">
                            <li>
                                “Our [solution/product/service] empowers [professionals/users/institutions] to overcome [specific challenge], by offering [unique feature or benefit].”
                            </li>
                            <li>
                                “For [target audience] struggling with [specific challenge], our [solution] transforms [aspect of industry] by [unique feature or benefit].”
                            </li>
                            <li>
                                “While the industry battles [common issue], our [solution] introduces a groundbreaking approach to [aspect of industry], setting us apart with [unique feature or benefit].”
                            </li>
                        </ul>
                    </div>

                    {/* Pro Tip */}
                    <div className="mt-8 p-6 bg-gray-50 border-l-4 border-indigo-600">
                        <p className="text-lg font-semibold text-gray-900">
                            Pro Tip for Effective Delivery:
                        </p>
                        <p className="mt-4 text-base/7 text-gray-900">
                            The way you present your value proposition can greatly influence its impact. To deliver it with conviction and energy:
                        </p>
                        <ul className="mt-4 list-disc list-inside space-y-2 text-base/7 text-gray-900">
                            <li>
                                <strong>Dress Professionally</strong>: Choose attire that is appropriate for your audience and boosts your confidence.
                            </li>
                            <li>
                                <strong>Pace Your Speech</strong>: Speak at a moderate pace to ensure clarity and retain audience attention.
                            </li>
                            <li>
                                <strong>Stay Hydrated</strong>: Proper hydration is crucial for vocal clarity. Drink water before your pitch to ensure your voice remains clear and strong.
                            </li>
                            <li>
                                <strong>Vocal Warm-Up</strong>: Engage in simple vocal exercises to ensure your voice is in top shape for delivering your pitch.
                            </li>
                        </ul>
                    </div>
                </div>
                {/* If there&apos;s any extra content for Step 2, add it here */}
            </section>

            {/* Step 3 */}
            <section id='step-3' className="mx-auto mt-24 max-w-7xl grid grid-cols-1 lg:grid-cols-12 lg:gap-x-8 lg:gap-y-16 px-6 lg:max-w-7xl lg:px-8">
                <div className="lg:col-span-7">
                    <h3 className="mt-8 text-xl font-semibold tracking-tight text-gray-900">
                        Step 3: Demonstrating Your Innovation with Effective Visualisation
                    </h3>
                    <p className="mt-6 text-base/7 text-gray-900">
                        Once you&apos;ve identified a problem and proposed a unique solution, the next step is to provide a detailed and visually engaging explanation of your idea. This phase is where the technicalities of your concept come to life, appealing to the visual and practical sensibilities of your audience.
                    </p>

                    <h4 className="mt-6 text-lg font-semibold tracking-tight text-gray-900">
                        Utilising a Pitch Deck
                    </h4>
                    <p className="mt-4 text-base/7 text-gray-900">
                        A pitch deck is a great tool for this stage. It&apos;s a series of digital slides crafted to highlight the key aspects of your innovation, leveraging visually appealing design elements to maintain audience engagement. Tools like PowerPoint, Keynote, Canva, or Prezi can be used to create a pitch deck that effectively communicates the complexities and benefits of your idea. Feel free to use the example template provided above in the TLDR section.
                    </p>
                    <p className="mt-4 text-base/7 text-gray-900">
                        <strong>You don&apos;t need a fully functioning prototype!</strong> As long as your demonstration conveys your main idea for what your solution <em>could</em> look like or <em>could</em> do, so that your audience understands the solution in the same way you do, that&apos;s enough.
                    </p>
                    <p className="mt-4 text-base/7 text-gray-900">
                        For instance, if you’re introducing a new patient management system, your pitch deck could include slides that showcase the system&apos;s interface, data management capabilities, and user testimonials. These slides should be designed to be visually appealing and informative, offering a clear understanding of your system&apos;s advantages.
                    </p>

                    <h4 className="mt-6 text-lg font-semibold tracking-tight text-gray-900">
                        Incorporating Demonstrations
                    </h4>
                    <p className="mt-4 text-base/7 text-gray-900">
                        In some cases, a physical or video demonstration is more effective, especially for tangible products or new medical techniques. Demonstrations allow your audience to see the practical application of your idea in a real-world context. <em>For example, if you’ve developed a new medical device, a live demonstration of the device in use or a video showcasing its application can be incredibly persuasive.</em>
                    </p>
                    <p className="mt-4 text-base/7 text-gray-900">
                        Continuing with the patient management system example, a live demonstration could involve a walk-through of the system, showing how it enhances patient care efficiency and data accuracy. If the system includes unique features, such as AI-driven diagnostics or integrated patient portals, these should be highlighted during the demo.
                    </p>

                    <h4 className="mt-6 text-lg font-semibold tracking-tight text-gray-900">
                        Detailed Explanation in Your Pitch
                    </h4>
                    <p className="mt-4 text-base/7 text-gray-900">
                        This stage of your pitch delves into the specifics of your idea. It&apos;s crucial to provide a comprehensive yet understandable explanation of how your innovation works and the benefits it offers.
                    </p>
                    <p className="mt-4 italic text-base/7 text-gray-900">
                        For instance, when discussing the integration of advanced healthcare technologies like telehealth or AI diagnostics, your pitch could include data on improved patient outcomes, efficiency gains, or cost savings. Visual aids like charts, graphs, and infographics can effectively convey this information.
                    </p>

                    {/* Action Step */}
                    <div className="mt-8 p-6 bg-gray-50 border-l-4 border-indigo-600">
                        <p className="text-lg font-semibold text-gray-900">
                            Action Step:
                        </p>
                        <p className="mt-4 text-base/7 text-gray-900">
                            Create a structured presentation or deck for your idea. Feel free to use the example template provided above in the TLDR section! Whether using digital slides or a more hands-on approach, ensure your presentation is visually engaging and clearly outlines the key aspects of your innovation. Prepare a well-rehearsed script to accompany your visual aids, ensuring a smooth and informative presentation.
                        </p>
                    </div>
                </div>
                {/* If there&apos;s any extra content for Step 3, add it here */}
            </section>


            {/* Step 4 */}
            <section id='step-4' className="mx-auto mt-24 max-w-7xl grid grid-cols-1 lg:grid-cols-12 lg:gap-x-8 lg:gap-y-16 px-6 lg:max-w-7xl lg:px-8">
                <div className="lg:col-span-7">
                    <h3 className="mt-8 text-xl font-semibold tracking-tight text-gray-900">
                        Step 4: Validating Your Idea with Tangible Evidence
                    </h3>
                    <p className="mt-6 text-base/7 text-gray-900">
                        It&apos;s not enough to simply propose an innovative idea. You must substantiate your concept with concrete evidence and real-world examples. This step is about grounding your pitch in reality, showcasing that your idea or product effectively addresses identified challenges.
                    </p>

                    <h4 className="mt-6 text-lg font-semibold tracking-tight text-gray-900">
                        Incorporating Concrete Data and Success Stories
                    </h4>
                    <p className="mt-4 text-base/7 text-gray-900">
                        To bolster the credibility of your pitch, include the following types of evidence:
                    </p>
                    <ul className="mt-4 list-disc list-inside space-y-2 text-base/7 text-gray-900">
                        <li>
                            <strong>Resource and Financial Data</strong>: Present key statistics and financial figures that demonstrate the efficacy and cost-effectiveness of your solution. This could include time improvements, cost savings, or efficiency gains.
                        </li>
                        <li>
                            <strong>Testimonials and Case Studies</strong>: Share experiences and endorsements from current users, businesses, or professionals who have benefited from your solution. Real-world examples add a personal touch and enhance credibility.
                        </li>
                        <li>
                            <strong>Organisational Achievements</strong>: Highlight milestones achieved by your organisation, such as awards, certifications, or significant growth metrics.
                        </li>
                    </ul>
                    <p className="mt-4 text-base/7 text-gray-900">
                        For conceptual pitches, such as a new policy or strategy, emphasise:
                    </p>
                    <ul className="mt-4 list-disc list-inside space-y-2 text-base/7 text-gray-900">
                        <li>Scientific research and studies supporting your idea.</li>
                        <li>Documented improvements or transformations resulting from the implementation of your strategy.</li>
                        <li>Social media engagement or public endorsements, if applicable.</li>
                    </ul>

                    <h4 className="mt-6 text-lg font-semibold tracking-tight text-gray-900">
                        Presenting Evidence Effectively
                    </h4>
                    <p className="mt-4 text-base/7 text-gray-900">
                        Although this part of the pitch is data-centric, it&apos;s crucial to maintain an engaging and dynamic delivery. Present your data in a way that is both compelling and easy to understand. Use visual aids like charts, graphs, and infographics to convey complex information clearly.
                    </p>
                    <p className="mt-4 italic text-base/7 text-gray-900">
                        For example, if pitching a new digital health record system, you might present data on how it reduces administrative errors or speeds up patient processing times. Including a few powerful testimonials from healthcare professionals who have used the system can also make a strong impact.
                    </p>

                    {/* Action Step */}
                    <div className="mt-8 p-6 bg-gray-50 border-l-4 border-indigo-600">
                        <p className="text-lg font-semibold text-gray-900">
                            Action Step:
                        </p>
                        <p className="mt-4 text-base/7 text-gray-900">
                            Prepare a segment of your pitch dedicated to showcasing evidence. If using a slide deck, include slides that clearly present your data and testimonials. Practice delivering this information in an engaging and confident manner.
                        </p>
                    </div>

                    {/* Pro Tip */}
                    <div className="mt-8 p-6 bg-gray-50 border-l-4 border-indigo-600">
                        <p className="text-lg font-semibold text-gray-900">
                            Pro Tip: Observe Successful Pitches for Inspiration
                        </p>
                        <p className="mt-4 text-base/7 text-gray-900">
                            Watching successful pitches can provide valuable insights. For instance, TEDx talks on innovations often demonstrate how to effectively combine data with storytelling. Similarly, business shows like &quot;Shark Tank&quot; can offer lessons on persuasive presentation. Successful pitches often exhibit qualities such as credibility, relevance, and the ability to engage and inspire the audience.
                        </p>
                    </div>
                </div>
                {/* If there&apos;s any extra content for Step 4, add it here */}
            </section>

            {/* Step 5 */}
            <section id='step-5' className="mx-auto mt-24 max-w-7xl grid grid-cols-1 lg:grid-cols-12 lg:gap-x-8 lg:gap-y-16 px-6 lg:max-w-7xl lg:px-8">
                <div className="lg:col-span-7">
                    <h3 className="mt-8 text-xl font-semibold tracking-tight text-gray-900">
                        Step 5: Concluding Your Pitch with a Decisive Call to Action
                    </h3>
                    <p className="mt-6 text-base/7 text-gray-900">
                        The conclusion of your pitch is as critical as its opening. Due to the serial-position effect, audiences are more likely to remember the start and end of your presentation. Thus, a clear and impactful call to action (CTA) is essential to leave a lasting impression and motivate your audience to act.
                    </p>

                    <h4 className="mt-6 text-lg font-semibold tracking-tight text-gray-900">
                        Crafting an Effective CTA
                    </h4>
                    <p className="mt-4 text-base/7 text-gray-900">
                        Your CTA should encapsulate the essence of your pitch and answer the question: “What should we do next?” This is the moment to direct your audience toward a specific action, aligning with the goals of your organisation, startup, or initiative.
                    </p>
                    <p className="mt-4 text-base/7 text-gray-900">
                        While online CTAs often use direct sales language, a pitch typically requires a more nuanced approach. Consider these methods to elicit an emotional response and encourage action:
                    </p>
                    <ul className="mt-4 list-disc list-inside space-y-2 text-base/7 text-gray-900">
                        <li>
                            <strong>Highlight Impactful Data</strong>: Reinforce key statistics or outcomes from your pitch. <em>For instance, “Join our initiative now to be part of a project that has improved patient recovery rates by 40% over the past two years.”</em>
                        </li>
                        <li>
                            <strong>Use Action-Oriented Language</strong>: Clearly state the desired action, using verbs that prompt immediate response, such as “implement, collaborate, fund, or engage.” <em>For example, “Fund this research to pioneer new advancements in cancer treatment.”</em>
                        </li>
                        <li>
                            <strong>Be Precise</strong>: Detail exactly what you want from your audience. <em>For instance, “I propose that the committee approves the deployment of our new telehealth system by next quarter.”</em>
                        </li>
                        <li>
                            <strong>Incorporate Urgency</strong>: Convey a sense of immediacy or time-sensitivity. This might be, <em>“We need to adopt this new surgical technique before the upcoming flu season to ensure better patient outcomes.”</em>
                        </li>
                    </ul>
                    <p className="mt-4 text-base/7 text-gray-900">
                        <strong>Action Step:</strong> Develop a CTA that is both memorable and actionable. It should be the natural culmination of your pitch, driving home the importance of your proposition and outlining the next steps.
                    </p>
                    <p className="mt-4 italic text-base/7 text-gray-900">
                        For instance, in a pitch for a new health technology, your CTA might be, “I urge our leadership team to approve the trial phase of this technology within the next month, so we can begin improving patient care as soon as possible.”
                    </p>
                </div>
                {/* If there&apos;s any extra content for Step 5, add it here */}
            </section>

            {/* Key Takeaways */}
            <section id='key-takeaways' className="mx-auto mt-24 max-w-7xl px-6 lg:max-w-7xl lg:px-8">
                <h2 className="mt-8 mb-4 text-pretty text-2xl font-semibold tracking-tight text-gray-900 sm:text-3xl">
                    Key Takeaways
                </h2>
                <p className="mt-6 text-base/7 text-gray-900">
                    Whether you&apos;re seeking funding, advocating for a new product, or introducing innovative new policies, the ability to pitch effectively is invaluable. The most successful pitches typically encompass these key elements:
                </p>

                <ul className="mt-6 list-disc list-inside space-y-4 text-base/7 text-gray-900">
                    <li>
                        <strong>Identifying the Challenge</strong>: Begin with a clear definition of the issue you&apos;re addressing. This could be in the form of a succinct problem statement or a relatable anecdote that highlights the challenge. Utilise the P-A-S (Problem, Agitate, Solution) framework to succinctly present the issue, its impact, and your proposed solution.
                    </li>
                    <li>
                        <strong>Articulating a Compelling Unique Value Proposition (UVP)</strong>: Your UVP should distinctly convey why your solution stands out. It could be a memorable tagline or a brief explanation that encapsulates the essence of your proposal, making it clear why it&apos;s a superior choice in the industry landscape.
                    </li>
                    <li>
                        <strong>Providing Solid Evidence</strong>: Data and evidence carry significant weight. Be prepared with relevant financials, scientific data, research findings, or case studies that support the efficacy and benefits of your idea.
                    </li>
                    <li>
                        <strong>Ending with a Persuasive Call to Action (CTA)</strong>: Conclude your pitch with a clear and compelling CTA. Rather than coming across as overly promotional, your CTA should encourage your audience to take a specific action that supports the implementation or adoption of your idea.
                    </li>
                </ul>


                <div className="mt-8 flex gap-x-4">
                    <img
                        alt=""
                        src="https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/committee-photos%2Fsam.png?alt=media&token=dd8f33f3-cc74-43cd-8a0f-ebc2e6fb07c3"
                        className="mt-1 size-10 flex-none rounded-full bg-gray-50"
                    />
                    <div className="text-sm/6">
                        <div className="font-semibold text-gray-900">Dr Sam Donegan</div>
                        <a href="https://www.linkedin.com/in/samueldonegan/" target="blank" className="text-indigo-600 underline">LinkedIn</a>
                    </div>
                </div>
            </section>
        </div>

    )
}