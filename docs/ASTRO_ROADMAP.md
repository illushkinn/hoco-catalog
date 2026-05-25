# Hoja de ruta Astro (diferida)

Migrar el catálogo completo a **Astro** no es de bajo impacto hoy: implica rearmar rutas, build, despliegue y el carrito/WhatsApp. Este documento fija **cuándo** conviene y **qué** pasaría a islas.

## Cuándo migrar

- Necesidad de **SEO estático** por categoría o producto (URLs indexables sin depender solo del SPA).
- Volumen de contenido que crezca (blog, fichas por SKU, landings por ciudad).
- Equipo dispuesto a mantener **dos capas**: shell Astro + islas React para interactividad.

Hasta entonces, **Vite + React** sigue siendo la opción correcta para LCP, carrito y filtros en un solo bundle conocido.

## Qué movería a islas (no en la primera pasada)

| Zona | En Astro | Isla React |
|------|----------|------------|
| Layout, meta, footer estático | `.astro` | — |
| Hero, listado por categoría (HTML inicial) | estático o SSG | — |
| Filtros, carrito, WhatsApp, videos VT | — | `client:load` o `client:visible` |
| GSAP hero | — | isla pequeña o `client:visible` |

## Pasos sugeridos (futuro)

1. Crear app Astro en subcarpeta o rama; copiar `public/` y estilos.
2. Páginas estáticas: `/`, `/productos` con datos de `const.ts` en build time.
3. Isla: `FloatingCart`, `HamburgerMenu`, filtros.
4. Validar LCP y bundle; comparar con build actual de Vite.
5. Cutover de dominio solo cuando paridad funcional y CI estén verdes.

## Qué no hacer ahora

- No reescribir `Home.tsx` ni el catálogo entero en Astro en una sola tarea.
- No añadir Three.js ni animaciones pesadas en el shell estático.

**Referencia:** bitácora idea 1 — GSAP solo en hero; Astro documentado aquí para una fase posterior.
