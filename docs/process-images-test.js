/**
 * Script de prueba: procesa solo 5 imágenes
 */

const fs = require('fs').promises;
const path = require('path');
const sharp = require('sharp');
const { removeBackground } = require('@imgly/background-removal-node');

const INPUT_DIR = path.join(__dirname, 'client', 'public', 'imagenes_hoco_productos');
const OUTPUT_DIR = path.join(__dirname, 'client', 'public', 'imagenes_hoco_productos_sin_fondo');
const TARGET_SIZE = 1200;
const MAX_IMAGES = 5; // Solo procesar 5 imágenes de prueba

async function processImage(inputPath, outputPath) {
  try {
    const filename = path.basename(inputPath);
    console.log(`Procesando: ${filename}`);
    
    const imageBuffer = await fs.readFile(inputPath);
    const blob = await removeBackground(imageBuffer);
    const arrayBuffer = await blob.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    
    const image = sharp(buffer);
    const metadata = await image.metadata();
    
    const scale = Math.min(TARGET_SIZE / metadata.width, TARGET_SIZE / metadata.height);
    const newWidth = Math.round(metadata.width * scale);
    const newHeight = Math.round(metadata.height * scale);
    
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
    console.error(`✗ Error: ${error.message}`);
    return false;
  }
}

async function main() {
  try {
    await fs.mkdir(OUTPUT_DIR, { recursive: true });
    
    const files = await fs.readdir(INPUT_DIR);
    const imageFiles = files.filter(file => 
      /\.(png|jpg|jpeg)$/i.test(file)
    ).slice(0, MAX_IMAGES); // Solo las primeras 5
    
    console.log(`Procesando ${imageFiles.length} imágenes de prueba...`);
    console.log('-'.repeat(50));
    
    let successCount = 0;
    
    for (let i = 0; i < imageFiles.length; i++) {
      const inputPath = path.join(INPUT_DIR, imageFiles[i]);
      const outputPath = path.join(OUTPUT_DIR, imageFiles[i].replace(/\.(jpg|jpeg)$/i, '.png'));
      
      console.log(`[${i + 1}/${imageFiles.length}]`);
      
      if (await processImage(inputPath, outputPath)) {
        successCount++;
      }
    }
    
    console.log('-'.repeat(50));
    console.log(`✓ Completado: ${successCount}/${imageFiles.length} imágenes`);
    console.log(`\nRevisa las imágenes en: ${OUTPUT_DIR}`);
    console.log('\nSi te gustan los resultados, ejecuta PROCESAR_IMAGENES.bat');
    console.log('para procesar todas las 134 imágenes.');
    
  } catch (error) {
    console.error('Error:', error);
  }
}

main();
