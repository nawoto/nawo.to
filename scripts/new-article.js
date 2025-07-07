#!/usr/bin/env node
import fs from 'fs';
import path from 'path';

// コマンド引数のパース
const args = process.argv.slice(2);
const params = {};
for (let i = 0; i < args.length; i++) {
  if (args[i].startsWith('--')) {
    const key = args[i].replace(/^--/, '');
    const value = args[i + 1] && !args[i + 1].startsWith('--') ? args[i + 1] : true;
    params[key] = value;
  }
}

// ヘルプ表示
if (params.help || args.length === 0) {
  console.log(`
記事作成スクリプト

使用方法:
  node scripts/new-article.js --slug <スラッグ> [オプション]

オプション:
  --type <logs|texts>    記事タイプ (デフォルト: logs)
  --date <YYYY-MM-DD>    日付 (デフォルト: 今日)
  --title <タイトル>     記事タイトル
  --description <説明>   記事の説明
  --template <テンプレート> テンプレート名
  --idea                 ネタストック一覧表示
  --help                 このヘルプを表示

例:
  node scripts/new-article.js --slug switch2-unboxing --type logs --title "Switch2開封記"
  node scripts/new-article.js --idea
`);
  process.exit(0);
}

// ネタストック一覧表示
if (params.idea) {
  const ideasPath = path.join(process.cwd(), 'docs', 'content-ideas.md');
  if (fs.existsSync(ideasPath)) {
    console.log('📝 ネタストック一覧:');
    console.log(fs.readFileSync(ideasPath, 'utf8'));
  } else {
    console.log('❌ docs/content-ideas.md が見つかりません');
  }
  process.exit(0);
}

// デフォルトをlogsに
let type = 'logs';
if (params.type === 'texts' || params.texts) {
  type = 'texts';
} else if (params.blog) {
  type = 'logs'; // logs指定でもlogsに
}

const slug = params.slug;
const now = new Date();
const date = params.date || now.toISOString().slice(0, 10);
const dateTime = params.date
  ? `${params.date}T00:00:00+09:00`
  : now.toISOString().replace('Z', '+09:00');

if (!slug) {
  console.error('エラー: --slug を指定してください');
  console.error('ヘルプを表示するには: node scripts/new-article.js --help');
  process.exit(1);
}

// 日付からディレクトリ構造を作成
const [year, month, day] = date.split('-');
let dir, filepath;

if (type === 'texts') {
  dir = path.join('src/content', type, year);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  const filename = `${date}-${slug}.md`;
  filepath = path.join(dir, filename);
} else {
  // logs用: 年/年-月-日-スラッグ.md
  dir = path.join('src/content', type, year);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  const filename = `${year}-${month}-${day}-${slug}.md`;
  filepath = path.join(dir, filename);
}

if (fs.existsSync(filepath)) {
  console.error('エラー: すでに同名の記事が存在します');
  process.exit(1);
}

// テンプレート選択
const title = params.title || 'タイトルを入力';
const description = params.description || '';

let template = '';
if (type === 'texts') {
  template = `---
title: "${title}"
pubDate: "${dateTime}"
description: "${description}"
---

## はじめに

ここに記事の導入を書いてください。

## 本文

ここに本文を書いてください。

## まとめ

ここにまとめを書いてください。

## 参考リンク

- [参考リンク1](URL)
- [参考リンク2](URL)
`;
} else {
  template = `---
title: "${title}"
pubDate: "${dateTime}"
description: "${description}"
---

ここに本文を書いてください。

## まとめ

ここにまとめを書いてください。
`;
}

fs.writeFileSync(filepath, template, 'utf8');
console.log(`✅ 記事ファイルを作成しました: ${filepath}`);

// ネタストックの更新提案
console.log('\n💡 ネタストックを更新することをお忘れなく！');
console.log('docs/content-ideas.md で完了したネタにチェックを入れてください。');
