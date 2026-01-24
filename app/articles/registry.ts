
// Adapted from user provided code for React Router v7
import type { MetaDescriptor } from "react-router";

export type ArticleWithSlug = {
    title: string;
    date: string; // YYYY-MM-DD
    description: string;
    author: string;
    /** Optional array of author keys from authors.ts for multi-author articles */
    authors?: string[];
    slug: string;
    image: string;
    imageAlt: string;
    professionalsPersona?: string;
    dateModified?: string;
    lastUpdated?: string;
    downloads?: Array<{ name: string; url: string }>;
    /** If true, this article has a content component at app/articles/content/{slug}.tsx */
    hasContent?: boolean;
};

// Route Categories for MLAI
export type ArticleRouteCategory =
    | 'featured'
    | 'technology'
    | 'ai-ml'
    | 'startups'
    | 'community'
    | 'workshops'
    | 'tutorials';

const CATEGORY_SEGMENTS: ArticleRouteCategory[] = [
    'featured',
    'technology',
    'ai-ml',
    'startups',
    'community',
    'workshops',
    'tutorials',
];

const DEFAULT_ARTICLE_ROUTE_CATEGORY: ArticleRouteCategory = 'technology';

// Overrides for specific slugs or sub-paths
const CATEGORY_OVERRIDES: Record<string, ArticleRouteCategory> = {
    // Add category overrides as needed
};

// Legacy mapping if needed
const LEGACY_REGISTRY_TO_ROUTE_ALIASES: Record<string, string> = {
    // Add mappings here if you have specific legacy redirects/aliases
};

// Helper utils
function normalizeSlug(slug?: string): string {
    if (!slug) return '';
    return slug.trim().toLowerCase().replace(/^\/+|\/+$/g, '');
}

function hasCategoryPrefix(slug: string): boolean {
    return CATEGORY_SEGMENTS.some((segment) => slug.startsWith(`${segment}/`));
}

export function removeCategoryPrefix(slug: string): string {
    if (!hasCategoryPrefix(slug)) return slug;
    return slug.split('/').slice(1).join('/');
}

