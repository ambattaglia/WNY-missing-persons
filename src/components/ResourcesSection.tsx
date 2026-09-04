import type { FC } from 'react';
import { Phone, ExternalLink, Shield, Building2 } from 'lucide-react';

export const ResourcesSection: FC = () => {
  const agencies = [
    {
      name: "New York State Police - Troop A",
      area: "Western New York Regional Coverage",
      phone: "(585) 344-6200",
      type: "State Law Enforcement",
      website: "https://troopers.ny.gov"
    },
    {
      name: "Erie County Sheriff's Office",
      area: "Buffalo & Greater Erie County",
      phone: "(716) 858-2903",
      type: "County Sheriff",
      website: "https://www.erie.gov/sheriff"
    },
    {
      name: "Buffalo Police Department",
      area: "City of Buffalo - Detective Services",
      phone: "(716) 851-4444",
      type: "Municipal Police",
      website: "https://www.buffalony.gov/police"
    },
    {
      name: "Monroe County Sheriff's Office",
      area: "Rochester & Monroe County",
      phone: "(585) 753-4178",
      type: "County Sheriff",
      website: "https://www.monroecounty.gov/sheriff"
    },
    {
      name: "Niagara County Sheriff's Office",
      area: "Niagara Falls, Lockport & Countywide",
      phone: "(716) 438-3393",
      type: "County Sheriff",
      website: "https://www.niagarasheriff.com"
    },
    {
      name: "NamUs National System",
      area: "National Missing & Unidentified Persons System",
      phone: "1-855-626-7600",
      type: "National Resource",
      website: "https://www.namus.gov"
    }
  ];

  return (
    <section id="resources" className="py-16 bg-slate-100/60 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-slate-200 text-slate-800 mb-2">
            <Building2 className="w-3.5 h-3.5" />
            WNY Law Enforcement
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            Investigating Agencies & Resources
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            Direct contact information for local county sheriff offices and municipal detective bureaus across Western New York.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {agencies.map((agency) => (
            <div
              key={agency.name}
              className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:border-slate-300 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-sky-700 bg-sky-50 px-2 py-0.5 rounded-md">
                    {agency.type}
                  </span>
                  <Shield className="w-4 h-4 text-slate-400" />
                </div>
                <h3 className="text-base font-bold text-slate-900 mt-1">{agency.name}</h3>
                <p className="text-xs text-slate-500 mt-0.5">{agency.area}</p>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between">
                <a
                  href={`tel:${agency.phone.replace(/[^0-9]/g, '')}`}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-800 hover:text-alert-600 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-alert-600" />
                  {agency.phone}
                </a>

                <a
                  href={agency.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs text-slate-400 hover:text-slate-700 transition-colors"
                >
                  <span>Website</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
