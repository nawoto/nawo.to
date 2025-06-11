# Gatsby版→Astro版 移行残タスク

## 🚨 高優先度

### シェア機能
- [ ] Twitterシェアボタンの実装
- [ ] Facebookシェアボタンの実装
- [ ] はてなブックマークシェアボタンの実装
- [ ] URLコピー機能の実装

### コメント・反応機能
- [ ] Applauseボタン（拍手機能）の実装
- [ ] 各SNSプラットフォームのコメント表示
- [ ] WebMentions対応の実装

### SEO・構造化データ
- [x] Schema.org構造化データの最適化
- [x] OGPメタタグの完全移行
- [x] Twitter Cardsの設定確認

## 📋 中優先度

### マークダウン機能拡張 ✅ **完了！（Astro v5標準機能で充分）**
- [x] GitHub風マークダウン対応（Astro v5デフォルト）
  - [x] チェックリスト記法（- [ ], - [x]）対応 ※TODO.mdで大量使用
  - [x] テーブル記法対応 
  - [x] ストライクスルー（~~削除~~）対応
  - [x] オートリンク対応
- [x] Shiki（コードハイライト機能 - Astroデフォルト）
  - [x] JavaScript/JSX等のシンタックスハイライト ※install-font-awesomeで大量使用
  - [x] 適切なテーマ設定
  - [x] コード折り返し機能
- [ ] 外部設定ファイル導入（設定の一元管理）

### ページ・機能移行
- [ ] Aboutページ(`/about/`)の移行
- [ ] Contact機能の移行（フォーム等）
- [ ] 404ページのカスタマイズ
- [x] Robot.txtの移行
- [x] Sitemapの生成設定

### パフォーマンス・技術
- [ ] 画像最適化の実装（Gatsby Image → Astro Image）
- [ ] Lighthouse スコアの最適化
- [ ] バンドルサイズの最適化
- [ ] PWA機能の移行（あれば）

### ナビゲーション・UX
- [ ] ヘッダーナビゲーションの実装
- [ ] フッターの実装
- [ ] パンくずナビゲーションの追加
- [ ] 検索機能の実装（あれば）

## 🔧 低優先度・改善

### デザイン・スタイリング
- [ ] Brutalistデザインの細部調整
- [ ] レスポンシブデザインの最適化
- [ ] ダークモード対応（あれば）
- [ ] フォントの最終調整

### 開発・保守
- [ ] TypeScript型定義の改善
- [ ] ESLint/Prettier設定の最適化
- [ ] テストの実装
- [ ] デプロイメント設定の確認

### Analytics・監視
- [ ] Google Analytics移行
- [ ] その他トラッキング機能の移行
- [ ] エラー監視の設定

## ✅ 完了済み

- [x] 基本レイアウトとページ構造の移行
- [x] ブログ記事(`/blog/`)とテキスト記事(`/texts/`)の表示
- [x] 記事一覧ページの実装
- [x] ログページ(`/logs/`)の実装
- [x] Instagram埋め込みの最適化
- [x] フォント統一（Titillium Web）
- [x] 記事間ナビゲーション（前後記事）
- [x] Markdown記事の基本表示
- [x] 記事メタ情報の表示
- [x] Bioコンポーネントの実装
- [x] astro-seo導入によるSEO最適化
- [x] RSSフィード生成機能
- [x] XMLサイトマップ自動生成
- [x] WebMention対応の完全実装

## 📝 メモ・注意事項

### 確認が必要な機能
- Gatsby版の隠れた機能や設定の見落とし
- プラグインやライブラリの依存関係
- 外部API連携（あれば）

### 移行後の検証項目
- 全ページの表示確認
- レスポンシブデザインの確認
- パフォーマンステスト
- SEO関連の確認

---

## 🤖 AI セッション再開用プロンプト

新しいCursorセッションで作業を再開する際は、以下をコピー&ペーストしてください：

```markdown
# プロジェクト概要
/Users/nawoto/Development/github.com/nawoto/nawo.to にある Gatsby で実装された Web サイト(ブログ、プロフィールなど) を Astro 最新版に移行しています。

## 基本情報
- **作業ディレクトリ**: `/Users/nawoto/Development/github.com/nawoto/nawo.to/nawo.to-astro`
- **開発サーバー**: `npm run dev` (http://localhost:4321)
- **言語**: 日本語で回答してください

## 完了済み項目 ✅
1. **基本移行**: Gatsby→Astro基盤構築
2. **SEO完全対応**: 
   - astro-seo パッケージ導入
   - RSSフィード (`/rss.xml`)
   - XMLサイトマップ (`/sitemap-index.xml`)
   - robots.txt
   - WebMention、Schema.org JSON-LD保持
3. **Markdown機能拡張設定**:
   - remark-gfm (GitHub風マークダウン)
   - Shiki (コードハイライト、github-darkテーマ)
   - astro.config.mjs に設定済み
4. **モバイル対応**:
   - レスポンシブデザイン実装済み
   - Tailwind CSS による適切なブレークポイント
   - タッチデバイス最適化

## 現在の課題 🔧
- ~~マークダウン機能の動作確認が未完了~~ ✅ **完了！**
- ~~テストページ (/texts/markdown-test/) が404エラー~~ ✅ **完了！**
- ~~TODO.md の完了項目更新が必要~~ ✅ **完了！**

## 次のステップ 🎯
1. マークダウン機能の動作確認
2. 既存記事でShiki/remark-gfm動作テスト  
3. TODO.md完了項目更新
4. 次の機能実装へ進む

## 技術設定
- **パッケージ**: astro-seo, @astrojs/sitemap, @astrojs/rss, remark-gfm
- **設定ファイル**: astro.config.mjs, src/config.ts
- **重要コンポーネント**: SEO.astro (共通SEO処理)

## Git状況
- 最新コミット: "feat: Complete SEO implementation with astro-seo package"
- ブランチ: feature/migrate-to-astro
```

このプロンプトをAIに渡せば、すぐに作業再開できます。

---

**更新日**: 2024年12月現在  
**進捗**: SEO・Markdown機能実装完了、動作確認とシェア機能が主要な残タスク 