// Registry Data
export const ARTICLE_REGISTRY: Record<string, ArticleWithSlug> = {
    'featured/how-much-do-data-science-make': {
        title: 'How much do data scientists make in Australia (2026)',
        date: '2026-01-24',
        description: 'Salary ranges for data scientists in Australia in 2026—entry, mid, senior and lead. City and industry differences, skills that lift pay, and negotiation tips.',
        author: 'Dr Sam Donegan',
        slug: 'featured/how-much-do-data-science-make',
        image: 'https://placehold.co/1200x630/png',
        imageAlt: 'How much do data scientists make in Australia (2026)',
        hasContent: true,
    },
    'featured/how-to-do-machine-learning': {
        title: 'How To Do Machine Learning',
        date: '2026-01-23',
        description: 'A practical Australian roadmap to start machine learning in 2026: prerequisites, first projects, scikit-learn demo, evaluation, and ethics.',
        author: 'Dr Sam Donegan',
        slug: 'featured/how-to-do-machine-learning',
        image: 'https://placehold.co/1200x630/png',
        imageAlt: 'How To Do Machine Learning',
        hasContent: true,
    },
    'featured/how-to-become-machine-learning-engineer': {
        title: 'How to become a Machine Learning Engineer (Australia, 2026)',
        date: '2026-01-23',
        description: 'Skills, pathways, portfolio projects, certifications, and a 90‑day plan to become an ML engineer in Australia in 2026—practical, evidence‑based guidance.',
        author: 'Dr Sam Donegan',
        slug: 'featured/how-to-become-machine-learning-engineer',
        image: 'https://placehold.co/1200x630/png',
        imageAlt: 'How to become a Machine Learning Engineer (Australia, 2026)',
        hasContent: true,
    },
    'featured/how-vcs-value-startups': {
        title: 'How VCs value startups (Australia, 2026)',
        date: '2026-01-22',
        description: 'How venture capital investors value startups in 2026: methods, metrics, and term‑sheet mechanics with context for Australian founders and AI teams.',
        author: 'Dr Sam Donegan',
        slug: 'featured/how-vcs-value-startups',
        image: 'https://placehold.co/1200x630/png',
        imageAlt: 'How VCs value startups (Australia, 2026)',
        hasContent: true,
    },
    'featured/how-to-get-into-venture-capital': {
        title: 'How to get into venture capital (Australia, 2026)',
        date: '2026-01-22',
        description: 'A practical, AU-focused guide to breaking into VC: what firms hire for, real entry paths, track‑record tips, and a 90‑day plan. Updated 2026.',
        author: 'Dr Sam Donegan',
        slug: 'featured/how-to-get-into-venture-capital',
        image: 'https://placehold.co/1200x630/png',
        imageAlt: 'How to get into venture capital (Australia, 2026)',
        hasContent: true,
    },
    'featured/how-to-network-at-networking-events': {
        title: 'How to network at networking events (2026)',
        date: '2026-01-22',
        description: 'Practical, AU-focused tips to introduce yourself, start conversations, add value and follow up after networking events—templates included.',
        author: 'Dr Sam Donegan',
        slug: 'featured/how-to-network-at-networking-events',
        image: 'https://placehold.co/1200x630/png',
        imageAlt: 'How to network at networking events (2026)',
        hasContent: true,
    },
    'featured/how-to-become-a-data-science': {
        title: 'How to become a data scientist in Australia (2026 guide)',
        date: '2026-01-21',
        description: 'Australian pathways to become a data scientist in 2026: degree vs bootcamp, essential skills, timelines, portfolio tips, and where to find entry‑level roles.',
        author: 'Dr Sam Donegan',
        slug: 'featured/how-to-become-a-data-science',
        image: 'https://placehold.co/1200x630/png',
        imageAlt: 'How to become a data scientist in Australia (2026 guide)',
        hasContent: true,
    },
    'featured/why-is-artificial-intelligence-bad': {
        title: 'Why is artificial intelligence bad?',
        date: '2026-01-21',
        description: 'AI has real downsides—bias, privacy breaches, misinformation, job impacts. Here’s a plain‑English guide to the risks and how Australia can manage them in 2026.',
        author: 'Dr Sam Donegan',
        slug: 'featured/why-is-artificial-intelligence-bad',
        image: 'https://placehold.co/1200x630/png',
        imageAlt: 'Why is artificial intelligence bad?',
        hasContent: true,
    },
    'featured/what-are-artificial-intelligence': {
        title: 'What is Artificial Intelligence (AI)?',
        date: '2026-01-21',
        description: 'A clear, Australian‑context explainer of AI: how it works, types, examples, risks and ethics, plus practical steps to explore responsibly in 2026.',
        author: 'Dr Sam Donegan',
        slug: 'featured/what-are-artificial-intelligence',
        image: 'https://placehold.co/1200x630/png',
        imageAlt: 'What is Artificial Intelligence (AI)?',
        hasContent: true,
    },
    'featured/how-can-i-learn-artificial-intelligence': {
        title: 'How can I learn artificial intelligence? (Australia, 2026)',
        date: '2026-01-21',
        description: 'A practical Australian path to learn AI: foundations, maths/coding, study options, projects, privacy, costs, timelines, and communities. Clear steps and FAQs.',
        author: 'Dr Sam Donegan',
        slug: 'featured/how-can-i-learn-artificial-intelligence',
        image: 'https://placehold.co/1200x630/png',
        imageAlt: 'How can I learn artificial intelligence? (Australia, 2026)',
        hasContent: true,
    },
    'featured/how-to-invest-in-startups-india': {
        title: 'How to invest in startups in India: a guide for Australians',
        date: '2026-01-21',
        description: 'Australians investing in Indian startups: routes (syndicates, AIFs, direct), KYC/PAN, documents, tax basics and due diligence. General info only; as at Jan 2026.',
        author: 'Dr Sam Donegan',
        slug: 'featured/how-to-invest-in-startups-india',
        image: 'https://placehold.co/1200x630/png',
        imageAlt: 'How to invest in startups in India: a guide for Australians',
        hasContent: true,
    },
    'featured/what-percent-of-startups-fail': {
        title: 'What percent of startups fail? (Australia, 2026)',
        date: '2026-01-20',
        description: 'Latest evidence on startup failure rates in 2026, what “failure” means, timelines (1–5 years), and the Australian context—plus ways to reduce risk.',
        author: 'Dr Sam Donegan',
        slug: 'featured/what-percent-of-startups-fail',
        image: 'https://placehold.co/1200x630/png',
        imageAlt: 'What percent of startups fail? (Australia, 2026)',
        hasContent: true,
    },
    'featured/what-is-deep-learning': {
        title: 'What Is Deep Learning? A 2026 Guide for Australia',
        date: '2026-01-20',
        description: 'Understand deep learning: how neural networks work, key architectures, when to use it, and practical steps to get started in Australia (2026).',
        author: 'Dr Sam Donegan',
        slug: 'featured/what-is-deep-learning',
        image: 'https://placehold.co/1200x630/png',
        imageAlt: 'What Is Deep Learning? A 2026 Guide for Australia',
        hasContent: true,
    },
    'featured/what-is-difference-between-artificial-intelligence-and-machi': {
        title: 'What’s the difference between artificial intelligence and machine learning?',
        date: '2026-01-20',
        description: 'Understand the difference between artificial intelligence and machine learning, including deep learning, examples, and careers in Australia (2026).',
        author: 'Dr Sam Donegan',
        slug: 'featured/what-is-difference-between-artificial-intelligence-and-machi',
        image: 'https://placehold.co/1200x630/png',
        imageAlt: 'What’s the difference between artificial intelligence and machine learning?',
        hasContent: true,
    },
    'featured/how-to-get-venture-capital': {
        title: 'How to Get Venture Capital in Australia (2026 Guide)',
        date: '2026-01-20',
        description: 'A practical 2026 guide for Australian founders: what VCs look for, how to pitch, typical round sizes, timelines, due diligence, and alternatives to venture capital.',
        author: 'Dr Sam Donegan',
        slug: 'featured/how-to-get-venture-capital',
        image: 'https://placehold.co/1200x630/png',
        imageAlt: 'How to Get Venture Capital in Australia (2026 Guide)',
        hasContent: true,
    },
    'featured/what-is-artificial-general-intelligence': {
        title: 'What is Artificial General Intelligence',
        date: '2026-01-20',
        description: 'Evidence‑based explainer of AGI: how it differs from today’s AI, proposed evaluations, timelines, risks, and what it could mean for AI careers in Australia.',
        author: 'Dr Sam Donegan',
        slug: 'featured/what-is-artificial-general-intelligence',
        image: 'https://placehold.co/1200x630/png',
        imageAlt: 'What is Artificial General Intelligence',
        hasContent: true,
    },
    'featured/what-is-machine-learning': {
        title: 'What is Machine Learning? (2026)',
        date: '2026-01-19',
        description: 'Plain-English guide: what machine learning is, how it works, main types, examples, risks, and how to get started in Australia (2026).',
        author: 'Dr Sam Donegan',
        slug: 'featured/what-is-machine-learning',
        image: 'https://placehold.co/1200x630/png',
        imageAlt: 'What is Machine Learning? (2026)',
        hasContent: true,
    },
    'featured/what-are-startups': {
        title: 'What are startups?',
        date: '2026-01-18',
        description: 'A plain-English guide to what a startup is, how it differs from a small business, funding, stages and the Australian context in 2026.',
        author: 'Dr Sam Donegan',
        slug: 'featured/what-are-startups',
        image: 'https://placehold.co/1200x630/png',
        imageAlt: 'What are startups?',
    },
    'featured/what-is-venture-capital': {
        title: 'What is venture capital? (2026)',
        date: '2026-01-18',
        description: 'Plain-English guide to venture capital for Australia: how VC works, stages, pros and cons, and local options in 2026.',
        author: 'Dr Sam Donegan',
        slug: 'featured/what-is-venture-capital',
        image: 'https://placehold.co/1200x630/png',
        imageAlt: 'What is venture capital? (2026)',
        hasContent: true,
    },
    'featured/accelerator-startup-programs': {
        title: 'Accelerator startup programs in Australia (2026)',
        date: '2026-01-17',
        description: 'How accelerators work in Australia in 2026: eligibility, equity, timelines, and how to choose the right program. Links to LaunchVic, Startmate and Google for Startups.',
        author: 'Dr Sam Donegan',
        slug: 'featured/accelerator-startup-programs',
        image: 'https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Fhero-e920b16e-5eae-4998-87aa-b9f5828de3c3.jpg?alt=media&token=b163fa30-60c7-4501-bd8f-27b1413a5e60',
        imageAlt: 'Founders collaborating at an accelerator workspace',
    },
    'featured/what-is-an-ai-agent-orchestrator-and-how-can-i-become-one-20': {
        title: 'What is an AI Agent Orchestrator and How Can I Become One (2026)?',
        date: '2026-01-16',
        description: 'Understand the AI agent orchestrator role, 2026 skills, Australian demand, and a practical path to become one.',
        author: 'Dr Sam Donegan',
        slug: 'featured/what-is-an-ai-agent-orchestrator-and-how-can-i-become-one-20',
        image: 'https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Fhero-bf8dfb39-2fe4-44a3-836a-b7ca593d40af.jpg?alt=media&token=aca34ccb-4071-4fd8-87dd-65abebf13916',
        imageAlt: 'Person coordinating multiple AI agent workflows on a screen',
    },
    'featured/how-to-get-a-job-at-an-ai-startup-australia': {
        title: 'How to Get a Job at an AI Startup in Australia (2026)',
        date: '2026-01-16',
        description: 'Practical 2026 guide to land AI startup roles in Australia: where to look, portfolio tactics, interview prep, and local work-rights tips.',
        author: 'Dr Sam Donegan',
        slug: 'featured/how-to-get-a-job-at-an-ai-startup-australia',
        image: 'https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Fhero-08abda89-03c4-4ea8-92b6-74a950332e2c.jpg?alt=media&token=a583a613-e277-4865-b0bb-c9eecc3be872',
        imageAlt: 'Team collaborating in a startup office with laptops',
    },
    'featured/ai-startup-companies': {
        title: 'AI startup companies in Australia (2026 guide)',
        date: '2026-01-16',
        description: 'See where AI startups are growing in Australia, how to assess them, funding options, and responsible AI signals in 2026.',
        author: 'Dr Sam Donegan',
        slug: 'featured/ai-startup-companies',
        image: 'https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Fhero-c0a9272c-7c60-45ff-9716-9be16e76ffae.jpg?alt=media&token=a7c9bdfc-25b5-4dfa-8be2-01be5488c168',
        imageAlt: 'Team collaborating around a laptop with AI diagrams',
    },
    'featured/australian-founders': {
        title: 'Australian founders',
        date: '2026-01-16',
        description: 'Explore how Australian founders connect, find records, and access funding in 2026—covering networks, history sources, and inclusive community steps.',
        author: 'Dr Sam Donegan',
        slug: 'featured/australian-founders',
        image: 'https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Fhero-4ad6f4bb-7daf-483f-9011-70292f8e493e.jpg?alt=media&token=fd644fd0-5792-4824-acb2-4bb873b075d8',
        imageAlt: 'Australian founders collaborating in a modern workspace',
    },
    'featured/startup-incubator-melbourne': {
        title: 'Startup incubator Melbourne (2026)',
        date: '2026-01-17',
        description: 'Current overview of Melbourne startup incubators and accelerators—programs, eligibility, equity, timelines, and how to choose. As at Jan 2026.',
        author: 'Dr Sam Donegan',
        slug: 'featured/startup-incubator-melbourne',
        image: 'https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Fhero-69bbf9ce-161b-45e3-99ba-2a38429cc76d.jpg?alt=media&token=847ec6be-d4ed-4819-be4a-02922684166e',
        imageAlt: 'Melbourne skyline at dusk',
        hasContent: true,
    },
    'featured/how-do-i-figure-out-how-much-my-product-should-cost': {
        title: 'How to price your product in Australia (2025)',
        date: '2026-01-14',
        description: 'Learn how to set product pricing in Australia using cost, value, and competitor signals, test willingness-to-pay, and stay compliant with ACCC rules.',
        author: 'Dr Sam Donegan',
        slug: 'featured/how-do-i-figure-out-how-much-my-product-should-cost',
        image: 'https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Fhero-ff729998-0ce9-4822-89af-11bca3c17257.jpg?alt=media&token=7ab776b3-d45c-4ff5-9679-b9b169949d94',
        imageAlt: 'Team reviewing pricing scenarios on laptops and whiteboard',
        hasContent: true,
    },
    'featured/ive-vibe-coded-my-startup-now-what-how-to-get-your-mvp-in': {
        title: 'I\'ve vibe-coded my startup—now what? How to get your MVP in front of users',
        date: '2026-01-13',
        description: 'Turn your vibe-coded build into a tested MVP. Learn how to validate with real users, ship safely, and prepare for pilots and investment in Australia.',
        author: 'Dr Sam Donegan',
        slug: 'featured/ive-vibe-coded-my-startup-now-what-how-to-get-your-mvp-in',
        image: 'https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Fhero-a8f7d8bc-9e4a-4112-8b69-729f16129e61.jpg?alt=media&token=4ba2d150-2aa5-4945-9c4a-69013546d9ba',
        imageAlt: 'Founder testing a mobile MVP with early users in a coworking space',
        hasContent: true,
    },
    'featured/how-to-raise-money-for-my-startup-in-australia-2026': {
        title: 'How to raise money for my startup in Australia (2026 guide)',
        date: '2026-01-13',
        description: 'Step-by-step 2026 guide for Australian founders on grants, angels, VC, and due diligence, with AU links and compliance tips.',
        author: 'MLAI Team',
        slug: 'featured/how-to-raise-money-for-my-startup-in-australia-2026',
        image: 'https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Fhero-00fbdc1f-4a2c-473f-a965-743fa8a2e728.jpg?alt=media&token=0451eb99-10d0-446d-a95d-01e22f54c831',
        imageAlt: 'Founders reviewing funding documents in an Australian coworking space',
        hasContent: true,
    },
    'featured/how-to-get-started-with-ai-2026': {
        title: 'How to get started with AI in Australia (2026)',
        date: '2026-01-08',
        description: 'Learn how Australians can start with AI in 2026: skills, tools, compliance, and quick wins for teams, students, and founders.',
        author: 'Dr Sam Donegan',
        slug: 'featured/how-to-get-started-with-ai-2026',
        image: 'https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Fhero-d712d9d4-9358-43a8-a5c1-be38741f4d8e.jpg?alt=media&token=a4aa21de-513d-4d48-82d9-c7ef58e21268',
        imageAlt: 'How to get started with AI in Australia (2026)',
        hasContent: true,
    },
    'featured/best-way-to-learn-about-ai-2026': {
        title: 'Best Way to Learn About AI in 2026 (Australia)',
        date: '2026-01-08',
        description: 'A 2026 guide for Australians to learn AI: courses, portfolios, responsible use, and job market tips with practical next steps.',
        author: 'Dr Sam Donegan',
        slug: 'featured/best-way-to-learn-about-ai-2026',
        image: 'https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Fhero-1d8313de-82ba-4ddc-a776-52cee7f2fa1b.jpg?alt=media&token=e14f4ba6-f385-40ec-8453-017f0d7efffa',
        imageAlt: 'Best Way to Learn About AI in 2026 (Australia)',
        hasContent: true,
    },
    'featured/ai-hackathons-and-events-melbourne': {
        title: 'AI Hackathons and Events in Melbourne (2026 Guide)',
        date: '2026-01-08',
        description: 'Discover 2026 AI hackathons and community events in Melbourne, including formats, venues, costs, and tips to prepare and pitch effectively.',
        author: 'Dr Sam Donegan',
        slug: 'featured/ai-hackathons-and-events-melbourne',
        image: 'https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Fhero-15a64fe7-880f-4170-80a8-2c3569c3e951.jpg?alt=media&token=0e40531f-09c8-41b6-9956-b5449ca38836',
        imageAlt: 'AI Hackathons and Events in Melbourne (2026 Guide)',
        hasContent: true,
    },
    'featured/how-to-start-a-startup-and-use-ai-to-make-it-easy': {
        title: 'How to Start a Startup and Use AI to Make It Easy (2026)',
        date: '2026-01-07',
        description: 'Practical 2026 guide for Australian founders on starting a startup and using AI safely to speed research, validation, and operations.',
        author: 'MLAI Team',
        slug: 'featured/how-to-start-a-startup-and-use-ai-to-make-it-easy',
        image: 'https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2Fmlai.au%2Fimages%2F7ebeaf16-d68f-42f9-b1a1-3a77d19d6c80%20(2).png?alt=media&token=70248355-2685-43f2-b855-57566e7146a7',
        imageAlt: 'How to Start a Startup and Use AI to Make It Easy (2026)',
        hasContent: true,
    },
    'featured/weekly-deep-dive-into-ai-and-ml-advancements-updates': {
        title: 'Weekly Deep Dive into AI and ML Advancements & Updates',
        date: '2026-01-08',
        description: 'Issue #1: Journal paper breakdowns, new AI tools (MiniMax, Nemotron 3), book recommendations, and thoughts on valid Turing Tests.',
        author: 'MLAI Editorial Team',
        authors: ['samDonegan', 'junKaiChang', 'juliaPonder'],
        slug: 'featured/weekly-deep-dive-into-ai-and-ml-advancements-updates',
        image: 'https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2Fmlai.au%2Fimages%2FChatGPT%20Image%20Jan%209%2C%202026%2C%2001_40_55%20PM%20(1).png?alt=media&token=dc0a3df1-837b-4549-be70-bc59ba215777',
        imageAlt: 'Abstract data visualisation representing AI and machine learning signals',
        hasContent: true,
    },
};

