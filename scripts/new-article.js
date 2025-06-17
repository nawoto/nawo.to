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

// 短縮オプションの処理
let type = 'blog';
if (params.type === 'texts' || params.texts) {
  type = 'texts';
} else if (params.blog) {
  type = 'blog';
}

const slug = params.slug;
const now = new Date();
const date = params.date || now.toISOString().slice(0, 10);
const dateTime = params.date ? `${params.date}T00:00:00+09:00` : now.toISOString().replace('Z', '+09:00');

if (!slug) {
  console.error('エラー: --slug を指定してください');
  process.exit(1);
}

// 日付からディレクトリ構造を作成
const [year, month, day] = date.split('-');
const dir = path.join('src/content', type, year, month, day);
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}
const filename = `${slug}.md`;
const filepath = path.join(dir, filename);

if (fs.existsSync(filepath)) {
  console.error('エラー: すでに同名の記事が存在します');
  process.exit(1);
}

const template = `---
title: "タイトルを入力"
pubDate: "${dateTime}"
description: ""
tags: []
---

ここに本文を書いてください。
`;

fs.writeFileSync(filepath, template, 'utf8');
console.log(`✅ 記事ファイルを作成しました: ${filepath}`); 