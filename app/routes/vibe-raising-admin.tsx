import type { Route } from "./+types/vibe-raising-admin";
import { Outlet, useLoaderData } from "react-router";
import VibeRaisingAdminLayout from "~/components/vibe-raising/VibeRaisingAdminLayout";
import { getEnv } from "~/lib/env.server";
import {
  getVibeRaisingAdminOverview,
  requireVibeRaisingAdmin,
} from "~/lib/vibe-raising";

export const meta: Route.MetaFunction = () => [
  { title: "Vibe Raising Admin | MLAI" },
  { name: "robots", content: "noindex, nofollow" },
];

export async function loader({ request, context }: Route.LoaderArgs) {
  const env = getEnv(context);
  const { authUser } = await requireVibeRaisingAdmin(env, request);
  const overview = await getVibeRaisingAdminOverview(env, request);

  return {
    user: authUser,
    overview,
    reviewCount: overview.reviewCount,
  };
}

export default function VibeRaisingAdminRoot() {
  const { user, reviewCount } = useLoaderData<typeof loader>();

  return (
    <VibeRaisingAdminLayout user={user} reviewCount={reviewCount}>
      <Outlet />
    </VibeRaisingAdminLayout>
  );
}