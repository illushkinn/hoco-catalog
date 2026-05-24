import sharp from 'sharp';
import { readdir, mkdir } from 'fs/promises';
import { join, parse } from 'path';

const INPUT_DIR = './client/public/Fundas Neopren';
const OUTPUT_DIR = './client/public/Fundas Neopren_webp';
const QUALITY = 85; // Calidad WebP (80-90 recomendado)

async function convertToWebP() {
  try {
    // Crear directorio de salida
    await mkdir(OUTPUT_DIR, { recursive: true });
    
    // Leer todas las imágenes
    const files = await readdir(INPUT_DIR);
    const imageFiles = files.filter(file => 
      /\.(jpg|jpeg|png)$/i.test(file)
    );
    
    console.log(`📸 Encontradas ${imageFiles.length} imágenes para convertir\n`);
    
    let converted = 0;
    let errors = 0;
    
    for (const file of imageFiles) {
      try {
        const inputPath = join(INPUT_DIR, file);
        const { name } = parse(file);
        const outputPath = join(OUTPUT_DIR, `${name}.webp`);
        
        const info = await sharp(inputPath)
          .webp({ quality: QUALITY })
          .toFile(outputPath);
        
        const originalSize = (await sharp(inputPath).metadata()).size;
        const reduction = ((1 - info.size / originalSize) * 100).toFixed(1);
        
        console.log(`✅ ${file} → ${name}.webp (${reduction}% más liviano)`);
        converted++;
      } catch (err) {
        console.error(`❌ Error con ${file}:`, err.message);
        errors++;
      }
    }
    
    console.log(`\n🎉 Conversión completada:`);
    console.log(`   ✅ ${converted} imágenes convertidas`);
    if (errors > 0) console.log(`   ❌ ${errors} errores`);
    console.log(`\n📁 Imágenes WebP en: ${OUTPUT_DIR}`);
    
  } catch (err) {
    console.error('❌ Error fatal:', err);
    process.exit(1);
  }
}

convertToWebP();
