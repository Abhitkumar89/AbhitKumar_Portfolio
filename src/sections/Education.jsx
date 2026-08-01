import { motion } from "framer-motion";
import SectionWrapper from "../components/SectionWrapper";
import { fadeUp, staggerContainer } from "../lib/motion";
import { education } from "../data/content";

export default function Education() {
  return (
    <SectionWrapper id="education">
      <motion.h2
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="mb-12 font-display text-3xl font-bold text-white sm:text-4xl"
      >
        Where I Studied
      </motion.h2>

      <motion.ul
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.08 }}
        className="divide-y divide-white/10 border-y border-white/10"
      >
        {education.map((item) => (
          <motion.li
            key={item.degree}
            variants={fadeUp}
            className="flex flex-col gap-2 py-8 sm:flex-row sm:items-start sm:justify-between sm:gap-8"
          >
            <div className="min-w-0">
              <h3 className="font-display text-xl font-semibold text-white sm:text-2xl">
                {item.degree}
              </h3>
              <p className="mt-2 font-mono text-sm text-slate-400">
                {item.school}
                {item.grade ? ` · ${item.grade}` : ""}
              </p>
              {item.description && (
                <p className="mt-3 max-w-2xl leading-relaxed text-slate-400">
                  {item.description}
                </p>
              )}
            </div>

            <span className="shrink-0 font-mono text-sm text-slate-500 sm:pt-1">
              {item.period}
            </span>
          </motion.li>
        ))}
      </motion.ul>
    </SectionWrapper>
  );
}
