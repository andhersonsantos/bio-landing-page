import { useState, ReactNode } from 'react';
import { Language } from '../types/Language';
import { DATA_EN, DATA_PT } from '../constants/text-content';
import { DEFAULT_LANGUAGE } from '../constants/language';
import { LanguageContext } from './LanguageContext';

const getInitialLanguage = (): Language => {
  const languageOption: Record<Language, Language> = {
    pt: 'pt',
    en: 'en',
  } as const;
  const browserLang = navigator.language.toLowerCase().slice(0, 2);
  const language = languageOption[browserLang as Language];
  return language || DEFAULT_LANGUAGE;
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>(getInitialLanguage);

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === 'pt' ? 'en' : 'pt'));
  };

  const data = language === 'pt' ? DATA_PT : DATA_EN;

  return (
    <LanguageContext.Provider
      value={{ language, setLanguage, toggleLanguage, ...data }}
    >
      {children}
    </LanguageContext.Provider>
  );
}
