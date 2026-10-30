import React, { useState, useEffect, useCallback } from 'react';
import { 
  Service, Stylist, PackageItem, Appointment, Review, SalonInfo 
} from './types';
import { 
  getServices, getStylists, getPackages, getAppointments, getReviews, getSalonInfo 
} from './services/db';

import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AboutSection } from './components/AboutSection';
import { ServicesSection } from './components/ServicesSection';
import { PackagesSection } from './components/PackagesSection';
import { GallerySection } from './components/GallerySection';
import { StylistsSection } from './components/StylistsSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { BookingModal } from './components/BookingModal';
import { AdminDashboard } from './components/AdminDashboard';
import { initialGallery } from './data/galleryData';
import { Sparkles } from 'lucide-react';

export const App: React.FC = () => {
  // Global Data State
  const [services, setServices] = useState<Service[]>([]);
  const [stylists, setStylists] = useState<Stylist[]>([]);
  const [packages, setPackages] = useState<PackageItem[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [salonInfo, setSalonInfo] = useState<SalonInfo | null>(null);

  // Modals
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [preSelectedService, setPreSelectedService] = useState<Service | null>(null);
  const [preSelectedStylist, setPreSelectedStylist] = useState<Stylist | null>(null);
  const [preSelectedPackage, setPreSelectedPackage] = useState<PackageItem | null>(null);

  // Intro Loading animation state (Section 2 Requirement)
  const [isLoading, setIsLoading] = useState(true);

  // Fetch all initial data
  const loadAllData = useCallback(async () => {
    try {
      const [s, st, p, a, r, si] = await Promise.all([
        getServices(),
        getStylists(),
        getPackages(),
        getAppointments(),
        getReviews(),
        getSalonInfo()
      ]);
      setServices(s);
      setStylists(st);
      setPackages(p);
      setAppointments(a);
      setReviews(r);
      setSalonInfo(si);
    } catch (e) {
      console.error('Error loading salon data:', e);
    }
  }, []);

  useEffect(() => {
    loadAllData();
    // Simulate brief luxury intro reveal
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1200);
    return () => clearTimeout(timer);
  }, [loadAllData]);

  // Open booking handlers
  const handleOpenBooking = (service?: Service, stylist?: Stylist, pkg?: PackageItem) => {
    setPreSelectedService(service || null);
    setPreSelectedStylist(stylist || null);
    setPreSelectedPackage(pkg || null);
    setIsBookingOpen(true);
  };

  const handleBookingSuccess = (newAppointment: Appointment) => {
    setAppointments(prev => [newAppointment, ...prev]);
  };

  const handleReviewAdded = (newReview: Review) => {
    setReviews(prev => [newReview, ...prev]);
  };

  // Introductory Loading Screen
  if (isLoading || !salonInfo) {
    return (
      <div className="fixed inset-0 z-50 bg-[#0A0A0C] flex flex-col items-center justify-center">
        <div className="relative flex flex-col items-center animate-fade-in">
          {/* Logo Monogram */}
          <div className="w-16 h-16 rounded-full border-2 border-gold-400 bg-black flex items-center justify-center mb-6 shadow-gold-glow animate-pulse">
            <span className="font-serif text-3xl font-bold text-gold-400">G</span>
          </div>

          <h1 className="font-serif tracking-[0.35em] text-3xl sm:text-4xl font-bold gold-text-gradient uppercase mb-2">
            GLOVA
          </h1>
          <p className="text-[10px] tracking-[0.4em] text-luxe-muted uppercase mb-8">
            Premium Unisex Salon & Studio
          </p>

          <div className="w-48 h-0.5 bg-white/10 rounded-full overflow-hidden relative">
            <div className="h-full bg-gradient-to-r from-gold-500 via-gold-300 to-gold-500 animate-shimmer" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-luxe-black text-luxe-ivory font-sans selection:bg-gold-500 selection:text-black">
      {/* Sticky Translucent Navbar */}
      <Navbar
        onOpenBooking={() => handleOpenBooking()}
        onOpenAdmin={() => setIsAdminOpen(true)}
        salonInfo={salonInfo}
      />

      {/* Hero Section */}
      <Hero onOpenBooking={() => handleOpenBooking()} />

      {/* About GLOVA & Philosophy */}
      <AboutSection />

      {/* Men's and Women's Services & Filtering */}
      <ServicesSection
        services={services}
        onBookService={(srv) => handleOpenBooking(srv)}
      />

      {/* Pricing, Packages & VIP Privilege */}
      <PackagesSection
        packages={packages}
        onBookPackage={(pkg) => handleOpenBooking(undefined, undefined, pkg)}
      />

      {/* Visual Portfolio Gallery & Before/After Slider */}
      <GallerySection gallery={initialGallery} />

      {/* Master Stylists Team */}
      <StylistsSection
        stylists={stylists}
        onBookStylist={(stylist) => handleOpenBooking(undefined, stylist)}
      />

      {/* Client Testimonials */}
      <TestimonialsSection
        reviews={reviews}
        onReviewAdded={handleReviewAdded}
      />

      {/* Contact & Map Sanctuary */}
      <ContactSection salonInfo={salonInfo} />

      {/* Editorial Footer */}
      <Footer
        salonInfo={salonInfo}
        onOpenBooking={() => handleOpenBooking()}
        onOpenAdmin={() => setIsAdminOpen(true)}
      />

      {/* Online Booking Modal */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        services={services}
        stylists={stylists}
        packages={packages}
        initialService={preSelectedService}
        initialStylist={preSelectedStylist}
        initialPackage={preSelectedPackage}
        onBookingSuccess={handleBookingSuccess}
      />

      {/* Protected Admin Dashboard */}
      <AdminDashboard
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        appointments={appointments}
        services={services}
        stylists={stylists}
        packages={packages}
        salonInfo={salonInfo}
        onDataChanged={loadAllData}
      />
    </div>
  );
};
