import { useState, useEffect, useCallback, useMemo, memo } from 'react';
import { Menu, X, Globe } from 'lucide-react';
import { ResumeData } from '../types/Resume';

type NavbarProps = {
  experience: string;
  skills: string;
  education: string;
  language: string;
  toggleLanguage: () => void;
  email: string;
  getInTouch: string;
  ariaLabels: ResumeData['ariaLabels'];
};

type NavLink = {
  name: string;
  href: string;
};

type DesktopNavProps = {
  navLinks: NavLink[];
  language: string;
  toggleLanguage: () => void;
  email: string;
  getInTouch: string;
  ariaLabels: ResumeData['ariaLabels'];
};

type MobileNavProps = {
  navLinks: NavLink[];
  language: string;
  toggleLanguage: () => void;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
  ariaLabels: ResumeData['ariaLabels'];
};

const DesktopNav = memo(function DesktopNav({
  navLinks,
  language,
  toggleLanguage,
  email,
  getInTouch,
  ariaLabels,
}: DesktopNavProps) {
  return (
    <div className="hidden md:flex items-center gap-8">
      {navLinks.map((link) => (
        <a
          key={link.name}
          href={link.href}
          className="text-sm text-zinc-400 hover:text-brand-orange transition-colors uppercase tracking-wider font-medium"
          aria-label={`${ariaLabels.navigateToSection} ${link.name}`}
        >
          {link.name}
        </a>
      ))}

      <div className="h-5 w-px bg-zinc-800 mx-2" aria-hidden="true" />

      <button
        onClick={toggleLanguage}
        className="flex cursor-pointer items-center gap-2 text-sm text-zinc-400 hover:text-white transition-colors font-mono"
        aria-label={`${ariaLabels.changeLanguage}. ${ariaLabels.currentLanguage}: ${language.toUpperCase()}`}
        type="button"
      >
        <Globe size={16} aria-hidden="true" />
        <span>{language.toUpperCase()}</span>
      </button>

      <a
        href={`mailto:${email}`}
        className="px-4 py-2 bg-zinc-100 text-zinc-950 rounded-full text-sm font-bold hover:bg-white transition-colors"
        aria-label={`${ariaLabels.sendEmail} ${email}`}
      >
        {getInTouch}
      </a>
    </div>
  );
});

const MobileNav = memo(function MobileNav({
  navLinks,
  language,
  toggleLanguage,
  mobileMenuOpen,
  setMobileMenuOpen,
  ariaLabels,
}: MobileNavProps) {
  const handleToggle = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleClose = () => {
    setMobileMenuOpen(false);
  };

  return (
    <>
      <div className="flex items-center gap-4 md:hidden">
        <button
          onClick={toggleLanguage}
          className="text-zinc-400 hover:text-white transition-colors"
          aria-label={`${ariaLabels.changeLanguage}. ${ariaLabels.currentLanguage}: ${language.toUpperCase()}`}
          type="button"
        >
          <span className="font-mono font-bold">{language.toUpperCase()}</span>
        </button>

        <button
          className="text-white"
          onClick={handleToggle}
          aria-label={
            mobileMenuOpen ? ariaLabels.closeMenu : ariaLabels.openMenu
          }
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-menu"
          type="button"
        >
          {mobileMenuOpen ? (
            <X aria-hidden="true" />
          ) : (
            <Menu aria-hidden="true" />
          )}
        </button>
      </div>

      {mobileMenuOpen && (
        <nav
          id="mobile-menu"
          className="md:hidden absolute top-full left-0 right-0 bg-zinc-950 border-b border-zinc-800 p-6 flex flex-col gap-4"
          aria-label={ariaLabels.mobileNavigation}
        >
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={handleClose}
              className="text-zinc-300 hover:text-brand-orange py-2 text-lg"
              aria-label={`${ariaLabels.navigateToSection} ${link.name}`}
            >
              {link.name}
            </a>
          ))}
        </nav>
      )}
    </>
  );
});

export const Navbar = memo(function Navbar({
  experience,
  skills,
  education,
  language,
  toggleLanguage,
  email,
  getInTouch,
  ariaLabels,
}: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 50);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const navLinks: NavLink[] = useMemo(
    () => [
      { name: experience, href: '#experience' },
      { name: skills, href: '#skills' },
      { name: education, href: '#education' },
    ],
    [experience, skills, education]
  );

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-zinc-950/80 backdrop-blur-md border-b border-zinc-800 py-4'
          : 'bg-transparent py-6'
      }`}
      aria-label={ariaLabels.mainNavigation}
    >
      <div className="px-6 lg:px-24 flex items-center justify-between">
        <Logo ariaLabels={ariaLabels} />
        <DesktopNav
          navLinks={navLinks}
          language={language}
          toggleLanguage={toggleLanguage}
          email={email}
          getInTouch={getInTouch}
          ariaLabels={ariaLabels}
        />

        <MobileNav
          navLinks={navLinks}
          language={language}
          toggleLanguage={toggleLanguage}
          mobileMenuOpen={mobileMenuOpen}
          setMobileMenuOpen={setMobileMenuOpen}
          ariaLabels={ariaLabels}
        />
      </div>
    </nav>
  );
});

const Logo = memo(function Logo({
  ariaLabels,
}: {
  ariaLabels: ResumeData['ariaLabels'];
}) {
  return (
    <a
      href="#"
      className="text-xl font-bold text-white tracking-tight"
      aria-label={ariaLabels.backToTop}
      onClick={(e) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }}
    >
      Andherson
      <span className="text-brand-orange text-4xl mx-1" aria-hidden="true">
        .
      </span>
    </a>
  );
});
