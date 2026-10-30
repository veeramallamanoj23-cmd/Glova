import React, { useState } from 'react';
import { PackageItem, Service } from '../types';
import { Check, Sparkles, Crown, ArrowRight, ShieldCheck, Zap } from 'lucide-react';
import { ScissorsDivider } from './ScissorsDivider';

interface PackagesSectionProps {
  packages: PackageItem[];
  onBookPackage: (pkg: PackageItem) => void;
}

export const PackagesSection: React.FC<PackagesSectionProps> = ({ packages, onBookPackage }) => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'men' | 'women' | 'couple' | 'monthly'>('all');

  const filteredPackages = packages.filter((pkg) => {
    if (selectedFilter === 'all') return true;
    return pkg.category === selectedFilter;
  });

  return (
    <section id="packages" className="py-20 mobbin-bg border-y border-gold-500/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-300 text-xs font-semibold uppercase tracking-widest mb-4">
            <Crown className="w-3.5 h-3.5 text-gold-400" />
            <span>Curated Packages & VIP Privilege</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-luxe-ivory mb-4">
            Luxury Bundles & <span className="gold-text-gradient italic font-normal">Privilege Passes.</span>
          </h2>
          <p className="text-sm sm:text-base text-luxe-muted leading-relaxed">
            Thoughtfully packaged rituals providing extraordinary value, priority scheduling, and complimentary treats.
          </p>

          <ScissorsDivider label="Tailored Package Savings" />

          {/* Category Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-4">
            {[
              { id: 'all', label: 'All Packages' },
              { id: 'men', label: "Men's Reserve" },
              { id: 'women', label: "Women's Royale" },
              { id: 'couple', label: 'Couple Retreat' },
              { id: 'monthly', label: 'VIP Memberships' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedFilter(tab.id as any)}
                className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-200 ${
                  selectedFilter === tab.id
                    ? 'bg-gold-500 text-black shadow-gold-glow'
                    : 'bg-black/50 text-luxe-muted hover:text-white border border-white/5'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Packages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPackages.map((pkg) => (
            <div
              key={pkg.id}
              className={`relative rounded-3xl overflow-hidden bg-luxe-card/90 border transition-all duration-300 flex flex-col justify-between hover:-translate-y-2 hover:shadow-gold-glow-lg ${
                pkg.popular
                  ? 'border-gold-500 shadow-gold-glow'
                  : 'border-gold-500/20'
              }`}
            >
              {/* Badge */}
              {pkg.tag && (
                <div className="absolute top-4 right-4 z-10 px-3 py-1 rounded-full bg-gold-500 text-black text-[10px] font-bold uppercase tracking-widest flex items-center gap-1 shadow-lg">
                  <Sparkles className="w-3 h-3" />
                  <span>{pkg.tag}</span>
                </div>
              )}

              {/* Package Image Header */}
              <div className="relative h-48 w-full overflow-hidden bg-black/60">
                <img
                  src={pkg.image}
                  alt={pkg.name}
                  className="w-full h-full object-cover object-center filter brightness-90 transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-luxe-card via-black/30 to-transparent" />
                <div className="absolute bottom-3 left-4 text-xs font-semibold text-gold-300">
                  Estimated: {pkg.duration}
                </div>
              </div>

              {/* Package Content */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-serif text-xl font-bold text-luxe-ivory mb-2">
                    {pkg.name}
                  </h3>
                  <p className="text-xs text-luxe-muted leading-relaxed mb-6">
                    {pkg.description}
                  </p>

                  {/* Inclusions Checklist */}
                  <div className="space-y-2.5 mb-8">
                    <span className="text-[10px] uppercase tracking-widest text-gold-400 font-bold block mb-2">
                      Package Inclusions:
                    </span>
                    {pkg.inclusions.map((inc, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-xs text-luxe-ivory/90">
                        <div className="w-4 h-4 rounded-full bg-gold-500/20 border border-gold-400/50 flex items-center justify-center shrink-0 mt-0.5">
                          <Check className="w-2.5 h-2.5 text-gold-400" />
                        </div>
                        <span>{inc}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Pricing & Booking CTA */}
                <div className="pt-6 border-t border-gold-500/15">
                  <div className="flex items-baseline justify-between mb-4">
                    <div>
                      <span className="text-xs text-luxe-muted line-through block">
                        ₹{pkg.originalPrice.toLocaleString('en-IN')}
                      </span>
                      <div className="flex items-baseline gap-1">
                        <span className="font-serif text-3xl font-extrabold text-gold-400">
                          ₹{pkg.discountedPrice.toLocaleString('en-IN')}
                        </span>
                        <span className="text-[10px] text-luxe-muted uppercase tracking-wider">
                          / bundle
                        </span>
                      </div>
                    </div>

                    <span className="text-xs font-bold text-green-400 px-2 py-0.5 rounded bg-green-500/10 border border-green-500/20">
                      Save ₹{(pkg.originalPrice - pkg.discountedPrice).toLocaleString('en-IN')}
                    </span>
                  </div>

                  <button
                    onClick={() => onBookPackage(pkg)}
                    className="gold-glow-btn w-full py-3.5 rounded-xl text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2"
                  >
                    <span>Reserve Package</span>
                    <ArrowRight className="w-4 h-4 text-black" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Membership Perks Matrix (Mobbin / Barfly inspiration) */}
        <div className="mt-16 bg-black/50 border border-gold-500/20 rounded-3xl p-8 max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-full bg-gold-500/10 border border-gold-400/40 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5 text-gold-400" />
              </div>
              <div>
                <h4 className="font-serif text-sm font-bold text-luxe-ivory">Zero Blackout Dates</h4>
                <p className="text-xs text-luxe-muted mt-1">Book prime Friday & weekend slots with zero surge fees.</p>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-full bg-gold-500/10 border border-gold-400/40 flex items-center justify-center shrink-0">
                <Zap className="w-5 h-5 text-gold-400" />
              </div>
              <div>
                <h4 className="font-serif text-sm font-bold text-luxe-ivory">Express Concierge Line</h4>
                <p className="text-xs text-luxe-muted mt-1">Direct priority WhatsApp concierge for schedule modifications.</p>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-full bg-gold-500/10 border border-gold-400/40 flex items-center justify-center shrink-0">
                <Sparkles className="w-5 h-5 text-gold-400" />
              </div>
              <div>
                <h4 className="font-serif text-sm font-bold text-luxe-ivory">Complimentary Add-ons</h4>
                <p className="text-xs text-luxe-muted mt-1">Free scalp massage and premium Italian coffee on every visit.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
