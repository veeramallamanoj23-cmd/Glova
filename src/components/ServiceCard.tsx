import React from 'react';
import { Clock, AlertCircle, Sparkles, ArrowRight } from 'lucide-react';
import { Service } from '../types';

interface ServiceCardProps {
  service: Service;
  onBook: (service: Service) => void;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({ service, onBook }) => {
  return (
    <div className="group relative mobbin-card rounded-2xl overflow-hidden flex flex-col justify-between">
      {/* Card Top Image & Badges */}
      <div className="relative h-40 w-full overflow-hidden bg-black/60">
        <img
          src={service.image}
          alt={service.name}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 filter brightness-90 group-hover:brightness-100"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#121218] via-black/20 to-transparent" />

        {/* Popular Tag */}
        {service.popular && (
          <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-full bg-gold-500 text-black text-[9px] font-bold uppercase tracking-widest flex items-center gap-1 shadow-md">
            <Sparkles className="w-2.5 h-2.5" />
            <span>Popular</span>
          </div>
        )}

        {/* Category Badge */}
        <div className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-full bg-black/70 backdrop-blur-md border border-white/10 text-[9px] uppercase tracking-wider text-luxe-ivory font-medium">
          {service.category === 'men' ? "Men's" : service.category === 'women' ? "Women's" : 'Unisex'}
        </div>

        {/* Duration Chip on Image bottom */}
        <div className="absolute bottom-2.5 left-2.5 inline-flex items-center gap-1 px-2 py-0.5 rounded bg-black/80 backdrop-blur-md text-[10px] text-gold-300 border border-gold-500/20">
          <Clock className="w-3 h-3 text-gold-400" />
          <span>{service.duration}</span>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="font-serif text-sm font-bold text-luxe-ivory group-hover:text-gold-300 transition-colors leading-snug line-clamp-1 mb-1">
            {service.name}
          </h3>

          <p className="text-[11px] text-luxe-muted leading-relaxed line-clamp-2 mb-3 font-light">
            {service.description}
          </p>

          {/* Consultation Advisory Note */}
          {service.requiresConsultation && (
            <div className="mb-3 flex items-center gap-1 p-1.5 rounded-lg bg-gold-500/10 border border-gold-500/20 text-[10px] text-gold-300">
              <AlertCircle className="w-3 h-3 text-gold-400 shrink-0" />
              <span>Consultation included</span>
            </div>
          )}
        </div>

        {/* Price & Action Row */}
        <div className="pt-3 border-t border-white/5 flex items-center justify-between">
          <div>
            <span className="text-[9px] uppercase tracking-widest text-luxe-muted block">From</span>
            <span className="font-serif text-base font-bold text-gold-400">
              ₹{service.price.toLocaleString('en-IN')}
            </span>
          </div>

          <button
            onClick={() => onBook(service)}
            className="px-3.5 py-1.5 rounded-full border border-gold-500/40 text-gold-300 hover:text-black hover:bg-gold-500 hover:border-gold-500 text-[11px] font-bold uppercase tracking-wider transition-all duration-200 flex items-center gap-1 active:scale-95"
          >
            <span>Book</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  );
};
