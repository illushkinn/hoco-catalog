# Catálogo de Accesorios para Celulares - Hoco Tech EAC

Sistema inteligente de catálogo de productos con carrito de compras y pedidos por WhatsApp.

## 🚀 Características

- ✅ Catálogo completo de productos HOCO (Cables y Auriculares)
- ✅ Carrito de compras funcional
- ✅ Pedidos directos por WhatsApp
- ✅ Modo oscuro/claro
- ✅ Diseño responsive (Mobile-first)
- ✅ Filtros por categoría y disponibilidad
- ✅ Búsqueda en tiempo real
- ✅ Precios en pesos argentinos (ARS)

## 🛠️ Tecnologías

- **Frontend**: React 19 + TypeScript + Vite
- **Styling**: Tailwind CSS 4 + shadcn/ui
- **State Management**: React Context API
- **Routing**: Wouter
- **Icons**: Lucide React

## 📦 Instalación

```bash
# Instalar dependencias
pnpm install

# Desarrollo
pnpm dev

# Build para producción
pnpm build

# Preview del build
pnpm preview
```

## 🌐 Deploy en Vercel

### Opción 1: Deploy desde CLI

```bash
# Instalar Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Opción 2: Deploy desde GitHub

1. Sube el proyecto a GitHub
2. Importa el repositorio en [vercel.com](https://vercel.com)
3. Vercel detectará automáticamente la configuración
4. Click en "Deploy"

### Configuración de Vercel

El proyecto incluye `vercel.json` con la configuración óptima:
- Build command: `pnpm build`
- Output directory: `dist`
- SPA routing configurado
- Cache de imágenes optimizado

## 📱 Funcionalidades del Sistema

### Para Clientes
- Navegar por el catálogo de productos
- Filtrar por categoría (Cables, Auriculares)
- Buscar productos específicos
- Agregar productos al carrito
- Realizar pedidos por WhatsApp con un click

### Para Vendedores
- Sistema automatizado de pedidos
- Información completa del cliente y productos
- Integración directa con WhatsApp Business

## 🔒 Seguridad

- Variables de entorno protegidas
- Archivos sensibles en `.gitignore`
- Sin exposición de API keys
- Validación de datos en cliente

## 📂 Estructura del Proyecto

```
proyecto/
├── client/
│   ├── public/
│   │   └── images/
│   │       └── imagenes_hoco_productos/
│   └── src/
│       ├── components/
│       ├── contexts/
│       ├── hooks/
│       ├── lib/
│       └── pages/
├── server/
├── shared/
└── vercel.json
```

## 🎨 Personalización

### Modificar productos
Edita `client/src/const.ts` para agregar/modificar productos.

### Cambiar colores
Modifica `client/src/index.css` para personalizar el tema.

### WhatsApp
Actualiza el número en `client/src/components/FloatingActions.tsx`.

## 📄 Licencia

MIT

## 👨‍💻 Desarrollado por

Illya Grytsyk
+54 9 11 2406 3009

---

**¿Listo para vender? 🚀**
Deploy en Vercel y comparte tu URL con tus clientes.
