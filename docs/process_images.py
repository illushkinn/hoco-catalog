"""
Script para procesar imágenes de productos:
1. Remover fondo (convertir a PNG transparente)
2. Reescalar para mejor resolución

Requisitos:
pip install rembg pillow

Uso:
python process_images.py
"""

import os
from pathlib import Path
from PIL import Image
from rembg import remove

# Configuración
INPUT_DIR = Path("client/public/imagenes_hoco_productos")
OUTPUT_DIR = Path("client/public/imagenes_hoco_productos_processed")
TARGET_SIZE = (1200, 1200)  # Tamaño objetivo (ancho, alto)
QUALITY = 95  # Calidad de compresión (1-100)

def process_image(input_path, output_path):
    """Procesa una imagen: remueve fondo y reescala"""
    try:
        print(f"Procesando: {input_path.name}")
        
        # Abrir imagen
        with open(input_path, 'rb') as input_file:
            input_data = input_file.read()
        
        # Remover fondo
        output_data = remove(input_data)
        
        # Abrir imagen sin fondo
        img = Image.open(io.BytesIO(output_data))
        
        # Convertir a RGBA si no lo está
        if img.mode != 'RGBA':
            img = img.convert('RGBA')
        
        # Calcular nuevo tamaño manteniendo aspect ratio
        img.thumbnail(TARGET_SIZE, Image.Resampling.LANCZOS)
        
        # Crear imagen con fondo transparente del tamaño objetivo
        new_img = Image.new('RGBA', TARGET_SIZE, (0, 0, 0, 0))
        
        # Centrar imagen
        x = (TARGET_SIZE[0] - img.width) // 2
        y = (TARGET_SIZE[1] - img.height) // 2
        new_img.paste(img, (x, y), img)
        
        # Guardar
        new_img.save(output_path, 'PNG', optimize=True, quality=QUALITY)
        print(f"✓ Guardado: {output_path.name}")
        
    except Exception as e:
        print(f"✗ Error procesando {input_path.name}: {str(e)}")

def main():
    # Crear directorio de salida
    OUTPUT_DIR.mkdir(exist_ok=True)
    
    # Obtener todas las imágenes PNG
    image_files = list(INPUT_DIR.glob("*.png")) + list(INPUT_DIR.glob("*.jpeg")) + list(INPUT_DIR.glob("*.jpg"))
    
    print(f"Encontradas {len(image_files)} imágenes para procesar")
    print(f"Directorio de salida: {OUTPUT_DIR}")
    print("-" * 50)
    
    # Procesar cada imagen
    for i, input_path in enumerate(image_files, 1):
        output_path = OUTPUT_DIR / f"{input_path.stem}.png"
        print(f"[{i}/{len(image_files)}] ", end="")
        process_image(input_path, output_path)
    
    print("-" * 50)
    print(f"✓ Procesamiento completado!")
    print(f"Imágenes guardadas en: {OUTPUT_DIR}")
    print("\nPara usar las nuevas imágenes:")
    print("1. Revisa las imágenes procesadas")
    print("2. Reemplaza las originales o actualiza las rutas en el código")

if __name__ == "__main__":
    import io
    main()
