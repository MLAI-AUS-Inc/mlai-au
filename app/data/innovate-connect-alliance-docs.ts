export interface InnovateConnectAllianceDocSection {
    id: string;
    title: string;
    description: string;
    bullets?: string[];
}

export const innovateConnectAllianceOverview = {
    eyebrow: "Innovate Connect Alliance",
    title: "Build a compelling team story and submit it as video.",
    summary:
        "Innovate Connect Alliance brings builders, founders, operators, and community leaders together to shape ambitious collaborative projects. Form a team, study the rules, and submit a polished walkthrough video that explains the problem, the solution, and why your team is the one to back.",
};

export const innovateConnectAllianceTimeline = [
    {
        label: "Registrations open",
        date: "Now",
        detail: "Create an account, complete your profile, and form your team.",
    },
    {
        label: "Team formation window",
        date: "Week 1",
        detail: "Create or join a team and align on the challenge you want to tackle.",
    },
    {
        label: "Working sessions",
        date: "Weeks 2-4",
        detail: "Refine the idea, test with users, and prepare your demo narrative.",
    },
    {
        label: "Video submission deadline",
        date: "Final week",
        detail: "Upload your final team video and supporting notes before the deadline.",
    },
];

export const innovateConnectAllianceSections: InnovateConnectAllianceDocSection[] = [
    {
        id: "overview",
        title: "What teams are expected to deliver",
        description:
            "Your team should present a clear problem statement, a believable solution, a working prototype or mockup, and a concise narrative showing why the idea matters.",
        bullets: [
            "Define the user and the pain point precisely.",
            "Show the current workflow or market gap.",
            "Demonstrate your prototype, mockup, or live product slice.",
            "Explain why your team can execute beyond the hackathon.",
        ],
    },
    {
        id: "rules",
        title: "Rules and eligibility",
        description:
            "Teams must have between 2 and 6 members to submit. Each participant may belong to one team within Innovate Connect Alliance. All work submitted must be your team’s own or clearly attributed.",
        bullets: [
            "One Innovate Connect Alliance team per participant.",
            "Teams need 2-6 members to make a valid submission.",
            "Respect IP, privacy, and any data-use restrictions in your challenge materials.",
            "Keep your video professional, clear, and easy for reviewers to follow.",
        ],
    },
    {
        id: "submission",
        title: "Video submission requirements",
        description:
            "Submissions are video-first. Upload a single video file through the app and add a short title plus optional notes that help reviewers understand context.",
        bullets: [
            "Upload a video file directly in the submissions page.",
            "Add a submission title that clearly names your concept.",
            "Use the notes field for setup instructions, links, or reviewer context.",
            "You may upload multiple versions over time; your latest upload is your current version.",
        ],
    },
    {
        id: "judging",
        title: "How reviewers should assess entries",
        description:
            "The review process is narrative-driven rather than leaderboard-driven. Reviewers should look for clarity, execution quality, originality, and practical impact.",
        bullets: [
            "Problem clarity and importance.",
            "Quality of the solution and supporting prototype.",
            "Communication quality in the submitted video.",
            "Execution credibility and next-step readiness.",
        ],
    },
];

export const innovateConnectAllianceFaq = [
    {
        question: "Can we submit more than one video?",
        answer:
            "Yes. Teams can upload multiple versions over time. The app keeps your submission history so you can track iterations.",
    },
    {
        question: "Do we need a fully working product?",
        answer:
            "No. A polished prototype, demo flow, or realistic mockup is acceptable if the idea and execution path are clear.",
    },
    {
        question: "Is there a public leaderboard?",
        answer:
            "No. Innovate Connect Alliance does not use a ranking leaderboard in v1.",
    },
    {
        question: "Where should we put supporting links?",
        answer:
            "Use the optional notes field in the submission form for links, setup notes, or context for reviewers.",
    },
];

export const innovateConnectAllianceContact = {
    email: "alliance@mlai.au",
    message:
        "Use this contact for rules clarifications, submission issues, and organizer questions.",
};
