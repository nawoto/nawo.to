#!/usr/bin/env node
import fs from 'fs';
import path from 'path';

const CONTENT_DIRS = [
  { dir: 'src/content/logs', type: 'logs' },
  { dir: 'src/content/texts', type: 'texts' },
];

function parseFrontmatter(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return {};
  const result = {};
  for (const line of match[1].split('\n')) {
    const [key, ...rest] = line.split(':');
    if (key && rest.length)
      result[key.trim()] = rest
        .join(':')
        .trim()
        .replace(/^['"]|['"]$/g, '');
  }
  return result;
}

function findDrafts(dir, type) {
  const drafts = [];
  if (!fs.existsSync(dir)) return drafts;

  for (const year of fs.readdirSync(dir)) {
    const yearDir = path.join(dir, year);
    if (!fs.statSync(yearDir).isDirectory()) continue;
    for (const file of fs.readdirSync(yearDir)) {
      if (!file.endsWith('.md')) continue;
      const filepath = path.join(yearDir, file);
      const content = fs.readFileSync(filepath, 'utf8');
      const fm = parseFrontmatter(content);
      if (fm.draft === 'true') {
        drafts.push({
          type,
          filepath,
          title: fm.title || '(タイトルなし)',
          pubDate: fm.pubDate || '',
        });
      }
    }
  }
  return drafts;
}

const drafts = CONTENT_DIRS.flatMap(({ dir, type }) => findDrafts(dir, type));

if (drafts.length === 0) {
  console.log('下書き記事はありません');
  process.exit(0);
}

console.log(`\n📝 下書き記事一覧 (${drafts.length}件)\n`);
for (const { type, title, pubDate, filepath } of drafts) {
  const date = pubDate ? pubDate.slice(0, 10) : '日付なし';
  console.log(`  [${type}] ${date} ${title}`);
  console.log(`         ${filepath}\n`);
}
