import type { User, UserNavigationItem } from "~/types/user";

export const ADMIN_WORKSPACE_LABEL = "Project workspace";
export const ADMIN_WORKSPACE_ORIGIN = "https://admin.mlai.au";

const FOUNDER_USER_NAVIGATION: UserNavigationItem[] = [
  { name: "My companies", href: "/founder-tools/companies" },
];

export function resolveAdminWorkspaceUrl(configuredUrl: unknown): string | null {
  if (typeof configuredUrl !== "string") return null;

  const value = configuredUrl.trim();
  if (!value) return null;

  try {
    const url = new URL(value);
    if (
      url.origin !== ADMIN_WORKSPACE_ORIGIN ||
      url.pathname !== "/" ||
      url.search ||
      url.hash ||
      url.username ||
      url.password
    ) {
      return null;
    }
    return ADMIN_WORKSPACE_ORIGIN;
  } catch {
    return null;
  }
}

export function getFounderUserNavigation(
  user: Pick<User, "is_vibe_raising_admin">,
  configuredUrl: unknown,
): UserNavigationItem[] {
  const adminWorkspaceUrl = resolveAdminWorkspaceUrl(configuredUrl);
  if (!user.is_vibe_raising_admin || !adminWorkspaceUrl) {
    return FOUNDER_USER_NAVIGATION;
  }

  return [
    ...FOUNDER_USER_NAVIGATION,
    {
      name: ADMIN_WORKSPACE_LABEL,
      href: adminWorkspaceUrl,
      external: true,
    },
  ];
}
