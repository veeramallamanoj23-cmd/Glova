import { GalleryItem } from '../types';

export const initialGallery: GalleryItem[] = [
  {
    id: 'gal-1',
    title: 'Champagne Melt Balayage',
    category: 'color',
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1000&q=80',
    description: 'Dimensional French balayage blending dark hazel roots into sunlit champagne ribbons.'
  },
  {
    id: 'gal-2',
    title: 'Precision Mid Skin Fade & Beard Alignment',
    category: 'men',
    image: 'https://images.unsplash.com/photo-1622286342621-4bd786c2447c?auto=format&fit=crop&w=1000&q=80',
    description: 'Crisp razor taper with seamless zero-skin fade and matte pomade separation.'
  },
  {
    id: 'gal-3',
    title: 'Royal Indian Bridal Splendor',
    category: 'bridal',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1000&q=80',
    description: 'High definition 16-hour bridal makeup with 24K gold eye contouring and royal headpiece placement.'
  },
  {
    id: 'gal-4',
    title: 'Textured Shag & Curtain Fringe',
    category: 'women',
    image: 'https://images.unsplash.com/photo-1560869713-7d0a29430803?auto=format&fit=crop&w=1000&q=80',
    description: 'Effortless 70s-inspired Parisian layers bringing natural wave movement and facial symmetry.'
  },
  {
    id: 'gal-5',
    title: 'Japanese Minimalist Chrome Nail Inlay',
    category: 'nails',
    image: 'https://images.unsplash.com/photo-1632345031435-8727f6897d53?auto=format&fit=crop&w=1000&q=80',
    description: 'Bespoke liquid gold accents and sculpted almond extensions.'
  },
  {
    id: 'gal-6',
    title: 'Executive Hot Towel & Straight Razor Sculpt',
    category: 'men',
    image: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=1000&q=80',
    description: 'Traditional barbering craftsmanship with sandalwood essential oils and cold towel astringent.'
  },
  {
    id: 'gal-7',
    title: 'GLOVA Main Styling Sanctuary',
    category: 'salon',
    image: 'https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&w=1000&q=80',
    description: 'Custom marble countertops, warm backlit brass mirrors, and acoustic tranquility.'
  },
  {
    id: 'gal-8',
    title: 'Cellular Hydration Facial Glow',
    category: 'skincare',
    image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=1000&q=80',
    description: 'Post-treatment dewy radiance following micro-current stimulation and botanical peel.'
  },
  {
    id: 'gal-9',
    title: 'VIP Private Couple Spa Suite',
    category: 'salon',
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1000&q=80',
    description: 'Private candlelit couple treatment retreat with hydrotherapy immersion bath.'
  }
];

export interface BeforeAfterPair {
  id: string;
  title: string;
  category: string;
  beforeImage: string;
  afterImage: string;
  stylist: string;
  description: string;
}

export const initialBeforeAfter: BeforeAfterPair[] = [
  {
    id: 'ba-1',
    title: 'Couture Balayage & Keratin Bond Restoration',
    category: 'Hair Color Transformation',
    beforeImage: 'https://images.unsplash.com/photo-1519699047748-de8e457a634e?auto=format&fit=crop&w=900&q=80',
    afterImage: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=900&q=80',
    stylist: 'Aria Sengupta',
    description: 'Replaced brassy, faded undertones with seamless multidimensional champagne caramel balayage.'
  },
  {
    id: 'ba-2',
    title: 'Executive Skin Fade & Geometric Beard Sculpt',
    category: "Men's Total Grooming",
    beforeImage: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=900&q=80',
    afterImage: 'https://images.unsplash.com/photo-1622286342621-4bd786c2447c?auto=format&fit=crop&w=900&q=80',
    stylist: 'Marcus Vance',
    description: 'From overgrown scruff into razor-sharp cheek lines, zero taper fade, and structured chin definition.'
  },
  {
    id: 'ba-3',
    title: 'Clinical Anti-Dullness & Collagen Infusion',
    category: 'Facial & Skincare',
    beforeImage: 'https://images.unsplash.com/photo-1512290900672-1f41b21f37e4?auto=format&fit=crop&w=900&q=80',
    afterImage: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=900&q=80',
    stylist: 'Elena Rostova',
    description: 'Hydrated deep layers, dissolved sun pigmentation, and revealed a healthy glassy luminescence.'
  }
];
