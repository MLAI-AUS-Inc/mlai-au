import type { ReactNode } from 'react'
import { Home } from 'lucide-react'

import { ArticleFAQ } from '../../../components/articles/ArticleFAQ'
import AuthorBio from '../../../components/AuthorBio'
import { ArticleHeroHeader } from '../../../components/articles/ArticleHeroHeader'
import { ArticleImageBlock } from '../../../components/articles/ArticleImageBlock'
import { ArticleFooterNav } from '../../../components/articles/ArticleFooterNav'
import { QuoteBlock } from '../../../components/articles/QuoteBlock'
import { ArticleTocPlaceholder } from '../../../components/articles/ArticleTocPlaceholder'
import { AudienceGrid } from '../../../components/articles/AudienceGrid'
import { RocketLaunchIcon } from '@heroicons/react/24/outline'

/** ========== INPUTS (replace all placeholders) ========== */
const SERIES = 'Weekly Deep Dive into AI and ML Advancements & Updates'
const NEWSLETTER = 'AI Bits for Techies'
const TITLE = `${NEWSLETTER} | Issue #8 | 11 Mar 2026`
const HERO_IMAGE =
  'https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2Fmlai.au%2Fimages%2FChatGPT%20Image%20Jan%209%2C%202026%2C%2001_07_03%20PM.png?alt=media&token=d143aea5-9ffa-4674-906b-4d7fe020e2df'
const HERO_IMAGE_ALT = 'Scientific illustration of transient image classification'
const GEEKY_THOUGHT_IMAGE =
  'https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/geeky%20thought.png?alt=media&token=872aa2d4-e473-446a-bbf1-c1ed0d66e5e5'
const TOOLS_IMAGE =
  'https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/tools%20image.png?alt=media&token=da31d7a6-37f4-4519-b665-b81a997248c8'
const BOOK_RECOMMENDATION_IMAGE =
  'https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/book%20recommendation.png?alt=media&token=4e4ef417-d76a-48e4-b2e0-e3b8ba92fb51'

/** ===== FAQ ===== */
interface FAQ {
  id: number
  question: string
  answer: ReactNode
}

export const faqItems: FAQ[] = [
  {
    id: 1,
    question: 'How does Proton work without a virtual machine?',
    answer:
      'Proton uses a combination of Wine (a Windows API reimplementation for Linux), DXVK (a Vulkan-based DirectX translation layer), and VKD3D-Proton (for DirectX 12). Together, these translate Windows system calls and graphics API calls into their Linux and Vulkan equivalents in real time—entirely in user space, on the same kernel. There is no hardware virtualization, no separate OS instance, and no hypervisor overhead. It is translation, not emulation, which is why the performance gap is far smaller than intuition suggests.',
  },
  {
    id: 2,
    question: "Does the 'Proton advantage' apply to developer workloads, not just games?",
    answer:
      'Directly, no—the paper benchmarks GPU-bound gaming workloads specifically. But the underlying principle applies everywhere: Windows background overhead (telemetry services, Update Orchestrator, service host processes) is a fixed CPU and RAM cost regardless of what you are running. Developer workloads—compilers, container runtimes, ML training loops—are often more sensitive to idle overhead than GPU-bound games. If Proton can close the gap in the domain Windows was built to dominate, native Linux toolchains have a stronger advantage in the domains it was not.',
  },
  {
    id: 3,
    question: 'Is WSL2 the Windows equivalent of Proton—a compatibility layer that closes the gap?',
    answer:
      'Architecturally similar, practically different. WSL2 runs a full Linux kernel inside a Hyper-V lightweight VM—so it is virtualization, not translation. Proton runs Windows API calls natively on a Linux kernel without a VM boundary. WSL2 is excellent for developer tooling and has minimal overhead for most tasks, but it still crosses a hypervisor boundary for I/O and networking. Proton has no such boundary. For raw Linux performance on Windows hardware, WSL2 is the closest analogue—but the architectural gap means it cannot replicate a bare-metal Linux environment.',
  },
]

