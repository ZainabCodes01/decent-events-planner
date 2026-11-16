import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { BUSINESS_INFO } from '../data/plannerData';

interface NavbarProps {
  onOpenBooking: () => void;
}

const NAV_LINKS = [
  { label: 'Mood Studio', href: '#studio' },
  { label: 'Showcase', href: '#showcase' },
  { label: 'Services', href: '#services' },
  { label: 'Estimator', href: '#estimator' },
  { label: 'Contact', href: '#contact' },
];

export function Navbar({ onOpenBooking }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header
      className="sticky top-0 z-40 backdrop-blur-md border-b transition-colors duration-300"
      style={{
        backgroundColor: 'color-mix(in srgb, var(--theme-canvas) 92%, transparent)',
        borderColor: 'var(--theme-border)',
      }}
    >
      <div className="max-w-[1280px] mx-auto px-6 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Single-element brand wordmark */}
        <a
          href="#top"
          className="font-serif text-xl sm:text-2xl font-semibold tracking-tight whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4"
          style={{ color: 'var(--theme-primary)' }}
        >
          {BUSINESS_INFO.name}
        </a>

        {/* Zone 2: 5 clean single-line text nav links */}
        <nav
          aria-label="Primary navigation"
          className="hidden md:flex items-center gap-7 text-sm font-medium text-[#524E48]"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="hover:text-[#0F1E1A] transition-colors duration-150 whitespace-nowrap shrink-0 underline-offset-4 hover:underline"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={onOpenBooking}
            className="hidden sm:inline-flex items-center justify-center px-4 py-2 text-xs font-semibold tracking-wide text-white rounded-lg transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer"
            style={{ backgroundColor: 'var(--theme-primary)' }}
          >
            Book Consultation
          </button>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileOpen}
            className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-lg text-[#0F1E1A] hover:bg-black/5 transition-colors cursor-pointer"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {mobileOpen && (
        <div
          className="md:hidden border-t px-6 py-4 space-y-3"
          style={{
            backgroundColor: 'var(--theme-canvas)',
            borderColor: 'var(--theme-border)',
          }}
        >
          <nav className="flex flex-col space-y-2">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="py-2 text-sm font-medium text-[#0F1E1A] transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <button
            type="button"
            onClick={() => {
              setMobileOpen(false);
              onOpenBooking();
            }}
            className="w-full py-2.5 px-4 text-sm font-semibold text-white rounded-lg cursor-pointer"
            style={{ backgroundColor: 'var(--theme-primary)' }}
          >
            Book Consultation
          </button>
        </div>
      )}
    </header>
  );
}
