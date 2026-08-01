import { motion } from "framer-motion";
import SectionWrapper from "../components/SectionWrapper";
import SectionHeading from "../components/SectionHeading";
import { fadeUp, staggerContainer } from "../lib/motion";
import { about } from "../data/content";

export default function About() {
  return (
    <SectionWrapper id="about">
      <SectionHeading title="A bit about me" />

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
          className="divide-y divide-white/10 border-y border-white/10 self-start"
        >
          {about.highlights.map((h) => (
            <motion.li
              key={h}
              variants={fadeUp}
              className="py-4 text-base text-slate-200 sm:text-lg"
            >
              {h}
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </SectionWrapper>
  );
}
