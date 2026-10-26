import React, { useState } from 'react';
import { X, Check, ShieldCheck, Truck, RefreshCw } from 'lucide-react';

interface AppleBuyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const FINISHES = [
  {
    id: 'charcoal-black',
    name: 'Charcoal Black',
    desc: 'Deep anodized matte black finish with micro-textured acoustic dampening',
    hex: '#232325',
  },
  {
    id: 'ivory-white',
    name: 'Ivory White',
    desc: 'Warm satin ceramic finish engineered to reflect ambient room light',
    hex: '#F3F2EC',
  },
  {
    id: 'wooden-brown',
    name: 'Wooden Brown',
    desc: 'Natural warm timber grain with organic satin seal and precision vents',
    hex: '#8B5A2B',
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

  if (!isOpen) return null;

  const currentFinishObj = FINISHES.find((f) => f.id === selectedFinish) || FINISHES[0];
  const bundleObj = SCENT_BUNDLES.find((b) => b.id === selectedBundle) || SCENT_BUNDLES[0];
  const totalPrice = 20000 + (bundleObj.addPrice || 0);
  const monthlyEmi = Math.round(totalPrice / 12);

  const handleOrder = () => {
    setIsOrdered(true);
    setTimeout(() => {
      // Keep state clear after a short moment
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-xl animate-fade-in">
      <div 
        className="relative w-full max-w-2xl bg-[#161617] text-white rounded-3xl border border-white/10 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-4 sm:py-5 border-b border-white/10">
          <div>
            <h3 className="text-[11px] sm:text-xs uppercase tracking-wider text-neutral-400 font-mono">Configure</h3>
            <p className="text-lg sm:text-xl font-semibold tracking-tight text-white">Buy Aromax AI</p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-neutral-300 hover:text-white transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="overflow-y-auto px-4 sm:px-6 py-4 sm:py-6 space-y-5 sm:space-y-7 custom-scrollbar">
          {isOrdered ? (
            <div className="py-12 sm:py-16 text-center space-y-4">
              <div className="w-14 sm:w-16 h-14 sm:h-16 rounded-full bg-[#0071e3] text-white flex items-center justify-center mx-auto shadow-lg shadow-blue-500/20">
                <Check className="w-7 sm:w-8 h-7 sm:h-8" />
              </div>
              <h4 className="text-xl sm:text-2xl font-bold">Thank you for your order.</h4>
              <p className="text-neutral-400 text-xs sm:text-sm max-w-md mx-auto">
                Your Aromax AI in {currentFinishObj.name} is scheduled for express delivery within 2-3 business days.
              </p>
              <button
                onClick={() => {
                  setIsOrdered(false);
                  onClose();
                }}
                className="mt-6 px-6 py-2.5 rounded-full bg-white text-black font-semibold text-sm hover:bg-neutral-200 transition-colors cursor-pointer"
              >
                Done
              </button>
            </div>
          ) : (
            <>
              {/* Finish Selection */}
              <div>
                <label className="text-xs sm:text-sm font-medium text-neutral-300 block mb-2 sm:mb-3">
                  1. Choose your finish: <span className="text-white font-semibold">{currentFinishObj.name}</span>
                </label>
                <div className="grid grid-cols-3 gap-2 sm:gap-3">
                  {FINISHES.map((f) => {
                    const isSelected = selectedFinish === f.id;
                    return (
                      <button
                        key={f.id}
                        type="button"
                        onClick={() => setSelectedFinish(f.id)}
                        className={`p-2.5 sm:p-3.5 rounded-2xl border text-left transition-all cursor-pointer flex flex-col items-center gap-1.5 sm:gap-2 ${
                          isSelected
                            ? 'border-[#0071e3] bg-[#0071e3]/10 ring-2 ring-[#0071e3]/40'
                            : 'border-white/10 bg-[#1d1d1f] hover:border-white/25'
                        }`}
                      >
                        <span
                          className="w-5 h-5 sm:w-7 sm:h-7 rounded-full shadow-inner border border-white/20"
                          style={{ backgroundColor: f.hex }}
                        />
                        <span className="text-[11px] sm:text-xs font-semibold text-center leading-tight">{f.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Scent Pod Pack Selection */}
              <div>
                <label className="text-xs sm:text-sm font-medium text-neutral-300 block mb-2 sm:mb-3">
                  2. Select Olfactory Pod Bundle
                </label>
                <div className="space-y-2 sm:space-y-2.5">
                  {SCENT_BUNDLES.map((b) => {
                    const isSelected = selectedBundle === b.id;
                    return (
                      <div
                        key={b.id}
                        onClick={() => setSelectedBundle(b.id)}
                        className={`p-3.5 sm:p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-2 ${
                          isSelected
                            ? 'border-[#0071e3] bg-[#0071e3]/10'
                            : 'border-white/10 bg-[#1d1d1f] hover:border-white/25'
                        }`}
                      >
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs sm:text-sm font-semibold text-white">{b.name}</span>
                            {b.included && (
                              <span className="text-[9px] sm:text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-white/10 text-neutral-300">
                                Included
                              </span>
                            )}
                          </div>
                          <p className="text-[11px] sm:text-xs text-neutral-400 mt-0.5">{b.items}</p>
                        </div>
                        <span className="text-xs sm:text-sm font-semibold text-neutral-200 flex-shrink-0">
                          {b.addPrice ? `+₹${b.addPrice.toLocaleString('en-IN')}` : 'Free'}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Payment method */}
              <div>
                <label className="text-xs sm:text-sm font-medium text-neutral-300 block mb-2 sm:mb-3">
                  3. Payment option
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
                  <button
                    type="button"
                    onClick={() => setPaymentOption('full')}
                    className={`p-3.5 sm:p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                      paymentOption === 'full'
                        ? 'border-[#0071e3] bg-[#0071e3]/10 ring-2 ring-[#0071e3]/40'
                        : 'border-white/10 bg-[#1d1d1f] hover:border-white/25'
                    }`}
                  >
                    <div className="text-[11px] sm:text-xs text-neutral-400 mb-0.5 sm:mb-1">One-time payment</div>
                    <div className="text-base sm:text-lg font-bold text-white">₹{totalPrice.toLocaleString('en-IN')}.00*</div>
                    <div className="text-[10px] sm:text-[11px] text-neutral-400 mt-0.5 sm:mt-1">Inclusive of all taxes</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentOption('emi')}
                    className={`p-3.5 sm:p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                      paymentOption === 'emi'
                        ? 'border-[#0071e3] bg-[#0071e3]/10 ring-2 ring-[#0071e3]/40'
                        : 'border-white/10 bg-[#1d1d1f] hover:border-white/25'
                    }`}
                  >
                    <div className="text-[11px] sm:text-xs text-neutral-400 mb-0.5 sm:mb-1">No Cost EMI</div>
                    <div className="text-base sm:text-lg font-bold text-white">₹{monthlyEmi.toLocaleString('en-IN')}.00/mo.‡</div>
                    <div className="text-[10px] sm:text-[11px] text-neutral-400 mt-0.5 sm:mt-1">For 12 months with 0% interest</div>
                  </button>
                </div>
              </div>

              {/* Value props */}
              <div className="pt-2 border-t border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3 text-neutral-400 text-xs">
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-neutral-300 flex-shrink-0" />
                  <span>Free Express Shipping</span>
                </div>
                <div className="flex items-center gap-2">
                  <RefreshCw className="w-4 h-4 text-neutral-300 flex-shrink-0" />
                  <span>14-Day Free Returns</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-neutral-300 flex-shrink-0" />
                  <span>2-Year Apple Care+</span>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Modal Footer */}
        {!isOrdered && (
          <div className="px-4 sm:px-6 py-3.5 sm:py-4 bg-[#1b1b1c] border-t border-white/10 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-0">
            <div>
              <div className="text-[11px] sm:text-xs text-neutral-400">Total Price</div>
              <div className="text-base sm:text-lg font-bold text-white">
                {paymentOption === 'full'
                  ? `₹${totalPrice.toLocaleString('en-IN')}.00*`
                  : `₹${monthlyEmi.toLocaleString('en-IN')}.00/mo.‡`}
              </div>
            </div>
            <button
              onClick={handleOrder}
              className="w-full sm:w-auto px-6 sm:px-7 py-2.5 sm:py-3 rounded-full bg-[#0071e3] hover:bg-[#0077ed] active:scale-95 text-white font-semibold text-xs sm:text-sm transition-all shadow-lg shadow-blue-600/30 cursor-pointer text-center"
            >
              Order with Apple Pay
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
