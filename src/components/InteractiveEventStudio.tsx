import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Sun, Flame, Sparkles, Check, Layers } from 'lucide-react';
import {
  MOOD_THEMES,
  MoodThemeId,
  STUDIO_SCENES,
  InteractiveHotspot,
} from '../data/plannerData';
import { SafeImage } from './SafeImage';

interface InteractiveEventStudioProps {
  activeTheme: MoodThemeId;
  onChangeTheme: (theme: MoodThemeId) => void;
  onAddBlueprintElement: (sceneTitle: string, hotspot: InteractiveHotspot) => void;
}

type LightingMood = 'standard' | 'candlelight' | 'golden';

const LIGHTING_OPTIONS: { id: LightingMood; label: string; filter: string }[] = [
  { id: 'standard', label: 'Studio Balanced', filter: 'none' },
  {
    id: 'candlelight',
    label: '2700K Candlelight',
    filter: 'sepia(0.18) saturate(1.18) brightness(0.95) contrast(1.06)',
  },
  {
    id: 'golden',
    label: 'Golden Hour',
    filter: 'saturate(1.22) contrast(1.04) brightness(1.03)',
  },
];

export function InteractiveEventStudio({
  activeTheme,
  onChangeTheme,
  onAddBlueprintElement,
}: InteractiveEventStudioProps) {
  const [activeSceneIndex, setActiveSceneIndex] = useState(0);
  const [selectedHotspotId, setSelectedHotspotId] = useState<string>(
    STUDIO_SCENES[0].hotspots[0].id
  );
  const [lighting, setLighting] = useState<LightingMood>('standard');
  const [addedIds, setAddedIds] = useState<string[]>([]);

  const currentScene = STUDIO_SCENES[activeSceneIndex];
  const activeHotspot =
    currentScene.hotspots.find((h) => h.id === selectedHotspotId) ||
    currentScene.hotspots[0];

  const handleSceneSelect = (idx: number) => {
    setActiveSceneIndex(idx);
    setSelectedHotspotId(STUDIO_SCENES[idx].hotspots[0].id);
  };

  const handleAddElement = (hs: InteractiveHotspot) => {
    if (!addedIds.includes(hs.id)) {
      setAddedIds((prev) => [...prev, hs.id]);
    }
    onAddBlueprintElement(currentScene.title, hs);
  };

  const currentLighting =
    LIGHTING_OPTIONS.find((l) => l.id === lighting) || LIGHTING_OPTIONS[0];

  return (
    <section
      id="studio"
      className="py-20 md:py-24 border-t border-[var(--theme-border)] text-white transition-colors duration-300"
      style={{ backgroundColor: 'var(--theme-primary)' }}
    >
      <div className="max-w-[1280px] mx-auto px-6">
        {/* Header + Live 2026 Theme Switcher */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-10">
          <div className="max-w-2xl">
            <p
              className="text-xs font-medium tracking-wide mb-2"
              style={{ color: 'var(--theme-accent-bright)' }}
            >
              Interactive 2026 Blueprint & Color Theme Studio
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl font-semibold tracking-tight text-white text-balance">
              Inspect Event Architecture & Test Live Color Themes
            </h2>
            <p className="mt-3 text-sm sm:text-base text-white/75 leading-relaxed">
              Switch the website’s color theme below, toggle marquee lighting moods, and click the numbered pins on each 2026 event scene to inspect materials and add elements straight to your booking.
            </p>
          </div>

          {/* Live Color Theme Selector */}
          <div className="bg-black/25 border border-white/15 rounded-2xl p-4 shrink-0">
            <p className="text-xs font-medium text-white/80 mb-2.5 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5" style={{ color: 'var(--theme-accent-bright)' }} />
              <span>Live 2026 Color Theme</span>
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 gap-2">
              {MOOD_THEMES.map((theme) => {
                const isSelected = activeTheme === theme.id;
                return (
                  <button
                    key={theme.id}
                    type="button"
                    onClick={() => onChangeTheme(theme.id)}
                    className={`flex items-center gap-2.5 px-3 py-2 rounded-lg border text-left transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-white text-[#0F1E1A] border-white'
                        : 'bg-white/5 text-white/85 border-white/15 hover:bg-white/10'
                    }`}
                  >
                    <span
                      className="w-4 h-4 rounded-full border border-black/20 shrink-0"
                      style={{ backgroundColor: theme.primary }}
                    />
                    <span className="text-xs font-medium truncate">
                      {theme.name.split(' & ')[0]}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Scene Switcher + Lighting Controls */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div className="inline-flex items-center gap-1 p-1 bg-black/25 border border-white/15 rounded-lg overflow-x-auto">
            {STUDIO_SCENES.map((scene, idx) => {
              const active = idx === activeSceneIndex;
              return (
                <button
                  key={scene.id}
                  type="button"
                  onClick={() => handleSceneSelect(idx)}
                  className={`px-3.5 py-2 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    active
                      ? 'bg-white text-[#0F1E1A]'
                      : 'text-white/75 hover:text-white'
                  }`}
                >
                  0{idx + 1}. {scene.title.replace('2026 ', '')}
                </button>
              );
            })}
          </div>

          <div className="inline-flex items-center gap-1 p-1 bg-black/25 border border-white/15 rounded-lg self-start md:self-auto">
            {LIGHTING_OPTIONS.map((opt) => {
              const active = lighting === opt.id;
              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setLighting(opt.id)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                    active
                      ? 'bg-[#DFBA6F] text-[#0F1E1A]'
                      : 'text-white/75 hover:text-white'
                  }`}
                >
                  {opt.id === 'candlelight' && <Flame className="w-3 h-3" />}
                  {opt.id === 'golden' && <Sun className="w-3 h-3" />}
                  {opt.id === 'standard' && <Sparkles className="w-3 h-3" />}
                  <span>{opt.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Interactive Blueprint Canvas + Spec Inspector */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Left Interactive Photo with Clickable Hotspots */}
          <div className="lg:col-span-8 relative rounded-2xl overflow-hidden border border-white/15 bg-black/30 min-h-[340px] sm:min-h-[460px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentScene.id}
                initial={{ opacity: 0.4 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0.4 }}
                transition={{ duration: 0.25 }}
                className="w-full h-full"
              >
                <div
                  className="w-full h-full transition-all duration-300"
                  style={{ filter: currentLighting.filter }}
                >
                  <SafeImage
                    src={currentScene.image}
                    alt={currentScene.title}
                    fallbackTitle={currentScene.title}
                    className="w-full h-full min-h-[340px] sm:min-h-[460px] object-cover"
                  />
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Scrim at bottom for legibility */}
            <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/80 to-transparent pointer-events-none" />

            {/* Interactive Hotspot Pins */}
            {currentScene.hotspots.map((hs, index) => {
              const isSelected = activeHotspot.id === hs.id;
              return (
                <button
                  key={hs.id}
                  type="button"
                  onClick={() => setSelectedHotspotId(hs.id)}
                  aria-label={`Inspect ${hs.label}`}
                  style={{ left: `${hs.x}%`, top: `${hs.y}%` }}
                  className={`absolute -translate-x-1/2 -translate-y-1/2 w-9 h-9 rounded-full flex items-center justify-center text-xs font-mono font-semibold border transition-transform duration-150 cursor-pointer shadow-lg ${
                    isSelected
                      ? 'scale-115 bg-[#DFBA6F] text-[#0F1E1A] border-white ring-4 ring-[#DFBA6F]/35'
                      : 'bg-black/75 text-white border-white/60 hover:scale-110 hover:bg-[#DFBA6F] hover:text-[#0F1E1A]'
                  }`}
                >
                  0{index + 1}
                </button>
              );
            })}

            <div className="absolute bottom-4 left-5 right-5 flex items-center justify-between gap-4 text-xs text-white/85 pointer-events-none">
              <span>{currentScene.description}</span>
            </div>
          </div>

          {/* Right Hotspot Detail Inspector */}
          <div className="lg:col-span-4 bg-black/25 border border-white/15 rounded-2xl p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-xs text-white/65 mb-4">
                <span>{currentScene.category}</span>
                <span style={{ color: 'var(--theme-accent-bright)' }}>
                  Interactive Pin Detail
                </span>
              </div>

              {/* Pin Selector Tabs */}
              <div className="flex items-center gap-2 mb-6">
                {currentScene.hotspots.map((hs, i) => {
                  const active = activeHotspot.id === hs.id;
                  return (
                    <button
                      key={hs.id}
                      type="button"
                      onClick={() => setSelectedHotspotId(hs.id)}
                      className={`px-3 py-1.5 rounded-md text-xs font-mono transition-colors cursor-pointer ${
                        active
                          ? 'bg-[#DFBA6F] text-[#0F1E1A] font-semibold'
                          : 'bg-white/10 text-white/80 hover:bg-white/15'
                      }`}
                    >
                      Pin 0{i + 1}
                    </button>
                  );
                })}
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeHotspot.id}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.18 }}
                >
                  <h3 className="font-serif text-2xl font-semibold text-white">
                    {activeHotspot.label}
                  </h3>

                  <p className="mt-3 text-sm text-white/80 leading-relaxed">
                    {activeHotspot.detail}
                  </p>

                  <dl className="mt-6 pt-5 border-t border-white/15 space-y-3 text-xs">
                    <div className="flex justify-between gap-4">
                      <dt className="text-white/60">Primary Material</dt>
                      <dd className="text-white font-medium text-right">
                        {activeHotspot.material}
                      </dd>
                    </div>
                    <div className="flex justify-between gap-4">
                      <dt className="text-white/60">Indicative Add-on</dt>
                      <dd
                        className="font-semibold tabular-nums text-right"
                        style={{ color: 'var(--theme-accent-bright)' }}
                      >
                        {activeHotspot.addonPrice}
                      </dd>
                    </div>
                  </dl>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="mt-8 pt-5 border-t border-white/15">
              <button
                type="button"
                onClick={() => handleAddElement(activeHotspot)}
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 text-xs font-semibold rounded-lg transition-colors cursor-pointer"
                style={{
                  backgroundColor: 'var(--theme-accent-bright)',
                  color: '#0F1E1A',
                }}
              >
                {addedIds.includes(activeHotspot.id) ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Added to Consultation — Book Now</span>
                  </>
                ) : (
                  <>
                    <Plus className="w-4 h-4" />
                    <span>Include This Element in My Event</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
