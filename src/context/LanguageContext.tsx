import { createContext } from 'react';
import { Language } from '../types/Language';
import { ResumeData } from '../types/Resume';

type LanguageContextType = ResumeData & {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
};

export const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);
