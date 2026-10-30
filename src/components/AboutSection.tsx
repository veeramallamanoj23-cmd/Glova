import React from 'react';
import { ShieldCheck, Sparkles, HeartHandshake, Award, Clock, Droplets, CheckCircle2 } from 'lucide-react';

export const AboutSection: React.FC = () => {
  const pillars = [
    {
      icon: Sparkles,
      title: 'Bespoke Artistry',
      desc: 'Every haircut, color nuance, and skincare protocol is mapped directly to your facial structure, lifestyle, and aesthetic preference.'
    },
    {
      icon: ShieldCheck,
      title: 'Hospital-Grade Hygiene',
      desc: 'Autoclave instrument sterilization, single-use biodegradable gowns, sealed fresh blades, and HEPA air purification in every suite.'
    },
    {
      icon: Droplets,
      title: 'Ethical Luxury Formulations',
      desc: 'Exclusively using ammonia-free Italian dyes, Olaplex bond repair, Kérastase lipid therapies, and cruelty-free organic botanicals.'
    },
    {
      icon: HeartHandshake,
      title: 'Transparent Consultations',
      desc: 'No rushed appointments or hidden surge pricing. A thorough 15-minute diagnostic session precedes every complex chemical and bridal ritual.'
    }
  ];

  const stats = [
    { number: '12+', label: 'Years of Excellence', sub: 'Founded in 2014' },
    { number: '15,000+', label: 'Celebrated Clients', sub: 'High retention rate' },
    { number: '45+', label: 'Specialized Treatments', sub: 'Men & Women' },
    { number: '12', label: 'Master Stylists', sub: 'International diplomas' },
  ];

  return (
    <section id="about" className="py-20 mobbin-bg border-t border-gold-500/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Story Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-24">
          {/* Images Composite */}
          <div className="relative">
            <div className="relative z-10 rounded-3xl overflow-hidden border border-gold-500/30 shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&w=1200&q=80"
                alt="GLOVA Luxury Salon Craftsmanship"
                className="w-full h-[440px] sm:h-[500px] object-cover object-center filter brightness-95"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              
              <div className="absolute bottom-6 left-6 right-6 p-5 rounded-2xl bg-black/70 backdrop-blur-md border border-gold-500/20">
                <p className="font-serif italic text-gold-300 text-sm">
                  "True luxury is not merely an appearance; it is the confidence you carry the moment you step outside."
                </p>
                <span className="text-[10px] uppercase tracking-widest text-luxe-muted mt-2 block">
                  — Elena Rostova, Creative Co-Founder
                </span>
              </div>
            </div>

            {/* Accent Floating Badge */}
            <div className="absolute -bottom-6 -right-6 z-20 hidden sm:flex items-center gap-3 p-4 rounded-2xl bg-luxe-card border border-gold-400 shadow-gold-glow">
              <div className="w-10 h-10 rounded-full bg-gold-500/20 flex items-center justify-center">
                <Award className="w-5 h-5 text-gold-400" />
              </div>
              <div>
                <p className="text-xs font-bold text-white uppercase tracking-wider">Top Rated Salon</p>
                <p className="text-[10px] text-gold-400">Excellence in Hair & Beauty 2026</p>
              </div>
            </div>
          </div>

          {/* Story Text */}
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-300 text-xs font-semibold uppercase tracking-widest mb-4">
              <Sparkles className="w-3.5 h-3.5 text-gold-400" />
              <span>The GLOVA Philosophy</span>
            </div>
            
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-luxe-ivory mb-6 leading-tight">
              Where Couture Craft Meets <span className="gold-text-gradient italic font-normal">Holistic Well-being.</span>
            </h2>

            <p className="text-sm sm:text-base text-luxe-ivory/80 font-light leading-relaxed mb-6">
              Founded on the belief that personal grooming should be an immersive sanctuary rather than a hurried chore, GLOVA reimagines the modern salon experience for both men and women.
            </p>

            <p className="text-xs sm:text-sm text-luxe-muted leading-relaxed mb-8">
              Whether you are preparing for a boardroom keynote, a grand royal wedding, or seeking peaceful restorative hair and skin therapy, our spaces are designed with acoustically treated suites, curated espresso bars, and master technicians who listen first and craft with precision.
            </p>

            {/* Feature List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-gold-500/15">
              <div className="flex items-center gap-2 text-xs text-luxe-ivory">
                <CheckCircle2 className="w-4 h-4 text-gold-400 shrink-0" />
                <span>Dedicated Men’s Barber Lounge</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-luxe-ivory">
                <CheckCircle2 className="w-4 h-4 text-gold-400 shrink-0" />
                <span>Private Women’s Couture Suites</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-luxe-ivory">
                <CheckCircle2 className="w-4 h-4 text-gold-400 shrink-0" />
                <span>Hydrotherapy Couple Spa</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-luxe-ivory">
                <CheckCircle2 className="w-4 h-4 text-gold-400 shrink-0" />
                <span>High-Speed Complimentary Wi-Fi</span>
              </div>
            </div>
          </div>
        </div>

        {/* Brand Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {pillars.map((pil, idx) => {
            const Icon = pil.icon;
            return (
              <div
                key={idx}
                className="p-5 rounded-2xl mobbin-card hover:-translate-y-1 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-gold-500/10 border border-gold-500/30 flex items-center justify-center mb-5 text-gold-400">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-lg font-bold text-luxe-ivory mb-2">
                  {pil.title}
                </h3>
                <p className="text-xs text-luxe-muted leading-relaxed">
                  {pil.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* Salon Statistics Bar */}
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-black via-luxe-card to-black border border-gold-500/30 shadow-2xl">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center divide-y lg:divide-y-0 lg:divide-x divide-gold-500/15">
            {stats.map((st, i) => (
              <div key={i} className={`pt-4 lg:pt-0 ${i !== 0 ? 'lg:pl-8' : ''}`}>
                <div className="font-serif text-3xl sm:text-5xl font-extrabold gold-text-gradient mb-1">
                  {st.number}
                </div>
                <div className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-luxe-ivory">
                  {st.label}
                </div>
                <div className="text-[11px] text-luxe-muted mt-0.5">
                  {st.sub}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
