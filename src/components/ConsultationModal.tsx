import { useState, useEffect, FormEvent } from 'react';
import { X, CheckCircle2, MessageCircle, Calendar } from 'lucide-react';
import {
  BUSINESS_INFO,
  SERVICES_LIST,
  SHOWCASE_PROJECTS,
} from '../data/plannerData';

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialService?: string;
  initialNotes?: string;
  savedIds: string[];
}

interface BookingConfirmation {
  referenceId: string;
  name: string;
  phone: string;
  city: string;
  service: string;
  date: string;
  notes: string;
  whatsappUrl: string;
}

export function ConsultationModal({
  isOpen,
  onClose,
  initialService,
  initialNotes,
  savedIds,
}: ConsultationModalProps) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('Lahore');
  const [service, setService] = useState(
    initialService || SERVICES_LIST[0].title
  );
  const [preferredDate, setPreferredDate] = useState('');
  const [notes, setNotes] = useState(initialNotes || '');
  const [error, setError] = useState('');
  const [confirmation, setConfirmation] = useState<BookingConfirmation | null>(
    null
  );

  useEffect(() => {
    if (isOpen) {
      if (initialService) setService(initialService);
      if (initialNotes) setNotes(initialNotes);
      setError('');
      setConfirmation(null);
    }
  }, [isOpen, initialService, initialNotes]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const savedTitles = SHOWCASE_PROJECTS.filter((p) => savedIds.includes(p.id)).map(
    (p) => p.title
  );

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const cleanedPhone = phone.replace(/\s+/g, '');
    if (!name.trim()) {
      setError('Please enter your full name.');
      return;
    }
    if (cleanedPhone.length < 10) {
      setError('Please enter a valid 10+ digit phone or WhatsApp number.');
      return;
    }

    const referenceId = `DEP-${Math.floor(100000 + Math.random() * 900000)}`;
    const savedLine =
      savedTitles.length > 0
        ? `\nSaved Lookbook Styles: ${savedTitles.join(', ')}`
        : '';

    const messageText = `Assalam-o-Alaikum Decent Events Planner (${referenceId}):\nName: ${name.trim()}\nPhone: ${phone.trim()}\nCity: ${city}\nService: ${service}\nPreferred Date: ${
      preferredDate || 'Flexible / Immediate'
    }${notes.trim() ? `\nProject Notes: ${notes.trim()}` : ''}${savedLine}`;

    const whatsappUrl = `${BUSINESS_INFO.whatsappBase}?text=${encodeURIComponent(
      messageText
    )}`;

    const record: BookingConfirmation = {
      referenceId,
      name: name.trim(),
      phone: phone.trim(),
      city,
      service,
      date: preferredDate || 'Flexible / Immediate',
      notes: notes.trim(),
      whatsappUrl,
    };

    try {
      const existing = JSON.parse(
        localStorage.getItem('dep_appointments') || '[]'
      );
      localStorage.setItem(
        'dep_appointments',
        JSON.stringify([record, ...existing].slice(0, 10))
      );
    } catch {
      // ignore storage quota errors
    }

    setConfirmation(record);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/65 backdrop-blur-xs p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="booking-modal-title"
      onClick={onClose}
    >
      <div
        className="bg-white border border-[#E4DDD0] rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4 mb-6">
          <div>
            <p
              className="text-xs font-medium"
              style={{ color: 'var(--theme-accent)' }}
            >
              24-Hour Appointment Desk · {BUSINESS_INFO.phoneDisplay}
            </p>
            <h3
              id="booking-modal-title"
              className="font-serif text-2xl sm:text-3xl font-semibold mt-1"
              style={{ color: 'var(--theme-primary)' }}
            >
              {confirmation ? 'Consultation Confirmed' : 'Book Your Consultation'}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close consultation modal"
            className="w-9 h-9 rounded-lg inline-flex items-center justify-center text-[#524E48] hover:bg-black/5 cursor-pointer shrink-0"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {confirmation ? (
          <div className="space-y-6">
            <div
              className="p-4 rounded-xl border flex items-start gap-3"
              style={{
                backgroundColor: 'var(--theme-canvas)',
                borderColor: 'var(--theme-border)',
              }}
            >
              <CheckCircle2
                className="w-5 h-5 shrink-0 mt-0.5"
                style={{ color: 'var(--theme-accent)' }}
              />
              <div className="text-sm">
                <p
                  className="font-semibold"
                  style={{ color: 'var(--theme-primary)' }}
                >
                  Reference Slip: <span className="font-mono">{confirmation.referenceId}</span>
                </p>
                <p className="text-xs text-[#524E48] mt-1">
                  Your consultation brief is prepared. Send it directly to our WhatsApp desk for immediate site-visit scheduling.
                </p>
              </div>
            </div>

            <dl
              className="space-y-2.5 text-sm border-t border-b py-4"
              style={{ borderColor: 'var(--theme-border)' }}
            >
              <div className="flex justify-between gap-4">
                <dt className="text-[#78716C]">Client</dt>
                <dd className="font-medium text-[#0F1E1A]">{confirmation.name}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-[#78716C]">Service</dt>
                <dd className="font-medium text-[#0F1E1A]">{confirmation.service}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-[#78716C]">Location</dt>
                <dd className="font-medium text-[#0F1E1A]">{confirmation.city}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-[#78716C]">Target Date</dt>
                <dd className="font-medium text-[#0F1E1A] tabular-nums">
                  {confirmation.date}
                </dd>
              </div>
            </dl>

            <div className="space-y-3">
              <a
                href={confirmation.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 text-xs font-semibold text-white rounded-lg transition-colors"
                style={{ backgroundColor: 'var(--theme-primary)' }}
              >
                <MessageCircle className="w-4 h-4" />
                <span>Send Brief on WhatsApp ({BUSINESS_INFO.phoneDisplay})</span>
              </a>
              <button
                type="button"
                onClick={onClose}
                className="w-full py-2.5 px-4 text-xs font-semibold text-[#0F1E1A] bg-[#F7F4EE] border border-[#E4DDD0] rounded-lg transition-colors cursor-pointer"
              >
                Return to Website
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-[#44403C] mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                  className="w-full px-3.5 py-2.5 text-sm bg-[#F7F4EE] border border-[#E4DDD0] rounded-lg focus:outline-none focus:border-[#0C231E]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#44403C] mb-1">
                  Phone / WhatsApp *
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="03XX XXXXXXX"
                  className="w-full px-3.5 py-2.5 text-sm bg-[#F7F4EE] border border-[#E4DDD0] rounded-lg focus:outline-none focus:border-[#0C231E] tabular-nums"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-[#44403C] mb-1">
                  City / Service Area
                </label>
                <select
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm bg-[#F7F4EE] border border-[#E4DDD0] rounded-lg focus:outline-none focus:border-[#0C231E]"
                >
                  <option value="Lahore">Lahore</option>
                  <option value="Sialkot">Sialkot</option>
                  <option value="Pasrur">Pasrur & Nearby</option>
                  <option value="Gujranwala">Gujranwala / Daska</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-[#44403C] mb-1">
                  Event or Target Date
                </label>
                <input
                  type="date"
                  value={preferredDate}
                  onChange={(e) => setPreferredDate(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm bg-[#F7F4EE] border border-[#E4DDD0] rounded-lg focus:outline-none focus:border-[#0C231E]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-[#44403C] mb-1">
                Primary Service
              </label>
              <select
                value={service}
                onChange={(e) => setService(e.target.value)}
                className="w-full px-3.5 py-2.5 text-sm bg-[#F7F4EE] border border-[#E4DDD0] rounded-lg focus:outline-none focus:border-[#0C231E]"
              >
                {SERVICES_LIST.map((item) => (
                  <option key={item.id} value={item.title}>
                    {item.number}. {item.title}
                  </option>
                ))}
                <option value="Complete Event + Home Staging Package">
                  Complete Event + Home Staging Package
                </option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-[#44403C] mb-1">
                Venue, Guest Count or Room Details
              </label>
              <textarea
                rows={3}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="e.g., Alrazzaq Marquee Baraat for 700 guests, or 2 Kanal residence door & flooring consultation..."
                className="w-full px-3.5 py-2.5 text-sm bg-[#F7F4EE] border border-[#E4DDD0] rounded-lg focus:outline-none focus:border-[#0C231E]"
              />
            </div>

            {savedTitles.length > 0 && (
              <div
                className="p-3 rounded-lg border text-xs text-[#44403C]"
                style={{
                  backgroundColor: 'var(--theme-canvas)',
                  borderColor: 'var(--theme-border)',
                }}
              >
                <span
                  className="font-semibold"
                  style={{ color: 'var(--theme-primary)' }}
                >
                  Attached Lookbook ({savedTitles.length}):
                </span>{' '}
                {savedTitles.join(' · ')}
              </div>
            )}

            {error && <p className="text-xs text-[#B91C1C]">{error}</p>}

            <button
              type="submit"
              className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 text-xs font-semibold text-white rounded-lg transition-colors cursor-pointer"
              style={{ backgroundColor: 'var(--theme-primary)' }}
            >
              <Calendar className="w-4 h-4" />
              <span>Confirm Appointment & Generate WhatsApp Slip</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
