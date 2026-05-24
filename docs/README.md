# 📱 Hoco Catalog - Catálogo de Accesorios

Catálogo web para venta mayorista de accesorios HOCO en Mar del Plata, Argentina.

## 🚀 Tecnologías

- **Frontend:** React + TypeScript + Vite
- **Estilos:** Tailwind CSS + shadcn/ui
- **Deploy:** Vercel
- **Analytics:** Vercel Analytics + Speed Insights

## 📦 Instalación

```bash
# Instalar dependencias
pnpm install

# Desarrollo
pnpm dev

# Build
pnpm build

# Preview
pnpm preview
```

## 🌐 Deploy

El proyecto está conectado a Vercel y se despliega automáticamente con cada push a `main`.

**Repositorio:** https://github.com/illushkinn/hoco-catalog

## 📁 Estructura

```
client/
├── src/
│   ├── components/     # Componentes React
│   ├── contexts/       # Context API (Cart, Theme)
│   ├── pages/          # Páginas
│   └── const.ts        # Datos de productos
├── public/             # Assets estáticos
└── dist/               # Build de producción
```

## 🎨 Características

- ✅ Diseño responsive (mobile-first)
- ✅ Dark mode
- ✅ Carrito de compras
- ✅ Filtros por categoría
- ✅ Búsqueda de productos
- ✅ Integración con WhatsApp
- ✅ Glassmorphism UI
- ✅ Optimización de imágenes

## 📊 Performance

- Real Experience Score: 35 (Needs Improvement)
- First Contentful Paint: 11.45s
- Largest Contentful Paint: 12.14s

### Mejoras Pendientes

1. **Optimizar imágenes** - Procesar 134 imágenes (remover fondo, reescalar)
2. **Lazy loading** - Ya implementado
3. **Code splitting** - Considerar para futuras mejoras

## 🖼️ Procesamiento de Imágenes

Las imágenes de productos necesitan procesamiento (remover fondo blanco).

**Opciones:**
- remove.bg API ($9 USD por 500 créditos)
- Procesamiento manual con herramientas online
- Scripts Python/Node.js (requiere instalación de dependencias)

Ver: `docs/IMAGENES.md` para más detalles.

## 📝 Información Legal

- **CUIT:** 20-19025451-9
- **Marca:** Hoco Original
- **Certificación:** EAC
- **Ubicación:** Mar del Plata, Buenos Aires, Argentina
- **Contacto:** +54 9 11 2406 3009

## 🔧 Configuración

### Variables de Entorno

Crear `.env.local` en la raíz:

```env
# No hay variables de entorno requeridas actualmente
```

### Vercel

El proyecto está configurado con:
- Build command: `pnpm build`
- Output directory: `client/dist`
- Install command: `pnpm install`

## 📱 Contacto

- **WhatsApp:** +54 9 11 2406 3009
- **Email:** thinktank.png@gmail.com
- **GitHub:** @illushkinn

---

**Última actualización:** Mayo 2026
