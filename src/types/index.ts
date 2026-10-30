export type ServiceCategory = 'men' | 'women' | 'unisex';

export type ServiceSubcategory = 
  | 'hair'
  | 'beard'
  | 'skincare'
  | 'waxing'
  | 'nails'
  | 'makeup'
  | 'spa'
  | 'packages';

export interface Service {
  id: string;
  name: string;
  category: ServiceCategory;
  subcategory: ServiceSubcategory;
  description: string;
  duration: string; // e.g. "45 mins"
  durationMinutes: number;
  price: number; // in INR
  requiresConsultation?: boolean;
  image: string;
  popular?: boolean;
  isAvailable: boolean;
}

export interface Stylist {
  id: string;
  name: string;
  title: string;
  specialization: string;
  experience: string;
  bio: string;
  rating: number;
  reviewsCount: number;
  image: string;
  isAvailable: boolean;
}

export interface Appointment {
  id: string;
  bookingRef: string;
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  serviceId: string;
  serviceName: string;
  category: ServiceCategory;
  stylistId?: string;
  stylistName?: string;
  date: string; // YYYY-MM-DD
  timeSlot: string; // e.g. "11:00 AM"
  notes?: string;
  totalPrice: number;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  createdAt: string;
}

export interface PackageItem {
  id: string;
  name: string;
  category: 'men' | 'women' | 'couple' | 'monthly';
  description: string;
  originalPrice: number;
  discountedPrice: number;
  duration: string;
  inclusions: string[];
  popular?: boolean;
  tag?: string;
  image: string;
}

export interface Review {
  id: string;
  customerName: string;
  serviceName: string;
  rating: number;
  reviewText: string;
  date: string;
  verified: boolean;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'all' | 'men' | 'women' | 'bridal' | 'color' | 'skincare' | 'nails' | 'salon';
  image: string;
  beforeImage?: string;
  afterImage?: string;
  description?: string;
}

export interface SalonInfo {
  name: string;
  tagline: string;
  address: string;
  phone: string;
  phoneClean: string; // for tel: link e.g. "+919876543210"
  email: string;
  whatsapp: string; // for wa.me link e.g. "919876543210"
  instagram: string;
  facebook: string;
  hours: {
    weekdays: string;
    saturday: string;
    sunday: string;
  };
  announcementBanner?: string;
}
