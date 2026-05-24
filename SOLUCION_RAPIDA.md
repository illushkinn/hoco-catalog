# SOLUCIÓN RÁPIDA - Imágenes no se ven

## El Problema
Vercel CDN tiene cacheadas respuestas 404 de las imágenes.

## SOLUCIÓN MÁS RÁPIDA (Sin CLI)

### Paso 1: Cierra el proceso de Vercel
- Presiona `Ctrl+C` en la terminal donde está corriendo Vercel CLI
- O cierra esa ventana de terminal completamente

### Paso 2: Ejecuta el script automático
```bash
deploy-fix.bat
```

**O si el script falla, hazlo manualmente:**

### Paso 3: Build manual
```bash
cd client
npm run build
cd ..
```

### Paso 4: Commit
```bash
git add -A
git commit -m "Fix: Cache busting v3"
```

### Paso 5: Deploy desde Dashboard de Vercel

1. Ve a: https://vercel.com/dashboard
2. Busca tu proyecto "hococatalog"
3. Click en el proyecto
4. Click en "Deployments" (en el menú lateral)
5. En el último deployment, click en los 3 puntos (⋮)
6. Click en "Redeploy"
7. **IMPORTANTE**: Marca la casilla "Use existing Build Cache" como **DESMARCADA**
8. Click en "Redeploy"

### Paso 6: Purgar Cache del CDN

**Mientras el deploy está en progreso:**

1. En el mismo proyecto de Vercel
2. Click en "Settings" (en el menú lateral)
3. Scroll hasta "Data Cache"
4. Click en "Purge Everything"
5. Confirma

### Paso 7: Verificar

1. Espera a que el deploy termine (verás un ✓ verde)
2. Abre el sitio en **modo incógnito**: `Ctrl+Shift+N` (Chrome) o `Ctrl+Shift+P` (Firefox)
3. Ve a la sección "Cables" o "Auriculares"
4. Las imágenes deberían verse ahora

### Si TODAVÍA no se ven:

1. Abre DevTools (F12)
2. Ve a la pestaña "Network"
3. Recarga la página
4. Busca una imagen de cable (ej: "U110")
5. Click en ella
6. Verifica:
   - URL debe tener `?v=v3&t=20260524`
   - Status debe ser `200` (no 404, no 304)
   - Headers debe mostrar `Cache-Control: no-cache`

Si el status es 404, significa que las imágenes no se copiaron al build.
Si el status es 304, significa que el cache no se purgó.

## Cambios Aplicados

✅ `client/src/const.ts` - Cache busting v3 + timestamp
✅ `vercel.json` - Headers sin cache (temporalmente)
✅ `client/src/components/ProductCard.tsx` - Logs de debug

## Contacto de Emergencia

Si nada funciona, las imágenes están en:
- `client/public/imagenes_hoco_productos/CABLES - *.png|jpeg`
- `client/public/imagenes_hoco_productos/ACCESORIOS - EQ*.png|jpeg`

Verificado que existen y se copian al build correctamente.
