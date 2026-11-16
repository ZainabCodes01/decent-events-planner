import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowRight,
  Bookmark,
  Navigation,
  Phone,
  Share2,
  MessageCircle,
  Check,
  ChevronLeft,
  ChevronRight,
  Maximize2,
} from 'lucide-react';
import {
  BUSINESS_INFO,
  ClientReview,
  HERO_REEL_ITEMS,
  INITIAL_REVIEWS,
  InteractiveHotspot,
  MOOD_THEMES,
  MoodThemeId,
  ShowcaseProject,
} from './data/plannerData';
import { Navbar } from './components/Navbar';
import { SafeImage } from './components/SafeImage';
import { InteractiveEventStudio } from './components/InteractiveEventStudio';
import { ShowcaseSection } from './components/ShowcaseSection';
import { ServicesSection } from './components/ServicesSection';
import { ScopeEstimator } from './components/ScopeEstimator';
import { ReviewsSection } from './components/ReviewsSection';
import { ContactLocationSection } from './components/ContactLocationSection';
import { ConsultationModal } from './components/ConsultationModal';
import { SavedLookbookDrawer } from './components/SavedLookbookDrawer';

export default function App() {
  const [activeTheme, setActiveTheme] = useState<MoodThemeId>('emerald');
  const [heroSlide, setHeroSlide] = useState(0);
  const [externalProjectId, setExternalProjectId] = useState<string | null>(
    null
  );

  const [savedIds, setSavedIds] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem('dep_saved_lookbook');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const [reviews, setReviews] = useState<ClientReview[]>(() => {
    try {
      const stored = localStorage.getItem('dep_client_reviews');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
      return INITIAL_REVIEWS;
    } catch {
      return INITIAL_REVIEWS;
    }
  });

  const [bookingOpen, setBookingOpen] = useState(false);
  const [lookbookOpen, setLookbookOpen] = useState(false);
  const [bookingService, setBookingService] = useState<string | undefined>(
    undefined
  );
  const [bookingNotes, setBookingNotes] = useState<string | undefined>(
    undefined
  );
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [profileSaved, setProfileSaved] = useState(false);

  // Sync live theme palette to root document
  useEffect(() => {
    document.documentElement.setAttribute('data-palette', activeTheme);
  }, [activeTheme]);

  // Subtle auto-advance on Hero Event Reel
  useEffect(() => {
    const timer = setInterval(() => {
      setHeroSlide((prev) => (prev + 1) % HERO_REEL_ITEMS.length);
    }, 6500);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('dep_saved_lookbook', JSON.stringify(savedIds));
    } catch {
      // ignore storage errors
    }
  }, [savedIds]);

  useEffect(() => {
    try {
      localStorage.setItem('dep_client_reviews', JSON.stringify(reviews));
    } catch {
      // ignore storage errors
    }
  }, [reviews]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 2800);
  };

  const handleToggleSaveProject = (id: string) => {
    setSavedIds((prev) => {
      const exists = prev.includes(id);
      const next = exists ? prev.filter((item) => item !== id) : [...prev, id];
      showToast(
        exists ? 'Removed from Saved Lookbook' : 'Added to Saved Lookbook'
      );
      return next;
    });
  };

  const handleOpenBooking = (service?: string, notes?: string) => {
    setBookingService(service);
    setBookingNotes(notes);
    setBookingOpen(true);
  };

  const handleBookConcept = (project: ShowcaseProject) => {
    const mappedService =
      project.category === 'Baraat & Walima' ||
      project.category === 'Nikkah & Mehndi' ||
      project.category === 'Gala & Qawwali'
        ? 'Marquee Interior Design'
        : 'Door Design';

    handleOpenBooking(
      mappedService,
      `Inspired by showcase project: "${project.title}" (${project.location})`
    );
  };

  const handleAddBlueprintElement = (
    sceneTitle: string,
    hotspot: InteractiveHotspot
  ) => {
    handleOpenBooking(
      'Marquee Interior Design',
      `Selected from 2026 Studio (${sceneTitle}): ${hotspot.label} (${hotspot.material}, est. ${hotspot.addonPrice})`
    );
  };

  const handleThemeChange = (nextTheme: MoodThemeId) => {
    setActiveTheme(nextTheme);
    const meta = MOOD_THEMES.find((t) => t.id === nextTheme);
    if (meta) {
      showToast(`Color theme switched to ${meta.name}`);
    }
  };

  const handleShareProfile = async () => {
    const shareText = `${BUSINESS_INFO.name} — Events Planner & Interior Designer. ${BUSINESS_INFO.address}. Call/WhatsApp: ${BUSINESS_INFO.phoneDisplay}`;
    try {
      if (navigator.share) {
        await navigator.share({
          title: BUSINESS_INFO.name,
          text: shareText,
          url: window.location.href,
        });
      } else {
        await navigator.clipboard.writeText(
          `${shareText}\n${window.location.href}`
        );
        showToast('Business card & link copied to clipboard');
      }
    } catch {
      try {
        await navigator.clipboard.writeText(shareText);
        showToast('Business details copied to clipboard');
      } catch {
        showToast('Ready to share: 0309 5908032');
      }
    }
  };

  const handleSaveBusinessProfile = () => {
    setProfileSaved((prev) => {
      const next = !prev;
      showToast(
        next
          ? 'Saved Decent Events Planner to your favorites'
          : 'Removed from saved favorites'
      );
      return next;
    });
  };

  const handleAddReview = (newReview: ClientReview) => {
    setReviews((prev) => [newReview, ...prev]);
    showToast('Thank you — your review is now published');
  };

  const currentHeroItem = HERO_REEL_ITEMS[heroSlide];

  return (
    <div
      id="top"
      className="min-h-screen flex flex-col text-[#0F1E1A] transition-colors duration-300"
      style={{ backgroundColor: 'var(--theme-canvas)' }}
    >
      <Navbar onOpenBooking={() => handleOpenBooking()} />

      <main className="flex-1">
        {/* Hero Split-Screen with Interactive Trending 2026 Event Reel */}
        <section className="pt-10 pb-14 md:pt-14 md:pb-16">
          <div className="max-w-[1280px] mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
              {/* Left Column: Editorial Hierarchy & Quick Profile Actions */}
              <div className="lg:col-span-5 flex flex-col justify-between py-2">
                <div>
                  <p
                    className="text-xs font-medium mb-4"
                    style={{ color: 'var(--theme-accent)' }}
                  >
                    Sialkot & Lahore · Open 24 Hours · Interior Designer & Event Architect
                  </p>

                  <h1
                    className="font-serif text-[clamp(2.25rem,3.9vw,3.65rem)] leading-[1.06] font-semibold tracking-tight text-balance"
                    style={{ color: 'var(--theme-primary)' }}
                  >
                    Royal Events & Architectural Interiors
                  </h1>

                  <p className="mt-5 text-base text-[#524E48] leading-relaxed">
                    From crystal Baraat floral tunnels, golden-hour Nikkah pergolas, and sunken Qawwali courtyards to custom brass-inlay walnut doors, honed flooring, and turnkey home staging.
                  </p>

                  {/* Primary & Secondary Actions */}
                  <div className="mt-8 flex flex-wrap items-center gap-3.5">
                    <button
                      type="button"
                      onClick={() => handleOpenBooking()}
                      className="inline-flex items-center justify-center gap-2 px-6 py-3 text-xs sm:text-sm font-semibold text-white rounded-lg transition-colors duration-150 cursor-pointer whitespace-nowrap"
                      style={{ backgroundColor: 'var(--theme-primary)' }}
                    >
                      <span>Plan Your Event</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>

                    <a
                      href="#studio"
                      className="inline-flex items-center justify-center gap-2 px-5 py-3 text-xs sm:text-sm font-semibold bg-white border rounded-lg transition-colors duration-150 whitespace-nowrap"
                      style={{
                        color: 'var(--theme-primary)',
                        borderColor: 'var(--theme-border)',
                      }}
                    >
                      <span>Try Live Theme Studio</span>
                    </a>
                  </div>
                </div>

                {/* Quick Business Profile Actions */}
                <div
                  className="mt-10 pt-6 border-t"
                  style={{ borderColor: 'var(--theme-border)' }}
                >
                  <div className="flex flex-wrap items-center gap-x-5 gap-y-2.5 text-xs font-medium text-[#44403C]">
                    <a
                      href={BUSINESS_INFO.mapsQueryUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 hover:text-[#0F1E1A] transition-colors whitespace-nowrap"
                    >
                      <Navigation
                        className="w-3.5 h-3.5"
                        style={{ color: 'var(--theme-accent)' }}
                      />
                      <span>Directions</span>
                    </a>

                    <a
                      href={BUSINESS_INFO.phoneHref}
                      className="inline-flex items-center gap-1.5 hover:text-[#0F1E1A] transition-colors whitespace-nowrap tabular-nums"
                    >
                      <Phone
                        className="w-3.5 h-3.5"
                        style={{ color: 'var(--theme-accent)' }}
                      />
                      <span>{BUSINESS_INFO.phoneDisplay}</span>
                    </a>

                    <a
                      href={BUSINESS_INFO.whatsappBase}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 hover:text-[#0F1E1A] transition-colors whitespace-nowrap"
                    >
                      <MessageCircle
                        className="w-3.5 h-3.5"
                        style={{ color: 'var(--theme-accent)' }}
                      />
                      <span>WhatsApp</span>
                    </a>

                    <button
                      type="button"
                      onClick={handleSaveBusinessProfile}
                      className="inline-flex items-center gap-1.5 hover:text-[#0F1E1A] transition-colors cursor-pointer whitespace-nowrap"
                    >
                      {profileSaved ? (
                        <Check
                          className="w-3.5 h-3.5"
                          style={{ color: 'var(--theme-accent)' }}
                        />
                      ) : (
                        <Bookmark
                          className="w-3.5 h-3.5"
                          style={{ color: 'var(--theme-accent)' }}
                        />
                      )}
                      <span>{profileSaved ? 'Saved' : 'Save'}</span>
                    </button>

                    <button
                      type="button"
                      onClick={handleShareProfile}
                      className="inline-flex items-center gap-1.5 hover:text-[#0F1E1A] transition-colors cursor-pointer whitespace-nowrap"
                    >
                      <Share2
                        className="w-3.5 h-3.5"
                        style={{ color: 'var(--theme-accent)' }}
                      />
                      <span>Share</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Right Column: Interactive Trending 2026 Event Reel */}
              <div className="lg:col-span-7 flex flex-col gap-3">
                <div
                  className="relative h-[320px] sm:h-[420px] lg:flex-1 lg:min-h-[430px] rounded-2xl overflow-hidden border bg-[#0C231E]"
                  style={{ borderColor: 'var(--theme-border)' }}
                >
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentHeroItem.id}
                      initial={{ opacity: 0.45, scale: 1.01 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0.45 }}
                      transition={{ duration: 0.4 }}
                      className="w-full h-full"
                    >
                      <SafeImage
                        src={currentHeroItem.image}
                        alt={currentHeroItem.title}
                        fallbackTitle={currentHeroItem.title}
                        className="w-full h-full object-cover"
                      />
                    </motion.div>
                  </AnimatePresence>

                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent pointer-events-none" />

                  {/* Top-Right Prev/Next & Inspect Controls */}
                  <div className="absolute top-4 right-4 flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() =>
                        setHeroSlide(
                          (prev) =>
                            (prev - 1 + HERO_REEL_ITEMS.length) %
                            HERO_REEL_ITEMS.length
                        )
                      }
                      aria-label="Previous featured event"
                      className="w-9 h-9 rounded-lg bg-black/55 hover:bg-black/80 text-white backdrop-blur-md flex items-center justify-center transition-colors cursor-pointer"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        setHeroSlide(
                          (prev) => (prev + 1) % HERO_REEL_ITEMS.length
                        )
                      }
                      aria-label="Next featured event"
                      className="w-9 h-9 rounded-lg bg-black/55 hover:bg-black/80 text-white backdrop-blur-md flex items-center justify-center transition-colors cursor-pointer"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => setExternalProjectId(currentHeroItem.projectId)}
                      aria-label="Inspect full event setup"
                      className="inline-flex items-center gap-1.5 px-3 h-9 rounded-lg bg-white/90 hover:bg-white text-[#0F1E1A] text-xs font-semibold backdrop-blur-md transition-colors cursor-pointer"
                    >
                      <Maximize2 className="w-3.5 h-3.5" />
                      <span>Inspect</span>
                    </button>
                  </div>

                  {/* Caption Overlay */}
                  <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6 text-white">
                    <p className="text-xs text-[#DFBA6F] font-medium">
                      {currentHeroItem.subtitle}
                    </p>
                    <p className="font-serif text-xl sm:text-2xl font-semibold mt-0.5">
                      {currentHeroItem.title}
                    </p>
                  </div>
                </div>

                {/* Interactive Thumbnail Reel Strip */}
                <div className="grid grid-cols-4 gap-2.5">
                  {HERO_REEL_ITEMS.map((item, idx) => {
                    const active = idx === heroSlide;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setHeroSlide(idx)}
                        className={`relative h-16 sm:h-20 rounded-xl overflow-hidden border transition-all cursor-pointer ${
                          active
                            ? 'ring-2 ring-offset-1 ring-[#0C231E] border-transparent opacity-100'
                            : 'border-[#E4DDD0] opacity-70 hover:opacity-100'
                        }`}
                      >
                        <SafeImage
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                        <span className="absolute bottom-1.5 left-2 right-2 text-[10px] font-medium text-white truncate text-left">
                          0{idx + 1}. {item.title.split(' ')[0]} {item.title.split(' ')[1]}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Full-Width 4-Column Key Profile Strip Below Hero Split */}
            <div
              className="mt-10 pt-8 border-t grid grid-cols-2 lg:grid-cols-4 gap-6"
              style={{ borderColor: 'var(--theme-border)' }}
            >
              <div>
                <p
                  className="font-serif text-2xl sm:text-3xl font-semibold tabular-nums"
                  style={{ color: 'var(--theme-primary)' }}
                >
                  24 Hours
                </p>
                <p className="text-xs text-[#524E48] mt-1">
                  Open daily for urgent event staging & site visits
                </p>
              </div>
              <div>
                <p
                  className="font-serif text-2xl sm:text-3xl font-semibold tabular-nums"
                  style={{ color: 'var(--theme-primary)' }}
                >
                  07 Disciplines
                </p>
                <p className="text-xs text-[#524E48] mt-1">
                  Marquee interiors, doors, flooring, art & home staging
                </p>
              </div>
              <div>
                <p
                  className="font-serif text-2xl sm:text-3xl font-semibold"
                  style={{ color: 'var(--theme-primary)' }}
                >
                  Lahore & Sialkot
                </p>
                <p className="text-xs text-[#524E48] mt-1">
                  Studio near Alrazzaq Marquee, Pusrur Bypass (51480)
                </p>
              </div>
              <div>
                <p
                  className="font-serif text-2xl sm:text-3xl font-semibold tabular-nums"
                  style={{ color: 'var(--theme-primary)' }}
                >
                  0309 5908032
                </p>
                <p className="text-xs text-[#524E48] mt-1">
                  Direct phone & WhatsApp appointment concierge
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Curated Specialties Editorial Divider */}
        <div
          className="border-t bg-white py-4 overflow-x-auto"
          style={{ borderColor: 'var(--theme-border)' }}
        >
          <div className="max-w-[1280px] mx-auto px-6 flex items-center justify-between gap-6 text-xs text-[#524E48] whitespace-nowrap">
            <span>Marquee Interior Design</span>
            <span aria-hidden="true">·</span>
            <span>Interior Decorating</span>
            <span aria-hidden="true">·</span>
            <span>Custom Art Selection</span>
            <span aria-hidden="true">·</span>
            <span>Door Design</span>
            <span aria-hidden="true">·</span>
            <span>Flooring Selection</span>
            <span aria-hidden="true">·</span>
            <span>Home Decor Selection</span>
            <span aria-hidden="true">·</span>
            <span>Home Staging</span>
          </div>
        </div>

        {/* Interactive 2026 Blueprint & Live Theme Studio */}
        <InteractiveEventStudio
          activeTheme={activeTheme}
          onChangeTheme={handleThemeChange}
          onAddBlueprintElement={handleAddBlueprintElement}
        />

        {/* 9-Project Trending Showcase Gallery */}
        <ShowcaseSection
          savedIds={savedIds}
          onToggleSave={handleToggleSaveProject}
          onOpenLookbook={() => setLookbookOpen(true)}
          onBookConcept={handleBookConcept}
          externalProjectId={externalProjectId}
          onClearExternalProject={() => setExternalProjectId(null)}
        />

        {/* Seven Core Services */}
        <ServicesSection
          onSelectServiceForBooking={(serviceTitle) =>
            handleOpenBooking(serviceTitle)
          }
        />

        {/* Interactive 2026 Scope Estimator */}
        <ScopeEstimator
          onLockScope={(summary, serviceTitle) =>
            handleOpenBooking(serviceTitle, summary)
          }
        />

        {/* Client Proof & Reviews */}
        <ReviewsSection reviews={reviews} onAddReview={handleAddReview} />

        {/* Location, Directions & Contact */}
        <ContactLocationSection
          onOpenBooking={() => handleOpenBooking()}
          onShareProfile={handleShareProfile}
        />
      </main>

      {/* Quiet Editorial Footer */}
      <footer
        className="border-t py-10"
        style={{
          backgroundColor: 'var(--theme-canvas)',
          borderColor: 'var(--theme-border)',
        }}
      >
        <div className="max-w-[1280px] mx-auto px-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <p
              className="font-serif text-xl font-semibold"
              style={{ color: 'var(--theme-primary)' }}
            >
              {BUSINESS_INFO.name}
            </p>
            <p className="text-xs text-[#524E48] mt-1">
              {BUSINESS_INFO.address} · {BUSINESS_INFO.hours}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-xs text-[#524E48]">
            <a href="#studio" className="hover:text-[#0F1E1A] transition-colors">
              Mood Studio
            </a>
            <a href="#showcase" className="hover:text-[#0F1E1A] transition-colors">
              Showcase
            </a>
            <a href="#services" className="hover:text-[#0F1E1A] transition-colors">
              Services
            </a>
            <a href="#estimator" className="hover:text-[#0F1E1A] transition-colors">
              Estimator
            </a>
            <a
              href={BUSINESS_INFO.phoneHref}
              className="font-medium tabular-nums"
              style={{ color: 'var(--theme-primary)' }}
            >
              {BUSINESS_INFO.phoneDisplay}
            </a>
          </div>
        </div>
      </footer>

      {/* Interactive Modals & Drawers */}
      <ConsultationModal
        isOpen={bookingOpen}
        onClose={() => setBookingOpen(false)}
        initialService={bookingService}
        initialNotes={bookingNotes}
        savedIds={savedIds}
      />

      <SavedLookbookDrawer
        isOpen={lookbookOpen}
        onClose={() => setLookbookOpen(false)}
        savedIds={savedIds}
        onRemove={handleToggleSaveProject}
        onBookLookbook={() =>
          handleOpenBooking(
            'Marquee Interior Design',
            'Consultation requested for saved lookbook styles.'
          )
        }
      />

      {/* Non-blocking Confirmation Toast */}
      {toastMessage && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-5 right-5 z-50 text-white text-xs font-medium px-4 py-3 rounded-lg shadow-lg border border-white/15"
          style={{ backgroundColor: 'var(--theme-primary)' }}
        >
          {toastMessage}
        </div>
      )}
    </div>
  );
}
