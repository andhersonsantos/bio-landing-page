import { useState, ReactNode, useMemo, useCallback } from 'react';
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

  const toggleLanguage = useCallback(() => {
    setLanguage((prev) => (prev === 'pt' ? 'en' : 'pt'));
  }, []);

  const data = useMemo(
    () => (language === 'pt' ? DATA_PT : DATA_EN),
    [language]
  );

  const contextValue = useMemo(
    () => ({
      language,
      setLanguage,
      toggleLanguage,
      ...data,
    }),
    [language, toggleLanguage, data]
  );

  return (
    <LanguageContext.Provider value={contextValue}>
      {children}
    </LanguageContext.Provider>
  );
}
