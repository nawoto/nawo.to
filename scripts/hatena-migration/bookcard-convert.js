#!/usr/bin/env node
// backtrace配下のアジャイルサムライAmazonリンクMarkdownをBookCard形式HTMLに一括変換
import fs from 'fs';
import path from 'path';
import { glob } from 'glob';

const AGILE_SAMURAI = {
  title: 'アジャイルサムライ−達人開発者への道',
  author:
    'Jonathan Rasmusson (著)・西村 直人 (監訳)・角谷 信太郎 (監訳)・近藤 修平 (訳)・角掛 拓未 (訳)',
  description:
    'アジャイル開発の実践的なガイド。プロジェクト管理からチーム運営まで、アジャイル開発の本質を学べる一冊。',
  amazon: 'http://www.amazon.co.jp/exec/obidos/ASIN/4274068560/nawoto07-22/',
  coverImage: '/images/books/agile-samurai-cover.png',
};

const targetDir = path.join('src', 'content', 'backtrace');
const pattern = path.join(targetDir, '**/*.md');

// 変換対象の開始・終了判定文字列
const START_MARKER = '[![アジャイルサムライ';
const END_MARKER = '[この商品を含むブログ';

const bookCardHtml = `
<div class="book-card group">
  <div class="book-cover">
    <picture>
      <source srcset="${AGILE_SAMURAI.coverImage.replace('.png', '.webp')}" type="image/webp" />
      <img src="${AGILE_SAMURAI.coverImage}" alt="${AGILE_SAMURAI.title} の表紙" />
    </picture>
  </div>
  <div class="book-content">
    <h3 class="book-title">📚 ${AGILE_SAMURAI.title}</h3>
    <p class="book-author"><strong>西村 直人</strong> (監訳)・角谷 信太郎 (監訳)・近藤 修平 (訳)・角掛 拓未 (訳)</p>
    <p class="book-description">${AGILE_SAMURAI.description}</p>
    <a href="${AGILE_SAMURAI.amazon}" class="amazon-link transition-colors duration-200 group-hover:bg-green-500 group-hover:text-white" target="_blank" rel="noopener noreferrer">
      📖 Amazonで見る
    </a>
  </div>
</div>
`;

const findAndReplaceBlock = (content) => {
  const lines = content.split('\n');
  const newLines = [];
  let i = 0;
  let changed = false;

  while (i < lines.length) {
    const line = lines[i];

    // 開始マーカーを発見
    if (line.includes(START_MARKER)) {
      const startIndex = i;
      let endIndex = i;

      // 終了マーカーを探す（複数行パターン）
      for (let j = i; j < lines.length; j++) {
        if (lines[j].includes(END_MARKER)) {
          endIndex = j;
          break;
        }
      }

      // 終了マーカーが見つからない場合、単純な画像リンクパターンとして扱う
      if (endIndex === startIndex) {
        // 次の行が- で始まるかチェック
        const nextLine = lines[i + 1];
        if (nextLine && nextLine.trim().startsWith('- ')) {
          // 複数行パターンの場合、次の- 行を探す
          for (let j = i + 1; j < lines.length; j++) {
            if (lines[j].includes(END_MARKER)) {
              endIndex = j;
              break;
            }
          }
        } else {
          // 単純な画像リンクパターンの場合、その行自体を終了とする
          endIndex = i;
        }
      }

      // 変換対象が見つかった場合、ブロック全体を変換
      if (endIndex >= startIndex) {
        newLines.push(bookCardHtml);
        i = endIndex + 1; // 終了行の次の行から再開
        changed = true;
        continue;
      }
    }

    // 通常の行はそのまま追加
    newLines.push(line);
    i++;
  }

  return changed ? newLines.join('\n') : content;
};

const main = async () => {
  const files = await glob(pattern);
  let changed = 0;

  for (const file of files) {
    const content = fs.readFileSync(file, 'utf8');
    const newContent = findAndReplaceBlock(content);

    if (content !== newContent) {
      fs.writeFileSync(file, newContent, 'utf8');
      console.log(`✅ 変換: ${file}`);
      changed++;
    }
  }

  console.log(`\n${changed}ファイルをBookCard形式に変換しました。`);
};

main();
