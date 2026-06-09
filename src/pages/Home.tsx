import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Heart, ShieldAlert, Award, Activity, Search, Phone, Mail, Clock, MapPin, 
  ChevronRight, ArrowRight, Star, ShieldCheck, HelpCircle, Check, Users, RefreshCw
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { StatCounter } from '../components/StatCounter';
import doctorsData from '../data/doctors.json';
import servicesData from '../data/services.json';
import testimonialsData from '../data/testimonials.json';
import newsData from '../data/news.json';
import faqData from '../data/faq.json';
import { Doctor } from '../types';

interface HomeProps {
  onOpenBooking: (doctorId?: string, department?: string) => void;
}

export const Home: React.FC<HomeProps> = ({ onOpenBooking }) => {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language || 'en';
  const navigate = useNavigate();

  // Doctors list filters
  const [doctorSearch, setDoctorSearch] = useState('');
  const [selectedDeptFilter, setSelectedDeptFilter] = useState('All');

  // Testimonials active state
  const [testiIndex, setTestiIndex] = useState(0);

  // FAQ accordion state
  const [activeFaq, setActiveFaq] = useState<string | null>('faq1');

  // Contact form submission
  const [contactForm, setContactForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [contactSuccess, setContactSuccess] = useState(false);
  const [contactErr, setContactErr] = useState('');

  const departments = ['All', 'Cardiology', 'Neurology', 'Orthopedics', 'Pediatrics', 'Gynecology', 'Dentistry', 'Dermatology', 'General Medicine'];

  const filteredDoctors = (doctorsData as Doctor[]).filter((doc) => {
    const matchesSearch = doc.name.toLowerCase().includes(doctorSearch.toLowerCase()) || 
      doc.department.toLowerCase().includes(doctorSearch.toLowerCase()) ||
      doc.qualification.toLowerCase().includes(doctorSearch.toLowerCase());
    const matchesDept = selectedDeptFilter === 'All' || doc.department.toLowerCase() === selectedDeptFilter.toLowerCase();
    return matchesSearch && matchesDept;
  });

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setContactErr('');
    const { name, email, phone, subject, message } = contactForm;

    if (!name.trim() || !email.trim() || !phone.trim() || !subject.trim() || !message.trim()) {
      setContactErr('Please fill in all standard contact parameters.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setContactErr('Please provide a genuine email coordinate.');
      return;
    }

    // Persist message record
    const existingMsgs = JSON.parse(localStorage.getItem('auracare_contacts') || '[]');
    existingMsgs.push({
      ...contactForm,
      id: `MSG-${Math.floor(100000 + Math.random() * 900000)}`,
      timestamp: new Date().toISOString(),
    });
    localStorage.setItem('auracare_contacts', JSON.stringify(existingMsgs));

    setContactSuccess(true);
    setContactForm({ name: '', email: '', phone: '', subject: '', message: '' });
    setTimeout(() => setContactSuccess(false), 5000);
  };

  // Testimonial navigation
  const nextTestimonial = () => {
    setTestiIndex((prev) => (prev + 1) % testimonialsData.length);
  };
  const prevTestimonial = () => {
    setTestiIndex((prev) => (prev - 1 + testimonialsData.length) % testimonialsData.length);
  };

  return (
    <div className="bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 transition-colors duration-200">
      
      {/* 1. Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-tr from-slate-50 via-teal-50/20 to-indigo-50/30 py-16 dark:from-slate-950 dark:via-indigo-950/15 dark:to-slate-900 md:py-24">
        {/* Decorative background pulsing vectors */}
        <div className="absolute inset-0 z-0 opacity-20 dark:opacity-10 pointer-events-none">
          <svg className="absolute top-10 right-10 h-[300px] w-[300px] text-teal-500 animate-pulse-slow" fill="currentColor" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="40" />
          </svg>
          <svg className="absolute bottom-10 left-10 h-[400px] w-[400px] text-indigo-500 animate-pulse" fill="none" stroke="currentColor" strokeWidth="1" viewBox="0 0 100 100">
            <rect x="10" y="10" width="80" height="80" rx="20" />
          </svg>
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-teal-500/10 px-4 py-1.5 text-xs font-bold tracking-wide text-teal-600 dark:text-teal-400 border border-teal-500/20">
              {t('hero.banner_badge')}
            </div>
            
            <h1 className="font-sans text-3xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
              {currentLang === 'hi' ? 'चिकित्सा क्षेत्र में' : 'A Beacon of'} <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-indigo-500">
                {currentLang === 'hi' ? 'परम संवेदनशीलता एवं विश्वसनीयता' : 'Healthcare Excellence'}
              </span> {currentLang === 'hi' ? 'का अनुपम प्रतीक' : '& Integrity'}
            </h1>

            <p className="font-sans text-base md:text-lg text-slate-500 dark:text-slate-400 max-w-2xl leading-relaxed">
              {t('hero.subtitle')}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <button
                onClick={() => onOpenBooking()}
                className="rounded-xl bg-teal-500 px-7 py-3.5 text-sm font-extrabold text-white shadow-xl shadow-teal-500/20 hover:bg-teal-600 hover:shadow-teal-500/30 active:scale-95 transition-all text-center cursor-pointer uppercase tracking-tight"
                id="hero-btn-book"
              >
                {t('hero.cta_book')}
              </button>
              
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-white/70 backdrop-blur-md px-7 py-3.5 text-sm font-bold text-slate-700 hover:bg-slate-50 hover:text-teal-500 dark:border-slate-700 dark:bg-slate-800/40 dark:text-slate-300 dark:hover:bg-slate-800 transition-all text-center"
                id="hero-btn-contact"
              >
                <span>{t('hero.cta_contact')}</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Outer decorative card shadow frame */}
              <div className="absolute -inset-2 rounded-3xl bg-gradient-to-tr from-teal-500 to-indigo-500 opacity-20 blur-xl dark:opacity-30" />
              
              {/* Main premium doctor image with overlay statistics badge */}
              <div className="relative overflow-hidden rounded-2xl border border-slate-200/40 bg-white dark:border-slate-800 dark:bg-slate-800">
                <img
                  src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=650"
                  alt="AuraCare Hospital diagnostic panels"
                  className="h-[360px] md:h-[420px] w-full object-cover shrink-0"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute bottom-4 left-4 right-4 rounded-xl bg-white/85 dark:bg-slate-900/85 backdrop-blur-md p-4 border border-white/20 text-left flex items-center justify-between">
                  <div>
                    <h4 className="text-xs font-semibold text-slate-400 tracking-wider uppercase mb-0.5">Accreditation</h4>
                    <p className="text-xs md:text-sm font-bold text-teal-600 dark:text-teal-400">NABH Accredited Gold Standard Institution</p>
                  </div>
                  <ShieldCheck className="h-9 w-9 text-teal-500 shrink-0" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Statistics Section */}
      <section className="bg-slate-900 dark:bg-slate-950 py-8 lg:py-12 border-y border-slate-800 text-white relative">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="space-y-1">
            <h3 className="text-3xl md:text-4xl lg:text-5xl font-sans font-extrabold text-teal-400">
              <StatCounter end={25} suffix="+" />
            </h3>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest">{t('stats.exp')}</p>
          </div>
          <div className="space-y-1">
            <h3 className="text-3xl md:text-4xl lg:text-5xl font-sans font-extrabold text-teal-400">
              <StatCounter end={100} suffix="+" />
            </h3>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest">{t('stats.doctors')}</p>
          </div>
          <div className="space-y-1">
            <h3 className="text-3xl md:text-4xl lg:text-5xl font-sans font-extrabold text-teal-400">
              <StatCounter end={50000} suffix="+" />
            </h3>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest">{t('stats.patients')}</p>
          </div>
          <div className="space-y-1">
            <h3 className="text-3xl md:text-4xl lg:text-5xl font-sans font-extrabold text-teal-400">
              <StatCounter end={45} suffix="+" />
            </h3>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest">{t('stats.emergency')}</p>
          </div>
        </div>
      </section>

      {/* 3. Why Choose Us Section */}
      <section className="py-16 md:py-20 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-2xl md:text-4xl font-sans font-extrabold tracking-tight text-slate-900 dark:text-white mb-3">
            {t('why_choose.title')}
          </h2>
          <p className="text-sm md:text-base text-slate-500 dark:text-slate-400">
            {t('why_choose.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-2xl border border-slate-100 dark:border-slate-700 hover:border-teal-500 dark:hover:border-teal-400/50 hover:-y-1 transition-all group duration-200 text-left">
            <div className="h-12 w-12 rounded-xl bg-teal-500/10 text-teal-500 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform shrink-0">
              <Users className="h-6 w-6" />
            </div>
            <h4 className="text-base font-bold text-slate-900 dark:text-white mb-2">{t('why_choose.c1_title')}</h4>
            <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{t('why_choose.c1_desc')}</p>
          </div>

          {/* Card 2 */}
          <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-2xl border border-slate-100 dark:border-slate-700 hover:border-teal-500 dark:hover:border-teal-400/50 hover:-y-1 transition-all group duration-200 text-left">
            <div className="h-12 w-12 rounded-xl bg-teal-500/10 text-teal-500 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform shrink-0">
              <Activity className="h-6 w-6" />
            </div>
            <h4 className="text-base font-bold text-slate-900 dark:text-white mb-2">{t('why_choose.c2_title')}</h4>
            <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{t('why_choose.c2_desc')}</p>
          </div>

          {/* Card 3 */}
          <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-2xl border border-slate-100 dark:border-slate-700 hover:border-teal-500 dark:hover:border-teal-400/50 hover:-y-1 transition-all group duration-200 text-left">
            <div className="h-12 w-12 rounded-xl bg-teal-500/10 text-teal-500 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform shrink-0">
              <Award className="h-6 w-6" />
            </div>
            <h4 className="text-base font-bold text-slate-900 dark:text-white mb-2">{t('why_choose.c3_title')}</h4>
            <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{t('why_choose.c3_desc')}</p>
          </div>

          {/* Card 4 */}
          <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-2xl border border-slate-100 dark:border-slate-700 hover:border-teal-500 dark:hover:border-teal-400/50 hover:-y-1 transition-all group duration-200 text-left">
            <div className="h-12 w-12 rounded-xl bg-teal-500/10 text-teal-500 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform shrink-0">
              <ShieldAlert className="h-6 w-6 animate-pulse" />
            </div>
            <h4 className="text-base font-bold text-slate-900 dark:text-white mb-2">{t('why_choose.c4_title')}</h4>
            <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{t('why_choose.c4_desc')}</p>
          </div>

          {/* Card 5 */}
          <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-2xl border border-slate-100 dark:border-slate-700 hover:border-teal-500 dark:hover:border-teal-400/50 hover:-y-1 transition-all group duration-200 text-left">
            <div className="h-12 w-12 rounded-xl bg-teal-500/10 text-teal-500 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform shrink-0">
              <Heart className="h-6 w-6" />
            </div>
            <h4 className="text-base font-bold text-slate-900 dark:text-white mb-2">{t('why_choose.c5_title')}</h4>
            <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{t('why_choose.c5_desc')}</p>
          </div>

          {/* Card 6 */}
          <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-2xl border border-slate-100 dark:border-slate-700 hover:border-teal-500 dark:hover:border-teal-400/50 hover:-y-1 transition-all group duration-200 text-left">
            <div className="h-12 w-12 rounded-xl bg-teal-500/10 text-teal-500 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform shrink-0">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <h4 className="text-base font-bold text-slate-900 dark:text-white mb-2">{t('why_choose.c6_title')}</h4>
            <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{t('why_choose.c6_desc')}</p>
          </div>
        </div>
      </section>

      {/* 4. Departments & Services Preview Section */}
      <section className="py-16 bg-slate-50 dark:bg-slate-950/40 border-y border-slate-100 dark:border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 text-left">
            <div>
              <h2 className="text-2xl md:text-4xl font-sans font-extrabold text-slate-900 dark:text-white">
                {t('departments.title')}
              </h2>
              <p className="mt-2 text-sm text-slate-500 dark:text-slate-400 max-w-2xl">
                {t('departments.subtitle')}
              </p>
            </div>
            <Link
              to="/services"
              className="mt-4 md:mt-0 inline-flex items-center gap-1 text-sm font-bold text-teal-500 hover:text-teal-600 hover:underline shrink-0"
              id="home-btn-all-depts"
            >
              <span>{currentLang === 'hi' ? 'सभी १६ विशिष्टताएं देखें' : 'View all 16 specialties'}</span>
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {servicesData.slice(0, 8).map((ser) => {
              // Custom map for lucide-react rendering
              return (
                <div
                  key={ser.id}
                  className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-200/50 dark:border-slate-700/60 shadow-sm hover:shadow-md transition-shadow relative text-left flex flex-col justify-between"
                >
                  <div>
                    <span className="text-[10px] font-bold tracking-widest text-teal-500 uppercase">Specialty Unit</span>
                    <h4 className="text-base font-bold text-slate-900 dark:text-white mt-1">
                      {currentLang === 'hi' ? ser.name_hi : ser.name}
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 line-clamp-3 leading-relaxed">
                      {currentLang === 'hi' ? ser.desc_hi : ser.desc}
                    </p>
                  </div>
                  <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-between">
                    <Link
                      to={`/services?tab=${ser.id}`}
                      className="text-xs font-semibold text-teal-600 dark:text-teal-400 hover:underline"
                    >
                      {currentLang === 'hi' ? 'चिकित्सा विवरण' : 'Examine details'}
                    </Link>
                    <button
                      onClick={() => onOpenBooking('', ser.name)}
                      className="text-xs font-bold text-slate-800 dark:text-white dark:hover:text-teal-400 hover:text-teal-500"
                    >
                      {currentLang === 'hi' ? 'बुक करें' : 'Book Direct'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. Featured Doctors Section (With quick search & filter coordination) */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <h2 className="text-2xl md:text-4xl font-sans font-extrabold tracking-tight text-slate-900 dark:text-white mb-3">
            {t('specialists.title')}
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            {t('specialists.subtitle')}
          </p>
        </div>

        {/* Doctor search tools line */}
        <div className="max-w-4xl mx-auto bg-slate-50 p-4 rounded-2xl border border-slate-100 dark:bg-slate-800 dark:border-slate-700 mb-8 flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              value={doctorSearch}
              onChange={(e) => setDoctorSearch(e.target.value)}
              placeholder={t('specialists.search_placeholder')}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm text-slate-900 focus:border-teal-500 focus:outline-none dark:border-slate-650 dark:bg-slate-900 dark:text-white"
            />
          </div>

          <div className="flex gap-2 overflow-x-auto pb-1 shrink-0 max-w-full">
            <select
              value={selectedDeptFilter}
              onChange={(e) => setSelectedDeptFilter(e.target.value)}
              className="px-4 py-2 bg-white rounded-xl border border-slate-200 text-sm text-slate-700 dark:bg-slate-900 dark:border-slate-700 dark:text-white focus:outline-none"
            >
              {departments.map((dept) => (
                <option key={dept} value={dept}>
                  {dept}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredDoctors.map((doc) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2 }}
                key={doc.id}
                className="bg-white dark:bg-slate-800 rounded-2xl overflow-hidden border border-slate-200/50 dark:border-slate-700/60 shadow-sm flex flex-col justify-between"
              >
                <div className="relative overflow-hidden group h-[240px]">
                  <img
                    src={doc.image}
                    alt={doc.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-350 shrink-0"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                  />
                  <div className="absolute top-3 left-3 px-2 py-1 rounded bg-teal-500 text-white font-mono text-[10px] font-bold tracking-wide">
                    {t('specialists.exp_lbl')}: {currentLang === 'hi' ? doc.experience_hi : doc.experience}
                  </div>
                </div>

                <div className="p-4 text-left flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">
                      {currentLang === 'hi' ? doc.department_hi : doc.department}
                    </span>
                    <h4 className="text-base font-bold text-slate-900 dark:text-white mt-1 leading-snug">
                      {currentLang === 'hi' ? doc.name_hi : doc.name}
                    </h4>
                    <p className="text-xs text-teal-600 dark:text-teal-400 font-medium mt-1 leading-snug">
                      {currentLang === 'hi' ? doc.role_hi : doc.role}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 font-sans italic">
                      {currentLang === 'hi' ? doc.qualification_hi : doc.qualification}
                    </p>
                  </div>

                  <div className="mt-5 pt-3.5 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400 shrink-0" />
                      <span className="font-mono text-xs font-bold text-slate-900 dark:text-white leading-none">{doc.rating}</span>
                    </div>

                    <button
                      onClick={() => onOpenBooking(doc.id, doc.department)}
                      className="rounded-lg bg-slate-900 px-3 py-1.5 text-xs font-bold text-white hover:bg-teal-500 shadow transition-all cursor-pointer dark:bg-slate-700 dark:hover:bg-teal-500"
                    >
                      {t('specialists.appointment_btn')}
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {filteredDoctors.length === 0 && (
            <div className="col-span-full py-12 text-center bg-slate-50 rounded-2xl dark:bg-slate-800">
              <Search className="mx-auto h-10 w-10 text-slate-300" />
              <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">{t('specialists.no_results')}</p>
            </div>
          )}
        </div>
      </section>

      {/* 6. Appointment CTA Banner Section */}
      <section className="my-12 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="rounded-3xl bg-gradient-to-r from-teal-600 to-indigo-900 px-6 py-12 md:p-16 text-center text-white relative overflow-hidden shadow-xl">
          <div className="relative z-10 max-w-3xl mx-auto space-y-4">
            <h2 className="text-2xl md:text-4xl font-sans font-bold tracking-tight text-white leading-tight">
              {t('appointment_banner.title')}
            </h2>
            <p className="text-xs md:text-sm text-teal-100 max-w-xl mx-auto leading-relaxed">
              {t('appointment_banner.subtitle')}
            </p>
            <div className="pt-3">
              <button
                onClick={() => onOpenBooking()}
                className="rounded-xl bg-white px-8 py-3.5 text-sm font-bold text-teal-600 hover:bg-slate-50 active:scale-95 shadow-lg transition-all uppercase cursor-pointer"
                id="btn-banner-cta-book"
              >
                {t('appointment_banner.book_now_btn')}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Patient Testimonials Slider (Smooth native Framer Motion slider) */}
      <section className="py-16 bg-slate-50 dark:bg-slate-950/40 border-y border-slate-100 dark:border-slate-800/80">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl md:text-4xl font-sans font-extrabold text-slate-900 dark:text-white mb-3">
            {t('testimonials.title')}
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-10">
            {t('testimonials.subtitle')}
          </p>

          <div className="relative min-h-[220px] max-w-2xl mx-auto">
            {testimonialsData.map((testi, idx) => {
              if (idx !== testiIndex) return null;
              return (
                <div
                  key={testi.id}
                  className="rounded-2xl bg-white dark:bg-slate-800 p-6 md:p-10 shadow-sm border border-slate-100 dark:border-slate-700 animate-fadeIn text-left"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <img
                      src={testi.image}
                      alt={testi.name}
                      className="h-14 w-14 rounded-full object-cover border-2 border-teal-500 shrink-0"
                      referrerPolicy="no-referrer"
                    />
                    <div>
                      <h4 className="text-base font-bold text-slate-900 dark:text-white leading-none">
                        {currentLang === 'hi' ? testi.name_hi : testi.name}
                      </h4>
                      <p className="text-xs text-slate-400 mt-1">Verified patient account</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 mb-4">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${i < Math.floor(testi.rating) ? 'fill-amber-400 text-amber-400' : 'text-slate-200'}`}
                      />
                    ))}
                  </div>

                  <p className="text-xs md:text-sm text-slate-600 dark:text-slate-300 italic leading-relaxed">
                    "{currentLang === 'hi' ? testi.review_hi : testi.review}"
                  </p>
                </div>
              );
            })}

            {/* Slider navigators */}
            <div className="flex justify-center gap-3 mt-6">
              <button
                onClick={prevTestimonial}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white dark:bg-slate-800 text-slate-600 hover:text-teal-500 shadow border border-slate-100 dark:border-slate-700 cursor-pointer"
                id="btn-slider-prev"
              >
                ←
              </button>
              <button
                onClick={nextTestimonial}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white dark:bg-slate-800 text-slate-600 hover:text-teal-500 shadow border border-slate-100 dark:border-slate-700 cursor-pointer"
                id="btn-slider-next"
              >
                →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Hospital Facilities Section */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <h2 className="text-2xl md:text-4xl font-sans font-extrabold text-slate-900 dark:text-white mb-3">
            {t('facilities.title')}
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            {t('facilities.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* F1 */}
          <div className="rounded-2xl border border-slate-200/50 p-5 text-left bg-white dark:bg-slate-800 dark:border-slate-700/60 shadow-sm flex items-start gap-4 hover:shadow-md transition-shadow">
            <span className="text-2xl mt-0.5 font-bold text-teal-400">01</span>
            <div>
              <h4 className="text-base font-bold text-slate-900 dark:text-white">{t('facilities.f1_title')}</h4>
              <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">{t('facilities.f1_desc')}</p>
            </div>
          </div>
          {/* F2 */}
          <div className="rounded-2xl border border-slate-200/50 p-5 text-left bg-white dark:bg-slate-800 dark:border-slate-700/60 shadow-sm flex items-start gap-4 hover:shadow-md transition-shadow">
            <span className="text-2xl mt-0.5 font-bold text-teal-400">02</span>
            <div>
              <h4 className="text-base font-bold text-slate-900 dark:text-white">{t('facilities.f2_title')}</h4>
              <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">{t('facilities.f2_desc')}</p>
            </div>
          </div>
          {/* F3 */}
          <div className="rounded-2xl border border-slate-200/50 p-5 text-left bg-white dark:bg-slate-800 dark:border-slate-700/60 shadow-sm flex items-start gap-4 hover:shadow-md transition-shadow">
            <span className="text-2xl mt-0.5 font-bold text-teal-400">03</span>
            <div>
              <h4 className="text-base font-bold text-slate-900 dark:text-white">{t('facilities.f3_title')}</h4>
              <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">{t('facilities.f3_desc')}</p>
            </div>
          </div>
          {/* F4 */}
          <div className="rounded-2xl border border-slate-200/50 p-5 text-left bg-white dark:bg-slate-800 dark:border-slate-700/60 shadow-sm flex items-start gap-4 hover:shadow-md transition-shadow">
            <span className="text-2xl mt-0.5 font-bold text-teal-400">04</span>
            <div>
              <h4 className="text-base font-bold text-slate-900 dark:text-white">{t('facilities.f4_title')}</h4>
              <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">{t('facilities.f4_desc')}</p>
            </div>
          </div>
          {/* F5 */}
          <div className="rounded-2xl border border-slate-200/50 p-5 text-left bg-white dark:bg-slate-800 dark:border-slate-700/60 shadow-sm flex items-start gap-4 hover:shadow-md transition-shadow">
            <span className="text-2xl mt-0.5 font-bold text-teal-400">05</span>
            <div>
              <h4 className="text-base font-bold text-slate-900 dark:text-white">{t('facilities.f5_title')}</h4>
              <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">{t('facilities.f5_desc')}</p>
            </div>
          </div>
          {/* F6 */}
          <div className="rounded-2xl border border-slate-200/50 p-5 text-left bg-white dark:bg-slate-800 dark:border-slate-700/60 shadow-sm flex items-start gap-4 hover:shadow-md transition-shadow">
            <span className="text-2xl mt-0.5 font-bold text-teal-400">06</span>
            <div>
              <h4 className="text-base font-bold text-slate-900 dark:text-white">{t('facilities.f6_title')}</h4>
              <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">{t('facilities.f6_desc')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* 9. Insurance Partners Grid */}
      <section className="py-10 bg-slate-900 dark:bg-slate-950 border-t border-slate-800 text-slate-400 text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <p className="text-xs font-bold tracking-widest text-[#94A3B8] uppercase">{t('partners.title')}</p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-8 md:gap-14 opacity-70">
            <span className="text-base md:text-lg font-extrabold tracking-tight text-white/50 hover:text-white transition-colors">STAR HEALTH</span>
            <span className="text-base md:text-lg font-extrabold tracking-tight text-white/50 hover:text-white transition-colors">MAX BUPA</span>
            <span className="text-base md:text-lg font-extrabold tracking-tight text-white/50 hover:text-white transition-colors">HDFC ERGO</span>
            <span className="text-base md:text-lg font-extrabold tracking-tight text-white/50 hover:text-white transition-colors">ICICI LOMBARD</span>
          </div>
        </div>
      </section>

      {/* 10. News preview section */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 text-left">
          <div>
            <h2 className="text-2xl md:text-4xl font-sans font-extrabold text-slate-900 dark:text-white">
              {t('news_p.title')}
            </h2>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400 max-w-2xl">
              {t('news_p.subtitle')}
            </p>
          </div>
          <Link
            to="/news"
            className="mt-4 md:mt-0 inline-flex items-center gap-1 text-sm font-bold text-teal-500 hover:text-teal-650 hover:underline shrink-0"
            id="btn-news-preview-view-all"
          >
            <span>{currentLang === 'hi' ? 'सभी शोध लेख' : 'Explore clinical articles'}</span>
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {newsData.slice(0, 3).map((item) => (
            <article
              key={item.id}
              className="bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-sm border border-slate-200/50 dark:border-slate-700/65 flex flex-col justify-between text-left"
            >
              <div>
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-[200px] w-full object-cover shrink-0"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />
                <div className="p-4 space-y-2">
                  <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 tracking-wide">
                    <span>{item.date}</span>
                    <span>&bull;</span>
                    <span className="text-teal-500 uppercase">{currentLang === 'hi' ? item.category_hi : item.category}</span>
                  </div>
                  <h4 className="text-base font-bold text-slate-900 dark:text-white line-clamp-2">
                    {currentLang === 'hi' ? item.title_hi : item.title}
                  </h4>
                  <p className="text-xs text-slate-400 dark:text-slate-400 line-clamp-3 leading-relaxed">
                    {currentLang === 'hi' ? item.excerpt_hi : item.excerpt}
                  </p>
                </div>
              </div>

              <div className="p-4 pt-1">
                <Link
                  to="/news"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-teal-600 dark:text-teal-400 hover:underline"
                >
                  <span dangerouslySetInnerHTML={{ __html: t('news_p.read_more') }} />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* 11. FAQ Accordion Section */}
      <section className="py-16 bg-slate-50 dark:bg-slate-950/40 border-y border-slate-100 dark:border-slate-800/80">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <h2 className="text-2xl md:text-4xl font-sans font-extrabold text-slate-900 dark:text-white mb-3">
              {t('faq_p.title')}
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              {t('faq_p.subtitle')}
            </p>
          </div>

          <div className="space-y-4 max-w-3xl mx-auto">
            {faqData.map((item) => {
              const isOpen = activeFaq === item.id;
              return (
                <div
                  key={item.id}
                  className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200/50 dark:border-slate-700/50 overflow-hidden shadow-sm"
                >
                  <button
                    onClick={() => setActiveFaq(isOpen ? null : item.id)}
                    className="w-full p-4 text-left flex items-center justify-between text-slate-900 dark:text-white font-semibold text-sm hover:bg-slate-50 dark:hover:bg-slate-700/50 focus:outline-none cursor-pointer"
                  >
                    <span>{currentLang === 'hi' ? item.question_hi : item.question}</span>
                    <HelpCircle className={`h-4.5 w-4.5 text-slate-400 shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="p-4 pt-0 border-t border-slate-50 dark:border-slate-700 text-xs md:text-sm text-slate-500 dark:text-slate-400 leading-relaxed text-left">
                          {currentLang === 'hi' ? item.answer_hi : item.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 12. 24/7 Emergency Hotline Banner Callout */}
      <section className="bg-red-600 text-white py-12 text-center select-none relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-4">
          <span className="inline-block px-3 py-1 bg-white/20 rounded-full font-mono font-bold text-xs tracking-wider uppercase mb-1">
            {t('emergency_p.badge')}
          </span>
          <h2 className="text-xl md:text-3xl font-sans font-bold tracking-tight text-white leading-tight">
            {t('emergency_p.title')}
          </h2>
          <p className="text-lg md:text-xl font-mono font-bold font-semibold tracking-wider pt-2 text-[#FEE2E2]">
            {t('emergency_p.call_now')}
          </p>
        </div>
      </section>

      {/* 13. Get In Touch (Two Columns layout: Coords vs. Message form) */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 text-left">
          
          {/* Coordinates details column */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <h2 className="text-2xl md:text-4xl font-sans font-extrabold text-slate-900 dark:text-white">
                {t('get_touch.title')}
              </h2>
              <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                {t('get_touch.subtitle')}
              </p>
            </div>

            <div className="space-y-4">
              {/* Address */}
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-teal-500/10 text-teal-500 shrink-0">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">{t('get_touch.address_lbl')}</h4>
                  <p className="text-sm text-slate-800 dark:text-slate-200 mt-1 font-semibold leading-relaxed">
                    AuraCare Towers, Sector 45, Ring Road Bypass, New Delhi, Pin 110045, India
                  </p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-teal-500/10 text-teal-500 shrink-0">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">{t('get_touch.email_lbl')}</h4>
                  <p className="text-sm text-teal-500 dark:text-teal-400 mt-1 font-mono font-semibold">
                    support@auracarehospital.com
                  </p>
                </div>
              </div>

              {/* Support */}
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-teal-500/10 text-teal-500 shrink-0">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">{t('get_touch.phone_lbl')}</h4>
                  <p className="text-sm text-slate-800 dark:text-white mt-1 font-mono font-bold text-base">
                    +1 (800) 555-0199 / +91 (11) 4930-2210
                  </p>
                </div>
              </div>

              {/* Opening Hours */}
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-teal-500/10 text-teal-500 shrink-0">
                  <Clock className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">{t('get_touch.hours_lbl')}</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-normal">
                    {t('get_touch.hours_val')}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Secure Form column */}
          <div className="lg:col-span-7 bg-slate-50 p-6 rounded-2xl border border-slate-100 dark:bg-slate-800/80 dark:border-slate-700">
            <h3 className="text-lg font-bold text-slate-800 dark:text-white inline-flex items-center gap-1.5 mb-4">
              <ShieldCheck className="h-5 w-5 text-teal-500" />
              <span>Contact Secure Desk Liaison</span>
            </h3>

            {contactSuccess && (
              <div className="mb-4 rounded-xl bg-teal-50 p-3.5 text-xs text-teal-700 font-semibold dark:bg-teal-500/10 dark:text-teal-400">
                {t('get_touch.success_msg')}
              </div>
            )}

            {contactErr && (
              <div className="mb-4 rounded-xl bg-red-50 p-3.5 text-xs text-red-600 dark:bg-red-500/10 dark:text-red-400">
                {contactErr}
              </div>
            )}

            <form onSubmit={handleContactSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-1">{t('get_touch.form_name')} *</label>
                  <input
                    type="text"
                    value={contactForm.name}
                    onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                    className="w-full rounded-lg border border-slate-250 bg-white px-3 py-2 text-xs text-slate-900 focus:border-teal-500 focus:outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-1">{t('get_touch.form_email')} *</label>
                  <input
                    type="email"
                    value={contactForm.email}
                    onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                    className="w-full rounded-lg border border-slate-250 bg-white px-3 py-2 text-xs text-slate-900 focus:border-teal-500 focus:outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-1">{t('get_touch.form_phone')} *</label>
                  <input
                    type="tel"
                    value={contactForm.phone}
                    onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                    className="w-full rounded-lg border border-slate-250 bg-white px-3 py-2 text-xs text-slate-900 focus:border-teal-500 focus:outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-1">{t('get_touch.form_subject')} *</label>
                  <input
                    type="text"
                    value={contactForm.subject}
                    onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                    className="w-full rounded-lg border border-slate-250 bg-white px-3 py-2 text-xs text-slate-900 focus:border-teal-500 focus:outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-1">{t('get_touch.form_msg')} *</label>
                <textarea
                  rows={4}
                  value={contactForm.message}
                  onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                  className="w-full rounded-lg border border-slate-250 bg-white px-3 py-2 text-xs text-slate-900 focus:border-teal-500 focus:outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full sm:w-auto rounded-xl bg-teal-500 px-6 py-2.5 text-xs font-bold text-white hover:bg-teal-600 transition-colors uppercase tracking-tight cursor-pointer"
                  id="btn-contact-submit"
                >
                  {t('get_touch.send_btn')}
                </button>
              </div>
            </form>
          </div>

        </div>
      </section>

    </div>
  );
};
