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

const type = params.type === 'texts' ? 'texts' : 'blog';
const slug = params.slug;
const date = params.date || new Date().toISOString().slice(0, 10);

if (!slug) {
  console.error('エラー: --slug を指定してください');
  process.exit(1);
}

const dir = path.join('content', type);
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}
const filename = `${date}-${slug}.md`;
const filepath = path.join(dir, filename);

if (fs.existsSync(filepath)) {
  console.error('エラー: すでに同名の記事が存在します');
  process.exit(1);
}

const template = `---
title: "タイトルを入力"
date: "${date}"
description: ""
tags: []
---

ここに本文を書いてください。
`;

fs.writeFileSync(filepath, template, 'utf8');
console.log(`✅ 記事ファイルを作成しました: ${filepath}`); 