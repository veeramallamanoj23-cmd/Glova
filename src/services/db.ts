import { createClient } from '@supabase/supabase-js';
import { Appointment, Service, Stylist, PackageItem, Review, SalonInfo } from '../types';
import { initialServices } from '../data/servicesData';
import { initialStylists } from '../data/stylistsData';
import { initialPackages } from '../data/packagesData';
import { initialReviews } from '../data/reviewsData';
import { initialSalonInfo } from '../data/salonInfo';

// Read optional Supabase credentials from Vite environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = Boolean(
  supabaseUrl && 
  supabaseAnonKey && 
  supabaseUrl !== 'https://your-project.supabase.co' &&
  !supabaseUrl.includes('placeholder')
);

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// LocalStorage Keys for reliable fallback & persistent demo operation
const STORAGE_KEYS = {
  SERVICES: 'glova_services_v1',
  STYLISTS: 'glova_stylists_v1',
  PACKAGES: 'glova_packages_v1',
  APPOINTMENTS: 'glova_appointments_v1',
  REVIEWS: 'glova_reviews_v1',
  SALON_INFO: 'glova_salon_info_v1',
};

// Seed initial demo appointments
const seedAppointments: Appointment[] = [
  {
    id: 'seed-apt-1',
    bookingRef: 'GLV-2026-8841',
    customerName: 'Aarav Singhania',
    customerPhone: '+91 98200 12345',
    customerEmail: 'aarav.s@example.com',
    serviceId: 'm-pkg-1',
    serviceName: 'Haircut + Beard Trim',
    category: 'men',
    stylistId: 'stylist-3',
    stylistName: 'Marcus Vance',
    date: new Date(Date.now() + 86400000).toISOString().split('T')[0], // tomorrow
    timeSlot: '02:00 PM',
    notes: 'Please keep sideburns faded to zero.',
    totalPrice: 749,
    status: 'confirmed',
    createdAt: new Date().toISOString()
  },
  {
    id: 'seed-apt-2',
    bookingRef: 'GLV-2026-4920',
    customerName: 'Devika Nair',
    customerPhone: '+91 98450 67890',
    customerEmail: 'devika.nair@example.com',
    serviceId: 'w-hair-20',
    serviceName: 'Balayage',
    category: 'women',
    stylistId: 'stylist-2',
    stylistName: 'Aria Sengupta',
    date: new Date(Date.now() + 172800000).toISOString().split('T')[0], // in 2 days
    timeSlot: '11:00 AM',
    notes: 'Looking for caramel tone highlights on virgin black hair.',
    totalPrice: 5499,
    status: 'pending',
    createdAt: new Date().toISOString()
  }
];

// Helper to safely read from localStorage with fallback
function loadFromStorage<T>(key: string, defaultValue: T): T {
  try {
    const item = localStorage.getItem(key);
    if (!item) {
      localStorage.setItem(key, JSON.stringify(defaultValue));
      return defaultValue;
    }
    return JSON.parse(item);
  } catch (e) {
    console.error(`Error reading ${key} from storage:`, e);
    return defaultValue;
  }
}

function saveToStorage<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error(`Error saving ${key} to storage:`, e);
  }
}

// ==================== APPOINTMENT OPERATIONS ====================

export async function getAppointments(): Promise<Appointment[]> {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('appointments')
        .select('*')
        .order('createdAt', { ascending: false });
      if (!error && data) return data as Appointment[];
    } catch (e) {
      console.warn('Supabase fetch failed, using local storage fallback', e);
    }
  }
  return loadFromStorage<Appointment[]>(STORAGE_KEYS.APPOINTMENTS, seedAppointments);
}

