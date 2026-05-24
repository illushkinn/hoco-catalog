import sharp from 'sharp';

async function convertHero() {
  try {
    const info = await sharp('client/public/escaparate.png')
      .webp({ quality: 85 })
      .toFile('client/public/escaparate.webp');
    
    console.log('✅ escaparate.png → escaparate.webp');
    console.log(`   Tamaño: ${(info.size / 1024).toFixed(2)} KB`);
  } catch (err) {
    console.error('❌ Error:', err);
  }
}

convertHero();
