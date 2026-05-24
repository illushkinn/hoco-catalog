import { Phone } from "lucide-react";

/**
 * Componente de badges de confianza e información legal
 * Incluye: identificación del vendedor, certificación HOCO/EAC, y defensa del consumidor
 */
export default function TrustBadges() {
  return (
    <div className="flex flex-wrap items-center justify-start gap-x-3 gap-y-2 text-left max-w-2xl">
      {/* Información fiscal y comercial condensada */}
      <div className="w-full space-y-1">
        <p className="text-sm text-gray-600 dark:text-white font-medium">
          CUIT: 20-19025451-9 · Hoco Original
        </p>
        <p className="text-sm text-gray-600 dark:text-white">
          Certificación EAC · Envíos a todo el país
        </p>
      </div>

      {/* Defensa del Consumidor */}
      <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-white">
        <Phone className="w-3 h-3" />
        <span>Defensa del Consumidor · 0800-666-1518</span>
      </div>
    </div>
  );
}
