import React from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, Heart, Award, ArrowUpRight, Flame, Clock, BookOpen, Star, Sparkles, Smile, ShieldAlert } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Breadcrumb } from '../components/Breadcrumb';

interface AboutProps {
  onOpenBooking: () => void;
}

export const About: React.FC<AboutProps> = ({ onOpenBooking }) => {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language || 'en';

  const leaders = [
    {
      name: 'Dr. Devendra Roy',
      name_hi: 'डॉ. देवेन्द्र रॉय',
      role: 'Chief Executive Officer & Founder',
      role_hi: 'मुख्य कार्यकारी अधिकारी एवं संस्थापक',
      bio: '25+ years in hospital logistics and healthcare policy administration.',
      bio_hi: 'अस्पताल रसद और स्वास्थ्य सेवा नीति प्रशासन में 25+ वर्ष।',
      image: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=200'
    },
    {
      name: 'Dr. Sarah D\'Souza',
      name_hi: 'डॉ. सारा डिसूजा',
      role: 'Chief Medical Director',
      role_hi: 'मुख्य चिकित्सा निदेशक',
      bio: 'Leading clinical research panel, ensuring highest clinical safety protocols.',
      bio_hi: 'नैदानिक ​​अनुसंधान पैनल का नेतृत्व, उच्चतम नैदानिक ​​सुरक्षा प्रोटोकॉल सुनिश्चित करना।',
      image: 'https://images.unsplash.com/photo-1594824813573-246434de83fb?auto=format&fit=crop&q=80&w=200'
    },
    {
      name: 'Sister Mary Joseph',
      name_hi: 'सिस्टर मैरी जोसेफ',
      role: 'Chief Nursing Officer',
      role_hi: 'मुख्य नर्सिंग अधिकारी',
      bio: 'Decades of experience in inpatient nursing care and rehabilitation safety.',
      bio_hi: 'इनपेशेंट नर्सिंग देखभाल और पुनर्वास सुरक्षा में दशकों का अनुभव।',
      image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=200'
    }
  ];

  const timeline = [
    {
      year: t('about_page.timeline_e1_year'),
      title: t('about_page.timeline_e1_title'),
      desc: t('about_page.timeline_e1_desc')
    },
    {
      year: t('about_page.timeline_e2_year'),
      title: t('about_page.timeline_e2_title'),
      desc: t('about_page.timeline_e2_desc')
    },
    {
      year: t('about_page.timeline_e3_year'),
      title: t('about_page.timeline_e3_title'),
      desc: t('about_page.timeline_e3_desc')
    },
    {
      year: t('about_page.timeline_e4_year'),
      title: t('about_page.timeline_e4_title'),
      desc: t('about_page.timeline_e4_desc')
    }
  ];

  return (
    <div className="bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 transition-colors duration-200">
      {/* Dynamic Subpage Breadcrumb */}
      <Breadcrumb
        title={t('about_page.title')}
        paths={[{ label: t('nav.about') }]}
      />

      <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 space-y-16">
        
        {/* Story Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center text-left">
          <div className="lg:col-span-6 space-y-4">
            <span className="text-xs font-bold text-teal-500 uppercase tracking-widest">{t('about_page.title')}</span>
            <h2 className="text-2xl md:text-4xl font-sans font-extrabold text-slate-900 dark:text-white leading-tight">
              {t('about_page.story_heading')}
            </h2>
            <p className="text-sm md:text-base text-slate-500 dark:text-slate-400 leading-relaxed">
              {t('about_page.story_p')}
            </p>
            <div className="pt-2">
              <button
                onClick={onOpenBooking}
                className="inline-flex items-center gap-1.5 rounded-lg bg-teal-500 px-5 py-2.5 text-xs font-bold text-white hover:bg-teal-600 shadow"
              >
                <span>Book Hospital Visit</span>
                <ArrowUpRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="lg:col-span-6 relative rounded-2xl overflow-hidden shadow-lg border border-slate-250/20">
            <img
              src="https://images.unsplash.com/photo-1586773860418-d3b3c998c05c?auto=format&fit=crop&q=80&w=600"
              alt="AuraCare Hospital main entry towers"
              className="w-full h-[320px] object-cover"
              referrerPolicy="no-referrer"
              loading="lazy"
            />
          </div>
        </div>

        {/* Mission / Vision Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
          <div className="p-6 rounded-2xl bg-teal-500/5 dark:bg-teal-500/10 border border-teal-500/10 hover:border-teal-500/20 transition-all space-y-3">
            <div className="h-10 w-10 rounded-lg bg-teal-500 text-white flex items-center justify-center">
              <Flame className="h-5 w-5" />
            </div>
            <h3 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white">{t('about_page.mission_title')}</h3>
            <p className="text-xs md:text-sm text-slate-500 dark:text-slate-300 leading-relaxed">{t('about_page.mission_desc')}</p>
          </div>

          <div className="p-6 rounded-2xl bg-indigo-500/5 dark:bg-indigo-500/10 border border-indigo-500/10 hover:border-indigo-500/20 transition-all space-y-3">
            <div className="h-10 w-10 rounded-lg bg-indigo-500 text-white flex items-center justify-center">
              <Sparkles className="h-5 w-5" />
            </div>
            <h3 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white">{t('about_page.vision_title')}</h3>
            <p className="text-xs md:text-sm text-slate-500 dark:text-slate-300 leading-relaxed">{t('about_page.vision_desc')}</p>
          </div>
        </div>

        {/* Core Values Section */}
        <div className="space-y-8">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-sans font-extrabold text-slate-900 dark:text-white">{t('about_page.values_title')}</h2>
            <p className="text-xs md:text-sm text-slate-400 mt-2">Uncompromised and unbending professional paradigms driving surgical operations.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
            {/* V1 */}
            <div className="p-5 rounded-xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-850 flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold text-teal-500 font-mono tracking-widest uppercase">Value 01</span>
                <h4 className="text-base font-bold text-slate-900 dark:text-white mt-1.5">{t('about_page.v1_title')}</h4>
                <p className="text-xs text-slate-400 mt-2 leading-relaxed">{t('about_page.v1_desc')}</p>
              </div>
            </div>
            {/* V2 */}
            <div className="p-5 rounded-xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-850 flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold text-teal-500 font-mono tracking-widest uppercase">Value 02</span>
                <h4 className="text-base font-bold text-slate-900 dark:text-white mt-1.5">{t('about_page.v2_title')}</h4>
                <p className="text-xs text-slate-400 mt-2 leading-relaxed">{t('about_page.v2_desc')}</p>
              </div>
            </div>
            {/* V3 */}
            <div className="p-5 rounded-xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-850 flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold text-teal-500 font-mono tracking-widest uppercase">Value 03</span>
                <h4 className="text-base font-bold text-slate-900 dark:text-white mt-1.5">{t('about_page.v3_title')}</h4>
                <p className="text-xs text-slate-400 mt-2 leading-relaxed">{t('about_page.v3_desc')}</p>
              </div>
            </div>
            {/* V4 */}
            <div className="p-5 rounded-xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-850 flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold text-teal-500 font-mono tracking-widest uppercase">Value 04</span>
                <h4 className="text-base font-bold text-slate-900 dark:text-white mt-1.5">{t('about_page.v4_title')}</h4>
                <p className="text-xs text-slate-400 mt-2 leading-relaxed">{t('about_page.v4_desc')}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Hospital Timeline Chronology */}
        <div className="py-8 border-y border-slate-150/40 dark:border-slate-800">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-2xl md:text-3xl font-sans font-extrabold text-slate-900 dark:text-white">{t('about_page.timeline_title')}</h2>
            <p className="text-xs text-slate-400 mt-2">Major medical expansions and automated integrations across our active decades.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-left max-w-5xl mx-auto relative">
            {timeline.map((step, index) => (
              <div key={index} className="relative space-y-2">
                <div className="inline-block px-2.5 py-1 rounded bg-teal-500 text-white font-mono text-xs font-bold tracking-widest">
                  {step.year}
                </div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white pt-1">{step.title}</h4>
                <p className="text-xs text-slate-400 leading-normal">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Executive Management Leadership Panel */}
        <div className="space-y-8">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-sans font-extrabold text-slate-900 dark:text-white">{t('about_page.leadership_title')}</h2>
            <p className="text-xs text-slate-400 mt-2">Meet the administrative planners and clinical chiefs guiding hospital parameters.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {leaders.map((person, idx) => (
              <div key={idx} className="bg-slate-50 border border-slate-200/45 dark:bg-slate-800 dark:border-slate-705 p-5 rounded-2xl flex flex-col items-center text-center">
                <img
                  src={person.image}
                  alt={person.name}
                  className="h-24 w-24 rounded-full object-cover border-4 border-white dark:border-slate-700 shadow shrink-0"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />
                <h4 className="text-base font-bold text-slate-900 dark:text-white mt-4">
                  {currentLang === 'hi' ? person.name_hi : person.name}
                </h4>
                <p className="text-xs font-bold text-teal-600 dark:text-teal-400 mt-1">
                  {currentLang === 'hi' ? person.role_hi : person.role}
                </p>
                <p className="text-xs text-slate-400 mt-3 max-w-xs leading-normal">
                  {currentLang === 'hi' ? person.bio_hi : person.bio}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Global Certifications & Community Impact */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center text-left">
          <div className="lg:col-span-7 space-y-4">
            <h3 className="text-xl md:text-2xl font-bold tracking-tight text-slate-900 dark:text-white">{t('about_page.impact_title')}</h3>
            <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
              {t('about_page.impact_desc')}
            </p>
            <div className="flex flex-wrap items-center gap-6 pt-2">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-teal-500" />
                <span className="text-xs font-semibold text-slate-600 dark:text-slate-300">NABL Accredited</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-teal-500" />
                <span className="text-xs font-semibold text-slate-600 dark:text-slate-300">NABH Gold Standard</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-teal-500" />
                <span className="text-xs font-semibold text-slate-600 dark:text-slate-300">ISO 9001 Safety Code</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 p-6 rounded-2xl bg-indigo-950 text-white space-y-4 text-center">
            <h4 className="text-xs font-bold uppercase tracking-widest text-indigo-300 animate-pulse-slow">AuraCare Foundation impact</h4>
            <h3 className="text-3xl font-extrabold text-teal-400">12,500+ Rural Patients</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Assessed, treated, and supplied with genuine daily pharmaceuticals for free in our mobile healthcare camps over the past 12 calendar months alone.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};
