import { useState } from 'react';
import { Sparkles, ChevronRight, Layers, RefreshCw, SlidersHorizontal } from 'lucide-react';
import { HighlightsCarousel } from './HighlightsCarousel';
import { AroAISection } from './AroAISection';

interface ProductFeaturesProps {
  onBuyClick: () => void;
}

const FINISH_GALLERY = [
  {
    name: 'Charcoal Black',
    tag: 'Deep anodized matte black finish with micro-textured acoustic dampening',
    bgGrad: 'from-neutral-900 via-neutral-950 to-black',
    accent: '#232325',
  },
  {
    name: 'Ivory White',
    tag: 'Warm satin ceramic finish engineered to reflect ambient room light',
    bgGrad: 'from-stone-900/40 via-neutral-950 to-black',
    accent: '#F3F2EC',
  },
  {
    name: 'Wooden Brown',
    tag: 'Natural warm timber grain with organic satin seal and precision vents',
    bgGrad: 'from-amber-950/30 via-neutral-950 to-black',
    accent: '#8B5A2B',
  },
];

export const ProductFeatures: React.FC<ProductFeaturesProps> = ({ onBuyClick }) => {
  const [activeFinishIndex, setActiveFinishIndex] = useState(0);

  return (
    <div className="w-full max-w-7xl mx-auto space-y-16 sm:space-y-24 md:space-y-32">
      {/* 0. Apple Highlights Carousel (Replicating iPhone 18 Pro layout) */}
      <HighlightsCarousel />

      {/* 1. Design & Finish Showcase */}
      <div className="rounded-3xl border border-white/10 bg-gradient-to-b from-[#161617] to-black p-6 sm:p-10 md:p-14 overflow-hidden relative">
        <div className="max-w-3xl">
          <p className="text-xs uppercase tracking-widest text-neutral-400 font-mono mb-2">Design</p>
          <h3 className="text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-3 sm:mb-4">
            Engineered to shape your atmosphere.
          </h3>
          <p className="text-neutral-400 text-sm sm:text-base md:text-lg leading-relaxed">
            Precision engineering meets purposeful design. AromaxAI brings multiple scent experiences into one sophisticated home appliance, giving you greater control over how your space feels. Thoughtfully designed around scent delivery, intuitive control, and everyday use, it makes personalizing your environment feel as natural as adjusting the lights.
          </p>
        </div>

        {/* Finish Selector */}
        <div className="mt-8 sm:mt-12 flex flex-wrap gap-2.5 sm:gap-4 items-center">
          {FINISH_GALLERY.map((f, idx) => (
            <button
              key={f.name}
              onClick={() => setActiveFinishIndex(idx)}
              className={`px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-medium transition-all cursor-pointer flex items-center gap-2 sm:gap-2.5 border ${
                activeFinishIndex === idx
                  ? 'border-white bg-white text-black font-semibold shadow-sm'
                  : 'border-[#2a2a2c] bg-[#1d1d1f] text-white hover:border-white/25'
              }`}
            >
              <span
                className="w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-full border border-black/20"
                style={{ backgroundColor: f.accent }}
              />
              {f.name}
            </button>
          ))}
        </div>

        {/* Selected Finish Card */}
        <div className={`mt-6 sm:mt-8 p-5 sm:p-8 rounded-2xl border border-white/10 bg-gradient-to-tr ${FINISH_GALLERY[activeFinishIndex].bgGrad} flex flex-col md:flex-row items-start md:items-center justify-between gap-4 sm:gap-6`}>
          <div>
            <h4 className="text-xl sm:text-2xl font-bold text-white mb-1">
              {FINISH_GALLERY[activeFinishIndex].name}
            </h4>
            <p className="text-xs sm:text-sm text-neutral-300">
              {FINISH_GALLERY[activeFinishIndex].tag}
            </p>
          </div>
          <button
            onClick={onBuyClick}
            className="w-full md:w-auto flex-shrink-0 text-center px-6 py-2.5 rounded-full bg-[#0071e3] hover:bg-[#0077ed] text-white text-xs sm:text-sm font-semibold transition-all cursor-pointer shadow-md"
          >
            Pre-order {FINISH_GALLERY[activeFinishIndex].name}
          </button>
        </div>
      </div>

      {/* 2. Make room for your favourites (Apple Bento Grid) */}
      <div>
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16 px-2">
          <p className="text-xs uppercase tracking-widest text-[#0071e3] font-mono mb-2">Modular System</p>
          <h3 className="text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-3 sm:mb-4">
            Make room for your favourites.
          </h3>
          <p className="text-neutral-400 text-sm sm:text-base md:text-lg">
            One device. Thirty choices. Endless atmospheres.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-6">
          {/* Box 1: Your library. Your rules. */}
          <div className="md:col-span-12 lg:col-span-6 rounded-3xl border border-white/10 bg-[#161617] p-6 sm:p-8 md:p-10 flex flex-col justify-between shadow-xl">
            <div>
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white mb-4 sm:mb-6">
                <Layers className="w-5 h-5 sm:w-6 sm:h-6 text-[#2997ff]" />
              </div>
              <h4 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight mb-1">
                Your library. Your rules.
              </h4>
              <p className="text-xs sm:text-sm md:text-base font-semibold text-[#2997ff] tracking-tight mb-3 sm:mb-4">
                30 scents. One device.
              </p>
              <p className="text-neutral-400 text-xs sm:text-sm md:text-base leading-relaxed mb-3 sm:mb-4">
                Build your personal scent library. 30 slots. You choose what fills them — from petrichor and mitti to fresh coffee and old books.
              </p>
              <p className="text-white font-medium text-xs sm:text-sm md:text-base">
                Your environment should smell like you.
              </p>
            </div>
            <div className="mt-6 sm:mt-8 pt-5 sm:pt-6 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 sm:gap-2 text-[11px] sm:text-xs text-neutral-400 font-mono">
              <span className="text-neutral-500 uppercase tracking-wider">Architecture</span>
              <span className="text-white font-medium">30 × individually addressable channels. USB-C style cartridges.</span>
            </div>
          </div>

          {/* Box 2: Plug in. Switch up. */}
          <div className="md:col-span-12 lg:col-span-6 rounded-3xl border border-white/10 bg-[#161617] p-6 sm:p-8 md:p-10 flex flex-col justify-between shadow-xl">
            <div>
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white mb-4 sm:mb-6">
                <RefreshCw className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-400" />
              </div>
              <h4 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight mb-1">
                Plug in. Switch up.
              </h4>
              <p className="text-xs sm:text-sm md:text-base font-semibold text-emerald-400 tracking-tight mb-3 sm:mb-4">
                A new kind of cartridge.
              </p>
              <p className="text-neutral-400 text-xs sm:text-sm md:text-base leading-relaxed mb-3 sm:mb-4">
                Each scent is a dedicated plug-and-play cartridge. Pull one out. Plug one in. No tools. No rebuild.
              </p>
              <p className="text-white font-medium text-xs sm:text-sm md:text-base">
                Less effort. More possibilities.
              </p>
            </div>
            <div className="mt-6 sm:mt-8 pt-5 sm:pt-6 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 sm:gap-2 text-[11px] sm:text-xs text-neutral-400 font-mono">
              <span className="text-neutral-500 uppercase tracking-wider">Hot-Swap</span>
              <span className="text-white font-medium">Hot-swappable. No calibration needed.</span>
            </div>
          </div>

          {/* Box 3: Designed to be changed. */}
          <div className="md:col-span-6 lg:col-span-3 rounded-3xl border border-white/10 bg-[#161617] p-6 sm:p-8 flex flex-col justify-between shadow-xl">
            <div>
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white mb-4 sm:mb-6">
                <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-amber-400" />
              </div>
              <h4 className="text-lg sm:text-xl md:text-2xl font-bold text-white tracking-tight mb-1">
                Designed to be changed.
              </h4>
              <p className="text-xs sm:text-sm font-semibold text-amber-400 tracking-tight mb-3 sm:mb-4">
                Modular by design. Personal by nature.
              </p>
              <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed mb-3 sm:mb-4">
                Tastes change. Your device changes with you. Replace a single scent, swap your entire mood, or refresh your favorites — cartridge by cartridge.
              </p>
            </div>
            <div className="mt-5 sm:mt-6 pt-4 sm:pt-5 border-t border-white/10 text-xs text-white font-medium leading-snug">
              One device. Thirty choices. Endless atmospheres.
            </div>
          </div>

          {/* Box 4: Technology you feel. */}
          <div className="md:col-span-6 lg:col-span-3 rounded-3xl border border-white/10 bg-[#161617] p-6 sm:p-8 flex flex-col justify-between shadow-xl">
            <div>
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white mb-4 sm:mb-6">
                <SlidersHorizontal className="w-5 h-5 sm:w-6 sm:h-6 text-purple-400" />
              </div>
              <h4 className="text-lg sm:text-xl md:text-2xl font-bold text-white tracking-tight mb-1">
                Technology you feel.
              </h4>
              <p className="text-xs sm:text-sm font-semibold text-purple-400 tracking-tight mb-3 sm:mb-4">
                Precision control. No compromises.
              </p>
              <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed mb-3 sm:mb-4">
                Intelligent software. Individually controlled channels. On-demand activation or custom blends.
              </p>
            </div>
            <div className="mt-5 sm:mt-6 pt-4 sm:pt-5 border-t border-white/10 text-xs text-white font-medium leading-snug">
              From a single note to a whole new world — it starts with your imagination.
            </div>
          </div>

          {/* Box 5: Pure Visual Showcase Card (Fits fully on any screen, zero overlay text) */}
          <div className="md:col-span-12 lg:col-span-6 rounded-3xl border border-white/10 bg-black overflow-hidden flex items-center justify-center shadow-2xl aspect-[16/10] sm:aspect-[16/9] min-h-[220px] sm:min-h-[340px]">
            <img
              src="/assets/aistudio/a59fe36e-0fba-4e31-a31c-4abb5715c222_76e53402.png"
              alt="Aromax AI Scent Cartridge"
              className="w-full h-full object-contain object-center"
            />
          </div>
        </div>
      </div>

      {/* 3. Meet Aro AI Section */}
      <AroAISection />

      {/* 4. Apple Call to Action Banner */}
      <div className="rounded-3xl border border-white/10 bg-gradient-to-r from-[#1d1d1f] to-[#121214] p-6 sm:p-10 md:p-16 text-center space-y-4 sm:space-y-6">
        <h3 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white">
          Experience Aromax AI in your space.
        </h3>
        <p className="text-neutral-400 max-w-xl mx-auto text-xs sm:text-sm md:text-base">
          From ₹20000.00* or ₹1667.00/mo. for 12 mo.‡ with zero down payment and free express delivery across India.
        </p>
        <div className="pt-2 flex justify-center">
          <button
            onClick={onBuyClick}
            className="w-full sm:w-auto bg-[#0071e3] hover:bg-[#0077ed] active:scale-95 text-white font-semibold text-xs sm:text-sm px-6 sm:px-8 py-3 sm:py-3.5 rounded-full transition-all cursor-pointer shadow-lg shadow-blue-500/25 flex items-center justify-center gap-2"
          >
            Buy Aromax AI <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 5. Apple Official Footnotes */}
      <div className="pt-10 sm:pt-16 border-t border-neutral-800 text-[11px] text-neutral-400 space-y-2.5 font-normal leading-relaxed">
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
        <div className="pt-6 sm:pt-8 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 border-t border-neutral-900 text-neutral-400 text-xs">
          <p>© 2026 Aromax AI Inc. All rights reserved.</p>
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
            <span className="hover:text-white transition-colors cursor-pointer">Privacy Policy</span>
            <span className="hover:text-white transition-colors cursor-pointer">Terms of Sale</span>
            <span className="hover:text-white transition-colors cursor-pointer">Legal</span>
          </div>
        </div>
      </div>
    </div>
  );
};
