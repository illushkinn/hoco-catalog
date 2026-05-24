import { useState, useEffect } from "react";

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  style?: React.CSSProperties;
  loading?: "lazy" | "eager";
  priority?: boolean;
  onLoad?: () => void;
  onError?: () => void;
}

/**
 * Componente de imagen optimizada con:
 * - Lazy loading nativo
 * - Fade-in suave al cargar
 * - Manejo de errores
 * - Prioridad de carga configurable
 * - Decoding asíncrono
 */
export default function OptimizedImage({
  src,
  alt,
  className = "",
  style = {},
  loading = "lazy",
  priority = false,
  onLoad,
  onError,
}: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    // Preload para imágenes prioritarias
    if (priority && src) {
      const link = document.createElement("link");
      link.rel = "preload";
      link.as = "image";
      link.href = src;
      document.head.appendChild(link);

      return () => {
        document.head.removeChild(link);
      };
    }
  }, [src, priority]);

  const handleLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  const handleError = () => {
    setHasError(true);
    onError?.();
  };

  return (
    <img
      src={src}
      alt={alt}
      className={`${className} ${isLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}
      style={style}
      loading={loading}
      decoding="async"
      fetchPriority={priority ? "high" : "low"}
      onLoad={handleLoad}
      onError={handleError}
    />
  );
}
