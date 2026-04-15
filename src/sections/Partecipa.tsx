import { useState, useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FileText, CreditCard, Send, Calendar, Check, Send as SendIcon, Building2, Lock } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    icon: FileText,
    title: 'Prepara le opere',
    description: 'Ogni opera va inviata in doppia copia: una anonima (solo titolo e testo) e una con nome, cognome, indirizzo, telefono ed email.',
  },
  {
    icon: CreditCard,
    title: 'Versa la quota',
    description: '€20,00 per sezione — Bonifico IBAN IT96S3608105138239149439160 intestato a Giovanna Lorieri · A mano al Ristorante Il Gioiello o al Dancing Papillon · Raccomandata A/R con quota inclusa.',
  },
  {
    icon: Send,
    title: 'Invia le opere',
    description: 'Via email a info@clubculturalegioiello.it (Word o PDF) · per posta a Via San Lorenzo 12, Massa 54100 (MS) — fa fede il timbro postale · a mano presso il Ristorante Il Gioiello o il Dancing Papillon.',
  },
  {
    icon: Calendar,
    title: 'Scadenza',
    description: '15 settembre 2026 — Non perdere la scadenza del bando!',
    highlight: true,
  },
];

const sezioni = [
  { id: 'A', label: 'Sezione A – Poesia', price: 20 },
  { id: 'B', label: 'Sezione B – Uva e Vino', price: 20 },
  { id: 'C', label: 'Sezione C – Testo per Canzone', price: 20 },
];

const paymentMethods = [
  { id: 'paypal', label: 'PayPal' },
  { id: 'bonifico', label: 'Bonifico Bancario' },
  { id: 'contanti', label: 'Contanti' },
];

// PayPal SVG logo component
function PayPalLogo({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944.901C5.026.382 5.474 0 5.998 0h7.46c2.57 0 4.578.543 5.69 1.81 1.01 1.15 1.304 2.42 1.012 4.287-.023.143-.047.288-.077.437-.983 5.05-4.349 6.797-8.647 6.797H9.603c-.564 0-1.04.408-1.13.964L7.076 21.337z"/>
      <path d="M18.429 7.534c-.018.137-.04.274-.065.417-.91 4.674-4.025 6.286-8.004 6.286H8.567c-.487 0-.899.355-.975.838l-1.2 7.607a.546.546 0 0 0 .54.632h3.794c.425 0 .786-.31.853-.729l.035-.183.677-4.289.043-.237a.858.858 0 0 1 .849-.729h.534c3.461 0 6.169-1.406 6.962-5.473.33-1.7.159-3.117-.714-4.14z" opacity="0.7"/>
    </svg>
  );
}

