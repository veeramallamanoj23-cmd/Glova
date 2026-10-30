import React, { useState } from 'react';
import { Scissors, Sparkles } from 'lucide-react';

interface ScissorsDividerProps {
  label?: string;
  onSnip?: () => void;
  className?: string;
}

export const ScissorsDivider: React.FC<ScissorsDividerProps> = ({ 
  label = "Precision Styling & Grooming",
  onSnip,
  className = "" 
}) => {
  const [isSnipping, setIsSnipping] = useState(false);

  const handleTriggerSnip = () => {
    setIsSnipping(true);
    if (onSnip) onSnip();
    setTimeout(() => setIsSnipping(false), 900);
  };

  return (
    <div className={`relative my-10 max-w-5xl mx-auto px-4 ${className}`}>
      {/* Dashed Golden Cut Line */}
      <div className="relative flex items-center justify-center">
        <div className="w-full h-[1px] cut-line opacity-40" />

        {/* Central Scissors Button with Snip Animation */}
        <button
          onClick={handleTriggerSnip}
          title="Click for a clean snip!"
          className="group relative z-10 mx-4 px-4 py-1.5 rounded-full bg-[#111117] border border-gold-500/30 text-gold-300 hover:border-gold-400 hover:text-gold-200 transition-all duration-300 flex items-center gap-2 shadow-lg active:scale-95"
        >
          {/* Animated SVG Scissors */}
          <div className={`relative w-4 h-4 text-gold-400 transition-transform ${isSnipping ? 'scale-125 rotate-12' : 'group-hover:rotate-12'}`}>
            <Scissors className="w-4 h-4 fill-gold-500/20" />
          </div>

          <span className="text-[10px] uppercase tracking-[0.25em] font-semibold text-luxe-ivory/80 group-hover:text-gold-300">
            {label}
          </span>

          <Sparkles className={`w-3 h-3 text-gold-400 transition-opacity ${isSnipping ? 'opacity-100 animate-spin' : 'opacity-0 group-hover:opacity-100'}`} />
        </button>

        <div className="w-full h-[1px] cut-line opacity-40" />
      </div>
    </div>
  );
};
