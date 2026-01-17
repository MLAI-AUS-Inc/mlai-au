
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
    'featured/accelerator-startup-programs': {
        title: 'Accelerator startup programs in Australia (2026)',
        date: '2026-01-17',
        description: 'How accelerators work in Australia in 2026: eligibility, equity, timelines, and how to choose the right program. Links to LaunchVic, Startmate and Google for Startups.',
        author: 'Dr Sam Donegan',
        slug: 'featured/accelerator-startup-programs',
        image: 'https://placehold.co/1200x630/png',
        imageAlt: 'Accelerator startup programs in Australia (2026)',
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
