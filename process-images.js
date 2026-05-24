/**
 * Script para procesar imágenes: remover fondo y reescalar
 * Usa @imgly/background-removal (funciona en Node.js)
 * 
 * Instalación:
 * npm install @imgly/background-removal sharp
 * 
 * Uso:
 * node process-images.js
 */

const fs = require('fs').promises;
const path = require('path');
const sharp = require('sharp');
const { removeBackground } = require('@imgly/background-removal-node');

const INPUT_DIR = path.join(__dirname, 'client', 'public', 'imagenes_hoco_productos');
const OUTPUT_DIR = path.join(__dirname, 'client', 'public', 'imagenes_hoco_productos_sin_fondo');
const TARGET_SIZE = 1200;

async function processImage(inputPath, outputPath) {
  try {
    const filename = path.basename(inputPath);
    console.log(`Procesando: ${filename}`);
    
    // Leer imagen
    const imageBuffer = await fs.readFile(inputPath);
    
    // Remover fondo
    const blob = await removeBackground(imageBuffer);
    const arrayBuffer = await blob.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    
    // Procesar con sharp: redimensionar y centrar
    const image = sharp(buffer);
    const metadata = await image.metadata();
    
    // Calcular dimensiones manteniendo aspect ratio
    const scale = Math.min(TARGET_SIZE / metadata.width, TARGET_SIZE / metadata.height);
    const newWidth = Math.round(metadata.width * scale);
    const newHeight = Math.round(metadata.height * scale);
    
    // Redimensionar y agregar padding para centrar
    await image
      .resize(newWidth, newHeight, {
        fit: 'contain',
        background: { r: 0, g: 0, b: 0, alpha: 0 }
      })
      .extend({
        top: Math.floor((TARGET_SIZE - newHeight) / 2),
        bottom: Math.ceil((TARGET_SIZE - newHeight) / 2),
        left: Math.floor((TARGET_SIZE - newWidth) / 2),
        right: Math.ceil((TARGET_SIZE - newWidth) / 2),
        background: { r: 0, g: 0, b: 0, alpha: 0 }
      })
      .png({ quality: 95, compressionLevel: 9 })
      .toFile(outputPath);
    
    console.log(`✓ Guardado: ${path.basename(outputPath)}`);
    return true;
  } catch (error) {
    console.error(`✗ Error procesando ${path.basename(inputPath)}: ${error.message}`);
    return false;
  }
}

async function main() {
  try {
    // Crear directorio de salida
    await fs.mkdir(OUTPUT_DIR, { recursive: true });
    
    // Obtener todas las imágenes
    const files = await fs.readdir(INPUT_DIR);
    const imageFiles = files.filter(file => 
      /\.(png|jpg|jpeg)$/i.test(file)
    );
    
    console.log(`Encontradas ${imageFiles.length} imágenes para procesar`);
    console.log(`Directorio de salida: ${OUTPUT_DIR}`);
    console.log('-'.repeat(50));
    
    let successCount = 0;
    
    // Procesar cada imagen
    for (let i = 0; i < imageFiles.length; i++) {
      const inputPath = path.join(INPUT_DIR, imageFiles[i]);
      const outputPath = path.join(OUTPUT_DIR, imageFiles[i].replace(/\.(jpg|jpeg)$/i, '.png'));
      
      console.log(`[${i + 1}/${imageFiles.length}] `);
      
      if (await processImage(inputPath, outputPath)) {
        successCount++;
      }
    }
    
    console.log('-'.repeat(50));
    console.log(`✓ Completado: ${successCount}/${imageFiles.length} imágenes procesadas`);
    console.log(`Imágenes guardadas en: ${OUTPUT_DIR}`);
    console.log('\nPara usar las nuevas imágenes:');
    console.log('1. Revisa las imágenes procesadas');
    console.log('2. Reemplaza las originales o actualiza las rutas');
    
  } catch (error) {
    console.error('Error:', error);
  }
}

main();
