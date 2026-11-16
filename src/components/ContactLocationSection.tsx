import { useState } from 'react';
import {
  MapPin,
  Phone,
  Clock,
  Navigation,
  Copy,
  Check,
  MessageCircle,
  Share2,
} from 'lucide-react';
import { BUSINESS_INFO } from '../data/plannerData';

interface ContactLocationSectionProps {
  onOpenBooking: () => void;
  onShareProfile: () => void;
}

export function ContactLocationSection({
  onOpenBooking,
  onShareProfile,
}: ContactLocationSectionProps) {
  const [copied, setCopied] = useState(false);

  const handleCopyAddress = async () => {
    try {
      await navigator.clipboard.writeText(BUSINESS_INFO.address);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      setCopied(false);
    }
  };

  return (
    <section
      id="contact"
      className="py-20 md:py-24 border-t bg-white"
      style={{ borderColor: 'var(--theme-border)' }}
    >
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          <div className="lg:col-span-6 flex flex-col justify-between gap-8">
            <div>
              <p
                className="text-xs font-medium tracking-wide mb-2"
                style={{ color: 'var(--theme-accent)' }}
              >
                Visit Studio or Request On-Site Visit
              </p>
              <h2
                className="font-serif text-3xl sm:text-4xl font-semibold tracking-tight text-balance"
                style={{ color: 'var(--theme-primary)' }}
              >
                Available 24 Hours Across Sialkot & Lahore
              </h2>
              <p className="mt-3 text-base text-[#524E48] leading-relaxed">
                Meet our design team near Alrazzaq Marquee on Pusrur Bypass or schedule a direct architectural walk-through at your marquee or home.
              </p>

              <dl
                className="mt-8 space-y-5 border-t pt-6"
                style={{ borderColor: 'var(--theme-border)' }}
              >
                <div className="flex items-start gap-3.5">
                  <MapPin
                    className="w-5 h-5 shrink-0 mt-0.5"
                    style={{ color: 'var(--theme-accent)' }}
                  />
                  <div>
                    <dt
                      className="text-xs font-semibold"
                      style={{ color: 'var(--theme-primary)' }}
                    >
                      Studio Address
                    </dt>
                    <dd className="text-sm text-[#44403C] mt-0.5">
                      {BUSINESS_INFO.address}
                    </dd>
                    <p className="text-xs text-[#78716C] mt-1">
                      {BUSINESS_INFO.serviceArea}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <Clock
                    className="w-5 h-5 shrink-0 mt-0.5"
                    style={{ color: 'var(--theme-accent)' }}
                  />
                  <div>
                    <dt
                      className="text-xs font-semibold"
                      style={{ color: 'var(--theme-primary)' }}
                    >
                      Operating Hours
                    </dt>
                    <dd className="text-sm text-[#44403C] mt-0.5">
                      {BUSINESS_INFO.hours} · Event & Site Supervision Ready
                    </dd>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <Phone
                    className="w-5 h-5 shrink-0 mt-0.5"
                    style={{ color: 'var(--theme-accent)' }}
                  />
                  <div>
                    <dt
                      className="text-xs font-semibold"
                      style={{ color: 'var(--theme-primary)' }}
                    >
                      Direct Phone & WhatsApp
                    </dt>
                    <dd className="text-sm font-medium text-[#0F1E1A] mt-0.5 tabular-nums">
                      <a
                        href={BUSINESS_INFO.phoneHref}
                        className="hover:underline transition-colors"
                      >
                        {BUSINESS_INFO.phoneDisplay}
                      </a>
                    </dd>
                  </div>
                </div>
              </dl>
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                type="button"
                onClick={onOpenBooking}
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-xs font-semibold text-white rounded-lg transition-colors cursor-pointer whitespace-nowrap"
                style={{ backgroundColor: 'var(--theme-primary)' }}
              >
                Schedule Appointment
              </button>

              <a
                href={BUSINESS_INFO.whatsappBase}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold bg-white border rounded-lg transition-colors whitespace-nowrap"
                style={{
                  color: 'var(--theme-primary)',
                  borderColor: 'var(--theme-border)',
                }}
              >
                <MessageCircle
                  className="w-3.5 h-3.5"
                  style={{ color: 'var(--theme-accent)' }}
                />
                <span>WhatsApp (wa.me)</span>
              </a>

              <a
                href={BUSINESS_INFO.phoneHref}
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold bg-white border rounded-lg transition-colors whitespace-nowrap"
                style={{
                  color: 'var(--theme-primary)',
                  borderColor: 'var(--theme-border)',
                }}
              >
                <Phone
                  className="w-3.5 h-3.5"
                  style={{ color: 'var(--theme-accent)' }}
                />
                <span>Call Now</span>
              </a>

              <button
                type="button"
                onClick={onShareProfile}
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold bg-white border rounded-lg transition-colors cursor-pointer whitespace-nowrap"
                style={{
                  color: 'var(--theme-primary)',
                  borderColor: 'var(--theme-border)',
                }}
              >
                <Share2
                  className="w-3.5 h-3.5"
                  style={{ color: 'var(--theme-accent)' }}
                />
                <span>Share</span>
              </button>
            </div>
          </div>

          <div
            className="lg:col-span-6 border rounded-2xl overflow-hidden flex flex-col justify-between min-h-[380px]"
            style={{
              backgroundColor: 'var(--theme-canvas)',
              borderColor: 'var(--theme-border)',
            }}
          >
            <div className="relative flex-1 p-6 sm:p-8 flex flex-col justify-between">
              <div
                className="absolute inset-0 opacity-35 pointer-events-none"
                style={{
                  backgroundImage:
                    'linear-gradient(to right, #D6CFC2 1px, transparent 1px), linear-gradient(to bottom, #D6CFC2 1px, transparent 1px)',
                  backgroundSize: '40px 40px',
                }}
              />

              <div className="relative z-10 flex items-center justify-between text-xs text-[#524E48]">
                <span
                  className="font-medium"
                  style={{ color: 'var(--theme-primary)' }}
                >
                  Sialkot – Pasrur Bypass Corridor
                </span>
                <span className="font-mono tabular-nums">51480</span>
              </div>

              <div
                className="relative z-10 my-8 bg-white/95 backdrop-blur-xs border rounded-xl p-5 max-w-md"
                style={{ borderColor: 'var(--theme-border)' }}
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p
                      className="text-xs font-medium"
                      style={{ color: 'var(--theme-accent)' }}
                    >
                      Studio Landmark Pin
                    </p>
                    <h3
                      className="font-serif text-xl font-semibold mt-0.5"
                      style={{ color: 'var(--theme-primary)' }}
                    >
                      {BUSINESS_INFO.name}
                    </h3>
                    <p className="text-xs text-[#524E48] mt-1 leading-relaxed">
                      Pusrur by pass, near Alrazzaq Marquee · Sialkot, Lahore, 51480
                    </p>
                  </div>
                  <div
                    className="w-9 h-9 rounded-lg text-white flex items-center justify-center shrink-0"
                    style={{ backgroundColor: 'var(--theme-primary)' }}
                  >
                    <MapPin className="w-4 h-4" />
                  </div>
                </div>

                <div
                  className="mt-4 pt-3 border-t flex items-center justify-between text-xs text-[#524E48]"
                  style={{ borderColor: 'var(--theme-border)' }}
                >
                  <span>Lahore Coverage: DHA, Gulberg, Model Town</span>
                  <span
                    className="font-medium"
                    style={{ color: 'var(--theme-primary)' }}
                  >
                    24/7 Dispatch
                  </span>
                </div>
              </div>

              <div className="relative z-10 flex flex-wrap items-center gap-3">
                <a
                  href={BUSINESS_INFO.mapsQueryUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-white rounded-lg transition-colors whitespace-nowrap"
                  style={{ backgroundColor: 'var(--theme-primary)' }}
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>Get Directions on Google Maps</span>
                </a>

                <button
                  type="button"
                  onClick={handleCopyAddress}
                  className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold bg-white border rounded-lg transition-colors cursor-pointer whitespace-nowrap"
                  style={{
                    color: 'var(--theme-primary)',
                    borderColor: 'var(--theme-border)',
                  }}
                >
                  {copied ? (
                    <>
                      <Check
                        className="w-3.5 h-3.5"
                        style={{ color: 'var(--theme-accent)' }}
                      />
                      <span>Address Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy
                        className="w-3.5 h-3.5"
                        style={{ color: 'var(--theme-accent)' }}
                      />
                      <span>Copy Address</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
