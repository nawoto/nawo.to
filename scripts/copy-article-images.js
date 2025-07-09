/* eslint-disable no-console */
// src/content/{backtrace,logs,texts}/**/images/* を public/images/{backtrace,logs,texts}/**/images/* にコピーし、jpg/pngはwebpに変換するスクリプト
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const collections = ['backtrace', 'logs', 'texts'];
const extsToConvert = ['.jpg', '.jpeg', '.png'];

// クリーンアップ処理
function cleanupImages() {
  for (const collection of collections) {
    const destRoot = path.join(__dirname, `../public/images/${collection}`);
    if (fs.existsSync(destRoot)) {
      fs.rmSync(destRoot, { recursive: true, force: true });

      console.log(`🧹 Cleaned up: ${destRoot}`);
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
          console.log(`Converted: ${srcPath} -> ${destWebp}`);
        })
        .catch((err) => {
          console.error(`Failed to convert ${srcPath}:`, err);
        });
    } else if (ext === '.webp') {
      // webpはそのままコピー
      const destWebp = path.join(dest, entry.name);
      fs.copyFileSync(srcPath, destWebp);
    }
  }
}

function processCollection(collection) {
  const srcRoot = path.join(__dirname, `../src/content/${collection}`);
  const destRoot = path.join(__dirname, `../public/images/${collection}`);

  if (!fs.existsSync(srcRoot)) return;

  const yearDirs = fs
    .readdirSync(srcRoot, { withFileTypes: true })
    .filter((entry) => entry.isDirectory() && /^\d{4}$/.test(entry.name));

  for (const yearDir of yearDirs) {
    const yearPath = path.join(srcRoot, yearDir.name);
    const imagesDir = path.join(yearPath, 'images');

    if (!fs.existsSync(imagesDir)) continue;

    // 画像ディレクトリ内の記事フォルダをスキャン
    const articleDirs = fs
      .readdirSync(imagesDir, { withFileTypes: true })
      .filter((entry) => entry.isDirectory());

    for (const articleDir of articleDirs) {
      const articleSlug = articleDir.name;
      const articleImagesDir = path.join(imagesDir, articleSlug);

      if (collection === 'texts') {
        // texts: slugベース
        const destDir = path.join(destRoot, articleSlug);
        if (fs.existsSync(articleImagesDir)) {
          copyDirWithWebp(articleImagesDir, destDir);
        }
      } else {
        // logs/backtrace: 日付ベース
        // 記事フォルダ名から記事ファイルを特定
        const articleFiles = fs.readdirSync(yearPath).filter((file) => file.endsWith('.md'));
        for (const articleFile of articleFiles) {
          // 記事ファイル名にslugが含まれているかチェック
          if (articleFile.includes(articleSlug)) {
            const dateMatch = articleFile.match(/^(\d{4})-(\d{2})-(\d{2})-/);
            if (dateMatch) {
              const [, year, month, day] = dateMatch;
              const destDir = path.join(destRoot, year, month, day);
              if (fs.existsSync(articleImagesDir)) {
                copyDirWithWebp(articleImagesDir, destDir);
              }
              break;
            }
          }
        }
      }
    }
  }
}

// クリーンアップ実行
cleanupImages();

for (const collection of collections) {
  processCollection(collection);
}
console.log('🖼️ backtrace, logs, texts の記事画像コピー＆webp変換完了');
