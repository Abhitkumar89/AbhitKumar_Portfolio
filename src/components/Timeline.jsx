import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Car, Bike } from 'lucide-react';
import { fadeUp, staggerContainer } from '../lib/motion';

const vehicleIcons = { car: Car, bike: Bike };

// A vertical timeline whose progress is led by a little vehicle (car/bike)
// that drives down the track as the section scrolls into view. The card markup
// is supplied by the caller via `renderCard` so it can be reused for any data.
export default function Timeline({ items, vehicle = 'car', renderCard }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 65%', 'end 65%'],
  });
  // Smooth spring that still tracks scroll closely (avoids a laggy trail).
  const progress = useSpring(scrollYProgress, { stiffness: 80, damping: 26, mass: 0.4 });
  const lineScaleY = useTransform(progress, [0, 1], [0, 1]);
  const vehicleTop = useTransform(progress, [0, 1], ['0%', '100%']);
  const Vehicle = vehicleIcons[vehicle] ?? Car;

  return (
    <div ref={ref} className="relative mx-auto max-w-2xl pl-2">
      {/* The road the vehicle drives on */}
      <div className="absolute left-0 top-0 h-full w-3.5 -translate-x-1/2 overflow-hidden rounded-full glass-2">
        {/* Traveled (colored) portion */}
        <motion.div
          style={{ scaleY: lineScaleY }}
          className="absolute inset-0 origin-top bg-gradient-to-b from-accent-pink/40 via-accent-violet/30 to-accent-cyan/25"
        />
        {/* Dashed center lane markings */}
        <div className="road-lane-v absolute left-1/2 top-0 h-full w-[2px] -translate-x-1/2" />
      </div>
      {/* The moving vehicle, riding the leading edge of the progress */}
      <motion.div
        style={{ top: vehicleTop }}
        className="pointer-events-none absolute left-0 z-20 -translate-x-1/2 -translate-y-1/2"
      >
        <div className="grid h-9 w-9 place-items-center rounded-full glass text-accent-pink shadow-glow-pink">
          <Vehicle size={17} className="rotate-90" />
        </div>
      </motion.div>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="flex flex-col gap-10"
      >
        {items.map((item, i) => (
          <motion.div
            key={item.company ?? item.degree ?? i}
            variants={fadeUp}
            className="relative pl-10 md:pl-14"
          >
            {renderCard(item, i)}
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
