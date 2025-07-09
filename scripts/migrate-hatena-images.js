#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { glob } from 'glob';
import https from 'https';
import { URL } from 'url';

const BACKTRACE_DIR = 'src/content/backtrace/';
const HATENA_IMG_PATTERN = /cdn-ak\.f\.st-hatena\.com/;

// 画像をダウンロードする関数
function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(filepath);

    https
      .get(url, (response) => {
        if (response.statusCode !== 200) {
          reject(new Error(`Failed to download: ${response.statusCode}`));
          return;
        }

        response.pipe(file);
        file.on('finish', () => {
          file.close();
          resolve();
        });
      })
      .on('error', (err) => {
        fs.unlink(filepath, () => {}); // エラー時はファイルを削除
        reject(err);
      });
  });
}

// はてな画像URLからファイル名を抽出
function extractFilenameFromHatenaUrl(url) {
  const urlObj = new URL(url);
  const pathParts = urlObj.pathname.split('/');
  const filename = pathParts[pathParts.length - 1];
  return filename;
}

// 記事のベースネーム（数字）を抽出
function extractBasenameFromArticlePath(articlePath) {
  const match = articlePath.match(/(\d{4})-(\d{2})-(\d{2})-(\d+)/);
  if (!match) return null;

  const [, year, month, day, basename] = match;
  return { year, month, day, basename };
}

// 記事のベースネームからディレクトリパスを生成
function getImageDirFromArticlePath(articlePath) {
  const basenameInfo = extractBasenameFromArticlePath(articlePath);
  if (!basenameInfo) return null;

  const { year, basename } = basenameInfo;

  // src/content/backtrace/YYYY/images/ベースネーム/ の形式
  return path.join('src/content/backtrace', year, 'images', basename);
}

// 記事内の画像URLを置換（絶対パスに変更）
function replaceImageUrls(content, imageMappings) {
  let newContent = content;

  for (const [oldUrl, newPath] of imageMappings) {
    // ビルド後の絶対パスを生成
    const basenameInfo = extractBasenameFromArticlePath(
      newPath.replace('src/content/backtrace/', '')
    );
    if (!basenameInfo) continue;

    const { year, month, day } = basenameInfo;
    const filename = path.basename(newPath);
    const newUrl = `/images/backtrace/${year}/${month}/${day}/${filename}`;

    // より柔軟な置換パターン
    const patterns = [
      // <img>タグの置換（属性の順序に関係なく）
      new RegExp(
        `(<img[^>]*src=["'])${oldUrl.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}(["'][^>]*>)`,
        'gi'
      ),
      // Markdown画像記法の置換
      new RegExp(`(!\\[([^\\]]*)\\]\\()${oldUrl.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}(\\))`, 'g'),
      // リンク形式の画像
      new RegExp(`(\\[([^\\]]*)\\]\\()${oldUrl.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}(\\))`, 'g'),
      // プレーンテキストのURL（コメントや説明文内）
      new RegExp(`(?<!["'])\\b${oldUrl.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b(?!["'])`, 'g'),
    ];

    patterns.forEach((pattern, index) => {
      if (index === 0) {
        // <img>タグの場合
        newContent = newContent.replace(pattern, `$1${newUrl}$2`);
      } else if (index === 1) {
        // Markdown画像記法の場合
        newContent = newContent.replace(pattern, `$1${newUrl}$3`);
      } else if (index === 2) {
        // リンク形式の場合
        newContent = newContent.replace(pattern, `$1${newUrl}$3`);
      } else {
        // プレーンテキストの場合（コメントアウト）
        newContent = newContent.replace(pattern, `<!-- ${oldUrl} -->`);
      }
    });
  }

  return newContent;
}

async function migrateHatenaImages() {
  console.log('🔄 はてな画像の移行を開始...\n');

  // 分析結果を読み込み
  const analysis = JSON.parse(fs.readFileSync('tmp/image-analysis.json', 'utf8'));
  const hatenaImages = analysis.summary.categories.hatena;

  console.log(`📊 移行対象: ${hatenaImages.length}個のはてな画像\n`);

  const results = {
    success: [],
    failed: [],
    skipped: [],
  };

  // 各記事ファイルを処理
  for (const [articlePath, images] of Object.entries(analysis.details)) {
    const hatenaImagesInArticle = images.filter((img) => HATENA_IMG_PATTERN.test(img));

    if (hatenaImagesInArticle.length === 0) continue;

    console.log(`📄 処理中: ${path.relative(process.cwd(), articlePath)}`);

    const imageMappings = [];

    for (const imageUrl of hatenaImagesInArticle) {
      try {
        const filename = extractFilenameFromHatenaUrl(imageUrl);
        const imageDir = getImageDirFromArticlePath(articlePath);

        if (!imageDir) {
          console.log(`  ⚠️  ディレクトリパスが取得できません: ${imageUrl}`);
          results.skipped.push({ url: imageUrl, reason: 'Invalid article path' });
          continue;
        }

        // ディレクトリを作成
        if (!fs.existsSync(imageDir)) {
          fs.mkdirSync(imageDir, { recursive: true });
        }

        const imagePath = path.join(imageDir, filename);

        // 既に存在する場合はスキップ
        if (fs.existsSync(imagePath)) {
          console.log(`  ✅ 既に存在: ${filename}`);
          imageMappings.push([imageUrl, imagePath]);
          results.skipped.push({ url: imageUrl, reason: 'Already exists' });
          continue;
        }

        // 画像をダウンロード
        console.log(`  ⬇️  ダウンロード中: ${filename}`);
        await downloadImage(imageUrl, imagePath);

        imageMappings.push([imageUrl, imagePath]);
        results.success.push({ url: imageUrl, path: imagePath });

        console.log(`  ✅ 完了: ${filename}`);
      } catch (error) {
        console.log(`  ❌ エラー: ${imageUrl} - ${error.message}`);
        results.failed.push({ url: imageUrl, error: error.message });
      }
    }

    // 記事内のURLを置換
    if (imageMappings.length > 0) {
      const content = fs.readFileSync(articlePath, 'utf8');
      const newContent = replaceImageUrls(content, imageMappings);
      fs.writeFileSync(articlePath, newContent);
      console.log(`  🔄 記事内のURLを更新しました`);
    }

    console.log('');
  }

  // 結果サマリー
  console.log('📊 移行結果:');
  console.log(`- 成功: ${results.success.length}`);
  console.log(`- 失敗: ${results.failed.length}`);
  console.log(`- スキップ: ${results.skipped.length}`);

  if (results.failed.length > 0) {
    console.log('\n❌ 失敗した画像:');
    results.failed.forEach((item) => {
      console.log(`  - ${item.url}: ${item.error}`);
    });
  }

  // 結果をファイルに保存
  fs.writeFileSync('tmp/migration-results.json', JSON.stringify(results, null, 2));
  console.log('\n💾 詳細結果を tmp/migration-results.json に保存しました');
}

migrateHatenaImages().catch(console.error);
