import React, { useState } from 'react';
import { GalleryItem } from '../types';
import { BeforeAfterSlider } from './BeforeAfterSlider';
import { ScissorsDivider } from './ScissorsDivider';
import { Camera, X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';

interface GallerySectionProps {
  gallery: GalleryItem[];
}

export const GallerySection: React.FC<GallerySectionProps> = ({ gallery }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const categories = [
    { id: 'all', label: 'All Portfolio' },
    { id: 'men', label: "Men's Cuts & Fades" },
    { id: 'women', label: "Women's Hair" },
    { id: 'color', label: 'Balayage & Color' },
    { id: 'bridal', label: 'Bridal Makeovers' },
    { id: 'skincare', label: 'Facial Glow' },
    { id: 'nails', label: 'Nails & Pedicure' },
    { id: 'salon', label: 'Studio Interior' },
  ];

  const filteredGallery = gallery.filter((item) => {
    if (selectedCategory === 'all') return true;
    return item.category === selectedCategory;
  });

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
  };

  const prevLightbox = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex - 1 + filteredGallery.length) % filteredGallery.length);
    }
  };

  const nextLightbox = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % filteredGallery.length);
    }
  };

  return (
    <section id="gallery" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-300 text-xs font-semibold uppercase tracking-widest mb-4">
          <Camera className="w-3.5 h-3.5 text-gold-400" />
          <span>Visual Portfolio</span>
        </div>
        <h2 className="font-serif text-3xl sm:text-5xl font-bold text-luxe-ivory mb-4">
          Artistry in <span className="gold-text-gradient italic font-normal">Every Angle.</span>
        </h2>
        <p className="text-sm sm:text-base text-luxe-muted leading-relaxed">
          A showcase of our signature balayage transformations, precision skin fades, royal bridal couture, and calm salon sanctuaries.
        </p>

        <ScissorsDivider label="Editorial Hair & Beauty Showcase" />

        {/* Category Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-4">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-200 ${
                selectedCategory === cat.id
                  ? 'bg-gold-500 text-black shadow-gold-glow'
                  : 'bg-black/40 text-luxe-muted hover:text-white border border-white/5'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Masonry / Responsive Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
        {filteredGallery.map((item, idx) => (
          <div
            key={item.id}
            onClick={() => openLightbox(idx)}
            className="group relative h-80 rounded-2xl overflow-hidden bg-black/60 border border-gold-500/15 cursor-pointer shadow-lg hover:border-gold-400 hover:shadow-gold-glow transition-all duration-300"
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700 filter brightness-90 group-hover:brightness-100"
              loading="lazy"
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />

            {/* Expand Icon */}
            <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/70 backdrop-blur-md border border-gold-500/30 text-gold-400 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <Maximize2 className="w-4 h-4" />
            </div>

            {/* Image Details */}
            <div className="absolute bottom-0 inset-x-0 p-5 transform translate-y-1 group-hover:translate-y-0 transition-transform">
              <span className="text-[10px] uppercase tracking-widest text-gold-400 font-semibold block mb-1">
                {item.category}
              </span>
              <h3 className="font-serif text-lg font-bold text-luxe-ivory group-hover:text-gold-200 transition-colors">
                {item.title}
              </h3>
              {item.description && (
                <p className="text-xs text-luxe-muted mt-1 line-clamp-1">
                  {item.description}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Interactive Before & After Transformation Slider */}
      <BeforeAfterSlider />

      {/* Fullscreen Lightbox Modal */}
      {lightboxIndex !== null && filteredGallery[lightboxIndex] && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 sm:p-8 animate-fade-in">
          {/* Close Button */}
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 z-20 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            aria-label="Close lightbox"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Previous Button */}
          <button
            onClick={prevLightbox}
            className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/10 hover:bg-gold-500 hover:text-black text-white transition-colors"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Next Button */}
          <button
            onClick={nextLightbox}
            className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/10 hover:bg-gold-500 hover:text-black text-white transition-colors"
            aria-label="Next image"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Lightbox Image Container */}
          <div className="relative max-w-5xl max-h-[85vh] flex flex-col items-center">
            <img
              src={filteredGallery[lightboxIndex].image}
              alt={filteredGallery[lightboxIndex].title}
              className="max-h-[75vh] w-auto object-contain rounded-xl border border-gold-500/20 shadow-2xl"
            />
            <div className="mt-4 text-center">
              <h4 className="font-serif text-xl font-bold text-gold-300">
                {filteredGallery[lightboxIndex].title}
              </h4>
              <p className="text-xs text-luxe-muted mt-1 max-w-lg">
                {filteredGallery[lightboxIndex].description}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