export async function createAppointment(
  appointmentData: Omit<Appointment, 'id' | 'bookingRef' | 'status' | 'createdAt'>
): Promise<{ success: boolean; appointment?: Appointment; error?: string }> {
  try {
    // 1. Validation
    if (!appointmentData.customerName || !appointmentData.customerName.trim()) {
      return { success: false, error: 'Customer name is required' };
    }
    if (!appointmentData.customerPhone || appointmentData.customerPhone.replace(/\D/g, '').length < 10) {
      return { success: false, error: 'Please enter a valid 10-digit mobile number' };
    }
    if (!appointmentData.date) {
      return { success: false, error: 'Please choose an appointment date' };
    }
    if (!appointmentData.timeSlot) {
      return { success: false, error: 'Please choose an available time slot' };
    }

    // Prevent booking past dates
    const today = new Date().toISOString().split('T')[0];
    if (appointmentData.date < today) {
      return { success: false, error: 'Cannot book an appointment for a past date' };
    }

    // 2. Conflict checking
    const existingAppointments = await getAppointments();
    const conflict = existingAppointments.find(
      (apt) =>
        apt.date === appointmentData.date &&
        apt.timeSlot === appointmentData.timeSlot &&
        apt.status !== 'cancelled' &&
        (apt.stylistId === appointmentData.stylistId || (!apt.stylistId && !appointmentData.stylistId))
    );

    if (conflict) {
      return { 
        success: false, 
        error: `The ${appointmentData.timeSlot} slot on ${appointmentData.date} is already reserved for this stylist. Please select another time or stylist.` 
      };
    }

    // 3. Generate unique booking reference (e.g. GLV-2026-XXXX)
    const randomDigits = Math.floor(1000 + Math.random() * 9000);
    const bookingRef = `GLV-${new Date().getFullYear()}-${randomDigits}`;

    const newAppointment: Appointment = {
      ...appointmentData,
      id: 'apt-' + Date.now() + '-' + Math.random().toString(36).substr(2, 5),
      bookingRef,
      status: 'confirmed',
      createdAt: new Date().toISOString()
    };

    // 4. Persist to Supabase if available
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase
          .from('appointments')
          .insert([newAppointment])
          .select()
          .single();
        if (error) {
          console.warn('Failed to insert into Supabase, saving locally', error);
        } else if (data) {
          // also update local cache
          const localApts = loadFromStorage<Appointment[]>(STORAGE_KEYS.APPOINTMENTS, seedAppointments);
          saveToStorage(STORAGE_KEYS.APPOINTMENTS, [data as Appointment, ...localApts]);
          return { success: true, appointment: data as Appointment };
        }
      } catch (e) {
        console.warn('Supabase insert exception, using local store', e);
      }
    }

    // Local Storage persistence
    const currentList = loadFromStorage<Appointment[]>(STORAGE_KEYS.APPOINTMENTS, seedAppointments);
    const updatedList = [newAppointment, ...currentList];
    saveToStorage(STORAGE_KEYS.APPOINTMENTS, updatedList);

    return { success: true, appointment: newAppointment };
  } catch (err: any) {
    return { success: false, error: err.message || 'An unexpected error occurred while saving booking.' };
  }
}

export async function updateAppointmentStatus(
  id: string, 
  status: Appointment['status']
): Promise<boolean> {
  if (isSupabaseConfigured && supabase) {
    try {
      const { error } = await supabase
        .from('appointments')
        .update({ status })
        .eq('id', id);
      if (!error) {
        // synchronize local
        const apts = loadFromStorage<Appointment[]>(STORAGE_KEYS.APPOINTMENTS, seedAppointments);
        const updated = apts.map(a => a.id === id ? { ...a, status } : a);
        saveToStorage(STORAGE_KEYS.APPOINTMENTS, updated);
        return true;
      }
    } catch (e) {
      console.warn('Supabase status update failed', e);
    }
  }

  const current = loadFromStorage<Appointment[]>(STORAGE_KEYS.APPOINTMENTS, seedAppointments);
  const updated = current.map(a => a.id === id ? { ...a, status } : a);
  saveToStorage(STORAGE_KEYS.APPOINTMENTS, updated);
  return true;
}

// ==================== SERVICE OPERATIONS ====================

export async function getServices(): Promise<Service[]> {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase.from('services').select('*');
      if (!error && data && data.length > 0) return data as Service[];
    } catch (e) {
      console.warn('Supabase services fetch failed', e);
    }
  }
  return loadFromStorage<Service[]>(STORAGE_KEYS.SERVICES, initialServices);
}

