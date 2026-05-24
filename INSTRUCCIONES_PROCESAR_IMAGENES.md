# Instrucciones para Procesar Imágenes de Productos

## Objetivo
- Remover fondo de todas las imágenes (fondo transparente)
- Reescalar para mejor resolución (1200x1200px)

## Total de imágenes: 134 archivos PNG

---

## OPCIÓN 1: Usar Python (Automático - Recomendado)

### Paso 1: Instalar Python
1. Descargar Python desde: https://www.python.org/downloads/
2. Durante instalación, marcar "Add Python to PATH"
3. Verificar instalación: `python --version`

### Paso 2: Instalar dependencias
```bash
pip install rembg pillow
```

### Paso 3: Ejecutar script
```bash
python process_images.py
```

Las imágenes procesadas se guardarán en: `client/public/imagenes_hoco_productos_processed/`

---

## OPCIÓN 2: Usar remove.bg API (Requiere cuenta de pago)

### Costo aproximado:
- 134 imágenes = 134 créditos
- Paquete de 500 créditos = $9 USD
- Web: https://www.remove.bg/

### Script con API:
```python
# Requiere: pip install requests pillow
# Configurar API_KEY en el script
```

---

## OPCIÓN 3: Herramientas Online (Manual)

### Para pocas imágenes:
1. **remove.bg** - https://www.remove.bg/ (50 gratis/mes)
2. **Photopea** - https://www.photopea.com/ (editor online gratuito)
3. **Canva** - https://www.canva.com/ (con función de remover fondo)

### Proceso manual:
1. Subir imagen
2. Remover fondo
3. Descargar PNG transparente
4. Reescalar a 1200x1200px
5. Reemplazar archivo original

---

## OPCIÓN 4: Usar CSS para mejorar visualización (Rápido - Sin procesar archivos)

En lugar de procesar las imágenes, podemos mejorar su visualización con CSS:

```css
/* Mejorar calidad de renderizado */
img {
  image-rendering: -webkit-optimize-contrast;
  image-rendering: crisp-edges;
}

/* Agregar fondo blanco/transparente */
.product-image {
  background: white;
  mix-blend-mode: multiply; /* Simula transparencia */
}
```

---

## Recomendación

**Para 134 imágenes, la mejor opción es:**

1. **Si tienes presupuesto ($9 USD)**: Usar remove.bg API
2. **Si prefieres gratis**: Instalar Python y usar el script `process_images.py`
3. **Solución temporal**: Aplicar mejoras CSS mientras procesas las imágenes

---

## Después de procesar

1. Revisar imágenes en `imagenes_hoco_productos_processed/`
2. Si están bien, reemplazar las originales:
   ```bash
   # Backup de originales
   mv client/public/imagenes_hoco_productos client/public/imagenes_hoco_productos_backup
   
   # Usar las procesadas
   mv client/public/imagenes_hoco_productos_processed client/public/imagenes_hoco_productos
   ```
3. Commit y push a GitHub
4. Vercel desplegará automáticamente

---

## Contacto
Si necesitas ayuda con alguna opción, avísame.
