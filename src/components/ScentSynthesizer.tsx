import React, { useState } from 'react';
import { Sparkles, Wind, Droplet, ArrowRight, Flame, Atom, Clock, RefreshCw } from 'lucide-react';
import { playMistPuffSound, playHarmonicChime } from '../utils/audio';

export interface ScentFormula {
  id: string;
  name: string;
  tagline: string;
  prompt: string;
  topNotes: string[];
  heartNotes: string[];
  baseNotes: string[];
  molecules: {
    name: string;
    formula: string;
    sensoryCharacter: string;
    concentration: string;
  }[];
  metrics: {
    freshness: number;
    warmth: number;
    sweetness: number;
    earthiness: number;
    intensity: number;
  };
  diffusionDuration: string;
  hardwareDispenseTime: string;
  ambientVaporColor: string;
}

const PRESET_SCENTS: ScentFormula[] = [
  {
    id: 'blueberry-ozone',
    name: 'Wild Blueberry & Sub-Zero Ozone',
    tagline: 'Crisp alpine air laced with chilled wild berries and electric ionization',
    prompt: 'Wild blueberry bushes growing on a sub-zero mountain ridge just after lightning strikes',
    topNotes: ['Blueberry Skin Accord', 'Glacial Ozone', 'Aldehyde C-12'],
    heartNotes: ['Crushed Bilberry Pulp', 'Frosted Violet Leaf', 'Dew-soaked Fir'],
    baseNotes: ['Cashmere Musk', 'White Cedarwood', 'Ambroxan Crystals'],
    molecules: [
      { name: 'Linalool', formula: 'C10H18O', sensoryCharacter: 'Floral blueberry sweetness', concentration: '18.4%' },
      { name: 'Geosmin', formula: 'C12H22O', sensoryCharacter: 'Crisp morning earth & petrichor', concentration: '3.1%' },
      { name: 'Iso E Super', formula: 'C16H26O', sensoryCharacter: 'Velvety cedarwood warmth', concentration: '34.0%' },
      { name: 'Triplal', formula: 'C9H14O', sensoryCharacter: 'Fresh sliced green stem', concentration: '7.8%' },
    ],
    metrics: { freshness: 94, warmth: 35, sweetness: 68, earthiness: 52, intensity: 78 },
    diffusionDuration: '6.5 hours',
    hardwareDispenseTime: '0.12s micro-nebulization',
    ambientVaporColor: 'from-indigo-500/20 to-blue-400/20',
  },
  {
    id: 'rain-petrichor',
    name: '2:00 AM Rain on Warm Asphalt',
    tagline: 'The evocative petrichor sensation of midnight summer rain drops on hot stone',
    prompt: 'Sudden thunderstorm in late August hitting hot pavement on an empty city boulevard at night',
    topNotes: ['Atmospheric Rainwater', 'Ozone Ionization', 'Cold Asphalt Mist'],
    heartNotes: ['Petrichor Accord', 'Wet Concrete', 'Damp Moss'],
    baseNotes: ['Geosmin Tincture', 'Steam Distilled Vetiver', 'Dark Patchouli Clean'],
    molecules: [
      { name: 'Geosmin', formula: 'C12H22O', sensoryCharacter: 'Deep organic rain-on-earth signature', concentration: '12.6%' },
      { name: '2-Methylisoborneol', formula: 'C11H20O', sensoryCharacter: 'Damp soil & mineral pavement', concentration: '6.4%' },
      { name: 'Vetiverol', formula: 'C15H24O', sensoryCharacter: 'Smoky earthy root foundation', concentration: '22.0%' },
      { name: 'Calone 1951', formula: 'C10H10O3', sensoryCharacter: 'Fresh sea air & watery ozone', concentration: '14.2%' },
    ],
    metrics: { freshness: 88, warmth: 42, sweetness: 18, earthiness: 96, intensity: 84 },
    diffusionDuration: '8.2 hours',
    hardwareDispenseTime: '0.08s micro-nebulization',
    ambientVaporColor: 'from-slate-400/20 to-cyan-500/20',
  },
  {
    id: 'antique-library',
    name: 'Antiquarian Library & Amber Tea',
    tagline: 'Yellowed parchment pages, polished mahogany shelves, and steaming steeped chamomile',
    prompt: 'Dusty sunbeams through stained glass over 18th-century leather manuscripts and warm tea',
    topNotes: ['Bergamot Peel', 'Chamomile Blossom', 'Aged Paper Flakes'],
    heartNotes: ['Lignin Breakdown (Vanillin)', 'Leather Binding Accord', 'Dried Black Tea'],
    baseNotes: ['Madagascar Vanilla Bean', 'Dark Amber Resin', 'Atlas Cedar'],
    molecules: [
      { name: 'Vanillin', formula: 'C8H8O3', sensoryCharacter: 'Decomposing paper lignin & comforting warmth', concentration: '24.5%' },
      { name: 'Benzaldehyde', formula: 'C7H6O', sensoryCharacter: 'Bitter almond & vintage leather glue', concentration: '8.2%' },
      { name: 'Guaiacol', formula: 'C7H8O2', sensoryCharacter: 'Smoky phenolic mahogany nuance', concentration: '11.0%' },
      { name: 'Cedrol', formula: 'C15H26O', sensoryCharacter: 'Dry library archive wood', concentration: '28.0%' },
    ],
    metrics: { freshness: 26, warmth: 92, sweetness: 64, earthiness: 76, intensity: 82 },
    diffusionDuration: '10.5 hours',
    hardwareDispenseTime: '0.15s micro-nebulization',
    ambientVaporColor: 'from-amber-500/20 to-orange-400/20',
  },
  {
    id: 'paris-patisserie',
    name: 'Dawn Parisian Brioche & Espresso',
    tagline: 'Golden flaky butter crust, toasted hazelnuts, and dark pulled arabica crema',
    prompt: 'Stepping into a subterranean Paris bakery at 5:30 AM as the first batch of brioche leaves the hearth',
    topNotes: ['Dark Roasted Arabica', 'Whipped Salted Butter', 'Golden Caramelized Sugar'],
    heartNotes: ['Proofed Yeast Dough', 'Flaky Brioche Crust', 'Warm Milk Foam'],
    baseNotes: ['Toasted Tonka Bean', 'Ethyl Maltol', 'Benzoin Siam'],
    molecules: [
      { name: 'Ethyl Maltol', formula: 'C7H8O3', sensoryCharacter: 'Caramelized crust & baked sugar', concentration: '31.2%' },
      { name: 'Furfuryl Mercaptan', formula: 'C5H6OS', sensoryCharacter: 'Freshly roasted dark coffee bean', concentration: '5.4%' },
      { name: 'Diacetyl', formula: 'C4H6O2', sensoryCharacter: 'Rich French churned butter', concentration: '14.0%' },
      { name: 'Coumarin', formula: 'C9H6O2', sensoryCharacter: 'Sweet toasted tonka hay', concentration: '19.5%' },
    ],
    metrics: { freshness: 22, warmth: 98, sweetness: 89, earthiness: 34, intensity: 90 },
    diffusionDuration: '7.0 hours',
    hardwareDispenseTime: '0.10s micro-nebulization',
    ambientVaporColor: 'from-yellow-500/20 to-amber-400/20',
  },
  {
    id: 'space-smell',
    name: 'Apollo Vacuum: The Smell of Space',
    tagline: 'Astronauts report the smell of outer space as seared ozone, welding fumes, and hot metal',
    prompt: 'Returning to the airlock after a spacewalk outside the International Space Station',
    topNotes: ['High-Energy Atomic Oxygen', 'Ozone Arc', 'Stellar Radiation Static'],
    heartNotes: ['Charred Gunpowder', 'Hot Brake Metal', 'Vaporized Titanium Dust'],
    baseNotes: ['Polycyclic Aromatic Hydrocarbons', 'Industrial Phenolic Resins', 'Cooled Steel'],
    molecules: [
      { name: 'PAHs (Pyrene)', formula: 'C16H10', sensoryCharacter: 'Interstellar burnt hydrocarbon dust', concentration: '29.0%' },
      { name: 'Iron Oxide Vapor', formula: 'Fe2O3', sensoryCharacter: 'Seared metallic vacuum tang', concentration: '16.5%' },
      { name: 'Ozone Adducts', formula: 'O3', sensoryCharacter: 'Sharp electrostatic spark', concentration: '22.0%' },
      { name: 'Hexanal', formula: 'C6H12O', sensoryCharacter: 'Metallic green ionization', concentration: '12.0%' },
    ],
    metrics: { freshness: 72, warmth: 84, sweetness: 10, earthiness: 88, intensity: 95 },
    diffusionDuration: '11.0 hours',
    hardwareDispenseTime: '0.14s micro-nebulization',
    ambientVaporColor: 'from-violet-500/20 to-slate-400/20',
  },
];

