/**
 * Script de optimización de imágenes usando Sharp
 * Convierte PNG/JPEG a WebP optimizado
 */

const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const INPUT_DIR = path.join(__dirname, 'client', 'public', 'imagenes_hoco_productos');
const OUTPUT_DIR = path.join(__dirname, 'client', 'public', 'imagenes_optimizadas');

// Configuración de optimización
const WEBP_QUALITY = 85;
const MAX_WIDTH = 1200;
const MAX_HEIGHT = 1200;

async function optimizeImage(inputPath, outputPath) {
  try {
    const filename = path.basename(inputPath);
    const outputFilename = filename.replace(/\.(png|jpg|jpeg)$/i, '.webp');
    const finalOutputPath = path.join(OUTPUT_DIR, outputFilename);

    console.log(`Procesando: ${filename}`);

    // Leer metadata
    const metadata = await sharp(inputPath).metadata();
    
    // Calcular dimensiones manteniendo aspect ratio
    let width = metadata.width;
    let height = metadata.height;
    
    if (width > MAX_WIDTH || height > MAX_HEIGHT) {
      const ratio = Math.min(MAX_WIDTH / width, MAX_HEIGHT / height);
      width = Math.round(width * ratio);
      height = Math.round(height * ratio);
    }

    // Optimizar y convertir a WebP
    await sharp(inputPath)
      .resize(width, height, {
        fit: 'inside',
        withoutEnlargement: true
      })
      .webp({ quality: WEBP_QUALITY })
      .toFile(finalOutputPath);

    const inputSize = fs.statSync(inputPath).size;
    const outputSize = fs.statSync(finalOutputPath).size;
    const reduction = ((1 - outputSize / inputSize) * 100).toFixed(1);

    console.log(`✓ ${outputFilename} - Reducción: ${reduction}% (${(inputSize / 1024).toFixed(0)}KB → ${(outputSize / 1024).toFixed(0)}KB)`);
    
    return { success: true, reduction: parseFloat(reduction), inputSize, outputSize };
  } catch (error) {
    console.error(`✗ Error procesando ${path.basename(inputPath)}: ${error.message}`);
    return { success: false, error: error.message };
  }
}

async function main() {
  console.log('========================================');
  console.log('OPTIMIZADOR DE IMÁGENES - Sharp + WebP');
  console.log('========================================\n');

  // Crear directorio de salida
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  // Obtener todas las imágenes
  const files = fs.readdirSync(INPUT_DIR);
  const imageFiles = files.filter(file => /\.(png|jpg|jpeg)$/i.test(file));

  console.log(`Encontradas ${imageFiles.length} imágenes para optimizar\n`);
  console.log('Configuración:');
  console.log(`- Formato: WebP`);
  console.log(`- Calidad: ${WEBP_QUALITY}`);
  console.log(`- Tamaño máximo: ${MAX_WIDTH}x${MAX_HEIGHT}px\n`);
  console.log('-'.repeat(50) + '\n');

  let totalInputSize = 0;
  let totalOutputSize = 0;
  let successCount = 0;

  // Procesar cada imagen
  for (let i = 0; i < imageFiles.length; i++) {
    const inputPath = path.join(INPUT_DIR, imageFiles[i]);
    console.log(`[${i + 1}/${imageFiles.length}]`);
    
    const result = await optimizeImage(inputPath);
    
    if (result.success) {
      successCount++;
      totalInputSize += result.inputSize;
      totalOutputSize += result.outputSize;
    }
    
    console.log('');
  }

  // Resumen
  console.log('-'.repeat(50));
  console.log('\n✓ OPTIMIZACIÓN COMPLETADA!\n');
  console.log(`Imágenes procesadas: ${successCount}/${imageFiles.length}`);
  console.log(`Tamaño original: ${(totalInputSize / 1024 / 1024).toFixed(2)} MB`);
  console.log(`Tamaño optimizado: ${(totalOutputSize / 1024 / 1024).toFixed(2)} MB`);
  console.log(`Reducción total: ${((1 - totalOutputSize / totalInputSize) * 100).toFixed(1)}%`);
  console.log(`\nImágenes guardadas en: ${OUTPUT_DIR}`);
  console.log('\nPróximos pasos:');
  console.log('1. Revisa las imágenes optimizadas');
  console.log('2. Haz backup de las originales');
  console.log('3. Reemplaza las imágenes originales');
  console.log('4. Actualiza las rutas en el código (cambiar .png/.jpg a .webp)');
  console.log('5. Commit y push a GitHub\n');
}

main().catch(console.error);
