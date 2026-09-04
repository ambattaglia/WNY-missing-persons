import type { FC } from 'react';
import { MapPin } from 'lucide-react';

export const EmergencyBanner: FC = () => {
  return (
    <section className="bg-purple-100 border-b border-purple-200 py-4 sm:py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Modern Logo Banner */}
        <div className="relative w-full max-w-6xl rounded-3xl overflow-hidden border border-purple-500/25 bg-gradient-to-r from-purple-950 via-slate-900 to-teal-950 shadow-[0_12px_28px_rgba(76,29,149,0.32)] group">
          <img
            src="/logo.jpg"
            alt="WNY Missing & Unidentified Persons"
            className="relative -left-px block h-auto w-[calc(100%+2px)] max-w-none drop-shadow-[0_6px_10px_rgba(30,27,75,0.28)] transition-transform duration-700 group-hover:scale-[1.01]"
          />
        </div>

        {/* Region & Advocacy Information Strip */}
        <div className="mt-5 flex justify-center text-xs">
          <div className="inline-flex items-center justify-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-purple-300 font-medium w-fit text-center shadow-sm">
            <MapPin className="w-3.5 h-3.5 text-purple-400 shrink-0" />
            <span className="text-sm">Serving Erie, Niagara, Monroe, Chautauqua, Cattaraugus, Allegany, Genesee, Orleans & Wyoming</span>
          </div>
        </div>
      </div>
    </section>
  );
};
