import { ARTICLE_READING_PATHS, type ArticleReadingPath } from './reading-paths';

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
    /** "none" explicitly suppresses the legacy fallback CTA. */
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
    /** Legacy generation hint. Sources are article-owned; the layout adds none. */
    citations?: boolean
    internalLinks?: string[]
    /** Visible explanation of the next task, authored alongside the canonical URL. */
    readingPaths?: readonly ArticleReadingPath[]
    structuredData?: ArticleStructuredDataConfig
    conversion?: ArticleConversionConfig
    /** The published body already renders its own approved CTA. Keep its offer metadata without adding another footer CTA. */
    contentOwnsConversion?: boolean
    /** The published body already renders the shared disclaimer component. */
    contentOwnsDisclaimer?: boolean
}

export const BASE_ARTICLE_SEO_CONFIG: Record<string, ArticleSeoConfig> = {
    '/articles/featured/build-an-ai-personal-assistant-for-one-small-business-task': {
        toc: true, howTo: false, mediaObject: false, citations: true,
        contentOwnsConversion: true, contentOwnsDisclaimer: true,
        internalLinks: ARTICLE_READING_PATHS['/articles/featured/build-an-ai-personal-assistant-for-one-small-business-task'].map(({ href }) => href),
        readingPaths: ARTICLE_READING_PATHS['/articles/featured/build-an-ai-personal-assistant-for-one-small-business-task'],
        conversion: {
            primary: 'events', primaryIcp: 'COMMUNITY', version: 'recovered-assistant-learning-v1', eventCalendarOnly: true,
            copy: {
                title: "Learn with Australia's AI community",
                body: "The public MLAI events calendar lists upcoming AI and machine learning events. Readers can inspect an event and register with its organiser if it fits. Availability, format and any cost depend on the event page; attending does not guarantee one-to-one implementation advice.",
                button: 'Explore MLAI events',
            },
        },
    },
    '/articles/featured/startups-in-melbourne-for-ai-builders-and-new-founders': {
        toc: true, howTo: false, mediaObject: false, citations: true,
        contentOwnsConversion: true, contentOwnsDisclaimer: true,
        internalLinks: ARTICLE_READING_PATHS['/articles/featured/startups-in-melbourne-for-ai-builders-and-new-founders'].map(({ href }) => href),
        readingPaths: ARTICLE_READING_PATHS['/articles/featured/startups-in-melbourne-for-ai-builders-and-new-founders'],
        conversion: {
            primary: 'events', primaryIcp: 'COMMUNITY', version: 'recovered-melbourne-learning-v1', eventCalendarOnly: true,
            copy: {
                title: 'Find an AI community conversation',
                body: 'MLAI is an Australian not-for-profit, volunteer AI community. Browse its event calendar and check current locations, formats and attendance details for an activity that fits your technical question.',
                button: 'Explore MLAI events',
            },
        },
    },
    '/articles/featured/how-to-start-a-startup-as-an-ai-builder': {
        toc: true, citations: true, internalLinks: ARTICLE_READING_PATHS['/articles/featured/how-to-start-a-startup-as-an-ai-builder'].map(({ href }) => href),
        readingPaths: ARTICLE_READING_PATHS['/articles/featured/how-to-start-a-startup-as-an-ai-builder'],
        conversion: { primary: 'studio-builder', primaryIcp: 'BUILDER', version: 'builder-delivery-v3', copy: {
            title: 'Bring evidence of how you deliver',
            body: 'Already shipping and testing work with AI coding tools? Share a permitted example, your own contribution, test evidence and availability with MLAI Studio. Apply for consideration for scoped paid projects, subject to fit and available work. A supplied lab alone does not establish client readiness.',
            button: 'Apply with your build evidence',
        } },
    },
    '/articles/featured/what-community-is-in-ai-and-why-it-is-more-than-a-group': {
        conversion: {
            primary: "events", primaryIcp: "COMMUNITY", version: "community-contribution-v3", eventCalendarOnly: true,
            copy: { title: "Bring one question, not a sales pitch", body: "Use your participation record to choose a topic and format that fit. Browse MLAI events with your applied preference, check the listing and bring one question if the session supports it. Listening is welcome as a starting point; no contribution, introduction or paid-work outcome is promised.", button: "Find an MLAI event for your question" },
        },
        toc: true, citations: true, internalLinks: ARTICLE_READING_PATHS['/articles/featured/what-community-is-in-ai-and-why-it-is-more-than-a-group'].map(({ href }) => href),
        readingPaths: ARTICLE_READING_PATHS['/articles/featured/what-community-is-in-ai-and-why-it-is-more-than-a-group'],
    },
    '/articles/community/weekly-deep-dive-into-ai-and-ml-advancements-updates-issue-5': {
        conversion: {
            primary: "studio-builder", primaryIcp: "BUILDER", version: "issue5-source-handover-v4",
            copy: { title: "Show how you inspect the systems you build", body: "Already building with AI coding tools? Share your own permitted project, tested changes, checked assumptions and unresolved limits with MLAI Studio to be considered for scoped, paid delivery work. Include your handover and realistic availability; completing this teaching exercise alone does not establish client readiness.", button: "Apply with your delivery evidence" },
        },
        toc: true, citations: true, internalLinks: ARTICLE_READING_PATHS['/articles/community/weekly-deep-dive-into-ai-and-ml-advancements-updates-issue-5'].map(({ href }) => href),
        readingPaths: ARTICLE_READING_PATHS['/articles/community/weekly-deep-dive-into-ai-and-ml-advancements-updates-issue-5'],
    },
    '/articles/community/how-to-network-at-networking-events': {
        conversion: {
            primary: "events", primaryIcp: "COMMUNITY", version: "network-participation-v2",
            copy: { title: "Practise a genuine conversation", body: "Find an MLAI session that matches your interests. Bring one question, listen to other participants and agree any follow-up together.", button: "Find an MLAI event" },
        },
        toc: true, citations: true, internalLinks: [],
    },
    '/articles/community/weekly-deep-dive-into-ai-and-ml-advancements-updates': {
        conversion: { primary: 'events', primaryIcp: 'COMMUNITY', version: 'classification-reading-v2', copy: {
            title: 'Discuss what an AI result really shows',
            body: 'Find a relevant MLAI learning event and bring one question about a paper’s evidence or limitations. Check the listing; attendance does not provide scientific review or deployment approval.',
            button: 'Find a relevant learning event',
        } },
        toc: true, citations: true, internalLinks: ARTICLE_READING_PATHS['/articles/community/weekly-deep-dive-into-ai-and-ml-advancements-updates'].map(({ href }) => href),
        readingPaths: ARTICLE_READING_PATHS['/articles/community/weekly-deep-dive-into-ai-and-ml-advancements-updates'],
    },
    '/articles/community/weekly-deep-dive-into-ai-and-ml-advancements-updates-issue-2': {
        conversion: { primary: 'events', primaryIcp: 'COMMUNITY', version: 'answer-preference-v2', copy: {
            title: 'Explore what makes an AI answer useful',
            body: 'Find a relevant MLAI learning event and bring a permitted example or question. Check the listing; participation does not guarantee model advice or individual feedback.',
            button: 'Find an AI learning event',
        } },
        toc: true, citations: true, internalLinks: ARTICLE_READING_PATHS['/articles/community/weekly-deep-dive-into-ai-and-ml-advancements-updates-issue-2'].map(({ href }) => href),
        readingPaths: ARTICLE_READING_PATHS['/articles/community/weekly-deep-dive-into-ai-and-ml-advancements-updates-issue-2'],
    },
    '/articles/community/weekly-deep-dive-into-ai-and-ml-advancements-updates-issue-3': {
        conversion: { primary: 'events', primaryIcp: 'COMMUNITY', version: 'footprint-reading-v2', copy: {
            title: 'Ask better questions about AI’s footprint',
            body: 'Find a relevant MLAI discussion and bring a source plus one question about its assumptions. Check the topic and format; participation is not environmental certification or professional assurance.',
            button: 'Explore relevant MLAI events',
        } },
        toc: true, citations: true, internalLinks: ARTICLE_READING_PATHS['/articles/community/weekly-deep-dive-into-ai-and-ml-advancements-updates-issue-3'].map(({ href }) => href),
        readingPaths: ARTICLE_READING_PATHS['/articles/community/weekly-deep-dive-into-ai-and-ml-advancements-updates-issue-3'],
    },
    '/articles/community/weekly-deep-dive-into-ai-and-ml-advancements-updates-issue-4': {
        conversion: { primary: 'studio-builder', primaryIcp: 'BUILDER', version: 'delivery-effort-v3', copy: {
            title: 'Show the review behind your AI-assisted build',
            body: 'Share your own permitted project, what you checked, the review decision and handover limits. Include your skills and availability; consideration for scoped paid work depends on suitability and available projects.',
            button: 'Apply with your build evidence',
        } },
        toc: true, citations: true, internalLinks: ARTICLE_READING_PATHS['/articles/community/weekly-deep-dive-into-ai-and-ml-advancements-updates-issue-4'].map(({ href }) => href),
        readingPaths: ARTICLE_READING_PATHS['/articles/community/weekly-deep-dive-into-ai-and-ml-advancements-updates-issue-4'],
    },
    '/articles/community/weekly-deep-dive-into-ai-and-ml-advancements-updates-issue-7': {
        conversion: { primary: 'events', primaryIcp: 'COMMUNITY', version: 'robotics-reading-v2', copy: {
            title: 'Discuss the evidence behind robotics headlines',
            body: 'Find a relevant MLAI learning event and bring one question from your research record. Check the topic and format; attendance does not provide robotics training or deployment approval.',
            button: 'Find a relevant AI event',
        } },
        toc: true, citations: true, internalLinks: ARTICLE_READING_PATHS['/articles/community/weekly-deep-dive-into-ai-and-ml-advancements-updates-issue-7'].map(({ href }) => href),
        readingPaths: ARTICLE_READING_PATHS['/articles/community/weekly-deep-dive-into-ai-and-ml-advancements-updates-issue-7'],
    },
    '/articles/community/weekly-deep-dive-into-ai-and-ml-advancements-updates-issue-8': {
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
        citations: true,
        internalLinks: ARTICLE_READING_PATHS['/articles/community/weekly-deep-dive-into-ai-and-ml-advancements-updates-issue-8'].map(({ href }) => href),
        readingPaths: ARTICLE_READING_PATHS['/articles/community/weekly-deep-dive-into-ai-and-ml-advancements-updates-issue-8'],
    },
    '/articles/featured/what-is-an-accelerator-and-is-it-right-for-your-ai-startup': {
        toc: true,
        citations: true,
        internalLinks: ARTICLE_READING_PATHS['/articles/featured/what-is-an-accelerator-and-is-it-right-for-your-ai-startup'].map(({ href }) => href),
        readingPaths: ARTICLE_READING_PATHS['/articles/featured/what-is-an-accelerator-and-is-it-right-for-your-ai-startup'],
        conversion: {
            primary: "events",
            primaryIcp: "COMMUNITY",
            version: "accelerator-decision-v2",
            copy: {
                title: "Compare your next founder step",
                body: "Bring the support question you have identified to a suitable MLAI event. Check the topic and format first; community discussion does not guarantee programme admission, investment or introductions.",
                button: "Find a founder or AI event",
            },
        },
    },
    '/articles/community/weekly-deep-dive-into-ai-and-ml-advancements-updates-issue-6': {
        toc: true,
        citations: true,
        internalLinks: ARTICLE_READING_PATHS['/articles/community/weekly-deep-dive-into-ai-and-ml-advancements-updates-issue-6'].map(({ href }) => href),
        readingPaths: ARTICLE_READING_PATHS['/articles/community/weekly-deep-dive-into-ai-and-ml-advancements-updates-issue-6'],
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
    },
    '/articles/featured/best-meetup-websites-for-ai-and-startup-communities-in-australia': {
        conversion: {
            primary: "events",
            primaryIcp: "COMMUNITY",
            version: "meetup-discovery-v3",
            eventCalendarOnly: true,
            copy: {
                title: "Choose your next MLAI session",
                body: "Bring your learning question and shortlist requirements to the MLAI calendar. Your applied city or online preference carries through; check the exact ticket format, access needs and admission before making plans.",
                button: "Browse MLAI events",
            },
        },
        toc: true,
        howTo: false,
        mediaObject: false,
        citations: true,
        internalLinks: ARTICLE_READING_PATHS['/articles/featured/best-meetup-websites-for-ai-and-startup-communities-in-australia'].map(({ href }) => href),
        readingPaths: ARTICLE_READING_PATHS['/articles/featured/best-meetup-websites-for-ai-and-startup-communities-in-australia'],
    },
    '/articles/featured/where-to-find-ai-events-in-melbourne': {
        conversion: {
            primary: "events", primaryIcp: "COMMUNITY", version: "melbourne-format-journey-v4",
            copy: { title: "Bring one useful question to an MLAI session", body: "Use your shortlist to check a suitable topic, date and Melbourne or online ticket. Confirm admission and participation details with the organiser; a listing or waitlist is not a confirmed place.", button: "Check current MLAI events" },
        },
      toc: true,
        howTo: false,
        mediaObject: false,
        citations: true,
        internalLinks: ARTICLE_READING_PATHS['/articles/featured/where-to-find-ai-events-in-melbourne'].map(({ href }) => href),
        readingPaths: ARTICLE_READING_PATHS['/articles/featured/where-to-find-ai-events-in-melbourne'],
    },
    '/articles/featured/why-australian-startups-need-stronger-ai-communities': {
        conversion: {
            primary: "events", primaryIcp: "COMMUNITY", version: "feedback-to-test-v4", eventCalendarOnly: true,
            copy: { title: "Bring one question you can learn from", body: "Choose a relevant MLAI session and prepare a synthetic or permission-cleared example. Check that the format supports the discussion you want; a conversation is not a technical review or customer validation.", button: "Find a discussion or learning session" },
        },
        toc: true,
        howTo: false,
        mediaObject: false,
        citations: true,
        internalLinks: ARTICLE_READING_PATHS['/articles/featured/why-australian-startups-need-stronger-ai-communities'].map(({ href }) => href),
        readingPaths: ARTICLE_READING_PATHS['/articles/featured/why-australian-startups-need-stronger-ai-communities'],
    },
    '/articles/featured/how-to-find-an-ai-and-tech-meetup-in-sydney': {
        toc: true,
        howTo: false,
        mediaObject: false,
        citations: true,
        internalLinks: ARTICLE_READING_PATHS['/articles/featured/how-to-find-an-ai-and-tech-meetup-in-sydney'].map(({ href }) => href),
        readingPaths: ARTICLE_READING_PATHS['/articles/featured/how-to-find-an-ai-and-tech-meetup-in-sydney'],
        conversion: {
            primary: "events", primaryIcp: "COMMUNITY", version: "sydney-event-journey-v3", defaultEventPreference: "sydney", eventCalendarOnly: true,
            copy: { title: "Take your Sydney or online preference to MLAI events", body: "Use your shortlist question to choose a suitable MLAI session. Your format preference carries into the calendar; a matching listing is not a reservation or a promise of a place.", button: "Check MLAI options for my preference" },
        },
    },
    '/articles/featured/how-to-pitch-your-idea': {
        conversion: { primary: 'events', primaryIcp: 'COMMUNITY', version: 'idea-conversation-v3', eventCalendarOnly: true, copy: {
            title: 'Bring one clearer question to an MLAI event',
            body: 'Still exploring an AI idea? Choose a relevant online or in-person event and bring the question your rehearsal exposed. Check the listing and ask before sharing; attendance does not include a pitch slot, review or introduction.',
            button: 'Explore upcoming MLAI events',
        } },
        toc: true,
        howTo: false,
        mediaObject: false,
        citations: false,
        internalLinks: ARTICLE_READING_PATHS['/articles/featured/how-to-pitch-your-idea'].map(({ href }) => href),
        readingPaths: ARTICLE_READING_PATHS['/articles/featured/how-to-pitch-your-idea'],
    },
    '/articles/featured/how-many-people-use-artificial-intelligence-in-2026': {
        conversion: {
            primary: "events", primaryIcp: "COMMUNITY", version: "adoption-reading-v2",
            copy: { title: "Explore AI without assuming everyone is an expert", body: "Choose an MLAI learning event that matches your experience and interests. Bring a question about what AI can do, or a claim you want to understand; check whether the session is online or in person before registering.", button: "Find an AI learning event" },
        },
        toc: true,
        howTo: false,
        mediaObject: false,
        citations: true,
        internalLinks: ARTICLE_READING_PATHS['/articles/featured/how-many-people-use-artificial-intelligence-in-2026'].map(({ href }) => href),
        readingPaths: ARTICLE_READING_PATHS['/articles/featured/how-many-people-use-artificial-intelligence-in-2026'],
    },
    '/articles/featured/what-is-an-intelligent-agent-in-artificial-intelligence': {
        conversion: {
            primary: "studio-builder", primaryIcp: "BUILDER", version: "peas-builder-evidence-v3",
            copy: { title: "Show how you review what you build", body: "Have delivery evidence beyond this teaching lab? Share a permitted AI-assisted build, your own contribution, test results and limitations with MLAI Studio to be considered for scoped paid projects. Selection and matching are not guaranteed.", button: "Apply with your build evidence" },
        },
        toc: true,
        howTo: false,
        mediaObject: false,
        citations: true,
        internalLinks: ARTICLE_READING_PATHS['/articles/featured/what-is-an-intelligent-agent-in-artificial-intelligence'].map(({ href }) => href),
        readingPaths: ARTICLE_READING_PATHS['/articles/featured/what-is-an-intelligent-agent-in-artificial-intelligence'],
    },
    '/articles/featured/what-is-a-unicorn-startup-and-why-it-matters': {
        toc: true,
        howTo: false,
        mediaObject: false,
        citations: true,
        internalLinks: ARTICLE_READING_PATHS['/articles/featured/what-is-a-unicorn-startup-and-why-it-matters'].map(({ href }) => href),
        readingPaths: ARTICLE_READING_PATHS['/articles/featured/what-is-a-unicorn-startup-and-why-it-matters'],
        conversion: {
            primary: "events", primaryIcp: "COMMUNITY", version: "unicorn-literacy-v2",
            copy: { title: "Discuss the evidence behind startup headlines", body: "Find a relevant MLAI startup session and bring a question about valuations, business models or the evidence a headline leaves out. Check the listing for its actual topic and format.", button: "Find a startup discussion" },
        },
    },
    '/articles/featured/what-an-entrepreneur-does-and-how-to-start-well': {
        toc: true,
        howTo: false,
        mediaObject: false,
        citations: false,
        internalLinks: ARTICLE_READING_PATHS['/articles/featured/what-an-entrepreneur-does-and-how-to-start-well'].map(({ href }) => href),
        readingPaths: ARTICLE_READING_PATHS['/articles/featured/what-an-entrepreneur-does-and-how-to-start-well'],
        conversion: {
            primary: "events", primaryIcp: "COMMUNITY", version: "entrepreneur-learning-v3", eventCalendarOnly: true,
            copy: { title: "Bring one experiment to the conversation", body: "Have an assumption you want to examine? Choose a relevant MLAI learning event, online or in person, and bring one anonymised question from your record. Check the topic and participation rules; attendance does not promise advice, customers or funding.", button: "Explore MLAI events" },
        },
    },
    '/articles/featured/what-is-artificial-intelligence-in-simple-words': {
        toc: false, howTo: false, mediaObject: false, citations: false,
        internalLinks: ARTICLE_READING_PATHS['/articles/featured/what-is-artificial-intelligence-in-simple-words'].map(({ href }) => href),
        readingPaths: ARTICLE_READING_PATHS['/articles/featured/what-is-artificial-intelligence-in-simple-words'],
        conversion: {
            primary: "events", primaryIcp: "COMMUNITY", version: "simple-ai-2026-10-06", eventCalendarOnly: true,
            copy: { title: "Want to learn with other people?", body: "Explore MLAI talks, workshops and community catch-ups. New to AI? Check the event description for who it's for, what you need to know, the cost and whether it's online or in person.", button: "Find an AI event" },
        },
        structuredData: { article: true, faq: { enabled: false } },
    },
    '/articles/featured/what-is-an-agent-in-artificial-intelligence': {
        conversion: {
            primary: "studio-project", primaryIcp: "SMB", version: "agent-owner-decision-v3",
            copy: { title: "Scope the right workflow—not just an agent", body: "Found a gap that an improved form or fixed rule cannot handle? Share the task, systems, error consequences and approval requirements with MLAI Studio. We can discuss whether a scoped implementation is a fit; an agent is not a starting requirement.", button: "Describe your workflow" },
        },
        toc: true,
        howTo: false,
        mediaObject: false,
        citations: true,
        internalLinks: ARTICLE_READING_PATHS['/articles/featured/what-is-an-agent-in-artificial-intelligence'].map(({ href }) => href),
        readingPaths: ARTICLE_READING_PATHS['/articles/featured/what-is-an-agent-in-artificial-intelligence'],
    },
    '/articles/featured/how-to-startup-a-small-business-in-australia': {
        conversion: { primary: 'events', primaryIcp: 'COMMUNITY', version: 'launch-decisions-v2', copy: {
            title: 'Explore your next business question with MLAI',
            body: 'Find a relevant founder learning event and bring one question from your launch record. Check the listing; community discussion does not replace legal, tax or business advice.',
            button: 'Find a founder learning event',
        } },
        toc: true,
        howTo: false,
        mediaObject: false,
        citations: true,
        internalLinks: ARTICLE_READING_PATHS['/articles/featured/how-to-startup-a-small-business-in-australia'].map(({ href }) => href),
        readingPaths: ARTICLE_READING_PATHS['/articles/featured/how-to-startup-a-small-business-in-australia'],
    },
    '/articles/featured/what-is-general-artificial-intelligence-and-why-it-matters': {
        toc: true,
        howTo: false,
        mediaObject: false,
        citations: false,
        internalLinks: ARTICLE_READING_PATHS['/articles/featured/what-is-general-artificial-intelligence-and-why-it-matters'].map(({ href }) => href),
        readingPaths: ARTICLE_READING_PATHS['/articles/featured/what-is-general-artificial-intelligence-and-why-it-matters'],
        conversion: {
            primary: "events", primaryIcp: "COMMUNITY", version: "agi-evidence-v2",
            copy: { title: "Bring an AI claim worth examining", body: "Browse MLAI events for a relevant discussion of AI capabilities and limitations. The listings determine the topic; an AGI-focused session is not always available.", button: "Browse AI discussions" },
        },
    },
    '/articles/featured/what-constitutes-a-startup-in-practice': {
        conversion: { primary: 'events', primaryIcp: 'COMMUNITY', version: 'startup-model-v3', eventCalendarOnly: true, copy: {
            title: 'Explore the business behind the idea',
            body: 'Have a question about what repeats and what still needs custom work? Bring it to a relevant MLAI talk or discussion, online or in person. Check the listing before registering; attendance does not promise business advice, customers or funding.',
            button: 'Find a startup learning event',
        } },
  toc: true,
        howTo: false,
        mediaObject: false,
        citations: true,
        internalLinks: ARTICLE_READING_PATHS['/articles/featured/what-constitutes-a-startup-in-practice'].map(({ href }) => href),
        readingPaths: ARTICLE_READING_PATHS['/articles/featured/what-constitutes-a-startup-in-practice'],
    },
    '/articles/featured/what-is-artificial-intelligence-used-for-in-everyday-work-and-life': {
        conversion: { primary: 'events', primaryIcp: 'COMMUNITY', version: 'everyday-uses-learning-v4', copy: {
            title: 'Explore AI with a practical question',
            body: 'Choose a relevant MLAI learning session and bring one question about an everyday use, its limits or how to check the result. Check the topic, format and availability on the event page.',
            button: 'Find a relevant AI learning event',
        } },
        toc: true,
        howTo: false,
        mediaObject: false,
        citations: true,
        internalLinks: ARTICLE_READING_PATHS['/articles/featured/what-is-artificial-intelligence-used-for-in-everyday-work-and-life'].map(({ href }) => href),
        readingPaths: ARTICLE_READING_PATHS['/articles/featured/what-is-artificial-intelligence-used-for-in-everyday-work-and-life'],
    },
    '/articles/featured/why-founders-clubs-work-for-early-stage-growth': {
        conversion: {
            primary: "events", primaryIcp: "COMMUNITY", version: "club-participation-v4", eventCalendarOnly: true,
            copy: { title: "Try one relevant MLAI session", body: "Bring one founder question and your participation record. Your applied city or online preference carries into the MLAI calendar; check the exact session, access and booking terms. An event is not a promise of club membership, customers or funding.", button: "Find an MLAI event that fits" },
        },
        toc: true,
        howTo: false,
        mediaObject: false,
        citations: true,
        internalLinks: ARTICLE_READING_PATHS['/articles/featured/why-founders-clubs-work-for-early-stage-growth'].map(({ href }) => href),
        readingPaths: ARTICLE_READING_PATHS['/articles/featured/why-founders-clubs-work-for-early-stage-growth'],
    },
    '/articles/featured/what-is-inference-in-artificial-intelligence-and-why-it-matters': {
        conversion: {
            primary: "studio-builder", primaryIcp: "BUILDER", version: "inference-handover-v3",
            copy: { title: "Show the service behind your AI demo", body: "Have a build with reproducible tests and clear operating limits? Share your delivery evidence with MLAI Studio to be considered for scoped paid projects. Selection and matching are not guaranteed.", button: "Apply with your delivery evidence" },
        },
        toc: true,
        howTo: false,
        mediaObject: false,
        citations: true,
        internalLinks: ARTICLE_READING_PATHS['/articles/featured/what-is-inference-in-artificial-intelligence-and-why-it-matters'].map(({ href }) => href),
        readingPaths: ARTICLE_READING_PATHS['/articles/featured/what-is-inference-in-artificial-intelligence-and-why-it-matters'],
    },
    '/articles/featured/how-to-build-ai-for-real-business-problems': {
        toc: true,
        howTo: false,
        mediaObject: false,
        citations: false,
        internalLinks: ARTICLE_READING_PATHS['/articles/featured/how-to-build-ai-for-real-business-problems'].map(({ href }) => href),
        readingPaths: ARTICLE_READING_PATHS['/articles/featured/how-to-build-ai-for-real-business-problems'],
        conversion: {
            primary: "studio-project", primaryIcp: "SMB", version: "smb-commissioning-v3",
            copy: {
                title: "Bring the workflow, not a technical specification",
                body: "Share the current process, required outcome, systems and constraints with MLAI Studio. We can review the brief and discuss whether a scoped implementation is a fit.",
                button: "Discuss a scoped AI build",
            },
        },
    },
    '/articles/featured/starting-a-company-around-an-ai-idea-from-prototype-to-customers': {
        conversion: {
            primary: "studio-builder",
            primaryIcp: "FOUNDER_BUILDER",
            version: "founder-capacity-v3",
            copy: {
                title: "Have delivery capacity alongside your startup?",
                body: "Already building with AI coding tools and able to review and test what you ship? After checking your capacity and support boundaries, apply with permitted work evidence and realistic availability. MLAI Studio considers suitable builders for scoped, paid project work. Matching is not guaranteed.",
                button: "Apply for scoped contract work",
            },
        },
        toc: true,
        howTo: false,
        mediaObject: false,
        citations: true,
        internalLinks: ARTICLE_READING_PATHS['/articles/featured/starting-a-company-around-an-ai-idea-from-prototype-to-customers'].map(({ href }) => href),
        readingPaths: ARTICLE_READING_PATHS['/articles/featured/starting-a-company-around-an-ai-idea-from-prototype-to-customers'],
    },
    '/articles/featured/how-to-get-the-first-customers-for-my-startup-in-2026': {
        conversion: {
            primary: "events", primaryIcp: "COMMUNITY", version: "first-customer-decision-v3", eventCalendarOnly: true,
            copy: { title: "Bring the question your conversations changed", body: "Find a relevant MLAI founder or AI event. Bring one anonymised or synthetic question about your buyer, offer or decision to stop. Check the topic, experience level and online or in-person format. Your notes are not attached; attendance does not include leads, buyers or an individual sales review.", button: "Explore founder learning events" },
        },
        toc: true,
        howTo: false,
        mediaObject: false,
        citations: true,
        internalLinks: ARTICLE_READING_PATHS['/articles/featured/how-to-get-the-first-customers-for-my-startup-in-2026'].map(({ href }) => href),
        readingPaths: ARTICLE_READING_PATHS['/articles/featured/how-to-get-the-first-customers-for-my-startup-in-2026'],
    },
    '/articles/featured/go-to-market-for-startups': {
        conversion: {
            primary: "events", primaryIcp: "COMMUNITY", version: "gtm-channel-decision-v3", eventCalendarOnly: true,
            copy: { title: "Bring your next test decision to the community", body: "Explore MLAI events with one anonymised or synthetic question about your channel test, costs or stop rule. Check topic, experience level and online or in-person format. Your worksheet is not attached; attendance does not include customer introductions or an individual sales review.", button: "Explore founder and AI events" },
        },
        toc: true,
        howTo: false,
        mediaObject: false,
        citations: true,
        internalLinks: ARTICLE_READING_PATHS['/articles/featured/go-to-market-for-startups'].map(({ href }) => href),
        readingPaths: ARTICLE_READING_PATHS['/articles/featured/go-to-market-for-startups'],
    },
    '/articles/featured/how-to-assess-cofounder-values-match-before-you-commit': {
        conversion: {
            primary: "events", primaryIcp: "COMMUNITY", version: "cofounder-discussion-v3", eventCalendarOnly: true,
            copy: { title: "Discuss a founder decision with peers", body: "Explore MLAI events for a relevant startup conversation. Bring a synthetic or permission-cleared question about working together; attendance does not include cofounder matching or professional advice.", button: "Explore founder and AI events" },
        },
        toc: true,
        howTo: false,
        mediaObject: false,
        citations: true,
        internalLinks: ARTICLE_READING_PATHS['/articles/featured/how-to-assess-cofounder-values-match-before-you-commit'].map(({ href }) => href),
        readingPaths: ARTICLE_READING_PATHS['/articles/featured/how-to-assess-cofounder-values-match-before-you-commit'],
    },
    '/articles/featured/a-practical-guide-on-how-to-create-an-artificial-intelligence': {
        conversion: { primary: "studio-builder", primaryIcp: "BUILDER", version: "prototype-delivery-v3", copy: {
            title: "Show how you build and verify",
            body: "Have delivery experience beyond this teaching lab? Share a permitted AI-assisted project, its tests and your availability with MLAI Studio to be considered for scoped paid work, subject to fit and available projects.",
            button: "Apply with your delivery evidence",
        } },
        toc: true,
        howTo: false,
        mediaObject: false,
        citations: true,
        internalLinks: ARTICLE_READING_PATHS['/articles/featured/a-practical-guide-on-how-to-create-an-artificial-intelligence'].map(({ href }) => href),
        readingPaths: ARTICLE_READING_PATHS['/articles/featured/a-practical-guide-on-how-to-create-an-artificial-intelligence'],
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
        conversion: {
            primary: "events", primaryIcp: "COMMUNITY", version: "cofounder-trial-v3", eventCalendarOnly: true,
            copy: { title: "Bring a lesson from working together", body: "Find a relevant MLAI event to discuss a non-confidential lesson from a trial project. Check the actual session topic; no matching service or suitable cofounder is promised.", button: "Find a relevant MLAI session" },
        },
        toc: true,
        howTo: false,
        mediaObject: false,
        citations: true,
        internalLinks: ARTICLE_READING_PATHS['/articles/featured/how-to-test-for-a-cofounder-values-match-before-you-commit'].map(({ href }) => href),
        readingPaths: ARTICLE_READING_PATHS['/articles/featured/how-to-test-for-a-cofounder-values-match-before-you-commit'],
    },
    '/articles/featured/how-technology-affects-education-negatively': {
        conversion: { primary: "none", primaryIcp: "OUTSIDE", version: "outside-fit-v1" },
        toc: true,
        howTo: false,
        mediaObject: false,
        citations: true,
        internalLinks: ARTICLE_READING_PATHS['/articles/featured/how-technology-affects-education-negatively'].map(({ href }) => href),
        readingPaths: ARTICLE_READING_PATHS['/articles/featured/how-technology-affects-education-negatively'],
    },
    '/articles/featured/learn-ai-melbourne': {
        conversion: {
            primary: "events", primaryIcp: "COMMUNITY", version: "melbourne-learning-v3",
            copy: { title: "Take your next learning question to a suitable session", body: "Bring the question you want to explore and meet others learning or building with AI. Choose an MLAI session whose topic, experience level and in-person or online format fit your next step.", button: "Find a suitable learning event" },
        },
        toc: true,
        howTo: false,
        mediaObject: false,
        citations: true,
        internalLinks: ARTICLE_READING_PATHS['/articles/featured/learn-ai-melbourne'].map(({ href }) => href),
        readingPaths: ARTICLE_READING_PATHS['/articles/featured/learn-ai-melbourne'],
    },
    '/articles/featured/how-small-business-owners-can-get-started-with-ai-2026': {
        toc: true,
        howTo: false,
        mediaObject: false,
        citations: false,
        internalLinks: ARTICLE_READING_PATHS['/articles/featured/how-small-business-owners-can-get-started-with-ai-2026'].map(({ href }) => href),
        readingPaths: ARTICLE_READING_PATHS['/articles/featured/how-small-business-owners-can-get-started-with-ai-2026'],
        conversion: {
            primary: "studio-project", primaryIcp: "SMB", version: "smb-pilot-v2",
            copy: { title: "Need help implementing the pilot?", body: "Bring the workflow, systems, constraints and success measure to MLAI Studio. We can review the brief and discuss whether a scoped build is a fit.", button: "Scope one AI workflow" },
        },
    },
    '/articles/featured/how-to-foster-community-engagement': {
        conversion: {
            primary: "events", primaryIcp: "COMMUNITY", version: "decision-feedback-v4", eventCalendarOnly: true,
            copy: { title: "Start with one useful contribution", body: "Bring one question about helping people take part. Your applied city or online preference carries to the MLAI calendar; check the session and ask the organiser before proposing a feedback activity. Attendance does not grant a facilitation role or participant-research access.", button: "Find a session to take part in" },
        },
        toc: true,
        howTo: false,
        mediaObject: false,
        citations: true,
        internalLinks: ARTICLE_READING_PATHS['/articles/featured/how-to-foster-community-engagement'].map(({ href }) => href),
        readingPaths: ARTICLE_READING_PATHS['/articles/featured/how-to-foster-community-engagement'],
    },
    '/articles/featured/startup-accelerator-australia': {
        toc: true,
        howTo: false,
        mediaObject: false,
        citations: false,
        internalLinks: ARTICLE_READING_PATHS['/articles/featured/startup-accelerator-australia'].map(({ href }) => href),
        readingPaths: ARTICLE_READING_PATHS['/articles/featured/startup-accelerator-australia'],
        conversion: {
            primary: "events",
            primaryIcp: "COMMUNITY",
            version: "accelerator-evidence-journey-v3",
            secondary: "founder-tools",
            copy: {
                title: "Compare the support your startup needs",
                body: "Use your evidence record to bring one unresolved programme-fit question to an MLAI founder or AI event. Check the topic and format; attendance does not guarantee alumni access, funding or admission. Founder Tools below is optional for organising company evidence and updates.",
                button: "Find a relevant MLAI event",
            },
        },
    },
    '/articles/featured/how-to-find-networking-events': {
        conversion: {
            primary: "events", primaryIcp: "COMMUNITY", version: "search-to-shortlist-v4", eventCalendarOnly: true,
            copy: { title: "Use your question to choose an MLAI event", body: "Take the question and constraints from your record to the MLAI calendar. Your applied format preference travels with this link; check the exact listing and participation before registering.", button: "Choose your next MLAI event" },
        },
        toc: true,
        howTo: false,
        mediaObject: false,
        citations: true,
        internalLinks: ARTICLE_READING_PATHS['/articles/featured/how-to-find-networking-events'].map(({ href }) => href),
        readingPaths: ARTICLE_READING_PATHS['/articles/featured/how-to-find-networking-events'],
    },
    '/articles/featured/how-modern-technology-affects-education-today-and-in-the-fut': {
        conversion: { primary: "none", primaryIcp: "OUTSIDE", version: "outside-fit-v1" },
        toc: true,
        howTo: false,
        mediaObject: false,
        citations: true,
        internalLinks: ARTICLE_READING_PATHS['/articles/featured/how-modern-technology-affects-education-today-and-in-the-fut'].map(({ href }) => href),
        readingPaths: ARTICLE_READING_PATHS['/articles/featured/how-modern-technology-affects-education-today-and-in-the-fut'],
    },
    '/articles/featured/how-technology-has-changed-education': {
        conversion: { primary: "none", primaryIcp: "OUTSIDE", version: "outside-fit-v1" },
        toc: true,
        howTo: false,
        mediaObject: false,
        citations: true,
        internalLinks: ARTICLE_READING_PATHS['/articles/featured/how-technology-has-changed-education'].map(({ href }) => href),
        readingPaths: ARTICLE_READING_PATHS['/articles/featured/how-technology-has-changed-education'],
    },
    '/articles/featured/how-much-venture-capital-was-invested-in-2023': {
        conversion: {
            primary: "events",
            primaryIcp: "COMMUNITY",
            version: "funding-statistics-v2",
            copy: {
                title: "Discuss the evidence behind a startup headline",
                body: "Bring a funding statistic and the question it leaves unanswered to a relevant MLAI founder or AI learning event. Check the topic, experience level and online or local format before registering.",
                button: "Find a founder learning event",
            },
        },
        toc: true,
        howTo: false,
        mediaObject: false,
        citations: true,
        internalLinks: ARTICLE_READING_PATHS['/articles/featured/how-much-venture-capital-was-invested-in-2023'].map(({ href }) => href),
        readingPaths: ARTICLE_READING_PATHS['/articles/featured/how-much-venture-capital-was-invested-in-2023'],
    },
    '/articles/featured/what-are-collaboration-tools': {
        conversion: {
            primary: "studio-project",
            primaryIcp: "SMB",
            version: "smb-handoff-decision-v3",
            copy: {
                title: "Need help connecting this workflow?",
                body: "If clearer ownership or your existing tools still leave a cross-tool gap, describe where work gets stuck, your systems, access limits and acceptance tests. Bring a non-confidential summary of your handoff record so MLAI Studio can discuss whether scoped implementation is a fit.",
                button: "Describe your workflow",
            },
        },
        toc: true,
        howTo: false,
        mediaObject: false,
        citations: true,
        internalLinks: ARTICLE_READING_PATHS['/articles/featured/what-are-collaboration-tools'].map(({ href }) => href),
        readingPaths: ARTICLE_READING_PATHS['/articles/featured/what-are-collaboration-tools'],
    },
    '/articles/featured/how-technology-is-shaping-learning-in-higher-education': {
        conversion: { primary: "none", primaryIcp: "OUTSIDE", version: "outside-fit-v1" },
        toc: true,
        howTo: false,
        mediaObject: false,
        citations: true,
        internalLinks: ARTICLE_READING_PATHS['/articles/featured/how-technology-is-shaping-learning-in-higher-education'].map(({ href }) => href),
        readingPaths: ARTICLE_READING_PATHS['/articles/featured/how-technology-is-shaping-learning-in-higher-education'],
    },
    '/articles/featured/venture-capital-how-does-it-work': {
        conversion: { primary: 'events', primaryIcp: 'COMMUNITY', version: 'capital-fit-discussion-v3', copy: {
            title: 'Bring one capital-choice question',
            body: 'Use your milestone record or the dilution example to choose a question for an MLAI founder session, in person or online. Check the topic and experience level before registering; discussion is educational, not financing advice.',
            button: 'Find a founder learning session',
        } },
        toc: true,
        howTo: false,
        mediaObject: false,
        citations: true,
        internalLinks: ARTICLE_READING_PATHS['/articles/featured/venture-capital-how-does-it-work'].map(({ href }) => href),
        readingPaths: ARTICLE_READING_PATHS['/articles/featured/venture-capital-how-does-it-work'],
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
        conversion: { primary: 'events', primaryIcp: 'COMMUNITY', version: 'investor-process-v3', copy: {
            title: 'Turn your research into a useful question',
            body: 'Bring one anonymised investor-process question to an MLAI founder session, in person or online. Check the agenda and level before registering; attendance does not include investor access or a deal review.',
            button: 'Explore founder discussion events',
        } },
        toc: true,
        howTo: false,
        mediaObject: false,
        citations: true,
        internalLinks: ARTICLE_READING_PATHS['/articles/featured/how-does-a-venture-capital-firm-work'].map(({ href }) => href),
        readingPaths: ARTICLE_READING_PATHS['/articles/featured/how-does-a-venture-capital-firm-work'],
    },
    '/articles/featured/the-best-startup-pitch-deck-ever': {
        conversion: { primary: 'events', primaryIcp: 'COMMUNITY', version: 'pitch-evidence-v3', eventCalendarOnly: true, copy: {
            title: 'Bring your weakest slide claim as a question',
            body: 'Still exploring your startup story? Find a relevant online or in-person MLAI event and bring one question from your evidence review. Check the programme and ask before sharing; attendance does not include deck review, investor access or funding.',
            button: 'Find a founder learning event',
        } },
        toc: true,
        howTo: false,
        mediaObject: false,
        citations: true,
        internalLinks: ARTICLE_READING_PATHS['/articles/featured/the-best-startup-pitch-deck-ever'].map(({ href }) => href),
        readingPaths: ARTICLE_READING_PATHS['/articles/featured/the-best-startup-pitch-deck-ever'],
    },
    '/articles/featured/how-to-get-data-science-job': {
        toc: true,
        howTo: false,
        mediaObject: false,
        citations: false,
        internalLinks: ARTICLE_READING_PATHS['/articles/featured/how-to-get-data-science-job'].map(({ href }) => href),
        readingPaths: ARTICLE_READING_PATHS['/articles/featured/how-to-get-data-science-job'],
        conversion: {
            primary: "studio-builder",
            primaryIcp: "BUILDER",
            version: "builder-evidence-v3",
            copy: {
                title: "Ready to deliver a scoped project?",
                body: "Show MLAI Studio what you built with AI coding tools, how you tested it and when you are available. Apply to be considered for scoped, paid project work; matching depends on suitability and available projects.",
                button: "Apply with your work",
            },
        },
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
        conversion: { primary: 'events', primaryIcp: 'COMMUNITY', version: 'valuation-evidence-v3', copy: {
            title: 'Bring a valuation question you can explain',
            body: 'Use the worked example to identify one assumption you want to understand. Explore MLAI founder sessions for a relevant discussion, in person or online; check the topic and level before registering. Events do not provide transaction advice.',
            button: 'Find a founder learning event',
        } },
        toc: true,
        howTo: false,
        mediaObject: false,
        citations: true,
        internalLinks: ARTICLE_READING_PATHS['/articles/featured/how-vcs-value-startups'].map(({ href }) => href),
        readingPaths: ARTICLE_READING_PATHS['/articles/featured/how-vcs-value-startups'],
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
        conversion: { primary: 'studio-project', primaryIcp: 'SMB', version: 'first-workflow-cost-v3', copy: {
            title: 'Start with one workflow',
            body: 'Chosen a process worth investigating after comparing the simpler option and its costs? Share the current steps, review needs, permitted inputs and success criterion with MLAI Studio. We can discuss whether a scoped implementation is a fit; you do not need to arrive with a tool chosen.',
            button: 'Describe your workflow',
        } },
        toc: true,
        howTo: false,
        mediaObject: true,
        citations: true,
        internalLinks: ARTICLE_READING_PATHS['/articles/featured/how-to-get-started-with-ai-2026'].map(({ href }) => href),
        readingPaths: ARTICLE_READING_PATHS['/articles/featured/how-to-get-started-with-ai-2026'],
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
        conversion: {
            primary: "studio-builder",
            primaryIcp: "BUILDER",
            version: "learning-evidence-v3",
            copy: {
                title: "Can you explain, test and maintain what you build?",
                body: "Already delivering small projects with AI coding tools? Apply to MLAI Studio with a repository or demo, your delivery strengths and availability. Selection and paid project matching are not guaranteed.",
                button: "Apply with your project evidence",
            },
        },
        toc: true,
        howTo: false,
        mediaObject: true,
        citations: true,
        internalLinks: ARTICLE_READING_PATHS['/articles/featured/best-way-to-learn-about-ai-2026'].map(({ href }) => href),
        readingPaths: ARTICLE_READING_PATHS['/articles/featured/best-way-to-learn-about-ai-2026'],
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
    '/articles/featured/invest-in-business-startups-before-you-commit': {
        toc: true,
        howTo: false,
        mediaObject: false,
        citations: true,
        internalLinks: ARTICLE_READING_PATHS['/articles/featured/invest-in-business-startups-before-you-commit'].map(({ href }) => href),
        readingPaths: ARTICLE_READING_PATHS['/articles/featured/invest-in-business-startups-before-you-commit'],
        conversion: { primary: "none", primaryIcp: "OUTSIDE", version: "outside-fit-v1" },
    },
    '/articles/featured/startup-company-investment-for-ai-founders': {
        toc: true,
        howTo: false,
        mediaObject: false,
        citations: true,
        internalLinks: ARTICLE_READING_PATHS['/articles/featured/startup-company-investment-for-ai-founders'].map(({ href }) => href),
        readingPaths: ARTICLE_READING_PATHS['/articles/featured/startup-company-investment-for-ai-founders'],
        conversion: { primary: "events", primaryIcp: "COMMUNITY", version: "funding-question-v2", copy: {
            title: "Discuss the question behind your funding plan",
            body: "Bring one non-confidential milestone or evidence question to a relevant MLAI founder learning event. Check the topic and format; attendance does not include investment advice, investor introductions or funding.",
            button: "Find a founder learning event",
        } },
    },
    '/articles/featured/a-practical-guide-for-australian-founders-building-an-ai-startup': {
        toc: true, howTo: false, mediaObject: false, citations: true,
        internalLinks: ARTICLE_READING_PATHS['/articles/featured/a-practical-guide-for-australian-founders-building-an-ai-startup'].map(({ href }) => href),
        readingPaths: ARTICLE_READING_PATHS['/articles/featured/a-practical-guide-for-australian-founders-building-an-ai-startup'],
        conversion: { primary: "events", primaryIcp: "COMMUNITY", version: "validation-question-v3", eventCalendarOnly: true, copy: {
            title: "Find a founder session for your next test question",
            body: "Have conflicting records or an untested assumption? Bring one non-confidential question to a relevant MLAI founder or AI learning session. Choose a suitable topic, experience level and online or local format, and check current availability. Peer discussion can help frame the next test; customer evidence still comes from intended users.",
            button: "Explore founder learning events",
        } },
    },
    '/articles/community/weekly-deep-dive-into-ai-and-ml-advancements-updates-issue-9': {
        toc: true,
        howTo: false,
        mediaObject: true,
        citations: true,
        internalLinks: [],
        conversion: { primary: "studio-builder", secondary: "events", version: "urgent-v1" },
    },
};

export const canonical = (path: string) => {
    return `https://mlai.au${path}`;
};
