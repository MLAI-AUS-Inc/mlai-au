import { Metadata } from "next";
import Layout from "./components/Layout"

export const metadata: Metadata = {
  metadataBase: new URL("https://mlai.au/hackathon"), 
  title: "MLAI Green Battery Hack",
  description: "The MLAI Green Battery Hack is a beginner friendly AI hackathon to support Australia's journey to carbon net zero. Your AI model will control a simulated battery trading in the electricity spot market.",
  openGraph: {
    title: 'MLAI',
    description: "The MLAI Green Battery Hack is a beginner friendly AI hackathon to support Australia's journey to carbon net zero. Your AI model will control a simulated battery trading in the electricity spot market.",
    url: 'https://mlai.au/hackathon',
    type: 'website',
    images: [
      {
        url: 'photos/gbh_melbourne.webp',
        width: 1200,
        height: 630,
        alt: 'A Giant green battery in the middle of Melbourne and Sydney',
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


export default function HackathonLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <Layout>{children}</Layout>
}
