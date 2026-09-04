import { useEffect, useState } from 'react';
import type { FC } from 'react';
import { X, Mail, Phone, HeartHandshake, Copy, Check } from 'lucide-react';

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AboutModal: FC<AboutModalProps> = ({ isOpen, onClose }) => {
  const [copiedEmail, setCopiedEmail] = useState(false);

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

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('wnymissingandunidentified@yahoo.com');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="fixed inset-0" 
        onClick={onClose} 
        aria-hidden="true" 
      />

      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden z-10 animate-in zoom-in-95 duration-200">
        {/* Header with Purple Gradient */}
        <div className="bg-gradient-to-r from-purple-950 via-purple-900 to-indigo-950 text-white p-6 sm:p-7 relative">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white/80 hover:text-white transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/20 border border-purple-400/30 text-purple-200 text-xs font-semibold mb-3">
            <HeartHandshake className="w-3.5 h-3.5 text-purple-300" />
            <span>Community Advocacy</span>
          </div>

          <h2 className="text-xl sm:text-2xl font-bold tracking-tight">
            About Our Organization
          </h2>
          <p className="text-purple-200/80 text-xs sm:text-sm mt-1">
            WNY Missing & Unidentified Persons
          </p>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-7 space-y-6">
          {/* Founder Highlight */}
          <div className="p-5 rounded-2xl bg-purple-50 border border-purple-100 flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-purple-950 text-white flex items-center justify-center font-bold text-lg shrink-0 shadow-sm">
              MW
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-purple-700 block">
                Founder
              </span>
              <h3 className="text-base sm:text-lg font-bold text-slate-900">
                Merry Williams-Diers
              </h3>
              <p className="text-slate-600 text-xs sm:text-sm mt-1 leading-relaxed">
                Merry Williams-Diers is the founder of WNY Missing and Unidentified Persons, dedicating grassroots advocacy and support to ensure no missing or unidentified loved one across Western New York is forgotten.
              </p>
            </div>
          </div>

          {/* Mission Note */}
          <div className="space-y-2 text-slate-600 text-xs sm:text-sm leading-relaxed">
            <p>
              Our mission is to bring continuous public awareness, share critical case updates, and provide direct liaison support for families and local communities throughout Erie, Niagara, Monroe, Chautauqua, Cattaraugus, Allegany, Genesee, Orleans, and Wyoming counties.
            </p>
            <p className="text-slate-500 text-xs">
              Case profiles are cross-referenced with local investigating law enforcement agencies and <a href="https://www.namus.gov" target="_blank" rel="noopener noreferrer" className="text-purple-700 font-semibold underline hover:text-purple-900">NamUs (National Missing and Unidentified Persons System)</a>.
            </p>
          </div>

          {/* Direct Contact Information */}
          <div className="space-y-3 pt-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Direct Contact Information
            </h4>

            {/* Email Card */}
            <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 border border-slate-200 hover:border-purple-300 transition-colors">
              <a
                href="mailto:wnymissingandunidentified@yahoo.com"
                className="flex items-center gap-3 text-xs sm:text-sm font-semibold text-slate-800 hover:text-purple-900 transition-colors truncate"
              >
                <div className="w-9 h-9 rounded-lg bg-purple-100 text-purple-900 flex items-center justify-center shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <span className="truncate">wnymissingandunidentified@yahoo.com</span>
              </a>

              <button
                onClick={handleCopyEmail}
                title="Copy email address"
                className="p-2 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors shrink-0 ml-2"
              >
                {copiedEmail ? (
                  <Check className="w-4 h-4 text-emerald-600" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
            </div>

            {/* Phone Card */}
            <a
              href="tel:7164012080"
              className="flex items-center gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200 hover:border-purple-300 transition-colors group text-xs sm:text-sm font-semibold text-slate-800 hover:text-purple-900"
            >
              <div className="w-9 h-9 rounded-lg bg-teal-100 text-teal-900 flex items-center justify-center shrink-0">
                <Phone className="w-4 h-4" />
              </div>
              <div>
                <span>(716) 401-2080</span>
                <span className="block text-[11px] font-normal text-slate-500">
                  Click to call directly
                </span>
              </div>
            </a>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 sm:p-5 bg-slate-50 border-t border-slate-100 flex items-center justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-medium text-xs sm:text-sm transition-colors shadow-sm"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
