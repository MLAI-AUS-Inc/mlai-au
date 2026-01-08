
export type ArticleStructuredDataHowToConfig = {
    name?: string
    description?: string
    totalTime?: string
    estimatedCost?: {
        currency: string
        value: string | number
    }
    supplies?: string[]
    tools?: string[]
}

export type ArticleStructuredDataConfig = {
    article?: boolean
    faq?: {
        enabled?: boolean
    }
    howTo?: ArticleStructuredDataHowToConfig
}

export type ArticleSeoConfig = {
    toc?: boolean
    howTo?: boolean
    mediaObject?: boolean
    citations?: boolean
    internalLinks?: string[]
    structuredData?: ArticleStructuredDataConfig
}

export const BASE_ARTICLE_SEO_CONFIG: Record<string, ArticleSeoConfig> = {
    '/articles/technology/introduction-to-mlai': {
        toc: true,
        howTo: false,
        mediaObject: false,
        citations: true,
        internalLinks: [],
    },
};

export const canonical = (path: string) => {
    const siteUrl = typeof process !== 'undefined' && process.env.NEXT_PUBLIC_SITE_URL
        ? process.env.NEXT_PUBLIC_SITE_URL
        : 'https://www.supportsorted.com';
    return `${siteUrl}${path}`;
};
