// Article registry scaffolded by Content Factory
export type ArticleWithSlug = {
    title: string;
    date: string;
    description: string;
    author: string;
    slug: string;
    image: string;
    imageAlt: string;
    hasContent?: boolean;
};

export type ArticleRouteCategory =
    | 'featured'
    | 'ai-machine-learning-events-australia'
    | 'ai-hackathons-practical-prototyping'
    | 'healthcare-ai-medhack'
    | 'ai-founder-updates-investor-readiness'
    | 'learning-ai-machine-learning-beginners'
    | 'ai-community-contribution-roo-points'
    | 'ai-sponsorship-ecosystem-partnerships'
    | 'random';

export const CATEGORY_SEGMENTS: ArticleRouteCategory[] = [
    'featured',
    'ai-machine-learning-events-australia',
    'ai-hackathons-practical-prototyping',
    'healthcare-ai-medhack',
    'ai-founder-updates-investor-readiness',
    'learning-ai-machine-learning-beginners',
    'ai-community-contribution-roo-points',
    'ai-sponsorship-ecosystem-partnerships',
    'random',
];

export const ARTICLE_REGISTRY: Record<string, ArticleWithSlug> = {};

function normalizeSlug(slug?: string): string {
    if (!slug) return '';
    return slug.trim().toLowerCase().replace(/^\/+|\/+$/g, '');
}

export function getArticleBySlug(slug: string): ArticleWithSlug | undefined {
    const normalized = normalizeSlug(slug);
    return ARTICLE_REGISTRY[normalized];
}

export function getArticlesSortedNewestFirst(): ArticleWithSlug[] {
    return Object.values(ARTICLE_REGISTRY).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getClusterCardsForPillar(pillarSlug: string): ArticleWithSlug[] {
    const normalized = normalizeSlug(pillarSlug);
    return Object.values(ARTICLE_REGISTRY).filter(article => article.slug.startsWith(normalized + '/') && article.slug !== normalized);
}

export function resolveArticleRouteSlug(registrySlug: string): string {
    return normalizeSlug(registrySlug);
}

export function applyArticleRegistryDefaults(defaults: Partial<ArticleWithSlug>): ArticleWithSlug {
    return {
        title: 'Untitled Article',
        date: new Date().toISOString().split('T')[0],
        description: '',
        author: 'MLAI',
        slug: 'unknown',
        image: '',
        imageAlt: '',
        ...defaults,
    } as ArticleWithSlug;
}
