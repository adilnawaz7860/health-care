import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Heart, Brain, Bone, Baby, User, Smile, Sparkles, Stethoscope, ShieldAlert, Scan, 
  Activity, Wind, Volume2, Eye, Zap, Accessibility, Search, ShieldCheck, ChevronRight, HelpCircle
} from 'lucide-react';
import { Breadcrumb } from '../components/Breadcrumb';
import servicesData from '../data/services.json';
import doctorsData from '../data/doctors.json';
import { Service, Doctor } from '../types';

interface ServicesProps {
  onOpenBooking: (doctorId?: string, department?: string) => void;
}

export const Services: React.FC<ServicesProps> = ({ onOpenBooking }) => {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language || 'en';
  
  // Parse URL query parameter for deep linking
  const location = useLocation();
  const getQueryTab = () => {
    const params = new URLSearchParams(location.search);
    return params.get('tab') || 'general-medicine';
  };

  const [activeTab, setActiveTab] = useState(getQueryTab());
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const qTab = getQueryTab();
    if (qTab && servicesData.some(s => s.id === qTab)) {
      setActiveTab(qTab);
    }
  }, [location.search]);

  // Set up standard mapping of string to Lucide icon components
  const iconMap: { [key: string]: React.ComponentType<any> } = {
    Heart,
    Brain,
    Bone,
    Baby,
    User,
    Smile,
    Sparkles,
    Stethoscope,
    ShieldAlert,
    Scan,
    Activity,
    Wind,
    Volume2,
    Eye,
    Zap,
    Accessibility
  };

  const filteredServices = servicesData.filter((s) => {
    const sName = currentLang === 'hi' ? s.name_hi : s.name;
    const sDesc = currentLang === 'hi' ? s.desc_hi : s.desc;
    return sName.toLowerCase().includes(searchQuery.toLowerCase()) || 
           sDesc.toLowerCase().includes(searchQuery.toLowerCase());
  });

  // Find active service record
  const currentService = servicesData.find((s) => s.id === activeTab) || servicesData[0];

  // Retrieve matching doctor for active service
  const currentDoctor = (doctorsData as Doctor[]).find((doc) => doc.id === currentService.specialistId) || doctorsData[0];

  const CurrentIcon = iconMap[currentService.icon] || Stethoscope;

  return (
    <div className="bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 transition-colors duration-200">
      
      {/* Breadcrumb section */}
      <Breadcrumb
        title={t('services_page.title')}
        paths={[{ label: t('nav.services') }]}
      />

      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start text-left">
          
          {/* Left panel - Search column & tabs select */}
          <div className="lg:col-span-4 space-y-4">
            
            {/* Search field */}
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t('services_page.search_placeholder')}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs md:text-sm text-slate-900 focus:border-teal-500 focus:bg-white focus:outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-white"
              />
            </div>

            {/* List / Tabs vertical stack */}
            <div className="rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-850 overflow-hidden max-h-[580px] overflow-y-auto">
              <div className="bg-slate-50 dark:bg-slate-800 p-3 border-b border-slate-200 dark:border-slate-800/80">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{t('services_page.all_lbl')}</span>
              </div>
              
              <div className="divide-y divide-slate-105 dark:divide-slate-800">
                {filteredServices.map((s) => {
                  const TabIcon = iconMap[s.icon] || Stethoscope;
                  const isActive = s.id === activeTab;
                  return (
                    <button
                      key={s.id}
                      onClick={() => setActiveTab(s.id)}
                      className={`w-full p-3.5 text-left flex items-center justify-between text-xs md:text-sm transition-all focus:outline-none cursor-pointer ${
                        isActive 
                        ? 'bg-teal-500/10 text-teal-600 font-bold border-l-4 border-teal-500 dark:bg-teal-500/15 dark:text-teal-400' 
                        : 'hover:bg-slate-50 text-slate-700 dark:text-slate-300 dark:hover:bg-slate-800'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <TabIcon className={`h-4.5 w-4.5 ${isActive ? 'text-teal-500' : 'text-slate-400'}`} />
                        <span>{currentLang === 'hi' ? s.name_hi : s.name}</span>
                      </div>
                      <ChevronRight className={`h-3.5 w-3.5 text-slate-300 ${isActive ? 'text-teal-500 stroke-[3px]' : ''}`} />
                    </button>
                  );
                })}

                {filteredServices.length === 0 && (
                  <div className="py-8 text-center text-xs text-slate-400">
                    No matching services found.
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right panel - Responsive Full Details canvas */}
          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentService.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 12 }}
                transition={{ duration: 0.18 }}
                className="bg-white dark:bg-slate-850 p-6 md:p-8 rounded-2xl border border-slate-200/50 dark:border-slate-800 shadow-sm space-y-6"
              >
                
                {/* Header title */}
                <div className="flex items-center gap-4 border-b border-slate-100 dark:border-slate-700/60 pb-5">
                  <div className="p-3.5 rounded-xl bg-teal-500/10 text-teal-600 dark:bg-teal-500/15 dark:text-teal-400">
                    <CurrentIcon className="h-7 w-7" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-teal-500 uppercase tracking-widest block font-mono">Specialty Portfolio</span>
                    <h2 className="text-xl md:text-3xl font-sans font-extrabold text-slate-900 dark:text-white mt-1">
                      {currentLang === 'hi' ? currentService.name_hi : currentService.name}
                    </h2>
                  </div>
                </div>

                {/* Medical Overview description */}
                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Clinical Overview</h4>
                  <p className="text-sm md:text-base text-slate-600 dark:text-slate-300 leading-relaxed font-sans">
                    {currentLang === 'hi' ? currentService.desc_hi : currentService.desc}
                  </p>
                </div>

                {/* Exclusive Benefits of care & procedures */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                  
                  {/* Benefits */}
                  <div className="space-y-3">
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">{t('services_page.benefits_header')}</h4>
                    <ul className="space-y-2.5 text-xs md:text-sm">
                      {(currentLang === 'hi' ? currentService.benefits_hi : currentService.benefits).map((benefit, i) => (
                        <li key={i} className="flex items-start gap-2 text-slate-600 dark:text-slate-300">
                          <ShieldCheck className="h-4.5 w-4.5 text-teal-500 shrink-0 mt-0.5" />
                          <span className="leading-tight">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Procedures performed */}
                  <div className="space-y-3">
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">{t('services_page.procedure_header')}</h4>
                    <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-100 dark:bg-slate-905 dark:border-slate-800">
                      {currentLang === 'hi' ? currentService.procedure_hi : currentService.procedure}
                    </p>
                  </div>
                </div>

                {/* Specialist panel linked */}
                <div className="pt-6 border-t border-slate-100 dark:border-slate-700/65 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                  <div className="md:col-span-7 text-left space-y-1">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">
                      {t('services_page.doctor_card_lbl')}
                    </span>
                    <h4 className="text-lg font-bold text-slate-900 dark:text-white">
                      {currentLang === 'hi' ? currentDoctor.name_hi : currentDoctor.name}
                    </h4>
                    <p className="text-xs text-teal-600 dark:text-teal-400 font-medium">
                      {currentLang === 'hi' ? currentDoctor.role_hi : currentDoctor.role}
                    </p>
                    <p className="text-xs text-slate-400 italic pt-1">
                      {currentLang === 'hi' ? currentDoctor.qualification_hi : currentDoctor.qualification}
                    </p>
                  </div>

                  <div className="md:col-span-5 flex justify-end">
                    <button
                      onClick={() => onOpenBooking(currentDoctor.id, currentService.name)}
                      className="w-full sm:w-auto rounded-xl bg-teal-500 px-6 py-3 text-xs font-bold text-white shadow shadow-teal-500/10 hover:bg-teal-605 uppercase tracking-wide cursor-pointer text-center"
                    >
                      {t('services_page.cta_btn')}
                    </button>
                  </div>
                </div>

              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>
    </div>
  );
};
