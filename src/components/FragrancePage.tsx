import React, { useState, useRef, useEffect } from 'react';
import {
  Sparkles,
  ArrowUpRight,
  Search,
  Check,
  Plus,
  Droplets,
  Layers,
  ShoppingBag,
  X,
  Compass,
  Flame,
  Wind,
  CheckCircle2,
} from 'lucide-react';
import { FRAGRANCES_DATA, CURATED_COLLECTIONS, FragranceNote } from '../data/fragrances';

interface FragrancePageProps {
  onBackToHome: () => void;
  onOpenBuyModal: () => void;
}

export const FragrancePage: React.FC<FragrancePageProps> = ({
  onBackToHome,
  onOpenBuyModal,
}) => {
  const fullscreenVideoRef = useRef<HTMLVideoElement | null>(null);
  const [selectedFamily, setSelectedFamily] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFragrance, setSelectedFragrance] = useState<FragranceNote | null>(null);
  const [refillCart, setRefillCart] = useState<string[]>([]);
  const [activeBlendNotes, setActiveBlendNotes] = useState<string[]>([
    'Mysore Sacred Sandalwood (Santalum)',
    'First Rain Baked Earth (Petrichor Mitti)',
  ]);
  const [blendCreatedNotification, setBlendCreatedNotification] = useState(false);

  // Guarantee autoplay for fullscreen video on mount
  useEffect(() => {
    const v = fullscreenVideoRef.current;
    if (!v) return;
    v.muted = true;
    v.play().catch(() => {});
  }, []);

  const handleToggleRefill = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setRefillCart((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Filtered Fragrances
  const filteredFragrances = FRAGRANCES_DATA.filter((item) => {
    const matchesFamily =
      selectedFamily === 'All' ||
      item.family.toLowerCase().includes(selectedFamily.toLowerCase()) ||
      (selectedFamily === 'Woods & Earth' && item.family === 'Woods & Earth');
    const matchesSearch =
      !searchQuery ||
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.alias.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.character.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.inspiration.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFamily && matchesSearch;
  });

  // Notes organized for the Interactive Scent Finder
  const SCENT_FINDER_CATEGORIES = [
    {
      category: 'Wood & Earth Notes',
      icon: Flame,
      accent: '#d97706',
      notes: [
        'Charred Campfire Wood (Smoked Guaiac)',
        'Mysore Sacred Sandalwood (Santalum)',
        'First Rain Baked Earth (Petrichor Mitti)',
      ],
    },
    {
      category: 'Floral & Botanical Notes',
      icon: Droplets,
      accent: '#f43f5e',
      notes: [
        'French Lavender & Blue Lotus (Nymphaea Lavande)',
        'Soft Indian Rose (Rosa Damascena)',
        'Fresh Aloe Nectar (Succulent Botanica)',
      ],
    },
    {
      category: 'Citrus, Fruit & Mint',
      icon: Wind,
      accent: '#eab308',
      notes: [
        'Zesty Citrus Reserve (Bergamot Aldehyde)',
        'Ripe Valencia Orange (Citrus Sinensis)',
        'Frosty Peppermint (Mentha Piperita)',
        'Abstract Orchard Fruit (Ester Blend)',
      ],
    },
    {
      category: 'Spices, Teas & Resins',
      icon: Sparkles,
      accent: '#ea580c',
      notes: [
        'Kashmiri Royal Saffron (Crocus Sativus)',
        'Sugared Green Cardamom (Elettaria)',
        'Toasted Ceylon Cinnamon (Cassia Bark)',
        'Aromatic Madagascar Clove (Syzygium Bud)',
        'Mild Assam Tea (Spiced Infusion)',
        'Roasted Arabica Coffee (Espresso Crema)',
      ],
    },
    {
      category: 'Gourmand & Savory Notes',
      icon: Layers,
      accent: '#f59e0b',
      notes: [
        'Rich Dark Chocolate (Cacao Noir)',
        'Madagascar Sweet Vanilla (Vanilla Planifolia)',
        'Reduced Sweet Milk (Lactonic Khoya)',
        'Tropical Creamy Coconut (Cocos Nucifera)',
        'Rich Spiced Biryani (Saffron Savory)',
        'Woodfired Savory Hearth (Umami Crust)',
        'Pungent Mustard & Garlic (Brassica Allium)',
      ],
    },
    {
      category: 'Atmospheric, Clinical & Abstract Notes',
      icon: Compass,
      accent: '#a855f7',
      notes: [
        'Royal Amber Perfume (Imperial Oud)',
        'Sacred Temple Incense (Havan Samagri)',
        'Herbal Camphor Relief (Eucalyptus Botanica)',
        'Clinical Clean Pine (Phenolic Ozone)',
        'Mild Astringent Bitters (Botanical Base)',
        'Pure Distilled Water (Aqua Zero)',
        'Industrial Motor Fuel (Octane Spirit)',
      ],
    },
  ];

  const handleToggleBlendNote = (noteName: string) => {
    setActiveBlendNotes((prev) => {
      if (prev.includes(noteName)) {
        return prev.filter((n) => n !== noteName);
      }
      if (prev.length >= 3) {
        return [...prev.slice(1), noteName];
      }
      return [...prev, noteName];
    });
  };

  const handleTestBlend = () => {
    setBlendCreatedNotification(true);
    setTimeout(() => setBlendCreatedNotification(false), 3500);
  };

  return (
    <div className="w-full bg-black text-white min-h-screen selection:bg-neutral-800 selection:text-white">
      {/* 
        1. THE FRAGRANCE LANDING PAGE FULLSCREEN VIDEO ON LOOP
        Plays full screen edge-to-edge just like the home page does
      */}
      <section className="relative w-full h-[100dvh] min-h-[100dvh] bg-black overflow-hidden flex items-center justify-center p-0 m-0">
        <video
          ref={fullscreenVideoRef}
          src="/assets/aistudio/IMG_9423_d65311ef.MP4"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          controls={false}
          disablePictureInPicture
          controlsList="nodownload nofullscreen noremoteplayback"
          className="w-full h-full object-cover bg-black"
        >
          <source src="/assets/aistudio/IMG_9423_d65311ef.MP4" type="video/mp4" />
        </video>

      </section>

      {/* 
        MAIN FRAGRANCE CONTENT CONTAINER
      */}
      <main className="max-w-7xl mx-auto px-4 sm:px-8 md:px-12 py-16 sm:py-24 space-y-16 sm:space-y-24">
        {/* 
          HERO HEADLINE:
          "Discover your atmosphere.
          Explore scents inspired by nature, familiar rituals, delicious foods and the places that stay with us."
        */}
        <section className="space-y-6 max-w-4xl pt-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border-2 border-white/20 text-xs font-mono uppercase tracking-widest text-[#2997ff]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Fragrance Architecture</span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.12]">
            Discover your atmosphere.
          </h1>

          <p className="text-base sm:text-xl md:text-2xl text-neutral-300 font-normal leading-relaxed">
            Explore scents inspired by nature, familiar rituals, delicious foods and the places that stay with us.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-mono text-neutral-400">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              Hydrosol-based formulations
            </span>
            <span className="text-neutral-600">•</span>
            <span>Zero lingering heavy oils</span>
            <span className="text-neutral-600">•</span>
            <span>Cold ultrasonic dispersion</span>
          </div>
        </section>

        {/* 
          SHOWCASE IMAGE: Library of Scents Handheld Vials
          Added right after Discover your atmosphere, with rounded corners and distinct border
        */}
        <section className="w-full">
          <div className="w-full rounded-2xl sm:rounded-3xl md:rounded-[36px] overflow-hidden border-2 border-white/25 ring-1 ring-white/10 shadow-[0_24px_60px_rgba(0,0,0,0.95)] bg-black">
            <img
              src="/assets/aistudio/Library_of_Scents_with_Handheld_Vials_fd03d189.png"
              alt="Library of Scents - Nature-inspired hydrosol formulations"
              className="w-full h-auto object-cover block"
            />
          </div>
        </section>

        {/* 
          3. SCENT GRID & FILTERS
          "Display individual scents in a clean, spacious grid with filters for fragrance family, character, mood and availability."
        */}
        <section id="scents-grid" className="space-y-8 pt-4">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-white/10 pb-6">
            <div>
              <p className="text-xs font-mono uppercase tracking-widest text-[#2997ff]">Refill Catalog</p>
              <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-white mt-1">
                Individual Scent Cartridges
              </h2>
              <p className="text-xs sm:text-sm text-neutral-400 mt-1">
                Every fragrance is engineered as a dedicated plug-and-play cartridge with individual matrix channel control.
              </p>
            </div>

            {/* Search Input */}
            <div className="relative w-full lg:w-80">
              <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search notes, ingredients, mood..."
                className="w-full pl-10 pr-4 py-2.5 rounded-full bg-[#161618] border-2 border-white/20 ring-1 ring-white/10 text-white placeholder-neutral-500 text-xs focus:outline-none focus:border-[#2997ff]"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Family Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {[
              'All',
              'Woods & Earth',
              'Floral & Botanical',
              'Citrus, Fruit & Mint',
              'Spices, Teas & Resins',
              'Gourmand & Savory',
              'Atmospheric, Clinical & Abstract',
            ].map((fam) => (
              <button
                key={fam}
                onClick={() => setSelectedFamily(fam)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-200 cursor-pointer border ${
                  selectedFamily === fam
                    ? 'bg-white text-black font-semibold border-white shadow-md'
                    : 'bg-[#161618] text-neutral-300 border-white/15 hover:border-white/30 hover:text-white'
                }`}
              >
                {fam}
              </button>
            ))}
          </div>

          {/* Scent Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredFragrances.map((fragrance) => {
              const inCart = refillCart.includes(fragrance.id);
              return (
                <div
                  key={fragrance.id}
                  onClick={() => setSelectedFragrance(fragrance)}
                  className="rounded-2xl sm:rounded-3xl border-2 border-white/20 ring-1 ring-white/10 bg-[#161618] hover:border-white/40 transition-all duration-300 p-6 flex flex-col justify-between shadow-xl cursor-pointer group relative overflow-hidden"
                >
                  <div className="space-y-4">
                    {/* Top Tag & Accent Dot */}
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 px-2.5 py-1 rounded-full bg-white/[0.04] border border-white/10">
                        {fragrance.family.toUpperCase()}
                      </span>
                      <div className="flex items-center gap-1.5">
                        <span
                          className="w-2.5 h-2.5 rounded-full"
                          style={{ backgroundColor: fragrance.accentColor }}
                        />
                        <span className="text-[11px] font-mono text-neutral-400">{fragrance.mood}</span>
                      </div>
                    </div>

                    {/* Scent Title & Character */}
                    <div>
                      <h3 className="text-xl font-bold text-white group-hover:text-[#2997ff] transition-colors leading-snug">
                        {fragrance.name}
                      </h3>
                      <p className="text-xs font-mono text-neutral-400 mt-0.5">
                        {fragrance.alias}
                      </p>
                      <p className="text-xs sm:text-sm font-medium text-neutral-300 mt-2">
                        {fragrance.character}
                      </p>
                    </div>

                    <p className="text-xs text-neutral-400 leading-relaxed line-clamp-2">
                      {fragrance.fullDescription}
                    </p>
                  </div>

                  {/* Card Bottom: Price & Explore Link */}
                  <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
                    <div>
                      <span className="text-base font-bold text-white">₹{fragrance.price}</span>
                      <span className="text-[11px] text-neutral-400 ml-1.5">• 15ml cartridge</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={(e) => handleToggleRefill(fragrance.id, e)}
                        className={`px-3 py-1 rounded-full text-xs font-medium transition-all cursor-pointer ${
                          inCart
                            ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                            : 'bg-white/10 text-white hover:bg-white/20 border border-white/15'
                        }`}
                      >
                        {inCart ? 'Added ✓' : '+ Refill'}
                      </button>

                      <span className="inline-flex items-center text-xs text-[#2997ff] font-medium group-hover:translate-x-0.5 transition-transform">
                        Explore fragrance ↗
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {filteredFragrances.length === 0 && (
            <div className="py-16 text-center space-y-3 bg-[#161618] rounded-3xl border-2 border-white/15 p-8">
              <Droplets className="w-8 h-8 text-neutral-500 mx-auto" />
              <h4 className="text-lg font-bold text-white">No matching fragrances found</h4>
              <p className="text-xs text-neutral-400 max-w-sm mx-auto">
                Try selecting a different family or clearing your search term.
              </p>
              <button
                onClick={() => {
                  setSelectedFamily('All');
                  setSearchQuery('');
                }}
                className="mt-2 px-5 py-2 rounded-full bg-white text-black text-xs font-semibold hover:bg-neutral-200 transition-all cursor-pointer"
              >
                Reset Filters
              </button>
            </div>
          )}
        </section>

        {/* 
          4. CURATED COLLECTIONS:
          "Bring your favourites home.
          Make it easy to find compatible refills, see their prices and purchase individual scents or curated collections."
        */}
        <section className="space-y-8">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[11px] font-mono uppercase tracking-widest text-[#2997ff] border border-white/10">
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Curated Atmospheres</span>
            </div>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white">
              Bring your favourites home.
            </h2>
            <p className="text-xs sm:text-base text-neutral-300 max-w-2xl">
              Compatible refill cartridges and bespoke scent suites engineered for your Aro - 1 device.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {CURATED_COLLECTIONS.map((col) => (
              <div
                key={col.id}
                className="rounded-2xl sm:rounded-3xl border-2 border-white/20 ring-1 ring-white/10 bg-[#161618] p-6 sm:p-7 flex flex-col justify-between shadow-2xl hover:border-white/35 transition-all duration-300 group"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 px-2.5 py-1 rounded-full bg-white/[0.04] border border-white/10">
                      {col.family}
                    </span>
                    <span className="text-xs font-mono text-emerald-400 font-semibold">
                      Save ₹{col.originalPrice - col.price}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-[#2997ff] transition-colors">
                      {col.title}
                    </h3>
                    <p className="text-xs text-neutral-400 mt-1">
                      {col.description}
                    </p>
                  </div>

                  {/* Included bottles list */}
                  <div className="p-3.5 rounded-xl bg-black/60 border border-white/10 space-y-2">
                    <div className="text-[11px] font-mono text-neutral-400">Included Cartridges:</div>
                    <div className="space-y-1">
                      {col.bottles.map((b) => (
                        <div key={b} className="flex items-center gap-2 text-xs text-neutral-200">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#2997ff]" />
                          <span>{b}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between gap-4">
                  <div>
                    <div className="text-lg font-bold text-white">₹{col.price}</div>
                    <div className="text-[11px] text-neutral-500 line-through">₹{col.originalPrice}</div>
                  </div>

                  <button
                    onClick={onOpenBuyModal}
                    className="px-5 py-2.5 rounded-full bg-[#0071e3] hover:bg-[#0077ed] text-white text-xs font-semibold transition-all duration-200 cursor-pointer shadow-md hover:shadow-blue-500/25 flex items-center gap-1.5 flex-shrink-0"
                  >
                    <span>Pre-order Set</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 
          5. INTERACTIVE SCENT FINDER
          "5. Add an interactive scent finder - This could become a distinctive AromaxAI feature."
          Available notes:
          Wood & Earth, Floral & Botanical, Citrus/Fruit/Mint, Spices/Teas/Resins, Gourmand & Savory, Atmospheric/Clinical/Abstract
        */}
        <section className="rounded-[28px] sm:rounded-[38px] md:rounded-[44px] border-2 border-neutral-700/80 ring-1 ring-white/10 bg-gradient-to-b from-[#18181a] via-[#121214] to-black p-6 sm:p-10 md:p-14 shadow-2xl relative overflow-hidden space-y-8">
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[11px] font-mono uppercase tracking-widest text-[#2997ff] border border-white/10">
              <Compass className="w-3.5 h-3.5" />
              <span>Algorithmic Atelier</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white">
              Interactive Scent Finder
            </h2>
            <p className="text-sm sm:text-base text-neutral-300 leading-relaxed">
              Craft your bespoke atmospheric accord. Select up to 3 individual notes from our precision library to simulate real-time diffusion harmony on Aro - 1.
            </p>
          </div>

          {/* Active Blend Dock */}
          <div className="p-5 sm:p-7 rounded-2xl sm:rounded-3xl bg-neutral-900/90 border-2 border-white/20 ring-1 ring-white/10 shadow-xl space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-neutral-400">Current Accord Matrix</span>
                <h4 className="text-lg font-bold text-white mt-0.5">
                  {activeBlendNotes.length === 0
                    ? 'No notes selected (Click below to add)'
                    : `Active Blend: ${activeBlendNotes.length} of 3 Slots Active`}
                </h4>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={handleTestBlend}
                  disabled={activeBlendNotes.length === 0}
                  className="px-6 py-2.5 rounded-full bg-[#0071e3] hover:bg-[#0077ed] disabled:opacity-40 text-white text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer shadow-lg shadow-blue-500/25 flex items-center gap-2"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Simulate Accord on Aro - 1</span>
                </button>
              </div>
            </div>

            {/* Selected Pills */}
            <div className="flex flex-wrap gap-2.5">
              {activeBlendNotes.map((note) => (
                <div
                  key={note}
                  className="px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 text-white text-xs flex items-center gap-2 shadow-sm"
                >
                  <span className="w-2 h-2 rounded-full bg-[#2997ff]" />
                  <span>{note}</span>
                  <button
                    onClick={() => handleToggleBlendNote(note)}
                    className="text-neutral-400 hover:text-white"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))}
              {activeBlendNotes.length < 3 && (
                <span className="px-3 py-1.5 rounded-full border border-dashed border-white/20 text-neutral-500 text-xs">
                  + Select {3 - activeBlendNotes.length} more note{3 - activeBlendNotes.length > 1 ? 's' : ''}
                </span>
              )}
            </div>

            {blendCreatedNotification && (
              <div className="p-3.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2 animate-fade-in">
                <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                <span>
                  Algorithmic blend validated! Resonance score: 98.4%. Ready to map to Aro - 1 matrix slots.
                </span>
              </div>
            )}
          </div>

          {/* Note Selection Categories */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
            {SCENT_FINDER_CATEGORIES.map((cat) => {
              const IconComp = cat.icon;
              return (
                <div
                  key={cat.category}
                  className="rounded-2xl border-2 border-white/15 bg-black/60 p-5 space-y-4 shadow-lg"
                >
                  <div className="flex items-center gap-2.5 pb-2 border-b border-white/10">
                    <div
                      className="w-7 h-7 rounded-lg flex items-center justify-center text-white"
                      style={{ backgroundColor: `${cat.accent}30` }}
                    >
                      <IconComp className="w-3.5 h-3.5" style={{ color: cat.accent }} />
                    </div>
                    <h4 className="font-bold text-sm text-white">{cat.category}</h4>
                  </div>

                  <div className="space-y-2">
                    {cat.notes.map((note) => {
                      const isSelected = activeBlendNotes.includes(note);
                      return (
                        <button
                          key={note}
                          onClick={() => handleToggleBlendNote(note)}
                          className={`w-full text-left p-2.5 rounded-xl text-xs transition-all duration-200 cursor-pointer flex items-center justify-between border ${
                            isSelected
                              ? 'bg-white text-black font-semibold border-white shadow-sm'
                              : 'bg-white/[0.03] text-neutral-300 border-white/10 hover:border-white/25 hover:text-white'
                          }`}
                        >
                          <span className="truncate pr-2">{note}</span>
                          {isSelected ? (
                            <Check className="w-3.5 h-3.5 text-black flex-shrink-0" />
                          ) : (
                            <Plus className="w-3.5 h-3.5 text-neutral-500 flex-shrink-0" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Bottom Navigation Back to Aro - 1 */}
        <section className="pt-8 border-t border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <button
            onClick={onBackToHome}
            className="px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 active:scale-95 text-white text-xs sm:text-sm font-medium border border-white/20 transition-all cursor-pointer"
          >
            ← Return to Aro - 1 Hardware
          </button>

          <button
            onClick={onOpenBuyModal}
            className="px-8 py-3 rounded-full bg-[#0071e3] hover:bg-[#0077ed] text-white text-xs sm:text-sm font-semibold transition-all cursor-pointer shadow-lg shadow-blue-500/25"
          >
            Pre-order Aro - 1 System
          </button>
        </section>
      </main>

      {/* 
        FRAGRANCE DEEP DIVE MODAL
        Example provided by user:
        Mysore Sacred Sandalwood
        "A warm, woody fragrance inspired by the smooth, grounding character of sandalwood."
        Character / Inspiration / Compatible device / Refill details / Shop this fragrance
      */}
      {selectedFragrance && (
        <div
          onClick={() => setSelectedFragrance(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-2xl animate-fade-in"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-2xl bg-[#161618] border-2 border-white/20 ring-1 ring-white/10 rounded-[28px] sm:rounded-[36px] p-6 sm:p-9 space-y-6 text-white shadow-[0_24px_80px_rgba(0,0,0,0.9)] relative max-h-[90vh] overflow-y-auto custom-scrollbar"
          >
            {/* Header */}
            <div className="flex items-start justify-between border-b border-white/10 pb-5">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 px-2.5 py-0.5 rounded-full bg-white/[0.05] border border-white/10">
                    {selectedFragrance.family}
                  </span>
                  <span className="text-xs text-[#2997ff] font-mono">{selectedFragrance.alias}</span>
                </div>
                <h3 className="text-2xl sm:text-4xl font-bold tracking-tight text-white pt-1">
                  {selectedFragrance.name}
                </h3>
                <p className="text-xs sm:text-sm text-neutral-300">
                  {selectedFragrance.fullDescription}
                </p>
              </div>

              <button
                onClick={() => setSelectedFragrance(null)}
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 active:scale-95 flex items-center justify-center text-neutral-300 hover:text-white transition-all cursor-pointer flex-shrink-0"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Note Pyramids */}
            <div className="grid grid-cols-3 gap-3 p-4 rounded-2xl bg-black/60 border border-white/10 text-center">
              <div>
                <span className="text-[10px] font-mono text-neutral-400 uppercase">Top Notes</span>
                <p className="text-xs font-medium text-white mt-0.5">{selectedFragrance.topNotes}</p>
              </div>
              <div>
                <span className="text-[10px] font-mono text-neutral-400 uppercase">Heart Notes</span>
                <p className="text-xs font-medium text-white mt-0.5">{selectedFragrance.heartNotes}</p>
              </div>
              <div>
                <span className="text-[10px] font-mono text-neutral-400 uppercase">Base Notes</span>
                <p className="text-xs font-medium text-white mt-0.5">{selectedFragrance.baseNotes}</p>
              </div>
            </div>

            {/* Detailed sections required by user */}
            <div className="space-y-4 text-xs sm:text-sm">
              <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 space-y-1">
                <h5 className="font-bold text-white text-xs uppercase tracking-wider font-mono text-[#2997ff]">
                  Character
                </h5>
                <p className="text-neutral-300 leading-relaxed">
                  {selectedFragrance.characterDetails}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 space-y-1">
                <h5 className="font-bold text-white text-xs uppercase tracking-wider font-mono text-amber-400">
                  Inspiration
                </h5>
                <p className="text-neutral-300 leading-relaxed">
                  {selectedFragrance.inspiration}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 space-y-1">
                <h5 className="font-bold text-white text-xs uppercase tracking-wider font-mono text-emerald-400">
                  Compatible Device
                </h5>
                <p className="text-neutral-300 leading-relaxed">
                  {selectedFragrance.compatibleDevice}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 space-y-1">
                <h5 className="font-bold text-white text-xs uppercase tracking-wider font-mono text-purple-400">
                  Refill Details
                </h5>
                <p className="text-neutral-300 leading-relaxed">
                  Volume: {selectedFragrance.volume} • Price: ₹{selectedFragrance.price} (Inclusive of taxes). Ingredients: {selectedFragrance.ingredients} Cold ultrasonic vaporization without heating or residue.
                </p>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <span className="text-2xl font-bold text-white">₹{selectedFragrance.price}</span>
                <span className="text-xs text-neutral-400 ml-2">Standard Refill Cartridge</span>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button
                  onClick={() => {
                    handleToggleRefill(selectedFragrance.id);
                  }}
                  className={`w-full sm:w-auto px-6 py-3 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                    refillCart.includes(selectedFragrance.id)
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                      : 'bg-white/10 text-white hover:bg-white/20 border border-white/20'
                  }`}
                >
                  {refillCart.includes(selectedFragrance.id) ? 'Added to Refill Order ✓' : 'Add to Refill Cart'}
                </button>

                <button
                  onClick={() => {
                    setSelectedFragrance(null);
                    onOpenBuyModal();
                  }}
                  className="w-full sm:w-auto px-7 py-3 rounded-full bg-[#0071e3] hover:bg-[#0077ed] text-white text-xs font-semibold transition-all cursor-pointer shadow-lg shadow-blue-500/25 whitespace-nowrap"
                >
                  Shop this fragrance
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
