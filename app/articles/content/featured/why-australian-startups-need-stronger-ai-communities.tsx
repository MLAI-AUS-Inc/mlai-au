import { useEffect, type ComponentType } from 'react';
import { ArticleFAQ } from '../../../components/articles/ArticleFAQ';
import ArticleCompanyCTA from '../../../components/articles/ArticleCompanyCTA';
import { ArticleHeroHeader } from '../../../components/articles/ArticleHeroHeader';
import { ArticleImageBlock } from '../../../components/articles/ArticleImageBlock';
import { ArticleFooterNav } from '../../../components/articles/ArticleFooterNav';
import ArticleTocPlaceholder from '../../../components/articles/ArticleTocPlaceholder';
import { ArticleReferences } from '../../../components/articles/ArticleReferences';
import ArticleDisclaimer from '../../../components/articles/ArticleDisclaimer';
import QuoteBlock from '../../../components/articles/QuoteBlock';
import AudienceGrid from '../../../components/articles/AudienceGrid';
import { ArticleStepList } from '../../../components/articles/ArticleStepList';
import { ArticleResourceCTA } from '../../../components/articles/ArticleResourceCTA';

type ArticleComponent = ComponentType<Record<string, unknown>>;

const ArticleFAQComponent = ArticleFAQ as unknown as ArticleComponent;
const ArticleCompanyCTAComponent = ArticleCompanyCTA as unknown as ArticleComponent;
const ArticleHeroHeaderComponent = ArticleHeroHeader as unknown as ArticleComponent;
const ArticleImageBlockComponent = ArticleImageBlock as unknown as ArticleComponent;
const ArticleFooterNavComponent = ArticleFooterNav as unknown as ArticleComponent;
const ArticleTocPlaceholderComponent = ArticleTocPlaceholder as unknown as ArticleComponent;
const ArticleReferencesComponent = ArticleReferences as unknown as ArticleComponent;
const ArticleDisclaimerComponent = ArticleDisclaimer as unknown as ArticleComponent;
const QuoteBlockComponent = QuoteBlock as unknown as ArticleComponent;
const AudienceGridComponent = AudienceGrid as unknown as ArticleComponent;
const ArticleStepListComponent = ArticleStepList as unknown as ArticleComponent;
const ArticleResourceCTAComponent = ArticleResourceCTA as unknown as ArticleComponent;

export const useCustomHeader = true;
const TOPIC = 'Why Australian Startups Need Stronger AI Communities';
export const CATEGORY = 'featured';
export const SLUG = 'why-australian-startups-need-stronger-ai-communities';
export const DATE_PUBLISHED = '2026-06-21';
export const DATE_MODIFIED = '2026-06-21';
export const DESCRIPTION = 'Australian startups grow faster when AI communities connect talent, validation, feedback and practical pathways from tools to trusted products.';
const ARTICLE_PATH = '/articles/featured/why-australian-startups-need-stronger-ai-communities';
const HERO_IMAGE = 'https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Fhero-23950c23-bc67-4450-8674-8c111d188163.jpg?alt=media&token=ca641826-f54e-48e4-97c3-c4dabb3bffa5';
const HERO_IMAGE_ALT = 'Australian startup founders discussing AI tools and feedback in a close-up candid community meetup';
export const FEATURED_FOCUS = 'product';
const AUTHOR = 'Dr Sam Donegan';
const AUTHOR_ROLE = 'Founder';
const AUTHOR_BIO = 'Dr Sam Donegan is the founder of MLAI and writes about practical AI education, communities and responsible adoption for Australian builders.';
const AUTHOR_AVATAR = '';

interface FAQ {
  id: string;
  question: string;
  answer: string;
}

type AuthorDetails = {
  name: string;
  role: string;
  bio: string;
  avatarUrl: string;
};

