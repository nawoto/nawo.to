import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// エクスポートファイルのパス
const exportFile = path.join(__dirname, '../tmp/nawoto.hatenadiary.org.export.txt');

// 出力ディレクトリ（記事の年に基づいて動的に決定）
const getOutputDir = (date) => {
  const year = date.getFullYear();
  return path.join(__dirname, `../src/content/backtrace/${year}`);
};

// エクスポートファイルを読み込み
const content = fs.readFileSync(exportFile, 'utf8');

// 記事を分割（8個のハイフンで区切る）
const entries = content.split(/^-{8}$/m).filter(entry => entry.trim());

console.log(`Found ${entries.length} entries`);

// 最新の5件を処理
const entriesToProcess = entries.slice(0, 5);
console.log(`Processing ${entriesToProcess.length} entries...`);

// 記事のメタ情報を抽出（参考実装＋コメント抽出）
const extractMeta = (entry) => {
  const lines = entry.split(/\r?\n/);
  const meta = {};
  let body = '';
  let inBody = false;
  let comments = [];
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line.startsWith('AUTHOR: ')) meta.author = line.replace('AUTHOR: ', '').trim();
    else if (line.startsWith('TITLE: ')) meta.title = line.replace('TITLE: ', '').trim();
    else if (line.startsWith('BASENAME: ')) meta.basename = line.replace('BASENAME: ', '').trim();
    else if (line.startsWith('DATE: ')) meta.date = new Date(line.replace('DATE: ', '').trim());
    else if (line.startsWith('CATEGORY: ')) meta.category = line.replace('CATEGORY: ', '').trim();
    else if (line.startsWith('BODY:')) {
      inBody = true;
      continue;
    }
    if (inBody) {
      if (line.startsWith('-----')) {
        inBody = false;
        continue;
      }
      body += line + '\n';
    }
    // コメント抽出
    if (line.startsWith('COMMENT:')) {
      let comment = '';
      let j = i + 1;
      while (j < lines.length && !lines[j].startsWith('-----') && !lines[j].startsWith('COMMENT:')) {
        comment += lines[j] + '\n';
        j++;
      }
      comments.push(comment.trim());
      i = j - 1;
    }
  }
  meta.body = body.trim();
  meta.comments = comments;
  return meta;
};

// 本文をMarkdownに変換
const convertBody = (body) => {
  if (!body) return '';
  
  let markdown = body;

  // PREタグをMarkdownのコードブロックに変換（先頭空白を保持）
  markdown = markdown.replace(/<pre[^>]*>\s*([\s\S]*?)\s*<\/pre>/g, (match, content) => {
    let cleanContent = content
      .replace(/<br\s*\/?>/gi, '\n')
      .replace(/<[^>]*>/g, '')
      .trim();
    return `\n\`\`\`\n${cleanContent}\n\`\`\`\n\n`;
  });
  
  // PREタグ以外の部分の各行の先頭空白を一括除去
  markdown = markdown.replace(/^\s+/gm, '');
  
  // COMMENTセクションを適切に処理
  markdown = markdown.replace(/-----[\s\S]*?COMMENT:\s*([\s\S]*?)(?=-----|$)/g, (match, comment) => {
    // コメント部分をMarkdown形式で残す
    const cleanComment = comment
      .replace(/<br\s*\/?/g, '\n')
      .replace(/<[^>]*>/g, '')
      .trim();
    return `\n\n---\n**元コメント:**\n\n${cleanComment}\n\n---`;
  });
  
  // blockquoteタグをMarkdownの引用に変換（split後に各行ごとにtrimStart()してから処理）
  markdown = markdown.replace(/<blockquote>\s*([\s\S]*?)\s*<\/blockquote>/g, (match, content) => {
    let cleanContent = content
      .replace(/<p>/g, '')
      .replace(/<\/p>/g, '\n')
      .replace(/<br\s*\/?>/gi, '\n\n') // <br>は空行に変換
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
    // pタグを処理
    .replace(/<p>/g, '')
    .replace(/<\/p>/g, '\n\n')
    // brタグを改行に変換
    .replace(/<br\s*\/?>/g, '\n')
    // ul/liタグをMarkdownの箇条書きに変換
    .replace(/<ul>\s*([\s\S]*?)\s*<\/ul>/g, (match, content) => {
      const items = content.match(/<li[^>]*>([\s\S]*?)<\/li>/g);
      if (!items) return '';
      const markdownItems = items.map(item => {
        let itemContent = item.replace(/<li[^>]*>([\s\S]*?)<\/li>/, '$1');
        
        // リンクをMarkdown形式に変換
        itemContent = itemContent
          .replace(/<a\s+href="([^"]+)"[^>]*>([^<]+)<\/a>/g, '[$2]($1)')
          .replace(/<br\s*\/?>/gi, '\n')
          .replace(/<[^>]*>/g, '')
          .trim();
        
        return `- ${itemContent}`;
      });
      return markdownItems.join('\n') + '\n\n';
    })
    // imgタグをMarkdown画像に変換
    .replace(/<img\s+[^>]*src="([^"]+)"[^>]*alt="([^"]*)"[^>]*\/?>/gi, '![$2]($1)')
    .replace(/<img\s+[^>]*alt="([^"]*)"[^>]*src="([^"]+)"[^>]*\/?>/gi, '![$1]($2)')
    .replace(/<img\s+[^>]*src="([^"]+)"[^>]*\/?>/gi, '![]($1)')
    // aタグをMarkdownリンクに変換
    .replace(/<a\s+href="([^"]+)"[^>]*>([^<]+)<\/a>/g, '[$2]($1)')
    // その他のHTMLタグを除去
    .replace(/<[^>]*>/g, '')
    // 複数の改行を整理
    .replace(/\n{3,}/g, '\n\n')
    .trim();
  
  // HTMLエンティティを日本語に変換
  markdown = markdown
    // 16進数のHTMLエンティティを変換
    .replace(/&#x([0-9a-fA-F]+);/g, (match, hex) => {
      return String.fromCodePoint(parseInt(hex, 16));
    })
    // 10進数のHTMLエンティティを変換
    .replace(/&#(\d+);/g, (match, dec) => {
      return String.fromCodePoint(parseInt(dec, 10));
    });
  
  return markdown;
};

