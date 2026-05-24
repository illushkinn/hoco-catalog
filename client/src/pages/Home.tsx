import { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, X, Moon, Sun } from "lucide-react";
import CategorySection from "@/components/CategorySection";
import FloatingCart from "@/components/FloatingCart";
import FloatingActions from "@/components/FloatingActions";
import HamburgerMenu from "@/components/HamburgerMenu";
import { PRODUCTS_DATA, CATEGORIES } from "@/const";
import TrustBadges from "@/components/TrustBadges";
import { useTheme } from "@/contexts/ThemeContext";

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
  const { theme, toggleTheme } = useTheme();
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
        className="border-b border-white/20 dark:border-white/10 sticky top-0 bg-white/60 dark:bg-black/60 backdrop-blur-md z-50 shadow-[0_4px_24px_rgba(0,0,0,0.06)] dark:shadow-[0_4px_24px_rgba(0,0,0,0.3)] transition-all duration-300"
        style={{
          WebkitBackdropFilter: 'blur(12px)'
        }}
      >        <div className="container py-3 sm:py-4">
          <div className="flex items-center justify-between gap-4">
            {/* Hamburger Menu */}
            <HamburgerMenu
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              selectedCategories={selectedCategories}
              toggleCategory={toggleCategory}
            />
            
            {/* Theme Toggle - Sin efectos hover */}
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleTheme}
              className="text-black dark:text-white flex-shrink-0 rounded-none ml-auto hover:bg-transparent hover:shadow-none hover:scale-100 hover:opacity-100"
            >
              {theme === "dark" ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative w-full bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 dark:from-gray-900 dark:via-gray-950 dark:to-black">
        <div className="container py-8 sm:py-12 md:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-center">
            
            {/* Texto Hero */}
            <div className="text-center md:text-left space-y-4 sm:space-y-6">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-black dark:text-white leading-tight">
                Accesorios de Calidad<br className="sm:hidden" /> para tu Tienda
              </h2>
              <div className="space-y-1">
                <p className="text-base sm:text-lg text-black dark:text-white max-w-xl mx-auto md:mx-0">
                  Cables y auriculares de la marca <span className="font-semibold text-black dark:text-black bg-yellow-200 dark:bg-yellow-600 px-1">HOCO</span>.
                </p>
                <p className="text-base sm:text-lg text-black dark:text-white max-w-xl mx-auto md:mx-0">
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
            <div className="relative max-w-md mx-auto md:max-w-lg">
              <div className="relative overflow-hidden shadow-2xl">
                <img 
                  src="/escaparate.png" 
                  alt="Accesorios para celular HOCO - Mar del Plata" 
                  className="w-full h-auto object-cover"
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
        {/* Hidden Search Input */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <Input
              id="search-input"
              placeholder="Buscar productos por nombre, marca, modelo..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 pr-4 py-3 bg-white dark:bg-gray-800 border-2 border-transparent focus:bg-white dark:focus:bg-gray-800 focus:ring-0 focus:border-amber-600 transition-all text-base font-medium"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>

        {/* Filtros - Material Design - Mobile First */}
        <div className="mb-6 sm:mb-8 pb-4 sm:pb-6 border-b border-border">
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
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 pt-2 sm:pt-3 border-t border-border">
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
      <footer className="border-t border-border bg-white dark:bg-black mt-8 sm:mt-12">
        <div className="container py-6 sm:py-8 pr-20 sm:pr-24">
          {/* Trust Badges y Legal Info */}
          <div className="mb-8 pb-6 border-b border-border">
            <TrustBadges />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            
            {/* Contacto */}
            <div className="text-left">
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
            <div className="text-left">
              <h3 className="font-semibold text-base sm:text-lg mb-3 text-black dark:text-white">
                Métodos de Pago
              </h3>
              <div className="space-y-2 text-sm text-black dark:text-white">
                <p>Efectivo</p>
                <p>Transferencia Bancaria</p>
                <p>Mercado Pago</p>
                <p>Tarjetas de Crédito/Débito</p>
              </div>
            </div>

            {/* Entrega */}
            <div className="text-left">
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

          {/* Copyright */}
          <div className="mt-6 pt-4 border-t border-border text-left">
            <p className="text-xs text-gray-600 dark:text-white">
              © 2026 Cargadores Hoco EAC - Mar del Plata, Argentina
            </p>
            <p className="text-xs text-gray-600 dark:text-white mt-1">
              Proveedor mayorista de accesorios tech
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
