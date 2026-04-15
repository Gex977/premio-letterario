import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Feather, Leaf, Music, Disc } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const sections = [
  {
    badge: 'Sezione A',
    title: 'Poesia in Lingua',
    icon: Feather,
    image: '/thumb_poesia.jpg',
    description: 'Opere a tema libero. Aperta a tutti, senza limiti di età.',
    prizes: [
      '1° classificato: €300 + targa + pranzo omaggio',
      '2° classificato: €200 + targa',
      '3° classificato: €100 + targa',
      'Premio della Critica: targa e diploma',
      '10 premi "Eccellenza" + 10 premi "Speciale Papillon"',
    ],
    rotation: -1,
  },
  {
    badge: 'Sezione B',
    title: 'Uva e Vino',
    icon: Leaf,
    image: '/thumb_uva.jpg',
    description: 'Componimenti in dialetto — corredati da traduzione italiana — o in lingua, dedicati alla cultura dell\'uva, del vino e alle tradizioni del territorio apuano.',
    prizes: [
      'Prodotti tipici del territorio o oggettistica in marmo di Carrara per i primi 5 classificati',
      'Il 1° classificato riceve anche un pranzo omaggio',
    ],
    rotation: 1,
  },
  {
    badge: 'Sezione C',
    title: 'Testo per Canzone',
    icon: Music,
    image: '/thumb_canzone.jpg',
    description: 'Il tuo testo diventa un brano. Il vincitore riceve la produzione professionale completa — arrangiamento, registrazione e presentazione ufficiale del CD durante la cerimonia.',
    prizes: ['Produzione musicale professionale inclusa', 'CD presentato in cerimonia'],
    rotation: -1,
    isNew: true,
  },
];

export default function Sezioni() {
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo(
        '.sezioni-header',
        { y: 28, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.sezioni-header',
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Cards animation
      sections.forEach((_, index) => {
        gsap.fromTo(
          `.sezione-card-${index}`,
          { y: 60 + index * 20, opacity: 0, rotate: sections[index].rotation },
          {
            y: 0,
            opacity: 1,
            rotate: 0,
            duration: 0.9,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: `.sezione-card-${index}`,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="sezioni"
      className="relative z-40 bg-[#2B1E1A] py-20 lg:py-28"
    >
      {/* Subtle vignette */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse at center, transparent 0%, rgba(43,30,26,0.4) 100%)'
      }} />

      <div className="relative z-10 px-8 md:px-12 lg:px-[7vw]">
        {/* Header */}
        <div className="sezioni-header max-w-full lg:max-w-[46vw] mb-12 lg:mb-16" style={{ opacity: 0 }}>
          <div className="label-micro mb-4">IL CONCORSO</div>
          <h2 className="font-serif text-[clamp(32px,3.2vw,52px)] text-[#F3EFE9] leading-[1.15]">
            Tre sezioni, una sola anima: il territorio.
          </h2>
          <p className="font-sans text-[clamp(14px,1.1vw,16px)] text-[#F3EFE9]/70 mt-6 leading-relaxed">
            Il bando 2026 si articola in tre sezioni aperte a tutti gli autori italiani, senza limiti di età. Ogni autore può presentare un massimo di <strong className="text-[#F3EFE9]">due opere per sezione</strong> (max 60 versi). La quota di partecipazione è di <strong className="text-[#F3EFE9]">€20,00 per sezione</strong>.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {sections.map((sezione, index) => {
            const Icon = sezione.icon;
            return (
              <div
                key={sezione.badge}
                className={`sezione-card-${index} card-elegant group`}
                style={{ opacity: 0 }}
              >
                {/* Image */}
                <div className="relative h-48 lg:h-56 overflow-hidden">
                  <img
                    src={sezione.image}
                    alt={sezione.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#2B1E1A] to-transparent opacity-60" />
                  
                  {/* Badge */}
                  <div className="absolute top-4 left-4 flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full bg-[#2B1E1A]/80 backdrop-blur-sm border border-[#C49A6C]/30 font-sans text-xs text-[#C49A6C]">
                      {sezione.badge}
                    </span>
                    {sezione.isNew && (
                      <span className="px-3 py-1 rounded-full bg-[#C49A6C] font-sans text-xs text-[#2B1E1A] font-semibold animate-pulse">
                        NOVITÀ 2026
                      </span>
                    )}
                  </div>

                  {/* Icon */}
                  <div className="absolute bottom-4 right-4 w-12 h-12 rounded-full bg-[#2B1E1A]/60 backdrop-blur-sm border border-[#C49A6C]/30 flex items-center justify-center">
                    <Icon size={22} className="text-[#C49A6C]" />
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="font-serif text-2xl text-[#F3EFE9] mb-3">
                    {sezione.title}
                  </h3>
                  <p className="font-sans text-sm text-[#F3EFE9]/70 leading-relaxed mb-5">
                    {sezione.description}
                  </p>

                  {/* Prizes */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 mb-3">
                      <Disc size={16} className="text-[#C49A6C]" />
                      <span className="font-sans text-xs text-[#C49A6C] uppercase tracking-wider">
                        Premi
                      </span>
                    </div>
                    {sezione.prizes.map((prize, i) => (
                      <div
                        key={i}
                        className="flex items-start gap-2"
                      >
                        <span className="w-1 h-1 rounded-full bg-[#C49A6C] mt-2 flex-shrink-0" />
                        <span className="font-sans text-sm text-[#F3EFE9]/80">
                          {prize}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
