import React, { useState } from 'react';
import {
  X,
  Mail,
  MapPin,
  Phone,
  CheckCircle2,
  Send,
  Sparkles,
  Copy,
  Check,
  Building2,
  Package,
  Layers,
  UserCheck,
  ArrowRight,
  ShieldCheck,
  Clock,
} from 'lucide-react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const TOPICS = [
  { id: 'preorder', label: 'Aro - 1 Pre-order', icon: Package },
  { id: 'refills', label: 'Fragrance & Refills', icon: Layers },
  { id: 'enterprise', label: 'Enterprise & Spaces', icon: Building2 },
  { id: 'founder', label: 'Founder Direct', icon: UserCheck },
];

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [selectedTopic, setSelectedTopic] = useState('Aro - 1 Pre-order');
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [isSending, setIsSending] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [ticketId, setTicketId] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  if (!isOpen) return null;

  const handleCopy = (text: string, fieldName: string) => {
    navigator.clipboard?.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => {
      setCopiedField(null);
    }, 2200);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);

    // Smooth dispatch simulation
    setTimeout(() => {
      const generatedId = `ARX-${Math.floor(1000 + Math.random() * 9000)}`;
      setTicketId(generatedId);
      setIsSending(false);
      setSubmitted(true);
    }, 750);
  };

  const handleReset = () => {
    setSubmitted(false);
    setIsSending(false);
    setFormData({
      name: '',
      email: '',
      phone: '',
      message: '',
    });
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-2xl transition-all duration-300 animate-fade-in"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-xl bg-gradient-to-b from-[#18181b] via-[#121214] to-black border-2 border-white/20 ring-1 ring-white/10 rounded-[28px] sm:rounded-[38px] p-5 sm:p-8 space-y-6 text-white shadow-[0_32px_120px_rgba(0,0,0,0.95)] relative max-h-[92vh] overflow-y-auto custom-scrollbar transform transition-all duration-300"
      >
        {/* Ambient Animated Glow in Background */}
        <div className="absolute top-0 right-10 w-72 h-72 bg-[#2997ff]/10 rounded-full blur-3xl pointer-events-none animate-pulse" />
        <div className="absolute bottom-0 left-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Modal Top Bar */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4 relative z-10">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-[11px] font-mono uppercase tracking-widest text-[#2997ff] border border-blue-500/25">
              <Sparkles className="w-3.5 h-3.5 animate-spin-slow" />
              <span>Direct Concierge</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-white flex items-center gap-2">
              Contact Aromax AI
            </h3>
            <p className="text-xs sm:text-sm text-neutral-400">
              Inquiries for Aro - 1, enterprise ambient scenting, or custom scent architecture.
            </p>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 active:scale-95 flex items-center justify-center text-neutral-300 hover:text-white transition-all cursor-pointer flex-shrink-0 border border-white/10"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {submitted ? (
          /* SUCCESS ANIMATED STATE */
          <div className="py-8 sm:py-10 text-center space-y-6 relative z-10 animate-fade-in">
            <div className="relative w-20 h-20 mx-auto flex items-center justify-center">
              <div className="absolute inset-0 rounded-full bg-emerald-500/20 blur-md animate-ping opacity-75" />
              <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-emerald-600 to-teal-400 border-2 border-emerald-300 flex items-center justify-center shadow-lg shadow-emerald-500/30">
                <CheckCircle2 className="w-10 h-10 text-white" />
              </div>
            </div>

            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-[11px] font-mono tracking-widest uppercase">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Ticket #{ticketId} Dispatched</span>
              </div>
              <h4 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                Message Received, {formData.name || 'Friend'}.
              </h4>
              <p className="text-xs sm:text-sm text-neutral-300 max-w-md mx-auto leading-relaxed">
                Thank you for reaching out regarding <span className="text-[#2997ff] font-semibold">{selectedTopic}</span>. Aaditya and our technical concierge team will respond directly to <span className="text-white font-semibold underline decoration-[#2997ff]">{formData.email}</span> within 2 hours.
              </p>
            </div>

            {/* Direct contact summary card */}
            <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10 max-w-md mx-auto flex items-center justify-between text-left">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/25 flex items-center justify-center text-[#2997ff]">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-white">Guaranteed Turnaround</p>
                  <p className="text-[11px] text-neutral-400">&lt; 2 hours response time</p>
                </div>
              </div>
              <span className="text-xs font-mono text-emerald-400 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Live Line
              </span>
            </div>

            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                onClick={handleReset}
                className="px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/15 text-xs font-semibold text-white transition-all cursor-pointer border border-white/15"
              >
                Send Another
              </button>
              <button
                onClick={onClose}
                className="px-6 py-2.5 rounded-full bg-white hover:bg-neutral-200 text-black text-xs font-bold transition-all shadow-lg cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          /* FORM & DIRECT CONTACT ACTIONS */
          <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
            {/* Topic Selection Pills */}
            <div className="space-y-2">
              <label className="text-[11px] font-mono uppercase tracking-wider text-neutral-400">
                Inquiry Focus
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {TOPICS.map((topic) => {
                  const Icon = topic.icon;
                  const isSelected = selectedTopic === topic.label;
                  return (
                    <button
                      key={topic.id}
                      type="button"
                      onClick={() => setSelectedTopic(topic.label)}
                      className={`p-2.5 rounded-xl border text-xs font-medium flex flex-col items-start gap-1.5 transition-all duration-200 cursor-pointer ${
                        isSelected
                          ? 'bg-[#2997ff]/15 border-[#2997ff] text-white shadow-[0_0_15px_rgba(41,151,255,0.25)]'
                          : 'bg-white/[0.03] border-white/10 text-neutral-400 hover:text-white hover:bg-white/[0.06]'
                      }`}
                    >
                      <Icon
                        className={`w-4 h-4 ${
                          isSelected ? 'text-[#2997ff]' : 'text-neutral-500'
                        }`}
                      />
                      <span className="leading-tight text-[11px] sm:text-xs text-left">
                        {topic.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Form Inputs Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-neutral-300">Your Name</label>
                <input
                  type="text"
                  required
                  placeholder="Full name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/15 text-white placeholder-neutral-500 text-xs sm:text-sm focus:outline-none focus:border-[#2997ff] focus:ring-2 focus:ring-[#2997ff]/20 transition-all duration-200"
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
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/15 text-white placeholder-neutral-500 text-xs sm:text-sm focus:outline-none focus:border-[#2997ff] focus:ring-2 focus:ring-[#2997ff]/20 transition-all duration-200"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-neutral-300">Your Message</label>
              <textarea
                required
                rows={3}
                placeholder="Tell us about your space, order, or questions regarding Aro - 1..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/15 text-white placeholder-neutral-500 text-xs sm:text-sm focus:outline-none focus:border-[#2997ff] focus:ring-2 focus:ring-[#2997ff]/20 transition-all duration-200 resize-none"
              />
            </div>

            {/* Submit Button with Animated State */}
            <button
              type="submit"
              disabled={isSending}
              className={`w-full py-3.5 rounded-full font-semibold text-xs sm:text-sm transition-all duration-300 shadow-xl cursor-pointer flex items-center justify-center gap-2 ${
                isSending
                  ? 'bg-[#0071e3]/70 text-white cursor-wait'
                  : 'bg-[#0071e3] hover:bg-[#0077ed] active:scale-[0.99] text-white shadow-blue-500/25 hover:shadow-blue-500/40'
              }`}
            >
              {isSending ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Transmitting to Concierge...</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Send Message to Aromax AI</span>
                  <ArrowRight className="w-3.5 h-3.5 opacity-70 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>

            {/* Contact us Direct Details Box (Elevated with Copy buttons and active status) */}
            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 space-y-3">
              <div className="flex items-center justify-between">
                <p className="text-[11px] font-mono uppercase tracking-widest text-neutral-400">
                  Contact us
                </p>
                <div className="flex items-center gap-1.5 text-[10px] font-mono text-emerald-400">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Active Now • Direct Line</span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                {/* Email Action */}
                <div className="p-3 rounded-xl bg-white/[0.03] hover:bg-white/[0.07] border border-white/10 hover:border-[#2997ff]/50 transition-all group flex flex-col justify-between relative overflow-hidden">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-[#2997ff] flex-shrink-0" />
                      <span className="text-[10px] font-mono uppercase text-neutral-400">Email</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleCopy('aaditya@aromaxai.com', 'email')}
                      className="text-neutral-400 hover:text-white transition-colors cursor-pointer p-1"
                      title="Copy email"
                    >
                      {copiedField === 'email' ? (
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>
                  <a
                    href="mailto:aaditya@aromaxai.com"
                    className="mt-1.5 text-white font-medium text-[12px] truncate group-hover:text-[#2997ff] transition-colors cursor-pointer"
                  >
                    aaditya@aromaxai.com
                  </a>
                  {copiedField === 'email' && (
                    <span className="text-[10px] text-emerald-400 font-mono mt-0.5 animate-fade-in">
                      Copied! ✓
                    </span>
                  )}
                </div>

                {/* Phone Action */}
                <div className="p-3 rounded-xl bg-white/[0.03] hover:bg-white/[0.07] border border-white/10 hover:border-emerald-400/50 transition-all group flex flex-col justify-between relative overflow-hidden">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                      <span className="text-[10px] font-mono uppercase text-neutral-400">Phone</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleCopy('+918827722507', 'phone')}
                      className="text-neutral-400 hover:text-white transition-colors cursor-pointer p-1"
                      title="Copy phone number"
                    >
                      {copiedField === 'phone' ? (
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>
                  <a
                    href="tel:+918827722507"
                    className="mt-1.5 text-white font-medium text-[12px] truncate group-hover:text-emerald-400 transition-colors cursor-pointer"
                  >
                    +91 8827722507
                  </a>
                  {copiedField === 'phone' && (
                    <span className="text-[10px] text-emerald-400 font-mono mt-0.5 animate-fade-in">
                      Copied! ✓
                    </span>
                  )}
                </div>

                {/* Headquarters Location */}
                <div className="p-3 rounded-xl bg-white/[0.03] hover:bg-white/[0.07] border border-white/10 hover:border-purple-400/50 transition-all flex flex-col justify-between">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-purple-400 flex-shrink-0" />
                    <span className="text-[10px] font-mono uppercase text-neutral-400">HQ</span>
                  </div>
                  <div className="mt-1.5 text-white font-medium text-[12px]">
                    Raipur • India
                  </div>
                  <span className="text-[10px] text-neutral-400 font-mono mt-0.5">
                    Central Innovation Hub
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