function AuthorBio({ author }: { author: AuthorDetails }) {
  const initials = author.name
    .trim()
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('');

  return (
    <section className='rounded-3xl border border-slate-200 bg-slate-50 px-6 py-6'>
      <div className='flex flex-col gap-4 sm:flex-row sm:items-center'>
        <div
          role='img'
          aria-label={author.name}
          className='flex h-20 w-20 items-center justify-center rounded-full bg-slate-200 bg-cover bg-center text-lg font-semibold text-slate-700'
          style={author.avatarUrl ? { backgroundImage: 'url(' + author.avatarUrl + ')' } : undefined}
        >
          {author.avatarUrl ? null : initials}
        </div>
        <div>
          <p className='text-lg font-semibold text-slate-900'>{author.name}</p>
          <p className='text-sm font-medium uppercase tracking-[0.18em] text-slate-500'>{author.role}</p>
        </div>
      </div>
      {author.bio ? <p className='mt-4 text-base leading-7 text-slate-700'>{author.bio}</p> : null}
    </section>
  );
}

export const faqItems: FAQ[] = [
  {
    id: 'faq-1',
    question: 'What counts as a strong AI community for startups?',
    answer: 'A strong AI community connects founders, builders, researchers, domain experts, investors and customers around real problems. It helps startups test assumptions, find talent, check product decisions and learn from trusted feedback.',
  },
  {
    id: 'faq-2',
    question: 'Can non-technical founders benefit from AI communities?',
    answer: 'Yes. Non-technical founders can use AI communities to meet technical builders, understand model evaluation, test customer problems and find domain or research input before product decisions become fixed.',
  },
  {
    id: 'faq-3',
    question: 'How can AI communities support funding readiness?',
    answer: 'Communities can help founders sharpen validation, build credible introductions and connect with support pathways such as cohorts and funding networks. They do not replace traction, but they can improve the signals investors see.',
  },
  {
    id: 'faq-4',
    question: 'How should Australian startups choose the right AI community?',
    answer: 'Start with the gap the company needs to close, such as hiring, product discovery, responsible AI, model evaluation or domain access. Choose communities where those people and conversations are likely to appear.',
  },
];

export const summaryHighlights = {
  heading: 'Key facts: Why Australian Startups Need Stronger AI Communities',
  intro: DESCRIPTION,
  items: [
    {
      label: 'What are the top 10 startups?',
      description: 'This article does not rank the top 10 startups. It cites LinkedIn’s 2025 Top Startups list as one signal of visible startup activity, including AI-linked company Relevance AI.',
    },
    {
      label: 'What are the top startups in Aus?',
      description: 'Top startup signals in Australia include companies attracting talent, capital and market attention. The article references LinkedIn’s startup list and a reported week where 24 Australian tech companies raised $91 million.',
    },
    {
      label: 'What business can I start with $100K in Australia?',
      description: 'The article does not recommend a specific business to start with $100K. It explains that startup teams should use AI communities to test ideas, find capability gaps and validate market demand.',
    },
  ],
};

export const articleMeta = {
  title: TOPIC,
  topic: TOPIC,
  category: CATEGORY,
  slug: SLUG,
  description: DESCRIPTION,
  datePublished: DATE_PUBLISHED,
  dateModified: DATE_MODIFIED,
  author: AUTHOR,
  image: HERO_IMAGE,
  imageAlt: HERO_IMAGE_ALT,
  featuredFocus: FEATURED_FOCUS,
};

const faqSchemaItems = [
  {
    question: 'What are the top 10 startups?',
    answer: 'This article does not rank the top 10 startups. It cites LinkedIn’s 2025 Top Startups list as one signal of visible startup activity, including AI-linked company Relevance AI.',
  },
  {
    question: 'What are the top startups in Aus?',
    answer: 'Top startup signals in Australia include companies attracting talent, capital and market attention. The article references LinkedIn’s startup list and a reported week where 24 Australian tech companies raised $91 million.',
  },
  {
    question: 'What business can I start with $100K in Australia?',
    answer: 'The article does not recommend a specific business to start with $100K. It explains that startup teams should use AI communities to test ideas, find capability gaps and validate market demand.',
  },
  ...faqItems.map((item) => ({ question: item.question, answer: item.answer })),
];

