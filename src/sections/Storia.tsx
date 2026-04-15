import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { BookOpen, Star, Trophy, Music } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const milestones = [
  { year: '1983', label: "L'idea", icon: BookOpen },
  { year: '1984', label: 'Prima edizione', icon: Star },
  { year: '1994', label: 'Rilancio nazionale', icon: Trophy },
  { year: '2026', label: 'Sezione Canzone', icon: Music },
];

export default function Storia() {
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
        { scale: 1.05, y: '4vh', opacity: 0.85 },
        { scale: 1, y: 0, opacity: 1, ease: 'none' },
        0
      );

      scrollTl.fromTo(
        '.storia-label',
        { y: 14, opacity: 0 },
        { y: 0, opacity: 1, ease: 'power2.out' },
        0.02
      );

      scrollTl.fromTo(
        '.storia-title',
        { y: 18, opacity: 0 },
        { y: 0, opacity: 1, ease: 'power2.out' },
        0.03
      );

      scrollTl.fromTo(
        '.storia-body',
        { y: 14, opacity: 0 },
        { y: 0, opacity: 1, ease: 'power2.out' },
        0.05
      );

      scrollTl.fromTo(
        '.storia-milestone',
        { y: 20, opacity: 0, scale: 0.98 },
        { y: 0, opacity: 1, scale: 1, stagger: 0.01, ease: 'power2.out' },
        0.07
      );

      scrollTl.fromTo(
        watermarkRef.current,
        { x: '-6vw', opacity: 0 },
        { x: 0, opacity: 0.1, ease: 'power2.out' },
        0
      );

      scrollTl.fromTo(
        '.storia-text-group',
        { x: 0, opacity: 1 },
        { x: '-16vw', opacity: 0, ease: 'power2.in' },
        0.8
      );

      scrollTl.fromTo(
        '.storia-milestones-row',
        { y: 0, opacity: 1 },
        { y: '10vh', opacity: 0, ease: 'power2.in' },
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
      id="storia"
      className="section-pinned relative z-20"
    >
      {/* Background Image */}
      <div ref={bgRef} className="absolute inset-0 w-full h-full">
        <img
          src="/storia_countryside.jpg"
          alt="Tuscan countryside"
          className="w-full h-full object-cover"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 gradient-overlay-right" />
      </div>

      {/* Watermark */}
      <div
        ref={watermarkRef}
        className="absolute left-[-10vw] top-[6vh] watermark text-[clamp(80px,14vw,200px)]"
        style={{ opacity: 0 }}
      >
        MCMLXXXIV
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-center px-8 md:px-12 lg:px-[7vw] pt-24 lg:pt-0">
        <div className="storia-text-group max-w-full lg:max-w-[40vw]">
          {/* Label */}
          <div className="storia-label label-micro mb-4" style={{ opacity: 0 }}>
            STORIA
          </div>

          {/* Title */}
          <h2
            className="storia-title font-serif text-[clamp(32px,3.2vw,52px)] text-[#F3EFE9] leading-[1.15] text-shadow-soft"
            style={{ opacity: 0 }}
          >
            Un patrimonio di parole, radicato nelle colline di Candia.
          </h2>

          {/* Body */}
          <p
            className="storia-body font-sans text-[clamp(14px,1.1vw,16px)] text-[#F3EFE9]/75 mt-8 leading-relaxed max-w-full lg:max-w-[34vw]"
            style={{ opacity: 0 }}
          >
            Il <strong className="text-[#F3EFE9]">Premio Letterario "Candia Il Gioiello"</strong> nasce nel 1983 per volontà del professor <strong className="text-[#F3EFE9]">Mario Cagetti</strong> con l'intento di valorizzare la tradizione vinicola e culturale delle colline di Candia, a Massa. In quarant'anni è cresciuto fino a raccogliere autori da ogni regione italiana, diventando un appuntamento nazionale: poesia, dialetto, musica — e una comunità che continua a crescere.
          </p>
        </div>

        {/* Timeline */}
        <div className="storia-milestones-row flex flex-wrap gap-6 lg:gap-[3.2vw] mt-16">
          {milestones.map((milestone) => {
            const Icon = milestone.icon;
            return (
              <div
                key={milestone.year}
                className="storia-milestone flex flex-col items-center"
                style={{ opacity: 0 }}
              >
                <div className="w-14 h-14 rounded-full bg-[#2B1E1A]/60 backdrop-blur-sm border border-[#C49A6C]/30 flex items-center justify-center mb-3">
                  <Icon size={22} className="text-[#C49A6C]" />
                </div>
                <span className="font-serif text-2xl lg:text-3xl text-[#C49A6C]">
                  {milestone.year}
                </span>
                <span className="font-sans text-sm text-[#F3EFE9]/70 mt-1">
                  {milestone.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
