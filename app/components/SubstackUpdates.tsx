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
      <section className="p-2 lg:p-3">
        <div className="w-full bg-white border border-gray-400 rounded-2xl sm:rounded-[2.5rem] p-4 sm:p-8 lg:p-12">
          <Container padded={false}>
            <h2 className="text-center text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Weekly updates from MLAI Aus
            </h2>
            <div className="mt-8 sm:mt-12 text-center text-gray-600">
              <p className="text-sm sm:text-base">
                Unable to load recent updates. Please visit our Substack directly.
              </p>
              <div className="mt-6 sm:mt-8">
                <SubstackSubscribe />
              </div>
            </div>
          </Container>
        </div>
      </section>
    );
  }

  return (
    <section className="p-2 lg:p-3">
      <div className="w-full bg-white border border-gray-400 rounded-2xl sm:rounded-[2.5rem] p-4 sm:p-8 lg:p-12">
        <Container padded={false}>
          <h2 className="text-center text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 lg:text-4xl">
            Weekly updates from MLAI Aus
          </h2>
          <div className="mt-6 sm:mt-8 lg:mt-12 grid grid-cols-1 lg:grid-cols-6 gap-6 lg:gap-0">
            {/* Hero post embed: spans three columns on large */}
            <div className="lg:col-span-3">
              <SubstackPostEmbed url={hero.link} className="w-full rounded-lg" />
            </div>
            {/* RIGHT-HAND COLUMN: smaller updates + subscribe */}
            <div className="lg:col-span-3 flex flex-col gap-0 h-full">
              {/* Smaller updates vertical list */}
              <div className="flex flex-col gap-4 sm:gap-6">
                {rest.map((post) => (
                  <div
                    key={post.link}
                    className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4 border-b border-gray-200 pb-4 sm:pb-6 lg:pl-6 last:border-none"
                  >
                    {/* Image - shows on top on mobile, side on desktop */}
                    {post.image && (
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full sm:w-24 lg:w-32 h-32 sm:h-20 lg:h-24 object-cover rounded-lg flex-none order-first sm:order-last"
                      />
                    )}
                    <div className="flex-auto min-w-0">
                      <a
                        href={post.link}
                        className="font-semibold text-base sm:text-lg text-teal-500 hover:underline line-clamp-2"
                      >
                        {post.title}
                      </a>
                      <p className="text-xs sm:text-sm text-gray-500 mt-1" suppressHydrationWarning>
                        {new Date(post.pubDate).toLocaleDateString()}
                      </p>
                      <p className="mt-1 sm:mt-2 text-sm sm:text-base text-gray-600 line-clamp-2">
                        {post.contentSnippet}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              {/* Subscribe card - at bottom of column */}
              <div className="rounded-2xl bg-white mt-6 lg:mt-auto">
                <SubstackSubscribe />
              </div>
            </div>
          </div>
        </Container>
      </div>
    </section>
  );
}
