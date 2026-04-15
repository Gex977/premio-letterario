import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { label: 'Storia', href: '#storia' },
  { label: 'Sezioni', href: '#sezioni' },
  { label: 'Giuria', href: '#giuria' },
  { label: 'Premiazione', href: '#cerimonia' },
  { label: 'Iscriviti', href: '#partecipa' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark'); // 'dark' = dark background + light text, 'light' = light background + dark text

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 100;
      setIsScrolled(scrolled);
      
      // Dynamic Navbar Background Detection
      if (scrolled) {
        const sections = document.querySelectorAll('section');
        let currentSectionId = '';
        
        sections.forEach((section) => {
          const rect = section.getBoundingClientRect();
          // If the section overlaps the navbar area (e.g. y=40)
          if (rect.top <= 80 && rect.bottom >= 80) {
            currentSectionId = section.id;
          }
        });
        
        // If we are over the "Partecipa" section (which has a light bg #F3EFE9)
        if (currentSectionId === 'partecipa') {
          // Section chiara -> Navbar Scura (#2B1E1A)
          setTheme('dark'); 
        } else {
          // Sezione scura -> Navbar Chiara (#F3EFE9)
          setTheme('light');
        }
      } else {
        setTheme('dark'); // default on top (Hero is dark)
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Run once on mount
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isMobileMenuOpen]);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-[9998] transition-all duration-500 ${
          isScrolled
            ? theme === 'light' 
              ? 'bg-[#F3EFE9]/95 backdrop-blur-md py-3 shadow-lg shadow-black/5'
              : 'bg-[#2B1E1A]/95 backdrop-blur-md py-3 shadow-lg shadow-black/10'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="w-full px-6 lg:px-[4vw] flex items-center justify-between">
          {/* Logo */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className={`font-serif text-xl lg:text-2xl tracking-tight transition-colors duration-300 hover:text-[#C49A6C] ${
              isScrolled && theme === 'light' ? 'text-[#2B1E1A]' : 'text-[#F3EFE9]'
            }`}
          >
            Candia Il Gioiello
          </a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollToSection(link.href)}
                className={`relative font-sans text-sm font-medium tracking-wide px-4 py-2 rounded-full transition-all duration-300 group ${
                  isScrolled && theme === 'light'
                    ? 'text-[#2B1E1A]/90 hover:text-[#2B1E1A] hover:bg-[#2B1E1A]/5'
                    : 'text-[#F3EFE9]/90 hover:text-[#F3EFE9] hover:bg-[#F3EFE9]/8'
                }`}
              >
                {link.label}
                <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-[#C49A6C] rounded-full transition-all duration-300 group-hover:w-5" />
              </button>
            ))}
            <button
              onClick={() => scrollToSection('#partecipa')}
              className="btn-primary text-sm ml-4"
            >
              Iscriviti al Bando
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`lg:hidden relative w-10 h-10 flex items-center justify-center rounded-full border transition-all duration-300 hover:border-[#C49A6C]/50 hover:text-[#C49A6C] ${
              isScrolled && theme === 'light'
                ? 'border-[#2B1E1A]/20 text-[#2B1E1A]'
                : 'border-[#F3EFE9]/20 text-[#F3EFE9]'
            }`}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-[9997] transition-all duration-500 lg:hidden ${
          isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
        }`}
      >
        {/* Background */}
        <div className="absolute inset-0 bg-[#2B1E1A]/98 backdrop-blur-xl" />

        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-[#C49A6C]/5 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-[#C49A6C]/3 blur-3xl" />

        {/* Content */}
        <div className="relative z-10 flex flex-col h-full pt-24 pb-10 px-8">
          {/* Menu label */}
          <div className="font-sans text-xs font-semibold uppercase tracking-[0.25em] text-[#C49A6C]/60 mb-8">
            Menu
          </div>

          {/* Navigation links */}
          <div className="flex-1 flex flex-col justify-center -mt-16">
            <div className="space-y-1">
              {navLinks.map((link, index) => (
                <div key={link.href}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className={`group w-full text-left py-4 px-4 rounded-2xl transition-all duration-400 hover:bg-[#F3EFE9]/5 ${
                      isMobileMenuOpen ? 'animate-in' : ''
                    }`}
                    style={{
                      animationDelay: `${150 + index * 80}ms`,
                      opacity: isMobileMenuOpen ? 1 : 0,
                      transform: isMobileMenuOpen ? 'translateY(0)' : 'translateY(12px)',
                      transition: `opacity 0.4s ease ${150 + index * 80}ms, transform 0.4s ease ${150 + index * 80}ms`,
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-serif text-3xl text-[#F3EFE9] group-hover:text-[#C49A6C] transition-colors duration-300">
                        {link.label}
                      </span>
                      <span className="w-0 group-hover:w-8 h-[1px] bg-[#C49A6C] transition-all duration-300" />
                    </div>
                  </button>
                  {index < navLinks.length - 1 && (
                    <div className="h-px bg-[#F3EFE9]/6 mx-4" />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* CTA Button */}
          <div
            style={{
              opacity: isMobileMenuOpen ? 1 : 0,
              transform: isMobileMenuOpen ? 'translateY(0)' : 'translateY(16px)',
              transition: 'opacity 0.5s ease 0.6s, transform 0.5s ease 0.6s',
            }}
          >
            <button
              onClick={() => scrollToSection('#partecipa')}
              className="btn-primary w-full text-base py-4"
            >
              Iscriviti al Bando
            </button>
            <p className="text-center font-sans text-xs text-[#F3EFE9]/30 mt-4">
              Scadenza: 15 settembre 2026
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
