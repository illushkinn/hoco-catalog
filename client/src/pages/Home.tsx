import { useState, useMemo } from "react";
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
      {/* Header - Navbar con glassmorphism */}
      <header 
        className="sticky top-0 bg-white/60 dark:bg-black/60 backdrop-blur-md z-50 shadow-[0_4px_24px_rgba(0,0,0,0.06)] dark:shadow-[0_4px_24px_rgba(0,0,0,0.3)] transition-all duration-300"
        style={{
          WebkitBackdropFilter: 'blur(12px)'
        }}
      >
        <div className="container py-1.5 sm:py-2">
          <div className="flex items-center justify-end">
            <HamburgerMenu
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              selectedCategories={selectedCategories}
              toggleCategory={toggleCategory}
            />
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative w-full pb-[25vh] bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 dark:from-gray-900 dark:via-gray-950 dark:to-black md:bg-gradient-to-b md:from-white md:via-gray-100 md:to-gray-200 md:dark:from-gray-900 md:dark:via-black md:dark:to-black">
        <div className="container pt-0 pb-4 sm:pb-5 md:pb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 items-start">
            
            {/* Texto Hero */}
            <div className="text-center md:text-left space-y-3 sm:space-y-4 md:self-center py-6 sm:py-8 md:py-0">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-black dark:text-white leading-tight">
                Accesorios de calidad
                <br />
                para tu tienda
              </h2>
              <div className="space-y-1">
                <p className="text-sm sm:text-base text-black dark:text-white max-w-lg mx-auto md:mx-0">
                  Cables y auriculares de la marca <span className="font-semibold text-black dark:text-black bg-yellow-200 dark:bg-yellow-600 px-1">HOCO</span>.
                </p>
                <p className="text-sm sm:text-base text-black dark:text-white max-w-lg mx-auto md:mx-0">
                  Envíos a todo Mar del Plata y el país.
                </p>
              </div>
              <div className="flex flex-wrap gap-4 justify-center md:justify-start text-sm text-black dark:text-white">
                <div className="flex items-center gap-2">
                  <span className="text-amber-600 text-xl">✓</span>
                  <span>Entrega Rápida</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-amber-600 text-xl">✓</span>
                  <span>Precios Mayoristas</span>
                </div>
              </div>
            </div>

            {/* Imagen Hero */}
            <div className="relative max-w-[280px] sm:max-w-xs mx-auto md:max-w-sm mt-4 sm:mt-6 md:self-center md:mt-10">
              <div className="relative overflow-hidden rounded-[0.77em] shadow-2xl aspect-[1080/1278]">
                <img 
                  src="/escaparate.webp" 
                  alt="Accesorios para celular HOCO - Mar del Plata" 
                  width={1080}
                  height={1278}
                  className="w-full h-full object-cover"
                  loading="eager"
                  fetchPriority="high"
                  decoding="async"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main id="productos" className="container py-4 sm:py-8 flex-grow bg-white dark:bg-black">
        {/* Filtros - Material Design - Mobile First */}
        <div className="mb-6 sm:mb-8 pb-4 sm:pb-6">
          <div className="flex flex-col gap-3 sm:gap-4">
            {/* Filtros de categoría - Mejorados */}
            <div>
              <div className="flex items-center justify-between mb-3 sm:mb-4">
                <h3 className="text-sm sm:text-base font-semibold text-black dark:text-white">
                  Filtrar por Categoría
                </h3>
                <span className="text-xs sm:text-sm text-gray-600 dark:text-white font-medium">
                  {selectedCategories.size === 0 ? "Todas" : `${selectedCategories.size} de ${CATEGORIES.length}`}
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {CATEGORIES.map((category) => {
                  const categoryCount = PRODUCTS_DATA[category as keyof typeof PRODUCTS_DATA]?.length || 0;
                  const isSelected = selectedCategories.has(category);
                  return (
                    <Badge
                      key={category}
                      variant={isSelected ? "default" : "outline"}
                      className={`cursor-pointer transition-all font-medium text-xs sm:text-sm px-3 sm:px-4 py-1.5 sm:py-2 ${
                        isSelected
                          ? "bg-primary text-primary-foreground shadow-md"
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
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 pt-2 sm:pt-3">
              <Button
                variant={showAvailableOnly ? "default" : "outline"}
                size="sm"
                onClick={() => setShowAvailableOnly(!showAvailableOnly)}
                className={`font-semibold text-xs sm:text-sm transition-all ${
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
                  className="text-gray-600 dark:text-gray-400 font-semibold text-xs sm:text-sm transition-colors"
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
            {Object.entries(filteredProducts).map(([category, products]) => (
              <CategorySection
                key={category}
                category={category}
                products={products}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-8 sm:py-12">
            <p className="text-gray-600 dark:text-white mb-3 sm:mb-4 font-normal text-sm sm:text-base">
              No se encontraron productos con los filtros seleccionados.
            </p>
            <Button variant="outline" onClick={resetFilters} className="font-medium text-black dark:text-white border-black dark:border-white">
              Limpiar filtros
            </Button>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="relative bg-white dark:bg-black mt-8 sm:mt-12 border-t border-gray-200/90 dark:border-gray-800/90 shadow-[0_-6px_20px_rgba(0,0,0,0.05)] dark:shadow-[0_-6px_24px_rgba(0,0,0,0.45)]">
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gray-300/60 to-transparent dark:via-gray-600/50"
          aria-hidden
        />
        <div className="container py-6 sm:py-8 pr-20 sm:pr-24">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 text-center">
            
            {/* Contacto */}
            <div>
              <h3 className="font-semibold text-base sm:text-lg mb-3 text-black dark:text-white">
                Contacto
              </h3>
              <div className="space-y-2 text-sm">
                <p className="text-black dark:text-white">
                  Tel: <a href="tel:+5491124063009" className="hover:text-amber-600 transition-colors font-medium">+54 9 11 2406 3009</a>
                </p>
                <p className="text-black dark:text-white">
                  Mar del Plata, Buenos Aires, Argentina
                </p>
              </div>
            </div>

            {/* Métodos de Pago */}
            <div>
              <h3 className="font-semibold text-base sm:text-lg mb-3 text-black dark:text-white">
                Métodos de Pago
              </h3>
              <div className="space-y-2 text-sm text-black dark:text-white">
                <p>Efectivo</p>
                <p>Mercado Pago</p>
              </div>
            </div>

            {/* Entrega */}
            <div>
              <h3 className="font-semibold text-base sm:text-lg mb-3 text-black dark:text-white">
                Opciones de Entrega
              </h3>
              <div className="space-y-2 text-sm text-black dark:text-white">
                <p>Retiro en Local</p>
                <p>Envío a Domicilio (MDP)</p>
                <p>Envío a Todo el País</p>
                <p className="text-xs mt-3 text-gray-600 dark:text-white">Consultar costos de envío</p>
              </div>
            </div>
          </div>

          {/* Copyright e información legal */}
          <div className="mt-6 pt-4 border-t border-gray-100 dark:border-gray-900 text-center shadow-[inset_0_1px_0_rgba(255,255,255,0.6)] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
            <p className="text-xs text-gray-600 dark:text-gray-400">
              © 2026 Cargadores Hoco EAC - Mar del Plata, Argentina
            </p>
            <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
              CUIT: 20-19025451-9 · Hoco Original · Certificación EAC · Envíos a todo el país
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
