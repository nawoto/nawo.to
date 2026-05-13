---
title: 'Astro v6 に上げた'
pubDate: 2026-05-13T00:00:00+09:00
description: 'このサイトを Astro v5 から v6 にアップグレードした記録'
---

このサイトで使っている Astro が v6 にメジャーアップデートしたので対応した。

https://astro.build/

Dependabot が PR を上げてくれていたんだけど、CI が落ちてたのでちゃんと対応することに。

## Astro v6 について

公式のマイグレーションガイドはこちら。

https://docs.astro.build/en/guides/upgrade-to/v6/

### 主な変更点

**Content Layer API がデフォルトに**

これが一番の変更点。これまでの `type: 'content'` でコレクションを定義する方式（Legacy Content Collections）が廃止され、`glob` ローダーを使う新しい Content Layer API への移行が必須になった。

**Zod v4 同梱**

Astro v6 には Zod v4 が同梱されている。Zod v3 にあった `z.function().returns()` などの API が削除されており、`@astrojs/rss` の古いバージョンはここで詰まっていた。

**エントリの API 変更**

| v5               | v6                               |
| ---------------- | -------------------------------- |
| `entry.slug`     | `entry.id`                       |
| `entry.render()` | `render(entry)`（import が必要） |

## このサイトでの主な修正

- コンテンツコレクションの定義を Content Layer API（`glob` ローダー）へ移行
- `entry.slug` → `entry.id` に変更
- `entry.render()` → `render(entry)` に変更（import 方法も変わった）
- slug 生成ユーティリティで `.md` 拡張子を除去するよう修正

## ま、Claude にお任せなんだが

実作業はほぼ Claude Code にお任せ。「ブランチ切って試してみて」と言ったら、`npx @astrojs/upgrade` を実行してビルドを確認して、エラーを修正して、コミットまでやってくれた。

自分でやることといえば、動作確認と「これどういう意味？」って聞くくらい。便利な時代になったもんだ。🤖

細かいところを Claude に聞きながら進めたら、特に詰まることもなくサクッと終わった。ありがたい。🙏

何か不具合があれば、コメントで教えてください。🙇
