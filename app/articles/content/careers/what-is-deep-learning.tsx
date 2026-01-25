import type { ReactNode } from 'react'
import { Link } from 'react-router'
import { Home } from 'lucide-react'
import { RocketLaunchIcon, AcademicCapIcon, UsersIcon } from '@heroicons/react/24/outline'

import { ArticleFAQ } from '../../../components/articles/ArticleFAQ'
import ArticleCompanyCTA from '../../../components/articles/ArticleCompanyCTA'
import AuthorBio from '../../../components/AuthorBio'
import { ArticleHeroHeader } from '../../../components/articles/ArticleHeroHeader'
import { ArticleImageBlock } from '../../../components/articles/ArticleImageBlock'
import { ArticleFooterNav } from '../../../components/articles/ArticleFooterNav'
import { QuoteBlock } from '../../../components/articles/QuoteBlock'
import { ArticleTocPlaceholder } from '../../../components/articles/ArticleTocPlaceholder'
import { AudienceGrid } from '../../../components/articles/AudienceGrid'
import { ArticleResourceCTA } from '../../../components/articles/ArticleResourceCTA'
import { ArticleStepList } from '../../../components/articles/ArticleStepList'
import { ArticleCallout } from '../../../components/articles/ArticleCallout'
import { MLAITemplateResourceCTA } from '../../../components/articles/MLAITemplateResourceCTA'
import { getDefaultArticleAuthorDetails } from '../../authors'

/** ========== INPUTS (replace all placeholders) ========== */
export const useCustomHeader = true

const TOPIC = 'What is deep learning'
const CATEGORY = 'learn-ai'
const SLUG = 'what-is-deep-learning'
const AUTHOR_PROFILE = getDefaultArticleAuthorDetails()
const AUTHOR = AUTHOR_PROFILE.name ?? 'Dr Sam Donegan'
const AUTHOR_ROLE = AUTHOR_PROFILE.role ?? 'Founder'
const AUTHOR_BIO = AUTHOR_PROFILE.bio ?? ''
const AUTHOR_AVATAR =
  AUTHOR_PROFILE.avatarUrl ??
  'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=256&q=80'
const DATE_PUBLISHED = '2026-01-20'
const DATE_MODIFIED = '2026-01-20'
const DESCRIPTION = 'A practical 2026 guide to deep learning for Australia: how neural networks work, when to use them, risks, and how to start.'
const HERO_IMAGE = "https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Fhero-fef423f7-5afd-43d4-8138-1ae684a7e707.jpg?alt=media&token=896544bb-34c2-4267-a999-af50a0f5dd60"
const HERO_IMAGE_ALT = 'Abstract neural network visual with nodes and connections'
const FEATURED_FOCUS = 'ai'

/** ===== FAQ ===== */
interface FAQ {
  id: number
  question: string
  answer: ReactNode
}

export const faqItems: FAQ[] = [
  { id: 1, question: 'Is deep learning the same as AI or machine learning?', answer: 'Deep learning is a subset of machine learning (which itself is a subset of AI). It uses multi‑layer neural networks to learn representations from data, often excelling when there is a lot of labelled data or pretraining available.' },
  { id: 2, question: 'Do I need a GPU to learn or use deep learning?', answer: <>No. You can learn core ideas on a CPU with small models and datasets. A GPU becomes important when you train larger models or want faster experiments. Cloud rentals or lab access can be used later when needed. </> },
  { id: 3, question: 'How much data do I need?', answer: 'It depends on the task and model size. Classical tabular problems may work with thousands of rows; vision or speech models often benefit from tens of thousands or more. Transfer learning (starting from a pretrained model) can reduce the data you need for your specific task.' },
  { id: 4, question: 'When should I use traditional ML instead of deep learning?', answer: 'If your problem is tabular, data is limited, or interpretability is critical, tree‑based models (e.g., gradient boosting) can be simpler, cheaper, and strong baselines. Use deep learning when unstructured data (images, audio, text) or large‑scale patterns are central.' },
  { id: 5, question: 'Which framework should I learn first in 2026?', answer: 'PyTorch remains a popular starting point for research and prototyping; TensorFlow/Keras is common in production and education. Pick one, learn the fundamentals (tensors, autograd, training loops), then explore the other if your stack/team prefers it.' },
  { id: 6, question: 'What about responsible use in Australia?', answer: <>Follow Australian Privacy Principles (APPs) for personal data and be transparent about data use. Assess bias and fairness, document limitations, and review relevant state and federal guidance as at 2026. Seek independent review for high‑risk applications.</> },
]

export const summaryHighlights = {
  heading: `Key facts: ${TOPIC}`,
  intro:
    'Brief, factual overview referencing current Australian context (e.g. 2026 ecosystem norms, official guidance, privacy expectations, or common pathways).',
  items: [
    {
      label: 'Is deep learning the same as machine learning?',
      description: 'No. Deep learning is a subset of ML that uses multi‑layer neural networks to learn representations from data.',
    },
    {
      label: 'Do I need a GPU to start with deep learning?',
      description: 'Not initially. You can learn on CPU with small models; GPUs help when training larger models or speeding experiments.',
    },
    {
      label: 'What models are common in 2026?',
      description: 'Transformers for sequences, CNNs for images, and diffusion models for generative tasks—choice depends on your data and goal.',
    },
  ],
}

