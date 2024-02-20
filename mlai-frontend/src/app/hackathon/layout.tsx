import { Metadata } from "next";
import Layout from "./components/Layout"

export const metadata: Metadata = {
  metadataBase: new URL("https://mlai.au/hackathon"), 
  title: "MLAI Green Battery Hack",
  description: "MLAI Green Battery Hackathon, Melbourne & Sydney, April-May 2024",
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
        url: '/MLAI-Logo-Teal.png',
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
