import React, { createContext, useState, useContext, useEffect } from 'react';
import uz from '../locales/uz.json';
import ru from '../locales/ru.json';
import en from '../locales/en.json';

const LanguageContext = createContext();

const translations = { uz, ru, en };

const SUPPORTED_LANGS = ['uz', 'ru', 'en'];

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState(() => {
    try {
      const saved = localStorage.getItem('appLang');
      if (saved && SUPPORTED_LANGS.includes(saved)) {
        return saved;
      }
    } catch (_) {}
    return 'uz';
  });

  const setLang = (newLang) => {
    const validLang = SUPPORTED_LANGS.includes(newLang) ? newLang : 'uz';
    setLangState(validLang);
    try {
      localStorage.setItem('appLang', validLang);
    } catch (_) {}
  };

  useEffect(() => {
    try {
      const saved = localStorage.getItem('appLang');
      if (!saved || !SUPPORTED_LANGS.includes(saved)) {
        localStorage.setItem('appLang', lang);
      }
    } catch (_) {}
  }, [lang]);

  const resolveValue = (dict, keys) => {
    if (!dict || typeof dict !== 'object') return undefined;
    let curr = dict;
    for (const k of keys) {
      if (curr && typeof curr === 'object' && curr[k] !== undefined) {
        curr = curr[k];
      } else {
        return undefined;
      }
    }
    return curr;
  };

  const t = (key, fallback = '') => {
    if (!key) return fallback;
    const keys = key.split('.');

    // 1. Try current language
    const currentDict = translations[lang] || translations.uz;
    const val = resolveValue(currentDict, keys);
    if (val !== undefined && val !== null) {
      return val;
    }

    // 2. Fallback to Uzbek
    if (lang !== 'uz') {
      const uzVal = resolveValue(translations.uz, keys);
      if (uzVal !== undefined && uzVal !== null) {
        return uzVal;
      }
    }

    // 3. Fallback to Russian
    if (lang !== 'ru') {
      const ruVal = resolveValue(translations.ru, keys);
      if (ruVal !== undefined && ruVal !== null) {
        return ruVal;
      }
    }

    // 4. Fallback to English
    if (lang !== 'en') {
      const enVal = resolveValue(translations.en, keys);
      if (enVal !== undefined && enVal !== null) {
        return enVal;
      }
    }

    // 5. If explicit fallback is provided, return it
    if (fallback) return fallback;

    // 6. As last resort return last piece of key or key itself
    return keys[keys.length - 1] || key;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t, supportedLangs: SUPPORTED_LANGS }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}

