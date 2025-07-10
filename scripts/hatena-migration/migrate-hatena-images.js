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

    // はてなブログ特有の画像リンク形式に対応
    // 例: [![f:id:nawoto:20131014185028j:image:w360](https://cdn-ak.f.st-hatena.com/images/fotolife/n/nawoto/20131014/20131014185028.jpg)](http://f.hatena.ne.jp/nawoto/20131014185028)
    const hatenaImagePattern = new RegExp(
      `(\\[!\\[f:id:nawoto:[^\\]]+\\]\\(${oldUrl.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\)\\]\\([^)]+\\))`,
      'g'
    );
    newContent = newContent.replace(hatenaImagePattern, (match) => {
      // はてな形式の画像リンクを通常のMarkdown画像形式に変換
      const imageAlt = match.match(/\[!\[([^\]]+)\]/)?.[1] || '';
      return `![${imageAlt}](${newUrl})`;
    });

    // 通常の画像URLも置換
    const pattern = new RegExp(oldUrl.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
    newContent = newContent.replace(pattern, newUrl);
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
          // ★記事内で実際に使われているURLをそのまま置換対象にする
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
      let newContent = replaceImageUrls(content, imageMappings);

      // はてな画像URLを自動的に標準的なMarkdown画像形式に変換
      const hatenaImageRegex =
        /\[!\[([^\]]*)\]\(https?:\/\/cdn-ak\.f\.st-hatena\.com\/images\/fotolife\/n\/nawoto\/[0-9]{8}\/([0-9a-zA-Z_\-\.]+\.(?:jpg|jpeg|png|gif))\)[^)]*\]\([^)]*\)/gs;
      let patchedContent = newContent;

      // はてな画像リンク形式を標準的なMarkdown画像形式に変換
      patchedContent = patchedContent.replace(hatenaImageRegex, (match, altText, filename) => {
        // 記事の投稿日を使用（画像の撮影日ではなく）
        const articleBasenameInfo = extractBasenameFromArticlePath(articlePath);
        if (!articleBasenameInfo) {
          console.log(`  ⚠️  記事パスから日付を抽出できません: ${articlePath}`);
          return match; // 変換せずにそのまま返す
        }

        const { year, month, day } = articleBasenameInfo;
        // 拡張子を.webpに変更
        const webpFilename = filename.replace(/\.(jpg|jpeg|png|gif)$/i, '.webp');
        const newImagePath = `/images/backtrace/${year}/${month}/${day}/${webpFilename}`;

        // 代替テキストが空の場合は「はてなから移行」を設定
        const finalAltText = altText.trim() || 'はてなから移行';

        return `![${finalAltText}](${newImagePath})`;
      });

      // 変換漏れがあった場合のみ、変換候補コメントを挿入（WebP形式）
      // 一時的にコメント機能をオフ
      /*
      const hatenaUrlRegex =
        /(https?:\/\/cdn-ak\.f\.st-hatena\.com\/images\/fotolife\/n\/nawoto\/[0-9]{8}\/[0-9a-zA-Z_\-]+\.(?:jpg|jpeg|png|gif))/g;
      let match;
      let alreadyWarned = false;
      while ((match = hatenaUrlRegex.exec(patchedContent)) !== null) {
        const url = match[1];
        // 変換候補パスを生成
        // 例: .../20131014185028.jpg → /images/backtrace/YYYY/MM/DD/ファイル名
        const urlParts = url.split('/');
        const yyyymmdd = urlParts[urlParts.length - 2];
        const filename = urlParts[urlParts.length - 1];
        const year = yyyymmdd.substring(0, 4);
        const month = yyyymmdd.substring(4, 6);
        const day = yyyymmdd.substring(6, 8);
        // 拡張子を.webpに変更
        const webpFilename = filename.replace(/\.(jpg|jpeg|png|gif)$/i, '.webp');
        const candidate = `/images/backtrace/${year}/${month}/${day}/${webpFilename}`;
        // コメントを直後に挿入
        patchedContent = patchedContent.replace(url, url + `\n<!-- 変換候補: ${candidate} -->`);
        alreadyWarned = true;
      }
      if (alreadyWarned) {
        console.log('❗ 変換漏れがあったため、変換候補コメントを挿入しました');
      }
      */
      newContent = patchedContent;

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
