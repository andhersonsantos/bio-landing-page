import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Experience } from './components/Experience';
import { SkillsGrid } from './components/SkillsGrid';
import { Education } from './components/Education';
import { Footer } from './components/Footer';
import { useLanguage } from './hooks/useLanguage';

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

      <main id="main-content" tabIndex={-1}>
        <Hero
          name={name}
          role={role}
          summary={summary}
          contact={contact}
          greeting={ui.greeting}
          ariaLabels={ariaLabels}
        />

        <Experience
          experiences={experience}
          title={ui.experience}
          ariaLabels={ariaLabels}
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
      </main>

      <Footer
        name={name}
        phone={contact.phone}
        email={contact.email}
        linkedin={contact.linkedin}
        github={contact.github}
        ariaLabels={ariaLabels}
      />
    </div>
  );
}

export default App;
