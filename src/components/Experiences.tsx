import { memo, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Calendar, Unlock } from 'lucide-react';
import { ExperienceItem, ResumeData } from '../types/Resume';

type ExperienceCardProps = {
  job: ExperienceItem;
  index: number;
  ariaLabels: ResumeData['ariaLabels'];
};

const ExperienceCard = memo(function ExperienceCard({
  job,
  index,
  ariaLabels,
}: ExperienceCardProps) {
  const [isUnlocked, setIsUnlocked] = useState(false);

  const handleUnlock = useCallback(() => {
    setIsUnlocked(true);
  }, []);

  const isLocked = job.isLocked && !isUnlocked;

  return (
    <motion.article
      initial={{ opacity: 0, x: -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative pl-8 md:pl-16"
      role="listitem"
    >
      <span
        className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-zinc-900 border-2 border-brand-orange shadow-[0_0_10px_rgba(249,115,22,0.5)]"
        aria-hidden="true"
      />

      <div className="bg-brand-surface/50 backdrop-blur-sm p-6 md:p-8 rounded-2xl border border-zinc-800 hover:border-zinc-700 transition-all group relative">
        {isLocked && (
          <div className="absolute inset-0 flex items-center justify-center z-10 bg-zinc-900/80 backdrop-blur-sm rounded-2xl">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col items-center gap-4 p-6"
            >
              <p className="text-brand-muted text-center text-sm md:text-base">
                Experiência fora da área de tecnologia
              </p>
              <motion.button
                onClick={handleUnlock}
                className="flex items-center gap-2 text-brand-orange cursor-pointer hover:text-orange-400 transition-colors bg-transparent border border-brand-orange px-4 py-2 rounded-lg hover:bg-brand-orange/10"
                whileTap={{ scale: 0.95 }}
                aria-label="Desbloquear experiência"
                type="button"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleUnlock();
                  }
                }}
              >
                <Unlock size={18} />
                <span className="text-sm font-medium">Desbloquear</span>
              </motion.button>
            </motion.div>
          </div>
        )}
        <div
          className={`transition-all ${isLocked ? 'blur-sm select-none' : ''}`}
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-2">
            <div>
              <h4 className="text-xl md:text-2xl font-bold text-white group-hover:text-brand-orange transition-colors flex gap-2 items-center">
                {isLocked && <Unlock size={20} aria-hidden="true" />}
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
      </div>
    </motion.article>
  );
});

type ExperienceProps = {
  experiences: ExperienceItem[];
  title: string;
  ariaLabels: ResumeData['ariaLabels'];
};

export const Experiences = memo(function Experience({
  experiences,
  title,
  ariaLabels,
}: ExperienceProps) {
  return (
    <section
      id="experience"
      className="px-6 lg:px-24 relative"
      aria-labelledby="experience-title"
    >
      <div className="lg:flex items-center gap-2 justify-between">
        <span>
          <h3
            id="experience-title"
            className="text-3xl font-bold text-white mb-8 flex items-center gap-3"
          >
            <span
              className="w-12 h-1 bg-brand-orange rounded-full"
              aria-hidden="true"
            ></span>
            {title}
          </h3>
        </span>
      </div>

      <div
        className="relative border-l-2 border-zinc-800 ml-4 md:ml-10 space-y-16"
        role="list"
        aria-label={ariaLabels.experienceTimeline}
        aria-live="polite"
      >
        {experiences.map((job, index) => (
          <ExperienceCard
            key={index}
            job={job}
            index={index}
            ariaLabels={ariaLabels}
          />
        ))}
      </div>
    </section>
  );
});
