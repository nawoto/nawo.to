# はてなブログ移行用スクリプト

このディレクトリには、はてなブログからnawo.toへの記事移行に使用したスクリプトが含まれています。

## スクリプト一覧

### 記事移行

- `hatena-export-to-md.js` - はてなブログの記事をMarkdown形式に変換
- `hatena-search.js` - はてなブログの記事を検索・抽出

### 画像処理

- `migrate-hatena-images.js` - はてなブログの画像をWebP形式に変換・絶対パス化
- `extract-images.js` - 記事から画像URLを抽出
- `copy-article-images.js` - 記事の画像をローカルにコピー

### Amazonリンク変換

- `bookcard-convert.js` - アジャイルサムライのAmazonリンクをBookCard形式に変換
- `bookcard-convert-scrum.js` - Scrum Boot Camp The BookのAmazonリンクをBookCard形式に変換
- `convert-amazon-cdn-to-bookcard.js` - Amazon CDN画像をBookCard/ProductCard形式に変換
- `convert-bookcard-to-remark.js` - BookCard HTMLをremarkプラグイン記法に変換

## 使用方法

これらのスクリプトは移行作業が完了したため、通常の運用では使用しません。
必要に応じて参考資料として活用してください。

## 注意事項

- これらのスクリプトは一度限りの移行作業用です
- 本番環境での使用前に必ずバックアップを取ってください
- スクリプトの実行結果は事前にテスト環境で確認してください
