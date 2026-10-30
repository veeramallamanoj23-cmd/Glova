import React, { useState, useEffect } from 'react';
import { Sparkles, Calendar, Menu, X, Shield, PhoneCall } from 'lucide-react';
import { SalonInfo } from '../types';

interface NavbarProps {
  onOpenBooking: () => void;
  onOpenAdmin: () => void;
  salonInfo: SalonInfo;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenBooking, onOpenAdmin, salonInfo }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);

      // Simple scroll spy
      const sections = ['home', 'about', 'services-menu', 'packages', 'gallery', 'stylists', 'contact'];
      const scrollPosition = window.scrollY + 200;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '#home', id: 'home' },
    { label: 'Services', href: '#services-menu', id: 'services-menu' },
    { label: 'Packages', href: '#packages', id: 'packages' },
    { label: 'Gallery', href: '#gallery', id: 'gallery' },
    { label: 'Stylists', href: '#stylists', id: 'stylists' },
    { label: 'About Us', href: '#about', id: 'about' },
    { label: 'Contact', href: '#contact', id: 'contact' },
  ];

  return (
    <>
      {/* Top Announcement Bar */}
      {salonInfo.announcementBanner && (
        <div className="bg-gradient-to-r from-[#171408] via-[#2A230F] to-[#171408] border-b border-gold-500/20 py-2 px-4 text-center text-xs tracking-wider text-gold-200">
          <div className="max-w-7xl mx-auto flex items-center justify-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-gold-400 animate-pulse" />
            <span>{salonInfo.announcementBanner}</span>
            <a href="#packages" className="underline font-semibold text-gold-400 hover:text-gold-200 ml-1">
              View Packages &rarr;
            </a>
          </div>
        </div>
      )}

      {/* Main Sticky Navbar */}
      <nav
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-luxe-black/90 backdrop-blur-xl border-b border-gold-500/15 shadow-2xl py-3.5'
            : 'bg-gradient-to-b from-black/80 to-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo */}
          <a href="#home" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-full border border-gold-500/40 bg-black/60 flex items-center justify-center group-hover:border-gold-400 transition-colors shadow-gold-glow">
              <span className="font-serif text-xl font-bold text-gold-400 group-hover:scale-110 transition-transform">
                G
              </span>
            </div>
            <div className="flex flex-col">
              <span className="font-serif tracking-[0.28em] text-2xl font-bold gold-text-gradient uppercase">
                GLOVA
              </span>
              <span className="text-[9px] tracking-[0.32em] text-luxe-muted uppercase -mt-0.5">
                Luxury Unisex Studio
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center space-x-7 text-xs font-medium tracking-widest uppercase">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.id}
                  href={link.href}
                  className={`transition-all duration-200 relative py-1 ${
                    isActive
                      ? 'text-gold-400 font-semibold'
                      : 'text-luxe-ivory/80 hover:text-gold-300'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-gold-400 to-transparent rounded-full" />
                  )}
                </a>
              );
            })}
          </div>

          {/* Action CTAs */}
          <div className="hidden md:flex items-center space-x-3">
            {/* Quick Call Button */}
            <a
              href={`tel:${salonInfo.phoneClean}`}
              className="p-2.5 rounded-full border border-gold-500/20 text-gold-300 hover:text-gold-200 hover:border-gold-400 transition-all hover:bg-gold-500/10"
              title={`Call concierge at ${salonInfo.phone}`}
            >
              <PhoneCall className="w-4 h-4" />
            </a>

            {/* Admin Portal Gateway */}
            <button
              onClick={onOpenAdmin}
              className="p-2.5 rounded-full border border-gold-500/20 text-luxe-muted hover:text-gold-400 hover:border-gold-500/40 transition-all hover:bg-gold-500/5"
              title="Admin Portal"
            >
              <Shield className="w-4 h-4" />
            </button>

            {/* Book Appointment CTA Button */}
            <button
              onClick={onOpenBooking}
              className="gold-glow-btn px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-2 group"
            >
              <Calendar className="w-3.5 h-3.5 text-black group-hover:rotate-12 transition-transform" />
              <span>Book Appointment</span>
            </button>
          </div>

          {/* Mobile Menu Hamburger */}
          <div className="flex md:hidden items-center space-x-2">
            <button
              onClick={onOpenBooking}
              className="gold-glow-btn px-3 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wider flex items-center gap-1.5"
            >
              <Calendar className="w-3 h-3 text-black" />
              <span>Book</span>
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg border border-gold-500/30 text-gold-400 hover:bg-gold-500/10 focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-luxe-dark/98 backdrop-blur-2xl border-b border-gold-500/20 px-6 py-6 transition-all duration-300">
            <div className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`text-sm tracking-widest uppercase transition-colors ${
                    activeSection === link.id
                      ? 'text-gold-400 font-bold'
                      : 'text-luxe-ivory/80 hover:text-gold-300'
                  }`}
                >
                  {link.label}
                </a>
              ))}
              <div className="pt-4 border-t border-gold-500/20 flex flex-col gap-3">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenBooking();
                  }}
                  className="gold-glow-btn w-full py-3 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2"
                >
                  <Calendar className="w-4 h-4 text-black" />
                  <span>Book Appointment Online</span>
                </button>
                <div className="flex justify-between items-center pt-2 text-xs text-luxe-muted">
                  <a
                    href={`tel:${salonInfo.phoneClean}`}
                    className="flex items-center gap-1.5 text-gold-300 hover:underline"
                  >
                    <PhoneCall className="w-3.5 h-3.5" />
                    <span>{salonInfo.phone}</span>
                  </a>
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onOpenAdmin();
                    }}
                    className="flex items-center gap-1.5 text-luxe-muted hover:text-gold-400"
                  >
                    <Shield className="w-3.5 h-3.5" />
                    <span>Admin Access</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </nav>
    </>
  );
};
