import React, { useState } from 'react';
import { 
  Appointment, Service, Stylist, PackageItem, SalonInfo 
} from '../types';
import { 
  updateAppointmentStatus, saveService, deleteService, 
  saveStylist, updateSalonInfo, resetAllDataToDefaults, isSupabaseConfigured 
} from '../services/db';
import { 
  Shield, X, Lock, Key, Users, Calendar, Scissors, Settings, 
  Check, AlertTriangle, Trash2, Edit3, Plus, Download, RefreshCw, 
  CheckCircle, Database, Phone, Clock, DollarSign 
} from 'lucide-react';

interface AdminDashboardProps {
  isOpen: boolean;
  onClose: () => void;
  appointments: Appointment[];
  services: Service[];
  stylists: Stylist[];
  packages: PackageItem[];
  salonInfo: SalonInfo;
  onDataChanged: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  isOpen,
  onClose,
  appointments,
  services,
  stylists,
  packages,
  salonInfo,
  onDataChanged
}) => {
  // Authentication state
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pinCode, setPinCode] = useState('');
  const [authError, setAuthError] = useState('');

  // Active Admin Tab
  const [activeTab, setActiveTab] = useState<'appointments' | 'services' | 'stylists' | 'settings'>('appointments');

  // Appointments filter
  const [statusFilter, setStatusFilter] = useState<'all' | 'confirmed' | 'pending' | 'completed' | 'cancelled'>('all');

  // Service Edit / Add Modal state
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [isNewService, setIsNewService] = useState(false);

  // Settings form state
  const [hoursWeekdays, setHoursWeekdays] = useState(salonInfo.hours.weekdays);
  const [hoursSaturday, setHoursSaturday] = useState(salonInfo.hours.saturday);
  const [hoursSunday, setHoursSunday] = useState(salonInfo.hours.sunday);
  const [phone, setPhone] = useState(salonInfo.phone);
  const [email, setEmail] = useState(salonInfo.email);
  const [announcement, setAnnouncement] = useState(salonInfo.announcementBanner || '');
  const [settingsSaved, setSettingsSaved] = useState(false);

  if (!isOpen) return null;

  // Handle Login PIN (Default master pin: admin123 or 2026)
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinCode === 'admin123' || pinCode === '2026' || pinCode === 'glova') {
      setIsAuthenticated(true);
      setAuthError('');
    } else {
      setAuthError('Invalid Access Code. Default demo code is: admin123');
    }
  };

  // Appointment Status Updater
  const handleUpdateStatus = async (id: string, newStatus: Appointment['status']) => {
    await updateAppointmentStatus(id, newStatus);
    onDataChanged();
  };

  // Save Service
  const handleSaveService = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingService) return;
    await saveService(editingService);
    setEditingService(null);
    setIsNewService(false);
    onDataChanged();
  };

  // Delete Service
  const handleDeleteService = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this treatment from the menu?')) {
      await deleteService(id);
      onDataChanged();
    }
  };

  // Save Salon Settings
  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateSalonInfo({
      ...salonInfo,
      phone,
      phoneClean: phone.replace(/[^\d+]/g, ''),
      email,
      announcementBanner: announcement,
      hours: {
        weekdays: hoursWeekdays,
        saturday: hoursSaturday,
        sunday: hoursSunday
      }
    });
    setSettingsSaved(true);
    setTimeout(() => setSettingsSaved(false), 2500);
    onDataChanged();
  };

  // Export Bookings to CSV
  const exportToCSV = () => {
    const headers = ['BookingRef', 'CustomerName', 'Phone', 'Email', 'Service', 'Category', 'Stylist', 'Date', 'Time', 'Price', 'Status'];
    const rows = appointments.map(a => [
      a.bookingRef,
      `"${a.customerName}"`,
      `"${a.customerPhone}"`,
      `"${a.customerEmail || ''}"`,
      `"${a.serviceName}"`,
      a.category,
      `"${a.stylistName || 'Any'}"`,
      a.date,
      a.timeSlot,
      a.totalPrice,
      a.status
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `GLOVA_Bookings_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Filtered appointments
  const filteredAppointments = appointments.filter(a => {
    if (statusFilter === 'all') return true;
    return a.status === statusFilter;
  });

  // Calculate statistics
  const totalRevenue = appointments
    .filter(a => a.status === 'confirmed' || a.status === 'completed')
    .reduce((acc, curr) => acc + curr.totalPrice, 0);

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="relative bg-luxe-dark border border-gold-500/30 rounded-3xl max-w-6xl w-full p-6 sm:p-8 shadow-2xl my-8 overflow-hidden">
        {/* Header Bar */}
        <div className="flex items-center justify-between pb-4 border-b border-gold-500/20 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gold-500/20 border border-gold-400 flex items-center justify-center text-gold-400">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-luxe-ivory">
                  GLOVA Administration Portal
                </h3>
                <span className={`text-[10px] px-2 py-0.5 rounded-full uppercase tracking-wider font-bold ${
                  isSupabaseConfigured 
                    ? 'bg-green-500/20 text-green-300 border border-green-500/30' 
                    : 'bg-gold-500/20 text-gold-300 border border-gold-500/30'
                }`}>
                  {isSupabaseConfigured ? 'Supabase Cloud Connected' : 'Persistent Local Storage'}
                </span>
              </div>
              <p className="text-xs text-luxe-muted">
                Manage appointment bookings, real-time service rates, stylists, and studio operation hours.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2.5 rounded-full hover:bg-white/10 text-luxe-muted hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* LOGIN GATE SCREEN */}
        {!isAuthenticated ? (
          <div className="max-w-md mx-auto py-12 text-center">
            <div className="w-16 h-16 rounded-full bg-gold-500/10 border border-gold-400 flex items-center justify-center mx-auto mb-4 text-gold-400">
              <Lock className="w-8 h-8" />
            </div>
            <h4 className="font-serif text-2xl font-bold text-luxe-ivory mb-2">
              Staff & Concierge Access
            </h4>
            <p className="text-xs text-luxe-muted mb-6">
              Enter your master administrative PIN code to manage bookings and salon catalogs.
            </p>

            {authError && (
              <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-xs text-red-300">
                {authError}
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              <div className="relative">
                <Key className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gold-400" />
                <input
                  type="password"
                  value={pinCode}
                  onChange={(e) => setPinCode(e.target.value)}
                  placeholder="Enter PIN (e.g. admin123)"
                  className="w-full pl-11 pr-4 py-3 rounded-xl bg-black/60 border border-gold-500/30 text-white text-sm focus:outline-none focus:border-gold-400 tracking-widest text-center"
                  autoFocus
                />
              </div>

              <button
                type="submit"
                className="gold-glow-btn w-full py-3 rounded-xl text-xs font-bold uppercase tracking-wider"
              >
                Unlock Dashboard
              </button>

              <p className="text-[11px] text-luxe-muted">
                Demo Admin Code: <span className="text-gold-300 font-mono font-bold">admin123</span>
              </p>
            </form>
          </div>
        ) : (
          /* AUTHENTICATED DASHBOARD */
          <div>
            {/* KPI Summary Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <div className="p-4 rounded-2xl bg-black/40 border border-white/5">
                <span className="text-[10px] uppercase tracking-wider text-luxe-muted block">Total Reservations</span>
                <span className="font-serif text-2xl sm:text-3xl font-bold text-white mt-1 block">
                  {appointments.length}
                </span>
              </div>
              <div className="p-4 rounded-2xl bg-black/40 border border-white/5">
                <span className="text-[10px] uppercase tracking-wider text-green-400 block">Confirmed Slots</span>
                <span className="font-serif text-2xl sm:text-3xl font-bold text-green-400 mt-1 block">
                  {appointments.filter(a => a.status === 'confirmed').length}
                </span>
              </div>
              <div className="p-4 rounded-2xl bg-black/40 border border-white/5">
                <span className="text-[10px] uppercase tracking-wider text-amber-400 block">Pending Review</span>
                <span className="font-serif text-2xl sm:text-3xl font-bold text-amber-400 mt-1 block">
                  {appointments.filter(a => a.status === 'pending').length}
                </span>
              </div>
              <div className="p-4 rounded-2xl bg-black/40 border border-white/5">
                <span className="text-[10px] uppercase tracking-wider text-gold-400 block">Projected Revenue</span>
                <span className="font-serif text-2xl sm:text-3xl font-bold text-gold-400 mt-1 block">
                  ₹{totalRevenue.toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gold-500/15 pb-4 mb-6">
              <div className="flex items-center gap-2">
                {[
                  { id: 'appointments', label: 'Appointments', icon: Calendar },
                  { id: 'services', label: 'Service Menu', icon: Scissors },
                  { id: 'stylists', label: 'Stylist Roster', icon: Users },
                  { id: 'settings', label: 'Salon Settings', icon: Settings },
                ].map((t) => {
                  const Icon = t.icon;
                  return (
                    <button
                      key={t.id}
                      onClick={() => setActiveTab(t.id as any)}
                      className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all ${
                        activeTab === t.id
                          ? 'bg-gold-500 text-black shadow-gold-glow'
                          : 'bg-black/40 text-luxe-muted hover:text-white border border-white/5'
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                      <span>{t.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Utility buttons */}
              <div className="flex items-center gap-2">
                <button
                  onClick={exportToCSV}
                  className="px-3 py-1.5 rounded-lg border border-gold-500/30 text-gold-300 hover:text-white text-xs font-semibold flex items-center gap-1.5"
                  title="Export Bookings to CSV"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Export CSV</span>
                </button>
                <button
                  onClick={() => {
                    if (window.confirm('Reset all demo data back to factory seeds?')) {
                      resetAllDataToDefaults();
                      onDataChanged();
                    }
                  }}
                  className="px-3 py-1.5 rounded-lg border border-red-500/30 text-red-400 hover:bg-red-500/10 text-xs font-semibold flex items-center gap-1.5"
                  title="Reset to demo defaults"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Reset Defaults</span>
                </button>
              </div>
            </div>

            {/* TAB 1: APPOINTMENTS MANAGEMENT */}
            {activeTab === 'appointments' && (
              <div>
                {/* Status Filter row */}
                <div className="flex items-center gap-2 mb-4 overflow-x-auto pb-1">
                  {(['all', 'confirmed', 'pending', 'completed', 'cancelled'] as const).map((st) => (
                    <button
                      key={st}
                      onClick={() => setStatusFilter(st)}
                      className={`px-3 py-1 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all ${
                        statusFilter === st
                          ? 'bg-gold-500/20 text-gold-300 border border-gold-400'
                          : 'bg-black/30 text-luxe-muted hover:text-white border border-white/5'
                      }`}
                    >
                      {st} ({st === 'all' ? appointments.length : appointments.filter(a => a.status === st).length})
                    </button>
                  ))}
                </div>

                {/* Bookings Table */}
                <div className="rounded-2xl border border-gold-500/15 overflow-hidden bg-black/40">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-luxe-card/80 border-b border-gold-500/15 text-luxe-muted uppercase tracking-wider text-[10px]">
                        <tr>
                          <th className="p-3.5">Ref #</th>
                          <th className="p-3.5">Guest</th>
                          <th className="p-3.5">Treatment</th>
                          <th className="p-3.5">Stylist</th>
                          <th className="p-3.5">Date & Slot</th>
                          <th className="p-3.5">Price</th>
                          <th className="p-3.5">Status</th>
                          <th className="p-3.5 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5">
                        {filteredAppointments.length === 0 ? (
                          <tr>
                            <td colSpan={8} className="p-8 text-center text-luxe-muted">
                              No appointments matching this filter.
                            </td>
                          </tr>
                        ) : (
                          filteredAppointments.map((apt) => (
                            <tr key={apt.id} className="hover:bg-white/5 transition-colors">
                              <td className="p-3.5 font-mono text-gold-300 font-bold">
                                {apt.bookingRef}
                              </td>
                              <td className="p-3.5">
                                <p className="font-semibold text-white">{apt.customerName}</p>
                                <p className="text-[10px] text-luxe-muted">{apt.customerPhone}</p>
                              </td>
                              <td className="p-3.5">
                                <p className="font-medium text-white">{apt.serviceName}</p>
                                <span className="text-[9px] uppercase tracking-wider text-gold-400">
                                  {apt.category}
                                </span>
                              </td>
                              <td className="p-3.5 text-luxe-muted">
                                {apt.stylistName || 'Any Master'}
                              </td>
                              <td className="p-3.5">
                                <span className="text-white block font-medium">{apt.date}</span>
                                <span className="text-[10px] text-gold-300">{apt.timeSlot}</span>
                              </td>
                              <td className="p-3.5 font-serif font-bold text-gold-400">
                                ₹{apt.totalPrice.toLocaleString('en-IN')}
                              </td>
                              <td className="p-3.5">
                                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                                  apt.status === 'confirmed'
                                    ? 'bg-green-500/20 text-green-300 border border-green-500/30'
                                    : apt.status === 'pending'
                                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                                    : apt.status === 'completed'
                                    ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                                    : 'bg-red-500/20 text-red-400 border border-red-500/30'
                                }`}>
                                  {apt.status}
                                </span>
                              </td>
                              <td className="p-3.5 text-right">
                                <div className="inline-flex items-center gap-1.5">
                                  {apt.status !== 'confirmed' && (
                                    <button
                                      onClick={() => handleUpdateStatus(apt.id, 'confirmed')}
                                      className="p-1.5 rounded-lg bg-green-500/10 hover:bg-green-500/20 text-green-400"
                                      title="Mark Confirmed"
                                    >
                                      <Check className="w-3.5 h-3.5" />
                                    </button>
                                  )}
                                  {apt.status !== 'completed' && (
                                    <button
                                      onClick={() => handleUpdateStatus(apt.id, 'completed')}
                                      className="p-1.5 rounded-lg bg-blue-500/10 hover:bg-blue-500/20 text-blue-400"
                                      title="Mark Completed"
                                    >
                                      <CheckCircle className="w-3.5 h-3.5" />
                                    </button>
                                  )}
                                  {apt.status !== 'cancelled' && (
                                    <button
                                      onClick={() => handleUpdateStatus(apt.id, 'cancelled')}
                                      className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400"
                                      title="Cancel Appointment"
                                    >
                                      <X className="w-3.5 h-3.5" />
                                    </button>
                                  )}
                                </div>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: SERVICE MENU MANAGEMENT */}
            {activeTab === 'services' && (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs text-luxe-muted">
                    Total Active Services: {services.length}
                  </span>
                  <button
                    onClick={() => {
                      setEditingService({
                        id: 'custom-' + Date.now(),
                        name: '',
                        category: 'unisex',
                        subcategory: 'hair',
                        description: '',
                        duration: '45 mins',
                        durationMinutes: 45,
                        price: 999,
                        image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=800&q=80',
                        isAvailable: true
                      });
                      setIsNewService(true);
                    }}
                    className="gold-glow-btn px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-1.5"
                  >
                    <Plus className="w-3.5 h-3.5 text-black" />
                    <span>Add New Service</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-[500px] overflow-y-auto pr-2">
                  {services.map((srv) => (
                    <div
                      key={srv.id}
                      className="p-4 rounded-2xl bg-black/40 border border-white/5 flex items-start justify-between gap-3"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-serif font-bold text-white text-sm">{srv.name}</h4>
                          <span className="text-[9px] uppercase px-1.5 py-0.5 rounded bg-gold-500/10 text-gold-300">
                            {srv.category}
                          </span>
                        </div>
                        <p className="text-xs text-luxe-muted mt-1 line-clamp-2">{srv.description}</p>
                        <div className="flex items-center gap-3 mt-2 text-xs">
                          <span className="font-serif font-bold text-gold-400">₹{srv.price}</span>
                          <span className="text-luxe-muted">{srv.duration}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => {
                            setEditingService(srv);
                            setIsNewService(false);
                          }}
                          className="p-1.5 rounded-lg hover:bg-white/10 text-gold-300"
                          title="Edit Service"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeleteService(srv.id)}
                          className="p-1.5 rounded-lg hover:bg-white/10 text-red-400"
                          title="Delete Service"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 3: STYLIST ROSTER */}
            {activeTab === 'stylists' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-h-[500px] overflow-y-auto pr-2">
                {stylists.map((st) => (
                  <div key={st.id} className="p-4 rounded-2xl bg-black/40 border border-white/5 flex items-center gap-4">
                    <img src={st.image} alt={st.name} className="w-14 h-14 rounded-full object-cover border border-gold-400" />
                    <div className="flex-1">
                      <h4 className="font-serif font-bold text-white text-sm">{st.name}</h4>
                      <p className="text-[11px] text-gold-300">{st.title}</p>
                      <p className="text-[10px] text-luxe-muted mt-0.5">{st.specialization}</p>
                      <div className="mt-2 flex items-center justify-between">
                        <span className="text-xs text-green-400 font-semibold">Active & Available</span>
                        <span className="text-xs text-gold-400 font-bold">★ {st.rating}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* TAB 4: SALON SETTINGS */}
            {activeTab === 'settings' && (
              <form onSubmit={handleSaveSettings} className="space-y-6 max-w-xl">
                {settingsSaved && (
                  <div className="p-3.5 rounded-xl bg-green-500/10 border border-green-500/30 text-xs text-green-300 flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    <span>Salon settings saved successfully!</span>
                  </div>
                )}

                <div>
                  <label className="text-xs uppercase tracking-wider text-luxe-muted font-semibold block mb-1">
                    Announcement Banner Message
                  </label>
                  <input
                    type="text"
                    value={announcement}
                    onChange={(e) => setAnnouncement(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-gold-500/20 text-white text-xs focus:outline-none focus:border-gold-400"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs uppercase tracking-wider text-luxe-muted font-semibold block mb-1">
                      Salon Contact Phone
                    </label>
                    <input
                      type="text"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-gold-500/20 text-white text-xs focus:outline-none focus:border-gold-400"
                    />
                  </div>
                  <div>
                    <label className="text-xs uppercase tracking-wider text-luxe-muted font-semibold block mb-1">
                      Salon Concierge Email
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-gold-500/20 text-white text-xs focus:outline-none focus:border-gold-400"
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-xs uppercase tracking-wider text-luxe-muted font-semibold block">
                    Operating Hours
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <span className="text-[10px] text-luxe-muted block mb-1">Weekdays</span>
                      <input
                        type="text"
                        value={hoursWeekdays}
                        onChange={(e) => setHoursWeekdays(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-black/60 border border-gold-500/20 text-white text-xs"
                      />
                    </div>
                    <div>
                      <span className="text-[10px] text-luxe-muted block mb-1">Saturday</span>
                      <input
                        type="text"
                        value={hoursSaturday}
                        onChange={(e) => setHoursSaturday(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-black/60 border border-gold-500/20 text-white text-xs"
                      />
                    </div>
                    <div>
                      <span className="text-[10px] text-luxe-muted block mb-1">Sunday</span>
                      <input
                        type="text"
                        value={hoursSunday}
                        onChange={(e) => setHoursSunday(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-black/60 border border-gold-500/20 text-white text-xs"
                      />
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  className="gold-glow-btn px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-wider"
                >
                  Save Configuration
                </button>
              </form>
            )}
          </div>
        )}

        {/* MODAL: EDIT OR ADD SERVICE */}
        {editingService && (
          <div className="fixed inset-0 z-60 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
            <div className="bg-luxe-card border border-gold-500/40 rounded-3xl p-6 max-w-lg w-full relative">
              <button
                onClick={() => setEditingService(null)}
                className="absolute top-4 right-4 text-luxe-muted hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>

              <h4 className="font-serif text-xl font-bold text-white mb-4">
                {isNewService ? 'Create New Service' : 'Edit Service Details'}
              </h4>

              <form onSubmit={handleSaveService} className="space-y-3">
                <div>
                  <label className="text-[11px] text-luxe-muted uppercase block mb-1">Service Name</label>
                  <input
                    type="text"
                    value={editingService.name}
                    onChange={(e) => setEditingService({ ...editingService, name: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-black/60 border border-gold-500/20 text-white text-xs"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] text-luxe-muted uppercase block mb-1">Audience</label>
                    <select
                      value={editingService.category}
                      onChange={(e) => setEditingService({ ...editingService, category: e.target.value as any })}
                      className="w-full px-3 py-2 rounded-xl bg-black/60 border border-gold-500/20 text-white text-xs"
                    >
                      <option value="men">Men's</option>
                      <option value="women">Women's</option>
                      <option value="unisex">Unisex</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-[11px] text-luxe-muted uppercase block mb-1">Price (₹ INR)</label>
                    <input
                      type="number"
                      value={editingService.price}
                      onChange={(e) => setEditingService({ ...editingService, price: Number(e.target.value) })}
                      className="w-full px-3 py-2 rounded-xl bg-black/60 border border-gold-500/20 text-white text-xs"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] text-luxe-muted uppercase block mb-1">Duration Label</label>
                    <input
                      type="text"
                      value={editingService.duration}
                      onChange={(e) => setEditingService({ ...editingService, duration: e.target.value })}
                      placeholder="e.g. 45 mins"
                      className="w-full px-3 py-2 rounded-xl bg-black/60 border border-gold-500/20 text-white text-xs"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-luxe-muted uppercase block mb-1">Duration (Minutes)</label>
                    <input
                      type="number"
                      value={editingService.durationMinutes}
                      onChange={(e) => setEditingService({ ...editingService, durationMinutes: Number(e.target.value) })}
                      className="w-full px-3 py-2 rounded-xl bg-black/60 border border-gold-500/20 text-white text-xs"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[11px] text-luxe-muted uppercase block mb-1">Description</label>
                  <textarea
                    rows={2}
                    value={editingService.description}
                    onChange={(e) => setEditingService({ ...editingService, description: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-black/60 border border-gold-500/20 text-white text-xs"
                    required
                  />
                </div>

                <div>
                  <label className="text-[11px] text-luxe-muted uppercase block mb-1">Image URL</label>
                  <input
                    type="url"
                    value={editingService.image}
                    onChange={(e) => setEditingService({ ...editingService, image: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-black/60 border border-gold-500/20 text-white text-xs"
                    required
                  />
                </div>

                <div className="flex items-center gap-4 pt-2">
                  <label className="flex items-center gap-2 text-xs text-luxe-ivory cursor-pointer">
                    <input
                      type="checkbox"
                      checked={editingService.requiresConsultation}
                      onChange={(e) => setEditingService({ ...editingService, requiresConsultation: e.target.checked })}
                      className="rounded accent-gold-500"
                    />
                    <span>Requires Consultation</span>
                  </label>

                  <label className="flex items-center gap-2 text-xs text-luxe-ivory cursor-pointer">
                    <input
                      type="checkbox"
                      checked={editingService.popular}
                      onChange={(e) => setEditingService({ ...editingService, popular: e.target.checked })}
                      className="rounded accent-gold-500"
                    />
                    <span>Mark as Popular</span>
                  </label>
                </div>

                <div className="pt-4 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setEditingService(null)}
                    className="px-4 py-2 rounded-xl border border-white/10 text-xs text-luxe-muted"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="gold-glow-btn px-5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider"
                  >
                    Save Service
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
