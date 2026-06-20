import { lazy, Suspense } from 'react';
import Navbar from './components/Navbar';
import Hero from './sections/Hero';
import About from './sections/About';
import Education from './sections/Education';
import Skills from './sections/Skills';
import Projects from './sections/Projects';
import Experience from './sections/Experience';
import Contact from './sections/Contact';
import Footer from './sections/Footer';

// Particle background is loaded lazily so it never blocks first paint.
const ParticleBackground = lazy(() => import('./components/ParticleBackground'));

export default function App() {
  return (
    <>
      <Suspense fallback={<div className="fixed inset-0 -z-10 bg-ink" />}>
        <ParticleBackground />
      </Suspense>

      {/* Ambient colored gradient blobs - keep the (light) background lively */}
      <div aria-hidden className="pointer-events-none fixed inset-0 -z-[5] overflow-hidden">
        <div className="absolute -left-32 top-16 h-96 w-96 rounded-full bg-accent-pink/25 blur-3xl animate-float dark:opacity-40" />
        <div
          className="absolute -right-24 top-1/3 h-[28rem] w-[28rem] rounded-full bg-accent-cyan/25 blur-3xl animate-float dark:opacity-40"
          style={{ animationDelay: '2s' }}
        />
        <div
          className="absolute bottom-0 left-1/3 h-96 w-96 rounded-full bg-accent-violet/20 blur-3xl animate-float dark:opacity-30"
          style={{ animationDelay: '4s' }}
        />
      </div>

      <Navbar />

      <main>
        <Hero />
        <About />
        <Experience />
        <Skills />
        <Projects />
        <Education />
        <Contact />
      </main>

      <Footer />
    </>
  );
}
