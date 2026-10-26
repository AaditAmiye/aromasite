import React, { useState, useEffect } from 'react';
import { X, Check, Truck, RefreshCw, Bell } from 'lucide-react';

interface AppleBuyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FINISHES = [
  {
    id: 'charcoal-black',
    name: 'Charcoal Black',
    desc: 'Deep anodized matte black finish with micro-textured acoustic dampening',
    hex: '#232325',
    image: '/assets/aistudio/beed88c1-c1ed-470f-bb86-a15037784fa3_a8ddc23e.png',
  },
  {
    id: 'frost-silver',
    name: 'Frost Silver',
    desc: 'Precision-milled aerospace aluminum with frosted satin bead blast',
    hex: '#D1D5DB',
    image: '/assets/aistudio/bb053c35-4552-4d37-a81c-2cd5dd2c04fb_df04d57d.png',
  },
  {
    id: 'ivory-white',
    name: 'Ivory White',
    desc: 'Warm satin ceramic finish engineered to reflect ambient room light',
    hex: '#F3F2EC',
    image: '/assets/aistudio/AromaxAI_Vial_Array_Machine_ab3b4640.png',
  },
  {
    id: 'wooden-brown',
    name: 'Wooden Brown',
    desc: 'Natural warm timber grain with organic satin seal and precision vents',
    hex: '#8B5A2B',
    image: '/assets/aistudio/AromaxAI_Aromatherapy_Scent_Diffuser_678d94ee.png',
  },
];

const SCENT_BUNDLES = [
  {
    id: 'signature',
    name: 'Signature Collection',
    items: 'Bergamot Dawn • White Tea Santal • Midnight Rain',
    included: true,
  },
  {
    id: 'zen',
    name: 'Kyoto Sanctuary Pack',
    items: 'Hinoki Smoke • Bamboo Mist • Green Yuzu',
    included: false,
    addPrice: 3500,
  },
];

