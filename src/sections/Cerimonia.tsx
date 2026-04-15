import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Clock, MapPin, Mic, Disc, Wine, UtensilsCrossed, Calendar, Mail } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const eventDetails = [
  { icon: Clock, text: 'Martedì 8 dicembre 2026 · ore 10:30' },
  { icon: MapPin, text: 'Dancing Papillon — Via dei Ghivizzani 128, Piano di Mommio (LU)' },
  { icon: Mic, text: 'Lettura testi vincitori Sezioni A e B' },
  { icon: Disc, text: 'Presentazione CD brano vincitore Sezione C' },
  { icon: Wine, text: 'Bottiglia Vino del Gioiello per i premiati presenti' },
];

export default function Cerimonia() {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

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
        { scale: 1.04, opacity: 0.85 },
        { scale: 1, opacity: 1, ease: 'none' },
        0
      );

      scrollTl.fromTo(
        '.cerimonia-title',
        { y: 14, opacity: 0 },
        { y: 0, opacity: 1, ease: 'power2.out' },
        0.02
      );

      scrollTl.fromTo(
        '.cerimonia-subtitle',
        { y: 10, opacity: 0 },
        { y: 0, opacity: 1, ease: 'power2.out' },
        0.04
      );

      scrollTl.fromTo(
        '.cerimonia-detail',
        { y: 14, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.008, ease: 'power2.out' },
        0.05
      );

      scrollTl.fromTo(
        '.cerimonia-card',
        { x: '10vw', opacity: 0, scale: 0.98 },
        { x: 0, opacity: 1, scale: 1, ease: 'power2.out' },
        0.04
      );

      // Phase 3: EXIT (70% - 100%)
      scrollTl.fromTo(
        '.cerimonia-left',
        { x: 0, opacity: 1 },
        { x: '-14vw', opacity: 0, ease: 'power2.in' },
        0.8
      );

      scrollTl.fromTo(
        '.cerimonia-card',
        { x: 0, opacity: 1 },
        { x: '14vw', opacity: 0, ease: 'power2.in' },
        0.8
      );

      scrollTl.fromTo(
        bgRef.current,
        { scale: 1, y: 0 },
        { scale: 1.07, y: '-5vh', ease: 'none' },
        0.8
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="cerimonia"
      className="section-pinned relative z-[70]"
    >
      {/* Background Image */}
      <div ref={bgRef} className="absolute inset-0 w-full h-full">
        <img
          src="/cerimonia_venue.jpg"
          alt="Cerimonia venue"
          className="w-full h-full object-cover"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 gradient-overlay-left" />
        {/* Extra dark overlay for mobile readability */}
        <div className="absolute inset-0 bg-[#2B1E1A]/30 lg:bg-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col lg:flex-row items-start lg:items-center px-8 md:px-12 lg:px-[7vw] pt-24 lg:pt-[14vh] pb-6 lg:pb-0 overflow-y-auto lg:overflow-visible">
        {/* Left side - Event details */}
        <div className="cerimonia-left w-full lg:flex-1 lg:max-w-[38vw]">
          <h2
            className="cerimonia-title font-serif text-[clamp(28px,3.2vw,52px)] text-[#F3EFE9] leading-[1.15] text-shadow-soft"
            style={{ opacity: 0 }}
          >
            Cerimonia di Premiazione
          </h2>
          <p
            className="cerimonia-subtitle font-sans text-[clamp(14px,1.3vw,20px)] text-[#F3EFE9]/75 mt-3 lg:mt-4"
            style={{ opacity: 0 }}
          >
            Un appuntamento tra parole, musica e convivialità.
          </p>

          {/* Details list */}
          <div className="mt-6 lg:mt-10 space-y-3 lg:space-y-4">
            {eventDetails.map((detail, index) => {
              const Icon = detail.icon;
              return (
                <div
                  key={index}
                  className="cerimonia-detail flex items-start gap-3 lg:gap-4"
                  style={{ opacity: 0 }}
                >
                  <div className="w-9 h-9 lg:w-10 lg:h-10 rounded-full bg-[#2B1E1A]/60 backdrop-blur-sm border border-[#C49A6C]/30 flex items-center justify-center flex-shrink-0">
                    <Icon size={16} className="text-[#C49A6C] lg:w-[18px] lg:h-[18px]" />
                  </div>
                  <span className="font-sans text-sm text-[#F3EFE9]/90 pt-1.5 lg:pt-2 leading-relaxed">
                    {detail.text}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right side - Convivio card */}
        <div
          className="cerimonia-card w-full lg:w-[28vw] mt-8 lg:mt-0 lg:ml-auto rounded-2xl overflow-hidden bg-[#2B1E1A]/70 backdrop-blur-md border border-[#C49A6C]/20"
          style={{ opacity: 0 }}
        >
          <div className="p-5 lg:p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-[#C49A6C]/20 flex items-center justify-center">
                <UtensilsCrossed size={20} className="text-[#C49A6C]" />
              </div>
              <h3 className="font-serif text-xl text-[#F3EFE9]">
                Convivio letterario
              </h3>
            </div>

            <div className="space-y-2.5 mb-5">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C49A6C]" />
                <span className="font-sans text-sm text-[#F3EFE9]/80">
                  Buffet antipasti
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C49A6C]" />
                <span className="font-sans text-sm text-[#F3EFE9]/80">
                  Tordelli fatti in casa
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C49A6C]" />
                <span className="font-sans text-sm text-[#F3EFE9]/80">
                  Dolce della tradizione
                </span>
              </div>
            </div>

            <div className="pt-4 border-t border-[#C49A6C]/20">
              <div className="flex items-center justify-between mb-3">
                <span className="font-sans text-sm text-[#F3EFE9]/60">Quota</span>
                <span className="font-serif text-2xl text-[#C49A6C]">€25,00</span>
              </div>
              <p className="font-sans text-xs text-[#F3EFE9]/50 mb-4">
                Tutto incluso (bevande comprese)
              </p>
            </div>

            <div className="flex items-center gap-2 mb-4 text-[#C49A6C]">
              <Calendar size={16} />
              <span className="font-sans text-xs">
                Conferma entro 27 novembre 2026
              </span>
            </div>

            <a
              href="mailto:info@clubculturalegioiello.it?subject=Prenotazione Convivio Letterario"
              className="btn-primary w-full"
            >
              <Mail size={18} className="mr-2" />
              Prenota il tuo posto
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
