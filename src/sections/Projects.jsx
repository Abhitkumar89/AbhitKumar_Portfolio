import { motion } from 'framer-motion';
import SectionWrapper from '../components/SectionWrapper';
import SectionHeading from '../components/SectionHeading';
import ProjectCard from '../components/ProjectCard';
import { fadeUp, staggerContainer } from '../lib/motion';
import { projects } from '../data/content';

export default function Projects() {
  return (
    <SectionWrapper id="projects">
      <SectionHeading eyebrow="04 / Work" title="Featured projects" />

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.1 }}
        className="grid auto-rows-fr gap-6 md:grid-cols-2"
      >
        {projects.map((project) => (
          <motion.div key={project.title} variants={fadeUp} className={project.featured ? 'md:col-span-2' : ''}>
            <ProjectCard project={project} />
          </motion.div>
        ))}
      </motion.div>
    </SectionWrapper>
  );
}
