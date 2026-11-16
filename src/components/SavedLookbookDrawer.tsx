import { useEffect } from 'react';
import { X, Trash2, MessageCircle, ArrowRight } from 'lucide-react';
import { BUSINESS_INFO, SHOWCASE_PROJECTS } from '../data/plannerData';
import { SafeImage } from './SafeImage';

interface SavedLookbookDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  savedIds: string[];
  onRemove: (id: string) => void;
  onBookLookbook: () => void;
}

export function SavedLookbookDrawer({
  isOpen,
  onClose,
  savedIds,
  onRemove,
  onBookLookbook,
}: SavedLookbookDrawerProps) {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const savedProjects = SHOWCASE_PROJECTS.filter((p) => savedIds.includes(p.id));
  const whatsappText =
    savedProjects.length > 0
      ? `Assalam-o-Alaikum Decent Events Planner, I shortlisted these showcase styles:\n${savedProjects
          .map((p, idx) => `${idx + 1}. ${p.title} (${p.category})`)
          .join('\n')}\nPlease share availability and pricing.`
      : 'Assalam-o-Alaikum Decent Events Planner, I would like to discuss an event or interior project.';

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-black/50 backdrop-blur-xs"
      role="dialog"
      aria-modal="true"
      aria-label="Saved Lookbook"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md h-full border-l flex flex-col justify-between p-6"
        style={{
          backgroundColor: 'var(--theme-canvas)',
          borderColor: 'var(--theme-border)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="flex items-center justify-between pb-4 border-b"
          style={{ borderColor: 'var(--theme-border)' }}
        >
          <div>
            <h3
              className="font-serif text-2xl font-semibold"
              style={{ color: 'var(--theme-primary)' }}
            >
              Saved Lookbook
            </h3>
            <p className="text-xs text-[#78716C] tabular-nums">
              {savedProjects.length} {savedProjects.length === 1 ? 'style' : 'styles'} shortlisted
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close saved lookbook"
            className="w-9 h-9 rounded-lg inline-flex items-center justify-center text-[#524E48] hover:bg-black/5 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto py-5 space-y-4">
          {savedProjects.length === 0 ? (
            <div
              className="text-center py-14 px-4 border border-dashed rounded-2xl"
              style={{ borderColor: 'var(--theme-border)' }}
            >
              <p
                className="font-serif text-xl font-medium"
                style={{ color: 'var(--theme-primary)' }}
              >
                Your lookbook is empty
              </p>
              <p className="text-xs text-[#524E48] mt-2 leading-relaxed">
                Click “Save” on any Baraat, Nikkah, Qawwali, or home staging project in the showcase to build your moodboard.
              </p>
            </div>
          ) : (
            savedProjects.map((project) => (
              <div
                key={project.id}
                className="flex items-center gap-3.5 p-3 bg-white border rounded-xl"
                style={{ borderColor: 'var(--theme-border)' }}
              >
                <div className="w-20 h-16 rounded-lg overflow-hidden shrink-0 bg-[#ECEAE4]">
                  <SafeImage
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <p
                    className="text-xs truncate"
                    style={{ color: 'var(--theme-accent)' }}
                  >
                    {project.category}
                  </p>
                  <p
                    className="text-sm font-semibold truncate"
                    style={{ color: 'var(--theme-primary)' }}
                  >
                    {project.title}
                  </p>
                  <p className="text-xs text-[#78716C] truncate">{project.location}</p>
                </div>
                <button
                  type="button"
                  onClick={() => onRemove(project.id)}
                  aria-label={`Remove ${project.title}`}
                  className="w-8 h-8 rounded-lg inline-flex items-center justify-center text-[#78716C] hover:text-[#B91C1C] hover:bg-[#FEE2E2]/40 transition-colors cursor-pointer shrink-0"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))
          )}
        </div>

        <div
          className="pt-4 border-t space-y-2.5"
          style={{ borderColor: 'var(--theme-border)' }}
        >
          <button
            type="button"
            onClick={() => {
              onClose();
              onBookLookbook();
            }}
            className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 text-xs font-semibold text-white rounded-lg transition-colors cursor-pointer"
            style={{ backgroundColor: 'var(--theme-primary)' }}
          >
            <span>Book Consultation With Lookbook</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          <a
            href={`${BUSINESS_INFO.whatsappBase}?text=${encodeURIComponent(
              whatsappText
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 text-xs font-semibold bg-white border rounded-lg transition-colors"
            style={{
              color: 'var(--theme-primary)',
              borderColor: 'var(--theme-border)',
            }}
          >
            <MessageCircle
              className="w-3.5 h-3.5"
              style={{ color: 'var(--theme-accent)' }}
            />
            <span>Share Shortlist on WhatsApp</span>
          </a>
        </div>
      </div>
    </div>
  );
}
