import fs from 'fs';
import path from 'path';

// コマンドライン引数のパース
const args = process.argv.slice(2);
let targetYear = null;
let startIndex = 0;
let count = 10; // デフォルト10件
let autoYes = false;

for (let i = 0; i < args.length; i++) {
  const arg = args[i];
  if (arg === '--yes' || arg === '-y') autoYes = true;
  else if (arg === '--year' && args[i + 1]) targetYear = parseInt(args[++i]);
  else if (arg === '--start' && args[i + 1]) startIndex = parseInt(args[++i]);
  else if (arg === '--count' && args[i + 1]) count = parseInt(args[++i]);
}

console.log(`🎯 はてなブログ移行スクリプト（統合版）`);

// エクスポートファイルを読み込み
const exportFile = 'tmp/nawoto.hatenadiary.org.export.txt';
if (!fs.existsSync(exportFile)) {
  console.error('❌ エクスポートファイルが見つかりません:', exportFile);
  process.exit(1);
}
const content = fs.readFileSync(exportFile, 'utf8');

// エントリを抽出
const entries = content.split('--------').filter(entry => entry.trim());
console.log(`📊 総記事数: ${entries.length}件`);

// 年別に記事を分類
const entriesByYear = {};
entries.forEach(entry => {
  const meta = extractMeta(entry);
  if (meta && meta.date) {
    const year = meta.date.getFullYear();
    if (!entriesByYear[year]) entriesByYear[year] = [];
    entriesByYear[year].push({ entry, meta });
  }
});

// 利用可能な年を表示（新しい順）
const availableYears = Object.keys(entriesByYear).sort((a, b) => parseInt(b) - parseInt(a));
console.log(`📅 利用可能な年: ${availableYears.join(', ')}`);

// デフォルトで最新年を設定
if (!targetYear) {
  targetYear = parseInt(availableYears[0]);
  console.log(`📅 デフォルトで最新年（${targetYear}年）を選択しました`);
}

if (!entriesByYear[targetYear]) {
  console.error(`❌ ${targetYear}年の記事が見つかりません`);
  process.exit(1);
}

const yearEntries = entriesByYear[targetYear];
console.log(`📝 ${targetYear}年の記事数: ${yearEntries.length}件`);

// 範囲指定
const endIndex = Math.min(startIndex + count, yearEntries.length);
const targetEntries = yearEntries.slice(startIndex, endIndex);
console.log(`🔢 変換対象: ${startIndex + 1}件目 〜 ${endIndex}件目（${targetEntries.length}件）`);

if (targetEntries.length === 0) {
  console.log('⚠️  指定範囲に記事がありません');
  process.exit(0);
}

// 確認プロンプト or 自動実行
if (autoYes) {
  processEntries(targetEntries, targetYear, startIndex);
} else {
  console.log(`\n🚀 変換を実行しますか？ (y/N)`);
  process.stdin.once('data', (data) => {
    const answer = data.toString().trim().toLowerCase();
    if (answer === 'y' || answer === 'yes') {
      processEntries(targetEntries, targetYear, startIndex);
    } else {
      console.log('❌ 処理をキャンセルしました');
      process.exit(0);
    }
  });
}

function extractMeta(entry) {
  const titleMatch = entry.match(/TITLE: (.+)/);
  const dateMatch = entry.match(/DATE: (.+)/);
  const basenameMatch = entry.match(/BASENAME: (.+)/);
  const bodyMatch = entry.match(/BODY:([\s\S]*?)(?=-----|$)/);
  if (!titleMatch || !dateMatch || !basenameMatch || !bodyMatch) return null;
  const title = titleMatch[1].trim();
  const dateStr = dateMatch[1].trim();
  const basename = basenameMatch[1].trim();
  const body = bodyMatch[1].trim();
  let date;
  try {
    date = new Date(dateStr);
    if (isNaN(date.getTime())) return null;
  } catch (e) { return null; }
  return { title, date, basename, body };
}

function processEntries(entries, year, startIndex) {
  console.log(`\n🔄 ${year}年の記事を処理中...`);
  let successCount = 0;
  let errorCount = 0;
  entries.forEach(({ entry, meta }, i) => {
    try {
      const result = convertToMarkdown(entry, meta, year);
      if (result) {
        successCount++;
        console.log(`✅ [${startIndex + i + 1}] ${meta.title}`);
      } else {
        errorCount++;
        console.log(`❌ [${startIndex + i + 1}] 変換失敗: ${meta.title}`);
      }
    } catch (error) {
      errorCount++;
      console.log(`❌ [${startIndex + i + 1}] エラー: ${meta.title} - ${error.message}`);
    }
  });
  console.log(`\n📊 処理完了:`);
  console.log(`   ✅ 成功: ${successCount}件`);
  console.log(`   ❌ 失敗: ${errorCount}件`);
  console.log(`   📁 出力先: src/content/backtrace/${year}/`);
  if (errorCount === 0) {
    console.log(`\n🎉 ${year}年の記事移行が完了しました！`);
  } else {
    console.log(`\n⚠️  ${errorCount}件の記事でエラーが発生しました`);
  }
}

