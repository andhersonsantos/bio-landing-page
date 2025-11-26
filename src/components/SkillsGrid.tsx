import { motion } from 'framer-motion';
import { SkillCategory, ResumeData } from '../types/Resume';
import { SkillsChart } from './SkillsChart';
import { Code2, Server, ShieldCheck, Users } from 'lucide-react';

type SkillsGridProps = {
  categories: SkillCategory[];
  titles: {
    main: string;
    philosophy: string;
    philosophyDesc: string;
    radar: string;
  };
  ariaLabels: ResumeData['ariaLabels'];
};

const iconMap: { [key: string]: React.ReactNode } = {
  Languages: <Code2 className="text-brand-orange" />,
  Linguagens: <Code2 className="text-brand-orange" />,
  Architecture: <Server className="text-blue-500" />,
  Arquitetura: <Server className="text-blue-500" />,
  Quality: <ShieldCheck className="text-green-500" />,
  Qualidade: <ShieldCheck className="text-green-500" />,
};

const getIcon = (title: string) => {
  const matchedKey = Object.keys(iconMap).find((key) => title.includes(key));
  return matchedKey ? (
    iconMap[matchedKey]
  ) : (
    <Users className="text-purple-500" />
  );
};

export function SkillsGrid({
  categories,
  titles,
  ariaLabels,
}: SkillsGridProps) {
  return (
    <section
      id="skills"
      className="py-20 px-6 lg:px-24 bg-zinc-900/30"
      aria-labelledby="skills-title"
    >
      <h3
        id="skills-title"
        className="text-3xl font-bold text-white mb-16 flex items-center gap-3"
      >
        <span
          className="w-12 h-1 bg-brand-orange rounded-full"
          aria-hidden="true"
        ></span>
        {titles.main}
      </h3>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <SkillsChart title={titles.radar} ariaLabels={ariaLabels} />
          <div className="mt-6 p-6 rounded-2xl border border-zinc-800 bg-zinc-950/50">
            <h4 className="text-white font-bold mb-2">{titles.philosophy}</h4>
            <p className="text-zinc-400 text-sm leading-relaxed">
              {titles.philosophyDesc}
            </p>
          </div>
        </div>

        <div
          className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6"
          role="list"
          aria-label={ariaLabels.skillsCategories}
        >
          {categories.map((cat, idx) => (
            <motion.article
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-brand-surface p-6 rounded-2xl border border-zinc-800 hover:border-zinc-600 transition-colors"
              role="listitem"
            >
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="p-2 bg-zinc-900 rounded-lg border border-zinc-800"
                  aria-hidden="true"
                >
                  {getIcon(cat.title)}
                </div>
                <h4 className="font-bold text-white">{cat.title}</h4>
              </div>
              <div
                className="flex flex-wrap gap-2"
                role="list"
                aria-label={`${ariaLabels.skillsInCategory} ${cat.title}`}
              >
                {cat.skills.map((skill, sIdx) => (
                  <span
                    key={sIdx}
                    className="px-3 py-1 bg-zinc-900 text-zinc-300 text-sm rounded-md border border-zinc-800 hover:text-brand-orange transition-colors cursor-default"
                    role="listitem"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
