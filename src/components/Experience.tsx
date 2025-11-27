import { memo, useState, useMemo, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Calendar, Lock, Unlock } from 'lucide-react';
import { ExperienceItem, ResumeData } from '../types/Resume';

type ExperienceProps = {
  experiences: ExperienceItem[];
  title: string;
  ariaLabels: ResumeData['ariaLabels'];
};

export const Experience = memo(function Experience({
  experiences,
  title,
  ariaLabels,
}: ExperienceProps) {
  const [unlocked, setUnlocked] = useState(false);

  const handleUnlock = useCallback(() => {
    setUnlocked(true);
  }, []);

  const visibleExperiences = useMemo(
    () => experiences.filter((job) => !job.isLocked || unlocked),
    [experiences, unlocked]
  );

  return (
    <section
      id="experience"
      className="py-10 px-6 lg:px-24 relative"
      aria-labelledby="experience-title"
    >
      <div className="lg:flex items-center gap-2 justify-between">
        <span>
          <h3
            id="experience-title"
            className="text-3xl font-bold text-white lg:mb-16 flex items-center gap-3"
          >
            <span
              className="w-12 h-1 bg-brand-orange rounded-full"
              aria-hidden="true"
            ></span>
            {title}
          </h3>
        </span>
        <motion.button
          onClick={handleUnlock}
          tabIndex={unlocked ? -1 : 0}
          className="flex items-center gap-2 text-brand-orange cursor-pointer hover:text-orange-400 transition-colors bg-transparent border-none p-0 my-6 lg:mb-0"
          whileTap={{ scale: 0.95 }}
          animate={{ opacity: unlocked ? 0 : 1 }}
          transition={{ duration: 1.5, ease: 'easeInOut' }}
          aria-label={ariaLabels.unlockExperiences}
          aria-disabled={unlocked}
          type="button"
          onKeyDown={(e) => {
            if ((e.key === 'Enter' || e.key === ' ') && !unlocked) {
              e.preventDefault();
              handleUnlock();
            }
          }}
        >
          <motion.div
            key={unlocked ? 'unlocked' : 'locked'}
            initial={{ rotate: 0 }}
            animate={{ rotate: unlocked ? [0, -15, 15, -10, 0] : 0 }}
            transition={{ duration: 0.6, ease: 'easeInOut' }}
            aria-hidden="true"
          >
            {unlocked ? <Unlock size={20} /> : <Lock size={20} />}
          </motion.div>
          <span className="text-sm font-medium">
            Desbloquear outras experiências
          </span>
        </motion.button>
      </div>

      <div
        className="relative border-l-2 border-zinc-800 ml-4 md:ml-10 space-y-16"
        role="list"
        aria-label={ariaLabels.experienceTimeline}
        aria-live="polite"
      >
        {visibleExperiences.map((job, index) => (
          <motion.article
            key={index}
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="relative pl-8 md:pl-16"
            role="listitem"
          >
            {/* Timeline Dot */}
            <span
              className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-zinc-900 border-2 border-brand-orange shadow-[0_0_10px_rgba(249,115,22,0.5)]"
              aria-hidden="true"
            />

            <div className="bg-brand-surface/50 backdrop-blur-sm p-6 md:p-8 rounded-2xl border border-zinc-800 hover:border-zinc-700 transition-all group">
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-2">
                <div>
                  <h4 className="text-xl md:text-2xl font-bold text-white group-hover:text-brand-orange transition-colors flex gap-2 items-center">
                    {job.isLocked && <Unlock size={20} aria-hidden="true" />}
                    {job.role}
                  </h4>
                  <div className="flex items-center gap-2 text-brand-orange font-semibold mt-1">
                    <Briefcase size={16} aria-hidden="true" />
                    <span>{job.company}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-zinc-500 font-mono text-sm bg-zinc-900/50 px-3 py-1 rounded-md border border-zinc-800">
                  <Calendar size={14} aria-hidden="true" />
                  <time dateTime={job.period}>{job.period}</time>
                </div>
              </div>

              <div className="space-y-4 mb-6">
                {job.summary.map((item, i) => (
                  <p key={i} className="text-brand-muted leading-relaxed">
                    {item}
                  </p>
                ))}
              </div>

              <div
                className="flex flex-wrap gap-2 mt-6 pt-6 border-t border-zinc-800"
                role="list"
                aria-label={ariaLabels.technologiesUsed}
              >
                {job.techStack.map((tech, i) => (
                  <span
                    key={i}
                    className="text-xs font-mono text-zinc-300 bg-zinc-800 px-3 py-1 rounded-full border border-zinc-700"
                    role="listitem"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
});
