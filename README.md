<p align="center">
  <img src="public/images/site-icon.png" alt="nawo.to ロゴ" width="120" />
</p>

# nawo.to

> **これは「nawoto」の構造化のためのリポジトリです**
>
> 未来の自分が迷子にならないように、運用・設計・コマンド全部ここにメモしておく！

---

## 🚀 これは何？

- [https://nawo.to](https://nawo.to) の**本体**。
- フレームワークは**Astro**。静的サイトなのに、ちょっと未来的。
- 記事もテキストも、ぜんぶ「構造化」して管理。
- **ブルータスデザイン**採用。ちょっとオシャレで、ちょっと無骨。
- **レスポンシブ**対応。スマホでもPCでも、たぶん快適。
- OGP画像も自動生成。絵文字はサニタイズで豆腐撲滅。

---

## 🏗️ ディレクトリ構成（ざっくり備忘録）

```text
/
├── public/         # 画像やフォントなど静的ファイル
├── src/
│   ├── components/ # ヘッダーやフッターなど部品たち
│   ├── content/    # 記事やテキストの中身（.mdで管理！）
│   │   └── backtrace/ # はてなから移行した過去記事
│   ├── layouts/    # レイアウトテンプレ
│   ├── pages/      # ルーティングの心臓部
│   └── styles/     # CSSとか
├── docs/           # プロジェクトドキュメント
│   └── TODO.md     # タスク管理
├── package.json
└── ...and more!
```

---

## 🌐 URLの構成（未来の自分用メモ）

- `/` … トップページ
- `/yyyy/mm/dd/slug/` … ブログ記事（例: `/2022/04/01/hello-world/`）
- `/backtrace/yyyy/mm/dd/slug/` … はてなから移行した過去記事
- `/texts/slug/` … テキスト系コンテンツ
- `/about` … 自己紹介
- `/privacy` … プライバシーポリシー
- `/logs` … ちょっとしたログ
- 404ページもあるよ

---

## ✨ このサイトの特徴（自分で自分を褒めておく）

- **超・構造化**：記事もテキストもディレクトリでガッチリ管理。未来の自分も迷わない！
- **OGP画像自動生成**：記事ごとに自動でOGP画像を生成。しかも絵文字は自動でサニタイズ（豆腐撲滅）。
- **ブルータスデザイン**：ちょっとオシャレ、ちょっと無骨。唯一無二の雰囲気。
- **レスポンシブ**：スマホ・タブレット・PC、どこでも快適。
- **Astro製**：爆速ビルド＆静的配信。だけど拡張性もバッチリ。
- **npmコマンドで全部完結**：コマンド一発で開発・ビルド・プレビュー！

---

## 🧞 npmコマンド早見表（自分用チートシート）

| コマンド                      | やること                                       |
| ----------------------------- | ---------------------------------------------- |
| `npm install`                 | 依存パッケージをインストール                   |
| `npm run dev`                 | ローカル開発サーバー起動（localhost:4321）     |
| `npm run build`               | 本番用にビルド（`dist/`に出力）                |
| `npm run preview`             | ビルド結果をローカルでプレビュー               |
| `npm run astro ...`           | Astro CLIコマンドを実行                        |
| `node scripts/new-article.js` | 新しい記事ファイルを作成（下記オプション参照） |
| `npm run drafts`              | 下書き記事（`draft: true`）の一覧を表示        |

---

### 記事作成スクリプトの使い方（未来の自分へ）

#### 基本形

```sh
node scripts/new-article.js --slug my-article
```

- `--slug`（必須）: 記事のスラッグ（ファイル名・URLの一部）

#### オプション

- `--type <logs|texts>` または `--texts`  
  → テキスト系（`src/content/texts/`）に作成。  
  省略時はブログ記事（`src/content/logs/`）に作成。
- `--date YYYY-MM-DD`  
  → 日付を指定（省略時は今日の日付）
- `--title "タイトル"`  
  → 記事のタイトルを指定
- `--description "説明"`  
  → 記事の説明を指定
- `--with-images`  
  → 記事ディレクトリに `images` フォルダも同時に作成
- `--draft`  
  → 下書きとして作成（`draft: true` を frontmatter に追加）
- `--help`  
  → ヘルプを表示

#### 例

```sh
# ブログ記事（今日の日付で作成）
node scripts/new-article.js --slug hello-world

# ブログ記事（タイトルと説明付き）
node scripts/new-article.js --slug switch2-unboxing --title "Switch2開封記" --description "Switch2の開封と初期設定の詳細"

# ブログ記事（2024-07-19の日付で作成）
node scripts/new-article.js --slug new-family --date 2024-07-19

# テキスト記事（タイトルと説明付き）
node scripts/new-article.js --slug agile-ai-coaching --type texts --title "アジャイルコーチと生成AI" --description "アジャイルコーチが生成AIをどう活用しているか"

# 下書きとして作成
node scripts/new-article.js --slug wip-article --draft
```

---

## 📄 記事の frontmatter 仕様

記事ファイルの先頭に書く YAML フィールドの一覧。

### logs / texts / backtrace 共通

| フィールド    | 型       | 必須 | 説明                                                                                                                                     |
| ------------- | -------- | ---- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| `title`       | string   | ✅   | 記事タイトル                                                                                                                             |
| `pubDate`     | date     | ✅   | 公開日（例: `2026-05-14T00:00:00+09:00`）                                                                                                |
| `description` | string   | —    | 説明文。未設定時は本文から自動生成                                                                                                       |
| `updatedDate` | date     | —    | 更新日                                                                                                                                   |
| `ogimage`     | string   | —    | OGP画像パス（例: `/images/og/my-image.png`）。未設定時はデフォルト画像                                                                   |
| `tags`        | string[] | —    | タグ（例: `['astro', 'dev']`）                                                                                                           |
| `toc`         | boolean  | —    | `true` にすると h2/h3 見出しから目次を自動生成。デフォルト: `false`（未設定で目次なし）                                                  |
| `draft`       | boolean  | —    | `true` にすると下書き扱い。本番ビルドでは除外、開発サーバーでは表示される                                                                |
| `rssGuid`     | string   | —    | RSS の `<guid>` を上書きする。毎年更新する記事で新着として配信したいときに使う（例: `https://nawo.to/texts/happy-birthday/#2026-05-24`） |

### 例

```yaml
---
title: 記事タイトル
pubDate: 2026-05-14T00:00:00+09:00
description: 記事の説明文
updatedDate: 2026-05-15T00:00:00+09:00
ogimage: '/images/og/my-article.png'
tags: ['astro', 'dev']
toc: true
---
```

---

## 📝 さいごに（nawotoへの伝言）

- コードもコンテンツも「迷子にならない」設計を目指してるはず。
- 未来の自分、もし何か困ったらこのREADMEを見直そう。
- 何かあれば[Issue](https://github.com/nawoto/nawo.to/issues)や[PR](https://github.com/nawoto/nawo.to/pulls)でセルフツッコミもOK！

---

## 📄 ライセンス

### サイトコード

- **ライセンス**: [MIT License](https://opensource.org/licenses/MIT)

### 記事コンテンツ

- **ライセンス**: [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/)
- **条件**: 帰属表示（nawo.toへのリンク）が必要

### 画像

- **プロフィール写真、サイトアイコン、OpenGraph画像**: [MIT License](https://opensource.org/licenses/MIT)
- **書籍カバー画像**: 著者/出版社の許可による利用

---
