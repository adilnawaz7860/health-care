import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'motion/react';
import { 
  MapPin, Phone, Mail, Clock, ShieldCheck, HelpCircle, AlertOctagon, 
  Send, Compass, HelpCircle as HelpIcon, Check, Landmark 
} from 'lucide-react';
import { Breadcrumb } from '../components/Breadcrumb';
import faqData from '../data/faq.json';

export const Contact: React.FC = () => {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language || 'en';

  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  
  // Accordion active tracker
  const [openFaq, setOpenFaq] = useState<string | null>('faq1');

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    const { name, email, phone, subject, message } = form;

    if (!name.trim() || !email.trim() || !phone.trim() || !subject.trim() || !message.trim()) {
      setErrorMsg('All contact parameters are mandatory.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrorMsg('Please specify a genuine email coordinate.');
      return;
    }

    // Persist contacts locally
    const existing = JSON.parse(localStorage.getItem('auracare_contacts') || '[]');
    existing.push({
      ...form,
      id: `CON-${Math.floor(100000 + Math.random() * 900000)}`,
      timestamp: new Date().toISOString()
    });
    localStorage.setItem('auracare_contacts', JSON.stringify(existing));

    setSuccess(true);
    setForm({ name: '', email: '', phone: '', subject: '', message: '' });
    setTimeout(() => setSuccess(false), 5000);
  };

  return (
    <div className="bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 transition-colors duration-200">
      
      <Breadcrumb
        title={t('get_touch.title')}
        paths={[{ label: t('nav.contact') }]}
      />

      <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 space-y-16 text-left">
        
        {/* Contact info cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1 - Address */}
          <div className="bg-slate-50 dark:bg-slate-800 border border-slate-205 dark:border-slate-700/60 p-5 rounded-2xl flex flex-col justify-between">
            <div className="space-y-3">
              <div className="h-10 w-10 rounded-xl bg-teal-500/10 text-teal-500 flex items-center justify-center shrink-0">
                <MapPin className="h-5 w-5" />
              </div>
              <h4 className="text-sm font-bold tracking-tight text-slate-905 dark:text-white">{t('get_touch.address_lbl')}</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-sans font-semibold">
                AuraCare Towers, Sector 45, Ring Road Bypass, New Delhi, Pin 110045, India
              </p>
            </div>
          </div>

          {/* Card 2 - Ambulance Core */}
          <div className="bg-slate-50 dark:bg-slate-800 border border-slate-205 dark:border-slate-700/60 p-5 rounded-2xl flex flex-col justify-between">
            <div className="space-y-3">
              <div className="h-10 w-10 rounded-xl bg-teal-500/10 text-teal-500 flex items-center justify-center shrink-0">
                <Phone className="h-5 w-5" />
              </div>
              <h4 className="text-sm font-bold tracking-tight text-slate-905 dark:text-white">{t('footer.emergency_num') || 'Emergency Numbers'}</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-normal font-semibold">
                Hotline: +1 (800) 555-0199<br />
                Ambulance Core: +91 (11) 4930-2210
              </p>
            </div>
          </div>

          {/* Card 3 - Support Hours */}
          <div className="bg-slate-50 dark:bg-slate-800 border border-slate-205 dark:border-slate-700/60 p-5 rounded-2xl flex flex-col justify-between">
            <div className="space-y-3">
              <div className="h-10 w-10 rounded-xl bg-teal-500/10 text-teal-500 flex items-center justify-center shrink-0">
                <Clock className="h-5 w-5" />
              </div>
              <h4 className="text-sm font-bold tracking-tight text-slate-905 dark:text-white">{t('get_touch.hours_lbl')}</h4>
              <p className="text-xs text-slate-400 dark:text-slate-400 leading-relaxed">
                Opds: Mon-Sat, 8am - 8pm<br />
                Emergencies: Active 24/7/365
              </p>
            </div>
          </div>

          {/* Card 4 - Clinical Email */}
          <div className="bg-slate-50 dark:bg-slate-800 border border-slate-205 dark:border-slate-700/60 p-5 rounded-2xl flex flex-col justify-between">
            <div className="space-y-3">
              <div className="h-10 w-10 rounded-xl bg-teal-500/10 text-teal-500 flex items-center justify-center shrink-0">
                <Mail className="h-5 w-5" />
              </div>
              <h4 className="text-sm font-bold tracking-tight text-slate-905 dark:text-white">{t('get_touch.email_lbl')}</h4>
              <p className="text-xs text-teal-500 dark:text-teal-400 font-mono font-semibold truncate leading-tight">
                support@auracarehospital.com<br />
                media@auracare.com
              </p>
            </div>
          </div>
        </div>

        {/* Form and Working Hours panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Interactive Secure Form Column */}
          <div className="lg:col-span-7 bg-slate-50 p-6 md:p-8 rounded-3xl border border-slate-105 dark:bg-slate-850 dark:border-slate-800 space-y-4">
            <h3 className="text-lg md:text-xl font-bold tracking-tight text-slate-900 dark:text-white inline-flex items-center gap-1.5">
              <ShieldCheck className="h-5 w-5 text-teal-500" />
              <span>Secure Clinical Desk Liaison</span>
            </h3>

            {success && (
              <div className="rounded-xl bg-teal-50 p-4 text-xs font-semibold text-teal-700 dark:bg-teal-500/10 dark:text-teal-400">
                {t('get_touch.success_msg')}
              </div>
            )}

            {errorMsg && (
              <div className="rounded-xl bg-red-50 p-4 text-xs text-red-600 dark:bg-red-500/15 dark:text-red-400">
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleContactSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1.5 dark:text-slate-400">{t('get_touch.form_name')} *</label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-xs text-slate-900 focus:border-teal-500 focus:outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1.5 dark:text-slate-400">{t('get_touch.form_email')} *</label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-xs text-slate-900 focus:border-teal-500 focus:outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1.5 dark:text-slate-400">{t('get_touch.form_phone')} *</label>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-xs text-slate-900 focus:border-teal-500 focus:outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1.5 dark:text-slate-400">{t('get_touch.form_subject')} *</label>
                  <input
                    type="text"
                    value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-xs text-slate-900 focus:border-teal-500 focus:outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 mb-1.5 dark:text-slate-400">{t('get_touch.form_msg')} *</label>
                <textarea
                  rows={4}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-xs text-slate-900 focus:border-teal-500 focus:outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                />
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto inline-flex items-center gap-1.5 rounded-xl bg-teal-500 px-6 py-3 text-xs font-bold text-white hover:bg-teal-600 transition-colors uppercase tracking-wide cursor-pointer"
                id="btn-contact-page-submit"
              >
                <span>Send Secure Enquiry</span>
                <Send className="h-4 w-4" />
              </button>
            </form>
          </div>

          {/* Working Hours schedule list on right */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 bg-slate-50 dark:bg-slate-850 rounded-3xl border border-slate-205 dark:border-slate-800 space-y-4">
              <h3 className="text-sm font-bold tracking-wider text-slate-400 uppercase">Working hours schedule</h3>
              <div className="divide-y divide-slate-200/50 dark:divide-slate-700 text-xs md:text-sm">
                <div className="flex justify-between py-2.5">
                  <span className="font-semibold text-slate-600 dark:text-slate-400">Cardiology OPDS:</span>
                  <span className="font-mono">Mon - Sat: 9am - 5pm</span>
                </div>
                <div className="flex justify-between py-2.5">
                  <span className="font-semibold text-slate-600 dark:text-slate-400">Neurology Clinic:</span>
                  <span className="font-mono">Mon - Fri: 10am - 4pm</span>
                </div>
                <div className="flex justify-between py-2.5">
                  <span className="font-semibold text-slate-600 dark:text-slate-400">Pediatric Wards Visit:</span>
                  <span className="font-mono">Daily: 11am - 1pm, 5pm - 7pm</span>
                </div>
                <div className="flex justify-between py-2.5">
                  <span className="font-semibold text-slate-600 dark:text-slate-400">Diagnostic Scans Lab:</span>
                  <span className="font-mono text-teal-600 dark:text-teal-400 font-bold">24 Hrs Operational</span>
                </div>
              </div>
            </div>

            {/* Emergency Alerts cards */}
            <div className="bg-red-500/5 p-5 rounded-3xl border border-red-500/10 flex items-start gap-4 text-left">
              <AlertOctagon className="h-6 w-6 text-red-500 shrink-0 mt-0.5 animate-bounce" />
              <div>
                <h4 className="text-xs font-bold uppercase tracking-widest text-red-500">Immediate Triage Access</h4>
                <p className="text-[11px] md:text-xs text-slate-500 dark:text-slate-450 leading-relaxed mt-2.5">
                  AuraCare emergency rooms do not require prepayment checks for acute cardiac distress, breathing collapses, or heavy trauma injuries. Dial +1 (800) 555-0199 for instant dispatch.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Embedded Google Map Section */}
        <div className="space-y-4">
          <div className="flex items-center gap-2.5">
            <Compass className="h-5 w-5 text-teal-500" />
            <h3 className="text-lg md:text-xl font-bold tracking-tight text-slate-900 dark:text-white">AuraCare Location Directory</h3>
          </div>
          
          <div className="rounded-3xl border border-slate-200 overflow-hidden shadow dark:border-slate-800 bg-slate-100 aspect-3/1 min-h-[300px]">
            <iframe
              title="AuraCare Hospital location maps"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14008.27218698944!2d77.206584!3d28.571431!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce2419a4e32d1%3A0x6ef7bf4b4e2b02bb!2sAll%20India%20Institute%20of%20Medical%20Sciences!5e0!3m2!1sen!2sin!4v1623512345678!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer"
              className="grayscale dark:invert"
            />
          </div>
        </div>

        {/* In-page FAQ Section pulling reusable data */}
        <div className="pt-8 border-t border-slate-150/40 dark:border-slate-800 space-y-8">
          <div className="text-center max-w-2xl mx-auto">
            <h3 className="text-xl md:text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
              {t('faq_p.title') || 'Frequently Asked Questions'}
            </h3>
            <p className="text-xs text-slate-400 mt-1">Clear answers regarding visits, insurance partners, and appointment procedures.</p>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {faqData.map((item) => {
              const isOpen = openFaq === item.id;
              return (
                <div
                  key={item.id}
                  className="bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200/50 dark:border-slate-705/80 overflow-hidden"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : item.id)}
                    className="w-full p-4 text-left flex items-center justify-between font-semibold text-xs md:text-sm text-slate-900 dark:text-white focus:outline-none cursor-pointer"
                  >
                    <span>{currentLang === 'hi' ? item.question_hi : item.question}</span>
                    <HelpIcon className={`h-4.5 w-4.5 text-slate-400 shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
                  </button>
                  
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="p-4 pt-0 text-xs md:text-sm text-slate-550 dark:text-slate-405 leading-relaxed">
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

      </div>
    </div>
  );
};
