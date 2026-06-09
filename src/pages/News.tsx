import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { Search, Clock, User, BookOpen, Calendar, ArrowRight, Sparkles, Filter } from 'lucide-react';
import { Breadcrumb } from '../components/Breadcrumb';
import newsData from '../data/news.json';
import { NewsItem } from '../types';

export const News: React.FC = () => {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language || 'en';

  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);

  const categories = ['All', 'Technology', 'Cardiac Wellness', 'Pediatrics'];

  const filteredNews = newsData.filter((item) => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.author.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'All' || item.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  // Featured spotlight is the very first matching article
  const featuredArticle = filteredNews[0] || newsData[0];
  const remainingNews = filteredNews.slice(1);

  const itemsPerPage = 6;
  const totalPages = Math.max(1, Math.ceil(remainingNews.length / itemsPerPage));
  const paginatedNews = remainingNews.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const getTranslatedCategory = (cat: string) => {
    if (currentLang === 'hi') {
      if (cat.toLowerCase() === 'technology') return 'प्रौद्योगिकी';
      if (cat.toLowerCase() === 'cardiac wellness') return 'हृदय कल्याण';
      if (cat.toLowerCase() === 'pediatrics') return 'शिशु शिशु देखभाल';
    }
    return cat;
  };

  return (
    <div className="bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 transition-colors duration-200">
      
      <Breadcrumb
        title={t('news_p.title')}
        paths={[{ label: t('nav.news') }]}
      />

      <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 space-y-12">
        
        {/* Spotlight Showcase (Featured Article) */}
        {featuredArticle && searchQuery === '' && activeCategory === 'All' && (
          <div className="bg-slate-50 border border-slate-205 dark:bg-slate-850 dark:border-slate-800 rounded-3xl overflow-hidden shadow-lg grid grid-cols-1 lg:grid-cols-12 gap-6 p-4 md:p-6 text-left items-center">
            <div className="lg:col-span-6 relative rounded-2xl overflow-hidden aspect-video">
              <img
                src={featuredArticle.image}
                alt={featuredArticle.title}
                className="w-full h-full object-cover shrink-0"
                referrerPolicy="no-referrer"
              />
              <span className="absolute top-4 left-4 inline-flex items-center gap-1.5 px-3 py-1 bg-teal-500 rounded-xl text-white font-mono text-[10px] font-bold tracking-widest uppercase">
                <Sparkles className="h-3 w-3" />
                Featured Publication
              </span>
            </div>

            <div className="lg:col-span-6 p-4 md:p-6 space-y-4">
              <div className="flex items-center gap-4 text-xs font-bold text-slate-400">
                <span className="flex items-center gap-1">
                  <Calendar className="h-3.5 w-3.5 text-teal-500" />
                  {featuredArticle.date}
                </span>
                <span>&bull;</span>
                <span className="text-teal-500">{getTranslatedCategory(featuredArticle.category)}</span>
              </div>

              <h3 className="text-xl md:text-3xl font-sans font-extrabold text-slate-900 dark:text-white leading-tight">
                {currentLang === 'hi' ? featuredArticle.title_hi : featuredArticle.title}
              </h3>

              <p className="text-xs md:text-sm text-slate-550 dark:text-slate-400 leading-relaxed">
                {currentLang === 'hi' ? featuredArticle.excerpt_hi : featuredArticle.excerpt}
              </p>

              <div className="pt-2 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-between text-xs text-slate-400">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-slate-400" />
                  <span className="font-semibold text-slate-600 dark:text-slate-350">{featuredArticle.author}</span>
                </div>
                <div className="flex items-center gap-1.5 font-mono">
                  <Clock className="h-4 w-4 text-slate-400" />
                  <span>{featuredArticle.readTime}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Filter and Search Bar row */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-slate-50 p-4 rounded-2xl border border-slate-100 dark:bg-slate-800 dark:border-slate-705">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search publications by title keywords, authors..."
              className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-205 bg-white text-xs md:text-sm text-slate-900 focus:border-teal-500 focus:outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-white"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <Filter className="h-4 w-4 text-teal-500 shrink-0 select-none hidden sm:block" />
            {categories.map((cat) => {
              const isActive = activeCategory === cat;
              let label = cat;
              if (currentLang === 'hi') {
                if (cat === 'All') label = 'सभी वर्गीकृत';
                if (cat === 'Technology') label = 'नवीन तकनीक';
                if (cat === 'Cardiac Wellness') label = 'हृदय शोध';
                if (cat === 'Pediatrics') label = 'बाल चिकित्सा';
              }
              return (
                <button
                  key={cat}
                  onClick={() => {
                    setActiveCategory(cat);
                    setCurrentPage(1);
                  }}
                  className={`px-3.5 py-1.5 text-xs rounded-xl border transition-colors cursor-pointer ${
                    isActive
                    ? 'bg-teal-500 text-white border-teal-500 font-bold'
                    : 'bg-white border-slate-200 text-slate-700 hover:border-teal-500 dark:bg-slate-900 dark:border-slate-700 dark:text-slate-350'
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </div>

        {/* News Grid remaining */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="wait">
            {(searchQuery !== '' || activeCategory !== 'All' ? filteredNews : paginatedNews).map((item) => (
              <motion.article
                layout
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 15 }}
                transition={{ duration: 0.18 }}
                key={item.id}
                className="bg-white border border-slate-200/50 dark:bg-slate-850 dark:border-slate-700/60 rounded-2xl overflow-hidden shadow-sm flex flex-col justify-between text-left hover:shadow transition-shadow"
              >
                <div>
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-[200px] w-full object-cover shrink-0"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                  />
                  
                  <div className="p-4 space-y-3">
                    <div className="flex items-center gap-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                      <span>{item.date}</span>
                      <span>&bull;</span>
                      <span className="text-teal-500">{getTranslatedCategory(item.category)}</span>
                    </div>

                    <h4 className="text-base font-bold text-slate-900 dark:text-white line-clamp-2">
                      {currentLang === 'hi' ? item.title_hi : item.title}
                    </h4>

                    <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-3 leading-relaxed">
                      {currentLang === 'hi' ? item.excerpt_hi : item.excerpt}
                    </p>
                  </div>
                </div>

                <div className="p-4 pt-0">
                  <div className="pt-3 border-t border-slate-100 dark:border-slate-700/50 flex items-center justify-between text-[11px] text-slate-400">
                    <span className="font-semibold text-slate-600 dark:text-slate-350">{item.author}</span>
                    <span className="font-mono">{item.readTime}</span>
                  </div>
                </div>

              </motion.article>
            ))}
          </AnimatePresence>

          {(searchQuery !== '' || activeCategory !== 'All' ? filteredNews : paginatedNews).length === 0 && (
            <div className="col-span-full py-12 text-center bg-slate-50 rounded-2xl dark:bg-slate-800">
              <BookOpen className="mx-auto h-10 w-10 text-slate-300" />
              <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">No medical news documents found.</p>
            </div>
          )}
        </div>

        {/* Local Pagination indicator if needed */}
        {remainingNews.length > itemsPerPage && searchQuery === '' && activeCategory === 'All' && (
          <div className="flex items-center justify-center gap-3 pt-6">
            <button
              onClick={() => setCurrentPage((c) => Math.max(1, c - 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 border border-slate-200 text-xs rounded-lg disabled:opacity-50 text-slate-600 hover:border-teal-500 dark:border-slate-700 dark:text-slate-350 cursor-pointer"
            >
              ← Previous Page
            </button>
            <span className="text-xs font-bold text-slate-500 font-mono">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage((c) => Math.min(totalPages, c + 1))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 border border-slate-200 text-xs rounded-lg disabled:opacity-50 text-slate-600 hover:border-teal-500 dark:border-slate-700 dark:text-slate-350 cursor-pointer"
            >
              Next Page →
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
