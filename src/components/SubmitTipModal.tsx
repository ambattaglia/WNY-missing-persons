import { useState, useEffect } from 'react';
import type { FC, FormEvent } from 'react';
import { X, Send, ShieldAlert, CheckCircle2, Lock } from 'lucide-react';
import type { CaseRecord } from '../data/casesData';

interface SubmitTipModalProps {
  isOpen: boolean;
  onClose: () => void;
  caseRecord: CaseRecord | null;
}

export const SubmitTipModal: FC<SubmitTipModalProps> = ({
  isOpen,
  onClose,
  caseRecord,
}) => {
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [tipReference, setTipReference] = useState('');

  const [formData, setFormData] = useState({
    tipDetails: '',
    sightingLocation: '',
    sightingDate: '',
    informantName: '',
    informantPhone: '',
    informantEmail: '',
  });

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
      const randomRef = 'WNY-TIP-' + Math.floor(100000 + Math.random() * 900000);
      setTipReference(randomRef);
    }, 900);
  };

  const resetAndClose = () => {
    setSubmitted(false);
    setFormData({
      tipDetails: '',
      sightingLocation: '',
      sightingDate: '',
      informantName: '',
      informantPhone: '',
      informantEmail: '',
    });
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={resetAndClose}
    >
      <div
        className="relative w-full max-w-xl max-h-[92vh] overflow-y-auto rounded-3xl bg-white shadow-2xl border border-slate-200 p-6 sm:p-8 text-slate-900 transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={resetAndClose}
          aria-label="Close modal"
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="text-center py-8 space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900">
              Tip Received Securely
            </h3>
            <p className="text-slate-600 text-sm max-w-md mx-auto leading-relaxed">
              Thank you for helping our Western New York community. Your lead has been logged with reference number:
            </p>
            <div className="p-3 bg-slate-100 font-mono text-sm font-bold text-slate-800 rounded-xl inline-block">
              {tipReference}
            </div>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              If you remember additional details later, please contact the relevant investigating agency directly citing this reference number.
            </p>
            <div className="pt-4">
              <button
                onClick={resetAndClose}
                className="px-6 py-2.5 rounded-xl bg-slate-900 text-white font-semibold text-sm hover:bg-slate-800 transition-colors"
              >
                Return to Cases
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-2.5 mb-2">
              <div className="p-2 rounded-xl bg-alert-50 text-alert-600">
                <ShieldAlert className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">
                Submit a Confidential Tip
              </h3>
            </div>

            <p className="text-xs text-slate-500 mb-5 leading-relaxed">
              Every piece of information, no matter how small or seemingly insignificant, can help bring someone home or identify a loved one.
            </p>

            {/* Case context banner if opened for a specific case */}
            {caseRecord && (
              <div className="p-3.5 rounded-2xl bg-sky-50 border border-sky-100 text-xs text-slate-700 mb-5 flex items-center justify-between">
                <div>
                  <span className="font-semibold text-sky-900 block">Regarding Case:</span>
                  <span className="font-bold text-slate-900">{caseRecord.name}</span> ({caseRecord.caseNumber})
                </div>
                <span className="text-[11px] font-semibold text-sky-700 bg-sky-100 px-2.5 py-1 rounded-md">
                  {caseRecord.county}
                </span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Tip Details / What Did You Observe? <span className="text-alert-600">*</span>
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.tipDetails}
                  onChange={(e) => setFormData({ ...formData, tipDetails: e.target.value })}
                  placeholder="Describe what you saw, heard, or know. Include any descriptions, vehicle models, or names if known..."
                  className="w-full p-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/30 focus:border-sky-500 resize-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Location of Sighting / Event
                  </label>
                  <input
                    type="text"
                    value={formData.sightingLocation}
                    onChange={(e) => setFormData({ ...formData, sightingLocation: e.target.value })}
                    placeholder="e.g. Elmwood Ave, Buffalo, NY"
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/30 focus:border-sky-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Approximate Date / Time
                  </label>
                  <input
                    type="text"
                    value={formData.sightingDate}
                    onChange={(e) => setFormData({ ...formData, sightingDate: e.target.value })}
                    placeholder="e.g. Yesterday around 4:00 PM"
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/30 focus:border-sky-500"
                  />
                </div>
              </div>

              {/* Anonymous Checkbox */}
              <div className="pt-2">
                <label className="flex items-center gap-2.5 cursor-pointer text-xs font-semibold text-slate-700 select-none">
                  <input
                    type="checkbox"
                    checked={isAnonymous}
                    onChange={(e) => setIsAnonymous(e.target.checked)}
                    className="w-4 h-4 rounded text-sky-600 focus:ring-sky-500 border-slate-300"
                  />
                  <span className="flex items-center gap-1">
                    <Lock className="w-3.5 h-3.5 text-slate-400" />
                    Submit this tip 100% anonymously (do not share my contact details)
                  </span>
                </label>
              </div>

              {/* Informant Contact Details (Hidden if anonymous) */}
              {!isAnonymous && (
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">
                    Your Contact Information (Optional - Kept Confidential)
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      type="text"
                      value={formData.informantName}
                      onChange={(e) => setFormData({ ...formData, informantName: e.target.value })}
                      placeholder="Your Name (optional)"
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs bg-white focus:outline-none focus:ring-2 focus:ring-sky-500/30"
                    />
                    <input
                      type="tel"
                      value={formData.informantPhone}
                      onChange={(e) => setFormData({ ...formData, informantPhone: e.target.value })}
                      placeholder="Phone Number (optional)"
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs bg-white focus:outline-none focus:ring-2 focus:ring-sky-500/30"
                    />
                  </div>
                </div>
              )}

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={submitting}
                className="w-full py-3 px-6 rounded-xl font-semibold text-white bg-slate-900 hover:bg-slate-800 shadow-md flex items-center justify-center gap-2 transition-all hover:scale-[1.01] disabled:opacity-50 mt-4"
              >
                {submitting ? (
                  <span className="flex items-center gap-2 text-sm">
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Encrypting & Logging Tip...
                  </span>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Submit Confidential Tip</span>
                  </>
                )}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