export const summaryHighlights = {
  heading: `${NEWSLETTER} | Issue #8`,
  intro:
    'A peer-reviewed Springer paper from ICCCI 2023 benchmarks Proton (Linux’s Windows compatibility layer) against native Windows and finds that Linux’s lower idle overhead can neutralise—and sometimes reverse—the expected performance penalty of running through a translation layer.',
  items: [
    {
      label: 'Where does the compatibility layer actually bite?',
      description:
        'Kopel & Bożek (Wroclaw University of Science and Technology) put Proton head-to-head against native Windows across a controlled benchmark suite. In several workloads, Linux running Windows software through a translation layer matched or beat native Windows—largely because Windows’ own background overhead quietly bled performance on the native side.',
    },
    {
      label: 'What is the “translation tax”—and why is it sometimes negative?',
      description:
        'Proton (a fork of Wine) strips away Windows session management, telemetry, and service-host overhead that native Windows carries as fixed cost. For compute-heavy, GPU-bound workloads, Proton’s translation overhead can be smaller than the Windows idle tax. The better question becomes: how much is Windows losing to itself?',
    },
    {
      label: 'What should builders take away?',
      description:
        'Stop treating compatibility as the enemy of performance. A lean, transparent kernel with explicit overhead (Proton) can outperform a “native” environment burdened by opaque system load. If Proton can neutralise Windows’ gaming advantage, what does that signal for your containerised dev stack, CI pipelines, and inference workloads? The floor has shifted.',
    },
  ],
}

export const useCustomHeader = true

