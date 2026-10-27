import React, { useState } from 'react';
import { X, Mail, MapPin, Phone, CheckCircle2, Send, Sparkles } from 'lucide-react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'Pre-order & Aro - 1 Inquiry',
    message: '',
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-2xl animate-fade-in"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-xl bg-[#161618] border-2 border-white/20 ring-1 ring-white/10 rounded-[28px] sm:rounded-[36px] p-6 sm:p-9 space-y-6 text-white shadow-[0_24px_80px_rgba(0,0,0,0.9)] relative max-h-[90vh] overflow-y-auto custom-scrollbar"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-5">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[11px] font-mono uppercase tracking-widest text-[#2997ff] border border-white/10">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Direct Concierge</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Contact Aromax AI
            </h3>
            <p className="text-xs sm:text-sm text-neutral-400">
              Inquiries for Aro - 1, enterprise ambient scenting, press, or custom scent architecture.
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 active:scale-95 flex items-center justify-center text-neutral-300 hover:text-white transition-all cursor-pointer flex-shrink-0"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {submitted ? (
          <div className="py-12 text-center space-y-4">
            <div className="w-14 h-14 rounded-full bg-emerald-500/20 border-2 border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h4 className="text-xl sm:text-2xl font-bold text-white">Message Dispatched</h4>
            <p className="text-xs sm:text-sm text-neutral-400 max-w-sm mx-auto">
              Thank you for reaching out. Our engineering concierge team will respond to <span className="text-white font-medium">{formData.email}</span> within 2 hours.
            </p>
            <button
              onClick={() => {
                setSubmitted(false);
                onClose();
              }}
              className="mt-4 px-6 py-2.5 rounded-full bg-white text-black font-semibold text-xs hover:bg-neutral-200 transition-all cursor-pointer"
            >
              Back to Aromax AI
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-neutral-300">Your Name</label>
                <input
                  type="text"
                  required
                  placeholder="Full name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/15 text-white placeholder-neutral-500 text-xs sm:text-sm focus:outline-none focus:border-[#2997ff]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-neutral-300">Email Address</label>
                <input
                  type="email"
                  required
                  placeholder="email@domain.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/15 text-white placeholder-neutral-500 text-xs sm:text-sm focus:outline-none focus:border-[#2997ff]"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-neutral-300">Topic</label>
              <select
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-[#202024] border border-white/15 text-white text-xs sm:text-sm focus:outline-none focus:border-[#2997ff]"
              >
                <option value="Pre-order & Aro - 1 Inquiry">Pre-order &amp; Aro - 1 Device Inquiry</option>
                <option value="Fragrance Refill & Custom Notes">Fragrance Refill &amp; Custom Scent Library</option>
                <option value="Enterprise & Hotel Spaces">Enterprise &amp; Hospitality Atmosphere Design</option>
                <option value="Press & Collaboration">Press, Media &amp; Developer API</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-neutral-300">Your Message</label>
              <textarea
                required
                rows={3}
                placeholder="Tell us about your space or questions regarding Aro - 1..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/15 text-white placeholder-neutral-500 text-xs sm:text-sm focus:outline-none focus:border-[#2997ff] resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-full bg-[#0071e3] hover:bg-[#0077ed] active:scale-98 text-white font-semibold text-xs sm:text-sm transition-all shadow-lg shadow-blue-500/25 cursor-pointer flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              <span>Send Message</span>
            </button>

            {/* Contact us Direct Details Box */}
            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 space-y-3">
              <p className="text-[11px] font-mono uppercase tracking-widest text-neutral-400">
                Contact us
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
                <a
                  href="mailto:aaditya@aromaxai.com"
                  className="p-3 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 hover:border-[#2997ff]/50 transition-all flex items-center gap-2.5 group cursor-pointer"
                >
                  <Mail className="w-4 h-4 text-[#2997ff] flex-shrink-0" />
                  <span className="text-white font-medium text-[12px] truncate group-hover:text-[#2997ff]">
                    aaditya@aromaxai.com
                  </span>
                </a>

                <a
                  href="tel:+918827722507"
                  className="p-3 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 hover:border-emerald-400/50 transition-all flex items-center gap-2.5 group cursor-pointer"
                >
                  <Phone className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span className="text-white font-medium text-[12px] truncate group-hover:text-emerald-400">
                    +91 8827722507
                  </span>
                </a>

                <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10 flex items-center gap-2.5">
                  <MapPin className="w-4 h-4 text-purple-400 flex-shrink-0" />
                  <span className="text-white font-medium text-[12px]">
                    Raipur • India
                  </span>
                </div>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
