import { expect, test } from "bun:test";
import type { ComponentProps } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { createMemoryRouter, RouterProvider } from "react-router";
import { normalizeCompany } from "../app/lib/vibe-raising";
import ManageCompanies from "../app/routes/vibe-raising-app.companies";

function renderCompany(fields: Record<string, unknown>) {
  const company = normalizeCompany({ id: "startup", name: "Startup", registered: true, ...fields });
  const props = {
    loaderData: { user: { companies: [company] }, activeCompanyId: company.id, activeCompanyHasUpdates: false },
  } as ComponentProps<typeof ManageCompanies>;
  const router = createMemoryRouter([{ path: "/", element: <ManageCompanies {...props} /> }]);
  try {
    return renderToStaticMarkup(<RouterProvider router={router} />);
  } finally {
    router.dispose();
  }
}

test("a verified sole trader sees the verified badge without an ACN", () => {
  const html = renderCompany({ registrationVerification: { verified: true }, acn: null });
  expect(html).toContain(">Verified<");
  expect(html).toContain(">ABN verified<");
});

test("a stored ACN and timestamp alone cannot give a company the verified badge", () => {
  for (const verified of [false, undefined, "false"]) {
    const html = renderCompany({
      acn: "123456789", abrVerifiedAt: "2026-01-15",
      registrationVerification: verified === undefined ? undefined : { verified },
    });
    expect(html).toContain(">Registered<");
    expect(html).not.toContain(">Verified<");
  }
});
