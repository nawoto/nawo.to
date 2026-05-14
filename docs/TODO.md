# Astro版 改善タスク

## サイト改善案・今後のタスク

### はてな記法の残存チェック（backtrace 移行後対応）

- [x] `[twitter:@username]` 記法の整理（36ファイル） → `[@username](https://twitter.com/username)` に変換
- [x] `[id:username](url)` 記法の整理（12ファイル） → 実際の hatenablog URL に更新、ursm は 404 のためプレーンテキスト化
- [x] `d.hatena.ne.jp/nawoto/` 自サイトリンクの内部リンク化（25ファイル） → entry ID で backtrace ファイルを特定し `/backtrace/YYYY/MM/DD/id/` 形式に変換（archive 検索リンク 1 件は相当する内部ページがないためそのまま）
- [x] `d.hatena.ne.jp` 他者リンクの確認 → そのまま維持

参考 grep:

```sh
grep -rn -E '\[twitter:|\[id:|d\.hatena\.ne\.jp' src/content/backtrace/
```

### デザイン・細部

- [ ] フォントの最終調整
- [ ] Brutalistデザインの細部調整

---

## 完了したタスク

- [x] 年別カテゴリで記事をグループ化
- [x] `mentions.astro` の backtrace タイトル引き当てバグの修正
- [x] 記事の目次機能（frontmatter の `toc: true` で有効化）
- [x] TypeScript型定義の改善・型エラーの修正
- [x] heroImage 未使用フィールドの削除
- [x] frontmatter 仕様を README に記載
- [x] Bioコンポーネントをトップページに追加
- [x] LOGSとTEXTSのタブUI統一・UI/UX大幅改善
- [x] Amazon商品カードから自作書籍カードへの切り替え
- [x] 画像のWebP優先表示
- [x] Markdown記事内のAmazonリンクのカード化
- [x] 新記事作成スクリプトの改善
- [x] GatsbyからAstroへの移行
- [x] Twitter/Facebook/はてなブックマークシェアボタンの実装
- [x] Applauseボタン（拍手機能）の実装
- [x] 各SNSプラットフォームのコメント表示（Giscus）
- [x] WebMentions対応の実装
- [x] Schema.org構造化データの最適化
- [x] OGPメタタグの完全移行
- [x] RSSフィード生成機能
- [x] XMLサイトマップ自動生成
- [x] コードハイライト機能
- [x] YouTube埋め込み自動変換機能
- [x] Aboutページの移行
- [x] 404ページのカスタマイズ
- [x] Lighthouse スコアの最適化
- [x] はてなブログからの移行（163件の記事を2006年〜2014年にわたって移行完了）
- [x] backtraceページの年別表示と一覧表示の切り替え機能
- [x] 記事詳細ページのナビゲーション機能実装
