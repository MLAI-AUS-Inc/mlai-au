import { redirect } from "react-router";
import type { Route } from "./+types/article-link-cleanups";
import { PERMANENT_PATH_REDIRECTS } from "~/lib/url-normalization";

export function loader({ request }: Route.LoaderArgs) {
  const url = new URL(request.url);
  const target = PERMANENT_PATH_REDIRECTS[url.pathname];

  if (!target) {
    throw new Response("Not Found", { status: 404 });
  }

  return redirect(`${target}${url.search}`, 301);
}

export default function ArticleLinkCleanupsRoute() {
  return null;
}
