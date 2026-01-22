
export type SocialLink = { label: string; href: string };

export interface AuthorRegistryEntry {
    personId: string;
    name: string;
    url?: string;
    honorificPrefix?: string;
    credentials?: string;
    role?: string;
    bio?: string;
    affiliation?: {
        name: string;
        url: string;
    };
    sameAs?: SocialLink[];
    avatarUrl?: string;
    avatarAlt?: string;
    knowsAbout?: string[];
    registrationNumber?: string;
}

const authorRegistry = {
    samDonegan: {
        personId: 'https://www.mlai.au/#sam-donegan',
        name: 'Dr Sam Donegan',
        honorificPrefix: 'Dr',
        credentials: 'MD, BBioMed',
        role: 'Medical Doctor, AI Startup Founder & Lead Editor',
        bio: 'Sam leads the MLAI editorial team, combining deep research in machine learning with practical guidance for Australian teams adopting AI responsibly.',
        affiliation: {
            name: 'MLAI',
            url: 'https://www.mlai.au/',
        },
        sameAs: [
            { label: 'LinkedIn', href: 'https://www.linkedin.com/in/samueldonegan/' },
        ],
        avatarUrl: 'https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/1732146096971.jpeg?alt=media&token=8cbc3057-565b-48d0-be4f-e786332a6376',
        avatarAlt: 'Dr Sam Donegan',
    },
    junKaiChang: {
        personId: 'https://www.mlai.au/#jun-kai-chang',
        name: 'Jun Kai (Luc) Chang',
        role: 'AI Software Developer',
        bio: 'Luc is an AI Software Developer at Monash AIM, building neural networks on FPGA boards. He is pursuing a Master of AI at Monash and co-founding a startup in the event space.',
        affiliation: {
            name: 'Monash AIM',
            url: 'https://www.monash.edu/',
        },
        sameAs: [
            { label: 'LinkedIn', href: 'https://www.linkedin.com/in/jkchangjobs/' },
        ],
        avatarUrl: 'https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/1708509977925.jpeg?alt=media&token=57e9f02a-7209-4ff0-89d3-bd79e23cc8cb',
        avatarAlt: 'Jun Kai (Luc) Chang',
        knowsAbout: ['Neural Networks', 'FPGA', 'Verilog', 'Machine Learning'],
    },
    juliaPonder: {
        personId: 'https://www.mlai.au/#julia-ponder',
        name: 'Julia Ponder',
        role: 'Technical Writer',
        bio: 'Julia specialises in translating developer jargon into plain English. She creates clear, expertly formatted documentation and tests products before they go to market.',
        affiliation: {
            name: 'MLAI',
            url: 'https://www.mlai.au/',
        },
        sameAs: [
            { label: 'LinkedIn', href: 'https://www.linkedin.com/in/julia-ponder-australia/' },
        ],
        avatarUrl: 'https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/1702549233653.jpeg?alt=media&token=9ae8a7a5-58a0-4b3d-be4a-5699d2ca3a7c',
        avatarAlt: 'Julia Ponder',
        knowsAbout: ['Technical Writing', 'Documentation', 'Product Testing'],
    },
} satisfies Record<string, AuthorRegistryEntry>;

export type AuthorRegistryKey = keyof typeof authorRegistry;

export const DEFAULT_AUTHOR_KEY: AuthorRegistryKey = 'samDonegan';

export const DEFAULT_AUTHOR_AVATAR_FALLBACK_URL = 'https://placehold.co/400x400/png';

export function getAuthorProfile(key: AuthorRegistryKey): AuthorRegistryEntry {
    return authorRegistry[key];
}

export function getDefaultArticleAuthorDetails(): {
    name: string;
    role?: string;
    credentials?: string;
    bio?: string;
    avatarUrl?: string;
    avatarAlt?: string;
} {
    const author = getAuthorProfile(DEFAULT_AUTHOR_KEY);
    const fallbackName = 'Dr Sam Donegan';

    return {
        name: author?.name ?? fallbackName,
        role: author?.role,
        credentials: author?.credentials,
        bio: author?.bio,
        avatarUrl: author?.avatarUrl ?? DEFAULT_AUTHOR_AVATAR_FALLBACK_URL,
        avatarAlt: author?.avatarAlt ?? author?.name ?? fallbackName,
    };
}

export function listAuthors(): AuthorRegistryEntry[] {
    return Object.values(authorRegistry);
}
