import {
  isRouteErrorResponse,
  Links,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLocation,
  useRevalidator,
} from "react-router";
import { useEffect, useRef, type ReactNode } from "react";
import Footer from "~/components/footer";

import type { Route } from "./+types/root";
import "./app.css";
import SectionMarkers from "./components/SectionMarkers";
import Sidebar from "./components/sidebar";
import { DocumentMeta } from "~/lib/document-metadata";

// Stable reviewed integration identity; CI binds it to the exact tested commit.
const MLAI_ARTICLES_ARTIFACT_DIGEST = "92f0f9158c4777eecafc06d068bf5764dbcaa8df5852ed78f9054a8e083f7ef9";

const GA_MEASUREMENT_ID = "G-1645KKLT8B";
const CLARITY_TAG_ID = "wwfzm7293o";

export const meta: Route.MetaFunction = () => [
  { title: "MLAI" },
  {
    name: "description",
    content:
      "MLAI is a not-for-profit community based in Australia that aims to empower the Australian AI Community",
  },
  {
    name: "keywords",
    content: "Machine Learning, Artificial Intelligence, AI, Australia",
  },
];

export const links: Route.LinksFunction = () => [
  { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
  { rel: "shortcut icon", href: "/favicon.ico" },
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
  {
    // JetBrains Mono — used by the Watt The Hack Monaco editor and any
    // `font-mono` utility in the sandbox.  Matches the dev frontend's
    // next/font/google JetBrains_Mono import.
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=JetBrains+Mono:ital,wght@0,100..800;1,100..800&display=swap",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Anton&family=Oswald:wght@200..700&family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap",
  },
  {
    // Roboto — used by the Vibe Raising user flow body/subheading text.
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;600;700;800;900&display=swap",
  },
];

export function Layout({ children }: { children: ReactNode }) {
  const location = useLocation();
  const shouldLoadThirdPartyAnalytics = import.meta.env.PROD && location.pathname !== "/roo/topup";
  const pagePath = `${location.pathname}${location.search}`;

  useEffect(() => {
    if (!shouldLoadThirdPartyAnalytics) return;

    const gtag = (window as typeof window & { gtag?: (...args: unknown[]) => void }).gtag;
    if (!gtag) return;

    gtag("event", "page_view", {
      page_path: pagePath,
      page_location: `${window.location.origin}${pagePath}`,
      page_title: document.title,
    });
  }, [pagePath, shouldLoadThirdPartyAnalytics]);

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        {/* Basic meta tags */}
        <meta name="application-name" content="MLAI-website" />
        <meta name="referrer" content="origin-when-cross-origin" />
        {/^\/articles(?:\/|$)/.test(location.pathname) ? (
          <meta name="mlai-artifact-digest" content={MLAI_ARTICLES_ARTIFACT_DIGEST} />
        ) : null}

        <DocumentMeta />
        <Links />

        {shouldLoadThirdPartyAnalytics ? (
          <script
            src="https://analytics.ahrefs.com/analytics.js"
            data-key="R27fA2BeFrzb0BXu5adbpQ"
            async
          ></script>
        ) : null}
      </head>
      <body>
        {shouldLoadThirdPartyAnalytics ? (
          <noscript>
            <img
              alt=""
              height="1"
              width="1"
              style={{ display: "none" }}
              src="https://www.facebook.com/tr?id=925764322445149&ev=PageView&noscript=1"
            />
          </noscript>
        ) : null}
        <Sidebar />
        <SectionMarkers />
        <div className="lg:pl-[220px] bg-[var(--brutalist-beige)]">
          {children}
        </div>
        <Footer />
        <ScrollRestoration />

        {shouldLoadThirdPartyAnalytics ? (
          <>
            {/* Google Analytics */}
            <script
              async
              defer
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
            />
            <script
              id="google-analytics"
              async
              suppressHydrationWarning={true}
              dangerouslySetInnerHTML={{
                __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_MEASUREMENT_ID}', { send_page_view: false });
            `,
              }}
            />

            {/* Microsoft Clarity */}
            <script
              id="microsoft-clarity"
              dangerouslySetInnerHTML={{
                __html: `
              (function(c,l,a,r,i,t,y){
                  c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                  t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                  y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
              })(window, document, "clarity", "script", "${CLARITY_TAG_ID}");
            `,
              }}
            />

            {/* Meta Pixel Code */}
            <script
              id="meta-pixel"
              async
              defer
              dangerouslySetInnerHTML={{
                __html: `
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '925764322445149');
            fbq('track', 'PageView');
            `,
              }}
            />
          </>
        ) : null}
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  const { pathname } = useLocation();
  const { revalidate } = useRevalidator();
  const firstDocument = useRef(true);
  useEffect(() => {
    if (!firstDocument.current) return;
    firstDocument.current = false;
    // Built HTML is immediately readable. Refresh the events, newsletter and
    // article reading date from their public loaders after the first paint.
    if (pathname === "/" || pathname === "/events" || pathname.startsWith("/articles/")) {
      void revalidate();
    }
  }, [pathname, revalidate]);
  return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
