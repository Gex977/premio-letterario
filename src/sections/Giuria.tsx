import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Info, Crown } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const juryMembers = [
  { name: 'Giovanna Lorieri', role: 'Presidente', image: '/gallery_01.jpg', isPresidente: true },
  { name: 'Egizia Malatesta', role: 'Membro di Giuria', image: '/gallery_02.jpg' },
  { name: 'Franco Tortorella', role: 'Membro di Giuria', image: '/gallery_03.jpg' },
  { name: 'Angela Fruzzetti', role: 'Membro di Giuria', image: '/gallery_04.jpg' },
  { name: 'Stefania Ratti', role: 'Membro di Giuria', image: '/gallery_05.jpg' },
];

export default function Giuria() {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Simple fade-up entrance animation triggered on scroll
      gsap.fromTo(
        '.giuria-content > *',
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
          },
        }
      );

      gsap.fromTo(
        '.giuria-card',
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.giuria-cards-container',
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
      id="giuria"
      className="relative min-h-screen z-20 overflow-hidden bg-[#2B1E1A]"
    >
      {/* Background Image */}
      <div ref={bgRef} className="absolute inset-0 w-full h-full">
        <img
          src="/giuria_table.jpg"
          alt="Giuria"
          className="w-full h-full object-cover"
        />
        {/* Gradient overlay — stronger for better readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#2B1E1A]/80 via-[#2B1E1A]/50 to-[#2B1E1A]/70" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full min-h-screen flex flex-col px-8 md:px-12 lg:px-[7vw] py-24 lg:py-[12vh]">
        {/* Header — enriched */}
        <div className="giuria-content mb-16 lg:mb-20">
          <h2 className="font-serif text-[clamp(32px,3.2vw,52px)] text-[#F3EFE9] leading-[1.15] text-shadow-soft">
            La Giuria
          </h2>
          <p className="font-sans text-[clamp(16px,1.3vw,20px)] text-[#F3EFE9]/75 mt-4 max-w-full lg:max-w-[40vw]">
            Cinque voci per leggere il territorio.
          </p>
          <p className="font-sans text-[clamp(13px,1vw,15px)] text-[#F3EFE9]/55 mt-3 max-w-full lg:max-w-[44vw] leading-relaxed">
            Una commissione di esperti selezionata per garantire imparzialità e competenza nella valutazione delle opere. Ogni membro porta la propria sensibilità letteraria e il legame con il territorio apuano.
          </p>
          {/* Gold divider */}
          <div className="h-[2px] w-20 bg-gradient-to-r from-[#C49A6C] to-transparent mt-5" />
        </div>

        {/* Jury Cards */}
        <div className="giuria-cards-container flex-1 flex flex-col justify-center">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 lg:gap-[2vw] w-full">
            {juryMembers.map((member) => (
              <div
                key={member.name}
                className={`giuria-card group rounded-2xl overflow-hidden backdrop-blur-md border transition-all duration-500 hover:border-[#C49A6C]/40 hover:shadow-lg hover:shadow-[#C49A6C]/5 ${
                  member.isPresidente
                    ? 'bg-[#2B1E1A]/70 border-[#C49A6C]/30'
                    : 'bg-[#2B1E1A]/55 border-[#C49A6C]/15'
                }`}
                style={{ opacity: 0 }}
              >
                {/* Image */}
                <div className="relative h-36 lg:h-40 overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#2B1E1A] via-[#2B1E1A]/30 to-transparent" />
                  {/* Presidente crown badge */}
                  {member.isPresidente && (
                    <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-[#C49A6C]/90 flex items-center justify-center shadow-lg">
                      <Crown size={14} className="text-[#2B1E1A]" />
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-4 text-center">
                  <h3 className="font-serif text-lg text-[#F3EFE9] leading-tight">
                    {member.name}
                  </h3>
                  <p className={`font-sans text-xs mt-1.5 ${
                    member.isPresidente ? 'text-[#C49A6C] font-medium' : 'text-[#C49A6C]/80'
                  }`}>
                    {member.role}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Note — responsive-friendly */}
        <div className="absolute bottom-[3vh] left-1/2 -translate-x-1/2 w-[calc(100%-4rem)] md:w-auto flex items-center gap-2 px-5 py-3 rounded-2xl lg:rounded-full bg-[#2B1E1A]/70 backdrop-blur-sm border border-[#C49A6C]/15">
          <Info size={14} className="text-[#C49A6C] flex-shrink-0" />
          <span className="font-sans text-xs text-[#F3EFE9]/70 leading-relaxed">
            I nomi completi dei componenti saranno resi noti durante la Cerimonia di Premiazione.
          </span>
        </div>
      </div>
    </section>
  );
}
