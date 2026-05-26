import { Button } from "@/components/ui/button";
import { ShoppingCart, ChevronLeft, ChevronRight } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { formatPriceARS } from "@/components/priceUtils";
import { useState } from "react";
import Lightbox from "@/components/Lightbox";

interface ProductCardProps {
  id: string;
  name: string;
  price_ars: number;
  status: string;
  image?: string;
  images?: string[];
  isVideo?: boolean;
  priceUSD?: number;
  imageLoading?: "lazy" | "eager";
  enableImageZoom?: boolean;
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
  imageLoading = "lazy",
}: ProductCardProps) {
  const { addItem } = useCart();
  const isAvailable = status === "Disponible";
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

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

  const openLightbox = () => {
    if (!isVideo) {
      setIsLightboxOpen(true);
    }
  };

  const closeLightbox = () => {
    setIsLightboxOpen(false);
  };

  return (
    <>
      <div className="group flex flex-col items-stretch justify-start min-w-0">
        {allImages.length > 0 && (
          <div
            className={`relative w-full bg-white dark:bg-black overflow-hidden rounded-[0.77em] aspect-[3/4] ${!isVideo ? "cursor-zoom-in" : ""}`}
            onClick={openLightbox}
            role={isVideo ? undefined : "button"}
            tabIndex={isVideo ? undefined : 0}
            onKeyDown={(e) => {
              if (!isVideo && (e.key === "Enter" || e.key === " ")) {
                e.preventDefault();
                openLightbox();
              }
            }}
            aria-label={
              isVideo
                ? undefined
                : `Ampliar imagen de ${name}`
            }
          >
            {isVideo ? (
              <video
                src={allImages[0]}
                className="w-full h-full object-contain"
                style={{ objectPosition: "center center" }}
                autoPlay
                loop
                muted
                playsInline
                onError={() => {
                  console.warn(`Failed to load video: ${allImages[0]}`);
                }}
              />
            ) : (
              <img
                src={allImages[currentImageIndex]}
                alt={`${name}, marca HOCO`}
                className="product-card-image w-full h-full object-contain object-center transition-opacity duration-300 scale-105 contrast-[1.15] brightness-[1.08] saturate-[1.1]"
                loading={imageLoading}
                decoding="async"
                fetchPriority={imageLoading === "eager" ? "high" : "low"}
              />
            )}

            {hasMultipleImages && !isVideo && (
              <div className="absolute top-2 right-2 bg-black/70 text-white px-2 py-1 text-xs rounded-[0.77em]">
                {currentImageIndex + 1}/{allImages.length}
              </div>
            )}

            {hasMultipleImages && !isVideo && (
              <>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    prevImage();
                  }}
                  className="absolute left-2 top-1/2 -translate-y-1/2 flex items-center justify-center min-h-[44px] min-w-[44px] bg-black/50 hover:bg-black/70 text-white p-2 rounded-[0.77em] opacity-0 group-hover:opacity-100 transition-opacity hidden md:flex focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-white"
                  aria-label="Imagen anterior"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    nextImage();
                  }}
                  className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center justify-center min-h-[44px] min-w-[44px] bg-black/50 hover:bg-black/70 text-white p-2 rounded-[0.77em] opacity-0 group-hover:opacity-100 transition-opacity hidden md:flex focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-white"
                  aria-label="Imagen siguiente"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </>
            )}

            <div className="absolute bottom-0 left-0 right-0 flex flex-col items-stretch justify-end opacity-100 transition-opacity duration-300 p-4">
              <Button
                onClick={handleAddToCart}
                disabled={!isAvailable}
                className="w-full sm:w-full min-h-[48px] gap-2 font-semibold text-base"
                variant={isAvailable ? "default" : "outline"}
              >
                <ShoppingCart className="w-4 h-4" />
                {isAvailable ? "Agregar al carrito" : "No disponible"}
              </Button>
            </div>
          </div>
        )}

        <div className="mt-3 flex flex-col items-stretch justify-start gap-1 min-w-0">
          <h3 className="text-xl sm:text-2xl font-medium text-black dark:text-white line-clamp-2 min-w-0">
            {name}
          </h3>

          <div className="text-lg font-bold text-black dark:text-white min-w-0">
            {formatPriceARS(price_ars)}
            {priceUSD && (
              <span className="ml-2 text-xs font-normal text-gray-600 dark:text-gray-400">
                (USD ${priceUSD.toFixed(2)})
              </span>
            )}
          </div>

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

      {isLightboxOpen && !isVideo && (
        <Lightbox
          images={allImages.map((src) => ({
            src,
            alt: `${name}, marca HOCO`,
          }))}
          initialIndex={currentImageIndex}
          onClose={closeLightbox}
        />
      )}
    </>
  );
}
