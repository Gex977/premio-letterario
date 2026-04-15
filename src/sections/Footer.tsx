import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Phone, Mail, Globe, MapPin, Clock } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const contactInfo = [
  { icon: Phone, text: '058499075 – 3288878041', href: 'tel:058499075' },
  { icon: Mail, text: 'info@clubculturalegioiello.it', href: 'mailto:info@clubculturalegioiello.it' },
  { icon: Globe, text: 'www.clubculturalegioiello.it', href: 'https://www.clubculturalegioiello.it' },
  { icon: MapPin, text: 'Via San Lorenzo 12, Massa 54100 (MS)', href: '#' },
];

const patronage = [
  'Regione Toscana',
  'Comune di Massa',
  'Confimpresa Massa-Carrara',
];

export default function Footer() {
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.footer-content',
        { y: 18, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 90%',
            toggleActions: 'play none none reverse',
          },
        }
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
    <footer
      ref={sectionRef}
      className="relative z-[100] bg-[#2B1E1A] pt-16 lg:pt-24 pb-8"
    >
      {/* Bottom vignette */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center bottom, rgba(43,30,26,0.8) 0%, transparent 70%)'
        }}
      />

      <div className="footer-content relative z-10 px-6 lg:px-[7vw]" style={{ opacity: 0 }}>
        {/* Main footer content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-10 lg:gap-8 mb-16">
          {/* Logo & description */}
          <div className="lg:col-span-2">
            <h2 className="font-serif text-3xl text-[#F3EFE9] mb-3">
              Candia Il Gioiello
            </h2>
            <p className="font-sans text-sm text-[#F3EFE9]/60 mb-6">
              Premio Letterario dal 1984 · Massa, Toscana
            </p>
            
            {/* Patronage */}
            <div className="mb-6">
              <p className="font-sans text-xs text-[#F3EFE9]/40 uppercase tracking-wider mb-3">
                Con il patrocinio di
              </p>
              <div className="flex flex-wrap gap-3">
                {patronage.map((item) => (
                  <span
                    key={item}
                    className="px-3 py-1.5 rounded-full bg-[#F3EFE9]/5 border border-[#F3EFE9]/10 font-sans text-xs text-[#F3EFE9]/60"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Contact info */}
          <div>
            <h3 className="font-serif text-lg text-[#F3EFE9] mb-4">
              Contatti
            </h3>
            <div className="space-y-3">
              {contactInfo.map((item) => {
                const Icon = item.icon;
                return (
                  <a
                    key={item.text}
                    href={item.href}
                    className="flex items-start gap-3 group"
                  >
                    <Icon size={18} className="text-[#C49A6C] mt-0.5 flex-shrink-0" />
                    <span className="font-sans text-sm text-[#F3EFE9]/70 group-hover:text-[#F3EFE9] transition-colors">
                      {item.text}
                    </span>
                  </a>
                );
              })}
            </div>
          </div>

          {/* CTA */}
          <div>
            <h3 className="font-serif text-lg text-[#F3EFE9] mb-4">
              Non perdere la scadenza
            </h3>
            <div className="p-4 rounded-2xl bg-[#C49A6C]/10 border border-[#C49A6C]/30 mb-4">
              <div className="flex items-center gap-2 mb-2">
                <Clock size={18} className="text-[#C49A6C]" />
                <span className="font-sans text-sm text-[#C49A6C]">
                  15 settembre 2026
                </span>
              </div>
              <p className="font-sans text-xs text-[#F3EFE9]/60">
                Ultimo giorno per iscriversi al bando
              </p>
            </div>
            <button
              onClick={() => scrollToSection('#partecipa')}
              className="btn-primary w-full"
            >
              Iscriviti ora
            </button>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-[#F3EFE9]/10 mb-8" />

        {/* Bottom bar */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
          <p className="font-sans text-xs text-[#F3EFE9]/40 text-center lg:text-left">
            © 2026 Premio Letterario Candia Il Gioiello – Club Culturale Gioiello di Massa
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="font-sans text-xs text-[#F3EFE9]/40 hover:text-[#F3EFE9]/70 transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="font-sans text-xs text-[#F3EFE9]/40 hover:text-[#F3EFE9]/70 transition-colors">
              GDPR
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
