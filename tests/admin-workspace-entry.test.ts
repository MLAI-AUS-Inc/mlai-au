import { describe, expect, test } from "bun:test";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";

import { UserNavigationLink } from "../app/components/AuthenticatedLayout";
import {
  ADMIN_WORKSPACE_LABEL,
  ADMIN_WORKSPACE_ORIGIN,
  getFounderUserNavigation,
  resolveAdminWorkspaceUrl,
} from "../app/lib/admin-workspace";

const ADMIN_WORKSPACE_URL = ADMIN_WORKSPACE_ORIGIN;

describe("Plane admin workspace entry", () => {
  test("configures the same HTTPS workspace URL for local and deployed builds", async () => {
    const devVars = await Bun.file(".dev.vars.example").text();
    const wranglerConfig = await Bun.file("wrangler.jsonc").text();
    const founderToolsRoute = await Bun.file("app/routes/vibe-raising-app.tsx").text();

    expect(devVars).toContain(`VITE_ADMIN_WORKSPACE_URL=${ADMIN_WORKSPACE_URL}`);
    expect(wranglerConfig).toContain(`"VITE_ADMIN_WORKSPACE_URL": "${ADMIN_WORKSPACE_URL}"`);
    expect(founderToolsRoute).toContain("env.VITE_ADMIN_WORKSPACE_URL");
    expect(founderToolsRoute).toContain("getFounderUserNavigation(user, adminWorkspaceUrl)");
    expect(resolveAdminWorkspaceUrl(ADMIN_WORKSPACE_URL)).toBe(ADMIN_WORKSPACE_URL);
    expect(resolveAdminWorkspaceUrl(`${ADMIN_WORKSPACE_URL}/`)).toBe(ADMIN_WORKSPACE_URL);
    for (const unsafeUrl of [
      "http://admin.mlai.au",
      "https://evil.example",
      "https://admin.mlai.au/projects",
      "https://admin.mlai.au?next=https://evil.example",
      "https://admin.mlai.au/#workspace",
      "https://user:password@admin.mlai.au",
    ]) {
      expect(resolveAdminWorkspaceUrl(unsafeUrl)).toBeNull();
    }
  });

  test("shows Project workspace only for the explicit backend admin entitlement", () => {
    const adminNavigation = getFounderUserNavigation(
      { is_vibe_raising_admin: true },
      ADMIN_WORKSPACE_URL,
    );
    const memberNavigation = getFounderUserNavigation(
      { is_vibe_raising_admin: false },
      ADMIN_WORKSPACE_URL,
    );

    expect(adminNavigation).toContainEqual({
      name: ADMIN_WORKSPACE_LABEL,
      href: ADMIN_WORKSPACE_URL,
      external: true,
    });
    expect(memberNavigation.some((item) => item.name === ADMIN_WORKSPACE_LABEL)).toBe(false);
    expect(getFounderUserNavigation({ is_vibe_raising_admin: true }, "javascript:alert(1)"))
      .toEqual(memberNavigation);
  });

  test("renders the workspace destination as a normal top-level anchor", () => {
    const workspaceItem = getFounderUserNavigation(
      { is_vibe_raising_admin: true },
      ADMIN_WORKSPACE_URL,
    ).find((item) => item.name === ADMIN_WORKSPACE_LABEL);

    expect(workspaceItem).toBeDefined();

    const markup = renderToStaticMarkup(
      createElement(UserNavigationLink, {
        item: workspaceItem!,
        className: "account-menu-item",
      }),
    );

    expect(markup).toBe(
      `<a href="${ADMIN_WORKSPACE_URL}" class="account-menu-item">${ADMIN_WORKSPACE_LABEL}</a>`,
    );
    expect(markup).not.toContain("target=");
  });

  test("does not register an internal Plane or admin route", async () => {
    const routes = await Bun.file("app/routes.ts").text();

    expect(routes).not.toContain("admin.mlai.au");
    expect(routes).not.toMatch(/route\(\s*["']\/admin(?:[\/"'])/);
    expect(routes).not.toMatch(/route\(\s*["']\/project-workspace(?:[\/"'])/);
  });
});
