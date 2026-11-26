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
      <section className="mp-sec">
        <div className="mp-bill mp-bill--a3 mp-news w-full p-5 sm:p-8 lg:p-12" data-mp-ink="yellow" data-mp-tape="2">
          <Container padded={false}>
            <h2 className="mp-title mp-title--center mp-news-title">
              Weekly updates from MLAI Aus
            </h2>
            <div className="mt-8 sm:mt-12 text-center text-[#45423c]">
              <p className="mp-type text-sm sm:text-base">
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
    <section className="mp-sec">
      <div className="mp-bill mp-bill--a3 mp-news w-full p-5 sm:p-8 lg:p-12" data-mp-ink="yellow" data-mp-tape="2">
        <Container padded={false}>
          <h2 className="mp-title mp-title--center mp-news-title">
            Weekly updates from MLAI Aus
          </h2>
          <div className="mt-6 sm:mt-8 lg:mt-12 grid grid-cols-1 lg:grid-cols-6 gap-6 lg:gap-0">
            {/* Hero post embed: spans three columns on large */}
            <div className="lg:col-span-3">
              <SubstackPostEmbed url={hero.link} className="w-full" />
            </div>
            {/* RIGHT-HAND COLUMN: smaller updates + subscribe */}
            <div className="lg:col-span-3 flex flex-col gap-0 h-full">
              {/* Smaller updates vertical list */}
              <div className="flex flex-col gap-4 sm:gap-6">
                {rest.map((post) => (
                  <div
                    key={post.link}
                    className="mp-news-item flex flex-col sm:flex-row items-start gap-3 sm:gap-4 pb-4 sm:pb-6 lg:pl-6"
                  >
                    {/* Image - shows on top on mobile, side on desktop */}
                    {post.image && (
                      <img
                        src={post.image}
                        alt={post.title}
                        className="mp-photo mp-xerox w-full sm:w-24 lg:w-32 h-32 sm:h-20 lg:h-24 object-cover flex-none order-first sm:order-last"
                      />
                    )}
                    <div className="flex-auto min-w-0">
                      <a
                        href={post.link}
                        className="mp-news-link line-clamp-2"
                      >
                        {post.title}
                      </a>
                      <p className="mp-type text-xs sm:text-sm text-[#45423c] mt-1" suppressHydrationWarning>
                        {new Date(post.pubDate).toLocaleDateString()}
                      </p>
                      <p className="mt-1 sm:mt-2 text-sm sm:text-base text-[#33312c] line-clamp-2">
                        {post.contentSnippet}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              {/* Subscribe card - at bottom of column */}
              <div className="mt-6 lg:mt-auto">
                <SubstackSubscribe />
              </div>
            </div>
          </div>
        </Container>
      </div>
    </section>
  );
}
