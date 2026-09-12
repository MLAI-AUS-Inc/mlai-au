import { renderToStaticMarkup } from "react-dom/server";
import { createMemoryRouter, RouterProvider } from "react-router";
import CreateUpdate from "../../app/routes/vibe-raising-app.create-update";

export function renderUpdateEditor(
  overrides: Record<string, any> = {},
  review = false,
  options: Record<string, any> = {},
) {
  const update = {
    id: "42",
    month: "August",
    year: 2026,
    date: "2026-09-01",
    revisionId: 12,
    revisionHash: "saved-hash",
    companyId: "test-company",
    metrics: {},
    audienceVisibility: ["just_me"],
    ...overrides,
  };
  const router = createMemoryRouter(
    [{ id: "update", path: "/create", Component: CreateUpdate }],
    {
      initialEntries: ["/create?edit=42"],
      hydrationData: {
        loaderData: {
          update: {
            metricDefinitions: [],
            user: {
              authUser: { id: 1 },
              activeCompanyId: "test-company",
              companies: [{ id: "test-company", name: "MLAI" }],
              companyName: "MLAI",
              companyRegistered: true,
            },
            existingData: update,
            isEdit: true,
            backendBaseUrl: "http://127.0.0.1:8000",
            resumeEmailDrafting: false,
            selectedInputSources: [],
            draftReturnState: null,
            existingMonthlyUpdates: [update],
            ...options,
          },
        },
        ...(review
          ? {
              actionData: {
                update: { step: "feedback", data: update, update },
              },
            }
          : {}),
      },
    },
  );
  try {
    return renderToStaticMarkup(<RouterProvider router={router} />);
  } finally {
    router.dispose();
  }
}