const articleStructuredData = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: TOPIC,
  description: DESCRIPTION,
  image: [HERO_IMAGE],
  datePublished: DATE_PUBLISHED,
  dateModified: DATE_MODIFIED,
  author: { '@type': 'Person', name: AUTHOR },
  publisher: { '@type': 'Organization', name: 'MLAI' },
  mainEntityOfPage: { '@type': 'WebPage', '@id': `https://mlai.au${ARTICLE_PATH}` },
});

const faqStructuredData = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqSchemaItems.map((item) => ({
    '@type': 'Question',
    name: item.question,
    acceptedAnswer: { '@type': 'Answer', text: item.answer },
  })),
});

const CONTENT_FACTORY_INSPECTOR_SCRIPT = `window.__cfArticleInspectorInstalled=true;try{window.parent.postMessage({source:'content-factory-inspector',protocolVersion:3,type:'ready',mode:'comment'},'*')}catch(e){}`;

function ContentFactoryInspectorBridge() {
  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    if (!new URLSearchParams(window.location.search).has('cfInspector')) {
      return;
    }

    const script = document.createElement('script');
    script.dataset.contentFactoryInspector = 'true';
    script.textContent = CONTENT_FACTORY_INSPECTOR_SCRIPT;
    document.body.appendChild(script);

    return (): void => {
      script.remove();
    };
  }, []);

  return null;
}

