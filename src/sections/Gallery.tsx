import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const galleryImages = [
  { src: '/gallery_01.jpg', caption: 'Cerimonia di premiazione 2023', size: 'large' },
  { src: '/gallery_02.jpg', caption: 'Momenti di lettura', size: 'tall' },
  { src: '/gallery_03.jpg', caption: 'Il territorio apuano', size: 'medium' },
  { src: '/gallery_04.jpg', caption: 'Arte e cultura', size: 'medium' },
  { src: '/gallery_05.jpg', caption: 'Convivio letterario', size: 'tall' },
  { src: '/gallery_06.jpg', caption: 'Pubblico attento', size: 'large' },
];

export default function Gallery() {
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo(
        '.gallery-header',
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.gallery-header',
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Gallery items animation
      gsap.fromTo(
        '.gallery-item',
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.06,
          duration: 0.7,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.gallery-grid',
            start: 'top 80%',
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
      className="relative z-[90] bg-[#2B1E1A] py-20 lg:py-28"
    >
      <div className="px-8 md:px-12 lg:px-[7vw]">
        {/* Header */}
        <div className="gallery-header max-w-full lg:max-w-[44vw] mb-12" style={{ opacity: 0 }}>
          <h2 className="font-serif text-[clamp(32px,3.2vw,52px)] text-[#F3EFE9] leading-[1.15]">
            Edizioni passate
          </h2>
          <p className="font-sans text-[clamp(14px,1.1vw,16px)] text-[#F3EFE9]/70 mt-4 leading-relaxed">
            Scorri le immagini delle edizioni passate: momenti di cultura, premiazioni e il territorio apuano che fa da sfondo a questo storico concorso letterario.
          </p>
        </div>

        {/* Desktop: structured 2-row grid / Mobile: simple stack */}
        <div className="gallery-grid hidden lg:grid grid-cols-4 grid-rows-2 gap-5 h-[600px]">
          {/* Row 1 col 1-2: large landscape */}
          <div className="gallery-item group relative overflow-hidden rounded-2xl col-span-2 row-span-1" style={{ opacity: 0 }}>
            <div className="relative w-full h-full">
              <img src={galleryImages[0].src} alt={galleryImages[0].caption} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#2B1E1A]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                <p className="font-sans text-sm text-[#F3EFE9]">{galleryImages[0].caption}</p>
              </div>
            </div>
          </div>

          {/* Row 1-2 col 3: tall portrait */}
          <div className="gallery-item group relative overflow-hidden rounded-2xl col-span-1 row-span-2" style={{ opacity: 0 }}>
            <div className="relative w-full h-full">
              <img src={galleryImages[1].src} alt={galleryImages[1].caption} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#2B1E1A]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                <p className="font-sans text-sm text-[#F3EFE9]">{galleryImages[1].caption}</p>
              </div>
            </div>
          </div>

          {/* Row 1 col 4: small */}
          <div className="gallery-item group relative overflow-hidden rounded-2xl col-span-1 row-span-1" style={{ opacity: 0 }}>
            <div className="relative w-full h-full">
              <img src={galleryImages[2].src} alt={galleryImages[2].caption} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#2B1E1A]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                <p className="font-sans text-sm text-[#F3EFE9]">{galleryImages[2].caption}</p>
              </div>
            </div>
          </div>

          {/* Row 2 col 1: small */}
          <div className="gallery-item group relative overflow-hidden rounded-2xl col-span-1 row-span-1" style={{ opacity: 0 }}>
            <div className="relative w-full h-full">
              <img src={galleryImages[3].src} alt={galleryImages[3].caption} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#2B1E1A]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                <p className="font-sans text-sm text-[#F3EFE9]">{galleryImages[3].caption}</p>
              </div>
            </div>
          </div>

          {/* Row 2 col 2: small (col 3 is already taken by portrait spanning 2 rows) */}
          <div className="gallery-item group relative overflow-hidden rounded-2xl col-span-1 row-span-1" style={{ opacity: 0 }}>
            <div className="relative w-full h-full">
              <img src={galleryImages[4].src} alt={galleryImages[4].caption} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#2B1E1A]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                <p className="font-sans text-sm text-[#F3EFE9]">{galleryImages[4].caption}</p>
              </div>
            </div>
          </div>

          {/* Row 2 col 4: small */}
          <div className="gallery-item group relative overflow-hidden rounded-2xl col-span-1 row-span-1" style={{ opacity: 0 }}>
            <div className="relative w-full h-full">
              <img src={galleryImages[5].src} alt={galleryImages[5].caption} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#2B1E1A]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                <p className="font-sans text-sm text-[#F3EFE9]">{galleryImages[5].caption}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile: simple 2-column grid */}
        <div className="gallery-grid grid grid-cols-2 gap-3 lg:hidden">
          {galleryImages.map((image, index) => (
            <div
              key={index}
              className={`gallery-item group relative overflow-hidden rounded-xl ${
                index === 1 || index === 4 ? 'row-span-2' : ''
              }`}
              style={{ opacity: 0 }}
            >
              <div className={`relative ${index === 1 || index === 4 ? 'h-full min-h-[300px]' : 'h-40'}`}>
                <img
                  src={image.src}
                  alt={image.caption}
                  className="w-full h-full object-cover"
                />
                {/* Always-visible caption on mobile */}
                <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-[#2B1E1A]/80 to-transparent">
                  <p className="font-sans text-xs text-[#F3EFE9]/90">{image.caption}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
