import { redirect, useLoaderData, useNavigate, useOutletContext } from "react-router";
import type { Route } from "./+types/vibe-raising-app.overview";
import VibeRaisingFounderOverview from "~/components/VibeRaisingFounderOverview";
import { getEnv } from "~/lib/env.server";
import {
  getOptionalVibeRaisingContext,
  getVibeRaisingLoginHref,
} from "~/lib/vibe-raising";

export async function loader({ request, context }: Route.LoaderArgs) {
  const env = getEnv(context);
  const vibeContext = await getOptionalVibeRaisingContext(env, request);

  if (!vibeContext.authUser) {
    throw redirect(getVibeRaisingLoginHref(request));
  }

  return {
    appUser: vibeContext.appUser,
  };
}

export default function VibeRaisingOverviewRoute() {
  const data = useLoaderData<typeof loader>();
  const navigate = useNavigate();
  const { triggerAnnouncement } = useOutletContext<{
    triggerAnnouncement: (cb?: () => void) => void;
  }>();

  if (!data?.appUser) {
    return null;
  }

  const firstName = data.appUser.fullName.split(" ")[0] || data.appUser.fullName;

  return (
    <VibeRaisingFounderOverview
      firstName={firstName}
      onCreateFirstUpdate={() =>
        triggerAnnouncement(() => navigate("/founder-tools/updates/create"))
      }
    />
  );
}
