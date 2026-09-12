import { describe, expect, it } from "bun:test";
import { renderToStaticMarkup } from "react-dom/server";
import { createMemoryRouter, RouterProvider } from "react-router";
import VibeRaisingApp from "../app/routes/vibe-raising-app";
import Updates from "../app/routes/vibe-raising-app._index";
import CreateUpdate from "../app/routes/vibe-raising-app.create-update";

const authUser = { id: 1, full_name: "Founder", email: "founder@example.test" };
const company = { id: "startup-1", name: "MLAI", domain: "mlai.au", registered: true };
const user = { authUser, role: "founder", fullName: "Founder", companies: [company], activeCompanyId: company.id, companyName: company.name, domain: company.domain, founderProfiles: [] };
const update = { id: "1", month: "September", isoMonth: "2026-09-01", year: 2026, date: "2026-09-11", summary: "This month's progress", highlights: "Delivered a programme", challenges: "Terms still being finalised", learnings: "Smaller groups helped", asks: "", next30Days: "", metrics: {}, revisionId: 1, revisionHash: "fixture", audienceVisibility: ["just_me"] };

function renderPage(path: string) {
  const router = createMemoryRouter([{
    id: "founder-tools-root", path: "/founder-tools", Component: VibeRaisingApp,
    children: [
      { id: "updates", path: "updates", Component: Updates },
      { id: "create", path: "updates/create", Component: CreateUpdate },
    ],
  }], {
    initialEntries: [path],
    hydrationData: { loaderData: {
      "founder-tools-root": { user: authUser, appUser: user, backendBaseUrl: "https://backend.example", rooPointsBalance: null },
      updates: { user, updates: [update], financialSeries: null },
      create: { user, existingData: update, existingMonthlyUpdates: [update], isEdit: true, backendBaseUrl: "https://backend.example", resumeEmailDrafting: false, selectedInputSources: [], draftReturnState: null, metricDefinitions: [] },
    } },
  });
  try { return renderToStaticMarkup(<RouterProvider router={router} />); }
  finally { router.dispose(); }
}

describe("updates remain inside the existing Vibe Raising application", () => {
  it("renders the updates screen with the real sidebar and company selector", () => {
    const html = renderPage("/founder-tools/updates");
    expect(html).toContain("MLAI Updates");
    expect(html).toContain('title="Active company: MLAI"');
    expect(html).toContain("Vibe Raising");
    expect(html).toContain('href="/founder-tools/updates/create"');
    expect(html).toContain('href="/founder-tools/data-sources"');
    expect(html).toContain("See all updates");
  });

  it("keeps the optional cover in the existing draft form and three-step workflow", () => {
    const html = renderPage("/founder-tools/updates/create?edit=1");
    expect(html).toContain('title="Active company: MLAI"');
    expect(html).toContain('aria-label="Update progress"');
    for (const label of ["Draft", "A head start with AI", "Review", "Send", "Cover image", "Create me an image"]) expect(html).toContain(label);
    expect(html).toContain('name="companyId" value="startup-1"');
    expect(html).toContain('name="coverImage" value="null"');
    expect(html).toContain('name="expectedRevision" value="1"');
    expect(html).not.toContain("A little personality");
  });
});
