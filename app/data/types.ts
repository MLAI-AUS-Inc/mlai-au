
export interface ClinicianProfile {
    name: string;
    slug: string;
    discipline: string;
    inPerson?: string;
    state_region?: string;
}

export interface FeaturedPersonProfile {
    name: string;
    role?: string;
    bio?: string;
    avatarUrl?: string;
    slug?: string;
}
