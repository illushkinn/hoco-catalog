import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { Menu, X, Search, Sun, Moon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CATEGORIES, PRODUCTS_DATA } from "@/const";
import { useTheme } from "@/contexts/ThemeContext";

interface HamburgerMenuProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedCategories: Set<string>;
  toggleCategory: (category: string) => void;
}

export default function HamburgerMenu({
  searchTerm,
  setSearchTerm,
  selectedCategories,
  toggleCategory,
}: HamburgerMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  // Bloquear scroll del body cuando el menú está abierto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    // Cleanup al desmontar
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <>
      {/* Hamburger Button - Sin hover */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-1.5"
        aria-label="Menú"
      >
        <Menu className="w-6 h-6 text-foreground" />
      </button>

      {/* Sidebar Overlay - Renderizado con Portal fuera del header */}
      {isOpen && createPortal(
        <>
          {/* Backdrop con blur reforzado */}
          <div 
            className="fixed inset-0 bg-black/50 backdrop-blur-md z-[100] transition-opacity"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Sidebar - Glassmorphism mejorado - Mitad de pantalla */}
          <div 
            className="fixed top-0 left-0 h-full w-full sm:w-1/2 bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl border-r border-white/30 dark:border-white/10 z-[100] shadow-[0_8px_32px_rgba(0,0,0,0.12)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.4)] flex flex-col"
            style={{
              WebkitBackdropFilter: 'blur(16px)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header - Sticky con glassmorphism mejorado */}
            <div 
              className="flex-shrink-0 p-6 border-b border-white/20 dark:border-white/10 sticky top-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md shadow-[0_4px_24px_rgba(0,0,0,0.06)] dark:shadow-[0_4px_24px_rgba(0,0,0,0.3)] z-10 transition-all duration-300"
              style={{
                WebkitBackdropFilter: 'blur(12px)'
              }}
            >
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-black dark:text-white">Menú</h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 transition-colors"
                  aria-label="Cerrar"
                >
                  <X className="w-6 h-6 text-black dark:text-white" />
                </button>
              </div>
            </div>

            {/* Contenido Scrolleable con scrollbar estilizado */}
            <div 
              className="flex-1 overflow-y-scroll px-6 py-6 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-thumb]:bg-gray-700 [&::-webkit-scrollbar-thumb]:rounded-[0.77em] [&::-webkit-scrollbar-thumb]:hover:bg-gray-400 dark:[&::-webkit-scrollbar-thumb]:hover:bg-gray-600"
              style={{
                overscrollBehavior: 'contain',
                WebkitOverflowScrolling: 'touch',
                minHeight: '0'
              }}
            >
              {/* Indicador de scroll superior - solo mobile */}
              <div className="md:hidden mb-4 flex justify-center">
                <div className="w-12 h-1 bg-gray-300 dark:bg-gray-700 rounded-[0.77em]"></div>
              </div>

              {/* Tema claro / oscuro */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold mb-3 text-black dark:text-white">Apariencia</h3>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={toggleTheme}
                  className="w-auto inline-flex items-center gap-2 px-3 py-2 text-sm rounded-[0.77em] border-2 font-medium text-black dark:text-white"
                >
                  {theme === "dark" ? (
                    <>
                      <Sun className="w-4 h-4 shrink-0" />
                      Modo claro
                    </>
                  ) : (
                    <>
                      <Moon className="w-4 h-4 shrink-0" />
                      Modo oscuro
                    </>
                  )}
                </Button>
              </div>

              {/* Search */}
              <div className="mb-8">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-600 w-5 h-5" />
                  <Input
                    placeholder="Buscar productos..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-12 pr-4 py-5 bg-gray-100 dark:bg-gray-800 border-2 border-transparent focus:bg-white dark:focus:bg-black focus:ring-0 focus:border-accent transition-all text-base font-medium text-black dark:text-white"
                  />
                </div>
              </div>

              {/* Categories */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold mb-6 text-black dark:text-white">Categorías</h3>
                <div className="flex flex-col gap-5">
                  {CATEGORIES.map((category) => {
                    const categoryCount = PRODUCTS_DATA[category as keyof typeof PRODUCTS_DATA]?.length || 0;
                    const isSelected = selectedCategories.has(category);
                    return (
                      <button
                        key={category}
                        onClick={() => {
                          toggleCategory(category);
                        }}
                        className={`flex items-center justify-between px-6 py-5 transition-all font-medium text-left rounded-[0.77em] touch-manipulation ${
                          isSelected
                            ? "bg-black dark:bg-white text-white dark:text-black"
                            : "bg-gray-100 dark:bg-gray-800 text-black dark:text-white"
                        }`}
                        style={{ minHeight: '60px' }}
                      >
                        <span className="text-base font-semibold">{category}</span>
                        <Badge 
                          variant={isSelected ? "secondary" : "outline"} 
                          className={`text-sm font-bold px-3 py-1 ${
                            isSelected 
                              ? "bg-white dark:bg-black text-black dark:text-white" 
                              : ""
                          }`}
                        >
                          {categoryCount}
                        </Badge>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Espacio extra para scroll cómodo - MUY IMPORTANTE */}
              <div className="h-40"></div>
              
              {/* Indicador visual de scroll - solo visible en mobile */}
              <div className="sticky bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-white dark:from-gray-900 to-transparent pointer-events-none md:hidden"></div>
            </div>

            {/* Footer Button - Sticky con glassmorphism mejorado */}
            <div 
              className="flex-shrink-0 p-6 border-t border-white/20 dark:border-white/10 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md shadow-[0_-4px_24px_rgba(0,0,0,0.06)] dark:shadow-[0_-4px_24px_rgba(0,0,0,0.3)] sticky bottom-0 transition-all duration-300"
              style={{
                WebkitBackdropFilter: 'blur(12px)'
              }}
            >
              <button
                onClick={() => setIsOpen(false)}
                className="w-full py-4 bg-black dark:bg-white text-white dark:text-black font-semibold transition-colors rounded-[0.77em] text-base"
              >
                Ver Productos
              </button>
            </div>
          </div>
        </>,
        document.body
      )}
    </>
  );
}
