import { memo, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin } from 'lucide-react';
import { WhatsAppIcon } from './icons/WhatsAppIcon';
import { LinkedinIcon } from './icons/LinkedinIcon';
import { InstagramIcon } from './icons/InstagramIcon';
import { ContactInfo, ResumeData } from '../types/Resume';

type HeroProps = {
  name: string;
  role: string;
  summary: string[];
  contact: ContactInfo;
  greeting: string;
  ariaLabels: ResumeData['ariaLabels'];
};

export const Hero = memo(function Hero({
  name,
  role,
  summary,
  contact,
  greeting,
  ariaLabels,
}: HeroProps) {
  const nameWords = useMemo(() => name.split(' '), [name]);

  return (
    <section
      className="flex flex-col justify-center relative overflow-hidden px-6 lg:px-24 pt-28"
      aria-label={ariaLabels.personalPresentation}
    >
      <div className="absolute top-0 right-0 -z-10 w-[600px] h-[600px] bg-brand-orange/5 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 left-0 -z-10 w-[400px] h-[400px] bg-purple-900/10 rounded-full blur-[100px]" />

      <div className="z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-brand-orange font-mono tracking-wide text-lg mb-4 block">
            {greeting}
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight"
        >
          {nameWords.map((word, i) => (
            <span
              key={i}
              className={i === 0 ? 'text-white' : 'text-brand-light'}
            >
              {word}{' '}
            </span>
          ))}
        </motion.h1>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-2xl md:text-3xl text-brand-muted font-light mb-8"
        >
          {role}
        </motion.h2>

        {summary.map((item, index) => (
          <motion.p
            key={`summary-${index}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-lg text-brand-muted leading-relaxed mb-10"
          >
            {item}
          </motion.p>
        ))}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-wrap gap-4 mb-12"
          role="group"
          aria-label={ariaLabels.contactLinks}
        >
          <a
            href={`https://wa.me/${contact.phone}`}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 px-6 py-3 bg-[#25D366] text-white rounded-full font-semibold hover:bg-[#128C7E] transition-colors shadow-lg shadow-green-900/20"
            aria-label={`${ariaLabels.openWhatsApp} ${contact.phone}`}
          >
            <WhatsAppIcon size={20} aria-hidden="true" />
            <span>WhatsApp</span>
          </a>
          <a
            href={`mailto:${contact.email}`}
            className="flex items-center gap-2 px-6 py-3 bg-brand-surface border border-zinc-700 text-white rounded-full font-semibold hover:border-brand-orange hover:text-brand-orange transition-colors"
            aria-label={`${ariaLabels.sendEmail} ${contact.email}`}
          >
            <Mail size={18} aria-hidden="true" />
            <span>Email</span>
          </a>
          <a
            href={contact.linkedin}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 px-6 py-3 bg-brand-surface border border-zinc-700 text-white rounded-full font-semibold hover:border-brand-orange hover:text-brand-orange transition-colors"
            aria-label={ariaLabels.openLinkedIn}
          >
            <LinkedinIcon size={18} aria-hidden="true" />
            <span>LinkedIn</span>
          </a>
          <a
            href={contact.instagram}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 px-6 py-3 bg-brand-surface border border-zinc-700 text-white rounded-full font-semibold hover:border-brand-orange hover:text-brand-orange transition-colors"
            aria-label={ariaLabels.openInstagram}
          >
            <InstagramIcon size={18} aria-hidden="true" />
            <span>Instagram</span>
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-wrap gap-6 text-sm text-brand-muted font-mono"
          aria-label={ariaLabels.location}
        >
          <div className="flex items-center gap-2">
            <MapPin
              size={16}
              className="text-brand-orange"
              aria-hidden="true"
            />
            <span>{contact.location}</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
});
