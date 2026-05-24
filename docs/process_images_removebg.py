"""
Script para procesar imágenes usando remove.bg API
Requiere: pip install requests pillow

1. Crear cuenta en https://www.remove.bg/
2. Obtener API key de https://www.remove.bg/api
3. Reemplazar 'TU_API_KEY_AQUI' con tu API key
4. Ejecutar: python process_images_removebg.py
"""

import os
import requests
from pathlib import Path
from PIL import Image
import io

# CONFIGURACIÓN
API_KEY = 'TU_API_KEY_AQUI'  # ⚠️ REEMPLAZAR CON TU API KEY
INPUT_DIR = Path("client/public/imagenes_hoco_productos")
OUTPUT_DIR = Path("client/public/imagenes_hoco_productos_sin_fondo")
TARGET_SIZE = (1200, 1200)

def remove_background_api(input_path, output_path):
    """Remueve fondo usando remove.bg API"""
    try:
        print(f"Procesando: {input_path.name}")
        
        with open(input_path, 'rb') as input_file:
            response = requests.post(
                'https://api.remove.bg/v1.0/removebg',
                files={'image_file': input_file},
                data={'size': 'auto'},
                headers={'X-Api-Key': API_KEY},
            )
        
        if response.status_code == requests.codes.ok:
            # Abrir imagen sin fondo
            img = Image.open(io.BytesIO(response.content))
            
            # Redimensionar manteniendo aspect ratio
            img.thumbnail(TARGET_SIZE, Image.Resampling.LANCZOS)
            
            # Crear canvas transparente
            new_img = Image.new('RGBA', TARGET_SIZE, (0, 0, 0, 0))
            
            # Centrar imagen
            x = (TARGET_SIZE[0] - img.width) // 2
            y = (TARGET_SIZE[1] - img.height) // 2
            new_img.paste(img, (x, y), img)
            
            # Guardar
            new_img.save(output_path, 'PNG', optimize=True)
            print(f"✓ Guardado: {output_path.name}")
            return True
        else:
            print(f"✗ Error API: {response.status_code} - {response.text}")
            return False
            
    except Exception as e:
        print(f"✗ Error: {str(e)}")
        return False

def main():
    if API_KEY == 'TU_API_KEY_AQUI':
        print("⚠️  ERROR: Debes configurar tu API key primero!")
        print("1. Crear cuenta en https://www.remove.bg/")
        print("2. Obtener API key de https://www.remove.bg/api")
        print("3. Reemplazar 'TU_API_KEY_AQUI' en este script")
        return
    
    # Crear directorio de salida
    OUTPUT_DIR.mkdir(exist_ok=True)
    
    # Obtener todas las imágenes
    image_files = list(INPUT_DIR.glob("*.png")) + list(INPUT_DIR.glob("*.jpeg")) + list(INPUT_DIR.glob("*.jpg"))
    
    print(f"Encontradas {len(image_files)} imágenes")
    print(f"Directorio de salida: {OUTPUT_DIR}")
    print("-" * 50)
    
    success_count = 0
    
    # Procesar cada imagen
    for i, input_path in enumerate(image_files, 1):
        output_path = OUTPUT_DIR / f"{input_path.stem}.png"
        print(f"[{i}/{len(image_files)}] ", end="")
        
        if remove_background_api(input_path, output_path):
            success_count += 1
    
    print("-" * 50)
    print(f"✓ Completado: {success_count}/{len(image_files)} imágenes procesadas")
    print(f"Imágenes guardadas en: {OUTPUT_DIR}")

if __name__ == "__main__":
    main()
