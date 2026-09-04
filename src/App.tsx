import { useState, useMemo } from 'react';
import { casesData } from './data/casesData';
import type { CaseRecord } from './data/casesData';
import { Navbar } from './components/Navbar';
import { EmergencyBanner } from './components/EmergencyBanner';
import { CaseFilterBar } from './components/CaseFilterBar';
import { CaseCard } from './components/CaseCard';
import { CaseDetailModal } from './components/CaseDetailModal';
import { SubmitTipModal } from './components/SubmitTipModal';
import { AboutModal } from './components/AboutModal';
import { ResourcesSection } from './components/ResourcesSection';
import { Footer } from './components/Footer';
import { HelpCircle } from 'lucide-react';

export function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Cases');
  const [selectedCounty, setSelectedCounty] = useState('All Counties');

  const [selectedCaseForModal, setSelectedCaseForModal] = useState<CaseRecord | null>(null);
  const [tipModalOpen, setTipModalOpen] = useState(false);
  const [tipCaseRecord, setTipCaseRecord] = useState<CaseRecord | null>(null);
  const [aboutModalOpen, setAboutModalOpen] = useState(false);

  const filteredCases = useMemo(() => {
    return casesData.filter((item) => {
      // Category filter
      if (selectedCategory === 'Missing Persons' && item.type !== 'Missing Person') return false;
      if (selectedCategory === 'Unidentified Persons' && item.type !== 'Unidentified Person') return false;

      // County filter
      if (selectedCounty !== 'All Counties' && item.county !== selectedCounty) return false;

      // Search query filter
      const query = searchQuery.toLowerCase().trim();
      if (!query) return true;

      return (
        item.name.toLowerCase().includes(query) ||
        item.city.toLowerCase().includes(query) ||
        item.county.toLowerCase().includes(query) ||
        item.caseNumber.toLowerCase().includes(query) ||
        item.summary.toLowerCase().includes(query) ||
        item.identifyingFeatures.some((feat) => feat.toLowerCase().includes(query)) ||
        (item.namusId && item.namusId.toLowerCase().includes(query))
      );
    });
  }, [searchQuery, selectedCategory, selectedCounty]);

  const handleOpenTip = (record: CaseRecord) => {
    setTipCaseRecord(record);
    setTipModalOpen(true);
  };

  const handleOpenGeneralTip = () => {
    setTipCaseRecord(null);
    setTipModalOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-purple-100 text-slate-900 selection:bg-sky-500/20 selection:text-sky-800">
      <Navbar 
        onOpenGeneralTip={handleOpenGeneralTip} 
        onOpenAbout={() => setAboutModalOpen(true)} 
      />
      <EmergencyBanner />

      <main id="cases" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex-1 w-full">
        <CaseFilterBar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          selectedCounty={selectedCounty}
          onCountyChange={setSelectedCounty}
          totalMatches={filteredCases.length}
        />

        {/* Case Cards Grid */}
        {casesData.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-slate-200 p-8 space-y-2">
            <h3 className="text-base font-semibold text-slate-700">No cases currently listed</h3>
            <p className="text-slate-400 text-xs max-w-sm mx-auto">
              Check back for weekly case updates across Western New York.
            </p>
          </div>
        ) : filteredCases.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-slate-300 p-8 space-y-4">
            <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 mx-auto flex items-center justify-center">
              <HelpCircle className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-800">No matching cases found</h3>
            <p className="text-slate-500 text-sm max-w-md mx-auto">
              We couldn't find any cases matching your current filters. Try changing or clearing your search criteria.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All Cases');
                setSelectedCounty('All Counties');
              }}
              className="px-5 py-2 rounded-xl bg-slate-900 text-white font-medium text-xs hover:bg-slate-800 transition-colors"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {filteredCases.map((caseRecord) => (
              <CaseCard
                key={caseRecord.id}
                caseRecord={caseRecord}
                onSelectCase={(record) => setSelectedCaseForModal(record)}
                onOpenTip={handleOpenTip}
              />
            ))}
          </div>
        )}
      </main>

      <ResourcesSection />
      <Footer onOpenAbout={() => setAboutModalOpen(true)} />

      {/* Modals */}
      <CaseDetailModal
        caseRecord={selectedCaseForModal}
        onClose={() => setSelectedCaseForModal(null)}
        onOpenTip={handleOpenTip}
      />

      <SubmitTipModal
        isOpen={tipModalOpen}
        onClose={() => setTipModalOpen(false)}
        caseRecord={tipCaseRecord}
      />

      <AboutModal
        isOpen={aboutModalOpen}
        onClose={() => setAboutModalOpen(false)}
      />
    </div>
  );
}

export default App;
