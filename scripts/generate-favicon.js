import sharp from 'sharp';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function generateFavicon() {
  const inputPath = join(__dirname, '..', 'public', 'images', 'site-icon.png');
  const icoOutputPath = join(__dirname, '..', 'public', 'favicon.ico');
  const pngOutputPath = join(__dirname, '..', 'public', 'favicon-32x32.png');

  try {
    // 16x16のサイズにリサイズしてICOファイルを生成
    await sharp(inputPath).resize(16, 16).toFile(icoOutputPath);
    console.log('✅ Favicon.ico generated successfully!');

    // 32x32のサイズにリサイズしてPNGファイルを生成
    await sharp(inputPath).resize(32, 32).toFile(pngOutputPath);
    console.log('✅ Favicon-32x32.png generated successfully!');
  } catch (error) {
    console.error('❌ Error generating favicon:', error);
    process.exit(1);
  }
}

generateFavicon();
