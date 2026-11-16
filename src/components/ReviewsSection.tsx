import { useState, FormEvent } from 'react';
import { Star, Plus, X } from 'lucide-react';
import { ClientReview, SERVICES_LIST } from '../data/plannerData';

interface ReviewsSectionProps {
  reviews: ClientReview[];
  onAddReview: (review: ClientReview) => void;
}

export function ReviewsSection({ reviews, onAddReview }: ReviewsSectionProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [name, setName] = useState('');
  const [city, setCity] = useState('Sialkot');
  const [service, setService] = useState(SERVICES_LIST[0].title);
  const [rating, setRating] = useState(5);
  const [quote, setQuote] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !quote.trim()) {
      setError('Please enter your name and brief feedback.');
      return;
    }

    const newReview: ClientReview = {
      id: `rev-${Date.now()}`,
      name: name.trim(),
      role: 'Verified Client',
      city: city.trim() || 'Lahore & Sialkot',
      service,
      rating,
      date: 'November 2026',
      quote: quote.trim(),
      outcome: `Completed ${service} consultation & execution.`,
    };

    onAddReview(newReview);
    setName('');
    setQuote('');
    setRating(5);
    setError('');
    setModalOpen(false);
  };

  return (
    <section
      id="reviews"
      className="py-20 md:py-24 border-t"
      style={{
        backgroundColor: 'var(--theme-canvas)',
        borderColor: 'var(--theme-border)',
      }}
    >
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <p
              className="text-xs font-medium tracking-wide mb-2"
              style={{ color: 'var(--theme-accent)' }}
            >
              Client Proof & Testimonials
            </p>
            <h2
              className="font-serif text-3xl sm:text-4xl font-semibold tracking-tight text-balance"
              style={{ color: 'var(--theme-primary)' }}
            >
              Trusted Across Lahore & Sialkot Celebrations
            </h2>
          </div>

          <button
            type="button"
            onClick={() => setModalOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold bg-white border rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            style={{
              color: 'var(--theme-primary)',
              borderColor: 'var(--theme-border)',
            }}
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Leave a Review</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((review) => (
            <article
              key={review.id}
              className="bg-white border rounded-2xl p-6 flex flex-col justify-between gap-6"
              style={{ borderColor: 'var(--theme-border)' }}
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-4">
                  <div
                    className="flex items-center gap-0.5"
                    style={{ color: 'var(--theme-accent)' }}
                    aria-label={`${review.rating} out of 5 stars`}
                  >
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className="w-3.5 h-3.5"
                        style={
                          i < review.rating
                            ? {
                                fill: 'var(--theme-accent)',
                                color: 'var(--theme-accent)',
                              }
                            : { color: '#DEDBD4' }
                        }
                      />
                    ))}
                  </div>
                  <span className="text-xs text-[#78716C]">{review.date}</span>
                </div>

                <p className="text-sm text-[#292524] leading-relaxed">
                  “{review.quote}”
                </p>
              </div>

              <div
                className="pt-4 border-t"
                style={{ borderColor: 'var(--theme-border)' }}
              >
                <p
                  className="text-xs font-medium mb-2"
                  style={{ color: 'var(--theme-accent)' }}
                >
                  {review.outcome}
                </p>
                <p
                  className="text-sm font-semibold"
                  style={{ color: 'var(--theme-primary)' }}
                >
                  {review.name}
                </p>
                <p className="text-xs text-[#78716C] mt-0.5">
                  {review.role} · {review.city}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>

      {modalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="review-modal-title"
          onClick={() => setModalOpen(false)}
        >
          <div
            className="bg-white border border-[#E4DDD0] rounded-2xl max-w-md w-full p-6 sm:p-7"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-5">
              <h3
                id="review-modal-title"
                className="font-serif text-2xl font-semibold"
                style={{ color: 'var(--theme-primary)' }}
              >
                Share Your Experience
              </h3>
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                aria-label="Close review modal"
                className="w-9 h-9 rounded-lg inline-flex items-center justify-center text-[#524E48] hover:bg-black/5 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-[#44403C] mb-1">
                  Your Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g., Bilal & Sara Ahmed"
                  className="w-full px-3.5 py-2.5 text-sm bg-[#F7F4EE] border border-[#E4DDD0] rounded-lg focus:outline-none focus:border-[#0C231E]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-[#44403C] mb-1">
                    City / Area
                  </label>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Sialkot / Lahore"
                    className="w-full px-3.5 py-2.5 text-sm bg-[#F7F4EE] border border-[#E4DDD0] rounded-lg focus:outline-none focus:border-[#0C231E]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#44403C] mb-1">
                    Rating
                  </label>
                  <select
                    value={rating}
                    onChange={(e) => setRating(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 text-sm bg-[#F7F4EE] border border-[#E4DDD0] rounded-lg focus:outline-none focus:border-[#0C231E]"
                  >
                    <option value={5}>5 Stars — Exceptional</option>
                    <option value={4}>4 Stars — Very Good</option>
                    <option value={3}>3 Stars — Good</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-[#44403C] mb-1">
                  Service Used
                </label>
                <select
                  value={service}
                  onChange={(e) => setService(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm bg-[#F7F4EE] border border-[#E4DDD0] rounded-lg focus:outline-none focus:border-[#0C231E]"
                >
                  {SERVICES_LIST.map((s) => (
                    <option key={s.id} value={s.title}>
                      {s.title}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-[#44403C] mb-1">
                  Your Review
                </label>
                <textarea
                  rows={3}
                  value={quote}
                  onChange={(e) => setQuote(e.target.value)}
                  placeholder="Tell us about your marquee design, doors, flooring, or home staging experience..."
                  className="w-full px-3.5 py-2.5 text-sm bg-[#F7F4EE] border border-[#E4DDD0] rounded-lg focus:outline-none focus:border-[#0C231E]"
                />
              </div>

              {error && <p className="text-xs text-[#B91C1C]">{error}</p>}

              <button
                type="submit"
                className="w-full py-2.5 px-4 text-xs font-semibold text-white rounded-lg transition-colors cursor-pointer"
                style={{ backgroundColor: 'var(--theme-primary)' }}
              >
                Publish Review
              </button>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
