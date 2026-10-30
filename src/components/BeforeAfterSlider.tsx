import React, { useState } from 'react';
import { initialBeforeAfter, BeforeAfterPair } from '../data/galleryData';
import { Sparkles, MoveHorizontal } from 'lucide-react';

export const BeforeAfterSlider: React.FC = () => {
  const [pairs] = useState<BeforeAfterPair[]>(initialBeforeAfter);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [sliderPosition, setSliderPosition] = useState(50); // percentage 0 - 100

  const currentPair = pairs[currentIndex];

  const handleSliderMove = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const position = ((clientX - rect.left) / rect.width) * 100;
    setSliderPosition(Math.min(Math.max(position, 5), 95));
  };

  return (
    <div className="mobbin-card rounded-3xl p-6 md:p-8 my-12">
      <div className="max-w-4xl mx-auto text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-gold-500/10 border border-gold-500/20 text-gold-300 text-xs font-semibold uppercase tracking-wider mb-3">
          <Sparkles className="w-3.5 h-3.5 text-gold-400" />
          <span>Transformation Studio</span>
        </div>
        <h3 className="font-serif text-2xl md:text-4xl font-bold text-luxe-ivory mb-2">
          Real Transformations, <span className="gold-text-gradient italic">Crafted by Masters.</span>
        </h3>
        <p className="text-xs sm:text-sm text-luxe-muted max-w-xl mx-auto">
          Slide the handle horizontally to reveal the before-and-after artistry achieved by our senior salon specialists.
        </p>

        {/* Transformation Switcher Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
          {pairs.map((p, idx) => (
            <button
              key={p.id}
              onClick={() => {
                setCurrentIndex(idx);
                setSliderPosition(50);
              }}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-200 ${
                currentIndex === idx
                  ? 'bg-gold-500 text-black shadow-gold-glow'
                  : 'bg-black/50 text-luxe-muted hover:text-white border border-white/5'
              }`}
            >
              {p.category}
            </button>
          ))}
        </div>
      </div>

      {/* Interactive Drag Split View */}
      <div className="max-w-4xl mx-auto">
        <div
          className="relative h-[340px] sm:h-[480px] rounded-2xl overflow-hidden cursor-ew-resize select-none border border-gold-500/30 shadow-2xl"
          onMouseMove={(e) => e.buttons === 1 && handleSliderMove(e)}
          onTouchMove={handleSliderMove}
          onClick={handleSliderMove}
        >
          {/* AFTER Image (Full background) */}
          <img
            src={currentPair.afterImage}
            alt={`${currentPair.title} After`}
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
          <div className="absolute top-4 right-4 z-10 px-3 py-1 rounded-full bg-gold-500/90 text-black text-xs font-bold uppercase tracking-widest shadow-lg">
            After
          </div>

          {/* BEFORE Image (Clipped by slider position) */}
          <div
            className="absolute inset-y-0 left-0 overflow-hidden"
            style={{ width: `${sliderPosition}%` }}
          >
            <img
              src={currentPair.beforeImage}
              alt={`${currentPair.title} Before`}
              className="absolute inset-0 w-full h-full object-cover object-center max-w-none"
              style={{ width: '100%', minWidth: '100%' }}
            />
            <div className="absolute top-4 left-4 z-10 px-3 py-1 rounded-full bg-black/80 text-white text-xs font-bold uppercase tracking-widest border border-white/20 shadow-lg">
              Before
            </div>
          </div>

          {/* Divider Handle Line */}
          <div
            className="absolute top-0 bottom-0 w-1 bg-gold-400 shadow-[0_0_15px_#D4AF37] pointer-events-none"
            style={{ left: `${sliderPosition}%` }}
          >
            <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-gold-400 text-black flex items-center justify-center shadow-xl border-2 border-black">
              <MoveHorizontal className="w-5 h-5" />
            </div>
          </div>
        </div>

        {/* Transformation Details Card */}
        <div className="mt-4 p-4 rounded-xl bg-black/40 border border-white/5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
          <div>
            <h4 className="font-serif text-sm font-bold text-luxe-ivory">{currentPair.title}</h4>
            <p className="text-luxe-muted mt-0.5">{currentPair.description}</p>
          </div>
          <div className="text-right shrink-0">
            <span className="text-luxe-muted block text-[10px] uppercase tracking-wider">Executed by</span>
            <span className="text-gold-300 font-semibold">{currentPair.stylist}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
