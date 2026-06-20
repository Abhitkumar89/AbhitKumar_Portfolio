import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import SectionWrapper from '../components/SectionWrapper';
import SectionHeading from '../components/SectionHeading';
import { fadeUp, staggerContainer } from '../lib/motion';
import { about } from '../data/content';

export default function About() {
  return (
    <SectionWrapper id="about">
      <SectionHeading eyebrow="01 / About" title="A bit about me" />

      <div className="grid gap-12 md:grid-cols-[1.4fr_1fr]">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="space-y-5 text-lg leading-relaxed text-slate-400"
        >
          {about.paragraphs.map((p, i) => (
            <motion.p key={i} variants={fadeUp}>
              {p}
            </motion.p>
          ))}
        </motion.div>

        <motion.ul
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="grid gap-3 self-start"
        >
          {about.highlights.map((h) => (
            <motion.li
              key={h}
              variants={fadeUp}
              className="group flex items-center gap-3 rounded-xl glass px-4 py-3 transition-colors hover:border-accent-violet/40"
            >
              <span className="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-accent-violet/20 text-accent-violet transition-colors group-hover:bg-accent-violet group-hover:text-onaccent">
                <Check size={16} />
              </span>
              <span className="text-slate-200">{h}</span>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </SectionWrapper>
  );
}
