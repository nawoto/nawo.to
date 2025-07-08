// src/content/{backtrace,logs,texts}/**/images/* を public/images/{backtrace,logs,texts}/**/images/* にコピーし、jpg/pngはwebpに変換するスクリプト
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const collections = ['backtrace', 'logs', 'texts'];
const extsToConvert = ['.jpg', '.jpeg', '.png'];

function copyImagesRecursively(srcDir, destDir) {
  if (!fs.existsSync(srcDir)) return;
  const entries = fs.readdirSync(srcDir, { withFileTypes: true });
  for (const entry of entries) {
    const srcPath = path.join(srcDir, entry.name);
    const destPath = path.join(destDir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === 'images') {
        // imagesディレクトリをコピー（変換あり）
        copyDirWithWebp(srcPath, destPath);
      } else {
        copyImagesRecursively(srcPath, path.join(destDir, entry.name));
      }
    }
  }
}

function copyDirWithWebp(src, dest) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }
  const entries = fs.readdirSync(src, { withFileTypes: true });
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const ext = path.extname(entry.name).toLowerCase();
    if (entry.isDirectory()) {
      copyDirWithWebp(srcPath, path.join(dest, entry.name));
    } else if (extsToConvert.includes(ext)) {
      // jpg/pngはwebpに変換
      const destWebp = path.join(dest, path.basename(entry.name, ext) + '.webp');
      sharp(srcPath)
        .webp({ quality: 90 })
        .toFile(destWebp)
        .then(() => {
          // eslint-disable-next-line no-console
          console.log(`Converted: ${srcPath} -> ${destWebp}`);
        })
        .catch((err) => {
          // eslint-disable-next-line no-console
          console.error(`Failed to convert ${srcPath}:`, err);
        });
    } else if (ext === '.webp') {
      // webpはそのままコピー
      const destWebp = path.join(dest, entry.name);
      fs.copyFileSync(srcPath, destWebp);
    }
  }
}

for (const collection of collections) {
  const srcRoot = path.join(__dirname, `../src/content/${collection}`);
  const destRoot = path.join(__dirname, `../public/images/${collection}`);
  copyImagesRecursively(srcRoot, destRoot);
}
console.log('🖼️ backtrace, logs, texts の記事画像コピー＆webp変換完了');