export const AppleBuyModal: React.FC<AppleBuyModalProps> = ({ isOpen, onClose }) => {
  const [selectedFinish, setSelectedFinish] = useState('charcoal-black');
  const [selectedBundle, setSelectedBundle] = useState('signature');
  const [paymentOption, setPaymentOption] = useState<'full' | 'emi'>('full');
  const [isOrdered, setIsOrdered] = useState(false);
  const [email, setEmail] = useState('');
  const [isEmailSubmitted, setIsEmailSubmitted] = useState(false);

  // Smooth entrance & exit animation state
  const [isMounted, setIsMounted] = useState(isOpen);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsMounted(true);
      // Small tick for CSS transition to trigger reliably
      const timer = setTimeout(() => setIsVisible(true), 20);
      return () => clearTimeout(timer);
    } else {
      setIsVisible(false);
      const timer = setTimeout(() => {
        setIsMounted(false);
        setIsOrdered(false);
        setIsEmailSubmitted(false);
      }, 350);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isMounted) return null;

  const currentFinishObj = FINISHES.find((f) => f.id === selectedFinish) || FINISHES[0];
  const bundleObj = SCENT_BUNDLES.find((b) => b.id === selectedBundle) || SCENT_BUNDLES[0];
  const totalPrice = 20000 + (bundleObj.addPrice || 0);
  const monthlyEmi = Math.round(totalPrice / 12);

  const handleOrder = () => {
    setIsOrdered(true);
  };

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setIsEmailSubmitted(true);
    }
  };

  return (
    <div
      onClick={onClose}
      className={`fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-xl transition-all duration-400 ease-out ${
        isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
    >
      <div
        className={`relative w-full max-w-2xl bg-[#161617] text-white rounded-3xl border border-white/10 shadow-2xl overflow-hidden flex flex-col max-h-[92vh] transition-all duration-400 ease-out transform ${
          isVisible ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-4'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-4 sm:py-5 border-b border-white/10">
          <div>
            <h3 className="text-[11px] sm:text-xs uppercase tracking-wider text-neutral-400 font-mono transition-opacity duration-300">
              Configure
            </h3>
            <p className="text-lg sm:text-xl font-semibold tracking-tight text-white transition-opacity duration-300">
              Buy Aro - 1
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 active:scale-95 flex items-center justify-center text-neutral-300 hover:text-white transition-all duration-300 cursor-pointer"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="overflow-y-auto px-4 sm:px-6 py-4 sm:py-6 space-y-5 sm:space-y-6 custom-scrollbar">
          {isOrdered ? (
            <div className="py-10 sm:py-14 text-center space-y-5 transition-all duration-500 ease-out">
              {/* Product preview thumbnail */}
              <div className="relative w-32 h-24 sm:w-40 sm:h-28 mx-auto rounded-2xl bg-[#0f0f10] border border-white/10 overflow-hidden p-2 flex items-center justify-center">
                <img
                  src={currentFinishObj.image}
                  alt={`Aro - 1 in ${currentFinishObj.name}`}
                  className="w-full h-full object-contain"
                />
              </div>

              {/* Required Header */}
              <div className="space-y-1.5">
                <span className="inline-block px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-[11px] font-medium tracking-wide">
                  High Demand • Reserved Queue
                </span>
                <h4 className="text-2xl sm:text-3xl font-bold tracking-tight text-white pt-1">
                  Aro - 1 is currently out of stock.
                </h4>
                <p className="text-xs sm:text-sm text-neutral-400">
                  Selected model: <span className="text-white font-medium">Aro - 1 in {currentFinishObj.name}</span>
                </p>
              </div>

              {/* Interactive Email Form */}
              {!isEmailSubmitted ? (
                <form
                  onSubmit={handleEmailSubmit}
                  className="w-full max-w-md mx-auto space-y-3 pt-2"
                >
                  <div className="relative flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email address"
                      className="w-full px-4 sm:px-5 py-3 sm:py-3.5 rounded-full bg-[#1f1f22] border border-white/15 text-white placeholder-neutral-500 text-xs sm:text-sm focus:outline-none focus:border-[#0071e3] focus:ring-2 focus:ring-[#0071e3]/30 transition-all duration-300"
                    />
                    <button
                      type="submit"
                      className="px-6 py-3 rounded-full bg-[#0071e3] hover:bg-[#0077ed] active:scale-95 text-white font-semibold text-xs sm:text-sm transition-all duration-300 shadow-lg shadow-blue-500/25 cursor-pointer whitespace-nowrap flex items-center justify-center gap-1.5"
                    >
                      <Bell className="w-3.5 h-3.5" />
                      Notify Me
                    </button>
                  </div>

                  {/* Required Subtitle exactly as specified */}
                  <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed transition-opacity duration-300">
                    Leave your email, and we’ll let you know as soon as it’s available.
                  </p>
                </form>
              ) : (
                <div className="w-full max-w-md mx-auto p-5 rounded-2xl bg-white/5 border border-white/10 space-y-3 transition-all duration-500 animate-fade-in">
                  <div className="w-10 h-10 rounded-full bg-[#0071e3]/20 text-[#2997ff] flex items-center justify-center mx-auto">
                    <Check className="w-5 h-5" />
                  </div>
                  <h5 className="text-base sm:text-lg font-semibold text-white">
                    You're on the priority notification list
                  </h5>
                  <p className="text-xs sm:text-sm text-neutral-300">
                    We'll email <span className="text-white font-medium underline">{email}</span> the moment Aro - 1 in {currentFinishObj.name} is available to ship.
                  </p>
                  <p className="text-[11px] text-neutral-500 pt-1">
                    Leave your email, and we’ll let you know as soon as it’s available.
                  </p>
                  <button
                    type="button"
                    onClick={onClose}
                    className="mt-3 px-6 py-2 rounded-full bg-white text-black text-xs font-semibold hover:bg-neutral-200 active:scale-95 transition-all cursor-pointer"
                  >
                    Done
                  </button>
                </div>
              )}

              {!isEmailSubmitted && (
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => setIsOrdered(false)}
                    className="text-xs text-neutral-400 hover:text-white transition-colors duration-200 underline cursor-pointer"
                  >
                    Configure a different finish
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              {/* Product Visual Preview with Smooth Fade Transitions */}
              <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] max-h-56 sm:max-h-72 rounded-2xl bg-[#0f0f10] border border-white/10 overflow-hidden flex items-center justify-center p-2 sm:p-4 shadow-inner">
                {FINISHES.map((f) => {
                  const isSelected = selectedFinish === f.id;
                  return (
                    <img
                      key={f.id}
                      src={f.image}
                      alt={`Aro - 1 in ${f.name}`}
                      className={`absolute inset-0 w-full h-full object-contain p-2 sm:p-4 transition-opacity duration-700 ease-in-out ${
                        isSelected
                          ? 'opacity-100 z-10 pointer-events-auto'
                          : 'opacity-0 z-0 pointer-events-none'
                      }`}
                      loading="eager"
                    />
                  );
                })}
                {/* Active Finish Floating Tag */}
                <div className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 z-20 px-3 py-1 rounded-full bg-black/75 backdrop-blur-md border border-white/15 text-[10px] sm:text-xs font-medium text-neutral-200 transition-opacity duration-500">
                  {currentFinishObj.name}
                </div>
              </div>

              {/* Finish Selection */}
              <div>
                <label className="text-xs sm:text-sm font-medium text-neutral-300 block mb-2 sm:mb-2.5 transition-opacity duration-300">
                  1. Choose your finish: <span className="text-white font-semibold transition-opacity duration-500">{currentFinishObj.name}</span>
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-2.5">
                  {FINISHES.map((f) => {
                    const isSelected = selectedFinish === f.id;
                    return (
                      <button
                        key={f.id}
                        type="button"
                        onClick={() => setSelectedFinish(f.id)}
                        className={`p-2.5 sm:p-3 rounded-2xl border text-left transition-all duration-300 cursor-pointer flex flex-col items-center gap-1.5 sm:gap-2 ${
                          isSelected
                            ? 'border-[#0071e3] bg-[#0071e3]/10 ring-2 ring-[#0071e3]/40'
                            : 'border-white/10 bg-[#1d1d1f] hover:border-white/25 hover:bg-[#232326]'
                        }`}
                      >
                        <span
                          className="w-5 h-5 sm:w-6 sm:h-6 rounded-full shadow-inner border border-white/20 transition-transform duration-300"
                          style={{ backgroundColor: f.hex }}
                        />
                        <span className="text-[11px] sm:text-xs font-semibold text-center leading-tight text-white transition-opacity duration-300">
                          {f.name}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Scent Pod Pack Selection */}
              <div>
                <label className="text-xs sm:text-sm font-medium text-neutral-300 block mb-2 sm:mb-2.5 transition-opacity duration-300">
                  2. Select Olfactory Pod Bundle
                </label>
                <div className="space-y-2 sm:space-y-2.5">
                  {SCENT_BUNDLES.map((b) => {
                    const isSelected = selectedBundle === b.id;
                    return (
                      <div
                        key={b.id}
                        onClick={() => setSelectedBundle(b.id)}
                        className={`p-3 sm:p-3.5 rounded-2xl border transition-all duration-300 cursor-pointer flex items-center justify-between gap-2 ${
                          isSelected
                            ? 'border-[#0071e3] bg-[#0071e3]/10 ring-1 ring-[#0071e3]/30'
                            : 'border-white/10 bg-[#1d1d1f] hover:border-white/25 hover:bg-[#232326]'
                        }`}
                      >
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs sm:text-sm font-semibold text-white transition-opacity duration-300">{b.name}</span>
                            {b.included && (
                              <span className="text-[9px] sm:text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-white/10 text-neutral-300">
                                Included
                              </span>
                            )}
                          </div>
                          <p className="text-[11px] sm:text-xs text-neutral-400 mt-0.5 transition-opacity duration-300">{b.items}</p>
                        </div>
                        <span className="text-xs sm:text-sm font-semibold text-neutral-200 flex-shrink-0 transition-opacity duration-300">
                          {b.addPrice ? `+₹${b.addPrice.toLocaleString('en-IN')}` : 'Free'}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Payment method */}
              <div>
                <label className="text-xs sm:text-sm font-medium text-neutral-300 block mb-2 sm:mb-2.5 transition-opacity duration-300">
                  3. Payment option
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
                  <button
                    type="button"
                    onClick={() => setPaymentOption('full')}
                    className={`p-3.5 sm:p-4 rounded-2xl border text-left transition-all duration-300 cursor-pointer ${
                      paymentOption === 'full'
                        ? 'border-[#0071e3] bg-[#0071e3]/10 ring-2 ring-[#0071e3]/40'
                        : 'border-white/10 bg-[#1d1d1f] hover:border-white/25 hover:bg-[#232326]'
                    }`}
                  >
                    <div className="text-[11px] sm:text-xs text-neutral-400 mb-0.5 sm:mb-1 transition-opacity duration-300">One-time payment</div>
                    <div className="text-base sm:text-lg font-bold text-white transition-opacity duration-500">₹{totalPrice.toLocaleString('en-IN')}.00*</div>
                    <div className="text-[10px] sm:text-[11px] text-neutral-400 mt-0.5 sm:mt-1 transition-opacity duration-300">Inclusive of all taxes</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentOption('emi')}
                    className={`p-3.5 sm:p-4 rounded-2xl border text-left transition-all duration-300 cursor-pointer ${
                      paymentOption === 'emi'
                        ? 'border-[#0071e3] bg-[#0071e3]/10 ring-2 ring-[#0071e3]/40'
                        : 'border-white/10 bg-[#1d1d1f] hover:border-white/25 hover:bg-[#232326]'
                    }`}
                  >
                    <div className="text-[11px] sm:text-xs text-neutral-400 mb-0.5 sm:mb-1 transition-opacity duration-300">No Cost EMI</div>
                    <div className="text-base sm:text-lg font-bold text-white transition-opacity duration-500">₹{monthlyEmi.toLocaleString('en-IN')}.00/mo.‡</div>
                    <div className="text-[10px] sm:text-[11px] text-neutral-400 mt-0.5 sm:mt-1 transition-opacity duration-300">For 12 months with 0% interest</div>
                  </button>
                </div>
              </div>

              {/* Value props */}
              <div className="pt-2 border-t border-white/10 grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 text-neutral-400 text-xs transition-opacity duration-300">
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-neutral-300 flex-shrink-0" />
                  <span>Free Express Shipping</span>
                </div>
                <div className="flex items-center gap-2">
                  <RefreshCw className="w-4 h-4 text-neutral-300 flex-shrink-0" />
                  <span>14-Day Free Returns</span>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Modal Footer */}
        {!isOrdered && (
          <div className="px-4 sm:px-6 py-3.5 sm:py-4 bg-[#1b1b1c] border-t border-white/10 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-0 transition-opacity duration-300">
            <div>
              <div className="text-[11px] sm:text-xs text-neutral-400 transition-opacity duration-300">Total Price</div>
              <div className="text-base sm:text-lg font-bold text-white transition-opacity duration-500">
                {paymentOption === 'full'
                  ? `₹${totalPrice.toLocaleString('en-IN')}.00*`
                  : `₹${monthlyEmi.toLocaleString('en-IN')}.00/mo.‡`}
              </div>
            </div>
            <button
              onClick={handleOrder}
              className="w-full sm:w-auto px-8 sm:px-10 py-2.5 sm:py-3 rounded-full bg-[#0071e3] hover:bg-[#0077ed] active:scale-95 text-white font-semibold text-xs sm:text-sm transition-all duration-300 shadow-lg shadow-blue-600/30 cursor-pointer text-center"
            >
              Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

