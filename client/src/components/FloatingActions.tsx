import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";

/**
 * Botones flotantes: WhatsApp y Volver Arriba
 */
export default function FloatingActions() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="fixed bottom-24 right-6 z-40 flex flex-col gap-3">
      {/* Botón WhatsApp con logo oficial */}
      <a
        href="https://wa.me/5491124063009?text=Hola,%20me%20interesa%20conocer%20más%20sobre%20tus%20productos."
        target="_blank"
        rel="noopener noreferrer"
        className="bg-[#25D366] hover:bg-[#20BA5A] text-white rounded-full min-h-[48px] min-w-[48px] shadow-lg hover:shadow-xl transition-all hover:scale-110 flex items-center justify-center focus-visible:ring-2 focus-visible:ring-offset-2"
        aria-label="Contactar por WhatsApp"
      >
        <svg 
          viewBox="0 0 32 32" 
          className="w-8 h-8 fill-current"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M16 0c-8.837 0-16 7.163-16 16 0 2.825 0.737 5.607 2.137 8.048l-2.137 7.952 7.933-2.127c2.42 1.37 5.173 2.127 8.067 2.127 8.837 0 16-7.163 16-16s-7.163-16-16-16zM16 29.467c-2.482 0-4.908-0.646-7.07-1.87l-0.507-0.292-4.713 1.262 1.262-4.669-0.292-0.508c-1.207-2.100-1.847-4.507-1.847-6.924 0-7.435 6.050-13.485 13.485-13.485s13.485 6.050 13.485 13.485c0 7.435-6.050 13.485-13.485 13.485zM21.960 18.828c-0.305-0.153-1.802-0.890-2.082-0.992s-0.483-0.153-0.686 0.153c-0.203 0.305-0.788 0.992-0.966 1.195s-0.356 0.230-0.661 0.077c-0.305-0.153-1.288-0.475-2.454-1.513-0.908-0.810-1.520-1.809-1.698-2.114s-0.018-0.470 0.134-0.622c0.138-0.137 0.305-0.356 0.458-0.534s0.203-0.305 0.305-0.509c0.102-0.203 0.051-0.381-0.025-0.534s-0.686-1.653-0.940-2.260c-0.248-0.593-0.499-0.513-0.686-0.522-0.178-0.008-0.381-0.010-0.584-0.010s-0.534 0.076-0.813 0.381c-0.280 0.305-1.067 1.043-1.067 2.543s1.093 2.951 1.245 3.154c0.153 0.203 2.109 3.376 5.222 4.661 3.114 1.285 3.114 0.856 3.677 0.804s1.802-0.737 2.056-1.448c0.254-0.712 0.254-1.321 0.178-1.448s-0.280-0.203-0.584-0.356z"/>
        </svg>
      </a>

      {/* Botón Volver Arriba */}
      {showScrollTop && (
        <Button
          onClick={scrollToTop}
          className="bg-primary text-primary-foreground rounded-full min-h-[48px] min-w-[48px] p-3 shadow-lg hover:shadow-xl transition-all hover:scale-110 flex items-center justify-center animate-in fade-in"
          aria-label="Volver al inicio"
        >
          <ArrowUp className="w-6 h-6" />
        </Button>
      )}
    </div>
  );
}
