import { GraduationCap } from 'lucide-react';
import { EducationItem, ResumeData } from '../types/Resume';

type EducationProps = {
  education: EducationItem[];
  title: string;
  ariaLabels: ResumeData['ariaLabels'];
};

export function Education({ education, title, ariaLabels }: EducationProps) {
  return (
    <section
      id="education"
      className="  px-6 lg:px-24"
      aria-labelledby="education-title"
    >
      <h3
        id="education-title"
        className="text-3xl font-bold text-white mb-6 flex items-center gap-3"
      >
        <span
          className="w-12 h-1 bg-brand-orange rounded-full"
          aria-hidden="true"
        ></span>
        {title}
      </h3>

      <div
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
        role="list"
        aria-label={ariaLabels.educationList}
      >
        {education.map((edu, idx) => (
          <article
            key={`education-${idx}`}
            className="bg-zinc-900/20 p-6 rounded-xl border border-zinc-800 hover:bg-zinc-900/40 transition-colors"
            role="listitem"
          >
            <GraduationCap
              className="text-brand-orange mb-4"
              size={32}
              aria-hidden="true"
            />
            <h4 className="text-lg font-bold text-white mb-1">{edu.degree}</h4>
            <p className="text-zinc-400 mb-2">{edu.institution}</p>
            <time
              className="text-xs font-mono text-zinc-500 uppercase tracking-wider"
              dateTime={edu.period}
            >
              {edu.period}
            </time>
          </article>
        ))}
      </div>
    </section>
  );
}
