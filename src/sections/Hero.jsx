import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowDown, Download, Sparkles } from "lucide-react";
import { profile } from "../data/content";
import MagneticButton from "../components/MagneticButton";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};
const item = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function Hero() {
  const scrollTo = (id) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  // Cycle through the job titles for an animated, rotating headline.
  const roles = profile.roles?.length ? profile.roles : [profile.role];
  const [roleIndex, setRoleIndex] = useState(0);
  useEffect(() => {
    if (roles.length < 2) return;
    const id = setInterval(
      () => setRoleIndex((i) => (i + 1) % roles.length),
      2600,
    );
    return () => clearInterval(id);
  }, [roles.length]);

  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden px-6 pt-28 max-w-full"
    >
      {/* Floating gradient blobs */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-24 top-24 h-72 w-72 rounded-full bg-accent-violet/30 blur-3xl animate-float"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-16 bottom-16 h-80 w-80 rounded-full bg-accent-pink/20 blur-3xl animate-float"
        style={{ animationDelay: "2s" }}
      />

      <div className="mx-auto max-w-6xl w-full px-6">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="relative z-10 grid w-full gap-12 md:grid-cols-[1.2fr_0.8fr] md:items-center"
        >
          <div>
            <motion.span variants={item} className="chip mb-6 text-accent-cyan">
              <Sparkles size={14} className="text-accent-amber" />
              Available for new projects
            </motion.span>

            <motion.p
              variants={item}
              className="mb-3 font-mono text-sm text-accent-pink"
            >
              Hi, my name is
            </motion.p>

            <motion.h1
              variants={item}
              className="font-display text-5xl font-bold leading-[1.05] text-white sm:text-6xl lg:text-7xl"
            >
              {profile.name}
            </motion.h1>

            <motion.h2
              variants={item}
              className="mt-2 flex min-h-[1.3em] items-center font-display text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl"
            >
              <AnimatePresence mode="wait">
                <motion.span
                  key={roleIndex}
                  initial={{ y: 22, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -22, opacity: 0 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="text-gradient animate-gradient inline-block"
                >
                  {roles[roleIndex]}
                </motion.span>
              </AnimatePresence>
            </motion.h2>

            <motion.p
              variants={item}
              className="mt-6 max-w-xl text-lg leading-relaxed text-slate-400"
            >
              {profile.intro}
            </motion.p>

            <motion.div
              variants={item}
              className="mt-9 flex flex-wrap items-center gap-4"
            >
              <MagneticButton
                onClick={() => scrollTo("projects")}
                className="group inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-accent-pink to-accent-violet px-7 py-3.5 font-semibold text-onaccent shadow-glow-pink"
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
                className="glass-2 inline-flex items-center gap-2 rounded-xl px-7 py-3.5 font-semibold text-white transition-colors hover:bg-white/10"
              >
                <Download size={18} /> Resume
              </MagneticButton>
            </motion.div>

            {/* Stats */}
            <motion.div variants={item} className="mt-12 flex flex-wrap gap-8">
              {profile.stats.map((s) => (
                <div key={s.label}>
                  <div className="font-display text-3xl font-bold text-white">
                    {s.value}
                  </div>
                  <div className="text-sm text-slate-500">{s.label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Decorative animated avatar / code card */}
          <motion.div
            variants={item}
            className="relative mx-auto hidden w-full max-w-sm md:block"
          >
            <div className="absolute inset-0 -z-10 animate-spin-slow rounded-[2rem] bg-gradient-to-tr from-accent-pink via-accent-violet to-accent-cyan opacity-40 blur-xl" />
            <div className="glass rounded-[2rem] p-6 font-mono text-sm shadow-glow">
              <div className="mb-4 flex gap-2">
                <span className="h-3 w-3 rounded-full bg-accent-pink" />
                <span className="h-3 w-3 rounded-full bg-accent-amber" />
                <span className="h-3 w-3 rounded-full bg-accent-lime" />
              </div>
              <pre className="whitespace-pre-wrap leading-relaxed text-slate-300">
                <span className="text-accent-violet">const</span>{" "}
                <span className="text-accent-cyan">dev</span> = {"{"}
                {"\n"} name:{" "}
                <span className="text-accent-lime">'{profile.firstName}'</span>,
                {"\n"} stack: [<span className="text-accent-lime">'React'</span>
                , <span className="text-accent-lime">'Node'</span>],
                {"\n"} loves:{" "}
                <span className="text-accent-lime">'clean UI'</span>,{"\n"} tea:{" "}
                <span className="text-accent-pink">true</span>,{"\n"}
                {"}"};
              </pre>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll hint */}
      <motion.button
        onClick={() => scrollTo("about")}
        aria-label="Scroll to about section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-slate-500 hover:text-white"
      >
        <ArrowDown size={22} className="animate-bounce" />
      </motion.button>
    </section>
  );
}
