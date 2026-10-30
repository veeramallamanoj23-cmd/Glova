import React, { useState, useMemo } from 'react';
import { Service } from '../types';
import { ServiceCard } from './ServiceCard';
import { EditorialServiceItem } from './EditorialServiceItem';
import { ScissorsDivider } from './ScissorsDivider';
import { 
  Scissors, Search, SlidersHorizontal, X, Sparkles, 
  ChevronDown, ChevronUp, HeartHandshake, Eye 
} from 'lucide-react';

interface ServicesSectionProps {
  services: Service[];
  onBookService: (service: Service) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ services, onBookService }) => {
  // Main Studio Mode: 'men' | 'women'
  const [activeStudio, setActiveStudio] = useState<'men' | 'women'>('men');
  const [activeSubcategory, setActiveSubcategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('recommended');
  const [viewMode, setViewMode] = useState<'editorial' | 'cards'>('editorial');
  const [showFullMenu, setShowFullMenu] = useState<boolean>(false);
  const [snipEffect, setSnipEffect] = useState<boolean>(false);

  // Trigger scissors animation when switching studio
  const handleSwitchStudio = (studio: 'men' | 'women') => {
    if (activeStudio === studio) return;
    setSnipEffect(true);
    setActiveStudio(studio);
    setActiveSubcategory('all');
    setTimeout(() => setSnipEffect(false), 600);
  };

  // Subcategory filters tailored by studio
  const subcategoryList = useMemo(() => {
    if (activeStudio === 'men') {
      return [
        { id: 'all', label: 'All Men’s' },
        { id: 'hair', label: 'Hair & Fades' },
        { id: 'beard', label: 'Beard & Shaves' },
        { id: 'skincare', label: 'Men’s Facials' },
        { id: 'packages', label: 'Grooming Bundles' },
      ];
    } else {
      return [
        { id: 'all', label: 'All Women’s' },
        { id: 'hair', label: 'Hair, Cuts & Color' },
        { id: 'skincare', label: 'Facials & Skincare' },
        { id: 'waxing', label: 'Waxing & Threading' },
        { id: 'nails', label: 'Nails & Pedicure' },
        { id: 'makeup', label: 'Bridal & Makeup' },
        { id: 'spa', label: 'Body Spa & Rituals' },
      ];
    }
  }, [activeStudio]);

  // Filtered Services for the active studio
  const currentStudioServices = useMemo(() => {
    return services.filter((srv) => {
      if (!srv.isAvailable) return false;
      if (srv.category !== activeStudio && srv.category !== 'unisex') return false;

      // Search filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = srv.name.toLowerCase().includes(query);
        const matchesDesc = srv.description.toLowerCase().includes(query);
        const matchesSubcat = srv.subcategory.toLowerCase().includes(query);
        if (!matchesName && !matchesDesc && !matchesSubcat) return false;
      }

      // Subcategory filter
      if (activeSubcategory !== 'all' && srv.subcategory !== activeSubcategory) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'duration') return a.durationMinutes - b.durationMinutes;
      if (a.popular && !b.popular) return -1;
      if (!a.popular && b.popular) return 1;
      return 0;
    });
  }, [services, activeStudio, activeSubcategory, searchQuery, sortBy]);

  // Curated Signature Highlights (top 3-4 popular services)
  const signatureHighlights = useMemo(() => {
    return currentStudioServices.filter(s => s.popular).slice(0, 4);
  }, [currentStudioServices]);

  // List of editorial services to show (compact & sweet)
  const displayedList = useMemo(() => {
    if (showFullMenu || searchQuery.trim() || activeSubcategory !== 'all') {
      return currentStudioServices;
    }
    // By default show first 8 services for clean brevity
    return currentStudioServices.slice(0, 8);
  }, [currentStudioServices, showFullMenu, searchQuery, activeSubcategory]);

  return (
    <section id="services-menu" className="py-20 mobbin-bg border-t border-gold-500/15 relative overflow-hidden">
      {/* Background Subtle Ambient Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gold-500/5 blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header: Short & Sweet */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-gold-500/10 border border-gold-500/25 text-gold-300 text-xs font-semibold uppercase tracking-widest mb-3">
            <Scissors className="w-3.5 h-3.5 text-gold-400" />
            <span>Curated Service Menu</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-luxe-ivory mb-3">
            Pure Elegance. <span className="gold-text-gradient italic font-normal">Bespoke Precision.</span>
          </h2>
          <p className="text-xs sm:text-sm text-luxe-muted leading-relaxed">
            Select your salon atelier below to discover structured haircuts, custom hair color chemistry, and restorative therapies.
          </p>
        </div>

        {/* Clean Studio Switcher (Mobbin UI Pattern) with Scissors Transition */}
        <div className="flex flex-col items-center justify-center mb-8">
          <div className="inline-flex p-1.5 rounded-2xl bg-[#111116] border border-gold-500/30 shadow-2xl relative">
            <button
              onClick={() => handleSwitchStudio('men')}
              className={`px-6 sm:px-8 py-3 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-300 flex items-center gap-2.5 relative z-10 ${
                activeStudio === 'men'
                  ? 'bg-gold-500 text-black shadow-gold-glow'
                  : 'text-luxe-muted hover:text-white'
              }`}
            >
              <Scissors className={`w-4 h-4 ${activeStudio === 'men' ? 'text-black' : 'text-gold-400'} ${snipEffect && activeStudio === 'men' ? 'animate-bounce' : ''}`} />
              <span>Gentlemen's Atelier</span>
            </button>

            <button
              onClick={() => handleSwitchStudio('women')}
              className={`px-6 sm:px-8 py-3 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-300 flex items-center gap-2.5 relative z-10 ${
                activeStudio === 'women'
                  ? 'bg-gold-500 text-black shadow-gold-glow'
                  : 'text-luxe-muted hover:text-white'
              }`}
            >
              <Scissors className={`w-4 h-4 ${activeStudio === 'women' ? 'text-black' : 'text-gold-400'} ${snipEffect && activeStudio === 'women' ? 'animate-bounce' : ''}`} />
              <span>Ladies' Parlour & Spa</span>
            </button>
          </div>
        </div>

        {/* Interactive Scissors Divider Line */}
        <ScissorsDivider 
          label={activeStudio === 'men' ? "Gentlemen's Precision Cuts & Barbering" : "Ladies' Couture Color, Skin & Spa"} 
          onSnip={() => handleSwitchStudio(activeStudio === 'men' ? 'women' : 'men')}
        />

        {/* Search & Subcategory Controls Strip */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
          {/* Subcategory Pills */}
          <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-1 no-scrollbar">
            {subcategoryList.map((sub) => (
              <button
                key={sub.id}
                onClick={() => setActiveSubcategory(sub.id)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                  activeSubcategory === sub.id
                    ? 'bg-gold-500/20 text-gold-300 border border-gold-400/80 shadow-sm'
                    : 'bg-[#131319] text-luxe-muted hover:text-white border border-white/5'
                }`}
              >
                {sub.label}
              </button>
            ))}
          </div>

          {/* Quick Search Input & View Toggle */}
          <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
            <div className="relative flex-1 sm:w-60">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gold-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search treatments..."
                className="w-full pl-9 pr-8 py-2 rounded-xl bg-black/60 border border-gold-500/20 text-white text-xs placeholder-luxe-muted focus:outline-none focus:border-gold-400"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-luxe-muted hover:text-white"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Layout Toggle */}
            <div className="flex items-center bg-black/40 border border-gold-500/20 rounded-xl p-1 shrink-0">
              <button
                onClick={() => setViewMode('editorial')}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold ${
                  viewMode === 'editorial' ? 'bg-gold-500 text-black' : 'text-luxe-muted hover:text-white'
                }`}
                title="Clean List View"
              >
                Menu
              </button>
              <button
                onClick={() => setViewMode('cards')}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold ${
                  viewMode === 'cards' ? 'bg-gold-500 text-black' : 'text-luxe-muted hover:text-white'
                }`}
                title="Visual Card View"
              >
                Cards
              </button>
            </div>
          </div>
        </div>

        {/* SECTION 1: SIGNATURE HIGHLIGHTS (Curated, Short & Sweet) */}
        {!searchQuery && activeSubcategory === 'all' && signatureHighlights.length > 0 && (
          <div className="mb-12">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-serif text-lg font-bold text-luxe-ivory flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-gold-400" />
                <span>Featured Signature Treatments</span>
              </h3>
              <span className="text-[11px] text-gold-400 uppercase tracking-widest font-semibold">
                Client Favorites
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {signatureHighlights.map((service) => (
                <ServiceCard key={service.id} service={service} onBook={onBookService} />
              ))}
            </div>
          </div>
        )}

        {/* SECTION 2: EDITORIAL PRICING MENU (Mobbin Clean Luxury List) */}
        <div>
          <div className="flex items-center justify-between mb-4 border-b border-gold-500/15 pb-2">
            <h3 className="font-serif text-base font-bold text-luxe-ivory flex items-center gap-2">
              <Scissors className="w-4 h-4 text-gold-400" />
              <span>
                {activeStudio === 'men' ? "Gentlemen's Services Roster" : "Ladies' Treatment Roster"}
                <span className="text-xs text-luxe-muted font-normal ml-2">
                  ({currentStudioServices.length} items)
                </span>
              </span>
            </h3>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-1.5 text-xs text-luxe-muted">
              <span>Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-transparent text-gold-300 font-semibold focus:outline-none cursor-pointer"
              >
                <option value="recommended" className="bg-luxe-dark text-white">Recommended</option>
                <option value="price-low" className="bg-luxe-dark text-white">Price: Low to High</option>
                <option value="price-high" className="bg-luxe-dark text-white">Price: High to Low</option>
                <option value="duration" className="bg-luxe-dark text-white">Duration</option>
              </select>
            </div>
          </div>

          {currentStudioServices.length === 0 ? (
            <div className="text-center py-12 mobbin-card rounded-2xl">
              <p className="text-xs text-luxe-muted mb-3">No services found matching your search.</p>
              <button
                onClick={() => { setSearchQuery(''); setActiveSubcategory('all'); }}
                className="gold-glow-btn px-4 py-2 rounded-full text-xs font-bold uppercase"
              >
                Reset Search
              </button>
            </div>
          ) : viewMode === 'editorial' ? (
            /* Clean 2-Column Editorial Rows */
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {displayedList.map((service) => (
                <EditorialServiceItem key={service.id} service={service} onBook={onBookService} />
              ))}
            </div>
          ) : (
            /* Cards View */
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {displayedList.map((service) => (
                <ServiceCard key={service.id} service={service} onBook={onBookService} />
              ))}
            </div>
          )}

          {/* Expand / Collapse Toggle for Short & Sweet Experience */}
          {!searchQuery && activeSubcategory === 'all' && currentStudioServices.length > 8 && (
            <div className="mt-8 text-center">
              <button
                onClick={() => setShowFullMenu(!showFullMenu)}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-gold-500/30 text-gold-300 hover:text-white hover:border-gold-400 bg-black/40 text-xs font-bold uppercase tracking-wider transition-all"
              >
                {showFullMenu ? (
                  <>
                    <span>Show Curated Highlights</span>
                    <ChevronUp className="w-4 h-4" />
                  </>
                ) : (
                  <>
                    <span>View All {currentStudioServices.length} Treatments</span>
                    <ChevronDown className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          )}
        </div>

        {/* Clean Consultation Card (Mobbin Banner) */}
        <div className="mt-14 p-6 rounded-2xl mobbin-card flex flex-col sm:flex-row items-center justify-between gap-4 border border-gold-500/25">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-full bg-gold-500/10 border border-gold-400 flex items-center justify-center shrink-0 text-gold-400">
              <HeartHandshake className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-serif text-sm sm:text-base font-bold text-luxe-ivory">
                Undecided on Hair Color, Keratin, or Bridal Styling?
              </h4>
              <p className="text-xs text-luxe-muted">
                Our Creative Directors provide a complimentary 15-minute diagnostic consultation with zero obligation.
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              const consultationService = services.find(s => s.requiresConsultation) || services[0];
              onBookService(consultationService);
            }}
            className="gold-glow-btn px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider shrink-0"
          >
            Book Free Diagnostic
          </button>
        </div>

      </div>
    </section>
  );
};
