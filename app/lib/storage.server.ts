// In-memory storage for Valley updates
// Note: This replaces fs-based storage because Cloudflare Workers runtime (even in dev) mocks fs.
// Data will be reset when the dev server restarts.

export interface Comment {
    id: string;
    userId: string;
    userName: string;
    content: string;
    createdAt: string;
}

export interface MonthlyUpdate {
    id: string;
    companyName: string;
    founderName: string;
    title: string;
    month: string;
    year: number;
    date: string;
    metrics: {
        revenue: string;
        growth: string;
        users: string;
    };
    highlights: string;
    challenges: string;
    asks: string;
    projectIntro?: string;
    industry?: string;
    stage?: string;
    likes: string[]; // Array of user emails who liked
    comments: Comment[];
}

// Initial Mock Data
const INITIAL_DATA: MonthlyUpdate[] = [
    {
        id: "mock-1",
        companyName: "TechFlow",
        founderName: "Sarah Chen",
        title: "December 2025 Update",
        month: "December",
        year: 2025,
        date: "2025-12-01T00:00:00.000Z",
        metrics: {
            revenue: "45,000",
            growth: "23%",
            users: "1,250"
        },
        highlights: "Reached product-market fit in the enterprise segment. Major partnership signed with Global Solutions Ltd.",
        challenges: "Hiring engineering talent is slower than expected.",
        asks: "Intros to senior react developers.",
        industry: "SaaS",
        stage: "Series A",
        likes: ["investor@example.com"],
        comments: [
            {
                id: "c1",
                userId: "investor@example.com",
                userName: "Investor Bob",
                content: "Great progress on the enterprise deal!",
                createdAt: "2025-12-02T10:00:00.000Z"
            }
        ]
    },
    {
        id: "mock-2",
        companyName: "MediCare AI",
        founderName: "James Wilson",
        title: "November 2025 Update",
        month: "November",
        year: 2025,
        date: "2025-11-28T00:00:00.000Z",
        metrics: {
            revenue: "12,000",
            growth: "15%",
            users: "450"
        },
        highlights: "Completed pilot with local hospital. Positive feedback on AI diagnostic accuracy.",
        challenges: "Regulatory approval process is taking longer than anticipated.",
        asks: "Advice on FDA compliance strategy.",
        industry: "HealthTech",
        stage: "Seed",
        likes: [],
        comments: []
    }
];

// Use globalThis to persist data across HMR (Hot Module Replacement)
declare global {
    var __VALLEY_UPDATES: MonthlyUpdate[] | undefined;
}

function getStore(): MonthlyUpdate[] {
    if (!globalThis.__VALLEY_UPDATES) {
        globalThis.__VALLEY_UPDATES = [...INITIAL_DATA];
    }

    // Schema Migration / Safety Check
    // If HMR preserved old data where likes/comments were numbers, fix it here.
    return globalThis.__VALLEY_UPDATES.map(u => {
        if (!Array.isArray(u.likes)) {
            console.log("Migrating legacy likes format...");
            u.likes = [];
        }
        if (!Array.isArray(u.comments)) {
            console.log("Migrating legacy comments format...");
            u.comments = [];
        }
        return u;
    });
}

export async function getUpdates(): Promise<MonthlyUpdate[]> {
    const store = getStore();
    console.log("[getUpdates] Returning", store.length, "updates. Companies:", store.map(u => u.companyName).join(", "));
    return store;
}

export async function saveUpdate(update: MonthlyUpdate): Promise<void> {
    const updates = getStore();
    console.log("[saveUpdate] Saving update:", update.companyName, update.id);
    console.log("[saveUpdate] Current store length:", updates.length);
    const index = updates.findIndex((u) => u.id === update.id);
    if (index >= 0) {
        updates[index] = update;
        console.log("[saveUpdate] Updated existing at index:", index);
    } else {
        updates.unshift(update);
        console.log("[saveUpdate] Added new. Store length now:", updates.length);
    }
}

export async function getUpdateById(id: string): Promise<MonthlyUpdate | undefined> {
    const updates = getStore();
    return updates.find((u) => u.id === id);
}

export async function toggleLike(updateId: string, userEmail: string): Promise<void> {
    const updates = getStore();
    const update = updates.find(u => u.id === updateId);
    if (!update) return;

    if (update.likes.includes(userEmail)) {
        update.likes = update.likes.filter(email => email !== userEmail);
    } else {
        update.likes.push(userEmail);
    }
}

export async function addComment(updateId: string, userEmail: string, userName: string, content: string): Promise<Comment | null> {
    const updates = getStore();
    const update = updates.find(u => u.id === updateId);
    if (!update) return null;

    const newComment: Comment = {
        id: Date.now().toString(),
        userId: userEmail,
        userName: userName,
        content,
        createdAt: new Date().toISOString()
    };

    update.comments.push(newComment);
    return newComment;
}

// ===== CONNECTION REQUEST SYSTEM =====

export interface ConnectionRequest {
    id: string;
    founderId: string; // email
    founderName: string;
    founderCompany: string;
    investorId: string; // email
    investorName: string;
    status: 'pending' | 'accepted' | 'rejected';
    message: string; // Intro message
    matchReason?: string; // "Why this match" text
    metrics?: {
        revenue: string;
        growth: string;
        users: string;
    };
    createdAt: string;
}

// Mock Investor Data
export interface Investor {
    id: string;
    name: string;
    email: string;
    firm: string;
    bio: string;
    focus: string[];
}

