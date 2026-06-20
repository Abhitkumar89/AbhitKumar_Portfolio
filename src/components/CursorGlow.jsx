import { useEffect } from 'react';
import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion';

// A large, soft, multi-color glow that trails the cursor. It's prominent in
// light mode (to keep the page lively and colorful) and subtle in dark mode.
// Sits behind the content and disables for reduced-motion users.
export default function CursorGlow() {
  const reduceMotion = useReducedMotion();

  const startX = typeof window !== 'undefined' ? window.innerWidth / 2 : 0;
  const startY = typeof window !== 'undefined' ? window.innerHeight / 2 : 0;
  const x = useMotionValue(startX);
  const y = useMotionValue(startY);
  const sx = useSpring(x, { stiffness: 90, damping: 25, mass: 1 });
  const sy = useSpring(y, { stiffness: 90, damping: 25, mass: 1 });

  useEffect(() => {
    if (reduceMotion) return;
    const move = (e) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, [reduceMotion, x, y]);

  if (reduceMotion) return null;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 -z-[5]"
      style={{ x: sx, y: sy }}
    >
      <div className="cursor-glow -translate-x-1/2 -translate-y-1/2" />
    </motion.div>
  );
}
