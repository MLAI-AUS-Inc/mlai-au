
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
    'featured/how-to-find-a-cofoudner': {
        title: 'how-to-find-a-cofoudner',
        date: '2025-01-01',
        description: '',
        author: 'MLAI Team',
        slug: 'featured/how-to-find-a-cofoudner',
        image: 'https://placehold.co/1200x630/png',
        imageAlt: 'how-to-find-a-cofoudner',
        hasContent: true,
    },
    // Example Article
    'technology/introduction-to-mlai': {
        title: 'Introduction to MLAI',
        date: '2025-10-01',
        description: 'An introduction to Machine Learning and AI in Australia.',
        author: 'Dr Sam Donegan',
        slug: 'technology/introduction-to-mlai',
        image: 'https://placehold.co/1200x630/png',
        imageAlt: 'MLAI Intro',
    },
    'featured/community-guidelines': {
        title: 'Community Guidelines',
        date: '2025-01-15',
        description: 'Guidelines for participating in the MLAI community.',
        author: 'Dr Sam Donegan',
        slug: 'featured/community-guidelines',
        image: 'https://placehold.co/1200x630/png',
        imageAlt: 'Community Guidelines',
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
