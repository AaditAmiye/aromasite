import { useState } from 'react';
import { Wind, VolumeX, Cpu, Sparkles, Smartphone, ChevronRight } from 'lucide-react';

interface ProductFeaturesProps {
  onBuyClick: () => void;
}

const FINISH_GALLERY = [
  {
    name: 'Natural Titanium',
    tag: 'Warm raw metallic luster with physical vapor deposition coating',
    bgGrad: 'from-amber-950/20 via-neutral-900 to-black',
    accent: '#A89F91',
  },
  {
    name: 'Space Black',
    tag: 'Forged dark titanium with carbon diamond-like finish',
    bgGrad: 'from-neutral-900 via-neutral-950 to-black',
    accent: '#3B3B3F',
  },
  {
    name: 'Pure Silver',
    tag: 'Mirror-beveled satin silver polished to optical precision',
    bgGrad: 'from-slate-800/30 via-neutral-900 to-black',
    accent: '#E5E7EB',
  },
];

const SCENT_NOTES = [
  {
    number: '01',
    name: 'Bergamot Dawn',
    top: 'Calabrian Bergamot, Crushed Mandarin',
    heart: 'White Lotus, Jasmine Petals',
    base: 'Golden Cedar, Cashmere Musk',
  },
  {
    number: '02',
    name: 'White Tea Santal',
    top: 'Silver Needle Tea, Cardamom',
    heart: 'Florentine Orris, Violet Leaf',
    base: 'Creamy Australian Sandalwood, Dry Amber',
  },
  {
    number: '03',
    name: 'Midnight Cypress',
    top: 'Crisp Pine Needle, Crisp Aldehydes',
    heart: 'Smoked Frankincense, Earthy Vetiver',
    base: 'Dark Patchouli, Black Leather',
  },
];

