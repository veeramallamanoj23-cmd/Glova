import React, { useState, useEffect, useMemo } from 'react';
import { Service, Stylist, PackageItem, Appointment } from '../types';
import { createAppointment, getAppointments } from '../services/db';
import confetti from 'canvas-confetti';
import { 
  X, Calendar, Clock, User, Phone, Mail, Sparkles, CheckCircle2, 
  AlertCircle, ArrowRight, ArrowLeft, Download, MessageSquare, ShieldCheck 
} from 'lucide-react';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  services: Service[];
  stylists: Stylist[];
  packages: PackageItem[];
  initialService?: Service | null;
  initialStylist?: Stylist | null;
  initialPackage?: PackageItem | null;
  onBookingSuccess?: (appointment: Appointment) => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  services,
  stylists,
  packages,
  initialService,
  initialStylist,
  initialPackage,
  onBookingSuccess
}) => {
  // Step in wizard: 1 = Service & Stylist, 2 = Date & Slot, 3 = Client Details, 4 = Confirmation
  const [step, setStep] = useState<number>(1);

  // Form selection states
  const [genderCategory, setGenderCategory] = useState<'all' | 'men' | 'women'>('all');
  const [selectedServiceId, setSelectedServiceId] = useState<string>('');
  const [selectedStylistId, setSelectedStylistId] = useState<string>('');
  const [appointmentDate, setAppointmentDate] = useState<string>('');
  const [timeSlot, setTimeSlot] = useState<string>('');
  const [customerName, setCustomerName] = useState<string>('');
  const [customerPhone, setCustomerPhone] = useState<string>('');
  const [customerEmail, setCustomerEmail] = useState<string>('');
  const [notes, setNotes] = useState<string>('');

  // Processing & Error states
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [confirmedAppointment, setConfirmedAppointment] = useState<Appointment | null>(null);

  // Existing appointments to detect booked slots
  const [existingAppointments, setExistingAppointments] = useState<Appointment[]>([]);

  // Load existing bookings on modal open
  useEffect(() => {
    if (isOpen) {
      getAppointments().then(setExistingAppointments);
    }
  }, [isOpen]);

  // Set default minimum date to today
  const todayStr = useMemo(() => new Date().toISOString().split('T')[0], []);

  // Sync initial props
  useEffect(() => {
    if (initialService) {
      setSelectedServiceId(initialService.id);
      setGenderCategory(initialService.category === 'unisex' ? 'all' : initialService.category);
    } else if (initialPackage) {
      // Create synthetic ID for packages
      setSelectedServiceId('pkg-' + initialPackage.id);
    } else if (services.length > 0 && !selectedServiceId) {
      setSelectedServiceId(services[0].id);
    }

    if (initialStylist) {
      setSelectedStylistId(initialStylist.id);
    }

    // Default to tomorrow's date if not set
    if (!appointmentDate) {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      setAppointmentDate(tomorrow.toISOString().split('T')[0]);
    }
  }, [initialService, initialStylist, initialPackage, services, isOpen]);

  // Resolve currently selected service details (could be standard service or package)
  const currentSelectedService = useMemo(() => {
    if (selectedServiceId.startsWith('pkg-')) {
      const cleanPkgId = selectedServiceId.replace('pkg-', '');
      const foundPkg = packages.find(p => p.id === cleanPkgId);
      if (foundPkg) {
        return {
          id: 'pkg-' + foundPkg.id,
          name: foundPkg.name,
          category: foundPkg.category === 'men' ? 'men' : foundPkg.category === 'women' ? 'women' : 'unisex',
          price: foundPkg.discountedPrice,
          duration: foundPkg.duration,
          image: foundPkg.image,
          requiresConsultation: false
        };
      }
    }
    return services.find(s => s.id === selectedServiceId) || services[0];
  }, [selectedServiceId, services, packages]);

  const selectedStylist = useMemo(() => {
    return stylists.find(s => s.id === selectedStylistId);
  }, [selectedStylistId, stylists]);

  // Available Time Slots list
  const allTimeSlots = [
    '10:00 AM', '11:00 AM', '12:00 PM', '01:00 PM', 
    '02:30 PM', '03:30 PM', '04:30 PM', '05:30 PM', 
    '06:30 PM', '07:30 PM', '08:30 PM'
  ];

  // Calculate unavailable slots for selected date & stylist
  const unavailableSlots = useMemo(() => {
    if (!appointmentDate) return new Set<string>();

    const occupied = new Set<string>();
    existingAppointments.forEach(apt => {
      if (
        apt.date === appointmentDate && 
        apt.status !== 'cancelled' &&
        (!selectedStylistId || !apt.stylistId || apt.stylistId === selectedStylistId)
      ) {
        occupied.add(apt.timeSlot);
      }
    });
    return occupied;
  }, [existingAppointments, appointmentDate, selectedStylistId]);

  // Filtered services based on gender tab
  const selectableServices = useMemo(() => {
    return services.filter(s => {
      if (!s.isAvailable) return false;
      if (genderCategory === 'all') return true;
      return s.category === genderCategory;
    });
  }, [services, genderCategory]);

  if (!isOpen) return null;

  // Validation handlers
  const handleProceedToDate = () => {
    setErrorMessage('');
    if (!selectedServiceId) {
      setErrorMessage('Please choose a service or package.');
      return;
    }
    setStep(2);
  };

  const handleProceedToClientDetails = () => {
    setErrorMessage('');
    if (!appointmentDate) {
      setErrorMessage('Please select a preferred appointment date.');
      return;
    }
    if (appointmentDate < todayStr) {
      setErrorMessage('Appointments cannot be booked for past dates.');
      return;
    }
    if (!timeSlot) {
      setErrorMessage('Please choose an available time slot.');
      return;
    }
    if (unavailableSlots.has(timeSlot)) {
      setErrorMessage('This time slot is already reserved. Please select another slot.');
      return;
    }
    setStep(3);
  };

  const handleConfirmBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    // Validations
    if (!customerName.trim()) {
      setErrorMessage('Please enter your full name.');
      return;
    }
    const cleanPhone = customerPhone.replace(/\D/g, '');
    if (cleanPhone.length < 10) {
      setErrorMessage('Please enter a valid 10-digit mobile number.');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await createAppointment({
        customerName: customerName.trim(),
        customerPhone: customerPhone.trim(),
        customerEmail: customerEmail.trim() || undefined,
        serviceId: currentSelectedService?.id || 'service',
        serviceName: currentSelectedService?.name || 'GLOVA Service',
        category: (currentSelectedService?.category as any) || 'unisex',
        stylistId: selectedStylist?.id,
        stylistName: selectedStylist?.name || 'Any Senior Master Stylist',
        date: appointmentDate,
        timeSlot: timeSlot,
        notes: notes.trim() || undefined,
        totalPrice: currentSelectedService?.price || 999
      });

      if (!response.success || !response.appointment) {
        setErrorMessage(response.error || 'Failed to save appointment. Please try again.');
        setIsSubmitting(false);
        return;
      }

      // Success! Confirmed appointment is actually saved in persistence.
      setConfirmedAppointment(response.appointment);
      setStep(4);
      if (onBookingSuccess) {
        onBookingSuccess(response.appointment);
      }

      // Trigger Celebration Confetti
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#D4AF37', '#FAF7F2', '#E5C365', '#B8902A']
        });
      } catch (e) {
        // Confetti optional
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'An error occurred while confirming your reservation.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Helper to generate simple .ics calendar file
  const downloadCalendarEvent = () => {
    if (!confirmedAppointment) return;
    const icsData = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//GLOVA Salon//Appointment Booking//EN',
      'BEGIN:VEVENT',
      `SUMMARY:GLOVA Appointment - ${confirmedAppointment.serviceName}`,
      `DESCRIPTION:Your luxury appointment with ${confirmedAppointment.stylistName}. Ref: ${confirmedAppointment.bookingRef}`,
      `LOCATION:GLOVA Salon, The Grand Boulevard, Indiranagar, Bengaluru`,
      `DTSTART:${confirmedAppointment.date.replace(/-/g, '')}T100000Z`,
      `DTEND:${confirmedAppointment.date.replace(/-/g, '')}T110000Z`,
      'STATUS:CONFIRMED',
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\r\n');

    const blob = new Blob([icsData], { type: 'text/calendar;charset=utf-8' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${confirmedAppointment.bookingRef}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="relative bg-luxe-dark border border-gold-500/30 rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl my-8 overflow-hidden">
        {/* Top Header */}
        <div className="flex items-center justify-between pb-4 border-b border-gold-500/20 mb-6">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-gold-500/20 border border-gold-400 flex items-center justify-center">
              <Calendar className="w-4 h-4 text-gold-400" />
            </div>
            <div>
              <h3 className="font-serif text-xl font-bold text-luxe-ivory">
                Online Reservation
              </h3>
              <span className="text-[10px] uppercase tracking-widest text-gold-400 font-semibold block">
                Step {step} of 4 &bull; {step === 1 ? 'Select Treatment' : step === 2 ? 'Date & Time' : step === 3 ? 'Guest Details' : 'Booking Confirmed'}
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white/10 text-luxe-muted hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Error Banner */}
        {errorMessage && (
          <div className="mb-6 p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-xs text-red-300 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* STEP 1: SERVICE & STYLIST SELECTION */}
        {step === 1 && (
          <div className="space-y-6">
            {/* Gender Switcher */}
            <div>
              <label className="text-xs uppercase tracking-wider text-luxe-muted font-semibold block mb-2">
                1. Select Audience
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'all', label: 'All Services' },
                  { id: 'men', label: "Men's Studio" },
                  { id: 'women', label: "Women's Studio" }
                ].map((g) => (
                  <button
                    key={g.id}
                    type="button"
                    onClick={() => setGenderCategory(g.id as any)}
                    className={`py-2 rounded-xl text-xs font-bold transition-all ${
                      genderCategory === g.id
                        ? 'bg-gold-500 text-black shadow-gold-glow'
                        : 'bg-black/40 text-luxe-muted hover:text-white border border-white/5'
                    }`}
                  >
                    {g.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Service Selection Dropdown / Selector */}
            <div>
              <label className="text-xs uppercase tracking-wider text-luxe-muted font-semibold block mb-2">
                2. Choose Service or Package
              </label>
              <select
                value={selectedServiceId}
                onChange={(e) => setSelectedServiceId(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-black/60 border border-gold-500/30 text-luxe-ivory text-sm focus:outline-none focus:border-gold-400 cursor-pointer"
              >
                <optgroup label="Popular Treatments">
                  {selectableServices.map((srv) => (
                    <option key={srv.id} value={srv.id} className="bg-luxe-dark text-white">
                      {srv.name} — ₹{srv.price} ({srv.duration})
                    </option>
                  ))}
                </optgroup>
                <optgroup label="Curated VIP Packages">
                  {packages.map((pkg) => (
                    <option key={'pkg-' + pkg.id} value={'pkg-' + pkg.id} className="bg-luxe-dark text-white">
                      {pkg.name} — ₹{pkg.discountedPrice} ({pkg.duration})
                    </option>
                  ))}
                </optgroup>
              </select>
            </div>

            {/* Stylist Selection */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs uppercase tracking-wider text-luxe-muted font-semibold">
                  3. Select Preferred Artist (Optional)
                </label>
                <span className="text-[10px] text-gold-400">Any Available ensures maximum slot options</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-48 overflow-y-auto pr-1">
                <div
                  onClick={() => setSelectedStylistId('')}
                  className={`p-3 rounded-xl border cursor-pointer transition-all flex items-center gap-3 ${
                    selectedStylistId === ''
                      ? 'bg-gold-500/15 border-gold-400 text-gold-300'
                      : 'bg-black/30 border-white/5 text-luxe-muted hover:text-white'
                  }`}
                >
                  <div className="w-8 h-8 rounded-full bg-gold-500/20 flex items-center justify-center font-serif font-bold text-xs text-gold-400">
                    ★
                  </div>
                  <div className="text-left">
                    <p className="text-xs font-bold text-luxe-ivory">Any Master Stylist</p>
                    <p className="text-[10px] text-luxe-muted">Recommended for fast scheduling</p>
                  </div>
                </div>

                {stylists.map((st) => (
                  <div
                    key={st.id}
                    onClick={() => setSelectedStylistId(st.id)}
                    className={`p-3 rounded-xl border cursor-pointer transition-all flex items-center gap-3 ${
                      selectedStylistId === st.id
                        ? 'bg-gold-500/15 border-gold-400 text-gold-300'
                        : 'bg-black/30 border-white/5 text-luxe-muted hover:text-white'
                    }`}
                  >
                    <img
                      src={st.image}
                      alt={st.name}
                      className="w-8 h-8 rounded-full object-cover border border-gold-500/30"
                    />
                    <div className="text-left overflow-hidden">
                      <p className="text-xs font-bold text-luxe-ivory truncate">{st.name}</p>
                      <p className="text-[10px] text-gold-400 truncate">{st.title}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Price Preview & Proceed */}
            <div className="pt-4 border-t border-gold-500/15 flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase tracking-wider text-luxe-muted block">Estimated Total</span>
                <span className="font-serif text-2xl font-bold text-gold-400">
                  ₹{currentSelectedService?.price?.toLocaleString('en-IN') || 0}
                </span>
              </div>

              <button
                type="button"
                onClick={handleProceedToDate}
                className="gold-glow-btn px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-2"
              >
                <span>Select Date & Slot</span>
                <ArrowRight className="w-4 h-4 text-black" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: DATE & TIME SLOT PICKER */}
        {step === 2 && (
          <div className="space-y-6">
            <div>
              <label className="text-xs uppercase tracking-wider text-luxe-muted font-semibold block mb-2">
                1. Choose Date
              </label>
              <input
                type="date"
                min={todayStr}
                value={appointmentDate}
                onChange={(e) => {
                  setAppointmentDate(e.target.value);
                  setTimeSlot(''); // Reset slot on date change
                }}
                className="w-full px-4 py-3 rounded-xl bg-black/60 border border-gold-500/30 text-luxe-ivory text-sm focus:outline-none focus:border-gold-400"
              />
              <span className="text-[10px] text-luxe-muted mt-1 block">
                * Bookings can be made up to 30 days in advance. Past dates are automatically disabled.
              </span>
            </div>

            {/* Time Slots Matrix */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs uppercase tracking-wider text-luxe-muted font-semibold">
                  2. Choose Available Time Slot
                </label>
                <div className="flex items-center gap-3 text-[10px]">
                  <span className="flex items-center gap-1 text-luxe-muted">
                    <span className="w-2 h-2 rounded-full bg-gold-400" /> Available
                  </span>
                  <span className="flex items-center gap-1 text-luxe-muted">
                    <span className="w-2 h-2 rounded-full bg-red-400/60" /> Booked
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-3 sm:grid-cols-4 gap-2.5">
                {allTimeSlots.map((slot) => {
                  const isBooked = unavailableSlots.has(slot);
                  const isSelected = timeSlot === slot;

                  return (
                    <button
                      key={slot}
                      type="button"
                      disabled={isBooked}
                      onClick={() => setTimeSlot(slot)}
                      className={`py-2.5 px-3 rounded-xl text-xs font-semibold transition-all relative ${
                        isBooked
                          ? 'bg-black/20 text-luxe-muted/40 border border-transparent cursor-not-allowed line-through'
                          : isSelected
                          ? 'bg-gold-500 text-black font-bold shadow-gold-glow'
                          : 'bg-black/50 text-luxe-ivory hover:text-gold-300 hover:border-gold-500/40 border border-white/5'
                      }`}
                    >
                      {slot}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Summary strip */}
            <div className="p-3.5 rounded-xl bg-black/40 border border-white/5 text-xs text-luxe-muted flex items-center justify-between">
              <div>
                <span className="block text-luxe-ivory font-medium">{currentSelectedService?.name}</span>
                <span className="text-[10px]">Stylist: {selectedStylist?.name || 'Any Senior Artist'}</span>
              </div>
              <span className="font-serif font-bold text-gold-400">
                ₹{currentSelectedService?.price}
              </span>
            </div>

            {/* Nav buttons */}
            <div className="pt-4 border-t border-gold-500/15 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="px-4 py-2.5 rounded-xl border border-white/10 text-xs text-luxe-muted hover:text-white flex items-center gap-1.5"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back</span>
              </button>

              <button
                type="button"
                onClick={handleProceedToClientDetails}
                className="gold-glow-btn px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-2"
              >
                <span>Continue to Details</span>
                <ArrowRight className="w-4 h-4 text-black" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: CUSTOMER DETAILS FORM */}
        {step === 3 && (
          <form onSubmit={handleConfirmBooking} className="space-y-4">
            <div>
              <label className="text-[11px] font-semibold uppercase tracking-wider text-luxe-muted block mb-1">
                Customer Full Name *
              </label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gold-400" />
                <input
                  type="text"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="e.g. Natasha Singhal"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-black/60 border border-gold-500/25 text-white text-xs focus:outline-none focus:border-gold-400"
                  required
                />
              </div>
            </div>

            <div>
              <label className="text-[11px] font-semibold uppercase tracking-wider text-luxe-muted block mb-1">
                Mobile Number * (10 Digits)
              </label>
              <div className="relative">
                <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gold-400" />
                <input
                  type="tel"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  placeholder="+91 98765 43210"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-black/60 border border-gold-500/25 text-white text-xs focus:outline-none focus:border-gold-400"
                  required
                />
              </div>
            </div>

            <div>
              <label className="text-[11px] font-semibold uppercase tracking-wider text-luxe-muted block mb-1">
                Email Address (Optional, for calendar invite)
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gold-400" />
                <input
                  type="email"
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  placeholder="natasha@example.com"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-black/60 border border-gold-500/25 text-white text-xs focus:outline-none focus:border-gold-400"
                />
              </div>
            </div>

            <div>
              <label className="text-[11px] font-semibold uppercase tracking-wider text-luxe-muted block mb-1">
                Special Requests or Styling Notes
              </label>
              <textarea
                rows={2}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="e.g. Skin sensitivity, specific haircut reference, wedding date..."
                className="w-full px-3.5 py-2 rounded-xl bg-black/60 border border-gold-500/25 text-white text-xs focus:outline-none focus:border-gold-400"
              />
            </div>

            {/* Final Booking Summary Box */}
            <div className="p-4 rounded-xl bg-black/50 border border-gold-500/20 text-xs space-y-1.5">
              <div className="flex justify-between">
                <span className="text-luxe-muted">Selected Treatment:</span>
                <span className="text-white font-medium">{currentSelectedService?.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-luxe-muted">Date & Time:</span>
                <span className="text-gold-300 font-medium">{appointmentDate} at {timeSlot}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-luxe-muted">Stylist:</span>
                <span className="text-white">{selectedStylist?.name || 'Any Senior Artist'}</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-white/5 font-semibold">
                <span className="text-luxe-ivory">Total Payable at Salon:</span>
                <span className="text-gold-400 font-serif text-base">₹{currentSelectedService?.price?.toLocaleString('en-IN')}</span>
              </div>
            </div>

            <div className="pt-4 border-t border-gold-500/15 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="px-4 py-2.5 rounded-xl border border-white/10 text-xs text-luxe-muted hover:text-white flex items-center gap-1.5"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back</span>
              </button>

              <button
                type="submit"
                disabled={isSubmitting}
                className="gold-glow-btn px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-2"
              >
                {isSubmitting ? (
                  <span>Saving Reservation...</span>
                ) : (
                  <>
                    <ShieldCheck className="w-4 h-4 text-black" />
                    <span>Confirm & Reserve Slot</span>
                  </>
                )}
              </button>
            </div>
          </form>
        )}

        {/* STEP 4: SUCCESS CONFIRMATION SCREEN */}
        {step === 4 && confirmedAppointment && (
          <div className="text-center py-4 space-y-6 animate-fade-in">
            <div className="w-16 h-16 rounded-full bg-gold-500/20 border-2 border-gold-400 flex items-center justify-center mx-auto text-gold-400 shadow-gold-glow animate-bounce">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div>
              <span className="text-[10px] uppercase tracking-[0.25em] text-gold-400 font-bold block mb-1">
                Reservation Confirmed
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-luxe-ivory">
                We Await Your Presence, {confirmedAppointment.customerName}!
              </h3>
              <p className="text-xs text-luxe-muted max-w-md mx-auto mt-1">
                Your appointment has been securely registered in our system. A confirmation SMS/WhatsApp has been queued.
              </p>
            </div>

            {/* Digital Pass / Booking Card */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-black via-luxe-card to-black border border-gold-500/40 text-left max-w-md mx-auto shadow-2xl relative">
              <div className="flex items-center justify-between border-b border-gold-500/20 pb-3 mb-3">
                <div>
                  <span className="font-serif tracking-widest text-lg font-bold gold-text-gradient">GLOVA</span>
                  <span className="text-[9px] uppercase tracking-wider text-luxe-muted block">Exclusive Guest Pass</span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-luxe-muted uppercase block">Booking Reference</span>
                  <span className="font-mono text-xs font-bold text-gold-300">{confirmedAppointment.bookingRef}</span>
                </div>
              </div>

              <div className="space-y-2 text-xs">
                <div>
                  <span className="text-luxe-muted text-[10px] uppercase block">Treatment</span>
                  <span className="text-white font-semibold">{confirmedAppointment.serviceName}</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <span className="text-luxe-muted text-[10px] uppercase block">Date & Time</span>
                    <span className="text-gold-200 font-medium">{confirmedAppointment.date} &bull; {confirmedAppointment.timeSlot}</span>
                  </div>
                  <div>
                    <span className="text-luxe-muted text-[10px] uppercase block">Master Stylist</span>
                    <span className="text-white">{confirmedAppointment.stylistName}</span>
                  </div>
                </div>
                <div className="pt-2 border-t border-white/5 flex justify-between items-center">
                  <span className="text-luxe-muted text-[10px] uppercase">Amount Due at Salon</span>
                  <span className="font-serif font-bold text-gold-400 text-base">₹{confirmedAppointment.totalPrice}</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <button
                onClick={downloadCalendarEvent}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-gold-500/30 text-gold-300 hover:text-white hover:border-gold-400 text-xs font-semibold flex items-center justify-center gap-2"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Add to Calendar (.ics)</span>
              </button>

              <a
                href={`https://wa.me/919876543210?text=Hi%20GLOVA,%20I%20have%20confirmed%20my%20booking%20ref%20${confirmedAppointment.bookingRef}%20for%20${confirmedAppointment.date}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-black text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-3.5 h-3.5 fill-black" />
                <span>WhatsApp Notification</span>
              </a>

              <button
                onClick={onClose}
                className="w-full sm:w-auto gold-glow-btn px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider"
              >
                Done
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
