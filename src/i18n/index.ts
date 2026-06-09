import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './en.json';
import hi from './hi.json';

// Detect or fallback language selection
const savedLanguage = localStorage.getItem('auracare_lang');
let defaultLang = savedLanguage;

if (!defaultLang) {
  const userLang = navigator.language || '';
  if (userLang.toLowerCase().includes('hi')) {
    defaultLang = 'hi';
  } else {
    defaultLang = 'en';
  }
}

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      hi: { translation: hi }
    },
    lng: defaultLang,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

export default i18n;
