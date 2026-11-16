import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import {
  Bookmark,
  Maximize2,
  X,
  ArrowUpRight,
  Check,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import {
  SHOWCASE_PROJECTS,
  ShowcaseCategory,
  ShowcaseProject,
} from '../data/plannerData';
import { SafeImage } from './SafeImage';

interface ShowcaseSectionProps {
  savedIds: string[];
  onToggleSave: (id: string) => void;
  onOpenLookbook: () => void;
  onBookConcept: (project: ShowcaseProject) => void;
  externalProjectId?: string | null;
  onClearExternalProject?: () => void;
}

const CATEGORIES: ShowcaseCategory[] = [
  'All',
  'Baraat & Walima',
  'Nikkah & Mehndi',
  'Gala & Qawwali',
  'Interior & Doors',
];

export function ShowcaseSection({
  savedIds,
  onToggleSave,
  onOpenLookbook,
  onBookConcept,
  externalProjectId,
  onClearExternalProject,
}: ShowcaseSectionProps) {
  const [activeCategory, setActiveCategory] = useState<ShowcaseCategory>('All');
  const [selectedProject, setSelectedProject] = useState<ShowcaseProject | null>(
    null
  );

  const filteredProjects =
    activeCategory === 'All'
      ? SHOWCASE_PROJECTS
      : SHOWCASE_PROJECTS.filter((p) => p.category === activeCategory);

  useEffect(() => {
    if (externalProjectId) {
      const found = SHOWCASE_PROJECTS.find((p) => p.id === externalProjectId);
      if (found) setSelectedProject(found);
      onClearExternalProject?.();
    }
  }, [externalProjectId, onClearExternalProject]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedProject) return;
      if (e.key === 'Escape') {
        setSelectedProject(null);
      } else if (e.key === 'ArrowRight') {
        const idx = filteredProjects.findIndex((p) => p.id === selectedProject.id);
        const next = filteredProjects[(idx + 1) % filteredProjects.length];
        if (next) setSelectedProject(next);
      } else if (e.key === 'ArrowLeft') {
        const idx = filteredProjects.findIndex((p) => p.id === selectedProject.id);
        const prev =
          filteredProjects[
            (idx - 1 + filteredProjects.length) % filteredProjects.length
          ];
        if (prev) setSelectedProject(prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedProject, filteredProjects]);

  const navigateLightbox = (dir: 1 | -1) => {
    if (!selectedProject) return;
    const idx = filteredProjects.findIndex((p) => p.id === selectedProject.id);
    const nextIdx =
      (idx + dir + filteredProjects.length) % filteredProjects.length;
    setSelectedProject(filteredProjects[nextIdx]);
  };

  return (
    <section
      id="showcase"
      className="py-20 md:py-24 border-t"
      style={{ borderColor: 'var(--theme-border)' }}
    >
      <div className="max-w-[1280px] mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
          <div className="max-w-2xl">
            <p
              className="text-xs font-medium tracking-wide mb-2"
              style={{ color: 'var(--theme-accent)' }}
            >
              Curated Portfolio · 9 Trending 2026 Productions
            </p>
            <h2
              className="font-serif text-3xl sm:text-4xl font-semibold tracking-tight text-balance"
              style={{ color: 'var(--theme-primary)' }}
            >
              Trending Event Designs & Bespoke Interiors
            </h2>
            <p className="mt-3 text-base text-[#524E48] leading-relaxed">
              Browse 2026 Baraat crystal tunnels, golden-hour Nikkah pergolas, sunken Qawwali majlis setups, serpentine emerald receptions, and custom walnut doors.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={onOpenLookbook}
              className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold bg-white border rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              style={{
                color: 'var(--theme-primary)',
                borderColor: 'var(--theme-border)',
              }}
            >
              <Bookmark
                className="w-3.5 h-3.5"
                style={{ color: 'var(--theme-accent)' }}
              />
              <span className="tabular-nums">
                Saved Lookbook ({savedIds.length})
              </span>
            </button>
          </div>
        </div>

        {/* Category Segmented Filter Bar */}
        <div
          role="tablist"
          aria-label="Filter showcase by category"
          className="flex items-center gap-1.5 overflow-x-auto pb-2 mb-8"
        >
          <div className="inline-flex items-center gap-1 p-1 bg-black/5 rounded-lg">
            {CATEGORIES.map((cat) => {
              const active = activeCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3.5 py-2 text-xs font-medium rounded-md transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer ${
                    active
                      ? 'bg-white text-[#0F1E1A] shadow-xs'
                      : 'text-[#524E48] hover:text-[#0F1E1A]'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Asymmetric Bento Showcase Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[320px]">
          {filteredProjects.map((project, idx) => {
            const isSaved = savedIds.includes(project.id);
            const spanClass =
              activeCategory === 'All' && idx === 0
                ? 'md:col-span-2 md:row-span-2'
                : 'col-span-1 row-span-1';

            return (
              <motion.article
                layout
                key={project.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25 }}
                className={`group relative rounded-2xl overflow-hidden bg-[#ECEAE4] border ${spanClass}`}
                style={{ borderColor: 'var(--theme-border)' }}
              >
                <button
                  type="button"
                  onClick={() => setSelectedProject(project)}
                  aria-label={`Inspect ${project.title}`}
                  className="block w-full h-full text-left cursor-pointer"
                >
                  <SafeImage
                    src={project.image}
                    alt={`${project.title} — ${project.category} in ${project.location}`}
                    fallbackTitle={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                  />

                  {/* Measured contrast scrim */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

                  <div className="absolute inset-x-0 bottom-0 p-6 flex flex-col justify-end">
                    <div className="flex flex-wrap items-center gap-2 text-xs text-white/80 mb-1.5">
                      <span>{project.category}</span>
                      <span aria-hidden="true">·</span>
                      <span>{project.location}</span>
                      <span aria-hidden="true">·</span>
                      <span className="tabular-nums">{project.scale}</span>
                    </div>

                    <div className="flex items-end justify-between gap-4">
                      <h3 className="font-serif text-xl sm:text-2xl font-semibold text-white tracking-tight text-balance">
                        {project.title}
                      </h3>
                      <span className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-white/15 text-white backdrop-blur-sm group-hover:bg-white group-hover:text-[#0F1E1A] transition-colors shrink-0">
                        <Maximize2 className="w-4 h-4" />
                      </span>
                    </div>
                  </div>
                </button>

                {/* Save to Lookbook Button */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleSave(project.id);
                  }}
                  aria-label={
                    isSaved
                      ? `Remove ${project.title} from lookbook`
                      : `Save ${project.title} to lookbook`
                  }
                  className={`absolute top-4 right-4 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium backdrop-blur-md transition-colors cursor-pointer ${
                    isSaved
                      ? 'text-[#0F1E1A]'
                      : 'bg-black/45 text-white hover:bg-black/75'
                  }`}
                  style={
                    isSaved
                      ? { backgroundColor: 'var(--theme-accent-bright)' }
                      : undefined
                  }
                >
                  {isSaved ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>Saved</span>
                    </>
                  ) : (
                    <>
                      <Bookmark className="w-3.5 h-3.5" />
                      <span>Save</span>
                    </>
                  )}
                </button>
              </motion.article>
            );
          })}
        </div>
      </div>

      {/* Fullscreen Editorial Lightbox Modal with Prev/Next */}
      {selectedProject && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby="lightbox-title"
          onClick={() => setSelectedProject(null)}
        >
          <div
            className="bg-[#FAF8F4] border border-[#E4DDD0] rounded-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto grid grid-cols-1 lg:grid-cols-12"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Image Column with Navigation Arrows */}
            <div className="lg:col-span-7 relative min-h-[300px] lg:min-h-[540px] bg-[#0C231E]">
              <SafeImage
                src={selectedProject.image}
                alt={selectedProject.title}
                fallbackTitle={selectedProject.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-x-4 bottom-4 flex items-center justify-between pointer-events-none">
                <button
                  type="button"
                  onClick={() => navigateLightbox(-1)}
                  aria-label="Previous project"
                  className="pointer-events-auto w-10 h-10 rounded-full bg-black/60 hover:bg-black/85 text-white flex items-center justify-center transition-colors cursor-pointer"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  type="button"
                  onClick={() => navigateLightbox(1)}
                  aria-label="Next project"
                  className="pointer-events-auto w-10 h-10 rounded-full bg-black/60 hover:bg-black/85 text-white flex items-center justify-center transition-colors cursor-pointer"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Editorial Spec Column */}
            <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between gap-6">
              <div>
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="text-xs text-[#524E48] flex items-center gap-2">
                    <span>{selectedProject.category}</span>
                    <span aria-hidden="true">·</span>
                    <span>{selectedProject.year}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setSelectedProject(null)}
                    aria-label="Close project detail"
                    className="inline-flex items-center justify-center w-9 h-9 rounded-lg border border-[#E4DDD0] text-[#0F1E1A] hover:bg-black/5 transition-colors cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <h3
                  id="lightbox-title"
                  className="font-serif text-2xl sm:text-3xl font-semibold tracking-tight text-balance"
                  style={{ color: 'var(--theme-primary)' }}
                >
                  {selectedProject.title}
                </h3>

                <p
                  className="mt-2 text-xs font-medium"
                  style={{ color: 'var(--theme-accent)' }}
                >
                  {selectedProject.location} · {selectedProject.scale}
                </p>

                <p className="mt-4 text-sm text-[#44403C] leading-relaxed">
                  {selectedProject.summary}
                </p>

                <div className="mt-5 pt-5 border-t border-[#E4DDD0]">
                  <p className="text-xs font-semibold text-[#0F1E1A] mb-2">
                    {selectedProject.trend2026}
                  </p>
                  <p className="text-xs text-[#524E48] mb-3">
                    Primary Materials & Lighting
                  </p>
                  <ul className="space-y-1.5 text-xs text-[#0F1E1A]">
                    {selectedProject.materials.map((mat) => (
                      <li key={mat} className="flex items-center gap-2">
                        <span
                          className="w-1.5 h-1.5 rounded-full shrink-0"
                          style={{ backgroundColor: 'var(--theme-accent)' }}
                        />
                        <span>{mat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-5 pt-5 border-t border-[#E4DDD0]">
                  <p className="text-xs text-[#524E48] mb-2.5">Material Palette</p>
                  <div className="grid grid-cols-2 gap-2.5">
                    {selectedProject.palette.map((swatch) => (
                      <div
                        key={swatch.name}
                        className="flex items-center gap-2.5 text-xs text-[#0F1E1A]"
                      >
                        <span
                          className="w-5 h-5 rounded-md border border-black/15 shrink-0"
                          style={{ backgroundColor: swatch.hex }}
                        />
                        <span className="truncate">{swatch.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-[#E4DDD0] flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() => {
                    const proj = selectedProject;
                    setSelectedProject(null);
                    onBookConcept(proj);
                  }}
                  className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold text-white rounded-lg transition-colors cursor-pointer whitespace-nowrap"
                  style={{ backgroundColor: 'var(--theme-primary)' }}
                >
                  <span>Book Similar Concept</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => onToggleSave(selectedProject.id)}
                  className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 text-xs font-semibold text-[#0F1E1A] bg-white border border-[#E4DDD0] rounded-lg transition-colors cursor-pointer whitespace-nowrap"
                >
                  <Bookmark
                    className="w-3.5 h-3.5"
                    style={{ color: 'var(--theme-accent)' }}
                  />
                  <span>
                    {savedIds.includes(selectedProject.id) ? 'Saved' : 'Save'}
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
