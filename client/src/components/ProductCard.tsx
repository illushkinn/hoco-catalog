import { Button } from "@/components/ui/button";
import { ShoppingCart, ChevronLeft, ChevronRight, X } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { formatPriceARS } from "@/components/priceUtils";
import { useState } from "react";

interface ProductCardProps {
  id: string;
  name: string;
  price_ars: number;
  status: string;
  image?: string;
  images?: string[];
  isVideo?: boolean;
  priceUSD?: number;
}

export default function ProductCard({
  id,
  name,
  price_ars,
  status,
  image,
  images,
  isVideo = false,
  priceUSD,
}: ProductCardProps) {
  const { addItem } = useCart();
  const isAvailable = status === "Disponible";
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [modalImageIndex, setModalImageIndex] = useState(0);
  
  const allImages = images || (image ? [image] : []);
  const hasMultipleImages = allImages.length > 1;

  const handleAddToCart = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (isAvailable) {
      addItem({
        id,
        name,
        price_ars,
        image: allImages[0] || "",
        thumbnail: isVideo ? "/VT_45_kg_anti_espia/VT-45KG.webp" : undefined,
      });
    }
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % allImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
  };

  const nextModalImage = () => {
    setModalImageIndex((prev) => (prev + 1) % allImages.length);
  };

  const prevModalImage = () => {
    setModalImageIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
  };

  const openModal = () => {
    if (!isVideo) {
      setModalImageIndex(currentImageIndex);
      setIsModalOpen(true);
    }
  };

  return (
    <>
      <div className="group cursor-pointer">
        {/* Contenedor de imagen/video - aspect-ratio 3/4 portrait */}
        {allImages.length > 0 && (
          <div 
            className="relative w-full bg-white dark:bg-black overflow-hidden" 
            style={{ aspectRatio: '3/4' }}
            onClick={openModal}
          >
            {isVideo ? (
              <video
                src={allImages[0]}
                className="w-full h-full object-contain"
                style={{ objectPosition: 'center center' }}
                autoPlay
                loop
                muted
                playsInline
                onError={(e) => {
                  console.warn(`Failed to load video: ${allImages[0]}`);
                }}
              />
            ) : (
              <img
                src={allImages[currentImageIndex]}
                alt={name}
                className="w-full h-full object-contain transition-opacity duration-300"
                style={{ 
                  objectPosition: 'center center', 
                  opacity: 0,
                  imageRendering: '-webkit-optimize-contrast',
                  transform: 'scale(1.05)',
                  filter: 'contrast(1.15) brightness(1.08) saturate(1.1)'
                }}
                loading="lazy"
                decoding="async"
                fetchPriority="low"
                onLoad={(e) => {
                  e.currentTarget.style.opacity = '1';
                  console.log(`✅ Image loaded successfully: ${allImages[currentImageIndex]}`);
                }}
                onError={(e) => {
                  e.currentTarget.style.opacity = '0.5';
                  e.currentTarget.style.backgroundColor = '#fee';
                  console.error(`❌ Failed to load image: ${allImages[currentImageIndex]}`);
                  console.error(`Full path attempted: ${e.currentTarget.src}`);
                  console.error(`Product: ${name} (${id})`);
                }}
              />
            )}
            
            {/* Indicador de múltiples imágenes */}
            {hasMultipleImages && !isVideo && (
              <div className="absolute top-2 right-2 bg-black/70 text-white px-2 py-1 text-xs rounded-full">
                {currentImageIndex + 1}/{allImages.length}
              </div>
            )}
            
            {/* Navegación de imágenes en hover (solo desktop) */}
            {hasMultipleImages && !isVideo && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    prevImage();
                  }}
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hidden md:block"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    nextImage();
                  }}
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hidden md:block"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </>
            )}
          
            {/* Botón visible siempre en mobile, hover en desktop */}
            <div className="absolute bottom-0 left-0 right-0 opacity-100 transition-opacity duration-300 p-4">
              <Button
                onClick={handleAddToCart}
                disabled={!isAvailable}
                className="w-full gap-2 font-semibold text-sm rounded-none"
                variant={isAvailable ? "default" : "outline"}
              >
                <ShoppingCart className="w-4 h-4" />
                {isAvailable ? "Agregar al carrito" : "No disponible"}
              </Button>
            </div>
          </div>
        )}

        {/* Texto flotante bajo la imagen - sin caja, sin fondo, sin borde */}
        <div className="mt-3">
          {/* Nombre del producto */}
          <h3 className="text-sm font-medium text-black dark:text-white line-clamp-2">
            {name}
          </h3>

          {/* Precio */}
          <div className="text-sm font-bold text-black dark:text-white mt-1">
            {formatPriceARS(price_ars)}
            {priceUSD && (
              <span className="ml-2 text-xs font-normal text-gray-600 dark:text-gray-400">
                (USD ${priceUSD.toFixed(2)})
              </span>
            )}
          </div>

          {/* Badge de disponibilidad - solo texto, sin pill */}
          <div className="mt-1">
            {isAvailable ? (
              <span className="text-xs font-normal text-emerald-600 dark:text-emerald-400">
                Disponible
              </span>
            ) : (
              <span className="text-xs font-normal text-red-600 dark:text-red-400">
                Agotado
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Modal de imagen ampliada */}
      {isModalOpen && !isVideo && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setIsModalOpen(false)}
        >
          <button
            onClick={() => setIsModalOpen(false)}
            className="absolute top-4 right-4 bg-white/10 hover:bg-white/20 text-white p-2 rounded-full transition-colors z-10"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="relative max-w-4xl w-full h-full flex items-center justify-center">
            <img
              src={allImages[modalImageIndex]}
              alt={name}
              className="max-w-full max-h-full object-contain"
              style={{
                imageRendering: '-webkit-optimize-contrast',
                filter: 'contrast(1.15) brightness(1.08) saturate(1.1)'
              }}
              onClick={(e) => e.stopPropagation()}
            />

            {/* Navegación en modal */}
            {hasMultipleImages && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    prevModalImage();
                  }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white p-3 rounded-full transition-colors"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    nextModalImage();
                  }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white p-3 rounded-full transition-colors"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/70 text-white px-4 py-2 rounded-full text-sm">
                  {modalImageIndex + 1} / {allImages.length}
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
