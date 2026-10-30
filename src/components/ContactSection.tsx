import React, { useState } from 'react';
import { SalonInfo } from '../types';
import { MapPin, Phone, Mail, Clock, MessageSquare, Send, CheckCircle2, ArrowUpRight } from 'lucide-react';

interface ContactSectionProps {
  salonInfo: SalonInfo;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ salonInfo }) => {
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !contact || !message) return;
    setSent(true);
    setTimeout(() => {
      setSent(false);
      setName('');
      setContact('');
      setMessage('');
    }, 3000);
  };

  return (
    <section id="contact" className="py-24 bg-gradient-to-t from-black via-luxe-dark to-luxe-black border-t border-gold-500/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-300 text-xs font-semibold uppercase tracking-widest mb-4">
            <MapPin className="w-3.5 h-3.5 text-gold-400" />
            <span>Atelier & Concierge</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-luxe-ivory mb-4">
            Visit Our <span className="gold-text-gradient italic font-normal">Sanctuary.</span>
          </h2>
          <p className="text-sm sm:text-base text-luxe-muted leading-relaxed">
            Conveniently situated in the city's premier luxury boulevard with valet parking and private elevator access.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Contact Details Card (5 cols) */}
          <div className="lg:col-span-5 mobbin-card rounded-3xl p-8 flex flex-col justify-between">
            <div>
              <span className="text-[10px] uppercase tracking-widest text-gold-400 font-bold block mb-2">
                Direct Inquiries
              </span>
              <h3 className="font-serif text-2xl font-bold text-luxe-ivory mb-6">
                GLOVA Concierge Desk
              </h3>

              <div className="space-y-6">
                {/* Address */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-gold-500/10 border border-gold-500/30 flex items-center justify-center shrink-0 text-gold-400">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase tracking-widest text-luxe-muted block">Salon Location</span>
                    <p className="text-xs sm:text-sm text-luxe-ivory leading-relaxed mt-0.5">
                      {salonInfo.address}
                    </p>
                  </div>
                </div>

                {/* Clickable Phone Number */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-gold-500/10 border border-gold-500/30 flex items-center justify-center shrink-0 text-gold-400">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase tracking-widest text-luxe-muted block">Phone (Click to call)</span>
                    <a
                      href={`tel:${salonInfo.phoneClean}`}
                      className="text-sm font-semibold text-gold-300 hover:text-gold-200 transition-colors inline-flex items-center gap-1.5 mt-0.5"
                    >
                      <span>{salonInfo.phone}</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>

                {/* Clickable Email */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-gold-500/10 border border-gold-500/30 flex items-center justify-center shrink-0 text-gold-400">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase tracking-widest text-luxe-muted block">Email Concierge</span>
                    <a
                      href={`mailto:${salonInfo.email}`}
                      className="text-sm font-semibold text-gold-300 hover:text-gold-200 transition-colors inline-flex items-center gap-1.5 mt-0.5"
                    >
                      <span>{salonInfo.email}</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>

                {/* Operating Hours */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-gold-500/10 border border-gold-500/30 flex items-center justify-center shrink-0 text-gold-400">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <span className="text-[10px] uppercase tracking-widest text-luxe-muted block">Studio Timings</span>
                    <div className="text-xs text-luxe-ivory mt-1 space-y-1">
                      <div className="flex justify-between">
                        <span className="text-luxe-muted">Monday – Friday:</span>
                        <span className="font-medium text-gold-200">{salonInfo.hours.weekdays}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-luxe-muted">Saturday:</span>
                        <span className="font-medium text-gold-200">{salonInfo.hours.saturday}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-luxe-muted">Sunday:</span>
                        <span className="font-medium text-gold-200">{salonInfo.hours.sunday}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Direct WhatsApp Chat Action */}
            <div className="mt-8 pt-6 border-t border-gold-500/15">
              <a
                href={`https://wa.me/${salonInfo.whatsapp}?text=Hello%20GLOVA%20Concierge,%20I%20would%20like%20to%20inquire%20about%20booking%20an%20appointment.`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-black text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
              >
                <MessageSquare className="w-4 h-4 fill-black" />
                <span>Chat Instantly on WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Contact Inquiry Form & Interactive Map (7 cols) */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            {/* Quick Inquiry Form */}
            <div className="mobbin-card rounded-3xl p-8">
              <h3 className="font-serif text-xl font-bold text-luxe-ivory mb-2">
                Send a Bespoke Request
              </h3>
              <p className="text-xs text-luxe-muted mb-6">
                Have a question regarding pre-bridal makeup packages, chemical consultations, or private group bookings?
              </p>

              {sent ? (
                <div className="p-6 rounded-2xl bg-gold-500/10 border border-gold-400 text-center animate-fade-in">
                  <CheckCircle2 className="w-10 h-10 text-gold-400 mx-auto mb-2" />
                  <h4 className="font-serif text-base font-bold text-white">Message Received</h4>
                  <p className="text-xs text-luxe-muted mt-1">Our concierge desk will respond to you within 2 business hours.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[11px] font-semibold uppercase tracking-wider text-luxe-muted block mb-1">
                        Your Name
                      </label>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="John Doe"
                        className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-gold-500/20 text-white text-xs focus:outline-none focus:border-gold-400"
                        required
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-semibold uppercase tracking-wider text-luxe-muted block mb-1">
                        Phone or Email
                      </label>
                      <input
                        type="text"
                        value={contact}
                        onChange={(e) => setContact(e.target.value)}
                        placeholder="+91 98765 00000 / email"
                        className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-gold-500/20 text-white text-xs focus:outline-none focus:border-gold-400"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold uppercase tracking-wider text-luxe-muted block mb-1">
                      Inquiry Details
                    </label>
                    <textarea
                      rows={3}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Tell us about the desired treatment, date preference, or bridal query..."
                      className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-gold-500/20 text-white text-xs focus:outline-none focus:border-gold-400"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="gold-glow-btn px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2"
                  >
                    <Send className="w-3.5 h-3.5 text-black" />
                    <span>Send Inquiry to Concierge</span>
                  </button>
                </form>
              )}
            </div>

            {/* Embedded Luxury Map Graphic / Interactive Link */}
            <div className="relative h-64 rounded-3xl overflow-hidden border border-gold-500/20 shadow-2xl group">
              <iframe
                title="GLOVA Salon Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.9855325852936!2d77.6405!3d12.9719!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae16815a5f459f%3A0x67980599a80b85a!2sIndiranagar%2C%20Bengaluru%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                className="w-full h-full border-0 filter grayscale invert contrast-125 opacity-85 group-hover:opacity-100 transition-opacity"
                loading="lazy"
              />
              <div className="absolute bottom-4 left-4 right-4 p-3 rounded-xl bg-black/80 backdrop-blur-md border border-gold-500/30 flex items-center justify-between pointer-events-none">
                <div className="flex items-center gap-2 text-xs text-gold-300 font-semibold">
                  <MapPin className="w-4 h-4 text-gold-400" />
                  <span>The Grand Boulevard, Indiranagar, Bengaluru</span>
                </div>
                <span className="text-[10px] text-luxe-muted uppercase tracking-wider">
                  Valet Available
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
