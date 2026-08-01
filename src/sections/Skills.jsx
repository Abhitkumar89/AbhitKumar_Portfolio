import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import SectionWrapper from "../components/SectionWrapper";
import SectionHeading from "../components/SectionHeading";
import { fadeUp } from "../lib/motion";
import { skillGroups } from "../data/content";

const SIZE = 520;
const PAD = 10;

function clampInCircle(x, y, chipW, chipH, diameter) {
  const r = diameter / 2 - PAD;
  const halfW = chipW / 2;
  const halfH = chipH / 2;
  const maxR = Math.max(24, r - Math.hypot(halfW, halfH) * 0.9);
  const dx = x - diameter / 2;
  const dy = y - diameter / 2;
  const dist = Math.hypot(dx, dy);
  if (dist <= maxR) return { x, y };
  const scale = maxR / dist;
  return {
    x: diameter / 2 + dx * scale,
    y: diameter / 2 + dy * scale,
  };
}

function initialPositions(skills, diameter) {
  const cx = diameter / 2;
  const cy = diameter / 2;
  // Use most of the circle so chips aren't stuck in the middle
  const maxR = diameter * 0.42;
  const n = skills.length;

  return skills.map((skill, i) => {
    // Fibonacci disc sampling — even spread across the full circle
    const t = (i + 0.5) / n;
    const r = Math.sqrt(t) * maxR;
    const angle = i * Math.PI * (3 - Math.sqrt(5)); // golden angle
    return {
      id: `${skill}-${i}`,
      label: skill,
      x: cx + Math.cos(angle) * r,
      y: cy + Math.sin(angle) * r,
    };
  });
}

function SkillsCircle({ skills }) {
  const circleRef = useRef(null);
  const chipRefs = useRef({});
  const [size, setSize] = useState(SIZE);
  const [items, setItems] = useState(() => initialPositions(skills, SIZE));
  const drag = useRef(null);

  // Keep items in sync if skill list changes
  useEffect(() => {
    setItems(initialPositions(skills, size));
  }, [skills, size]);

  useEffect(() => {
    const el = circleRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => {
      const w = entry.contentRect.width;
      if (w > 0) setSize(w);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const onPointerDown = useCallback(
    (e, id) => {
      e.preventDefault();
      const circle = circleRef.current;
      const chip = chipRefs.current[id];
      if (!circle || !chip) return;
      const rect = circle.getBoundingClientRect();
      const chipRect = chip.getBoundingClientRect();
      const item = items.find((it) => it.id === id);
      if (!item) return;

      drag.current = {
        id,
        offsetX: e.clientX - rect.left - item.x,
        offsetY: e.clientY - rect.top - item.y,
        chipW: chipRect.width,
        chipH: chipRect.height,
      };
      chip.setPointerCapture?.(e.pointerId);
    },
    [items],
  );

  const onPointerMove = useCallback(
    (e) => {
      if (!drag.current) return;
      const circle = circleRef.current;
      if (!circle) return;
      const rect = circle.getBoundingClientRect();
      const { id, offsetX, offsetY, chipW, chipH } = drag.current;
      const rawX = e.clientX - rect.left - offsetX;
      const rawY = e.clientY - rect.top - offsetY;
      const next = clampInCircle(rawX, rawY, chipW, chipH, size);
      setItems((prev) =>
        prev.map((it) => (it.id === id ? { ...it, ...next } : it)),
      );
    },
    [size],
  );

  const onPointerUp = useCallback((e) => {
    if (!drag.current) return;
    const chip = chipRefs.current[drag.current.id];
    chip?.releasePointerCapture?.(e.pointerId);
    drag.current = null;
  }, []);

  const skillList = useMemo(() => skills, [skills]);

  return (
    <div className="relative mx-auto flex w-full max-w-2xl justify-center">
      <div
        ref={circleRef}
        className="relative aspect-square w-full max-w-[520px] touch-none select-none overflow-hidden rounded-full border border-white/20 bg-white/[0.06] shadow-[inset_0_0_80px_rgb(var(--c-fg)/0.06)]"
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerLeave={onPointerUp}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-[12%] rounded-full border border-white/15"
        />

        {items.map((item) => (
          <button
            key={item.id}
            type="button"
            ref={(node) => {
              if (node) chipRefs.current[item.id] = node;
            }}
            onPointerDown={(e) => onPointerDown(e, item.id)}
            className="absolute z-10 cursor-grab whitespace-nowrap rounded-lg border border-white/20 bg-white/15 px-3 py-1.5 font-mono text-[11px] text-slate-200 shadow-lg backdrop-blur-md active:cursor-grabbing sm:text-xs"
            style={{
              left: item.x,
              top: item.y,
              transform: "translate(-50%, -50%)",
              touchAction: "none",
            }}
            aria-label={`Move ${item.label}`}
          >
            {item.label}
          </button>
        ))}

        <p className="pointer-events-none absolute inset-x-0 bottom-4 text-center font-mono text-[10px] text-slate-500">
          drag skills inside the circle
        </p>
      </div>
      {/* keep list reference stable for eslint */}
      <span className="sr-only">{skillList.join(", ")}</span>
    </div>
  );
}

export default function Skills() {
  const allSkills = skillGroups.flatMap((g) => g.items);
  const marqueeItems = [...allSkills, ...allSkills];

  return (
    <SectionWrapper id="skills">
      <SectionHeading title="My tech stack" />

      <div className="group relative mb-14 overflow-hidden rounded-2xl glass py-5">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-ink to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-ink to-transparent" />

        <div className="flex w-max animate-marquee gap-4 group-hover:[animation-play-state:paused]">
          {marqueeItems.map((skill, i) => (
            <span
              key={`${skill}-${i}`}
              className="glass-2 whitespace-nowrap rounded-lg px-5 py-2 font-mono text-sm text-slate-300"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
      >
        <SkillsCircle skills={allSkills} />
      </motion.div>
    </SectionWrapper>
  );
}
