import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Check } from 'lucide-react';
import { SERVICES_LIST, ServiceItem } from '../data/plannerData';

interface ServicesSectionProps {
  onSelectServiceForBooking: (serviceTitle: string) => void;
}

export function ServicesSection({ onSelectServiceForBooking }: ServicesSectionProps) {
  const [activeService, setActiveService] = useState<ServiceItem>(SERVICES_LIST[0]);

  return (
    <section
      id="services"
      className="py-20 md:py-24 border-t bg-white"
      style={{ borderColor: 'var(--theme-border)' }}
    >
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="max-w-2xl mb-12">
          <p
            className="text-xs font-medium tracking-wide mb-2"
            style={{ color: 'var(--theme-accent)' }}
          >
            Seven Core Disciplines
          </p>
          <h2
            className="font-serif text-3xl sm:text-4xl font-semibold tracking-tight text-balance"
            style={{ color: 'var(--theme-primary)' }}
          >
            From Grand Marquee Architecture to Bespoke Doors & Flooring
          </h2>
          <p className="mt-3 text-base text-[#524E48] leading-relaxed">
            Every celebration space and private residence is executed under one architectural studio—ensuring cohesive materials, lighting, and craft from start to finish.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left: Editorial Numbered Service Index */}
          <div
            className="lg:col-span-6 divide-y border-t border-b"
            style={{ borderColor: 'var(--theme-border)' }}
          >
            {SERVICES_LIST.map((service) => {
              const isSelected = activeService.id === service.id;
              return (
                <button
                  key={service.id}
                  type="button"
                  onClick={() => setActiveService(service)}
                  className={`w-full py-4 px-4 text-left flex items-center justify-between gap-4 transition-colors duration-150 cursor-pointer ${
                    isSelected ? 'text-[#0F1E1A]' : 'hover:bg-black/[0.02] text-[#524E48]'
                  }`}
                  style={
                    isSelected
                      ? { backgroundColor: 'var(--theme-canvas)' }
                      : undefined
                  }
                >
                  <div className="flex items-baseline gap-4 min-w-0">
                    <span
                      className="font-mono text-xs tabular-nums shrink-0 font-semibold"
                      style={{ color: 'var(--theme-accent)' }}
                    >
                      {service.number}.
                    </span>
                    <div className="min-w-0">
                      <span
                        className="block text-base sm:text-lg font-medium truncate"
                        style={{
                          color: isSelected ? 'var(--theme-primary)' : '#292524',
                        }}
                      >
                        {service.title}
                      </span>
                      <span className="block text-xs text-[#78716C] truncate mt-0.5">
                        {service.tagline}
                      </span>
                    </div>
                  </div>
                  <ArrowRight
                    className={`w-4 h-4 shrink-0 transition-transform duration-150 ${
                      isSelected ? 'translate-x-0.5' : 'text-[#A8A29E]'
                    }`}
                    style={
                      isSelected ? { color: 'var(--theme-primary)' } : undefined
                    }
                  />
                </button>
              );
            })}
          </div>

          {/* Right: Animated Active Service Specification Panel */}
          <div
            className="lg:col-span-6 border rounded-2xl p-6 sm:p-8"
            style={{
              backgroundColor: 'var(--theme-canvas)',
              borderColor: 'var(--theme-border)',
            }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeService.id}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.18 }}
              >
                <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-[#524E48] mb-3">
                  <span
                    className="font-mono tabular-nums font-medium"
                    style={{ color: 'var(--theme-accent)' }}
                  >
                    Discipline {activeService.number} of 07
                  </span>
                  <span className="tabular-nums">{activeService.turnaround}</span>
                </div>

                <h3
                  className="font-serif text-2xl sm:text-3xl font-semibold tracking-tight"
                  style={{ color: 'var(--theme-primary)' }}
                >
                  {activeService.title}
                </h3>

                <p className="mt-3 text-sm sm:text-base text-[#44403C] leading-relaxed">
                  {activeService.description}
                </p>

                <div
                  className="mt-6 p-4 rounded-xl bg-white border"
                  style={{ borderColor: 'var(--theme-border)' }}
                >
                  <p
                    className="text-xs font-semibold mb-1"
                    style={{ color: 'var(--theme-primary)' }}
                  >
                    2026 Design Direction
                  </p>
                  <p className="text-xs sm:text-sm text-[#524E48] leading-relaxed">
                    {activeService.trendNote}
                  </p>
                </div>

                <div className="mt-6">
                  <p
                    className="text-xs font-semibold mb-3"
                    style={{ color: 'var(--theme-primary)' }}
                  >
                    Included Deliverables
                  </p>
                  <ul className="space-y-2.5">
                    {activeService.deliverables.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2.5 text-sm text-[#44403C]"
                      >
                        <Check
                          className="w-4 h-4 shrink-0 mt-0.5"
                          style={{ color: 'var(--theme-accent)' }}
                        />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div
                  className="mt-8 pt-6 border-t flex flex-wrap items-center justify-between gap-4"
                  style={{ borderColor: 'var(--theme-border)' }}
                >
                  <div>
                    <p className="text-xs text-[#78716C]">Typical Investment</p>
                    <p
                      className="text-sm font-semibold tabular-nums"
                      style={{ color: 'var(--theme-primary)' }}
                    >
                      {activeService.startingEstimate}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => onSelectServiceForBooking(activeService.title)}
                    className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-white rounded-lg transition-colors cursor-pointer whitespace-nowrap shrink-0"
                    style={{ backgroundColor: 'var(--theme-primary)' }}
                  >
                    <span>Inquire About {activeService.title}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