export async function saveService(service: Service): Promise<boolean> {
  if (isSupabaseConfigured && supabase) {
    try {
      const { error } = await supabase.from('services').upsert(service);
      if (!error) return true;
    } catch (e) {
      console.warn('Supabase service upsert failed', e);
    }
  }

  const current = loadFromStorage<Service[]>(STORAGE_KEYS.SERVICES, initialServices);
  const exists = current.some(s => s.id === service.id);
  const updated = exists 
    ? current.map(s => s.id === service.id ? service : s)
    : [service, ...current];
  saveToStorage(STORAGE_KEYS.SERVICES, updated);
  return true;
}

export async function deleteService(id: string): Promise<boolean> {
  if (isSupabaseConfigured && supabase) {
    try {
      const { error } = await supabase.from('services').delete().eq('id', id);
      if (!error) return true;
    } catch (e) {
      console.warn('Supabase service delete failed', e);
    }
  }
  const current = loadFromStorage<Service[]>(STORAGE_KEYS.SERVICES, initialServices);
  const updated = current.filter(s => s.id !== id);
  saveToStorage(STORAGE_KEYS.SERVICES, updated);
  return true;
}

// ==================== STYLIST OPERATIONS ====================

export async function getStylists(): Promise<Stylist[]> {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase.from('stylists').select('*');
      if (!error && data && data.length > 0) return data as Stylist[];
    } catch (e) {
      console.warn('Supabase stylists fetch failed', e);
    }
  }
  return loadFromStorage<Stylist[]>(STORAGE_KEYS.STYLISTS, initialStylists);
}

export async function saveStylist(stylist: Stylist): Promise<boolean> {
  const current = loadFromStorage<Stylist[]>(STORAGE_KEYS.STYLISTS, initialStylists);
  const exists = current.some(s => s.id === stylist.id);
  const updated = exists
    ? current.map(s => s.id === stylist.id ? stylist : s)
    : [...current, stylist];
  saveToStorage(STORAGE_KEYS.STYLISTS, updated);
  return true;
}

// ==================== PACKAGES OPERATIONS ====================

export async function getPackages(): Promise<PackageItem[]> {
  return loadFromStorage<PackageItem[]>(STORAGE_KEYS.PACKAGES, initialPackages);
}

export async function savePackage(pkg: PackageItem): Promise<boolean> {
  const current = loadFromStorage<PackageItem[]>(STORAGE_KEYS.PACKAGES, initialPackages);
  const exists = current.some(p => p.id === pkg.id);
  const updated = exists
    ? current.map(p => p.id === pkg.id ? pkg : p)
    : [...current, pkg];
  saveToStorage(STORAGE_KEYS.PACKAGES, updated);
  return true;
}

// ==================== REVIEWS OPERATIONS ====================

export async function getReviews(): Promise<Review[]> {
  return loadFromStorage<Review[]>(STORAGE_KEYS.REVIEWS, initialReviews);
}

export async function addReview(newReview: Omit<Review, 'id' | 'date' | 'verified'>): Promise<Review> {
  const review: Review = {
    ...newReview,
    id: 'rev-' + Date.now(),
    date: 'Just now',
    verified: true
  };
  const current = loadFromStorage<Review[]>(STORAGE_KEYS.REVIEWS, initialReviews);
  saveToStorage(STORAGE_KEYS.REVIEWS, [review, ...current]);
  return review;
}

// ==================== SALON INFO ====================

export async function getSalonInfo(): Promise<SalonInfo> {
  return loadFromStorage<SalonInfo>(STORAGE_KEYS.SALON_INFO, initialSalonInfo);
}

export async function updateSalonInfo(info: SalonInfo): Promise<boolean> {
  saveToStorage(STORAGE_KEYS.SALON_INFO, info);
  return true;
}

// ==================== RESET SYSTEM TO SEED DEFAULTS ====================

export function resetAllDataToDefaults(): void {
  localStorage.setItem(STORAGE_KEYS.SERVICES, JSON.stringify(initialServices));
  localStorage.setItem(STORAGE_KEYS.STYLISTS, JSON.stringify(initialStylists));
  localStorage.setItem(STORAGE_KEYS.PACKAGES, JSON.stringify(initialPackages));
  localStorage.setItem(STORAGE_KEYS.APPOINTMENTS, JSON.stringify(seedAppointments));
  localStorage.setItem(STORAGE_KEYS.REVIEWS, JSON.stringify(initialReviews));
  localStorage.setItem(STORAGE_KEYS.SALON_INFO, JSON.stringify(initialSalonInfo));
}
