import type { FC } from 'react';
import { Calendar, MapPin, AlertCircle, Eye, PhoneCall, ShieldCheck } from 'lucide-react';
import type { CaseRecord } from '../data/casesData';

interface CaseCardProps {
  caseRecord: CaseRecord;
  onSelectCase: (caseRecord: CaseRecord) => void;
  onOpenTip: (caseRecord: CaseRecord) => void;
}

export const CaseCard: FC<CaseCardProps> = ({
  caseRecord,
  onSelectCase,
  onOpenTip,
}) => {
  const isMissing = caseRecord.type === 'Missing Person';

  return (
    <div className="bg-white rounded-3xl overflow-hidden border border-slate-200/90 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between group">
      <div>
        {/* Card Image Header */}
        <div className="relative h-60 w-full overflow-hidden bg-slate-100">
          <img
            src={caseRecord.photoUrl}
            alt={caseRecord.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />

          {/* Type & Urgent Badges */}
          <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between">
            <span
              className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-white shadow-sm backdrop-blur-md ${
                isMissing ? 'bg-alert-600/90' : 'bg-indigo-600/90'
              }`}
            >
              {caseRecord.type}
            </span>

            {caseRecord.isUrgent && (
              <span className="flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-amber-500 text-slate-950 shadow-sm">
                <AlertCircle className="w-3.5 h-3.5" />
                Urgent
              </span>
            )}
          </div>

          {/* Name & Date on image bottom */}
          <div className="absolute bottom-3.5 left-3.5 right-3.5 text-white">
            <h3 className="text-xl font-bold leading-snug drop-shadow-sm">
              {caseRecord.name}
            </h3>
            <div className="flex items-center gap-2 text-xs text-slate-200 mt-1">
              <span className="flex items-center gap-1">
                <Calendar className="w-3 h-3 text-sky-400" />
                {isMissing ? 'Missing Since:' : 'Found:'} {caseRecord.incidentDate}
              </span>
            </div>
          </div>
        </div>

        {/* Card Body */}
        <div className="p-5 space-y-3.5 text-sm">
          {/* Location pill */}
          <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 bg-slate-100 px-3 py-1.5 rounded-xl w-fit">
            <MapPin className="w-3.5 h-3.5 text-sky-600" />
            <span>{caseRecord.city}, {caseRecord.county}</span>
          </div>

          {/* Vitals Grid */}
          <div className="grid grid-cols-2 gap-2 text-xs bg-slate-50 p-3 rounded-xl border border-slate-100">
            <div>
              <span className="text-slate-400 block font-medium">Age at Incident</span>
              <span className="font-semibold text-slate-800">{caseRecord.ageAtIncident} years old</span>
            </div>
            {caseRecord.currentAge && (
              <div>
                <span className="text-slate-400 block font-medium">Current Age</span>
                <span className="font-semibold text-slate-800">{caseRecord.currentAge} years old</span>
              </div>
            )}
            {caseRecord.height && (
              <div>
                <span className="text-slate-400 block font-medium">Height / Weight</span>
                <span className="font-semibold text-slate-800">{caseRecord.height} / {caseRecord.weight || 'N/A'}</span>
              </div>
            )}
            <div>
              <span className="text-slate-400 block font-medium">Case Number</span>
              <span className="font-semibold text-slate-800">{caseRecord.caseNumber}</span>
            </div>
            {caseRecord.namusId && (
              <div>
                <span className="text-slate-400 block font-medium">NamUs ID</span>
                <span className="font-semibold text-teal-800">#{caseRecord.namusId}</span>
              </div>
            )}
          </div>

          {/* Summary snippet */}
          <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
            {caseRecord.summary}
          </p>

          {/* Investigating Agency */}
          <div className="text-[11px] text-slate-500 pt-1 border-t border-slate-100 flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="truncate">{caseRecord.investigatingAgency}</span>
          </div>
        </div>
      </div>

      {/* Action Footer */}
      <div className="p-4 pt-0 flex items-center gap-2">
        <button
          onClick={() => onSelectCase(caseRecord)}
          className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-800 transition-colors"
        >
          <Eye className="w-3.5 h-3.5 text-slate-600" />
          Full Case Details
        </button>

        <button
          onClick={() => onOpenTip(caseRecord)}
          className="inline-flex items-center justify-center gap-1.5 py-2 px-3.5 rounded-xl text-xs font-semibold bg-alert-600 hover:bg-alert-700 text-white transition-colors shadow-sm"
        >
          <PhoneCall className="w-3.5 h-3.5" />
          Submit Tip
        </button>
      </div>
    </div>
  );
};
