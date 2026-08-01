import { Briefcase, Calendar, ChevronRight } from 'lucide-react';
import SectionWrapper from '../components/SectionWrapper';
import SectionHeading from '../components/SectionHeading';
import Timeline from '../components/Timeline';
import { experience } from '../data/content';

export default function Experience() {
  return (
    <SectionWrapper id="experience">
      <SectionHeading title="Where I've worked" />

      <Timeline
        items={experience}
        vehicle="car"
        renderCard={(job) => (
          <article className="group relative overflow-hidden rounded-2xl glass p-6 transition-all duration-300 hover:-translate-y-1 hover:border-accent-pink/40 hover:shadow-glow-pink">
            {/* Faded watermark + accent top bar */}
            <Briefcase
              aria-hidden
              className="pointer-events-none absolute -right-6 -top-6 h-28 w-28 rotate-12 text-white/[0.04]"
            />
            <span className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-transparent via-accent-pink/70 to-transparent" />

            <div className="relative flex items-start justify-between gap-4">
              <div className="flex items-start gap-4">
                <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-accent-pink/25 to-transparent text-accent-pink ring-1 ring-accent-pink/30">
                  <Briefcase size={22} />
                </div>
                <div>
                  <h3 className="font-display text-xl font-bold leading-tight text-white">
                    {job.role}
                  </h3>
                  <p className="mt-0.5 text-sm font-semibold text-accent-pink">{job.company}</p>
                </div>
              </div>
              <span className="hidden shrink-0 items-center gap-1.5 rounded-full border border-white/10 px-3 py-1 font-mono text-xs text-slate-400 sm:flex">
                <Calendar size={12} /> {job.period}
              </span>
            </div>

            <p className="relative mt-4 leading-relaxed text-slate-400">{job.description}</p>

            {job.points?.length > 0 && (
              <ul className="relative mt-4 space-y-2">
                {job.points.map((point) => (
                  <li key={point} className="flex gap-2 text-sm leading-relaxed text-slate-400">
                    <ChevronRight size={16} className="mt-0.5 shrink-0 text-accent-pink" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            )}

            <div className="relative mt-5 flex flex-wrap gap-2">
              {job.tags.map((tag) => (
                <span
                  key={tag}
                  className="glass-2 rounded-full px-3 py-1 font-mono text-xs text-slate-400"
                >
                  {tag}
                </span>
              ))}
            </div>
          </article>
        )}
      />
    </SectionWrapper>
  );
}