// タイトルからハッシュタグを抽出する関数
const extractHashtags = (title) => {
  const hashtagRegex = /#(\w+)/g;
  const hashtags = [];
  let match;
  while ((match = hashtagRegex.exec(title)) !== null) {
    hashtags.push(`#${match[1]}`);
  }
  return hashtags;
};

// タイトルからハッシュタグを削除する関数
const removeHashtags = (title) => {
  return title.replace(/\s*#\w+/g, '').trim();
};

// 各記事を処理
entriesToProcess.forEach((entry, index) => {
  console.log(`\n--- Processing entry ${index + 1} ---`);
  
  const meta = extractMeta(entry);

  // エラーハンドリング
  if (!meta.title || !meta.basename || !meta.date) {
    console.error('記事情報の抽出に失敗しました');
    console.error('meta:', meta);
    return; // この記事をスキップして次へ
  }

  console.log('Extracted meta:', {
    title: meta.title,
    basename: meta.basename,
    date: meta.date,
    category: meta.category,
    bodyLength: meta.body?.length
  });

  const markdownBody = convertBody(meta.body);

  // コメントをMarkdown形式で追記
  let markdownComments = '';
  if (meta.comments && meta.comments.length > 0) {
    markdownComments = '\n\n---\n**元コメント:**\n\n```\n' + meta.comments.map(c => c.replace(/<br\s*\/?>/g, '\n').replace(/<[^>]*>/g, '').trim()).join('\n\n---\n**元コメント:**\n\n```\n') + '\n```\n\n---';
  }

  // フロントマターを生成
  const hashtags = extractHashtags(meta.title);
  const cleanTitle = removeHashtags(meta.title);
  const tags = hashtags.length > 0 ? hashtags : [];
  const frontmatter = `---
title: "${cleanTitle}"
pubDate: ${meta.date.toISOString()}
description: ""
tags: ${JSON.stringify(tags)}
---

`;

  // ファイル名を生成（記事の実際の日付に基づく）
  const basenameNumber = meta.basename.split('/')[1] || 'unknown';
  const dateStr = meta.date.toISOString().split('T')[0]; // YYYY-MM-DD形式
  const filename = `${dateStr}-hatena-${basenameNumber}.md`;

  // 出力ディレクトリを取得
  const outputDir = getOutputDir(meta.date);

  // 出力ディレクトリが存在しない場合は作成
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // ファイルに書き込み
  const outputPath = path.join(outputDir, filename);
  const fullContent = frontmatter + markdownBody + markdownComments;

  fs.writeFileSync(outputPath, fullContent, 'utf8');
  console.log(`Created: ${outputPath}`);
  console.log(`Content length: ${fullContent.length} characters`);
}); 