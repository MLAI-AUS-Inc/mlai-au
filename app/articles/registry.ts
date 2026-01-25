
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
    | 'careers'
    | 'technology'
    | 'ai-ml'
    | 'startups'
    | 'community'
    | 'workshops'
    | 'tutorials';

const CATEGORY_SEGMENTS: ArticleRouteCategory[] = [
    'featured',
    'careers',
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
    'featured/the-best-startup-pitch-deck-ever': {
        title: 'The Best Startup Pitch Deck Ever (2026): An Australian Founder’s Guide',
        date: '2026-01-25',
        description: 'Investors’ 2026 expectations, the 12‑slide structure, AU‑specific tips, timing, examples, and the most common mistakes—plus a downloadable checklist.',
        author: 'Dr Sam Donegan',
        slug: 'featured/the-best-startup-pitch-deck-ever',
        image: 'https://placehold.co/1200x630/png',
        imageAlt: 'The Best Startup Pitch Deck Ever (2026): An Australian Founder’s Guide',
        hasContent: true,
    },
    'featured/how-to-get-data-science-job': {
        title: 'How to get a data science job in Australia (2026)',
        date: '2026-01-24',
        description: 'AU‑focused guide to landing a data science role: skills, portfolio, interviews, where to find jobs, and practical steps for grads, switchers and engineers.',
        author: 'Dr Sam Donegan',
        slug: 'featured/how-to-get-data-science-job',
        image: 'https://placehold.co/1200x630/png',
        imageAlt: 'How to get a data science job in Australia (2026)',
        hasContent: true,
    },
    'featured/how-much-do-data-scientists-make': {
        title: "How Much Do Data Scientists Make?'",
        date: '2026-01-24',
        description: 'Salary ranges for data scientists in Australia in 2026—entry, mid, senior and lead. City and industry differences, skills that lift pay, and negotiation tips.',
        author: 'Dr Sam Donegan',
        slug: 'featured/how-much-do-data-scientists-make',
        image: 'https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Fhero-efc07de1-b4f1-46b2-8245-211ce8e1dd64.jpg?alt=media&token=ad15ab6a-efa7-4176-ba33-9908ed9a2d2e',
        imageAlt: "How Much Do Data Scientists Make?'",
    },
    'careers/how-to-build-a-model-in-data-science': {
        title: 'How to build a model in data science (2026)',
        date: '2026-01-24',
        description: 'AU‑focused, practical steps to frame the problem, prepare data, choose algorithms, train, evaluate, deploy and monitor models—privacy and governance included.',
        author: 'Dr Sam Donegan',
        slug: 'careers/how-to-build-a-model-in-data-science',
        image: 'https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Fhero-e50e5db0-d45f-42af-bbe1-fa732bdd1ffb.jpg?alt=media&token=cee71a66-a4bf-48d9-81b0-a662965f714a',
        imageAlt: 'How to build a model in data science (2026)',
        hasContent: true,
    },
    'careers/how-does-machine-learning-work': {
        title: 'How does machine learning work? A practical 2026 guide',
        date: '2026-01-23',
        description: 'Plain-English explainer of the ML training loop, learning types, evaluation and deployment—with Australian privacy context and practical steps.',
        author: 'Dr Sam Donegan',
        slug: 'careers/how-does-machine-learning-work',
        image: 'https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Fhero-d0945aa1-ae80-4b0e-80e7-40e1f2141e50.jpg?alt=media&token=2c38a5f5-d083-443b-8b43-c4aa54e1aa95',
        imageAlt: 'How does machine learning work? A practical 2026 guide',
    },
    'careers/how-to-do-machine-learning': {
        title: 'How To Do Machine Learning',
        date: '2026-01-23',
        description: 'A practical Australian roadmap to start machine learning in 2026: prerequisites, first projects, scikit-learn demo, evaluation, and ethics.',
        author: 'Dr Sam Donegan',
        slug: 'careers/how-to-do-machine-learning',
        image: 'https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Fhero-9928d844-a3c2-4380-a60e-aa5b53db545c.jpg?alt=media&token=205cf271-80e5-42ed-a1f6-e98573826a71',
        imageAlt: 'How To Do Machine Learning',
        hasContent: true,
    },
    'careers/how-to-become-machine-learning-engineer': {
        title: 'How to become a Machine Learning Engineer (Australia, 2026)',
        date: '2026-01-23',
        description: 'Skills, pathways, portfolio projects, certifications, and a 90‑day plan to become an ML engineer in Australia in 2026—practical, evidence‑based guidance.',
        author: 'Dr Sam Donegan',
        slug: 'careers/how-to-become-machine-learning-engineer',
        image: 'https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Fhero-4db8401a-a8e5-4f7c-a183-9f1f5a3fac71.jpg?alt=media&token=87457c20-1ffb-4a1b-8a0d-20096b1b9546',
        imageAlt: 'How to become a Machine Learning Engineer (Australia, 2026)',
        hasContent: true,
    },
    'startups/how-vcs-value-startups': {
        title: 'How VCs value startups (Australia, 2026)',
        date: '2026-01-22',
        description: 'How venture capital investors value startups in 2026: methods, metrics, and term‑sheet mechanics with context for Australian founders and AI teams.',
        author: 'Dr Sam Donegan',
        slug: 'startups/how-vcs-value-startups',
        image: 'https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Fhero-aab7aebb-f326-4ee4-b06c-48702edb6ddf.jpg?alt=media&token=fc7e98eb-7918-4997-a2e0-26a4964b64e6',
        imageAlt: 'How VCs value startups (Australia, 2026)',
        hasContent: true,
    },
    'startups/how-to-get-into-venture-capital': {
        title: 'How to get into venture capital (Australia, 2026)',
        date: '2026-01-22',
        description: 'A practical, AU-focused guide to breaking into VC: what firms hire for, real entry paths, track‑record tips, and a 90‑day plan. Updated 2026.',
        author: 'Dr Sam Donegan',
        slug: 'startups/how-to-get-into-venture-capital',
        image: 'https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Fhero-d23bd6be-5c90-4bb8-bc19-02189749e2c6.jpg?alt=media&token=97b584da-e610-47a2-b038-fc9c7ea3ce3f',
        imageAlt: 'How to get into venture capital (Australia, 2026)',
        hasContent: true,
    },
    'community/how-to-network-at-networking-events': {
        title: 'How to network at networking events (2026)',
        date: '2026-01-22',
        description: 'Practical, AU-focused tips to introduce yourself, start conversations, add value and follow up after networking events—templates included.',
        author: 'Dr Sam Donegan',
        slug: 'community/how-to-network-at-networking-events',
        image: 'https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Fhero-ff43afe8-537f-4a5b-8796-c64d4545eec0.jpg?alt=media&token=0a60df5b-c2e8-4925-8ed0-abedc264838b',
        imageAlt: 'How to network at networking events (2026)',
        hasContent: true,
    },
    'careers/how-to-become-a-data-science': {
        title: 'How to become a data scientist in Australia (2026 guide)',
        date: '2026-01-21',
        description: 'Australian pathways to become a data scientist in 2026: degree vs bootcamp, essential skills, timelines, portfolio tips, and where to find entry‑level roles.',
        author: 'Dr Sam Donegan',
        slug: 'careers/how-to-become-a-data-science',
        image: 'https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Fhero-cfae1b03-07ed-47d9-9d44-08e21792ee10.jpg?alt=media&token=fbcf162c-9774-45f3-89b7-77c0e8d236e0',
        imageAlt: 'How to become a data scientist in Australia (2026 guide)',
        hasContent: true,
    },
    'careers/why-is-artificial-intelligence-bad': {
        title: 'Why is artificial intelligence bad?',
        date: '2026-01-21',
        description: "AI has real downsides—bias, privacy breaches, misinformation, job impacts. Here's a plain‑English guide to the risks and how Australia can manage them in 2026.",
        author: 'Dr Sam Donegan',
        slug: 'careers/why-is-artificial-intelligence-bad',
        image: 'https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Fhero-f9e5b8be-754b-4be7-90f9-0cfe7f226d5d.jpg?alt=media&token=83d585bc-f5e8-4536-9079-a6e146abf01a',
        imageAlt: 'Why is artificial intelligence bad?',
        hasContent: true,
    },
    'careers/what-are-artificial-intelligence': {
        title: 'What is Artificial Intelligence (AI)?',
        date: '2026-01-21',
        description: 'A clear, Australian‑context explainer of AI: how it works, types, examples, risks and ethics, plus practical steps to explore responsibly in 2026.',
        author: 'Dr Sam Donegan',
        slug: 'careers/what-are-artificial-intelligence',
        image: 'https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Fhero-1767c4ce-112a-4466-b4b0-d421beb7e312.jpg?alt=media&token=b3ebd9d9-8bd4-4c62-a5e5-bbf3009e9d99',
        imageAlt: 'What is Artificial Intelligence (AI)?',
        hasContent: true,
    },
    'featured/how-can-i-learn-artificial-intelligence': {
        title: 'How can I learn artificial intelligence? (Australia, 2026)',
        date: '2026-01-21',
        description: 'A practical Australian path to learn AI: foundations, maths/coding, study options, projects, privacy, costs, timelines, and communities. Clear steps and FAQs.',
        author: 'Dr Sam Donegan',
        slug: 'featured/how-can-i-learn-artificial-intelligence',
        image: 'https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Fhero-1049bac6-f2d7-498f-980d-6509040136eb.jpg?alt=media&token=af776564-016c-4863-9467-a5ad38e5f5c6',
        imageAlt: 'How can I learn artificial intelligence? (Australia, 2026)',
        hasContent: true,
    },
    'startups/how-to-invest-in-startups-india': {
        title: 'How to invest in startups in India: a guide for Australians',
        date: '2026-01-21',
        description: 'Australians investing in Indian startups: routes (syndicates, AIFs, direct), KYC/PAN, documents, tax basics and due diligence. General info only; as at Jan 2026.',
        author: 'Dr Sam Donegan',
        slug: 'startups/how-to-invest-in-startups-india',
        image: 'https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Fhero-d9db90bd-d13c-4341-8e0f-63edaee6e06b.jpg?alt=media&token=016de48a-97df-47bf-aba5-e09e564b9cfe',
        imageAlt: 'How to invest in startups in India: a guide for Australians',
        hasContent: true,
    },
    'startups/what-percent-of-startups-fail': {
        title: 'What percent of startups fail? (Australia, 2026)',
        date: '2026-01-20',
        description: 'Latest evidence on startup failure rates in 2026, what "failure" means, timelines (1–5 years), and the Australian context—plus ways to reduce risk.',
        author: 'Dr Sam Donegan',
        slug: 'startups/what-percent-of-startups-fail',
        image: 'https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Fhero-111c3b26-106b-448b-9c5a-a2ffb7860e9f.jpg?alt=media&token=45888962-20f3-49c6-bc47-d6554fb0e8cb',
        imageAlt: 'What percent of startups fail? (Australia, 2026)',
        hasContent: true,
    },
    'careers/what-is-deep-learning': {
        title: 'What Is Deep Learning? A 2026 Guide for Australia',
        date: '2026-01-20',
        description: 'Understand deep learning: how neural networks work, key architectures, when to use it, and practical steps to get started in Australia (2026).',
        author: 'Dr Sam Donegan',
        slug: 'careers/what-is-deep-learning',
        image: 'https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Fhero-fef423f7-5afd-43d4-8138-1ae684a7e707.jpg?alt=media&token=896544bb-34c2-4267-a999-af50a0f5dd60',
        imageAlt: 'What Is Deep Learning? A 2026 Guide for Australia',
        hasContent: true,
    },
    'featured/what-is-difference-between-artificial-intelligence-and-machi': {
        title: 'What’s the difference between artificial intelligence and machine learning?',
        date: '2026-01-20',
        description: 'Understand the difference between artificial intelligence and machine learning, including deep learning, examples, and careers in Australia (2026).',
        author: 'Dr Sam Donegan',
        slug: 'featured/what-is-difference-between-artificial-intelligence-and-machi',
        image: 'https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Fhero-1a746f7d-0ce2-4f98-b0d9-16a036119f36.jpg?alt=media&token=cc356090-a73b-4c8d-a5ae-9a4706ca9c05',
        imageAlt: 'What’s the difference between artificial intelligence and machine learning?',
        hasContent: true,
    },
    'startups/how-to-get-venture-capital': {
        title: 'How to Get Venture Capital in Australia (2026 Guide)',
        date: '2026-01-20',
        description: 'A practical 2026 guide for Australian founders: what VCs look for, how to pitch, typical round sizes, timelines, due diligence, and alternatives to venture capital.',
        author: 'Dr Sam Donegan',
        slug: 'startups/how-to-get-venture-capital',
        image: 'https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Fhero-580e89c1-855d-4835-baa3-8eab4f785974.jpg?alt=media&token=8a2a0190-3a1b-43b6-a90e-88d8b730a7ef',
        imageAlt: 'How to Get Venture Capital in Australia (2026 Guide)',
        hasContent: true,
    },
    'careers/what-is-artificial-general-intelligence': {
        title: 'What is Artificial General Intelligence',
        date: '2026-01-20',
        description: "Evidence‑based explainer of AGI: how it differs from today's AI, proposed evaluations, timelines, risks, and what it could mean for AI careers in Australia.",
        author: 'Dr Sam Donegan',
        slug: 'careers/what-is-artificial-general-intelligence',
        image: 'https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Fhero-3107979b-03f2-423c-b960-ae4b26850b72.jpg?alt=media&token=2817e525-d314-4127-852d-f609133af31c',
        imageAlt: 'What is Artificial General Intelligence',
        hasContent: true,
    },
    'careers/what-is-machine-learning': {
        title: 'What is Machine Learning? (2026)',
        date: '2026-01-19',
        description: 'Plain-English guide: what machine learning is, how it works, main types, examples, risks, and how to get started in Australia (2026).',
        author: 'Dr Sam Donegan',
        slug: 'careers/what-is-machine-learning',
        image: 'https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Fhero-150b6b2a-5bd3-466b-a1c0-2fcf9943e0d2.jpg?alt=media&token=932800b0-6893-4c22-b272-df8ef2ce06f4',
        imageAlt: 'What is Machine Learning? (2026)',
        hasContent: true,
    },
    'startups/what-are-startups': {
        title: 'What are startups?',
        date: '2026-01-18',
        description: 'A plain-English guide to what a startup is, how it differs from a small business, funding, stages and the Australian context in 2026.',
        author: 'Dr Sam Donegan',
        slug: 'startups/what-are-startups',
        image: 'https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Fhero-88cc7bbe-1bd0-4ed3-ada8-d9c991054839.jpg?alt=media&token=db283c71-1516-41c2-b519-fb5675abf5b5',
        imageAlt: 'What are startups?',
    },
    'startups/what-is-venture-capital': {
        title: 'What is venture capital? (2026)',
        date: '2026-01-18',
        description: 'Plain-English guide to venture capital for Australia: how VC works, stages, pros and cons, and local options in 2026.',
        author: 'Dr Sam Donegan',
        slug: 'startups/what-is-venture-capital',
        image: 'https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Fhero-cad437d2-165c-47de-974e-19eb7c0b1faf.jpg?alt=media&token=d9b29cfb-e4b8-42ad-bc5b-291a7d5dedd6',
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
    'careers/what-is-an-ai-agent-orchestrator-and-how-can-i-become-one-20': {
        title: 'What is an AI Agent Orchestrator and How Can I Become One (2026)?',
        date: '2026-01-16',
        description: 'Understand the AI agent orchestrator role, 2026 skills, Australian demand, and a practical path to become one.',
        author: 'Dr Sam Donegan',
        slug: 'careers/what-is-an-ai-agent-orchestrator-and-how-can-i-become-one-20',
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
    'startups/ai-startup-companies': {
        title: 'AI startup companies in Australia (2026 guide)',
        date: '2026-01-16',
        description: 'See where AI startups are growing in Australia, how to assess them, funding options, and responsible AI signals in 2026.',
        author: 'Dr Sam Donegan',
        slug: 'startups/ai-startup-companies',
        image: 'https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Fhero-c0a9272c-7c60-45ff-9716-9be16e76ffae.jpg?alt=media&token=a7c9bdfc-25b5-4dfa-8be2-01be5488c168',
        imageAlt: 'Team collaborating around a laptop with AI diagrams',
    },
    'startups/australian-founders': {
        title: 'Australian founders',
        date: '2026-01-16',
        description: 'Explore how Australian founders connect, find records, and access funding in 2026—covering networks, history sources, and inclusive community steps.',
        author: 'Dr Sam Donegan',
        slug: 'startups/australian-founders',
        image: 'https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Fhero-4ad6f4bb-7daf-483f-9011-70292f8e493e.jpg?alt=media&token=fd644fd0-5792-4824-acb2-4bb873b075d8',
        imageAlt: 'Australian founders collaborating in a modern workspace',
    },
    'startups/startup-incubator-melbourne': {
        title: 'Startup incubator Melbourne (2026)',
        date: '2026-01-17',
        description: 'Current overview of Melbourne startup incubators and accelerators—programs, eligibility, equity, timelines, and how to choose. As at Jan 2026.',
        author: 'Dr Sam Donegan',
        slug: 'startups/startup-incubator-melbourne',
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
    'startups/how-to-raise-money-for-my-startup-in-australia-2026': {
        title: 'How to raise money for my startup in Australia (2026 guide)',
        date: '2026-01-13',
        description: 'Step-by-step 2026 guide for Australian founders on grants, angels, VC, and due diligence, with AU links and compliance tips.',
        author: 'MLAI Team',
        slug: 'startups/how-to-raise-money-for-my-startup-in-australia-2026',
        image: 'https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Fhero-00fbdc1f-4a2c-473f-a965-743fa8a2e728.jpg?alt=media&token=0451eb99-10d0-446d-a95d-01e22f54c831',
        imageAlt: 'Founders reviewing funding documents in an Australian coworking space',
        hasContent: true,
    },
    'careers/how-to-get-started-with-ai-2026': {
        title: 'How to get started with AI in Australia (2026)',
        date: '2026-01-08',
        description: 'Learn how Australians can start with AI in 2026: skills, tools, compliance, and quick wins for teams, students, and founders.',
        author: 'Dr Sam Donegan',
        slug: 'careers/how-to-get-started-with-ai-2026',
        image: 'https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Fhero-d712d9d4-9358-43a8-a5c1-be38741f4d8e.jpg?alt=media&token=a4aa21de-513d-4d48-82d9-c7ef58e21268',
        imageAlt: 'How to get started with AI in Australia (2026)',
        hasContent: true,
    },
    'careers/best-way-to-learn-about-ai-2026': {
        title: 'Best Way to Learn About AI in 2026 (Australia)',
        date: '2026-01-08',
        description: 'A 2026 guide for Australians to learn AI: courses, portfolios, responsible use, and job market tips with practical next steps.',
        author: 'Dr Sam Donegan',
        slug: 'careers/best-way-to-learn-about-ai-2026',
        image: 'https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Fhero-1d8313de-82ba-4ddc-a776-52cee7f2fa1b.jpg?alt=media&token=e14f4ba6-f385-40ec-8453-017f0d7efffa',
        imageAlt: 'Best Way to Learn About AI in 2026 (Australia)',
        hasContent: true,
    },
    'community/ai-hackathons-and-events-melbourne': {
        title: 'AI Hackathons and Events in Melbourne (2026 Guide)',
        date: '2026-01-08',
        description: 'Discover 2026 AI hackathons and community events in Melbourne, including formats, venues, costs, and tips to prepare and pitch effectively.',
        author: 'Dr Sam Donegan',
        slug: 'community/ai-hackathons-and-events-melbourne',
        image: 'https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Fhero-15a64fe7-880f-4170-80a8-2c3569c3e951.jpg?alt=media&token=0e40531f-09c8-41b6-9956-b5449ca38836',
        imageAlt: 'AI Hackathons and Events in Melbourne (2026 Guide)',
        hasContent: true,
    },
    'startups/how-to-start-a-startup-and-use-ai-to-make-it-easy': {
        title: 'How to Start a Startup and Use AI to Make It Easy (2026)',
        date: '2026-01-07',
        description: 'Practical 2026 guide for Australian founders on starting a startup and using AI safely to speed research, validation, and operations.',
        author: 'MLAI Team',
        slug: 'startups/how-to-start-a-startup-and-use-ai-to-make-it-easy',
        image: 'https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2Fmlai.au%2Fimages%2F7ebeaf16-d68f-42f9-b1a1-3a77d19d6c80%20(2).png?alt=media&token=70248355-2685-43f2-b855-57566e7146a7',
        imageAlt: 'How to Start a Startup and Use AI to Make It Easy (2026)',
        hasContent: true,
    },
    'community/weekly-deep-dive-into-ai-and-ml-advancements-updates': {
        title: 'Weekly Deep Dive into AI and ML Advancements & Updates',
        date: '2026-01-08',
        description: 'Issue #1: Journal paper breakdowns, new AI tools (MiniMax, Nemotron 3), book recommendations, and thoughts on valid Turing Tests.',
        author: 'MLAI Editorial Team',
        authors: ['samDonegan', 'junKaiChang', 'juliaPonder'],
        slug: 'community/weekly-deep-dive-into-ai-and-ml-advancements-updates',
        image: 'https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2Fmlai.au%2Fimages%2FChatGPT%20Image%20Jan%209%2C%202026%2C%2001_40_55%20PM%20(1).png?alt=media&token=dc0a3df1-837b-4549-be70-bc59ba215777',
        imageAlt: 'Abstract data visualisation representing AI and machine learning signals',
        hasContent: true,
    },
    'community/weekly-deep-dive-into-ai-and-ml-advancements-updates-issue-2': {
        title: 'AI Bits for Techies | Issue #2 | 19 Jan 2026',
        date: '2026-01-19',
        description: 'Issue #2: Weekly deep dive into AI and ML advancements and updates.',
        author: 'MLAI Editorial Team',
        authors: ['samDonegan', 'junKaiChang', 'juliaPonder'],
        slug: 'community/weekly-deep-dive-into-ai-and-ml-advancements-updates-issue-2',
        image: 'https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2Fmlai.au%2Fimages%2FChatGPT%20Image%20Jan%209%2C%202026%2C%2001_07_03%20PM.png?alt=media&token=d143aea5-9ffa-4674-906b-4d7fe020e2df',
        imageAlt: 'Scientific illustration of transient image classification',
        hasContent: true,
    },
    'community/weekly-deep-dive-into-ai-and-ml-advancements-updates-issue-3': {
        title: 'AI Bits for Techies | Issue #3 | 26 Jan 2026',
        date: '2026-01-26',
        description: 'Issue #3: Weekly deep dive into AI and ML advancements and updates.',
        author: 'MLAI Editorial Team',
        authors: ['samDonegan', 'junKaiChang', 'juliaPonder'],
        slug: 'community/weekly-deep-dive-into-ai-and-ml-advancements-updates-issue-3',
        image: 'https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2Fmlai.au%2Fimages%2FChatGPT%20Image%20Jan%209%2C%202026%2C%2001_07_03%20PM.png?alt=media&token=d143aea5-9ffa-4674-906b-4d7fe020e2df',
        imageAlt: 'Scientific illustration of transient image classification',
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
