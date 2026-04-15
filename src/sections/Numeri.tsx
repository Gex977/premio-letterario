import { useRef, useLayoutEffect, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { BookOpen, Users, MapPin, Trophy } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { number: 42, suffix: '', label: 'Edizioni', icon: BookOpen },
  { number: 500, suffix: '+', label: 'Autori premiati', icon: Users },
  { number: 20, suffix: '+', label: 'Regioni italiane', icon: MapPin },
  { number: 3, suffix: '', label: 'Sezioni in gara', icon: Trophy },
];

function AnimatedCounter({ target, suffix, isVisible }: { target: number; suffix: string; isVisible: boolean }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isVisible) return;
    let frame: number;
    const duration = 2000;
    const start = performance.now();

    const animate = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) {
        frame = requestAnimationFrame(animate);
      }
    };

    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [isVisible, target]);

  return <>{count}{suffix}</>;
}

export default function Numeri() {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const watermarkRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Fade-up entrance animation triggered on scroll
      gsap.fromTo(
        '.numeri-content > *',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
            onEnter: () => setIsVisible(true),
          },
        }
      );

      gsap.fromTo(
        '.numeri-stat',
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.numeri-stats-container',
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="numeri"
      className="relative min-h-screen z-20 overflow-hidden bg-[#2B1E1A]"
    >
      {/* Background Image */}
      <div ref={bgRef} className="absolute inset-0 w-full h-full">
        <img
          src="/storia_countryside.jpg"
          alt="Vineyard"
          className="w-full h-full object-cover"
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-[#2B1E1A]/65" />
      </div>

      {/* Watermark */}
      <div
        ref={watermarkRef}
        className="absolute right-[-2vw] top-[10vh] watermark overflow-hidden"
        style={{ opacity: 0 }}
      >
        XLII
      </div>

      {/* Content */}
      <div className="relative z-10 w-full min-h-screen flex flex-col px-8 md:px-12 lg:px-[7vw] py-24 lg:py-[12vh]">
        <div className="numeri-content mb-16 lg:mb-24">
          <div className="label-micro text-[#C49A6C] mb-4">IL PREMIO IN CIFRE</div>
          <h2 className="font-serif text-[clamp(32px,3.2vw,52px)] text-[#F3EFE9] leading-[1.15] max-w-[15ch]">
            Numeri che raccontano una storia.
          </h2>
        </div>

        {/* Stats Grid — glassmorphism cards */}
        <div className="numeri-stats-container grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 max-w-4xl lg:max-w-none mx-auto lg:mx-0">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className="numeri-stat text-center p-6 lg:p-8 rounded-2xl bg-[#2B1E1A]/50 backdrop-blur-md border border-[#C49A6C]/20 hover:border-[#C49A6C]/40 transition-all duration-500 hover:shadow-lg hover:shadow-[#C49A6C]/5"
                style={{ opacity: 0 }}
              >
                <div className="w-14 h-14 mx-auto rounded-full bg-[#C49A6C]/10 border border-[#C49A6C]/25 flex items-center justify-center mb-5">
                  <Icon size={26} className="text-[#C49A6C]" />
                </div>
                <div className="font-serif text-[clamp(40px,4.5vw,72px)] text-[#C49A6C] leading-none">
                  <AnimatedCounter target={stat.number} suffix={stat.suffix} isVisible={isVisible} />
                </div>
                <div className="font-sans text-xs text-[#F3EFE9]/70 mt-3 uppercase tracking-wider">
                  {stat.label}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