export default function ArticlePage() {
  const authorDetails = {
    name: AUTHOR,
    role: AUTHOR_ROLE,
    bio: AUTHOR_BIO,
    avatarUrl: AUTHOR_AVATAR,
  }

  return (
    <div className='bg-transparent'>
      <ArticleHeroHeader
        breadcrumbs={[
          { label: 'Home', href: '/', icon: Home },
          { label: 'Articles', href: '/articles' },
          { label: TOPIC, current: true },
        ]}
        title={TOPIC}
        titleHighlight='(2026)'
        headerBgColor='cyan'
        summary={summaryHighlights}
        heroImage={HERO_IMAGE}
        heroImageAlt={HERO_IMAGE_ALT}
      />

      <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
        <ArticleTocPlaceholder />

        {/* Intro alert - Clean, neutral style */}
        <QuoteBlock variant='purple' icon={<span className='text-xl'>💡</span>}>
          <p className='text-sm text-white'>
            
            This guide is part of our broader series on {TOPIC}. Prefer to jump ahead?{' '}
            <Link to='/articles' className='font-semibold text-white underline-offset-4 hover:underline'>
              Browse related articles →
            </Link>
          
          </p>
        </QuoteBlock>

        {/* Persona Grid */}
        <AudienceGrid
          cards={[
            {
              title: 'Founders & Teams',
              description: 'For leaders validating ideas, seeking funding, or managing teams.',
              icon: <RocketLaunchIcon className='h-6 w-6' />,
              variant: 'orange',
            },
            {
              title: 'Students & Switchers',
              description: 'For those building portfolios, learning new skills, or changing careers.',
              icon: <AcademicCapIcon className='h-6 w-6' />,
              variant: 'purple',
            },
            {
              title: 'Community Builders',
              description: 'For workshop facilitators, mentors, and ecosystem supporters.',
              icon: <UsersIcon className='h-6 w-6' />,
              variant: 'yellow',
            },
          ]}
          className='my-10'
        />

        <div className='prose prose-lg max-w-none text-gray-700 prose-headings:text-gray-900 hover:prose-a:text-[--brand]'>
          <p>
            <strong>{TOPIC}</strong> — Deep learning uses multi‑layer neural networks to learn useful representations directly from data. In practice, that means models can handle images, audio, text and more with minimal manual feature engineering. This guide covers how it works, when to use it, what to watch for in Australia as at 2026, and a simple path to start.
          </p>

          <ArticleImageBlock src={HERO_IMAGE} alt={HERO_IMAGE_ALT} width={1200} height={630} />

          {/* SECTION: Derived from competitor patterns — clarify the concept beyond definition */}
          <h2>From features to representations: what ‘deep’ really means</h2>
          <p>
            Traditional machine learning often depends on hand‑crafted features. Deep learning learns these features automatically as <em>representations</em> across multiple layers: early layers capture simple patterns, deeper layers compose them into higher‑level concepts. Depth (number of layers) and width (neurons per layer) let models approximate complex functions when trained with enough data and regularisation.
          </p>

          <ArticleResourceCTA
            title={`Download the ${TOPIC} checklist`}
            description='Access a structured template to apply the steps in this guide.'
            buttonLabel='Get the checklist'
            buttonHref='#'
            accent='purple'
          />

          <ArticleCallout
            title='Start tiny to learn fast'
            variant='brand'
            icon={<span className='text-xl'>💡</span>}
            className='not-prose'
          >
            <p className='mt-1 text-gray-800'>
              Use a small dataset (e.g., 1k–10k examples) and a tiny model to iterate quickly. You will learn more from ten short experiments than one long training run that fails overnight.
            </p>
          </ArticleCallout>

          {/* SECTION: How it works — activations, gradients, loss */}
          <h2>How neural networks learn: activations, gradients and loss</h2>
          <img src="https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-57fc6133-87b5-4b4a-80d5-c1dfafc219fe.jpg?alt=media&token=da5d3372-d413-498a-9cf4-96d9d2491726" alt="90s tech startup scene with people discussing neural networks, capturing a retro film aesthetic." className="w-full rounded-lg my-8" />

          <p>
            A neural network composes linear layers with non‑linear activations (e.g., ReLU, GELU). During training, the model predicts an output, compares it to the ground truth via a loss function, and adjusts weights using gradient descent with backpropagation. Optimisers (such as Adam) and techniques like normalisation, dropout and early stopping help models generalise rather than memorise.
          </p>

          <h3>Training loop in plain English</h3>
          <p>
            Batches of data flow forward to produce predictions; the loss quantifies errors; gradients flow backward to update the weights; the loop repeats for several epochs until validation metrics stop improving. Save checkpoints and keep a simple experiment log so results are reproducible.
          </p>

          <ArticleStepList
            title='Practical steps'
            steps={[
              { label: 'Define your task and metric (e.g., accuracy, F1, RMSE).' },
              { label: 'Start with a small baseline model and sanity‑check overfitting on a tiny subset.' },
              { label: 'Scale data and model gradually; track validation and test performance.' },
            ]}
            accent='indigo'
          />

          <QuoteBlock title='Expert insight' variant='purple'>
            ‘Strong baselines and careful evaluation beat big models without discipline. Measure, iterate, and document your choices.’
          </QuoteBlock>

          {/* SECTION: Architectures */}
          <h2>Architectures you will meet in 2026</h2>
          <img src="https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-5548b498-0f92-411a-acd1-579ba985ed33.jpg?alt=media&token=cafb719b-c965-4846-bb34-b5dfaf675f3a" alt="People collaborating in a vibrant tech startup, captured in a nostalgic 90s film aesthetic, showcasing future architectures." className="w-full rounded-lg my-8" />

          <p>
            • Convolutional Neural Networks (CNNs): efficient for images and spatial patterns.<br />
            • Recurrent networks (historical) and Transformers: sequence modelling for text, code, audio and more; attention mechanisms capture long‑range dependencies.<br />
            • Diffusion models: state‑of‑the-art generative models for images, audio and other modalities, trained by denoising steps.<br />
            • Autoencoders and VAEs: compress representations; useful for anomaly detection and pretraining.<br />
            • GANs: adversarial training for generation; still relevant in some niches.
          </p>

          {/* SECTION: DL vs ML — decision framing from PAA */}
          <h2>Deep learning vs traditional ML — choosing the right tool</h2>
          <p>
            Use deep learning when unstructured data is central or when pretraining gives a clear advantage (vision, speech, NLP). If your data is tabular, limited, or heavily regulated for explainability, tree‑based models can be easier to train, cheaper to serve, and easier to explain. Always compare against a strong non‑DL baseline before committing.
          </p>

          {/* SECTION: Data/compute/cost */}
          <h2>Data, compute and cost: planning your stack</h2>
          <p>
            Training efficiency depends on batch size, precision (e.g., FP16/bfloat16), and I/O. GPUs or specialised accelerators speed up training; CPUs can be sufficient for small models and inference. For sensitive data, consider privacy, governance and data residency. Keep an eye on total cost: storage, training time, and monitoring for drift in production.
          </p>

          {/* SECTION: Evaluation & reliability */}
          <h2>Evaluation and reliability beyond the leaderboard</h2>
          <p>
            Match metrics to the task: accuracy/F1 for classification, BLEU/BERTScore for translation/summary quality (with human review), AUROC for imbalance, and latency/cost for serving constraints. Test on out‑of‑distribution samples, stress rare cases, and adopt simple monitoring (data quality checks, performance dashboards) to catch drift.
          </p>

          {/* SECTION: Responsible use in AU */}
          <h2>Responsible use in Australia: privacy, bias and transparency</h2>
          <p>
            As at 2026, align projects with Australian Privacy Principles (APPs) when handling personal information. Minimise data, document consents, and enable deletion where appropriate. Assess and mitigate bias, publish model cards or similar documentation, and seek expert review for high‑risk contexts (e.g., employment, health, finance). This article is general information, not legal advice — check official guidance for updates.
          </p>

          {/* SECTION: Action‑oriented close */}
          <h2>Turn understanding into a small pilot</h2>
          <p>
            Start with a scoped problem, a clear metric, and a simple baseline. When the baseline is solid, try a pretrained model, measure fairly, and only then consider scaling. Keep experiments short and documented, and invite peer review to catch blind spots early.
          </p>

          <div className='mt-8 bg-gray-50 rounded-xl p-6 border border-gray-100 not-prose'>
            <h3 className='text-lg font-bold text-gray-900 mb-4'>Your Next Steps</h3>
            <ul className='space-y-3'>
              <li className='flex gap-3 text-gray-700'>
                <span className='flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[--soft] text-xs font-bold text-[--brand]'>1</span>
                <span>Download the checklist mentioned above.</span>
              </li>
              <li className='flex gap-3 text-gray-700'>
                <span className='flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[--soft] text-xs font-bold text-[--brand]'>2</span>
                <span>Draft your initial goals based on the template.</span>
              </li>
              <li className='flex gap-3 text-gray-700'>
                <span className='flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[--soft] text-xs font-bold text-[--brand]'>3</span>
                <span>Discuss with your team or mentor.</span>
              </li>
            </ul>
          </div>

          <MLAITemplateResourceCTA />

          <div className='my-12 not-prose'>
            {/* Contextual CTA - Best placement for conversion */}
            <ArticleCompanyCTA
              title={`Build your deep learning skills with others`}
              body='Join the MLAI community to collaborate with fellow AI practitioners in Australia.'
              buttonText='Connect with MLAI'
              buttonHref='/contact'
              note='We are a not‑for‑profit community based in North Melbourne.'
            />
          </div>
        </div>

        <AuthorBio author={authorDetails} />

        <div className='mt-12'>
          <ArticleFAQ items={faqItems} />
        </div>

        <ArticleFooterNav backHref='/articles' topHref='#' />
      </div>
    </div>
  )
}
