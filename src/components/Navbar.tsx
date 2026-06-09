import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { ShieldPlus, Sun, Moon, Languages, Menu, X, ChevronDown, Heart, Brain, Bone, Baby, UserCheck, Stethoscope } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../contexts/ThemeContext';

interface NavbarProps {
  onOpenBooking: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenBooking }) => {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language || 'en';
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);

  const toggleLanguage = () => {
    const nextLang = currentLang === 'en' ? 'hi' : 'en';
    i18n.changeLanguage(nextLang);
    localStorage.setItem('auracare_lang', nextLang);
  };

  const menuItems = [
    { label: t('nav.home'), url: '/' },
    { label: t('nav.about'), url: '/about' },
    { label: t('nav.services'), url: '/services', isMega: true },
    { label: t('nav.gallery'), url: '/gallery' },
    { label: t('nav.news'), url: '/news' },
    { label: t('nav.contact'), url: '/contact' },
  ];

  // Specific featured departments inside mega menu
  const megaDepartments = [
    { title: 'Cardiology', title_hi: 'हृदय रोग विभाग', desc: 'Heart care solutions', icon: Heart, url: '/services?tab=cardiology', color: 'text-red-500 bg-red-50 dark:bg-red-500/10' },
    { title: 'Neurology', title_hi: 'न्यूरोलॉजी विभाग', desc: 'Brain & nervous system', icon: Brain, url: '/services?tab=neurology', color: 'text-indigo-500 bg-indigo-50 dark:bg-indigo-500/10' },
    { title: 'Orthopedics', title_hi: 'अस्थि रोग विभाग', desc: 'Joint reconstructions', icon: Bone, url: '/services?tab=orthopedics', color: 'text-amber-500 bg-amber-50 dark:bg-amber-500/10' },
    { title: 'Pediatrics', title_hi: 'बाल रोग विभाग', desc: 'Newborn special support', icon: Baby, url: '/services?tab=pediatrics', color: 'text-pink-500 bg-pink-50 dark:bg-pink-500/10' },
    { title: 'Gynecology', title_hi: 'स्त्री रोग विभाग', desc: 'Maternity & IVF care', icon: UserCheck, url: '/services?tab=gynecology', color: 'text-teal-500 bg-teal-50 dark:bg-teal-500/10' },
    { title: 'General Medicine', title_hi: 'सामान्य चिकित्सा', desc: 'Aesthetic body review', icon: Stethoscope, url: '/services?tab=general-medicine', color: 'text-emerald-500 bg-emerald-50 dark:bg-emerald-500/10' },
  ];

  return (
    <>
      <header className="sticky top-0 z-90 w-full border-b border-light-theme border-slate-200/50 bg-white/80 backdrop-blur-md dark:border-slate-800/80 dark:bg-slate-900/80 transition-colors duration-200">
        <div className="mx-auto flex max-w-7xl h-16 md:h-20 items-center justify-between px-4 sm:px-6">
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-2 group focus:outline-none" id="nav-brand-logo">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-500 text-white shadow-md shadow-teal-500/20 group-hover:scale-105 transition-transform duration-200">
              <ShieldPlus className="h-6 w-6 stroke-[2.2]" />
            </div>
            <div className="flex flex-col">
              <span className="font-sans text-lg font-bold tracking-tight text-slate-900 dark:text-white leading-none">
                Aura<span className="text-teal-500">Care</span>
              </span>
              <span className="text-[10px] font-semibold text-slate-400 dark:text-slate-500 tracking-wider uppercase mt-0.5 leading-none">
                {currentLang === 'hi' ? 'सुपर स्पेशियलिटी' : 'Multi-Specialty'}
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8">
            {menuItems.map((item) => {
              const isActive = location.pathname === item.url;
              if (item.isMega) {
                return (
                  <div
                    key={item.url}
                    className="relative py-2"
                    onMouseEnter={() => setIsMegaMenuOpen(true)}
                    onMouseLeave={() => setIsMegaMenuOpen(false)}
                  >
                    <Link
                      to="/services"
                      onClick={() => setIsMegaMenuOpen(false)}
                      className="flex items-center gap-1 text-sm font-medium text-slate-700 hover:text-teal-500 dark:text-slate-300 dark:hover:text-teal-400 transition-colors cursor-pointer focus:outline-none"
                    >
                      {item.label}
                      <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${isMegaMenuOpen ? 'rotate-180' : ''}`} />
                    </Link>

                    {/* Mega Menu Drop Down */}
                    <AnimatePresence>
                      {isMegaMenuOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          transition={{ duration: 0.15 }}
                          className="absolute left-1/2 top-full -translate-x-1/2 mt-1 w-[460px] rounded-2xl bg-white p-4 shadow-xl border border-slate-100 dark:bg-slate-800 dark:border-slate-700 text-left overflow-hidden z-20"
                        >
                          <div className="mb-2 px-2 border-b border-slate-100 dark:border-slate-700/60 pb-2">
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">
                              {currentLang === 'hi' ? 'शीर्ष विशेषताएं' : 'Featured Departments'}
                            </span>
                          </div>
                          <div className="grid grid-cols-2 gap-2">
                            {megaDepartments.map((dept) => {
                              const DeptIcon = dept.icon;
                              return (
                                <Link
                                  key={dept.title}
                                  to={dept.url}
                                  onClick={() => setIsMegaMenuOpen(false)}
                                  className="flex items-start gap-3 rounded-xl p-2.5 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors group"
                                >
                                  <div className={`p-2 rounded-lg ${dept.color} group-hover:scale-105 transition-transform shrink-0`}>
                                    <DeptIcon className="h-4.5 w-4.5" />
                                  </div>
                                  <div>
                                    <h4 className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                                      {currentLang === 'hi' ? dept.title_hi : dept.title}
                                    </h4>
                                    <span className="text-[10px] text-slate-400 block mt-0.5 leading-tight">
                                      {dept.desc}
                                    </span>
                                  </div>
                                </Link>
                              );
                            })}
                          </div>
                          <div className="mt-3 bg-teal-500/5 dark:bg-teal-500/10 p-2 rounded-xl text-center">
                            <Link
                              to="/services"
                              onClick={() => setIsMegaMenuOpen(false)}
                              className="text-xs font-semibold text-teal-600 dark:text-teal-400 hover:underline inline-flex items-center gap-1"
                            >
                              {currentLang === 'hi' ? 'सभी १६ विशिष्टताएं देखें →' : 'Explore All 16 Specialty Portfolios →'}
                            </Link>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              }

              return (
                <Link
                  key={item.url}
                  to={item.url}
                  className={`text-sm font-medium transition-colors duration-150 py-2 relative hover:text-teal-500 ${
                    isActive ? 'text-teal-500 dark:text-teal-400 font-semibold' : 'text-slate-700 dark:text-slate-300'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <motion.span
                      layoutId="navUnderline"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-teal-500 rounded-full"
                      transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Utilities (Language, Theme, CTA Booking) */}
          <div className="hidden lg:flex items-center gap-4">
            {/* Language Switcher */}
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium border border-slate-200 rounded-lg text-slate-700 hover:bg-slate-50 hover:text-teal-500 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-teal-400 transition-all cursor-pointer"
              title="Switch language"
              id="btn-lang-switch"
            >
              <Languages className="h-4 w-4" />
              <span>{currentLang === 'hi' ? 'English 🇬🇧' : 'हिन्दी 🇮🇳'}</span>
            </button>

            {/* Dark/Light Theme Switching */}
            <button
              onClick={toggleTheme}
              className="flex h-9 w-9 items-center justify-center border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50 hover:text-teal-500 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-teal-400 transition-all cursor-pointer"
              title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              id="btn-theme-switch"
            >
              {theme === 'dark' ? <Sun className="h-4.5 w-4.5" /> : <Moon className="h-4.5 w-4.5" />}
            </button>

            {/* Appointment Main CTA */}
            <button
              onClick={onOpenBooking}
              className="rounded-xl bg-slate-900 px-4.5 py-2 text-xs font-bold font-sans tracking-tight text-white hover:bg-teal-500 active:scale-95 shadow-md shadow-slate-900/10 dark:bg-white dark:text-slate-900 dark:hover:bg-teal-500 dark:hover:text-white transition-all cursor-pointer uppercase"
              id="btn-nav-book"
            >
              {t('nav.book_btn')}
            </button>
          </div>

          {/* Mobile Right Tools & Hamburger Menu */}
          <div className="flex lg:hidden items-center gap-2">
            {/* Language switch on mobile directly */}
            <button
              onClick={toggleLanguage}
              className="p-1 px-2 border border-slate-200/50 rounded-lg text-xs font-medium dark:border-slate-700 text-slate-600 dark:text-slate-300 flex items-center gap-1"
            >
              <span className="text-sm">🇮🇳</span>
              <span>{currentLang === 'hi' ? 'EN' : 'HI'}</span>
            </button>

            <button
              onClick={toggleTheme}
              className="p-2 text-slate-600 dark:text-slate-300"
              aria-label="Toggle Theme"
            >
              {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-slate-700 dark:text-slate-300 hover:text-teal-500 focus:outline-none cursor-pointer"
              aria-label="Navigation Menu"
              id="btn-mobile-menu"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation with Framer Motion */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden border-b border-slate-100 bg-white dark:border-slate-800 dark:bg-slate-900 w-full overflow-hidden absolute z-80 transition-colors"
          >
            <div className="flex flex-col gap-4 px-4 py-6 text-left">
              {menuItems.map((item) => (
                <Link
                  key={item.url}
                  to={item.url}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`text-base font-semibold border-b border-slate-50 pb-2 dark:border-slate-800/40 hover:text-teal-500 ${
                    location.pathname === item.url ? 'text-teal-500' : 'text-slate-800 dark:text-slate-200'
                  }`}
                >
                  {item.label}
                </Link>
              ))}

              <button
                onClick={() => {
                  onOpenBooking();
                  setIsMobileMenuOpen(false);
                }}
                className="mt-2 w-full rounded-xl bg-teal-500 py-3 text-center text-sm font-bold text-white shadow-md shadow-teal-500/10 cursor-pointer uppercase tracking-tight"
                id="btn-mobile-book"
              >
                {t('nav.book_btn')}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