interface ScentSynthesizerProps {
  soundEnabled: boolean;
  onSelectFormulaPalette?: (palette: 'blueberry' | 'bergamot' | 'amber' | 'jasmine') => void;
}

export const ScentSynthesizer: React.FC<ScentSynthesizerProps> = ({
  soundEnabled,
  onSelectFormulaPalette,
}) => {
  const [selectedFormula, setSelectedFormula] = useState<ScentFormula>(PRESET_SCENTS[0]);
  const [userPrompt, setUserPrompt] = useState<string>('');
  const [isSynthesizing, setIsSynthesizing] = useState<boolean>(false);
  const [isDispensing, setIsDispensing] = useState<boolean>(false);
  const [dispenseCount, setDispenseCount] = useState<number>(0);

  const handleSelectPreset = (scent: ScentFormula) => {
    setSelectedFormula(scent);
    setUserPrompt(scent.prompt);

    if (soundEnabled) {
      playHarmonicChime(520);
    }

    if (onSelectFormulaPalette) {
      if (scent.id === 'blueberry-ozone') onSelectFormulaPalette('blueberry');
      else if (scent.id === 'rain-petrichor') onSelectFormulaPalette('bergamot');
      else if (scent.id === 'antique-library' || scent.id === 'paris-patisserie') onSelectFormulaPalette('amber');
      else onSelectFormulaPalette('jasmine');
    }
  };

  const handleSynthesizeCustom = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userPrompt.trim()) return;

    setIsSynthesizing(true);
    if (soundEnabled) {
      playHarmonicChime(400);
    }

    // Dynamic generation based on prompt keywords
    setTimeout(() => {
      const p = userPrompt.toLowerCase();
      let formula: ScentFormula;

      if (p.includes('rain') || p.includes('water') || p.includes('ocean') || p.includes('sea') || p.includes('storm')) {
        formula = {
          id: 'custom-' + Date.now(),
          name: 'Synthetic Atmosphere: ' + userPrompt.slice(0, 32),
          tagline: 'Hydrological precipitation and petrichor molecular extraction',
          prompt: userPrompt,
          topNotes: ['Aerosolized Sea Salt', 'Cold Mountain Petrichor', 'Aldehyde C-11'],
          heartNotes: ['Mineral Rainwater', 'Wet Peat Moss', 'Crushed Juniper'],
          baseNotes: ['Purified Geosmin', 'Driftwood Amber', 'Clean Musk Molecule'],
          molecules: [
            { name: 'Geosmin Synth', formula: 'C12H22O', sensoryCharacter: 'Pure petrichor essence', concentration: '14.2%' },
            { name: 'Calone', formula: 'C10H10O3', sensoryCharacter: 'Cool maritime breeze', concentration: '22.0%' },
            { name: 'Isobornyl Acetate', formula: 'C12H20O2', sensoryCharacter: 'Crisp damp pine needle', concentration: '18.5%' },
            { name: 'Ambrox DL', formula: 'C16H28O', sensoryCharacter: 'Warm solar-dried driftwood', concentration: '25.0%' },
          ],
          metrics: { freshness: 92, warmth: 28, sweetness: 14, earthiness: 88, intensity: 75 },
          diffusionDuration: '7.8 hours',
          hardwareDispenseTime: '0.09s micro-nebulization',
          ambientVaporColor: 'from-cyan-500/20 to-blue-500/20',
        };
      } else if (p.includes('coffee') || p.includes('vanilla') || p.includes('bread') || p.includes('cake') || p.includes('chocolate') || p.includes('warm')) {
        formula = {
          id: 'custom-' + Date.now(),
          name: 'Gourmand Resonance: ' + userPrompt.slice(0, 32),
          tagline: 'Thermal Maillard reaction scent synthesis with warm sweet notes',
          prompt: userPrompt,
          topNotes: ['Steam Extracted Crema', 'Golden Brown Butter', 'Cinnamon Bark'],
          heartNotes: ['Toasted Malt', 'Caramelized Sucrose', 'Madagascar Bourbon'],
          baseNotes: ['Pure Vanillin Resin', 'Roasted Tonka Bean', 'Velvety Sandalwood'],
          molecules: [
            { name: 'Ethyl Maltol', formula: 'C7H8O3', sensoryCharacter: 'Glazed confectionery sugar', concentration: '26.8%' },
            { name: 'Pyrazine Mix', formula: 'C4H4N2', sensoryCharacter: 'Dark golden roasted crackle', concentration: '11.4%' },
            { name: 'Vanillin', formula: 'C8H8O3', sensoryCharacter: 'Deep comforting bourbon vanilla', concentration: '28.0%' },
            { name: 'Santalol', formula: 'C15H24O', sensoryCharacter: 'Milky cream sandalwood base', concentration: '21.0%' },
          ],
          metrics: { freshness: 20, warmth: 96, sweetness: 92, earthiness: 40, intensity: 88 },
          diffusionDuration: '9.2 hours',
          hardwareDispenseTime: '0.11s micro-nebulization',
          ambientVaporColor: 'from-amber-500/20 to-orange-400/20',
        };
      } else {
        // Default futuristic blueberry / ethereal botanical blend
        formula = {
          id: 'custom-' + Date.now(),
          name: 'Olfactory Neural Accord: ' + userPrompt.slice(0, 28),
          tagline: 'Bespoke AI scent formulation synthesized from sensory descriptors',
          prompt: userPrompt,
          topNotes: ['Blueberry Bloom', 'Ionized Morning Dew', 'Sparkling Yuzu'],
          heartNotes: ['Solar Botanical Petals', 'White Pine Needle', 'Cashmeran'],
          baseNotes: ['Molecular Clean Musk', 'Sheer Atlas Cedar', 'Iso E Super'],
          molecules: [
            { name: 'Linalyl Acetate', formula: 'C12H20O2', sensoryCharacter: 'Crisp bergamot blueberry lift', concentration: '24.1%' },
            { name: 'Hedione', formula: 'C13H22O3', sensoryCharacter: 'Airy radiant jasmine aura', concentration: '32.0%' },
            { name: 'Geosmin Micro', formula: 'C12H22O', sensoryCharacter: 'Ethereal clean petrichor touch', concentration: '5.2%' },
            { name: 'Iso E Super', formula: 'C16H26O', sensoryCharacter: 'Cedarwood skin comfort', concentration: '28.7%' },
          ],
          metrics: { freshness: 82, warmth: 56, sweetness: 64, earthiness: 50, intensity: 76 },
          diffusionDuration: '8.0 hours',
          hardwareDispenseTime: '0.10s micro-nebulization',
          ambientVaporColor: 'from-indigo-500/20 to-violet-400/20',
        };
      }

      setSelectedFormula(formula);
      setIsSynthesizing(false);
      if (soundEnabled) {
        playHarmonicChime(660);
      }
    }, 600);
  };

  const handleDispense = () => {
    setIsDispensing(true);
    setDispenseCount((prev) => prev + 1);

    if (soundEnabled) {
      playMistPuffSound();
    }

    setTimeout(() => {
      setIsDispensing(false);
    }, 1200);
  };

  return (
    <section id="synthesizer" className="relative z-20 w-full max-w-6xl mx-auto px-6 py-12">
      {/* Editorial Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 text-xs font-semibold text-indigo-600 uppercase tracking-widest mb-3">
          <Atom className="w-4 h-4 text-indigo-500" />
          <span>Molecular Olfactory Synthesis</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 text-balance">
          Prompt ChatGPT with Any Scent, Memory, or Vapor
        </h2>
        <p className="mt-3 text-base text-slate-600 leading-relaxed">
          Olfactory AI decomposes natural language memories into 64 calibrated aroma cartridges,
          calculating accurate top, heart, and base volatile compound ratios.
        </p>
      </div>

      {/* Prompt Search Input */}
      <form onSubmit={handleSynthesizeCustom} className="max-w-3xl mx-auto mb-8">
        <div className="relative flex items-center bg-white rounded-2xl shadow-sm border border-slate-200/80 p-2 focus-within:border-indigo-400 focus-within:ring-2 focus-within:ring-indigo-100 transition-all">
          <input
            type="text"
            value={userPrompt}
            onChange={(e) => setUserPrompt(e.target.value)}
            placeholder="Type any memory: 'Sun-drenched pine forest after a warm summer rain'..."
            className="w-full px-4 py-2.5 text-sm sm:text-base text-slate-800 placeholder-slate-400 bg-transparent outline-none"
          />
          <button
            type="submit"
            disabled={isSynthesizing || !userPrompt.trim()}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 text-white font-medium text-xs sm:text-sm hover:bg-indigo-700 disabled:opacity-50 transition-colors whitespace-nowrap cursor-pointer shadow-sm"
          >
            {isSynthesizing ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Synthesizing...</span>
              </>
            ) : (
              <>
                <span>Synthesize Note</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>

        {/* Quick prompt suggestions */}
        <div className="mt-3 flex items-center gap-2 flex-wrap text-xs text-slate-500">
          <span className="font-medium text-slate-400">Curated Presets:</span>
          {PRESET_SCENTS.map((scent) => (
            <button
              key={scent.id}
              type="button"
              onClick={() => handleSelectPreset(scent)}
              className={`px-3 py-1 rounded-lg border transition-all text-left cursor-pointer ${
                selectedFormula.id === scent.id
                  ? 'bg-indigo-50 border-indigo-300 text-indigo-700 font-medium shadow-xs'
                  : 'bg-white/60 border-slate-200 text-slate-600 hover:bg-white hover:border-slate-300'
              }`}
            >
              {scent.name}
            </button>
          ))}
        </div>
      </form>

      {/* Olfactory Synthesis Output Card */}
      <div className="bg-white/85 backdrop-blur-md rounded-2xl border border-slate-200/80 shadow-sm p-6 sm:p-8 transition-all relative overflow-hidden">
        {/* Top ambient color wash */}
        <div
          className={`absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl opacity-35 bg-gradient-to-br ${selectedFormula.ambientVaporColor} pointer-events-none`}
        />

        {/* Header Bar of Card */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-indigo-600 mb-1">
              <span>FORMULA SPEC #{selectedFormula.id.toUpperCase().slice(0, 10)}</span>
              <span>·</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                Longevity: {selectedFormula.diffusionDuration}
              </span>
            </div>
            <h3 className="text-2xl font-bold text-slate-900">{selectedFormula.name}</h3>
            <p className="text-sm text-slate-500 mt-0.5">{selectedFormula.tagline}</p>
          </div>

          <button
            onClick={handleDispense}
            className={`flex items-center gap-2 px-5 py-3 rounded-xl font-semibold text-xs sm:text-sm shadow-sm transition-all cursor-pointer whitespace-nowrap self-start sm:self-center ${
              isDispensing
                ? 'bg-emerald-500 text-white ring-4 ring-emerald-100 animate-pulse'
                : 'bg-slate-900 hover:bg-indigo-600 text-white'
            }`}
          >
            <Wind className={`w-4 h-4 ${isDispensing ? 'animate-spin' : ''}`} />
            <span>{isDispensing ? 'Dispensing Micro-Vapor...' : 'Dispense Simulated Scent'}</span>
          </button>
        </div>

        {/* 3 Accord Columns: Top, Heart, Base */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-6 border-b border-slate-100">
          {/* Top Notes */}
          <div className="p-4 rounded-xl bg-slate-50/70 border border-slate-100">
            <div className="text-xs font-semibold text-indigo-600 uppercase tracking-wider mb-1">
              Top Notes (0 – 15m)
            </div>
            <p className="text-xs text-slate-400 mb-3">High volatility, instant first impression</p>
            <ul className="space-y-1.5 text-sm font-medium text-slate-700">
              {selectedFormula.topNotes.map((note, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                  <span>{note}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Heart Notes */}
          <div className="p-4 rounded-xl bg-slate-50/70 border border-slate-100">
            <div className="text-xs font-semibold text-indigo-600 uppercase tracking-wider mb-1">
              Heart Notes (15m – 4h)
            </div>
            <p className="text-xs text-slate-400 mb-3">Core aromatic character & harmony</p>
            <ul className="space-y-1.5 text-sm font-medium text-slate-700">
              {selectedFormula.heartNotes.map((note, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                  <span>{note}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Base Notes */}
          <div className="p-4 rounded-xl bg-slate-50/70 border border-slate-100">
            <div className="text-xs font-semibold text-indigo-600 uppercase tracking-wider mb-1">
              Base Notes (4h – 24h)
            </div>
            <p className="text-xs text-slate-400 mb-3">Substantive drydown fixatives & warmth</p>
            <ul className="space-y-1.5 text-sm font-medium text-slate-700">
              {selectedFormula.baseNotes.map((note, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-violet-400" />
                  <span>{note}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Sensory Dimensional Balance & Molecular Ratios */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-6">
          {/* Dimensional Bar Meters */}
          <div>
            <h4 className="text-sm font-bold text-slate-900 mb-4 flex items-center gap-2">
              <Droplet className="w-4 h-4 text-indigo-500" />
              <span>Sensory Dimensional Profile</span>
            </h4>
            <div className="space-y-3">
              {[
                { label: 'Freshness & Aeration', val: selectedFormula.metrics.freshness, color: 'bg-indigo-500' },
                { label: 'Warmth & Comfort', val: selectedFormula.metrics.warmth, color: 'bg-amber-500' },
                { label: 'Sweet Gourmand Tone', val: selectedFormula.metrics.sweetness, color: 'bg-rose-400' },
                { label: 'Earth & Mineral Ground', val: selectedFormula.metrics.earthiness, color: 'bg-emerald-500' },
                { label: 'Aroma Projection Power', val: selectedFormula.metrics.intensity, color: 'bg-blue-600' },
              ].map((m, i) => (
                <div key={i} className="flex items-center justify-between text-xs">
                  <span className="w-36 text-slate-600 font-medium">{m.label}</span>
                  <div className="flex-1 mx-3 h-2 rounded-full bg-slate-100 overflow-hidden">
                    <div
                      className={`h-full ${m.color} rounded-full transition-all duration-700 ease-out`}
                      style={{ width: `${m.val}%` }}
                    />
                  </div>
                  <span className="w-8 text-right font-mono font-semibold text-slate-700 tabular-nums">
                    {m.val}%
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Molecular Chromatography Table */}
          <div>
            <h4 className="text-sm font-bold text-slate-900 mb-4 flex items-center gap-2">
              <Atom className="w-4 h-4 text-indigo-500" />
              <span>Calibrated Aroma Compounds</span>
            </h4>
            <div className="space-y-2">
              {selectedFormula.molecules.map((mol, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50/80 border border-slate-100 text-xs"
                >
                  <div>
                    <span className="font-semibold text-slate-800">{mol.name}</span>
                    <span className="font-mono text-slate-400 ml-2">({mol.formula})</span>
                    <p className="text-[11px] text-slate-500">{mol.sensoryCharacter}</p>
                  </div>
                  <span className="font-mono font-bold text-indigo-600 tabular-nums">
                    {mol.concentration}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {dispenseCount > 0 && (
          <div className="mt-6 p-3 rounded-xl bg-indigo-50/60 border border-indigo-100 text-xs text-indigo-800 flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <Wind className="w-4 h-4 text-indigo-500 animate-spin" />
              <span>Simulated micro-mist dispensed {dispenseCount} time{dispenseCount > 1 ? 's' : ''} to virtual diffuser.</span>
            </span>
            <span className="font-mono text-[11px] text-indigo-500">Cartridge Flow: OK</span>
          </div>
        )}
      </div>
    </section>
  );
};
