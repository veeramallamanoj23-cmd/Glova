import React from 'react';
import { Clock, AlertCircle, ArrowRight, Sparkles } from 'lucide-react';
import { Service } from '../types';

interface EditorialServiceItemProps {
  service: Service;
  onBook: (service: Service) => void;
}

export const EditorialServiceItem: React.FC<EditorialServiceItemProps> = ({ service, onBook }) => {
  return (
    <div className="group relative flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl mobbin-card hover:border-gold-500/40 transition-all duration-200 gap-3">
      {/* Left: Thumbnail & Info */}
      <div className="flex items-center gap-4 flex-1">
        <div className="relative w-14 h-14 rounded-lg overflow-hidden shrink-0 border border-gold-500/20 bg-black/40">
          <img
            src={service.image}
            alt={service.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            loading="lazy"
          />
          {service.popular && (
            <div className="absolute top-1 right-1 w-2 h-2 rounded-full bg-gold-400 shadow-sm" title="Popular Treatment" />
          )}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h4 className="font-serif text-sm sm:text-base font-bold text-luxe-ivory group-hover:text-gold-300 transition-colors truncate">
              {service.name}
            </h4>
            {service.requiresConsultation && (
              <span className="inline-flex items-center gap-1 text-[9px] uppercase px-1.5 py-0.5 rounded bg-gold-500/10 text-gold-400 border border-gold-500/20">
                <AlertCircle className="w-2.5 h-2.5" />
                <span>Consultation</span>
              </span>
            )}
          </div>
          <p className="text-xs text-luxe-muted line-clamp-1 mt-0.5 font-light">
            {service.description}
          </p>
        </div>
      </div>

      {/* Right: Duration, Price & Book Action */}
      <div className="flex items-center justify-between sm:justify-end gap-4 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-white/5">
        <div className="flex items-center gap-1 text-xs text-luxe-muted">
          <Clock className="w-3.5 h-3.5 text-gold-400" />
          <span>{service.duration}</span>
        </div>

        <div className="text-right">
          <span className="font-serif text-base sm:text-lg font-bold text-gold-400">
            ₹{service.price.toLocaleString('en-IN')}
          </span>
        </div>

        <button
          onClick={() => onBook(service)}
          className="px-4 py-1.5 rounded-full border border-gold-500/40 text-gold-300 hover:text-black hover:bg-gold-500 hover:border-gold-500 text-xs font-bold uppercase tracking-wider transition-all duration-200 flex items-center gap-1.5 active:scale-95"
        >
          <span>Book</span>
          <ArrowRight className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
};
