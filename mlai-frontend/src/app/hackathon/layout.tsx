import Layout from "./components/Layout"


export default function HackathonLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <Layout>{children}</Layout>
}
