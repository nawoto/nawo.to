import fs from 'fs';
import path from 'path';

// コマンドライン引数のパース
const args = process.argv.slice(2);
let targetYear = null;
let startIndex = 0;
let count = 10; // デフォルト10件
let autoYes = false;
let allMode = false;
let txtOnly = false; // txtファイルのみ分割するオプション
let forceMode = false; // 強制再変換モード
let targetDate = null; // 特定日付指定

for (let i = 0; i < args.length; i++) {
  const arg = args[i];
  if (arg === '--yes' || arg === '-y') autoYes = true;
  else if (arg === '--year' && args[i + 1]) targetYear = parseInt(args[++i]);
  else if (arg === '--start' && args[i + 1]) startIndex = parseInt(args[++i]);
  else if (arg === '--count' && args[i + 1]) count = parseInt(args[++i]);
  else if (arg === '--all') allMode = true;
  else if (arg === '--txt-only') txtOnly = true;
  else if (arg === '--force') forceMode = true;
  else if (arg === '--date' && args[i + 1]) {
    const dateStr = args[++i];
    // YYYY-MM-DD形式をパース
    const dateMatch = dateStr.match(/^(\d{4})-(\d{2})-(\d{2})$/);
    if (dateMatch) {
      targetDate = new Date(parseInt(dateMatch[1]), parseInt(dateMatch[2]) - 1, parseInt(dateMatch[3]));
    } else {
      console.error('❌ 日付形式が正しくありません。YYYY-MM-DD形式で指定してください。例: --date 2012-03-26');
      process.exit(1);
    }
  }
}

console.log(`🎯 はてなブログ移行スクリプト（統合版）`);

// ヘルプ表示
if (args.includes('--help') || args.includes('-h')) {
  console.log(`
📖 使用方法:
  node scripts/hatena-export-to-md.js [オプション]

🔧 オプション:
  --year <年>          指定年の記事を変換（例: --year 2012）
  --start <開始位置>    開始位置を指定（デフォルト: 0）
  --count <件数>       変換件数を指定（デフォルト: 10）
  --all                全記事から未変換分を範囲指定変換
  --txt-only           txtファイルのみ分割（mdファイルは作成しない）
  --force              強制再変換モード（変換済みも再変換）
  --date <YYYY-MM-DD>  特定日付の記事のみ変換（例: --date 2012-03-26）
  --yes, -y            確認プロンプトをスキップして自動実行
  --help, -h           このヘルプを表示

📝 使用例:
  # 2012年の最新10件を変換
  node scripts/hatena-export-to-md.js --year 2012

  # 2012年3月26日の記事を強制再変換
  node scripts/hatena-export-to-md.js --year 2012 --date 2012-03-26 --force --yes

  # 全記事から2012年3月26日の記事を変換
  node scripts/hatena-export-to-md.js --all --date 2012-03-26 --yes

  # txtファイルのみ分割
  node scripts/hatena-export-to-md.js --txt-only --yes
`);
  process.exit(0);
}

// txtファイルのみ分割する場合の処理
if (txtOnly) {
  console.log(`📄 txtファイルのみ分割モード`);
  processTxtOnly();
  process.exit(0);
}

// 変換済み記録ファイル
const convertedFile = 'converted.txt';
let convertedSet = new Set();
if (fs.existsSync(convertedFile)) {
  const lines = fs.readFileSync(convertedFile, 'utf8').split(/\r?\n/).filter(Boolean);
  lines.forEach(line => convertedSet.add(line.trim()));
}

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

if (allMode) {
  // 全記事から範囲指定
  let filtered = entries
    .map(entry => ({ entry, meta: extractMeta(entry) }))
    .filter(({ meta }) => meta && meta.basename);
  
  // 日付指定がある場合はフィルタリング
  if (targetDate) {
    filtered = filtered.filter(({ meta }) => {
      const entryYear = meta.date.getFullYear();
      const entryMonth = meta.date.getMonth() + 1;
      const entryDay = meta.date.getDate();
      const targetYear = targetDate.getFullYear();
      const targetMonth = targetDate.getMonth() + 1;
      const targetDay = targetDate.getDate();
      return entryYear === targetYear && entryMonth === targetMonth && entryDay === targetDay;
    });
    console.log(`📅 日付指定: ${targetDate.getFullYear()}-${String(targetDate.getMonth() + 1).padStart(2, '0')}-${String(targetDate.getDate()).padStart(2, '0')}`);
  }
  
  // 強制モードでない場合は変換済みを除外
  if (!forceMode) {
    filtered = filtered.filter(({ meta }) => !convertedSet.has(meta.basename));
  }
  
  // --allモードではcountが指定されていない場合は全件処理
  const actualCount = count === 10 && !process.argv.includes('--count') ? filtered.length : count;
  const endIndex = Math.min(startIndex + actualCount, filtered.length);
  const targetEntries = filtered.slice(startIndex, endIndex);
  console.log(`🔢 全記事から変換対象: ${startIndex + 1}件目 〜 ${endIndex}件目（${targetEntries.length}件）`);
  if (targetEntries.length === 0) {
    console.log('⚠️  指定範囲に記事がありません');
    process.exit(0);
  }
  if (autoYes) {
    processEntries(targetEntries, null, startIndex);
  } else {
    console.log(`\n🚀 変換を実行しますか？ (y/N)`);
    process.stdin.once('data', (data) => {
      const answer = data.toString().trim().toLowerCase();
      if (answer === 'y' || answer === 'yes') {
        processEntries(targetEntries, null, startIndex);
      } else {
        console.log('❌ 処理をキャンセルしました');
        process.exit(0);
      }
    });
  }
}

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

