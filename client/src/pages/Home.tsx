import { useState, useMemo } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import CategorySection from "@/components/CategorySection";
import FloatingCart from "@/components/FloatingCart";
import FloatingActions from "@/components/FloatingActions";
import HamburgerMenu from "@/components/HamburgerMenu";
import { PRODUCTS_DATA, CATEGORIES } from "@/const";

/**
 * Página principal del catálogo de accesorios para celulares
 * 
 * Diseño: Analógico - Pizarrón Escolar
 * Enfoque: Mobile-first con Flexbox
 * - Paleta: Beige, marrón, colores cálidos
 * - Tipografía: Roboto (fuente oficial de Material Design)
 * - Dark mode soportado
 * - Precios en pesos argentinos (ARS)
 * - Carrito de compras funcional
 * - Integración con WhatsApp
 */
export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<Set<string>>(
    new Set() // Vacío inicialmente - sin categorías seleccionadas
  );
  const [showAvailableOnly, setShowAvailableOnly] = useState(false);

  // Scroll-linked hero parallax
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 500], [0, 80]);
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0]);

  // Filtrar productos según búsqueda y categorías
  const filteredProducts = useMemo(() => {
    const filtered: Record<string, typeof PRODUCTS_DATA[keyof typeof PRODUCTS_DATA]> = {};

    Object.entries(PRODUCTS_DATA).forEach(([category, products]) => {
      // Si no hay categorías seleccionadas, mostrar todas
      if (selectedCategories.size > 0 && !selectedCategories.has(category)) return;

      const categoryProducts = products.filter((product) => {
        const matchesSearch = product.name
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
        const matchesAvailability = !showAvailableOnly || product.status === "Disponible";
        return matchesSearch && matchesAvailability;
      });

      if (categoryProducts.length > 0) {
        filtered[category] = categoryProducts;
      }
    });

    return filtered;
  }, [searchTerm, selectedCategories, showAvailableOnly]);

  // Toggle categoría
  const toggleCategory = (category: string) => {
    const newSelected = new Set(selectedCategories);
    if (newSelected.has(category)) {
      newSelected.delete(category);
    } else {
      newSelected.add(category);
    }
    setSelectedCategories(newSelected);
  };

  // Reset filtros
  const resetFilters = () => {
    setSearchTerm("");
    setSelectedCategories(new Set()); // Vacío - mostrar todas
    setShowAvailableOnly(false);
  };

  const hasActiveFilters =
    searchTerm !== "" ||
    selectedCategories.size > 0 || // Cambio: ahora tener categorías seleccionadas es un filtro activo
    showAvailableOnly;

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-black">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[200] focus:px-4 focus:py-2 focus:bg-black focus:text-white focus:rounded focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-white"
      >
        Saltar al contenido principal
      </a>

      {/* Header - Navbar con glassmorphism */}
      <header 
        className="sticky top-0 bg-white/60 dark:bg-black/60 backdrop-blur-md z-50 shadow-[0_4px_24px_rgba(0,0,0,0.06)] dark:shadow-[0_4px_24px_rgba(0,0,0,0.3)] transition-all duration-300"
        style={{
          WebkitBackdropFilter: 'blur(12px)'
        }}
      >
        <nav
          aria-label="Navegación principal"
          className="container py-1.5 sm:py-2"
        >
          <div className="flex flex-row items-center justify-end gap-0 min-w-0">
            <HamburgerMenu
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              selectedCategories={selectedCategories}
              toggleCategory={toggleCategory}
            />
          </div>
        </nav>
      </header>

      {/* Hero Section — Editorial Tech */}
      <motion.section
        className="relative w-full min-h-screen flex items-start bg-white dark:bg-black overflow-hidden"
        style={{ y: heroY, opacity: heroOpacity }}
      >
        {/* Subtle background grain */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.03] dark:opacity-[0.06] bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJmIj48ZmVUdXJidWxlbmNlIHR5cGU9ImZyYWN0YWxOb2lzZSIgYmFzZUZyZXF1ZW5jeT0iLjc0IiBudW1PY3RhdmVzPSIzIiAvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbHRlcj0idXJsKCNmKSIgb3BhY2l0eT0iMCIgLz48L3N2Zz4=')]" />

        <div className="container px-6 md:px-16 pt-14 pb-8 md:pt-16 md:pb-12">
          <motion.div
            className="max-w-5xl"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: {
                transition: { staggerChildren: 0.18, delayChildren: 0.15 },
              },
            }}
          >
            {/* Eyebrow */}
            <motion.p
              variants={{
                hidden: { opacity: 0, y: 20, filter: "blur(6px)" },
                visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] } },
              }}
              className="text-xs sm:text-sm font-semibold tracking-[0.25em] uppercase text-neutral-400 dark:text-neutral-500 mb-6 sm:mb-10"
            >
              Hoco · Accesorios Premium
            </motion.p>

            {/* Main heading — oversized, editorial */}
            <h1 className="text-[clamp(3rem,16vw,8rem)] font-bold text-black dark:text-white leading-[0.82] tracking-[-0.06em] -ml-[0.04em]">
              <motion.span
                variants={{
                  hidden: { opacity: 0, y: 60, filter: "blur(12px)" },
                  visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } },
                }}
                className="block"
              >
                Accesorios
              </motion.span>
              <motion.span
                variants={{
                  hidden: { opacity: 0, y: 60, filter: "blur(12px)" },
                  visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } },
                }}
                className="block text-neutral-500 dark:text-neutral-400"
              >
                de calidad
              </motion.span>
              <motion.span
                variants={{
                  hidden: { opacity: 0, y: 60, filter: "blur(12px)" },
                  visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } },
                }}
                className="block"
              >
                para tu tienda
              </motion.span>
            </h1>

            {/* Description */}
            <motion.p
              variants={{
                hidden: { opacity: 0, y: 30, filter: "blur(6px)" },
                visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] } },
              }}
              className="text-base sm:text-lg md:text-xl text-neutral-500 dark:text-neutral-400 max-w-lg mt-8 sm:mt-10 leading-relaxed"
            >
              Cables y auriculares de la marca{" "}
              <strong className="font-semibold text-neutral-900 dark:text-neutral-100">
                HOCO
              </strong>
              . Envíos a todo Mar del Plata y el país.
            </motion.p>

            {/* Features */}
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] } },
              }}
              className="flex flex-row flex-wrap items-center gap-5 sm:gap-7 mt-10 sm:mt-12"
            >
              <div className="flex items-center gap-2 text-sm sm:text-base text-neutral-600 dark:text-neutral-400">
                <span className="text-amber-600 dark:text-amber-400 text-base sm:text-lg" aria-hidden="true">✓</span>
                Entrega Rápida
              </div>
              <div className="flex items-center gap-2 text-sm sm:text-base text-neutral-600 dark:text-neutral-400">
                <span className="text-amber-600 dark:text-amber-400 text-base sm:text-lg" aria-hidden="true">✓</span>
                Precios Mayoristas
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Decorative line — subtle */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-neutral-200/60 via-neutral-300/30 to-transparent dark:from-neutral-800/60 dark:via-neutral-700/30" />
      </motion.section>

      {/* Main Content */}
      <main id="main-content" className="container py-4 sm:py-8 flex-grow bg-white dark:bg-black">
        {/* Filtros - Material Design - Mobile First */}
        <div className="mb-6 sm:mb-8 pb-4 sm:pb-6">
          <div className="flex flex-col items-stretch justify-start gap-3 sm:gap-4">
            {/* Filtros de categoría - Mejorados */}
            <div className="min-w-0">
              <div className="flex flex-row items-center justify-between gap-2 mb-3 sm:mb-4 min-w-0">
                <h2 className="text-xl sm:text-2xl font-semibold text-black dark:text-white min-w-0">
                  Filtrar por Categoría
                </h2>
                <span className="text-base text-gray-600 dark:text-white font-medium shrink-0">
                  {selectedCategories.size === 0 ? "Todas" : `${selectedCategories.size} de ${CATEGORIES.length}`}
                </span>
              </div>
              <div className="flex flex-row flex-wrap items-center justify-start gap-2">
                {CATEGORIES.map((category) => {
                  const categoryCount = PRODUCTS_DATA[category as keyof typeof PRODUCTS_DATA]?.length || 0;
                  const isSelected = selectedCategories.has(category);
                  return (
                    <Badge
                      key={category}
                      variant={isSelected ? "default" : "outline"}
                      className={`cursor-pointer transition-all font-medium text-xs sm:text-sm px-3 sm:px-4 py-1.5 sm:py-2 ${
                        isSelected
                          ? "bg-neutral-900 text-white shadow-md"
                          : "bg-card text-foreground border-2 border-border"
                      }`}
                      onClick={() => toggleCategory(category)}
                      title={`${categoryCount} productos`}
                    >
                      {category}
                      <span className="ml-1.5 text-xs font-semibold opacity-75">({categoryCount})</span>
                    </Badge>
                  );
                })}
              </div>
            </div>

            {/* Filtro de disponibilidad y acciones */}
            <div className="flex flex-row flex-wrap items-center justify-start gap-2 sm:gap-3 pt-2 sm:pt-3">
              <Button
                variant={showAvailableOnly ? "default" : "outline"}
                size="sm"
                onClick={() => setShowAvailableOnly(!showAvailableOnly)}
                className={`w-full sm:w-auto min-h-[48px] font-semibold text-base transition-all ${
                  showAvailableOnly
                    ? "bg-primary text-primary-foreground shadow-md"
                    : "bg-card text-foreground border-2 border-border"
                }`}
              >
                {showAvailableOnly ? "✓" : "○"} Solo disponibles
              </Button>

              {hasActiveFilters && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={resetFilters}
                  className="w-full sm:w-auto min-h-[48px] text-gray-600 dark:text-gray-400 font-semibold text-base transition-colors"
                >
                  <X className="w-4 h-4 sm:w-5 sm:h-5 mr-1" />
                  Limpiar filtros
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Productos */}
        {Object.keys(filteredProducts).length > 0 ? (
          <div>
            {Object.entries(filteredProducts).map(([category, products], index) => (
              <CategorySection
                key={category}
                category={category}
                products={products}
                isFirstSection={index === 0}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-8 sm:py-12 text-center">
            <p className="text-gray-600 dark:text-white mb-3 sm:mb-4 font-normal text-lg min-w-0">
              No se encontraron productos con los filtros seleccionados.
            </p>
            <Button variant="outline" onClick={resetFilters} className="w-full sm:w-auto min-h-[48px] font-medium text-base text-black dark:text-white border-black dark:border-white">
              Limpiar filtros
            </Button>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer
        role="contentinfo"
        className="relative bg-white dark:bg-black mt-8 sm:mt-12 border-t border-gray-200/90 dark:border-gray-800/90 shadow-[0_-6px_20px_rgba(0,0,0,0.05)] dark:shadow-[0_-6px_24px_rgba(0,0,0,0.45)] text-left"
      >
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gray-300/60 to-transparent dark:via-gray-600/50"
          aria-hidden
        />

        {/* Hero image moved to footer — sin border-radius, ancho controlado */}
        <div className="w-full flex justify-center px-6 md:px-16 py-4">
          <img
            src="/escaparate.webp"
            alt="Escaparate de accesorios HOCO"
            width={1080}
            height={1278}
            className="w-full max-w-4xl h-auto object-contain"
            loading="lazy"
            decoding="async"
          />
        </div>

        <div className="container py-6 sm:py-8 pr-20 sm:pr-24">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 text-left items-start justify-items-stretch">
            
            {/* Contacto */}
            <div className="min-w-0">
              <h3 className="font-semibold text-xl sm:text-2xl mb-3 text-black dark:text-white">
                Contacto
              </h3>
              <div className="flex flex-col items-start justify-start gap-2 text-base">
                <p className="text-black dark:text-white">
                  Tel: <a href="tel:+5491124063009" className="hover:text-amber-600 transition-colors font-medium">+54 9 11 2406 3009</a>
                </p>
                <p className="text-black dark:text-white">
                  Mar del Plata, Buenos Aires, Argentina
                </p>
              </div>
            </div>

            {/* Métodos de Pago */}
            <div className="min-w-0">
              <h3 className="font-semibold text-xl sm:text-2xl mb-3 text-black dark:text-white">
                Métodos de Pago
              </h3>
              <div className="flex flex-col items-start justify-start gap-2 text-base text-black dark:text-white">
                <p>Efectivo</p>
                <p>Mercado Pago</p>
              </div>
            </div>

            {/* Entrega */}
            <div className="min-w-0">
              <h3 className="font-semibold text-xl sm:text-2xl mb-3 text-black dark:text-white">
                Opciones de Entrega
              </h3>
              <div className="flex flex-col items-start justify-start gap-2 text-base text-black dark:text-white">
                <p>Envío a Domicilio (MDP)</p>
                <p>Envío a Todo el País</p>
                <p className="text-xs mt-3 text-gray-600 dark:text-white">Consultar costos de envío</p>
              </div>
            </div>
          </div>

          {/* Copyright e información legal */}
          <div className="mt-6 pt-4 border-t border-gray-100 dark:border-gray-900 text-left shadow-[inset_0_1px_0_rgba(255,255,255,0.6)] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
            <p className="text-xs text-gray-600 dark:text-gray-400">
              © 2026 Cargadores Hoco EAC
            </p>
            <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
              Mar del Plata, Argentina
            </p>
            <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
              CUIT: 20-19025451-9
            </p>
            <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
              Envíos a todo el país
            </p>
            <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
              Defensa del Consumidor · 0800-666-1518
            </p>
          </div>
        </div>
      </footer>

      {/* Componentes flotantes */}
      <FloatingCart />
      <FloatingActions />
    </div>
  );
}
