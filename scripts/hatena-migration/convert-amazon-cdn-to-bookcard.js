#!/usr/bin/env node

/* global console, process */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { glob } from 'glob';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ASINから書籍IDへのマッピング
const asinToBookId = {
  4839924023: 'agile-estimating',
  '487311392X': 'head-first-software',
  4798122971: 'business-model-generation',
  4798128147: 'business-model-you',
  4873115914: 'running-lean',
};

// 書籍情報
const bookInfo = {
  'agile-estimating': {
    title: 'アジャイルな見積りと計画づくり ~価値あるソフトウェアを育てる概念と技法~',
    author: 'Mike Cohn (著)・マイクコーン (著)・安井力 (著)・角谷信太郎 (著)',
    description: 'アジャイル開発における見積りと計画づくりの実践的な技法を解説。',
    asin: '4839924023',
  },
  'head-first-software': {
    title: 'Head Firstソフトウェア開発 ―頭とからだで覚えるソフトウェア開発の基本',
    author: 'Dan Pilone (著)・Russ Miles (著)・木下哲也 (監訳)・有限会社福龍興業 (著)',
    description: 'ソフトウェア開発の基本を視覚的に学べるHead Firstシリーズの一冊。',
    asin: '487311392X',
  },
  'business-model-generation': {
    title: 'ビジネスモデル・ジェネレーション ビジネスモデル設計書',
    author: 'アレックス・オスターワルダー (著)・イヴ・ピニュール (著)・小山龍介 (著)',
    description: 'ビジネスモデルの設計と分析のための実践的なフレームワークを提供。',
    asin: '4798122971',
  },
  'business-model-you': {
    title: 'ビジネスモデルYOU',
    author:
      'ティム・クラーク (著)・アレックス・オスターワルダー (著)・イヴ・ピニュール (著)・神田昌典 (著)',
    description: '個人のキャリアとビジネスモデルを組み合わせた新しいキャリア設計手法。',
    asin: '4798128147',
  },
  'running-lean': {
    title: 'Running Lean ―実践リーンスタートアップ (THE LEAN SERIES)',
    author: 'Ash Maurya (著)・井口耕二 (訳)',
    description: 'リーンスタートアップの実践的な手法とツールを体系的に解説。',
    asin: '4873115914',
  },
};

const targetDir = path.join('src', 'content', 'backtrace');
const pattern = path.join(targetDir, '**/*.md');

// Amazon CDNの画像リンクパターンを検出する正規表現
const amazonCdnPattern =
  /\[!\[([^\]]+)\]\(https:\/\/images-fe\.ssl-images-amazon\.com\/images\/I\/[^)]+\)\]\([^)]+\)\[([^\]]+)\]\([^)]+\)/g;

// ASINを抽出する関数
function extractAsin(text) {
  const asinMatch = text.match(/ASIN\/([A-Z0-9]+)/);
  return asinMatch ? asinMatch[1] : null;
}

// 書籍IDを取得する関数
function getBookId(asin) {
  return asinToBookId[asin] || null;
}

// ファイルを処理
function processFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const lines = content.split('\n');
    let modified = false;
    const newLines = [];
    let i = 0;

    while (i < lines.length) {
      const line = lines[i];

      // Amazon CDNの画像リンクを検出
      if (line.includes('images-fe.ssl-images-amazon.com')) {
        const asin = extractAsin(line);
        if (asin) {
          const bookId = getBookId(asin);
          if (bookId) {
            // [book:id]形式に変換
            newLines.push(`[book:${bookId}]`);
            console.log(
              `✅ 変換: ${path.relative(process.cwd(), filePath)} - ${asin} -> [book:${bookId}]`
            );
            modified = true;
          } else {
            console.log(`⚠️  対応する書籍IDが見つかりません: ${asin}`);
            newLines.push(line);
          }
        } else {
          console.log(`⚠️  ASINが見つかりません: ${line.substring(0, 50)}...`);
          newLines.push(line);
        }
      } else {
        newLines.push(line);
      }

      i++;
    }

    if (modified) {
      fs.writeFileSync(filePath, newLines.join('\n'), 'utf8');
      return true;
    }

    return false;
  } catch (error) {
    console.error(`❌ ファイル処理エラー ${filePath}:`, error.message);
    return false;
  }
}

// メイン処理
async function main() {
  console.log('🚀 Amazon CDN画像リンクをBookCard形式に変換開始...\n');

  try {
    const files = await glob(pattern);
    let processedCount = 0;
    let updatedCount = 0;

    for (const file of files) {
      processedCount++;
      if (processFile(file)) {
        updatedCount++;
      }
    }

    console.log('\n📊 変換結果:');
    console.log(`📁 処理ファイル数: ${processedCount}`);
    console.log(`✅ 更新ファイル数: ${updatedCount}`);
    console.log('\n🎉 変換完了！');
  } catch (error) {
    console.error('❌ エラーが発生しました:', error.message);
    process.exit(1);
  }
}

main();
