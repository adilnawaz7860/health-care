import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { Eye, X, Play, Image as ImageIcon, Video, ShieldCheck, ChevronRight } from 'lucide-react';
import { Breadcrumb } from '../components/Breadcrumb';
import galleryData from '../data/gallery.json';
import { GalleryItem } from '../types';

export const Gallery: React.FC = () => {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language || 'en';

  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedImg, setSelectedImg] = useState<GalleryItem | null>(null);

  const filters = ['All', 'Doctors', 'Facilities', 'Events'];

  const filteredItems = galleryData.filter((item) => {
    return activeFilter === 'All' || item.category.toLowerCase() === activeFilter.toLowerCase();
  });

  const getTranslatedCategory = (cat: string) => {
    if (currentLang === 'hi') {
      if (cat.toLowerCase() === 'doctors') return 'डॉक्टर टीम';
      if (cat.toLowerCase() === 'facilities') return 'अस्पताल सुविधाएं';
      if (cat.toLowerCase() === 'events') return 'सत्र और शिविर';
    }
    return cat;
  };

  // Mock videos with play actions
  const videos = [
    { id: 'v1', title: 'Virtual Walkthrough of AuraCare Wards', title_hi: 'आभाकेयर अस्पताल वार्डों का वर्चुअल वॉकथ्रू', image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=400', duration: '3.5 min' },
    { id: 'v2', title: 'Robotic Orthoplasty Live Demo Highlights', title_hi: 'रोबोटिक ऑर्थोप्लास्टी लाइव डेमो हाइलाइट्स', image: 'https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&q=80&w=400', duration: '5 min' },
  ];

  return (
    <div className="bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 transition-colors duration-200">
      
      {/* Breadcrumb banner */}
      <Breadcrumb
        title={t('gallery_page.title')}
        paths={[{ label: t('nav.gallery') }]}
      />

      <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 space-y-12">
        
        {/* Floating Category Filter Rail */}
        <div className="flex flex-wrap justify-center gap-3">
          {filters.map((fil) => {
            const isSelected = activeFilter === fil;
            let filterLabel = fil;
            if (currentLang === 'hi') {
              if (fil === 'All') filterLabel = 'सभी चित्र';
              if (fil === 'Doctors') filterLabel = 'डॉक्टरों की टीम';
              if (fil === 'Facilities') filterLabel = 'सुविधाएं';
              if (fil === 'Events') filterLabel = 'आयोजन और शिविर';
            }
            return (
              <button
                key={fil}
                onClick={() => setActiveFilter(fil)}
                className={`px-5 py-2 text-xs md:text-sm font-semibold rounded-full border transition-all cursor-pointer ${
                  isSelected
                  ? 'bg-teal-500 text-white border-teal-500 shadow-md shadow-teal-500/15'
                  : 'bg-white border-slate-200 text-slate-655 hover:border-teal-500 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-300'
                }`}
              >
                {filterLabel}
              </button>
            );
          })}
        </div>

        {/* Portfolios Media Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                key={item.id}
                className="group relative rounded-2xl overflow-hidden border border-slate-200/40 dark:border-slate-800 shadow-sm cursor-pointer aspect-4/3"
                onClick={() => setSelectedImg(item)}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-350 shrink-0"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />
                
                {/* Visual Glass overlays */}
                <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col justify-between p-4 text-left">
                  <div className="flex justify-end">
                    <div className="h-8.5 w-8.5 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white">
                      <Eye className="h-4.5 w-4.5" />
                    </div>
                  </div>
                  <div>
                    <span className="text-[9px] font-bold tracking-widest text-teal-400 uppercase font-mono">
                      {getTranslatedCategory(item.category)}
                    </span>
                    <h4 className="text-xs md:text-sm font-bold text-white mt-1 leading-tight">
                      {currentLang === 'hi' ? item.title_hi : item.title}
                    </h4>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Video virtual walkthrough rail */}
        <div className="pt-8 border-t border-slate-150/40 dark:border-slate-800 space-y-8">
          <div className="text-left space-y-1.5 max-w-2xl">
            <span className="text-xs font-bold text-teal-500 uppercase tracking-widest block font-mono">
              {t('gallery_page.video_title')}
            </span>
            <h3 className="text-xl md:text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
              {t('gallery_page.video_subtitle')}
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {videos.map((vid) => (
              <div
                key={vid.id}
                className="group relative rounded-2xl overflow-hidden border border-slate-200/50 dark:border-slate-750/70 shadow aspect-video cursor-pointer"
              >
                <img
                  src={vid.image}
                  alt={vid.title}
                  className="w-full h-full object-cover opacity-80 group-hover:scale-103 transition-transform duration-350 shrink-0"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-slate-950/40 flex items-center justify-center">
                  <div className="h-14 w-14 rounded-full bg-teal-500 text-white flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
                    <Play className="h-6 w-6 stroke-[2.5]" />
                  </div>
                </div>
                <div className="absolute bottom-4 left-4 right-4 bg-slate-900/80 backdrop-blur-md p-3.5 rounded-xl text-left flex justify-between items-center text-xs text-white">
                  <div>
                    <h5 className="font-bold leading-tight line-clamp-1">{currentLang === 'hi' ? vid.title_hi : vid.title}</h5>
                    <span className="text-[10px] text-slate-400 block mt-0.5 font-mono">Walkthrough Video</span>
                  </div>
                  <span className="font-mono text-teal-400 font-bold tracking-wide shrink-0 bg-teal-500/10 px-2 py-0.5 rounded border border-teal-500/20">{vid.duration}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Lightbox Overlay modal */}
      <AnimatePresence>
        {selectedImg && (
          <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedImg(null)}
              className="absolute inset-0 bg-slate-950/85 backdrop-blur-md"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative max-w-4xl max-h-[85vh] w-full overflow-hidden rounded-2xl bg-black shadow-2xl flex flex-col justify-between"
            >
              {/* Close Button clickable */}
              <button
                onClick={() => setSelectedImg(null)}
                className="absolute top-4 right-4 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-black/40 text-white hover:bg-black/60 cursor-pointer focus:outline-none"
                aria-label="Close Lightbox"
                id="btn-close-lightbox"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="overflow-hidden flex-1 flex justify-center items-center bg-zinc-950">
                <img
                  src={selectedImg.image}
                  alt={selectedImg.title}
                  className="max-h-[70vh] object-contain shrink-0 max-w-full"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Caption Banner overlay footer */}
              <div className="bg-slate-900/90 backdrop-blur-md p-4 text-left border-t border-slate-800 text-white space-y-1">
                <span className="text-[10px] font-bold text-teal-400 uppercase tracking-widest font-mono">
                  {getTranslatedCategory(selectedImg.category)}
                </span>
                <h4 className="text-sm md:text-base font-bold leading-tight">
                  {currentLang === 'hi' ? selectedImg.title_hi : selectedImg.title}
                </h4>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};
