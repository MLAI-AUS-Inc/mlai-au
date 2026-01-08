
// Adapted from user provided code for React Router v7
import type { MetaDescriptor } from "react-router";

export type ArticleWithSlug = {
    title: string;
    date: string; // YYYY-MM-DD
    description: string;
    author: string;
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

// Overrides for specific slugs or sub-paths\nconst CATEGORY_OVERRIDES: Record<string, ArticleRouteCategory> = {\n    // Add category overrides as needed\n};

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
    'featured/how-to-get-started-with-ai-2026': {
        title: 'How to get started with AI in Australia (2026)',
        date: '2026-01-08',
        description: 'Learn how Australians can start with AI in 2026: skills, tools, compliance, and quick wins for teams, students, and founders.',
        author: 'MLAI Team',
        slug: 'featured/how-to-get-started-with-ai-2026',
        image: 'https://placehold.co/1200x630/png',
        imageAlt: 'How to get started with AI in Australia (2026)',
        hasContent: true,
    },
    'featured/best-way-to-learn-about-ai-2026': {
        title: 'Best Way to Learn About AI in 2026 (Australia)',
        date: '2026-01-08',
        description: 'A 2026 guide for Australians to learn AI: courses, portfolios, responsible use, and job market tips with practical next steps.',
        author: 'MLAI Team',
        slug: 'featured/best-way-to-learn-about-ai-2026',
        image: 'https://placehold.co/1200x630/png',
        imageAlt: 'Best Way to Learn About AI in 2026 (Australia)',
    },
    'featured/ai-hackathons-and-events-melbourne': {
        title: 'AI Hackathons and Events in Melbourne (2025 Guide)',
        date: '2026-01-08',
        description: 'Discover 2025 AI hackathons and community events in Melbourne, including formats, venues, costs, and tips to prepare and pitch effectively.',
        author: 'MLAI Team',
        slug: 'featured/ai-hackathons-and-events-melbourne',
        image: 'https://placehold.co/1200x630/png',
        imageAlt: 'AI Hackathons and Events in Melbourne (2025 Guide)',
        hasContent: true,
    },
    'featured/how-to-start-a-startup-and-use-ai-to-make-it-easy': {
        title: 'How to Start a Startup and Use AI to Make It Easy (2025)',
        date: '2026-01-07',
        description: 'Practical 2025 guide for Australian founders on starting a startup and using AI safely to speed research, validation, and operations.',
        author: 'MLAI Team',
        slug: 'featured/how-to-start-a-startup-and-use-ai-to-make-it-easy',
        image: 'https://placehold.co/1200x630/png',
        imageAlt: 'How to Start a Startup and Use AI to Make It Easy (2025)',
        hasContent: true,
    },
    'featured/weekly-deep-dive-into-ai-and-ml-advancements-updates': {
        title: 'Weekly deep dive into AI and ML advancements: updates for 2025',
        date: '2026-01-08',
        description: 'Stay across this week\'s AI and ML advancements with Australian context: model updates, safety notes, regulation changes, tooling tips, and actions for teams.',
        author: 'MLAI Team',
        slug: 'featured/weekly-deep-dive-into-ai-and-ml-advancements-updates',
        image: 'https://placehold.co/1200x630/png',
        imageAlt: 'Weekly deep dive into AI and ML advancements: updates for 2025',
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
