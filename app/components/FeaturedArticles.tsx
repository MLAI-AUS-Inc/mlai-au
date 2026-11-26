import { Link } from "react-router";
import FeaturedArticleCard from "~/components/articles/FeaturedArticleCard";
import { Container } from "~/components/ui/Container";
import { ARTICLE_REGISTRY } from "~/articles/registry";

// Get the featured articles for the home page display
const FEATURED_ARTICLE_SLUGS = [
  "featured/learn-ai-melbourne",
  "featured/how-to-get-data-science-job",
  "featured/startup-accelerator-australia",
  "community/weekly-deep-dive-into-ai-and-ml-advancements-updates",
];

// Map slugs to card colors to match the design
const CARD_COLORS: Record<string, "coral-with-person" | "purple" | "black" | "blue"> = {
  "featured/learn-ai-melbourne": "coral-with-person",
  "featured/how-to-get-data-science-job": "purple",
  "featured/startup-accelerator-australia": "black",
  "community/weekly-deep-dive-into-ai-and-ml-advancements-updates": "blue",
};

export default function FeaturedArticles() {
  const articles = FEATURED_ARTICLE_SLUGS.map(slug => ARTICLE_REGISTRY[slug]).filter(Boolean);

  return (
    <section className="mp-sec">
      <div className="mp-bill mp-bill--spot mp-bill--a4 mp-reads w-full p-5 sm:p-8 lg:p-12" data-mp-ink="yellow" data-mp-tape="duct right">
        <Container padded={false}>
          {/* Header with title and see all link */}
          <div className="flex items-center justify-between gap-4 mb-7 sm:mb-9 lg:mb-10">
            <h2 className="mp-title mp-reads-title">
              Articles on Startups & AI
            </h2>
            <Link
              to="/articles"
              className="mp-btn whitespace-nowrap"
            >
              See all
              <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>

          {/* Featured articles grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-7">
            {articles.map((article) => (
              <FeaturedArticleCard
                key={article.slug}
                href={`/articles/${article.slug}`}
                title={article.title}
                image={article.image}
                imageAlt={article.imageAlt}
                color={CARD_COLORS[article.slug]}
                personImage={article.slug === "featured/learn-ai-melbourne" ? article.image : undefined}
              />
            ))}
          </div>
        </Container>
      </div>
    </section>
  );
}