export default function ArticleContent() {
  const authorDetails: AuthorDetails = {
    name: AUTHOR,
    role: AUTHOR_ROLE,
    bio: AUTHOR_BIO,
    avatarUrl: AUTHOR_AVATAR,
  };

  return (
    <>
      <script type='application/ld+json' dangerouslySetInnerHTML={{ __html: articleStructuredData }} />
      <script type='application/ld+json' dangerouslySetInnerHTML={{ __html: faqStructuredData }} />
      <ContentFactoryInspectorBridge />
      <ArticleHeroHeaderComponent
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Articles', href: '/articles' },
          { label: TOPIC, href: ARTICLE_PATH, current: true },
        ]}
        title={TOPIC}
        titleHighlight={TOPIC}
        headerBgColor='teal'
        summary={summaryHighlights}
        heroImage={HERO_IMAGE}
        heroImageAlt={HERO_IMAGE_ALT}
      />
      <ArticleTocPlaceholderComponent className='bg-transparent' />
      <div className='prose prose-lg prose-slate max-w-none bg-transparent'>
        <div id='intro' data-cf-component-id='section:intro' data-cf-component-type='section' data-cf-component-label='AI growth is now a community challenge' data-cf-source-section-id='intro'>
          <p>
            <strong>{TOPIC}</strong> — Australian startups need stronger AI communities because access to the tools is no longer the main barrier. AI is now something many people can explore with an internet connection and curiosity, not only something built inside the largest global technology companies.
          </p>
          <p>
            Australia’s AI ecosystem is growing across businesses, research and jobs, and national reporting also points to gaps in the system. Funding signals show momentum too, with Australian tech companies raising fresh capital and startup lists highlighting teams that invest in talent and long-term careers. Communities help founders and builders compare notes, meet collaborators, test ideas and learn faster than they could alone.
          </p>
        </div>
        <div id='opportunity-uneven' data-cf-component-id='section:opportunity-uneven' data-cf-component-type='section' data-cf-component-label='Australian startups have momentum, but access is uneven' data-cf-source-section-id='opportunity-uneven'>
          <h2>Australian startups have momentum, but access is uneven</h2>
          <p>
            Australian startups are not short on signs of activity. SmartCompany reported one week in which 24 Australian tech companies collectively raised $91 million, including Startmate cohort companies and larger raises such as Fluent Commerce raising $46 million to scale AI-powered retail order management tools. LinkedIn’s 2025 Top Startups list also points to visible AI-linked company building, including Relevance AI among the startups highlighted for talent and career growth.
          </p>
          <p>
            That momentum matters, but it is not the same as a mature, evenly supported ecosystem. The National AI Centre describes Australia’s AI ecosystem as growing across businesses, research and jobs, while also noting gaps across the size, structure and specialisations of the workforce, companies and research activity. Stone & Chalk makes a similar opportunity case: AI tools are now easier to explore, and Australia can be more than a follower, but founders still need practical pathways from curiosity to customers.
          </p>
          <div data-cf-component-id='image:opportunity-uneven' data-cf-component-type='image' data-cf-component-label='Image: Australian startups have momentum, but access is uneven' data-cf-source-section-id='opportunity-uneven'>
            <ArticleImageBlockComponent
              src='https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-5bc22219-2664-4def-aa18-1fb77ece4fbf.jpg?alt=media&token=ae531edb-f990-4e9a-97b8-ba3c08bbd76a'
              alt='Australian startup founders and engineers collaborating at a candid AI workshop meetup'
              caption='Startup momentum grows faster when founders can pair AI tools with practical support and trusted feedback.'
              width={1200}
              height={800}
            />
          </div>
          <QuoteBlockComponent title='Momentum is not maturity' variant='orange'>
            Funding headlines are useful signals, but they do not remove the need for skills, customers and trusted feedback.
          </QuoteBlockComponent>
        </div>
        <div className='mt-8' data-cf-component-id='quote:ai-access-insight' data-cf-component-type='quote' data-cf-component-label='Key insight'>
          <QuoteBlockComponent title='Key insight' variant='purple'>
            AI has lowered the cost of starting, but strong communities lower the cost of learning what is worth building.
          </QuoteBlockComponent>
        </div>
        <div id='community-execution' data-cf-component-id='section:community-execution' data-cf-component-type='section' data-cf-component-label='Community turns AI access into better execution' data-cf-source-section-id='community-execution'>
          <h2>Community turns AI access into better execution</h2>
          <p>
            AI has lowered the barrier to entry for Australian startups. As Stone & Chalk notes, AI is no longer only for large technology companies. Anyone with an internet connection and curiosity can start exploring it.
          </p>
          <p>
            A useful AI community gives founders, builders, researchers and domain experts a place to test assumptions before they become product decisions. The National AI Centre frames Australia’s AI ecosystem as spanning businesses, research, jobs and capability gaps. Communities help connect those parts so startups are not learning in isolation.
          </p>
          <div data-cf-component-id='image:community-execution' data-cf-component-type='image' data-cf-component-label='Image: Community turns AI access into better execution' data-cf-source-section-id='community-execution'>
            <ArticleImageBlockComponent
              src='https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-daca827d-4e11-4988-bbf0-5d3b750686ac.jpg?alt=media&token=b3ed0977-1bbc-4cdf-b4a9-599f00775b9b'
              alt='Australian startup workspace with laptops open to AI tools and a quiet community hub in the background'
              caption='Community turns AI access into better execution'
              width={1200}
              height={800}
            />
          </div>
          <QuoteBlockComponent title='' variant='purple'>
            A stronger AI community should improve decisions, not simply produce more events or more noise.
          </QuoteBlockComponent>
          <h3>From tool access to trust loops</h3>
          <p>
            The community can then help them ask whether the problem is real, whether the data is fit for purpose, whether the output can be checked, and whether customers would trust it in practice.
          </p>
          <p>
            It helps startups move from experimentation to products that are useful, reliable and market-aware. For Australian startups, the opportunity is not just to use AI earlier. It is to build with stronger judgment, clearer evidence and closer links to the people who will use the product.
          </p>
        </div>
        <div data-cf-component-id='audience-grid:who-community-serves' data-cf-component-type='audience-grid' data-cf-component-label='Where stronger AI communities help most'>
          <AudienceGridComponent
            heading='Where stronger AI communities help most'
            cards={[
              { title: 'AI founders', description: 'Bring a clear product, data or market question so community feedback can sharpen validation before decisions become fixed.', variant: 'orange' },
              { title: 'Technical builders', description: 'Use the community to find real workflows, domain constraints and customer problems that need more than tool experimentation.', variant: 'purple' },
              { title: 'Researchers and domain experts', description: 'Connect research knowledge and practical workflow insight with founders who need stronger evidence and better product judgement.', variant: 'teal' },
              { title: 'Investors and ecosystem supporters', description: 'Look for credible signals of capability, sharper validation and useful weak ties between teams, customers and support pathways.', variant: 'teal' },
            ]}
          />
        </div>
        <div id='talent-validation-capital' data-cf-component-id='section:talent-validation-capital' data-cf-component-type='section' data-cf-component-label='The best communities connect talent, validation and capital' data-cf-source-section-id='talent-validation-capital'>
          <h2>The best communities connect talent, validation and capital</h2>
          <p>
            Strong communities help Australian startups move faster because they connect the people behind the work. LinkedIn’s 2025 Top Startups framing puts talent at the centre of startup strength, highlighting companies that invest in people and help them build long-term careers. That matters in AI because good ideas need technical builders, researchers, operators and domain experts to meet early, not after the product is already fixed.
          </p>
          <p>
            The National AI Centre describes Australia’s AI ecosystem as growing across businesses, research and jobs. That growth creates opportunity, but it also makes the ecosystem harder to navigate alone. A useful community gives founders more than visibility. It creates weak ties that can lead to sharper validation, credible introductions and support pathways, including cohorts and funding networks like Startmate, which appeared alongside 24 Australian tech companies raising $91 million in one reported week.
          </p>
          <ul>
            <li>Builders can meet founders who need product, data and engineering help.</li>
            <li>Domain experts can test whether an AI idea fits real workflows.</li>
            <li>Investors and customers can see early signals before a startup is widely known.</li>
          </ul>
        </div>
        <div id='practical-playbook' data-cf-component-id='section:practical-playbook' data-cf-component-type='section' data-cf-component-label='How startup teams can use AI communities deliberately' data-cf-source-section-id='practical-playbook'>
          <h2>How startup teams can use AI communities deliberately</h2>
          <p>
            Australian startups get more value from AI communities when they start with a clear gap, not a vague networking goal. That gap might be product discovery, model evaluation, access to a domain expert, hiring, responsible AI practice, or a sharper view of the market. Australia’s AI ecosystem spans businesses, research, jobs and specialist activity, so a founder should treat community time as a way to find the next useful signal inside that wider system.
          </p>
          <p>
            The practical move is to bring something specific into the room. Conversations then become inputs for action: a clearer product choice, a possible pilot, a mentor introduction, a research link, or a hiring lead. This fits the reality of Australian startups, where talent, product learning and market access all matter to long-term growth.
          </p>
          <div data-cf-component-id='image:practical-playbook' data-cf-component-type='image' data-cf-component-label='Image: How startup teams can use AI communities deliberately' data-cf-source-section-id='practical-playbook'>
            <ArticleImageBlockComponent
              src='https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-f4e8b88e-9fd6-4573-8f8d-0e2c09a3a996.jpg?alt=media&token=4a93d543-95b2-4db0-a041-5c3658c22d29'
              alt='Startup founders’ hands sharing AI notes on a laptop during a candid community meetup'
              caption='How startup teams can use AI communities deliberately'
              width={1200}
              height={800}
            />
          </div>
          <h3>Four community habits that compound</h3>
          <p>
            Fourth, write down what changed after the conversation and decide whether it affects the product, team, pilot plan, or go-to-market path.
          </p>
          <p>
            They also match the strengths of Australia’s AI environment: a growing ecosystem, a market that can test new products, and startup teams that need to keep building capability while they grow.
          </p>
        </div>
        <div data-cf-component-id='step-list:community-growth-steps' data-cf-component-type='step-list' data-cf-component-label='Use community deliberately'>
          <ArticleStepListComponent
            title='Use community deliberately'
            steps={[
              'Map the startup’s AI capability gap.',
              'Bring one concrete problem to the community.',
              'Turn feedback into a pilot, hire, mentor introduction or customer conversation.',
              'Record what changed and share useful learning back into the next loop.',
            ]}
            accent='teal'
          />
        </div>
        <div id='conclusion' data-cf-component-id='section:conclusion' data-cf-component-type='section' data-cf-component-label='Build the ecosystem around the company' data-cf-source-section-id='conclusion'>
          <h2>Build the ecosystem around the company</h2>
          <p>
            Australian startups do not grow in isolation. The National AI Centre describes Australia’s AI ecosystem as a mix of businesses, research, jobs and workforce activity across the country. For founders, that means community is not a side activity. It can be part of how a company finds talent, tests ideas, builds trust and learns faster.
          </p>
          <p>Australia has a chance to lead in AI when founders, builders, researchers and supporters work across the ecosystem.</p>
          <ul>
            <li>Choose a community that matches your stage, sector or technical problem.</li>
          </ul>
          <div data-cf-component-id='image:conclusion' data-cf-component-type='image' data-cf-component-label='Image: Build the ecosystem around the company' data-cf-source-section-id='conclusion'>
            <ArticleImageBlockComponent
              src='https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-e03d8369-8ba4-4d59-a529-b6ed9cb33b2f.jpg?alt=media&token=5666d675-7e42-47dd-816b-6b62167816bd'
              alt='Australian startup founders networking at a candid AI ecosystem meetup with researchers and business mentors'
              caption='Build the ecosystem around the company'
              width={1200}
              height={800}
            />
          </div>
        </div>
        <div data-cf-component-id='resource-cta:community-growth-resource' data-cf-component-type='resource-cta' data-cf-component-label='Get the resource'>
          <ArticleResourceCTAComponent
            eyebrow='Free worksheet'
            title='AI Community Planning Worksheet'
            description='Use this worksheet to define your community gap, choose the right AI community, prepare a specific ask, and turn conversations into useful next steps.'
            buttonLabel='Download the PDF'
            buttonHref='https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fresources%2Fwhy-australian-startups-need-stronger-ai-communities-worksheet-2f7eb913.pdf?alt=media&token=b953297c-6cb7-4809-a6e5-72d17209d5a3'
            accent='purple'
          />
        </div>
        <ArticleReferencesComponent
          references={[
            { id: 1, href: 'https://www.stoneandchalk.com.au/articles/the-time-for-australian-ai-is-now', title: 'The time for Australian AI is now | Stone & Chalk', publisher: 'stoneandchalk.com.au', description: 'Authoritative reference supporting The time for Australian AI is now | Stone & Chalk.', category: 'guide' },
            { id: 2, href: 'https://www.ai.gov.au/news-and-insights/reports/australias-artificial-intelligence-ecosystem-growth-and-opportunities', title: 'Australia’s artificial intelligence ecosystem: growth and opportunities | National AI Centre', publisher: 'ai.gov.au', description: 'Authoritative reference supporting Australia’s artificial intelligence ecosystem: growth and opportunities | National AI Centre.', category: 'guide' },
            { id: 3, href: 'https://fullstack.com.au/startup-funding-in-australia/', title: 'Startup Funding in Australia: A Fullstack Guide - Fullstack', publisher: 'fullstack.com.au', description: 'Authoritative reference supporting Startup Funding in Australia: A Fullstack Guide - Fullstack.', category: 'guide' },
            { id: 4, href: 'https://enosta.com/insights/how-to-structure-a-startup-in-australia', title: 'How to Structure a Startup in Australia: A Practical Guide for Founders | Enosta', publisher: 'enosta.com', description: 'Authoritative reference supporting How to Structure a Startup in Australia: A Practical Guide for Founders | Enosta.', category: 'guide' },
            { id: 5, href: 'https://awaydigitalteams.com/blog/winning-strategies-for-australian-startups-in-a-competitive-market/', title: 'Thriving in a competitive market: Tips for Australian startups', publisher: 'awaydigitalteams.com', description: 'Authoritative reference supporting Thriving in a competitive market: Tips for Australian startups.', category: 'guide' },
            { id: 6, href: 'https://www.smartcompany.com.au/startupsmart/24-aussie-startups-raised-91-million-this-week/', title: '24 Aussie startups that raised $91 million this week', publisher: 'smartcompany.com.au', description: 'Authoritative reference supporting 24 Aussie startups that raised $91 million this week.', category: 'guide' },
            { id: 7, href: 'https://www.linkedin.com/hubs/top-startups/au/', title: 'Top Startups to work for in Australia (2025) | LinkedIn', publisher: 'linkedin.com', description: 'Authoritative reference supporting Top Startups to work for in Australia (2025) | LinkedIn.', category: 'guide' },
            { id: 8, href: 'https://sprintlaw.com.au/articles/7-legal-strategies-that-give-australian-startups-a-competitive-edge/', title: '7 Legal Strategies That Give Australian Startups | Sprintlaw Australia', publisher: 'sprintlaw.com.au', description: 'Authoritative reference supporting 7 Legal Strategies That Give Australian Startups | Sprintlaw Australia.', category: 'guide' },
            { id: 9, href: 'https://legalvision.com.au/setting-up-in-australia/', title: '10 Tips: Bring Your Startup to Australia: 8 - Setting Up In Australia', publisher: 'legalvision.com.au', description: 'Authoritative reference supporting 10 Tips: Bring Your Startup to Australia: 8 - Setting Up In Australia', category: 'guide' },
            { id: 10, href: 'https://business.gov.au/guide/starting', title: 'Guide to starting a business | business.gov.au', publisher: 'business.gov.au', description: 'Authoritative reference supporting Guide to starting a business | business.gov.au.', category: 'guide' },
            { id: 11, href: 'https://www.wholesaleinvestor.com/australian-startups-key-advice-for-explosive-growth-in-2025/', title: 'Australian Startups: Key Advice for Explosive Growth in 2025 - Wholesale Investor', publisher: 'wholesaleinvestor.com', description: 'Authoritative reference supporting Australian Startups: Key Advice for Explosive Growth in 2025 - Wholesale Investor.', category: 'guide' },
          ]}
          heading='Sources & further reading'
        />
        <ArticleDisclaimerComponent />
        <div className='my-12 not-prose' data-cf-component-id='cta' data-cf-component-type='company-cta' data-cf-component-label='Company CTA'>
          <ArticleCompanyCTAComponent
            title='Build stronger AI learning loops'
            body='Use community time to bring a real problem, compare signals and turn feedback into clearer product, hiring or validation decisions.'
            buttonText='Explore AI community articles'
            buttonHref='/articles'
          />
        </div>
      </div>
      <div data-cf-component-id='author-bio' data-cf-component-type='author-bio' data-cf-component-label='About the Author'>
        <AuthorBio author={authorDetails} />
      </div>
      <div className='mt-12' data-cf-component-id='faq' data-cf-component-type='faq' data-cf-component-label='FAQ'>
        <ArticleFAQComponent items={faqItems} />
      </div>
      <ArticleFooterNavComponent backHref='/articles' topHref='#' />
    </>
  );
}
