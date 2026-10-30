import React from 'react';
import { Sparkles, Calendar, ChevronDown, Award, ArrowUpRight, Scissors } from 'lucide-react';

interface HeroProps {
  onOpenBooking: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenBooking }) => {
  return (
    <section id="home" className="relative min-h-[92vh] flex items-center justify-center overflow-hidden">
      {/* Background Salon Image with Multi-layer Dark Vignette */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=2000&q=85"
          alt="GLOVA Luxury Unisex Salon Ambiance"
          className="w-full h-full object-cover object-center scale-105 animate-pulse-slow filter brightness-50 contrast-110"
        />
        {/* Radial and Linear Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-luxe-black via-luxe-black/70 to-black/60" />
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-black/40 to-black/90" />
      </div>

      {/* Floating Decorative Gold Rings / Accents */}
      <div className="absolute top-1/4 left-10 w-64 h-64 rounded-full bg-gold-500/5 blur-3xl pointer-events-none animate-float" />
      <div className="absolute bottom-1/4 right-10 w-80 h-80 rounded-full bg-gold-400/5 blur-3xl pointer-events-none animate-float" style={{ animationDelay: '3s' }} />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-16 pb-24">
        {/* Luxury Badge */}
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-gold-500/30 bg-black/50 backdrop-blur-md mb-8 shadow-gold-glow animate-fade-in">
          <Award className="w-4 h-4 text-gold-400" />
          <span className="text-xs uppercase tracking-[0.25em] font-semibold text-gold-300">
            Award-Winning Unisex Studio & Spa
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-gold-400 animate-ping" />
        </div>

        {/* Main Heading */}
        <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-luxe-ivory leading-[1.1] mb-6">
          Discover Your <span className="gold-text-gradient italic font-normal">Best Look.</span>
        </h1>

        {/* Supporting Tagline & Value Statement */}
        <p className="max-w-2xl mx-auto text-base sm:text-xl text-luxe-ivory/80 font-light leading-relaxed mb-10 tracking-wide">
          Experience premium hair, beauty, and grooming services designed to bring out your confidence and natural glow.
        </p>

        {/* Dual Call-To-Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mb-16">
          <button
            onClick={onOpenBooking}
            className="gold-glow-btn w-full sm:w-auto px-8 py-4 rounded-full text-sm font-bold uppercase tracking-widest flex items-center justify-center gap-3 group"
          >
            <Calendar className="w-4 h-4 text-black group-hover:scale-110 transition-transform" />
            <span>Book an Appointment</span>
            <ArrowUpRight className="w-4 h-4 text-black group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>

          <a
            href="#services-menu"
            className="w-full sm:w-auto px-8 py-4 rounded-full text-sm font-semibold uppercase tracking-widest border border-gold-500/40 text-luxe-ivory hover:text-gold-300 hover:border-gold-400 hover:bg-gold-500/10 backdrop-blur-sm transition-all duration-300 flex items-center justify-center gap-2"
          >
            <Scissors className="w-4 h-4 text-gold-400" />
            <span>Explore Our Services</span>
          </a>
        </div>

        {/* Quick Highlights Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto pt-8 border-t border-gold-500/15 text-left">
          <div className="p-3">
            <p className="font-serif text-2xl font-bold text-gold-400">15K+</p>
            <p className="text-xs uppercase tracking-wider text-luxe-muted mt-1">Clients Styled</p>
          </div>
          <div className="p-3">
            <p className="font-serif text-2xl font-bold text-gold-400">4.95 ★</p>
            <p className="text-xs uppercase tracking-wider text-luxe-muted mt-1">Client Satisfaction</p>
          </div>
          <div className="p-3">
            <p className="font-serif text-2xl font-bold text-gold-400">100%</p>
            <p className="text-xs uppercase tracking-wider text-luxe-muted mt-1">Sterilized Tools</p>
          </div>
          <div className="p-3">
            <p className="font-serif text-2xl font-bold text-gold-400">Top 1%</p>
            <p className="text-xs uppercase tracking-wider text-luxe-muted mt-1">Certified Master Artists</p>
          </div>
        </div>
      </div>

      {/* Animated Scroll Down Indicator */}
      <a
        href="#about"
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center text-xs tracking-widest uppercase text-luxe-muted hover:text-gold-300 transition-colors"
      >
        <span className="mb-1 text-[10px]">Scroll Down</span>
        <ChevronDown className="w-4 h-4 animate-bounce text-gold-400" />
      </a>
    </section>
  );
};