export const ProductFeatures: React.FC<ProductFeaturesProps> = ({ onBuyClick }) => {
  const [activeFinishIndex, setActiveFinishIndex] = useState(0);

  return (
    <div className="w-full max-w-7xl mx-auto space-y-32">
      {/* 1. Titanium Finish Showcase */}
      <div className="rounded-3xl border border-white/10 bg-gradient-to-b from-[#161617] to-black p-8 sm:p-14 overflow-hidden relative">
        <div className="max-w-2xl">
          <p className="text-xs uppercase tracking-widest text-neutral-400 font-mono mb-2">Design</p>
          <h3 className="text-3xl sm:text-5xl font-bold tracking-tight text-white mb-4">
            Forged in Grade 5 Titanium.
          </h3>
          <p className="text-neutral-400 text-base sm:text-lg leading-relaxed">
            The same aerospace alloy used in spacecraft expeditions. Milled from a single block for unmatched durability, featherweight elegance, and seamless thermal conductivity.
          </p>
        </div>

        {/* Finish Selector */}
        <div className="mt-12 flex flex-wrap gap-4 items-center">
          {FINISH_GALLERY.map((f, idx) => (
            <button
              key={f.name}
              onClick={() => setActiveFinishIndex(idx)}
              className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer flex items-center gap-2.5 border ${
                activeFinishIndex === idx
                  ? 'border-white bg-white text-black'
                  : 'border-white/15 bg-white/5 text-neutral-300 hover:border-white/30'
              }`}
            >
              <span
                className="w-3.5 h-3.5 rounded-full border border-black/20"
                style={{ backgroundColor: f.accent }}
              />
              {f.name}
            </button>
          ))}
        </div>

        {/* Selected Finish Card */}
        <div className={`mt-8 p-8 rounded-2xl border border-white/10 bg-gradient-to-tr ${FINISH_GALLERY[activeFinishIndex].bgGrad} flex flex-col md:flex-row items-center justify-between gap-6`}>
          <div>
            <h4 className="text-2xl font-bold text-white mb-1">
              {FINISH_GALLERY[activeFinishIndex].name}
            </h4>
            <p className="text-sm text-neutral-300">
              {FINISH_GALLERY[activeFinishIndex].tag}
            </p>
          </div>
          <button
            onClick={onBuyClick}
            className="flex-shrink-0 px-6 py-2.5 rounded-full bg-[#0071e3] hover:bg-[#0077ed] text-white text-xs sm:text-sm font-semibold transition-all cursor-pointer shadow-md"
          >
            Pre-order {FINISH_GALLERY[activeFinishIndex].name}
          </button>
        </div>
      </div>

      {/* 2. Apple Bento Grid Innovations */}
      <div>
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-xs uppercase tracking-widest text-[#0071e3] font-mono mb-2">Technology</p>
          <h3 className="text-3xl sm:text-5xl font-bold tracking-tight text-white mb-4">
            Groundbreaking in every molecule.
          </h3>
          <p className="text-neutral-400 text-base sm:text-lg">
            Engineering fragrance at the nano scale without heat, water dilution, or chemical propellants.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="rounded-3xl border border-white/10 bg-[#161617] p-8 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white mb-6">
                <Wind className="w-6 h-6 text-cyan-400" />
              </div>
              <h4 className="text-xl font-bold text-white mb-2">Cold-Air Micro-Diffusion</h4>
              <p className="text-neutral-400 text-sm leading-relaxed">
                Proprietary twin-fluid nebulization fragments pure organic oils into 0.1-micron droplets that float suspended like morning dew without clinging to fabrics.
              </p>
            </div>
            <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between text-xs text-neutral-400 font-mono">
              <span>Particle Diameter</span>
              <span className="text-white font-bold">&lt; 0.1 μm</span>
            </div>
          </div>

          {/* Card 2 */}
          <div className="rounded-3xl border border-white/10 bg-[#161617] p-8 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white mb-6">
                <Cpu className="w-6 h-6 text-amber-400" />
              </div>
              <h4 className="text-xl font-bold text-white mb-2">A18 Olfactory Silicon</h4>
              <p className="text-neutral-400 text-sm leading-relaxed">
                Autonomous real-time air chemistry sensors scan ambient volatile organic compounds 1,000 times a second, calibrating release for human circadian alertness.
              </p>
            </div>
            <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between text-xs text-neutral-400 font-mono">
              <span>Sensor Sample Rate</span>
              <span className="text-white font-bold">1,000 Hz</span>
            </div>
          </div>

          {/* Card 3 */}
          <div className="rounded-3xl border border-white/10 bg-[#161617] p-8 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white mb-6">
                <VolumeX className="w-6 h-6 text-emerald-400" />
              </div>
              <h4 className="text-xl font-bold text-white mb-2">Whisper Acoustic Chamber</h4>
              <p className="text-neutral-400 text-sm leading-relaxed">
                Acoustic labyrinth dampens fluid resonance to below 18 dBA. Completely imperceptible in quiet bedrooms, libraries, or recording studios.
              </p>
            </div>
            <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between text-xs text-neutral-400 font-mono">
              <span>Operating Sound Floor</span>
              <span className="text-white font-bold">&lt; 18 dBA</span>
            </div>
          </div>

          {/* Wide Card: Apple Ecosystem */}
          <div className="md:col-span-2 rounded-3xl border border-white/10 bg-gradient-to-r from-[#161617] via-[#1c1c1e] to-[#161617] p-8 sm:p-10 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white mb-6">
                <Smartphone className="w-6 h-6 text-[#0071e3]" />
              </div>
              <h4 className="text-2xl font-bold text-white mb-2">Native Apple Home & Siri Integration</h4>
              <p className="text-neutral-400 text-base leading-relaxed max-w-xl">
                Add Aromax AI to the Apple Home app in seconds with Matter. Automate scents with Good Morning or Sleep scenes. Ask Siri to refresh the atmosphere from your iPhone, Watch, or HomePod.
              </p>
            </div>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <span className="px-3.5 py-1.5 rounded-full bg-white/10 text-white text-xs font-medium">
                Works with Apple Home
              </span>
              <span className="px-3.5 py-1.5 rounded-full bg-white/10 text-white text-xs font-medium">
                Matter Certified
              </span>
              <span className="px-3.5 py-1.5 rounded-full bg-white/10 text-white text-xs font-medium">
                Siri Shortcuts
              </span>
            </div>
          </div>

          {/* Narrow Card: MagSafe Docking */}
          <div className="rounded-3xl border border-white/10 bg-[#161617] p-8 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white mb-6">
                <Sparkles className="w-6 h-6 text-purple-400" />
              </div>
              <h4 className="text-xl font-bold text-white mb-2">Magnetic Base</h4>
              <p className="text-neutral-400 text-sm leading-relaxed">
                Snaps onto the weighted aluminum magnetic charge cradle. Delivers up to 48 hours of autonomous wireless operation anywhere in your home.
              </p>
            </div>
            <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between text-xs text-neutral-400 font-mono">
              <span>Wireless Battery Life</span>
              <span className="text-white font-bold">48 Hours</span>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Olfactory Pod Masterpieces */}
      <div>
        <div className="text-center max-w-2xl mx-auto mb-14">
          <p className="text-xs uppercase tracking-widest text-neutral-400 font-mono mb-2">Aromatics</p>
          <h3 className="text-3xl sm:text-5xl font-bold tracking-tight text-white mb-4">
            Three signature aromas. Included in box.
          </h3>
          <p className="text-neutral-400 text-sm sm:text-base">
            Compounded in Grasse, France by master perfumers. 100% natural, non-toxic, and pet safe.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {SCENT_NOTES.map((s) => (
            <div
              key={s.number}
              className="rounded-3xl border border-white/10 bg-[#161617] p-8 flex flex-col justify-between relative group hover:border-white/20 transition-all"
            >
              <div>
                <span className="text-xs font-mono text-[#0071e3] font-semibold">{s.number}</span>
                <h4 className="text-2xl font-bold text-white mt-2 mb-6">{s.name}</h4>
                <div className="space-y-3 text-xs">
                  <div>
                    <span className="text-neutral-400 block font-mono uppercase text-[10px]">Top Notes</span>
                    <span className="text-neutral-200 font-medium">{s.top}</span>
                  </div>
                  <div>
                    <span className="text-neutral-400 block font-mono uppercase text-[10px]">Heart Notes</span>
                    <span className="text-neutral-200 font-medium">{s.heart}</span>
                  </div>
                  <div>
                    <span className="text-neutral-400 block font-mono uppercase text-[10px]">Base Notes</span>
                    <span className="text-neutral-200 font-medium">{s.base}</span>
                  </div>
                </div>
              </div>
              <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between">
                <span className="text-xs text-neutral-400">60ml Amber Glass Pod</span>
                <span className="text-xs font-bold text-white">350 hrs diffusion</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Apple Call to Action Banner */}
      <div className="rounded-3xl border border-white/10 bg-gradient-to-r from-[#1d1d1f] to-[#121214] p-10 sm:p-16 text-center space-y-6">
        <h3 className="text-3xl sm:text-6xl font-bold tracking-tight text-white">
          Experience Aromax AI in your space.
        </h3>
        <p className="text-neutral-400 max-w-xl mx-auto text-sm sm:text-base">
          From ₹20000.00* or ₹1667.00/mo. for 12 mo.‡ with zero down payment and free express delivery across India.
        </p>
        <div className="pt-2 flex justify-center">
          <button
            onClick={onBuyClick}
            className="bg-[#0071e3] hover:bg-[#0077ed] active:scale-95 text-white font-semibold text-sm px-8 py-3.5 rounded-full transition-all cursor-pointer shadow-lg shadow-blue-500/25 flex items-center gap-2"
          >
            Buy Aromax AI <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 5. Apple Official Footnotes */}
      <div className="pt-16 border-t border-neutral-800 text-[11px] text-neutral-400 space-y-2.5 font-normal leading-relaxed">
        <p>
          * Maximum Retail Price (MRP) is inclusive of all taxes. In-box items: 1x Aromax AI Diffuser Unit, 1x Solid Titanium MagSafe Charging Cradle, 1x USB-C Woven Power Cable (2m), 3x 60ml Bespoke Olfactory Pods.
        </p>
        <p>
          ‡ No Cost EMI is available on qualifying American Express, Axis Bank, HDFC Bank, ICICI Bank, and SBI credit cards for 3, 6, 9, or 12-month tenures. ₹1,667.00/mo. calculation is based on ₹20,000.00 total order value amortized over 12 months with 0% interest and 0 processing fees. Terms and conditions apply.
        </p>
        <p>
          1. Whispering sound floor tests conducted in controlled anechoic chambers in accordance with ISO 3745 acoustic standards. Actual acoustic output may vary based on surface materials and room acoustics.
        </p>
        <p>
          2. Matter compliance requires a compatible Apple Home hub (HomePod mini, HomePod 2nd gen, or Apple TV 4K).
        </p>
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-neutral-900 text-neutral-400 text-xs">
          <p>© 2026 Aromax AI Inc. All rights reserved.</p>
          <div className="flex gap-6">
            <span className="hover:text-white transition-colors cursor-pointer">Privacy Policy</span>
            <span className="hover:text-white transition-colors cursor-pointer">Terms of Sale</span>
            <span className="hover:text-white transition-colors cursor-pointer">Legal</span>
          </div>
        </div>
      </div>
    </div>
  );
};
