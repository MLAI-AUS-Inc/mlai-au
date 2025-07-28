import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/sidebar";
import Footer from "@/components/footer";
import FloatingSocials from "@/components/floating-socials";
import StickySlackButton from "@/components/sticky-slack-button";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL('https://www.mlai.au'),
  title: "MLAI",
  description: "MLAI is a not-for-profit community based in Australia that aims to empower the Australian AI Community",
  generator: 'Next.js',
  applicationName: 'MLAI-website',
  referrer: 'origin-when-cross-origin',
  keywords: ['Machine Learning', 'Artificial Intelligence', 'AI', 'Australia'],
  authors: [
    {
      name: 'Dr Sam Donegan',
      url: 'https://www.linkedin.com/in/samueldonegan/',
    },
    {
      name: 'Dr Lukas Wesemann',
      url: 'https://www.linkedin.com/in/lukaswesemann/',
    },
  ],
  openGraph: {
    title: 'MLAI',
    description: 'MLAI is a not-for-profit community based in Australia that aims to empower the Australian AI Community',
    url: 'https://mlai.au',
    type: 'website',
    images: [
      {
        url: 'https://www.mlai.au/MLAI-Logo.png',
        width: 1200,
        height: 630,
        alt: 'MLAI Logo, a Kangaroo wearing sunglasses',
      },
    ],
  },
  robots: {
    index: true, // Allow indexing of the page by search engines
    follow: false, // Do not follow the links on the page to discourage scrapers
    noarchive: true,
    nosnippet: true,
    noimageindex: true,
    nocache: true,
  },
};

export default function RootLayout({

  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=G-JB8E813T8W}`}
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
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
      <Script
        id="meta-pixel"
        strategy="afterInteractive"
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
      <body className={inter.className}>
        <noscript>
          <img alt='' height="1" width="1" style={{ display: 'none' }}
            src="https://www.facebook.com/tr?id=925764322445149&ev=PageView&noscript=1"
          />
        </noscript>
        <StickySlackButton />
        <Sidebar />
        <FloatingSocials />
        <div className="lg:pl-20">
          {children}
          <Footer></Footer>
        </div>
      </body>
    </html >
  );
}
