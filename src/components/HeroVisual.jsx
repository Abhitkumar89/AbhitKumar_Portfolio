import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { profile } from "../data/content";

const orbitChips = [
  { label: "</>", className: "left-1/2 top-0 -translate-x-1/2 -translate-y-1/2" },
  { label: "{ }", className: "right-0 top-1/2 translate-x-1/2 -translate-y-1/2" },
  { label: "API", className: "bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2" },
  { label: "UI", className: "left-0 top-1/2 -translate-x-1/2 -translate-y-1/2" },
];

function useIsNight() {
  const [isNight, setIsNight] = useState(() =>
    typeof document !== "undefined"
      ? document.documentElement.classList.contains("dark")
      : true,
  );

  useEffect(() => {
    const sync = () =>
      setIsNight(document.documentElement.classList.contains("dark"));
    sync();
    const observer = new MutationObserver(sync);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => observer.disconnect();
  }, []);

  return isNight;
}

export default function HeroVisual() {
  const isNight = useIsNight();
  const src = isNight ? "/hero-avatar.png" : "/hero-avatar-morning.png";

  return (
    <div className="relative mx-auto aspect-square w-full max-w-[420px]">
      {/* Outer rotating ring + chips */}
      <motion.div
        className="absolute inset-[2%] z-20"
        animate={{ rotate: 360 }}
        transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
      >
        <div className="absolute inset-0 rounded-full border border-white/25" />

        {orbitChips.map((chip) => (
          <span
            key={chip.label}
            className={`absolute z-30 ${chip.className}`}
          >
            <motion.span
              className="block whitespace-nowrap rounded-lg border border-white/25 bg-ink/40 px-2.5 py-1 font-mono text-xs font-medium text-white shadow-sm backdrop-blur-md"
              animate={{ rotate: -360 }}
              transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
            >
              {chip.label}
            </motion.span>
          </span>
        ))}
      </motion.div>

      {/* Inner dashed ring */}
      <motion.div
        aria-hidden
        className="absolute inset-[8%] z-10 rounded-full border border-dashed border-white/15"
        animate={{ rotate: -360 }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
      />

      {/* Circular avatar only */}
      <div className="absolute inset-[12%] z-0 overflow-hidden rounded-full border border-white/20 bg-white/[0.04] shadow-[0_20px_50px_rgba(0,0,0,0.28)]">
        <AnimatePresence mode="wait">
          <motion.img
            key={src}
            src={src}
            alt={`${profile.firstName} developer avatar`}
            className="h-full w-full scale-[1.12] object-cover object-center"
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1.12 }}
            exit={{ opacity: 0, scale: 1.18 }}
            transition={{ duration: 0.35 }}
            draggable={false}
          />
        </AnimatePresence>
      </div>
    </div>
  );
}
