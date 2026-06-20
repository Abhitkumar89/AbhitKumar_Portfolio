import { useRef, useState } from 'react';
import { motion, useMotionTemplate, useMotionValue, useSpring, useReducedMotion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import SocialIcon from './SocialIcon';

const accentMap = {
  violet: 'rgba(255,122,61,0.5)',
  pink: 'rgba(255,61,104,0.5)',
  cyan: 'rgba(255,193,77,0.5)',
  lime: 'rgba(45,212,167,0.5)',
  amber: 'rgba(255,170,51,0.5)',
};

// A project card with 3D tilt and a cursor-following spotlight glow.
export default function ProjectCard({ project }) {
  const reduceMotion = useReducedMotion();
  const ref = useRef(null);
  const [glow, setGlow] = useState({ x: 50, y: 50 });

  // Tilt values
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 200, damping: 20 });
  const sry = useSpring(ry, { stiffness: 200, damping: 20 });

  const handleMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    setGlow({ x: px * 100, y: py * 100 });
    if (!reduceMotion) {
      ry.set((px - 0.5) * 10);
      rx.set((0.5 - py) * 10);
    }
  };

  const reset = () => {
    rx.set(0);
    ry.set(0);
  };

  const accent = accentMap[project.accent] ?? accentMap.violet;
  const background = useMotionTemplate`radial-gradient(circle at ${glow.x}% ${glow.y}%, ${accent}, transparent 60%)`;

  return (
    <motion.article
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      style={{ rotateX: srx, rotateY: sry, transformPerspective: 1000 }}
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl glass p-6 transition-shadow duration-300 hover:shadow-glow"
    >
      {/* Spotlight glow overlay */}
      <motion.div
        aria-hidden
        style={{ background }}
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      />

      <div className="relative z-10 flex h-full flex-col">
        <div className="mb-4 flex items-start justify-between gap-4">
          <h3 className="font-display text-xl font-bold text-white sm:text-2xl">
            {project.title}
          </h3>
          <div className="flex gap-2">
            {project.links?.code && (
              <a
                href={project.links.code}
                target="_blank"
                rel="noreferrer"
                aria-label={`${project.title} source code`}
                className="glass-2 grid h-9 w-9 place-items-center rounded-lg text-slate-300 transition-colors hover:border-white/30 hover:text-white"
              >
                <SocialIcon name="github" size={16} />
              </a>
            )}
            {project.links?.live && (
              <a
                href={project.links.live}
                target="_blank"
                rel="noreferrer"
                aria-label={`${project.title} live demo`}
                className="glass-2 grid h-9 w-9 place-items-center rounded-lg text-slate-300 transition-colors hover:border-accent-pink/50 hover:text-white"
              >
                <ArrowUpRight size={16} />
              </a>
            )}
          </div>
        </div>

        <p className="mb-6 flex-1 leading-relaxed text-slate-400">{project.description}</p>

        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="glass-2 rounded-full px-3 py-1 font-mono text-xs text-slate-400"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.article>
  );
}
