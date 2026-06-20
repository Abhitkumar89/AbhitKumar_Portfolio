import { motion } from 'framer-motion';
import SectionWrapper from '../components/SectionWrapper';
import SectionHeading from '../components/SectionHeading';
import { fadeUp, staggerContainer } from '../lib/motion';
import { skillGroups } from '../data/content';

export default function Skills() {
  const allSkills = skillGroups.flatMap((g) => g.items);
  // Duplicate the list so the marquee can loop seamlessly.
  const marqueeItems = [...allSkills, ...allSkills];

  return (
    <SectionWrapper id="skills">
      <SectionHeading eyebrow="03 / Skills" title="My tech stack" />

      {/* Infinite marquee strip */}
      <div className="group relative mb-14 overflow-hidden rounded-2xl glass py-5">
        {/* Edge fades */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-ink to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-ink to-transparent" />

        <div className="flex w-max animate-marquee gap-4 group-hover:[animation-play-state:paused]">
          {marqueeItems.map((skill, i) => (
            <span
              key={`${skill}-${i}`}
              className="glass-2 whitespace-nowrap rounded-full px-5 py-2 font-mono text-sm text-slate-300"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Grouped grid */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="grid gap-6 md:grid-cols-3"
      >
        {skillGroups.map((group) => (
          <motion.div
            key={group.title}
            variants={fadeUp}
            className="group relative overflow-hidden rounded-2xl glass p-6 transition-all duration-300 hover:-translate-y-1 hover:border-accent-violet/40 hover:shadow-glow"
          >
            <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-accent-violet/10 blur-2xl transition-opacity group-hover:opacity-100" />
            <h3 className="mb-4 font-display text-xl font-bold text-white">{group.title}</h3>
            <div className="flex flex-wrap gap-2">
              {group.items.map((item) => (
                <span
                  key={item}
                  className="glass-2 rounded-lg px-3 py-1.5 text-sm text-slate-300 transition-colors hover:border-accent-pink/50 hover:text-white"
                >
                  {item}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </SectionWrapper>
  );
}
