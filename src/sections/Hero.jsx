import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowDown, Download } from "lucide-react";
import { profile } from "../data/content";
import MagneticButton from "../components/MagneticButton";
import HeroVisual from "../components/HeroVisual";

function RotatingRole({ roles }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!roles?.length) return undefined;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % roles.length);
    }, 2400);
    return () => clearInterval(id);
  }, [roles]);

  return (
    <span className="relative mt-2 block h-[1.35em] overflow-hidden text-2xl font-medium text-white/85 sm:text-3xl">
      <AnimatePresence mode="wait">
        <motion.span
          key={roles[index]}
          initial={{ y: "60%", opacity: 0 }}
          animate={{ y: "0%", opacity: 1 }}
          exit={{ y: "-60%", opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="absolute inset-x-0 top-0"
        >
          {roles[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

export default function Hero() {
  const scrollTo = (id) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden px-6 pt-28 max-w-full"
    >
      <div className="relative z-10 mx-auto grid w-full max-w-6xl items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8">
        <div className="max-w-xl">
          <p className="mb-3 text-lg text-white/85 sm:text-xl">
            Hi I&apos;m{" "}
            <span className="font-semibold text-white">{profile.firstName}</span>
          </p>

          <p className="text-base leading-relaxed text-slate-300 sm:text-lg">
            A developer dedicated to crafting
          </p>

          <h1 className="mt-1 font-display text-6xl font-bold leading-[0.95] tracking-tight text-white sm:text-7xl lg:text-8xl">
            Bold
          </h1>

          <RotatingRole roles={profile.roles} />

          <p className="mt-6 max-w-md text-base leading-relaxed text-slate-400">
            {profile.intro}
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <MagneticButton
              onClick={() => scrollTo("projects")}
              className="group inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/5 px-7 py-3.5 font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/10"
            >
              View my work
              <ArrowDown
                size={18}
                className="transition-transform group-hover:translate-y-0.5"
              />
            </MagneticButton>

            <MagneticButton
              href={profile.resumeUrl}
              download
              strength={0.3}
              className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/5 px-7 py-3.5 font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/10"
            >
              <Download size={18} /> Resume
            </MagneticButton>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }}
          className="flex justify-center lg:justify-end"
        >
          <HeroVisual />
        </motion.div>
      </div>
    </section>
  );
}
