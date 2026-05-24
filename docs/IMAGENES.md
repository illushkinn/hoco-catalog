# 🖼️ Procesamiento de Imágenes

## Situación Actual

- **Total:** 134 imágenes PNG
- **Problema:** Tienen fondo blanco/gris
- **Necesidad:** Remover fondo y reescalar a 1200x1200px

## Solución Temporal (Aplicada)

Se aplicaron mejoras CSS para mejorar la visualización:
- Filtros de contraste, brillo y saturación
- Optimización de renderizado
- Funciona en light y dark mode

## Opciones para Procesamiento Definitivo

### 1. remove.bg API (Recomendado)

**Costo:** $9 USD por 500 créditos (necesitas 134)

**Pasos:**
1. Crear cuenta en https://www.remove.bg/
2. Obtener API key
3. Instalar Python: `pip install requests pillow`
4. Ejecutar: `python process_images_removebg.py`

### 2. Procesamiento Manual

**Herramientas gratuitas:**
- remove.bg (50 imágenes gratis/mes)
- Photopea (https://www.photopea.com/)
- Canva (https://www.canva.com/)

**Proceso:**
1. Subir imagen
2. Remover fondo
3. Descargar PNG transparente
4. Reescalar a 1200x1200px

### 3. Scripts Automáticos

**Node.js:**
```bash
npm install @imgly/background-removal-node sharp
node process-images.js
```

**Python:**
```bash
pip install rembg pillow
python process_images.py
```

## Después del Procesamiento

1. Revisar imágenes en `client/public/imagenes_hoco_productos_sin_fondo/`
2. Hacer backup de originales
3. Reemplazar imágenes
4. Commit y push a GitHub
5. Vercel desplegará automáticamente

## Impacto en Performance

Procesar las imágenes mejorará significativamente:
- Tiempo de carga
- Real Experience Score
- First/Largest Contentful Paint
