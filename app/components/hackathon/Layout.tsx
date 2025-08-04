import Header from "./Header";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="bg-gray-900" />
      <Header className="sticky top-0" />
      <main className="flex-auto">{children}</main>
    </>
  );
}
