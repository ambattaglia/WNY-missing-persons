import type { FC } from 'react';
import { PhoneCall, Info } from 'lucide-react';

interface NavbarProps {
  onOpenGeneralTip: () => void;
  onOpenAbout: () => void;
}

export const Navbar: FC<NavbarProps> = ({ onOpenGeneralTip, onOpenAbout }) => {
  return (
    <header className="sticky top-0 z-40 bg-purple-950/95 backdrop-blur-md border-b border-purple-900 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex items-center justify-between gap-4">
        {/* Left: About Tab */}
        <div className="flex items-center gap-2">
          <button
            onClick={onOpenAbout}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-semibold text-purple-950 hover:text-purple-950 bg-purple-100 hover:bg-purple-200 border border-purple-200 hover:border-purple-300 transition-all shadow-sm active:scale-95"
            aria-label="About WNY Missing and Unidentified Persons"
          >
            <Info className="w-4 h-4 text-purple-700" />
            <span>About Our Group</span>
          </button>
        </div>

        {/* Right: Navigation & Actions */}
        <div className="flex items-center gap-4 sm:gap-5">
          <nav className="flex items-center gap-4 sm:gap-5 text-xs sm:text-sm font-medium text-purple-100">
            <a href="#cases" className="hover:text-white transition-colors">Cases</a>
            <a href="#resources" className="hover:text-white transition-colors">WNY Agencies</a>
          </nav>

          <button
            onClick={onOpenGeneralTip}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold text-white bg-purple-950 hover:bg-purple-900 shadow-sm transition-all hover:scale-[1.02]"
          >
            <PhoneCall className="w-4 h-4 text-amber-400" />
            <span>Submit a Tip</span>
          </button>
        </div>
      </div>
    </header>
  );
};
