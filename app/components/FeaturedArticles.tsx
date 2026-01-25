import { Link } from "react-router";
import FeaturedArticleCard from "~/components/articles/FeaturedArticleCard";
import { Container } from "~/components/ui/Container";
import { ARTICLE_REGISTRY } from "~/articles/registry";

// Get the featured articles for the home page display
const FEATURED_ARTICLE_SLUGS = [
  "careers/how-to-get-started-with-ai-2026",
  "careers/best-way-to-learn-about-ai-2026",
  "community/ai-hackathons-and-events-melbourne",
  "community/weekly-deep-dive-into-ai-and-ml-advancements-updates",
];

// Map slugs to card colors to match the design
const CARD_COLORS: Record<string, "coral-with-person" | "purple" | "black" | "blue"> = {
  "careers/how-to-get-started-with-ai-2026": "coral-with-person",
  "careers/best-way-to-learn-about-ai-2026": "purple",
  "community/ai-hackathons-and-events-melbourne": "black",
  "community/weekly-deep-dive-into-ai-and-ml-advancements-updates": "blue",
};

export default function FeaturedArticles() {
  const articles = FEATURED_ARTICLE_SLUGS.map(slug => ARTICLE_REGISTRY[slug]).filter(Boolean);

  return (
    <section className="p-2 lg:p-3">
      <div className="w-full bg-[var(--brutalist-yellow)] border border-gray-400 rounded-2xl sm:rounded-[2.5rem] p-4 sm:p-8 lg:p-12">
        <Container padded={false}>
          {/* Header with title and see all link */}
          <div className="flex items-center justify-between mb-6 sm:mb-8 lg:mb-10">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-gray-900">
              Articles on Startups & AI
            </h2>
            <Link
              to="/articles"
              className="inline-flex items-center gap-1 text-sm sm:text-base font-semibold text-gray-900 hover:text-gray-700 transition-colors whitespace-nowrap"
            >
              See all
              <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>

          {/* Featured articles grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6">
            {articles.map((article) => (
              <FeaturedArticleCard
                key={article.slug}
                href={`/articles/${article.slug}`}
                title={article.title}
                image={article.image}
                imageAlt={article.imageAlt}
                color={CARD_COLORS[article.slug]}
                personImage={article.slug === "careers/how-to-get-started-with-ai-2026" ? article.image : undefined}
              />
            ))}
          </div>
        </Container>
      </div>
    </section>
  );
}
