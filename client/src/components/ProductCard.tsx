import { Button } from "@/components/ui/button";
import { ShoppingCart, ChevronLeft, ChevronRight, X, ZoomIn, ZoomOut, RotateCcw } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { formatPriceARS } from "@/components/priceUtils";
import { useCallback, useEffect, useRef, useState } from "react";

const MIN_ZOOM = 1;
const MAX_ZOOM = 4;
const ZOOM_STEP = 0.35;

function touchDistance(touches: React.TouchList): number {
  const [a, b] = [touches[0], touches[1]];
  return Math.hypot(a.clientX - b.clientX, a.clientY - b.clientY);
}

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
  enableImageZoom = false,
}: ProductCardProps) {
  const { addItem } = useCart();
  const isAvailable = status === "Disponible";
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [modalImageIndex, setModalImageIndex] = useState(0);
  const [zoom, setZoom] = useState(1);
  const pinchRef = useRef<{ distance: number; zoom: number } | null>(null);

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

  const clampZoom = useCallback(
    (value: number) => Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, value)),
    [],
  );

  const resetZoom = useCallback(() => setZoom(1), []);

  const openModal = () => {
    if (!isVideo) {
      setModalImageIndex(currentImageIndex);
      resetZoom();
      setIsModalOpen(true);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    resetZoom();
  };

  useEffect(() => {
    resetZoom();
  }, [modalImageIndex, resetZoom]);

  const zoomIn = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setZoom((z) => clampZoom(z + ZOOM_STEP));
  };

  const zoomOut = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setZoom((z) => clampZoom(z - ZOOM_STEP));
  };

  const handleModalWheel = (e: React.WheelEvent) => {
    if (!enableImageZoom) return;
    e.preventDefault();
    e.stopPropagation();
    const delta = e.deltaY > 0 ? -ZOOM_STEP : ZOOM_STEP;
    setZoom((z) => clampZoom(z + delta));
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (!enableImageZoom || e.touches.length !== 2) return;
    pinchRef.current = { distance: touchDistance(e.touches), zoom };
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!enableImageZoom || !pinchRef.current || e.touches.length !== 2) return;
    e.preventDefault();
    const distance = touchDistance(e.touches);
    const scale = distance / pinchRef.current.distance;
    setZoom(clampZoom(pinchRef.current.zoom * scale));
  };

  const handleTouchEnd = () => {
    pinchRef.current = null;
  };

  return (
    <>
      <div className="group flex flex-col items-stretch justify-start min-w-0">
        {allImages.length > 0 && (
          <div
            className={`relative w-full bg-white dark:bg-black overflow-hidden rounded-[0.77em] aspect-[3/4] ${!isVideo && enableImageZoom ? "cursor-zoom-in" : ""}`}
            onClick={openModal}
            role={isVideo ? undefined : "button"}
            tabIndex={isVideo ? undefined : 0}
            onKeyDown={(e) => {
              if (!isVideo && (e.key === "Enter" || e.key === " ")) {
                e.preventDefault();
                openModal();
              }
            }}
            aria-label={
              isVideo
                ? undefined
                : enableImageZoom
                  ? `Ampliar imagen de ${name}`
                  : `Ver imágenes de ${name}, marca HOCO`
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

      {isModalOpen && !isVideo && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex flex-row items-center justify-center p-4"
          onClick={closeModal}
          role="dialog"
          aria-modal="true"
          aria-label={`Galería de ${name}, marca HOCO`}
        >
          <button
            type="button"
            onClick={closeModal}
            className="absolute top-4 right-4 flex items-center justify-center min-h-[44px] min-w-[44px] bg-white/10 hover:bg-white/20 text-white p-2 rounded-[0.77em] transition-colors z-10 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-white"
            aria-label="Cerrar galería"
          >
            <X className="w-6 h-6" />
          </button>

          {enableImageZoom && (
            <div
              className="absolute top-4 left-1/2 -translate-x-1/2 flex items-center gap-2 z-10"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={zoomOut}
                disabled={zoom <= MIN_ZOOM}
                className="flex items-center justify-center min-h-[44px] min-w-[44px] bg-white/10 hover:bg-white/20 disabled:opacity-40 text-white p-2 rounded-[0.77em] transition-colors"
                aria-label="Alejar"
              >
                <ZoomOut className="w-5 h-5" />
              </button>
              <span className="text-white text-sm tabular-nums min-w-[3.5rem] text-center bg-black/50 px-2 py-1 rounded-[0.77em]">
                {Math.round(zoom * 100)}%
              </span>
              <button
                type="button"
                onClick={zoomIn}
                disabled={zoom >= MAX_ZOOM}
                className="flex items-center justify-center min-h-[44px] min-w-[44px] bg-white/10 hover:bg-white/20 disabled:opacity-40 text-white p-2 rounded-[0.77em] transition-colors"
                aria-label="Acercar"
              >
                <ZoomIn className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  resetZoom();
                }}
                disabled={zoom <= MIN_ZOOM}
                className="flex items-center justify-center min-h-[44px] min-w-[44px] bg-white/10 hover:bg-white/20 disabled:opacity-40 text-white p-2 rounded-[0.77em] transition-colors"
                aria-label="Restablecer zoom"
              >
                <RotateCcw className="w-5 h-5" />
              </button>
            </div>
          )}

          <div
            className="relative max-w-4xl w-full h-full flex flex-row items-center justify-center min-w-0 overflow-hidden"
            onWheel={enableImageZoom ? handleModalWheel : undefined}
            onTouchStart={enableImageZoom ? handleTouchStart : undefined}
            onTouchMove={enableImageZoom ? handleTouchMove : undefined}
            onTouchEnd={enableImageZoom ? handleTouchEnd : undefined}
            onTouchCancel={enableImageZoom ? handleTouchEnd : undefined}
          >
            <img
              src={allImages[modalImageIndex]}
              alt={`${name}, marca HOCO`}
              className="max-w-full max-h-full object-contain transition-transform duration-150"
              style={{
                imageRendering: "-webkit-optimize-contrast",
                filter: "contrast(1.15) brightness(1.08) saturate(1.1)",
                transform: enableImageZoom ? `scale(${zoom})` : undefined,
              }}
              onClick={(e) => e.stopPropagation()}
              draggable={false}
            />

            {hasMultipleImages && (
              <>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    prevModalImage();
                  }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center justify-center min-h-[44px] min-w-[44px] bg-white/10 hover:bg-white/20 text-white p-3 rounded-[0.77em] transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-white"
                  aria-label="Imagen anterior"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    nextModalImage();
                  }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center justify-center min-h-[44px] min-w-[44px] bg-white/10 hover:bg-white/20 text-white p-3 rounded-[0.77em] transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-white"
                  aria-label="Imagen siguiente"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/70 text-white px-4 py-2 rounded-[0.77em] text-sm">
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
