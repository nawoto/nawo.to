/* eslint-disable no-console */
/* global process, console */
// public/images/{backtrace,logs,texts} のクリーンアップスクリプト
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const collections = ['backtrace', 'logs', 'texts'];

// クリーンアップ処理
function cleanupImages() {
  for (const collection of collections) {
    const destRoot = path.join(__dirname, `../public/images/${collection}`);
    if (fs.existsSync(destRoot)) {
      fs.rmSync(destRoot, { recursive: true, force: true });
      console.log(`🧹 Cleaned up: ${destRoot}`);
    } else {
      console.log(`📁 No directory to clean: ${destRoot}`);
    }
  }
  console.log('✅ Image cleanup completed');
}

cleanupImages();
