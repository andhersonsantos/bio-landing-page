import { lazy, Suspense } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { useLanguage } from './hooks/useLanguage';

// Lazy load for components below the fold
const Experience = lazy(() =>
  import('./components/Experiences').then((module) => ({
    default: module.Experiences,
  }))
);
const SkillsGrid = lazy(() =>
  import('./components/SkillsGrid').then((module) => ({
    default: module.SkillsGrid,
  }))
);
const Education = lazy(() =>
  import('./components/Education').then((module) => ({
    default: module.Education,
  }))
);
const Footer = lazy(() =>
  import('./components/Footer').then((module) => ({
    default: module.Footer,
  }))
);

function App() {
  const {
    name,
    role,
    summary,
    contact,
    ui,
    experience,
    skillCategories,
    education,
    language,
    toggleLanguage,
    ariaLabels,
  } = useLanguage();

  return (
    <div className="bg-brand-dark min-h-screen text-brand-light selection:bg-brand-orange selection:text-white max-w-7xl mx-auto">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-brand-orange focus:text-white focus:rounded-md focus:font-bold"
      >
        {ariaLabels.skipToContent}
      </a>
      <Navbar
        experience={ui.experience}
        skills={ui.skills}
        education={ui.education}
        language={language}
        toggleLanguage={toggleLanguage}
        email={contact.email}
        getInTouch={ui.getInTouch}
        ariaLabels={ariaLabels}
      />

      <main id="main-content" tabIndex={-1} className="flex flex-col gap-8">
        <Hero
          name={name}
          role={role}
          summary={summary}
          contact={contact}
          greeting={ui.greeting}
          ariaLabels={ariaLabels}
        />

        <Suspense fallback={<div className="min-h-screen" />}>
          <Experience
            experiences={experience}
            title={ui.experience}
            ariaLabels={ariaLabels}
            nonTechExperienceMessage={ui.nonTechExperienceMessage}
            unlockButtonLabel={ui.unlockButtonLabel}
            unlockButtonText={ui.unlockButtonText}
          />

          <SkillsGrid
            categories={skillCategories}
            titles={{
              main: ui.skills,
              philosophy: ui.philosophyTitle,
              philosophyDesc: ui.philosophyDesc,
              radar: ui.radarTitle,
            }}
            ariaLabels={ariaLabels}
          />

          <Education
            education={education}
            title={ui.education}
            ariaLabels={ariaLabels}
          />
        </Suspense>
      </main>

      <Suspense fallback={null}>
        <Footer
          name={name}
          phone={contact.phone}
          email={contact.email}
          linkedin={contact.linkedin}
          github={contact.github}
          ariaLabels={ariaLabels}
        />
      </Suspense>
    </div>
  );
}

export default App;
