const INITIAL_DATA = [
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
function getStore() {
  if (!globalThis.__VALLEY_UPDATES) {
    globalThis.__VALLEY_UPDATES = [...INITIAL_DATA];
  }
  return globalThis.__VALLEY_UPDATES.map((u) => {
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
async function getUpdates() {
  const store = getStore();
  console.log("[getUpdates] Returning", store.length, "updates. Companies:", store.map((u) => u.companyName).join(", "));
  return store;
}
async function saveUpdate(update) {
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
async function getUpdateById(id) {
  const updates = getStore();
  return updates.find((u) => u.id === id);
}
async function toggleLike(updateId, userEmail) {
  const updates = getStore();
  const update = updates.find((u) => u.id === updateId);
  if (!update) return;
  if (update.likes.includes(userEmail)) {
    update.likes = update.likes.filter((email) => email !== userEmail);
  } else {
    update.likes.push(userEmail);
  }
}
async function addComment(updateId, userEmail, userName, content) {
  const updates = getStore();
  const update = updates.find((u) => u.id === updateId);
  if (!update) return null;
  const newComment = {
    id: Date.now().toString(),
    userId: userEmail,
    userName,
    content,
    createdAt: (/* @__PURE__ */ new Date()).toISOString()
  };
  update.comments.push(newComment);
  return newComment;
}
const MOCK_INVESTORS = [
  {
    id: "inv-1",
    name: "Michael Chen",
    email: "michael@alphavc.com",
    firm: "Alpha Ventures",
    bio: "Former founder turned investor. Passionate about B2B SaaS and fintech.",
    focus: ["B2B SaaS", "Fintech", "Enterprise"]
  },
  {
    id: "inv-2",
    name: "Sarah Williams",
    email: "sarah@betacapital.com",
    firm: "Beta Capital",
    bio: "15+ years in venture capital. Focus on early-stage deep tech and AI.",
    focus: ["AI/ML", "Deep Tech", "Robotics"]
  }
];
const INITIAL_REQUESTS = [
  {
    id: "req-1",
    founderId: "sarah@techflow.com",
    founderName: "Sarah Chen",
    founderCompany: "TechFlow",
    investorId: "investor@example.com",
    // Matches the default investor login
    investorName: "Current User",
    status: "pending",
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
    status: "pending",
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
function getConnectionStore() {
  if (!globalThis.__VALLEY_CONNECTIONS) {
    globalThis.__VALLEY_CONNECTIONS = [...INITIAL_REQUESTS];
  }
  return globalThis.__VALLEY_CONNECTIONS;
}
async function getInvestors() {
  return MOCK_INVESTORS;
}
async function getConnectionRequests(userId, role) {
  const connections = getConnectionStore();
  if (role === "founder") {
    return connections.filter((c) => c.founderId === userId);
  } else {
    return connections.filter((c) => c.investorId === userId || c.investorId === "investor@example.com");
  }
}
async function sendConnectionRequest(founderId, founderName, founderCompany, investorId, investorName, message) {
  const connections = getConnectionStore();
  const existing = connections.find(
    (c) => c.founderId === founderId && c.investorId === investorId
  );
  if (existing) {
    throw new Error("Connection request already exists");
  }
  const newRequest = {
    id: Date.now().toString(),
    founderId,
    founderName,
    founderCompany,
    investorId,
    investorName,
    status: "pending",
    message,
    metrics: {
      // Mock metrics for new requests
      revenue: "$10k+ MRR",
      growth: "10%+",
      users: "100+"
    },
    matchReason: "Met your general investment criteria",
    createdAt: (/* @__PURE__ */ new Date()).toISOString()
  };
  connections.push(newRequest);
  return newRequest;
}
async function updateConnectionStatus(requestId, status) {
  const connections = getConnectionStore();
  const request = connections.find((c) => c.id === requestId);
  if (!request) return null;
  request.status = status;
  return request;
}
async function getConnectionStatus(founderId, investorId) {
  const connections = getConnectionStore();
  const request = connections.find(
    (c) => c.founderId === founderId && c.investorId === investorId
  );
  return request ? request.status : "none";
}
async function getConnectionById(connectionId) {
  const connections = getConnectionStore();
  return connections.find((c) => c.id === connectionId) || null;
}
function getMessageStore() {
  if (!globalThis.__VALLEY_MESSAGES) {
    globalThis.__VALLEY_MESSAGES = [];
  }
  return globalThis.__VALLEY_MESSAGES;
}
async function getMessages(connectionId) {
  const messages = getMessageStore();
  return messages.filter((m) => m.connectionId === connectionId).sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
}
async function sendMessage(connectionId, senderId, senderName, content) {
  const messages = getMessageStore();
  const newMessage = {
    id: Date.now().toString(),
    connectionId,
    senderId,
    senderName,
    content,
    createdAt: (/* @__PURE__ */ new Date()).toISOString()
  };
  messages.push(newMessage);
  return newMessage;
}
export {
  addComment,
  getConnectionById,
  getConnectionRequests,
  getConnectionStatus,
  getInvestors,
  getMessages,
  getUpdateById,
  getUpdates,
  saveUpdate,
  sendConnectionRequest,
  sendMessage,
  toggleLike,
  updateConnectionStatus
};
