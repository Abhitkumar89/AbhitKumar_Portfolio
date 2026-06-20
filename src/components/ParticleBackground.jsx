import { useCallback, useMemo } from 'react';
import { Particles, ParticlesProvider } from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';
import { useReducedMotion } from 'framer-motion';

// Lightweight, interactive particle field used as a global backdrop.
// Particles gently drift and link near the cursor. Disabled for users who
// prefer reduced motion to keep things calm and performant.
export default function ParticleBackground() {
  const reduceMotion = useReducedMotion();

  const init = useCallback(async (engine) => {
    await loadSlim(engine);
  }, []);

  const options = useMemo(
    () => ({
      fpsLimit: 60,
      detectRetina: true,
      background: { color: 'transparent' },
      interactivity: {
        events: {
          onHover: { enable: true, mode: 'grab' },
        },
        modes: {
          grab: { distance: 170, links: { opacity: 0.6 } },
        },
      },
      particles: {
        number: { value:100,density: { enable: true, area: 900 } },
        color: { value: ['#fb7185', '#2dd4bf', '#38bdf8'] },
        links: {
          enable: true,
          distance: 145,
          color: '#8b93a7',
          opacity: 0.32,
          width: 1.1,
        },
        move: {
          enable: true,
          speed: 0.6,
          direction: 'none',
          outModes: { default: 'out' },
        },
        opacity: { value: { min: 0.2, max: 0.6 } },
        size: { value: { min: 1, max: 3 } },
      },
    }),
    [],
  );

  // Static gradient fallback so the page never looks bare (and for reduced motion).
  const fallback = (
    <div aria-hidden className="absolute inset-0 bg-grid-faint [background-size:44px_44px]" />
  );

  if (reduceMotion) {
    return (
      <div aria-hidden className="fixed inset-0 -z-10 bg-ink">
        {fallback}
      </div>
    );
  }

  return (
    <div aria-hidden className="fixed inset-0 -z-10 bg-ink">
      {fallback}
      <ParticlesProvider init={init}>
        <Particles id="tsparticles" options={options} className="absolute inset-0" />
      </ParticlesProvider>
    </div>
  );
}
