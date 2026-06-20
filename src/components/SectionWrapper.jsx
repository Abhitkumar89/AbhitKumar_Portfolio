import { motion } from 'framer-motion';

// Reusable section shell that fades/slides its children into view on scroll.
// Pass an `id` so the navbar scroll-spy and anchor links can target it.
export default function SectionWrapper({ id, children, className = '' }) {
  return (
    <motion.section
      id={id}
      className={`section-pad scroll-mt-24 ${className}`}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.section>
  );
}
