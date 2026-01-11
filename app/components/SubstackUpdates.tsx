import SubstackPostEmbed from "~/components/SubstackPostEmbed";
import SubstackSubscribe from "~/components/SubstackSubscribe";
import { Container } from "~/components/ui/Container";

interface SubstackPost {
  title: string;
  link: string;
  pubDate: string;
  contentSnippet: string;
  image?: string;
}

interface SubstackUpdatesProps {
  posts: SubstackPost[];
}

export default function SubstackUpdates({ posts }: SubstackUpdatesProps) {
  const [hero, ...rest] = posts;

  if (!hero) {
    return (
      <section className="bg-white py-24">
        <Container>
          <h2 className="text-center text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Weekly updates from MLAI Aus
          </h2>
          <div className="mt-12 text-center text-gray-600">
            <p>
              Unable to load recent updates. Please visit our Substack directly.
            </p>
            <div className="mt-8">
              <SubstackSubscribe />
            </div>
          </div>
        </Container>
      </section>
    );
  }

  return (
    <section className="bg-white py-24">
      <Container>
        <h2 className="text-center text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Weekly updates from MLAI Aus
        </h2>
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-6 gap-0">
          {/* Hero post embed: spans three columns on large */}
          <div className="lg:col-span-3">
            <SubstackPostEmbed url={hero.link} className="w-full rounded-lg" />
          </div>
          {/* RIGHT-HAND COLUMN: smaller updates + subscribe */}
          <div className="lg:col-span-3 flex flex-col gap-0 h-full">
            {/* Smaller updates vertical list */}
            <div className="flex flex-col gap-6">
              {rest.map((post) => (
                <div
                  key={post.link}
                  className="flex items-start gap-4 border-b border-gray-200 pb-6 pl-6 last:border-none"
                >
                  <div className="flex-auto">
                    <a
                      href={post.link}
                      className="font-semibold text-lg text-teal-500 hover:underline"
                    >
                      {post.title}
                    </a>
                    <p className="text-sm text-gray-500 mt-1">
                      {new Date(post.pubDate).toLocaleDateString()}
                    </p>
                    <p className="mt-2 text-gray-600 line-clamp-2">
                      {post.contentSnippet}
                    </p>
                  </div>
                  {post.image && (
                    <img
                      src={post.image}
                      alt={post.title}
                      className="h-24 w-32 object-cover rounded-lg flex-none"
                    />
                  )}
                </div>
              ))}
            </div>
            {/* Subscribe card - at bottom of column */}
            <div className="rounded-2xl bg-white mt-auto">
              <SubstackSubscribe />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
