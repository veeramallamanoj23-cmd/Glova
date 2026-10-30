import { PackageItem } from '../types';

export const initialPackages: PackageItem[] = [
  {
    id: 'pkg-men-executive',
    name: "The Gentleman's Executive Reserve",
    category: 'men',
    description: 'Our quintessential grooming benchmark designed for leaders, board meetings, and celebratory milestones.',
    originalPrice: 3800,
    discountedPrice: 2799,
    duration: '110 mins',
    popular: true,
    tag: 'Signature Choice',
    image: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=800&q=80',
    inclusions: [
      'Tailored Premium Haircut & Styling',
      'Straight-Razor Hot Towel Beard Sculpt',
      'Purifying Charcoal Detox Facial',
      'Relaxing Scalp & Shoulder Acupressure',
      'Complimentary Artisanal Espresso or Cold Brew'
    ]
  },
  {
    id: 'pkg-women-bridal-radiance',
    name: 'Royale Imperial Bridal Glow',
    category: 'women',
    description: 'An ethereal multi-phase transformation journey designed to prepare brides for unforgettable photography.',
    originalPrice: 15500,
    discountedPrice: 11999,
    duration: '210 mins',
    popular: true,
    tag: 'Most Loved',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80',
    inclusions: [
      '24K Gold Cellular Rejuvenation Facial',
      'Full Body Velvet Polish & Scrub',
      'Rica White Chocolate Full Body Wax',
      'Rose Paraffin Spa Manicure & Pedicure',
      'Kérastase Intensive Molecular Hair Spa'
    ]
  },
  {
    id: 'pkg-couple-sanctuary',
    name: 'Seraphic Couple Harmony Spa',
    category: 'couple',
    description: 'Private candlelit couple suite session featuring synchronized aromatherapy and restorative massages.',
    originalPrice: 8500,
    discountedPrice: 5999,
    duration: '90 mins',
    popular: false,
    tag: 'Private Suite',
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80',
    inclusions: [
      'Synchronized Swedish Warm Oil Body Massage',
      'De-stressing Head & Foot Reflexology',
      'Hydrating Botanical Face Infusion',
      'Steam & Essential Oil Aroma Shower',
      'Gourmet Herbal Tea & Macaron Platter'
    ]
  },
  {
    id: 'pkg-women-hair-transformation',
    name: 'Couture Balayage & Bond Repair',
    category: 'women',
    description: 'Master colorist consultation, freehand dimensional painting, gloss toner, and Olaplex bond seal.',
    originalPrice: 8900,
    discountedPrice: 6499,
    duration: '180 mins',
    popular: true,
    tag: 'Trending Color',
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80',
    inclusions: [
      'Bespoke French Balayage / Ombré Technique',
      'Olaplex No. 1 & No. 2 Bond Multiplier',
      'Ammonia-free Gloss Toner Lock',
      'Volumizing Hollywood Blowout & Beach Waves',
      'Take-Home Color Protection Sample'
    ]
  },
  {
    id: 'pkg-men-fade-refresh',
    name: 'Precision Fade & Scalp Reset',
    category: 'men',
    description: 'Sharp urban edge combined with therapeutic deep scalp purification for fast-paced gentlemen.',
    originalPrice: 2200,
    discountedPrice: 1599,
    duration: '60 mins',
    popular: false,
    tag: 'Weekly Essential',
    image: 'https://images.unsplash.com/photo-1622286342621-4bd786c2447c?auto=format&fit=crop&w=800&q=80',
    inclusions: [
      'Skin Fade / Taper Cut with Razor Contour',
      'Ozone Steam Salicylic Scalp Treatment',
      'Hydrating Under-Eye Collagen Patch',
      'Matte Texturizing Clay Finish'
    ]
  },
  {
    id: 'pkg-monthly-grooming-pass',
    name: 'GLOVA Black Diamond VIP Pass',
    category: 'monthly',
    description: 'Inspired by luxury membership houses like Drybar and Soho House: unlimited maintenance and zero booking friction.',
    originalPrice: 6500,
    discountedPrice: 4499,
    duration: 'Monthly Pass',
    popular: true,
    tag: 'VIP Privilege',
    image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=800&q=80',
    inclusions: [
      '2 Full Haircuts + 2 Beard Sculpting / Blowouts per month',
      '1 Complimentary Luxury Hair Spa or Facial monthly',
      'Priority Weekend Booking with Zero Wait Time',
      '20% Off all retail homecare products',
      'Complimentary Guest Pass for a friend once a quarter'
    ]
  }
];
