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

const NightSkyBackground = lazy(() => import('./components/NightSkyBackground'));

export default function App() {
  return (
    <>
          <Suspense fallback={<div className="fixed inset-0 -z-20 bg-ink" />}>
        <NightSkyBackground />
      </Suspense>

      <Navbar />

      <main className="relative z-0">
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
