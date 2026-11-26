import { Suspense, useState, useRef, useEffect } from "react";
import { Await } from "react-router";
import CTA from "~/components/CTA";
import SectionDivider from "~/components/SectionDivider";
import UpcomingEvents from "~/components/UpcomingEvents";
import Feature from "~/components/feature";
import Hero from "~/components/hero";
import SubstackUpdates from "~/components/SubstackUpdates";
import FeaturedArticles from "~/components/FeaturedArticles";
import Team from "~/components/team";
import TetrisTestimonials from "~/components/TetrisTestimonials";
import { TestimonialCloud } from "~/components/testimonial-tetris";
import { LogoShooter, useLogoPreloader, LoadingOverlay } from "~/components/logo-shooter";
import { SPONSOR_LOGOS } from "~/components/logo-shooter/logoData";
import { LogoMarquee } from "~/components/LogoMarquee";
import FounderTools from "~/components/FounderTools";
import MlaiStudioTeaser from "~/components/MlaiStudioTeaser";

// Split logos into 3 rows for marquee animation
const ROW_1_LOGOS = SPONSOR_LOGOS.slice(0, 13);
const ROW_2_LOGOS = SPONSOR_LOGOS.slice(13, 26);
const ROW_3_LOGOS = SPONSOR_LOGOS.slice(26);

type LogoCloudState = 'compact' | 'expanding' | 'playing';

