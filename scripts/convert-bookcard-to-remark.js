#!/usr/bin/env node

/* global console */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 書籍データのマッピング
const bookMapping = {
  'agile-samurai-cover.png': 'agile-samurai',
  'agile-samurai-cover.webp': 'agile-samurai',
  'scrum-bootcamp-the-book-cover.png': 'scrum-bootcamp',
  'scrum-bootcamp-the-book-cover.webp': 'scrum-bootcamp',
};

// BookCardのHTMLパターンを検出する正規表現
const bookCardPattern = /<div class="book-card group">[\s\S]*?<\/div>\s*<\/div>/g;

// 画像ファイル名から書籍IDを取得
function getBookIdFromImage(imageSrc) {
  const fileName = path.basename(imageSrc);
  return bookMapping[fileName] || null;
}

// BookCardのHTMLを[book:id]形式に変換
function convertBookCardToRemark(match) {
  // 画像ソースを抽出
  const imgMatch = match.match(/src="([^"]+)"/);
  if (!imgMatch) {
    console.log('⚠️ 画像ソースが見つかりません:', match.substring(0, 100));
    return match;
  }

  const imageSrc = imgMatch[1];
  const bookId = getBookIdFromImage(imageSrc);

  if (!bookId) {
    console.log('⚠️ 書籍IDが見つかりません:', imageSrc);
    return match;
  }

  console.log(`✅ 変換: ${imageSrc} → [book:${bookId}]`);
  return `[book:${bookId}]`;
}

// ファイルを処理
function processFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const originalContent = content;

    // BookCardのHTMLを検出して変換
    const newContent = content.replace(bookCardPattern, convertBookCardToRemark);

    // 変更があった場合のみファイルを更新
    if (newContent !== originalContent) {
      fs.writeFileSync(filePath, newContent, 'utf8');
      console.log(`📝 更新: ${filePath}`);
      return true;
    }

    return false;
  } catch (error) {
    console.error(`❌ エラー: ${filePath}`, error.message);
    return false;
  }
}

// ディレクトリ内のMarkdownファイルを再帰的に処理
function processDirectory(dirPath) {
  const items = fs.readdirSync(dirPath);
  let processedCount = 0;
  let updatedCount = 0;

  for (const item of items) {
    const fullPath = path.join(dirPath, item);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      const result = processDirectory(fullPath);
      processedCount += result.processed;
      updatedCount += result.updated;
    } else if (item.endsWith('.md')) {
      processedCount++;
      if (processFile(fullPath)) {
        updatedCount++;
      }
    }
  }

  return { processed: processedCount, updated: updatedCount };
}

// メイン処理
function main() {
  const contentDir = path.join(__dirname, '../src/content');

  console.log('🚀 BookCard HTML → [book:id] 変換を開始します...');
  console.log('📁 処理対象:', contentDir);
  console.log('');

  const result = processDirectory(contentDir);

  console.log('');
  console.log('📊 処理結果:');
  console.log(`  処理ファイル数: ${result.processed}`);
  console.log(`  更新ファイル数: ${result.updated}`);
  console.log('');
  console.log('✨ 変換完了！');
}

main();
