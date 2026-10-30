import React from 'react';
import { Search, SlidersHorizontal, X, ArrowDownAZ, ArrowUpNarrowWide, ArrowDownWideNarrow } from 'lucide-react';

interface ServiceSearchFilterProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedCategory: string; // 'all' | 'men' | 'women' | 'unisex'
  onCategoryChange: (cat: string) => void;
  selectedSubcategory: string; // 'all' | 'hair' | 'beard' | 'skincare' | 'waxing' | 'nails' | 'makeup' | 'spa' | 'packages'
  onSubcategoryChange: (subcat: string) => void;
  sortBy: string; // 'recommended' | 'price-low' | 'price-high' | 'duration'
  onSortChange: (sort: string) => void;
  totalResults: number;
  onResetFilters: () => void;
}

export const ServiceSearchFilter: React.FC<ServiceSearchFilterProps> = ({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  selectedSubcategory,
  onSubcategoryChange,
  sortBy,
  onSortChange,
  totalResults,
  onResetFilters
}) => {
  const categoryTabs = [
    { id: 'all', label: 'All Services' },
    { id: 'men', label: "Men's Studio" },
    { id: 'women', label: "Women's Studio" },
  ];

  const subcategoryPills = [
    { id: 'all', label: 'All Treatments' },
    { id: 'hair', label: 'Hair & Styling' },
    { id: 'beard', label: 'Beard & Grooming' },
    { id: 'skincare', label: 'Facials & Skincare' },
    { id: 'waxing', label: 'Waxing & Threading' },
    { id: 'nails', label: 'Nails & Pedicure' },
    { id: 'makeup', label: 'Makeup & Bridal' },
    { id: 'spa', label: 'Body Spa & Massage' },
    { id: 'packages', label: 'Grooming Packages' },
  ];

  const hasActiveFilters = searchQuery !== '' || selectedCategory !== 'all' || selectedSubcategory !== 'all';

  return (
    <div className="bg-luxe-dark/80 backdrop-blur-xl border border-gold-500/15 rounded-2xl p-4 sm:p-6 mb-12 shadow-2xl">
      {/* Top Search Bar & Sort Dropdown */}
      <div className="flex flex-col md:flex-row items-center gap-4 mb-6">
        {/* Search Input */}
        <div className="relative flex-1 w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gold-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search by service name (e.g., Balayage, Fade, Keratin, Bridal Facial, Beard Sculpt)..."
            className="w-full pl-11 pr-10 py-3 rounded-xl bg-black/60 border border-gold-500/25 text-luxe-ivory placeholder-luxe-muted text-sm focus:outline-none focus:border-gold-400 focus:ring-1 focus:ring-gold-400 transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-luxe-muted hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Sort Select */}
        <div className="w-full md:w-auto flex items-center justify-between md:justify-end gap-3">
          <div className="flex items-center gap-2 bg-black/60 border border-gold-500/25 rounded-xl px-3 py-2 text-xs text-luxe-ivory">
            <SlidersHorizontal className="w-3.5 h-3.5 text-gold-400" />
            <span className="text-luxe-muted hidden sm:inline">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value)}
              className="bg-transparent text-xs text-gold-300 font-semibold focus:outline-none cursor-pointer"
            >
              <option value="recommended" className="bg-luxe-dark text-white">Recommended</option>
              <option value="price-low" className="bg-luxe-dark text-white">Price: Low to High</option>
              <option value="price-high" className="bg-luxe-dark text-white">Price: High to Low</option>
              <option value="duration" className="bg-luxe-dark text-white">Duration</option>
            </select>
          </div>

          {hasActiveFilters && (
            <button
              onClick={onResetFilters}
              className="text-xs text-gold-400 hover:text-gold-200 underline font-medium whitespace-nowrap"
            >
              Reset Filters
            </button>
          )}
        </div>
      </div>

      {/* Primary Category Switcher (All vs Men vs Women) */}
      <div className="flex items-center gap-2 border-b border-gold-500/15 pb-4 mb-4 overflow-x-auto no-scrollbar">
        {categoryTabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onCategoryChange(tab.id)}
            className={`px-5 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all duration-200 whitespace-nowrap ${
              selectedCategory === tab.id
                ? 'bg-gold-500 text-black shadow-gold-glow'
                : 'bg-black/40 text-luxe-muted hover:text-luxe-ivory hover:bg-gold-500/10 border border-white/5'
            }`}
          >
            {tab.label}
          </button>
        ))}
        <span className="ml-auto text-xs text-luxe-muted font-mono hidden md:inline">
          Showing {totalResults} treatments
        </span>
      </div>

      {/* Subcategory Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
        {subcategoryPills.map((sub) => (
          <button
            key={sub.id}
            onClick={() => onSubcategoryChange(sub.id)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all whitespace-nowrap ${
              selectedSubcategory === sub.id
                ? 'bg-gold-500/20 text-gold-300 border border-gold-400'
                : 'bg-black/30 text-luxe-muted hover:text-white border border-white/5 hover:border-gold-500/20'
            }`}
          >
            {sub.label}
          </button>
        ))}
      </div>
    </div>
  );
};
