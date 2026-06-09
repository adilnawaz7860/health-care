import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, ChevronRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface BreadcrumbProps {
  title: string;
  paths: { label: string; url?: string }[];
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({ title, paths }) => {
  const { t } = useTranslation();

  return (
    <div className="relative pt-12 text-center overflow-hidden bg-gradient-to-r from-teal-900 to-indigo-950 dark:from-slate-900 dark:to-indigo-950 text-white min-h-[180px] lg:min-h-[220px] flex flex-col justify-center items-center">
      {/* Decorative Vector Patterns */}
      <div className="absolute inset-0 opacity-15 overflow-hidden">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="relative z-10 px-4 max-w-7xl mx-auto w-full">
        {/* Verification Credential Badge */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-teal-500/10 text-teal-300 border border-teal-500/20 mb-3 backdrop-blur-md">
          <ShieldCheck className="h-3.5 w-3.5" />
          AURA CARE INSTITUTION
        </div>

        <h1 className="text-3xl md:text-4xl font-sans font-bold tracking-tight text-white mb-3">
          {title}
        </h1>

        <nav aria-label="Breadcrumb" className="mx-auto flex justify-center">
          <ol className="inline-flex items-center space-x-1 md:space-x-2 text-xs md:text-sm font-medium text-slate-300">
            <li className="inline-flex items-center">
              <Link to="/" className="hover:text-teal-400 transition-colors duration-150">
                {t('nav.home')}
              </Link>
            </li>
            {paths.map((p, index) => (
              <li key={index} className="inline-flex items-center space-x-1 md:space-x-2">
                <ChevronRight className="h-3.5 w-3.5 text-slate-400 stroke-[3px]" />
                {p.url ? (
                  <Link to={p.url} className="hover:text-teal-400 transition-colors duration-150">
                    {p.label}
                  </Link>
                ) : (
                  <span className="text-teal-400 font-semibold" aria-current="page">
                    {p.label}
                  </span>
                )}
              </li>
            ))}
          </ol>
        </nav>
      </div>
    </div>
  );
};
