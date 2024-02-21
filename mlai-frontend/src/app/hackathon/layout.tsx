import { Metadata } from "next";
import Layout from "./components/Layout"

export const metadata: Metadata = {
  metadataBase: new URL("https://mlai.au/hackathon"), 
  title: "MLAI Green Battery Hack",
  description: "MLAI Green Battery Hackathon, Melbourne & Sydney, April-May 2024",
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
    description: "MLAI Green Battery Hackathon, Melbourne & Sydney, April-May 2024",
    url: 'https://mlai.au/hackathon',
    type: 'website',
    images: [
      {
        url: '/MLAI-Logo.png',
        width: 1200,
        height: 630,
        alt: 'MLAI Logo, a Kangaroo wearing sunglasses',
      },
    ],
  },
  robots: {
    index: true,
    follow: false,
    noarchive: true,
    nosnippet: true,
    noimageindex: true,
    nocache: true,
  },
};


export default function HackathonLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <Layout>{children}</Layout>
}