const MOCK_INVESTORS: Investor[] = [
    {
        id: "inv-1",
        name: "Michael Chen",
        email: "michael@alphavc.com",
        firm: "Alpha Ventures",
        bio: "Former founder turned investor. Passionate about B2B SaaS and fintech.",
        focus: ["B2B SaaS", "Fintech", "Enterprise"],
    },
    {
        id: "inv-2",
        name: "Sarah Williams",
        email: "sarah@betacapital.com",
        firm: "Beta Capital",
        bio: "15+ years in venture capital. Focus on early-stage deep tech and AI.",
        focus: ["AI/ML", "Deep Tech", "Robotics"],
    },
];

// Initial Connection Requests (Mock Data for UI)
const INITIAL_REQUESTS: ConnectionRequest[] = [
    {
        id: "req-1",
        founderId: "sarah@techflow.com",
        founderName: "Sarah Chen",
        founderCompany: "TechFlow",
        investorId: "investor@example.com", // Matches the default investor login
        investorName: "Current User",
        status: 'pending',
        message: "Hi, I think TechFlow aligns perfectly with your thesis.",
        matchReason: "Met your criteria: Pre-seed SaaS with >$10k MRR",
        metrics: {
            revenue: "$45,000 MRR",
            growth: "23% MoM",
            users: "1,250"
        },
        createdAt: "2026-01-10T10:00:00.000Z"
    },
    {
        id: "req-2",
        founderId: "alex@datasync.com",
        founderName: "Alex Rodriguez",
        founderCompany: "DataSync",
        investorId: "investor@example.com",
        investorName: "Current User",
        status: 'pending',
        message: "Building the next gen data sync engine.",
        matchReason: "Met your criteria: Pre-seed SaaS with >$10k MRR",
        metrics: {
            revenue: "$12,000 MRR",
            growth: "15% MoM",
            users: "450"
        },
        createdAt: "2026-01-11T14:30:00.000Z"
    }
];

// Connection Request Storage
declare global {
    var __VALLEY_CONNECTIONS: ConnectionRequest[] | undefined;
}

function getConnectionStore(): ConnectionRequest[] {
    if (!globalThis.__VALLEY_CONNECTIONS) {
        globalThis.__VALLEY_CONNECTIONS = [...INITIAL_REQUESTS];
    }
    return globalThis.__VALLEY_CONNECTIONS;
}

export async function getInvestors(): Promise<Investor[]> {
    return MOCK_INVESTORS;
}

export async function getConnectionRequests(userId: string, role: 'founder' | 'investor'): Promise<ConnectionRequest[]> {
    const connections = getConnectionStore();
    if (role === 'founder') {
        return connections.filter(c => c.founderId === userId);
    } else {
        // specific investor (by email) or generic investor for demo
        return connections.filter(c => c.investorId === userId || c.investorId === "investor@example.com");
    }
}

export async function sendConnectionRequest(
    founderId: string,
    founderName: string,
    founderCompany: string,
    investorId: string,
    investorName: string,
    message: string
): Promise<ConnectionRequest> {
    const connections = getConnectionStore();

    const existing = connections.find(
        c => c.founderId === founderId && c.investorId === investorId
    );
    if (existing) {
        throw new Error('Connection request already exists');
    }

    const newRequest: ConnectionRequest = {
        id: Date.now().toString(),
        founderId,
        founderName,
        founderCompany,
        investorId,
        investorName,
        status: 'pending',
        message,
        metrics: { // Mock metrics for new requests
            revenue: "$10k+ MRR",
            growth: "10%+",
            users: "100+"
        },
        matchReason: "Met your general investment criteria",
        createdAt: new Date().toISOString(),
    };

    connections.push(newRequest);
    return newRequest;
}

export async function updateConnectionStatus(
    requestId: string,
    status: 'accepted' | 'rejected'
): Promise<ConnectionRequest | null> {
    const connections = getConnectionStore();
    const request = connections.find(c => c.id === requestId);
    if (!request) return null;

    request.status = status;
    return request;
}

export async function getConnectionStatus(founderId: string, investorId: string): Promise<'none' | 'pending' | 'accepted' | 'rejected'> {
    const connections = getConnectionStore();
    const request = connections.find(
        c => c.founderId === founderId && c.investorId === investorId
    );
    return request ? request.status : 'none';
}

// Get a specific connection by ID
export async function getConnectionById(connectionId: string): Promise<ConnectionRequest | null> {
    const connections = getConnectionStore();
    return connections.find(c => c.id === connectionId) || null;
}

// ===== DIRECT MESSAGING SYSTEM =====

export interface DirectMessage {
    id: string;
    connectionId: string; // Links to the accepted connection
    senderId: string; // email of sender
    senderName: string;
    content: string;
    createdAt: string;
}

// Message Storage
declare global {
    var __VALLEY_MESSAGES: DirectMessage[] | undefined;
}

function getMessageStore(): DirectMessage[] {
    if (!globalThis.__VALLEY_MESSAGES) {
        globalThis.__VALLEY_MESSAGES = [];
    }
    return globalThis.__VALLEY_MESSAGES;
}

export async function getMessages(connectionId: string): Promise<DirectMessage[]> {
    const messages = getMessageStore();
    return messages
        .filter(m => m.connectionId === connectionId)
        .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
}

export async function sendMessage(
    connectionId: string,
    senderId: string,
    senderName: string,
    content: string
): Promise<DirectMessage> {
    const messages = getMessageStore();

    const newMessage: DirectMessage = {
        id: Date.now().toString(),
        connectionId,
        senderId,
        senderName,
        content,
        createdAt: new Date().toISOString(),
    };

    messages.push(newMessage);
    return newMessage;
}