export default function Partecipa() {
  const sectionRef = useRef<HTMLElement>(null);
  const [formData, setFormData] = useState({
    nome: '',
    cognome: '',
    email: '',
    telefono: '',
    indirizzo: '',
    sezioni: [] as string[],
    pagamento: 'paypal',
    titoli: '',
    gdpr: false,
    autenticita: false,
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const total = formData.sezioni.length * 20;

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo(
        '.partecipa-header',
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.partecipa-header',
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Steps animation
      gsap.fromTo(
        '.partecipa-step',
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 0.7,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.partecipa-steps',
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Form animation
      gsap.fromTo(
        '.partecipa-form',
        { x: '10vw', opacity: 0, scale: 0.98 },
        {
          x: 0,
          opacity: 1,
          scale: 1,
          duration: 0.9,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.partecipa-form',
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const handleSezioneChange = (id: string) => {
    setFormData((prev) => ({
      ...prev,
      sezioni: prev.sezioni.includes(id)
        ? prev.sezioni.filter((s) => s !== id)
        : [...prev.sezioni, id],
    }));
  };

  const handleSubmit = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!formData.nome || !formData.cognome || !formData.email || !formData.gdpr || !formData.autenticita || formData.sezioni.length === 0) {
      alert('Per favore compila tutti i campi obbligatori, seleziona almeno una sezione e accetta le dichiarazioni.');
      return;
    }
    setIsSubmitted(true);
  };

  const isPaypal = formData.pagamento === 'paypal';

  // Shared input class — no beige bg, reduced border-radius to 5px
  const inputClass = "w-full px-4 py-2.5 rounded-[5px] bg-white border border-[#2B1E1A]/15 text-[#2B1E1A] font-sans text-sm focus:outline-none focus:border-[#C49A6C] focus:ring-1 focus:ring-[#C49A6C]/30 transition-all duration-200";

  return (
    <section
      ref={sectionRef}
      id="partecipa"
      className="relative z-[80] bg-[#F3EFE9] py-20 lg:py-28"
    >
      <div className="px-8 md:px-12 lg:px-[7vw]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left side - Steps */}
          <div>
            <div className="partecipa-header mb-12" style={{ opacity: 0 }}>
              <div className="label-micro text-[#2B1E1A]/60 mb-4">COME PARTECIPARE</div>
              <h2 className="font-serif text-[clamp(32px,3.2vw,52px)] text-[#2B1E1A] leading-[1.15]">
                Partecipare è semplice.
              </h2>
              <p className="font-sans text-[clamp(14px,1.1vw,16px)] text-[#2B1E1A]/60 mt-4">
                Segui questi quattro passi per iscriverti al concorso.
              </p>
            </div>

            {/* Steps */}
            <div className="partecipa-steps space-y-6">
              {steps.map((step, index) => {
                const Icon = step.icon;
                return (
                  <div
                    key={step.title}
                    className={`partecipa-step flex gap-4 p-5 rounded-[5px] ${
                      step.highlight
                        ? 'bg-[#C49A6C]/10 border border-[#C49A6C]/30'
                        : 'bg-white/60 border border-[#2B1E1A]/10'
                    }`}
                    style={{ opacity: 0 }}
                  >
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${
                      step.highlight ? 'bg-[#C49A6C]' : 'bg-[#2B1E1A]/10'
                    }`}>
                      <Icon size={22} className={step.highlight ? 'text-white' : 'text-[#2B1E1A]'} />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-sans text-xs font-semibold text-[#C49A6C]">
                          Step {index + 1}
                        </span>
                      </div>
                      <h3 className="font-serif text-xl text-[#2B1E1A] mb-2">
                        {step.title}
                      </h3>
                      <p className="font-sans text-sm text-[#2B1E1A]/60 leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right side - Form */}
          <div
            className="partecipa-form rounded-2xl overflow-hidden bg-white shadow-xl shadow-[#2B1E1A]/8 border border-[#2B1E1A]/8"
            style={{ opacity: 0 }}
          >
            <div className="p-6 lg:p-8">
              {!isSubmitted ? (
                <>
                  <h3 className="font-serif text-2xl text-[#2B1E1A] mb-2">
                    Modulo di Iscrizione
                  </h3>
                  <p className="font-sans text-sm text-[#2B1E1A]/60 mb-6">
                    Compila il modulo per iscriverti online. Seleziona le sezioni a cui partecipare: il totale si aggiorna automaticamente.
                  </p>

                  <form>
                    {/* Form fields */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block font-sans text-xs text-[#2B1E1A]/60 mb-1.5 font-medium">
                          Nome *
                        </label>
                        <input
                          type="text"
                          value={formData.nome}
                          onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                          className={inputClass}
                        />
                      </div>
                      <div>
                        <label className="block font-sans text-xs text-[#2B1E1A]/60 mb-1.5 font-medium">
                          Cognome *
                        </label>
                        <input
                          type="text"
                          value={formData.cognome}
                          onChange={(e) => setFormData({ ...formData, cognome: e.target.value })}
                          className={inputClass}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block font-sans text-xs text-[#2B1E1A]/60 mb-1.5 font-medium">
                          Email *
                        </label>
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className={inputClass}
                        />
                      </div>
                      <div>
                        <label className="block font-sans text-xs text-[#2B1E1A]/60 mb-1.5 font-medium">
                          Telefono
                        </label>
                        <input
                          type="tel"
                          value={formData.telefono}
                          onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                          className={inputClass}
                        />
                      </div>
                    </div>

                    <div className="mb-4">
                      <label className="block font-sans text-xs text-[#2B1E1A]/60 mb-1.5 font-medium">
                        Indirizzo (via, città, CAP)
                      </label>
                      <input
                        type="text"
                        value={formData.indirizzo}
                        onChange={(e) => setFormData({ ...formData, indirizzo: e.target.value })}
                        className={inputClass}
                      />
                    </div>

                    {/* Sezioni */}
                    <div className="mb-4">
                      <label className="block font-sans text-xs text-[#2B1E1A]/60 mb-2 font-medium">
                        Seleziona le sezioni *
                      </label>
                      <div className="space-y-2">
                        {sezioni.map((sezione) => (
                          <label
                            key={sezione.id}
                            className="flex items-center gap-3 p-3 rounded-[5px] bg-white border border-[#2B1E1A]/10 cursor-pointer hover:border-[#C49A6C]/50 transition-colors"
                          >
                            <input
                              type="checkbox"
                              checked={formData.sezioni.includes(sezione.id)}
                              onChange={() => handleSezioneChange(sezione.id)}
                              className="w-5 h-5 rounded-[3px] border-[#2B1E1A]/30 text-[#C49A6C] focus:ring-[#C49A6C]"
                            />
                            <span className="flex-1 font-sans text-sm text-[#2B1E1A]">
                              {sezione.label}
                            </span>
                            <span className="font-sans text-sm text-[#C49A6C] font-medium">
                              +€{sezione.price},00
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Titoli opere */}
                    <div className="mb-6">
                      <label className="block font-sans text-xs text-[#2B1E1A]/60 mb-1.5 font-medium">
                        Titolo/i delle opere
                      </label>
                      <textarea
                        value={formData.titoli}
                        onChange={(e) => setFormData({ ...formData, titoli: e.target.value })}
                        rows={3}
                        className={`${inputClass} resize-none`}
                      />
                    </div>

                    {/* Total (Redesigned) */}
                    <div className="relative overflow-hidden flex items-center justify-between p-6 rounded-[5px] bg-[#8B8858] text-white shadow-lg shadow-[#8B8858]/20 mb-6 border border-[#7A7849]">
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/10" />
                      <div className="relative z-10 font-sans">
                        <span className="block text-[11px] text-white/80 uppercase tracking-widest font-semibold mb-1">Riepilogo</span>
                        <span className="block text-[15px] font-medium">Totale da versare</span>
                      </div>
                      <div className="relative z-10 font-serif text-[34px] font-medium tracking-tight">
                        €{total},00
                      </div>
                    </div>

                    {/* Payment method (Tabs) */}
                    <div className="mb-4">
                      <label className="block font-sans text-xs text-[#2B1E1A]/60 mb-2 font-medium">
                        Metodo di pagamento
                      </label>
                      <div className="flex p-1 bg-white border border-[#2B1E1A]/10 rounded-[5px]">
                        {paymentMethods.map(method => {
                          const isSelected = formData.pagamento === method.id;
                          let activeClass = 'text-[#2B1E1A]/60 hover:text-[#2B1E1A] hover:bg-[#F3EFE9]/50';
                          if (isSelected) {
                            if (method.id === 'paypal') activeClass = 'bg-[#0070BA] text-white shadow-sm';
                            if (method.id === 'bonifico') activeClass = 'bg-white text-[#2B1E1A] border-2 border-[#2B1E1A] shadow-sm';
                            if (method.id === 'contanti') activeClass = 'bg-[#8B8858] text-white shadow-sm';
                          }
                          return (
                            <button
                              key={method.id}
                              type="button"
                              onClick={() => setFormData({ ...formData, pagamento: method.id })}
                              className={`flex-1 py-1.5 lg:py-2 text-[12px] lg:text-[13px] font-sans font-medium rounded-[3px] transition-all duration-200 ${activeClass}`}
                            >
                              {method.label}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Payment info (only shown if Bonifico is selected) */}
                    {formData.pagamento === 'bonifico' && (
                      <div className="p-4 rounded-[5px] bg-white border border-[#2B1E1A]/15 mb-6 shadow-sm">
                        <div className="flex items-center gap-2 mb-2">
                          <Building2 size={16} className="text-[#333]" />
                          <span className="font-sans text-xs text-[#333] font-medium">Coordinate Bancarie:</span>
                        </div>
                        <p className="font-sans text-xs text-[#333] font-mono leading-relaxed">
                          IBAN IT96S3608105138239149439160<br />
                          Intestato a: Giovanna Lorieri<br />
                          Causale: "Iscrizione Premio Letterario [Nome Cognome]"
                        </p>
                      </div>
                    )}

                    {/* Checkboxes */}
                    <div className="space-y-2 mb-8 mt-2">
                      <label className="flex items-start gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.gdpr}
                          onChange={(e) => setFormData({ ...formData, gdpr: e.target.checked })}
                          className="w-5 h-5 mt-0.5 rounded-[3px] border-[#2B1E1A]/30 text-[#C49A6C] focus:ring-[#C49A6C]"
                        />
                        <span className="font-sans text-xs text-[#2B1E1A]/70">
                          Acconsento al trattamento dei dati personali (GDPR) *
                        </span>
                      </label>
                      <label className="flex items-start gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.autenticita}
                          onChange={(e) => setFormData({ ...formData, autenticita: e.target.checked })}
                          className="w-5 h-5 mt-0.5 rounded-[3px] border-[#2B1E1A]/30 text-[#C49A6C] focus:ring-[#C49A6C]"
                        />
                        <span className="font-sans text-xs text-[#2B1E1A]/70">
                          Dichiaro che le opere sono di mia esclusiva produzione *
                        </span>
                      </label>
                    </div>

                    {/* Submit Button — changes based on payment method */}
                    {isPaypal && (
                      <div>
                        <button
                          onClick={handleSubmit}
                          className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-[5px] font-sans text-sm font-semibold transition-all duration-300 hover:brightness-110 hover:shadow-lg"
                          style={{ backgroundColor: '#0070BA', color: '#FFFFFF' }}
                        >
                          <PayPalLogo className="w-5 h-5" />
                          Paga con PayPal
                        </button>
                        <div className="flex items-start gap-2 mt-3 px-1">
                          <Lock size={12} className="text-[#2B1E1A]/40 mt-0.5 flex-shrink-0" />
                          <p className="font-sans text-[11px] text-[#2B1E1A]/50 leading-relaxed">
                            Verrai reindirizzato alla pagina di pagamento sicuro PayPal per completare la transazione.
                          </p>
                        </div>
                      </div>
                    )}

                    {formData.pagamento === 'bonifico' && (
                      <button
                        onClick={handleSubmit}
                        className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-[5px] font-sans text-sm font-semibold transition-all duration-300 shadow-md bg-[#2B1E1A] text-white hover:bg-black"
                      >
                        <Building2 size={18} />
                        Invia e Mostra Codice IBAN
                      </button>
                    )}

                    {formData.pagamento === 'contanti' && (
                      <button
                        onClick={handleSubmit}
                        className="btn-primary w-full !rounded-[5px] py-3.5"
                      >
                        <SendIcon size={18} className="mr-2" />
                        Invia Iscrizione
                      </button>
                    )}
                  </form>
                </>
              ) : (
                /* Success message */
                <div className="text-center py-8">
                  <div className="w-16 h-16 mx-auto rounded-full bg-[#C49A6C]/20 flex items-center justify-center mb-6">
                    <Check size={32} className="text-[#C49A6C]" />
                  </div>
                  <h3 className="font-serif text-2xl text-[#2B1E1A] mb-3">
                    Iscrizione inviata!
                  </h3>
                  <p className="font-sans text-sm text-[#2B1E1A]/60 mb-6">
                    Grazie per la tua iscrizione. Riceverai a breve una conferma via email con le istruzioni per completare il pagamento (se applicabile).
                  </p>
                  <div className="p-4 rounded-[5px] bg-[#F8F6F3] text-left">
                    <p className="font-sans text-xs text-[#2B1E1A]/60 mb-2">
                      <strong className="text-[#2B1E1A]">Prossimi passi:</strong>
                    </p>
                    <ul className="space-y-1">
                      <li className="flex items-start gap-2">
                        <span className="w-1 h-1 rounded-full bg-[#C49A6C] mt-1.5" />
                        <span className="font-sans text-xs text-[#2B1E1A]/70">
                          Controlla la tua email per la conferma
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-1 h-1 rounded-full bg-[#C49A6C] mt-1.5" />
                        <span className="font-sans text-xs text-[#2B1E1A]/70">
                          Invia le tue opere entro il 15 settembre 2026
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
