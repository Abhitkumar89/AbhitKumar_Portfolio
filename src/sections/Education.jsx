import { GraduationCap, Award, Calendar } from 'lucide-react';
import SectionWrapper from '../components/SectionWrapper';
import SectionHeading from '../components/SectionHeading';
import Timeline from '../components/Timeline';
import { education } from '../data/content';

// Each card cycles through an accent so the timeline doesn't feel monotone.
const accents = [
  {
    text: 'text-accent-pink',
    ring: 'ring-accent-pink/30',
    grad: 'from-accent-pink/25 to-transparent',
    via: 'via-accent-pink/70',
    hover: 'hover:border-accent-pink/40 hover:shadow-glow-pink',
  },
  {
    text: 'text-accent-cyan',
    ring: 'ring-accent-cyan/30',
    grad: 'from-accent-cyan/25 to-transparent',
    via: 'via-accent-cyan/70',
    hover: 'hover:border-accent-cyan/40 hover:shadow-glow',
  },
  {
    text: 'text-accent-violet',
    ring: 'ring-accent-violet/30',
    grad: 'from-accent-violet/25 to-transparent',
    via: 'via-accent-violet/70',
    hover: 'hover:border-accent-violet/40 hover:shadow-glow',
  },
];

export default function Education() {
  return (
    <SectionWrapper id="education">
      <SectionHeading eyebrow="05 / Education" title="Where I studied" />

      <Timeline
        items={education}
        vehicle="car"
        renderCard={(item, i) => {
          const a = accents[i % accents.length];
          return (
            <article
              className={`group relative overflow-hidden rounded-2xl glass p-6 transition-all duration-300 hover:-translate-y-1 ${a.hover}`}
            >
              {/* Faded watermark + accent top bar for a more crafted look */}
              <GraduationCap
                aria-hidden
                className="pointer-events-none absolute -right-6 -top-6 h-28 w-28 rotate-12 text-white/[0.04]"
              />
              <span
                className={`absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-transparent ${a.via} to-transparent`}
              />

              <div className="relative flex items-start justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div
                    className={`grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-gradient-to-br ${a.grad} ring-1 ${a.ring} ${a.text}`}
                  >
                    <GraduationCap size={22} />
                  </div>
                  <div>
                    <h3 className="font-display text-xl font-bold leading-tight text-white">
                      {item.degree}
                    </h3>
                    <p className={`mt-0.5 text-sm font-semibold ${a.text}`}>{item.school}</p>
                  </div>
                </div>
                <span className="hidden shrink-0 items-center gap-1.5 rounded-full border border-white/10 px-3 py-1 font-mono text-xs text-slate-400 sm:flex">
                  <Calendar size={12} /> {item.period}
                </span>
              </div>

              <p className="relative mt-4 leading-relaxed text-slate-400">{item.description}</p>

              <div className="relative mt-5 flex flex-wrap items-center gap-2">
                {item.grade && (
                  <span
                    className={`inline-flex items-center gap-1.5 rounded-lg bg-gradient-to-r ${a.grad} px-3 py-1.5 text-sm font-semibold text-white ring-1 ${a.ring}`}
                  >
                    <Award size={14} className="text-accent-amber" /> {item.grade}
                  </span>
                )}
                {item.tags.map((tag) => (
                  <span
                    key={tag}
                    className="glass-2 rounded-full px-3 py-1 font-mono text-xs text-slate-400"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </article>
          );
        }}
      />
    </SectionWrapper>
  );
}
