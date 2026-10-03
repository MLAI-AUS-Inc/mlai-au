
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

export type ArticleConversionType =
    | "events"
    | "studio-builder"
    | "studio-project"
    | "founder-tools"
    | "vibe-raising"

export type ArticleConversionConfig = {
    primary: ArticleConversionType | "none"
    secondary?: ArticleConversionType
    version?: string
    primaryIcp?: "SMB" | "BUILDER" | "FOUNDER_BUILDER" | "COMMUNITY" | "OUTSIDE"
    copy?: { title: string; body: string; button: string }
    defaultEventPreference?: "all" | "melbourne" | "sydney" | "online"
    eventCalendarOnly?: boolean
}

export type ArticleSeoConfig = {
    toc?: boolean
    howTo?: boolean
    mediaObject?: boolean
    citations?: boolean
    internalLinks?: string[]
    structuredData?: ArticleStructuredDataConfig
    conversion?: ArticleConversionConfig
}

export const BASE_ARTICLE_SEO_CONFIG: Record<string, ArticleSeoConfig> = {
    '/articles/featured/build-an-ai-personal-assistant-for-one-small-business-task': {
        toc: true,
        howTo: false,
        mediaObject: false,
        citations: true,
        internalLinks: [],
    },
    '/articles/featured/startups-in-melbourne-for-ai-builders-and-new-founders': {
        toc: true,
        howTo: false,
        mediaObject: false,
        citations: true,
        internalLinks: [],
    },
    '/articles/featured/how-to-start-a-startup-as-an-ai-builder': {
        toc: true,
        howTo: false,
        mediaObject: false,
        citations: true,
        internalLinks: [],
    },
    '/articles/featured/startup-company-investment-for-ai-founders': {
        toc: true,
        howTo: false,
        mediaObject: false,
        citations: true,
        internalLinks: [],
        conversion: { primary: "vibe-raising", secondary: "events", version: "urgent-v1" },
    },
    '/articles/featured/what-community-is-in-ai-and-why-it-is-more-than-a-group': {
        toc: true,
        howTo: false,
        mediaObject: false,
        citations: true,
        internalLinks: [],
    },
    '/articles/featured/what-is-an-accelerator-and-is-it-right-for-your-ai-startup': {
        toc: true,
        howTo: false,
        mediaObject: false,
        citations: true,
        internalLinks: [],
    },
    '/articles/featured/invest-in-business-startups-before-you-commit': {
        toc: true,
        howTo: false,
        mediaObject: false,
        citations: true,
        internalLinks: [],
        conversion: { primary: "vibe-raising", secondary: "events", version: "urgent-v1" },
    },
    '/articles/featured/a-practical-guide-for-australian-founders-building-an-ai-startup': {
        toc: true,
        howTo: false,
        mediaObject: false,
        citations: true,
        internalLinks: [],
    },
    '/articles/featured/best-meetup-websites-for-ai-and-startup-communities-in-australia': {
        toc: true,
        howTo: false,
        mediaObject: false,
        citations: true,
        internalLinks: [],
    },
    '/articles/featured/where-to-find-ai-events-in-melbourne': {
      toc: true,
        howTo: false,
        mediaObject: false,
        citations: true,
        internalLinks: [],
    },
    '/articles/featured/why-australian-startups-need-stronger-ai-communities': {
        toc: true,
        howTo: false,
        mediaObject: false,
        citations: true,
        internalLinks: [],
    },
    '/articles/featured/how-to-find-an-ai-and-tech-meetup-in-sydney': {
        toc: true,
        howTo: false,
        mediaObject: false,
        citations: true,
        internalLinks: [],
        conversion: { primary: "events", version: "sydney-event-finder-v1" },
    },
    '/articles/featured/how-to-pitch-your-idea': {
        toc: true,
        howTo: false,
        mediaObject: false,
        citations: false,
        internalLinks: [],
        conversion: { primary: 'events', primaryIcp: 'COMMUNITY', version: 'idea-conversation-v3', eventCalendarOnly: true, copy: {
            title: 'Bring one clearer question to an MLAI event',
            body: 'Still exploring an AI idea? Choose a relevant online or in-person event and bring the question your rehearsal exposed. Check the listing and ask before sharing; attendance does not include a pitch slot, review or introduction.',
            button: 'Explore upcoming MLAI events',
        } }
    },
    '/articles/featured/how-many-people-use-artificial-intelligence-in-2026': {
        toc: true,
        howTo: false,
        mediaObject: false,
        citations: true,
        internalLinks: [],
    },
    '/articles/featured/what-is-an-intelligent-agent-in-artificial-intelligence': {
        toc: true,
        howTo: false,
        mediaObject: false,
        citations: true,
        internalLinks: [],
    },
    '/articles/featured/what-is-a-unicorn-startup-and-why-it-matters': {
        toc: true,
        howTo: false,
        mediaObject: false,
        citations: true,
        internalLinks: [],
        conversion: { primary: "vibe-raising", secondary: "events", version: "unicorn-evidence-v1" },
    },
    '/articles/featured/what-an-entrepreneur-does-and-how-to-start-well': {
        toc: true,
        howTo: false,
        mediaObject: false,
        citations: false,
        internalLinks: [],
        conversion: { primary: "founder-tools", secondary: "events", version: "urgent-v1" },
    },
    '/articles/featured/what-is-artificial-intelligence-in-simple-words': {
    "toc": true,
    "howTo": false,
    "mediaObject": false,
    "citations": false,
    "internalLinks": [],
    "conversion": {
        "primary": "events",
        "version": "article-pilot-2026-09"
    },
    "structuredData": {
        "article": true,
        "faq": {
            "enabled": true
        }
    }
    },
    '/articles/featured/what-is-an-agent-in-artificial-intelligence': {
    "toc": true,
    "howTo": false,
    "mediaObject": false,
    "citations": true,
    "internalLinks": [],
    "conversion": {
        "primary": "events",
        "version": "article-pilot-2026-09"
    },
    "structuredData": {
        "article": true,
        "faq": {
            "enabled": true
        }
    }
    },
    '/articles/featured/how-to-startup-a-small-business-in-australia': {
        toc: true,
        howTo: false,
        mediaObject: false,
        citations: true,
        internalLinks: [],
    },
    '/articles/featured/what-is-general-artificial-intelligence-and-why-it-matters': {
        toc: true,
        howTo: false,
        mediaObject: false,
        citations: false,
        internalLinks: [],
        conversion: { primary: "events", secondary: "studio-project", version: "urgent-v1" },
    },
    '/articles/featured/what-constitutes-a-startup-in-practice': {
  toc: true,
        howTo: false,
        mediaObject: false,
        citations: true,
        internalLinks: [],
    },
    '/articles/featured/what-is-artificial-intelligence-used-for-in-everyday-work-and-life': {
        toc: true,
        howTo: false,
        mediaObject: false,
        citations: true,
        internalLinks: [],
    },
    '/articles/featured/why-founders-clubs-work-for-early-stage-growth': {
        toc: true,
        howTo: false,
        mediaObject: false,
        citations: true,
        internalLinks: [],
    },
    '/articles/featured/what-is-inference-in-artificial-intelligence-and-why-it-matters': {
        toc: true,
        howTo: false,
        mediaObject: false,
        citations: true,
        internalLinks: [],
    },
    '/articles/featured/how-to-build-ai-for-real-business-problems': {
        toc: true,
        howTo: false,
        mediaObject: false,
        citations: true,
        internalLinks: [],
    },
    '/articles/featured/starting-a-company-around-an-ai-idea-from-prototype-to-customers': {
        toc: true,
        howTo: false,
        mediaObject: false,
        citations: true,
        internalLinks: [],
    },
    '/articles/featured/how-to-get-the-first-customers-for-my-startup-in-2026': {
        toc: true,
        howTo: false,
        mediaObject: false,
        citations: true,
        internalLinks: [],
    },
    '/articles/featured/go-to-market-for-startups': {
    "toc": true,
    "howTo": false,
    "mediaObject": false,
    "citations": true,
    "internalLinks": [],
    "conversion": {
        "primary": "events",
        "version": "article-pilot-2026-09"
    },
    "structuredData": {
        "article": true,
        "faq": {
            "enabled": true
        }
    }
    },
    '/articles/featured/how-to-assess-cofounder-values-match-before-you-commit': {
        toc: true,
        howTo: false,
        mediaObject: false,
        citations: true,
        internalLinks: [],
    },
    '/articles/featured/a-practical-guide-on-how-to-create-an-artificial-intelligence': {
        toc: true,
        howTo: false,
        mediaObject: false,
        citations: true,
        internalLinks: [],
    },
    '/articles/featured/how-to-choose-the-best-ai-for-coding-in-2025': {
        toc: true,
        howTo: false,
        mediaObject: false,
        citations: true,
        internalLinks: [],
        conversion: { primary: "studio-builder", secondary: "events", version: "urgent-v1" },
    },
    '/articles/featured/how-to-test-for-a-cofounder-values-match-before-you-commit': {
        toc: true,
        howTo: false,
        mediaObject: false,
        citations: true,
        internalLinks: [],
    },
    '/articles/featured/how-technology-affects-education-negatively': {
        toc: true,
        howTo: false,
        mediaObject: false,
        citations: true,
        internalLinks: [],
    },
    '/articles/featured/learn-ai-melbourne': {
        toc: true,
        howTo: false,
        mediaObject: false,
        citations: true,
        internalLinks: [],
    },
    '/articles/featured/how-small-business-owners-can-get-started-with-ai-2026': {
        toc: true,
        howTo: false,
        mediaObject: false,
        citations: true,
        internalLinks: [],
    },
    '/articles/featured/how-to-foster-community-engagement': {
        toc: true,
        howTo: false,
        mediaObject: false,
        citations: true,
        internalLinks: [],
    },
    '/articles/featured/startup-accelerator-australia': {
    "toc": true,
    "howTo": false,
    "mediaObject": false,
    "citations": false,
    "internalLinks": [],
    "conversion": {
        "primary": "events",
        "version": "article-pilot-2026-09"
    },
    "structuredData": {
        "article": true,
        "faq": {
            "enabled": true
        }
    }
    },
    '/articles/featured/how-to-find-networking-events': {
        toc: true,
        howTo: false,
        mediaObject: false,
        citations: true,
        internalLinks: [],
    },
    '/articles/featured/how-modern-technology-affects-education-today-and-in-the-fut': {
    "toc": true,
    "howTo": false,
    "mediaObject": false,
    "citations": true,
    "internalLinks": [],
    "conversion": {
        "primary": "events",
        "version": "article-pilot-2026-09"
    },
    "structuredData": {
        "article": true,
        "faq": {
            "enabled": true
        }
    }
    },
    '/articles/featured/how-technology-has-changed-education': {
        toc: true,
        howTo: false,
        mediaObject: false,
        citations: true,
        internalLinks: [],
    },
    '/articles/featured/how-much-venture-capital-was-invested-in-2023': {
        toc: true,
        howTo: false,
        mediaObject: false,
        citations: true,
        internalLinks: [],
    },
    '/articles/featured/what-are-collaboration-tools': {
        toc: true,
        howTo: false,
        mediaObject: false,
        citations: true,
        internalLinks: [],
    },
    '/articles/featured/how-technology-is-shaping-learning-in-higher-education': {
        toc: true,
        howTo: false,
        mediaObject: false,
        citations: true,
        internalLinks: [],
    },
    '/articles/featured/venture-capital-how-does-it-work': {
        toc: true,
        howTo: false,
        mediaObject: false,
        citations: true,
        internalLinks: [],
    },
    '/articles/featured/how-many-startup-accelerators-and-incubators-are-there-in-si': {
        toc: true,
        howTo: false,
        mediaObject: false,
        citations: true,
        internalLinks: [],
        conversion: { primary: "founder-tools", secondary: "events", version: "urgent-v1" },
    },
    '/articles/featured/how-does-a-venture-capital-firm-work': {
        toc: true,
        howTo: false,
        mediaObject: false,
        citations: true,
        internalLinks: [],
    },
    '/articles/featured/the-best-startup-pitch-deck-ever': {
    "toc": true,
    "howTo": false,
    "mediaObject": false,
    "citations": true,
    "internalLinks": [],
    "conversion": {
        "primary": "events",
        "version": "article-pilot-2026-09"
    },
    "structuredData": {
        "article": true,
        "faq": {
            "enabled": true
        }
    }
    },
    '/articles/featured/how-to-get-data-science-job': {
    "toc": true,
    "howTo": false,
    "mediaObject": false,
    "citations": true,
    "internalLinks": [],
    "conversion": {
        "primary": "events",
        "version": "article-pilot-2026-09"
    },
    "structuredData": {
        "article": true,
        "faq": {
            "enabled": true
        }
    }
    },
    '/articles/featured/how-much-do-data-scientists-make': {
        toc: true,
        howTo: false,
        mediaObject: false,
        citations: true,
        internalLinks: [],
        conversion: { primary: "studio-builder", secondary: "events", version: "urgent-v1" },
    },
    '/articles/featured/how-to-build-a-model-in-data-science': {
        toc: true,
        howTo: false,
        mediaObject: false,
        citations: true,
        internalLinks: [],
    },
    '/articles/featured/how-does-machine-learning-work': {
        toc: true,
        howTo: false,
        mediaObject: false,
        citations: true,
        internalLinks: [],
    },
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
    '/articles/community/weekly-deep-dive-into-ai-and-ml-advancements-updates': {
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
        conversion: { primary: 'events', primaryIcp: 'COMMUNITY', version: 'classification-reading-v2', copy: {
            title: 'Discuss what an AI result really shows',
            body: 'Find a relevant MLAI learning event and bring one question about a paper’s evidence or limitations. Check the listing; attendance does not provide scientific review or deployment approval.',
            button: 'Find a relevant learning event',
        } }
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
        conversion: { primary: 'studio-project', primaryIcp: 'SMB', version: 'first-workflow-cost-v3', copy: {
            title: 'Start with one workflow',
            body: 'Chosen a process worth investigating after comparing the simpler option and its costs? Share the current steps, review needs, permitted inputs and success criterion with MLAI Studio. We can discuss whether a scoped implementation is a fit; you do not need to arrive with a tool chosen.',
            button: 'Describe your workflow',
        } }
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
    '/articles/community/weekly-deep-dive-into-ai-and-ml-advancements-updates-issue-9': {
        toc: true,
        howTo: false,
        mediaObject: true,
        citations: true,
        internalLinks: [],
        conversion: { primary: "studio-builder", secondary: "events", version: "urgent-v1" },
    },
"/articles/community/weekly-deep-dive-into-ai-and-ml-advancements-updates-issue-5": {
    "howTo": false,
    "conversion": {
        "primary": "events",
        "version": "article-pilot-2026-09"
    },
    "structuredData": {
        "article": true,
        "faq": {
            "enabled": true
        }
    }
},
"/articles/community/how-to-network-at-networking-events": {
        conversion: {
            primary: "events", primaryIcp: "COMMUNITY", version: "network-participation-v2",
            copy: { title: "Practise a genuine conversation", body: "Find an MLAI session that matches your interests. Bring one question, listen to other participants and agree any follow-up together.", button: "Find an MLAI event" },
        },
        toc: true,
        citations: true
},
"/articles/community/weekly-deep-dive-into-ai-and-ml-advancements-updates-issue-2": {
        conversion: { primary: 'events', primaryIcp: 'COMMUNITY', version: 'answer-preference-v2', copy: {
            title: 'Explore what makes an AI answer useful',
            body: 'Find a relevant MLAI learning event and bring a permitted example or question. Check the listing; participation does not guarantee model advice or individual feedback.',
            button: 'Find an AI learning event',
        } },
        toc: true,
        citations: true
},
"/articles/community/weekly-deep-dive-into-ai-and-ml-advancements-updates-issue-3": {
        conversion: { primary: 'events', primaryIcp: 'COMMUNITY', version: 'footprint-reading-v2', copy: {
            title: 'Ask better questions about AI’s footprint',
            body: 'Find a relevant MLAI discussion and bring a source plus one question about its assumptions. Check the topic and format; participation is not environmental certification or professional assurance.',
            button: 'Explore relevant MLAI events',
        } },
        toc: true,
        citations: true
},
"/articles/community/weekly-deep-dive-into-ai-and-ml-advancements-updates-issue-4": {
        conversion: { primary: 'studio-builder', primaryIcp: 'BUILDER', version: 'delivery-effort-v3', copy: {
            title: 'Show the review behind your AI-assisted build',
            body: 'Share your own permitted project, what you checked, the review decision and handover limits. Include your skills and availability; consideration for scoped paid work depends on suitability and available projects.',
            button: 'Apply with your build evidence',
        } },
        toc: true,
        citations: true
},
"/articles/community/weekly-deep-dive-into-ai-and-ml-advancements-updates-issue-6": {
        conversion: {
            primary: "events",
            primaryIcp: "COMMUNITY",
            version: "issue6-discovery-v3",
            copy: {
                title: "Bring a question, not a sales script",
                body: "Bring your own non-confidential problem statement, one contrary observation and the next question you need to test. Find a suitable MLAI session by topic, location and online or in-person format; attendance does not guarantee customers, introductions or an individual review.",
                button: "Find a suitable MLAI event",
            },
        },
        toc: true,
        citations: true
},
"/articles/community/weekly-deep-dive-into-ai-and-ml-advancements-updates-issue-7": {
        conversion: { primary: 'events', primaryIcp: 'COMMUNITY', version: 'robotics-reading-v2', copy: {
            title: 'Discuss the evidence behind robotics headlines',
            body: 'Find a relevant MLAI learning event and bring one question from your research record. Check the topic and format; attendance does not provide robotics training or deployment approval.',
            button: 'Find a relevant AI event',
        } },
        toc: true,
        citations: true
},
"/articles/community/weekly-deep-dive-into-ai-and-ml-advancements-updates-issue-8": {
        conversion: {
            primary: "studio-builder",
            primaryIcp: "BUILDER",
            version: "issue8-reproducibility-v3",
            copy: {
                title: "Can someone else reproduce what you built?",
                body: "Have your own AI-assisted build that another operator can inspect? Share a permitted demo or repository, your contribution, tests and handover limits. Apply for consideration for scoped, paid projects; selection and matching depend on fit and availability.",
                button: "Apply with delivery evidence",
            },
        },
        toc: true,
        citations: true
}
};

export const canonical = (path: string) => {
    return `https://mlai.au${path}`;
};
