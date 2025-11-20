import { Container } from "./Container";
import { useState } from "react";

interface FAQItem {
    question: string;
    answer: string;
}

const faqs: FAQItem[] = [
    {
        question: "What is the eSafety Hackathon?",
        answer:
            "The eSafety Hackathon is a two-day event where builders, designers, students, and community experts team up to tackle online harms using a safe, fully-simulated social platform. It's an opportunity to develop innovative solutions that can help protect users and create safer online spaces.",
    },
    {
        question: "Do I need to have a team before registering?",
        answer:
            "No, you don't need a team before registering. Team formation will happen during the first day of the hackathon. We'll facilitate team formation activities to help you find teammates with complementary skills.",
    },
    {
        question: "What skills do I need to participate?",
        answer:
            "We welcome participants from all backgrounds! Whether you're a developer, designer, student, researcher, or community expert, your perspective is valuable. The hackathon benefits from diverse skill sets including coding, design, research, and domain expertise in online safety.",
    },
    {
        question: "What will I be working with?",
        answer:
            "Participants will work with a fully-simulated social platform designed specifically for this hackathon. This safe, controlled environment allows you to develop and test solutions for online harms without working with real user data or live platforms.",
    },
    {
        question: "Is there a cost to participate?",
        answer:
            "The hackathon is free to attend. Meals and refreshments will be provided during the event. Just bring your enthusiasm and ideas!",
    },
    {
        question: "What should I bring?",
        answer:
            "Bring your laptop, charger, and any development tools you prefer to use. We'll provide WiFi, power outlets, and meals. You might also want to bring a notebook for brainstorming and taking notes.",
    },
    {
        question: "Will there be prizes?",
        answer:
            "Yes! There will be awards and recognition for outstanding projects. More details about prizes and categories will be announced closer to the event.",
    },
    {
        question: "Can I participate remotely?",
        answer:
            "The hackathon is an in-person event taking place in Melbourne and Sydney. We encourage in-person participation to maximize collaboration and networking opportunities.",
    },
    {
        question: "What happens after the hackathon?",
        answer:
            "After the hackathon, teams will have the opportunity to present their solutions. We'll also provide resources and connections to help promising projects continue to develop beyond the event.",
    },
    {
        question: "How do I get tickets?",
        answer:
            "You can get your tickets by clicking the 'Get your tickets' button on the hero section of this page. Make sure to register early as spots are limited!",
    },
];

export function FAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const toggleQuestion = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section
            id="faq"
            aria-label="Frequently Asked Questions"
            className="py-16 sm:py-24 bg-gray-900"
        >
            <Container>
                <div className="mx-auto max-w-3xl">
                    <div className="text-center mb-12">
                        <h2 className="font-display text-3xl font-medium tracking-tight text-teal-200 sm:text-4xl mb-4">
                            FAQ
                        </h2>
                        <p className="text-gray-300">
                            Have questions? We&apos;ve got answers. If you can&apos;t find what
                            you&apos;re looking for, feel free to reach out to us.
                        </p>
                    </div>

                    <div className="space-y-4">
                        {faqs.map((faq, index) => (
                            <div
                                key={index}
                                className="rounded-lg bg-gray-800/50 border border-gray-700 overflow-hidden"
                            >
                                <button
                                    onClick={() => toggleQuestion(index)}
                                    className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-800/70 transition-colors"
                                    aria-expanded={openIndex === index}
                                >
                                    <span className="font-semibold text-white pr-8">
                                        {faq.question}
                                    </span>
                                    <svg
                                        className={`flex-shrink-0 w-5 h-5 text-teal-300 transition-transform ${openIndex === index ? "rotate-180" : ""
                                            }`}
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M19 9l-7 7-7-7"
                                        />
                                    </svg>
                                </button>
                                {openIndex === index && (
                                    <div className="px-6 pb-4">
                                        <p className="text-gray-300 leading-relaxed">
                                            {faq.answer}
                                        </p>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </Container>
        </section>
    );
}

