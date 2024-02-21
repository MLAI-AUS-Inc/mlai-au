import { Metadata } from "next";
import Header from "./Header"

export const metadata: Metadata = {
  metadataBase: new URL("https://mlai.au/hackathon"), 
  title: "MLAI Green Battery Hack",
  description: "MLAI Green Battery Hackathon, Melbourne & Sydney, April-May 2024",
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
    index: true, // Allow indexing of the page by search engines
    follow: false, // Do not follow the links on the page to discourage scrapers
    noarchive: true,
    nosnippet: true,
    noimageindex: true,
    nocache: true,
  },
};

export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
    <div className='bg-gray-900' />
      <Header className="sticky top-0"></Header>
      <main className="flex-auto">{children}</main>
    </>
  )
}
