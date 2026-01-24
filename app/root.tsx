import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLocation,
} from "react-router";
import Footer from "~/components/footer";

import type { Route } from "./+types/root";
import "./app.css";
import SectionMarkers from "./components/SectionMarkers";
import Sidebar from "./components/sidebar";

export const links: Route.LinksFunction = () => [
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
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Anton&family=Oswald:wght@200..700&family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap",
  },
];

export default function Layout() {
  const location = useLocation();

  // Check if we're in the eSafety app routes or AI Hospital app routes
  /* Check if we're in the eSafety app, Hospital app, or Valley app routes */
  const isEsafetyApp = location.pathname.startsWith('/esafety');
  const isHospitalApp = location.pathname.startsWith('/hospital/app');
  const isValleyApp = location.pathname.startsWith('/valley');
  const isAppRoute = isEsafetyApp || isHospitalApp || isValleyApp;

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        {/* Basic meta tags */}
        <title>MLAI</title>
        <meta
          name="description"
          content="MLAI is a not-for-profit community based in Australia that aims to empower the Australian AI Community"
        />
        <meta name="application-name" content="MLAI-website" />
        <meta name="referrer" content="origin-when-cross-origin" />
        <meta
          name="keywords"
          content="Machine Learning, Artificial Intelligence, AI, Australia"
        />

        {/* Author meta tags */}
        <meta name="author" content="Dr Sam Donegan" />
        <meta name="author" content="Dr Lukas Wesemann" />

        {/* Open Graph meta tags */}
        <meta property="og:title" content="MLAI" />
        <meta
          property="og:description"
          content="MLAI is a not-for-profit community based in Australia that aims to empower the Australian AI Community"
        />
        <meta property="og:url" content="https://mlai.au" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://www.mlai.au/MLAI-Logo.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta
          property="og:image:alt"
          content="MLAI Logo, a Kangaroo wearing sunglasses"
        />

        {/* Robots meta tag */}
        <meta name="robots" content="index, follow" />

        <Meta />
        <Links />


      </head>
      <body>
        <noscript>
          <img
            alt=""
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=925764322445149&ev=PageView&noscript=1"
          />
        </noscript>
        {/* Only show platform-wide components if NOT in specific apps */}
        {!isAppRoute && <Sidebar />}
        {!isAppRoute && <SectionMarkers />}
        <div className={isAppRoute ? '' : 'lg:pl-[220px] bg-[var(--brutalist-beige)]'}>
          <Outlet />
        </div>
        {!isAppRoute && <Footer />}
        <ScrollRestoration />

        {/* Google Analytics */}
        <script
          async
          defer
          src={`https://www.googletagmanager.com/gtag/js?id=G-JB8E813T8W}`}
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
            gtag('config', 'G-JB8E813T8W');
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

        {/* Ahrefs Analytics */}
        <script src="https://analytics.ahrefs.com/analytics.js" data-key="gpWL4pKb2ZPfqFtu60natQ" async></script>
        <Scripts />
      </body>
    </html>
  );
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
