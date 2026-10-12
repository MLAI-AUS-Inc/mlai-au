// Separate process keeps authentication/service mocks out of other test suites.
import { mock } from "bun:test";
let user: { email: string; full_name: string; is_superuser: boolean } | null = null;
let authFailure = false;
let contentReads = 0;
mock.module("../../app/lib/auth", () => ({
  getCurrentUser: async () => {
    if (authFailure) throw new Error("Fixture authentication unavailable");
    return user;
  },
  getHospitalRecentSubmissions: async () => { contentReads++; return []; },
}));
mock.module("../../app/services/hackathon", () => ({
  getAnnouncements: async () => { contentReads++; return []; },
  getChannelMessages: async () => { contentReads++; return { messages: [], next_cursor: null }; },
}));
const parent = await import("../../app/routes/hospital.app");
const dashboard = await import("../../app/routes/hospital.app.dashboard");
const alias = await import("../../app/routes/hospital.app.dashboard-redirect");
const args = { request: new Request("https://mlai.au/hospital/app"), context: { cloudflare: { env: {} } } } as any;
const anonymous = [];
for (const route of [parent, dashboard]) {
  contentReads = 0;
  const response = await route.loader(args);
  if (!(response instanceof Response)) throw new Error("Anonymous application data leaked");
  anonymous.push({ status: response.status, location: response.headers.get("Location"), contentReads });
}
user = { email: "ordinary-fixture@example.test", full_name: "Ordinary fixture", is_superuser: false };
contentReads = 0;
const closedResponse = await parent.loader(args);
if (!(closedResponse instanceof Response)) throw new Error("Closed event access was relaxed");
const closed = { status: closedResponse.status, location: closedResponse.headers.get("Location"), contentReads };
user = { email: "private-fixture@example.test", full_name: "Authenticated fixture", is_superuser: true };
const authenticated = [];
for (const route of [parent, dashboard]) {
  const data = await route.loader(args);
  if (data instanceof Response) throw new Error("Authenticated user was incorrectly redirected");
  authenticated.push({ user: data.user, meta: route.meta({} as any) });
}
authFailure = true;
let authenticationFailurePropagated = false;
try { await parent.loader(args); } catch { authenticationFailurePropagated = true; }
console.log(JSON.stringify({ anonymous, authenticated, closed, authenticationFailurePropagated, alias: alias.loader().headers.get("Location") }));
