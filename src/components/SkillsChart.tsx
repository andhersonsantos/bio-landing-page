import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  ResponsiveContainer,
  PolarRadiusAxis,
} from 'recharts';
import { ResumeData } from '../types/Resume';

const data = [
  { subject: 'Architecture', A: 100, fullMark: 100 },
  { subject: 'React/Next.js', A: 100, fullMark: 100 },
  { subject: 'Leadership', A: 90, fullMark: 100 },
  { subject: 'DevOps', A: 80, fullMark: 100 },
  { subject: 'QA', A: 90, fullMark: 100 },
  { subject: 'Product', A: 100, fullMark: 100 },
  { subject: 'UI/UX', A: 90, fullMark: 100 },
  { subject: 'Backend', A: 70, fullMark: 100 },
];

type Props = {
  title: string;
  ariaLabels: ResumeData['ariaLabels'];
};

export function SkillsChart({ title, ariaLabels }: Props) {
  const chartDescription = `${ariaLabels.chartDescription} ${data.map((d) => d.subject).join(', ')}`;

  return (
    <figure className="w-full h-[400px] bg-brand-surface/30 rounded-2xl border border-zinc-800 p-4 relative overflow-hidden">
      <div
        className="absolute inset-0 bg-linear-to-b from-transparent to-zinc-950/50 pointer-events-none"
        aria-hidden="true"
      />
      <figcaption className="absolute top-6 left-6 text-zinc-400 font-mono text-sm uppercase tracking-widest z-10">
        {title}
      </figcaption>

      <div className="w-full h-full" role="img" aria-label={chartDescription}>
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="70%" data={data}>
            <PolarGrid stroke="#3f3f46" />
            <PolarAngleAxis
              dataKey="subject"
              tick={{ fill: '#a1a1aa', fontSize: 12, fontFamily: 'Inter' }}
            />
            <PolarRadiusAxis
              angle={30}
              domain={[0, 100]}
              tick={false}
              axisLine={false}
            />
            <Radar
              name="Andherson"
              dataKey="A"
              stroke="#f97316"
              strokeWidth={2}
              fill="#f97316"
              fillOpacity={0.3}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>

      <div className="sr-only" role="region" aria-label={ariaLabels.chartData}>
        <table>
          <caption>{ariaLabels.srChartDescription}</caption>
          <thead>
            <tr>
              <th>{ariaLabels.categoryLabel}</th>
              <th>{ariaLabels.levelLabel}</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                <td>{item.subject}</td>
                <td>{item.A}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </figure>
  );
}
