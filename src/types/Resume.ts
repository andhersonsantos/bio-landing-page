export type ContactInfo = {
  phone: string;
  email: string;
  linkedin: string;
  location: string;
  instagram: string;
  github: string;
};

export type ExperienceItem = {
  company: string;
  role: string;
  period: string;
  location: string;
  summary: string[];
  techStack: string[];
  isLocked?: boolean;
};

export type EducationItem = {
  institution: string;
  degree: string;
  period: string;
};

export type SkillCategory = {
  title: string;
  skills: string[];
};

export type ResumeData = {
  name: string;
  role: string;
  summary: string[];
  contact: ContactInfo;
  experience: ExperienceItem[];
  education: EducationItem[];
  skillCategories: SkillCategory[];
  ui: {
    greeting: string;
    about: string;
    experience: string;
    skills: string;
    education: string;
    contact: string;
    achievements: string;
    philosophyTitle: string;
    philosophyDesc: string;
    radarTitle: string;
    getInTouch: string;
  };
  ariaLabels: {
    skipToContent: string;
    navigateToSection: string;
    changeLanguage: string;
    currentLanguage: string;
    sendEmail: string;
    openWhatsApp: string;
    openLinkedIn: string;
    openInstagram: string;
    openGithub: string;
    contactLinks: string;
    location: string;
    unlockExperiences: string;
    experienceTimeline: string;
    technologiesUsed: string;
    educationList: string;
    socialLinks: string;
    chartDescription: string;
    chartData: string;
    skillsCategories: string;
    skillsInCategory: string;
    mainNavigation: string;
    backToTop: string;
    openMenu: string;
    closeMenu: string;
    mobileNavigation: string;
    personalPresentation: string;
    srChartDescription: string;
    categoryLabel: string;
    levelLabel: string;
  };
};