function convertToMarkdown(entry, meta, year) {
  if (!meta) return null;
  let markdown = meta.body;
  // PREタグをMarkdownのコードブロックに変換（先頭空白を保持）
  markdown = markdown.replace(/<pre[^>]*>\s*([\s\S]*?)\s*<\/pre>/g, (match, content) => {
    let cleanContent = content
      .replace(/<br\s*\/?>/gi, '\n')
      .replace(/<[^>]*>/g, '')
      .trim();
    return `\n\`\`\`\n${cleanContent}\n\`\`\`\n\n`;
  });
  // まず全体の各行の先頭空白を一括除去（PREタグ処理後）
  markdown = markdown.replace(/^\s+/gm, '');
  // COMMENTセクションを適切に処理
  markdown = markdown.replace(/-----[\s\S]*?COMMENT:\s*([\s\S]*?)(?=-----|$)/g, (match, comment) => {
    const cleanComment = comment
      .replace(/<br\s*\/?/g, '\n')
      .replace(/<[^>]*>/g, '')
      .trim();
    return `\n\n---\n**元コメント:**\n\n${cleanComment}\n\n---`;
  });
  // blockquoteタグをMarkdownの引用に変換
  markdown = markdown.replace(/<blockquote>\s*([\s\S]*?)\s*<\/blockquote>/g, (match, content) => {
    let cleanContent = content
      .replace(/<p>/g, '')
      .replace(/<\/p>/g, '\n')
      .replace(/<br\s*\/?>/gi, '\n\n')
      .replace(/<a\s+href="([^"]+)"[^>]*>([^<]+)<\/a>/g, '[$2]($1)')
      .replace(/<(?!br\s*\/?)\/?[^>]*>/gi, '')
      .replace(/\n{3,}/g, '\n\n');
    const lines = cleanContent.split('\n');
    const quotedLines = lines.map(line => {
      const trimmed = line.trimStart();
      return trimmed === '' ? '>' : `> ${trimmed.replace(/^> ?/, '')}`;
    });
    return quotedLines.join('\n') + '\n\n';
  });
  // HTMLタグをMarkdownに変換
  markdown = markdown
    .replace(/<p>/g, '')
    .replace(/<\/p>/g, '\n\n')
    .replace(/<br\s*\/?>/g, '\n')
    .replace(/<ul>\s*([\s\S]*?)\s*<\/ul>/g, (match, content) => {
      const items = content.match(/<li[^>]*>([\s\S]*?)<\/li>/g);
      if (!items) return '';
      const markdownItems = items.map(item => {
        let itemContent = item.replace(/<li[^>]*>([\s\S]*?)<\/li>/, '$1');
        itemContent = itemContent
          .replace(/<a\s+href="([^"]+)"[^>]*>([^<]+)<\/a>/g, '[$2]($1)')
          .replace(/<br\s*\/?>/gi, '\n')
          .replace(/<[^>]*>/g, '')
          .trim();
        return `- ${itemContent}`;
      });
      return markdownItems.join('\n') + '\n\n';
    })
    .replace(/<img\s+[^>]*src="([^"]+)"[^>]*alt="([^"]*)"[^>]*\/?>/gi, '![$2]($1)')
    .replace(/<img\s+[^>]*alt="([^"]*)"[^>]*src="([^"]+)"[^>]*\/?>/gi, '![$1]($2)')
    .replace(/<img\s+[^>]*src="([^"]+)"[^>]*\/?>/gi, '[]($1)')
    .replace(/<a\s+href="([^"]+)"[^>]*>([^<]+)<\/a>/g, '[$2]($1)')
    .replace(/<[^>]*>/g, '')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
  // HTMLエンティティを日本語に変換
  markdown = markdown
    .replace(/&#x([0-9a-fA-F]+);/g, (match, hex) => String.fromCodePoint(parseInt(hex, 16)))
    .replace(/&#([0-9]+);/g, (match, dec) => String.fromCodePoint(parseInt(dec, 10)));
  // タグを抽出
  const tags = [];
  const hashtagMatch = meta.title.match(/＃([^\s]+)/g);
  if (hashtagMatch) tags.push(...hashtagMatch);
  const cleanTitle = meta.title.replace(/＃[^\s]+/g, '').trim();
  const dateStr = meta.date.toISOString().split('T')[0];
  const fileName = `${dateStr}-${meta.basename}.md`;
  const yearDir = `src/content/backtrace/${year}`;
  if (!fs.existsSync(yearDir)) fs.mkdirSync(yearDir, { recursive: true });
  const frontmatter = `---\ntitle: "${cleanTitle}"\npubDate: ${meta.date.toISOString()}\ntags: ${tags.length > 0 ? JSON.stringify(tags) : '[]'}\n---\n\n`;
  const filePath = path.join(yearDir, fileName);
  fs.writeFileSync(filePath, frontmatter + markdown);
  return { title: cleanTitle, date: meta.date, tags, filePath };
} 