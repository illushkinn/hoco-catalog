# 📸 Cómo Procesar las Imágenes (Remover Fondo)

## ✅ Cambio del Footer Completado
- Eliminados: "Transferencia Bancaria" y "Tarjetas de Crédito/Débito"
- Solo quedan: "Efectivo" y "Mercado Pago"
- ✅ Ya desplegado en Vercel

---

## 🎯 Procesamiento de Imágenes

Tienes **134 imágenes** con fondo blanco/gris que necesitan:
1. Remover el fondo (transparente)
2. Reescalar a 1200x1200px

---

## 🚀 OPCIÓN RECOMENDADA: Usar Node.js (Ya lo tienes instalado)

### Paso 1: Prueba con 5 imágenes primero

Doble clic en:
```
PROCESAR_IMAGENES_PRUEBA.bat
```

Esto va a:
- Instalar las dependencias necesarias
- Procesar solo 5 imágenes de prueba
- Guardarlas en `client/public/imagenes_hoco_productos_sin_fondo/`

**Tiempo estimado:** 2-5 minutos

### Paso 2: Si te gustan los resultados, procesa todas

Doble clic en:
```
PROCESAR_IMAGENES.bat
```

Esto procesará las 134 imágenes completas.

**Tiempo estimado:** 20-40 minutos

---

## 📁 Después del Procesamiento

### 1. Revisar las imágenes procesadas
Las encontrarás en: `client/public/imagenes_hoco_productos_sin_fondo/`

### 2. Reemplazar las originales

**Opción A: Backup y reemplazo (Recomendado)**
```bash
# Hacer backup de las originales
mv client/public/imagenes_hoco_productos client/public/imagenes_hoco_productos_backup

# Usar las procesadas
mv client/public/imagenes_hoco_productos_sin_fondo client/public/imagenes_hoco_productos
```

**Opción B: Actualizar rutas en el código**
Cambiar las rutas en `client/src/const.ts` para apuntar a la nueva carpeta.

### 3. Commit y Deploy
```bash
cd client
git add -A
git commit -m "Update: Imagenes procesadas sin fondo y reescaladas"
git push origin main
```

Vercel desplegará automáticamente.

---

## 🔧 Solución de Problemas

### Si el script falla:

1. **Instalar dependencias manualmente:**
```bash
pnpm install @imgly/background-removal-node sharp
```

2. **Ejecutar el script manualmente:**
```bash
node process-images-test.js
```

### Si las dependencias no se instalan:

Intenta con npm:
```bash
npm install @imgly/background-removal-node sharp
```

---

## 💡 Alternativas

### Si Node.js no funciona:

1. **remove.bg API** (De pago: $9 USD por 500 créditos)
   - Editar `process_images_removebg.py`
   - Agregar tu API key
   - Ejecutar con Python (necesitas instalarlo)

2. **Procesamiento manual** (Muy laborioso)
   - Usar https://www.remove.bg/ (50 gratis/mes)
   - Procesar de a poco

---

## 📊 Resumen

| Método | Costo | Tiempo | Dificultad |
|--------|-------|--------|------------|
| **Node.js (Recomendado)** | Gratis | 20-40 min | Fácil |
| remove.bg API | $9 USD | 10-15 min | Media |
| Manual | Gratis | 5-10 horas | Alta |

---

## ✅ Próximos Pasos

1. ✅ Footer actualizado (ya desplegado)
2. ⏳ Ejecutar `PROCESAR_IMAGENES_PRUEBA.bat`
3. ⏳ Revisar resultados
4. ⏳ Ejecutar `PROCESAR_IMAGENES.bat` (todas las imágenes)
5. ⏳ Reemplazar imágenes originales
6. ⏳ Commit y push a GitHub

---

¿Necesitas ayuda? Avísame en qué paso estás.
