import { useState, useMemo } from 'react';
import { ArrowUpRight, Check, Sparkles } from 'lucide-react';
import { BUSINESS_INFO } from '../data/plannerData';

interface ScopeEstimatorProps {
  onLockScope: (summary: string, serviceTitle: string) => void;
}

type TrackMode = 'event' | 'interior';

const EVENT_TYPES = [
  { id: 'walima-marquee', label: 'Walima / Baraat Marquee', base: 380000, perUnit: 650 },
  { id: 'mehndi-courtyard', label: 'Mehndi / Qawwali Courtyard', base: 260000, perUnit: 520 },
  { id: 'nikkah-pergola', label: 'Golden Hour Nikkah Pergola', base: 240000, perUnit: 480 },
];

const INTERIOR_TYPES = [
  { id: 'full-home', label: 'Full Residence Interior & Staging', base: 450000, perUnit: 180 },
  { id: 'doors-flooring', label: 'Custom Doors & Flooring Package', base: 220000, perUnit: 110 },
  { id: 'art-decor', label: 'Custom Art & Decor Selection', base: 140000, perUnit: 65 },
];

const EVENT_ADDONS = [
  { id: 'floral-tunnel', label: 'Rose & Crystal Entry Tunnel', cost: 145000 },
  { id: 'mirror-walkway', label: 'Mirrored Reflection Walkway', cost: 95000 },
  { id: 'serpentine-tables', label: 'S-Curved Serpentine Banquet Deck', cost: 190000 },
  { id: 'ambient-cove', label: '2700K Architectural Lighting Rig', cost: 85000 },
];

const INTERIOR_ADDONS = [
  { id: 'brass-doors', label: 'Solid Walnut & Brass Inlay Doors (Set of 2)', cost: 210000 },
  { id: 'travertine', label: 'Honed Travertine / Herringbone Spec', cost: 175000 },
  { id: 'custom-art', label: 'Commissioned Large-Format Canvas Art', cost: 95000 },
  { id: 'rapid-staging', label: '72-Hour Turnkey Home Staging', cost: 110000 },
];

const AESTHETIC_PALETTES = [
  {
    id: 'emerald-champagne',
    name: 'Royal Emerald & Champagne',
    colors: ['#0C231E', '#173B33', '#DFBA6F', '#F7F4EE'],
  },
  {
    id: 'burgundy-brass',
    name: 'Velvet Burgundy & Brass',
    colors: ['#2D0F18', '#631D2B', '#E6C37A', '#F8F4F2'],
  },
  {
    id: 'midnight-pearl',
    name: 'Midnight Sapphire & Pearl',
    colors: ['#10192B', '#233554', '#E0BE78', '#F4F6F9'],
  },
  {
    id: 'walnut-travertine',
    name: 'Warm Walnut & Travertine',
    colors: ['#5A3D2B', '#DFD3C3', '#C49E71', '#F4F1EA'],
  },
];

