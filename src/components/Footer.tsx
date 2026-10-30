import React from 'react';
import { SalonInfo } from '../types';
import { Sparkles, Phone, Mail, MapPin, Instagram, Facebook, ArrowUp } from 'lucide-react';

interface FooterProps {
  salonInfo: SalonInfo;
  onOpenBooking: () => void;
  onOpenAdmin: () => void;
}

export const Footer: React.FC<FooterProps> = ({ salonInfo, onOpenBooking, onOpenAdmin }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-luxe-black border-t border-gold-500/15 pt-20 pb-12 text-luxe-ivory relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-16">
          {/* Brand Col (2 cols on lg) */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-10 h-10 rounded-full border border-gold-500/40 bg-black flex items-center justify-center shadow-gold-glow">
                <span className="font-serif text-xl font-bold text-gold-400">G</span>
              </div>
              <span className="font-serif tracking-[0.28em] text-2xl font-bold gold-text-gradient uppercase">
                GLOVA
              </span>
            </div>

            <p className="font-serif italic text-gold-300 text-sm mb-4">
              "{salonInfo.tagline}"
            </p>

            <p className="text-xs text-luxe-muted leading-relaxed max-w-sm mb-6">
              A bespoke unisex sanctuary dedicated to the highest standards of haircutting architecture, color chemistry, clinical skincare, and tranquil spa rituals.
            </p>

            <div className="flex items-center gap-3">
              <a
                href={salonInfo.instagram}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-white/5 border border-white/10 hover:border-gold-400 flex items-center justify-center text-luxe-muted hover:text-gold-400 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={salonInfo.facebook}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-white/5 border border-white/10 hover:border-gold-400 flex items-center justify-center text-luxe-muted hover:text-gold-400 transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div>
            <h4 className="font-serif text-sm font-bold text-white uppercase tracking-widest mb-4">
              Explore
            </h4>
            <ul className="space-y-2 text-xs text-luxe-muted">
              <li>
                <a href="#home" className="hover:text-gold-300 transition-colors">Home Studio</a>
              </li>
              <li>
                <a href="#about" className="hover:text-gold-300 transition-colors">About GLOVA</a>
              </li>
              <li>
                <a href="#services-menu" className="hover:text-gold-300 transition-colors">Services Menu</a>
              </li>
              <li>
                <a href="#packages" className="hover:text-gold-300 transition-colors">VIP Packages</a>
              </li>
              <li>
                <a href="#gallery" className="hover:text-gold-300 transition-colors">Transformation Gallery</a>
              </li>
              <li>
                <a href="#stylists" className="hover:text-gold-300 transition-colors">Master Stylists</a>
              </li>
            </ul>
          </div>

          {/* Studio Hours */}
          <div>
            <h4 className="font-serif text-sm font-bold text-white uppercase tracking-widest mb-4">
              Hours
            </h4>
            <ul className="space-y-2 text-xs text-luxe-muted">
              <li>
                <span className="text-white block font-medium">Monday – Friday</span>
                <span>{salonInfo.hours.weekdays}</span>
              </li>
              <li>
                <span className="text-white block font-medium">Saturday</span>
                <span>{salonInfo.hours.saturday}</span>
              </li>
              <li>
                <span className="text-white block font-medium">Sunday</span>
                <span>{salonInfo.hours.sunday}</span>
              </li>
            </ul>
          </div>

          {/* Contact Concierge */}
          <div>
            <h4 className="font-serif text-sm font-bold text-white uppercase tracking-widest mb-4">
              Concierge
            </h4>
            <ul className="space-y-3 text-xs text-luxe-muted">
              <li>
                <a href={`tel:${salonInfo.phoneClean}`} className="hover:text-gold-300 transition-colors flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-gold-400 shrink-0" />
                  <span>{salonInfo.phone}</span>
                </a>
              </li>
              <li>
                <a href={`mailto:${salonInfo.email}`} className="hover:text-gold-300 transition-colors flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-gold-400 shrink-0" />
                  <span>{salonInfo.email}</span>
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-gold-400 shrink-0 mt-0.5" />
                <span className="leading-snug">Indiranagar, Bengaluru</span>
              </li>
              <li className="pt-2">
                <button
                  onClick={onOpenBooking}
                  className="gold-glow-btn px-4 py-2 rounded-full text-[11px] font-bold uppercase tracking-wider w-full"
                >
                  Book Appointment
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Strip */}
        <div className="pt-8 border-t border-gold-500/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-luxe-muted">
          <div>
            &copy; {new Date().getFullYear()} GLOVA Premium Unisex Salon & Beauty Studio. All rights reserved.
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={onOpenAdmin}
              className="text-luxe-muted hover:text-gold-400 transition-colors text-[11px]"
            >
              Salon Admin Login
            </button>
            <span className="text-white/20">&bull;</span>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1.5 text-gold-300 hover:text-gold-100 transition-colors text-[11px]"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
