import type { AppLoadContext, EntryContext } from "react-router";
import { ServerRouter } from "react-router";
import { isbot } from "isbot";
import { renderToReadableStream } from "react-dom/server";

declare const __MLAI_BUILD_REVISION__: string;

export default async function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  routerContext: EntryContext,
  _loadContext: AppLoadContext
) {
  let shellRendered = false;
  const userAgent = request.headers.get("user-agent");
  const pathname = new URL(request.url).pathname.replace(/\/+$/, "") || "/";
  const readerDocument = pathname === "/articles" || pathname.startsWith("/articles/") || pathname === "/events";
  const completeDocument = readerDocument || Boolean(userAgent && isbot(userAgent)) || routerContext.isSpaMode;

  const body = await renderToReadableStream(
    <ServerRouter context={routerContext} url={request.url} />,
    {
      signal: request.signal,
      // allReady alone is insufficient: React 19 can outline a *completed*
      // large Suspense boundary into a hidden container above its chunk budget.
      // Complete documents must keep long-form content inline without scripts.
      // This changes chunking, not payload limits or caching. Other app requests
      // retain React's default progressive budget and early shell response.
      progressiveChunkSize: completeDocument ? Number.MAX_SAFE_INTEGER : undefined,
      onError(error: unknown) {
        responseStatusCode = 500;
        // Log streaming rendering errors from inside the shell.  Don't log
        // errors encountered during initial shell rendering since they'll
        // reject and get logged in handleDocumentRequest.
        if (shellRendered) {
          console.error(error);
        }
      },
    }
  );
  shellRendered = true;

  // Ensure requests from bots and SPA Mode renders wait for all content to load before responding
  // https://react.dev/reference/react-dom/server/renderToPipeableStream#waiting-for-all-content-to-load-for-crawlers-and-static-generation
  if (completeDocument) {
    await body.allReady;
  }

  responseHeaders.set("Content-Type", "text/html");
  responseHeaders.set("X-MLAI-Document-Render", completeDocument ? "complete" : "streaming");
  responseHeaders.set("X-MLAI-Revision", typeof __MLAI_BUILD_REVISION__ === "string" ? __MLAI_BUILD_REVISION__ : "local");
  return new Response(body, {
    headers: responseHeaders,
    status: responseStatusCode,
  });
}
