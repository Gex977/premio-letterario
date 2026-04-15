import { useEffect, useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FileText, PenLine, Clock, Sparkles } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const watermarkRef = useRef<HTMLDivElement>(null);

  // Load animation (on mount)
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      // Background fade in + scale
      tl.fromTo(
        bgRef.current,
        { opacity: 0, scale: 1.06 },
        { opacity: 1, scale: 1, duration: 1.2 }
      );

      // Content staggered reveal
      tl.fromTo(
        '.hero-eyebrow',
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: 0.6 },
        '-=0.7'
      );

      tl.fromTo(
        '.hero-title',
        { opacity: 0, y: 28 },
        { opacity: 1, y: 0, duration: 0.8 },
        '-=0.4'
      );

      tl.fromTo(
        '.hero-subtitle',
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: 0.7 },
        '-=0.5'
      );

      tl.fromTo(
        '.hero-ctas',
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: 0.6 },
        '-=0.4'
      );

      tl.fromTo(
        '.hero-deadline',
        { opacity: 0 },
        { opacity: 1, duration: 0.5 },
        '-=0.3'
      );

      tl.fromTo(
        '.hero-badge',
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, duration: 0.5 },
        '-=0.4'
      );

      tl.fromTo(
        watermarkRef.current,
        { opacity: 0, x: -30 },
        { opacity: 0.1, x: 0, duration: 1 },
        '-=1'
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Scroll-driven animation (pinned)
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
          onLeaveBack: () => {
            gsap.set('.hero-content', { opacity: 1, x: 0 });
            gsap.set(bgRef.current, { scale: 1, y: 0 });
            gsap.set(watermarkRef.current, { opacity: 0.1, x: 0 });
          },
        },
      });

      scrollTl.fromTo(
        '.hero-content',
        { x: 0, opacity: 1 },
        { x: '-18vw', opacity: 0, ease: 'power2.in' },
        0.8
      );

      scrollTl.fromTo(
        bgRef.current,
        { scale: 1, y: 0 },
        { scale: 1.08, y: '-6vh', ease: 'none' },
        0.8
      );

      scrollTl.fromTo(
        watermarkRef.current,
        { x: 0, opacity: 0.1 },
        { x: '10vw', opacity: 0, ease: 'power2.in' },
        0.8
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={sectionRef}
      className="section-pinned relative z-10"
    >
      {/* Background Image */}
      <div
        ref={bgRef}
        className="absolute inset-0 w-full h-full"
        style={{ opacity: 0 }}
      >
        <img
          src="/hero_vineyard.jpg"
          alt="Tuscan vineyard"
          className="w-full h-full object-cover"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 gradient-overlay-left" />
      </div>

      {/* Watermark */}
      <div
        ref={watermarkRef}
        className="absolute right-[-6vw] top-[10vh] watermark"
        style={{ opacity: 0 }}
      >
        XLII
      </div>

      {/* Content */}
      <div
        ref={contentRef}
        className="hero-content relative z-10 h-full flex flex-col justify-center px-8 md:px-12 lg:px-[7vw]"
      >
        {/* Eyebrow */}
        <div className="hero-eyebrow label-micro mb-4" style={{ opacity: 0 }}>
          PREMIO LETTERARIO NAZIONALE · MASSA, TOSCANA
        </div>

        {/* Title */}
        <h1
          className="hero-title font-serif text-[clamp(44px,5vw,76px)] text-[#F3EFE9] leading-[1.1] max-w-full lg:max-w-[46vw] text-shadow-soft"
          style={{ opacity: 0 }}
        >
          Candia Il Gioiello
        </h1>

        {/* Subtitle */}
        <p
          className="hero-subtitle font-sans text-[clamp(16px,1.3vw,20px)] text-[#F3EFE9]/80 mt-6 max-w-full lg:max-w-[38vw] leading-relaxed"
          style={{ opacity: 0 }}
        >
          Poesia, territorio e musica — dal 1984, la voce letteraria della Toscana apuana.
        </p>

        {/* CTAs */}
        <div
          className="hero-ctas flex flex-wrap gap-4 mt-10"
          style={{ opacity: 0 }}
        >
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              alert('Il bando PDF sarà disponibile a breve');
            }}
            className="btn-secondary"
          >
            <FileText size={18} className="mr-2" />
            Scarica il Bando
          </a>
          <button
            onClick={() => scrollToSection('#partecipa')}
            className="btn-primary"
          >
            <PenLine size={18} className="mr-2" />
            Iscriviti Ora
          </button>
        </div>

        {/* Deadline chip — enhanced */}
        <div
          className="hero-deadline inline-flex items-center gap-3 mt-8 px-5 py-3 rounded-full bg-[#2B1E1A]/60 backdrop-blur-sm border border-[#C49A6C]/40 w-fit shadow-lg shadow-black/10"
          style={{ opacity: 0 }}
        >
          <span className="relative flex items-center justify-center">
            <span className="absolute w-8 h-8 rounded-full bg-[#C49A6C]/20 animate-ping" />
            <Clock size={18} className="relative text-[#C49A6C]" />
          </span>
          <span className="font-sans text-sm font-medium text-[#F3EFE9]">
            Scadenza iscrizioni: <strong className="text-[#C49A6C]">15 settembre 2026</strong>
          </span>
        </div>

        {/* Badge — enhanced */}
        <div
          className="hero-badge absolute top-[26vh] right-[8vw] hidden lg:flex items-center gap-3 px-5 py-2 rounded-full bg-[#2B1E1A]/65 backdrop-blur-md border border-[#C49A6C]/35 shadow-lg shadow-[#C49A6C]/10"
          style={{ opacity: 0 }}
        >
          <div className="relative">
            <Sparkles size={18} className="text-[#C49A6C]" />
          </div>
          <div className="flex flex-col">
            <span className="font-serif text-lg text-[#F3EFE9] leading-tight">
              42ª Edizione
            </span>
            <span className="font-sans text-[10px] text-[#C49A6C] uppercase tracking-widest">
              Anno 2026
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