export const ORDERED_ARTICLE_ROUTE_SLUGS: string[] = Object.keys(ARTICLE_REGISTRY);

export function getNextArticleSlug(currentSlug: string): string | undefined {
    const index = ORDERED_ARTICLE_ROUTE_SLUGS.indexOf(currentSlug);
    if (index === -1 || index === ORDERED_ARTICLE_ROUTE_SLUGS.length - 1) {
        return undefined;
    }
    return ORDERED_ARTICLE_ROUTE_SLUGS[index + 1];
}

// Public API Functions

export function getArticleBySlug(slug: string): ArticleWithSlug | undefined {
    const normalized = normalizeSlug(slug);
    // Direct match
    if (ARTICLE_REGISTRY[normalized]) {
        return ARTICLE_REGISTRY[normalized];
    }

    // Try finding by suffix if only the leaf slug is provided
    const foundKey = Object.keys(ARTICLE_REGISTRY).find(key => key.endsWith(`/${normalized}`) || key === normalized);
    if (foundKey) return ARTICLE_REGISTRY[foundKey];

    return undefined;
}

export function getArticlesSortedNewestFirst(): ArticleWithSlug[] {
    return Object.values(ARTICLE_REGISTRY).sort((a, b) => {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
}

export function getClusterCardsForPillar(pillarSlug: string): ArticleWithSlug[] {
    // Simple containment check for now.
    // In a real scenario, you might have a more robust "parent-child" relationship.
    const normalized = normalizeSlug(pillarSlug);
    return Object.values(ARTICLE_REGISTRY).filter(article =>
        article.slug.startsWith(normalized + '/') && article.slug !== normalized
    );
}

export function resolveArticleRouteSlug(registrySlug: string): string {
    // This function ensures that we return the full route path for a given registry slug
    return normalizeSlug(registrySlug);
}

export function applyArticleRegistryDefaults(defaults: Partial<ArticleWithSlug>): ArticleWithSlug {
    // Helper to fill in missing details if needed
    return {
        title: 'Untitled Article',
        date: new Date().toISOString().split('T')[0],
        description: '',
        author: 'MLAI Team',
        slug: 'unknown',
        image: '',
        imageAlt: '',
        ...defaults
    } as ArticleWithSlug;
}