export default function ArticlePage() {
  const authors = [
    {
      name: 'Dr Sam Donegan',
      role: 'Founder & Lead Editor',
      bio: 'Sam leads the MLAI editorial team, combining deep research in machine learning with practical guidance for Australian teams adopting AI responsibly.',
      avatarUrl:
        'https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/1732146096971.jpeg?alt=media&token=8cbc3057-565b-48d0-be4f-e786332a6376',
      url: 'https://www.linkedin.com/in/samueldonegan',
    },
    {
      name: 'Jun Kai (Luc) Chang',
      role: 'AI Software Developer',
      bio: 'Luc is an AI Software Developer at Monash AIM, building neural networks on FPGA boards. He is pursuing a Master of AI at Monash and co-founding a startup in the event space.',
      avatarUrl:
        'https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/1708509977925.jpeg?alt=media&token=57e9f02a-7209-4ff0-89d3-bd79e23cc8cb',
      url: 'https://www.linkedin.com/in/jkchangjobs',
    },
    {
      name: 'Julia Ponder',
      role: 'Technical Writer',
      bio: 'Julia specialises in translating developer jargon into plain English. She creates clear, expertly formatted documentation and tests products before they go to market.',
      avatarUrl:
        'https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/1702549233653.jpeg?alt=media&token=9ae8a7a5-58a0-4b3d-be4a-5699d2ca3a7c',
      url: 'https://www.linkedin.com/in/julia-ponder-australia/',
    },
    {
      name: 'Shivang Shekhar',
      role: 'Technical Writer',
      bio: 'Shivang is a mechanical engineer and AI masters student at Monash University with a diverse science background. He is the main author for AI Bits for Techies each week.',
      avatarUrl:
        'https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/shivang%20profile%20pic%20(1).png?alt=media&token=0e31c4ae-9e56-48db-9779-065753982748',
      url: 'https://www.linkedin.com/in/shivang-s-466458191',
    },
  ]

  const breadcrumbs = [
    { label: 'Home', href: '/articles', icon: Home },
    { label: NEWSLETTER, current: true },
  ]

  return (
    <div>
      <ArticleHeroHeader
        breadcrumbs={breadcrumbs}
        title={TITLE}
        titleHighlight="Issue #8"
        headerBgColor="cyan"
        summary={{
          heading: summaryHighlights.heading,
          intro: summaryHighlights.intro,
          items: summaryHighlights.items,
        }}
        heroImage={HERO_IMAGE}
        heroImageAlt={HERO_IMAGE_ALT}
      />

      <QuoteBlock
        variant="purple"
        title="Quick note"
        icon={<span className="text-xl">💡</span>}
        className="my-6"
      >
        This issue zooms in on an unexpected finding from a Springer-published ICCCI 2023 paper: that Linux running
        Windows software through the Proton compatibility layer can match or exceed native Windows performance—exposing
        the hidden cost of Windows&apos; own service stack. Part of the {SERIES} series.
      </QuoteBlock>

      <ArticleTocPlaceholder className="mb-12">
        {/* Rendered via portal by ArticleEnhancer */}
      </ArticleTocPlaceholder>

      <AudienceGrid
        heading="Read this if you are:"
        cards={[
          {
            title: 'Founders & Engineering Teams',
            description:
              "The Proton findings are a business case in disguise. If a compatibility layer on Linux can match native Windows in the most hardware-optimized consumer software category on earth, your engineering team's argument for a Linux dev and deployment stack just got peer-reviewed backing. The “but our tools only run on Windows” objection has an answer now—and it is called Bottles.",
            variant: 'orange',
            icon: <RocketLaunchIcon className="w-5 h-5 text-white" strokeWidth={1.8} />,
          },
          {
            title: 'Students & Career Switchers',
            description:
              "The Springer paper is your cheat code for the “but Linux is hard” conversation. Bookmark the DOI. The data shows that not only is Linux viable for Windows workloads via Proton—it is sometimes faster. Understanding why (idle overhead, driver model, kernel transparency) is the conceptual foundation for systems interviews, cloud certifications, and DevOps roles where Linux fluency is table stakes.",
            variant: 'purple',
            icon: (
              <svg
                className="w-5 h-5 text-white"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5"
                />
              </svg>
            ),
          },
          {
            title: 'Community Builders & Open Source Contributors',
            description:
              'Proton is one of the most consequential open-source projects of the last decade—not because it is technically brilliant (though it is), but because it changed the economic calculus of Linux adoption for millions of users. The Steam Deck put a Linux kernel in the hands of people who had never heard of a kernel. That is community building at infrastructure scale. The lesson: the best way to grow an open ecosystem is to make switching cost zero.',
            variant: 'yellow',
            icon: (
              <svg
                className="w-5 h-5 text-black"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"
                />
              </svg>
            ),
          },
        ]}
        className="my-10"
      />

      {/* Main content */}
      <div className="">
        <h2>{TITLE}</h2>

        <p>
          Your weekly Aussie-flavoured deep dive into what changed in AI/ML, what matters, and what to do next (without
          living on release-note social media).
        </p>

        <p>
          <strong>This week in one breath:</strong> A Springer LNCS paper from ICCCI 2023 benchmarks Proton (Linux&apos;s
          Windows compatibility layer) against native Windows across GPU-bound workloads, revealing that Linux&apos;s
          lower idle overhead can neutralise and sometimes reverse the expected performance penalty of running software
          through a translation layer. The &quot;Compatibility Tax&quot; is real—but so is the &quot;Windows Idle Tax,&quot;
          and on many workloads, the latter is larger. Plus three tools redefining cross-platform development, and a
          book that asks why we keep building walls between operating environments in the first place.
        </p>

        <hr className="my-8 border-gray-100" />

        <ArticleImageBlock src={HERO_IMAGE} alt={HERO_IMAGE_ALT} />

        <h2>Journal Paper of the Week</h2>
        <h3>
          <strong>
            &quot;Is Proton Good Enough?&quot; — A Performance Comparison Between Gaming on Windows and Linux
          </strong>
        </h3>

        <h4>The Context</h4>
        <p>
          Proton is Valve&apos;s fork of Wine—a compatibility layer that allows Windows-native software to run on Linux
          without a virtual machine. It gained mainstream relevance with the Steam Deck: a Linux-based handheld console
          whose entire game library is Windows-native. The core question Kopel &amp; Bożek set out to answer was
          deceptively simple: when a Linux system runs Windows games through Proton, how much performance does it
          sacrifice compared to running those same games on native Windows? The answer complicated the question
          entirely.
        </p>

        <h4>The Method &amp; Results</h4>
        <p>
          The researchers ran standardised GPU-bound gaming benchmarks across identical hardware configurations—one
          running Windows natively, one running Linux with Proton as the translation layer. Key findings:
        </p>
        <ul>
          <li>
            <strong>Proton overhead is real but bounded:</strong> The compatibility layer introduces measurable
            translation overhead—but it is GPU-bound overhead, which modern hardware absorbs efficiently. The per-frame
            CPU cost of translation was consistently smaller than expected.
          </li>
          <li>
            <strong>Windows idle tax closes the gap:</strong> Native Windows&apos; background service stack—telemetry,
            Windows Update scheduling, service host processes—consumed enough CPU and memory headroom that the net
            performance gap between native Windows and Proton/Linux was narrower than any compatibility-layer theory
            would predict.
          </li>
          <li>
            <strong>Workload-dependent crossover:</strong> In several tested titles, Linux via Proton matched native
            Windows frame rates. In GPU-constrained scenarios, the lower Linux idle baseline gave Proton the headroom to
            perform comparably—sometimes marginally faster.
          </li>
          <li>
            <strong>Steam Deck validation:</strong> The findings directly validate Valve&apos;s architectural bet: that a
            Linux kernel with Proton can serve as a credible Windows-game platform, not in spite of the compatibility
            layer, but partly because of Linux&apos;s lower system overhead.
          </li>
        </ul>

        <h4>Why It Matters</h4>
        <p>
          This paper matters beyond gaming. It is a controlled, peer-reviewed demonstration that the &quot;native OS
          advantage&quot; is not fixed—it is a function of what the OS is doing when you are not looking. If
          Windows&apos; background load is large enough, a compatibility layer running on a leaner kernel can neutralise
          it.
        </p>
        <p>
          For developers, this is the empirical basis for a harder question: if Proton can close the gap in gaming, what
          can a native Linux stack do for your containerised workloads, your ML training runs, your build pipelines—
          where you do not even need a compatibility layer at all?
        </p>

        <p>
          <strong>Full paper link:</strong>
          <br />
          <a href="https://link.springer.com/chapter/10.1007/978-3-031-41456-5_48" target="_blank" rel="noopener noreferrer">
            https://link.springer.com/chapter/10.1007/978-3-031-41456-5_48
          </a>
          <br />
          <a href="https://www.researchgate.net/publication/373891609" target="_blank" rel="noopener noreferrer">
            https://www.researchgate.net/publication/373891609
          </a>
        </p>

        <hr className="my-8 border-gray-100" />

        {TOOLS_IMAGE && (
          <ArticleImageBlock src={TOOLS_IMAGE} alt="Tools worth poking this week" />
        )}

        <h2>AI tools worth checking out</h2>

        <h3>Proton (Valve / Steam)</h3>
        <p>
          <strong>Best for:</strong> Running the Windows software ecosystem on Linux without a VM. The subject of this
          week&apos;s paper, Proton has matured into a production-grade compatibility layer—not a workaround. For
          developers who need Windows-only tools but want a Linux kernel underneath, it is the most battle-tested bridge
          available.
          <br />
          <a href="https://github.com/ValveSoftware/Proton" target="_blank" rel="noopener noreferrer">
            https://github.com/ValveSoftware/Proton
          </a>
        </p>

        <h3>Distrobox</h3>
        <p>
          <strong>Best for:</strong> Running any Linux distribution inside any other, with full hardware and display
          access. Distrobox lets you run a containerised Ubuntu environment inside Arch, or a Fedora toolbox inside
          Ubuntu—eliminating the &quot;but my distro doesn&apos;t have this package&quot; friction without leaving your
          kernel.
          <br />
          <a href="https://github.com/89luca89/distrobox" target="_blank" rel="noopener noreferrer">
            https://github.com/89luca89/distrobox
          </a>
        </p>

        <h3>Bottles</h3>
        <p>
          <strong>Best for:</strong> Running Windows applications on Linux through a polished, GUI-managed Wine/Proton
          environment. Where Proton is Steam-centric, Bottles is generalist—letting you create isolated Windows
          &quot;bottles&quot; for any app: productivity tools, proprietary CAD software, legacy enterprise apps.
          <br />
          <a href="https://usebottles.com/" target="_blank" rel="noopener noreferrer">
            https://usebottles.com/
          </a>
        </p>

        <ArticleImageBlock src={BOOK_RECOMMENDATION_IMAGE} alt="Book cover" />

        <h2>Book recommendation (because your brain deserves more than changelogs)</h2>
        <h3>Just for Fun: The Story of an Accidental Revolutionary — Linus Torvalds &amp; David Diamond</h3>
        <p>
          <strong>Why it matters:</strong> If the Kopel &amp; Bożek paper is about what Linux can do, this book is about
          why Linux exists at all—and why that origin story is inseparable from its architecture. Torvalds did not build
          Linux to beat Windows. He built it because he wanted a kernel he could understand completely, control
          entirely, and modify freely. The performance advantages we measure today—the lower idle overhead, the
          transparent driver model, the modularity that lets Proton work at all—are downstream of that original
          motivation.
        </p>
        <p>
          <strong>The gist:</strong> What makes this book essential reading for builders is not the nostalgia. It is the
          lesson that the best infrastructure is often built by someone solving their own problem with total clarity of
          purpose, not by a committee optimising for market share. Torvalds did not ask permission to make a different
          kind of OS. He just wrote one. The Springer paper this week is, in a sense, peer-reviewed evidence that it
          worked. If you want to understand not just how Linux performs but why it is the way it is—this is the origin
          story your dev stack is running on.
        </p>

        <hr className="my-8 border-gray-100" />

        {GEEKY_THOUGHT_IMAGE && (
          <ArticleImageBlock
            src={GEEKY_THOUGHT_IMAGE}
            alt="Geeky thought of the week"
          />
        )}

        <h2>Geeky thought of the week</h2>
        <p className="font-semibold">
          The Proton paradox is a mirror for every abstraction debate in engineering.
        </p>
        <p>
          We spend enormous energy trying to go &quot;native&quot;—native cloud, native ARM, native GPU. The assumption is
          that proximity to the metal always wins. But the Kopel &amp; Bożek data suggests the real question is not
          &quot;how close are you to the hardware?&quot;—it is &quot;how much is everything else between you and the
          hardware costing you?&quot;
        </p>
        <p>
          A well-designed abstraction layer on a clean foundation can outperform a native implementation on a cluttered
          one. This is true of Proton on Linux vs. native Windows. It is also true of a well-written interpreted
          language on an efficient runtime vs. poorly optimised compiled code. The &quot;native&quot; label is a ceiling,
          not a guarantee.
        </p>
        <p>
          So here is the uncomfortable question: if your &quot;native&quot; environment is carrying enough invisible
          load, is the &quot;compatibility tax&quot; you feared actually cheaper than the &quot;familiarity tax&quot; you
          never measured?
        </p>

        <hr className="my-10 border-gray-100" />

        <h2>Housekeeping (so we stay honest)</h2>
        <p>
          This is general information, not legal advice. If you ship user-facing AI, be transparent about
          where AI is used, what it cannot do, and where humans stay in the loop.
        </p>

        <AuthorBio authors={authors} className="mt-8" />
      </div>

      <div className="mt-12">
        <ArticleFAQ items={faqItems} />
      </div>

      <ArticleFooterNav />
    </div>
  )
}

