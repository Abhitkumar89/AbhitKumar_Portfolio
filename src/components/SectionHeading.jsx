import { motion } from 'framer-motion';

// Consistent eyebrow + title block for each section.
export default function SectionHeading({ eyebrow, title, align = 'left' }) {
  const alignment = align === 'center' ? 'items-center text-center' : 'items-start text-left';
  return (
    <div className={`mb-12 flex flex-col gap-3 ${alignment}`}>
      {eyebrow && (
        <span className="chip font-mono text-xs uppercase tracking-[0.2em] text-accent-pink">
          {eyebrow}
        </span>
      )}
      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="font-display text-4xl font-bold text-white sm:text-5xl"
      >
        {title}
      </motion.h2>
    </div>
  );
}
