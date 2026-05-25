import { useEffect, useRef } from "react";

/**
 * Fade-in del título e imagen del hero tras el primer paint.
 * Respeta prefers-reduced-motion; GSAP se carga de forma dinámica (no bloquea LCP).
 */
export function useHeroGsap() {
  const heroTextRef = useRef<HTMLDivElement>(null);
  const heroImageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const textEl = heroTextRef.current;
    const imageEl = heroImageRef.current;
    if (!textEl || !imageEl) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) return;

    let cancelled = false;

    const run = () => {
      void import("gsap").then(({ gsap }) => {
        if (cancelled) return;
        gsap.set([textEl, imageEl], { opacity: 0, y: 12 });
        gsap.to(textEl, { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" });
        gsap.to(imageEl, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
          delay: 0.08,
        });
      });
    };

    if ("requestIdleCallback" in window) {
      const id = requestIdleCallback(run, { timeout: 500 });
      return () => {
        cancelled = true;
        cancelIdleCallback(id);
      };
    }

    const t = window.setTimeout(run, 0);
    return () => {
      cancelled = true;
      clearTimeout(t);
    };
  }, []);

  return { heroTextRef, heroImageRef };
}
