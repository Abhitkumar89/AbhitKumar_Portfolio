import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import SectionWrapper from "../components/SectionWrapper";
import { fadeUp, staggerContainer } from "../lib/motion";
import { projects } from "../data/content";

/** Prefer live screenshot when available; fall back to local thematic mockup. */
function getPreviewSources(project) {
  const local = project.image || null;
  const live = project.links?.live;
  if (live) {
    const shot = `https://s0.wp.com/mshots/v1/${encodeURIComponent(live)}?w=1200`;
    return { primary: shot, fallback: local };
  }
  return { primary: local, fallback: null };
}

function ProjectPreview({ project, cursor }) {
  const { primary, fallback } = getPreviewSources(project);
  const [src, setSrc] = useState(primary);

  useEffect(() => {
    setSrc(primary);
  }, [primary, project.title]);

  if (!src) return null;

  return (
    <motion.div
      key={project.title}
      initial={{ opacity: 0, scale: 0.94, y: 8 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.94, y: 8 }}
      transition={{ duration: 0.18 }}
      className="pointer-events-none fixed z-50 hidden overflow-hidden rounded-2xl border border-white/15 bg-ink-card shadow-[0_20px_60px_rgb(var(--c-fg)/0.25)] md:block"
      style={{
        left: Math.min(cursor.x + 28, window.innerWidth - 420),
        top: Math.max(24, cursor.y - 120),
        width: 400,
        height: 250,
      }}
    >
      <img
        src={src}
        alt={project.title}
        className="h-full w-full object-cover"
        loading="eager"
        onError={() => {
          if (fallback && src !== fallback) setSrc(fallback);
        }}
      />
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent px-4 pb-3 pt-10">
        <p className="truncate text-sm font-semibold text-white">{project.title}</p>
        <p className="mt-0.5 truncate font-mono text-[11px] text-white/70">
          {project.tags.slice(0, 4).join(" · ")}
        </p>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const [active, setActive] = useState(null);
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const [visible, setVisible] = useState(false);
  const frame = useRef(0);
  const target = useRef({ x: 0, y: 0 });

  const onMove = useCallback((e) => {
    target.current = { x: e.clientX, y: e.clientY };
    if (!frame.current) {
      frame.current = requestAnimationFrame(() => {
        setCursor({ ...target.current });
        frame.current = 0;
      });
    }
  }, []);

  useEffect(() => {
    return () => {
      if (frame.current) cancelAnimationFrame(frame.current);
    };
  }, []);

  // Warm live screenshots in the background so hover feels instant
  useEffect(() => {
    projects.forEach((p) => {
      const { primary } = getPreviewSources(p);
      if (!primary || primary.startsWith("/")) return;
      const img = new Image();
      img.src = primary;
    });
  }, []);

  return (
    <SectionWrapper id="projects">
      <motion.h2
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="mb-12 font-display text-3xl font-bold text-white sm:text-4xl"
      >
        My Selected Projects
      </motion.h2>

      <motion.ul
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.08 }}
        className="relative divide-y divide-white/10 border-y border-white/10"
        onMouseMove={onMove}
        onMouseLeave={() => {
          setVisible(false);
          setActive(null);
        }}
      >
        {projects.map((project) => {
          const href = project.links?.live || project.links?.code || "#";
          const hasPreview = Boolean(getPreviewSources(project).primary);

          return (
            <motion.li
              key={project.title}
              variants={fadeUp}
              onMouseEnter={() => {
                if (!hasPreview) return;
                setActive(project);
                setVisible(true);
              }}
            >
              <a
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noreferrer" : undefined}
                className="group flex flex-col gap-3 py-8 transition-colors sm:flex-row sm:items-center sm:justify-between sm:gap-8"
              >
                <div className="min-w-0">
                  <h3 className="font-display text-xl font-semibold text-white transition-colors group-hover:text-accent-cyan sm:text-2xl">
                    {project.title}
                  </h3>
                  <p className="mt-2 font-mono text-sm text-slate-400">
                    {project.tags.slice(0, 5).join(" · ")}
                  </p>
                </div>

                <span className="inline-flex shrink-0 items-center gap-1.5 text-sm font-medium text-white/80 transition-all group-hover:gap-2.5 group-hover:text-white">
                  Read More
                  <ArrowUpRight size={16} />
                </span>
              </a>
            </motion.li>
          );
        })}
      </motion.ul>

      <AnimatePresence>
        {visible && active && <ProjectPreview project={active} cursor={cursor} />}
      </AnimatePresence>
    </SectionWrapper>
  );
}
