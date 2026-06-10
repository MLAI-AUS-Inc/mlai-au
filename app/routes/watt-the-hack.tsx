import type { Route } from "./+types/watt-the-hack";
import { Outlet, redirect, useLoaderData } from "react-router";
import GenericHackathonAppLayout from "~/components/GenericHackathonAppLayout";
import WattNotificationBell from "~/components/WattNotificationBell";
import { getCurrentUser } from "~/lib/auth";
import { getEnv } from "~/lib/env.server";
import { WATT_THE_HACK_SLUG } from "~/lib/generic-hackathon";
import { assertWattTheHackPublicAccessEnabled } from "~/lib/watt-the-hack-access";
import type { User } from "~/types/user";

const BASE_PATH = "/watt-the-hack";

export async function loader({ request, context }: Route.LoaderArgs) {
  assertWattTheHackPublicAccessEnabled();
  const env = getEnv(context);
  let user = null;
  try {
    user = await getCurrentUser(env, request);
  } catch (error) {
    console.warn("Treating Watt The Hack auth lookup failure as logged out.", error);
  }
  if (!user) {
    const pathname = new URL(request.url).pathname;
    const next = pathname === BASE_PATH ? `${BASE_PATH}/dashboard` : pathname;
    throw redirect(`/platform/login?app=${WATT_THE_HACK_SLUG}&next=${encodeURIComponent(next)}`);
  }
  return { user: user as User };
}

export default function WattTheHackApp() {
  const { user } = useLoaderData<typeof loader>();

  return (
    <GenericHackathonAppLayout
      user={user}
      config={{
        name: "Watt The Hack",
        slug: WATT_THE_HACK_SLUG,
        basePath: BASE_PATH,
        theme: "watt",
      }}
      headerAccessory={<WattNotificationBell basePath={BASE_PATH} />}
    >
      <Outlet />
    </GenericHackathonAppLayout>
  );
}
