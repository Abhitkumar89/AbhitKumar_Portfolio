import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion';

// A small triangular pointer cursor that springs toward the pointer and
// scales up over interactive elements. Auto-disables on touch devices and
// for reduced-motion users.
export default function CustomCursor() {
  const reduceMotion = useReducedMotion();
  const [hovering, setHovering] = useState(false);
  const [hidden, setHidden] = useState(true);

  const finePointer =
    typeof window !== 'undefined' && window.matchMedia('(pointer: fine)').matches;
  const enabled = finePointer && !reduceMotion;

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const tipX = useSpring(x, { stiffness: 700, damping: 35, mass: 0.4 });
  const tipY = useSpring(y, { stiffness: 700, damping: 35, mass: 0.4 });

  useEffect(() => {
    if (!enabled) return;

    document.body.classList.add('custom-cursor-active');

    const move = (e) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setHidden(false);
    };

    const interactiveSelector =
      'a, button, input, textarea, select, [data-cursor="hover"], [role="button"]';
    const over = (e) => {
      if (e.target.closest?.(interactiveSelector)) setHovering(true);
    };
    const out = (e) => {
      if (e.target.closest?.(interactiveSelector)) setHovering(false);
    };
    const leaveWindow = () => setHidden(true);

    window.addEventListener('mousemove', move);
    window.addEventListener('mouseover', over);
    window.addEventListener('mouseout', out);
    document.addEventListener('mouseleave', leaveWindow);

    return () => {
      document.body.classList.remove('custom-cursor-active');
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseover', over);
      window.removeEventListener('mouseout', out);
      document.removeEventListener('mouseleave', leaveWindow);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[9999]">
      {/* Triangular pointer, anchored at its tip */}
      <motion.div
        className="fixed left-0 top-0 origin-top-left"
        style={{ x: tipX, y: tipY }}
        animate={{ opacity: hidden ? 0 : 1, scale: hovering ? 1.5 : 1 }}
        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      >
        <svg
          width="15"
          height="21"
          viewBox="0 0 15 21"
          fill="none"
          className="text-accent-pink drop-shadow-[0_0_6px_rgba(251,113,133,0.6)]"
        >
          <path
            d="M1 1 L1 16.5 L5 12.6 L7.9 19 L10.3 17.9 L7.4 11.6 L13 11.6 Z"
            fill="currentColor"
            stroke="rgb(var(--c-base))"
            strokeWidth="1.1"
            strokeLinejoin="round"
          />
        </svg>
      </motion.div>
    </div>
  );
}
