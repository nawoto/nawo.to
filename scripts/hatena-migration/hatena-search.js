#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const EXPORT_FILE = 'tmp/nawoto.hatenadiary.org.export.txt';
const CONTENT_DIR = 'src/content/backtrace/';

// コマンドライン引数パース
const args = process.argv.slice(2);
const showFull = args.includes('--full') || args.includes('-f');
const openMd = args.includes('--open-md');
const searchWords = args.filter((a) => !a.startsWith('-'));

if (!fs.existsSync(EXPORT_FILE)) {
  console.error(`❌ エクスポートファイルが見つかりません: ${EXPORT_FILE}`);
  process.exit(1);
}

const content = fs.readFileSync(EXPORT_FILE, 'utf8');
const entries = content.split('--------').filter((e) => e.trim());

function normalize(str) {
  return str.toLowerCase();
}

function extractMeta(entry) {
  const title = (entry.match(/TITLE: (.+)/) || [])[1] || '';
  const date = (entry.match(/DATE: (.+)/) || [])[1] || '';
  const basename = (entry.match(/BASENAME: (.+)/) || [])[1] || '';
  return { title, date, basename };
}

function mdFilePath(date, basename) {
  // date: MM/DD/YYYY HH:MM:SS or YYYY/MM/DD HH:MM:SS or ISO
  let y, m, d;
  if (/\d{4}-\d{2}-\d{2}/.test(date)) {
    // ISO
    [y, m, d] = date.split('T')[0].split('-');
  } else if (/\d{2}\/\d{2}\/\d{4}/.test(date)) {
    // MM/DD/YYYY
    [m, d, y] = date.split(' ')[0].split('/');
  } else if (/\d{4}\/\d{2}\/\d{2}/.test(date)) {
    // YYYY/MM/DD
    [y, m, d] = date.split(' ')[0].split('/');
  } else {
    return '';
  }
  const id = basename.split('/').pop();
  return path.join(CONTENT_DIR, `${y}/${y}-${m}-${d}-${id}.md`);
}

function matchEntry(entry, words) {
  if (words.length === 0) return false;
  const lower = normalize(entry);
  return words.some((w) => lower.includes(normalize(w)));
}

function matchBasename(entry, words) {
  const { basename } = extractMeta(entry);
  if (!basename) return false;
  return words.some((w) => basename.includes(w));
}

function findHitLines(entry, words) {
  const lines = entry.split('\n');
  return lines.filter((line) => words.some((w) => normalize(line).includes(normalize(w))));
}

let hits = [];
for (const entry of entries) {
  // OR検索: 本文 or BASENAME
  if (matchEntry(entry, searchWords) || matchBasename(entry, searchWords)) {
    hits.push(entry);
  }
}

if (hits.length === 0) {
  console.log('該当記事はありませんでした。');
  process.exit(0);
}

for (const entry of hits) {
  const { title, date, basename } = extractMeta(entry);
  const mdPath = mdFilePath(date, basename);
  console.log('==============================');
  console.log(`TITLE: ${title}`);
  console.log(`DATE: ${date}`);
  console.log(`BASENAME: ${basename}`);
  console.log(`移行後: ${mdPath}`);

  // 該当行
  if (searchWords.length > 0) {
    const lines = findHitLines(entry, searchWords);
    if (lines.length > 0) {
      console.log('\n[該当行]');
      lines.forEach((l) => console.log(l));
    }
  }

  // 全文
  if (showFull) {
    console.log('\n[記事全体]');
    console.log(entry.trim());
  }

  // mdファイルを開く
  if (openMd && mdPath && fs.existsSync(mdPath)) {
    try {
      execSync(`code "${mdPath}"`, { stdio: 'ignore' });
    } catch (e) {
      console.error('VSCodeでmdファイルを開けませんでした。');
    }
  }
}