function UpcomingEventsSkeleton() {
  return (
    <div className="mp-sec">
      <div className="mp-bill mp-bill--a2 px-4 py-12 sm:px-8" data-mp-ink="purple">
        <div className="max-w-7xl mx-auto">
          <div className="mp-skel h-10 w-1/3 mb-10" />
          <div className="grid grid-cols-1 gap-5">
            {[1, 2, 3].map((i) => (
              <div key={i} className="mp-skel h-24" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function SubstackUpdatesSkeleton() {
  return (
    <div className="mp-sec">
      <div className="mp-bill mp-bill--a4 px-4 py-12 sm:px-8" data-mp-ink="yellow">
        <div className="max-w-7xl mx-auto">
          <div className="mp-skel h-10 w-1/3 mb-10" />
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div key={i}>
                <div className="mp-skel h-48 mb-4" />
                <div className="mp-skel h-6 w-3/4 mb-2" />
                <div className="mp-skel h-4 w-full" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Home({ events, substackPosts }: { events: Promise<any>, substackPosts: Promise<any> }) {
  // State machine for logo cloud → logo shooter transition
  const [logoCloudState, setLogoCloudState] = useState<LogoCloudState>('compact');
  const [isHeightExpanded, setIsHeightExpanded] = useState(false);
  const { preloadLogos, loadingState, imageCache } = useLogoPreloader();
  const mouseLeaveTimeoutRef = useRef<number | null>(null);

  // Transition to playing when both loading complete AND height expanded
  useEffect(() => {
    if (
      logoCloudState === 'expanding' &&
      loadingState.status === 'loaded' &&
      isHeightExpanded
    ) {
      setLogoCloudState('playing');
    }
  }, [logoCloudState, loadingState.status, isHeightExpanded]);

  const handleActivate = () => {
    // Cancel any pending leave timeout
    if (mouseLeaveTimeoutRef.current) {
      clearTimeout(mouseLeaveTimeoutRef.current);
      mouseLeaveTimeoutRef.current = null;
    }

    if (logoCloudState === 'compact') {
      setLogoCloudState('expanding');
      preloadLogos();
    }
  };

  const handleDeactivate = () => {
    // Small debounce to prevent flickering on rapid hover in/out
    mouseLeaveTimeoutRef.current = window.setTimeout(() => {
      setLogoCloudState('compact');
      setIsHeightExpanded(false);
    }, 100);
  };

  const handleTransitionEnd = (e: React.TransitionEvent) => {
    // Detect when height transition completes
    if (e.propertyName === 'min-height' && logoCloudState === 'expanding') {
      setIsHeightExpanded(true);
    }
  };

  // Determine if game should be visually active (for styling)
  const isExpanded = logoCloudState !== 'compact';

  return (
    <main className="mp-page mp-wall">
      {/* Hero section */}
      <Hero />

      {/* ===== HELLO SECTION ===== */}
      {/* Starts at Logo Cloud (NAB sponsors), ends at Events */}
      <section id="hello">
        {/* Hello section divider - Orange */}
        <SectionDivider color="#ff3d00" />

        {/* Logo Cloud - Hover/Tap to Activate Shooter Game! */}
        <div className="mp-sec relative">
          <i className="mp-tp mp-tp--duct mp-tp--tr" aria-hidden="true" />
          <div
            id="logoCloud"
            className={`mp-logos py-6 sm:py-8 relative z-10 transition-all duration-500 overflow-hidden ${isExpanded
              ? 'min-h-[500px] sm:min-h-[600px] lg:min-h-[750px]'
              : 'min-h-[300px] sm:min-h-[350px]'
              } ${logoCloudState === 'playing'
                ? 'bg-black cursor-crosshair'
                : 'bg-[var(--brutalist-orange)] cursor-default'
              }`}
            onMouseEnter={handleActivate}
            onMouseLeave={handleDeactivate}
            onTouchStart={handleActivate}
            onTransitionEnd={handleTransitionEnd}
          >
            {/* Loading overlay - shown during 'expanding' state */}
            {logoCloudState === 'expanding' && (
              <LoadingOverlay
                loaded={loadingState.loaded}
                total={loadingState.total}
              />
            )}

            {/* Logo Shooter Game - Only mount when 'playing' */}
            {logoCloudState === 'playing' && (
              <div className="absolute inset-0 z-20">
                <LogoShooter imageCache={imageCache} />
              </div>
            )}

            {/* Close button for mobile - shown when playing */}
            {logoCloudState === 'playing' && (
              <button
                className="mp-x absolute top-4 right-4 z-30 w-11 h-11 flex items-center justify-center touch-action-manipulation"
                onClick={(e) => {
                  e.stopPropagation();
                  setLogoCloudState('compact');
                  setIsHeightExpanded(false);
                }}
                aria-label="Close game"
              >
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}

            {/* Animated Logo Marquee - 3 rows with alternating directions */}
            <div className={`transition-opacity duration-500 ${logoCloudState !== 'compact' ? 'opacity-0 pointer-events-none' : 'opacity-100'
              }`}>
              <div className="space-y-2 py-2">
                <LogoMarquee logos={ROW_1_LOGOS} direction="left" duration={40} paused={isExpanded} />
                <LogoMarquee logos={ROW_2_LOGOS} direction="right" duration={40} paused={isExpanded} />
                <LogoMarquee logos={ROW_3_LOGOS} direction="left" duration={40} paused={isExpanded} />
              </div>

              <div className="mt-4 flex justify-center px-2">
                <p className="mp-logos-note">
                  <span className="block sm:inline">
                    Our events have been sponsored and supported by over 50 awesome
                    organisations across Australia.{" "}
                  </span>
                  <a href="/sponsors" className="mp-logos-link whitespace-nowrap">
                    Become a sponsor <span aria-hidden="true">&rarr;</span>
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Feature/About section - "We Are MLAI" */}
        <Feature />
      </section>

      {/* ===== EVENTS SECTION ===== */}
      {/* Starts at "Upcoming Events", ends at Founder Tools */}
      <section id="events">
        {/* Events section divider - Purple */}
        <SectionDivider color="#4b0db3" />

        {/* Upcoming Events */}
        <Suspense fallback={<UpcomingEventsSkeleton />}>
          <Await resolve={events} errorElement={<div className="mp-type py-8 text-center text-[var(--mp-paper)]">Unable to load events</div>}>
            {(resolvedEvents) => <UpcomingEvents events={resolvedEvents} />}
          </Await>
        </Suspense>
      </section>

      {/* ===== FOUNDER TOOLS SECTION ===== */}
      {/* Starts at "Get templates and checklists", ends at People */}
      <section id="founder-tools">
        {/* Founder Tools section divider - Black */}
        <SectionDivider color="#1a1a1a" />

        {/* Founder Tools Component */}
        <FounderTools />
      </section>

      {/* ===== VOLUNTEER SECTION ===== */}
      {/* Starts at "We are proud to have worked with amazing people", ends at Articles */}
      <section id="people">
        {/* Volunteer section divider - Blue */}
        <SectionDivider color="#3537dc" />

        {/* Testimonials - Hover to Play Tetris */}
        {/* ============================================
            TESTIMONIAL CLOUD - Hover/Tap to Play
            ============================================
            Shows static testimonial cards by default.
            On hover/tap: blue loading screen → Tetris game
            Similar to logo shooter hover-to-play pattern.
            ============================================ */}
        <TestimonialCloud />

        {/* Team section - moved here directly under testimonials */}
        <Team />
      </section>

      {/* ===== MLAI STUDIO SECTION ===== */}
      {/* Teaser intro that links through to the full /mlai-studio landing page */}
      <section id="mlai-studio">
        {/* MLAI Studio section divider - Crimson */}
        <SectionDivider color="#ff003d" />

        {/* MLAI Studio teaser */}
        <MlaiStudioTeaser />
      </section>

      {/* ===== ARTICLES SECTION ===== */}
      {/* Starts at "weekly updates from MLAI Aus", ends at footer */}
      <section id="articles">
        {/* Articles section divider - Yellow */}
        <SectionDivider color="#fefc22" />

        {/* Substack Updates */}
        <Suspense fallback={<SubstackUpdatesSkeleton />}>
          <Await resolve={substackPosts} errorElement={<div className="mp-type py-8 text-center text-[var(--mp-paper)]">Unable to load updates</div>}>
            {(resolvedPosts) => <SubstackUpdates posts={resolvedPosts} />}
          </Await>
        </Suspense>

        {/* Featured Articles Grid */}
        <FeaturedArticles />
      </section>

      {/* ===== SPONSOR SECTION (Placeholder) ===== */}
      {/* Hidden placeholder for future sponsor content */}
      <section id="sponsor" className="hidden" aria-hidden="true">
        {/* Placeholder for future sponsor section content */}
      </section>

      {/* CTA section */}
      <CTA />
    </main>
  );
}
