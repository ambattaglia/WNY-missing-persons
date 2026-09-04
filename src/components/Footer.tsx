import type { FC } from 'react';
import { ShieldAlert, Mail, Phone } from 'lucide-react';

interface FooterProps {
  onOpenAbout?: () => void;
}

export const Footer: FC<FooterProps> = ({ onOpenAbout }) => {
  return (
    <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
          <div className="flex items-start gap-3 max-w-md">
            <div className="w-9 h-9 rounded-xl bg-slate-800 flex items-center justify-center text-amber-400 shrink-0 mt-0.5">
              <ShieldAlert className="w-4 h-4" />
            </div>
            <div>
              <p className="font-bold text-white text-base">WNY Missing and Unidentified Persons</p>
              <p className="text-slate-400 text-sm mt-0.5">
                Founded by <span className="text-purple-300 font-semibold">Merry Williams-Diers</span>
              </p>
              <p className="text-slate-500 text-xs mt-1">
                Grassroots advocacy raising awareness for missing and unidentified individuals across Western New York.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 text-sm">
            <div className="flex flex-col gap-1.5 text-slate-300">
              <a
                href="mailto:wnymissingandunidentified@yahoo.com"
                className="inline-flex items-center gap-2 hover:text-white transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-purple-400" />
                <span>wnymissingandunidentified@yahoo.com</span>
              </a>
              <a
                href="tel:7164012080"
                className="inline-flex items-center gap-2 hover:text-white transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-teal-400" />
                <span>(716) 401-2080</span>
              </a>
            </div>

            <div className="flex flex-wrap items-center gap-4 pt-2 sm:pt-0 border-t sm:border-t-0 sm:border-l border-slate-800 sm:pl-6 text-sm">
              {onOpenAbout && (
                <button
                  onClick={onOpenAbout}
                  className="hover:text-white transition-colors text-slate-400 cursor-pointer"
                >
                  About
                </button>
              )}
              <a href="#cases" className="hover:text-white transition-colors">Cases</a>
              <a href="#resources" className="hover:text-white transition-colors">WNY Agencies</a>
              <a
                href="https://www.namus.gov"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors text-teal-400/90 hover:text-teal-300 inline-flex items-center gap-1"
              >
                <span>NamUs.gov</span>
              </a>
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} WNY Missing and Unidentified Persons • Merry Williams-Diers, Founder.</p>
          <p className="text-purple-300">Western New York Community Advocacy</p>
        </div>
      </div>
    </footer>
  );
};
