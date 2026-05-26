import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

const MIN_ZOOM = 1;
const MAX_ZOOM = 4;
const ZOOM_STEP = 0.35;

interface LightboxProps {
  images: { src: string; alt: string }[];
  initialIndex?: number;
  onClose: () => void;
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

export default function Lightbox({
  images,
  initialIndex = 0,
  onClose,
}: LightboxProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef({ x: 0, y: 0, panX: 0, panY: 0 });
  const pinchRef = useRef<{ distance: number; zoom: number } | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  const hasMultiple = images.length > 1;
  const current = images[currentIndex];

  // --- Body scroll lock ---
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  // --- Focus trap ---
  useEffect(() => {
    closeButtonRef.current?.focus();

    const handleTab = (e: KeyboardEvent) => {
      if (e.key !== "Tab" || !containerRef.current) return;
      const focusable = containerRef.current.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener("keydown", handleTab);
    return () => document.removeEventListener("keydown", handleTab);
  }, []);

  // --- Reset zoom/pan on image change ---
  useEffect(() => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  }, [currentIndex]);

  // --- Constrain pan to keep image partially visible ---
  const constrainPan = useCallback(
    (px: number, py: number, z: number) => {
      if (z <= 1) return { x: 0, y: 0 };
      const el = imageRef.current;
      if (!el) return { x: px, y: py };
      const rect = el.getBoundingClientRect();
      const w = rect.width / z; // natural displayed width
      const h = rect.height / z;
      const maxX = ((z - 1) * w) / 2;
      const maxY = ((z - 1) * h) / 2;
      return {
        x: clamp(px, -maxX, maxX),
        y: clamp(py, -maxY, maxY),
      };
    },
    [],
  );

  // --- Navigation ---
  const goNext = useCallback(() => {
    if (hasMultiple) setCurrentIndex((i) => (i + 1) % images.length);
  }, [hasMultiple, images.length]);

  const goPrev = useCallback(() => {
    if (hasMultiple)
      setCurrentIndex((i) => (i - 1 + images.length) % images.length);
  }, [hasMultiple, images.length]);

  // --- Keyboard ---
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowRight") {
        goNext();
      } else if (e.key === "ArrowLeft") {
        goPrev();
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onClose, goNext, goPrev]);

  // --- Mouse wheel zoom ---
  const handleWheel = useCallback(
    (e: React.WheelEvent) => {
      e.preventDefault();
      e.stopPropagation();
      const delta = e.deltaY > 0 ? -ZOOM_STEP : ZOOM_STEP;
      setZoom((z) => {
        const next = clamp(z + delta, MIN_ZOOM, MAX_ZOOM);
        if (next <= 1) setPan({ x: 0, y: 0 });
        return next;
      });
    },
    [],
  );

  // --- Double click toggle zoom ---
  const handleDoubleClick = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      setZoom((z) => {
        if (z > 1) {
          setPan({ x: 0, y: 0 });
          return 1;
        }
        // Zoom to cursor position
        const el = imageRef.current;
        if (el) {
          const rect = el.getBoundingClientRect();
          const cx = e.clientX - rect.left - rect.width / 2;
          const cy = e.clientY - rect.top - rect.height / 2;
          setPan(constrainPan(-cx * 0.6, -cy * 0.6, 2.5));
        }
        return 2.5;
      });
    },
    [constrainPan],
  );

  // --- Mouse drag / pan ---
  const handlePointerDown = useCallback(
    (e: React.PointerEvent) => {
      if (zoom <= 1) return;
      e.preventDefault();
      setIsDragging(true);
      dragStart.current = {
        x: e.clientX,
        y: e.clientY,
        panX: pan.x,
        panY: pan.y,
      };
      (e.target as HTMLElement).setPointerCapture(e.pointerId);
    },
    [zoom, pan],
  );

  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!isDragging) return;
      const dx = e.clientX - dragStart.current.x;
      const dy = e.clientY - dragStart.current.y;
      setPan(
        constrainPan(
          dragStart.current.panX + dx,
          dragStart.current.panY + dy,
          zoom,
        ),
      );
    },
    [isDragging, zoom, constrainPan],
  );

  const handlePointerUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  // --- Touch pinch-zoom ---
  const touchDistance = (touches: React.TouchList) => {
    const [a, b] = [touches[0], touches[1]];
    return Math.hypot(a.clientX - b.clientX, a.clientY - b.clientY);
  };

  const handleTouchStart = useCallback(
    (e: React.TouchEvent) => {
      if (e.touches.length === 2) {
        pinchRef.current = { distance: touchDistance(e.touches), zoom };
      }
    },
    [zoom],
  );

  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      if (!pinchRef.current || e.touches.length !== 2) return;
      e.preventDefault();
      const distance = touchDistance(e.touches);
      const scale = distance / pinchRef.current.distance;
      const next = clamp(pinchRef.current.zoom * scale, MIN_ZOOM, MAX_ZOOM);
      setZoom(next);
      if (next <= 1) setPan({ x: 0, y: 0 });
    },
    [],
  );

  const handleTouchEnd = useCallback(() => {
    pinchRef.current = null;
  }, []);

  // --- Overlay click (close if outside image) ---
  const handleOverlayClick = useCallback(
    (e: React.MouseEvent) => {
      if (e.target === e.currentTarget) onClose();
    },
    [onClose],
  );

  const cursorStyle = zoom > 1 ? (isDragging ? "grabbing" : "grab") : "zoom-in";

  return createPortal(
    <div
      ref={containerRef}
      className="lightbox-overlay"
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-label={current?.alt || "Visor de imagen"}
    >
      {/* Botón cerrar */}
      <button
        ref={closeButtonRef}
        type="button"
        onClick={onClose}
        className="lightbox-close"
        aria-label="Cerrar imagen"
      >
        <X className="w-6 h-6" />
      </button>

      {/* Navegación anterior */}
      {hasMultiple && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            goPrev();
          }}
          className="lightbox-nav lightbox-nav--prev"
          aria-label="Imagen anterior"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
      )}

      {/* Contenedor de imagen con glassmorphism */}
      <div
        className="lightbox-glass"
        onClick={(e) => e.stopPropagation()}
        onWheel={handleWheel}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onTouchCancel={handleTouchEnd}
        style={{ touchAction: "pinch-zoom" }}
      >
        <img
          ref={imageRef}
          src={current?.src}
          alt={current?.alt}
          className="lightbox-image"
          style={{
            transform: `scale(${zoom}) translate(${pan.x / zoom}px, ${pan.y / zoom}px)`,
            cursor: cursorStyle,
            imageRendering: "-webkit-optimize-contrast" as any,
            filter: "contrast(1.15) brightness(1.08) saturate(1.1)",
          }}
          draggable={false}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          onDoubleClick={handleDoubleClick}
        />
      </div>

      {/* Navegación siguiente */}
      {hasMultiple && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            goNext();
          }}
          className="lightbox-nav lightbox-nav--next"
          aria-label="Imagen siguiente"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      )}

      {/* Indicador de imagen */}
      {hasMultiple && (
        <div className="lightbox-counter">
          {currentIndex + 1} / {images.length}
        </div>
      )}

      {/* Indicador de zoom */}
      {zoom > 1 && (
        <div className="lightbox-zoom-badge">
          {Math.round(zoom * 100)}%
        </div>
      )}
    </div>,
    document.body,
  );
}