export function ScopeEstimator({ onLockScope }: ScopeEstimatorProps) {
  const [mode, setMode] = useState<TrackMode>('event');
  const [selectedTypeId, setSelectedTypeId] = useState<string>('walima-marquee');
  const [scaleValue, setScaleValue] = useState<number>(500);
  const [selectedAddons, setSelectedAddons] = useState<string[]>([
    'floral-tunnel',
    'ambient-cove',
  ]);
  const [paletteId, setPaletteId] = useState<string>('emerald-champagne');

  const activeTypes = mode === 'event' ? EVENT_TYPES : INTERIOR_TYPES;
  const activeAddons = mode === 'event' ? EVENT_ADDONS : INTERIOR_ADDONS;

  const handleModeSwitch = (nextMode: TrackMode) => {
    setMode(nextMode);
    if (nextMode === 'event') {
      setSelectedTypeId('walima-marquee');
      setScaleValue(500);
      setSelectedAddons(['floral-tunnel', 'ambient-cove']);
    } else {
      setSelectedTypeId('full-home');
      setScaleValue(2400);
      setSelectedAddons(['brass-doors', 'custom-art']);
    }
  };

  const toggleAddon = (id: string) => {
    setSelectedAddons((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const selectedType =
    activeTypes.find((t) => t.id === selectedTypeId) || activeTypes[0];
  const selectedPalette =
    AESTHETIC_PALETTES.find((p) => p.id === paletteId) || AESTHETIC_PALETTES[0];

  const estimate = useMemo(() => {
    const addonsTotal = activeAddons
      .filter((a) => selectedAddons.includes(a.id))
      .reduce((sum, a) => sum + a.cost, 0);

    const low = selectedType.base + scaleValue * selectedType.perUnit + addonsTotal;
    const high = Math.round(low * 1.18);

    const formatPKR = (val: number) =>
      new Intl.NumberFormat('en-PK').format(Math.round(val / 1000) * 1000);

    return {
      lowFormatted: formatPKR(low),
      highFormatted: formatPKR(high),
      timeline:
        mode === 'event'
          ? selectedAddons.length >= 3
            ? '14 – 21 Days Lead Time'
            : '7 – 14 Days Lead Time'
          : selectedAddons.includes('rapid-staging')
          ? '3 – 7 Days Express Turnaround'
          : '2 – 4 Weeks Fabrication & Install',
    };
  }, [activeAddons, mode, scaleValue, selectedAddons, selectedType]);

  const buildScopeSummary = () => {
    const addonNames = activeAddons
      .filter((a) => selectedAddons.includes(a.id))
      .map((a) => a.label)
      .join(', ');
    const scaleUnit = mode === 'event' ? `${scaleValue} Guests` : `${scaleValue} sq. ft.`;

    return `Project: ${selectedType.label} (${scaleUnit}) | Palette: ${
      selectedPalette.name
    } | Add-ons: ${addonNames || 'Standard Base'} | Est. Budget: PKR ${
      estimate.lowFormatted
    } – ${estimate.highFormatted}`;
  };

  const whatsappDirectHref = `${BUSINESS_INFO.whatsappBase}?text=${encodeURIComponent(
    `Assalam-o-Alaikum Decent Events Planner, I used your 2026 Scope Estimator:\n${buildScopeSummary()}\nPlease share availability for a consultation.`
  )}`;

  return (
    <section
      id="estimator"
      className="py-20 md:py-24 border-t text-white transition-colors duration-300"
      style={{
        backgroundColor: 'var(--theme-primary)',
        borderColor: 'var(--theme-border)',
      }}
    >
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <p
              className="text-xs font-medium tracking-wide mb-2"
              style={{ color: 'var(--theme-accent-bright)' }}
            >
              Interactive Planning Tool · 2026 Edition
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl font-semibold tracking-tight text-white text-balance">
              Event & Interior Scope Estimator
            </h2>
            <p className="mt-3 text-base text-white/75 leading-relaxed">
              Configure your guest count or residence square footage, select 2026 architectural enhancements, and preview an instant investment range before booking.
            </p>
          </div>

          <div className="inline-flex items-center gap-1 p-1 bg-black/25 rounded-lg border border-white/15 shrink-0 self-start lg:self-auto">
            <button
              type="button"
              onClick={() => handleModeSwitch('event')}
              className={`px-4 py-2 text-xs font-medium rounded-md transition-colors cursor-pointer whitespace-nowrap ${
                mode === 'event'
                  ? 'bg-white text-[#0F1E1A]'
                  : 'text-white/75 hover:text-white'
              }`}
            >
              Marquee & Events
            </button>
            <button
              type="button"
              onClick={() => handleModeSwitch('interior')}
              className={`px-4 py-2 text-xs font-medium rounded-md transition-colors cursor-pointer whitespace-nowrap ${
                mode === 'interior'
                  ? 'bg-white text-[#0F1E1A]'
                  : 'text-white/75 hover:text-white'
              }`}
            >
              Home Interiors & Doors
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Configuration Controls */}
          <div className="lg:col-span-7 space-y-8 bg-black/25 border border-white/15 rounded-2xl p-6 sm:p-8">
            <div>
              <label
                className="block text-xs font-medium mb-3"
                style={{ color: 'var(--theme-accent-bright)' }}
              >
                01. Select Primary Scope
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {activeTypes.map((type) => {
                  const active = selectedTypeId === type.id;
                  return (
                    <button
                      key={type.id}
                      type="button"
                      onClick={() => setSelectedTypeId(type.id)}
                      className={`p-3.5 rounded-xl border text-left transition-colors cursor-pointer ${
                        active
                          ? 'bg-white/15 border-[#DFBA6F] text-white'
                          : 'bg-black/20 border-white/15 text-white/75 hover:border-white/35 hover:text-white'
                      }`}
                    >
                      <span className="block text-xs font-semibold leading-snug">
                        {type.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-3">
                <label
                  htmlFor="scale-slider"
                  className="text-xs font-medium"
                  style={{ color: 'var(--theme-accent-bright)' }}
                >
                  {mode === 'event' ? '02. Estimated Guest Count' : '02. Floor Area (Sq. Ft.)'}
                </label>
                <span className="font-mono text-sm font-medium text-white tabular-nums">
                  {mode === 'event' ? `${scaleValue} Guests` : `${scaleValue.toLocaleString()} sq. ft.`}
                </span>
              </div>
              <input
                id="scale-slider"
                type="range"
                min={mode === 'event' ? 100 : 600}
                max={mode === 'event' ? 1500 : 8000}
                step={mode === 'event' ? 50 : 200}
                value={scaleValue}
                onChange={(e) => setScaleValue(Number(e.target.value))}
                className="w-full accent-[#DFBA6F] cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-white/55 mt-1.5 tabular-nums">
                <span>{mode === 'event' ? '100 Guests' : '600 sq. ft.'}</span>
                <span>{mode === 'event' ? '800 Guests' : '4,500 sq. ft.'}</span>
                <span>{mode === 'event' ? '1,500 Guests' : '8,000 sq. ft.'}</span>
              </div>
            </div>

            <div>
              <p
                className="text-xs font-medium mb-3"
                style={{ color: 'var(--theme-accent-bright)' }}
              >
                03. 2026 Signature Enhancements
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {activeAddons.map((addon) => {
                  const checked = selectedAddons.includes(addon.id);
                  return (
                    <button
                      key={addon.id}
                      type="button"
                      onClick={() => toggleAddon(addon.id)}
                      className={`flex items-start justify-between gap-3 p-3.5 rounded-xl border text-left transition-colors cursor-pointer ${
                        checked
                          ? 'bg-white/15 border-[#DFBA6F] text-white'
                          : 'bg-black/20 border-white/15 text-white/75 hover:border-white/35'
                      }`}
                    >
                      <div>
                        <span className="block text-xs font-medium text-white">
                          {addon.label}
                        </span>
                        <span className="block text-[11px] text-white/65 mt-1 tabular-nums">
                          + PKR {addon.cost.toLocaleString()}
                        </span>
                      </div>
                      <span
                        className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 mt-0.5 ${
                          checked
                            ? 'text-[#0F1E1A]'
                            : 'border border-white/30'
                        }`}
                        style={
                          checked
                            ? { backgroundColor: 'var(--theme-accent-bright)' }
                            : undefined
                        }
                      >
                        {checked && <Check className="w-3.5 h-3.5" strokeWidth={2.5} />}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <p
                className="text-xs font-medium mb-3"
                style={{ color: 'var(--theme-accent-bright)' }}
              >
                04. 2026 Material & Color Direction
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {AESTHETIC_PALETTES.map((palette) => {
                  const active = paletteId === palette.id;
                  return (
                    <button
                      key={palette.id}
                      type="button"
                      onClick={() => setPaletteId(palette.id)}
                      className={`flex items-center justify-between gap-3 p-3 rounded-xl border text-left transition-colors cursor-pointer ${
                        active
                          ? 'bg-white/15 border-[#DFBA6F] text-white'
                          : 'bg-black/20 border-white/15 text-white/75 hover:border-white/35'
                      }`}
                    >
                      <span className="text-xs font-medium truncate">
                        {palette.name}
                      </span>
                      <div className="flex items-center -space-x-1 shrink-0">
                        {palette.colors.map((hex) => (
                          <span
                            key={hex}
                            className="w-4 h-4 rounded-full border border-black/30"
                            style={{ backgroundColor: hex }}
                          />
                        ))}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Live Output Summary */}
          <div className="lg:col-span-5 bg-black/35 border border-white/15 rounded-2xl p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-xs text-white/70 mb-4">
                <span>Preliminary Architectural Quote</span>
                <span style={{ color: 'var(--theme-accent-bright)' }}>
                  {estimate.timeline}
                </span>
              </div>

              <div className="pb-6 border-b border-white/15">
                <p className="text-xs text-white/70 mb-1">Estimated Range (PKR)</p>
                <p className="font-serif text-3xl sm:text-4xl font-semibold text-white tabular-nums tracking-tight">
                  PKR {estimate.lowFormatted} – {estimate.highFormatted}
                </p>
              </div>

              <dl className="mt-6 space-y-3.5 text-sm">
                <div className="flex justify-between gap-4">
                  <dt className="text-white/65">Scope</dt>
                  <dd className="text-white font-medium text-right">
                    {selectedType.label}
                  </dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-white/65">Scale</dt>
                  <dd className="text-white font-medium tabular-nums text-right">
                    {mode === 'event'
                      ? `${scaleValue} Guests`
                      : `${scaleValue.toLocaleString()} sq. ft.`}
                  </dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-white/65">Direction</dt>
                  <dd className="text-white font-medium text-right">
                    {selectedPalette.name}
                  </dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-white/65">Selected Add-ons</dt>
                  <dd className="text-white font-medium tabular-nums text-right">
                    {selectedAddons.length} Selected
                  </dd>
                </div>
              </dl>

              <p className="mt-6 text-xs text-white/60 leading-relaxed">
                Final pricing is confirmed after a complimentary site inspection at your marquee or residence in Lahore, Sialkot, or nearby areas.
              </p>
            </div>

            <div className="mt-8 space-y-3">
              <button
                type="button"
                onClick={() =>
                  onLockScope(buildScopeSummary(), selectedType.label)
                }
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 text-xs font-semibold text-[#0F1E1A] rounded-lg transition-colors cursor-pointer"
                style={{ backgroundColor: 'var(--theme-accent-bright)' }}
              >
                <Sparkles className="w-4 h-4" />
                <span>Book Consultation With This Scope</span>
              </button>

              <a
                href={whatsappDirectHref}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 text-xs font-semibold text-white bg-transparent border border-white/25 hover:border-white rounded-lg transition-colors"
              >
                <span>Send Scope Directly on WhatsApp</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