let yearEntries = entriesByYear[targetYear];

  // 日付指定がある場合はフィルタリング
  if (targetDate) {
    yearEntries = yearEntries.filter(({ meta }) => {
      const entryYear = meta.date.getFullYear();
      const entryMonth = meta.date.getMonth() + 1;
      const entryDay = meta.date.getDate();
      const targetYear = targetDate.getFullYear();
      const targetMonth = targetDate.getMonth() + 1;
      const targetDay = targetDate.getDate();
      return entryYear === targetYear && entryMonth === targetMonth && entryDay === targetDay;
    });
    console.log(`📅 日付指定: ${targetDate.getFullYear()}-${String(targetDate.getMonth() + 1).padStart(2, '0')}-${String(targetDate.getDate()).padStart(2, '0')}`);
  }

// 強制モードでない場合は変換済みを除外
if (!forceMode) {
  yearEntries = yearEntries.filter(({ meta }) => !convertedSet.has(meta.basename));
  console.log(`📝 ${targetYear}年の記事数: ${yearEntries.length}件（未変換のみ）`);
} else {
  console.log(`📝 ${targetYear}年の記事数: ${yearEntries.length}件（強制再変換モード）`);
}

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
  console.log(`\n🔄 ${year ? year + '年' : '全記事'}の記事を処理中...`);
  let successCount = 0;
  let errorCount = 0;
  let convertedList = [];
  entries.forEach(({ entry, meta }, i) => {
    try {
      const result = convertToMarkdown(entry, meta, year);
      if (result) {
        successCount++;
        convertedList.push(meta.basename);
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
  // 変換済みを記録
  if (convertedList.length > 0) {
    fs.appendFileSync(convertedFile, convertedList.join('\n') + '\n');
  }
  console.log(`\n📊 処理完了:`);
  console.log(`   ✅ 成功: ${successCount}件`);
  console.log(`   ❌ 失敗: ${errorCount}件`);
  if (year) {
    console.log(`   📁 出力先: src/content/backtrace/${year}/`);
  } else {
    console.log(`   📁 出力先: src/content/backtrace/`);
  }
  console.log(`   📄 元ファイル: 各mdファイルと同じディレクトリに.txtファイルとして保存`);
  if (errorCount === 0) {
    console.log(`\n🎉 記事移行が完了しました！`);
  } else {
    console.log(`\n⚠️  ${errorCount}件の記事でエラーが発生しました`);
  }
}

function convertToMarkdown(entry, meta, year) {
  if (!meta) return null;
  let markdown = meta.body;
  // SpeakerDeckの埋め込みスクリプトをURLのみに変換（最初に実行）
  markdown = markdown.replace(/<script src="http:\/\/speakerdeck\.com\/embed\/([a-zA-Z0-9]+)\.js"><\/script>/g, (match, slideId) => {
    return `\n\nhttps://speakerdeck.com/embed/${slideId}\n\n`;
  });
  
  // SlideShareの埋め込みウィジェットをURLのみに変換
  markdown = markdown.replace(/<div[^>]*id="__ss_\d+"[^>]*>\s*<strong[^>]*>\s*<a[^>]*href="([^"]+)"[^>]*>([^<]+)<\/a>\s*<\/strong>\s*<iframe[^>]*><\/iframe>\s*<div[^>]*>\s*View more[^<]*<a[^>]*>[^<]*<\/a>[^<]*from[^<]*<a[^>]*>[^<]*<\/a>\s*<\/div>\s*<\/div>/g, (match, url, title) => {
    return `\n\n${url}\n\n`;
  });
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
      .replace(/<(?!br\s*\/?)[^>]*>/gi, '')
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
        
        // SpeakerDeckのリンクの場合は箇条書きを除去してURLのみに変換
        if (itemContent.includes('speakerdeck.com')) {
          // [URL](URL) の形式をURLのみに変換
          const markdownLinkMatch = itemContent.match(/\[(https:\/\/speakerdeck\.com\/[^\]]+)\]\(\1\)/);
          if (markdownLinkMatch) {
            return markdownLinkMatch[1];
          }
          // 通常のURLの場合
          const urlMatch = itemContent.match(/https:\/\/speakerdeck\.com\/[^\s]+/);
          if (urlMatch) {
            return urlMatch[0];
          }
        }
        
        // SlideShareのリンクの場合は箇条書きを除去してURLのみに変換
        if (itemContent.includes('slideshare.net')) {
          // [URL](URL) の形式をURLのみに変換
          const markdownLinkMatch = itemContent.match(/\[(https:\/\/slideshare\.net\/[^\]]+)\]\(\1\)/);
          if (markdownLinkMatch) {
            return markdownLinkMatch[1];
          }
          // 通常のURLの場合
          const urlMatch = itemContent.match(/https:\/\/slideshare\.net\/[^\s]+/);
          if (urlMatch) {
            return urlMatch[0];
          }
        }
        
        return `- ${itemContent}`;
      });
      return markdownItems.join('\n') + '\n\n';
    })
    .replace(/<img\s+[^>]*src="([^"]+)"[^>]*alt="([^"]*)"[^>]*\/?>(?!\))/gi, '![$2]($1)')
    .replace(/<img\s+[^>]*alt="([^"]*)"[^>]*src="([^"]+)"[^>]*\/?>(?!\))/gi, '![$1]($2)')
    .replace(/<img\s+[^>]*src="([^"]+)"[^>]*\/?>(?!\))/gi, '![]($1)')
    .replace(/<a\s+href="([^"]+)"[^>]*>([^<]+)<\/a>/g, '[$2]($1)')
    .replace(/<[^>]*>/g, '')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
  // HTMLエンティティを日本語に変換
  markdown = markdown
    .replace(/&#x([0-9a-fA-F]+);/g, (match, hex) => String.fromCodePoint(parseInt(hex, 16)))
    .replace(/&#([0-9]+);/g, (match, dec) => String.fromCodePoint(parseInt(dec, 10)));
  // タイトルの最後のハッシュタグをタグに変換（先頭のハッシュタグは残す）
  // タイトルの末尾ハッシュタグ（複数可）をtagsに抽出し、タイトルから除去
  let tags = [];
  let titleTrimmed = meta.title.trim();
  let hashtagMatch;
  while ((hashtagMatch = titleTrimmed.match(/[＃#]([^\s]+)\s*$/))) {
    tags.unshift(`#${hashtagMatch[1]}`);
    titleTrimmed = titleTrimmed.replace(/[＃#][^\s]+\s*$/, '').trim();
    console.log(`DEBUG: found hashtag #${hashtagMatch[1]}, title now: "${titleTrimmed}"`);
  }
  console.log(`DEBUG: final title: "${titleTrimmed}", tags: ${JSON.stringify(tags)}`);
  meta.title = titleTrimmed;
  const dateStr = meta.date.toISOString().split('T')[0];
  const cleanBasename = meta.basename.split('/').pop();
  const fileName = `${dateStr}-${cleanBasename}.md`;
  const yearDir = `src/content/backtrace/${year ? year : meta.date.getFullYear()}`;
  if (!fs.existsSync(yearDir)) fs.mkdirSync(yearDir, { recursive: true });
  const frontmatter = `---\ntitle: "${meta.title}"\npubDate: ${meta.date.toISOString()}\ntags: ${tags.length > 0 ? JSON.stringify(tags) : '[]'}\n---\n\n`;
  const filePath = path.join(yearDir, fileName);
  fs.writeFileSync(filePath, frontmatter + markdown);
  
  // 元のエクスポートファイルの内容をtxtファイルとして保存
  const originalFileName = `${dateStr}-${cleanBasename}.txt`;
  const originalFilePath = path.join(yearDir, originalFileName);
  fs.writeFileSync(originalFilePath, entry);
  
  return { title: meta.title, date: meta.date, tags, filePath, originalFilePath };
}

function processTxtOnly() {
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

  let successCount = 0;
  let errorCount = 0;

  entries.forEach((entry, i) => {
    try {
      const meta = extractMeta(entry);
      if (meta && meta.date) {
        const year = meta.date.getFullYear();
        const dateStr = meta.date.toISOString().split('T')[0];
        const cleanBasename = meta.basename.split('/').pop();
        const fileName = `${dateStr}-${cleanBasename}.txt`;
        const yearDir = `src/content/backtrace/${year}`;
        
        if (!fs.existsSync(yearDir)) {
          fs.mkdirSync(yearDir, { recursive: true });
        }
        
        const filePath = path.join(yearDir, fileName);
        fs.writeFileSync(filePath, entry);
        
        successCount++;
        console.log(`✅ [${i + 1}] ${meta.title}`);
      } else {
        errorCount++;
        console.log(`❌ [${i + 1}] メタデータ抽出失敗`);
      }
    } catch (error) {
      errorCount++;
      console.log(`❌ [${i + 1}] エラー: ${error.message}`);
    }
  });

  console.log(`\n📊 処理完了:`);
  console.log(`   ✅ 成功: ${successCount}件`);
  console.log(`   ❌ 失敗: ${errorCount}件`);
  console.log(`   📁 出力先: src/content/backtrace/（年別ディレクトリ）`);
  
  if (errorCount === 0) {
    console.log(`\n🎉 txtファイル分割が完了しました！`);
  } else {
    console.log(`\n⚠️  ${errorCount}件のファイルでエラーが発生しました`);
  }
} 