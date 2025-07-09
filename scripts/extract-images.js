#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { glob } from 'glob';

const BACKTRACE_DIR = 'src/content/backtrace/';

// 画像URLを抽出する正規表現
const IMG_PATTERNS = [
  /<img[^>]+src=["']([^"']+)["'][^>]*>/gi,
  /!\[([^\]]*)\]\(([^)]+)\)/gi,
  /\[([^\]]*)\]\(([^)]+\.(?:jpg|jpeg|png|gif|webp))\)/gi,
];

// はてなの画像サーバーパターン
const HATENA_IMG_PATTERNS = [
  /cdn-ak\.f\.st-hatena\.com/,
  /cdn-ak\.v\.st-hatena\.com/,
  /cdn-ak\.b\.st-hatena\.com/,
  /cdn-ak\.s\.st-hatena\.com/,
];

function extractImagesFromContent(content) {
  const images = new Set();

  // <img>タグから抽出
  let match;
  while ((match = IMG_PATTERNS[0].exec(content)) !== null) {
    images.add(match[1]);
  }

  // Markdown画像記法から抽出
  while ((match = IMG_PATTERNS[1].exec(content)) !== null) {
    images.add(match[2]);
  }

  // リンク形式の画像から抽出
  while ((match = IMG_PATTERNS[2].exec(content)) !== null) {
    images.add(match[2]);
  }

  return Array.from(images);
}

function categorizeImages(imageUrls) {
  const categories = {
    hatena: [],
    external: [],
    slideshare: [],
    youtube: [],
    other: [],
  };

  imageUrls.forEach((url) => {
    if (HATENA_IMG_PATTERNS.some((pattern) => pattern.test(url))) {
      categories.hatena.push(url);
    } else if (url.includes('slideshare.net')) {
      categories.slideshare.push(url);
    } else if (url.includes('youtube.com') || url.includes('ytimg.com')) {
      categories.youtube.push(url);
    } else if (url.startsWith('http')) {
      categories.external.push(url);
    } else {
      categories.other.push(url);
    }
  });

  return categories;
}

async function analyzeImages() {
  console.log('🔍 画像URLの抽出・分析を開始...\n');

  const mdFiles = await glob(`${BACKTRACE_DIR}**/*.md`);
  const allImages = new Map(); // ファイルパス -> 画像URL配列

  for (const file of mdFiles) {
    const content = fs.readFileSync(file, 'utf8');
    const images = extractImagesFromContent(content);

    if (images.length > 0) {
      allImages.set(file, images);
    }
  }

  // 統計情報
  const totalFiles = allImages.size;
  const totalImages = Array.from(allImages.values()).flat().length;
  const allImageUrls = Array.from(allImages.values()).flat();
  const categories = categorizeImages(allImageUrls);

  console.log('📊 分析結果:');
  console.log(`- 対象ファイル数: ${totalFiles}`);
  console.log(`- 総画像数: ${totalImages}`);
  console.log(`- はてな画像: ${categories.hatena.length}`);
  console.log(`- 外部画像: ${categories.external.length}`);
  console.log(`- slideshare画像: ${categories.slideshare.length}`);
  console.log(`- YouTube画像: ${categories.youtube.length}`);
  console.log(`- その他: ${categories.other.length}\n`);

  // 詳細レポート
  console.log('📋 詳細レポート:');
  for (const [file, images] of allImages) {
    const relativePath = path.relative(process.cwd(), file);
    console.log(`\n${relativePath}:`);
    images.forEach((img) => {
      const category =
        Object.entries(categories).find(([_, urls]) => urls.includes(img))?.[0] || 'other';
      console.log(`  - [${category}] ${img}`);
    });
  }

  // 結果をファイルに保存
  const report = {
    summary: {
      totalFiles,
      totalImages,
      categories,
    },
    details: Object.fromEntries(allImages),
  };

  fs.writeFileSync('tmp/image-analysis.json', JSON.stringify(report, null, 2));
  console.log('\n💾 詳細結果を tmp/image-analysis.json に保存しました');
}

analyzeImages().catch(console.error);
