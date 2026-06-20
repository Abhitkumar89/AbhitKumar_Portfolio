import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Car } from 'lucide-react';

// A wide horizontal "road" that lives inside the navbar pill. The car's
// position is tied to page scroll progress, so it travels from Home (left) to
// Contact (right) and stops wherever the user stops scrolling. Desktop only.
export default function HeaderRoad() {
  const { scrollYProgress } = useScroll();
  // Smooth spring that still tracks scroll closely (avoids a laggy trail).
  const progress = useSpring(scrollYProgress, { stiffness: 80, damping: 26, mass: 0.4 });
  const left = useTransform(progress, [0, 1], ['1%', '99%']);

  return (
    <div aria-hidden className="relative mt-2 hidden h-3 w-full md:block">
      {/* Road surface + dashed lane markings */}
      <div className="absolute inset-0 overflow-hidden rounded-full glass-2">
        <div className="road-lane-h absolute inset-x-2 top-1/2 h-[2px] -translate-y-1/2" />
      </div>
      {/* Car rides on top of the road */}
      <motion.div
        style={{ left }}
        className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 text-accent-pink drop-shadow-[0_0_6px_rgba(251,113,133,0.6)]"
      >
        <Car size={14} />
      </motion.div>
    </div>
  );
}
