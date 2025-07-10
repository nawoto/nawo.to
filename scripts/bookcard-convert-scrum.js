#!/usr/bin/env node
// backtrace配下のScrum Boot Camp The Book AmazonリンクMarkdownをBookCard形式HTMLに一括変換
import fs from 'fs';
import path from 'path';
import { glob } from 'glob';

const SCRUM_BOOT_CAMP = {
  title: 'SCRUM BOOT CAMP THE BOOK【増補改訂版】 スクラムチームではじめるアジャイル開発',
  author: '西村 直人 (著)・永瀬 美穂 (著)・吉羽 龍太郎 (著)',
  description: 'スクラム開発の基礎から実践まで、体系的に学べる実践的なガイドブック。増補改訂版。',
  amazon: 'http://www.amazon.co.jp/exec/obidos/ASIN/B086GBXRN6/nawoto07-22/',
  coverImage: '/images/books/scrum-bootcamp-the-book-cover.png',
};

const targetDir = path.join('src', 'content', 'backtrace');
const pattern = path.join(targetDir, '**/*.md');

// 変換対象の開始・終了判定文字列
const START_MARKER = '[![SCRUM BOOT CAMP THE BOOK';
const END_MARKER = '[この商品を含むブログ';

const bookCardHtml = `
<div class="book-card group">
  <div class="book-cover">
    <picture>
      <source srcset="${SCRUM_BOOT_CAMP.coverImage.replace('.png', '.webp')}" type="image/webp">
      <img src="${SCRUM_BOOT_CAMP.coverImage}" alt="${SCRUM_BOOT_CAMP.title} の表紙" class="w-full h-auto rounded-lg shadow-md">
    </picture>
  </div>
  <div class="book-content">
    <h3 class="book-title text-lg font-semibold mb-2">📚 ${SCRUM_BOOT_CAMP.title}</h3>
    <p class="book-author text-sm text-gray-600 mb-3">著者: <strong>${SCRUM_BOOT_CAMP.author.split(' (著)')[0]}</strong></p>
    <p class="book-description text-sm text-gray-700 mb-4">${SCRUM_BOOT_CAMP.description}</p>
    <a href="${SCRUM_BOOT_CAMP.amazon}" class="inline-block bg-orange-500 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 group-hover:bg-green-500 group-hover:text-white">
      Amazonで購入
    </a>
  </div>
</div>
`;

async function convertScrumBootCampBookCards() {
  console.log('🔍 Scrum Boot Camp The Bookの記事を検索中...');

  const files = await glob(pattern);
  let convertedCount = 0;

  for (const file of files) {
    const content = fs.readFileSync(file, 'utf-8');
    const lines = content.split('\n');
    let modified = false;
    const newLines = [];
    let i = 0;

    while (i < lines.length) {
      const line = lines[i];

      // 開始マーカーを検出
      if (line.includes(START_MARKER)) {
        const startIndex = i;
        let endIndex = i;

        // 終了マーカーを探す
        for (let j = i; j < lines.length; j++) {
          if (lines[j].includes(END_MARKER)) {
            endIndex = j;
            break;
          }
        }

        // 終了マーカーが見つからない場合は、単純な画像リンクとして扱う
        if (endIndex === i) {
          endIndex = i; // その行自体を終了とする
        }

        // BookCard HTMLを挿入
        newLines.push(bookCardHtml);
        i = endIndex + 1; // 終了行の次の行から再開
        modified = true;
        convertedCount++;

        console.log(`✅ 変換: ${path.relative(process.cwd(), file)}`);
      } else {
        newLines.push(line);
        i++;
      }
    }

    if (modified) {
      fs.writeFileSync(file, newLines.join('\n'), 'utf-8');
    }
  }

  console.log(`\n🎉 変換完了！${convertedCount}ファイルが変換されました。`);
}

convertScrumBootCampBookCards().catch(console.error);
