import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Quote } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const dataChips = [
  { label: '18/08/1930 · Massa' },
  { label: 'Fisarmonicista' },
  { label: 'Conte del Monte Gioiello' },
];

export default function Ricordo() {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const watermarkRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=200%',
          pin: true,
          scrub: 0.6,
        },
      });

      // Phase 1: ENTRANCE (0% - 30%)
      scrollTl.fromTo(
        bgRef.current,
        { scale: 1.04, x: '-2vw', opacity: 0.85 },
        { scale: 1, x: 0, opacity: 1, ease: 'none' },
        0
      );

      scrollTl.fromTo(
        '.ricordo-quote',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, ease: 'power2.out' },
        0.03
      );

      scrollTl.fromTo(
        '.ricordo-attribution',
        { y: 12, opacity: 0 },
        { y: 0, opacity: 1, ease: 'power2.out' },
        0.06
      );

      scrollTl.fromTo(
        '.ricordo-body',
        { y: 14, opacity: 0 },
        { y: 0, opacity: 1, ease: 'power2.out' },
        0.07
      );

      scrollTl.fromTo(
        '.ricordo-chip',
        { y: 14, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.01, ease: 'power2.out' },
        0.08
      );

      scrollTl.fromTo(
        watermarkRef.current,
        { opacity: 0 },
        { opacity: 0.08, ease: 'power2.out' },
        0
      );

      scrollTl.fromTo(
        '.ricordo-text-group',
        { x: 0, opacity: 1 },
        { x: '-14vw', opacity: 0, ease: 'power2.in' },
        0.8
      );

      scrollTl.fromTo(
        '.ricordo-chips',
        { y: 0, opacity: 1 },
        { y: '8vh', opacity: 0, ease: 'power2.in' },
        0.8
      );

      scrollTl.fromTo(
        bgRef.current,
        { scale: 1, y: 0 },
        { scale: 1.06, y: '-4vh', ease: 'none' },
        0.8
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="section-pinned relative z-30"
    >
      {/* Background Image */}
      <div ref={bgRef} className="absolute inset-0 w-full h-full">
        <img
          src="/gian_lorieri_portrait.jpg"
          alt="Gian Lorieri"
          className="w-full h-full object-cover object-top"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 gradient-overlay-left" />
      </div>

      {/* Watermark */}
      <div
        ref={watermarkRef}
        className="absolute right-[-8vw] top-[12vh] watermark"
        style={{ opacity: 0 }}
      >
        GIAN
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-center px-8 md:px-12 lg:px-[7vw] pt-24 lg:pt-0">
        <div className="ricordo-text-group max-w-full lg:max-w-[44vw]">
          {/* Quote icon */}
          <div className="ricordo-quote mb-6" style={{ opacity: 0 }}>
            <Quote size={40} className="text-[#C49A6C] opacity-60" />
          </div>

          {/* Quote */}
          <blockquote
            className="ricordo-quote font-serif text-[clamp(24px,2.5vw,40px)] text-[#F3EFE9] italic leading-[1.3] text-shadow-soft"
            style={{ opacity: 0 }}
          >
            "Sono nato in una capanna di canne. La musica e la generosità mi hanno fatto Re."
          </blockquote>

          {/* Attribution */}
          <div
            className="ricordo-attribution mt-6 font-sans text-base text-[#C49A6C]"
            style={{ opacity: 0 }}
          >
            — Giovanni "Gian" Lorieri
          </div>

          {/* Body */}
          <p
            className="ricordo-body font-sans text-[clamp(14px,1.1vw,16px)] text-[#F3EFE9]/75 mt-10 leading-relaxed max-w-full lg:max-w-[36vw]"
            style={{ opacity: 0 }}
          >
            Da umili origini — quattordici fratelli, la guerra, i pascoli della Lunigiana — Gian costruì un impero nel mondo delle notti versiliesi. Dal <em>"Carillon"</em> di Lido di Camaiore all'iconico <strong className="text-[#F3EFE9]">Dancing Papillon</strong> (oggi sede della cerimonia), la sua vita è una storia di talento e generosità straordinari. Fu il suo entusiasmo a far decollare il Premio. In occasione della XXI edizione gli fu conferito il titolo di <strong className="text-[#F3EFE9]">"Conte del Monte Gioiello"</strong>. Oggi una statua in marmo bianco di Carrara lo ricorda all'ingresso del Ristorante Il Gioiello, portato avanti dalla figlia <strong className="text-[#F3EFE9]">Giovanna Lorieri</strong>, Presidente del Premio.
          </p>
        </div>

        {/* Data chips */}
        <div className="ricordo-chips flex flex-wrap gap-3 mt-10">
          {dataChips.map((chip) => (
            <div
              key={chip.label}
              className="ricordo-chip px-4 py-2 rounded-full bg-[#2B1E1A]/60 backdrop-blur-sm border border-[#C49A6C]/30"
              style={{ opacity: 0 }}
            >
              <span className="font-sans text-sm text-[#F3EFE9]/90">
                {chip.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
