import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, CalendarCheck, MapPin, Phone, CreditCard, ChevronDown } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import doctorsData from '../data/doctors.json';
import servicesData from '../data/services.json';
import { Doctor } from '../types';

interface AppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialDoctorId?: string;
  initialDept?: string;
}

export const AppointmentModal: React.FC<AppointmentModalProps> = ({
  isOpen,
  onClose,
  initialDoctorId = '',
  initialDept = '',
}) => {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language || 'en';

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    department: '',
    doctor: '',
    date: '',
    time: '',
    notes: '',
  });

  const [filteredDoctors, setFilteredDoctors] = useState<Doctor[]>(doctorsData as Doctor[]);
  const [errorMsg, setErrorMsg] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [bookingRef, setBookingRef] = useState('');

  // Handle department and prefill mappings
  useEffect(() => {
    if (initialDept) {
      setFormData((prev) => ({ ...prev, department: initialDept }));
    }
    if (initialDoctorId) {
      const foundDoc = (doctorsData as Doctor[]).find((d) => d.id === initialDoctorId);
      if (foundDoc) {
        setFormData((prev) => ({
          ...prev,
          department: foundDoc.department,
          doctor: foundDoc.id,
        }));
      }
    }
  }, [initialDoctorId, initialDept, isOpen]);

  // Dynamically update available doctors list based on selected department
  useEffect(() => {
    if (formData.department) {
      const matched = (doctorsData as Doctor[]).filter(
        (doc) => doc.department.toLowerCase() === formData.department.toLowerCase()
      );
      setFilteredDoctors(matched);
      // Auto select doctor if there is only 1
      if (matched.length === 1) {
        setFormData((prev) => ({ ...prev, doctor: matched[0].id }));
      } else if (!matched.find((m) => m.id === formData.doctor)) {
        setFormData((prev) => ({ ...prev, doctor: '' }));
      }
    } else {
      setFilteredDoctors(doctorsData as Doctor[]);
    }
  }, [formData.department]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrorMsg('');
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    // Field validation
    const { name, phone, email, department, doctor, date, time } = formData;
    if (!name.trim() || !phone.trim() || !email.trim() || !department || !doctor || !date || !time) {
      setErrorMsg(t('booking_modal.fields_required'));
      return;
    }

    // Phone standard check (10 digits)
    const phoneRegex = /^[0-9+ ]{8,15}$/;
    if (!phoneRegex.test(phone)) {
      setErrorMsg(t('booking_modal.phone_err'));
      return;
    }

    // Persist to LocalStorage
    const finalAppointment = {
      ...formData,
      id: `AP-${Math.floor(100000 + Math.random() * 900000)}`,
      timestamp: new Date().toISOString(),
    };

    const currentBookings = JSON.parse(localStorage.getItem('auracare_bookings') || '[]');
    currentBookings.push(finalAppointment);
    localStorage.setItem('auracare_bookings', JSON.stringify(currentBookings));

    setBookingRef(finalAppointment.id);
    setIsSuccess(true);
  };

  const handleReset = () => {
    setFormData({
      name: '',
      phone: '',
      email: '',
      department: '',
      doctor: '',
      date: '',
      time: '',
      notes: '',
    });
    setIsSuccess(false);
    setErrorMsg('');
    setBookingRef('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
        {/* Backdrop glassmorphism */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleReset}
          className="absolute inset-0 bg-slate-900/65 backdrop-blur-md"
        />

        {/* Modal Window Sheet */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative w-full max-w-2xl overflow-hidden rounded-2xl bg-white p-6 shadow-2xl dark:bg-slate-800 text-slate-900 dark:text-white"
        >
          {/* Close button with subtle scale */}
          <button
            onClick={handleReset}
            className="absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 focus:outline-none dark:bg-slate-700 dark:text-slate-300 dark:hover:bg-slate-600 transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="h-4.5 w-4.5" />
          </button>

          {!isSuccess ? (
            <div>
              <div className="pr-8">
                <h3 className="text-xl md:text-2xl font-bold tracking-tight text-teal-600 dark:text-teal-400">
                  {t('booking_modal.title')}
                </h3>
                <p className="mt-1.5 text-xs md:text-sm text-slate-500 dark:text-slate-400">
                  {t('booking_modal.sub')}
                </p>
              </div>

              {errorMsg && (
                <div className="mt-4 rounded-lg bg-red-50 p-3 text-xs md:text-sm text-red-600 dark:bg-red-500/10 dark:text-red-400">
                  {errorMsg}
                </div>
              )}

              <form onSubmit={handleFormSubmit} className="mt-5 space-y-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 animate-fadeIn">
                  {/* Patient Name */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wider mb-1.5 label-required">
                      {t('booking_modal.label_name')} *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. John Doe"
                      className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 focus:border-teal-500 focus:bg-white focus:outline-none dark:border-slate-700 dark:bg-slate-900/60 dark:text-white dark:focus:border-teal-500"
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                      {t('booking_modal.label_phone')} *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+91 98765 43210"
                      className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 focus:border-teal-500 focus:bg-white focus:outline-none dark:border-slate-700 dark:bg-slate-900/60 dark:text-white dark:focus:border-teal-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {/* Email */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wider mb-1.5 animate-pulse-slow">
                      {t('booking_modal.label_email')} *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="your.email@example.com"
                      className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 focus:border-teal-500 focus:bg-white focus:outline-none dark:border-slate-700 dark:bg-slate-900/60 dark:text-white dark:focus:border-teal-500"
                    />
                  </div>

                  {/* Department select */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                      {t('booking_modal.label_dept')} *
                    </label>
                    <div className="relative">
                      <select
                        name="department"
                        value={formData.department}
                        onChange={handleChange}
                        className="w-full appearance-none rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 pr-10 text-sm text-slate-900 focus:border-teal-500 focus:bg-white focus:outline-none dark:border-slate-700 dark:bg-slate-900/60 dark:text-white dark:focus:border-teal-500"
                      >
                        <option value="">-- Select Department --</option>
                        {servicesData.map((s) => (
                          <option key={s.id} value={s.name}>
                            {currentLang === 'hi' ? s.name_hi : s.name}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 pointer-events-none text-slate-400" />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {/* Doctor select */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                      {t('booking_modal.label_doc')} *
                    </label>
                    <div className="relative">
                      <select
                        name="doctor"
                        value={formData.doctor}
                        onChange={handleChange}
                        className="w-full appearance-none rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 pr-10 text-sm text-slate-900 focus:border-teal-500 focus:bg-white focus:outline-none dark:border-slate-700 dark:bg-slate-900/60 dark:text-white dark:focus:border-teal-500"
                      >
                        <option value="">-- Choose Specialist --</option>
                        {filteredDoctors.map((d) => (
                          <option key={d.id} value={d.id}>
                            {currentLang === 'hi' ? d.name_hi : d.name} ({currentLang === 'hi' ? d.role_hi : d.role})
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 pointer-events-none text-slate-400" />
                    </div>
                  </div>

                  {/* Consult Date */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                      {t('booking_modal.label_date')} *
                    </label>
                    <input
                      type="date"
                      name="date"
                      min={new Date().toISOString().split('T')[0]}
                      value={formData.date}
                      onChange={handleChange}
                      className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 focus:border-teal-500 focus:bg-white focus:outline-none dark:border-slate-700 dark:bg-slate-900/60 dark:text-white dark:focus:border-teal-500"
                    />
                  </div>
                </div>

                {/* Preferred time slot & notes */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                  <div className="sm:col-span-1">
                    <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                      {t('booking_modal.label_time')} *
                    </label>
                    <div className="relative">
                      <select
                        name="time"
                        value={formData.time}
                        onChange={handleChange}
                        className="w-full appearance-none rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 pr-10 text-sm text-slate-900 focus:border-teal-500 focus:bg-white focus:outline-none dark:border-slate-700 dark:bg-slate-900/60 dark:text-white dark:focus:border-teal-500"
                      >
                        <option value="">-- Time Slot --</option>
                        <option value="09:00 AM">09:00 AM - 10:00 AM</option>
                        <option value="10:30 AM">10:30 AM - 11:30 AM</option>
                        <option value="12:00 PM">12:00 PM - 01:00 PM</option>
                        <option value="03:00 PM">03:00 PM - 04:00 PM</option>
                        <option value="04:30 PM">04:30 PM - 05:30 PM</option>
                        <option value="06:00 PM">06:00 PM - 07:00 PM</option>
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 pointer-events-none text-slate-400" />
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                      {t('booking_modal.label_notes')}
                    </label>
                    <input
                      type="text"
                      name="notes"
                      value={formData.notes}
                      onChange={handleChange}
                      placeholder="e.g. routine hypertension review"
                      className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 focus:border-teal-500 focus:bg-white focus:outline-none dark:border-slate-700 dark:bg-slate-900/60 dark:text-white dark:focus:border-teal-500"
                    />
                  </div>
                </div>

                <div className="mt-6 flex flex-col-reverse justify-end gap-3 sm:flex-row">
                  <button
                    type="button"
                    onClick={handleReset}
                    className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:hover:bg-slate-700 transition-colors pointer-events-auto cursor-pointer"
                  >
                    {t('booking_modal.cancel_btn')}
                  </button>
                  <button
                    type="submit"
                    className="rounded-lg bg-teal-500 px-5 py-2 text-sm font-medium text-white hover:bg-teal-600 shadow-md transition-all font-sans cursor-pointer"
                    id="btn-confirm-booking"
                  >
                    {t('booking_modal.submit_btn')}
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <div className="py-6 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-teal-50 text-teal-500 dark:bg-teal-500/10">
                <CalendarCheck className="h-10 w-10 animate-bounce" />
              </div>
              <h3 className="mt-4 text-xl font-bold tracking-tight text-teal-600 dark:text-teal-400">
                {t('booking_modal.success_header')}
              </h3>
              <p className="mt-1.5 text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto">
                {t('booking_modal.success_desc')}
              </p>

              {/* Patient Receipt summary */}
              <div className="mt-6 mx-auto max-w-sm rounded-xl border border-dashed border-teal-500/35 bg-teal-500/5 p-4 text-left text-xs space-y-2 md:space-y-2.5">
                <div className="flex justify-between border-b border-teal-500/10 pb-2">
                  <span className="font-semibold text-slate-500">Receipt Code:</span>
                  <span className="font-mono font-bold text-teal-600 dark:text-teal-400 uppercase">{bookingRef}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Patient:</span>
                  <span className="font-medium">{formData.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Department:</span>
                  <span className="font-medium bg-teal-500/15 text-teal-600 dark:text-teal-400 px-1.5 py-0.5 rounded text-[10px]">{formData.department}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Doctor:</span>
                  <span className="font-medium">
                    {(() => {
                      const found = (doctorsData as Doctor[]).find((d) => d.id === formData.doctor);
                      return found ? (currentLang === 'hi' ? found.name_hi : found.name) : formData.doctor;
                    })()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Date:</span>
                  <span className="font-mono text-teal-600 dark:text-teal-400 font-semibold">{formData.date}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Preferred Time:</span>
                  <span className="font-mono font-semibold">{formData.time}</span>
                </div>
                <div className="pt-2 border-t border-teal-500/10 flex items-start gap-1 text-slate-400">
                  <MapPin className="h-3.5 w-3.5 text-slate-400 shrink-0 mt-0.5" />
                  <span>AuraCare Executive OPD Wing, 2nd Floor, Towers Block A</span>
                </div>
              </div>

              <button
                onClick={handleReset}
                className="mt-6 rounded-lg bg-slate-900 px-6 py-2 text-sm font-medium text-white hover:bg-slate-800 focus:outline-none dark:bg-slate-700 dark:hover:bg-slate-600 transition-colors pointer-events-auto cursor-pointer"
                id="btn-receipt-dismiss"
              >
                Dismiss & Close Receipt
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
