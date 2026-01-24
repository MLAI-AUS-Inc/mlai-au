
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
    '/articles/featured/how-to-do-machine-learning': {
        toc: true,
        howTo: false,
        mediaObject: false,
        citations: true,
        internalLinks: [],
    },
    '/articles/featured/how-to-become-machine-learning-engineer': {
        toc: true,
        howTo: false,
        mediaObject: false,
        citations: true,
        internalLinks: [],
    },
    '/articles/featured/how-vcs-value-startups': {
        toc: true,
        howTo: false,
        mediaObject: false,
        citations: true,
        internalLinks: [],
    },
    '/articles/featured/how-to-get-into-venture-capital': {
        toc: true,
        howTo: false,
        mediaObject: false,
        citations: true,
        internalLinks: [],
    },
    '/articles/featured/how-to-network-at-networking-events': {
        toc: true,
        howTo: false,
        mediaObject: false,
        citations: true,
        internalLinks: [],
    },
    '/articles/featured/how-to-become-a-data-science': {
        toc: true,
        howTo: false,
        mediaObject: false,
        citations: true,
        internalLinks: [],
    },
    '/articles/featured/why-is-artificial-intelligence-bad': {
        toc: true,
        howTo: false,
        mediaObject: false,
        citations: true,
        internalLinks: [],
    },
    '/articles/featured/what-are-artificial-intelligence': {
        toc: true,
        howTo: false,
        mediaObject: false,
        citations: true,
        internalLinks: [],
    },
    '/articles/featured/how-can-i-learn-artificial-intelligence': {
        toc: true,
        howTo: false,
        mediaObject: false,
        citations: true,
        internalLinks: [],
    },
    '/articles/featured/how-to-invest-in-startups-india': {
        toc: true,
        howTo: false,
        mediaObject: false,
        citations: true,
        internalLinks: [],
    },
    '/articles/featured/what-percent-of-startups-fail': {
        toc: true,
        howTo: false,
        mediaObject: false,
        citations: true,
        internalLinks: [],
    },
    '/articles/featured/what-is-deep-learning': {
        toc: true,
        howTo: false,
        mediaObject: false,
        citations: true,
        internalLinks: [],
    },
    '/articles/featured/what-is-difference-between-artificial-intelligence-and-machi': {
        toc: true,
        howTo: false,
        mediaObject: false,
        citations: true,
        internalLinks: [],
    },
    '/articles/featured/how-to-get-venture-capital': {
        toc: true,
        howTo: false,
        mediaObject: false,
        citations: true,
        internalLinks: [],
    },
    '/articles/featured/what-is-artificial-general-intelligence': {
        toc: true,
        howTo: false,
        mediaObject: false,
        citations: true,
        internalLinks: [],
    },
    '/articles/featured/what-is-machine-learning': {
        toc: true,
        howTo: false,
        mediaObject: false,
        citations: true,
        internalLinks: [],
    },
    '/articles/featured/what-are-startups': {
        toc: true,
        howTo: false,
        mediaObject: false,
        citations: true,
        internalLinks: [],
    },
    '/articles/featured/what-is-venture-capital': {
        toc: true,
        howTo: false,
        mediaObject: false,
        citations: true,
        internalLinks: [],
    },
    '/articles/featured/accelerator-startup-programs': {
        toc: true,
        howTo: false,
        mediaObject: false,
        citations: true,
        internalLinks: [],
    },
    '/articles/featured/what-is-an-ai-agent-orchestrator-and-how-can-i-become-one-20': {
        toc: true,
        howTo: false,
        mediaObject: false,
        citations: true,
        internalLinks: [],
    },
    '/articles/featured/how-to-get-a-job-at-an-ai-startup-australia': {
        toc: true,
        howTo: false,
        mediaObject: false,
        citations: true,
        internalLinks: [],
    },
    '/articles/featured/ai-startup-companies': {
        toc: true,
        howTo: false,
        mediaObject: false,
        citations: true,
        internalLinks: [],
    },
    '/articles/featured/australian-founders': {
        toc: true,
        howTo: false,
        mediaObject: false,
        citations: true,
        internalLinks: [],
    },
    '/articles/featured/startup-incubator-melbourne': {
        toc: true,
        howTo: false,
        mediaObject: false,
        citations: true,
        internalLinks: [],
    },
    '/articles/featured/how-do-i-figure-out-how-much-my-product-should-cost': {
        toc: true,
        howTo: false,
        mediaObject: false,
        citations: true,
        internalLinks: [],
    },
    '/articles/featured/ive-vibe-coded-my-startup-now-what-how-to-get-your-mvp-in': {
        toc: true,
        howTo: false,
        mediaObject: false,
        citations: true,
        internalLinks: [],
    },
    '/articles/technology/introduction-to-mlai': {
        toc: true,
        howTo: false,
        mediaObject: false,
        citations: true,
        internalLinks: [],
    },
    '/articles/featured/weekly-deep-dive-into-ai-and-ml-advancements-updates': {
        toc: true,
        howTo: false,
        mediaObject: true,
        citations: true,
        internalLinks: [
            '/articles/featured/how-to-get-started-with-ai-2026',
            '/articles/featured/best-way-to-learn-about-ai-2026',
        ],
        structuredData: {
            article: true,
            faq: { enabled: true },
        },
    },
    '/articles/featured/how-to-start-a-startup-and-use-ai-to-make-it-easy': {
        toc: true,
        howTo: false,
        mediaObject: true,
        citations: true,
        internalLinks: [],
        structuredData: {
            article: true,
            faq: { enabled: true },
        },
    },
    '/articles/featured/how-to-get-started-with-ai-2026': {
        toc: true,
        howTo: false,
        mediaObject: true,
        citations: true,
        internalLinks: [],
        structuredData: {
            article: true,
            faq: { enabled: true },
        },
    },
    '/articles/featured/ai-hackathons-and-events-melbourne': {
        toc: true,
        howTo: false,
        mediaObject: true,
        citations: true,
        internalLinks: [],
        structuredData: {
            article: true,
            faq: { enabled: true },
        },
    },
    '/articles/featured/best-way-to-learn-about-ai-2026': {
        toc: true,
        howTo: false,
        mediaObject: true,
        citations: true,
        internalLinks: [],
        structuredData: {
            article: true,
            faq: { enabled: true },
        },
    },
    '/articles/featured/how-to-raise-money-for-my-startup-in-australia-2026': {
        toc: true,
        howTo: false,
        mediaObject: false,
        citations: false,
        internalLinks: [],
        structuredData: {
            article: true,
            faq: { enabled: true },
        },
    },
};

export const canonical = (path: string) => {
    const siteUrl = typeof process !== 'undefined' && process.env.NEXT_PUBLIC_SITE_URL
        ? process.env.NEXT_PUBLIC_SITE_URL
        : 'https://www.mlai.au';
    return `${siteUrl}${path}`;
};
