import sharp from 'sharp';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function generateFavicon() {
  const inputPath = join(__dirname, '..', 'public', 'images', 'site-icon.png');
  const outputPath = join(__dirname, '..', 'public', 'favicon.ico');

  try {
    // 16x16のサイズにリサイズしてICOファイルを生成
    await sharp(inputPath)
      .resize(16, 16)
      .toFile(outputPath);
    console.log('✅ Favicon generated successfully!');
  } catch (error) {
    console.error('❌ Error generating favicon:', error);
    process.exit(1);
  }
}

generateFavicon(); 