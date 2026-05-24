# Instrucciones para Desplegar y Purgar Cache

## Problema
Las imágenes de Cables y Auriculares no se ven porque el CDN de Vercel tiene cacheadas respuestas 404 antiguas.

## Solución Aplicada

### 1. Cache Busting Agresivo
- Agregado `?v=v3&t=20260524` a todas las URLs de imágenes
- Deshabilitado cache completamente en `vercel.json`

### 2. Pasos para Desplegar

#### Opción A: Deploy Manual desde Dashboard de Vercel (RECOMENDADO)

1. Ve a https://vercel.com/dashboard
2. Busca tu proyecto "hococatalog"
3. Click en "Deployments"
4. Click en "Redeploy" en el último deployment
5. **IMPORTANTE**: Marca la opción "Clear Build Cache"
6. Espera a que termine el deploy

#### Opción B: Deploy desde CLI

```bash
# Cancela cualquier proceso de Vercel activo (Ctrl+C)

# Desde la carpeta raíz del proyecto
cd client
npm run build

# Commit los cambios
git add -A
git commit -m "Fix: Cache busting v3 para imágenes"

# Deploy a producción
vercel --prod --force
```

### 3. Purgar Cache del CDN de Vercel

Después del deploy, **DEBES** purgar el cache:

#### Método 1: Dashboard de Vercel
1. Ve a tu proyecto en Vercel
2. Settings → Data Cache
3. Click "Purge Everything"
4. Confirma

#### Método 2: CLI
```bash
vercel env pull
# Esto forzará una reconexión y limpieza
```

### 4. Verificar en el Navegador

1. Abre el sitio en **modo incógnito** o
2. Presiona `Ctrl+Shift+R` para forzar recarga sin cache
3. Abre DevTools (F12) → Network tab
4. Busca las imágenes de cables (ej: "CABLES - U110")
5. Verifica que la URL tenga `?v=v3&t=20260524`
6. Verifica que el status sea 200 (no 304 ni 404)

### 5. Verificación de Logs

Abre la consola del navegador (F12 → Console) y busca:
- ✅ "Image loaded successfully" = imagen cargó bien
- ❌ "Failed to load image" = imagen falló (ver URL completa)

## Archivos Modificados

- `client/src/const.ts` - Cache busting v3 + timestamp
- `vercel.json` - Headers sin cache temporalmente
- `client/src/components/ProductCard.tsx` - Logs mejorados

## Notas Importantes

- Las imágenes SÍ existen en `client/public/imagenes_hoco_productos/`
- Las imágenes SÍ se copian a `client/dist/imagenes_hoco_productos/`
- El problema es 100% de cache del CDN
- Una vez que funcione, puedes restaurar el cache normal en `vercel.json`

## Restaurar Cache Normal (Después de que funcione)

En `vercel.json`, cambia:
```json
"Cache-Control": "no-cache, no-store, must-revalidate"
```

Por:
```json
"Cache-Control": "public, max-age=86400, must-revalidate"
```
