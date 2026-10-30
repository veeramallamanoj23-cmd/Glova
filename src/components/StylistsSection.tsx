import React from 'react';
import { Stylist } from '../types';
import { Star, Award, Calendar, ArrowRight, UserCheck } from 'lucide-react';

interface StylistsSectionProps {
  stylists: Stylist[];
  onBookStylist: (stylist: Stylist) => void;
}

export const StylistsSection: React.FC<StylistsSectionProps> = ({ stylists, onBookStylist }) => {
  return (
    <section id="stylists" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-300 text-xs font-semibold uppercase tracking-widest mb-4">
          <Award className="w-3.5 h-3.5 text-gold-400" />
          <span>Master Artistry Team</span>
        </div>
        <h2 className="font-serif text-3xl sm:text-5xl font-bold text-luxe-ivory mb-4">
          Meet Our <span className="gold-text-gradient italic font-normal">Creative Directors.</span>
        </h2>
        <p className="text-sm sm:text-base text-luxe-muted leading-relaxed">
          Internationally trained master colorists, precision barbers, and bridal aesthetic specialists dedicated to bringing out your best aesthetic.
        </p>
      </div>

      {/* Stylists Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stylists.map((stylist) => (
          <div
            key={stylist.id}
            className="group rounded-2xl overflow-hidden mobbin-card flex flex-col justify-between"
          >
            {/* Stylist Image */}
            <div className="relative h-64 w-full overflow-hidden bg-black/60">
              <img
                src={stylist.image}
                alt={stylist.name}
                className="w-full h-full object-cover object-top filter brightness-95 group-hover:scale-105 transition-transform duration-700"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-luxe-card via-black/20 to-transparent" />

              {/* Rating Pill */}
              <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-black/80 backdrop-blur-md border border-gold-500/30 text-xs font-bold text-gold-300 flex items-center gap-1.5 shadow-lg">
                <Star className="w-3.5 h-3.5 fill-gold-400 text-gold-400" />
                <span>{stylist.rating}</span>
                <span className="text-[10px] text-luxe-muted font-normal">({stylist.reviewsCount})</span>
              </div>

              {/* Experience Badge */}
              <div className="absolute bottom-4 left-4 px-3 py-1 rounded-md bg-black/80 backdrop-blur-md border border-white/10 text-[11px] text-luxe-ivory font-medium">
                {stylist.experience}
              </div>
            </div>

            {/* Stylist Content */}
            <div className="p-6 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="font-serif text-2xl font-bold text-luxe-ivory group-hover:text-gold-300 transition-colors">
                  {stylist.name}
                </h3>
                <span className="text-xs uppercase tracking-widest text-gold-400 font-semibold block mt-1 mb-2">
                  {stylist.title}
                </span>

                <div className="inline-block px-2.5 py-1 rounded bg-white/5 text-[11px] text-gold-200 border border-white/5 mb-4">
                  {stylist.specialization}
                </div>

                <p className="text-xs text-luxe-muted leading-relaxed line-clamp-3 mb-6">
                  {stylist.bio}
                </p>
              </div>

              {/* Book with Stylist Button */}
              <div className="pt-4 border-t border-white/5">
                <button
                  onClick={() => onBookStylist(stylist)}
                  className="w-full py-3 rounded-xl border border-gold-500/40 text-gold-300 hover:text-black hover:bg-gold-500 hover:border-gold-500 text-xs font-bold uppercase tracking-wider transition-all duration-200 flex items-center justify-center gap-2 group-hover:border-gold-400"
                >
                  <UserCheck className="w-4 h-4" />
                  <span>Book with {stylist.name.split(' ')[0]}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
