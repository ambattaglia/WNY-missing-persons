import type { FC } from 'react';
import { Search, Filter, X } from 'lucide-react';
import { WNY_COUNTIES } from '../data/casesData';

interface CaseFilterBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  selectedCounty: string;
  onCountyChange: (county: string) => void;
  totalMatches: number;
}

export const CaseFilterBar: FC<CaseFilterBarProps> = ({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  selectedCounty,
  onCountyChange,
  totalMatches,
}) => {
  const categories = ['All Cases', 'Missing Persons', 'Unidentified Persons'];

  const hasFilters = searchQuery !== '' || selectedCategory !== 'All Cases' || selectedCounty !== 'All Counties';

  const handleReset = () => {
    onSearchChange('');
    onCategoryChange('All Cases');
    onCountyChange('All Counties');
  };

  return (
    <div className="bg-white rounded-3xl p-5 sm:p-6 shadow-sm border border-slate-200 space-y-4 mb-8">
      <div className="flex flex-col md:flex-row md:items-center gap-4 justify-between">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search by name, city, case #, or identifying details..."
            className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/30 focus:border-sky-500 focus:bg-white transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* County Select Dropdown */}
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-slate-400 shrink-0 hidden sm:block" />
          <select
            value={selectedCounty}
            onChange={(e) => onCountyChange(e.target.value)}
            className="py-2.5 px-3.5 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-800 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-sky-500/30 focus:border-sky-500 cursor-pointer"
          >
            {WNY_COUNTIES.map((county) => (
              <option key={county} value={county}>
                {county}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Category Pills & Count */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-100">
        <div className="flex flex-wrap items-center gap-2">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => onCategoryChange(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  isSelected
                    ? 'bg-slate-900 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-3 text-xs text-slate-500">
          <span>Showing <strong>{totalMatches}</strong> case{totalMatches === 1 ? '' : 's'}</span>
          {hasFilters && (
            <button
              onClick={handleReset}
              className="text-sky-600 font-semibold hover:underline"
            >
              Reset Filters
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
