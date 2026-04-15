import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from './sections/Navbar';
import Hero from './sections/Hero';
import Storia from './sections/Storia';
import Ricordo from './sections/Ricordo';
import Sezioni from './sections/Sezioni';
import Giuria from './sections/Giuria';
import Numeri from './sections/Numeri';
import Cerimonia from './sections/Cerimonia';
import Partecipa from './sections/Partecipa';
import Gallery from './sections/Gallery';
import Footer from './sections/Footer';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Wait for all sections to mount and create their ScrollTriggers
    const timer = setTimeout(() => {
      const pinned = ScrollTrigger.getAll()
        .filter(st => st.vars.pin)
        .sort((a, b) => a.start - b.start);
      
      const maxScroll = ScrollTrigger.maxScroll(window);
      if (!maxScroll || pinned.length === 0) return;

      // Build an array of snap points: start and end of each pinned section
      const snapPoints: number[] = [];
      pinned.forEach(st => {
        const start = st.start / maxScroll;
        const end = (st.end ?? st.start) / maxScroll;
        snapPoints.push(start, end);
      });

      ScrollTrigger.create({
        snap: {
          snapTo: (value: number) => {
            // Only snap when near a pinned section boundary
            const threshold = 0.04;
            const nearest = snapPoints.reduce((closest, pt) =>
              Math.abs(pt - value) < Math.abs(closest - value) ? pt : closest,
              snapPoints[0] ?? 0
            );
            // Snap only if we're close enough to a boundary
            if (Math.abs(nearest - value) <= threshold) {
              return nearest;
            }
            return value;
          },
          duration: { min: 0.2, max: 0.5 },
          delay: 0.08,
          ease: "power2.inOut"
        }
      });
    }, 500);

    return () => {
      clearTimeout(timer);
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

  return (
    <div ref={mainRef} className="relative">
      {/* Grain overlay */}
      <div className="grain-overlay" />
      
      {/* Navigation */}
      <Navbar />
      
      {/* Main content */}
      <main className="relative">
        <Hero />
        <Storia />
        <Ricordo />
        <Sezioni />
        <Giuria />
        <Numeri />
        <Cerimonia />
        <Partecipa />
        <Gallery />
        <Footer />
      </main>
    </div>
  );
}

export default App;
