import { useEffect } from 'react';
import type { FC } from 'react';
import { X, MapPin, Calendar, PhoneCall, ExternalLink, Shield, AlertCircle, CheckCircle2 } from 'lucide-react';
import type { CaseRecord } from '../data/casesData';

interface CaseDetailModalProps {
  caseRecord: CaseRecord | null;
  onClose: () => void;
  onOpenTip: (caseRecord: CaseRecord) => void;
}

export const CaseDetailModal: FC<CaseDetailModalProps> = ({
  caseRecord,
  onClose,
  onOpenTip,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (caseRecord) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [caseRecord, onClose]);

  if (!caseRecord) return null;

  const isMissing = caseRecord.type === 'Missing Person';

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl max-h-[92vh] overflow-y-auto rounded-3xl bg-white shadow-2xl border border-slate-200 transition-all text-slate-900"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-4 right-4 z-10 p-2.5 rounded-full bg-black/60 text-white hover:bg-black/80 transition-all backdrop-blur-md"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header Media */}
        <div className="relative h-64 sm:h-80 w-full overflow-hidden bg-slate-900">
          <img
            src={caseRecord.photoUrl}
            alt={caseRecord.name}
            className="w-full h-full object-cover opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

          <div className="absolute bottom-6 left-6 right-6 text-white">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span
                className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                  isMissing ? 'bg-alert-600' : 'bg-indigo-600'
                }`}
              >
                {caseRecord.type}
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-slate-800/80 border border-slate-700">
                Status: {caseRecord.status}
              </span>
              {caseRecord.isUrgent && (
                <span className="flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-amber-500 text-slate-950">
                  <AlertCircle className="w-3.5 h-3.5" />
                  Urgent Case
                </span>
              )}
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold">{caseRecord.name}</h2>
            <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-slate-300 mt-1">
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-sky-400" />
                {isMissing ? 'Missing Date:' : 'Date Found:'} {caseRecord.incidentDate}
              </span>
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-sky-400" />
                {caseRecord.city}, {caseRecord.county}
              </span>
            </div>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-6">
          {/* Physical Descriptors Matrix */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
              Physical Description & Case Vitals
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-200/80 text-xs sm:text-sm">
              <div>
                <span className="text-slate-400 block text-xs">Gender</span>
                <span className="font-semibold text-slate-800">{caseRecord.gender}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-xs">Age at Incident</span>
                <span className="font-semibold text-slate-800">{caseRecord.ageAtIncident} years</span>
              </div>
              {caseRecord.currentAge && (
                <div>
                  <span className="text-slate-400 block text-xs">Current Age</span>
                  <span className="font-semibold text-slate-800">{caseRecord.currentAge} years</span>
                </div>
              )}
              {caseRecord.height && (
                <div>
                  <span className="text-slate-400 block text-xs">Height</span>
                  <span className="font-semibold text-slate-800">{caseRecord.height}</span>
                </div>
              )}
              {caseRecord.weight && (
                <div>
                  <span className="text-slate-400 block text-xs">Weight</span>
                  <span className="font-semibold text-slate-800">{caseRecord.weight}</span>
                </div>
              )}
              {caseRecord.hairColor && (
                <div>
                  <span className="text-slate-400 block text-xs">Hair Color</span>
                  <span className="font-semibold text-slate-800">{caseRecord.hairColor}</span>
                </div>
              )}
              {caseRecord.eyeColor && (
                <div>
                  <span className="text-slate-400 block text-xs">Eye Color</span>
                  <span className="font-semibold text-slate-800">{caseRecord.eyeColor}</span>
                </div>
              )}
              <div>
                <span className="text-slate-400 block text-xs">Agency Case #</span>
                <span className="font-semibold text-slate-800">{caseRecord.caseNumber}</span>
              </div>
            </div>
          </div>

          {/* Identifying Features */}
          {caseRecord.identifyingFeatures.length > 0 && (
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2.5 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-sky-600" />
                Distinctive Features / Clothing
              </h3>
              <ul className="space-y-1.5 bg-sky-50/60 p-4 rounded-2xl border border-sky-100 text-xs sm:text-sm text-slate-800">
                {caseRecord.identifyingFeatures.map((feat, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-sky-600 mt-2 shrink-0" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Full Narrative */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
              Circumstances of Disappearance / Discovery
            </h3>
            <p className="text-sm sm:text-base text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-2xl border border-slate-100">
              {caseRecord.fullNarrative}
            </p>
          </div>

          {/* Law Enforcement Agency Information */}
          <div className="bg-slate-900 text-white p-5 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="text-xs text-slate-400 font-semibold uppercase tracking-wider flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5 text-sky-400" />
                Investigating Law Enforcement Agency
              </div>
              <div className="text-base font-bold text-white mt-1">
                {caseRecord.investigatingAgency}
              </div>
              <div className="text-xs text-slate-300 mt-0.5">
                Case Reference: <strong className="text-white">{caseRecord.caseNumber}</strong>
              </div>
            </div>

            <a
              href={`tel:${caseRecord.agencyPhone.replace(/[^0-9]/g, '')}`}
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-alert-600 hover:bg-alert-700 text-white font-semibold text-xs sm:text-sm transition-all shrink-0"
            >
              <PhoneCall className="w-4 h-4" />
              Call {caseRecord.agencyPhone}
            </a>
          </div>

          {/* National Database Badges (NamUs / NCMEC) */}
          {(caseRecord.namusId || caseRecord.ncmecId) && (
            <div className="flex flex-wrap items-center gap-3 pt-2 text-xs text-slate-500">
              <span className="font-semibold">National Case References:</span>
              {caseRecord.namusId && (
                <a
                  href={`https://www.namus.gov`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-teal-50 border border-teal-200 text-teal-800 font-medium hover:bg-teal-100 transition-colors"
                >
                  <span>NamUs #{caseRecord.namusId}</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              )}
              {caseRecord.ncmecId && (
                <a
                  href={`https://www.missingkids.org`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium transition-colors"
                >
                  <span>NCMEC #{caseRecord.ncmecId}</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </div>
          )}

          {/* Bottom Actions */}
          <div className="pt-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
            <button
              onClick={() => {
                onClose();
                onOpenTip(caseRecord);
              }}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-alert-600 hover:bg-alert-700 text-white text-sm font-semibold shadow-sm transition-all"
            >
              <PhoneCall className="w-4 h-4" />
              Submit Confidential Tip on this Case
            </button>

            <button
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
            >
              Close Window
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
