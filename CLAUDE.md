# CLAUDE.md

nawo.to の Claude Code 向け指示書。

## プロジェクト概要

- [nawo.to](https://nawo.to) の本体。Astro 製の静的サイト。
- コンテンツコレクション: `logs`（ブログ記事）/ `texts`（長文テキスト）/ `backtrace`（はてな移行記事）

## よく使うコマンド

```sh
npm run dev          # 開発サーバー起動 (localhost:4321)
npm run build        # 本番ビルド
npm run lint         # ESLint チェック
npm run lint:fix     # ESLint 自動修正
npm run format       # Prettier フォーマット
npm run format:check # Prettier チェックのみ
```

## コンテンツ作成ルール

**記事ファイルは必ずスクリプトで作成すること。手動でファイルを作らない。**

```sh
# ブログ記事 (src/content/logs/)
node scripts/new-article.js --slug <slug>

# テキスト記事 (src/content/texts/)
node scripts/new-article.js --slug <slug> --type texts

# オプション
# --title "タイトル" --description "説明" --date YYYY-MM-DD --with-images
```

Frontmatter の必須フィールド: `title`, `pubDate`

## コーディング規約

- フォーマッターは **Prettier**。コード変更後は `npm run format` を実行。
- **ESLint + TypeScript ESLint** でチェック。変更後は `npm run lint` で確認。
- `no-console` は off なのでコンソールログは許可されている。

## やってはいけないこと

- コミットを勝手に行わない。必ずユーザーに確認する。
- `git push` は明示的に指示されるまで実行しない。
- 記事ファイルを手動作成しない（スクリプトを使う）。
- 過度な抽象化・将来のための設計をしない。現在のタスクに必要な最小限の変更のみ行う。
