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
│   ├── layouts/    # レイアウトテンプレ
│   ├── pages/      # ルーティングの心臓部
│   └── styles/     # CSSとか
├── package.json
└── ...and more!
```

---

## 🌐 URLの構成（未来の自分用メモ）

- `/` … トップページ
- `/yyyy/mm/dd/slug/` … ブログ記事（例: `/2022/04/01/hello-world/`）
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

| コマンド                        | やること                                         |
|---------------------------------|--------------------------------------------------|
| `npm install`                   | 依存パッケージをインストール                     |
| `npm run dev`                   | ローカル開発サーバー起動（localhost:4321）       |
| `npm run build`                 | 本番用にビルド（`dist/`に出力）                   |
| `npm run preview`               | ビルド結果をローカルでプレビュー                 |
| `npm run astro ...`             | Astro CLIコマンドを実行                          |
| `npm run create-article -- ...` | 新しい記事ファイルを作成（下記オプション参照）   |

---

### `npm run create-article` の使い方（未来の自分へ）

#### 基本形
```sh
npm run create-article -- --slug my-article
```
- `--slug`（必須）: 記事のスラッグ（ファイル名・URLの一部）

#### オプション
- `--type texts` または `--texts`  
  → テキスト系（`src/content/texts/`）に作成。  
  省略時はブログ記事（`src/content/blog/yyyy/mm/dd/`）に作成。
- `--date YYYY-MM-DD`  
  → 日付を指定（省略時は今日の日付）

#### 例
```sh
# ブログ記事（今日の日付で作成）
npm run create-article -- --slug hello-world

# ブログ記事（2024-07-19の日付で作成）
npm run create-article -- --slug new-family --date 2024-07-19

# テキスト記事（2025-05-24の日付で作成）
npm run create-article -- --slug happy-birthday --type texts --date 2025-05-24
```

---

## 📝 さいごに（nawotoへの伝言）

- コードもコンテンツも「迷子にならない」設計を目指してるはず。
- 未来の自分、もし何か困ったらこのREADMEを見直そう。
- 何かあれば[Issue](https://github.com/nawoto/nawo.to/issues)や[PR](https://github.com/nawoto/nawo.to/pulls)でセルフツッコミもOK！

---
