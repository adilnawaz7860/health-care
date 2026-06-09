import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShieldPlus, Mail, Phone, MapPin, Clock, Twitter, Linkedin, Facebook, ShieldCheck, Heart } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export const Footer: React.FC = () => {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language || 'en';

  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.trim()) {
      setErrorMsg('Email required');
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(newsletterEmail)) {
      setErrorMsg('Invalid email format');
      return;
    }

    // Persist newsletter registration
    const currentSubs = JSON.parse(localStorage.getItem('auracare_newsletter') || '[]');
    currentSubs.push({ email: newsletterEmail, timestamp: new Date().toISOString() });
    localStorage.setItem('auracare_newsletter', JSON.stringify(currentSubs));

    setSuccess(true);
    setErrorMsg('');
    setNewsletterEmail('');
    setTimeout(() => setSuccess(false), 4000);
  };

  const quickLinks = [
    { label: t('nav.home'), url: '/' },
    { label: t('nav.about'), url: '/about' },
    { label: t('nav.services'), url: '/services' },
    { label: t('nav.gallery'), url: '/gallery' },
    { label: t('nav.news'), url: '/news' },
    { label: t('nav.contact'), url: '/contact' },
  ];

  const featuredDepts = [
    { name: 'Cardiology', name_hi: 'हृदय रोग विभाग', url: '/services?tab=cardiology' },
    { name: 'Neurology', name_hi: 'न्यूरोलॉजी विभाग', url: '/services?tab=neurology' },
    { name: 'Orthopedics', name_hi: 'अस्थि रोग विभाग', url: '/services?tab=orthopedics' },
    { name: 'Pediatrics', name_hi: 'बाल रोग विभाग', url: '/services?tab=pediatrics' },
    { name: 'Gynecology', name_hi: 'स्त्री रोग विभाग', url: '/services?tab=gynecology' },
    { name: 'Dentistry', name_hi: 'दंत चिकित्सा विभाग', url: '/services?tab=dentistry' },
  ];

  return (
    <footer className="bg-slate-900 border-t border-slate-800 text-slate-300 dark:bg-slate-950 transition-colors duration-200">
      {/* Top emergency core ribbon header */}
      <div className="bg-gradient-to-r from-teal-600 to-emerald-600 py-4.5 text-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 sm:px-6 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-2.5">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/10 backdrop-blur-md">
              <ShieldCheck className="h-5.5 w-5.5 text-white animate-pulse" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-widest font-bold font-sans text-teal-100 mb-0.5">
                {t('footer.emergency_callout')}
              </p>
              <h4 className="text-sm md:text-base font-bold font-mono text-white leading-tight">
                {currentLang === 'hi' ? 'त्वरित आपातकालीन एम्बुलेंस परामर्श हेल्पलाइन' : 'Immediate ICU Ambulance Consultation Hotline'}
              </h4>
            </div>
          </div>
          <a
            href="tel:+18005550199"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-2.5 text-sm font-bold text-teal-600 shadow-md hover:bg-slate-50 active:scale-95 transition-all text-center"
            id="footer-callout-phone"
          >
            <Phone className="h-4.5 w-4.5 text-teal-500 fill-teal-500" />
            <span>{t('footer.emergency_num')}</span>
          </a>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 md:py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 md:gap-12">
        {/* About column */}
        <div className="col-span-1 md:col-span-1 lg:col-span-4 space-y-4">
          <Link to="/" className="flex items-center gap-2 group max-w-max pb-1">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-500 text-white shadow-md shadow-teal-500/20 group-hover:scale-105 transition-transform">
              <ShieldPlus className="h-6 w-6 stroke-[2.2]" />
            </div>
            <span className="font-sans text-xl font-bold tracking-tight text-white">
              Aura<span className="text-teal-500">Care</span>
            </span>
          </Link>
          <p className="text-xs md:text-sm text-slate-400 leading-relaxed">
            {t('footer.desc')}
          </p>
          <div className="flex items-center gap-2.5 pt-1">
            <a
              href="https://twitter.com"
              target="_blank"
              referrerPolicy="no-referrer"
              className="flex h-8.5 w-8.5 items-center justify-center rounded-lg bg-slate-800 text-slate-400 hover:bg-teal-500 hover:text-white transition-all cursor-pointer"
              aria-label="Twitter Profile link"
              id="social-twitter"
            >
              <Twitter className="h-4.5 w-4.5" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              referrerPolicy="no-referrer"
              className="flex h-8.5 w-8.5 items-center justify-center rounded-lg bg-slate-800 text-slate-400 hover:bg-teal-500 hover:text-white transition-all cursor-pointer"
              aria-label="Linkedin Company link"
              id="social-linkedin"
            >
              <Linkedin className="h-4.5 w-4.5" />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              referrerPolicy="no-referrer"
              className="flex h-8.5 w-8.5 items-center justify-center rounded-lg bg-slate-800 text-slate-400 hover:bg-teal-500 hover:text-white transition-all cursor-pointer"
              aria-label="Facebook Profile link"
              id="social-facebook"
            >
              <Facebook className="h-4.5 w-4.5" />
            </a>
          </div>
        </div>

        {/* Quick Links column */}
        <div className="col-span-1 md:col-span-1 lg:col-span-2 space-y-4 text-left">
          <h4 className="text-xs font-bold tracking-wider text-slate-200 uppercase">
            {t('footer.quick_links')}
          </h4>
          <ul className="space-y-2 text-xs md:text-sm">
            {quickLinks.map((item) => (
              <li key={item.url}>
                <Link
                  to={item.url}
                  className="text-slate-400 hover:text-teal-400 hover:underline transition-colors block py-0.5"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Services column */}
        <div className="col-span-1 md:col-span-1 lg:col-span-2 space-y-4 text-left">
          <h4 className="text-xs font-bold tracking-wider text-slate-200 uppercase">
            {t('footer.services')}
          </h4>
          <ul className="space-y-2 text-xs md:text-sm">
            {featuredDepts.map((item) => (
              <li key={item.name}>
                <Link
                  to={item.url}
                  className="text-slate-400 hover:text-teal-400 hover:underline transition-colors block py-0.5"
                >
                  {currentLang === 'hi' ? item.name_hi : item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Newsletter column */}
        <div className="col-span-1 md:col-span-1 lg:col-span-4 space-y-4 text-left">
          <h4 className="text-xs font-bold tracking-wider text-slate-200 uppercase">
            {t('footer.newsletter')}
          </h4>
          <p className="text-xs text-slate-400 leading-relaxed">
            {t('footer.newsletter_sub')}
          </p>

          <form onSubmit={handleNewsletterSubmit} className="space-y-2 max-w-md">
            <div className="relative">
              <input
                type="email"
                value={newsletterEmail}
                onChange={(e) => {
                  setNewsletterEmail(e.target.value);
                  setErrorMsg('');
                }}
                placeholder="your.email@gmail.com"
                className="w-full rounded-xl border border-slate-700 bg-slate-800 px-3.5 py-2.5 pr-12 text-xs text-white placeholder-slate-500 focus:border-teal-500 focus:bg-slate-800 focus:outline-none"
              />
              <button
                type="submit"
                className="absolute right-1.5 top-1/2 -translate-y-1/2 rounded-lg bg-teal-500 px-3 py-1.5 text-[10px] font-bold text-white hover:bg-teal-600 transition-colors cursor-pointer uppercase"
                id="footer-btn-subscribe"
              >
                Go
              </button>
            </div>
            {errorMsg && <p className="text-[11px] text-red-400">{errorMsg}</p>}
            {success && <p className="text-[11px] text-teal-400 font-semibold">{t('footer.newsletter_success')}</p>}
          </form>

          {/* Core Opening hours card inside Footer */}
          <div className="flex gap-2.5 bg-slate-800/45 p-3 rounded-xl border border-slate-800 max-w-md">
            <Clock className="h-5 w-5 text-teal-400 shrink-0 mt-0.5 animate-pulse-slow" />
            <div>
              <p className="text-[10px] text-slate-500 uppercase tracking-wider font-bold">OPD Schedule Hours</p>
              <p className="text-[11px] text-slate-300 leading-snug mt-0.5">Mon - Sat: 8:00 AM - 8:00 PM. Sundowns Closed.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright / credential footer bottom strip */}
      <div className="border-t border-slate-800 bg-slate-950 py-6 text-center text-xs text-slate-500 px-4 sm:px-6">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 md:flex-row md:items-center md:justify-between text-slate-400">
          <p className="text-[11px] leading-relaxed max-w-2xl mx-auto md:mx-0 text-slate-400 text-left">
            {t('footer.copyright')}
          </p>
          <div className="flex items-center justify-center gap-1 text-[11px] text-slate-500 font-medium whitespace-nowrap shrink-0">
            <span>Formulated with</span>
            <Heart className="h-3 w-3 text-red-500 fill-red-500 animate-pulse" />
            <span>for Medical Integrity</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
